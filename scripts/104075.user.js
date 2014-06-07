// ==UserScript==
// @name           date stuff
// @namespace      pbr/ds
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @include        http://goallineblitz.com/game/forum_thread_list.pl*
// @include        http://goallineblitz.com/game/forum_main.pl*
// @include        http://goallineblitz.com/game/user_games.pl*
// @include        http://goallineblitz.com/game/home.pl*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        12.01.24
// ==/UserScript==

if (window.location.toString().indexOf("forum_thread.pl") != -1) {
	forum_thread();
}
else if (window.location.toString().indexOf("forum_thread_list.pl") != -1) {
	forum_thread_list();
	forum_main();
}
else if (window.location.toString().indexOf("forum_main.pl") != -1) {
	forum_main();
}
else if (window.location.toString().indexOf("user_games.pl") != -1) {
	user_games();
}
else if (window.location.toString().indexOf("home.pl") != -1) {
	home();
}

function home() {
	//login times
	if (document.getElementsByClassName("account_head")[0].innerHTML.indexOf("Flex Points") == -1) {
		var rows = document.getElementsByClassName("account_value");
		for (var i=0; i<2; i++) {
			var newdate = Date.parse(rows[i].innerHTML + " GMT-0700");
			var str = (new Date(newdate)).toString().split("GMT")[0];
			rows[i].innerHTML = str;
		}
	}

	//list mode team
	var rows = document.getElementsByClassName("list_team_nxtgame");
	for (var i=0; i<rows.length; i++) {
		var timeleft = rows[i].innerHTML.split("(in ")[1].split(")")[0];

		var newdate = new Date();
		var h = newdate.getHours() + parseInt(timeleft.split(":")[0]);
		var m = newdate.getMinutes() + parseInt(timeleft.split(":")[1]);
		newdate.setHours(h,m,0);
		if (newdate.getMinutes() >= 30) {
			newdate.setHours(newdate.getHours()+1);
		}		
		newdate.setMinutes(0);

		var newdate = Date.parse(newdate.toString().split(" GMT")[0]);
		var str = (new Date(newdate)).toDateString();
		str = str.slice(0,str.length-5);
		str = (new Date(newdate)).toTimeString().split(" GMT")[0]+" "+str;

		if (rows[i].childNodes[2].textContent.indexOf(" at ") != -1) {
			rows[i].childNodes[2].textContent = " " + str + " at" + rows[i].childNodes[2].textContent.split("at")[1]; 
		}
		else if (rows[i].childNodes[2].textContent.indexOf(" vs ") != -1) {
			rows[i].childNodes[2].textContent = " " + str + " vs" + rows[i].childNodes[2].textContent.split("vs")[1]; 
		}
		else {
			console.log(rows[i].childNodes[2].textContent);
		}
		rows[i].removeChild(rows[i].lastChild);
	}

	//card mode team
	var rows = document.getElementsByClassName("team_next_game");
	for (var i=0; i<rows.length; i++) {
		var timeleft = rows[i].innerHTML.split("(in ")[1].split(")")[0];
		console.log(timeleft);

		var newdate = new Date();
		var h = parseInt(timeleft.split(":")[0]);
		var m = parseInt(timeleft.split(":")[1]);
		h += newdate.getHours();
		m += newdate.getMinutes();

		newdate.setHours(h,m,0);
		if (newdate.getMinutes() >= 30) {
			newdate.setHours(newdate.getHours()+1);
		}		
		newdate.setMinutes(0);

		var newdate = Date.parse(newdate.toString().split(" GMT")[0]);
		var str = (new Date(newdate)).toDateString();
		str = str.slice(0,str.length-5);
		str = (new Date(newdate)).toTimeString().split(" GMT")[0]+" "+str;

		rows[i].childNodes[3].textContent = " " + str + " vs " + rows[i].childNodes[2].textContent;
		rows[i].removeChild(rows[i].lastChild);
	}

	//card mode player
	var r = document.getElementsByClassName("player_vitals");
	for (var i=0; i<r.length; i++) {
		var rowidx = 1;
		if (r[i].innerHTML.indexOf("Train Pts:") != -1) rowidx++;
		var timeleft = r[i].rows[rowidx].innerHTML.split("(in ")[1].split(")")[0];

		var newdate = new Date();
		var h = newdate.getHours() + parseInt(timeleft.split(":")[0]);
		var m = newdate.getMinutes() + parseInt(timeleft.split(":")[1]);
		newdate.setHours(h,m,0);
		
		if (newdate.getMinutes() >= 30) {
			newdate.setHours(newdate.getHours()+1);
		}		
		newdate.setMinutes(0);

		var newdate = Date.parse(newdate.toString().split(" GMT")[0]);
		var str = (new Date(newdate)).toDateString();
		str = str.slice(0,str.length-5);
		str = (new Date(newdate)).toTimeString().split(" GMT")[0]+" "+str;

		var html = r[i].rows[rowidx].childNodes[3].innerHTML;
		r[i].rows[rowidx].childNodes[3].innerHTML = html.split(">")[0] + ">" + str + 
													html.slice(html.indexOf("<a")-4, html.indexOf(" (in"));
	}
}

