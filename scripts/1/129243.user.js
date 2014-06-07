// ==UserScript==
// @name        SeoPult Tools
// @author      medneem.ru
// @version     3.20.15
// @namespace   SeoPult Tools
// @description Дополнение к системе SeoPult 
// @include     http://seopult.ru/keyword_links.html*
// @include     http://www.seopult.ru/keyword_links.html*
// @include     https://seopult.ru/keyword_links.html*
// @include     https://www.seopult.ru/keyword_links.html*
// @require     http://yandex.st/jquery/1.8.3/jquery.min.js
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// ==/UserScript==


// Инициализируем таблицу перевода
var trans = [];
for (var i = 0x410; i <= 0x44F; i++) {
	trans[i] = i - 0x350; // А-Яа-я
}
trans[0x401] = 0xA8;    // Ё
trans[0x451] = 0xB8;    // ё

//Функция перекодирования URL
function URLEncode(str) {
	var ret = [];
	// Переводим кириллицу
	for (var i = 0; i < str.length; i++)
	{
		var n = str.charCodeAt(i);
		if (typeof trans[n] != 'undefined')
		n = trans[n];
		if (n <= 0xFF)
		ret.push(n);
	}
	return escape((String.fromCharCode.apply(null, ret)).replace(/\s/g, "+")) ;
}

function TrimStr(s) {
	s = s.replace( /^\s+/g, '');
	return s.replace( /\s+$/g, '');
}

