// ==UserScript==
// @name       BiFrost - forside TWIK!
// @version    0.1
// @description  enter something useful
// @match      https://humtek.hum.au.dk/opgaver/
// @match https://humtek.hum.au.dk/opgaver/
// @match https://humtek.hum.au.dk/opgaver/index.php*
// @require http://code.jquery.com/jquery-1.9.1.js
// @copyright  2012+, You
// ==/UserScript==

var reaktionEle = $("#Utildeltebox tr:contains(\"Reaktion\")");
var CLreaktionEle = reaktionEle.clone(true);
reaktionEle.empty()

var mainTbody = $("body").children("table:last").children("tbody");
var skaleton = mainTbody.children("tr").slice(0,4);
var clonedSkaleton = skaleton.clone(true);


var headerRow = clonedSkaleton.find("tbody .headerrow:first").clone(true);
clonedSkaleton.find("tbody").html("");
clonedSkaleton.find("#Voresdiv").attr("id", "reaktionDiv").attr("onmousedown", "toggleDiv('reaktion',reaktionBox, reaktionImg, reaktionDiv)").html("<b>Reaktion </b> ("+reaktionEle.length+")");
clonedSkaleton.find(".titlerowExtend img[name=Voresimg]").attr("name", "reaktionImg");
clonedSkaleton.find("#Voresbox").attr("id", "reaktionBox");
clonedSkaleton.find("tbody").append(headerRow);
clonedSkaleton.find("tbody").append(CLreaktionEle);

mainTbody.children("tr:nth-child(8)").after(clonedSkaleton);