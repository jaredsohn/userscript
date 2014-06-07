// ==UserScript==
// @name        Simple Hooks
// @namespace   Hooks
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

/**
 * Script taken from (http://www.velvetcache.org/2010/08/19/a-simple-javascript-hooks-system)
 * uploaded to UserScripts so it can be @require'd
 */
var Hook = {
    hooks: [],

    register: function (name, callback) {
        if ('undefined' == typeof (Hook.hooks[name]))
            Hook.hooks[name] = []
        Hook.hooks[name].push(callback)
    },

    call: function (name, arguments) {
        if ('undefined' != typeof (Hook.hooks[name]))
            for (i = 0; i < Hook.hooks[name].length; ++i)
                if (true != Hook.hooks[name][i](arguments))
                    break;
    }
}