// ==UserScript==
// @name          Mousehunt Redirector
// @description   Redirect to camp
// @run-at        document-start
// @include       http://www.mousehuntgame.com/login.php*
// @include       https://www.mousehuntgame.com/login.php
// @match	      https://www.mousehuntgame.com/login.php
// @version       1.0
// ==/UserScript==


window.location.assign("http://mousehuntgame.com/index.php");