# theme-emissary-dev — Agent Notes

See [README.md](README.md) for what each file does. These are the rules behind the stylesheet that look removable and are not.

## The theme is dark in every color scheme, so nothing may sit inside `prefers-color-scheme`

`theme-global` keeps its dark values inside `@media (prefers-color-scheme: dark)`, so a visitor whose browser asks for light mode gets light values. This theme is dark only, so [stylesheet/00-tokens.css](stylesheet/00-tokens.css) sets every token on a plain `:root`, which loads after the global stylesheet and wins. That includes `theme-global`'s dark blue, red, and green ramps, and its dark-mode `--weight: 400`, restated in full.

Some `theme-global` rules are written inside a media query instead of through a token. [stylesheet/05-dark-only.css](stylesheet/05-dark-only.css) restates them, citing the file each came from. When `theme-global` adds or changes a `prefers-color-scheme: dark` rule, copy it there too, or a light-mode visitor sees the light version inside a dark page. `01-more-colors.css`'s `--color-*` palette is not restated, because no template uses it.

## The gray ramp is the mockup's grays at half their warmth, not theme-global's ramp

`theme-global/AGENTS.md` requires its dark grays to keep green equal to blue (hue 0). That rule is for `theme-global`'s own ramp. This theme replaces every step from `--gray00` to `--gray100`, using the mockup's colors as anchors: `--gray00` is the mockup's `--bg1`, `--gray05` its `--bg2`, `--gray10` its `--bg3`, `--gray15` its `--bg4`, `--gray20` its `--line`, `--gray40` its `--faint`, `--gray60` its `--muted`, and `--gray80` its `--text`. The steps between them are interpolated, so the hue drifts from 30° to 40° the way the mockup's own colors do. Since 2026-10-14 every neutral is at half the mockup's chroma (OKLab), with its lightness and hue unchanged; [palettes/](palettes/README.md) keeps the full-warm and pure-gray versions. Change a neutral in all three palette files, or the backups stop matching the theme.

Every step must get lighter than the one before it. Check that before changing a value, because `theme-global`'s components pick steps by number, and a step out of order shows up as a border lighter than the text beside it.

## `--white` and `--black` are roles

As in `theme-global`, `--white` is the page surface (`--gray00`) and `--black` the strongest text (`--gray100`). A value that must stay light, such as text on the magenta primary button, is a literal `#ffffff`, never `var(--white)`.

## The theme implements theme-global's class interface, and does not invent parallel classes

Templates across Emissary are written against the classes documented in `theme-global/README.md` and the ones copied from `theme-default` (the nav bar, `#menu-bar`, `.page`, `.framed`, `.app`, `.pill`). This theme restyles those classes; it does not invent parallel ones. A piece of the mockup that matches an existing widget is built from that widget: the tab strip from the ARIA tabs in `03-widgets-tabs.css`, the version badges from `.pill`, callouts from `.info` or `.alert-*`. A new class is added only where no existing one fits, and is named for this theme. Ben decided this on 2026-10-14.

The card variants `.magenta`, `.teal`, `.gold`, `.gray`, `.violet`, `.blue`, `.green`, `.coral`, `.orange`, `.indigo`, `.lime`, `.jade`, and `.rose` are the deliberate exception: Ben asked for them by those names as modifiers on `.card`, following the pattern of `.tag.blue` and `.tag.green`. They are scoped to `.card` in [stylesheet/07-cards.css](stylesheet/07-cards.css), so they mean nothing on other elements.

## Type sizes stay on the rhythm scale, at 7px

Every type size, line height, margin, and padding is a multiple of `--rhythm`, as in `theme-global`: `p` and `.text-md` are 2r, `h1` 5r, the line height 3r. This theme sets `--rhythm: 7px` in [stylesheet/04-type.css](stylesheet/04-type.css) instead of `theme-global`'s 8px, which puts body text at 14px on a 21px line, close to the mockup's 13px on 22px. Change the unit there, never individual sizes, so every template sized against the scale stays in proportion. The `:root` rule wins over `theme-global`'s breakpoint resets of `--rhythm` only because this stylesheet loads after the global one. Ben chose 7px on 2026-10-14, after comparing it with 6.5px, the mockup's exact body size.

One exception: the Explorer tree in the LEFT slot uses the mockup's sizes, 13px entries and an 11px label, 1px under the 14px body, because Ben asked for the sidebar to match the mockup. It is scoped to `.widgets.LEFT .widget-navigation` in [stylesheet/06-article.css](stylesheet/06-article.css) and reaches nothing else.

## The mobile menu is theme-minimal's, and so are its rules

[navigation.html](navigation.html) and [stylesheet/08-nav-menu.css](stylesheet/08-nav-menu.css) copy the mobile menu from `emissary/_embed/templates/theme-minimal`, whose AGENTS.md explains every rule this one keeps: the checkbox comes before the label and the sheet, `role="button"` stays on the checkbox, sheet links carry no `id` and not `.nav-item` so SelectNav leaves them alone, the menu is a `<div role="navigation">` and never a second `<nav>`, the sheet hides with `visibility` rather than `display`, and the skip link sits outside both layouts. Read it before changing either file. [page.html](page.html) no longer wraps the template in `<nav>`, because the menu has to sit outside it.

