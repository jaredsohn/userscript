// ==UserScript==
// @name            AdvancedSeachHelper
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     高度な検索を[Alt + G]で補助します
// @require         http://code.jquery.com/jquery-latest.min.js
// @include         *
// @downloadURL     https://userscripts.org/scripts/source/146611.user.js
// @updateURL       https://userscripts.org/scripts/source/146611.meta.js
// @version         2.1
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {
        $(window).keydown(function(event) {
            // [Alt + g]
            if (event.altKey == true && event.keyCode == 71) {

                var translation = new Translation();
                var engine = new Engine();

                var css = ["<style id='advancedStyle'>"
                            , "#advancedContainer {position:fixed; bottom:0%; right:0%; z-index:100000000; background-color:#000000; opacity:0.8; border-radius:7px 0px 0px 0px; padding:5px; text-align:left;}"
                            , "#advancedContainer label {color:#FFFFFF; margin-right:5px;}"
                            , "#advancedContainer select {width:100px; margin-right:5px;}"
                            , "#advancedContainer div {margin:5px;}"
                            , "#advancedContainer input, #advancedContainer button {border:1px solid #FFFFFF; border-radius:2px 2px 2px 2px;}"
                            , "#advancedContainer input {margin-right:6px;}"
                            , "#advancedContainer button {margin-left:5px;}"
                            , "#advancedCache {margin-left:5px; color:#007FFF;}"
                            , "#advancedIp {width:105px; ime-mode:disabled;}"
                            , "#advancedFileType {width:73px; text-align:center;}"
                            , "#advancedQuery {margin-top:5px; width:203px;}"
                            , "#advancedContains {width:50px; text-align:center;}"
                            , "#advancedPrefer, #advancedNot {width:100px; text-align:center;}"
                            , "</style>"
                          ].join("\n").replace(/;/g, " !important;");
                $("head").append(css);

                var searchContainer = "<div id='advancedContainer'>"
                                        + "<form id='advancedForm'>"
                                            + "<div>"
                                                + "<label><input type='radio' name='advancedSearchEngine' value='bing' checked>" + translation.bing + translation.search + "</label>"
                                                + "<label><input type='radio' name='advancedSearchEngine' value='google'>" + translation.google + translation.search + "</label>"
                                            + "</div>"
                                            + "<div>"
                                                + "<label><input type='checkbox' id='advancedImage' />" + translation.imagesSearch + "</label>"
                                                + "<label><input type='checkbox' id='advancedOpener' />" + translation.opener + "</label>"
                                            + "</div>"
                                            + "<div>"
                                                + "<label><input type='checkbox' id='advancedSite' checked />" + location.hostname + translation.internalSearch + "</label>"
                                                + "<a id='advancedCache'>" + translation.cache + "</a>"
                                            + "</div>"
                                            + "<div>"
                                                + "<label><input type='checkbox' id='advancedPerfectMatch'>" + translation.perfectMatch + "</label>"
                                                + "<label><input type='checkbox' id='advancedFeed' " + engine.attributeFeed + ">" + translation.feed + "</label>"
                                                + "<label><input type='checkbox' id='advancedTitle' " + engine.attributeTitle + ">" + translation.title + "</label>"
                                            + "</div>"
                                            + "<div>"
                                                + "<select id='advancedLocation'" + engine.attributeLoc + ">" + translation.locationOptionList() + "</select>"
                                                + "<select id='advancedLanguage'" + engine.attributeLang + ">" + translation.languageOptionList() + "</select>"
                                                + "<input type='search' id='advancedIp' placeholder='" + translation.ip + "' pattern='^\\d{1,3}(\\.\\d{1,3}){3}$' " + engine.attributeIp + " />"
                                                + "<input type='search' id='advancedFileType' list='fileType' placeholder='" + translation.fileType + "' />"
                                            + "</div>"
                                            + "<div>"
                                                + "<input type='search' id='advancedQuery' required='required' placeholder='" + translation.bing + translation.search + "' />"
                                                + "<input type='search' id='advancedPrefer' placeholder='" + translation.prefer + "' />"
                                                + "<input type='search' id='advancedContains' list='extention' placeholder='" + translation.extention + "' " + engine.attributeContains + " />"
                                                + "<input type='search' id='advancedNot' placeholder='" + translation.not + "' />"
                                                + "<input type='submit' id='advancedSearch' value='" + translation.search + "' />"
                                            + "</div>"
                                            + "<datalist id='fileType'>"
                                                + "<option value='asp'></option>"
                                                + "<option value='doc'></option>"
                                                + "<option value='docx'></option>"
                                                + "<option value='htm'></option>"
                                                + "<option value='html'></option>"
                                                + "<option value='jsp'></option>"
                                                + "<option value='pdf'></option>"
                                                + "<option value='php'></option>"
                                                + "<option value='ppt'></option>"
                                                + "<option value='swf'></option>"
                                                + "<option value='txt'></option>"
                                                + "<option value='xls'></option>"
                                                + "<option value='xlsx'></option>"
                                            + "</datalist>"
                                            + "<datalist id='extention'>"
                                                + "<option value='wma'></option>"
                                            + "</datalist>"
                                        + "</form>"
                                    + "</div>";

                if ($("#advancedContainer").length > 0) {
                    $("#advancedContainer").remove();
                    $("#advancedStyle").remove();
                    return false;
                }
                $("body").append(searchContainer);
                if (document.getSelection().toString()) {
                    $("#advancedQuery").val(document.getSelection().toString());
                }
                $("#advancedQuery").get(0).focus();

                // 検索エンジン選択
                $("input[name='advancedSearchEngine']").click(function() {
                    engine.change($(this).val());
                    if (engine.optionCache == "") {
                        $("#advancedCache").removeAttr("href");
                        $("#advancedCache").css("text-decoration", "none");
                    } else {
                        $("#advancedCache").attr("href", engine.url + engine.optionCache + location.hostname);
                        $("#advancedCache").css("text-decoration", "underline");
                    }
                    if (engine.attributeFeed == "") {
                        $("#advancedFeed").removeAttr("disabled");
                    } else {
                        $("#advancedFeed").removeAttr("checked");
                        $("#advancedFeed").attr("disabled", "disabled");
                    }
                    if (engine.attributeLoc == "") {
                        $("#advancedLocation").removeAttr("disabled");
                    } else {
                        $("#advancedLocation").attr("disabled", "disabled");
                        $("#advancedLocation").val("");
                    }
                    if (engine.attributeLang == "") {
                        $("#advancedLanguage").removeAttr("disabled");
                    } else {
                        $("#advancedLanguage").attr("disabled", "disabled");
                        $("#advancedLanguage").val("");
                    }
                    if (engine.attributeIp == "") {
                        $("#advancedIp").removeAttr("disabled");
                    } else {
                        $("#advancedIp").attr("disabled", "disabled");
                        $("#advancedIp").val("");
                    }
                    if (engine.attributePrefer == "") {
                        $("#advancedPrefer").removeAttr("disabled");
                    } else {
                        $("#advancedPrefer").val("");
                        $("#advancedPrefer").attr("disabled", "disabled");
                    }
                    if (engine.attributeContains == "") {
                        $("#advancedContains").removeAttr("disabled");
                    } else {
                        $("#advancedContains").val("");
                        $("#advancedContains").attr("disabled", "disabled");
                    }
                    $("#advancedQuery").attr("placeholder", translation[$(this).val()] + translation.search);
                });

                // キャッシュ検索
                $("#advancedCache").click(function() {
                    if (engine.optionCache == "") {
                        return false;
                    }
                    engine.setOpener($("#advancedOpener:checked").val());
                    $("#advancedCache").attr("target", "");
                    if (engine.opener) {
                        $("#advancedCache").attr("target", "_blank");
                    }
                });

                // 検索
                $("#advancedForm").submit(function() {
                    engine.setImages($("#advancedImage:checked").val());
                    engine.setOpener($("#advancedOpener:checked").val());
                    engine.setSite($("#advancedSite:checked").val(), location.hostname);
                    engine.setPerfectMatch($("#advancedPerfectMatch:checked").val());
                    engine.setFeed($("#advancedFeed:checked").val());
                    engine.setTitle($("#advancedTitle:checked").val());
                    engine.setLoc($("#advancedLocation option:selected").val())
                    engine.setLang($("#advancedLanguage option:selected").val())
                    engine.setIp($("#advancedIp").val())
                    engine.setFileType($("#advancedFileType").val())
                    engine.setQuery($("#advancedQuery").val());
                    engine.setPrefer($("#advancedPrefer").val());
                    engine.setContains($("#advancedContains").val());
                    engine.setNot($("#advancedNot").val());
                    engine.search();
                    return false;
                });
            }

            // [Esc]
            if (event.keyCode == 27) {
                if ($("#advancedContainer").length > 0) {
                    $("#advancedContainer").remove();
                }
            }
        });

        /**
         * 翻訳クラス
         */
        function Translation() {
            if (navigator.language == "ja") {
                this.search = "検索";
                this.bing = "Bing";
                this.google = "Google";
                this.prefer = "優先語句";
                this.extention = "拡張子";
                this.perfectMatch = "完全一致";
                this.feed = "RSSフィード";
                this.title = "タイトル";
                this.cache = "キャッシュ";
                this.opener = "新規ウィンドウ";
                this.fileType = "ページ形式";
                this.loc = "国/地域";
                this.lang = "言語";
                this.ip = "IP 207.46.249.252";
                this.internalSearch = "内を検索";
                this.imagesSearch = "画像検索";
                this.not = "語句を含まない";
                this.language = {"ga": "アイルランド語"
                                , "ar-XA": "アラビア語"
                                , "it": "イタリア語"
                                , "uk-UA": "ウクライナ語"
                                , "et": "エストニア語"
                                , "nl": "オランダ語"
                                , "el": "ギリシャ語"
                                , "hr": "クロアチア語"
                                , "sv": "スウェーデン語"
                                , "es": "スペイン語"
                                , "sk": "スロバキア語"
                                , "sl": "スロベニア語"
                                , "sr-CS": "セルビア語"
                                , "th": "タイ語"
                                , "cs": "チェコ語"
                                , "da": "デンマーク語"
                                , "tr": "トルコ語"
                                , "de": "ドイツ語"
                                , "no": "ノルウェー語"
                                , "hu": "ハンガリー語"
                                , "hi": "ヒンディー語"
                                , "fi": "フィンランド語"
                                , "fr": "フランス語"
                                , "bg": "ブルガリア語"
                                , "he-IL": "ヘブライ語"
                                , "pl": "ポーランド語"
                                , "pt": "ポルトガル語"
                                , "lv": "ラトビア語"
                                , "lt": "リトアニア語"
                                , "ro": "ルーマニア語"
                                , "ru": "ロシア語"
                                , "en": "英語"
                                , "ko": "韓国語"
                                , "zh-chs": "中国語 (簡体字)"
                                , "zh-cht": "中国語 (繁体字)"
                                , "ja": "日本語"};
                this.location = {"ae": "U.A.E (アラブ首長国連邦)"
                                , "is": "アイスランド"
                                , "ie": "アイルランド"
                                , "az": "アゼルバイジャン"
                                , "dz": "アルジェリア"
                                , "ar": "アルゼンチン"
                                , "al": "アルバニア"
                                , "am": "アルメニア"
                                , "ye": "イエメン"
                                , "il": "イスラエル"
                                , "it": "イタリア"
                                , "iq": "イラク"
                                , "ir": "イラン"
                                , "in": "インド"
                                , "id": "インドネシア"
                                , "ua": "ウクライナ"
                                , "ec": "エクアドル"
                                , "eg": "エジプト"
                                , "ee": "エストニア"
                                , "sv": "エルサルバドル"
                                , "au": "オーストラリア"
                                , "at": "オーストリア"
                                , "om": "オマーン"
                                , "nl": "オランダ"
                                , "qa": "カタール"
                                , "ca": "カナダ"
                                , "gr": "ギリシャ"
                                , "kw": "クウェート"
                                , "hr": "クロアチア"
                                , "gt": "グアテマラ"
                                , "ge": "グルジア"
                                , "ke": "ケニア"
                                , "cr": "コスタリカ"
                                , "co": "コロンビア"
                                , "sa": "サウジアラビア"
                                , "sy": "シリア"
                                , "sg": "シンガポール"
                                , "ch": "スイス"
                                , "se": "スウェーデン"
                                , "es": "スペイン"
                                , "sk": "スロバキア"
                                , "sl": "スロベニア"
                                , "sp": "セルビア"
                                , "th": "タイ"
                                , "cz": "チェコ共和国"
                                , "tn": "チュニジア"
                                , "cl": "チリ"
                                , "dk": "デンマーク"
                                , "tr": "トルコ"
                                , "de": "ドイツ"
                                , "do": "ドミニカ共和国"
                                , "ni": "ニカラグア"
                                , "nz": "ニュージーランド"
                                , "no": "ノルウェー"
                                , "hu": "ハンガリー"
                                , "bh": "バーレーン"
                                , "pk": "パキスタン・イスラム共和国"
                                , "pa": "パナマ"
                                , "py": "パラグアイ"
                                , "ph": "フィリピン共和国"
                                , "fi": "フィンランド"
                                , "fr": "フランス"
                                , "br": "ブラジル"
                                , "bg": "ブルガリア"
                                , "pr": "プエルトリコ"
                                , "vn": "ベトナム"
                                , "be": "ベルギー"
                                , "pe": "ペルー"
                                , "hn": "ホンジュラス"
                                , "ba": "ボスニア・ヘルツェゴビナ"
                                , "bo": "ボリビア"
                                , "pl": "ポーランド"
                                , "pt": "ポルトガル"
                                , "mk": "マケドニア旧ユーゴスラビア共和国"
                                , "mt": "マルタ"
                                , "my": "マレーシア"
                                , "mx": "メキシコ"
                                , "ma": "モロッコ"
                                , "jo": "ヨルダン"
                                , "lv": "ラトビア"
                                , "lt": "リトアニア"
                                , "ly": "リビア"
                                , "ro": "ルーマニア"
                                , "lu": "ルクセンブルク"
                                , "lb": "レバノン"
                                , "ru": "ロシア"
                                , "gb": "英国"
                                , "kr": "韓国"
                                , "hk": "香港"
                                , "tw": "台湾"
                                , "cn": "中国"
                                , "za": "南アフリカ"
                                , "jp": "日本"
                                , "us": "米国"};
                return this;
            }
            this.search = "search";
            this.bing = "Bing";
            this.google = "Google";
            this.prefer = "prefer";
            this.extention = "extention";
            this.perfectMatch = "perfect match";
            this.feed = "rss feed";
            this.title = "title";
            this.cache = "cache";
            this.opener = "new window";
            this.fileType = "pege type";
            this.loc = "location";
            this.lang = "language";
            this.ip = "ip 207.46.249.252";
            this.internalSearch = "internal search";
            this.imagesSearch = "image search";
            this.not = "exclude word";
            this.language = {"ar-XA": "Arabic"
                                , "bg": "Bulgarian"
                                , "hr": "Croatian"
                                , "cs": "Czech"
                                , "da": "Danish"
                                , "de": "German"
                                , "el": "Greek"
                                , "en": "English"
                                , "et": "Estonian"
                                , "es": "Spanish"
                                , "fi": "Finnish"
                                , "fr": "French"
                                , "ga": "Irish"
                                , "hi": "Hindi"
                                , "hu": "Hungarian"
                                , "he": "Hebrew"
                                , "it": "Italian"
                                , "ja": "Japanese"
                                , "ko": "Korean"
                                , "lv": "Latvian"
                                , "lt": "Lithuanian"
                                , "nl": "Dutch"
                                , "no": "Norwegian"
                                , "pl": "Polish"
                                , "pt": "Portuguese"
                                , "sv": "Swedish"
                                , "ro": "Romanian"
                                , "ru": "Russian"
                                , "sr-CS": "Serbian"
                                , "sk": "Slovak"
                                , "sl": "Slovenian"
                                , "th": "Thai"
                                , "tr": "Turkish"
                                , "uk-UA": "Ukrainian"
                                , "zh-chs": "Chinese (Simplified)"
                                , "zh-cht": "Chinese (Traditional)"};
            this.location = {"al": "Albania"
                                , "dz": "Algeria"
                                , "ar": "Argentina"
                                , "am": "Armenia"
                                , "au": "Australia"
                                , "at": "Austria"
                                , "az": "Azerbaijan"
                                , "bh": "Bahrain"
                                , "be": "Belgium"
                                , "bo": "Bolivia"
                                , "ba": "Bosnia and Herzegovina"
                                , "br": "Brazil"
                                , "bg": "Bulgaria"
                                , "ca": "Canada"
                                , "cl": "Chile"
                                , "cn": "China"
                                , "co": "Colombia"
                                , "cr": "Costa Rica"
                                , "hr": "Croatia"
                                , "cz": "Czech Republic"
                                , "dk": "Denmark"
                                , "do": "Dominican Republic"
                                , "ec": "Ecuador"
                                , "eg": "Egypt"
                                , "sv": "El Salvador"
                                , "ee": "Estonia"
                                , "fi": "Finland"
                                , "mk": "Former Yugoslav Republic of Macedonia"
                                , "fr": "France"
                                , "ge": "Georgia"
                                , "de": "Germany"
                                , "gr": "Greece"
                                , "gt": "Guatemala"
                                , "hn": "Honduras"
                                , "hk": "Hong Kong S.A.R."
                                , "hu": "Hungary"
                                , "is": "Iceland"
                                , "in": "India"
                                , "id": "Indonesia"
                                , "ir": "Iran"
                                , "iq": "Iraq"
                                , "ie": "Ireland"
                                , "pk": "Islamic Republic of Pakistan"
                                , "il": "Israel"
                                , "it": "Italy"
                                , "jp": "Japan"
                                , "jo": "Jordan"
                                , "ke": "Kenya"
                                , "kr": "Korea"
                                , "kw": "Kuwait"
                                , "lv": "Latvia"
                                , "lb": "Lebanon"
                                , "ly": "Libya"
                                , "lt": "Lithuania"
                                , "lu": "Luxembourg"
                                , "my": "Malaysia"
                                , "mt": "Malta"
                                , "mx": "Mexico"
                                , "ma": "Morocco"
                                , "nl": "Netherlands"
                                , "nz": "New Zealand"
                                , "ni": "Nicaragua"
                                , "no": "Norway"
                                , "om": "Oman"
                                , "pa": "Panama"
                                , "py": "Paraguay"
                                , "pe": "Peru"
                                , "pl": "Poland"
                                , "pt": "Portugal"
                                , "pr": "Puerto Rico"
                                , "qa": "Qatar"
                                , "ph": "Republic of the Philippines"
                                , "ro": "Romania"
                                , "ru": "Russia"
                                , "sa": "Saudi Arabia"
                                , "sp": "Serbia"
                                , "sg": "Singapore"
                                , "sk": "Slovakia"
                                , "sl": "Slovenia"
                                , "za": "South Africa"
                                , "es": "Spain"
                                , "se": "Sweden"
                                , "ch": "Switzerland"
                                , "sy": "Syria"
                                , "tw": "Taiwan"
                                , "th": "Thailand"
                                , "tn": "Tunisia"
                                , "tr": "Turkey"
                                , "ae": "U.A.E (United Arab Emirates)"
                                , "ua": "Ukraine"
                                , "gb": "United Kingdom"
                                , "us": "United States"
                                , "vn": "Vietnam"
                                , "ye": "Yemen"};
            return this;
        }
        Translation.prototype = {
            locationOptionList: function() {
                var list = "<option value=''>" + this.loc + "</option>";
                for (var index in this.location) {
                    list = list + "<option value='"  + index + "'>" + this.location[index] + "</option>";
                }
                return list;
            }
            , languageOptionList: function() {
                var list = "<option value=''>" + this.lang + "</option>";
                for (var index in this.language) {
                    list = list + "<option value='"  + index + "'>" + this.language[index] + "</option>";
                }
                return list;
            }
        }

        /**
         * 検索エンジンクラス
         *
         * @param name
         */
        function Engine() {
            this.images = "";
            this.opener = "";
            this.site = "";
            this.perfectMatch = "";
            this.feed = "";
            this.title = "";
            this.loc = "";
            this.lang = "";
            this.ip = "";
            this.fileType = "";
            this.query = "";
            this.prefer = "";
            this.contains = "";
            this.not = "";

            this.name = "bing";
            this.url = "http://www.bing.com/search?q=";
            this.imagesUrl = "http://www.bing.com/images/search?q=";
            this.optionSite = "site:";
            this.optionFeed = "hasfeed:";
            this.optionTitle = "intitle:";
            this.optionCache = "";
            this.optionFeedTitle = "feed:";
            this.optionLoc = "loc:";
            this.optionLang = "language:";
            this.optionIp = "ip:";
            this.optionFileType = "filetype:";
            this.optionPrefer = "prefer:"
            this.optionContains = "contains:";
            this.optionNot = "NOT";
            this.attributeFeed = "";
            this.attributeLoc = "";
            this.attributeLang = "";
            this.attributeIp = "";
            this.attributePrefer = "";
            this.attributeContains = "";
            return this;
        }
        Engine.prototype = {
            bing: {
                name: "bing"
                , url: "http://www.bing.com/search?q="
                , imagesUrl: "http://www.bing.com/images/search?q="
                , optionSite: "site:"
                , optionFeed: "hasfeed:"
                , optionTitle: "intitle:"
                , optionCache: ""
                , optionFeedTitle: "feed:"
                , optionLoc: "loc:"
                , optionLang: "language:"
                , optionIp: "ip:"
                , optionFileType: "filetype:"
                , optionPrefer: "prefer:"
                , optionContains: "contains:"
                , optionNot: "NOT"
                , attributeFeed: ""
                , attributeLoc: ""
                , attributeLang: ""
                , attributeIp: ""
                , attributePrefer: ""
                , attributeContains: ""
            }
            , google: {
                name: "google"
                , url: "https://www.google.com/search?q="
                , imagesUrl: "https://www.google.co.jp/search?tbm=isch&q="
                , optionSite: "site:"
                , optionFeed: ""
                , optionTitle: "intitle:"
                , optionCache: "cache:"
                , optionFeedTitle: ""
                , optionLoc: ""
                , optionLang: ""
                , optionIp: ""
                , optionFileType: "filetype:"
                , optionPrefer: ""
                , optionContains: ""
                , optionNot: "NOT"
                , attributeFeed: "disabled"
                , attributeLoc: "disabled"
                , attributeLang: "disabled"
                , attributeIp: "disabled"
                , attributePrefer: "disabled"
                , attributeContains: "disabled"
            }
            , setImages: function(images) {
                this.images = images;
            }
            , setOpener: function(opener) {
                this.opener = opener;
            }
            , setSite: function(internalSearch, site) {
                this.site = "";
                if (internalSearch) {
                    this.site = site;
                }
            }
            , setPerfectMatch: function(perfectMatch) {
                this.perfectMatch = "";
                if (perfectMatch) {
                    this.perfectMatch = perfectMatch;
                }
            }
            , setFeed: function(feed) {
                this.feed = feed;
            }
            , setTitle: function(title) {
                this.title = title;
            }
            , setLoc: function(loc) {
                this.loc = loc;
            }
            , setLang: function(lang) {
                this.lang = lang;
            }
            , setIp: function(ip) {
                this.ip = ip;
            }
            , setFileType: function(fileType) {
                this.fileType = fileType;
            }
            , setQuery: function(query) {
                this.query = query;
            }
            , setPrefer: function(prefer) {
                this.prefer = prefer;
            }
            , setContains: function(contains) {
                this.contains = contains;
            }
            , setNot: function(not) {
                this.not = not;
            }
            , change: function(name) {
                if (this.bing.name == name) {
                    this.name = this.bing.name;
                    this.url = this.bing.url;
                    this.imagesUrl = this.bing.imagesUrl;
                    this.optionSite = this.bing.optionSite;
                    this.optionFeed = this.bing.optionFeed;
                    this.optionTitle = this.bing.optionTitle;
                    this.optionCache = this.bing.optionCache;
                    this.optionLoc = this.bing.optionLoc;
                    this.optionLang = this.bing.optionLang;
                    this.optionIp = this.bing.optionIp;
                    this.optionFileType = this.bing.optionFileType;
                    this.optionPrefer = this.bing.optionPrefer;
                    this.optionContains = this.bing.optionContains;
                    this.attributeFeed = this.bing.attributeFeed;
                    this.attributeLoc = this.bing.attributeLoc;
                    this.attributeLang = this.bing.attributeLang;
                    this.attributeIp = this.bing.attributeIp;
                    this.attributePrefer = this.bing.attributePrefer;
                    this.attributeContains = this.bing.attributeContains;
                }
                if (this.google.name == name) {
                    this.name = this.google.name;
                    this.url = this.google.url;
                    this.imagesUrl = this.google.imagesUrl;
                    this.optionSite = this.google.optionSite;
                    this.optionFeed = this.google.optionFeed;
                    this.optionTitle = this.google.optionTitle;
                    this.optionCache = this.google.optionCache;
                    this.optionLoc = this.google.optionLoc;
                    this.optionLang = this.google.optionLang;
                    this.optionIp = this.google.optionIp;
                    this.optionFileType = this.google.optionFileType;
                    this.optionPrefer = this.google.optionPrefer;
                    this.optionContains = this.google.optionContains;
                    this.attributeFeed = this.google.attributeFeed;
                    this.attributeLoc = this.google.attributeLoc;
                    this.attributeLang = this.google.attributeLang;
                    this.attributeIp = this.google.attributeIp;
                    this.attributePrefer = this.google.attributePrefer;
                    this.attributeContains = this.google.attributeContains;
                }
            }
            , search: function() {
                // RequestURL
                if (this.site != "") {
                    this.site = "+" + this.optionSite + this.site;
                }
                if (this.perfectMatch != "") {
                    this.query = '"' + this.query + '"';
                }
                if (this.feed && this.title) {
                    this.query = this.optionFeedTitle + this.query;
                } else {
                    if (this.feed) {
                        this.query = this.optionFeed + this.query;
                    }
                    if (this.title) {
                        this.query = this.optionTitle + this.query;
                    }
                }
                if (this.loc) {
                    this.loc = "+" + this.optionLoc + this.loc;
                }
                if (this.lang) {
                    this.lang = "+" + this.optionLang + this.lang;
                }
                if (this.ip) {
                    this.ip = "+" + this.optionIp + this.ip;
                }
                if (this.fileType) {
                    this.fileType = "+" + this.optionFileType + this.fileType;
                }
                if (this.prefer) {
                    this.prefer = "+" + this.optionPrefer + this.prefer;
                }
                if (this.contains != "") {
                    this.contains = "+" + this.optionContains + this.contains;
                }
                if (this.not != "") {
                    this.query = this.query + "+" + this.optionNot + "+" + this.not;
                }
                if (this.opener) {
                    if (this.images) {
                        open(this.imagesUrl + this.query + this.prefer + this.loc + this.lang + this.ip + this.fileType + this.site + this.contains);
                    } else {
                        open(this.url + this.query + this.prefer + this.loc + this.lang + this.ip + this.fileType + this.site + this.contains);
                    }
                } else {
                    if (this.images) {
                        location.href = this.imagesUrl + this.query + this.prefer + this.loc + this.lang + this.ip + this.fileType + this.site + this.contains;
                    } else {
                        location.href = this.url + this.query + this.prefer + this.loc + this.lang + this.ip + this.fileType + this.site + this.contains;
                    }
                }
            }
        }
    })();
})();
