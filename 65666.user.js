// ==UserScript==
// @name           raw_links
// @namespace      raw_links
// ==/UserScript==


var DEBUG_TRACE = 0;


// defer changing anything until the page is fully loaded
window.addEventListener('load', window_onload, false);


function window_onload() {
    transform_links_to_raw();

    debug_write_line(
        'Greasemonkey processing finished.'
    );
}


// transforms all redirect links on the current page in a form similar to:
//
//      http://www.somewhereelse.com/redirect?x=something&url=http%3a%2f%2fwww.somewhere.com%2f&y=somethingelse
//
// to raw:
//
//      http://www.somewhere.com/
//
// In the example, the "url" parameter is recognized by the "http" prefix of
// its value, so this works for parameters named "u" or anything else as well.
//
function transform_links_to_raw() {
    var http_regexp = new RegExp('^http://');

    var links = window.document.getElementsByTagName("a");
    if(links) {
        var length = links.length;
        for(var i = 0; i < length; i++) {
            try {
                var link = links.item(i);
                if(link) {
                    var orig = link.href;
                    try {
                        if(orig) {
                            if(DEBUG_TRACE) {
                                debug_write_line(
                                    'original link: "' + orig + '"'
                                );
                            }

                            var raw_link = get_raw_link(orig, http_regexp);
                            if(raw_link) {
                                link.href = raw_link;
                            }

                            // uncomment to open every link in a new window
                            // link.target = "top";

                            if(DEBUG_TRACE) {
                                debug_write_line('');
                            }
                        }
                    } catch(e) {
                        debug_write_line(
                            'Warning: error processing "' + orig + '" -- ' + e
                        );
                        debug_write_line('');
                    }
                }
            } catch(e) {
                // don't let an error with a single link cause this whole
                // process to fail
                debug_write_line('Warning: ' + e);
                debug_write_line('');
            }
        }
    }
}


function get_raw_link(orig, http_regexp) {
    var raw_link = null;

    var split_on_query = orig.split('?');
    if(split_on_query && split_on_query.length > 0) {
        var query = split_on_query[1];
        if(query) {
            var comps = query.split('&');
            if(comps) {
                var comps_length = comps.length;
                for(var j = 0; j < comps_length; j++) {
                    var key_value = comps[j].split('=');
                    if(key_value && key_value.length > 1) {
                        var key = key_value[0];
                        var value = decodeURIComponent(key_value[1]);
                        if(DEBUG_TRACE) {
                            debug_write_line('----key: "' + key + '"');
                        }

                        var note;
                        if(http_regexp.test(value)) {
                            raw_link = value;
                            note = ' (the raw link)';
                        } else {
                            note = '';
                        }

                        if(DEBUG_TRACE) {
                            debug_write_line('----value' + note + ': "' +
                                value + '"'
                            );
                        }

                        if(raw_link && !DEBUG_TRACE) {
                            break;
                        }
                    }
                }
            }
        }
    }

    return raw_link;
}


var debug_log = null;

function debug_init_log() {
    if(!debug_log) {
        var body = document.body;
        if(body) {
            debug_log = document.createElement('div');
            debug_log.style.fontFamily = 'monospace';
            debug_log.appendChild(document.createElement('br'));
            debug_log.appendChild(document.createTextNode('debug log:'));
            debug_log.appendChild(document.createElement('br'));
            debug_log.appendChild(document.createElement('br'));
            body.appendChild(debug_log);
        }
    }
}


/*
    no HTML encoding of message is necessary

    Example:
        debug_write_line('\'' + xxx_var + '\'');

*/

function debug_write_line(message) {
    debug_init_log();
    debug_log.appendChild(document.createTextNode(message));
    debug_log.appendChild(document.createElement('br'));
}


