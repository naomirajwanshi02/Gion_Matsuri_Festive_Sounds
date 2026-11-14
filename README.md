# 🏮 Gion Matsuri Festive Sounds: a scan-to-listen WebAR sound note

Point your phone at the printed **Niwatori Hoko** picture. When it is recognised, a short
note tells you that you can begin, and on **OK** the festive sounds of Gion Matsuri start
playing over your live camera view. Notes about the float and the festival slide across
the top while you listen.

**Play it:** https://naomirajwanshi02.github.io/Gion_Matsuri_Festive_Sounds/
**Play locally:** `http://localhost:8131/`
**Without the picture:** `?demo=1` · **Without any camera:** `?preview=1`
**The picture to scan:** [`target.png`](target.png)

## How it works

1. **Camera permission.** A plain first screen asks for the camera. **Allow camera** shows
   the browser's prompt; it is skipped if already allowed.
2. **Scan.** The viewfinder opens. MindAR *image* tracking watches the back camera for the
   Niwatori Hoko illustration. It keeps running afterwards: the live camera is the only
   background.
3. **Explanatory note.** Once the picture is found, a card says you can begin, that you will
   hear the festive sounds of Gion Matsuri, and that this AR experience needs your camera.
4. **Listen.** Tapping **OK, play the sounds** starts the audio (the tap also unlocks audio on
   phones) and opens:
   - **Top panel:** two notes, *Gion Matsuri* (the festival) and then *Niwatori Hoko* (the float),
     that slide over one another every **12 seconds**. The dots or a swipe change it by hand.
   - **Centre:** the sound note strip, a music-app player with play / pause, back and
     forward 10 s, a seek bar, the time played and the **time left**.
   - **Bottom:** a pill that says whether the picture is still in view. The sound keeps
     playing either way.
   - **✕** pauses and goes back to scanning.

## Files

| File | What it is |
|---|---|
| `index.html` | The screens: camera permission, viewfinder, explanatory note, listening HUD. |
| `js/app.js` | The flow, and the sliding notes. |
| `js/scan.js` | Picture recognition (MindAR image), kept running as the camera background. |
| `js/player.js` | The sound note strip (play / pause, ±10 s, seek, time left). |
| `js/data.js` | The two notes and the slide interval (`NOTE_MS`). |
| `css/app.css` | Mobile-first UI on the Anatomy sepia tokens, same look as Noh_Masks. |
| `assets/festive-sounds.m4a` | The voice note (35 s). The player cuts the last 3 s (`TRIM_END` in `js/player.js`), so it plays for 32 s. |
| `assets/niwatori-hoko.webp` | The float illustration (source of `target.png`). |
| `assets/panel-reference-jp.webp` | The Japanese museum panel used for the float facts (see SOURCES.md). |
| `target.png` / `targets.mind` | The picture to print and its compiled MindAR target (1,713 detection points over 10 scales, 72 tracking points). |
| `tools/make-target.html` | Rebuilds `target.png` and `targets.mind` from the illustration (`?build=1`). |
| `tools/serve.ps1` | Local dev server (no Node or Python); localhost counts as secure for the camera. |

## The Anatomy look

Plates, buttons and the viewfinder use the [Anatomy](https://github.com/wheresryan22/anatomy)
skill (MIT) in the sepia theme shared with Noh_Masks, Ramen_Builder and the others:
[`css/anatomy-sepia.css`](css/anatomy-sepia.css) and the kit in [`vendor/anatomy/`](vendor/anatomy).
The skill itself is installed for this workspace at `../.claude/skills/anatomy`.

## Printing the picture

Print `target.png` about **12 cm wide** (it is tall, roughly 12 × 28 cm) on matte paper.
The float itself carries most of the detail, so keep the lower half well lit. It also works
from a laptop or tablet screen.

## Run locally

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Then open http://localhost:8131/. On a phone the page must be served over HTTPS (for
example GitHub Pages, like the other repos), because phones only allow the camera on
secure pages.

Version pins: `mind-ar@1.2.5` needs `three@0.160.0` (three r162 removed `sRGBEncoding`).
