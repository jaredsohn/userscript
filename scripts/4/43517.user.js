// ==UserScript==
// @name           mintemail.com keepalive
// @namespace      tregota.mintemail
// @description    Keeps a mint email alive while open in browser by renewing it before it expires as well as removing some unnecessary parts of the page.
// @include        http://www.mintemail.com/
// ==/UserScript==


// Remove the unnecessary parts of the page and fix the width issue

document.getElementById("header_buttons").innerHTML = '<form onsubmit="var setemail = document.getElementById(\'setemail\').value;if(setemail != null){if (setemail==\'\'){alert(\'You have to enter something.\');}else if (!window.frames[0].ValidateBox(setemail,\'\')){alert(\'This box contains invalid characters. (use only \\\'a-z\\\', \\\'A-Z\\\', \\\'0-9\\\', \\\'.\\\', \\\'-\\\' or \\\'_\\\')\');}else if (setemail.length>70){alert(\'Box cannot be longer than 70 characters.\');}else{window.frames[0].ajaxFunction(\'changeemail\',\'email=\'+escape(setemail)); setTimeout(\'window.location.href=window.location.href\',1000);}} return false;" style="display: inline; margin-right: 7px;"><input id="setemail" style="border: none" type="text" /></form>';
var parent = document.getElementById("container");
parent.removeChild(document.getElementById("contentbox"));
parent.removeChild(parent.getElementsByTagName('p')[0]);
parent.getElementsByTagName('table')[0].style.width = '750px';
document.getElementById("footer").style.margin = '-40px 0';

// next set up the renewing interval

/* 
 * a little more readable 
 *
setInterval('
	if (window.frames[0] && window.frames[0].CreateButton )
	{
		if ( !window.frames[0].document.getElementById("inject_expires") || window.frames[0].document.getElementById("inject_expires").innerHTML.substring(1,2) != "h")
		{
			window.frames[0].CreateButton();
		}
	}
',300000);
*/

setInterval('if (window.frames[0] && window.frames[0].CreateButton ){if (!window.frames[0].document.getElementById("inject_expires") || window.frames[0].document.getElementById("inject_expires").innerHTML.substring(1,2) != "h" ){window.frames[0].CreateButton();}}',300000);


