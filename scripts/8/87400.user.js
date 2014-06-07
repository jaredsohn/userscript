// ==UserScript==
// @name           Scroogle Plus
// @namespace      sebastian-lang.net
// @description    Yet another userscript to make Scroogle.org more user-friendly.

// @include        https://ssl.scroogle.org/*
// @include        https://*scroogle.org/cgi-bin/nbbw*
// @include        http://*scroogle.org/cgi-bin/*
// @include		   https://userscripts.org/scripts/show/87400

// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        1.0.3
// @lastupdated    2010-12-06
//
// ==/UserScript==
//-------------------------------------------------------------------------------------------------------------------
//						For more information visit https://userscripts.org/scripts/show/87400
//-------------------------------------------------------------------------------------------------------------------
// A Options:
// 	Change the following values to show/hide particular links	-	valid values: "yes", "no"
//
//		name				=	"value"	;
//-----------------------------------------
var 	ShowScroogle 		= 	"yes"	;
var 	ShowDuckDuckGo 		= 	"yes"	;
var 	ShowIxquick 		= 	"yes"	;
var 	ShowMetager2 		= 	"no"	;
var 	Showyauba 			= 	"yes"	;
var 	ShowWikipedia 		= 	"yes"	;
var 	ShowWolframAlpha 	= 	"yes"	;
//-------------------------------------------------------------------------------------------------------------------
// 1 The Script:

