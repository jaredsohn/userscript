// ==UserScript==
// @name           Post Permalink
// @namespace      Forest21
// @include        http://mbd.scout.com/mb.aspx?s=*
// ==/UserScript==

window.setTimeout(function(){


var cells = document.getElementById("forumstable").getElementsByTagName("td");

for(var i=0; i<cells.length; i++)
{
	if(cells[i].id.indexOf("MS_") != -1)
	{
		var postID = cells[i].id.substring(3);
		var url = location.href;
		
		if(url.indexOf("&stm=") == -1)
			url += "&stm=" + postID;
		else
			url = url.substring(0,url.indexOf("&stm=")) + "&stm=" + postID;
		
		var row = cells[i].parentNode; 
		var linkRow = row.nextSibling;

		while(linkRow.nodeType != 1)
			linkRow = linkRow.nextSibling;

		var links = linkRow.getElementsByTagName("span")[0];
		links.innerHTML += " | ";
		
		var permalink = document.createElement("a");
		permalink.href = url;
		permalink.title = "Link to this post";
		permalink.innerHTML = "Permalink"
		links.appendChild(permalink);
	}
}


},1000);