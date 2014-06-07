// ==UserScript==
// @name           BenHeck Chat
// @namespace      Electric Rain
// @description    BenHeck Forum Chat! This script "links" the forums to my server, where I host a custom-built chatroom script.
// @include http://forums.benheck.com/*
// ==/UserScript==

var username = null;
var images = document.getElementsByTagName('img');
for (properImage = 0; properImage < images.length; properImage++) {
  if(images[properImage].alt.match("Log out") == "Log out") {
    username = images[properImage].alt.slice(images[properImage].alt.indexOf("[") + 2, images[properImage].alt.indexOf("]") - 1);
  }
}

var links = document.getElementsByTagName('a');
var chatSpan = document.createElement('span');
for (properLink = 0; properLink < links.length; properLink++) {
  if(links[properLink].innerHTML.match("Usergroups") == "Usergroups" && username != null) {
    links[properLink].parentNode.insertBefore(chatSpan,links[properLink].nextSibling)
  }
}
chatSpan.innerHTML = "&nbsp;&nbsp;&nbsp;<a href='http://www.tredonox.com/benheckchat/check.php?username=" + username + "' class='mainmenu'><img src='http://www.tredonox.com/benheckchat/images/icon_chat.gif' alt='Chat' border='0' height='13' hspace='3' width='12'>Chat!</a></span>";