// ==UserScript==
// @name            XboxMB Tahoma 
// @namespace       Uzi/Swagstro/xmbtahoma
// @description     Makes text Tahoma
// @include         http://www.xboxmb.com/newreply.php?do=newreply*
// @include         http://xboxmb.com/newreply.php?do=newreply*
// @include         http://www.xboxmb.com/newthread.php?do=newthread*
// @include         http://xboxmb.com/newthread.php?do=newthread*
// @include         http://www.xboxmb.com/showthread.php*
// @include         http://www.xboxmb.com/quickreply.php?do=quickreply*
// @include         http://www.xboxmb.com/newreply.php?do=newreply&p=*
// @include         http://xboxmb.com/newreply.php?do=newreply&p=*
// @version         1.1
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[font=Tahoma]" + elmTextarea.value + "[/font]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;