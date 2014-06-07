// ==UserScript==
// @name           Require : Orkut Manager Plus
// @namespace      http://gm.wesley.eti.br/includes
// @description    Its A Require For Orkut Manager Plus..Dont Install It.. :)
// @author         Swarnava/Heaven GOD
// @version        1.0.0.2
// @include        *orkut*
// @contributor    w35l3y (http://userscripts.org/users/wesley)
// ==/UserScript==

HttpRequest = function(){};
HttpRequest.open = function(params)
{
	return new (function(params)
	{
		if (!/^https?:\/\//.test(params.url))
		{
			params.url = "http://" + params.url;
		}

		this.options = {
			"method"	: params.method.toUpperCase()||"GET",
			"url"		: params.url,
			"headers"	: { "User-Agent" : window.navigator.userAgent },
			"onload"	: function(e)
			{
				var obj = params.parameters||{};

				obj.response = {
					"raw"	: e,
					"text"	: e.responseText,
					"xml"	: e.responseXML
				};

				if (/^Content-Type: (?:text|application)\/(?:x-)?json/m.test(e.responseHeaders))
				{
					obj.response.json = (typeof JSON != 'undefined' && typeof JSON.parse == 'function' ? JSON.parse(e.responseText) : eval("(" + e.responseText + ")") );
				}

				if (!obj.response.xml)
				{
					if (/^Content-Type: text\/xml/m.test(e.responseHeaders))
					{
						obj.response.xml = new DOMParser().parseFromString(e.responseText, "text/xml");
					}
					else if (/^Content-Type: text\/html/m.test(e.responseHeaders))
					{
						var doc = document.implementation.createDocument(null, null, null);

						// I have to find a workaround because this technique make the html*/head/body tags disappear.
						var html = document.createElement('html');
						html.innerHTML = e.responseText;
						doc.appendChild(html);

						obj.response.xml = doc;
					}
				}

				if (typeof params.onsuccess == "function")
				{
					params.onsuccess(obj);
				}
			}
		};

		this.send = function(content)
		{
			if (content)
			{
				if (typeof content == "object")
				{
					var x = "";
					for ( var key in content )
						x += "&" + key + "=" + encodeURIComponent(content[key]);

					content = x.substr(1);

					if (this.options.method == "POST")
					{
						this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
						this.options.headers['Content-Length'] = content.length;
						this.options.data = content;
					}
					else
					{
						this.options.url += ( /\?/.test(this.options.url) ? "&" : "?" ) + content;
					}
				}
				else
				{
					this.options.data = content;
				}
			}

			GM_xmlhttpRequest(this.options);

			return this;
		}
	})(params);
};