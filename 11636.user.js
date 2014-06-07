// ==UserScript==
// @name          metafilter flag->metatalk UI fix
// @namespace     metafilter
// @description	  metafilter is going downhill fast. We need to stop snitching to the mods. This script helps you go straight to meta, and the world. Appears to be incompatible with the mefiquote script at the moment.
// @include       http://metafilter.com/*
// @include       https://metafilter.com/*
// @include       http://*.metafilter.com/*
// @include       https://*.metafilter.com/*
// ==/UserScript==

var conf = {
	'link_caption' : 'MeTa',
	'category_id'  : 3,
	'title'        : '$username is being a dick again',
	'description'  : '<a href="$link">$comment_text</a>',
        'extended'     : '',
        'tags'         : 'ettiquette'
};

(function() 
{
	unsafeWindow.submitComplaint = function(comment_id)
	{
		var E = function(type, attrs) 
		{ 
			var el = unsafeWindow.document.createElement(type);
			for (var key in attrs)
			{
				el.setAttribute(key, attrs[key]);
			}
			return el;
		};
		var normalizeComment = function(text)
		{
			return text.replace(/\n/g, '').replace(/<br\s*\/?>/g, "\n").replace(/(<.*?>|\s+$)/g, '');
		};

		var matches = document.body.innerHTML.match(RegExp('name="' + comment_id + '"(\n|.)*?"comments">((\n|.)*?)<span.*?"_self">(.*?)<\/a>', 'm'));
		if (matches)
		{
			var els = {
				'form' : E(
					'form', 
					{ 
						'method' : 'POST', 
						'action' : 'http://metatalk.metafilter.com/contribute/post_preview.cfm', 
						'style'  : 'display: none' 
					}
				),
				'category' : E(
					'input', 
					{ 
						'name'  : 'category_ID', 
						'value' : conf.category_id 
					}
				),
				'title'    : E(
					'input', 
					{ 
						'name'  : 'link_title',
						'value' : conf.title.replace(
							/\$username/g, 
							matches[4]
						)
					}
				),
				'desc'     : E(
					'input', 
					{ 
						'name'  : 'link_description',
						'value' : conf.description.replace(
							/\$link/g, 
							'http://' + unsafeWindow.location.hostname + unsafeWindow.location.pathname + '#' + comment_id
						).replace(
							/\$comment_text/g, 
							normalizeComment(matches[2])
						)
					}
				),
				'extended' : E(
					'input', 
					{ 
						'name'  : 'extended', 
						'value' : conf.extended
					}
				),
				'tags' : E(
					'input', 
					{ 
						'name'  : 'tags', 
						'value' : conf.tags
					}
				),
				'sub'      : E(
					'input', 
					{  
						'name' : 'post' 
					}
				)
			};
			
			els.form.appendChild(els.category);
			els.form.appendChild(els.title);
			els.form.appendChild(els.desc);
			els.form.appendChild(els.extended);
			els.form.appendChild(els.tags);
			els.form.appendChild(els.sub);
			unsafeWindow.document.body.appendChild(els.form);
			els.form.submit();
		}
	};
	
	document.body.innerHTML = document.body.innerHTML.replace(
		/<span\ id="flag\d(\d+)".*?<\/span>/g, 
		'[<span onclick="window.submitComplaint($1)" style="cursor: pointer; color: #cc0;">' + conf.link_caption + '</span>]');
})();

