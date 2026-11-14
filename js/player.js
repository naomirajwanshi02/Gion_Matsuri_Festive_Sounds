// The sound note strip: a music-app style player for one track.
// Play / pause, ±10 s, a seek bar, time played on the left and time left on the right.

const fmt = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  s = Math.round(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
const ICON_PLAY = 'M8 5.5v13l11-6.5z';
const ICON_PAUSE = 'M7 5h3.6v14H7zM13.4 5H17v14h-3.6z';
const ICON_AGAIN = 'M12 5a7 7 0 1 1-7 7h2.4A4.6 4.6 0 1 0 12 7.4V10L7.6 6.2 12 2.4z';

export function createPlayer(audio, $){
  let dragging = false;
  const ui = $('player');

  function paint(){
    const d = audio.duration, t = audio.currentTime;
    const p = isFinite(d) && d > 0 ? t / d : 0;
    if (!dragging) $('seek').value = Math.round(p * 1000);
    $('seek').style.setProperty('--p', `${(dragging ? $('seek').value / 10 : p * 100).toFixed(2)}%`);
    $('tNow').textContent = fmt(dragging ? ($('seek').value / 1000) * d : t);
    $('tLeft').textContent = '-' + fmt((isFinite(d) ? d : 0) - (dragging ? ($('seek').value / 1000) * d : t));
  }
  function state(){
    const playing = !audio.paused && !audio.ended;
    ui.classList.toggle('playing', playing);
    $('playIcon').setAttribute('d', playing ? ICON_PAUSE : audio.ended ? ICON_AGAIN : ICON_PLAY);
    $('playBtn').setAttribute('aria-label', playing ? 'Pause' : audio.ended ? 'Play again' : 'Play');
    $('trackState').textContent = playing ? 'Playing' : audio.ended ? 'Finished' : 'Paused';
  }

  const play = () => audio.play().catch((e) => { console.warn(e); state(); });
  const toggle = () => { if (audio.paused || audio.ended){ if (audio.ended) audio.currentTime = 0; play(); } else audio.pause(); };
  const skip = (s) => { const d = audio.duration || 0; audio.currentTime = Math.min(Math.max(0, audio.currentTime + s), Math.max(0, d - 0.05)); paint(); };

  $('playBtn').addEventListener('click', toggle);
  $('back10').addEventListener('click', () => skip(-10));
  $('fwd10').addEventListener('click', () => skip(10));
  $('seek').addEventListener('input', () => { dragging = true; paint(); });
  $('seek').addEventListener('change', () => {
    const d = audio.duration;
    if (isFinite(d)) audio.currentTime = ($('seek').value / 1000) * d;
    dragging = false; paint();
  });
  ['timeupdate', 'loadedmetadata', 'durationchange', 'seeked'].forEach((e) => audio.addEventListener(e, paint));
  ['play', 'pause', 'ended', 'playing'].forEach((e) => audio.addEventListener(e, state));
  // smooth progress between timeupdate events
  (function tick(){ if (!audio.paused && !dragging) paint(); requestAnimationFrame(tick); })();
  paint(); state();

  return { play, pause: () => audio.pause(), toggle };
}
