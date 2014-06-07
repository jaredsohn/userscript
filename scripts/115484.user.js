// ==UserScript==
// @name           owb little helpers
// @namespace      skyboy
// @description    small functions for internal using
// @include        *
// ==/UserScript==
var win = unsafeWindow || window;
win.skyboy = {};
win.skyboy.helpers = {
    getOnlyElement: function(selector) {
        var items = jQuery(selector);
        switch (items.length) {
        case 0:
            throw "There are no such elements as " + selector;
        case 1:
            return items;
        default:
            throw "There are too many(" + items.length.toString() + ") elements as " + selector;
        }
    },

    click: function(buttonSelector) {
        getOnlyElement(buttonSelector).trigger("click");
    },

    mousedown: function(selector) {
        getOnlyElement(buttonSelector).trigger("mousedown");
    },

    mouseup: function(selector) {
        getOnlyElement(buttonSelector).trigger("mouseup");
    },

    getRandomItem: function(items) {
        var index = Math.floor(items.length * Math.random());
        return items[index];
    }
};