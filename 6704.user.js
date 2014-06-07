// ==UserScript==
// @name         FOS Post Filter
// @description  Filters posts from a specified list of users
// ==/UserScript==

// version 0.1
// Special thanks to all the other scripts I stole code from

// ------------------------------------------------------------------------
// Add users to this list. Be sure to put the user names in double quotes
// and to separate each user name by a comma. Also keep the ( and ); intact
var filteredUsers = new Array (		
    "User1",
	"User2",
	"User3");

// ------------------------------------------------------------------------
var allPosts = document.evaluate(
    "//span[@class='title']",
    document.body,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var results = new Array( allPosts.snapshotLength );
for(var x=0; x<results.length; x++) {
	results[x] = allPosts.snapshotItem(x);
}
for (var i=0; i < results.length; i=i+2) {
    var post = results[i];
	var replacePost = results[i+1];
    for (var j=0; j < filteredUsers.length; ++j) {
        var user = filteredUsers[j].toLowerCase();
        if (post.innerHTML.match(user)) {
			replacePost = replacePost.parentNode;
            replacePost.parentNode.replaceChild(document.createTextNode("mmmm mmm MMMMM!!"), replacePost);
            break;
        }
    }
}