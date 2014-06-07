// ==UserScript==
// @name           TwitterMedia
// @namespace      http://vivekpuri.com
// @description    TwitterMedia converts media links to actual media and some goodies
// @description    Currently the script enables you to play/view Youtube, TwitPic, and Twitxr on Twitter.com
// @description    UrlServices supported: Tinyurl.com and Bit.ly
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// @include        https://*.twitter.com/*
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

// ADDED(4.21.09): Converts Tiny/Short links and @links in Facebook Friends RSS Feed to actual links in Google Reader
// ADDED(4.18.09): Updated Uprgade Url since Firefox+Cloudfront combo lead to cached upgrade content
// ADDED(4.18.09): Supports photos from twitngo.com
// ADDED(4.10.09): Supports for shortening of urls before you post
// FIXED(4.10.09): Upgrade process
// ADDED(4.10.09): Supports photos from twitxr.com
// FIXED(4.09.09): Works on search.twitter.com

var $;
var twitngo = "twitngo.com";
var twitnGoSize = "s";
var twitpic = "twitpic.com";
var twitpicSize = "mini";
var twitxr = "twitxr.com";
var youtube = "www.youtube.com";
var tiny = "tinyurl.com";
var bitly = "bit.ly";
var jijr = "jijr.com";
var isgd = "is.gd";
var snip = "snipurl.com";
var owly = "ow.ly";
var snurl = "snurl.com";
var adjix = "adjix.com";
var poprl = "poprl.com";
var fbfriends = "www.facebook.com/friends.php";
var greader = "www.google.com/reader/view/";
var resolver = "http://api.sunoh.fm/twitter/tiny.php?url=";
var scriptLink = 'http://userscripts.org/scripts/show/46233';
var d = new Date();
var releaseUrl = 'http://twittermedia.s3.amazonaws.com/release.txt?t='+d;
var currentRelease = 102;
var currentDomain, currentPath;

var GM_JQ = document.createElement("script");
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
GM_JQ.type = "text/javascript";
document.body.appendChild(GM_JQ);

var GM_JQurl = document.createElement("script");
GM_JQurl.src = "http://d3lx24w9k82ky2.cloudfront.net/httpprojects.allmarkedup.comjquery_url_parser jquery.url.packed.js";
GM_JQurl.type = "text/javascript";
document.body.appendChild(GM_JQurl);

addStyle() ;
scriptUpgrade();

var checker=setInterval(function(){
	if(typeof (unsafeWindow.jQuery) != "undefined" & typeof (unsafeWindow.jQuery.url) != "undefined") {
		$ = unsafeWindow.jQuery;
		$ = $.noConflict();
		clearInterval(checker);
		twitterMedia();		
	}
},100);


function twitterMedia() 
{
	//console.log($("a").length);
	var cUrl = window.location.href;
	currentDomain = $.url.setUrl(cUrl).attr("host");	
	currentPath = $.url.setUrl(cUrl).attr("path");
	$("a[rel*=nofollow]").each(function(){
		var href = $(this).attr("href");
		var host = $.url.setUrl(href).attr("host");
		if(host == twitngo) {
			showTwitnGo(href, $(this));			
		} else if(host == tiny) {
			processTiny(href, $(this));			
		} else if(host == bitly) {		
			processBitly(href, $(this));
		} else if(host == twitxr) {
			showTwitxr(href, $(this));
		} else if(host == twitpic) {			
			showTwitPic(href, $(this));
		}
	});
	addShortService();		
	if(currentDomain+currentPath == greader ) {
		gReaderLinks();
	}	
}

