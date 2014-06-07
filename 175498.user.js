// ==UserScript==
// @name       肉味尾巴
// @version    0.0.1.4
// @author   Retaker <i@retaker.me>
// @description  Tieba Advanced辅助脚本 最后面的注释请贴到Tieba Advanced的JS尾巴里
// @namespace   http://retaker.me/
// @grant       none
// @include     http://tieba.baidu.com/f?*
// @include     http://tieba.baidu.com/p/*
// @updateURL       https://userscripts.org/scripts/source/175498.meta.js
// @downloadURL     https://userscripts.org/scripts/source/175498.user.js
// @run-at      document-end
// @license     Copyleft: All rights reversed.
// ==/UserScript==

var specialList = [{
	name: "864907600cc",
	nick: "ccloli"
}, {
	name: "施氏十时食狮",
	nick: "水狮"
}, {
	name: "8qwe24657913",
	nick: "小小"
}, {
	name: "文科980195412",
	nick: "文科"
}]; //concern some special user

//userName array,userName[2] is for check (no repeat)
var userName = [
	[],
	[],
	[]
];
var getUserName = function() {
	//userName object, document.getELe, and its length
	var uno = [document.getElementsByClassName("l_post"), document.getElementsByClassName("lzl_single_post")];
	var l = [uno[0].length, uno[1].length];

	//get author in normal floor,and its floor number(no repeat), put it in userName[0]
	for (var i = 0; i < l[0]; i++) {
		if (!(userName[2].some(function(x) {
			return x == JSON.parse(uno[0][i].getAttribute("data-field")).author.name //no repeat in different authors
		})) && !(PageData.user_name == JSON.parse(uno[0][i].getAttribute("data-field")).author.name)) { //no repeat in your own username
			var tmpobj = {};
			tmpobj.name = JSON.parse(uno[0][i].getAttribute("data-field")).author.name;
			tmpobj.floor = JSON.parse(uno[0][i].getAttribute("data-field")).content.floor;
			userName[0].push(tmpobj);
			userName[2].push(tmpobj.name); //only push name in userName[2]
		}
	}

	//get author in lzl floor, no repeat, put it in userName[1]
	for (i = 0; i < l[1]; i++) {
		if (!(userName[1].some(function(x) {
			return x == JSON.parse(uno[1][i].getAttribute("data-field")).user_name //no repeat in userName[1] itself
		})) && !(userName[2].some(function(x) {
			return x == JSON.parse(uno[1][i].getAttribute("data-field")).user_name //no repeat in userName[0]
		})) && !(PageData.user_name == JSON.parse(uno[1][i].getAttribute("data-field")).user_name)) { //no repeat in your own username
			userName[1].push(JSON.parse(uno[1][i].getAttribute("data-field")).user_name);
		}
	}
};

function getTail() {
	getUserName();
	var tail;

	//check special list
	var specialTail = " ";
	for (var i = 0; i < specialList.length; i++) {
		for (var j = 0; j < userName[2].length; j++) {
			if (specialList[i].name == userName[2][j]) {
				specialTail += "\n<b>" + userName[0][j].floor + "</b>楼的<font color=\"#e10602\"><b>" + specialList[i].nick + "</font></b>肉味是众多肉味中最鲜美的一种！"
			}
		}
	}

	//get the first letter and filt the repeat letter
	userName[1] = filtUserName(userName[1]);
	userName[2] = filtUserName(userName[2]);

	//get page number
	if (document.getElementsByClassName("tP")[0]) {
		tail = "第" + document.getElementsByClassName("tP")[0].innerHTML + "页";
	} else {
		tail = "楼上";
	}
	if (userName[2].length >= 2) {
		tail += "有很多野味。比如：<font color=\"#e10602\"><b>" + userName[2].join("</font></b>肉味、<font color=\"#e10602\"><b>") + "</font></b>肉味。";
	} else if (userName[2].length == 1) {
		tail += "有<font color=\"#e10602\"><b>" + userName[2].join() + "</font></b>肉味。";
	} else {
		tail = "觅食中⋯⋯⋯⋯"
	}

	if (userName[1].length >= 2) {
		tail += "还有很多健康蔬菜。有：<font color=\"#e10602\"><b>" + userName[1].join("</font></b>菜味、<font color=\"#e10602\"><b>") + "</font></b>菜味。";
	} else if (userName[1].length == 1) {
		tail += "还有<font color=\"#e10602\"><b>" + userName[1].join() + "</font></b>菜味";
	} else {
		tail += "";
	}
	tail += specialTail;

	var d = document.createElement("div");
	d.style.display = "none";
	d.className = "myMeatTail";
	document.body.appendChild(d);
	d.innerHTML = tail;
};

function filtUserName(arr) {
	var tmparr = [];
	arr.forEach(function(x) {
		tmparr.push(x.toString()[0])
	});
	for (var i = 0; i < tmparr.length - 1; i++) {
		for (var j = i + 1; j < tmparr.length; j++) {
			if (tmparr[i] == tmparr[j]) {
				tmparr[i] += arr[i].toString()[tmparr[i].length];
				tmparr[j] += arr[j].toString()[tmparr[j].length];
			}
		}
	}
	return tmparr;
};

//main entrance
if (!(document.getElementById("f_add_vote_btn"))) {
	getTail();
} else {
	var e = document.createElement("div");
	e.style.display = "none";
	e.className = "myMeatTail";
	document.body.appendChild(e);
	e.innerHTML = "觅食中⋯⋯⋯⋯";
}


//"——————"+document.getElementsByClassName("myMeatTail")[0].innerHTML;