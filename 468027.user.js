// ==UserScript==
// @name       Crunchyroll Queue Real Times
// @namespace  http://userscripts.org/scripts/show/468027
// @version    0.0.5
// @description  Display next episode times accurately in the Crunchyroll Queue page
// @updateURL http://userscripts.org/scripts/source/468027.meta.js
// @downloadURL http://userscripts.org/scripts/source/468027.user.js
// @match      http://www.crunchyroll.com/home/queue
// @copyright  2014+, fuzetsu
// ==/UserScript==

var PREMIUM = 'rgb(255, 251, 223)',
    REGULAR = 'rgb(232, 244, 248)',
    COMING_SOON_IMG = 'http://static.ak.crunchyroll.com/i/coming_soon_beta_wide.jpg';

var SECOND = 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24;

var CURYEAR = (new Date()).getFullYear();

var qq = function(q, c) {
    return [].slice.call((c || document).querySelectorAll(q));
};

var findEpByTitle = function(shows, title) {
    var found;
    shows.some(function(show) {
        if(show.name.indexOf(title) === 0) {
            found = show;
            return true;
        }
    });
    return found;
};

var getTimes = function(total) {
    var days = Math.floor(total / DAY);
    total -= days * DAY;
    var hours = Math.floor(total / HOUR);
    total -= hours * HOUR;
    var minutes = Math.floor(total / MINUTE);
    total -= minutes * MINUTE;
    var seconds = Math.floor(total / SECOND);
    total -= seconds * SECOND;
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        toTimeStr: function() {
            return (this.days > 0 ? this.days + ' days ' : '') + (this.hours > 0 ? this.hours + ' hours ' : '') + (this.minutes > 0 ? this.minutes + ' minutes ' : '') + this.seconds + ' seconds';
        }
    };
};

// inserts a countdown to the release
var insertCountDown = function(loc, ep) {
    var countDown = document.createElement('span');
    var last = Date.now();
    var totalTime = ep.date.valueOf() - last;
    setInterval(function() {
        var times = getTimes(totalTime);
        countDown.textContent = times.toTimeStr();
        totalTime -= Date.now() - last;
        last = Date.now();
    }, 1000);
    loc.innerHTML = '';
    loc.appendChild(countDown);
};

var extractDataFromScript = function(text) {
    var obj = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
    var dateStr = text.slice(text.lastIndexOf('}') + 4, text.lastIndexOf('"'));
    obj.date = new Date(dateStr.slice(0, -1) + " " + (dateStr.slice(-1) === 'a' ? 'am' : 'pm') + ' ' + CURYEAR);
    return obj;
};

var getLaunchCalendar = function(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/launchcalendar', true);
    xhr.responseType = 'document';
    xhr.onload = cb;
    xhr.send();
};

var main = function(userColor) {
    getLaunchCalendar(function(evt) {
        var xhr = evt.target;
        var animeData = [];
        qq('td > div > script', xhr.response).forEach(function(script) {
            if(script.previousSibling.previousSibling.style.backgroundColor !== userColor) return;
            animeData.push(extractDataFromScript(script.textContent.trim()));
        });
        // find first date that is before now
        var now = Date.now();
        animeData = animeData.filter(function(anime) {
            return anime.date.valueOf() >= now;
        });
        // add retrieved data to page
        qq('.queue-wrapper').forEach(function(queueItem) {
            var title = qq('.series-title', queueItem)[0].textContent;
            var episode = findEpByTitle(animeData, title);
            if(episode) {
                insertCountDown(qq('.short-desc', queueItem)[0], episode);
            }
        });
    });
};

// kick it off
main(PREMIUM);