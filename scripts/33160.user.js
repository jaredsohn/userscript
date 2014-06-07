// ==UserScript==
// @name           Moogle Search
// @namespace      moogsearch
// @description    Moogle Search
// @include        *.google.*
// @exclude        *mail.google.*
// ==/UserScript==

//alert("control reaches this script");
var back = document.getElementsByTagName('img');
var bg = back[0];if (bg!=null){ //alert("control reaches here");
bg.setAttribute('src',"http://img295.imageshack.us/img295/1707/mooglect1.jpg");
}
//alert("control reaches out");