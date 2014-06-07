// ==UserScript==
// @name        addicted to google-code-prettify
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description Auto syntax highlight by google-code-prettify with Pager Extension for UserScript
// @include     http://let.hatelabo.jp/*
// @include     http://let.st-hatelabo.com/*
// @include     https://raw.github.com/*
// @include     https://gist.github.com/raw/*
// @include     https://bitbucket.org/*/raw/*
// @exclude     http://let.hatelabo.jp/help*
// @exclude     https://github.com/*
// @exclude     http://code.google.com/p/*
// @exclude     https://code.google.com/p/*
// @exclude     http://sourceforge.jp/projects/*
// @exclude     https://bitbucket.org/*
// @exclude     http://*.tld/*jquery*.js
// @exclude     https://*.tld/*jquery*.js
// @exclude     http://www.google.tld/reader/*
// @exclude     https://www.google.tld/reader/*
// @exclude     https://metacpan.org/*
// @exclude     http://bazaar.launchpad.net/*
// @exclude     https://bazaar.launchpad.net/*
// @require     https://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js
// @grant       none
// @run-at      document-end
// @version     2014.3.29.1
// @homepage    https://userscripts.org/scripts/show/135577
// @downloadURL https://userscripts.org/scripts/source/135577.user.js
// @installURL  https://userscripts.org/scripts/source/135577.user.js
// @updateURL   https://userscripts.org/scripts/source/135577.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @author      noromanba
// @copyright   (c) 2012-2014 noromanba  http://noromanba.flavors.me
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Five-interlaced-pentagons.svg/32px-Five-interlaced-pentagons.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Five-interlaced-pentagons.svg/64px-Five-interlaced-pentagons.svg.png
// @include     http://*.tld/*.bsh
// @include     https://*.tld/*.bsh
// @include     http://*.tld/*.c
// @include     https://*.tld/*.c
// @include     http://*.tld/*.cc
// @include     https://*.tld/*.cc
// @include     http://*.tld/*.cpp
// @include     https://*.tld/*.cpp
// @include     http://*.tld/*.cs
// @include     https://*.tld/*.cs
// @include     http://*.tld/*.csh
// @include     https://*.tld/*.csh
// @include     http://*.tld/*.cyc
// @include     https://*.tld/*.cyc
// @include     http://*.tld/*.cv
// @include     https://*.tld/*.cv
// @include     http://*.tld/*.java
// @include     https://*.tld/*.java
// @include     http://*.tld/*.js
// @include     https://*.tld/*.js
// @include     http://*.tld/*.m
// @include     https://*.tld/*.m
// @include     http://*.tld/*.mxml
// @include     https://*.tld/*.mxml
// @include     http://*.tld/*.perl
// @include     https://*.tld/*.perl
// @include     http://*.tld/*.pl
// @include     https://*.tld/*.pl
// @include     http://*.tld/*.pm
// @include     https://*.tld/*.pm
// @include     http://*.tld/*.py
// @include     https://*.tld/*.py
// @include     http://*.tld/*.rb
// @include     https://*.tld/*.rb
// @include     http://*.tld/*.sh
// @include     https://*.tld/*.sh
// @include     http://*.tld/*.xhtml
// @include     https://*.tld/*.xhtml
// @include     http://*.tld/*.xml
// @include     https://*.tld/*.xml
// @include     http://*.tld/*.xsl
// @include     https://*.tld/*.xsl
// ==/UserScript==

// FIXME insane <at>include for 'lang.ext'
// http://wiki.greasespot.net/Include_and_exclude_rules#Regular_Expressions
// http://wiki.greasespot.net/Magic_TLD

