// ==UserScript==
// @name           No scrollbar buttons please!
// @description    this little script will remove the steppers (up and down buttons) from the scrolling bar.
// ==/UserScript==
@-moz-document 
url-prefix(https://),url-prefix(http://),url-prefix(chrome://),url-prefix(ftp://) {
scrollbar * 
scrollbar scrollbarbutton { display: none ! important; }
scrollbar scrollbarbutton { visibility: collapse !important }
}