// ==UserScript==
// @name           xiamiScrobbler
// @namespace      http://mewbunny.blogspot.com/
// @description    Scrobbling your music to Last.fm when listening to 虾米
// @include        http://www.xiami.com/radio/play*
// @version        0.1
// @require        http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

ScriptUpdater.check(86450, '0.1');  

GM_registerMenuCommand('xiamiScrobbler - Last.fm config', userConfig); 
GM_registerMenuCommand('xiamiScrobbler - check update', checkUpdate); 

function userConfig() {
    show_info('Last.fm 设置...', 'config');
}

function checkUpdate() {
    ScriptUpdater.forceCheck(86450, '0.1');  
}

var ARTIST_URL = 'http://www.xiami.com/web/artist/id/';
var playlist = [];
var Fm_afterplay_old;
var sid;
var nowurl;
var suburl;
var is_handshaking = 0;
var is_sending_now = 0;
var is_scrobbling = 0;
var now_playing_queued = [];
var scrobble_queued = [];
var retry_times = 10;
var play_start = 0;
var last_song;
var $;
var dbs_info;
var login_form;

var GM_Debug = 0;
var GM_log = function (){};
if (unsafeWindow.console && GM_Debug) {
   GM_log = unsafeWindow.console.log;
}



(function(){
    if (typeof jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
})();

function wait_for_uw() {
	//if (!unsafeWindow.player_changeSong || !unsafeWindow.jQuery) {
    if (!unsafeWindow.Fm_afterplay || !unsafeWindow.jQuery) {
        retry_times --;
        if (retry_times < 0) {
            GM_log('error communication with uw...')
        } else {
            setTimeout(wait_for_uw, 200);
        }
	} else {
        Fm_afterplay_old = unsafeWindow.Fm_afterplay;
        $ = unsafeWindow.jQuery.noConflict(true);


        dbs_info = $('<div style="bottom: 0pt; position: absolute; ' + 
            'left:0pt; font-size: 12px; -moz-border-radius: 5px 5px 0 0; ' + 
            ' padding: 5px; background-color: #FF7E07; display: none; '  + 
            'color: #FFF; z-index: 9999;" id="dbs_info"></div>');

        login_form = $('<div id="login_form"' + 
            'style="position: absolute; z-index: 9999; left: 0; bottom: 0; display: none;' + 
            'background-color: #FF7E07; font-size: 12px; width: 150px;' + 
            '-moz-border-radius: 5px 5px 0pt 0pt; padding: 8px; color: #FFF">' + 
            '<form onsubmit="return false;" name="loginform">' + 
            '<span style="">用户名: <input type="text" name="user" ' + 
            'style="width: 100px;"></span><br>' + 
            '<span style="line-height: 2em;">密__码: ' + 
            '<input type="password" name="pwd" style="width: 100px;">' + 
            '</span></form><div><button id="login_btn"' + 
            ' onclick="login_last_fm();">登录 Last.fm</button>' + 
            '<a id="close_form" style="float: right; line-height: 2em" ' + 
            'href="javascript:close_form();">↓</a></div></div>');

        $('body').append(dbs_info);
        $('body').append(login_form);

		hijack();
        if (GM_getValue('user')) {
            handshake();
        } else {
            show_info('Last.fm 设置', 'login');
        }
	}
}

wait_for_uw();

function show_info(message, action) {
    console.log('ss')

    if ($('#dbs_info').is(':hidden') && action=='success') {
        return;
    }
    dbs_info.show();
    dbs_info.html(message);


    if (GM_getValue('user'))
        $('input[name=user]').val(GM_getValue('user'));

    $('input[name=pwd]').keypress(function(e) {
        if (e.which == 13) {
            unsafeWindow.login_last_fm();
        }
    });
    
    switch (action) {
        case 'config':
            login_form.show();

        case 'login':
            dbs_info.unbind();
            dbs_info.click(function() {
                login_form.show();
                $('input[name=user]').focus();
            });
            break;

        case 'success':
            dbs_info.unbind();
            setTimeout(function() {
                dbs_info.hide();
            }, 1000)
            break;

    }
}

unsafeWindow.close_form = function() {
    login_form.hide();
    dbs_info.hide();
}

unsafeWindow.login_last_fm = function() {
    var username = $('input[name=user]').val();
    var pwd = $('input[name=pwd]').val();
    setTimeout(function() {
        GM_setValue('user', username);
        GM_setValue('password', MD5(pwd));
    }, 0);
    setTimeout(handshake, 0);
    login_form.hide();
    show_info('Last.fm 验证中...');
    return false;
}

function hijack() {

	unsafeWindow.Fm_afterplay = function(song) {
        GM_log('change song', song.artisId);
        $.ajax({
            type: 'GET',
            url: ARTIST_URL + song.artisId,
            success: (function() {
                return function(res) {
                    var tmp = res.match(/<title>(.*)<\/title>/); 
                    if (tmp.length > 1 && tmp[1] != '登录') {
                        var s = {
                            artist: tmp[1],
                            songName: song.songName
                        };
                        submit(s);
                    } else {
                        GM_log('error get artist name..');
                    }
                }
            })()
        });

        last_song = song;
        Fm_afterplay_old(song);
	}

    GM_log('hijack done...')

}
function submit(song) {
	scrobble(song.artist, song.songName, '', '');
}

function handshake() {
	GM_log('start handshake...');

    if (is_handshaking) {
        GM_log('handshake in progress...');
        return;
    }

    is_handshaking = 1;

    var t = Math.round(new Date().getTime() / 1000);

	var token = MD5(GM_getValue('password') + t);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://post.audioscrobbler.com/?hs=true&p=1.2.1&c=osx&t=' + t + 
            '&a=' + token + '&v=1.0&u=' + GM_getValue('user'),
		headers: {
			'Host': 'post.audioscrobbler.com',
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if (responseDetails.statusText == 'OK') {
				var res = responseDetails.responseText.split('\n');
                is_handshaking = 0;
                GM_log('handshake result:', res[0])

				switch (res[0]) {

                    case 'OK':
                        GM_log('handshake success!');
                        show_info('Last.fm 验证成功!', 'success');

                        sid = res[1];
                        nowurl = res[2];
                        suburl = res[3];

                        var song;

                        if (now_playing_queued.length > 0) {
                            song = now_playing_queued.shift();
                            now_playing(song.artist, song.track, song.album);
                        }

                        if (scrobble_queued.length > 0) {
                            song = scrobble_queued.shift();
                            scrobble(song.artist, song.track, song.album);
                        }
                        break;

                    case 'BADAUTH':
                        GM_log('bad auth!');
                        show_info('Last.fm 验证失败', 'login');
                        break;

                    case 'FAILED':
                        GM_log('failed! re handshake...');
                        show_info('Last.fm 验证失败', 'login');
                        //handshake();
                        break;

                    default:
                        handshake();
                        break;
				}
			}
		}
	});
}

