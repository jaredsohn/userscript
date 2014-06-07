// ==UserScript==
// @name        doubanfm-html5
// @namespace   com.ifree.common
// @description doubanfm html5
// @include /^https?://douban.fm/?$/
// @include http://douban.fm/
// @version     1
// @grant       none
// ==/UserScript==
window.addEventListener('load',function(){
(function($, ui) {
    var root = this,
        btnPause,
        btnLove,
        btnBan,
        btnSkip,
        barProgress,
        lblTime,
        lblTitle,
        lblAlbum,
        lblSongName,
        pauseOverlay,
        imgCover,
        lnkCover,
        symbLove,
        player,
        commandProxy,
        fmDoc;
    var fm = {
        init: function() {
            this.running = true;
            player = new AudioPlayer();
            root.document.querySelectorAll('.player-wrap')[0].innerHTML = ui;
            fmDoc = $('.player-wrap > svg'),
            btnPause = fmDoc.find('#btn-pause'),
            btnLove = fmDoc.find('#btn-like'),
            btnBan = fmDoc.find('#btn-del'),
            btnSkip = fmDoc.find('#btn-next'),
            symbLove = fmDoc.find('#symb-like'),
            lnkCover = fmDoc.find('#cover'),
            imgCover = fmDoc.find('#cover-img'),
            pauseOverlay = fmDoc.find('#pause-overlay'),
            barProgress = fmDoc.find('#bar-progress'),
            lblTitle = fmDoc.find('#lbl-title'),
            lblSongName = fmDoc.find('#songname'),
            lblTime = fmDoc.find('#time'),
            lblAlbum = fmDoc.find('#lbl-album');

            //behavior
            [btnPause,
                btnLove,
                btnBan,
                btnSkip,
                pauseOverlay,
                lnkCover
            ].forEach(function(e, i) {
                e[0].onmouseenter = fadeOut;
                e[0].onmouseout = fadeIn;
            });

            lnkCover[0].onmouseout = hide;
            //event
            [btnPause,
                btnLove,
                btnBan,
                btnSkip,
                lnkCover,
                pauseOverlay
            ].map(
                function(e, i) {
                    e[0].onmouseup = [fm.pause,
                        fm.love,
                        fm.ban,
                        fm.skip,
                        fm.detail,
                        fm.pause
                    ][i];
                }
            );

            var that = this;

            //external interface
            commandProxy = $('<xx id="radioplayer">').appendTo('body')[0];
            commandProxy.act = function() {
                that.extControl.apply(that, Array.prototype.slice.apply(arguments));
            };
            commandProxy.selectedLike = function() {
                that.love();
            };
            commandProxy.isPaused = function() {
                return !player.isPlaying();
            };

            player.on('playing', function() {
                var song = player.currentSong;
                imgCover.attr('xlink:href', song.picture);
                if (song.like)
                    symbLove.attr('fill', '#ee0000');
                else
                    symbLove.attr('fill', '#000000');
                lblTitle.text(song.artist);
                lblAlbum.text('<' + song.albumtitle + '> ' + song.pubtime);
                lblSongName.text(song.title);
            })
                .on('timeupdate', function() {
                    that.onProgress();
                });
            player.channel = RED_HEART_CHANNEL;
            player.init();
            
        },
        pause: function() {
            if (fm.running) {
                fm.running = false;
                pauseOverlay.css('display', '');
            } else {
                fm.running = true;
                pauseOverlay.css('display', 'none');
            }
            player.pause();
        },
        love: function() {
            player.currentSong.like = !player.currentSong.like;
            if (player.currentSong.like) {
                symbLove.attr('fill', '#ee0000');
                player.like();
            } else {
                symbLove.attr('fill', '#000000');
                player.unlike();
            }
            //broadcast like
        },
        ban: function() {
            player.ban();
        },
        skip: function() {
            player.skip();
        },
        detail: function() {
            root.open('http://douban.com/' + player.currentSong.album, '_blank');
        },
        channelSwitch: function(cid, tags, aid) {
            player.setChannel(cid, tags, aid);
        },
        onProgress: function() {
            var leftTime = parseInt(player.delegate.duration) - parseInt(player.delegate.currentTime);
            var m = Math.floor(leftTime / 60) % 60;
            var s = leftTime % 60;
            var timeFormat = m + ':' + s;
            var ratio = player.delegate.currentTime / player.delegate.duration;
            if (!isNaN(leftTime))
                lblTime.text(timeFormat);
            if (!isNaN(ratio)) {
                barProgress[0].setAttribute('width', $('#bar-progress-bg')[0].getAttribute('width') * ratio);

            }

        },
        extControl: function() {
            var args = arguments.length > 0 ? arguments[0] : '';
            switch (args) {
                case 'pause':
                    {
                        this.pause();
                        break;
                    }
                case 'skip':
                    {
                        this.skip();
                        break;
                    }
                case 'love':
                    {
                        this.love();
                        break;
                    }
                case 'ban':
                    {
                        this.ban();
                        break;
                    }
                case 'switch':
                    {
                        if (arguments.length > 1) {
                            this.channelSwitch(arguments[1], arguments.length > 2 ? (arguments[2]) : (''), arguments.length > 3 ? (arguments[3]) : (''));
                            break;
                        }
                    }
                default:
                    {
                        break;
                    }
            }
        }
    };



    //audio play stuff
    var PLAYOUT = 'p';
    var PLAYED = 'e';
    var LIKE = 'r';
    var BAN = 'b';
    var UNLIKE = 'u';
    var NEW = 'n';
    var SKIP = 's';
    var SUBTYPE_AD = 'T';
    var ADTYPE_AUDIO = '3';
    var ADTYPE_VIDEO = '4';
    var START = 'start';
    var NEW_LIST = 'nl';
    var LIST_ZERO_ERROR = 'lze';
    var LIST_PARSE_ERROR = 'lpe';
    var LIST_SERVER_ERROR = 'lse';
    var LIST_SERVER_WARN = 'lsw';
    var LIST_IOERROR = 'lioe';
    var CHANNEL_OFFLINE_ERROR = '2';
    var PERSONAL_CHANNEL = '0';
    var RED_HEART_CHANNEL = '-3';
    var PERSONAL_HIGH_CHANNEL = '-4';
    var PERSONAL_EASY_CHANNEL = '-5';
    var RED_HEART_HIGH_CHANNEL = '-6';
    var RED_HEART_EASY_CHANNEL = '-7';
    var RED_HEART_TAGS_CHANNEL = '-8';
    var PERSONAL_TAGS_CHANNEL = '-9';
    var RAND = 'Pr';
    var SESSION = 'Ps';

    function AudioPlayer() {
        var that = this;
        this.delegate = new Audio();
        this.LISTURL = 'http://douban.fm/j/mine/playlist';
        this.requesturl = '';
        this.playlist = [];
        this.channel = '';
        this.tags = '';
        this.context = '';
        this.artistid = '';
        this.currentSong = null;
        this.pauseTime = 0;
        this.startNew = false;
        this.delegate.addEventListener('ended', function() {
            that.onStatus(PLAYED);
            that.skip();
        });
    }

    AudioPlayer.prototype.onStatus = function(status) {
        if (status == PLAYED) {
            var repurl = this.LISTURL +
                '?type=e&sid=' +
                this.currentSong.sid +
                '&channel=' +
                this.channel +
                '&pt=' + (this.delegate.currentTime).toFixed(1) +
                '&from=firefox' +
                '&r=' + new Date().getTime();
            $.getJSON(repurl); //report played
        } else {
            this.load(status); //report status
        }
        if ([LIKE, UNLIKE, BAN, SKIP].indexOf(status) != -1) {
            this.playlist = [];
        }
    };

    AudioPlayer.prototype.on = function(event, handler) {
        this.delegate.addEventListener(event, handler);
        return this;
    };

    AudioPlayer.prototype.un = function(event, handler) {
        this.delegate.removeEventListener(event, handler);
        return this;
    };

    AudioPlayer.prototype.init = function() {
        root.document.body.appendChild(this.delegate);
        this.startNew = true;
        this.load(NEW);
    };

    AudioPlayer.prototype.setChannel = function(channel, tags, artistId) {
        this.channel = channel;
        this.tags = tags;
        this.artistid = artistId;
        if (this.isPlaying()) {
            this.playlist = [];
            this.startNew = true;
            this.load(NEW);
        }
    };

    AudioPlayer.prototype.load = function(type) {
        this.playlist = [];
        var that = this;
        var sid = this.currentSong ? this.currentSong.sid : '';
        this.requesturl =
            this.LISTURL +
            '?type=' + type +
            '&from=firefox' + //a walkaround that skip url hash to decrease script size
        '&sid=' + sid +
            '&pt=' + (this.delegate.currentTime).toFixed(1) +
            '&channel=' + this.channel +
            '&r=' + new Date().getTime();
        var contexts = [];
        if (this.channel === RED_HEART_TAGS_CHANNEL || this.channel === PERSONAL_TAGS_CHANNEL || this.channel === PERSONAL_CHANNEL) {
            contexts.push('tags:' + this.tags);
        }
        if (this.channel === PERSONAL_CHANNEL && this.artistid !== '') {
            contexts.push('artist_id:' + this.artistid);
        }
        if (this.context !== '') {
            contexts.push(this.context);
            this.context = '';
        }
        if (contexts.length) {
            this.requesturl += '&context=' + contexts.join('|');
        }
        if (this.currentSong) {
            this.requesturl += '&pb=' + this.currentSong.kbps; //dont be eval
        }
        this.requesturl = Format.signUrl(this.requesturl);
        console.log('loading', this.requsturl);
        $.getJSON(this.requesturl, function(data) {
            var i = 0,
                song;
            while (i < data.song.length) {
                song = data.song[i];
                that.playlist.push({
                    sid: song['sid'],
                    url: song['url'],
                    ssid: song['ssid'],
                    artist: song['artist'] || '',
                    title: song['title'],
                    picture: song['picture'].replace('/mpic/', '/lpic/').replace('//otho.', '//img3.'),
                    album: song['album'],
                    albumtitle: song['albumtitle'],
                    like: song['like'] == '1',
                    subtype: song['subtype'],
                    adtype: song['adtype'],
                    len: (song['length']),
                    kbps: song['kbps'] || '',
                    monitor_url: song['monitor_url'] || '',
                    pubtime: song['public_time'] || '',
                    extrainfo: song['alg_info'] || ''
                });
                i++;
            }
            if (that.startNew) {
                that.startNew = false;
                that.skip();
            }
        });
    };

    AudioPlayer.prototype.play = function() {
        this.currentSong = this.playlist.shift();
        this.delegate.src = this.currentSong.url;
        this.delegate.load();
        this.delegate.play();
    };

    AudioPlayer.prototype.pause = function() {
        if (this.delegate.paused) {
            this.delegate.play();
            if ((new Date().getTime() - this.pauseTime) / 1000 > 60 * 30) {
                this.playList = []; //clear list if wait too long
            }
        } else {
            this.pauseTime = new Date().getTime();
            this.delegate.pause();
        }
    };

    AudioPlayer.prototype.isPlaying = function() {
        return !this.delegate.paused && !this.delegate.ended;
    };


    AudioPlayer.prototype.skip = function() {
        if (this.playlist.length < 1) {
            that.startNew = true;
            this.load(PLAYOUT);
        } else
            this.play();
        this.onStatus(SKIP);
    };

    AudioPlayer.prototype.ban = function() {
        this.onStatus(BAN);
        if (this.playlist.length < 1)
            this.load(PLAYOUT);
        else
            this.play();
    };

    AudioPlayer.prototype.like = function() {
        this.currentSong.like = true;
        this.startNew = false;
        this.onStatus(LIKE);
    };

    AudioPlayer.prototype.unlike = function() {
        this.currentSong.like = false;
        this.startNew = false;
        this.onStatus(UNLIKE);
    };

    var Format = {
        signUrl: function(url) {
            console.log(url);
            return url; // + (url.indexOf("?") == -1 ? ("?") : ("&")) + "r=" + Format.md5(url + "fr0d0").substr(-10);
        }
    };
    //https://github.com/blueimp/JavaScript-MD5


    function fadeIn(e) {
        e.currentTarget.setAttribute('opacity', 1);
    }

    function fadeOut(e) {
        e.currentTarget.setAttribute('opacity', .5);
    }

    function hide(e) {
        e.currentTarget.setAttribute('opacity', 0);
    }
    fm.init();

})(jQuery /*douban enable jQuery by default*/ , '<svg width="510" height="245" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
<defs>\
        <pattern patternUnits="userSpaceOnUse" x="0" y="0" width="72" height="13" patternTransform="matrix(1,0,0,1,90,117)" id="view-album">\
         <rect id="svg_1" x="0" y="0" width="72" height="13" fill="rgba(0,0,0,0)"/>\
         <g id="svg_2">\
         <image id="svg_3" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAANCAYAAAAKeCiYAAAFLklEQVR4nI2Xxy90bRjGebUEUcZanUisEIalPthakFgRJSN2oo2yFAy22tjrS90oK9Fmr47Yqv/CN7+TXJPHeb3JdyUn5znPuZ+7l3Oi/vz5E2UiOjr6xzomJuafz3boXW5urtO+9xvv/8PzN3o7b+2ZfNLS0hz2ffOsifz8fOe/3v1ggLMgPDw8DNgVMYUPDQ15uYS5uTnfwcFBYH5+3r+xsbE1ODjoFT/dY2NjrXVzc3PL5OSkD/7aM2VrLxiG3jU0NLgHBga8IyMjltzh4WFvb2+vx7SB/aamphZ44Jyjo6NAVlZWJFCmPdILmxxhXFxcBJOTkx2mjZE1gmCm6+TkJPD19fV9fHwcEPb29qx9hMTFxUW5wqitrXXX1NS4Uayzs9NSFuNEI7A3PT3tw+nwf319DT09PYXgu7u7G9C+6HHe1dVV8P7+PoRMzvb391uBqKqqciMXcM40BB7l5eWWXlxdXV2e7e3tLWirq6vdlZWVbtNJHx8f35yBz/n5eeDs7CxAkC8vL4PIsjvV8mp2drZzYWHBj4Kzs7M+mNozDOAwHAjz7zC463l/f99al5WVuf4SEga8MzIyHOJnZpcwMzPjI+31TObc3NwEFUQ5Vefq6+vdS0tL/ra2Ng/ZRQbrTgA5L6NlC/xwOGcrKircrOvq6tyjo6NeAhLJIBmNx4kqTsJAKTo1NeXLyclxipboIFwK3N3dhUh/FOEZ8MwFfXd3t4c96KF5fn4OqUSh5+rr6/P29PR4JINIFhUVudApPT3dQQaQrchmrexNTEx0QL++vr4Ff4ySQ3iWLvC39zn0kE4qXYCjf7QIlMCbpDKCFQ08ijIIwGH0FpxHZJW29InW1tYWegRnucsQgJCSkhIXe/Db3NzcIjq8Yw9IZnFxsQuFCgsLXZQZvDAAmeiDDgoMa/YKCgqcahEYiDw5k2xgDeAVZcPj42PIzDIFdXFx0Y/DIoTOMCgDXtJk5UlSjT0YQWdOJuAJ4+3t7ZtoU3K6A9aKgEqMcqC85Fwco55Co1Qm08RxwPX1dZBeReAwVg5CJ2RwDnr6X0sYijrOghYduFPyrBMSEn5MO4Kr4HDJoSpP9IlkHQd5sby87Fe5aGqQiqKRETRp0joUhpmiiggG2CNGJuF4KSB8fn5+yzjJUSZAxzPK0xuVEay5845LtKY88TGDJOeA9/f3SJNWTwO3t7dBZeMPRjJQpaLoEklzKhExmNFoeafmRlortYmanb+MMRUmIL4wRKumm5eX50QX5BB9+BIoDQPWyiBABsjJmsDKJEAQTD3I2NTUVAe6UkGcVZ9NSUmx9v+aYDiIEkCJnZ0da6wjhCllRqaxsdFN47Qro0tTDKfap58/jPb2dg/CyQJ9Hpi0lPbExISPcmdAcJZswQjR0Me4+N7hWZ8brDX+TbBnNmnO6tuK7CPY9Fho2F9bW9si462A0VvIAkadgAd1wUA9wz6yNQlUMupfZomZZ4jO+Pi49+XlJXR6ehrQuP8NMoApSOAo6dXV1S2M5ezKyoqfTMMos8QeHh6ssh8bG4tMSfVRwOcH51nDn54nPXEKWU0CMLiSkpIcVnRgBvAsh9QMzW8IKWB+szBJcKIaLoryTOTj4+MjdGY/EDo6Ojw0YWWBfQzDC70k02yaGM178aUnMo1Z4ziVusofo1XalFJmZqaTZ5yF41XKrEtLS12Sb7YWCxhl7xN2/PZvpf8p+wcfe+ZnvSA684PR/CczZZs8tc/oV5mb+/qSFyTbbov9/9PUIYz/AHow3faA0qw/AAAAAElFTkSuQmCC" height="13" width="72"/> \
         </g>\
        </pattern>\
        <pattern patternUnits="userSpaceOnUse" x="0" y="0" width="26" height="26" id="pause">\
         <rect id="svg_7" x="0" y="0" width="26" height="26" fill="rgba(0,0,0,0)"/>\
         <g id="svg_8">\
         <image id="svg_9" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAKklEQVR42mOYe+0oFRHDqHEjzbj/ MEBQcNS4UeNGjSPLuNECatQ4GhoHAL/aDwWLXToQAAAAAElFTkSuQmCC" height="26" width="26"/>\
         </g>\
        </pattern>\
</defs>\
<g>\
        <title>douban fm</title>\
        <g>\
         <!--album-->\
         <g >\
<image id="cover-img" x="0" y="0" width="245" height="245" xlink:href="" />\
         </g>\
         <g id="cover" opacity="0">\
         <g id="svg_13" fill-rule="evenodd">\
         <path id="svg_14" d="m186.95,137l0,-26l-122.05,0l0,26l122.05,0" fill="rgba(60,60,60,0.5019607843137255)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
         <g id="svg_15" transform="matrix(1.1395263671875,0,0,5.6976776123046875,0,0)" opacity="0">\
         <g id="svg_16"/>\
         <g id="svg_17" transform="matrix(10.75,0,0,2.149993896484375,0,0)" fill-rule="evenodd">\
                <path id="svg_18" d="m20,0l-20,0l0,20l20,0l0,-20" fill="rgba(255,255,255,1)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
         </g>\
         <g id="svg_19" fill-rule="evenodd">\
         <path id="svg_20" d="m162,130l0,-13l-72,0l0,13l72,0" fill="url(#view-album)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
         </g>\
        </g>\
        <g id="svg_21" style="display:none">\
         <g id="svg_22">\
         <path id="svg_23" d="m0,0l245,0l0,245l-245,0l0,-245z" fill="rgba(0,0,0,1)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
        </g>\
        <g id="album-right" transform="matrix(1, 0, 0, 1, 290, 70)">\
         <!--song right-->\
         <text font-size="12px" id="lbl-album" transform="matrix(1,0,0,1,-2,-2)">song info</text>\
        </g>\
        <g id="svg_24" transform="matrix(1, 0, 0, 1, 266, 26)">\
         <!--title-->\
         <text font-size="23px" id="lbl-title" transform="matrix(1,0,0,1,20,20)">title</text>​​​​​</g>\
        <g id="btn-like" transform="matrix(1, 0, 0, 1, 340, 190)">\
         <!--like-->\
         <g id="svg_44" fill-rule="evenodd">\
         <path id="symb-like" d="m24.2,1.8l0,0q-2.05,-1.8 -5.15,-1.8q-2.1,0 -3.7,1.15l-2.3,2.25l-2.3,-2.25q-1.65,-1.15 -3.75,-1.15q-3.05,0 -5.1,1.8q-2.75,2.4 -2.7,7.25q0.05,4 4.3,7.85l4.4,3.6l5.15,4.5q3.55,-3.4 9.5,-8.1q4.3,-3.85 4.35,-7.85q0.05,-4.85 -2.7,-7.25" fill="rgba(50,50,50,1)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
        </g>\
        <g id="btn-del" transform="matrix(1,0,0,1,402.95,187)">\
         <!--delete-->\
         <g id="svg_46" fill-rule="evenodd">\
         <path id="svg_47" d="m22,4.9l0,0l-5.65,0l0,-2.25q0,-1.05 -0.75,-1.8q-0.8,-0.75 -1.8,-0.75l-5.6,0q-1,0 -1.8,0.75q-0.75,0.75 -0.75,1.8l0,2.25l-5.65,0l0,3.1l22,0l0,-3.1m-8.05,0l0,0l-5.9,0l0,-2.25q0,-0.4 0.4,-0.4l5.1,0q0.4,0 0.4,0.4l0,2.25m-6.9,7.65l0,0q0.25,-0.3 0.65,-0.3q0.4,0 0.7,0.3l0.3,0.7l0,9.9l-0.3,0.75l-0.7,0.3l-0.65,-0.3q-0.3,-0.3 -0.3,-0.75l-0.05,0l0,-9.9l0.05,0q0,-0.4 0.3,-0.7m6.2,0.7l0,0q0,-0.4 0.3,-0.7q0.3,-0.3 0.7,-0.3q0.4,0 0.7,0.3l0.35,0.7l0,9.9l-0.35,0.75q-0.3,0.3 -0.7,0.3l-0.7,-0.3q-0.3,-0.3 -0.3,-0.75l0,-9.9m6.75,-4.25l0,0l-18,0l0,15.65q0,1.4 0.95,2.35q0.95,1 2.3,1l11.45,0q1.35,0 2.3,-1q1,-0.95 1,-2.35l0,-15.65" fill="rgba(50,50,50,1)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
        </g>\
        <g id="btn-next" transform="matrix(1,0,0,1,457,194)">\
         <!--next-->\
         <g id="svg_48" fill-rule="evenodd">\
         <path id="svg_49" d="m0.85,-0.05l-0.45,-0.05q-0.15,0.1 -0.15,0.4l0,17.15q0,0.3 0.15,0.4l0.45,-0.05l14.9,-8.6q0.55,-0.35 0,-0.65l-14.9,-8.6" fill="rgba(51,51,51,1)" stroke-width="0" stroke-dashoffset="0"/>\
         <path id="svg_50" d="m14.8,-0.05l-0.4,-0.05q-0.15,0.1 -0.15,0.4l0,17.15q0,0.3 0.15,0.4l0.4,-0.05l14.75,-8.6q0.5,-0.35 0,-0.65l-14.75,-8.6" fill="rgba(51,51,51,1)" stroke-width="0" stroke-dashoffset="0"/>\
         <path id="svg_51" d="m31.25,17.25l0,-16.75l-2.95,0l0,16.75l2.95,0" fill="rgba(51,51,51,1)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
        </g>\
        <g id="btn-pause" transform="matrix(1, 0, 0, 1, 472, 0)">\
         <!--pause-->\
         <g id="svg_52" fill-rule="evenodd">\
         <path id="svg_53" d="m0,0l0,26l26,0l0,-26l-26,0" fill="url(#pause)" stroke-width="0" stroke-dashoffset="0"/>\
         </g>\
        </g>\
        <rect id="bar-progress-bg" height="1" width="216.99999" y="106" x="270" stroke-width="5" stroke="#eae1e1" fill="#FF0000"/>\
        <rect id="bar-progress" height="1" width="216.99999" y="106" x="270" stroke-width="5" stroke="#7a7373" fill="#FF0000"/>\
        <text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="17" id="time" y="130.39999" x="289" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">12:32</text>\
        <text font-weight="normal" xml:space="preserve" text-anchor="" font-family="serif" font-size="15" id="songname" y="95.39999" x="265" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">hello</text>\
\
        <g style="display:none" id="pause-overlay">\
         <rect opacity="0.5" id="svg_61" height="242" width="266" y="0.39999" x="244" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="5" stroke="#141313" fill="#110f0f"/>\
         <text xml:space="preserve" pointer-events="none" text-anchor="middle" font-family="serif" font-size="17" id="svg_62" y="120.39999" x="373" font-weight="bold" stroke-width="0" stroke="#7a7373" fill="#f4e8e8" >play</text>\
        </g>\
</g>\
</svg>');
},false);

