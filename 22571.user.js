// ==UserScript==
// @name           Warside divs rearrangement
// @namespace      warside
// @include        http://warside.net/*
// ==/UserScript==

var mainBody = document.getElementById("ja-mainbody");
var content = document.getElementById("ja-contentwrap");
var leftColumn = document.getElementById("ja-col1");

if(mainBody != null) 
{	
	mainBody.removeChild(content);
	mainBody.appendChild(content);
}

var pageBody = document.getElementById("page-body");
var forumInnerElements = getElementsByClass("inner",pageBody,"div");

for each(forumMessage in forumInnerElements)
{
	var cornersTop = getElementsByClass("corners-top",forumMessage,"span")[0];
	var postBody = getElementsByClass("postbody",forumMessage,"div")[0];
	var postProfile = getElementsByClass("postprofile",forumMessage,"dl")[0];
	var back2top = getElementsByClass("back2top",forumMessage,"div")[0];
	var cornersBottom = getElementsByClass("corners-bottom",forumMessage,"span")[0];
	
	if(  cornersTop != null
	  && postBody != null
	  && postProfile != null
	  && back2top != null
	  && cornersBottom != null
	  )
	{
		forumMessage.removeChild(cornersTop);
		forumMessage.removeChild(postBody);
		forumMessage.removeChild(postProfile);
		forumMessage.removeChild(back2top);
		forumMessage.removeChild(cornersBottom);

		forumMessage.appendChild(cornersTop);
		forumMessage.appendChild(postProfile);
		forumMessage.appendChild(postBody);
		forumMessage.appendChild(back2top);
		forumMessage.appendChild(cornersBottom);
	}
}

var styleBlock = document.createElement('style');
var pageStyle = "";
pageStyle += "";
pageStyle += ".postprofile {";
pageStyle += "float:left !important;";
pageStyle += "clear:both !important;";
pageStyle += "display:inline !important;";
pageStyle += "}";
pageStyle += ".postbody {";
pageStyle += "float:right !important;";
pageStyle += "clear:none !important;";
pageStyle += "display:block !important;";
pageStyle += "}";
styleBlock.innerHTML = pageStyle;
document.getElementsByTagName("head")[0].appendChild(styleBlock);


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}