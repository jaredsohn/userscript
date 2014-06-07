// ==UserScript==
// @name          IMDB Bacon Number / Center Number
// @grant     	  GM_xmlhttpRequest
// @namespace     http://userscripts.org/users/6623/scripts
// @description	  Adds an indicator on an IMDB name page telling you that person's "Bacon Number" and/or "Center Number" (from the Oracle of Bacon at Virginia)
// @include       http://www.imdb.com/name/nm*/
// @include       http://imdb.com/name/nm*/
// @version       1.7
// ==/UserScript==

/* User-configurable options -- comment or uncomment each line to your own liking */

// add Bacon Number to the name page
var showBaconNumber = true; 
// var showBaconNumber = false;

// add Center Number to the name page
var showCenterNumber = true; 
//var showCenterNumber = false;

// compare the person's Center Number to Kevin Bacon's Center Number
var showBaconComparison = true; 
//var showBaconComparison = false;


/* End of user-configurable options */

/* Begin script*/

var personName = findName();

if (showCenterNumber)
{
	addCenterText();
	var personCenterNumber = getCenterNumber(personName);
}

if (showBaconNumber)
{
	addBaconText();
	getBaconNumber(personName);
}

/* end script*/

// Functions ----------- //

function getBaconNumber(personName) {
	var bacon_url = 'http://oracleofbacon.org/cgi-bin/movielinks?game=0&a=Kevin+Bacon&b=' + escape(personName);
	GM_xmlhttpRequest({
			method: 'GET',
			url: bacon_url,
			onload: function(responseDetails) {
				var match = responseDetails.responseText.match(/Bacon number of ([\d]+)\./);
				if (match) {
					// found a matching bacon number
					bacon_number = match[1];
					var addedDiv = document.getElementById('greaseTextBacon');
					addedDiv.innerHTML = '<h4 class="inline">Bacon Number:</h4> <a class="inline" href="' + bacon_url + '">' + bacon_number + '</a>';
					addedDiv.style.color='black';
				} else {
					// did not find bacon number
					var addedDiv = document.getElementById('greaseTextBacon');
					addedDiv.innerHTML = '<h4 class="inline">Bacon Number:</h4> Unable to find';
					addedDiv.style.color='red';
				}
			}
	});
} // end function getBaconNumber

function getCenterNumber(personName) {
	var centerURL = 'http://oracleofbacon.org/cgi-bin/center-cgi?who=' + escape(personName);
	GM_xmlhttpRequest({
			method: 'GET',
			url: centerURL,
			onload: function(responseDetails) {
				var disabled = responseDetails.responseText.match(/This feature is temporarily disabled for actors/);
				if (disabled) {
					var addedDiv = document.getElementById('greaseTextCenter');
					addedDiv.innerHTML = '<H4 class="inline">Center Number:</H4>\nThis feature is temporarily disabled for actors other than Kevin Bacon.';
					addedDiv.style.color='red';
				}
				else {
					var search_string = ' number: '; // find this on the target page
					var match = responseDetails.responseText.search(search_string);
					var center_number = responseDetails.responseText.substring(match + search_string.length,match + search_string.length + 5);
					if (match != -1) {
						// found a center number
						var addedDiv = document.getElementById('greaseTextCenter');
						addedDiv.innerHTML = '<H4 class="inline">Center Number:</h4> <a href="' + centerURL + '">' + center_number + '</a>';
					} else {
						// did not find center number
						var addedDiv = document.getElementById('greaseTextCenter');
						addedDiv.innerHTML = '<H4 class="inline">Center Number:</H4>\nUnable to find';
						addedDiv.style.color='red';
					}
					if (showBaconComparison) {
					var BaconCenterURL = 'http://oracleofbacon.org/cgi-bin/center-cgi?who=Kevin+Bacon';
					GM_xmlhttpRequest({
							method: 'GET',
							url: BaconCenterURL,
							onload: function(responseDetails) {
								var search_string = ' number: '; // find this on the target page
								var match = responseDetails.responseText.search(search_string);
								var BaconCenterNumber = responseDetails.responseText.substring(match + search_string.length,match + search_string.length + 5);
								if (match != -1) {
									// found Bacon's center number
									var BaconsNum = parseFloat(BaconCenterNumber);
									var personsNum = parseFloat(center_number);
									if (personsNum < BaconsNum)
									{
										addedDiv.innerHTML += " (Better Than <A HREF='http://www.imdb.com/name/nm0000102/'>Kevin Bacon</A>'s <A HREF='http://oracleofbacon.org/cgi-bin/center-cgi?who=Kevin+Bacon'>" + BaconCenterNumber + "</A>)";
									} else
									{
										addedDiv.innerHTML += " (Worse Than <A HREF='http://www.imdb.com/name/nm0000102/'>Kevin Bacon</A>'s <A HREF='http://oracleofbacon.org/cgi-bin/center-cgi?who=Kevin+Bacon'>" + BaconCenterNumber + "</A>)";
									}
								}
							}
						});
					}
				}
			}
	});
} // end function getCenterNumber

