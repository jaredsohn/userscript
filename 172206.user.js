// ==UserScript==
// @name Автоматический перевод текстов Klavogonki.ru
// @version 1.0
// @description Выводит перевод текста в словаре «Обычный in English»
// @author Дмитрий Соболев (manok)
// @include klavogonki.ru/*
// @include http://klavogonki.ru/*
// ==/UserScript==

(function(window, undefined) 
{
	var w;
	  
	if (typeof unsafeWindow != undefined) 
	{ 
		w = unsafeWindow;
	} 
	else 
	{ 
		w = window;
	}
  
	if (w.self != w.top)
	{
		return;
	}
	
	if (/http:\/\/klavogonki.ru/.test(w.location.href) || /klavogonki.ru/.test(w.location.href))
	{
		var jQ = w.jQuery.noConflict();
		var mainc = jQ('#main-block');
		var loc = window.location.href;
		var res = loc.substr(loc.indexOf('?gmid=') + 6); 
		if (res > 0 && loc.indexOf('?gmid=') > 0)
		{
			jQ.ajax({
				type: "POST",
				url: "http://klavogonki.ru/g/" + res + ".info",
				data: { need_text: 1 }
			}).done(function( msg ) {
					var obj = jQ.parseJSON(msg);
					res = obj.text.text;
					if ("voc" in obj.params && obj.params.voc.id == 5539) {
						res = '<br><br><b>* Перевод на русский:</b><br><iframe id=translatem src="http://manoq.com/googletr.php?text='+res+'" style="width: 100%; height: auto; max-height: 100px; border: 0; margin: 0;"></iframe>';
						jQ("<div style='background: none repeat scroll 0 0 #EBEBEB; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px; text-align: left; padding: 10px; margin: 15px 0; width: 710px;'> " + res + " </div>").insertAfter(mainc);
					}
			});
		}
	}
})(window);
