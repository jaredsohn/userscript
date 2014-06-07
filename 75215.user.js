var scr_meta = <><![CDATA[
// ==UserScript==
// @name        LinkFeed Tools - monitor
// @author      medneem
// @version     1.0.0
// @namespace   LinkFeed Tools - monitor
// @description Дополнение к LinkFeed
// @source      http://userscripts.org/scripts/show/75158
// @identifier  http://userscripts.org/scripts/show/75158.user.js
// @include     http://linkfeed.ru/links_opt/list_ok_for_project/*
// @include     http://*.linkfeed.ru/links_opt/list_ok_for_project/*
// @include     http://yandex.ru/msearch?text=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
]]></>.toString();

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
	for (var i = 0; i < str.length; i++)
	{
		var n = str.charCodeAt(i);
		if (typeof trans[n] != 'undefined')
		n = trans[n];
		if (n <= 0xFF)
		ret.push(n);
	}
	return escape((String.fromCharCode.apply(null, ret)).replace(/\s/g, "+")) ;
};

$(document).ready(function() {

	//Добавляем меню
	$("table.re_data thead").prepend("<tr><th colspan=\"12\" style=\"padding: 5px 5px\"><div id=\"save\" style=\"float:left; padding-right: 10px\"><a id=\"save\" href=\"javascript:void(0)\">Экспорт списка доноров</a></div><div id=\"proxy\" style=\"float:left; padding-right: 10px\"><select id=\"proxy\" title=\"Выберите поисковую систему для проверки индексации страниц и ссылок\"><option value=\"1\" selected=\"selected\">yandex.ru</option><option value=\"2\">m.ya.ru</option><option value=\"3\">xmlsearch</option></select></div><div id=\"yal\" style=\"float:left; padding-right: 10px\"><a id=\"yal\" href=\"javascript:void(0)\" title=\"YAL\">YAL</a></div><div id=\"yap\" style=\"float:left; padding-right: 10px\"><a id=\"yap\" href=\"javascript:void(0)\" title=\"YAP\">YAP</a></div><div id=\"forum\" style=\"float:left; padding-right: 10px\"><a id=\"forum\" href=\"javascript:void(0)\" title=\"Перейти на форум\">Перейти на форум</a></div></th></tr>");

	//Экспорт списка доноров
	$("a#save").click(function() {
        popup(show_url());
	});
	
	//Выбор поисковой системы
	function serpurl() {
		var url;
		if ( $("select#proxy").val() == "yandex.ru") {
			url = "http://yandex.ru/yandsearch?text=";
		}
		if ( $("select#proxy").val() == "m.ya.ru") {
			url = "http://yandex.ru/msearch?text=";
		}
		if ( $("select#proxy").val() == "xmlsearch") {
			url = "http://xmlsearch.yandex.ru/xmlsearch?query=";
		}
		return url;
	}	
	
	//Поиск метки
	function metka() {
		var reg;
		if ( $("select#proxy").val() == "yandex.ru") {
			reg = /div class="fe"/;
		}
		if ( $("select#proxy").val() == "m.ya.ru") {
			reg = /ul class="b-results"/;
		}
		if ( $("select#proxy").val() == "xmlsearch") {
			reg = /found-human/;
		}
		return reg;
	}
	
	//Авто YAL
	$("a#yal").click(function() {	
	    $("table.re_data tbody").find("tr").each(function(i, doml) {
			$(doml).find("td").eq(3).each( function() {
				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {
					var link = $(doml).find("td").eq(5).find("a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
					var ankor = $(doml).find("td").eq(3).find("u").text();
					var lurl = serpurl() + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")");
					var cell = $(this);
					var reg = metka();
					//alert(lurl);
					var ban = /captcha.yandex.net/;	
					var noip = /not registered in service/;					
					gmAjax({
						method: 'GET',
						url: lurl,
						onload: function(responseDetails) {				
							if ( reg.test(responseDetails.responseText) ) {
								cell.css("background-color", "#00CC33");
							} else {
								if ( ban.test(responseDetails.responseText ) ) {
									cell.css("background-color", "#FF9E00");									
								} else {
									if ( noip.test(responseDetails.responseText ) ) {
										cell.css("background-color", "#FF9E00");
									} else {
										cell.css("background-color", "#E00F41");
									}
								};
							};
						}
					});
				}
			});
		});
	});
	
	//Авто YAP
	$("a#yap").click(function() {	
	    $("table.re_data tbody").find("tr").each(function(i, doml) {
			$(doml).find("td").eq(5).each( function() {
				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {			
					var link = $(doml).find("td").eq(5).find("a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
					var lurl = serpurl() + URLEncode("url:" + link + " | url:www." + link + "");
					var cell = $(this);
					var reg = metka();
					var ban = /captcha.yandex.net/;	
					var noip = /not registered in service/;					
					gmAjax({
						method: 'GET',
						url: lurl,
						onload: function(responseDetails) {			
							if ( reg.test(responseDetails.responseText) ) {
								cell.css("background-color", "#00CC33");
							} else {
								if ( ban.test(responseDetails.responseText ) ) {
									cell.css("background-color", "#FF9E00");									
								} else {
									if ( noip.test(responseDetails.responseText ) ) {
										cell.css("background-color", "#FF9E00");
									} else {
										cell.css("background-color", "#E00F41");
									}
								};
							};					
						}
					});
				}
			});
		});
	});

	//Перейти на форум
	$("a#forum").click(function() {
		window.open("http://forum.linkfeed.ru/showthread.php?5836-LinkFeed-Tools-monitor&goto=newpost");
	});
	
	//Проверки индексации
	$("table.re_data tbody").find("tr").each(function (i, doml) {
		//YAL
	    $(this).find("td").eq(3).click(function () { 
			var link = $(doml).find("td").eq(5).find("a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
			var ankor = $(doml).find("td u").text();
			$(this).css("background-color", "#FF9E00");
			window.open(serpurl() + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")"));
		});
		//YAP
	    $(this).find("td").eq(5).click(function () {
			var link = $(doml).find("td").eq(5).find("a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");
			$(this).css("background-color", "#FF9E00");
			window.open(serpurl() + URLEncode("url:" + link + " | url:www." + link + ""));
		});			
	});
	
	$("div.direct").remove();
	$("div.b-foot").remove();
});

//Поиск доноров в таблице
function show_url() {
	var urllist= "";
        $("table.re_data tbody").find("tr").each(function () {
            $(this).find("td").eq(5).find("a").eq(0).each(function () {
                urllist += $(this).attr("href");
				urllist += "\n";
			});
        });
    return urllist;	
}

//Вывод списка доноров в окне
function popup(data) {
	var generator = window.open('', 'Экспорт', 'height=400, width=600, scrollbars=1');
		generator.document.write('<html xmlns="http://www.w3.org/1999/xhtml"><head>');
		generator.document.write('<meta http-equiv="content-type" content="text/html;charset=utf-8"/>');
		generator.document.write('<title>Экспорт</title>');
		generator.document.write('</head><body>');
		generator.document.write('<textArea readonly="readonly" cols=70 rows=22 wrap="off" >');
		generator.document.write(data);
		generator.document.write('</textArea>');
		generator.document.write('</body></html>');
		generator.document.close();
	return true;
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

//Автообновление скрипта. Взято с http://userscripts.org/scripts/show/38017
var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '75158', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("страница не существует")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
	if ( (+this.xversion > +this.version) && (confirm('Доступна новая версия скрипта '+this.xname+'. Хотите обновить?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Выключить автообновление?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Включить автообновление "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Проверить вручную новую версию скрипта можно через меню "Команды скрипта...".');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('Новая версия скрипта ' + this.name + ' еще не вышла');
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  check: function() {
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Вышла новая версия "+this.name+"", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Проверка новой версии "+this.name+"", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();