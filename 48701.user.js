// ==UserScript==
// @name           KadoStats
// @description    Improves statistics on Kadokado.com
// @include        http://www.kadokado.com/vip
// ==/UserScript==

const GAME_URL_PREFIX = 'http://www.kadokado.com/game/';
const GAME_URL_SUFFIX = '/play';
const SCORE_TD = /<td class="left">(<img alt="step\.alt" src="http:\/\/dat\.kadokado\.com\/gfx\/gui\/base\/small_level_[0-9]\.gif"\/> <span class="num2img">(<img alt="[0-9\.]" src="http:\/\/dat\.kadokado\.com\/gfx\/typo\/sred\/(dot|[0-9])\.gif"\/>)+<\/span>)<\/td>/;
function get(url, cb, param) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			// Inject responseXML into existing Object if not present
//			if (!response.responseXML)
//				response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			cb(response, param);
		}
	})
}
function parseScore(dom) {
	var str = dom.getElementsByTagName('SPAN')[0].innerHTML;
	return parseInt(str.replace(/[0-9]\.gif/g, '').replace(/[^0-9]/g, ''));
}
function appendImage(dom, url, alt) {
	var img = document.createElement('img');
	img.src = url;
	img.alt = alt;
	dom.appendChild(img);
}

activesBoxes = document.getElementById('activesBoxes');
gameTable = activesBoxes.parentNode.getElementsByTagName('TABLE')[0];
//gameTable.parentNode.insertBefore(dummyDiv.firstChild, gameTable);
for (i = 0; i < gameTable.rows.length; i++) {
	var row = gameTable.rows[i];
	if (i == 0) {
		var th = document.createElement('th');
		th.innerHTML = 'Palier';
		th.className = 'tiny';
		row.insertBefore(th, row.cells[2]);
	} else {
		var cell = row.insertCell(2);
		cell.className = 'tiny';
		var href = row.cells[0].getElementsByTagName('A')[0].href;
		var idx = href.lastIndexOf('/');
		var url = GAME_URL_PREFIX + href.substring(idx + 1) + GAME_URL_SUFFIX;
		get(url, (function(xhr, tmpRow) {
			var tmpCell = tmpRow.cells[2];
			var match = SCORE_TD.exec(xhr.responseText);
			if (match) {
				tmpCell.innerHTML = match[1];
				var current = parseScore(tmpRow.cells[1]);
				var qualif = parseScore(tmpCell);
				var best = parseScore(tmpRow.cells[3]);
				if (current >= qualif) {
					appendImage(tmpRow.cells[0], 'http://dat.kadokado.com/gfx/icons/ok.gif', 'Vous êtes qualifié :-)');
				} else if (current == qualif -1) {
					appendImage(tmpRow.cells[0], 'http://www.kadokado.com/gfx/smileys/icon_exclaim.gif', 'Qualification incertaine…');
				}
				if (qualif <= best) {
					appendImage(tmpCell, 'http://www.kadokado.com/gfx/smileys/sRankUp.gif', 'Qualification possible');
				}
			} else {
				appendImage(tmpCell, 'http://www.kadokado.com/gfx/smileys/small_level_0.gif', 'Vous êtes au niveau Paradis !');
			}
		}), row);
	}
}