if (window.location.href != 'https://userscripts.org/scripts/show/87400') {

// 	1.1 Add a CSS

	GM_addStyle(<style><![CDATA[

	body { font-family:arial,verdana,sans-serif; color:#555; font-size:1.0em; font-weight:normal; text-align:left; 
		background:#FFF; margin:0 auto; margin-top: 0.2em; min-width:500px; max-width:780px; 
		}
	a:link { color:#054BAF; text-decoration:none; 
		}
	a:visited { color:#FC0; text-decoration:none; 
		}
	a:hover { color:#054BAF; text-decoration:underline; 
		}
	a:active { color:#054BAF; text-decoration:none; 
		}
	center {margin-bottom:0.25em; margin-top:-1.9em; text-align:center; 
		border-bottom-style:solid; border-bottom-width:1px; border-bottom-color:#6B90DA; margin-left:1em;margin-right:1em;
		}
	form { display:inline;
		}
	input[type="text"] { font-family:arial,verdana,sans-serif; font-size:14pt; font-weight:normal; text-align:left;
		width:83%; max-width:9999px; height:1.7em; padding-left:0.2em; margin-top:1.1em; margin-bottom:0.8em; 
		}
	input[type="submit"] { font-family:arial,verdana,sans-serif; color:#888!important; width:65px; height:30px; font-size:9pt; 
		font-weight:bold; background-color:#FFF; border:1px solid #7F9DB9!important; padding-top:4px;
		}
	ul { text-align:justify; width:90%; 
	
	line-height:1.1em; margin-left:0em; margin-top:0em; margin-bottom:0em; 
		}
	.scroogletoplink { font-family:arial,verdana,sans-serif; color:#0033FF!important; font-size:13pt; font-weight:bold; 
		text-decoration:none!important; margin-left:0.4em; vertical-align: middle; 
		}
	.toplink1 { font-family:arial,verdana,sans-serif; color:#555!important; font-size:8pt; font-weight:normal; text-align:right!important;
		text-decoration:none!important; margin-left:1em; vertical-align: baseline;
		}
	.toplink2 { font-family:arial,verdana,sans-serif; color:#777!important; font-size:8pt; font-weight:bold; 
		text-decoration:none!important; margin-left:1.2em; margin-bottom:0em; text-align:right!important; vertical-align: top; 
		}
	.options { font-family:arial,verdana,sans-serif; color:#777!important; font-size:9pt; font-weight:normal; 
		text-decoration:none!important; margin-left:1.2em; margin-bottom:0em; text-align:right!important; vertical-align: middle; 
		}
	.optionsbox { background-color:#444; width: 100%; height:600px; font-family:arial,verdana,sans-serif; color:#777!important; font-size:9pt; font-weight:normal; 
		text-decoration:none!important; margin: 0 auto; text-align:right!important; vertical-align: middle; 
		}
	.Text01 { font-size:0pt;
		}
	.Text02 { font-family:arial,verdana,sans-serif;font-size:12pt!important; font-weight:normal;margin-left:0em;
		}
	.Text03 { font-family:arial,verdana,sans-serif; color:#444!important; font-size:11pt; font-weight:normal; 
		margin-left:0em; margin-bottom:1.4em;
		}
	.Text04 { font-family:arial,verdana,sans-serif; color:#222!important; font-size:9pt; font-weight:normal;margin-left:0em;
		}
	.Text05 { font-family:arial,verdana,sans-serif; color:#006600!important; font-size:9pt; font-weight:normal;margin-left:0em
		}
	.bq01 { background:#FFF; margin-left:0; margin-right:0; margin-top:0;
		}
	.linksdiv { background:#FFF; margin: 0em; 
		}
	]]></style>);

	var Text01 = document.getElementsByTagName('b')[0];
		Text01.name = 'Text01';
		Text01.id = 'Text01';
		Text01.setAttribute('class', 'Text01');

	var bq01 = document.getElementsByTagName('blockquote')[0];
		bq01.name = 'bq01';
		bq01.id = 'bq01';
		bq01.setAttribute('class', 'bq01');

	for (var i=0; i<100; i++) {
		var Text02 = document.getElementsByTagName('a')[i];
			Text02.name = 'Text02';
			Text02.id = 'Text02';
			Text02.setAttribute('class', 'Text02');
		var Text03 = document.getElementsByTagName('ul')[i];
			Text03.name = 'Text03';
			Text03.id = 'Text03';
			Text03.setAttribute('class', 'Text03');
	};

	for (var i=0; i<200; i++) {	
		var Text04 = document.getElementsByTagName('font')[i*2];
			Text04.name = 'Text04';
			Text04.id = 'Text04';
			Text04.setAttribute('class', 'Text04');
		var Text05 = document.getElementsByTagName('font')[i*2+1];
			Text05.name = 'Text05';
			Text05.id = 'Text05';
			Text05.setAttribute('class', 'Text05');
	};

//	1.2 Store query

	var gw = document.getElementsByName("Gw"), j = 0, g; (g = gw[j]); j++;
	var query = g.value;
	
//	1.3 Change document title
	
	document.title = query + ' - Scroogle';

//	1.4 Create links on top of the page

//		1.4.1 Define links
	
		// Scroogle
		var scrooglelink = document.createElement('a');
		scrooglelink.href = "https://ssl.scroogle.org/";
		var scrooglecontent = document.createTextNode('Scroogle');
		scrooglelink.appendChild(scrooglecontent);
		scrooglelink.setAttribute('class', 'scroogletoplink');
	
		// DuckDuckGo
		var duckduckgolink = document.createElement('a');
		duckduckgolink.href = "https://duckduckgo.com/?q="+query;
		var duckduckgocontent = document.createTextNode('DuckDuckGo');
		duckduckgolink.appendChild(duckduckgocontent);
		duckduckgolink.setAttribute('class', 'toplink1');

		// Ixquick
		// The parameter "language=" in "ixquicklink.href = ..." specifies the country/language. 
		// -> you can change it to "deutsch", "espanol" or "francais" for example.
		var ixquicklink = document.createElement('a');
		ixquicklink.href = "https://eu.ixquick.com/do/metasearch.pl?language=english&query="+query;
		var ixquickcontent = document.createTextNode('Ixquick');
		ixquicklink.appendChild(ixquickcontent);
		ixquicklink.setAttribute('class', 'toplink1');

		// Metager2
		var metager2link = document.createElement('a');
		metager2link.href = "https://metager2.de/search/index.php?ses=web&q="+query+"&cit=2807";
		var metager2content = document.createTextNode('Metager2');
		metager2link.appendChild(metager2content);
		metager2link.setAttribute('class', 'toplink1');
		
		// yauba
		// The parameter "ilang=" in "yaubalink.href = ..." specifies the country/language.
		// -> you can change it to "german", "french" or "italian" for example.
		// The string "target=" specifies the type of resource yauba will search for.
		// -> you can change it to "all", "websites", "realtime", "image", "video", "pdf" or "word" for example.
		// Switch the Lite Version on ("lout=txt") or off ("lout=dyn" - Javascript needed).
		// Filtered Search: (on "ss=y" , off "ss=n").
		var yaubalink = document.createElement('a');
		yaubalink.href = "http://www.yauba.com/?q="+query+"&ilang=english&target=all&lout=txt&ss=n";
		var yaubacontent = document.createTextNode('yauba');
		yaubalink.appendChild(yaubacontent);
		yaubalink.setAttribute('class', 'toplink1');
		
		// Wikipedia 
		// The string "en" in "wikipedialink.href = ..." specifies the country/language.
		// -> you can change it to "de", "es" or "fr" for example.
		var wikipedialink = document.createElement('a');
		wikipedialink.href = "https://secure.wikimedia.org/wikipedia/en/wiki/"+query;
		var wikipediacontent = document.createTextNode('Wikipedia');
		wikipedialink.appendChild(wikipediacontent);
		wikipedialink.setAttribute('class', 'toplink1');	
		
		// Wolfram|Alpha
		var wolframalphalink = document.createElement('a');
		wolframalphalink.href = "http://www.wolframalpha.com/input/?i="+query;
		var wolframalphacontent = document.createTextNode('Wolfram|Alpha');
		wolframalphalink.appendChild(wolframalphacontent);
		wolframalphalink.setAttribute('class', 'toplink1');
		
//		1.4.2 Append/insert links on top of page
	
		// Declare variables
		var linksdiv = document.createElement('div');
				
		// Append links
		if (ShowScroogle == "yes" ) {linksdiv.appendChild(scrooglelink);};
		if (ShowDuckDuckGo == "yes" ) {linksdiv.appendChild(duckduckgolink);};
		if (ShowIxquick == "yes" ) {linksdiv.appendChild(ixquicklink);};
		if (ShowMetager2 == "yes" ) {linksdiv.appendChild(metager2link);};
		if (Showyauba == "yes" ) {linksdiv.appendChild(yaubalink);};
		if (ShowWikipedia == "yes" ) {linksdiv.appendChild(wikipedialink);};
		if (ShowWolframAlpha == "yes" ) {linksdiv.appendChild(wolframalphalink);};

		linksdiv.setAttribute('class', 'linksdiv');	

		// Insert links
		document.body.insertBefore(linksdiv, document.body.firstChild);
		
};
//-------------------------------------------------------------------------------------------------------------------
// Start of "check for updates easily"
//-------------------------------------------------------------------------------------------------------------------
//	License: "check for updates easily" is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported license
//			 (http://creativecommons.org/licenses/by-sa/3.0/) by Sebastian Lang (http://sebastian-lang.net/).

