// ==UserScript==
// @name                Ugly Ocean
// @namespace           http://scripts.dtc-ugly.com
// @description         A script that provide you to fill in the background of the city view with an ocean so that if youre running scripts that extend the city window water fills the bottom.
// @copyright 2009, Donald_Duck (http://dtc-ugly.com)
// @version             1.0.0
// @include             http://*.ikariam.tld/*
// @exclude             http://board.ikariam.tld/*
// @require             http://code.jquery.com/jquery-latest.js
// @require             http://scripts.dtc-ugly.com/ugly-core.js
// @resource    style   http://scripts.dtc-ugly.com/css/ugly_ocean.css
// @resource    bgc_img http://scripts.dtc-ugly.com/images/bg-content.png
// @resource    bgf_img http://scripts.dtc-ugly.com/images/bg-footer.png
// @unwrap
// ==/UserScript==

var ugly_ocean_css = GM_getResourceText('style')
            .replace(/¤¤¤bg-content¤¤¤/, GM_getResourceURL('bgc_img'))
            .replace(/¤¤¤bg-footer¤¤¤/, GM_getResourceURL('bgf_img'))
            .toString();
GM_addStyle(ugly_ocean_css);