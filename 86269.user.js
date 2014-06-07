// ==UserScript==
// @name            OP_Only
// @namespace       http://doofer.waz.ere
// @description     Hides all posts except the OPs
// @include         http://www.gpforums.co.nz/thread*
// @include         http://www.gpforums.co.nz/showthread.php*
// @include        http://www.gpforums.co.nz/newreply.php*
// ==/UserScript==

//By Doofer, based on DeMifier by Cynos, based on Depalookaifier by Porges.

(function () {
var xquery = "//table[@class = 'postbit']";
 
/*------Init------*/
var nodes = document.evaluate(xquery, document, null, 7, null); 
var table = nodes.snapshotItem(0); //top post
activateLink = document.createElement("a");
activateLink.href = "#";
activateLink.addEventListener('click', function(event){ShowOnlyOPPosts()}, false);
activateLink.appendChild(document.createTextNode("Show only OP posts"));
activateLink.style.fontSize = "10px";
table.parentNode.insertBefore(activateLink, table);
})();

var OP_Name = "";
var activateLink;
function ShowOnlyOPPosts(){
	var isNotFirstPage = false;
	var url = window.location.href;
	var pageNumberString = "pagenumber=";
	var startIndex = url.indexOf(pageNumberString);
	if(startIndex > -1)
	{
		var endIndex = url.indexOf("&",startIndex);
		{
			endIndex = url.indexOf("#",startIndex);
		}
		if(endIndex == -1)
		{
			var pageNumber = url.substring(startIndex + pageNumberString.length);
		}
		else
		{
			var pageNumber = url.substring(startIndex+pageNumberString.length,endIndex);

		}
		pageNumber = parseInt(pageNumber);
		if(pageNumber > 1)
		{
			isNotFirstPage = true;
		}
	}

	if(isNotFirstPage)
	{
		var searchURL = window.location.href.replace(pageNumberString + pageNumber, pageNumberString + "1");
		//alert(searchURL);

		SetOPNameFromFirstPage(searchURL);
	}
	else
	{
		var OP_q_string = "//div[@class = 'pUserName']";
		OP_Name = document.evaluate(OP_q_string, document, null, 7, null).snapshotItem(0).innerHTML;
		RemovePosts();
	} 	
}

function SetOPNameFromFirstPage(searchurl)
{
var user_agent = 'Mozilla/4.0 Greasemonkey';

// go ask Tim what he would recommend based on the 
//   blog/article title
return GM_xmlhttpRequest({
    method: 'GET',
    url: searchurl,
    headers: {
     'User-agent': user_agent,
     'Accept': 'text/html',
  },
  onload: processFirstPageResponse
  });
}

function processFirstPageResponse(response)
{
	var doc = document.createElement('div');
	doc.innerHTML = response.responseText;

	var OP_q_string = "//div[@class = 'pUserName']";
	OP_Name = document.evaluate(OP_q_string, doc, null, 7, null).snapshotItem(0).innerHTML;
	RemovePosts();
}

function RemovePosts()
{
	if(!OP_Name || OP_Name == "")
	{
		return "";
	}

	var isNotOPquery_string = "//div[@class = 'pUserName' and ((normalize-space(.)!='" + OP_Name + "'))" + "]/../../..";

	var isOPquery_string = "//div[@class = 'pUserName' and ((normalize-space(.)='" + OP_Name + "'))" + "]/../../..";
    

	var nodes = document.evaluate(isNotOPquery_string , document, null, 6, null);
	var OPnodes = document.evaluate(isOPquery_string, document, null, 6, null);

	var hasOP = OPnodes.snapshotLength > 0;

	for (var i = 0; i < nodes.snapshotLength; ++i) {
		//var prev = nodes.snapshotItem(i).previousSibling;
		//while (prev.nodeType != 1) {
		//	prev = prev.previousSibling;
		//}
		//prev.appendChild(document.createTextNode("Show/hide post."));
		
		if(!hasOP && i+1 == nodes.snapshotLength)
		{
			nodes.snapshotItem(i).innerHTML = "No posts by " + OP_Name + " on this page.";
		}
		else
		{
			nodes.snapshotItem(i).style.display="none";
		}
	}
	activateLink.style.display="none";
}