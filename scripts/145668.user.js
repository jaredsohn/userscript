// ==UserScript==
// @name        Google
// @namespace   grease_google
// @description this script disables the onmousedown event of result links in google search page. It enables user to copy links and visit pages without sending info to Google(at least i think..)
// @include     https://www.google.*
// @include     http://www.google.*
// @version     1
// ==/UserScript==

window.onload=function () {
   var elementList = [];
   elementList = document.querySelectorAll( "a" );
   for( i = 0; i < elementList.length ; i++ ){
     if(elementList[i].onmousedown) elementList[i].removeAttribute('onmousedown');
     if(elementList[i].onclick) elementList[i].removeAttribute('onclick');
   }
};