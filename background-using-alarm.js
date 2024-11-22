// background.js (service worker)

chrome.runtime.onInstalled.addListener(() => {
	console.log("Service worker installed.");
	
	clearSiteData();
	refreshAllTabs();
	
	// Set an alarm to run every 5 minutes
	chrome.alarms.create("refreshAlarm", { periodInMinutes: 5 });
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === "refreshAlarm") {
	  console.log("Clearing site data and refreshing tabs...");
  
	  clearSiteData();
	  refreshAllTabs();
	}
  });
  
  // Function to clear site data (e.g., cookies, cache)
  function clearSiteData() {
	chrome.browsingData.remove({ "since": 0 }, {
	  "cookies": true,
	  "cache": true,
	  "localStorage": true,
	  "indexedDB": true,
	  "fileSystems": true,
	  "pluginData": true
	}, () => {
	  console.log("Site data cleared.");
	});
  }
  
  // Function to refresh all open tabs
  function refreshAllTabs() {
	chrome.tabs.query({}, (tabs) => {
	  tabs.forEach((tab) => {
		chrome.tabs.reload(tab.id);
	  });
	  console.log("Tabs refreshed.");
	});
  }
  