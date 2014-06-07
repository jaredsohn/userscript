// ==UserScript==
// @name           Hacker News Cleaner
// @namespace      rabidsnail
// @description    Removes annoying articles from news.ycombinator.com and makes scanning easier
// @include        http://news.ycombinator.com/*
// ==/UserScript==

if (window.top.location === window.location &&
    (window.location.pathname == '/newest' ||
    window.location.pathname == '/' ||
    window.location.pathname == '/news' ||
    window.location.pathname == '/x')
   ) {
    (function(){

        var get_content = function(doc) {
            try {
                return doc.getElementsByTagName('table')[0].getElementsByTagName('tr')[3].getElementsByTagName('table')[0];
            } catch (e) {
                return null;
            }
        };

        var more_link = function(doc) {
            var links = doc.getElementsByTagName('a');
            var i;
            for (i=0; i < links.length; i++) {
                if (/^\s*More\s*/.test(links[i].innerHTML)) {
                    return links[i];
                }
            }
        };

        var filter_stories = function(doc) {
            Array.prototype.slice.call(doc.getElementsByTagName('a')).forEach(function(link) {
                if (/(^\s*poll:)|innovat|disrupt|\d+ ways|\d+ reasons/.test(link.innerHTML.toLowerCase()) ||
                    /betabeat|techcrunch|venturebeat|gigaom|time\.com|good\.is|techdirt|technet|engadget|techrepublic|cnet|io9|mashable|singularityhub|geek\.com|theinquirer|itworld/.test(link.getAttribute('href'))) {
                    var row = link.parentNode.parentNode;
                    var next_row = row.nextSibling;
                    row.parentNode.removeChild(row);
                    next_row.parentNode.removeChild(next_row);
                }
            });

            Array.prototype.slice.call(document.getElementsByClassName('comhead')).forEach(function(span) {
                var link = span.parentNode.childNodes[0];
                span.innerHTML = span.innerHTML.replace(/[\(\)]/g, '');
                span.parentNode.insertBefore(span, link);
                span.setAttribute('class', '');
                span.style.color = '#e00';
                link.style.fontStyle = 'italic';
            });
        };

        var on_dom_load = function(doc, thunk) {
            var done = false;
            var wrapper = function() {
                if (!done) {
                    done = true;
                    thunk();
                    doc.removeEventListener('DOMContentLoaded', wrapper, false);
                }
            };
            doc.addEventListener('DOMContentLoaded', wrapper, false);
        };

        var get_more = function(doc) {
            var a = more_link(doc);
            if (a) {
                var href = a.getAttribute('href');
                var invisiframe = document.createElement('iframe');
                invisiframe.style.display = 'none';
                invisiframe.setAttribute('src', href);
                document.body.appendChild(invisiframe);
                var poller = function() {
                    var new_doc = invisiframe.contentDocument;
                    var content = get_content(new_doc);
                    
                    if (content) {
                        var old = get_content(doc);

                        Array.prototype.slice.call(content.childNodes).forEach(old.appendChild);
                        
                        setTimeout(function() {
                            filter_stories(document);
                            //var a = more_link(document);
                            //alert(a);
                        }, 1000);
                    } else {
                        setTimeout(poller, 50);
                    }
                };
                setTimeout(poller, 500);
            }
        };

        on_dom_load(document, function() {
            filter_stories(document);
            get_more(document);
            var a = more_link(document);
            a.parentNode.removeChild(a);
        });

    }());
}
