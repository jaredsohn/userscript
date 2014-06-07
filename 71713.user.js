// ==UserScript==
// @name           Google Currency Converter
// @namespace      igcc
// @include        *
// @description    Convierte el texto seleccionado a la moneda que se quiera, seleccionando el origen y el destino. Utiliza la api de google para efectuar la conversion.
// @creator        manuelcanepa[at]gmail.com
// ==/UserScript==
(function (){
	var log = function() {
		if (unsafeWindow.console) unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
	};

	var tabla='';
	var pos = [0,0];

	var setPos = function (d){
		d.style.top = pos[0] - 25 + 'px';
		d.style.left = pos[1] - 170 + 'px';
	}

	var showMe = function (d) {
		if(d.length < 1) {
			return;
		}
		setPos(d);
		d.style.display = "block";
	}

	var hideMe = function (d) {
		if(d.length < 1) {
			return;
		}
		d.style.display = "none";
	};

	var monedas = {
		'USD':'Dolares Estadounidenses',
		'EUR':'Euros',
		'ARS':'Peso Argentino',
		'JPY':'Yen Japones',
		'AUD':'Dolares Australianos',
		'BGN':'Lev Bulgaro',
		'BOB':'Boliviano',
		'BRL':'Real Brasileño',
		'CAD':'Dolares Canadienses',
		'CHF':'Francos Suizos',
		'CLP':'Peso Chileno',
		'AED':'Dirham de los Emiratos Arabes',
		'CNY':'Yuan Renminbi',
		'COP':'Peso Colombiano',
		'CZK':'Corona Checa',
		'DKK':'Corona Danesa',
		'EEK':'Corona Estonia',
		'EGP':'Libra Egipcia',
		'GBP':'Libra Esterlina Britanica',
		'HKD':'Dolares de Hong Kong',
		'HRK':'Kuna Croata',
		'HUF':'Florin Hungaro',
		'IDR':'Rupia Indonesia',
		'ILS':'Sheqel Israeli',
		'INR':'Rupia India',
		'KRW':'Won Surcoreano',
		'LTL':'Litas Lituanas',
		'MAD':'Dirham Marroqui',
		'MXN':'Peso Mexicano',
		'MYR':'Ringgit Malasio',
		'NOK':'Corona Noruega',
		'NZD':'Dolares Neozelandeses',
		'PEN':'Nuevo Sol Peruano',
		'PHP':'Peso Filipino',
		'PKR':'Rupia Paquistani',
		'PLN':'Nuevo Zloty Polaco',
		'RON':'Nuevo Leu Rumano',
		'RSD':'Dinar Serbio',
		'RUB':'Rublo Ruso',
		'SAR':'Rial Saudi',
		'SEK':'Corona Sueca',
		'SGD':'Dolares Singapurenses',
		'SKK':'Corona Eslovaca',
		'THB':'Baht Tailandes',
		'TRY':'Nueva Lira Turca',
		'TWD':'Nuevo Dolar de Taiwan',
		'UAH':'Jrivnia Ucraniana',
		'VEF':'Bolivar fuerte Venezolano',
		'VND':'Dong Vietnamita',
		'ZAR':'Rand Sudafricano'
	}
	var urlConvert = function (){
		var precio = $('precio-igcc').value;
		var monedaFrom = $('monedaFrom').value;
		var monedaTo = $('monedaTo').value;
		GM_setValue('from',monedaFrom);
		GM_setValue('to',monedaTo);
		return 'http://www.google.com/ig/calculator?hl=es&q=' + precio + monedaFrom +'%3D%3F' + monedaTo;
	};

	var $ = function(id) {
		return document.getElementById(id);
	};

	var showMenu = function (){
		showMe($('tabla-igcc'));
		convertir();
	};
	var setTabla = function (){
		var filas = []
		for(var moneda in monedas){
			filas.push('<option value="' + moneda + '">' + monedas[moneda] + '</option>');
		}

		tabla += '<input type="hidden" id="precio-igcc" value="0">';
		tabla += '<table border table:10pt style="line-height:normal;color:yellow;font-weight:bold;text-align:center;">';
		tabla += '	<tr>';
		tabla += '		<td colspan="3"><p id="res-igcc"></p><br/></td>';
		tabla += '	</tr>';
		tabla += '	<tr>';
		tabla += '		<td style="border:0px;padding:0px;color:red;"><b><label for="monedaFrom">Convertir De..</label></b></td>';
		tabla += '		<td style="border:0px;padding:0px;color:#fff;"><select id="monedaFrom">' + filas.join('') + '</select></td>';
		tabla += '		<td style="border:0px;padding:0px;color:#fff;" rowspan="2">';
		tabla += '			<img id="swc-curr-igcc" alt="switch" src="data:image/gif;base64,R0lGODlhEgASAKUfACkyVuLk5ZOi5WiEx0li1AAAzD1Y0fr8+LzC4YCYz8bL4u7t8LS71Gd81n+Q2s/W8/H1+LXA7ubn8Orv+VNr1neK3d7h8cDK8YmY3NbZ3vj4+NPX5lVy1uvv+c7T3v///56s6G2C3ZGf27zE6vL1/Obq+drg9kJazuDj8YSU33qM3////////////////////////////////////////////////////////////////////////////////////yH5BAEHAD8ALAAAAAASABIAAAZswN9vQCwajcLhZ8lsNgdKp/Q5aD5AIYNpSmymDGBBSdr1GgjgFIkqTV1KKgNlvCxPPxFDiGm/Cwx8VXdLf4GDB3l7dYJeIxYVchaGTQ5nYA4SbEyVYBgbZIwfCCINBgpcoYN8Uap1SUewRUJBADs=" />';
		tabla += '		</td>';
		tabla += '	</tr>';

		tabla += '	<tr>';
		tabla += '		<td style="border:0px;padding:0px;color:red;"><b><label for="monedaTo">Convertir  A..</label></b></td>';
		tabla += '		<td style="border:0px;padding:0px;color:#fff;"><select id="monedaTo">' + filas.join('') + '</select></td>';
		tabla += '	</tr><br/>';

		tabla += '	<tr>';
		tabla += '		<td style="border:0px;padding:0px;color:#fff;" colspan="3"><center><button id="ver-res-igcc">Cambio</button></center></td>';
		tabla += '	</tr>';

		tabla += '</table>';
		var divTabla = document.createElement('div');
		divTabla.id = "tabla-igcc";
		divTabla.style.position = "absolute";
		divTabla.style.display = "none";
		divTabla.style.background = "#333";
		divTabla.style.border = "5px";
		divTabla.style.padding = "10px";
		divTabla.innerHTML = tabla;

		try {
			document.body.appendChild(divTabla);
		} catch(e){
		}
	};
	var convertir = function (){
		var url = urlConvert();
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(r) {
				var json = r.responseText;
				json = eval('(' + json + ')');
				$('res-igcc').innerHTML = /* url + '<br />' + */ json['lhs'] + ' = ' + json['rhs'];
				$('monedaFrom').value = GM_getValue('from');
				$('monedaTo').value = GM_getValue('to');
			}
		});
	}

	function init(){
		try {
			if(window != window.top){
				return;
			}

			setTabla();
			$('monedaFrom').value = GM_getValue('from');
			$('monedaTo').value = GM_getValue('to');

			$('ver-res-igcc').addEventListener('mousedown',function (e){
				if (e.stopPropagation){
					e.stopPropagation();
				}
				e.cancelBubble = true;
				convertir();
			},true);
			$('swc-curr-igcc').addEventListener('mousedown',function (e){
				var monedaFrom = $('monedaFrom').value;
				var monedaTo = $('monedaTo').value;
				GM_setValue('from',monedaTo);
				GM_setValue('to',monedaFrom);
				$('monedaFrom').value = GM_getValue('from');
				$('monedaTo').value = GM_getValue('to');
				convertir();
			},true);
			window.addEventListener("mousemove",
				function(e){
					e = e || window.event;
					pos = [e.pageY,e.pageX]
				},false);
			window.addEventListener("mousedown",
				function(e){
					e = e || window.event;
					var reltg = e.target
					while (reltg.id != 'tabla-igcc' && reltg.nodeName != 'HTML' && reltg.nodeName != 'BODY'){
						reltg= reltg.parentNode
					}
					if(reltg.id !== 'tabla-igcc'){
						hideMe($('tabla-igcc'));
					}
				},true);
			window.addEventListener("click",function (e){
				e = e || window.event;
				if(e.detail == 3){
					var precio = parseFloat(window.getSelection().toString().replace(/[^0-9\.\,]+/,'').replace(/[\,]+/,'.'));
					if(!isNaN(precio)){
						$('precio-igcc').value = precio
						showMenu()
					}
				}
			},false);
			window.addEventListener("contextmenu",function(e) {
				e = e || window.event;
				if(e.shiftKey) {
					var precio = parseFloat(window.getSelection().toString().replace(/[^0-9\.\,]+/,'').replace(/[\,]+/,'.'));
					if(!isNaN(precio)){
						$('precio-igcc').value = precio
						showMenu()
					}
					e.preventDefault();
					e.returnValue = false;
					e.stopPropagation();
					return false;
				}
			},false);
		} catch(e){
		}
	}
	init();
})()