// ==UserScript==
// @name           Google Reader Optimized TalosChen
// @namespace      http://userstyles.org
// @author         TalosChen
// @from           Jason Ng (http://www.kenengba.com)
// @homepage       
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
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

// customize google reader ui

// ----------USED PART----------
// #chrome-header: currently browsing feed name and the explore mode (Expanded or List)
addGlobalStyle('#chrome-header {display:none}');
// #gbar: top-left google product navi-bar
addGlobalStyle('#gbar {display:none}');
// #guser: logined google account information
addGlobalStyle('#guser {display:none}');
// #global-info,.gbh: the line under top navi
addGlobalStyle('#global-info,.gbh {display:none;}');
// #logo,#logo-container: the google reader logo
addGlobalStyle('#logo,#logo-container {display:none}');
// #search-submit: the Search button
addGlobalStyle('#search-submit {display:none;}');

// -------ADJUST add-subscription and search tool position CODE BLOCK BEGIN-------
addGlobalStyle('#lhn-add-subscription {left:800px;top:2px;}');
addGlobalStyle('.loaded #search {display:block;left:9px;position:absolute;top:4px;}');
addGlobalStyle('#search-restrict-input.label-input-label {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent none repeat scroll 0 0;border-width:0;width:107px;}');
addGlobalStyle('#search-input {border:1px solid #B2B2B2;margin:0;padding:3px 2px;width:105px;}');
// -------ADJUST add-subscription and search tool position CODE BLOCK END-------

// -------ADJUST main body display style CODE BLOCK BEGIN-------
// #main: as the name says
//addGlobalStyle('#main {position:absolute;top:26px;width:100%;}'); // leave the space of top navi and login information
addGlobalStyle('#main {position:absolute;top:0;width:100%;background-color:#EBEFF9;}');
addGlobalStyle('#lhn-selectors,#sub-tree,#friends-tree-item-0-main ul,.scroll-tree li, #lhn-add-subscription-section   {background-color:#EBEFF9;}');
addGlobalStyle('.lhn-section-footer {background-color:#C2CFF1;}');
addGlobalStyle('.scroll-tree li a:hover, #lhn-selectors .selector:hover  {background-color:GhostWhite;}');
// -------ADJUST main body display style CODE BLOCK END-------127.0.0.1

// other parts may useful
addGlobalStyle('.friends-tree-notification-info {display:none;}');
addGlobalStyle('#chrome-viewer-container {border-collapse:collapse;border-spacing:0;position:inherit;table-layout:fixed;top:0;width:100%;}');
addGlobalStyle('#nav {float:left;position:absolute;top:0px;width:260px;}');

// ----------NOT USED PART----------
/*

 */

