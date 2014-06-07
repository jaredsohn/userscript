// ==UserScript==
// @name           Exile souverains
// @namespace      http://sheflaprod.free.fr
// @description    Enrichis la carte spatiale avec des raccourcis pour la vision de souveraineté des regions.
// @include        http://genesis.exile.fr/game/map.asp*
// ==/UserScript==

var d = document,
	score = GM_getValue('exile_souverainete', false),
    galaxie = d.getElementById('mapuniverseview'),
    region = d.getElementById('mapgalaxy');

if (!score){ GM_setValue('exile_souverainete', '{}'); }
score = (score) ? JSON.parse(score) : {};

if (galaxie){
	d.getElementById('sovereignty').className = 'default';
	var oldSetLocGalaxy = unsafeWindow.setLocGalaxy;
	unsafeWindow.setLocGalaxy = function(region){
		if (score[region]){
			for (var id in score[region]){
				if (score[region].hasOwnProperty(id)){
					d.getElementById(id).textContent = score[region][id];
				}
			}
		} else {
			d.getElementById('sov_tag_1').textContent= '???';
			d.getElementById('sov_tag_2').textContent
			= d.getElementById('sov_tag_3').textContent
			= d.getElementById('sov_perc_1').textContent
			= d.getElementById('sov_perc_2').textContent
			= d.getElementById('sov_perc_3').textContent
			= '';
		}
		oldSetLocGalaxy(region);
	};
}

else if (region){
	var current = d.getElementById('locgalaxy').value;
	score[current] = {};
	for (var i = 1; i < 4; i++){
		var tag  = d.getElementById('sov_tag_'  + i),
		    perc = d.getElementById('sov_perc_' + i);
		if (tag.textContent){
			var lien = d.createElement('a');
			lien.href = 'http://genesis.exile.fr/game/alliance.asp?tag=' + tag.textContent;
			lien.textContent = tag.textContent;
			tag.textContent = '';
			tag.appendChild(lien);
			score[current]['sov_tag_'  + i] = tag.textContent;
			score[current]['sov_perc_' + i] = perc.textContent;
		}
		else {
			score[current]['sov_tag_'  + i]
			= score[current]['sov_perc_' + i]
			= '';
		}
	}
	GM_setValue('exile_souverainete', JSON.stringify(score));
}

