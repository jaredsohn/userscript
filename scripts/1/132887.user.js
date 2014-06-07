// ==UserScript==
// @id             www.kitapyurdu.com-20e416fa-55ad-41dd-9b9a-0444144ba69e@scriptish
// @name           KitapYurdu  - icsayfalar.mod
// @version        1.21
// @namespace      *
// @author         juiev
// @description    Kitap Yurdu'nun "ic sayfalar" ozelligini yeni pencere yerine mevcut pencerede bir katmanda goruntulemeye yarar
// @include        http://www.kitapyurdu.com/kitap/*
// @run-at         document-end
// ==/UserScript==

/*
 Change Log:
 Version 1.21: 
   -- Scriptish uzerinde gelistirilen betik, Greasemonkey icin iyilestirildi
*/
// Yeni bir jQuery kutuphanesi cagirmak yerine, Kitap Yurdu'nun sitesine gomulu jQuery kullaniliyor
var $=!unsafeWindow?window.jQuery:unsafeWindow.jQuery;
/*
 @sayfala() 
  div#pictureDIV'in acilip acilmadiğini kontrol eder. Yayimlanmamis surumlerde 'sayfala()' fonksiyonu bambaska gorevler utleniyordu.
  Not: Su anda bu kodda denetim sikintisi surmektedir. Sonraki surumlerde bunun uzerinde calisacagim, eger unutmazsam.
*/
function sayfala(){
	setTimeout(function(){checkPopup()},1000);
}
/*
 @checkPopup()
 div#pictureDIV acilmissa buna sayfalandirma menusunu ekler
*/
function checkPopup(){
var pic=document.getElementById('pictureDIV');
if(pic != 'null' || pic != 'undefined') {
	var kypgnav='<tr align="center"><td>'+
	'<div style="width:370px;background-color:white;display:block;font-family:Verdana;font-size:12pt;size:13pt;">'+
	'1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9'.replace(/(1?\d)/g,'<a class="pgtikla" href="#$1">$1</a>')+
	'</td></tr>';	// Sayfa numarasina tiklandiginda hash deigisir. 
	$('#pictureDIV table').prepend(kypgnav);
	$('#pictureDIV table').append(kypgnav);
} else {setTimeout(function(){sayfala()},1000);}
}
// [ic sayfalar] butonundaki popup pencere kodu 'ShowPicture()' fonksiyonu ile yer degistirildi
//window.addEventListener('load',function(){
$('a[href*="javascript:innerpage"]').each(function(){
	var hrf=String($(this).attr('href'))
		.replace('javascript:innerpage(\'/icsayfalar.asp?id=','javascript:ShowPicture(\'/icsayfaImage.asp?sayfa=')
		.replace('\');','-1.gif\');');

	$(this).attr('href',hrf);
	$(this).click(sayfala);
});
//},false);

// Kitap sayfa adresini hash degisikligine göre düzenler.
window.addEventListener('hashchange',function()
	{
		var pgnum=String($('#pictureDIV img').attr('src')).replace(/(1?\d)\.gif/,window.location.hash.substr(1)+'.gif');
		$('#pictureDIV img').attr('src',pgnum);
	},false);

