// Recieves a validated site string and adds it as a blocked site.
export async function addBlockedSite(site) {
	chrome.storage.sync.get(["blockedSites"]).then((result) => {
		let blockedSites = result.blockedSites || {};
		blockedSites[site] = {
			blocked: true,
		};
		chrome.storage.sync.set({ blockedSites: blockedSites });
	});
}

// Recieves a validated site string and removes it from the blocked sites.
export function removeBlockedSite(site) {
	chrome.storage.sync.get(["blockedSites"]).then((result) => {
		let blockedSites = result.blockedSites || {};
		delete blockedSites[site];
		chrome.storage.sync.set({ blockedSites: blockedSites });
	});
}

// Returns a promise that resolves to the blockedSites object.
export async function getBlockedSites() {
	const result = await new Promise((resolve) => {
		chrome.storage.sync.get(["blockedSites"], (data) => {
			resolve(data);
		});
	});
	return result.blockedSites;
}

// Returns true if site is in blockedSites and its blocked property is true.
export async function isSiteBlocked(site) {
	const blockedSites = await getBlockedSites();
	return blockedSites[site] && blockedSites[site].blocked ? true : false;
}
