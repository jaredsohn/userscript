// ==UserScript==
// @name       Show Last Post/BMail
// @version    1.0
// @description  Shows the last post or bmail when replying.
// @match      http://bots4.net/forum/*
// @match		http://bots4.net/clans/forum/*
// @match		http://bots4.net/post-office/*
// @copyright  2013+, Clay Banger
// ==/UserScript==

if(window.location.href.substr(0, 28) == "http://bots4.net/post-office") {
    //user is at the post office
    if(window.location.href.substr(29, 5) == "reply") {
        //user is replying to a message
        //add the last message to the page
        var prevPost = localStorage['lastMessage'];
        var div = document.createElement('div');
        div.innerHTML = "<div id='prevPost'></div>";
        document.getElementById('content').insertBefore(div, document.getElementsByTagName('h2')[0].nextSibling);
        document.getElementById('prevPost').innerHTML = "<table><tr>" + prevPost + "</tr></table>";
    } else {
        //replace the Reply links
        var links = document.getElementsByTagName("a"), i;
        
        for(i=0;i<links.length;i++) {
            if(links[i].text == "Reply"){
                //apply my own function to run when the link is pressed
                links[i].addEventListener("click", function(event) { followLinkMessage();}, false);
                //remove the 'link' functionality from the link. Dirty, but works
                links[i].href = "#";
                links[i].setAttribute("onClick", "return false");
            }
        }
    }
    
} else {
    //probably at the forums
    if(window.location.href.substr(-5, 5) == "reply") {
        //user is replying to a thread
        //add the previous post to the page
        var prevPost = localStorage['lastPost'];
        var div = document.createElement('div');
        div.innerHTML = "<div id='prevPost'></div>";
        document.getElementById('content').insertBefore(div, document.getElementsByTagName('h2')[0].nextSibling);
        document.getElementById('prevPost').innerHTML = "<table><tr>" + prevPost + "</tr></table>";
    } else {
        //user is just browsing the forums
        //find a reply link if it exists.
        var links = document.getElementsByTagName("a"), i;
        
        for(i=0;i<links.length;i++) {
            if(links[i].text == "Reply To Thread"){
                //apply my own function to run when the link is pressed
                links[i].addEventListener("click", function(event) { followLink();}, false);
                //remove the 'link' functionality from the link. Dirty, but works
                links[i].href = "#";
                links[i].setAttribute("onClick", "return false");
            }
        }
    }
}


function followLink() {
    //save the last post
    var last = document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length-1];
    localStorage['lastPost'] = last.innerHTML;
    //and then head over to the reply page
    window.location.href = window.location + "/reply";
}

function followLinkMessage() {
    //save the last post
    var last = document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length-1];
    localStorage['lastMessage'] = last.innerHTML;
    //and then head over to the reply page
    window.location.href = "http://bots4.net/post-office/reply/" + window.location.href.substr(34);
}

