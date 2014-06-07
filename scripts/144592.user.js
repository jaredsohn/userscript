// ==UserScript==
// @name        kraut_show_quotes
// @namespace   kraut
// @description Zeigt zitierte Posts inline oder im Mouseover an
// @include     http://krautchan.net/*
// @version     1
// ==/UserScript==

var jQuery;
kraut_show_quotes = function(){
    if((typeof jQuery === "undefined") || (typeof document.addSetting === "undefined")){
        window.setTimeout("kraut_show_quotes()", 50);
        return;
    }
    document.addSetting("showQuotes", true, "bool", "Zitate als Mouseover anzeigen");
    document.addSetting("showQuotesDelay", 500, "int", "Verzögerung vor dem Zitat-Mouseover");
    document.addSetting("showQuotesFadeDelay", 0, "int", "Einblend-Dauer beim Zitat-Mouseover");
    document.addSetting("showQuotesInline", true, "bool", "Zitate bei Klick einfügen");
    if(document.getSetting("showQuotes", true)){
        /* insert display area */
        var r = 5;
        var s = 5;
        var delay = document.getSetting("showQuotesDelay", 500);
        var fadeDelay = document.getSetting("showQuotesFadeDelay", 0);
        if(fadeDelay == 0 && delay >0){
            //.delay works only, when fadeDelay is not 0. But 1ms is more or less 0, anyway.
            fadeDelay = 1;
        }
		if(jQuery('#kraut_post').length == 0) jQuery('body').append('<div class="postreply" id="kraut_post" style="border:1px solid #666;position:absolute;top:0;left:0;max-width:60%;-moz-box-shadow:0 0 '+s+' #000;-webkit-box-shadow:0 0 '+s+' #000;box-shadow:0 0 '+s+' #000;-moz-border-radius:'+r+';-webkit-border-radius:'+r+';border-radius:'+r+';display:none;"></div>');

        /* move the display area with the mouse cursor */
		jQuery('body').mousemove(function(e){
			jQuery('#kraut_post').css({"left":(e.pageX+10)+"px","top":(e.pageY-10-jQuery('#kraut_post').height())+"px"});

			if(e.pageY-10-jQuery('#kraut_post').height()-jQuery(document).scrollTop() < 0)
			{
				jQuery('#kraut_post').css({"top":(e.pageY+10)+"px"});
			}
			jQuery('body').css({"overflow-x":"hidden"});
			if(jQuery('#kraut_post').width()+e.pageX+10 > jQuery('body').width())
			{
				jQuery('#kraut_post').css({"left":(e.pageX-10-jQuery('#kraut_post').width())+"px"});
			}
		});
        /* mark Quotes as OP/Duckroll */
		jQuery('blockquote>p>a').each(function(){
			var id = jQuery(this).attr('href').split('#')[1];

			if(jQuery(this).parents('#thread_'+id).length>0)
				jQuery(this).append(' (OP)');

			else if(jQuery(this).attr('href').indexOf('resolve') > 0)
				jQuery(this).append(' (Duckroll?)');
		});
        /* bind the actions for the quotes */
        var actions;
		if(document.getSetting('showQuotesInline', true) == true){
			actions = "mouseover click dblclick";
        }else{
			actions = "mouseover";
        }
		jQuery('blockquote>p a:not(.kc_allowhtml), .replies a').live(actions,function(e){

			var fixed,stop = false;
            /* XXX: what is this for? */
			if((jQuery(this).attr('href').indexOf('/') != 0 && jQuery(this).attr('href').indexOf('#') != 0) || jQuery(this).is('.kc_newPass'))
				return;

			if(e.type == 'click')
			{
				fixed = jQuery(this).attr('href').split('#')[1];
				if(jQuery('#kraut_post').css('position') == 'absolute')
				{
					jQuery(this).addClass('opened').append('<span> (Klick hier, um die Zitate zu lösen)</span>');
					jQuery(this).css({'clear':'both'}).after(jQuery('#kraut_post').css({'max-width':'99999px','width':'100%','margin':'10px 0','position':'static','float':'left'}));
				}
				else if(jQuery(this).is('.opened') || jQuery(this).parents('[id$='+fixed+']').length > 0)
				{
					jQuery('.opened').removeClass('opened').find('span').remove();
					jQuery(this).css({'clear':'none'});
					jQuery('#kraut_post').css({'max-width':'60%','width':'auto','position':'absolute','float':'left','clear':'none','margin':'0'}).hide();
					var stop = true;
					var fixed = false;
				}
			} else if(e.type == 'dblclick')
			{
				jQuery('.opened').css({'clear':'none'}).removeClass('opened').find('span').remove();
				jQuery('#kraut_post').css({'max-width':'60%','width':'auto','position':'absolute','float':'left','clear':'none','margin':'0'}).hide();
				var stop = true;
				var fixed = false;
			}
			if(jQuery('#kraut_post').css('position') != 'absolute' && e.type == 'mouseover' || stop == true)
			{
				e.preventDefault();
				return;
			}
			jQuery('#kraut_post').empty();
			if(jQuery(this).attr('href')[0] == '#') {
				var id = jQuery(this).attr('href').split('#')[1];
				if(jQuery('#post-'+id).length > 0) {
					jQuery('#kraut_post').html(jQuery('#post-'+id).html()).show().stop(true).delay(delay).fadeTo(fadeDelay, .97);
				}else if(jQuery('#thread_'+id).length > 0){
                    /* when showing a foreign thread, then show the first four replies, too */
					var sec = jQuery(this).parents('.thread').find('.file_thread:nth(1)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(1)').html()+'</div>' : '';
					var tri = jQuery(this).parents('.thread').find('.file_thread:nth(2)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(2)').html()+'</div>' : '';
					var quad = jQuery(this).parents('.thread').find('.file_thread:nth(3)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(3)').html()+'</div>' : '';
					jQuery('#kraut_post').html('<div style="float:left;padding:10px;">'+'<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:first').html()+'</div>'+sec+tri+quad+'</div>'+jQuery(this).parents('.thread').find('.postbody').html()).show().stop(true).delay(delay).fadeTo(fadeDelay, .97);
				}else{
                    /* XXX: whats the difference to the other ajax call? */
					jQuery('#kraut_post').html('<h1 style="padding:10px;">Wird geladen!</h1>').show().stop(true).delay(delay).fadeTo(fadeDelay, .97);
					var url = 'http://krautchan.net/resolve/'+window.location.href.split('/')[3]+'/'+jQuery(this).attr('href').split('#')[1];
					var id = window.location.href.split('#')[1];
					if(typeof id == "undefined") id = url.split('/')[5];
					jQuery.ajax({
						url: url.split('#')[0],
						cache:false,
						success: function(data) {
							jQuery('#kraut_post').html(jQuery('#post-'+id+',#thread_'+id, data).html());
							if(jQuery('#kraut_post').html()=='') jQuery('#kraut_post').html('<h1>Beitrag nicht gefunden</h1>');
						}
					});
				}
			} else if(jQuery(this).attr('href')[0]=='/') {
                /* XXX: whats the difference to the other ajax call? */
				jQuery('#kraut_post').html('<h1 style="padding:10px;">Wird geladen!</h1>').show().stop(true).delay(delay).fadeTo(fadeDelay, .97);
				var url = 'http://krautchan.net'+jQuery(this).attr('href');
				var id = url.split('#')[1];
				if(typeof id == "undefined") id = url.split('/')[5];
				jQuery.ajax({
					url: url.split('#')[0],
					cache:false,
					success: function(data) {
						jQuery('#kraut_post').html(jQuery('#post-'+id+',#thread_'+id, data).html());
 						if(jQuery('#kraut_post').html()=='') jQuery('#kraut_post').html('<h1>Beitrag nicht gefunden</h1>');
					}
				});
			}
			/*if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
			if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
			if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
			if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
			if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
			if(localStorage.getItem('showReplies')=='true') kc_show_replies();
			if(localStorage.getItem('showSpoiler') == 'true') jQuery('#kraut_post .spoiler').css({"color":"#ccc"});*/
			e.preventDefault();
		}).live("mouseout",function(e){
			if(jQuery('#kraut_post').css('position') == 'absolute')
			{
				jQuery('#kraut_post').stop(true).fadeTo(fadeDelay, 0, function(){jQuery(this).hide();});
				jQuery('.kc_youtube>iframe').stop(true).fadeIn(fadeDelay);
			}
		});
    }
}
script=document.createElement("script");
script.textContent="kraut_show_quotes = "+kraut_show_quotes.toString()+";kraut_show_quotes();"
document.body.appendChild(script);

