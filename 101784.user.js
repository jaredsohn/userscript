(function() {

// ==UserScript==
// @name          FaceBook disable theater mode
// @namespace     http://localhost.localdomain
// @icon          http://www.gravatar.com/avatar.php?gravatar_id=e615596ec6d7191ab628a1f0cec0006d&r=PG&s=48&default=identicon#.png
// @description   Current development of facebook disable theater mode
// @copyright     2011, Patopop007
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www.facebook.com/*
//
// ==/UserScript==
var location = window.location;
var url = location.split("&theater");

alert(url[0]);

})();