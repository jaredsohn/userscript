// ==UserScript==
// @name           Jappy GB Kopierer
// @namespace      copycat
// @description    Kopiert Gästebucheinträge bei Jappy
// @include        http://www.jappy.de/user/*/gb*
// @include        https://www.jappy.de/user/*/gb*
// @include        http://www.jappy.de/user/*/guestbook*
// @include        https://www.jappy.de/user/*/guestbook*
// @include        http://www.jappy.de/popup/*/guestbook*
// @include        https://www.jappy.de/popup/*/guestbook*
// @include        http://www.jappy.de/popup/*/gb*
// @include        https://www.jappy.de/popup/*/gb*
// @include        http://www.jappy.at/user/*/gb*
// @include        https://www.jappy.at/user/*/gb*
// @include        http://www.jappy.at/popup/*/guestbook*
// @include        https://www.jappy.at/popup/*/guestbook*
// @include        http://www.jappy.at/popup/*/gb*
// @include        https://www.jappy.at/popup/*/gb*
// @include        http://www.jappy.at/user/*/guestbook*
// @include        https://www.jappy.at/user/*/guestbook*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js

// @grant          none
// ==/UserScript==

/*// @require        http://sizzlemctwizzle.com/updater.php?id=120221&days=1&show=*/
$('head').append('<link rel="stylesheet" type="text/css" href="http://projekte.walter-it.de/cdn/jquery-ui/ui-darkness/jquery-ui-1.9.2.custom.min.css" />');
$('body').append('<div id="copycat_result"></div>');
if($('.item h1').length > 0)  // old guestbook
{
	$('.item h1').each(function(){
		if(!$(this).hasClass('comments'))
		{
			id = $(this).parent().parent().attr('id');
			$(this).append('<input id="copycat_button_'+id+'" class="inAc fs12" type="button" value="Kopieren" style="float:right"/><br style="clear:both"/>');
			button = document.getElementById('copycat_button_'+id);
			button.addEventListener("click", function(event) {
				id = event.target.id;
				id = id.replace(/copycat_button_/,'');
				id_num = id.replace(/gbEntry/,'');
				if($('#reportEntry'+id_num).length > 0) {bb = copycat_proceed($('#reportEntry'+id_num).contents());}
				else if($('#'+id+' .entry').length > 0) {bb = copycat_proceed($('#'+id+' .entry').contents());}
				else if($('#'+id+' .text').length > 0)  {bb = copycat_proceed($('#'+id+' .text').contents());}
				
				if(typeof bb !== 'undefined')
				{	
					if(!bb.match(/Jappy GBs kopieren/))
					{
						bb += '\n\n[center][size=10][url=http://userscripts.org/scripts/show/120221]Jappy GBs kopieren mit Mozilla Firefox[/url]\n[url=https://chrome.google.com/webstore/detail/coakgnfpoaogmffheljnebijiakpeapg?hl=de]Jappy GBs kopieren mit Google Chrome[/url][/size][/center]';
					}
					bb = $.trim(bb);
					
					$('#copycat_result').html('<textarea style="width:100%;height:98%;">'+bb+'</textarea>');
					$('#copycat_result').dialog({
						modal: true,
						resizeable: false,
						width: 600,
						height: 300,
						title: 'Einfach STRG+C dr&uuml;cken und als neuen GB einf&uuml;gen ;)',
						buttons: {
							Close: function() {
								$( this ).dialog( "close" );
							}
						}
					});
					$('#copycat_result textarea').select();
				}
			}, true);
		}
	});
}
else if($('div.content div.headline').length > 0) // new guestbook
{
	$('div.content div.headline').each(function(){
		if(!$(this).parent().parent().parent().parent().hasClass('comments'))
		{
			id = $(this).parent().parent().parent().attr('id');
			$(this).append('<input id="copycat_button_'+id+'" class="inAc fs12" type="button" value="Kopieren" style="float:right"/><br style="clear:both"/>');
			button = document.getElementById('copycat_button_'+id);
			button.addEventListener("click", function(event) {
				id = event.target.id;
				id = id.replace(/copycat_button_/,'');
				id_num = id.replace(/gbEntry/,'');
				if($('#reportEntry'+id_num).length > 0) {bb = copycat_proceed($('#reportEntry'+id_num).contents());}
				
				if(typeof bb !== 'undefined')
				{	
					if(!bb.match(/Jappy GBs kopieren/))
					{
						bb += '\n\n[center][size=10][url=http://userscripts.org/scripts/show/120221]Jappy GBs kopieren mit Mozilla Firefox[/url]\n[url=https://chrome.google.com/webstore/detail/coakgnfpoaogmffheljnebijiakpeapg?hl=de]Jappy GBs kopieren mit Google Chrome[/url][/size][/center]';
					}
					
					$('#copycat_result').html('<textarea style="width:100%;height:98%;">'+bb+'</textarea>');
					$('#copycat_result').dialog({
						modal: true,
						resizeable: false,
						width: 600,
						height: 300,
						title: 'Einfach STRG+C dr&uuml;cken und als neuen GB einf&uuml;gen ;)',
						buttons: {
							Close: function() {
								$( this ).dialog( "close" );
							}
						}
					});
					$('#copycat_result textarea').select();
				}
			}, true);
		}
	});	
}

