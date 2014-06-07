// ==UserScript==
// @name            Legion Posts
// @namespace       Legion Posts
// @description     Legion Style Posts
// @include         http://www.viphackforums.net/newreply.php*
// @include         http://viphackforums.net/newreply.php*
// @include         http://www.viphackforums.net/newthread.php*
// @include         http://viphackforums.net/newthread.php*
// @include         http://www.viphackforums.net/showthread.php*
// @include         http://viphackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[b][color=#DCDCDC][font=Courier][size=medium]" + elmTextarea.value + "[/size][/font][/color][/b]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;