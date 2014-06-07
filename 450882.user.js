// ==UserScript==
// @name       Ekşisözlük antialiasing+
// @namespace  orhangazi.info
// @version    0.1
// @description  Ekşisözlüğü kullanmayı kolaylaştıran bir kaç özellik. Yazılara antialiasing uygulayarak güzelleştirir, gözleri yormamak için akşam 7'den sonra arkaplanı koyulaştırır ve sabah 5'ten sonra tekrar eski haline getirir, yön tuşlarıyla sayfalar arası gezinmeyi ve üst karakter (shift) tuşuyla en son sayfaya gitmeyi sağlar.
// @match      https://eksisozluk.com/*
// @copyright  2014+, Orhan Gazi
// ==/UserScript==

document.getElementsByTagName("body")[0].style.textShadow = "0 0 1px rgba(0,0,0,0.3)";
//document.write("sasadsadass");

//Gözü korumak için akşam 7'den sonra arkaplanı koyulaştırır ve sabah 5'ten sonra eski haline getirir.
var tarih = new Date();
var saat = tarih.getHours();

if(saat>=19 || saat <= 5)
{
    document.getElementsByTagName("body")[0].style.backgroundColor = "#CCC";
}

//sağ sol tuşlarıyla sayfalar arasında gezinmeyi ve 0 (numpad) tuşuyla
//son sayfaya gitmeyi sağlar
document.onkeydown = keyKontrol;

function keyKontrol(key)
{
    var keyKod;
    keyKod = key.which;
    if(keyKod == 39){
        document.getElementsByClassName("next")[0].click();
    }
    else if(keyKod == 37)
    {
        document.getElementsByClassName("prev")[0].click();
    }
    else if(keyKod == 16)
    {
        document.getElementsByClassName("last")[0].click();
    }
}