// ==UserScript==
// @name           8327
// @version        0.6
// @namespace      8327
// @description    8327
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
Settings.shoot_macaques			= 0;
// Плюсовать друзей или нет (0 - выключить, 1 - включить)
Settings.give_to_goodguys		= 1;
// Показывать процесс работы в статусной строке (0 - выключить, 1 - включить) [не реализовано]
//Settings.show_shoot_progress	= 0;
// Минимальное время между голосованиями в секундах
Settings.vote_min_time			= 1;
// Максимальное время между голосованиями в секундах
Settings.vote_max_time			= 5;
// Минимальное количество комментариев, за которые нужно проголосовать, в процентах от общего количества
Settings.vote_min_comments		= 50;
// Максимальное количество комментариев, за которые нужно проголосовать, в процентах от общего количества
Settings.vote_max_comments		= 100;

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
		alert( 'That\'s all, folks!' );
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

// составим список врагов
macaques.push( 'xxx' );
macaques.push( 'xxx' );
macaques.push( 'xxx' );
macaques.push( 'xxx' );
macaques.push( 'xxx' );
macaques.push( 'xxx' );


// ...
// составим список хороших парней
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );
goodguys.push( 'xxx' );



// ...

// слой контента
var content		= document.getElementById( 'content' );			
// получим массив слоев в слое контента
var divs 		= content.getElementsByTagName( 'DIV' );

var cnt 		= divs.length;
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
// убьем массив для экономии памяти
divs = null;

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
			var rnd = Math.floor( (Settings.vote_max_comments - Settings.vote_min_comments - 1) * Math.random() ) + Settings.vote_min_comments;
			var amount = Math.floor( (minus.length / 100) * rnd );
				
			// минусовать нужно как минимум один комментарий
			amount = amount < 1 ? 1 : amount;
					
			// соберем список комментариев на минус
			for ( var i = 0; i < amount; i++ ) {
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
		var rnd = Math.floor( (Settings.vote_max_comments - Settings.vote_min_comments - 1) * Math.random() ) + Settings.vote_min_comments;
		var amount = Math.floor( (plus.length / 100) * rnd );
			
		// плюсовать нужно как минимум один комментарий
		amount = amount < 1 ? 1 : amount;
									
		// соберем список комментариев на плюс
		for ( var i = 0; i < amount; i++ ) {
			votes.push( plus[i] );
		}
	}
}

// пыщь!
if( votes.length ) {
	RunShootMacaquesVote( votes );
} 
