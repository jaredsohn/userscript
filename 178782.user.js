// ==UserScript==
// @name        VelikOrgScript
// @description Make velik.org look as I like it.
// @namespace   sreit99.blogspot.com
// @include     http://www.velik.org/*
// @grant       GM_log
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     0.1
// ==/UserScript==

GM_log('Applying styles ...');

GM_addStyle('.avatar {padding-right:5px}'); // set padding at right side of avatar
GM_addStyle('#jfusionframeless #header {background-image: url("../images/overlays/light/top-overlay.png")}');

GM_addStyle('##jfusionframeless #head-l {background-color: red}');
