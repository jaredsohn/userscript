// ==UserScript==
// @name       mobage
// @version    0.1
// @description  enter something useful
// @include      http://sp.pf.mbga.jp/*
// @copyright  2012+, tom
// ==/UserScript==
function f1(){
unsafeWindow.orientation = 1;
unsafeWindow.ontouchstart = 1;
isTouch = true;
thisPage = "error";
//topPage  = bahamut;
//alert("Hello world!");
/* window.orientation = 0;
*/
}
location.href = "javascript: void("+ f1() +");";
