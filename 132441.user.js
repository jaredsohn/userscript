// ==UserScript==
// @name            HF Script - Vibrate Post Helper
// @namespace       vibrate/vibrateposthelper
// @description     Based on Xerotic's excellent script, this is a custom version for Vibrate to use.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         3.1
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		re = /\[35char\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'Please note that your post is intentionally bypassing the 35 character limit and is therefore considered low quality. Posts like these generally do not make you look intelligent nor will they get you respect around this forum. If you are unable to be creative enough to reach 35 characters, please refrain from posting at all.');
		
		re = /\[bad\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'This is not allowed on HackForums. We recommend you take the time to read the [url=http://www.hackforums.net/misc.php?action=help]HF Help Documents[/url]section.');
		
		re = /\[give\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'I would love this! Thanks in advanced!');
		
		re = /\[givepm\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'I would love this! I am sending you a pm now.');
		
		re = /\[vouch\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'Vouch for this user! High quality and trusted member.');
		
		re = /\[lq\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'Low quality member.');
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;