// ==UserScript==
// @name           StarHack
// @namespace      http://areverie.org/
// @include        http://bbs.2dgal.com/kf_star_1.php
// ==/UserScript==
//var Kana1 = document.getElementByName('s1_0');

// call hacker
var chromeHack = false;
prepare();

/* structure define */
function StarHacker() {
	var kana1, kana2, kana3, kana4, kana5;
	var roma1, roma2, roma3, roma4, roma5;
}

function kanaMap() {
	this.kanas = Array();
	this.romas = Array();

	// add kanaMap pair
	this.add = function(kana, roma) {
		this.kanas[this.kanas.length] = kana;
		this.romas[this.romas.length] = roma;
	};
}

/* prepare the convertion */
function prepare() {

	// varify the internal
	var tables = document.getElementsByClassName('kf_fw_ig1');
	var strInternal = tables[0].children[0].children[1].children[2].innerHTML;

	var regex = new RegExp(/\d{1,2}/);
	var remains = regex.exec(strInternal);
	if (parseInt(remains) > 0) {
		showMsg('取得经验时间间隔不为0，不予提交', 5000);
		embeded();
		return true;
	}

	try {
		// initialize the hacker
		var sh = new StarHacker();

		// obtain target
		var kana1 = document.getElementsByName('s1_0');
		var kana2 = document.getElementsByName('s1_1');
		var kana3 = document.getElementsByName('s1_2');
		var kana4 = document.getElementsByName('s1_3');
		var kana5 = document.getElementsByName('s1_4');
		sh.kana1 = kana1[0].value;
		sh.kana2 = kana2[0].value;
		sh.kana3 = kana3[0].value;
		sh.kana4 = kana4[0].value;
		sh.kana5 = kana5[0].value;

		// convertion
		convert(sh);

		// set result
		setResult(sh);

		// submit the form
		
		/* deleted 2010/10/19 -> */
		// var form = document.getElementsByName('rvrc1');
		// form[0].submit();
		/* <- deleted 2010/10/19 */
		
		/* added 2010/10/19 -> */
		// 'cuz a named 'submit' button in form, chrome will take 'submit' a property instead of a function
		// using btnSubmit.onclick() instead
		var btnSubmits = document.getElementsByName('submit');
		btnSubmits[0].click();
		/* <- added 2010/10/19 */

	} catch (e) {
		var errMsg = 'Something wrong with the script! Plase contact author.\n\n\n';
		errMsg += 'Erro Info:\n';
		errMsg += e.message;
		showMsg(errMsg, 30000);
		embeded();
	}
}

function showMsg(msg, interval) {

	var seconds = interval / 1000 + 1;

	var html = '';
	html += ' <div id="sh_msg_outter" onclick="closeMsg()" style="margin-top:-150px;margin-left:-300px;position: absolute;top:50%;left:50%;:middle;height:300px;width:600px;border:1px solid;-moz-border-radius:20px;-webkit-border-radius:20px;-moz-box-shadow:1px 1px 10px rgba(0, 0, 0, 0.7); ';
	html += ' 	-webkit-box-shadow:1px 1px 10px rgba(0, 0, 0, 0.7);z-index:1;background-color:#4189dd;opacity:0.8"> ';
	html += ' <\/div> ';
	html += ' <div id="sh_msg_inner" onclick="closeMsg()" style="height:270px;width:570px;position:absolute;top:50%;left:50%;margin-top:-135px;margin-left:-285px;border:1px solid;-moz-border-radius:10px;-webkit-border-radius:10px;z-index:2;background-color:#bed9ed;opacity:0.8"> ';
	html += ' <div style="width:350px;margin:auto;top:30%;position:relative;font-size:14px;text-align:center;font-family=Verdana, Tahoma, Microsoft Yahei, Simsun"> ';
	html += ' <span > ';
	html += msg;
	html += '<\/span><br \/><br \/> ';
	html += ' <a href="#" style="text-decoration:none;color:#000" onclick="closeMsg();return false"><span id="timer" style="font-weight:bold;color:red">'
			+ seconds + ' <\/span>秒后关闭本消息<\/a> ';
	html += ' <\/div> ';
	html += ' <\/div> ';
	html += ' <script language="javascript" type="text/javascript"> ';
	html += ' embeded(); ';
	html += ' function embeded(){ ';
	html += ' countDown(); ';
	html += ' setTimeout("closeMsg()", ' + interval + '); }';
	html += ' function closeMsg(){ ';
	html += ' var div_out = document.getElementById("sh_msg_outter"); ';
	html += ' var div_in = document.getElementById("sh_msg_inner"); ';
	html += ' div_out.style.cssText+="visibility:hidden"; ';
	html += ' div_in.style.cssText+="visibility:hidden"; ';
	html += ' } ';
	html += ' function countDown(){ ';
	html += ' 	var timer = document.getElementById("timer"); ';
	html += ' 	var time = parseInt(timer.innerHTML); ';
	html += ' 	if( time > 0){ ';
	html += ' 		timer.innerHTML = --time; ';
	html += ' 		timer.innerHTML += " "; ';
	html += ' 		setTimeout("countDown()",1000); ';
	html += ' 	} ';
	html += ' } ';
	html += ' <\/script> ';
	
	var div = document.createElement('div');
	div.innerHTML = html;
	var body = document.getElementsByTagName('body');
	body[0].appendChild(div);
	
	showMsgChrome(interval);
}

