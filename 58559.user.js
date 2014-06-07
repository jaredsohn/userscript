// ==UserScript==
// Version 0.2
// @name           Airline Manager Stock Buyer
// @namespace      batis @ Ek$i Sözlük
// @include        http://apps.facebook.com/airline_manager/stocks_trade.php*
// ==/UserScript==


function $(id){return document.getElementById(id);}

var txt = $('app93673891404_actionDiv2').parentNode.parentNode;
var btn = $('app93673891404_frmbtn1').parentNode.parentNode;

var kutucuk = document.createElement('input');
kutucuk.setAttribute('type','text');
kutucuk.setAttribute('id','kutucuk_txt');
kutucuk.setAttribute('style','width:50px; float:left; border:1px #000 solid; height:13px;');

var bilgi_div = document.createElement('div');
bilgi_div.setAttribute('id','bilgi_div');

var timer_div = document.createElement('div');
timer_div.setAttribute('id','timer_div');

var kaydet = document.createElement('input');
kaydet.setAttribute('type', 'button');
kaydet.setAttribute('id','kaydet');
kaydet.setAttribute('value','Satin Al');
kaydet.setAttribute('style','width:55px;');

txt.appendChild(kutucuk);
txt.appendChild(bilgi_div);
btn.appendChild(kaydet);
btn.appendChild(timer_div);

var kutucuk_deger = $('kutucuk');

$('kaydet').addEventListener('click', kayit, false);
window.addEventListener('load', kayit, false);

function kayit()
{
	if (GM_getValue('kayit_kutucuk_deger') != null){kutucuk.value = GM_getValue('kayit_kutucuk_deger');}
	if (isNaN(kutucuk.value)){alert('Lan!');}
	else if (kutucuk.value > 0)
	{
		GM_setValue('kayit_kutucuk_deger', kutucuk.value);
		GM_setValue('kayit_kutucuk_deger_kalan', GM_getValue('kayit_kutucuk_deger')%10000);

		var bilgi = $('bilgi_div');
		bilgi.innerHTML = 'Lütfen Bekleyin';

		var secondsToGo = 40;
		var miliSecondsToGo = secondsToGo * 1000;
		var timer = $('timer_div');
		for(i=secondsToGo;i>0;i--)
		{
			setTimeout(function(){timer_div.innerHTML=--secondsToGo + ' saniye sonra alim yapilacaktir!';}, miliSecondsToGo-(1000*i));
		}
		
		if (GM_getValue('kayit_kutucuk_deger') < 10000)
		{
			if (kutucuk.value < 10000){kutucuk.value = GM_getValue('kayit_kutucuk_deger1');}
			$('app93673891404_buy').value = GM_getValue('kayit_kutucuk_deger_kalan');
			GM_setValue('kayit_kutucuk_deger_kalan', GM_getValue('kayit_kutucuk_deger_kalan')-$('app93673891404_buy').value);
			setTimeout(function(){$('app93673891404_frmbtn1').click();GM_setValue('kayit_kutucuk_deger_kalan', 0);GM_setValue('kayit_kutucuk_deger', 0);GM_setValue('kayit_kutucuk_deger1', 0);}, 40000);
		}
		else if (GM_getValue('kayit_kutucuk_deger') > 10000)
		{
			$('app93673891404_buy').value = 9999;
			GM_setValue('kayit_kutucuk_deger', GM_getValue('kayit_kutucuk_deger')-9999);
			setTimeout(function(){$('app93673891404_frmbtn1').click();}, 40000);
		}
	}
}