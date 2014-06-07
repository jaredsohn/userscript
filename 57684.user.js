// ==UserScript==
// @name           Megastreamming
// @namespace      http://www.linkstreaming.com/
// @description    View megavideo on megastreming.org --- THAT'S REALLY REALLY REALLY REALLY ALPHA!!!
// @include        http://www.linkstreaming.com*
// ==/UserScript==

v = document.getElementsByTagName('a');
for(x in v){
if( v[x].href && v[x].href.match(/^http\:\/\/www\.megavideo\.com\/\?v\=.*$/gi) ){
    v[x].href = v[x].href.replace(/^(http\:\/\/www\.megavideo\.com\/\?v\=.*)$/gi, 'http://www.megastreaming.org/player/player2.php?q=$1');
	v[x].innerHTML += " <em>[megastreammed]<em>";
	console.log(v[x].innerHTML);
 }
}
