// <![CDATA[
// ==UserScript==
// @name          RealChat Freeze Countdown
// @fullname      RealChat Freeze Countdown
// @author        simmaster07
// @version       1.0
// @licence       http://creativecommons.org/licenses/by-nc-sa/3.0/
// @licence       (CC) BY-NC-SA
// @description   Displays a 60-sec countdown next to a username in case they evade a freeze.
// ==/UserScript==

/******************************************** License ******************************************************
*** Creative Commons 3.0                                                                                 ***
*** by: BY-attribution (Requirement to acknowledge or credit the author "simmaster07")                   ***
*** nc: Non-Commercial (Use for commercial purpose is forbidden)                                         ***
*** sa: Share Alike    (Derivative works must be under the same or similar license to this one)          ***
***********************************************************************************************************/

// Add the script in
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://afdes.tk/freezeCount.js');
document.body.appendChild(script);
// ]]>