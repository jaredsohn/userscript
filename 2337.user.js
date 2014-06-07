// ==UserScript==
// @name            MozillaZine Forums - Find user posts
// @namespace       http://loucypher.wordpress.com/
// @description     Add links to find user"s posts
// @icon            https://raw.github.com/gist/1087992/icon.png
// @updateURL       https://userscripts.org/scripts/source/2337.meta.js
// @include         http://forums.mozillazine.org/viewtopic.php*
// ==/UserScript==

// Changelog:
// - 2012-07-04: Updated.
// - 2008-06-26: Updated to new forums
// - 2006-12-30: Fixed conflict with Force Wrap user script
// - 2006-09-26: Fixed error if the top poster on the page is guest
// - 2006-07-12: Fixed username with spaces


var users = document.evaluate("//div[@class='postprofile']/dt/a",
                              document, null, 6, null);

if (!users.snapshotLength) return;

var user, userId, userName, posts;
for (var i = 0; i < users.snapshotLength; i++) {
  user = users.snapshotItem(i);
  userName = user.textContent;
  userId = user.href.match(/\d+/);
  posts = document.evaluate("./parent::dt/parent::div/dd/strong[text()='Posts:']",
                            user, null, 9, null).singleNodeValue;
  makeLink(posts.parentNode, userName, userId);
}

function makeLink(aNode, aName, aId) {
  var link = document.createElement("a");
  link.title = "Search " + aName + "'s posts";
  link.href = "./search.php?sr=posts&author_id=" + aId;
  link.style.marginLeft = ".5em";

  var img = link.appendChild(document.createElement("img"));
  img.src = "./styles/prosilver/theme/images/icon_textbox_search.gif";
  img.style.verticalAlign = "middle";

  aNode.appendChild(link);
}