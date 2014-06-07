// ==UserScript==
// @name          RC Token Fetcher
// @version       0.0.4
// @description   Fetch Token from "Restaurant City: Collaborative Gifts Exchange"
// @namespace     http://userscripts.org/scripts/show/79901
// @include       *.facebook.com/group.php?gid=103742389664263*
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/hk/
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { jQ = unsafeWindow.jQuery.noConflict(true); letsJQuery(); }}GM_wait();

function letsJQuery() {

window.setTimeout(init,4000);
function init(){
(function($){
$(document).ready(function(){
var closePNG="<img id='cP' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ%2Bjcx2AAABFUlEQVQ4T2NgAIJYW9//ziJKRGGQWpAeBn810/%2B7Zs3%2B/%2BXyGaIwSC1IDwPIpg%2Bnj/x/Mn8SURikFqQHrPH9iYP/H87s%2Bd9XVPY/OCwNjEFsdD5IDUgtXOPbI3v/35vUAtYAAzADkPkgNSC1cI03Z/X93%2BGs87/W3w9FM7ImkBxIDUgthkZsmkE2wzRhaLw1d%2BL/XZ5GYFwXGAi29c6dO2AMYoPEYPIgtXAb7y6e8X9/iP3/hrAwFE3ImkFyIDUgtXCND1Yv%2BH80yR/DJnSbQWpAauEan2xZ/f9scfL/1qRUeHSA2Oh8kBqQWrjGF3u3/r/aWkYUBqkFawzQtPi/B5iM3hw7QBQGqQXpgadXYhM5OJ0CAQDEk%2Bc00fvy8AAAAABJRU5ErkJggg%3D%3D' ></img>";
var divstyle={'position':'absolute','top':'10%','left':'5%','padding':'1em','z-index':'999','border-radius':'15px','-webkit-border-radius':'15px','-moz-border-radius':'15px','border':'1em solid #EEB','background-color':'#EEB','color':'#222'};

$("<div id='token_fetcher'><h2 id='2h'><a>Token Fetcher</a> </h2><div id='token'></div></div>").prependTo("body");
$("#token_fetcher").css(divstyle);
$("#2h").click(function (e) {
if (e.target.id == "cP") {
	$("#token span.UIStory_Message").each(function () {
		var tt = $(this).text();
		var total = $("#token span.UIStory_Message:contains(" + tt + ")");
		if (total.length > 1) {
			var tl = total.length - 1;
			$("#token span.UIStory_Message:contains(" + tt + "):lt(" + tl + ")").remove();
		}
	});
	$("br+br").remove();return;
}
var r = $("#profile_stream_container .UIStory_Message:contains('api')").clone();
if(!r.length){r = $("#profile_stream_container .UIStory_Message:contains('aqi')").clone();}
if(!r.length){r = $("#profile_stream_container .UIStory_Message:contains('a')").clone();}
$("#token").html(r);
$("#token>span").after("<br>");
}).append(closePNG);
});})(jQ);}}