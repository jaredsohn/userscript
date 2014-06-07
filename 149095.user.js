
// ==UserScript==
// @name        Remove payment question
// @namespace   https://www.producteev.com/dashboard.php?id_dashboard=701962
// @include     https://www.producteev.com/dashboard.php?id_dashboard=701962
// @version     1
// ==/UserScript==
var myTextField = document.getElementById('dashboard-is-blocked');
myTextField.parentNode.removeChild(myTextField);
