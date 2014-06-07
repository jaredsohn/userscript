// ==UserScript==
// @name YouTube LightSwitch
// @version        0.1
// @namespace      StormyJ
// @homepage       http://userscripts.org/
// @description    Test to keep the switch next to yt vids

// @include          *http://www.youtube.com/watch?v=*

<a onmousedown="_toggleEarthHour(); return false;" title="Go dark." id="earth-hour-switch-on">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
    </a>
<a onmousedown="_toggleEarthHour(); return false;" title="Go bright." id="earth-hour-switch-off">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
    </a>
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"><a onmousedown="_toggleEarthHour(); return false;" title="Turn the lights back on." id="earth-hour-switch-off">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
    </a>
// ==/UserScript==