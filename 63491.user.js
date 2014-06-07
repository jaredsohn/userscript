// ==UserScript==
// @name           Taringa - Borradores (Mejorado)
// @namespace      http://luciano.longo.me/gm/
// @description    Permite guardar en un borrador los posts que creas
// @author         xNephilimx
// @include        http://www.taringa.net/agregar/*
// @include        http://taringa.net/agregar/*
// @require        http://luciano.longo.me/demos/greasemonkey/gm.jquery.js
// ==/UserScript==

var BorradoresT = function()
{
	var _version = 1.0;
	var _server = 'http://www.mcodina.com.ar/';
	var _script = _server+'borrador_taringa.php';
	
	// Detectar version
	$.get('http://luciano.longo.me/demos/greasemonkey/tdrafts-v.php', function( data )
	{
		if( parseFloat( data ) > _version )
		{
			var _c = confirm("Hay una nueva version de este script. Queres instalarla ahora?");
			
			if( _c ) location.href = "http://userscripts.org/scripts/source/63491.user.js";
		}
	});
	
	// Detectamos el nombre de usuario
	var username = $('a.username').text();
	
	// Si no hay username, no esta logueado, asi que todo se termina aca
	if( username == '' ) return;
	
	// Traemos el menu T!
	var _t_menu = $('#subMenuPosts > ul');
	
	// Buscamos el tab
	var _btab = $('li#tab-borradores', _t_menu);
	if( !_btab.length )
	{
		// Creamos el nuevo tab
		var _btab = $('<li id="tab-borradores"><a style="font-weight: bold;" title="Borradores" href="#borradores">Borradores</a></li>')
		var _btab_link = _btab.find('a').click( _toggle_borradores );
	
		// Agregamos el tab
		var _div_cabeza = _t_menu.children(':last');
		_div_cabeza.before( _btab );
	}
	
	// Si hacemos click en cualquier lado menos en el tab, cerramos la lista
	$(document).click(function( e )
	{
		if( e.target == _btab_link[0] ) return;
		
		_cerrar_borradores.apply(_btab_link, [e]);
	});
	
	// Traemos/Creamos la lista de borradores
	var _list = $('.borradores-t');
	if( ! _list.length ) _list = $('<ul class="borradores-t" />');
	
	// Le damos estilo, la insertamos y la ocultamos
	_list.appendTo('body').css({
		'position':'absolute',
		'background':'#fff',
		'padding':'5px 0',
		'min-width':150,
		'-moz-box-shadow':'0 0 12px 0 rgba(0, 0, 0, 0.5)',
		'-moz-border-radius-topright':5,
		'-moz-border-radius-bottomright':5,
		'-moz-border-radius-bottomleft':5
	}).hide();
	
	// Agregamos el boton "Guardar borrador"
	var _save_btn = $('<input type="button" tabindex="9" title="Guardar borrador" value="Guardar borrador" style="font-size: 15px;" class="button" />')
		.click( _guardar_borrador )
		.insertAfter('input[type="button"][title="Previsualizar"]');
	
	
	function _guardar_borrador()
	{
		var pwd = prompt('Por favor, ingresa un password para tu borrador');
		
		if( !pwd )
		{
			alert('No se puede guardar sin password!');
			return;
		}
		
		// Preparar la data
		var pdata = {
			'task':'set',
			'titulo':$('input[name="titulo"]').val(),
			'post':$('textarea[name="cuerpo"]').val(),
			'tags':$('input[name="tags"]').val(),
			'categoria':$('select[name="categoria"]').get(0).selectedIndex,
			'pass':pwd,
			'usuario':username
		}
		
		// Guardar el borrador
		$.post( _script, pdata, function( data )
		{
			alert( data );
		});
	}
	
	function _toggle_borradores( e )
	{
		e.preventDefault();
		
		if( _lista_visible() ) _cerrar_borradores.apply(this, [e]);
		else _mostrar_borradores.apply(this, [e]);
	}
	
	function _lista_visible()
	{
		return _list.css('display') != 'none';
	}
	
	/**
	 * Trae la lista de borradores
	 */
	function _mostrar_borradores()
	{
		var $this = $(this);
		
		$this.parent().addClass('here');
		
		// Posicionamos la lista
		_list.css({
			top:$this.offset().top + parseInt( $(this).css('padding-top') ) + parseInt( $(this).css('padding-bottom') ) + $(this).height(),
			left:$this.offset().left
		})
		// Y la mostramos con un preloader
		.slideDown().html('<li style="padding:4px 10px">Cargando...</li>');
		
		// Traer los nombres de los borradores del server
		$.post( _script, {'task':'load', 'usuario':username}, function( data, textStatus )
		{
			if( textStatus != 'success' ) return;
			
			var lis = '';
			
			if( !data.length )
			{
				lis += '<li>Todav&iacute;a no ten&eacute;s ning&uacute;n borrador!</li>';
			}
			else
			{
				for( var i in data )
				{
					var b = data[i];
				
					lis +=	'<li><a href="#load:'+b.id+'" title="Cargar este borrador">'+b.titulo+'</a>'
							+ ' | <a href="#delete:'+b.id+'" style="color:#f00;">Borrar</a></li>';
				}
			}
			
			// Reemplazamos el contenido de la lista con los nuevos li's
			_list.html( lis )
			// Les damos estilo
			.find('li').css({
				'padding':'4px 10px',
				'cursor':'default',
				'text-shadow':'1px 1px 0 #fff'
			}).hover(
				function()
				{
					$(this).css('background-color','#ddd');
				},
				function()
				{
					$(this).css('background-color','');
				}
			)
			// Y le asignamos las acciones a los links
			.find('a').click(function(e)
			{
				e.preventDefault();
				
				this.hash.match(/^#(load|delete):([\d]+)$/i);
				
				var action = RegExp.$1;
				var id_borrador = RegExp.$2;
				var pwd = prompt('Ingrese el password del borrador');
				
				var pdata = {'task':'', 'id':id_borrador, 'pass':pwd}
				
				switch( action )
				{
					case 'load':
						pdata.task = 'getPost';
						
						$.post( _script, pdata, function( data )
						{
							data = data[0];
							
							data.post = data.post.replace(/\[saltoN\]/ig, "\n");
							data.post = data.post.replace(/\[saltoR\]/ig, "\r");
							data.post = data.post.replace(/\[saltoNR\]/ig, "\n\r");
							
							$('input[name="titulo"]').val( data.titulo );
							$('textarea[name="cuerpo"]').val( data.post );
							$('input[name="tags"]').val( data.tags );
							$('select[name="categoria"]').get(0).selectedIndex = data.categoria;
						}, 'json');
					break;
					
					case 'delete':
						pdata.task = 'borrarPost';
						
						$.post( _script, pdata, function( data )
						{
							alert( data );
						});
					break;
				}
			});
			
		}, 'json');
	}
	
	function _cerrar_borradores()
	{
		var $this = $(this);
		
		$this.removeClass('here');
		
		_list.slideUp();
	}
}

$(function()
{
	try
	{
		new BorradoresT();
	}
	catch( e ) {
		if( console && console.log )
			console.log( 'Exception!', e );
	}
});