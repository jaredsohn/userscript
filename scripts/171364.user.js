// ==UserScript==
// @name        TinyChat maximizer
// @namespace   http://tinychat.com/
// @description Adds "maximize" button next to the tinchat.com logo while in a room. Clicking this button should remove unneeded components and maximize the room to fit the browser window.
// @include     http://tinychat.com/*
// @include     http://*.tinychat.com/*
// @version     0.3.1
// ==/UserScript==

// style adding
function addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

// element removal by id
function removeById(id)
{
    var element = document.getElementById(id);
    if (element)
        element.parentNode.removeChild(element);
}

// resize the heigh to fit the screen
function resizeTinyChat()
{
    document.getElementById('chat').style.height = (document.getElementsByTagName('body')[0].clientHeight-30) + "px";
}

// main cleanup function
function cleanerTinyChat()
{
    // modify css styles
    addStyle("#wrapper { width: 100% ! important;}");
    addStyle("#left_block { width: 100% ! important;}");

    // remove unncecessary elements
    removeById('header');
    removeById('footer');
    removeById('right_block');
    removeById('room_header');
    removeById('ad_banner');
    removeById('body_footer_ad');
    removeById('chat-info');
    removeById('goods');
	removeById('category-bar');

    // resize the heigh to fit the screen
    resizeTinyChat();
    window.addEventListener('resize', resizeTinyChat, false);
}

// setup full windows button
function addMaximizeButton()
{
    // only work on rooms
    if (!document.getElementById('room'))
        return;

    // add the maximize button right after the logo
    var link = document.createElement('a');
    var div = document.getElementById('logo');
    link.className = 'button orange';
    link.addEventListener('click', cleanerTinyChat, false);
    link.innerHTML = '<img src="http://tinychat.com/public/images/exclaim.png">Maximize'
    link.style.position = 'absolute';
    div.appendChild(link);
}

addMaximizeButton();