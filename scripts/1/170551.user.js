// ==UserScript==
// @name            Natha's Updated Post Helper
// @namespace       Natha
// @description     Updated by Natha, originally made by xerotic.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.4
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace)
		
		
		//Admins
		
		re = /\[Factor8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[F8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]");

		re = /\[Omniscient\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Omni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
		
		
		
		re = /\[Saged\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=47360][color=lime][b]Saged[/b][/color][/url]");
		
		re = /\[Paradoxum\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=lime][b]Paradoxum[/b][/color][/url]");
		
		re = /\[Mr Kewl\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=183072][color=lime][b]Mr Kewl[/b][/color][/url]");
		
		re = /\[xch4ng3\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=47360][color=lime][b]Saged[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=lime][b]Paradoxum[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=183072][color=lime][b]Mr Kewl[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]\n';
		staff = staff + '[/list]'; 
		
		elmTextarea.value = elmTextarea.value.replace(re,staff);
		
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://www.hackforums.net/stafflist.php");
		
		re = /\[pmomni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/private.php?action=send&uid=1]PM [color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");

                re = /\[Help Docs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");
		
		re = /\[modlist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/modlist.php]List of Moderators[/url]");
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;