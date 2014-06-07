// ==UserScript==
// @name        ChowajZakopane
// @namespace   http://www.wykop.pl/ludzie/kolakao/
// @description Chowa znaleziska zakopane z Wykopaliska
// @uthor		kolakao
// @version     1.0.0
// @grant       none
// @include		http://www.wykop.pl/wykopalisko*
// ==/UserScript==


$(document).ready(function()
{
    $('article.entry').each(function()
    {
    	var el = $(this);
        if (el.hasClass('newmarket')) return 1;

    	if (el.find('span.br3.action.bre3').length == 0)
    	{
    	   el.css('opacity', 0.3);
    	   el.find('a.rel.fleft.block.playleft').hide();
    	   el.find('div.content').hide();
    	}
    });
});