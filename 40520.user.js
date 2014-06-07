// ==UserScript==
// @name           HWM_Tab_Renamer
// @namespace      http://www.amse.ru/
// @include        http://www.heroeswm.ru/*
// @exclude        http://www.heroeswm.ru/object-info.php*
// ==/UserScript==

var bind_array = new Array(
	"home.php", "\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436",
	"inventory.php", "\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c",
	"shop.php", "\u041c\u0430\u0433\u0430\u0437\u0438\u043d",
	"army.php", "\u041d\u0430\u0431\u043e\u0440 \u0430\u0440\u043c\u0438\u0438",
	"castle.php", "\u0417\u0430\u043c\u043e\u043a",
	"sms.php", "\u041b\u0438\u0447\u043d\u0430\u044f \u043f\u043e\u0447\u0442\u0430",
	"pl_warlog.php", "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0431\u043e\u0451\u0432",
	"pl_transfers.php", "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u043f\u0435\u0440\u0435\u0434\u0430\u0447",
	"map.php", "\u041a\u0430\u0440\u0442\u0430",
	"bselect.php", "\u0411\u0438\u0442\u0432\u044b",
	"one_to_one.php", "\u0414\u0443\u044d\u043b\u0438",
	"group_wars.php", "\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u044b\u0435 \u0431\u043e\u0438",
	"forum.php", "\u0424\u043e\u0440\u0443\u043c",
	"help.php", "\u041e\u0431 \u0438\u0433\u0440\u0435",
	"skillwheel.php", "\u041a\u043e\u043b\u0435\u0441\u043e \u043d\u0430\u0432\u044b\u043a\u043e\u0432",
	"sms-create.php", "\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",
	"pl_cardlog.php", "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0438\u0433\u0440",
	"quest_journal.php", "\u041a\u0432\u0435\u0441\u0442\u044b",
	"new_topic.php", "\u041d\u043e\u0432\u0430\u044f \u0442\u0435\u043c\u0430" 
	);
	
var url_cur = location.href;

for (var i = 0; i < bind_array.length; i += 2) {
	if (url_cur.indexOf(bind_array[i]) != -1) {
		document.title = bind_array[i+1];
		return;
	}
}

if (url_cur.indexOf("forum_messages.php") != -1) {
	var title = document.title.substring(12); 
	title = title.substring(0, title.lastIndexOf("\""));
	document.title = title;
	var a_arr = document.getElementsByTagName('a');
	var last_index = 0;
	for (var i = 0; i < a_arr.length; i++) {
		if (a_arr[i].href.indexOf("forum_thread.php") != -1) {
			// Небольшой "хак". Сделано для совместимости со скриптом ADV_DD_Menu. 
			// Надеюсь, что не будет никогда форума с названием "К списку тем" :)
			if (parseTitle(a_arr[i].innerHTML) != "\u041a \u0441\u043f\u0438\u0441\u043a\u0443 \u0442\u0435\u043c") {
				last_index = i;
			}
		}
	}
	document.title += " : "	+ parseTitle(a_arr[last_index].innerHTML);	
	return;
}

if (url_cur.indexOf("forum_thread.php") != -1) {
	advancedRenameTab();
	return;
}

if (url_cur.indexOf("pl_info.php") != -1) {
	document.title = getNick();
}

function advancedRenameTab(){
    var a_arr = document.getElementsByTagName('a');
    for (var i = 0; i < a_arr.length; i++) {
        if (a_arr[i].href == (url_cur)) {
            document.title = parseTitle(a_arr[i].innerHTML);
// Если раскоментировать, названия некоторых форумов будут браться из выпадающего меню (в т.ч. расширенного скриптом ADV_DD_Menu) 
//             break; 
        }
    }

}

function parseTitle(title) {
    while (title[0] == '<') {
        title = title.substring(title.indexOf(">") + 1);
    }
    if (title.indexOf("<") != -1) {
        title = title.substring(0, title.indexOf("<"));
    }
	return title;
}

function getNick(){
  var reg_nick = /(.+)\&nbsp;\&nbsp;\[\d+\]/;
  els = document.getElementsByTagName('b');
  for (var i = 0; i < els.length; i++) {
		if (els[i].innerHTML.match(/.*\&nbsp;\&nbsp;\[\d+\]/)) {
			var nick_arr = reg_nick.exec(els[i].innerHTML);
			var s = nick_arr[nick_arr.length - 1];
			return (s.substring(s.lastIndexOf('>') + 1, s.length));
		}
  }	
}
