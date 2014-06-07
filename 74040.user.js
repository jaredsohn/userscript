// ==UserScript==
// @name         Steam Store highlight DRM words
// @author       Denilson Sá
// @version      1.6.2
// @description  Highlight DRM-related words in Steam Store pages.
// @include      http://store.steampowered.com/app/*
// @include      http://store.steampowered.com/sub/*
// @include      https://store.steampowered.com/app/*
// @include      https://store.steampowered.com/sub/*
// ==/UserScript==


// See also this thread:
// http://forums.steampowered.com/forums/showthread.php?t=1537801


(function() {

	var bad_words = [
		/3rd-party DRM/gi
		,/\bSecuROM.?\b/gi
		,/\bTAGES\b/gi
		,/\bGameShield\b/gi
		,/\bSolidshield\b/gi
		,/\bStarforce\b/gi
		,/\bUniloc\b/gi
		,/FrontLine ProActive/gi
		,/(Microsoft ?)?Games For Windows( ?. ?)?( ?LIVE)/gi
		,/www\.gamesforwindows\.com/gi
		,/activate\.ea\.com(\/deauthorize)?/gi
		,/EA (Access|Account)/gi
		,/Microsoft SSA/gi
		,/Ubisoft’?s? Online Services?( Platform)?/gi
		,/(permanent |persistent )(high speed )?Internet( connection| access)?/gi
		,/SINGLE-USE SERIAL CODE/gi
		,/INTERNET CONNECTION.* REQUIRED TO PLAY/gi
		,/CREATION OF( A| AN)? UBISOFT ACCOUNT/gi
		,/([0-9]+ |unlimited )?(per (week|month|year) |total )?(machines? )?activations?( limit)?/gi

		// Matching whitespace to reduce false-positives.
		,/^\s*\bReality Pump\b\s*$/gi
		// This version matches in http://store.steampowered.com/sub/13656/
		,/DRM Reality Pump\b/gi

		// These games use Game For Windows, but that's not described at their
		// store pages
		,/^\s*Kane (&|and) Lynch: Dead Men.?\s*$/g
		,/^\s*Section 8\s*$/g
		,/^\s*Stormrise\s*$/g
		,/^\s*The Club.?\s*$/g
	];

	var ignored_tags = {
		'embed':''
		,'object':''
		,'applet':''
		,'style':''
		,'script':''
		,'input':''
		,'textarea':''
		,'button':''
		,'select':''
		,'option':''
	}


	// List of bad words found at this page
	var found_in_this_page = [];


	// Adds a new match to the found_in_this_page array.
	// Returns the added element.
	function add_match_to_page_list(text, element)
	{
		var new_match = {
			'text' : text.trim()
			,'element' : element
			,'index' : found_in_this_page.length
			,'id' : 'bad_word_' + this.index
		};

		found_in_this_page.push(new_match);
		return new_match;
	}


	// Creates and returns a new element like this:
	// <span class="bad_word" id="bad_word_3">text</span>
	function createBadWordElement(text)
	{
		var elem = document.createElement('span');
		var found = add_match_to_page_list(text, elem);
		elem.setAttribute('class', 'bad_word');
		elem.setAttribute('id', found.id);
		elem.appendChild(document.createTextNode(text));
		return elem;
	}


	// This function receives a list of text elements, and makes the highlight
	// in-place, directly in those elements. However, while doing so, some
	// elements are created and others are deleted. Thus, this function also
	// returns a new list of text elements (that can be passed again for
	// highlighting other words).
	//
	// This function was loosely based on:
	// http://userscripts.org/scripts/show/64232
	function find_highlight_in_elements(bad_word_regexp, text_elements)
	{
		var new_text_elements = [];
		for(var i=0 ; i < text_elements.length ; i++)
		{
			var current = text_elements[i];
			while(1)
			{
				// current is a TextNode always attached to the document tree
				var match = bad_word_regexp.exec(current.nodeValue);
				if(match)
				{
					var current_text = current.nodeValue;

					var before_text = current_text.substring(0, match.index);
					var middle_text = match[0];
					var after_text  = current_text.substring(bad_word_regexp.lastIndex);

					var before = document.createTextNode(before_text);
					var hl_node = createBadWordElement(middle_text);
					var after  = document.createTextNode(after_text);

					var par = current.parentNode;
					par.insertBefore(before, current);
					par.insertBefore(hl_node, current);
					par.insertBefore(after, current);
					par.removeChild(current);

					new_text_elements.push(before);
					current = after;

					// Making it restart from the beginning.
					bad_word_regexp.lastIndex = 0;
				}
				else // no match
				{
					new_text_elements.push(current);
					break;
				}
			}
		}
		return new_text_elements;
	}


	// This is basically the main function of this script.
	// It finds all text nodes in the document and, for each one, tries
	// to find and highlight the bad_words.
	function highlight_words_in_document()
	{
		// Getting all text using XPath
		var result = document.evaluate(
			"//body//text()",  // XPath expression
			document,          // contextNode
			null,              // namespaceResolver
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null               // a previous result
		);
		var result_len = result.snapshotLength;

		for(var text_i=0 ; text_i < result_len ; text_i++)
		{
			var text = result.snapshotItem(text_i);

			// Ignoring hidden text inside some elements:
			if( text.parentNode.nodeType == 1  // Node.ELEMENT_NODE == 1
			&& text.parentNode.nodeName.toLowerCase() in ignored_tags )
			{
				continue;
			}

			var text_elements = [text];
			for(var i=0 ; i < bad_words.length ; i++)
			{
				text_elements = find_highlight_in_elements(bad_words[i], text_elements);
			}
		}
	}


	// Adds a <style> element to the <head>
	function add_style_to_head()
	{
		var head=document.getElementsByTagName('head')[0];
		if(!head)
			return;

		var style=document.createElement('style');
		style.setAttribute('type','text/css');
		style.appendChild(document.createTextNode(
			'span.bad_word { background: #c00 !important; color: white !important; }'
			+ 'div#bad_word_msg { background: #c00; color: white; padding: 0.5em; position: absolute; top: 0; left: 200px; z-index: 999999999; font-size: 11px; line-height: normal; }'
			+ 'div#bad_word_msg a { text-decoration: underline; color: inherit; font: inherit; }'
			+ 'div#bad_word_msg ul, div#bad_word_msg li { list-style: disc; padding: 0; margin: 0; font: inherit; }'
			+ 'div#bad_word_msg ul { display: none; margin-left: 2em; }'
			+ 'div#bad_word_msg:hover ul { display: block; }'
		));
		head.appendChild(style);
	}


	function ignore_case_comparison(a, b)
	{
		a = a.toLowerCase();
		b = b.toLowerCase();
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	}


	function add_message_at_page()
	{
		var body = document.getElementsByTagName('body')[0];
		if(!body)
			return;

		// Get the list of all matched bad words, filter duplicates
		// (ignoring case) and sort this list.
		var keys = {};
		var words = [];
		for(var i=0 ; i < found_in_this_page.length ; i++)
		{
			var text = found_in_this_page[i].text;
			keys[text.toLowerCase()] = text;
		}
		for(var i in keys)
		{
			words.push(keys[i]);
		}
		words.sort(ignore_case_comparison);

		var words_ul_list = '';
		for(var i=0; i < words.length ; i++)
		{
			words_ul_list += '<li>' + words[i] + '</li>';
		}

		var div = document.createElement('div');
		div.setAttribute('id', 'bad_word_msg');
		div.innerHTML = (
			'Warning: Some DRM-related words were found!'
			+ ' (<a href="http://forums.steampowered.com/forums/showthread.php?t=1537801">forum</a>, <a href="http://steamdrm.flibitijibibo.com/the-big-drm-list/">list</a>)'
		);
		var ul = document.createElement('ul');
		ul.innerHTML = words_ul_list;

		div.appendChild(ul);
		body.appendChild(div);
	}


	add_style_to_head();
	highlight_words_in_document();
	if( found_in_this_page.length > 0 )
	{
		add_message_at_page();
	}

})();
