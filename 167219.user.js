// ==UserScript==
// @name       Bierdopje Enabler
// @namespace  http://www.bierdopje.com/
// @version    3.1
// @description  Enable the undocumented and extra features in Bierdopje by installing this script!
// @match      http://*.bierdopje.com/*
// @copyright  2013+, Tom
// ==/UserScript==

// ============  FEATURES  ============
// = ENABLED:                         =
// = - Enable Favourites Importer     =
// = - Enable Profile Uploads Button  =
// = - Enable 50 latest fav nl subs   =
// = - Enable 50 latest fav en subs   =
// = EXTRA:                           =
// = - Enable Unseen Episodes Button  =
// = - Series ALL button fix          =
// = - User search                    =
// = - Extend Profile Settings Width  =
// ============ /FEATURES  ============

// ==  Get Username ==
var username = document.getElementsByTagName("h4")[0];
// == /Get Username ==

// ===========================
// == UNDOCUMENTED FEATURES ==
// ===========================

// ==  Enable Favourites Importer ==
if (window.location.href.indexOf("settings") > -1) {
var SettingsButton = document.createElement('li');
var ImportNode = document.createTextNode("Importeren");
var ImportLink = document.createElement('a');
	ImportLink.setAttribute('href', '/tools/importfavs#');
	ImportLink.setAttribute('class', 'importfavs');

	document.getElementById("mysettings").childNodes[1].childNodes[1].appendChild(SettingsButton).appendChild(ImportLink).appendChild(ImportNode);

var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.innerHTML = "#tabmenu li a {\
		border-right: 0px;\
	}.importfavs {\
	height: 22px;\
	line-height: 24px;\
	}";
	document.getElementsByTagName("head")[0].appendChild(style);
}
// == /Enable Favourites Importer ==

// ==  Enable Profile Uploads Button ==
if (window.location.href.indexOf("user") > -1 && window.location.href.indexOf("search") == -1) {
var uploads = document.createElement('li');
	uploads.setAttribute('class', 'strong');
var UploadsNode = document.createTextNode("Uploads");
var UploadsLink = document.createElement('a');
var HeadbndUser = document.getElementsByTagName("h1")[1];
	UploadsLink.setAttribute('href', 'http://www.bierdopje.com/users/' + HeadbndUser.childNodes[0].textContent +'/uploads');

	document.getElementById("submenu").childNodes[1].appendChild(uploads).appendChild(UploadsLink).appendChild(UploadsNode);

if (window.location.href.indexOf("uploads") > -1) {
    UploadsLink.setAttribute('href', './');
    UploadsLink.setAttribute('class', 'selected');
}
}
// == /Enable Profile Uploads Button ==

// ==  Enable 50 latest fav nl subs ==
if (window.location.href.indexOf("subs/nl/favs") > -1) {
	document.getElementById("poll_box").childNodes[3].innerHTML = " ";
	document.getElementById("poll_box").childNodes[4].innerHTML = " ";
	document.getElementById("poll_box").childNodes[5].innerHTML = " ";
	document.getElementById("poll_box").childNodes[6].innerHTML = " ";
	document.getElementById("poll_box").childNodes[7].innerHTML = " ";
	document.getElementById("poll_box").childNodes[8].innerHTML = " ";
	document.getElementById("poll_box").childNodes[9].innerHTML = " ";
	document.getElementById("poll_box").childNodes[10].innerHTML = " ";
	document.getElementById("poll_box").childNodes[11].innerHTML = " ";
	document.getElementById("poll_box").childNodes[12].innerHTML = " ";
	document.getElementById("poll_box").childNodes[13].innerHTML = " ";
	document.getElementById("poll_box").childNodes[14].innerHTML = " ";
	document.getElementById("poll_box").childNodes[15].innerHTML = " ";
	document.getElementById("poll_box").childNodes[16].innerHTML = " ";
}
if (document.URL == "http://www.bierdopje.com" || document.URL == "http://www.bierdopje.com/") {
var spanFavSubsNL = document.createElement('span');
	spanFavSubsNL.setAttribute('class', 'fl');
var FavSubsNLNode = document.createTextNode("« Laatste Favoriete Ondertitels");
var FavSubsNLLink = document.createElement('a');
	FavSubsNLLink.setAttribute('href', '/latest/subs/nl/favs');

	document.getElementById("body_5b9744ff273909947ea43ffdbd10a409").childNodes[1].appendChild(spanFavSubsNL).appendChild(FavSubsNLLink).appendChild(FavSubsNLNode);
}
// == /Enable 50 latest fav nl subs ==

