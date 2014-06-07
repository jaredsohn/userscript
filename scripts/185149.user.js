// ==UserScript==
// @name        beordo (comedy version)
// @description it makes posting easier
// @include     http://endoftheinter.net/main.php
// @include     https://endoftheinter.net/main.php
// @include     http://boards.endoftheinter.net/topics/* 
// @include     https://boards.endoftheinter.net/topics/* 
// @include     http://boards.endoftheinter.net/postmsg.php?*&beordo
// @include     https://boards.endoftheinter.net/postmsg.php?*&beordo
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
      var beordo=document.createElement('a');
	  setValue("topic", href.substring(href.indexOf("=")+1) + ( getValue("topic")!='undefined' ? ',' + getValue("topic") : ""));
      beordo.href=href.replace('showmessages','postmsg');
	  beordo.href+="&beordo";
      beordo.textContent="beordo";
      beordo.style.color='red';
      beordo.style.paddingLeft='1em';
      topic[i].appendChild(beordo);
    }
  }
} else {
  var topic = getValue("topic").split(',');
  deleteValue("topic");
  if (topic.indexOf(document.URL.substring(document.URL.indexOf('=')+1,document.URL.indexOf('&beordo')))>-1){
    var beordo=['e','o','r','d','o','Submit'];
    var text=document.getElementById('message');
    var buttan=document.createElement('button');
    buttan.innerHTML = 'b';
    buttan.type='button';
    buttan.style.width = text.style.width;
    buttan.style.lineHeight = '20em';
    buttan.onclick=function(){
      if (beordo.length>0) {
         text.textContent=text.textContent.substring(0,6-beordo.length)+buttan.innerHTML+text.textContent.substring(6-beordo.length);
         buttan.innerHTML=beordo.shift();
      } else {
         document.getElementsByName("submit")[0].click();
      }
    }
    text.parentNode.insertBefore(buttan,text);
    text.parentNode.insertBefore(document.createTextNode('\n'),text);
  }
};