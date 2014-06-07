// ==UserScript==
// @name            CrackHackForum - Useful tags
// @namespace       Pl0xd/Tags
// @description     Adds some useful tags to CHF
// @author          Pl0xd
// @include         http://www.crackhackforum.com/newreply.php*
// @include         http://crackhackforum.com/newreply.php*
// @include         http://www.crackhackforum.com/newthread.php*
// @include         http://crackhackforum.com/newthread.php*
// @include         http://www.crackhackforum.com/thread*
// @include         http://crackhackforum.com/thread*
// @include         http://www.crackhackforum.com/private.php*
// @include         http://crackhackforum.com/private.php*
// @include         http://www.crackhackforum.com/editpost.php*
// @include         http://crackhackforum.com/editpost.php*
// @version         1.1
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		//general
		//welcome message
		re = /\[Welcome\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Welcome to CHF and enjoy your stay here. We are all here to help you so feel free to ask. However, be sure to [url=http://www.hackforums.net/misc.php?action=help]read the rules[/url] and the [url=http://www.crackhackforum.com/misc.php?action=help]Help Documents[/url], and I am sure you won't get in trouble.");

		//Help documents
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.crackhackforum.com/misc.php?action=help]Help Documents[/url]");
		
		//multiple imgs
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
	   
		//Now some random stuff....
		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;