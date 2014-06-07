// ==UserScript==
// @author         Rahszhul - Rahszhul@gmail.com
// @name           Google Reader Minimalistic by Rahszhul v1
// @namespace      http://userscripts.org/scripts/show/90767
// @description    Edit of DemianGod's minimalist script
// @include        http*://*.google.com/reader/*
// ==/UserScript==
//
// ==Original Script Info==
// Google Reader New Style Minimalistic By DemianGod v3.1
// DemianGod http://userscripts.org/scripts/show/30242
// ==/Original Script Info==
//
// ==Updates==
// Rahszhul v1, 2010 NOV 18 Branch
// Either FireFox, or GReader html update does not allow hidden status to perpetuate when switching RSS feed.
// Split apart functionality to attempt locating bug.
//
// Rahszhul v1.1, 2011 MAR 18 Branch
// Google Reader updated with Google's newest style updates, so this script is changed to reflect the new elements
// ==/Updates==

(function(){
	var ids=[
		"viewer-top-controls",
		"viewer-details",
		"chrome-view-links",
		"viewer-all-new-links",
		"gbar",
		"logo-container",
		"lhn-add-subscription-section",
		"lhn-selectors",
		"lhn-recommendations",
		"guser",
		"gb",
		"entry-likers",
		"like",
		"tag",
		"email"
	];

	var hiding = false;

	// This function was liberated from Shawn Olson @ http://www.shawnolson.net
	// http://www.shawnolson.net/a/503/altering-css-class-attributes-with-javascript.html
	function changeCSS(theClass, element, value){
		var cssRules;
		var added = false;

		for (var S = 0; S < document.styleSheets.length; S++){

			if (document.styleSheets[S]['rules']){
				cssRules = 'rules';
			}else if (document.styleSheets[S]['cssRules']){
				cssRules = 'cssRules';
			}else{
				// no rules found
				return null;
			}

			for (var R = 0; R < document.styleSheets[S][cssRules].length; R++){
				if (document.styleSheets[S][cssRules][R].selectorText == theClass){
					if(document.styleSheets[S][cssRules][R].style[element]){
						document.styleSheets[S][cssRules][R].style[element] = value;
						added = true;
						break;
					}
				}
			}

			if(!added){
				try{
					document.styleSheets[S].insertRule(theClass + ' { ' + element + ': ' + value + '; }', document.styleSheets[S][cssRules].length);
				}catch(err){
					try{
						document.styleSheets[S].addRule(theClass, element + ': ' + value + ';');
					}catch(err){}

				}
			}
		}
	}

	function set_fonts(){
		// Resize fonts and spacing
		changeCSS('#entries', 'font-size', '8pt');
		changeCSS('#sub-tree', 'font-size', '8pt');
		changeCSS('#chrome-title', 'font-size', '10pt');
		changeCSS('#chrome-header', 'padding', '2px !important');
		
		// layout search items across the top
		changeCSS('#search-input', 'width', '50%');
		changeCSS('.search-restrict', 'width', '20em');
		changeCSS('.search-restrict-button', 'width', '20em');
		changeCSS('.search-restrict-input', 'width', '20em');
		changeCSS('.search-submit', 'margin-right', '2em');
		changeCSS('.search-submit', 'margin-left', '2em');
	}

	function hide_content(){
		hiding = true;

		for (var i=0; i<ids.length; i++){
			changeCSS('#' + ids[i], 'display', 'none');
			changeCSS('.' + ids[i], 'display', 'none');
		}

		changeCSS('#main', 'margin-top', '-3.7em');
		changeCSS('#main', 'font-size', '8pt');
		changeCSS('#chrome', 'padding-top', '0');
		changeCSS('#search', 'margin-top', '0.1em');
		changeCSS('#search', 'top', '0');
		changeCSS('#search', 'left', '0.3em');
		changeCSS('#search', 'width', '100%');
	}

	function show_content(){
		hiding = false;

		for (var i=0; i<ids.length; i++){
			changeCSS('#' + ids[i], 'display', 'block');
			changeCSS('.' + ids[i], 'display', 'block');
		}

		changeCSS('#main', 'margin-top', '0.3em');
		changeCSS('#chrome', 'padding-top', '0.3em');
		changeCSS('#search', 'top', '2.5em');
		changeCSS('#search', 'left', '20em');
		changeCSS('#search', 'width', '70%');
	}

	function toggle_gr(){
		GM_addStyle(".gbh { display:none !important; }");  //Hide dividing line

		if(hiding){
			show_content();
		}else{
			hide_content();
		}
	}

	function getKey(event){
		element = event.target;
		elementName = element.nodeName.toLowerCase();

		if (elementName == "input"){
			typing = (element.type == "text" || element.type == "password");
		}else{
			typing = (elementName == "textarea");
		}

		if (typing) return true;

		if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.metaKey) {
			toggle_gr();

			try{
				event.preventDefault();
			}catch(e){}

			return false;
		}

		return true;
	}

	document.addEventListener("keydown", getKey, false);
	set_fonts();
	toggle_gr();
})();