// TBD 'Magic TLD' use within a RegExp, check X-GM env; Greasemonkey, Scriptish, Tampermonkey, et al.
// Greasemonkey not supported at 2012-12-23 (GM prob support now)
// ----
// https://github.com/greasemonkey/greasemonkey/blob/master/modules/third-party/convert2RegExp.js
//      var tldRegExp = new RegExp("^(\\^(?:[^/]*)(?://)?(?:[^/]*))(\\\\\\.tld)((?:/.*)?)$");
//      => tldRegExp: /^(\^(?:[^/]*)(?://)?(?:[^/]*))(\\\.tld)((?:/.*)?)$/
// but '.tld' matching fail, e.g.
//      <at>include /^https?:\/\/.*\\.tld\/.*\.(bsh|c|cc|cpp|cs|csh|cyc|cv|java|js|m|mxml|perl|pl|pm|py|rb|sh|xhtml|xml|xsl)$/
// \.tld, \\.tld and \\\.tld fail alike. wtf
// ----

// TODO https://bitbucket.org include/exclude


// Icon (Public domain by AnonMoos)
// https://commons.wikimedia.org/wiki/File:Five-interlaced-pentagons.svg

// Devel
// https://gist.github.com/noromanba/2897358


(function () {
    // run only in top-frame (w/o iframes)
    // c.f. http://stackoverflow.com/questions/1677558/greasemonkey-against-an-iframe-using-include-does-this-work
    // e.g. https://www.youtube.com/results?search_query=WORD&sm=3
    if (window.top !== window.self) return;
    
    var addCSS = (function () {
        var parent = document.head || document.body || document.documentElement;

        // TBD set reuest timeout threshold
        return function (url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            parent.appendChild(link);
        };
    })();

    var addStyle = (function () {
        var parent = document.head || document.body || document.documentElement;

        var style = document.createElement('style');
        style.type = 'text/css';
        parent.appendChild(style);

        return function (css) {
            style.appendChild(document.createTextNode(css + '\n'));
        };
    })();

    // https://google-code-prettify.googlecode.com/svn/trunk/styles/index.html
    var style = {
        prettify: 'https://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css',
        sunburst: 'https://google-code-prettify.googlecode.com/svn/trunk/styles/sunburst.css',
        desert:   'https://google-code-prettify.googlecode.com/svn/trunk/styles/desert.css',
        obsidian: 'https://google-code-prettify.googlecode.com/svn/trunk/styles/sons-of-obsidian.css',
        doxy:     'https://google-code-prettify.googlecode.com/svn/trunk/styles/doxy.css'
    };

    addCSS(style.sunburst);
    // keep codearea metrics. c.f. https://developer.mozilla.org/en/CSS/initial
    addStyle('.prettyprint { width: initial !important; margin: initial !important; }');
    
    // TODO feedback indicator
    // debounce c.f. http://javascript.g.hatena.ne.jp/edvakf/20100204/1265312155
    var timer, queue = [],
        forEach = Array.prototype.forEach;
    var prettify = function (context) {
        queue.push(context);
        clearTimeout(timer);
        timer = setTimeout(function () {
            forEach.call(queue, function (node) {
                var codes = node.querySelectorAll('code:not(.prettyprint), pre:not(.prettyprint):not(.code-diff)');
                // TODO length check e.g. code.textContent.length / code.textContent.split('\n').join().length;
                forEach.call(codes, function (code) {
                    code.classList.add('prettyprint');
                    // If you needs line number, add slash; '/*' -> '//*'
                    /*
                    code.classList.add('linenums');
                    //*/
                });
            });
            
            // XXX seriously performance problem on long scripts, e.g. something js-framework
            //     async flag 'window.PR_SHOULD_USE_CONTINUATION' looks like UI thread has stopped
            //     https://code.google.com/p/google-code-prettify/source/browse/trunk/js-modules/prettify.js
            //         function doWork() {
            //           var endTime = (win['PR_SHOULD_USE_CONTINUATION'] ?
            //         ...
            // c.f. Asynchronous Module Definition (AMD) API https://github.com/amdjs/amdjs-api/wiki/AMD
            // TBD execute in site-context for attach site-script;
            //     c.f. https://gist.github.com/noromanba/2725191
            window.prettyPrint();
            queue = [];
        }, 10);
    };
    prettify(document.body);

    document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function (evt) {
        prettify(evt.target);
    }, false);
    document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (evt) {
        prettify(evt.target);
    }, false);
    document.body.addEventListener('AutoPagerAfterInsert', function (evt) {
        prettify(evt.target);
    }, false);
})();
