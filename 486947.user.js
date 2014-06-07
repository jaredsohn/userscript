// ==UserScript==
// @name           T24 menü kaldıracı
// @description    T24'te aşağı indikçe menünün de inmesi durumunu iptal eder. Gazete sitesinde fixed menü mü olur ya? Twitter mı bu?
// @namespace      
// @include        http://www.t24.com.tr/*
// @include        http://t24.com.tr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle (".fixed-header{ position:relative !important;}");
