// ==UserScript==
// @name           tf2items tweaks
// @include        http://www.tf2items.com/id/*
// @include        http://www.tf2items.com/profiles/*
// ==/UserScript==

(function() {
	
function main () {

		$(".quality11").css("background-image","url(http://omg.alex7kom.ru/cell_11s.png)");


		$('.ui-state-highlight p').parent().parent().insertBefore('#headLeft');

		$('#invalidcontents').insertBefore('#backpackcontents');
		$('#invalidcontents div').removeClass("nobg");
		
		$('#ad').remove();
		
		
		var img = $('<img />')
		.attr('src',$('.avatarFull img').attr('src'))
		.css('background','url(http://steamcommunity.com/public/images/skin_1/avatarholder_default.jpg)')
		.css('padding','3px')
		.css('border-radius','3px')
		.css('width','48px');
		
		$('<a></a>')
		.attr('href',$('.avatarFull a').attr('href'))
		.css('margin-right','15px')
		.css('margin-top','10px')
		.css('display','inline-block')
		.append(img)
		.insertBefore('h1');
		
		$('h1')
		.css('display','inline-block');
		
		$('.ui-tabs .ui-widget-header')
		.css('margin-left','250px')
		.css('margin-top','-75px');
		
		$('.avatarHolder_default').remove();
		
		
		$('.thinRule').next().remove();
		$('.thinRule').next().remove();
		$('.thinRule').next().remove();
		$('.thinRule').next().remove();
		$('.thinRule').next().remove();

		$('.backpackPage').each(function() {
			$.blankBP = true;
			$(this).find('.invBox').each(function() {
				if($(this).text().length > 1){
					$.blankBP = false;
				}
			});
	
			if($.blankBP == true){
				$(this).html('<h2>Page ' + $(this).attr('id').replace('backpackPage','') + ' is empty.</h2>');
			} else {
				$(this).prepend('<h2>Page ' + $(this).attr('id').replace('backpackPage','') + '</h2>');
			}
		});

		$('img[alt="Mann Co. Supply Crate"]').each(
			function(){
				$(this).before('<div class="equippedBubble" style="min-width: 2em;">' + ($('#' + $(this).attr('id').replace('item','tooltip_item') + ' font').html()).replace('Crate Series ','') +'</div>');
			}
		);
		
		$('img.item').each(function(){
			if($('#' + $(this).attr('id').replace('item','tooltip_item') + ' span:last').html() == '( Not Tradable )'){
				$(this).parent().attr('class',$(this).parent().attr('class').replace('quality','qualityoutline'));
			}
			if($('#' + $(this).attr('id').replace('item','tooltip_item') + ' font:last').html() != null && ($('#' + $(this).attr('id').replace('item','tooltip_item') + ' font:last').html()).substr(0,7) == 'Crafted'){
				$(this).before('<div class="quantityBubble">C</div>');
			}
		});

		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-keys"><span><img src="http://mirror.pointysoftware.net/tf2items/items-crafting/key_sized.png" width="25" height="25"> x ' + $('#tab-backpack img[alt="Mann Co. Supply Crate Key"]').parent().length + '</span></a></li>');

		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-metal"><span><img src="http://mirror.pointysoftware.net/tf2items/items-crafting/pile_of_junk3_sized.png" width="25" height="25"> x ' + Math.floor((($('#tab-backpack img[alt="Refined Metal"]').parent().not('div[class*="qualityoutline"]').length * 9 +
$('#tab-backpack img[alt="Reclaimed Metal"]').parent().not('div[class*="qualityoutline"]').length * 3 +
$('#tab-backpack img[alt="Scrap Metal"]').parent().not('div[class*="qualityoutline"]').length)/9)*100)/100 + '</span></a></li>');

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();