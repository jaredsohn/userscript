// ==UserScript==
// @name        BetterTube 5.19.1
// @namespace   http://www.userscripts.org
// @description auto-embed videos from different sites
// @version     5.19.1
// @date        2008-05-26
// @exclude     *keepvid.com*
// @exclude     *clipnabber.com*
// @include     *atomfilms.com/film*
// @include     *break.com/index/*
// @include     *clipmoon.com/videos/*
// @include     *collegehumor.com/video:*
// @include     *comedycentral.com/videos/index.jhtml?videoId=*
// @include     *dailymotion.com*video*
// @include     *elnuevodia.com/endtv*
// @include     *funnyordie.com/videos*
// @include     *gamespot.com/pages/filter/video_player.php*
// @include     *gametrailers.com/player*
// @include     *gamevideos.com/video/id*
// @include     *glumbert.com/media*
// @include     *godtube.com/view_video.php*
// @include     *guba.com/watch*
// @include     *hulu.com/watch*
// @include     *jumpcut.com/view?id=*
// @include     *kewego.com/video*
// @include     *liveleak.com/view?i=*
// @include     *media.putfile.com*
// @include     *megavideo.com/?v=*
// @include     *metacafe.com/watch/*
// @include     *pikniktube.com/v*
// @include     *pornhub.com/view_video.php?viewkey=*
// @include     *pornotube.com/media.php*
// @include     *redtube.com/*
// @include     *revver.com/video*
// @include     *rutube.ru/tracks*
// @include     *scribd.com/doc*
// @include     *slideshare.net/*
// @include     *smotri.com/video*
// @include     *snotr.com/video*
// @include     *spike.com/video/*
// @include     *theonion.com/content/video*
// @include     *tudou.com/programs/view/*
// @include     *uncutvideo.aol.com/videos*
// @include     *vbox7.com/play:*
// @include     *veoh.com/videos/*
// @include     *video.google.*/videoplay?docid=*
// @include     *video.yahoo.com/watch/*
// @include     *vids.myspace.com/index.cfm?fuseaction=vids.individual&VideoID=*
// @include     *vimeo.com/*
// @include     *vuze.com/details*
// @include     *wegame.com/watch*
// @include     *youporn.com/watch*
// @include     *youtube.com/watch?v=*
// @include     *eyespot.com/share*
// @include     *teachertube.com/view_video.php*
// @include     *izlesene.com/video*
// @include     *yousportz.com/watch*
// @include     *56.com/*
// @include     *escapistmagazine.com/articles/view/editorials/zeropunctuation*
// @include     *aniboom.com/Player.aspx?v=*
// @include     *ted.com/index.php/talks/view/id*
// @include     *shoutfile.com/v*
// @include     *tu.tv/videos/*
// @include     *clipjunkie.com*.html
// @include     *vidivodo.com/*/*
// @include     *viddyou.com/viddstream?videoid=*
// @include     *videos.streetfire.net/video*
// @include     *dalealplay.com/informaciondecontenido.php?con=*
// @include     *photobucket.com/video/*
// @include     *livevideo.com/video/*
// @include     *spankwire.com/articles*
// ==/UserScript==

// ===================================================================================
// SCRIPT CONFIGURATION
// if you know what you're doing, you can change these variables to configure the
// script to your liking

// width and length for all sites
var width = Math.floor(screen.width*0.80);
var height = Math.floor(screen.height*0.80);

// autoplay: turning these on turns on autoplay for all sites
var auto1 = GM_getValue("auto1", "0");
var autoT = GM_getValue("autoT", "false");

// ===================================================================================

// remove css
var head = document.getElementsByTagName('head')[0];
var allLinks = document.getElementsByTagName('link');
for (var i = 0; i < allLinks.length; i++) {
    if (allLinks[i].type == "text\/css") {head.removeChild(allLinks[i]);}
}

// variable setups
var domain = document.domain;
var href = window.location.href;
var len = href.length;
var vid, embed = document.createElement('embed');
var dlink = '';
// repeated strings
var type = ' type="application/x-shockwave-flash" ';
var pluginspage = ' pluginspage="http://www.macromedia.com/go/getflashplayer" ';

// extremely useful function
function strBetween(source, strA, strB) {
    var indA = (strA=='') ? 0 : source.indexOf(strA)+strA.length;
    var indB = (strB=='') ? source.length : source.indexOf(strB, indA);
    return source.substring(indA, indB);
}

