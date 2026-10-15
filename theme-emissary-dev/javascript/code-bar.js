/**
 * CODE BAR: the mockup's title bar over each code block in an article, showing
 * the block's language and a Copy button.
 *
 * The Markdown output is a bare <pre><code class="language-…">, with no place
 * for a bar, so this wraps each block in a .codeblock and adds the bar in the
 * browser: on first load, and again on htmx:load for every swapped page.  A
 * block already inside a .codeblock is skipped, so running twice is harmless.
 *
 * Copying is theme-global's Clipboard behavior: this only writes the markup it
 * expects, then asks hyperscript to install it.
 *
 * Text from the page goes in through textContent only, never as markup.
 */
(function () {

	// TRUE once hyperscript has loaded theme-global's behaviors, including Clipboard
	var hyperscriptReady = false

	// addCodeBars wraps every article code block under root that has no bar yet
	function addCodeBars(root) {

		var blocks = root.querySelectorAll(".e-content pre")

		for (var index = 0; index < blocks.length; index++) {
			var pre = blocks[index]

			// RULE: one bar per block, however many times this runs
			if (pre.parentElement.classList.contains("codeblock")) {
				continue
			}

			// Wrap the block, so the frame can hold the bar and the code together
			var wrapper = document.createElement("div")
			wrapper.className = "codeblock"
			wrapper.setAttribute("script", "install Clipboard")
			pre.parentElement.insertBefore(wrapper, pre)
			wrapper.appendChild(pre)

			// The Clipboard behavior copies the first .clipboard-text inside it
			pre.classList.add("clipboard-text")

			// Build the bar: the language, the Copy button, and its hidden feedback
			var bar = document.createElement("div")
			bar.className = "codeblock-bar"

			var language = document.createElement("span")
			language.className = "codeblock-language"
			language.textContent = codeLanguage(pre)
			bar.appendChild(language)

			var copy = document.createElement("button")
			copy.type = "button"
			copy.className = "codeblock-copy clipboard-copy-button"
			copy.textContent = "Copy"
			copy.setAttribute("aria-label", "Copy code")
			bar.appendChild(copy)

			var feedback = document.createElement("span")
			feedback.className = "codeblock-copied clipboard-copy-feedback"
			feedback.textContent = "Copied"
			feedback.style.display = "none"
			bar.appendChild(feedback)

			wrapper.insertBefore(bar, pre)
		}

		installClipboards(root)
	}

	// codeLanguage returns the language named by a block's language-… class, or "text"
	function codeLanguage(pre) {

		var code = pre.querySelector("code")
		var classes = (code || pre).classList

		for (var index = 0; index < classes.length; index++) {
			if (classes[index].indexOf("language-") === 0) {
				return classes[index].substring("language-".length)
			}
		}

		return "text"
	}

	// installClipboards runs hyperscript over the code blocks under root
	function installClipboards(root) {

		// RULE: before hyperscript:ready, Clipboard is not defined yet, and hyperscript:ready installs it
		if (!hyperscriptReady) {
			return
		}

		// Hyperscript skips an element it has already initialized, so this is safe to repeat
		var wrappers = root.querySelectorAll(".codeblock")
		for (var index = 0; index < wrappers.length; index++) {
			window._hyperscript.process(wrappers[index])
		}
	}

	// Bars for the first page
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () {
			addCodeBars(document)
		})
	} else {
		addCodeBars(document)
	}

	// Hyperscript processes the page before these wrappers may exist, so install them once it is ready
	document.addEventListener("hyperscript:ready", function () {
		hyperscriptReady = true
		installClipboards(document)
	})

	// Bars for every page htmx swaps in.  Hyperscript's own htmx:load handler runs before this one
	document.addEventListener("htmx:load", function (event) {
		addCodeBars(event.detail.elt)
	})
})();