function compareBaconCenter(personCenterNumber) {
} // end function compareBaconCenter

function addBaconText() {
	var findPattern = "//div[@class='txt-block']";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var link = results.snapshotItem(1);
	var addedDiv = document.createElement('div');
	addedDiv.innerHTML = '<H4 class="inline">Bacon Number:</H4> checking <img src="'+'data:image/gif;base64,'+
    'R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2'+
    'Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8'+
    'fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKC'+
    'gqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra'+
    '2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCg'+
    'oE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQ'+
    'EAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/'+
    'C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwA'+
    'AAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAML'+
    'E4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
    'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAH'+
    'jIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hL'+
    'UbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb'+
    '04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkK'+
    'E2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0pu'+
    'aoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtA'+
    'L9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZ'+
    'Z1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zH'+
    'kFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwF'+
    'GAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVE'+
    'PAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3'+
    'Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5'+
    'BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZW'+
    'QYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyD'+
    'N9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAA'+
    'EAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjcz'+
    'rJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUW'+
    'VnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6'+
    'RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpj'+
    'ggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgce'+
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'+'" alt ="checking">';
	addedDiv.setAttribute('id','greaseTextBacon');
	addedDiv.setAttribute('class','txt-block');
	link.parentNode.insertBefore(addedDiv, link.nextSibling);
}
// end function addBaconText

function addCenterText() {
	var findPattern = "//div[@class='txt-block']";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var link = results.snapshotItem(0);
	var addedDiv = document.createElement('div');
	addedDiv.innerHTML = '<H4 class="inline">Center Number:</H4> checking<img src="'+'data:image/gif;base64,'+
    'R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2'+
    'Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8'+
    'fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKC'+
    'gqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra'+
    '2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCg'+
    'oE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQ'+
    'EAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/'+
    'C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwA'+
    'AAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAML'+
    'E4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
    'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAH'+
    'jIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hL'+
    'UbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb'+
    '04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkK'+
    'E2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0pu'+
    'aoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtA'+
    'L9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZ'+
    'Z1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zH'+
    'kFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwF'+
    'GAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVE'+
    'PAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3'+
    'Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5'+
    'BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZW'+
    'QYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyD'+
    'N9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAA'+
    'EAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjcz'+
    'rJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUW'+
    'VnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6'+
    'RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpj'+
    'ggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgce'+
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'+'" alt ="checking">';
	addedDiv.setAttribute('id','greaseTextCenter');
	addedDiv.setAttribute('class','txt-block');
	link.parentNode.insertBefore(addedDiv, link.nextSibling);
}
// end function addCenterText

function findName() {
	var findPattern = "//h1[@class='header']";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	return stripHTML(results.snapshotItem(0).innerHTML);
} // end function findName

function stripHTML(oldString) {
	return oldString.replace(/(<([^>]+)>)/ig, " ") // remove any html (spans in this case)
				.replace(/^\s+|\s+$/g,"") // trim spaces from the outside
				.replace(/[^\w -:\xC0-\xFF]/g, ''); // remove characters other than ASCII extended (in this case, get rid of newlines)
} // end function stripHTML