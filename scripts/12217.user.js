// ==UserScript==
// @name           Heat the nicovideo up
// @author         noriaki
// @namespace      http://blog.fulltext-search.biz/
// @description    Visualize comments upsurge for Nicovideo
// @license        MIT License
// @version        0.3.0
// @released       2007-09-11 09:00:00
// @updated        2007-12-11 13:00:00
// @compatible     Greasemonkey
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * The MIT License (--> or Public Domain)
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license (Japanese)
*/

(function(){

    var COLOR_MAP = [
        '#060026', '#0f0082', '#181395', '#214dd6',
        '#3b8cd2', '#36b9d3', '#34c5a5', '#41cc27',
        '#8fd104', '#bfd70e', '#c8ab0b', '#c38509',
        '#c65706', '#c22404', '#c51b20', '#c51b20'
    ];
    var detail = false;


    if(detail) {
        var WIDTH = 2;
        var DIVISION = 82;
    } else {
        var WIDTH = 3;
        var DIVISION = 55;
    }

    var WIDTH_ = WIDTH;
    var VIDEO_LENGTH;

    var $ = function(id){ return unsafeWindow.document.getElementById(id); };
    var $$ = unsafeWindow.$$;
    var Element = unsafeWindow.Element;

    if(!document.getElementsByTagName('h1')[0]) return;

    Element.scrollTo($$("p.TXT12").first());

    function heat_map() {
        var output = document.createElement('div');
        output.id = 'heat_output';
        output.innerHTML = '<p>Loading...</p>';

        if(!$('WATCHFOOTER')) return;
        $('WATCHFOOTER').parentNode.insertBefore(output, $('WATCHFOOTER'));

        var flvplayer = $('flvplayer');
        flvplayer.get = function(target) {
            return this.GetVariable(target);
        };

        var video_info = flvplayer.get('o').split('&').inject({}, parseQueryString);

        var thread_id = video_info.thread_id;
        var vlsec = VIDEO_LENGTH = video_info.l;
        var url = video_info.ms;
        var download_url = video_info.url;
        GM_xmlhttpRequest({
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey (Heat the Nicovideo up)',
                'Content-type': 'text/xml'
            },
            url: url,
            data: '<thread res_from="-1000" version="20061206" thread="' + thread_id + '" />',
            onload: function(res){ extract(res); },
            onerror: function(res){ GM_log(res.status + ':' + res.responseText); }
        });

        function extract(res) {
            var responseXML = (new DOMParser).parseFromString(res.responseText, "application/xml");
            var comments = responseXML.getElementsByTagName('chat');
            var counts = new Array(DIVISION).fill(0);
            if(/^sm(\d+)$/.test(unsafeWindow.video_id)) {
                var sm_video_id = RegExp.$1;
            } else {
                var message = document.createElement('p');
                message.id = 'heat_message';
                message.innerHTML = 'Sorry, this video is unsupported.'
                output.innerHTML = '';
                output.appendChild(message);
                return;
            }
            var vlmsec = vlsec.to_i() * 100;
            for(var i = 0, len = comments.length; i < len; i++) {
                var pmsec = comments[i].getAttribute('vpos');
                if(vlmsec > pmsec) {
                    counts[~~(pmsec / vlmsec * DIVISION)]++;
                } else if(vlmsec == pmsec){
                    counts[DIVISION-1]++;
                }
            }
            var max = counts.max();
            var per_msec = vlmsec / DIVISION;
            var color_map_size = COLOR_MAP.length - 1;
            output.innerHTML = '';
            for(var i = 0, len = counts.length; i < len; i++){
                var start_msec = per_msec * i;
                var end_msec = start_msec + per_msec - 1;

                var span = document.createElement('span');
                var index = ~~(counts[i] * color_map_size / max);
                var color = COLOR_MAP[index];
                var comment_info_header = 'コメント数:';
                var comment_info_html = ['<span class="heat_level', index, '">',
                    counts[i], '</span>'].join('');
                var comment_info_footer = [
                    '(', (~~(to_min(start_msec))).z(2), ':',
                    (~~(to_sec(start_msec) % 60)).z(2), '〜',
                    (~~(to_min(end_msec))).z(2), ':',
                    (~~(to_sec(end_msec) % 60)).z(2), ')'].join('');
                span.style.color = color;
                span.style.backgroundColor = color;
                span.title = comment_info_header + counts[i] + comment_info_footer;
                span.innerHTML = comment_info_header + comment_info_html + comment_info_footer;
                span.setAttribute('class', i);
                output.appendChild(span);
            }

            var message = document.createElement('p');
            message.setAttribute('id', 'heat_message');
            message.innerHTML = 'Comment Heat Map for nicovideo 　おまけ機能→';

            var heat_comments_info = document.createElement('p');
            heat_comments_info.setAttribute('id', 'heat_info');
            var info_message = '色の上にマウスを乗せるとコメント数を表示します．';
            heat_comments_info.innerHTML = info_message;
            heat_comments_info.setAttribute('title', info_message);

            var reload_link = document.createElement('a');
            reload_link.id = 'heat_reload_link';
            reload_link.appendChild(document.createTextNode('再読込み'));
            reload_link.title = 'Reload Comment Heat Map'
            Element.buttonize(reload_link, function() {
                Element.remove(output);
                heat_map();
            });

            var filter_link = document.createElement('a');
            filter_link.setAttribute('id', 'heat_filter_link');
            filter_link.setAttribute('title', '設定されているフィルター一覧を表示する（ネタバレ注意）');
            filter_link.appendChild(document.createTextNode('フィルター'));
            Element.buttonize(filter_link, function() {
                Element.toggle(filter_list)
            });

            /*            var relational_video = document.createElement('a');
            relational_video.setAttribute('id', 'heat_relational_video');
            relational_video.setAttribute('title', 'この動画を見た人は，こんな動画も見ています');
            relational_video.appendChild(document.createTextNode('関連動画'));
            Element.buttonize(relational_video, function() {
                Element.remove(relational_video);
            });
*/
            var download_link = document.createElement('a');
            download_link.setAttribute('id', 'heat_download_link');
            download_link.setAttribute('title', '動画をダウンロードする');
            download_link.appendChild(document.createTextNode('動画ダウンロード'));
            Element.buttonize(download_link, function() {});
            download_link.setAttribute('href', download_url);

            output.appendChild(reload_link);
            output.appendChild(heat_comments_info);
            if(WIDTH == WIDTH_) {
                message.appendChild(download_link);
                message.appendChild(filter_link);
                //              message.appendChild(relational_video);
                output.appendChild(message);
            };

            setSpanWidth();

            var filter_list = document.createElement('div');
            filter_list.setAttribute('id', 'heat_filter_list');
            Element.setStyle(filter_list, {
                display: 'none',
                top: output.offsetHeight + 10 + 'px',
                left: filter_link.offsetLeft + 'px'
            });
            if(video_info.ng_up) {
                var filter_words = video_info.ng_up.split('&');
                var filters = ['<h3>フィルター一覧</h3>'];
                filters.push('<ul>');
                for(var i=0,length=filter_words.length; i<length; i++) {
                    var filter = filter_words[i].split('=');
                    filters.push('<li><a href="javascript:void(0);" title="');
                    filters.push(decodeURIComponent(filter[1]));
                    filters.push('" onclick="$(\'flvplayer\').SetVariable(\'ChatInput.text\', \'');
                    filters.push(decodeURIComponent(filter[0]));
                    filters.push('\'); return false;">');
                    filters.push(decodeURIComponent(filter[0]));
                    filters.push('</a></li>');
                }
                filters.push('</ul>');
                filters = filters.join('');
            } else {
                var filters = '<h3>フィルターは設定されていません</h3>';
            }
            var close = document.createElement('a');
            close.appendChild(document.createTextNode('x'));
            close.setAttribute('title', '閉じる');
            close.setAttribute('href', 'javascript:void(0);');
            Element.addClassName(close, 'heat_close');
            close.addEventListener('click', function() {
                Element.hide(this.parentNode);
            }, false);
            filter_list.innerHTML = filters;
            filter_list.appendChild(close);
            message.appendChild(filter_list);

            var max_comment_num = document.createElement('p');
            max_comment_num.setAttribute('id', 'heat_max_comment_num');
            max_comment_num.innerHTML = max;
            var min_comment_num = document.createElement('p');
            min_comment_num.setAttribute('id', 'heat_min_comment_num');
            min_comment_num.innerHTML = '0';
            output.appendChild(max_comment_num);
            output.appendChild(min_comment_num);

            $('heat_max_comment_num').title = $$('span.heat_level'+color_map_size).first().parentNode.title;
        }

        function to_hour(msec) {
            return(to_min(msec) / 60);
        }

        function to_min(msec) {
            return(to_sec(msec) / 60);
        }

        function to_sec(msec) {
            return(msec / 100);
        }

        function parseQueryString(hash, pair) {
            if ((pair = pair.split('='))[0]) {
                var name = decodeURIComponent(pair[0]);
                var value = pair[1] ? decodeURIComponent(pair[1]) : undefined;

                if (hash[name] !== undefined) {
                    if (hash[name].constructor != Array)
                        hash[name] = [hash[name]];
                    if (value) hash[name].push(value);
                }
                else hash[name] = value;
            }
            return hash;
        }

        Element.buttonize = function(elem, func) {
            Element.addClassName(elem, 'button');
            elem.setAttribute('href', 'javascript:void(0);');
            elem.addEventListener('mouseout', function() {
                Element.removeClassName(elem, 'click');
            }, false);
            elem.addEventListener('mousedown', function() {
                Element.addClassName(elem, 'click');
            }, false);
            elem.addEventListener('mouseup', function() {
                Element.removeClassName(elem, 'click');
            }, false);
            elem.addEventListener('click', func, false);
        }

        unsafeWindow.fitPlayerToWindow = function() {
            var seek_width = window.innerWidth - 339 - 77;
            WIDTH = seek_width / (DIVISION - 1);
            setSpanWidth();
            $("flvplayer").setStyle({width: "100%", height: "100%"});
            var player_height = $('PAGEBODY').offsetHeight - $('heat_output').offsetHeight - 1 + 'px';
            $('flvplayer_container').setStyle({height: player_height});
        }

        unsafeWindow.toggleMaximizePlayer = function() {
            if (unsafeWindow.playerMaximized) {
                unsafeWindow.restorePlayer();
                $('heat_output').style.paddingLeft = '79px';
                WIDTH = WIDTH_;
                setSpanWidth();
                $('heat_message').show();
            } else {
                $('heat_message').hide();
                $('heat_output').style.paddingLeft = '77px';
                unsafeWindow.maximizePlayer();
            }
            commentsCountArea($('heat_info'), $$('span.0').first());
            unsafeWindow.playerMaximized = !unsafeWindow.playerMaximized;
        }

    }

    function commentsCountArea(node, span) {
        node.innerHTML = span.innerHTML;
        var position_x = -8 + WIDTH / 2 + span.getAttribute('class').to_i() * WIDTH;
        node.style.backgroundPosition = position_x + 'px 0px';
        node.style.color = span.style.color;
        node.style.display = 'block';
    }

    function setSpanWidth() {
        $$('#heat_output > span').each(function(node) {
            node.setStyle({width: WIDTH + 'px'});
            /*node.addEventListener('mouseover', function(){
                commentsCountArea($('heat_info'), node);
                }, false);*/
        });
    }

    function wait_ready() {
        var vlsec = $('flvplayer').GetVariable('ContentLength');
        if(typeof vlsec == 'undifined') return 0;
        var interval = vlsec / DIVISION / 10;
        if(interval > 1) interval = 1;
        return interval;
    }

    function follow_seek_bar() {
        var vlsec = $('flvplayer').GetVariable('ContentLength');
        if(typeof vlsec == 'undefined') return;
        var percent_video_moving = $('flvplayer').GetVariable('moved_time') / vlsec;
        var spans = $$('span.' + ~~(percent_video_moving * DIVISION));
        if(spans.size() == 0) return;
        commentsCountArea($('heat_info'), spans.first());
    }

    var PE = unsafeWindow.PeriodicalExecuter;
    new PE(function() {
        var frequency = wait_ready();
        if(frequency > 0) {
            this.callback = follow_seek_bar;
            this.frequency = frequency;
            heat_map();
        }
    }, 0.5);

    Array.prototype.fill = function(v){
        for(var i=0,l=this.length;i<l;this[i++]=v);
        return this
    }

    Array.prototype.max = function(){
        return Math.max.apply(null,this)
    }

    Array.prototype.inject = function(memo, iterator) {
        for (var i = 0, length = this.length; i < length; i++)
            memo = iterator(memo, this[i], i);
        return memo;
    }

    String.prototype.to_i = function(){
        return parseInt(this, 10)
    }

    Number.prototype.z = function(len){
        if(Math.pow(10,len) <= this) return this.toString();
        var s = '0'.fill(len) + this.toString();
        return s.substr(s.length - len);
    };
    String.prototype.fill = function(len){
        var result = '';
        for(var i = 0; i < len; i++){
            result += this;
        }
        return result;
    };

    function UpdateChecker() {};
    UpdateChecker.prototype = {
        script_name: 'Heat the nicovideo up',
        script_url: 'http://blog.fulltext-search.biz/files/heatthenicovideoup.user.js',
        current_version: '0.3.0',
        more_info_url: 'http://blog.fulltext-search.biz/pages/visualize-comments-upsurge-greasemonkey-script-for-nicovideo',

        remote_version: null,

        // Render update information in HTML
        render_update_info: function() {
            var newversion = document.createElement('div');
            newversion.setAttribute('id', 'gm_update_alert');
            var update_message = document.createElement('p');
            update_message.innerHTML = [
                '現在お使いのGreasemonkeyスクリプト \'',
                this.script_name,
                '(var. ', this.current_version, ')',
                '\' は新しいバージョン ',
                this.remote_version,
                ' が公開されています．アップデートしますか？'
            ].join('');

            var update_link = document.createElement('a');
            update_link.setAttribute('id', 'gm_update_alert_link');
            update_link.setAttribute('href', this.script_url);
            update_link.addEventListener('click', function() {
                var update_alert = document.getElementById('gm_update_alert');
                update_alert.parentNode.removeChild(update_alert);
            }, false);
            update_link.innerHTML =
                '[Yes]今すぐアップデートする';

            if(this.more_info_url) {
                var more_link = document.createElement('a');
                more_link.setAttribute('href', this.more_info_url);
                more_link.innerHTML = '（詳細情報）';
                update_message.appendChild(more_link);
            }

            var close_link = document.createElement('a');
            close_link.setAttribute('href', 'javascript:void(0);');
            close_link.addEventListener('click', function() {
                GM_setValue('last_check_day', new Date().days_since_start());
                var update_alert = document.getElementById('gm_update_alert');
                update_alert.parentNode.removeChild(update_alert);
            }, false);
            close_link.innerHTML = [
                '[No]今はアップデートしない（日付が変わるまで有効）'
            ].join('');

            var scroll_link = document.createElement('a');
            if(/(.*?)\#/.test(document.location)) {
                scroll_link.href = RegExp.$1 + '#gm_update_alert';
            } else {
                scroll_link.href = document.location + '#gm_update_alert';
            }
            scroll_link.innerHTML = '（ページ最上部に\'Comment Heat Map for nicovideo\'からのお知らせがあります）';

            newversion.appendChild(update_message);
            newversion.appendChild(update_link);
            newversion.appendChild(close_link);
            document.body.appendChild(newversion);
            $('WATCHFOOTER').parentNode.insertBefore(scroll_link, $('WATCHFOOTER'));
        },

        add_update_info_style: function() {
            GM_addStyle(<><![CDATA[
                /* style(like CSS) for update information */
                #gm_update_alert {
                    padding: 5px 0pt;
                    background-color: #FFF280;
                    color: #CC0099;
                    width: 100%;
                    position: absolute;
                    z-index: 99;
                    top: 0px;
                    left: 0px;
                    text-align: center;
                    font-size: 11px;
                    font-family: Tahoma;
                }

                #gm_update_alert p {
                    margin: 0pt;
                }

                #gm_update_alert a:link {
                    color: #333333;
                }

                #gm_update_alert > a:link {
                    margin: 0.5em 1em 0pt 1em;
                }

                #gm_update_alert p + a:link {
                    font-weight: bold;
                }
            ]]></>);
        },

        // Check script update remote
        check_update: function() {
            if(!this.has_need_for_check) return;
            var user_script = this;
            GM_xmlhttpRequest({
                method: 'GET',
                url: this.script_url,
                onload: function(res) {
                    user_script.remote_version = user_script.check_version(res.responseText);
                    if(user_script.remote_version && user_script.remote_version > user_script.current_version) {
                        user_script.add_update_info_style();
                        user_script.render_update_info();
                    } else {
                        GM_setValue('last_check_day', new Date().days_since_start());
                    }
                },
                onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
            });
        },

        // Check the necessity for update: [Boolean]
        // return [true] if necessary
        has_need_for_check: function() {
            var last_check_day = GM_getValue('last_check_day');
            var current_day = new Date().days_since_start();
            if(typeof last_check_day == 'undefined' || current_day > last_check_day) {
                return true;
            } else {
                return false;
            }
        },

        // Check version in remote script file: [String]
        check_version: function(string) {
            if(/\/\/\s?@version\s+([\d.]+)/.test(string)) {
                return RegExp.$1;
            } else {
                return null;
            }
        }

    };

    Date.prototype.days_since_start = function() {
        var DAYS_IN_MONTH = [31,59,90,120,151,181,212,243,273,304,334,365];
        return(this.getYear() * 365 + DAYS_IN_MONTH[this.getMonth()] + this.getDate());
    };

    //instantiate and run
    GM_addStyle(<><![CDATA[
        #heat_output {
            padding: 5px 1em 3px 79px;
            font-size: 80%;
            border: 1px solid #333;
            background: #FFFFFF url('http://blog.fulltext-search.biz/images/gm/thermograph.png') no-repeat scroll 10px 5px;
            position: relative;
            min-height: 85px;
        }
        #heat_output > span {
            display: block;
            height: 1.4em;
            float: left;
            cursor: default;
            overflow: hidden;
        }
        #heat_output a.button {
            margin-left: 1em;
            padding: 0pt 0.5em;
            text-decoration: none;
            border: 2px solid #444;
        }
        #heat_output a.button:link,
        #heat_output a.button:visited {
            border-left: 1px solid #999;
            border-top: 1px solid #999;
        }
        #heat_output a.button.click {
            border: 2px solid #444;
            border-right: 1px solid #999;
            border-bottom: 1px solid #999;
        }
        #heat_output a.heat_close {
            background-color: #f88;
            border: 1px solid #fff;
            color: #fff;
            font-weight: bold;
            line-height: 1;
            padding: 0.18em 0.25em;
            position: absolute;
            right: 4px;
            text-decoration: none;
            top: 4px;
        }
        #heat_info {
            clear: left;
            margin: 2px 0pt 5px;
            padding-top: 18px;
            font-weight: bold;
            background: #fff url('http://blog.fulltext-search.biz/images/gm/up_silver.png') no-repeat;
            height: 2.8em;
        }
        #heat_info span {
            color: #333;
            margin: 0pt 0.2em;
        }
        #heat_info span.heat_level0 { font-size: 80%; }
        #heat_info span.heat_level1 { font-size: 85%; }
        #heat_info span.heat_level2 { font-size: 90%; }
        #heat_info span.heat_level3 { font-size: 95%; }
        #heat_info span.heat_level4 { font-size: 100%; }
        #heat_info span.heat_level5 { font-size: 105%; }
        #heat_info span.heat_level6 { font-size: 110%; }
        #heat_info span.heat_level7 { font-size: 115%; }
        #heat_info span.heat_level8 { font-size: 120%; }
        #heat_info span.heat_level9 { font-size: 130%; }
        #heat_info span.heat_level10 { font-size: 140%; }
        #heat_info span.heat_level11 { font-size: 150%; }
        #heat_info span.heat_level12 { font-size: 170%; }
        #heat_info span.heat_level13 { font-size: 200%; }
        #heat_info span.heat_level14 { font-size: 230%; }
        #heat_info span.heat_level15 { font-size: 280%; }
        #heat_max_comment_num, #heat_min_comment_num {
            font-size: 10px;
            position: absolute;
            padding-left: 35px;
            left: 0px;
        }
        #heat_max_comment_num {
            top: 5px;
        }
        #heat_min_comment_num {
            top: 77px;
        }
        #heat_filter_list {
            position: absolute;
            width: 300px;
            border: #3a3 1px solid;
            z-index: 4;
            background-color: #eee;
            padding: 0.5em 10px;
        }
        #heat_filter_list ul {
            margin: 5px 0;
            padding: 0;
            font-family: Tahoma, Arial, Helvetica, sans-serif;
            font-size: 13px;
            line-height: 1.5;
        }
        #heat_filter_list ul li {
            margin: 0 5px 3px 0;
            padding: 0;
            display: inline;
            font-size: 100%;
            list-style: none;
        }
        #heat_filter_list ul li a {
            text-decoration: none;
            border: #aaa 1px solid;
            padding: 2px;
            background-color: #fff;
        }
        #heat_filter_list ul li a:hover {
            background-color: #333;
            color: #fff;
        }
    ]]></>);

    var user_script = new UpdateChecker();
    user_script.check_update();

})();
