// ==UserScript==
// @name           mv-usertools
// @namespace      mv-usertools
// @description    Añade controles avanzados a los posts en MV
// @include        http://www.mediavida.com/foro/*
// @include        http://www.mediavida.com/
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
			Usuario <span class='mensaje-ocultado'>Blacklisted</span> <a class='hiddenmsg'>mostrar</a> \
		</div> ";
		
		var balcklistToggle ="<div id='toggle'><div> "; 
	
		var blacklistInfo = "<span class='blacklisted-post'>Click en <img src='http://tools.mediavida.com/gm/blacklist-mini.png'> para desbloquear.</span>";
	
		var blacklistAvatar = "~";
		
		//Inject CSS in header
		{
		var css = 
			".usertools TABLE TD\
			{\
					padding: 3px;\
			}\
			A\
			{\
			cursor: pointer;\
			}\
			.firma\
			{\
					background: url(http://tools.mediavida.com/gm/firma.png) no-repeat;\
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
					background: url(http://tools.mediavida.com/gm/mensaje.png) no-repeat;\
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
					background: url(http://tools.mediavida.com/gm/blacklist.png) no-repeat;\
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
					background: url(http://tools.mediavida.com/gm/blacklist.png) no-repeat;\
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
					background: url(http://tools.mediavida.com/gm/online.png) no-repeat;\
					text-indent: -99999px;\
					width: 8px;\
					height: 12px;\
					display: block;\
					outline: 0;\
			}\
			\
			.offline\
			{\
					background: url(http://tools.mediavida.com/gm/offline.png) no-repeat;\
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
					color: #E01B2F;\
			}\
			.toggle-on\
			{\
					background: url(http://tools.mediavida.com/gm/toggle-on.png) no-repeat;\
					width: 34px;\
					height: 34px;\
					cursor: pointer;\
			}\
			.toggle-off\
			{\
					background: url(http://tools.mediavida.com/gm/toggle-off.png) no-repeat;\
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
					background: url(http://tools.mediavida.com/gm/blacklisted.png) no-repeat;\
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
					background: #ccc;\
					color: #626262 !important;\
			}\
			#usertools-menu\
			{\
					height: 24px; \
					position: relative;\
					margin-left: 3px;\
			}\
			#menu-bg\
			{\
					height: 100%; \
					width: 100%; \
					position: fixed;\
					z-index: 99998;\
					background: #000;\
					top: 0px;\
					opacity: .5;\
					filter:alpha(opacity=50);\
			}\
			#menu-cont\
			{\
					height: 400px; \
					width: 700px; \
					position: fixed;\
					z-index: 99999;\
					background: #fff;\
					top: 100px;\
					right: 0px;\
					left: 0px;\
					margin: auto;\
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
								<div class='blacklist-pos'><a class='tooltip blacklist blacklist-off' href='javascript:void(0)' original-title='Blacklist'></a></div>\
						</div>");
		});
		
		
		//usertools menu-botón
		$('#userinfo').after("<div id='usertools-menu'><strong class='bar'><a class='last'><img src='http://i.imgur.com/czAhH.png'>UT Menu</a></strong></div>");
		//usertools menu-posición
		$('BODY').append("<div id='menu-bg'></div><div id='menu-cont'><a id='tab1' href='#'>1</a><a id='tab2' href='#'>2</a><a id='tab3' href='#'>3</a><a id='tab4' href='#'>4</a>");
		
		$('#menu-bg').hide();
		$('#menu-cont').hide();
		
		$("#usertools-menu").click(function () {
			$('#menu-bg').show();
			$('#menu-cont').show();
		});
		
		$('#menu-bg').click(function () {
			$('#menu-bg').hide();
			$('#menu-cont').hide();
		});
		
		var menutab1 = "<div id='tab'>Tab 1</div>";
		var menutab2 = "<div id='tab'>Tab 2</div>";
		var menutab3 = "<div id='tab'>Tab 3</div>";
		var menutab4 = "<div id='tab'>Tab 4</div>";
		
		$('#menu-cont').append(menutab1);
		
		$('#tab1').click(function () {
			$('#tab').replaceWith(menutab1);
		});
		
		$('#tab2').click(function () {
			$('#tab').replaceWith(menutab2);
		});
		
		$('#tab3').click(function () {
			$('#tab').replaceWith(menutab3);
		});
		
		$('#tab4').click(function () {
			$('#tab').replaceWith(menutab4);
		});
		
		
		//no cambiar los $ o esto casca
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