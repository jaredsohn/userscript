// ==UserScript==
// @name        boli_nie_boli
// @namespace   http://userscripts.org/users/485011/
// @description finetune for new boli.blog.pl look
// @include     http://boli.blog.pl/*
// @grant       addCss
// @version     1
// ==/UserScript==

var elmDeleted = document.getElementById("adultContainer");
if (elmDeleted) {
   elmDeleted.parentNode.removeChild(elmDeleted);
   };

elmDeleted = document.getElementById("socialslider");
if (elmDeleted) {
  elmDeleted.parentNode.removeChild(elmDeleted);
  };

elmDeleted = document.getElementById("slidebox");
if (elmDeleted) {
  elmDeleted.parentNode.removeChild(elmDeleted);
  };

elmDeleted = document.getElementById("ad_slot_container");
if (elmDeleted) {
  elmDeleted.parentNode.removeChild(elmDeleted);
  };
