// ==UserScript==
// @name           PTP Checking Counter
// @namespace      http://userscripts.org/users/183236
// @description    Tool to tabulate number of checks
//
// @version		0.10
// @include		https://tls.passthepopcorn.me/log.php?*
// @grant       none
//
// ==/UserScript==
/*---------------------Version History--------------------
0.10	-	Initial script
0.15    -	Added buttons
0.20    -	Three buttons
0.21	-	Added low quality
0.22	-	Added hard subs
1.00	-	Added second row of buttons specific to screen issues
		-	Updated to work with new report form
1.01	- 	Added GP eval button
--------------------------------------------------------*/

// Create a new div to put the links in and append it to the content div
links_div1 = document.createElement('div');//makes a div
links_div1.setAttribute('class', 'box');//makes it look the same as rest of page
document.getElementById('header').appendChild(links_div1);//adds div to the page
