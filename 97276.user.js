// ==UserScript==
// @name           JenkinsConsoleLink
// @namespace      http://userscripts.org/users/lechat
// @include        http://*/job/*
// ==/UserScript==

  if(unsafeWindow.console){
    var GM_log = unsafeWindow.console.log;
  }
  
  var jobs = Array.filter(document.getElementsByClassName("build-row no-wrap"), function (el) {
    try {
      var consoleLink = document.createElement("a");
      var lnk = "<a href=\"" + el.getElementsByClassName('tip')[0].attributes[0].textContent+"console\">Console</a>";
      el.children[2].innerHTML = lnk;
    } catch (e) {
      GM_log("Exception in JenkinsConsoleLink: " + e);
    }
  });
