// ==UserScript==
// @author Bassem
// @name The_shield
// @namespace  Id attack + renaming
// @include http://ae*.tribalwars.ae/*
// ==/UserScript==

/* all fiddely bits */
if (!this.nameTemplate)
	/*nameTemplate = '{unit} {launched2} {coords} {player} {duration} {distance} {backtime} {attack_id}';*/
	nameTemplate = '{unit} {coords} {player} / {attack_id}';
if (!this.tableTemplate)
	tableTemplate = '<tr><td rowspan="11">معلومات اضافية</td><td>القوات:</td><td>{unit}</td></tr><tr><td>وقت الارسال (AttackID)</td><td>{launched1}</td></tr><tr><td>وقت الارسال (Corrected)</td><td>{launched2}</td></tr><tr><td>الاحداثيات</td><td>{coords}</td></tr><tr><td>اللاعب</td><td>{player}</td></tr><tr><td>المدة</td><td>{duration}</td></tr><tr><td>المسافة</td><td>{distance}</td></tr><tr><td>وقت الرجوع (Backtime)</td><td>{backtime}</td></tr><tr><td>هجوم-ID</td><td>{attack_id}</td></tr><tr><td>تغيير اسم الهجمة</td><td>{namechange}</td></tr><tr><td>نسخة للمنتدى</td><td><input id="forumpost" value="{forumpost}" size="40"/></td></tr>';
if (!this.forumTemplate)
	forumTemplate = '[table][**]هجوم على[||][img]http://ae18.tribalwars.ae/graphic/command/support.png[/img][player]{targetplayer}[/player][||]البداية[||][img]http://ae18.tribalwars.ae/graphic/command/attack.png[/img][player]{player}[/player][/**][*][|][village]{targetcoords}[/village][|][|][village]{coords}[/village][*][b]القوات[/b][|]{unit}[|][b]وقت الارسال[/b][|]{launched2}[*][b]وقت الوصول[/b][|]{landing}[|][b]وقت الرجوع(BackTime)[/b][|]{backtime}[*][|][|][|][*]المسافة[|]{distance}[|]المدة[|]{duration}[*]هجوم-ID[|]{attack_id}[|][|][/table]';
if (!this.timingTableTemplate)
	timingTableTemplate = '<tr><td rowspan="3">معلومات اضافية</td><td>وقت الارسال</td><td>{launched2}</td></tr><tr><td>هجوم-ID</td><td>{attack_id}</td></tr><tr><td>نسخة للمنتدى</td><td>{forumentry}<form method="POST" target="_new" action="forum.php?&screen=view_thread&action=new_post&thread_id=' + threadId + '&answer=true&page=last#"><input type="hidden" name="message" value="{forumentry}"/><input type="submit" value="تصدير" name="preview"/></form></td></tr>';
var inputTemplate = '<tr><td rowspan="3">استيراد IDs</td><td colspan="2">تمت الترجمة من قبل: <a href="http://forum.tribalwars.ae/member.php?7271-%D8%B7%D8%A7%D8%B1%D8%AF-%D8%A7%D9%84%D8%BA%D8%B2%D8%A7%D8%A9\'s">» طارد الغزاة </a><br>ادخال ids</td></tr><tr><td colspan="2"><textarea id="attackidlist"></textarea></td></tr><tr><td colspan="2"><input type="button" value="اضافة" name="add" id="addAttackId"/><input type="button" value="اظهر الكل" name="show" id="showList"/></td></tr><tr><td>الايدي الحالي</td><td colspan="2">{currentId}</td></tr>';

var months = ['ينا', 'فبر', 'مار', 'ابر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'];

