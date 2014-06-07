// ==UserScript==
// @name           Facepunch in the Eyes of an Advanced Lua Coder
// @description    Makes Facepunch Studios awesome.
// @include        http://forums.facepunchstudios.com/*
// ==/UserScript==

var divs2         = document.getElementsByTagName('title');
var num = 0;
var divs         = document.getElementsByTagName('tbody');
for (var i=0;i<divs.length;i++) {
	num = num + 1;
		
	if (num == 9 && divs2[0].innerHTML == 'Facepunch Studios (Forums)'){
		divs[i].innerHTML = '<tr align="center"><td class="fh_iconnew"><img src="/images/as/statusicon/forum_new.gif" alt="" border="0" /></td><td class="fh_namenew" align="left" id="f6"><div><a href="forumdisplay.php?f=67"><strong style="color: #959">Advanced Lua Coders</strong></a> <span class="smallfont">( 1 Viewing <img src="http://forums.facepunchstudios.com/images/smilies/frown.png"> )</span><div class="smallfont" style="color: #999">Advanced Lua Coders only. Sorry Conna. </div></td>	<td class="fh_lastpostnew" nowrap="nowrap"><div class="smallfont" align="left"><div style="clear:both"><a style="text-decoration: underline;" href="showthread.php?goto=newpost&amp;t=660755" title="Go to first unread post in thread Where do you do your Christmas shopping?">NO MORE DEMOCRACY</a></div><div><strong>by <a href="/huntskikbut" rel="nofollow"><strong><font size=4 color=#aa00aa>Dictator Hunts</font></strong></a></strong></div><div align="right">1 Minute Ago <a href="showthread.php?t=661100"><img class="inlineimg" src="/images/as/buttons/lastpost.gif" alt="Go to last post" border="0" /></a></div></div></td><td class="fh_threadsnew">1,337</td><td class="fh_repliesnew">9,001</td></tr>' + divs[i].innerHTML;
	}
}

var divs         = document.getElementsByTagName('a');
for (var i=0;i<divs.length;i++) {		
	if (divs[i].innerHTML == 'huntskikbut'){
		divs[i].innerHTML = '<strong><font size=4 color=#aa00aa>Dictator Hunts</font></strong>';
	}else if (divs[i].innerHTML == 'Jinto'){
		divs[i].innerHTML = '<font size=2 color=#aa00aa>Comrade Jinto</font>';
	}else if (divs[i].innerHTML == '<strong><font color="#00aa00">mahalis</font></strong>'){
		divs[i].innerHTML = '<font size=3 color=#aa00aa>Lord Mahalas</font>';
	}else if (divs[i].innerHTML == '<strong><font color="#a06000">tad2020</font></strong>'){
		divs[i].innerHTML = '<font size=3 color=#aa00aa>Lord Tad2020</font>';
	}else if (divs[i].innerHTML == 'Termy58'){
		divs[i].innerHTML = '<strong><font size=3 color=#ff0000>Blasphemer Termy58</font></strong>';
	}
}

var num = 0;
var divs         = document.getElementsByTagName('div');
for (var i=0;i<divs.length;i++) {
	num = num + 1;
		
	if (num == 10 && divs2[0].innerHTML == 'Facepunch Studios - The Rules'){
		divs[i].innerHTML = "<h1 style='color: #959'>The Sacred Mandate of the Advanced Lua Coders Forum</h1><ol><li>No normies allowed. That's right. Normies can no longer post in our beloved forum section. This shouldn't be very hard to enforce. Easy rule.<li>Only I can start threads. I'm sorry, but this is a must. we can't have the whole population of Advanced Lua Coders spamming threads, can we? Of course not.<li>I wish to change the current rule number 2 to rule 3 and place this rule in number 2 instead, as it goes along with rule number 1. No moderators are allowed to post here also, except maybe Hezzy and that huge heart lady that apparently got raped. I dunno, I try not to keep up with that kinda pop culture bullshit. It really pisses me off sometimes. Well, at least we have hezzy back, and he can start answering my confessions again. I was getting worried that I was sending them to the wrong email address. ANYWAYS, lets continue.<li>Stay with me, if this rule numbering confuse you, you need to leave. NOW. That means you cunna. Get going. Okay. Now, for rule number 4... uhm... lets go with only post relevant shit in this forum section. No more of this random stuff about elections of things and shit. I want to see some SERIOUS advanced lua stuff around here.<li>Todas las nuevas normas debe hacerse en español. Sin excepciones. Si no está de acuerdo con esta norma, puede perderse, \"amigo\". Asimismo, besar mi trasero sistema de smartness.<li>Nuevos miembros no pueden unirse a nuestra sagrada fraternidad de tres. Excepto tal vez Darkspider. Él es un poco frío.</ol>" + divs[i].innerHTML;
	}
}