// ==UserScript==
// @name          Reply to Comment
// @namespace     http://www.webality.co.uk/
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @description   Adds a reply to Comment link
// @exclude
// ==/UserScript==
(function() {
    
var allLinks, thisLink, imgReg, nbsp, currentInner, newBR, newBR2, newA, linkRewrite, linkComment, friendID;
allLinks = document.evaluate(
    '//a[not(@id)]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink

    //I am so shit with regular expressions =\ I will use lots of split stuff instead xD
    //var imgReg = new RegExp("<img/?\w+\s+[^>].*?>","i");
    //if(thisLink.innerHTML.search(imgReg) != -1) {

    //Lets rewrite this URL using the friendID so we can comment them
    linkRewrite = thisLink.href.split("friendid=");
	
    friendID = linkRewrite[1];

    linkComment = "http://comments.myspace.com/index.cfm?fuseaction=user&circuitaction=viewProfile_commentForm&friendID=" + friendID;
    
    
    currentInner = thisLink.innerHTML.split("http://myspace-");

    currentInner = currentInner[0].split("  <");
    if(currentInner[1] == "img src=\"" && linkRewrite[1]) {
       newBR = document.createElement('br');
       newBR2 = document.createElement('br');
       newA = document.createElement('a');
       thisLink.parentNode.insertBefore(newA, thisLink.nextSibling);
       newA.innerHTML = 'Reply to User';
       newA.href = linkComment;
       newA.parentNode.insertBefore(newBR, newA);
	
       newA.parentNode.insertBefore(newBR2, newA);
    }
}

})();
