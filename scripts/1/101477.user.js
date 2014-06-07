// ==UserScript==
// @name Dink Network User Posts
// @description Adds a link on a Dink Network user's profile page that will take you to the search results for posts by that user.
// @version 1.1
// @include http://*dinknetwork.com/user/*
// @include http://*dinknetwork.com/display.cgi?action=User&*
// ==/UserScript==

// Get all the images so we can look for the spot to insert the Posts link.
var images = document.getElementsByTagName('img');

for (i = 0; i < images.length; i++) {

    // See if we've found the image in the paragraph in which to insert the link.
    // The image next to the Private Message link will be on every profile page, I think.
    if (images[i].src != "http://www.dinknetwork.com/images/im/msg.gif") continue;

    // Get the username by finding the username link at the top of the profile. 
    // We could also get it by looking at the URL, but I thought of this first.
    var username;
    var usernames = document.getElementsByClassName('username');
    for (j = 0; j < usernames.length; j++) {
        if (usernames[j].tagName == "a" || usernames[j].tagName == "A") {
            username = usernames[j].textContent;
            break;
        }
    }

    // Create the element that will contain the Posts link.
    var e = document.createElement('span');

    // The old link was a form submit button based on the search page form, 
    // but then I found out the URL parameters.
        // var innerHTML = '<form method="POST" action="http://www.dinknetwork.com/forum.cgi?SearchResults=1" style="margin-top: 1em">';
        // innerHTML += '<input type="hidden" name="Username" value="' + username + '">';
        // innerHTML += '<input type="submit" value="Posts" name="Submit"></form>';

    // Create the link HTML.
    // Give the link a left margin of 22px to align the text nicely with the other links in that section. 
    // Maybe someday we'll have an icon for it.
    // Add a br at the end, the same way the other links are separated.
    var innerHTML = '<a style="margin-left: 22px;" ';
    innerHTML    += 'href="http://www.dinknetwork.com/forum.cgi?SearchResults=1&Username=';
    innerHTML    += username;
    innerHTML    += '&ForumID=&Subject=&Message=&Page=0">Posts</a><br />';

    e.innerHTML = innerHTML;

    // Get the p element to insert the Posts link into.
        // var grandparent = parent.parentNode;  // for the old location
    var parent = images[i].parentNode;

    // Insert the link as the first element of the paragraph.
        // grandparent.insertBefore(e, parent);  // the old location
    parent.insertBefore(e, parent.firstChild);
}