// ==UserScript==
// @name        Liens en entier
// @namespace   JE SUIS UN LAMASTICOT
// @description Met les liens raccourcis de JVC en entier
// @include     http://www.jeuxvideo.com/forums/*
// @version     1
// @grant	none
// @autor	SkyDreamer
// ==/UserScript==

var post = document.getElementById("col1").getElementsByTagName('div');
for (var i=0; i<post.length; i++)
{
  var divMsgEle=post[i];
  var id=divMsgEle.id;
  if (id.startsWith("message_")) {
	 var lnk = divMsgEle.getElementsByClassName('post')[0].getElementsByTagName('a')[0].href;
     divMsgEle.getElementsByClassName('post')[0].getElementsByTagName('a')[0].textContent=lnk;
  }
}
