// ==UserScript==
// @name          Leo Vote
// @namespace      
// @description    
// @include        http://www.real-parenting.com/*
// @author		   kot
// ==/UserScript==

var voteurl = "http://www.real-parenting.com/smilekidsY2/SmileKids.aspx?Picid=75&Pic=7%2fimgResize%2fSmilkids-75.JPG&month=7";

if (document.location.href == voteurl){
	window.setTimeout(
		function()
		{
			document.getElementById("ctl00_ContentPlaceHolder1_Vote").click();
		} ,
	1000 
	);
}