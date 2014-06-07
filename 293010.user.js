// ==UserScript==
// @name          Error display
// @namespace     http://redlion.net/flspafford
// @description	  Change table colors
// @include       /^https?://192.168.2.210$/
// @grant         none
// ==/UserScript==
//Change Log:

// alert('frank test test');

window.addEventListener('load', Greasemonkey_main, false);

function Greasemonkey_main() {
    //
    var test = document.getElementById('NtDisplayErrors');
    if (test)
    {
        //alert('found NtDisplayErrors');
        top.FixTable(test, 0xEBEBA1, null, 1);
        console.log('Changed NtDisplayErrors table color');
    }
	
    var elmNewContent = document.createElement('a');
    elmNewContent.href = 'http://www.example.com/';
    elmNewContent.appendChild(document.createTextNode('click here if you dare'));
    var elmFoo = document.getElementById('foo');
    test.parentNode.insertBefore(elmNewContent, elmFoo);
}
