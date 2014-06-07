// ==UserScript==
// @name           kalandwiki
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=kalandok
// ==/UserScript==

function colorize(challenge){
	var color;
	switch (challenge){
		case 'tám.':
		case 'támadás':
		case 'erő':
		case 'mágia':
		case 'véd':
		case 'védekezés':
		case 'taumaturgia':
		case 'IQ':
		case 'egs.':
		case 'tau':
		case 'szer.':
		case 'szerencse':
		case 'egészség':
			color = 'lightblue';
		break;
		default:
			color = 'white';
		break;
		case 'mászás':
		case 'MÁSZÁS':
		case 'ZÁRNYIT.':
		case 'zárnyitás':
		case 'CSAPDAÉ.':
		case 'csapdaészlelés':
		case 'TÉRKÉPK.':
		case 'térképkeresés':
			color = 'orange';
		break;
		case 'LE':
		case 'LÉ':
			color = 'red';
		break;
		case 'csata':
		case 'ÉP':
			color = 'lightgreen';
		break;
	}
	return '<span style="color: '+color+'">'+challenge+'</span>';
}

function wikiload(data){
	var osszeskaland = [];
	resp = data.responseText.substring(data.responseText.indexOf('<table class="wiki-content-table">'), data.responseText.indexOf('</table>')+8);
	xml = new DOMParser().parseFromString(resp, "text/xml");
	table = xml.getElementsByTagName('table')[0];
	trs = table.getElementsByTagName('tr');
	for (i=0; i<trs.length; i++){
		tds = trs[i].getElementsByTagName('td');
		if (tds.length>0){
			osszeskaland[parseInt(tds[0].textContent)] = [];
			for (j=2; j<tds.length; j++){
				osszeskaland[parseInt(tds[0].textContent)].push(tds[j].textContent);
			}
		}
	}
	
	sajatkalandok = document.getElementsByTagName('a');
	for (i=0; i<sajatkalandok.length; i++){
		if (sajatkalandok[i].href.indexOf('eldobas&kaland=')==-1) continue;
		kaland_id = sajatkalandok[i].href.substring(sajatkalandok[i].href.indexOf('eldobas&kaland=')+15);
		if (!osszeskaland[kaland_id]) continue;
		div = document.createElement('div');
		div.setAttribute('style','');
		for (j=0; j<osszeskaland[kaland_id].length; j++){
			if (osszeskaland[kaland_id][j]!='VÉGE') {
				div.innerHTML += colorize(osszeskaland[kaland_id][j]);
			}
			if (j<osszeskaland[kaland_id].length-1 && osszeskaland[kaland_id][j]!=''&& osszeskaland[kaland_id][j]!='VÉGE') {
				div.innerHTML += ' | ';
			}
		}
		sajatkalandok[i].parentNode.parentNode.childNodes[1].appendChild(div);
	}
	
}

GM_xmlhttpRequest({method:'GET',url:'http://vegzetur.wikidot.com/kalandlista',onload:wikiload});