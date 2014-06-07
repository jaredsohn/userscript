// Campfire Spiffyizer
// New Styles for Campfire Chat
//
// version 1 - Updates colors for login/logoff/kick , removes ads during chat
//
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Campfire Spiffyizer
// @namespace     http://www.jforsythe.com
// @description   New Styles for Campfire Chat
// @include       *.campfirenow.com/room*

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
 

var gbl_css = '';
 
gbl_css += '/* Make kicks diff than enters */  ';
gbl_css += '.kick_message td { background-color: #E1E1E1 !important; color: #000 !important; font-weight: bold !important; } ';
gbl_css += '.advertisement_message { display: none; }';
gbl_css += '.enter_message td { background-color: #D9FFD9 !important; color: #006600 !important; font-weight: bold !important;  }'
gbl_css += '  /* end  */);';
  
addGlobalStyle(gbl_css);
