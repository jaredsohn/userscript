// ==UserScript==
// @name          	Wordpress publish now button
// @namespace     	http://kristerberntsen.no
// @icon          	http://s.wordpress.org/about/images/logos/wordpress-logo-notext-rgb.png
// @description   	Wordpress hotfix for bug #8368 (http://core.trac.wordpress.org/ticket/8368)
// @copyright     	2011+, Krister Berntsen (probeus @ https://github.com/probeus)
// @license       	(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       	0.2
//
// @include			*/wp-admin/post.php*
//
// Thanks to Vegard Langås (sjefen6 @ https://github.com/sjefen6) for motivational support and finding the right IDs in wordpress.
//
// ==/UserScript==

//Get the element of the <p> inside #timestampdiv
var targetDestination = document.getElementById("timestampdiv").getElementsByTagName('p')[0];
//Save the old html-content
var oldHTML = targetDestination.innerHTML;
//Generate the new html
var newHTML = oldHTML + '<a href="#edit_timestamp" id="useditDateNow" class="now-timestamp hide-if-no-js button">Now!</a>';

//Replace old html with new html
targetDestination.innerHTML=newHTML;

//Find and set eventlistener to the button
var buttonId = document.getElementById("useditDateNow");
buttonId.addEventListener('click', function() {changeDate();}, false);

//Function to update wordpress values with the hidden current values.
function changeDate(){
	document.getElementById('mm').value=document.getElementById('cur_mm').value;
	document.getElementById('jj').value=document.getElementById('cur_jj').value;
	document.getElementById('aa').value=document.getElementById('cur_aa').value;
	document.getElementById('hh').value=document.getElementById('cur_hh').value;
	document.getElementById('mn').value=document.getElementById('cur_mn').value;
}