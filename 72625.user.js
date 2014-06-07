// ==UserScript==
// @name           TVNETIL
// @namespace      tvnetil
// @include        http://www.tvnetil.net/review/*
// @description    Converts the release name into a clickable link.
// @version        1.6.2.1
// @date           2009-02-19
// @creator        Simplicity
// @moderator		27/03/10 Kendler - add support for multiple links.
// @moderator		21/04/10 Kendler - mulitple links always refefed to last link (fixed).
// @moderator		30/10/10 Kendler - Support for new tvnetil format (Oct 2010).
// @moderator		10/12/11 Kendler - Support for new tvnetil domain (.net).
// @moderator		23/02/12 Kendler - Support for new favezone.net
// @moderator	        12/10/12 Kendler - change favezone to favez0ne.net. remove old includes

// ==/UserScript==

var reviewLinkXPATH='//input[starts-with(@onclick, "this.focus(); this.select();")]';

var reviewLinks;
var reviewLink;
var reviewLinkText = new Array();
var forwardForm;
var LinkCount = 0;


reviewLinks = document.evaluate(reviewLinkXPATH,
    document,   null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,   null);
	
for ( var i=0 ; i < reviewLinks.snapshotLength; i++ )  
{
	if (reviewLinks.snapshotItem(i)!=null) 
	{
		reviewLinkText[LinkCount]=reviewLinks.snapshotItem(i).getAttribute("value");
//		reviewLinkText[LinkCount] = document.evaluate(reviewLinkXPATH+"/text()",
//			document,   null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
//		reviewLinkText[LinkCount] = reviewLinkText[LinkCount].snapshotItem(0).data;
		reviewLinkText[LinkCount] = reviewLinkText[LinkCount].replace(/^\s+|\s+$/g,""); //trim
		
		reviewLink=reviewLinks.snapshotItem(i);
//		reviewLink.removeAttribute("onclick");	
//		reviewLink.href="javascript:document.forms.frm"+LinkCount+".submit();";
		reviewLink.setAttribute("onclick","document.forms.frm"+LinkCount+".submit();");
		forwardForm = document.createElement("div");
		forwardForm.innerHTML = '<form name="frm'+LinkCount+'" method="POST" action="http://www.favez0ne.net/search.php">'+
			'<input type="hidden" name="srch" value='+reviewLinkText[LinkCount]+'>'+
			'</form>';
		document.body.insertBefore(forwardForm, document.body.firstChild);
		LinkCount=LinkCount+1;
	}
}