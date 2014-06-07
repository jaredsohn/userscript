// ==UserScript==
// @name  enable print
x = document.getElementById("ctl00_contentPlaceHolder1_requestGridView_ctl02_hiddenFieldApprovedDate");
x.value="2/25/2009 1:59:22 AM";
y = document.getElementById("ctl00_contentPlaceHolder1_requestGridView_ctl02_printLinkButton");
y.disabled=false;
// ==/UserScript==