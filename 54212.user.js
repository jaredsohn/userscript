// ==UserScript==
// @name           Skin Top Frame in UoE Polopoly
// @namespace      hsswebteam
// @description    Skins the top frame in the UoE Polopoly CMS
// @include         https://www.polopoly.mis.ed.ac.uk/*
// ==/UserScript==
window.top.addEventListener("load", function(e) {
// background
//nameID = getElementByID("mainframeset");
top.frames[0].document.body.setAttribute('style','color:#D8E4D8;background:#FFFFFF; background-image:url(http://www.hss.ed.ac.uk/web-team/images/euans/background_image.gif);background-repeat: repeat-x; background-color:#40534A;');

top.frames[0].document.forms[0].setAttribute('style','padding-left:200px;background-image:url(http://www.hss.ed.ac.uk/web-team/images/euans/pp_form_image.gif); background-repeat: no-repeat;');
// clipboard
top.frames[0].document.forms[0].getElementsByTagName("fieldset")[1].setAttribute('style','left:440px; width:20px;');
// div
dv = top.frames[0].document.getElementsByTagName("div"); // get Divs
dv[0].setAttribute('style','margin-top:-12px;margin-bottom:12px;'); // move first div containing text up by 12px
// a
adv = dv[2].getElementsByTagName("a");
adv[0].setAttribute('style','color:gray;');
adv[1].setAttribute('style','color:gray;');
// button
butx =  dv[2].getElementsByTagName("button");
butx[0].setAttribute('style','background:none;border:none;background:url(http://www.hss.ed.ac.uk/web-team/images/euans/button-update.gif); background-repeat: no-repeat; color:gray;')
}, false);