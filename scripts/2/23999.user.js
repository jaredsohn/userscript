// ==UserScript==
// @name          Ninja Filter
// @namespace     
// @description   Filter Annoying Comments by Ninja
// @include       http://*israel-rollers.net*
// ==/UserScript==

(function() {

GM_addStyle( '.gncMyName { background: #ffa !important; color: maroon !important; font-weight: bold; }' );

var myTopics = document.evaluate( '//a[contains(@href,"Ninja")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < myTopics.snapshotLength; i++ )
{
    var nameLink = myTopics.snapshotItem( i );
    var row = nameLink.parentNode.parentNode.parentNode.parentNode;

    // Change attributes of topic row
    row.style.visibility = 'hidden'; //background = '#ddd';
}

// <a href="./memberlist.php?mode=viewprofile&u=28247" rel="nofollow">Bwanna</a>
var myNames = document.evaluate( '//a[contains(@href,"Ninja")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < myNames.snapshotLength; i++ )
{
    // Change attributes of your name
    var nameLink = myNames.snapshotItem( i );
    nameLink.setAttribute( "class", "gncMyName" );
}

})();
