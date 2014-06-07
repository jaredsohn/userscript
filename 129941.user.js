// ==UserScript==
// @name           YouTube: Turn The Lights Off - Forever
// @namespace      YouTube
// @include        *youtube.com/watch?v=*
// @include        *youtube.com/
// @include        *youtube.com/index*
// @include        *youtube.com/user*
// @include        *youtube.com/my*
// @include        *youtube.com/view_all_playlists*
// @version        0.1-ms5
// @copyright      2012, DerET
// ==/UserScript==

// Do not run in iframes
if (window.top != window.self) return;

// Get chosen style
var dark = GM_getValue('dark', null);
if (!dark) {
  dark = 0;
  GM_setValue('dark', 0);
}

// Append global style
var globalstyle = document.createElement('link');
globalstyle.rel = 'stylesheet';
globalstyle.type = 'text/css';
globalstyle.href = 'http://deret.square7.ch/userscripts/YouTube_TurnTheLightsOff-Forever/global.css';
document.getElementsByTagName('head')[0].appendChild(globalstyle);

// Create link element
var lightsoffstyle = document.createElement('link');
lightsoffstyle.rel = 'stylesheet';
lightsoffstyle.type = 'text/css';
lightsoffstyle.href = 'http://dl.dropbox.com/u/27689533/earth_hour_style.css';

// Create light switch container
var switchcontainer = document.createElement('a');
switchcontainer.onclick = switchstyle;
document.getElementById('masthead').appendChild(switchcontainer);

// Create light switch
var lightswitch = document.createElement('img');
lightswitch.setAttribute('id', 'lightswitch');
switchcontainer.appendChild(lightswitch);

// Choose style
if (dark == 1) {
  document.getElementsByTagName('head')[0].appendChild(lightsoffstyle);
  lightswitch.src = 'http://deret.square7.ch/userscripts/YouTube_TurnTheLightsOff-Forever/switchd.png';
}

else if (dark == 0) {
  lightswitch.src = 'http://deret.square7.ch/userscripts/YouTube_TurnTheLightsOff-Forever/switchu.png';
}

// Switch function
function switchstyle() {
  if (dark == 0) {
    document.getElementsByTagName('head')[0].appendChild(lightsoffstyle);

    lightswitch.src = 'http://deret.square7.ch/userscripts/YouTube_TurnTheLightsOff-Forever/switchd.png';

    dark = 1;
    GM_setValue('dark', 1);
  }
  
  else if (dark == 1) {
    lightswitch.src = 'http://deret.square7.ch/userscripts/YouTube_TurnTheLightsOff-Forever/switchu.png';

    dark = 0;
    GM_setValue('dark', 0);

    document.getElementsByTagName('head')[0].removeChild(lightsoffstyle);
  }
}
