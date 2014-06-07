// ==UserScript==
// @id             Google Books Full Fullscreen
// @name           Google Books Full Full Screen
// @namespace      books.google.com
// @description    Makes the Google Books Full Screen Toolbar Smaller
// @include        http://books.google.com/books?id=*v=onepage&q&f=true
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
 
addStyle('div#toolbar_container{position:absolute;z-index:9999;background:url("/googlebooks/images/viewport_images-4.gif") no-repeat scroll 1px -24px #DAE3F6;width:25px;height:auto;padding:1px;margin:-30px 0 5px 0;overflow:hidden;border-bottom:1px solid #6B90DA;border-right:1px solid #6B90DA;}div#toolbar_container:hover{background-image:none;padding:1px;width:auto;height:auto;border-bottom:1px solid #6B90DA;background-color:#FCFCFF;}div#gb-top-search-box{display:none;}div#gbar{display:none;}div.gbh{display:none;}div#guser{display:none;}div#search_bar{display:none;}div#toolbar_container:hover div.top-toolbar-button{border:1px solid #FCFCFF;background-color:transparent;}div#toolbar_container:hover div.top-toolbar-button-checked{background-color:#DAE3F6;}div.top-toolbar-button{border:1px solid #6B90DA;background-color:transparent;}div.top-linkbar-button{display:none;}div.top-toolbar-separator{margin-left:7px;border-left:1px solid #6B90DA;}div#toolbar_container:hover div.top-toolbar-separator{border-left:1px solid #6B90DA;}div#toolbar_container table{margin-left:-9999px;}div#toolbar_container:hover table{margin-left:0;}#gbz,#gbx1,#gbx2,#gbx3,#gbx4{display:none;}#gbg span.gbtcb{display:none;}.gbzt,.gbgt,.gbgtd{border-top:0 none;}');
addStyle('div#toolbar_container{-moz-transition:opacity 500ms ease-in-out 0ms, width 500ms ease-in-out 0ms, background-color 500ms ease-in-out 0ms;transition:opacity 500ms ease-in-out 0ms, width 500ms ease-in-out 0ms, background-color 500ms ease-in-out 0ms;}div#toolbar_container:hover{width:425px;}');