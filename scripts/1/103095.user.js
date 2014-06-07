// ==UserScript==
// @name           Nico share play
// @namespace      http://efcl.info/
// @description    ニコニコ動画の動画をGIGA SCHEMAに登録してシャッフルプレイ
// @include        http://www.nicovideo.jp/watch/*
// @require        https://gist.github.com/raw/845920/c9292901c242b8ff3b8bda362356dcd09de8cb5b/nicovideo_createPanel.js
// ==/UserScript==
// http://gigaschema.appspot.com/help
(function() {
    // http://gigaschema.appspot.com/azuciao/playshare
    var USER_NAME = "azuciao",
            SCHEME_NAME = "GM_shareplay";
    var isPlaying = GM_getValue("shareplay") || false;
    // ニコニコ大百科という名前のタブを作る (panel.id == nicopedia)
    var nicovideo_createPanel_res = nicovideo_createPanel('shareplay', 'SharePlay'),
            panel = nicovideo_createPanel_res.panel,
            label = nicovideo_createPanel_res.label;
    addCSS(document, 'ul.shareplayer li {'
            + '    list-style-type: none;'
            + '}'
            + 'ul.shareplayer li a {'
            + '    display: block;'
            + '    width: 300px;'
            + '    padding: 8px;'
            + '    border: 3px solid #fff;'
            + '    color: #fff;'
            + '    cursor: default;'
            + '    font-size: 24px;'
            + '    text-align: center;'
            + '    text-decoration: none;'
            + '    background-color: orange;'
            + '    text-shadow: 0px -1px 0px #ccc; /* FF3.5+, Opera 9+, Saf1+, Chrome */'
            + '    border-radius: .5em;'
            + '    -webkit-border-radius: .5em;'
            + '    -moz-border-radius: .5em;'
            + '    box-shadow: 0 0 5px rgba(0, 0, 0, .5);'
            + '    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .5);'
            + '    -moz-box-shadow: 0 0 5px rgba(0, 0, 0, .5);'
            + '}'
            + 'ul.shareplayer li.shareplayer_play a { background : #8EAC1A; }'
            + 'ul.shareplayer li.shareplayer_stop a { background : red; }'
            + 'ul.shareplayer li a:hover {'
            + '    box-shadow: 0 0 8px rgba(0, 0, 0, .8);'
            + '    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);'
            + '    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);'
            + '}'
            + 'ul.shareplayer li a.nonactive {'
            + '    background : #DDD;'
            + '}'
            + 'ul.shareplayer li a:after {'
            + '    content: "\00BB";'
            + '    padding-left: .5em;'
            + '}'
            + 'ul.shareplayer li a {'
            + '    -moz-transition: -moz-box-shadow .4s ease-out; /* FF3.7+ */'
            + '    -o-transition: box-shadow .4s ease-out; /* Opera 10.5 */'
            + '    -webkit-transition: -webkit-box-shadow .4s ease-out; /* Saf3.2+, Chrome */'
            + '    transition: box-shadow .4s ease-out;'
            + '}');
    var status_ul = document.createElement("ul"),
            status_li_play = document.createElement("li"),
            status_li_stop = document.createElement("li");
    addClassName(status_ul, "shareplayer");
    addClassName(status_li_play, "shareplayer_play");
    addClassName(status_li_stop, "shareplayer_stop");
    var status_li_play_a = document.createElement("a"),
            status_li_stop_a = document.createElement("a");
    status_li_play_a["textContent" || "innerText"] = "PLAY!"
    status_li_stop_a["textContent" || "innerText"] = "STOP!"
    // Next , STOP イベント
    status_li_play_a.addEventListener("click", function() {
        removeClassName(status_li_stop_a, "nonactive");
        startPlay()
    }, false);
    status_li_stop_a.addEventListener("click", function() {
        addClassName(status_li_stop_a, "nonactive");
        stopMovie();
    }, false);
    status_li_play.appendChild(status_li_play_a);
    status_li_stop.appendChild(status_li_stop_a);
    // 登録ボタンの追加
    if (isPlaying) {
        // addClassName(status_li_play_a, "nonactive");
        playMovie();
    } else {
        addClassName(status_li_stop_a, "nonactive");
        var submit_li = document.createElement("li");
        var submit_a = document.createElement("a");
        submit_a["textContent" || "innerText"] = "いいね!"
        submit_a.addEventListener("click", function() {
            status_ul.removeChild(submit_li);// 自爆する
            submitToSever();
        }, false);
        submit_li.appendChild(submit_a);
        status_ul.appendChild(submit_li);
    }
    status_ul.appendChild(status_li_play).appendChild(status_li_stop);
    panel.appendChild(status_ul);
    if (typeof GM_registerMenuCommand !== 'undefined') {
        GM_registerMenuCommand("Nico share play - トグル", function() {
            toggleSwitch();
            isPlaying ? playNext() : stopMovie();
        });
    }
    window.addEventListener('NicoSharePlay.record', function(ev) {
        // eventを受け取り
        // JSON.parse(ev.data)してobjectに変換
        // containerからdispatchしておくと,
        // ev.targetから対象のDOM Elementも送り付けられる
        recordData("value=" + ev.data, finishSubmit);
    }, false);
    window.addEventListener('NicoSharePlay.start', function(ev) {
        playMovie();
    }, false);
    window.addEventListener('NicoSharePlay.next', function(ev) {
        playNext();
    }, false);

    function finishSubmit(result) {
        // log(result);
    }

    function toggleSwitch() {
        isPlaying = isPlaying ? false : true;
        saveStatus();
    }

    function saveStatus() {
        GM_setValue("shareplay", isPlaying);
    }

    function stopMovie() {
        isPlaying = false;
        saveStatus();
        evalInPage(function() {
            clearInterval(window.sharePlayTImer);
        });
    }

    function playMovie() {
        if (!isPlaying) return;
        // console.log("wrapper is " + isWrapper);
        evalInPage(function(mode) {
            var player = document.getElementById("flvplayer");
            var isWrapper = (player.src.indexOf('flvplayer_wrapper.swf') !== -1);
            var playNext = function() {
                // Web ページ
                var request = document.createEvent("MessageEvent");
                request.initMessageEvent("NicoSharePlay.next", true, false,
                        location.href,
                        location.protocol + "//" + location.host,
                        "", window);
                document.dispatchEvent(request);
            }
            window.sharePlayTImer = window.setInterval(function() {
                var status = player.ext_getStatus();
                var playhead = player.ext_getPlayheadTime();
                if (status == "connectionError" || document.title == "Error?") {
                    clearInterval(window.sharePlayTImer);
                    player.style.display = "none";
                    //controller.reload(true);
                } else if (status == "end") {
                    clearInterval(window.sharePlayTImer);
                    playNext();
                }

                // console.log(status , playhead);
                if ((status == "paused" || status == "stopped") && playhead < 1) {// playheadは必ず0とは限らない
                    if (isWrapper) {
                        player.ext_play(1);
                        player.ext_setCommentVisible();
                        setTimeout(function() {
                            player.ext_setVideoSize('normal');
                            player.SetVariable('nico.player._video._visible', 0);
                        }, 1000);
                    } else {
                        player.ext_play(1);
                        // player.ext_setCommentVisible();
                    }
                }
            }, 3000);
        });
    }

    function startPlay() {
        isPlaying = true;
        saveStatus();
        playNext();
    }

    function playNext(vid) {
        if (vid) {
            location.href = "http://www.nicovideo.jp/watch/" + valueData.vid;
        } else {
            getRandomData(function(data) {
                var valueData = JSON.parse(data.value);
                location.href = "http://www.nicovideo.jp/watch/" + valueData.vid;
            });
        }
    }

    function submitToSever() {
        // Contextで実行して、取得内容をlistenしたところに送る
        evalInPage(function(args) {
            var send_data,
                    Video = window.Video;
            send_data = {
                "vid" : Video.id,
                "vtitle" : Video.title,
                "vlength": Video.length,
                "vlockedTags" : Video.lockedTags,
                "vtags" : Video.tags
            }
            // Web ページ
            var request = document.createEvent("MessageEvent");
            request.initMessageEvent("NicoSharePlay.record", true, false,
                    JSON.stringify(send_data),
                    location.protocol + "//" + location.host,
                    "", window);
            document.dispatchEvent(request);
        });
    }

    function evalInPage(fun) {
        location.href = "javascript:void (" + fun + ")()";
    }


    /**
     * randomなjsonデータを取得
     * @param callback
     */
    function getRandomData(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://gigaschema.appspot.com/" + USER_NAME + "/" + SCHEME_NAME + "/random.json", true);
        xhr.onload = function onload(evt) {
            callback(JSON.parse(xhr.responseText));
        }
        xhr.onerror = function onerror(evt) {
            GM_log(xhr.statusText + " : " + xhr.responseText);
        }
        xhr.send(null);
    }

    /**
     * GIGA SCHEMAにデータを保存する
     * @param data パラメータと値を=でつないで、パラメータごとに&でつないだもの
     * パラメータ    値
     value    データとして記録する値(複数可)
     group    データを取得する際に絞り込みに利用可能な任意の文字列
     */
    function recordData(data, callback) {
        if (!data) return;
        var xhr = new XMLHttpRequest(),
                sendBody = data;
        xhr.open('POST', "http://gigaschema.appspot.com/" + USER_NAME + "/" + SCHEME_NAME + ".json", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');// これないと500
        xhr.onload = function onload(evt) {
            callback(JSON.parse(xhr.responseText));
        }
        xhr.onerror = function onerror(evt) {
            GM_log(xhr.statusText + " : " + xhr.responseText);
        }
        xhr.send(sendBody);
    }

    function addCSS(context, css) {
        if (!context) context = document;
        if (context.createStyleSheet) { // for IE
            var sheet = context.createStyleSheet();
            sheet.cssText = css;
            return sheet;
        } else {
            var sheet = context.createElement('style');
            sheet.type = 'text/css';
            var _root = context.getElementsByTagName('head')[0] || context.documentElement;
            sheet.textContent = css;
            return _root.appendChild(sheet).sheet;
        }
    }
})();
function log(m) {
    var w = this.unsafeWindow || window;
    w.console && w.console.log.apply(this, arguments);
}