// ==UserScript==
// @name           bro3_navilink
// @version        1.0_【ぱ】_20111022
// @namespace      http://puyomonolith.blog83.fc2.com/
// @description    ナビゲーション（「同盟」「デッキ」など）にマウスを置くとショートカットリンクを表示します。
// @include        http://*.3gokushi.jp/*
// ==/UserScript==

//ショートカット関数
function $(id){ return document.getElementById(id); }
function $c(className){ return document.getElementsByClassName(className); }

//Chromeでグリモンの関数を使えるように宣言
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
if( typeof(this.GM_addStyle)=='undefined' ){
	this.GM_addStyle = function (styles){	
		var S = document.createElement('style');
		S.type = 'text/css';
		var T = ''+styles+'';
		T = document.createTextNode(T)
		S.appendChild(T);
		var head = document.getElementsByTagName('head');
		head = head[0]
		head.appendChild(S);
		return;
	}
}

//サーバー区別するためにドメイン取得
var domain = document.location.hostname;

function addLink(prClass, linkArr){
	var parent = $c(prClass)[0];
	var ul = document.createElement("ul");
	ul.className = "ro";
	parent.appendChild(ul);
	var temp = ul;
	
	for(keys in linkArr){
		if(keys.indexOf("-") != 0){
			temp = ul;
		}
		
		var li = document.createElement("li");
		temp.appendChild(li);
		var a = document.createElement("a");
		
		if(keys.indexOf("+") == 0 || keys.indexOf("-") == 0){
			a.innerHTML = keys.slice(1);
		} else {
			a.innerHTML = keys;
		}
		
		a.href = linkArr[keys];
		li.appendChild(a);
		
		if(keys.indexOf("+") == 0){
			li.className = "pr";
			var roCh = document.createElement("ul");
			roCh.className = "ro_ch";
			temp = roCh;
			li.appendChild(roCh);
		}
	}
}

var al = {
	"同盟トップ": $c("gnavi03")[0].getElementsByTagName("a")[0].href,
	"同盟レベル": "http://" + domain + "/alliance/level.php#ptop",
	"同盟拠点": "http://" + domain + "/alliance/village.php#ptop",
	"同盟ログ": "http://" + domain + "/alliance/alliance_log.php#ptop",
	"同盟掲示板": "http://" + domain + "/bbs/topic_view.php#ptop",
	"ひとこと掲示板": "http://" + domain + "/alliance/chat_view.php#ptop",
	"ランキング詳細": "http://" + domain + "/alliance/ranking.php#ptop",
	"管理": "http://" + domain + "/alliance/manage.php#ptop",
	"配下同盟管理": "http://" + domain + "/alliance/manage_dep.php#ptop",
	"勢力リスト": "http://" + domain + "/alliance/dependency.php#ptop",
	"同盟情報変更": "http://" + domain + "/alliance/change.php#ptop"
};

addLink("gnavi03", al);

var deck = {
	"兵士管理": "http://" + domain + "/facility/unit_status.php#ptop",
	"領地管理": "http://" + domain + "/facility/territory_status.php#ptop",
	"出兵": "http://" + domain + "/facility/castle_send_troop.php#ptop",
	"内政設定": "http://" + domain + "/card/domestic_setting.php#ptop",
	"+デッキ": "http://" + domain + "/card/deck.php#ptop",
		"-ファイル": "http://" + domain + "/card/deck.php?p=1#file-1",
		"-最終ページ": "http://" + domain + "/card/deck.php?p=12#file-1",
	"合成": "http://" + domain + "/union/index.php#ptop",
	"+トレード": "http://" + domain + "/card/trade.php#ptop",
		"-出品中のカード": "http://" + domain + "/card/exhibit_list.php#ptop",
		"-入札中のカード": "http://" + domain + "/card/bid_list.php#ptop",
		"-出品する": "http://" + domain + "/card/trade_card.php#ptop",
	"ブショーダス履歴": "http://" + domain + "/busyodas/busyodas_history.php#ptop",
	"合成履歴": "http://" + domain + "/union/union_history.php#ptop",
	"カード一括破棄": "http://" + domain + "/card/allcard_delete.php#ptop"
};

addLink("gnavi_deck", deck);

var rank = {
	"総合": "http://" + domain + "/user/ranking.php#ptop",
	"人口": "http://" + domain + "/user/ranking.php?m=population",
	"攻撃": "http://" + domain + "/user/ranking.php?m=attack",
	"防御": "http://" + domain + "/user/ranking.php?m=defense",
	"撃破スコア": "http://" + domain + "/user/ranking.php?m=attack_score",
	"防衛スコア": "http://" + domain + "/user/ranking.php?m=defense_score",
	"同盟": "http://" + domain + "/alliance/list.php#ptop",
	"制圧": "http://" + domain + "/alliance/npc_mastery_ranking.php#ptop",
	"デュエル": "http://" + domain + "/user/ranking.php?m=duel",
	"週間ランキング": "http://" + domain + "/user/weekly_ranking.php#ptop"
};

