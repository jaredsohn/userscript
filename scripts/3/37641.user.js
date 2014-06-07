// ==UserScript==
// @name           TVNETIL
// @namespace      tvnetil
// @include        http://www.tvnetil.co.il/review/*
// @include        http://www.tvnetil.com/review/*
// @description    Converts the release name into a clickable link.
// @version        1.5
// @date           2009-02-19
// @creator        Simplicity

// ==/UserScript==


var reviewLinkXPATH='//a[starts-with(@onclick, "copy_clip")]';

var reviewLink;
reviewLink = document.evaluate(reviewLinkXPATH,
    document,   null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,   null);

if (reviewLink.snapshotItem(0)!=null) {

	var reviewLinkText;
	reviewLinkText = document.evaluate(reviewLinkXPATH+"/text()",
	    document,   null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
	reviewLinkText = reviewLinkText.snapshotItem(0).data;
	reviewLinkText = reviewLinkText.replace(/^\s+|\s+$/g,""); //trim
	
	reviewLink=reviewLink.snapshotItem(0);
	reviewLink.removeAttribute("onclick");	
	reviewLink.href="javascript:document.forms.frm1.submit();";
	
	var forwardForm = document.createElement("div");
	forwardForm.innerHTML = '<form name="frm1" method="POST" action="http://www.fave.co.il/search.php">'+
		'<input type="hidden" name="srch" value='+reviewLinkText+'>'+
		'</form>';
	document.body.insertBefore(forwardForm, document.body.firstChild);
}
