// ==UserScript==
// @name           ratFightTracker
// @namespace      http://hobowars.com
// @description    Tracks whether or not you've hit a rat during a day
// @include        http://hobowars.com/game/game.php?sr=*&cmd=rats*
// @include        http://www.hobowars.com/game/game.php?sr=*&cmd=rats*
// ==/UserScript==

//Chrome support
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
	this.GM_getValue = function (key, def) {
		return localStorage[key] || def;
	};
	this.GM_setValue = function (key, value) {
		return localStorage[key] = value;
	};
	this.GM_deleteValue = function (key) {
		return delete localStorage[key];
	};
	this.GM_listValues = function () {
		values = [];
		for (var i in localStorage) {
			values.push(i);
		}
		return values;
	};
}


if (GM_getValue("first_run", "").toString() == "" || GM_getValue("reset_time", "").toString() == "") {
	alert("You need to configure your options. Hopefully you're using Stylish Red, taking you to Rat Center now.");
	GM_setValue("first_run", false);
	fetch_pages();

}

function reset() {
	var t_1 = GM_getValue("time", new Date());
	var t_1 = new Date(t_1);
	var t_2 = new Date();
	var reset = new Date();
	reset.setHours(parseInt(GM_getValue("reset_time", "")));
	reset.setMinutes(0);
	reset.setSeconds(0);
	GM_setValue("time", t_2.toString());
	if (reset >= t_1 && reset <= t_2) {
		delete_keys();
	}
}



function remove(id, rid) {
	arr = GM_getValue(id, "").split(",");
	if (arr.indexOf(rid) > -1) {
		arr.splice(arr.indexOf(rid), 1);
	}
	arr = arr.join();
	GM_setValue(id, arr);
}

function fetch_pages() {
	//needs work
	var header = document.createElement("h1");
	header.innerHTML = "ratFightTracker - Setup Menu";
	var div = document.createElement("div");
	div.setAttribute("style", "padding-left:30px;padding-top:30px;");

	var link = document.createElement("a");
	link.innerHTML = "Change/Set Reset Time";
	link.addEventListener("click", function (e) {
		GM_setValue("reset_time", prompt("Enter the HOUR in 24h format\nfor which HoboWars PM->AM reset happens\n(the one where rats hits, uni, and grail etc. are reset\nEx\n\t9:00AM = 9\n\t9:00PM = 21", GM_getValue("reset_time", "")));
		document.getElementById("reset_time").innerHTML = "Reset time: " + GM_getValue("reset_time") + ":00 24 hours format";
	}, true);
	div.appendChild(link);

	disp_1 = document.createElement("p");
	disp_1.setAttribute("id", "reset_time");
	disp_1.innerHTML = "Reset Time: " + GM_getValue("reset_time", "No Reset Time Specified") + ":00 24 hours format";

	div.appendChild(disp_1);
	page = document.getElementById("container");
	divs = page.getElementsByTagName("div");
	for (var i in divs) {
		if (divs[i].className == "tabpage") {
			p = divs[i];
			p.innerHTML = "";

			divs[i].appendChild(header);
			divs[i].appendChild(div);
		}
	}
}


function links() {
	var clear = document.createElement("li");
	var link = document.createElement("a");
	link.innerHTML = "Rat Center";
	link.addEventListener("click", function (e) {
		fetch_pages();
	}, true);
	var link2 = document.createElement("a");
	link2.innerHTML = "Clear Rat Hits";
	link2.addEventListener("click", function (e) {
		if (confirm("Are you sure you want to clear all rat hits for the day?")) {
			delete_keys()
		}
	}, true);

	clear.appendChild(link);
	clear.appendChild(link2)

	var menu = document.getElementById("sideMenu");
	var end = menu.getElementsByTagName("ul")[0];
	end.appendChild(clear);
}


function unique_c(arr, r) {
	if (arr.indexOf(r) == -1) {
		return true
	} else {
		return false
	}
}

