// ==UserScript==
// @name            fagscriptPap
// @namespace       justice/HFScript1
// @description     This is for Justice
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==
   var revised = "<a href='forumdisplay.php?fid=230'>Sub Forum</a> <a <strong> | </strong>   <a href='showthread.php?tid=2372571'>Propitious Lounge</a> <strong> | <b>Current time:</b></strong> ";
   var fag = "<span style=" + '"color:#FF00FF;"' + ">Faggot</span>";
   var GWIAF = "<span style=" + '"color:#C45AEC;"' + ">Guess Who Is A Fag</span>";
   var blades = "<span style=" + '"color:#4DD0FC;"' + ">Blades.</span>";
   var prop = "http://cdn2.hackforums.net/images/blackreign/groupimages/english/propitious.gif";
   var staff = "http://cdn2.hackforums.net/images/blackreign/groupimages/english/admin.jpg";
   var regex = /\Current time\:/;
   var Pyro = /\PyroStor\m/;
   var GWIB = /\Guess Who Is Bac\k/;
   document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
   
   var Names = document.getElementsByTagName('div');
   for (var i = Names.length - 1; i >= 0; i--)
   {
		var Name = Names[i];
		Name.innerHTML = Name.innerHTML.replace(Pyro,fag);
		Name.innerHTML = Name.innerHTML.replace("Libertarian",'<span style="color:#4DD0FC";>Omniscient</span>');
		Name.innerHTML = Name.innerHTML.replace("Blades.",blades);
		Name.innerHTML = Name.innerHTML.replace(GWIB,GWIAF);
   }
   
      var Images = document.getElementsByTagName('span');
   for (var i = Images.length - 1; i >= 0; i--)
   {
		var Image = Images[i];
		Image.innerHTML = Image.innerHTML.replace(prop,staff);
		Image.innerHTML = Image.innerHTML.replace("http://i.imgur.com/mXoLA.gif?dateline=1333792576?dateline=1333833024", "http://www.hackforums.net:8080/uploads/avatars/avatar_1.png?dateline=1315847960");
   }
   
   var Avatars = document.getElementsByTagName('td');
   for (var i = Avatars.length - 1; i >= 0; i--)
   {
		var Avatar = Avatars[i];
		Avatar.innerHTML = Avatar.innerHTML.replace("http://i.imgur.com/mXoLA.gif?dateline=1333792576?dateline=1333833024", "http://www.hackforums.net:8080/uploads/avatars/avatar_1.png?dateline=1315847960");
   }
   
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
		
  }

   form._submit();
}
window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;