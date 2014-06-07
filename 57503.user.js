// ==UserScript==
// @author         rikuo
// @name           like little girl
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// @exclude        https://*
// ==/UserScript==

// cf. http://blog.livedoor.jp/dankogai/archives/51221077.html
// cf. http://anond.hatelabo.jp/20090910174818
// cf. http://twitter.g.hatena.ne.jp/Hamachiya2/20090624/sachi_volta

var _doc = document;

const zenkatakanaRE = /[\u30A1-\u30F6]/g;

var zenkaku = ['。', '、', '「', '」', '・', 'ー',
    'ァ', 'ア', 'ィ', 'イ', 'ゥ', 'ウ', 'ェ', 'エ', 'ォ', 'オ', 
    'カ', 'ガ', 'キ', 'ギ', 'ク', 'グ', 'ケ', 'ゲ', 'コ', 'ゴ', 
    'サ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ', 
    'タ', 'ダ', 'チ', 'ヂ', 'ッ', 'ツ', 'ヅ', 'テ', 'デ', 'ト', 'ド', 
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 
    'ハ', 'バ', 'パ', 'ヒ', 'ビ', 'ピ', 'フ', 'ブ', 'プ', 'ヘ', 'ベ', 'ペ', 'ホ', 'ボ', 'ポ', 
    'マ', 'ミ', 'ム', 'メ', 'モ', 
    'ャ', 'ヤ', 'ュ', 'ユ', 'ョ', 'ヨ', 
    'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ヴ'
];

var hankaku = ['｡', '､', '｢', '｣', '･', 'ｰ',
    'ｧ', 'ｱ', 'ｨ', 'ｲ', 'ｩ', 'ｳ', 'ｪ', 'ｴ', 'ｫ', 'ｵ', 
    'ｶ', 'ｶﾞ', 'ｷ', 'ｷﾞ', 'ｸ', 'ｸﾞ', 'ｹ', 'ｹﾞ', 'ｺ', 'ｺﾞ', 
    'ｻ', 'ｻﾞ', 'ｼ', 'ｼﾞ', 'ｽ', 'ｽﾞ', 'ｾ', 'ｾﾞ', 'ｿ', 'ｿﾞ', 
    'ﾀ', 'ﾀﾞ', 'ﾁ', 'ﾁﾞ', 'ｯ', 'ﾂ', 'ﾂﾞ', 'ﾃ', 'ﾃﾞ', 'ﾄ', 'ﾄﾞ',
     'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 
     'ﾊ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎ', 'ﾎﾞ', 'ﾎﾟ', 
     'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 
     'ｬ', 'ﾔ', 'ｭ', 'ﾕ', 'ｮ', 'ﾖ', 
     'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ', 'ｳﾞ'
];
const re_hankaku = /[\uFF61-\uFF9D][\uFF9E\uFF9F]?/g;
var h2z = {};
for (var i = 0, l = hankaku.length; i < l; i++){
    h2z[hankaku[i]] = zenkaku[i];
};


var katakana_conversion = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(zenkatakanaRE,function(z){
			return String.fromCharCode(z.charCodeAt(0)-0x60)
		}).replace(re_hankaku, function(m0){
        		return h2z[m0];
		}).replace(/([くすつぬむゆぐず])/g,'$1ゅ').replace(/ら/g,'りゃ').replace(/り/g,'り').replace(/る/g,'りゅ').replace(/れ/g,'れ').replace(/ろ/g,'りょ').replace(/な[。、！!?？]/g,'にゃ$1').replace(/なので/g,'にゃので').replace(/なう/g,'にゃう');
		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

katakana_conversion(_doc);

function xpath(context, query){
	return _doc.evaluate(
		query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}

if(window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}

function boot(){
	window.AutoPagerize.addFilter(function(docs){
		docs.forEach(katakana_conversion);
	});
}
