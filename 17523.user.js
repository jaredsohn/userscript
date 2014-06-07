// ==UserScript==
// @name           lokalisten
// @namespace      http://userscripts.org/users/33515/scripts
// @description    verschiedene fixes
// @include        http://lokalisten.de/web/*
// ==/UserScript==

var b = document.getElementById("mmenu_msg_itm");

var imgs = document.getElementsByTagName("img");
for (var k=0; k<imgs.length; k++) {
    if (!imgs[k].src.match(/mail\.gif/gi)) {
        if (b) {
            b.href = b.href.replace(/3$/gi, "1");
        }
    }
}

var links=document.getElementsByTagName("a");
for (k=0; k<links.length; k++) {
    if (links[k].href.indexOf("pageLength=27") > -1){
        links[k].href=links[k].href.replace(/27$/gi, "999");
        links[k].innerHTML="alle";
    }
}


if (document.getElementsByName("messageForm.copyMessageToSendFolder").length) {
  document.getElementsByName("messageForm.copyMessageToSendFolder")[0].checked = "checked";
}
if (document.getElementsByName("copyMessageToSendFolder").length) {
  document.getElementsByName("copyMessageToSendFolder")[0].checked = "checked";
}
if (document.getElementsByName("subject").length) {
  document.getElementsByName("subject")[0].value=document.getElementsByName("subject")[0].value==""?"Irgendein Betreff":document.getElementsByName("subject")[0].value;
}