// ==  Enable 50 latest fav en subs ==
if (window.location.href.indexOf("subs/en/favs") > -1) {
	document.getElementById("poll_box").childNodes[3].innerHTML = " ";
	document.getElementById("poll_box").childNodes[4].innerHTML = " ";
	document.getElementById("poll_box").childNodes[5].innerHTML = " ";
	document.getElementById("poll_box").childNodes[6].innerHTML = " ";
	document.getElementById("poll_box").childNodes[7].innerHTML = " ";
	document.getElementById("poll_box").childNodes[8].innerHTML = " ";
	document.getElementById("poll_box").childNodes[9].innerHTML = " ";
	document.getElementById("poll_box").childNodes[10].innerHTML = " ";
	document.getElementById("poll_box").childNodes[11].innerHTML = " ";
	document.getElementById("poll_box").childNodes[12].innerHTML = " ";
	document.getElementById("poll_box").childNodes[13].innerHTML = " ";
	document.getElementById("poll_box").childNodes[14].innerHTML = " ";
	document.getElementById("poll_box").childNodes[15].innerHTML = " ";
	document.getElementById("poll_box").childNodes[16].innerHTML = " ";
}
if (document.URL == "http://www.bierdopje.com" || document.URL == "http://www.bierdopje.com/") {
var spanFavSubsEN = document.createElement('span');
	spanFavSubsEN.setAttribute('class', 'fl');
var FavSubsENNode = document.createTextNode("« Latest Favourite Subtitles");
var FavSubsENLink = document.createElement('a');
	FavSubsENLink.setAttribute('href', '/latest/subs/en/favs');

	document.getElementById("body_59c3989ab1bf0d14af7e069c8474426f").childNodes[1].appendChild(spanFavSubsEN).appendChild(FavSubsENLink).appendChild(FavSubsENNode);
}
// == /Enable 50 latest fav en subs ==

// ============================
// == /UNDOCUMENTED FEATURES ==
// ============================

// ============================
// ==     EXTRA FEATURES     ==
// ============================

// ==  Enable Unseen Episodes Button ==
if (document.URL == "http://www.bierdopje.com" || document.URL == "http://www.bierdopje.com/") {
var spanUnseenEpsHome = document.createElement('span');
	spanUnseenEpsHome.setAttribute('class', 'fl');
var UnseenEpsHomeNode = document.createTextNode("« Ongekeken");
var UnseenEpsHomeLink = document.createElement('a');
	UnseenEpsHomeLink.setAttribute('href', "http://www.bierdopje.com/users/" + username.childNodes[0].textContent + "/shows/episodes/unseen");

	document.getElementById("body_a2c823a0dc1765dc1cdacac5125e09be").childNodes[1].appendChild(spanUnseenEpsHome).appendChild(UnseenEpsHomeLink).appendChild(UnseenEpsHomeNode);
}
// == /Enable Unseen Episodes Button ==

