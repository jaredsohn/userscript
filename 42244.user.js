// ==UserScript==
// @name DS Einlagerungen verfeinern
// @description Ersetzt den Link "Maximalmenge wählen" durch ein Menü zur genaueren Auswahl der Einlagerungen
// @author Michael Richter
// @namespace http://osor.de/
// @include http://nl*.tribalwars.nl/game.php?*screen=snob&mode=reserve*
// @include http://*
// @include http://nl*.tribalwars.nl/game.php?*screen=snob&mode=coin*
// ==/UserScript==


if(/screen=snob&mode=(reserve|coin)(|&group=\d+)/.test(location.href)) {

	function selectReserve() {
		var chooser2 = document.getElementById('chooser' + (this.id == 'chooser1' ? '2' : '1'));
		chooser2.removeEventListener('change', selectReserve, false);
		chooser2.selectedIndex = this.selectedIndex;
		chooser2.addEventListener('change', selectReserve, false);
		var value = this.value;
		var selects = document.getElementsByName('villages')[0].getElementsByTagName('select');
		var sum = 0;
		for(var i = 0; i < selects.length; i++) {
			if(selects[i].id == 'chooser1' || selects[i].id == 'chooser2') {
				continue;
			}
			if(value == 'none') {
				selects[i].options[selects[i].options.length - 1].selected = true;
			} else if(value == 'all') {
				selects[i].options[selects[i].options.length - 2].selected = true;
			} else if(value.substr(value.length - 1, 1) == 'x') {
			  if(13 - (selects[i].options.length - 1) < parseInt(value, 10)) {
			    selects[i].options[parseInt(value, 10) - (13 - (selects[i].options.length - 1)) - 1].selected = true;
				} else {
				  selects[i].options[selects[i].options.length - 1].selected = true;
				}
			} else if(value > 0) {
				if(selects[i].options.length - 1 < value) {
					selects[i].options[selects[i].options.length - 2].selected = true;
				} else {
					selects[i].options[value - 1].selected = true;
				}
			} else if(value < 0) {
				if(selects[i].options.length - 2 < -value) {
					selects[i].options[selects[i].options.length - 1].selected = true;
				} else {
					selects[i].options[selects[i].options.length - 2 + parseInt(value, 10)].selected = true;
				}
			}
			sum += parseInt(selects[i].value, 10);
		}
		document.getElementById('selectedBunches_top').innerHTML = sum;
		document.getElementById('selectedBunches_bottom').innerHTML = sum;
	}
	
	var chooser = document.evaluate('//table[@class="main"]/tbody/tr/td/table[2]/tbody/tr/td[2]/form/table/tbody/tr/td[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var chooser2 = document.evaluate('//table[@class="main"]/tbody/tr/td/table[2]/tbody/tr/td[2]/form/table/tbody/tr[last()]/td[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(chooser && chooser.snapshotLength > 0) {
		chooser = chooser.snapshotItem(0);
		chooser2 = chooser2.snapshotItem(0);
		chooser.removeChild(chooser.firstChild);
		chooser2.removeChild(chooser2.firstChild);
		var div = document.createElement('div');
		div.innerHTML = '<select id="chooser1">' +
										'<option value="none">- Niets-</option>' +
										'<option value="all">- Alles -</option>' +
										'<optgroup label="In elk dorp">' +
										'<option value="1">1x</option>' +
										'<option value="2">2x</option>' +
										'<option value="3">3x</option>' +
										'<option value="4">4x</option>' +
										'<option value="5">5x</option>' +
										'<option value="6">6x</option>' +
										'<option value="7">7x</option>' +
										'<option value="8">8x</option>' +
										'<option value="9">9x</option>' +
										'<option value="10">10x</option>' +
										'<option value="11">11x</option>' +
										'<option value="12">12x</option>' +
										'<option value="13">13x</option>' +
										'</optgroup><optgroup label="Maximum">' +
										'<option value="1x">1x</option>' +
										'<option value="2x">2x</option>' +
										'<option value="3x">3x</option>' +
										'<option value="4x">4x</option>' +
										'<option value="5x">5x</option>' +
										'<option value="6x">6x</option>' +
										'<option value="7x">7x</option>' +
										'<option value="8x">8x</option>' +
										'<option value="9x">9x</option>' +
										'<option value="10x">10x</option>' +
										'<option value="11x">11x</option>' +
										'<option value="12x">12x</option>' +
										'<option value="13x">13x</option>' +
										'</optgroup><optgroup label="Relatief maximum">' +
										'<option value="-12">Max -12</option>' +
										'<option value="-11">Max -11</option>' +
										'<option value="-10">Max -10</option>' +
										'<option value="-9">Max -9</option>' +
										'<option value="-8">Max -8</option>' +
										'<option value="-7">Max -7</option>' +
										'<option value="-6">Max -6</option>' +
										'<option value="-5">Max -5</option>' +
										'<option value="-4">Max -4</option>' +
										'<option value="-3">Max -3</option>' +
										'<option value="-2">Max -2</option>' +
										'<option value="-1">Max -1</option>' +
										'</optgroup>' +
										'</select>';
		chooser.appendChild(div);
		var div2 = div.cloneNode(true);
		div2.firstChild.id = 'chooser2';
		chooser2.appendChild(div2);
		chooser.firstChild.firstChild.addEventListener('change', selectReserve, false);
		chooser2.firstChild.firstChild.addEventListener('change', selectReserve, false);
	}
}
