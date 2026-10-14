# Emissary Dev

The site theme for [emissary.dev](https://emissary.dev): a dark, editor-style look for documentation, built from the design mockups in the Dave worktree's `emissary-dev/design/` folder. It is not part of the standard Emissary distribution, and is loaded through a `FILE` templates location that points at the folder containing this one.

[theme.hjson](theme.hjson) declares `themeId: emissary-dev` with `extends: ["global"]`, so this folder supplies only the page chrome and its stylesheet. Shared styles, scripts, and resources come from Emissary's `theme-global`, served under `/.themes/global/...`.

## Files

- [page.html](page.html) is the outer page: the head and foot includes, the `<nav>` bar, and the `<main>` element that htmx swaps on every navigation.
- [navigation.html](navigation.html) renders the nav bar: top-level pages, then the signed-in user's icons or the Sign In link.
- [includes-head.html](includes-head.html) and [includes-foot.html](includes-foot.html) load the global and theme stylesheets, then htmx, hyperscript, and the global scripts.
- [stylesheet/](stylesheet/) holds the numbered CSS files that the `stylesheet` bundle joins in filename order and minifies, served as `/.themes/emissary-dev/stylesheet`:
  - `00-fonts.css` declares the Hack faces, served from the `fontpack` theme.
  - `00-tokens.css` holds the mockup's palette and sets `theme-global`'s color tokens from it.
  - `01-layout.css` to `03-app.css` are `theme-default`'s layout rules, unchanged so far.
  - `04-type.css` sets Hack as the font, and the link, selection, and focus colors. Sizes stay on `theme-global`'s rhythm scale.
  - `05-dark-only.css` restates the few `theme-global` rules that otherwise apply only in OS dark mode.

## Status

The palette and type are in place. The chrome, the article styles, and the widgets come next, per the `EMISSARY-DEV-WEBSITE` project plan in `emissary-specs`. See [AGENTS.md](AGENTS.md) before changing a color.
