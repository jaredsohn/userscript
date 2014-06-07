// ==UserScript==
// @name           alc modify link
// @namespace      relaxedcolumn.blog8.fc2.com
// @description    modify javascript link to normal link, add AutoPagerize support
// @include        http://eow.alc.co.jp/*
// @include        http://eowbeta.alc.co.jp/*
// ==/UserScript==

(function() {
    var w = unsafeWindow || window;
    var d = w.document;

    var ENCODING = d.f1.ie.value;
    var WORD     = d.f1.q.value;
    var DK       = d.f1.dk.value;
    var PAGE     = d.f1.pg.value;

    var NEXT_PAGE_ID = "AutoPagerizeNextLink";

    function modifyLinks(doc) {
        doc.querySelector("#paging span+a").id = NEXT_PAGE_ID;

        Array.slice(doc.querySelectorAll("a[href^='javascript:']")).forEach(function(node) {
            if(node.href.match(/goWordLink\("(.+)"\)/)) {
                node.href = '/' + RegExp.$1 + '/' + ENCODING + '/?ref=wl';
                return;
            }

            if(node.href.match(/goPage\("(\d+)"\)/)) {
                node.href = '/' + WORD + '/' + ENCODING + '/?pg=' + RegExp.$1;
                return;
            }

            if(node.href.match(/goWordLinkHistory/)) {
                node.href = '/' + node.innerHTML + '/' + ENCODING + '/?ref=wh';
                return;
            }

            if(node.href.match(/goGradable\("(.+)"\)/)) {
                node.href = '/' + RegExp.$1 + '/' + ENCODING + '/?ref=hk';
                return;
            }

            if(node.href.match(/goFairWord\("(.+)"\)/)) {
                node.href = '/' + RegExp.$1 + '/' + ENCODING + '/?ref=sp';
                return;
            }

            if(node.href.match(/goFullText\("(.+)"\,\s*"(.+)"\)/)) {
                node.href = '/' + WORD + '/' + ENCODING + '/?ref=ex&exp=' + RegExp.$1 + '&dn=' + RegExp.$2 + '&dk=' + DK + '&pg=' + PAGE;
                return;
            }

            if(node.href.match(/goBack/)) {
                node.href = '/' + WORD + '/' + ENCODING + '/' + (PAGE == '' ? '' : ('?pg=' + PAGE));
                return;
            }
        });
    }

    window.addEventListener('DOMContentLoaded', function() {
        modifyLinks(w.document);

        var org_show_link = w.show_link;
        w.show_link = function(flag) {
            org_show_link(flag);
            modifyLinks();
        };

        // AutoPagerize
        if (window.AutoPagerize) {
            addFilterHandler();
        } else {
            window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
        }
    }, false);

    // for AutoPagerize.
    function addFilterHandler() {
        var siteinfo = [{
            url:          'http://eow\.alc\.co\.jp/.*',
            nextLink:     'id("' + NEXT_PAGE_ID + '")',
            pageElement:  'id("resultsList")',
            exampleUrl:   'http://eow.alc.co.jp/apple/UTF-8/',
            test: true
        }];
        window.AutoPagerize.addDocumentFilter(modifyLinks);
        window.AutoPagerize.launchAutoPager(siteinfo);
    }
})();
