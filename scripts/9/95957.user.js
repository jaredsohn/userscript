// ==UserScript==
// @name	Max. Sponsor
// @namespace	HandballMaster
// @include	http://www.handballmaster.de/index.php*
// @exclude	http://www.handballmaster.de/index.php?sec=finanzen&wahl=sponsor*
// ==/UserScript==

var url = 'http://www.handballmaster.de/index.php?sec=finanzen&wahl=sponsor';

GM_xmlhttpRequest({
	method: 'POST',
	url: url,
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	onload: function(rd){
		text = rd.responseText;
		if (text != '') {
			var l = 10;
			hsp = text.split("Hauptsponsor:")[1].split('<table>')[1].split('</table>')[0];
			nsp = text.split("Nebensponsor:")[1].split('<table>')[1].split('</table>')[0];
			hl = (hsp.split('center;">').length - 3) / 2;
			nl = (nsp.split('center;">').length - 3) / 2;

			// Höchsten Hauptsponsorvertrag ermitteln
			var hmax = i = x = 0;
			while (x < hl) {
				htext = hsp.split('<td')[i+3].split('">')[1].split('</td>')[0];
				hp = parseInt(htext.replace(/\s/g,''));
				if (hp > hmax) hmax = hp;
				x++;
				i = i + 3;
			}

			// Höchsten Nebensponsorvertrag ermitteln
			var nmax = i = x = 0;
			while (x < nl) {
				ntext = nsp.split('<td')[i+3].split('">')[1].split('</td>')[0];
				np = parseInt(ntext.replace(/\s/g,''));
				if (np > nmax) nmax = np;
				x++;
				i = i + 3;
			}

			// Sponsorenverträge auslesen und maximalen filtern
			var pmax = i = x = 0;
			while (x < l) {
				x++;
				ptext = text.split('<td')[i+3].split('">')[1].split('</td>')[0];
				p = parseInt(ptext.replace(/\s/g,''));
				if (p > pmax) {
					pmax = p;
					pmaxtext = ptext;
					stext = text.split('<td')[i+1].split('">')[1].split('</td>')[0];
					ltext = text.split('<td')[i+2].split('">')[1].split('</td>')[0];
				}
				i = i + 4;
			}

			hdif = pmax - hmax;
			ndif = parseInt(pmax / 2) - nmax;
			
			sid = parseInt(stext.replace(/Sponsor/g,''));
			if (hdif < 0) hdiftext = '<span style="color:red;">'+hdif+' &euro;</span>';
			else hdiftext = '<span style="color:green;"><b>'+hdif+' &euro;</b></span>';
			if (ndif < 0) ndiftext = '<span style="color:red;">'+ndif+' &euro;</span>';
			else ndiftext = '<span style="color:green;"><b>'+ndif+' &euro;</b></span>';
			document.getElementsByClassName("spielerinfo")[0].innerHTML += '<br />Als <a href="http://www.handballmaster.de/index.php?sec=finanzen&wahl=sponsor&dsponsorannehmen=true&typ=h&dsponsor_id='+sid+'">Haupt-</a> oder <a href="http://www.handballmaster.de/index.php?sec=finanzen&wahl=sponsor&dsponsorannehmen=true&typ=n&dsponsor_id='+sid+'">Nebensp.</a> für '+ltext+'<br />'+pmax+'&euro; ('+hdiftext+') | '+parseInt(pmax / 2)+'&euro; ('+ndiftext+')';
		}
	}
});
