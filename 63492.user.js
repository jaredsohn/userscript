// ==UserScript==
// @name          Tribal$ouL Snob
// @description   Mejoras en el almacenamiento de paquetes en las cortes.
// @author 	  Michael Richter, edited by Soul Assassin
// @namespace 	  http://userscripts.org/users/53237
// @include 	  http://es*.guerrastribales.es/game.php?*screen=snob&mode=coin
// @Version	  V.1.0. beta
// @copyright     Copyright (c) 2009, Soul Assassin
// ==/UserScript==


var url = 'http://guerrastribales.es/graphic/';

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
										'<option value="none"; style= "background-color: #F6F2E7; font-size:9pt">- Elegir nada -</option>' +
										'<option value="all"; style= "background-color: #F6F2E7; font-size:9pt">- Elegir cantidad máxima -</option>' +
										'<optgroup label="Cantidad Total"; style= "background-color: #E1D5BB; font-size:9pt">' +
										'<option value="1"; style= "background-color:#F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;1x&nbsp;(28000,&nbsp;30000,&nbsp;25000)</option>' +
										'<option value="2"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;2x&nbsp;(56000,&nbsp;60000,&nbsp;50000)</option>' +
										'<option value="3"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;3x&nbsp;(84000,&nbsp;90000,&nbsp;75000)</option>' +
										'<option value="4"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;4x&nbsp;(112000,&nbsp;120000,&nbsp;100000)</option>' +
										'<option value="5"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;5x&nbsp;(140000,&nbsp;150000,&nbsp;125000)</option>' +
										'<option value="6"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;6x&nbsp;(168000,&nbsp;180000,&nbsp;150000)</option>' +
										'<option value="7"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;7x&nbsp;(196000,&nbsp;210000,&nbsp;175000)</option>' +
										'<option value="8"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;8x&nbsp;(224000,&nbsp;240000,&nbsp;200000)</option>' +
										'<option value="9"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;9x&nbsp;(252000,&nbsp;270000,&nbsp;225000)</option>' +
										'<option value="10"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;10x&nbsp;(280000,&nbsp;300000,&nbsp;250000)</option>' +
										'<option value="11"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;11x&nbsp;(308000,&nbsp;330000,&nbsp;275000)</option>' +
										'<option value="12"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;12x&nbsp;(336000,&nbsp;360000,&nbsp;300000)</option>' +
										'<option value="13"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;13x&nbsp;(364000,&nbsp;390000,&nbsp;325000)</option>' +
										'</optgroup><optgroup label="Relación a la capacidad"; style= "background-color: #E1D5BB; font-size:9pt">' +
										'<option value="-12"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -12x</option>' +
										'<option value="-11"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -11x</option>' +
										'<option value="-10"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -10x</option>' +
										'<option value="-9"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -9x</option>' +
										'<option value="-8"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -8x</option>' +
										'<option value="-7"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -7x</option>' +
										'<option value="-6"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -6x</option>' +
										'<option value="-5"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -5x</option>' +
										'<option value="-4"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -4x</option>' +
										'<option value="-3"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -3x</option>' +
										'<option value="-2"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -2x</option>' +
										'<option value="-1"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png); background-repeat:no-repeat; background-position:1%">&nbsp;Cantidad máxima -1x</option>' +
										'</optgroup><optgroup label="Restante a lo almacenado"; style= "background-color: #E1D5BB; font-size:9pt">' +
										'<option value="1x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;1x</option>' +
										'<option value="2x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;2x</option>' +
										'<option value="3x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;3x</option>' +
										'<option value="4x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;4x</option>' +
										'<option value="5x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;5x</option>' +
										'<option value="6x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;6x</option>' +
										'<option value="7x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;7x</option>' +
										'<option value="8x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;8x</option>' +
										'<option value="9x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;9x</option>' +
										'<option value="10x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;10x</option>' +
										'<option value="11x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;11x</option>' +
										'<option value="12x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;12x</option>' +
										'<option value="13x"; style= "background-color: #F6F2E7; background-image:url('+ url +'gold.png);background-repeat:no-repeat;background-position:left">&nbsp;13x</option>' +
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