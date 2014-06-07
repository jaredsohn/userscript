// ==UserScript==
// @id             pikabuWatсhLater
// @name           pikabuWatсhLater
// @version        1.0
// @namespace      http://userscripts.org/users/534236
// @author         jitb
// @description    Позволяет складывать загружающиеся гифки в сторону, чтобы потом не возвращаться к ним
// @include        http://pikabu.ru/*
// @run-at         document-end
// ==/UserScript==

$ = unsafeWindow.$;

queue = $('<div style="position: fixed; right:0; bottom:0; height: 100%; overflow: auto; z-index:101;"></div>');
$('body').append(queue);

function createLinks() {
	$('.main .watchlater').remove();
	$('.main .gifPrev, .main a img[src$="gif"]').after("<a class='watchlater' href='javascript:void(0)'>>></a><br/>");
	$('.main .watchlater').click(function(){
		queue.append($(this).parent());
		queue.animate({"scrollTop":999999},1000);
		$(this).text('X').css({'color': 'red',
								'font-weight': 'bold',
								'position': 'absolute',
								'right': 0,
								'z-index': 102
		}).click(function(){
			$(this).parent().remove();
		});
	});
}

$(document).ajaxComplete(createLinks);

$('.sv_img.showpic').click(function() {
	setTimeout(createLinks,1000);
});
createLinks();