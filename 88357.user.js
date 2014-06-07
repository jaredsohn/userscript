// ==UserScript==
		// @name		  Translate Page ex0.1
		
		// @description   translate pages with Google Language Tools any page.
		// @include		  http://*
		// @include		  https://*
		// @exclude		  http://www.google.com/language_tools*
		// @exclude		  http://translate.google.com/*
		// ==/UserScript==
	
		if (location.pathname == '/translate_c') return;
		
		var arArTranslate = {};
		arArTranslate['en'] = ['de', 'es', 'fr', 'it', 'pt', 'ja', 'ko', 'zh-CN'];
		arArTranslate['de'] = ['en', 'fr'];
		arArTranslate['es'] = ['en'];
		arArTranslate['fr'] = ['en', 'de'];
		arArTranslate['it'] = ['en'];
		arArTranslate['pt'] = ['en'];
		arArTranslate['ja'] = ['en'];
		arArTranslate['ko'] = ['en'];
		arArTranslate['zh-CN'] = ['en'];
		
		var arTranslateName = { 
			'en': 'English', 
			'es': 'Spanish', 
			'de': 'German', 
			'fr': 'French', 
			'it': 'Italian', 
			'pt': 'Portuguese', 
			'ja': 'Japanese', 
			'ko': 'Korean', 
			'zh-CN': 'Chinese (Simplified)'};

		var langSource; 
		var attrLang = document.evaluate("//html/@lang", document, null, 
			XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
		if (attrLang) {
			langSource = attrLang.value; }
		if (!(langSource in arArTranslate)) {
			langSource = GM_getValue('lang.source') || 'en'; 
		}
		var langTarget = GM_getValue('lang.target') || arArTranslate[langSource][0];
		for (var i = arArTranslate[langSource].length; i >= 0; i--) {
			if (arArTranslate[langSource][i] == langTarget) break; 
		}
		if (i < 0) {
			langTarget = arArTranslate[langSource][0]; 
		}
		var elmTranslateDiv = document.createElement('div');
		elmTranslateDiv.style.borderBottom = '1px solid silver';
		elmTranslateDiv.style.textAlign = 'right';
		var htmlSelect = '<select name="langpair" id="langpair">';
		for (var langOneSource in arArTranslate) {
			for (var i = 0; i < arArTranslate[langOneSource].length; i++) {
				langOneTarget = arArTranslate[langOneSource][i];
				htmlSelect += '<option value="' + langOneSource + '|' +
				langOneTarget + '"' +
				(((langOneSource == langSource) && (langOneTarget ==
		langTarget)) ?
				 ' selected' : '') + '>' + arTranslateName[langOneSource] + 
				 ' to ' + arTranslateName[langOneTarget] + '</option>';
			} 
		}
		htmlSelect += '</select> ';
		elmTranslateDiv.innerHTML =
			 '<form id="translatepage" Googleweb page translation using Google Language Toolsmethod="GET" ' +
			 'action="http://translate.google.com/translate" ' +
			 'style="font-size: small; font-family: sans-serif;">' +
			 'Translate this integrationpage top form for language translationpage from ' +
			 htmlSelect +
			 '<input type="hidden" name="u" value="' + location + '">' +
			 '<input type="hidden" name="hl" value="en">' +
			 '<input type="hidden" name="c2coff" value="1">' +
			 '<input type="hidden" name="ie" value="UTF-8">' +
			 '<input type="hidden" name="oe" value="UTF-8">' +
			 '<input type="submit" value="Translate">' +
			 '</form>';
		document.body.insertBefore(elmTranslateDiv, document.body.firstChild); 
		var elmTranslateForm = document.getElementById('translatepage');
		if (!elmTranslateForm) return;
		elmTranslateForm.addEventListener('submit', function(event) {
			 var elmSelect = document.getElementById('langpair');
			 if (!elmSelect) return true;
			 var ssValue = elmSelect.value;
	 var langSource = ssValue.substring(0, ssValue.indexOf('|'));
			 var langTarget = ssValue.substring(ssValue.indexOf('|') + 1);
			 GM_setValue('lang.source', langSource);
			 GM_setValue('lang.target', langTarget);
			 return true;
		}, true);
