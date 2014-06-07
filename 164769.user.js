// ==UserScript==
// @name        Anonymous
// @namespace   LOLXDPTDR
// @description Anonyme.
// @include     http://www.jeuxvideo.com/forums/*
// @version     1
// @author       SkyDreamer
// @grant       None
// ==/UserScript==


//* Changer tous les pseudos
var pseudo = document.getElementById("col1").getElementsByTagName('div');
for (var i=0; i<pseudo.length; i++)
{
  var divMsgEle=pseudo[i];
  var id=divMsgEle.id;
  if (id.startsWith("message_")) {
     divMsgEle.getElementsByClassName('pseudo')[0].getElementsByTagName('strong')[0].textContent="Anonymous";
  }
}





