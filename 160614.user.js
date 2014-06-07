// ==UserScript==
// @name           Search Plugins
// @namespace      http://www.example.com
// @description    
// @include        *
// @grant          none
// ==/UserScript==





if (window.top == window) {

	search_green='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nH2RzWsTQRjG353dnWw2ZtJs6jamMWl6aIWCWjyrCAoqHtSLCh6Ugh83T6J4qIViQRBq9dA/QAT/AL0URDzYgz2pFISyUHQbtJrNbvcj2c3MuMEP2AXzHGee3/s874x0aO0aJNVgu4+s1fEuLacqrmNrOXl54p1D/d+3Uso9EerMU6eOXZiqEyRAGFJj09xjfsBl6Qd10kAFFbkrX6reHtVRXgYv5ACoNr73Mr/17PuipbmUswRQsKVT2SskK8gATZvbHQgpyCLounZi4/DB4tYLWE1WinipMooFaAcci0IOgyZCXIyJkNHGez83oJSsxJGQxUJBAVmAMoGoBxEDyuM5gESx6/ppIDYKQYsMaREFSQAQIV5C4OBGPNg2MMmll7by4bL5+GF1bljlnR5gsR9FKbhe7+v66uZZDN0k8I21taBomUaxMabKEOcgDiyiK8+XPh3vGqGZTtBRgRG8cP/u0ZPn9k+OxSeOH75eeWWcz5iyxRhLACNoKN9RJt+In2/se0k+vrXX4/6AwLwYuczhjCd+WhPzJFAWRq7eqS82C9xjHSB/J9HEu/QBBeGSrz6qXZ+dm/VvDnusBf9XH7i3dWZ6+sD8g/mdmXITtge4/wBWy3rydKl9mnzJWP+6DgJqjWp7p/W+YnRpNNgd6xd1M8d4A9kRAgAAAABJRU5ErkJggg=='

	search_grey='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA3UlEQVR4nD3NvU7CUBQH8HNuz4VQW+sAkqDGkDDBgEHDoI/Ag/gcvoU7OzsxJi46uDiRQMLAwKRiDdog7T09trdJ/9v5nS+6hzyivyPHQ1JItkZcD1qV3dcm1BakshoNxSTv+2lqwVFXw09Gp/5x+WRBzW43rCCpenJkgT33QGIQ8v/EAmoGJkQy4W9xNFifbimbMAu7gkY/np3knXFcy0HU/vquf+GHz/G5sSs/N8tjfmDd0AYykKin33roZt8YMkBudyb9WKAIiWp2X4KyBlJy+JooKEOpniNhOQD/MOFPzvlHvngAAAAASUVORK5CYII='


	// FUNCTIONS
	
	function createDiv(id,txt)
	{
	var divTag = document.createElement("div");
	divTag.id = id;
	divTag.setAttribute("align","center");
	divTag.style.position = "absolute";
	divTag.style.top = '0px';
	divTag.style.right = '0px';
	divTag.style.zIndex="10000000";
	divTag.focus();
	divTag.className ="dynamicDiv";
	divTag.innerHTML = txt;
	document.body.appendChild(divTag);
	}
	
	q=''
	baseurl='http://postpop.drivehq.com/searchplugins/home.htm'
	country=window.location.hostname.replace(/^.*\./,"")
	
	// AMAZON
	if(document.URL.indexOf('amazon'!==-1)){
		if(document.URL.indexOf('amazon.co.uk')!==-1)	{q='?plugin=am_uk.xml&label=Amazon.co.uk&icon=am.png&country=uk'}
		if(document.URL.indexOf('amazon.de')!==-1)	{q='?plugin=am_de.xml&label=Amazon.de&icon=am.png&country=de'}
		if(document.URL.indexOf('amazon.com')!==-1)	{q='?plugin=am_com.xml&label=Amazon.com&icon=am.png&country=com'}
		if(document.URL.indexOf('amazon.ca')!==-1)	{q='?plugin=am_ca.xml&label=Amazon.ca&icon=am.png&country=ca'}
		if(document.URL.indexOf('amazon.fr')!==-1)	{q='?plugin=am_fr.xml&label=Amazon.fr&icon=am.png&country=fr'}
		if(document.URL.indexOf('amazon.it')!==-1)	{q='?plugin=am_it.xml&label=Amazon.it&icon=am.png&country=it'}
		if(document.URL.indexOf('amazon.es')!==-1)	{q='?plugin=am_com.xml&label=Amazon.es&icon=am.png&country=es'}
	}

	// GOOGLE
	if(document.URL.indexOf('google'!==-1)){
		if(document.URL.indexOf('google.co.uk')!==-1)	{q='?plugin=google_uk.xml&label=Google.co.uk&icon=google.png&country=uk'}
		if(document.URL.indexOf('google.de')!==-1)	{q='?plugin=google_de.xml&label=Google.de&icon=google.png&country=de'}
		if(document.URL.indexOf('google.com')!==-1)	{q='?plugin=google_com.xml&label=Google.com&icon=google.png&country=com'}
	}

	// WIKIPEDIA
	if(document.URL.indexOf('wikipedia.org'!==-1)){
		if(document.URL.indexOf('en.wikipedia.org')!==-1)	{q='?plugin=wiki_en.xml&label=Wikipedia (EN)&icon=wiki.png&country=uk'}
		if(document.URL.indexOf('de.wikipedia.org')!==-1)	{q='?plugin=wiki_de.xml&label=Wikipedia (DE)&icon=wiki.png&country=de'}
	}

	// OTHER
	if(document.URL.indexOf('google'!==-1)){
		if(document.URL.indexOf('bbc.co.uk')!==-1)	{q='?plugin=bbc_weather.xml&label=BBC Weather&icon=bbc.png&country=uk'}
		if(document.URL.indexOf('twitter')!==-1)	{q='?plugin=twitter.xml&label=Twitter&icon=twitter.png&country=com'}
	}

	if (q!=='') {createDiv('1','<A href="'+baseurl+q+'" target="_blank" title="+Add search plugin"><IMG src="'+search_green+'"></A>')}
	else
	{
	q='?plugin=&label=&icon=&country='+country
	createDiv('2','<A href="'+baseurl+q+'" target="_blank" title="+Add search plugin"><IMG src="'+search_grey+'"></A>')
	}

}
