// ==UserScript==
// @name           Google Korea in Old Style
// @namespace      http://userscripts.org/users/dyhan81
// @description    The first page of Google.co.kr will change into the original Google.com style.
// @include        http://www.google.co.kr/*
// @include        https://www.google.co.kr/*
// @copyright      2009+, Dong-yoon Han (http://cb-dyhan81.blogspot.com)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @version        1267471285357; Tue Mar 02 2010 04:21:25 GMT+0900
// @injectframes   1
// ==/UserScript==

(function(){
  if (0 < document.getElementsByClassName('topic-section').length) {
    document.getElementsByClassName('es')[0].innerHTML = "<br/><br/>";
  }
})();