function gReaderLinks()
{
	$('.entry-title').live("click", function() { 
		var parent = $(this);
		var chromelink = $('#chrome-title').children("a").attr("href");
		var path = $.url.setUrl(chromelink).attr("path");
		var host = $.url.setUrl(chromelink).attr("host");
		var chromeLinkRe = host+path;		
		var mediaLinksLen = $('.gm_medialinks').length;
		if(mediaLinksLen > 0) {
			$('.gm_medialinks').remove();			
		} 
		if(chromeLinkRe != fbfriends ) {
			return;
		}
		var data = parent.html();
		var services = new Array(twitngo,bitly,tiny,isgd,snip,owly,snurl,adjix,poprl);
		$.each(services, function() {
			var service = this;
			var pos = data.indexOf("http://"+service);
			if(pos > -1) {
				var dataP = data.substr(0, pos)
				var linkP = data.substr(pos, data.length);
				var pos2 = linkP.indexOf(" ");
				if(pos2 > -1) {
					var link = linkP.substr(0, pos2);
				} else {
					var link = linkP;
				}
				var sufxs = new Array('.', ')', ':', ',',';','-','!');	
				$.each(sufxs, function() {
					var sufx = this;
					var path = $.url.setUrl(link).attr("path");					
					var posDot = path.indexOf(sufx);
					if(posDot > -1) {
						var path = path.substr(0, posDot);
						var host = $.url.setUrl(link).attr("host");
						link = 'http://'+host+path;
					}						
				});	
				gReaderAddDiv(parent);
				var content = "Tiny Link: <a target='_blank' href='"+link+"'>"+link+"</a>&nbsp;&nbsp;&nbsp;";
				$('.gm_medialinks').append(content);					
			}
		});
		var rateParts = data.split('@');
		var i = 0;
		$.each(rateParts, function() {
			var part = this;
			if(this.length > 0 & i > 0) {
				var part1;
				var sufxs = new Array(' ');
				$.each(sufxs, function() {
					var sufx = this;
					var pos = part.indexOf(sufx);
					if(pos > -1) {
						part1 = part.substr(0, pos);							
					} else {
						part1 = part;							
					}						
				});
				var sufxs = new Array('.', ')', ':', ',',';','-','!');					
				$.each(sufxs, function() {
					var sufx = this;
					var pos = part1.indexOf(sufx);
					if(pos > 0) {
						part1 = part1.substr(0, pos);
					} 						
				});
				var link = 'http://twitter.com/'+part1;
				var gm_medialinksLen = $('.gm_medialinks').length;
				if(gm_medialinksLen == 0){
					gReaderAddDiv(parent);
					$('.gm_medialinks').append("<span class='gm_medialinksrate'>@Links:</span>");
				} else {
					var gm_medialinksRateLen = $('.gm_medialinksrate').length;
					if(gm_medialinksRateLen == 0){
						$('.gm_medialinks').append("<span class='gm_medialinksrate'>@Links:</span>");
					}
				}
				var content = "&nbsp;&nbsp;<a target='_blank' href='"+link+"'>"+part1+"</a>";
				$('.gm_medialinksrate').append(content);					
			}
			i++;
		});		
	});
}

function gReaderAddDiv(obj)
{
	var final = "<div class='gm_medialinks'></div>";
	obj.parent().parent().parent().parent().children('.entry-actions').before(final);
}

function processTiny(href, obj)
{
	var $obj = obj;
	var parentObj = $obj.parent().parent().parent();
	window.setTimeout(function() {
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: resolver+href,
		    onload: function(response) {
			var href = response.responseText;
			var host = $.url.setUrl(href).attr("host");
			if(host == youtube) {
				showYoutube(href, $obj)
			}			
		    },
		    onerror: function(response) {
		    	log(response.responseText);
		    }
		});
	}, 0);

}

function processBitly(href, obj) {
	var $obj = obj;
	var parentObj = $obj.parent().parent().parent();
	window.setTimeout(function() {
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: href,
		    onload: function(response) {
			var href = response.finalUrl;
			var host = $.url.setUrl(href).attr("host");
			if(host == youtube) {
				showYoutube(href, $obj)
			}			
		    },
		    onerror: function(response) {
			log(response.responseText);
		    }
		});
	}, 0);

}

function showTwitnGo(href, obj){
	var imgid = $.url.setUrl(href).segment(1);
	if(imgid) {
		var img = 'http://d.twitngo.com/photos/'+imgid+'_'+twitnGoSize;
		var imglnk = 'http://twitngo.com/posts/'+imgid;
		var content = "<div class='twitcontentpadsearch'><a href='"+imglnk+"' target='_blank'><img src='"+img+"' class='imageBorder' ></a></div>";
		addMedia(content, obj);
	}
}

