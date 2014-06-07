// ==UserScript==
// @name WUnderground Linkify
// @description Adds weather links to every zip code found on the page.
// @namespace http://www.reddit.com/r/SomebodyMakeThis/comments/bnpe2/a_greasemonkey_script_that_will_find_a_zip_code/
// @author leafy
// @source http://userscripts.org/scripts/show/73751
// ==/UserScript==


/**
	Made just for mlietzen
	http://www.reddit.com/r/SomebodyMakeThis/comments/bnpe2/a_greasemonkey_script_that_will_find_a_zip_code/
	
	P.S., it would be nicer if you had included a zip code on that submission page for testing.
*/
(function() {
	function flatten(ar) {
		var r = [];
		for(var x = 0;x<ar.length;x++) {
			for(var y = 0;y<ar[x].length;y++)
				r.push(ar[x][y]);
		}
		return r;
	}
	/** converts el to an array, from an array-like structure (NodeList, etc.) */
	function $A(el) {
		var r = [];
		if(!el.length)
			return r;
		for(var x = 0;x<el.length;x++) {
			if(el[x])
				r.push(el[x]);
		}
		return r;
	}
	// adapted from https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter
	  function array_filter(fun /*, thisp*/)  
	  {  
		var len = this.length >>> 0;  
		if (typeof fun != "function")  
		  throw new TypeError();  
	  
		var res = [];  
		var thisp = arguments[1];  
		for (var i = 0; i < len; i++)  
		{  
		  if (i in this)  
		  {  
			var val = this[i]; // in case fun mutates this  
			if (fun.call(thisp, val, i, this))  
			  res.push(val);  
		  }  
		}  
	  
		return res;  
	  }
	
	// from https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/map
	  function array_map(fun /*, thisp*/)
	  {
		var len = this.length >>> 0;
		if (typeof fun != "function")
		  throw new TypeError();

		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
		  if (i in this)
			res[i] = fun.call(thisp, this[i], i, this);
		}

		return res;
	  }
	/** iterate over all text blocks, and replace zip codes (5-digit numbers)
		with spans that, when hovered over, will display the WeatherUnderground icon. When
		this icon is clicked, it will open up, in a new window, the WeatherUnderground projections
		for that zip code. */
	window.gs_wunderground = function() {
		
		var get_zipcode = /(?:\D|^)(\d{5})(?:\D|$)/g;
		var blacklist = ['input', 'textarea']; // elements we shouldn't look inside
		
		/** takes an element, and wraps it in a span that, when hovered over, will display the WeatherUnderground 
			icon to the right of it. */
		function wrapify(el, start, zip) {				
			var container = document.createElement("span");
			
			var pre_wrapper = document.createElement("span");
			var wrapper = document.createElement("span");
			var post_wrapper = document.createElement("span");
			
			var popup = document.createElement("a");
			var popup_img = document.createElement("img");
			
			popup_img.src = "http://www.wunderground.com/favicon.ico";
			popup_img.style["border"] = "0px";
			popup_img.style["width"] = "16px";
			popup_img.style["height"] = "16px";
			popup_img.style["display"] = "inline";
			popup.appendChild(popup_img);
			popup.setAttribute("target", "_new");
			popup.href = "http://www.wunderground.com/cgi-bin/findweather/getForecast?query=" + zip + "wuSelect=WEATHER";
			wrapper.appendChild(popup);
			
			
			var before = el.textContent.substring(0, start + (zip.length));
			var after = el.textContent.substring(start + (zip.length));
			
			pre_wrapper.textContent = before;
			post_wrapper.textContent = after;
			
			container.appendChild(pre_wrapper);
			container.appendChild(wrapper);
			container.appendChild(post_wrapper);
			el.parentNode.replaceChild(container, el);
		}
		
		function is_text_node(el) {
			return (el.nodeName == "#text");
		}
		function get_child_text_nodes(el) {
			return array_filter.call($A(el.childNodes), is_text_node);
		}
		function is_allowable_element(el) {
			return (blacklist.indexOf(el.nodeName.toLowerCase()) == -1);
		}
		function has_child_nodes(el) {
			return (el.childNodes && el.childNodes.length > 0);
		}
		
		var els = $A(document.body.getElementsByTagName("*"));
		els = array_filter.call(els, has_child_nodes);
		els = array_filter.call(els, is_allowable_element);
		els = flatten(array_map.call(els, get_child_text_nodes));
		
		for(var x = 0;x<els.length;x++) {
			var el = els[x];
			
			var match = get_zipcode.exec(el.textContent);
			while(match != null) {
				
				wrapify(el, match.index+1, match[1]);
				
				match = get_zipcode.exec(el);
			}
		}
	};
	window.addEventListener("load", gs_wunderground, false);

})();