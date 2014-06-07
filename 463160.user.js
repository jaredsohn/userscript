// ==UserScript==
// @name          Silence
// @namespace     themacmini09
// @description   Stop themacmini09 from making fun of us
// @include       http://tnchat.herokuapp.com/*
// @grant         none
// ==/UserScript==

main = function(){
$("div.disconnect:contains('themacmini09')").remove();
$("div.connect:contains('themacmini09')").remove();
setTimeout(main,3000);
}

main();