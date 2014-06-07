// ==UserScript==
// @name           Youtube without Flash Auto
// @namespace      none
// @description    Adds links below the Youtube video to (a) download the video (HD .mp4 file, no converters are used, no external sites) (b) view the video with an embedded external player (like mplayerplug-in or the totem plugin) 
// @include       http://youtube.*/watch*
// @include       http://*.youtube.*/watch*
// @resource      vlcytplayer http://vlcytplayer.googlecode.com/files/vlcplayer.js
// @resource      vlcobject http://vlcytplayer.googlecode.com/files/VLCobject.js
// @resource      jquery http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// This code is a mess but it works and I wont rewrite it until HTML5 becomes fully implemented probably, so if you need to know wtf something does just ask me (themiddleman)

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
//var formatsAvailable = new Array(     5,       6,       34,        18,        35,        22,      37);
var formatsAvailable = new Array(        18,        22,      37);
//var formatsAvailableNames = new Array("Low 5", "Low 6", "High 34", "High 18", "High 35", "HD 22", "HD 37");
var formatsAvailableNames = new Array("Normal", "720HD", "1080HD");
var thescript = this;

function addScript(contents, id) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.innerHTML = contents;
    head.appendChild(script);
}

//http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.innerHTML = css;
    } catch(x) { style.innerText = css; }
    head.appendChild(style);
}

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
 * function writePlayer
 * arguments: (string) id of the parent element to fill with player
 *            (string) video url
 *            (string) autoplay (true or false)
 * returns: none
 * 
 * function seek
 * arguments: (int) time to seek to in seconds
 * returns: none
 * (If this doesnt work just use an empty function anyway.)
 */
document.cookie="wide=1";
var playersAvailable = [{
    name:"Generic Player",
    description:"A player that should work with most video plugins.",
    writePlayer:function(parentDivId, url, autoplay) {
        var parentDiv = document.getElementById(parentDivId);
        parentDiv.innerHTML = '<embed id="no-flash-player" onmouseover="this.stretchToFit=true" type="application/x-mplayer2" src="' + url
            + '&begin=0" width="640" stretchToFit="true" height="388" autostart="' + autoplay + '"></embed><br />';
    },
    seek:function(seconds) {
        // will never work
    }
},{
    name:"HTML5 Player",
    description:"A HTML5 player, doesnt work with firefox due to youtube not using ogg, may work with safari, chrome, opera.",
    writePlayer:function(parentDivId, url, autoplay) {
        var parentDiv = document.getElementById(parentDivId);
        parentDiv.innerHTML = '<video src="' +
            url + '" width="640" height="388" autoplay="' + autoplay + '"></video>';
    },
    seek:function(seconds) {
        // should get added someday
    }
},{
    name:"VLC Player",
    description:"A VLC player with controls that look like youtubes flash player.",
    writePlayer:function(parentDivId, url, autoplay) {
        if(document.getElementById("vlcplayerscript") == undefined) {
            addScript(GM_getResourceText("jquery"));
        }
        else {
            document.getElementById("vlcplayerscript").innerHTML = "";
            document.getElementById("vlcplayerscript").innerHTML = "vlcobj";
            document.getElementById("vlcplayerscript").innerHTML = "vlcplr";
        }
        addScript(GM_getResourceText("vlcobject"), "vlcobj");
        addScript(GM_getResourceText("vlcytplayer"), "vlcplr");
        addScript("vlcyt = new VlcYtPlayer('" + url + "','" + parentDivId + "'," + autoplay + ");", "vlcplayerscript");
	},
    seek:function(seconds) {
        addScript("vlcyt.seek('" + seconds + "');");
    }
}];

var activePlayer = null;
var prefloc = document.createElement("div");
var views = document.getElementById('watch-ratings-views');
if(! views) {
	views = document.getElementById('watch-info');
}
prefloc.style.width = "250px";
prefloc.style.margin = "auto";
prefloc.id = "ywofpreferences";
views.parentNode.insertBefore(prefloc,views);

/*
 * pMan preferences manager for greasemonkey scripts
 * http://userscripts.org/scripts/show/71904
 */
