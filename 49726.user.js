// ==UserScript==
// @name 	Turn Off the Lights
// @author 	Tayfun Sen
// @namespace tayfunsen.com
// @version 	0.6
// @description Enabling the lights out feature on YouTube on every video.
// @source 	http://userscripts.org/scripts/show/49726
// @license 	GPL 2 or later
// @include 	http://*.youtube.com/watch?*
// @include 	http://youtube.com/watch?*
// ==/UserScript==
//
// YouTube Lights-Out user script.
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// More information could be found at:
// http://blog.tayfunsen.com/2009/05/youtube-lights-out-feature-through.html
//
// --------------------------------------------------
//
// Started with me wanting the "lights out" feature on many videos that I like.
// It is currently found on some YouTube videos but not all of them.
// 
// Copyright (c) 15 November 2009, Tayfun Sen
// See my web site: http://blog.tayfunsen.com (mostly in Turkish, sorry!)
// 
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function(){
    // Add longform style if it is not already existing.
    var vidTitleEl = document.getElementById("watch-vid-title");
    if (vidTitleEl.getAttribute("class").indexOf("longform") == -1) {
        vidTitleEl.setAttribute("class", vidTitleEl.getAttribute("class") + " longform");
    }

    // Get the child element whose children will be the new buttons.
    var buttonsEl = document.getElementById("watch-longform-buttons");
    if (buttonsEl == null) {
        // YouTube pages must have changed. An update is needed then.
        return 0;
    }

    // Get the place to insert the buttons:
    // Currently buttons are inserted as first comes first served basis.
    var insertionPlace = buttonsEl.firstChild;

    var featureNotDefault = false;
    // Enable the lights out feature if it is not already enabled.
    if (document.getElementById('lights-off-switch') == null) {
        featureNotDefault = true;
        // Append the shade div. This is my shade, YouTube uses an image while
        // I use the background color property.
        var shadeEl = document.createElement('div');
        shadeEl.setAttribute("id","tn-watch-longform-shade");
        shadeEl.style.backgroundColor = "black";
        shadeEl.style.opacity = 0.8;
        shadeEl.style.display = "none";
        shadeEl.style.width = "100%";
        shadeEl.style.position = "absolute";
        shadeEl.style.top = 0;
        shadeEl.style.left = 0;
        shadeEl.style.zIndex = 300;
        document.body.appendChild(shadeEl);

        var lights_off_switch = document.createElement('div');
        lights_off_switch.setAttribute('id', 'lights-off-switch');
        lights_off_switch.setAttribute('class', 'reverse-tooltip-wrapper');
        lights_off_switch.setAttribute('style', "z-index: 0;");
        lights_off_switch.innerHTML =  '<button id="watch-longform-lights-off" class="master-sprite" onclick="tnToggleLights(true); this.blur()"></button>'; 
        // Not adding tooltip stuff because it might cause problems for 
        // future updates.
        var lights_on_switch = document.createElement('div');
        lights_on_switch.setAttribute('id', 'lights-on-switch');
        lights_on_switch.setAttribute('class', 'reverse-tooltip-wrapper');
        lights_on_switch.setAttribute('style', "z-index: 0;");
        // Do not display the "lights on" button just now, only the off button.
        lights_on_switch.setAttribute('style', "display: none;");
        lights_on_switch.innerHTML = '<button id="watch-longform-lights-on" class="master-sprite" onclick="tnToggleLights(false); this.blur()"></button>';
        
        // Add the lights-off buttons.
        buttonsEl.insertBefore(lights_off_switch, insertionPlace);
        buttonsEl.insertBefore(lights_on_switch, insertionPlace);
        // Also add the needed JS
        var headEl = document.getElementsByTagName("head")[0];
        var newScript = document.createElement('script');
        newScript.type = "text/javascript";
        newScript.innerHTML = 'var watchShade = document.getElementById(\'tn-watch-longform-shade\'); \
            watchShade.onclick = function() { tnToggleLights(false); }; \
            var lightsOffSwitch = document.getElementById(\'lights-off-switch\'); \
            var lightsOnSwitch = document.getElementById(\'lights-on-switch\'); \
            var dBod = document.body; \
			var dDoc = document.documentElement; \
            function tnToggleLights(lightsOff) { \
                var shadeHeight = Math.max( \
                        Math.max(dBod.clientHeight, dDoc.clientHeight), \
                        Math.max(dBod.offsetHeight, dDoc.offsetHeight), \
                        Math.max(dBod.scrollHeight, dDoc.scrollHeight)); \
                if (lightsOff) { \
                    dBod.className += \' watch-lights-off\'; \
                } else { \
                    dBod.className = dBod.className.replace(/\\bwatch-lights-off\\b/, \'\'); \
                } \
                lightsOffSwitch.style.display = (lightsOff? \'none\' : \'\'); \
                lightsOnSwitch.style.display = (lightsOff? \'\' : \'none\'); \
                watchShade.style.height = shadeHeight + \'px\'; \
                watchShade.style.display = (lightsOff? \'\' : \'none\'); \
        }';
        // Append this JS
        headEl.appendChild(newScript); 
    }
    // Use the defaults to set the lights on or off.
    if (GM_getValue('lightsOffByDefault', false)) {
        if (featureNotDefault) {
            unsafeWindow.tnToggleLights(true);
        } else {
            // The lights off feature is enabled for this video.
            // Simply call the defined function after the page has loaded.
            unsafeWindow.addEventListener('load', function() {
                unsafeWindow.yt.www.watch.longform.toggleLights(true);
            }, false);
        }
    }

    // Add a menu so the lights can be set to off as default.
    GM_registerMenuCommand("Toggle default lights status", function() {
        var lightsOffByDefault = GM_getValue('lightsOffByDefault', false);
        GM_setValue('lightsOffByDefault', !lightsOffByDefault);
        alert("Turn Off the Lights user script setting changed.\n\nLights will be " + (!lightsOffByDefault? "off" : "on") + " by default from now on.");
    });
})();
