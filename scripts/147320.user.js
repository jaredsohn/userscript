// ==UserScript==
// @name            CrackHackForum - Formatting script for Anne
// @namespace       Pl0xd/ForAnne
// @description     Changes the formatting of posts to fit Anne.
// @include         http://www.crackhackforum.com/newreply.php*
// @include         http://crackhackforum.com/newreply.php*
// @include         http://www.crackhackforum.com/newthread.php*
// @include         http://crackhackforum.com/newthread.php*
// @include         http://www.crackhackforum.com/showthread.php*
// @include         http://crackhackforum.com/showthread.php*
// @include         http://www.crackhackforum.com/private.php*
// @include         http://crackhackforum.com/private.php*
// @include         http://www.crackhackforum.com/thread*
// @include         http://crackhackforum.com/thread*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#8a2be2][font=Monotype Corsiva][size=4]" + elmTextarea.value + "[/size][/font][/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;