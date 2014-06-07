// ==UserScript==
// @id             booklog.jp-e13d0635-33af-482d-8bc0-584004491a94@http://lpha38.net/
// @name           booklog tag incsearch
// @version        1.2.4
// @namespace      http://indigocat.info/
// @author         lpha38
// @description    本棚ページでタグ一覧を自動で展開し、検索ボックスを配置する
// @include        http://booklog.jp/users/*
// @run-at         document-end
// @homepageURL    http://userscripts.org/scripts/show/133979
// @updateURL      http://userscripts.org/scripts/source/133979.user.js
// @supportURL     http://userscripts.org/scripts/issues/133979
// @iconURL        http://booklog.jp/favicon.ico
// ==/UserScript==
(function () {
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = w.document;
    var VERSION = "1.2.4", TAG = "[incsearch]", isDebug = false;
    var log = function () { if (isDebug) return w.console.log.apply(w.console, arguments); };
    
    // かな変換
    // @see http://mashimonator.weblike.jp/library/2011/09/javascript-javascript.html
    String.prototype.kata2hira = function () {
        return this.replace(/[\u30A1-\u30F6]/g, function (idx) {
            return String.fromCharCode(idx.charCodeAt(0) - 0x60);
        });
    }
    String.prototype.half2full = (function () {
        var full = ['。', '、', '「', '」', '・', 'ー', '　',
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
        var half = ['｡', '､', '｢', '｣', '･', 'ｰ', ' ',
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
        var reg = new RegExp('[' + half.join('') + ']', 'g');
        return function () {
            var str = '';
            var mapping = [];
            for (var i = 0, l = half.length; i < l; i++) {
                mapping[half[i]] = full[i];
            }
            for (var i = 0, len = this.length; i < len; i++) {
                if (this.charCodeAt(i) >= 0x0021 && this.charCodeAt(i) <= 0x007e) {
                    str += String.fromCharCode(0xff01 + (this.charCodeAt(i) - 0x0021));
                } else {
                    str += this.charAt(i);
                }
            }
            return str.replace(reg, function (idx) {
                return mapping[idx];
            });
        }
    })();

    var showTags = function (callback) {
        var a = w.$$("#showtags a");
        a = a.length > 0 ? a[0] : null;
        // タグを展開
        a && a.click();
        // 展開を待つ
        var timer = setInterval(function () {
            if (a && a.style.display == "none") return;
            if (!w.Insertion || !w.Insertion.Before) return;
            // タイマーキャンセル
            clearInterval(timer);
            // コールバック
            setTimeout(callback, 500);
        }, 100);
    };

    w.addEventListener("load", function () {
        showTags(function () {
            // タグを取得
            var tags = [];
            w.$$("#tag .txt").each(function (ele, i) {
                try {
                    var name = ele.innerHTML;
                    if (name != null) {
                        name = name.half2full().kata2hira().toLowerCase();
                        tags.push({ element: ele.parentElement.parentElement, name: name });
                    }
                } catch (ex) {
                    log(ex);
                }
            });
            log(tags);
            // テキストボックスを挿入
            w.Insertion.Before(w.$("tag"), '<input type="text" id="tagIncSearchTextBox" placeholder="タグ検索" class="inputtext" style="margin: 0 5px 15px 5px;"></input>');

            var last = '';
            var textbox = w.$("tagIncSearchTextBox");
            setTimeout(function () {
                // キーワードを取得
                var value = textbox.value;
                if (value != last) {
                    last = value;
                    value = value.half2full().kata2hira().toLowerCase();

                    // 検索
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].name.indexOf(value) >= 0 || value == "") {
                            tags[i].element.style.display = "inline";
                        } else {
                            tags[i].element.style.display = "none";
                        }
                    }
                }
                setTimeout(arguments.callee, 200);
            }, 200);
        });
    });
})();