// ==UserScript==
// @name       TTS by keywords
// @description   Triggers playing of google TTS by specific words. mp3player.swf needs to be allowed in access settings.
// @namespace     http://userscripts.org/scripts/show/100733
// @version     1.00
// @include     http://*
// @include     https://*
// @include     file://*
// @exclude	http://acid3.acidtests.org/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {

/* Grab mp3player.swf here: http://files.myopera.com/DitherSky/blog/mp3player.swf 
Or compile it by yourself from this:

// begin mp3player.fla
var address:URLRequest = new URLRequest(root.loaderInfo.parameters.audio);
var sound:Sound = new Sound();
sound.addEventListener(Event.COMPLETE, onComplete);
sound.load(address);
var timer:Timer = new Timer((root.loaderInfo.parameters.sdelay ? root.loaderInfo.parameters.sdelay : 0), 1);
function onComplete(event:Event):void {
	timer.addEventListener(TimerEvent.TIMER, playSound);
	timer.start();
}
function playSound(event:TimerEvent):void {
	sound.play();
}
// end mp3player.fla

and place it on your local server.
Be sure it won't send referrer otherwise google will return 404. */
var playerURL = "http://localhost/mp3player.swf"; // full path to the swf file

// format: "pageTextToFind": {text: "TTStext", length: audioLengthInMS },
var replacers = {
" :) ": {text: "йо'ожи-ки мутан-ты атаку-ют", length: 3000},
"fun": {text: "автар - выпей ийаду", length: 3000},
};

function escapeRegEx (str) {
  return str.replace(new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"), "\\$&"); // .*+?|()[]{}\
}

function generateURL(text) {
    return 'http://translate.google.com/translate_tts?q=' + encodeURIComponent(text.trim()) + '&tl=ru&prev=input HTTP/1.1';
}

function addPlayer(audioURL, delay) {
    var audio = document.createElement('object');
    audio.setAttribute('type', 'application/x-shockwave-flash');
    audio.setAttribute('width', '1');
    audio.setAttribute('height', '1');

    var embed = document.createElement('embed');
    embed.setAttribute('src', playerURL);
    embed.setAttribute('width', '1');
    embed.setAttribute('height', '1');
    embed.setAttribute('bgcolor', 'transparent');
    embed.setAttribute('play', 'true');
    embed.setAttribute('loop', 'false');
    embed.setAttribute('allowScriptAccess', 'always');
    embed.setAttribute('FlashVars', 'sdelay='+(delay ? delay : 0)+'&audio=' + encodeURIComponent(audioURL));

    audio.appendChild(embed);
    document.body.appendChild(audio);
}

var delay = 0, node, text, textNodes = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textNodes.snapshotLength; i++) {
    node = textNodes.snapshotItem(i);
    text = node.data;
    for (var key in replacers)
        if (text.match(new RegExp(escapeRegEx(key), 'i'))) {
        	var request = replacers[key].text;
        	//opera.postError('[FirstAprilFun]: key: '+key+' value: '+request+' delay: '+parseInt(delay,10));
        	addPlayer(generateURL(request),parseInt(delay,10));
        	delay += parseInt(replacers[key].length,10);
        }
}
}, false);