var scr_meta = <><![CDATA[

// ==UserScript==

// @name        SeoPult Tools extend

// @author      medneem, icedogas 

// @version     3.9.2

// @namespace   SeoPult Tools

// @description Дополнение к SeoPult 

// @identifier  http://userscripts.org/scripts/show/63110.user.js

// @include     http://seopult.ru/keyword_links.html*

// @include     http://www.seopult.ru/keyword_links.html*

// @include     http://yandex.ru/msearch?text=*

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js

// ==/UserScript==

]]></>.toString();



//http://www.yandex.ru/cy?base=0&host=

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

	$("table.key_word_tbl").eq(1).find("thead").prepend("<tr><th colspan=\"13\" style=\"padding-top: 8px; ; border-bottom: 1px solid #FFFFFF; cursor:default;\"><div id=\"save\" style=\"float:left; padding: 0px 10px\"><a id=\"save\" href=\"javascript:void(0)\" title=\"Экспорт доноров из текущей таблицы\">Экспорт доноров</a></div><div id=\"saven\" style=\"float:left; padding-right: 10px;\"><a id=\"saven\" href=\"javascript:void(0)\" title=\"Экспорт доноров с непроинднексированными анкорами\">Экспорт доноров с Н.А.</a></div><div id=\"skeep\" style=\"float:left; padding-right: 10px\"><a id=\"skeep\" href=\"javascript:void(0)\" title=\"Скрыть удаленные доноры для повторного экспорта\">Скрыть удаленные</a></div><div id=\"days\" style=\"float:left; padding-right: 10px\"><a id=\"days\" href=\"javascript:void(0)\" title=\"Подсчет дней с момента покупки для каждой ссылки\">Подсчет дней</a></div><div id=\"tic\" style=\"float:left; padding-right: 10px\"><a id=\"tic\" href=\"javascript:void(0)\" title=\"Проверка тИЦ\">тИЦ</a></div><div id=\"proxy\" style=\"float:left; padding-right: 10px\"><select id=\"proxy\" title=\"Выберите поисковую систему для проверки индексации страниц и ссылок\"><option value=\"1\" selected=\"selected\">yandex.ru</option><option value=\"2\">m.ya.ru</option><option value=\"3\">xmlsearch</option><option value=\"4\">nigmasearch</option></select></div><div id=\"yal\" style=\"float:left; padding-right: 10px\"><a id=\"yal\" href=\"javascript:void(0)\" title=\"Автоматическая проверка индексации ссылки\">YAL</a></div><div id=\"yap\" style=\"float:left; padding-right: 10px\"><a id=\"yap\" href=\"javascript:void(0)\" title=\"Автоматическая проверка индексации страницы\">YAP</a></div><div id=\"astra\" style=\"float:left; padding-right: 10px\"><a id=\"astra\" style=\"color:#FF0000\" href=\"javascript:void(0)\" title=\"Astra Page Analyzer\">Astra Page Analyzer</a></div><div id=\"forum\" style=\"float:left; padding-right: 10px\"><a id=\"forum\" href=\"javascript:void(0)\" title=\"Перейти на форум\">Перейти на форум</a></div><div id=\"outlinks\" style=\"float:left; padding: 0px 10px; clear:both \"><a id=\"outlinks\" href=\"javascript:void(0)\" title=\"Определение внешних ссылок\">Внешние ссылки</a> + поиск акцептора <input id=\"getacceptor\" type=\"checkbox\" name=\"checkbox\" value=\"checkbox\" /><input id=\"acceptor\" type=\"text\" name=\"textfield\" /></div><div style=\"float: left; padding: 0px 10px;\" id=\"outlinks\">Ссылка старая, если ей <input type=\"text\" name=\"textfield\" id=\"dayday\"> дней - </div><div id=\"dayy\" style=\"float: left; padding: 0px 10px;\"> <a href=\"javascript:void(0)\" id=\"dayy\">да</a></div> </th></tr>");