Two differences from minimal. The signed-in links (Profile, Inbox, and the rest) stay in the desktop bar, as in `theme-default`, so the sheet repeats them under `.nav-menu-account`; without that they would vanish on a phone. And the control is a fixed 44px, because minimal's `--rhythm * 5.5` comes to only 38.5px at this theme's 7px rhythm.

## The title bar's height is one token, and the sticky rails depend on it

[stylesheet/09-titlebar.css](stylesheet/09-titlebar.css) sets `--titlebar-height`. The sticky LEFT and RIGHT rails in `06-article.css` start at that height plus `2r`, and `scroll-padding-top` keeps in-page anchors (the outline's links) from landing under the bar. Change the bar's height through the token, never in one place.

## Cards never show the Markdown heading marks

The `#`, `##`, and `###` marks in [stylesheet/06-article.css](stylesheet/06-article.css) are for the article's own headings. [stylesheet/07-cards.css](stylesheet/07-cards.css) turns them off inside any `.card` with a selector at the same specificity as the mark rules, which wins only because `07` loads after `06`. Keep that order, or raise the specificity, when renaming either file.

## Card accents sit at OKLCH lightness 0.74 or above

Every card accent in [stylesheet/00-tokens.css](stylesheet/00-tokens.css) has an OKLCH lightness of at least 0.74, which keeps each one at 6:1 or better against the panel and stops any one color reading dim beside the others. A new accent starts at L 0.74 at its own hue, lowering chroma only as far as sRGB requires, and its `-hi` and `-dim` steps keep the same offsets as the others. Cards read `--magenta-card*`, not `--magenta*`: the brand magenta stays darker everywhere else, so change the two separately. `--neutral` also lives in the three [palettes/](palettes/README.md) files, at matched lightness.

## The code bar is built in the browser, and only once per block

The Markdown output is a bare `<pre><code class="language-…">`, so [javascript/code-bar.js](javascript/code-bar.js) adds the `.codeblock` wrapper and its bar on first load and on every `htmx:load`. It skips a block already inside a `.codeblock`, because `htmx:load` can fire more than once over the same content. It writes page text only through `textContent`. Without scripting the bare `<pre>` keeps the full frame from `10-markdown.css`, so nothing looks broken. Like every file in a javascript bundle, it ends with a semicolon (see `theme-global/AGENTS.md`).

Copying is `theme-global`'s Clipboard behavior (`hyperscript/clipboard._hs`), not code of this theme's. code-bar.js writes the markup it expects: `script="install Clipboard"` on the `.codeblock`, `.clipboard-text` on the `<pre>`, a `.clipboard-copy-button`, and a `.clipboard-copy-feedback` that starts with an inline `display:none`. It copies the `<pre>`'s `innerText`, which is the source text even after Prism wraps it in tokens. Hyperscript processes the page and each htmx swap before code-bar.js adds its wrappers, so code-bar.js calls `_hyperscript.process` on them itself, and waits for `hyperscript:ready` on first load, because `install Clipboard` fails before the global hyperscript bundle has been fetched. The behavior has no fallback when the clipboard is refused, as it is outside a secure context.

## The griffin watermark owns the document panel's `::before`

[stylesheet/06-article.css](stylesheet/06-article.css) draws [resources/griffin.svg](resources/griffin.svg) (the Emissary icon, animal only) as a CSS mask on `.content-main > [class^="layout-"]::before`, in `--text` at `--watermark-strength` (2.1%). Three things hold it together. The pseudo-element covers the panel exactly (`inset: 0`) and the mask is positioned partly off its edges, so the panel's own box crops the griffin; the panel cannot use `overflow: hidden`, because the sibling tabs hang above its top edge. The panel sets `isolation: isolate`, so `z-index: -1` puts the griffin behind the content but in front of the panel's background. And the color is `--text` rather than a fixed hex, so it follows whichever palette is active. Do not use the panel's `::before` for anything else. Raise the strength carefully: at 2.1% the griffin is 3 to 4 points lighter than the panel per channel, against roughly 175 for body text.

## The outline hides below 1180px, and the article comes first below 860px

`06-article.css` uses the mockup's breakpoints, not `theme-default`'s 768px. At 768px a 260px Explorer and a 220px outline left the article column about 300px wide. Below 1180px the outline (`#scrollspy`) hides, and so does a RIGHT slot holding nothing else, matched with `:has(> :not(style, script, #scrollspy))`; an outline at the end of the page helps nobody. Other RIGHT widgets stay visible. Below 860px the article is a flex column with `.content-main` ordered first, so a reader reaches the text without scrolling past the Explorer. `viewer.css` from `stream-article-base` draws side columns from 768px and loads after this theme, so every rule here that undoes it (width, margin, border, flex direction) is written with a more specific selector rather than relying on order.