function delete_keys() {
	var keys = GM_listValues();
	del_re = /^\d+$/;
	for (var i = 0, key = null; key = keys[i]; i++) {
		if (key.search(del_re) > -1) {
			GM_deleteValue(key);
		}
	}
	alert("Rat hits for the day have been reset.");
}

var url = document.location.href;

var reg = /game.php\?sr=\d+&cmd=rats&do=battle/;
var reg_2 = /game.php\?sr=\d+&cmd=rats&do=test_fight/;
var reg_3 = /game.php\?sr=\d+&cmd=rats/;

if (url.search(reg) > -1) {
	links();
	var t = document.getElementsByTagName("tr");
	re = /&ID=\d+/;
	id = url.match(re).toString().replace("&ID=", "");
	rat_arr = GM_getValue(id, "");
	rat_arr = rat_arr.split(",");
	rat_win = GM_getValue(id + "w", "");
	rat_win = rat_win.split(",");
	rat_los = GM_getValue(id + "l", "");
	rat_los = rat_los.split(",");
	for (i = 0; i < t.length; i++) {
		if (t[i].bgColor == "#EAEAEA") {
			rat = t[i].getElementsByTagName("td")[0].innerHTML;
			re = /do=info&amp;ID=\d+/;
			rat = rat.match(re).toString().replace("do=info&amp;ID=", "");

			for (var q in rat_arr) {
				if (rat == rat_arr[q]) {
					it = t[i].getElementsByTagName("td")[5].getElementsByTagName("a")[0] || t[i].getElementsByTagName("td")[5];
					it.style.color = "red";
					it.style.textDecoration = "line-through";
					it.style.fontWeight = "bold";
				}
			}
			for (var q in rat_win) {
				if (rat == rat_win[q]) {
					it = t[i].getElementsByTagName("td")[5].getElementsByTagName("a")[0] || t[i].getElementsByTagName("td")[5];
					if (it.style.color != "red") {
						it.style.fontWeight = "bold";
						it.style.color = "green";
					}
					it.innerHTML = "&radic; " + it.innerHTML + " &radic;";
				}
			}
			for (var q in rat_los) {
				if (rat == rat_los[q]) {
					it = t[i].getElementsByTagName("td")[5].getElementsByTagName("a")[0] || t[i].getElementsByTagName("td")[5];
					if (it.style.color != "red") {
						it.style.color = "black";
						it.style.fontWeight = "bold";
					}
					it.innerHTML = "&#9760 " + it.innerHTML + " &#9760";
				}
			}
		}
	}
} else if (url.search(reg_2) > -1) {
	links();
	re = /&ID=\d+/;
	id = url.match(re).toString().replace("&ID=", "");
	re = /&rID=\d+/;
	rid = url.match(re).toString().replace("&rID=", "");
	re = /\+\d exp gained/;

	if (document.body.innerHTML.search(re) > -1) {

		rat_win = GM_getValue(id + "w", "");
		if (rat_win == "") {
			GM_setValue(id + "w", rid)
		} else {
			rat_win_c = rat_win.split(",");
			if (unique_c(rat_win_c, rid)) {
				remove(id + "l", rid);

				GM_setValue(id + "w", rat_win + "," + rid);
			}
		}
	} else {
		rat_los = GM_getValue(id + "l", "");
		if (rat_los == "") {
			GM_setValue(id + "l", rid)
		} else {
			rat_los_c = rat_los.split(",");
			if (unique_c(rat_los_c, rid)) {
				remove(id + "w", rid);
				GM_setValue(id + "l", rat_los + "," + rid);
			}
		}
	}
	rat_arr = GM_getValue(id, "");
	if (rat_arr == "") {
		GM_setValue(id, rid)
	} else {
		rat_arr_c = rat_arr.split(",");
		if (unique_c(rat_arr_c, rid)) {
			GM_setValue(id, rat_arr + "," + rid);
		}
	}
} else {

	links();
}