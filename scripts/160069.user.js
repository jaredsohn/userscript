// ==UserScript==
// @name        Oreilly 'hand it in' button
// @namespace   oreilly
// @description add the "Hand it in" button to an Oreilly School quiz page. Necessary if you're accessing the quiz directly and not from within their terminal environment. 
// @include     https://oreillyschool.com/student/viewassignment.php?*&type=quiz
// @version     1.1
// @grant       None
// ==/UserScript==

window.addEventListener("load", function(e) {
  addSubmit();
}, false);
 
function addSubmit (){
	// define the "Hand it in" button
	var i = document.createElement("input");
	i.type = 'submit';
	i.value = 'Hand it in';

/*	Add our button to the end of the 2nd form in the page
	Normally we'd use the name or id, document.forms["quiz"]
	but OST doesn't name it. */
	document.forms[1].appendChild(i);
}
