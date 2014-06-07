// ==UserScript==
// @name           Factolex Google App
// @namespace      http://sebmos.at/
// @description    Shows Factolex facts beside Google search results.
// @include        http://www.google.com/search*
// @include        http://www.google.co.uk/search*
// @include        http://www.google.at/search*
// @include        http://www.google.de/search*
// @include        http://www.google.ch/search*
// ==/UserScript==


window.addEventListener(
	"load",
	function(e)
	{
		var query = location.href;
		if (query.indexOf("?") == -1)
			return;
		query = query.substr(query.indexOf("?") + 1);
		query = query.split(/&/g);
		
		var lang = false, q = false;
		var found = false;
		for (var i = 0; i < query.length; i++)
		{
			if (query[i].substr(0, 2) == "q=")
			{
				q = query[i].substr(2);
				found = true;
			} else if (query[i].substr(0, 3) == "hl=") {
				lang = query[i].substr(3);
				lang = lang.substr(0, 2);
			}
		}
		if (!found)
			return;
			
		if (!lang) {
			var host = location.hostname;
			host = host.substr(host.lastIndexOf(".") + 1);
			if (host == "uk" || host == "com") {
				lang = "en";
			} else if (host == "at" || host == "de") {
				lang = "de";
			}
		}
		
		// remove special search operators (site:, link: etc.)
		q = decodeURI(q);
		q = q.replace(/%3A/gi, ':');
		q = q.split(/[\+ ]/gi);
		var q_new = '';
		for (var i = 0; i < q.length; i++)
		{
			var s = q[i].toLowerCase();
			if (s == '')
				continue;
			
			if (s.substr(0, 5) == 'site:' ||
				s.substr(0, 5) == 'link:' ||
				s.substr(0, 6) == 'cache:' ||
				s.substr(0, 5) == 'info:' ||
				s.substr(0, 8) == 'related:')
				continue;
			else
				q_new += q[i] + ' ';
		}
		q = q_new;
		if (q == '')
			return;
		
		q = encodeURI(q);
		
		var url = "http://api.factolex.com/v1/search?query=" + q + "&type=term&format=json";
		if (lang) {
			url += "&lang=" + lang;
		}
		GM_xmlhttpRequest({
			method:	"GET",
			url: url,
			headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
			onload: function(r) {
				var result = eval("(" + r.responseText + ")");
				
				if (result.result.length == 0)
					return;
				
				var html = "<h3><a href=\"http://www.factolex.com/search.php?q=" + q + "&noredir=1\"><em>Factolex Facts</em></a></h3>" + "<ul>";
				var term, r = result["result"];
				
				var total = 0;
				for (var j = 0; j < r.length; j++)
				{
					term = r[j]
					for (var i = 0; i < term.facts.length; i++)
					{
						total++;
						if (total > 10)
							break;
						
						html += "<li style=\"font-size:10pt;\"><a href=\"" + term.link + "\">" + term.title + "</a>: "+ term.facts[i].title + "</li>";
					}
					
					if (total > 10)
						break;
				}
				html += "</ul>";
				
				var div = document.createElement("div");
				var a = document.createAttribute('style');
				a.nodeValue = 'margin-top:0.5em;';
				div.setAttributeNode(a);
				div.innerHTML = html;
				document.getElementById("res").insertBefore(
					div,
					document.getElementById("res").childNodes[1]
				);
			}
		});
	},
	false
);