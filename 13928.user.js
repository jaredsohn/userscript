// ==UserScript==
// @name           last.fm avatar cleanup
// @namespace      tag:tilman.vogel@web.de,2007:userscripts
// @description    Removes user-specified avatar pictures
// @include        http://www.lastfm.*/*
// @include        http://www.last.fm/*
// ==/UserScript==

function getXP(q) {
  GM_log("getXP("+q+")");
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function replaceImg( img ) {
  var replacement = document.createElement("DIV");
  replacement.innerHTML = 
    "<center>ugly picture<br>removed by userscript</center>";
  img.parentNode.insertBefore(replacement,img);
  img.parentNode.removeChild(img);
}


function removeAvatar( user ) {
  var imgs = getXP("//A[@href='/user/"+user+"/']/IMG");
  for(var i = 0; i < imgs.snapshotLength; ++i)
    replaceImg(imgs.snapshotItem(i));
}

function stopAnimation() {
  window.stop();
}

function enableStopAnimation() {
  GM_setValue("stop_animation",1);
  stopAnimation();
}

function disableStopAnimation() {
  GM_setValue("stop_animation",0);
}

// main()

var banned = 
  [ "specify", 
    "them",
    "here" ];

banned.forEach(removeAvatar);

if(GM_getValue("stop_animation",0))
  window.addEventListener('load', stopAnimation, false);

GM_registerMenuCommand( "Stop animated GIFs", enableStopAnimation );
GM_registerMenuCommand( "Don't stop animated GIFs", disableStopAnimation );
