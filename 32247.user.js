// ==UserScript==
// @name           probadoquest2
// @namespace      probadoquest2
// @description    probadoquest2
// @include        http://apps.facebook.com/dragonwars/jobs.php
// ==/UserScript==

var reload=true;
Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="5") {input.click();reload=false;}});
if (reload) document.location.reload(true); 

