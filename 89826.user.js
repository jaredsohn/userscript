// ==UserScript==
// @name           kalandwiki
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=kalandok
// @include        http://*.vladcaosudu.sk/index.php?m=kalandok*
// @include        http://*.doomlord.ru/index.php?m=kalandok*
// @include        http://*.doomlord.net/index.php?m=kalandok*
// ==/UserScript==

var version = "1.02";

//Thnx to Jerikó a kóddarabért!
function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}
var ver_check = GM_getValue("ver_check",0);
var most = Math.floor(new Date().getTime()/1000/3600/24);
if (most > ver_check) {
var url = 'http://userscripts.org/scripts/show/89826';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/89826');
		alert ("Van újabb kalandwiki verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(most));
}

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
		case 'Útok':
		case 'Sila':
		case 'Mágia':
		case 'Obrana':
		case 'Taumaturgia':
		case 'Zdravie':
		case 'Šťastie':
		case 'Strength':
		case 'Attack':
		case 'Magic':
		case 'Defense':
		case 'Luck':
		case 'Thaumaturgy':
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
		case 'šplhanie':
		case 'vypáčenie zámkov':
		case 'odhalenie pascí':
		case 'Hľadanie máp':
		case 'climbing':
		case 'pick locks':
		case 'detect traps':
		case 'map finding':
			color = 'orange';
		break;
		case 'LE':
		case 'LÉ':
		case 'DE':
		case 'SE':
			color = 'red';
		break;
		case 'csata':
		case 'ÉP':
		case 'boj':
		case 'HP':
		case 'fight':
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

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

	vladcaosudu = strpos('vladcaosudu.sk',window.location.href);
	soviet = strpos('doomlord.ru',window.location.href);
	doomlord = strpos('doomlord.net',window.location.href);

if (soviet) {
	GM_xmlhttpRequest({method:'GET',url:'http://heparni.wikidot.com/oroszkaland',onload:wikiload});
} else if (vladcaosudu) {
	GM_xmlhttpRequest({method:'GET',url:'http://heparni.wikidot.com/dobrodruzstva-zoznam',onload:wikiload});
} else if (doomlord) {
	GM_xmlhttpRequest({method:'GET',url:'http://doomlord.wikidot.com/adventures',onload:wikiload});
} else {
	GM_xmlhttpRequest({method:'GET',url:'http://vegzetur.wikidot.com/kalandlista',onload:wikiload});
}
