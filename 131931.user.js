// ==UserScript==
// @name           Custom Google Navigation Bar
// @namespace      http://userscripts.org/scripts/show/131931
// @description    A customized Google Navigation Bar
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @version        1.1
// ==/UserScript==

var GoogleP_link	= document.createElement('a');
GoogleP_link.setAttribute('target', '_blank');
GoogleP_link.setAttribute('class', 'gbzt');
GoogleP_link.setAttribute('href', 'https://plus.google.com/');
GoogleP_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Google+</span>';
var GoogleP			= document.createElement('li');
GoogleP.setAttribute('class', 'gbt');
GoogleP.style.borderRight = '1px solid gray';
GoogleP.appendChild(GoogleP_link);

var Search_link		= document.createElement('a');
Search_link.setAttribute('target', '_blank');
Search_link.setAttribute('class', 'gbzt');
Search_link.setAttribute('href', 'http://www.google.com/');
Search_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Search</span>';
var Search			= document.createElement('li');
Search.setAttribute('class', 'gbt');
Search.appendChild(Search_link);

var Images_link		= document.createElement('a');
Images_link.setAttribute('target', '_blank');
Images_link.setAttribute('class', 'gbzt');
Images_link.setAttribute('href', 'http://www.google.com/imghp');
Images_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Images</span>';
var Images			= document.createElement('li');
Images.setAttribute('class', 'gbt');
Images.appendChild(Images_link);

var Maps_link		= document.createElement('a');
Maps_link.setAttribute('target', '_blank');
Maps_link.setAttribute('class', 'gbzt');
Maps_link.setAttribute('href', 'http://maps.google.com/');
Maps_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Maps</span>';
var Maps			= document.createElement('li');
Maps.setAttribute('class', 'gbt');
Maps.style.borderRight = '1px solid gray';
Maps.appendChild(Maps_link);

var Play_link		= document.createElement('a');
Play_link.setAttribute('target', '_blank');
Play_link.setAttribute('class', 'gbzt');
Play_link.setAttribute('href', 'https://play.google.com/');
Play_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Play</span>';
var Play			= document.createElement('li');
Play.setAttribute('class', 'gbt');
Play.appendChild(Play_link);

var Music_link		= document.createElement('a');
Music_link.setAttribute('target', '_blank');
Music_link.setAttribute('class', 'gbzt');
Music_link.setAttribute('href', 'https://music.google.com/');
Music_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Music</span>';
var Music			= document.createElement('li');
Music.setAttribute('class', 'gbt');
Music.appendChild(Music_link);

var YouTube_link	= document.createElement('a');
YouTube_link.setAttribute('target', '_blank');
YouTube_link.setAttribute('class', 'gbzt');
YouTube_link.setAttribute('href', 'http://www.youtube.com/');
YouTube_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">YouTube</span>';
var YouTube			= document.createElement('li');
YouTube.setAttribute('class', 'gbt');
YouTube.style.borderRight = '1px solid gray';
YouTube.appendChild(YouTube_link);

var Gmail_link		= document.createElement('a');
Gmail_link.setAttribute('target', '_blank');
Gmail_link.setAttribute('class', 'gbzt');
Gmail_link.setAttribute('href', 'https://mail.google.com/');
Gmail_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Gmail</span>';
var Gmail			= document.createElement('li');
Gmail.setAttribute('class', 'gbt');
Gmail.appendChild(Gmail_link);

var Contacts_link	= document.createElement('a');
Contacts_link.setAttribute('target', '_blank');
Contacts_link.setAttribute('class', 'gbzt');
Contacts_link.setAttribute('href', 'https://www.google.com/contacts/');
Contacts_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Contacts</span>';
var Contacts		= document.createElement('li');
Contacts.setAttribute('class', 'gbt');
Contacts.style.borderRight = '1px solid gray';
Contacts.appendChild(Contacts_link);

var Drive_link		= document.createElement('a');
Drive_link.setAttribute('target', '_blank');
Drive_link.setAttribute('class', 'gbzt');
Drive_link.setAttribute('href', 'https://drive.google.com/');
Drive_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Drive</span>';
var Drive			= document.createElement('li');
Drive.setAttribute('class', 'gbt');
Drive.appendChild(Drive_link);

var Translate_link	= document.createElement('a');
Translate_link.setAttribute('target', '_blank');
Translate_link.setAttribute('class', 'gbzt');
Translate_link.setAttribute('href', 'http://translate.google.com/');
Translate_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Translate</span>';
var Translate		= document.createElement('li');
Translate.setAttribute('class', 'gbt');
Translate.appendChild(Translate_link);

var More_link		= document.createElement('a');
More_link.setAttribute('target', '_blank');
More_link.setAttribute('class', 'gbzt');
More_link.setAttribute('href', 'http://www.google.com/about/products/');
More_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">More</span>';
var More			= document.createElement('li');
More.setAttribute('class', 'gbt');
More.appendChild(More_link);

var Calendar_link	= document.createElement('a');
Calendar_link.setAttribute('target', '_blank');
Calendar_link.setAttribute('class', 'gbzt');
Calendar_link.setAttribute('href', 'https://calendar.google.com/');
Calendar_link.innerHTML = '<span class=\"gbtb2\"></span><span class=\"gbts\">Calendar</span>';
var Calendar		= document.createElement('li');
Calendar.setAttribute('class', 'gbt');
Calendar.appendChild(Calendar_link);

var links = new Array(GoogleP,Search,Images,Maps,Play,Music,YouTube,Gmail,Contacts,Drive,Translate,More);

var navbar = document.getElementById("gbzc");
var newnavbar = document.createElement("ol");
newnavbar.setAttribute("id","gbzc");
newnavbar.setAttribute("class","gbtc");
for(var i=0; i<links.length; i++) {
	newnavbar.appendChild(links[i]);
}
navbar.parentNode.replaceChild(newnavbar,navbar);

var navbar_play = document.getElementById("gbz");
var newnavbar_play = document.createElement("div");
newnavbar_play.setAttribute("id","gbz");
var newspan_play = document.createElement("span");
newspan_play.setAttribute("class","gbtcb");
var newlist_play = document.createElement("ol");
newlist_play.setAttribute("class","gbtc");
for(var i=0; i<links.length; i++) {
	newlist_play.appendChild(links[i]);
}
newnavbar_play.appendChild(newspan_play);
newnavbar_play.appendChild(newlist_play);
navbar_play.parentNode.replaceChild(newnavbar_play,navbar_play);