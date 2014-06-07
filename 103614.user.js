// ==UserScript==
// @name           4chan Prettifier
// @namespace      _ion
// @description    Makes 4chan pretty with a glass theme!
// @include        http://*.4chan.org/*
// ==/UserScript==
  var bg;
  var bgpos = '';
  var to = document.createElement("style");
  to.setAttribute("type", "text/css");
  if (document.URL.indexOf("/b/")>-1) {
    bg = 'http://img.ymtags.net/bc/wallpaper.png';
    bgpos = ' background-position: bottom left; ';
  } else if (document.URL.indexOf("/f/")>-1) {
    bg = 'http://img.ymtags.net/nnc.jpg';
    bgpos = ' background-position: top right; ';
  } else if (document.URL.indexOf("rs.")>-1) {
    bg = 'http://img.ymtags.net/wc/wallpaper.png';
    bgpos = ' background-position: center; ';
  } else {
    bg = 'http://img.ymtags.net/7c000mirrorsedge1.jpg';
    bgpos = ' background-position: right right; ';
  }
  to.innerHTML += 'body {cursor: default;background-image:url("'+bg+'");'+bgpos+'background-repeat: no-repeat; background-attachment: fixed;} '+"\r\n";
  to.innerHTML += '#header {background-color:transparent;background-image:url(http://img.ymtags.net/32.png);background-repeat:repeat-xy;font-size:10pt;font-family:arial;cursor: crosshair;}'+"\r\n";
  to.innerHTML += '.reply {color:#ccc;font-size:12pt;background-color:transparent;background-image: url(http://img.ymtags.net/bc/filler.png);background-repeat:repeat-xy;border:none;border-top: solid 1px #dddddd; border-left: solid 1px #cccccc;} '+"\r\n";
  to.innerHTML += '.replyhl {background-color:transparent;background-image:url(http://img.ymtags.net/transwhite/filler.png);background-repeat:repeat-xy;border:none;border-top:solid 1px #dddddd; border-left:solid 1px #cccccc;}'+"\r\n";
  to.innerHTML += '.thread {background-color:transparent;background-image:url(http://img.ymtags.net/32.png);background-repeat:repeat-xy;border-top:solid 1px #dddddd; border-left:solid 1px #cccccc;} '+"\r\n";
  to.innerHTML += '.pages {background-color:transparent;background-image:url(http://img.ymtags.net/32.png);background-repeat:repeat-xy;border:solid 1px #dddddd;}'+"\r\n";
  to.innerHTML += 'hr {display:none;}'+"\r\n";
  to.innerHTML += '.quotelink {color:dodgerblue!important;font-weight:bold;}'+"\r\n";
  to.innerHTML += '#navtop a {color:dodgerblue!important;}'+"\r\n";
  to.innerHTML += 'th {background-image:url(http://img.ymtags.net/32.png);background-repeat:repeat-xy;color:orange!important;background-color:transparent!important}'+"\r\n";
  document.body.appendChild(to);