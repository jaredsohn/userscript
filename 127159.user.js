// ==UserScript==
// @name           ffowiki_myhistory
// @namespace      kotaroho+userscripts@gmail.com
// @include        http://wiki.ffo.jp/*
// @version        2.1.4
// ==/UserScript==

(function (d, func) {
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement("script");
	s1.setAttribute("src", "http://wiki.ffo.jp/jquery.js");
	//s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	s1.addEventListener('load', function() {
		var s2 = d.createElement("script");
		s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {
	// ここにメインの処理を書く
	var hipar = { data: Array(), dataName: "hist", id: "history", name: "足あと", pos: "", show: true };
	var empar = { data: Object(), dataName: "em", id: "empyrean", name: "エンピ装束", pos: "bottom: 1px; right: 1px; width: auto;", show: false };
	var brpar = { data: Array(), dataName: "bodyright", id: "bodyright", name: "右寄せ", pos: "bottom: 1px; right: 333px; width: 168px;", show: false };
	var bmpar = Array(
		{ data: Array(), dataName: "bm", id: "bookmark", name: "しおり", pos: "bottom: 1px; left: 2px;", show: true },
		{ data: Array(), dataName: "tg", id: "toggle", name: "しおり2", pos: "bottom: 1px; right: 173px;", show: false }
	);
	var rv = Array();
	var aqpar = { data: Object(), dataName: "aq", id: "adquest", name: "アドゥリン クエスト", pos: "top: 1px; right: 1px; width: 520px; z-index: 1;", show: false };
	var backup = { user: "user", server: "server", show: false };
	if ((typeof localStorage !== 'undefined') && (localStorage['backup'])) {
		backup = JSON.parse(localStorage['backup']);
	}
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) {
		backup.show = true;
	}
	var localServer = "http://freenas:18181/";
	$.getJSON(
		localServer + 'ping.php?callback=?',
		{
			"ping": "ping"
		},
		function(data, status) {
			$("head").append(
				"<style type='text/css'>" +
				"body .map, body .togglebu, body #mybackupdiv { visibility: visible; }\n" +
				"</style>"
			);
		}
	);

	var searchurl = "/search.cgi?imageField.x=0&imageField.y=0&CCC=%E6%84%9B&Command=Search&order=match&ffotype=title&type=title&qf=";
	// ジョブ イニシャル
	var jobs = {
		"戦": { "エンピ": "ラベジャーアーマー",	"エンピアクセサリ": { "禁断": "首", "死闘": "投", "覇者": "耳" } },
		"モ": { "エンピ": "タントラアタイア",	"エンピアクセサリ": { "禁断": "首", "死闘": "投", "覇者": "耳" } },
		"白": { "エンピ": "オリゾンアタイア",	"エンピアクセサリ": { "禁断": "背", "死闘": "首", "覇者": "耳" } },
		"黒": { "エンピ": "ゴエティアアタイア",	"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"赤": { "エンピ": "エストクルアーマー",	"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"シ": { "エンピ": "レイダーアタイア",	"エンピアクセサリ": { "禁断": "腰", "死闘": "投", "覇者": "耳" } },
		"ナ": { "エンピ": "クリードアーマー",	"エンピアクセサリ": { "禁断": "首", "死闘": "腰", "覇者": "耳" } },
		"暗": { "エンピ": "ベイルアーマー",		"エンピアクセサリ": { "禁断": "腰", "死闘": "首", "覇者": "耳" } },
		"獣": { "エンピ": "フェリンアーマー",	"エンピアクセサリ": { "禁断": "背", "死闘": "首", "覇者": "耳" } },
		"吟": { "エンピ": "アエドアタイア",		"エンピアクセサリ": { "禁断": "腰", "死闘": "首", "覇者": "耳" } },
		"狩": { "エンピ": "シルバンアタイア",	"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"侍": { "エンピ": "雲海具足",			"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"忍": { "エンピ": "伊賀装束",			"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"竜": { "エンピ": "ランサーアーマー",	"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"召": { "エンピ": "コーラーアタイア",	"エンピアクセサリ": { "禁断": "腰", "死闘": "首", "覇者": "耳" } },
		"青": { "エンピ": "マーヴィアタイア",	"エンピアクセサリ": { "禁断": "首", "死闘": "投", "覇者": "耳" } },
		"コ": { "エンピ": "ナバーチアタイア",	"エンピアクセサリ": { "禁断": "首", "死闘": "背", "覇者": "耳" } },
		"か": { "エンピ": "チルコアタイア",		"エンピアクセサリ": { "禁断": "首", "死闘": "腰", "覇者": "耳" } },
		"踊": { "エンピ": "カリスアタイア",		"エンピアクセサリ": { "禁断": "首", "死闘": "投", "覇者": "耳" } },
		"学": { "エンピ": "サバントアタイア",	"エンピアクセサリ": { "禁断": "投", "死闘": "首", "覇者": "耳" } }
	};
	// AF 5部位
	var afEqs = {
		"頭": { "五行": "木", "color": "green",  "素材": { "原": "戦白シ吟狩", "小": "黒暗獣忍召", "宝": "モ赤侍コか", "絵": "ナ竜青踊学" } },
		"胴": { "五行": "火", "color": "red",    "素材": { "原": "戦ナ吟忍青", "小": "シ暗狩召コ", "宝": "黒赤侍か踊", "絵": "モ白獣竜学" } },
		"手": { "五行": "土", "color": "yellow", "素材": { "原": "戦赤シ獣学", "小": "白暗狩青踊", "宝": "モ黒吟侍召", "絵": "ナ忍竜コか" } },
		"脚": { "五行": "金", "color": "white",  "素材": { "原": "戦黒忍青か", "小": "赤シナ暗吟", "宝": "モ獣狩侍学", "絵": "白竜召コ踊" } },
		"足": { "五行": "水", "color": "black",  "素材": { "原": "戦赤ナ召踊", "小": "モ暗青コ学", "宝": "白シ吟侍か", "絵": "黒獣狩忍竜" } }
	};
	// 五行
	var fourTypes = { "原": "green", "小": "red", "宝": "yellow", "絵": "blue" };
	var threePlaces = { "禁断": "禁", "死闘": "闘", "覇者": "覇" };
	function getFourColor(job, eq) {
		for (var i in afEqs[eq]["素材"]) {
			if (afEqs[eq]["素材"][i].search(job) > -1) {
				return fourTypes[i];
			}
		}
		return "";
	};
	function getAfEq(fcolor) {
		for (var i in afEqs) {
			if (afEqs[i]["五行"] == fcolor) {
				return i;
			}
		}
		return "";
	}
	var empTableHorizontal = false;
	function getBrowserHeight() {
		if ( window.innerHeight ) {
			return window.innerHeight;
		} else if ( document.documentElement && document.documentElement.clientHeight != 0 ) {
			return document.documentElement.clientHeight;
		} else if ( document.body ) {
			return document.body.clientHeight;
		}
		return 0;
	}
	if (getBrowserHeight() < 740) {
		empTableHorizontal = true;
	}

	// #myhistory, 一般 関連 CSS
	$("head").append(
		"<style type='text/css'>" +
		".myffowikidiv { background-color: #FAFAEF; margin: 0 1px; border: 1px solid black; }\n" +
		"#myhistory li { font-size: 12px; }\n" +
		"#body { margin: 1px; width: auto; }\n" +
		"#body.right { width: 760px; float: right; }\n" +
		"#header { width: auto; height: auto; padding: 5px; }\n" +
		".bottomdiv { background-color: #FAFAEF; width: 156px; box-shadow: 0 0 2px gray; margin: 0 1px; border: 1px solid black; z-index: 1; position: fixed; }\n" +
		"#menu .bottomdiv .bottomul li { font-size: 12px; }\n" +
		"#myempyreandiv .menuheader { text-align: right; }\n" +
		"#content { z-index: 0; }\n" +
		".map, .togglebu, #mybackupdiv { visibility: hidden; }\n" +
		"#afmatrix .green, #fivematrix .green { background-color: #01DF01; }\n" +
		"#afmatrix .red, #fivematrix .red { background-color: #FF0080; }\n" +
		"#afmatrix .yellow, #fivematrix .yellow { background-color: #FFFF00; }\n" +
		"#afmatrix .blue, #fivematrix .blue { background-color: #0080FF; }\n" +
		"#afmatrix input, #fivematrix input { width: 20px; text-align: center; }\n" +
		(empTableHorizontal ?
			"#afmatrix, #fivematrix { float: left; }\n" +
			"#myempyrean { background-color: #FAFAEF; bottom: 40px; position: absolute; right: 0; width: 742px; box-shadow: 0 0 2px gray; }\n" +
			".bottomtable:after { clear: both; display: block; content: ''; }\n"
		: "" ) +
		"</style>"
	);

	// #myadquest 関連
	$.ajax({
		url: "/html/28048.html",
		success: function(data) {
			doAdquest(aqpar, data);
		}
	});
	function doAdquest(par, page) {
		if (!loadPar(par)) {
			// data 初期化
			par.data["quest"] = Object();
			savePar(par);
		}
		var divid = "#my" + par.id;
		$("head").append(
			"<style type='text/css'>" +
			divid + "div { " + par.pos + " }" +
			divid + "div table { border-collapse: collapse; }" +
			divid + "div td, " + divid + "div th { border: 1px solid black; padding: 2px; text-align: center; }" +
			"#myadquest { max-height: 700px; overflow: auto; }\n" +
			".adqtable input { width: 20px; text-align: center; }\n" +
			".adqtable .completed { display: none; }\n" +
			".adqtable.show-all .completed { display: table-row; }\n" +
			"</style>"
		);
		$("#menu").append("<div id='my" + par.id + "div' class='bottomdiv'>" +
			"<div class='menuheader'>" + par.name +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + (( par.show) ? "" : "style='display: none;'") + ">[閉]</a>" +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + ((!par.show) ? "" : "style='display: none;'") + ">[開]</a>" +
			"</div>" +
			"<div id='my" + par.id + "'" + ((par.show) ? "" : " style='display: none;'") + " class='bottomtable'>" +
			"</div>" +
			"</div>");
		$(page).find("#article").find(".content table").addClass("adqtable").appendTo($("#my" + par.id));
		$(".adqtable thead tr").prepend("<td><input type='checkbox' /></td><td></td>");
		$(".adqtable tbody tr").each(function() {
			var href=$(this).find("a").attr("href");
			if (!par.data["quest"][href]) {
				par.data["quest"][href] = Object();
				par.data["quest"][href]["c"] = "";
				par.data["quest"][href]["t"] = "";
			}
			$(this).prepend(
				"<td><input class='adqcbx' type='checkbox' qp='" + href + "'" + ((par.data["quest"][href]["c"] == "") ? "" : " checked='checked'") + "/></td>" +
				"<td><input type='text' qp='" + href + "' value='" + par.data["quest"][href]["t"] + "'/></td>"
			);
			if (par.data["quest"][href]["c"] != "") {
				$(this).addClass("completed");
			}
			if (location.pathname == href) {
				$("#article .title").prepend("<input class='adqcbx' type='checkbox' qp='" + href + "'" + ((par.data["quest"][href]["c"] == "") ? "" : " checked='checked'") + "/>");
			}
		});

		$(".menuheader .toggle" + par.id).click(function() {
			$("#my" + par.id).toggle();
			$(".menuheader .toggle" + par.id).toggle();
		});

		$(".adqcbx").change(function() {
			var href = $(this).attr("qp");
			var checked = $(this).attr("checked")
			par.data["quest"][href]["c"] = checked;
			savePar(par);
			$(".adqcbx[qp='" + href + "']").attr("checked", checked);
			$(".adqcbx[qp='" + href + "']").parent("td").parent("tr").toggleClass("completed");
		});
		$(".adqtable tbody input[type='text']").change(function() {
			par.data["quest"][$(this).attr("qp")]["t"] = $(this).val();
			savePar(par);
		});
		$(".adqtable thead input[type='checkbox']").change(function() {
			$(".adqtable").toggleClass("show-all");
		});
	}

	// #myhistory 関連
	loadPar(hipar);
	$("form[name='text']").after("<div class='menuheader'>足あと</div><div id='my" + hipar.id + "div' class='myffowikidiv'><ul id='my" + hipar.id + "'></ul></div>");
	var titlesp = $("h1").text().split("/");
	titlesp.pop();
	var title = titlesp.join("/");
	var url = window.location.href;
	url = removeYpos(url);
	var pair = { title: title, url: url };
	for (var i = hipar.data.length - 1; i >= 0; --i) {
		if ((!hipar.data[i]) || (hipar.data[i].url == pair.url)) {
			hipar.data.splice(i, 1);
		}
	}

	hipar.data.unshift(pair);
	if (hipar.data.length >= 30) {
		hipar.data.splice(29, hipar.data.length - 30);
	}
	savePar(hipar);
	showMyHistory();

	// エンピリアン装束
	doEmpyrean(empar);

	// 右寄せ
	doBodyright(brpar);

	// #mybookmark 関連
	var vars = getUrlVars();
	if (vars.ypos) {
		window.scroll( 0, vars.ypos );
	}
	for (var i = 0; i < bmpar.length; ++i) {
		doBookmark(bmpar[i]);
	}


	// Category 関連
	if (vars.Command) {
		$("<span class='myshowall'>[全件表示]</span>").click(function() {
			var links = Array();
			$("#article .content dl dd a").each(function() {
				var href = $(this).attr('href');
				if (links.indexOf(href) < 0) {
					links.push(href);
				}
			});
			for (var i = 0; i < links.length; ++i) {
				$.get("/" + links[i], function(data) {
					var lis = $("#article .content ul li", data);
					lis.appendTo("#article .content ul");
				});
			}
			$("a").attr("target", "_blank");
			$(".myshowall").remove();
		}).prependTo("#content");

		$("<span class='myshowlv'>[LV表示]</span>").click(function() {
			$("#article li").each(function() {
				var href = $(this).children("a").attr("href");
				var obj = $(this);
				$.get(href, function(data) {
					var bq = $("blockquote:first", data);
					bq.contents().not("[nodeType=1]").wrap("<span/>");
					//bq.prependTo(obj);
					var lvt = bq.children("a[href='/html/345.html']").next().text().replace(/^\s+|\s+$/g, "");
					if (lvt.match(/^\d\D/)) {
						lvt = "0" + lvt;
					}
					obj.addClass(lvt);
					prependElemOf('/html/437.html');
					prependElemOf('/html/2803.html');
					prependElemOf('/html/448.html');
					prependElemOf('/html/439.html');
					prependElemOf('/html/345.html');
					function prependElemOf(href) {
						bq.children("a[href='" + href + "']").each(function() {
							$(this).next().andSelf().prependTo(obj);
						});
					}
				});
			});
			$("a").attr("target", "_blank");
			$(".myshowlv").remove();
		}).prependTo("#content");

		$("<span class='mysort'>[ソート]</span>").click(function() {
			var lvs = Array();
			$('#article li').each(function() {
				lvs.push($(this).attr('class'));
			});
			lvs.sort();
			var ul = $('#article ul');
			var lis = $('#article li');
			for (var i = 0; i < lvs.length; ++i) {
				lis.filter("." + lvs[i]).prependTo(ul);
			}
			$("a").attr("target", "_blank");
			$(".mysort").remove();
		}).prependTo("#content");
	}

	// #myreverse 関連
	if (vars.Command) {

	$("head").append(
		"<style type='text/css'>" +
		"#myreversediv { width: 156px; box-shadow: 0 0 2px gray; margin: 0 1px; border: 1px solid black; position: fixed; top: 1px; right: 1px; }" +
		"#myreverse li { font-size: 12px; }" +
		"</style>"
	);

	if ((typeof localStorage !== 'undefined') && (localStorage.rv)) {
		rv = JSON.parse(localStorage.rv);
	}
	$("#menu").append("<div id='myreversediv' class='myffowikidiv'><div class='menuheader'>複合逆引き <a class='addrv' href='javascript:void(0);'>[+]</a> " +
		"<a class='togglerv' href='javascript:void(0);'>[閉]</a>" +
		"<a class='togglerv' href='javascript:void(0);' style='display: none;'>[開]</a>" +
		"</div><ul id='myreverse'></ul></div>");
	showMyReverse();

	$(".menuheader .addrv").click(function() {
		var pair = { title: title, url: url.split("#")[0] };
		var list = Array();
		$("#article .content li a").each(function() {
			var elem = { title: $(this).text(), url: $(this).attr('href') };
			list.push(elem);
		});
		pair.list = list;
		for (var i = rv.length - 1; i >= 0; --i) {
			if ((!rv[i]) || (rv[i].url == pair.url)) {
				rv.splice(i, 1);
			}
		}
		rv.unshift(pair);
		saveRv();
		showMyReverse();
	});

	$(".menuheader .togglerv").click(function() {
		$("#myreverse").slideToggle("fast");
		$(".menuheader .togglerv").toggle();
	});

	}

	// 関数
	function doBookmark(par) {
		$("head").append(
			"<style type='text/css'>" +
			"#my" + par.id + "div { " + par.pos + " }" +
			"</style>"
		);
		par.data = Array();
		loadPar(par);
		$("#menu").append("<div id='my" + par.id + "div' class='bottomdiv'><div class='menuheader'>" + par.name + " <a class='add" + par.id + "' href='javascript:void(0);'>[+]</a> " +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + (( par.show) ? "" : "style='display: none;'") + ">[閉]</a>" +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + ((!par.show) ? "" : "style='display: none;'") + ">[開]</a></div>" +
			"<ul id='my" + par.id + "'" + ((par.show) ? "" : " style='display: none;'") + " class='bottomul'></ul></div>");
		showMyParam(par);

		$(".menuheader .add" + par.id).click(function() {
			var pair = { title: title + "." + getScrollTop(), url: addYpos(url.split("#")[0], getScrollTop()) };
			for (var i = par.data.length - 1; i >= 0; --i) {
				if ((!par.data[i]) || (par.data[i].url == pair.url)) {
					par.data.splice(i, 1);
				}
			}
			par.data.unshift(pair);
			if (par.data.length >= 30) {
				par.data.splice(29, par.data.length - 30);
			}
			savePar(par);
			showMyParam(par);
		});

		$(".menuheader .toggle" + par.id).click(function() {
			$("#my" + par.id).slideToggle("fast");
			$(".menuheader .toggle" + par.id).toggle();
		});
	}
	function doEmpyrean(par) {
		if (!loadPar(par)) {
			// data 初期化
			par.data["af"] = Object();
			for (var j in jobs) {
				par.data["af"][j] = Object();
				for (var e in afEqs) {
					par.data["af"][j][e] = "";
				}
				for (var p in threePlaces) {
					par.data["af"][j][p] = jobs[j]["エンピアクセサリ"][p];
				}
			}
			par.data["five"] = Object();
			for (var t in fourTypes) {
				par.data["five"][t] = Object();
				for (var e in afEqs) {
					par.data["five"][t][afEqs[e]["五行"]] = "";
				}
			}
			savePar(par);
		} else if (!par.data["af"]["戦"]["禁断"]) {
			for (var j in jobs) {
				for (var p in threePlaces) {
					par.data["af"][j][p] = jobs[j]["エンピアクセサリ"][p];
				}
			}
			savePar(par);
		}
		var divid = "#my" + par.id;
		$("head").append(
			"<style type='text/css'>" +
			divid + "div { " + par.pos + " }" +
			divid + "div table { border-collapse: collapse; }" +
			divid + "div td, " + divid + "div th { border: 1px solid black; padding: 2px; text-align: center; }" +
			"</style>"
		);
		$("#menu").append("<div id='my" + par.id + "div' class='bottomdiv'>" +
			"<div id='my" + par.id + "'" + ((par.show) ? "" : " style='display: none;'") + " class='bottomtable'><table id ='afmatrix'><thead>" +
			"<tr><th></th></tr>" +
			"</thead><tbody></tbody></table>" +
			"<table id ='fivematrix'><thead><tr><th></th></tr></thead><tbody></tbody></table>" +
			"</div>" +
			"<div class='menuheader'>" + par.name +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + (( par.show) ? "" : "style='display: none;'") + ">[閉]</a>" +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + ((!par.show) ? "" : "style='display: none;'") + ">[開]</a></div>" +
			"</div>");
		// エンピ装束テーブル生成
		if (empTableHorizontal) {
			makeEmpTableHorizontal();
		} else {
			makeEmpTableVertical();
		}

		function makeEmpTableVertical() {
			for (var e in afEqs) {
				$("#afmatrix thead tr").append("<th>" + e + "</th>");
				$("#fivematrix thead tr").append("<th><a href='" + searchurl + encodeURIComponent(afEqs[e]["五行"] + "行の") + "'>" + afEqs[e]["五行"] + "</a></th>");
			}
			for (var p in threePlaces) {
				$("#afmatrix thead tr").append("<th>" + threePlaces[p] + "</th>");
			}
			for (var j in jobs) {
				$("#afmatrix tbody").append("<tr class='" + j + "'><th><a href='" + searchurl + encodeURIComponent(jobs[j]["エンピ"]) + "'>" + j + "</a></th></tr>");
				for (var e in afEqs) {
					$("#afmatrix tbody ." + j).append("<td class='" + getFourColor(j, e) + "'><input value='" + par.data["af"][j][e] + "' job='" + j + "' eq='" + e + "'/></td>");
				}
				for (var p in threePlaces) {
					$("#afmatrix tbody ." + j).append("<td class='" + "afac" + "'><input value='" + par.data["af"][j][p] + "' job='" + j + "' eq='" + p + "'/></td>");
				}
			}
			for (var t in fourTypes) {
				$("#fivematrix tbody").append("<tr class='" + t + " " + fourTypes[t] + "'><th>" + t + "</th></tr>");
				for (var e in afEqs) {
					$("#fivematrix tbody ." + t).append("<td><input value='" + par.data["five"][t][afEqs[e]["五行"]] + "' fitem='" + t + "' fcolor='" + afEqs[e]["五行"] + "'/></td>");
				}
			}
		}

		function makeEmpTableHorizontal() {
			for (var j in jobs) {
				$("#afmatrix thead tr").append("<th><a href='" + searchurl + encodeURIComponent(jobs[j]["エンピ"]) + "'>" + j + "</a></th>");
			}
			for (var t in fourTypes) {
				$("#fivematrix thead tr").append("<th class='" + t + " " + fourTypes[t] + "'>" + t + "</th>");
			}
			for (var e in afEqs) {
				$("#afmatrix tbody").append("<tr class='" + e + "'><th>" + e + "</th></tr>");
				for (var j in jobs) {
					$("#afmatrix tbody ." + e).append("<td class='" + getFourColor(j, e) + "'><input value='" + par.data["af"][j][e] + "' job='" + j + "' eq='" + e + "'/></td>");
				}
				$("#fivematrix tbody").append("<tr class='" + e + " " + afEqs[e]["五行"] + "'><th><a href='" + searchurl + encodeURIComponent(afEqs[e]["五行"] + "行の") + "'>" + afEqs[e]["五行"] + "</a></th></tr>");
				for (var t in fourTypes) {
					$("#fivematrix tbody ." + e).append("<td class='" + fourTypes[t] + "'><input value='" + par.data["five"][t][afEqs[e]["五行"]] + "' fitem='" + t + "' fcolor='" + afEqs[e]["五行"] + "'/></td>");
				}
			}
			for (var p in threePlaces) {
				$("#afmatrix tbody").append("<tr class='" + p + "'><th>" + threePlaces[p] + "</th></tr>");
				for (var j in jobs) {
					$("#afmatrix tbody ." + p).append("<td class='" + "afac" + "'><input value='" + par.data["af"][j][p] + "' job='" + j + "' eq='" + p + "'/></td>");
				}
			}
		}

		// エンピ装束テーブル生成完了
		$(".menuheader .toggle" + par.id).click(function() {
			$("#my" + par.id).toggle();
			$(".menuheader .toggle" + par.id).toggle();
		});
		$("#afmatrix input").change(function() {
			par.data["af"][$(this).attr("job")][$(this).attr("eq")] = $(this).val();
			if (($(this).val() == "") && (threePlaces[$(this).attr("eq")])) {
				par.data["af"][$(this).attr("job")][$(this).attr("eq")] = jobs[$(this).attr("job")]["エンピアクセサリ"][$(this).attr("eq")];
			}
			savePar(par);
		});
		$("#fivematrix input").change(function() {
			par.data["five"][$(this).attr("fitem")][$(this).attr("fcolor")] = $(this).val();
			savePar(par);
		});
		$("#fivematrix input").focus(function() {
			$("#afmatrix td." + fourTypes[$(this).attr("fitem")] + " input[eq=" + getAfEq($(this).attr("fcolor")) + "]").addClass(fourTypes[$(this).attr("fitem")]);
		});
		$("#fivematrix input").blur(function() {
			$("#afmatrix td." + fourTypes[$(this).attr("fitem")] + " input[eq=" + getAfEq($(this).attr("fcolor")) + "]").removeClass(fourTypes[$(this).attr("fitem")]);
		});
	}
	function doBodyright(par) {
		par.data[0] = false;
		$("head").append(
			"<style type='text/css'>" +
			"#my" + par.id + "div { " + par.pos + " }" +
			"#mybackupdiv { top: 1px; right: 1px; width: 320px; z-index: 2; }" +
			"</style>"
		);
		loadPar(par);
		if (par.data[0]) {
			$("#body").toggleClass("right");
		}
		$("#menu").append("<div id='my" + par.id + "div' class='bottomdiv'><div class='menuheader'>" + par.name +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + (( par.data[0]) ? "" : "style='display: none;'") + ">[off]</a>" +
			"<a class='toggle" + par.id + "' href='javascript:void(0);'" + ((!par.data[0]) ? "" : "style='display: none;'") + ">[on]</a>" +
			" <a class='map' href='" + localServer + "map/' target='_blank'>[map]</a>" +
			"<a class='togglebu' href='javascript:void(0);'>[b]</a>" +
			"</div></div>");
		$("#menu").append("<div id='mybackupdiv' class='bottomdiv'" + ((backup.show) ? "" : "style='display: none;'") + "><div class='menuheader'>" + "バックアップ" +
			"<a class='importData" + "' href='javascript:void(0);'>[imD]</a>" +
			"<a class='exportData" + "' href='javascript:void(0);'>[exD]</a>" +
			"<a class='userSwitch" + "' href='javascript:void(0);'>[uSw]</a>" +
			"<a class='serverSwitch" + "' href='javascript:void(0);'>[sSw]</a>" +
			"</div></div>");

		$(".menuheader .toggle" + par.id).click(function() {
			$("#body").toggleClass("right");
			$(".menuheader .toggle" + par.id).toggle();
			par.data[0] = !par.data[0];
			savePar(par);
		});
		$(".menuheader .togglebu").click(function() {
			$("#mybackupdiv").toggle();
			backup.show = !backup.show;
			if (typeof localStorage !== 'undefined') {
				localStorage['backup'] = JSON.stringify(backup);
			}
		});

		$(".importData").click(importData);
		$(".exportData").click(exportData);
		$(".userSwitch").click(userSwitch);
		$(".serverSwitch").click(serverSwitch);
	}
	function showMyParam(par) {
		$("#my" + par.id).empty();
		for (var i = 0; i < par.data.length; ++i) {
			$("#my" + par.id).append("<li><a href='" + par.data[i].url + "'>" + par.data[i].title + "</a> " +
				"<span class='" + par.data[i].url + "'>[-]</span></li>");
		}
		$("#my" + par.id + " span").click(function() {
			for (var i = par.data.length - 1; i >= 0; --i) {
				if ((!par.data[i]) || (par.data[i].url == $(this).attr("class"))) {
					par.data.splice(i, 1);
				}
				savePar(par);
				showMyParam(par);
			}
		});
	}
	function loadPar(par) {
		if ((typeof localStorage !== 'undefined') && (localStorage[par.dataName])) {
			par.data = JSON.parse(localStorage[par.dataName]);
			return true;
		}
		return false;
	}
	function savePar(par) {
		if (typeof localStorage !== 'undefined') {
			localStorage[par.dataName] = JSON.stringify(par.data);
		}
	}
	function showMyHistory() {
		$("#myhistory").empty();
		for (var i = 0; i < hipar.data.length; ++i) {
			$("#myhistory").append("<li><a href='" + hipar.data[i].url + "'>" + hipar.data[i].title + "</a> " +
				"<span class='" + hipar.data[i].url + "'>[-]</span></li>");
		}
		$("#myhistory span").click(function() {
			for (var i = hipar.data.length - 1; i >= 0; --i) {
				if ((!hipar.data[i]) || (hipar.data[i].url == $(this).attr("class"))) {
					hipar.data.splice(i, 1);
				}
				savePar(hipar);
				showMyHistory();
			}
		});
	}
	function getScrollTop() {
		return (document.documentElement.scrollTop | document.body.scrollTop);
	}
	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	function removeYpos(url) {
		url = url.replace(/ypos=\d+&*/, "").replace(/(\?|&)$/, "").replace(/\?&/, "?").replace("http:\/\/" + location.host, "");
		return url;
	}
	function addYpos(url, pos) {
		url = removeYpos(url);
		if (url.indexOf('?') > 0) {
			url += "&";
		} else {
			url += "?";
		}
		url += "ypos=" + pos;
		return url;
	}
	function showMyReverse() {
		$("#myreverse").empty();
		for (var i = 0; i < rv.length; ++i) {
			$("#myreverse").append("<li><a href='" + rv[i].url + "'>" + rv[i].title + "</a> " +
				"<span class='mi' url='" + rv[i].url + "'>[-]</span>" +
				"<span class='ma' url='" + rv[i].url + "'>[m]</span>" +
				"</li>");
		}
		$("#myreverse span.mi").click(function() {
			for (var i = rv.length - 1; i >= 0; --i) {
				if ((!rv[i]) || (rv[i].url == $(this).attr("url"))) {
					rv.splice(i, 1);
				}
				saveRv();
				showMyReverse();
			}
		});
		$("#myreverse span.ma").click(function() {
			var list;
			for (var i = 0; i < rv.length; ++i) {
				if ((!rv[i]) || (rv[i].url == $(this).attr("url"))) {
					list = rv[i].list;
				}
			}
			$("#article .content li").each(function() {
				var elem = { title: $(this).children("a").text(), url: $(this).children("a").attr('href') };
				var found = 0;
				for (var i = 0; i < list.length; ++i) {
					if (list[i].url == elem.url) {
						found = 1;
						break;
					}
				}
				if (!found) {
					$(this).remove();
				}
			});
			$("a").attr("target", "_blank");
		});
	}
	function saveRv() {
		if (typeof localStorage !== 'undefined') {
			localStorage.rv = JSON.stringify(rv);
		}
	}
	// Vana'diel Monsters 呼び出し準備
	// POST http://ff11.s288.xrea.com/db/moblist/search.php lv1=50&lv2=60&region=&area=&area_type=0&area_weather=0&signet=0&expansion=&mob_class=2&mob_family=&sub_family=&job=0&drop_item=&name=&tag=&nm=&weather=0&normal_pop=1&adddate=

	function exportData() {
		$("body").append('<form id="exportForm" method="post" action="' + backup['server'] + 'postdata.php" style="display: none;"></form>');
		$("#exportForm").append("<input name='user' value='" + backup['user'] + "'/>");
		$("#exportForm").append("<input name='hipar' value='" + JSON.stringify(hipar.data) + "'/>");
		$("#exportForm").append("<input name='empar' value='" + JSON.stringify(empar.data) + "'/>");
		$("#exportForm").append("<input name='brpar' value='" + JSON.stringify(brpar.data) + "'/>");
		$("#exportForm").append("<input name='bmpar0' value='" + JSON.stringify(bmpar[0].data) + "'/>");
		$("#exportForm").append("<input name='bmpar1' value='" + JSON.stringify(bmpar[1].data) + "'/>");
		$("#exportForm").append("<input name='rv' value='" + localStorage.rv + "'/>");
		$("#exportForm").submit();
	/*
		$.post(
			"/postdata.php",                      // リクエストURL
			{
				"user": backup['user'],
				"hipar": JSON.stringify(hipar.data),
				"empar": JSON.stringify(empar.data),
				"brpar": JSON.stringify(brpar.data),
				"bmpar0": JSON.stringify(bmpar[0].data),
				"bmpar1": JSON.stringify(bmpar[1].data),
				"rv": JSON.stringify(rv)
			},  // データ
			function(data, status) {
				alert("data exported\n" + data);
			},
			"html"
		);
	*/
	}

	function importData() {
		$.getJSON(
			backup['server'] + 'getdata.php?callback=?',
			{	// 送信データ
				"user": backup['user']
			},
			function(data, status) {	// 通信成功時にデータを表示
				localStorage['hist'] = data.hipar;
				localStorage['em'] = data.empar;
				localStorage['bodyright'] = data.brpar;
				localStorage['bm'] = data.bmpar0;
				localStorage['tg'] = data.bmpar1;
				localStorage['rv'] = data.rv;
				alert("data imported\n");
				document.location.reload();
			}
		);
	/*
		$.get(
			"/getdata.php",
			{
				"user": backup['user']
			},
			function(data, status) {
				localStorage['hist'] = data.hipar;
				localStorage['em'] = data.empar;
				localStorage['bodyright'] = data.brpar;
				localStorage['bm'] = data.bmpar0;
				localStorage['tg'] = data.bmpar1;
				localStorage['rv'] = data.rv;
				alert("data imported\n");
			},
			"json"
		);
	*/
	}

	function userSwitch() {
		var pinput = prompt("ユーザー名を入力（半角英字）", backup['user']);
		if (pinput != null) {
			backup['user'] = pinput;
			if (typeof localStorage !== 'undefined') {
				localStorage['backup'] = JSON.stringify(backup);
			}
		}
	}
	function serverSwitch() {
		pinput = prompt("サーバーアドレスを入力", backup['server']);
		if (pinput != null) {
			backup['server'] = pinput;
			if (typeof localStorage !== 'undefined') {
				localStorage['backup'] = JSON.stringify(backup);
			}
		}
	}
});
