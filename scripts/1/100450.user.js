// ==UserScript==
// @name            vkontakte modifier for image including (in comments)
// @description     translates special text to img tag. format: ["imgurl"]
// @version         1.0
// @date            2011-04-02
// @author          http://vkontankte.ru/misho

// @include         http://vkontakte.ru/*
// @include         http://vk.com/*
// @include         http://*.vkontakte.ru/*
// @include         http://*.vk.com/*
// @include         vkontakte.ru/*
// @include         vk.com/*
// @include         *.vkontakte.ru/*
// @include         *.vk.com/*
// ==/UserScript==

function onready() {
  check();
  setInterval('check()', 500);
}

function check() {
  var tags = getElementsByAttrribute(document, "div", "class", "wall_reply_text");
  for (var i = 0; i<tags.length; i++) {
    tags[i].innerHTML = tags[i].innerHTML.replace(/\["<a href="([^"]+)">.*?<\/a>"\]/img, '<img src="$1"/>');
    tags[i].innerHTML = tags[i].innerHTML.replace(/\["<a href="\/away.php.*?goAway\('([^']+)'.*?<\/a>"\]/img, '<img src="$1" />');
    tags[i].innerHTML = tags[i].innerHTML.replace(/\["<a href="\/away.php\?to=(.*?)&amp;h=.*?<\/a>"\]/img, function($0, $1) {return '<img src="' + unescape($1) + '" />';});
  }  
}

function getElementsByAttrribute(obj, tagname, attr, value) {
  var tags = obj.getElementsByTagName(tagname);
  var return_tags = new Array();
  var count = 0;

  for (var i = 0; i<tags.length; i++)
    if (tags[i].getAttribute(attr) == value) {
       return_tags[count] = tags[i];
       count++;
    }

  return return_tags;
}

(function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st = 
setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(onready);