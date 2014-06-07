// Hello World! example
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Hello World
// @namespace http://diveintogreasemonkey.org/download/
// @description example script to alert "Hello world!" on every page
// @include http://www.arabic-keyboard.org/typing-test/*

// ==/UserScript==
// alert('Hello!');
// alert(document.getElementsByName('now')[0].value);
function getElement(event)
{
//alert('Hello!');
//alert(document.getElementById('zeit').value);
//alert(document.getElementById('now').innerHTML); //working

var timout = document.getElementById('zeit').innerHTML;
while (timout>0)
  {
  document.getElementById('inputo').value = document.getElementById('now').innerHTML;
  document.getElementById('inputo').value += ' ';

//=== work in progress 


var fireOnThis = document.getElementById('inputo');

if( window.KeyEvent ) {
  var evObj = document.createEvent('KeyEvents');
  evObj.initKeyEvent( 'keyup', true, true, window, false, false, false, false, 32, 0 );
  //evObj.keyCode = 32;
  //alert('hi true cond');
} else {
  var evObj = document.createEvent('UIEvents');
  evObj.initUIEvent( 'keyup', true, true, window, 1 );
  evObj.keyCode = 13;
  //alert('hi false cond');
}
fireOnThis.dispatchEvent(evObj);

//== end of constructions


   timout--;
  }//end while
}
window.addEventListener('click', getElement, true);
var loading = document.createElement('div');
loading.setAttribute('id', 'loading');
loading.innerHTML = '\<h1\>Loading Page...\<\/h1\>\<input name=\"mybutton\" type=\"button\" onclick=\"getElement(event)\" value=\"Show\"\>';

// loading.addChild = '\<h1\>Loading Page...\<\/h1\>';
document.body.insertBefore(loading, document.body.firstChild);
Zaehler = 20;