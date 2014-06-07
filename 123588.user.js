// ==UserScript==
// @name        Multiple-dependancy Chrome-friendly userscript pattern
// @version     1.2
// @description This is a userscript pattern to allow writing Chrome- and Firefox-friendly scripts which depend on one or more external scripts.  Also included is support for including third-party scripts inside your userscript, but separately from your own code.
// @include     http://someurlpattern.zzz
// @match       http://someurlpattern.zzz
// ==/UserScript==

function main($) {
    'use strict';
    jQuery.noConflict();

// PUT YOUR CODE HERE

}

function thirdParty($) {
    'use strict';
    jQuery.noConflict();

// Put third-party non-jQuery functions here.  They'll be wrapped into the 
// jQuery prototype in a moment.

    var sayHello = function (who) {
        alert('Hello ' + who + '!');
    }

    jQuery.extend({
        // If you have any non-jQuery functions, they need to be wrapped in here.

        sayHellow: function(who) {
                return sayHello('World');
        }

    });

// Put third-party jQuery plugins, extensions, etc. here

}

!function loader(i) {
    var script
      , requires = [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
                   , 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'
                   ]
      , head = document.getElementsByTagName('head')[0]
      , makeScript = function () {
            script = document.createElement('script');
            script.type = 'text/javascript';
      }
      , loadLocal = function (fn) {
            makeScript();
            script.textContent = '(' + fn.toString() + ')(jQuery);';
            head.appendChild(script);
      }
      ;
    (function (i) {
        makeScript();
        script.src = requires[i];
        script.addEventListener('load', function () {
            ++i !== requires.length ? loader(i) : (loadLocal(thirdParty), loadLocal(main));
        }, true);
        head.appendChild(script);
    })(i || 0);
}();