// ==UserScript==
// @name        Psychonaut FR Français
// @description        Redirect the huge homepage to "Français" (anchor)
// @namespace   f4rf3lu
// @include     http://www.psychonaut.com/forum.php*
// @version     1
// ==/UserScript==
(function() {
return window.location.assign(window.location.href.split('#')[0]+'#francais');
})();