// ==UserScript==
// @name       ServerToTitle
// @namespace  ServerToTitle
// @version    0.1
// @description  Serverin nimi titlen eteen
// @include    http://s*.*.ikariam.com/index.php*
// @copyright  2011+, Vili Kinnunen
// ==/UserScript==

var title = document.title;
var server = title.split("- ")[1].split(" ")[1].split("	")[0];
document.title=server;