// ==UserScript==
// @name         svn-links-to-repos
// @version      0.0.1
// @description  provide links back to the repository from ViewVC
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://svn.berlios.de/viewcvs/*
// @include      http://*.svn.sourceforge.net/viewvc/*
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100); 
    }
    else { 
        $ = unsafeWindow.jQuery;
        letsJQuery(); 
    }
}
GM_wait();

function myesc(s)
{
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

var svn_hosts =
[
    {
        "host_re" : /^svn\.berlios\.de$/, 
        "path_remove" : /^.*?viewcvs\//,
        "items" :
        [
            {
                "prefix" : "http://svn.berlios.de/svnroot/repos/",
                "label" : "Read-only URL"
            },
            {
                "prefix" : "https://svn.berlios.de/svnroot/repos/",
                "label" : "Read-write (HTTPS)"
            }
        ]
    },
    {
        "host_re" : /^([^\.])+\.svn\.sourceforge\.net$/, 
        "path_remove" : /^.*?viewvc\//,
        "items" :
        [
            {
                "prefix" : (function (p) { 
                        return "http://" + p["host"] + "/svnroot/"; 
                        }),
                "label" : "Read-only URL"
            },
            {
                "prefix" : (function (p) { 
                        return "https://" + p["host"] + "/svnroot/"; 
                        }),
                "label" : "Read-write (HTTPS)"
            }
        ]
    },
];

// All your GM code must be inside this function
function letsJQuery() {
    var path = location.pathname;
    var host = location.host;
    
    var h;
    for ( h_idx in svn_hosts)
    {
        h = svn_hosts[h_idx];
        if (h["host_re"].test(host))
        {
            path = path.replace(h["path_remove"], "");

            var items_string = "";

            for (item_idx in h["items"])
            {
                item = h["items"][item_idx];

                var prefix = item["prefix"];

                prefix =
                    ((typeof(prefix) == 'function')
                        ? prefix({"host" : host, "path" : path })
                        : prefix
                    )
                    ;


                items_string +=
                    "<li>"
                    + "<a href=\"" + encodeURI(prefix + path) + "\">"
                    + myesc(item["label"])
                    + "</a>"
                    + "</li>"
                    ;
            };

            $("h1").after(
                  "<ul class=\"url_trans\" id=\"url_trans\">"
                + items_string
                + "</li>"
                + "</ul>"
            );

            return;
        }
    }
}

