if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", afterDOMLoaded);
} else {
	afterDOMLoaded();
}

function afterDOMLoaded() {
	document.querySelector("#go-to-options").addEventListener("click", function () {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL("options.html"));
		}
	});
}
