// ==UserScript==
// @name          Heise TrollEx
// @namespace     Heise_TrollEx
// @description   Heise TrollEx - macht Trollen den Gar aus.
// @include       http://www.heise.de/*foren/*
// @version       1.0
// @icon          https://github.com/SteveBell/Heise_TrollEx/raw/Bilder/Heise_TrollEx_Icon.png
// @downloadURL   https://github.com/downloads/SteveBell/Heise_TrollEx/heisetrollex.user.js
// ==/UserScript==

// Originally programmed by Hannes Planatscher © 2005, 2006 (http://www.planatscher.net/)
// Modified by Michael Schnell © 2007-2009 (http://www.schnell-michael.de)
// Modified for Chrome by Roman Zechmeister © 2011-2012

// This Script is unter the Creative Commons Attribution 2.0 Licenes (http://creativecommons.org/licenses/by/2.0/)


// global variables
var buttonStyle = "text-decoration:none; font-weight:bold; color:blue; cursor:pointer; padding-left:0px; padding-right:0px; padding-top:0px; padding-bottom:0px"


// sorting modes
var threadSortModes = new Array();
var tmp = new Object();
tmp.name = "none";
tmp.displayName = "Nicht sortieren";
tmp.func = null;
threadSortModes.push(tmp);

var tmp = new Object();
tmp.name = "originalOrder";
tmp.displayName = "Orininal Reihenfolge";
tmp.func = sortThreadByOriginalOrder;
threadSortModes.push(tmp);

var tmp = new Object();
tmp.name = "mixedRating";
tmp.displayName = "Nach Bewertungsmix sortieren";
tmp.func = sortThreadByMixedOrder;
threadSortModes.push(tmp);

tmp = new Object();
tmp.name = "threadRating";
tmp.displayName = "Nach Thread Bewertung";
tmp.func = sortThreadsByThreadRating;
threadSortModes.push(tmp);

tmp = new Object();
tmp.name = "userRating";
tmp.displayName = "Nach User Bewertung";
tmp.func = sortThreadsByUserRating;
threadSortModes.push(tmp);

tmp = new Object();
tmp.name = "userThreadRating";
tmp.displayName = "Erst nach User Bewertung, dann nach Thread Bewertung";
tmp.func = sortThreadsByUserAndThreadRating;
threadSortModes.push(tmp);

tmp = new Object();
tmp.name = "threadUserRating";
tmp.displayName = "Erst nach Thread Bewertung, dann nach User Bewertung";
tmp.func = sortThreadsByThreadAndUserRating;
threadSortModes.push(tmp);

tmp = new Object();
tmp.name = "threadDate";
tmp.displayName = "Nach Datum";
tmp.func = sortThreadsByDate;
threadSortModes.push(tmp);


var normalThreadsSortMode = getThreadsSortModeByName("userThreadRating");
var badThreadsSortMode = getThreadsSortModeByName("threadRating");
var badUserThreadsSortMode = getThreadsSortModeByName("userRating");
var badMixedThreadsSortMode = getThreadsSortModeByName("mixedRating");

var normalThreadsSortSubThreads = false;
var badThreadsSortSubThreads = false;
var badUserThreadsSortSubThreads = false;
var badMixedThreadsSortSubThreads = false;



// more global variables
var userRatings;
var threadRatingWeight = all_getValue("TrollExThreadRatingWeight", 1);
var userRatingWeight = all_getValue("TrollExUserRatingWeight", 25);
var threadRatingThreshold = all_getValue("TrollExThreadRatingThreshold", all_getValue("TrollExThreshold", -50)); // for backwards compability: Read the old name "TrollExThreshold" as well.
var userRatingThreshold = all_getValue("TrollExUserRatingThreshold", all_getValue("TrollExUserThreshold", -2));  // for backwards compability: Read the old name "TrollExUserThreshold" as well.
var mixedRatingThreshold = all_getValue("TrollExMixedRatingThreshold", -100);

var useThreadThreshold = all_getValue("TrollExUseThreadThreshold", true);
var useUserThreshold = all_getValue("TrollExUseUserThreshold", true);
var useMixedThreshold = all_getValue("TrollExUseMixedThreshold", true);

var normalThreadsCount = 0;
var badThreadsCount = 0;
var badThreadRatingCount = 0;
var badUserRatingCount = 0;
var badMixedRatingCount = 0;

var mergePagesCount = parseInt(all_getValue("TrollExMergePagesCount", 3));
var pageCount;


// ** functions **

function all_getValue(key, defaultValue) {
	if (navigator.userAgent.search('Chrome') == -1) {
		return GM_getValue(key, defaultValue);
	} else {
		return chrome_getValue(key, defaultValue);
	}
}
function all_setValue(key, value) {
	if (navigator.userAgent.search('Chrome') == -1) {
		return GM_setValue(key, value);
	} else {
		return chrome_setValue(key, value);
	}
}

function chrome_getValue(key, defaultValue) {
	var value = localStorage[key];
	if (!value) {
		value = defaultValue;
	}
	return value;
}
function chrome_setValue(key, value) {
	localStorage[key] = value;
}

function getPage(pageNo){
	var baseURL = window.location.href.replace(/\/hs-\d*/, "");
	var hsNo = (pageNo-1)*16;
	var pageURL = baseURL + "hs-"+hsNo+"/";

	GM_xmlhttpRequest({
		method: 'GET',
		url: pageURL,
		onload: factoryPageLoaded(pageNo)
	});
}

