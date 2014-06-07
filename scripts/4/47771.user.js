// ==UserScript==
// @name           Userscripts.org Preview Posts
// @namespace      http://userscripts.org/users/23652
// @description    Allows previewing of userscripts.org posts and post edits with auto-update
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @include        http://userscripts.org/messages/new*
// @include        https://userscripts.org/messages/new*
// @require        http://userscripts.org/scripts/source/172971.user.js?name=JoeSimmonsLibrary
// @copyright      JoeSimmons
// @version        1.2.5
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL    http://userscripts.org/scripts/source/47771.user.js
// @updateURL      http://userscripts.org/scripts/source/47771.meta.js
// ==/UserScript==

(function uso_preview_posts() {

'use strict';

var preview;

function showing(e) {
    e = JSL.elem(e);
    return e ? Math.max(e.offsetWidth, e.offsetHeight) > 0 : false;
}

function whenShown(id, func) {
    var i = 0,
        intv = JSL.setInterval(function () {
            var node = JSL.elem(id);
            if ( node && showing(node) ) {
                JSL.clearInterval(intv);
                func();
            }
            if (i > 50) {
                JSL.clearInterval(intv);
            }
            i += 1;
        }, 100);
}

function handle_click(event) {
    var elem = event.target,
        text = elem.textContent; // declared vars for readability
    switch(text) {
        case 'Reply to topic': {
            onReplyClick();
            break;
        }
        case 'Edit post': {
            onEditClick();
        }
    }
}

function previewIt() {
    var nodes = [
            'message_body',
            'edit_post_body',
            'post_body',
            'topic_body'
        ],
        link_regex = /href=[''](https?:\/\/([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\/[^\s'']+)?)[''][^>]*>[^<]+<\/a>/g,
        node, post, i;

    for (i = 0; i < nodes.length; i += 1) {
        node = JSL.id( nodes[i] );
        if ( node && showing(node) ) {
            post = node.value;
            break;
        }
    }

    // if their post isn't empty, show the preview
    if (post.length > 0) {
        JSL.id('uso_preview_frame').innerHTML = post;
        JSL.show('#uso_preview_div');
    }
}

function addPreviewButton() {
    var msg = JSL.id('message_submit'),
        nodes = [
            'new_topic',
            'reply',
            'edit'
        ], node, comm, preview_exists, i;

    // try adding the preview button beside Submit on PM pages
    preview_exists = JSL.id('uso_preview_button');
    if ( msg && showing(msg) && !preview_exists) {
        JSL.after(preview, msg);
    }

    // try adding the preview button to the reply/edit/newtopic section
    for (i = 0; i < nodes.length; i += 1) {
        node = JSL.id( nodes[i] );
        comm = JSL.query('input[name="commit"]', node);
        preview_exists = JSL.query('#uso_preview_button', node);
        if (node && showing(node) && comm && !preview_exists) {
            JSL.after(preview, comm);
        }
    }
}

function onEditClick() {
    whenShown('edit_post_body', addPreviewButton);
}

function onReplyClick() {
    whenShown('post_body', addPreviewButton);
}

// Don't run if in a frame or if page doesn't have reply/new_topic/new_message section
if (window.self !== window.top || !document.querySelector('#reply, #new_topic, #new_message') || typeof JSL === 'undefined') { return; }

// Kill script if not logged in
if ( JSL.query('#top a[href^="/login"], #top a[href^="signup"]') ) { return; }

// Create preview button to go on reply and new post area
preview = JSL.create('input', {value : 'Preview', type : 'button', title : 'Full Page Preview', id : 'uso_preview_button', style : 'margin:0 0 0 4px;', onclick : previewIt});

// Set up the previewing box
document.body.appendChild(
    JSL.create('div', {id: 'uso_preview_div', ondblclick: function (e) {JSL.id('uso_preview_div').style.display = 'none';}, style: 'z-index:99; position:fixed; top:0; left:0; width:100%; height:100%; background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAK3RFWHRDcmVhdGlvbiBUaW1lAFRodSA3IEp1biAyMDA3IDE5OjMzOjIyIC0wODAwwDv6agAAAAd0SU1FB9cGCAIiHDkslXkAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAEZ0FNQQAAsY8L/GEFAAAAMElEQVR42u3OQREAAAjDsIF/T1jjUMEnNdBUkslj/TkHAAAAAAAAAAAAAAAAAAC4FhnWAP/rGcSaAAAAAElFTkSuQmCC\'); text-align:center; display:none;'}, [

        // Create the frame
        JSL.create('div', {id: 'preview_holder', style: 'border: 3px solid #2D96FF; width: 75%; height: 80%; max-height: 80%; background: #ffffff; margin: 4% auto 0 auto; overflow-x: hidden; overflow-y: auto; padding: 6px;'}, [
            JSL.create('table', {class: 'posts'}, [
                JSL.create('tr', {class: 'post hentry'}, [
                    JSL.create('td', {id: 'uso_preview_frame', className: 'body'})
                ])
            ])
        ]),

        // Create the line break
        JSL.create('br'),

        // Create the close frame button
        JSL.create('input', {id: 'close_preview', type: 'button', value: 'Close This Preview', onclick: function () { JSL.id('uso_preview_div').style.display = 'none'; }})
    ])
);

window.addEventListener('click', handle_click, false);
window.addEventListener('load', addPreviewButton, false);


}());