function now_playing(artist, track, album) {

	GM_log('now playing:', artist, track, album);

    artist = $.trim(artist.split('/')[0]);

    current_song = {
        artist: artist,
        track: track,
        album: album
    };

	if (!sid) {
        now_playing_queued.push(current_song);
		GM_log('not handshake yet, now playing queued...')
		return;
	}

    if (is_sending_now) {
        now_playing_queued.push(current_song);
		GM_log('sending in progress, now playing queued...')
		return;
    }

	var poststring = 's=' + sid + '&a=' + encodeURI(artist) + '&t=' + 
        encodeURI(track) + '&b=' + encodeURI(album) + '&l=&n=&m=';

    is_sending_now = 1;

	window.setTimeout(function() {
		GM_xmlhttpRequest({
			method: 'POST',
			url: nowurl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-Length': poststring.length,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: poststring,
            onload: (function() {
                return function(responseDetails) {
                    is_sending_now = 0;
                    var res = responseDetails.responseText.split('\n');
                    GM_log('now playing result:', res[0]);
                    switch (res[0]) {
                        case 'OK':
                            
                            if (now_playing_queued.length > 0) {
                                GM_log('now playing queue has ' + 
                                    now_playing_queued.length + 
                                    ' items, sending...');
                                var song = now_playing_queued.shift();
                                now_playing(song.artist, song.track, song.album);
                            } else {
                                GM_log('now playing queue is empty...')
                            }

                            break;

                        case 'BADSESSION':
                            GM_log('Bad session! re handshake...');
                            now_playing_queued.push(current_song);
                            handshake();
                            break;

                        default:
                            GM_log('handshake failed, re handshake...');
                            now_playing_queued.push(current_song);
                            handshake();
                            break;
                    }
            }})()
		});
	}, 0);
}

