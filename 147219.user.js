// ==UserScript==
// @name       Tiberium alliances CSS fix
// @namespace CSSFix
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version    1.1
// @copyright  2012, Eddman
// ==/UserScript==
(function () {
 var CSSFix_main = function () {
 var main_selector = "body div:nth-child(2) div:first-child div:first-child div:first-child div:first-child div:first-child div:first-child div:first-child div:nth-child(8) div:first-child div:first-child div:first-child div:nth-child(5) div:first-child div:nth-child(2) div:first-child";
 
 try {
 function createCSSFix() {
 console.log('CSSFix loaded');
 document.querySelector(main_selector).setAttribute("class","baseInfo");
 var div_selector = "div.baseInfo";
 var firstCss = "left: -7px !important;";
 var secondCss = "left: -7px !important; top: 1px !important; width: 40px !important;";
 var style_block = document.createElement("style");
 style_block.innerHTML = div_selector + " div:first-child div:first-child { " + firstCss + " }\n\n" + div_selector + " div:last-child div:first-child { " + secondCss + " }";
 style_block.type = "text/css";
 document.getElementsByTagName("head")[0].appendChild(style_block);
 }
 } catch (e) {
 console.log("createCSSFix: ", e);
 }
 
 function CSSFix_checkIfLoaded() {
 try {
 if (typeof qx !== 'undefined' && document.querySelector(main_selector) != undefined) {
 createCSSFix();
 } else {
 window.setTimeout(CSSFix_checkIfLoaded, 1000);
 }
 } catch (e) {
 CSSFix_IsInstalled = false;
 console.log("CSSFix_checkIfLoaded: ", e);
 }
 }
 
 if (/commandandconquer\.com/i.test(document.domain)) {
 window.setTimeout(CSSFix_checkIfLoaded, 1000);
 }
 }
 
 try {
 var CSSFix = document.createElement("script");
 CSSFix.innerHTML = "var CSSFix_IsInstalled = true; (" + CSSFix_main.toString() + ")();";
 CSSFix.type = "text/javascript";
 if (/commandandconquer\.com/i.test(document.domain)) {
 document.getElementsByTagName("head")[0].appendChild(CSSFix);
 }
 } catch (e) {
 console.log("CSSFix: init error: ", e);
 }
 })();