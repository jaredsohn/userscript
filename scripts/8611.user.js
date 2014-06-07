// ==UserScript==
// @name           Google Connect
// @description    Connect all the Google services
// @include        http://groups.google.com/*
// @include        https://groups.google.com/*
// @include        http://picasaweb.google.com/*
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @include        http://mail.google.com/mail/
// @include        https://mail.google.com/mail/
// @include        http://docs.google.com/*
// @include        https://docs.google.com/*
// ==/UserScript==

var SCRIPT = {
	name: "Google Connect",
	namespace: "http://userscripts.org/people/25394",
	description: 'Connect all the Google services',
	source: "http://userscripts.org/scripts/show/8611",
	identifier: "http://userscripts.org/scripts/show/8611.user.js",
	version: "0.4",								// version
	date: (new Date(2007, 5, 9))		// update date
			.valueOf()
};

(function(){
MOVE_WITH_PAGE=1;
OPEN_IN_NEW_TAB=1;

dv=document.createElement('div')
dv.style.position=MOVE_WITH_PAGE?"fixed":"absolute";
dv.style.top=0;
dv.style.left=0
document.body.appendChild(dv)

style='margin-right:auto;'+
'background-color:#DFECF5;'+
'background-image:url(http://www.google.com/calendar/images/corner_br.gif);'+
'background-position:right bottom;'+
'background-repeat:no-repeat;'+
'font-family:arial;'+
'font-size:medium;'+
'padding:1px 4px;'+
'color:#112ABB;'+
'font-family:Arial,Sans-serif;'+
'font-size:11px;'


if (parent.location!=document.location){return}

//determine which site we're on
google=(document.location+'').match(/www.google.com(\/search|\/)/)
pictures=(document.location+'').match(/picasaweb.google.com\//)
reader=(document.location+'').match(/www.google.com\/reader/)
groups=(document.location+'').match(/groups.google.com\//)

gmail=(document.location+'').match(/mail.google.com/)
docs=(document.location+'').match(/docs.google.com/)
calendar=(document.location+'').match(/www.google.com\/calendar/)

if (reader||calendar){google=0}

if (calendar||gmail||docs){
//remove the regular one from gmail, calendar, docs
tables=document.getElementsByTagName('table')
if (!tables.length && gmail){
    tables=document.getElementsByTagName('frame')[0]
        .contentDocument.getElementById('v1')
        .contentDocument.getElementsByTagName('table');
}
for (var i=0;i<tables.length;i++){
    if (tables[i].getElementsByTagName('td')[0].className=='bubble cornerBookmarks' || tables[i].className=="bookmarks"){
        tables[i].parentNode.removeChild(tables[i])
    }
}
}



e='<span style="'+style+'">'+
(google?'<b>Google</b> | ':'<a href="http://www.google.com/" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Google</a> | ')+
(gmail?'<b>Gmail</b> | ':'<a href="http://www.gmail.com/" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Gmail</a> | ')+
(calendar?'<b>Calendar</b> | ':'<a href="https://www.google.com/calendar/" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Calendar</a> | ')+
(docs?'<b>Documents</b> | ':'<a href="https://docs.google.com" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Documents</a> | ')+
(pictures?'<b>Photos</b> | ':'<a href="http://picasaweb.google.com/" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Photos</a> | ')+
(groups?'<b>Groups</b> | ':'<a href="http://groups.google.com/" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Groups</a> | ')+
(reader?'<b>Reader</b> | ':'<a href="http://www.google.com/reader" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>Reader</a> | ')+
'<a href="https://www.google.com/accounts/ManageAccount" '+(OPEN_IN_NEW_TAB?'target="_blank"':'')+'>my services »</a></span>'
dv.innerHTML=e+dv.innerHTML

})()