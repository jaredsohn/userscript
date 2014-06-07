// ==UserScript==
// @name           TestPwn
// @namespace      http://attachments.wetpaintserv.us/*
// ==/UserScript==

// Подсоединим мутулсы чтобы не ипать себе мозг
var GM_MT = document.createElement("script");
GM_MT.src = "http://phiffer.org/mootools-1.2.1-gm.js";
GM_MT.type = "text/javascript";

document.body.appendChild(GM_MT);

var checker=setInterval(function(){
	if(typeof (unsafeWindow.MooTools) != "undefined") {
		//alert('Особлива улична магия?!');
		clearInterval(checker);
		runMoo();
	}
},100);


// Поехали!
function runMoo() {
	$ = unsafeWindow.$;
	$$ = unsafeWindow.$$;
	
	$$('input, textarea, select').each(function(i){
		// Как вы уже догадались, все ответы хранятся в нумерованном массиве ansMap
		// В некоторых тестах варианты ответа "зашифрованы"
		
		// Номер "зашифрован" в атрибуте name
		var a = i.name.match(/[0-9]+/); // "Дешифровка"
		
		if (a != null) {
			var j = a[0]-1;
			
			// "Расшифровываем" ответ и записываем в поле!
			i.value = unsafeWindow.TranslateAnswer(unsafeWindow.ansMap[j], j);
		}
	});

}