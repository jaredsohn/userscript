// ==UserScript==
// @name           Facepunch in the Eyes of OIFY
// @description    Makes Facepunch Studios awesome.
// @include        http://forums.facepunchstudios.com/*
// ==/UserScript==

var divs2         = document.getElementsByTagName('title');
var num = 0;
var divs         = document.getElementsByTagName('tbody');
for (var i=0;i<divs.length;i++) {
	num = num + 1;
		
	if (num == 9 && divs2[0].innerHTML == 'Facepunch Studios (Forums)'){
		divs[i].innerHTML = '<tr align="center"><td class="fh_iconnew"><img src="/images/as/statusicon/forum_new.gif" alt="" border="0" /></td><td class="fh_namenew" align="left" id="f6"><div><a href="forumdisplay.php?f=56"><strong style="color: #00FF00">OIFY-INTERNET</strong></a> <span class="smallfont">( 1 Viewing <img src="http://forums.facepunchstudios.com/images/smilies/sax.png"> )</span><div class="smallfont" style="color: #999">NIGGERS NIGGERS NIGGERS NIGGERS </div></td>	<td class="fh_lastpostnew" nowrap="nowrap"><div class="smallfont" align="left"><div style="clear:both"><a style="text-decoration: underline;" href="showthread.php?goto=newpost&amp;t=660755" title="Go to first unread post in thread Where do you do your Christmas shopping?">NO MORE DEMOCRACY</a></div><div><strong>by <a href="/huntskikbut" rel="nofollow"><strong><font size=4 color=#aa00aa>Dictator Hunts</font></strong></a></strong></div><div align="right">1 Minute Ago <a href="showthread.php?t=661100"><img class="inlineimg" src="/images/as/buttons/lastpost.gif" alt="Go to last post" border="0" /></a></div></div></td><td class="fh_threadsnew">1,337</td><td class="fh_repliesnew">9,001</td></tr>' + divs[i].innerHTML;
	}
}

var divs         = document.getElementsByTagName('a');
for (var i=0;i<divs.length;i++) {		
	if (divs[i].innerHTML == 'Phenix'){
		divs[i].innerHTML = '<strong><font size=4 color=#00FF00>Nigger Phenix</font></strong>';
	}else if (divs[i].innerHTML == 'Greeman'){
		divs[i].innerHTML = '<font size=2 color=#00FF00>Sheriff of OIFY Greeman</font>';
	}else if (divs[i].innerHTML == 'Craptasket'){
		divs[i].innerHTML = '<font size=3 color=#00FF00>WATCH MY TEMPER</font>';
	}else if (divs[i].innerHTML == 'arn0ld'){
		divs[i].innerHTML = '<font size=3 color=#aa00aa>VOLAND         (THIS GUY IS A FAGGOT)</font>';
	}else if (divs[i].innerHTML == 'pyrofiliac'){
		divs[i].innerHTML = '<strong><font size=3 color=#FAAFBE>LOL FURFAG</font></strong>';
	}
}

var num = 0;
var divs         = document.getElementsByTagName('div');
for (var i=0;i<divs.length;i++) {
	num = num + 1;
		
	if (num == 10 && divs2[0].innerHTML == 'Facepunch Studios - The Rules'){
		divs[i].innerHTML = "<h1 style='color: #00FF00'>RULES OF OIFY</h1><ol><li>Arn0ld is Voland, do not forget.<li>No gay threads.<li>You're a faggots unless told otherwise<li>SPANISH THISNSSKDFKLSND<li>Nuevos miembros no pueden unirse a nuestra sagrada fraternidad de tres. Excepto tal vez Darkspider. Él es un poco frío.</ol>" + divs[i].innerHTML;
	}
}