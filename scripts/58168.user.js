// ==UserScript==
// @name           nicovideo comment modify
// @namespace      tag:kiyo.gremon@gmail.com,2009:kiyo.gremon
// @description    ニコニコ動画のユーザーコメント中にある連続した空白を改行にしたり、リンクと思われる文字列をリンク化をしたりします
// @version        0.5.20100629
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

(function(){
    // 設定項目

    // 対象とする連続スペースの長さの設定
    // 標準では10文字以上連続するスペースを処理
    var breakSpaceLength = 10;

    // 対象とするサイトのURLの先頭部分、動画説明文位置のXPath、連続するスペースの処理方法、リンクらしき文字列をリンクにするかを設定
    // 連続するスペースの処理方法（type）は"break"、"delete"、"keep"から選べる。"break"は連続するスペースを改行にし、
    // "delete"は一文字の半角スペースに置き換え、"keep"は連続するスペースに対し何も処理をしない。
    // リンク化処理のみをしたい場合には"keep"を選ぶといい（このときlink（リンク化処理の設定）がtrueでないなら何の意味もない）。
    // typeにそれ以外の値が設定される、または設定されない場合は連続するスペースの置き換えは行わないがその途中での改行をできるように処理する。
    var Targets = [
        // 動画上の「動画の説明」の設定（「詳細情報・メニューを隠す」の状態）
        {
            site:  "http://www\\.nicovideo\\.jp/watch/",
            xpath: 'id("des_1")/div[@style="padding: 4px;"]/p[@class="font12"]',
            type:  "keep",
            link:  true
        },
        // 動画上の「動画の説明」の設定（「詳細情報・メニューを表示する」の状態）
        {
            site:  "http://www\\.nicovideo\\.jp/watch/",
            xpath: 'id("des_2")/div/table/tbody/tr/td[@class="font12"]',
            type:  "break",
            link:  true
        },
        // 動画下、ページ下部の動画説明文の設定
        {
            site:  "http://www\\.nicovideo\\.jp/watch/",
            xpath: 'id("WATCHFOOTER")/div[@class="mb16p4"]/p[@class="font10"][last()]',
            type:  "delete",
            link:  true
        },
        // ログインしていない状態で動画ページを開いた際に現れる動画説明文の設定
        {
            site:  "http://www\\.nicovideo\\.jp/watch/",
            xpath: 'id("PAGEBODY")/div[@class="content_672_solo"]/table[@width="672"]/tbody/tr/td[@width="100%"]/p[last()]',
            type:  "break",
            link:  true
        },
        // 検索結果等での各動画説明文の設定
        {
            site:  "http://www\\.nicovideo\\.jp/(?:hotlist|newarrival|mylist_search|recent|search|tag)",
            xpath: 'id("PAGEBODY")/div[@class="content_672"]/table[@summary="videos"]//a[@class="vinfo_title"]/following::p[@class="font12"][1]|id("PAGEBODY")/div[@class="content_672"]//p[@class="group_description"]',
            type:  "delete",
            link:  true
        },
        // ランキングでの各動画説明文の設定
        {
            site: "http://www\\.nicovideo\\.jp/ranking/",
            xpath: '//p[@class="vinfo_last_res"]/preceding-sibling::*[1][self::p]',
            type:  "delete",
            link:  true
        },
        // 公開マイリストにおける各ユーザーのコメント
        {
            site:  "http://www\\.nicovideo\\.jp/openlist/",
            xpath: 'id("PAGEBODY")/div[@class="content_672"]/table[@class="font12"]/tbody/tr/td[@width="100%"]',
            type:  "break",
            link:  true
        }
    ];

    // リンクにする文字列の設定
    // 設定の注意
    // アルファベットから始まる文字列をリンクにした場合は、その文字の前にアルファベットがある場合はリンクにはならない。
    // アルファベット以外の文字から始まる文字列をリンクにしたい場合は、先頭の文字を含む部分を後方参照できるように設定すること。
    // ランキングや検索結果などでは動画説明文が長いとその途中で省略されてしまう。リンクと思われる文字列中で省略が起こった場合に
    // その文字列をリンクにしたくなければ、3連続する「.」が後ろに続く場合はリンクにしないように設定する。
    var replaceURL = [
        // URLと思われる文字列の簡易チェック、実用性のためにURL末尾の「(」、「)」、「.」はURLの一部とは見なさないようにしてある
        {
            text: "h?ttp(s)?://([a-zA-Z0-9;/?:@&=+$,\\-_.!~*'()%#]+[a-zA-Z0-9;/?:@&=+$,\\-_!~*'%#])(?=[^a-zA-Z0-9;/?:@&=+$,\\-_.!~*'%#]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http$1://$2"
        },
        // 動画へのリンク
        {
            text: "(am|ax|ca|cw|fx|fz|ig|na|nl|nm|om|sk|sm|so|yk|yo|za|zb|zc|zd|ze)(\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://www.nicovideo.jp/watch/$1$2"
        },
        // 動画、マイリスト、マイビデオ、ユーザーへのリンク
        {
            text: "(watch|mylist|myvideo|user)\\/(\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://www.nicovideo.jp/$1/$2"
        },
        // ニコニコ静画へのリンク
        {
            text: "(sg\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://seiga.nicovideo.jp/bbs/$1"
        },
        // ニコニコチャンネルへのリンク
        {
            text: "(ch\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://ch.nicovideo.jp/channel/$1"
        },
        // ニコニコミュニティへのリンク
        {
            text: "(co\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://ch.nicovideo.jp/community/$1"
        },
        // ニコニコ市場へのリンク
        {
            text: "(dw|ga|ip)(\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://ichiba.nicovideo.jp/item/$1$2"
        },
        // ニコニコモンズへのリンク
        {
            text: "(nc\\d+)(?=[^\\d]|$)(?!(?:\\.{3}| \uFF65{3} )$)",
            href: "http://www.niconicommons.jp/material/$1"
        },
        // メールアドレス
        // http://search.cpan.org/~rgarcia/perl-5.10.0-RC1/pod/perlfaq9.pod#How_do_I_check_a_valid_mail_address?を参考に、
        // 一部携帯電話のアドレスなどのためにローカル部を、また「IDOLM@STER」等の文字がリンクにならないようにドメイン部を変更したもの。
        {
            text: "((?:[a-zA-Z0-9_!#$%&'*+/=?^`{}~|\\-][a-zA-Z0-9_!#$%&'*+/=?^`{}~|\\-.]*|\"(?:\\\\[^\\r\\n]|[^\\\\\"])*\")@(?:[a-zA-Z0-9_!#$%&'*+/=?^`{}~|\\-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?^`{}~|\\-]+)+|\\[(?:\\\\\\S|[\\x21-\\x5a\\x5e-\\x7e])*\\]))(?!\\.{3}$)",
            href: "mailto:$1"
        }
    ];
    // 設定ここまで


    // 下準備
    var regBreakSpaces = new RegExp("(\\s{" + ((isNaN(breakSpaceLength) || breakSpaceLength < 2) ? 10 : Math.ceil(breakSpaceLength)) + ",})");
    for (var i = 0, l = replaceURL.length; i < l; i++) {
        // リンクにしたい文字列の前にアルファベットがある場合はリンクにさせなくする
        // 「ID+数字」をリンクにする際に無関係の文や単語をリンクにさせないための処理
        replaceURL[i].regexp = new RegExp("(?:^|[^a-zA-Z])" + replaceURL[i].text);
    }

    // 具体的な処理をする関数
    function commentModify(doc, url) {
        if (!doc || !url) {
            return;
        }
        for (var i = 0, imax = Targets.length; i < imax; i++) {
            if (!Targets[i].xpath || !Targets[i].site || url.search(new RegExp(Targets[i].site)) != 0) {
                continue;
            }

            var comments = doc.evaluate(
                Targets[i].xpath,
                doc,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);

            for (var j = 0, jmax = comments.snapshotLength; j < jmax; j++) {
                var comment = comments.snapshotItem(j);

                // 連続スペースの処理
                if (Targets[i].type != "keep" && comment.textContent.search(regBreakSpaces) > -1) {
                    var texts = doc.evaluate(
                        './/text()',
                        comment,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null);

                    for (var k = 0, kmax = texts.snapshotLength; k < kmax; k++) {
                        var text = texts.snapshotItem(k);
                        var lastIndex;
                        while ((lastIndex = text.data.search(regBreakSpaces)) > -1) {
                            if (Targets[i].type == "delete") {
                                text.data = text.data.replace(regBreakSpaces, " ");
                                break;
                            }
                            else if (Targets[i].type == "break") {
                                text = text.splitText(lastIndex).splitText(RegExp.$1.length);
                                text.parentNode.replaceChild(document.createElement("br"), text.previousSibling);
                            }
                            else {
                                var df = document.createDocumentFragment();
                                var wbr = document.createElement("wbr");
                                text = text.splitText(lastIndex + 1).splitText(RegExp.$1.length - 1);
                                var spaces = text.previousSibling;
                                df.appendChild(spaces);
                                var spaceLength = spaces.data.length;
                                while (spaceLength--) {
                                    df.insertBefore(wbr.cloneNode(false), spaces);
                                    spaces = spaces.splitText(1);
                                }
                                df.appendChild(wbr.cloneNode(false));
                                text.parentNode.insertBefore(df, text);
                            }
                        }
                    }
                }

                // リンクらしき文字列をリンクにする処理
                if (Targets[i].link) {
                    for (var k = 0, kmax = replaceURL.length; k < kmax; k++) {
                        if (!replaceURL[k].regexp || !replaceURL[k].href || comment.textContent.search(replaceURL[k].regexp) == -1) {
                            continue;
                        }

                        var nltexts = doc.evaluate(
                            './/text()[not(ancestor::A)]',
                            comment,
                            null,
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                            null);

                        for(var l = 0, lmax = nltexts.snapshotLength; l < lmax; l++) {
                            nltext = nltexts.snapshotItem(l);
                            var match;
                            while ((match = nltext.data.match(replaceURL[k].regexp))) {
                                if (match.index == 0 && (/^[a-zA-Z]/.test(match[0]) || (match[1] && match[0].indexOf(match[1]) == 0))) {
                                    nltext = nltext.splitText(match[0].length);
                                }
                                else {
                                    nltext = nltext.splitText(match.index + 1).splitText(match[0].length - 1);
                                }
                                var href = match[0].replace(replaceURL[k].regexp, replaceURL[k].href);
                                a = document.createElement("a");
                                a.appendChild(nltext.previousSibling);
                                a.href = href;
                                nltext.parentNode.insertBefore(a, nltext);
                            }
                        }
                    }
                }

            }
        }
    }

    commentModify(document, document.URL);

    // AutoPagerizeへの対応
    function addFilterHandler() {
        window.AutoPagerize.addDocumentFilter(commentModify);
    }

    if (window.AutoPagerize) {
        addFilterHandler();
    }
    else {
        window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
    }

})();