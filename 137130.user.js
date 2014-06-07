// ==UserScript==
// @name        Bibeltv Mediathek
// @namespace   bibtv mediathek
// @include     http://www.bibeltv.de/mediathek/*
// @exclude     http://www.bibeltv.de/mediathek/*/archiv.html
// @include     http://www.bibeltv.de/73/*
// @exclude     http://www.bibeltv.de/73/*/archiv.html
// @version     1.1b3
// ==/UserScript==
path = decodeURIComponent(unsafeWindow.flashvars.xmlPath);
//var div = document.getElementsByTagName("object")[0].parentNode; console.log(div);
//alert(div);
GM_xmlhttpRequest({
	method: "GET",
	url: path,
	onload: function(xmlhttp) {
		parser=new DOMParser();
		xmlhttp=parser.parseFromString(xmlhttp.responseText,"text/xml");

		videourl = xmlhttp.getElementsByTagName("video")[0].attributes.getNamedItem("url").nodeValue;
		//videourl = xmlhttp.responseText.replace(/\s/g ,"").split('url="')[1].split('"')[0];

		thumbnail = xmlhttp.getElementsByTagName("video")[0].attributes.getNamedItem("screenshot").nodeValue;
		//thumbnail = xmlhttp.responseText.replace(/\s/g ,"").split('screenshot="')[2].split('"')[0];

		document.getElementsByTagName("object")[0].parentNode.innerHTML =
'<object width="503" height="377" data="http://www.gdd.ro/gdd/flvplayer/gddflvplayer.swf" id="myplayer"><param name="wmode" value="transparent"> <param value="http://www.gdd.ro/gdd/flvplayer/gddflvplayer.swf" name="movie"><param value="always" name="allowscriptaccess"><param value="true" name="allowfullscreen"><param value="vdo='+ videourl +'&amp;sound=50&amp;splashscreen='+ thumbnail +'&amp;autoplay=false" name="flashvars"></object><a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />Dieser Player von <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.gdd.ro/free-flash-flv-player" property="cc:attributionName" rel="cc:attributionURL">http://www.gdd.ro/free-flash-flv-player</a> steht unter einer <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Namensnennung 3.0 Unported Lizenz</a>.';
		document.getElementsByTagName("object")[0].parentNode.style.height = "";
		document.getElementsByTagName("object")[0].parentNode.style.width = "";
	}
});