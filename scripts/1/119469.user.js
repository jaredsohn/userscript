// ==UserScript==
// @name           Floating page scroller
// @version        4.12
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @description    Top/bottom page scrollinks
// @include        *
// @exclude        http://mail.google.com/*
// @exclude        https://mail.google.com/*
// @exclude        about:blank
// ==/UserScript==

/*******************************************************************************************/

/*
This is just a draft to substitute partly the RichScrollbar extension for Firefox
(https://addons.mozilla.org/en-US/firefox/addon/1180).
*/

/*
KNOWN BUGS:
> In Gmail, the divs are saved in e-mails. [workaround http?://mail.google.com/* were excluded]
> It doesn't work on the results page of Google search, because window.scrollMaxY
  is equal to zero immediately after loading the page. [workaround solved v3.1 2010-nov-15]
> It doesn't work on Orkut, because /Main# causes window.scrollMaxY is always equal to zero. [NO WORKAROUND YET]
> It works in very small frames. [Fixed - i think?]
> The divs are not displayed on the far right on some pages ( exs.: http://maujor.com/tutorial/fonttut.php,
  http://www.w3schools.com/css/pr_font_font-size.asp, etc ). [Fixed]
> When the zoom is not 100%, the divs are not displayed on the far right
  and/or occurs overlaps with the scrollbar. [NO WORKAROUND YET]
*/

/*******************************************************************************************/

var floatingDivs = 0;
var floatingDivToTop;
var floatingDivToBottom;

function createdivs() {
  const to_bottom_char = '\u02c5';  //down arrowhead: \u2304   logical  or: \u2228   modifier letter down arrowhead: \u02c5
  const to_top_char    = '\u02c4';  //  up arrowhead: \u2303   logical and: \u2227   modifier letter   up arrowhead: \u02c4

  floatingDivs = 1;

  //It makes the divs:
  floatingDivToTop                  = window.document.createElement('div');
//floatingDivToTop                  =        document.createElement('div');
  //window.blur() fails when there is more than one window open
//floatingDivToTop.innerHTML        = "<a id='to_top_div' style='-moz-transform: scale(2);margin: 0px 10px 20px 0px;background:url(http://i651.photobucket.com/albums/uu234/Serinadruid/batheart-2.png);color:#336699; text-decoration:none;font-size:small;font-family:verdana' href='#'                   onClick='javascript:window.scrollTo(0,0);window.blur();return false'>" + to_top_char + '</a>';
//floatingDivToTop.innerHTML        = "<a id='to_top_div' style='-moz-transform: scale(2);margin: 0px 10px 20px 0px; background:url(http://i651.photobucket.com/albums/uu234/Serinadruid/batheart-2.png);color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='javascript:void(0);' onClick='javascript:window.scrollTo(0,0);window.blur();return false'>" + to_top_char + '</a>';
  floatingDivToTop.innerHTML        = "<a id='to_top_div' style='-moz-transform: scale(2);margin: 0px 10px 20px 0px; background:url(http://i651.photobucket.com/albums/uu234/Serinadruid/batheart-2.png);color:#336699;text-decoration:none;font-size:small;font-family:verdana'                            onClick='javascript:window.scrollTo(0,0);              return false'>" + to_top_char + '</a>';
//floatingDivToTop.innerHTML        = "<a id='to_top_div' style='-moz-transform: scale(2);margin: 0px 10px 20px 0px;background:url('http://i651.photobucket.com/albums/uu234/Serinadruid/batheart-2.png');color:none;text-decoration:none;font-size:large;font-family:verdana'                            onClick='javascript:window.scrollTo(0,0);              return false'>" + to_top_char + '</a>';
  floatingDivToTop.style.cursor     = 'pointer';
  floatingDivToTop.style.position   = 'absolute'; // with 'fixed' didn't work
  floatingDivToTop.style.right      = '0';
  floatingDivToTop.style.zIndex     = '1000';
  //It hides the divs:
//floatingDivToTop.style.top        = 'none';
  floatingDivToTop.style.visibility = 'hidden';
  document.body.appendChild(floatingDivToTop);
//document.styleSheets[0].insertRule("#to_top_div:not(:hover) {opacity:0.7 !important;}",0);                                       // funciona no UOL, mas não no iG nem no Terra (?!)
//document.styleSheets[0].insertRule("#to_top_div:not(:hover) {opacity:0.7 !important;}",document.styleSheets[0].cssRules.length); // funciona no UOL, mas não no iG nem no Terra (?!)
//alert( document.styleSheets[0].cssRules.length ); // é undefinied no UOL e não funciona no iG nem no Terra
  
  //It makes the divs:
  floatingDivToBottom                  = window.document.createElement('div');
//floatingDivToBottom                  =        document.createElement('div');
  //window.blur() fails when there is more than one window open
//floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='-moz-transform: scale(2);margin: 10px 10px 0px 0px;background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='#'                   onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);window.blur();return false'>" + to_bottom_char + '</a>';
//floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='-moz-transform: scale(2);margin: 10px 10px 0px 0px;background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='javascript:void(0);' onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);window.blur();return false'>" + to_bottom_char + '</a>';
  floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='-moz-transform: scale(2);margin: 10px 10px 0px 0px;background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana'                            onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);              return false'>" + to_bottom_char + '</a>';
//floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='-moz-transform: scale(2);margin: 10px 10px 0px 0px;background:#A6A6A6;color:none   ;text-decoration:none;font-size:large;font-family:verdana'                            onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);              return false'>" + to_bottom_char + '</a>';
  floatingDivToBottom.style.cursor     = 'pointer';
  floatingDivToBottom.style.position   = 'absolute'; // with 'fixed' didn't work
  floatingDivToBottom.style.right      = '0';
  floatingDivToBottom.style.zIndex     = '1000';
  //It hides the divs:
