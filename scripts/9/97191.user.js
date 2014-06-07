// ==UserScript==
// @name         Viadeo Fuck
// @namespace    http://nostalgeek.org/
// @description  Something like FUCK VIADEO! YEAH!
// @version 	 1.01
// @include      http://www.viadeo.com/monreseau/consultation/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

Viadeo = function(){
	var url_profil = 'http://www.viadeo.com/profile/';
	var url_ajaxgif = 'http://static0.viadeo-static.com/v_img14/mininews/ajax-loader.gif';
	
	function getMemberId(url_image){
		return url_image.substring(url_image.indexOf('=')+1, url_image.indexOf('&'));
	}
	function urlProfil(memberId){
		return url_profil + memberId;
	}
	
	return {
		getMemberId: getMemberId,
		url_profil: url_profil,
		url_ajaxgif: url_ajaxgif,
		urlProfil: urlProfil
	};
}();

$(document).ready(function(){
	var members = new Array();
	var $stock = $('<div></div>').attr('id', 'stock_ajax_hcard').hide();
	$('body').append($stock);
	
	$('#user-cards .user-card').each(function(){
		var memberId = Viadeo.getMemberId($(this).find('img').attr('src'));
		if($.inArray(memberId, members) == -1)
			members.push(memberId);
		$(this).addClass('card_' + memberId);
		
		var $write_zone = $(this).find('.actions_list');
		$(this).find('.main .main').remove();
		$write_zone.html('<span class="info"><img src="'+ Viadeo.url_ajaxgif +'" alt=""/></span><br/>');
		
		if(!memberId){
			$write_zone.html('Pas de photo, pas de profil...');
		}
		else{
			$write_zone.append(
				'<a href="'+ Viadeo.urlProfil(memberId) +'" class="buttonLink add-to-contacts buttonLinkGreen">\
				<span>Voir son profil</span></a>'
			);
			$(this).find('img').parent('a').attr('href', Viadeo.urlProfil(memberId));
		}
	});
	
	$(window).load(function(){
		for(i in members){
			if(!members[i]) continue;
			
			$stock.load(Viadeo.urlProfil(members[i]) + ' #hcard', function(){
				var $region = $( $stock.html() );
				var $member = $('.card_' + Viadeo.getMemberId($region.find('.photowrapper img').attr('data-src')));
				$member.find('.actions_list .info').html(($region.find('.adr').html() || ''));
				$member.find('.position .main').html(
					'<span style="font-size: 17px;">'+ ($region.find('.fn').html() || '') +'</span><br/>' +
					($region.find('.title').html() || '')
				);
			});
		}
	});
});
