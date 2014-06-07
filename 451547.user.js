// ==UserScript==
// @name        WebM Embedder (Redux) for NeoGAF
// @namespace   http://userscripts.org/users/637069
// @description Andrex's WebM embedding code in Greasemonkey, tweaked to allow users to customise whether clips auto play, auto mute etc. Much less taxing on yer CPU. Now with .mp4 support, thanks to zhorkat. Still no support, since I don't know anything about JavaScript.
// @include     http://www.neogaf.com/*
// @include     http://www.neogaf.net/*
// @version     5
// @require            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_log
// ==/UserScript==

GM_config.init('Options', {
    'Auto Loop': {
        'label': 'Auto Loop',
        'type': 'checkbox',
        'default': 'true'
    },
    'Auto Play': {
        'label': 'Auto Play',
        'type': 'checkbox',
        'default': 'false'
    },
    'Fixed Width': {
        'label': 'Fixed Width',
        'type': 'int',
        'default': '500'
    },
     'Show Controls': {
     'label': 'Show Controls',
     'type': 'checkbox',
     'default': 'true',
    },
    'Auto Mute': {
     'label': 'Auto Mute',
     'type': 'checkbox',
     'default': 'true',
    },
});

var input=document.createElement("input");
input.type="button";
input.value="WebM Embedder Options";
input.onclick = showOption;
document.body.appendChild(input);
 
function showOption()
{
    GM_config.open();
}

var videos = document.querySelectorAll('.post a'),
  link, video;

for (var i = 0; i < videos.length; i++) {
  link = videos[i].href;
  if (link.indexOf('.webm') === link.length - 5 || link.indexOf('.mp4') === link.length - 4) {
    video = document.createElement('video');
    video.src = link;
    video.autoplay = GM_config.get('Auto Play');
    video.loop = GM_config.get('Auto Loop');
    video.muted = GM_config.get('Auto Mute'); 
    video.controls= GM_config.get('Show Controls');
    video.width= GM_config.get('Fixed Width');
    
    videos[i].parentNode.replaceChild(video, videos[i]);
  }
}