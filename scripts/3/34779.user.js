// ==UserScript==
// @name           Access Key Example
// @namespace      http://userscripts.org/users/23652
// @description    Access Key Example
// @include        *
// @copyright      JoeSimmons
// ==/UserScript==

function key(e) {
if(e.ctrlKey && e.altKey) {
	switch(e.keyCode) {
	case 66:alert('You pressed b');break;
	case 73:alert('You pressed i');break;
	case 72:alert('You pressed h');break;
	case 85:alert('You pressed u');break;
  }
}
}

window.addEventListener('keyup', key, false);