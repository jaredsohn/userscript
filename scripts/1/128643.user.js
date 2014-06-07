// ==UserScript==
// @name           Flashback.org - Auto Refresh Thread
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Uppdaterar Flashback-tråden du har öppet varannan sekund med innehållet från trådens sista sidan.
// @include        https://www.flashback.org/showthread.php*
// @include        https://www.flashback.org/t*
// @include        https://www.flashback.org/p*
// @version        1.2.1
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
(function() {
var parser = new DOMParser();
var field;

addFreqField();
run();

function run() {
	// Only run the auto updating if the user is on the last page of the thread
	if (isOnLastPage()) {
		// Update every two seconds
		setInterval(updateAndAddNewPosts, GM_getValue("updateFreq", 2000));
	}
}

function updateAndAddNewPosts() {
	var request = new XMLHttpRequest();  
    request.open("GET", getLastPage(), true);  
    request.onreadystatechange = function (oEvent) {
		if (request.readyState === 4 && request.status === 200) {
			var doc = parser.parseFromString(request.responseText, "text/html");  
            addNewPosts(doc);
		} 
    };
    request.send(null);
}

// Replace all posts on current page with posts from the last page.
function addNewPosts(site) {
	var postsContainer = document.getElementById("posts");
	var postsContainerOnRefreshedSite = site.getElementById("posts");
	postsContainer.innerHTML=postsContainerOnRefreshedSite.innerHTML;
	GM_log("Refreshed @ " + Date());
}

// Get URL to the last page.
function getLastPage() {
	return "https://www.flashback.org" + $("td.navbar strong a").attr("href") + "p" + 999999;
}

// Checks if the user is on the last page of the thread
function isOnLastPage() {
	// Get the content in the navigator bar
	var nodesInNavigatorMenu = $("div#site-left table.tborder:first div.pagenav table td");
	// If it has no nodes it's only one page and the user is on the last page
	if (nodesInNavigatorMenu.length == 0) {
		return true;
	} else {
		// Checks if the user is on the last page
		var lastNumber = nodesInNavigatorMenu[nodesInNavigatorMenu.length-2];
		return lastNumber.className == "alt2";
	}
}

// Adds a field and a button making it possible for the user to specify the update frequency
function addFreqField() {
	var td = document.createElement("td");
	td.className = "alt1";
	
	var container = document.createElement("div");
	container.setAttribute("style", "width: 170px;");
	td.appendChild(container);
	
	field = document.createElement("input")
	field.setAttribute("type", "input");
	field.setAttribute("style", "width: 40px; font-family: verdana; font-size: 10px;");
	field.setAttribute("value", GM_getValue("updateFreq", 2000));
	container.appendChild(field);
	
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", "Spara freq (ms)");
	button.setAttribute("style", "font-family: verdana; font-size: 10px;");
	button.addEventListener("click", saveFreq, false);
	container.appendChild(button);
	
	var threadOptions = $("td#threadtools").get(0).parentNode;
	threadOptions.appendChild(td);
}

// Save new frequency
function saveFreq() {
	var value = field.value;
	if ((typeof parseInt(value)) == "number" && value > 0) {
		if (value == 2000) {
			GM_deleteValue("updateFreq");
		} else if (GM_getValue("updateFreq", 2000) != value) {
			GM_setValue("updateFreq", value);
		}
		GM_log("Successfully saved new frequency.");
		if (isOnLastPage()) {
			window.location.href = getLastPage();
		} else {
			window.location.href = window.location.pathname;
		}
	}
}
})();