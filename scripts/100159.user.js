// ==UserScript==
// @name           web.de set bcc
// @namespace      lukas_haenel@web.de
// @description    set bcc on web.de edit email page
// @include        https://freemailng9906.web.de/online/msg/edit.htm*
// ==/UserScript==
document.getElementById("rv_bcc").value=document.getElementsByName("addresses:sender")[0].options[0].text
