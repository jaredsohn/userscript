// ==UserScript==
// @name          Jordy's HackForums tools!
// @namespace      Jordy?
// @description   Usefull tools for HackForums!
// @include      *hackforums.net*
// @version 2.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
 
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1)<span class='extra-menu-toggle'> | <a href='#'>Show/Hide Extra menu</a></span><div id='extra-menu' style='display: none'><hr style='background: #4F3A6B'/><a href='http://www.hackforums.net/stats.php'>Stats</a> | <a href='bans.php'>Bans</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> | <a href='private.php?action=tracking'>Tracking</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='myawards.php'>Awards</a></div>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

$(document).ready(function(){
$(".extra-menu-toggle").click(function(){
    $("#extra-menu").slideToggle("fast");
  });
});

regex = /here.*?>/;
revised = "here.<div id='letscount' align='center'></div></span>";
document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
addButtonListener();
 
function addButtonListener(){
  var texts = document.getElementById("message");
  texts.addEventListener('keyup',doCountNow,true);
  texts.addEventListener('keydown',doCountNow,false);
}

function doCountNow(){

	var field = parseInt(document.getElementById('message').value.length);
	var minlimit = 35;
	var maxlimit = 18000;
	if (field < minlimit) {
		document.getElementById('letscount').innerHTML = '<h1 style="color:orange">'+field+'</h1>'
	}
	else if (field > maxlimit) {
		document.getElementById('letscount').innerHTML = '<h1 style="color:red">'+field+'/<h1>'
	}
	else {
		document.getElementById('letscount').innerHTML = '<h1 style="color:green">'+field+'</h1>'
	}

}
}