// ==UserScript==
// @name            HF Script - Scar Post Helper
// @namespace       scar/scarsposthelper
// @description     Based on Xerotic's excellent script, this is a custom version for Scar_ to use.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         3.1
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
		
		//START Scar's Section
		
		re = /\[35char\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'Please note that your post is intentionally bypassing the 35 character limit and is therefore considered low quality. Posts like these generally do not make you look intelligent nor will they get you respect around this forum. If you are unable to be creative enough to reach 35 characters, please refrain from posting at all.');
		
		re = /\[vouch\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'I would like to give a vouch to this user. You are an excellent member, keep up the great work.');
		
		re = /\[giveaway\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'This looks like an awesome giveaway, would you mind sending me a link? Thanks.');
		
		re = /\[contest\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'Awesome contest, thanks for hosting it! Could you enter me at number ');
		
		re = /\[php\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'You can find more information about the PHP language, along with a free download, at the PHP website: [url=www.php.net][b]www.php.net[/b][/url], along with a great tutorial to get started at the W3Schools website: [url=www.w3schools.com/php/]www.w3schools.com/php/[/url]. Be sure to PM me if you have any further questions.');
		
		re = /\[runescape\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'These types of posts are not allowed. Please review the rules below. \n [list][*]1. No RS account giveaways, trading, buying, or selling.\n[*]2. No Marketplace threads. Use the Virtual Items forum.\n[*]3. No begging for free items like gold or equipment.\n[*]4. No discussions on stealing RS accounts.\n[*]5. No discussion on product keys or bot auth codes.[/list] [help]');
		
		re = /\[mysql\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'You can find more information about MySQL, along with a free download, at the MySQL website: [url=www.mysql.com][b]www.mysql.com[/b][/url], along with a great tutorial on how to get started at the W3Schools website: [url=www.w3schools.com/sql/default.asp]www.w3schools.com/sql/default.asp[/url]. Be sure to PM me if you have any further questions.');

		re = /\[ebook\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'All ebook sales threads should use the following template along with any additional information the seller wishes to add.\n\n[b]Sales Template[/b]\n==\nTitle:\nAuthor:\nPages:\nDescription:\nPayment Options:\nCopies Available:\nResale Rights:\nPrice: \n');

		re = /\[portforward\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'You can find some good information about port forwarding at the Wikipedia page located here:\n\n [url=http://en.wikipedia.org/wiki/Port_forwarding][b]www.wikipedia.com[/b][/url]\n\nalong with many user manuals for hundreds of common routers located here:\n\n [url=http://portforward.com/][b]www.portforward.com[/b][/url]\n\nIf you have any addition questions which those links do not answer, please do not hesitate to PM me. \nBest of luck.');

		re = /\[truecrypt\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'You can find more information about TrueCrypt, along with a free download, at the TrueCrypt website: [url=www.truecrypt.com][b]www.truecrypt.com[/b][/url], along with a great tutorial on how to get started located right on the site: [url=www.truecrypt.org/docs/tutorial][b]www.truecrypt.org/docs/tutorial[/b][/url]. Be sure to PM me if you have any further questions.');
		
		re = /\[mcrules\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re, 'This is no longer allowed. I advise you to read the rules of the forum before posting, or actions may be taken against your account. The rules regarding Minecraft accounts are: [list]\n[*]1. No selling, buying, or trading of MC accounts.\n[*]2. No discussions on cracking or stealing MC accounts.\n[*]3. No giveaways or requests for free MC accounts.\n[*]4. No selling, trading, buying, offering, requesting any MC codes for new accounts.\n[/list]');
		
		//END Scar's Section

		re = /\[iNviZ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]");
		
		re = /\[mentors\]/gi;
		
		var mentors = '[list]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]AsSaSs@iN[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=47970][color=#AAAAFF][b]Rusty_v[/b][/color][/url]\n';
        mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81119][color=#AAAAFF][b]Tsgh Mike[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]\n';
		mentors = mentors + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		re = /\[mentor\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		
		//Admins
		
		re = /\[Crow\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#4DD0FC][b]Crow[/b][/color][/url]");
		
		re = /\[Judge Dredd\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[JD\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[Omniscient\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Omni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#4DD0FC][b]Crow[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
		
		re = /\[Factor8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=lime][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[F8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=lime][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[Peter Chao\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]");
		
		re = /\[T3h Hack3r\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]");
		
		re = /\[th\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]");

		re = /\[The Rated R Superstar\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=lime][b]The Rated R Superstar[/b][/color][/url]");

		re = /\[trrs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=lime][b]The Rated R Superstar[/b][/color][/url]");
		
		re = /\[Xch4ng3\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[X4\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=lime][b]Factor8&#153;[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=lime][b]The Rated R Superstar[/b][/color][/url]\n';
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
		
		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;