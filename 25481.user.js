// ==UserScript==
// @name          YouTotem
// @description   Watch YouTube with Totem, Mplayer or VLC
// @include       http://*youtube.*/*
// ==/UserScript==
    
// Set mimetype to force to specific player:
//
// totem:   "video/flv"
// mplayer: "application/x-quicktimeplayer"
// vlc:     "video/mpeg4"

var mimetype = "video/mpeg";

GM_registerMenuCommand("YouTotem - normal quality", function(){ GM_setValue('ytqual',0); });
GM_registerMenuCommand("YouTotem - high quality", function()  { GM_setValue('ytqual',6); });
GM_registerMenuCommand("YouTotem - high quality (mp4)", function(){GM_setValue('ytqual',18);});

/* Player */
var player = document.getElementById('watch-player-div');
if(player) {
    var width  = window.innerWidth  - 395;
    var height = window.innerHeight - 160;
    if(width < 450)
        width = 450;
    if(height < 354)
        height = 354;
    if(height < ((width/4)*3)+17)
        width = ((height - 17) / 3) * 4;
    else
        height = ((width/4)*3)+17;

    var base = document.getElementById('baseDiv');
    if(base) {
        base.style.width = (width+370) + 'px';
        player.parentNode.style.width = width + 'px';
    }
    var side = document.getElementById('sideAdDiv');
    if(side) {
        side.parentNode.removeChild(side);
    }
    var ad = document.getElementById('leaderboardAd');
    if(ad) {
        ad.parentNode.removeChild(ad);
    }

    var z = null;
    var scripts = document.getElementsByTagName('script');
    for(var i = 0; i < scripts.length && z == null; ++i) {
                z = scripts[i].text.match(/video_id": "([^"]+).+, "t": "([^"]+)/);
    }
    if(z == null) {
        alert('YouTotem: Unable to find video source');
        return;
    }
    
    var src = 'http://youtube.com/get_video?video_id=' + z[1]+ '&t=' + z[2];
    var quality = GM_getValue('ytqual',18);
    if(quality != 0)
        src += '&fmt=' + quality;

    player.innerHTML = 
        '<embed src="' + src + '" width="' + width + '" height="' +
        height + '" autoplay="true" ' + 'loop="true" ' +
        'type="' + mimetype + '"></embed>';
}

/* Homepage */
var hp = document.getElementById('hpEmbedVideo');
if(hp) {
    var src = hp.innerHTML.match(/iurl=([^&]+)/);
    if(src) {
        hp.innerHTML = '<img src="' + unescape(src[1]) +
                '" width="300" height="225">';
    }
}

/* Profile & Vlog */
var obj = document.getElementsByTagName('object');
var img = new Array(obj.length);
var ele = new Array(obj.length);
var j = 0;

for(var i = 0; i < obj.length; ++i) {
    var z = null;
    if(obj[i].parentNode.className == 'profileEmbedVideo')
        z = obj[i].innerHTML.match(/video_id=([^&]+)/);
    else
        z = obj[i].innerHTML.match(/video_id=([^&]+)&.*iurl=/);
    if(z) {
        img[j] = document.createElement('div');
        img[j].innerHTML =
            '<a href="http://www.youtube.com/watch?v=' + z[1] +
            '"><img src="http://img.youtube.com/vi/' + z[1] +
            '/default.jpg" width="300" height=225"></a>';
        obj[i].innerHTML = "";
        ele[j++] = obj[i];
    }
}
for(var i = 0; i < j; ++i) {
    ele[i].parentNode.replaceChild(img[i],ele[i]);
}