addLink("gnavi04", rank);

var report = {
	"未読": "http://" + domain + "/report/list.php?u=new&p=0&m=",
	"全て": "http://" + domain + "/report/list.php#ptop",
	"攻撃": "http://" + domain + "/report/list.php?m=attack&u=",
	"防御": "http://" + domain + "/report/list.php?m=defence&u=",
	"偵察": "http://" + domain + "/report/list.php?m=scout&u=",
	"破壊": "http://" + domain + "/report/list.php?m=fall&u=",
	"援軍": "http://" + domain + "/report/list.php?m=reinforcement&u=",
	"同盟": "http://" + domain + "/report/list.php?m=alliance&u=",
	"デュエル": "http://" + domain + "/report/list.php?m=pvp&u="
};

addLink("gnavi05" + (!$c("gnavi05").length ? "new" : ""), report);

var quest = {
	"+名声クエスト": "",
		"-各資源lv4": "http://" + domain + "/quest/?disp_id=137",
		"-領地lv": "http://" + domain + "/quest/?disp_id=109",
		"-武将lv10": "http://" + domain + "/quest/?disp_id=128",
		"-npc攻略": "http://" + domain + "/quest/?disp_id=141",
		"-覇権": "http://" + domain + "/quest/?disp_id=111",
		"-人口2000": "http://" + domain + "/quest/?disp_id=147",
		"-矛槍": "http://" + domain + "/quest/?disp_id=181",
		"-弩": "http://" + domain + "/quest/?disp_id=182",
		"-近衛": "http://" + domain + "/quest/?disp_id=180",
		"-八卦": "http://" + domain + "/quest/?disp_id=161",
		"-一騎当千": "http://" + domain + "/quest/?disp_id=162",
		"-神速": "http://" + domain + "/quest/?disp_id=163",
		"-覇王": "http://" + domain + "/quest/?disp_id=157",
		"-投石": "http://" + domain + "/quest/?disp_id=183",
	"+研究": "",
		"-槍": "http://" + domain + "/quest/?disp_id=103",
		"-弓": "http://" + domain + "/quest/?disp_id=104",
		"-馬": "http://" + domain + "/quest/?disp_id=105",
		"-斥候": "http://" + domain + "/quest/?disp_id=108",
		"-衝車": "http://" + domain + "/quest/?disp_id=107",
		"-斥候騎兵": "http://" + domain + "/quest/?disp_id=179",
		"-矛槍 ": "http://" + domain + "/quest/?disp_id=181",
		"-弩 ": "http://" + domain + "/quest/?disp_id=182",
		"-近衛 ": "http://" + domain + "/quest/?disp_id=180",
		"-投石 ": "http://" + domain + "/quest/?disp_id=183",
	"+武将": "",
		"-lv3": "http://" + domain + "/quest/?disp_id=118",
		"-lv4*2": "http://" + domain + "/quest/?disp_id=126",
		"-デュエル": "http://" + domain + "/quest/?disp_id=196",
		"-lv5*3": "http://" + domain + "/quest/?disp_id=127",
		"-lv10": "http://" + domain + "/quest/?disp_id=128",
		"-lv20": "http://" + domain + "/quest/?disp_id=167",
		"-lv30": "http://" + domain + "/quest/?disp_id=168",
		"-lv40": "http://" + domain + "/quest/?disp_id=169",
		"-防御": "http://" + domain + "/quest/?disp_id=188",
		"-知力": "http://" + domain + "/quest/?disp_id=189",
		"-速度": "http://" + domain + "/quest/?disp_id=191",
		"-奇計": "http://" + domain + "/quest/?disp_id=160",
		"-八卦 ": "http://" + domain + "/quest/?disp_id=161",
		"-一騎当千 ": "http://" + domain + "/quest/?disp_id=162",
		"-神速 ": "http://" + domain + "/quest/?disp_id=163",
	"+同盟内p": "",
		"-1k": "http://" + domain + "/quest/?disp_id=210",
		"-3k": "http://" + domain + "/quest/?disp_id=211",
		"-6k": "http://" + domain + "/quest/?disp_id=212",
		"-10k": "http://" + domain + "/quest/?disp_id=213",
		"-30k": "http://" + domain + "/quest/?disp_id=214",
		"-60k": "http://" + domain + "/quest/?disp_id=215",
		"-100k": "http://" + domain + "/quest/?disp_id=216",
		"-300k": "http://" + domain + "/quest/?disp_id=217",
	"+同盟p": "",
		"-4万": "http://" + domain + "/quest/?disp_id=220",
		"-8万": "http://" + domain + "/quest/?disp_id=221",
		"-16万": "http://" + domain + "/quest/?disp_id=222",
		"-40万": "http://" + domain + "/quest/?disp_id=223",
		"-80万": "http://" + domain + "/quest/?disp_id=224",
		"-160万": "http://" + domain + "/quest/?disp_id=225",
		"-400万": "http://" + domain + "/quest/?disp_id=226",
		"-800万": "http://" + domain + "/quest/?disp_id=227",
	"+同盟拠点": "",
		"-鉄材": "http://" + domain + "/quest/?disp_id=232",
		"-大練兵所": "http://" + domain + "/quest/?disp_id=234",
		"-石材": "http://" + domain + "/quest/?disp_id=231",
		"-大兵舎": "http://" + domain + "/quest/?disp_id=235",
		"-木材": "http://" + domain + "/quest/?disp_id=230",
		"-大弓兵舎": "http://" + domain + "/quest/?disp_id=236",
		"-食糧": "http://" + domain + "/quest/?disp_id=233",
		"-大厩舎": "http://" + domain + "/quest/?disp_id=237",
		"-大兵器工房": "http://" + domain + "/quest/?disp_id=238",
	"+撃破スコア": "",
		"-新米(100)": "http://" + domain + "/quest/?disp_id=152",
		"-隊士(500)": "http://" + domain + "/quest/?disp_id=153",
		"-隊長(1000)": "http://" + domain + "/quest/?disp_id=154",
		"-大将(3000)": "http://" + domain + "/quest/?disp_id=155",
		"-名将(10000)": "http://" + domain + "/quest/?disp_id=156",
		"-覇王(30000)": "http://" + domain + "/quest/?disp_id=157",
	"+領地/npc": "",
		"-領地lv2": "http://" + domain + "/quest/?disp_id=109",
		"-☆2": "http://" + domain + "/quest/?disp_id=114",
		"-☆3": "http://" + domain + "/quest/?disp_id=115",
		"-☆4": "http://" + domain + "/quest/?disp_id=116",
		"-☆5": "http://" + domain + "/quest/?disp_id=117",
		"-☆6": "http://" + domain + "/quest/?disp_id=194",
		"-npc攻略": "http://" + domain + "/quest/?disp_id=141",
		"-★6+": "http://" + domain + "/quest/?disp_id=164",
		"-★8+": "http://" + domain + "/quest/?disp_id=165",
	"+人口": "",
		"-50人": "http://" + domain + "/quest/?disp_id=142",
		"-100人": "http://" + domain + "/quest/?disp_id=143",
		"-250人": "http://" + domain + "/quest/?disp_id=144",
		"-600人": "http://" + domain + "/quest/?disp_id=145",
		"-1000人": "http://" + domain + "/quest/?disp_id=146",
		"-2000人": "http://" + domain + "/quest/?disp_id=147",
		"-3000人": "http://" + domain + "/quest/?disp_id=172",
		"-5000人": "http://" + domain + "/quest/?disp_id=173",
		"-8000人": "http://" + domain + "/quest/?disp_id=174",
	"+簡単なもの": "",
		"-同盟所属": "http://" + domain + "/quest/?disp_id=113",
		"-書簡": "http://" + domain + "/quest/?disp_id=134",
		"-各資源lv3*3": "http://" + domain + "/quest/?disp_id=136",
		"-各資源*3": "http://" + domain + "/quest/?disp_id=135",
		"-武器強化": "http://" + domain + "/quest/?disp_id=138",
		"-防具強化": "http://" + domain + "/quest/?disp_id=139",
		"-同盟lv2": "http://" + domain + "/quest/?disp_id=133",
		"-同盟掲示板": "http://" + domain + "/quest/?disp_id=125",
		"-週間ランク": "http://" + domain + "/quest/?disp_id=166",
		"-個人ランク": "http://" + domain + "/quest/?disp_id=123",
		"-同盟ランク": "http://" + domain + "/quest/?disp_id=106",
		"-CP使用": "http://" + domain + "/quest/?disp_id=112",
		"-覇権": "http://" + domain + "/quest/?disp_id=111",
		"-合成": "http://" + domain + "/quest/?disp_id=102",
		"-修行合成": "http://" + domain + "/quest/?disp_id=203",
		"-トレード": "http://" + domain + "/quest/?disp_id=192",
		"-賊討伐": "http://" + domain + "/quest/?disp_id=170",
	"+簡単なもの2": "",
		"-役職": "http://" + domain + "/quest/?disp_id=206",
		"-寄付3000": "http://" + domain + "/quest/?disp_id=185",
		"-寄付10000": "http://" + domain + "/quest/?disp_id=186",
		"-寄付50000": "http://" + domain + "/quest/?disp_id=187",
		"-同盟lv5": "http://" + domain + "/quest/?disp_id=207",
		"-不可侵": "http://" + domain + "/quest/?disp_id=175",
		"-木生産500": "http://" + domain + "/quest/?disp_id=119",
		"-石生産500": "http://" + domain + "/quest/?disp_id=120",
		"-鉄生産500": "http://" + domain + "/quest/?disp_id=121",
		"-木生産1000": "http://" + domain + "/quest/?disp_id=129",
		"-石生産1000": "http://" + domain + "/quest/?disp_id=130",
		"-鉄生産1000": "http://" + domain + "/quest/?disp_id=131",
		"-拠点": "http://" + domain + "/quest/?disp_id=101",
		"-拠点に名前": "http://" + domain + "/quest/?disp_id=124",
		"-拠点に武将": "http://" + domain + "/quest/?disp_id=176",
		"-拠点に施設": "http://" + domain + "/quest/?disp_id=110",
	"+未クリア": "http://" + domain + "/quest/#ptop",
		"-先頭ページ": "http://" + domain + "/quest/",
		"-最終ページ": "http://" + domain + "/quest/?p=12",
	"+クリア済": "http://" + domain + "/quest/?mode=1#ptop",
		"-先頭ページ ": "http://" + domain + "/quest/?mode=1",
		"-最終ページ ": "http://" + domain + "/quest/?mode=1&p=12",
	"+全部": "http://" + domain + "/quest/?mode=2#ptop",
		"-先頭ページ  ": "http://" + domain + "/quest/mode=2",
		"-最終ページ  ": "http://" + domain + "/quest/?mode=2&p=12",
	"受理中": "http://" + domain + "/quest/?mode=3"
};
//var _ts="gnavi_quest";for(var _t in [_ts,_ts+'new']){if($c(_t).length){addLink(_t, quest);}}
var _t="gnavi_quest";if($c(_t).length){addLink(_t, quest);}else{_t+="new"; if($c(_t).length){addLink(_t, quest);}}
//if($c("gnavi_quest").length){addLink("gnavi_quest", quest);}else if($c("gnavi_questnew").length){addLink("gnavi_questnew", quest);}

