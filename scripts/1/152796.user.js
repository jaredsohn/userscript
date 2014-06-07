// ==UserScript==
// @name        Google Search Tools Back
// @namespace   http://akr.tw/
// @version     1.7.2
//d
// @description Brings back Google Search tools.
// @author      Ming-Hsien Lin (akiratw)
// @license     MIT License
//
// @homepageURL https://userscripts.org/scripts/show/152796
// @downloadURL https://userscripts.org/scripts/source/152796.user.js
// @updateURL   https://userscripts.org/scripts/source/152796.meta.js
//
// @include     http://www.google.*/
// @include     http://www.google.*/?*
// @include     http://www.google.*/#*
// @include     http://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     https://www.google.*/
// @include     https://www.google.*/?*
// @include     https://www.google.*/#*
// @include     https://www.google.*/search*
// @include     https://www.google.*/webhp*
// @include     https://encrypted.google.*/
// @include     https://encrypted.google.*/?*
// @include     https://encrypted.google.*/#*
// @include     https://encrypted.google.*/search*
// @include     https://encrypted.google.*/webhp*
//
// @grant       GM_addStyle
// ==/UserScript==

var GM_addStyle = GM_addStyle || function (css) {
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = css;
  document.head.appendChild(style);
};

GM_addStyle(
    /* Horizontal menu on top. */
    '#hdtb_more, #hdtb_tls {' +
    '  display: none !important;' +
    '}' +

    '#hdtb_more_mn {' +
    '  display: inline-block !important;' +
    '  top: 1px !important;' +
    '  border: none !important;' +
    '  box-shadow: none !important;' +
    '  background: transparent !important;' +
    '}' +

    '#cnt.mdm #hdtb_more_mn {' +
    '  top: 10px !important;' +
    '}' +

    '#hdtb_msb div.hdtb_mitem,' +
    '#hdtb_msb div.hdtb_msb_hmi {' +
    '  display: inline-block !important;' +
    '}' +

    '#hdtb_msb div.hdtb_mitem a:hover,' +
    '#hdtb_msb div.hdtb_msb_hmi a:hover {' +
    '  background: transparent !important;' +
    '  color: #222 !important;' +
    '}' +

    '#resultStats {' +
    '  top: 0 !important;' +
    '  opacity: 1 !important;' +
    '}' +

    /* Search tools menu to left. */
    '#hdtbMenus {' +
    '  display: block !important;' +
    '  position: absolute !important;' +
    '  top: 0 !important;' +
    '  height: 0 !important;' +
    '  overflow: visible !important;' +
    '  background: transparent !important;' +
    '}' +

    '#hdtbMenus ul.hdtbU {' +
    '  display: block !important;' +
    '  position: relative !important;' +
    '  float: left !important;' +
    '  clear: both !important;' +
    '  width: 200px !important;' +
    '  min-width: 200px !important;' +
    '  max-width: 200px !important;' +
    '  margin-top: 20px !important;' +
    '  border: none !important;' +
    '  box-shadow: none !important;' +
    '}' +

    '#hdtbMenus ul.hdtbU > li {' +
    '  overflow: hidden !important;' +
    '  white-space: normal !important;' +
    '}' +

    '#hdtbMenus ul.hdtbU > li.hdtbSel,' +
    '#hdtbMenus ul.hdtbU > li.hdtbSel > span {' +
    '  background: none !important;' +
    '  color: #DD4B39 !important;' +
    '  font-weight: 700 !important;' +
    '}' +

    '#hdtbMenus ul.hdtbU > li > span.hdtb-mn-c {' +
    '  background: #FFF !important;' +
    '  font-weight: 400 !important;' +
    '  white-space: nowrap !important;' +
    '}' +

    '#hdtbMenus span.tnv-lt-sm {' +
    '  height: auto !important;' +
    '  overflow: visible !important;' +
    '}' +

    '#hdtbMenus > div > div {' +
    '  display: none !important;' +
    '}' +

    '#lc-input {' +
    '  display: block !important;' +
    '  margin: 5px !important;' +
    '}' +

    '#hdtb_rst.hdtb-mn-hd {' +
    '  display: inline-block !important;' +
    '  position: relative !important;' +
    '  float: left !important;' +
    '  clear: both !important;' +
    '  margin: 60px 0 20px 15px !important;' +
    '}' +

    /* Drop-down menu after the URLs of search results. */
    'div.action-menu > a {' +
    '  display: none !important;' +
    '}' +

    'div.action-menu-panel {' +
    '  display: inline-block !important;' +
    '  position: static !important;' +
    '  visibility: inherit !important;' +
    '  border: none !important;' +
    '  box-shadow: none !important;' +
    '  background: transparent !important;' +
    '}' +

    'div.action-menu-panel ul li.action-menu-item {' +
    '  display: inline-block !important;' +
    '  margin: 2px !important;' +
    '  background: #F1F1F1 !important;' +
    '  color: #777 !important;' +
    '}' +

    'div.action-menu-panel ul li.action-menu-item:hover {' +
    '  background: #F1F1F1 !important;' +
    '}' +

    'div.action-menu-panel a.fl,' +
    'div.action-menu-panel div.action-menu-button {' +
    '  display: inline !important;' +
    '  padding: 5px !important;' +
    '  color: #777 !important;' +
    '  font-size: 11px !important;' +
    '}' +

    'div.action-menu-panel div.action-menu-button {' +
    '  display: inline !important;' +
    '  padding: 5px !important;' +
    '  color: #777 !important;' +
    '}' +

    /* Search results links. */
    '#rso .r,' +
    '#rso span.tl {' +
    '  margin-bottom: 5px !important;' +
    '}' +

    '#rso h3.r a,' +
    '#rso span.tl a {' +
    '  padding-bottom: 1px !important;' +
    '  border-bottom: 1px solid !important;' +
    '  text-decoration: none !important;' +
    '  line-height: 1.5 !important;' +
    '}' +

    '#rso h3.r em,' +
    '#rso span.tl em {' +
    '  color: #DD4B39 !important;' +
    '  font-weight: bold !important;' +
    '}' +

    /* Search results content. */
    '#center_col,' +
    '#botabar,' +
    '.ab_tnav_wrp {' +
    '  margin-left: 200px !important;' +
    '}' +

    '#hdtb_msb > .hdtb_mitem:first-child,' +
    '#hdtb_msb > .hdtb_mitem.hdtb_msel:first-child {' +
    '  margin-left: 215px !important;' +
    '}' +

    '@media (max-width: 1200px) {' +
    '  #hdtb_msb > .hdtb_mitem:first-child,' +
    '  #hdtb_msb > .hdtb_mitem.hdtb_msel:first-child {' +
    '    margin-left: 20px !important;' +
    '  }' +
    '}' +

    '#cnt {' +
    '  background: transparent !important;' +
    '}' +

    '#rg {' +
    '  position: relative !important;' +
    '  width: 100% !important;' +
    '}' +

    '#rhscol {' +
    '  overflow: visible !important;' +
    '}' +

    '#irc_bg {' +
    '  -webkit-box-sizing: border-box !important;' +
    '     -moz-box-sizing: border-box !important;' +
    '          box-sizing: border-box !important;' +
    '  left: 0 !important;' +
    '  padding-left: 200px !important;' +
    '  background: transparent !important;' +
    '}' +

    '#irc_cl,' +
    '#irc_cc {' +
    '  background-color: #222 !important;' +
    '}' +

    '#ucs > div.uc {' +
    '  margin-left: 215px !important;' +
    '  padding: 5px !important;' +
    '}' +

    /* Footer */
    '#fbar > div.fbar {' +
    '  margin-left: 215px !important;' +
    '  background: none !important;' +
    '}' +

    '#fbar > div.fbar > span.fbarspacing {' +
    '  margin-left: 0 !important;' +
    '}' +

    /* Search form on top. */
    '#gsr:not(.hp) #gbqf,' +
    '#gsr:not(.hp) #tsf .tsf-p > div > table:first-child {' +
    '  margin-left: 90px !important;' +
    '}' +

    /* Wikipedia block and ads on the right side. */
    '#rhs {' +
    '  overflow: visible !important;' +
    '  margin-left: 820px !important;' +
    '}' +

    /* "People also search for" banner on top. */
    '#botabar ul.klcar {' +
    '  margin-left: 0 !important;' +
    '}'
  );
