// ==UserScript==
// @name            HF Script - HF Post Helper
// @namespace       xerotic/hfposthelper
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
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
		
		//Mentors

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		elmTextarea.value = elmTextarea.value.replace("[sent]","I have sent the requested item to you.");
		elmTextarea.value = elmTextarea.value.replace("[sentall]","Request have been sent to all above this post.");
		elmTextarea.value = elmTextarea.value.replace("[pm]","[pmme=Hi]Send me a PM.[/pmme]");
		elmTextarea.value = elmTextarea.value.replace("[apply]","Please apply for a group [url=http://www.hackforums.net/showthread.php?tid=2185761]here.[/url]");
		elmTextarea.value = elmTextarea.value.replace("[enjoy]","Enjoy and please post some thanks.");
		elmTextarea.value = elmTextarea.value.replace("[enjoy2]","Enjoy the item.");
		elmTextarea.value = elmTextarea.value.replace("[purchase]","Thank you for purchasing MC Accounts. Below you can download them at my site. If any of these accounts die or become recovered just PM me with valid proof and I will gladly replace them. Please leave a vouch on the thread. Thank you.");


		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;