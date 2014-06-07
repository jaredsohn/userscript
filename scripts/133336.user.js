// ==UserScript==
// @name          xerotic's Character Counter
// @namespace     xerotic/hfcharcount
// @description   Gives character count information in Quick Reply area.
// @include       http://hackforums.net/showthread.php*
// @include       http://www.hackforums.net/showthread.php*
// @version 	  2.0
// ==/UserScript==

 
regex = /here.*?>/;
revised = "here.<br><br><center><div id='letscount'>0 - <span style='color:red'>Small!</span></div></center>";
document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
addButtonListener();
 
function addButtonListener(){
  var texts = document.getElementById("message");
  texts.addEventListener('keyup',doCountNow,true);
  texts.addEventListener('keydown',doCountNow,true);
}

function doCountNow(){

	var field = parseInt(document.getElementById('message').value.length);
	var minlimit = 35;
	var maxlimit = 18000;
	// if (field > maxlimit) {
		// document.getElementById('message').value = document.getElementById('message').value.substring(0, maxlimit);
	// } else {
		// document.getElementById('letscount').innerHTML = maxlimit - document.getElementById('message').value.length;
	// }
	if (field < minlimit) {
		document.getElementById('letscount').innerHTML = field+' - <span style="color:red">Small!</span>'
	}
	else if (field > maxlimit) {
		document.getElementById('letscount').innerHTML = field+' - <span style="color:red">Big!</span>'
	}
	else {
		document.getElementById('letscount').innerHTML = field+' - <span style="color:green">OK!</span>'
	}

}