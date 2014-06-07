// ==UserScript==
// @name        KG - insert dvd specs template
// @namespace   KG
// @include     http*://*karagarga.net/upload.php*
// @version     1.1
// ==/UserScript==

var code = "javascript: var x = document.getElementById('ripspecs'); x.value = decodeURIComponent('DVD%20Source%3A%20DVD%20label%2C%20region%2C%20DVD5%20/%20DVD9%0ADVD%20Format%3A%20NTSC%20/%20PAL%0ADVD%20Audio%3A%20Language%20Mono%20/%20Stereo%20/%205.1%20/%20DTS%0AProgram%3A%20Program%20used%20to%20rip%20the%20DVD%20/%20Unknown%0AMenus%3A%20Untouched%20/%20Reencoded%20/%20Removed%0AVideo%3A%20Untouched%20/%20Reencoded%20/%20Removed%0AAudio%3A%20Untouched%20/%20Reencoded%20/%20Removed%0ADVD%20extras%3A%20Untouched%20/%20Reencoded%20/%20Removed'); return true; ";

var checkBox = document.getElementById('dvdr');

if (checkBox) {
	checkBox.parentNode.setAttribute("onclick", code);
}
