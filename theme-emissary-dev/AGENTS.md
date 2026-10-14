# theme-emissary-dev — Agent Notes

See [README.md](README.md) for what each file does. These are the rules behind the stylesheet that look removable and are not.

## The theme is dark in every color scheme, so nothing may sit inside `prefers-color-scheme`

`theme-global` keeps its dark values inside `@media (prefers-color-scheme: dark)`, so a visitor whose browser asks for light mode gets light values. This theme is dark only, so [stylesheet/00-tokens.css](stylesheet/00-tokens.css) sets every token on a plain `:root`, which loads after the global stylesheet and wins. That includes `theme-global`'s dark blue, red, and green ramps, and its dark-mode `--weight: 400`, restated in full.

Some `theme-global` rules are written inside a media query instead of through a token. [stylesheet/05-dark-only.css](stylesheet/05-dark-only.css) restates them, citing the file each came from. When `theme-global` adds or changes a `prefers-color-scheme: dark` rule, copy it there too, or a light-mode visitor sees the light version inside a dark page. `01-more-colors.css`'s `--color-*` palette is not restated, because no template uses it.

## The gray ramp is the mockup's, not theme-global's warm gray

`theme-global/AGENTS.md` requires its dark grays to keep green equal to blue (hue 0). That rule is for `theme-global`'s own ramp. This theme replaces every step from `--gray00` to `--gray100`, using the mockup's colors as anchors: `--gray00` is the mockup's `--bg1`, `--gray05` its `--bg2`, `--gray10` its `--bg3`, `--gray15` its `--bg4`, `--gray20` its `--line`, `--gray40` its `--faint`, `--gray60` its `--muted`, and `--gray80` its `--text`. The steps between them are interpolated, so the hue drifts from 30° to 40° the way the mockup's own colors do.

Every step must get lighter than the one before it. Check that before changing a value, because `theme-global`'s components pick steps by number, and a step out of order shows up as a border lighter than the text beside it.

## `--white` and `--black` are roles

As in `theme-global`, `--white` is the page surface (`--gray00`) and `--black` the strongest text (`--gray100`). A value that must stay light, such as text on the magenta primary button, is a literal `#ffffff`, never `var(--white)`.

## The theme implements theme-global's class interface, and does not invent parallel classes

Templates across Emissary are written against the classes documented in `theme-global/README.md` and the ones copied from `theme-default` (the nav bar, `#menu-bar`, `.page`, `.framed`, `.app`, `.pill`). This theme restyles those classes; it does not invent parallel ones. A piece of the mockup that matches an existing widget is built from that widget: the tab strip from the ARIA tabs in `03-widgets-tabs.css`, the version badges from `.pill`, callouts from `.info` or `.alert-*`. A new class is added only where no existing one fits, and is named for this theme. Ben decided this on 2026-10-14.

## Type sizes stay on the rhythm scale

The mockup sets everything at 13px. The theme does not: `p`, `.text-md`, every `.text-*` size, and `h1` to `h3` keep `theme-global`'s sizes, which are multiples of `--rhythm` (8px), and so do margins and padding. Only the font family changes. Ben decided this on 2026-10-14, so that every template sized against the scale renders as designed.
