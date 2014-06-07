// ==UserScript==
// @name           Christian Anime Alliance - Darken
// @namespace      http://userscripts.org/users/70005
// @description    Darkens borders and reply area, adds a border to quotes. 
// @include        http://www.christiananime.net/
// @include        http://www.christiananime.net/*
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML+="<style type='text/css'>* {border-color: #777 !important;}select {background-color: #999 !important;}#vB_Editor_QR, .imagebutton, .alt_pickbutton, .vBulletin_editor, .imagebutton + td {background-color: #777 !important;} #vB_Editor_QR_textarea, textarea, .bginput{ color: white !important; background-color: #333 !important;} .fieldset td{background-color:#414141 !important;} table[width='95%']{border: 1px solid silver;}</style>"; void(0);