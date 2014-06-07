// ==UserScript==
// @name		Google Definition Consistentizer
// @namespace	http://www.citizenx.cx/greasemonkey/
// @description	Makes the definition links for Google search results consistent
// @include		*.google.*
// ==/UserScript==

(function()
{
	// get a list of possible links, which I'm presently getting by checking the title attribute
	var poss_deflinks = document.evaluate("//a[starts-with(@title, 'Look up')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// go through the list to get THE link and manipulate the DOM around that
	for (var i = 0; i < poss_deflinks.snapshotLength; i++)
	{
		var deflink = poss_deflinks.snapshotItem(i);
		
		// check to see if this is THE link, a link with only one child, a text node saying 'definition'
		if (   (deflink.childNodes.length == 1)
		    && (deflink.firstChild.nodeType == 3) // TEXT_NODE
		    && (deflink.firstChild.nodeValue == 'definition')
		   )
		{
			// this is the definition link
			// make a clone of the link, then we have to remove things around it
			// and make the search item itself the link
			
			var linktext = deflink.title.replace(/^Look up definition of /, '');
			    // this line is for Google groups, which is somewhat different from web and image search
			    linktext = linktext.replace(/^Look up (.*) on dictionary\.com$/, '$1');
			var text = document.createTextNode(linktext);
			var newlink = deflink.cloneNode(false);
			    newlink.style.fontWeight = 'bold';
			    newlink.appendChild(text);
			    
			// okay, I know this isn't the best way to do it, but a) it works,
			// and b) messing around with the DOM when these things have tenuous relationships is asking for just getting tired
			deflink.parentNode.replaceChild(newlink, deflink);  // replace the 'definition' link with this new one
			//newlink.parentNode.removeChild(newlink.nextSibling);      // remove ] after (which works because there's an empty <b></b> after the ])  NOTE: not for Google groups, so the next line comes in
			newlink.nextSibling.nodeValue = newlink.nextSibling.nodeValue.replace(/^\]/, '');  // remove ] after
			newlink.parentNode.removeChild(newlink.previousSibling);  // remove [ before
			newlink.parentNode.removeChild(newlink.previousSibling);  // remove search term before (which is enclosed in <b></b>, so one element no matter what)
			
			break;  // no need to check other possibilities, this was the one link
		}
	}
})();
