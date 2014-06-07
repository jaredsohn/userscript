// ==UserScript==
// @name           YouTube New Layout
// @namespace      Oatzy
// @description    Forces YouTube to load with the new layout 
//Please Note this is not my work i have just fixed a small bug that it had if you used //http://youtube.com instead of http://www.youtube.com
// Youtube has Since Moved to the New Layout as Defualt so this is no longer needed
// @include         http://www.youtube.com/watch?v=*
// @include         http://youtube.com/watch?v=*
// @exclude         http://www.youtube.com/watch?v=*&amp;v3
// @exclude         http://youtube.com/watch?v=*&amp;v3
// ==/UserScript==

(function() {
window.location.href.replace(new RegExp(/&v2#?$/), '') + '&v3';
return false;
})()