var personal = {
	"城トップ": "http://" + domain + "/facility/castle.php#ptop",
	"+プロフィール": "http://" + domain + "/user/",
	"-編集": "http://" + domain + "/user/change/change.php",
	"個人掲示板": "http://" + domain + "/bbs/personal_topic_view.php",
	"フレンド管理": "http://" + domain + "/user/friend/friend_list.php",
	"獲得武勲": "http://" + domain + "/user/decoration.php",
	"歴史書": "http://" + domain + "/historybook/game_result.php",
};
addLink("gnavi01", personal);

function cpd(mode,year,month,day){
var today = new Date();
var ty = today.getYear; var tm = today.getMonth; var td = today.getDate;
var today = new Date(ty,tm-1,td);
var targetdate = new Date(year,month-1,day);
var diff = targetdate - today;
if(mode == "till"){return diff;}else{return (0 - diff);}
}

var sv_ = 1;
var sv = domain.split(".")[0];
npcs = [];
//7 s1(-11/15)
//6 m1(-12/7),m5(-12/7),m9,s5
//5 m13(-11/1),m17,h1,p1
//4 m21,m25
//3 h5,s9(-11/9)
//2 m29,m31,m33(12/21-),s10(-11/9),s11,h7
if((sv == "s1")&&(cpd("since",2011,11,16))){npclist(8);}
else if(((sv == "s1")&&(cpd("till",2011,11,15)))
	||((sv == "m1")&&(cpd("since",2011,12,8)))){npclist(7);}
