// ==UserScript==
// @name           Jury script (alpha version)
// @namespace      vladislav
// @include        http://football.hiblogger.net/authors/*/*.html*
// ==/UserScript==

// Инициализируем таблицу перевода
var trans = [];
for (var i = 0x410; i <= 0x44F; i++)
  trans[i] = i - 0x350; // А-Яа-я
trans[0x401] = 0xA8;    // Ё
trans[0x451] = 0xB8;    // ё

// Переопределяем функцию escape()
function uencode(str)
{
  var ret = [];
  // Составляем массив кодов символов, попутно переводим кириллицу
  for (var i = 0; i < str.length; i++)
  {
    var n = str.charCodeAt(i);
    if (typeof trans[n] != 'undefined')
      n = trans[n];
    if (n <= 0xFF)
      ret.push(n);
  }
  return escape(String.fromCharCode.apply(null, ret));
}


// post() function
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
function post(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: data
});
}

function juri_rate_article() {
rate=prompt("Поставьте оценку за статью по шкале 1-10", "10");
var handleResponse;
xtitle=document.title;
// 27374 - ворскла, 27137 - я
xcontent="<p>"+document.title+"<br>"+document.location.href+"<br><br>Оценка: "+rate+"</p>";
if (rate) { post("http://football.hiblogger.net/messages/save.html","to=27374&reply_for=0&switched_rte_on=0&title="+uencode(xtitle)+"&content="+uencode(xcontent)+"&submit=%EE%F2%EF%F0%E0%E2%E8%F2%FC+%F1%EE%EE%E1%F9%E5%ED%E8%E5",handleResponse);
alert('Готово!');
}

}
GM_registerMenuCommand("Поставить оценку", juri_rate_article);