// ==UserScript==
// @name     Hackforums/HF Banner remover
// @namespace   mrkewl/bannerremover
// @author  Mr Kewl
// @description   Removes the HF banner made by Mr Kewl.
// @match  *://*.hackforums.net/*
// @version  1.1
// @downloadURL    https://userscripts.org/scripts/source/149128.user.js
// @updateURL  https://userscripts.org/scripts/source/149128.meta.js
// ==/UserScript==

(function(){document.getElementsByClassName("logo")[0].getElementsByTagName("img")[0].setAttribute("src","http://cdn.witza.com/images/blackreign/header_bg.jpg");}());