// ==UserScript==
// @name        trello-activity-shortcut
// @namespace   http://userscripts.org/users/94437
// @description Show a Trello board's activity by pressing Alt+a
// @include     https://trello.com/board/*
// @run-at      document-end
// @grant       none
// @version     1
// ==/UserScript==

// Inject a function in the document, to get access to window... 
// http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
function exec(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}

exec(function () {
  if (!window.$) return ;
  var $ = window.$;
  var openBoardActivityList = function () {
    window.Controller.boardCurrent.view.viewAllActivityList();
  };

  $(function () {
    $(document).keydown(function (e) {
      if ( e.altKey && e.keyCode == 65 ) { // Alt+a
        e.preventDefault();
        openBoardActivityList();
      }
    });
  });
});