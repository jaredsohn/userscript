// ==UserScript==
// @name        salamisushi rss/attom detector
// @namespace   salamisushi.go-here.nl
// @description detects feeds, has export to opml
// @include     *
// @version     1.01
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @downloadURL    https://userscripts.org/scripts/source/422410.user.js
// @updateURL      https://userscripts.org/scripts/source/422410.meta.js
// ==/UserScript==

salamisushi = function(e){
	arr = ( ( GM_getValue('tempx', '') + ',' + e ).split(',') );
	return Array.prototype.filter.call( arr, function ( elm, pos ) {
		return ( elm != '' && arr.indexOf( elm ) == pos )
})}
x = document.getElementsByTagName('link');
for (y in x) {
    if (x[y].rel == "alternate" && (x[y].type == "application/atom+xml" || x[y].type == "application/rss+xml")) {
        feeds = salamisushi( x[y].href );
        GM_setValue( 'tempx', feeds.join(',') )
}}
GM_registerMenuCommand("show feed list", function(){
	feeds = salamisushi('');
	document.getElementsByTagName('body')[0].innerHTML =
		'<form action="http://opml.go-here.nl/parse-to-opml.php" id="a354s5s54w5e54" method="post"><textarea form="a354s5s54w5e54" name="feeds" style="width:99%;height:500px;">' + 
		( feeds.join( '\n' ) ) + '</textarea><input type="submit" value="parse to OPML file">'
})
GM_registerMenuCommand("erase all feeds",function(){
	if ( confirm("\n\nAre you sure you want to:\n\n\n       erase all data? \n\n\n") ){
		GM_setValue('tempx', '')}
})