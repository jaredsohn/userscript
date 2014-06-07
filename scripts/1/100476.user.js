// ==UserScript==
// @name           xindm.cn helper
// @description    next and prev for xindm.cn
// @include        http://*.xindm.cn/*
// ==/UserScript==

window.addEventListener('keyup', function(event){
  if(event.keyCode == 39){ var evt=document.createEvent('HTMLEvents');evt.initEvent('click', true, true);document.getElementById("next").dispatchEvent(evt);  } 
  if(event.keyCode == 37){ var evt=document.createEvent('HTMLEvents');evt.initEvent('click', true, true);document.getElementById("prev").dispatchEvent(evt);  }
});

document.getElementsByTagName('img')[2].addEventListener('click', function(){ var evt=document.createEvent('HTMLEvents');evt.initEvent('click', true, true);document.getElementById("next").dispatchEvent(evt); });

document.body.oncontextmenu=document.body.onselectstart=document.body.ondragstart="return true";

