// ==UserScript==
// @name           Turkish Empire
// @author		   5AYIM
// @description    It is for Turkish Empire
// @include        https*://m.facebook.com/CnC.TA.RU*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://userscripts.org/scripts/source/107941.user.js
// @grant   GM_setValue 
// @grant   GM_getValue 
// ==/UserScript==

    $("#header").append("<div style=\"border:3px solid white; padding:3px;color:white;\">Kupon Kodu Takibi Basladi ...<div id=\"sayac\" style=\"margin-top:5px;color:black;\"></div></div>");

var sayi=1;	

function kontrol_et(veri) {
$.get('https://m.facebook.com/CnC.TA.RU', function(data) {
//  $("#header").html(data);
if (data.toLowerCase().indexOf("dakika önce") >= 0)
{
 if(confirm('Yeni kod var! Sayfayi yenile?')) location.reload();
  //setTimeout( function(){kontrol_et();}, 30000);location.reload(); 
}
 else {setTimeout( function(){
kontrol_et();
}, 60000);
}
$("#sayac").html('Kod kontrolü: ' + sayi);
sayi=sayi+1;
});
}

kontrol_et();