// ==UserScript==
// @name       music.me
// @description  Add music to mpd
// @version    0.6.1
// @namespace  http://uedsky.com/music
// @updateURL  http://userscripts.org/scripts/source/180770.meta.js
// @match      http://music.baidu.com/*
// @noframes
// @copyright  2013, Brook Yang
// ==/UserScript==

(function() {
    // function ajax(url, callback) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = function() {
    //         if(xhr.readyState == 4 && xhr.status == 200) {
    //             callback(xhr.responseText);
    //         }
    //     };
    //     xhr.open('GET', url, true);
    //     xhr.send(null);
    // }
    function ajax(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(res) {
                callback(res.responseText);
            }
        });
    }

    function each(obj, iterator) {
        // if (!obj) return;
        var i = 0, length = obj.length;
        if (length === +length) {
            for (; i < length; i++) {
                if (iterator.call(obj[i], i, obj[i], obj) === false) { break; }
            }
        } else {
            for (i in obj) {
                if (iterator.call(obj[i], i, obj[i], obj) === false) { break; }
            }
        }
    }
    
    function addStyle(css) {
        var head = document.head, style;
        style = document.createElement('style');
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    function bubble(conf, target, type) {
        if(typeof conf == 'string') {
            conf = { msg: conf, target: target, type: type || 'normal' };
        }
        var obj = document.getElementById('bubble');
        if(!obj) {
            obj = document.createElement('div');
            obj.id = 'bubble';
            obj.className = 'bubble css3-bubble bubble-bottom';
            addStyle('.bubble { position: absolute; z-index: 100001; font-size: 14px; line-height: 1.5; border: 1px solid #53a8c9; padding: 10px; min-width: 100px; border-radius: 5px; box-shadow: 0 0 5px 1px #dbf6ff; background: #FFF; background: -webkit-linear-gradient(bottom, #e8f5ff, #fff 20px); } /* css3-bubble */ .css3-bubble::before, .css3-bubble::after { content: ""; position: absolute; height: 0; width: 0; font-size: 0; border: 10px solid transparent; } /* css3-bubble bottom */ .css3-bubble.bubble-bottom::before, .css3-bubble.bubble-bottom::after { border-top-color: #53a8c9; top: 100%; left: 50%; margin-left: -10px; } .css3-bubble.bubble-bottom::after { border-top-color: #FFF; margin-top: -1px; }');
            document.body.appendChild(obj);
        }
        obj.innerHTML = conf.msg;
        obj.style.color = {
            'success': '#008000',
            'error': '#f00',
            'normal': '#666'
        }[conf.type];
        obj.style.display = 'block';
        var rect = conf.target.getBoundingClientRect();
        obj.style.left = rect.left + rect.width/2 - obj.offsetWidth/2 + 'px';
        obj.style.top = (rect.top + window.pageYOffset - obj.offsetHeight - 10) + 'px';

        conf.type == 'success' && setTimeout(function() {
            obj.style.display = 'none';
        }, 3000);
    }
    
    function play(src, act, target) {
        console.log(act, src);
        if(act == 'download') {
            bubble('Download started.', target, 'success');
            location.href = src;
        } else {
            ajax('http://music.me/playlist.php?act=' + act + '&src=' + encodeURIComponent(src), function(res) {
                res = JSON.parse(res);
                res.target = target;
                res.type = res.code === 0 ? 'success' : 'error';
                bubble(res);
            });
        }
    }
    
    function getSrc(id, act, target) {
        console.log('getSrc', act, id);
        bubble('Analysing music address...', target);
        ajax('/song/' + id + '/download', function(text) {
            var reg = new RegExp('.*href="/data/music/file\\?link=(http://[^"]+)"  id="\\d{3}"'), mat;
            mat = text.match(reg);
            if(!mat && (mat = text.match(new RegExp('来源链接：</span>[\\s\\S]*?(http://[^"]*)"')))) {
                if(mat[1].indexOf('http://pan.baidu.com/') === 0) {
                	return getPanSrc(mat[1].replace(/&amp;/g, "&"), act, target);
                } /* else {
                    // http://music.baidu.com/song/354387/download
                } */
            }
            if(mat) {
                play(mat[1], act, target);
            } else {
                console.log(text);
                // not implement
                bubble('Sorry, an error has occurred:<br/>Method not implement!', target, 'error');
            }
        });   
    }
    
    function getPanSrc(pansrc, act, target) {
        console.log('resolve', pansrc);
        // 解析 http://pan.baidu.com/share/link?...
        ajax(pansrc, function(html) {
            /* var res = html.match(/disk\.util\.ViewShareUtils\.viewShareData="(.*?)";disk\.util/);
            if(res) {
                res = res[1].replace(/\\(.)/g, '$1');
                play(JSON.parse(res).dlink, act, target);
            } */
            var res = (html.match(/installMusicPlayer\(\(?"([^"]+)"/) || [0, null])[1];
            res && play(res, act, target);
        });
    }
    
    function init(e) {
        var target = e.target;
        if(target.webkitMatchesSelector('.icon-play,.icon-add,.icon-download')) {
            e.preventDefault();
            e.stopPropagation();
            var id = JSON.parse(target.parentNode.dataset.musicicon).id;
            getSrc(id, target.dataset.action, target);
        }
    }
    console.log('init music.me global event');
    document.addEventListener('click', init, true);

    // 歌曲页面 http://music.baidu.com/song/*
    function initSong(e) {
        var target = e.target;

        var btn; each(btns, function() {
            if(this.contains(target)) { btn = this; return false; }
        });
        if(btn) {
            e.preventDefault();
            e.stopPropagation();
            var info = JSON.parse(btn.dataset.playdata || btn.dataset.adddata || btn.dataset.btndata),
            act = (info.moduleName || 'download').replace(/Btn$/, '');
            if(linksrc && linksrc.href.indexOf('http://pan.baidu.com/') === 0) {
                bubble('Analysing music address...', target);
                getPanSrc(linksrc.href, act, btn);
            } else {
                getSrc(info.id, act, btn);
            }
        }
    }
    if(location.pathname.match(new RegExp('^/song/\\d+/?$'))) {
        console.log('init music.me song event');
        var linksrc = document.querySelector('.link-src-info a');
        var btns = document.querySelectorAll('.play-btn, .add-song-btn, .down-song-btn');
        document.addEventListener('click', initSong, true);
    }
})();
