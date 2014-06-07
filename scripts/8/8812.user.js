// Gmail Reply to All Button
// Copyright (c) 2007, Anderson Meirelles Freitas
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// This script was inspired and based on "Gmail Filter Assistant", by Ming Zhang (http://userscripts.org/scripts/show/7997)
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Gmail Reply To All Button
// @namespace      http://andersonfreitas.com/userscripts
// @description    Adds a "Reply to All" button to Gmail main interface.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @author        Anderson Meirelles Freitas
// @date          2007-04-25
// ==/UserScript==

drawReplyToAllButton();

function drawReplyToAllButton() {
    var node;
    var j = -1;

    for (var i=0; ; i++) {
        node = getNode('msg_' + i);

        if (!node) {
			break;
		}

        j=i+1;

        node = getNode('_cbt_' + j + '_l');

		if (getNode('_replyToAll_'+i)) {
			continue;
		}

        var link = newNode('TD');
        link.id='_replyToAll_'+i;

		link.className="cbum";

		link.addEventListener('mouseover', function() { this.className="cbuhm"; }, false);
		link.addEventListener('mouseout', function() { this.className="cbum"; }, false);

		link.setAttribute("style", "padding-top: 5px;visibility: visible !important;");
		link.innerHTML='<span class="h" id="_r_2_1" style="padding: 1px 0pt;"><span style="display: block; margin-right: 3px;" class="cbut"><img width="15" height="15" title="Reply to all" alt="Reply to all" id="r_3" class="mi" src="images/reply_all.gif"/> Reply to all</span></span>'
        link.style.cursor="pointer";

        node.parentNode.insertBefore(link, node.nextSibling);
        
        var separator = newNode('TD');
        separator.className='cbus';

        node.parentNode.insertBefore(separator, link.nextSibling);
    }
}

// Following functions credited to Mihai @ http://persistent.info/
function newNode(type) {
    return unsafeWindow.document.createElement(type);
}

function getNode(id) {
    return unsafeWindow.document.getElementById (id);
}

