// ==UserScript==
// @name            WizardForums Tahoma Black Script V2
// @namespace       theb/wftahomeblack2
// @description     Makes text Tahoma black in WizardForums
// @include         http://www.wizardforums.com/newreply.php*
// @include         http://wizardforums.com/newreply.php*
// @include         http://www.wizardforums.com/newthread.php*
// @include         http://wizardforums.com/newthread.php*
// @include         http://www.wizardforums.com/showthread.php*
// @include         http://wizardforums.com/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#000000][font=Trebuchet MS]" + elmTextarea.value + "[/font][/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;