function convert(sh) {
	sh.roma1 = kana2roma(sh.kana1);
	sh.roma2 = kana2roma(sh.kana2);
	sh.roma3 = kana2roma(sh.kana3);
	sh.roma4 = kana2roma(sh.kana4);
	sh.roma5 = kana2roma(sh.kana5);
}

function setResult(sh) {
	var roma1 = document.getElementsByName('s1_0_ans');
	var roma2 = document.getElementsByName('s1_1_ans');
	var roma3 = document.getElementsByName('s1_2_ans');
	var roma4 = document.getElementsByName('s1_3_ans');
	var roma5 = document.getElementsByName('s1_4_ans');
	roma1[0].value = sh.roma1;
	roma2[0].value = sh.roma2;
	roma3[0].value = sh.roma3;
	roma4[0].value = sh.roma4;
	roma5[0].value = sh.roma5;
}

function kana2roma(kana) {

	// initialize the kanaMap
	km = initkanaMap();

	for ( var i in km.kanas) {
		if (km.kanas[i] == kana) {
			break;
		}
	}
	return km.romas[i];
}

function initkanaMap() {

	var km = new kanaMap();

	km.add("あ", "a");
	km.add("い", "i");
	km.add("う", "u");
	km.add("え", "e");
	km.add("お", "o");
	km.add("ア", "a");
	km.add("イ", "i");
	km.add("ウ", "u");
	km.add("エ", "e");
	km.add("オ", "o");

	km.add("か", "ka");
	km.add("き", "ki");
	km.add("く", "ku");
	km.add("け", "ke");
	km.add("こ", "ko");
	km.add("カ", "ka");
	km.add("キ", "ki");
	km.add("ク", "ku");
	km.add("ケ", "ke");
	km.add("コ", "ko");

	km.add("さ", "sa");
	km.add("し", "shi");
	km.add("す", "su");
	km.add("せ", "se");
	km.add("そ", "so");
	km.add("サ", "sa");
	km.add("シ", "shi");
	km.add("ス", "su");
	km.add("セ", "se");
	km.add("ソ", "so");

	km.add("た", "ta");
	km.add("ち", "chi");
	km.add("つ", "tsu");
	km.add("て", "te");
	km.add("と", "to");
	km.add("タ", "ta");
	km.add("チ", "chi");
	km.add("ツ", "tsu");
	km.add("テ", "te");
	km.add("ト", "to");

	km.add("な", "na");
	km.add("に", "ni");
	km.add("ぬ", "nu");
	km.add("ね", "ne");
	km.add("の", "no");
	km.add("ナ", "na");
	km.add("ニ", "ni");
	km.add("ヌ", "nu");
	km.add("ネ", "ne");
	km.add("ノ", "no");

	km.add("は", "ha");
	km.add("ひ", "hi");
	km.add("ふ", "fu");
	km.add("へ", "he");
	km.add("ほ", "ho");
	km.add("ハ", "ha");
	km.add("ヒ", "hi");
	km.add("フ", "fu");
	km.add("ヘ", "he");
	km.add("ホ", "ho");

	km.add("ま", "ma");
	km.add("み", "mi");
	km.add("む", "mu");
	km.add("め", "me");
	km.add("も", "mo");
	km.add("マ", "ma");
	km.add("ミ", "mi");
	km.add("ム", "mu");
	km.add("メ", "me");
	km.add("モ", "mo");

	km.add("や", "ya");
	km.add("ゆ", "yu");
	km.add("よ", "yo");
	km.add("ヤ", "ya");
	km.add("ユ", "yu");
	km.add("ヨ", "yo");

	km.add("ら", "ra");
	km.add("り", "ri");
	km.add("る", "ru");
	km.add("れ", "re");
	km.add("ろ", "ro");
	km.add("ラ", "ra");
	km.add("リ", "ri");
	km.add("ル", "ru");
	km.add("レ", "re");
	km.add("ロ", "ro");

	km.add("わ", "wa");
	km.add("を", "o");
	km.add("ん", "n");
	km.add("ワ", "wa");
	km.add("ヲ", "o");
	km.add("ン", "n");

	km.add("が", "ga");
	km.add("ぎ", "gi");
	km.add("ぐ", "gu");
	km.add("げ", "ge");
	km.add("ご", "go");
	km.add("ガ", "ga");
	km.add("ギ", "gi");
	km.add("グ", "gu");
	km.add("ゲ", "ge");
	km.add("ゴ", "go");

	km.add("ざ", "za");
	km.add("じ", "ji");
	km.add("ず", "zu");
	km.add("ぜ", "ze");
	km.add("ぞ", "zo");
	km.add("ザ", "za");
	km.add("ジ", "ji");
	km.add("ズ", "zu");
	km.add("ゼ", "ze");
	km.add("ゾ", "zo");

	km.add("だ", "da");
	km.add("ぢ", "ji");
	km.add("づ", "zu");
	km.add("で", "de");
	km.add("ど", "do");
	km.add("ダ", "da");
	km.add("ヂ", "ji");
	km.add("ヅ", "zu");
	km.add("デ", "de");
	km.add("ド", "do");

	km.add("ば", "ba");
	km.add("び", "bi");
	km.add("ぶ", "bu");
	km.add("べ", "be");
	km.add("ぼ", "bo");
	km.add("バ", "ba");
	km.add("ビ", "bi");
	km.add("ブ", "bu");
	km.add("ベ", "be");
	km.add("ボ", "bo");

	km.add("ぱ", "pa");
	km.add("ぴ", "pi");
	km.add("ぷ", "pu");
	km.add("ぺ", "pe");
	km.add("ぽ", "po");
	km.add("パ", "pa");
	km.add("ピ", "pi");
	km.add("プ", "pu");
	km.add("ペ", "pe");
	km.add("ポ", "po");

	km.add("きゃ", "kya");
	km.add("きゅ", "kyu");
	km.add("きょ", "kyo");
	km.add("キァ", "kya");
	km.add("キュ", "kyu");
	km.add("キョ", "kyo");

	km.add("しゃ", "sha");
	km.add("しゅ", "shu");
	km.add("しょ", "sho");
	km.add("シァ", "sha");
	km.add("シュ", "shu");
	km.add("ショ", "sho");

	km.add("ちゃ", "cha");
	km.add("ちゅ", "chu");
	km.add("ちょ", "cho");
	km.add("チァ", "cha");
	km.add("チュ", "chu");
	km.add("チョ", "cho");

	km.add("にゃ", "nya");
	km.add("にゅ", "nyu");
	km.add("にょ", "nyo");
	km.add("ニァ", "nya");
	km.add("ニュ", "nyu");
	km.add("ニョ", "nyo");

	km.add("ひゃ", "hya");
	km.add("ひゅ", "hyu");
	km.add("ひょ", "hyo");
	km.add("ヒァ", "hya");
	km.add("ヒュ", "hyu");
	km.add("ヒョ", "hyo");

	km.add("みゃ", "mya");
	km.add("みゅ", "myu");
	km.add("みょ", "myo");
	km.add("ミァ", "mya");
	km.add("ミュ", "myu");
	km.add("ミョ", "myo");

	km.add("りゃ", "rya");
	km.add("りゅ", "ryu");
	km.add("りょ", "ryo");
	km.add("リァ", "rya");
	km.add("リュ", "ryu");
	km.add("リョ", "ryo");

	km.add("ぎゃ", "gya");
	km.add("ぎゅ", "gyu");
	km.add("ぎょ", "gyo");
	km.add("ギァ", "gya");
	km.add("ギュ", "gyu");
	km.add("ギョ", "gyo");

	km.add("じゃ", "ja");
	km.add("じゅ", "ju");
	km.add("じょ", "jo");
	km.add("ジァ", "ja");
	km.add("ジュ", "ju");
	km.add("ジョ", "jo");

	km.add("びゃ", "bya");
	km.add("びゅ", "byu");
	km.add("びょ", "byo");
	km.add("ビァ", "bya");
	km.add("ビュ", "byu");
	km.add("ビョ", "byo");

	km.add("ぴゃ", "pya");
	km.add("ぴゅ", "pyu");
	km.add("ぴょ", "pyo");
	km.add("ピァ", "pya");
	km.add("ピュ", "pyu");
	km.add("ピョ", "pyo");

	km.add("ぢゃ", "ja");
	km.add("ぢゅ", "ju");
	km.add("ぢょ", "jo");
	km.add("ヂァ", "ja");
	km.add("ヂュ", "ju");
	km.add("ヂョ", "jo");

	return km;
}


/* for chrome */
function showMsgChrome(interval){
	countDownChrome();
	setTimeout(closeMsgChrome, interval);
}

function closeMsgChrome(){
	var div_out = document.getElementById("sh_msg_outter");
	var div_in = document.getElementById("sh_msg_inner");
	div_out.style.cssText+="visibility:hidden";
	div_in.style.cssText+="visibility:hidden";
}
function countDownChrome(){
	var timer = document.getElementById("timer");
	var time = parseInt(timer.innerHTML);
	if( time > 0){
		timer.innerHTML = --time;
		timer.innerHTML += " ";
		setTimeout(countDownChrome, 1000);
	}
}