// ==UserScript==
// @name           Browsershots (de)activator
// @description    Browsershots (de)activator adds buttons to deactivate/activate browser in your factory options page.
// @author         Maciej Szeptuch
// @namespace      http://neverous.info
// @version        0.2
// @include        http://browsershots.org/factories/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js
// http://code.google.com/p/browsershots/issues/detail?id=8
// ==/UserScript==

function bs_updateState(obj, state)
{
	obj = $(obj);
	var title = 'deactivate',
		image = 'tick.png',
		color = 'darkgreen';

	if(!state){title = 'activate';image = 'cross.png'; color = 'darkred';}
	obj.attr('title', title + ' browser')
	   .attr('href', '/browsers/' + obj.attr('id') + '/' + title)
	   .children().attr('src', '/static/images/' + image)
				  .attr('alt', title);
	obj.parent().parent().children().css('color', color);
	return;
}

function bs_changeState(event)
{
	event.preventDefault();
	var self = $(this);
	var state = GM_getValue(self.attr('id'), true);
	self.attr('title', 'processing...')
		.children().attr('src', 'data:image/gif;base64,R0lGODlhEAAQAPIAAP////FwIvrcyvSUW/FwIvamdve4kvjBoCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==')
				   .attr('alt', 'processing...');
	$.getJSON(self.attr('href'), function(response)
	{
		if(response['success'])
		{
			bs_updateState(self, !state);
			GM_setValue(self.attr('id'), !state);
			alert(response['data']);
		}

		else
			alert(response['error']);

		return;
	});

	return;
}

(function()
 {
	$('img[src$="edit.png"]').parent().each(function()
	{
		var self = $(this);
		var elem = $('<a href="#"><img/></a>').attr('id', self.attr('href').replace(/[^0-9]/g, '')).click(bs_changeState);

		self.after(elem);
		bs_updateState(elem, GM_getValue(elem.attr('id'), true));
		return;
	});

	return;
})();
