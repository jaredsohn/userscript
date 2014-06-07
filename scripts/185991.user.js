// ==UserScript==
// @name       CIPELICI OBAVJESTENJA
// @namespace  CipeliciObavjestenja
// @version    1.0
// @description  cipelici obavezno instalirajte!
// @include      http://*erepublik.com*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon            http://legend3.ucoz.net/TSP_MU_pic.jpg
// @copyright  Pyramidicus 2013
// ==/UserScript==

/*
~~~ OPIS SKRIPTE ~~~

Skripta dodaje poseban panel ispod levog fiksiranog
odeljka sa ostalim informacijama o nalogu. Ovaj panel
je dostupan na svakoj stranici eRep-a. Sadrzi: logo
Cipelica, natpis 'CIPELICI NAREDJENJA' i tekst koji
je postavljen od strane koordinatora. Klikom na tekst
'CIPELICI NAREDJENJA' tekst naredjenja se update-uje,
a to se moze postici i jednostavnim refresh-ovanjem
stranice. Molimo Vas da ne opterecujete server
konstantnim refresh-ovanjem teksta, sto znaci da to
mozete raditi najvise 10 puta u minutu.

Skripta je napravljena u svrhe lakseg obavestavanja
pripadnika ekipe, pa Vas molimo da je instalirate.

Tvorac ove skripte je Pyramidicus i sva prava kopiranja
koda ili ponovnog objavljivanja su zadrzana.

*/
$('.sidebar-bottom-banner').hide();
function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
function prikaziPoruku(){
    GM_xmlhttpRequest ( {
    method:     "GET",
    url:        "http://www.stevanpavlovic.tk/cipelici-order.php",
    onload:     function (response) {
        			var tx1 = '<!-- Hosting24 Analytics Code -->';
					var tx2 = '<script type="text/javascript" src="http://stats.hosting24.com/count.php"></script>';
					var tx3 = '<!-- End Of Analytics Code -->';
					var text1 = response.responseText.replace(tx1, '');
        			var text2 = text1.replace(tx2, '');
                    var text3 = text2.replace(tx3, '');
        			var sveReci = text3.split(' ');
        			
        			sveReci = $.map(sveReci, function(value, i) {
                        if(strStartsWith(value, 'http://')) {  return '<a href="' + value + '" target="_blank">LINK</a>';  }
                        else{ return value; }
        			});
        			var sveReci2 = sveReci.join(' ');
                    $('.specijalno').html(sveReci2);
                }
});
}
$('.sidebar_banners_area').hide();
$('<div style="margin-top:10px;height:240px;box-shadow:#EBEBEB 0px 0px 0px 3px;border-radius:4px;background:#fff;" class="user_finances" id="cipelici"><center>'+
  '<img src="http://legend3.ucoz.net/TSP_MU_pic.jpg" width="45px" style="margin:8px;margin-left:auto;margin-right:auto;" /></center>'+
  '<a class="refresh"><p style="text-align:center;font-weight:bold;font-size:13px;cursor:pointer;" title="REFRESH">CIPELICI OBAVJESTENJA</p></a>'+
  '<p class="specijalno" style="padding:7px;border-radius:4px;text-align:center;margin-top:7px;"></p>'+
                           '</div>').insertAfter('.user_finances').hide().slideDown('slow');

prikaziPoruku();

$('.refresh').click(function() {
    prikaziPoruku();
    $('.specijalno').hide().fadeIn().html(sveReci2);
});