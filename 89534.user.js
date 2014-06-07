// ==UserScript==
// @name           RoboCorp production plus
// @namespace      http://variworld.ru/
// @description    Simplify and Improve page of production modules in RoboCorp.ru(VariWorld.ru) game. **Working only in GreaseMonkey(FF)** 
// @match          http://variworld.ru/?page=blocks
// @include        http://variworld.ru/?page=blocks
// ==/UserScript==

//Хромхак НЕРОБИТ((
if (!(this.unsafeWindow)) {
	this.unsafeWindow = window;
	//alert("CHROME!");
} else {
	//alert("FOX!");
}
//alert(unsafeWindow);
//Подключаем jQuery
var $jq;
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
GM_JQ.addEventListener('load', function() {
    $jq = unsafeWindow.jQuery;
	unsafeWindow.jQuery.noConflict(true);
	ScriptMain();
}, false);
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var game_resources = {};
var buildcost = {};
function ScriptMain() {
	game_resources[0] = $jq("div[style*='left: 343px; top: 47px;']").text();
	game_resources[1] = $jq("div[style*='left: 528px; top: 47px;']").text();
	game_resources[2] = $jq("div[style*='left: 343px; top: 73px;']").text();
	game_resources[3] = $jq("div[style*='left: 528px; top: 73px;']").text();

	maintab = $jq("table.main > tbody > tr");
	curtab = maintab.first();

	for (i=0;i<2;i++) {
		headers = curtab.find("th > span");
		headers.css({"font-size":"x-small"});
		curtab = curtab.next();
	}
	for (i=0;i<2;i++) {
		curtab = curtab.next();
	}
	for (i=0;i<27;i++) {
		rows = curtab.find("td");
		var editbox = rows.eq(10).find("input");
		if (editbox.length != 0) {
			editbox.css("border","1px");
			editbox.css("width","40px");
			editbox.keyup(OrderChange);
			var editbox_name = editbox.attr('name');
			curtab.attr("id","tr_"+editbox_name);
			buildcost[editbox_name] = {};
			maxcount = Infinity;
			for (j=0;j<4;j++) {
				res = rows.eq(3+j).html();
				if (editbox.length != 0) {
					buildcost[editbox_name][j] = res;
				}
				count = Math.floor(game_resources[j]/res);
				if ((maxcount==Infinity)||(maxcount>count)) {
					maxcount = count;
				}
			}
			rows.eq(10).append('<br />'+maxcount);
			buildcost[editbox_name][4] = rows.eq(7).html();
		}
		buildtime = rows.eq(7).html();
		rows.eq(7).html(ConvertToTrueTime(buildtime));
		if (editbox.length == 0) {
			oldtab = curtab;
			curtab = curtab.next();
			oldtab.hide();
		} else {
			curtab = curtab.next();
		}
	}

	var injectrow = $jq("<tr><td colspan=11>"+
	"<span class=\"white\">Показать все</span>"
	+"</td></tr>");
	//$jq("table.main > tbody").append(injectrow);
	injectrow.appendTo("table.main > tbody");
	injectrow.find("td").click(ShowAllTable);
}

function OrderChange(event) {
	var eb = $jq(event.target);
	var eb_name = eb .attr("name");
	var eb_val = parseInt(eb.val());
	rows = $jq("#tr_"+eb_name).find("td");
	for (j=0;j<4;j++) {
		curtext = '';
		if (!isNaN(eb_val)) {
			ostatok = buildcost[eb_name][j]*eb_val;
			ostatok = game_resources[j] - ostatok;
			ostatok_txt = Math.floor(ostatok)
			if (ostatok < 0) {
				ostatok_txt = "<span style=\"color:red; font: bold\">"+ostatok_txt+"</span>";
			}
			curtext = buildcost[eb_name][j]+"<br />("+ostatok_txt+")";
		} else {
			curtext = buildcost[eb_name][j];
		}
		rows.eq(3+j).html(curtext);
	}
	if (!isNaN(eb_val)) {
		ostatok = buildcost[eb_name][4]*eb_val;
		curtext = ConvertToTrueTime(buildcost[eb_name][j])+
			"<br />("+ConvertToTrueTime(ostatok)+")";
	} else {
		curtext = ConvertToTrueTime(buildcost[eb_name][j]);
	}
	rows.eq(7).html(curtext);
}

function ShowAllTable() {
	maintab = $jq("table.main > tbody > tr");
	for (i=0;i<27;i++) {
		maintab.eq(4+i).show();
	}
}
// All your GM code must be inside this function

function ConvertToTrueTime(allsecs) {
	allsecs = Math.ceil(allsecs);
	secs = allsecs%60;
	mins = Math.floor(allsecs/60);
	hours = Math.floor(mins/60);
	mins = mins%60;
	
	secs = secs.toString()
	mins = mins.toString()
	hours = hours.toString()
	if (secs.length<2) {
		secs = "0"+secs;
	}
	if (mins.length<2) {
		mins = "0"+mins;
	}
	return hours+":"+mins+":"+secs;
}