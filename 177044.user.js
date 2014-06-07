// ==UserScript==
// @id             popurls.com-de944f68-ea25-4027-a6bd-5ea42c16c316@meh
// @name           Un-frame popurl links
// @version        1.0
// @namespace      meh
// @author         Yansky
// @description    
// @include        http://popurls.com/go/*
// @run-at         document-end
// ==/UserScript==

window.location.href = document.querySelectorAll('frame')[1].src;