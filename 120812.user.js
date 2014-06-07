// ==UserScript==
// @name            HF Scripts - Confirm Thread Close
// @namespace       xerotic/noticeonclose
// @description     Confirm box comes up when trying to close a thread.
// @include         http://hackforums.net/showthread.php*
// @include         http://www.hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==


function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   if(form.innerHTML.indexOf('selfclose') != -1){
		var a = confirm("Are you sure you want to close this thread?");
		if(a){
			var close = true;
		} else {
			form.action = "javascript:void(0);";
		}
   }
}

window.addEventListener('submit',form_submit, true);