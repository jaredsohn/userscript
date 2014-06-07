// ==UserScript==
// @name		Imageboard Text to Link Converter
// @namespace		http://userscripts.org/users/146111
// @description		Converts specific text strings to links to the corresponding pages with preview tooltips.
// @include		http://2cat.or.tp/~kirur/touhou/*
// @include		http://2cat.twbbs.org/~kirur/touhou/*
// @require		http://userscripts.org/scripts/source/74204.user.js
// @require		http://jquery.bassistance.de/tooltip/jquery.tooltip.js
// @version		0.1.6
// ==/UserScript==
// Add string formatting support for javascript (format: $1, $2, ... denoting
// formatting parameters)
String.prototype.format = function(arg0)
{
	if (arg0 instanceof Array) 
	{
		return String.prototype.format.apply(this, arg0);
	} else 
	{
		var _arguments = arguments;
		return this.replace(/\$(\d{1,2})/g, function(match, index)
		{
			var ret = _arguments[index];
			return ret ? ret : match;
		});
	}
};
// Add entitization support with given meta value object for javascript (format:
// %ENTITY% denoting a meta attribute named ENTITY)
String.prototype.entitize = function(arg0)
{
	return this.replace(/%([\w_$][\d\w_$]*)%/g, function(match, attr)
	{
		var ret = arg0[attr];
		return ret ? ret : match;
	});
};
// Throbber image data stream in Base64
var throbber = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///zMzM87OzmdnZzMzM4GBgZqamqenpyH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
// Add more features for jQuery
var enhance = function($)
{
	var placeholder = $('<div>').addClass('$');
	$.fn.expose = function(selector)
	{
		var selected = (selector ? this.filter(selector) : this);
		return selected.replaceWith(function(index, html)
		{
			return html;
		});
	};
	$.fn.outer = function(target)
	{
		return target ? this.replaceWith(target) : $('<div>').append(this.eq(0).clone()).remove().html();
	};
	$.fn.beforeText = function(content, regexp)
	{
		this.each(function(index, element)
		{
			$(this).html($(this).html().replace(regexp, function(match)
			{
				return placeholder.outer() + match;
			}));
		});
		this.find('div.\\$').replaceWith(content);
		return this;
	};
	$.fn.afterText = function(content, regexp)
	{
		this.each(function(index, element)
		{
			$(this).html($(this).html().replace(regexp, function(match)
			{
				return match + placeholder.outer();
			}));
		});
		this.find('div.\\$').replaceWith(content);
		return this;
	};
	$.fn.at = function(content, index)
	{
		this.each(function(index, element)
		{
			$(this).html($(this).html().slice(0, index) +
			placeholder.outer() +
			$(this).html().slice(index));
			$(this).find('div.\\$').replaceWith(content);
		});
		return this;
	};
	$.fn.between = function(content, start, end)
	{
		this.each(function(index, element)
		{
			$(this).html($(this).html().slice(0, start) +
			placeholder.outer() +
			$(this).html().slice(end));
			$(this).find('div.\\$').replaceWith(content);
		});
		return this;
	};
	$.fn.insertBeforeText = function(target, regexp)
	{
		$(target).beforeText(this, regexp);
		return this;
	};
	$.fn.insertAfterText = function(target, regexp)
	{
		$(target).afterText(this, regexp);
		return this;
	};
	$.fn.insertAt = function(target, index)
	{
		$(target).at(this, index);
		return this;
	};
	$.fn.replaceBetween = function(target, start, end)
	{
		$(target).between(this, start, end);
		return this;
	};
};
// AJAX request processor (process AJAX requests in a queue)
var ajax = (function()
{
	var ajaxQueue = [], queueing = false;
	var processAjaxQueue = function()
	{
		GM_xmlhttpRequest(ajaxQueue.shift());
		queueing = ajaxQueue.length > 0;
		if (queueing) 
		{
			setTimeout(processAjaxQueue, GM_getValue('linkifier_request_interval', 5000));
		}
	};
	var _request = function(details)
	{
		ajaxQueue.push(details);
		if (!queueing) 
		{
			queueing = true;
			setTimeout(processAjaxQueue, 0);
		}
	};
	return {
		get: function(url, callback)
		{
			_request({
				method: "GET",
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: callback
			});
		}
	};
})();
// Anchor tooltips handler and presets manager
var tooltipper = (function()
{
	var _tooltip = function(handler)
	{
		this.track = true;
		this.delay = 0;
		this.showURL = false;
		this.fade = 250;
		this.bodyHandler = handler;
	};
	return {
		pixiv_loading: new _tooltip(function()
		{
			return $('<img>').attr('src', throbber);
		}),
		pixiv_member: function(jquery, response)
		{
			var div = $(response.responseText).find('div#profile div:first').addClass('pixiv_member');
			var img = div.find('img');
			img.attr('src', img.attr('src').replace(/(\/.+)\.(gif|jpg|jpeg|png)/i, '$1_s.$2'));
			img.load(function()
			{
				jquery.tooltip(new _tooltip(function()
				{
					return div;
				}));
			});
		},
		pixiv_member_illust: function(jquery, response)
		{
			var img = $(response.responseText).find('div#content2 > div > a > img');
			img.attr('src', img.attr('src').replace(/(\/.+)_m\.(gif|jpg|jpeg|png)/i, '$1_s.$2'));
			img.load(function()
			{
				jquery.tooltip(new _tooltip(function()
				{
					return img;
				}));
			});
		}
	};
})();
// Linkification handler and presets manager
var linkifier = (function()
{
	var _sites = 
	{
		pixiv: 
		{
			id: '$1'
		}
	};
	var _presets = 
	{
		pixiv_member_illust: 
		{
			meta: _sites.pixiv,
			pattern: /illust_id=(\d+)/gi,
			icon: 'http://www.pixiv.net/favicon.ico',
			href: 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=%id%',
			text: 'illust_id=%id%',
			tooltip: 
			{
				loading: tooltipper.pixiv_loading,
				loaded: tooltipper.pixiv_member_illust
			},
			error: 'span.error'
		},
		pixiv_member: 
		{
			meta: _sites.pixiv,
			pattern: /id=(\d+)/gi,
			icon: 'http://www.pixiv.net/favicon.ico',
			href: 'http://www.pixiv.net/member.php?id=%id%',
			text: 'id=%id%',
			tooltip: 
			{
				loading: tooltipper.pixiv_loading,
				loaded: tooltipper.pixiv_member
			},
			error: 'span.error',
			next: 'pixiv_member_illust'
		}
	};
	for (var attr in _presets) 
	{
		_presets[attr]['class'] = attr;
		_presets[attr].next = _presets[_presets[attr].next];
	}
	var buffer = [];
	var _reset = function(jquery)
	{
		jquery.find('.lnk-shortcut').remove();
		jquery.find('.lnk-original').expose();
	};
	var _render = function(jquery, preset)
	{
		jquery.empty();
		jquery.append($('<img/>').attr('src', preset.icon));
		jquery.append($('<a></a>').attr(
		{
			'class': preset['class'],
			target: '_blank',
			href: preset.href
		}).html(preset.text));
		jquery.html(jquery.html().entitize(jquery.data('linkifier')));
		jquery.addClass('lnk-shortcut');
	};
	var _scan = function(jquery, preset)
	{
		var data = function(submatches)
		{
			var ret = {};
			for (var attr in preset.meta) 
			{
				ret[attr] = preset.meta[attr].format(submatches);
			}
			return ret;
		};
		jquery.html(jquery.html().replace(preset.pattern, function(match)
		{
			var submatches = Array.prototype.slice.call(arguments, 0, -2);
			var replacement = 
			{
				preset: preset,
				original: $('<span>').addClass('lnk-original').html(match).hide(),
				inplace: $('<span>').data('linkifier', data(submatches))
			};
			buffer.push(replacement);
			return $('<div>').addClass('%').html(buffer.length - 1).outer();
		}));
	};
	var _commit = function(jquery)
	{
		jquery.find('div.\\%').each(function()
		{
			var i = $(this).html();
			_render(buffer[i].inplace, buffer[i].preset);
			$(this).replaceWith(buffer[i].inplace);
			buffer[i].inplace.after(buffer[i].original);
		});
		buffer = [];
	};
	var _validate = function(jquery)
	{
		var anchor = jquery.find('a');
		var preset = _presets[anchor.attr('class')];
		var _tooltip = function(jquery, tooltip, arg)
		{
			typeof tooltip == 'function' ? tooltip(jquery, arg) : jquery.tooltip(tooltip);
		};
		var request = function()
		{
			ajax.get(anchor.attr('href'), function(response)
			{
				if (GM_getValue('linkifier_assume_next', true) && $(response.responseText).find(preset.error).length) 
				{
					if (preset.next) 
					{
						_render(jquery, preset.next);
						_validate(jquery);
					}
				} else 
				{
					_tooltip(anchor, preset.tooltip.loaded, response);
				}
			});
		};
		var entrance = function()
		{
			anchor.unbind('mouseover', entrance);
			request();
		}
		_tooltip(anchor, preset.tooltip.loading);
		GM_getValue('linkifier_request_on_mouseover', true) ? anchor.mouseover(entrance) : request();
	};
	return {
		add: function(className, preset)
		{
			preset['class'] = className;
			_presets[className] = preset;
			preset.next = _presets[preset.next];
		},
		get: function(className)
		{
			return _presets[className];
		},
		linkify: function(jquery, preset)
		{
			_reset(jquery);
			_scan(jquery, preset);
			_commit(jquery);
		},
		linkifyAll: function(jquery)
		{
			_reset(jquery);
			for (var attr in _presets) 
			{
				_scan(jquery, _presets[attr]);
			}
			_commit(jquery);
		},
		validate: _validate
	};
})();
// Main function
var main = function()
{
	var go = function(jquery)
	{
		linkifier.linkifyAll(jquery);
		if (GM_getValue('linkifier_tooltip', true)) 
		{
			jquery.find('.lnk-shortcut').each(function()
			{
				linkifier.validate($(this));
			});
		}
	};
	$('blockquote, div.blockquote:not(:has(blockquote))').each(function()
	{
		go($(this));
	});
};
// Initialization code
var init = function()
{
	// Add custom CSS stylesheets
	GM_addStyle('#tooltip\n' + '{\n' + 'font-family: sans-serif;\n' +
	'font-size: 12px;\n' +
	'position: absolute;\n' +
	'z-index: 3000;\n' +
	'border: 1px solid #ea8;\n' +
	'color: #800000;\n' +
	'background-color: #ffe;\n' +
	'padding: 5px;\n' +
	'opacity: 0.8;\n' +
	'}\n' +
	'#tooltip h3, #tooltip div\n' +
	'{\n' +
	'margin: 0;\n' +
	'}\n' +
	'#tooltip .pixiv_member\n' +
	'{\n' +
	'font-family: "ＭＳ Ｐゴシック",Osaka,"ヒラギノ角ゴ Pro W3";\n' +
	'text-align: center;\n' +
	'border-color: #2D5986;\n' +
	'}\n' +
	'#tooltip .pixiv_member img\n' +
	'{\n' +
	'border-width: 0;\n' +
	'border-style: none;\n' +
	'}');
	GM_addStyle('span.lnk-shortcut\n' + '{\n' + 'font-size: 12pt;\n' + '}');
	// Add features to jQuery
	enhance(jQuery);
	// Allow Firebug debugging
	//unsafeWindow.jQuery = jQuery;
	// Set global variable to jQuery (using unsafe context) and begin
	$ = function()
	{
		if (arguments.length == 1 && (typeof arguments[0] == 'string' || arguments[0] instanceof String)) 
		{
			return jQuery(arguments[0], unsafeWindow.document);
		}
		return jQuery(arguments);
	};
	setTimeout(main, 0);
};
// jQuery startup shorthand
jQuery(function()
{
	init();
});
