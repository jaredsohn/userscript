// ==UserScript==
// @name           hanrei2wikibooks
// @namespace      hanrei2wikibooks
// @include        http://www.courts.go.jp/*
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML
.replace(/民法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/民法第$1条">民法$1条</a>')
.replace(/民訴法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/民事訴訟法第$1条">民訴法$1条</a>')
.replace(/刑法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/刑法第$1条">刑法$1条</a>')
.replace(/労働基準法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/労働基準法第$1条">労働基準法$1条</a>')
.replace(/国家賠償法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/国家賠償法第$1条">国家賠償法$1条</a>')
//
.replace(/厚生年金保険法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/厚生年金保険法$1条">厚生年金保険法$1条</a>')
.replace(/国民年金法(\d+)条/g,'<a href="http://ja.wikibooks.org/wiki/国民年金保険法$1条">国民年金法$1条</a>')
;