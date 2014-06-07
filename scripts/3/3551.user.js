// Ninan v3.newzbin.com Oneclick v1.00
// (c) 2006, Ninan Developers, edited by George Leontiev
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Work with Firefox 1.5 final and Greasemonkey 0.6.4+
// --------------------------------------------------------------------
// ==UserScript==
// @name          NINAN OneClick
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Oneclick the download and it is added to your Ninan 
// @include       http://v3.www.newzbin.com/*
// @include	  http://www.newzxxx.com/*
// ==/UserScript==
(function() {
var post_url,anchors,anchor,url,exist,isComment,postid,new_url,new_anchor, ninanurl;
		ninanurl = "http://localhost:9090/ninan/secure/download.do?postId=";
        post_url = "/browse/post/";
        anchors = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

        for (var i=0; i<anchors.snapshotLength; i++) {
            anchor = anchors.snapshotItem(i);
            url = anchor.href;
            exist = url.indexOf(post_url);
	    isComment = url.indexOf("#C");
            if (exist != -1 && isComment == -1) {
                postid = url.substring(exist + post_url.length,url.length-1);
                anchor.parentNode.innerHTML = anchor.parentNode.innerHTML + ' <b>[<a target="header" href="' + ninanurl + postid + '>Download</a>]</b>';
            }
	    exist = url.indexOf("/r/?");
	    if (exist != -1) {
	        anchor.target = "_blank"; 
	    }
        }
    
})()