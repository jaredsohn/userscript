// ==UserScript==
// @name           Nemexia Zuxel's user script
// @description    Nemexia Zuxel's user script
// @include        http://game.nemexia.ru/*
// @require        http://game.nemexia.ru/js/jquery-1.3.2.min.js
// ==/UserScript==
 var GM_JQ = document.createElement('script'); 
 GM_JQ.src = 'http://game.nemexia.ru/js/laboratory.js?ver=1024';
 GM_JQ.type = 'text/javascript'; 
 document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
 
$('#hotLinksMenu > ul').append('<li><a onclick="startScan();" href="javascript:void(0);">Сканирование шпионских зондов</a></li>')

if ($('dl.list').length) {
	$('#boxResMetal').append(' <br/> +' + $('dl.list:first > dd')[0].textContent.split(':')[1]);
	$('#boxResCrystal').append(' <br/> +' + $('dl.list:first > dd')[1].textContent.split(':')[1]);
	$('#boxResGas').append(' <br/> +' + $('dl.list:first > dd')[2].textContent.split(':')[1]);
} else {
	$.post("zone_resource.php", function(data){
		var obj = $(data).find('dl.list:first > dd');
		$('#boxResMetal').append(' <br/> +' + obj[0].textContent.split(':')[1]);
		$('#boxResCrystal').append(' <br/> +' + obj[1].textContent.split(':')[1]);
		$('#boxResGas').append(' <br/> +' + obj[2].textContent.split(':')[1]);  
	}); 
}

$('#logo-en').css('top','120px');
