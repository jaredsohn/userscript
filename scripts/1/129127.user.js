// ==UserScript==
// @name           kf_star_1
// @namespace      com.whowhopipi
// @description    KF星成就
// @include        http://bbs.9gal.com/kf_star_1.php
// @include        http://bbs.9baka.com/kf_star_1.php
// @require		http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

var kfstar = {
	kanaMap : {
		Add : function(key, value) {
			this[key] = value;
		}
	},
	initMap : function() {
		this.kanaMap.Add("あ", "a");
		this.kanaMap.Add("い", "i");
		this.kanaMap.Add("う", "u");
		this.kanaMap.Add("え", "e");
		this.kanaMap.Add("お", "o");
		this.kanaMap.Add("ア", "a");
		this.kanaMap.Add("イ", "i");
		this.kanaMap.Add("ウ", "u");
		this.kanaMap.Add("エ", "e");
		this.kanaMap.Add("オ", "o");

		this.kanaMap.Add("か", "ka");
		this.kanaMap.Add("き", "ki");
		this.kanaMap.Add("く", "ku");
		this.kanaMap.Add("け", "ke");
		this.kanaMap.Add("こ", "ko");
		this.kanaMap.Add("カ", "ka");
		this.kanaMap.Add("キ", "ki");
		this.kanaMap.Add("ク", "ku");
		this.kanaMap.Add("ケ", "ke");
		this.kanaMap.Add("コ", "ko");

		this.kanaMap.Add("さ", "sa");
		this.kanaMap.Add("し", "shi");
		this.kanaMap.Add("す", "su");
		this.kanaMap.Add("せ", "se");
		this.kanaMap.Add("そ", "so");
		this.kanaMap.Add("サ", "sa");
		this.kanaMap.Add("シ", "shi");
		this.kanaMap.Add("ス", "su");
		this.kanaMap.Add("セ", "se");
		this.kanaMap.Add("ソ", "so");

		this.kanaMap.Add("た", "ta");
		this.kanaMap.Add("ち", "chi");
		this.kanaMap.Add("つ", "tsu");
		this.kanaMap.Add("て", "te");
		this.kanaMap.Add("と", "to");
		this.kanaMap.Add("タ", "ta");
		this.kanaMap.Add("チ", "chi");
		this.kanaMap.Add("ツ", "tsu");
		this.kanaMap.Add("テ", "te");
		this.kanaMap.Add("ト", "to");

		this.kanaMap.Add("な", "na");
		this.kanaMap.Add("に", "ni");
		this.kanaMap.Add("ぬ", "nu");
		this.kanaMap.Add("ね", "ne");
		this.kanaMap.Add("の", "no");
		this.kanaMap.Add("ナ", "na");
		this.kanaMap.Add("ニ", "ni");
		this.kanaMap.Add("ヌ", "nu");
		this.kanaMap.Add("ネ", "ne");
		this.kanaMap.Add("ノ", "no");

		this.kanaMap.Add("は", "ha");
		this.kanaMap.Add("ひ", "hi");
		this.kanaMap.Add("ふ", "fu");
		this.kanaMap.Add("へ", "he");
		this.kanaMap.Add("ほ", "ho");
		this.kanaMap.Add("ハ", "ha");
		this.kanaMap.Add("ヒ", "hi");
		this.kanaMap.Add("フ", "fu");
		this.kanaMap.Add("ヘ", "he");
		this.kanaMap.Add("ホ", "ho");

		this.kanaMap.Add("ま", "ma");
		this.kanaMap.Add("み", "mi");
		this.kanaMap.Add("む", "mu");
		this.kanaMap.Add("め", "me");
		this.kanaMap.Add("も", "mo");
		this.kanaMap.Add("マ", "ma");
		this.kanaMap.Add("ミ", "mi");
		this.kanaMap.Add("ム", "mu");
		this.kanaMap.Add("メ", "me");
		this.kanaMap.Add("モ", "mo");

		this.kanaMap.Add("や", "ya");
		this.kanaMap.Add("ゆ", "yu");
		this.kanaMap.Add("よ", "yo");
		this.kanaMap.Add("ヤ", "ya");
		this.kanaMap.Add("ユ", "yu");
		this.kanaMap.Add("ヨ", "yo");

		this.kanaMap.Add("ら", "ra");
		this.kanaMap.Add("り", "ri");
		this.kanaMap.Add("る", "ru");
		this.kanaMap.Add("れ", "re");
		this.kanaMap.Add("ろ", "ro");
		this.kanaMap.Add("ラ", "ra");
		this.kanaMap.Add("リ", "ri");
		this.kanaMap.Add("ル", "ru");
		this.kanaMap.Add("レ", "re");
		this.kanaMap.Add("ロ", "ro");

		this.kanaMap.Add("わ", "wa");
		this.kanaMap.Add("を", "o");
		this.kanaMap.Add("ん", "n");
		this.kanaMap.Add("ワ", "wa");
		this.kanaMap.Add("ヲ", "o");
		this.kanaMap.Add("ン", "n");

		this.kanaMap.Add("が", "ga");
		this.kanaMap.Add("ぎ", "gi");
		this.kanaMap.Add("ぐ", "gu");
		this.kanaMap.Add("げ", "ge");
		this.kanaMap.Add("ご", "go");
		this.kanaMap.Add("ガ", "ga");
		this.kanaMap.Add("ギ", "gi");
		this.kanaMap.Add("グ", "gu");
		this.kanaMap.Add("ゲ", "ge");
		this.kanaMap.Add("ゴ", "go");

		this.kanaMap.Add("ざ", "za");
		this.kanaMap.Add("じ", "ji");
		this.kanaMap.Add("ず", "zu");
		this.kanaMap.Add("ぜ", "ze");
		this.kanaMap.Add("ぞ", "zo");
		this.kanaMap.Add("ザ", "za");
		this.kanaMap.Add("ジ", "ji");
		this.kanaMap.Add("ズ", "zu");
		this.kanaMap.Add("ゼ", "ze");
		this.kanaMap.Add("ゾ", "zo");

		this.kanaMap.Add("だ", "da");
		this.kanaMap.Add("ぢ", "ji");
		this.kanaMap.Add("づ", "zu");
		this.kanaMap.Add("で", "de");
		this.kanaMap.Add("ど", "do");
		this.kanaMap.Add("ダ", "da");
		this.kanaMap.Add("ヂ", "ji");
		this.kanaMap.Add("ヅ", "zu");
		this.kanaMap.Add("デ", "de");
		this.kanaMap.Add("ド", "do");

		this.kanaMap.Add("ば", "ba");
		this.kanaMap.Add("び", "bi");
		this.kanaMap.Add("ぶ", "bu");
		this.kanaMap.Add("べ", "be");
		this.kanaMap.Add("ぼ", "bo");
		this.kanaMap.Add("バ", "ba");
		this.kanaMap.Add("ビ", "bi");
		this.kanaMap.Add("ブ", "bu");
		this.kanaMap.Add("ベ", "be");
		this.kanaMap.Add("ボ", "bo");

		this.kanaMap.Add("ぱ", "pa");
		this.kanaMap.Add("ぴ", "pi");
		this.kanaMap.Add("ぷ", "pu");
		this.kanaMap.Add("ぺ", "pe");
		this.kanaMap.Add("ぽ", "po");
		this.kanaMap.Add("パ", "pa");
		this.kanaMap.Add("ピ", "pi");
		this.kanaMap.Add("プ", "pu");
		this.kanaMap.Add("ペ", "pe");
		this.kanaMap.Add("ポ", "po");

		this.kanaMap.Add("きゃ", "kya");
		this.kanaMap.Add("きゅ", "kyu");
		this.kanaMap.Add("きょ", "kyo");
		this.kanaMap.Add("キァ", "kya");
		this.kanaMap.Add("キュ", "kyu");
		this.kanaMap.Add("キョ", "kyo");

		this.kanaMap.Add("しゃ", "sha");
		this.kanaMap.Add("しゅ", "shu");
		this.kanaMap.Add("しょ", "sho");
		this.kanaMap.Add("シァ", "sha");
		this.kanaMap.Add("シュ", "shu");
		this.kanaMap.Add("ショ", "sho");

		this.kanaMap.Add("ちゃ", "cha");
		this.kanaMap.Add("ちゅ", "chu");
		this.kanaMap.Add("ちょ", "cho");
		this.kanaMap.Add("チァ", "cha");
		this.kanaMap.Add("チュ", "chu");
		this.kanaMap.Add("チョ", "cho");

		this.kanaMap.Add("にゃ", "nya");
		this.kanaMap.Add("にゅ", "nyu");
		this.kanaMap.Add("にょ", "nyo");
		this.kanaMap.Add("ニァ", "nya");
		this.kanaMap.Add("ニュ", "nyu");
		this.kanaMap.Add("ニョ", "nyo");

		this.kanaMap.Add("ひゃ", "hya");
		this.kanaMap.Add("ひゅ", "hyu");
		this.kanaMap.Add("ひょ", "hyo");
		this.kanaMap.Add("ヒァ", "hya");
		this.kanaMap.Add("ヒュ", "hyu");
		this.kanaMap.Add("ヒョ", "hyo");

		this.kanaMap.Add("みゃ", "mya");
		this.kanaMap.Add("みゅ", "myu");
		this.kanaMap.Add("みょ", "myo");
		this.kanaMap.Add("ミァ", "mya");
		this.kanaMap.Add("ミュ", "myu");
		this.kanaMap.Add("ミョ", "myo");

		this.kanaMap.Add("りゃ", "rya");
		this.kanaMap.Add("りゅ", "ryu");
		this.kanaMap.Add("りょ", "ryo");
		this.kanaMap.Add("リァ", "rya");
		this.kanaMap.Add("リュ", "ryu");
		this.kanaMap.Add("リョ", "ryo");

		this.kanaMap.Add("ぎゃ", "gya");
		this.kanaMap.Add("ぎゅ", "gyu");
		this.kanaMap.Add("ぎょ", "gyo");
		this.kanaMap.Add("ギァ", "gya");
		this.kanaMap.Add("ギュ", "gyu");
		this.kanaMap.Add("ギョ", "gyo");

		this.kanaMap.Add("じゃ", "ja");
		this.kanaMap.Add("じゅ", "ju");
		this.kanaMap.Add("じょ", "jo");
		this.kanaMap.Add("ジァ", "ja");
		this.kanaMap.Add("ジュ", "ju");
		this.kanaMap.Add("ジョ", "jo");

		this.kanaMap.Add("びゃ", "bya");
		this.kanaMap.Add("びゅ", "byu");
		this.kanaMap.Add("びょ", "byo");
		this.kanaMap.Add("ビァ", "bya");
		this.kanaMap.Add("ビュ", "byu");
		this.kanaMap.Add("ビョ", "byo");

		this.kanaMap.Add("ぴゃ", "pya");
		this.kanaMap.Add("ぴゅ", "pyu");
		this.kanaMap.Add("ぴょ", "pyo");
		this.kanaMap.Add("ピァ", "pya");
		this.kanaMap.Add("ピュ", "pyu");
		this.kanaMap.Add("ピョ", "pyo");

		this.kanaMap.Add("ぢゃ", "ja");
		this.kanaMap.Add("ぢゅ", "ju");
		this.kanaMap.Add("ぢょ", "jo");
		this.kanaMap.Add("ヂァ", "ja");
		this.kanaMap.Add("ヂュ", "ju");
		this.kanaMap.Add("ヂョ", "jo");
	},
	getFAQ : function(constData) {
		var s1_0 = $("input[name='s1_0']").val();
		$("input[name='s1_0_ans']").val(kfstar.kanaMap[s1_0]);
		$("input[name='s1_1_ans']").val(
				kfstar.kanaMap[$("input[name='s1_1']").val()]);
		$("input[name='s1_2_ans']").val(
				kfstar.kanaMap[$("input[name='s1_2']").val()]);
		$("input[name='s1_3_ans']").val(
				kfstar.kanaMap[$("input[name='s1_3']").val()]);
		$("input[name='s1_4_ans']").val(
				kfstar.kanaMap[$("input[name='s1_4']").val()]);
	},
	formateDate : function(date, format) {
		var o = {
			"M+" : date.getMonth() + 1, // month
			"d+" : date.getDate(), // day
			"h+" : date.getHours(), // hour
			"m+" : date.getMinutes(), // minute
			"s+" : date.getSeconds(), // second
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
			"S" : date.getMilliseconds()
		// millisecond
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	},
	formateNow : function() {
		return this.formateDate(new Date(), "yyyy-MM-dd hh:mm:ss");
	}
};

kfstar.initMap();
kfstar.getFAQ();

// 获取下一次获得经验的时间
var timeStr = $("table tr:eq(3) td:eq(2)").text().replace(/[^\d]/g,"");
var time = new Number(timeStr) + 1;

setTimeout(function() {
	$("input[name='submit']").click();
}, time * 60 * 1000);

$("table[class='kf_fw_ig1'] > tbody").append(
		"<tr><td colspan='3' style='color:#090;'>初始化时间：" + kfstar.formateNow()
				+ "</td></tr>");

