// ==UserScript==
// @name           SiteWatcher
// @namespace      Henk
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Remove google ads
$('iframe[name^=google_ads_frame]').remove();

// Compare current html with previous html
var new_html=$('body').html();
if(!new_html)
	new_html='';
var old_html=GM_getValue('old_html',new_html);
//alert('oud: '+old_html) ;
//alert('nieuw: '+new_html) ;
//$('body').prepend('<textarea>'+old_html+'</textarea>');
//$('body').prepend('<textarea>'+new_html+'</textarea>');
if(new_html!=old_html)
{
	window.moveTo(0,0);
	window.resizeTo(screen.width,screen.height);
	alert('Er is wat veranderd!');
}
GM_setValue('old_html',new_html);

// Auto refresh page
var timeout;
var refresh_interval=GM_getValue('refresh_interval',30); // seconds
function stopAutoRefresh(){
	clearTimeout(timeout);
}
function startAutoRefresh(seconds){
	if(!seconds)
		seconds=refresh_interval;
	stopAutoRefresh();
	timeout=setTimeout('location.reload();',seconds*1000);
}
startAutoRefresh(refresh_interval);

// Create interface
$('body').prepend('<div id="sitewatcher" action="" style="display:block;width:100%;background:#fff;text-align:center;padding:5px 0;border-bottom:1px dotted #99f;">Ververs de pagina om de <input type="text" name="refresh_interval" size="2" value="'+refresh_interval+'" /> seconden <input type="submit" value="Toepassen" /></div>');
$('#sitewatcher input:submit').click(function(){
	value=parseInt($('#sitewatcher input[name=refresh_interval]').val());
	if(!(value>=5))
		value=5;
	$('#sitewatcher input[name=refresh_interval]').val(value);
	startAutoRefresh(value);
	GM_setValue('refresh_interval',value);
	refresh_interval=value;
	return false;
});
$('#sitewatcher input:text').focus(function(){
	startAutoRefresh(Math.min(refresh_interval,20));
});





