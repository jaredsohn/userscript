// Ignore Madridista.dk user userscript
//
// Removes postings made by blacklisted users.
//
// Based on the Obliterate User script by Blasir (http://userscripts.org/scripts/review/154131)
//
// ==UserScript==
// @name       Ignore Madridista.dk users
// @version    0.1
// @description  Removes threads and postings made by blacklisted users
// @match      http://madridista.dk/index.php/forum/*
// @match      http://www.madridista.dk/index.php/forum/*
// ==/UserScript==

// The list of users to ignore.  Spell and capitalize correctly!  Set to a reasonable default.
var usersToRemove = ["Real-Laudrup"];

// The different forms of sanitization that can be used.
var removePosts = true,           // Remove posts by the ignored users?
    hideThreads = true;           // Hide threads started by the ignored users?


// Real code starts here.

// Removes all posts by the ignored users
function destroyPosts() {
	// Each post is contained in a table. Get all these tables
    var postFull = document.getElementsByClassName('kmsg');
    
    // Go through the posts to find ones authored by the CHILDREN OF EVIL
    for (var i = postFull.length-1; i >= 0; --i) {
        // Drill down into this post's content to pull out the author's username.
        var username = postFull[i].getElementsByClassName('kwho-user')[0].innerHTML;
        
        if (usersToRemove.indexOf(username) != -1) {
            // OK, we're removing this post.
            postFull[i].parentNode.removeChild(postFull[i]);
        }
    }
}

//  Removes all threads started by the ignored users
function removeThreads() {
    // Get the list of posts
    var threadTable = document.getElementsByClassName('kblock kflat');
    var allPosts = document.getElementsByClassName('kcol-mid kcol-ktopictitle');
    // Scan over the list to find the ones to remove
    for (var i = allPosts.length - 1; i >= 0; --i) {
        if (allPosts[i].getElementsByClassName('kwho-user').length > 0) {
	        var startedBy = allPosts[i].getElementsByClassName('kwho-user')[0].innerHTML;
	        if (usersToRemove.indexOf(startedBy) != -1) {
                // Remove this thread
				var thread = allPosts[i].getElementsByClassName('kwho-user')[0].parentNode.parentNode.parentNode.parentNode;
                thread.parentNode.removeChild(thread);
			}
		}
	}
}

// Comment/uncomment these lines to turn on/off different bits of functionality.
if (removePosts) destroyPosts();
if (hideThreads) removeThreads();
