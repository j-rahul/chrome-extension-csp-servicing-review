  var startTime = undefined; 
  
  var request = new XMLHttpRequest()

  request.open('GET', 'https://whatsprintis.it/sprint', true)
  
  request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  console.log(data.start);	
  startTime = data.start;
}

  
  request.send(); 
 
  changeColor.onclick = function(element) {
	  
	var services = ["mps", "sps", "tfs", "user", "vssf"]; 
	var servicingDirs = [];
	for(var i=0; i<services.length; i++){
		if(services[i] == "vssf"){
			servicingDirs[i] = encodeURIComponent("/" + services[i] + "/sdk/servicing"); 
		} else {
			servicingDirs[i] = encodeURIComponent("/" + services[i] + "/service/servicing"); 
		}
	}
	
	var urls = []; 
	
	for(var i=0; i<servicingDirs.length; i++){
		var servicingDir = servicingDirs[i];
		var endcodedTime = encodeURI(startTime);
		var historySearchCriteria = "&historySearchCriteria=" + encodeURI("{\"fromDate\":\"" + startTime + "\"" + ",\"gitLogHistoryMode\":\"firstParent\"}").replace("%22", "\"");
		var version = "&version=GBmaster";
		var history = "&_a=history"; 
		var queryParams = servicingDir + version + historySearchCriteria + history;
		var azDevOpsurl = "https://dev.azure.com/mseng/_git/AzureDevOps?path=" + queryParams; 
		urls[i] = azDevOpsurl;
	}
	
	for (var i = 0; i < urls.length; i++) {
    // will open each link in the current window
    chrome.tabs.create({
        url: urls[i]
    });
	}
  };