// ==UserScript==
// @name           Firefall Forum Europe Expander
// @namespace      http://userscripts.org/users/269252
// @author         Snehonja
// @version        1.1
// @description    This script allows you to expand the European sections of the Firefall community forums. 
// @homepageURL    https://userscripts.org/scripts/show/173559
// @updateURL      https://userscripts.org/scripts/show/173559
// @include        http://forums.firefallthegame.com/community/
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


settingsCookie_ExpiryDays = 365;
settingsCookie_NamePrefix = 'fffee_';


europeanNode = $('li[id="european-communities.241"]');
europeanNodeText = europeanNode.find('div.categoryText h3.nodeTitle a');

function isExpanded(node) {
    var name  = settingsCookie_NamePrefix + getNodeName(node);
    var testPattern = new RegExp('\\b'+name+'=1;?\\b');
    return testPattern.test(document.cookie);
}

function setExpanded(node, value) {
    var name   = settingsCookie_NamePrefix + getNodeName(node);
    var value  = (value) ? '1' : '0';
    
    var date = new Date();
	date.setTime(date.getTime() + settingsCookie_ExpiryDays * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
}

function getNodeName (node) {
    return /\bnode_\d+\b/.exec(node.attr('class'));
}

function expandNode (node) {
    node.hide();
    getExpandedNode(node).show();
    setExpanded(node, true);
    autoHideEurope();
    europeanNodeText.text("Other European Communities");
}

function reduceNode (node) {
    node.show();
    getExpandedNode(node).hide();
    setExpanded(node, false);
    europeanNode.show();
    autoNameEurope();
}

function autoHideEurope () {
    var nodeList = europeanNode.find('> ol.nodeList');
    var nodeListHidden = nodeList.is(':hidden');
    nodeList.show();
    if (europeanNode.find('ol.nodeList > li').filter(':visible').length < 1) {
        europeanNode.hide();
    }
    if (nodeListHidden) {
        nodeList.hide();
    }
}

function autoNameEurope () {
    var nodeList = europeanNode.find('> ol.nodeList');
    var nodeListHidden = nodeList.is(':hidden');
    nodeList.show();
    if (europeanNode.find('ol.nodeList > li').filter(':hidden').length < 1) {
        europeanNodeText.text("European Communities");
    }
    if (nodeListHidden) {
        nodeList.hide();
    }
}

function getExpandedNode(node) {
    var expandedNode = $('li.category.level_1.' + getNodeName(node));
    if (expandedNode.length > 0) {
        return expandedNode;
    } else {
        return createExpandedNodeFor(node);
    }
}

function createExpandedNodeFor(node) {
    var expandedNode = $(document.createElement('li'))
        .addClass('node category level_1 ' + getNodeName(node))
        .append(
            $(document.createElement('div')).addClass('nodeInfo categoryNodeInfo categoryStrip')
            .append(
                $(document.createElement('div'))
                .addClass('catLeft')
            ).append(
                $(document.createElement('div'))
                .addClass('catRight')
            ).append(
                $(document.createElement('div'))
                .addClass('categoryText')
                .append(
                    $(document.createElement('h3'))
                    .addClass('nodeTitle')
                    .append(
                        node.find('h3.nodeTitle a').clone()
                    )
                ).append(
                    $(document.createElement('a'))
                    .text('\u21f2')
                    .css({
                        'position':'absolute',
                        'right':'8px',
                        'color':'rgb(243,174,0)',
                        'bottom':'18px',
                        'font-size':'22px',
                        'cursor':'pointer',
                        'z-index':'2',
                    })
                    .click($.proxy(reduceNode, null, node))
                )
            )
        ).append(
            $(document.createElement('ol'))
            .addClass('nodeList')
        ).insertBefore(europeanNode);
        
    insertSubnodes(expandedNode);
    
    return expandedNode;
}

function insertSubnodes(node, url) {
    var subnodeList = node.find('ol.nodeList');
    var url         = node.find('h3.nodeTitle a').attr('href');
    $.get(url).done($.proxy(insertSubnodesFromHTML, null, subnodeList));
}

function insertSubnodesFromHTML (parentNode, htmlData) {
    var nodes = $(htmlData).find('ol.nodeList.sectionMain > li');
    parentNode.append(nodes);
}

function addNodeExpander(node) {
    var nodeInfo     = node.find('div.nodeInfo');
    var wrapper      = $(document.createElement('div'));
    var nodeExpander = $(document.createElement('a')).text('\u21f1');
    wrapper.append(nodeInfo.children());
    nodeInfo.append(wrapper);
    nodeInfo.css({
        'overflow':'visible',
    });
    wrapper.css({
        'overflow':'hidden',
        'position':'relative',
        'min-height':'60px',
    });
    nodeExpander.css({
        'color':'rgb(5,179,210)',
        'font-size':'22px',
        'position':'absolute',
        'left':'-11px',
        'top':'-13px',
        'cursor':'pointer',
    });
    nodeInfo.prepend(nodeExpander);
    nodeExpander.click($.proxy(expandNode, null, node));
}

europeanNode.find('ol.nodeList > li').each(function (_, node) {
    node = $(node);
    addNodeExpander(node);
    if (isExpanded(node)) {
        expandNode(node);
    }
});