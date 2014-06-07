// Copyright (C) 2007-2008 by Jens Rieks <studivz -at- jens beim surfen (dot) de>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           VZ Gruppen Script
// @namespace      http://greasemonkey-groups-script.studivz.net/
// @version        v1 rev26
// @date           2008-09-29
// @description    Erweiterte Gruppenfunktionen f&uuml;r StudiVZ, MeinVZ und SchuelerVZ
// @include        http://www.studivz.net/Profile/*
// @include        http://www.meinvz.net/Profile/*
// @include        http://www.schuelervz.net/Profile/*
// @include        http://www.studivz.net/Start/*
// @include        http://www.meinvz.net/Start/*
// @include        http://www.schuelervz.net/Start/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
/*
 * use the firebug console if it is available
 */
if(!(console && console.firebug)) {
	// create a dummy logger
	console = new Object();

	console.dir =
	console.error =
	console.group =
	console.groupEnd =
	console.info =
	console.log =
	console.trace =
	function(txt) {
	};

/*
 * make sure that some condition is met
 */
	console.assert = function(cond, txt) {
		if(!cond) {
			throw txt;
		}
	};
}
/*
 *
 */
function styleGreen(html) {
	return "<span style='background-color:lightgreen;'>"+html+"</span>";
}

/*
 *
 */
function styleRed(html) {
	//return "<span style='background-color:#FFB0B0;'>"+html+"</span>";
	return "<span style='background-color:red;'>"+html+"</span>";
}

/*
 *
 */
function styleBold(html) {
	return "<b>"+html+"</b>";
}

/*
 *
 */
function styleYellowBold(html) {
	return "<b style='background-color:yellow;'>"+html+"</b>";
}


/*
 *
 */
function fadeIn(tag) {
	tag = $(tag);
	tag.animate({opacity:1}, 500, function(){
		tag.show();
	});
}

/*
 *
 */
function fadeOut(tag) {
	tag = $(tag);
	tag.animate({opacity:0}, 500, function(){
		tag.hide();
	});
}
/*
 * determine the id of the profile you are visiting
 */
function forginProfileID(doNotFailOnError) {
	var accusedUserId = $("#accusedUserId");
	
	if(accusedUserId.length) {
		return accusedUserId.get(0).value;
	}
	if(!doNotFailOnError) {
		console.error("forginProfileID failed");
	}
	return null;
}

/*
 * determine your own profile's id
 */
function ownProfileID() {
	var href = $("a[@title='Meine Seite']").get(0).href;
	console.assert(href, "currentProfileID: href");
	var myid = /.*\/(.*)$/.exec(href);
	console.assert(myid, "currentProfileID: myid");
	console.assert(myid.length >= 2, "currentProfileID: myid.length >= 2");
	return myid[1];
}

/*
 * determine the id of the current profile
 */
function profileID() {
	if(!profileID.cached) {
		var id = forginProfileID(true);
		if(id) {
			profileID.cached = id;
		} else {
			profileID.cached = ownProfileID();
		}
	}
	return profileID.cached;
}

/*
 *
 */
function isFriend() {
	return $("#UniFriendsList li").length == 3;
}

/*
 * from svzsidebar.user.js
 */
