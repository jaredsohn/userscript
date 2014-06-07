// ==UserScript==
// @name           dashboard horizontal tabs
// @namespace      jira
// @include        *//jira.*/Dashboard.jspa*
// ==/UserScript==
// 

var dEl = document.getElementById("dashboard");

waiter(
    function() {
        return dEl.className.indexOf('tabs') > -1;
    },
    function() {
        dEl.className = dEl.className.replace(/v-/, 'h-');
        
        var ulEl = dEl.children[1];
        ulEl.className = ulEl.className.replace(/vertical/, 'horizontal');
    }
);


function waiter (test, callback) {
    if (test()) {
        callback();
    }else {
        setTimeout(function() {
            waiter(test, callback);
        }, 100);
    }
};