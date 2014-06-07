// ==UserScript==
// @name       Fix RSI Forums Original Post Date/Time
// @namespace  https://forums.robertsspaceindustries.com/discussion/
// @version    0.1
// @description  Fix Original Posts on RSI Forum posts to show the actual time of post rather than "12:00am 1 Jan 1970", which happens due to a bug.
// @match      https://forums.robertsspaceindustries.com/discussion/*
// @copyright  2013+, Athanasius
// ==/UserScript==

(function () {
    var op, i, bar, timediv, timemobilediv, timemobiletimediv;
    op = document.getElementsByClassName("MessageList Discussion");
    if (op.length > 0) {
        for (i = 0 ; i < op.length ; i++) {
            bar = op[i].getElementsByClassName('bar');
            if (bar) {
                //console.log('f.RSI: Found bar div: %o', bar);
	            timediv = bar[0].getElementsByClassName('time');
                if (timediv) {
                    //console.log('f.RSI: Found time div, %o', timediv);
					timemobilediv = op[i].getElementsByClassName('time-mobile');
					if (timemobilediv) {
                        timemobiletimediv = timemobilediv[0].getElementsByClassName('time');
                        if (timemobiletimediv) {
							//console.log('f.RSI: Found time-mobile div, %o', timemobilediv);
                            timemobiletimediv[0].innerHTML = timediv[0].innerHTML;
							timemobiletimediv[0].innertext = timediv[0].innertext;
                        }
					}
                }
            }
        }
    }
}());