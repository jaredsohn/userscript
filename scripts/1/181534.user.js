// ==UserScript==
// @name        kfmbirdo
// @description it makes posting easier
// @include     http://endoftheinter.net/main.php
// @include     https://endoftheinter.net/main.php
// @include     http://boards.endoftheinter.net/topics/* 
// @include     https://boards.endoftheinter.net/topics/* 
// @include     http://boards.endoftheinter.net/postmsg.php?*&kfmbirdo
// @include     https://boards.endoftheinter.net/postmsg.php?*&kfmbirdo
// ==/UserScript==

var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined'),
	getValue = (isGM ? GM_getValue : (function(name, def) {var s=localStorage.getItem(name); return (s=="undefined" || s=="null") ? def : s})),
	setValue = (isGM ? GM_setValue : (function(name, value) {return localStorage.setItem(name, value)})),
	deleteValue = (isGM ? GM_deleteValue : (function(name, def) {return localStorage.setItem(name, def)}));

if (document.URL.indexOf('main.php')>0||document.URL.indexOf('/topics/')>0) {
  deleteValue("topic");
  var topic = document.getElementsByClassName('oh');
  for (i=0;i<topic.length;i++) {
    var text=topic[i].nextSibling.nextSibling.textContent,sp;
    var href=topic[i].firstChild.firstChild.href;
    if (href.indexOf('archives')==-1&&(parseInt(((sp=text.indexOf(' '))>0 ? text=text.substring(0,sp) : text),10)%50)==0) {
      var kfmbirdo=document.createElement('a');
	  setValue("topic", href.substring(href.indexOf("=")+1) + ( getValue("topic")!='undefined' ? ',' + getValue("topic") : ""));
      kfmbirdo.href=href.replace('showmessages','postmsg');
	  kfmbirdo.href+="&kfmbirdo";
      kfmbirdo.textContent="kfmbirdo";
      kfmbirdo.style.color='red';
      kfmbirdo.style.paddingLeft='1em';
      topic[i].appendChild(kfmbirdo);
    }
  }
} else {
  var topic = getValue("topic").split(',');
  deleteValue("topic");
  if (topic.indexOf(document.URL.substring(document.URL.indexOf('=')+1,document.URL.indexOf('&kfmbirdo')))>-1){
    var text=document.getElementById('message');
    text.textContent='kfmbirdo'+text.textContent;
    setTimeout(document.getElementsByName("submit")[0].click(), 0);
  }
};