// ==  Series ALL button fix ==
if (window.location.href.indexOf("shows/page") > -1 || document.URL == "http://www.bierdopje.com/shows" || document.URL == "http://www.bierdopje.com/shows/") {
	document.getElementById("pagination").childNodes[28].setAttribute('class', 'active');
    document.getElementById("pagination").childNodes[28].innerHTML = "Alle";
    //document.getElementById("pagination").childNodes[28].childNodes[0].setAttribute('class', 'active');
    //document.getElementById("pagination").childNodes[28].childNodes[0].setAttribute('style', 'color: white; padding: 4px 6px;');
}
// == /Series ALL button fix ==

// ==  User Search ==
if (document.URL == "http://www.bierdopje.com/search" || document.URL == "http://www.bierdopje.com/search/" || document.URL == "http://www.bierdopje.com/search/users/" || window.location.href.indexOf("search/shows") > -1 || window.location.href.indexOf("search/episodes") > -1 || window.location.href.indexOf("search/forum") > -1) {
var users = document.createElement('li');
	users.setAttribute('class', 'strong');
var UsersNode = document.createTextNode("Gebruikers");
var UsersLink = document.createElement('a');
	UsersLink.setAttribute('href', 'http://www.bierdopje.com/search/users/');

document.getElementById("submenu").childNodes[1].appendChild(users).appendChild(UsersLink).appendChild(UsersNode);

if (window.location.href.indexOf("search/users/") > -1) {
    UsersLink.setAttribute('href', './');
    UsersLink.setAttribute('class', 'selected');
    
document.title = "Bierdopje.com | Zoeken | Gebruikers | ";
    
var SearchUsers = document.createElement('div');
var SearchUsersRoot = document.getElementById('page').childNodes[7].childNodes[1].childNodes[1].childNodes[1];
	SearchUsersRoot.parentNode.replaceChild(SearchUsers, SearchUsersRoot);

    SearchUsers.innerHTML = '<iframe src="http://redfeather.net63.net/usersearch/" style="width:960px; height: 800px;"></iframe>';
}
}
// == /User Search ==

// ==  Extend Profile Settings Width ==
if (window.location.href.indexOf("settings") > -1) {
    document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
    document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
    document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[9].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
    document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[11].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
    document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[13].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
	document.getElementById("profiel").childNodes[1].childNodes[1].childNodes[3].childNodes[15].childNodes[1].childNodes[0].setAttribute('style', 'width: 350px;');
} 
// == /Extend Profile Settings Width ==

// ==  Favourite WIPs (disabled) ==
// if (document.URL == "http://www.bierdopje.com" || document.URL == "http://www.bierdopje.com/") {
// var spanFavWIPs = document.createElement('span');
// 	spanFavWIPs.setAttribute('class', 'fl');
// var FavWIPsNode = document.createTextNode("« Favoriete Work in Progress");
// var FavWIPsLink = document.createElement('a');
// 	FavWIPsLink.setAttribute('href', '/wip/favs');
// 
// 	document.getElementById("body_b415bb5a40bd07100d83f85846a39642").childNodes[1].appendChild(spanFavWIPs).appendChild(FavWIPsLink).appendChild(FavWIPsNode);
// }
//     
// if (window.location.href.indexOf("wip/favs") > -1) {
// document.title = "Bierdopje.com | 50 actieve WIP's - van je favoriete series";
//     
// var FavWIPDiv = document.createElement('div');
// var FavWIPDivRoot = document.getElementById('frontpage').childNodes[1];
//	FavWIPDivRoot.parentNode.replaceChild(FavWIPDiv, FavWIPDivRoot);
// 
//     FavWIPDiv.innerHTML = '<iframe src="http://redfeather.net63.net/wip/favs?user=' + username.childNodes[0].textContent + '" style="width:970px; height: 1240px; overflow: hidden;"></iframe>';
// }
// == /Favourite WIPs ==

// ============================
// ==    /EXTRA FEATURES     ==
// ============================

// future plans:
// - Bedankjes Auteur + bericht balk verwijderen indien geen bedankjes.
// - 50 favoriete actieve WIPs
// - afgelopen series
// - Shows lijst sorteren op Favorieten, Score, Airdate etc.