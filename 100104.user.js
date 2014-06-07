// ==UserScript==
// @name           JenkinsCompareDiffLonSql
// @namespace      
// @description    script to replace the compare differences message of Jenkins by a table with the failed results.
// @include        http://lonsqld01:8080/*
// ==/UserScript==

var GM_Debug = 1;

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

if(!GM_Debug) {
   var GM_log = function(){};
}

GM_log('JenkinsCompareDiffLonSql loaded')

// fetch the tag containing the CDATA html table.
var failureNodes = document.getElementsByTagName('pre');
if (failureNodes[0] != undefined) 
{
		text = failureNodes[0].textContent;

    // remove the CDATA elements
	var text = text.replace("&lt;", "<");
	text = text.replace("&gt;", ">");
	text = text.replace("<![CDATA[", "");
	text = text.replace("]]>", "");

	failureNodes[0].textContent = text;
	GM_log(failureNodes[0].htmlContent);
   
	failureNodes[0].innerHTML = text;
	GM_log('replaced failureNodesCDATA with HTML');
}