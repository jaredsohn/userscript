// ==UserScript==
// @name           TDWTF Hidden Goodies
// @namespace      http://miff.furopolis.org/
// @description    Show hidden links and comments in TDWTF articles.
// @include        http://thedailywtf.com/Articles/*
// ==/UserScript==

/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.


*/


var articles = document.getElementsByClassName('ArticleBody');
for (var i in articles){
	processNode(articles[i]);
}

function processNode(node){
	// This would probably be more efficant to do with XPath, but hey, it works.
	if (node.nodeType == 1){
		var childNodes = node.childNodes;
		for (var i = 0; i < childNodes.length; i++){
			processNode(childNodes[i]);
		}
		
		if (node.tagName == "a" || node.getAttribute("onclick") != null){
			node.style.color = "teal";
			node.style.borderBottom = "1px dotted teal";
			node.style.cursor = "pointer";
		}
	} else if (node.nodeType == 8){
		var span = document.createElement("span");
		span.textContent = "<!--" + node.data + "-->";
		span.setAttribute("style", "font-style: italic; color: green;");
		node.parentNode.insertBefore(span, node);
		node.parentNode.removeChild(node);
	}
}
