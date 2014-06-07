// ==UserScript==
// @name            YouTube API Ext -- custom video speed
// @description     Extends standard YouTube API, adding the ability to set custom playback rate in HTML5 player
// @namespace       http://sepczuk.com/
// @version         0.03
// @match           http://www.youtube.com/embed/*
// @match           https://www.youtube.com/embed/*
// @include         http://www.youtube.com/embed/*
// @include         https://www.youtube.com/embed/*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/148132.user.js
// @updateURL       https://userscripts.org/scripts/source/148132.meta.js
// ==/UserScript==

function mainWrapper(){
    
    /*!
     * jQuery Cookie Plugin
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */
    
    function cookie(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            //options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
    
    console.log('YouTube API Ext Initialized!');
    
    var d = document.createElement('div');
    d.innerHTML = 'Speed x1.0';
    d.classList.add('progress-text');
    d.style.cssText = 'position: absolute;\
                       opacity: 0;\
                       top: 1.5%;\
                       right: 1.5%;\
                       background-color: rgba(0, 0, 0, 0.65);\
                       z-index: 999;\
                       padding: 5px 13px;\
                       -webkit-border-radius: 11px;\
                       border: 2px solid rgba(59, 36, 60, 0.39);\
                       box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.46);\
                       -webkit-transition: all .3s ease-in-out;';
    document.body.appendChild(d);
    var curTimebubbleTimeout = null;
    function setPlaybackRate(r) {
        cookie('YouTubeAPIExtSpeed___ByFireBiker', r, {expires: 24*7*30*365*10, secure: true});
        var v = document.getElementsByClassName('video-stream')[0];
        if (v === undefined || v.playbackRate === undefined) {
            setTimeout(function(){setPlaybackRate(r)}, 1000);
            return;
        }
        console.log('-----[in setPlaybackRate]----[Video Object]--> ' + v);
        
        v.playbackRate = r;
        d.innerHTML = 'Speed x' + (parseInt(r*100)/100);
        d.style.opacity = 1;
        if(curTimebubbleTimeout != null) clearTimeout(curTimebubbleTimeout);
        curTimebubbleTimeout = setTimeout(function(){d.style.opacity = 0; curTimebubbleTimeout = null}, 1000);
    }
           
    function getPlaybackRate() {
        var v = document.getElementsByClassName('video-stream')[0];
        return v.playbackRate;
    }
    
    function roundToNthDigit(v, n) {
        return parseFloat((v).toFixed(n));
    }
   
    function getDefaultSpeedFromCookie() {
        var speedC = cookie('YouTubeAPIExtSpeed___ByFireBiker');
        
        /*if ( typeof(speedC) === 'undefined') {
            speedC = 1;
        } else {
            
        }*/
        return parseFloat(speedC) || 1.3;
    }

    function main(){
        //var indicator = document.getElementsByClassName('progress-text')[1];
        //indicator.parentElement.insertBefore(d);
        
        var speedC = getDefaultSpeedFromCookie();
        
        /*if ( typeof(speedC) === 'undefined') {
            speedC = 1;
        } else {
            
        }*/
        console.log(" ---------------- Cookie speed: " + speedC);         
        if(speedC != 1) {
            setTimeout(function(){setPlaybackRate(speedC)}, 1000);
        }
        
        console.log("Adding event listener [message]...");
        window.addEventListener("message", function(m){
            // parsing JSON is quite expensive, so try to directly match a part of our command            
            if (m.data.indexOf('setPlaybackRate') == -1) return;
            
            console.log("Got message: " + m.data);
            var request = JSON.parse(m.data);
            
            if (request.event == 'command' && request.func == 'setPlaybackRate') {
                var speed = request.args[0];
                if (speed == 'default') {
                    speed = getDefaultSpeedFromCookie();
                    console.log("======= Got default. Reading from cookie + timeout...");
                    setTimeout(function(){setPlaybackRate(speedC)}, 1000);
                }
                console.log("Setting playback speed to: " + speed);
                setPlaybackRate(speed);
                event.source.postMessage(JSON.stringify({"event":"result","func":"setPlaybackRate","args":[getPlaybackRate()]}),event.origin);
            }
        })
            
        console.log("Adding event listener [keypress]...");
        window.addEventListener('keypress', function(e){
            console.log("Got keypress: " + e.charCode);
            if(e.charCode == 91) {         /* LEFT BRACKET */                
                var speed = roundToNthDigit(Math.max(0.8, getPlaybackRate()-0.1), 2);
                console.log("Setting playback speed to: " + speed);
                setPlaybackRate(speed);
            } else if (e.charCode == 93) { /* RIGHT BRACKET */
                var speed = roundToNthDigit(Math.min(10, getPlaybackRate()+0.1), 2);
                console.log("Setting playback speed to: " + speed);
                setPlaybackRate(speed);
            }
        })
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}