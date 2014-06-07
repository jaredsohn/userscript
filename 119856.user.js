// ==UserScript==
// @name       tf2items tweaks + unusuals
// @namespace  http://scripts.mattie.net/
// @version    0.4
// @description  Enhances tf2items backpack view to look a lot nicer, especially for Unusuals traders.
// @include        http://www.tf2items.com/id/*
// @include        http://www.tf2items.com/profiles/*
// @copyright  2011+, Mattie Casper
// ==/UserScript==



(function() {
	
function main () {

		$(".quality11").css("background-image","url(http://omg.alex7kom.ru/cell_11s.png)");


		$('.ui-state-highlight p').parent().parent().insertBefore('#headLeft');

		$('#invalidcontents').insertBefore('#backpackcontents');
		$('#invalidcontents div').removeClass("nobg");
		
		$('#ad').remove();
		var unuscount = $(".quality5 .particleEffect:visible").length;
		
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

		// added unusuals count tab, counting quality5 / particle 
		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-unusuals"><span style="color:#B75EBF;">UNUSUALS x ' + unuscount + '</span></a></li>');
		// added buds tab, used tf2b pic
		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-earbuds"><span style="color:white;"><img src="http://tf2b.com/img/earbuds.png" width="25" height="25"> x ' + $('#tab-backpack img[alt="Earbuds"]').parent().length + '</span></a></li>');
		
		// colored keys tab
		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-keys"><span style="color:#E8E464;"><img src="http://mirror.pointysoftware.net/tf2items/items-crafting/key_sized.png" width="25" height="25"> x ' + $('#tab-backpack img[alt="Mann Co. Supply Crate Key"]').parent().length + '</span></a></li>');

		// colored metal tab silver
		$('#tabs ul').append('<li class="ui-state-default ui-corner-top"><a name="tab-metal"><span style="color:#AAAAAA;"><img src="http://mirror.pointysoftware.net/tf2items/items-crafting/pile_of_junk3_sized.png" width="25" height="25"> x ' + Math.floor((($('#tab-backpack img[alt="Refined Metal"]').parent().not('div[class*="qualityoutline"]').length * 9 +
$('#tab-backpack img[alt="Reclaimed Metal"]').parent().not('div[class*="qualityoutline"]').length * 3 +
$('#tab-backpack img[alt="Scrap Metal"]').parent().not('div[class*="qualityoutline"]').length)/9)*100)/100 + '</span></a></li>');

		// added all unusuals as a clone of the first backpack page before the backpack
		var clon = $('#backpackPage1').clone();
		clon.empty();
		clon.append($('<h2>All Unusual Hats</h2>'));
		clon.append($('.quality5 .particleEffect:visible').parent().clone(true, true));
		clon.insertBefore('#backpackPage1');
		$('<div style="clear:both;"></div>').insertAfter('#backpackPage1');		

		// remove unnecessary tabs
		$('li a[href="#tab-loadout"]').parent().remove();
		$('li a[href="#tab-checklist"]').parent().remove();
		$('li a[href="#tab-backpack"]').parent().remove();
		
		$('#tab-loadout').hide();
		$('#tab-checklist').hide();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();