else if((sv == "s5")||((sv == "m1")&&(cpd("till",2011,12,7)))
	||(sv == "m5")||(sv == "m9")
	||((sv == "m13")&&(cpd("since",2011,11,2)))){npclist(6);}
else if((sv == "p1")||(sv == "h1")
	||((sv == "m13")&&(cpd("till",2011,11,1)))||(sv == "m17")){npclist(5);}
else if(((sv == "s9")&&(cpd("since",2011,11,10)))||(sv == "m21")||(sv == "m25")){npclist(4);}
else if((sv == "h5")||((sv == "s9")&&(cpd("till",2011,11,9)))){npclist(3);}
else if((sv == "s10")||(sv == "s11")||(sv == "h7")||(sv == "m29")||(sv == "m31")
	||((sv == "m23")&&(cpd("since",2011,12,21)))){npclist(2);}
else{npclist(1);}

nadd("gnavi02", npcs);


var report_ro = $c("gnavi05" + (!$c("gnavi05").length ? "new" : ""))[0].getElementsByClassName("ro")[0];
var li = document.createElement("li");
report_ro.appendChild(li);
var input = document.createElement("input");
input.type = "button";
input.value = "全てを既読に";
li.appendChild(input);
input.addEventListener("click", allOpenRepo, false);

//報告書全てを既読にする関数
function allOpenRepo(){
	if(confirm("全ての報告書を既読にしますか？")) {
		httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", "http://" + domain + "/report/list.php", true);
		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		httpRequest.onreadystatechange = function() {
			if(httpRequest.readyState == 4 && httpRequest.status == 200) {
				alert("完了しました");
				if($c("gnavi05new").length){
					//var back_y = parseInt(String(getComputedStyle($c("gnavi05new")[0], '').backgroundPosition).split(" ")[1].split("px")[0]) + 30;
					//$c("gnavi05new")[0].style.backgroundPosition = "0% " + back_y + "px";
					$c("gnavi05new")[0].className = "gnavi05";
				}
				if(String(document.location).indexOf("/report/list.php") != -1){
					document.location.reload();
				}
			}
		}
		//リクエスト送信
		httpRequest.send("all_open=" + escape("全てを既読にする"));
	}
}

