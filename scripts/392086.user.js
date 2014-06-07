// ==UserScript==
// @name        Reddit Report Spam Link
// @namespace   http://localhost
// @include     http://*.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

var comments = document.getElementsByClassName('entry');

//Loop through comments
for(var i=1;i<comments.length;i++) {

    //Get comment
    var comment = comments.item(i);

    //Get username from comment
    var tagline = comment.getElementsByClassName('tagline').item(0);
    var username = tagline.getElementsByClassName('author').item(0).innerHTML;

    //Get list of links below comment
    var list = comment.getElementsByClassName('flat-list').item(0);

    //Create spam link
    var link = document.createElement('a');
    link.href = 'http://www.reddit.com/r/reportthespammers/submit?title=overview+for+'+username+'&url='+encodeURIComponent('http://www.reddit.com/user/'+username);
    link.target = '_blank';
    link.appendChild(document.createTextNode('spam'));

    //Add spam link to list
    var listItem = document.createElement('li');
    listItem.appendChild(link);

    list.appendChild(listItem);
}
