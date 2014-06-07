// ==UserScript==
// @name       meizi搜寻器
// @version    0.0.2.4
// @author   Retaker <i@retaker.me>
// @description  Tieba Advanced辅助脚本 最后面的注释请贴到Tieba Advanced的JS尾巴里
// @namespace   http://retaker.me/
// @grant       none
// @include     http://tieba.baidu.com/f?*
// @include     http://tieba.baidu.com/p/*
// @run-at      document-end
// @license     Copyleft: All rights reversed.
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

	for (var i = 0; i < document.getElementsByClassName("d_name").length; i++) {
		if ((document.getElementsByClassName("d_name")[i].getElementsByClassName("meizhi_vip")[0] != undefined) && !(uid.some(function(x) {
			return x == JSON.parse(document.getElementsByClassName("d_name")[i].getAttribute("data-field")).user_id
		})) && PageData.user_name!=JSON.parse(document.getElementsByClassName("d_name")[i].getAttribute("data-field")).user_id) {
			uid.push(JSON.parse(document.getElementsByClassName("d_name")[i].getAttribute("data-field")).user_id);
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
		tail += "<span color=\"#e10602\"><b>没有</b></span>妹子。。。"
	} else if (meiZhi[0].length == 1) {
		tail += "只有一只妹子，她是：<span color=\"#e10602\"><b>" + meiZhi[0].join() + "</b></span>。";
	} else {
		tail += "共有" + meiZhi[0].length + "只妹子,她们分别是<span color=\"#e10602\"><b>" + meiZhi[0].join("</span>、<span color=\"#e10602\">") + "</span></b>。";
	}

	if (meiZhi[1].length == 0) {
		tail += "<span color=\"#e10602\"><b>没有</b></span>人妖！"
	} else if (meiZhi[1].length == 1) {
		tail += "只有一只人妖，它是：<span color=\"#e10602\"><b>" + meiZhi[1].join() + "</b></span>。";
	} else {
		tail += "共有" + meiZhi[1].length + "只人妖,它们分别是<span color=\"#e10602\"><b>" + meiZhi[1].join("</span>、<span color=\"#e10602\">") + "</span></b>。";
	}

	if (meiZhi[2].length == 0) {
		tail += "<span color=\"#e10602\"><b>没有</b></span>伪娘！"
	} else if (meiZhi[2].length == 1) {
		tail += "只有一只伪娘，他是：<span color=\"#e10602\"><b>" + meiZhi[2].join() + "</b></span>。";
	} else {
		tail += "共有" + meiZhi[2].length + "只伪娘,他们分别是<span color=\"#e10602\"><b>" + meiZhi[2].join("</span>、<span color=\"#e10602\">") + "</span></b>。";
	}


	tail += "<img src='http://www.baidu.com/img/bdlogo.gif' class='BDE_Image' >楼下的绅(hen)士(tai)们";
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