addGlobalStyle = function (css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

/*
 *
 */
function isStartPage() {
	return /Meine Startseite/.exec(document.title);
}

/*
 *
 */
function isProfilePage() {
	// XXX: extend me
	return !isStartPage();
}

/*
 *
 */
function isStudiVZ() {
	return /^studiVZ/.exec(document.title);
}

/*
 *
 */
function isSchuelerVZ() {
	return /^schuelerVZ/.exec(document.title);
}

/*
 *
 */
function isMeinVZ() {
	return /^meinVZ/.exec(document.title);
}
// "singleton" like interface
var Favorites = {

// private cache
cache: null,

// GM get/set key
key: (isSchuelerVZ() ? "Favorites.schuelerVZ" : "Favorites" ),

/*
 *
 */
get: function(ignoreCache) {
	if(ignoreCache || !this.cache) {
		var ret = [];
		var str;
		try {
			str = GM_getValue(this.key);
		} catch( err ) {
			return [];
		}
		if(str!==undefined){
			var arr = str.split(/ /);
			for(var i = 0; i < arr.length; ++i) {
				var key = arr[i];
				if(key) {
					ret[key] = 1;
				}
			}
		}
		this.cache = ret;
	}
	return this.cache;
},

/*
 *
 */
add: function(id) {
	this.get(true)[id] = 1;
	this.store();
},

/*
 *
 */
remove: function(id) {
	this.get(true)[id] = 0;
	this.store();
},

/*
 *
 */
store: function() {
	var favs = this.get();
	var arr = [];

	for(var key in favs) {
		if(favs[key]) {
			arr.push(key);
		}
	}
	var str = arr.join(" ");
	
	try {
		GM_setValue(this.key, str);
		return true;
	} catch( err ) {
		console.group("GM_setValue('"+this.key+"', ...) failed");
		console.info("try setting an abritary value by hand via %o", "about:config");
		console.trace();
		console.groupEnd();
		return false;
	}
}

};
var onOwnPage = false;
var groupCount;
var groupsRemember;
var groupsUpdate;
var groupsForget;
var removedGroupsDiv;
var HTML_FAV = "&hearts;";
var HTML_BULLET = "&bull;";

/*
 * extracts the group ID from a grouplist LI tag's HTML code
 */
function extractGroupID(html) {
	var re = /href="[^"]*\/(.*?)"/;
	var result = re.exec(html);
	
	if(result && result.length >= 1 ) {
		return result[1];
	}
	console.info("extractGroupID failed: %s", html);
	console.trace();
	throw "stop";
}

/*
 * extracts the group description from a grouplist LI tag's HTML code
 */
function extractGroupDescription(html) {
	var re = />(.*)</;
	var result = re.exec(html);
	
	if(result && result.length >= 1 ) {
		return result[1];
	}
	console.info("extractGroupDescription failed: %s", html);
	console.trace();
	throw "stop";
}

/*
 *
 */
function profileGroupKey() {
	return "groups.profile."+profileID();
}

/*
 * returns an array with all <li>-tags of the grouplist on the current page
 */
function getLIs() {
	if(getLIs.cached) {
		return getLIs.cached;
	}
	getLIs.cached = $("#GroupsSnipplet li");
	return getLIs.cached;
}

/*
 * returns an array containing the group list of the current page
 */
function parseGroupList() {
	if(parseGroupList.cached) {
		return parseGroupList.cached;
	}
	//console.group("parseGroupList");
	var cache = [];
	var LIs = getLIs();
	for(var i = 0; i < LIs.length; ++i) {
		var li = LIs[i];	
		var html = li.innerHTML;
		var id = extractGroupID(html);
		var name = extractGroupDescription(html);
		//console.log("[%s] => [%s]", id, name);
		cache[id] = name;
	}
	parseGroupList.cached = cache;
	//console.dir(cache);
	//console.groupEnd();
	return cache;
}

/*
 * stores a group list
 */
function storeGroups(name, groups) {
	var str = "";
	for(var key in groups) {
		str += " " + key;
	}
	str = str.substr(1);
	
	try {
		GM_setValue(name, str);
		return true;
	} catch( err ) {
		console.group("GM_setValue('own_groups', ...) failed");
		console.info("try setting an abritary value by hand via %o", "about:config");
		console.trace();
		console.groupEnd();
		return false;
	}
}

/*
 * returns an array containing the previously stored groups
 */
function getStoredGroups(key) {
	var str;
	try {
		str = GM_getValue(key);
	} catch( err ) {
		return null;
	}
	if(!str) {
		return null;
	}
	var ret = [];
	var array = str.split(" ");

	// convert flat array to hash
	for(var i = 0; i < array.length; ++i) {
		ret[array[i]] = 1;
	}
	return ret;
}

/*
 *
 */
function getForginProfileStoredGroups() {
	if(!getForginProfileStoredGroups.cache) {
		getForginProfileStoredGroups.cache = getStoredGroups(profileGroupKey());
	}
	return getForginProfileStoredGroups.cache; 
}

/*
 *
 */
function getOwnGroups() {
	if(!getOwnGroups.cache) {
		getOwnGroups.cache = getStoredGroups('own_groups');
	}
	if(!getOwnGroups.cache) {
		return [];
	}
	return getOwnGroups.cache;
}

/*
 * returns a hash containing the group IDs you share with the current person's grouplist
 */
