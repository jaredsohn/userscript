// ==UserScript==
// @name        sCHpam filter
// @namespace   sCHpam filter v0.2
// @description Filtert het woord #baasCH en soortgelijke constructies
// @authors     jaspern, gurben 
// @include     *
// @grant       none
// @version     0.2
// ==/UserScript==

(function() { 
	var bad = [], good = [], modifiers = [];


	populate({  
		// Deze lijst is hoofdletter gevoelig

		// Termen zijn weergegevan als door comma gescheiden woord-paren
		// "baasCH": "vervanging"
		// je kan een modifier plaatsen ("/") aan het einden van een te filteren woord. 
		// modifier "c", van "context", laat het woord staan in domeinnamen (Safe remove) 
		// modifier "r", van "redirect", vervangt het woord alleen als het voorkomt in een  domeinnaam (veroorzaakt redirects) 
		// modifier "n", van "new", geeft aan dat het onlangs toegevoegd is (geen werking) 

		//Lijst
		"#echt-niet-#baasCHe": "//",
		"#echt-wel-#baasCHe": "//",
		"#echt-niet-#baasCH": "//",
		"#echt-wel-#baasCH": "//",
		"#baasCH.": "//",

		"#baasCH": "//", 
		"#baasCH-en": "//",
		"#baasCH": "//",

	}, "g"); 

	populate({
		// Hoofdletter ongevoeligelijst 

		// Termen zijn opgegeven als door comma gescheiden waardes 

		//Lijst
		"#echt-niet-#baasCHe": "//",
		"#echt-wel-#baasCHe": "//",
		"#echt-niet-#baasCH": "//",
		"#echt-wel-#baasCH": "//",
		"#baasCH.": "//",

		"#baasCH": "//", 
		"#baasCH-en": "//",
		"#baasCH": "//",


		//Einde lijst

	}, "gi"); 



	// Einde configuratie, nu werkzame deel

	function populate(replacements, flags) { 
		var word, modPos, mod; 
		for(var key in replacements) { 
			if((modPos = key.indexOf("/")) > -1) { 
				mod = key.substring(modPos + 1); 
				word = key.substring(0, modPos); 
			} else { 
				mod = ""; 
				word = key; 
			} 
			modifiers.push(mod); 
			bad.push(new RegExp(word, flags)); 
			good.push(replacements[key]); 
		} 
	} 



	// Voert vervanging uit in een string
	function sanitizeString(s, noContext, notredirect) { 
		for (var j = 0; j < bad.length; j++) { 
			if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") !=-1 ) {  
				continue;
			} 
			s = s.replace(bad[j], good[j]);
		} 
		return s;  
	} 

	function sanitizeTitle() {
		// vervang in titel 
		if(document.title) 
		{
			var temp = sanitizeString(" "+document.title+" ", false , true);
			document.title = temp.substring(1,temp.length -1);
		}
	}

	function sanitizeBody() {
		// vervang in body tekst
		var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
		for (var i = 0; i < textnodes.snapshotLength; i++) { 
			node = textnodes.snapshotItem(i);
			node.data = sanitizeString(" "+node.data+" ", false, true);
			node.data = node.data.substring(1,node.data.length -1);
		}
	}

	var send = window.XMLHttpRequest.prototype.send,
	onReadyStateChange;

	function sendReplacement(data) {
		if(this.onreadystatechange) {
			this._onreadystatechange = this.onreadystatechange;
		}
		this.onreadystatechange = onReadyStateChangeReplacement;

		return send.apply(this, arguments);
	}

	function onReadyStateChangeReplacement() {
		//console.warn('HTTP request ready state changed : ' + this.readyState);
		if(this.readyState==4) {
			sanitizeTitle();
			sanitizeBody();
		}

		if(this._onreadystatechange) {
			return this._onreadystatechange.apply(this, arguments);
		}
	}

	window.XMLHttpRequest.prototype.send = sendReplacement;

	sanitizeTitle();
	sanitizeBody();

})();