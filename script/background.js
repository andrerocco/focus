/* chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.sync.get(["blockedSites"], (list) => {
		if (!Array.isArray(list.blocked)) {
			chrome.storage.list.set({ blocked: [] });
		}

		if (typeof list.enabled !== "boolean") {
			chrome.storage.list.set({ enabled: false });
		}
	});
}); */

import { isSiteBlocked } from "./storage.js";

function checkInstalation() {
	chrome.storage.sync.get(["blockedSites"], (list) => {
		// Checks if blockedSites is an object
		if (typeof list.blockedSites !== "object") {
			chrome.storage.sync.set({ blockedSites: {} });
		}
	});
}

// chrome.runtime.onInstalled.addListener calls a callback any time the extension is installed or updated.
// What we do here, we simply check if blocked and enabled are of a correct format, and if not, we reset them.
chrome.runtime.onInstalled.addListener();

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	// If the tab is not fully loaded yet, we don't want to do anything and return.
	const url = changeInfo.pendingUrl || changeInfo.url;
	if (!url || !url.startsWith("http") || !url.startsWith("https")) {
		return;
	}

	// Get the hostname from the url.
	const hostname = new URL(url).hostname;

	// TODO - Not working
	chrome.storage.sync.get(["blockedSites"], (list) => {
		const blockedSites = list.blockedSites || {};
		if (blockedSites[hostname] && blockedSites[hostname].blocked) {
			chrome.tabs.remove(tabId);
		}
	});
});
