// ==UserScript==
// @name           TESTE
// @author         cefa
// @include        http*://*.orkut.*/Home?rl=t
// ==/UserScript==

var oF = (this.orkutFrame || window);
function lol(){
var msg="<br><a href='http://www.facebook.com'>FACEBOOK</a> |<a  href='http://www.myspace.com'> MY SPACE</a> | <a href='http://www.twitter.com'>TWITTER</a> | <a href='http://www.hi5.com'>HI5</a></br><b>VISITE A COMUNIDADE DH</b>";
var p=oF.document.getElementById('smShownLabel').innerHTML=[msg];
}lol();
