// ==UserScript==
// @name           Google recommendation button cleaner
// @namespace      http://userscripts.org/users/Hamza7
// @description    Hide Google PlusOne (+1) button in search results.
// @include        http://*
// @author         Hamza Abbad
// @license        GNU General Public License http://www.gnu.org/licenses/gpl.html
// @version        1.2.1
// ==/UserScript==
var Style = document.createElement("style");
Style.type="text/css";
Style.innerHTML=".esw, .eswd, .eswh, #plusone{display:none;}";
document.getElementsByTagName("head")[0].appendChild(Style);