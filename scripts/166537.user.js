// ==UserScript==
// @name        RemoveYoutubeBanner
// @namespace   http://userscripts.org/scripts/show/166537
// @include     http://www.youtube.com/
// @version     1.1
// @grant       None
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function($) {
setInterval(function(){
setTimeout(function(){
if((document.location.href).match( '(http://)?www.youtube.com/.*')){
if($('#ad_creative_1')){
		$('#ad_creative_1').hidden=true &&  $('#ad_creative_1').hide();
}
}
}, 1000);
}, 1000);
});