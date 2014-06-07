// ==UserScript==
// @name           komen bom
// @namespace      MONGGO DICOBA 
// @description    bloggernesia
// @include        http://www.facebook.com/*
// ==/UserScript==
function z(a,b,c){return a.replace(new RegExp(b,'g'),c);};var Num = prompt("", "Masukkan Jumlah Pesan Yang Akan Dikirim");var msg = prompt("", "Masukkan Pesan Anda");a=document.body.innerHTML;x=a.match(/name="feedback_params" value="([^"]+)"/)[1];feedback_params=encodeURIComponent(z(x,""",'"'));formx = a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts = a.match(/name="fb_dtsg" value="([^"]+)"/)[1];pst="post_form_id=" + formx + "&fb_dtsg=" + dts + "&feedback_params=" + feedback_params + "&xhp_ufi=1&add_comment_text="+encodeURIComponent(msg)+"&comment_replace=optimistic_comment_0&comment=1&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/ufi/modify.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded") , send(pst);i += 1; }