// ==UserScript==
// @name             codeforces-hide-tags
// @namespace        http://userscripts.org/users/dorserg
// @include          http://codeforces.com/contest/*/problem/*
// ==/UserScript==

var hide = function(elem) {
  var wasHidden = (elem.style.display === "none");
  if (wasHidden) elem.style.display = "block"; else elem.style.display = "none"; 
  return !wasHidden;
}

var tags = document.getElementsByClassName("roundbox sidebox")[3];

var a = document.createElement("a");
a.innerHTML = "Toggle tags <br/> <br/>";
a.href = "#";
a.onclick = function() { hide(tags); return false; }

tags.parentNode.insertBefore(a, tags);

a.click();
