// ==UserScript==
// @name           Cryptozic Color Change
// @namespace      http://www.userscripts.org/smithore
// @include        http://cryptozoic.finddiscussion.com/
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'body { ' + 
'  background-color: #363636 ! important;' +
'}' +
'.row1 { ' + 
'  background-color: #DDDDDD ! important;' +
'}' +
'post.row1 { ' + 
'  background-color: #DDDDDD ! important;' +
'}' +
'.row2 { ' + 
'  background-color: #DDDDDD ! important;' +
'}' +
'post.row2 { ' + 
'  background-color: #DDDDDD ! important;' +
'}' +

''
);


// addGlobalStyle(
// 'h1, h2, h3, h4 {' +
// '  font-size: 12px ! important;' +
// '  line-height: 14px ! important;' +
// '  font-weight: normal ! important;' +
// '}' +
// 'h1:hover, h2:hover, h3:hover, h4:hover {' +
// '  background-color: inherit ! important;' +
// '  color: inherit ! important;' +
// '}');
