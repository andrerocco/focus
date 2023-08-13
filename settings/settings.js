import { addBlockedSite, getBlockedSites } from "../script/storage.js";

document.getElementById("add_site_button").addEventListener("click", function () {
	const siteInput = document.getElementById("site_input");
	const site = siteInput.value.trim();

	if (site) {
		// TODO - validate site url
		addBlockedSite(site);
		console.log("Added site: " + site);
		siteInput.value = "";
	} else {
		alert("Site is empty");
	}
});

document.getElementById("get_sites_button").addEventListener("click", async function () {
	const blockedSites = await getBlockedSites();
	console.log(blockedSites);
});
