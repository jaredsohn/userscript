// ==UserScript==
// @name           Final Transition Bungie - Halo
// @namespace      www.bungie.net
// @description    Adds Final Transition Countdown to Bungie.net
// @author         PKF_647
// @contributor    robby118
// @include        http://*.bungie.net/*
// ==/UserScript==

var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="border-bottom: 0px solid #bbbbbb; font-size: small; background-color: #242223; color: #ffffff;"><p style="margin: 0px 0 0px 0;"><a href="http://www.bungie.net/News/content.aspx?type=topnews&cid=32028">Countdown to Final Transition: </a></p><div id="cdTimer_counter"><span id="cdTimer_days" style="font-weight: bold;"></span> days <span id="cdTimer_hours" style="font-weight: bold;"></span> hours <span id="cdTimer_minutes" style="font-weight: bold;"></span> minutes <span id="cdTimer_seconds" style="font-weight: bold;"></span> seconds</div><a href="http://halo.xbox.com/" id="cdTimer_zeroMessage" style="display: none; font-weight: bold;">Transition Completed</span></div>';
 newElement.style.textAlign="center";
 forums.parentNode.insertBefore(newElement, forums);
 }

unsafeWindow.genericCountdownUpdate('3/31/2012 12:00:00 AM','cdTimer_days','cdTimer_hours','cdTimer_minutes','cdTimer_seconds','cdTimer_zeroMessage','cdTimer_counter');

