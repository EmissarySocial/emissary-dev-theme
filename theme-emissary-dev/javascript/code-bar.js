/**
 * CODE BAR: the mockup's title bar over each code block in an article, showing
 * the block's language and a Copy button.
 *
 * The Markdown output is a bare <pre><code class="language-…">, with no place
 * for a bar, so this wraps each block in a .codeblock and adds the bar in the
 * browser: on first load, and again on htmx:load for every swapped page.  A
 * block already inside a .codeblock is skipped, so running twice is harmless.
 *
 * The Copy button copies the block's text, through one listener on the
 * document, so it works on every swapped page without re-binding.  When the
 * browser refuses the clipboard, the code is selected for the reader to copy.
 *
 * Text from the page goes in through textContent only, never as markup.
 */
(function () {

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
			pre.parentElement.insertBefore(wrapper, pre)
			wrapper.appendChild(pre)

			// Build the bar: the language, then the Copy mockup
			var bar = document.createElement("div")
			bar.className = "codeblock-bar"

			var language = document.createElement("span")
			language.className = "codeblock-language"
			language.textContent = codeLanguage(pre)
			bar.appendChild(language)

			var copy = document.createElement("button")
			copy.type = "button"
			copy.className = "codeblock-copy"
			copy.textContent = "Copy"
			copy.setAttribute("aria-label", "Copy code")
			bar.appendChild(copy)

			wrapper.insertBefore(bar, pre)
		}
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

	// copyCode copies the code under a Copy button, then says so on the button for a moment
	function copyCode(button) {

		var pre = button.closest(".codeblock").querySelector("pre")
		var text = pre.textContent

		// Without clipboard access, select the code so the reader can copy it themselves
		if (!navigator.clipboard) {
			selectCode(pre)
			showCopied(button, "Selected")
			return
		}

		navigator.clipboard.writeText(text).then(function () {
			showCopied(button, "Copied")
		}, function () {
			selectCode(pre)
			showCopied(button, "Selected")
		})
	}

	// selectCode selects every character in a code block
	function selectCode(pre) {
		var range = document.createRange()
		range.selectNodeContents(pre)
		var selection = window.getSelection()
		selection.removeAllRanges()
		selection.addRange(range)
	}

	// showCopied puts a short status on the button, then restores its label
	function showCopied(button, status) {
		button.textContent = status
		button.classList.add("copied")
		setTimeout(function () {
			button.textContent = "Copy"
			button.classList.remove("copied")
		}, 1500)
	}

	// One listener serves every Copy button, including those on pages htmx swaps in
	document.addEventListener("click", function (event) {
		var button = event.target.closest(".codeblock-copy")
		if (button) {
			copyCode(button)
		}
	})

	// Bars for the first page, and for every page htmx swaps in
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () {
			addCodeBars(document)
		})
	} else {
		addCodeBars(document)
	}

	document.addEventListener("htmx:load", function (event) {
		addCodeBars(event.detail.elt)
	})
})();
