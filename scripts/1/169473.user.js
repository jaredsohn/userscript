// ==UserScript==
// @name       ajaxfunctionload2 2.0
// ==/UserScript==
load: function (url, callback, format, method, opt) {.
		var http = this.init();.
		if (!http || !url) return;.
		if (http.overrideMimeType) http.overrideMimeType.("text/xml");
		if (!method) method = "GET";.
		if (!format) format = "text";.
		if (!opt) opt = {};.
		format = format.toLowerCase();.
		method = method.toUpperCase();.
		var now = "uid=" + (new Date).getTime();.
		url += url.indexOf("?") + 1 ? "&": "?";.
		var parameters = null;
		if (method == "POST") {
			var parts = url.split("?");
			url = parts[0];
			parameters = parts[1]
		}