function factoryPageLoaded(pageNo){
	return function pageLoaded(responseDetails){
		if (responseDetails.readyState==4) { 
			if (responseDetails.status==200) {
				var docNode = document.createElement("div");
				var body = responseDetails.responseText;
				lines = body.split("\n");
				var start, end;
				for(var i = 0; i < lines.length; i++){
					if(lines[i].search(/<body.*>/) >= 0){
						start= i+1;
					}
					if(lines[i].search(/<\/body>/) >= 0){
						end = i-1;
					}
				}
				body = lines.splice(start, end-start).join("\n");
				docNode.innerHTML = body;
				
				var pageThreadListRes = document.evaluate(".//ul[@class='thread_tree']", docNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var pageThreadList = pageThreadListRes.snapshotItem(0);
				if(pageThreadList){
					moveThreads(pageThreadList, pageNo);
				}
			}
		}
	}
}

function getPageCount(){
	var navi = document.evaluate(".//ul[@class='forum_navi']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(navi.snapshotLength > 0){
		var maxNumber;
		var tmp = window.location.href.replace(/.*\/hs-(\d*)\//, "$1");
		if(tmp == window.location){
			maxNumber = 0;
		}else{
			maxNumber = parseInt(tmp);
		}
		var links = document.evaluate(".//a", navi.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < links.snapshotLength; i ++){
			var tmp = links.snapshotItem(i).href.replace(/.*\/hs-(\d*)\//, "$1");
			if(tmp != links.snapshotItem(i).href){
				var number = parseInt(tmp);
				if(number > maxNumber){
					maxNumber = number;
				}
			}
		}
		var pageCount = maxNumber/16 +1;
		return pageCount;
	}else{
		return -1;
	}			
}

function getCurrentPage(){
	var number;
	var tmp = window.location.href.replace(/.*\/hs-(\d*)\//, "$1");
	if(tmp == window.location){
		number = 0;
	}else{
		number = parseInt(tmp);
	}
	return number/16 +1;
}

function updateForumNavis(){
	var baseURL = window.location.href.replace(/\/hs-\d*/, "");

	var navis = document.evaluate(".//ul[@class='forum_navi']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var n = 0; n < navis.snapshotLength; n++ ){
		var navi = navis.snapshotItem(n);
		var lis = document.evaluate(".//li", navi, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var expandAll;
		// first: remove all navigation elements and remember where to insert new ones
		for(var l = 0; l < lis.snapshotLength; l++){
			li = lis.snapshotItem(l);
			if(li.innerHTML.search(/Alles aufklappen/) < 0){
				navi.removeChild(li);
			}else{
				expandAll = li;
				break;
			}
		}
		
		// append "Seite"
		var pageli = document.createElement("li");
		pageli.innerHTML = "<b>Seite</b>  ";
		navi.insertBefore(pageli, expandAll);
		
		var currentPage = getCurrentPage();
		var li, link;
				
		if(pageCount <= mergePagesCount){
			//Just one entry, no link
			li = document.createElement("li");
			if(pageCount == 1){
				li.appendChild(document.createTextNode(" 1 "));			
			}else{
				li.appendChild(document.createTextNode(" 1-"+(pageCount)+" "));
			}
			navi.insertBefore(li, expandAll);
		}else{
		
			if(currentPage -4* mergePagesCount >= 1 ){
				var li = document.createElement("li");
				var link = document.createElement("a");		
				link.appendChild(document.createTextNode("1-"+(mergePagesCount)));
				link.href=baseURL;
				li.appendChild(link);
				navi.insertBefore(li, expandAll);
			}
			if(currentPage -4* mergePagesCount > 1 ){
				navi.insertBefore(document.createTextNode(" ... "), expandAll);
			}else{
				navi.insertBefore(document.createTextNode(" "), expandAll);			
			}
			
			for(var relp = -3; relp< 0; relp++){
				var p = currentPage + relp* mergePagesCount;
				if(p >= 0){
					var li = document.createElement("li");
					var link = document.createElement("a");		
					link.appendChild(document.createTextNode(p +"-"+(p+mergePagesCount-1)));
					link.href=baseURL+ "hs-"+((p-1)*16)+"/";
					li.appendChild(link);
					navi.insertBefore(li, expandAll);
					navi.insertBefore(document.createTextNode(" "), expandAll);
				}
			}
			
			li = document.createElement("li");
			if(currentPage == pageCount){
				li.appendChild(document.createTextNode(currentPage));
			}else if(currentPage +mergePagesCount -1 > pageCount){
				li.appendChild(document.createTextNode(currentPage+"-"+pageCount));
			}else{
				li.appendChild(document.createTextNode(currentPage+"-"+(currentPage+mergePagesCount-1)+" "));
			}
			navi.insertBefore(li, expandAll);
			navi.insertBefore(document.createTextNode(" "), expandAll);
			
			for(var relp = 1; relp <= 3; relp++){
				var p = currentPage + relp* mergePagesCount;
				if((p+mergePagesCount) <= pageCount){
					var li = document.createElement("li");
					var link = document.createElement("a");		
					link.appendChild(document.createTextNode(p +"-"+(p+mergePagesCount-1)));
					link.href=baseURL+ "hs-"+((p-1)*16)+"/";;
					li.appendChild(link);
					navi.insertBefore(li, expandAll);
					navi.insertBefore(document.createTextNode(" "), expandAll);
				}else if(p <= pageCount){
					var li = document.createElement("li");
					var link = document.createElement("a");		
					if(p<pageCount){
						link.appendChild(document.createTextNode(p +"-"+pageCount));
					}else{
						link.appendChild(document.createTextNode(pageCount));
					}
					link.href=baseURL+ "hs-"+((p-1)*16)+"/";;
					li.appendChild(link);
					navi.insertBefore(li, expandAll);
					navi.insertBefore(document.createTextNode(" "), expandAll);
				}
			}
			
			//last entry
			var start = pageCount - (pageCount % mergePagesCount);
			if(start > (currentPage + 4 * mergePagesCount)){
				navi.insertBefore(document.createTextNode(" ... "), expandAll);
			}else{
				navi.insertBefore(document.createTextNode(" "), expandAll);			
			}
						
			if(start >= (currentPage + 4 * mergePagesCount)){
				var li = document.createElement("li");
				var link = document.createElement("a");		

				if(start == pageCount){
					link.appendChild(document.createTextNode(start));
				}else if(start +mergePagesCount -1 > pageCount){
					link.appendChild(document.createTextNode(start+"-"+pageCount));
				}else{
					link.appendChild(document.createTextNode(start+"-"+(start+mergePagesCount-1)+" "));
				}
				link.href=baseURL+ "hs-"+((start-1)*16)+"/";;
				li.appendChild(link);
				navi.insertBefore(li, expandAll);
				navi.insertBefore(document.createTextNode(" "), expandAll);
				
			}			
		}
		// Neuere
		if(currentPage - mergePagesCount > 0){
			var li = document.createElement("li");
			var link = document.createElement("a");		
			link.appendChild(document.createTextNode("Neuere"));
			link.href=baseURL+ "hs-"+((currentPage-mergePagesCount-1)*16)+"/";;
			li.appendChild(link);
			navi.insertBefore(li, expandAll);
			navi.insertBefore(document.createTextNode(" "), expandAll);			
		}else{
			var li = document.createElement("li");
			li.appendChild(document.createTextNode("Neuere "));
			navi.insertBefore(li, expandAll);
		}
		// Ältere
		if(currentPage + mergePagesCount < pageCount){
			var li = document.createElement("li");
			var link = document.createElement("a");		
			link.appendChild(document.createTextNode("Ältere"));
			link.href=baseURL+ "hs-"+((currentPage+mergePagesCount-1)*16)+"/";;
			li.appendChild(link);
			navi.insertBefore(li, expandAll);
			navi.insertBefore(document.createTextNode(" "), expandAll);			
		}else{
			var li = document.createElement("li");
			li.appendChild(document.createTextNode("Ältere "));
			navi.insertBefore(li, expandAll);
		}	
	}
}

function parseBool(b){
	if(b=="true"){
		return true;
	}else if(b=="false"){
		return false;
	}
	GM_log("Error: Cannot parse "+b+" to a boolean");
}

function parseDec(d){
	//remove 0 at the beginning of the string. Otherwise it'll interpret as an octal...		
	var d2 = d.replace(/^0*/, "");
	if(d2.length == 0){
		return 0;
	}
	return parseInt(d2);
}

function parseDate(dateString){
	if(dateString == ""){
		// 01.01.1970 00:00:00
		return new Date(0);
	}
	var tmp = dateString.split(" ");
	var tmpDate = tmp[0].split(".");
	var date;
	var year;
	if(tmpDate[2].length == 2){
		year = parseDec(tmpDate[2]); 
		// the following will do the next few years...
		if(year >= 70){
			year +=1900;
		}else{
			year +=2000;
		}
	}else{
		year = parseDec(tmpDate[2]);
	}
	var month = parseDec(tmpDate[1]) - 1;
	var day = parseDec(tmpDate[0]);
	var hour = 0;
	var minute = 0;
	var second = 0;
	if(tmp.length > 1){
		var tmpTime = tmp[1].split(":");
		hour = parseDec(tmpTime[0]);
		minute = parseDec(tmpTime[1]);
		if(tmpTime.length > 2){
			second = parseDec(tmpTime[2]);
		}
	}
	date = new Date(year, month, day, hour, minute, second);
	return date;
}

function readThreadSortModes(){
	var normal = all_getValue("TrollExNormalTheadsSorting", "userThreadRating:false").split(":");
	normalThreadsSortMode = getThreadsSortModeByName(normal[0]);
	normalThreadsSortSubThreads = parseBool(normal[1]);

	var badThreads = all_getValue("TrollExBadTheadsSorting", "threadRating:false").split(":");
	badThreadsSortMode = getThreadsSortModeByName(badThreads[0]);
	badThreadsSortSubThreads = parseBool(badThreads[1]);
	
	var badUser = all_getValue("TrollExBadUserTheadsSorting", "userRating:false").split(":");
	badUserThreadsSortMode = getThreadsSortModeByName(badUser[0]);
	badUserThreadsSortSubThreads = parseBool(badUser[1]);
	
	var mixed = all_getValue("TrollExMixedTheadsSorting", "mixedRating:false").split(":");
	badMixedThreadsSortMode = getThreadsSortModeByName(mixed[0]);
	badMixedThreadsSortSubThreads = parseBool(mixed[1]);
}

function writeThreadSortModes(){
	all_setValue("TrollExNormalTheadsSorting", normalThreadsSortMode.name+":"+normalThreadsSortSubThreads);
	all_setValue("TrollExBadTheadsSorting", badThreadsSortMode.name+":"+badThreadsSortSubThreads);
	all_setValue("TrollExBadUserTheadsSorting", badUserThreadsSortMode.name+":"+badUserThreadsSortSubThreads);
	GM_setValue("TrollExMixedTheadsSorting", badMixedThreadsSortMode.name+":"+badMixedThreadsSortSubThreads);
}

function readUserRatings(){
	var allRatings = all_getValue("TrollExUserRatings", "");
	if(allRatings == ""){
		userRatings = new Array();
	}else{
		userRatings = allRatings.split(",");
	}
}

function writeUserRatings(){
	all_setValue("TrollExUserRatings", userRatings.join(","));
}

function getRatingOf(user){
	for(var i = 0; i < userRatings.length; i++){
		var ratingItem = userRatings[i].split(":");
		if(ratingItem[0] == user){
			return ratingItem[1];
		}
	}
	return 0;
}

function setRatingOf(user, rating){
	user = trimName(user);
	for(var i = 0; i < userRatings.length; i++){
		var ratingItem = userRatings[i].split(":");
		if(ratingItem[0] == user){
			userRatings[i] = user + ":" +rating;
			return;
		}
	}
	userRatings.push(user + ":" + rating);
}


function deleteRatingOf(user){
	var goodCount = 0;
	var tmp = new Array(userRatings.length);
	
	for(var i = 0; i < userRatings.length; i++){
		var ratingItem = userRatings[i].split(":");
		if(! (ratingItem[0] == user || ratingItem[0] == "")){			
			tmp[goodCount] = userRatings[i];
			goodCount++;
		}
	}
	userRatings = new Array(goodCount);
	for(var i = 0; i < goodCount; i ++){
		userRatings[i] = tmp[i];
	}
}

function trimName(s){
	var trimmed;
	
	var start;
	for(var i = 0; i < s.length; i++){
		var c = s.substring(i, i+1);
		if(c != " " && c != "\n" && c != "\t"){
			start = i;
			break;
		}
	}
	var end;
	for(var i = s.length-1 ; i >=0; i--){
		var c = s.substring(i, i+1);
		if(c != " " && c != "\n" && c != "\t"){
			end = i+1;
			break;
		}
	}
	var length = end - start;
	trimmed = s.substring(start, end);
	return trimmed;
}

function updateDisplayedRatings(user){
	var containers = document.evaluate("//span[@trollexuserrating='" + escape(user) + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < containers.snapshotLength; i ++){
		var container = containers.snapshotItem(i);
		container.removeChild(container.firstChild);
		container.appendChild(getRatingDisplay(getRatingOf(user)));
	}
}

function factoryChangeRating(user, rating){
	return function(event) {
		// reading is necessary because the user coul'd have multiple pages open
		// and changed the user ratings (in particular adding users) in a other tab/window.
		readUserRatings(); 
		setRatingOf(user, rating);
		event.stopPropagation();
    	event.preventDefault();
    	writeUserRatings();
    	updateDisplayedRatings(user);
	};
}

function factoryAdjustRating(user, adjust){
	return function(event) {
		user = trimName(user);
		
		// remember the oldRating of THIS instance.
		var oldRating = parseInt(getRatingOf(user)) 

		// reading is necessary because the user could have multiple pages open
		// and changed the user ratings (in particular adding users) in a other tab/window.
		readUserRatings(); 

		var rating = oldRating + parseInt(adjust);
		
		// ensure an maximum and minimum of 100 Points
		if(rating > 100){
			rating = 100;
		}else if(rating < -100){
			rating = -100;
		}
		setRatingOf(user, rating);
		event.stopPropagation();
    	event.preventDefault();
    	writeUserRatings();
    	updateDisplayedRatings(user);
		
		// The user was probably not in the list before..
		if(oldRating == 0 ) {
			createUserRatingList(); // this will add the rated user to the visible list.  	
		}
	};
}

function factoryDeleteRating(user){
	return function(event) {
		// reading is necessary because the user coul'd have multiple pages open
		// and changed the user ratings in (in particular adding users) a other tab/window.
		readUserRatings(); 
		deleteRatingOf(user);
		event.stopPropagation();
		event.preventDefault();
		writeUserRatings();
		readUserRatings();
		updateDisplayedRatings(user);
		createUserRatingList();
	};
}

function getRatingDisplay(rating){
	var ratingDisplay = document.createElement("span");
	if(rating >=0){
		var unvisibleMinus = document.createElement("span");
		unvisibleMinus.style.visibility ="hidden";
		unvisibleMinus.appendChild(document.createTextNode("-"));
		ratingDisplay.appendChild(unvisibleMinus);
	}
	ratingDisplay.appendChild(document.createTextNode(rating));
	return ratingDisplay;
}

function factoryAdjustThreshold(adjust){
	return function(event){
		threadRatingThreshold= parseInt(threadRatingThreshold) + parseInt(adjust);
		all_setValue("TrollExThreadRatingThreshold", threadRatingThreshold);
		t = document.getElementById("TrollExThreadRatingThreshold");
		t.removeChild(t.firstChild);
		t.appendChild(document.createTextNode(" "+threadRatingThreshold+"% "));
	}
}

function factoryAdjustUserThreshold(adjust){
	return function(event){
		userRatingThreshold= parseInt(userRatingThreshold) + parseInt(adjust);
		all_setValue("TrollExUserRatingThreshold", userRatingThreshold);
		t = document.getElementById("TrollExUserRatingThreshold");
		t.removeChild(t.firstChild);
		t.appendChild(document.createTextNode(" "+userRatingThreshold+" "));
	}
}

function factoryAdjustMixedThreshold(adjust){
	return function(event){
		mixedRatingThreshold= parseInt(mixedRatingThreshold) + parseInt(adjust);
		all_setValue("TrollExMixedRatingThreshold", mixedRatingThreshold);
		t = document.getElementById("TrollExMixedRatingThreshold");
		t.removeChild(t.firstChild);
		t.appendChild(document.createTextNode(" "+mixedRatingThreshold+" "));
	}
}

function factoryAdjustThreadRatingWeight(adjust){
  return function(event){
    threadRatingWeight = parseInt(threadRatingWeight) + parseInt(adjust);
    GM_setValue("TrollExThreadRatingWeight", threadRatingWeight);
    t = document.getElementById("TrollExThreadRatingWeight");
    t.removeChild(t.firstChild);
    t.appendChild(document.createTextNode(" "+threadRatingWeight+" "));
  }
}

function factoryAdjustUserRatingWeight(adjust){
  return function(event){
    userRatingWeight = parseInt(userRatingWeight) + parseInt(adjust);
    GM_setValue("TrollExUserRatingWeight", userRatingWeight);
    t = document.getElementById("TrollExUserRatingWeight");
    t.removeChild(t.firstChild);
    t.appendChild(document.createTextNode(" "+userRatingWeight+" "));
  }
}

function factoryAdjustMergePages(adjust){
	return function(event){
		var newValue = mergePagesCount + adjust;
		if(newValue < 1){
			newValue = 1;
		}else if(newValue > 60){
			newValue = 60;
		}
		mergePagesCount = newValue;
		all_setValue("TrollExMergePagesCount", newValue);
		var dispElement = document.getElementById("mergePagesDisp");
		dispElement.firstChild.data = newValue;
	}
}

function createButton(displayText, toolTipText, func){
	button = document.createElement("button");
	button.appendChild(document.createTextNode(displayText));
	button.setAttribute("style", buttonStyle);
	button.setAttribute("title", toolTipText);
	button.addEventListener('click', func, true);
	return button;
}

function createThreadSortGUI(name, func, selectMode, checkSubThreads){
	var selgui = document.createElement("form");	
	selgui.setAttribute("name", name);
	
	selgui.appendChild(document.createTextNode("Sortieren nach: "));
	
	var sel = document.createElement("select");
	sel.setAttribute("name", "SortDisplayName");
	sel.setAttribute("size", "1");

	for(var i = 0; i < threadSortModes.length; i ++){
		var o = document.createElement("option")
		o.appendChild(document.createTextNode(threadSortModes[i].displayName));
		if(threadSortModes[i] == selectMode){
			o.setAttribute("selected", "selected");
		}
		sel.appendChild(o);
	}	
	sel.addEventListener('change', func, true);
	selgui.appendChild(sel);

	selgui.appendChild(document.createTextNode(" "));
	
	var cb = document.createElement("input");
	cb.setAttribute("type", "checkbox");
	cb.setAttribute("name", "SortSubThreads");
	cb.setAttribute("value", "true");
	if(checkSubThreads){
		cb.setAttribute("checked", "checked");
	}
	cb.addEventListener('change', func, true);
	
	selgui.appendChild(cb);
	selgui.appendChild(document.createTextNode(" Subthreads auch sortieren"));

	return selgui;
}

function createSubThreadSortCheckBox(name, func){
	var cb = document.createElement("input");
	cb.setAttribute("type", "checkbox");
	cb.setAttribute("name", name);
	cb.setAttribute("value", "sortSubthreads");
	cb.addEventListener('change', func, true);
	return cb;
}

function updateVisibility(){

	badThreadsVisible = all_getValue("TrollExBadThreadsVisibility", false);
	badUsersVisible = all_getValue("TrollExBadUsersVisibility", false);
	badMixedVisible = all_getValue("TrollExBadMixedThreadsVisibility", false);
	userRatingVisible = all_getValue("TrollExUserRatingVisibility", false);
	
	if(badThreadsVisible) {
		if(badThreadRatingCount > 0){
			badThreadsContainer.appendChild(badThreadsSorting);
			badThreadsContainer.appendChild(badThreadRatingThreads);
			badThreadsVisibilityButton.firstChild.data= "Ausblenden";
		}
	}else{		
		try {
			badThreadsContainer.removeChild(badThreadsSorting);
			badThreadsContainer.removeChild(badThreadRatingThreads);
		} catch(e) {
			// ignore this
		}
		badThreadsVisibilityButton.firstChild.data= "Anzeigen";
	}
	if(badUsersVisible) {
		if(badUserRatingCount > 0){
			badUsersContainer.appendChild(badUserThreadsSorting);
			badUsersContainer.appendChild(badUserRatingThreads);
			badUsersVisibilityButton.firstChild.data= "Ausblenden";
		}
	} else {
		try {
			badUsersContainer.removeChild(badUserThreadsSorting);
			badUsersContainer.removeChild(badUserRatingThreads);
		} catch (e) {
			// ignore this
		}
		badUsersVisibilityButton.firstChild.data= "Anzeigen";
	}
	if(badMixedVisible) {
		if(badMixedRatingCount > 0){
			badMixedRatingContainer.appendChild(badMixedThreadsSorting);
			badMixedRatingContainer.appendChild(badMixedRatingThreads);
			badMixedVisibilityButton.firstChild.data= "Ausblenden";
		}
	} else {
		try {
			badMixedRatingContainer.removeChild(badMixedThreadsSorting);
			badMixedRatingContainer.removeChild(badMixedRatingThreads);
		} catch (e) {
			// ignore this
		}
		badMixedVisibilityButton.firstChild.data= "Anzeigen";
	}	
	
	if(userRatingVisible) {
		userRatingListContainer.appendChild(userRatingList);
		userRatingVisibilityButton.firstChild.data= "Ausblenden";
		userRatingListTitle.appendChild(userRatingSortButtonsContainer);
	} else {
		try {
			userRatingListContainer.removeChild(userRatingList);
			userRatingListTitle.removeChild(userRatingSortButtonsContainer);
		} catch (e) {
			// ignore this
		}
		userRatingVisibilityButton.firstChild.data= "Anzeigen";
	}
	
}

function switchBadThreadsVisibilty() {
	visible = all_getValue("TrollExBadThreadsVisibility", false);
	visible = !visible;
	all_setValue("TrollExBadThreadsVisibility", visible);
	updateVisibility();	
}

function switchBadUsersVisibilty() {
	visible = all_getValue("TrollExBadUsersVisibility", false);
	visible = !visible;
	all_setValue("TrollExBadUsersVisibility", visible);
	updateVisibility();
}

function switchMixedVisibilty() {
	visible = all_getValue("TrollExBadMixedThreadsVisibility", false);
	visible = !visible;
	all_setValue("TrollExBadMixedThreadsVisibility", visible);
	updateVisibility();
}

function switchUserRatingVisibilty() {
	visible = all_getValue("TrollExUserRatingVisibility", false);
	visible = !visible;
	all_setValue("TrollExUserRatingVisibility", visible);
	updateVisibility();
}

function createUserRatingList(){
	try {
		userRatingListContainer.removeChild(userRatingList);
		userRatingListTitle.removeChild(userRatingListTitle.firstChild);
	} catch (e) {
		// ignore this
	}

	userRatingList = document.createElement('ul');
	userRatingList.appendChild(document.createTextNode(""));
	
	var userRatingText;
	if(userRatings.length == 0){
		userRatingText = "Keine Forenteilnehmer bewertet.";
	}else if(userRatings.length == 1){
		userRatingText = "Einen Forenteilnehmer bewertet:";
	}else {
		userRatingText = (userRatings.length) + " Forenteilnehmer bewertet:";
	}
	userRatingListTitle.insertBefore(document.createTextNode(userRatingText), userRatingListTitle.firstChild);

	
	for (i = 0; i < userRatings.length; i++) {
		if (userRatings[i] != "") {
			r = userRatings[i].split(":");
			
			var user = r[0];
			var rating = r[1];
			
			line = document.createElement('li');

			line.appendChild(createButton("X", "Bewertung von "+ user + " löschen", factoryDeleteRating(user)));
			line.appendChild(createButton("0", "Bewertung von "+ user + " löschen", factoryChangeRating(user, 0)));	
			
			line.appendChild(document.createTextNode(" "));			
	
			line.appendChild(createButton("- -", "Bewertung von "+ user + " um zwei Punkte verschlechtern", factoryAdjustRating(user, -2)));
			line.appendChild(createButton("-", "Bewertung von "+ user + " um einen Punkt verschlechtern", factoryAdjustRating(user, -1)));

			line.appendChild(document.createTextNode(" "));			
		
			var ratingContainer = document.createElement("span");
			ratingContainer.setAttribute("trollexuserrating", escape(user));			
			ratingContainer.appendChild(getRatingDisplay(rating));			
			line.appendChild(ratingContainer);

			line.appendChild(document.createTextNode(" "));			

			line.appendChild(createButton("+", "Bewertung von "+ user + " um einen Punkt verbessern", factoryAdjustRating(user, 1)));
			line.appendChild(createButton("++", "Bewertung von "+ user + " um zwei Punkte verbessern", factoryAdjustRating(user, 2)));

			line.appendChild(document.createTextNode("  " +user+ "  "));
			
			userRatingList.appendChild(line);
		}
	}
	userRatingVisible = all_getValue("TrollExUserRatingVisibility", false);
	if(userRatingVisible) {
		userRatingListContainer.appendChild(userRatingList);
		userRatingVisibilityButton.firstChild.data= "Ausblenden";
	} else {
		userRatingVisibilityButton.firstChild.data= "Anzeigen";
	}
}

function getUserNameOfRow(row){
	var activeNameRes = document.evaluate("./div/div[@class='thread_user']/span" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nameNode;
	if(activeNameRes.snapshotLength > 0){
		nameNode = activeNameRes.snapshotItem(0);
		activeThread = true;
	}else{
		var nameRes = document.evaluate("./div/div[@class='thread_user']" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		nameNode = nameRes.snapshotItem(0);
		activeThread = false;
	}
	return trimName(nameNode.innerHTML);
}

function moveThreads(listOfThreads, pageNo){
	var allArticles = document.evaluate(".//li[div/@class='hover' or div/@class='hover_line']", listOfThreads, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// since mergePagesCount is <= 60, threadNo won't exceed 1000 
	var threadNo = (pageNo - getCurrentPage()) * 16;
	for (var i = 0; i < allArticles.snapshotLength; i++) {
		var row = allArticles.snapshotItem(i);
		
		var username;
		var nameNode;
		var activeThread;
		
		// determine the user name		
		var activeNameRes = document.evaluate("./div/div[@class='thread_user']/span" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(activeNameRes.snapshotLength > 0){
			nameNode = activeNameRes.snapshotItem(0);
			activeThread = true;
		}else{
			var nameRes = document.evaluate("./div/div[@class='thread_user']" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(nameRes.snapshotLength > 0){
				nameNode = nameRes.snapshotItem(0);
				activeThread = false;
			}else{
				GM_log("kein Name gefunden!");
			}
		}
		if(nameNode){
			username = trimName(nameNode.innerHTML);
		}
		
		// detremine the thread rating
		var threadRatingRes = document.evaluate("./div/div[@class='thread_votechart']/a/img", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var threadRating = 0;
		
		if(threadRatingRes.snapshotLength > 0){
			var rateElem = threadRatingRes.snapshotItem(0);
			threadRating = parseInt(rateElem.alt);
		}
		
		//determine the date		
		var date;
		var newOrActiveDateRes = document.evaluate("./div/div[@class='thread_date']/span", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(newOrActiveDateRes.snapshotLength > 0){
			date = trimName(newOrActiveDateRes.snapshotItem(0).innerHTML);			
		}else{
			var dateRes = document.evaluate("./div/div[@class='thread_date']", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(dateRes.snapshotLength > 0){
				date = trimName(dateRes.snapshotItem(0).innerHTML);
			}
		}
		date = date.replace(/&nbsp;/ , " ");
		date = parseDate(date).getTime();

		// determine the user rating
		var userRating = getRatingOf(username);
		
		// calculate mixed rating
		var mixedRating = calculateMixedRating(userRating, threadRating);
				
		// check if parent nodes have already been moved 		
		var parentMovedSearch = document.evaluate( "ancestor::li[@trollex_moved_thread]" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var parentMoved = (parentMovedSearch.snapshotLength > 0);
		if(parentMoved) {
			var parentMovedReason = parentMovedSearch.snapshotItem(0).getAttribute("trollex_moved_thread");
		}
		
		// get a pointer to the thread title
		var threadTitleSearch = document.evaluate( "./div/div[@class='thread_title']/a" ,row , null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var threadTitleNode;
		var threadTitle;
		if(threadTitleSearch.snapshotLength > 0) {
			threadTitleNode = threadTitleSearch.snapshotItem(0);
			threadTitle = threadTitleNode.getAttribute("title");
		}
		
		var config, button;
		
		config = document.createElement("span");
		
		config.appendChild(createButton("-", "Bewertung von "+ username + " um einen Punkt verschlechtern", factoryAdjustRating(username, -1)));
		
		var ratingContainer = document.createElement("span");
		ratingContainer.setAttribute("trollexuserrating", escape(username));			
		ratingContainer.appendChild(getRatingDisplay(userRating));			
		config.appendChild(ratingContainer);

		config.appendChild(createButton("+", "Bewertung von "+ username + " um einen Punkt verbessern", factoryAdjustRating(username, 1)));
		
		nameNode.firstChild.data = " "+username;
		nameNode.insertBefore(config, nameNode.firstChild);
		
		// set some attributes for the later use (sorting the list)
		row.setAttribute("TrollExUserName", username);
		row.setAttribute("TrollExThreadRating", threadRating);
		row.setAttribute("TrollExMixedRating", mixedRating);
		row.setAttribute("TrollExOriginalOrder", threadNo);
		row.setAttribute("TrollExDate", date);
		threadNo++;
		
		
		if(!parentMoved && useUserThreshold && userRating <= userRatingThreshold) {
			row.setAttribute("trollex_moved_thread", "userRating");
			if(threadTitleNode) {
				threadTitleNode.setAttribute("title", "User rating zu schlecht (schlechter gleich "+userRatingThreshold+")");
			}
			badUserRatingThreads.appendChild(row);
			badUserRatingCount++;
			badThreadsCount++;
		} else if(!parentMoved && useThreadThreshold && threadRating <= threadRatingThreshold) {
			row.setAttribute("trollex_moved_thread", "threadRating");
			if(threadTitleNode) {
				threadTitleNode.setAttribute("title", "Thread rating zu schlecht");
			}
			badThreadRatingThreads.appendChild(row);
			badThreadRatingCount++;
			badThreadsCount++;
		} else if(!parentMoved && useMixedThreshold && mixedRating < mixedRatingThreshold) {
			row.setAttribute("trollex_moved_thread", "mixedRating");
			if(threadTitleNode) {
				threadTitleNode.setAttribute("title", "Mixed rating zu schlecht ("+mixedRating+")");
			}
			badMixedRatingThreads.appendChild(row);
			badMixedRatingCount++;
			badThreadsCount++;
		} else {
			if(row.parentNode.getAttribute("class") == "thread_tree"){
				normalThreadsList.appendChild(row);
				if(threadTitleNode) {
					threadTitleNode.setAttribute("title", "DEBUG: Mixed rating ist "+mixedRating);
				}
				normalThreadsCount++;
			}
		}
		
	}
	updateCountTitles();
	sortAllThreads();
	updateVisibility();
}

function sortThreads(list, sortFunction, sortSubThreads){
	var rows = document.evaluate("./li[div/@class='hover' or div/@class='hover_line']", list, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(rows.snapshotLength > 0 ){
		var l = new Array(rows.snapshotLength);
		for(var i = 0; i < rows.snapshotLength; i++){
			l[i] = rows.snapshotItem(i);
		}
		l.sort(sortFunction);
		for(var i = 0; i < l.length; i++){
			list.appendChild(l[i]);
			if(sortSubThreads){
				// sort all sub lists
				var nextLevelRes = document.evaluate("./ul", l[i], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for(var nl = 0; nl < nextLevelRes.snapshotLength; nl++){
					sortThreads(nextLevelRes.snapshotItem(nl), sortFunction, sortSubThreads);
				}
				
				// correct the class attributes
				var hoverRes = document.evaluate("./div[div[@class='thread_date']]", l[i], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if(i < l.length -1 && list.getAttribute("class") != "thread_tree"){
					hoverRes.snapshotItem(0).setAttribute("class", "hover_line");
					l[i].setAttribute("class", "");
				}else{
					hoverRes.snapshotItem(0).setAttribute("class", "hover");
					l[i].setAttribute("class", "last");
				}
				if(list.getAttribute("class") != "thread_tree"){
					if(l.length > 1){
						list.setAttribute("class", "nextlevel_line");
					}else{
						list.setAttribute("class", "nextlevel");
					}
				}
			}			
		}
	}
}

function calculateMixedRating(userRating, threadRating) {
	return parseInt(threadRating) * parseInt(threadRatingWeight) + parseInt(userRating) * parseInt(userRatingWeight);
}

// TODO: Split the sort funcitons into two parts: 
// - a generic sort function and 
// - a set of value functions.

function genericSort(a, b, valueFunction) {
	var vala = valueFunction(a);
	var valb = valueFunction(b);
	return valb - vala;
}


function sortThreadsByDate(a, b) {
	var vala = parseInt(a.getAttribute("TrollExDate"));
	var valb = parseInt(b.getAttribute("TrollExDate"));
	return valb - vala;
}

function sortThreadsByUserRating(a, b) {
	var vala = getRatingOf(a.getAttribute("TrollExUserName"));
	var valb = getRatingOf(b.getAttribute("TrollExUserName"));
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExOriginalOrder"));
		valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	}
	return valb - vala;
}

function sortThreadByMixedOrder(a, b) {
	var vala = calculateMixedRating(getRatingOf(a.getAttribute("TrollExUserName")), parseInt(a.getAttribute("TrollExThreadRating")));
	var valb = calculateMixedRating(getRatingOf(b.getAttribute("TrollExUserName")), parseInt(b.getAttribute("TrollExThreadRating")));
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExOriginalOrder")); 
		valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	}
	return valb - vala;
}

function sortThreadsByThreadRating(a, b) {
	var vala = parseInt(a.getAttribute("TrollExThreadRating"));
	var valb = parseInt(b.getAttribute("TrollExThreadRating"));
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExOriginalOrder"));
		valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	}
	return valb - vala;
}

function sortThreadByOriginalOrder(a, b) {
	var vala = parseInt(a.getAttribute("TrollExOriginalOrder"));
	var valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	return vala - valb;
}

function sortThreadsByUserAndThreadRating(a, b) {
	var vala = getRatingOf(a.getAttribute("TrollExUserName"));
	var valb = getRatingOf(b.getAttribute("TrollExUserName"));
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExThreadRating"));
		valb = parseInt(b.getAttribute("TrollExThreadRating"));
	}
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExOriginalOrder")); 
		valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	}
	return valb - vala;
}

function sortThreadsByThreadAndUserRating(a, b) {
	var vala = parseInt(a.getAttribute("TrollExThreadRating"));
	var valb = parseInt(b.getAttribute("TrollExThreadRating"));
	if(vala == valb) {
		vala = getRatingOf(a.getAttribute("TrollExUserName"));
		valb = getRatingOf(b.getAttribute("TrollExUserName"));
	}
	if(vala == valb) {
		vala = parseInt(a.getAttribute("TrollExOriginalOrder"));
		valb = parseInt(b.getAttribute("TrollExOriginalOrder"));
	}
	return valb - vala;
}


function getThreadsSortModeByDisplayName(dispName){
	for(var i = 0; i < threadSortModes.length; i++){
		if(threadSortModes[i].displayName == dispName){
			return threadSortModes[i];
		}
	}
  GM_log("Warning: Sortmode " + name + " unknown. Using " + threadSortModes[0].name + " instead.");
  return threadSortModes[0];
}

function getThreadsSortModeByName(name){
	for(var i = 0; i < threadSortModes.length; i++){
		if(threadSortModes[i].name == name){
			return threadSortModes[i];
		}
	}
	GM_log("Warning: Sortmode " + name + " unknown. Using " + threadSortModes[0].name + " instead.");
	return threadSortModes[0];
}


function sortNormalThreads(){
	if(normalThreadsCount > 0 && normalThreadsSortMode.func != null){		
		sortThreads(normalThreadsList, normalThreadsSortMode.func, normalThreadsSortSubThreads);
	}
}

function sortBadThreads(){
	if(badThreadRatingCount > 0 && badThreadsSortMode.func != null){
		sortThreads(badThreadRatingThreads, badThreadsSortMode.func, badThreadsSortSubThreads);
	}
}

function sortBadUserThreads(){
	if(badUserRatingCount > 0 && badUserThreadsSortMode.func != null){
		sortThreads(badUserRatingThreads, badUserThreadsSortMode.func, badUserThreadsSortSubThreads);
	}
}

function sortBadMixedThreads(){
  if(badMixedRatingCount > 0 && badMixedThreadsSortMode.func != null){
    sortThreads(badMixedRatingThreads, badMixedThreadsSortMode.func, badMixedThreadsSortSubThreads);
  }
}

function sortAllThreads(){
	sortNormalThreads();
	sortBadThreads();
	sortBadUserThreads();
	sortBadMixedThreads();
}

function sortUserRatings(sortFunction){
	userRatings.sort(sortFunction);
	writeUserRatings();
	createUserRatingList();
}

function sortRatingsByRating(a, b){
	var vala = parseInt(a.split(":")[1]);
	var valb = parseInt(b.split(":")[1]);
	return valb-vala;
}

function sortRatingsByName(a, b){
	var vala = a.split(":")[0].toLowerCase();
	var valb = b.split(":")[0].toLowerCase();
	var ret;
	if(valb == vala){
		ret = 0;
	}else if(valb < vala){
		ret = 1;
	}else {
		ret = -1;
	}
	return ret;
}


function updateCountTitles(){
	while(badThreadRatingThreadsTitle.firstChild){
		badThreadRatingThreadsTitle.removeChild(badThreadRatingThreadsTitle.firstChild);
	}

	var badThreadRatingTigleText;
	if(badThreadRatingCount==0){
	  badThreadRatingTigleText = "Heise TrollEx hat keine schlecht bewertete Threads ausgefiltert.";
	}else if(badThreadRatingCount==1){
	  badThreadRatingTigleText = "Heise TrollEx hat einen schlecht bewerteten Thread ausgefiltert:";
	}else{
	  badThreadRatingTigleText = "Heise TrollEx hat " +badThreadRatingCount + " schlecht bewertete Threads ausgefiltert:";
	}
	
	badThreadRatingThreadsTitle.appendChild(document.createTextNode(badThreadRatingTigleText));
	
	if(badThreadRatingCount > 0){	
		var tmp=document.createElement("span");
		tmp.appendChild(document.createTextNode("----"));
		tmp.style.visibility ="hidden";		
		badThreadRatingThreadsTitle.appendChild(tmp);
		badThreadRatingThreadsTitle.appendChild(badThreadsVisibilityButton);
	}
	
	while(badUserRatingThreadsTitle.firstChild){
		badUserRatingThreadsTitle.removeChild(badUserRatingThreadsTitle.firstChild);
	}
	var badUserThreadsText;
	if(badUserRatingCount==0){
	  badUserThreadsText = "Heise TrollEx hat keine Threads von schlecht bewerteten Forenteilnehmern ausgefiltert.";
	}else if(badUserRatingCount==1){
	  badUserThreadsText = "Heise TrollEx hat einen Thread von einem schlecht bewerteten Forenteilnehmer ausgefiltert:";
	}else{
	  badUserThreadsText = "Heise TrollEx hat " +badUserRatingCount + " Threads von schlecht bewerteten Forenteilnehmern ausgefiltert:";
	}
	badUserRatingThreadsTitle.appendChild(document.createTextNode(badUserThreadsText));

	if(badUserRatingCount > 0){
		tmp=document.createElement("span");
		tmp.appendChild(document.createTextNode("----"));
		tmp.style.visibility ="hidden";
		
		badUserRatingThreadsTitle.appendChild(tmp);
		badUserRatingThreadsTitle.appendChild(badUsersVisibilityButton);
	}


	while(badMixedRatingThreadsTitle.firstChild){
		badMixedRatingThreadsTitle.removeChild(badMixedRatingThreadsTitle.firstChild);
	}
	var badMixedThreadsText;
	if(badMixedRatingCount==0){
	  badMixedThreadsText = "Heise TrollEx hat keine Threads mit schlechtem Bewertungsmix ausgefiltert.";
	}else if(badUserRatingCount==1){
	  badMixedThreadsText = "Heise TrollEx hat einen Thread mit schlechtem Bewertungsmix ausgefiltert:";
	}else{
	  badMixedThreadsText = "Heise TrollEx hat " +badMixedRatingCount + " Threads mit schlechtem Bewertungsmix ausgefiltert:";
	}
	badMixedRatingThreadsTitle.appendChild(document.createTextNode(badMixedThreadsText));

	if(badMixedRatingCount > 0){
		tmp=document.createElement("span");
		tmp.appendChild(document.createTextNode("----"));
		tmp.style.visibility ="hidden";
		
		badMixedRatingThreadsTitle.appendChild(tmp);
		badMixedRatingThreadsTitle.appendChild(badMixedVisibilityButton);
	}
	
}

//document.getElementById("container").setAttribute("style", "width:80em; position: relative; padding: 0; margin: 0;");
//document.getElementById("container_content").setAttribute("style", "width:75em; min-width: 730px; position: relative; top: 100px; left: 0; float: left; background: #ffffff;");
//document.getElementById("mitte").setAttribute("style", "float: right; width: 63em; min-width: 540px; background: #ffffff; margin-bottom: 2em; padding-right: 0.5em;");

readUserRatings();
readThreadSortModes();

var threadListRes = document.evaluate("//ul[@class='thread_tree']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var threadList;
if(threadListRes.snapshotLength > 0){
	threadList = threadListRes.snapshotItem(0);
}

// container for all normal threads
var normalThreadsList = document.createElement('ul');
normalThreadsList.setAttribute('class', 'thread_tree');

// container for all filtered theads (use this, if they should not be sorted into seperate containers)
var filteredThreads = document.createElement('ul');
filteredThreads.setAttribute('class', 'thread_tree');

// container for all filtered theads with a bad thread rating
var badThreadRatingThreads = document.createElement('ul');
badThreadRatingThreads.setAttribute('class', 'thread_tree');

// container for all filtered threads with a bad user rating
var badUserRatingThreads = document.createElement('ul');
badUserRatingThreads.setAttribute('class', 'thread_tree');

// container for all filtered threads with a bad mixed rating
var badMixedRatingThreads = document.createElement('ul');
badMixedRatingThreads.setAttribute('class', 'thread_tree');

// create the title for the bad rated threads
var badThreadRatingThreadsTitle = document.createElement('span');
badThreadRatingThreadsTitle.setAttribute("style", "text-decoration:none; font-weight:bold;");
var badThreadsVisibilityButton = createButton("Ein-/Ausblenden", "", switchBadThreadsVisibilty);

// create the title for the bad rated users
var badUserRatingThreadsTitle = document.createElement('span');
badUserRatingThreadsTitle.setAttribute("style", "text-decoration:none; font-weight:bold;");
var badUsersVisibilityButton = createButton("Ein-/Ausblenden", "", switchBadUsersVisibilty);

// create the title for the bad mixed rated threads
var badMixedRatingThreadsTitle = document.createElement('span');
badMixedRatingThreadsTitle.setAttribute("style", "text-decoration:none; font-weight:bold;");
var badMixedVisibilityButton = createButton("Ein-/Ausblenden", "", switchMixedVisibilty);

// create normel Threads sorting element.

var normalSorting = createThreadSortGUI("NormalSortingForm", 
  function(){ 
  	dispName = document.forms.namedItem("NormalSortingForm").elements.namedItem("SortDisplayName").value;
  	normalThreadsSortMode = getThreadsSortModeByDisplayName(dispName);
  	normalThreadsSortSubThreads = document.forms.namedItem("NormalSortingForm").elements.namedItem("SortSubThreads").checked;
  	writeThreadSortModes();
  	sortNormalThreads();
  }, normalThreadsSortMode, normalThreadsSortSubThreads);
//normalSorting.setAttribute("style", "font-weight:bold");

var badThreadsSorting = createThreadSortGUI("BadThreadsSortingForm", 
  function(){ 
  	dispName = document.forms.namedItem("BadThreadsSortingForm").elements.namedItem("SortDisplayName").value;
  	badThreadsSortMode = getThreadsSortModeByDisplayName(dispName);
  	badThreadsSortSubThreads = document.forms.namedItem("BadThreadsSortingForm").elements.namedItem("SortSubThreads").checked;
  	writeThreadSortModes();
  	sortBadThreads();
  }, badThreadsSortMode, badThreadsSortSubThreads);
  
var badUserThreadsSorting = createThreadSortGUI("BadUserThreadsSortingForm",
  function(){ 
  	dispName = document.forms.namedItem("BadUserThreadsSortingForm").elements.namedItem("SortDisplayName").value;
  	badUserThreadsSortMode = getThreadsSortModeByDisplayName(dispName);
  	badUserThreadsSortSubThreads = document.forms.namedItem("BadUserThreadsSortingForm").elements.namedItem("SortSubThreads").checked;
  	writeThreadSortModes();
  	sortBadUserThreads();
  }, badUserThreadsSortMode, badUserThreadsSortSubThreads);

var badMixedThreadsSorting = createThreadSortGUI("BadMixedThreadsSortingForm",
  function(){ 
  	dispName = document.forms.namedItem("BadMixedThreadsSortingForm").elements.namedItem("SortDisplayName").value;
  	badMixedThreadsSortMode = getThreadsSortModeByDisplayName(dispName);
  	badMixedThreadsSortSubThreads = document.forms.namedItem("BadMixedThreadsSortingForm").elements.namedItem("SortSubThreads").checked;
  	writeThreadSortModes();
  	sortBadMixedThreads();
  }, badMixedThreadsSortMode, badMixedThreadsSortSubThreads);
  
// ** create the filter config GUI  **
filterThresholdGUI = document.createElement('div');

filterThresholdGUI.appendChild(document.createTextNode("Threads ausfiltern"));
filterUL = document.createElement("ul");
filterThresholdGUI.appendChild(filterUL);

// thread voting
filterLI = document.createElement("li");
filterUL.appendChild(filterLI);

var cb = document.createElement("input");
cb.setAttribute("type", "checkbox");
cb.setAttribute("name", "SortSubThreads");
cb.setAttribute("value", "true");
if(useThreadThreshold) {
	cb.setAttribute("checked", "checked");
}
cb.addEventListener('change', function() { useThreadThreshold = !useThreadThreshold; GM_log("useThreadThreshold = "+useThreadThreshold); all_setValue("TrollExUseThreadThreshold", useThreadThreshold); }, true);
filterLI.appendChild(cb);

filterLI.appendChild(document.createTextNode("die schlechter als "));
filterLI.appendChild(createButton("- -", "Threashold um 10 erniedrigen", factoryAdjustThreshold(-10)));
filterLI.appendChild(createButton("-", "Threashold um 5 erniedrigen", factoryAdjustThreshold(-5)));

thresholdContainer = document.createElement("span");
thresholdContainer.setAttribute("id", "TrollExThreadRatingThreshold");
thresholdContainer.appendChild(document.createTextNode(" " + threadRatingThreshold + "% "));
filterLI.appendChild(thresholdContainer);

filterLI.appendChild(createButton("+", "Threashold um 5 erhöhen", factoryAdjustThreshold(5)));
filterLI.appendChild(createButton("++", "Threashold um 10 erhöhen", factoryAdjustThreshold(10)));
filterLI.appendChild(document.createTextNode(" bewertet wurden."));

// user voting
filterLI = document.createElement("li");
filterUL.appendChild(filterLI);

var cb = document.createElement("input");
cb.setAttribute("type", "checkbox");
cb.setAttribute("name", "SortSubThreads");
cb.setAttribute("value", "true");
if(useUserThreshold) {
	cb.setAttribute("checked", "checked");
}
cb.addEventListener('change', function() {useUserThreshold = !useUserThreshold; all_setValue("TrollExUseUserThreshold", useUserThreshold)}, true);
filterLI.appendChild(cb);

filterLI.appendChild(document.createTextNode("die von Usern geschrieben wurden, welche schlechter als "));
filterLI.appendChild(createButton("- -", "Threashold um 2 erniedrigen", factoryAdjustUserThreshold(-2)));
filterLI.appendChild(createButton("-", "Threashold um 1 erniedrigen", factoryAdjustUserThreshold(-1)));

userThresholdContainer = document.createElement("span");
userThresholdContainer.setAttribute("id", "TrollExUserRatingThreshold");
userThresholdContainer.appendChild(document.createTextNode(" " + userRatingThreshold + " "));
filterLI.appendChild(userThresholdContainer);

filterLI.appendChild(createButton("+", "Threashold um 1 erhöhen", factoryAdjustUserThreshold(1)));
filterLI.appendChild(createButton("++", "Threashold um 2 erhöhen", factoryAdjustUserThreshold(2)));
filterLI.appendChild(document.createTextNode(" bewertet wurden."));

//mixed rating
filterLI = document.createElement("li");
filterUL.appendChild(filterLI);

var cb = document.createElement("input");
cb.setAttribute("type", "checkbox");
cb.setAttribute("name", "SortSubThreads");
cb.setAttribute("value", "true");
if(useMixedThreshold) {
	cb.setAttribute("checked", "checked");
}
cb.addEventListener('change', function() {useMixedThreshold = !useMixedThreshold; all_setValue("TrollExUseMixedThreshold", useMixedThreshold); }, true);
filterLI.appendChild(cb);

filterLI.appendChild(document.createTextNode("bei denen der Bewertungsmix schlechter als "));
filterLI.appendChild(createButton("- -", "Threashold um 10 erniedrigen", factoryAdjustMixedThreshold(-10)));
filterLI.appendChild(createButton("-", "Threashold um 1 erniedrigen", factoryAdjustMixedThreshold(-1)));

mixedContainer = document.createElement("span");
mixedContainer.setAttribute("id", "TrollExMixedRatingThreshold");
mixedContainer.appendChild(document.createTextNode(" " + mixedRatingThreshold + " "));
filterLI.appendChild(mixedContainer);

filterLI.appendChild(createButton("+", "Threashold um 1 erhöhen", factoryAdjustMixedThreshold(1)));
filterLI.appendChild(createButton("++", "Threashold um 10 erhöhen", factoryAdjustMixedThreshold(10)));
filterLI.appendChild(document.createTextNode(" Punkte ist."));

// create the "merge pages" GUI

var mergePagesGUI = document.createElement("div");
var mergePagesDisp = document.createElement("span");
mergePagesDisp.appendChild(document.createTextNode(mergePagesCount));
mergePagesDisp.setAttribute("id", "mergePagesDisp");
mergePagesGUI.appendChild(createButton("-", "Eine Seite weniger", factoryAdjustMergePages(-1)));
mergePagesGUI.appendChild(document.createTextNode(" "));
mergePagesGUI.appendChild(mergePagesDisp)
mergePagesGUI.appendChild(document.createTextNode(" "));
mergePagesGUI.appendChild(createButton("+", "Eine Seite mehr", factoryAdjustMergePages(1)));
mergePagesGUI.appendChild(document.createTextNode(" Seiten zu einer zusammenfügen"));


// create the user rating list title

userRatingListTitle =  document.createElement('span');

userRatingVisibilityButton = createButton("Ein-/Ausblenden", "" , switchUserRatingVisibilty);

var userRatingSortButtonsContainer = document.createElement("span");
tmp=document.createElement("span");
tmp.appendChild(document.createTextNode("----"));
tmp.style.visibility ="hidden";
userRatingSortButtonsContainer.appendChild(tmp);
tmp = null;
userRatingSortButtonsContainer.appendChild(document.createTextNode("Sortieren nach: "));

var sortUserRatingsNameButton = createButton("Nach Namen", "Sortiert die Liste nach Namen", function(){sortUserRatings(sortRatingsByName);} );
var sortUserRatingsRatingButton = createButton("Nach Bewertung", "Sortiert die Liste nach Bewertung", function(){sortUserRatings(sortRatingsByRating);} );
userRatingSortButtonsContainer.appendChild(sortUserRatingsNameButton);
userRatingSortButtonsContainer.appendChild(sortUserRatingsRatingButton);

if(userRatings.length > 0){
	tmp=document.createElement("span");
	tmp.appendChild(document.createTextNode("----"));
	tmp.style.visibility ="hidden";
	userRatingListTitle.appendChild(tmp);
	userRatingListTitle.appendChild(userRatingVisibilityButton);
	if(all_getValue("TrollExUserRatingVisibility", false)){
		userRatingListTitle.appendChild(userRatingSortButtonsContainer);
	}
}


// create the config elements.
trollExConfigContainer = document.createElement("div");

trollExConfigTitle = document.createElement("span");
trollExConfigTitle.setAttribute("style", "text-decoration:underline; font-weight:bold;");
trollExConfigTitle.appendChild(document.createTextNode("TrollEx Konfiguration"));
trollExConfigTitle.setAttribute("onClick", "");



trollExContainer = document.createElement("span");
trollExContainer.appendChild(trollExConfigTitle);
//trollExContainer.appendChild(document.createElement("br"));

// homepage link
var hp = document.createElement("div");
hp.setAttribute("style", "text-align:right");
trollExContainer.appendChild(hp);
//trollExContainer.appendChild(document.createElement("br"));


/* Configure mixed rating weights */
var mixedRatingConfigContainer = document.createElement("div");
mixedRatingConfigContainer.appendChild(document.createTextNode("Bewertungsmix = Threadbewertung \u2A09 "));
mixedRatingConfigContainer.appendChild(createButton("--", "Gewicht um 5 erniedrigen", factoryAdjustThreadRatingWeight(-5)));
mixedRatingConfigContainer.appendChild(createButton("-",  "Gewicht um 1 erniedrigen", factoryAdjustThreadRatingWeight(-1)));

threadRatingWeightContainer = document.createElement("span");
threadRatingWeightContainer.setAttribute("id", "TrollExThreadRatingWeight");
threadRatingWeightContainer.appendChild(document.createTextNode(" " + threadRatingWeight + " "));
mixedRatingConfigContainer.appendChild(threadRatingWeightContainer);

mixedRatingConfigContainer.appendChild(createButton("+",  "Gewicht um 1 erhöhen", factoryAdjustThreadRatingWeight(1)));
mixedRatingConfigContainer.appendChild(createButton("++", "Gewicht um 5 erhöhen", factoryAdjustThreadRatingWeight(5)));

mixedRatingConfigContainer.appendChild(document.createTextNode(" + Userbewertung \u2A09 "));
mixedRatingConfigContainer.appendChild(createButton("--", "Gewicht um 5 erniedrigen", factoryAdjustUserRatingWeight(-5)));
mixedRatingConfigContainer.appendChild(createButton("-",  "Gewicht um 1 erniedrigen", factoryAdjustUserRatingWeight(-1)));

userRatingWeightContainer = document.createElement("span");
userRatingWeightContainer.setAttribute("id", "TrollExUserRatingWeight");
userRatingWeightContainer.appendChild(document.createTextNode(" " + userRatingWeight + " "));
mixedRatingConfigContainer.appendChild(userRatingWeightContainer);

mixedRatingConfigContainer.appendChild(createButton("+",  "Gewicht um 1 erniedrigen", factoryAdjustUserRatingWeight(1)));
mixedRatingConfigContainer.appendChild(createButton("++", "Gewicht um 5 erhöhen", factoryAdjustUserRatingWeight(5)));




trollExContainer.appendChild(document.createElement("br"));
trollExContainer.appendChild(filterThresholdGUI);
trollExContainer.appendChild(mixedRatingConfigContainer);
trollExContainer.appendChild(document.createElement("br"));
trollExContainer.appendChild(mergePagesGUI);
trollExContainer.appendChild(document.createElement("br"));
trollExContainer.appendChild(userRatingListTitle);

userRatingListContainer = document.createElement("div");
trollExContainer.appendChild(userRatingListContainer);

badThreadsContainer = document.createElement("div");
badThreadsContainer.appendChild(badThreadRatingThreadsTitle);

badUsersContainer = document.createElement("div");
badUsersContainer.appendChild(badUserRatingThreadsTitle);

badMixedRatingContainer = document.createElement("div");
badMixedRatingContainer.appendChild(badMixedRatingThreadsTitle);
//badMixedRatingContainer.appendChild(badMixedRatingThreads);

if(threadList){
	threadList.parentNode.insertBefore(normalSorting, threadList.nextSibling);
	threadList.parentNode.insertBefore(normalThreadsList, normalSorting.nextSibling);
	threadList.parentNode.insertBefore(badThreadsContainer, normalThreadsList.nextSibling);
	threadList.parentNode.insertBefore(badUsersContainer, badThreadsContainer.nextSibling);
	threadList.parentNode.insertBefore(badMixedRatingContainer, badUsersContainer.nextSibling);
}

var untereZeileRes  = document.evaluate( "//ul[@class='forum_aktion']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var untereZeile = untereZeileRes.snapshotItem(0);
untereZeile.parentNode.insertBefore(trollExContainer, untereZeile.nextSilbing);

createUserRatingList();
if(threadList){
	moveThreads(threadList, getCurrentPage());
}

pageCount = getPageCount();

if(mergePagesCount > 1){
	var cp = getCurrentPage();
	
	var i = 1;
	while(cp + i <= pageCount && i < mergePagesCount){
		getPage(cp+i);
		i++;
	}
	if(window.location.href.search(/\/list/) >= 0){
		updateForumNavis();
	}
}
