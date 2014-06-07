// ==UserScript==
// @name          Digg to Yahoo! MyWeb 2.0
// @namespace     http://minwoo.blogsite.org
// @description	  Add "Save to MyWeb" link to digg entry. Inspired by "delicious >> my web" script by Jason Rhyley.
// @include       http://digg.com/*
// ==/UserScript==

function gm_xpath(what, where) {
    return document.evaluate(what,where,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
}

    allH3 = gm_xpath("//h3", document);
    allDesc = gm_xpath("//p[@class='news-submitted']",document);
    allMeta = gm_xpath("//div[@class='news-details']",document);

    for (i = 0; i < allH3.snapshotLength; i++) {
	if (allH3.snapshotItem(i).firstChild.nodeType == 3) {
            theURL = allH3.snapshotItem(i).firstChild.nextSibling.href;
       	    theTitle = allH3.snapshotItem(i).firstChild.nextSibling.innerHTML;
            theDesc = allDesc.snapshotItem(i).nextSibling.nextSibling.innerHTML;
        } else {
            theURL = allH3.snapshotItem(i).firstChild.href;
       	    theTitle = allH3.snapshotItem(i).firstChild.innerHTML;
            theDesc = allDesc.snapshotItem(i).nextSibling.innerHTML;
        }
	meta = allMeta.snapshotItem(i);
	yURL = 'http://myweb2.search.yahoo.com/myresults/bookmarklet?' 
	    + 'u='  + escape(theURL)
	    + '&t=' + escape(theTitle)
	    + '&d=' + escape(theDesc);

        yLink = '<a class="tool" title="Save this to Yahoo! My Web" href="javascript:void window.open(\''+yURL+'\',\'popup\',\'width=520px,height=420px,status=0,location=0,resizable=1,scrollbars=1,left=100,top=50\',0);">Save to Y! MyWeb</a> ';
	meta.innerHTML = meta.innerHTML + yLink;
    }
