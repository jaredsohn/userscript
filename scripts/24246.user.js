// ==UserScript==
// @name           Is latest jQuery?
// @namespace      remysharp.latestjquery
// @description    Checks whether the version of jQuery loaded is the latest version.
// ==/UserScript==

var jQueryVersionCheck = {    
    load: function () {
        var code = function () {
            // remove the iframe once the code below is complete - just to keep the page in it's original state
            var frame = window.parent.document.getElementById('__jquerycheck');
            var body = window.parent.document.getElementsByTagName('body')[0];
            
            setTimeout(function () {
                body.removeChild(frame);
            }, 10);
            
            if (typeof window.parent.jQuery == 'undefined') return;
            
            if (!window.console) {
                window.console = { 
                    log : function (s) {
                        alert(s + "\n\nEnable Firebug to have this message appear in the console");
                    }
                };
            }
            
            var latest = jQuery.fn.jquery;
            var current = window.parent.jQuery.fn.jquery;
            if (latest != current) {
                console.log('Running from old jQuery: ' + current);
            } else {
                // console.log('jQuery is up to date');
            }
        };
        
        var frame = document.createElement('iframe');
        frame.id = '__jquerycheck';
        frame.style.display = 'none';
        document.getElementsByTagName('body')[0].appendChild(frame);
        
        var win = frame.contentDocument || frame.contentWindow.document; 
        
        // doing the '(' + code.toString() + ')()' was the only way I could
        // get code to run inside the °real* window 
        win.write(jQueryVersionCheck.iframeTemplate.replace(/%script%/, '(' + code.toString() + ')()'));
        win.close();
    },
    
    // array so that we maintain some formatting
    iframeTemplate : [
        '<!' + 'DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"', 
        '    "http://www.w3.org/TR/html4/loose.dtd">', 
        '<' + 'html>', 
        '<' + 'head>', 
        '<' + 'script src="http://code.jquery.com/jquery-latest.js"><' + '/script>', 
        '<' + 'script>',
        '%script%',
        '<' + '/script>',
        '<' + '/head>', 
        '<' + 'body>', 
        '<' + '/body>', 
        '<' + '/html>'
    ].join("\n")    
};

window.addEventListener("load", function(e) { jQueryVersionCheck.load(); }, true);