//floatingDivToBottom.style.top        = 'none';
  floatingDivToBottom.style.visibility = 'hidden';
  document.body.appendChild(floatingDivToBottom);
//document.styleSheets[0].insertRule("#to_bottom_div:not(:hover) {opacity:0.7 !important;}",0);                                       // funciona no UOL, mas não no iG nem no Terra (?!)
//document.styleSheets[0].insertRule("#to_bottom_div:not(:hover) {opacity:0.7 !important;}",document.styleSheets[0].cssRules.length); // funciona no UOL, mas não no iG nem no Terra (?!)
//alert( document.styleSheets[0].cssRules.length ); // é undefinied no UOL e não funciona no iG nem no Terra
}

/*******************************************************************************************/

var _pageX = 0;
var _pageY = 0;
var _innerWidth;
var _innerHeight;
var _pageXOffset = 0;
var _pageYOffset = 0;
var _scrollMaxY;

function mousemov(evt) {
  _pageX       = evt.pageX;
  _pageY       = evt.pageY;

  movedivs();
}

function scrollmov(evt) {
  _pageX       = _pageX + ( window.pageXOffset - _pageXOffset ); // to correct the scroll
  _pageY       = _pageY + ( window.pageYOffset - _pageYOffset ); // to correct the scroll

  movedivs();
}

/*******************************************************************************************/

var divsAreVisible  = 0;
var lastMousePosY   = 0;
var lastPageYOffset = 0;

function movedivs() {
  _innerWidth  = window.innerWidth;
  _pageXOffset = window.pageXOffset;

  if ( _pageX > ( _innerWidth + _pageXOffset ) - 64 ) {                       //64=4*16
    _innerHeight = window.innerHeight;
    _pageYOffset = window.pageYOffset;
    _scrollMaxY  = window.scrollMaxY;
    if ( _pageYOffset != lastPageYOffset && ( _pageYOffset == 0 || _pageYOffset >= _scrollMaxY ) ) { divsAreVisible = 0; }
  //if ( Math.abs( _pageY - lastMousePosY ) > 20 ) {                          //20=16+4
    if ( Math.abs( _pageY - lastMousePosY ) > 20 || divsAreVisible == 0 ) {   //20=16+4
      if ( _pageY > 8 && _pageY < ( _innerHeight + _pageYOffset ) - 8 ) {     // 8=16/2
        //It moves the divs:
        floatingDivToTop.style.top    = ( _pageY - 16 ) + 'px';
        floatingDivToBottom.style.top =   _pageY        + 'px';
        //It shows the divs:
        if ( _pageYOffset == 0 ) {
          floatingDivToTop.style.visibility    = 'hidden' ; //floatingDivToTop.style.top    = 'none' ;
          floatingDivToBottom.style.visibility = 'visible'; //floatingDivToBottom.style.top = 'block';
        }
        else if ( _pageYOffset >= _scrollMaxY - 16 ) {
          floatingDivToTop.style.visibility    = 'visible'; //floatingDivToTop.style.top    = 'block';
          floatingDivToBottom.style.visibility = 'hidden' ; //floatingDivToBottom.style.top = 'none' ;
        }
        else {
          floatingDivToTop.style.visibility    = 'visible'; //floatingDivToTop.style.top    = 'block';
          floatingDivToBottom.style.visibility = 'visible'; //floatingDivToBottom.style.top = 'block';
        }
        divsAreVisible = 1;
      }
      lastMousePosY   = _pageY;
      lastPageYOffset = _pageYOffset;
    }
  }
  else {
    if ( divsAreVisible == 1 ) {
      //It hides the divs:
      floatingDivToTop.style.visibility    = 'hidden'; //floatingDivToTop.style.top    = 'none';
      floatingDivToBottom.style.visibility = 'hidden'; //floatingDivToBottom.style.top = 'none';
      divsAreVisible = 0;
    }
  }
}

/*******************************************************************************************/

function showDivs() {
  if ( !floatingDivs ) createdivs();
}

function hideDivs() {
  if ( floatingDivs ) {
    floatingDivToTop.style.visibility    = 'hidden';
    floatingDivToBottom.style.visibility = 'hidden';
  }
}

/*******************************************************************************************/

var events = 0;

function addEvents() {
  if ( !events ) {
    document.addEventListener('mousemove',  mousemov, false);
    document.addEventListener('mouseover',  mousemov, false);
    document.addEventListener(   'scroll', scrollmov, false);
    events = 1;
  }
}

function delEvents() {
  if ( events ) {
    document.removeEventListener('mousemove',  mousemov, false);
    document.removeEventListener('mouseover',  mousemov, false);
    document.removeEventListener(   'scroll', scrollmov, false);
    events = 0;
  }
}

/*******************************************************************************************/

function main() {
//if ( window.scrollMaxY ) {
  if ( window.scrollMaxY > ( 0.1 * window.innerHeight ) ) { //workaround to prevent the script to work in small frames
     showDivs();
    addEvents();
  }
  else {
     hideDivs();
    delEvents();
  }
}

/*******************************************************************************************/

window.addEventListener('resize', main, false);

var intervalID = 0;

//if ( window.scrollMaxY ) main();
if ( window.scrollMaxY > ( 0.1 * window.innerHeight ) ) main(); //workaround to prevent the script to work in small frames
else {
  intervalID = setInterval( main, 1000 ); // 1000 ms = 1s //workaround to solve the bug in Google search
}