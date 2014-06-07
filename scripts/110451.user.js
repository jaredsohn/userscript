// ==UserScript==
// @name           	Musicuo++
// @description    	Agrega funcionalidades a Musicuo.com
// @version        	1.1
// @date           	2011-09-07
// @author         	garraS
// @namespace      	http://musicuo.com
// @include     	http://musicuo.com/*
// @include     	http://*.musicuo.com/*
// @require       	http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

var imagenBajar = "data:image/png;base64,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";

$(document).ready(function() {
	
	// Remueve la publicidad
	$('#banner').remove();
	
	// HOME
	var intervaloHome = setInterval(function(){
		if ( $('#copyright').length ) {
			// SACO EL COPYRIGHT
			$('#copyright').remove();
			// AGREGO EL ++ A LA TAPA
			$('.inicio_box .logo').append('<div style="position:absolute;font-size:36px;font-family:cursive;left:330px;top:40px;">++</div>');
			clearInterval(intervaloHome);
		}
	}, 1000);
	
	// BOTON BAJAR TEMA
	$('#player .rightbox').css({
		 marginRight: '160px'
	});
	$('.p_total_time').css({
		marginLeft: '-88px'
	});
	
	$('<div class="downbox"><a href="#">Down</a></div>').insertBefore('#player .rightbox');
	
	$('#player .downbox').css({
		 borderLeft: '1px solid #3D3D3D'
		,borderRight: '1px solid #111111'
		,float: 'right'
		,height: '40px'
		,width: '40px'
	});
	$('#player .downbox a').css({
		 backgroundImage: 'url('+imagenBajar+')'
		,backgroundRepeat: 'no-repeat'
		,backgroundPosition: 'center 0'
		,width: '33px'
		,height: '34px'
		,display: 'block'
		,outline: 'medium none'
		,overflow: 'hidden'
		,textIndent: '-100px'
		,margin: '4px 4px'
	}).attr('title', 'Descargar la canción en reproducción');

	$('#player .downbox a').click(bajarTema);
	
});

function bajarTema(e) {
	unsafeWindow.$.ajax({
		 url: '/include/mp3/get'
		,type: 'POST'
		,data: {
			 file: unsafeWindow.player.actual
			,token: unsafeWindow.ptk
		}
		,success: function(msg) {
			$('#bajarTema').remove();
			$('body').append("<iframe src='"+msg+"' width='1' height='1' style='display:none;' id='bajarTema'></iframe>");
		}
	});
	return false;
}