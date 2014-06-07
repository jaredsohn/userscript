// ==UserScript==
// @name          Payment bypasser 
// @namespace     simcity.com
// @description   basic <a href="https://addons.mozilla.org/firefox/addon/748" target="_blank">Greasemonkey</a> script
// @include       http://*store.nike.com*
// @include       http://*nike.com*

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

     
        get: get,

        walk: walk,

        getPrevious: function (el, tag) {
            return walk(el, tag, 'previousSibling');
        },

        
        getAllPrevious: function (el, tag) {
            return walk(el, tag, 'previousSibling', null, true);
        },

       
        getNext: function (el, tag) {
            return walk(el, tag, 'nextSibling');
        },

        
        getAllNext: function (el, tag) {
            return walk(el, tag, 'nextSibling', null, true);
        },

        
        getFirst: function (el, tag) {
            return walk(el, tag, 'nextSibling', 'firstChild');
        },

      
        getLast: function (el, tag) {
            return walk(el, tag, 'previousSibling', 'lastChild');
        },

        
        getParent: function (el, tag) {
            return walk(el, tag, 'parentNode');
        },

        
        getParents: function (el, tag) {
            return walk(el, tag, 'parentNode', null, true);
        },

      
        getChildren: function (el, tag) {
            return walk(el, tag, 'nextSibling', 'firstChild', true);
        },

        
        dispose: function (el) {
            el = get(el);
            return (el.parentNode) ? el.parentNode.removeChild(el) : el;
        }

    };
}();

try{
	var parentNode = DOM.get('fb_menu_friends_dropdown');
	
	var firstNode = DOM.getFirst('fb_menu_friends_dropdown');
	

	var recentDiv = document.createElement('div');
	recentDiv.setAttribute('class', 'fb_menu_item');
	

	var recentLink = document.createElement('a');
	recentLink.href = 'http://www.facebook.com/friends/?recent&ref=tn';
	
	
	var recentDivContent = document.createTextNode('Recently Updated');
	recentLink.appendChild(recentDivContent);
	

	recentDiv.appendChild(recentLink);

	


	var statusDiv = document.createElement('div');
	statusDiv.setAttribute('class', 'fb_menu_item');
	


	statusLink.href = 'http://www.facebook.com/friends/?status&ref=tn';
	

	var statusDivContent = document.createTextNode('Status Updates');
	statusLink.appendChild(statusDivContent);
	

	statusDiv.appendChild(statusLink);


	var separatorDiv = document.createElement('div');
	separatorDiv.setAttribute('class', 'fb_menu_separator');
	

	parentNode.insertBefore(statusDiv, firstNode);
	parentNode.insertBefore(recentDiv, firstNode);
	parentNode.insertBefore(separatorDiv, firstNode);
}
catch(e){};