// ==UserScript==
// @name            Coursera EXT - Total video length
// @description     Coursera Extension -- adds total video length to Week headers
// @namespace       http://sepczuk.com/
// @version         0.05
// @include         https://class.coursera.org/*/lecture
// @match           https://class.coursera.org/*/lecture
// @copyright       2012-2014, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/138943.user.js
// @updateURL       https://userscripts.org/scripts/source/138943.meta.js
// @require         http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function mainWrapper(){
    function main() {
// ------------------------------------------------------------------------
function prefixWith0ifNeeded(n) {
   return ('0'+n).substr(-2);
}

var matchMinutesDuration = /[([](\d+) ?mins?|(\d+):(\d+)[)\]]/;

$('.course-item-list-header').each( function() {
	var e = $(this);
	var totalMinutes = 0;
	e.next().find('li > a').each(function(){
		var title = $(this).text();
		var match = matchMinutesDuration.exec(title);
		if (match != null) {
            if (match[1] != undefined) {
                result = parseInt(match[1])*60;
            } else {
                result = parseInt(match[2])*60 + parseInt(match[3]);
            }
		} else {
			result = 0;
		}
		totalMinutes += result;
		// console.log(result)
	})
	var fullMinutes = Math.floor(totalMinutes/60);
	var restSeconds = totalMinutes%60;
    var fullHours   = Math.floor(fullMinutes/60);
    var restMinutes = fullMinutes%60;
	e.children().eq(0).append(' [' + fullHours + ':' + prefixWith0ifNeeded(restMinutes) + ':' + prefixWith0ifNeeded(restSeconds) + ']')
});
// ------------------------------------------------------------------------
    };

    main();
};

mainWrapper();