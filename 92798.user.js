// ==UserScript==
// @name           XVIDEOS.COM flv download
// @namespace      tag:drifter-x-xvideos-download
// @description    Directly download flv files from xvideos.com
// @include        http://www.xvideos.com/video*
// ==/UserScript==
// credits to http://userscripts.org/users/45791
// 24-Jul-2011
// 22-Oct-2013
//

(function() {
var render_url = function(url) {
    var ul_elems = document.evaluate("//div[@id='page']/header/div[@id='mainMenu']/ul",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var ul = ul_elems.snapshotItem(0);
    if (!ul) return;
    
    var li = document.createElement('li');
    
    var a = document.createElement('a');
    a.href = url;
    a.title = 'Direct download';
    a.appendChild(document.createTextNode('Direct download'));
    
    li.appendChild(a);
    ul.appendChild(li);
};

var get_xv_url = function() {
    var url = '(not found)';

/*****
    GM_xmlhttpRequest({
        method: 'GET',
        url: window.location,
        onload: function(resp) {
            var match = resp.responseText.match( /flv_url=(http.+?)&amp;/ );
            if (match) {
                url = unescape(match[1]);
                render_url(url);
            }
        }
    });
*****/

    var match = document.documentElement.innerHTML.match( /flv_url=(http.+?)&amp;/ );
    if (match) {
	url = unescape(match[1]);
    }
    
    return url;
};

render_url(get_xv_url());
}());
