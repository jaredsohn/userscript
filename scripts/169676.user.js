// ==UserScript==
// @name        Oh My Audio Charts
// @author   	Alexander Korkov
// @description last.fm charts for vk.com/audio
// @include   	http://vk.com/*
// @copyright   2013+, Alexander Korkov korkov@yandex.ru
// @namespace   http://vk.com/*
// @version     1.3
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/169676.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require     https://raw.github.com/fxb/javascript-last.fm-api/master/lastfm.api.md5.js
// @require     https://raw.github.com/fxb/javascript-last.fm-api/master/lastfm.api.js
// @run-at      document-end
// ==/UserScript==

(function () {
    if (typeof(window.nav) === "undefined")
        return;

    var app = "oh-my-audio-charts:";

    try {
        var settings = {
            number_of_tracks: 20,
        };

        if (typeof(oh_my_audio_charts) !== "undefined")
            settings = oh_my_audio_charts;

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

            this.audio_menu_item = function(desc, title, fn) {
                var d = $('<div>', {
                    mouseout:  function() { if (Audio.listOut)  Audio.listOut(this); },
                    mouseover: function() { if (Audio.listOver) Audio.listOver(this); },
                    title: title,
                    class: "audio_filter",
                }).append($("<div>", {
                    class: "label",
                    text: desc,
                }));

                function onclick() {
                    fn();
                    $("#album_filters").children().removeClass("selected");
                    d.addClass("selected");
                }
                d.click(onclick);

                return d;
            }

            this.append_to_main_menu = function(item) {
                $("#album_filters").append(item);
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

        var lfm_api = new function() {
            var lastfm = undefined;
            lastfm = new LastFM({apiKey : '489c0d6832706e11fec663cbdf5bccad', });

            function opts() {
                return {
                    autocorrect: 1,
                    limit: parseInt(settings.number_of_tracks, 10),
                };
            }
            function callbacks(fn) {
                return {
                    success: function(data) { fn(data.tracks.track); },
                    error: function(code, message) { console.error(code, message); }
                }
            }

            this.top = function(fn) {
                lastfm.chart.getTopTracks(opts(), null, callbacks(fn));
            };
            this.loved = function(fn) {
                lastfm.chart.getLovedTracks(opts(), null, callbacks(fn));
            }
            this.hyped = function(fn) {
                lastfm.chart.getHypedTracks(opts(), null, callbacks(fn));
            }
        };

        var vk_audio = new function() {
            var self = this;

            function query_string(lfm_track) {
                return lfm_track.artist.name + ' - ' + lfm_track.name;
            }

            var list = "#initial_list";

            function clear(size) {
                var to_hide = [
                    "#audio_friends",
                    "#audio_search_filters",
                    "#audio_search_info",
                    "#audio_popular_filters",
                    "#more_link",
                    "#s_more_link"
                ];
                to_hide.forEach(function(elem) { $(elem).hide(); });

                $("#s_search").val("");
                $("#search_list").empty();
                $(list).empty();
                $("#audios_list").append($("<div>", {
                    style: "height: 400px;",
                    text: " ",
                }));
            }

            function create_fake(tracks) {
                $(list).empty();
                tracks.forEach(function(val) {
                    $(list).append($("<div>"));
                });
            }

            function set_on_position(vk_track, position) {
                var audio_div = $($(list).children()[position]);
                audio_div.replaceWith(vk_track);
            }

            var search_cache = {};

            function search(lfm_track, ready_fn) {
                var s = query_string(lfm_track);
                var query = {
                    act: 'search', q: s,
                    offset: 0, id: 0, gid: 0, performer: 0
                };

                ajax.post(Audio.address, query, {
                    onDone: function(res, preload, options) {
                        var tracks = $(res);
                        if (tracks.length) {
                            /// TODO: выбирать наиболее подходящий трек, а не первый
                            search_cache[s] = tracks[0];
                            ready_fn(tracks[0]);
                        }
                    },
                    onFail: function() {
                        console.warn("oh-my-audio:", "Audio request failed");
                    }
                });
            }

            var interval_id = undefined;

            function stop_search() {
                if (interval_id) {
                    clearInterval(interval_id);
                    interval_id = undefined;
                }
            }

            function start_search(queue_) {
                stop_search();

                var queue = queue_.slice(0);

                function search_next_track() {
                    while (true) {
                        if (queue.length == 0) {
                            stop_search();
                            return;
                        }

                        // pop the first element
                        var track = queue.shift();
                        var cached = search_cache[query_string(track)];

                        if (cached) {
                            set_on_position(cached, track.position);
                            continue;
                        }
                        else {
                            search(track, function(element) {
                                set_on_position(element, track.position);
                            });
                            return;
                        }
                    }
                }

                search_next_track();
                interval_id = setInterval(search_next_track, 400);
            }

            var cache = {};

            this.loader = function(fn) {

                var cached = cache[fn];

                return function() {
                    clear();

                    function make(tracks) {
                        tracks.forEach(function(val, idx) {
                            val.position = idx;
                        });
                        create_fake(tracks);
                        start_search(tracks);
                        cached = tracks;
                    }

                    if (cached == undefined || cached.length == 0) {
                        fn(make);
                    }
                    else {
                        make(cached);
                    }
                };
            };
        };

        function ChartsMenu(vk_page) {

            this.create_menu = function() {
                var items = [
                    vk_page.audio_menu_item(_("Popular on last.fm"), _("Tracks with the most listeners"), vk_audio.loader(lfm_api.top)),
                    vk_page.audio_menu_item(_("Loved on last.fm"), _("Tracks loved by the most listeners"), vk_audio.loader(lfm_api.loved)),
                    vk_page.audio_menu_item(_("Hyped on last.fm"), _("The fastest rising tracks"), vk_audio.loader(lfm_api.hyped)),
                ];
                items.forEach(function(item) { vk_page.append_to_main_menu(item); });
            }
        };

        dictionary["Popular on last.fm"] = {
            "ru": "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0435\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Популярное на last.fm
            "ua": "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0435\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Популярное на last.fm
        };
        dictionary["Loved on last.fm"] = {
            "ru": "\u041B\u044E\u0431\u0438\u043C\u043E\u0435\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Любимое на last.fm
            "ua": "\u041B\u044E\u0431\u0438\u043C\u043E\u0435\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Любимое на last.fm
        };
        dictionary["Hyped on last.fm"] = {
            "ru": "\u041D\u0430\u0431\u0438\u0440\u0430\u0435\u0442\u0020\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Набирает популярность на last.fm
            "ua": "\u041D\u0430\u0431\u0438\u0440\u0430\u0435\u0442\u0020\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C\u0020\u043D\u0430\u0020\u006C\u0061\u0073\u0074\u002E\u0066\u006D", // Набирает популярность на last.fm
        };
        dictionary["The fastest rising tracks"] = {
            "ru": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u0431\u044B\u0441\u0442\u0440\u043E \u043D\u0430\u0431\u0438\u0440\u0430\u044E\u0449\u0438\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C",
            "ua": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u0431\u044B\u0441\u0442\u0440\u043E \u043D\u0430\u0431\u0438\u0440\u0430\u044E\u0449\u0438\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C",
        };
        dictionary["Tracks with the most listeners"] = {
            "ru": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0441 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0435\u0439",
            "ua": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0441 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0435\u0439",
        };
        dictionary["Tracks loved by the most listeners"] = {
            "ru": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u044B \u043A\u0430\u043A \u043B\u044E\u0431\u0438\u043C\u044B\u0435 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0435\u0439",
            "ua": "\u041A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u044B \u043A\u0430\u043A \u043B\u044E\u0431\u0438\u043C\u044B\u0435 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0435\u0439",
        };

        function init() {
            var vk_page = new VKPage();
            var charts_menu = new ChartsMenu(vk_page);
            vk_page.change(function() { charts_menu.create_menu(); });

            charts_menu.create_menu();
        }

        init();
    }
    catch (e) {
        console.error(app, e);
    }
})();
