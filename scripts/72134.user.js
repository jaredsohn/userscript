// ==UserScript==
// @name           Skillkenntnisse von newman fuer pennergame hamburg berlin muenchen
// @namespace      http://www.ego-shooters.net/forum/
// @description    Listet die benötigten Kenntnisse für den Skill auf
// @include        *pennergame.de/skills/
// ==/UserScript==


var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}


for(x=0;x<=15;x++){
	try {
		document.getElementsByTagName('tbody')[x].setAttribute('id', 'tbody.'+x);
		id_max = x;
	} catch (err){
		break;
	}
}



function skill_info(skill_name, pos){
	GM_xmlhttpRequest({
		method: 'GET',
    	url: ''+link+'/skill/info/'+skill_name+'/',
		onload: function(responseDetails) {
			var side = responseDetails.responseText;
			skill_info_ausgabe(side, skill_name, pos);
		}
	 });
}



function skill_info_ausgabe(side, skill_name, pos){
	try {
		var side_split = side.split(/Kenntnisse<\/strong><\/td>[\s]*<\/tr>/)[1].split('</table>')[0];
		document.getElementById('tbody.'+(id_max-pos)).getElementsByTagName('td')[4].innerHTML+='<br /><br /><table><tr><th>Erforderliche Kenntnisse<br /></th></tr>'+side_split+'</table>';
	}
	catch(err){
		document.getElementById('tbody.'+(id_max-pos)).getElementsByTagName('td')[4].innerHTML+='<br /><br /><table><tr><th> Alles erreicht <br /></th></tr>Herzlichen glueckwunsch du hast hier alles erreicht</table>';


		
	}
}


skill_info("Sprechen",5)
skill_info("Bildungsstufe",4)
skill_info("Musik",3)
skill_info("Sozialkontakte",2)
skill_info("Konzentration",1)
skill_info("Taschendiebstahl",0)