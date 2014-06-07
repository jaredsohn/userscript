// ==UserScript==
// @name           Genis Eksi Sozluk
// @description    Eksi Sozluk sag frame'ini daraltir, daha genis bir okuma alani saglar
// @namespace      http://userscripts.org/users/ocanal
// @version        0.0.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/show.asp*
// @include        https://antik.eksisozluk.com/show.asp*
// ==/UserScript==

var rightcol = document.getElementsByClassName("rightcol");
var rel_vid = document.getElementsByClassName("rel-vid");
var topic = document.getElementById("topic"); 

rightcol[0].style.width = "120px";
rel_vid[0].style.display = "none";
topic.style.marginRight = "150px";
