// ==UserScript==
// @name        Hatena Notation Assist
// @namespace   http://d.hatena.ne.jp/IkeT/
// @include     http://d.hatena.ne.jp/*/edit*
// @include     http://d.hatena.ne.jp/*/draft*
// @version     0.1
// ==/UserScript==
(function () {

/* ----- Greasemonkey ----- */
var w = unsafeWindow;
var _onload = w.onload;

const KeyEvent = document.createEvent("KeyboardEvent");

/* ----- hatena notation assist parameters ----- */
var keyCode = KeyEvent.DOM_VK_SPACE;
var displayLocation = "center";
var textareaId = "textarea-edit";

/* ----- CodeAssist ----- */
var CodeAssist = function(options){
    this.init(options);
};

CodeAssist.prototype = {
    /* -----initialize----- */
    init: function(options){
        /* initialize options */
        this.shiftKey = options.shiftKey ? options.shiftKey : false;
        this.ctrlKey = options.ctrlKey ? options.ctrlKey : true;
        this.altKey = options.altKey ? options.altKey : false;
        this.keyCode = options.keyCode ? options.keyCode : KeyEvent.DOM_VK_SPACE;
        this.templates = options.templates ? options.templates : [];
        this.width = options.width ? options.width : 250;
        this.height = options.height ? options.height : 250;
        this.displayLocation = /(left|center|right)/.test(options.displayLocation) ? options.displayLocation : "left";
        this.id = options.id;
        this.name = options.name;
        this.trigger = options.trigger;
        this.nameMaxLength = 0;
        
        /* sort templates */
        this.templates.sort(function(a, b){
            if (a.name > b.name)
                return 1;
            else 
                if (a.name < b.name)
                    return -1;
                else 
                    return 0;
        });
        
        /* search name max length */
        for (var i = 0; i < this.templates.length; i++) {
            var template = this.templates[i];
            var name = template.name;
            if (name.length > this.nameMaxLength)
                this.nameMaxLength = name.length;
        }
        this.nameMaxLength += 1;
        
        /* register events */
        this.getTextArea().addEventListener("keydown", this.createListOpenListener(), false);
    },

    /* -----event listener----- */
    /* textarea:keydown */
    createListOpenListener: function(){
        var self = this;
        return function(evt){
            if (evt) {
                if (self.shiftKey && !evt.shiftKey)
                    return;
                if (self.altKey && !evt.altKey)
                    return;
                if (self.ctrlKey && !evt.ctrlKey)
                    return;
                
                if (self.keyCode && evt.keyCode == self.keyCode) {
                    evt.preventDefault();
                    self.open.call(self, evt);
                }
            }
        }
    },
    /* select:keypress */
    createListSelectionListener: function(){
        var self = this;
        return function(evt){
            if (evt)
                switch (evt.keyCode) {
                    case KeyEvent.DOM_VK_ESCAPE:
                        evt.preventDefault();
                        self.hide.call(self, evt);
                        break;
                    case KeyEvent.DOM_VK_RETURN:
                        evt.preventDefault();
                        self.assist.call(self, evt);
                        self.hide.call(self, evt);
                        break;
                    default:
                        if(evt.charCode && evt.charCode != KeyEvent.DOM_VK_SPACE)
                            self.search.call(self, evt);
                }
        }
    },
    /* select:blur */
    createLostFocusListener: function(){
        var self = this;
        return function(evt){
            self.hide.call(self, evt);
        }
    },

    /* -----event processing----- */
    open: function(evt){
        var textarea = evt.currentTarget;
        var term = this.getSearchTerm(textarea);
        if (!this.trigger || this.trigger.test(term)) {
            if (this.trigger)
                term = this.trigger.exec(term)[1];
            /* shadow box */
            var shadowBox = this.getShadowBox();
            shadowBox.style.display = "block";
            /* selection box */
            var selectionBox = this.getSelectionBox();
            selectionBox.style.display = "block";
            /* selection list */
            var list = this.getSelectionList();
            list.focus();
            this.setOptionValue(list, term);
        }
    },
    hide: function(evt){
        var shadowBox = this.getShadowBox();
        shadowBox.style.display = "none";
        var selectionBox = this.getSelectionBox();
        selectionBox.style.display = "none";
        this.getTextArea().focus();
    },
    search: function(evt){
        var charCode = evt.charCode;
        if (charCode) {
            var list = this.getSelectionList();
            var c = String.fromCharCode(charCode);
            this.setOptionValue(list, c);
        }
    },
    assist: function(evt){
        var textarea = this.getTextArea();
        var list = this.getSelectionList();
        if(list.selectedIndex >= 0){
            var term = this.getSearchTerm(textarea);
            if (this.trigger)
                term = this.trigger.exec(term)[1];
            this.assistCode(textarea, list, term);
        }
    },
    assistCode: function(textarea, list, term){
        var text = textarea.value;
        var result = "";
        var s = textarea.selectionStart;
        var e = textarea.selectionEnd;
        var template = this.templates[list.selectedIndex];
        var selectionValue = template.template;
        var assistCodes = selectionValue.split(/\{CURSOR}/);
        var selectedText = text.substring(s, e);

        /* before assist code */
        result += text.substring(0, s - term.length);

        /* assist code */
        if (selectedText && template.multi) {
            var lines = selectedText.split(/\n/);
            for (var i = 0; i < lines.length; i++) {
                if (i == lines.length - 1 && !lines[i])
                    continue;
                if (assistCodes[0])
                    result += assistCodes[0];
                result += lines[i];
                if (assistCodes[1])
                    result += assistCodes[1];
                result += "\n";
            }
        }
        else {
            if (assistCodes[0])
                result += assistCodes[0];
            result += selectedText;
            if (assistCodes[1])
                result += assistCodes[1];
        }

        /* after assist code */
        result += text.substring(e);
        
        /* cursor setting */
        var top = textarea.scrollTop;
        textarea.value = result;
        var pos = s + assistCodes[0].length - term.length;
        textarea.scrollTop = top;
        textarea.setSelectionRange(pos, pos);
    },
    getSearchTerm: function(textarea){
        if (textarea) {
            var text = textarea.value;
            var cbuf = "";
            var s = textarea.selectionStart;
            var e = textarea.selectionEnd;
            if (s == e)
                for (var i = s - 1; i >= 0; i--) {
                    var c = text.charAt(i);
                    if (c == ' ' || c == '\n')
                        break;
                    else 
                        cbuf = c + cbuf;
                }
            return cbuf;
        }
    },

    /* -----get or create elements----- */
    getTextArea: function(){
        return document.getElementById(this.id);
    },
    getSelectionBox: function(){
        var name = this.name + ".selectionBox";
        var div = document.getElementById(name);
        if (!div) {
            div = document.createElement("div");
            div.id = name;
            div.setAttribute("style", "border:2px black solid;position:absolute;z-index:100;display:none");
            var select = this.getSelectionList();
            div.appendChild(select);
            document.body.appendChild(div);
            this.setPosition(div, 0);
        }
        return div;
    },
    getShadowBox: function(){
        var name = this.name + ".shadowBox";
        var div = document.getElementById(name);
        if (!div) {
            div = document.createElement("div");
            div.id = name;
            div.setAttribute("style", "-moz-opacity:0.2;background-color:black;position:absolute;z-index:90;display:none");
            div.style.width = this.width + 4 + "px";
            div.style.height = this.height + 4 + "px";
            document.body.appendChild(div);
            this.setPosition(div, 4);
        }
        return div;
    },
    getSelectionList: function() {
        var name = this.name + ".selectionList"; 
        var select = document.getElementById(name);
        if(!select){
            select = document.createElement("select");
            select.id = name;
            select.size = 2;
            select.setAttribute("style", "background-color:#FFFFBF;overflow-y:scroll;");
            select.style.width = this.width + "px";
            select.style.height = this.height + "px";
            for (var i = 0; i < this.templates.length; i++) {
                var template = this.templates[i];
                var element = document.createElement("option");
                element.value = template.template;
                var code = document.createElement("code");
                code.setAttribute("style", "white-space:pre");
                var text = CodeAssist.rightPad(template.name, this.nameMaxLength);
                code.appendChild(document.createTextNode(text));
                var strong = document.createElement("strong");
                //strong.setAttribute("style", "color:#555555");
                strong.appendChild(document.createTextNode(template.description));
                element.appendChild(code);
                element.appendChild(strong);
                select.appendChild(element);
            }
            select.addEventListener("keypress", this.createListSelectionListener(), false);
            select.addEventListener("blur", this.createLostFocusListener(), false);

        }
        return select;
    },
    setOptionValue: function(list, term){
        if (!term) {
            list.selectedIndex = -1;
            return;
        }
        for (var i = 0; i < this.templates.length; i++) {
            var template = this.templates[i];
            if (template.name.indexOf(term) == 0) {
                   list.selectedIndex = i;
                return;
            }
        }
        list.selectedIndex = -1;
    },
    
    /* -----positioning----- */
    setPosition: function(elm, offset){
        /* display position setting */
        var textarea = this.getTextArea();
        var target = this.getOffset(textarea);
        elm.style.top = target.top + offset + "px";
        var left;
        if (this.displayLocation == "right")
            left = target.left + textarea.offsetWidth - this.width;
        else 
            if (this.displayLocation == "center")
                left = target.left + textarea.offsetWidth / 2 - this.width / 2;
            else 
                left = target.left;
        
        elm.style.left = left + offset + "px";
    },
    getOffset: function getOffset(elm) {
        var parent = elm.offsetParent;
        var offset = new Array();
        offset.left = elm.offsetLeft;
        offset.top = elm.offsetTop;
        if(parent) {
            var parentOffset = getOffset(parent);
             offset.left += parentOffset.left;
            offset.top += parentOffset.top;
        }
        return offset;
    }
};

/* utility methods */
CodeAssist.attach = function(options){
    return new CodeAssist(options);
};
CodeAssist.escapeRegexpPattern = function(src){
    return src.replace(/[.|()[\\^{+$*?]/g, "\\$&");
};
CodeAssist.rightPad = function(src, len){
    if (src && src.length < len)
        while (src.length < len)
            src += " ";
    return src;
};

/* attach CodeAssist to hatena blog editor */
w.onload = function(){
    if(_onload)
        _onload();

    CodeAssist.attach({
        name: "http",
        trigger: /^(?!\S+:image:)\[?(?:http|https):\/\/\S*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 320,
        height: 160,
        templates: [
            {name: "title", template: "title", description: "ページタイトル表示"},
            {name: "title=", template: "title=", description: "タイトル指定"},
            {name: "image", template: "image", description: "画像表示"},
            {name: "image=", template: "image=", description: "画像URL指定"},
            {name: "bookmark", template: "bookmark", description: "ブックマーク数表示"},
            {name: "barcode", template: "barcode", description: "二次元バーコード(QRコード)表示"},
            {name: "sound", template: "sound", description: "音声再生プレーヤー表示"},
            {name: "movie", template: "movie", description: "動画再生プレーヤー表示"},
        ]
    });

    CodeAssist.attach({
        name: "image",
        trigger: /^\S+:image:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 200,
        height: 122,
        templates: [
            {name: "large", template: "large", description: "ラージサイズ"},
            {name: "small", template: "small", description: "スモールサイズ"},
            {name: "h*", template: "h", description: "高さ指定（ピクセル）"},
            {name: "w*", template: "w", description: "幅指定（ピクセル）"},
            {name: "left", template: "left", description: "左寄せ"},
            {name: "right", template: "right", description: "右寄せ"},
        ]
    });

    CodeAssist.attach({
        name: "google",
        trigger: /^(?!\S+:image:)\[?google:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 220,
        height: 42,
        templates: [
            {name: "image:", template: "image:", description: "Googleイメージ検索"},
            {name: "news:", template: "news:", description: "Googleニュース検索"},
        ]
    });

    CodeAssist.attach({
        name: "map",
        trigger: /^\[?map(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 240,
        height: 102,
        templates: [
            {name: "map", template: "map", description: "地図"},
            {name: "satellite", template: "satellite", description: "航空写真"},
            {name: "hybrid", template: "hybrid", description: "地図＋航空写真"},
            {name: "h*", template: "h", description: "高さ指定（ピクセル）"},
            {name: "w*", template: "w", description: "幅指定（ピクセル）"},
        ]
    });
    
    CodeAssist.attach({
        name: "id",
        trigger: /^(?!\S+:image:)\[?id(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 280,
        height: 83,
        templates: [
            {name: "archive", template: "archive", description: "記事一覧ページへのリンク"},
            {name: "about", template: "about", description: "プロフィールページへのリンク"},
            {name: "image", template: "image", description: "プロフィール画像のみ表示"},
            {name: "detail", template: "detail", description: "リンク＋プロフィール画像表示"},
        ]
    });
    
    CodeAssist.attach({
        name: "question",
        trigger: /^(?!\S+:image:)\[?question(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 355,
        height: 102,
        templates: [
            {name: "title", template: "title", description: "ページタイトル表示"},
            {name: "title=", template: "title=", description: "タイトル指定"},
            {name: "q*", template: "q", description: "設問へのリンク（設問番号）"},
            {name: "image", template: "image", description: "投票結果（経過）の棒グラフ・円グラフ表示"},
            {name: "detail", template: "detail", description: "投票結果（経過）へのリンク"},
        ]
    });
    
    CodeAssist.attach({
        name: "search",
        trigger: /^\[?search:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 420,
        height: 122,
        templates: [
            {name: "keyword:", template: "keyword:", description: "はてなキーワード"},
            {name: "web:", template: "web:", description: "Googleによるウェブページ全体"},
            {name: "question:", template: "question:", description: "人力検索はてなの過去の質問"},
            {name: "asin:", template: "asin:", description: "Amazon.co.jpの取り扱い商品"},
            {name: "rakuten:", template: "rakuten:", description: "楽天市場の取り扱い商品"},
            {name: "video:", template: "video:", description: "YouTube・Google Video・AmebaVisionの動画"},
        ]
    });
    
    CodeAssist.attach({
        name: "bookmark",
        trigger: /^\[?b(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 270,
        height: 102,
        templates: [
            {name: "id:", template: "id:", description: "ユーザーページへのリンク"},
            {name: "favorite", template: "favorite", description: "お気に入りページへのリンク"},
            {name: "asin", template: "asin", description: "コレクションページへのリンク"},
            {name: "t:", template: "t:", description: "タグページへのリンク"},
            {name: "keyword:", template: "keyword:", description: "キーワードページへのリンク"},
        ]
    });
    
    CodeAssist.attach({
        name: "fotolife",
        trigger: /^(?!\S+:image:)\[?f(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 270,
        height: 82,
        templates: [
            {name: "id:", template: "id:", description: "ユーザーページへのリンク"},
            {name: "favorite", template: "favorite", description: "お気に入りページへのリンク"},
            {name: "t:", template: "t:", description: "タグページへのリンク"},
            {name: "image", template: "image", description: "画像表示"},
        ]
    });

    CodeAssist.attach({
        name: "group",
        trigger: /^\[?g(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 270,
        height: 62,
        templates: [
            {name: "id:", template: "id:", description: "ユーザーページへのリンク"},
            {name: "archive", template: "archive", description: "記事一覧ページへのリンク"},
            {name: "keyword:", template: "keyword:", description: "キーワードページへのリンク"},
        ]
    });

    CodeAssist.attach({
        name: "graph",
        trigger: /^(?!\S+:image:)\[?graph(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 230,
        height: 62,
        templates: [
            {name: "id", template: "id:", description: "ユーザーページへのリンク"},
            {name: "t", template: "t:", description: "タグページへのリンク"},
            {name: "image", template: "image", description: "画像表示"},
        ]
    });

    CodeAssist.attach({
        name: "keyword",
        trigger: /^(?!\S+:map:)(?!\S+:graph:)\[?keyword(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 255,
        height: 42,
        templates: [
            {name: "map", template: "map", description: "地図情報表示"},
            {name: "graph", template: "graph", description: "キーワードの統計グラフ表示"},
        ]
    });

    CodeAssist.attach({
        name: "keyword-map",
        trigger: /^(?!\[?map:)\S+:map:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 230,
        height: 42,
        templates: [
            {name: "satellite", template: "satellite", description: "航空写真"},
            {name: "hybrid", template: "hybrid", description: "地図＋航空写真"},
        ]
    });
    
    CodeAssist.attach({
        name: "keyword-graph",
        trigger: /^(?!\[?graph:)\S+:graph(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 270,
        height: 142,
        templates: [
            {name: "refcount", template: "refcount", description: "「言及数」を参照"},
            {name: "refrank", template: "refrank", description: "「言及ランク」を参照"},
            {name: "accessrank", template: "accessrank", description: "「アクセスランク」を参照"},
            {name: "*d", template: "{CURSOR}d", description: "グラフの期間指定（日）"},
            {name: "*w", template: "{CURSOR}w", description: "グラフの期間指定（週）"},
            {name: "*m", template: "{CURSOR}m", description: "グラフの期間指定（月）"},
            {name: "*y", template: "{CURSOR}y", description: "グラフの期間指定（年）"},
        ]
    });

    CodeAssist.attach({
        name: "isbn/asin/rakuten",
        trigger: /^(?!\S+:image:)\[?(?:asin|ISBN|rakuten)(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 260,
        height: 62,
        templates: [
            {name: "title", template: "title", description: "商品名表示"},
            {name: "image", template: "image", description: "商品画像表示"},
            {name: "detail", template: "detail", description: "商品画像＋商品情報表示"},
        ]
    });

    CodeAssist.attach({
        name: "jan/ean",
        trigger: /^(?!\S+:image:)\[?(?:jan|ean)(?::\w+)*:(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 200,
        height: 82,
        templates: [
            {name: "title", template: "title", description: "商品名表示"},
            {name: "title=", template: "title=", description: "商品名指定"},
            {name: "image", template: "image", description: "商品画像表示"},
            {name: "barcode", template: "barcode", description: "バーコード表示"},
        ]
    });

    CodeAssist.attach({
        name: "main",
        trigger: /^(?!>\|)(?!\[?(?:http|https):)(?!\[?google:)(?!\[?map:)(?!\[?id:)(?!\[?b:)(?!\[?f:)(?!\[?g:)(?!\[?question:)(?!\[?graph:)(?!\[?keyword:)(?!\[?search:)(?!\[?(?:asin|ISBN|rakuten):)(?!\[?(?:jan|ean):)(?!\S+:image:)(?!\S+:map:)(?!\S+:graph:)(.*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 320,
        height: 250,
        templates: [
            {name: "*", template: "*", description: "見出し記法"},
            {name: "*t*", template: "*t*", description: "時刻付き見出し記法"},
            {name: "*name*", template: "*name*", description: "name属性付き見出し記法"},
            {name: "*[]", template: "*[{CURSOR}]", description: "カテゴリー記法"},
            {name: "**", template: "**", description: "小見出し記法"},
            {name: "***", template: "***", description: "小々見出し記法"},
            {multi:true, name: "-", template: "-", description: "リスト記法"},
            {multi:true, name: "--", template: "--", description: "リスト記法"},
            {multi:true, name: "+", template: "+", description: "数字付きリスト記法"},
            {multi:true, name: "++", template: "++", description: "数字付きリスト記法"},
            {name: "::", template: ":{CURSOR}:", description: "定義リスト記法"},
            {name: "|  |", template: "| {CURSOR} |", description: "表組み記法"},
            {name: "|* |", template: "|*{CURSOR} |", description: "表組み記法"},
            {name: ">>", template: ">>\n{CURSOR}\n<<", description: "引用記法"},
            {name: ">{url}>", template: ">{CURSOR}>\n\n<<", description: "引用記法"},
            {name: ">|", template: ">|\n{CURSOR}\n|<", description: "pre記法"},
            {name: ">||", template: ">||\n{CURSOR}\n||<", description: "スーパーpre記法"},
            {name: ">|{type}|", template: ">|{CURSOR}|\n\n||<", description: "スーパーpre記法"},
            {name: ">|aa|", template: ">|aa|\n{CURSOR}\n||<", description: "aa記法"},
            {name: "((", template: "(({CURSOR}))", description: "脚注記法"},
            {name: "====", template: "====", description: "続きを読む記法"},
            {name: "=====", template: "=====", description: "スーパー続きを読む記法"},
            {name: "\\n\\n", template: "\n\n{CURSOR}", description: "改行記法"},
            {name: "><", template: ">\n{CURSOR}\n<", description: "pタグ停止記法"},
            {name: "tex:", template: "[tex:{CURSOR}]", description: "tex記法"},
            {name: "uke:", template: "[uke:{CURSOR}]", description: "ウクレレ記法"},
            {name: "[]", template: "[{CURSOR}]", description: "角カッコ"},
            {name: "ftp:", template: "[ftp://{CURSOR}]", description: "ftp記法"},
            {name: "http:", template: "[http://{CURSOR}]", description: "http記法"},
            {name: "https:", template: "[https://{CURSOR}]", description: "https記法"},
            {name: "mailto:", template: "[mailto:{CURSOR}]", description: "mailto記法"},
            {name: "niconico:", template: "[niconico:sm{CURSOR}]", description: "niconico記法"},
            {name: "google:", template: "[google:{CURSOR}]", description: "google記法"},
            {name: "map:x*y*", template: "[map:{CURSOR}]", description: "map記法（x経度y緯度）"},
            {name: "amazon:", template: "[amazon:{CURSOR}]", description: "amazon記法"},
            {name: "wikipedia:", template: "[wikipedia:{CURSOR}]", description: "wikipedia記法"},
            {name: "[][]", template: "[]{CURSOR}[]", description: "自動リンク停止記法"},
            {name: "id:", template: "[id:{CURSOR}]", description: "id記法"},
            {name: "question:", template: "[question:{CURSOR}]", description: "question記法"},
            {name: "search:", template: "[search:{CURSOR}]", description: "search記法"},
            {name: "a:id:", template: "[a:id:{CURSOR}]", description: "antenna記法"},
            {name: "b:", template: "[b:{CURSOR}]", description: "bookmark記法"},
            {name: "b:id:", template: "[b:id:{CURSOR}]", description: "bookmark記法"},
            {name: "d:id:", template: "[d:id:{CURSOR}]", description: "diary記法"},
            {name: "d:keyword:", template: "[d:keyword:{CURSOR}]", description: "diary記法"},
            {name: "f:id:", template: "[f:id:{CURSOR}]", description: "fotolife記法"},
            {name: "f:t:", template: "[f:t:{CURSOR}]", description: "fotolife記法"},
            {name: "g:", template: "[g:{CURSOR}]", description: "group記法"},
            {name: "h:keyword:", template: "[h:keyword:{CURSOR}]", description: "haiku記法"},
            {name: "h:id:", template: "[h:id:{CURSOR}]", description: "haiku記法"},
            {name: "idea:", template: "[idea:{CURSOR}]", description: "idea記法"},
            {name: "idea:title", template: "[idea:{CURSOR}:title]", description: "idea記法"},
            {name: "i:id:", template: "[i:id:{CURSOR}]", description: "idea記法"},
            {name: "i:t:", template: "[i:t:{CURSOR}]", description: "idea記法"},
            {name: "r:id:", template: "[r:id:{CURSOR}]", description: "rss記法"},
            {name: "graph:id:", template: "[graph:id:{CURSOR}]", description: "graph記法"},
            {name: "graph:t:", template: "[graph:t:{CURSOR}]", description: "graph記法"},
            {name: "[[", template: "[[{CURSOR}]]", description: "keyword記法"},
            {name: "keyword:", template: "[keyword:{CURSOR}]", description: "keyword記法"},
            {name: "asin:", template: "[asin:{CURSOR}]", description: "isbn/asin記法"},
            {name: "ISBN:", template: "[ISBN:{CURSOR}]", description: "isbn/asin記法"},
            {name: "rakuten:", template: "[rakuten:{CURSOR}]", description: "rakuten記法"},
            {name: "jan:", template: "[jan:{CURSOR}]", description: "jan/ean記法"},
            {name: "ean:", template: "[ean:{CURSOR}]", description: "jan/ean記法"},
            {name: "<!--", template: "<!--\n{CURSOR}\n-->", description: "下書き記法"},
            {name: "<ins>", template: "<ins>{CURSOR}</ins>", description: "修正時刻保存機能"},
            {name: "<del>", template: "<del>{CURSOR}</del>", description: "修正時刻保存機能"},
       ]
    
    });

    CodeAssist.attach({
        name: "language",
        trigger: /^>\|(\w*)$/,
        keyCode: keyCode,
        id: textareaId,
        displayLocation: displayLocation,
        width: 130,
        height: 250,
        templates: [
            {name: "a2ps", template: "a2ps", description: ""},
            {name: "a65", template: "a65", description: ""},
            {name: "aap", template: "aap", description: ""},
            {name: "abap", template: "abap", description: ""},
            {name: "abaqus", template: "abaqus", description: ""},
            {name: "abc", template: "abc", description: ""},
            {name: "abel", template: "abel", description: ""},
            {name: "acedb", template: "acedb", description: ""},
            {name: "ada", template: "ada", description: ""},
            {name: "aflex", template: "aflex", description: ""},
            {name: "ahdl", template: "ahdl", description: ""},
            {name: "alsaconf", template: "alsaconf", description: ""},
            {name: "amiga", template: "amiga", description: ""},
            {name: "aml", template: "aml", description: ""},
            {name: "ampl", template: "ampl", description: ""},
            {name: "ant", template: "ant", description: ""},
            {name: "antlr", template: "antlr", description: ""},
            {name: "apache", template: "apache", description: ""},
            {name: "apachestyle", template: "apachestyle", description: ""},
            {name: "arch", template: "arch", description: ""},
            {name: "art", template: "art", description: ""},
            {name: "asm", template: "asm", description: ""},
            {name: "asm68k", template: "asm68k", description: ""},
            {name: "asmh8300", template: "asmh8300", description: ""},
            {name: "asn", template: "asn", description: ""},
            {name: "aspperl", template: "aspperl", description: ""},
            {name: "aspvbs", template: "aspvbs", description: ""},
            {name: "asterisk", template: "asterisk", description: ""},
            {name: "asteriskvm", template: "asteriskvm", description: ""},
            {name: "atlas", template: "atlas", description: ""},
            {name: "automake", template: "automake", description: ""},
            {name: "ave", template: "ave", description: ""},
            {name: "awk", template: "awk", description: ""},
            {name: "ayacc", template: "ayacc", description: ""},
            {name: "b", template: "b", description: ""},
            {name: "baan", template: "baan", description: ""},
            {name: "basic", template: "basic", description: ""},
            {name: "bc", template: "bc", description: ""},
            {name: "bdf", template: "bdf", description: ""},
            {name: "bib", template: "bib", description: ""},
            {name: "bindzone", template: "bindzone", description: ""},
            {name: "blank", template: "blank", description: ""},
            {name: "bst", template: "bst", description: ""},
            {name: "btm", template: "btm", description: ""},
            {name: "c", template: "c", description: ""},
            {name: "calendar", template: "calendar", description: ""},
            {name: "catalog", template: "catalog", description: ""},
            {name: "cdl", template: "cdl", description: ""},
            {name: "cf", template: "cf", description: ""},
            {name: "cfg", template: "cfg", description: ""},
            {name: "ch", template: "ch", description: ""},
            {name: "change", template: "change", description: ""},
            {name: "changelog", template: "changelog", description: ""},
            {name: "chaskell", template: "chaskell", description: ""},
            {name: "cheetah", template: "cheetah", description: ""},
            {name: "chill", template: "chill", description: ""},
            {name: "chordpro", template: "chordpro", description: ""},
            {name: "cl", template: "cl", description: ""},
            {name: "clean", template: "clean", description: ""},
            {name: "clipper", template: "clipper", description: ""},
            {name: "cmake", template: "cmake", description: ""},
            {name: "cobol", template: "cobol", description: ""},
            {name: "colortest", template: "colortest", description: ""},
            {name: "conf", template: "conf", description: ""},
            {name: "config", template: "config", description: ""},
            {name: "context", template: "context", description: ""},
            {name: "cpp", template: "cpp", description: ""},
            {name: "crm", template: "crm", description: ""},
            {name: "crontab", template: "crontab", description: ""},
            {name: "cs", template: "cs", description: ""},
            {name: "csc", template: "csc", description: ""},
            {name: "csh", template: "csh", description: ""},
            {name: "csp", template: "csp", description: ""},
            {name: "css", template: "css", description: ""},
            {name: "cterm", template: "cterm", description: ""},
            {name: "ctrlh", template: "ctrlh", description: ""},
            {name: "cupl", template: "cupl", description: ""},
            {name: "cuplsim", template: "cuplsim", description: ""},
            {name: "cvs", template: "cvs", description: ""},
            {name: "cvsrc", template: "cvsrc", description: ""},
            {name: "cweb", template: "cweb", description: ""},
            {name: "cynlib", template: "cynlib", description: ""},
            {name: "cynpp", template: "cynpp", description: ""},
            {name: "d", template: "d", description: ""},
            {name: "dcd", template: "dcd", description: ""},
            {name: "dcl", template: "dcl", description: ""},
            {name: "debchangelog", template: "debchangelog", description: ""},
            {name: "debcontrol", template: "debcontrol", description: ""},
            {name: "debsources", template: "debsources", description: ""},
            {name: "def", template: "def", description: ""},
            {name: "desc", template: "desc", description: ""},
            {name: "desktop", template: "desktop", description: ""},
            {name: "dictconf", template: "dictconf", description: ""},
            {name: "dictdconf", template: "dictdconf", description: ""},
            {name: "diff", template: "diff", description: ""},
            {name: "dircolors", template: "dircolors", description: ""},
            {name: "diva", template: "diva", description: ""},
            {name: "django", template: "django", description: ""},
            {name: "dns", template: "dns", description: ""},
            {name: "docbk", template: "docbk", description: ""},
            {name: "docbksgml", template: "docbksgml", description: ""},
            {name: "docbkxml", template: "docbkxml", description: ""},
            {name: "dosbatch", template: "dosbatch", description: ""},
            {name: "dosini", template: "dosini", description: ""},
            {name: "dot", template: "dot", description: ""},
            {name: "doxygen", template: "doxygen", description: ""},
            {name: "dracula", template: "dracula", description: ""},
            {name: "dsl", template: "dsl", description: ""},
            {name: "dtd", template: "dtd", description: ""},
            {name: "dtml", template: "dtml", description: ""},
            {name: "dylan", template: "dylan", description: ""},
            {name: "dylanintr", template: "dylanintr", description: ""},
            {name: "dylanlid", template: "dylanlid", description: ""},
            {name: "ecd", template: "ecd", description: ""},
            {name: "edif", template: "edif", description: ""},
            {name: "eiffel", template: "eiffel", description: ""},
            {name: "elf", template: "elf", description: ""},
            {name: "elinks", template: "elinks", description: ""},
            {name: "elmfilt", template: "elmfilt", description: ""},
            {name: "erlang", template: "erlang", description: ""},
            {name: "eruby", template: "eruby", description: ""},
            {name: "esmtprc", template: "esmtprc", description: ""},
            {name: "esqlc", template: "esqlc", description: ""},
            {name: "esterel", template: "esterel", description: ""},
            {name: "eterm", template: "eterm", description: ""},
            {name: "eviews", template: "eviews", description: ""},
            {name: "exim", template: "exim", description: ""},
            {name: "expect", template: "expect", description: ""},
            {name: "exports", template: "exports", description: ""},
            {name: "fasm", template: "fasm", description: ""},
            {name: "fdcc", template: "fdcc", description: ""},
            {name: "fetchmail", template: "fetchmail", description: ""},
            {name: "fgl", template: "fgl", description: ""},
            {name: "flexwiki", template: "flexwiki", description: ""},
            {name: "focexec", template: "focexec", description: ""},
            {name: "form", template: "form", description: ""},
            {name: "forth", template: "forth", description: ""},
            {name: "fortran", template: "fortran", description: ""},
            {name: "foxpro", template: "foxpro", description: ""},
            {name: "fstab", template: "fstab", description: ""},
            {name: "fvwm", template: "fvwm", description: ""},
            {name: "fvwm2m4", template: "fvwm2m4", description: ""},
            {name: "gdb", template: "gdb", description: ""},
            {name: "gdmo", template: "gdmo", description: ""},
            {name: "gedcom", template: "gedcom", description: ""},
            {name: "gkrellmrc", template: "gkrellmrc", description: ""},
            {name: "gnuplot", template: "gnuplot", description: ""},
            {name: "gp", template: "gp", description: ""},
            {name: "gpg", template: "gpg", description: ""},
            {name: "grads", template: "grads", description: ""},
            {name: "gretl", template: "gretl", description: ""},
            {name: "groff", template: "groff", description: ""},
            {name: "groovy", template: "groovy", description: ""},
            {name: "group", template: "group", description: ""},
            {name: "grub", template: "grub", description: ""},
            {name: "gsp", template: "gsp", description: ""},
            {name: "gtkrc", template: "gtkrc", description: ""},
            {name: "haskell", template: "haskell", description: ""},
            {name: "hb", template: "hb", description: ""},
            {name: "help", template: "help", description: ""},
            {name: "hercules", template: "hercules", description: ""},
            {name: "hex", template: "hex", description: ""},
            {name: "hitest", template: "hitest", description: ""},
            {name: "hog", template: "hog", description: ""},
            {name: "html", template: "html", description: ""},
            {name: "htmlcheetah", template: "htmlcheetah", description: ""},
            {name: "htmldjango", template: "htmldjango", description: ""},
            {name: "htmlm4", template: "htmlm4", description: ""},
            {name: "htmlos", template: "htmlos", description: ""},
            {name: "ia64", template: "ia64", description: ""},
            {name: "icemenu", template: "icemenu", description: ""},
            {name: "icon", template: "icon", description: ""},
            {name: "idl", template: "idl", description: ""},
            {name: "idlang", template: "idlang", description: ""},
            {name: "indent", template: "indent", description: ""},
            {name: "inform", template: "inform", description: ""},
            {name: "initex", template: "initex", description: ""},
            {name: "inittab", template: "inittab", description: ""},
            {name: "ipfilter", template: "ipfilter", description: ""},
            {name: "ishd", template: "ishd", description: ""},
            {name: "iss", template: "iss", description: ""},
            {name: "ist", template: "ist", description: ""},
            {name: "jal", template: "jal", description: ""},
            {name: "jam", template: "jam", description: ""},
            {name: "jargon", template: "jargon", description: ""},
            {name: "java", template: "java", description: ""},
            {name: "javacc", template: "javacc", description: ""},
            {name: "javascript", template: "javascript", description: ""},
            {name: "jess", template: "jess", description: ""},
            {name: "jgraph", template: "jgraph", description: ""},
            {name: "jproperties", template: "jproperties", description: ""},
            {name: "jsp", template: "jsp", description: ""},
            {name: "kconfig", template: "kconfig", description: ""},
            {name: "kix", template: "kix", description: ""},
            {name: "kscript", template: "kscript", description: ""},
            {name: "kwt", template: "kwt", description: ""},
            {name: "lace", template: "lace", description: ""},
            {name: "latte", template: "latte", description: ""},
            {name: "ld", template: "ld", description: ""},
            {name: "ldif", template: "ldif", description: ""},
            {name: "lex", template: "lex", description: ""},
            {name: "lftp", template: "lftp", description: ""},
            {name: "lhaskell", template: "lhaskell", description: ""},
            {name: "libao", template: "libao", description: ""},
            {name: "lifelines", template: "lifelines", description: ""},
            {name: "lilo", template: "lilo", description: ""},
            {name: "limits", template: "limits", description: ""},
            {name: "lisp", template: "lisp", description: ""},
            {name: "lite", template: "lite", description: ""},
            {name: "loginaccess", template: "loginaccess", description: ""},
            {name: "logindefs", template: "logindefs", description: ""},
            {name: "logtalk", template: "logtalk", description: ""},
            {name: "lotos", template: "lotos", description: ""},
            {name: "lout", template: "lout", description: ""},
            {name: "lpc", template: "lpc", description: ""},
            {name: "lprolog", template: "lprolog", description: ""},
            {name: "lscript", template: "lscript", description: ""},
            {name: "lss", template: "lss", description: ""},
            {name: "lua", template: "lua", description: ""},
            {name: "lynx", template: "lynx", description: ""},
            {name: "m4", template: "m4", description: ""},
            {name: "mail", template: "mail", description: ""},
            {name: "mailaliases", template: "mailaliases", description: ""},
            {name: "mailcap", template: "mailcap", description: ""},
            {name: "make", template: "make", description: ""},
            {name: "man", template: "man", description: ""},
            {name: "manconf", template: "manconf", description: ""},
            {name: "manual", template: "manual", description: ""},
            {name: "maple", template: "maple", description: ""},
            {name: "masm", template: "masm", description: ""},
            {name: "mason", template: "mason", description: ""},
            {name: "master", template: "master", description: ""},
            {name: "matlab", template: "matlab", description: ""},
            {name: "maxima", template: "maxima", description: ""},
            {name: "mel", template: "mel", description: ""},
            {name: "mf", template: "mf", description: ""},
            {name: "mgl", template: "mgl", description: ""},
            {name: "mgp", template: "mgp", description: ""},
            {name: "mib", template: "mib", description: ""},
            {name: "mma", template: "mma", description: ""},
            {name: "mmix", template: "mmix", description: ""},
            {name: "modconf", template: "modconf", description: ""},
            {name: "model", template: "model", description: ""},
            {name: "modsim3", template: "modsim3", description: ""},
            {name: "modula2", template: "modula2", description: ""},
            {name: "modula3", template: "modula3", description: ""},
            {name: "monk", template: "monk", description: ""},
            {name: "moo", template: "moo", description: ""},
            {name: "mp", template: "mp", description: ""},
            {name: "mplayerconf", template: "mplayerconf", description: ""},
            {name: "mrxvtrc", template: "mrxvtrc", description: ""},
            {name: "msidl", template: "msidl", description: ""},
            {name: "msql", template: "msql", description: ""},
            {name: "mupad", template: "mupad", description: ""},
            {name: "mush", template: "mush", description: ""},
            {name: "muttrc", template: "muttrc", description: ""},
            {name: "mysql", template: "mysql", description: ""},
            {name: "named", template: "named", description: ""},
            {name: "nanorc", template: "nanorc", description: ""},
            {name: "nasm", template: "nasm", description: ""},
            {name: "nastran", template: "nastran", description: ""},
            {name: "natural", template: "natural", description: ""},
            {name: "ncf", template: "ncf", description: ""},
            {name: "netrc", template: "netrc", description: ""},
            {name: "netrw", template: "netrw", description: ""},
            {name: "nosyntax", template: "nosyntax", description: ""},
            {name: "nqc", template: "nqc", description: ""},
            {name: "nroff", template: "nroff", description: ""},
            {name: "nsis", template: "nsis", description: ""},
            {name: "objc", template: "objc", description: ""},
            {name: "objcpp", template: "objcpp", description: ""},
            {name: "ocaml", template: "ocaml", description: ""},
            {name: "occam", template: "occam", description: ""},
            {name: "omnimark", template: "omnimark", description: ""},
            {name: "openroad", template: "openroad", description: ""},
            {name: "opl", template: "opl", description: ""},
            {name: "ora", template: "ora", description: ""},
            {name: "pamconf", template: "pamconf", description: ""},
            {name: "papp", template: "papp", description: ""},
            {name: "pascal", template: "pascal", description: ""},
            {name: "passwd", template: "passwd", description: ""},
            {name: "pcap", template: "pcap", description: ""},
            {name: "pccts", template: "pccts", description: ""},
            {name: "perl", template: "perl", description: ""},
            {name: "pf", template: "pf", description: ""},
            {name: "pfmain", template: "pfmain", description: ""},
            {name: "php", template: "php", description: ""},
            {name: "phtml", template: "phtml", description: ""},
            {name: "pic", template: "pic", description: ""},
            {name: "pike", template: "pike", description: ""},
            {name: "pilrc", template: "pilrc", description: ""},
            {name: "pine", template: "pine", description: ""},
            {name: "pinfo", template: "pinfo", description: ""},
            {name: "plaintex", template: "plaintex", description: ""},
            {name: "plm", template: "plm", description: ""},
            {name: "plp", template: "plp", description: ""},
            {name: "plsql", template: "plsql", description: ""},
            {name: "po", template: "po", description: ""},
            {name: "pod", template: "pod", description: ""},
            {name: "postscr", template: "postscr", description: ""},
            {name: "pov", template: "pov", description: ""},
            {name: "povini", template: "povini", description: ""},
            {name: "ppd", template: "ppd", description: ""},
            {name: "ppwiz", template: "ppwiz", description: ""},
            {name: "prescribe", template: "prescribe", description: ""},
            {name: "procmail", template: "procmail", description: ""},
            {name: "progress", template: "progress", description: ""},
            {name: "prolog", template: "prolog", description: ""},
            {name: "protocols", template: "protocols", description: ""},
            {name: "psf", template: "psf", description: ""},
            {name: "ptcap", template: "ptcap", description: ""},
            {name: "purifylog", template: "purifylog", description: ""},
            {name: "pyrex", template: "pyrex", description: ""},
            {name: "python", template: "python", description: ""},
            {name: "qf", template: "qf", description: ""},
            {name: "quake", template: "quake", description: ""},
            {name: "r", template: "r", description: ""},
            {name: "racc", template: "racc", description: ""},
            {name: "radiance", template: "radiance", description: ""},
            {name: "ratpoison", template: "ratpoison", description: ""},
            {name: "rc", template: "rc", description: ""},
            {name: "rcs", template: "rcs", description: ""},
            {name: "rcslog", template: "rcslog", description: ""},
            {name: "readline", template: "readline", description: ""},
            {name: "rebol", template: "rebol", description: ""},
            {name: "registry", template: "registry", description: ""},
            {name: "remind", template: "remind", description: ""},
            {name: "resolv", template: "resolv", description: ""},
            {name: "rexx", template: "rexx", description: ""},
            {name: "rhelp", template: "rhelp", description: ""},
            {name: "rib", template: "rib", description: ""},
            {name: "rnc", template: "rnc", description: ""},
            {name: "rnoweb", template: "rnoweb", description: ""},
            {name: "robots", template: "robots", description: ""},
            {name: "rpcgen", template: "rpcgen", description: ""},
            {name: "rpl", template: "rpl", description: ""},
            {name: "rst", template: "rst", description: ""},
            {name: "rtf", template: "rtf", description: ""},
            {name: "ruby", template: "ruby", description: ""},
            {name: "samba", template: "samba", description: ""},
            {name: "sas", template: "sas", description: ""},
            {name: "sather", template: "sather", description: ""},
            {name: "scheme", template: "scheme", description: ""},
            {name: "scilab", template: "scilab", description: ""},
            {name: "screen", template: "screen", description: ""},
            {name: "sdl", template: "sdl", description: ""},
            {name: "sed", template: "sed", description: ""},
            {name: "sendpr", template: "sendpr", description: ""},
            {name: "sensors", template: "sensors", description: ""},
            {name: "services", template: "services", description: ""},
            {name: "setserial", template: "setserial", description: ""},
            {name: "sgml", template: "sgml", description: ""},
            {name: "sgmldecl", template: "sgmldecl", description: ""},
            {name: "sgmllnx", template: "sgmllnx", description: ""},
            {name: "sh", template: "sh", description: ""},
            {name: "sicad", template: "sicad", description: ""},
            {name: "sieve", template: "sieve", description: ""},
            {name: "simula", template: "simula", description: ""},
            {name: "sinda", template: "sinda", description: ""},
            {name: "sindacmp", template: "sindacmp", description: ""},
            {name: "sindaout", template: "sindaout", description: ""},
            {name: "sisu", template: "sisu", description: ""},
            {name: "skill", template: "skill", description: ""},
            {name: "sl", template: "sl", description: ""},
            {name: "slang", template: "slang", description: ""},
            {name: "slice", template: "slice", description: ""},
            {name: "slpconf", template: "slpconf", description: ""},
            {name: "slpreg", template: "slpreg", description: ""},
            {name: "slpspi", template: "slpspi", description: ""},
            {name: "slrnrc", template: "slrnrc", description: ""},
            {name: "slrnsc", template: "slrnsc", description: ""},
            {name: "sm", template: "sm", description: ""},
            {name: "smarty", template: "smarty", description: ""},
            {name: "smcl", template: "smcl", description: ""},
            {name: "smil", template: "smil", description: ""},
            {name: "smith", template: "smith", description: ""},
            {name: "sml", template: "sml", description: ""},
            {name: "snnsnet", template: "snnsnet", description: ""},
            {name: "snnspat", template: "snnspat", description: ""},
            {name: "snnsres", template: "snnsres", description: ""},
            {name: "snobol4", template: "snobol4", description: ""},
            {name: "spec", template: "spec", description: ""},
            {name: "specman", template: "specman", description: ""},
            {name: "spice", template: "spice", description: ""},
            {name: "splint", template: "splint", description: ""},
            {name: "spup", template: "spup", description: ""},
            {name: "spyce", template: "spyce", description: ""},
            {name: "sql", template: "sql", description: ""},
            {name: "sqlanywhere", template: "sqlanywhere", description: ""},
            {name: "sqlforms", template: "sqlforms", description: ""},
            {name: "sqlinformix", template: "sqlinformix", description: ""},
            {name: "sqlj", template: "sqlj", description: ""},
            {name: "sqloracle", template: "sqloracle", description: ""},
            {name: "sqr", template: "sqr", description: ""},
            {name: "squid", template: "squid", description: ""},
            {name: "sshconfig", template: "sshconfig", description: ""},
            {name: "sshdconfig", template: "sshdconfig", description: ""},
            {name: "st", template: "st", description: ""},
            {name: "stata", template: "stata", description: ""},
            {name: "stp", template: "stp", description: ""},
            {name: "strace", template: "strace", description: ""},
            {name: "sudoers", template: "sudoers", description: ""},
            {name: "svn", template: "svn", description: ""},
            {name: "syncolor", template: "syncolor", description: ""},
            {name: "synload", template: "synload", description: ""},
            {name: "syntax", template: "syntax", description: ""},
            {name: "sysctl", template: "sysctl", description: ""},
            {name: "tads", template: "tads", description: ""},
            {name: "tags", template: "tags", description: ""},
            {name: "tak", template: "tak", description: ""},
            {name: "takcmp", template: "takcmp", description: ""},
            {name: "takout", template: "takout", description: ""},
            {name: "tar", template: "tar", description: ""},
            {name: "tasm", template: "tasm", description: ""},
            {name: "tcl", template: "tcl", description: ""},
            {name: "tcsh", template: "tcsh", description: ""},
            {name: "terminfo", template: "terminfo", description: ""},
            {name: "tex", template: "tex", description: ""},
            {name: "texinfo", template: "texinfo", description: ""},
            {name: "texmf", template: "texmf", description: ""},
            {name: "tf", template: "tf", description: ""},
            {name: "tidy", template: "tidy", description: ""},
            {name: "tilde", template: "tilde", description: ""},
            {name: "tli", template: "tli", description: ""},
            {name: "tpp", template: "tpp", description: ""},
            {name: "trasys", template: "trasys", description: ""},
            {name: "trustees", template: "trustees", description: ""},
            {name: "tsalt", template: "tsalt", description: ""},
            {name: "tsscl", template: "tsscl", description: ""},
            {name: "tssgm", template: "tssgm", description: ""},
            {name: "tssop", template: "tssop", description: ""},
            {name: "uc", template: "uc", description: ""},
            {name: "udevconf", template: "udevconf", description: ""},
            {name: "udevperm", template: "udevperm", description: ""},
            {name: "udevrules", template: "udevrules", description: ""},
            {name: "uil", template: "uil", description: ""},
            {name: "updatedb", template: "updatedb", description: ""},
            {name: "valgrind", template: "valgrind", description: ""},
            {name: "vb", template: "vb", description: ""},
            {name: "vera", template: "vera", description: ""},
            {name: "verilog", template: "verilog", description: ""},
            {name: "verilogams", template: "verilogams", description: ""},
            {name: "vgrindefs", template: "vgrindefs", description: ""},
            {name: "vhdl", template: "vhdl", description: ""},
            {name: "vim", template: "vim", description: ""},
            {name: "viminfo", template: "viminfo", description: ""},
            {name: "virata", template: "virata", description: ""},
            {name: "vmasm", template: "vmasm", description: ""},
            {name: "vrml", template: "vrml", description: ""},
            {name: "vsejcl", template: "vsejcl", description: ""},
            {name: "wdiff", template: "wdiff", description: ""},
            {name: "web", template: "web", description: ""},
            {name: "webmacro", template: "webmacro", description: ""},
            {name: "wget", template: "wget", description: ""},
            {name: "whitespace", template: "whitespace", description: ""},
            {name: "winbatch", template: "winbatch", description: ""},
            {name: "wml", template: "wml", description: ""},
            {name: "wsh", template: "wsh", description: ""},
            {name: "wsml", template: "wsml", description: ""},
            {name: "wvdial", template: "wvdial", description: ""},
            {name: "xdefaults", template: "xdefaults", description: ""},
            {name: "xf86conf", template: "xf86conf", description: ""},
            {name: "xhtml", template: "xhtml", description: ""},
            {name: "xinetd", template: "xinetd", description: ""},
            {name: "xkb", template: "xkb", description: ""},
            {name: "xmath", template: "xmath", description: ""},
            {name: "xml", template: "xml", description: ""},
            {name: "xmodmap", template: "xmodmap", description: ""},
            {name: "xpm", template: "xpm", description: ""},
            {name: "xpm2", template: "xpm2", description: ""},
            {name: "xquery", template: "xquery", description: ""},
            {name: "xs", template: "xs", description: ""},
            {name: "xsd", template: "xsd", description: ""},
            {name: "xslt", template: "xslt", description: ""},
            {name: "xxd", template: "xxd", description: ""},
            {name: "yacc", template: "yacc", description: ""},
            {name: "yaml", template: "yaml", description: ""},
            {name: "z8a", template: "z8a", description: ""},
            {name: "zsh", template: "zsh", description: ""},
        ]
    
    });
    
};

})();
