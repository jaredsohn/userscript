// ==UserScript==
// @id             wololo.net-28c4685b-8653-481b-b6a0-fdcbdee2a579@scriptish
// @name           /talk unread posts tracker
// @version        1.1
// @namespace      
// @author         Xian Nox
// @description    A simple script that checks for new posts on /talk
// @include        http://wololo.net/talk/search.php?search_id=unreadposts
// @run-at         document-end
// ==/UserScript==
if (document.getElementsByTagName("form").length > 3) 
    alert("New post");
else 
    setTimeout("window.location.reload()", 30000);