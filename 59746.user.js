// ==UserScript==
// @name           Remember the Milk - Filtering Lists
// @namespace      com.rememberthemilk.lists.filtering
// @include        http://www.rememberthemilk.com/home/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { unsafeWindow.jQuery.noConflict(); withJQuery(unsafeWindow.jQuery); }
}
GM_wait();

// Option: Hidden tab names
var hidden, HIDDEN_GMVAR = 'com.rememberthemilk.lists.filtering.hiddenTabNames'; 
function restoreHidden() { hidden = GM_getValue(HIDDEN_GMVAR, '').replace(/^\s+|\s+$/g, '').split(/\s*,\s*/); }
restoreHidden();

GM_registerMenuCommand("Change hidden tabs", function () {
    var newHiddenTabNames = prompt(
        "List the tabs names to be hidden, separated by commas", 
        GM_getValue(HIDDEN_GMVAR, '')
    );
    if (newHiddenTabNames == null) return;
    GM_setValue(HIDDEN_GMVAR, newHiddenTabNames);
    restoreHidden();
    unsafeWindow.listTabs.blitDiv();
});

// Rest of the GM code
function withJQuery($) {
    
    /** Task tabs update */
    var oldBlitDiv = unsafeWindow.listTabs.blitDiv;
    unsafeWindow.listTabs.blitDiv = function () {
        oldBlitDiv.apply(this);
        $('#listtabs li').each(function () {
            var $li = $(this);
            for (var i in hidden) {
                if ($li.text() == hidden[i]) {
                    $li.hide();
                    return;
                }
            }
        });
        console.log($('#listtabs li.xtab_smartlist'));
        $('#listtabs li.xtab_smartlist').eq(0).css({ clear: 'left' });
    }
    unsafeWindow.listTabs.blitDiv();
}

window.addEventListener('load', function() {
        var style = "html { overflow-y: scroll; } .xtab_selected { display: block !important; }";
        var head = document.getElementsByTagName("head")[0];
        var el = window.document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        el.href = 'data:text/css;charset=utf-8,' + escape(style);
        head.appendChild(el);
    }, true);
