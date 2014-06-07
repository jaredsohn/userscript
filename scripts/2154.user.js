// ToolTipTranslation
// version 0.3 - Released 05-15-2009
//
// Copyright (c) 2005-2009 Eric Hielscher
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
//
// ToolTipTranslation homepage: http://ehielscher.org/toolTip.php
//
// This script allows one to hover the mouse over words that are displayed
// in pages in Firefox and receive a near-instant translation into another
// language of their choice using a free online dictionary.
//
// In order to use this script, you must first configure it.  The script is set
// up to be run on all webpages by default, but it doesn't actually do
// anything to them until you tell it to.  The script works by tapping the
// the Google Translate dictionaries.  In order to configure the script, go to
// the Firefox menu, then go to Tools -> User Script Commands -> Manage
// Dictionaries.  The configuration screen will pop up.  Fill in the Source and
// Target languages and the urls (including * as a wildcard character) of the
// websites on which you want to use that bi-language dictionary.
//
// You can have multiple different dictionaries used to translate different
// groups of pages.  Click on the Update button to save the changes to any
// given dictionary and the X button in the upper right to close the config
// window.  In order to see the changes you must refresh the webpage
// you were visiting.  In order to get a translation, hover the mouse
// over the word and hit the F4 key.  If there are any matches in the
// dictionary for that string, the first three matches will be displayed.
//
// In addition, as of version 0.2.1 the script saves the words you've looked
// up in cookies which expire after 2 weeks.  This is so that you can extract
// the words you've looked up into a .kvtml file and then practice them later
// using a program like KWordQuiz.  A utility program for performing this
// extraction is downloadable as part of the ToolTipTranslation Package or
// separately at the ToolTipTranslation website.  For now, this is only
// supported in Linux.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// After installation, restart Firefox and revisit this script.
// Under Tools, there will be a new menu item called "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ToolTipTranslation", and click Uninstall.
//
// Portions of this script use modified code from the Familiar Taste
// user script: http://www.blackperl.com/javascript/greasemonkey/ft/
//
// --------------------------------------------------------------------
// ==UserScript==
// @name			  ToolTipTranslation
// @description	Auto Translate Words on a Webpage
// @namespace   http://ehielscher.org
// @include			http*://*
// @require     http://www.google.com/jsapi
// ==/UserScript==
//
// todo: add some intelligent parsing, i.e. allow input of suffixes
//	to drop if there are no matches, etc.
// todo: add support for apostrophes and other punctuation
// todo: allow user to input number of matches to return
// todo: somehow get rid of the convert2RegExp function