function showTwitPic(href, obj){
	var imgid = href.substr(19, href.length);
	if(imgid) {
		var img = 'http://twitpic.com/show/'+twitpicSize+'/'+imgid;
		var imglnk = 'http://twitpic.com/'+imgid;
		var content = "<div class='twitcontentpadsearch'><a href='"+imglnk+"' target='_blank'><img src='"+img+"' class='imageBorder' ></a></div>";
		addMedia(content, obj);
	}
}

function showYoutube(href, obj) {
	results = href.match("[\\?&]v=([^&#]*)");
	var video_id = results[1];
	if(video_id) {
		var content = "<div class='videowidgetDiv twitcontentpadsearch'><img class='videowidget' src='http://img.youtube.com/vi/"+video_id+"/2.jpg' id='"+video_id+"' name='"+video_id+"' /><div class='videowidgetPlay'><img src='http://d382womoc7z666.cloudfront.net/static/control_play_blue.png' name='"+video_id+"' id='videowidgetPP_"+video_id+"' alt='Play' title='Play' class='videowidgetpp' /></div></div><div id='videowidgetVideo_"+video_id+"' style='display:none;' class='twitcontentpad'></div>";		
		addMedia(content, obj);
		videoWidget(video_id);
	}
}

function showTwitxr(href, obj){
	var hpath = $.url.setUrl(href).attr("path");
 	var pathP = hpath.split('/');
 	if(pathP.length == 4) {
 		var imgid = pathP[3];
 		var user = pathP[1];
 		var img = 'http://www.twitxr.com/image/'+imgid+'/th/';
		var imglnk = href;
		var content = "<div class='twitcontentpadsearch'><a href='"+imglnk+"' target='_blank'><img src='"+img+"' class='imageBorder' ></a></div>";
		addMedia(content, obj); 		
 	}
}

function videoWidget(id)
{
	var currcount = $(".videowidget").length;
	var new_id = id+"_"+currcount;
	$("#"+id).attr("id", new_id);
	$("#videowidgetVideo_"+id).attr("id", "videowidgetVideo_"+new_id);
	$("#videowidgetPP_"+id).attr("id", "videowidgetPP_"+new_id);
	var pa = $("#"+new_id).parent();	
	pa.find("img").each(function() {
		$(this).click(function(){
			$("#videowidgetVideo_"+new_id).toggle();		
			videoWidgetPP(new_id, id);			
		});	
	});	
}

function videoWidgetPP(id, video_id)
{
	var alt, video;
	$obj = $("#videowidgetPP_"+id);
	$obj2 =  $("#videowidgetVideo_"+id);
	alt = $obj.attr("alt");
	if(alt == "Play") {
		$obj.attr({"src":"http://d382womoc7z666.cloudfront.net/static/control_stop_blue.png", "alt":"Stop", "title":"Stop"});
		$obj2.html('<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/'+video_id+'&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/'+video_id+'&hl=en&fs=1&autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object>');		
	} else {
		$obj.attr({"src":"http://d382womoc7z666.cloudfront.net/static/control_play_blue.png", "alt":"Play", "title":"Play"});
		$obj2.html('');		
	}
}

function addMedia(content, obj) {
	if(currentDomain == "twitter.com") {
		var stype = obj.parent().attr("class");
		if(stype == "entry-content") {
			var parentObj = obj.parent().parent().parent();			
			parentObj.append(content);
		}
	} else if(currentDomain == "search.twitter.com") {			
		var parentObj = obj.parent().parent().parent();		
		parentObj.append(content);
	}
}

