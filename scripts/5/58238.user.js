// ==UserScript==
// Version: 0.5.2
// @name			Airline Manager Auto Fuel Purchase
// @namespace		batis @ Ek$i Sözlük
// @include			http://apps.facebook.com/airline_manager/fuel.php*
// @include			http://www.facebook.com/airline_manager/login.php*
// BetaTester		frenchkiss @ Ek$i Sözlük
// ==/UserScript==
function $(id){return document.getElementById(id);}

var tekrar = $('try_again_button');
var login = $('login');

if (tekrar != null){tekrar.click();}
else if (login != null){login.click();}
else
{
	var tags = document.getElementsByTagName('*');
	for (i=0; i<tags.length;i++)
	{
		tagclass = tags[i].className;
		if (tagclass == 'menu_bg'){var yenisatir = tags[i].parentNode.parentNode;break;}
	}
	
	yenisatir.innerHTML += '<tr style=color:#FFF><td>Yenileme için<br><input type=text id=sayac disabled=disabled><\/td><\/tr>';
	yenisatir.innerHTML += '<tr style=color:#FFF><td>Üst Limit (\$)<br><input type=text id=getamount_limit><\/td><\/tr>';
	yenisatir.innerHTML += '<tr style=color:#FFF><td>Miktar<br><input type=text id=getamount style=width:90px;;float:left>&nbsp;<select id=sec_tur><option value=1>\$<\/option><option value=2>LBS<\/option><\/select><\/td><\/tr>';
	yenisatir.innerHTML += '<tr style=color:#FFF><td><input type=button id=kaydet value=Kaydet/Degistir><\/td><\/tr>';
	yenisatir.innerHTML += '<tr style=color:#FFF><div id=getamount_limit_txt><\/div><\/tr>';
	yenisatir.innerHTML += '<tr style=color:#FFF><div id=getamount_txt><\/div><\/tr>';
	
	var kaydet = $('kaydet');
	var getamount_limit = $('getamount_limit');
	var getamount = $('getamount');
	var getamount_type = $('sec_tur');
	var sayac = $('sayac');
	
	function save()
	{
		if(getamount_limit.value == 0 || getamount.value == 0 || isNaN(getamount_limit.value) || isNaN(getamount.value))
		{alert('Lan');}
		else
		{
			GM_setValue('kayit_type', getamount_type.value)
			GM_setValue('kayit_dolar', getamount_limit.value);
			if (GM_getValue('kayit_type') == 1)
				{GM_setValue('kayit_lbs', (getamount.value/getamount_limit.value)*1000);}
			else if (GM_getValue('kayit_type') == 2)
				{GM_setValue('kayit_lbs', getamount.value);}
			
			$('getamount_limit_txt').innerHTML = 'Üst Limit:' + ' ' + GM_getValue('kayit_dolar') + ' \$';
			$('getamount_txt').innerHTML = 'Miktar:' + ' ' + GM_getValue('kayit_lbs') + ' LBS';
		}
	}
	
	function savedload()
	{
		$('getamount_limit_txt').innerHTML = 'Üst Limit:' + ' ' + GM_getValue('kayit_dolar') + ' \$';
		$('getamount_txt').innerHTML = 'Miktar:' + ' ' + GM_getValue('kayit_lbs') + ' LBS';
	}
	
	if (GM_getValue('kayit_dolar') != null && GM_getValue('kayit_lbs') != null){window.addEventListener('load', savedload, false);}
	
	kaydet.addEventListener('click', save, false);
	
	var limit = GM_getValue('kayit_dolar');
	var amount = GM_getValue('kayit_lbs');
	var secondsToGo = 300; // refresh etmek için kaç saniye beklesin?
	var miliSecondsToGo = secondsToGo * 1000;
	
	function degis(girdi)
	{
		girdi = girdi.replace(/\$/gi,'');
		girdi = girdi.replace(/,/gi,'');
		return girdi;
	}
	
var veri = document.getElementsByTagName('font');
veri = veri.item(10).firstChild.innerHTML;
veri = parseInt(degis(veri));

	if (veri <= limit)
	{
		GM_setValue('kayit_lbs', limit/veri*GM_getValue('kayit_lbs'));
		amount = GM_getValue('kayit_lbs');
		document.getElementsByName('fuel')[0].value = amount;
		$('app93673891404_frmbtn').click();
		GM_setValue('kayit_dolar', 0);
		GM_setValue('kayit_lbs', 0);
		GM_setValue('kayit_type', 0);
	}
	else
	{
		for(i=secondsToGo;i>0;i--)
		{
			setTimeout(function(){sayac.value=--secondsToGo;if(sayac.value == 0){location.reload(true);}}, miliSecondsToGo-(1000*i));
		}
	}

}