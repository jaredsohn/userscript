// ==UserScript==
// @name        YT Wide
// @namespace   juampi_92
// @description Hace que el ancho de youtube se ajuste segun lo deseado.
// @include     http://www.youtube.com/watch?*
// @include     https://www.youtube.com/watch?*
// @require     https:////ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require     https:////ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @grant		GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant		GM_registerMenuCommand
// ==/UserScript==
(function(){

	var $views = $('.watch-view-count strong'),
		$player = $('#watch-video.medium #watch-player'),
		ancho_fijo = 854,
		alto_fijo = 510,
		ancho_user = ( $(window).width() - 20 );

	function ActivarResizable()
	{

		$player.css('padding-bottom','5px').resizable({
	    	aspectRatio: ancho_fijo / alto_fijo,
	    	//maxHeight: 250,
	        maxWidth: (ancho_user),
	        minHeight: alto_fijo,
	        minWidth: ancho_fijo,
	        stop: function (event, ui)
	        {
	        	var ancho = Math.floor(ui.size.width);
	        	GM_setValue("ancho", ""+ancho+"" );
	        	console.log ( 'seteando ' + ancho );
	        }
	    });
	}

	if(GM_getValue("ancho") == undefined)
	{
		console.log("Configurando por primera vez");
		GM_setValue("ancho", $player.width() ); // Seteo con el valor que está.
	}

	function CambiarValores(){
		return prompt("Insertar el Ancho del reproductor. El alto se ajustara automaticamente",GM_getValue("ancho"));
	}

	function Altura(ancho){
		return ((ancho * alto_fijo) / ancho_fijo );
	}

	GM_addStyle("#watch-video.medium #watch-player{height: " + Altura(GM_getValue("ancho")) + "px;width: "+GM_getValue("ancho")+"px;}"+
	"#watch-video.medium{width:auto;}"+
	"#watch-insight-button{display:none;}");
	$('head').append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />');

	function AjustarValores(valor){
		$player.css({
			'height' : Altura(valor)+'px',
			'width': valor+'px'
		});
	}

	function Cambiar(valor)
	{
		if(!valor){
			valor = CambiarValores();
			if(valor == ''){
				alert('No dejar vacio ese campo');
				return false;
			}
		}	
		if(valor > ancho_user){
			alert('El ancho no debe salir de la pantalla (max '+ancho_user+'px)');
		} else if ( valor < ancho_fijo )
		{
			alert('El ancho no puede ser menor al mínimo ('+ancho_fijo+'px)');
		}else{
			AjustarValores(valor);
			GM_setValue("ancho",valor);
		}
	}

	// Registrar comandos utiles.
	GM_registerMenuCommand("Yt Wide - Ajustar Proporcion", Cambiar ,null,null,"R");
	GM_registerMenuCommand("Yt Wide - Mi Maximo", function(){Cambiar(ancho_user)},null,null,"R");
	GM_registerMenuCommand("Yt Wide - Manualmente", ActivarResizable ,null,null,"R");
	GM_registerMenuCommand("Yt Wide - Default", function(){Cambiar(ancho_fijo)},null,null,"R");

	// Registro de la tecla.
	$(window).keyup(function(e){ //Al apretar SHIFT + W
		if(e.shiftKey && e.which == 87 && $.inArray(e.target.tagName.toLowerCase(), [ 'input', 'textarea', 'select' ]) == -1){
			Cambiar();
		}	
	});

	// YouTube AddComas
	function number_format (number, decimals, dec_point, thousands_sep)
	{
	    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	    var n = !isFinite(+number) ? 0 : +number,
	        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	        s = '',
	        toFixedFix = function (n, prec) {
	            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
	        };
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	    }
	    if ((s[1] || '').length < prec) {
	        s[1] = s[1] || '';
	        s[1] += new Array(prec - s[1].length + 1).join('0');    }
	    return s.join(dec);
	}

	$views.html( number_format( $views.html() ) );

})();
