// ==UserScript==
// @name       Watch Later Feed Time
// @namespace  http://www.fuzetsu.com/WLFT
// @version    0.0.2
// @description  Shows the total time it would take to watch all the videos in your watch later feed
// @updateURL http://userscripts.org/scripts/source/480354.meta.js
// @downloadURL http://userscripts.org/scripts/source/480354.user.js
// @match      https://www.youtube.com/feed/watch_later
// @copyright  2014+, fuzetsu
// ==/UserScript==

var location = document.createElement('span');
location.style.float = 'right';
document.querySelector('.branded-page-v2-subnav-container').appendChild(location);

var calcTimeString = function(str) {
    return str.split(':').reverse().reduce(function(last, cur, idx) {
        cur = parseInt(cur, 10);
        switch(idx) {
            case 0: // seconds
                return last + cur;
            case 1: // minutes
                return last + cur * 60;
            case 2: // hours
                return last + cur * 60 * 60;
            default:
                return 0;
        }
    }, 0);
};

var padTime = function(time) {
	return ("0" + time).slice(-2);
};

var setTime = function() {
    var seconds = [].reduce.call(document.querySelectorAll('.video-time'), function(last,  cur, idx) {
        return last + calcTimeString(cur.textContent.trim());
    }, 0);
    var hours = Math.floor(seconds / 60 / 60);
    seconds = seconds % (60 * 60);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    location.innerHTML = 'Total Length: ' + [hours, minutes, seconds].map(padTime).join(':');
};

window.onclick = function(evt) {
    if(evt.target.nodeName === 'IMG') {
        setTimeout(setTime, 1500);
    }
};

setTime();