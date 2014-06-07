// ==UserScript==
// @name           Tumblr - Hide Notices on secondary dash pages
// @namespace      http://nobodysuspectsthebutterfly.tumblr.com/
// @author         Mindset (http://nobodysuspectsthebutterfly.tumblr.com/)
// @description    Hides the new post notice on all Tumblr dash pages except /dashboard/, and also fixes the titles of those pages.
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/tagged/*
// @include        http://www.tumblr.com/like*
// @exclude        http://www.tumblr.com/dashboard
// @version        2.0
// ==/UserScript==

function hide_notices() {
    
    var newtitle = "";
    var path = location.pathname.split("/");
    if (path[1] == "tagged")
    {
        newtitle = decodeURI(path[2].replace(/\+/g," ").replace(/\-/g," ")) + " | Tumblr";
    }
    else if ( path[1] == "blog" && path[3] && isNaN(path[3]) )
    {
        newtitle = path[3].charAt(0).toUpperCase() + path[3].slice(1) + " | " + path[2] + " | Tumblr";
    }
    else if ( path[1] == "blog" )
    {
        newtitle = path[2] + " | Tumblr";
    }
    else if ( path[1].search("like") != -1 )
    {
        newtitle = "Likes | Tumblr";
    }
    else
    {
        newtitle = "Tumblr | " + path[2];
    } 

    document.title = newtitle;
    
    document.getElementById("new_post_notice_container").style.display = "none";
}

hide_notices();
setInterval(hide_notices, 1000);