$(document).ready(function() {

	
	//Добавляем ссылку "Очистить фильтр"
	$("table.tbl_params").find('td').eq(14).append('&nbsp;&nbsp;<a id="clfilter" href="javascript:void(0)">Очистить</a>');
	
	//Добавляем меню
	$("table.key_word_tbl").eq(1).find("thead").prepend(
	'<tr><th colspan="12" style="padding-top: 8px; border-bottom: 1px solid #F9F9F9; cursor:default;">' +
	
	'<div id="1r" style="padding: 0px 0px; clear:both">' + 
	
	'<div id="save" style="float:left; padding: 3px 10px 0px 10px"><a id="1save" href="javascript:void(0)">Экспорт доноров</a></div>' +
	
	'<div id="savetext1" style="float:left; padding: 3px 10px 0px 0px"><a id="1savetext" href="javascript:void(0)">Экспорт в SH</a> (<a id="go_sh" href="javascript:void(0)">подробнее</a>)</div>' + 
	
	'<div id="skeep" style="float:left; padding: 3px 10px 0px 0px"><a id="skeep" href="javascript:void(0)">Скрыть удаленные</a></div>' +
	
	'<div id="days" style="float:left; padding: 3px 10px 0px 0px"><a id="days" href="javascript:void(0)">Подсчет дней</a></div>' +
	
	'<div id="tic" style="float:left; padding: 3px 10px 0px 0px"><a id="tic" href="javascript:void(0)">тИЦ</a></div>' +
	
	'<div id="proxy" style="float:left; padding: 0px 10px 0px 0px"><select id="proxy" style="height: 21px;"><option value="1" selected="selected">yandex.ru</option><option value="2">xmlsearch</option><option value="3">google</option></select></div>' +
	
	'<div id="xml" style="float:left; display:none; padding-right: 10px;">user:&nbsp;<input style="width: 74px;" id="xmllogin" type="text" name="textfield" />&nbsp;key:&nbsp;<input id="xmlkey" type="text" name="textfield" /></div>' +
	
	'<div id="run" style="float:left; padding-right: 10px;"><a id="yal" style="color:green" href="javascript:void(0)">YAL</a>&nbsp;&nbsp;&nbsp;<a id="yap" style="color:green" href="javascript:void(0)">YAP</a>&nbsp;&nbsp;&nbsp;<a id="yapred" style="color:red" href="javascript:void(0)">YAP</a></div>' +
	
	'</div><div id="2r" style="padding-top: 5px;  clear:both">' +

	'<div id="timeout" style="float:left; padding: 0px 10px;">Таймаут <select id="mintimeout" style="height: 19px; margin-top: 2px;"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3" selected="selected">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select> + от 0 до <select id="maxtimeout" style="height: 19px; margin-top: 2px;"><option value="0">0</option><option value="1">1</option><option value="2" selected="selected">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> сек.</div>' +
	
	'<div id="outlinks" style="float:left; padding-right: 10px; "><a id="outlinks" href="javascript:void(0)">Внешние ссылки</a> + поиск акцептора <input id="acceptor" type="text" name="textfield" /></div>' +

	'<div id="forum" style="float:left; padding-right: 10px; padding-top: 3px;"><a id="forum" href="javascript:void(0)">Перейти на форум</a></div>' +
	
	'<div id="xmlpage" style="float:left; dysplay:none; padding-right: 10px; padding-top: 3px;"><a id="xmlpage" href="javascript:void(0)">Перейти на xml.yandex.ru</a></div>' +
	
	"</div></th></tr>"
	);
	
	$("table.key_word_tbl").eq(1).find("tfoot").prepend('<tr><td colspan="12"><textArea id="explist" readonly="readonly" rows=15 wrap="off" style="display:none; width: 99%;"></textArea></td></tr>');
	
	//ЧТЕНИЕ ЗНАЧЕНИЙ
	//Чтение значения типа поисковой системы
	if ( GM_getValue("spt_proxy_type") ) {
	
		$("select#proxy").val(GM_getValue("spt_proxy_type")); 

		if( $("select#proxy").val() == "1") {	
			$("div#xml").css("display", "none");
			$("div#xmlpage").css("display", "none");
			$("div#run").css("display", "block");			
			$("div#rung").css("display", "none");
		}
		
		if( $("select#proxy").val() == "2" ) {
			$("div#xml").css("display", "block");
			$("div#xmlpage").css("display", "block");
			$("div#run").css("display", "block");
			$("div#rung").css("display", "none");
		} 
		
		if( $("select#proxy").val() == "3" ) {
			$("div#xml").css("display", "none");
			$("div#xmlpage").css("display", "none");
			$("div#run").css("display", "none");
			$("div#rung").css("display", "block");			
		}		
		
	}

	if ( GM_getValue("spt_maxtimeout") ) {
		$("select#maxtimeout").val(GM_getValue("spt_maxtimeout")); 
	}
	
	if ( GM_getValue("spt_mintimeout") ) {
		$("select#mintimeout").val(GM_getValue("spt_mintimeout")); 
	}
		
	if ( GM_getValue("xmllogin") ) {
		$("#xmllogin").val(GM_getValue("xmllogin")); 
	} 
	
	if ( GM_getValue("xmlkey") ) {
		$("#xmlkey").val(GM_getValue("xmlkey")); 
	} 

	//Поиск акцептора
	if ( GM_getValue("spt_getacceptor") ) {
		$("#getacceptor").attr('checked', GM_getValue("spt_getacceptor")); 
	}
	//URL акцептора
	if ( GM_getValue("spt_acceptor") ) {
		$("#acceptor").val(GM_getValue("spt_acceptor")); 
	} 	

	//ЗАПИСЬ ЗНАЧЕНИЙ
	//Запись значения типа поисковой системы
	$("select#proxy").change(function () {
		GM_setValue("spt_proxy_type", $("select#proxy").val());
		
		if( $("select#proxy").val() == "1") {	
			$("div#xml").css("display", "none");
			$("div#xmlpage").css("display", "none");
			$("div#run").css("display", "block");			
			$("div#rung").css("display", "none");
			if(GM_getValue("spt_authorize") == "1") {
				$("div#fullversion2").css("display", "none");
				$("div#fullversion1").css("display", "none");
			} else {
				$("div#fullversion2").css("display", "none");
				$("div#fullversion1").css("display", "block");
			}
		}
		
		if( $("select#proxy").val() == "2" ) {
			$("div#xml").css("display", "block");
			$("div#xmlpage").css("display", "block");
			$("div#run").css("display", "block");
			$("div#rung").css("display", "none");
			if(GM_getValue("spt_authorize") == "1") {
				$("div#fullversion2").css("display", "none");
				$("div#fullversion1").css("display", "none");
			} else {
				$("div#fullversion1").css("display", "none");
				$("div#fullversion2").css("display", "block");
			}
		} 
		
		if( $("select#proxy").val() == "3" ) {
			$("div#xml").css("display", "none");
			$("div#xmlpage").css("display", "none");
			$("div#run").css("display", "none");
			$("div#rung").css("display", "block");
			if(GM_getValue("spt_authorize") == "1") {
				$("div#fullversion2").css("display", "none");
				$("div#fullversion1").css("display", "none");
			} else {
				$("div#fullversion2").css("display", "none");
				$("div#fullversion1").css("display", "block");
			}
		}
		
	});

	//Сохранение первого основного значения таймаут
	$("select#mintimeout").change(function () {
		GM_setValue("spt_mintimeout", $("select#mintimeout").val());	
	});
	
	//Сохранение второго дополнительно значения таймаута
	$("select#maxtimeout").change(function () {
		GM_setValue("spt_maxtimeout", $("select#maxtimeout").val());		
	});
	
	//Сохранение логина для проверки через xml
	$("#xmllogin").change(function () {
		GM_setValue("xmllogin", $("#xmllogin").val());
    });
	
	//Сохранение ключа для проверки через xml
	$("#xmlkey").change(function () {
		GM_setValue("xmlkey", $("#xmlkey").val());
    });
	
	//Сохранение поиска акцептора
	$("input#getacceptor").click(function () {
		if ( $("input#getacceptor").attr('checked') != "checked") {
			$("input#getacceptor").attr("checked", "checked");
			GM_setValue("spt_getacceptor", $("input#getacceptor").attr('checked'));
		} else {
		    $("input#getacceptor").removeAttr("checked");
			GM_deleteValue("spt_getacceptor");
		}	
	}); 
	
	//Сохранение URL акцептора
	$("#acceptor").change(function () {
		GM_setValue("spt_acceptor", $("#acceptor").val());
    });
	
	//Получение первого основного значения таймаута
	function mindelay() {	
		//if ( $("input#use_timeout").attr('checked')) {
		if (true) {
			var mindelay = parseInt($("select#mintimeout").val()) * 1000;
		} else {
			var mindelay = 0;
		}
		return mindelay;
	}
	
	//Получение второго дополнительно значения таймаута
	function maxdelay() {	
		//if ( $("input#use_timeout").attr('checked')) {
		if (true) {
			var maxdelay = parseInt($("select#maxtimeout").val()) * 1000;
		} else {
			var maxdelay = 0;
		}
		return maxdelay;
	}
	
	//Очистка фильтра
	$("a#clfilter").click(function() {
		var kwlink = parent.location.href;
		result = kwlink.match(/http:\/\/(wwww.)?seopult.ru\/keyword_links.html\?keyword_id=\d+/ig);
		location.href = result;
	});	
	
	//Экспорт списка доноров
	$("a#1save").click(function() {
		$("textarea#explist").text(show_url());
		$("textarea#explist").css("display", "block");
		$("textarea#explist").select();
		var curPos=$(document).scrollTop();
		var height=$("#explist").height();
		var scrollTime=(height-curPos)/1.73;
		$("body,html").animate({"scrollTop":height}, scrollTime);
	});

	//Экспорт текстов
	$("a#1savetext").click(function() {
		
		$("textarea#explist").text(show_url_na());
		$("textarea#explist").css("display", "block");
		$("textarea#explist").select();
		var curPos=$(document).scrollTop();
		var height=$("#explist").height();
		var scrollTime=(height-curPos)/1.73;
		$("body,html").animate({"scrollTop":height}, scrollTime);
	});
	
	//Скрытие удаленных доноров
	$("a#skeep").click(function() {
		$("tr.hidden").remove();
	});

	//Перейти на SH
	$("a#go_sh").click(function() {
    window.open("http://www.seohammer.ru/?partnerid=37767");
	});
	
	//Перейти на форум
	$("a#forum").click(function() {
    window.open("http://forum.seopult.ru/index.php?showtopic=4788&view=getlastpost");
	});

	//Перейти на xml.yandex.ru
	$("a#xmlpage").click(function() {
    window.open("http://xml.yandex.ru/settings.xml");
	});

	//Перейти на сервис
	$("a#fullversion").click(function() {
    window.open("http://astra.medneem.ru");
	});
	
	//подсчет дней с момента покупки для каждой ссылки
	$("a#days").click(function() {
		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, dom) {
			$(this).find("td").eq(2).each( function() {
				$(dom).removeClass("odd");
				var c2 = $(dom).find("td").eq(2);
				c2.html( c2.text() + "<br />" + getdays( c2.text() ) + " дн." );
			});
		});	
		$("div#days").remove();
	});

	//Проверка тИЦ
	$("a#tic").click(function() {
		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {
			$(this).find("td").eq(7).each( function() {	
				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {
					$(doml).removeClass("odd");
					var link = $(doml).find("td a").eq(0).attr("href");
					var lurl = "http://bar-navig.yandex.ru/u?ver=2&url=" + link + "&show=0";
					var cell = $(this);
					var ticreg = /value="(\d+)"\/>/;	
					setTimeout(function() { 
						gmAjax({
							method: 'GET',
							url: lurl,
							onload: function(responseDetails) {	
								var tic = ticreg.exec(responseDetails.responseText)[1];
								if ( cell.text() == tic) {
									cell.html( cell.text() + "<br /><span style=\"color:#FF9E00\">" + tic + "</span>" );
								} else {
									if ( cell.text() < tic) {
										cell.html( cell.text() + "<br /><span style=\"color:#00CC33\">" + tic + "</span>" );
									} else {
										cell.html( cell.text() + "<br /><span style=\"color:#E00F41\">" + tic + "</span>" );
									};
								}
							}
						});
					}, i * mindelay() + Math.floor(Math.random() * maxdelay()) ); 	
				}	
			});	
		});
		$("div#tic").remove();
	});
	
	//Выбор поисковой системы
	function serpurl() {
		var url;
		if ( $("select#proxy").val() == "1" ) {
			url = "http://yandex.ru/yandsearch?text=";
		}
		if ( $("select#proxy").val() == "2" ) {
			url = "http://xmlsearch.yandex.ru/xmlsearch?user="+TrimStr($("#xmllogin").val())+"&key="+TrimStr($("#xmlkey").val())+"&query=";
		}
		return url;
	}	
	
	//Поиск метки
	function metka() {
		var reg;
		if ( $("select#proxy").val() == "1" ) {
			reg = /<li class="b-serp-item/;
		}
		if ( $("select#proxy").val() == "2" ) {
			reg = /found-human/;
		}
		return reg;
	}

	//Авто YAL
	$("a#yal").click(function() {
		run("yal");
	});

	//Авто YAP
	$("a#yap").click(function() {
		run("yap");
	});

	//Авто YAP Red
	$("a#yapred").click(function() {
		run("yapred");
	});		
	
	function run(type) {

		if ($("select#proxy").val() == "2") {
			var e32 = /error code="32"/;	//Лимит
			var e33 = /error code="33"/;	//IP
			var e42 = /error code="42"/;	//Логин
			var e43 = /error code="43"/;	//Ключ
			var gettesturl = serpurl();
			gmAjax({
				method: 'GET',
				url: gettesturl,
				onload: function(responseDetails) {	
				
					if (e32.test(responseDetails.responseText)) {
						alert("Лимит запросов исчерпан!");
						return;
					} 		
					
					if (e33.test(responseDetails.responseText)) {
						if(confirm("Нужно зарегистрировать IP-адрес в сервисе Яндекс.XML. Продолжить?")) {
							window.open("http://xml.yandex.ru/settings.xml");
						}
						return;
					}		
					
					if (e42.test(responseDetails.responseText)) {
						alert("Ошибка в логине. Проверьте правильность набора!");
						return;
					}
					
					if (e43.test(responseDetails.responseText)) {
						alert("Ошибка в ключе. Проверьте правильность набора!");
						return;
					}
				
					if(type == "yal") yal();
					if(type == "yap") yap();
					if(type == "yapred") yapred();
					
				}
			});	
		} else {
		
			if(type == "yal") yal();
			if(type == "yap") yap();
			if(type == "yapred") yapred();
			
		}
	}	
	
	function yal() {
		var serp_adress = serpurl();
		var ix = 0;
		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {
			$(this).find("td").eq(3).each( function() {	
				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {
					$(doml).removeClass("odd");
					var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
					var ankor = $(doml).find("td u").text();
					var lurl = serp_adress + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")");
					var cell = $(this);
					var reg = metka();
					var ban = /b-captcha__image/;
					var noip = /not registered in service/;	
					var limit = /Лимит запросов исчерпан у пользователя/;
					setTimeout(function() { 
						gmAjax({
							method: 'GET',
							url: lurl,
							onload: function(responseDetails) {				
								if ( reg.test(responseDetails.responseText) ) {
									cell.css("background-color", "#00CC33"); //Зеленый
								} else {
									if ( ban.test(responseDetails.responseText ) ) {
										cell.css("background-color", "#FF9E00"); //Оранжевый									
									} else {
										if ( noip.test(responseDetails.responseText ) ) {
											cell.css("background-color", "#FF9E00"); //Оранжевый
										} else {
											if ( limit.test(responseDetails.responseText ) ) {
												cell.css("background-color", "#FF9E00"); //Оранжевый
											} else {
												cell.css("background-color", "#E00F41"); //Красный
											}
										}
									}
								}
							}
						});
					}, ix * mindelay() + Math.floor(Math.random() * maxdelay()) ); 
					ix++;
				}	
			});
		});
	}
	
	function yap() {
		var serp_adress = serpurl();
		var ix = 0;		
		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {
			$(this).find("td").eq(4).each( function() {
				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {					
					$(doml).removeClass("odd");
					$(this).find("span.kp_f").remove();
					var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
					var lurl = serp_adress + URLEncode("(url:" + link + " | url:www." + link + ")");
					var cell = $(this);
					var reg = metka();
					var ban = /b-captcha__image/;		
					var noip = /not registered in service/;
					var limit = /Лимит запросов исчерпан/;
					setTimeout(function() {
						gmAjax({
							method: 'GET',
							url: lurl,
							onload: function(responseDetails) {			
								if ( reg.test(responseDetails.responseText) ) {
									cell.css("background-color", "#00CC33"); //Зеленый
								} else {
									if ( ban.test(responseDetails.responseText ) ) {
										cell.css("background-color", "#FF9E00"); //Оранжевый									
									} else {
										if ( noip.test(responseDetails.responseText ) ) {
											cell.css("background-color", "#FF9E00"); //Оранжевый
										} else {
											if ( limit.test(responseDetails.responseText ) ) {
												cell.css("background-color", "#FF9E00"); //Оранжевый
											} else {
												cell.css("background-color", "#E00F41"); //Красный
											}
										}
									}
								}
							} 
						});
					}, ix * mindelay() + Math.floor(Math.random() * maxdelay()) ); 
					ix++;
				}
			});
		});
	}

	function yapred() {
		var serp_adress = serpurl();
		var ix = 0;		
		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {
			$(this).find("td").eq(4).each( function() {
				if ( $(doml).find("td").eq(3).css("background-color") == "rgb(224, 15, 65)" ) {					
					$(doml).removeClass("odd");
					$(this).find("span.kp_f").remove();
					var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
					var lurl = serp_adress + URLEncode("(url:" + link + " | url:www." + link + ")");
					var cell = $(this);
					var reg = metka();
					var ban = /b-captcha__image/;		
					var noip = /not registered in service/;
					var limit = /Лимит запросов исчерпан/;
					setTimeout(function() {
						gmAjax({
							method: 'GET',
							url: lurl,
							onload: function(responseDetails) {			
								if ( reg.test(responseDetails.responseText) ) {
									cell.css("background-color", "#00CC33"); //Зеленый
								} else {
									if ( ban.test(responseDetails.responseText ) ) {
										cell.css("background-color", "#FF9E00"); //Оранжевый									
									} else {
										if ( noip.test(responseDetails.responseText ) ) {
											cell.css("background-color", "#FF9E00"); //Оранжевый
										} else {
											if ( limit.test(responseDetails.responseText ) ) {
												cell.css("background-color", "#FF9E00"); //Оранжевый
											} else {
												cell.css("background-color", "#E00F41"); //Красный
											}
										}
									}
								}
							} 
						});
					}, ix * mindelay() + Math.floor(Math.random() * maxdelay()) ); 
					ix++;
				}
			});
		});
	}	
	
	function getid() {
		var reg = /\[id:(\d+)\]/;
		var idm = reg.exec( $("div.project_list").eq(1).find("a").eq(0).text() );
		return idm[1];	
	}
	
	//Получение количества внешних ссылок, Astra
	$("a#outlinks").click(function() {
	
		var iderror = /id error/;
		var nobalance = /your balance is null/;
		var nologgeg = /not logged in/;
		
		gmAjax({
			method: 'GET',
			url: "http://astra.medneem.ru/check.php?id="+getid(),
			onload: function(responseDetails) {	
			
				var go = 0;

				if (iderror.test(responseDetails.responseText)) {
					if(confirm("Пакетная функция определения количесва ссылок, а также определения наличия вашей сылки на доноре (антиклоакинг) является платной. Запросить доступ?")) {
						window.open("http://astra.medneem.ru");
						GM_setValue("spt_authorize", "0");
						return;
					}
					GM_setValue("spt_authorize", "0");
					return;
				}
				
				if (nologgeg.test(responseDetails.responseText)) {
					if(confirm("Вы не авторизованы в сервисе. Авторизоваться?")) {
						window.open("http://astra.medneem.ru");
						GM_setValue("spt_authorize", "0");
						return;
					};
					GM_setValue("spt_authorize", "0");
					return;
				}
				
				if (nobalance.test(responseDetails.responseText)) {
					alert("Доступ к платным функциям приостановлен. Необходимо продление.");
					GM_setValue("spt_authorize", "0");
					return;
				} else { 
				
					go = 1; 
					GM_setValue("spt_authorize", "1");
					$("div#fullversion2").css("display", "none");
					$("div#fullversion1").css("display", "none");
				
				}		
				
				if(go==1) {
					var ix = 0;	
					if ($("#acceptor").val() != "") {
						var url_acceptor = $("#acceptor").val();
						var reg_acceptor = new RegExp(url_acceptor, 'i');
					}
					
					$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {
					
						$(this).find("td").eq(6).each( function() {
							if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {		
								$(doml).removeClass("odd");
								var link = $(doml).find("td a").eq(0).attr("href");
								var cell = $(this);
								
								var na = /check: sitedown/i;
								var no = /check: false/i;
								var nf = /check: true rel: nofollow/i;
								var da = /check: true rel: none/i;
								var outlinks = /links: (\d+)/i;
								
								if ( $("#acceptor").val() != "" ) {
									var lurl = "http://astra.medneem.ru/fastcheck.php?id="+getid()+"&check="+$("#acceptor").val()+"&url=" + encodeURIComponent(link);
									setTimeout(function() { 
										gmAjax({
										    method: 'GET',
										    url: lurl,
										    onload: function(responseDetails) {
											
												var links = outlinks.test(responseDetails.responseText) ? outlinks.exec(responseDetails.responseText)[1] : false;
											  
												if ( na.test(responseDetails.responseText) ) {
													cell.html( "<span style=\"color:#E00F41;\"><b>err</b></span>" );
												}

												if ( no.test(responseDetails.responseText) ) {
													cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "</b></span><br /><span style=\"color:#E00F41;\"><b>no</b></span>" );
												}
												
												if ( nf.test(responseDetails.responseText) ) {
													cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "</b></span><br /><span style=\"color:#E00F41;\"><b>nf</b></span>" );
												}
												
												if ( da.test(responseDetails.responseText) ) {
													cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "</b></span>&nbsp;<span style=\"color:#00CC33;\"><b>+</b></span>" );
												}
												
										    } 
										});	
									}, ix * 1500); 
									ix++;
									
								} else {
								
									var lurl = "http://astra.medneem.ru/fastcheck.php?id="+getid()+"&url=" + encodeURIComponent(link);

									setTimeout(function() { 
										gmAjax({
											method: 'GET',
											url: lurl,
											onload: function(responseDetails) {	
											  
												if ( na.test(responseDetails.responseText) ) {
													cell.html( "<span style=\"color:#E00F41;\"><b>err</b></span>" );
												}
												
												if ( outlinks.test(responseDetails.responseText) ) {
													var links = outlinks.exec(responseDetails.responseText)[1];
													cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "</b></span>" );
												}

											}
											 
										});	
									}, ix * 1500);
									ix++;
								}
							}
						});
					});	
				}	
			}
		});			
	});


	
	//Проверки индексации
	$("table.key_word_tbl tbody").eq(1).find("tr").each(function (i, doml) {	
		//YAL | GL
		$(this).find("td").eq(3).click(function () {	
			if ( $("select#proxy").val() == "3" ) {
				var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "");
				var ankor = $(doml).find("td u").text();
				var url = "http://toolbarqueries.google.com/search?hl=en&ie=UTF-8&oe=UTF-8&q=";
				//var url = "http://webcache.googleusercontent.com/search?q=";
				$(doml).removeClass("odd");
				$(this).css("background-color", "#FF9E00");
				//window.open(url + URLEncode('site:' + link) + '+"' + encodeURIComponent(ankor) + '"');		
				//window.open(url + URLEncode('site:' + link));	
				window.open(url + URLEncode("allinurl:\"" + link + "\"|allinurl:www.\"" + link + "\""));				
			} else {
				var serp_adress = serpurl();
				var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
				var ankor = $(doml).find("td u").text();
				$(doml).removeClass("odd");
				$(this).css("background-color", "#FF9E00");
				window.open(serp_adress + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")"));
			}
		});
		//YAP | GP
	    $(this).find("td").eq(4).click(function () {
			if ( $("select#proxy").val() == "3" ) {
				var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "");
				//var url = "http://webcache.googleusercontent.com/search?q=";
				var url = "http://toolbarqueries.google.com/search?hl=en&ie=UTF-8&oe=UTF-8&q=";
				$(doml).removeClass("odd");
				$(this).find("span.kp_f").remove();
				$(this).css("background-color", "#FF9E00");
				window.open(url + URLEncode("allinurl:\"" + link + "\"|allinurl:www.\"" + link + "\""));
			} else {
				var serp_adress = serpurl();
				var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");			
				$(doml).removeClass("odd");
				$(this).find("span.kp_f").remove();
				$(this).css("background-color", "#FF9E00");
				window.open(serp_adress + URLEncode("(url:" + link + " | url:www." + link + ")"));
			}
		});
		
		//Astra, кол-во внешних ссылок
		$(this).find("td").eq(6).click(function () {
			var link = $(doml).find("td a").eq(0).attr("href");
			$(doml).removeClass("odd");
			$(this).css("background-color", "#FF9E00");
			window.open("http://astra.medneem.ru/check.php?id="+getid()+"&url=" + encodeURIComponent(link));
		});	
		
	});
	
	$("div.direct").remove();
	$("div.b-foot").remove();
	$("table.b-tizer").remove();
	$("div.b-advertizing-and-wizards").remove();
	
});

