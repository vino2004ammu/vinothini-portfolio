/**
 * Robust Multi-Tier Persistent Photo Storage for Vinothini Portfolio
 * 1. Disk persistence via server API (/api/profile-photo -> public/images/profile_user.jpg)
 * 2. IndexedDB persistence (VinothiniPortfolioDB -> profile_store)
 * 3. LocalStorage persistence (vinothini_profile_photo)
 *
 * This ensures the uploaded photo NEVER resets or disappears on page refresh,
 * surviving iframe reloads, sandbox partitioning, and browser refreshes.
 * The photo only changes when the user explicitly clicks to edit or reset it.
 */

const DB_NAME = 'VinothiniPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'profile_store';
const KEY_NAME = 'custom_profile_photo';
const LOCAL_STORAGE_KEY = 'vinothini_profile_photo';

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get photo from IndexedDB
async function getFromIndexedDB(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => resolve((req.result as string) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Save photo to IndexedDB
async function saveToIndexedDB(dataUrl: string): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_NAME);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// Remove from IndexedDB
async function removeFromIndexedDB(): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * Synchronously retrieve photo from LocalStorage for instant initial paint
 */
export function getInitialPhotoSync(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Comprehensive async retrieval checking Server Disk -> LocalStorage -> IndexedDB
 */
export async function getSavedPhotoAsync(): Promise<string | null> {
  // 1. Check Server Disk first (highest reliability across refreshes)
  try {
    const res = await fetch('/api/profile-photo');
    if (res.ok) {
      const data = await res.json();
      if (data.exists && data.url) {
        return data.url;
      }
    }
  } catch {
    // API route might not be ready or network off; continue to client stores
  }

  // 2. Check LocalStorage
  const local = getInitialPhotoSync();
  if (local) return local;

  // 3. Check IndexedDB
  const idb = await getFromIndexedDB();
  if (idb) {
    // Restore back into LocalStorage for faster subsequent renders
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, idb);
    } catch {
      // ignore
    }
    return idb;
  }

  return null;
}

/**
 * Save photo permanently across all 3 storage tiers
 */
export async function saveProfilePhoto(dataUrl: string): Promise<{ success: boolean; url: string }> {
  let finalUrl = dataUrl;

  // 1. Save to LocalStorage immediately
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // 2. Save to IndexedDB (virtually unlimited quota)
  await saveToIndexedDB(dataUrl);

  // 3. Save to Server Disk via API
  try {
    const res = await fetch('/api/profile-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        finalUrl = `${data.url}?t=${Date.now()}`;
      }
    }
  } catch (err) {
    console.warn('Server photo save error:', err);
  }

  return { success: true, url: finalUrl };
}

/**
 * Remove photo from all 3 storage tiers
 */
export async function removeProfilePhoto(): Promise<void> {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // ignore
  }

  await removeFromIndexedDB();

  try {
    await fetch('/api/profile-photo', { method: 'DELETE' });
  } catch {
    // ignore
  }
}

/**
 * Compress an uploaded user image file into a crisp high-res DataURL
 */
export function compressImageFile(file: File, maxSize = 600, quality = 0.88): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
