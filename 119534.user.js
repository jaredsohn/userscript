// ==UserScript==
// @name            HackForums Easy IMGS
// @namespace       xerotic/easyimgs
// @description     Makes using images on HF easier!
// @include         http://www.hackforums.net/newreply.php*
// @include         http://hackforums.net/newreply.php*
// @include         http://www.hackforums.net/newthread.php*
// @include         http://hackforums.net/newthread.php*
// @include         http://www.hackforums.net/showthread.php*
// @include         http://hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   stuff = elmTextarea.value.match(/\[imgs\]([\s\S]*?)\[\/imgs\]/)[1];
	   var getthem = stuff.split("\n");
	   var finished = "";
	   for(var m = 1; m < getthem.length; m ++){
			var u = getthem[m];
			if(u!==""){
				finished = finished + "[img]" + u + "[/img]\n";
			} else {
				finished = finished + '\n';
			}
	   }
	   elmTextarea.value = elmTextarea.value.replace(/\[imgs\]([\s\S]*?)\[\/imgs\]/, finished);
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;