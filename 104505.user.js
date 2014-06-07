// ==UserScript==
// @name        public key contents only
// @description public key contents only
// ==/UserScript==

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("publickey1.jp") {

#header, #footer, #commentsandtrackbacks,
#subcol, div.tag {
display:none !important;
}

#container, #maincol, .newentries {
width : 99% !important;
}

}