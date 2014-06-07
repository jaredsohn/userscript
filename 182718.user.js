// ==UserScript==
// @name        gmail-fullscreen-reply
// @namespace   http://userscripts.org/users/dza
// @include     http*://mail.google.com/*
// @require     http://userscripts.org/scripts/source/56812.user.js
// @grant       none
// ==/UserScript==

// Credits to "Tim Smart" http://userscripts.org/users/tim for the gmail lib (MIT License).

// SCRIPT IS NOT TESTED PROPERLY!
// Known issues:
// - closing and reopening Fullscreen Reply doesn't work. (go back to message list, select again to trigger script)
// - setInterval is a FIXME- it needs a trigger to check for DOM exists.

var api = new USO.Gmail()

// Shift-click mod for Tim's Gmail Lib.
api.shiftClick = function (element) {
    var click = document.createEvent('MouseEvents')

    click.initMouseEvent(
      'click', true, true
    , document.defaultView
    , 1, 0, 0, 0, 0
    , false, false, true, false
    , 0, null
    )
    element.dispatchEvent(click)

    return this
}

// chrome fails on unsafeWindow (?)
api.window = window;

function click_and_show() {
    api.shiftClick(this);
}

function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function fullscreen_reply(document) {
    // interval check instead
    setTimeout(function() {
    var btns = document.getElementsByClassName('aaq');
    addEventListenerList(btns, 'mouseup',click_and_show);
    },1000);
}

api.on('view:cv', function () {
  var view = this.view
    , expand = view.ownerDocument.evaluate
      ( ".//img[@alt='Expand all']"
      , view
      , null
      , XPathResult.FIRST_ORDERED_NODE_TYPE
      , null
      )
      .singleNodeValue


    if (expand) {
    //GM_log("found_expand");
        this.shiftClick(expand.parentNode);
        fullscreen_reply(view.ownerDocument);
    //alert(buttons.length);
    }



})

//api.on('compose', function() {
//alert('compose HERE'); // is not run
    //this.click(document.getElementById(':qw'));
//})

//api.on('compose:closed', function() {
//alert('compose CLOSED'); // is not run
    //this.click(document.getElementById(':qw'));
//})
