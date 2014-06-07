// ==UserScript==
// @name           ePeru Ordenes beta
// @namespace      www.erepublik.com
// @description    Ordenes para ePeru (eRepublik)
// @version        0.2
// @include        http://www*.erepublik.com/en
// @include        http://www*.erepublik.com/es
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var imagenes=new Object();
imagenes["block"]="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAABGdBTUEAALGPC/xhBQAAAxVJREFU\
OE91U0tPE1EYLWvdaIyJce1P8BewcCMPFQSK9t0BCxSoEoyvGEn8C4BRoMhDZAYoFJhapLS10DL0\
MXOnUGpLSw2hRFESm2iUUM+0UGDhLKade79zz/nOd25RNpuVnXqyttjXQOJb8vf+3t7fC2ezl86d\
v3r5zLUrF2WyotOFgB493dxGcZentMdX+XalesBfOxyoGQpU9nOlb3xYx+6J2qys8EEx/PXXXvmg\
/867oHKUV4zyKppX0tJb8T6EU7BL0aFC/SGSovnyXt/dEQmjYgTdJKlh+FtMUD7Bq62CZozk8TfN\
nP4ILCG7uQTOA0wxGkKRzirKp4SF+A628JZbBcpKgFczgmIkWNKz/ConW0KiB4gEG2BaltTZxVo2\
XFClnIsY5teo6bAaeEZAL8WdHglpiaTLenz4Vo8JYDOw4n1n1LAQE3cz2A7vZpqc8VZXrHF+tZ4l\
GgsBQXnfsmVtW9ZhIxVmDk6oGUJ9EO451k2u2BPvZr1n69nKjs699dSXerS0aXLHKHtEB9ox4fag\
/4WNyDR0UD4cUNJC3YyoZ8Mmdxx1zUvb8R+/wJn6+aedS2Ol7dNG4/ya3ko04wSOqOmgrKp/BY6r\
aEFrJfVsuNUtEbZ4twt9Gpe/P+e+tC8mGx0RigUngclAHXJiEuoJYrBHTAvrj72pB4ubBWQbl4bg\
h4tJo3NdOyVx1g7nOKEYicnPUMeKza4Yjm9wHselxZN84k0ZnZ8bP65CF5DVQwGpT7gEbzEoaSRT\
xOiIwMmTyCZXwuTeMDmjqhkCL+DIjX4OE8nNs9MjtZqnnREa5kSlPVJQq7JHWp1R/axYl2sS9hzO\
ExXIBDKEviXwtFhnC8utoVRmX/I2s69iRRwnecMQhKy0j0PmDjOEH0QZmYRmpATj1lpIzXioYjxQ\
MxnUz0rHoRfcgYoB/6nc5oVhqSQXJqQE4wa/ZlKEPFiCnEBkWe9yAXbMmQd3+xLoARXVQ375cFAx\
EsJBVUOBcjOH9a7/3c8jSw7YaLrDETeMcZXmFcrCv7SF2SjuzcHJa43//wDytfxl/au6iwAAAABJ\
RU5ErkJggg==\
";
imagenes["none"]="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAABGdBTUEAALGPC/xhBQAAAttJREFU\
OE9tU1lPE1EYHYzRaOKDia/GxH9g/Ccm8mYMVbvRFioJRRJwo1hZjL4ZtC9SGNYIFVoLCEgXIDEa\
oiOdLtPpMjOFIItoBFsGz8yFYTTe3EzuzHznfuc75/sq9vf3Kd0qydvZH/PcxscdWfi58/vU8WOn\
T1y4ePby+TOXTlac00dSQGorKrZ7mUpf3NDDGPoS1v5kNZ50woQvXuZqrNClDz5C0stKxIAaPZyy\
D6Vs2KOcYzhlU25JWH3xKtylgQ+Q/Smbj1F+0AnLKFczlqkNZW+/ydTgifM478QV+EWzt3qXjQSs\
IKNSx6sv1wBDEgS9zToDfM1UvmEq78IT5yDvGEmbg7yTZi3gFRU7FOSu/O3F0hXAwGo84wzytYie\
FZojojsitmCHxQfTwv3U1sRg8jrAYA4tSvJ36vOqv4e9gXeQRLbJnGum0LRQ7JwvtmFHpdaw5CH0\
0tvTr9NGJEBaZj1AhfJ3aNYMSVDPWMY6KzSFxYeHMHe0+ESvZzBrG0nbER/KNVCDcZMiDGsZy1gW\
V5/tlFffFVwxyROV3HNSqx42mW8M8A4IAYJDqWoKZgA5kDR9KD4ncb/KQlhqW1hRZCBLluVI8fF0\
oREqQAtiEslpHUiaF1eeaqFru4x63iMwlBqTHkE2DTmMnEGuri9hQd1gu7DSqaenwaATNJvM1UPb\
gOKNaZy7S7GbIZgJAijAz5n14MNsgHUADGPRGENJW0/csLTmp3bLW96vleCNTxPZOj9nXCx6SXER\
GCN5wmILeMIteEbkgZ9l+Kn2UDssIpbiVoA/rXXNCm5IMlNofi/cQzYFlnGiybrjhpikFHXQt73L\
JjphVMEOGBvg7TAAepCN6wisl72pNf3RrADsU5sJagEPYogmvY5C0Crd/50VIulczqPOZxW6BJOh\
Difmw4xaXjKVpNG19ddk42tpbyu5PhPM1o9ydpW8PZh1sRuhUnnzH8P+AI7sIcLNEc6LAAAAAElF\
TkSuQmCC\
";



GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://erepublik.satonio.net/defensa/orden.php?version=0.2',
	onload:function(response){
		var respuesta=response.responseText;
		parser=new DOMParser();
		respuesta=parser.parseFromString(respuesta,"text/xml");
		respuesta=respuesta.documentElement;
		ordenes=respuesta.getElementsByTagName("listaOrdenes");

		var ocultas=GM_getValue('ocultas','({})');
		ocultas = eval(ocultas);
		var ocultasnuevas = new Object();

		
		$('#battle_listing').parent().prepend('<div id="earmy"></div>');
		var earmy = $('#earmy');
		earmy.append('<div class="title"><h1 style="padding-bottom: 5px;"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ejercito ePeru&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"opaque\" bgcolor=\"null\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/><span class=\"sIFR-alternate\">Ejercito ePeru</span></h1></div>');

		earmy.append('<ul  style="float: left;" class="tabs">'
				+'<li id="ordenes"><a class="on" href="#"><span style="width: 100px;">Ordenes</span></a></li>'
				+'<li id="foro"><a target="_BLANK" href="http://www.erepublikperu.com/foro/index.php"><span style="width: 100px;">Foro ePeru</span></a></li>'
	 +'<li id="Link"><a target="_BLANK" href="https://docs.google.com/document/d/1JfEBP-MK0weIuzdbRLfr2lbzOz4J_4U67yIlTXKsnzg/edit?hl=es&authkey=CKDF4rQN&pli=1#"><span style="width: 100px;">Link Ordenes</span></a></li>'			+'<li id="irc" class="last"><a target="_BLANK" href="http://wbeuk2.mibbit.com/?settings=29fdcba523719e5c15e2df228ac6456a&server=irc.rizon.net&channel=%23ePeru&noServerTab=0&nick=NewCitizen"><span style="width: 100px;">IRC</span></a></li>'
				+'</ul>');
		earmy.append('<div style="width: 100%; float: left; " id="ordenesnuevas"></div>'
				+'<a id="toggleLeidas" style="float: left; width: 100%; display: block; text-align: right; margin: 10px 0 0 0;" >Ver ordenes leidas</a>'
				+'<div style="display: none; width: 100%; float: left;" id="ordenesleidas"></div>');
		ordenesnuevas = $('#ordenesnuevas');
		ordenesleidas = $('#ordenesleidas');
		$('#toggleLeidas').bind('click', function() {
			if (ordenesleidas.css('display') == 'none') 
				$(this).html('Ocultar ordenes leidas');
			else 
				$(this).html('Ver ordenes leidas');
			ordenesleidas.slideToggle('normal');
		});
			

		for (i=0;i<ordenes.length;i++) {
			respuesta=ordenes.item(i);
			var id = respuesta.getElementsByTagName('id').item(0).childNodes[0].nodeValue;
			var titulo = respuesta.getElementsByTagName('titulo').item(0).childNodes[0].nodeValue;
			var ordenenlace = respuesta.getElementsByTagName('enlace').item(0).childNodes[0].nodeValue;
			var texto = respuesta.getElementsByTagName('minitexto').item(0).childNodes[0].nodeValue.replace(/\n/g,"<br>\n")
			var fecha = respuesta.getElementsByTagName('emitida').item(0).childNodes[0].nodeValue;
			var autor = respuesta.getElementsByTagName('autor').item(0).childNodes[0].nodeValue;
			try {
				var grupo = respuesta.getElementsByTagName('grupo')[0].childNodes[0].nodeValue;
			}
			catch (e) {
				//alert(e);
				var grupo='';
			}
			
			
			var visible;
			if (ocultas[id] == fecha) {
				ocultasnuevas[id] = fecha;
				visible='none';
				confirmacion = 'NoLeido';
			}
			else {
				visible='block';
				confirmacion = 'Leido';
			}
			//Insert elements on page
			//var visible = (i)?"none":"block";

			orden = '<div id="orden'+id+'">'
				+'<h2 id="titulo'+id+'"  style="cursor: pointer; color: #333; padding-left: 26px; background: transparent url('+imagenes[visible]+') no-repeat top left; font-size: 1.4em; margin-top: 10px; float: left; clear: both;" class="tituloOrden">'+titulo+'</h2>';

			orden += '<div id="texto'+id+'" fecha="'+fecha+'" infid="'+id+'" style="width: 100%; display: '+visible+'; float: left; clear: both;" class="texto">'
					+texto
					+'<a id="confirm'+id+'" style="cursor: pointer; background-position: 146px 50%; width: 150px; float: right; height: 15px; padding: 3px 0 3px 6px; margin: 15px 0 0px 0;" class="'+confirmacion+' confirm vround-btn-core btn-medium">Marcar como '+confirmacion+'</a>'
					+'</div>';
			

			orden += '<div style="color: #fff; background: #aaa; width: 100%;text-align: center; margin-top: 5px; border-bottom: 2px solid #aaa; float: left; clear: both;" class="pie">'+'<a style="color: white; text-decoration: underline;" href="'+ordenenlace+'">link</a> | '+fecha + ' por ' + autor + ((grupo!="")?" para "+grupo:"")+'</div></div>';

			if ((typeof ocultas[id] != 'indefined') && (ocultas[id] == fecha)) {
				ordenesleidas.append(orden);
			}
			else {
				ordenesnuevas.append(orden);
			}


		}
		if (ordenesnuevas.children().size() == 0) {
			ordenesnuevas.html('No hay ordenes nuevas');
		} 
		GM_setValue('ocultas',ocultasnuevas.toSource());
		$('h2.tituloOrden').click(function() {
			$(this).next(".texto").slideToggle("normal");
		});
		$('a.confirm').click(function() {
			
			if ($(this).hasClass('NoLeido')) { //la sube
				var ocultas=GM_getValue('ocultas','({})');
				ocultas=eval(ocultas);
				delete ocultas[$(this).parent().attr('infid')];
				GM_setValue('ocultas',ocultas.toSource());

				$(this).html('Marcar como Leido').removeClass('NoLeido').addClass('Leido');
				$(this).parent().prev().css('background','transparent url('+imagenes['block']+') no-repeat top left');
				if (ordenesnuevas.html() == 'No hay ordenes nuevas') 
					ordenesnuevas.empty();
				$(this).parent().parent().appendTo('#ordenesnuevas');
				//$(this).parent().parent().remove();
				if (ordenesleidas.children().size() == 0) {
					ordenesleidas.html('No hay ordenes leidas').hide();
					$('#toggleLeidas').html('Ver ordenes leidas');
				} 
				
	


			}
			else if ($(this).hasClass('Leido')) {  // la baja
				var ocultas=GM_getValue('ocultas','({})');
				ocultas=eval(ocultas);
				ocultas[$(this).parent().attr('infid')]=$(this).parent().attr('fecha');
				GM_setValue('ocultas',ocultas.toSource());

				$(this).html('Marcar como NoLeido').removeClass('Leido').addClass('NoLeido');
				$(this).parent().prev().css('background','transparent url('+imagenes['none']+') no-repeat top left');
				if (ordenesleidas.html() == 'No hay ordenes leidas') 
					ordenesleidas.empty();
				$(this).parent().hide().parent().appendTo('#ordenesleidas');
				//$(this).parent().parent().remove();
				if (ordenesnuevas.children().size() == 0) {
					ordenesnuevas.html('No hay ordenes nuevas');
				} 

			}
		});
	}
});