function addShortService(){
	if(currentDomain == "twitter.com") {
		var path = $.url.setUrl(window.location.href).attr("path");
	 	if(path == '/timeline/home' || path == '/home') {
	 		var parentObj = $("#status").parent();
	 		$("#update-submit").css("display", "inline");
	 		var content = '<div class="twitcontentpadsearch" style="text-align:right;padding-right:15px;"><span style="font-weight:bold;">Add Short Link:</span>&nbsp;<input type="text" style="display: inline;" id="tmshortservicetxt" />&nbsp;<input type="button" style="display:inline;color:gray;" value="Add"  id="tmshortservicebtn" disabled /></div>';
			parentObj.children(".status-btn").each(function(){				
				$(this).before(content);
			});
			$("#tmshortservicebtn").bind("click", function(){
				makeShortUrl();				
			});
			$("#tmshortservicetxt").bind("keypress", function(){
				var currVal = $("#tmshortservicetxt").val();
				if(currVal.length > 0) {
					$("#tmshortservicebtn").removeAttr("disabled");
					$("#tmshortservicebtn").css("color", "black");
				} else {
					$("#tmshortservicebtn").attr("disabled", "disabled");
					$("#tmshortservicebtn").css("color", "gray");
				}
			});
		}
	}
}

function makeShortUrl(){
	var link = $("#tmshortservicetxt").val();
	if(link.length > 0) {
		window.setTimeout(function() {
			GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://tinyurl.com/api-create.php?url='+link,		
					onload:function(response){
						var newLink = response.responseText;
						if(newLink.length > 0) {
							addShortServiceLink(newLink);
						}
					},
					onerror:function(response){
						console.log(response.responseText);		
					}
			});
		}, 0);
	}
}

function addShortServiceLink(link){
	var currVal = $("#status").val();
	if(currVal.length > 0) {
		currVal = currVal+" "+link;
	} else {
		currVal = link;
	}
	$("#status").val(currVal);
}

function scriptUpgrade() {	
	GM_xmlhttpRequest({
		method: 'GET',
		url: releaseUrl,		
		onload:function(response){
			var newRelease = response.responseText;
			console.log('New Release: '+newRelease);
			if(newRelease != currentRelease)
			{
				if(currentDomain == "twitter.com") {
					var headmsg = '<div style="left:0;background: #FFFFE1;border-bottom:#ACA899 solid 1px; height:20px; width:100%;position:absolute; padding-top:10px;margin-top:-12px;" align="left"><span><span style="float:right; margin-top:-5px;padding-right:10px;"><input type="button" value="Install" id="scriptInstallButton" style="padding:0px 10px 0px 10px;font-size:12px;"/></span><span style="color:#000; padding-left:10px;">&nbsp;<a target="_blank" href="'+scriptLink+'">New version of TwitterMedia is available. Click Here to Install.</a></span></span></div>'; 
				} else if(currentDomain == "search.twitter.com") {
					var headmsg = '<div style="left:0;background: #FFFFE1;border-bottom:#ACA899 solid 1px; height:20px; width:100%;position:absolute; padding-top:10px;margin-top:0px;" align="left"><span><span style="float:right; margin-top:-5px;padding-right:10px;"><input type="button" value="Install" id="scriptInstallButton" style="padding:0px 10px 0px 10px;font-size:12px;"/></span><span style="color:#000; padding-left:10px;">&nbsp;<a target="_blank" href="'+scriptLink+'">New version of TwitterMedia is available. Click Here to Install.</a></span></span></div>'; 
				}
				$(document.body).prepend(headmsg);				
				$("#scriptInstallButton").click(function(){
					window.location = scriptLink;
				});				
			}			
		}
	});		
}

function addStyle() {
	GM_addStyle("a{text-decoration:none;}.videowidgetDiv {position:relative; align:center;}.videowidget{padding:2px; border: 1px solid #CFCFCF;cursor:pointer;}.videowidgetPlay{position:absolute;z-index:50;cursor:pointer;left: 63px; top: 42px;} .twitcontentpad{padding-left:5px;padding-top:2px;} .twitcontentpadsearch{padding-top:5px;} .imageBorder{padding:2px; border: 1px solid #CFCFCF;cursor:pointer;} .gm_medialinks{padding-left:20px;padding-bottom:5px;font-size:12px;background-color:#F3F5FC;border-bottom:1px solid #DCDCD8;padding-top:3px;padding-bottom:3px;}");
}

function log(msg){
	if(debug) {
		GM_log(msg);
	}
}