//	Description: Paste this script (without the ==UserScript== block) into your userscript(s)
//				 to allow users to easily check for script updates, manually and/or automatically.

//	More information about this script can be found at http://userscripts.org/users/228982/scripts
//-----------------------------------------------------------------------------------------------------
//	To integrate "check for updates easily" into your script adapt the values of the three variables below,

	var cfue_ScriptHref = 'https://userscripts.org/scripts/show/87400';
	var cfue_msg_UpdateAvailable = 'There is an update available for Scroogle Plus - Do you want to install it now?';
	var cfue_msg_UpdateSuccessful = 'Scroogle Plus has been successfully updated!';

//	... and paste the line below into the meta block of your script (adapt the path to fit with your script)

// @include		   https://userscripts.org/scripts/show/87400

//	... that`s it!
//-----------------------------------------------------------------------------------------------------

	if (!GM_getValue('cfue_Enable')) {
		GM_setValue('cfue_Enable','yes');
	};
	var cfue_Enable = GM_getValue('cfue_Enable');

	if (cfue_Enable == 'yes'){
		var cfue_Now = new Date();
		var cfue_Today = cfue_Now.getDay();

		if (!GM_getValue('cfue_LastCheck')) {
			GM_setValue('cfue_LastCheck',cfue_Today);
		};

		if (cfue_Today != GM_getValue('cfue_LastCheck') || !GM_getValue('cfue_ScriptVersion')){
			var cfue_IFrame = document.createElement('iframe');
				cfue_IFrame.src = cfue_ScriptHref;
				cfue_IFrame.name = 'cfue_IFrame';
				cfue_IFrame.id = 'cfue_IFrame';
				cfue_IFrame.style.display = 'none';
				cfue_IFrame.style.margin = '0 auto';
				cfue_IFrame.style.width = '1000px';
				cfue_IFrame.style.height = '1000px';
				document.body.appendChild(cfue_IFrame);

			if (window.location.href == cfue_ScriptHref) {

				if (!GM_getValue('cfue_ScriptVersion')){
					GM_setValue('cfue_ScriptVersion',document.getElementById("summary").childNodes[8].nodeValue);
				};
				var cfue_ScriptVersion = GM_getValue('cfue_ScriptVersion');

				if (document.getElementById("summary").childNodes[8].nodeValue != cfue_ScriptVersion){
					var cfue_ScriptVersion = document.getElementById("summary").childNodes[8].nodeValue;
					var cfue_ScriptDownloadHref = cfue_ScriptHref.replace(/show/,'source') + '.user.js';
					var cfue_RequestToInstall = confirm(cfue_msg_UpdateAvailable);
					if (cfue_RequestToInstall == true){
						open(cfue_ScriptDownloadHref,'Update');
						GM_setValue('cfue_ScriptVersion',cfue_ScriptVersion);
					};	
				};
				GM_setValue('cfue_LastCheck',cfue_Today);
			};
		};

		if (window.location.href != cfue_ScriptHref) {
			var cfue_ScriptVersion = GM_getValue('cfue_ScriptVersion');
		
			if (!GM_getValue('cfue_ScriptVersionCheck')) {
				GM_setValue('cfue_ScriptVersionCheck',cfue_ScriptVersion);
			};
			var cfue_ScriptVersionCheck = GM_getValue('cfue_ScriptVersionCheck');

			if (cfue_ScriptVersionCheck != cfue_ScriptVersion){
				alert(cfue_msg_UpdateSuccessful);
				GM_setValue('cfue_ScriptVersionCheck',cfue_ScriptVersion);
			};
		};	
	};

//-------------------------------------------------------------------------------------------------------------------
// End of "check for updates easily"
//-------------------------------------------------------------------------------------------------------------------
// End of "Scroogle Plus"
//-------------------------------------------------------------------------------------------------------------------