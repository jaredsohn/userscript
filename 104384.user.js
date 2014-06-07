// ==UserScript==
// @name           HWM_Battles_Statistics
// @namespace      http://www.amse.ru
// @include        http://www.heroeswm.ru/pl_info.php?id=*
// @include        http://www.heroeswm.ru/pl_warlog.php?id=*
// ==/UserScript==

var url_cur = location.href;
var id = url_cur.match(/\d+/);
var mid = getID(); // our id
var isMe = (id == mid);
var nick;

var no_br = 0;
var player_br = 1;
var mobs_br = 2;
var merc_br = 3;

var pvp = "pvp";
var pvp_win = "pvp_win";

var kszs = "kszs";
var kszs_win = "kszs_win";

var hunt_one = "hunt_one";
var hunt_one_win = "hunt_one_win";

var hunt_my_help = "hunt_my_help";
var hunt_my_help_win = "hunt_my_help_win";

var hunt_me_help = "hunt_me_help";
var hunt_me_help_win = "hunt_me_help_win";

var hunt_two = "hunt_two";
var hunt_two_win = "hunt_two_win";

var thief_me = "thief_me";
var thief_me_win = "thief_me_win";

var thief_my = "thief_my";
var thief_my_win = "thief_my_win";

var merc = "merc";
var merc_win = "merc_win";

var event = "event";
var event_win = "event_win";


analyze();
print();

function print(){
    if (url_cur.indexOf("pl_info.php") == -1) {
        return;
    }
	
	if (GM_getValue(id + ".checked", "") == "") {
		return;
	}
	
	//Для изменения порядка вывода или убирание ненужных строк - изменять здесь (только аккуратно)!
	var bind_array = new Array(
	"\u041f\u0412\u041f (*)", "pvp",
	"\u041a\u0421\u0417\u0421", "kszs",
	"\u041e\u0434\u0438\u043d\u043e\u0447\u043d\u0430\u044f \u043e\u0445\u043e\u0442\u0430", "hunt_one",
	"\u042f \u043f\u043e\u043c\u043e\u0433", "hunt_my_help",
	"\u041c\u043d\u0435 \u043f\u043e\u043c\u043e\u0433\u043b\u0438", "hunt_me_help",
	"\u0421\u043f\u0430\u0440\u0435\u043d\u043d\u0430\u044f \u043e\u0445\u043e\u0442\u0430", "hunt_two",
	"\u0413\u0438\u043b\u044c\u0434\u0438\u044f \u041d\u0430\u0451\u043c\u043d\u0438\u043a\u043e\u0432", "merc",
	"\u0413\u0438\u043b\u044c\u0434\u0438\u044f \u0412\u043e\u0440\u043e\u0432", "thief_my",
	"\u0411\u043e\u0438 \u0441 \u0432\u043e\u0440\u0430\u043c\u0438", "thief_me",
	"\u0420\u0430\u0437\u043d\u043e\u0435 (*)", "event",
	"\u0412\u0441\u0435\u0433\u043e \u0431\u043e\u0451\u0432", ""
	);
	
	var tbody = document.getElementsByClassName('wblight')[1].childNodes[0];
	var tr_new = document.createElement('table');
	tr_new.setAttribute('class', 'wblight');
	insertAfter(tbody, tr_new, tbody);
	
	var all_battles = 0;
	var all_battles_wins = 0;

	var s = 
	"" 
	+ "<tr><td>\u0422\u0438\u043f</td><td>\u0412\u0441\u0435\u0433\u043e</td><td>\u041f\u043e\u0431\u0435\u0434</td><td>\u041f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0439</td><td>\u0414\u043e\u043b\u044f \u043f\u043e\u0431\u0435\u0434</td></tr>";
	for (var i = 0; i < bind_array.length; i += 2) {
		var all = read(bind_array[i + 1]);
		if (all == 0) {
			continue;
		}
		all_battles += all;
		var wins = read(bind_array[i + 1] + "_win");
		all_battles_wins += wins;
		var defeats = all - wins;
		var rate = Math.round((wins * 1000) / all) / 10 + "%"; 
		s += "<tr><td>" + bind_array[i] + "</td><td>" + all + "</td><td>" + wins + "</td><td>" + defeats + "</td><td>" + rate + "</td></tr>";
	}
	if (all_battles > 0) {
		s += "<tr><td>" + "\u0412\u0441\u0435\u0433\u043e \u0431\u043e\u0451\u0432" + "</td><td>" + all_battles + "</td><td>" + all_battles_wins + "</td><td>" + (all_battles - all_battles_wins) + "</td><td>" + (Math.round((all_battles_wins * 1000) / all_battles) / 10 + "%") + "</td></tr>";
	}
	tr_new.innerHTML = s;
}

