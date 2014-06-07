// ==UserScript==
// @name           macaques
// @version        0.8
// @namespace      macaques
// @description    macaques
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/comments/*
// @author         ---
// ==/UserScript==

/**
*	Настройки
*/
var Settings = new Object();

// Показывать предупреждение о наличии в посте врагов (0 - выключить, 1 - включить)
Settings.show_macaques_warning 	= 0;
// Показывать предупреждение об окончании работы (0 - выключить, 1 - включить)
Settings.show_done_notification	= 1;
// Отсреливать врагов или нет (0 - выключить, 1 - включить)
Settings.shoot_macaques			= 1;
// Плюсовать друзей или нет (0 - выключить, 1 - включить)
Settings.give_to_goodguys		= 1;
// Показывать процесс работы в статусной строке (0 - выключить, 1 - включить) [не реализовано]
Settings.show_shoot_progress	= 1;
// Минимальное время между голосованиями в секундах
Settings.vote_min_time			= 1;
// Максимальное время между голосованиями в секундах
Settings.vote_max_time			= 5;
// Минимальное количество комментариев, за которые нужно проголосовать, в процентах от общего количества
Settings.vote_min_comments		= 50;
// Максимальное количество комментариев, за которые нужно проголосовать, в процентах от общего количества
Settings.vote_max_comments		= 100;
// Голосовать рандомно (0 - выключить, 1 - включить)
Settings.vote_rnd		= 0;

//блок стилей для отрисовки плавающего окна прогресса.
var css = "\
	.macaques-block { \
		position: fixed; \
		top: 45px; \
		right: 0px; \
		z-index: 100; \
	} \
	.macaques-block span { \
		display: block; \
		color: #000000; \
		border: 1px solid #ccc; \
		padding: 5px 10px; \
		margin-bottom: 1px; \
		font-size: 75%; \
		cursor: pointer; \
	} \
	.macaques-block span:hover { \
		color: #FF0000; \
		border: 1px solid #000; \
	} \
";

style = document.createElement("STYLE");
style.type = "text/css";
style.innerHTML = css;
document.body.appendChild(style);
delete style;

//Внедрим блок с прогрессом в страницу:
function InitializeMacLink() {
	var macBlock = document.createElement("DIV");
	macBlock.className = "macaques-block";
	macBlock.id = "macaques-block";
	
	macLink = document.createElement("SPAN");
	macLink.appendChild(document.createTextNode("YARRRRRRR"));
	macLink.addEventListener("click", macHide, false);
	
	macBlock.appendChild(macLink);

	document.body.appendChild(macBlock);
}
InitializeMacLink()

//скрыть нах макако-блок
function macHide() {
document.getElementById("macaques-block").style.display = 'none';
}


// Окончательный список голосования с учетом настроек		
var votes						= new Array();
// Текущая позиция в списке голосования
var pos 						= 0;
// Переменная для хранения текущего таймаута
var t 							= null;			
	


/**
*	Проверяет наличие значения в массиве
*/
Array.prototype.exists = function() {
	var value = arguments[0];
			
	for (var i = 0; i < this.length; i ++ ) {
		if ( this[i] == value ) {
			return ( true );
		}
	}
}

/*
*	Окончание работы
*/
function End() {
	votes = null;
	pos = 0;
	window.clearTimeout( t );
	// выдадим сообщение об окончании работы скрипта
	if ( Settings.show_done_notification ) {

		var rightbox = document.getElementById("macaques-block").childNodes[0];

			if(!rightbox)
			return;

		rightbox.innerHTML = rightbox.innerHTML + '<br>' +
		'<b>[+]</b> ' + amount_plus + 
		'<br>' +
 		'<b>[-]</b> ' + amount_minus;

		//alert( 'That\'s all, folks!' );
	}
}

/**
*	Функция голосования
*/		
function ShootMacaquesVote() {
	// проголосуем
	unsafeWindow.vote(votes[pos]);
	// развернем комментарий
	// unsafeWindow.noShrink(votes[pos]);
	// сбросим интервал
	window.clearTimeout( t );
	// подсветка комментариев [выключить нафиг]
	// votes[pos].parentNode.getElementsByTagName( "SPAN" )[0].style.backgroundColor = votes[pos].className == "plus" ? "blue" : "red";
			
	// перейдем к следующему комментарию
	if ( votes[++pos] ) {
		RunShootMacaquesVote();
	}
	else {
		End();
	}
}
				
