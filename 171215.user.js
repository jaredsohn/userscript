// ==UserScript==
// @name        YoutubeSubtitiles
// @namespace   com.manuskc.YoutubeSubtitiles
// @description Add subtitles to movies on youtube
// @include     *www.youtube.com/*
// @include     *youtube.com/*
// @version     1
// @grant       GM_info
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$(
    function () {

        function addJS_Node(text, s_URL, funcToRun, runOnLoad) {
            var D = document;
            var scriptNode = D.createElement('script');
            if (runOnLoad) {
                scriptNode.addEventListener("load", runOnLoad, false);
            }
            scriptNode.type = "text/javascript";
            if (text) scriptNode.textContent = text;
            if (s_URL) scriptNode.src = s_URL;
            if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

            var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);
        }

        function hasYoutubePlayer() {
            ytplayer = unsafeWindow.document.getElementById("movie_player");
            if (ytplayer !== null) {
                return true;
            }
            return false;
        }

        function getPlayTime() {
            youtubeplayer = unsafeWindow.document.getElementById("movie_player");

            state = youtubeplayer.getPlayerState();
            if (state == -1) {
                youtubeplayer.playVideo();
            }

            return youtubeplayer.getCurrentTime();
        }

        //Playing str is a modified version of lib - jquery.srt.js : http://v2v.cc/~j/jquery.srt/jquery.srt.js

        function toSeconds(t) {
            var s = 0.0
            if (t) {
                var p = t.split(':');
                for (i = 0; i < p.length; i++)
                    s = s * 60 + parseFloat(p[i].replace(',', '.'))
            }
            return s;
        }

        function strip(s) {
            return s.replace(/^\s+|\s+$/g, "").replace(/\n\s+\n/g, "\n\n");
        }

        function playSubtitles(subtitleElement, subTitleText) {
            var srt = subTitleText;
            srt = srt.replace(/\r\n|\r|\n/g, '\n')

            var subtitles = {};
            srt = strip(srt);
            var srt_ = srt.split('\n\n');
            for (s in srt_) {
                st = srt_[s].split('\n');
                if (st.length >= 2) {
                    n = st[0];
                    i = strip(st[1].split(' --> ')[0]);
                    o = strip(st[1].split(' --> ')[1]);
                    t = st[2];
                    if (st.length > 2) {
                        for (j = 3; j < st.length; j++)
                            t += '\n' + st[j];
                    }
                    is = toSeconds(i);
                    os = toSeconds(o);
                    subtitles[is] = {
                        i: i,
                        o: o,
                        t: t
                    };
                }
            }
            var currentSubtitle = -1;
            var ival = setInterval(function () {
                var currentTime = getPlayTime();
                var delay = parseInt($("#srt_delay").val(), 10);
                if(isNaN(delay)) {
                    delay = 0;
                    $("#srt_delay").text("0");
                }
                var subtitle = -1;
                for (s in subtitles) {
                    if ((s - delay) > currentTime)
                        break;
                    subtitle = s;
                }
                if (subtitle > 0) {
                    if (subtitle != currentSubtitle) {
                        subtitleElement.html(subtitles[subtitle].t);
                        currentSubtitle = subtitle;
                    } else if (subtitles[subtitle].o < currentTime) {
                        subtitleElement.html('');
                    }
                }
            }, 100);
        }


        $("<div style=\"display: block;font-size:30px;min-height:1em;position: fixed;bottom: 10px;background: rgba(50,50,50,0.5);width: 97%;margin: 10px;z-index: 2000;padding: 10px;color: rgb(220,220,220);text-align: center;\" id=\"ys_subtitles\"><input type=\"text\" style=\"font-size:30px;width:50%;\" id=\"srt_url_data\" placeholder=\"Please add url to srt file here and click check box\"/> <input type=\"checkbox\" id=\"str_url_added\" style=\"zoom:2;-moz-transform: scale(2);margin:5px;\" name=\"str_url_added\" value=\"yes\"/><label style=\"padding-left:10px;\" id=\"str_load_info\">Load subtitles</label><div class=\"srt\"></div><input title=\"Delay of subtitles in seconds, can be postive or negative\" type=\"text\" style=\"width:2.5em;position:absolute;right:3px;bottom:1px;\" placeholder=\"delay\" id=\"srt_delay\"/></div>")
            .appendTo("body");


        function startShowingSubtitles(subtitle_url) {
            $('.srt').each(function () {
                var subtitleElement = $(this);

                if (!hasYoutubePlayer()) return;
                var srtUrl = subtitle_url;
                if (srtUrl) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: srtUrl,
                        onload: function (response) {
                            $("#str_load_info").remove();
                            subtitleElement.text("");
                            playSubtitles(subtitleElement, response.responseText);
                        }
                    });
                } else {
                    return;
                }
            });
        }

        var checkStrUrl = setInterval(function () {
            var checkbox = $("#str_url_added");
            if (checkbox.is(':checked')) {
                var subtitle_url = $("#srt_url_data").val();
                if(subtitle_url != null && subtitle_url.length > 10) {
                    $("#srt_url_data").remove();
                    checkbox.remove();
                    $("#str_load_info").text("Loading...");
                    clearInterval(checkStrUrl);
                    startShowingSubtitles(subtitle_url);
                } else {
                    alert("Please provide proper url to load subtitle for the video.");
                    checkbox.prop('checked', false);
                }
            }
        }, 100);

    }
);