// ==UserScript==
// @name        Oh My Audio Filters
// @author   	Alexander Korkov
// @description Filters for vk.com/audio
// @include   	http://vk.com/*
// @copyright   2013+, Alexander Korkov korkov@yandex.ru
// @namespace   http://vk.com/*
// @version     1.0
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/167994.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @run-at      document-end
// ==/UserScript==

(function () {
    if (typeof(window.nav) === "undefined")
        return;

    var app = "oh-my-audio-filters:";

    try {
        var settings = {
            show_mp3: "true",
            exact_search: "true",
        };

        if (typeof(oh_my_audio_filters) !== "undefined")
            settings = oh_my_audio_filters;

        function VKPage() {

            this.change = function(fn) {
                var go = window.nav.go;
                window.nav.go = function() {
                    var opts = arguments[2];
                    if (opts != undefined) {
                        var prev = opts.onDone;
                        opts.onDone = function() {
                            fn();
                            if (prev)
                                return prev.apply(this, arguments);
                            return false;
                        };
                    }
                    return go.apply(this, arguments);
                };
            }
        }

        dictionary = {};

        function _(what) {
            function lang() {
                switch ($("#myprofile").text()) {
                case "\u041C\u043E\u044F\u0020\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430": // Моя Страница
                case "\u041C\u043E\u0439\u0020\u041F\u0430\u0441\u043F\u043E\u0440\u0442\u044A": // Мой Паспортъ
                case "\u041C\u043E\u0435\u0020\u0414\u043E\u0441\u044C\u0435": // Мое Досье
                    return "ru";
                case "\u041C\u043E\u044F\u0020\u0043\u0442\u043E\u0440\u0456\u043D\u043A\u0430": // Моя Cторінка
                    return "ua";
                default: return "en";
                }
            }

            return (dictionary[what] && dictionary[what][lang()]) ?
                dictionary[what][lang()] : what;
        }

        function audio_info(div) {
            var mp3 = div.find("input").val().split(",")[0];
            var artist = $.trim(div.find(".title_wrap b").text());
            var title = $.trim(div.find(".title").text());
            return { artist: artist, title: title, mp3: mp3 };
        }

        function Mp3Filter() {

            function update_audio(div) {

                if (div.find(".oh-my-audio-mp3").length && div.find("input").length)
                    return;

                var info = audio_info(div);

                var img_data = "data:image/gif;base64,\
R0lGODdhEAAQAOMBAJqxxv///199nf///wAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQ\
AAAEJzAAQaulQN5dJ/9bIAZgCY6kiZboyrXj2aqxKYh2fs\
O14NmZHygTAQA7";

                if (window.location.pathname == "/audio")
                    div.find(".info").css("width", "370px");

                div.find(".title_wrap b").css("padding-left", "10px");

                var a = $("<a>", {
                    href: info.mp3,
                    target: "_blank",
                    title: info.artist + " - " + info.title,
                    class: "play_btn_wrap fl_l oh-my-audio-mp3",
                    style: "padding-left: 0px; padding-right: 0px;",
                });

                a.append($("<img>", {src: img_data}));
                div.find(".info").before(a);
            }

            this.apply = function() {
                $(".audio").each(function() {
                    try {
                        update_audio($(this));
                    }
                    catch (e) {
                    }
                });
            }
        };

        function ExactSearchFilter() {

            function active() {
                return $(".oh-my-audio-exact-search").attr("checked") && $("#s_search").val();
            }

            this.apply = function() {
                if (!active())
                    return;

                var s = $.trim($("#s_search").val()).toLowerCase();

                $(".audio").each(function() {
                    var info = audio_info($(this));
                    var a = info.artist.toLowerCase();
                    var t =  info.title.toLowerCase();
                    if ((s != a) && (s != t))
                        $(this).remove();
                });
            }

            dictionary["exact search"] = {
                "ru": "\u0442\u043E\u0447\u043D\u044B\u0439\u0020\u043F\u043E\u0438\u0441\u043A", // точный поиск
                "ua": "\u0442\u043E\u0447\u043D\u044B\u0439\u0020\u043F\u043E\u0438\u0441\u043A", // точный поиск
            };
        };

        function VKCheckBox(div, opts) {
            this.div = div;

            this.checkbox = $("<input>", {
                class: "oh-my-audio-exact-search",
                type: "checkbox",
                style: "margin-right: 6px;",
                click: opts.click,
            });

            this.text = $("<span>", { text: opts.text });

            this.div.append(this.checkbox);
            this.div.append(this.text);
        }

        var filters = [];
        if (settings.exact_search == "true")
            filters.push(new ExactSearchFilter());
        if (settings.show_mp3 == "true")
            filters.push(new Mp3Filter());

        function apply_filters() {
            filters.forEach(function(f) { f.apply(); });
        }

        var vk_page = new VKPage();

        function create_elements() {
            if (settings.exact_search == "true") {
                var div = $("<div>");
                new VKCheckBox(div, {
                    text: _("exact search"),
                    click: function() {
                        if (!this.checked)
                            Audio.searchAudios($("#s_search").val(), "all");
                        else
                            apply_filters();
                    },
                });
                $("#audio_search_filters").append(div);
            }
        }

        create_elements();
        vk_page.change(create_elements);
        setInterval(apply_filters, 1000);

    }
    catch (e) {
        console.error(app, e);
    }
})();
