// ==UserScript==
// @name           ipalifr
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    in-page link to iframe 'fractal' loader. EXPERIMENTAL!
// @include        *
// ==/UserScript==

 //
 // options
 //
 var controlsTagName = 'small';
 var controlsClassName = '_ipalifr_';
 var controlsCSSselector = controlsTagName+'.'+controlsClassName;
 var buttonTagName = 'button';
 var foldPath = 'window._fold_';
 var initialFrameHeight = 200;
 var frameResizeUnit = 200;

 //
 // addGlobalStyle (from diveintogreasemonkey)
 // ( real userstyle would be more efficient, but this is more consistent )
 //
 function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
 }
 addGlobalStyle(
   'a + '+ controlsCSSselector +' > button { display: none; }'
  +'a:hover + '+ controlsCSSselector +' > button ,'
  +'a + '+ controlsCSSselector +':hover > button { display: inline; }'
  +'a + '+ controlsCSSselector +' > iframe { border-width: 3px; }'
  );


 //
 // makeControls
 //
 function makeControls ( link , index ) { // index is not used o_O
  var ctrl = document.createElement(controlsTagName);
  ctrl.className = controlsClassName;
  ctrl.innerHTML =
  // "show" button:
   '<'+buttonTagName+' onclick="' + foldPath +'.showHideFrame(this)">show</'+buttonTagName+'>'
  // "load" button:
   + '<'+buttonTagName+' onclick="' + foldPath +'.loadFrame(this,\'' + link.href + '\')">load</'+buttonTagName+'>'
  // "+":
   + '<'+buttonTagName+' onclick="' + foldPath +'.resize(this,\'+'+ frameResizeUnit +'\')" style="display: none;"> + </'+buttonTagName+'>'
  // "-":
   + '<'+buttonTagName+' onclick="' + foldPath +'.resize(this,\'-'+ frameResizeUnit +'\')" style="display: none;"> - </'+buttonTagName+'>'
  // iframe itself:
   + '<iframe class="init" style="display: none; width: 100%; height:' + initialFrameHeight + 'px;"'
   + ' onload="' + foldPath +'.frameLoaded(this,\''+buttonTagName+'\',1)"></iframe>'
  ;
  link.parentNode.insertBefore( ctrl , link.nextSibling); // dirty 'insertAfter'; what if there is no nextSibling?
 }

 //
 // do it
 // for each link, woul'd be nice to filter "interesting" links only
 //
 var curr_url = document.location.href.split('#')[0]
   , lnk , i = -1;
 while ( lnk = document.links[++i] ) {
  if ( lnk.href.indexOf('#') && ( lnk.href.split('#')[0] === curr_url ) ) continue;
  makeControls( lnk , i);
 }


 //
 // object injected into unsafeWindow
 //
 unsafeWindow._fold_ = {};

 //
 // getTheIframe, internal
 //
 unsafeWindow._fold_.getTheIframe = function ( button ) {
  return button.parentNode.getElementsByTagName('iframe')[0]
 }

 //
 // showHideFrame
 //
 unsafeWindow._fold_.showHideFrame = function ( button ) {
  var frame = unsafeWindow._fold_.getTheIframe( button );
  if ( button.nextSibling.style.display != 'none' && button.nextSibling.innerHTML == 'load') {
   button.nextSibling.click();
  }
  if ( frame.style.display == 'block' ) {
   frame.style.display
   = button.nextSibling.nextSibling.style.display
   = button.nextSibling.nextSibling.nextSibling.style.display
   = 'none';
   button.innerHTML = 'show';
  } else {
   button.style.display = 'inline';
   frame.style.display = 'block';
   button.nextSibling.nextSibling.style.display
   = button.nextSibling.nextSibling.nextSibling.style.display
   = 'inline';
   button.innerHTML = 'hide';
  }
 }

 //
 // loadFrame
 //
 unsafeWindow._fold_.loadFrame = function ( button , url) {
  button.innerHTML = 'loading...';
  button.previousSibling.style.display = 'inline';
  var frame = unsafeWindow._fold_.getTheIframe( button );
  frame.src = url;
  unsafeWindow._fold_.resize(button,0);
 }

 //
 // frameLoaded
 //
 unsafeWindow._fold_.frameLoaded = function ( thisFrame , loadButtonTagName, loadButtonIndex) {
  if ( thisFrame.className ) {
   // load is called when the iframe is written, even without SRC
   thisFrame.className = ''
  } else {
   var loadButton = thisFrame.parentNode.getElementsByTagName(loadButtonTagName)[loadButtonIndex];
   loadButton.innerHTML = 'reload';
   loadButton.style.display = 'none';
  }
 }

 //
 // resize
 //
 unsafeWindow._fold_.resize = function ( button , height) {
  var frame = unsafeWindow._fold_.getTheIframe( button );
  var newHeight = parseInt(frame.style.height) + parseInt(height);
  if ( newHeight > 0 ) {
   frame.style.height = newHeight + 'px';
  }
 }

