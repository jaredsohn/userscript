// ==UserScript==
// @name        hide stupid staples.com.au forced postcode
// @namespace   http://userscripts.org/users/useridnumber
// @include     http://www.staples.com.au/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle("#ctl00_cm_zr_mppPostalCode_backgroundElement, #ctl00_cm_zr_pPostalCodeRequired {display: none;}");