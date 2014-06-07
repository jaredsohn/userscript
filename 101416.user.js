// ==UserScript==
// @name           mv-buitretools
// @namespace      mv-buitretools
// @description    Añade controles avanzados a los posts en MV para buitres
// @include        http://www.mediavida.com/foro/*
// @exclude        http://www.mediavida.com/foro/reportes.php
// @exclude        http://www.mediavida.com/foro/live.php*
// @exclude        http://www.mediavida.com/foro/spy*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript

/*function blacklistToggle() {
	var currentValue = GM_getValue('blacklistToggle', false);
	GM_setValue('blacklistToggle', currentValue);
}*/

function main() {
		jQuery.noConflict();


		//Cosas de Vegon
		
		var blacklistBarra = "<div class='nopost barra'> \
			<span class='mensaje-ocultado'>Buitreada, pero tienes el modo descanso activado. Pulsa en el buitre!</span> \
		</div> ";
		
		var balcklistToggle ="<div id='toggle'><div> "; 
	
		var blacklistInfo = "<span class='blacklisted-post'>Click en <img src='http://i.imgur.com/FAErg.png'> para desbuitrear.</span>";
	
		var blacklistAvatar = "~";
	
		//Inject CSS in header
		{
		var css = 
			".usertools TABLE TD\
			{\
					padding: 3px;\
			}\
			.usertools A\
			{\
			}\
			.firma\
			{\
					background: url(http://i.imgur.com/9H9px.png) no-repeat;\
					text-indent: -9999px;\
					width: 14px;\
					height: 11px;\
					display: block;\
					outline: 0;\
					margin-top: 1px;\
			}\
			.firma:hover\
			{\
					background-position: 0 -11px;\
			}\
			.mensaje\
			{\
					background: url(http://i.imgur.com/d11sR.png) no-repeat;\
					text-indent: -9999px;\
					width: 14px;\
					height: 10px;\
					outline: 0;\
					display: block;\
					margin-top: 1px;\
			}\
			.mensaje:hover\
			{\
					background-position: 0 -10px;\
			}\
			.blacklist-off\
			{\
					background: url(http://i.imgur.com/EIQzp.png) no-repeat;\
					text-indent: -9999px;\
					width: 12px;\
					height: 12px;\
					outline: 0;\
					display: block;\
					margin-top: 1px;\
			}\
			.blacklist-off:hover\
			{\
					background-position: 0 -12px;\
			}\
			.blacklist-on\
			{\
					background: url(http://i.imgur.com/EIQzp.png) no-repeat;\
					text-indent: -9999px;\
					width: 12px;\
					height: 12px;\
					outline: 0;\
					display: block;\
					margin-top: 1px;\
					background-position: 0 -12px;\
			}\
			.blacklist-on:hover\
			{\
					background-position: 0 0px;\
			}\
			.blacklist\
			{\
			}\
			.online\
			{\
					background: url(http://i.imgur.com/YqHd3.png) no-repeat;\
					text-indent: -99999px;\
					width: 8px;\
					height: 12px;\
					display: block;\
					outline: 0;\
			}\
			\
			.offline\
			{\
					background: url(http://i.imgur.com/3mek7.png) no-repeat;\
					text-indent: -99999px;\
					width: 8px;\
					height: 12px;\
					display: block;\
					outline: 0;\
			}\
			.online-pos\
			{\
					float: left;\
					width: 14px;\
z-index: 999;\
			}\
			.mensaje-pos\
			{\
					float: left;\
					width: 19px;\
			}\
			.blacklist-pos\
			{\
					float: right;\
					margin-top: -1px;\
					width: 15px;\
			}\
			.firma-pos\
			{\
					float: left;\
					width: 19px;\
			}\
			.mensaje-ocultado\
			{\
					font-weight: bold;\
			}\
			.toggle-on\
			{\
					background: url(http://i.imgur.com/IggLM.png) no-repeat;\
					width: 34px;\
					height: 34px;\
					cursor: pointer;\
			}\
			.toggle-off\
			{\
					background: url(http://i.imgur.com/OqIef.png) no-repeat;\
					width: 34px;\
					height: 34px;\
					cursor: pointer;\
			}\
			.tapavatares\
			{\
					width: 0px; \
					height: 0px; \
					position:relative;\
			}\
			.tapavatares span {\
					position: abosolute; \
					background: url(http://i.imgur.com/Ss34E.png) no-repeat;\
					background-position: 0 4px;\
					width: 80px; \
					height: 84px; \
					top: 6px; \
					left: 0px;\
					display: block;\
			}\
			.blacklisted-post\
			{\
					border-radius: 7px;\
					ms-border-radius: 7px;\
					-moz-border-radius: 7px;\
					-webkit-border-radius: 7px;\
					-khtml-border-radius: 7px;\
					padding: 3px 10px 2px 10px;\
					background: #FCBBFA;\
					color: #B30000 !important;\
			}\
			.usertools\
			{\
					position: relative;\
					width: 67px;\
					margin-top: 2px;\
			}";
		}
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node);
			}
		}
		
		
		//Set Toggle Class
		
		$("#scrollpages").append(balcklistToggle);
		
		if (localStorage.getItem('blacklist') == 'on') {
			$('#toggle').addClass("toggle-on");
			$('#toggle').removeClass("toggle-off");
			console.log("encendido");
		}
		else {
			$('#toggle').addClass("toggle-off");
			$('#toggle').removeClass("toggle-on");
			console.log("apagado");
		}
		
		
		//put usernames where they belong.
		jQuery("a[href^='/id/']")
		.each(function()
		{
			var name = this.href.slice(this.href.lastIndexOf('/') + 1);
			jQuery(this).parent().parent().parent('.autor').data('name', name);
		});
		
		//jQuery("img[src^='/img/users/avatar']").parent().after("<div class='ancla'><div>");
		
		jQuery('.autor').each(function() {
			jQuery(this).append("<div class='usertools'>\
								<div class='online-pos'><a class='tooltip offline' href='http://www.mediavida.com/id/" + jQuery(this).data('name') + "' original-title='Perfil' ></a></div>\
								<div class='mensaje-pos'><a class='tooltip mensaje' href='http://www.mediavida.com/mensajes/nuevo/" + jQuery(this).data('name') + "' original-title='Mensaje'></a></div>\
								<div class='firma-pos'><a class='tooltip firma' href='http://www.mediavida.com/id/" + jQuery(this).data('name') + "/firmas' original-title='Firma'></a></div>\
								<div class='blacklist-pos'><a class='tooltip blacklist blacklist-off' href='javascript:void(0)' original-title='Buitrear'></a></div>\
						</div>");
		});
		$('.online').hide();
		$('.online').parent().parent().find('.offline').toggleClass('online offline');
		
		//Primera carga del a página. Tapar los posts de la blacklist si procede.
		
		jQuery("img[src^='/img/users/avatar']").parent().prepend("<div class='tapavatares'><span></span></div>");
		
		//jQuery("img[src^='/img/users/avatar']").parent().append("<div class='ancla'><div>");
		
		//jQuery("img[src^='/img/users/avatar']").after("<div class='tapavatares'></div>")
		
		jQuery('.autor').each(function() {
			//Pijadas que marcan el post como blacklisted
			
			var localvalue = 'blacklist.' + jQuery(this).data('name');
			// INFO & BOTONES & AVATARES
			if (localStorage.getItem(localvalue) == 'true') {
				jQuery(this).find(".blacklist").addClass('blacklist-on');
				jQuery(this).find(".blacklist").removeClass('blacklist-off');
				jQuery(this).parent().find(".info").append(blacklistInfo);
			}
			else
			{
				jQuery(this).find(".blacklist").addClass('blacklist-off');
				jQuery(this).find(".blacklist").removeClass('blacklist-on');
				jQuery(this).parent().find(".info").append(blacklistInfo);
				jQuery(this).parent().find(".blacklisted-post").hide();
				jQuery(this).parent().find(".tapavatares").hide();
			}
			// BARRA
			jQuery(this).parent().before(blacklistBarra);
			if (localStorage.getItem('blacklist') == 'on') {
				if (localStorage.getItem(localvalue) == 'true') {
					jQuery(this).parent().hide();
				}
				else {
					jQuery(this).parent().prev().hide();
				}
			}
			else
				jQuery(this).parent().prev().hide();


		});
		// Fin de la primera carga
		
		jQuery("#toggle").click(function () {
		
		//	jQuery('#toggle').toggleClass("toggle-on toggle-off");
		
			if (localStorage.getItem('blacklist') == 'on') {
				$('#toggle').addClass("toggle-off");
				$('#toggle').removeClass("toggle-on");
				localStorage.setItem('blacklist', 'off');
			}
			else {
				$('#toggle').addClass("toggle-on");
				$('#toggle').removeClass("toggle-off");
				localStorage.setItem('blacklist', 'on');
			}
			console.log(localStorage.getItem('blacklist'));
			//Tenemos un nuevo estado. Si ahora es on, tenemos que ocultar, si es off tenemos que mostrar
			jQuery('.autor').each(function() {
				var localvalue = 'blacklist.' + jQuery(this).data('name');
				if (localStorage.getItem('blacklist') == 'on') {
					if (localStorage.getItem(localvalue) == 'true') {
						jQuery(this).parent().prev().show();
						jQuery(this).parent().hide();
					}
				}
				else {
					if (localStorage.getItem(localvalue) == 'true') {
						jQuery(this).parent().prev().hide();
						jQuery(this).parent().slideDown();
						jQuery('.social').show();
					}
				}
			});
		});
		// Fin de actualización

		jQuery(".blacklist").click(function () {
			var localvalue = 'blacklist.' + jQuery(this).parent().parent().parent().data('name');
			if (localStorage.getItem(localvalue) == 'true')
				localStorage.removeItem(localvalue);
			else
				localStorage.setItem(localvalue, 'true');
				
			console.log('set ' + localvalue + ' = ' + localStorage.getItem(localvalue));
	
	
			// En caso de blacklist ON Tapar los posts del autor si ahora esta blacklisted, o mostrarlos en caso contrario.
			// Si esta off, añadir pijadas o quitarlas.
			
			jQuery('.autor').each(function() {
				var localvalue = 'blacklist.' + jQuery(this).data('name');
				
				
				if (localStorage.getItem(localvalue) == 'true') {
					jQuery(this).find(".blacklist").addClass('blacklist-on');
					jQuery(this).find(".blacklist").removeClass('blacklist-off');
					jQuery(this).parent().find(".blacklisted-post").show();
					jQuery(this).parent().find(".tapavatares").show();
				}
				else
				{
					jQuery(this).find(".blacklist").addClass('blacklist-off');
					jQuery(this).find(".blacklist").removeClass('blacklist-on');
					jQuery(this).parent().find(".blacklisted-post").hide();
					jQuery(this).parent().find(".tapavatares").hide();
				}
					
				if (localStorage.getItem('blacklist') == 'on') {
					if (localStorage.getItem(localvalue) == 'true') {
						jQuery(this).parent().prev().show();
						jQuery(this).parent().slideUp();
					}
					else {
						jQuery(this).parent().slideDown();
						jQuery(this).parent().prev().hide();
					}
				}
				else
					if (localStorage.getItem(localvalue) == 'true') {
						//añadir pijadas
					}
					else {
						//quitar pijadas
					}
			});
			// Fin de actualización
		});
		$("a.tooltip").tipsy();
	}

// load jQuery and execute the main function
addJQuery(main);