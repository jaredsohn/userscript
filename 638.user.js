// ==UserScript==
// @name			Webpage Translator
// @description		Redirects firefox to a URL that uses Altavista translation engine to translate the page
// @namespace		http://deec.fe.up.pt/~ei03065/greasemonkey/
// @include			*
// ==/UserScript==

// Author:		Joaquim Rendeiro
// Disclamer:	Made this partially for the usefullness, partially for the fun of making it, so don't expect
//				a very clean final product!
// Version:		0.1 beta - 10 June 2005

var Translator = {
	
	appName : "Automagic Translator",
	
	stringContains : function(haystack, needle) {
		haystack = String(haystack);
		needle = String(needle);
		return (haystack.toUpperCase().indexOf(needle.toUpperCase()) != -1);
	},
	
	stringMatches : function(str, expression) {
		str = String(str);
		ex = new RegExp(expression, "gi");
		//alert(expression + "\n" + str.match(ex) + "\n" + str);
		return (str.match(ex) != null);
	},
	
	getDocType : function() {
		var type = null, val = "";
		var xhtmlExp = "<(\\s*)([^>]+\\s*)/>", htmlExp = "<(\\s*)([^>]+\\s*)>";
		/* document.doctype is null or document.doctype.name is "HTML"
		if(document.doctype) {
			type = document.doctype.name;
		} else */
		
		if(document.firstChild) {
			val = document.firstChild.nodeValue;
			if(this.stringContains(val, "XHTML"))
				type = "XHTML";
			else if(this.stringContains(val, "HTML"))
				type = "HTML";
		}
		
		if(type == null) {
			// search in source for any xhtml tag
			val = document.documentElement.innerHTML;
			
			if(this.stringMatches(val, xhtmlExp))
				type = "XHTML";
			else if(this.stringMatches(val, htmlExp))
				type = "HTML";			
		}
		
		if(type == null) return "UNKNOWN";
		return type;
	},
	
	validDocumentFormat : function() {
		var type = this.getDocType().toUpperCase();
		if(type == "HTML" || type == "XHTML") return true;
		return false;
	},
	
	
	injectTranslateMenu : function() {
		if(!this.validDocumentFormat()) {
			alert("| " + this.appName + "\n|\n|\n| This script can only operate in HTML or XHTML documents.\n|\n| Current document format is: '" + this.getDocumentFormat() + "'.");
			return;
		}
		
		var css =
'body {\n' +
'	margin-top: 33px;\n' +
'}\n' +
'\n' +
'div.TranslatorMenu {\n' +
'	width: 100%;\n' +
'	height: 32px;\n' +
'	position: absolute;\n' +
'	top: 0px;\n' +
'	left: 0px;\n' +
'	background-color:#FFFFFF;\n' +
'}\n' +
'\n' +
'td.TranslatorTD {\n' +
'	border: 1px solid #0066FF;\n' +
'	text-align: center;\n' +
'}\n' +
'\n' +
'.TranslatorInputField {\n' +
'	height: 18px;\n' +
'	font-family: Tahoma, Verdana, Arial, sans-serif;\n' +
'	font-size: 8pt;\n' +
'	font-weight: normal;\n' +
'	border: 1px solid #333333;\n' +
'	margin-top: 3px;\n' +
'}\n' +
'\n' +
'#TranslatorSelect {\n' +
'	width: 175px;\n' +
'}\n' +
'\n' +
'#TranslatorButton {\n' +
'	width: 70px;\n' +
'}';

		var html =
'<div class="TranslatorMenu">\n' +
'\n' +
'<script language="javascript" type="text/javascript">\n' +
'function Translate() {\n' +
'	lp = document.getElementById("lp");\n' +
'	if(lp == null) {\n' +
'		alert("Something went terribly wrong..");\n' +
'		return false;\n' +
'	}\n' +
'	\n' +
'	if(lp.value == "") return false;\n' +
'	\n' +
'	document.location.href = "http://world.altavista.com/babelfish/trurl_pagecontent?lp=" + lp.value + "&trurl=" + escape(document.location.href);\n' +
'}\n' +
'</script>\n' +
'\n' +
'<table width="100%" border="0" cellspacing="2">\n' +
'<tr><td class="TranslatorTD">\n' +
'<select id="lp" class="TranslatorInputField" id="TranslatorSelect">\n' +
' <option value="">Select from and to languages</option>\n' +
'\n' +
' <option value="zh_en">Chinese-simp to English</option>\n' +
' <option value="zt_en">Chinese-trad to English</option>\n' +
' <option value="en_zh">English to Chinese-simp</option>\n' +
' <option value="en_zt">English to Chinese-trad</option>\n' +
' <option value="en_nl">English to Dutch</option>\n' +
' <option value="en_fr">English to French</option>\n' +
'\n' +
' <option value="en_de">English to German</option>\n' +
' <option value="en_el">English to Greek</option>\n' +
' <option value="en_it">English to Italian</option>\n' +
' <option value="en_ja">English to Japanese</option>\n' +
' <option value="en_ko">English to Korean</option>\n' +
' <option value="en_pt">English to Portuguese</option>\n' +
'\n' +
' <option value="en_ru">English to Russian</option>\n' +
' <option value="en_es">English to Spanish</option>\n' +
' <option value="nl_en">Dutch to English</option>\n' +
' <option value="nl_fr">Dutch to French</option>\n' +
' <option value="fr_en">French to English</option>\n' +
' <option value="fr_de">French to German</option>\n' +
'\n' +
' <option value="fr_el">French to Greek</option>\n' +
' <option value="fr_it">French to Italian</option>\n' +
' <option value="fr_pt">French to Portuguese</option>\n' +
' <option value="fr_nl">French to Dutch</option>\n' +
' <option value="fr_es">French to Spanish</option>\n' +
' <option value="de_en">German to English</option>\n' +
'\n' +
' <option value="de_fr">German to French</option>\n' +
' <option value="el_en">Greek to English</option>\n' +
' <option value="el_fr">Greek to French</option>\n' +
' <option value="it_en">Italian to English</option>\n' +
' <option value="it_fr">Italian to French</option>\n' +
' <option value="ja_en">Japanese to English</option>\n' +
'\n' +
' <option value="ko_en">Korean to English</option>\n' +
' <option value="pt_en">Portuguese to English</option>\n' +
' <option value="pt_fr">Portuguese to French</option>\n' +
' <option value="ru_en">Russian to English</option>\n' +
' <option value="es_en">Spanish to English</option>\n' +
' <option value="es_fr">Spanish to French</option>\n' +
'</select>\n' +
'&nbsp;\n' +
'<input type="button" class="TranslatorInputField" id="TranslatorButton" name="ok" value="Translate!" onClick="Translate();">\n' +
'</td></tr></table></div>';

		this.injectCss(css);
		this.injectHtml(html);

	},
	
	injectCss : function(code) {
		var css = document.createElement("style");
        css.innerHTML = code;
		css.type = "text/css";
		this.injectObject("style", 0, css);
	},
	
	injectHtml : function(code) {
		var div = document.createElement("div");
		div.innerHTML = code;
		this.injectObject("body", 0, div);
	},
	
	injectObject : function(baseTag, tagIndex, obj) {
		try {
			document.getElementsByTagName(baseTag)[tagIndex].appendChild(obj);
		} catch (e) { }
	}
	
};

GM_registerMenuCommand("Translate current page", ( function() {Translator.injectTranslateMenu();} ), {ctrl:true, alt:true, key:"t"});
//alert(Translator.getDocType());