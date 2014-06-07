// ==UserScript==
// @name           NicoVideo Mylist Search
// @namespace      http://lpha38.net/
// @description    マイリストページに、キーワード、動画IDで検索できる検索窓を設置する。
// @version        2.3.0
// @license        MIT License
// @include        http://www.nicovideo.jp/mylist/*
// @include        http://www.nicovideo.jp/my/mylist*
// @run-at         document-end
// @homepageURL    http://userscripts.org/scripts/show/111522
// @supportURL     http://userscripts.org/scripts/issues/111522
// @updateURL      http://userscripts.org/scripts/source/111522.user.js
// @iconURL        http://uni.res.nimg.jp/img/favicon.ico
// ==/UserScript==
(function () {
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = w.document;
    var VERSION = "2.3.0", TAG = "[nms]", DEBUG_MODE = false;
    var log = function () { if (DEBUG_MODE) return w.console.log.apply(w.console, Array.prototype.concat.apply([TAG], arguments)); };
    var $ = w.jQuery, my = w.my;

    log("start");
    log("version:", VERSION);

    $(function () {
        log("document initilized");
        $ = w.jQuery, my = w.my;
        
        if ($("#SYS_box_mylist_search").length > 0) return;

        // マイページかどうかを判定
        var isMypage = location.href.indexOf("http://www.nicovideo.jp/my/", 0) == 0;
        log("isMypage:", isMypage);
        // とりあえずマイリストかどうか判定
        //var isDefMylist = isMypage ? my.currentGroup == null : false;
        //log(TAG, "isDefMylist", isDefMylist);

        // ページの再読み込みを行う関数
        var reload = function () {
            var hackReg = /\+hack\=\d+/g;
            var pageReg = /\+page\=\d+/g;
            var newLoc = location.href;
            if (!isMypage || location.href.indexOf("http://www.nicovideo.jp/my/mylist", 0) == 0) {
                newLoc += newLoc.indexOf("#", 0) < 0 ? "#" : "";
            }
            newLoc = newLoc.replace(pageReg, "");
            newLoc = newLoc.replace(hackReg, "") + "+hack=" + new Date().getTime();
            location.href = newLoc;
        };

        log("def reload()");

        // 文字列から単語に分割する関数
        var split = function (str) {
            var words = [];
            var chars = str.split("");
            var tmp = "";
            var splitChars = new Array(" ", "　", "\n", "\t").join("");
            for (var i = 0; i < chars.length; i++) {
                if (splitChars.indexOf(chars[i], 0) >= 0) {
                    if (tmp != "") {
                        words.push(tmp);
                        tmp = "";
                    }
                } else {
                    tmp += chars[i];
                }
            }
            if (tmp != "") {
                words.push(tmp);
            }
            return words;
        }
        log("def split()");

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
        String.prototype.toHalf = function () {
            return this.replace(/[！-～]/g, function (s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        }

        // 本来表示されるはずのマイリストアイテム
        var originalItems;
        // 最後に表示したマイリストID
        var last = "";
        
        var getItems = function (groupId) {
            if (groupId == "deflist") {
                return my.deflist;
            } else {
                return my.mylist[groupId]
            }
        }

        var setItems = function (groupId, items) {
            if (groupId == "deflist") {
                my.deflist = items;
            } else {
                my.mylist[groupId] = items;
            }
        }

        // マイリスト検索をする関数
        var execSearch = function () {
            // 前回、表示したアイテムを元に戻す
            if (last != "") {
                setItems(last, originalItems);
            }

            // 表示しているマイリストIDを記録
            last = my.currentGroup == null ? "deflist" : my.currentGroup.id;
            // 表示されるはずのマイリストアイテムを取得
            originalItems = getItems(last);
            // 表示するマイリストアイテムを空にする
            setItems(last, []);

            // 検索ワードの取得
            var keyword = $("#SYS_box_mylist_search_keyword")[0].value;
            var keywords = split(keyword);
            $("#SYS_box_mylist_search_keyword")[0].value = keywords.join(" ");
            keywords = $.map(keywords, function (value) {
                return value.half2full().kata2hira().toHalf().toLowerCase();
            });
            // 削除済み：jQuery1.3 なので prop は使わない
            var deleted = $("#SYS_box_mylist_search_deleted:checked").length == 1;

            // キーワードを元にマイリストアイテムを絞り込む
            setItems(last, $.grep(originalItems, function (item, index) {
                // 削除済み
                if (deleted != item.item_data.deleted == "1") return false;
                var target = [
                    item.description,
                    item.item_data.title,
                    item.item_data.watch_id
                ].join(" ").half2full().kata2hira().toHalf().toLowerCase();

                var count = 0;
                $.each(keywords, function (i, word) {
                    if (target.indexOf(word, 0) >= 0) {
                        count++;
                        return true;
                    }
                });

                return count == keywords.length;
            }));

            // 再読み込み
            reload();
        };
        log("def execSearch()");

        $("body").bind("nicoMylistRemoved", function (ev, groupId, itemIds) {
            if (last == groupId) {
                var ids = itemIds[0];
                originalItems = $.grep(originalItems, function (item) {
                    for (var i = 0; i < ids.length; i++) {
                        if (item.item_id == ids[i]) return false;
                    }
                    return true;
                });
            }
        });
        $("body").bind("nicoMylistMoved", function (ev, currentGroupId, targetGroupId, itemIds, results) {
            if (currentGroupId == last) {
                var items = results.matches.item;
                originalItems = $.grep(originalItems, function (item) {
                    for (var i = 0; i < items.length; i++) {
                        if (item.item_id == items[i].id) return false;
                    }
                    return true;
                });
            }
        });
        
        $('<style type="text/css" />').text(isMypage ? 
'#SYS_box_mylist_search { font-size: 108%; margin: 0 0 1px 13px; }\
 #SYS_box_mylist_search_keyword { margin: 2px; padding: 2px; width: 300px; }\
 #SYS_box_mylist_search_submit, SYS_box_mylist_search_reset {\
      padding: 2px; height: 23px; width: 60px; }' :
'#SYS_box_mylist_search_form {\
     height: 0; text-align: right; right: 5px; top: 0px; position: relative; }\
 #SYS_box_mylist_search_keyword { width: 200px; }\
 #SYS_box_mylist_search_deleted { margin: 3px; }')
            .appendTo($("head"));
        log("add style");

        $('<div id="SYS_box_mylist_search" />')
            .append($('<form action="javascript:void(0)" name="search" id="SYS_box_mylist_search_form" />')
                .submit(execSearch)
                .bind('reset', function () {
                    setTimeout(execSearch, 10);
                })
                .append('<input type="textarea" name="keyword" id="SYS_box_mylist_search_keyword" />')
                .append('<input type="checkbox" name="deleted" id="SYS_box_mylist_search_deleted" />削除済み')
                .append('<input type="submit" value="検索" id="SYS_box_mylist_search_submit" />')
                .append('<input type="reset" value="リセット" id="SYS_box_mylist_search_reset" />')
            )
            .insertBefore(isMypage ? "#myContHead" : "#SYS_box_mylist_header");
        log("add search window");

    });
})();