$("a#dayy").click(function() {

    var yjednei = $("#dayday").val() *1; //сколько нужно

 $("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {

var daynum = $(this).find("td").eq(2).find("#archiveday").text() *1; // сколько стоит

if (daynum>=yjednei)  { 

if ( $(this).find("td").eq(4).css("background-color") == "rgb(224, 15, 65)"){

//alert(daynum);

var erty = $(this).find("td").eq(11).find('input:checkbox').val();

$(this).find("td").eq(11).find('input:checkbox').val([erty]);



}



}



});

	});

  

  //ЧТЕНИЕ ЗНАЧЕНИЙ

  //Чтение значения типа поисковой системы

  if ( GM_getValue("spt_proxy_type") ) {

    $("select#proxy").val(GM_getValue("spt_proxy_type")); 

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

  });

  //Поиск акцептора

  $("#getacceptor").click(function () {

    GM_setValue("spt_getacceptor", $("#getacceptor").attr('checked'));

  }); 

  //URL акцептора

  $("#acceptor").change(function () {

    GM_setValue("spt_acceptor", $("#acceptor").val());

  });

		  

	//Экспорт списка доноров

	$("a#save").click(function() {

		popup(show_url());

	});



	//Экспорт списка доноров с непроиндексированными анкорами

	$("a#saven").click(function() {

		popup(show_url_na());

	});

	

	//Скрытие удаленных доноров

	$("a#skeep").click(function() {

		$("tr.hidden").remove();

	});



	//подсчет дней с момента покупки для каждой ссылки

	$("a#days").click(function() {

		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, dom) {

			$(this).find("td").eq(2).each( function() {

				$(dom).removeClass("odd");

				var c2 = $(dom).find("td").eq(2);

var datadata = getdays(c2.text());



if (datadata>=20)  { var clr = 'red' }



				c2.html( c2.text() + "<br /><span id='archiveday' style='color: "+clr+"';>" + getdays( c2.text() ) + "</span> дн." );

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

				}	

			});

		});

		$("div#tic").remove();

	});

	

	//Выбор поисковой системы

	function serpurl() {

		var url;

		if ( $("select#proxy").val() == "yandex.ru" ) {

			url = "http://yandex.ru/yandsearch?text=";

		}

		if ( $("select#proxy").val() == "m.ya.ru" ) {

			url = "http://yandex.ru/msearch?text=";

		}

		if ( $("select#proxy").val() == "xmlsearch" ) {

			url = "http://xmlsearch.yandex.ru/xmlsearch?query=";

		}
		if ( $("select#proxy").val() == "nigmasearch" ) {

			url = "http://nigma.ru/?yn=1&s=";

		}

		return url;

	}	

	

	//Поиск метки

	function metka() {

		var reg;

		if ( $("select#proxy").val() == "yandex.ru" ) {

			reg = /div class="b-body-items"/;

		}

		if ( $("select#proxy").val() == "m.ya.ru" ) {

			reg = /ul class="b-results"/;

		}

		if ( $("select#proxy").val() == "xmlsearch" ) {

			reg = /found-human/;

		}
		if ( $("select#proxy").val() == "nigmasearch" ) {

			reg = /div id="results"/;

		}

		return reg;

	}



	//Авто YAL

	$("a#yal").click(function() {	

    var serp_adress = serpurl();

		$("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {

			$(this).find("td").eq(3).each( function() {	

				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {

					$(doml).removeClass("odd");

					var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");

					var ankor = $(doml).find("td u").text();

					var lurl = serp_adress + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")");

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

	

	//Авто YAP

	$("a#yap").click(function() {

	    var serp_adress = serpurl();    

	    $("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {

var aaa = $(this);

			$(this).find("td").eq(4).each( function() {



				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {		

					$(doml).removeClass("odd");

					var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");

					var lurl = serp_adress + URLEncode("url:" + link + " | url:www." + link + "");

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

aaa.find("td").eq(11).find('input:checkbox').click();







									}

								};

							};

						} 

					});

				}

			});

		});



	});



	//Получение количества внешних ссылок, Astra

	$("a#outlinks").click(function() {

    //$("div#outlinks").remove();

    var url_acceptor = $("#acceptor").val();

    var reg_acceptor = new RegExp(url_acceptor, 'i');

    

    //alert(reg_acceptor);

	    $("table.key_word_tbl tbody").eq(1).find("tr").each( function(i, doml) {

			$(this).find("td").eq(6).each( function() {

				if ( $(this).css("background-color") != "rgb(0, 204, 51)" && $(this).css("background-color") != "rgb(224, 15, 65)" ) {		

					$(doml).removeClass("odd");

					var link = $(doml).find("td a").eq(0).attr("href");

					var lurl = "http://astra.medneem.ru/index.php?URL=" + encodeURIComponent(link);

					var cell = $(this);

          var na = /Нет доступа к странице или редирект!/;

					var outlinks = /id="outlinks">(\d+)<\/span>/;

                                        var inlinks = /id="inlinks">(\d+)<\/span>/;

					if ( $("#getacceptor").attr('checked') ) {

            gmAjax({

              method: 'GET',

              url: lurl,

              onload: function(responseDetails) {	

                cell.html();

                if ( na.test(responseDetails.responseText) ) {

                  cell.html( "<span style=\"color:#E00F41;\"><b>err</b></span>" );

                } else {

                  if ( reg_acceptor.test(responseDetails.responseText) ) {

                    var links = outlinks.exec(responseDetails.responseText)[1];	

 		    var links2 = inlinks.exec(responseDetails.responseText)[1];		

                    cell.html( "<span style=\"color:#00CC33;\"><b>" + links +"/" + links2 + "</b></span>" );  

                  } else {

                    var links = outlinks.exec(responseDetails.responseText)[1];	

		    var links2 = inlinks.exec(responseDetails.responseText)[1];		

                    cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "/" +links2 + "</b></span><br /><span style=\"color:#E00F41;\"><b>no</b></span>" );               

                  }

                } 

              } 

            });	

					} else {

            cell.html();

            gmAjax({

              method: 'GET',

              url: lurl,

              onload: function(responseDetails) {	

                if ( na.test(responseDetails.responseText) ) {

                  cell.html( "<span style=\"color:#E00F41;\"><b>err</b></span>" );

                } else {

                  var links = outlinks.exec(responseDetails.responseText)[1];		

                  var links2 = inlinks.exec(responseDetails.responseText)[1];	

                  cell.html( "<span style=\"color:#00CC33;\"><b>" + links + "/" + links2 + " </b></span>" );

                }

              } 

            });					

					}

				}

			});

		});

	});



	//Перейти на форум

	$("a#forum").click(function() {

    window.open("http://forum.seopult.ru/index.php?showtopic=4788&view=getlastpost");

	});

	

	//Перейти на Asta

	$("a#astra").click(function() {

    window.open("http://astra.medneem.ru");

	});

	

	//Проверки индексации

	$("table.key_word_tbl tbody").eq(1).find("tr").each(function (i, doml) {	

		//YAL

    var serp_adress = serpurl();

	  $(this).find("td").eq(3).click(function () {	

			var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");

			var ankor = $(doml).find("td u").text();

			$(doml).removeClass("odd");

			$(this).css("background-color", "#FF9E00");

			window.open(serp_adress + URLEncode("\"" + ankor + "\" (url:" + link + " | url:www." + link + ")"));

		});

		//YAP

		var serp_adress = serpurl();

	  $(this).find("td").eq(4).click(function () {

      var link = $(doml).find("td a").eq(0).attr("href").replace(/^https?:\/\//, "").replace(/^www./, "").replace(/\/$/, "");

			$(doml).removeClass("odd");

			$(this).css("background-color", "#FF9E00");

			window.open(serp_adress + URLEncode("url:" + link + " | url:www." + link + ""));

		});

		//Astra, кол-во внешних ссылок

		$(this).find("td").eq(6).click(function () {

			var link = $(doml).find("td a").eq(0).attr("href");

			$(doml).removeClass("odd");

			$(this).css("background-color", "#FF9E00");

			window.open("http://astra.medneem.ru/index.php?URL=" + encodeURIComponent(link));

		});	

	});

	

	$("div.direct").remove();

	$("div.b-foot").remove();

	$("table.b-tizer").remove();

	

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

  return urllist;	

}



//Поиск в таблице доноров с непроиндексированными анкорами

function show_url_na() {

	var urllist= "";

  $("table.key_word_tbl tbody").eq(1).find("tr").each(function (i, dom) {

    $(this).find("td a").eq(0).each(function () {

      if ( $(dom).find("td").eq(3).css("background-color") == "rgb(224, 15, 65)" ) {

        urllist += $(this).attr("href");

        urllist += "\n";

      }   

    });

  });

  return urllist;	

}



//Вывод списка доноров в окне

function popup(data) {

	var generator = window.open('', 'Экспорт', 'height=400, width=600, scrollbars=1');

	generator.document.write('<html xmlns="http://www.w3.org/1999/xhtml"><head>');

	generator.document.write('<meta http-equiv="content-type" content="text/html;charset=utf-8"/>');

	generator.document.write('<title>Экспорт</title></head><body>');

	generator.document.write('<textArea readonly="readonly" cols=70 rows=22 wrap="off" >');

	generator.document.write(data);

	generator.document.write('</textArea></body></html>');

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

  id: '63110', // Script id on Userscripts.org

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

      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 

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