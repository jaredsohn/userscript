// ==UserScript==
// @name           Is Asp . Net Rendered Page
// @namespace      http://userscripts.org/kgrashad/IsAspNet
// ==/UserScript==
if (document.body.innerHTML.indexOf("<!-- asp -->", 0) > 0) { 
  alert("YES!"); 
} else { 
  alert("no, sorry..."); 
}