function findSameGroups() {
	if(findSameGroups.cached) {
		return findSameGroups.cached;
	}
	var groups = parseGroupList();
	var myGroups = getOwnGroups();
	var ret = [];
	
	if(myGroups === null) {
		console.group("findSameGroups");
		console.error("Keine eigenen Gruppen gespeichert.");
		console.info("L&ouml;sung: Bitte besuche deine eigene Seite!");
		console.group("debug infos");
		console.dir(myGroups);
		console.trace();
		console.groupEnd();
		console.groupEnd();
	} else {
		for(var key in groups) {
			if(myGroups[key]) {
				ret[key] = myGroups[key];
			}
		}
	}
	findSameGroups.cached = ret;
	return ret;
}

/*
 * highlight search text 
 */
function hightlightText(text, re) {
	if(re === null) {
		return text;
	}
	var result = re.exec(text);
	if(!result) {
		return text;
	}
	var len = result[0].length;
	if(len===0) {
		return text;
	}
	var ix1 = result.index;
	var ix2 = ix1 + len;
	var ret = "";

	ret += text.substr(0, ix1);
	ret += styleYellowBold(text.substr(ix1, len));
	ret += text.substr(ix2);
	return ret;
}

/*
 *
 */
function buildFilteredText(id, re) {
	var groupList = parseGroupList();
	var ownGroups = getOwnGroups();
	var names = readGroupNames();
	var html = hightlightText(names[id], re);

	if(!onOwnPage && ownGroups[id]) {
		html = styleBold(html);
	}

	var storedGroups = getForginProfileStoredGroups();
	if(storedGroups && !storedGroups[id]) {
		html = styleGreen(html);
	} else if(!groupList[id]) {
		// removed groups are in a div and do not need a special background color
		//html = styleRed(html);
	}
	return html;
}

/*
 * set the LI-tag text for the given filter text
 */
function setFilteredText(tag, re) {
	var id = extractGroupID(tag.innerHTML);
	var aTag = $(tag).find('a')[0];
	aTag.innerHTML =  buildFilteredText(id, re);
}


/*
 * highlights the given groups
 */
function highlightGroups() {
	var LIs = getLIs();
	
	for(var i = 0; i < LIs.length; ++i) {
		setFilteredText(LIs[i], null);
	}
}

/*
 * shows the number of visible groups
 */
function setGroupCount() {
	var txt = ": " + setGroupCount.count;
	if(setGroupCount.count != setGroupCount.sum) {
		txt += " von " + setGroupCount.sum;
	}
	if(setGroupCount.added!=0) {
		txt += " " + styleGreen("neu:&nbsp;"+setGroupCount.added);
	}
	if(setGroupCount.removed!=0) {
		txt += " " + styleRed("<a href='javascript:void(0);' id='svzGroupsRemoved'>weg:&nbsp;"+setGroupCount.removed+"</a>");
	}
	groupCount.innerHTML = txt;
	
	var weg = $(groupCount).find("#svzGroupsRemoved");
	if(weg && weg.length > 0) {
		weg.get(0).addEventListener("click", function() {
			removedGroupsDiv.toggle();
		}, true);
	}
}
setGroupCount.count = 0;
setGroupCount.sum = 0;
setGroupCount.added = 0;
setGroupCount.removed = 0;

/*
 * processes your own page and updates the cached group list
 */
function processOwnPage() {
	if(profileID() == ownProfileID()) {
		if(storeGroups('own_groups', parseGroupList())) {
			console.info("Deine Gruppen wurden gespeichert.");
		} else {
			console.error("Deine Gruppen konnten nicht gespeichert werden.");
		}
		onOwnPage = true;
		return true;
	}
	return false;
}

/*
 * group highlighter
 */
function sameGroupsHighlighter() {
	if(!processOwnPage()) {
		findSameGroups();
	}
	highlightGroups();
	//console.log("isFriend:%s", isFriend());
}

/*
 *
 */
function applyFilterOn(li, re, counter) {
	var groupList = parseGroupList();
	var html = li.innerHTML;
	var id = extractGroupID(html);
	if(!id) {
		return;
	}
	var desc = groupList[id];
	if(!desc) {
		return;
	}
	++counter.sum;
	if(re.exec(desc)) {
		li.removeAttribute("style");
		setFilteredText(li, re);
		++counter.count;
	} else {
		li.setAttribute("style", "display:none;");
		setFilteredText(li, null);
	}
}

/*
 * hide groups not matching the given filter text
 */
function applyFilter(txt) {
	if(applyFilter.lastFilter == txt) {
		return;
	} else {
		applyFilter.lastFilter = txt;
	}
	var LIs = getLIs();
	var counter = new Object;
	var re = new RegExp(txt, "i");
	var i;
	
	setGroupCount.sum = 0;
	setGroupCount.count = 0;
	for(i = 0; i < LIs.length; ++i) {
		applyFilterOn(LIs[i], re, setGroupCount);
	}
	setGroupCount();
}

