import { useState, useRef } from 'react';
import { PORTFOLIO_CONFIG, Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight, Eye, Code2, Layers, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

function InPlaceVideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
            setHasError(false);
          })
          .catch((err) => {
            console.warn('Playback notice:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
      setHasError(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = Math.max(0, Math.min(pos * duration, duration));
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#eab308]/40">
      {/* Top browser-style window bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#eab308]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#eab308] animate-pulse" />
          <span className="truncate max-w-[200px] sm:max-w-none text-white/80">{title} Demo</span>
        </div>
        <div className="flex items-center gap-2 text-noir-muted">
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400/90 font-semibold">
            {hasError ? 'Video Ready' : isPlaying ? 'Playing In-Place' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Video Container with In-Place Play / Pause */}
      <div className="relative aspect-video w-full bg-black group/video cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          playsInline
          muted={isMuted}
          loop
          poster="/assets/aistudio/demo_poster.webp"
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="/assets/aistudio/demo_optimized.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Error Fallback Overlay if needed */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
            <p className="text-xs text-white/80 mb-3">Video playback notice</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full bg-[#eab308] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#facc15] transition"
            >
              Reload Video
            </button>
          </div>
        ) : !isPlaying && (
          /* Big Center Play Button Overlay (when paused) */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all">
            <button
              type="button"
              onClick={togglePlay}
              className="group/btn relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black shadow-[0_0_35px_rgba(234,179,8,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Play project video demo"
            >
              <Play className="ml-1 h-7 w-7 fill-black text-black" />
              <span className="absolute -inset-2 rounded-full border border-[#eab308]/60 animate-ping opacity-30" />
            </button>
            <span className="mt-3 font-sans text-xs font-bold uppercase tracking-wider text-[#fef08a] bg-black/70 px-3 py-1 rounded-full border border-white/10">
              {hasStarted ? 'Resume Demo' : 'Click to Play Demo Video'}
            </span>
          </div>
        )}

        {/* Bottom Control Bar on Hover or when Playing */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6 opacity-90 transition-opacity hover:opacity-100">
          {/* Interactive Scrubber Bar */}
          <div
            className="group/seek relative mb-2.5 h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2.5"
            onClick={handleSeek}
          >
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-[#eab308] to-[#facc15]"
              style={{ width: `${progressPercent}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md hover:bg-[#eab308] hover:text-black transition"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                title="Restart video"
                aria-label="Restart"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-rose-300" /> : <Volume2 className="h-4 w-4 text-[#eab308]" />}
              </button>

              <span className="font-mono text-[11px] text-white/80 tabular-nums ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-mono text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                In-Place Video Demo
              </span>
              <button
                type="button"
                onClick={handleFullScreen}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                title="Full screen"
                aria-label="Full screen"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = PORTFOLIO_CONFIG;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen overflow-hidden bg-noir-bg px-6 py-24">
      {/* Ambient background glow in Warm Mustard */}
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #eab308, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Header Reveal */}
        <ScrollReveal direction="up" distance={30} duration={600}>
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-noir-cream/75">
            Selected Work
          </p>

          <h2 className="mb-14 font-sans text-[clamp(2.3rem,4.4vw,3.4rem)] font-bold leading-[0.95] tracking-tight text-white">
            Projects <span className="text-[#eab308]">& Systems</span>
          </h2>
        </ScrollReveal>

        {/* Project Feature Cards with Scroll Reveal */}
        <div className="space-y-12">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                distance={40}
                delay={idx * 100}
                duration={750}
              >
                <article className="group relative rounded-3xl border border-white/10 bg-[#050505]/40 p-8 sm:p-10 transition-all duration-300 hover:border-[#eab308]/40 hover:bg-white/[0.02]">
                  <div
                    className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Column (One Side) */}
                    <div className={`space-y-5 ${isReversed ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#eab308]">
                          Project {project.number}
                        </span>
                        <span className="text-white/20">·</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 font-sans text-xs text-white">
                          {project.category}
                        </span>
                        {project.accuracyOrHighlight && (
                          <span className="rounded-full border border-[#eab308]/20 bg-[#eab308]/10 px-3 py-0.5 font-sans text-xs font-medium text-[#eab308]">
                            {project.accuracyOrHighlight}
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#fef08a] transition-colors">
                        {project.title}
                      </h3>

                      <p className="font-sans text-sm sm:text-base leading-relaxed text-noir-muted">
                        {project.description}
                      </p>

                      {/* Key features bullets */}
                      <div className="space-y-2 pt-1 font-sans text-xs sm:text-sm text-[#f2efe8]/80">
                        {project.caseStudy.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#eab308] mt-2 shrink-0 shadow-[0_0_6px_#eab308]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-xs font-medium text-noir-cream"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-white/5">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-4.5 py-2.5 font-sans text-xs font-bold text-[#fef08a] transition hover:bg-[#eab308] hover:text-black hover:border-[#eab308]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>GitHub Code</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-sans text-xs font-semibold text-white transition hover:border-[#eab308]/50 hover:bg-[#eab308]/10 hover:text-[#eab308]"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Case Study & Details</span>
                        </button>

                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2.5 font-sans text-xs text-noir-muted hover:text-white transition"
                          >
                            <span>Repository Details</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Side: In-Place Video Demo Player or Architecture Preview */}
                    <div className={`${isReversed ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6'}`}>
                      {project.videoUrl ? (
                        <InPlaceVideoPlayer
                          videoUrl={project.videoUrl}
                          title={project.title}
                        />
                      ) : (
                        <div
                          onClick={() => setActiveModalProject(project)}
                          className="group/card relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:border-[#eab308]/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.18)]"
                        >
                          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-red-500/80" />
                              <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                              <span className="h-2 w-2 rounded-full bg-green-500/80" />
                            </div>
                            <span className="font-mono text-[11px] text-[#eab308]">
                              {project.id}.py
                            </span>
                          </div>

                          <div className="space-y-3 font-mono text-xs text-[#f2efe8]/80">
                            <div className="flex items-center gap-2 text-white">
                              <Code2 className="h-4 w-4 text-[#eab308]" />
                              <span className="font-bold">System Architecture</span>
                            </div>
                            <ul className="space-y-1.5 pl-2 text-noir-muted">
                              {project.caseStudy.architecture.slice(0, 4).map((layer, lIdx) => (
                                <li key={lIdx} className="flex items-center gap-2">
                                  <span className="text-[#eab308]">▸</span>
                                  <span className="text-white/90">{layer}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-sans text-noir-muted">
                            <span className="flex items-center gap-1.5 text-[#eab308]">
                              <Layers className="h-3.5 w-3.5" />
                              <span>Interactive Breakdown</span>
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-white group-hover/card:text-[#eab308]">
                              <span>Explore</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
