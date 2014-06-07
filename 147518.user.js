// ==UserScript==
// @name       Kickstarter Follow Backed Projects
// @namespace  http://userscripts.org/users/58147
// @version    0.1
// @description  Automatically clicks the "Remind Me" button on projects you've backed.
// @match      http://www.kickstarter.com/projects/*
// @include    http://www.kickstarter.com/projects/*
// @copyright  2012+, Clarence Risher sparr0@gmail.com, CC-BY-SA || CC-BY-NC
// ==/UserScript==

if(document.getElementById("button-manage-pledge")) {
    var followbutton=document.getElementById("following-widget").getElementsByTagName("A").item(0);
    if(followbutton.href.substr(-8)!="unfollow")
        followbutton.click();
}
