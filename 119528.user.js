// ==UserScript==
// @name           BoK Hacks
// @namespace      jokajak
// @description    BoK hacks
// @include        https://bok.noc.gatech.edu/
// ==/UserScript==
// vim:sw=2:ts=2:smarttab
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
            if (el.nodetype === 1 && (!tag || el.tagName.toLowerCase() === tag)) {
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

function showBokHacks() {
// main_content_div is what needs to be replaced
// get the main div
var mainDiv = DOM.get('main_content_div');
var bokContent = document.createTextNode("I'm hacking your BoK");
// remove all DOM elements under mainDiv
while (mainDiv.childNodes.length >= 1) {
  mainDiv.removeChild(mainDiv.firstChild);
}
mainDiv.appendChild(bokContent);
}

// get menu bar
var ulElements = document.getElementsByTagName("ul");
var navbar = ulElements[0];

// create our li entry
var bokHacks = document.createElement('li');

// create our link
var bokLink = document.createElement('a');
bokLink.addEventListener('click', showBokHacks, true);

// create the content
var bokLinkContent = document.createTextNode('BoK Hacks');

// attach the content to the link
bokLink.appendChild(bokLinkContent);
// attach the link to the span
bokHacks.appendChild(bokLink);
// append the span to the menu bar
navbar.appendChild(bokHacks);

