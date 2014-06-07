// ==UserScript==
// @name       meizi搜寻器
// @version    0.0.2.5
// @author   Retaker <i@retaker.me>
// @description  Tieba Advanced辅助脚本 最后面的注释请贴到Tieba Advanced的JS尾巴里
// @namespace   http://retaker.me/
// @grant       none
// @include     http://tieba.baidu.com/f?*
// @include     http://tieba.baidu.com/p/*
// @run-at      document-end
// @license     Copyleft: All rights reversed.
// @updateURL       https://userscripts.org/scripts/source/175466.meta.js
// @downloadURL     https://userscripts.org/scripts/source/175466.user.js
// ==/UserScript==

var meiZhi = [
	[],
	[],
	[]
];

function getMeizhiTail() {
	var uid = [];

	var d = document.createElement("div");
	d.style.display = "none";
	d.className = "myMeizhiTail";
	document.body.appendChild(d);
	d.innerHTML = getTail();

for (var i = 0; i < document.getElementsByClassName("maizhi_link").length; i++) {
	if (!(uid.some(function(x) {
				return x == JSON.parse(document.getElementsByClassName("maizhi_link")[i].dataset.field).user_id
				}))) {
				uid.push(JSON.parse(document.getElementsByClassName("maizhi_link")[i].dataset.field).user_id);
			}
		};
	for (var i = 0; i < uid.length; i++) {
		var obj = {
			type: 1
		};
		obj.user_id = uid[i];
		$.post("http://tieba.baidu.com/encourage/get/meizhi/panel", obj, function(x) {
			if (!(JSON.parse(x).no)) {
				var userName = JSON.parse(x).data.uname;
				var buff = range(JSON.parse(x).data.vote_count.meizhi, JSON.parse(x).data.vote_count.renyao, JSON.parse(x).data.vote_count.weiniang);
				if (buff == "meizhi") {
					meiZhi[0].push(userName);
				} else if (buff == "renyao") {
					meiZhi[1].push(userName);
				} else {
					meiZhi[2].push(userName);
				}
				d.innerHTML = getTail();
			}
		})
	};
};

function getTail() {
	if (document.getElementsByClassName("tP")[0]) {
		tail = "第" + document.getElementsByClassName("tP")[0].innerHTML + "页";
	} else {
		tail = "楼上";
	}
	if (meiZhi[0].length == 0) {
		tail += "<font color=\"#e10602\"><b>没有</b></font>妹子。。。"
	} else if (meiZhi[0].length == 1) {
		tail += "只有一只妹子，她是：<font color=\"#e10602\"><b>" + meiZhi[0].join() + "</b></font>。";
	} else {
		tail += "共有" + meiZhi[0].length + "只妹子,她们分别是<font color=\"#e10602\"><b>" + meiZhi[0].join("</font>、<font color=\"#e10602\">") + "</font></b>。";
	}

	if (meiZhi[1].length == 0) {
		tail += "<font color=\"#e10602\"><b>没有</b></font>人妖！"
	} else if (meiZhi[1].length == 1) {
		tail += "只有一只人妖，它是：<font color=\"#e10602\"><b>" + meiZhi[1].join() + "</b></font>。";
	} else {
		tail += "共有" + meiZhi[1].length + "只人妖,它们分别是<font color=\"#e10602\"><b>" + meiZhi[1].join("</font>、<font color=\"#e10602\">") + "</font></b>。";
	}

	if (meiZhi[2].length == 0) {
		tail += "<font color=\"#e10602\"><b>没有</b></font>伪娘！"
	} else if (meiZhi[2].length == 1) {
		tail += "只有一只伪娘，他是：<font color=\"#e10602\"><b>" + meiZhi[2].join() + "</b></font>。";
	} else {
		tail += "共有" + meiZhi[2].length + "只伪娘,他们分别是<font color=\"#e10602\"><b>" + meiZhi[2].join("</font>、<font color=\"#e10602\">") + "</font></b>。";
	}


	tail += "楼下的绅(hen)士(tai)们";
	var result = range(meiZhi[0].length, meiZhi[1].length, meiZhi[2].length);
	if (result == "meizhi" && meiZhi[0].length < 6) {
		tail += "准备好了吗？";
	} else if (result == "meizhi" && meiZhi[0].length > 6) {
		tail += "赶快行动啊！";
	} else if (result == "renyao") {
		tail += "可要小心啊！";
	} else {
		tail += "菊花洗好了吗？";
	}
	return tail;
};

function range(meizhi, renyao, weiniang) {
	if (meizhi > renyao) {
		if (meizhi > weiniang) {
			return "meizhi"
		} else {
			return "weiniang"
		}
	} else if (meizhi < renyao) {
		if (renyao > weiniang) {
			return "renyao"
		} else {
			return "weiniang"
		}
	}
};
if (!(document.getElementById("f_add_vote_btn"))) {
	getMeizhiTail();
} else {
	var e = document.createElement("div");
	e.style.display = "none";
	e.className = "myMeizhiTail";
	document.body.appendChild(e);
	e.innerHTML = "搜寻妹纸中⋯⋯";
}


//"-------"+document.getElementsByClassName("myMeizhiTail")[0].innerHTML;