var mes = {
	"未読": "http://" + domain + "/message/inbox.php?u=new&p=0",
	"受信箱": "http://" + domain + "/message/inbox.php",
	"送信履歴": "http://" + domain + "/message/outbox.php#ptop",
	"新規作成": "http://" + domain + "/message/new.php#ptop",
	"ブラックリスト": "http://" + domain + "/message/black_list/black_list.php#ptop"
}

addLink("gnavi06" + (!$c("gnavi06").length ? "new" : ""), mes);

var mes_ro = $c("gnavi06" + (!$c("gnavi06").length ? "new" : ""))[0].getElementsByClassName("ro")[0];
var li = document.createElement("li");
mes_ro.appendChild(li);
var input = document.createElement("input");
input.type = "button";
input.value = "全てを既読に";
li.appendChild(input);
input.addEventListener("click", allOpenMes, false);

//書簡全てを既読にする関数
function allOpenMes(){
	if(confirm("全ての書簡を既読にしますか？\n(運営チームからの書簡は既読にできません)")) {
		httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", "http://" + domain + "/message/inbox.php", true);
		httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		httpRequest.onreadystatechange = function() {
			if(httpRequest.readyState == 4 && httpRequest.status == 200) {
				alert("完了しました");
				if($c("gnavi06new").length){
					$c("gnavi06new")[0].className = "gnavi06";
				}
				if(String(document.location).indexOf("/message/inbox.php") != -1){
					document.location.reload();
				}
			}
		}
		//リクエスト送信
		httpRequest.send("all_open=" + escape("全てを既読にする"));
	}
}

//スタイル追加
GM_addStyle(String(<><![CDATA[
	#gnavi > ul > li:hover > ul, #gnavi ul.ro > li:hover > ul.ro_ch,
	#gnavi ul.ro li:hover > ul.ro_ch1, #gnavi ul.ro li:hover > ul.ro_ch2 {
		display: block !important;
	}
	div#gnavi ul.ro, div#gnavi ul.ro_ch,
	div#gnavi ul.ro_ch1, div#gnavi ul.ro_ch2 {
		background: none white !important;
		border: 2px solid #3f3f3f;
		padding: 3px;
		width: auto;
		min-width: 80px;
		height: auto;
		position: absolute;
		z-index: 9999;
		display: none;
	}
	ul.ro li {
		margin-right: 0 !important;
		float: none !important;
	}
	ul.ro > li, ul.ro > li li{
		position: relative;
	}
	li.pr > a {
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAIAAADwlwNsAAAABGdBTUEAALGPC/xhBQAAAEBJREFUKFNj/P//PwN+AFTR0NAAJHEBBogKCMCqCEUFVkXoKjANw64CWR0+FRBLyTUD2VMk+gVfeBAIUzzSQCkAL60+obPpW1IAAAAASUVORK5CYII=") right no-repeat;
	}
	li.pr > a:after {
		content: ">";
		display: block;
		position: absolute;
		top: 3px;
		right: 5px;
	}
	#gnavi ul.ro_ch, #gnavi ul.ro_ch1, #gnavi ul.ro_ch2{
		border-left: 1px solid #3f3f3f !important;
		min-width: 90px !important;
		top: -5px;
		left: 80px;
	}
	#gnavi ul ul a, #gnavi ul ul input[type="button"] {
		font-size: smaller;
	}
	#gnavi ul ul a {
		text-indent: 0 !important;
		text-decoration: none;
		color: #0099cc;
		background: none !important;
		border-bottom: 1px solid silver;
		margin-bottom: 2px;
		padding: 2px 2px 0 !important;
		width: auto !important;
		height: 1.6em !important;
	}
	#gnavi ul ul a:hover {
		text-decoration: underline;
		background-color: #dfdfdf !important;
	}
	
]]></>));


function nadd(prClass, n){
	var parent = $c(prClass)[0];
	var ul = document.createElement("ul");
	ul.className = "ro";
	parent.appendChild(ul);
	var temp = ul;
	temp.innerHTML = n;
}

function rl(name,x,y){
	if(x || y){return '<a href="http://' + domain + '/map.php?x=' + x + '&y=' + y + '">' + name + '</a>';}else{return '<a href="">' + name + '</a>';}
}


function mnl(mode,level,name,x,y){
// - <li>***</li> means each item, no child
// + <li>***<ul>  means title, child starts
// -- </ul></li>  means return to the upper
	if (mode == "--"){return indent(level) + "</ul></li>\n";}
	if (mode == "-"){var link = rl(name,x,y); return indent(level) + '<li>' + link + "</li>\n";}
	if (mode == "+"){var link = rl(name,x,y); return indent(level) + '<li class="pr">' + link + "\n" + indent(level) + '<ul class="ro_ch' + level + '">' + "\n";}
}

function indent(n) {
    var ret = "";
    for (var i = 0; i < n; i++){ret += " ";}
    return ret;
}

