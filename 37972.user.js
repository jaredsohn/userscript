// ==UserScript==
// @name           JvEasySmiley
// @namespace       
// @description    Facilite l'utilisation des smileys lors de la rédaction d'un post
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

function extraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<table");
   var y = temp.lastIndexOf("</table>") + 8;
   return content.slice(x, y);   
}

function creer(i) {

	var debutCode = "oField = document.getElementById(\"newmessage\");";
	debutCode += "contenu = oField.value.toString();";
	debutCode += "text = \"\";";
	debutCode += "if ((contenu.length == 0) || (contenu.match(\"Ne postez pas d'insultes, évitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas déjà été posée...\")))";
	debutCode += "{text = '";
	var suiteCode = "' + ' ';}";
	suiteCode += "else";
	suiteCode += "{deb = oField.selectionStart;";
	suiteCode += "objectValueDeb = contenu.substring( 0 , deb );";
	suiteCode += "objectValueFin = contenu.substring(deb , oField.textLength );";
	suiteCode += "text = objectValueDeb + ' ' + '";
	var finCode = "' + ' ' + objectValueFin;}";
	finCode += "document.getElementById(\"newmessage\").value = text;window.close();oField.focus();";
	var td = document.getElementById("displayed_easysmiley").getElementsByTagName("td");
	var img = td[i].getElementsByTagName("a")[0];
	img.href = "javascript: " + debutCode + td[i + 1].innerHTML + suiteCode + td[i + 1].innerHTML + finCode + ";";
	return td[i].innerHTML;
}

function main () {

	req = new XMLHttpRequest();
	req.open("GET", "http://www.jeuxvideo.com/smileys/legende.htm", false);
	req.send(null);
	
	var smileys = "<div id='displayed_easysmiley' style='position: absolute; left: 655px; display: none; z-index: 1; padding-top: 0px;'>" + extraire(req.responseText) + "</div>";
	var code = document.getElementById("col1");
	var icone = "<a style='cursor: pointer;' onclick='javascript: if (document.getElementById(\"displayed_easysmiley\").style.display == \"none\") document.getElementById(\"displayed_easysmiley\").style.display = \"block\"; else document.getElementById(\"displayed_easysmiley\").style.display = \"none\";'><img src='http://image.jeuxvideo.com/smileys/11.gif'></a>";
	var liste = "<table cellpadding=0 cellspacing=0 style='text-align: center; width: 300px; height: 340px; padding: 10px; padding-left: 22px; background: url(\"http://www.noelshack.com/uploads/fond047017.png\") no-repeat;'><tr><td><table style='width: 100%;'><tr>";
	var a = 0;
	
	code.innerHTML = code.innerHTML.replace(/(<label for="newmessage">\* Message : <\/label>)/g, "<table style='width: 100%;'><tr><td>$1</td><td align=right>" + icone + "</td></tr></table>");
	code.innerHTML = code.innerHTML.replace(/(<a name="form_post"><\/a>)/g, smileys + "$1");
	
	for (var i = 0; i < 107; i += 2) {
		if (i != 46 && i != 52 && i != 62 && i != 94 && i != 100 && i != 102 && i != 104) {
			a++;
			liste += "<td>" + creer(i) + "</td>";
			if (a == 12) {liste += "</tr><tr>"; a = 0;}
		}
	}
	liste += "<td>" + creer(140) + "</td></tr></table>";
	liste += "<table style='width: 100%;'><tr><td>" + creer(46) + "</td><td>" + creer(52) + "</td><td>";
	liste += creer(94) + "</td><td>" + creer(100) + "</td><td>";
	liste += creer(102) + "</td><td>" + creer(62) + "</td><td>";
	liste += creer(104) + "</td><td>" + creer(138) + "</td></tr></table>";
	liste += "<table style='width: 100%;'><tr><td>";
	liste += creer(110) + "</td><td>" + creer(116) + "</td><td>";
	liste += creer(120) + "</td><td>" + creer(136) + "</td></tr><tr><td>";
	liste += creer(130) + "</td><td>" + creer(132) + "</td><td>";
	liste += creer(108) + "</td><td>" + creer(112) + "</td></tr><tr><td>";
	liste += creer(114) + "</td><td>" + creer(118) + "</td><td>";
	liste += creer(122) + "</td><td>" + creer(124) + "</td></tr></table><table style='width: 100%;'><tr><td>";
	liste += creer(126) + "</td><td>" + creer(128) + "</td><td>";
	liste += creer(134) + "</td></tr></table></td></tr></table>";
	
	document.getElementById("displayed_easysmiley").innerHTML = liste;
}

main();