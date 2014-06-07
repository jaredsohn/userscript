// ==UserScript==
// @name          Nofrag on Wefrag
// @namespace     wefrag
// @version       0.7.1
// @description   Charge les news de Nofrag sur Wefrag
// @include       http://forum.nofrag.com/forums/nofrag/topics/*
// ==/UserScript==

(function () {

	replaceNewsLink();
	
	function getNewsTD()
	{
		return document.getElementsByTagName("td")[0];
	}

	function insertNews(dom)
	{
		getNewsTD().innerHTML = "";
		getNewsTD().appendChild(dom);
		txt = getNewsTD().innerHTML;
		
		txt = txt.replace(/<br>/gi, "<br/>");
		getNewsTD().innerHTML = txt;
	}

	function getAuthor()
	{
		return document.getElementsByTagName("td")[0].childNodes[1].getElementsByTagName("a")[0].innerHTML;
	}

	function getNewsUrl()
	{
		var links = document.getElementsByTagName("a");
		var index = 0;
		
		for (var i=0;i<links.length;i++) 
		{
			if (links[i].innerHTML == 'Lire toute la news sur Nofrag.com...')
			{
				index = i;
			}
		}	
		return ""+links[index].href; 
	}
	
	function fixNews(txt) 
	{
		txt = txt.substring(txt.indexOf('<div class="news">'), txt.indexOf('<div class="navnews">'));
		txt = txt.replace(/allowfullscreen/gi, "");
		txt = txt.replace(/<a href=/gi, "<a href=\"");	
		txt = txt.replace(/<a href=""/gi, "<a href=\"");
		txt = txt.replace(/<a href="'/gi, "<a href=\'");
		txt = txt.replace(/<br\/>\n'>/gi, "'>");
		txt = txt.replace(/<DIv/gi, "<div");			
		txt += '</div>';
		return txt;
	}

	function fetchNews(news_url) 
	{
		var news;
		GM_xmlhttpRequest({
		  method: "GET",
		  url: news_url +"index.html",
		  headers: 
		  {
			"User-Agent": navigator.userAgent,
			"Accept": "text/xml"
		  },
		  onload: function(response) 
		  {
			if (!response.responseXML) {
				var txt = response.responseText;
				
				txt = fixNews(txt);
				
				var parser = new DOMParser();
				var dom = parser.parseFromString(txt, "text/xml");
				if (dom.documentElement.nodeName != "parsererror")
				{ 
					dom = formatNews(dom);
					dom = relinkImages(dom);
					dom = linkToNews(news_url, dom);
					var serializer = new XMLSerializer();
					var news_txt = XML(serializer.serializeToString(dom)).toXMLString();
					insertNews(dom);
				}
				else
				{	
					var serializer = new XMLSerializer();
					var news_txt = XML(serializer.serializeToString(dom)).toXMLString();
					
					changeUrl(news_url, 'Erreur de chargement, lire sur Nofrag.', 'Afficher la news complète');
				}
			}
		  },
		  onerror: function(response) 
		  {	
		  
		  }
		});

	}

	function linkToNews(url, dom)
	{
		var al = document.createElement("a");
		al.setAttribute("href",url);
		al.innerHTML = 'Lire sur Nofrag';		
		
		dom.appendChild(document.createElement("br"));
		dom.appendChild(document.createElement("br"));
		dom.appendChild(al);
		
		return dom;
	}

	function relinkImages(dom)
	{
		var links = dom.getElementsByTagName('a');
		
		for(var i=0;i<links.length;i++)
		{
			var hr = links[i].getAttribute('href');
			if (hr.match('^/image/*'))
			{
				dom.getElementsByTagName('a')[i].setAttribute('href', 'http://www.nofrag.com'+hr);
			}
		}
		
		var imgs = dom.getElementsByTagName('img');
		
		for(var i=0;i<imgs.length;i++)
		{
			var sr = imgs[i].getAttribute('src');
			if (sr.match('^/image/*'))
			{
				dom.getElementsByTagName('img')[i].setAttribute('src', 'http://www.nofrag.com'+sr);
			}
		}
		return dom;
	}

	function formatNews(dom)
	{
		var divs = dom.getElementsByTagName('div');
		var div;
		var h3 = dom.getElementsByTagName('h3')[0];
		
		var auth = h3.getElementsByTagName('a')[0].childNodes[0].nodeValue;
		
		var h4 = document.createElement("h4");
		h4.appendChild(document.createTextNode(h3.childNodes[0].nodeValue));
		h4.appendChild(document.createTextNode(auth));
		
		for(var i=0;i<divs.length;i++)
		{
			if (divs[i].getAttribute('class') == 'body clearfix')
			{
				div = divs[i];
				div.removeAttribute('class');
			}
		}
		
		dom = document.createElement("div");
		dom.appendChild(h4);
		dom.appendChild(div);
		
		return dom;
	}
	
	function removeChildNodes(ctrl)
	{
		while (ctrl.childNodes[0])
		{
			ctrl.removeChild(ctrl.childNodes[0]);
		}
	}
	function replaceNewsLink()
	{
		if (getAuthor() == 'nofrag') {					
			var news_url = getNewsUrl();
			
			var link = changeUrl("javascript:", "Afficher la news complète", "Lire toute la news sur Nofrag.com...");
			
			link.addEventListener('click', function() {
				fetchNews(news_url);
			}, 
			true);
		}
	}

	function changeUrl(url, url_name, old_name)
	{
		var links = document.getElementsByTagName("a");
		var link;
		
		for (var i=0;i<links.length;i++) 
		{
			if (links[i].innerHTML == old_name) 
			{
				link = links[i];
				break;
			}
		}
		
		link.innerHTML = url_name;
		link.href = url;
		return link;
	}
}());
