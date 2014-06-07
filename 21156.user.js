// ==UserScript==
// @name          BabelMousish 2
// @description   Fastest, completely unobtrusive multilanguage tooltip translation. Improved version of BabelMousish, now only one middle mouse button click needed. Fixed 'ugh'-alert bug. Also BabelMousish FireFox extension available on http://netcat.ath.cx/extensions.html 
// @include       *
// @exclude       http://babelfish.altavista.com/*
// @version       0.8.6
// ==/UserScript==

/*
------- CHANGE LOG --------
version 0.8.6
	- converted userscript to greasemonkey 0.64 (firefox 1.5) compliant
version 0.8.5.1
	- explicit zindex style property, due invisible babel mousish box in some sites
version 0.8.5
	- added "configuration button" to change language on the fly when babel mousish box is visible
version 0.8.3
	- bugfix: in some scenarios (for example with a specific proxy) the script doesn't works. Changed http method from "post"
	  to "get", thank you bankair!

version 0.8.2
	- bugfix: babelmousish engaged also in babelfish translation page

version 0.8.1
	- bugfix: when vertical scrolling click anywhere make unvisibile babelfishbox

version 0.8:
	- implemented back-translation feature. Click on the current translation label to reverse translation
	- relayout by css
	- update current translation after saving preferences

version 0.7:
	- created box "toolbar", with "x" button and translate button
	- implemented preferred translation setting by menu command wizard
	- implemented preferred translation saving to user profile preferences
	- clicking outside babelfish box, this will disappear

version 0.6:
	- first version
------- CHANGE LOG --------
*/

/*
All babelfish's methods are named being based on original Douglas Adams sci-fi story
"The Hitch Hiker's Guide to the Galaxy". To understand what babel fish is
go to http://en.wikipedia.org/wiki/Babel_fish
*/

/*
TODO: set smaller and unified icons for toolbar
TODO: add timeout manage for too delayed response by babelfish "service"
*/

window.setLanguangeRuleF = function() {
	var langs = {
		"de" : "german",
		"el" : "greek",
		"en" : "english",
		"es" : "spanish",
		"fr" : "french",
		"it" : "italian",
		"ja" : "japanese",
		"ko" : "korean",
		"nl" : "dutch",
		"pt" : "portuguese",
		"ru" : "russian",
		"zh" : "simplified-chinese",
		"zt" : "traditional-chinese"
	}
	var availableLangs = '\n"de" - german\n"el" - greek\n"en" - english\n"es" - spanish\n"fr" - french\n"it" - italian\n"ja" - japanese\n"ko" - korean\n"nl" - dutch\n"pt" - portuguese\n"ru" - russian\n"zh" - simplified-chinese\n"zt" - traditional-chinese';

	var from, to;

	while(true) {
		while(true) {
			var transl = window.babelFish.supportedTranslations[window.babelFish.translationFrom + "_" + babelFish.translationTo];
			from = prompt(
				'Current translation preference is '
				+ transl
				+ '\nTo choose another translation start to select source language from this list or cancel operation' + availableLangs, '');
			if (from == null
					|| (langs[from] != null)) {
				break;
			}
		}

		if (from != null) {
			while(true) {
				to = prompt('You choosed "' + langs[from] + '" source language, \nnow choose destination language from this list' + availableLangs, '');
				if (to == null
						|| (langs[to] != null && to != from)) {
					break;
				}
				if (to == from) {
					alert('you choosed same source and destination language');
				}
			}
		} else {
			break;
		}

		if (from != null && to != null) {
			var defaultTranslation = from + "_" + to;
			if (!window.babelFish.supportedTranslations[defaultTranslation]) {
				alert('you choosed unavailable languages translation :(\nretry or cancel');
			} else {
				GM_setValue("babelmousish.translation.from", from);
				GM_setValue("babelmousish.translation.to", to);
				window.babelFish.translationFrom = from;
				window.babelFish.translationTo = to;
				window.babelFish.babelLangLabel.refreshData();
				alert('Translation ' + window.babelFish.supportedTranslations[defaultTranslation] + ' saved!');
				break;
			}
		} else {
			break;
		}
	}
}

//register command into menÃ¹
GM_registerMenuCommand("Babel Mousish Preferences", window.setLanguangeRuleF);

