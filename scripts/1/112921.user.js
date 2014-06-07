// ==UserScript==
// @name       BrowserShots.org Auto Extender
// @namespace  http://browsershots.org/http://
// @version    1.0
// @description  Automatically clicks the extend button on BrowserShots.org
// @include    http://browsershots.org/http://*
// @copyright  MIT License
// ==/UserScript==

$(document).ready(function() {
  $('.status_box .status_button.extend').click();
});