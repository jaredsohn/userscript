// ==UserScript==
// @name            CC Script - CC Post Helper
// @namespace       xerotic/hfposthelper - Modified by Snorlax. ALL CREDITS GOES TO XEROTIC FROM HF
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.capitalcorporation.co/*
// @include         http://capitalcorporation.co/*
// @version         1.2
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		//Admins

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		
		var re = /\[Chocothunda\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://capitalcorporation.co/User-Chocothunda][color=#AAAAFF][b]Chocothunda[/b][/color][/url]");
		
		re = /\[choco\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://capitalcorporation.co/User-Chocothunda][color=#AAAAFF][b]Chocothunda[/b][/color][/url]");
		
		re = /\[w0000t\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://capitalcorporation.co/User-w0000t][color=#AAAAFF][b]w0000t[/b][/color][/url]");
		
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://capitalcorporation.co/showteam.php");
		
		re = /\[pmchoco\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://capitalcorporation.co/private.php?action=send&uid=926]PM [color=#4DD0FC][b]Chocothunda[/b][/color][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.capitalcorporation.co/misc.php?action=help]Help Documents[/url]");

        re = /\[Help Docs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.capitalcorporation.co/misc.php?action=help]Help Documents[/url]");
       
   }

  form._submit();
   
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;