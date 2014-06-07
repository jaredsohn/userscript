// ==UserScript==
// @name           GrooveShark Ad Remover
// @namespace      GrooveSharkNoAds
// @author         Raiever
// @licence        GNU General Public License version 3 or any later version; http://www.gnu.org/licenses/gpl-3.0.html
// @copyright      2011 Raiever
// @homepage       http://userscripts.org/users/raiever
// @description    Removes Ads from Updated Grooveshark Site
// @include        http://*grooveshark.com/*
// ==/UserScript==
var capital = document.getElementById("capital")
capital.parentNode.removeChild(capital)
var application = document.getElementById("application")
application.style.width = "100%"