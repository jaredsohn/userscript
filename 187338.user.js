// ==UserScript==
// @name        weather
// @namespace   HSikkema
// @include     http://www.timeanddate.com/weather/*
// @version     1
// @grant       none
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function removeClass(obj){
	var p = document.getElementsByClassName(obj);
	for (var i=p.length; --i>=0;) {
	    p[i].parentNode.removeChild(p[i]);
	}
}
function removeId(obj){
 var elmDeleted = document.getElementById(obj);
	elmDeleted.parentNode.removeChild(elmDeleted);

}

//make box show more days
addGlobalStyle('#weatherContainer { width:6990px !important; margin-left: -395px !important; }');
addGlobalStyle('.weatherTooltip { margin-left: -395px !important; }');
addGlobalStyle('.weatherGrid { margin-left: -460px !important; }');
addGlobalStyle('.rain { background:#0000ff !important; opacity: 0.22 !important; }');
addGlobalStyle('.snow { background:#33ff33 !important; opacity: 0.17 !important; }');
addGlobalStyle('.row {  width: 6000px !important; margin-left: 450px !important; }');

removeId("nav");
removeId("bk-focus");
removeId("bk-nav");
removeId("navRight");
removeId("weatherNav");
removeId("wt-hbh");
removeId("footer-logo");
removeId("header");
removeId("bc");
removeId("naw");
removeId("ad728mid");
removeId("footer");

removeClass('lk-block');
removeClass('navLeftUnder');
removeClass('row pd');
