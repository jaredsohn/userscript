// ==UserScript==
// @name	DirtyDDL
// @icon	http://i.imgur.com/YIA9na2.png
// @namespace	http://www.softcreatr.de
// @author	Sascha Greuel
// @description	Direct download videos from "dirty" websites
// @version	1.9.1
// @run-at	document-end
// @grant	none
//
// @require	https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.0.3.js
// @require	http://yourjavascript.com/5818134233/aes.js
// @require	http://yourjavascript.com/1128214835/md5.js
// @require	http://yourjavascript.com/1502838391/rc4.js
//
// @include	/^https?://([a-z0-9]+\.)?amateurslust\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?angrymovs\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?beeg\.com/([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?befuck\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?burningcamel\.com/video/.*/
// @include	/^https?://([a-z0-9]+\.)?buttinsider\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?cuntriot\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?deviantclip\.com/watch/.*/
// @include	/^https?://([a-z0-9]+\.)?drtuber\.com/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?extremetube\.com/video/.*-([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?fetishok\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?fetishshrine\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?foxytube\.com/videos/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?hentaitube.biz/view/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?hentaitube\.tv/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?hotnaughtyteens\.com/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?hotshame\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?jerkbandit\.com/videos/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?katestube\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?keezmovies\.com/video/.*-([0-9]+)$/
// @include	/^https?://([a-z0-9]+\.)?kinkytube\.me/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?madmovs\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?manhub\.com/watch/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?mofosex\.com/videos/([0-9]+)/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?motherless\.com/([a-z0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?nastymovs\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?nuvid\.com/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?overthumbs\.com/galleries/.*/
// @include	/^https?://([a-z0-9]+\.)?p963\.com/videos/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?pinkrod\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?playvid\.com/([a-z0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?porn\.com/videos/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?pornerbros\.com/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?pornhub\.com/view_video.php\?viewkey=([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?pornper\.com/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?pornsharing\.com/.*_v([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?porntalk\.com/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?racialxxx\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?rawtube\.com/videos/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?redtube\.com/([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?sexytube\.me/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?sleazyneasy\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?sluttyred\.com/videos/.*-([0-9]+)\.html/
// @include	/^https?://([a-z0-9]+\.)?spankwire\.com/.*/video([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?submityourdude\.com/videos/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?submityourflicks\.com/videos/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?submityourmom\.com/videos/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?submityourtapes\.com/videos/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?sunporno\.com/videos/([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?tube8\.com/.*/.*/([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?updatetube\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?viptube\.com/video/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?wetplace\.com/videos/([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?xhamster\.com/movies/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?xtube\.com/watch\.php\?v=.*/
// @include	/^https?://([a-z0-9]+\.)?xvideos\.com/video([0-9]+)/.*/
// @include	/^https?://([a-z0-9]+\.)?xxxymovies\.com/([0-9]+)/
// @include	/^https?://([a-z0-9]+\.)?yobt\.com/content/([0-9]+)/.*\.html/
// @include	/^https?://([a-z0-9]+\.)?youjizz\.com/videos/.*-([0-9]+)\.html/
// ==/UserScript==

