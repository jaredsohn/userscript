// ==UserScript==
// @author         Crend King
// @version        1.1.1
// @name           cnBeta 原始评论格式
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Show newlines in cnBeta comments.
// @include        http://www.cnbeta.com/articles/*
// @homepage       http://userscripts.org/scripts/show/40375
// @downloadURL    https://userscripts.org/scripts/source/40375.user.js
// @updateURL      https://userscripts.org/scripts/source/40375.meta.js
// ==/UserScript==

/*

version history

1.1.1 on 03/27/2009:
- Fix cnBeta's single line ! or ? issue.

1.1 on 01/14/2009:
- Isolate patch of comment from citations.

1.01 on 01/14/2009:
- Replace consecutive line breaks and <br> tags with one <br> tag

1.0 on 01/12/2009:
- Initial version.

*/


///// preference section /////

// interval to wait and check the completion of comment loading
const waitInteval = 1000;


///// code section /////

function Patch()
{
	if (document.getElementById("text_normal"))
	{
		// page is still loading, wait another 1 second and try again
		setTimeout(Patch, waitInteval);
		return;
	}
	
	// patch both normal comments and hot comments	
	var commentPaths = "//dd[@class='re_detail'] | //div[@class='fb_content']";
	var commentNodes = document.evaluate(commentPaths, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	// iterate from last to first
	// otherwise, the unpatched citation in later items will overwrite the patched comments in former items
	// because this is snapshot XPath
	for (var i = commentNodes.snapshotLength - 1; i >= 0; i--)
	{
		var cNode = commentNodes.snapshotItem(i);
		
		// by default, no citation part
		var citation = "", comment = cNode.innerHTML;
		var lastTag = cNode.innerHTML.lastIndexOf("</fieldset>");
		if (lastTag != -1)
		{
			// if </fieldset> presents, the comment starts after the last </fieldset>
			citation = cNode.innerHTML.substring(0, lastTag + 11);
			comment = cNode.innerHTML.substring(lastTag + 11);
		}
	
		// only patch comment part

		// trim left and right spaces
		comment = comment.replace(/(^\s*)|(\s*$)/g, "");

		// replace consecutive line breaks with <br>
		comment = comment.replace(/(\n|<br>)+/g, "<br>");

		// remove newline from lines with single character
		comment = comment.replace(/<br>(.)(?=<br>|$)/g, "$1");
		
		// concatenate citation and comment
		cNode.innerHTML = citation + comment;
	}
}

// wait specific time for Firefox to load the comment text, and then patch
setTimeout(Patch, waitInteval);