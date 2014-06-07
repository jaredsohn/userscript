// ==UserScript==
// @name Pango make receipt Original
// @description Will make the receipt on Pango always show Original
// @match http://www.4500.co.il/driver/*
// @match https://www.4500.co.il/driver/*
// @author Erez
// @version 1.0
// @date 2011-08-30
// ==/UserScript==
if(document.getElementById('lblInvoiceTypeCopy'))document.getElementById('lblInvoiceTypeCopy').style.display="none";
if(document.getElementById('lblInvoiceTypeOriginal'))document.getElementById('lblInvoiceTypeOriginal').style.display="";