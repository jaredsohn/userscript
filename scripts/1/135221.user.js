// ==UserScript==
// @name            Boosting on UG
// @namespace       xerotic/colorwhite
// @description     Boost bitch.
// @include         http://www.uzigaming.net/newreply.php*
// @include         http://uzigaming.net/newreply.php*
// @include         http://www.uzigaming.net/newthread.php*
// @include         http://uzigaming.net/newthread.php*
// @include         http://www.uzigaming.net/showthread.php*
// @include         http://uzigaming.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "Yay" + elmTextarea.value + "Boosting Time!";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;