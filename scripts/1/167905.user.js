// ==UserScript==
// @name        HezColorBox
// @namespace   HezColorBox
// @description Hezerkiel met de la couleur dans vos vie. =)
// @include     http://*.fourmizzz.fr/alliance.php
// @include     http://*.fourmizzz.fr/alliance.php?color=*
// @include     http://*.fourmizzz.fr/chat.php
// @include     http://*.fourmizzz.fr/chat.php?color=*
// @version     1
// ==/UserScript==
var _url=document.location.href;
var _hezCk=readCookie("_hezColor");
var _sub0='if(/^[0-9a-fA-F]{6}$/.test(this.color.value)){return true;} document.getElementById("_hError").innerHTML="Erreur de format: la couleur doit être de la forme 00abcdef (6 caractères hex..).";return false;';

document.getElementById("formulaireChat").innerHTML+="<img src='http://i271.photobucket.com/albums/jj158/XxX_Animekiss/Smileys/Pyong%20Red%20Fox%20Smileys/msn_red_fox_smilies-01.gif' style='height:20px;cursor:pointer;' onclick='changerCookieSmiley(\"100\");'></img>";
document.getElementById("formulaireChat").innerHTML+="<strong style=\"cursor: pointer;color:#c5130f\" title=\"Couleur\" onclick=\"spoilerId('listeCouleurmessage270334')\">A</strong><span style='cursor:pointer;' ><img onclick=\"miseEnForme('message','gras');\" title=\"Gras\" src=\"images/BBCode/bold.png\"><img onclick=\"miseEnForme('message','italic');\" title=\"Italique\" src=\"images/BBCode/italic.png\"><img onclick=\"miseEnForme('message','souligne');\" title=\"Souligné\" src=\"images/BBCode/underline.png\"><img onclick=\"miseEnForme('message','img');\" title=\"Image\" src=\"images/BBCode/picture.png\"><img onclick=\"miseEnForme('message','url');\" title=\"Lien\" src=\"images/BBCode/link.png\"><img onclick=\"miseEnForme('message','player');\" title=\"Pseudo\" src=\"images/BBCode/membre.gif\" height=\"15`\"><img onclick=\"miseEnForme('message','ally');\" title=\"Alliance\" src=\"images/BBCode/groupe.gif\" height=\"15\"></span><br><div id=\"listeCouleurmessage270334\" class=\"listeCouleur\" style=\"margin-top: 5px; display: none;\"><img src=\"images/BBCode/000000.gif\" id=\"000000\" onclick=\"miseEnCouleur('message270334','message','000000');\"><img src=\"images/BBCode/242424.gif\" id=\"242424\" onclick=\"miseEnCouleur('message270334','message','242424');\"><img src=\"images/BBCode/331000.gif\" id=\"331000\" onclick=\"miseEnCouleur('message270334','message','331000');\"><img src=\"images/BBCode/663300.gif\" id=\"663300\" onclick=\"miseEnCouleur('message270334','message','663300');\"><img src=\"images/BBCode/600000.gif\" id=\"600000\" onclick=\"miseEnCouleur('message270334','message','600000');\"><img src=\"images/BBCode/8B0000.gif\" id=\"8B0000\" onclick=\"miseEnCouleur('message270334','message','8B0000');\"><img src=\"images/BBCode/c5130f.gif\" id=\"c5130f\" onclick=\"miseEnCouleur('message270334','message','c5130f');\"><img src=\"images/BBCode/b21377.gif\" id=\"b21377\" onclick=\"miseEnCouleur('message270334','message','b21377');\"><img src=\"images/BBCode/800d55.gif\" id=\"800d55\" onclick=\"miseEnCouleur('message270334','message','800d55');\"><img src=\"images/BBCode/4c0833.gif\" id=\"4c0833\" onclick=\"miseEnCouleur('message270334','message','4c0833');\"><img src=\"images/BBCode/4B0082.gif\" id=\"4B0082\" onclick=\"miseEnCouleur('message270334','message','4B0082');\"><img src=\"images/BBCode/9400D3.gif\" id=\"9400D3\" onclick=\"miseEnCouleur('message270334','message','9400D3');\"><img src=\"images/BBCode/4d08f0.gif\" id=\"4d08f0\" onclick=\"miseEnCouleur('message270334','message','4d08f0');\"><img src=\"images/BBCode/0000FF.gif\" id=\"0000FF\" onclick=\"miseEnCouleur('message270334','message','0000FF');\"><img src=\"images/BBCode/000099.gif\" id=\"000099\" onclick=\"miseEnCouleur('message270334','message','000099');\"><img src=\"images/BBCode/000031.gif\" id=\"000031\" onclick=\"miseEnCouleur('message270334','message','000031');\"><img src=\"images/BBCode/004c4c.gif\" id=\"004c4c\" onclick=\"miseEnCouleur('message270334','message','004c4c');\"><img src=\"images/BBCode/007373.gif\" id=\"007373\" onclick=\"miseEnCouleur('message270334','message','007373');\"><img src=\"images/BBCode/09750c.gif\" id=\"09750c\" onclick=\"miseEnCouleur('message270334','message','09750c');\"><img src=\"images/BBCode/084c08.gif\" id=\"084c08\" onclick=\"miseEnCouleur('message270334','message','084c08');\"></div>";
document.getElementById("formulaireChat").innerHTML+='<br/><div id="tousLesSmiley100" class="tousLesSmiley"  style="margin-top:-25px;display: none;">Bientôt un pack de smileys.</div>';
if(_url.substr(23,12)=="alliance.php")
{
	document.getElementById("alliance").innerHTML+="<form method='get' onSubmit='"+_sub0+"'><table style='witdh:400px; background-color: rgb(71,71,71); text-align: center; font-family:Arial, Helvetica, sans-serif; color: black; font-size: small;' align='center' cellpadding='4' cellspacing='1'><TR><TD style='background-color:rgb(168,168,168);'>Couleur:</TD><TD style='background-color:rgb(168,168,168);'><input name='color' style='width:50px;'></input></TD></TR></table></form><div id='_hError'></div>";
	if(_url.substr(35,7)=="?color=")
	{
		createCookie('_hezColor',_url.substr(42,6),31);
		document.location.href=_url.substr(0,35);
	}
	else if(_hezCk != null)
	{
		var _sub="this.message.value='[color=#"+_hezCk+"]'+this.message.value+'[/color]';";
		document.getElementById("formulaireChat").setAttribute("onSubmit",_sub);	
	}
}
else if(_url.substr(23,8)=="chat.php")
{
	document.getElementById("chatAlliance").innerHTML+="<form method='get' onSubmit='"+_sub0+"'><table style='witdh:400px; background-color: rgb(71,71,71); text-align: center; font-family:Arial, Helvetica, sans-serif; color: black; font-size: small;' align='center' cellpadding='4' cellspacing='1'><TR><TD style='background-color:rgb(168,168,168);'>Couleur:</TD><TD style='background-color:rgb(168,168,168);'><input name='color' style='width:50px;'></input></TD></TR></table></form><div id='_hError'></div>";
	if(_url.substr(31,7)=="?color=")
	{
		createCookie('_hezColor',_url.substr(38,6),31);
		document.location.href=_url.substr(0,31);
	}
	else if(_hezCk != null)
	{
		var _sub="this.message.value='[color=#"+_hezCk+"]'+this.message.value+'[/color]';";
		document.getElementById("formulaireChat").setAttribute("onSubmit",_sub);
	}
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}