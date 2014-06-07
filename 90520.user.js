// ==UserScript==
// @name           Tu secreto modera
// @namespace      Pato12 - halfmusic.com
// @include        http://www.tusecreto.com.ar/moderar/
// ==/UserScript==

var $;

if(typeof unsafeWindow == 'undefined')
	unsafeWindow = window;

(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		return;
	}
	GM_wait();
})();
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery;
	}
}
var temp = '';
var caritas = true;
(function(){
		  $('#moderacion').html('<h3>Ahora modera sin recargar la pagina!</h3>Cuando este el cartel "Buscando...", solo espera unos segundos y aparecera un nuevo secreto ;)<br/><br/>');
		  
		  setInterval(function(){
					  if($("#secreto_div").html()=='<p>Buscando...</p>'){
					  		unsafeWindow.DoGetNewSecret();
					  }
					},5000);
		  setInterval(function(){
					  if($("#secreto_div").html()=='<p>No hay más secretos para moderar.</p>' || $("#secreto_div").html()=='<p>No hay m&aacute;s secretos para moderar.</p>' || $("#secreto_div").html()=='<p>Hubo un problema procesar su voto. Por favor reintenta en 5 minutos.</p>' || $("#secreto_div").html()=='<p>Hubo un problema al querer buscar un secreto para moderar. Reintenta en 5 minutos.</p>'){
						  $("#secreto_div").html('<p>Buscando...</p>');
						  $('#secret_loader').show();
					  }
						  if(temp != $('#secreto_div').html() && caritas){
							  temp = $('#secreto_div').html();
							  var str = $('#secreto_div').html();
							  str = str.replace(':p','<img src="http://foros.cristalab.com/images/smiles/icon_razz.gif" />');
							  str = str.replace(':P','<img src="http://foros.cristalab.com/images/smiles/icon_razz.gif" />');
							  str = str.replace(':)','<img src="http://foros.cristalab.com/images/smiles/icon_happy.gif" />');
							  str = str.replace('¬¬','<img src="http://foros.cristalab.com/images/smiles/icon_nif.gif" />');
							  str = str.replace(':(','<img src="http://foros.cristalab.com/images/smiles/icon_mad.gif" />');
							  str = str.replace(';)','<img src="http://foros.cristalab.com/images/smiles/icon_wink.gif" />');
							  str = str.replace(':|','<img src="http://foros.cristalab.com/images/smiles/icon_confused.gif" />');
							  str = str.replace(':o','<img src="http://foros.cristalab.com/images/smiles/icon_surprised.gif" />');
							  str = str.replace(':O','<img src="http://foros.cristalab.com/images/smiles/icon_surprised.gif" />');
							  str = str.replace(':D','<img src="http://foros.cristalab.com/images/smiles/icon_sunrise.gif" />');
							  str = str.replace(':d','<img src="http://foros.cristalab.com/images/smiles/icon_sunrise.gif" />');
							  str = str.replace(':S','<img src="http://foros.cristalab.com/images/smiles/icon_crap.gif" />');
							  str = str.replace(':s','<img src="http://foros.cristalab.com/images/smiles/icon_crap.gif" />');
							  str = str.replace('xd','<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif" />');
							  str = str.replace('xD','<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif" />');
							  str = str.replace('Xd','<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif" />');
							  str = str.replace('XD','<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif" />');
							  $('#secreto_div').html(str);
						  }
					},100);
		  setTimeout(function(){$('#google_ads_div_TS_Header_728x90').slideUp(100,function(){$('#google_ads_div_TS_Header_728x90').html('nada');});},1000);
		var inp = $('<input /> Caritas').add('<span>Poner caritas a los secretos</span>').attr({'type':'checkbox','value':'on','checked':'checked'}).change(function(){
			if($(this).is(':checked')){
				caritas = true;
				temp = '';
			}else{
				caritas = false;
				  var str = $('#secreto_div').html();
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_razz.gif" />',':P');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_happy.gif" />',':)');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_nif.gif" />','¬¬');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_mad.gif" />',':(');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_wink.gif" />',';)');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_confused.gif" />',':|');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_surprised.gif" />',':O');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_sunrise.gif" />',':D');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_crap.gif" />',':S');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif" />','xD');
				  
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_razz.gif">',':P');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_happy.gif">',':)');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_nif.gif">','¬¬');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_mad.gif">',':(');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_wink.gif">',';)');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_confused.gif">',':|');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_surprised.gif">',':O');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_sunrise.gif">',':D');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_crap.gif">',':S');
				  str = str.replace('<img src="http://foros.cristalab.com/images/smiles/icon_lol.gif">','xD');
				  $('#secreto_div').html(str);
			}
		}).appendTo($('#moderacion'));
})();