/**
*	Функция запуска голосования с учетом интервалов
*/
function RunShootMacaquesVote()
{
	// в списке голосования есть еще комментарии
	if ( votes[pos] ) {
		//Если включено отображение прогресса:
		if ( Settings.show_shoot_progress ) {
			document.getElementById("macaques-block").childNodes[0].innerHTML="votes: " + (pos + 1) + "/" + votes.length;
		}

		// вычислим временной интервал
		var rnd = Math.floor( (Settings.vote_max_time - Settings.vote_min_time - 1) * Math.random() ) + Settings.vote_min_time;
		// запустим функцию голосования
		t = window.setTimeout( function() { ShootMacaquesVote(); }, rnd * 1000);
	}
	// сбросим переменные и закончим работу
	else {
		End();
	}
}

// список врагов
var macaques 	= new Array();
var minus 		= new Array();
// список друзей
var goodguys 	= new Array();
var plus 		= new Array();

var amount_minus = 0;
var amount_plus = 0;

// составим список врагов
macaques.push( 'xxx' );
macaques.push( 'xxx' );
macaques.push( 'xxx' );
// ...


// составим список хороших парней
goodguys.push( 'Nexis' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
// ...


// слой контента
var content_d = document.getElementById( 'content' );

// получим массив слоев в слое контента
var divs = content_d.getElementsByTagName( 'DIV' );

//посчитаем слои
var cnt = divs.length;



for ( var i = 0 ; i < cnt; i++ )  {
	// если это комментарий
	if ( divs[i].className == 'dd' ) {
		// получим список ссылок в нем
		var links = divs[i].getElementsByTagName( 'A' );
		for ( var j = 0; j < links.length; j++ ) {
			// если это ссылка с именем пользователя
			if ( links[j].href.indexOf( '/users/' ) != -1 ) {
				// проверим, не макака ли он
				if ( macaques.exists( links[j].innerHTML ) ) {
					for ( var k = 0; k < links.length; k++ ) {
						// сохраним ссылку на минус
						if ( links[k].className == 'minus' ) {
							minus.push( links[k] );
						}
					}
				}
				// проверим, а вдруг это хороший парень?
				if ( goodguys.exists( links[j].innerHTML ) ) {
					for ( var k = 0; k < links.length; k++ ) {
						// сохраним ссылку на плюс
						if ( links[k].className == 'plus' ) {
							plus.push ( links[k] );
						}
					}
				}
			}
		}
	}
}

// убьем массивы для экономии памяти
divs = null;
content_d = null;

// если включен отстрел
if ( Settings.shoot_macaques ) {
	// покажем предупреждение о врагах, если это нужно
	var shoot = true;
	if ( Settings.show_macaques_warning ) {
		shoot = window.confirm( 'Macaques detected. Shoot\'em up?' );
	}

	// составим список
	if ( shoot ) {
		// а есть ли вообще комментарии врагов?
		if ( minus.length ) {
			// посчитаем, сколько комментов отминусовать в этот раз
			var rnd = Math.floor( (Settings.vote_max_comments - Settings.vote_min_comments) * Math.random() ) + Settings.vote_min_comments;
			if ( Settings.vote_rnd )
				var amount_minus = Math.floor( (minus.length / 100) * rnd );
			else
				var amount_minus = minus.length;
				
			// минусовать нужно как минимум один комментарий
			//amount = amount < 1 ? 1 : amount;
	
			// соберем список комментариев на минус
			for ( var i = 0; i < amount_minus; i++ ) {
				votes.push( minus[i] );
			}
		}
	}
}

// если включен плюсомет
if ( Settings.give_to_goodguys ) {
	// а есть ли вообще комментарии наших чуваков?
	if ( plus.length ) {
		// посчитаем, сколько комментов плюсовать в этот раз
		var rnd = Math.floor( (Settings.vote_max_comments - Settings.vote_min_comments) * Math.random() ) + Settings.vote_min_comments;
		if ( Settings.vote_rnd )
			var amount_plus = Math.floor( (plus.length / 100) * rnd );
		else
			var amount_plus = plus.length;
		
		// плюсовать нужно как минимум один комментарий
		//amount = amount < 1 ? 1 : amount;
					
		// соберем список комментариев на плюс
		for ( var i = 0; i < amount_plus; i++ ) {
			votes.push( plus[i] );
		}
	}
}

// пыщь!
if( votes.length ) {
	RunShootMacaquesVote( votes );
}
else macHide();//если ничо нету, спрячем с глаз долой окошко.