// giant switch to embed video
switch (domain) {
    case "www.atomfilms.com":
        vid = strBetween(href, 'film/', '.jsp');
        embed.innerHTML = '<embed src="http://www.atomfilms.com:80/a/autoplayer/shareEmbed.swf?keyword=' + vid + '" width="' + width + '" height="' + height + '"></embed>';
		break;
    case "www.hulu.com":
        vid = document.getElementsByTagName('link')[4].href;
        embed.innerHTML = '<embed src="' + vid + '"' + type + 'width="' + width + '" height="' + height + '"></embed>';
        break;
	case "megavideo.com":
        embed = document.createElement('object');
		embed.innerHTML = document.getElementsByTagName('input')[2].value.replace(/width="\d*" height="\d*"/g, 'width=' + width + ' height=' + height);
		break;
	case "www.metacafe.com":
        vid = href.substring(30, len-1);
		embed.innerHTML = '<embed src="http://www.metacafe.com/fplayer/' + vid + '.swf" width="' + width + '" height="' + height + '" wmode="transparent"' + pluginspage + type + '></embed>';
		break;
    case "revver.com":
        embed = document.getElementsByTagName('object')[0];
        break;
    case "www.slideshare.net":
        vid = document.getElementsByTagName('link')[2].href;
        vid = strBetween(vid, '.net/', '-thumb');
        embed.innerHTML = '<embed src="http://static.slideshare.net/swf/ssplayer2.swf?doc=' + vid + '"' + type + 'allowscriptaccess="always" allowfullscreen="true" width="' + width + '" height="' + height + '"></embed>';
        dlink = href + 'download';
		break;
	case "www.snotr.com":
        embed = document.getElementsByTagName('object')[0];
        break;
	case "www.tudou.com":
		vid = href.substring(href.indexOf('view/')+5, len-1);
		embed.innerHTML = '<embed src="http://www.tudou.com/v/' + vid + '"' + type + 'width="' + width + '" height="' + height + '" allowScriptAccess="always"></embed>';
		break;
	case "video.google.com":
        vid = href.substring(href.indexOf('=')+1, len);
		if (href.match("video.google.com")) {var lang = "en";}
		else {var lang = href.substring(href.indexOf("video.google.")+13, href.indexOf("videoplay")-1);}
		var auto = (autoT == "true") ? "autoPlay=true" : "";
        embed.innerHTML = '<embed id="VideoPlayback" style="width:' + width + 'px;height:' + height + 'px" flashvars="" src="http://video.google.com/googleplayer.swf?docid=-3030582436688674946&hl=en"' + type + '></embed>';
		break;
    case "www.vuze.com":
        embed = document.getElementsByTagName('object')[0];
        break;
    case "www.youtube.com":
	case "youtube.com":
		embed = document.getElementsByTagName('embed')[1];
        //embed.innerHTML = document.getElementById('embed_code').value.replace(/425/g, width).replace(/355/g, height);
        //embed.src = embed.flashvars+"&autoplay=0";
        var script = document.getElementsByTagName('script')[2].innerHTML;
        var exID = script.substring(script.indexOf("\"t\": \"")+6, script.indexOf("\", \"hl\""));
        dlink = href.replace(/watch\?v/, 'get_video?video_id') + "&t=" + exID;
		break;
    case "www.youporn.com":
        embed.innerHTML = document.getElementById('player').innerHTML.replace(/470/g, height).replace(/600/g, width);
        dlink = document.getElementById('download').getElementsByTagName('a')[0].href;
        break;
    case "56.com":
        embed = document.getElementsByTagName('object')[0];
        embed.childNodes[5].width = width;
        embed.childNodes[5].height = height;
        break;
    case "www.aniboom.com":
        embed = document.createElement('object');
        ehtml = document.getElementsByTagName('input')[5].value;
        embed.innerHTML = ehtml.replace(/425/g, width).replace(/355/g, height);
        break;
    case "www.ted.com":
        embed = document.getElementsByTagName('embed')[0];
        dlink = document.getElementById('downloadLinks').getElementsByTagName('a')[1].href;
        break;
    case "www.viddyou.com":
        embed = document.getElementById('Main_Vidd_Div');
        embed = embed.getElementsByTagName('embed')[0]
        break;
    default:
        embed = document.getElementsByTagName('embed')[0];
        break;
}

