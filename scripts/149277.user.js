// ==UserScript==
// @name       PlayerStat
// @namespace   http://virtualssoccer.ru
// @version 1.1
// @description Персональная статистика игрока
// @include     http://www.virtualsoccer.ru/player.php*
// @include     http://www.virtualsoccer.biz/player.php*
// @include     http://www.virtualsoccer.kz/player.php*
// @include     http://www.simsoccer.ru/player.php*
// @include     http://www.fifa08.ru/player.php*
// @include     http://www.vsol.su/player.php*
// @include     http://www.vsol.org/player.php*
// @include     http://www.vsol.ws/player.php*
// @include     http://www.vsol.biz/player.php*
// @include     http://www.vsol.info/player.php*
// @include     http://www.vfliga.com/player.php*
// @include     http://www.vfliga.biz/player.php*
// @include     http://www.vfliga.info/player.php*
// @include     http://www.vfliga.cc/player.php*
// @include     http://www.vfleague.com/player.php*
// @include     http://www.vfleague.biz/player.php*
// @include     http://www.vfleague.info/player.php*
// @include     http://www.vfleague.cc/player.php*
// @include     https://www.virtualsoccer.ru/player.php*
// @include     https://www.virtualsoccer.biz/player.php*
// @include     https://www.virtualsoccer.kz/player.php*
// @include     https://www.simsoccer.ru/player.php*
// @include     https://www.fifa08.ru/player.php*
// @include     https://www.vsol.su/player.php*
// @include     https://www.vsol.org/player.php*
// @include     https://www.vsol.ws/player.php*
// @include     https://www.vsol.biz/player.php*
// @include     https://www.vsol.info/player.php*
// @include     https://www.vfliga.com/player.php*
// @include     https://www.vfliga.biz/player.php*
// @include     https://www.vfliga.info/player.php*
// @include     https://www.vfliga.cc/player.php*
// @include     https://www.vfleague.com/player.php*
// @include     https://www.vfleague.biz/player.php*
// @include     https://www.vfleague.info/player.php*
// @include     https://www.vfleague.cc/player.php*
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var plus = 0;
var minus = 0;
var captain = 0;
var MoM = 0;
var MoT = 0;
var WoM = 0;
var WoT = 0;
var rating = 0;
var matches = 0;
var ttlMatchRate = 0.0;
var newRow;

newRow =	'' 
		+	'<tr><td colspan="17">' 
		+ 	'<div class="slider">Расчет статистики:</div>'
		+		'<div class="sliding hid">'
		+			'<table id="shortStatTbl">'
		+				'<tr>'
		+					'<td>Событие</td><td>Результат</td><td>Количество оценочных баллов</td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td>Всего игр</td><td id="nMatches"></td><td><input type="text" id="vMatches" value="0"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#00FF00">Плюс балл силы</td><td id="nPluses"></td><td><input type="text" id="vPluses" value="5"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#FF0000">Минус балл силы</td><td id="nMinuses"></td><td><input type="text" id="vMinuses" value="-4"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td>Капитан</td><td id="nCaps"></td><td><input type="text" id="vCaps" value="0"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#00FF00">MoM</td><td style="color:#00FF00" id="nMoMs"></td><td><input type="text" id="vMoMs" value="3"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#009900">MoT</td><td style="color:#009900" id="nMoTs"></td><td><input type="text" id="vMoTs" value="2"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#990000">WoT</td><td style="color:#990000" id="nWoTs"></td><td><input type="text" id="vWoTs" value="-1"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td style="color:#FF0000">WoM</td><td style="color:#FF0000" id="nWoMs"></td><td><input type="text" id="vWoMs" value="-2"></td>'
		+				'</tr>'
		+				'<tr>'
		+					'<td>Средняя оценка</td><td id="avgMatchRate"></td><td><input type="text" id="v_avgMatchRate" value="0"></td>'
		+				'</tr>'
		+			'</table>'
		+			'<input type="button" id="getRate" value="Получить рейтинг">'
		+		'</div>'
		+	'</td></tr>';
	
$(document).ready(function() {
	//Добавляем новую строку, задаем свойства slider'а и sliding'а.
	$('.tbl tbody').after(newRow);
	$('.slider').css('cursor', 'pointer').css('borderWidth', '1px').css('borderColor', 'black').css('margin', 		'10px');
	$('.hid').hide();	
	$('.slider').click(function() {
		if ( $('.sliding').hasClass('hid') ) {
			$('.sliding').removeClass('hid').slideDown('fast');
		} else {
			$('.sliding').toggleClass('hid').slideUp('fast');
		}
	});
	//Кнопка Получить оценку
	$('#getRate').click(function() {
		$('#shortStatTbl tr').each(function() {			
			if ( $(this).children().eq(2).find('input').val() ) {
				rating += parseInt($(this).children().eq(1).text()) * parseInt($(this).children().eq(2).find('input').val());
			}
		});
		$('.sliding').append('<div style="margin: 10px; font-size: 12px;">Рейтинг игрока: <span style="font-size: 14px;">' + rating + '</span></div>');
	});
	
	//Работаем с таблицей игрока
	$('.tbl tr').each(function(){
	//1 столбец: день[число]
	
	//2 столбец: день[месяц год]
	
	//3 столбец: капитан
		//Расчитывае количество капитанств
		if ($(this).children().eq(2).html() == '+') {
			captain++;
		}
	//4 столбец: баллы силы	
		//Расчитываем плюсы баллов силы
		if ($(this).children().eq(3).children().attr('title') == 'Плюс балл силы') {
			plus++;
		}
		//Расчитываем минусы баллов силы
		if ($(this).children().eq(3).children().attr('title') == 'Минус балл силы') {
			minus++;
		}
	//5 столбец: матч
	
	//6 столбец: результат матча
	
	//7 столбец: счет матча
	
	//8 столбец: соревнование
	
	//9 столбец: позиция
	
	//10 столбец: сила
	
	//11 столбец: фолы
	
	//12 столбец: удары / отразил ударов
	
	//13 столбец: голевые пасы
	
	//14 столбец: голов забито / пропущено
	
	//15 столбец: карточки
	
	//16 столбец: Дополнительные сведения
		//Количество MoM
		if ($(this).children().eq(15).children().html() == 'MoM') {
			MoM++;
		}
		//Количество MoT
		if ($(this).children().eq(15).children().html() == 'MoT') {
			MoT++;
		}
		//Количество WoT
		if ($(this).children().eq(15).children().html() == 'WoT') {
			WoT++;
		}
		//Количество WoM
		if ($(this).children().eq(15).children().html() == 'WoM') {
			WoM++;
		}
	//17 столбец:  Оценка
		//Средняя оценка		
		if ( $(this).children().eq(16).children().html() && $(this).children().eq(16).children().html() != "-" ) {
			ttlMatchRate += parseFloat($(this).children().eq(16).children().html());
			matches++;
		}
	});
		
	//Заносим данные в табличку
	$('#nMatches').text(matches);
	$('#nPluses').text(plus);
	$('#nMinuses').text(minus);
	$('#nCaps').text(captain);
	$('#nMoMs').text(MoM);
	$('#nMoTs').text(MoT);
	$('#nWoTs').text(WoT);
	$('#nWoMs').text(WoM);
	$('#avgMatchRate').text((ttlMatchRate/matches).toFixed(2));
});