(function()
 {
	var midScreen = screen.width / 2;
	var tipContainer1 = null;
	var lookupText = "";
	var lookupNode = null;
	var lang1 = "";
	var lang2 = "";
	var lookupString = "";
	var leftToRight = true;
	var websites = "";

	// I actually took this verbatim from the above-mentioned FT script.
	// 'Close' image taken from the bookburro.user.js script. See
	// http://overstimulate.com/userscripts/bookburro.user.js
	var close_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA" +
		"wAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACX" +
		"BIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SA" +
		"AAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/A" +
		"lpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qv" +
		"lgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL" +
		"7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMh" +
		"o9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCX" +
		"ieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD" +
		"7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPA" +
		"AAAABJRU5ErkJggg==";

  var langs = {
    sq: 'Albanian',
    ar: 'Arabic',
    bg: 'Bulgarian',
    ca: 'Catalan',
    'zh-CN': 'Chinese',
    'zh-TW': 'Chinese (Taiwan)',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    et: 'Estonian',
    tl: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    gl: 'Galician',
    de: 'German',
    el: 'Greek',
    iw: 'Hebrew',
    hi: 'Hindi',
    hu: 'Hungarian',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    lv: 'Latvian',
    lt: 'Lithuanian',
    mt: 'Maltese',
    no: 'Norwegian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sr: 'Serbian',
    sk: 'Slovak',
    sl: 'Slovenian',
    es: 'Spanish',
    sv: 'Swedish',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    vi: 'Vietnamese'
  };

	// Place the tooltip box in the proper place
	var stayHome = function(m)
	{
		var currX = m.pageX;
		var currY = m.pageY;
		var iL = document.body.scrollLeft;
		var iV = document.body.scrollTop;
		if (currX > midScreen - 30)
		{
			var msgWidth = tipContainer1.clientWidth;
			tipContainer1.style.left = (currX - msgWidth - 10 + iL) + 'px';
			tipContainer1.style.left = (currX - msgWidth - 10) + 'px';
		}
		else
		{
			tipContainer1.style.left = (currX + 10) + 'px';
		}
		tipContainer1.style.top = currY + 'px';
	}

	// Create the tooltip div
	var insertFloatMsg = function()
	{
		var styleStr =
		{
			position: "Absolute",
			top: 0,
			left: 0,
			borderStyle: "Solid",
			borderWidth: "1px",
			backgroundColor: "Yellow",
			paddingRight:"5px",
			paddingLeft:"5px",
			paddingTop:"3px",
			paddingBottom:"3px",
			fontFamily:"Tahoma",
			fontSize:"13pt",
			lineHeight:"102%",
			zIndex: 3,
		};
		var newDiv = document.createElement("div");
		for(var i in styleStr)
		{
			newDiv.style[i] = styleStr[i];
		}
		newDiv.id = 'isFloat1';
		newDiv.innerHTML = "&nbsp";
		document.body.appendChild(newDiv);
		tipContainer1 = document.getElementById('isFloat1');
	}

	// Hide the tooltip box
	var hideMessage = function()
	{
		tipContainer1.style.display = 'none';
		while (tipContainer1.lastChild)
		{
			tipContainer1.removeChild(tipContainer1.lastChild);
		}
	}

	// Show the tooltip box
	var showMessage = function(toolTip, currItem)
	{
		//First remove all the old data
		while(tipContainer1.lastChild)
		{
			tipContainer1.removeChild(tipContainer1.lastChild);
		}
		tipTxt = toolTip.split("|");
		tipContainer1.style.display = 'inline';
		for (i=0; i<tipTxt.length; i++)
		{
			 tipContainer1.appendChild(document.createTextNode(tipTxt[i]));
			 tipContainer1.appendChild(document.createElement('br'));
		}
		currItem.addEventListener("mouseout", function(e) {hideMessage();}, false);
	}

	// Initialize the tooltip box
	var initToolTip = function()
	{
		document.addEventListener("mousemove", function(m) {stayHome(m);}, false);
		insertFloatMsg();
		hideMessage();
		document.captureEvents(Event.mousemove);
	}

	// Strip punctuation characters from lookup words
	var stripPunc = function(text)
	{
		return text.replace(/[!.,?&='":]+/g,"");
	}

	// Parse the response from the AJAX query of the database
  // TODO: Can probably just remove this and replace with some simple JSON
  //       stuff
	var parseResponse = function(text)
	{
		var html1 = document.createElement("html");
		html1.innerHTML = text;
		var matches = new Array();
		
		var searchForm = html1.getElementsByTagName("form")[0];
		var linksTable = searchForm.getElementsByTagName("table")[3];
		var linksRow = linksTable.getElementsByTagName("tr")[0];
		var links;
		if (leftToRight)
		{
			links = linksRow.getElementsByTagName("td")[0].
							 getElementsByTagName("a");
		}
		else
		{
			links = linksRow.getElementsByTagName("td")[2].
							 getElementsByTagName("a");
		}
		
		for(var i=1; i<links.length; i += 2)
		{
			if(matches.length < 3)
			{
				wordLoc = links[i].href.indexOf("word.php?w=");
				if (wordLoc != -1)
					matches.push(links[i].href.substring(wordLoc + 11));
			}
			else
			{
				break;
			}
		}
		
		if(matches.length > 0)
		{
			var toolTip = matches[0];
			for(var j=1; j<matches.length; j++)
			{
				toolTip += "|" + matches[j];
			}
			return toolTip;
		}
		return "No Matches";
	}
	
	// Read the tooltip portion of the current cookie
	var readTooltipCookie = function()
	{
		var cookies = document.cookie.split(';');
		for (var i=0; i < cookies.length; i++)
		{
			var c = cookies[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf('lang.user.js=') == 0)
				return c.substring(13, c.length);
		}
		return "";
	}

	// Add a new word to the tooltip cookie
	var addWordToCookie = function(word, response)
	{
		if (response == "No Matches")
			return;
		
		oldCookie = readTooltipCookie();
		
		if (oldCookie.indexOf("[" + word + "|") != -1)
			return;
		
		var date = new Date();
		date.setTime(date.getTime() + (14*24*60*60*1000));
		document.cookie = "lang.user.js=[" + word +
							"|" + response + oldCookie +
							"; expires=" + date.toGMTString();
	}

	// Look up a word in the database
	var lookup = function(e)
	{
		if (e.keyCode != 115)
		{
			return;
		}
		
		// Show a loading message
		showMessage("Loading...", lookupNode);
    
    urlStr = "http://ajax.googleapis.com/ajax/services/language/translate?" +
           "v=1.0&q=" + stripPunc(lookupText) + "&" + lookupString;
		
		GM_xmlhttpRequest(
		{
			method: "GET",
			headers: {'Content-type': 'application/x-www-form-urlencoded',
                'Referer':      window.location.href},
			url: urlStr,
      onload: function(r) {
        eval("rs = " + r.responseText);
        hideMessage();
        addWordToCookie(stripPunc(lookupText), rs.responseData.translatedText);
        showMessage(rs.responseData.translatedText);
      }
		});
	}

	// Copy an array
	var copyArray = function(array1)
	{
		var array2 = new Array();
		var j;
		for (j = 0; j < array1.length; j++)
		{
			array2[j] = array1[j];
		}
		return array2;
	}

	var setLookup = function(lText, lNode)
	{
		lookupText = lText;
		lookupNode = lNode;
	}

	// Add the spans around all the words in the document
	var injectTooltips = function(node)
	{
		if(node.nodeType == 3 && node.nodeValue.length > 0)
		{
			var txt = node.nodeValue;
			var words = txt.split(/[ \t\n]/);
			var j = 0;
			var parent = node.parentNode;
			var curChild = node;
			for(j = words.length - 1; j >= 0; j--)
			{
				if(words[j].length > 0)
				{
					var newSpc = document.createTextNode(" ");
					var span = document.createElement("span");
					span.setAttribute("style","cursor:default");
					span.addEventListener("mouseover",
                                function(e) {setLookup(this.innerHTML, this);},
                                false);
					span.innerHTML = words[j];
					parent.insertBefore(newSpc, curChild);
					parent.insertBefore(span, newSpc);
					curChild = span;
				}
			}
			parent.removeChild(node);
			return;
		}

		var i = 0;
		var children = copyArray(node.childNodes);
		for(i = 0; i < children.length; i++)
		{
			injectTooltips(children[i]);
		}
	}

	var closeConfig = function(win)
	{
		win.style.display = 'none';
	}

	// Post the configuration <div> on the browser window
	var showConfig = function()
	{
		var configPane = buildConfig();

		// Attach to the main document <body>
		var body = document.getElementsByTagName("body");
		body[0].appendChild(configPane);
		clearSites();

		// Now make it visible
		configPane.style.display = 'block';
	}

	// Create the configuration panel as a <div> containing various HTML/form
	// elements.
	var buildConfig = function()
	{
		var parameters = [ // The parameters to be presented in the form
			{ name: "lang1", label: "Source Language:", type: "select",
			value: lang1, options: langs,
			help: "Enter the source language to be translated" },
			{ name: "lang2", label: "Target Language:", type: "select",
			value: lang2, options: langs,
			help: "Enter the target language into which to translate" },
			{ name: "sites", label: "Websites on which to use this dictionary:",
			type: "textarea", value: websites,
			help: "Enter the websites on which you want to use this dictionary" },
			{ name: "Update", label: "", type: "button", value: "Update",
			help: "Update the websites for this dictionary" },
		];
		var configPane = document.createElement("div");  // Everything goes here

		// Style the div, first
		configPane.setAttribute("style",
					"margin: 3em 15%; width: 70%; position: fixed; " +
					"top: 0; left: 0; border: thin solid black; " +
					"color: black; background: #ffc; opacity: 0.9; " +
					"-moz-border-radius: 10px; font-size: 12pt; " +
					"z-index: 99999; padding: 6px; display: none; " +
					"font-family: Arial, sans-serif;");
		configPane.setAttribute("id", "tooltip_translation_config");

		// Start with a top-level form and table.
		var form = document.createElement("form");
		form.setAttribute("method", "get");
		form.setAttribute("action", "");
		form.setAttribute("id", "tooltip_translation_config");
		form.setAttribute("style", "padding: 0; margin: 0;");
		var table = document.createElement("table");
		table.setAttribute("style",
					"width: 100%; margin: 5px; padding: 5px; " +
					"border-spacing: 0;");
		table.setAttribute("id", "ttt_config_table");
		form.appendChild(table);
		var caption = document.createElement("caption");
		caption.setAttribute("style", "width: 100%; text-align: left");
		strong = document.createElement("strong");
		var close = document.createElement("img");
		close.setAttribute("src", close_data);
		
		close.setAttribute("style", "float: right; vertical-align: top; " +
					"margin: 2px; width: 12px; height: 12px; " +
					"background-color: #ffb; border: none;");
		close.setAttribute("title", "Click To Close");
		close.setAttribute("id", "ttt_config_close");
		close.addEventListener('click',
					function(e) { closeConfig(configPane); },
					false);
		strong.appendChild(close);
		strong.appendChild(document.createTextNode(" ToolTip Translation Options"));
		caption.appendChild(strong);
		table.appendChild(caption);
		var row = document.createElement("tr");
		var col = document.createElement("td");
		col.setAttribute("colSpan", "2");
		var helpText = document.createTextNode(
      "To use the ToolTip Translation script, chose a source language which " +
      "you want to be translated and a target language into which to " +
      "translate it.  Then fill in expressions for the groups of websites " +
			"on which you want to use the ToolTip Translation script, each group " +
      "separated by a blank line.  If you've already filled in some websites " +
      "for a given pair of languages, your saved websites should be loaded " +
      "automatically once you enter the languages in the websites textbox.  " +
      "Use a * character to represent any text.  For example, to translate " +
      "from Dutch to English, chose Dutch as the Source language and English " +
      "as the Target.  Then, in order to translate all webpages with a .nl " +
      "suffix, fill in the following as one of the lines for this pair of " +
      "languages: http*://*.nl/*  Finally, click on the Update " +
      "to save your changes for this language pair and click on the X in " +
      "the upper right corner to close this window when you are finished.  " +
			"You'll have to refresh a webpage for the changes to take effect.  " +
			"In order to translate a word, hover the mouse over the word and then " +
			"press the F4 key.  If there are matches for this word in the " +
      "Google dictionary then the first three will be displayed.");
		col.appendChild(helpText);
		row.appendChild(col);
		table.appendChild(row);
		table.appendChild(document.createElement("br"));
		
		// Insert rows for the configuration items
		for(var idx = 0; idx < parameters.length; idx++)
		{
			table.appendChild(make_config_row(parameters[idx]));
		}
		
		configPane.appendChild(form);
		return configPane;
	}

	// Create one table-row with the basic stylings and the content based on
	// the parameter object passed in
	var make_config_row = function(param)
	{
		var name = param['name'];
		var value = param['value'];
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.setAttribute("style",
					"width: 50%; text-align: right; padding-right: 3px");
		cell.appendChild(document.createTextNode(param['label']));
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("style",
					"width: 50%; text-align: left; padding-left: 3px");
		var control;
		var helptext = param['help'] || '';
		switch(param['type'])
		{
			case 'string':
				control = document.createElement("input");
				control.setAttribute("id", "ttt_config_elem_" + name);
				control.setAttribute("type", "text");
				control.setAttribute("size", 35);
				control.setAttribute("title", helptext);
				control.setAttribute("name", name);
				control.setAttribute("value", value);
				control.addEventListener("blur",
					function(ev) {clearSites();},
					false);
				break;

			case 'integer':
				control = document.createElement("input");
				control.setAttribute("id", "ttt_config_elem_" + name);
				control.setAttribute("type", "text");
				control.setAttribute("size", 8);
				control.setAttribute("title", helptext);
				control.setAttribute("name", name);
				control.setAttribute("value", value);
				control.addEventListener("blur",
					function(ev) {clearSites();},
					false);
				break;

      case 'select':
        control = document.createElement("select");
        control.setAttribute("id", "ttt_config_elem_" + name);
        control.setAttribute("title", helptext);
        control.setAttribute("name", name);
        control.setAttribute("value", value);
        control.addEventListener("blur",
          function(ev) {clearSites();},
          false);

        opts = param['options'];
        for (lang in opts) {
          opt = document.createElement("option");
          opt.setAttribute("value", lang);
          opt.appendChild(document.createTextNode(langs[lang]));
          control.appendChild(opt);
        }

        break;

			case 'boolean':
				// Start with a <span> to contain the two radiobuttons and text
				control = document.createElement("span");
				control.setAttribute("id", "ttt_config_elem_" + name);

				// First radiobox, for "yes"
				var radiobox = document.createElement("input");
				radiobox.setAttribute("type", "radio");
				radiobox.setAttribute("name", "ttt_config_elem_bool_" + name);
				radiobox.setAttribute("id", "ttt_config_elem_bool_" + name + "_yes");
				radiobox.setAttribute("value", "yes");
				if(value)
				{
					radiobox.setAttribute("checked", value);
				}

				control.appendChild(radiobox);

				// The word "yes" and some padding space
				control.appendChild(document.createTextNode(" yes   "));

				// Second radiobox, for "no"
				radiobox = document.createElement("input");
				radiobox.setAttribute("type", "radio");
				radiobox.setAttribute("name", "ttt_config_elem_bool_" + name);
				radiobox.setAttribute("id", "ttt_config_elem_bool_" + name + "_no");
				radiobox.setAttribute("value", "no");
				if(!value)
				{
					radiobox.setAttribute("checked", ! value);
				}

				control.appendChild(radiobox);

				// The word "no" and padding
				control.appendChild(document.createTextNode(" no"));
				break;

			case 'textarea':
				control = document.createElement("textarea");
				control.setAttribute("id", "ttt_config_elem_" + name);
				control.setAttribute("type", "text");
				control.setAttribute("cols", 35);
				control.setAttribute("rows", 4);
				control.setAttribute("title", helptext);
				control.setAttribute("name", name);
				control.setAttribute("value", value);
				break;

			case 'button':
				control = document.createElement("input");
				control.setAttribute("id", "ttt_config_elem_" + name);
				control.setAttribute("type", "button");
				control.setAttribute("name", name);
				control.setAttribute("title", helptext);
				control.setAttribute("value", value);
				control.addEventListener("click",
					function(ev) {updateDictInfo();},
					false);
				break;

			default:
				control = null;
				break;
		}

		if(control != null)
		{
			cell.appendChild(control);
		}

		row.appendChild(cell);
		return row;
	}

	// Clear out the website's TextArea
	var clearSites = function()
	{
		sites = document.getElementById('ttt_config_elem_sites');
		lang1El = document.getElementById('ttt_config_elem_lang1');
		lang2El = document.getElementById('ttt_config_elem_lang2');
		dictIndex = lang1El.value + '|' + lang2El.value;
		sites.value = GM_getValue('ttt_' + dictIndex, "").replace(/\|/, '\n');
	}

	// Update this dictionary's websites
	var updateDictInfo = function()
	{
		lang1El = document.getElementById('ttt_config_elem_lang1');
		lang2El = document.getElementById('ttt_config_elem_lang2');
	  sites = document.getElementById('ttt_config_elem_sites');
		parsedSites = sites.value.replace(/[ \t]/g, '');
		parsedSites = parsedSites.replace('\n', '|');
		dictIndex = lang1El.value + '|' + lang2El.value;
		GM_setValue('ttt_' + dictIndex, parsedSites);
		configInfo = GM_getValue('configInfo', "");
		if(configInfo.indexOf(dictIndex) >= 0)
		{
			regEx = new RegExp(dictIndex.replace(/\|/, '\\\|') + '\\\|.*\\\[');
			GM_setValue('configInfo',
                  configInfo.replace(regEx,
                                     dictIndex + '|' + parsedSites + '['));
		}
		else
		{
			GM_setValue('configInfo', configInfo + dictIndex + '[');
		}
	}

	// Load which dictionary to use for this page from the configuration
	var loadDict = function()
	{
		configInfo = GM_getValue('configInfo', '');
		if(configInfo != '')
		{
			dicts = configInfo.split('[');
			for(i = 0; i < dicts.length; i++)
			{
				dictSites = GM_getValue('ttt_' + dicts[i], '').split('|');
				for(j = 0; j < dictSites.length; j++)
				{
					pattern = convert2RegExp(dictSites[j]);
					if(window.location.href.match(pattern))
					{
						dictInfo = dicts[i].split('|');
						lookupString = "langpair=" + dictInfo[0] + "%7C" + dictInfo[1];
						websites = GM_getValue('ttt_' + dicts[i], '').replace(/\|/, '\n');
						return true;
					}
				}
			}
		}
		return false;
	}

	// Converts a pattern in this programs simple notation to a regular
  // expression.
  //
	// thanks AdBlock! http://www.mozdev.org/source/browse/adblock/adblock/
  //
	// I really didn't want to include this in my userscript since it's a part of
  // GM, but I was told that there's no way to include it other than copying it
  // in so in it goes for now.
	var convert2RegExp = function(pattern)
	{
		s = new String(pattern);
		res = new String("^");
		
		for (var i = 0 ; i < s.length ; i++)
		{
			switch(s[i]) 
			{
				case '*' : 
					res += ".*";
					break;
				
				case '.' : 
				case '?' :
				case '^' : 
				case '$' : 
				case '+' :
				case '{' :
				case '[' : 
				case '|' :
				case '(' : 
				case ')' :
				case ']' :
					res += "\\" + s[i];
					break;
				
				case '\\' :
					res += "\\\\";
					break;
				
				case ' ' :
					// Remove spaces from URLs.
					break;
		
				default :
					res += s[i];
					break;
			}
		}
		
		var tldRegExp = 
      new RegExp("^(\\^(?:[^/]*)(?://)?(?:[^/]*))(\\\\\\.tld)((?:/.*)?)$");
		var tldRes = res.match(tldRegExp);
		if(tldRes)
		{
			// build the mighty TLD RegExp
			var tldStr = "\.(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com)"
		
			// insert it
			res = tldRes[1] + tldStr + tldRes[3];
		}
  		return new RegExp(res + '$', "i");
	}

	// Initialize the script
	var initLang = function()
	{
		GM_registerMenuCommand("Manage Dictionaries", showConfig);
		
		if(loadDict())
		{
			injectTooltips(document.body);
			initToolTip();
		}
	}
	// Don't start the script until the window is loaded as we're munching the
  // DOM tree
	document.addEventListener("keypress", lookup, true);
	window.addEventListener("load", initLang, false);
 })();
