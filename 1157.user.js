//                                  _____                  | eBay Negs 1.0 
// File  Edit  View  Go  Bookmarks |Tools|_Help__________  | script for Greasemonkey
//                                 |                     | | leave comments at 
//                                 | Read Mail           | | bbs.shii.org
//                                 |---------------------|
//_______________________          | INSTALL USER SCRIPT | <-- click here to go!
//  Public Domain  2005  |         |_Manage_Scripts...___|                      



// Here's a useful function which you're free to steal.

function do_insert_html(doc, type, element, html) {
  var new_element = doc.createElement(type);
  new_element.innerHTML = html;
  element.parentNode.insertBefore(new_element, element.nextSibling);
};


thisLink = document.location.href;
ausdruck = /userid=([-\d\w\+\?\.\*\^\$\(\)[\]\{\}\|\\=~@]*)&?/;
ausdruck.exec(thisLink);
mainusername = RegExp.$1;


allLinks = document.evaluate('//a[contains(@href, "?ViewFeedback&") and not(contains(@href, "page="))]',
                   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
for (var i = 1; i < allLinks.snapshotLength; i = i + 2) {
// ^ The reason it hops around all funky is because there are TWO links to feedback for every user.
//   Feel free to replace it with
//        for (var i = 0; i < allLinks.snapshotLength; i++) {

    thisLink = allLinks.snapshotItem(i);
    ausdruck = /userid=([-\d\w\+\?\.\*\^\$\(\)\[\]\{\}\|\\=~@]*)&?/;
    ausdruck.exec(thisLink);
    uname = RegExp.$1;

    do_insert_html(document, "SPAN", thisLink, '<a href="http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=' + uname +
    '" title="Browse negative feedback"><img src="http://pics.ebaystatic.com/aw/pics/icon/iconNeg_16x16.gif" border="0"></a>');

}

allLinks = document.evaluate('//td//td//a[contains(@href, "ViewFeedbackMemberLeft")]',
                   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
thisLink = allLinks.snapshotItem(0);
if (thisLink) {
 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,
 '<table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="2"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td></tr><tr><td rowspan="2" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td valign="top" colspan="2" height="1" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td background="http://pics.ebaystatic.com/aw/pics/myebay/sliver_off_1x10.gif" rowspan="2" valign="top" align="right"><img src="http://pics.ebaystatic.com/aw/pics/myebay/taboff_10x10.gif" align="top" alt=" " title=""></td></tr><tr><td bgcolor="#eeeef8">&nbsp;</td><td align="center" bgcolor="#eeeef8" nowrap><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="2"><br><b><a href="http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=' + mainusername +'" style="color:#f00">Just Negatives</a></b><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="0"></td></tr></table>');
 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,
 '<img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="7" height="1">');
}

// ==UserScript==
// @name          eBay Negs 1.0
// @namespace     http://shii.org/tech/ebaynegs.user.js
// @description	  Links eBay users to their negative feedback using toolhaus.org.
// @include       http://*.ebay.*
// ==/UserScript==