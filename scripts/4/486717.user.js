// ==UserScript==
// @name        Srunkoscript
// @namespace   1chan
// @include     http://*1chan.ru/*
// @include     http://1chan.inach.org/*
// @include     http://*1chan.ca/*
// @version     1.1
// ==/UserScript==


//Подключение
var $ = unsafeWindow.jQuery;

var hiddens = localStorage['hiddens'];
if (hiddens) {
	var toHideArr = hiddens.split(',');
}
else {
	var toHideArr = [];
}

var going;
var fadetimer;


//Кнопки скрытия
var images = $("img[src*='rghost.ru']");
$(images).parent().after("<span class='shithide' style='position: absolute; opacity: 0; cursor: pointer; vertical-align: top; text-decoration: none; color: #777; margin-left: 4px;'><img src='http://1chan.ru/ico/delete.gif' title='Скрыть говно'/></span>");
$(images).on({
	"mouseenter" : function(){
		if (fadetimer) window.clearTimeout(fadetimer);
		$(this).parent().next().css("opacity", "1");
	},
	"mouseleave" : function(){
		var thisImg = $(this);
		fadetimer = window.setTimeout(function(){
			$(thisImg).parent().next().css("opacity", "0");
		}, 500);
	}
});

$(".shithide").on({
	"mouseenter" : function(){
		if (fadetimer) window.clearTimeout(fadetimer);
		$(this).css("opacity", "1");
	},
	"mouseleave" : function(){
		$(this).css("opacity", "0");
	},
	"click" : function(){
		var imgID = ($(this).prev().children().attr('src')).split('/');
		toHideArr.push(imgID[3]);
		localStorage['hiddens'] = toHideArr;
	}
});

//Кнопка сброса, глаз Хуечичи
var reset = $(document.createElement("div"))
	.attr("id", "Eye")
	.css({"position" : "absolute", "left" : "344px", "top" : "60px", "width" : "20px", "height" : "20px"})
	.append($("<div id='subEye' style='display: none; background: #FFFFFF; border-radius: 50%; width: 100%; height: 100%;'></div>"))
	.appendTo(".b-header-block")
	.click(function(){
		$("#subEye").fadeIn(100).fadeOut(500);
		hideShit(1);
		toHideArr = [];
		localStorage.removeItem('hiddens');
});

//Glistooh death
function hideShit(mode) { //0 - Скрыть, 1 - Показать
	for (var i = 0; i < toHideArr.length; ++i) {
		var shit = $("img[src*='"+toHideArr[i]+"']").parent().parent().parent().parent();
		var display = $(shit).css("display");
		if (mode == 1) {
			if (display == "none") $(shit).slideDown(400);
		} else {
			if (display != "none") $(shit).slideUp(200);
		}
	}
}

//Автообновление страницы при новых постах
function pageRefresh() {
	if (($("#post_notify").css('display') == "block") && (going != true)) {
		going = true;
		document.location.href = window.location;
	}
}

//Повторяющаяся функция
setInterval(function() {
	hideShit(0);
	pageRefresh();
}, 500); //Интервал скрытия

//Святой жопы калчок, аминь!