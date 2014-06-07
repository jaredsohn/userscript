// ==UserScript==
// @name            HF Script - HF Post Helper
// @namespace       xerotic/hfposthelper
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
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

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		
		var re = /\[libertarian\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=729765][color=#FFFFFF][b]Libertarian[/b][/color][/url]");
		
		re = /\[justice\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1086710][color=#FFFFFF][b]Justice[/b][/color][/url]");
		
		re = /\[mcflurry\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=725160][color=#FFFFFF][b]McFlurry[/b][/color][/url]");

		re = /\[inviz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://hackforums.net/member.php?action=profile&uid=619030][color=#FFFFFF][b]iNviZ[/b][/color][/url]");
		
		re = /\[thl\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=570186][color=#FFFFFF][b]TheHackersLove[/b][/color][/url]");
		
		re = /\[qwazz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=295848][color=#FFFFFF][b]Qwazz[/b][/color][/url]");
		
		
		re = /\[staff\]/gi;
		
		var staffs = '[list]\n';
		staffs = staffs + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=729765][color=#FFFFFF][b]Libertarian[/b][/color][/url]\n';
		staffs = staffs + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=725160][color=#FFFFFF][b]McFlurry[/b][/color][/url]\n';
		staffs = staffs + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,staffs);
		
		re = /\[leaders\]/gi;
		
		var leaders = '[list]\n';
		leaders = leaders + '[*][url=http://hackforums.net/member.php?action=profile&uid=619030][color=#FFFFFF][b]iNviZ[/b][/color][/url]\n';
		leaders = leaders + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=570186][color=#FFFFFF][b]TheHackersLoves[/b][/color][/url]\n';
		leaders = leaders + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1086710][color=#FFFFFF][b]Justice[/b][/color][/url]\n';
		leaders = leaders + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,leaders);
		
		re = /\[advisor\]/gi;
		
		var advisor = '[list]\n';
		advisor = advisor + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=295848][color=#FFFFFF][b]Qwazz[/b][/color][/url]\n';
		advisor = advisor + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,advisor);
	    elmTextarea.value = "[font=Monotype Corsiva][size=small][color=#4682B4]" + elmTextarea.value + "[/color][/font][/size]"
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;