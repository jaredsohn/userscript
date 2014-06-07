// ==UserScript==
//
// You need Google Chrome 13+ or Mozilla Firefox with Greasemonkey 0.9.8+ to use
// this script.
//
// @name Die2Nite Enhancer
// @version 0.2.2
// @description Die2Nite Enhancer improves your game experience on Die2Nite.
// @author Aymeric Beaumet <aymeric@beaumet.me>
// @license zlib/libpng http://opensource.org/licenses/Zlib
// @icon http://www.die2nite.com/gfx/forum/smiley/h_city_up.gif
// @downloadURL http://userscripts.org/scripts/source/242398.user.js
// @updateURL http://userscripts.org/scripts/source/242398.user.js
//
// @match http://www.die2nite.com/*
// @match http://www.hordes.fr/*
// @match http://www.zombinoia.com/*
// @match http://www.dieverdammten.de/*
//
// @grant GM_xmlhttpRequest
// @match http://d2n.duskdawn.net/*
// @exclude http://d2n.duskdawn.net/*
// @match http://die2nite.gamerz.org.uk/*
// @exclude http://die2nite.gamerz.org.uk/*
// @match http://bbh.fred26.fr/*
// @exclude http://bbh.fred26.fr/*
// @match http://www.oeev-hordes.com/*
// @exclude http://www.oeev-hordes.com/*
//
// ==/UserScript==

/*jshint browser:true */
/*jshint scripturl:true */

(function(undefined) {

/*jshint validthis:true */

'use strict';

/******************************************************************************
 *                                                                            *
 *  Die2Nite helpers class                                                    *
 *                                                                            *
 ******************************************************************************/

var D2N = (function() {

/*
 * private:
 */

    var pages_url_ = {
        // in town
        overview: 'city/enter',
        home: 'home',
        well: 'city/well',
        bank: 'city/bank',
        citizens: 'city/co',
        buildings: 'city/buildings',
        doors: 'city/door',
        upgrades: 'city/upgrades',
        tower: 'city/tower',
        refine: 'city/refine',
        guard: 'city/guard',

        // in/out of town
        ghost: 'ghost/user',
        ghost_exp: 'ghost/heroUpgrades',
        settings: 'ghost/options'
    };

    var websites_language_ = {
        'www.die2nite.com': 'en',
        'www.hordes.fr': 'fr',
        'www.zombinoia.com': 'es',
        'www.dieverdammten.de': 'de'
    };

    var session_key_cache_ = null;

    /**
     * Emit a gamebody reload event.
     */
    function emit_gamebody_reloaded_event()
    {
        JS.dispatch_event('d2n_gamebody_reload');
    }

    /**
     * Wait for a gamebody reload and emit the corresponding event then.
     */
    function add_gamebody_reload_event()
    {
        if (D2N.is_on_forum()) {
            return;
        }

        var watch_for_gamebody_reload = function(limit) {
            limit = (typeof limit === 'undefined') ? 20 : limit;

            // If the limit isn't reached and the hash isn't defined, call this
            // function again (this is done to wait the first load)
            if (limit > 0 && window.location.hash === '') {
                return setTimeout(function() { watch_for_gamebody_reload(limit - 1); }, 200);
            }

            JS.wait_for_tag('body', function(nodes) {
                var body_observer = new MutationObserver(function(mutations) {
                    for (var i = 0, max = mutations.length; i < max; i += 1) {
                        if (mutations[i].type !== 'attributes' ||
                            mutations[i].attributeName !== 'style') {
                            continue;
                        }

                        if (mutations[i].target.style.cursor === 'default') {
                            emit_gamebody_reloaded_event();
                            break;
                        }
                    }
                });

                // 1. If the cursor is 'default' it means the page is loaded
                // (and that we missed the cursor change). In this case, just
                // emit an event.
                if (nodes[0].style.cursor === 'default') {
                    emit_gamebody_reloaded_event();
                }

                // 2. Then watch for a cursor style change on the body tag,
                // which means the end of a content load for the page
                body_observer.observe(nodes[0], { attributes: true });
            });
        };
        watch_for_gamebody_reload();
    }

    /**
     * Emit an AP change event.
     */
    function emit_ap_change_event()
    {
        JS.dispatch_event('d2n_apchange');
    }

    /**
     * Wait for an ap change and call emit the corresponding event then.
     */
    function add_ap_change_event()
    {
        // only watch AP change in town
        D2N.is_in_town(function(in_town) {
            if (in_town) {

                emit_ap_change_event(); // dispatch event on first load

                if (D2N.is_on_forum()) {
                    return;
                }

                // Store the observer to always have at least 1 active
                var ap_observer = null;
                var ap_old_observer = null;

                var watch_for_ap_change = function() {
                    JS.wait_for_id('movesCounter', function(node) {
                        ap_old_observer = ap_observer;

                        // Watch for AP change
                        ap_observer = new MutationObserver(function(mutations) {
                            emit_ap_change_event();
                        });

                        ap_observer.observe(node, { childList: true, subtree: true });

                        if (ap_old_observer !== null) {
                            ap_old_observer.disconnect();
                            ap_old_observer = null;
                        }
                    });
                };
                watch_for_ap_change(); // watch on first load

                // watch again when the page change
                window.addEventListener('hashchange', function() {
                    watch_for_ap_change();
                }, false);

            }
        });
    }

    /**
     * Emit a forum topic event.
     */
    function emit_forum_topic_event()
    {
        JS.dispatch_event('d2n_forum_topic');
    }

    /**
     * Wait for a forum topic to load and emit the corresponding event then.
     */
    function add_forum_topic_event()
    {
        if (!D2N.is_on_forum()) {
            return;
        }

        JS.wait_for_id('tid_forum_right', function(node) {
            // if the posts are already loaded, emit the event
            if (document.getElementsByClassName('tid_post').length > 0) {
                emit_forum_topic_event();
            }

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.removedNodes.length <= 0) {
                        return;
                    }

                    for (var i = 0, max = mutation.removedNodes.length; i < max; i++) {
                        if (mutation.removedNodes[i].className === 'tid_loading') {
                            emit_forum_topic_event();
                            return;
                        }
                    }
                });
            });
            observer.observe(node, { childList: true });
        }, 10);
    }


/*
 * public:
 */

    return {

        /**
         * Check whether the user is logged.
         * @param callback callback The callback to call with the result
         */
        is_logged: function(callback)
        {
            JS.wait_for_id('tid_sidePanel_user', function(node) {
                callback(true); // logged if the side panel exists
            }, 20, function(node) {
                callback(false); // else not logged
            });
        },

        /**
         * Check if the player is on the forum.
         * @return bool true if on the forum, false otherwise
         */
        is_on_forum: function()
        {
            return (window.location.pathname === '/tid/forum');
        },

        /**
         * Check if the player is on a forum topic.
         * @return bool true if on a forum topic, false otherwise
         */
        is_on_forum_topic: function()
        {
            return D2N.is_on_forum() &&
                /^#!view\/\d+\|thread\/\d+(?:\?p=\d+)?$/.test(window.location.hash);
        },

        /**
         * Check if the user is playing in a town or not (do not confound with
         * `is_in_city`). Call the function `callback` with the result
         */
        is_in_town: function(callback)
        {
            JS.wait_for_id('clock', function if_found() {
                callback(true);
            }, 5, function if_not_found() {
                callback(false);
            });
        },

        /**
         * Check if the player is in the city. Return false if the user is in the city
         * but on the forum.
         * @return bool true if inside the city, false otherwise
         */
        is_in_city: function()
        {
            return JS.regex_test(
                '^#city',
                window.location.hash
            );
        },

        /**
         * Check if the player is outside the city. Return false if the user is
         * outside but on the forum.
         * @return string true if outside, false otherwise
         */
        is_outside: function()
        {
            return /^#outside\?(?:go=outside\/(?:doors|refresh);)?sk=[a-z0-9]{5}$/.test(window.location.hash);
        },

        /**
         * Check if the given page is loaded (in or out of city).
         * @param string page The page to check (a key from pages_url_)
         * @return string true if on the selected page
         */
        is_on_page: function(page)
        {
            return (D2N.is_on_page_in_city(page) ||
                    D2N.is_on_page_out_of_city(page));
        },

        /**
         * Check if the given city page is loaded.
         * @param string page The page to check (a key from pages_url_)
         * @return string true if on the selected city page
         */
        is_on_page_in_city: function(page)
        {
            return JS.regex_test('^#city\\/enter\\?go=' + pages_url_[page].replace('/', '\\/') + ';sk=[a-z0-9]{5}$', window.location.hash) ||
                JS.regex_test('^#ghost\\/city\\?go=' + pages_url_[page].replace('/', '\\/') + ';sk=[a-z0-9]{5}$', window.location.hash);
        },

        /**
         * Check if the given page is loaded (not in city).
         * @param string page The page to check (a key from pages_url_)
         * @return string true if on the selected page (not in city)
         */
        is_on_page_out_of_city: function(page)
        {
            return JS.regex_test(
                '^#ghost\\?go=' + pages_url_[page].replace('/', '\\/') + ';sk=[a-z0-9]{5}$',
                window.location.hash
            );
        },

        /**
         * Load a specific city page.
         * @param string page The page to go (a key from pages_url_)
         */
        go_to_city_page: function(page)
        {
            // if not in a town, outside city or already on the page, abort
            D2N.is_in_town(function(in_town) {
                if (!(in_town || D2N.is_outside() || D2N.is_on_page_in_city(page))) {
                    return;
                }

                D2N.get_session_key(function(sk) {
                    var page_url = pages_url_[page];

                    JS.redirect('/#city/enter?go=' + page_url + ';sk=' + sk);
                });
            });
        },

        /**
         * Find the session key.
         * @param callback callback The function to call once the sk is fetched
         */
        get_session_key: function(callback)
        {
            // if the cache defined, give it immediately
            if (typeof session_key_cache_ === 'string' && session_key_cache_ !== '') {
                return callback(session_key_cache_);
            }

            // else fetch it
            JS.wait_for_selector('a.mainButton.newsButton', function(node) {
                var arr = node.href.split('=');

                // store the key in the cache
                session_key_cache_ = arr[arr.length - 1];

                // pass it to the callback
                return callback(session_key_cache_);
            });
        },

        /**
         * Give the website language (specific to D2N/Hordes). Return 'en' by
         * default.
         * @return string The language of the current page ('en' / 'fr')
         * @return null if no corresponding language can be found
         */
        get_website_language: function()
        {
            var hostname = window.location.hostname;

            if (JS.is_defined(hostname) &&
                JS.is_defined(websites_language_[hostname])) {
                return websites_language_[hostname];
            }

            return null;
        },

        /**
         * Call the given callback with the number of AP (Action Points)
         * @param callback callback The function to be called
         */
        get_number_of_ap: function(callback)
        {
            JS.wait_for_selector('#movesCounter > div:nth-child(1)', function(node) {
                var ap = parseInt(node.textContent.split('/')[0]);
                callback(ap);
            });
        },

        /**
         * Call the given callback with the number of CP (Construction Points).
         * @param callback callback The function to be called, pass null if the
         * player doesn't have a CP div (it means he/she's not a Technician)
         */
        get_number_of_cp: function(callback)
        {
            JS.wait_for_selector('#movesCounter > div:nth-child(2)', function(node) {
                var cp = parseInt(node.textContent.split('/')[0]);
                callback(cp);
            }, 1, function onNotfound() {
                callback(null);
            });
        },

        /**
         * Call the given callback with the total number of AP + CP.
         * @param callback callback The function to be called
         */
        get_number_of_ap_cp: function(callback)
        {
            D2N.get_number_of_ap(function(ap) {
                D2N.get_number_of_cp(function(cp) {
                    var total = ap;
                    if (typeof cp === 'number') {
                        total += cp;
                    }
                    callback(total);
                });
            });
        },

        /**
         * Check if the user is outside and camping.
         * @return boolean true if the user is outside and camping, otherwise false
         */
        is_camping: function()
        {
            return D2N.is_outside() &&
                document.getElementsByClassName('left').length < 1;
        },

        /**
         * Add custom events on the interface:
         * - to watch when the gamebody is reloaded: 'd2n_gamebody_reload'
         * - to watch the number of AP: 'd2n_apchange'
         */
        add_custom_events: function()
        {
            add_gamebody_reload_event();
            add_ap_change_event();
            add_forum_topic_event();
        },

        /**
         * Check if on Die2Nite.
         * @return boolean true if on Die2Nite, else false
         */
        is_on_die2nite: function() {
            return window.location.hostname === 'www.die2nite.com';
        },

        /**
         * Check if on Hordes.
         * @return boolean true if on Hordes, else false
         */
        is_on_hordes: function() {
            return window.location.hostname === 'www.hordes.fr';
        },

        /**
         * Check if on Zombinoia.
         * @return boolean true if on Zombinoia, else false
         */
        is_on_zombinoia: function()
        {
            return window.location.hostname === 'www.zombinoia.com';
        },

        /**
         * Check if on Dieverdammten.
         * @return boolean true if on Dieverdammten, else false
         */
        is_on_dieverdammten: function()
        {
            return window.location.hostname === 'www.dieverdammten.de';
        },

        /**
         * Check if on one of the 4 game websites.
         * @return boolean true if on one of the game websites, else false
         */
        is_on_game_website: function()
        {
            return D2N.is_on_die2nite() ||
                D2N.is_on_hordes() ||
                D2N.is_on_zombinoia() ||
                D2N.is_on_dieverdammten();
        },

        /**
         * Get an external tool api key and pass it to the given callback
         * @param integer directory_id The external tool id
         * @param Function callback The callback to pass the api key
         */
        get_api_key: function(directory_id, callback_success, callback_failure)
        {
            // Fetch the session key
            D2N.get_session_key(function(sk) {
                JS.network_request('GET', '/disclaimer?id=' + directory_id + ';sk=' + sk, null, null,
                    function on_success(data, context) {
                        var match = data.match(/<input type="hidden" name="key" value="([a-f0-9]{38,39})"\/>/);
                        if (JS.is_defined(match) && match.length === 2) {
                            callback_success(match[1]);
                        } else {
                            callback_failure();
                        }
                    },
                    function onfailure() {
                        callback_failure();
                    }
                );
            });
        },

        /**
         * Remove a player action (in house or outside).
         * @param string/RegExp pattern The action name
         */
        remove_player_action: function(pattern)
        {
            // if not at home or outside (the two only places where a player
            // can use an object), abort
            if (!(D2N.is_on_page_in_city('home') || D2N.is_outside())) {
                return;
            }

            // else list all the possible objects usable by the player
            JS.wait_for_selector_all('a.toolAction > span > strong', function(nodes) {
                nodes.forEach(function(node) {
                    // Skip the node if not a 'strong' element
                    if (node.nodeName !== 'STRONG') {
                        return;
                    }

                    // Hide the node if matching the pattern
                    if ((typeof pattern === "string" && node.textContent === pattern) ||
                        (pattern instanceof RegExp && pattern.test(node.textContent))) {

                        var action = node.parentNode.parentNode;
                        action.style.display = 'none';
                    }
                });
            }, 5);
        },

        /**
         * Redirect to a citizen soul.
         * @param integer citizen_id
         * @param string random (optional) A random string to be appended
         */
        redirect_to_citizen_soul: function(citizen_id, random)
        {
            D2N.get_session_key(function(session_key) {
                var url = '/#ghost/city?go=ghost/user?uid=' + citizen_id + ';sk=' + session_key;
                if (typeof random === 'string' && random.length > 0) {
                    url += '?' + random;
                }
                JS.redirect(url);
            });
        },

        /**
         * Display a notification in the native D2N way.
         * @param DOMElement el The element to insert in the notification. If a
         * string is given, it is wrapped into a simple div.
         */
        notification: function(new_element)
        {
            var el;

            // Wrapped the new element if needed
            if (typeof new_element === 'string') {
                el = JS.jsonToDOM(['div', {}, new_element], document);
            } else {
                el = new_element;
            }

            // Get notification div
            var notif = document.getElementById('notificationText');

            // Empty it
            JS.delete_all_children(notif);

            // Add the new content
            notif.appendChild(el);

            // Get the notification container
            var notif_container = document.getElementById('notification');

            // Scroll to the top
            scroll(0, 0);

            // Display the notification
            notif_container.classList.add('showNotif');
        },

        /**
         * Show an empty notification.
         */
        show_empty_notification: function()
        {
            document.getElementById('notification').classList.add('showNotif');
        },

        /**
         * Hide empty notification.
         */
        hide_empty_notification: function()
        {
            document.getElementById('notification').classList.remove('showNotif');
        }

    };

})();

/******************************************************************************
 *                                                                            *
 *  Die2Nite Enhancer class                                                   *
 *                                                                            *
 ******************************************************************************/

var D2NE = (function() {

/*
 * private:
 */

    var RESTRICTED_MODE_KEY = 'restricted_mode';

    /**
     * The different module types (the order matters).
     */
    var MODULE_TYPES = [
        'BUSINESS_LOGIC', // Used by business logic modules
        'CONTAINER', // Used by the containers modules
        'INTERFACE_ENHANCEMENT', // Used to customise the interface
        'EXTERNAL_TOOL' // Used to synchronise with external tools
    ];

    /**
     * The different module property categories (the order matters).
     */
    var MODULE_PROPERTY_CATEGORIES = [
        'GENERAL',
        'BANK',
        'CONSTRUCTION',
        'SOUL',
        'OUTSIDE',
        'EXTERNAL_TOOL',
        'FORUM',
        'INTERFACE'
    ];

    function configure_module_class()
    {
        // Define the types
        MODULE_TYPES.forEach(function(type) {
            Module.add_type(type);
        });

        // The types will be loaded in this order
        Module.set_type_loading_order(MODULE_TYPES);

        // Define the property categories
        MODULE_PROPERTY_CATEGORIES.forEach(function(property_category) {
            Module.add_property_category(property_category);
        });

        // Define the property categories order
        Module.set_property_category_priority_order(MODULE_PROPERTY_CATEGORIES);
    }


    function configure_storage_class()
    {
        // Set storage prefix
        Storage.set_key_prefix('extensions.d2ne.');
    }

    function configure_internationalisation_class()
    {
        // Set default language
        I18N.set_language(D2N.get_website_language());
    }

    /**
     * Initialise every modules.
     */
    function initialise_modules()
    {
        Module.init();
    }

    /**
     * Send the 'all_modules_loaded' if needed.
     */
    function emit_all_modules_loaded_event_if_needed(processed_modules, total_modules)
    {
        if (processed_modules >= total_modules) {
            // Dispatch an event when all the modules are loaded
            JS.dispatch_event('d2ne_all_modules_loaded');
        }
    }

    /**
     * Load every enabled modules.
     */
    function load_modules()
    {
        var processed_modules = 0;
        var total_modules = Module.count();

        // For each module
        Module.iterate_in_priority_order(function(module) {
            // Load it only if it is enabled
            if (module.is_enabled()) {

                // If the module has a 'load' method, call it and provide
                // 'module' as the context to be able to reach its private
                // members and methods via 'this'
                if (typeof module.actions.load !== 'undefined') {
                    module.actions.load.call(module);
                }
            }
            emit_all_modules_loaded_event_if_needed((processed_modules += 1), total_modules);
        });
    }



/*
 * public:
 */

    return {

        /**
         * Initialise the script.
         */
        init: function()
        {
            configure_module_class();
            configure_storage_class();
            configure_internationalisation_class();

            // Will be executed once all the modules will be loaded
            document.addEventListener('d2ne_all_modules_loaded', function() {
                D2N.is_logged(function(is_logged) { if (is_logged) {
                    D2N.add_custom_events();
                }});
            });

            initialise_modules();
            load_modules(); // The modules are loaded here
        },

        /**
         * Set the restricted mode.
         * @param boolean value true if enabled, false otherwise
         */
        set_restricted_mode: function(value)
        {
            Storage.set(RESTRICTED_MODE_KEY, value);
        },

        /**
         * Check if the restricted mode is enabled.
         * @return boolean true if the mode is enabled.
         */
        is_restricted_mode: function()
        {
            var v = Storage.get(RESTRICTED_MODE_KEY) || 'true';
            return v === 'true';
        }

    };

})();

