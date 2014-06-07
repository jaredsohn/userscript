// ==UserScript==
// @name           userstyles - add useful content
// @namespace      http://userstyles.org/users/3059
// @description    Add Blog and Forum links, and other tweaks, as I encounter problems Stylish can not solve.
// @include        http://userstyles.org/
// @include        http://www.userstyles.org/
// ==/UserScript==

var bloglink = document.createElement("a");
bloglink.setAttribute("id", "bloglink");
bloglink.setAttribute("href", "http://blog.userstyles.org");
var bloglink_text = document.createTextNode("Blog");
bloglink.appendChild(bloglink_text);

var forumlink = document.createElement("a");
forumlink.setAttribute("id", "forumlink");
forumlink.setAttribute("href", "http://userstyles.org/forum");
var forumlink_text = document.createTextNode("Forum");
forumlink.appendChild(forumlink_text);

var bloglink_li = document.createElement("li");
var forumlink_li = document.createElement("li");
bloglink_li.appendChild(bloglink);
forumlink_li.appendChild(forumlink);

var ul = document.getElementById("navigation"), li =
document.createElement("li");
ul.insertBefore(forumlink_li, ul.getElementsByTagName("li")[0]);
ul.insertBefore(bloglink_li, ul.getElementsByTagName("li")[0]);