window.copycat_proceed = function(element)
{
	bb = '';
	element.each(function(){
		node = $(this).context.nodeName;

		if(node == 'A')
		{
			if($(this).contents().length > 0)
			  bb += '[url='+$(this).attr('href')+']'+copycat_proceed($(this).contents())+'[/url]';
			else bb += '[url='+$(this).attr('href')+']'+$(this).html()+'[/url]';
		}
		else if(node == 'DIV')
		{
			if($(this).attr('align') == 'center')
			{
				if($(this).contents().length > 0)
				  bb += '[center]'+copycat_proceed($(this).contents())+'[/center]';
				else bb += '[center]'+$(this).html()+'[/center]';
			}
			else if($(this).attr('align') == 'right')
			{
				if($(this).contents().length > 0)
				  bb += '[right]'+copycat_proceed($(this).contents())+'[/right]';
				else bb += '[right]'+$(this).html()+'[/right]';
			}
		}
		else if(node == 'IMG')
		{
			bb += '[IMG]'+$(this).attr('src')+'[/IMG]';
		}
		else if(node == 'BR')
		{
			bb += '';
		}
		else if(node == 'SPAN')
		{
			style = $(this).attr('style');
			if(style.match(/font-weight/,style))
			{
				if($(this).contents().length > 0)
				  bb += '[b]'+copycat_proceed($(this).contents())+'[/b]';
				else bb += '[b]'+$(this).html()+'[/b]';
			}
			else if(style.match(/font-style/,style))
			{
				if($(this).contents().length > 0)
				  bb += '[i]'+copycat_proceed($(this).contents())+'[/i]';
				else bb += '[i]'+$(this).html()+'[/i]';
			}
			else if(style.match(/text-decoration/,style))
			{
				if($(this).contents().length > 0)
				  bb += '[u]'+copycat_proceed($(this).contents())+'[/u]';
				else bb += '[u]'+$(this).html()+'[/u]';
			}
			else if(style.match(/font-size/,style))
			{
				size = $(this).css('font-size');
				size = size.replace('px','');
				if($(this).contents().length > 0)
					bb += '[size='+size+']'+copycat_proceed($(this).contents())+'[/size]';
				else bb += '[size='+size+']'+$(this).html()+'[/size]';
			}
			else if(style.match(/color/,style))
			{
				blubb = $(this).contents();
				if($(this).contents().length > 0)
				  bb += '[color='+colorToHex($(this).css('color'))+']'+copycat_proceed($(this).contents())+'[/color]';
				else bb += '[color='+colorToHex($(this).css('color'))+']'+$(this).html()+'[/color]';
			}
			else if(style.match(/background/,style))
			{
				if($(this).contents().length > 0)
				  bb += '[bgcolor='+$(this).css('background')+']'+copycat_proceed($(this).contents())+'[/bgcolor]';
				else bb += '[bgcolor='+$(this).css('background')+']'+$(this).html()+'[/bgcolor]';
			}
		}
		else
		{
		    var tab = RegExp( "\\t", "g" )
			if($(this).nodeType != 1) bb += $(this).context.nodeValue.replace(tab,"");
		}
	});
	return bb;
};

window.colorToHex = function(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};