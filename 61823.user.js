// ==UserScript==
// @name           Skillkenntnisse V1.1
// @namespace      http://www.ego-shooters.net/forum/
// @description    Listet die benötigten Kenntnisse für den Skill auf
// @include        *pennergame.de/skills/
// @exclude        *berlin.pennergame.de*
// ==/UserScript==

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
    	url: 'http://www.pennergame.de/skill/info/'+skill_name+'/',
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
		//alert(err);
	}
}

skill_info("Sprechen",6)
skill_info("Bildungsstufe",5)
skill_info("Musik",3)
skill_info("Sozialkontakte",2)
skill_info("Konzentration",1)
skill_info("Taschendiebstahl",0)