// ==UserScript==
// @name       WF - RL Time
// @namespace  http://war-facts.com
// @version    0.0
// @description  This will change the in-game times to RL times...
// @match      http://*.war-facts.com/starlog.php*
// @copyright  2012+, Me
// ==/UserScript==



var aEls = document.getElementsByTagName('font');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
    if(aEl.style.fontSize = "85%") {
        if(aEl.innerHTML.match('([0-2][0-9]):([0-5][0-9])')) {
            timeChange = aEl;
            var tempTime = timeChange.innerHTML;
            var newTime = timeChange.parentNode.title;
            timeChange.innerHTML = newTime;
            timeChange.parentNode.title = tempTime;
        }
    }
}