/*
 *
 */
function reapplyFilter() {
	var txt = applyFilter.lastFilter;
	if(!txt) {
		txt = "";
	}
	applyFilter.lastFilter = null;
	applyFilter(txt);
}

/*
 *
function getTop10() {
	var gl = parseGroupList();
	var hash = new Array();
	var re = /([a-z0-9]+)/ig;

	for(key in gl) {
		var name = gl[key];
		var array = name.match(re);
		console.log(name+": "+array.join("; "));
		if(!array)continue;
		for(i=1; i < array.length; ++i) {
			var k = array[i];
			if(hash[k]) {
				++hash[k];
			} else {
				hash[k] = 1;
			}
		}
	}
	
	for(key in hash) {
		console.log(key + ": "+hash[key]);
	}
}
 */

/*
 *
 */
function rememberGroupsStore() {
	storeGroups(profileGroupKey(), parseGroupList());
	console.info("rememberGroupsStore");
}

/*
 *
 */
function rememberGroupsForget() {
	storeGroups(profileGroupKey(), []);
	console.info("rememberGroupsForget");
}

/*
 *
 */
function nonEqualGroups(a, b) {
	var sumA = 0;
	var sumB = 0;
	
	for(var key in a) {
		if(!b[key]) {
			++sumB;
		}
	}
	for(var key in b) {
		if(!a[key]) {
			//console.log("key:%s",key);
			++sumA;
		}
	}
	return [sumA, sumB];
}

/*
 *
 */
function updateGroupsCounters() {
	getForginProfileStoredGroups.cache = null;
	var storedGroups = getForginProfileStoredGroups();

	if(storedGroups == null) {
		// "forget" does not work with this -> profile is stored again on next page load
		//if(isFriend()) {
		//	groupsRememberExec();
		//	console.log("stored you friend's groups");
		//} else {
			$(groupsRemember).show();
		//}
		setGroupCount.count = setGroupCount.sum = getLIs().length;
		setGroupCount.added = setGroupCount.removed = 0;
		setGroupCount();
	} else {
		var diff = nonEqualGroups(storedGroups, parseGroupList());
		
		if( diff[0] != 0 || diff[1] != 0 ) {
			$(groupsUpdate).show();
		}
		$(groupsForget).show();
		
		setGroupCount.count = setGroupCount.sum = getLIs().length;
		setGroupCount.added = diff[0];
		setGroupCount.removed = diff[1];
		setGroupCount();
		
		if(diff[1] !== 0) {
			removedGroupsDiv.toggle();
		}
	}
}

/*
 *
 */
function groupsRememberExec() {
	rememberGroupsStore();
	updateGroupsCounters();
	reapplyFilter();
	fadeOut(groupsRemember);
	fadeOut(groupsUpdate);
	fadeIn(groupsForget);
	fadeOut(removedGroupsDiv);
}

/*
 *
 */
function groupsUpdateExec() {
	rememberGroupsStore();
	updateGroupsCounters();
	reapplyFilter();
	fadeOut(groupsRemember);
	fadeOut(groupsUpdate);
	fadeIn(groupsForget);
	fadeOut(removedGroupsDiv);
}

/*
 *
 */
function groupsForgetExec() {
	rememberGroupsForget();
	updateGroupsCounters();
	reapplyFilter();
	fadeIn(groupsRemember);
	fadeOut(groupsUpdate);
	fadeOut(groupsForget);
	fadeOut(removedGroupsDiv);
}

/*
 *
 */
