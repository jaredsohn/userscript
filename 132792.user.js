// ==UserScript==
// @name            Canned Speech for Genuine
// @namespace       kewlz/Genuine
// @description     Adds additional phrases that can be used in posts as a symbol for something else. This script is written by xerotic, Mr Kewl just updated it.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         0.2
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		//Mentors

		elmTextarea.value = elmTextarea.value.replace("<3","&#9829;");
		
		var re = /\[xerotic\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]");
		
		re = /\[AsSaSsaiN\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]AsSaSs@iN[/b][/color][/url]");
		
		re = /\[cobija\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]");

		re = /\[iNviZ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]");
		
		re = /\[Joey Tribbiani\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]");
		
		re = /\[Kn1ght\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]");
		
		re = /\[Kr4z1\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]");
		
		re = /\[kutmustakurt\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]");
		
		re = /\[N3w_2_H@Ck1n\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]");
		
		re = /\[n2h\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]");
		
		re = /\[Richie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]");
		
		re = /\[Robbieava\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]");
		
		re = /\[Rusty_v\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=47970][color=#AAAAFF][b]Rusty_v[/b][/color][/url]");

                re = /\[Skill\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]");
		
		re = /\[Soldier of Fortune\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]");
		
		re = /\[sof\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]");
		
		re = /\[Tsgh Mike\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=81119][color=#AAAAFF][b]Tsgh Mike[/b][/color][/url]");
		
		re = /\[Guru\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=255981][color=#AAAAFF][b]Guru[/b][/color][/url]");
		
			re = /\[Crow\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#AAAAFF][b]Crow[/b][/color][/url]");
		
			re = /\[Genuine\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=646916][color=#AAAAFF][b]Genuine[/b][/color][/url]");
		
			re = /\[Paradoxum\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=#AAAAFF][b]Paradoxum[/b][/color][/url]");
		
			re = /\[Para\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=#AAAAFF][b]Paradoxum[/b][/color][/url]");
		
				re = /\[T3h Hack3r\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=#AAAAFF][b]T3h Hack3r[/b][/color][/url]");
		
		re = /\[th\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=#AAAAFF][b]T3h Hack3r[/b][/color][/url]");
		
			re = /\[The Rated R Superstar\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]");

		re = /\[trrs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]");
		
		re = /\[Astonish\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=657392][color=#AAAAFF][b]Astonish[/b][/color][/url]");
		
			re = /\[VV\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=7807][color=#AAAAFF][b]VipVince[/b][/color][/url]");
			re = /\[VipVince\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=7807][color=#AAAAFF][b]VipVince[/b][/color][/url]");
		
		
		re = /\[mentors\]/gi;
		
		var mentors = '[list]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]AsSaSs@iN[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=657392][color=#AAAAFF][b]Astonish[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]\n';
	    mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#AAAAFF][b]Crow[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=646916][color=#AAAAFF][b]Genuine[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=255981][color=#AAAAFF][b]Guru[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=#AAAAFF][b]Paradoxum[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=47970][color=#AAAAFF][b]Rusty_v[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81119][color=#AAAAFF][b]Tsgh Mike[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=#AAAAFF][b]T3h Hack3r[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=7807][color=#AAAAFF][b]VipVince[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]\n';
		mentors = mentors + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		re = /\[mentor\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		
		//Admins
		re = /\[Factor8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[F8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Factor8&#153;");
		
	
		
		re = /\[Judge Dredd\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[JD\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Judge Dredd");
		
		re = /\[Omniscient\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Omni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Omniscient");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
		
		
		
		re = /\[Peter]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Peter Chao");
		
				re = /\[Re\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"ReactioNz);
		
		re = /\[Xchange\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Xch4ng3");
		
		re = /\[X4\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=lime][b]ReactioNz[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]\n';
		staff = staff + '[/list]'; 
		
		elmTextarea.value = elmTextarea.value.replace(re,staff);
		
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://www.hackforums.net/stafflist.php");
		
		re = /\[firewall\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=19][img]http://img36.imageshack.us/img36/6350/b40fce0cf05345e4b6fb20a.png[/img][/url]");
		
		re = /\[firewall2\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/contact.php][img]http://img545.imageshack.us/img545/7181/e522407c439a4f668cb9a5d.png[/img][/url]");
		
		re = /\[stolenacc\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][img]http://img708.imageshack.us/img708/3685/bd53cc6a9be74c5ea1f7f96.png[/img][/url]");
		
		
		re = /\[prestige\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/showthread.php?tid=2288745][img]http://img844.imageshack.us/img844/1992/11a11ceb16c743e481b2431.png[/img][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");

                re = /\[repabuse\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/forumdisplay.php?fid=194][img]http://img220.imageshack.us/img220/6320/558bc989fbe64f8bb469508.png[/img][/url]");
		
		re = /\[repabuse2\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][img]http://img341.imageshack.us/img341/588/bce49609600a49ff89db467.png[/img][/url]");

                re = /\[pm1\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Hey man, this looks really promising. I would like to have this.");

  re = /\[pm2\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Wow! Thanks for sharing this with us. I would love to have this.");
		
  
  re = /\[pm3\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"This is a great share, I'm sure it's useful. I would like this, thanks!");
		
 re = /\[pm4\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"I would like this, thanks in advance!");
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;