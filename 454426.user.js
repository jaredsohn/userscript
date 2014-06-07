// ==UserScript==
// @name        usability
// @namespace   http://www.toutcequibouge.net/
// @version     1
// @grant       GM_xmlhttpRequest
// @grant		GM_addStyle
// ==/UserScript==
/*jshint smarttabs:true */


function getId(id) {
	return document.getElementById(id);
}
function getTag(tagName) {
	return document.getElementsByTagName(tagName);
}

var wrapper = function() {

	// function provided by GreaseMonky, creating a style element.
	// Some general CSS rules, valid anywhere.
	GM_addStyle("body {-moz-user-select: auto !important; cursor: auto !important; -webkit-font-smoothing:antialiased; -moz-text-size-adjust:auto !important; -webkit-text-size-adjust:auto !important;}");

	// Kills popups of newsletters
	var popups = ["#jq-popup", "#overLayContener", "#jquery-lightbox-overlay", "#fancybox-wrap", "#fancybox-overlay", "#TB_window", "#TB_overlay", "#popin-newsletter", "#popin-newsletter-block", "#popForm", "#bModal", "#dialog", "#sb-wrapper", "#sb-overlay", "#sbox-window", "#billboard", "#getNotifiedModal", "#fadeBackGround", "#DOMWindowOverlay", "#DOMWindow", "#rm_overlay", "#rm_modal", "#disclaimer", "#lightbox_nlhebdo_inside", "#lightbox_nlhebdo", "#facebox", "#facebox_overlay", "#interContainer", "#interVeil", "#interstiPopy", "#voilou", "#sppro_cboxWrapper", "#sppro_cboxOverlay", "#newsletter-popup", "#onboard_cover"],
	popupsRule = popups.join() + "{display:none !important;}";
	GM_addStyle(popupsRule);

	var parsingRawCSS = function(i) {				//Creating a style element to manipulate the css as cssRules.
		var urlSheet = document.querySelectorAll("link[rel='stylesheet']");
		var sheets = document.styleSheets;

		if (urlSheet.length > 0) {
			for (i=0; i < urlSheet.length; i++) {

				if ((urlSheet[i].media === "screen") || (urlSheet[i].media === "all") || (urlSheet[i].media === '')) {
					GM_xmlhttpRequest({            // cross-domain request, thanks to GreaseMonkey.
						method: "GET",
						url: urlSheet[i].href,
						onreadystatechange: function(response) {
							if (response.readyState === 4) {
								//alert("fire");
								var elStyle = document.createElement("style");
								elStyle.type = "text/css";
								document.head.appendChild(elStyle);
								elStyle.title = "cssClone"; 
								elStyle.innerHTML += response.responseText;
								for (var n = 0; n < sheets.length; n++) {
									if (sheets[n].title === "cssClone") {
										traversingCSSObject(sheets, n);
										document.head.removeChild(elStyle);
										console.log("removed style node");
										//successTailleTexte = true;
										return;
									}
									/*if (successTailleTexte){
										return;
									}*/
								}

							}
						}
					});
				}
			}
		}
	return;
	};

	var stylingAccordingToUnit = function(specifiedSize, unit) {
		switch (unit) {
			case  "em":
			var value = parseFloat(specifiedSize, 10) + 0.2;
			finalValue = "body {font-size:" + value.toString() +"em !important;}";
			GM_addStyle(finalValue);
			break;
			case  "%":
			var value = parseFloat(specifiedSize, 10) + 12;
			finalValue = "body {font-size:" + value.toString() +"% !important;}";
			GM_addStyle(finalValue);
			break;
			case  "px":
			var value = parseFloat(specifiedSize, 10) + 3;
			finalValue = "body {font-size:" + value.toString() +"px; !important}";
			GM_addStyle(finalValue);
			break;
			case  "pt":
			var value = parseFloat(specifiedSize, 10) + 1.5;
			finalValue = "body {font-size:" + value.toString() +"pt; !important}";
			GM_addStyle(finalValue);
			break;
			}
		return;

	};

	var traversingCSSObject = function(sheets, i) {             // Finding rules font-related 
		var unit = "";
		var re = /em|px|%|pt/;
		try {
		for (var j=0; j < sheets[i].cssRules.length; j++) { 
			if (sheets[i].cssRules[j].type === 1) {      // TODO déplacer le IF avant la boucle pour éviter problèmes avec règle Import
			var rule = sheets[i].cssRules[j];

				if ((/(^body$|body,|,body)/.test(rule.selectorText) === true) || (/\s?html,?/.test(rule.selectorText) === true )) {
										
				if (rule.style.fontSize !== "") {

					var specifiedSize = sheets[i].cssRules[j].style.getPropertyValue("font-size");
					var unit = re.exec(specifiedSize);
					stylingAccordingToUnit(specifiedSize, unit[0]);
					//successTailleTexte = true;
					return;

				}	
			}
		}
			else if (sheets[i].cssRules[j].type === 3) {
				var elStyle = document.createElement("style");
				document.head.appendChild(elStyle);
				elStyle.type = "text/CSS";
				elStyle.setAttribute("title", "cssImport");
				GM_xmlhttpRequest({	// cross-domain request, thanks to GreaseMonkey.
					method: "GET",
					url: sheets[i].cssRules[j].href,
					onload: function(response) {
					elStyle.innerHTML += response.responseText;
					}
				});

			//We create style elements to manipulate the css as cssRules objects.
	
			}
			 // else { }   if nothing font-related in body or html tags
		}
	} catch(e) {console.log(e);}
	};

	//var successTailleTexte = false;

	var tailleTexte = function() {	

		var sheets = document.styleSheets;
		var paragraphes = getTag("p");
		if (paragraphes[4] !== undefined) {
		var sizeOfFont = window.getComputedStyle(paragraphes[4]).fontSize;
		var sizeOfFontValue = parseInt(sizeOfFont, 10);	// bigger text if we detect it's too small.
	
			if (sizeOfFontValue < 19) { 
				
					parsingRawCSS();		// Transforming CSS strings into proper objects.
					
					var sheets = document.styleSheets;
					for (var i=0; i < sheets.length; i++) { 

						if ((sheets[i].href === null) && ((sheets[i].media.mediaText === "all") || (sheets[i].media.mediaText === "") || (sheets[i].media.mediaText === "print") )){ 
							traversingCSSObject(sheets, i);
						}
						// if (successTailleTexte){
						// 	return;
						//}
					return;
					}
			}
		}
	};		
	
	tailleTexte();

	var cumulativeOffset = function(element) {
		var left = 0;
	    do {left += element.offsetLeft || 0;
	        element = element.offsetParent;
	    } 
	    while(element);
	    return left;
	};
	
	// detect a body of text (at least two paragraphs in a row, with several dots or commas)
	var success = false;
	var textBody = function () {
		var paragraphes = getTag("p");
			for (var i=0; i < paragraphes.length-1; i++) { 
			
					var commaCount= paragraphes[i].textContent.split(", ").length,
						commaCountSibling = paragraphes[i+1].textContent.split(", ").length,
						periodCount = paragraphes[i].textContent.split(". ").length,
						periodCountSibling = paragraphes[i+1].textContent.split(". ").length;				
		
					if (((commaCount + commaCountSibling) > 10 ) || ((periodCount + periodCountSibling) > 10)) {
						if (paragraphes[i].className.indexOf("paragraphes") === -1) {
							paragraphes[i].className += " paragraphes";
							success = true;
					}
				}
				
			}
		
		var parents = function(node) {
			var nodes = [node];
			for (; node; node = node.parentNode) {
				nodes.unshift(node);
				if (node !== document) {
					if (window.getComputedStyle(node).display.indexOf("table") > -1 ) {
						return;
					}
				}
			}
			return nodes;
		};
		
		var commonAncestor = function(node1, node2) {
			var parents1 = parents(node1);
			var parents2 = parents(node2);
			
			if (parents1[0] !== parents2[0]) {
				console.log( "No common ancestor!");
			}
			for (var i = 0; i < parents1.length; i++) {
				if (parents1[i] !== parents2[i]) {
					return parents1[i - 1];
				}
			}
		}
	};
		
	textBody();

	if (success) {
		var paragrapheTag = document.getElementsByClassName("paragraphes");
		if (paragrapheTag.length > 3) {
			// Finding a common ancestor to apply for the CSS to be comprehensive
			var resultCommonAncestor = commonAncestor(paragrapheTag[2], paragrapheTag[paragrapheTag.length-2]); 
			if (resultCommonAncestor !== undefined) {
				resultCommonAncestor.className += " ancestor";
			}
			else {return;}
		}
		else {
			paragrapheTag[0].className += " ancestor";		
		}
		
		var ancestor = document.getElementsByClassName("ancestor")[0];	
		var count = {};
		var n = 0;
		count[ancestor] = ancestor.getElementsByTagName("p").length;
		

		/*var theMostP = function(node) {
			console.log(count)

		};*/


		var n = 0;
		var walkTheDOM = function walk(node) {
			node = node.firstElementChild;
			while (node) {
				//theMostP(node);
				walk(node);
				var children = node.children;
				for (var i = children.length - 1; i >= 0; i--) {
					if (children[i].tagName === "P") {
						n++;
					}
				//debugger;

				}
			}
				count[node] = n;
				console.log(node);
				node = node.nextElementSibling;  
		};	
		
		walkTheDOM(ancestor);


		/*var styleAncestor = window.getComputedStyle(ancestor);
		if (styleAncestor.lineHeight / styleAncestor.fontSize < 1.3) {
			resultCommonAncestor.style.lineHeight = "1.4em";
		}

		if (parseInt(window.getComputedStyle(paragrapheTag[1]).fontSize, 10) < 18) {
			GM_addStyle(".ancestor p, .ancestor ul, .ancestor blockquote, .ancestor ol, .ancestor dl, .ancestor cite {font-size:16px !important;}");

		}*/
	
	
	// if the browser supports hyphenation, we enable it and justify the text.
	// Webkit doesn't, and "lies" about it, so we detect the user agent.	
		if (window.navigator.userAgent.indexOf("AppleWebKit") !== -1) {
			var style =  ".ancestor { -webkit-hyphens:auto; text-shadow:none !important;} .ancestor p, .ancestor h1, .ancestor h2, .ancestor h3, .ancestor pre {min-width:450px !important; max-width:700px !important;} .ancestor ul, .ancestor blockquote, .ancestor ol, .ancestor dl, .ancestor cite {min-width:460px !important; max-width:650px !important;} .ancestor, .ancestor p, .ancestor ul, .ancestor cite, .ancestor ol, .ancestor blockquote {line-height: 1.4 !important;}";
		}
		else {
			var style =  ".ancestor, .ancestor p, .ancestor ul {text-align:justify !important; -moz-hyphens:auto; ; text-shadow:none !important; line-height: 1.4;} .ancestor p, .ancestor h1, .ancestor h2, .ancestor h3, .ancestor pre {min-width:450px !important; max-width:700px !important;} .ancestor ul, .ancestor blockquote, .ancestor ol, .ancestor dl, .ancestor cite {min-width:460px !important; max-width:650px !important;} .ancestor, .ancestor p, .ancestor ul, .ancestor cite, .ancestor ol, .ancestor blockquote {line-height: 1.4 !important;}";
		}
		GM_addStyle(style);
	
		
		/*
	var ancestorFontSize = window.getComputedStyle(resultCommonAncestor).fontSize;
		var ancestorFontSizeValue = parseInt(ancestorFontSize, 10);
		if (ancestorFontSizeValue < 14) {
			var sizeOfFontValue = ancestorFontSizeValue + 2;
			resultCommonAncestor.style.fonSize = sizeOfFontValue.toString() + "px";
		}
		
	*/
	var absoluteMargin = cumulativeOffset(resultCommonAncestor);            // If the body of texte is too close for the left edge of the screen
		if (absoluteMargin < 15) {                                      // We move it
			resultCommonAncestor.style.marginLeft = "40px";
		}
	
	}

	
	function antiPopup() {
		var popupsId = document.querySelectorAll(popups);
		for (var i = 0; i < popupsId.length; i++) {
			if (popupsId[i] !== null) {
				var styleReel = window.getComputedStyle(popupsId[i]);				
				if (styleReel.position !== ("absolute" || "fixed")) {
					popupsId[i].style.display = "block";
					console.log("Oopsie maybe it wasn't a popup");
					}
				}
				else {
					console.log("ENCORE UN POPUP");
				    var message = document.createElement("div");
					document.body.appendChild(message);
					message.style.cssText = "position: fixed; z-index:20000; right:0px; top:0px; display:block; max-width:200px;";
					var contenuMessage = document.createElement("p");
					message.appendChild(contenuMessage);
					contenuMessage.style.cssText = "padding:1.1em; border:solid 1px grey; maxWidth:300px; font-size:14px; background-color:#f3f3f3; margin:0; color:black;";
					contenuMessage.innerHTML = "Ergonomizor 3000 a empêché l'ouverture d'un pop-up, évitant Dieu de tuer un chaton de plus.";
					setTimeout(function(){message.style.display="none";}, 6000);
					return;
			}
		}
	}    

applyStyle();		
antiPopup();


};

if ( window.self === window.top ){
wrapper();
}