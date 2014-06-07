// ==UserScript==
// @name           Newgrounds God All V.2
// @namespace      god_all@snakehole.net
// @description    Just added changing the actual Level Text.
// @include        http://*.newgrounds.com/*
// ==/UserScript==
var re=/(level\w{3}.gif)|(level\w{2}.gif)/
;
for (i=0; i<document.images.length; i++) {
document.images[i].src=document.images [i].src.replace(re, 'ng_god.gif');
}
// replace userpage level icon
var match=document.location.href.match('www.newgrounds.com');
if(match==null){
document.getElementById('ulevel').style.backgroundImage="url(http://licon.ngfiles.com/ng_god.gif)";
}

while(document.body.indexOf("<a href="/lit/faq#upa_rank">LEVEL ") > 0){
where = document.body.indexOf("<a href="/lit/faq#upa_rank">LEVEL ");
section1 = document.body.innerHTML.substring(0,where);
section2 = document.body.innerHTML.substring(where + 37);
document.body.innerHTML = section1 + "<a href="/lit/faq#upa_rank">LEVEL 60" + section2;
}