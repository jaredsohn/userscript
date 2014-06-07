// ==UserScript==
// @name        Facebook Gags Master
// @namespace   gags
// @description Gag factory. But seriously, OnMessageReceived hook for Facebook.
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/?*
// @version     1
// @grant       none
// ==/UserScript==

var _hooks = [];

requireLazy(["require", "MercuryThreadInformer", "CurrentUser"], function (a, b, c) {
    var threadInformer = a('MercuryThreadInformer').get();
    threadInformer.subscribe('messages-received', function (_, messageObject) {
        messageObject = messageObject[Object.keys(messageObject)[0]][0];
        for (var i = 0; i < _hooks.length; ++i) {
            _hooks[i](messageObject, c.getID());
        }
    })
});

/**
 * Add a new message hook
 *  fn: the function to be called when a message is received.
 *       args: msg - the message object.
 *               msg.body is the message text.
                 msg.author is who sent the message.
               currentUser - the ID of the current Facebook user.
 */
function addMessageHook(fn) {
    if (typeof(fn) !== "function") {
        throw "addMessageHook expects a function";
    }
    _hooks.push(fn);
}