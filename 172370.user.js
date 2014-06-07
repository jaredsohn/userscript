// ==UserScript==
// @name          FreeSound HTML5
// @namespace     http://gravgun.free.fr
// @description   Give freesound.org HTML5 players, because Flash sucks
// @include       http://*.freesound.org/*
// @include       http://freesound.org/*
// @version       1.1
// @grant         none
// @license       GPLv3
// ==/UserScript==
// 1.1: fixed script not running on freesound.org without "www."

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    var canPlayVorbis = /probably|maybe/.test(document.createElement("audio").canPlayType('audio/ogg; codecs="vorbis"'));
    function replace_player(e) {
        var isLarge = e.classList.contains("large"),
            url = e.getElementsByClassName(canPlayVorbis?"ogg_file":"mp3_file")[0].href,
            waveformurl = e.getElementsByClassName("waveform")[0].href,
            spectrumurl = e.getElementsByClassName("spectrum")[0].href,
            spectrumshown = false,
            waveformdark = document.createElement("div"),
                wds = waveformdark.style,
            location = document.createElement("div"),
                ls = location.style,
            tools = document.createElement("div"),
                ts = tools.style,
                playstop = document.createElement("span"),
                loop = document.createElement("span"),
                togglewave = document.createElement("span"),
            waveform = document.createElement("img"),
            audio = document.createElement("audio"),
            
            svghdr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:'+(isLarge?"32":"10")+'px;height:'+(isLarge?"32":"10")+'px"><path d="',
            svgftr = '" fill="#FFF" /></svg>',
            svgplay = "M 1,1 1,15 15,8 z",
            svgstop = "M 1,1 1,15 15,15 15,1 z",
            svgloop = "m 11,1 -5,4 5,4 0,-3 2,0 0,7 L 3,13 3,6 5,6 5,4 1,4 1,15 15,15 15,4 11,4 z",
            svgwave = "M 1,7 4,1 8,12 12,5 15,9 15,12 12,8 8,15 4,4 1,10 z";
        
        new Image().src = spectrumurl;
        
        function toggle(reset) {
            if(audio.paused) {
                audio.play();
            } else {
                audio.pause();
                if(reset != undefined)
                    audio.currentTime = 0;
            }
        }
        
        audio.preload = "none";
        audio.src = url;
        audio.type = "audio/wave";
        audio.style.display = "none";
        audio.addEventListener("progress", function() {
            if(audio.buffered.length < 1) { return; }
            waveformdark.style.left = ((audio.buffered.end(0) / audio.duration)*waveform.clientWidth) + "px";
        });
        audio.addEventListener("timeupdate", function() {
            location.style.left = ((audio.currentTime / audio.duration)*waveform.clientWidth) + "px";
        });
        audio.addEventListener("pause", function() {
            playstop.innerHTML= svghdr+ svgplay +svgftr;
        });
        audio.addEventListener("play", function() {
            playstop.innerHTML= svghdr+ svgstop +svgftr;
        });
        e.appendChild(audio);
        
        // Toolbox setup
        playstop.innerHTML= svghdr+ svgplay +svgftr;
        playstop.style.margin = (isLarge?8:3)+"px";
        playstop.addEventListener("click", function() {
            toggle(true);
        });
        tools.appendChild(playstop);
        
        loop.innerHTML= svghdr+ svgloop +svgftr;
        loop.style.margin = (isLarge?8:3)+"px";
        loop.style.opacity = "0.5";
        loop.addEventListener("click", function() {
            if(loop.style.opacity === "0.5") {
                loop.style.opacity = "1";
                audio.loop = true;
            } else {
                loop.style.opacity = "0.5";
                audio.loop = false;
            }
        });
        tools.appendChild(loop);
        
        togglewave.innerHTML= svghdr+ svgwave +svgftr;
        togglewave.style.margin = (isLarge?8:3)+"px";
        togglewave.style.opacity = "0.5";
        togglewave.addEventListener("click", function() {
            if(spectrumshown) {
                waveform.src = waveformurl;
                spectrumshown = false;
            } else {
                waveform.src = spectrumurl;
                spectrumshown = true;
            }
        });
        tools.appendChild(togglewave);
        // END Toolbox setup
        
        e.style.position = "relative";
        
        waveform.src = waveformurl;
        waveform.addEventListener("click", function() {
            toggle();
        });
        e.appendChild(waveform);
        
        ls.position = "absolute";
        ls.background = "#FFF";
        ls.height = "100%";
        ls.width = "1px";
        ls.top = waveformdark.style.left = "0";
        e.appendChild(location);
        
        wds.position = "absolute";
        wds.background = "rgba(0,0,0,0.5)";
        wds.height = "100%";
        wds.top = wds.left = wds.right = "0";
        waveformdark.addEventListener("click", function() {
            toggle();
        });
        if(audio.buffered.length > 0)
        console.log(audio.buffered.end(0) +"/"+ audio.duration);
        if(audio.buffered.length > 0 && audio.buffered.end(0) == audio.duration) {
            wds.display = "none";
        }
        e.appendChild(waveformdark);
        
        ts.position = "absolute";
        ts.left = ts.bottom = "0";
        e.appendChild(tools);
    }
    
    var embeds = document.getElementsByTagName("embed"), len = embeds.length, i, small_players, large_players;
    for(i=0; i < len; i++) {
        embeds[i].parentNode.removeChild(embeds[i]);
    }

    small_players = document.getElementsByClassName("player small"); len = small_players.length;
    if(len > 0) {
        console.log("HTML5izing " + len + " players");
        for(i=0; i < len; i++) {
            replace_player(small_players[i]);
        }
    }
    
    large_players = document.getElementsByClassName("player large");
    if(large_players.length > 0) {
        console.log("HTML5izing player");
        replace_player(large_players[0]);
    }
}, false);