//provides to make visible babel fish box only when mouse up and alt key pressed
//or provides to hide babel fish box when user click out of box
window.addEventListener('mouseup', function(mouseEvent) {
	var boxLeft = window.babelFish.offsetLeft;
	var boxRight = boxLeft + window.babelFish.offsetWidth;
	var boxTop = window.babelFish.offsetTop;
	var boxBottom = boxTop + window.babelFish.offsetHeight;

	if (window.babelFish.style.display == "inline"
			&& (mouseEvent.pageX < boxLeft
					|| mouseEvent.pageX > boxRight
					|| mouseEvent.pageY < boxTop
					|| mouseEvent.pageY > boxBottom)) {
		window.babelFish.stopCapture();

	} else if (window.getSelection() != '') {//netcat
	 	if (mouseEvent.which != 2 && mouseEvent.button != 4 && mouseEvent.button != 1 && mouseEvent.altKey != 1) //netcat
			 return; 
		window.babelFish.psychicalWavesCapture(mouseEvent, window.getSelection());
		babelFish.defecates();//netcat
	}
}, true);

//create babel fish object and box instance. make it unvisible on start
function engageBabelFish() {
	//set global css
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }//ugh //netcat--
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "span.gmBabelMousishToolBar {margin: 1px; border: 1px dotted gray; padding: 0px 5px 0px 5px;}";
	head.appendChild(style);


	var babelFish = document.createElement("div");
	babelFish.id = "gmBabelFish";
	babelFish.translationFrom = GM_getValue("babelmousish.translation.from", "en");
	babelFish.translationTo = GM_getValue("babelmousish.translation.to", "de");
	babelFish.spinner_imgSrc = "data:image/gif;base64,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";
	babelFish.fish_imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAOCAYAAAA8E3wEAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QUUDyoqJjAqRwAAAN1JREFUOMu1lMkVwyAMBYe0JGpCNUFNVk3k4AUwxPGS+ILxkzX8jyTH/Sfu9nrmJ3cXlnMASyWRPwd2d5XlHCBZn1BthcbRAdxTZQDI8k3mQzg11rhF+QZ9jdNOcQib6GFQYJYgCFucSRf6GsLU6wEY5yubTFqF2yq1vRwr3INXdQUWG+je1pELX4ED1wDyRAR0WfuAA9gloITyvsFMIMgYInYRqF6rO9Sqz9qkO5ilyo0o3YBwJ+6vrdQonxWUQllhXeHcb/wabMPkP2n81ocAIoLZrMqn/4y2RwP8DcQ+d6rT9ATiAAAAAElFTkSuQmCC";

	/* --- babelfish supported translations --- */
	babelFish.supportedTranslations = {
		"zh_en" : "From Simplified-Chinese To English",
		"zt_en" : "From Traditional-Chinese To English",
		"en_zh" : "From English To Simplified-Chinese",
		"en_zt" : "From English To Traditional-Chinese",
		"en_nl" : "From English To Dutch",
		"en_fr" : "From English To French",
		"en_de" : "From English To German",
		"en_el" : "From English To Greek",
		"en_it" : "From English To Italian",
		"en_ja" : "From English To Japanese",
		"en_ko" : "From English To Korean",
		"en_pt" : "From English To Portuguese",
		"en_ru" : "From English To Russian",
		"en_es" : "From English To Spanish",
		"nl_en" : "From Dutch To English",
		"nl_fr" : "From Dutch To French",
		"fr_en" : "From French To English",
		"fr_de" : "From French To German",
		"fr_el" : "From French To Greek",
		"fr_it" : "From French To Italian",
		"fr_pt" : "From French To Portuguese",
		"fr_nl" : "From French To Dutch",
		"fr_es" : "From French To Spanish",
		"de_en" : "From German To English",
		"de_fr" : "From German To French",
		"el_en" : "From Greek To English",
		"el_fr" : "From Greek To French",
		"it_en" : "From Italian To English",
		"it_fr" : "From Italian To French",
		"ja_en" : "From Japanese To English",
		"ko_en" : "From Korean To English",
		"pt_en" : "From Portuguese To English",
		"pt_fr" : "From Portuguese To French",
		"ru_en" : "From Russian To English",
		"es_en" : "From Spanish To English",
		"es_fr" : "From Spanish To French"
	}
	/* --- babelfish supported translations --- */


	//hides che babelfish box
	babelFish.stopCapture = function() {
		this.style.display = "none";
	}

	//capture selected text and show the babelfish box near the pointer
	babelFish.psychicalWavesCapture = function(mouseEvent, selectedText) {
		if (this.style.display == "none") {
			this.style.display = "inline";
			this.babelFishImage.style.display = "inline";
			this.style.left = (mouseEvent.pageX - 20).toString(10) + 'px';
			this.style.top  = (mouseEvent.pageY - 5).toString(10) + 'px';
			this.babelTextSpan.innerHTML = selectedText;
		}
	}

	//translate the code and after set box properties
	babelFish.defecates = function () {
		this.babelFishImage.src = this.spinner_imgSrc;
	  GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://babelfish.altavista.com/tr?lp='
	    			+ window.babelFish.translationFrom + "_"
	    			+ window.babelFish.translationTo
	    			+ '&text=' + this.babelTextSpan.innerHTML,
	    onload: function(responseDetails) {
	    	var t = responseDetails.responseText;
	    	//babelfish doesn't expose its api, i must to parse html response!
	    	window.babelFish.babelTextSpan.innerHTML = t.substring(t.search("10px;>") + 6, t.search('</div>'));
				window.babelFish.babelFishImage.src = window.babelFish.fish_imgSrc;
	    }
	  });
	}

	/* --- babel fish box style properties --- */
	babelFish.style.border = "1px solid black";
	babelFish.style.display = "none";
	babelFish.style.position = "absolute";
	babelFish.style.backgroundColor = "#A8ECFF";
	babelFish.style.padding = "2px";
	babelFish.style.MozBorderRadius = "5px";
	babelFish.style.font = "arial";
	babelFish.style.fontSize = "12px";
	babelFish.style.color = "black";
	babelFish.style.textAlign = "left";
	babelFish.style.zIndex = "1410065406";

	//image button to translate text
	var babelFishImg = document.createElement("img");
	babelFishImg.src = babelFish.fish_imgSrc;
	babelFishImg.title = "click to translate";
	babelFishImg.style.border = "none";
	babelFishImg.align = "middle";
	babelFishImg.style.cursor = "pointer";
	babelFishImg.addEventListener('click', function() {babelFish.defecates();}, true);

	//text to translate/translated text span
	var babelTextSpan = document.createElement("span");

	//close button
	var closeButton = document.createElement("span");
	closeButton.innerHTML = "x";
	closeButton.style.cursor = "pointer";
	closeButton.className = "gmBabelMousishToolBar";
	closeButton.title = "Close babel mousish";
	closeButton.addEventListener('click', function() {babelFish.stopCapture();}, true);

	//translation configuration
	var configButton = document.createElement("span");
	configButton.innerHTML = "c";
	configButton.style.cursor = "pointer";
	configButton.className = "gmBabelMousishToolBar";
	configButton.title = "Configure languange";
	configButton.addEventListener('click', function() {window.setLanguangeRuleF();}, true);

	//translation from and to source
	var langsSpan = document.createElement("span");
	langsSpan.refreshData = function() {
		langsSpan.innerHTML = babelFish.translationFrom + " > " + babelFish.translationTo;
		langsSpan.title = babelFish.supportedTranslations[babelFish.translationFrom + "_" + babelFish.translationTo];
	}
	langsSpan.className = "gmBabelMousishToolBar";
	langsSpan.style.cursor = "default";
	langsSpan.addEventListener('click', function() {
		var temp = babelFish.translationTo;
		babelFish.translationTo = babelFish.translationFrom;
		babelFish.translationFrom = temp;
		langsSpan.refreshData();
	}, true);
	langsSpan.refreshData();

	//toolbar
	var toolBarDiv = document.createElement("div");
	toolBarDiv.style.borderBottom = "1px dotted black";
	toolBarDiv.style.paddingBottom = "2px";
	toolBarDiv.style.paddingTop = "2px";

	//append objects to toolbar
	toolBarDiv.appendChild(closeButton);
	toolBarDiv.appendChild(configButton);
	toolBarDiv.appendChild(langsSpan);
	toolBarDiv.appendChild(babelFishImg);

	//put html objects into babelfish box
	babelFish.appendChild(toolBarDiv);
	babelFish.appendChild(babelTextSpan);

	//set objects into babelfish instance
	babelFish.babelFishImage = babelFishImg
	babelFish.babelTextSpan = babelTextSpan;
	babelFish.babelLangLabel = langsSpan;

	window.babelFish = babelFish;
	document.body.insertBefore(window.babelFish, document.body.firstChild);

}

engageBabelFish();