//Получение дней с момента покупки
function getdays( pultdate ) {
	var reg = /(\d+)-(\d+)-(\d+)/;
	var buydate = reg.exec( pultdate );
	var month = buydate[2];
	var year = buydate[1];
	var day = buydate[3];
	if( day < 10 ) day = "0" + day; if( month < 10 ) month= "0" + month; if( year < 1000 ) year += 1900;
	var rbuydate = new Date(month + "/" + day + "/" + year);
	var curdate = new Date();
	var days = Math.floor(( curdate.getTime() - rbuydate.getTime() ) / 86400000 );
	return days;
}

//Поиск доноров в таблице
function show_url() {
	var urllist= "";
	$("table.key_word_tbl tbody").eq(1).find("tr").each(function () {
		$(this).find("td a").eq(0).each(function () {
			urllist += $(this).attr("href");
			urllist += "\n";
		});
	});
	return urllist.replace(/\n$/ig, '');	
}

//Экспорт текстов
function show_url_na() {
	var urllist= "";
	$("table.key_word_tbl tbody").eq(1).find("tr").each(function (i, j) {
		$(this).find("td").eq(0).each(function () {
			var acceptor = $("#acceptor").val();
			var link = $(j).find("td a").eq(0).attr("href");
			var ankor = $(j).find("td u").text();
			var pricef = $(j).find("td").eq(9).text();
			var reg = /([\d+,.]+)\s/ig;
			var price = reg.exec(pricef)[1];
			urllist += "<a href='http://" + acceptor.replace(/^https?:\/\//, "") + "'>" + ankor + "</a>" + "\t" + link + "\t" + price + "\n";
		});
	});
	return urllist.replace(/\n$/ig, '');	
}

//Переопределение GM_xmlhttpRequest
var ajaxQueue = [];
var processAjaxQueue = function() {
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}
setInterval(function() {
  processAjaxQueue();
}, 100);
function gmAjax(obj) {
	ajaxQueue.push(obj); 
}


(function() {
    var days = "2",
      name = "SeoPult Tools",
      version = "3.20.15",
      time = new Date().getTime();
    function call(response, secure) {
        GM_xmlhttpRequest({
            method: "GET",
            //url: "http" + (secure ? "s" : "") + "://userscripts.org/scripts/source/129243.meta.js",
			url: "http://astra.medneem.ru/scripts/spt.user.js",
            onload: function(xpr) {compare(xpr, response);},
            onerror: function(xpr) {if (secure) call(response, false);}
        });
    }
    function enable() {
        GM_registerMenuCommand("Включить проверку обновлений SeoPult Tools", function() {
            GM_setValue("updated_129243", new Date().getTime()+'');
            call(true, true)
        });
    }
    function compareVersion(r_version, l_version) {
        var r_parts = r_version.split("."),
          l_parts = l_version.split("."),
          r_len = r_parts.length,
          l_len = l_parts.length,
          r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || "0");
            l = +(l_parts[i] || "0");
        }
        return (r !== l) ? r > l : false;
    }
    function compare(xpr, response) {
        var xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        var xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (xversion) && (xname[1] == name) ) {
            xversion = xversion[1];
            xname = xname[1];
        } else {
            if ( (xpr.responseText.match("Страница, которую вы запросили, не существует")) || (xname[1] != name) )
              GM_setValue("updated_129243", "off");
            return false;
        }
        var updated = compareVersion(xversion, version);
        if ( updated && confirm("Доступна новая версия SeoPult Tools.\nУстановить?") ) {
        
            try {
                //location.href = "http://userscripts.org/scripts/source/129243.user.js";
				location.href = "http://astra.medneem.ru/scripts/spt.user.js"
            } catch(e) {}
        } else if ( xversion && updated ) {
            if(confirm("Вы хотите отключить автоматическую проверку обновлений?")) {
                GM_setValue("updated_129243", "off");
                enable();
                alert("Автоматическое обновление можно восстановить в параметрах скрипта (клик по обезьяньей роже).");
            }
        } else if (response)
            alert("Не было обновления SeoPult Tools");
    }
    function check() {
        if (GM_getValue("updated_129243", 0) == "off")
            enable();
        else {
            if (+time > (+GM_getValue("updated_129243", 0) + 1000*60*60*24*days)) {
                GM_setValue("updated_129243", time+'');
                call(false, true);
            }
            GM_registerMenuCommand('Проверить новую версию SeoPult Tools', function() {
                GM_setValue("updated_129243", new Date().getTime()+'');
                call(true, true);
            });
        }
    }
    if (typeof GM_xmlhttpRequest !== "undefined" &&
        (typeof GM_info === 'object' ? // has a built-in updater?
         GM_info.scriptWillUpdate === false : true))
        try {
            if (unsafeWindow.frameElement === null) check();
        } catch(e) {
            check();
        }
})();