function scrobble(artist, track, album, action) {

	GM_log("scrobble:", artist, track, album);
    artist = $.trim(artist.split('/')[0]);
    action = '';

    var current_song = {
        artist: artist,
        track: track,
        album: album
    };

	if (!sid) {
        scrobble_queued.push(current_song);
		GM_log('not handshake yet, scrobble queued...')
		return;
	}

	if (is_scrobbling) {
        scrobble_queued.push(current_song);
		GM_log('scrobbling in progress, scrobble queued...')
		return;
	}

	var time = new Date();
	var t = Math.round(time.getTime() / 1000); //now in ctime

    var poststring = 'o[0]=P' + '&s=' + sid + '&a[0]=' + encodeURI(artist) + 
        '&t[0]=' + encodeURI(track) + '&b[0]=' + encodeURI(album) + '&i[0]=' +
        t + '&r[0]=' + action + '&l[0]=250&b[0]=&n[0]=&m[0]=';

    is_scrobbling = 1;
    scrobble_queued.shift();

    window.setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'POST',
            url: suburl,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                'Content-Length': poststring.length,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: poststring,
            onload: (function() {
                    return function(responseDetails) {
                    is_scrobbling = 0;
                    var res = responseDetails.responseText.split('\n');
                    GM_log('scrobbling result:', res[0]);
                    switch (res[0]) {

                        case 'OK':
                            GM_log('submit success!');

                            if (scrobble_queued.length > 0) {
                                GM_log('scrobble queue has ' + 
                                    scrobble_queued.length + 
                                    ' items, scrobbling...');
                                var song = scrobble_queued.shift();
                                scrobble(song.artist, song.track, song.album);
                            } else {
                                GM_log('scrobble queue is empty...');
                            }
                            break;

                        case 'BADSESSION':
                            GM_log('Bad session! re handshake...');
                            scrobble_queued.push(current_song);
                            handshake();
                            break;

                        default:
                            GM_log('scrobbling failed...');
                            scrobble_queued.push(current_song);
                            handshake();
                            break;
                    }
                }})()
        });
    }, 0);
}

/**
 *
 *  MD5 (Message-Digest Algorithm)
 *  http://www.webtoolkit.info/
 *
 **/

function MD5(string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}

	function AddUnsigned(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function F(x, y, z) {
		return (x & y) | ((~x) & z);
	}
	function G(x, y, z) {
		return (x & z) | (y & (~z));
	}
	function H(x, y, z) {
		return (x ^ y ^ z);
	}
	function I(x, y, z) {
		return (y ^ (x | (~z)));
	}

	function FF(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1 = lMessageLength + 8;
		var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue = "",
		WordToHexValue_temp = "",
		lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);

			}

		}

		return utftext;
	};

	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11 = 7,
	S12 = 12,
	S13 = 17,
	S14 = 22;
	var S21 = 5,
	S22 = 9,
	S23 = 14,
	S24 = 20;
	var S31 = 4,
	S32 = 11,
	S33 = 16,
	S34 = 23;
	var S41 = 6,
	S42 = 10,
	S43 = 15,
	S44 = 21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301;
	b = 0xEFCDAB89;
	c = 0x98BADCFE;
	d = 0x10325476;

	for (k = 0; k < x.length; k += 16) {
		AA = a;
		BB = b;
		CC = c;
		DD = d;
		a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		a = AddUnsigned(a, AA);
		b = AddUnsigned(b, BB);
		c = AddUnsigned(c, CC);
		d = AddUnsigned(d, DD);
	}

	var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

	return temp.toLowerCase();
}