var pMan=function(a){var d=this;d.parentElm=null;d.PMan=function(){if(a.elmId)d.parentElm=document.getElementById(a.elmId);else{var c=document.createElement("div");c.style.width="300px";c.style.position="fixed";c.style.left="50%";c.style.marginLeft="-150px";c.style.top="150px";document.getElementsByTagName("body")[0].appendChild(c);d.parentElm=c}};d._save=function(){for(var c=0;c<a.prefs.length;c++){var b=document.getElementById("pManOption"+c);GM_setValue(a.prefs[c].name,b.value)}return false};d._hide= function(){d.parentElm.style.display="none";return false};d._savehide=function(){d._save();d._hide();return false};d.show=function(){for(var c="<div style='"+(a.bordercolor?"border:1px solid "+a.bordercolor+";":"")+(a.color?"color:"+a.color+";":"")+(a.bgcolor?"background-color:"+a.bgcolor+";":"")+"padding:3px;'><div style='font-weight:bold;text-align:center;padding:3px;'>"+(a.title||"")+"</div>",b=0;b<a.prefs.length;b++){c+="<div title='"+(a.prefs[b].description||"")+"'>"+a.prefs[b].name+" <select id='pManOption"+ b+"'>";for(var e=0;e<a.prefs[b].opts.length;e++)c+="<option value='"+(a.prefs[b].vals?a.prefs[b].vals[e]:a.prefs[b].opts[e])+"'>"+a.prefs[b].opts[e]+"</option>";c+="</select></div>"}c+="<div style='text-align:right'><a href='#' id='pManButtonCancel'>Cancel</a> <a href='#' id='pManButtonSave'>Save</a></div></div>";d.parentElm.innerHTML=c;document.getElementById("pManButtonCancel").addEventListener("click",d._hide,true);document.getElementById("pManButtonSave").addEventListener("click",d._savehide, true);for(b=0;b<a.prefs.length;b++)document.getElementById("pManOption"+b).value=d.getVal(a.prefs[b].name);d.parentElm.style.display=""};d.getVal=function(c){for(var b=0;b<a.prefs.length;b++)if(a.prefs[b].name==c)return a.prefs[b].vals?GM_getValue(a.prefs[b].name,a.prefs[b].vals[a.prefs[b].defaultVal]):GM_getValue(a.prefs[b].name,a.prefs[b].opts[a.prefs[b].defaultVal]);return"pref default doesnt exist"};d.PMan()};


var prefMan = new pMan({
	title:"Youtube Without Flash Preferences",
	color:"black",
	bgcolor:"white",
	bordercolor:"black",
	prefs:[
		{
			name:"Default Quality",
			description:"If the default quality is not available the next best quality video will be played",
			opts:["5 Low","6 Low","34 High","18 High","35 High","22 HD 720","37 HD 1080","flash"],
			vals:["5","6","34","18","35","22","37","flash"],
			defaultVal:4
		},{
			name:"Player",
			description:"The player to use, Generic should work with most video plugins.",
			opts:["Generic", "HTML5", "VLC"],
			vals:[0,1,2],
			defaultVal:0
		},{
			name:"Autoplay",
			description:"",
			opts:["On","Off"],
			vals:["true","false"],
			defaultVal:0
		},{
			name:"Player Size",
			description:"big has issues with VLC",
			opts:["small","big"],
			defaultVal:0
		},{
			name:"Video Url",
			description:"The url of the video to use, get_video is default",
			opts:["get_video","Raw Url"],
			vals:["get","raw"],
			defaultVal:0
		}
	],
	elmId:"ywofpreferences"
});

// Add css for links.
// This is probably the best way to make text look like links, using the
// normal ways wont work in GM because there is nowhere to put 
// "return false;" in the link.
addGlobalStyle("#videostatus{color:#000;} .link{color:#0033CC;}" + 
        ".link:hover{cursor: pointer; text-decoration:underline;}");

var defaultQuality = prefMan.getVal("Default Quality");
var playerDiv = document.getElementById("watch-player-div");
if(! playerDiv) {
	playerDiv = document.getElementById("watch-player");
}
var playerDivLoad = playerDiv.innerHTML; // For restoring flash.
activePlayer = playersAvailable[prefMan.getVal("Player")];


var args = unsafeWindow.yt.config_.SWF_ARGS;
if(! args) {
	args = {};
	var player = document.getElementById("movie_player");
	var flashvars = player.getAttribute("flashvars");
	var ampSplit = flashvars.split("&");
	
	for(var i = 0; i < ampSplit.length; i++) {
		var eqSplit = ampSplit[i].split("=");
		args[eqSplit[0]] = eqSplit[1];
	}
}
var urlsAvailable = [];
if(prefMan.getVal("Video Url") == "raw") {
	var urlmap = decodeURIComponent(args['fmt_url_map']).split(",");

	for(var i = 0; i < urlmap.length; i++) {
		var test = urlmap[i].split("|",2);
		for(var j = 0; j < formatsAvailable.length; j++) {
			if(test[0] == formatsAvailable[j]) {
				urlsAvailable[j] = test[1];
			}
		}
	}
}
else {
	var vidId = unsafeWindow.yt.config_.VIDEO_ID;
	var t = decodeURIComponent(args['t']);
	var fmtList = decodeURIComponent(args['fmt_map']);
	fmtList = fmtList.split(",");j=0;
	var baseUrl = "http://www.youtube.com/get_video?video_id=" + vidId + "&t=" + t;
	urlsAvailable[j] = baseUrl + "&fmt=" + 18;j++;
	for(var i = 0; i < fmtList.length; i++) {
		yt_fmt = fmtList[i].substring(0,2);
		if(yt_fmt==22){urlsAvailable[j] = baseUrl + "&fmt=" + 22;j++;}
		if(yt_fmt==37){urlsAvailable[j] = baseUrl + "&fmt=" + 37;j++;}
	}

	/*urlsAvailable[0] = baseUrl + "&fmt=" + 18;
	urlsAvailable[1] = baseUrl + "&fmt=" + 22;
	urlsAvailable[2] = baseUrl + "&fmt=" + 37;
	for(var i = 0; i < formatsAvailable.length; i++) {
		for(var j = 0; j < fmtList.length; j++) {
			if(fmtList[j] == formatsAvailable[i]) {
				urlsAvailable[i] = baseUrl + "&fmt=" + fmtList[j];
				break;
			}
		}
	}*/
}

