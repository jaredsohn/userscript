// ==UserScript==
// @name           Customize Google Nav Bar tw
// @namespace      none
// @description    Allows you customize your google navigation bar
// @description    The script is modified from Google Interface
// @description    http://userscripts.org/scripts/show/6272
// @include        http://*.google.*
// ==/UserScript==

var Web         = document.createElement('a');
Web.setAttribute('href', 'http://www.google.com.tw/webhp?hl=zh-TW&tab=vw');
Web.innerHTML = '所有網頁';
Web.setAttribute('class', 'gb1');

var Images      = document.createElement('a');
Images.setAttribute('href', 'http://www.google.com.tw/imghp?hl=zh-TW&tab=vi');
Images.innerHTML = '圖片';
Images.setAttribute('class', 'gb1');

var Videos       = document.createElement('a');
Videos.setAttribute('href', 'http://video.google.com.tw/?hl=zh-tw&tab=wv');
Videos.innerHTML = '影片';
Videos.setAttribute('class', 'gb1');

var Maps        = document.createElement('a');
Maps.setAttribute('href', 'http://maps.google.com.tw/maps?hl=zh-TW&tab=vl');
Maps.innerHTML = '地圖';
Maps.setAttribute('class', 'gb1');

var YouTube     = document.createElement('a');
YouTube.setAttribute('href', 'http://www.youtube.com/?hl=zh-TW&tab=v1&gl=TW');
YouTube.innerHTML = 'YouTube';
YouTube.setAttribute('class', 'gb1');

var Translate   = document.createElement('a');
Translate.setAttribute('href', 'http://translate.google.com.tw/?hl=zh-TW&tab=vT');
Translate.innerHTML = '翻譯';
Translate.setAttribute('class', 'gb1');

var Gmail       = document.createElement('a');
Gmail.setAttribute('href', 'http://mail.google.com/mail/?hl=zh-TW&tab=vm');
Gmail.innerHTML = 'Gmail';
Gmail.setAttribute('class', 'gb1');

var Blogger     = document.createElement('a');
Blogger.setAttribute('href', 'http://www.blogger.com/start?hl=zh-TW/');
Blogger.innerHTML = 'Blogger';
Blogger.setAttribute('class', 'gb1');

var Books       = document.createElement('a');
Books.setAttribute('href', 'http://books.google.com.tw/books?hl=zh-TW');
Books.innerHTML = '圖書';
Books.setAttribute('class', 'gb1');

var Calendar    = document.createElement('a');
Calendar.setAttribute('href', 'http://www.google.com/calendar/render?hl=zh-TW&tab=vc');
Calendar.innerHTML = '日曆';
Calendar.setAttribute('class', 'gb1');

var Documents   = document.createElement('a');
Documents.setAttribute('href', 'http://docs.google.com/?hl=zh-TW&tab=vo');
Documents.innerHTML = '文件';
Documents.setAttribute('class', 'gb1');

var Reader      = document.createElement('a');
Reader.setAttribute('href', 'http://www.google.com.tw/reader/?hl=zh-TW&tab=vy');
Reader.innerHTML = '閱讀器';
Reader.setAttribute('class', 'gb1');

var Scholar     = document.createElement('a');
Scholar.setAttribute('href', 'http://www.google.com.tw/schhp?hl=zh-TW');
Scholar.innerHTML = '學術搜尋';
Scholar.setAttribute('class', 'gb1');

var Photos      = document.createElement('a');
Photos.setAttribute('href', 'http://picasaweb.google.com.tw/home?hl=zh-TW&tab=vq');
Photos.innerHTML = '相片';
Photos.setAttribute('class', 'gb1');

var Directory   = document.createElement('a');
Directory.setAttribute('href', 'http://www.google.com.tw/dictionary?hl=zh-TW');
Directory.innerHTML = '字典';
Directory.setAttribute('class', 'gb1');

var Notebook    = document.createElement('a');
Notebook.setAttribute('href', 'http://www.google.com/notebook');
Notebook.innerHTML = '筆記本';
Notebook.setAttribute('class', 'gb1');

var Links = new Array(Web,Images,Videos,Maps,YouTube,Translate,Gmail,Blogger,Books,Calendar,Documents,Reader,Scholar,Photos,Directory,Notebook);

var bar = document.getElementById("gbar");
var newbar = document.createElement("div");
bar.parentNode.replaceChild(newbar,bar);
newbar.setAttribute("id","gbar");

for(var i=0; i<Links.length; i++) {
	newbar.appendChild(Links[i]);
}
