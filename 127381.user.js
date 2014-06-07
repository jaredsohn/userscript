// ==UserScript==
// @id             enable_copy
// @name           Enable copy
// @version        0.2.2
// @namespace      http://kodango.me
// @author         tuantuan <dangoakachan@foxmail.com>
// @description    Enable copy on some sites.
// @include        http://zhinan.jxedt.com/*
// @include        http://tieba.jxedt.com/*
// @include        http://kaoshi.jxedt.com/*
// @include        http://tieba.baidu.com/*
// @include        http://www.qidian.com/BookReader/*
// @include        http://www.qdmm.com/BookReader/*
// @include        http://www.360doc.com/content/*
// @run-at         document-end
// ==/UserScript==

/*
 * Changelog:
 *
 * version 0.1.0 2011/03/04
 * 1. 提交测试版。
 *
 * version 0.2.0 2011/03/06
 * 1. 重构代码，更加稳定可扩展。
 * 2. 支持多个网站共享同一个补丁配置(名称映射)。
 * 3. 优化添加补丁的API函数接口。
 * 4. 实现类似jQuery的bind/one事件绑定函数。
 *
 * version 0.2.1 2011/03/06
 * 1. 模拟Greasemonkey实现跨浏览器的unsafeWindow。
 * 2. 修复Chrome浏览qidian.com无法选择文字的问题。
 */
