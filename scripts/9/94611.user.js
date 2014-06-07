// ==UserScript==
// @name           CODHQ Last 10 Posts link for Users
// @namespace      Kastro187420
// @description    Adds a Button to the thread Page for each user to view their 10 most recent posts. Also adds an option in the Quick Links to view all of your own posts.
// @include        http://www.callofduty.com/board/viewtopic.php?f=*&t=*
// ==/UserScript==


var pbutton = document.getElementsByClassName("p_butons");
var user = document.getElementsByClassName("p_name");

for (var i=0;i<pbutton.length;i++) {
var regsearch = new RegExp(/\d+/g);
  pbutton[i].innerHTML = pbutton[i].innerHTML+"<br><a href=\"http://www.callofduty.com/profile/"+regsearch.exec(user[i].innerHTML)+"/forum-activity/\">Last 10 Posts</a>";
  }

// Self Search in "Quick Links"
var quicklinks = document.getElementsByTagName("ul");
quicklinks[4].innerHTML = quicklinks[4].innerHTML + "<li><a href=\"search.php?search_id=egosearch\">View All Your Posts</a></li>";

quicklinks[5].innerHTML = quicklinks[5].innerHTML + "<li><strong>Admin Posts</strong><ul><li><a href=\"http://www.callofduty.com/board/search.php?keywords=&terms=all&author=Vahn&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search\">Vahn</a></li><li><a href=\"http://www.callofduty.com/board/search.php?keywords=&terms=all&author=jd_2020&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search\">JD2020</a></li><li><a href=\"http://www.callofduty.com/board/search.php?keywords=&terms=all&author=cutpurse&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search\">Cutpurse</a></li></ul></li>";