function read(s) {
	return GM_getValue(id + "." + s, 0);
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function analyze(){
    if (url_cur.indexOf("pl_warlog.php") == -1) {
        return;
    }
	var td_arr = document.getElementsByTagName('td');
	
	var s = GM_getValue(id + ".checked", "");
	var checked_arr;
	if (s == "") {
		checked_arr = new Array();
	} else {
		checked_arr = s.split("|");
	}
    
    var battles;
    
    for (var i = 0; i < td_arr.length; i++) {
        if (td_arr[i].innerHTML.indexOf("\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0431\u043e\u0435\u0432 \u0438\u0433\u0440\u043e\u043a\u0430") != -1) {
            battles = (td_arr[i].innerHTML);
            nick = td_arr[i].childNodes[1].childNodes[1].childNodes[0].innerHTML;
        }
    }
    
    battles = battles.substring(battles.lastIndexOf("</center>") + "</center>".length);
	battles = battles.replace(/^<br>/, '');
    var lines_arr = battles.split('<br>');
    for (var i = 0; i < lines_arr.length - 1; i++) {
		var line = lines_arr[i];
		var warid = line.match(/warid=\d+/)[0].split("=")[1];
		var checked = false;
		for (var j = 0; j < checked_arr.length; j += 2) {
			if (checked_arr[j] - warid >= 0 && warid - checked_arr[j + 1] >= 0) {
				checked = true;
				break;
			}
		}
		if (!checked) {
			parseBattle(line);
		}
    }
	
    var line0 = lines_arr[0];
    var warid0 = line0.match(/warid=\d+/)[0].split("=")[1];
    var line1 = lines_arr[lines_arr.length - 2];
    var warid1 = line1.match(/warid=\d+/)[0].split("=")[1];
    
	checked_arr[checked_arr.length] = warid0;
	checked_arr[checked_arr.length] = warid1;
	
	var new_checked_arr = new Array();
	
	for (var i = 0; i < checked_arr.length; i += 2) {
		var need_to_add = true;
		var new_max = checked_arr[i];
		var new_min = checked_arr[i + 1];
		for (var j = 0; j < new_checked_arr.length; j += 2) {
			var max = new_checked_arr[j];
			var min = new_checked_arr[j + 1];
			if (max - new_max < 0) {
				if (max - new_min >= 0) {
					if (min - new_min <= 0) {
						need_to_add = false;
						new_checked_arr[j] = new_max; 
					} else {
						need_to_add = false;
						new_checked_arr[j] = new_max;
						new_checked_arr[j + 1] = new_min;
					}
				}
			} else {
				if (min - new_max <= 0) {
					if (min - new_min > 0) {
						need_to_add = false;
						new_checked_arr[j + 1] = new_min;
					} else {
						need_to_add = false;
					}
				}
			}
		}
		if (need_to_add) {
			new_checked_arr[new_checked_arr.length] = new_max;
			new_checked_arr[new_checked_arr.length] = new_min;
		}
	}
	
	GM_setValue(id + ".checked", new_checked_arr.join("|"));
}

function inc(v) {
	GM_log(v);
	if (v.indexOf("win") != -1) {
		GM_setValue(id + "." + "wins", GM_getValue(id + "." + "wins", 0) + 1);
	} else {
		GM_setValue(id + "." + "battles", GM_getValue(id + "." + "battles", 0) + 1);
	}
	GM_setValue(id + "." + v, GM_getValue(id + "." + v, 0) + 1);
}

function parseDate(date_str){
    var date_str_arr = date_str.split(' ');
    var time_str = date_str_arr[1];
    date_str_arr = date_str_arr[0].split('-');
    var time_str_arr = time_str.split(':');
    var date = new Date();
    var year = 2000 + parseInt(date_str_arr[2], 10);
    var month = parseInt(date_str_arr[1], 10) - 1;
    var day = parseInt(date_str_arr[0], 10);
    var hours = parseInt(time_str_arr[0], 10);
    var minutes = parseInt(time_str_arr[1], 10);
    date.setFullYear(year, month, day);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function parseBattle(s) {
	s = s.substring(s.lastIndexOf(":") + 2);
	var isAmbush;
	// Мы кого-то поймали, нас кто-то поймал или это задание ГН по доставке/сопровождению грузов
	if (s.indexOf("\u2022 ") != -1) { 
		isAmbush = true;
		s = s.substring(2);
	}
	else {
		isAmbush = false;
	}
	var vs = s.split(' vs ');
	
	//Это баги в протоколе боёв (например, бой: ,  18-03-09 16:35: ВолшебныйКидала[5], bmikola1[5], МихейКуркин[5]) пытаемся замять
	if (vs.length == 1) {
		inc(event);
		//alert(vs[0]);
		var firstWin = (vs[0].indexOf('<b>') != -1);
		vs[0] = clearText(vs[0]);
		//alert(firstWin);
		var players = vs[0].split(', ');
		for (var i = 0; i < players.length; i++) {
			//alert(removeBracketsFromNick(players[i]));
			if (removeBracketsFromNick(players[i]) == nick) {
				if (firstWin) {
					inc(event_win);
				}
				return;
			}
		}		
		return;
	}
	
	//КСЗС
	if (vs.length == 4) {
//		kszs++;
		inc(kszs);
		for (var i = 0; i < 4; i++) {
			if (vs[i].indexOf("<b>") == 0) {
				vs[i] = clearText(vs[i]);
				if (removeBracketsFromNick(vs[i]) == nick) {
//					kszs_win++;
					inc(kszs_win);
				}
			}
		}
		return;
	}
	var firstWin = (vs[0].indexOf('<b>') == 0);
	vs[0] = clearText(vs[0]);
	vs[1] = clearText(vs[1]);
	var nop0 = getNumberOfPlayers(vs[0]);
	var nop1 = getNumberOfPlayers(vs[1]);
	
	//Одиночная охота
	if (nop0 == 1 && nop1 == 1 && isPlayer(vs[0]) && isMob(vs[1])) {
		inc(hunt_one);
		if (firstWin) {
			inc(hunt_one_win);
		}
		return;
	}
	
	//Помощь в охоте
	if (nop0 == 2 && nop1 == 1 && isPlayer(vs[0]) && isMob(vs[1])) {
		if (removeBracketsFromNick(vs[0].split(', ')[0]) == nick) {
			inc(hunt_me_help);
			if (firstWin) {
				inc(hunt_me_help_win);
			}
		}
		else {
			inc(hunt_my_help);
			if (firstWin) {
				inc(hunt_my_help_win);
			}
		}
		return;
	}
	
	//Спаренная охота
	if (nop0 == 2 && nop1 == 2 && isPlayer(vs[0]) && isMob(vs[1])) {
		inc(hunt_two);
		if (firstWin) {
			inc(hunt_two_win);
		}
		return;
	}
	
	//Самый обычный групповой бой или дуэль
	if (isPlayer(vs[0]) && isPlayer(vs[1]) && !isAmbush) {
		inc(pvp);
		var firstPlayers = vs[0].split(', ');
		for (var i = 0; i < firstPlayers.length; i++) {
			if (removeBracketsFromNick(firstPlayers[i]) == nick) {
				if (firstWin) {
					inc(pvp_win);
				}
				return;
			}
		}
		if (!firstWin) {
			inc(pvp_win);
		}
		return;
	}
	
	//ГВ, бой с человеком
	if (isPlayer(vs[0]) && isPlayer(vs[1]) && nop0 == 1 && (nop1 == 1 || nop1 == 2) && isAmbush) {
		if (removeBracketsFromNick(vs[0]) == nick) { // Мы поймали
			inc(thief_my);
			if (firstWin) {
				inc(thief_my_win);
			}
		}
		else { //Нас поймали
			inc(thief_me);
			if (!firstWin) {
				inc(thief_me_win);
			}
		}
		return;
	}
	
	//ГВ, караван
	if (isPlayer(vs[0]) && isOther(vs[1]) && nop0 == 1 && nop1 == 1 && isAmbush) { 
		inc(thief_my);
		if (firstWin) {
			inc(thief_my_win);
		}
		return;
	}	
	
	//Гильдия наёмников, обычный бой
	if (isPlayer(vs[0]) && isMerc(vs[1])) { 
		inc(merc);
		if (firstWin) {
			inc(merc_win);
		}
		return;
	}
	
	//Задание ГН по доставке груза/сопровождению каравана
	if (isPlayer(vs[1]) && isMerc(vs[0]) && isAmbush) {
		inc(merc);
		if (!firstWin) {
			inc(merc_win);
		}
		return;
	}
	
	//Атака мобов, считаем эвентом
	if (isPlayer(vs[1]) && isMob(vs[0])) {
		inc(event);
		if (!firstWin) {
			inc(event_win);
		}
		return;
	}
	
	//Всё, что не попало в остальные категории: турниры на выживание, эвенты с мобами
	if (isPlayer(vs[0]) && isOther(vs[1])) { 
		inc(event);
		if (firstWin) {
			inc(event_win);
		}
		return;
	}
	if (isPlayer(vs[1]) && isOther(vs[0])) { 
		inc(event);
		if (!firstWin) {
			inc(event_win);
		}
		return;
	}	
	
	//Если совсем никуда не попало, это плохо, выводим сообщение об ошибке
	alert(s);
}

function removeBracketsFromNick(s) {
	return s.substring(0, s.indexOf('['));
}

function isPlayer(s) {
    return getTypeOfPlayer(s) == player_br;
}

function isMob(s) {
    return getTypeOfPlayer(s) == mobs_br;
}

function isMerc(s) {
    return getTypeOfPlayer(s) == merc_br;
}

function isOther(s) {
	return getTypeOfPlayer(s) == no_br;
}

function getTypeOfPlayer(s){
    if (s.indexOf('[') != -1 && s.indexOf(']') != -1) {
        return player_br;
    }
    if (s.indexOf('(') != -1 && s.indexOf(')') != -1) {
        return mobs_br;
    }
    if (s.indexOf('{') != -1 && s.indexOf('}') != -1) {
        return merc_br;
    }
    return no_br;
}

function getNumberOfPlayers(s){
    return s.split(', ').length;
}

function clearText(s){
    var i;
    while ((i = s.indexOf('<')) != -1) {
        s = s.substring(0, i) + s.substring(s.indexOf('>') + 1);
    }
    return s;
}

function getID(){ // read needed URL from main menu
    var all_li = document.getElementsByTagName('li');
    for (var k = 0; k < all_li.length; k++) {
        var href = all_li[k].childNodes[0].href;
        if (href && href.indexOf('pl_hunter_stat.php') != -1) {
            return href.match(/\d+/);
        }
    }
    return "ERROR - no main menu";
}
