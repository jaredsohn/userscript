// ==UserScript==
// @name            PropitiousHF2
// @namespace       PropitiousHF2
// @description     This is for Propitious.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==
   var qsubf = "<a href='forumdisplay.php?fid=230'>Sub Forum</a> <a <strong> | </strong>   <a href='showthread.php?tid=2372571'>Propitious Lounge</a>";
   var subf = "Open Buddy List"
   document.getElementById('panel').innerHTML = document.getElementById('panel').innerHTML.replace(subf,qsubf)
   
   
function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');

   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		
		
		//Staff
		var re = /\[libertarian\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=729765][color=#FFA500][b]Libertarian[/b][/color][/url]");
		
		re = /\[mcflurry\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=725160][color=#FFA500][b]McFlurry[/b][/color][/url]");

		//Leaders
		re = /\[inviz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://hackforums.net/member.php?action=profile&uid=619030][color=#1E90FF][b]iNviZ[/b][/color][/url]");
		
		re = /\[thl\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=570186][color=#1E90FF][b]TheHackersLove[/b][/color][/url]");
		
		re = /\[justice\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1086710][color=#1E90FF][b]Justice[/b][/color][/url]");
		
		//Advisor
		re = /\[qwazz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=295848][color=#00BFFF][b]Qwazz[/b][/color][/url]");
		
		//Extras
		re = /\[handbook\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/showthread.php?tid=2168479][color=#FFFFFF][b]Propitious Handbook[/b][/color][/url]");
		
		re = /\[banner\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[align=center][img]http://i.imgur.com/P4JKl.gif[/img][/align]");
		
		re = /\[staff\]/gi;
		
		var staffs = '[list]\n';
		staffs = staffs + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=729765][color=#FFA500][b]Libertarian[/b][/color][/url]\n';
		staffs = staffs + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=725160][color=#FFA500][b]McFlurry[/b][/color][/url]\n';
		staffs = staffs + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,staffs);
		
		re = /\[leaders\]/gi;
		
		var leaders = '[list]\n';
		leaders = leaders + '[*][url=http://hackforums.net/member.php?action=profile&uid=619030][color=#1E90FF][b]iNviZ[/b][/color][/url]\n';
		leaders = leaders + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=570186][color=#1E90FF][b]TheHackersLoves[/b][/color][/url]\n';
		leaders = leaders + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1086710][color=#1E90FF][b]Justice[/b][/color][/url]\n';
		leaders = leaders + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,leaders);
		
		re = /\[advisor\]/gi;
		
		var advisor = '[list]\n';
		advisor = advisor + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=295848][color=#00BFFF][b]Qwazz[/b][/color][/url]\n';
		advisor = advisor + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,advisor);
		
  }

   form._submit();
}
window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;