/******************************************************************************
 *                                                                            *
 *  I18N class                                                                *
 *                                                                            *
 ******************************************************************************/

function I18N()
{
}


/*************
 * Constants *
 *************/

/**
 * Languages constants, you should use them when adding or retrieving
 * internationalised strings.
 */

I18N.LANG = {};
I18N.LANG.EN = 'en';
I18N.LANG.FR = 'fr';
I18N.LANG.ES = 'es';
I18N.LANG.DE = 'de';


/********************************
 * Static methods and variables *
 ********************************/

/**
 * This language will be provided if the requested language is not available.
 */
I18N.default_language_ = I18N.LANG.EN;

/**
 * This language will be used when the user does a get request without
 * specifying the language to fetch.
 */
I18N.language_ = I18N.default_language;

/**
 * Store all the keys of the extension. Use the accessors  `I18N.add` and
 * `I18N.get` to register (a) new key(s) or get key.
 */
I18N.strings_ = {};

/**
 * Set the language that will be used when strings are requested.
 * @param string language The default language
 */
I18N.set_language = function(language)
{
    I18N.language_ = language;
};

/**
 * Add some strings to the strings_ object. The `keys` should be of the following
 * form:
 *
 *     var i18n = {};
 *     i18n[I18N.LANG.EN] = {};
 *     i18n[I18N.LANG.EN]['say_hello'] = 'Hello';
 *     i18n[I18N.LANG.FR] = {};
 *     i18n[I18N.LANG.FR]['say_hello'] = 'Bonjour';
 *     i18n[I18N.LANG.ES] = {};
 *     i18n[I18N.LANG.ES]['say_hello'] = 'Hola';
 *     i18n[I18N.LANG.DE] = {};
 *     i18n[I18N.LANG.DE]['say_hello'] = 'Hallo';
 *
 *     I18N.set(i18n);
 */
I18N.set = function(new_strings)
{
    JS.merge(I18N.strings_, new_strings);
};

/**
 * Retrieve a internationalised string.
 * @param string key The key to fetch
 * @param string lang (optional) The lang to fetch (use the class const)
 * @return string The internationalised string
 * @return null If an error occurs (unknown language/key)
 */
I18N.get = function(key, lang)
{
    lang = lang || I18N.language_;

    var languages = [lang, I18N.default_language_];

    for (var i = 0, max = languages.length; i < max; i += 1) {
        var language = languages[i];

        if (typeof I18N.strings_[language] !== 'undefined') {
            if (typeof I18N.strings_[language][key] === 'string') {
                return I18N.strings_[language][key];
            }
        }
    }

    return null;
};

/******************************************************************************
 *                                                                            *
 *  JavaScript helpers class                                                  *
 *                                                                            *
 ******************************************************************************/

var JS = (function() {

/*
 * private:
 */

    /**
     * Time to wait between two self-call of `wait_for_*` functions.
     */
    var wait_for_retry_time_ = 250; //ms

    /**
     * Maximum number of retry for the `wait_for_*` functions.
     */
    var wait_for_max_retry_ = 10;

    /**
     * Store the Safari callbacks.
     */
    var safari_callbacks_ = null;

    /**
     * Safely insert code through JSON.
     * @link https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/DOM_Building_and_HTML_Insertion
     */
    var jsonToDOM = function(xml, doc, nodes)
    {
        function namespace(name) {
            var m = /^(?:(.*):)?(.*)$/.exec(name);
            return [jsonToDOM.namespaces[m[1]], m[2]];
        }

        function tag(name, attr) {
            if (Array.isArray(name)) {
                var frag = doc.createDocumentFragment();
                Array.forEach(arguments, function (arg) {
                    if (!Array.isArray(arg[0])) {
                        frag.appendChild(tag.apply(null, arg));
                    } else {
                        arg.forEach(function (arg) {
                            frag.appendChild(tag.apply(null, arg));
                        });
                    }
                });
                return frag;
            }

            var args = Array.prototype.slice.call(arguments, 2);
            var vals = namespace(name);
            var elem = doc.createElementNS(vals[0] || jsonToDOM.defaultNamespace, vals[1]);

            for (var key in attr) {
                if (attr.hasOwnProperty(key)) {
                    var val = attr[key];
                    if (nodes && key === "key") {
                        nodes[val] = elem;
                    }

                    vals = namespace(key);
                    if (typeof val === "function") {
                        elem.addEventListener(key.replace(/^on/, ""), val, false);
                    } else {
                        elem.setAttributeNS(vals[0] || "", vals[1], val);
                    }
                }
            }
            args.forEach(function(e) {
                elem.appendChild(typeof e === "object" ? tag.apply(null, e) :
                                 e instanceof Node    ? e : doc.createTextNode(e));
            });
            return elem;
        }
        return tag.apply(null, xml);
    };
    jsonToDOM.namespaces = {
        html: "http://www.w3.org/1999/xhtml",
        xul: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
    };
    jsonToDOM.defaultNamespace = jsonToDOM.namespaces.html;

    var keydown_event_ = {
        previous_keycode: null,
        previous_keycode_timestamp: 0, // ms
        already_bind: false
    };

    /**
     * Generic wait_for_ function. See wait_for_id for the purpose of this
     * function.
     * @param function search A closure returning the searched element
     * @param function is_found A closure taking the searched element and
     * returning true or false whether it was found or not
     * @param function callback The function to call if the element was found
     * @param integer max The maximum number of retry if the first search fails
     * @param function not_found_callback The function to call if the element
     * was not found
     */
    var wait_for_ = function(search, is_found, callback, max, not_found_callback) {
            max = (typeof max === "number") ? max : wait_for_max_retry_;

            // try to find it
            var el = search();
            if (is_found(el)) {
                return callback(el);
            }

            // if max is defined and is reached, stop research
            if (max <= 0) {
                // if a callback has been given, call it
                if (JS.is_defined(not_found_callback) && typeof not_found_callback === 'function') {
                    not_found_callback();
                }
            } else { // else try again
                setTimeout(function() {
                    wait_for_(search, is_found, callback, max - 1, not_found_callback);
                }, wait_for_retry_time_);
            }
    };

/*
 * public:
 */

    return {

        /**
         * Execute an asynchronous network request.
         * @param string method POST, GET...
         * @param string urn path
         * @param string data query string
         * @param JSON headers
         * @param callback on_success in case of success
         * @param callback on_failure in case of failure
         */
        network_request: function(method, urn, data, headers, on_success, on_failure) {

            var uri = JS.form_uri(null, urn);

            // Google Chrome script / GreaseMonkey
            if (typeof GM_xmlhttpRequest !== 'undefined') {
                return new GM_xmlhttpRequest({
                    method: method,
                    url: uri,
                    data: '' + data,
                    headers: headers,
                    onload: function(r) { on_success(r.responseText); },
                    onerror: function(r) { on_failure(); }
                });
            }

            // Safari needs to dispatch the request to the global page if the
            // request is Cross Domain
            if (typeof safari !== 'undefined' && JS.is_cross_domain(uri)) {
                // Only register the listener once
                if (safari_callbacks_ === null) {
                    safari.self.addEventListener('message', function(event) {
                        var request_id = event.message.request_id;

                        // if the callback for the given URI can't be found, abort
                        if (!(request_id in safari_callbacks_)) {
                            return;
                        }

                        switch (event.name) {
                            case 'network_request_succeed':
                                safari_callbacks_[request_id].on_success(event.message.response_text);
                                break;

                            case 'network_request_failed':
                                safari_callbacks_[request_id].on_failure();
                                break;
                        }

                        // Delete the callback
                        safari_callbacks_[request_id] = null;
                        delete safari_callbacks_[request_id];
                    }, false);
                }

                var request_unique_id = +new Date() + Math.random() + uri;

                // Save callbacks to keep the context
                safari_callbacks_ = safari_callbacks_ || {};
                safari_callbacks_[request_unique_id] = {
                    on_success: on_success,
                    on_failure: on_failure
                };

                // Ask to the global page to do the request
                return safari.self.tab.dispatchMessage('do_network_request', {
                    method: method,
                    url: uri,
                    data: '' + data,
                    headers: headers,
                    request_id: request_unique_id
                });
            }

            // All other cases
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open(method, uri, true);
            for (var header in headers) {
                if (headers.hasOwnProperty(header)) {
                    xmlhttp.setRequestHeader(header, headers[header]);
                }
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
                        return on_success(xmlhttp.responseText);
                    }
                    return on_failure();
                }
            };
            xmlhttp.send(data);
        },

        /**
         * Check if a given variable is defined and is not null.
         * @param mixed variable The variable to check
         * @return bool true if the variable is defined and is not null, otherwise
         * false
         */
        is_defined: function(variable)
        {
            return (typeof variable !== 'undefined' && variable !== null);
        },

        /**
         * Reset the keydown_event_ object. Forget about the last key stroke.
         */
        reset_previous_keycode: function()
        {
            keydown_event_.previous_keycode = null;
            keydown_event_.previous_keycode_timestamp = 0;
        },

        /**
         * Catch a keydown event (abort if the cursor is in an input field). Call
         * the callback `callback` with the current keycode and the last one (if it
         * exists).
         * @param callback callback The function to call, should look like the
         * following prototype: `function(keycode, previous_keycode){};`.
         * previous_keycode will be null if it doesn't exists.
         * @param integer time_limit The maximum amount of time (in ms) to wait
         * between two binds.
         */
        keydown_event: function(callback, time_limit)
        {
            // Update/set the callback
            keydown_event_.callback = callback;

            // defaut 1000ms between two key strokes
            keydown_event_.time_limit = (typeof time_limit === "number") ? time_limit : 1000;

            // Ensure it can only be bound once (though the callback can still
            // be updated)
            if (keydown_event_.already_bind) {
                return;
            }
            keydown_event_.already_bind = true;

            document.addEventListener('keydown', function(event) {
                // Cancel event if the cursor is in an input field or textarea
                if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA') {
                    return;
                }

                var current_timestamp = +new Date(); // ms

                // Cancel previous keycode if the elapsed time is too long
                // between the last two keystrokes
                if (current_timestamp - keydown_event_.previous_keycode_timestamp > keydown_event_.time_limit) {
                    JS.reset_previous_keycode();
                }

                // Invoke callback
                keydown_event_.callback(event.keyCode, keydown_event_.previous_keycode);

                // Save keycode
                keydown_event_.previous_keycode = event.keyCode;
                keydown_event_.previous_keycode_timestamp = current_timestamp;
            }, false);
        },

        /**
         * Inject CSS code in the page context.
         * @param string code The CSS code to inject
         */
        injectCSS: function(code)
        {
            var css = document.createElement('style');
            css.setAttribute('type', 'text/css');
            css.textContent = code;

            JS.wait_for_tag('head', function(nodes) {
                nodes[0].appendChild(css);
            });
        },

        /**
         * Inject and execute JavaScript code in the page context.
         * @link http://wiki.greasespot.net/Content_Script_Injection
         * @param string/callback source The JS code to inject
         */
        injectJS: function(source)
        {
            // Check for function input.
            if ('function' === typeof source) {
                // Execute this function with no arguments, by adding parentheses.
                // One set around the function, required for valid syntax, and a
                // second empty set calls the surrounded function.
                source = '(' + source + ')();';
            }

            // Create a script node holding this  source code.
            var script = document.createElement('script');
            script.setAttribute('type', 'application/javascript');
            script.textContent = source;

            // Insert the script node into the page, so it will run, and immediately
            // remove it to clean up.
            JS.wait_for_selector('html > body', function(node) {
                node.appendChild(script);
                node.removeChild(script);
            });
        },

        /**
         * Remove a DOM node.
         * @link http://stackoverflow.com/a/14782/1071486
         * @param DOMNode node The DOM node to delete
         */
        remove_DOM_node: function(node)
        {
            if (JS.is_defined(node)) {
                node.parentNode.removeChild(node);
            }
        },

        /*
         * Recursively merge properties of 2 objects. The first object properties
         * will be erased by the second ones.
         * @link http://stackoverflow.com/a/383245/1071486
         * @param Object obj1 The first object which will receive the merge
         * @param Object obj2 The second object to merge
         * @return Object The first object
         */
        merge: function(obj1, obj2) {
            for (var p in obj2) {
                if (obj2.hasOwnProperty(p)) {
                    try {
                        // Property in destination object set; update its value.
                        if (obj2[p].constructor === Object) {
                            obj1[p] = JS.merge(obj1[p], obj2[p]);
                        } else {
                            obj1[p] = obj2[p];
                        }
                    } catch(e) {
                        // Property in destination object not set; create it and set
                        // its value.
                        obj1[p] = obj2[p];
                    }
                }
            }

            return obj1;
        },

        /**
         * Execute a callback when a node with the given $id is found.
         * @param string id The id to search
         * @param callback callback The function to call when a result is found
         * @param integer max The maximum number of try
         * @param callback not_found_callback The function called if the element
         *                                    isn't found
         */
        wait_for_id: function(id, callback, max, not_found_callback)
        {
            return wait_for_(function search() {
                    return document.getElementById(id);
                }, function is_found(result) {
                    return JS.is_defined(result);
                }, callback, max, not_found_callback);
        },

        /**
         * Execute a callback with an array containing all the nodes matching the
         * given class.
         * @param string class The class to search
         * @param callback callback The function to call when a result is found
         * @param integer max The maximum number of try
         * @param callback not_found_callback The function called if the element
         *                                    isn't found
         */
        wait_for_class: function(class_name, callback, max, not_found_callback)
        {
            return wait_for_(function search() {
                    return JS.nodelist_to_array(document.getElementsByClassName(class_name));
                }, function is_found(result) {
                    return JS.is_defined(result) && result.length > 0;
                }, callback, max, not_found_callback);
        },

        /**
         * Execute a callback with an array containing all the nodes matching the
         * given tag.
         * @param string tag The tag to search
         * @param callback callback The function to call when a result is found
         * @param integer max The maximum number of try
         * @param callback not_found_callback The function called if the element
         *                                    isn't found
         */
        wait_for_tag: function(tag, callback, max, not_found_callback)
        {
            return wait_for_(function search() {
                    return JS.nodelist_to_array(document.getElementsByTagName(tag));
                }, function is_found(result) {
                    return JS.is_defined(result) && result.length > 0;
                }, callback, max, not_found_callback);
        },

        /**
         * Execute a callback with the first node matching the given selector.
         * @param string selector The selector to execute
         * @param callback callback The function to call when a result is found
         * @param integer max The maximum number of try
         * @param callback not_found_callback The function called if the element
         *                                    isn't found
         */
        wait_for_selector: function(selector, callback, max, not_found_callback)
        {
            return wait_for_(function search() {
                    return document.querySelector(selector);
                }, function is_found(result) {
                    return JS.is_defined(result);
                }, callback, max, not_found_callback);
        },

        /**
         * Execute a callback with an array containing all the nodes matching the
         * given selector.
         * @param string selector The selector to execute
         * @param callback callback The function to call when a result is found
         * @param integer max The maximum number of try
         * @param callback not_found_callback The function called if the element
         *                                    isn't found
         */
        wait_for_selector_all: function(selector, callback, max, not_found_callback)
        {
            return wait_for_(function search() {
                    return JS.nodelist_to_array(document.querySelectorAll(selector));
                }, function is_found(result) {
                    return JS.is_defined(result) && result.length > 0;
                }, callback, max, not_found_callback);
        },

        /**
         * Redirect to the given urn.
         * @param string urn The URN to redirect to
         */
        redirect: function(urn)
        {
            window.location.href = JS.form_uri(null, urn);
        },

        /**
         * Reload the current page.
         */
        reload: function()
        {
            location.reload();
        },

        /**
         * Instanciate a Regex object and test to see if the given string matches
         * it. Useful when the Regex should be constructed from a string.
         * @param string/RegExp The regex to match the string with
         * @param string The string to test
         * @return bool true if the regex matches the string, false otherwise
         */
        regex_test: function(regex, string)
        {
            var r;

            if (regex instanceof RegExp) {
                r = regex;
            } else {
                r = new RegExp(regex);
            }

            return r.test(string);
        },

        /**
         * Iterate over an object and pass the key/value to a callback.
         */
        each: function(object, callback)
        {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    callback(key, object[key]);
                }
            }
        },

        /**
         * Dispatch a custom event on the desired DOM Node
         * @param string key The event key
         * @param Object detail (optional) The event details
         * @param DOMNode node (optional) The node to dispatch the event on
         */
        dispatch_event: function(key, detail, node)
        {
            detail = detail || null;
            node = node || document;
            var bubbles = true;
            var cancelable = true;

            var event;

            if (typeof CustomEvent === "function") {
                event = new CustomEvent(key, {
                    detail: detail,
                    bubbles: bubbles,
                    cancelable: cancelable
                });
            } else { // deprecated
                event = document.createEvent("CustomEvent");
                event.initCustomEvent(key, bubbles, cancelable, detail);
            }

            node.dispatchEvent(event);
        },

        /**
         * Assign an attribute to the current object. This function is only
         * relevant if you call it by specifying a `this` context (with bind(),
         * call() or apply()).
         * @param string key The specific key where to assign the value
         * @param string value The value to store
         */
        assign_attribute: function(key, value)
        {
            this[key] = value;
        },

        /**
         * Insert a DOM node after another.
         * @link http://stackoverflow.com/a/4793630/1071486
         * @param Node reference_node
         * @param Node new_node
         */
        insert_after: function(reference_node, new_node)
        {
            reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
        },

        /**
         * Parse a XML string.
         * @param string xml The XML to parse
         */
        parse_xml: function(xml)
        {
            var parser = new DOMParser();

            return parser.parseFromString(xml, "text/xml");
        },

        /**
         * Convert a nodelist to an array.
         * @link http://stackoverflow.com/a/2735133/1071486
         * @param Object obj The object to convert.
         */
        nodelist_to_array: function(obj) {
            var array = [];
            for (var i = 0, max = obj.length; i < max; i++) {
                array[i] = obj[i];
            }
            return array;
        },

        /**
         * Form the complete URI from the URL and the URN.
         * @param string url Can be null, in this case fetched from
         * window.location
         * @param string urn The URN
         * @return string The URN prefixed by the URL (if needed)
         */
        form_uri: function(url, urn)
        {
            // if the URN is relative, prefix it with the URL
            if (/^\/[^\/]/.test(urn)) {
                url = url || window.location.protocol + '//' + window.location.host;
                return url + urn;
            }

            // else leave it as is
            return urn;
        },

        /**
         * Check if the given URI is another domain.
         * @param string uri The URI to check.
         * @return boolean true if on a different domain, else false
         */
        is_cross_domain: function(uri)
        {
            var regex = "^(?:/.+|" + window.location.protocol + "//" + window.location.host + ")";
            return !JS.regex_test(regex, uri);
        },

        /**
         * Delete all the children of the given node.
         * @link http://stackoverflow.com/a/3955238/1071486
         * @param DOMElement node
         */
        delete_all_children: function(node)
        {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        },

        jsonToDOM: jsonToDOM

    };

})();

/******************************************************************************
 *                                                                            *
 *  Module class                                                              *
 *                                                                            *
 ******************************************************************************/

/**
 * Module class constructor.
 * @param Object param The parameters to construct the module
 * @return Module The newly created module
 */
function Module(param)
{
    var f = JS.assign_attribute.bind(this);

    // Copy all the param into this
    JS.each(param, function(key, value) {
        f(key, value);
    });

    // Fill the type with the appropriate const if not defined
    this.type = (typeof param.type === 'undefined') ? Module.TYPE.UNKNOWN : param.type;

    // Fetch module properties from the Storage
    this.fetch_properties();
}


