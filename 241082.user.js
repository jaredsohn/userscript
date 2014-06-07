// ==UserScript==
// @name Flash2MPlayer
// @namespace youku.todou.vlc.player
// @description Flash.2.MPlayer
// @version 1
// @match http://*/*
// @match http://www.tudou.com/*
// @match http://douban.fm/
// @match http:/tv.sohu.com/*
// @grant GM_xmlhttpRequest
// ==/UserScript==


(function() {
	function Flash2Mplayer(global) {
		global.playIndex = 0;
		global.playlist = [];
		global.videoSeconds = 0;
		global.seqsPlayTime = 0;
		global.mpalyer_videoId = null;
		global.DBR = null;
		//global.playerBox = null;
		global.cookieExpire = 60 * 24 * 3600;
		document.body.onload = function() {
			if (document.getElementsByTagName('video').length == 0)
				return;
			var html5video = document.getElementsByTagName('video')[0];
			var htmlUrl = html5video.getAttribute('type', 'video/mp4');
			replacePlayer();
		};
		function randomString(len) {
			len = len || 32;
			var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
			var maxPos = $chars.length;
			var pwd = '';
			for (i = 0; i < len; i++) {
				pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		}
		;
		global.getNode = function getNode(id) {
			return document.getElementById(id);
		};
		global.getDoubanPlayList = function getDoubanPlayList() {
			var r = randomString(10);
			var url = 'http://douban.fm/j/mine/playlist?type=n&sid=&pt=0.0'
					+ '&channel=' + global.channel + '&from=mainsite&r=' + r;
			var XMLHttp = new XMLHttpRequest();
			XMLHttp.open('GET', url, 10);
			XMLHttp.send();
			XMLHttp.onreadystatechange = function() {
				if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
					global.playlist = JSON.parse(XMLHttp.responseText)['song'];
					global.playIndex = 0;
					nextAudio();
				}
			};
		};
		global.bdloadCnt = 0;
		global.bdPanVideo = function dbPanVideo() {
			var token = window.self.FileUtils.bdstoken;
			global.bdloadCnt++;
			if (typeof token == 'undefined') {
				if (global.bdloadCnt > 5) {
					return;
				}
				setTimeout(dbPanVideo, 1000);
				return;
			}
			console.log(token);
			var path = window.location.hash.split('=')[1].split('&')[0].split('/')[2];
			var url = 'http://pan.baidu.com/api/list?channel=chunlei&clienttype=0'
					+ '&web=1&dir=' + path + '&bdstoken=' + token + '&channel=chunlei&clienttype=0&web=1';
			var XMLHttp = new XMLHttpRequest();
			XMLHttp.open('GET', url, 10);
			XMLHttp.send();
			XMLHttp.onreadystatechange = function() {
				if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
					var videourl = JSON.parse(XMLHttp.responseText);
					console.log(videourl);
					embed = +'<embed id="mplayer" type="application/x-mplayer2" '
							+ 'style="width:980px;height:480px;" src="' + videourl + '" '
							+ 'onMediaCompleteWithError="mplayerError(error);"></embed>';
					getNode('video-wrap').innerHTML = embed;
				}
			};
		};
		global.nextAudio = function nextAudio() {
			var nextIndex = global.playIndex + 1;
			if (nextIndex < global.playlist.length) {
				global.playIndex = nextIndex;
				var audioInfo = '<img src="' + global.playlist[nextIndex]['picture'].replace('mpic', 'lpic') + '" style="max-width: 245px; max-height: 205px;" />'
						+ '<div style="float: right;font-weight: bold;width: 240px;color: #007D5C; line-height: 30px;">'
						+ '<style type="text/css">span {display:inline-block;margin-right:10px;}</style>'
						+ '<span>歌者:</span>' + global.playlist[nextIndex]['artist']
						+ '<br /><span>公司:</span>' + global.playlist[nextIndex]['company']
						+ '<br /><span>歌名:</span>' + global.playlist[nextIndex]['title']
						+ '<br /><span>专辑:</span>' + global.playlist[nextIndex]['albumtitle']
						+ '<br /><span onclick="nextAudio();" style="cursor:pointer;font-size: 18px;margin-top:20px;">下一首</span>'
						+ '</div>';
				getNode("audioInfo").innerHTML = audioInfo;
				getNode('mplayer').setAttribute('src', global.playlist[nextIndex]['url']);
				getNode('mplayer').Play();
				//nextIndex++;
				return;
			} else {
				getDoubanPlayList();
			}
		};

		global.cleanDoubanFMEvent = function cleanDoubanFMEvent() {
//            global.initBannerAd = function() {
//            };
//            global.bgad = {has_channel_ad: function() {
//                }};
			global.DBR = {swf: function() {
				}, act: function(s, q) {
				},
				radio_getlist: function(q) {
				},
				close_video: function() {
				},
				play_video: function() {
				},
				is_paused: function() {
				},
				logout: function() {
					window.is_user_login = false;
					delete globalConfig.uid;
					$("#fm-header").find("#anony_nav").remove().end().find("#user_info").remove().end().prepend($.tmpl($("#tmpl_user_info").html(), {}))
				},
				show_login: function() {
					var q = globalConfig.doubanHost + "/service/account/check_with_js?" + $.param({return_to: globalConfig.login_check_url, sig: globalConfig.ajax_sig, r: Math.random()}) + "&callback=?";
					$.getJSON(q, function(r) {
						$.getJSON(r.url, function(s) {
							if (s.r == 0) {
								$(window).trigger(window.consts.LOGIN_EVENT, s.user_info)
							} else {
								show_login()
							}
						})
					})
				}};

			$(".channel_list").undelegate();
			$(".channel_list").delegate(".channel:not(.selected)", "click", function(V) {
				var T = $(this), R = $(".channel"), X = T.data("cid"),
						U = T.closest(".channel_list").attr("id");
				global.channel = T.attr("cid");
				setCookie('mplayer_doubanChannel', global.channel, global.cookieExpire);
				getDoubanPlayList();
				$.getJSON("/j/change_channel?fcid=" + T.attr("data-cid") + "&tcid=" + X + "&area=" + U);
			});
		};
		global.mplayerError = function mplayerError(error) {
			var msg = '';
			switch (error) {
				case 1:
					msg = 'ERROR_NO_STREAM';
					break;
				case 1 << 1:
					msg = 'ERROR_CODEC_FAILURE';
					break;
				case 1 << 2:
					msg = 'ERROR_EXPLICIT_KILL';
					break;
				case 1 << 3:
					msg = 'ERROR_PLAYER_INTERRUPTED';
					break;
				case 1 << 4:
					msg = 'ERROR_EXECV';
					break;
				case 1 << 5:
					msg = 'ERROR_NOT_PLAYLIST';
					break;
				case 1 << 6:
					msg = 'ERROR_FILE_NOT_FOUND';
					break;
				default:
					return;
			}
			console.log(msg);
		};
		global.createDoubanFmAudo = function createDoubanFmAudo() {
			cleanDoubanFMEvent();
			global.channel = getCookie('mplayer_doubanChannel') || 1;
			var htmlRadio = '<div id="audioInfo" style="height:205px;">'
					+ '</div>'
					+ '<embed id="mplayer" type="application/x-mplayer2" '
					+ 'style="width:510px;height:40px;"'
					+ 'onMediaComplete="nextAudio();"'
					+ 'onMediaCompleteWithError="mplayerError(error);"></embed>';
			global.player = getNode('mplayer');

			getNode('fm-player').firstElementChild.innerHTML = htmlRadio;
			getDoubanPlayList();
		};
		function replacePlayer() {
			console.log('replace');
			if (document.domain == 'douban.fm') {
				function check() {
					getNode('fm-player').firstElementChild.innerHTML = '';
					if (typeof getNode('radioplayer') != 'undefined') {
						createDoubanFmAudo();
					} else {
						setTimeout(check, 1000);
					}
				}
				check();
			}
			if (document.domain == 'tv.sohu.com') {
				return sohuVideo();
			}
			if (document.domain == 'pan.baidu.com') {
				return bdPanVideo();
			}
			if (typeof videoId2 !== 'undefined') {
				var videoId = videoId2;
			} else if (typeof vcode !== 'undefined') {
				var videoId = window.vcode;
			} else if (typeof iid !== 'undefined') {
				var videoId = window.iid;
				document.getElementById('__flash2mplayer').setAttribute('tudouiid', 1);
				document.getElementById('__flash2mplayer').setAttribute('segs', pageConfig.segs.toString());

			} else if (typeof pageConfig !== 'undefined' && typeof pageConfig.iid !== 'undefined') {
				var videoId = pageConfig.iid;
				document.getElementById('__flash2mplayer').setAttribute('tudouiid', 1);
				document.getElementById('__flash2mplayer').setAttribute('segs', pageConfig.segs);
			} else {
				//console.log('No Video Id');
				var embedList = document.getElementsByTagName('embed');
				for (var i = 0; i < embedList.length; i++) {
					var embedNode = embedList[i];
					if (embedNode.getAttribute('type') == 'application/x-shockwave-flash') {
						var uriInfo = embedNode.getAttribute('src').split('/');
						if (uriInfo.indexOf('player.youku.com') >= 0) {
							var i = uriInfo.indexOf('sid') + 1;
							videoId = uriInfo[i];
							embedNode.parentNode.setAttribute('id', 'player');
							document.getElementById('__flash2mplayer').setAttribute('site', 'youku');
							document.getElementById('__flash2mplayer').setAttribute('embed', 1);
						}
					}
				}
				if (typeof videoId == 'undefined') {
					return;
				}
			}
			global.mpalyer_videoId = 'youkutudou' + videoId;

			document.getElementById('__flash2mplayer').setAttribute('vcode', videoId);
			//getNode('player').innerHTML = 'Loading Mplayer...';
		}
		;
		global.farmatTime = function farmatTime(sec) {
			var s = sec % 60;
			s = s > 9 ? s : '0' + s;
			var m = Math.round(sec / 60);
			m = m > 9 ? m : '0' + m;
			return m + ':' + s;
		};

		global.F2McallbackGetData = function F2McallbackGetData(re, seconds) {
			if (typeof vcode !== 'undefined' || document.domain == 'youku.com') {
				return F2MgetYoukuURL(re);
			}
			if (getNode('__flash2mplayer').getAttribute('site') == 'youku') {
				return F2MgetYoukuURL(re);
			}
			global.playlist = re;
			global.videoSeconds = seconds;
			if (document.domain == 'tv.sohu.com') {
				videoWarperId = 'sohuplayer';
			} else {
				videoWarperId = 'player';
			}
			var vid = getCookie('mplayer_videoId');
			var history = parseInt(getCookie('mplayer_seqs'));
			if (history && vid && vid == global.mpalyer_videoId) {
				global.playIndex = history;
				createPlayer(re[history]['url'], videoWarperId);
			} else {
				setCookie('mplayer_seqs', 0, global.cookieExpire);
				global.playIndex = 0;
				createPlayer(re[0]['url'], videoWarperId);
			}
		};

		global.sohuVideo = function sohuVideo() {
			var fuid = getCookie('fuid');
			if (!fuid) {
				setTimeout(sohuVideo, 1000);
				return;
			}
			global.mpalyer_videoId = 'sohu' + vid;
			document.getElementById('__flash2mplayer').setAttribute('sohufuid', fuid);
			document.getElementById('__flash2mplayer').setAttribute('sohuplaylistId', playlistId);
			document.getElementById('__flash2mplayer').setAttribute('vid', vid);
			//createPlayer('sohuplayer');
		};
		global.getCookie = function getCookie(cn) {
			var i, x, y, a = document.cookie.split(";");
			for (i = 0; i < a.length; i++) {
				x = a[i].substr(0, a[i].indexOf("="));
				y = a[i].substr(a[i].indexOf("=") + 1);
				x = x.replace(/^\s+|\s+$/g, "");
				if (x == cn)
					return unescape(y);
			}
			return null;
		};
		global.setCookie = function setCookie(cn, v, ex) {
			var e = new Date(), n = e.getTime();
			ex = n + ex * 1000;
			e.setTime(ex);
			var cv = escape(v) + "; exs=" + e.toUTCString();
			document.cookie = cn + "=" + cv;
		};
		global.createPlayer = function createPlayer(url, playerId) {
			playerId = playerId || 'player';
			var w = getNode(playerId).offsetWidth;
			var t = farmatTime(global.videoSeconds);

			getNode(playerId).setAttribute('style', 'background-color:#EEE;margin:0;padding:0;text-indent: 0;');
			getNode(playerId).innerHTML = '<embed type="application/x-mplayer2" id="mplayer"'
					+ 'name="video2 --cache=1024 --volume=80 --forcecache=1024" width="100%" height="500" src="' + url + '"'
					+ 'onMediaComplete="playComplete();" showlogo="true" onMediaCompleteWithError="mplayerError(error);" forcecache="64" fullscreen single_instance replace_and_play />'
					+ '<style type="text/css">'
					+ '#videoInfo span {display:inline-block;margin-left:10px;font-weight:bold;color:#000;}'
					+ '</style>'
					+ '<div id="videoInfo" style="background-color:#EEE;"><span id="curIdx">1/' + global.playlist.length + '</span>'
					+ '<span id="videoTime">00:00/' + t + '</span>'
					+ '<span onclick="videoNextSeqs(\'click\');" style="cursor:pointer;">下一节</span>'
					+ '<span onclick="videoPreviousSeqs(\'click\');" style="cursor:pointer;">上一节</span>'
					+ '</div><div id="playerPlaceholder"></div>';
			//global.playIndex = 0;
			getNode('curIdx').innerHTML = (global.playIndex + 1) + '/' + global.playlist.length;
			global.player = getNode('mplayer');
			setCookie('mplayer_videoId', global.mpalyer_videoId, global.cookieExpire);
			global.timeUpdate = function timeUpdate() {
				var cpt = global.player.getTime();
				var nt = Math.round(global.seqsPlayTime + (cpt || 0));

				getNode('videoTime').innerHTML = farmatTime(nt) + '/' + t;
				setTimeout(timeUpdate, 1000);
			};
			timeUpdate();
			return global.player;
		};
		global.videoNextSeqs = function videoNextSeqs(clk) {
			playComplete(clk);
		};
		global.videoPreviousSeqs = function videoPreviousSeqs() {
			var preIndex = global.playIndex - 1;
			if (preIndex >= 0) {
				global.playIndex = preIndex;
				setCookie('mplayer_seqs', preIndex, global.cookieExpire);
				global.seqsPlayTime -= global.playlist[preIndex]['seconds'];
				getNode('curIdx').innerHTML = (preIndex + 1) + '/' + global.playlist.length;
				player.setAttribute('src', global.playlist[preIndex]['url']);
				player.Play();
				return;
			}
		};
		global.sleep = function sleep(sec) {
			d = sec * 1000;
			for (var t = Date.now(); Date.now() - t <= d; )
				;
		};
		global.playComplete = function playComplete(e) {
			var fullscreen = player.fullscreen;
			if (e != 'click') {
				var curTime = player.getTime();
				function continuePlay() {
					player.Play();
					setTimeout(function() {
						player.PlayAt(curTime);
						setTimeout(function() {
							player.PlayAt(curTime);
							if (fullscreen) {
								player.fullscreen = true;
							}
						}, 1000);
					}, 1000);
				};
				if (Math.round(curTime) < Math.round(player.getDuration())) {
					setTimeout(continuePlay, 10000);
					return;
				}
			}
			var nextIndex = global.playIndex + 1;
			if (nextIndex <= global.playlist.length) {
				global.playIndex = nextIndex;
				setCookie('mplayer_seqs', nextIndex, global.cookieExpire);
				global.seqsPlayTime += global.playlist[nextIndex]['seconds'];

				getNode('curIdx').innerHTML = (global.playIndex + 1) + '/' + global.playlist.length;
				player.setAttribute('src', global.playlist[nextIndex]['url']);
				player.Play();
				if (fullscreen) {
					function fs() {
						if (player.playState == 8 || player.playState == 1) {
							return;
						}
						if (player.playState == 6) {
							setTimeout(fs, 2000);
							return;
						}
						if (player.playState != 3) {
							setTimeout(fs, 1000);
							return;
						}
						player.fullscreen = true;
						player.setAttribute("fullscreen", fullscreen);
					}
					fs();
				}
				return;
			}
		};

		global.F2MgetYoukuURL = function F2MgetYoukuURL(spec) {
			var data = spec.data[0], d = new Date(), fileType = getFileType(data['streamfileids']);
			var fileid = getFileID(data['streamfileids'][fileType], data['seed']);
			var rand1 = 1000 + parseInt(Math.random() * 999);
			var rand2 = 1000 + parseInt(Math.random() * 9000);
			var sid = d.getTime() + '' + rand1 + '' + rand2;
			var first = '';
			var pathType = fileType == 'mp4' ? 'mp4' : 'flv';
			for (var i = 0, len = (data['segs'][fileType]).length; i < len; i++) {
				var k = data['segs'][fileType][i]['k'],
						url = 'http://f.youku.com/player/getFlvPath/sid/' +
						sid + '_' + toHex(i) + '/st/' + pathType + '/fileid/' +
						fileid.substr(0, 8) + toHex(i) + fileid.substr(10, fileid.length - 2) + '?start=0&K=' + k + '&hd=2&myp=0&ts=185&ypp=0';
				global.videoSeconds += parseInt(data['segs'][fileType][i]['seconds']);
				var seq = {};
				seq['seconds'] = parseInt(data['segs'][fileType][i]['seconds']);
				seq['url'] = url;
				global.playlist.push(seq);
				if (i == 0) {
					first = url;
				}
			}
			var vid = getCookie('mplayer_videoId');
			var history = parseInt(getCookie('mplayer_seqs'));
			if (history && vid && vid == global.mpalyer_videoId) {
				global.playIndex = history;
				createPlayer(global.playlist[history]['url']);
			} else {
				setCookie('mplayer_seqs', 0, global.cookieExpire);
				global.playIndex = 0;
				createPlayer(first);
			}
		};
		function getFileIDMixString(seed) {
			var mixed = [
			];
			var source = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890'.split('');
			var index,
					len = source.length;
			for (var i = 0; i < len; i++) {
				seed = (seed * 211 + 30031) % 65536;
				index = Math.floor(seed / 65536 * source.length);
				mixed.push(source[index]);
				source.splice(index, 1);
			}
			return mixed;
		}
		;
		function getFileID(fileid, seed) {
			var mixed = getFileIDMixString(seed);
			var ids = fileid.split('*');
			var realId = [
			];
			var idx;
			for (var i = 0; i < ids.length; i++) {
				idx = parseInt(ids[i], 10);
				realId.push(mixed[idx]);
			}
			return realId.join('');
		}
		;
		function getFileType(obj) {
			var keys = Object.keys(obj);
			if (keys.indexOf('hd2') >= 0) {
				return 'hd2';
			} else if (keys.indexOf('flv') >= 0) {
				return 'flv';
			} else if (keys.indexOf('mp4') >= 0) {
				return 'mp4';
			}
		}
		;
		function toHex(number) {
			var str = number.toString(16);
			return ((str.length < 2) ? '0' + str : str).toUpperCase();
		}
		;
		replacePlayer();
	}
	;

	function run(callback) {
		if (window.top != window)
			return true;

		var script = document.createElement('script');
		script.id = '__flash2mplayer';
		script.textContent = '(' + callback.toString() + ')(window);';
		document.body.appendChild(script);
		if (document.domain == 'douban.fm') {
			return;
		}
		var conunt = 0, max = 6;
		function request() {
			if (document.domain == 'tv.sohu.com') {
				var vid = document.getElementById('__flash2mplayer').getAttribute('vid');
				if (!vid) {
					if (count > max)
						return;
					count++;
					setTimeout(request, 1000);
					return;
				}
				var fuid = document.getElementById('__flash2mplayer').getAttribute('sohufuid');
				var playlistId = document.getElementById('__flash2mplayer').getAttribute('sohuplaylistId');

				var url = "http://hot.vrs.sohu.com/vrs_flash.action?vid=" + vid
						+ "&af=1&bw=8135&plid=" + playlistId + "&uid=" + fuid + "&out=0&g=8&referer="
						+ encodeURIComponent(window.location.href) + '&t=' + Math.random();
				var playlist = [];
				var count = 0;
				GM_xmlhttpRequest({method: 'GET', url: url,
					onload: function(response) {
						var videoList = JSON.parse(response.responseText);
						var sohucatcode = videoList.catcode;
						var ip = videoList.allot;
						var len = videoList.data.su.length;
						for (var i in videoList.data.su) {
							var clip = videoList.data.clipsURL[i].split('/').splice(-4, 4).join('/');
							var getrealurl = "http://" + ip + "/?prot=2&t=0.123123&file=" + clip + "&new=" + videoList.data.su[i];
							var sec = videoList.data.clipsDuration;
							var tsec = videoList.data.totalDuration;
							GM_xmlhttpRequest({method: 'GET', url: getrealurl,
								su: videoList.data.su[i],
								idx: i, sec: sec,
								onload: function(response) {
									count++;
									var realurl = response.responseText.split('|');
									var videourl = realurl[0] + this.su + '?key=' + realurl[3]
											+ '&ua=&ch=v&catcode=' + sohucatcode
											+ '&plat=flash_Linux3.11.10-200.fc19.x86_64&n=6&a=4019';
									playlist[this.idx] = {};
									playlist[this.idx]['url'] = videourl;
									playlist[this.idx]['seconds'] = this.sec;
									if (count == len) {
										var script = document.createElement('script');
										script.textContent = 'F2McallbackGetData(' + JSON.stringify(playlist) + ',' + Math.round(tsec) + ');';
										document.body.appendChild(script);
									}
								}});
						}
					}});
				return;
			}
			var vcode = document.getElementById('__flash2mplayer').getAttribute('vcode');

			if (!vcode) {
				if (count > max)
					return;
				count++;
				setTimeout(request, 1000);
				return;
			}

			var tudoduiid = document.getElementById('__flash2mplayer').getAttribute('tudouiid');

			if (tudoduiid) {
				var videosegs = JSON.parse(document.getElementById('__flash2mplayer').getAttribute('segs'));
				if (typeof videosegs['5'] !== 'undefined') {
					var seg = videosegs['5'];
				} else if (typeof videosegs['3'] !== 'undefined') {
					var seg = videosegs['3'];
				} else {
					var seg = videosegs['2'];
				}

				var playlist = [];
				var len = seg.length;
				var count = 0;
				var seconds = 0;
				for (var i in seg) {
					var url = 'http://v2.tudou.com/f?sender=pepper&v=4.2.2&sj=1&id=' + seg[i]['k'] + '&sid=11000&hd=5&r=0';
					seconds = seconds + seg[i]['seconds'];
					request = GM_xmlhttpRequest({
						idx: i,
						method: 'GET',
						seconds: seconds,
						url: url,
						onload: function(response) {
							var tmp = document.createElement('span');
							var re = response.responseText.split('>') [1].split('<') [0];
							tmp.innerHTML = re;
							var index = seg[this.idx]['no'];
							playlist[index] = {};
							playlist[index]['url'] = tmp.textContent;
							playlist[index]['seconds'] = Math.round(this.seconds / 1000);
							count++;
							if (count == len) {
								var script = document.createElement('script');
								script.textContent = 'F2McallbackGetData(' + JSON.stringify(playlist) + ',' + Math.round(seconds / 1000) + ');';
								document.body.appendChild(script);
							}
							delete tmp;
						}
					});
				}

				return;
			} else {
				var url = 'http://v.youku.com/player/getPlayList/VideoIDS/' + vcode + '/timezone/+08/version/5/source/out/Sc/2?password=&ran=9777&n=3';
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(response) {
					var re = response.responseText;
					var script = document.createElement('script');
					script.textContent = 'F2McallbackGetData(' + re + ',0);';
					document.body.appendChild(script);
				}
			});
		}
		request();
		//setTimeout(request, 1000);

	}
	;
	var ckc = 1;
	var stop = false;
	var call = function() {
		if (ckc >= 5)
			return;
		if (document.getElementsByTagName('object').length == 0
				&& document.getElementsByTagName('embed').length == 0) {
			if (stop)
				return;
			setTimeout(call, 2000);
		} else {
			var stop = true;
			run(Flash2Mplayer);
			return;
		}
		ckc++;
	}
	call();
})();

