// ==UserScript==
// @name           Filtrado Notificaciones Comunidades
// @namespace      pudymody
// @include        *.taringa.net/mi/notificaciones/
// ==/UserScript==
var $ = unsafeWindow.jQuery;

unsafeWindow.Comunidades = {
	'Comunidades' : {},
	
	'Set' : function(){
		var comunidades = {};
		localStorage['comunidades'] = '';
		var Headers = $('#newsfeed > div.activity-element.clearfix.new-tema > div.activity-content > div.activity-header.clearfix');
		$.each(Headers, function(i,data){
			var enlace = $(this).children('a:eq(1)');

			var url = $(enlace).attr('href');
			var name = $(enlace).text();

			comunidades[url] = name;
		});

		$.each(comunidades, function(i,value){
			localStorage['comunidades'] += encodeURIComponent(value) + '&&//';
		})
		window.location.reload();
	},
	
	'Get' : function(){
		var ComunidadesArray = localStorage['comunidades'].split('&&//'); ComunidadesArray.pop();
		for(i in ComunidadesArray){
			this.Comunidades[i] = decodeURIComponent(ComunidadesArray[i]);
		}
	},
	
	'Show' : function(title,obj){
		$('ul#Comunidades li').removeClass('pin-highlight');
		$(obj).addClass('pin-highlight');
		$('#newsfeed > div.activity-element.clearfix').hide();
		$('#newsfeed > div.activity-element.clearfix.new-tema > div.activity-content > div.activity-header.clearfix').children("a:contains('" + title + "')").parents('div.activity-element.clearfix.new-tema').show();
	},
	
	'ShowAll' : function(){
		$('ul#Comunidades li').removeClass('pin-highlight');
		$('#newsfeed > div.activity-element.clearfix').show();
	},
	
	'MakeBox' : function(){
		if(!this.Comunidades[0] == ''){ this.Get(); }
		
		$('#sidebar').prepend('\
								<div class="box" id="comus">\
									<div class="title clearfix">\
										<h2>Comunidades</h2>\
										<span class="action value pointer" onclick="Comunidades.Set();" title="Recargar Comunidades"><i class="icon refresh"></i></span>\
									</div>\
									<div class="textrank-tags hashlist clearfix">\
										<div style="display:none" class="hastipsy emptyData" title="Guarda palabras que te interesan como un pin para saber cuando se utilizan en un shout">No tienes pins</div>\
										<ul id="Comunidades">\
										<li class="clearfix" onclick="Comunidades.ShowAll();"><a class="first">Mostrar Todo</a></li>\
										</ul>\
									</div>\
								</div>\
							');
							
		for(i in this.Comunidades){
			$('ul#Comunidades').append('<li class="clearfix" onclick="Comunidades.Show(\'' + this.Comunidades[i] + '\',$(this));"><a class="first">' + this.Comunidades[i] + '</a></li>');
		}
	}
};
unsafeWindow.Comunidades.Get();
unsafeWindow.Comunidades.MakeBox();