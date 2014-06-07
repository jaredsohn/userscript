// ==UserScript==
// @name Fork_YkAntiADs
// @author Harv&atmouse
// @description 视频去黑屏, 优酷土豆转mp4，部分f4v需要浏览器播放插件支持
// @version 0.2.6.4
// @include http://*/*
// @include https://*/*
// @grant GM_xmlhttpRequest
// ==/UserScript==

// source from: https://userscripts.org/scripts/source/119622.user.js
(function () {
    Function.prototype.bind = function () {
        var fn = this,
        args = Array.prototype.slice.call(arguments),
        obj = args.shift();
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
    function YoukuAntiAds() {
    }
    YoukuAntiAds.prototype = {
        _players: null,
        _rules: null,
        _done: null,
        get players() {
            if (!this._players) {
                this._players = {
                    //'youku_loader' : 'file:///home/atmouse/Downloads/loader.swf',
                    //'youku_player' : 'file:///home/atmouse/Downloads/player.swf',
                    'youku_loader': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/loader.swf',
                    'youku_player': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/player.swf',
                    'ku6': 'http://haoutil.googlecode.com/svn/trunk/player/ku6.swf',
                    'iqiyi': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/iqiyi.swf',
                    'iqiyi5': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/iqiyi5.swf',
                    'iqiyi_out': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/iqiyi_out.swf',
                    'tudou': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/tudou.swf',
                    'tudou_olc': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/olc_8.swf',
                    'tudou_sp': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/sp.swf',
                    'letv': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/letv.swf'
                };
            }
            return this._players;
        },
        get rules() {
            if (!this._rules) {
                this._rules = {
                    'youku_loader': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/(loader|player).*\.swf/i,
                        'replace': this.players['youku_loader']
                    },
                    'youku_player': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/q?player[^\.]*\.swf(\?.*)?/i,
                        'replace': this.players['youku_loader'] + '$2'
                    },
                    'youku_out': {
                        'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
                        'replace': this.players['youku_loader'] + '?showAd=0&VideoIDS=$1'
                    },
                    'ku6': {
                        'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
                        'replace': this.players['ku6']
                    },
                    'ku6_out': {
                        'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
                        'replace': this.players['ku6_out'] + '?vid=$2'
                    },
                    'iqiyi': {
                        'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i,
                        'replace': this.players['iqiyi']
                    },
                    'iqiyi_out': {
                        'find': /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
                        'replace': this.players['iqiyi_out'] + '?vid=$3'
                    },
                    'tudou': {
                        'find': /^http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
                        'replace': this.players['tudou']
                    },
                    'tudou_out': {
                        'find': /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
                        'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
                    },
                    'letv': {
                        'find': /http:\/\/.*letv[\w]*\.com\/(.*\/(?!live)((v2)?[\w]{4}|swf)player[^\.]*|[\w]*cloud)\.swf/i,
                        'replace': this.players['letv']
                    },
                    'letv_out': {
                        'find': /http:\/\/.*letv\.com\/player\/swfplayer\.swf(\?.*)/i,
                        'replace': this.players['letv'] + '$1'
                    }
                }
            }
            return this._rules;
        },
        get done() {
            if (!this._done) {
                this._done = new Array();
            }
            return this._done;
        },
        initPreHandlers: function () {
            var L = function (a, c) {
                var b = new Date;
                this._sid = b.getTime() + '' + (1000 + b.getMilliseconds()) + '' + (parseInt(9000 * Math.random()) + 1000);
                this._seed = a.seed;
                this._fileType = c;
                b = new M(this._seed);
                this._streamFileIds = a.streamfileids;
                this._videoSegsDic = {
                };
                for (c in a.segs) {
                    for (var e = [
                    ], g = 0, d = 0; d < a.segs[c].length; d++) {
                        var j = a.segs[c][d],
                        q = {
                        };
                        q.no = j.no;
                        q.size = j.size;
                        q.seconds = j.seconds;
                        j.k && (q.key = j.k);
                        q.fileId = this.getFileId(a.streamfileids, c, parseInt(d), b);
                        q.type = c;
                        q.src = this.getVideoSrc(j.no, a, c, q.fileId);
                        e[g++] = q
                    }
                    this._videoSegsDic[c] = e
                }
            };
            var M = function (a) {
                this._randomSeed = a;
                this.cg_hun()
            };
            M.prototype = {
                cg_hun: function () {
                    this._cgStr = '';
                    for (var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890', c = a.length, b = 0; b < c; b++) {
                        var e = parseInt(this.ran() * a.length);
                        this._cgStr += a.charAt(e);
                        a = a.split(a.charAt(e)) .join('')
                    }
                },
                cg_fun: function (a) {
                    for (var a = a.split('*'), c = '', b = 0; b < a.length - 1; b++) c += this._cgStr.charAt(a[b]);
                    return c
                },
                ran: function () {
                    this._randomSeed = (211 * this._randomSeed + 30031) % 65536;
                    return this._randomSeed / 65536
                }
            };
            L.prototype = {
                getFileId: function (a, c, b, e) {
                    for (var g in a) if (g == c) {
                        streamFid = a[g];
                        break
                    }
                    if ('' == streamFid) return '';
                    c = e.cg_fun(streamFid);
                    a = c.slice(0, 8);
                    b = b.toString(16);
                    1 == b.length && (b = '0' + b);
                    b = b.toUpperCase();
                    c = c.slice(10, c.length);
                    return a + b + c
                },
                getVideoSrc: function (a, c, b, e, g, d) {
                    if (!c.videoid || !b) return '';
                    var j = this._sid,
                    q = {
                        flv: 0,
                        flvhd: 0,
                        mp4: 1,
                        hd2: 2,
                        '3gphd': 1,
                        '3gp': 0
                    }
                    [
                        b
                    ],
                    i = {
                        flv: 'flv',
                        mp4: 'mp4',
                        hd2: 'flv',
                        '3gphd': 'mp4',
                        '3gp': 'flv'
                    }
                    [
                        b
                    ],
                    k = a.toString(16);
                    1 == k.length && (k = '0' + k);
                    var l = c.segs[b][a].seconds,
                    a = c.segs[b][a].k;
                    if ('' == a || - 1 == a) a = c.key2 + c.key1;
                    b = '';
                    c.show && (b = c.show.show_paid ? '&ypremium=1' : '&ymovie=1');
                    return 'http://f.youku.com' + ('/player/getFlvPath/sid/' + j + '_' + k + '/st/' + i + '/fileid/' + e + '?K=' + a + '&hd=' + q + '&myp=0&ts=' + l + '&ypp=0' + b + ((g ? '/password/' + g : '') + (d ? d : '')))
                }
            };
            var URLToArray = function(url) {
                    var request = {
                    };
                    var pairs = url.substring(url.indexOf('?') + 1) .split('&');
                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i].split('=');
                        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                    }
                    return request;
            };
            this.rules['iqiyi']['preHandle'] = function (elem, find, replace, player) {
                if (document.querySelector('span[data-flashplayerparam-flashurl]')) {
                    replace = this.players['iqiyi5'];
                }
                this.reallyReplace.bind(this, elem, find, replace) ();
            }
            this.rules['iqiyi_out']['preHandle'] = function (elem, find, replace, player) {
                var match = player.match(/(autoplay)=[^&]+/gi);
                if (match) {
                    replace += '&' + match.join('&');
                }
                this.reallyReplace.bind(this, elem, find, replace) ();
            }
            this.rules['tudou']['preHandle'] = function (elem, find, replace, player) {
                console.log("==> todou preHandle");
                objn = elem.getElementsByTagName('param');
                for (n in objn) {
                    if (objn[n].name == 'flashvars') {
                        st_array = URLToArray(decodeURIComponent(objn[n].value));
                        vcode = st_array["vcode"];
                        icode = st_array["icode"];
                        segs = st_array["segs"];
                    }
                }
                var fn = this;
                if (typeof vcode == 'string' && vcode != ""){
                    console.log(vcode + ' got');
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://v.youku.com/player/getPlayList/VideoIDS/'+vcode+'/timezone/+08/version/5/source/out/Sc/2?ctype=60&password=&n=3&ev=1',
                        onload: function (response) {
                            console.log('xmlhttpRequest OK');
                            json_data = JSON.parse(response.responseText);
                            videoinfo = new L(json_data.data[0], 'mp4');
                            videomp4 = videoinfo._videoSegsDic['mp4'];
                            videoflv = videoinfo._videoSegsDic['flv'];
                            if (typeof videomp4 === 'object') {
                                console.log('got mp4video!: ' + vcode);
                                tracks = new Array();
                                for (n in videomp4) {
                                    tracks.push(videomp4[n].src);
                                }
                                elem.setAttribute('tracks', tracks.join());
                                elem.setAttribute('curpos', 0);
                                elem.setAttribute('r-type', "yk_mp4");
                                replace = videomp4[0].src;
                            }else if (typeof videoflv === 'object'){
                                console.log('got flvvideo!: ' + vid);
                                elem.setAttribute('r-type', "yk_flv");
                                elem.setAttribute('type', "video/flv");
                                replace = videoflv[0].src;
                            }
                            else{
                                    console.log("no video");
                            };
                            fn.reallyReplace.bind(fn, elem, find, replace) ();
                        }
                    });
                }else if (typeof icode == 'string' && icode != ""){
                    console.log("==> tudou segs");
                    console.log(segs);
                    json_data = JSON.parse(segs);
                    k = String(json_data["2"]["0"].k);
                    console.log(k);
                    if (typeof k == 'string' && k != ""){
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://v2.tudou.com/f?id='+k+'&sid=11000&hd=3&sj=1&areaCode=350100',
                            onload: function (response) {
                                console.log("xmlhttpRequest OK");
                                var responseXML = null;
                                // Inject responseXML into existing Object (only appropriate for XML content).
                                if (!response.responseXML) {
                                  responseXML = new DOMParser()
                                    .parseFromString(response.responseText, "text/xml");
                                }
                                video_url=responseXML.children[0].innerHTML;
                                console.log(video_url);
                                replace=video_url;
                                elem.type="video/flv";
                                fn.reallyReplace.bind(fn, elem, find, replace) ();
                            }
                        });
                        
                        }
                    }
                else{
                    fn.reallyReplace.bind(fn, elem, find, replace) ();
                };
            }
            this.rules['tudou_out']['preHandle'] = function (elem, find, replace, player) {
                var fn = this;
                icode = URLToArray(decodeURIComponent(player)).icode ||
                        (player.match(/^http:\/\/www\.tudou\.com\/v\/([a-zA-Z_=]+)\/.*(\/v\.swf)?/i) && player.match(/^http:\/\/www\.tudou\.com\/v\/([a-zA-Z_=]+)\/.*(\/v\.swf)?/i)[1]);
                code = URLToArray(decodeURIComponent(player)).code;
                if (typeof icode == 'string' && icode != "") {
                    console.log("tudouout, icode "+icode);
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: "http://www.tudou.com/v/"+icode+"/&autoPlay=true&icode="+icode+"&iid=131729790/v.swf",
                        onload: function (response) {
                            if (response.finalUrl){
                                console.log("finalUrl: "+response.finalUrl);
                                //console.log(response.responseText);
                                vcode = URLToArray(decodeURIComponent(response.finalUrl)).vcode ||
                                        (response.responseText.match(/(?=vcode).*(.{13})\';/i) && response.responseText.match(/(?=vcode).*(.{13})\';/i)[1]);
                                icode = URLToArray(decodeURIComponent(response.finalUrl)).icode;
                                if (typeof vcode == 'string' && vcode != ""){
                                    console.log(vcode + ' vcode got');
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url: 'http://v.youku.com/player/getPlayList/VideoIDS/'+vcode+'/timezone/+08/version/5/source/out/Sc/2?ctype=60&password=&n=3&ev=1',
                                        onload: function (response) {
                                            console.log('xmlhttpRequest OK');
                                            json_data = JSON.parse(response.responseText);
                                            videoinfo = new L(json_data.data[0], 'mp4');
                                            videomp4 = videoinfo._videoSegsDic['mp4'];
                                            videoflv = videoinfo._videoSegsDic['flv'];
                                            if (typeof videomp4 === 'object') {
                                                console.log('got mp4video!: ' + vcode);
                                                tracks = new Array();
                                                for (n in videomp4) {
                                                    tracks.push(videomp4[n].src);
                                                }
                                                elem.setAttribute('tracks', tracks.join());
                                                elem.setAttribute('curpos', 0);
                                                elem.setAttribute('r-type', "yk_mp4");
                                                replace = videomp4[0].src;
                                            }else if (typeof videoflv === 'object'){
                                                console.log('got flvvideo!: ' + vid);
                                                elem.setAttribute('r-type', "yk_flv");
                                                elem.setAttribute('type', "video/flv");
                                                replace = videoflv[0].src;
                                            }
                                            else{
                                                    console.log("no video");
                                            };
                                            fn.reallyReplace.bind(fn, elem, find, replace) ();
                                        }
                                    });
                                } else {//use icode, maybe f4v;
                                    console.log("in tudou out: icode: "+icode);
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url: "http://www.tudou.com/outplay/goto/getItemSegs.action?areaCode=&code="+icode,
                                        onload: function (response) {
                                            console.log("xmlhttpRequest OK");
                                            console.log(response.responseText);
                                            json_data=JSON.parse(response.responseText);
                                            k = String(json_data["2"]["0"].k);
                                            console.log("==> tudou items: "+json_data);
                                            if (typeof k == 'string' && k != ""){
                                                GM_xmlhttpRequest({
                                                    method: 'GET',
                                                    url: 'http://v2.tudou.com/f?id='+k+'&sid=11000&hd=3&sj=1&areaCode=350100',
                                                    onload: function (response) {
                                                        console.log("xmlhttpRequest OK");
                                                        var responseXML = null;
                                                        // Inject responseXML into existing Object (only appropriate for XML content).
                                                        if (!response.responseXML) {
                                                          responseXML = new DOMParser()
                                                            .parseFromString(response.responseText, "text/xml");
                                                        }
                                                        video_url=responseXML.children[0].innerHTML;
                                                        console.log("video_url: "+video_url);
                                                        replace=video_url;
                                                        console.log(elem.type);
                                                        if (elem.type){
                                                            elem.setAttribute('type', "video/flv");
                                                            elem.setAttribute('src', video_url);
                                                            console.log("sssssssss start relalyReplace");
                                                            fn.reallyReplace.bind(fn, elem, find, replace)();
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                    
                                }

                            }
                        }
                    });
                }
                else if (typeof code == 'string' && code != ""){
                    console.log("==> todou code");
                }
                else {
                    console.log("==> tudou no icode found");
                    var isFx = /firefox/i.test(navigator.userAgent);
                    GM_xmlhttpRequest({
                        method: isFx ? 'HEAD' : 'GET',
                        url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"https://haoutil.googlecode.com/svn/trunk/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
                        onload: function (response) {
                            var finalUrl = (isFx ? response.finalUrl : response.responseText);
                            var match = finalUrl.match(/(iid|youkuid|resourceid|autoplay|snap_pic)=[^&]+/gi);
                            if (match && !/error/i.test(finalUrl)) {
                                replace += '&' + match.join('&');
                                fn.reallyReplace.bind(fn, elem, find, replace) ();
                            }
                        }
                    });
                }
            }
            this.rules['youku_loader']['preHandle'] = function (elem, find, replace, player) {
                console.log("==> in youku_loader's preHandle");
                objn = elem.getElementsByTagName('param');
                for (n in objn) {
                    if (objn[n].name == 'flashvars') {
                        if (typeof (URLToArray(decodeURIComponent(objn[n].value)) .VideoIDS) == 'string') {
                            vid = URLToArray(decodeURIComponent(objn[n].value)) .VideoIDS;
                        }
                    }
                }
                var fn = this;
                if (typeof vid == 'string'){
                    console.log(vid + ' got');
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://v.youku.com/player/getPlaylist/VideoIDS/' + vid + '/Pf/4?callback=',
                        onload: function (response) {
                            console.log('xmlhttpRequest OK');
                            json_data = JSON.parse(response.responseText);
                            videoinfo = new L(json_data.data[0], 'mp4');
                            videomp4 = videoinfo._videoSegsDic['mp4'];
                            videoflv = videoinfo._videoSegsDic['flv'];
                            if (typeof videomp4 === 'object') {
                                console.log('got mp4video!: ' + vid);
                                tracks = new Array();
                                for (n in videomp4) {
                                    tracks.push(videomp4[n].src);
                                }
                                elem.setAttribute('tracks', tracks.join());
                                elem.setAttribute('curpos', 0);
                                elem.setAttribute('r-type', "yk_mp4");
                                replace = videomp4[0].src;
                            }else if (typeof videoflv === 'object'){
                                console.log('got flvvideo!: ' + vid);
                                elem.setAttribute('r-type', "yk_flv");
                                elem.setAttribute('type', "video/flv");
                                replace = videoflv[0].src;
                                }
                            else{
                                    console.log("no video");
                            };
                            fn.reallyReplace.bind(fn, elem, find, replace) ();
                        }
                    });
                }else{
                    fn.reallyReplace.bind(fn, elem, find, replace) ();
                };
            }
            this.rules['youku_out']['preHandle'] = function (elem, find, replace, player) {
                console.log("==> youku out");
                vid = player.match(find) [1];
                var fn = this;
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://v.youku.com/player/getPlaylist/VideoIDS/' + vid + '/Pf/4?callback=',
                    onload: function (response) {
                        console.log('xmlhttpRequest OK');
                        json_data = JSON.parse(response.responseText);
                        videoinfo = new L(json_data.data[0], 'mp4');
                        videomp4 = videoinfo._videoSegsDic['mp4'];
                        videoflv = videoinfo._videoSegsDic['flv'];
                        if (typeof videomp4 === 'object') {
                            console.log('got mp4video!: ' + vid);
                            tracks = new Array();
                            for (n in videomp4) {
                                tracks.push(videomp4[n].src);
                            }
                            elem.setAttribute('tracks', tracks.join());
                            elem.setAttribute('curpos', 0);
                            elem.setAttribute('r-type', "yk_mp4");
                            replace = videomp4[0].src;
                        }else if (typeof videoflv === 'object'){
                            console.log('got flvvideo!: ' + vid);
                            elem.setAttribute('r-type', "yk_flv");
                            elem.setAttribute('type', "video/flv");
                            replace = videoflv[0].src;
                            }
                        else{
                                console.log("no video");
                        };
                        fn.reallyReplace.bind(fn, elem, find, replace) ();
                    }
                });
            }
            
        },
        addAnimations: function () {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = 'object,embed,iframe{-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;-ms-animation-duration:.001s;-ms-animation-name:playerInserted;-o-animation-duration:.001s;-o-animation-name:playerInserted;animation-duration:.001s;animation-name:playerInserted;}@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}'
            ;
            document.getElementsByTagName('head') [0].appendChild(style);
        },
        animationsHandler: function (e) {
            if (e.animationName === 'playerInserted') {
                this.replace(e.target);
            }
        },
        replace: function (elem) {
            if (this.done.indexOf(elem) != - 1) return ;
            this.done.push(elem);
            var player = elem.data || elem.src;
            if (!player) return ;
            var i,
            find,
            replace,
            isReplacing = false;
            for (i in this.rules) {
                find = this.rules[i]['find'];
                if (find.test(player)) {
                    replace = this.rules[i]['replace'];
                    if ('function' === typeof this.rules[i]['preHandle']) {
                        isReplacing = true;
                        this.rules[i]['preHandle'].bind(this, elem, find, replace, player) ();
                    }
                    if (!isReplacing) {
                        this.reallyReplace.bind(this, elem, find, replace) ();
                    }
                    break;
                }
            }
        },
        reallyReplace: function (elem, find, replace) {
            elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
            /* youku_out as mp4 */
            if (elem.getAttribute('r-type') == "yk_mp4" ) {
                elem_new = document.createElement('video');
                elem_new.setAttribute('tracks', elem.getAttribute('tracks'));
                elem_new.setAttribute('curpos', elem.getAttribute('curpos'));
                elem_new.setAttribute('type', 'video/mp4');
                elem_new.setAttribute('controls', '');
                elem_new.setAttribute('width', '100%');
                elem_new.setAttribute('height', '100%');
                elem_new.setAttribute('src', elem.src || elem.data);
                //alert(elem_new.outerHTML);
                elem.type = 'video/mp4';
                this.replacePlugin(elem, elem_new);
            } else {
                this.reloadPlugin(elem);
            }
        },
        reloadPlugin: function (elem) {
            var nextSibling = elem.nextSibling;
            var parentNode = elem.parentNode;
            parentNode.removeChild(elem);
            var newElem = elem.cloneNode(true);
            this.done.push(newElem);
            if (nextSibling) {
                parentNode.insertBefore(newElem, nextSibling);
            } else {
                parentNode.appendChild(newElem);
            }
        },
        replacePlugin: function (elem, elem_new) {
            var nextSibling = elem.nextSibling;
            var parentNode = elem.parentNode;
            parentNode.removeChild(elem);
            var newElem = elem_new.cloneNode(true);
            this.done.push(newElem);
            if (nextSibling) {
                parentNode.insertBefore(newElem, nextSibling);
            } else {
                parentNode.appendChild(newElem);
            }
            newElem.addEventListener('ended', function () {
                if (newElem.getAttribute('tracks') != null) {
                    newElem.t = newElem.getAttribute('tracks') .split(',');
                    //newElem.t = JSON.parse(JSON.stringify(newElem.getAttribute('tracks')));
                    newElem.pre_pos = newElem.getAttribute('curpos');
                    newElem.pos = parseInt(newElem.pre_pos) + 1;
                    if (newElem.t[newElem.pos]) {
                        newElem.src = newElem.t[newElem.pos];
                        newElem.setAttribute('curpos', newElem.pos);
                        newElem.play();
                    }
                }
            })
        },
        init: function () {
            this.initPreHandlers();
            var handler = this.animationsHandler.bind(this);

            document.body.addEventListener('webkitAnimationStart', handler, false);
            document.body.addEventListener('msAnimationStart', handler, false);
            document.body.addEventListener('oAnimationStart', handler, false);
            document.body.addEventListener('animationstart', handler, false);

            this.addAnimations();
        }
    };
    new YoukuAntiAds() .init();
}) ();
