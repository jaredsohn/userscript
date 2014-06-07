// ==UserScript==
// @name           Better Nozbe
// @namespace      http://userscripts.org/ironfroggy/betternozbe
// @include        http://www.nozbe.com/account/*
// ==/UserScript==

// Add jQuery
var dollar = unsafeWindow.$;

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; unsafeWindow.$ = dollar; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

    var task = unsafeWindow.task;
    task.is_nextaction = function (action) {
        return (unsafeWindow.document.getElementById('action_'+action.toString()).childNodes[0].src == "http://img.nozbe.com/action-next.png")
    };
    
    task.set_nextaction = function (action, set) {
        if (typeof(set) == 'undefined') { var set = true; }
        var current = unsafeWindow.task.is_nextaction(action);
        if (current != set) {
            unsafeWindow.task.actioning(action);
            if (!set) {
                unsafeWindow.document.getElementById('task_'+action.toString()).remove(); unsafeWindow.task.count();
            }
        }
    };
    
    if (unsafeWindow.location == 'http://www.nozbe.com/account/calendar') {
        $('.desc2done').hide();
    } else if (unsafeWindow.location == 'http://www.nozbe.com/account/next') {
    
        task._check_without_actioning = task.check;
        
        task.check = function (action) {
            unsafeWindow.task._check_without_actioning(action);
            unsafeWindow.task.set_nextaction(action, false);
        };
    }
};