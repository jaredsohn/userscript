// ==UserScript==
// @name		jonny
// @include		http://forums.somethingawful.com/forumdisplay.php*
// @include		http://forums.somethingawful.com/newreply.php*
// ==/UserScript==

(function(){
	var breadcrumbs = document.getElementsByClassName('breadcrumbs');
	if(document.location.href.indexOf('newreply.php') != -1 && document.location.hash.indexOf('snipe') != -1)
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
	$('textarea').val(':synpa:');
	$('input[name=\'submit\']').click();
}

function shaft()
{
	var $ = unsafeWindow.$;
	$('<iframe id="eqframe" name="eqframe" style="position:absolute;left:-1000px;top:-1000px;width:1px;height:1px" />').appendTo('body');
	$('tr.thread td.replies').filter(function(index){return parseInt($(this).find('a').html()) % 40 == 39;}).empty().append('<a><img src="http://rufoa.com/sa/emptyquote_done.gif" border="0"/></a>').each(function(index){$(this).find('a').attr('href','newreply.php?s=&action=newreply&threadid='+$(this).closest('tr.thread').attr('id').substr(6)+'#snipe').attr('target','eqframe').click(function(){$(this).find('img').attr('src','http://rufoa.com/sa/emptyquote_goodshot.png');});});
}