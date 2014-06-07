// ==UserScript==
// @name           WS: Collection NoAlpha
// @namespace      warstorm
// @description    Remove alpha from collection tab
// @include        http://www.warstorm.com/collections/view
// ==/UserScript==



function processCardLoad (coords) {
	rowIdx = coords.row;
	colIdx = coords.col;
	cardIdx = rowIdx * cardsPerRow + colIdx;
	if (cardData.length < cardIdx+1) {
		return;
	}
	if (typeof(cardData[cardIdx].loaded) == 'undefined') {
		cardData[cardIdx].loaded = true;
	} else {
		return;
	}
	card = cardData[cardIdx];
	var cloned = jQuery('#clone_card .card_wrapper').clone();
	var left = colIdx * cardWidth;
	var top = rowIdx * cardHeight;

	cloned.css('top', top).css('left', left).attr('id', card.id);
	jQuery('h3', cloned).text(card.n).addClass('tier'+card.r);
	jQuery('#card_table_wrapper').append(cloned);
	if (card.o > 0) {
		jQuery('.collection_control_middle p', cloned).text(card.o+' Card'+(card.o>1?'s':''));
		cloned.addClass('owned');
	} else {
		cloned.css('border','1px dotted yellow');
		cloned.css('opacity',0.7);
	}

	if (card.sd.length > 0) {
		jQuery('.tooltip', cloned).attr('title', card.sn+' - '+card.sd).tooltip(toolTipSettings);
	}
	if (card.fl == 0 && card.o >0) { //we will need to refactor this if we expand Flags
		jQuery('.auction_link', cloned).attr('href', jQuery('.auction_link', cloned).attr('href')+card.id);
	} else {
		jQuery('.auction_link', cloned).remove();
	}
	var mediumImg = new Image();
	jQuery(mediumImg).load(function() {
		jQuery(this).css('display', 'none');
		jQuery(cloned).children('h3.card_name').fadeOut('slow', function() {
			jQuery(cloned).removeClass('loading').append(mediumImg);
			jQuery(mediumImg).addClass('medium_sized_card');
		});
		jQuery(this).show();
	}).attr('src', 'http://static0.warstorm.com/img/cardstats/'+'card_md_set'+card.s+'_'+card.i+'.jpg');
}


setTimeout(function() { document.body.appendChild(document.createElement('script')).innerHTML=processCardLoad.toString();}, 500);