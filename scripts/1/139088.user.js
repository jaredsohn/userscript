// ==UserScript==
// @name            PP Notice
// @namespace       Dan
// @description     Tell's people where they should be looking for support.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		
        re = /\[pp\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Hello, I believe you mistaken HackForums.net for PayPal support, please head over to PayPal.com and create a support ticket there.");
                     
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;