function npclist(sv_){
	npcs = mnl("+",  1, "城");
if(sv_==1){npcs +=
	mnl("-",  2, "許昌(曹操)",   "0","0") +
	mnl("-",  2, "鄴　 (袁紹)",  66, 66) +
	mnl("-",  2, "長安(董卓)",  -66, 66) +
	mnl("-",  2, "成都(劉備)",  -66,-66) +
	mnl("-",  2, "建業(孫権)",   66,-66) +
	mnl("-",  2, "北平(公孫瓚)",132, "0") +
	mnl("-",  2, "雲南(孟獲)", -132, "0") +
	mnl("--", 1) +
	mnl("+",  1, "武将") +
	mnl("-",  2, "襄陽　 (劉表)", "0", 176) +
	mnl("-",  2, "永安　 (劉焉)", "0",-176) +
	mnl("-",  2, "北東砦(牛輔)", 176,  176) +
	mnl("-",  2, "北西砦(郭汜)",-176,  176) +
	mnl("-",  2, "南西砦(祝融)",-176, -176) +
	mnl("-",  2, "南東砦(黄祖)", 176, -176);}

if(sv_>1){npcs +=
	mnl("-",  2, "洛陽(献帝)",  "0","0") +
	mnl("-",  2, "許昌(曹操)",  88, 88) +
	mnl("-",  2, "鄴　 (袁紹)",-88, 88) +
	mnl("-",  2, "成都(劉備)", -88,-88) +
	mnl("-",  2, "襄陽(関羽)",  88,-88) +
	mnl("-",  2, "建業(孫権)", 220, "0") +
	mnl("-",  2, "長安(董卓)",-220, "0") +
	mnl("--", 1) +
	mnl("+",  1, "武将(★7)") +
	mnl("-",  2, "下邳(呂布)",    "0", 220) +
	mnl("-",  2, "雲南(孟獲)",    "0",-220) +
	mnl("-",  2, "寿春(袁術)",   220,  220) +
	mnl("-",  2, "北平(公孫瓚)",-220,  220) +
	mnl("-",  2, "天水(馬超)",  -220, -220) +
	mnl("-",  2, "長沙(孫策)",   220, -220) +
	mnl("--", 1) +
	mnl("+",  1, "武将(★6)") +
	mnl("-",  2, "水龍砦(馬謖)",   154, 418) +
	mnl("-",  2, "木亀砦(于禁)",  -154, 418) +
	mnl("-",  2, "紅虎砦(蔡瑁)",  -154,-418) +
	mnl("-",  2, "白鳥砦(甘寧)",   154,-418) +
	mnl("-",  2, "火龍砦(沙摩柯)", 418, 154) +
	mnl("-",  2, "金亀砦(張魯)",  -418, 154) +
	mnl("-",  2, "黒虎砦(朱霊)",  -418,-154) +
	mnl("-",  2, "青鳥砦(程普)",   418,-154) +
	mnl("-",  2, "青龍砦(張飛)",   418, 418) +
	mnl("-",  2, "玄武砦(荀彧)",  -418, 418) +
	mnl("-",  2, "白虎砦(夏候惇)",-418,-418) +
	mnl("-",  2, "朱雀砦(周瑜)",   418,-418);}

if(sv_>2){npcs +=
	mnl("-",  2, "緑天大砦(張遼)", 308, 308) +
	mnl("-",  2, "玄天大砦(張郃)",-308, 308) +
	mnl("-",  2, "白天大砦(龐統)",-308,-308) +
	mnl("-",  2, "紅天大砦(呂蒙)", 308,-308);}

	npcs += mnl("--", 1);
	npcs += mnl("--", 1);


if(sv_==2){npcs += news_(sv_,"北東") + news_(sv_,"北西") + news_(sv_,"南西") + news_(sv_,"南東");}

}

function news_(stage,vect){
	nlist = dv_(stage,vect);
	var prex=""; var prey="";
	if(vect == "北西"){prex="-";} if(vect == "南西"){prex="-"; prey="-";} if(vect == "南東"){prey="-";}
	vect = vect + "砦";
	var n = mnl("+", 1, vect+"xx") + mnl("+", 2, vect+"x");
	for (var i = 0; i < nlist.length; i=i+2){
	  if(i%200==198){n += mnl("+", 1, vect+(i/2+1)/100+"xx");}
	  if(i%20==18){n += mnl("+", 2, vect+(i/2+1)/10+"x");}
	  n += mnl("-", 3, vect + (i/2+1), prex + nlist[(i)], prey + nlist[(i+1)]);
	  if(i%20==16){n += mnl("--", 2);}
	  if(i%200==196){n += mnl("--", 1);}
	}
	n += mnl("--", 2);
	n += mnl("--", 1);
	return n;
}

function dv_(stage,vect){
	if(vect + stage == "北東2"){return 北東2();}
	if(vect + stage == "北西2"){return 北西2();}
	return [];
}