/* all regular expressions */
var urlReg = /[\?&]id=([^&#]*)/;
var listReg = /\s*(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s*(\d{1,2}):(\d{1,2})\s*-\s*(\d+)/i;
var twfrReg = /Attack:\s*(\d+)\s*(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s*(\d{1,2}):(\d{1,2}):\d{1,2}\s*([AaPp][Mm])/i;
var dateReg = /([^\x00-\x80]+)\s+(\d{1,2}),\s+(\d{4})\s+(\d{2}):(\d{2}):(\d{2})\s+:(\d{0,3})/i;
var durReg = /(\d+):(\d{2}):(\d{2})/i;
var coordsReg = /\s\(((\d+)\|(\d+))\)\sK/i;

var url = window.location.href;
var id;
var config = null;
var textlist = null;

/* function */
function processTemplate(template, valueMap) {
	for (name in valueMap) {
		template = template.replace(new RegExp("{" + name + "}", "g"), valueMap[name]);
	}
	return template;
}

function leadFormat(n) {
	if (n < 10) {
		return "0" + n;
	}
	return n;
}

function dateFormat(t) {
	var d = new Date(t);
	return months[d.getMonth()] + " " + leadFormat(d.getDate()) + ", " + d.getFullYear() + " " + leadFormat(d.getHours()) + ":" + leadFormat(d.getMinutes()) + ":" + leadFormat(d.getSeconds());
}

function dateFormat2(t) {
	var d = new Date(t);
	return leadFormat(d.getDate()) + "/" + leadFormat(d.getMonth() + 1) + "/" + d.getFullYear() + " " + leadFormat(d.getHours()) + ":" + leadFormat(d.getMinutes());
}

function findMonth(t) {
	for (m in months)
	if (months[m] == t)
		return m;
}

function findLaunchtime(l) {
	var previd = 0;
	var prevtime = 0;
	var nextid = 0;
	for (var j = 0; j < l.length; j++) {
		var t = listReg.exec(l[j]);
		if (t != null) {
			var d = new Date(t[3], t[2] - 1, t[1], t[4], t[5]);
			var time = d.getTime();
			previd = parseInt(nextid);
			nextid = parseInt(t[6]);
			if (previd != 0 && previd <= id && id <= nextid) {
				return prevtime + (time - prevtime) * (id - previd) / (nextid - previd);
			}
			prevtime = time;
		}
	}
	return -1;
}

function findCoords() {
	var coords = Array();
	$("#content_value table a").each(function(i, v) {
		var c = coordsReg.exec($(v).html());
		if (c != null) {
			coords.push(c);
		}
	});
	return coords;
}

function buildRenamer(launchtime) {
	var attackData = {
		unit : "unknown",
		launched1 : "unknown",
		launched2 : "unknown",
		coords : "000|000",
		player : "unknown",
		duration : "0",
		distance : "0",
		backtime : "unknown",
		attack_id : "0",
		namechange : "",
		forumentry : ""
	};

	attackData.attack_id = id;
	attackData.player = $("#content_value table:first tr:first").next().children("td:nth-child(3)").text();
	attackData.targetplayer = $("#content_value table:first tr:nth-child(3)").next().children("td:nth-child(3)").text();
	attackData.launched1 = dateFormat(launchtime);

	var c = findCoords();
	if (c.length > 0) {
		var c1 = c[0];
		var c2 = c[1];
		var x = c1[2] - c2[2];
		var y = c1[3] - c2[3];

		attackData.coords = c1[1];
		attackData.targetcoords = c2[1];
		attackData.dist = Math.sqrt(x * x + y * y);
		attackData.distance = Math.round(attackData.dist);

		var ld = dateReg.exec($("#content_value table:first").text());
		if (ld != null) {
			attackData.landing = ld[0];

			var landTime = new Date(ld[3], findMonth(ld[1]), ld[2], ld[4], ld[5], ld[6], ld[7]).getTime();
			var duration = landTime - launchtime;
			var dSec = duration / 1000;
			attackData.duration = leadFormat(Math.floor(dSec / 3600)) + ':' + leadFormat(Math.floor(dSec % 3600 / 60)) + ':' + leadFormat(Math.floor(dSec % 60));

			var closestTime = 99999999;
			for (var n = 0; n < config.units.list.length; n++) {
				var ut = Math.round(config.units.list[n].speed * 60 * attackData.dist * 1000);
				// / (config.speed * config.unit_speed)
				if (Math.abs(duration - ut) < closestTime) {
					closestTime = Math.abs(duration - ut);
					attackData.unit = config.units.list[n].name;
					attackData.launched2 = dateFormat(landTime - ut);
					attackData.backtime = dateFormat(landTime + ut);
				}
			}
		}
	}
	var nameString = processTemplate(nameTemplate, attackData);
	var forumString = processTemplate(forumTemplate, attackData);
	var input = $("#content_value table:first input:first").parent();
	input.attr("style", "");
	var p = $("<p>").append(input);
	attackData.namechange = p.html();
	attackData.forumpost = forumString;
	var tableString = processTemplate(tableTemplate, attackData);
	$("#content_value table:first tr:last").before(tableString);
	$("#editInput").attr("value", nameString);
	$("#forumpost").focus(function() {
		this.select();
	});
}

function processForum(data) {
	var ind1 = data.indexOf('[' + 'attackid]');
	var ind2 = data.indexOf('[/' + 'attackid]');
	if (ind1 == -1 || ind2 == -1) {
		alert("موضوع الايدي بالمنتدى مفقود او غير مهيأ بشكل صحيح");
		return;
	}

	textlist = textlist.concat(data.substring(ind1 + 10, ind2).split('<br />'));
	textlist = sortIDList(textlist);
	localStorage.setItem('twAttackIDs', JSON.stringify(textlist));
	var launchtime = findLaunchtime(textlist);

	if (launchtime > 0) {
		buildRenamer(launchtime);
	} else {
		var attackData = {
			unit : "unknown",
			launched1 : "unknown",
			launched2 : "unknown",
			coords : "000|000",
			player : "unknown",
			duration : "0",
			distance : "0",
			backtime : "unknown",
			attack_id : "0",
			namechange : "",
			forumentry : ""
		};
		var dl = $("#content_value table:first tr:nth-child(6)");
		if (dl.children("td:first").text() == "هدف المقلاع:") {
			dl = dl.next();
		}
		var dt = dl.children("td:first").text();
		var ds = dl.children("td:nth-child(2)").text();
		var ls = dl.next().children("td:nth-child(2)").text();
		if (dt == "المدة") {
			var dd = durReg.exec(ds);
			var ld = dateReg.exec(ls);
			if (ld != null && dd != null) {
				var d = dd[1] * 3600 + dd[2] * 60 + dd[3] * 1;
				var landTime = new Date(ld[3], findMonth(ld[1]), ld[2], ld[4], ld[5], ld[6], ld[7]).getTime();
				var launchTime = landTime - d * 1000;
				attackData.attack_id = id;
				attackData.launched2 = dateFormat2(launchTime);
				attackData.forumentry = attackData.launched2 + " - " + attackData.attack_id;
				var tableString = processTemplate(timingTableTemplate, attackData);
				$("#content_value table:first tr:last").before(tableString);

				//
				textlist.push(attackData.forumentry);
				localStorage.setItem('twAttackIDs', JSON.stringify(textlist));
			}
		} else {
			alert("موضوع الايدي في المنتدى غير محدث , قم يتحديه بأضافة ايدي جديد, واطلب من مسؤول المنتدى تحديث الموضوع");
		}
	}
}

function buildInput() {
	var inputData = {
		currentId : id
	};
	var inputString = processTemplate(inputTemplate, inputData);
	$("#content_value table:first tr:last").before(inputString);

	$("#addAttackId").click(inputParseList);
	$("#showList").click(inputShowList);

	//attackidlist
}

function inputParseList() {
	var attackIDString = localStorage.getItem('twAttackIDs');
	if (attackIDString && attackIDString.length > 0) {
		textlist = JSON.parse(attackIDString);
	} else {
		textlist = new Array();
	}

	var toParse = $("#attackidlist").val();
	var list = toParse.split("\n");
	for (var j = 0; j < list.length; j++) {
		if (listReg.test(list[j])) {
			textlist.push(list[j]);
		} else {
			var t = twfrReg.exec(list[j]);
			if (t != null) {
				var h = parseInt(t[5]);
				if (h == 12)
					h = 0;
				if (t[7].toLowerCase() == "pm")
					h += 12;
				var line = "" + leadFormat(parseInt(t[3])) + "/" + leadFormat(parseInt(t[2])) + "/" + t[4] + " " + leadFormat(parseInt(h)) + ":" + leadFormat(parseInt(t[6])) + " - " + t[1];
				textlist.push(line);
			}
		}
	}

	textlist = sortIDList(textlist);
	localStorage.setItem('twAttackIDs', JSON.stringify(textlist));
	$("#attackidlist").val(" ");
}

function inputShowList() {
	var attackIDString = localStorage.getItem('twAttackIDs');
	if (attackIDString && attackIDString.length > 0) {
		textlist = JSON.parse(attackIDString);
		var text = textlist.join("\n");
		$("#attackidlist").val(text);
	}
}

function sortIDList(idList) {
	idList.sort(sortFunction);

	var prevId = "";
	var newList = new Array();
	for (var j = 0; j < idList.length; j++) {
		var t = listReg.exec(idList[j]);
		if (t) {
			var d = new Date(t[3], t[2] - 1, t[1], t[4], t[5]);
			var time = d.getTime();
			var now = (new Date()).getTime();

			if (t[6] != prevId && now - time < 432000000) {
				newList.push($.trim(idList[j]));
			}
			prevId = t[6];
		}
	}
	return newList;
}

var us = parseInt(game_data.player.ally_id);

function sortFunction(item1, item2) {
	var t1 = listReg.exec(item1);
	var t2 = listReg.exec(item2);
	if (t1 != null && t2 != null && t1[6] == t2[6] || t1 == null && t2 == null) {
		return 0;
	} else if (t1 == null || t2 != null && t1[6] < t2[6]) {
		return -1;
	} else {
		return 1;
	}
}

/* main statement */
function main() {
	if (url.indexOf('screen=info_command') == -1) {
		alert('هذا السكريبت  يعمل فقط من صفحة الهجوم الفردية');
	} else {
		var loc = urlReg.exec(url);
		id = parseInt(loc[1]);

		var launchtime = -1;
		var attackIDString = localStorage.getItem('twAttackIDs');
		if (attackIDString && attackIDString.length > 0) {
			textlist = JSON.parse(attackIDString);
			launchtime = findLaunchtime(textlist);
		} else {
			textlist = new Array();
		}

		if (launchtime > 0) {
			buildRenamer(launchtime);
		} else {
			$.get(config.urls.forum, {
				screen : "view_thread",
				thread_id : threadId
			}, processForum);
		}

		buildInput();
	}
}

function loadSettings() {
	config = new Config();
	config.onloaded = function() {
		main();
	};
	config.load();
}

function initSettings() {
	if (us === 420) {
		var configString = localStorage.getItem('twConfig');
		if (configString && configString.length > 0) {
			config = JSON.parse(configString);
		}
		if (config == null || !config.time || (new Date().getTime() - config.time) > 1000 * 3600 * 24 * 7) {
			$.getScript(scriptRoot + "176610.user.js", loadSettings);
		} else {
			main();
		}
	}
}

initSettings();
