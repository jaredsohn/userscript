// ==UserScript==
// @name           Ynet Facebook Article Like-To-View Fix
// @description    Shows the Ynet facebook article content without clicking the "like" first. Good for users without Facebook
// @namespace      ynet.co.il
// @include        https://www.yedioth.co.il/FacebookApps/YnetApps/YnetLikeArticleNew/*
// @version        1.0
// @author         Gargamel64
// @grant          none
// @run-at         document-end
// ==/UserScript==

window.onload = function()
{
	document.getElementById("imgBeforeLike").style.display = "none";
	document.getElementsByClassName("fb-like-div")[0].style.display = "none";
	document.getElementById("mainDiv").style.overflow = "scroll";
};