//方角に依らず"-"は省略
//北東(2期)
function 北東2(){
	return	[22,24,  26,42,   21,71,   17,87,   23,110,	25,133,  26,154,  18,171,  46,21,   39,47,
		46,70,   39,91,   49,105,  48,136,  40,155,	44,171,  71,20,   66,41,   66,70,   63,87,
		68,108,  70,136,  65,158,  68,173,  85,21,	93,45,   90,68,   85,110,  85,136,  85,149,
		88,180,  113,21,  113,44,  113,66,  105,88,	108,115, 106,135, 108,158, 105,171, 137,24,
		128,48,  136,67,  133,91,  135,110, 135,130,	128,149, 132,176, 149,19,  149,39,  150,69,//50
		153,86,  159,109, 156,129, 151,154, 154,180,	181,23,  171,45,  177,71,  181,90,  174,112,
		181,132, 176,150, 172,180, 201,24,  198,64,	203,110, 200,159, 197,201, 198,245, 202,286,
		203,325, 203,376, 198,415, 194,460, 198,510,	201,546, 225,39,  217,93,  220,132, 222,174,
		220,259, 219,310, 216,354, 219,399, 219,441,	224,484, 217,528, 219,572, 245,26,  238,62,
		246,109, 246,151, 238,193, 238,241, 245,287,	238,334, 239,371, 237,418, 244,458, 245,506,//100

		244,552, 261,41,  261,88,  261,132, 264,174,	264,223, 261,260, 265,309, 264,356, 264,395,
		266,445, 261,487, 264,532, 264,574, 288,22,	290,66,  288,109, 286,156, 288,199, 285,241,
		288,291, 289,330, 291,378, 285,421, 286,457,	288,504, 290,555, 303,42,  312,90,  311,133,
		307,180, 313,220, 309,260, 308,303, 307,352,	309,399, 311,438, 312,488, 307,532, 309,571,
		334,25,  334,65,  333,113, 328,154, 327,200,	329,246, 332,289, 330,328, 330,378, 329,419,//150
		330,461, 325,503, 330,545, 347,42,  354,90,	351,129, 350,173, 350,215, 352,260, 352,305,
		354,352, 352,395, 347,438, 355,479, 354,528,	354,567, 377,18,  373,61,  376,113, 379,150,
		376,193, 379,241, 378,281, 375,327, 379,371,	371,419, 371,467, 378,506, 378,548, 394,39,
		395,91,  400,132, 396,172, 397,218, 393,262,	391,308, 394,350, 391,400, 391,443, 391,480,
		396,526, 395,569, 417,25,  422,65,  417,115,	417,194, 421,238, 422,282, 413,326, 413,372,//200

		420,462, 413,511, 418,553, 443,44,  436,87,	438,132, 439,180, 440,211, 443,263, 440,304,
		439,348, 441,400, 444,441, 441,485, 435,525,	435,572, 464,26,  465,70,  457,111, 457,152,
		466,196, 462,238, 462,289, 463,329, 461,374,	458,413, 465,459, 467,502, 457,553, 483,44,
		480,88,  479,132, 485,172, 480,222, 484,265,	488,310, 488,352, 481,401, 489,440, 479,484,
		480,525, 484,572, 505,18,  506,66,  504,110,	503,156, 507,200, 506,245, 503,282, 508,328,//250
		511,369, 508,420, 509,460, 502,506, 502,552,	533,44,  523,86,  533,130, 524,172, 527,225,
		532,264, 528,308, 533,353, 530,397, 531,444,	524,489, 524,533, 531,576, 551,27,  546,70,
		547,110, 555,154, 551,201, 550,239, 553,291,	550,335, 547,369, 551,420, 548,461, 548,501,
		546,554, 571,40,  570,93,  572,133, 573,174,	568,221, 575,265, 573,308, 570,355, 568,396,
		576,442, 568,479, 571,530, 571,571, 26,197,	27,242,  25,286,  26,334,  27,379,  18,422,//300

		20,464,  24,502,  19,554,  44,221,  41,268,	43,311,  46,350,  39,400,  40,445,  44,486,
		49,531,  49,575,  62,200,  68,242,  64,288,	66,334,  64,377,  64,421,  65,462,  66,505,
		66,546,  89,224,  84,265,  85,308,  93,349,	89,391,  93,436,  92,482,  85,525,  89,573,
		107,194, 113,241, 112,286, 110,333, 113,378,	110,422, 110,458, 113,503, 107,548, 127,219,
		137,259, 134,309, 135,354, 135,394, 130,445,	137,480, 132,524, 132,574, 154,194, 158,238,//350

		154,290, 155,335, 154,374, 157,464, 158,507,	155,551, 180,215, 180,260, 172,305, 178,356,
		173,392, 175,444, 181,486, 179,524, 180,574,	24,2,    44,4,    84,0,    131,3,   312,0,
		348,5,   396,3,   482,0,   532,2,   3,21,	3,71,    1,93,    0,112,   0,180,   3,259,
		2,308,   2,357,   4,395,   3,438,   3,528];//-385
}

