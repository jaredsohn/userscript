// ==UserScript==
// @name            PropitiousHF
// @namespace       PropitiousHF
// @description     This is for Propitious.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==
   var qsubf = "<a href='forumdisplay.php?fid=230'>Sub Forum</a> <a <strong> | </strong>   <a href='forumdisplay.php?fid=124'>Techsperts</a>";
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
		
		//Members
		re = /\[bugga\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=661940][color=#FFFFFF][b]bugga[/b][/color][/url]");
		re = /\[jd\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#FFFFFF][b]Judge Dredd[/b][/color][/url]");
		re = /\[enterprise\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=793351][color=#FFFFFF][b]Enterprise[/b][/color][/url]");
		re = /\[not\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=694765][color=#FFFFFF][b]Not[/b][/color][/url]");
		re = /\[secrets\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=727139][color=#FFFFFF][b]Secrets[/b][/color][/url]");
		re = /\[nick\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=356861][color=#FFFFFF][b]¤ Nick™ ¤[/b][/color][/url]");
		re = /\[reactionz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=#FFFFFF][b]ReactioNz[/b][/color][/url]");
		re = /\[royalyeo\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=894726][color=#FFFFFF][b]RoyalYeo™[/b][/color][/url]");
		re = /\[shadowcloud\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=272608][color=#FFFFFF][b]ShadowCloud[/b][/color][/url]");
		re = /\[nvmyturbo\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=796296][color=#FFFFFF][b]nV My TuRBo[/b][/color][/url]");
		re = /\[nasasuke\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=704801][color=#FFFFFF][b]-na.Sasuke[/b][/color][/url]");
		re = /\[genuine\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=646916][color=#FFFFFF][b]Genuine[/b][/color][/url]");
		re = /\[legacy\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=942724][color=#FFFFFF][b]Legacy.[/b][/color][/url]");
		re = /\[pali\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=879431][color=#FFFFFF][b]Pali[/b][/color][/url]");
		re = /\[burn\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=857963][color=#FFFFFF][b]Burn™[/b][/color][/url]");
		re = /\[viraldragon\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=23809][color=#FFFFFF][b]Viral Dragon[/b][/color][/url]");
		re = /\[quickmodz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=795825][color=#FFFFFF][b]Dr.Quickmodz[/b][/color][/url]");
		re = /\[lemonade\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=731778][color=#FFFFFF][b]Lemonade[/b][/color][/url]");
		re = /\[metamafia\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=142108][color=#FFFFFF][b]Meta Mafia[/b][/color][/url]");
		re = /\[loki\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=830127][color=#FFFFFF][b]Loki[/b][/color][/url]");
		re = /\[eminent\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=430736][color=#FFFFFF][b]Eminent[/b][/color][/url]");
		re = /\[dashy\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=905109][color=#FFFFFF][b]Dashy[/b][/color][/url]");
		re = /\[empowerment\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=403341][color=#FFFFFF][b]Empowerment[/b][/color][/url]");
		
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