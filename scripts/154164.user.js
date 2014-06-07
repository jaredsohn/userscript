// ==UserScript==
// @name           Acunn.com Tracker Engelliyicisi 
// @author         Bülentcan Nikel
// @version        1.0
// @description    Bu Eklenti Acunn.com'daki İnternet Aktivetinizi Kayıt Altına Alan Cookie(çerez)'leri Engeller
// @include    http://s.cdn.acunn.com/*    
// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='Acunn.com Tracker'ları Engellendi ';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>Bu Tracker Acunn.com Tracker Engelliyicisi Tarafından Engellenmiştir" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://bilgisayarbilisimbilgilendirme.blogspot.com/'");
}
document.body.appendChild(s);