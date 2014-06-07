// ==UserScript==
// @name        mousewheel horizontal scroll
// @namespace   trespassersW
// @description Alt+mouse-wheel scrolls browser window horizontally 
// @include        http://*
// @include        https://*
// @include        file://*
//  about:config -> greasemonkey.fileIsGreaseable <- true
// @homepageURL https://userscripts.org/scripts/show/153201
// @updateURL https://userscripts.org/scripts/source/153201.meta.js
// @version 1.2
// @date 2013-06-03
// @run-at document-start
// @grant none
// ==/UserScript==
// 2013-04-05 ‘smooth’ scrolling
// 2013-01-06 mouse button + scroll
// 2012-12-04 win key added; use it only in conjunction with other key!
const kShift = 1, kAlt = 2, kCtrl = 4, kWin = 8;
const mLeft  = 0x100, mMiddle = 0x200 //, mRight =0x400; // mouse buttons
// key kombination for invoking me:
var hscrollKey =  kAlt //  mLeft kShift kCtrl +kWin // mLeft // mMiddle

var hscrollStep=60; // pixels
var hscrollPace=20; // px: Step/Pace = scrolling speed 
// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
(function(window,document) {
    var prefix = "", _addEventListener, onwheel, support;
    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
    // detect available wheel event
    if ( document.onmousewheel !== undefined ) {
        // Webkit and IE support at least "mousewheel"
        support = "mousewheel"
    }
    try {
        // Modern browsers support "wheel"
        WheelEvent("wheel");
        support = "wheel";
    } catch (e) {}
    if ( !support ) {
        // let's assume that remaining browsers are older Firefox
        support = "DOMMouseScroll";
    }
    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );
        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };
    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );
            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                delatZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }
            // it's time to fire the callback
            return callback( event );
        }, useCapture || false );
    }
})(window,document);

var keyMod=0;
var scrollTurn=0;
var hscrollPos,hscrollFoot;

function onScroll(e){
 if(keyMod!=hscrollKey) return false;
 hscrollPos=0;
 hscrollFoot=hscrollPace*((e.deltaY>0)*2-1);
 onTout();
 e.preventDefault(), 
 e.stopPropagation(), 
 scrollTurn++;
 return true;
}

// smooth?? 2013-05-04
function onTout(){
  window.scrollBy( hscrollFoot, 0 );
  hscrollPos += hscrollPace; 
  if( hscrollPos < hscrollStep )
    window.setTimeout(onTout,50);
}

const kMap = {16: kShift, 17:kCtrl, 18: kAlt, 91: kWin}
function kDn(e) {
 var k = e.keyCode;
 if(k) k = kMap[k];
 if(k) { 
   keyMod |= k;
   if(k==kWin && (hscrollKey & kWin))
//    GM_log('k:'+e.keyCode),
    e.preventDefault(), 
    e.stopPropagation();
 }
 else keyMod=0, scrollTurn=0;
}
function kUp(e) { 
 if(keyMod == hscrollKey)
  e.preventDefault(), 
  e.stopPropagation();
 keyMod =0, scrollTurn=0;
}

const mMap= {0: mLeft, 1: mMiddle /*, 2: mRight*/}
function mDn(e){
 k= mMap[e.button];
 if(k == hscrollKey){
   keyMod |= k;
 } else
   keyMod = 0, scrollTurn=0;
}
function mUp(e){
 if(keyMod == hscrollKey && scrollTurn != 0)
  e.preventDefault(), 
  e.stopPropagation();
 keyMod=0, scrollTurn=0;
}

if(hscrollKey & 0x00ff)
 window.addEventListener("keydown", kDn, false),
 window.addEventListener("keyup", kUp, false),
 addWheelListener( window, onScroll );
else if(hscrollKey & 0xff00)
 window.addEventListener("mousedown", mDn, false),
 window.addEventListener("mouseup", mUp, false),
 addWheelListener( window, onScroll );
