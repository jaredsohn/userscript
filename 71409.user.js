// ==UserScript==
// @name           SelectiveHide
// @namespace      http://varunkumar-n.blogspot.com
// @description    Script for hiding tweets about a specific topic
// @include        http://twitter.com/*
// ==/UserScript==
window.addEventListener('load', function() {
	
	var header = document.getElementById('header');
	
	var filterDiv = document.createElement("div");
	filterDiv.innerHTML = "Exclude Filters <input title='Specify the filters to be excluded from your timeline. Leave it blank to clear the filter' type='text' id='txtExFilters' style='height: 25px'/><input type='button' value='Refresh' onclick='refreshFilters()'/>";
          
	header.appendChild(filterDiv);
	
	unsafeWindow.refreshFilters = function () {
		var txtExFilters = document.getElementById('txtExFilters');
		var exFiltersStr = txtExFilters.value;
		var statuses = document.evaluate("//ol/li", document, null, XPathResult.ANY_TYPE, null); 

		var excludeFilters = exFiltersStr.split(",");//["Oscar", "oscar", "Oscars", "oscars", "#Oscar", "#oscar", "#Oscars", "#oscars"];
		var matchedTweets = [];
		var unmatchedTweets = [];
		
		var clearFilter = false;
		// ToDo: Trim the filters
		if (exFiltersStr == "")
			clearFilter = true;
		
		var status = statuses.iterateNext(); 
		while (status) {
			var content = status.textContent;
			if (!clearFilter) {
				var found = false;
				for (var i = 0; i < excludeFilters.length; i++) {
					var filter = excludeFilters[i];
					if (content.indexOf(filter) != -1) {
						matchedTweets.push(status);
						found = true;
						break;
					} 
				}
				
				if (!found) {
					unmatchedTweets.push(status);
				}
				
			} else 
				unmatchedTweets.push(status);
			status = statuses.iterateNext();
		}
		
		for (var i = 0; i < matchedTweets.length; i++) {
			var tweet = matchedTweets[i];
			tweet.style.display = 'none';
		}
		
		for (var i = 0; i < unmatchedTweets.length; i++) {
			var tweet = unmatchedTweets[i];
			tweet.style.display = 'block';
		}
		
	};
}, true);