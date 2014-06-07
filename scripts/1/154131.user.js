// Obliterate User userscript -- for when blocking isn't enough
//
// Ever encountered a user whose every post makes your blood pressure rise, who seems to 
// take a delight in ticking off everybody else, whose net contribution to the discussion
// is always remarkably negative?  If this sounds familiar, you may have explored the forum's 
// built-in blocking system.  Sadly, this only hides the contents of the offending user(s) posts --
// you're still (sadly) aware that they exist.
//
// This script attempts to remove all traces of a user from your sight.
//
// ==UserScript==
// @name       Obliterate User
// @version    0.6
// @description  Removes all trace of a user from the Wizards Online Community.
// @match      http://community.wizards.com/*
// ==/UserScript==



// The list of EVILDOERS to eliminate.  Spell and capitalize correctly!  Set to a reasonable default.
var usersToRemove = ["GM_Champion", "BankaiMastery"];

// The different forms of sanitization that can be used.
var removePosts = true,            // Remove posts by the VICIOUS MADMEN?
    hideThreads = true,            // Hide threads started by the CRUEL ONES?
    fixQuotes = true;              // Replace the contents of quotes of the WICKED?


// Real code starts here.


// Removes all posts by the WICKED ONES
function destroyPosts() {
     // Each post has three corresponding rows in the table that contains all the posts. Get all those rows.
    var postInfo = document.getElementsByClassName('onePostCreatorsTierInfo');
    var postContent = document.getElementsByClassName('onePostCreatorsTierBody');
    var quickReply = document.getElementsByClassName('mbQuickReplyRow');
    
    // Go through the posts to find ones authored by the CHILDREN OF EVIL
    for (var i = postContent.length-1; i >= 0; --i) {
        // Drill down into this post's content to pull out the author's username.
        var username = postContent[i].getElementsByClassName('mb_t_p_t_poster_username')[0].innerHTML;
        
        // There are newlines at the start and end of the username. Get rid of 'em.
        username = username.substring(1, username.length-1);
        
        if (usersToRemove.indexOf(username) != -1) {
            // OK, we're removing this post.
            postInfo[i].parentNode.removeChild(postInfo[i]);
            postContent[i].parentNode.removeChild(postContent[i]);
            quickReply[i].parentNode.removeChild(quickReply[i]);
        }
    }
}

// EXTERMINATES all in-post quotations by other users of things written by the ONES WHOSE NAMES SHALL NOT BE SPOKEN
// Well, actually it replaces the contents with "I'm a little teapot, short and stout // Here is my handle, here is my spout"
// so that it's clear that *something* was there before and the quoter isn't just going insane.
function fixBadQuotes() {
    var allQuotes = document.getElementsByTagName('blockquote');
    var replacement = document.createElement('p');
    replacement.innerHTML = 'I\'m a little teapot, short and stout / Here is my handle, here is my spout.';
    
    for (var i = 0; i < allQuotes.length; ++i) {
        var header = allQuotes[i].getElementsByClassName('mb-t-p-t-post-quote-header')[0];
        if (!header) continue;
         
        var userQuoted = header.getElementsByTagName('a')[0];
        if (userQuoted && usersToRemove.indexOf(userQuoted.innerHTML) != -1) {
            // remove the old content
            allQuotes[i].removeChild( allQuotes[i].getElementsByTagName('p')[0] );
            
            // add in our new content
            allQuotes[i].appendChild(replacement.cloneNode(true));
        }
    }
}


//  EXORCISES all threads started by the EVIL ONES
function removeThreads() {
    // Get the list of posts
    var allPosts = document.getElementsByClassName('mb_f_t_t_thread_bg');
    
    // Scan over the list to find the ones to DESTROY UTTERLY
    for (var i = allPosts.length - 1; i >= 0; --i) {
        // Writing this has taught me a new level of hate for web design in general.
        var startedBy = allPosts[i].getElementsByClassName('thread-creator-name')[0].innerHTML;
        
        // If needed, OBLITERATE!
        if (usersToRemove.indexOf(startedBy) != -1) {
            // OK, we're EXTERMINATING this one.  Move up a level to get the whole <tr>, then remove it.
            var tr = allPosts[i].parentNode;
            tr.parentNode.removeChild( tr );
        }
    }
}


// Comment/uncomment these lines to turn on/off different bits of functionality.
if (removePosts) destroyPosts();
if (hideThreads) removeThreads();
if (fixQuotes) fixBadQuotes();
