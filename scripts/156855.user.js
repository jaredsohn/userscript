// ==UserScript==
// @name       		GnotesFixer
// @namespace  	GnotesFixer
// @description	GnotesFixer
// @version		1.4
// @grant			none
// @include		htt*://*gnotes.me/*
// @match		http://gnotes.me*
// @match		https://gnotes.me*
// @match		http://www.gnotes.me*
// @match		https://www.gnotes.me*
// @icon			http://www.gnotes.me/favicon.ico
// @copyright		2013+, Mike Salmon
// @encoding		UTF-8
// ==/UserScript==

jQuery(function() {
    clock();
	setInterval(function(){clock()}, 2000);
    
	jQuery('<li>').css('display', 'none').html('<a href="#" id="sort-desc">Sort Thumbnails</a>').appendTo('ul#menu_ul');
    
	jQuery('li a#sort-desc').click(function(e) {        
		e.preventDefault();           
		jQuery('ul#menu_ul').find('li.active').find('a span.title').find('span.count').remove();
		jQuery('ul#menu_ul').find('li.active').find('a span.title').append('<span class="count"> (' + jQuery('ul.thumbnails li').length + ')</span>');
        
        var items = [];
        jQuery('ul.thumbnails li').each(function(){
            textparts = jQuery(this).find('div.thumbnail a.item_text').text().split("\n");
            firstline = textparts[0];
            id = jQuery(this).find('div.thumbnail').attr('id');
            items.push( { id:id, text:firstline } );
        });
        
        var ar = items.sort(function(a, b) {
            var nA = a.text.toLowerCase();
            var nB = b.text.toLowerCase();
            
            if(nA < nB)
                return -1;
            else if(nA > nB)
                return 1;
                return 0;
        });
        
        if ( jQuery(this).attr('id') == 'sort-desc' ) {
            ar = ar.reverse();
        }
        jQuery.each(ar, function(index, note) {
            id = note.id;
            thumb = jQuery('ul.thumbnails li div#' + id).parent().appendTo( jQuery('ul.thumbnails') );
        });
    });
    
});


function clock() {
    jQuery('li a#sort-desc').trigger('click');
    jQuery('textarea#note_ta_text').blur(function() {
      	set_style(); 
    });
    set_style();
}


function set_style() {
    
    html = jQuery('div#note_div_text').html();
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/\s+/g, ' ');
    
    jQuery('div#note_div_text').html(html).css('word-wrap', 'normal').css('word-break', 'normal');
    
    jQuery('textarea#note_ta_text').css('word-wrap', 'normal').css('word-break', 'normal').css('overflow', 'auto')
    jQuery('#edit_note, #note_editor, #note_ta_text, #note_div_text').css('width', '800px');   
    jQuery('#edit_note').css('border', '1px dashed #CCC').css('padding', '5px');
    jQuery('#edit_main, #edit_buttons').css('width', '835px');
    jQuery('span.date').css('padding-top', '10px');
}



