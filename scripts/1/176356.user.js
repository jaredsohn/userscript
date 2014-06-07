// ==UserScript==
// @name       S8 Update Redirect
// @namespace  benzeb666
// @version    1.0
// @description  Redirects from the update page
// @include      http://*.storm8.com/upgrade_latest.php*
// @copyright  2013
// ==/UserScript==

document.location = "http://" + String(location).split('/')[2].split('.')[0] + ".storm8.com/home.php";