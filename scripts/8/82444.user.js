// ==UserScript==
// @name          Sovserv petuh stalya
// @description	  Petuh - ne chelovek
// @author        Bratuha	
// @include       http://sovserv.ru/vbb/showthread.php*
// ==/UserScript==

var $;
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

function letsJQuery() {
	petuh = 
[
 "Вчера меня не ебали.",
 "Я - петушок, и ничего с этим не поделать.",
 "Работу ищу пять лет.",
 "Меня сегодня никто не трахал. Я сидел на параше, огромной и вонючей. Пацаны в камере о чем-то спорили, и тут раздался мой голос, похожий на визгливое кукарекание. Неожиданно пацаны посмотрели на меня своими маленькими добрыми глазками и начал урчать. Потом они достали банку сгущенки из моего ануса и стали меня ею кормить из ложечки. Конечно, это было невозможно. Я начал кукарекать, стонать. Это было очень обидно. Но я не мог ничего им противопоставить. Ещё одно сильное нажатие - и мой рот полон сладкой теплой сгущенки. Я почувствовал струйки молока, стекающие по моему горлу. Я истошно орал. А они факти кормили меня как ребенка, ну и любовались мной. Вкусной сгущенкой они наполнили мне желудок. И сердце. А когда я закашлял, сгущенка вышла через нос и рот. Они ещё раз погладили меня по голове и уложили на теплые нары. Петух — тожде человек, и сегодня ему предстоит очень хорошая ночь, - сказал одни из них. Всё равно меня бы трахнули менты. А пацаны наполнил мою жизнь смыслом. И удовольствием.",
 "Чё ты мне сгущенку засунул, блядь? Чё ты мне сгущенку засунул, блядь? Чё ты мне сгущенку засунул, блядь? Давай делай сгущенку быстро, блядь. Сгущенку высовывай, блядь. Сгущенку высовывай, блядь. Сгущенку высовывай, блядь. Давай, ставь, епты, блядь!",
];
	$(".n b:contains('stalinets')").text('петушок').parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().find("div:first").each(function(index, value) {
		kukareky = petuh[Math.floor(Math.random()*petuh.length)];
		$(this).text(kukareky);
	});
        $(".n b:contains('stalinets')").text('петушок');
}