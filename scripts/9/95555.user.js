// ==UserScript==
// @name Old Good Gamer.ru
// @author Fr3nzy
// @version 1.2
// @include http://*gamer.ru*
// @description Old Good Gamer.ru
// @namespace http://google.ru
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
	if (window.location.hostname.match(/gamer.ru/)) {
		$("head style").each(function(){
                    $(this).remove();
                });
                /*$("#conteiner > div").eq(2).hide();*/
                $("#bottom").css("overflow","hidden");
	}
})();