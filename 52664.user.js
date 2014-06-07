// ==UserScript==
// @name attack test
// @author soldatovsh@mail.ru
// @version 1.00
// @description  Enables some Travian v3.5 features
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude  	http://*.gettertools.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
if (location.hash == "#RallyPointFilter" || location.hash == "#RallyPointFilterCrop") {
    unsafeWindow.ab = {};
    unsafeWindow.bb = {};
    unsafeWindow.eb = 1
}
var $, GM_JQ = document.createElement("script");
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
GM_JQ.type = "text/javascript";
document.body.appendChild(GM_JQ);
var checker = setInterval(function () {
    if (typeof($ = unsafeWindow.jQuery) != "undefined") {
        clearInterval(checker);
        letsJQuery()
    }
},
100),
    data_arr = [],
    naw = null,
    col = 0,
    sityNow = "",
    attackType = 2,
    rpFilter = false,
    acc_name = "",
    no_more_unit = false,
    iteration = 1;

function letsJQuery() {
	//
	 a = /karte.php/;
    if (a.test(location.href)) {
		//alert(0)	
		var tttt = $('#content table:eq(2) tr:eq(2) td a').text()
		if(tttt!=''){
			alert('!!!')
		}
	}
	//	
    acc_name = $('#side_navi a[href*="chat.php"]').attr("href").split("|")[1];
    sityNow = $('td[class="dot hl"]').next().text();
    if (location.hash == "#RallyPointFilter") RallyPointFilter();
    else location.hash == "#RallyPointFilterCrop" && RallyPointFilterCrop();
    if (location.hash == "#AutoFarm") {
        var a = readCookie(acc_name + "_auto_cookie"),
            d = readCookie(acc_name + "_auto_sity_cookie");
        if (a && a == 1) {
            if (d && d == sityNow) {
                trace("farmBuilderAuto()");
                farmBuilderAuto()
            } else {
                trace("\u0441\u0442\u043e\u043f, \u0438\u0431\u043e \u043f\u0435\u0440\u0435\u043f\u0440\u044b\u0433\u043d\u0443\u043b\u0438");
                eraseCookie(acc_name + "_auto_cookie");
                eraseCookie(acc_name + "_auto_sity_cookie")
            }
            if (location.href != "http://" + location.hostname + "/berichte.php?t=3#AutoFarm") {
                trace("\u0434\u0440\u0443\u0433\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430");
                eraseCookie(acc_name + "_auto_cookie");
                eraseCookie(acc_name + "_auto_sity_cookie")
            }
        }
    } else {
        eraseCookie(acc_name + "_auto_cookie");
        eraseCookie(acc_name + "_auto_sity_cookie")
    }
    $("#side_navi").append('<p style="background:#ffffdb;padding:5px 0; border:1px solid silver"><a href="/build.php?id=39&k#RallyPointFilter" > [\u042d\u043a\u0441\u043f\u043e\u0440\u0442 \u043d\u0430\u043f\u043e\u0432] </a><a href="/build.php?id=39&k#RallyPointFilterCrop" >[\u0424\u0430\u0440\u043c > \u0441\u043a\u043b\u0430\u0434]</a></p>');
    a = /berichte.php/;
    if (a.test(location.href)) {
        $("#overview").after('<div style="padding:5px; height:50px; border:1px solid silver; background:#ffffdb" id="out_i"></div>');
        a = readCookie(acc_name + "_hand_cookie");
        d = "";
        d += '<div style="float:left"><span style="font-size:13px; font-weight:normal"> [<a href="#" id="link1">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442</a>] <br>[<a href="#" id="link2">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442 (\u043d\u043e\u0432\u043e\u0435)</a>]</span><br>[<a href="#" id="link4">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442 (\u0432\u0441\u0435)</a>]</span></div>';
        d += '<div style="float:left; padding-left:70px">\u0442\u0438\u043f \u0430\u0442\u0430\u043a\u0438<br>';
        if (a) {
            attackType = a;
            d += a == 1 ? '<input id="__r1" type="radio" name="fb_st" value="1" checked=""> \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2"> \u043d\u0430\u0431\u0435\u0433 <br>' : '<input id="__r1" type="radio" name="fb_st" value="1"> \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2" checked=""> \u043d\u0430\u0431\u0435\u0433 <br>';
            createCookie(acc_name + "_hand_cookie", a, 10)
        } else {
            d += '<input id="__r1" type="radio" name="fb_st" value="1" > \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2" checked=""> \u043d\u0430\u0431\u0435\u0433 <br>';
            createCookie(acc_name + "_hand_cookie", 2, 10)
        }
        d += "</div>";
        $("#out_i").append(d);
        $("#link1").one("click", function () {
            farmBuilder();
            $(this).click(function () {
                return false
            });
            return false
        });
        $("#link2").one("click", function () {
            farmBuilder("new");
            $(this).click(function () {
                return false
            });
            return false
        });
        $("#link4").one("click", function () {
            farmBuilder("all");
            $(this).click(function () {
                return false
            });
            return false
        });
        $("#link3").one("click", function () {
            SendAllOpen("new");
            $(this).click(function () {
                return false
            });
            return false
        });
        $("#__r1,#__r2").click(function () {
            var b = $(this).attr("value");
            createCookie(acc_name + "_hand_cookie", b, 10);
            attackType = b
        });
        $("#go_auto").one("click", function () {
            createCookie(acc_name + "_auto_sity_cookie", sityNow, 0);
            createCookie(acc_name + "_auto_cookie", 1, 0);
            location.href = "/berichte.php?t=3#AutoFarm"
        })
    }
}
function SendAllOpen() {
    trace("===");
    trace($("span.aller").length);
    $.each($("span.aller"), function (a, d) {
        a = $(d).find('input[type="button"]').attr("num");
        d = $("#t1_" + a).attr("value");
        var b = $("#t3_" + a).attr("value"),
            c = $("#t6_" + a).attr("value");
        data_arr[a] = {};
        data_arr[a].t1 = d;
        data_arr[a].t3 = b;
        data_arr[a].t6 = c;
        col = 0;
        col = d * 1 + b * 1 + c * 1;
        $("#s" + a).html("\u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445...");
        naw = a;
        getFarmForm(1, $(this).attr("rel"), a)
    })
}
function farmBuilderAuto() {
    trace("--\>");
    var a = $('#overview tbody tr a:contains("' + sityNow + '")'),
        d = a.length,
        b = [];
    trace("count " + d);
    $.each(a, function (c, e) {
        if (c == 0) {
            e = $(e).attr("href").split("=")[1];
            b[c] = e;
            iteration = c * 1 + 1;
            farmBuilderElementsAuto(e)
        }
    })
}
function farmBuilderElementsAuto(a) {
    $.get("/berichte.php", {
        id: a
    },


    function (d) {
        var b = $(d).find("#report_surround tbody");
        d = new Array(b.find(".units:eq(0) tr:eq(1) td:eq(0)").text(), b.find(".units:eq(0) tr:eq(1) td:eq(2)").text(), b.find(".units:eq(0) tr:eq(1) td:eq(5)").text());
        var c = new Array(b.find(".units:eq(0) tr:eq(2) td:eq(0)").text(), b.find(".units:eq(0) tr:eq(2) td:eq(2)").text(), b.find(".units:eq(0) tr:eq(2) td:eq(5)").text()),
            e = new Array(b.find(".units:eq(0) tr:eq(1) td:eq(1)").text(), b.find(".units:eq(0) tr:eq(1) td:eq(3)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(4)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(6)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(7)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(8)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(9)").text() * 1, b.find(".units:eq(0) tr:eq(1) td:eq(10)").text() * 1),
            f = 0;
        for (i = 0; i < e.length; i++) f += e[i];
        b = b.find("a:eq(3)").attr("href").split("=")[1].split("&")[0];
        trace(d);
        trace(c);
        trace("href: " + b);
        trace("num: " + a);
        trace("---");
        data_arr[a] = {};
        data_arr[a].t1 = d[0];
        data_arr[a].t3 = d[1];
        data_arr[a].t6 = d[2];
        trace(data_arr[a]);
        col = 0;
        col = d[0] * 1 + d[1] * 1 + d[2] * 1;
        naw = a
    })
}
function getFarmFormAuto(a, d, b) {
    switch (a) {
    case 1:
        $.get("/a2b.php", {
            z: d
        },


        function (c) {
            c = $(c).find("form");
            c = $(c).find(":input").serializeArray();
            var e = {};
            $.each(c, function (f, g) {
                e[g.name] = g.value
            });
            c = id2xy(d);
            e.c = attackType * 1 + 2;
            e.s1 = "ok";
            e.x = c[0];
            e.y = c[1];
            e.t1 = data_arr[b].t1;
            e.t3 = data_arr[b].t3;
            e.t6 = data_arr[b].t6;
            data_arr[b] = e;
            getFarmFormAuto(2, d, b)
        });
        break;
    case 2:
        $.post("/a2b.php", data_arr[b], function (c) {
            c = $(c).find("form");
            c = $(c).find(":input").serializeArray();
            var e = {};
            $.each(c, function (f, g) {
                e[g.name] = g.value
            });
            if (e.t1 * 1 + e.t3 * 1 + e.t6 * 1 != data_arr[b].t1 * 1 + data_arr[b].t3 * 1 + data_arr[b].t6 * 1) {
                no_more_unit = true;
                data_arr[b] = null
            } else {
                data_arr[b] = null;
                data_arr[b] = e;
                getFarmFormAuto(3, d, b)
            }
        });
        break;
    case 3:
        $.post("/a2b.php", data_arr[b], function (c) {
            getFarmFormAuto(4, d, b)
        });
        break;
    case 4:
        a = {};
        a["n" + iteration] = b;
        a["del.x"] = 10;
        a["del.y"] = 11;
        trace(a);
        $.post("/berichte.php", a, function (c) {
            trace("ok")
        });
        break
    }
}
function farmBuilder(a) {
    a = a == "new" ? $('#overview tbody tr td.sub:contains("(\u043d\u043e\u0432\u043e\u0435)"):contains("\u0430\u0442\u0430\u043a\u0443\u0435\u0442")').find('a:contains("' + sityNow + '")') : a == "all" ? $('#overview tbody tr td.sub:contains("\u0430\u0442\u0430\u043a\u0443\u0435\u0442")').find("a") : $('#overview tbody tr td.sub:contains("\u0430\u0442\u0430\u043a\u0443\u0435\u0442")').find('a:contains("' + sityNow + '")');
    var d = a.length,
        b = [];
    $.each(a, function (c, e) {
        var f = $(e).attr("href").split("=")[1];
        b[c] = f;
        $(e).parent().css({
            background: "#fffdc9"
        });
        $(e).parent().parent().css({
            background: "#fffdc9"
        });
        $(e).parent().parent().after('<tr><td colspan="3" id="m' + f + '">...\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043e\u0442\u0447\u0435\u0442\u0430...</td></tr>')
    });
    for (i = 0; i < d; i++) farmBuilderElements(b[i])
}
function farmBuilderElements(a) {
    $.get("/berichte.php", {
        id: a
    },


    function (d) {
        d = $(d).find("#report_surround tbody");
        d.find(".carry").html();
        var b = new Array(d.find(".units:eq(0) tr:eq(1) td:eq(0)").text(), d.find(".units:eq(0) tr:eq(1) td:eq(2)").text(), d.find(".units:eq(0) tr:eq(1) td:eq(5)").text()),
            c = d.find("a:eq(3)").attr("href").split("=")[1].split("&")[0];
        b = atackForm(c, b, a);
        $("#m" + a).html('<table id="report_surround">' + d.html() + "</table>");
        $("#m" + a).append('<br><span class="aller" id="s' + a + '">' + b + "</span>");
        $("#m" + a).find("a").click(function () {
            $(this).parent().find(".add").toggle();
            return false
        });
        $("#btn_" + a).attr("rel", c);
        $("#btn_" + a).attr("num", a);
        $("#btn_" + a).one("click", function () {
            var e = $("#t1_" + a).attr("value"),
                f = $("#t3_" + a).attr("value"),
                g = $("#t6_" + a).attr("value"),
                h = $("#t2_" + a).attr("value"),
                j = $("#t4_" + a).attr("value"),
                k = $("#t5_" + a).attr("value"),
                l = $("#t7_" + a).attr("value"),
                m = $("#t11_" + a).attr("value");
            data_arr[a] = {};
            data_arr[a].t1 = e;
            data_arr[a].t3 = f;
            data_arr[a].t6 = g;
            data_arr[a].t2 = h;
            data_arr[a].t4 = j;
            data_arr[a].t5 = k;
            data_arr[a].t7 = l;
            data_arr[a].t11 = m;
            col = 0;
            col = e * 1 + f * 1 + g * 1 + h * 1 + j * 1 + k * 1 + l * 1 + m * 1;
            $("#s" + a).html("\u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445...");
            naw = a;
            getFarmForm(1, $(this).attr("rel"), a)
        })
    })
}
function getFarmForm(a, d, b) {
    switch (a) {
    case 1:
        $.get("/a2b.php", {
            z: d
        },


        function (c) {
            c = $(c).find("form");
            c = $(c).find(":input").serializeArray();
            var e = {};
            $.each(c, function (f, g) {
                e[g.name] = g.value
            });
            c = id2xy(d);
            e.c = attackType * 1 + 2;
            e.s1 = "ok";
            e.x = c[0];
            e.y = c[1];
            e.t1 = data_arr[b].t1;
            e.t3 = data_arr[b].t3;
            e.t6 = data_arr[b].t6;
            e.t2 = data_arr[b].t2;
            e.t4 = data_arr[b].t4;
            e.t5 = data_arr[b].t5;
            e.t7 = data_arr[b].t7;
            e.t11 = data_arr[b].t11;
            data_arr[b] = e;
            getFarmForm(2, d, b)
        });
        break;
    case 2:
        $.post("/a2b.php", data_arr[b], function (c) {
            var e = $(c).find("form");
            e = $(e).find(":input").serializeArray();
            var f = {};
            $.each(e, function (g, h) {
                f[h.name] = h.value
            });
            _sityNow = $(c).find('td[class="dot hl"]').next().text();
            if (f.t1 * 1 + f.t3 * 1 + f.t6 * 1 + f.t2 * 1 + f.t4 * 1 + f.t5 * 1 + f.t7 * 1 + f.t11 * 1 != data_arr[b].t1 * 1 + data_arr[b].t3 * 1 + data_arr[b].t6 * 1 + data_arr[b].t2 * 1 + data_arr[b].t4 * 1 + data_arr[b].t5 * 1 + data_arr[b].t7 * 1 + data_arr[b].t11 * 1) {
                $("#s" + b).parent().parent().prev().find("td:eq(1)").css({
                    background: "#ffc9c9"
                });
                $("#s" + b).parent().parent().prev().css({
                    background: "#ffc9c9"
                });
                $("#s" + b).html('<b style="color:red">\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0432\u043e\u0439\u0441\u043a! \u0430\u0442\u0430\u043a\u0430 \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430</b>');
                data_arr[b] = null
            } else if (_sityNow != sityNow) {
                $("#s" + b).parent().parent().prev().find("td:eq(1)").css({
                    background: "#ffc9c9"
                });
                $("#s" + b).parent().parent().prev().css({
                    background: "#ffc9c9"
                });
                $("#s" + b).html('<b style="color:red">\u043f\u0435\u0440\u0435\u043f\u0440\u044b\u0433\u043d\u0443\u043b\u0438 \u043d\u0430 \u0434\u0440\u0443\u0433\u043e\u0435 \u0441\u0435\u043b\u043e :(</b>');
                data_arr[b] = null
            } else {
                data_arr[b] = null;
                data_arr[b] = f;
                getFarmForm(3, d, b)
            }
        });
        break;
    case 3:
        $.post("/a2b.php", data_arr[b], function () {
            $("#m" + b).toggle();
            var c = $("#s" + b).parent().parent().prev();
            c.find("td:eq(1)").css({
                background: "#c9fffe"
            });
            c.css({
                background: "#c9fffe"
            });
            c.find("input").attr({
                checked: "checked"
            })
        });
        break
    }
}
function atackForm(a, d, b) {
    var c = "";
    a = id2xy(a);
    c += '<img class="unit u11" alt="\u0414\u0443\u0431\u0438\u043d\u0449\u0438\u043a" title="\u0414\u0443\u0431\u0438\u043d\u0449\u0438\u043a" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[0] + '" name="t1" id="t1_' + b + '" />';
    c += '&nbsp;<img class="unit u13" alt="\u0422\u043e\u043f\u043e\u0440\u0449\u0438\u043a" title="\u0422\u043e\u043f\u043e\u0440\u0449\u0438\u043a" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[1] + '" name="t3" id="t3_' + b + '" />';
    c += '&nbsp;<img class="unit u16" alt="\u0422\u0435\u0432\u0442\u043e\u043d\u0441\u043a\u0430\u044f \u043a\u043e\u043d\u043d\u0438\u0446\u0430" title="\u0422\u0435\u0432\u0442\u043e\u043d\u0441\u043a\u0430\u044f \u043a\u043e\u043d\u043d\u0438\u0446\u0430" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[2] + '" name="t6" id="t6_' + b + '" />';
    c += '&nbsp;<a href="#">[+]</a>&nbsp;';
    c += "&nbsp;" + a[0] + "|" + a[1] + ' <input id="btn_' + b + '" value="\u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c" rel="' + b + '" type="button" src="img/x.gif" /><br><br>';
    c += '<div style="display:none" class="add">';
    c += '<img class="unit u12" alt="\u041a\u043e\u043f\u044c\u0435\u043d\u043e\u0441\u0435\u0446" title="\u041a\u043e\u043f\u044c\u0435\u043d\u043e\u0441\u0435\u0446" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t2" id="t2_' + b + '" />';
    c += '&nbsp;<img class="unit u14" alt="\u0421\u043a\u0430\u0443\u0442" title="\u0421\u043a\u0430\u0443\u0442" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t4" id="t4_' + b + '" />';
    c += '&nbsp;<img class="unit u15" alt="\u041f\u0430\u043b\u0430\u0434\u0438\u043d" title="\u041f\u0430\u043b\u0430\u0434\u0438\u043d" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t5" id="t5_' + b + '" />';
    c += '&nbsp;<img class="unit u17" alt="\u0421\u0442\u0435\u043d\u043e\u0431\u0438\u0442\u043d\u043e\u0435 \u043e\u0440\u0443\u0434\u0438\u0435" title="\u0421\u0442\u0435\u043d\u043e\u0431\u0438\u0442\u043d\u043e\u0435 \u043e\u0440\u0443\u0434\u0438\u0435" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t7" id="t7_' + b + '" />';
    c += '&nbsp;<img class="unit uhero" alt="\u0413\u0435\u0440\u043e\u0439" title="\u0413\u0435\u0440\u043e\u0439" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t11" id="t11_' + b + '" />';
    c += "</div>";
    return c
}
function _ob(a) {
    p = a.split(":");
    return qb = p[0] * 3600 + p[1] * 60 + p[2] * 1
}
function _ob2(a) {
    p = a.split("|");
    return qb = p[p.length - 1] * 1
}
var market = [],
    market_gl = [];

