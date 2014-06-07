// ==UserScript==
// @include             *://*.vk.com/*
// @include             *://vk.com/*
// @include             *://*.vkontakte.ru/*
// @include             *://vkontakte.ru/*
// @name                VK Viewer
// @version             9.3.0
// @description         Ultimate vk.com
// @homepage            http://userscripts.org/scripts/show/115434
// @updateURL           http://userscripts.org/scripts/source/115434.meta.js
// @downloadURL         http://userscripts.org/scripts/source/115434.user.js
// @icon                http://s3.amazonaws.com/uso_ss/icon/115434/large.png
// @resource gm_logo    http://s3.amazonaws.com/uso_ss/icon/115434/large.png
// @grant               none
// ==/UserScript==

var html = document.documentElement,
    layout = html.querySelector('#layer_wrap'),
    vk_root = 'http://vkviewer/vkviewer.js';

if ((window.top == window.self) && layout && !html.dataset.context) {

    (function onready(callback) {
        var url = location.href.replace(location.origin, '').replace(/^\//, ''),
            path = location.pathname.replace(/^\//, '').replace(/\.php$/, ''),
            search = location.search.replace(/^\?/, ''),
            context_urls = {
                recent  : path == 'mail',
                dialog  : path == 'im' && (search == '' || /(^|&)sel=-?\d+/.test(search)),
                history : /^write\d+$/.test(path) && /^hist=-?\d+/.test(search),
                write   : /^write\d+$/.test(url),
                friends : /^friends$/.test(path),
                people  : /^search$/.test(path) && /section.*people/.test(search) || /people(\/|$)/.test(path),
                public  : /^search$/.test(path) && /section.*communities/.test(search) || /communities(\/|$)/.test(path),
                gifts   : /^gifts(\d+|$)/.test(path),
                feed    : /^feed$/.test(path),
                wall    : /^wall(-?\d+|$)/.test(path),
                fave    : /^fave$/.test(path)
            };

        {
            var cover = document.createElement('div');
            cover.id = 'cover';
            cover.style.top = 0;
            cover.style.left = 0;
            cover.style.width = '100%';
            cover.style.height = '100%';
            cover.style.position = 'fixed';
            cover.style.zIndex = 9999999999;
            cover.style.backgroundColor = '#FFF';
            html.appendChild(cover);
        }

        for (var context in context_urls) {
            if (context_urls[context]) {
                callback(html.dataset.context = context);
                break;
            }
        }
        if (!html.dataset.context) {
            var wait_content = setInterval(function () {
                var content = document.documentElement.querySelector('#content > div');
                if (content) {
                    clearInterval(wait_content);
                    if (['profile', 'public', 'group'].indexOf(content.id) >= 0) {
                        callback(html.dataset.context = content.id);
                    } else {
                        cover.remove();
                    }
                }
            }, 7);
        }

    })(function () {

        html.dataset.root = vk_root;

        function createHidden(id) {
            var elem = document.createElement('div');
            elem.id = id;
            elem.style.display = 'none';
            return elem;
        }

        var listener = createHidden('listener');
        var sender = createHidden('sender');
        var receiver = createHidden('receiver');

        html.appendChild(listener);
        listener.appendChild(sender);
        listener.appendChild(receiver);

        try {

            if (typeof chrome != 'undefined' && typeof chrome.extension != 'undefined') {
                var port = chrome.extension.connect({
                    name : 'background'
                });

                new WebKitMutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        for (var n = 0; n < mutation.addedNodes.length; n++) {
                            try {
                                port.postMessage(JSON.parse(mutation.addedNodes[n].textContent));
                            } catch (e) {
                            }
                        }
                    });
                }).observe(sender, {
                        childList : true
                    });

                port.onMessage.addListener(function (msg) {
                    try {
                        if (typeof msg == 'object') {
                            if (typeof msg.opener == 'object') {
                                receiver.appendChild(document.createTextNode(JSON.stringify(msg)));
                            } else {
                                if (typeof msg.background == 'object') {
                                    receiver.appendChild(document.createTextNode(JSON.stringify(msg)));
                                }
                            }
                        }
                    } catch (e) {
                    }
                });

            }

            function apply_script(scriptSrc, callback) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.addEventListener('load', callback, false);
                script.src = scriptSrc;
                document.head.appendChild(script);
            }

            (function (callback) {
                if (typeof jQuery == 'undefined') {
                    apply_script(vk_root + '/libs/jQuery/jquery.min.js', function () {
                        apply_script(callback);
                    });
                } else {
                    apply_script(callback);
                }
            })(vk_root + '/vk.joiner.js');

        } catch (e) {
            alert(e.stack);
        }

    });

}