(function ($) {
	function dddlBox(url) {
		$('head').append('<style type="text/css">#dirtyDDL{position:fixed;z-index:0100100100100000010011000110111101110110011001010010000001001101011110010010000001010111011010010110011001100101;bottom:0;right:5px;width:100%;height:30px;text-align:center;background-color:#000;color:#FFF;padding-top:5px;opacity:.9;border-top:2px groove red}#dirtyDDL a{word-spacing:1em;letter-spacing:.5em;text-transform:uppercase;font-weight:600;font-size:11px;font-family:Verdana;color:#FFF;text-align:center;outline:0;display:block;text-decoration:none;padding:4px}#dirtyDDL a:hover{text-decoration:none}#dirtyDDL img{background:0;border:0;vertical-align:middle;margin:0;padding:0}</style>');

		$('body').append('<div id="dirtyDDL"><a title="Download" target="_blank" href="' + decodeURIComponent(url) + '" onclick="window.location.reload(true);">Download this clip!</a></div>');
	}

    function get(sString, start, end) {
        end = end || start.substring(start.length-1);
        return sString.split(start)[1].split(end)[0] || '';
    }

	// Declare vars
	var loc = window.location.host.toLowerCase(),
		downloadURL = '',
		temp1 = '',
		temp2 = '',
		temp3 = '',
		temp4 = '',
		temp5 = '';

	$.ajaxSetup({
		async: false
	});

	/***************************************/

	if (loc.match(/amateurslust\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/angrymovs\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

		// Not really required since beeg.com does allow downloading for non-members
	} else if (loc.match(/beeg\.com/)) {
        downloadURL = get($("script:contains('file')").html(), "file': '") + '?start=0';

		/***************************************/

	} else if (loc.match(/befuck\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
        
		/***************************************/

	} else if (loc.match(/burningcamel\.com/)) {
        downloadURL = get($("script:contains('createPlayer\(\"')").html(), 'createPlayer("');

		/***************************************/

	} else if (loc.match(/buttinsider\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/cuntriot\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/deviantclip\.com/)) {
        downloadURL = get($("script:contains('file')").html(), 'file":"');

		/***************************************/

	} else if (loc.match(/drtuber\.com/)) {
		temp1 = 'PT6l13umqV8K827';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www.');

		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file><![CDATA[', ']]></video_file>');
			}
		});

		/***************************************/

	} else if (loc.match(/extremetube\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), 'video_url=', '&');

		/***************************************/

	} else if (loc.match(/fetishok\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/fetishshrine\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/foxytube\.com/)) {
        downloadURL = get($("script:contains('file')").html(), 'file", "');

		/***************************************/

	} else if (loc.match(/hentaitube\.biz/)) {
        downloadURL = get($("script:contains('file')").html(), 'file","');

		/***************************************/

	} else if (loc.match(/hentaitube\.tv/)) {
		downloadURL = '/flvideo/' + window.location.pathname.split('/')[2] + '.flv';

		/***************************************/

	} else if (loc.match(/hotnaughtyteens\.com/)) {
        downloadURL = get($("script:contains('file')").html(), "file': '");

		/***************************************/

	} else if (loc.match(/hotshame\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/jerkbandit\.com/)) {
        downloadURL = $("#player").attr('href');

		/***************************************/

	} else if (loc.match(/katestube\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/keezmovies\.com/)) {
		temp1 = get($("script:contains('flashvars')").text(), 'video_title=', '&');
		temp2 = get($("script:contains('flashvars')").text(), 'video_url=', '&');
		downloadURL = Aes.Ctr.decrypt(decodeURIComponent(temp2), temp1, 256);


		/***************************************/

	} else if (loc.match(/kinkytube\.me/)) {
		downloadURL = get($("script:contains('file')").html(), "file': '");

		/***************************************/

	} else if (loc.match(/madmovs\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/manhub\.com/)) {
        downloadURL = get($("script:contains('var url')").html(), 'var url = "');

		/***************************************/

	} else if (loc.match(/mofosex\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url = '");

		/***************************************/

	} else if (loc.match(/motherless\.com/)) {
        downloadURL = get($("script:contains('__fileurl')").html(), "__fileurl = '");

		/***************************************/

	} else if (loc.match(/nastymovs\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "'video'   : '");

		/***************************************/

	} else if (loc.match(/nuvid\.com/)) {
		temp1 = 'hyr14Ti1AaPt8xR';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www.');

		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file><![CDATA[', ']]></video_file>');
			}
		});

		/*****************************************/

	} else if (loc.match(/overthumbs\.com/)) {
        temp1 = get($("script:contains('VideoID')").html(), 'VideoID = "');

		$.ajax({
			url: '/flvplayer/player/xml_connect.php?code=' + temp1,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<urlMOV1>', '</urlMOV1>');
			}
		});

		/***************************************/

	} else if (loc.match(/p963\.com/)) {
        downloadURL = get($("script:contains('url')").html(), "url: '");

		/***************************************/

	} else if (loc.match(/pinkrod\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
        
		/***************************************/

	} else if (loc.match(/playvid\.com/)) {
        temp1 = decodeURIComponent($('#video_player').attr('flashvars'));
        temp2 = ['720p', '480p', '360p'];
        
		// Try to find highest quality of the current video
		for (temp3 = 0; temp3 < temp2.length; temp3 += 1) {
			if (temp1.indexOf(temp2[temp3]) > 0) {
				temp4 = decodeURIComponent(get(temp1, '[' + temp2[temp3] + ']=', '&'));
                
                if (temp4.length) {
                    downloadURL = temp4;
                    break;
                }
			}
		}

		/***************************************/

	} else if (loc.match(/porn\.com/)) {
        downloadURL = get($("script:contains('file')").html(), 'file:"');

		/***************************************/

	} else if (loc.match(/pornerbros\.com/)) {
		$.ajax({
			url: '/content/' + window.location.pathname.split('/')[1] + '.js',
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, "url:escape('");
			}
		});

		/***************************************/

	} else if (loc.match(/pornhub\.com/)) {
        temp1 = $("script:contains('video_title')").html();
		temp2 = get(temp1, '"video_title":"').split('+').join(' ');
		temp3 = ['quality_720p', 'quality_480p', 'quality_240p', 'quality_180p', 'video_url'];

			// Try to find highest quality of the current video
			for (temp4 = 0; temp4 < temp3.length; temp4 += 1) {
				if (temp1.indexOf(temp3[temp4]) > 0) {
					temp5 = decodeURIComponent(get(temp1, '"' + temp3[temp4] + '":"'));
					break;
				}
			}

			downloadURL = Aes.Ctr.decrypt(temp5, temp2, 256);


		/***************************************/

	} else if (loc.match(/pornper\.com/)) {
        downloadURL = get($("script:contains('file')").html(), "'file': '");

		/***************************************/

	} else if (loc.match(/pornsharing\.com/)) {
		temp1 = 'TubeContext@Player';
		temp2 = ['_720p', '_480p', '_320p'];

		$.ajax({
			url: '/videoplayer/nvplaylist_ps_beta.php?id=' + window.location.pathname.split('_v')[1] + '&hq=1&autoplay=0',
			dataType: 'html',
			success: function (data) {
				temp4 = rc4(temp1, data, 'hex');

				// Try to find highest quality of the current video
				for (temp5 = 0; temp5 < temp2.length; temp5 += 1) {
					if (temp4.indexOf(temp2[temp5]) > 0) {
						downloadURL = get(get(temp4, '"' + temp2[temp5] + '":{"', '}'), 'fileUrl":"').split('\\/').join('/');
						break;
					}
				}
			}
		});

		/***************************************/

	} else if (loc.match(/porntalk\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/racialxxx\.com/)) {
        downloadURL = get($("script:contains('video')").html(), "video'   : '");

		/***************************************/

	} else if (loc.match(/rawtube\.com/)) {
        temp1 = $("script:contains('flashvars')").html();
        downloadURL = 'http://' + get(temp1, 'flashvars.site="') + '.rawtube.com/flvs/' + get(temp1, 'flashvars.id="') + '.flv';


		/***************************************/

	} else if (loc.match(/redtube\.com/)) {
        downloadURL = get($("script:contains('source src')").html(), "source src='");

		/***************************************/

	} else if (loc.match(/sexytube\.me/)) {
        downloadURL = get($("script:contains('file')").html(), "file': '");

		/***************************************/

	} else if (loc.match(/sleazyneasy\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/sluttyred\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file: "');

		/***************************************/

	} else if (loc.match(/spankwire\.com/)) {
        temp1 = $("script:contains('playerSWFname')").html();
		temp2 = ['_720p', '_480p', '_240p', '_180p'];

		// Try to find highest quality of the current video
		for (temp3 = 0; temp3 < temp2.length; temp3 += 1) {
			if (temp1.indexOf(temp2[temp3]) > 0) {
				temp4 = get(temp1, 'flashvars.quality' + temp2[temp3] + ' = "');
				
				if (temp4.length) {
					downloadURL = temp4;
					break;
				}
			}
		}

		/***************************************/

	} else if (loc.match(/submityourdude\.com/)) {
        downloadURL = get($("script:contains('file')").html(), 'file", "');

		/***************************************/

	} else if (loc.match(/submityourflicks\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');

		/***************************************/

	} else if (loc.match(/submityourmom\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');

		/***************************************/

	} else if (loc.match(/submityourtapes\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');

		/***************************************/

	} else if (loc.match(/sunporno\.com/)) {
		downloadURL = decodeURIComponent(get($('#myAlternativeContent').html(), 'file=' ,'&amp;'));

		/***************************************/

	} else if (loc.match(/tube8\.com/)) {
        temp1 = $("script:contains('flashvars')").html();
		temp2 = decodeURIComponent(get(temp1, '"video_title":"'));
		temp3 = get(temp1, '"video_url":"').split('\\/').join('/');
		downloadURL = Aes.Ctr.decrypt(temp3, temp2, 256).replace('int=2%25', 'int=2%2525');

		/***************************************/

	} else if (loc.match(/updatetube\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/viptube\.com/)) {
		temp1 = 'EwqOBQmJDMJRrgXZ';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www.');

		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file>', '</video_file>');
			}
		});

		/***************************************/

	} else if (loc.match(/wetplace\.com/)) {
        downloadURL = get($("script:contains('video_url')").html(), "video_url: '");

		/***************************************/

	} else if (loc.match(/xhamster\.com/)) {
		temp1 = $("#player param[name=flashvars]").val();
		temp2 = decodeURIComponent(get(temp1, 'srv=', '&'));
		temp3 = decodeURIComponent(get(temp1, 'file=', '&'));

		downloadURL = temp2 + '/key=' + temp3;

		/***************************************/

	} else if (loc.match(/xtube\.com/)) {
        temp1 = $("script:contains('contentId')").html();
		temp2 = get(temp1, "contentOwnerId = '");
		temp3 = get(temp1, "contentId = '");

        $.post("/find_video.php", {
			user_id: temp2,
			video_id: temp3
		}, function (data) {
			downloadURL = data.substr(10);
		});

		/***************************************/

	} else if (loc.match(/xvideos\.com/)) {
		downloadURL = get($('#flash-player-embed').attr('flashvars'), 'flv_url=', '&');

		/***************************************/

	} else if (loc.match(/xxxymovies\.com/)) {
		temp1 = get($("script:contains('SWFObject')").html(), "'file','");

		$.ajax({
			url: temp1,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<media:content url="', '" />');
			}
		});

		/***************************************/

	} else if (loc.match(/yobt\.com/)) {
		downloadURL = $('meta[itemprop=embedUrl]').attr('content');

		/***************************************/

	} else if (loc.match(/youjizz\.com/)) {
		$.ajax({
			url: $("iframe[src^='http://www.youjizz.com/videos/embed/']").attr('src'),
			dataType: 'html',
			success: function (data) {
				downloadURL = encodeURIComponent(get(data, '"file",encodeURIComponent("'));
			}
		});

		/***************************************/

		/**
		 End of page specific stuff
	   **/

	}

	if (downloadURL !== undefined && downloadURL !== null && downloadURL.length && downloadURL !== 'undefined') {
		dddlBox(downloadURL);
	}

	/***************************************/

}(jQuery.noConflict(true)));