if(defaultQuality != "flash") {
    // If they don't want flash clear it asap so it doesn't start autoplaying.
    playerDiv.innerHTML = "";
}

// Rewrite time links function it is our function instead
//unsafeWindow.yt.www.watch.player.seekTo = activePlayer.seek;

// Make player bigger or smaller depending on their preference
var playerSize = prefMan.getVal("Player Size");
var baseDiv = document.getElementById('baseDiv');

if(playerSize === "big") {
	baseDiv.setAttribute("class", baseDiv.getAttribute('class') + " watch-wide-mode");
}

function writePlayer(quality) {
    // If we use the regular video URL in the media player, the video sometimes
    // won't start. Adding '&begin=0' to the video URL seems to fix the problem.
    //alert(urlsAvailable[formatsAvailable.indexOf(quality)]);
    activePlayer.writePlayer(playerDiv.id, urlsAvailable[formatsAvailable.indexOf(quality)], prefMan.getVal("Autoplay"));
    
    
    /*var player = document.getElementById('no-flash-player');
	if(player) {
		if (baseDiv.getAttribute('class').match('watch-wide-mode')) {
			player.style.width = '960px';
			player.style.height = '582px';
		}
		else {
			player.style.width = '640px';
			player.style.height = '388px';
		}
	}*/
}

function restoreFlash() {
    playerDiv.innerHTML = playerDivLoad;
}

var haveFlash;
var noplayerDiv = document.getElementById("watch-noplayer-div");
if(noplayerDiv == null) {
    haveFlash = true;
} 
else {
    haveFlash = false;
}


var linkbar = document.createElement("div");
var linkViewFlash = "";
var linkViewPreferences = "";
var downloadLinks = "";
var playLinks = "";

for(var i = 0; i < formatsAvailable.length; i++) {
    if(typeof(urlsAvailable[i]) != "undefined") {
        downloadLinks += '| <a target="_blank" href="' + urlsAvailable[i] + '&begin=0">' + 
                formatsAvailableNames[i] + '</a> ';
        
        playLinks += '| <a class="link" id="play' + formatsAvailableNames[i] + '">' + 
                formatsAvailableNames[i] + '</a> ';
    }
}

if(haveFlash) {
    linkViewFlash = ' &diams; <a class="link" id="restoreFlash">View Flash</a>';
}

linkViewPreferences = '<a class="link" id="preferencesLink">Preferences</a>';

linkbar.innerHTML = '<div id="dlbar" style="padding-top: 8px;">'
    + '&diams; Options'
    + playLinks
    + '&diams; Download'
    + downloadLinks
	+ linkViewFlash
    + '<div style="float:right;">' + linkViewPreferences + '</div>'
    + '</div>';


views.parentNode.insertBefore(linkbar,views);


for(var i = 0; i < formatsAvailable.length; i++) {
    if(typeof(urlsAvailable[i]) != "undefined") {
        var playLink = document.getElementById('play' + formatsAvailableNames[i]);
        var writePlayerFunction = function(qual) {
            return function (event) {
                writePlayer(qual);
            };
        };
        playLink.addEventListener("click", writePlayerFunction(formatsAvailable[i]), true);
    }
}

if(haveFlash) {
    var restoreFlashLink = document.getElementById('restoreFlash');
    restoreFlashLink.addEventListener("click", restoreFlash, true);
}

var preferencesLink = document.getElementById('preferencesLink');
preferencesLink.addEventListener("click", prefMan.show, true);


// Finally, write the player, if the desired format is not available we 
// keep going down in quality until we find one.
if(defaultQuality != "flash") {
    var defaultQualityId = formatsAvailable.indexOf(parseInt(defaultQuality));
    while(typeof(urlsAvailable[defaultQualityId]) == "undefined") {
        defaultQualityId--;
        if(defaultQualityId < 0) {
            break;// Just in case something goes wrong.
        }
        //alert(defaultQualityId);
    }
    writePlayer(parseInt(formatsAvailable[defaultQualityId]));
}

//alert("Your default quality is set to " + defaultQuality + " and I am playing " + formatsAvailable[defaultQualityId]);

}


if(/Chrome/.test(navigator.userAgent)) {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = "(" + runScript + ")();";
    document.body.appendChild(script);
} else {
    runScript();
}
        
