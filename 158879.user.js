// ==UserScript==
// @id             www.facebook.com-7e79f218-dbc6-ef43-a910-0c06b9243cc9@scriptish
// @name           Remove Recommended Pages on Facebook
// @version        1.0.1
// @namespace      
// @author         Erik Vold
// @description    
// @include        *.facebook.com*
// @run-at         document-end
// ==/UserScript==


let ele = document.getElementById('rightCol');
ele.parentElement.removeChild(ele);

GM_addStyle('#contentArea { width: 95% !important; }');