/******************
 * Public methods *
 ******************/

/**
 * Return the storage key for the module.
 * @return string The storage key
 */
Module.prototype.get_storage_key = function()
{
    return 'module.' + this.name;
};

/**
 * Disable the module.
 */
Module.prototype.disable = function()
{
    this.properties.enabled = false;
    this.save_properties();
};

/**
 * Enable the module.
 */
Module.prototype.enable = function()
{
    this.properties.enabled = true;
    this.save_properties();
};

/**
 * Toggle the module.
 */
Module.prototype.toggle = function()
{
    this.properties.enabled = !this.properties.enabled;
    this.save_properties();
};

/**
 * Check if the module is enabled.
 * @return bool true if the module is enabled, false otherwise
 */
Module.prototype.is_enabled = function()
{
    return !!this.properties.enabled;
};

/**
 * Save the module properties in the Storage.
 */
Module.prototype.save_properties = function()
{
    Storage.set(this.get_storage_key(), JSON.stringify(this.properties));
};


/**
 * Fetch the properties from the Storage. Update the module with the fetched
 * ones.
 */
Module.prototype.fetch_properties = function()
{
    // Fetch its properties from the Storage
    var storage_properties = JSON.parse(Storage.get(this.get_storage_key()));

    // Merge the storage properties into the default properties
    JS.merge(this.properties, storage_properties);
};


/*************
 * Constants *
 *************/

/**
 * The different property types.
 */

Module.PROPERTY = {};
Module.PROPERTY.BOOLEAN = 0;


/********************************
 * Static methods and variables *
 ********************************/

/**
 * Stores all the registered modules, before they are initialised. Never access
 * it directly.
*/
Module.registered_ = [];

/**
 * Stores all the modules. Never access it directly.
 */
Module.modules_ = {};

/**
 * Indexes all the modules by type. Never access it directly.
 */
Module.modules_by_type_ = {};

/**
 * The different module types. You can read this variable directly.
 */
Module.TYPE = {};
Module.TYPE.UNKNOWN_TYPE = 1;

/**
 * The order in which the module types should be browsed.
 */
Module.TYPE_LOADING_ORDER = [];

/**
 * The different properties categories (optional).
 */
Module.PROPERTY_CATEGORY = {};
Module.PROPERTY_CATEGORY.UNKNOWN_CATEGORY = 1;

/**
 * The property categories priority order (optional).
 */
Module.PROPERTY_CATEGORY_PRIORITY_ORDER = [];

/**
 * Register a function returning a configuration object which will be used to
 * instanciate a new module.
 *
 *         Module.add(function() {
 *             var private_var;
 *
 *             return {
 *                 param1: 'hello',
 *                 param2: 'world'
 *             };
 *         });
 *
 * @param Function param_constructor A function returning the configuration object
 */
Module.register = function(param_constructor)
{
    Module.registered_.push(param_constructor);
};

/**
 * Allocate and initialise all the modules
 */
Module.init = function()
{
    // Loop to initialise any registered module
    Module.registered_.forEach(function(param_constructor) {
        var param = param_constructor();

        // Check if the module can run in the current environment / website
        // language
        if (typeof param === 'undefined' ||
            typeof param.actions === 'undefined' ||
            typeof param.actions.can_run !== 'function' ||
            !param.actions.can_run()) {

            return;
        }

        // Create the module
        var module = new Module(param);

        // Add module to the list
        Module.modules_[module.name] = module;

        // Insert it in the type index
        if (typeof Module.modules_by_type_[module.type] === 'undefined') {
            Module.modules_by_type_[module.type] = [];
        }
        Module.modules_by_type_[module.type].push(module);

        // Call the 'init' method if any
        if (typeof module.actions.init === 'function') {
            module.actions.init.call(module);
        }
    });

    // Empty the registered modules list
    Module.registered_ = null;
};

/**
 * Return the number of modules.
 * @return integer The number of modules
 */
Module.count = function()
{
    return Object.keys(Module.modules_).length;
};

/**
 * Return the number of modules for a specific type.
 * @param Const type The module type
 * @return integer The number of module
 */
Module.count_on_type = function(type)
{
    return Module.modules_by_type_[type].length;
};

/**
 * Iterate over all the modules.
 * @param Function callback The function to call, it takes one parameter: a
 *                          module.
 */
Module.iterate = function(callback)
{
    var modules = Module.modules_;

    JS.each(modules, function(key, value) {
        callback(value);
    });
};

/**
 * Iterate over a specific module type.
 * @param Const type The module type
 * @param Function callback The function to call, it takes one parameter: a
 *                          module.
 */
Module.iterate_on_type = function(type, callback)
{

    // if the type is not defined, abort
    if (typeof Module.modules_by_type_[type] === 'undefined') {
        return;
    }

    Module.modules_by_type_[type].forEach(function(module) {
        callback(module);
    });
};

/**
 * Iterate over all the modules in the priority order.
 * @param Function callback The function to call, it takes one parameter: a
 *                          module.
 */
Module.iterate_in_priority_order = function(callback)
{
    Module.TYPE_LOADING_ORDER.forEach(function(type) {
        Module.iterate_on_type(Module.TYPE[type], callback);
    });
};

/**
 * Return a specific module from its name.
 * @param string name The module name
 * @return Module The desired module
 * @return null if the module is not found
 */
Module.get = function(name)
{
    if (Module.modules_.hasOwnProperty(name)) {
        return Module.modules_[name];
    }
    return null;
};

/**
 * Define a new module type.
 * @param string type The new type
 */
Module.add_type = function(type)
{
    var biggest = 0;

    // Obtain a unique type id by fetching the biggest id and adding one;
    for (var key in Module.TYPE) {
        if (Module.TYPE.hasOwnProperty(key)) {
            biggest = (Module.TYPE[key] > biggest) ?
                Module.TYPE[key] : biggest;
        }
    }

    Module.TYPE[type] = biggest + 1;
};

/**
 * Define a new types priority order.
 * @param string[] An array of module type name
 */
Module.set_type_loading_order = function(new_order)
{
    Module.TYPE_LOADING_ORDER = new_order;
};

/**
 * Define a new property category.
 * @param string property_category The new category
 */
Module.add_property_category = function(property_category)
{
    var biggest = 0;

    // Obtain a unique type id by fetching the biggest id and adding one;
    for (var key in Module.PROPERTY_CATEGORY) {
        if (Module.PROPERTY_CATEGORY.hasOwnProperty(key)) {
            biggest = (Module.PROPERTY_CATEGORY[key] > biggest) ?
                Module.PROPERTY_CATEGORY[key] : biggest;
        }
    }

    Module.PROPERTY_CATEGORY[property_category] = biggest + 1;
};

/**
 * Define a new property categories priority order.
 * @param string[] An array of property categories name
 */
Module.set_property_category_priority_order = function(new_order)
{
    Module.PROPERTY_CATEGORY_PRIORITY_ORDER = new_order;
};

/******************************************************************************
 *                                                                            *
 *  Storage class                                                       *
 *                                                                            *
 ******************************************************************************/

function Storage()
{
}


/*************
 * Constants *
 *************/


/********************************
 * Static methods and variables *
 ********************************/

/*
 * Will prefix the key every time it is used. Never modify this value directly.
 */
Storage.key_prefix = '';

/**
 * Define a new prefix. A string is mandatory, otherwise the setter aborts.
 * @param string new_prefix The new prefix
 */
Storage.set_key_prefix = function(new_prefix)
{
    if (typeof new_prefix !== "string") {
        return;
    }
    Storage.key_prefix = new_prefix;
};

/**
 * Set a value in the storage.
 * @param string key The key to insert or distort
 * @param mixed value The value to put in
 */
Storage.set = function(key, value)
{
    localStorage[Storage.key_prefix + key] = value + ''; // explicit string cast
};

/**
 * Get a value from the storage.
 * @param string key The key to fetch
 * @return string The related value
 * @return null if the key isn't found
 */
Storage.get = function(key)
{
    var ret = localStorage[Storage.key_prefix + key];

    return (typeof ret === 'undefined') ? null : ret;
};

