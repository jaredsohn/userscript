// ==UserScript==
// @name           redditisfukkinsaved
// @namespace      saved
// @description    change reddit saved to fukkin saved
// @include        http://www.reddit.com/*


var list = document.getElementsByName('executed');
for (var item in list) {
  if (list[item].value == 'saved') {
    list[item].value = "fukkin' saved";
  }
}





// ==/UserScript==