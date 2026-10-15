# Palettes

Three versions of the theme's neutral colors, kept as backups. Each file sets every neutral token: the surfaces (`--bg0` to `--bg4`, `--line`), the text colors (`--text`, `--muted`, `--faint`), the gray card (`--neutral` and its steps), `theme-global`'s gray ramp (`--white`, `--gray00` to `--gray100`, `--black`), and the code comment and operator colors from `11-prism.css`. Accents are not in them: magenta, teal, the card colors, and the other syntax colors are the same in every palette.

| File | What it is |
| --- | --- |
| [half-warm.css](half-warm.css) | **Active.** The mockup's warm grays at their own lightness and hue, with half their chroma (OKLab). The values in `stylesheet/00-tokens.css` and `stylesheet/11-prism.css` match this file |
| [warm.css](warm.css) | The mockup's original warm grays, hue 30–40°. Active until 2026-10-14 |
| [pure-gray.css](pure-gray.css) | Each warm gray at its own perceived lightness (OKLab L), with no hue |

Lightness is matched across all three, so switching palettes changes only how warm the page feels, never its contrast.

## Switching palettes

Copy a file into the stylesheet bundle as `stylesheet/99-palette.css`. The bundle loads its files in name order, so that file loads last and its values win. Delete it to return to the half-warm values. To make a switch permanent, copy the file's values into `00-tokens.css` and `11-prism.css` instead, and update the table above.

This folder must stay outside `stylesheet/`: the bundle includes every file in that folder, so a palette left there would override the tokens without anyone choosing it.
