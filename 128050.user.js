// ==UserScript==
// @name            HS Scrypt
// @Created By:     Unknown
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.hacksociety.net/*
// @include         http://hacksociety.net/*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		
		//Admins
		
		re = /\[CrazyMouse\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://hacksociety.net/User-CrazyMouse][color=#4DD0FC][b]CrazyMouse[/b][/color][/url]");
		
		re = /\[Crazy\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://hacksociety.net/User-CrazyMouse][color=#4DD0FC][b]CrazyMouse[/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#4DD0FC][b]Crow[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;