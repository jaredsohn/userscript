// ==UserScript==
// @name           eRepublik Ukrainian Tools
// @namespace      Ukrainian Tools
// @author         CBAPTOR
// @description    Ukrainian Tools
// @version        0.01
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @grant	   none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==

	var location = document.location.toString();
	var lang = document.location.pathname.substr(1,2);
	var host = document.location.hostname.split('.')[0];



if ($("body").attr("id")!=="homepage_out"){
	
		$('strong#foodText').css('font-family','Arial,Arial');
		$('div#header > div#logo > a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/erepui2.png\")')
		$(".facebook_like").css("display","none");
		$('#menuText ul li#menu1 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu2 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu3 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu4 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu5 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu6 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText > ul > li#menu2').append('<ul>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/myCompanies\" targe="_self">Моя господа</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/training-grounds\" targe="_self">Тренувальні майданчики</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/inventory\" targe="_self">Сховище</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/advanced-buildings\" targe="_self">Інші будівлі</a></li>'+
			'</ul>'
		);
		$('#menuText > ul > li#menu3').append('<ul>' +
			'<li><a href=\"http://www.erepublik.com/en/military/campaigns/\" target="_self">Битви</a></li>' +
			'<li><a href=\"http://www.erepublik.com/en/newspaper/mod-bulletin1-188570/1/\" target="_self">Накази Мін Оборони</a></li>' +
			'<li><a href=\"http://egov4you.info/pulse/" target="_blank">egov4you.info - Пульс</a></li>' +
			'<li><a href=\"http://erep.root.se/" target="_blank">Калькулятор пошкоджень</a></li>' +
			'<li><a href=\"http://erep.maxihellas.com/" target="_blank">erep.maxihellas</a></li>');

		$('#menuText > ul > li#menu4 > ul').append(
			'<li><a href=\"http://erepublik-market.com/weapons.html" target="_blank">erepublik-market</a></li>'+
			'<li><a href=\"skype:?chat&blob=_tUo1OdHTC5jlL-3KU6ALs2bzMt4-nqK5CH7BZ8k2lZ13HnWfrSN_MkLzLMG-YYmKSTwQDvm-Jws3U4N2dBr0URH3HnYzJFF-ZGGSHqZkg-PAXXqCwyjPj20A4SNsMwrzop6Rq2rKQfhcb8PQxYWj8ej5oDFmKEItHYYO12prjODgokoS2HOMF-fV0uLIL1FCQ" target="_blank">Барахолка</a></li>');
		$('#menuText > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/uk/main/news/latest/all/Ukraine/1\" target="_self">Свіжа преса</a></li>'+
		'<li><a href=\"http://www.erepublik.com/en/country-administration/Ukraine/1\" target="_self">Закони є України</a></li>');
		$('#orderContainer.boxes.order_of_day > div').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/boxes_v2.png\")');
		$('#menuText > ul > li#menu5 > ul').append(
			'<li><a href=\"http://www.erepublik.com/en/newspaper/president-of-eukraine-242674/1/" target="_blank">Президент єУкраїни</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/propaganda-ministry-eua-271249/2/" target="_blank">Газета уряду</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/demography-news-240441/1/" target="_blank">Міністерство Освіти та Демографії</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/article/-gov-2012-2054330/1/20/" target="_blank">Міністерство Культури</a></li>'+
			//'<li><a href=\"http://www.erepublik.com/en/newspaper/national-news-ukraine-202889/1/" target="_blank">Міністерство Інформації</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/article/-n-ed-amp-de-quot-quot--2089877/1/20/" target="_blank">Бібліотека молодого бійця</a></li>'+
			'<li><a href=\"http://userscripts.org/scripts/search?q=eRepublik&submit=Search/" target="_blank">Скрипти</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/sawmill-269433/1/" target="_blank">Газета CBAPTOR</a></li>');
	
	if (host==='www') {
		if ((location=="http://www.erepublik.com/"+lang) || (location.indexOf("?viewPost=")!==-1)) {
			$('h1').css('font-family','Arial,Arial');
			$('#daily_pop > h2').css('font-family','Arial,Arial');
			$('#daily_pop > h3').css('font-family','Arial,Arial');
			// daily order
			$('#orderContainer.boxes.order_of_day > div').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/boxes_v2.png\")');
			$(".wcontent .building").attr("src","https://dl.dropbox.com/u/68604040/EREP/daily_order.png")
			// daily task
			$('.column > .boxes.daily_tasks > div > a.green_beauty').text('Винагорода');
		};
		
		$("#show_facebook_feed").css("display","none");
};

};