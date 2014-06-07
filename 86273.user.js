// ==UserScript==
// @name            OP_Highlight
// @namespace       http://doofer.waz.ere
// @description     gpforums.co.nz >> Highlight all posts made by the OP
// @include         http://www.gpforums.co.nz/thread*
// @include         http://www.gpforums.co.nz/showthread.php*
// @include        http://www.gpforums.co.nz/newreply.php*
// ==/UserScript==

//By Doofer, based on DeMifier by Cynos, based on Depalookaifier by Porges.

(function () {
HighlightOPPosts()
})();

var OP_Name = "";
var activateLink;
function HighlightOPPosts(){
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
		HighlightPosts();
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

function HighlightPosts()
{
	if(!OP_Name || OP_Name == "")
	{
		return "";
	}

	var isOPquery_string = "//div[@class = 'pUserName' and ((normalize-space(.)='" + OP_Name + "'))" + "]/../../..";
    

	var nodes = document.evaluate(isOPquery_string, document, null, 6, null);


	for (var i = 0; i < nodes.snapshotLength; ++i) {
		
			nodes.snapshotItem(i).style.bgcolor ="green";
		}
	}
}