//方角に依らず"-"は省略
//北西(2期)
function 北西2(){
	return	[22,24,  26,42,   21,71,   17,87,   23,110,	25,133,  26,154,  18,171,  46,21,   39,47,
		46,70,   39,91,   49,105,  48,136,  40,155,	44,171,  71,20,   66,41,   66,70,   63,87,
		68,108,  70,136,  65,158,  68,173,  85,21,	93,45,   90,68,   85,110,  85,136,  85,149,
		88,180,  113,21,  113,44,  113,66,  105,88,	108,115, 106,135, 108,158, 105,171, 137,24,
		128,48,  136,67,  133,91,  135,110, 135,130,	128,149, 132,176, 149,19,  149,39,  150,69,//50
		153,86,  159,109, 156,129, 151,154, 154,180,	181,23,  171,45,  177,71,  181,90,  174,112,
		181,132, 176,150, 172,180, 201,24,  198,64,	203,110, 200,159, 197,201, 198,245, 202,286,
		203,325, 203,376, 198,415, 194,460, 198,510,	201,546, 225,39,  217,93,  220,132, 222,174,
		220,259, 219,310, 216,354, 219,399, 219,441,	224,484, 217,528, 219,572, 245,26,  238,62,
		246,109, 246,151, 238,193, 238,241, 245,287,	238,334, 239,371, 237,418, 244,458, 245,506,//100

		244,552, 261,41,  261,88,  261,132, 264,174,	264,223, 261,260, 265,309, 264,356, 264,395,
		266,445, 261,487, 264,532, 264,574, 288,22,	290,66,  288,109, 286,156, 288,199, 285,241,
		288,291, 289,330, 291,378, 285,421, 286,457,	288,504, 290,555, 303,42,  312,90,  311,133,
		307,180, 313,220, 309,260, 308,303, 307,352,	309,399, 311,438, 312,488, 307,532, 309,571,
		334,25,  334,65,  333,113, 328,154, 327,200,	329,246, 332,289, 330,328, 330,378, 329,419,//150
		330,461, 325,503, 330,545, 347,42,  354,90,	351,129, 350,173, 350,215, 352,260, 352,305,
		354,352, 352,395, 347,438, 355,479, 354,528,	354,567, 377,18,  373,61,  376,113, 379,150,
		376,193, 379,241, 378,281, 375,327, 379,371,	371,419, 371,467, 378,506, 378,548, 394,39,
		395,91,  400,132, 396,172, 397,218, 393,262,	391,308, 394,350, 391,400, 391,443, 391,480,
		396,526, 395,569, 417,25,  422,65,  417,115,	417,194, 421,238, 422,282, 413,326, 413,372,//200

		420,462, 413,511, 418,553, 443,44,  436,87,	438,132, 439,180, 440,211, 443,263, 440,304,
		439,348, 441,400, 444,441, 441,485, 435,525,	435,572, 464,26,  465,70,  457,111, 457,152,
		466,196, 462,238, 462,289, 463,329, 461,374,	458,413, 465,459, 467,502, 457,553, 483,44,
		480,88,  479,132, 485,172, 480,222, 484,265,	488,310, 488,352, 481,401, 489,440, 479,484,
		480,525, 484,572, 505,18,  506,66,  504,110,	503,156, 507,200, 506,245, 503,282, 508,328,//250
		511,369, 508,420, 509,460, 502,506, 502,552,	533,44,  523,86,  533,130, 524,172, 527,225,
		532,264, 528,308, 533,353, 530,397, 531,444,	524,489, 524,533, 531,576, 551,27,  546,70,
		547,110, 555,154, 551,201, 550,239, 553,291,	550,335, 547,369, 551,420, 548,461, 548,501,
		546,554, 571,40,  570,93,  572,133, 573,174,	568,221, 575,265, 573,308, 570,355, 568,396,
		576,442, 568,479, 571,530, 571,571, 26,197,	27,242,  25,286,  26,334,  27,379,  18,422,//300

		20,464,  24,502,  19,554,  44,221,  41,268,	43,311,  46,350,  39,400,  40,445,  44,486,
		49,531,  49,575,  62,200,  68,242,  64,288,	66,334,  64,377,  64,421,  65,462,  66,505,
		66,546,  89,224,  84,265,  85,308,  93,349,	89,391,  93,436,  92,482,  85,525,  89,573,
		107,194, 113,241, 112,286, 110,333, 113,378,	110,422, 110,458, 113,503, 107,548, 127,219,
		137,259, 134,309, 135,354, 135,394, 130,445,	137,480, 132,524, 132,574, 154,194, 158,238,//350

		154,290, 155,335, 154,374, 157,464, 158,507,	155,551, 180,215, 180,260, 172,305, 178,356,
		173,392, 175,444, 181,486, 179,524, 180,574,	24,2,    44,4,    84,0,    131,3,   312,0,
		348,5,   396,3,   482,0,   532,2,   3,21,	3,71,    1,93,    0,112,   0,180,   3,259,
		2,308,   2,357,   4,395,   3,438,   3,528];//-385
}

