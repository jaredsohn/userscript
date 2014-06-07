// ==UserScript==
// @name           Customize Google Nav Bar
// @namespace      none
// @description    Allows you customize your google navigation bar
// @description    The script is modified from Google Interface
// @description    http://userscripts.org/scripts/show/6272
// @include        http://*.google.*
// ==/UserScript==

var Web         = document.createElement('a');
Web.setAttribute('href', 'http://www.google.com/webhp?tab=iw');
Web.innerHTML = 'Web';
Web.setAttribute('class', 'gb1');

var Images      = document.createElement('a');
Images.setAttribute('href', 'http://www.google.com/imghp?tab=wi');
Images.innerHTML = 'Images';
Images.setAttribute('class', 'gb1');

var Videos       = document.createElement('a');
Videos.setAttribute('href', 'http://video.google.com/?tab=wv');
Videos.innerHTML = 'Videos';
Videos.setAttribute('class', 'gb1');

var Maps        = document.createElement('a');
Maps.setAttribute('href', 'http://maps.google.com/maps?tab=wl');
Maps.innerHTML = 'Maps';
Maps.setAttribute('class', 'gb1');

var YouTube     = document.createElement('a');
YouTube.setAttribute('href', 'http://www.youtube.com/?tab=i1');
YouTube.innerHTML = 'YouTube';
YouTube.setAttribute('class', 'gb1');

var Translate   = document.createElement('a');
Translate.setAttribute('href', 'http://translate.google.com/?tab=iT');
Translate.innerHTML = 'Translate';
Translate.setAttribute('class', 'gb1');

var Gmail       = document.createElement('a');
Gmail.setAttribute('href', 'http://mail.google.com/mail/?tab=im');
Gmail.innerHTML = 'Gmail';
Gmail.setAttribute('class', 'gb1');

var Blogger     = document.createElement('a');
Blogger.setAttribute('href', 'http://www.blogger.com/');
Blogger.innerHTML = 'Blogger';
Blogger.setAttribute('class', 'gb1');

var Books       = document.createElement('a');
Books.setAttribute('href', 'http://books.google.com/books');
Books.innerHTML = 'Books';
Books.setAttribute('class', 'gb1');

var Calendar    = document.createElement('a');
Calendar.setAttribute('href', 'http://www.google.com/calendar/render?tab=wc');
Calendar.innerHTML = 'Calendar';
Calendar.setAttribute('class', 'gb1');

var Documents   = document.createElement('a');
Documents.setAttribute('href', 'http://docs.google.com/?tab=wo&authuser=0');
Documents.innerHTML = 'Documents';
Documents.setAttribute('class', 'gb1');

var Reader      = document.createElement('a');
Reader.setAttribute('href', 'http://www.google.com/reader/?tab=wy');
Reader.innerHTML = 'Reader';
Reader.setAttribute('class', 'gb1');

var Scholar     = document.createElement('a');
Scholar.setAttribute('href', 'http://www.google.com/schhp');
Scholar.innerHTML = 'Scholar';
Scholar.setAttribute('class', 'gb1');

var Photos      = document.createElement('a');
Photos.setAttribute('href', 'http://picasaweb.google.com/home?tab=wq');
Photos.innerHTML = 'Photos';
Photos.setAttribute('class', 'gb1');

var Directory   = document.createElement('a');
Directory.setAttribute('href', 'http://www.google.com/dictionary');
Directory.innerHTML = 'Directory';
Directory.setAttribute('class', 'gb1');

var Notebook    = document.createElement('a');
Notebook.setAttribute('href', 'http://www.google.com/notebook');
Notebook.innerHTML = 'Notebook';
Notebook.setAttribute('class', 'gb1');

var Links = new Array(Web,Images,Videos,Maps,YouTube,Translate,Gmail,Blogger,Books,Calendar,Documents,Reader,Scholar,Photos,Directory,Notebook);

var bar = document.getElementById("gbar");
var newbar = document.createElement("div");
bar.parentNode.replaceChild(newbar,bar);
newbar.setAttribute("id","gbar");

for(var i=0; i<Links.length; i++) {
	newbar.appendChild(Links[i]);
}