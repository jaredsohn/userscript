// ==UserScript==
// @name UzTest.ru автоматическое решение тестов 
// @version 1.1
// @description Выводит решение около задания во время тестирования
// @author Дмитрий Соболев
// @include uztest.ru/*
// @include http://uztest.ru/*
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
	
	if (/http:\/\/uztest.ru/.test(w.location.href) || /uztest.ru/.test(w.location.href))
	{
		// добавляем jQuery
		function addJQuery(callback) 
		{
		  var script = document.createElement("script");
		  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		  script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
			document.body.appendChild(script);
		  }, false);
		  document.body.appendChild(script);
		}
		
		function main() {
			var img = document.querySelector('img[onclick="img_resize2(this);"]');
			if (img !== null)
			{
				var src = img.src;
				jQ('<br>&nbsp;Решение:<br><img src="http://manoq.com/uz/get.php?question='+src+'">').insertAfter(img);			
			}
		}
		
		addJQuery(main);
	}
})(window);
