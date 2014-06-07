// ==UserScript==
// @name           Firefall Forum Section Closer
// @namespace      http://userscripts.org/users/269252
// @author         Snehonja
// @version        1.0
// @description    This script adds buttons to section headings which can be used to collapse (and expand) them again.
// @homepageURL    https://userscripts.org/scripts/show/173619
// @updateURL      https://userscripts.org/scripts/show/173619
// @include        http://forums.firefallthegame.com/community/
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


settingsCookie_ExpiryDays = 365;
settingsCookie_NamePrefix = 'fffsc_';

function isClosed(node) {
    var name  = settingsCookie_NamePrefix + getNodeName(node);
    var testPattern = new RegExp('\\b'+name+'=1;?\\b');
    return testPattern.test(document.cookie);
}

function setClosed(node, value) {
    var name   = settingsCookie_NamePrefix + getNodeName(node);
    var value  = (value) ? '1' : '0';
    
    var date = new Date();
	date.setTime(date.getTime() + settingsCookie_ExpiryDays * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
}

function getNodeName (node) {
    return /\bnode_\d+\b/.exec(node.attr('class'));
}

function expandNode(node) {
    node.find('> ol.nodeList').show();
    node.find('a.toggleButton').text('-');
    setClosed(node, false);
}

function reduceNode(node) {
    node.find('> ol.nodeList').hide();
    node.find('a.toggleButton').text('+');
    setClosed(node, true);
}

function toggleNode (node) {
    var subnodes     = node.find('ol.nodeList > li');
    var toggleButton = node.find('a.toggleButton')
    if (subnodes.filter(':visible').length > 0) {
        reduceNode(node);
    } else {
        expandNode(node);
    }
}

function initNode (node) {
    prepareNode(node);
    if (isClosed(node)) {
        reduceNode(node);
    }
}

function prepareNode (node) {
    node.find('> div.nodeInfo > div.categoryText')
    .css({
        'margin-left':'15px',
    })
    .prepend( 
        $(document.createElement('a'))
        .text('-')
        .click($.proxy(toggleNode, null, node))
        .addClass('toggleButton')
        .css({
            'position':'absolute',
            'bottom':'22px',
            'left' : '12px',
            'color':'rgb(243,174,0)',
            'font-size':'28px',
            'cursor':'pointer',
            'z-index':'2',
        })
    );
}

$('ol#forums > li').each(function (_,node) {
    initNode($(node));
});

function checkNewNode (node) {
    node = $(node);
    if (node.is('ol#forums > li')) {
        initNode($(node));
    }
}

function registerObserver () {
    var nodeList = $('ol#forums')[0];
    if (MutationObserver) {
        var observer = new MutationObserver(function(events) {
            console.log(events);
            for (var i = 0; i < events.length; i++) {
                for (var j = 0; j < events[i].addedNodes.length; j++) {
                    checkNewNode(events[i].addedNodes[j]);
                }
            }
        });
        observer.observe(nodeList, {childList:true});
    } else {
        $(nodeList).on('DOMNodeInserted', function (e) {
            checkNewNode(e.target);
        });
    }
}

registerObserver();