function createGroupCount(where) {
	groupCount = document.createElement('b');
	groupCount.style.clear = 'both';
	setGroupCount.count = setGroupCount.sum = getLIs().length;
	setGroupCount();
	where.appendChild(groupCount);

	removedGroupsDiv = $('<div style="border:1px solid #EE0000;padding:5px;color:#EE0000;"><h2>gel&ouml;schte Gruppen</h2><div id="svzGroupsRemovedText">...</div></div>');
	removedGroupsDiv.hide();
	var svzGroupsRemovedText = removedGroupsDiv.find("#svzGroupsRemovedText");
	removedGroupsDiv.toggle = function() {
		if(removedGroupsDiv.toggle.status == 1) {
			fadeIn(removedGroupsDiv);
			removedGroupsDiv.toggle.status = 2;
		} else if(removedGroupsDiv.toggle.status == 2) {
			fadeOut(removedGroupsDiv);
			removedGroupsDiv.toggle.status = 1;
		} else {
			removedGroupsDiv.toggle.status = 2;
			/*
			 * create div containing the removed groups
			 */
			var a = getForginProfileStoredGroups();
			var b = parseGroupList();
			var txt = "<ul>";
						
			for(var key in a) {
				if(!b[key]) {
					txt += "<li>";
					txt += '<a href="/Groups/Overview/'+key+'">';
					txt += buildFilteredText(key, null);
					txt += '</a>';
					txt += "</li>";
				}
			}
			txt += "</ul>";
			svzGroupsRemovedText.get(0).innerHTML = txt;
			fadeIn(removedGroupsDiv);
		}
	};
	removedGroupsDiv.get(0).addEventListener("click",function(){
		removedGroupsDiv.toggle();
	}, true);
	where.parentNode.appendChild(removedGroupsDiv.get(0));

	groupsRemember = $('<a href="javascript:void(0);" style="margin-left:10px;">[merken]</a>');
	groupsRemember.hide();
	groupsRemember = groupsRemember.get(0);
	groupsRemember.addEventListener("click", function() {
		groupsRememberExec();
	}, true);
	where.appendChild(groupsRemember);
	
	groupsUpdate = $('<a href="javascript:void(0);" style="margin-left:10px;">[&uuml;bernehmen]</a>');
	groupsUpdate.hide();
	groupsUpdate = groupsUpdate.get(0);
	groupsUpdate.addEventListener("click", function() {
		groupsUpdateExec();
	}, true);
	where.appendChild(groupsUpdate);
	
	groupsForget = $('<a href="javascript:void(0);" style="margin-left:10px;">[vergessen]</a>');
	groupsForget.hide();
	groupsForget = groupsForget.get(0);
	groupsForget.addEventListener("click", function() {
		groupsForgetExec();
	}, true);
	
	where.appendChild(groupsForget);
	updateGroupsCounters();		
}

/*
 * the following code was taken from the "StudiVZ: Gruppen filtern" script
 */
function createFilterField(where) {
	var filterField = document.createElement('input');

	filterField.setAttribute('type', 'text');
	filterField.setAttribute('style', 'padding: 0px; color: lightgrey; width: 68px; float:right; margin:5px;margin-top:2px; border:1px solid black;');
	filterField.setAttribute('value', 'Filter');

	filterField.addEventListener('focus', function(e){
		if(e.target.value == 'Filter') {
			e.target.value = '';
			e.target.style.color = 'black';
		}
	}, true);

	filterField.addEventListener('blur', function(e){
		if(e.target.value === '') {
			e.target.value = 'Filter';
			e.target.style.color = 'lightgrey';
		}
	}, true);
	
	filterField.addEventListener('keyup', function(e){
		applyFilter(e.target.value);
	}, true);

	where.parentNode.insertBefore(filterField, where);

	var clear = document.createElement('div');
	clear.style.clear = 'both';
	where.parentNode.appendChild(clear);
}

/*
 *
 */
function cssClassRemove(txt, cls) {
	txt = " " + txt + " ";
	txt = txt.replace(" "+cls+" ", " ");
	return txt;
}

/*
 *
 */
function cssClassAdd(txt, cls) {
	txt = cssClassRemove(txt) + " " + cls;
	txt = txt.replace(/^\s*/, "");
	txt = txt.replace(/\s*$/, "");
	return txt;
}

/*
 *
 */
function installFavoriteBulletsForLI(li) {
	var favs = Favorites.get();
	var span = $('<span>'+HTML_BULLET+'</span>');
	//span[0].style.cssFloat = "left";
	span[0].style.cursor = "pointer";
	span[0].style.marginLeft = "0px";
	span[0].style.marginRight = "4px";
	$(li).prepend(span);
	
	(function(span, li, id) {
		var setFav = function() {
			li.className = cssClassAdd(li.className, "svzFAV");
			span.title = "Favorit";
			span.innerHTML = HTML_FAV;
		};
		var unsetFav = function() {
			li.className = cssClassRemove(li.className, "svzFAV");
			span.title = "Klicken, um diese Gruppe zum Favoriten zu machen";
			span.innerHTML = HTML_BULLET;
		};
		var toggleLI = function() {
			if( /svzFAV/.test(li.className) ) {
				unsetFav();
				Favorites.remove(id);
			} else {
				setFav();
				Favorites.add(id);
			}
		};
		if(favs[id]) {
			setFav();
		} else {
			unsetFav();
		}
		span.addEventListener("click", toggleLI, true);
	})(span[0], li, extractGroupID(li.innerHTML));
}

