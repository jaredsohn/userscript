// ==UserScript==
// @name        gist raw perm HEAD
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description Add permanently HEAD links on Gist for UserScript
// @include     https://gist.github.com/*
// @version     2012.12.24.0
// @homepage    https://userscripts.org/scripts/show/130781
// @downloadURL https://userscripts.org/scripts/source/130781.user.js
// @installURL  https://userscripts.org/scripts/source/130781.user.js
// @updateURL   https://userscripts.org/scripts/source/130781.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba https://www.hatena.ne.jp/noromanba/
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Color_icon_orange_v2.svg/32px-Color_icon_orange_v2.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Color_icon_orange_v2.svg/64px-Color_icon_orange_v2.svg.png
// ==/UserScript==
// Icon (Public Domain by Mizunoryu, Badseed, Jacobolus)
// https://commons.wikimedia.org/wiki/File:Color_icon_orange_v2.svg

// Devel
// https://gist.github.com/2370972

(function () {
    var executeBrowserContext = (function () {
        var parent = document.head || document.documentElement || document.body;

        var container = document.createElement('script');
        container.type = 'text/javascript';
        container.charset = 'utf-8';
        parent.appendChild(container);

        return function (funcOrString) {
            container.appendChild(document.createTextNode('(' + funcOrString.toString() + ')();\n'));
        };
    })();

    var appendButton = function code() {
        if (!(/^https:\/\/gist\.github\.com\/[\w-]+/.test(location.href)) ||
            document.querySelector('.gist-perm-button')) {
            return;
        }

        // TODO refactor to Gist{}
        var gistfile = function (rawNode) {
            var raw = rawNode,
                meta = raw.pathname.match(/\/raw\/([\w-]+)\/[\w-]+\/(.*)/),
                baseurl = 'https://raw.github.com/gist/',
                id = meta[1],
                basename = meta[2];

            return {
                raw: raw,
                id: id,
                name: basename,
                data: {
                    name: basename.slice(basename.lastIndexOf('/') + 1),
                    type: basename.split('.').length > 1 ? basename.split('.').pop() : 'N/D'
                },
                permalink: baseurl + id + '/'
            };
        };

        var gist = []; // more smart, into a gist{}
        Array.prototype.forEach.call(document.querySelectorAll('.actions .raw-url'), function (raw) {
            var namedHead = raw.cloneNode(true);
            var file = gistfile(raw);
            gist.push(file);

            // TODO remove redundant attr
            namedHead.href = file.permalink + file.name;
            namedHead.textContent = 'HEAD(named)';
            namedHead.title = file.name;
            namedHead.className += ' ' + 'gist-perm-button';
            // Firefox must be needs 2nd args c.f. https://developer.mozilla.org/en/DOM/element.insertBefore
            raw.parentNode.insertBefore(namedHead, null);
        });

        // https://raw.github.com/gist/ID/ => return 1st non-binary file. Gist API v3 protocol
        gist.some(function (file) {
            // TODO xhr to Gist API and get filetype, parse json or see response header
            if (/(?:png|bmp|jpe?g|gif)$/i.test(file.data.type)) return;

            var head = file.raw.cloneNode(true);
            head.href = file.permalink;
            head.textContent = 'HEAD';
            head.title = file.id + '.txt';
            file.raw.parentNode.insertBefore(head, file.raw.nextSibling);
            return true;
        });

        // TODO independent of jQuery; replace to addEventListener/MutationObserver
        // c.f. https://github.com/defunkt/jquery-pjax#events
        jQuery('#js-pjax-container').on('load', function (evt) {
            code();
        });
        jQuery('#js-pjax-container').on('pjax:end', function (evt) {
            code();
        });
    }; // /appendButton

    executeBrowserContext(appendButton);


    // DBG pjax handling
// <at>require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// <at>require     https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
    /*/
    window.addEventListener('load', function (evt) {
            console.info(evt.type, evt);
    }, false);
    window.addEventListener('popstate', function (evt) {
            console.info(evt.type, evt);
    }, false);

    // c.f. https://github.com/defunkt/jquery-pjax#events
    window.addEventListener('pjax:start', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:end', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:beforeSend', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:send', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:complete', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:success', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:error', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:timeout', function (evt) {
        console.log(evt.type, evt);
    }, false);
    window.addEventListener('pjax:send', function (evt) {
        console.log(evt.type, evt);
    }, false);
    // $.pjax.submit only use of Gist c.f. https://github.com/defunkt/jquery-pjax#pjaxsubmit
    window.addEventListener('submit', function (evt) {
        console.log(evt.type, evt);
    }, false);

    ////////// jQuery .on //////////
    // c.f. https://github.com/defunkt/jquery-pjax#events
    $(document).on('pjax:start', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:end', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:beforeSend', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:send', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:complete', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:success', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:error', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:timeout', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('pjax:send', function (evt) {
        console.log(evt.type, evt);
    });
    $(document).on('submit', function (evt) {
        console.log(evt.type, evt);
    });

    // #js-pjax-container
    $('#js-pjax-container').on('submit', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:start', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:end', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:beforeSend', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:send', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:complete', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:success', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:error', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:timeout', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('pjax:send', function (evt) {
        console.log(evt.type, evt);
    });
    $('#js-pjax-container').on('submit', function (evt) {
        console.log(evt.type, evt);
    });
    //*/
})(); // /anonwrap