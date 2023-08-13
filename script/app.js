/* const site = window.location.hostname;

async function isSiteBlocked(site) {
	return new Promise((resolve) => {
		chrome.storage.sync.get(["blockedSites"], (data) => {
			const blockedSites = data.blockedSites || {};
			resolve(blockedSites[site] && blockedSites[site].blocked ? true : false);
		});
	});
}

isSiteBlocked(site).then((blocked) => {
	if (blocked) {
		alert("Site is blocked: " + site);

		
	} else {
		console.log("Site is not blocked: " + site);
	}
}); */
