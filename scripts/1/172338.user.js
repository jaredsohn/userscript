// ==UserScript==
// @name       Twitch.tv chat resize/recolor
// @namespace  http://www.nocturnal.org/
// @version    0.4
// @description  Simple example script to resize/recolor the popout version of twitch chat.  This makes it more suitable for window capture and including in your broadcast (Open Broadcaster Software, Window capture).  Adjust as needed.
// @match      http://www.twitch.tv/chat/embed*
// @copyright  2012+, You
// ==/UserScript==

window.self.resizeTo(408,455);
document.getElementById("chat_lines").style.color="white";
document.getElementById("chat_lines").style.backgroundColor="black";