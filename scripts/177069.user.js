// ==UserScript==
// @name        iks:Copy_of_sales
// @namespace   virtonomica
// @description  Копирование политики сбыта, работает через куки, поэтому можно разносить на все нужные предприятия
// @include     http://*virtonomic*.*/*/main/unit/view/*/sale
// @include     http://*virtonomic*.*/*/main/unit/view/*/sale/*
// @version     1
// ==/UserScript==

var run = function() {
    var p = false;
    var code;

    $('div[id$="/0"]:has(input.buttonMiniAdd)').each(function(){
        var idStr = $(this).attr('id').replace('/', '-');
        var code = '<div style="float:left; margin-top:2px;" ><input id="botCopyScript'+idStr+'" name="'+idStr+'" type="button" value="Копировать" style="cursor: pointer;" />&nbsp;<input id="botValScript'+idStr+'" name="'+idStr+'"  type="button" value="Вставить" style="cursor: pointer;" /></div>';
        $(this).append(code);
    });

    $('input[id^="botCopyScript"]').click(function (){
        var strCopy = $('#'+$(this).attr('name')).html();
        if(strCopy) setCookie(strCopy);
    });
    
    $('input[id^="botValScript"]').click(function (){
        var cooki = getCookie();
        if(cooki) $('#'+$(this).attr('name')).html(cooki);
    });

    // Установить куки
    function setCookie(strCopy) {
    	var expires = new Date(); // получаем текущую дату
    	expires.setTime(expires.getTime() + (60 * 60 * 1000)); // срок - 1 час, но его можно изменить
    	document.cookie = "cookie_copySbyt=" + escape(strCopy) + "; expires=" + expires.toGMTString() +  "; path=/";
    }
    // Получить куки
    function getCookie() {
	   var cookie_name = "cookie_copySbyt=";
	   var cookie_length = document.cookie.length;
	   var cookie_begin = 0;

	   while (cookie_begin < cookie_length) {
		  value_begin = cookie_begin + cookie_name.length;
		  if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
			 var value_end = document.cookie.indexOf (";", value_begin);
			 if (value_end == -1) {
				value_end = cookie_length;
			 }
			 return unescape(document.cookie.substring(value_begin, value_end));
		  }
		  cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
		  if (cookie_begin == 0) {
			 break;
		  }
	   }
	   return false;
    }
    
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}