// determine which download links to show
var showDLkeepvid = new Array(
                                "www.break.com",
                                "www.dailymotion.com",
                                "www.jumpcut.com",
                                "megavideo.com",
                                "www.metacafe.com",
                                "video.google.com",
                                "vids.myspace.com",
                                "youtube.com",
                                "www.youtube.com"
                                );
var showDLclipnabber = new Array(
                                "www.break.com",
                                "www.collegehumor.com",
                                "www.dailymotion.com",
                                "www.funnyordie.com",
                                "www.glumbert.com",
                                "www.jumpcut.com",
                                "www.kewego.com",
                                "www.liveleak.com",
                                "megavideo.com",
                                "www.metacafe.com",
                                "www.pikniktube.com",
                                "www.spike.com",
                                "www.tudou.com",
                                "www.veoh.com",
                                "video.google.com",
                                "video.yahoo.com",
                                "vids.myspace.com",
                                "vimeo.com",
                                "youtube.com",
                                "www.youtube.com",
                                "56.com",
                                "www.yousportz.com",
                                "www.teachertube.com",
                                "www.izlesene.com",
                                "www.shoutfile.com",
                                "www.tu.tv",
                                "www.clipjunkie.com",
                                "www.vidivodo.com",
                                "www.viddyou.com",
                                "videos.streetfire.net",
                                "www.dalealplay.com",
                                "www.livevideo.com"
                                );
var DLkeepvid = 'http://keepvid.com/?url=' + escape(href);
var DLclipnabber = 'http://clipnabber.com/?mode=2&txt1=' + escape(href);
if (dlink != '') {dlink = '<a id="dld" href="'+dlink+'">Direct Download</a><br><br>';}
if (showDLkeepvid.indexOf(domain) != -1) {DLkeepvid = '<a id="dlk" href="'+DLkeepvid+'">Download from KeepVid</a><br><br>';}
else {DLkeepvid = '';}
if (showDLclipnabber.indexOf(domain) != -1) {DLclipnabber = '<a id="dlc" href="'+DLclipnabber+'">Download from ClipNabber</a><br><br>';}
else {DLclipnabber = '';}

// comedycentral, pikniktube, onion, youporn
// pornotube
// set video dimensions
embed.width = width;
embed.height = height;

// replace page
table = document.createElement('table');
table.innerHTML = '<tr>' +
                  '<td id="embedrow"></td>' +
                  '<td id="linkrow">' + dlink + DLkeepvid + DLclipnabber + '</td>' +
                  '</tr>';
html = document.getElementsByTagName('html')[0];
html.removeChild(document.body);
html.appendChild(table);
document.getElementById('embedrow').appendChild(embed);

// ===================================================================================
// autochecks for updates to script

var GM_update = function(title, version, updateUrl, versionUrl) {
			var title = title;
			var today = new Date();
			today = today.getDate();
			var last = GM_getValue(title);
			var current;
			var answer;
			var updateUrl = updateUrl;
			var versionUrl = versionUrl;
			this.init = function() {
				if(last != undefined) {
					if(today - last >= 3 || today - last <= -24) {
						GM_setValue(title, today);
						this.check();
					}
				}
				else {
					GM_setValue(title, today);
					this.check();
				}
			}
			this.check = function() {
				GM_xmlhttpRequest({
					method:"GET",
					url:versionUrl,
					onreadystatechange:this.finish
				});
			}
			this.finish = function(o) {
				if(o.readyState == 4) {
					current = o.responseText;
					current = current.split(".");
					version = version.split(".");
					if(version[0] < current[0]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else if(version[1] < current[1]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else if(version[2] < current[2]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else {
						// up to date
					}
				}
			}
		//start
		this.init();
		}
GM_update('BetterTube', '5.19.1', 'http://userscripts.org/scripts/show/13269', 'http://bettertube.googlepages.com/version_bettertube.txt');

// ===================================================================================
// greasemonkey menu commands

GM_registerMenuCommand('BetterTube - Autoplay Toggle', function() {
        if(GM_getValue("auto1")=="0" && GM_getValue("autoT")=="false") {
            GM_setValue("auto1", "1");
            GM_setValue("autoT", "true");
        }
        else {
            GM_setValue("auto1", "0");
            GM_setValue("autoT", "false");
        }
    }
);

