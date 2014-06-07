// ==UserScript==
// @name           Userscripts.org Draggable Reply Box
// @namespace      http://userscripts.org/users/23652
// @description    Gives the reply box drag power so you can read other replies
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @exclude        http://userscripts.org/topics/new*
// @exclude        https://userscripts.org/topics/new*
// @copyright      JoeSimmons
// @version        1.0.9
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL    http://userscripts.org/scripts/source/47752.user.js
// @updateURL      http://userscripts.org/scripts/source/47752.meta.js
// @grant          GM_addStyle
// ==/UserScript==

(function () {

    // Get ID
    function $(ID) {
        return document.getElementById(ID);
    }

    // addGlobalStyle
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function dragStart(e, id) {
        e.preventDefault();
        scrollY = window.scrollY;
        maxY = (window.innerHeight-$(box).offsetHeight)+1;
        if (id && id!='') dragObj.elNode = $(id);
            else dragObj.elNode = e.target;
        if (dragObj.elNode.nodeType === 3) {
            dragObj.elNode = dragObj.elNode.parentNode;
        }
        dragObj.cursorStartX = e.clientX + window.scrollX;
        dragObj.cursorStartY = e.clientY + window.scrollY;
        dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
        dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
        dragObj.elNode.style.zIndex = dragObj.zIndex + 1;
        dragObj.zIndex += 1;
        document.addEventListener('mousemove', dragGo, false);
        document.addEventListener('mouseup', dragStop, false);
    }

    function dragGo(e) {
    /*
        with(dragObj) {
        var newY = ((elStartTop+e.clientY)+scrollY)-cursorStartY;
        if (newY >= 0 && newY < maxY) elNode.style.top = newY+'px';
        }
    */
        var newY = ( (dragObj.elStartTop + e.clientY) + scrollY ) - dragObj.cursorStartY;
        if (newY >= 0 && newY < maxY) {
            dragObj.elNode.style.top = newY + 'px';
        }
    }

    function dragStop(e) {
        document.removeEventListener('mousemove', dragGo, false);
        document.removeEventListener('mouseup', dragStop, false);
    }

    var dragObj = {
            'zIndex' : 0,
            cursorStartX : 0,
            cursorStartY : 0,
            elStartLeft : 0,
            elStartTop : 0,
            elNode : null
        },
        edits = document.evaluate('.//a[contains(@href, "/edit") and contains(., "Edit post")]', document.body, null, 6, null),
        i = edits.snapshotLength,
        moveSrc = 'data:image/jpeg;base64,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',
        x, y;

    // Kill script also if there's no reply box, there's no body (rare error), or uso is in a frame (also rare)
    if (window.self !== window.top || !document.body || !$('reply') ) { return; }

    while (edit=edits.snapshotItem(--i)) {
        edit.addEventListener('click', function () {
            box='edit';
            var t = document.createElement('div');
            t.id = 'drag_edit_test';
            $('edit').appendChild(t);
            var intv = setInterval(function () {
                if (!$('drag_edit_test') && $('edit').offsetHeight>100) {
                    clearInterval(intv);
                    setTimeout(function () {
                        var edit = $('edit'),
                            moveedit = document.createElement('img');
                        moveedit.id = 'drag_edit';
                        moveedit.setAttribute('style', 'margin-left:4px;margin-top:4px;');
                        moveedit.setAttribute('src', moveSrc);
                        moveedit.addEventListener('mousedown', function (e) {
                            dragStart(e, 'edit');
                        }, false);
                        edit.style.top = window.innerHeight/2+'px';
                        edit.insertBefore(moveedit, edit.firstChild);
                        edit.style.top = (window.innerHeight-edit.offsetHeight)+'px';
                    }, 500);
                }
            }, 100);
        }, false);
    }
    var reply = $('reply'),
        scrollY = window.scrollY,
        box = 'reply',
        maxY = (window.innerHeight - reply.offsetHeight) + 1,
        move = document.createElement('img');
    move.src = moveSrc;
    move.setAttribute('style', 'margin-left: 4px; margin-top: 4px;');
    move.id = 'drag_reply';
    move.addEventListener('mousedown', function (e) {
        dragStart(e, 'reply');
    }, false);
    reply.insertBefore(move, reply.firstChild);
    addGlobalStyle('div.editbox { bottom:auto !important; }');

    // Quote script workaround
    reply.style.display = '';
    reply.style.top = '-9999px';
    reply.style.top = (window.innerHeight - reply.offsetHeight)+'px';
    reply.style.display = 'none';

    var replylink = document.evaluate('//a[contains(.,"Reply to topic")]',document,null,9,null).singleNodeValue;
    if (replylink) replylink.addEventListener('click', function (e) {
        box = 'reply';
        $('reply').style.top = ( ( window.innerHeight - $('reply').offsetHeight) ) +'px';
    }, false);

    // Might make the reply box be able to be clicked on to move, not just the icon
    //reply.addEventListener('mousedown', function(e){dragStart(e);}, false);

    // Debugging tool
    /*
    var info = document.createElement('div');
        info.setAttribute('style', 'position:fixed; top:0; left:0; padding:20px; background:#eee; color#000; border:2px solid #000; z-index:99999;');
        document.body.appendChild(info);
    */

}());