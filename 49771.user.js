// ==UserScript==
// @name           Make CiteULike Articles Private and Share your PDFs
// @namespace      http://www.citeulike.org/user/Zephyrus
// @description    Ticks the "privacy" and PDF sharing checkboxes by default
// @include        http://www.citeulike.org/*
// ==/UserScript==

// Gets the element named "is_private" and tick marks it
// Erase the following line if you want your article to be public
document.getElementsByName("is_private")[0].checked = true;

// Gets the element named "pdf_rightsholder" and tick marks it
// Erase the following line if you don't want to share your PDF
document.getElementsByName("pdf_rightsholder")[0].checked = true;
