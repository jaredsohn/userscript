// ==UserScript==
// @name            DarkForums Post Assist
// @namespace       zealotrywashere
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.darkforums.org/*
// @include         http://darkforums.org/*
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
		
		//staff and gowners

		elmTextarea.value = elmTextarea.value.replace("<3","[color=pink]&#9829;[/color]");
		
		var re = /\[Zealotry\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=1][color=black][shadow=red][b]Zealotry[/b][/shadow][/color][/url]");
		
		re = /\[Falcon\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=3][color=red][b]Falcon[/b][/color][/url]");
		
       		re = /\[Brad\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=84][color=#f5dc22][b]Brad[/b][/color][/url]");
       
       		re = /\[Rasbora\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=71][color=purple]Rasbora[/color][/url]");
		
		re = /\[Evangelist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=8][color=#30e704][b]Evangelist[/b][/color][/url]");
       
       		re = /\[Chieftain\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/member.php?action=profile&uid=2][color=#00bcff][b]Chieftain[/b][/color][/url]");
       
	
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
		staff = staff + '[*][url=http://darkforums.org/member.php?action=profile&uid=1][color=black][shadow=red][b]Zealotry[/b][/shadow][/color][/url]\n';
		staff = staff + '[*][url=http://darkforums.org/member.php?action=profile&uid=3][color=red][b]Falcon[/b][/color][/url]\n';
		staff = staff + '[*][url=http://darkforums.org/member.php?action=profile&uid=2][color=#00bcff][b]Chieftain[/b][/color][/url]\n';
        staff = staff + '[*][url=http://darkforums.org/member.php?action=profile&uid=8][color=#30e704][b]Evangelist[/b][/color][/url]\n';
		staff = staff + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,staff);
		
		
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://darkforums.org/showteam.php");
		
		re = /\[pmz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/private.php?action=send&uid=1&subject=I require assistance...]PM [color=black][shadow=red][b]Zealotry[/b][/shadow][/color][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://darkforums.org/misc.php?action=help]Help Documents[/url]");

		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;