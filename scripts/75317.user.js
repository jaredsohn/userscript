// ==UserScript==
// @name           Facebook_LogOut_button
// @namespace      Adds logout button to Facebook
// @include        *facebook.com*
// ==/UserScript==

/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



var a = document.getElementsByTagName('a');

for (x in a)
	if (a[x].href.match('logout.php'))
		document.getElementById('pageNav').appendChild(a[x]);
