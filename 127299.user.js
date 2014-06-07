// ==UserScript==
// @name saleBtnInUnitList
// @description Добавляет кнопку "Сбыт" в списке подразделений
// @author cobra3125
// @license MIT
// @version 1.1
// @include http://virtonomica.*/*/main/company/view/*/unit_list
// ==/UserScript==


// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function(window, undefined ) {

  // [2] нормализуем window
  var w;
  
  if (typeof unsafeWindow != undefined){
    w = unsafeWindow 
  } else {
    w = window;  
  }

  // [3] не запускаем скрипт во фреймах
  // без этого условия скрипт будет запускаться несколько раз на странице с фреймами

  if (w.self != w.top){
    return;
  }

	 // a function that loads jQuery and calls a callback function when jQuery has finished loading
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	


	// the guts of this userscript
	function main() {
  // [4] дополнительная проверка наряду с @include
  if (/http:\/\/virtonomica\..*\/.*\/main\/company\/view\/.*\/unit_list$/.test(window.location)){
    //Ниже идёт непосредственно код скрипта
	$('.u-b').each(function() {
	   var row = jQuery(this).parent().children("td.u-c");
	   if(row.hasClass('i-mill') ||  row.hasClass('i-fishingbase') ||  row.hasClass('i-workshop') ||  row.hasClass('i-animalfarm') ||  row.hasClass('i-warehouse') ||  row.hasClass('i-mine') ||  row.hasClass('i-orchard') ||  row.hasClass('i-sawmill') ||  row.hasClass('i-farm')  ) {
	     var link = row.children("a");
		 $(this).append('&nbsp;<a href="' + link.attr("href") + '/sale" target="blank">Сбыт</a>');
		}
	});
  }
	}

	// load jQuery and execute the main function
	addJQuery(main);
})(window);