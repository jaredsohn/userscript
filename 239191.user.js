// Bye Patty Hernandez (EDITED VERSION FOR UPCOMING VERSION OF KINJA Feb 18, 2014)
// CREATED Jan 7, 2014
// This script removes posts on Kotaku by Patricia Hernandez
// 	IDK if I missed something and it doesn't remove some posts, or if Kotaku/Gawker changed its site format,
//  or some other **** breaks this script. If so, it ain't my problem, yo. <insert reggieshrug.jpg here>
//
// This is my opinion and it's at least partially shared by many intelligent, reasonable, real people online:
// I appreciate what Patricia does in providing a much-needed and underrepresented perspective on certain social groups in gaming.
// However, her posting habits are egregious, her posts are invasive and they offend my critical sensibilities.
// The privilege she is given is excessive given the quality of her posts.
// Regardless of my overall opinion of Kotaku as a gaming site, journalism outlet, or lifestyle site, this script removes Patricia's posts. 
// (For fun, imagine the above 5 lines as an Ace Attorney-style cross-examiniation.)
//
// She hasn't posted a link to Gizoogle.net titled "This Awesome Website Will Make You Sound Gangsta" yet, so at least she has that going for her.
//
// ==UserScript==
// @name          Bye Patty Hernandez
// @description   Removes Kotaku posts by Patricia Hernandez
// @include       https://www.kotaku.com/*
// @include       http://www.kotaku.com/*
// @include       https://kotaku.com/*
// @include       http://kotaku.com/*
// @exclude     
// ==/UserScript==
//
// --------------------------------------------------------------------

var maincontainer = document.querySelectorAll("div.columns,div.twelve,div.js_pagercontainer");
var nodeList = document.querySelectorAll("span.meta-info,span.display-name,span.strong");
for (var i = 0, length = nodeList.length; i < length; i++) {
	if (nodeList[i].childNodes[0].innerHTML == "Patricia Hernandez" || nodeList[i].childNodes[0].href == "http://patriciahernandez.kinja.com/")
	//else if (nodeList[i].childNodes[0].innerHTML == "Steven Tortilla" || nodeList[i].childNodes[0].href == "http://whateverthefck.kinja.com/")
	//else if (nodeList[i].childNodes[0].innerHTML == "The Black Guy" || nodeList[i].childNodes[0].href == "http://evantheblackguy.kinja.com/")
	//else if (nodeList[i].childNodes[0].innerHTML == "The Persian Chick" || nodeList[i].childNodes[0].href == "http://tinaamilliamilliamilli.kinja.com/")
	//else if (nodeList[i].childNodes[0].innerHTML == "Guy who lives in Japan" || nodeList[i].childNodes[0].href == "http://brianasscraft.kinja.com/")
	//else if (nodeList[i].childNodes[0].innerHTML == "Subpar Deals" || nodeList[i].childNodes[0].href == "http://somethingroberts.kinja.com/")
	{
	var PattyArticle = nodeList[i].parentNode.parentNode.parentNode.parentNode.parentNode; //additional parent node removed for new kotaku site
	PattyArticle.parentNode.removeChild(PattyArticle);
	}
}