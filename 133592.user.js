// ==UserScript==
// @name          Diabolic's Character Counter
// @namespace     diabolic/sfcharcount
// @description   Gives character count information in Quick Reply area.
// @include       http://supportforums.net/showthread.php*
// @include       http://supportforums.net/showthread.php*
// @version 	  2.0
// ==/UserScript==

 
regex = /here.*?>/;
revised = "here.<br /> <div id='letscount'>0<br /><span style='color:red'>Too Low!</span></div>";
document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
addButtonListener();
 
function addButtonListener(){
  var texts = document.getElementById("message");
  texts.addEventListener('keyup',doCountNow,true);
  texts.addEventListener('keydown',doCountNow,true);
}

function doCountNow(){

	var field = parseInt(document.getElementById('message').value.length);
	var minlimit = 30;
	var maxlimit = 18000;
	// if (field > maxlimit) {
		// document.getElementById('message').value = document.getElementById('message').value.substring(0, maxlimit);
	// } else {
		// document.getElementById('letscount').innerHTML = maxlimit - document.getElementById('message').value.length;
	// }
	if (field < minlimit) {
		document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too Low!</span>'
	}
	else if (field > maxlimit) {
		document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too High!</span>'
	}
	else {
		document.getElementById('letscount').innerHTML = field+'<br /><span style="color:green">Okay To Post!</span>'
	}

}