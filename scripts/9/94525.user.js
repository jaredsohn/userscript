// ==UserScript==
// @name			Fast General Function For Ikariam - Lite Version
// @namespace		Fast General Function For Ikariam - Lite Version
// @description		Быстрый доступ к функциям генерала альянса (атаки на альянс)
// @autor			ShotgunX
// @version			0.4.2
// @include			http://s*.*.ikariam.*/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// -------------------------------------------------------------------------------
// @history 0.4.5	09.01.2011 - Lite version of this script
// @history 0.4.2	BugFix - Теперь есть сообщение, когда нет посольства
// @history 0.4.1	JQuery API
// @history 0.3.1	Координаты
// @history 0.2.2	BugFix - добавление упущенных разновидностей нападений
// @history 0.2.1	Сообщение об атаках в альянс... R.I.P.
// @history 0.1.4	BugFix - Теперь есть сообщение, когда нет атак
// @history 0.1.3	Автовыбор города, работа на любом сервере
// @history 0.1.2	Автообновление
// @history 0.1.1	Первый выпуск
// ==/UserScript==

var patterns = [/http\:\/\/s([0-9]+)\.([a-z]+)\.ikariam\.com/,
				/\<div class=\"contentBox01h\"\>([\W\w\s]+)\<\/div\>\<\!\-\-contentBox01h/,
				/\<tr class=\"rowRanks\"\>([\W\w\s]+?)\<\/tr\>/g,
				/\<td\>([\W\w\s]+?)\<\/td\>[\s]+\<td\>(.*?)\<\/td\>[\s]+\<td\>(.*?)\<\/td\>[\s]+\<td\>(.*?)\<\/td\>[\s]+\<td\>(.*?)\<\/td\>/,
				/\<tr class=\"rowRanks\"\>\<td colspan=\"6\"\>([\W\w\s]+?)\<\/tr\>/,
				/\<span class=\"island\"\>([A-Za-z]+)(\[[0-9]+\:[0-9]+\])\<\/span\>/]; 

var rtime = Math.floor(Math.random() * (70000 - 50000 + 1)) + 50000;
var server = patterns[0].exec(location.href);
var z=0;
var coordlength = 0;

// Добавление стилей, запуск основной функции
function cityornot() {
	if($('#locations').length) {
		GM_addStyle('#selecttown {background:#FFEACF;border-top:1px dotted #E4B873;border-bottom:1px dotted #E4B873;text-align:center;padding:3px 5px;font-size:10px;}\
		#loading {background:#FFEACF;border-top:1px dotted #E4B873;border-bottom:1px dotted #E4B873;text-align:center;padding:3px 0;}\
		#loading img {width:15px;} #loading2 img {width:25px;}\
		#attacks {margin:0px;width:218px;background:#FFEACF;border-bottom:1px dotted #E4B873;}\
		#attacks td {border-top:1px dotted #E4B873;font-size:10px;text-align:left;vertical-align:middle;padding-top:3px;padding-bottom:3px;}\
		#attacks #attack {width:74px;padding-left:5px;}\
		#attacks #preimg {width:17px;}\
		#attacks #preimg img {width:15px;}\
		#attacks #attackimg {width:25px;}\
		#attacks #attackimg img {width:25px;}\
		#attacks #nextimg {width:17px;text-align:center !important;}\
		#attacks #nextimg img {width:7px;}\
		#attacks #defense {width:75px;padding-right:5px;}\
		#attacksadv {display:none;position:absolute;z-index:40;top:-32px;left:243px;background:#FFEACF;border:3px double #5E492A;-moz-box-shadow:1px 1px 4px #000;padding:5px;}\
		#attacks2 {margin:0px;background:#FFEACF;border-bottom:1px dotted #E4B873;}\
		#attacks2 td {border-top:1px dotted #E4B873;text-align:left;vertical-align:middle;padding-top:3px;padding-bottom:3px;white-space:nowrap;}\
		#attacks2 #title {background:#F6EBBC;font-weight:bold;overflow:hidden;height:auto;}\
		#attacks2 .master2 {background:#FDF7DD;}\
		#attacks2 #time2 img {max-width:20px;}\
		#attacks2 #time, #attacks2 #time2, #attacks2 #units, #attacks2 #attack, #attacks2 #defense, #attacks2 #attackimg {padding-left:5px;padding-right:5px;}\
		#attacks2 #units {text-align:center !important;}\
		#attacks2 #attack, #attacks2 #defense {min-width:100px}\
		#attacks2 #preimg, #attacks2 #nextimg {min-width:21px;}\
		#attacks2 #attackimg {min-width:35px;}\
		#mailRecipient, #mailSubject, .maillabels {margin:auto;width:400px;}\
		#mailRecipient label, #mailSubject label, .maillabels label {font-weight:bold;}\
		textarea.textfield#text {width:400px;height:130px;margin:auto;display:block;}\
		#attacksadv .centerButton {margin:5px 0 0;}\
		#attacksadv .centerButton a {display:inline-block;margin:0px;line-height:17px;}\
		.button:active, .button:focus {background:url("input/button.gif") repeat-x scroll 0 0 #ECCF8E;border-color:#5D4C2F #C9A584 #C9A584 #5D4C2F;border-style:double;border-width:3px;padding:2px 10px !important;outline:none !important;}\
		#attacksadv .centerButton a:active {padding:2px 10px !important;}\
		#attacksadv .centerButton input {margin:0px;}\
		#attacksadv .centerButton #coordbutton {display:inline;}');
		
		$('#reportInboxLeft h3').html('Атаки на альянс');
		$('#reportInboxLeft').append('<div id="attacksadv"></div>');
		var townid = $('#citySelect option:eq(0)').attr('value');
		myblock();
		myblock2();	
		goattacks(townid);
	}
}

// Загрузка, тип 1
function myblock() {
	$('#reportInboxLeft div:eq(0)').html('<div id="loading"><img src="http://img3.imageshack.us/img3/1949/loadingqp.gif"></div>');
}

// Загрузка, тип 2
function myblock2() {
	$('#attacksadv').html('<div id="loading2"><img src="http://img3.imageshack.us/img3/1949/loadingqp.gif"></div>');
}

// Вид атаки - картинка
function attackimg(text, type) {
	switch(text) {
	case 'Блокада':
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_blockade.gif" title="Блокада"/></td>'
			+'<td id="nextimg">';
	break
	case 'Блокада (по дороге)':
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_blockade.gif" title="Блокада (по дороге)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
	break														  
	case 'Блокада (Открыть битву)':
		if(type==1) {
		img = '<img src="skin/advisors/military/bang_ship.gif"></td>'
			+'<td id="attackimg"><img src="skin/interface/mission_blockade.gif" title="Блокада (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		} else {
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_blockade.gif" title="Блокада (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';	
		}
	break
	case 'Набег (по дороге)':
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_plunder.gif" title="Набег (по дороге)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
	break														  
	case 'Набег (Открыть битву)':
		if(type==1) {
		img = '<img src="skin/advisors/military/bang_soldier.gif"></td>'
			+'<td id="attackimg"><img src="skin/interface/mission_plunder.gif" title="Набег (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		} else {
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_plunder.gif" title="Набег (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';		
		}
	break
	case 'Занять город! (по дороге)':
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_occupy.jpg" title="Занять город! (по дороге)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
	break														  
	case 'Занять город! (Открыть битву)':
		if(type==1) {
		img = '<img src="skin/advisors/military/bang_soldier.gif"></td>'
			+'<td id="attackimg"><img src="skin/interface/mission_occupy.jpg" title="Занять город! (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		} else {
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_occupy.jpg" title="Занять город! (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		}
	break
	case 'Перемещение войск':
	img = '</td>'
		+'<td id="attackimg"><img src="skin/interface/mission_deployarmy.gif" title="Перемещение войск"/></td>'
		+'<td id="nextimg">';
	break
	case 'Перемещение войск (Открыть битву)':
		if(type==1) {
		img = '<img src="skin/advisors/military/bang_soldier.gif"></td>'
			+'<td id="attackimg"><img src="skin/interface/mission_deployarmy.gif" title="Перемещение войск (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		} else {
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_deployarmy.gif" title="Перемещение войск (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		}
	break
	case 'Разместить флоты (Открыть битву)':
		if(type==1) {
		img = '<img src="skin/advisors/military/bang_ship.gif"></td>'
			+'<td id="attackimg"><img src="skin/interface/mission_deployfleet.gif" title="Разместить флоты (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		} else {
		img = '</td>'
			+'<td id="attackimg"><img src="skin/interface/mission_deployfleet.gif" title="Разместить флоты (Открыть битву)"/></td>'
			+'<td id="nextimg"><img src="skin/interface/arrow_right_green.gif">';
		}
	break
	case 'Разместить флоты':
	img = '</td>'
		+'<td id="attackimg"><img src="skin/interface/mission_deployfleet.gif" title="Разместить флоты"/></td>'
		+'<td id="nextimg">';
	break
	default:
		img = '</td>'
			+'<td id="attackimg">'+text+'</td>'
			+'<td id="nextimg">';
	}
	return img;
}

// Вид атаки - картинка 2
function attackimg2(text) {
	switch(text) {
	case 'Блокада (Открыть битву)':
		img2 = '<img src="skin/advisors/military/bang_ship.gif">';
	break
	case 'Набег (Открыть битву)':
		img2 = '<img src="skin/advisors/military/bang_soldier.gif">';
	break
	case 'Занять город! (Открыть битву)':
		img2 = '<img src="skin/advisors/military/bang_soldier.gif">';
	break
	case 'Перемещение войск (Открыть битву)':
		img2 = '<img src="skin/advisors/military/bang_soldier.gif">';
	break
	case 'Разместить флоты (Открыть битву)':
		img2 = '<img src="skin/advisors/military/bang_ship.gif">';
	break
	default:
		img2 = '<img src="skin/resources/icon_time.gif">';
	}
	return img2;
}

// Показать расширенный блок
unsafeWindow.showadvice = function() {
		if($('#attacksadv').css('display') == 'none') {
			$('#attacksadv').css('display', 'block');
		} else {
			$('#attacksadv').css('display', 'none');
		}
}

// Обновить атаки
unsafeWindow.myrefresh = function() {
	clearTimeout(timeout);
	var townid = $('#citySelect option:eq(0)').attr('value');
	myblock();
	myblock2();
	goattacks(townid);
}

// Получить координаты
unsafeWindow.mycoords = function() {
		clearTimeout(timeout);
		$('#coordbutton').html('');
		coordlength = ($('#attacks2 tr').length - 1)*2;
		mycoords2(1);
}

// Получить координаты 2
function mycoords2(coords4et) {
	var td = 4+coords4et*4;
	var path = $('#attacks2 td:eq('+td+') a:eq(0)').attr('href');
	$.ajax({
  		url: 'http://s'+server[1]+'.'+server[2]+'.ikariam.com/index.php'+path,
  		success: function(data) {
			text5 = patterns[5].exec(data);
			var coord = text5[2];
			$('#attacks2 td:eq('+td+')').append(' <b id="coord">'+coord+'</b>');
			if(coords4et < coordlength) {
				mycoords2(coords4et+1);
			} else {
				var townid = $('#citySelect option:eq(0)').attr('value');
				timeout = setTimeout(function() { myblock();myblock2();goattacks(townid); }, rtime);
			}
			
		}
 	});
}

// Основная функция - получение атак и вывод на экран
function goattacks(townid) {
	$.ajax({
  		url: 'http://s'+server[1]+'.'+server[2]+'.ikariam.com/index.php?view=embassyGeneralAttacksToAlly&id='+townid,
  		success: function(data) {
			if((text1 = patterns[1].exec(data)) != null) {
				if((text4 = patterns[4].exec(data)) == null) {
					$('#reportInboxLeft div:eq(0)').html('<table id="attacks" cellpadding="0" cellspacing="0"></table>'
						+'<div class="centerButton"><a class="button" href="javascript:showadvice();">Подробнее</a></div>');
					$('#attacksadv').html('<table id="attacks2" cellpadding="0" cellspacing="0"></table>'
						+'<div class="centerButton"><a class="button" href="javascript:myrefresh();">Обновить</a>'
							+'<div id="coordbutton"> <a class="button" href="javascript:mycoords();">Получить координаты</a></div>'
						+'</div>');
					$('#attacks2').html('<tr id="title">'
						+'<td id="time" colspan="2" style="text-align:center;">Время</td>'
						+'<td id="units">Кол-во войск</td>'
						+'<td id="attack">Нападающий</td>'
						+'<td id="attackimg" colspan="3" style="text-align:center;">Миссия</td>'
						+'<td id="defense">Защитник</td>'
						+'</tr>');
					while ((text2 = patterns[2].exec(text1[0])) != null) {
						var text3 = patterns[3].exec(text2[0]);
						// ---- attack1 ----
						var img = attackimg(text3[2], 1);
						$('#attacks').append('<tr>'
							+'<td id="attack">'+text3[4]+'</td>'
							+'<td id="preimg">'+img+'</td>'
							+'<td id="defense">'+text3[5]+'</td>'
							+'</tr>');
						// ---- attack2 ----
						var img = attackimg(text3[2], 2);
						var img2 = attackimg2(text3[2]);
						z++;
						if(z%2 == 1) {
							$('#attacks2').append('<tr class="master1" id="master">'
								+'<td id="time2">'+img2+'</td>'
								+'<td id="time">'+text3[1]+'</td>'
								+'<td id="units">'+text3[3]+'</td>'
								+'<td id="attack">'+text3[4]+'</td>'
								+'<td id="preimg">'+img+'</td>'
								+'<td id="defense">'+text3[5]+'</td>'
								+'</tr>');
						} else {
							$('#attacks2').append('<tr class="master2" id="master">'
								+'<td id="time2">'+img2+'</td>'
								+'<td id="time">'+text3[1]+'</td>'
								+'<td id="units">'+text3[3]+'</td>'
								+'<td id="attack">'+text3[4]+'</td>'
								+'<td id="preimg">'+img+'</td>'
								+'<td id="defense">'+text3[5]+'</td>'
								+'</tr>');
						}
					}
					z=0;
					timeout = setTimeout(function() { myblock();myblock2();goattacks(townid); }, rtime);
				} else {
					$('#reportInboxLeft div:eq(0)').html('<div id="selecttown">В данное время нет атак на членов вашего альянса</div>');
					$('#attacksadv').html('<div>В данное время нет атак на членов вашего альянса</div>');
				}	
			} else {
				$('#reportInboxLeft div:eq(0)').html('<div id="selecttown">Вы не генерал!</div>');
			}
		},
		error: function () {
			$('#reportInboxLeft div:eq(0)').html('<div id="selecttown">У вас нет посольства!</div>');
		}
 	});
}

cityornot(); 
