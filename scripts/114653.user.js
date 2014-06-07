// ==UserScript==
// @name           Hudson Console Icon
// @include        http://*
// ==/UserScript==

  Array.filter = function filter(array, test) {
    return Array.prototype.filter.call(array, test);
  }

  if(unsafeWindow.console) {
    var GM_log = unsafeWindow.console.log;
  }

  var jobs = Array.filter(document.getElementsByClassName("build-row no-wrap"), function (el) {
    try {
      var tip = el.getElementsByClassName('tip')[0].attributes[1].textContent
      var img = "<img title=\"Console output\" alt=\"Console output\" src=\"/static/dc668826/images/16x16/terminal.gif\" border=\"0\" />"
      var lnk = "<a href=\"" + tip +"console\">" + img + "</a>";
      el.children[2].innerHTML = lnk;
    } catch (e) {
      GM_log("Exception in HudsonConsoleLink: " + e);
    }
  });
