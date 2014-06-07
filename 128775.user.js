// ==UserScript==
// @name            WWEForums Script - WWEForums Post Helper
// @namespace       BigHossRambler/wweforumsposthelper
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.wweforums.net/*
// @include         http://wweforums.net/*
// @version         1.2
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
		
		re = /\(Crayo\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=1][color=#2291C7][b]Anxiety[/b][/color][/url]");
		
		re = /\(X\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=3][color=#2291C7][b]Xanth[/b][/color][/url]");
		
		re = /\(C\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=1][color=#2291C7][b]Crayo[/b][/color][/url]");
		
		re = /\(Xanth\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=3][color=#2291C7][b]Leviathan[/b][/color][/url]");
		
		re = /\(Anon\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=2][color=#FF6C00][b]Anonymous[/b][/color][/url]");
		
		re = /\(admins\)/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://wweforums.net/member.php?action=profile&uid=1][color=#2291C7][b]Anxiety[/b][/color][/url]\n';
		admins = admins + '[*][url=http://wweforums.net/member.php?action=profile&uid=3][color=#2291C7][b]Leviathan[/b][/color][/url]\n';
		admins = admins + '[*][url=http://wweforums.net/member.php?action=profile&uid=2][color=#FF6C00][b]Anonymous[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\(admin\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
		
		re = /\(seabs\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://wweforums.net/member.php?action=profile&uid=20][color=#DC2E42][b]Seabs[/b][/color][/url]");
		
		re = /\(staff\)/gi;
		
		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;