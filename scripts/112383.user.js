// ==UserScript==
// @name           Kawaii Not
// @namespace      http://www.kawaiinot.com
// @include        http://*kawaiinot.com/*/*/*/*/
// ==/UserScript==

var setupNav = function() {
    var urls = {};
    
    var nextDiv = document.getElementsByClassName('nav-next')[0];
    if (nextDiv) {
        var nextA = nextDiv.getElementsByTagName('a')[0];
        if (nextA && nextA.href) {
            urls.next = nextA.href;
        }
    }
    
    var previousDiv = document.getElementsByClassName('nav-previous')[0];
    if (previousDiv) {
        var previousA = previousDiv.getElementsByTagName('a')[0];
        if (previousA && previousA.href) {
            urls.previous = previousA.href;
        }
    }
    
    window.addEventListener('keypress',function(event) {
        switch (event.keyCode) {
            case 37: 
                if (urls.previous) { window.location = urls.previous; }
                break;
            case 39:
                if (urls.next) { window.location = urls.next; }
                break;
        }
    },false);
};
try { setupNav(); } catch (err) { GM_log('setupNav() error: ' + err.message); }

var setupTitle = function() {
    var loc = String(window.location);
    var locTokens = loc.split('/');
    var info = {};
    for (var n = 0; (n < locTokens.length) && !info.day; n++) {
        if (!info._nDomain && (locTokens[n].indexOf('kawaii') > 0)) {
            info._nDomain = n;
        }
        else if (info._nDomain != null) {
            switch (n) {
                case info._nDomain + 1:
                    info._nYear = n;
                    info.year = locTokens[n];
                    break;
                case info._nDomain + 2:
                    info._nMonth = n;
                    info.month = locTokens[n];
                    break;
                case info._nDomain + 3:
                    info._nDay = n;
                    info.day = locTokens[n];
                    break;
            }
        }
    }
    if (!info.day) {
        console.log('cannot calculate date');
        return false;
    }
    
    info.date = info.year + '-' + info.month + '-' + info.day;
    
    document.title = document.title + ' [' + info.date + ']';
};
try { setupTitle(); } catch (err) { GM_log('setupTitle() error: ' + err.message); }