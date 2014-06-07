// ==UserScript==
// @name           f-s chat frames
// @description    this script removes the top frame from chat .. is used for this http://userstyles.org/styles/36710 style ..
// @include        http://forum.fantasy-svet.net/chat/index.php
// ==/UserScript==

document.getElementsByTagName('frameset')[0].rows='0,*,135';