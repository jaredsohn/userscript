// ==UserScript==
// @name           B23 links tooltips
// @namespace      http://friendfeed.com/innin/
// @description    tooltips for B23 links
// @include        *
// ==/UserScript==

var skip = ['m', 'n', 'p', 't', 'about', 'settings', 'login', 'logout', 'abuse', 'api']

window.addEventListener("load", function(e) {
    
    var loader = '<img align="absmiddle" src="data:image/gif;base64,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"/>';
    var hint_css = 'position: absolute; width: auto; padding: 3px; z-index:10000; border: 1px solid gray; background-color: #FFFFCC;';
    
    var res = document.evaluate("//a[starts-with(@href, 'http://b23.ru/')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var j = 0;
    var body = document.getElementsByTagName('body').item(0);
    
    for (var i = 0; i<res.snapshotLength; i++) {
        var link = res.snapshotItem(i);
        var href = link.getAttribute('href');
        var re = new RegExp("^http://b23.ru/([0-9a-zA-Z]+)/?$");
        if (!href.match(re) || testSkip(href)) {
            continue;
        }
        var s = RegExp.$1;
        var id = 'b23'+s;
        var s2 = document.createElement('div', '');
        s2.setAttribute('style', hint_css+'display: none;');
        s2.setAttribute('id', id);
        s2.innerHTML = id;
        body.insertBefore(s2, body.childNodes.item(0));
        
        var link2 = link.cloneNode(true);
        link2.setAttribute('linkid', id);
        link2.setAttribute('short', s);
        link.parentNode.insertBefore(link2, link);
        link.parentNode.removeChild(link);
        
        link2.addEventListener("mouseover", function(event) {
            var linkid = this.getAttribute('linkid');
            var ss = this.getAttribute('short');
            var t = document.getElementById(linkid);
            t.innerHTML = loader;
            t.setAttribute('style', hint_css+'display: block; top: '+ parseInt(event.clientY + 3 + getScrollHeight() )+'px;'+'left: ' + parseInt(event.clientX + 5 + getScrollWidth() )+'px;');
            var l = GM_getValue(linkid);
            if (l) {
                t.innerHTML = l;
            } else {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: "http://b23.ru/api/expand/"+ss,
                    onload: function(responseDetails) {
                        GM_setValue(linkid, responseDetails.responseText);
                        t.innerHTML = responseDetails.responseText;
                    }
                });
            }
        }, false);
        
        link2.addEventListener("mouseout", function(event) {
            t = document.getElementById(this.getAttribute('linkid'));
            t.style.display = 'none';
        }, false);
    }
    
    function testSkip(href) {
        
        for (var i=0; i<skip.length; i++) {
            var re = new RegExp("^http://b23.ru/"+skip[i]+"$");
            if (href.match(re)) {
                return true;
            }
        }    
    }
    
    function getScrollWidth()
    {
       xScroll = window.pageXOffset ||
               document.body.scrollLeft ||
               document.documentElement.scrollLeft;
       return xScroll;
    }

    function getScrollHeight()
    {
       yScroll = window.pageYOffset ||
               document.body.scrollTop ||
               document.documentElement.scrollTop;
       return yScroll;
    }
    
}, false);