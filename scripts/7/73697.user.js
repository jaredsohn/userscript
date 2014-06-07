// ==UserScript==
// @name           Eternal Sunshine
// @author         Karl Åström
// @version        0.4
// @description    removes status updates and comments from facebook for that one person you really don't want to see anything from.
// @include        http://www.facebook.com/*
// ==/UserScript==

var script_id      = 73697;
var script_version = '0.4';

var fb_profile_id="profile id here";

var a_match = 'a[contains(@href,"' + fb_profile_id + '")]'

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

function es_hide (thing){
	//thing.style.border="1px solid red"; //Debug version
	thing.style.display="none"; //Live version
}

function wipe_mind() {
	var comments = $x('//div[starts-with(@id,"comment")]/'+ a_match + '/..');
	var stories = $x('//div[starts-with(@id,"div_story")]/'+ a_match +'/..');
	var likes = $x('//div[contains(@class,"like_box")]//'+ a_match );
	var nodes = comments.concat(stories).concat(likes);	
	nodes.forEach(function (item) {es_hide(item)});
	

}

var timer;

wipe_mind();

window.addEventListener("load",  function () { timer = setTimeout( wipe_mind, 1000 ); }, true);
window.addEventListener('scroll', function () { clearTimeout( timer ); timer = setTimeout( wipe_mind, 500 ); }, true);