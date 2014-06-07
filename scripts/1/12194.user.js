// ==UserScript==
// @name         Hatena::Idea Adding User Icon
// @namespace    http://d.hatena.ne.jp/Yuichirou/
// @description  Add user icons before user names in Hatena::Idea
// @include      http://i.hatena.ne.jp/*
// ==/UserScript==

// Version 1.01 (Released at 2006-11-12)

var links = document.getElementById("container").getElementsByTagName("a");

var username, icon;
for (var i = 0; i < links.length; i++) {
  if (links[i].href.substr(-1) != "/") continue;
  if (links[i].parentNode.tagName == "H1") continue;
  if (links[i].parentNode.id == "breadcrumbs") continue;

  if (links[i].href.match(/i\.hatena\.ne\.jp\/(.+)\//)) {
    username = RegExp.$1;
    if (username == "idea" || username == "t") continue;
    if (links[i].innerHTML == username.substring(0, 5) + "..") {
      links[i].innerHTML = username;
      // links[i].title = username;
    }

    icon = document.createElement("img");
    icon.src = 'http://www.hatena.ne.jp/users/' + username.substring(0, 2) + '/'
                + username + '/profile_s.gif';
    icon.width = icon.height = 16;
    icon.style.verticalAlign = "bottom";
    links[i].insertBefore(icon, links[i].firstChild);
    icon = null;
  }
}
