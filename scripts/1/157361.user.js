// ==UserScript==
// @name            SyncTube: Alternative UI
// @description     
// @author          Chris H (Zren / Shade)
// @icon            http://www.synchtube.com/images/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/157361
// @downloadURL     http://userscripts.org/scripts/source/157361.user.js
// @updateURL       http://userscripts.org/scripts/source/157361.meta.js
// @namespace       http://xshade.ca
// @version         1.1
// @include         http://www.synchtube.com/r/*
// ==/UserScript==

// Can't use !important with javascript element.style.___ so we need to inject CSS.
// http://stackoverflow.com/a/462603/947742
function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

/*
var newStage = document.createElement('div');
newStage.id = 'newStage';
document.body.insertBefore(newStage, document.body.firstChild);
newStage.appendChild(document.getElementById('media'));
newStage.appendChild(document.getElementById('chat'));
*/

addNewStyle("#newStage { display: block; }");
addNewStyle("html,body,#newStage,#media,#media object { width: 100%; height: 100%; }");
addNewStyle("#media, #chat { float: none; display: inline-block; position: initial; }");
addNewStyle("#chat #chat_controls, #chat #join-chat, #chat #cin, #chat > * { width: 100%; }");
addNewStyle("#chat{ height: 100%; background: white; }");
addNewStyle("#chat #chat_list, #chat #cin { width: 100%;}");
addNewStyle("#chat #chat_users{ width: 25%; height: 100%; }");
addNewStyle("#chat #chatArea { width: 100%; height: 100%; overflow: hidden; }");
addNewStyle("#chat #chatBox { width: 74%; height: 100%; }");
addNewStyle("#chat #chatListWrapper { height: 95%; }");
addNewStyle("#chat #chat_list { padding: 0; height: 100%; }");
addNewStyle("#chat #cin { padding: 1%; width: 98%; height: 3%; }");
addNewStyle("#chat #chat_controls { position: relative; top: 0; right: 8px; }");
addNewStyle("#chat #chat_controls .controls { width: 24px; }");
addNewStyle(".st-vanilla-stage-ct { display: none; }");
addNewStyle("#chat #join-chat { position: inherit; height: 5%; }");
addNewStyle("#chat #join-chat input { width: 100px; margin: 0; }");

function onJQueryLoad(callback) {
    function wait() {
        console.log('tick');
        if (typeof unsafeWindow.jQuery == 'undefined') {
            console.log('wait');
         	window.setTimeout(wait, 100);
        } else {
            console.log('run');
            callback(unsafeWindow.jQuery);
        }
    }
    wait();
}

onJQueryLoad(function($) {
    var chatAreaWidthPercent = 30;
    
    function showChat() {
        $('#media').animate({
            width: (100-chatAreaWidthPercent) + '%'
        }, 100, function() {
            $('#chat_hover_overlay').css({'display': 'none'});
            $('#chat_controls').css({'display': 'block'});
        });
        $('#chat').animate({
            'width': chatAreaWidthPercent + '%'
        }, 100, function() {
            $('#chat').css({display: 'inline-block'});
        });
    }
    
    function hideChat() {
        $('#chat').animate({
            width: '0'
        }, 100, function() {
            $('#chat').css({display: 'none'});
            $('#chat_hover_overlay').css({display: 'block'});
            $('#chat_controls').css({display: 'none'});
        });
        $('#media').animate({
            width: '100%'
        }, 100);
    }
    
    function onInsert(e) {
        $('html, body').scrollTop(0);
        
        if ($('#media param[name="wmode"]')) {
            $('#media param[name="wmode"]').remove();
        } else {
        	$(e.target).bind('DOMNodeInserted', onInsert);
        }
    }
    
    
    $(document).ready(function() {
        var $newStage = $('<div></div>');
        $newStage.attr('id', 'newStage');
        $(document.body).prepend($newStage);
        $newStage.append($('#media'));
        $newStage.append($('#chat'));
    
		$('#media param[name="wmode"]').remove(); // The player doesn't paint over the background -> control bar after effects.
        $('#media').bind('DOMNodeInserted', onInsert);
        $('html, body').scrollTop(0);
    });
    
    
    
    
    var $hoverElement = $('<div></div>');
	$hoverElement.attr('id', 'chat_hover_overlay');
    $hoverElement.css({
        width: '12px',
        height: '100%',
        position: 'absolute',
        top: '0',
        right: '0',
        'z-index': '99999'
    });
    $hoverElement.hover(showChat, function(){});
    $('#chat').hover(function(){}, function() {
        if ($('#toggle_autoHideChat').is(':checked')) {
            hideChat();
        }
    });
    $('#chat .ui-resizable-handle').remove();
    $(document.body).append($hoverElement);
    var $chatArea = $('<div></div>');
    $chatArea.attr('id', 'chatArea');
    var $chatBox = $('<div></div>');
    $chatBox.attr('id', 'chatBox');
    var $chatListWrapper = $('<div></div>');
    $chatListWrapper.attr('id', 'chatListWrapper');
    $('#chat').prepend($chatArea);
    $chatArea.append($('#chat_users'));
    $chatArea.append($chatBox);
    $chatBox.append($chatListWrapper);
    $chatBox.append($('#join-chat'));
    $chatBox.append($('#cin'));
    $chatListWrapper.append($('#chat_controls'));
    $chatListWrapper.append($('#chat_list'));
    var $toggleAutoHideChat = $('<input type="checkbox" id="toggle_autoHideChat">');
    
    $toggleAutoHideChat.css({
        width: '16px', 
        height: '16px',
        margin: '0'
    });
    $toggleAutoHideChat.tipTip({content:"AutoHide the chat window.",fadeIn:0,fadeOut:0,defaultPosition:"top"});
    $('#chat_controls .controls').css({
        // Stop the chat window from closing when a tooltip appeers.
        'z-index': '100000' // #tiptip_holder { z-index: 99999; } +1
    });
    $('#chat_controls .controls').append($('<div class="toggle"></div>').append($toggleAutoHideChat));
    
    $toggleAutoHideChat.prop('checked', false);
    $('#toggle_autoHideChat').is(':checked') ? hideChat() : showChat();
});