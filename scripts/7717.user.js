// ==UserScript== 
// @name           nukilxor
// @namespace      
// @description    
// @include        http://ilx.wh3rd.net/*
// @include        http://ilx.p3r.net/* 
// @include        http://www.ilxor.com:8080/ILX/* 
// ==/UserScript==  

// Put the names of boring jerkwads in this array like so - just cut and paste:

var jerks= ['',''];

// And that's it for configuration.

for(var p = 0; p < jerks.length; p++)

{
var jerk = jerks[p];
var posts;
posts = document.evaluate("//div/*[@class='name'][a='" + jerk + "']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

//GM_log('number of posts by ' + jerk + ': ' + posts.snapshotLength);

for (var i = 0; i < posts.snapshotLength; i++)
	{
	var thisLink = posts.snapshotItem(i);
	thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);
	}
}