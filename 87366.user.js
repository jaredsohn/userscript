// ==UserScript==
// @name           BK
// @namespace      rasdol
// @include        http://*.oldbk.ru/*
// ==/UserScript==



var  zmenu = document.body;
if ( (document.location.href.indexOf('battle.php', 1)>0  ) || (document.location.href.indexOf('main.php', 1)>0  ) || (document.location.href.indexOf('zayavka.php', 1)>0  ) ) {   
//  alert (document.location.href);
znewm =  "<div><table><tr><td></td></tr></table></div> " ;  

var znewm1 = '<table><tr><td><table width=220 cellspacing=1 cellpadding=0 bgcolor=CCC3AA><tr><td align=center><B>Молчанка</td><td width=20 align=right valign=top style="cursor: hand" onclick=""><BIG><B>x</b></BIG></td></tr><tr><td colspan=2>'+
	'<form action="orden.php" method=POST><table width=100% cellspacing=0 cellpadding=2 bgcolor=FFF6DD><tr><td colspan=2><INPUT TYPE=hidden name=sd4 value="26801"> <INPUT TYPE=hidden NAME="use" value="sleep">'+
	'</TD></TR><TR><TD align=left><INPUT TYPE=text NAME="target" value="">'+
	'<select style="background-color:#eceddf; color:#000000;" name="timer"><option value=15>15 мин<option value=30>30 мин<option value=60>1 час'+
	'<option value=180>3 часа<option value=360>6 часов<option value=720>12 часов<option value=1440>сутки</select>'+
	'</TD><TD width=30><INPUT TYPE="submit" value=" »» "></TD></TR></TABLE></FORM></td></tr></table></td>';


var znewm2 = '<td><table width=180 cellspacing=1 cellpadding=0 bgcolor=CCC3AA><tr><td align=center><B>Убрать молчанку</td><td width=20 align=right valign=top style="cursor: hand" onclick=""><BIG><B>x</b></BIG></td></tr><tr><td colspan=2>'+
	'<form action="orden.php" method=POST><table width=100% cellspacing=0 cellpadding=2 bgcolor=FFF6DD><tr><td colspan=2><INPUT TYPE=hidden name=sd4 value="26801"> <INPUT TYPE=hidden NAME="use" value="sleep_off">'+
	'</TD></TR><TR><TD align=left><INPUT TYPE=text NAME="target" value="">'+
	'</TD><TD width=30><INPUT TYPE="submit" value=" »» "></TD></TR></TABLE></FORM></td></tr></table></td></tr><table>';



zmenu.innerHTML = znewm1 + znewm2 + znewm +  zmenu.innerHTML;  }

