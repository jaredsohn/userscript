// ==UserScript==
// @name           BYOND Search Filter
// @namespace      http://www.byond.com/members/kuraudo
// @description    Allows you to filter search results on the byond.com website
// @include        http://www.byond.com/*
// ==/UserScript==

if(GM_getValue)	// GM version 0.3+
{
	var menu =
	{
		add: function()
		{
			var filter = prompt('What keyword(s) would you like to filter out of search results?', '');
			if(filter != null)
			{
				if(filter.match(/^([\w]+\s*)*$/g))
				{
					var append_text = GM_getValue('search_filters', '');
					var filters = filter.split(' ');
					for(var i=0; i<filters.length; ++i)
					{
						var exp = new RegExp('\\b' + filters[i] + '\\b');
						if(!exp.test(append_text))
						{
							append_text += ' -' + filters[i];
						}
					}
					
					GM_setValue('search_filters', append_text);
				} else
				{
					alert('Filters may only contain alphanumeric and underscore characters');
				}
			}
		},
		
		edit: function()
		{
			var filter = prompt('What would you like to set the filter to?', GM_getValue('search_filters', ''));
			if(filter != null)
			{
				if(filter.match(/^(\s+\-[\w]+\b)*$/g))
				{
					GM_setValue('search_filters', filter);
				} else
				{
					alert('Filters should be a space-delimited list of filters preceded by a hyphen and '
						+ 'starting with a space, e.g. " -naruto -bleach"');
				}
			}
		},
		
		remove: function()
		{
			var filter = prompt('What keyword(s) would you like to discontinue filtering?', '');
			if(filter != null)
			{
				if(filter.match(/^([\w]+\s*)*$/g))
				{
					var filters = filter.split(' ');
					var search_filters = GM_getValue('search_filters');
					for(var i=0; i<filters.length; ++i)
					{
						var exp = RegExp('\\s+\\-' + filters[i] + '\\b', 'gi');
						search_filters = search_filters.replace(exp, '');
					}
					GM_setValue('search_filters', search_filters);
				} else
				{
					alert('Filters may only contain alphanumeric and underscore characters');
				}
			}
		}
	};
	
	GM_registerMenuCommand('Add Search Filter(s)...', menu.add);
	GM_registerMenuCommand('Remove Search Filter(s)...', menu.remove);
	GM_registerMenuCommand('Edit Search Filters...', menu.edit);
	
	var form_handler =
	{
		onsubmit: function()
		{
			for(var i=0; i<this.length; ++i)
			{
				if(this.elements[i].name == 'text')
				{
					this.elements[i].value += GM_getValue('search_filters', '');
					break;
				}
			}
		}
	};
	
	var search_forms, form;
	search_forms = document.evaluate(
		"//form[@action]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	var filter = GM_getValue('search_filters', '');
	var filters = filter.split(' ');
	for (var i=0; i<search_forms.snapshotLength; ++i)
	{
		form = search_forms.snapshotItem(i);
		if(!form.action.match(/http:\/\/www.byond.com\/members/i))
		{
			continue;
		}
		form.addEventListener('submit', form_handler.onsubmit, false);
		
		// Remove currently filtered items from search box's text to make the filtering transparent:
		for(var j=0; j<form.length; ++j)
		{
			var elem = form.elements[j];
			if(elem.name == 'text')
			{
				for(var k=1; k<filters.length; ++k)
				{
					var exp = new RegExp("\\s+" + filters[k] + "\\b", 'gi');
					elem.value = elem.value.replace(exp, '');
				}
				break;
			}
		}
	}
}