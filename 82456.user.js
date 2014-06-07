// ==UserScript==
// @name		emptyquote
// @include		http://forums.somethingawful.com/showthread.php*
// @include		http://forums.somethingawful.com/newreply.php*
// ==/UserScript==

(function(){
	var breadcrumbs = document.getElementsByClassName('breadcrumbs');
	if(document.location.href.indexOf('newreply.php') != -1 && document.location.hash.indexOf('auto') != -1)
		bell();
	else if(breadcrumbs && breadcrumbs[0].textContent.match('YOSPOS'))
		balls();
})();

function balls()
{
	if (typeof unsafeWindow.jQuery == 'undefined')
		window.setTimeout(balls, 100);
	else
		shaft();
}

function bell()
{
	if (typeof unsafeWindow.jQuery == 'undefined')
		window.setTimeout(bell, 100);
	else
		veins();
}

function veins()
{
	var $ = unsafeWindow.$;
	$('textarea').val($('textarea').val().replace(/\[timg\]/g,'[img]').replace(/\[\/timg\]/g,'[/img]'));
	$('input[name=\'submit\']').click();
}

function shaft()
{
	var $ = unsafeWindow.$;
	$('<iframe id="eqframe" name="eqframe" style="position:absolute;left:-1000px;top:-1000px;width:1px;height:1px" />').appendTo('body');
	$('table.post ul.postbuttons').each(function(){
		$(this).prepend('<li><a href="#" class="probutton">Pro</a></li>').find('a.probutton').attr('href',$(this).find('li a').filter(function(i){
			return $(this).attr('href').substr(0,12)=='newreply.php';
		}).attr('href')+'#auto').attr('target','eqframe').click(function(){
			$(this).text('Fuck yes son');
		});
	});
}