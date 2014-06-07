// ==UserScript==
// @name          Sidebar sideblog expander
// @namespace     http://ee.walfas.org
// @description   The sideblog list is no longer a dropdown menu.
// @include       http://tumblr.com/*
// @include       http://www.tumblr.com/*
// ==/UserScript==

// Make the sideblogs visible without having to click
popover_blogs = document.getElementById("popover_blogs")
popover_blogs.style.display = "block"; 
popover_blogs.style.position = "static"; 

// Get the name and URL of the current blog
base = document.getElementById("popover_button_blogs");
links = base.getElementsByTagName("a");
blog_name = links[0].innerHTML;
blog_url = links[1].getAttribute("href");

// Clone topmost element and change the ID, so clicking it doesn't show/hide the sideblogs
visit_blog = base.cloneNode(true);
visit_blog.setAttribute("id","visitblog");

// Add the cloned element, hide the old one
base.parentNode.insertBefore(visit_blog,popover_blogs);
base.style.display = "none";

// Now, clicking the top element opens the current blog in a new window/tab
a = document.createElement("a");
visit_blog.appendChild(a);
div = document.createElement("div");
a.appendChild(div);
a.setAttribute("href",blog_url);
a.setAttribute("target","_blank");

// Tumblr has a really weird way of displaying those sidebar icons
a.style.backgroundImage = "url(/images/dashboard_controls/icons_sprite.png?4)";
a.style.backgroundPosition = "13px 12px";

// Set the text of the top element
div.setAttribute("class","hide_overflow");
div.innerHTML = "Open " + blog_name;
div.style.cursor = 'pointer';

visit_blog.removeChild(visit_blog.getElementsByTagName("div")[0]);
