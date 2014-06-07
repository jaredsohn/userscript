// ==UserScript==
// @name           pixiv の評価を隠す
// @namespace      Hide pixiv rating
// @description    pixiv の評価を気にしなくてもいいように隠します。若干タイムラグがあります。
// @include        http://www.pixiv.net/*
// ==/UserScript==

(function(){
// setTimeout(function(){

var follower = document.evaluate(".//*[@id='page-mypage']/div[contains(@class, 'ui-layout-west')]/aside[contains(@class, 'user-list')]/div[contains(@class, 'related')]",
	document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;


	if(follower) follower.style.display = "none";//follower.innerHTML = "";//

	var rating = document.evaluate(".//div[contains(@class, 'user-reaction')]",
	document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;


	if(rating) rating.style.display = "none";//follower.innerHTML = "";//
	
	/*
var S = document.createElement('style');
S.type = 'text/css';
S.innerHTML = ".bookmark-count{visibility: hidden} p.followers{visibility: hidden}"
var head = document.getElementsByTagName('head');
head = head[0]
head.appendChild(S);
*/


/*
var rating = document.getElementById("rating");
if(rating) rating.style.visibility = "hidden";
*/
//}, 1000);
})();