function RallyPointFilterCrop() {
    market_gl[0] = Math.round($("#l1").attr("title") * 1 / 3600);
    market = [];
    var a = $("#l1").text();
    a = a.match(/(\d+)\/(\d+)/);
    market_gl[1] = a[1] * 1;
    market_gl[2] = a[2] * 1;
    time_naw = $("#tp1").text().split(":");
    time_naw[0] *= 1;
    time_naw[1] *= 1;
    time_naw[2] *= 1;
    $.each($("#content .troop_details .res"), function (d, b) {
        market.push([d + 1, "", _ob($(b).parent().parent().parent().next().find(".in span").text()), _ob2($(b).text())])
    });
    market_list()
}
function market_list() {
    var a, d = 0,
        b = "",
        c = "";
    for (i = 0; i < market.length; i++) {
        if (market_gl[1] < 0) market_gl[1] = 0;
        a = market_gl[1] + market[i][3] + market_gl[0] * (market[i][2] - d);
        d = "";
        if (a > market_gl[2]) {
            d = '<b style="color:red"> +' + (market_gl[2] - market_gl[1]) + "</b>";
            market_gl[1] = market_gl[2]
        } else market_gl[1] = a;
        a = time_naw[0] * 3600 + time_naw[1] * 60 + time_naw[2];
        var e = a + market[i][2];
        a = Math.ceil(e / 3600) - 1;
        var f = Math.ceil((e - a * 3600) / 60) - 1;
        e = e - a * 3600 - f * 60;
        a = a % 24 < 10 ? "0" + a % 24 : a % 24;
        f = f < 10 ? "0" + f : f;
        e = e < 10 ? "0" + e : e;
        var g = market[i][2],
            h = Math.ceil(g / 3600) - 1,
            j = Math.ceil((g - h * 3600) / 60) - 1;
        g = g - h * 3600 - j * 60;
        h = h % 24 < 10 ? "0" + h % 24 : h % 24;
        j = j < 10 ? "0" + j : j;
        g = g < 10 ? "0" + g : g;
        var k = parseInt(market_gl[1] / market_gl[2] * 100),
            l;
        if (k > 100) l = 100;
        else if (k < 0) {
            l = 0;
            d = '<b style="color:red"> ' + market_gl[1] + "</b>"
        } else l = k;
        var m = 100 - k;
        k = m * m / 100 + "%, " + (0.82 * k + k * m / 100) + "%, " + k + "%";
        c += "\n<div><span style='border-right: " + 3 * l + "px solid rgb(" + k + ");'>" + a + ":" + f + ":" + e + " | " + h + ":" + j + ":" + g + " </span> &nbsp; " + market[i][1] + " +" + market[i][3] + " [" + market_gl[1] + "] " + d + "</div>";
        d = market[i][2];
        if (i + 1 == market.length) {
            h = Math.abs(Math.round(market_gl[1] / market_gl[0]));
            e = a * 3600 + f * 60 + e * 1 + h;
            a = Math.ceil(e / 3600) - 1;
            f = Math.ceil((e - a * 3600) / 60) - 1;
            e = e - a * 3600 - f * 60;
            a = a % 24 < 10 ? "0" + a % 24 : a % 24;
            f = f < 10 ? "0" + f : f;
            e = e < 10 ? "0" + e : e;
            g = market[i][2] * 1 + h;
            h = Math.ceil(g / 3600) - 1;
            j = Math.ceil((g - h * 3600) / 60) - 1;
            g = g - h * 3600 - j * 60;
            h = h % 24 < 10 ? "0" + h % 24 : h % 24;
            j = j < 10 ? "0" + j : j;
            g = g < 10 ? "0" + g : g;
            c += "\n<div><span style='color:red'>" + a + ":" + f + ":" + e + " | " + h + ":" + j + ":" + g + "</span></div>"
        }
    }
    a = "http://www.nirn.ru/test_alexsol/trav.php";
    f = window.open("", "listWindow2", "resizable=yes,height=1000,width=900,top=100,left=180");
    f = f.document;
    f.write('<html style="margin: 10px;"><head><title>**</title>');
    f.write("<style>div{padding-bottom:4px;font-family:Verdana, Geneva, sans-serif;font-size:11px;}</style>");
    f.write('</head><body style="padding: 10px;" onload="document.forms[0].submit()"><p> ... </p>');
    f.write('<div style="overflow:auto;width:90%; height:90%;">' + c + "</div>");
    f.write('<form id="cropdata" method="POST" action="' + a + '" target="Exec" ><div style="display:none"><input type="hidden" name="wwid" value="' + wwid + '" /><input type="submit" value=" ...% " /><br><textarea readonly name="source" rows="10" cols="60" >' + b + '</textarea></div></form><iframe name="Exec" width="0" height="0" id="Exec" style="display:none"></iframe>');
    f.write("</body></html>");
    f.close()
}
function RallyPointFilter() {
    var a = "";
    $.each($("#content .troop_details"), function (b, c) {
        b = $(c).find("tbody:eq(0) tr:eq(1) td:eq(0)").text();
        if (b == "?") {
            b = $(c).find("thead td:eq(1) a").text();
            if (b.indexOf("\u041d\u0430\u0431\u0435\u0433") != -1 || b.indexOf("\u041d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435") != -1) {
                b = $(c).find("thead td:eq(0) a");
                var e = id2xy(b.attr("href").split("=")[1].split("&")[0]);
                b.text(b.text() + " (" + e[0] + "|" + e[1] + ")");
                a += '<table class="troop_details">' + $(c).html() + "</table>"
            }
        }
    });
    if (a != "") {
        var d = window.open("", "listWindow2", "resizable=yes,height=500,width=800,top=900,left=180");
        d = d.document;
        d.write('<html style="margin: 10px;"><head><title></title>');
        d.write(' <link href="gpack/travian35/gp_compact.css?602df" rel="stylesheet" type="text/css" /><link href="gpack/travian35/lang/ru/lang.css?602df" rel="stylesheet" type="text/css" /> <link href="img/travian_basics.css" rel="stylesheet" type="text/css" />');
        d.write('</head><body style="padding: 10px;" ><div id="build" class="gid16">');
        d.write('<div style="overflow:auto;width:90%; height:90%;">' + a + "</div>");
        d.write("</div></body></html>");
        d.close()
    }
}
function id2xy(a) {
    var d = [];
    d[0] = a % 801 ? a % 801 - 401 : 400;
    d[1] = 400 - (a - 401 - d[0]) / 801;
    return d
}
function trace(a) {
    console.info(a)
}
function createCookie(a, d, b) {
    if (b) {
        var c = new Date;
        c.setTime(c.getTime() + b * 24 * 60 * 60 * 1000);
        b = "; expires=" + c.toGMTString()
    } else b = "";
    document.cookie = a + "=" + d + b + "; path=/"
}
function readCookie(a) {
    a = a + "=";
    for (var d = document.cookie.split(";"), b = 0; b < d.length; b++) {
        for (var c = d[b]; c.charAt(0) == " ";) c = c.substring(1, c.length);
        if (c.indexOf(a) == 0) return c.substring(a.length, c.length)
    }
    return null
}
function eraseCookie(a) {
    createCookie(a, "", -1)
};