// ==UserScript==
// @name           Deobfuscated Google Music Enhancements
// @author         Daniel
// @version        7/31/2013
// @include        http://play.google.com/music/listen*
// @include        https://play.google.com/music/listen*
// @match          http://play.google.com/music/listen*
// @match          https://play.google.com/music/listen*
// @run-at         document-start
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          unsafeWindow
// @icon           http://www.danielslaughter.com/projects/play.google.com/image/icon_32x32.png
// @description    Adds Last.fm scrobbling support as well as other optional features.
// ==/UserScript==

window.addEventListener('load', function () {
	if (document.getElementById('gmp_script2')) {
		return;
	}
	LastFm = function () {
    var parent = this;
    var apiKey = '5239a266627a98f5250b7357a018036a';
    var secretKey = '4f9100c3272b4da8db3789d5ea7906c2';
    this.callbackCount = 0;
    LastFm.prototype.trackUpdateNowPlaying = LastFm.prototype.trackUpdateNowPlaying || function (obj, successCallback, failCallback) {
        core.log('Notifying Last.fm of track playing (trackUpdateNowPlaying): ' + obj.track);
        this.request('track.updateNowPlaying', {
            'album': obj.album,
            'albumArtist': obj.albumArtist,
            'artist': obj.artist,
            'duration': obj.duration,
            'track': obj.track
        }, successCallback, failCallback)
    };
    LastFm.prototype.trackScrobble = LastFm.prototype.trackScrobble || function (obj, successCallback, failCallback) {
        core.log('Notifying Last.fm of track scrobbling (trackScrobble): ' + obj.track);
        this.request('track.scrobble', {
            'album': obj.album,
            'albumArtist': obj.albumArtist,
            'artist': obj.artist,
            'timestamp': Math.round((new Date()).getTime() / 1000) - Math.floor(obj.duration / 2),
            'track': obj.track
        }, successCallback, failCallback)
    };
    LastFm.prototype.trackLove = LastFm.prototype.trackLove || function (obj, successCallback, failCallback) {
        core.log('Notifying Last.fm of love (trackLove): ' + obj.track);
        this.request('track.love', {
            'artist': obj.artist,
            'track': obj.track
        }, successCallback, failCallback)
    };
    LastFm.prototype.trackUnlove = LastFm.prototype.trackUnlove || function (obj, successCallback, failCallback) {
        core.log('Notifying Last.fm of unlove (trackUnlove): ' + obj.track);
        this.request('track.unlove', {
            'artist': obj.artist,
            'track': obj.track
        }, successCallback, failCallback)
    };
    LastFm.prototype.trackGetInfo = LastFm.prototype.trackGetInfo || function (obj, successCallback, failCallback) {
        core.log('Fetching Last.fm track data of: ' + obj.track);
        this.request('track.getInfo', {
            'artist': obj.artist,
            'track': obj.track,
            'username': obj.username
        }, successCallback, failCallback)
    };
    LastFm.prototype.request = LastFm.prototype.request || function (method, params, successCallback, failCallback) {
        successCallback = successCallback || function (data, status, xhr) {
            return
        };
        failCallback = failCallback || function (status, xhr) {
            return
        };
        params = params || {};
        params.method = method;
        params.api_key = apiKey;
        params.sk = core.setting.data.lastfm.sessionkey;
        var keys = [];
        var string = '';
        for (var key in params) {
            keys.push(key)
        }
        keys.sort();
        for (var index in keys) {
            var key = keys[index];
            string += key + params[key]
        }
        string += secretKey;
        params.api_sig = this.md5(string);
        var paramArray = [];
        for (var param in params) {
            paramArray.push(param + '=' + encodeURIComponent(params[param]))
        }
        this.callbackCount++;
        $.ajax({
            'url': '//query.yahooapis.com/v1/public/yql',
            'data': {
                'q': 'select * from jsonpost where url="' + 'https://ws.audioscrobbler.com/2.0/' + '" and postdata="' + paramArray.join('&') + '"',
                'format': 'json',
                'env': 'store://datatables.org/alltableswithkeys',
                'callback': 'yqlCallback' + this.callbackCount
            },
            'dataType': 'jsonp',
            'jsonpCallback': 'yqlCallback' + this.callbackCount,
            'crossDomain': true,
            'success': function (data, status, xhr) {
                if (status == 'success') {
                    successCallback(data, status, xhr)
                } else {
                    failCallback(status, xhr)
                }
            },
            'fail': function (xhr, status) {
                failCallback(status, xhr)
            }
        })
    };
    LastFm.prototype.md5 = LastFm.prototype.md5 || function (str) {
        var xl;
        var rotateLeft = function (lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
        };
        var addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
                }
            } else {
                return (lResult ^ lX8 ^ lY8)
            }
        };
        var _F = function (x, y, z) {
            return (x & y) | ((~x) & z)
        };
        var _G = function (x, y, z) {
            return (x & z) | (y & (~z))
        };
        var _H = function (x, y, z) {
            return (x ^ y ^ z)
        };
        var _I = function (x, y, z) {
            return (y ^ (x | (~z)))
        };
        var _FF = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b)
        };
        var _GG = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b)
        };
        var _HH = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b)
        };
        var _II = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b)
        };
        var convertToWordArray = function (str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray
        };
        var wordToHex = function (lValue) {
            var wordToHexValue = '',
                wordToHexValue_temp = '',
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValue_temp = '0' + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2)
            }
            return wordToHexValue
        };
        var x = [],
            k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22,
            S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20,
            S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23,
            S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        str = this.utf8(str);
        x = convertToWordArray(str);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        xl = x.length;
        for (k = 0; k < xl; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD)
        }
        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        return temp.toLowerCase()
    };
    LastFm.prototype.utf8 = LastFm.prototype.utf8 || function (str) {
        var string = (str + '');
        var utftext = '',
            start, end, stringl = 0;
        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;
            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128)
            } else {
                enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128)
            } if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end)
                }
                utftext += enc;
                start = end = n + 1
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl)
        }
        return utftext
    }
};
Setting = function () {
    var parent = this;
    this.data = {
        'scrobble': {
            'enabled': false,
            'percent': 50
        },
        'skip': {
            'donation': true,
            'enabled': false,
            'stars': null
        },
        'lastfm': {
            'authenticated': false,
            'username': null,
            'sessionkey': null
        }
    };
    this.scrobblepercent = null;
    this.skipthumbdown = null;
    this.skipstars = null;
    this.username = null;
    this.sessionkey = null;
    this.donation = true;
    Setting.prototype.init = Setting.prototype.init || function () {};
    Setting.prototype.load = Setting.prototype.load || function (successCallback, failCallback) {
        successCallback = successCallback || function (data, status, xhr) {
            return
        };
        failCallback = failCallback || function (status, xhr) {
            return
        };
        core.log('Loading settings...');
        $.ajax({
            'url': '//www.danielslaughter.com/projects/play.google.com/' + core.channel + '/setting.js',
            'data': {
                'pk': core.pk,
                'googleId': core.googleId,
                'version': core.version
            },
            'dataType': 'jsonp',
            'jsonpCallback': 'settingLoadCallback',
            'crossDomain': true,
            'success': function (data, status, xhr) {
                core.log('Loading settings from server successful - ' + status);
                parent.data.scrobble.enabled = data.scrobbleactive;
                parent.data.scrobble.percent = data.scrobblepercent;
                parent.data.skip.enabled = data.skipthumbdown;
                parent.data.skip.stars = data.skipstars;
                parent.data.skip.donation = 'true';
                parent.data.lastfm.authenticated = data.username.length && data.sessionkey.length;
                parent.data.lastfm.username = data.username;
                parent.data.lastfm.sessionkey = data.sessionkey;
                successCallback(data, status, xhr)
            },
            'fail': function (xhr, status) {
                core.log('Loading settings from server failed - ' + status);
                failCallback(status, xhr)
            }
        })
    };
    Setting.prototype.save = Setting.prototype.save || function (successCallback, failCallback) {
        successCallback = successCallback || function (data, status, xhr) {
            return
        };
        failCallback = failCallback || function (status, xhr) {
            return
        };
        core.log('Saving settings...');
        $.ajax({
            'url': '//www.danielslaughter.com/projects/play.google.com/' + core.channel + '/save.js',
            'data': {
                'pk': core.pk,
                'googleId': core.googleId,
                'sessionkey': this.data.lastfm.sessionkey,
                'version': core.version,
                'scrobbleactive': this.data.scrobble.enabled ? '1' : '0',
                'scrobblepercent': this.data.scrobble.percent,
                'skipthumbdown': this.data.skip.enabled ? '1' : '0',
                'skipstars': this.data.skip.stars
            },
            'dataType': 'jsonp',
            'jsonpCallback': 'settingSaveCallback',
            'crossDomain': true,
            'success': function (data, status, xhr) {
                core.log('Saving settings to server successful - ' + status);
                successCallback(data, status, xhr)
            },
            'fail': function (xhr, status) {
                core.log('Saving settings to server failed - ' + status);
                failCallback(status, xhr)
            }
        })
    };
    this.init()
};
Widget = function () {
    var parent = this;
    this.wrapper = null;
    this.arrow = null;
    this.pane = null;
    this.heart = null;
    Widget.prototype.init = Widget.prototype.init || function () {
        if (core.template == 2) {
            this.wrapper = $('<div>', {
                'css': {
                    'background': '#e6e6e6',
                    'color': '#333',
                    'font-family': 'Arial',
                    'font-size': '13px',
                    'margin-left': '1em',
                    'z-index': '9998',
                    'padding': '.5em 1em 0 1em',
                    'border-radius': '2px'
                }
            })
        } else {
            this.wrapper = $('<div>', {
                'css': {
                    'position': 'absolute',
                    'top': '.5em',
                    'right': '.5em',
                    'background': '#2d2d2d',
                    'color': '#FFF',
                    'z-index': '9998',
                    'font-family': 'Arial',
                    'font-size': '12px'
                }
            })
        } if (core.setting.data.lastfm.authenticated) {
            core.log('The user is authenticated');
            $('<a>', {
                'title': 'Last.fm Settings',
                'target': '_blank',
                'html': '<img src="//www.danielslaughter.com/projects/play.google.com/image/lastfm_logo_12x12.png" /> Last.fm ',
                'css': {
                    'color': 'inherit',
                    'text-decoration': 'none',
                    'cursor': 'pointer'
                }
            }).bind('click', function (event) {
                parent.toggle()
            }).appendTo(this.wrapper);
            this.heart = {
                'loading': $('<img>', {
                    'src': '//www.danielslaughter.com/projects/play.google.com/image/lastfm_love3_12x12.gif',
                    'title': 'Loading...',
                    'css': {
                        'display': 'none'
                    }
                }).bind('click', function (event) {}).appendTo(this.wrapper),
                'loved': $('<img>', {
                    'src': '//www.danielslaughter.com/projects/play.google.com/image/lastfm_love_12x12.png',
                    'title': 'Loved. Click to UnLove.',
                    'css': {
                        'display': 'none'
                    }
                }).bind('click', function (event) {
                    parent.heart.hide();
                    parent.heart.show('loading');
                    core.lastfm.trackUnlove({
                        'artist': core.song.artist,
                        'track': core.song.track
                    }, function () {
                        parent.heart.hide();
                        parent.heart.show('unloved')
                    }, function () {
                        parent.heart.hide();
                        parent.heart.show('error')
                    })
                }).appendTo(this.wrapper),
                'unloved': $('<img>', {
                    'src': '//www.danielslaughter.com/projects/play.google.com/image/lastfm_love2_12x12.png',
                    'title': 'UnLoved. Click to Love.',
                    'css': {
                        'display': 'none'
                    }
                }).bind('click', function (event) {
                    parent.heart.hide();
                    parent.heart.show('loading');
                    core.lastfm.trackLove({
                        'artist': core.song.artist,
                        'track': core.song.track
                    }, function () {
                        parent.heart.hide();
                        parent.heart.show('loved')
                    }, function () {
                        parent.heart.hide();
                        parent.heart.show('error')
                    })
                }).appendTo(this.wrapper),
                'error': $('<img>', {
                    'src': '//www.danielslaughter.com/projects/play.google.com/image/lastfm_love4_12x12.png',
                    'title': 'Error connecting to Last.fm',
                    'css': {
                        'display': 'none'
                    }
                }).bind('click', function (event) {}).appendTo(this.wrapper),
                'hide': function () {
                    this.loading.css('display', 'none');
                    this.loved.css('display', 'none');
                    this.unloved.css('display', 'none');
                    this.error.css('display', 'none')
                },
                'show': function (what) {
                    core.log('Switching heart to display "' + what + '"');
                    this[what].css('display', 'inline')
                }
            };
            this.arrow = $('<a>', {
                'html': '&nbsp;&#x25BE;',
                'title': 'Last.fm Settings',
                'css': {
                    'color': (core.template == 2 ? '#000' : '#FF0'),
                    'cursor': 'pointer'
                }
            }).bind('click', function (event) {
                parent.toggle()
            }).appendTo(this.wrapper);
            if (core.template == 2) {
                this.pane = $('<div>', {
                    'css': {
                        'position': 'absolute',
                        'top': '2.8em',
                        'right': '.5em',
                        'background': '#f1f1f1',
                        'color': '#333',
                        'z-index': '9999',
                        'width': '500px',
                        'font-size': '12px',
                        'line-height': '1.35em',
                        'box-shadow': '0 2px 5px #AAA'
                    }
                }).appendTo(this.wrapper)
            } else {
                this.pane = $('<div>', {
                    'css': {
                        'position': 'absolute',
                        'top': '1.2em',
                        'right': 0,
                        'background': '#f1f1f1',
                        'color': '#333',
                        'z-index': '9999',
                        'width': '500px',
                        'line-height': '1.35em',
                        'box-shadow': '0 2px 5px #AAA'
                    }
                }).appendTo(this.wrapper)
            }
            $('<div>', {
                'html': 'Google Music Player with Last.fm',
                'css': {
                    'background': '#f63601',
                    'color': '#FFF',
                    'font-weight': 'bold',
                    'padding': '.5em .5em',
                    'border-bottom': 'none'
                }
            }).appendTo(this.pane);
            $('<div>', {
                'html': 'Loading Settings...',
                'id': 'script_pane',
                'css': {
                    'padding': '1em .5em',
                    'background': '#FFF',
                    'color': '#000',
                    'border': '1px solid #FFF',
                    'border-top': 'none'
                }
            }).appendTo(this.pane);
            $('<div>', {
                'html': '<a href="javascript:void(0);" onclick="document.getElementById(\'script_donateform\').submit();">Donate</a> &nbsp;&nbsp;&bull;&nbsp;&nbsp; ' + '<a href="mailto:Daniel Slaughter <me@danielslaughter.com>" target="_blank">Contact me</a> &nbsp;&nbsp;&bull;&nbsp;&nbsp; ' + '<a href="http://www.danielslaughter.com/projects/google-music-with-lastfm/" target="_blank">Project\'s Homepage</a>',
                'css': {
                    'text-align': 'center',
                    'background': '#f1f1f1',
                    'padding': '.5em .5em 0 .5em'
                }
            }).appendTo(this.pane);
            $('<div>', {
                'html': core.channel + ' version: client ' + core.version + ', server ' + core.server,
                'css': {
                    'text-align': 'center',
                    'background': '#f1f1f1',
                    'color': '#AAA',
                    'padding': '0 .5em .5em .5em',
                    'font-size': '80%'
                }
            }).appendTo(this.pane);
            this.hide()
        } else {
            core.log('The user is not authenticated');
            $('<a>', {
                'href': '//www.danielslaughter.com/projects/play.google.com/' + core.channel + '/authenticate.php?googleId=' + core.googleId + '&pk=' + core.pk,
                'html': '<img src="//www.danielslaughter.com/projects/play.google.com/image/lastfm_logo_12x12.png" /> Last.fm Requires Authentication',
                'css': {
                    'color': '#fb4909',
                    'text-decoration': 'none'
                }
            }).appendTo(this.wrapper)
        }
        $('<div>', {
            'html': '<form id="script_donateform" action="https://www.paypal.com/cgi-bin/webscr" style="display:none" method="post" target="_top"><input type="hidden" name="item_name" value="Donation from ' + core.googleId + '"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="5MB5QJBRRJ892"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>'
        }).appendTo(this.wrapper)
    };
    Widget.prototype.getDom = Widget.prototype.getDom || function () {
        return this.wrapper
    };
    Widget.prototype.show = Widget.prototype.show || function () {
        this.pane.show()
    };
    Widget.prototype.hide = Widget.prototype.hide || function () {
        this.pane.hide()
    };
    Widget.prototype.toggle = Widget.prototype.toggle || function () {
        this.pane.toggle()
    };
    Widget.prototype.setSettings = Widget.prototype.setSettings || function (obj) {
        var pane = $(document.getElementById('script_pane'));
        pane.empty();
        if (obj.lastfm.authenticated) {
            var row = function () {
                return $('<div>', {
                    'css': {
                        'display': 'table-row'
                    }
                }).appendTo($('<div>', {
                    'css': {
                        'display': 'table',
                        'width': '100%'
                    }
                }).appendTo(pane))
            };
            var rowAuthenticate = row().append($('<div>', {
                'html': 'Authenticated:',
                'css': {
                    'display': 'table-cell',
                    'width': '30%',
                    'white-space': 'normal',
                    'font-weight': 'bold',
                    'padding': '0 0 1em 0'
                }
            })).append($('<div>', {
                'html': '<a href="//www.last.fm/user/' + obj.lastfm.username + '" target="_blank">' + obj.lastfm.username + '</a> ' + '(<a href="//www.danielslaughter.com/projects/play.google.com/' + core.channel + '/deauthenticate.php?username=' + core.setting.data.lastfm.username + '&sessionkey=' + core.setting.data.lastfm.sessionkey + '&googleId=' + core.googleId + '&pk=' + core.pk + '" onclick="return confirm(\'Your Last.fm account will be unlinked with your Google Account, allowing you to re-authenticate it with another Last.fm account. Are you sure you want to continue?\')">de-authenticate</a>)' + '<br />' + core.googleId + '<br />' + core.pk,
                'css': {
                    'display': 'table-cell',
                    'padding': '0 0 1em 0',
                    'white-space': 'normal'
                }
            }));
            var rowScrobble = row().append($('<div>', {
                'html': 'Scrobbling:',
                'css': {
                    'display': 'table-cell',
                    'width': '30%',
                    'white-space': 'normal',
                    'font-weight': 'bold',
                    'padding': '0 0 1em 0'
                }
            })).append($('<div>', {
                'html': '<label><input type="radio" name="setting.data.scrobble.enabled" id="setting.data.scrobble.enabled" value="1"' + (obj.scrobble.enabled ? ' checked="checked"' : '') + ' /> Yes, please Scrobble music to Last.fm</label>' + '<br />' + '<label><input type="radio" name="setting.data.scrobble.enabled" value="0"' + (!obj.scrobble.enabled ? ' checked="checked"' : '') + ' /> No, I would like my music experience to be private</label>',
                'css': {
                    'display': 'table-cell',
                    'padding': '0 0 1em 0',
                    'white-space': 'normal'
                }
            }));
            var rowScrobble = row().append($('<div>', {
                'html': 'When to Scrobble:',
                'css': {
                    'display': 'table-cell',
                    'width': '30%',
                    'white-space': 'normal',
                    'font-weight': 'bold',
                    'padding': '0 0 1em 0'
                }
            })).append($('<div>', {
                'html': '<select name="setting.data.scrobble.percent" id="setting.data.scrobble.percent">' + '<option value="50"' + (obj.scrobble.percent == 50 ? ' selected="selected"' : '') + '>50%</option>' + '<option value="60"' + (obj.scrobble.percent == 60 ? ' selected="selected"' : '') + '>60%</option>' + '<option value="70"' + (obj.scrobble.percent == 70 ? ' selected="selected"' : '') + '>70%</option>' + '<option value="80"' + (obj.scrobble.percent == 80 ? ' selected="selected"' : '') + '>80%</option>' + '<option value="90"' + (obj.scrobble.percent == 90 ? ' selected="selected"' : '') + '>90%</option>' + '</select> or when track reaches 4:00, whichever comes first',
                'css': {
                    'display': 'table-cell',
                    'padding': '0 0 1em 0',
                    'white-space': 'normal'
                }
            }));
            if (obj.skip.donation) {
                var rowSkip = row().append($('<div>', {
                    'html': 'Auto Skip Thumbed Down Songs:' + '<br />' + '<em><small style="font-weight:normal;">Super Secret Awesomely Helpful Setting<br /> for Donating. Thank you!</small></em>',
                    'css': {
                        'display': 'table-cell',
                        'width': '30%',
                        'white-space': 'normal',
                        'font-weight': 'bold',
                        'padding': '0 0 1em 0'
                    }
                })).append($('<div>', {
                    'html': '<label><input type="radio" name="setting.data.skip.enabled" id="setting.data.skip.enabled" value="1"' + (obj.skip.enabled ? ' checked="checked"' : '') + ' /> Skip music I thumbed down,</label> ' + 'or <a href="#labs_pl" onclick="core.widget.hide();">star rated</a> ' + '<select name="setting.data.skip.stars" id="setting.data.skip.stars">' + '<option value="1"' + (obj.skip.stars == 1 ? ' selected="selected"' : '') + '>1</option>' + '<option value="2"' + (obj.skip.stars == 2 ? ' selected="selected"' : '') + '>2</option>' + '<option value="3"' + (obj.skip.stars == 3 ? ' selected="selected"' : '') + '>3</option>' + '<option value="4"' + (obj.skip.stars == 4 ? ' selected="selected"' : '') + '>4</option>' + '</select> or less' + '<br />' + '<label><input type="radio" name="setting.data.skip.enabled" value="0"' + (!obj.skip.enabled ? ' checked="checked"' : '') + ' /> I\'d like to listen to the music I\'ve thumbed down</label>',
                    'css': {
                        'display': 'table-cell',
                        'padding': '0 0 1em 0',
                        'white-space': 'normal'
                    }
                }))
            } else {
                var rowSkip = row().append($('<div>', {
                    'html': 'Super Secret Setting:',
                    'css': {
                        'display': 'table-cell',
                        'width': '30%',
                        'white-space': 'normal',
                        'font-weight': 'bold',
                        'padding': '0 0 1em 0'
                    }
                })).append($('<div>', {
                    'html': 'There\'s a super secret awesomely helpful setting, which really has nothing to do with Last.fm, but will be accessible if you <a href="javascript:void(0);" onclick="document.getElementById(\'script_donateform\').submit();">make a donation of at least $1 (USD)</a>. If you\'ve already made a donation please keep in mind it takes up to 10 minutes to register in the system, and will require you to refresh your Google Music Player to see it. If you still continue to not have access to the super secret awesomely helpful setting please just simply forward the developer, <a href="mailto:me@danielslaughter.com">Daniel Slaughter</a>, your Paypal donation receipt and he\'ll get you all set up.',
                    'css': {
                        'display': 'table-cell',
                        'padding': '0 0 1em 0',
                        'white-space': 'normal'
                    }
                }))
            }
            var rowSave = row().append($('<div>', {
                'html': '&nbsp;',
                'css': {
                    'display': 'table-cell',
                    'width': '30%',
                    'white-space': 'normal',
                    'font-weight': 'bold'
                }
            })).append($('<div>', {
                'css': {
                    'display': 'table-cell',
                    'white-space': 'normal'
                }
            }).append($('<input>', {
                'type': 'button',
                'value': 'Save'
            })).bind('click', {}, function (event) {
                core.setting.data.scrobble.enabled = (document.getElementById('setting.data.scrobble.enabled').checked);
                core.setting.data.scrobble.percent = (document.getElementById('setting.data.scrobble.percent').value);
                if (core.setting.data.skip.donation) {
                    core.setting.data.skip.enabled = (document.getElementById('setting.data.skip.enabled').checked);
                    core.setting.data.skip.stars = (document.getElementById('setting.data.skip.stars').value)
                }
                parent.hide();
                core.setting.save()
            }))
        } else {}
    };
    this.init()
};
var Core = function (pk, version) {
    var parent = this;
    this.pk = pk;
    this.version = version;
    this.server = '10/18/2013';
    this.channel = 'stable';
    this.debug = (this.channel == 'beta');
    this.googleId = null;
    this.setting = null;
    this.widget = null;
    this.lastfm = null;
    this.template = 1;
    this.song = {
        'track': null,
        'artist': null,
        'album': null,
        'albumArtist': null,
        'duration': 0,
        'current': 0,
        'hasScrobbled': false,
        'hasNowPlaying': false,
        'loved': false
    };
    Core.prototype.init = Core.prototype.init || function () {
        if (document.getElementById('script_jquery') == undefined) {
            var jquery = document.createElement('script');
            jquery.id = 'script_jquery';
            jquery.src = '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
            var parentThis = this;
            jquery.onload = function (e) {
                parent.log('JQuery has been loaded');
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                var el = $('*');
                for (var i = 0; i < el.length; i++) {
                    if (emailPattern.test(el[i].innerHTML)) {
                        parent.googleId = el[i].innerHTML;
                        break
                    }
                }
                if (parent.googleId != null) {
                    parent.log('GoogleId found; ' + parent.googleId);
                    parent.setting = new Setting();
                    parent.setting.load(function (data, status, xhr) {
                        parent.log('Settings loaded! ' + data);
                        if (core.setting.data.lastfm.authenticated) {
                            parent.log('Setting up Last.fm object');
                            parent.lastfm = new LastFm()
                        }
                        if ($('#oneGoogleWrapper').length) {
                            parent.template = 2
                        }
                        parent.log('Using template ' + parent.template);
                        parent.log('Creating widget');
                        parent.widget = new Widget();
                        if (parent.template == 2) {
                            var container = $('#oneGoogleWrapper .gb_mb.gb_ub.gb_f').first();
                            if (!container.length) {
                                container = $('#oneGoogleWrapper #gbu').first()
                            }
                            if (!container.length) {
                                container = $('#oneGoogleWrapper #gb > div').first().children().first()
                            }
                            if (!container.length) {
                                container = $('#oneGoogleWrapper').children().first()
                            }
                            container.children('*').last().append($(parent.widget.getDom()));
                            container.css({
                                'min-width': parseInt(container.css('min-width')) + 120
                            });
                            container.parent().css({
                                'min-width': parseInt(container.parent().css('min-width')) + 120
                            })
                        } else {
                            $('*').first().append($(parent.widget.getDom()))
                        }
                        parent.widget.setSettings(parent.setting.data);
                        parent.timer()
                    })
                } else {
                    parent.log('GoogleId was not found; aborting.');
                    return
                }
            };
            document.getElementsByTagName('*')[0].appendChild(jquery)
        }
    };
    Core.prototype.log = Core.prototype.log || function (msg) {
        if (this.debug) {
            console.log('Last.fm @' + (new Date().getTime()) + ': ' + msg)
        }
    };
    Core.prototype.execute = Core.prototype.execute || function (str) {
        var el = document.createElement('script');
        el.innerHTML = str + ';void 0;';
        $(document).children().first().append(el);
        el.parentNode.removeChild(el)
    };
    Core.prototype.timer = Core.prototype.timer || function () {
        var timeout = 250;
        var song = {
            'track': null,
            'artist': null,
            'album': null,
            'albumArtist': null,
            'duration': null,
            'current': null,
            'error': false
        };
        if (document.getElementById('playerSongTitle')) {
            song.track = $.trim(document.getElementById('playerSongTitle').innerHTML.replace('&amp;', '&'))
        } else {
            song.error = true
        } if (document.getElementById('player-artist')) {
            song.artist = $.trim(document.getElementById('player-artist').innerHTML.replace('&amp;', '&'));
            var album = document.getElementById('player-artist').parentNode.getElementsByTagName('div');
            song.album = $.trim(album[album.length - 1].innerHTML.replace('&amp;', '&'));
            song.albumArtist = ''
        } else {
            song.error = true
        } if (document.getElementById('time_container_current')) {
            song.current = $.trim(document.getElementById('time_container_current').innerHTML);
            song.current = parseInt(song.current.split(':')[0]) * 60 + parseInt(song.current.split(':')[1]);
            song.error = song.error || !$.isNumeric(song.current)
        } else {
            song.error = true
        } if (document.getElementById('time_container_duration') && document.getElementById('time_container_duration').innerHTML != '&nbsp;') {
            song.duration = $.trim(document.getElementById('time_container_duration').innerHTML);
            song.duration = parseInt(song.duration.split(':')[0]) * 60 + parseInt(song.duration.split(':')[1]);
            song.error = song.error || !$.isNumeric(song.duration)
        } else {
            song.error = true
        } if (!song.error) {
            var newSong = (song.track != parent.song.track || song.artist != parent.song.artist || song.album != parent.song.album || song.albumArtist != parent.song.albumArtist);
            parent.song.track = song.track;
            parent.song.artist = song.artist;
            parent.song.album = song.album;
            parent.song.albumArtist = song.albumArtist;
            parent.song.duration = song.duration;
            parent.song.current = song.current;
            if (newSong) {
                core.log('Detected new song: ' + parent.song.track + ' by ' + parent.song.artist);
                if (parent.setting.data.skip.donation && parent.setting.data.skip.enabled) {
                    var skip = false;
                    var ul = document.getElementById('player-right-wrapper').getElementsByTagName('ul');
                    for (var i = 0; i < ul.length; i++) {
                        if (ul[i].className && ul[i].className == 'rating-container stars') {
                            var stars = ul[i].getElementsByTagName('li');
                            for (var j = 0; j < stars.length; j++) {
                                if (stars[j].className && stars[j].className.indexOf('selected') != -1) {
                                    var rating = stars[j].getAttribute('data-rating');
                                    if (rating != undefined && $.isNumeric(rating) && rating > 0 && rating < parent.setting.data.skip.stars) {
                                        skip = true;
                                        break
                                    }
                                }
                            }
                            break
                        } else if (ul[i].className && ul[i].className == 'rating-container thumbs') {
                            var thumbs = ul[i].getElementsByTagName('li');
                            for (var j = 0; j < thumbs.length; j++) {
                                if (thumbs[j].className && thumbs[j].className.indexOf('selected') != -1) {
                                    var rating = thumbs[j].getAttribute('data-rating');
                                    if (rating != undefined && $.isNumeric(rating) && rating > 0 && rating == 1) {
                                        skip = true;
                                        break
                                    }
                                }
                            }
                            break
                        }
                        if (ul.length - 1 == i) {
                            core.log('Could not find thumbs or stars to determine skipping song.')
                        }
                    }
                    if (skip) {
                        parent.log('Skipping the current playing track');
                        parent.execute('SJBpost("nextSong")')
                    } else {
                        parent.widget.heart.hide();
                        parent.widget.heart.show('loading');
                        parent.lastfm.trackGetInfo({
                            'artist': parent.song.artist,
                            'track': parent.song.track,
                            'username': parent.setting.data.lastfm.username
                        }, function (data, status, xhr) {
                            parent.widget.heart.hide();
                            if (status == 'success' && data.query != undefined && data.query.results != undefined && data.query.results.postresult != undefined && data.query.results.postresult.lfm != undefined && data.query.results.postresult.lfm.track != undefined && data.query.results.postresult.lfm.track.userloved != undefined) {
                                parent.song.loved = (data.query.results.postresult.lfm.track.userloved == '1') || false;
                                if (parent.song.loved) {
                                    parent.widget.heart.show('loved')
                                } else {
                                    parent.widget.heart.show('unloved')
                                }
                            } else {
                                parent.widget.heart.show('error')
                            }
                        }, function (status, xhr) {
                            parent.widget.heart.show('error')
                        })
                    }
                }
            }
            if (song.current < 5) {
                parent.song.hasNowPlaying = false
            } else if (song.current > 5 && !parent.song.hasNowPlaying) {
                parent.song.hasNowPlaying = true;
                if (parent.setting.data.scrobble.enabled) {
                    parent.lastfm.trackUpdateNowPlaying(parent.song)
                } else {
                    parent.log('Although the script would normally notify Last.fm of track playing right now, the setting to scrobble is disabled.')
                }
                parent.song.hasScrobbled = false
            } else if (!parent.song.hasScrobbled && song.duration >= 30 && (song.current >= (song.duration * (parent.setting.data.scrobble.percent / 100)) || song.current >= 240)) {
                parent.song.hasScrobbled = true;
                if (parent.setting.data.scrobble.enabled) {
                    parent.log('Script has determined it needs to scrobble currently playing track to Last.fm: current=' + song.current + ', duration=' + song.duration);
                    parent.lastfm.trackScrobble(parent.song)
                } else {
                    parent.log('Although the script would normally scrobble right now, the setting to scrobble is disabled.')
                }
            }
        } else {} if (timeout >= 0) {
            window.setTimeout(parent.timer, timeout)
        }
    };
    this.init()
};
var core = new Core('bf169a9c5c012a5279a9c5c1c7b5279a', '7/31/2013');
}, false);