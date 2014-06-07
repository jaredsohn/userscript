// ==UserScript==
// @name           WefragChatboxAutoRefresh-dev
// @version        1.2.1b-dev
// @author         SauCiSSoN
// @description    Le rafraichissement de la boite à chat de WeFrag !
// @include        http://forum.nofrag.com/forums
// ==/UserScript==

// Mes excuses aux administrateurs du serveur qui vont potentiellement se prendre quelques requêtes en plus à cause de moi ^^'

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + main.toString() + ")(jQuery)";
document.body.appendChild(script);

function main($) {
	config = {
		refreshInterval: 30, // En secondes
		loaderImg: 'http://pix.wefrag.com/i/8/c/3/1/b/43753b90262194afdb6af22ff9278ce0.gif',
	};

	var loader = $('<img src="'+config.loaderImg+'" alt="Mise à jour de la boite du chat" />');
	
	loader
		.css('position', 'absolute')
		.css('margin', '-5px 1px 1px 280px')
		.ajaxStart(function(){ $(this).fadeIn(); })
		.ajaxStop(function(){ $(this).fadeOut(); })
	;

	$('#shouts .title a').before(loader);
	
	loader.fadeOut();

	function refreshChatbox(){
		$.get('/forums', function(data){
			var start = data.indexOf("<body>");
			var end = data.indexOf("</body>");
			var html = data.slice(start, end);
			var msgs = $(html).find('.msg');
			var list = $('#shouts .list');
			
			list.text('');
			
			msgs.each(function(){
				$(this).click(function(){
					var selectedTime = $(this).find('.time').text();
					$('#shout_body').val(selectedTime);
				});
				
				list.append($(this));
			});
		});
		
		setTimeout(refreshChatbox, config.refreshInterval * 1000);
	};
	
	setTimeout(refreshChatbox, config.refreshInterval * 1000);
};