// ==UserScript==
// @name           DS - User Chart von Shiva's Stämme-Seite
// @namespace      none
// @include http://de*.die-staemme.de/game.php?*village=*&screen=info_player&id=*
// @include http://de*.die-staemme.de/game.php?*village=*&screen=info_village&id=*
// ==/UserScript==

(
	function() {
		var f=document;
		var i,l,m,s,td,tr,imgd,imgw,imgm,imgy,a;
		var srv=0;
		try {
			srv=f.location.href.match(/de(\d+)\D*\.die-staemme\./)[1];
		} catch (e) {
			return;
		}
		for (i=0;i<f.links.length;i++) {
			l=f.links[i];
			if ((l.href.search(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/) > -1) ||
				(l.href.search(/village=[0-9]+&screen=info_player&id=([0-9]+)/) > -1)) {
				
				if (l.href.search(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/) > -1) {
					m=l.href.match(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/)[1];
				} else {
					m=l.href.match(/village=[0-9]+&screen=info_player&id=([0-9]+)/)[1];
				}
				s=l.parentNode.parentNode;

				tr=f.createElement('tr');
				td=f.createElement('td');
				td.colSpan=2;
				a=f.createElement('a');
				a.target='Shivas Staemme-Seite';
				
				a.href='http://looking.at/staemme/perf.php?server=3';
				

				imgd=f.createElement('img');
				imgd.src='http://looking.at/staemme/charts/server'+srv+'/images/'+m+'-day.png';
				a.appendChild(imgd);

				
				imgw=f.createElement('img');
				imgw.src='http://looking.at/staemme/charts/server'+srv+'/images/'+m+'-week.png';
				a.appendChild(imgw);

				
				imgm=f.createElement('img');
				imgm.src='http://looking.at/staemme/charts/server'+srv+'/images/'+m+'-month.png';
				a.appendChild(imgm);

				
				imgy=f.createElement('img');
				imgy.src='http://looking.at/staemme/charts/server'+srv+'/images/'+m+'-year.png';
				a.appendChild(imgy);


				td.appendChild(a);
				tr.appendChild(td);
				s.parentNode.insertBefore(tr,s);

				

				break;
			}
		}
		
	}
)()