import zlib
import struct
import math

def create_developer_avatar_png(width=400, height=400, output_paths=['public/images/profile.png', 'portfolio/images/profile.png']):
    # Generate 400x400 RGBA image
    # Background: dark navy (#0c1322), subtle circular amber border (#f59e0b)
    # Developer silhouette with amber rim glow
    raw_data = bytearray()
    
    cx, cy = width / 2.0, height / 2.0
    r_max = width / 2.0 - 5.0
    
    for y in range(height):
        raw_data.append(0) # PNG filter byte: 0 (None)
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx * dx + dy * dy)
            
            if dist > r_max:
                # Transparent outside circle
                raw_data.extend([0, 0, 0, 0])
            elif dist > r_max - 4:
                # Amber border (#f59e0b)
                raw_data.extend([245, 158, 11, 255])
            else:
                # Inside circle
                # Dark slate/navy gradient
                t = y / float(height)
                r = int(12 * (1 - t) + 7 * t)
                g = int(19 * (1 - t) + 12 * t)
                b = int(34 * (1 - t) + 23 * t)
                
                # Check for head (circle around (200, 160), r=65)
                head_dx = x - 200
                head_dy = y - 160
                head_dist = math.sqrt(head_dx * head_dx + head_dy * head_dy)
                
                # Check for shoulders / body (ellipse around (200, 320), rx=110, ry=80)
                body_dx = (x - 200) / 115.0
                body_dy = (y - 330) / 85.0
                body_dist = math.sqrt(body_dx * body_dx + body_dy * body_dy)
                
                if head_dist < 60:
                    # Face / hair tone (warm skin + dark hair outline)
                    if head_dist > 52 or (y < 140 and (x < 170 or x > 230 or y < 115)):
                        # Dark hair
                        raw_data.extend([28, 25, 23, 255])
                    elif 150 <= y <= 165 and (155 <= x <= 185 or 215 <= x <= 245):
                        # Amber developer glasses accent
                        raw_data.extend([245, 158, 11, 255])
                    else:
                        # Warm skin tone
                        raw_data.extend([224, 169, 128, 255])
                elif body_dist < 1.0 and y > 210:
                    # Professional Blazer (#1e293b with amber lapel line)
                    if abs(x - 200) < 12 and 220 <= y <= 270:
                        # Amber collar/tie
                        raw_data.extend([245, 158, 11, 255])
                    elif abs(x - 200) < 22 and 215 <= y <= 260:
                        raw_data.extend([248, 250, 252, 255])
                    else:
                        raw_data.extend([30, 41, 59, 255])
                else:
                    # Background subtle glow
                    glow_dist = math.sqrt((x - 200)**2 + (y - 180)**2)
                    if glow_dist < 140:
                        factor = (1.0 - glow_dist / 140.0) * 0.25
                        r = int(r + 245 * factor)
                        g = int(g + 158 * factor)
                        b = int(b + 11 * factor)
                    raw_data.extend([min(255, r), min(255, g), min(255, b), 255])

    # PNG structure
    png_signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    ihdr_chunk = struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT
    compressed = zlib.compress(bytes(raw_data), level=9)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    # IEND
    iend_crc = zlib.crc32(b'IEND')
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    png_bytes = png_signature + ihdr_chunk + idat_chunk + iend_chunk
    
    for path in output_paths:
        with open(path, 'wb') as f:
            f.write(png_bytes)
        print(f"Generated {path} ({len(png_bytes)} bytes)")

if __name__ == '__main__':
    create_developer_avatar_png()
