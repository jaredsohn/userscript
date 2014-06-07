// ==UserScript==
// @name            Quick Links - LF
// @namespace       iHydra
// @description     Skype Tag, PM ME Link - LF
// @include         http://www.leakforums.org/*
// @include         http://leakforums.org/*
// @version         1.2
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
				
		var re = /\[skype\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=skype:ihydra_hf?add][img]http://mystatus.skype.com/smallclassic/ihydra_hf[/img][/url]");
		
		var re = /\[pmme\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.leakforums.org/private.php?action=send&uid=161][color=blue][b]PM ME[/b][/color][/url]");
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;