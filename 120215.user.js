// ==UserScript==
// @name       Google_unRedirect
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http*://books.google.com/books*
// @include    http*://books.google.com.hk/books*
// @include    http*://books.google.cn/books*
// @include    http*://www.google.*/search*
// @include    http*://scholar.google.com/*
// @copyright  2011+, You
// ==/UserScript==

var GoogleUR = (function () {
    function $(id) { return document.getElementById(id); };

    function _doClean(link) {  
        // web
        var track = link.getAttribute('onmousedown');
        var rredirect = /\/url\?(?:url|q)=([^&]*)/i;
        if (track && track.indexOf('return rwt(') != -1)
            link.removeAttribute('onmousedown');
        else if (rredirect.test(link.href)) {
            link.href = decodeURIComponent(link.href.match(rredirect)[1]);
        }
        
        // books
        if (link.href.indexOf("redir_esc=n") == -1 & link.href.indexOf("books.google") > -1) {
            link.href = link.href.replace('google.cn','google.com').replace('google.com.hk','google.com').replace('redir_esc=y','').replace(/$/, "&redir_esc=n");
        }
    }

    function _removeRedirect() {
        var links = document.querySelectorAll('h3.r a,a.primary,.cloud a,.selectedpagesthumbnail a,.slider-drawables div a,h3.gs_rt a,a#sidebar-atb-link,.metadata_value a'), 
            len = links.length; 
            // // XPath
            // links = document.evaluate(
            //     //"//a[@class='l']",
            //     "//h3[@class='r']/a",
            //     document,
            //     null,
            //     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            //     null);
            // length = links.snapshotLength;
            // for(ctr = 0; ctr < length; ctr++) {
            //     links.snapshotItem(ctr).removeAttribute("onmousedown");
            // }
            
        for (var i = 0; i < len; i++) {
            _doClean(links[i]);
        }
    }


    function _delayRemoveRedirect(event) {
        if (event.type == 'DOMAttrModified') {
            if ((event.target.id === 'xfoot' || event.target.id === 'footer_table' || event.target.className === 'slider_content' || event.target.id === 'gs_n') && event.newValue == '') {
                _removeRedirect();
                event.stopPropagation();
            }
        } else { 
            if (event.relatedNode.id == 'xfoot' || event.relatedNode.id == 'footer_table' || event.target.className === 'slider_content' || event.target.id === 'gs_n') {
                _removeRedirect();
                event.stopPropagation();
            }
        }
    }

    return {
        listen: function () {
            var mutationEvtName = 'DOMAttrModified';
            if (location.pathname == '/search' || location.pathname.indexOf('/books') || location.pathname.indexOf('/scholar') == 0) {
                window.addEventListener("DOMContentLoaded", _removeRedirect, false);
            }
            if (window.chrome)
                mutationEvtName = 'DOMNodeInserted';
            document.addEventListener(mutationEvtName, _delayRemoveRedirect, false);
        }
    };
})();

GoogleUR.listen();