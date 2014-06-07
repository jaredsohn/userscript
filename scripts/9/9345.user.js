// ==UserScript==
// @name           phpBB Expand Posting Form
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Make message content and fonts on a phpBB posting form larger
// @include        */posting.php?*
// @include        */posting.php
// @include        */privmsg.php?*
// @include        */privmsg.php
// ==/UserScript==
/*
   about:config settings:
        - width         - width of subject and message content fields
        - height        - height of message content field
        - font_size     - size of font in subject and message content fields

   Updates:
   23-May-2007 - Added URLs for private message postings
*/

(function() {

var posts = document.evaluate(
    "//*[contains(@class, 'post')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( posts.snapshotLength == 0 )
    return;

var WIDTH = GM_getValue("width", "600px");
GM_setValue("width", WIDTH);

var HEIGHT = GM_getValue("height", "400px");
GM_setValue("height", HEIGHT);

var FONT_SIZE = GM_getValue("font_size", "");
GM_setValue("font_size", FONT_SIZE);

for ( var i = 0; i < posts.snapshotLength; i++ )
{
    var post = posts.snapshotItem( i );
    switch ( post.tagName )
    {
    case 'TEXTAREA':
        post.style.height = HEIGHT;
    case 'INPUT':
        post.style.width = WIDTH;
        if ( FONT_SIZE != "" )
            post.style.fontSize = FONT_SIZE;
        break;
    }
}

})();