chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed.");
	startClearAndRefresh();
	refreshAllTabs();
  });
  
  // Function to start the 5-minute interval for clearing data and refreshing
  function startClearAndRefresh() {
	setInterval(() => {
	  clearSiteData();
	  refreshAllTabs();
	}, 5 * 60 * 1000); // 5 minutes in milliseconds
  }
  
  // Function to clear browsing data
  function clearSiteData() {
	chrome.browsingData.remove({
	  "since": 0
	}, {
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
  
