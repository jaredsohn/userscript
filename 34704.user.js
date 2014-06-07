// ==UserScript==
// @name           Haiku Remove Follower
// @namespace      www.akatiron.com
// @include        http://h.hatena.ne.jp/*
// @include        http://h.hatena.com/*
// ==/UserScript==

//
// Add invalid users
//
var invalid_users = [
    'akatiron',
];

//
// Do not edit the following.
//

function xpath( context, query ) {
    return document.evaluate(
        query, context, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
}

function hidden_invalid_users() {
    var users_node
	= xpath( document, "//ul[@class='list-user']" ).snapshotItem( 0 );
    if ( users_node == null ) {
	return;
    }

    for ( var i = 0; i < invalid_users.length; i++ ) {
	var user_node = xpath( users_node,
	    ".//a[@href='/" + invalid_users[i] + "/']/../.." ).snapshotItem( 0 );
	if ( user_node ) {
	    user_node.style.display = 'none';
	}
    }
}

hidden_invalid_users()
unsafeWindow.Hatena.Haiku.Pager.addEventListener('loadedEntries', function(){
  hidden_invalid_users()
})
