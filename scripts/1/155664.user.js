// ==UserScript==
// @name        Runic Advertisement Reporting
// @namespace   http://forums.runicgames.com/
// @description makes reporting advertisement faster
// @include    http://forums.runicgames.com/report.php?*
// @run-at document-end
// @grant       none
// @version     1
// ==/UserScript==

/****** dropdown menu ******/

 var reason_id = "2" // advertisement
 
 select = document.getElementById('reason_id');

 for(var i, j = 0; i = select.options[j]; j++) {
	if(i.value == reason_id) {
		select.selectedIndex = j;
		break;
	}
}

/****** radio buttons ******/

document.getElementById('notify1').checked = false; //the yes option
document.getElementById('notify0').checked = true; //the no option

/****** submit button ******/
//set the focus on "Submit"
document.getElementsByClassName("button1")[0].focus();
