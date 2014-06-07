// ==UserScript==
// @name jenktocat
// @namespace http://www.example.com
// ==/UserScript==

(
  function() {
    var mainTable = document.getElementById("main-table");
    mainTable.setAttribute("style", "background-image: url(https://dl.dropbox.com/u/14595229/jenkins-octocat.png); background-repeat: no-repeat; background-position: bottom left;");
  }
)();