# Emissary Dev

The site theme for [emissary.dev](https://emissary.dev): a dark, editor-style look for documentation, built from the design mockups in the Dave worktree's `emissary-dev/design/` folder. It is not part of the standard Emissary distribution, and is loaded through a `FILE` templates location that points at the folder containing this one.

[theme.hjson](theme.hjson) declares `themeId: emissary-dev` with `extends: ["global"]`, so this folder supplies only the page chrome and its stylesheet. Shared styles, scripts, and resources come from Emissary's `theme-global`, served under `/.themes/global/...`.

## Files

- [page.html](page.html) is the outer page: the head and foot includes, the navigation, and the `<main>` element that htmx swaps on every navigation.
- [navigation.html](navigation.html) renders the skip link, the desktop `<nav>` title bar (brand, top-level pages, then the signed-in user's icons or the Sign In link), and the mobile menu: a fixed control in the top-right corner that opens a full-screen sheet of the same links. It follows `theme-minimal`'s mobile menu.
- [includes-head.html](includes-head.html) and [includes-foot.html](includes-foot.html) load the global and theme stylesheets, then htmx, hyperscript, and the global scripts.
- [stylesheet/](stylesheet/) holds the numbered CSS files that the `stylesheet` bundle joins in filename order and minifies, served as `/.themes/emissary-dev/stylesheet`:
  - `00-fonts.css` declares the Hack faces, served from the `fontpack` theme.
  - `00-tokens.css` holds the mockup's palette and sets `theme-global`'s color tokens from it.
  - `01-layout.css` to `03-app.css` are `theme-default`'s layout rules, unchanged so far.
  - `04-type.css` sets Hack as the font, and the link, selection, and focus colors. Sizes stay on `theme-global`'s rhythm scale.
  - `05-dark-only.css` restates the few `theme-global` rules that otherwise apply only in OS dark mode.
  - `06-article.css` lays the article view out as an editor: LEFT widgets as the Explorer rail, the content column's `layout-*` wrapper as the document panel, RIGHT widgets outside it on the page background, `widget-navigation-list` as a file tree, the sibling tabs on the panel's top edge, `widget-scrollspy` as the outline rail, `widget-breadrumbs` as the breadcrumb, and `widget-prev-next` as the mockup's pager.
  - `06-article.css` also draws the Emissary griffin ([resources/griffin.svg](resources/griffin.svg)) as a faint watermark low in the right corner of the document panel, in the text color at 2.1% (`--watermark-strength`).
  - `07-cards.css` gives `.card` the shape of the mockup's callout, and adds `.magenta`, `.teal`, `.gold`, `.gray`, `.violet`, `.blue`, `.green`, `.coral`, `.orange`, `.indigo`, `.lime`, `.jade`, and `.rose` variants: a tinted wash, with the border, titles, bold text, and icons all in the accent color. Headings inside a card never get the Markdown `#` marks. Cards keep taking their spacing from utility classes such as `.padding`.
  - `08-nav-menu.css` styles the mobile menu below 640px, and hides the desktop bar there. The current page is marked like the Explorer tree.
  - `09-titlebar.css` makes the desktop `<nav>` the mockup's title bar: 44px, sticky, on the rail color, with a placeholder brand (the site's name after a magenta `▰▰`), the page links, and the account links. It keeps in-page anchors below the bar.
  - `10-markdown.css` styles the article body (`.e-content`) like the mockup's document: a 68-character measure for text, inline code as a magenta chip, code blocks in the mockup's frame (Prism colors them later), blockquotes as the magenta callout, tables as the mockup's parameter table, and definition lists. It hides the link icon the Markdown renderer adds to every heading, which `theme-global` would show on hover. Code elements are set in Hack, since `theme-global` gives `code` its own font stack.
  - `11-prism.css` colors Prism's tokens with the mockup's warm palette (`prism-relay-warm.css`): magenta keywords, amber functions, tan strings, lavender numbers, coral types. Only the colors; `10-markdown.css` draws the frame and the bar.

The sibling tabs are their own widget, [widget-sibling-tabs](../widget-sibling-tabs/README.md), in this repository. Place it in an article's TOP slot.

## Status

The palette, type, article layout, file tree, and sibling tabs are in place. The title bar, the article's Markdown styles, and the outline come next, per the `EMISSARY-DEV-WEBSITE` project plan in `emissary-specs`. See [AGENTS.md](AGENTS.md) before changing a color.

## Code highlighting

[includes-foot.html](includes-foot.html) loads Prism from `theme-global` (`resources/prism-1.30.0/prism.min.js`) before the global javascript bundle, which highlights each page htmx swaps in and defines HJSON. This theme's own javascript bundle, [javascript/code-bar.js](javascript/code-bar.js), wraps each article code block in a `.codeblock` with the mockup's title bar: the language in teal, and a Copy button driven by `theme-global`'s Clipboard behavior (`hyperscript/clipboard._hs`).

## Palettes

The neutrals are the mockup's warm grays at half their warmth. [palettes/](palettes/README.md) keeps three versions (half warm, the original warm, and pure gray) and explains how to switch between them.

## Screen sizes

The article layout follows the mockup's breakpoints, in `06-article.css`:

| Width | Layout |
| --- | --- |
| 1180px and up | Three columns: the Explorer (LEFT widgets), the document panel, and the outline (RIGHT widgets) |
| 860px to 1179px | The Explorer and the panel. The outline hides; any other RIGHT widgets sit in a row under the panel |
| Below 860px | One column: the panel first, then the Explorer, then any RIGHT widgets other than the outline. The panel keeps its frame inside a 14px gutter |
| Below 640px | The title bar is replaced by the mobile menu, content starts below its button, and the Previous/Next buttons stack |

Wide tables scroll sideways inside the panel below 860px, and long words and URLs wrap at every width.

