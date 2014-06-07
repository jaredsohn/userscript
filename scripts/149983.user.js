// ==UserScript==
// @name           fav_card_get
// @version        1.1.2
// @namespace      http://example.com/
// @include        http://*.3gokushi.jp/alliance/info.php*
// @include        http://*.1kibaku.jp/alliance/info.php*
// @description    お気に入り武将一覧出力(同盟)
// ==/UserScript==

var MEMBER_ID_LIST = new Array();
var MEMBER_ID_LIST_COUNTER;
var MEMBER_ID_MAX_COUNTER;
var MEMBER_INFO_TEXT;
var MEMBER_SLEEP_TID;
var j$;

//main
(function () {

    jQueryAppend();

    favcardCSV();

})();

function favcardCSV() {
    //CSV出力用
    if (j$("#favcsvMake").size() == 0) {
        j$("table.tables")
			.before("<iframe style=\"width: 100%; height: 0px; visibility:hidden\" id=\"favCsvFrame\"></iframe>")
			.before("<p id=\"favcsvMake\">お気に入り武将カード情報取得</p>");

        j$("#favcsvMake").css("background", "black").css("width", "220px").css("color", "white").css("text-align", "center");
    }
    j$("#favcsvMake").click(function () {
        if (j$("#favcsvMake").text() != "お気に入り武将カード情報取得") { return; }
        if (confirm("情報を一気に取得するためサーバに負荷がかかります。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false) return;

        MEMBER_ID_LIST = new Array();
        j$("table.tables td a").each(function () {
            var url = j$(this).attr("href");
            var uid = url.match(/user_id=[0-9]+/);
            if (uid != null) {
                MEMBER_ID_LIST.push({ "URL": "/user/?" + uid });
            }
        });

        MEMBER_INFO_TEXT = "君主,レア,武将,カードNo,レベル,経験値,スコア,攻撃,知力,歩防,槍防,弓防,騎防,移速,スキル1,スキル2,スキル3\n";
        setWaitCursor();
        MEMBER_ID_LIST_COUNTER = MEMBER_ID_LIST.length;
        MEMBER_ID_MAX_COUNTER = MEMBER_ID_LIST_COUNTER;
        window.setTimeout(GetMember, 0);
//        setDefaultCursor();
    });
}

function GetMember() {

    j$("#favcsvMake").text("情報取得中" + (MEMBER_ID_MAX_COUNTER - MEMBER_ID_LIST_COUNTER) + "/" + MEMBER_ID_MAX_COUNTER);
    if (MEMBER_ID_LIST.length == 0) {
        if (MEMBER_ID_LIST_COUNTER > 0) {
            window.setTimeout(GetMember, 1000);
        } else {
            var frameDoc = document.getElementById("favCsvFrame").contentDocument;
            var addElem = frameDoc.createElement("pre");
            addElem.id = "favCsv";
            addElem.style.fontSize = "12px";
            frameDoc.body.appendChild(addElem);

            addElem.innerHTML = MEMBER_INFO_TEXT;
            j$("#favCsvFrame").css("height", "300px").css("visibility", "visible");
            j$("#favcsvMake").text("お気に入り武将カード情報取得(済)");
            resetCursor();
            alert("情報　取得完了!");

            return;
        }
    }

    var member = MEMBER_ID_LIST.pop();
    cajaxRequest(member.URL, "GET", "", function (req) {
        var dt = getFavfromUserHTML(req.responseText);
        if (dt) {
            for (var i = 0; i < dt.length; i++) {
                MEMBER_INFO_TEXT += convCsvString(dt[i].user_name) + ",";
                MEMBER_INFO_TEXT += convCsvString(dt[i].rarerity) + ",";
                MEMBER_INFO_TEXT += convCsvString(dt[i].cardname) + ",";
                MEMBER_INFO_TEXT += dt[i].cardno + ",";
                MEMBER_INFO_TEXT += dt[i].level + ",";
                MEMBER_INFO_TEXT += dt[i].ex + ",";
                MEMBER_INFO_TEXT += dt[i].score + ",";
                MEMBER_INFO_TEXT += dt[i].att + ",";
                MEMBER_INFO_TEXT += dt[i].inte + ",";
                MEMBER_INFO_TEXT += dt[i].wdef + ",";
                MEMBER_INFO_TEXT += dt[i].sdef + ",";
                MEMBER_INFO_TEXT += dt[i].bdef + ",";
                MEMBER_INFO_TEXT += dt[i].rdef + ",";
                MEMBER_INFO_TEXT += dt[i].speed + ",";
                MEMBER_INFO_TEXT += convCsvString(dt[i].skill1) + ",";
                MEMBER_INFO_TEXT += convCsvString(dt[i].skill2) + ",";
                MEMBER_INFO_TEXT += convCsvString(dt[i].skill3) + ",\n";

            }
        }

        MEMBER_ID_LIST_COUNTER = MEMBER_ID_LIST_COUNTER - 1;
    });
    window.setTimeout(GetMember, 0);

    function getFavfromUserHTML(html) {
        var ret = new Array();
        var tmp = html.match(/<td[^>]*>君主<\/td>[^<]*<td[^>]*>([^<\s]+)/);
        if (!tmp) return null;
        var user_name = tmp[1];

        var tmp = html.match(/"rarerity_[^>]*>([^<]*)<\/span>/);
        if (!tmp) {
            var rarerity = "";
        }
        else {
            var rarerity = tmp[1];
        }

        var tmp = html.match(/"name1[^>]*>([^<]*)<\/span>/);
        if (!tmp) {
            var cardname = "";
        }
        else {
            var cardname = tmp[1];
        }

        var tmp = html.match(/"level_[^>]*>([^<]*)<\/span>/);
        if (!tmp) {
            var level = "";
        }
        else {
            var level = tmp[1];
        }

        var tmp = html.match(/"ex">経験値:([0-9]*)/);
        if (!tmp) {
            var ex = "";
        }
        else {
            var ex = tmp[1];
        }

        var tmp = html.match(/"score">([0-9]*)/);
        if (!tmp) {
            var score = "";
        }
        else {
            var score = tmp[1];
        }

        var tmp = html.match(/"cardno">([^<]*)<\/span>/);
        if (!tmp) {
            var cardno = "";
        }
        else {
            var cardno = tmp[1];
        }

        var tmp = html.match(/"status_att">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var att = "";
        }
        else {
            var att = tmp[1];
        }

        var tmp = html.match(/"status_int">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var inte = "";
        }
        else {
            var inte = tmp[1];
        }

        var tmp = html.match(/"status_wdef">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var wdef = "";
        }
        else {
            var wdef = tmp[1];
        }

        var tmp = html.match(/"status_sdef">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var sdef = "";
        }
        else {
            var sdef = tmp[1];
        }

        var tmp = html.match(/"status_bdef">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var bdef = "";
        }
        else {
            var bdef = tmp[1];
        }

        var tmp = html.match(/"status_rdef">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var rdef = "";
        }
        else {
            var rdef = tmp[1];
        }

        var tmp = html.match(/"status_speed">([0-9\.]*)<\/span>/);
        if (!tmp) {
            var speed = "";
        }
        else {
            var speed = tmp[1];
        }

        var tmp = html.match(/"skillName1 [a-z]*">([^<]*)<\/span>/);
        if (!tmp) {
            var skill1 = "";
        }
        else {
            var skill1 = tmp[1];
        }

        var tmp = html.match(/"skillName2 [a-z]*">([^<]*)<\/span>/);
        if (!tmp) {
            var skill2 = "";
        }
        else {
            var skill2 = tmp[1];
        }

        var tmp = html.match(/"skillName3 [a-z]*">([^<]*)<\/span>/);
        if (!tmp) {
            var skill3 = "";
        }
        else {
            var skill3 = tmp[1];
        }

        ret.push({ "user_name": user_name, "rarerity": rarerity, "cardname": cardname, "level": level, "ex": ex, "score": score, "cardno": cardno, "att": att, "inte": inte, "wdef": wdef, "sdef": sdef, "bdef": bdef, "rdef": rdef, "speed": speed, "skill1": skill1, "skill2": skill2, "skill3": skill3 });

        return ret;
    }
}

function setWaitCursor() {
    document.getElementsByTagName("body")[0].style.cursor = "wait";
}

function setDefaultCursor() {
    document.getElementsByTagName("body")[0].style.cursor = "default";
}

function resetCursor() {
	document.getElementsByTagName("body")[0].style.cursor = "auto";
}

//CSV用文字列変換
function convCsvString(str) {
    var result;

    //「"」を「""」に変換
    result = str.replace(/\"/g, "\"\"");

    //「,」を含む場合は全体を「"」で囲む
    if (result.indexOf(",") >= 0) {
        result = "\"" + result + "\""
    }

    return result;
}

// ajaxラッパー by どらごら
function cajaxRequest(url, method, param, func_success, func_fail) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            func_success(req);
        }
        else if (req.readyState == 4 && req.status != 200) {
            func_fail(req);
        }
    }

    req.open(method, url, true);
    if (method == 'POST') {
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    req.send(param);
}

// jQuery append by どらごら
// 
function jQueryAppend() {

    j$ = unsafeWindow.jQuery;

    j$(document.body).append(
		"<div id='route_contextmenu'>" +
			"<ul id='route_command' style='text-align:left'></ul>" +
		"</div>");
    j$("#route_contextmenu")
		.hide()
		.css({
		    position: "absolute",
		    backgroundColor: "white",
		    border: "outset 2px gray",
		    color: "black",
		    padding: "3px",
		    zIndex: 999
		});


}

