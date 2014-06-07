// ==UserScript==
// @name           Watch Redtube
// @namespace      none
// @description    watch redtube
// @include        http://*.redtube.com/*
// @include        http://redtube.com/*
// ==/UserScript==

	var image_elements = document.getElementsByTagName('img');		
	for(var i=0;i<image_elements.length;i++){
		var image_element = image_elements[i];
		image_element.src = image_element.src.replace(/http:\/\/www./, 'http://');
		//alert(image_element.src);
	}

	var script_elements = document.getElementsByTagName('script');		
	for(var i=0;i<script_elements.length;i++){
		var script_element = script_elements[i];
		script_element.src = script_element.src.replace(/http:\/\/www./, 'http://');
		script_element.innerHTML.replace(/http:\/\/www./, 'http://');
		//alert(script_element.innerHTML);
	}

	var obj_elements = document.getElementsByTagName('noscript');		
	for(var i=0;i<obj_elements.length;i++){
		var obj_element = obj_elements[i];
		obj_element.innerHTML.replace(/http:\/\/www./, 'http://');
		//alert(obj_element.innerHTML);
	}

	var a_elements = document.getElementsByTagName('a');		
	for(var i=0;i<a_elements.length;i++){
		var a_element = a_elements[i];
		a_element.href = a_element.href.replace(/http:\/\/www./, 'http://');
		//alert(script_element.src);
	}

function replaceNode(targetNode) {
	var movieNumber = window.location.href.replace(/http:\/\/redtube.com\//, '');
	var div_elements = document.getElementsByTagName("div");

	for(var i=0;i< div_elements.length;i++){
		var div_element = div_elements[i];
		if (div_element.getAttribute('Id') == targetNode) {
			var s = '<object height="584" width="584"><param name="movie" ';
			s += 'value="http://embed.redtube.com/player/"><param name="FlashVars" ';
			s += 'value="id=' + movieNumber + '&style=redtube"><embed src="http://embed.redtube.com/player/?';
			s += 'id=' + movieNumber + '&style=redtube" pluginspage="http://www.adobe.com/shockwave/download/download.cgi';
			s += '?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" ';
			s += 'height="584" width="584"></object>';
			div_element.innerHTML = s;
		}
	}
	return null;
}

replaceNode("redtube_flv_player");
