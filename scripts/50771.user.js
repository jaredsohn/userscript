// Youtube without Flash Auto
// version 0.8.2
// 2010-09-18
// Copyright (c) 2010, Arne Schneck, Rob Middleton(aka themiddleman), chromeuser8
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// ==UserScript==
// @name           Youtube without Flash Auto
// @namespace      none
// @description    Adds links below the Youtube video to (a) download the video (HD .mp4 file, no converters are used, no external sites) (b) view the video with an embedded external player (like mplayerplug-in or the totem plugin) 
// @include       http://youtube.*/watch*
// @include       http://*.youtube.*/watch*
// ==/UserScript==


function runScript() {

// Opera doesn't have unsafeWindow, GM_getValue and GM_setValue. We test
// whether we're in Opera and provide workarounds for that case.
if(/Opera|Safari|Epiphany|Chrome|Midori/.test(navigator.userAgent)) {
    unsafeWindow = window;
    GM_getValue = function ( cookieName, oDefault ) {
        var cookieJar = document.cookie.split( "; " );
        for( var x = 0; x < cookieJar.length; x++ ) {
            var oneCookie = cookieJar[x].split( "=" );
            if( oneCookie[0] == escape( cookieName ) ) {
                try {
                    var footm = unescape( oneCookie[1] );
                } catch(e) { return oDefault; }
                return footm;
            }
        }
        return oDefault;
    };
    GM_setValue = function ( cookieName, cookieValue, lifeTime ) {
        if( !cookieName ) { return; }
        if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
        document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
    }
}


// Video formats it will search for these "fmts", and the string array is what is displayed to the user on the link bar.
var formatsAvailable = [5, 34, 35, 18, 22, 37, 38, 43, 45];
var formatsAvailableNames = [
	"FLV - Low - H.263, MP3",
	"FLV - Medium - H.264, AAC",
	"FLV - High - H.264, AAC",
	"MP4 - High - H.264, AAC",
	"MP4 - HD 720 - H.264, AAC",
	"MP4 - HD 1080 - H.264, AAC",
	"MP4 - HD 3072 - H.264, AAC",
	"WebM - High - VP8, Vorbis",
	"WebM - HD 720 - VP8, Vorbis"
];

function addScript(contents, id, isurl) {
  var head, script;
  head = document.getElementsByTagName('head')[0];
  script = document.getElementById(id);
  if(script != undefined) {
    head.removeChild(script);
  }
  script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = id;
  if(isurl) {
    script.src = contents
  } else {
    script.innerHTML = contents;
  }
  head.appendChild(script);
}

//http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle (css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

/*
 * pMan preferences manager for greasemonkey scripts
 * http://userscripts.org/scripts/show/71904
 */
var pMan=function(a){var d=this;d.parentElm=null;d.PMan=function(){if(a.elmId)d.parentElm=document.getElementById(a.elmId);else{var c=document.createElement("div");c.style.width="300px";c.style.position="fixed";c.style.left="50%";c.style.marginLeft="-150px";c.style.top="150px";document.getElementsByTagName("body")[0].appendChild(c);d.parentElm=c}};d._save=function(){for(var c=0;c<a.prefs.length;c++){var b=document.getElementById("pManOption"+c);GM_setValue(a.prefs[c].name,b.value)}return false};d._hide= function(){d.parentElm.style.display="none";return false};d._savehide=function(){d._save();d._hide();return false};d.show=function(){for(var c="<div style='"+(a.bordercolor?"border:1px solid "+a.bordercolor+";":"")+(a.color?"color:"+a.color+";":"")+(a.bgcolor?"background-color:"+a.bgcolor+";":"")+"padding:3px;'><div style='font-weight:bold;text-align:center;padding:3px;'>"+(a.title||"")+"</div>",b=0;b<a.prefs.length;b++){c+="<div title='"+(a.prefs[b].description||"")+"'>"+a.prefs[b].name+" <select id='pManOption"+ b+"'>";for(var e=0;e<a.prefs[b].opts.length;e++)c+="<option value='"+(a.prefs[b].vals?a.prefs[b].vals[e]:a.prefs[b].opts[e])+"'>"+a.prefs[b].opts[e]+"</option>";c+="</select></div>"}c+="<div style='text-align:right'><a href='#' id='pManButtonCancel'>Cancel</a> <a href='#' id='pManButtonSave'>Save</a></div></div>";d.parentElm.innerHTML=c;document.getElementById("pManButtonCancel").addEventListener("click",d._hide,true);document.getElementById("pManButtonSave").addEventListener("click",d._savehide, true);for(b=0;b<a.prefs.length;b++)document.getElementById("pManOption"+b).value=d.getVal(a.prefs[b].name);d.parentElm.style.display=""};d.getVal=function(c){for(var b=0;b<a.prefs.length;b++)if(a.prefs[b].name==c)return a.prefs[b].vals?GM_getValue(a.prefs[b].name,a.prefs[b].vals[a.prefs[b].defaultVal]):GM_getValue(a.prefs[b].name,a.prefs[b].opts[a.prefs[b].defaultVal]);return"pref default doesnt exist"};d.PMan()};


var prefloc = document.createElement("div"),
	views = document.getElementById('watch-info');

prefloc.style.width = "350px";
prefloc.style.margin = "auto";
prefloc.id = "ywofpreferences";
views.parentNode.insertBefore(prefloc,views);

var prefMan = new pMan({
  title:"Youtube Without Flash Preferences",
  color:"black",
  bgcolor:"white",
  bordercolor:"black",
  prefs:[
    {
      name:"Default Quality",
      description:"If the default quality is not available the next best quality video will be played",
      opts:formatsAvailableNames,
      vals:formatsAvailable,
      defaultVal:4
    },{
      name:"Player",
      description:"The player to use, Generic should work with most video plugins.",
      opts:["Generic", "HTML5", "VLC", "Flash"],
      vals:[0,1,2,3],
      defaultVal:0
    },{
      name:"Autoplay",
      description:"",
      opts:["On","Off"],
      vals:["true","false"],
      defaultVal:0
    },{
      name:"Player Size",
      description:"The size of the player",
      opts:["small","big"],
      defaultVal:0
    },{
      name:"Video Url",
      description:"The url of the video to use, get_video is default",
      opts:["get_video","Raw Url"],
      vals:["get","raw"],
      defaultVal:0
    },{
      name:"Generic player MIME",
      description:"You may need to switch to x-mplayer2 to make some players work",
      opts:["video/flv","application/x-mplayer2"],
      defaultVal:0
    }
  ],
  elmId:"ywofpreferences"
});

/*
 * Players
 * The default is the generic player that should work with whatever 
 *  plugin is installed.
 * All should have the following:
 *
 * string name
 * 
 * string desctiption
 * 
 * function init
 * arguments: (none)
 * returns "this" player object
 * 
 * function writePlayer
 * arguments: (string) id of the parent element to fill with player
 *            (string) video url
 *            (string) autoplay (true or false)
 *            (string) width (number and 'px')
 *            (string) height (number and 'px')
 * returns: none
 * 
 * function seek
 * arguments: (int) time to seek to in seconds
 * returns: none
 * (If this doesnt work just use an empty function anyway.)
 */

var playersAvailable = [{
  name:"Generic Player",
  description:"A player that should work with most video plugins.",
  init:function() {
    return this;
  },
  writePlayer:function(parentDivId, url, autoplay, width, height) {
    var parentDiv = document.getElementById(parentDivId);
    var mime = prefMan.getVal("Generic player MIME");
    parentDiv.innerHTML = '<embed id="no-flash-player" type="' + mime + '" src="' + url
      + '&begin=0" scale="tofit" width="' + parseInt(width) + '" height="' + parseInt(height) + '" autoplay="' + autoplay + '"></embed><br />';
  },
  seek:function(seconds) {
    // will never work
  }
},{
  name:"HTML5 Player",
  description:"A HTML5 player, doesnt work with firefox due to youtube not using ogg, may work with safari, chrome, opera.",
  init:function() {
    return this;
  },
  writePlayer:function(parentDivId, url, autoplay, width, height) {
    var parentDiv = document.getElementById(parentDivId);
    parentDiv.innerHTML = '<video src="' +
      url + '" width="' + parseInt(width) + '" height="' + parseInt(height) + '" autoplay="' + autoplay + '"></video>';
  },
  seek:function(seconds) {
    // should get added someday
  }
},{
  name:"VLC Player",
  description:"A VLC player with controls that look like youtubes flash player.",
  init:function() {
    addScript("http://code.jquery.com/jquery-latest.js", "vlcjq", true);
    addScript("http://vlcytplayer.googlecode.com/files/VLCobject.js", "vlcobj", true);
    addScript("http://vlcytplayer.googlecode.com/files/vlcplayer_1.1.js", "vlcplr", true);
    addScript("vlcyt = null;","",false);
    return this;
  },
  writePlayer:function(parentDivId, url, autoplay, width, height) {
    addScript("if(vlcyt != null) {vlcyt.selfDestruct();}"
        + "vlcyt = new VlcYtPlayer('" + url + "','" + parentDivId + "'," + autoplay
        + ", '" + width + "', '"+height + "');", "vlcplayerscript", false);
  },
  seek:function(seconds) {
    addScript("vlcyt.seek('" + seconds + "');");
  }
},{
	name:"Flash Player",
  description:"A crime against humanity.",
  init:function() {
    return this;
  },
  writePlayer:restoreFlash,
  seek:function(seconds) {
    
  }
}];

// Add css for links.
// This is probably the best way to make text look like links, using the
// normal ways wont work in GM because there is nowhere to put 
// "return false;" in the link.
addGlobalStyle(".link{color:#0033CC;}" + 
    ".link:hover{cursor: pointer; text-decoration:underline;}");

var defaultQuality = prefMan.getVal("Default Quality"),
  playerDiv = document.getElementById("watch-player"),
	playerDivFlash = playerDiv.innerHTML, // For restoring flash.
	activePlayer = playersAvailable[prefMan.getVal("Player")].init(),
	player = document.getElementById("movie_player"),
	args = (function () {
		var flashvars = player.getAttribute("flashvars"),
			ampSplit = flashvars.split("&"),
			args = {};
		for(var i = 0; i < ampSplit.length; i++) {
			var eqSplit = ampSplit[i].split("=");
			args[eqSplit[0]] = unescape(eqSplit[1]);
		}
		return args;
	})();

// from changing flash player from a quality option to a player option,
//  this upgrades old users - 9/18/10
if(defaultQuality === "flash") {
	defaultQuality = "35";
}

var urlsAvailable = [];
if(prefMan.getVal("Video Url") === "raw") {
  var urlmap = args['fmt_url_map'].split(",");

  for(var i = 0; i < urlmap.length; i++) {
    var test = urlmap[i].split("|",2);
    
    for(var j = 0; j < formatsAvailable.length; j++) {
      if(test[0] == formatsAvailable[j]) {
        urlsAvailable[j] = decodeURIComponent(test[1]);
      }
    }
  }
}
else {
  var vidId = unsafeWindow.yt.config_.VIDEO_ID;
  var t = decodeURIComponent(args['t']);
  var fmtList = decodeURIComponent(args['fmt_list']);
  fmtList = fmtList.split(",");
  for(var i = 0; i < fmtList.length; i++) {
    fmtList[i] = fmtList[i].split("/")[0];
  }

  var baseUrl = "http://www.youtube.com/get_video?video_id=" + vidId + "&t=" + t + "&asv=";
  for(var i = 0; i < formatsAvailable.length; i++) {
    for(var j = 0; j < fmtList.length; j++) {
      if(fmtList[j] == formatsAvailable[i]) {
        urlsAvailable[i] = baseUrl + "&fmt=" + fmtList[j];
        break;
      }
    }
  }
}

// Rewrite time links function it is our function instead
if(activePlayer && activePlayer.seek) {
	unsafeWindow.yt.www.watch.player.seekTo = activePlayer.seek;
}

var baseDiv = document.getElementById('baseDiv');

function writePlayer(quality) {
  // If we use the regular video URL in the media player, the video sometimes
  // won't start. Adding '&begin=0' to the video URL seems to fix the problem.
  var playerSize = prefMan.getVal("Player Size"),
		watchVideo = document.getElementById("watch-video"),
		contentDiv = document.getElementById("content");
  
  if(playerSize === "big") {
      baseDiv.className += " watch-wide-mode";
      watchVideo.className += " wide";
      contentDiv.className += " watch-wide";
  }
  else {
      baseDiv.className = "";
      watchVideo.className = "";
      contentDiv.className = "";
  }
  var width = (playerSize === "big") ? "960px" : "640px",
		height = (playerSize === "big") ? "505px" : "388px";
  
  activePlayer.writePlayer(playerDiv.id,
      urlsAvailable[formatsAvailable.indexOf(quality)],
      prefMan.getVal("Autoplay"),
      width,
      height);
}

function restoreFlash() {
  playerDiv.innerHTML = playerDivFlash;
}

var haveFlash = (function () {
	for (var i = 0; i < navigator.plugins.length; i++) {
		if (navigator.plugins[i].length) {
			for (var j = 0; j < navigator.plugins[i].length; j++) {
				if (navigator.plugins[i][j].type === "application/x-shockwave-flash") {
					return true;
				}
			}
		}
	}
	return false;
})();


var downloads = document.createElement("select"),
	downloadSaveAs = document.createElement("a"),
	viewQualities = document.createElement("select"),
	downloadOpt = document.createElement("option"),
	viewQualityOpt = document.createElement("option"),
	restoreFlashBtn = document.createElement("input"),
	ywofPrefs = document.createElement("input");

downloadOpt.value = "";
viewQualityOpt.value = "";
downloadOpt.innerHTML = "Download";
viewQualityOpt.innerHTML = "View without flash";
downloads.appendChild(downloadOpt);
viewQualities.appendChild(viewQualityOpt);

downloadSaveAs.innerHTML = "R Click, Save As";
downloadSaveAs.style.display = "none";

restoreFlashBtn.type = "button";
restoreFlashBtn.value = "Restore Flash";
ywofPrefs.type = "button";
ywofPrefs.value = "YWOF Prefs";

for (var i = 0; i < formatsAvailable.length; i++) {
	if (urlsAvailable[i]) {
		var download = document.createElement("option"),
			viewQuality = document.createElement("option");
		
		download.value = urlsAvailable[i];
		download.innerHTML = formatsAvailableNames[i];
		viewQuality.value = formatsAvailable[i];
		viewQuality.innerHTML = formatsAvailableNames[i];
		
		
		downloads.appendChild(download);
		viewQualities.appendChild(viewQuality);
	}
}

viewQualities.addEventListener("change", function (e) {
	writePlayer(parseInt(viewQualities.value));
	viewQualities.value = "";
}, false);
downloads.addEventListener("change", function (e) {
	downloadSaveAs.href = downloads.value;
	downloadSaveAs.style.display = "";
	downloads.value = "";
}, false);
downloadSaveAs.addEventListener("mousedown", function (e) {
	setTimeout(function () {
		downloadSaveAs.style.display = "none";
	}, 100);
}, false);

var views = document.getElementById('watch-info');
views.parentNode.insertBefore(downloads, views);
views.parentNode.insertBefore(downloadSaveAs, views);
views.parentNode.insertBefore(viewQualities, views);
if(haveFlash) {
	restoreFlashBtn.addEventListener("click", restoreFlash, false);
	views.parentNode.insertBefore(restoreFlashBtn, views);
}

ywofPrefs.addEventListener("click", prefMan.show, false);
views.parentNode.insertBefore(ywofPrefs, views);


// Finally, write the player, if the desired format is not available we 
// keep going down in quality until we find one.
var defaultQualityId = formatsAvailable.indexOf(parseInt(defaultQuality));
while (!urlsAvailable[defaultQualityId]) {
	defaultQualityId--;
	if(defaultQualityId < 0) {
		break;// Just in case something goes wrong.
	}
}

if (haveFlash) {
	writePlayer(parseInt(formatsAvailable[defaultQualityId]));
}
else {
	var nonflashWrite = function () {
		var flashPromo = document.getElementById("flash10-promo-div");
		if (flashPromo) {
			flashPromo.style.display = "none";
			writePlayer(parseInt(formatsAvailable[defaultQualityId]));
		}
		else {
			setTimeout(nonflashWrite, 500);
		}
	}
	setTimeout(nonflashWrite, 1000);
}


}

if(/Chrome/.test(navigator.userAgent)) {
  var script = document.createElement("script");
  script.type = "application/javascript";
  script.textContent = "(" + runScript + ")();";
  document.body.appendChild(script);
}
else {
  runScript();
}
