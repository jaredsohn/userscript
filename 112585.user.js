// ==UserScript==
// @name	Center iGoogle Search Field
// @namespace	http://www.mikevision.com
// @description Centers the search field for iGoogle
// @version	2.6
// @include	http://www.google.com/ig
// @updateURL	https://userscripts.org/scripts/source/112585.user.js
// @downloadURL	https://userscripts.org/scripts/source/112585.user.js
// ==/UserScript==

function igoogleCenter(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

igoogleCenter('#gbqfw {position:absolute !important; margin-top:20px !important; margin-left:-356px !important; margin-bottom:100px !important;left:50% !important; width:711px !important; z-index:100 !important;} #nhdrwrapsizer {height:19px !important;} .gsealog {padding: 0 !important;} .gseain {padding: 0 0 0 38px !important;} .kdAppName{display:none !important;} #nhdrwrap{border-bottom:none !important;} .kdContainer {border-top:none !important;} .kdButtonBar{margin-left:45px !important;} .toggleLeftNavContainer{margin-left:21px !important;} .kdBackground{border:none !important;}#gb{border-bottom:0px none solid !important;}#gbx1, #gbx2{border:0 black solid !important;}#gsea_table{position:absolute;left:50%;margin-left:-356px;z-index:99;}');