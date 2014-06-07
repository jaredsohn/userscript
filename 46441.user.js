// ==UserScript==
// @name Post Now browsing to Twitter
// @namespace http://efcl.info/
// @version 1.2.3
// @description Usage: Ctrl + Shift + Enter -> "Now browsing: ****" on Twitter.
// @include http://*
// @include https://*
// @exclude http://twicli.neocat.jp/twicli.html
// @resource css https://raw.github.com/azu/PNBT/master/style.css
// @resource usconfigcss https://raw.github.com/azu/usconfig/v1.2.1/usconfig.css.template
// @require https://raw.github.com/azu/usconfig/v1.2.1/usconfig.js
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/oauth.js
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/sha1.js
// @require https://raw.github.com/azu/OAuth-for-Greasemonkey/master/GMwrap.js
// @require https://raw.github.com/azu/PNBT/master/twitter-text-tweetlength.js
// @run-at  document-end
// @noframes
// ==/UserScript==

(function () {

    // XPath関数
    var XPath = {
        cache: null,
        reset: function () {
            this.cache = Object.create(null);
        },
        get: function (context, expr, type) {
            var x = new XPathEvaluator();
            var cache = this.cache, evaluator;
            if (expr in cache) {
                evaluator = cache[expr];
            } else {
                evaluator = cache[expr] = x.createExpression(expr, null);
            }
            return evaluator.evaluate(context, type, null);
        },
        has: function (context, expr) {
            return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
        },
        first: function (context, expr) {
            return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        },
        last: function (context, expr) {
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            return all.snapshotItem(all.snapshotLength - 1) || null;
        },
        all: function (context, expr) {
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
            var ret = [];
            for (var i; (i = all.iterateNext()) !== null;) {
                ret.push(i);
            }
            return ret;
        }
    };
    XPath.reset();

    // OAuth
    var clientInfo = {
        name: 'PNBT',
        consumerKey: '9zzFsVFm4nLyfF5WXZsbrg',
        consumerSecret: '318LbLBmvECeZZmSUKVzdq8dpazGtMFf2P6hMPUjWU'
    };
    var TWOauth = new TwitterOauth(clientInfo);// OAuth認証オブジェクト初期化
    TWOauth.injectToConfig = function (authorizeURL) {
        var iframe = document.getElementById("usconfig_frame");
        var iframeDoc = iframe.contentDocument;
        // buttons_holder
        var section = iframeDoc.createElement("div");
        section.className = "section_header_holder";
        section.setAttribute("style", "font-size: 95%;" +
            "line-height: 120%;" +
            "margin-left: 20%;" +
            "margin-right: 20%;");


        if (TWOauth.isAuthorize()) {// OAuth認証済みな時
            var configDiv1 = iframeDoc.createElement("div");
            configDiv1.className = "config_var";
            configDiv1.style.textAlign = "center";
            var text = iframeDoc.createElement("span");
            text.className = "field_label"
            text.innerHTML = "OAuth logined ";
            var resetBt = iframeDoc.createElement("Button");
            resetBt.textContent = "Logout";
            resetBt.addEventListener("click", function (e) {
                if (window.confirm("Do you really logout?")) {
                    TWOauth.deleteAccessor();
                    Config.remove();
                }
            }, false);
            configDiv1.appendChild(text);
            configDiv1.appendChild(resetBt);
            section.appendChild(configDiv1);
        } else {

            var configDiv1 = iframeDoc.createElement("div");
            configDiv1.className = "config_var";
            XHRloading.removeText(iframeDoc);// delete loading...
            iframeDoc.createElement("div");
            var explaintext = iframeDoc.createElement("p");
            explaintext.innerHTML = [
                '',
                '<ol>',
                '    <li>Click "Sign in with Twitter" button</li>',
                '    <li>Allow ' + clientInfo.name + ' access</li>',
                '    <li>Copy PIN code</li>',
                '    <li>Input PIN code and Confirm</li>',
                '</ol>'
            ].join("\n");
            configDiv1.appendChild(explaintext);
            var imgOauth = iframeDoc.createElement("img");
            imgOauth.src = "data:image/png;base64,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";
            imgOauth.addEventListener("click", function () {
                GM_openInTab(authorizeURL);
            }, false);
            configDiv1.appendChild(imgOauth);

            var configDiv2 = iframeDoc.createElement("div");
            configDiv2.className = "config_var";
            var textPin = iframeDoc.createElement("span");
            textPin.className = "field_label"
            textPin.innerHTML = "Input PIN code ";
            var inputPin = iframeDoc.createElement("input");
            var submitBt = iframeDoc.createElement("Button");
            submitBt.textContent = "Confirm";
            submitBt.addEventListener("click", function (e) {
                XHRloading.createText(iframeDoc);
                TWOauth.getAccessToken(inputPin.value.replace(/\s/g, ""), function () {
                    XHRloading.removeText(iframeDoc);
                    alert("Authorization copplete!\nHave fun!");
                });
            }, false)
            configDiv2.appendChild(textPin);
            configDiv2.appendChild(inputPin);
            configDiv2.appendChild(submitBt);

            section.appendChild(configDiv1);
            section.appendChild(configDiv2);
        }
        var inp = XPath.last(iframeDoc.body, '//div[@class="section"]');
        inp.appendChild(section);
    };
    // ショートカットの設定関数
    // http://d.hatena.ne.jp/jimo1001/20090601/1243782686 を改変
    var ShortcutKey = function () {
        this.list = [];
        this.init();
    };
    ShortcutKey.prototype.keys = {
        8: 'BS',
        9: 'TAB',
        10: 'Enter',
        13: 'Enter',
        32: 'SPC',
        27: 'ESC',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12'
    };
    ShortcutKey.prototype.skeys = {
        8: 'BS',
        10: 'Enter',
        13: 'Enter',
        32: 'SPC'
    };
    ShortcutKey.prototype.mkeys = {
        'altKey': 'A',
        'ctrlKey': 'C',
        'metaKey': 'M',
        'shiftKey': 'S'
    };
    ShortcutKey.prototype.init = function () {
        var self = this;
        window.addEventListener('keydown', function (evt) {
            var key = self.get(evt);
            self.list.forEach(function (a) {
                if (a.key == key && (a.element == evt.target || a.element == evt.view)) {
                    // console.log(a.key +"=="+ key);
                    a.func(evt);
                }
            });
        }, false);
    };
    ShortcutKey.prototype.add = function (elm, key, func) {
        this.list.push({
            'element': elm,
            'key': key,
            'func': func
        });
    };
    ShortcutKey.prototype.get = function (evt) {
        var key = [], k = '';
        for (mk in this.mkeys) {
            if (evt[mk]) {
                key.push(this.mkeys[mk]);
            }
        }
        if (evt.which) {
            k = this.keys[evt.which] || String.fromCharCode(evt.which).toLowerCase();
            key.push(key.length ? '-' + k : k);
        } else if (evt.keyCode) {
            k = this.keys[evt.keyCode];
            key.push(key.length ? '-' + k : k);
        }
        return key.join("");
    };
    // ショートカットの定義
    var shortcut = new ShortcutKey();
    Config.define('usc_basic', function () {
            with (this.builder) {
                var shortURL_opt = [
                    't.co',
                    'bit.ly',
                    'j.mp',
                    'goo.gl',
                    'is.gd',
                    'tinyurl.com'
                ];
                dialog(
                    "Post Now browsing to Twitter Settings",
                    { width: 600, height: 700 },

                    section(
                        "User options",
                        "Behavior/keyboard Preference",
                        grid(
                            text("Prefix:", 'defaultTag', "Now browsing: ", { size: 20 }), '\n',
                            checkbox("Use selection quote", 'isSelection', true), '\n',
                            checkbox("remove utm_* parameter", 'removeUtm', false), '\n',
                            checkbox("avoid link to @ and #", 'avoidLinktoMeta', false), '\n',
                            checkbox("avoid link to string like 'example.com'", 'avoidLinkDomainString', false), '\n',
                            checkbox("Post with Ctrl+Enter", 'PostWithCtrl', false), '\n',
                            text("ShortcutKey:", 'ShortCutKey', "CS-Enter", { size: 16 })
                        )
                    ),
                    section(
                        "Short URL options",
                        "select used Short URL service",

                        grid(
                            select("Short URL Services", 'ShortURL', shortURL_opt, "bit.ly"), '\n',
                            text("bit.ly Username:", 'bitlyUserName', "remiko"), '\n',
                            text("bit.ly APIKey :", 'bitlyAPIKey', 'R_fa2240c646c07b2091c6bc6d109089ef', { size: 30 }),
                            '\n',
                            text("goo.gl APIKey :", 'googlAPIKey', '', { size: 30 })
                        )
                    ),
                    section(
                        "OAuth Authorization",
                        "Sign in with Twitter"
                    )
                );
            }
        },
        // options
        {
            saveKey: 'GM_config',
            aftersave: function () {

            },
            afteropen: function () {
                // ショートカットの入力補助
                var iframeDoc = this.frame.contentDocument;
                iframeDoc.getElementById("control_ShortCutKey").addEventListener('keydown', function (evt) {
                    evt.preventDefault();
                    this.value = shortcut.get(evt);
                }, false);
                // OAuth Setting
                if (TWOauth.isAuthorize()) {
                    TWOauth.injectToConfig();
                } else {
                    XHRloading.createText(iframeDoc);
                    TWOauth.getRequestToken(TWOauth.injectToConfig);
                }
            }
        });
    GM_registerMenuCommand('Post Now browsing to Twitter Setting', function () {
        // https://twitter.com/azu_re/statuses/70426009136144384
        Config.open();
    });


    /* config-設定の初期化 */
    var GM_settings = Config.load();
    var defaultTag = GM_settings.defaultTag;// prefix - 何も書かなかった時の接頭辞
    var UseSelection = GM_settings.isSelection;
    var siteAPI = GM_settings.ShortURL;
    const inputFramename = "GM_INPUT_FRAME";
    var message = {
        /*
         必須
         method
         action
         任意
         headers ヘッダーオブジェクト
         noparam trueならばactionのクエリにURLを付けないようにする
         body POSTのdataを設定 $URL$となってる要素はURLに変わる
         response jsonなら内容に従って取り出す
         */
        'goo.gl': {
            method: "POST",
            action: "https://www.googleapis.com/urlshortener/v1/url"
                + ((GM_settings.googlAPIKey !== "") ? "?key=" + GM_settings.googlAPIKey : ""),
            headers: {
                "Content-Type": "application/json"
            },
            noparam: true,
            body: {
                "longUrl": "$URL$"
            },
            response: "id"
        },
        'bit.ly': {
            method: "GET",
            action: "http://api.bit.ly/v3/shorten?&format=txt&login="
                + GM_settings.bitlyUserName + "&apiKey=" + GM_settings.bitlyAPIKey + "&longUrl="
        },
        'j.mp': {
            method: "GET",
            action: "http://api.j.mp/v3/shorten?&format=txt&login="
                + GM_settings.bitlyUserName + "&apiKey=" + GM_settings.bitlyAPIKey + "&longUrl="
        },
        'is.gd': {
            method: "GET",
            action: "http://is.gd/api.php?longurl="
        },
        'tinyurl.com': {
            method: "GET",
            action: "http://tinyurl.com/api-create.php?url="
        }
    };
    // make ShortURL: url
    function MakeShortURL() {
        this.initialize.apply(this, arguments);
    }

    MakeShortURL.prototype = {
        initialize: function (url) {
            this.url = url;
            this.shortAPI = siteAPI;
        },
        // test
        showURL: function () {
            alert(this.url);
        },
        formatParams: function (content) {
            var result;
            if (typeof(content) === "object") {
                result = {};
                for (var key in content) {
                    if (content[key] === "$URL$") {
                        result[key] = this.url;
                    } else {
                        result[key] = content[key];
                    }
                }
                result = JSON.stringify(result);
            } else {
                result = content;
            }
            return result;
        },
        getShortURL: function (callbackFunc) {
            var btnDiv = XPath.first(document, 'id("GM_Now_browsing")');
            var inpuFrame = XPath.first(document, '//iframe[@name="' + inputFramename + '"]');
            if (!btnDiv && !inpuFrame) {
                var mes = message[siteAPI];
                var XHRobj = {};
                XHRobj.method = mes.method;
                XHRobj.url = mes.action + ((mes.noparam) ? "" : encodeURIComponent(this.url));
                mes.headers && (XHRobj.headers = mes.headers);
                mes.body && (XHRobj.data = this.formatParams(mes.body));
                XHRobj.onload = function (res) {
                    if (res.readyState == 4 && (res.status == 200 || res.status == 201)) {
                        clearInterval(timerId);
                        XHRloading.removeDiv();
                        var shortedURL = res.responseText;
                        // 上手く取得できてない場合はkill
                        if (typeof shortedURL === "undefined" || shortedURL === "undefined") {
                            return;
                        }
                        if (mes.response) {
                            var resJSON = JSON.parse(shortedURL);
                            shortedURL = getObjValueFromString(resJSON, mes.response);
                        }
                        callbackFunc(shortedURL);
                    }
                };
                XHRobj.onerror = function (e) {
                    GM_log(e);
                };
                // ローディング表示
                XHRloading.create();
                var GM_xhr = GM_xmlhttpRequest(XHRobj);
                // タイムアウト
                var self = this;
                var timerId = setTimeout((function (arg) {
                    return function () {
                        GM_xhr.abort();
                        var isChanged = self.changeShortAPI();// 短縮URLを変える。
                        XHRloading.removeDiv();
                        if (isChanged) {
                            arg.callee.apply(self, arg);
                        }
                    }
                })(arguments), 7000);
            }
        },
        // siteAPIを切り替えていく
        changeShortAPI: function () {
            message[siteAPI].mark = true;
            for (var i in message) {
                if (message[i] != siteAPI && !message[i].mark) {
                    siteAPI = i;
                    return true;
                }
            }
        }
    }

    /*  ポストメッセージの構造
     Message
     comment
     activity
     quotes
     title
     url
     */
    // post to Twitter : url ,title
    function PostTwitter() {
        this.initialize.apply(this, arguments);
    }

    PostTwitter.prototype = {
        initialize: function (url, title) {
            this.url = url;
            this.title = title;
            this.comment = "";
            this.activity = "";
        },
        make_message: function () {
            if (UseSelection) {
                var sel = window.getSelection();
                var count = sel.rangeCount;
                var r, t;
                if (count > 1) {// 複数の選択範囲→「引用」「引用」"タイトル"
                    var selectionRange = [];
                    for (var i = 0; i < count; i++) {
                        if (sel.getRangeAt(i) != "") {// 空は取り除く
                            selectionRange.push(sel.getRangeAt(i));
                        }
                    }
                    if (selectionRange.length > 1) {
                        r = selectionRange.join('」「')
                    } else {
                        r = selectionRange;
                    }
                    var selection = r.toString().trim();
                    if (selection.length > 1) {
                        t = [' 「', selection, '」 ', ' "', this.title, '" '].join('');
                    } else {
                        t = [' "', this.title, '" '].join('');
                    }
                } else if (count == 1) {// 単一の選択範囲→「引用」"タイトル"
                    var selection = sel.toString().trim();
                    if (selection.length > 1) {
                        t = [' 「', selection, '」 ', ' "', this.title, '" '].join('');
                    } else {
                        t = [' "', this.title, '" '].join('');
                    }
                } else {// 選択範囲なし→"タイトル"
                    t = [' "', this.title, '" '].join('');
                }
            }
            this.activity = escapeHTML(t);
            // 渡すオブジェクト
            var defObj = {
                activity: this.activity,
                url: this.url
            };
            var self = this;
            makeFrame(function gotFrame1(iframe, win, doc) {
                self.doc = doc;
                self.iframe = iframe;
                iframe.style.width = "100%";
                iframe.style.position = "fixed";
                iframe.style.display = "block";
                var inputUI = self.createHTML(defObj);
                self.addCSS(doc);
                // 入力領域を表示
                doc.body.appendChild(inputUI);
                self.addInputEvent();
            }, inputFramename);

        },
        // 入力領域のイベントを追加
        addInputEvent: function () {
            var self = this;
            var doc = self.doc;
            var inputHTML = XPath.first(doc, 'id("GM_Now_Box")');
            var inputFiled = XPath.first(inputHTML, 'id("GM_Now_InputField")');
            var activityFiled = XPath.first(inputHTML, 'id("GM_Now_SubActivity")');
            var counterBox = XPath.first(inputHTML, 'id("GM_Now_SubCounter")');
            var counter = parseInt(counterBox.textContent, 10); // 引用 + タイトル + URLの文字数
            counterBox.textContent = counter + strLen(activityFiled.textContent);// デフォルトの表示
            // bodyにもESCキーが聞くように
            document.addEventListener("keypress", function (e) {
                var esc = (e.keyCode == 27);
                if (esc) {
                    this.removeEventListener("keypress", arguments.callee, false);
                    document.body.removeChild(self.iframe);
                }
            }, false);
            // フォーカスをinputFiledへ移す
            inputFiled.focus();
            inputFiled.addEventListener("keypress", function (evt) {
                var shortcutFlag = false;
                if (GM_settings.PostWithCtrl) {// Enterでポスト
                    var c = (evt.ctrlKey || evt.metaKey);
                    var v = (evt.keyCode == 13);
                    shortcutFlag = c && v;
                } else {
                    shortcutFlag = (evt.keyCode == 13);
                }
                var esc = (evt.keyCode == 27);
                if (shortcutFlag) {
                    this.removeEventListener("keypress", arguments.callee, false);
                    self.comment = inputFiled.value;
                    self.activity = activityFiled.textContent;
                    document.body.removeChild(self.iframe);
                    focusBody();
                    self.arrangeMes();
                } else if (esc) { // Escでキャンセル
                    this.removeEventListener("keypress", arguments.callee, false);
                    document.body.removeChild(self.iframe);
                    focusBody();
                } else if (evt.keyCode == 9) {// TabキーでactivityFiledを有効化して移動
                    evt.preventDefault()
                    activityFiled.setAttribute("contenteditable", "true");
                    activityFiled.focus();
                }
            }, false);
            // contenteditableの日本語バグ?回避  - https://twitter.com/azu_re/statuses/16587183821
            inputFiled.addEventListener("focus", function (e) {
                activityFiled.setAttribute("contenteditable", "false");
            }, false);
            activityFiled.addEventListener("click", function (e) {
                activityFiled.setAttribute("contenteditable", "true");
            }, false);
            // 文字数カウント
            inputFiled.addEventListener("keyup", function (e) {
                counterBox.textContent = counter + strLen(activityFiled.textContent) + strLen(inputFiled.value);
            }, false);
        },
        // プロンプトのHTML生成
        createHTML: function (obj) {
            if (!obj) {
                obj = {};
            }
            var defVal = {
                activity: obj.activity || "",
                url: obj.url || ""
            };
            var counter = strLen(obj.url);

            // バグ - https://twitter.com/azu_re/statuses/16219838145
            var E4Xhtml = [
                '',
                '<div style="display: block;" id="GM_Now_Box" class="GM_Now_ThemeDefault">',
                '    <input type="text" value="" id="GM_Now_InputField" class="GM_Now_ThemeDefault" />',
                '    <div id="GM_Now_Sub">',
                '        <div class="GM_edit_guard">',
                '            <div contenteditable="false" id="GM_Now_SubActivity">' + defVal.activity + '</div>',
                '        </div>',
                '        <div id="GM_Now_SubCounter" style="font-size: 25px;">' + counter + '</div>',
                '        <div id="GM_Now_SubURL">' + defVal.url + '</div>',
                '    </div>',
                '</div>',
                ''
            ].join("\n");
            return e4xToDOM(E4Xhtml);
        },
        addCSS: function (doc) {
            // based on gleebox
            addCSS(doc, GM_getResourceText("css"));
        },
        arrangeMes: function () {
            if (this.comment == null) {
                return;
            }
            if (this.comment == '') {
                this.comment = defaultTag;
            }
            this.activity = preventAutoLink(this.activity);
            this.comment = preventAutoLink(this.comment);
            var allStr = [this.comment, this.activity, this.url].join(' ');
            if (strLen(allStr) > 140) {
                // 現在の全体 - (140 - this.comment)
                var entStrLength = 2;// 削った後に末尾に付ける文字数
                var cutlength = (strLen(allStr) - 140) + entStrLength;
                if (cutlength > 0) {
                    this.activity = this.activity.slice(0, strLen(this.activity) - cutlength);
                    if (UseSelection && cutlength > strLen(this.title)) {
                        // 選択範囲を削る
                        this.activity += '…」';
                    } else {
                        // タイトルを削る
                        this.activity += '…" '
                    }
                    allStr = [this.comment, this.activity, this.url].join('');
                }
            }
            // ポストメッセージの完成
            this.post_message = allStr;
            this.post();
        },
        post: function () {
            var content = {status: this.post_message, source: clientInfo.name};
            TWOauth.postURL('https://api.twitter.com/1.1/statuses/update.json', content, function (error, evt) {
                if (error) {
                    console.log("PNBT post Error : ", error);

                }
            });
        }
    };
    // iframeから元のbodyにフォーカスを戻す
    // bodyに直接フォーカスできないので、適当なボタンを作ってフォーカスさせる。
    function focusBody() {
        var inf = document.createElement("button");
        inf.setAttribute("style", "position:fixed; top:4px; left:4px; width:1px; height:1px; border:none; background-color:#55f; opacity:0;");//-moz-opacityは3.5で廃止
        document.body.appendChild(inf);
        inf.focus();
        document.body.removeChild(inf);
    }

    /*  CSSをcontextに加える
     how to use
     addCSS(document ,
     *{
     font-size:12px;
     background-color:#000;
     }
     ]]></>);
     */
    function addCSS(context, css) {
        if (!context) {
            context = document;
        }
        var sheet = context.createElement('style');
        sheet.type = 'text/css';
        var _root = context.getElementsByTagName('head')[0] || context.documentElement;
        sheet.textContent = css;
        return _root.appendChild(sheet).sheet;

    }

    // フレームパネルの作成
    function makeFrame(callback, name) {
        function testInvasion() {
            iframe.removeEventListener("load", done, true);
            var message = ((new Date) - load.start) + "ms passed, ";
            try { // probe for security violation error, in case mozilla struck a bug
                var url = unsafeWindow.frames[framename].location.href;
                message += url == "about:blank" ? "but we got the right document." : "and we incorrectly loaded " + url;
                done();
            }
            catch (e) {
                document.body.removeChild(iframe);
                makeFrame(callback, name);
            }
        }

        function done() {
            clearTimeout(load.timeout);
            var win = unsafeWindow.frames[framename];
            var doc = iframe.contentWindow.document;
            callback(iframe, win, doc);
        }

        var iframe = document.createElement("iframe");

        var framename = iframe.name =
            typeof name !== "undefined" ? name : ("pane" + (makeFrame.id = (makeFrame.id || 0) - 1));
        iframe.setAttribute("style", "overflow:auto;z-index:2147483647; border:0; margin:0; padding:0;top:82%; bottom:0; left:0;");
        iframe.src = "about:blank";
        iframe.addEventListener("load", done, true);
        var frames = makeFrame.data || {};
        var load = frames[framename] || {
            start: new Date,
            sleepFor: 400
        };
        load.timeout = setTimeout(testInvasion, load.sleepFor);
        load.sleepFor *= 1.5;
        frames[framename] = load;
        makeFrame.data = frames;
        document.body.appendChild(iframe);
    }

    // ローディング■の操作
    var XHRloading = {
        create: function () {
            var btnDiv = XPath.first(document, 'id("GM_Now_browsing")');
            if (!btnDiv) {
                var btn = document.createElement('div');
                btn.setAttribute("style", 'background: rgb(255, 0, 0) none repeat scroll 0% 0%; font-size: 12px; position: fixed;overflow:auto; bottom: 3px; right: 3px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(255, 255, 255); width: 20px; height: 20px; z-index: 2147483647;');
                btn.id = "GM_Now_browsing";
                document.body.appendChild(btn);
            }
        },
        removeDiv: function () {
            var btn = XPath.first(document, 'id("GM_Now_browsing")');
            if (btn) {
                btn.parentNode.removeChild(btn);
            }
        },
        createText: function (_doc) {
            var txt = XPath.first(_doc, 'id("loading_message")');
            if (!txt) {
                var loading = _doc.createElement("p");
                loading.setAttribute("style", [
                    '',
                    'position:fixed;',
                    'right:0;',
                    'top:80%;',
                    'color:#fff;',
                    'background:#000;'
                ].join("\n"));
                loading.innerHTML = "Now Loading...";
                loading.id = "loading_message";
                _doc.body.appendChild(loading);
            }
        },

        removeText: function (_doc) {
            var txt = XPath.first(_doc, 'id("loading_message")');
            if (txt) {
                _doc.body.removeChild(txt);
            }
        }
    }

    // 文字列を元にJSONオブジェクトの値を取り出す
    function getObjValueFromString(obj, str) {
        var req = str.split(".");
        for (var i = 0, len = req.length; i < len; i++) {
            obj = obj[req[i]];
        }
        return obj;
    }

    // E4X to DOM
    function e4xToDOM(html) {
        var range = document.createRange();
        var htmlDOM = range.createContextualFragment(html);
        return htmlDOM;
    }

    // http://liosk.blog103.fc2.com/blog-entry-162.html
    function strLen(str) {
        return twttr.txt.getTweetLength(str);
    }

    // debug関数
    function log(m) {
        if (unsafeWindow.console) {
            unsafeWindow.console.log(m);
        } else {
            console.log(m); //GM_log(m)でも同じ。
        }
    }

    // ショートカットのイベント設定
    shortcut.add(window, GM_settings.ShortCutKey, function (evt) {
        evt.preventDefault();
        launchPNBT();
    });
    GM_registerMenuCommand("Post to Twitter", function () {
        launchPNBT();
    })
    function launchPNBT() {
        if (!TWOauth.isAuthorize()) {
            alert("You must Sign-in with Twitter");
            Config.open();
            return;
        }
        var normalURL = window.location.href;
        var title = (document.title) ? document.title : window.parent.document.title;
        if (/(^http:\/\/reader\.livedoor\.com\/|^http:\/\/fastladder\.com\/reader\/)/.test(normalURL)) {
            var w = unsafeWindow;
            var item = w.get_active_item(true);
            var feed = w.get_active_feed();
            normalURL = item.link;
            title = item.title + " - " + feed.channel.title;
        }
        // utm_*を取り除く
        if (GM_settings.removeUtm) {
            normalURL = normalURL.replace(/([\?\&]utm_(source|medium|campaign|content)=.+)/ig, '');
        }
        // @や#を取り除く
        if (GM_settings.avoidLinktoMeta) {
            title = removeMeta(title);
        }
        // 短縮URLサービスは使わない
        if(siteAPI === 't.co'){
            var twitterNew = new PostTwitter(normalURL, title);
            twitterNew.make_message();
        }else{
            var receivedShortUrl = new MakeShortURL(normalURL);
            receivedShortUrl.getShortURL(function (shortedURL) {
                var twitterNew = new PostTwitter(shortedURL, title);
                twitterNew.make_message();
            });
        }
    }

    // ユーザー名やハッシュタグのリンクをさせないようにゼロ幅文字を挟む
    function removeMeta(str) {
        var reg = {
            'userName': /\B([@＠])([a-zA-Z0-9_]{1,20})\b/g,
            'hashTag': /\B([#＃])([a-zA-Z0-9_]+)/g
        };
        for (var i in reg) {
            str = str.replace(reg[i], "$1‌$2");// $1 ゼロ幅文字 $2
        }
        return str;
    }

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function preventAutoLink(str) {
        // 設定によってはそのまま返す
        if (!GM_settings.avoidLinkDomainString) {
            return str;
        }
        var MAGIC_NUMBER = "0xe38286e381ae";
        var URLReg = /(https?:\/\/[^:/<>&\s]+(?::\d+)?(?:\/[^#\s<>&()"']*(?:#(?:[^\s<>&"'()]+))?)?)|(.)/ig;
        var domainReg = /(?:[a-z][a-z0-9-]*[a-z0-9](\.))+(?:jp|aero|biz|com|coop|info|museum|name|net|org|pro|jobs|travel|arpa|edu|gov|int|mil|nato)/ig;
        var urlStack = [];
        var result = "";
        // http:// なURLを保護
        result = str.replace(URLReg,function (m, url) {
            if (url) {
                m = m.replace(url, MAGIC_NUMBER);
                urlStack.push(url);
            }
            return m;
            // ドメイン文字列を自動リンクされないように回避
        }).replace(domainReg,function (m, domain) {
                if (domain) {
                    m = m.replace(".", "-", "g");
                }
                return m;
                // 保護したURLを戻す
            }).replace(MAGIC_NUMBER, function (m) {
                return urlStack.shift();
            }, "g");
        return result;
    }
})();