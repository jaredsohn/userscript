// ==UserScript==
// @name        Short Stories - laRepubblica
// @namespace   short
// @description permette di ottenere una stringa con tutti i download
// @grant       none
// @include     http://short-stories.it/download*
// @version     1
// ==/UserScript==

window.onload=function () {
   var elementList = [], urls = "";
   elementList = document.querySelectorAll( "div.down-file-icon a" );
   for( i = 0, element = 0 ; i < ( elementList.length-1 ) ; i++ )
      urls += '"' + elementList[i].href + '", ';
   urls += '"' + elementList[i].href + '"';
   var result = document.createElement( "div" );
   var content = document.createTextNode( urls );
   result.appendChild( content );
   result.style.color="white";
   result.style.backgroundColor="black";
   var top = document.getElementById("fb-root");
   document.body.insertBefore( result, top);
};