/*
 *
 */
function installFavoriteBullets() {
	// show favorites on your own page only 
	if(!onOwnPage) {
		return;
	}
	var LIs = getLIs();
	var groupList = parseGroupList();
	var sameGroups = findSameGroups();
	
	if(LIs[0]) {
		var ul = LIs[0].parentNode;
		ul.style.listStyleType = "none";
		ul.style.margin = "0px";
	}
	for(var i = 0; i < LIs.length; ++i) {
		installFavoriteBulletsForLI(LIs[i]);
	}
}

/*
 * enhance the profile page
 */
function enhanceProfilePage() {
	var h2s = $('#profileRight h2');
	
	for(var i = 0; i < h2s.length; ++i) {
		var tag = h2s[i];
		var html = tag.innerHTML;
		
		// match the "Gruppen" header
		if( /Gruppen/.test(html) ) {
			createGroupCount(tag);
			createFilterField(tag);
			console.info("enhanceProfilePage ok");
			return;
		}
	}
	console.error("injectGroupSearchField failed: h2="+h2s);
}

/*
 *
 */
function readGroupNames() {
	if(readGroupNames.cache){
		return readGroupNames.cache;
	}
	var ret = [];
	var str = GM_getValue("groupNames");
	//console.info("---get---\n",str);
	if(str) {
		var array = str.split("\n");
	
		// convert flat array to hash
		for(var i = 0; i < array.length; ++i) {
			var tmp = array[i];
			if(!tmp || !tmp.length) {
				continue;
			} 
			tmp = tmp.split(":", 2);
			ret[tmp[0]] = unescape(tmp[1]);
		}
	}
	readGroupNames.cache = ret;
	return ret;
}

/*
 * store all group names - they are used to determine the name of removed groups
 */
function storeGroupNames() {
	var groupList = parseGroupList();
	readGroupNames.cache = null;
	var names = readGroupNames();
	var hash = [];
	var txt = "";
	
	for(var key in names) {
		hash[key] = names[key];
	}
		
	for(var key in groupList) {
		hash[key] = groupList[key]; 
	}
	
	for(var key in hash) {
		txt += key + ":" + escape(hash[key]) + "\n";
	}
	
	GM_setValue("groupNames", txt);
	readGroupNames.cache = null;
	//console.info("---set---\n",txt);
}

/*
 *
 */
function addStyles() {
	var style = 'li.svzFAV {background-color:#FFF29B;}';
	
	if(isStartPage()) {
		style += "\#Groups ul {list-style-type:none;margin:0;padding:0;color:#EE0000;}";
	}	
	addGlobalStyle(style);
}

/*
 * main profile function
 */
function mainProfile() {
	addStyles();
	console.group("svz group script");
	storeGroupNames();
	sameGroupsHighlighter();
	installFavoriteBullets();
	enhanceProfilePage();
	console.groupEnd();
}

/*
 * main start page function
 */
function mainStartPage() {
	var favs = Favorites.get();
	addStyles();
	var welcome = $('#Welcome');
	var div = $('<div id="Groups" class="clearFix staticContent"><div class="floatL"></div><div class="floatR"><h2 class="clearFix"><span class="title">Favorisierte Gruppen</span></h2><p></p></div></div>');
	var text = div.find('p')[0]; 
	var names = readGroupNames();
	var html = "<ul>";
	var count = 0;
	
	for(key in favs) {
		if(favs[key]){
			html += "<li>";
			html += '<a href="/Groups/Overview/'+key+'">';
			html += names[key];
			html += "</a>";
			html += "</li>";
			++count;
		}
	}
	if(count === 0) {
		console.info("Keine Favoriten gespeichert.");
		return;
	}
	html += "</ul>";
	text.innerHTML = html;
	
	div.find('li').each(function (key, val) {
		installFavoriteBulletsForLI(val);
	});

	div.insertAfter(welcome);
}

/*
 *
 */
function __init() {
	console.group("vzgroups");
	try {
		if(isStartPage()) {
			console.info("on the start page");
			mainStartPage();
		} else {
			console.info("on a profile page");
			mainProfile();
		}
	} catch( err ) {
		console.error(err);
	}
	console.groupEnd();
}

__init();
