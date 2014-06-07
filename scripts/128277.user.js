// ==UserScript==
// @name	小说屏蔽字修复
// @id		novelfixed
// @description	小说(星号、拼音)屏蔽修复
// @author	fireAA
// @include       http://*/files/article/html/*
// @include       http://*/Wap/Book/Chapter.aspx*
// @include       http://*/Html/Book/*
// @include       http://www.kuai-yan.com/kz/kz.php?*
// @include       http://3g.kuai-yan.com/kz/kz.php?*
// @include       http://read.5ccc.net/*
// @include       http://www.88106.com/book/*
// @include       http://www.wanshulou.com/xiaoshuo/*
// @include       http://www.luoqiu.com/html/*
// @include       http://baishuku.com/html/*
// @include       http://www.shuoshuo520.com/Html/*
// @include       http://read.shanwen.com/*
// @include       http://www.5ycn.com/*
// @include       http://www.58xs.com/html/*
// @include       http://www.cilook.cn/html/*
// @include       http://b.easou.com/show.m*

// ==/UserScript==
var SITE_INFO = [
    {
        url:    'www\.kuai-yan\.com',
        content:  '//div[@id="kz_content"]'   
    },
    {
        url:    '3g\.kuai-yan\.com',
        content:  '//div[@class="content"]'   
    },
    {
        url:    'b\.easou\.com',
        content:  '//div[@class="content"]'   
    }
];
    var len = SITE_INFO.length;
    var host = window.location.host;
    var area;
    for ( i = 0; i < len; i++) {
        var reg = new RegExp(SITE_INFO[i].url);
        if ( reg.test(host) == true) {
          area = SITE_INFO[i].content;
          break;
          }
    }
var replacements, regex, key, textnodes, node, s;

replacements = {

// ===格式整理===
    "\\(|\\[|\\{|（|【|｛":"（",
    "\\)|\\]|\\}|）|】|｝":"）",
    "\\*|＊":"*",
    "[wWｗＷ]{3}":"www",
    "w{3}(\u3001|\u3002)":"www.",
    "[cCｃＣ][oOｏＯ][mMｍＭ]":"com",
    "[nNｎＮ][eｅEＥ][tｔTＴ]":"net",
    "[cCｃＣ][nNｎＮ]":"cn",
    "(\\.|\u3001|\u3002)com":".com",
    "(\\.|\u3001|\u3002)net":".net",
    "(\\.|\u3001|\u3002)cn":".cn",
    "[pPｐＰ][sSｓＳ][:：]":"ps:",
    "。{5,7}":"……","~{2,50}":"——","…{3,40}": "……","－{3,20}":"——",
    "。(,|，|。)": "。",
    "？(,|，)": "？",
    "”(,|，|。)": "”",

// ===星号屏蔽字还原===
	"\u5341\u6709(\\*{2})": "\u5341\u6709\u516B\u4E5D","\\*(2)\u4E0D\u79BB\u5341":"\u516B\u4E5D\u4E0D\u79BB\u5341",
	"G(\\*{2})":"GSM",
	"\u611F(\\*{2})\u5F69": "\u611F\u60C5\u8272\u5F69",
	"\u5F3A(\\*{2})u5B9D": "\u5F3A\u5927\u6CD5\u5B9D",

// ===单字替换===
	"b(a|ā)ng": "\u68D2","b(o|ō)": "\u6CE2","b(i|ī)": "\u903C",
	"chu(a|á)ng": "\u5E8A","ch(o|ō)u": "\u62BD","ch(a|á)o": "\u6F6E","chun": "\u6625","c(a|à)o": "\u64CD","ch(a|ā)": "\u63D2",
	"d(a|à)ng": "\u8361","d(o|ò)ng": "\u6D1E",
	"f(e|é)i": "\u80A5","f(u|ù)": "\u5987",
	"ji(a|ā)o": "\u4EA4","ji(a|ā)n": "\u5978","j(i|ī)ng": "\u7CBE","j(i|ī)": "\u6FC0",
	"lu(a|à)n": "\u4E71","l(a|à)ng": "\u6D6A","(l|1)(u|ù)": "\u9732",
	"m(e|é)ng": "\u8499","m(a|á)o": "\u6BDB","m(e|é)n": "\u95E8","m(i|í)": "\u8FF7","m(o|ō)": "\u6478",
	"n(o|ò)ng": "\u5F04","ni(a|à)o": "\u5C3F","nv": "\u5973",
	"r(o|ò)u": "\u8089","róu": "\u63C9","r(u|ǔ)": "\u4E73",
	"s(a|ā)o": "\u9A9A","sh(i|ì)": "\u4F8D","sh(e|è)": "\u5C04","s(e|è)": "\u8272","s(i|ī)": "\u79C1",
	"t(i|ǐ)ng": "\u633A","ti(a|ǎ)n": "\u8214","tu(i|ǐ)": "\u817F","tun": "\u81C0",
	"x(i|ì)ng": "\u6027","xi(ō|o)ng": "\u80F8","xu(e|é)": "\u7A74",
	"w(e|ě)n": "\u543B",
	"ying": "\u786C","y(ī|i)n": "\u9634","yín": "\u5464","y(a|à)n": "\u8273","y(a|à)o": "\u836F","y(o|ò)u": "\u8BF1","y(u|ù)": "\u6B32",
	"hu(a|ā)": "\u82B1","h(u|ú)n": "\u9B42","hu(o|ò)": "\u60D1",

	
// ===误替换还原===
	"碧欲": "碧玉","美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
	"品性": "品行","德性": "德行",
	"波ok":"book",
// ===其他修正===
	"弥俩": "你俩",
	"妳": "你",
  	"\u571E|\u57A9|\u535D|\u9F98": "",
  	
// ===去广告===
	"http://|www\\..*?\\.(com|net|cn)|ps:.*|（|）": "",
	"3vbook\\.cn":"",
	"\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
	};
	
regex = {};
for (key in replacements) {
	regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
	node = textnodes.snapshotItem(i);
	s = node.data;
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}
	node.data = s;
}
