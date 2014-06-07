// ==UserScript==
// @name            UziGaming Century Gothic
// @description     Makes text Century Ghotic
// @include         http://www.uzigaming.com/newreply.php*
// @include         http://uzigaming.com/newreply.php*
// @include         http://www.uzigaming.com/newthread.php*
// @include         http://uzigaming.com/newthread.php*
// @include         http://www.uzigaming.com/showthread.php*
// @include         http://uzigaming.com/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[font=Century Gothic][color=#FFFFE0]" + elmTextarea.value + "[/color][/font]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;