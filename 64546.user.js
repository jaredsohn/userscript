// ==UserScript==
// @author Interficiam
// @name Clean iGoogle
// @description Removes junk from iGoogle
// @include http://www.google.be/*
// ==/UserScript==
var Gsea = document.getElementById('gsea');
Gsea.removeAttribute('id');
var Title = document.getElementById('nhdrwrapsizer');
Title.removeAttribute('id');
var Languages = document.getElementById('offered_in'); 
Languages.parentNode.removeChild(Languages);
var Footer = document.getElementById('footerwrap'); 
Footer.parentNode.removeChild(Footer);