function user_games() {
	var rows = document.getElementsByClassName("nonalternating_color2");
	for (var i=0; i<rows.length; i++) {
		var head = rows[i].innerHTML.split(" at ")[0];
		var tail = rows[i].innerHTML.split(" at ")[1].split("(")[1];

		var datestr = rows[i].innerHTML.split(" at ")[1].split(" ")[0];
		var newdate = new Date();
		var h = parseInt(datestr.split(":")[0]);
		var m = parseInt(datestr.split(":")[1]);
		var s = parseInt(datestr.split(":")[2]);
		newdate.setHours(h,m,s);

		var newdate = Date.parse(newdate.toString().split(" GMT")[0]+" GMT-0700");
		var str = (new Date(newdate)).toTimeString().split(" GMT")[0] + " on "+ (new Date(newdate)).toDateString()+" ";
		rows[i].innerHTML = head + " at " + str + "(" + (tail ? tail : "") + ")";
	}
}

function forum_thread() {
	var dates = document.getElementsByClassName("post_date");
	for (var i=0; i<dates.length; i++) {
		var d = dates[i];
		if (d.innerHTML == null) continue;

		var newdate = Date.parse(d.innerHTML+" GMT-0700");
		var str = (new Date(newdate)).toString();
		str = str.slice(0,str.indexOf(":")+6);
		d.innerHTML = str;
	}

	var dates = document.getElementsByClassName("last_edit");
	for (var i=0; i<dates.length; i++) {
		var d = dates[i];
		if (d.childNodes.length > 1) {
			var newdate = Date.parse(d.lastChild.textContent.split(" on ")[1]+" GMT-0700");
			var str = (new Date(newdate)).toString();
			str = str.slice(0,str.indexOf(":")+6);
			d.lastChild.textContent = d.lastChild.textContent.split(" on ")[0]+" on "+str;
		}
		else {
			var newdate = Date.parse(d.lastChild.textContent.split("edited ")[1]+" GMT-0700");
			var str = (new Date(newdate)).toString();
			str = str.slice(0,str.indexOf(":")+6);
			d.lastChild.textContent = d.lastChild.textContent.split("edited ")[0]+"edited "+str;
		}
	}
}

function forum_thread_list() {
	var dates = document.getElementsByClassName("last_post");
	for (var i=0; i<dates.length; i++) {
		var d = dates[i].getElementsByTagName("a")[0];
		if (d.innerHTML == null) continue;
		var newdate = Date.parse(d.innerHTML+" GMT-0700");
		var str = (new Date(newdate));
		if (str.toString().indexOf("Inval") == -1) {
			str = str.toString();
			str = str.slice(0,str.indexOf(" GMT"));
			d.innerHTML = str;
		}
		else {
			continue;
		}
	}
}

function forum_main() {
	var dates = document.getElementsByClassName("last_post_user");
	for (var i=0; i<dates.length; i++) {
		var d = dates[i].firstChild;
		if (d.textContent == null) continue;

		var newdate = Date.parse(d.textContent+" GMT-0700");
		var str = (new Date(newdate)).toString();
		if (str.toString().indexOf("Inval") == -1) {
			str = str.slice(0,str.indexOf(" GMT"));
			d.textContent = str;
		}
	}
}

