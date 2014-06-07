// ==UserScript==
// @name       habrahabr_notop_banner
// @namespace 
// @version    0.1
// @description 
// @match      http://habrahabr.ru/posts/top/*
// 
// ==/UserScript==


document.getElementsByTagName("a")[0].style.display = "none"