Module.register(function() {

    var MODULE_NAME = 'anti_abuse_counter';

    /******************
     * Module context *
     ******************/

    var ANTI_ABUSE_NOTIFIER_ID = 'd2ne_abuse_counter';

    var _time_interval = null;

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Prevent bank abuse';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Display a an anti-abuse counter on the bank page';
        i18n[I18N.LANG.EN][MODULE_NAME + '_label'] = 'Anti-abuse counter:';
        i18n[I18N.LANG.EN][MODULE_NAME + '_reset_in'] = 'reset in';
        i18n[I18N.LANG.EN][MODULE_NAME + '_prevent'] = 'Please wait until the end of the countdown before to try again.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Activer le compteur anti-abus';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Sur la page de la banque, affiche un compteur pour prévenir les abus et empêche de prendre plus de 5 objets toutes les 15 minutes.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_label'] = 'Compteur anti-abus :';
        i18n[I18N.LANG.FR][MODULE_NAME + '_reset_in'] = 'reset dans';
        i18n[I18N.LANG.FR][MODULE_NAME + '_prevent'] = 'Il serait préférable d\'attendre la fin du décompte avant d\'essayer à nouveau.';


        I18N.set(i18n);
    }

    function get_notifier_div()
    {
        var current_time = Math.floor(+new Date() / 1000);
        var time_left = this.properties.end_of_abuse - current_time + 1;
        var hour_left = Math.floor(time_left / 60);
        var min_left = Math.floor(time_left % 60);

        return JS.jsonToDOM(["div", { "id": ANTI_ABUSE_NOTIFIER_ID, "class": "extractCpt" },
            ["img", { "src": "/gfx/icons/tag_1.gif" }],
            ' ' + I18N.get(MODULE_NAME + '_label') + ' ',
            ["strong", {},
                this.properties.attempt_left
            ],
            " (" + I18N.get(MODULE_NAME + '_reset_in') + ' ',
            ["strong", {},
                ((this.properties.end_of_abuse > 0) ? ('' + hour_left + ':' + ((min_left < 10) ? '0' : '') + min_left) : '∞')
            ],
            ")"
        ], document);
    }

    function refresh_notifier()
    {
        var div = document.getElementById(ANTI_ABUSE_NOTIFIER_ID);
        if (JS.is_defined(div)) {
            div.parentNode.replaceChild(get_notifier_div.call(this), div);
        }
    }

    function on_object_click(event)
    {
        // The click must occur on the object icon, the object number or the
        // link
        if (['IMG', 'SPAN', 'A'].indexOf(event.target.nodeName) < 0) {
            return;
        }
        if (this.properties.attempt_left < 1) {
            event.cancelBubble = true;
            event.stopPropagation();
            event.preventDefault();
            alert(I18N.get(MODULE_NAME + '_prevent'));
            return;
        }
        this.properties.attempt_left -= 1;
        if (this.properties.attempt_left < 0) {
            this.properties.attempt_left = 0;
        }
        this.properties.end_of_abuse = (+new Date() / 1000) + (15 * 60);
        this.save_properties();
        refresh_notifier.call(this);
    }

    function inject_click_listener()
    {
        // Add listener
        document.querySelector('.tools.stocks.cityInv').addEventListener('click', on_object_click.bind(this), true);
    }

    function on_each_second(event)
    {
        var current_time = Math.floor(+new Date() / 1000);
        if (current_time > this.properties.end_of_abuse) {
            this.properties.attempt_left = 5;
            this.properties.end_of_abuse = 0;
            this.save_properties();
        }
        refresh_notifier.call(this);
    }

    function inject_notifier()
    {
        // Add notifier
        JS.wait_for_selector('div.right', function(el) {
            el.insertBefore(get_notifier_div.call(this), el.firstChild);

            if (_time_interval === null) {
                _time_interval = setInterval(on_each_second.bind(this), 1000);
            }
        }.bind(this));
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.BANK,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '#' + ANTI_ABUSE_NOTIFIER_ID + ' {' +
                        'cursor: auto;' +
                    '}'
                );

                if (JS.is_defined(this.properties.attempt_left) !== true) {
                    this.properties.attempt_left = 5;
                }
                if (JS.is_defined(this.properties.end_of_abuse) !== true) {
                    this.properties.end_of_abuse = 0;
                }
                this.save_properties();

                document.addEventListener('d2n_gamebody_reload', function() {
                    if (!D2N.is_on_page_in_city('bank')) {
                        return;
                    }

                    if (JS.is_defined(document.getElementById(ANTI_ABUSE_NOTIFIER_ID))) {
                        return;
                    }

                    inject_notifier.call(this);
                    inject_click_listener.call(this);
                }.bind(this), false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'button';

    /******************
     * Module context *
     ******************/

    var D2NE_CONFIG_HASH = '#d2ne/configuration';

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_title'] = 'Die2Nite Enhancer';
        i18n[I18N.LANG.EN][MODULE_NAME + '_description'] = 'Die2Nite Enhancer allows you to enhance your game experience.';
        i18n[I18N.LANG.EN][MODULE_NAME + '_configuration_panel_button'] = 'Configuration Panel';
        i18n[I18N.LANG.EN][MODULE_NAME + '_contact_link'] = 'Contact the developer';
        i18n[I18N.LANG.EN][MODULE_NAME + '_support_link'] = 'Support the developer';
        i18n[I18N.LANG.EN][MODULE_NAME + '_bug_tracker_link'] = 'Bug tracker';
        i18n[I18N.LANG.EN][MODULE_NAME + '_license_link'] = 'License';
        i18n[I18N.LANG.EN][MODULE_NAME + '_version'] = 'Version';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_description'] = 'Die2Nite Enhancer vous permet d\'améliorer votre expérience de jeu.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_configuration_panel_button'] = 'Panneau de configuration';
        i18n[I18N.LANG.FR][MODULE_NAME + '_contact_link'] = 'Contacter le développeur';
        i18n[I18N.LANG.FR][MODULE_NAME + '_support_link'] = 'Supporter le développeur';
        i18n[I18N.LANG.FR][MODULE_NAME + '_bug_tracker_link'] = 'Bug tracker';
        i18n[I18N.LANG.FR][MODULE_NAME + '_license_link'] = 'License';
        i18n[I18N.LANG.FR][MODULE_NAME + '_version'] = 'Version';

        I18N.set(i18n);
    }

    function insert_button_style()
    {
        JS.injectCSS(
            '#sites {' +
                'z-index: 14;' +
            '}' +

            '#d2ne_button {' +
                'margin-top: -210px;' +
                'position: absolute;' +
                'margin-left: 43px;' +
                'z-index: 13;' +
                'background-color: #5c2b20;' +
                'border: 1px solid #000000;' +
                'max-width: 862px;' +
                'font-size: 0.9em;' +
                'line-height: 23px;' +
                'border: 1px solid #f0d79e;' +
                'outline: 1px solid black;' +
                'padding-left: 5px;' +
                'padding-right: 5px;' +
            '}' +

            '#d2ne_button > h1 {' +
                'height: auto;' +
                'font-size: 8pt;' +
                'text-transform: none;' +
                'font-variant: small-caps;' +
                'background: none;' +
                'cursor: help;' +
                'margin: 0;' +
                'padding: 0;' +
            '}' +
            '#d2ne_button:hover > h1 {' +
                'border-bottom: 1px solid #b37c4a;' +
                'margin-bottom: 5px;' +
            '}' +

            '#d2ne_button > h1 > span {' +
                'display: none;' +
            '}' +
            '#d2ne_button:hover > h1 > span {' +
                'display: inline;' +
            '}' +

            '#d2ne_button > div {' +
                'display: none;' +
                'width: 430px;' +
            '}' +
            '#d2ne_button:hover > div {' +
                'display: block;' +
            '}' +

            '#d2ne_button p {' +
                'margin: 0;' +
            '}' +

            '#d2ne_button ul {' +
                'margin: 0;' +
                'padding: 0;' +
                'list-style: none;' +
                'margin-bottom: 8px;' +
                'font-size: 13px;' +
            '}' +

            '#d2ne_button ul li {' +
                'margin: 0;' +
                'padding: 0;' +
            '}' +

            '#d2ne_button li img {' +
                'width: 16px;' +
                'height: 16px;' +
                'margin-right: 5px;' +
                'vertical-align: -11%;' +
            '}' +

            '#d2ne_button li a {' +
                'display: block;' +
                'width: 205px;' +
                'height: 19px;' +
                'overflow: hidden;' +
                'text-decoration: none;' +
            '}' +
            '#d2ne_button li a:hover {' +
                'background-color: #696486;' +
            '}' +

            '#d2ne_button li a span {' +
                'text-decoration: underline;' +
            '}' +

            '#d2ne_button a.button {' +
                'margin: 12px auto;' +
            '}'
        );
    }

    function insert_button_dom()
    {
        var button = JS.jsonToDOM(["div", { "id": "d2ne_button" },
            ["h1", {},
                ["img", { "src": "/gfx/forum/smiley/h_city_up.gif", "alt": "" }],
                ["span", {}, ' ' + I18N.get(MODULE_NAME + '_title')]
            ],

            ["div", {},
                ["p", {}, I18N.get(MODULE_NAME + '_description')],

                ["a", { class: "button", onclick: function() {
                    JS.dispatch_event('d2ne_load_configuration_panel');
                }}, I18N.get(MODULE_NAME + '_configuration_panel_button') ],

                ["ul", {},
                    ["li", {},
                        ["a", { href: 'mailto:aymeric@beaumet.me?Subject=[D2NE]%20' },
                            ["img", { src: '/gfx/icons/small_mail.gif' }],
                            ["span", {}, I18N.get(MODULE_NAME + '_contact_link')]
                        ]
                    ],
                    ["li", {},
                        ["a", { href: 'https://www.gittip.com/aymericbeaumet/', target: '_blank' },
                            ["img", { src: '/gfx/icons/item_fest.gif' }],
                            ["span", {}, I18N.get(MODULE_NAME + '_support_link')]
                        ]
                    ],
                    ["li", {},
                        ["a", { href: 'https://github.com/aymericbeaumet/die2nite_enhancer/issues', target: '_blank' },
                            ["img", { src: '/gfx/icons/small_rocket.gif' }],
                            ["span", {}, I18N.get(MODULE_NAME + '_bug_tracker_link')]
                        ]
                    ],
                    ["li", {},
                        ["a", { href: 'http://opensource.org/licenses/Zlib', target: '_blank' },
                            ["img", { src: '/gfx/icons/small_nice_lock.gif' }],
                            ["span", {}, I18N.get(MODULE_NAME + '_license_link')]
                        ]
                    ],
                    ["li", {},
                        ["a", { href: 'https://github.com/aymericbeaumet/die2nite_enhancer/', target: '_blank' },
                            ["img", { src: (D2NE.is_restricted_mode() ? '/gfx/icons/item_tamed_pet.gif' : '/gfx/icons/item_tamed_pet_drug.gif') }],
                            ["span", {}, I18N.get(MODULE_NAME + '_version') + ' 0.2.2']
                        ]
                    ]
                ]
            ]
        ], document);

        JS.wait_for_id('main2', function(node) {
            node.insertBefore(button, node.firstChild);
        });
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.CONTAINER,

        properties: {
            enabled: true
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                insert_button_style();
                insert_button_dom();
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'citizen_data_extractor';

    /******************
     * Module context *
     ******************/

    var EXTRACT_BUTTON_ID = 'd2ne_extract_citizen_data';

    var SOUL_TIMEOUT = 5000; //ms

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_extract_alive_citizens_data_button_text'] = 'Extract alive citizens data';
        i18n[I18N.LANG.EN][MODULE_NAME + '_extract_soul_data_button_text'] = 'Extract the soul data';
        i18n[I18N.LANG.EN][MODULE_NAME + '_extract_game_history_button_text'] = 'Extract citizens data';
        i18n[I18N.LANG.EN][MODULE_NAME + '_warning'] = 'This could take some time, please do not stop the process. Do you want to continue?';
        i18n[I18N.LANG.EN][MODULE_NAME + '_work_in_progress'] = 'Work in progress...';
        i18n[I18N.LANG.EN][MODULE_NAME + '_citizen'] = 'Citizen';
        i18n[I18N.LANG.EN][MODULE_NAME + '_result_notif'] = 'Results:';
        i18n[I18N.LANG.EN][MODULE_NAME + '_use_die2nite_picto_diff'] = 'You can use this results here.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_extract_alive_citizens_data_button_text'] = 'Extraire les données des vivants';
        i18n[I18N.LANG.FR][MODULE_NAME + '_extract_soul_data_button_text'] = 'Extraire les données de l\'âme';
        i18n[I18N.LANG.FR][MODULE_NAME + '_extract_game_history_button_text'] = 'Extraire les données des citoyens';
        i18n[I18N.LANG.FR][MODULE_NAME + '_warning'] = 'Cette opération peut prendre quelques temps, merci de ne pas interrompre le processus. Voulez-vous continuer ?';
        i18n[I18N.LANG.FR][MODULE_NAME + '_work_in_progress'] = 'Récupération en cours...';
        i18n[I18N.LANG.FR][MODULE_NAME + '_citizen'] = 'Citoyen';
        i18n[I18N.LANG.FR][MODULE_NAME + '_result_notif'] = 'Résultats :';
        i18n[I18N.LANG.FR][MODULE_NAME + '_use_die2nite_picto_diff'] = 'Vous pouvez utiliser ces résultats ici.';

        I18N.set(i18n);
    }

    function extract_username(ret, next) {
        JS.wait_for_selector('div.tid_userName > span:last-child', function(node) {
            ret.username = node.textContent;
            next();
        });
    }

    function extract_icon(ret, next) {
        JS.wait_for_selector('div.tid_userSheet img.tid_avatarImg', function(node) {
            ret.iconURL = node.src;
            next();
        }, 1, next);
    }

    function extract_title(ret, next) {
        JS.wait_for_selector('span.tid_userTitle', function(node) {
            ret.title = node.textContent.trim();
            if (ret.title.length === 0) {
                delete ret.title;
            }
            next();
        });
    }

    function extract_profile_likes(ret, next) {
        JS.wait_for_selector('span.tid_likeButtonCompact', function(node) {
            ret.profileLikes = parseInt(node.textContent);
            if (typeof ret.profileLikes !== 'number' || isNaN(ret.profileLikes)) {
                ret.profileLikes = 0;
            }
            next();
        });
    }

    function extract_avatar(ret, next) {
        JS.wait_for_selector('div.tid_userSheet img.tid_avatarImg', function(node) {
            ret.avatarURL = node.src;
            next();
        }, 1, next);
    }

    function extract_sex(ret, next) {
        JS.wait_for_selector('div.tid_age > img:first-child', function(node) {
            var m = node.src.match(/\/([a-z]+)\.png$/);
            switch (m) {
                case 'male':
                    ret.sex = 'male'; break;
                case 'female':
                    ret.sex = 'female'; break;
            }
            next();
        });
    }

    function extract_age(ret, next) {
        JS.wait_for_selector('div.tid_age', function(node) {
            ret.age = parseInt(node.textContent);
            if (typeof ret.age !== 'number' || isNaN(ret.age)) {
                delete ret.age;
            }
            next();
        });
    }

    function extract_city(ret, next) {
        JS.wait_for_selector('div.tid_city', function(node) {
            ret.city = node.textContent.trim();
            if (ret.city === '--') {
                delete ret.city;
            }
            next();
        });
    }

    function extract_country(ret, next) {
        JS.wait_for_selector('div.tid_country', function(node) {
            ret.country = node.textContent.trim();
            if (ret.country === '--') {
                delete ret.country;
            }
            next();
        });
    }

    function extract_description(ret, next) {
        JS.wait_for_selector('div.tid_userStatus div.tid_content p', function(node) {
            ret.descriptionHTML = node.innerHTML;
            next();
        }, 1, next);
    }

    function extract_pictos_score(ret, next) {
        JS.wait_for_selector('div.tid_overall', function(node) {
            ret.pictosScore = parseInt(node.textContent);
            next();
        });
    }

    function extract_pictos_top(ret, next) {
        var picto;
        var count;

        JS.wait_for_selector_all('div.tid_top > div.tid_goal.tid_bg3.tid_rare:not([style])', function(nodes) {
            for (var i = 0, max = nodes.length; i < max; i++) {
                ret.pictosTop = ret.pictosTop || {};
                picto = nodes[i].querySelector('div.tid_icon > img').src.match(/\/img\/icons\/(.+)\.gif$/)[1];
                count = parseInt(nodes[i].textContent);
                ret.pictosTop[picto] = count;
            }
            next();
        }, 1, next);
    }

    function extract_pictos_rare(ret, next) {
        var picto;
        var count;

        JS.wait_for_selector_all('div.tid_block.tid_stats div.tid_goal.tid_bg3.tid_tip.tid_rare.tid_parsed', function(nodes) {
            for (var i = 0, max = nodes.length; i < max; i++) {
                ret.pictosRare = ret.pictosRare || {};
                picto = nodes[i].querySelector('img.tid_icon').src.match(/\/img\/icons\/(.+)\.gif$/)[1];
                count = parseInt(nodes[i].querySelector('div.tid_count > span:first-child').textContent);
                ret.pictosRare[picto] = count;
            }
            next();
        }, 1, next);
    }

    function extract_pictos(ret, next) {
        var picto;
        var count;

        JS.wait_for_selector_all('div.tid_block.tid_stats div.tid_goal.tid_bg3.tid_tip.tid_parsed:not(.tid_rare)', function(nodes) {
            for (var i = 0, max = nodes.length; i < max; i++) {
                ret.pictos = ret.pictos || {};
                picto = nodes[i].querySelector('img.tid_icon').src.match(/\/img\/icons\/(.+)\.gif$/)[1];
                count = parseInt(nodes[i].querySelector('div.tid_count > span:first-child').textContent);
                ret.pictos[picto] = count;
            }
            next();
        }, 1, next);
    }

    function extract_soul_score(ret, next) {
        JS.wait_for_selector('div.score > strong', function(node) {
            ret.soulScore = parseInt(node.textContent);
            next();
        });
    }

    function extract_citizen_info(citizen_id, on_finish)
    {
        var timeout = null;

        var listener = function() {
            document.removeEventListener('d2n_gamebody_reload', listener);

            var ret = {};
            ret.D2NEVersion = '0.2.2';
            ret.rootURL = window.location.host;
            if (citizen_id) {
                ret.id = parseInt(citizen_id);
            }
            ret.time = Math.floor(new Date() / 1000);

            extract_username(ret, function next() {
                extract_icon(ret, function next() {
                    extract_title(ret, function next() {
                        extract_profile_likes(ret, function next() {
                            extract_avatar(ret, function next() {
                                extract_sex(ret, function next() {
                                    extract_age(ret, function next() {
                                        extract_city(ret, function next() {
                                            extract_country(ret, function next() {
                                                extract_description(ret, function next() {
                                                    extract_pictos_score(ret, function next() {
                                                        extract_pictos_top(ret, function next() {
                                                            extract_pictos_rare(ret, function next() {
                                                                extract_pictos(ret, function next() {
                                                                    extract_soul_score(ret, function next() {
                                                                        // Everything has been parsed, clear the timeout
                                                                        clearTimeout(timeout);
                                                                        on_finish(ret);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };

        if (citizen_id) {
            // If timeout is reached, try to extract the data again. Except if
            // the account is deleted
            timeout = setTimeout(function() {
                document.removeEventListener('d2n_gamebody_reload', listener);

                // If the account is deleted, abort
                if (document.querySelector('.tid_noTid') !== null) {
                    return on_finish(null);
                }

                extract_citizen_info(citizen_id, on_finish);
            }, SOUL_TIMEOUT);

            document.addEventListener('d2n_gamebody_reload', listener, false);
            D2N.redirect_to_citizen_soul(citizen_id, '' + (Math.floor(new Date() / 1000)));
        } else {
            listener();
        }
    }

    /****/

    function extract_citizens_info(citizens_id, onFinish)
    {
        var ret = [];
        var max = citizens_id.length;

        var handler = function(i) {
            if (i >= max) {
                return onFinish(ret);
            }

            // Notify of the progress
            D2N.notification(I18N.get(MODULE_NAME + '_work_in_progress') + ' ' +
                I18N.get(MODULE_NAME + '_citizen') + ' ' + (i + 1) + '/' + max);

            extract_citizen_info(citizens_id[i], function(citizen_info) {
                if (citizen_info !== null) {
                    ret.push(citizen_info);
                }
                handler(i + 1);
            });
        };
        handler(0);
    }

    /****/

    function extract_citizens_id(selector)
    {
        var citizens_link = document.querySelectorAll(selector);
        var ret = [];
        var regex = /uid=(\d+)/;
        var regex_results;

        for (var i = 0, max = citizens_link.length; i < max; i++) {
            regex_results = regex.exec(citizens_link[i].href);
            if (regex_results.length > 1) {
                ret.push(regex_results[1]);
            }
        }

        return ret;
    }

    /****/

    function on_soul_button_click()
    {
        D2N.notification(I18N.get(MODULE_NAME + '_work_in_progress'));

        extract_citizen_info(null, function(citizen_info) {
            D2N.notification(JS.jsonToDOM(['div', {},
                I18N.get(MODULE_NAME + '_result_notif'),
                ['textarea', { readonly: '', onclick: 'this.select()',
                               style: 'width: 100%; max-width: 100%; height: initial; margin: 0 auto; margin-top: 5px; margin-bottom: 3px; padding: 0;' },
                    JSON.stringify(citizen_info)
                ],
                ['a', { href: 'http://beaumet.me/die2nite_picto_diff/', target: '_blank' },
                    I18N.get(MODULE_NAME + '_use_die2nite_picto_diff')
                ]
            ], document));
        });
    }

    function on_citizens_list_button_click(selector, final_redirection)
    {
        if (confirm(I18N.get(MODULE_NAME + '_warning')) === false) {
            return;
        }

        D2N.notification(I18N.get(MODULE_NAME + '_work_in_progress'));

        var citizens_id = extract_citizens_id(selector);
        extract_citizens_info(citizens_id, function(citizens_info) {

            var after_getting_back_to_citizens_list = function() {
                document.removeEventListener('d2n_gamebody_reload', after_getting_back_to_citizens_list, false);
                D2N.notification(JS.jsonToDOM(['div', {},
                    I18N.get(MODULE_NAME + '_result_notif'),
                    ['textarea', { readonly: '', onclick: 'this.select()',
                                   style: 'width: 100%; max-width: 100%; height: initial; margin: 0 auto; margin-top: 5px; margin-bottom: 3px; padding: 0;' },
                        JSON.stringify(citizens_info)
                    ],
                    ['a', { href: 'http://beaumet.me/die2nite_picto_diff/', target: '_blank' },
                        I18N.get(MODULE_NAME + '_use_die2nite_picto_diff')
                    ]
                ], document));
            };
            document.addEventListener('d2n_gamebody_reload', after_getting_back_to_citizens_list, false);

            JS.redirect(final_redirection);
        });
    }

    /****/

    function get_button(i18n_key, on_click, style)
    {
        return JS.jsonToDOM(["a", { id: EXTRACT_BUTTON_ID, class: "button", style: '' + style,
                                    onclick: on_click },
            ["img", { "src": "/gfx/icons/item_book_gen_letter.gif" }],
            ' ' + I18N.get(MODULE_NAME + i18n_key)
        ], document);
    }

    function inject_game_history_button()
    {
        JS.wait_for_selector('div.ghost div.footer', function(el) {
            el.appendChild(get_button('_extract_game_history_button_text', function() {
                on_citizens_list_button_click('td.name > a[href^="#ghost/user?uid="]', window.location.hash);
            }, 'margin-left: 30px;'));
        });
    }

    function inject_soul_button()
    {
        JS.wait_for_selector('div.footSearch', function(el) {
            el.parentNode.insertBefore(get_button('_extract_soul_data_button_text', on_soul_button_click), el);
        });
    }

    function inject_town_citizens_button()
    {
        JS.wait_for_selector('div.citizens', function(el) {
            el.appendChild(get_button('_extract_alive_citizens_data_button_text', function() {
                on_citizens_list_button_click('a.tid_user[href^="/#ghost/city?go=ghost/user?uid="]', window.location.hash);
            }));
        });
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: true
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('d2n_gamebody_reload', function() {
                    if (JS.is_defined(document.getElementById(EXTRACT_BUTTON_ID))) {
                        return;
                    }

                    if (D2N.is_on_page_in_city('citizens')) {
                        inject_town_citizens_button();
                    } else if (/^#ghost\/city\?go=ghost\/user(?:\?uid=\d+)?;sk=/.test(window.location.hash)) {
                        inject_soul_button();
                    } else if (/^#ghost\/city\?go=ghost\/ingame\?id=\d+;sk=/.test(window.location.hash)) {
                        inject_game_history_button();
                    }
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'configuration_panel';

    /******************
     * Module context *
     ******************/

    var D2NE_CONFIG_HASH = '#d2ne/configuration';

    /**
     * Inject in the input field to store the corresponding module name.
     */
    var INPUT_DATA_MODULE_KEY = 'data-module';

    /**
     * Inject in the input field to store the corresponding module name.
     */
    var INPUT_DATA_MODULE_PROPERTY_KEY = 'data-module-property';

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_title'] = 'Die2Nite Enhancer - Configuration Panel';
        i18n[I18N.LANG.EN][MODULE_NAME + '_help_image_url'] = '/gfx/loc/en/helpLink.gif';
        i18n[I18N.LANG.EN][MODULE_NAME + '_general_category'] = 'General';
        i18n[I18N.LANG.EN][MODULE_NAME + '_bank_category'] = 'Bank';
        i18n[I18N.LANG.EN][MODULE_NAME + '_construction_category'] = 'Construction Sites';
        i18n[I18N.LANG.EN][MODULE_NAME + '_outside_category'] = 'Outside';
        i18n[I18N.LANG.EN][MODULE_NAME + '_external_tool_category'] = 'External Tools';
        i18n[I18N.LANG.EN][MODULE_NAME + '_soul_category'] = 'Soul page';
        i18n[I18N.LANG.EN][MODULE_NAME + '_forum_category'] = 'Forum';
        i18n[I18N.LANG.EN][MODULE_NAME + '_interface_category'] = 'Interface';
        i18n[I18N.LANG.EN][MODULE_NAME + '_various_category'] = 'Various';
        i18n[I18N.LANG.EN][MODULE_NAME + '_save_button'] = 'Save';
        i18n[I18N.LANG.EN][MODULE_NAME + '_close_button'] = 'Close';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_title'] = 'Die2Nite Enhancer - Panneau de configuration';
        i18n[I18N.LANG.FR][MODULE_NAME + '_help_image_url'] = '/gfx/loc/fr/helpLink.gif';
        i18n[I18N.LANG.FR][MODULE_NAME + '_general_category'] = 'Général';
        i18n[I18N.LANG.FR][MODULE_NAME + '_bank_category'] = 'Banque';
        i18n[I18N.LANG.FR][MODULE_NAME + '_construction_category'] = 'Chantiers';
        i18n[I18N.LANG.FR][MODULE_NAME + '_outside_category'] = 'Outre-Monde';
        i18n[I18N.LANG.FR][MODULE_NAME + '_external_tool_category'] = 'Outils Externes';
        i18n[I18N.LANG.FR][MODULE_NAME + '_soul_category'] = 'Page d\'âme';
        i18n[I18N.LANG.FR][MODULE_NAME + '_forum_category'] = 'Forum';
        i18n[I18N.LANG.FR][MODULE_NAME + '_interface_category'] = 'Interface';
        i18n[I18N.LANG.FR][MODULE_NAME + '_various_category'] = 'Divers';
        i18n[I18N.LANG.FR][MODULE_NAME + '_save_button'] = 'Sauvegarder';
        i18n[I18N.LANG.EN][MODULE_NAME + '_close_button'] = 'Fermer';

        i18n[I18N.LANG.ES] = {};
        i18n[I18N.LANG.ES][MODULE_NAME + '_help_image_url'] = '/gfx/loc/es/helpLink.gif';

        i18n[I18N.LANG.DE] = {};
        i18n[I18N.LANG.DE][MODULE_NAME + '_help_image_url'] = '/gfx/loc/de/helpLink.gif';

        I18N.set(i18n);
    }

    /**
     * Fetch the configuration from the configuration panel and inject it in the
     * local storage.
     */
    function save_configuration()
    {
        var configuration_panel = document.querySelector('#d2ne_configuration_panel > div:nth-child(2)');

        for (var i = 0, max = configuration_panel.childElementCount; i < max; i += 1) {
            var el = configuration_panel.childNodes[i];

            // skip if not div
            if (el.tagName !== 'DIV') {
                continue;
            }

            // Grab input dom element
            var input_node = el.firstChild;
            var module_name = input_node.getAttribute(INPUT_DATA_MODULE_KEY);
            var module = Module.get(module_name);
            var property = input_node.getAttribute(INPUT_DATA_MODULE_PROPERTY_KEY);

            // Get the value
            var input_data;
            switch (module.configurable[property].type) {
                case Module.PROPERTY.BOOLEAN:
                    input_data = input_node.checked;
                    break;

                default:
                    input_data = null;
                    break;
            }

            // Inject it into the object and save
            module.properties[property] = input_data;
            module.save_properties();
        }
    }

    /**
     * Return the category title.
     * @return Array the title
     */
    function get_category_title(category_name)
    {
        var icon = null;
        var text = null;

        switch (category_name) {
            case Module.PROPERTY_CATEGORY.GENERAL:
                icon = '/gfx/icons/item_chair.gif';
                text = I18N.get(MODULE_NAME + '_general_category');
                break;
            case Module.PROPERTY_CATEGORY.BANK:
                icon = '/gfx/icons/item_money.gif';
                text = I18N.get(MODULE_NAME + '_bank_category');
                break;
            case Module.PROPERTY_CATEGORY.CONSTRUCTION:
                icon = '/gfx/forum/smiley/h_refine.gif';
                text = I18N.get(MODULE_NAME + '_construction_category');
                break;
            case Module.PROPERTY_CATEGORY.OUTSIDE:
                icon = '/gfx/icons/r_camp.gif';
                text = I18N.get(MODULE_NAME + '_outside_category');
                break;
            case Module.PROPERTY_CATEGORY.EXTERNAL_TOOL:
                icon = '/gfx/icons/item_radio_on.gif';
                text = I18N.get(MODULE_NAME + '_external_tool_category');
                break;
            case Module.PROPERTY_CATEGORY.SOUL:
                icon = '/gfx/icons/small_ghost_blue.gif';
                text = I18N.get(MODULE_NAME + '_soul_category');
                break;
            case Module.PROPERTY_CATEGORY.FORUM:
                icon = '/gfx/icons/r_rp.gif';
                text = I18N.get(MODULE_NAME + '_forum_category');
                break;
            case Module.PROPERTY_CATEGORY.INTERFACE:
                icon = '/gfx/icons/item_iphone.gif';
                text = I18N.get(MODULE_NAME + '_interface_category');
                break;
            default:
                icon = '/gfx/icons/item_pet_chick.gif';
                text = I18N.get(MODULE_NAME + '_various_category');
                break;
        }

        return ["h2", {},
                   ["img", { src: icon }],
                   text
               ];
    }

    /**
     * Get and sort the modules into categories.
     */
    function get_modules_json_in_categories()
    {
        var categories = {};

        Module.iterate(function(module) {

            // if configurable object does not exist, skip the module
            if (typeof module.configurable === 'undefined') {
                return;
            }

            JS.each(module.configurable, function(key, value) {
                var input_id = 'd2ne_module_' + module.name + '_' + key;
                var input_value = module.properties[key];

                var json_node =
                    ["div", {},
                        null,
                        ["label", { "for": input_id }, I18N.get(value.short_desc_I18N)],
                        ["a", { "class": "helpLink d2ne", "href": "#", "onclick": "return false;",
                                  "onmouseover": "js.HordeTip.showHelp(this, " + JSON.stringify(I18N.get(value.full_desc_I18N)) + ");",
                                  "onmouseout": "js.HordeTip.hide()" },
                            ["img", { "src": I18N.get(MODULE_NAME + '_help_image_url') }]
                        ]
                    ];

                var node = ["/* node_html_type */", { /* node attributes */ }];
                switch (value.type) {
                    case Module.PROPERTY.BOOLEAN:
                        node[0] = "input";
                        node[1].type = "checkbox";

                        if (input_value === true) {
                            node[1].checked = ''; // declare a checked attribute
                        }
                        break;

                    default:
                        return;
                }

                node[1].id = input_id;
                node[1][INPUT_DATA_MODULE_KEY] = module.name;
                node[1][INPUT_DATA_MODULE_PROPERTY_KEY] = key;

                json_node[2] = node;

                // Store the node
                var c = null;
                if (typeof value.category === 'undefined') {
                    c = Module.PROPERTY_CATEGORY.UNKNOWN_CATEGORY;
                } else {
                    c = value.category;
                }

                categories[c] = categories[c] || [];
                categories[c].push(json_node);
            });
        });

        return categories;
    }

    function insert_configuration_panel_dom()
    {
        var el;
        if ((el = document.getElementById('d2ne_configuration_panel'))) {
            el.style.display = 'block';
            D2N.show_empty_notification();
            return;
        }

        var configuration_panel_json = ["div", {}];

        var buttons = ["table", {},
            ["tr", {},
                ["td", {},
                    ["a", { href: "javascript:void(0)", class: "button", onclick: function() {
                                                                                      scroll(0, 0);
                                                                                      D2N.hide_empty_notification();
                                                                                      document.getElementById('d2ne_configuration_panel').style.display = 'none'; }
                                                                                  },
                        I18N.get(MODULE_NAME + '_close_button')
                    ]
                ],
                ["td", {},
                    ["a", { href: "javascript:void(0)", class: "button", onclick: function() { save_configuration(); scroll(0, 0); JS.reload(); } },
                        I18N.get(MODULE_NAME + '_save_button')
                    ]
                ]
            ]
        ];

        configuration_panel_json.push(['h1', {}, I18N.get(MODULE_NAME + '_title')]);

        configuration_panel_json.push(buttons);

        // Iterate over each module in each category
        var categories = get_modules_json_in_categories();
        Module.PROPERTY_CATEGORY_PRIORITY_ORDER.forEach(function(category_name) {
            var category_id = Module.PROPERTY_CATEGORY[category_name];
            var category = categories[category_id];

            if (!JS.is_defined(category)) {
                return;
            }

            configuration_panel_json.push(get_category_title(category_id));

            category.forEach(function(json_node) {
                configuration_panel_json.push(json_node);
            });
        });

        configuration_panel_json.push(buttons);

        JS.wait_for_class('bigBg2', function(node) {
            node[0].appendChild(JS.jsonToDOM(["div", { id: 'd2ne_configuration_panel' },
                ["div"],
                configuration_panel_json,
                ["div"]
            ], document));
            D2N.show_empty_notification();
        });
    }

    function insert_configuration_panel_style()
    {
        JS.injectCSS(
            // Mandatory to still see the tooltips above the configuration panel
            '#tooltip {' +
                'z-index: 242 !important;' +
            '}' +

            '#d2ne_configuration_panel {' +
                'width: 598px;' +
                'position: absolute;' +
                'z-index: 142;' +
                'left: 0;' +
                'right: 0;' +
                'top: 70px;' +
                'margin: 0 auto;' +
                'margin-bottom: 70px;' +
            '}' +

            '#d2ne_configuration_panel > div:nth-child(1) {' +
                'background-image: url("/gfx/design/panel_header.gif");' +
                'height: 18px;' +
                '-webkit-border-top-left-radius: 48px;' +
                '-moz-border-top-left-radius: 48px;' +
                'border-top-left-radius: 48px;' +
                '-webkit-border-top-right-radius: 48px 30px;' +
                '-moz-border-top-right-radius: 48px 30px;' +
                'border-top-right-radius: 48px 30px;' +
                'border: none;' +
            '}' +

            '#d2ne_configuration_panel > div:nth-child(3) {' +
                'background-image: url("/gfx/design/panel_footer.gif");' +
                'height: 16px;' +
                '-webkit-border-bottom-left-radius: 48px;' +
                '-moz-border-bottom-left-radius: 48px;' +
                'border-bottom-left-radius: 48px;' +
                '-webkit-border-bottom-right-radius: 48px 30px;' +
                '-moz-border-bottom-right-radius: 48px 30px;' +
                'border-bottom-right-radius: 48px 30px;' +
                'border: none;' +
            '}' +

            '#d2ne_configuration_panel > div:nth-child(2) {' +
                'padding: 0px 25px;' +
                'padding-left: 27px;' +
                'background: url("/gfx/design/panel_bg.gif");' +
            '}' +

            '#d2ne_configuration_panel h1 {' +
                'margin: 0 auto;' +
                'height: initial;' +
                'padding-bottom: 15px;' +
                'padding-left: 51px;' +
            '}' +

            '#d2ne_configuration_panel h2 {' +
                'padding-bottom: 3px;' +
                'width: 100%;' +
                'border: 1px dotted rgba(179, 124, 74, 0.5);' +
                'border-bottom: 1px solid rgba(179, 124, 74, 0.6);' +
                'border-right: 1px solid rgba(179, 124, 74, 0.6);' +
                'background-color: rgb(112, 62, 33);' +
            '}' +

            '#d2ne_configuration_panel h2 img {' +
                'margin-left: 5px;' +
                'margin-right: 5px;' +
                'vertical-align: -20%;' +
            '}' +

            '#d2ne_configuration_panel div div {' +
                'margin-bottom: 1px;' +
            '}' +

            '#d2ne_configuration_panel a.helpLink {' +
                'float: right;' +
            '}' +

            '#d2ne_configuration_panel table {' +
                'margin: 0 auto;' +
            '}' +

            '#d2ne_configuration_panel a.button {' +
                'margin: 0 auto;' +
                'margin-top: 11px;' +
                'text-align: center;' +
            '}'
        );
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.CONTAINER,

        properties: {
            enabled: true
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                insert_configuration_panel_style();

                document.addEventListener('d2ne_load_configuration_panel', function() {
                    insert_configuration_panel_dom();
                }, false);

                document.addEventListener('d2ne_hide_configuration_panel', function() {
                    var el = document.getElementById('d2ne_configuration_panel');
                    el.style.display = 'none';
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'construction_max_ap';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Use max AP in constructions';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'While in the construction page, use your actual number of AP instead of the default 1 AP.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Construire et réparer avec un maximum de PA';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Pré-remplit la case pour construire ou réparer un chantier avec le maximum de PA disponible au lieu de 1 par défaut.';

        I18N.set(i18n);
    }

    function change_ap()
    {
        D2N.get_number_of_ap_cp(function(ap) {
            var constructions = JS.nodelist_to_array(document.querySelectorAll('tr.building'));

            constructions.forEach(function(construction) {
                var ap_remaining = null;

                var tmp = construction.getElementsByClassName('rscItem');
                if (tmp.length < 1) {
                    return;
                }

                ap_remaining = parseInt(tmp[0].textContent);

                var max_ap = (ap_remaining > ap) ? ap : ap_remaining;
                var ap_field = construction.querySelector('div[id^="moreForm_"] form input[type="text"]');

                ap_field.value = max_ap;
            });
        });
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.CONSTRUCTION,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('d2n_apchange', function() {
                    if (!D2N.is_on_page_in_city('buildings')) {
                        return;
                    }
                    change_ap();
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'cyanide_protection';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Enable cyanide protection';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Avoid to eat cyanide by accident by deleting the link to use it.';
        i18n[I18N.LANG.EN][MODULE_NAME + '_cyanide'] = 'Cyanide';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Protéger contre le cyanure';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Supprime le lien permettant l\'utilisation du cyanure pour éviter les accidents.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_cyanide'] = 'Cyanure';

        i18n[I18N.LANG.ES] = {};
        i18n[I18N.LANG.ES][MODULE_NAME + '_cyanide'] = 'Cianuro';

        i18n[I18N.LANG.DE] = {};
        i18n[I18N.LANG.DE][MODULE_NAME + '_cyanide'] = 'Cyanide';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.GENERAL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return !D2NE.is_restricted_mode();
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('d2n_gamebody_reload', function() {
                    D2N.remove_player_action(I18N.get(MODULE_NAME + '_cyanide'));
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'davf_old_forum';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Old forum menu design (by Davf)';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'More information here [fr]: http://userstyles.org/styles/97652/hordes-forum-ancien. Script by Davf, integrated with his permission.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Hordes Forum Ancien (par Davf)';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Plus d\'information ici : http://userstyles.org/styles/97652/hordes-forum-ancien. Script par Davf, intégré avec sa permission.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.FORUM,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    // From: http://userstyles.org/styles/97652/hordes-forum-ancien
                    // Credit: Davf, thanks to him for giving his permission to use his CSS
                    // Integrated on: Mar 18, 2014
                    '#tid_forum .tid_forumThread .tid_actionBar .tid_pages {' +
                        'width: 248px !important;' +
                    '}' +
                    '#tid_forum .tid_actionBar .tid_buttonBar {' +
                        'margin: 0px !important;' +
                        'margin-left: 1px !important;' +
                        'margin-top: -2px !important;' +
                    '}' +
                    '.tid_actionBar.tid_bg4 {' +
                        'background-color: #965c36 !important;' +
                    '}' +
                    '.tid_cur.tid_tip.tid_parsed {' +
                        'background-color: transparent !important;' +
                        'background-image: url("http://data.hordes.fr/gfx/design/button.gif") !important;' +
                        'border: 1px solid #98341c !important;' +
                        'border-bottom: 1px solid black !important;' +
                        'margin-top: auto !important;' +
                        'color: #f0d79e !important;' +
                    '}' +
                    '.tid_cur.tid_tip.tid_parsed:hover {' +
                        'border: 1px solid #98341c !important;' +
                        'border-top: 2px solid black !important;' +
                        'border-bottom: 0px solid #98341c !important; ' +
                        'outline: 1px solid #f0d79e !important;' +
                        'color: white !important;' +
                    '}' +
                    '.tid_buttonBar a {' +
                        'background-image: url("http://data.hordes.fr/gfx/design/button.gif") !important;' +
                        'border: 1px solid #98341c !important;' +
                        'border-bottom: 1px solid black !important;' +
                        'margin-right: 1px !important;' +
                        'color: #f0d79e !important;' +
                    '}' +
                    '' +
                    '.tid_buttonBar a:hover {' +
                        'opacity: 0.99 !important;' +
                        'border: 1px solid #98341c !important;' +
                        'border-top: 2px solid black !important;' +
                        'border-bottom: 0px solid #98341c !important; ' +
                        'outline: 1px solid #f0d79e !important;' +
                        'color: white !important;' +
                    '}' +
                    '.tid_buttonBar .tid_off:hover {' +
                        'border: 1px solid #7c5a50 !important;' +
                        'opacity: 1 !important;' +
                        'outline: 1px solid #421d15 !important;' +
                        'color: #dddbd8 !important;' +
                    '}' +
                    '.tid_buttonBar .tid_off {' +
                        'background-image: url("http://data.hordes.fr/gfx/design/button_off.gif") !important;' +
                        'border: 1px solid #7c5a50 !important;' +
                        'opacity: 1 !important;' +
                        'outline: 1px solid #421d15 !important;' +
                        'color: #dddbd8 !important;' +
                    '}' +
                    '.tid_buttonBar a.tid_off img {' +
                        'opacity: 0.3 !important;      ' +
                    '}' +
                    '.tid_postForm button {' +
                        'background-color: transparent !important;' +
                        'margin-top: 4px !important;' +
                        'background-image: url("http://data.hordes.fr/gfx/design/button.gif") !important;' +
                        'border: 1px solid #98341c !important;' +
                        'outline: 1px solid black !important;' +
                        'color: #f0d79e !important;' +
                        '-moz-box-shadow : none !important;' +
                        '-webkit-box-shadow : none !important;' +
                        'box-shadow : none !important;' +
                    '}' +
                    '.tid_postForm button:hover {' +
                        'opacity: 0.99 !important;' +
                        'border: 1px solid #98341c !important;' +
                        'border-top: 2px solid #98341c !important;' +
                        'border-bottom: 0px solid #98341c !important;  ' +
                        'outline: 1px solid #f0d79e !important;' +
                        'color: white !important;' +
                        'padding: 2px 20px !important;' +
                        '-moz-box-shadow : none !important;' +
                        '-webkit-box-shadow : none !important;' +
                        'box-shadow : none !important;' +
                    '}' +
                    '#tid_forum .tid_mainBar .tid_actionBar {' +
                        'opacity: 1;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'davf_old_forum_tags';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Old forum tags (by Davf)';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'More information here [fr]: http://userstyles.org/styles/97674/hordes-balises-ancienne. Script by Davf, integrated with his permission.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Hordes Balises Anciennes (par Davf)';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Plus d\'information ici : http://userstyles.org/styles/97674/hordes-balises-ancienne. Script par Davf, intégré avec sa permission.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.FORUM,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    // From: http://userstyles.org/styles/97674/hordes-balises-ancienne
                    // Credit: Davf, thanks to him for giving his permission to use his CSS
                    // Integrated on: Mar 18, 2014
                    '.tid_editorContent .tid_spoil {' +
                        'cursor: help !important;' +
                        'background-image: url("http://data.hordes.fr/gfx/design/spoiler.gif") !important;' +
                        'display: block !important;' +
                        'background-repeat: no-repeat !important;' +
                        'background-color: #4c5536 !important;' +
                        'background-position: 4px 1px !important;' +
                        'color: #4d5537 !important;' +
                    '}' +
                    '.tid_editorContent .tid_spoil .tid_wspoil:first-child {' +
                        'padding-left: 60px !important;' +
                    '}' +
                    '.tid_editorContent .tid_spoil:hover {' +
                        'visibility: visible !important;' +
                        'background-image: url("http://data.hordes.fr/gfx/design/spoiler.gif") !important;' +
                        'background-color:transparent !important;' +
                        'color : #98a675 !important;' +
                    '}' +
                    '.tid_editorContent cite {' +
                        'color: #ddab76 !important;' +
                        'border-left: 1px dashed #ddab76 !important;' +
                        'border-bottom: 1px dashed #ddab76 !important;' +
                        'opacity: 0.9 !important;' +
                    '}  ' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay a {' +
                        'text-decoration: underline !important;' +
                        'color: #ddab76 !important;' +
                    '}' +
                    '#tid_forum .tid_threadNotice.tid_announce {' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/small_help.gif") !important;' +
                        'background-color: #773939 !important;' +
                        'border: 1px solid #ddab76 !important;' +
                        'outline: 2px solid #5c2b20 !important;' +
                        'color: #f86 !important;' +
                        'border-radius: 0px !important;' +
                        '-moz-border-radius: 0px !important;' +
                        '-webkit-border-radius: 0px !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                    '}' +
                    '#tid_forum .tid_threadNotice.tid_announce .tid_list {' +
                        'border-top: 1px dashed #f86 !important;' +
                        'padding: 4px 0px !important;' +
                        'margin: 4px 0px !important;' +
                    '}' +
                    '' +
                    '#tid_forum .tid_threadNotice.tid_niceLock {' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/small_nice_lock.gif") !important;' +
                        'background-color: #5C0000 !important;' +
                        'border: 1px solid #ddab76 !important;' +
                        'outline: 2px solid #5c2b20 !important;' +
                        'border-radius: 0px !important;' +
                        '-moz-border-radius: 0px !important;' +
                        '-webkit-border-radius: 0px !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                    '}' +
                    '#tid_forum .tid_threadNotice.tid_lock {' +
                        'background-color: #5C0000 !important;' +
                        'border: 1px solid #ddab76 !important;' +
                        'outline: 2px solid #5c2b20 !important;' +
                        'border-radius: 0px !important;' +
                        '-moz-border-radius: 0px !important;' +
                        '-webkit-border-radius: 0px !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                    '}' +
                    '' +
                    '.tid_roleplay {' +
                        'background-color: #79432b !important;' +
                        'color: #ddab76 !important;' +
                        'border: 0px solid transparent !important;' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/small_rp.gif") !important;' +
                        'background-repeat: no-repeat !important;' +
                        'background-position: 4px 3px !important;' +
                        'max-width: none !important;' +
                        'padding-left: 24px !important;' +
                        'margin-bottom: 0px !important;' +
                        '-moz-box-shadow: 0px 0px 2px #79432b !important;' +
                        '-webkit-box-shadow: 0px 0px 2px #79432b !important;' +
                        'box-shadow: 0px 0px 2px #79432b !important;' +
                    '}' +
                    '.tid_wroleplay {' +
                        'background-image: none !important;' +
                        'display: inline-block !important;' +
                    '}' +
                    '.tid_wroleplay .tid_roleplay {' +
                        'background: none !important;' +
                        'padding: 0px !important;' +
                        'margin: 0px !important;' +
                    '}' +
                    '' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay em {' +
                        'color: #f0d79e !important;' +
                        'opacity: 1 !important;' +
                    '}' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay strong {' +
                        'color: #afb3cf !important;' +
                        'opacity: 1 !important;' +
                    '}' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay em em{' +
                        'color: #f0d79e !important;' +
                        'opacity: 0.7 !important;' +
                    '}' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay strong strong{' +
                        'color: #afb3cf !important;' +
                        'opacity: 0.8 !important;' +
                    '}' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay em em em{' +
                        'color: #f0d79e !important;' +
                        'opacity: 0.7 !important;' +
                    '}' +
                    '.tid_containerWrapper .tid_editorContent .tid_roleplay .tid_wroleplay strong strong strong{' +
                        'color: #afb3cf !important;' +
                        'opacity: 0.8 !important;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'davf_old_soul';

    /******************
     * Module context *
     ******************/

    var VIDEO_WIDTH = 400;
    var VIDEO_HEIGHT = 300;

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Old school design for the pictogram (by Davf)';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'More information here [fr]: http://userstyles.org/styles/97547/hordes-me-ancienne. Script by Davf, integrated with his permission.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Hordes Âme Ancienne (par Davf)';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Plus d\'information ici : http://userstyles.org/styles/97547/hordes-me-ancienne. Script par Davf, intégré avec sa permission.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.SOUL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    // From: http://userstyles.org/styles/97547/hordes-me-ancienne
                    // Credit: Davf, thanks to him for giving his permission to use his CSS
                    // Integrated on: Mar 18, 2014
                    '.passwidth {' +
                        'margin-top: 200px !important;' +
                    '}' +
                    'div.night {' +
                        'margin-bottom: 165px !important;' +
                    '}' +
                    '.tid_userSheet .tid_userSheetBg {' +
                        'background-color: #5c2b20 !important;' +
                        'background-image: url("http://data.twinoid.com/img/design/ugoals_bgLeft.png") !important;' +
                    '}' +
                    '.tid_userSheet .tid_userSheetBg .tid_bgRight {            ' +
                        'background-image: url("http://data.twinoid.com/img/design/ugoals_bgRight.png") !important;' +
                    '}' +
                    '.tid_userSheet .tid_header {' +
                        'background-color: #452314 !important;' +
                        'background-image: url("http://data.twinoid.com/img/design/ugoals_headerLeft.png") !important;' +
                    '}' +
                    '.tid_userSheet .tid_header .tid_headerRight {' +
                        'padding-top: 0px !important;' +
                        'background-image: url("http://data.twinoid.com/img/design/ugoals_headerRight.png") !important;' +
                    '}' +
                    '.tid_userSheet .tid_footer {' +
                            'background-color: #5c2b20 !important;' +
                            'background-image: url("http://data.twinoid.com/img/design/ugoals_footerLeft.png") !important;' +
                    '}' +
                    '.tid_footerRight {' +
                            'background-image: url("http://data.twinoid.com/img/design/ugoals_footerRight.png") !important;' +
                    '}' +
                    '.tid_userSheet.tid_mine .tid_editable:hover {' +
                        'outline: 1px dotted white !important;' +
                    '}' +
                    //'div.tid_bubble {' +
                        //'background-color: #79432b !important;' +
                        //'color: #ddab76 !important;' +
                        //'box-shadow: 0px 0px 2px #79432b !important;' +
                        //'-webkit-box-shadow: 0px 0px 2px #79432b !important;' +
                        //'border: 0px solid transparent !important;' +
                        //'border-radius: 4px;' +
                    //'}' +
                    '.tid_userSheet.tid_mine .tid_editable .tid_editIcon {' +
                        'margin-top: -6px !important;' +
                        'margin-left: -10px !important;' +
                        'background: #79432b !important;' +
                        '-moz-box-shadow: 0px 0px 3px #ddab76 !important;' +
                        '-webkit-box-shadow: 0px 0px 3px #ddab76 !important;' +
                        'box-shadow: 0px 0px 2px #ddab76 !important;' +
                        'border-radius: 4px !important;' +
                        '-moz-border-radius: 4px !important;' +
                        '-webkit-border-radius: 4px !important;' +
                        'border: 1px solid #ddab76 !important;' +
                    '}' +
                    //'.tid_userStatus .tid_bubble .tid_content .tid_editorContent a {' +
                        //'color: #ddab76 !important;' +
                    //'}' +
                    //'.tid_userStatus .tid_bubble .tid_content .tid_editorContent a:hover {' +
                        //'color: white !important;' +
                    //'}' +
                    //'.tid_bubble  a {' +
                        //'text-decoration: underline !important;' +
                    //'}' +
                    //'.tid_userStatus .tid_bubble  .tid_editorContent strong {' +
                        //'color: #afb3cf !important;' +
                        //'font-weight: bold !important;' +
                    //'}' +
                    '.tid_userSheet.tid_mine .tid_editable:hover {' +
                        'outline: 1px dotted #ddab76 !important;' +
                    '}' +
                    '.tid_userStatus .tid_arrow.tid_left {' +
                        'background-image: none !important;' +
                    '}' +
                    '.tid_userGoals .tid_userGoals_bg {' +
                        'background-image: none  !important;' +
                    '}' +
                    '.tid_userGoals .tid_userGoals_headerLeft {' +
                        'background-image: none  !important;' +
                    '}' +
                    '.tid_userGoals .tid_userGoals_headerLeft .tid_bgRight {' +
                        'background-image: none  !important;' +
                    '}    ' +
                    '.tid_userGoals .tid_userGoals_bg .tid_userGoals_bgRight {' +
                        'background-image: none  !important;' +
                    '}   ' +
                    '.tid_userGoals .tid_userGoals_footerLeft .tid_bgRight {' +
                        'background-image: none  !important;' +
                    '}   ' +
                    '.tid_userGoals .tid_userGoals_footerLeft {' +
                        'background-image: none;' +
                    '}' +
                    '.tid_userGoals .tid_bg2 {' +
                        'background-color: transparent !important;' +
                    '}' +
                    '.tid_userGoals .tid_bg1 {' +
                        'background-color: transparent !important;' +
                    '}' +
                    '.tid_userGoals .tid_bg3 {' +
                        'background-color: transparent !important;' +
                    '}' +
                    '.guser .left {' +
                        'width: 300px;' +
                        'background-image: url("http://data.hordes.fr/gfx/design/rewardsBg_bg.gif") !important;' +
                        'background-repeat: repeat-y !important;' +
                        'margin-bottom: auto !important;' +
                        'background-position: 20px 0px !important;' +
                    '}' +
                    '.tid_userGoals {' +
                        'background-image: url("http://data.hordes.fr/gfx/loc/fr/rewardsBg_header.gif") !important;' +
                        'background-repeat: no-repeat !important;' +
                        'margin-bottom: 0px !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important; ' +
                        'margin-left: auto !important;' +
                        'margin-right: auto !important;' +
                        'width: 260px !important;' +
                    '}' +
                    '.tid_userGoals_footerLeft.tid_bg2 {' +
                        'background-image: url("http://data.hordes.fr/gfx/design/rewardsBg_footer.gif") !important;' +
                        'height: 47px !important;' +
                        'margin-top: -22px !important;' +
                    '}' +
                    '.tid_userGoals {' +
                        'width: 260px !important;' +
                    '}' +
                    '.tid_userGoals .tid_userGoals_headerLeft .tid_bgRight {' +
                        'padding-top: 45px !important;' +
                     '}' +
                    '.tid_help.tid_tip.tid_parsed {' +
                    'padding-right: 12px !important;' +
                    '}' +
                    '.tid_userGoals .tid_userGoals_headerBorder {' +
                        'margin: 0px 3px !important;' +
                        'border-top: 0px solid transparent !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_goalListWrapper {' +
                        'max-height: none !important;' +
                        'border-top: 0px solid white !important;' +
                        'border-bottom: 0px solid white !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_reachList {' +
                        'border-top: 0px solid white !important;' +
                        'border-bottom: 0px solid white !important;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                    '}' +
                    '.tid_userGoals .tid_scrollTrack {' +
                        'display: none !important;' +
                    '}' +
                    '.tid_scrollContentWrapper {' +
                        'max-height: none !important;' +
                        'margin-right:0px !important;  ' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_goalListWrapper, .tid_userGoals .tid_goals .tid_reachList {' +
                        'max-height: none !important;      ' +
                    '}' +
                    '.tid_userGoals .tid_tabs {' +
                        'padding-right: 0px !important;' +
                        'text-align: center !important;' +
                    '}' +
                     '.tid_userGoals .tid_tabs .tid_over3:hover {' +
                        'background-color: none !important;' +
                        'color: #DDAB76 !important;' +
                     '}' +
                    '.tid_userGoals .tid_tabs a:hover {' +
                        'background-color: none !important;' +
                        'color: #f0d79e !important;' +
                     '}' +
                    '.tid_userGoals .tid_goals .tid_mode_icons .tid_goal.tid_rare {' +
                        'border: 0px solid #feb500;' +
                        'border-top-color: #FFFFB9;' +
                        '-moz-box-shadow: none !important;' +
                        '-webkit-box-shadow: none !important;' +
                        'box-shadow: none !important;' +
                        'border-radius: 0px !important;' +
                        '-moz-border-radius: 0px !important;' +
                        '-webkit-border-radius: 0px !important;' +
                        'background-color: transparent !important;' +
                    '}' +
                    '.tid_goal.tid_bg3.tid_tip.tid_rare.tid_parsed {' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/rewardBg_rare.gif") !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_mode_icons .tid_goal .tid_count {' +
                        'margin-top: 19px !important;   ' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_top .tid_goal.tid_rare .tid_count {' +
                        'background-color: #3d2016 !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_mode_icons .tid_goal {' +
                        'border: 0px solid white !important;          ' +
                    '}' +
                    '.tid_userGoals .tid_bg1 .tid_bgRight {' +
                        'color: #f0d79e !important;' +
                        'font-variant: small-caps !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_reachList table tr {' +
                        'color: white !important;	' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_reachList table td.tid_name {' +
                        'font-variant: small-caps !important;' +
                        'font-style: normal !important;' +
                    '}' +
                    '.tid_userGoals .tid_goals .tid_reachList table td.tid_value {' +
                        'color: #f0d79e !important;' +
                    '}' +
                    '.tid_note, .tid_blockTitle {' +
                        'color: #f0d79e !important;' +
                    '}' +
                    '#tid_simpleTip > div {' +
                        'background: #5C2b20 !important;' +
                        'border: 1px solid #f0d79e !important;' +
                        'outline: 1px solid #5c2B20 !important;' +
                    '}' +
                    '#tid_simpleTip {' +
                        'background-image: url("http://uppix.net/7vuvNE.png") !important;' +
                        'background-repeat: no-repeat !important;' +
                        'background-position: 50% 100% !important;' +
                        'padding-bottom: 8px !important;' +
                    '}' +
                    '#tid_simpleTip > img {' +
                        'display: none !important;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'davf_old_twinoid_elements';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Old Twinoid elements (by Davf)';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'More information here [fr]: http://userstyles.org/styles/99207/hordes-elements-twinoidien. Script by Davf, integrated with his permission.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Hordes Elements Twinoidien (par Davf)';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Plus d\'information ici : http://userstyles.org/styles/99207/hordes-elements-twinoidien. Script par Davf, intégré avec sa permission.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.GENERAL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    // From: http://userstyles.org/styles/99207/hordes-elements-twinoidien
                    // Credit: Davf, thanks to him for giving his permission to use his CSS
                    // Integrated on: Mar 19, 2014
                    '#tid_userMenu > div.tid_content {' +
                        'background-color: #5c2b20 !important;' +
                        'background-image: none !important;' +
                        'border: 1px solid #ddab76 !important;' +
                    '}' +
                    '#tid_userMenu > div.tid_content div.tid_links div.tid_minorLinks a {' +
                        'color: #ddab76 !important;' +
                    '}' +
                    '#tid_userMenu > div.tid_content div.tid_links div.tid_minorLinks a:hover {' +
                        'background-color: #79432b !important;' +
                    '}' +
                    '#tid_userMenu > div.tid_content.tid_modinit div.tid_links div.tid_majorLinks a {' +
                        'background-color: #79432b !important;' +
                        'color: #f0d79e !important;' +
                    '}' +
                    '#tid_userMenu > div.tid_content.tid_modinit div.tid_links div.tid_majorLinks a:hover {' +
                        'background-color: #996739 !important;' +
                        'color: white !important;' +
                    '}' +
                    '#tid_userMenu .tid_rel.tid_isUnknown {' +
                        'background-color: #5C0000 !important;' +
                        'border: 1px solid #ddab76 !important;' +
                        'border-radius: 0px !important;' +
                    '}' +
                    '#tid_userMenu .tid_links .tid_majorLinks span.tid_placeHolder {' +
                        'border: 1px dashed #ddab76 !important;' +
                    '}' +
                    '#tid_userMenu .tid_sep {' +
                        'border-bottom: 1px dashed #f0d79e !important;' +
                    '}' +
                    '#tid_userMenu .tid_baseInfos .tid_asv div{' +
                        'color: #f0d79e !important;' +
                        'text-shadow: none !important;' +
                        'line-height: 12px;' +
                    '}' +
                    '#tid_userMenu .tid_baseInfos .tid_userStatus .tid_bubble {' +
                        'max-height: 120px !important;' +
                    '}' +
                    '#tid_userMenu .tid_links .tid_tinyLinks a{' +
                        'color: #ddab76 !important;' +
                        'text-decoration: underline !important;' +
                    '}' +
                    '.tid_user.tid_userBg.tid_userFriend {' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/small_online.gif") !important;' +
                        'background-color: #7e4e2a !important;' +
                        'border-top: 1px solid #965c36 !important;' +
                        'border-radius: 4px !important;' +
                        'padding-right: 16px !important;' +
                        'color: #f0d79e !important;' +
                        'font-weight: bold;' +
                    '}' +
                    '.tid_user.tid_userBg.tid_userFriend:hover {' +
                        'border-top: 1px solid #6b3d25 !important;' +
                    '}' +
                    '.tid_user.tid_userBg.tid_userUnknown {' +
                        'background-image: url("http://data.hordes.fr/gfx/icons/small_offline.gif") !important;' +
                        'background-color: #5C0000 !important;' +
                        'border-top: 1px solid #98341c !important;' +
                        'border-radius: 4px !important;' +
                        'padding-right: 16px !important;' +
                        'color: #f0d79e !important;' +
                        'font-weight: bold !important;' +
                    '}' +
                    '.tid_user.tid_userBg.tid_userUnknown:hover {' +
                    'border-top: 1px solid #490000 !important;' +
                    '}' +

                    // Grabbed from: http://userstyles.org/styles/97652/hordes-forum-ancien
                    // (also by Davf)
                    // I find it more appropriate in this module.
                    'div.tid_bubble {' +
                        'background-color: #79432b !important;' +
                        'color: #ddab76 !important;' +
                        'box-shadow: 0px 0px 2px #79432b !important;' +
                        '-webkit-box-shadow: 0px 0px 2px #79432b !important;' +
                        'border: 0px solid transparent !important;' +
                        'border-radius: 4px;' +
                    '}' +
                    '.tid_userStatus .tid_bubble .tid_content .tid_editorContent a {' +
                        'color: #ddab76 !important;' +
                    '}' +
                    '.tid_userStatus .tid_bubble .tid_content .tid_editorContent a:hover {' +
                        'color: white !important;' +
                    '}' +
                    '.tid_bubble  a {' +
                        'text-decoration: underline !important;' +
                    '}' +
                    '.tid_userStatus .tid_bubble  .tid_editorContent strong {' +
                        'color: #afb3cf !important;' +
                        'font-weight: bold !important;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'auto_escort';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Auto escort';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Automatically enable the escort mode when outside.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Attendre une escorte automatiquement';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Active automatiquement le mode escorte lorsque vous êtes hors de la ville.';

        I18N.set(i18n);
    }

    function enable_escort(sk)
    {
      // If the escort link is found
      JS.wait_for_selector('#generic_section div.who a[href^="#user/waitForLeader?sk="]', function() {

        // Grab the session key
        D2N.get_session_key(function(sk) {

          // Enable the escort
          JS.injectJS('js.XmlHttp.get(' + JSON.stringify('user/waitForLeader?sk=' + sk) + ');');
        });
      });
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.OUTSIDE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return !D2NE.is_restricted_mode();
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('d2n_gamebody_reload', function() {
                    // if not outside, abort
                    if (!D2N.is_outside()) {
                        return;
                    }

                    enable_escort();
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'good_escort_options';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Directly enable the good escort options';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'When the escort mode is enabled, you can directly be taken further away and your rucksack objects can be manipulated.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Activer les bonnes options d\'escorte automatiquement';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Quand le mode escorte est activé, vous pouvez automatiquement être éloigné de la ville et les objets de votre sac peuvent être manipulés.';

        I18N.set(i18n);
    }

    function enable_rucksack_manipulation()
    {
        // Try to find the label
        JS.wait_for_selector('#generic_section div.who input[name="fullEscort"]:not(:checked)', function() {

            // Grab the session key
            D2N.get_session_key(function(sk) {

                // If has been found and is not checked, enable the bag access
                JS.injectJS('js.XmlHttp.get(' + JSON.stringify('user/toggleFullEscort?sk=' + sk) + ');');

                // This will trigger a 'd2n_gamebody_reload' event so this
                // function will be called again. But the second time the
                // unchecked label will not be found and nothing will happen
            });
        }, 0);
    }

    function disable_take_further_away_protection(onFinish)
    {
        // Try to find the label
        JS.wait_for_selector('#generic_section div.who input[name="onlyEscortToTown"]:checked', function() {

            // Grab the session key
            D2N.get_session_key(function(sk) {

                // If has been found and is checked, disable the protection
                JS.injectJS('js.XmlHttp.get(' + JSON.stringify('user/toggleEscortToTown?sk=' + sk) + ');');

                // This will trigger a 'd2n_gamebody_reload' event so this
                // function will be called again. But the second time the
                // checked label will not be found so the onFinish callback will
                // be called.
            });
        }, 0, function notFound() {
            onFinish();
        });
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.OUTSIDE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('d2n_gamebody_reload', function() {
                    // if not outside, abort
                    if (!D2N.is_outside()) {
                        return;
                    }

                    disable_take_further_away_protection(function onFinish() {
                        enable_rucksack_manipulation();
                    });
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'external_tools_bar';

    /******************
     * Module context *
     ******************/

    /**
     * The external tools bar ID.
     */
    var EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID = 'd2ne_external_tools_bar_update_container';
    var EXTERNAL_TOOLS_BAR_UPDATE_ID = 'd2ne_external_tools_bar_update';
    var EXTERNAL_TOOLS_TOOLTIP_LIST_ID = 'd2ne_external_tools_tooltip_list';

    /**
     * Update state, an object containing objects of the following form:
     *
     *     var update_state_ = {
     *         "module_name": {
     *             name: "module_friendly_name",
     *             done: true,
     *             error: false
     *         },
     *         "module_name_2": {
     *             name: "module_2_friendly_name",
     *             done: true,
     *             error: true
     *         }
     *     };
     */
    var update_state_ = {};

    /**
     * Store if an update is currently in progress.
     */
    var update_in_progress_ = false;

    /**
     * Cache
     */
    var button_container_ = null;
    var button_hidden_div_ = null;
    var button_link_ = null;

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_update_button'] = 'Update the external tools';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_update_button'] = 'Mettre à jour les outils externes';

        I18N.set(i18n);
    }

    /**
     * Check if an update is in progress.
     */
    function is_update_in_progress()
    {
        return update_in_progress_;
    }

    /**
     * Setter for update_in_progress_.
     * @param boolean value The desired value (true for update, false otherwise)
     */
    function set_update_in_progress(value)
    {
        update_in_progress_ = value;
    }

    /**
     * Enable the button.
     */
    function enable_button()
    {
        button_link_.classList.remove('disabled');
    }

    /**
     * Disable the button.
     */
    function disable_button()
    {
        button_link_.classList.add('disabled');
    }

    /**
     * Get the number of external tools for the current update
     * @return integer The number of external tools
     */
    function get_number_of_external_tools()
    {
        return Object.keys(update_state_).length;
    }

    /**
     * Get the number of external tools update done.
     * @return integer The number of external tools update done
     */
    function get_number_of_external_tool_updates_done()
    {
        var ret = 0;

        for (var key in update_state_) {
            if (update_state_.hasOwnProperty(key)) {
                ret += (update_state_[key].done === true) ? 1 : 0;
            }
        }

        return ret;
    }

    /**
     * Set the size of the hidden div. Also enable/disable the button behind.
     * @param integer updated number of updated tools (with success or not)
     * @param integer total total number of tools
     */
    function update_hidden_div_width(updated, total)
    {
        var percent = (updated / total) * 100;

        // Remove transition if not needed
        if (percent <= 0) {
            button_hidden_div_.classList.remove('smooth_transition');
        // Else add it
        } else {
            button_hidden_div_.classList.add('smooth_transition');
        }

        // change the div width
        button_hidden_div_.style.width = (100 - percent) + '%';
    }

    /**
     * Update the popup content.
     */
    function update_tooltip()
    {
        var element_id = EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID;
        var new_content = '';

        // set the content
        new_content += '<ul id="' + EXTERNAL_TOOLS_TOOLTIP_LIST_ID + '" style="margin-top: 0;">';
        for (var tool in update_state_) {
            if (update_state_.hasOwnProperty(tool)) {
                // if done and success
                if (update_state_[tool].done === true) {
                    if (update_state_[tool].error === false) {
                        new_content += '<li style="color: #27F037;">';
                    } else {
                        new_content += '<li style="color: #EE1515;">';
                    }
                } else {
                    new_content += '<li>';
                }

                // Include title
                new_content += update_state_[tool].name + '</li>';
            }
        }
        new_content += '</ul>';

        // Update the listeners
        JS.injectJS(
            'var el = document.getElementById(' + JSON.stringify(element_id) + ');' +
            'el.onmouseover = function() {' +
                'return js.HordeTip.showSpecialTip(this, \'simpleTip\', \'\', ' + JSON.stringify(new_content) + ', event);' +
            '};' +
            'el.onmouseout = function() {' +
                'return js.HordeTip.hide(event);' +
            '};'
        );

        // Directly update the tooltip if it is already present in the DOM
        JS.injectJS(
            'if (document.getElementById(' + JSON.stringify(EXTERNAL_TOOLS_TOOLTIP_LIST_ID) + ') !== null) {' +
                'var el = document.getElementById(\'tooltipContent\');' +
                'el.innerHTML = ' + JSON.stringify('<div class="title"></div>' + new_content) + ';' +
            '}'
        );
    }

    /**
     * Reset the update state.
     */
    function reset_update()
    {
        update_state_ = {};
        set_update_in_progress(false);

        Module.iterate_on_type(Module.TYPE.EXTERNAL_TOOL, function(module) {
            if (!module.is_enabled()) {
                return;
            }

            update_state_[module.name] = {
                module: module,
                name: I18N.get(module.name + '_name'),
                done: false,
                error: false
            };
        });
    }

    /**
     * Called every time an external tool is updated.
     */
    function on_external_tool_update() {
        var number_of_tools = get_number_of_external_tools();
        var number_of_done = get_number_of_external_tool_updates_done();

        // Update the tooltip
        update_tooltip();

        // Update the hidden div
        update_hidden_div_width(number_of_done, number_of_tools);

        // if done
        if (number_of_done >= number_of_tools) {
            // reset the update status
            reset_update();

            // enable the button
            enable_button();
        }
    }

    /**
     * Update all the enabled external tools.
     * @param Function progress_callback Will be called on each state change
     */
    function update_external_tools(progress_callback)
    {
        // Abort if an update is already in progress
        if (is_update_in_progress()) {
            return;
        }

        // Reset update state
        reset_update();

        // We are actually doing an update
        set_update_in_progress(true);

        // Disable the button
        disable_button();
        // Update the popup
        update_tooltip();
        // Update the hidden div width
        update_hidden_div_width(get_number_of_external_tool_updates_done(),
                                get_number_of_external_tools());

        JS.each(update_state_, function(module_name, state) {
            var module = state.module;

            module.actions.update.call(module, function on_success() {
                state.done = true;
                state.error = false;

                return progress_callback();

            }, function on_failure() {
                state.done = true;
                state.error = true;

                return progress_callback();
            });
        });
    }

    /**
     * Handle the click on the update button.
     */
    function on_update_button_click()
    {
        update_external_tools(function() {
            return on_external_tool_update();
        });
    }

    /**
     * Inject the node composing the external tools bar into the DOM.
     */
    function inject_external_tools_bar_nodes()
    {
        // If the toolbar exists, abort
        if (JS.is_defined(document.getElementById(EXTERNAL_TOOLS_BAR_UPDATE_ID))) {
            return;
        }

        // Define the reference node selector
        var selector = null;
        if (D2N.is_on_page_in_city('bank')) {
            selector = 'a.button > img[src$="/gfx/icons/r_forum.gif"]';
        } else if (D2N.is_outside()) {
            selector = 'a.button > img[src$="/gfx/icons/small_hero.gif"]';
        } else {
            return;
        }

        JS.wait_for_selector(selector, function(node) {
            var reference_node = node.parentNode;

            // Create the new node
            var new_button = JS.jsonToDOM(["div", { "id": EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID },
                ["div", {}],
                ["a", { "href": "javascript:void(0)", "class": "button", "id": EXTERNAL_TOOLS_BAR_UPDATE_ID,
                        "onclick": function() {
                                       if (this.classList.contains('disabled')) {
                                           return;
                                       }
                                       on_update_button_click();
                                   }
                      },
                    ["img", { "src": "/gfx/icons/r_explo2.gif", "width": "16px", "height": "16px" }],
                    ' ' + I18N.get(MODULE_NAME + '_update_button')
                ]
            ], document);

            // Cache it
            button_container_ = new_button;
            button_hidden_div_ = new_button.childNodes[0];
            button_link_ = new_button.childNodes[1];

            // If an update is in progress, disable it
            if (is_update_in_progress()) {
                update_hidden_div_width(get_number_of_external_tool_updates_done(),
                                        get_number_of_external_tools());
                disable_button();
            }

            // Insert it
            JS.insert_after(reference_node, new_button);

            // Update the tooltip
            update_tooltip();
        }, 10);
    }

    /**
     * Inject the external tool bar CSS.
     */
    function inject_external_tools_bar_style()
    {
        JS.injectCSS(
            '#' + EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID + ' {' +
                'position: relative;' +
                'top: 0;' +
                'left: 0;' +
            '}' +

            '#' + EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID + ' div {' +
                'position: absolute;' +
                'top: 0;' +
                'right: 0;' +
                'width: 0%;' +
                'height: 100%;' +
                'background-color: black;' +
                'opacity: 0.5;' +
                'cursor: help;' +
            '}' +

            '#' + EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID + ' div.smooth_transition {' +
                'transition: width 0.8s;' +
                '-moz-transition: width 0.8s;' +
                '-webkit-transition: width 0.8s;' +
            '}' +

            '#' + EXTERNAL_TOOLS_BAR_UPDATE_CONTAINER_ID + ' a.disabled {' +
                'padding-top: 0px;' +
                'padding-bottom: 1px;' +
                'color: #f0d79e;' +
                'border-top-width: 1px;' +
                'border-bottom-width: 2px;' +
                'outline: 1px solid #784323;' +
                'color: #f0d79e;' +
                'cursor: help;' +
            '}'

        );
    }

    /**
     * Load the module.
     */
    function load_module()
    {
        // Reset update state (scan the available external tools and fill the
        // update state)
        reset_update();

        // Inject DOM
        document.addEventListener('d2n_gamebody_reload', function() {
            inject_external_tools_bar_nodes();
        }, false);

        // Inject CSS
        inject_external_tools_bar_style();
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.CONTAINER,

        properties: {
            enabled: true
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function(){
                add_i18n();
            },

            load: function() {
                var loaded = false;

                // inject the button if at least one external tool is enabled
                Module.iterate_on_type(Module.TYPE.EXTERNAL_TOOL, function(module) {
                    // if already loaded, abort
                    if (loaded) {
                        return;
                    }

                    // if module is enabled, then the external tools bar has to
                    // be enabled
                    if (module.is_enabled()) {
                        // Load the external tools bar module
                        load_module();

                        // Ensure it loads only once
                        loaded = true;
                    }
                });
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'fetch_api_keys';

    /******************
     * Module context *
     ******************/

    /**
     * Set all the api keys to 'null'.
     */
    function clean_api_keys()
    {
        Module.iterate_on_type(Module.TYPE.EXTERNAL_TOOL, function(module) {
            module.properties.tool.api_key = null;
            module.save_properties();
        });
    }

    /**
     * Register to the 'gamebody_reload' event to clean the api keys when the
     * user go to the settings page.
     */
    function clean_api_keys_if_on_settings_page()
    {
        document.addEventListener('d2n_gamebody_reload', function() {
            if (!D2N.is_on_page('settings')) {
                return;
            }

            clean_api_keys();
        }, false);
    }

    /**
     * Called when the API key is successfully fetched.
     * @param Object module The module
     * @param string key The API key
     */
    function on_api_key_successfully_fetched(module, key)
    {
        module.properties.tool.api_key = key;
        module.save_properties();
    }

    /**
     * Called when the API key can't be fetched.
     * @param Object module The module
     */
    function on_api_key_fetch_error(module)
    {
        module.properties.tool.api_key = null;
        module.save_properties();
    }

    /**
     * Fetch the api keys for each available external tool.
     */
    function fetch_api_keys()
    {
        // Abort if on the settings page
        if (D2N.is_on_page('settings')) {
            return;
        }

        // Get the api key for each module
        Module.iterate_on_type(Module.TYPE.EXTERNAL_TOOL, function(module) {
            // if module is disabled, abort
            if (!module.is_enabled()) {
                return;
            }

            // if the key has already been fetched, abort
            if (module.properties.tool.api_key !== null) {
                return;
            }

            // else try to fetch it
            D2N.get_api_key(module.properties.tool.directory_id, function on_success(key) {
                on_api_key_successfully_fetched(module, key);
            }, function on_failure() {
                on_api_key_fetch_error(module);
            });
        });
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.BUSINESS_LOGIC,

        properties: {
            enabled: true,
        },

        actions: {
            can_run: function() {
                return true;
            },

            load: function() {
                document.addEventListener('d2ne_all_modules_loaded', function() {
                    D2N.is_logged(function(is_logged) { if (is_logged) {
                        fetch_api_keys();
                    }});
                }, false);
                clean_api_keys_if_on_settings_page();
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'fold_twinoid_bar';

    /******************
     * Module context *
     ******************/

    /**
     * Stores the Twinoid bar node.
     */
    var tid_cache_ = null;

    /**
     * Stores if the Twinoid bar is hidden.
     */
    var tid_hidden_ = true;

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Fold Twinoid bar';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Fold the Twinoid black bar at the top of the screen. Put your mouse near the top of the screen to show it again.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Replier la barre Twinoid';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Permet de gagner de la place en repliant la barre Twinoid. Rapprochez votre souris du bord supérieur de l\'écran pour l\'afficher de nouveau.';

        I18N.set(i18n);
    }

    /**
     * Show the twinoid bar.
     */
    function show_tid() {
        tid_cache_.style.display = 'block';
        tid_hidden_ = false;
    }

    /**
     * Hide the twinoid bar.
     */
    function hide_tid() {
        tid_cache_.style.display = 'none';
        tid_hidden_ = true;
    }

    /**
     * Handle the mouse move event.
     * @param integer mouse_y The mouse Y coordinate
     */
    function on_mouse_move(mouse_y)
    {
        // if on the top of the screen, display the bar
        if (tid_hidden_ && mouse_y <= 5) {
            show_tid();
        }

        // if not on the top of the screen, hide the bar if the
        // lateral panels are not visible
        else if (!tid_hidden_ && mouse_y > 32) {
            var tid_side_panels = document.getElementsByClassName('tid_sidePanel');
            var tid_side_panels_length = tid_side_panels.length;

            for (var i = 0; i < tid_side_panels_length; i += 1) {
                var style = getComputedStyle(tid_side_panels[i]);

                if (style.visibility === 'visible') {
                    return;
                }
            }
            hide_tid();
        }
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return !D2NE.is_restricted_mode();
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '#tid_bar {' +
                        'display: none;' +
                        'position: fixed;' +
                        'z-index: 15;' +
                    '}' +

                    // the bar is 32px height, so as we hide it, we need to pull up
                    // the interface
                    '#gamebody div.infoBar {' +
                        'top: 111px;' + // 143 - 32
                    '}' +
                    'a#backReboot {' +
                        'top: 178px;' + // 200 - 32
                    '}'
                );

                JS.wait_for_id('tid_bar', function(node) {
                    tid_cache_ = node;
                    tid_hidden_ = true;

                    JS.wait_for_class('tid_sidePanel', function() {
                        document.body.addEventListener('mousemove', function(event) {
                            on_mouse_move(event.clientY);
                        }, false);
                    });
                });
            }
        }

    };

});

Module.register(function() {

    var MODULE_NAME = 'forum_include_medias';

    /******************
     * Module context *
     ******************/

    var VIDEO_WIDTH = 400;
    var VIDEO_HEIGHT = 300;

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Replace the medias link by the content';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'In the forum posts, replace the media links by the concerned media (images and YouTube, Vimeo and Dailymotion videos).';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Remplacer les liens de médias par le contenu';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Dans les posts du forum, remplace les liens de média par le média concerné (images et vidéos YouTube, Vimeo et Dailymotion).';

        I18N.set(i18n);
    }

    /**
     * Return the id from a dailymotion url.
     * @link http://stackoverflow.com/a/15942126/1071486
     * @param string video_url
     * @return integer the video id
     * @return null if can not extract it
     */
    function get_dailymotion_video_id(video_url)
    {
        var results = video_url.match(/dailymotion.com\/(?:(?:video|hub)\/([^_]+))?[^#]*(?:#video=([^_&]+))?/);

        if (!results || results.length < 2) {
            return null;
        }
        return results[2] || results[1];
    }

    /**
     * Return the id from a vimeo url.
     * @link http://stackoverflow.com/a/16841070/1071486
     * @param string video_url
     * @return integer the video id
     * @return null if can not extract it
     */
    function get_vimeo_video_id(video_url)
    {
        var results = video_url.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})/);

        if (!results || results.length < 2) {
            return null;
        }
        return results[1];
    }

    /**
     * Return the id from a youtube video.
     * @link http://linuxpanda.wordpress.com/2013/07/24/ultimate-best-regex-pattern-to-get-grab-parse-youtube-video-id-from-any-youtube-link-url/
     * @param string video_url
     * @return integer the video id
     * @return null if can not extract it
     */
    function get_youtube_video_id(video_url)
    {
        var results = video_url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\s*[^\w\-\s]|\s*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/i);

        if (!results || results.length < 2) {
            return null;
        }
        return results[1];
    }

    /**
     * Check if the given url is an image.
     * @param string url The URL to check
     * @return boolean true if an image url, else false
     */
    function is_image_link(url)
    {
        return /.+\.(?:jpe?g|png|gif|bmp)(?:\?.+)?(?:#.\+)?$/.test(url);
    }

    /**
     * Check if the given url is an URL.
     * @param string url The url to check.
     * @return boolean true if an URL, else false
     */
    function is_link(url)
    {
        return /^https?:\/\//.test(url);
    }

    /**
     * Replace medias in forum posts.
     * @param DOMNode[] posts The posts list
     */
    function replace_medias_in_forum_posts(posts)
    {
        var id;
        var embed_link;

        posts.forEach(function(post) {
            var links = JS.nodelist_to_array(post.querySelectorAll('.tid_editorContent a[href]'));

            // for each link, see if it has to be replaced
            links.forEach(function(link) {
                var new_node = null;

                // images
                if (is_image_link(link.href)) { // if an image
                    // create the node img
                    new_node = JS.jsonToDOM(['img', { class: 'd2ne_injected', src: link.href }], document);

                // YouTube
                } else if ((id = get_youtube_video_id(link.href)) !== null) {
                    embed_link = '//www.youtube-nocookie.com/embed/' + id + '?rel=0';
                    new_node = JS.jsonToDOM(['iframe', { class: 'd2ne_injected', width: VIDEO_WIDTH, height: VIDEO_HEIGHT, src: embed_link, frameborder: 0, webkitallowfullscreen: '', mozallowfullscreen: '', allowfullscreen: '' }], document);

                // Vimeo
                } else if ((id = get_vimeo_video_id(link.href)) !== null) {
                    embed_link = '//player.vimeo.com/video/' + id;
                    new_node = JS.jsonToDOM(['iframe', { class: 'd2ne_injected', width: VIDEO_WIDTH, height: VIDEO_HEIGHT, src: embed_link, frameborder: 0, webkitallowfullscreen: '', mozallowfullscreen: '', allowfullscreen: '' }], document);

                // Dailymotion
                } else if ((id = get_dailymotion_video_id(link.href)) !== null) {
                    embed_link = '//www.dailymotion.com/embed/video/' + id;
                    new_node = JS.jsonToDOM(['iframe', { class: 'd2ne_injected', width: VIDEO_WIDTH, height: VIDEO_HEIGHT, src: embed_link, frameborder: 0, webkitallowfullscreen: '', mozallowfullscreen: '', allowfullscreen: '', related: 0 }], document);

                // abort for this link
                } else {
                    return;
                }

                // Insert the new node if any
                if (new_node !== null) {
                    JS.insert_after(link, new_node);

                    // And hide the old node if the link is a pure URL (do not
                    // delete it to keep it in the quotes)
                    if (is_link(link.textContent)) {
                        link.style.display = 'none';
                    }
                }
            });
        });
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.FORUM,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    'img.d2ne_injected, iframe.d2ne_injected {' +
                        'max-width: 100%;' +
                    '}' +
                    'img.d2ne_injected {' +
                        'float: left;' +
                        'margin: 0 auto;' +
                        'margin-top: 16px;' +
                        'margin-bottom: 16px;' +
                    '}' +
                    '.tid_editorContent cite p {' +
                        'overflow: auto;' +
                    '}' +
                    '.tid_editorContent cite img:last-child {' +
                        'margin-bottom: 0;' +
                    '}' +
                    'iframe.d2ne_injected {' +
                        'display: block;' +
                        'margin: 0 auto;' +
                        'margin-top: 16px;' +
                        'margin-bottom: 16px;' +
                        'border: none;' +
                        'box-shadow: 0px 0px 8px black;' +
                        'border-radius: 3px;' +
                    '}' +
                    '.tid_editorContent .tid_spoil {' +
                        'clear: both;' +
                    '}'
                );

                document.addEventListener('d2n_forum_topic', function(event) {
                    var posts = JS.nodelist_to_array(document.getElementsByClassName('tid_post'));
                    replace_medias_in_forum_posts(posts);
                });
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hero_bar_stat';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Enable hero bar stat';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'On soul page, enable days stat on the hero bar.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Activer le pourcentage sur la barre héros';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Sur la page d\'âme, active le pourcentage sur la barre héros.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.SOUL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    'div.heroUpBar div.hfront {' +
                        'padding-left: 6px;' +
                        'text-align: center;' +
                        'font-family: "Century Gothic", "Arial", "Trebuchet MS", Verdana, sans-serif;' +
                        'font-size: 16pt;' +
                        'padding-top: 10px;' +
                        'color: #f0d79e;' +
                        'text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;' +
                    '}'
                );

                document.addEventListener('d2n_gamebody_reload', function() {
                    if (!(D2N.is_on_page('ghost') || D2N.is_on_page('ghost_exp'))) {
                        return;
                    }

                    JS.wait_for_selector('#ghostImg img', function(node) {
                        // abort if not hero
                        if (node.alt !== 'ghost red') {
                            return;
                        }

                        JS.wait_for_selector('#ghost_pages img.hbar', function(node) {
                            var width = parseFloat(node.style.width);
                            //  Notes:
                            //      https://docs.google.com/spreadsheet/ccc?key=0ApXnDqiuh9UWdGVFOUVSTWduemdQMlk2T29RRG1kNlE&usp=sharing
                            //  Deducted relation:
                            //      0% <=> 0px
                            //      100% <=> 590px
                            var min_width = 0;
                            var max_width = 590; //px
                            var percent = parseInt((width - min_width) / (max_width - min_width) * 100);

                            JS.wait_for_selector('div.heroUpBar div.hfront', function(node) {
                                node.textContent = percent + '%';
                            });
                        });
                    });
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_city_outside_zones_banners';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide the city and outside zones banners';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide the banner on the top of the screen when in city or outside.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher la bannière';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache l\'image en haut de l\'écran représentant le lieu où vous êtes (en ville ou dehors sur un bâtiment).';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    'div.sectionArt {' +
                        'display: none;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_footer';

    /******************
     * Module context *
     ******************/


    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide footer';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide the page footer with informations about other games, Motion Twin, etc...';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher le pied de page';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache le pied de page contenant des informations à propos des autres jeux de Motion Twin, etc...';

        I18N.set(i18n);
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false,
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '#tid_bar_down {' +
                        'display: none;' +
                    '}' +
                    '#fbAd {' +
                        'height: 0;' +
                        'overflow: hidden;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_help';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide help';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide all the helps in the interface.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher les aides';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache les aides de jeu dans toute l\'interface.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '#mapTips, a.button[href^="#city/exp?editor=1;sk="] + p, .helpLink:not(.d2ne), #generic_section > div > em:last-of-type, .help, .heroHelp, .tid_goalHelp {' +
                        'display: none;' +
                    '}'
                );

                document.addEventListener('d2n_gamebody_reload', function() {
                    if (!(D2N.is_on_page_in_city('guard'))) {
                        return;
                    }

                    // As the watch button is in a help div, if the help is hidden
                    // the button disappeared. So in this case the button is moved
                    // elsewhere in the DOM.
                    var hide_help_module = Module.get('hide_help');
                    if (hide_help_module !== null && hide_help_module.is_enabled()) {
                        JS.wait_for_class('help', function(help) {
                            JS.wait_for_selector('#generic_section a.button', function(button) {
                                button.style.marginTop = '18px';
                                button.style.marginBottom = '15px';
                                help[0].parentNode.insertBefore(button, help[0]);
                            });
                        });
                    }
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_hero_adds';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide hero adds';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide the adds for the hero mode on all the website. Can be useful if you are already hero or don\'t want to be one.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher les publicités pour le mode héros';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache les publicités pour le mode héros. C\'est pratique si vous êtes déjà héros ou si vous ne comptez pas le devenir.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false,
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return !D2NE.is_restricted_mode();
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '.heroMode, #ghostHeroAd, #heroContainer, .heroAd, #ghostHeroChoose, .promoBt, .sondageBg {' +
                        'display: none !important;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_pegi';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide PEGI logo';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide the PEGI logo at the bottom of each page.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher le logo PEGI';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache le logo PEGI en bas de page.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '.pegi {' +
                        'display: none;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_rookie_mode';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide rookie mode';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide all the links to enable the rookie mode.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher le mode apprentissage';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache tous les liens pour activer le mode apprentissage.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    'div.block.tutorialBlock, div.expertMode {' +
                        'display: none;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_rp_content';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide RP content';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide all the RP content.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher le contenu RP';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache le contenu RP (Role-Play).';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '.ambiant, .flavor, .outSpot {' +
                        'display: none;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'hide_twitter_share_button';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Hide the Twitter share button';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Hide the Twitter share button on the Gazette.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Cacher le bouton de partage Twitter';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Cache le bouton de partage Twitter sur la page de la Gazette.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.INTERFACE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '#gameBodyLight ul.linkControl {' +
                        'display: none;' +
                    '}' +
                    '#gameBodyLight div.logControl {' +
                        'margin-top: 351px;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'highlight_ap';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Highlight AP';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Add a border with a specific color (from red to green) in function of the remaining number of action point.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Colorer les PA';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Ajoute une bordure autour du nombre de PA. La couleur (du rouge au vert) varie en fonction du nombre de PA restant.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.GENERAL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                var highlight = function() {
                    D2N.get_number_of_ap(function(ap) {
                        var colors = [
                            'ff0000', // 0 AP
                            'ff4700', // 1 AP
                            'ff8e00', // 2 AP
                            'ffd500', // 3 AP
                            'e3ff00', // 4 AP
                            '9cff00', // 5 AP
                            '55ff00', // 6 AP
                            '00ff00'  // 7 AP+
                        ];

                        while (ap >= colors.length) {
                            ap -= 1;
                        }

                        JS.injectCSS(
                            '#movesCounter {' +
                                'border: 1px solid #' + colors[ap] + ' !important;' +
                            '}'
                        );
                    });
                };

                // Highlight on change
                document.addEventListener('d2n_apchange', function() {
                    highlight();
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'konami';

    /******************
     * Module context *
     ******************/

    var KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_enable_features'] = 'Congratulation ! You can enjoy the Die2Nite Enhancer advanced features by validating this popup. However, know that some of them might be unstable, source of issues and/or forbidden by the Motion Twin EULA. Under no circumstances this script developer can be held responsable of the consequences of their use. Also note that you will have to do the Konami code again to disable them.\n\nDo you want to continue?';
        i18n[I18N.LANG.EN][MODULE_NAME + '_disable_features'] = 'Do you want to disable the Die2Nite Enhancer advanced features?';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_enable_features'] = 'Félicitations ! Vous pouvez bénéficier des fonctionalités avancées de Die2Nite Enhancer en validant cette popup. Sachez toutefois que certaines d\'entre elles peuvent être instables, sources de problèmes et/ou interdites par les CGU Motion-Twin. En aucun cas le développeur de ce script ne saurait être tenu pour responsable des conséquences de leur utilisation. Notez également qu\'il faudra ressaisir le code Konami si vous souhaitez les désactiver.\n\nVoulez-vous continuer ?';
        i18n[I18N.LANG.FR][MODULE_NAME + '_disable_features'] = 'Souhaitez-vous désactiver les fonctionnalités avancées de Die2Nite Enhancer ?';

        I18N.set(i18n);
    }

    function on_konami_code()
    {
        var old_restricted_mode = D2NE.is_restricted_mode();

        if (D2NE.is_restricted_mode()) {
            D2NE.set_restricted_mode(!confirm(I18N.get(MODULE_NAME + '_enable_features')));
        } else {
            D2NE.set_restricted_mode(confirm(I18N.get(MODULE_NAME + '_disable_features')));
        }

        // if a change occured, reload the page
        if (old_restricted_mode !== D2NE.is_restricted_mode()) {
            JS.reload();
        }
    }

    var actual_index_ = -1;
    function keyboard_listener(code)
    {
        if (actual_index_ < 0 || actual_index_ >= KONAMI_CODE.length) {
            actual_index_ = 0;
        }

        if (KONAMI_CODE[actual_index_] === code) {
            actual_index_ += 1;

            if (actual_index_ >= KONAMI_CODE.length) {
                on_konami_code();
            }
        } else {
            actual_index_ = -1;
        }
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.CONTAINER,

        properties: {
            enabled: true
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                document.addEventListener('keydown', function(event) {
                    // Cancel event if the cursor is in an input field or textarea
                    if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA') {
                        return;
                    }

                    keyboard_listener(event.keyCode);
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'mask_completed_constructions';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Allow to mask completed constructions';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'While on the construction page, add a link to mask all the completed constructions.';
        i18n[I18N.LANG.EN][MODULE_NAME + '_link_show'] = 'Show completed constructions';
        i18n[I18N.LANG.EN][MODULE_NAME + '_link_hide'] = 'Hide completed constructions';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Permettre de cacher les constructions finies';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Ajoute un lien dans la page constructions permettant de cacher les constructions finies.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_link_show'] = 'Montrer les constructions finies';
        i18n[I18N.LANG.FR][MODULE_NAME + '_link_hide'] = 'Cacher les constructions finies';

        I18N.set(i18n);
    }

    /**
     * Call on a link click.
     */
    function on_link_click()
    {
        this.properties.hide_completed_constructions = !this.properties.hide_completed_constructions;
        this.save_properties();
    }

    /**
     * Insert hide/show link into the dom.
     */
    function insert_links_in_dom(node)
    {
        // if the two links are already present, then abort
        if (node.childNodes.length > 1) {
            return;
        }

        var right_link = node.firstChild;

        // Clone node and set the wanted properties (to keep the
        // right link behaviour)
        var link = right_link.cloneNode(false);
        link.style.cssFloat = 'left';
        link.textContent = this.properties.hide_completed_constructions ? I18N.get(MODULE_NAME + '_link_show') : I18N.get(MODULE_NAME + '_link_hide');

        var f = on_link_click.bind(this);
        link.addEventListener('click', function() {
            f();
        }, false);

        node.insertBefore(link, node.firstChild);
    }

    /**
     * Hide constructions if needed | Add the link.
     */
    function add_link()
    {
        // Abort if not on the building page
        if (!D2N.is_on_page_in_city('buildings')) {
            return;
        }

        // Hide the constructions if needed
        if (this.properties.hide_completed_constructions) {
            JS.injectCSS(
                'tr.building.done {' +
                    'display: none;' +
                '}'
            );
            // Else show the constructions
        } else {
            JS.injectCSS(
                'tr.building.done {' +
                    'display: table-row;' +
                '}'
            );
        }

        var f = insert_links_in_dom.bind(this);
        JS.wait_for_class('tinyAction', function(nodes) {
            f(nodes[nodes.length - 1]);
        });
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: true,
            hide_completed_constructions: false
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                if (!D2N.is_in_city()) {
                    return;
                }

                var f = add_link.bind(this);
                document.addEventListener('d2n_gamebody_reload', function() {
                    f();
                }, false);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'outside_empty_bag';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Empty the backpack in one click';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'You can empty your bagpack only one click while outside.';
        i18n[I18N.LANG.EN][MODULE_NAME + '_tooltip'] = 'Click to drop all your objects on the ground.';
        i18n[I18N.LANG.EN][MODULE_NAME + '_confirm'] = 'Are you sure you want to drop all your objects on the ground? Others players will be able to take them.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Permettre de vider son sac en une fois';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Lorsque vous êtes à l\'extérieur, il peut être pratique de vider votre sac en une fois. Cette option rend le bouton "Sac à Dos" cliquable et permet de vider son contenu entier dans l\'Outre-Monde.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_tooltip'] = 'Cliquez pour déposer tous vos objets par terre.';
        i18n[I18N.LANG.FR][MODULE_NAME + '_confirm'] = 'Êtes-vous sûr de vouloir déposer vos objets par terre ? D\'autres joueurs seront en mesure d\'en prendre possession.';

        I18N.set(i18n);
    }

    /**
     * Drop the first object in the given list.
     */
    function drop_first_item()
    {
        document.removeEventListener('d2n_gamebody_reload', drop_first_item);

        // Find the first item and try to drop it
        JS.wait_for_selector('ul.tools.shortTools.bagInv > li:nth-child(n + 3):not(.clear) > a', function found(item) {
            // if it a free slot, abort
            if (item.classList.contains('freeSlot')) {
                // all items have been dropped, reload the content
                D2N.get_session_key(function(sk) {
                    JS.injectJS('js.XmlHttp.get(' + JSON.stringify('outside/refresh?sk=' + sk) + ');');
                });
                return;
            }

            var onclick = item.getAttributeNode('onclick').nodeValue;
            var url = onclick.split('\'')[1];

            JS.injectJS('js.XmlHttp.get(' + JSON.stringify(url) + ');');

            // If in camping, try to drop an item to show the MT error and abort
            if (D2N.is_camping()) {
                return;
            }

            // When the item is removed, drop the second
            document.addEventListener('d2n_gamebody_reload', drop_first_item);
        });
    }

    /**
     * Called when the user clicks on the bagpack button.
     */
    function on_bagpack_button_click()
    {
        // if the user confirms
        if (window.confirm(I18N.get(MODULE_NAME + '_confirm'))) {
            // drop his/her objects
            drop_first_item();
        }
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.OUTSIDE,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    'ul.tools.shortTools.bagInv > li:nth-child(2) {' +
                        'cursor: pointer;' +
                    '}'
                );

                document.addEventListener('d2n_gamebody_reload', function() {
                    // if not outside, abort
                    if (!D2N.is_outside()) {
                        return;
                    }

                    // get bagpack and register the click event
                    var bagpack = JS.wait_for_selector('ul.tools.shortTools.bagInv > li:nth-child(2)', function(node) {
                        node.addEventListener('click', function() {
                            on_bagpack_button_click();
                        }, false);

                        // add the tooltip
                        JS.injectJS(
                            'var el = document.querySelector(\'ul.tools.shortTools.bagInv > li:nth-child(2)\');' +
                            'el.onmouseover = function() {' +
                                'return js.HordeTip.showSpecialTip(this, \'simpleTip\', \'\', ' + JSON.stringify(I18N.get(MODULE_NAME + '_tooltip')) + ', event);' +
                            '};' +
                            'el.onmouseout = function() {' +
                                'return js.HordeTip.hide(event);' +
                            '};'
                        );

                    });
                }, false);
            }
        }

    };
});


Module.register(function() {

    var MODULE_NAME = 'remove_soul_distinctions_scrollbar';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Remove the soul distinctions scrollbar';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'On the soul page, remove the soul distinctions scrollbar';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Enlever la barre de défilement des distinctions';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Sur la page d\'âme, enlève la barre de défilement des distinctions.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.SOUL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                JS.injectCSS(
                    '.tid_goalListWrapper, .tid_reachList {' +
                        'max-height: none !important;' +
                    '}' +
                    '.tid_bg2.tid_border2.tid_scrollBar {' +
                        'display: none;' +
                    '}' +
                    '.tid_bg3.tid_border3.tid_scrollTrack {' +
                        'height: auto;' +
                    '}' +
                    '.tid_scrollContentWrapper {' +
                        'overflow: visible;' +
                        'max-height: none;' +
                        'margin-right: 0;' +
                        'padding-top: 4px;' +
                    '}'
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'shortcuts';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Enable shortcuts';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Let you use keyboard shortcuts in town to quickly access important places (e.g.: banks, gates).';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Activer les raccourcis clavier';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Active des raccourcis claviers pour accéder rapidement aux places importantes en ville (e.g.: la banque, les portes).';

        I18N.set(i18n);
    }

    /**
     * Handle the keydown event.
     * @param integer keycode The last keycode
     * @param integer previous_keycode The last-but-one keycode
     */
    function on_keydown_event(keycode, previous_keycode) {
        if (previous_keycode !== this.properties.binds.main) {
            return;
        }

        for (var bind in this.properties.binds) {
            if (this.properties.binds[bind] === keycode) {
                return D2N.go_to_city_page(bind);
            }
        }
    }

    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false,
            binds: {
                // This bind has to be pressed first
                main: 71, // 'G'
                // Page specific bind (have to be preceded by a 'main' bind stoke)
                overview: 79, // 'O'
                home: 72, // 'H'
                well: 87, // 'W'
                bank: 66, // 'B'
                citizens: 67, // 'C'
                buildings: 68, // 'D'
                doors: 71, // 'G'
                upgrades: 80, // 'P'
                tower: 84, // 'T'
                refine: 77, // 'M'
                guard: 76 // 'L'
            }
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.GENERAL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return true;
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                var f = on_keydown_event.bind(this);

                JS.keydown_event(function(keycode, previous_keycode) {
                    f(keycode, previous_keycode);
                });
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'show_spoiler';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Show the spoilers without mouse hover';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Show the spoilers content without hovering with your mouse.';

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Afficher les spoilers sans passer la souris';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Affiche le contenu des spoilers sans avoir besoin de passer la souris.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.INTERFACE_ENHANCEMENT,

        properties: {
            enabled: false
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.FORUM,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return !D2NE.is_restricted_mode();
            },

            init: function() {
                add_i18n();
            },

            load: function() {
                var css =
                    '.tid_editorContent .tid_spoil {';

                // If davf's module is loaded, we need to adapt the CSS rules
                var old_forum_tags = Module.get('davf_old_forum_tags');
                if (old_forum_tags !== null && old_forum_tags.is_enabled()) {
                    css +=
                        'background-image: url("/gfx/design/spoiler.gif") !important;' +
                        'background-color:transparent !important;' +
                        'color : #98a675 !important;';

                // If not loaded, just do the normal ones
                } else {
                    css +=
                        'background-image: url("http://data.twinoid.com/img/design/spoiler_hover.png");';
                }

                css +=
                    '}' +
                    '.tid_editorContent .tid_spoil *, .tid_editorContent .tid_wspoil {' +
                        'visibility: visible !important;' +
                    '}' +
                '';

                JS.injectCSS(css);
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'sync_bbh';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.FR] = {};
        i18n[I18N.LANG.FR][MODULE_NAME + '_name'] = 'BigBroth\'Hordes';
        i18n[I18N.LANG.FR][MODULE_NAME + '_short_desc'] = 'Activer la synchronisation BBH (hors-Pandémonium)';
        i18n[I18N.LANG.FR][MODULE_NAME + '_full_desc'] = 'Ajoute la possibilité de synchroniser avec BigBroth\'Hordes. Ne fonctionne pas en Pandémonium.';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.EXTERNAL_TOOL,

        properties: {
            enabled: false,
            tool: {
                directory_id: 51,
                api_key: null,
                update_method: 'POST',
                update_url: 'http://bbh.fred26.fr/update.php'
            }
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.EXTERNAL_TOOL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return D2N.is_on_hordes();
            },

            init: function() {
                add_i18n();
            },

            update: function(callback_success, callback_failure) {
                JS.network_request(
                    this.properties.tool.update_method,
                    this.properties.tool.update_url,
                    'key=' + this.properties.tool.api_key + '&action=force_maj',
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    function(response_text) {
                        var parsed_xml = JS.parse_xml(response_text);
                        var hordes_node = parsed_xml.firstChild;
                        var answer = hordes_node.childNodes[1];

                        if (answer && answer.tagName === 'error' && answer.getAttribute('code') === 'ok') {
                            return callback_success();
                        }
                        return callback_failure();
                    },
                    function() {
                        return callback_failure();
                    }
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'sync_duskdawn';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_name'] = 'From Dusk Till Dawn';
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Enable Dusk Dawn sync';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Add the possibility to sync with Dusk Dawn';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.EXTERNAL_TOOL,

        properties: {
            enabled: false,
            tool: {
                directory_id: 14,
                api_key: null,
                update_method: 'POST',
                update_url: 'http://d2n.duskdawn.net/zone/extended'
            }
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.EXTERNAL_TOOL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return D2N.is_on_die2nite();
            },

            init: function() {
                add_i18n();
            },

            update: function(callback_success, callback_failure) {
                // Do not update if not outside
                if (!D2N.is_outside()) {
                    return callback_failure();
                }

                JS.network_request(
                    this.properties.tool.update_method,
                    this.properties.tool.update_url,
                    'key=' + this.properties.tool.api_key,
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    function(response_text) {
                        return callback_success();
                    },
                    function() {
                        return callback_failure();
                    }
                );
            }
        }

    };
});

Module.register(function() {

    var MODULE_NAME = 'sync_mapviewer';

    /******************
     * Module context *
     ******************/

    /**
     * Add the i18n strings for this module.
     */
    function add_i18n()
    {
        var i18n = {};

        i18n[I18N.LANG.EN] = {};
        i18n[I18N.LANG.EN][MODULE_NAME + '_name'] = 'Map Viewer';
        i18n[I18N.LANG.EN][MODULE_NAME + '_short_desc'] = 'Enable Map Viewer sync';
        i18n[I18N.LANG.EN][MODULE_NAME + '_full_desc'] = 'Add the possibility to sync with Map Viewer';

        I18N.set(i18n);
    }


    /************************
     * Module configuration *
     ************************/

    return {

        name: MODULE_NAME,
        type: Module.TYPE.EXTERNAL_TOOL,

        properties: {
            enabled: false,
            tool: {
                directory_id: 1,
                api_key: null,
                update_method: 'POST',
                update_url: 'http://die2nite.gamerz.org.uk/plugin'
            }
        },

        configurable: {
            enabled: {
                category: Module.PROPERTY_CATEGORY.EXTERNAL_TOOL,
                type: Module.PROPERTY.BOOLEAN,
                short_desc_I18N: MODULE_NAME + '_short_desc',
                full_desc_I18N: MODULE_NAME + '_full_desc'
            }
        },

        actions: {
            can_run: function() {
                return D2N.is_on_die2nite();
            },

            init: function() {
                add_i18n();
            },

            update: function(callback_success, callback_failure) {
                // Do not update if not outside
                if (!D2N.is_outside()) {
                    return callback_failure();
                }

                JS.network_request(
                    this.properties.tool.update_method,
                    this.properties.tool.update_url,
                    'key=' + this.properties.tool.api_key,
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    function(response_text) {
                        if (/Zone -?\d+\/-?\d+ was updated successfully/.test(response_text)) {
                            return callback_success();
                        }
                        return callback_failure();
                    },
                    function() {
                        return callback_failure();
                    }
                );
            }
        }

    };
});

// In Safari, it is not possible to exclude domain from the configuration file.
// So the extension will be loaded on external tools domain (because I need to
// ask the user permission to perform Cross-Domain HTTP requests).
// Therefore, if I'm in Safari, but not on a game website, abort.
if (typeof safari !== 'undefined' && !D2N.is_on_game_website()) {
    return;
}

D2NE.init();

})();
