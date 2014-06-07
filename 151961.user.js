// ==UserScript==
// @name  addCSS
function addCss(cssString) { 
var head = document. 
getElementsByTagName('head')[0]; 
return unless head; var newCss = document.createElement('style'); 
newCss.type = "text/css"; 
newCss.innerHTML = cssString; 
head.appendChild(newCss); 
} 
addCss ( 
'* { background-color: #ffffff ! important; }' 
);
// ==/UserScript==