(function () {
    /* Utility functions */
    var util = (function () {
        /* 
         * Saves the unsafeWindow object that refers to the real window 
         * object inside the page.
         */
        var _window;

        /*
         * Get the unsafeWindow object.
         *
         * Compatible with Firefox, Chrome, etc.
         */
        function _getUnsafeWin() {
            var divElem;

            /* If aleady save window object */
            if (_window !== undefined)
                return _window;

            if (this.unsafeWidnow !== undefined) { // In Firefox
                _window = this.unsafeWindow;
            } else if (unsafeWindow !== undefined || window.chrome) { // In Chrome
                /* A hack method to get the real window object */
                divElem = document.createElement('div');
                divElem.setAttribute('onclick', 'return window;');

                _window = divElem.onclick();
            } else { // Other browsers, such as Opera
                _window = window;
            }

            return _window;
        }

        return {
            /* Defines simple logger function */
            logger: (GM_log !== undefined) ? GM_log : console.log,

            /* Defines a simple element query function */
            $: function (selector) {
                switch (selector) {
                    case 'document':
                        return document;
                    case 'window':
                        return _getUnsafeWin();
                    default:
                        return document.querySelector(selector);
                }
            },

            /* 
             * Attach a handler to an event for the specified element..
             *
             * If the eventType starts with 'on', choose traitional method to
             * bind this event, otherwise choose W3C method.
             */
            bind: function (selector, eventType, handler) {
                var elem = this.$(selector);  // Gets the element we need
                var newHandler = handler; // Creates a new handler

                if (selector == 'window' && handler != null) {
                    /* Rebind this pointer */
                    newHandler = function (event) {
                        handler.call(elem, event);
                    };
                }

                /* Choose traditional or W3C bind method smartly. */
                if (eventType.indexOf('on') == 0) {
                    elem[eventType] = newHandler;
                } else {
                    elem.addEventListener(eventType, newHandler, false);
                }
            },


            /*
             * Attach a handler to an event for the specified element.
             *
             * The handler is executed at most once, then will be detached.
             */
            one: function (selector, eventType, handler) {
                /* Attach new handler to the event for specified element */
                this.bind(selector, eventType, this.makeOnce(handler));
            },

            /* Make a handler executed at most once. */
            makeOnce: function (handler) {
                return function (event) {
                    handler.call(this, event);

                    if (eventType.indexOf('on') != 0)
                        this.removeEventListener(eventType, arguments.callee);
                    else
                        this[eventType] = null;
                };
            }
        };
    })();

    /* Enable Copy Functions */
    var dangoEnCopy = (function () {
        /* Defines site configuration */
        var _siteConf = {
            /*
             * Maps a site to another name (like one top domain name).
             *
             * In this way, multiple sites can share one common configuration. 
             * If mapping isn't set for a site, its domain name will be used 
             * by default. Otherwise, the mapping name will be used instead.
             *
             * The format is very simple, like 'domain name' : 'mapping name'.
             */
            mappings: { },

            /*
             * Defines patch for each site that need to enable copy functions.
             *
             * One patch is described by name and value. the patch name must be
             * non-empty, and the patch value is an array of patch description
             * object or a single patch descript object.
             *
             * Patch description object must have two key: selector and events. The
             * selector indicates which element to be patched. The events is a
             * simple map from event type to event handler.
             *
             * Below is an example:
             *
             * 'patchName': [
             *   {
             *      selector: 'a_selector_of_the_element_need_to_be_binded',
             *      events: 'a_map_of_events'
             *   },
             *   {
             *      selector: 'a_selector_of_another_element_need_to_be_binded',
             *      events: 'a_map_of_events'
             *   }
             * ]
             *
             * The format of events map is:
             * {
             *     'eventName': function eventHandler(event) {
             *          // Add your handle code here
             *     },
             *     ...
             * }
             *
             * The event handler function can be null, that is to simple remove
             * former bind handler in the content page. If you want handle this
             * event only once, just use makeOnce(handler) instead:
             * {
             *     'eventName': makeOnce(eventHandler)
             * }
             *
             * If the eventName starts with 'on' (onclick, onmousedown, etc.), it
             * will bind to the specified element in the traditional method:
             *      element.oneventName = eventHandler;
             * Otherwise, it will use W3C method by the native event bind method:
             *      element.addEventListener('eventName', eventHandler, false);
             */
            patches: { }
        };

        /*
         * Class Patch: defines the patch need to be applied for a site.
         */
        function _Patch(selector, events) {
            this.sel = selector;
            this.evts = events;
        }

        /* Implements toString method */
        _Patch.prototype.toString = function () {
            return '[object Patch]';
        };

        /* Applys the patch */
        _Patch.prototype.apply = function () {
            var evts = this.evts, types = new Array(), type;

            for (type in evts) {
                util.bind(this.sel, type, evts[type]);
                types.push(type);
            }

            util.logger('The patch binds bellow events to "' + this.sel + '":');
            util.logger('\t---> ' + types.join(' '));
        };

        /* Load and apply site-related patches */
        function _loadAndApply(domain, config) {
            var patchArr, patchObj, patchName;

            /* Get the patch name */
            if (domain in config['mappings'])
                patchName = config['mappings'][domain];
            else
                patchName = domain;

            if (!patchName) {
                logger('Patch name can\'t be empty.');
                return;
            }

            /* Then get the related patches */
            patchArr = config['patches'][patchName];

            /* Iterate the patches and apply it */
            for (var i = 0, len = patchArr.length; i < len; i++) {
                patchObj = patchArr[i];

                /* Check the validity of the specified patch */
                if (patchObj && patchObj.selector && patchObj.events) {
                    (new _Patch(patchObj.selector, patchObj.events)).apply();
                } else {
                    util.logger(patchName + ' is not a valid patch.');
                }
            }
        }

        return {
            /* Map the domain to a new name */
            addMapping: function (domain, mapping) {
                if (domain && mapping) {
                    _siteConf['mappings'][domain] = mapping;
                }
            },

            /* Add a new patch */
            addPatch: function (name, selector, events) {
                var patches = _siteConf['patches'];

                if (!name) return;

                /*
                 * If the patch with the same name has existed, merge the new
                 * patch with the old one. Otherwise, add a new patch.
                 */
                if (!(name in patches)) {
                    patches[name] = [{
                        selector: selector,
                        events: events
                    }];
                } else {
                    patches[name].push({
                        selector: selector,
                        events: events
                    });
                }

                util.logger('Add patch ' + name + ' to the database.');
            },

            /* Add a patch related to specified domain name */
            addDomainPatch: function (domain, selector, events) {
                if (domain != document.domain)
                    return;

                this.addPatch(domain, selector, events);
            },

            /* Enable the copy function */
            enable: function () {
                _loadAndApply(document.domain, _siteConf);
            }
        };
    })();

    /* Defines some common handlers */
    var handlers = {
        reset: function (event) {
            return true;
        }
    };

    /* Add a default patch */
    dangoEnCopy.addPatch('default', 'body', {
        'oncopy': null,
        'onmousedown': null,
        'onselectstart': null
    });

    /* Map site to existing patch */
    dangoEnCopy.addMapping('zhinan.jxedt.com', 'default');
    dangoEnCopy.addMapping('tieba.jxedt.com', 'default');

    /* 
     * Add patch for qidian.com when use BookReader 
     *
     * Enable copy and disable the context menu when right click on the page.
     */
    dangoEnCopy.addDomainPatch('qidian.com', 'window', {
        'load': function (event) {
            /* Disable context menu */
            document.oncontextmenu = null; 

            document.onselectstart = null;
            document.body.onselectstart = null;

            util.$('#bigcontbox').onmousedown = null;
        }
    });

    /* Map qdmm.com to qidian.com */
    dangoEnCopy.addMapping('qdmm.com', 'qidian.com');

    /* Add patch for 360doc.com */
    dangoEnCopy.addDomainPatch('www.360doc.com', 'body', {
        'mousedown': util.makeOnce(function (event) {
            this.oncopy = null;
        })
    });

    /* Add patch for tieba.baidu.com */
    dangoEnCopy.addDomainPatch('tieba.baidu.com', 'html', {
        contextmenu: function (event) {
            if (event.target.className != 'tb-editor-editarea') {
                editor = util.$('.tb-editor-editarea');
                editor.setAttribute('contenteditable', 'false');
            }
        },
        click: function (event) {
            if (event.target.className == 'tb-editor-editarea') {
                event.target.setAttribute('contenteditable', 'true');
                event.target.focus();
            }
        }
    });

    /* Enable copy function at last */
    dangoEnCopy.enable();
})();