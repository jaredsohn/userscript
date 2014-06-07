// ==UserScript==
// @name            HF Script - HF Post Helper
// @namespace       HackForums Post Helper Update - Ambyx
// @description     Adds more MyCode for Mentor's, Staff and Admin's.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.3-Ambyx
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
		
		re = /\[Miah\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]Miah[/b][/color][/url]");
		
		re = /\[cobija\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]");

		re = /\[iNviZ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]");

                                re = /\[Positive\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=323740][color=#AAAAFF][b]Positive[/b][/color][/url]");

                re = /\[Glassy\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=734805][color=#AAAAFF][b]Glassy[/b][/color][/url]");
		
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
		
		re = /\[Richie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]");
		
		re = /\[Robbieava\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]");

        re = /\[Skill\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]");
		
		re = /\[Soldier of Fortune\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]");
		
		re = /\[The Rated R Superstar\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]");
re = /\[-BoodyE-\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=115612][color=#AAAAFF][b]-BoodyE-[/b][/color][/url]");

re = /\[Wolves\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=651051][color=#AAAAFF][b]Wolves[/b][/color][/url]");
		
		re = /\[mentors\]/gi;
		
		var mentors = '[list]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]Miah[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]\n';
                mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=734805][color=#AAAAFF][b]Glassy[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=115612][color=#AAAAFF][b]-BoodyE-[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#AAAAFF][b]Crow[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=323740][color=#AAAAFF][b]Positive[/b][/color][/url]\n';
	    mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=255981][color=AAAAFF][b]Guru[/b][/color][/url]\n'
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=128873]color=AAAAFF][b]T3h Hack3r[/b][/color][/url]\n'
                                mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=651051][color=#AAAAFF][b]Wolves[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=7807][color=#AAAAFF][b]VipVince[/b][/color][/url]\n';
		mentors = mentors + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		re = /\[mentor\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		
		//Admins
		
		re = /\[Judge Dredd\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[JD\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[Omniscient\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Omni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Factor8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
			
		re = /\[Peter Chao\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]");

		re = /\[Xch4ng3\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[Chris\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=lime][b]Chris[/b][/color][/url]");
		re = /\[Paradoxum\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,
"[*][url=http://www.hackforums.net/member.php?action=profile&uid=70881][color=#AAAAFF][b]Paradoxum[/b][/color][/url]");
		
		re = /\[Genuine\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=646916][color=lime][b]Genuine[/b][/color][/url]");

                                re = /\[bugga\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=661940][color=lime][b]bugga[/b][/color][/url]");
		
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
                staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=646916][color=lime][b]Genuine[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Moralitas[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=lime][b]Chris[/b][/color][/url]\n';
                                staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=661940][color=lime][b]bugga[/b][/color][/url]\n';
		staff = staff + '[/list]'; 
		
		elmTextarea.value = elmTextarea.value.replace(re,staff);
		
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://www.hackforums.net/showstaff.php");
		
		re = /\[pmomni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/private.php?action=send&uid=1]PM [color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");

                re = /\[Help Docs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");
		        re = /\[ReadHelpDocs\]/gi;
	    elmTextarea.value = elmTextarea.value.replace(re,"We recommend you take the time to read the HF [url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url], the answer to your question should be contained in there.");
		
		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;