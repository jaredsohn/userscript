// ==UserScript==
// @name          My First GM script
// @namespace     http://htmlblog.net
// @description   basic <a href="https://addons.mozilla.org/firefox/addon/748" target="_blank">Greasemonkey</a> script
// @include       http://www.facebook.com/
// ==/UserScript==
DOM = function () {

    function get(id) {
        if (id && typeof id === 'string') {
            id = document.getElementById(id);
        }
        return id || null;
    }

    function walk(element, tag, walk, start, all) {
        var el = get(element)[start || walk], elements = all ? [] : null;
        while (el) {
            if (el.nodeType === 1 && (!tag || el.tagName.toLowerCase() === tag)) {
                if (!all) {
                    return el;
                }
                elements.push(el);
            }
            el = el[walk];
        }
        return elements;
    }

    return {

        // Get the element by its id
        get: get,

        walk: walk,

        // Returns the previousSibling of the Element (excluding text nodes).
        getPrevious: function (el, tag) {
            return walk(el, tag, 'previousSibling');
        },

        // Like getPrevious, but returns a collection of all the matched previousSiblings.
        getAllPrevious: function (el, tag) {
            return walk(el, tag, 'previousSibling', null, true);
        },

        // As getPrevious, but tries to find the nextSibling (excluding text nodes).
        getNext: function (el, tag) {
            return walk(el, tag, 'nextSibling');
        },

        // Like getNext, but returns a collection of all the matched nextSiblings.
        getAllNext: function (el, tag) {
            return walk(el, tag, 'nextSibling', null, true);
        },

        // Works as getPrevious, but tries to find the firstChild (excluding text nodes).
        getFirst: function (el, tag) {
            return walk(el, tag, 'nextSibling', 'firstChild');
        },

        // Works as getPrevious, but tries to find the lastChild.
        getLast: function (el, tag) {
            return walk(el, tag, 'previousSibling', 'lastChild');
        },

        // Works as getPrevious, but tries to find the parentNode.
        getParent: function (el, tag) {
            return walk(el, tag, 'parentNode');
        },

        // Like getParent, but returns a collection of all the matched parentNodes up the tree.
        getParents: function (el, tag) {
            return walk(el, tag, 'parentNode', null, true);
        },

        // Returns all the Element's children (excluding text nodes).
        getChildren: function (el, tag) {
            return walk(el, tag, 'nextSibling', 'firstChild', true);
        },

        // Removes the Element from the DOM.
        dispose: function (el) {
            el = get(el);
            return (el.parentNode) ? el.parentNode.removeChild(el) : el;
        }

    };
}();
