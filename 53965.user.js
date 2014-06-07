// ==UserScript==
// @name           Includes : HttpRequest
// @namespace      http://gm.wesley.eti.br
// @description    Http Request Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.3.1.1
// @include        nowhere
// @require        http://userscripts.org/scripts/source/54389.user.js
// @contributor    sizzlemctwizzle (http://userscripts.org/guides/9)
// ==/UserScript==

HttpRequest = function()
{
	this.options = {
		'method':'GET',
		'headers':{'User-Agent' : window.navigator.userAgent}
	};

	this.open = function(method, url, onLoadCallback)
	{
		if (!/^https?:\/\//.test(url))
		{
			url = 'http://' + url;
		}
		//url += (/\?/.test(url) ? '&' : '?' ) + (new Date()).getTime();
		var xargs = array_slice(arguments, 3)||[];

		this.options.method = method.toUpperCase();
		this.options.url = url;
		this.options.onload = function(e)
		{
			if (/^Content-Type: (?:text|application)\/(?:x-)?json/m.test(e.responseHeaders))
			{
				e.responseJSON = (typeof JSON != 'undefined' && typeof JSON.parse == 'function' ? JSON.parse(e.responseText) : eval("(" + e.responseText + ")") );
			}
			else if (!e.responseXML)
			{
				if (/^Content-Type: text\/xml/m.test(e.responseHeaders))
				{
					e.responseXML = new DOMParser().parseFromString(e.responseText, "text/xml");
				}
				else if (/^Content-Type: text\/html/m.test(e.responseHeaders))
				{
					var doc = document.implementation.createDocument(null, null, null);

					// I have to find a workaround because this technique make the html*/head/body tags disappear.
					var html = document.createElement('html');
					html.innerHTML = e.responseText;
					doc.appendChild(html);

					e.responseXML = doc;
				}
			}

			if (typeof onLoadCallback == 'function')
			{

				xargs.unshift(e);
				onLoadCallback.apply(this, xargs);
//				onLoadCallback(e);
			}
		};
	};

	this.send = function(content)
	{
		if (content)
		{
			if (typeof content == 'object')
			{
				var x = "";
				for ( var key in content )
				{
					x += "&" + key + "=" + encodeURIComponent(content[key]);
				}
				content = x.substr(1);
			}
			if (this.options.method == "GET")
			{
				this.options.url += ( /\?/.test(this.options.url) ? "&" : "?" ) + x;
			}
			else
			{
				this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				this.options.headers['Content-Length'] = content.length;
			}
		}
		else
		{
			content = null;
		}
		this.options.data = content;

		// This is needed because Referer atom is filtered for some reason
		// This technique used to work. Doesn't work anymore
		// Mason (Firefox plugin) will do the job
		if (false)
		//if ('Referer' in this.options.headers)
		{
			var tmp = unsafeWindow.TempXMLHttpRequest;
			unsafeWindow.TempXMLHttpRequest = (function(opt)
			{
				var x = new XMLHttpRequest();
				x.onload = function()
				{
					opt.onload({	// simulates GM_xmlhttpRequest response object
						'status':x.status,
						'finalUrl':opt.url,
						'statusText':x.statusText,
						'readyState':x.readyState,
						'responseXML':x.responseXML,
						'responseText':x.responseText,
						'responseHeaders':x.getAllResponseHeaders()
					});
				};

				x.open(opt.method, opt.url, true);

				for ( var h in opt.headers )
				{
					x.setRequestHeader(h, opt.headers[h]);
				}

				x.send(opt.data);
			})(this.options);
			if (tmp === undefined)
			{
				delete unsafeWindow.TempXMLHttpRequest;
			}
			else
			{
				unsafeWindow.TempXMLHttpRequest = tmp;
			}
		}
		else
		{
			GM_xmlhttpRequest(this.options);
		}
	};
};