// ==UserScript==
// @name           Flickr Contacts' Favorites Explorer
// @namespace      http://favoritesExplorer
// @include        http://www.flickr.com/
// @include        http://flickr.com/
// @version        0.0.13
// @author	   Erlend Oftedal
// @description    Show latest added favorites from your contacts
// ==/UserScript==


var favorites = new Array();
var favoritesKeys = new Array();
var favoritesLoaded = new Array();
var self = this;
var fCount = 0;
var fTotal = 0;
var feLoaded = false;
var fStopped = false;
var fButton;

var listener = {
	flickr_contacts_getList_onLoad: function(success, responseXML, responseText, params){
		favorites = new Array();
		favoritesKeys = new Array();
		eval("contacts_" + responseText);
	}
};
var favlistener = {
	flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
		var result = eval("fav_" + responseText);
		favoritesLoaded.push(params.user_id);
		populateFaves(result, {username: params.username, user_id: params.user_id});
	}
};

function createContainer(nolink) {
	var _fe_ar = new Array();
	_fe_ar.push('<div class="hd">');
	_fe_ar.push('<div class="hd-more"><p><a id="fe_favlink"></a></p></div>');
	_fe_ar.push('<div class="hd-main"><h2>&raquo; <a id=\"conLink\">Your Contacts\' Favorites</a></h2></div></div>');
	_fe_ar.push('<div class="bd"><div class="toggle-content">');
	_fe_ar.push('<ul id="favsExplorer" class="tt-thumbs">');
	_fe_ar.push("Loading your contacts' favorites...");
	_fe_ar.push('</ul><div class="clearfix"></div></div></div>');
	return _fe_ar.join("");
}

function switchPreload() {
	_fe_preload = !_fe_preload;
	GM_setValue("loadFEOnFrontPage", _fe_preload);
	setPreloadLinkTitle();
	if (_fe_preload) {
		loadFrontpage();
	}
}
function setPreloadLinkTitle() {
	_fe_link.innerHTML = (!_fe_preload ? "Preload on this page" : "Only load when clicking header");

}


var _fe_d = unWrap(document.getElementById("y-groups"));
var _fe_div = unWrap(document.createElement("div"));
_fe_div.className = "tt-block tt-has-new-activity";
_fe_div.innerHTML = createContainer(true);
_fe_d.parentNode.insertBefore(_fe_div, _fe_d);

var per_user = 5;
var max_total = 25;


var div = unWrap(document.getElementById("favsExplorer"));
unWrap(document.getElementById("conLink")).onclick = switchMode;

var _fe_link = unWrap(document.getElementById("fe_favlink"));
var _fe_preload = GM_getValue("loadFEOnFrontPage", false);
_fe_link.href="javascript:";
_fe_link.onclick = switchPreload;
setPreloadLinkTitle()

if (_fe_preload) {
	loadFrontpage();
} else {
	div.innerHTML = "Click header above to load favorites...";
}

function loadFrontpage() {
	unsafeWindow.F.API.callMethod('flickr.contacts.getList', {format: "json"}, listener);
}


function contacts_jsonFlickrApi(result) {
	fCount = result.contacts.total;
	fTotal = fCount;
	for(var i = 0; i < result.contacts.total; i++) {
		//nsid username
		unsafeWindow.F.API.callMethod('flickr.favorites.getList', {
			format: "json",
			user_id: result.contacts.contact[i].nsid,
			extras: "icon_server, owner_name",
			per_page: per_user ,
			username: result.contacts.contact[i].username
			}, favlistener);		
		//return;
	}
	fButton = unWrap(document.createElement("input"));
	fButton.type = "button";
	fButton.value = "I'm tired of waiting";
	fButton.onclick = sortAndDisplay;
	div.parentNode.insertBefore(fButton, div.nextSibling);
}

function fav_jsonFlickrApi(result) {
	return result;
}
function populateFaves(result, user) {
	if (fStopped) return;
	var tot = result.photos.total;
	tot = (tot > per_user  ? per_user  : tot);
	for(var i = 0; i < tot; i++) {
		var p = result.photos.photo[i];
		var fd = parseInt(p.date_faved,10);
		favoritesKeys.push(p.date_faved);
		favorites[fd] = 
			"<li style=\"height: 128px\"><span class=\"photo_container pc_s\"><a href=\"/photos/" + p.owner + "/" + p.id + "/\" title=\"" + p.title + " by " + p.ownername + " - faved by " + user.username + "\">" + 
			"<img src=\"http://farm" + p.farm + ".static.flickr.com/" + p.server + "/" + p.id + "_" + p.secret + "_s.jpg\" width=\"75\" height=\"75\" class=\"pc_img\" />" + 
			"</a></span><div>From <a href=\"/photos/" + p.owner + "/\">" + p.ownername + "...</a><br>More faves from <a href=\"/photos/" + user.user_id + "/favorites/\">" + user.username + "</a></div></li>";


	}
	fCount--;
	div.innerHTML = "Loading your contacts' favorites... (" + (fTotal - fCount) + "/" + fTotal + ")" + " (" + favoritesLoaded.length + ")";
	

	if (fCount == 0 || favoritesLoaded.length == fTotal) {
		div.innerHTML = "Favorites loaded... sorting...";	
		setTimeout(sortAndDisplay, 100);
	}	
}

function sortAndDisplay() {
	if (fStopped) return;
	fButton.style.display = "none";
	fStopped = true;
	var ar = new Array();
	var x = 0;
	favoritesKeys = favoritesKeys.sort();
	favoritesKeys = favoritesKeys.reverse();
	for (var j = 0; j < favoritesKeys.length; j++) {
		ar.push(favorites[favoritesKeys[j]]);
			if (++x >= max_total) break;
	}
	ar.push('</ul><div class="clearfix"></div></div></div>');
	div.innerHTML = ar.join("");
	d.parentNode.insertBefore(div, d);
}

function switchMode() {
	per_user = 20;
	max_total = 160;
	var totomain = unWrap(document.getElementById("toto-main"));
	var main = unWrap(document.getElementById("Main"));
	main.removeChild(main.childNodes[1]);
	totomain.innerHTML = createContainer();
	div = unWrap(document.getElementById("favsExplorer"));
	unWrap(document.getElementById("conLink")).onclick = switchMode;
	unsafeWindow.F.API.callMethod('flickr.contacts.getList', {format: "json"}, listener);
}

function unWrap(elm) {
	return elm.wrappedJSObject || elm;
}