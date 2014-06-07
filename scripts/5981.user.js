// ==UserScript==
// @name           Delicious Meet Google
// @namespace      http://inelegant.org/
// @description    Replaces the YSM ads on del.icio.us SERPs with Google results.
// @include        http://del.icio.us/search*
// ==/UserScript==
function e(s) { return encodeURIComponent(s)}
var query = e(document.forms[0].elements[1].value);
if (query) {embed_results('http://searchmash.com/results/',query);}
function embed_results(href,query) {
    href += query;
    var content;
    //rm YSM ads before the XMLHTTPRequest call to avoid flickering
    if (document.getElementById('sidebar')) {
        document.getElementById('sidebar').innerHTML='';
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: href,
        onload: function(res) {
            content = eval('('+res.responseText+')');
            var html = document.createElement('div');
            html.setAttribute('id','sponsored');
            html.innerHTML = json2html(content,query);
            var e = document.getElementById('infobar');
            if (e) {e.parentNode.insertBefore(html,e.nextSibling);}
        }
    });
}
function json2html (j,query) {
    var html = '<div id="sidebar"><h3>Google results:</h3><div class="sidebar-inner">';
    for (var i=0;i<j.results.length;i++) {
        var r = j.results[i];
        var ptitle = r.title.replace( /<[^<|>]+?>/gi,'' );
        html += '<h4 class="matchtitle"><a href="'+r.rawUrl               +
                '">'+r.title+'</a></h4><p class="matchdesc">'             +
                r.snippet+'</p><p class="matchdomain"><a href="/post?url='+
                e(r.rawUrl)+'&title='+e(ptitle)+'"><img '                 +
                'style="margin-top:1px" src="/favicon.ico"/></a> '        +
                r.site+'</p><div class="sidebar-break"></div>';
    }    
    return html+'<a href="http://google.com/search?q='+query+'">More results</a></div></div>';
}
