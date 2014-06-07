// ==UserScript==
// @name           draugas.lt helper
// @namespace      http//roxaz.ivory-tower.de/
// @description    Useful functions for www.draugas.lt website
// @include        http://pazintys.draugas.lt/*
// ==/UserScript==

function LoadScript(url)
{
	var GM_JQ = document.createElement('script');
	GM_JQ.src = url;
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

// Add jQuery
LoadScript('http://jquery.com/src/jquery-latest.js');
//LoadScript('http://umkk.eu/wp-content/uploads/2009/10/json.js');

// Check if jQuery's loaded
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined')
	{
		window.setTimeout(GM_wait,100);
	}
	else
	{
		$ = unsafeWindow.jQuery;
		Load();
	}
}
GM_wait();

// function addSaveSearch(canSave)
// {
// 	var searchAddonUI = "\
// 	<div style=\"height: 20px;\"/>\
// 	<div class=\"tm_virsus\">\
// 		<div class=\"tm_kampas_v\"/>\
// 		<div class=\"tm_kampas_v2\"/>\
// 	</div>\
// 	<div class=\"tm_text meniu_text\">\
// 		<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\
// 			<tbody>\
// 				<tr>\
// 					<td width=\"22\">\
// 						<img width=\"15\" height=\"12\" alt=\"Paieška\" src=\"http://img.draugas.lt/images/meniu_prisijunge.gif\"/>\
// 					</td>\
// 					<td>\
// 						<b>Paieška</b>\
// 					</td>\
// 				</tr>\
// 			</tbody>\
// 		</table>\
// 	</div>\
// 	<div class=\"m_virsus v_balta\">\
// 		<div class=\"m_kampas_v_tm\"/>\
// 		<div class=\"m_kampas_v2_tm\"/>\
// 	</div>\
// 	<div style=\"padding-top: 3px; padding-bottom: 10px; line-height: 15px;\" class=\"m_text info_text\">";
// 	
// 	if(canSave)
// 	{
// 		searchAddonUI += "<input style=\"width: 120px;\" id=\"save_search_name\" type=\"text\" value=\"Nauja paieška\" onclick=\"if(this.value == 'Nauja paieška') this.value='';\">\
// 		<a href=\"#\" id=\"link_save_search\">Saugoti</a><br/>\
// 		<div style=\"height: 12px;\"/>";
// 	}
// 
// 	/*for(i = 0; i < GM_getValue('draugas_lt_search_stored_count', 0); i++)
// 	{
// 		GM_setValue('stored_search_loc_' + i, null);
// 		GM_setValue('stored_search_name_' + i, null);
// 	}*/
// 	
// 	var stored = GM_getValue('draugas_lt_search_values', 0);
// 	
// 	if(stored)
// 	{
// 		stored = eval(stored);
// 		for(i = 0; i < stored.length; i++)
// 			searchAddonUI += "<a href=\"" + stored[i]['url'] + "\">" + stored[i]['name'] + "</a>&nbsp;<a onClick=\"del_search_" + i + "\" href=\"#\">[X]</a><br/>";
// 	}
// 	
// 	searchAddonUI += "</div>\
// 	<div class=\"v_apacia\">\
// 		<div class=\"m_kampas_a\"/>\
// 		<div class=\"m_kampas_a2\"/>\
// 	</div>";
// 	
// 	//unsafeWindow.console.dir();
// 	//unsafeWindow.console.dir($('b'));
// 	var stored = eval(GM_getValue('draugas_lt_search_values', '0'));
// 	if(!stored)
// 	{
// 		stored = new Array(2);
// 	}
// 	try {
// 		$('b').each(function(){
// 			if(this.innerHTML == 'Prisijungę')
// 			{
// 				$(this).parent().parent().parent().parent().parent().next().next().next().append(searchAddonUI);
// 				$('#link_save_search').click(function(){
// 					window.setTimeout(function() {
// 						try {
// 						var i = stored.length;
// 						stored[i] = new Array();
// 						stored[i]['name'] = unsafeWindow.jQuery('#save_search_name').val();
// 						stored[i]['url'] = window.location.href;
// 						alert(stored);
// 						GM_setValue('draugas_lt_search_values', JSON.stringify(stored));
// 						} catch(e) { alert(e); }
// 					}, 0);
// 					window.location.reload();
// 					return false;
// 				});
// 			}
// 		});
// 	} catch(e) { alert(e); }
// }

function addFotoMouseOver()
{
	$('img').each(function(){
		var small_url = $(this).attr('src');
		var replace_idx = small_url.indexOf('/mazos/');
		if(replace_idx != -1)
		{
			var big_url = small_url.substr(0, replace_idx) + '/dideles/' + small_url.substr(replace_idx + 7);
			
			var t = null;
			$(this).mouseout(function(){
				if(t)
				{
					clearTimeout(t);
				}
			});
			$(this).mouseover(function(e){
				t = setTimeout(function(){
					var img = $('<img border="0" alt="" />').
					attr('src', big_url);
					
					var targetBody = $('body', top.document);
					/*var top_add = 0;
					var left_add = 0;
					try {
						var iframe = $('iframe:eq(0)');
						if(iframe[0].tagName == 'IFRAME')
						{
							top_add = iframe.offset().top;
							left_add = iframe.offset().left;
						}
					} catch(e) {}*/
					
					var y = e.pageY - 187;
					var x = e.pageX - 125;
					
					if(x < 0 || y < 0)
					{
						x = $(window.top).width() * 0.8 - 125;
						y = 187;
					}
					
					targetBody.append(
						$('<div></div>').
						css('position', 'absolute').
						css('top', y).
						css('left', x).
						css('cursor', 'none').
						css('z-index', 999999999).
						mousemove(function(){
							$(this).remove();
						}).
						html(img)
					);
				}, 500);
			});
		}
	});
}

function Load()
{
	//addSaveSearch(window.location.href.indexOf('ngrupe.cfm') != -1);
	addFotoMouseOver();
}















