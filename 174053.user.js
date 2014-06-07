// ==UserScript==
// @name        Fancy Alert
// @namespace   http://userscripts.org/users/23652
// @description Redefines alert() to be a non-blocking, fancier alert box
// @include     *
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @run-at      document-start
// ==/UserScript==

/* ----------- INFO --------------

    This script will re-define the DOM's alert() function with one of my own.

    It is highly recommended that you quit your script if it's in a frame, or you
        may get the regular DOM alert() that the frame is using.
        Use this code:
        if (window.self !== window.top) { return; }

    You can call it anytime, even before the DOM is loaded.
        -> When the DOM loads, it will display the messages you sent it.

    It has a queue so you can send it multiple messages at once.
        -> It will not stop the rest of the script from executing, like DOM's alert()
        -> All messages go into a queue and get displayed consecutively when clicking 'OK'

    This script will not interfere with another script running in the same namespace.
        -> They will use the same queue

    If your browser supports CSS3, this alert box's border will blink black and red.
        -> [NOTE] I may change this to grey and yellow. I would appreciate feedback on this.

    This script was created using the ECMAScript-5/Strict standard.
    I can not guarantee it will work on other standards.

--------------------------------- */

// use an anonymous function. don't leave any traces except the redefined alert function
(function () {

    'use strict';

    var that = this, // a reference to this object
        base_id = 'fancyAlert', // easily control the id of the elements used
        stack = [], // since multiple alerts can be called quickly, store an array of
                    // the different messages so we can display them, one after another
        box, holder, msg, // declare other vars to be used later
        create = (function (elemName, attr, kids) {
            var blacklist = /style|class/;

            return (function (elemName, attr, kids) {
                var i, prop, ret;

                if (elemName === 'text' && typeof attr === 'string') {
                    return document.createTextNode(attr);
                }

                ret = document.createElement(elemName + "");
                if (typeof attr === "object" && !(attr instanceof Array) ) {
                    for (prop in attr) {
                        if (prop.indexOf("on") === 0 && typeof attr[prop] === "function") {
                            ret.addEventListener(prop.substring(2), attr[prop], false);
                        } else if (typeof ret[prop] !== "undefined" && !blacklist.test(prop) ) {
                            ret[prop] = attr[prop];
                        } else {
                            ret.setAttribute(prop, attr[prop]);
                        }
                    }
                }
                if (typeof kids === "object" && kids instanceof Array) {
                    for (i = 0; i < kids.length; i++) {
                        ret.appendChild( kids[i] );
                    }
                }
                return ret;
            });
        }());

    function addStyle(css, node) {
        var style = create('style', {type : 'text/css'}, [ create('text', css) ] );
        node = node || document.querySelector('head');
        if (node) {
            node.appendChild(style);
        }
    }

    function id(id, node) {
        node = node || document;
        return node.querySelector('#' + id);
    }

    // this will handle all 'keydown' events
    function handleKeypress(event) {
        if (event.keyCode === 13 && id(base_id).style.display !== 'none') {
            // the user hit Enter
            // now we will act like they clicked OK and show the next message in the stack
            event.preventDefault();
            event.stopPropagation();
            nextShow(); // execute the function that the OK button does
        } else if (event.keyCode === 116) {
            // the user hit F5
            // sometimes the browser doesn't reload on some sites with iframes
            // so we'll force a refresh
            setTimeout(function () {
                window.top.location.reload();
            }, 50);
        }
    }

    // define an error throwing function
    function error(error) {
        if (console && console.error) {
            console.error(error);
        }
        if (Error) {
            throw new Error(error, (typeof GM_info === 'object' && GM_info.name ? GM_info.name : 'null'), 0);
        }
        return;
    }

    function center() {
        if (!holder || holder.style.display === 'none') { return; } // exit function if holder doesn't exist yet, or it's hidden

        // get the height and width of the holder
        var height = Math.max(holder.scrollHeight, holder.clientHeight, holder.offsetHeight),
            width = Math.max(holder.scrollWidth, holder.clientWidth, holder.offsetWidth);

        // center the holder
        holder.style.top = Math.floor( (innerHeight / 2) - (height / 2) ) + 'px';
        holder.style.left = Math.floor( (innerWidth / 2) - (width / 2) ) + 'px';

        setTimeout(center, 50);
    }

    // OK button was clicked
    function nextShow() {
        // remove the current message from the stack
        stack.shift();

        // show the next message in the stack
        show(undefined, true);
    }

    function init() { // create the alert box
        var body = document.body; // get the body tag so we can append to it

        // there is already a fancy alert box on the page
        // this script may have been run more than once

        if (body) { // if the body tag exists, add the alert box to the page
            // create the main alert box and its children
            box = body.appendChild(
                create('iframe', {id: base_id, src: 'about:blank', style: 'display: none; position: fixed;  z-index: 999999; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); border-width: 0;', onload: function () {
                    var doc = this.contentDocument, frameBody = doc.body;
                    
                    // add a style to the frame body
                    frameBody.setAttribute('style', 'margin: 0; padding: 0;');
                    
                    // add the alert box to the frame
                    msg = create('pre', {id: base_id + '_msg', style: 'display: block; background: #FFFFFF; font-size: 9pt; font-family: courier; font-weight: normal; overflow: auto; white-space: pre-wrap; max-height: 300px; padding: 26px 8px; margin: 0;'});
                    holder = create('div', {id: base_id + '_holder', style: 'position: fixed; margin: 0 auto; background: #EFEFEF; color: #000000; border: 1px solid #666666; min-height: 200px; min-width: 400px; max-height: 80%; max-width: 80%;'}, [

                            // header
                        create('span', {id: base_id + '_header', style: 'display: block; font-size: 14pt; font-family: arial; font-weight: bold; background: #FFFFC4; color: #666666; border-bottom: 1px solid #CCCCCC; padding: 12px; text-align: center;', textContent: 'Alert'}),

                        // message
                        msg,

                        // OK holder + button
                        create('div', {id: base_id + '_ok_holder', style: 'display: block; width: 100%; padding: 24px 0; border-top: 1px solid #CCCCCC;'}, [
                            create('input', {id: base_id + '_ok', type: 'button', value: 'OK', style: 'display: block; margin: 0 auto; font-size: 10pt; font-family: arial; font-weight: bold; padding: 0 18px;', onclick: nextShow})
                        ])
                    ]);
                    frameBody.appendChild(holder);

                    // add a blinking border style for the alert box
                    addStyle(['@keyframes BorderBlinkRed {',
                        '0% {',
                            'border-color: #000000;',
                        '}',
                        '100% {',
                            'border-color: #FF0000;',
                        '}',
                    '}',
                    '#' +base_id + '_holder {',
                        'animation: BorderBlinkRed 1s cubic-bezier(1.0,0,0,1.0) infinite;',
                    '}'].join(''), doc.querySelector('head'));
                    
                    doc.addEventListener('keypress', handleKeypress, false);
                    show(undefined, true);
                }})
            );
            box.focus(); // focus the alert box in the browser, so there are no problems with key presses

            // remove the event listener
            document.removeEventListener('DOMContentLoaded', init, false);
        } else { // if not, try again at DOM load
            document.addEventListener('DOMContentLoaded', init, false);
        }
    }

    function show(message, next) {
        // push the message into the stack
        if (typeof message !== 'undefined') {
            stack.push(message + '');
        } else if (arguments.length === 0) {
            stack.push('');
        }

        // show the next message
        if (box && msg) {
            if (stack.length > 0) {
                if (stack.length === 1 || next === true) {
                    // if there's only 1 message in the stack, or the OK button was pressed,
                    // show the next message in the stack
                    msg.textContent = stack[0]; // set the alert box's text
                    box.style.display = 'block'; // show the alert box
                    center(); // center the alert
                    id(base_id + '_ok', id(base_id).contentDocument).focus(); // focus the OK button
                }
            } else {
                // all the messages have been displayed, hide the alert box
                box.style.display = 'none';
                document.documentElement.focus(); // correct the focus after closing the alert box
            }
        }
    }

    // determine if JSL exists, and if there are no duplicates. if so, then execute code
    // also check for necessary JSL features used in this script
    if (window.top === window.self) {
        // not in a frame... continue
        if ( !id(base_id) ) {
            // there are no duplicates of this script, init the module
            init();
            window._alert = window.alert.bind(window); // keep an easy reference to the old alert function
            window.alert = show; // re-define the browser's alert method to our own
            window.addEventListener('keypress', handleKeypress, false); // listen for Enter and F5 keys
            window.addEventListener('resize', center, false); // listen for browser resizing, and center the alert box
        }
    }

}());

/*
// An idea I was working on to make alert a setter
// Syntax: aler.t = 'alert string here';
var aler = {

    // use new alert or the old DOM alert?
    useAlert : 'new', // new/old

    set t(val) {
        if (this.useAlert === 'new') {
            alert(val);
        } else if (typeof _alert === 'function') {
            _alert(val);
        }
    }
};
*/