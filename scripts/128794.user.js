// ==UserScript==
// @name            MPGH Script - MPGH Post Helper
// @namespace       Ian/mpghposthelper
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.mpgh.net/*
// @include         http://www.mpgh.net/forum/*
// @include         http://mpgh.net/*
// @include         http://mpgh.net/forum/*
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
		
		re = /\[mpghDave\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/1-dave84311.html][color=#FF0000][MPGH][b][SIZE=3]Dave84311[/SIZE][/b][/color][/url]");
		
		re = /\[mpghDave84311\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/1-dave84311.html][color=#FF0000][MPGH][b][SIZE=3]Dave84311[/SIZE][/b][/color][/url]");
		
		re = /\[mpgharun\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/2-arunforce.html][color=#294E85][MPGH][b][SIZE=3]arunforce[/SIZE][/b][/color][/url]");
		
		re = /\[mpgharunforce\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/2-arunforce.html][color=#294E85][MPGH][b][SIZE=3]arunforce[/SIZE][/b][/color][/url]");
		
		re = /\[mpghLiz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/227380-liz.html][color=#FF0080][MPGH][b][SIZE=3]Liz[/SIZE][/b][/color][/url]");
		
		re = /\[Dave\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/1-dave84311.html][color=#FF0000][b][SIZE=3]Dave84311[/SIZE][/b][/color][/url]");
		
		re = /\[Dave84311\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/1-dave84311.html][color=#FF0000][b][SIZE=3]Dave84311[/SIZE][/b][/color][/url]");
		
		re = /\[arun\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/2-arunforce.html][color=#294E85][b][SIZE=3]arunforce[/SIZE][/b][/color][/url]");
		
		re = /\[arunforce\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/2-arunforce.html][color=#294E85][b][SIZE=3]arunforce[/SIZE][/b][/color][/url]");
		
		re = /\[Liz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/227380-liz.html][color=#FF0080][b][SIZE=3]Liz[/SIZE][/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.mpgh.net/forum/members/1-dave84311.html][color=#FF0000][MPGH][b][SIZE=3]Dave84311[/SIZE][/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.mpgh.net/forum/members/2-arunforce.html][color=#294E85][MPGH][b][SIZE=3]arunforce[/SIZE][/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.mpgh.net/forum/members/227380-liz.html][color=#FF0080][MPGH][b][SIZE=3]Liz[/SIZE][/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\(admin\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//gmods
		
		re = /\[mpghDisturbed\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/231570-disturbed.html][color=#004A40][MPGH][SIZE=3][b]Disturbed[/b][/SIZE][/color][/url]");
		
		re = /\[mpghThunder\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/601258-thunder.html][color=#004A40][MPGH][SIZE=3][b]Thunder[/b][/SIZE][/color][/url]");
		
		re = /\[Disturbed\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/231570-disturbed.html][color=#004A40][SIZE=3][b]Disturbed[/b][/SIZE][/color][/url]");
		
		re = /\[Thunder\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/601258-thunder.html][color=#004A40][SIZE=3][b]Thunder[/b][/SIZE][/color][/url]");
		
		re = /\[gmods\]/gi;
		
		var gmods = '[list]\n';
		gmods = gmods + '[*][url=http://www.mpgh.net/forum/members/231570-disturbed.html][color=#004A40][MPGH][SIZE=3][b]Disturbed[/b][/SIZE][/color][/url]\n';
		gmods = gmods + '[*][url=http://www.mpgh.net/forum/members/601258-thunder.html][color=#004A40][MPGH][SIZE=3][b]Thunder[/b][/SIZE][/color][/url]\n';
		gmods = gmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,gmods);
		
		re = /\(gmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,gmods);
		
		
		//mods
		
		re = /\[mpghJigsaw\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/575639-jigsaw.html][color=#008000][MPGH][SIZE=3][b]Jigsaw[/b][/SIZE][/color][/url]");
		
		re = /\[mpghmaster131\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/539054-master131.html][color=#008000][MPGH][SIZE=3][b]master131[/b][/SIZE][/color][/url]");

		re = /\[mpghRavallo\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][MPGH][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]");

		re = /\[Jigsaw\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/575639-jigsaw.html][color=#008000][SIZE=3][b]Jigsaw[/b][/SIZE][/color][/url]");
		
		re = /\[master131\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/539054-master131.html][color=#008000][SIZE=3][b]master131[/b][/SIZE][/color][/url]");

		re = /\[Ravallo\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]");

		re = /\[Rav\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]");
		
		re = /\[mods\]/gi;
		
		var mods = '[list]\n';
		mods = mods + '[*][url=http://www.mpgh.net/forum/members/575639-jigsaw.html][color=#008000][MPGH][SIZE=3][b]Jigsaw[/b][/SIZE][/color][/url]\n';
		mods = mods + '[*][url=http://www.mpgh.net/forum/members/539054-master131.html][color=#008000][MPGH][SIZE=3][b]master131[/b][/SIZE][/color][/url]\n';
		mods = mods + '[*][url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][MPGH][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]\n';
		mods = mods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mods);
		
		re = /\(mods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mods);

		
		//middleman
		
		re = /\[mpghInsane\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/581062-insane.html][color=#9F80B3][MPGH][SIZE=2][b]Insane[/b][/SIZE][/color][/url]");
		
		re = /\[Insane\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/581062-insane.html][color=#9F80B3][SIZE=2][b]Insane[/b][/SIZE][/color][/url]");
		
		re = /\[middleman\]/gi;
		
		var middleman = '[list]\n';
		middleman = middleman + '[*][url=http://www.mpgh.net/forum/members/581062-insane.html][color=#9F80B3][MPGH][SIZE=2][b]Insane[/b][/SIZE][/color][/url]\n';
		middleman = middleman + '[*][url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][MPGH][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]\n';
		middleman = middleman + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,middleman);
		
		re = /\(middleman\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,middleman);


		//vipsupport
		
		re = /\[mpghAustin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/508859-scata.html][color=#0099FF][MPGH][SIZE=2][b]Scata[/b][/SIZE][/color][/url]");
		
		re = /\[mpghAlen\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/47486-alen.html][color=#0099FF][MPGH][SIZE=2][b]Alen[/b][/SIZE][/color][/url]");

		re = /\[Austin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/508859-scata.html][color=#0099FF][SIZE=2][b]Scata[/b][/SIZE][/color][/url]");
		
		re = /\[Alen\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/47486-alen.html][color=#0099FF][SIZE=2][b]Alen[/b][/SIZE][/color][/url]");
		
		re = /\[vipsupport\]/gi;
		
		var vipsupport = '[list]\n';
		vipsupport = vipsupport + '[*][url=http://www.mpgh.net/forum/members/47486-alen.html][color=#0099FF][MPGH][SIZE=2][b]Alen[/b][/SIZE][/color][/url]\n';
		vipsupport = vipsupport + '[*][url=http://www.mpgh.net/forum/members/508859-scata.html][color=#0099FF][MPGH][SIZE=2][b]Scata[/b][/SIZE][/color][/url]\n';
		vipsupport = vipsupport + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,vipsupport);
		
		re = /\(vipsupport\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,vipsupport);


		//minionplus
				
		re = /\[mpghDoc\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/163386-doc.html][color=#15AB42][MPGH][SIZE=2][b]Doc[/b][/SIZE][/color][/url]");

		re = /\[mpghHero\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/741905-hero.html][color=#15AB42][MPGH][SIZE=2][b]Hero[/b][/SIZE][/color][/url]");

		re = /\[mpghNico\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/717602-nico.html][color=#15AB42][MPGH][SIZE=2][b]Nico[/b][/SIZE][/color][/url]");
		
		re = /\[Doc\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/163386-doc.html][color=#15AB42][SIZE=2][b]Doc[/b][/SIZE][/color][/url]");

		re = /\[Hero\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/741905-hero.html][color=#15AB42][SIZE=2][b]Hero[/b][/SIZE][/color][/url]");

		re = /\[Nico\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/717602-nico.html][color=#15AB42][SIZE=2][b]Nico[/b][/SIZE][/color][/url]");
		
		re = /\[minionplus\]/gi;
		
		var minionplus = '[list]\n';
		minionplus = minionplus + '[*][url=http://www.mpgh.net/forum/members/47486-alen.html][color=#0099FF][MPGH][SIZE=2][b]Alen[/b][/SIZE][/color][/url]\n';
		minionplus = minionplus + '[*][url=http://www.mpgh.net/forum/members/163386-doc.html][color=#15AB42][MPGH][SIZE=2][b]Doc[/b][/SIZE][/color][/url]\n';
		minionplus = minionplus + '[*][url=http://www.mpgh.net/forum/members/741905-hero.html][color=#15AB42][MPGH][SIZE=2][b]Hero[/b][/SIZE][/color][/url]\n';
		minionplus = minionplus + '[*][url=http://www.mpgh.net/forum/members/717602-nico.html][color=#15AB42][MPGH][SIZE=2][b]Nico[/b][/SIZE][/color][/url]\n';
		minionplus = minionplus + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,minionplus);
		
		re = /\(minionplus\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,minionplus);


		//minions
				
		re = /\[mpghaeronyx\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/614439-aeronyx.html][color=#29D684][MPGH][SIZE=2][b]aeronyx[/b][/SIZE][/color][/url]");

		re = /\[mpghbackd00r\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/479371-backd00r.html][color=#29D684][MPGH][SIZE=2][b]BACKD00R[/b][/SIZE][/color][/url]");

		re = /\[mpghBlaze\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/563609-blaze.html][color=#29D684][MPGH][SIZE=2][b]Blaze[/b][/SIZE][/color][/url]");
		
		re = /\[mpghBlitz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/583868-blitz.html][color=#29D684][MPGH][SIZE=2][b]Blitz[/b][/SIZE][/color][/url]");

		re = /\[mpghEminem\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/511133-eminem.html][color=#29D684][MPGH][SIZE=2][b]Eminem[/b][/SIZE][/color][/url]");

		re = /\[mpghflameswor10\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/335267-flameswor10.html][color=#29D684][MPGH][SIZE=2][b]flameswor10[/b][/SIZE][/color][/url]");

		re = /\[mpghHassan\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/553108-hassan.html][color=#29D684][MPGH][SIZE=2][b]Hassan[/b][/SIZE][/color][/url]");

		re = /\[mpghiverson\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/7103-iverson954360.html][color=#29D684][MPGH][SIZE=2][b]iverson954360[/b][/SIZE][/color][/url]");

		re = /\[mpghiverson954360\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/7103-iverson954360.html][color=#29D684][MPGH][SIZE=2][b]iverson954360[/b][/SIZE][/color][/url]");
		
		re = /\[mpghJorndel\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/599915-jorndel.html][color=#29D684][MPGH][SIZE=2][b]Jorndel[/b][/SIZE][/color][/url]");

		re = /\[mpghlolbie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/539823-lolbie.html][color=#29D684][MPGH][SIZE=2][b]lolbie[/b][/SIZE][/color][/url]");

		re = /\[mpghPaladin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/393894-paladin.html][color=#29D684][MPGH][SIZE=2][b]Paladin[/b][/SIZE][/color][/url]");

		re = /\[mpghpie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/801059-pie.html][color=#29D684][MPGH][SIZE=2][b]Pie[/b][/SIZE][/color][/url]");

		re = /\[mpghRoyku\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/559753-royku.html][color=#29D684][MPGH][SIZE=2][b]Royku[/b][/SIZE][/color][/url]");

		re = /\[mpghVersa\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/490583-versa.html][color=#29D684][MPGH][SIZE=2][b]Versa[/b][/SIZE][/color][/url]");
		
		re = /\[mpghWoods\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/627052-woods.html][color=#29D684][MPGH][SIZE=2][b]Woods[/b][/SIZE][/color][/url]");

		re = /\[aeronyx\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/614439-aeronyx.html][color=#29D684][SIZE=2][b]aeronyx[/b][/SIZE][/color][/url]");

		re = /\[backd00r\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/479371-backd00r.html][color=#29D684][SIZE=2][b]BACKD00R[/b][/SIZE][/color][/url]");

		re = /\[Blaze\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/563609-blaze.html][color=#29D684][SIZE=2][b]Blaze[/b][/SIZE][/color][/url]");
		
		re = /\[Blitz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/583868-blitz.html][color=#29D684][SIZE=2][b]Blitz[/b][/SIZE][/color][/url]");

		re = /\[Eminem\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/511133-eminem.html][color=#29D684][SIZE=2][b]Eminem[/b][/SIZE][/color][/url]");

		re = /\[flameswor10\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/335267-flameswor10.html][color=#29D684][SIZE=2][b]flameswor10[/b][/SIZE][/color][/url]");

		re = /\[Hassan\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/553108-hassan.html][color=#29D684][SIZE=2][b]Hassan[/b][/SIZE][/color][/url]");

		re = /\[iverson\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/7103-iverson954360.html][color=#29D684][SIZE=2][b]iverson954360[/b][/SIZE][/color][/url]");

		re = /\[iverson954360\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/7103-iverson954360.html][color=#29D684][SIZE=2][b]iverson954360[/b][/SIZE][/color][/url]");
		
		re = /\[Jorndel\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/599915-jorndel.html][color=#29D684][SIZE=2][b]Jorndel[/b][/SIZE][/color][/url]");

		re = /\[lolbie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/539823-lolbie.html][color=#29D684][SIZE=2][b]lolbie[/b][/SIZE][/color][/url]");

		re = /\[Paladin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/393894-paladin.html][color=#29D684][SIZE=2][b]Paladin[/b][/SIZE][/color][/url]");

		re = /\[Pie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/801059-pie.html][color=#29D684][SIZE=2][b]Pie[/b][/SIZE][/color][/url]");

		re = /\[Royku\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/559753-royku.html][color=#29D684][SIZE=2][b]Royku[/b][/SIZE][/color][/url]");

		re = /\[Versa\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/490583-versa.html][color=#29D684][SIZE=2][b]Versa[/b][/SIZE][/color][/url]");
		
		re = /\[Woods\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.mpgh.net/forum/members/627052-woods.html][color=#29D684][SIZE=2][b]Woods[/b][/SIZE][/color][/url]");

		re = /\[camods\]/gi;
		
		var camods = '[list]\n';
		camods = camods + '[*][url=http://www.mpgh.net/forum/members/393894-paladin.html][color=#29D684][MPGH][SIZE=2][b]Paladin[/b][/SIZE][/color][/url]\n';
		camods = camods + '[*][url=http://www.mpgh.net/forum/members/511133-eminem.html][color=#29D684][MPGH][SIZE=2][b]Eminem[/b][/SIZE][/color][/url]\n';
		camods = camods + '[*][url=http://www.mpgh.net/forum/members/335267-flameswor10.html][color=#29D684][MPGH][SIZE=2][b]flameswor10[/b][/SIZE][/color][/url]\n';
		camods = camods + '[*][url=http://www.mpgh.net/forum/members/614439-aeronyx.html][color=#29D684][MPGH][SIZE=2][b]aeronyx[/b][/SIZE][/color][/url]\n';
		camods = camods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,camods);
		
		re = /\(camods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,camods);


		re = /\[cfmods\]/gi;
		
		var cfmods = '[list]\n';
		cfmods = cfmods + '[*][url=http://www.mpgh.net/forum/members/575639-jigsaw.html][color=#008000][MPGH][SIZE=3][b]Jigsaw[/b][/SIZE][/color][/url]\n';
		cfmods = cfmods + '[*][url=http://www.mpgh.net/forum/members/508859-scata.html][color=#0099FF][MPGH][SIZE=2][b]Scata[/b][/SIZE][/color][/url]\n';
		cfmods = cfmods + '[*][url=http://www.mpgh.net/forum/members/741905-hero.html][color=#15AB42][MPGH][SIZE=2][b]Hero[/b][/SIZE][/color][/url]\n';
		cfmods = cfmods + '[*][url=http://www.mpgh.net/forum/members/559753-royku.html][color=#29D684][MPGH][SIZE=2][b]Royku[/b][/SIZE][/color][/url]\n';
		cfmods = cfmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,cfmods);
		
		re = /\(cfmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,cfmods);


		re = /\[codmods\]/gi;
		
		var codmods = '[list]\n';
		codmods = codmods + '[*][url=http://www.mpgh.net/forum/members/539054-master131.html][color=#008000][MPGH][SIZE=3][b]master131[/b][/SIZE][/color][/url]\n';
		codmods = codmods + '[*][url=http://www.mpgh.net/forum/members/599915-jorndel.html][color=#29D684][MPGH][SIZE=2][b]Jorndel[/b][/SIZE][/color][/url]\n';
		codmods = codmods + '[*][url=http://www.mpgh.net/forum/members/539823-lolbie.html][color=#29D684][MPGH][SIZE=2][b]lolbie[/b][/SIZE][/color][/url]\n';
		codmods = codmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,codmods);
		
		re = /\(codmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,codmods);

		re = /\[avamods\]/gi;

		var avamods = '[list]\n';
		avamods = avamods + '[*][url=http://www.mpgh.net/forum/members/627052-woods.html][color=#29D684][MPGH][SIZE=2][b]Woods[/b][/SIZE][/color][/url]\n';
		avamods = avamods + '[*][url=http://www.mpgh.net/forum/members/801059-pie.html][color=#29D684][MPGH][SIZE=2][b]Pie[/b][/SIZE][/color][/url]\n';
		avamods = avamods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,avamods);
		
		re = /\(avamods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,avamods);


		re = /\[generalmods\]/gi;
		
		var generalmods = '[list]\n';
		generalmods = generalmods + '[*][url=http://www.mpgh.net/forum/members/163386-doc.html][color=#15AB42][MPGH][SIZE=2][b]Doc[/b][/SIZE][/color][/url]\n';
		generalmods = generalmods + '[*][url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][MPGH][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]\n';
		generalmods = generalmods + '[*][url=http://www.mpgh.net/forum/members/7103-iverson954360.html][color=#29D684][MPGH][SIZE=2][b]iverson954360[/b][/SIZE][/color][/url]\n';
		generalmods = generalmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,generalmods);
		
		re = /\(generalmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,generalmods);


		re = /\[helpmods\]/gi;
		
		var helpmods = '[list]\n';
		helpmods = helpmods + '[*][url=http://www.mpgh.net/forum/members/583868-blitz.html][color=#29D684][MPGH][SIZE=2][b]Blitz[/b][/SIZE][/color][/url]\n';
		helpmods = helpmods + '[*][url=http://www.mpgh.net/forum/members/47486-alen.html][color=#0099FF][MPGH][SIZE=2][b]Alen[/b][/SIZE][/color][/url]\n';
		helpmods = helpmods + '[*][url=http://www.mpgh.net/forum/members/95192-ravallo.html][color=#008000][MPGH][SIZE=3][b]Ravallo[/b][/SIZE][/color][/url]\n';
		helpmods = helpmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,helpmods);
		
		re = /\(helpmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,helpmods);


		re = /\[mcmods\]/gi;
		
		var mcmods = '[list]\n';
		mcmods = mcmods + '[*][url=http://www.mpgh.net/forum/members/627052-woods.html][color=#29D684][MPGH][SIZE=2][b]Woods[/b][/SIZE][/color][/url]\n';
		mcmods = mcmods + '[*][url=http://www.mpgh.net/forum/members/563609-blaze.html][color=#29D684][MPGH][SIZE=2][b]Blaze[/b][/SIZE][/color][/url]\n';
		mcmods = mcmods + '[*][url=http://www.mpgh.net/forum/members/393894-paladin.html][color=#29D684][MPGH][SIZE=2][b]Paladin[/b][/SIZE][/color][/url]\n';
		mcmods = mcmods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mcmods);
		
		re = /\(mcmods\)/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mcmods);

  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;