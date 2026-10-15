# Sibling Tabs

This widget (widgetId `sibling-tabs`) shows the current stream and its siblings as a row of tabs, with the current stream selected. It belongs to the [Emissary Dev theme](../theme-emissary-dev/README.md), which places it in an article's TOP slot so the tabs sit on the top edge of the document panel, like the open files in an editor.

[widget.html](widget.html) lists `.Siblings`, ordered by rank and capped at 60, as `theme-global`'s ARIA tabs: a `role="tablist"` of `role="tab"` links, with `aria-selected="true"` and `aria-current="page"` on the current stream. Links use `hx-get` inside the wrapper's `hx-target="main"`, so a click swaps `<main>` and the tabs re-render for the new page.

The tabs are a widget, not part of the theme's `page.html`, because `page.html` also renders admin, profile, and inbox pages whose builders have no `Siblings` method, and a Go template cannot test for a method before calling it.

The loader registers widgets for the whole server, not per theme, so this widget appears in the widget picker under every theme on a server that loads this repository.

The wrapper is a `<div role="navigation">`, not a `<nav>`. `theme-default`'s layout rules, which most themes copy, style every `nav` and `nav a` as the site's top bar: centered, 48px tall, with padded column-layout links. A `<nav>` here inherits all of it.
