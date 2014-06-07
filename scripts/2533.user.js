// ==UserScript==
// @name         Markdown textareas
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.1 - Adds Markdown button to textareas
// @include      http://userscripts.org/scripts/show/*
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2006-01-05

*/

var button, div;
var textareas = document.getElementsByTagName('textarea');
if (textareas && textareas.length) {
	for (var i = 0; i < textareas.length; i++) {
		div = document.createElement('div');
		button = document.createElement('button');
		button.setAttribute('type', 'button')
		button.innerHTML = 'Markdown';
		button.addEventListener('click', function(e){
			e.target.parentNode.firstChild.value = Markdown(e.target.parentNode.firstChild.value);
		}, false);
		textareas[i].parentNode.insertBefore(div, textareas[i]);
		div.appendChild(textareas[i]);
		div.appendChild(document.createElement('br'));
		div.appendChild(button);
	}
}


// Folowing script is copied as is from http://rephrase.net/box/js-markdown/thingy/markdown.js


//
// Markdown  -  A text-to-HTML conversion tool for web writers
//
// Copyright (c) 2005 John Gruber  
// <http://daringfireball.net/projects/markdown/>
//
// Copyright (c) 2005 Michel Fortin - PHP Port  
// <http://www.michelf.com/projects/php-markdown/>
//
// Copyright (c) 2005 Sam Angove - this JavaScript port
// <http://rephrase.net/box/js-markdown/>
//
// Most of this was ported directly from the Perl version, with
// the PHP used as a reference. All credit goes to John and Michel.
//
//
// (Except for the bugs I introduced -- they're all mine.)
//
//				Version 1.01b4, 2005.01.06
// 				Based on Markdown v1.01 
//
// 1.01 b2: mostly working, announce on markdown-discuss
// 1.01 b3: fix stupid HTML comments bug (I want to save $2, not $1...)
//			remove extra newlines in blockquotes (Symptom, I think, not problem.)
// 1.01 b4: kludge: add an extra newline in DoLists, fixes a whitespace error


// Globals

md_empty_element_suffix = " />";
md_tab_width = 4
md_tab_width = 4;

md_html_blocks = new Array();
md_urls = new Array();
md_titles = new Array();


md_list_level = 0;
	
md_nested_brackets_depth = 6;
	md_nested_brackets = str_repeat('[^\\[\\]]+|\\[', md_nested_brackets_depth) + str_repeat('\\]*', md_nested_brackets_depth);






function Markdown(text) {


	// Kludge #1: add some whitespace; otherwise you can't start a document with a list.
	text = "\n\n"+text;

	text = text.replace("\r\n", "\n");
	text = text.replace("\r", "\n");
	
	text += "\n\n";
	
	

	text = Detab(text);
	
	text = text.replace('/^[ \t]+$/m', '');
	
	text = HashHTMLBlocks(text);
	
	text = StripLinkDefinitions(text);
	
	
	text = RunBlockGamut(text);
	
	//text = EncodeAmpsAndAngles(text);
	
	text = UnescapeSpecialChars(text); // uh, again
	
	text = text.replace(/^(\n|\s)*/, "").replace(/(\n|\s)*$/, ""); // in case my added whitespace is still there
	
	return text+"\n";

}



function fakemd5(chars) {

	// Paj's JavaScript md5 library is a full 9KB, and I imagine it's way slower than this.
	//
	// Since we only really *need* it to generate unique ids that are unlikely
	// to collide with normal text, any freakish and unique string will do.
	// This uses different characters to the real md5 sums (they're still used to encode special
	// characters), but any can be used, really.

	if (!chars) {
		chars = "qvxptrghj";
	}

	r = "";
	for (i=0; i<32; i++) {
		rand = Math.floor(Math.random()*chars.length);
	r += chars.charAt(rand)
	}

	return r;
}


//
// a friendly helper function

function str_repeat(str, count) {
	out="";
	for (i = 0; i < count; i++) {
		out+=str;
	}
	return out;
}

function Detab(text) {
	
	// global md_tab_width
		
	text = text.replace(/(.*?)\t/g, function(match, substr) {
		return substr += str_repeat(" ", (md_tab_width - substr.length % md_tab_width)); 
		});
	return text;
}


//
// Since there's no genuine md5 encoding included anymore, these values are hardcoded.
//
// There's doubtless a more efficient way of doing this.
//

function UnescapeSpecialChars(text) {

text = text.replace(/7f8137798425a7fed2b8c5703b70d078/gm, "\\")
text = text.replace(/833344d5e1432da82ef02e1301477ce8/gm, "`")
text = text.replace(/3389dae361af79b04c9c8e7057f60cc6/gm, "*")
text = text.replace(/b14a7b8059d9c055954c92674ce60032/gm, "_")
text = text.replace(/f95b70fdc3088560732a5ac135644506/gm, "{")
text = text.replace(/cbb184dd8e05c9709e5dcaedaa0495cf/gm, "}")
text = text.replace(/815417267f76f6f460a4a61f9db75fdb/gm, "[")
text = text.replace(/0fbd1776e1ad22c59a7080d35c7fd4db/gm, "]")
text = text.replace(/84c40473414caf2ed4a7b1283e48bbf4/gm, "(")
text = text.replace(/9371d7a2e3ae86a00aab4771e39d255d/gm, ")")
text = text.replace(/01abfc750a0c942167651c40d088531d/gm, "#")
text = text.replace(/5058f1af8388633f609cadb75a75dc9d/gm, ".")
text = text.replace(/9033e0e305f247c0c3c80d0c7848c8b3/gm, "!")
text = text.replace(/853ae90f0351324bd73ea615e6487517/gm, ":")
return text;
}

function Houdini(trick) {

// Houdini, escape... ? It was very late, I was tired, okay?

trick = trick.replace(/\\/mg, "7f8137798425a7fed2b8c5703b70d078");
trick = trick.replace(/\`/mg, "833344d5e1432da82ef02e1301477ce8");
trick = trick.replace(/\*/mg, "3389dae361af79b04c9c8e7057f60cc6");
trick = trick.replace(/\_/mg, "b14a7b8059d9c055954c92674ce60032");
trick = trick.replace(/\{/mg, "f95b70fdc3088560732a5ac135644506");
trick = trick.replace(/\}/mg, "cbb184dd8e05c9709e5dcaedaa0495cf");
trick = trick.replace(/\[/mg, "815417267f76f6f460a4a61f9db75fdb");
trick = trick.replace(/\]/mg, "0fbd1776e1ad22c59a7080d35c7fd4db");
trick = trick.replace(/\(/mg, "84c40473414caf2ed4a7b1283e48bbf4");
trick = trick.replace(/\)/mg, "9371d7a2e3ae86a00aab4771e39d255d");
trick = trick.replace(/\#/mg, "01abfc750a0c942167651c40d088531d");
trick = trick.replace(/\./mg, "5058f1af8388633f609cadb75a75dc9d");
trick = trick.replace(/\!/mg, "9033e0e305f247c0c3c80d0c7848c8b3");
trick = trick.replace(/\:/mg, "853ae90f0351324bd73ea615e6487517");

return trick;
}

function antiEm(toto) {

//there's no place like home
	
toto = toto.replace(/\*/mg, "3389dae361af79b04c9c8e7057f60cc6");
toto = toto.replace(/\_/mg, "b14a7b8059d9c055954c92674ce60032");

return toto;
}

function EncodeBackslashEscapes(trick) {

trick = trick.replace(/\\\\/mg, "7f8137798425a7fed2b8c5703b70d078");
trick = trick.replace(/\\\`/mg, "833344d5e1432da82ef02e1301477ce8");
trick = trick.replace(/\\\*/mg, "3389dae361af79b04c9c8e7057f60cc6");
trick = trick.replace(/\\\_/mg, "b14a7b8059d9c055954c92674ce60032");
trick = trick.replace(/\\\{/mg, "f95b70fdc3088560732a5ac135644506");
trick = trick.replace(/\\\}/mg, "cbb184dd8e05c9709e5dcaedaa0495cf");
trick = trick.replace(/\\\[/mg, "815417267f76f6f460a4a61f9db75fdb");
trick = trick.replace(/\\\]/mg, "0fbd1776e1ad22c59a7080d35c7fd4db");
trick = trick.replace(/\\\(/mg, "84c40473414caf2ed4a7b1283e48bbf4");
trick = trick.replace(/\\\)/mg, "9371d7a2e3ae86a00aab4771e39d255d");
trick = trick.replace(/\\\#/mg, "01abfc750a0c942167651c40d088531d");
trick = trick.replace(/\\\./mg, "5058f1af8388633f609cadb75a75dc9d");
trick = trick.replace(/\\\!/mg, "9033e0e305f247c0c3c80d0c7848c8b3");
trick = trick.replace(/\\\:/mg, "853ae90f0351324bd73ea615e6487517");

return trick;
}


function UnslashQuotes(text) {
/*#
#	This function is useful to remove automaticaly slashed double quotes
#	when using preg_replace and evaluating an expression.
#	Parameter:  String.
#	Returns:    The string with any slash-double-quote (\") sequence replaced
#				by a single double quote.
#*/
	return text.replace("\\\"", "\"");
}


function DoItalicsAndBold(text) {
	//# <strong> must go first:
	text = text.replace(/(__)([^_]+)(__)/g, "<strong>$2</strong>");
	text = text.replace(/(\*\*)([^\*]+)(\*\*)/g, "<strong>$2</strong>");
	//# Then <em>:
	text = text.replace(/(_)([^_]+)(_{1})/g, "<em>$2</em>");
	text = text.replace(/(\*)([^\*]+)(\*{1})/g, "<em>$2</em>");

	return text;
}


function DoAnchors(text) {
// Turn Markdown link shortcuts into XHTML <a> tags.
//
	

	//
	// First, handle reference-style links: [link text] [id]
	//
	
	r = "(\\[("+md_nested_brackets+")\\][ ]?(?:\\n[ ]*)?\\[([\\S\\s]*?)\\])";
	i = new RegExp(r, "g");

	text = text.replace(i, function(match, str1, str2, str3, str4, str5, str6, str7, str8, str9) {
		


		whole_match = str1;
		link_text   = str2;

		link_id     = str3.toLowerCase();

		if (link_id == "") {
		
			link_id = link_text.toLowerCase();     // for shortcut links like [this][].
		
		}

		if (md_urls[link_id]) {
			url = md_urls[link_id];
			url = antiEm(url);
			result = '<a href="'+url+'"';
			
			if (md_titles[link_id]) {
				title = md_titles[link_id];
				title = antiEm(title);
				result += " title=\""+title+"\"";
			}
			result += ">"+link_text+"</a>";
		}
		else {
			result = whole_match;
		}
		return result;
	} );
	
	// Next, inline-style links: [link text](url "optional title")
		 
	r = "(\\[("+md_nested_brackets+")\\][ \\t]*\\(<?(\\S*)>?[ \\t]*((['\"])(.*?)\\5)?\\))";
	i = new RegExp(r, "g");
	//i = /(\[(>[^\[\]]+|\[)\]\([ \t]*<?(.*?)>?[ \t]*((['"])(.*?)\5)?\))/g
	
		
	text = text.replace(i, function(match, str1, str2, str3, str4, str5, str6) {
		
		whole_match = str1;
		link_text   = str2;
		url	  		= str3;
		title		= str6;

		url = antiEm(url);
		
		result = '<a href="'+url+'"';

		if (title) {
			title = title.replace("\"", "&quot;");
			url = antiEm(url);
			result +=  " title=\""+title+"\"";
		}

		result += ">"+link_text+"</a>";

		return result;
	} );

	return text;
}


function DoImages(text) {
//
// Turn Markdown image shortcuts into <img> tags.
//
	

	//
	// First, handle reference-style labeled images: ![alt text][id]
	//
	text = text.replace(/(!\[([\s\S]*?)\][ ]?(?:\n[ ]*)?\[([\s\S]*?)\])/gm, function(match, str1, str2, str3) {
		
		whole_match = str1;
		alt_text    = str2;
		link_id     = str3.toLowerCase();

		if (link_id == "") {
			link_id = alt_text.toLowerCase();     // for shortcut links like ![this][].
		}

		alt_text = alt_text.replace("\"", "&quot;");
		if (md_urls[link_id]) {
			url = md_urls[link_id];
			url = antiEm(url);
			

			result = "<img src="+url+" alt=\""+alt_text+"\"";
			if (md_titles[link_id]) {
				title = md_titles[link_id];
				title = antiEm(title);
				result += " title=\""+title+"\"";
			}
			result += md_empty_element_suffix;
		} else {
			// If there's no such link ID, leave intact:
			result = whole_match;
		}

		return result;
	} );

	//
	// Next, handle inline images:  ![alt text](url "optional title")
	// Don't forget: encode * and _

	text = text.replace(/(!\[([\s\S]*?)\]\([ \t]*<?(\S+?)>?[ \t]*(([\'\"])([\s\S]*?)\5[ \t]*)?\))/g, function(match, str1, str2, str3, str4, str5, str6) {
	
		whole_match = str1;
		alt_text    = str2;
		url	  		= str3;
		title		= '';
		if (str6) {
			title		= str6;
		}

		alt_text = alt_text.replace("\"", "&quot;");
		title = title.replace("\"", "&quot;");
		
			url = antiEm(url);
					
		result = "<img src="+url+" alt=\""+alt_text+"\"";
		if (title) {
			title = antiEm(title);
			result += " title=\""+title+"\"";
		}
		result += md_empty_element_suffix;

		return result;
	} );

	return text;
}
	
	



function DoCodeSpans(text) {
/*#
# 	*	Backtick quotes are used for <code></code> spans.
#
# 	*	You can use multiple backticks as the delimiters if you want to
# 		include literal backticks in the code span. So, this input:
#
#		  Just type ``foo `bar` baz`` at the prompt.
#
#	  	Will translate to:
#
#		  <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
#
#		There's no arbitrary limit to the number of backticks you
#		can use as delimters. If you need three consecutive backticks
#		in your code, use four for delimiters, etc.
#
#	*	You can use spaces to get literal backticks at the edges:
#
#		  ... type `` `bar` `` ...
#
#	  	Turns to:
#
#		  ... type <code>`bar`</code> ...
#

	text = text.replace(/([\`]+)(.+?)(\1)/g, "<code>$2</code>");
*/
	
	r = /(`+)(.+?)\1(?!`)/g
	text = text.replace(r, function(match, str1, str2) {
		str2 = str2.replace(/^[ \t]*/g, "");
		str2 = str2.replace(/[ \t]*$/g, "");
		str2 = EncodeCode(str2);
		return "<code>"+str2+"</code>";
	} );

	return text;

}

function EncodeCode(c) {
	
	
	
	c = c.replace(/\&/gm, '&amp;');
	c = c.replace(/\</gm, '&lt;');
	c = c.replace(/\>/gm, '&gt;');
	
	c = Houdini(c);

	return c;
}


function RunSpanGamut(text) {
/* #
# These are all the transformations that occur *within* block-level
# tags like paragraphs, headers, and list items.
# */
	
	text = DoCodeSpans(text);

	// moved "do hard breaks" up here 'cos EscapeSpecialChars eats trailing spaces.
	// don't *think* it breaks anything...
	text = text.replace(/[ ]{2,}$\n/gm, "<br"+md_empty_element_suffix+"\n");

	text = EscapeSpecialChars(text);



	//# Process anchor and image tags. Images must come first,
	//# because ![foo][f] looks like an anchor.

	text = DoImages(text);
	text = DoAnchors(text);

	//# Make links out of things like `<http://example.com/>`
	//# Must come after _DoAnchors(), because you can use < and >
	//# delimiters in inline links like [this](<url>).

	text = DoAutoLinks(text);

	//# Fix unencoded ampersands and <'s:
	text = EncodeAmpsAndAngles(text);

	text = DoItalicsAndBold(text);



	return text;
}



function DoHeaders(text) {
	
	r = "^(.+)[ \\t]*\\n=+[ \\t]*\\n+";
	i = new RegExp(r, "gm");
	text = text.replace(i, function(match, str1) { return "<h1>"+RunSpanGamut(str1)+"</h1>\n\n"; } );
	
	r = "^(.+)[ \\t]*\\n-+[ \\t]*\\n+";
	i = new RegExp(r, "gm");
	text = text.replace(i, function(match, str1) { return "<h2>"+RunSpanGamut(str1)+"</h2>\n\n"; } );
	
	

	r = "^(\#{1,6})[ \\t]*(.+?)[ \\t]*\#*\\n+";
	reg = new RegExp(r, "gm");
	text = text.replace(reg, function(match, str1, str2) { 
		
		h_level = str1.length;
		return "<h"+h_level+">"+RunSpanGamut(str2)+"</h"+h_level+">\n\n";
		});
	
	return text;
}

function Outdent(text) {

	r = "^(\\\\t|[ ]{1,"+md_tab_width+"})";
	i = new RegExp(r, "gm");
	return text.replace(i, "");
}

function rtrim ( $s )
{
	return $s.replace( /\s*$/, "" );
}

function ProcessListItems(list_str, marker_any) {

	/*
	# The $g_list_level global keeps track of when we're inside a list.
	# Each time we enter a list, we increment it; when we leave a list,
	# we decrement. If it's zero, we're not in a list anymore.
	#
	# We do this because when we're not inside a list, we want to treat
	# something like this:
	#
	#		I recommend upgrading to version
	#		8. Oops, now this line is treated
	#		as a sub-list.
	#
	# As a single paragraph, despite the fact that the second line starts
	# with a digit-period-space sequence.
	#
	# Whereas when we're inside a list (or sub-list), that line will be
	# treated as the start of a sub-list. What a kludge, huh? This is
	# an aspect of Markdown's syntax that's hard to parse perfectly
	# without resorting to mind-reading. Perhaps the solution is to
	# change the syntax rules such that sub-lists must start with a
	# starting cardinal number; e.g. "1." or "a.".
	*/

	md_list_level++;

	// Trim trailing blank lines.
	// JS has no \z for end of data -- so I'll add a ridiculous flag on the end and check for it.
	// $ without /m is end of input (instead of end-of-line), but that doesn't work here?
	// And to think John called the md_list_level thing a kludge...
	
	eflag = "someunlikelystringrahrahrah";
	//eflag = fakemd5("kasldklasd");
	list_str = list_str.replace(/([\s\S]*)\n{2,}/gm, "$1"+eflag);
	
	// "$1\n"+eflag gets nested lists working a bit, but causes other problems
	
	// Original regexp with \z
    // r = "(\\n)?(^[ \\t]*)("+marker_any+")[ \\t]+((?:[\\s\\S]+?)(\\n{1,2}))(?=\\n*(\\z|\\2("+marker_any+")[ \\t]+))";
	
	r = "(\\n)?(^[ \\t]*)("+marker_any+")[ \\t]+((?:[\\s\\S]+?)(\\n{1,2}))(?=\\n*("+eflag+"|\\2("+marker_any+")[ \\t]+))";
	 
	reg = new RegExp(r, "gm");



	list_str = list_str.replace(reg, function(match, str1, str2, str3, str4) {
		
		item = str4;
		leading_line = str1;
		leading_space = str2;

					
		if (leading_line || (item.match(/\n{2,}/gm))) {
			
			item = RunBlockGamut(item);

		} else {
			//# Recursion for sub-lists:
			item = DoLists(Outdent(item));
			item = item.replace(/\n*$/, ""); // does this replace chomp/rtrim?
			
			item = RunSpanGamut(item);
		}

		return "<li>" + item + "</li>\n";
	} );

	md_list_level--;

	list_str = list_str.replace(eflag, "");
	return list_str;

}


function DoLists(text) {
	
	less_than_tab = md_tab_width - 1;

	//# Re-usable patterns to match list item bullets and number markers:
	marker_ul  = '[*+-]';
	marker_ol  = '\\d+[.]';
	marker_any = '(?:[*+-]|\\d+[.])';

	//whole_list = '(([ ]{0,'+less_than_tab+'}((?:[*+-]|\\d+[.]))[ \\t]+)(?:[\\s\\S]+?)(\\z|\\n{2,}(?=\\S)(?![ \\t]*(?:[*+-]|\\d+[.])[ \\t]+)))';
	whole_list = '(([ ]{0,'+less_than_tab+'}((?:[*+-]|\\d+[.]))[ \\t]+)(?:[\\s\\S]+?)(\$|\\n{2,}(?=\\S)(?![ \\t]*(?:[*+-]|\\d+[.])[ \\t]+)))';
	
	flag = "ridiculousendlistflag";
	
	text = text+flag;
	
	/*
	# We use a different prefix before nested lists than top-level lists.
	# See extended comment in _ProcessListItems().
	#
	# Note: There's a bit of duplication here. My original implementation
	# created a scalar regex pattern as the conditional result of the test on
	# $g_list_level, and then only ran the text =~ s{...}{...}egmx
	# substitution once, using the scalar as the pattern. This worked,
	# everywhere except when running under MT on my hosting account at Pair
	# Networks. There, this caused all rebuilds to be killed by the reaper (or
	# perhaps they crashed, but that seems incredibly unlikely given that the
	# same script on the same server ran fine *except* under MT. I've spent
	# more time trying to figure out why this is happening than I'd like to
	# admit. My only guess, backed up by the fact that this workaround works,
	# is that Perl optimizes the substition when it can figure out that the
	# pattern will never change, and when this optimization isn't on, we run
	# afoul of the reaper. Thus, the slightly redundant code to that uses two
	# static s/// patterns rather than one conditional pattern. */

	if (md_list_level) {
		
		r = '^(([ ]{0,3}((?:[*+-]|\\d+[.]))[ \\t]+)(?:[\\s\\S]+?)('+flag+'|\\n{2,}(?=\\S)(?![ \\t]*(?:[*+-]|\\d+[.])[ \\t]+)))';
		
		i = new RegExp(r, "gm");
				
		text = text.replace(i, function(match, str1, str2, str3) {
		
				list = str1;
				i = new RegExp(marker_ul, "gm");
				if (str3.match(i)) {
					list_type = "ul";
				} else {
					list_type = "ol";
				}
				
				//# Turn double returns into triple returns, so that we can make a
				//# paragraph for the last item in a list, if necessary:
				list = list.replace(/\n{2,}/g, '\n\n\n');
				
				result = ProcessListItems(list, marker_any);
				result = "<"+list_type+">\n"+result+"</"+list_type+">\n";
				return result;
			} );
	} else {
		
		r = '(?:\\n\\n|\\A\\n?)(([ ]{0,3}((?:[*+-]|\\d+[.]))[ \\t]+)(?:[\\s\\S]+?)('+flag+'|\\n{2,}(?=\\S)(?![ \\t]*(?:[*+-]|\\d+[.])[ \\t]+)))';
		
		i = new RegExp(r, "gm");

		
		text = text.replace(i, function(match, str1, str2, str3) {
			
			list = str1;
				i = new RegExp(marker_ul, "gm");
				if (str3.match(i)) {
					list_type = "ul";
				} else {
					list_type = "ol";
				}
				
				//# Turn double returns into triple returns, so that we can make a
				//# paragraph for the last item in a list, if necessary:
				list = list.replace(/\n{2,}/g, '\n\n\n');
				result = ProcessListItems(list, marker_any);
				result = "\n<"+list_type+">\n" + result + "</"+list_type+">\n";
				return result;
			} );
	}

//alert(text);
//alert(flag);
text = text.replace(flag, "");

	return text;
}



function DoCodeBlocks(text) {
//#
//#	Process Markdown `<pre><code>` blocks.
//#
// $m_tab_width hard coded?
	

	
	r = "(?:\\n\\n|\\A)((?:(?:[ ]{"+md_tab_width+"}|\\t).*\\n+)+)((?=^[ ]{0,"+md_tab_width+"}\\S)|\$)";
	i = new RegExp(r, "gm");
	

	text = text.replace(i, function(match, str1) {
		
		codeblock = str1;
			
		codeblock = EncodeCode(Outdent(codeblock));
		
		codeblock = Detab(codeblock);
		
		codeblock = codeblock.replace(/\A\n+/gm, "");
		
		codeblock = codeblock.replace(/\s+$/g, "");
		
		result = "\n\n<pre><code>" + codeblock + "\n</code></pre>\n\n";

		return result;
	} );

	return text;
}

function DoBlockQuotes(text) {
	
	
	text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(match, str1) {
		
		bq = str1;
			bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");	//# trim one level of quoting
			
			bq = bq.replace(/^[ \t]+$/gm, "");			//# trim whitespace-only lines
			bq = RunBlockGamut(bq);						//# recurse
			
			bq = bq.replace(/\n+$/, "");
			bq = bq.replace(/^/gm, "  ");
			//# These leading spaces screw with <pre> content, so we need to fix that:
			bq = bq.replace(/(\s*<pre>[\s\S]+?<\/pre>)/g, function(match, str1) {
				pre = str1;
				pre = pre.replace(/^  /mg, "");
					return pre;
				} );
				
			
			
			return "<blockquote>\n"+bq+"\n</blockquote>\n\n";
		} );


	return text;
}



function dechex($char) {
$char = $char.toString(16)
return $char;
}

function EncodeEmailAddress($addr) {


	$matches = $addr.match(/([^\:])/g);
	
	$r = Math.round(Math.random()*100);
	$newaddr = "";
	for (var $match in $matches) {
		$newaddr += rencode($matches[$match]);
		}
		$m = ""
	for ($i=0; $i<6; $i++) {
		 $m+=rencode("mailto".charAt($i));
		 }
	
	$addr = '<a href="'+$m+':'+$newaddr+'">'+$newaddr+'</a>';
return $addr;
}		

			function rencode($char) {
						
			$r = Math.round(Math.random()*100);
			
			// roughly 10% raw, 45% hex, 45% dec
			// '@' *must* be encoded. I insist.
						
			if ($r > 90 && $char != "@") { return $char; }
			else if ($r < 45) { return "&#x"+$char.charCodeAt(0).toString(16)+";"; }
			else { return "&#"+$char.charCodeAt(0)+";"; }
			}	


function DoAutoLinks(text) {
	         
	text = text.replace(/<((https?|ftp):[^'">\s]+)>/gi, function(match, str1) {
		str1 = antiEm(str1);
		return '<a href="'+str1+'">'+str1+'</a>';
	});

	//# Email addresses: <address@domain.foo>

	
	text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gmi, function(match, str1) {
		
		return EncodeEmailAddress(UnescapeSpecialChars(str1));
	} );
	
	//text = Houdini(text); // hashify special characters. 
	
	return text;
}


function FormParagraphs(text) {
//#
//#	Params:
//#		text - string to process with html <p> tags
//#


	//# Strip leading and trailing lines:
	text = text.replace(/\A\n+/mg, "");
	text = text.replace(/\n+\z/mg, "");

	grafs = text.split(/\n{2,}/mg);

	//#
	//# Wrap <p> tags.
	//#
	for (var i in grafs) {
		if (!md_html_blocks[grafs[i]]) {
			
			
			// don't process blocks (all wrapped in some <tag>, but let through <autolinks> -- another kludge for you to enjoy
			if (grafs[i] && (grafs[i].match(/\S+/gm)) && !grafs[i].match(/^[<](?!((https?|ftp):[^'">\s]+)>|(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>)/mi)) {
				grafs[i] = RunSpanGamut(grafs[i]);
				grafs[i] = "<p>"+grafs[i];
				//grafs[i] = grafs[i].replace(/^([ \t]*)/mg, "<p>");
				grafs[i] += "</p>";
			}
		}
	}

	//#
	//# Unhashify HTML blocks
	//#

	for (var i in grafs) {
				
		if (md_html_blocks[grafs[i]]) {
						
			grafs[i] = md_html_blocks[grafs[i]];
		}
	}

	return grafs.join("\n\n");
}


function RunBlockGamut(text) {

//
// These are all the transformations that form block-level
// tags like paragraphs, headers, and list items.
//
	

	text = DoHeaders(text);



	// Do Horizontal Rules:

	text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, "\n<hr"+md_empty_element_suffix+"\n");
	text = text.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, "\n<hr"+md_empty_element_suffix+"\n");
	text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, "\n<hr"+md_empty_element_suffix+"\n");
	
	


	text = DoLists(text); // Half working, TO DO FIXME!

	text = DoCodeBlocks(text);

	



	text = DoBlockQuotes(text); // nested blockquotes don't work



	//# We already ran _HashHTMLBlocks() before, in Markdown(), but that
	//# was to escape raw HTML in the original Markdown source. This time,
	//# we're escaping the markup we've just created, so that we don't wrap
	//# <p> tags around block-level tags.
text = HashHTMLBlocks(text);


text = FormParagraphs(text);

	return text;
}

function RunBlockQuoteGamut(text) {
// recursion doesn't work at present
	text = DoHeaders(text);

	text = text.replace(/^( ?\* ?){3,}$/m, "\n<hr"+md_empty_element_suffix+"\n");
	text = text.replace(/^( ?- ?){3,}$/m, "\n<hr"+md_empty_element_suffix+"\n");
	text = text.replace(/^( ?_ ?){3,}$/m, "\n<hr"+md_empty_element_suffix+"\n");
	

	text = DoLists(text); // Half working, TO DO FIXME!

	text = DoCodeBlocks(text);

	text = DoAutoLinks(text);

text = HashHTMLBlocks(text);

text = FormParagraphs(text);


	return text;
}



/*

function EncodeBackslashEscapes(text) {
//
// 	Parameter:  String.
//	Returns:    The string, with after processing the following backslash
//				escape sequences.
//
	
	// Must process escaped backslashes first.
		
	for (var $i in md_backslash_escape_table)

{
  text = text.replace($i, md_backslash_escape_table[$i]);
}
  
  return text;
}
*/
	
function HashHTMLBlocks(text) {
	
	//
	// global md_tab_width
	less_than_tab = md_tab_width-1;
	
	block_tags_a = 'p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del';
	block_tags_b = 'p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math'
	
	r = "(^<("+block_tags_a+")\\b(.*\\n)*?<\\/\\2>[ \\t]*(?=(\\n+|\\Z)))";
	
	reg = new RegExp(r, "gm");
	
	text = text.replace(reg, function(match, str1, str2) {
		key=fakemd5();
		while (md_html_blocks[key]) {
			key=fakemd5(); 
		}
		md_html_blocks[key] = str1;
		return "\n\n"+key+"\n\n"; 
		});
	
	
	r = "(^<("+block_tags_b+")\\b(.*\\n)*?.*<\\/\\2>[ \\t]*(?=(\\n+|\\Z)))";
	reg = new RegExp(r, "gm");
	text = text.replace(reg, function(match, str1, str2) { 
		key=fakemd5();
		while (md_html_blocks[key]) {
			key=fakemd5(); 
		}
		md_html_blocks[key] = str1;
		return "\n\n"+key+"\n\n"; 
		});
	
	//
	// Special case for <hr />. Since JS doesn't support lookbehind, mightn't work right.
	
	r = "(?:(\\n\\n)|\\A\\n?)([ ]{0,"+less_than_tab+"}<(hr)\\b([^<>])*?\\/?>[ \\t]*(?=\\n{2,}|\\Z))";
	
	reg = new RegExp(r, "gm");
	
	text = text.replace(reg, function(match, str1, str2) {
		key=fakemd5();
		while (md_html_blocks[key]) {
			key=fakemd5(); 
		}
		md_html_blocks[key] = str2;
		return "\n\n"+key+"\n\n"; 
		});
	
	//
	// Special case for standalone comments. Same as above -- no lookbehind, mightn't work right.
		
	r = "(?:(\\n\\n)|\\A\\n?)([ ]{0,"+less_than_tab+"}(?:<!(--[\\s\\S]*?--\\s*)+>)[ \\t]*(?=\\n{2,}|\\Z))";
	
	reg = new RegExp(r, "gm");
	
	text = text.replace(reg, function(match, str1, str2) {
		key=fakemd5();
		while (md_html_blocks[key]) {
			key=fakemd5(); 
		}
		md_html_blocks[key] = str2;
		return "\n\n"+key+"\n\n"; 
		});
	

	return text;
}	

function StripLinkDefinitions(text) {
   	
   r = "^[ ]{0,"+less_than_tab+"}\\[(.+)\\]:[ \\t]*\\n?[ \\t]*<?(\\S+)>?[ \\t]*\\n?[ \\t]*(?:[\"(](.+?)[\")][ \\t]*)?(?:\\n+|\\Z)";
   reg = new RegExp(r, "gm");
   
	text = text.replace(reg, function(match, str1, str2, str3) {
		
		link_id = str1.toLowerCase();
				
		md_urls[link_id] = EncodeAmpsAndAngles(str2);
		
		if (str3) {
			md_titles[link_id] = str3;
		}
		
		return "";
	} );



return text;
}
	


function htmlentities(text) {
	
// Note: just uses the hex entities. Easier than a gigantic associative array.

$re = /(%([a-zA-Z0-9]{1,4}))/g
$escaped = escape(text);
$entitized = $escaped.replace($re, "&#x$2;")

return $entitized;

}


function EncodeAmpsAndAngles(text) {
// Smart processing for ampersands and angle brackets that need to be encoded.

	text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");

 	text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;"); 

	return text;

}


function EscapeSpecialChars(text) {
	
	tokens = TokenizeHTML(text);
	
	text = '';   
//	$in_pre = 0;  # Keep track of when we're inside <pre> or <code> tags.
//	$tags_to_skip = "!<(/?)(?:pre|code|kbd|script|math)[\s>]!";

	for (var i in tokens) {

		if (tokens[i].type == "tag") {
			// Within tags, encode * and _ so they don't conflict
			// with their use in Markdown for italics and strong.
			// We're replacing each such character with its
			// corresponding MD5 checksum value; this is likely
			// overkill, but it should prevent us from colliding
			// with the escape values by accident.
			
			t = tokens[i].value;
			t = antiEm(t);
			text += t;
			
		} else {
			t = tokens[i].value;
			
			t = EncodeBackslashEscapes(t);
			text += t;
		}
	}
	
	return text;
}



function TokenizeHTML(string) {
	
	//
	//   Parameter:  String containing HTML markup.
	//   Returns:    An array of the tokens comprising the input
	//               string. Each token is either a tag (possibly with nested,
	//               tags contained therein, such as <a href="<MTFoo>">, or a
	
	// actually, I have no idea if this version will work with nested tags like that -- haven't tested it
	
	//               run of text between tags. Each element of the array is a
	//               two-element array; the first is either 'tag' or 'text';
	//               the second is the actual value.
	//
	//   Returns: An array of objects with "type" and "value".
	//
	//
	//   Regular expression derived from the _tokenize() subroutine in 
	//   Brad Choate's MTRegex plugin.
	//   <http://www.bradchoate.com/past/mtregex.php>
	//

	function token(type, value) {
   		this.type = type;
   		this.value = value;
   	}

	tokens = new Array();

	r = /(?:<!(--[\s\S]*?--\s*)+>)|(?:<\?[\s\S]*?\?>)|(?:<[a-z\/!$](?:[^<>]|(?:<[a-z\/!$](?:[^<>]|(?:<[a-z\/!$](?:[^<>]|(?:<[a-z\/!$](?:[^<>]|(?:<[a-z\/!$](?:[^<>]|(?:<[a-z\/!$](?:[^<>])*>))*>))*>))*>))*>))*>)/i


	while (r.test(string)) {
		txt = RegExp.leftContext;
		tag = RegExp.lastMatch;

		tokens.push(new token("text", txt));
		tokens.push(new token("tag", tag));
						
		string = string.replace(txt, "");
		string = string.replace(tag, "");

	}
	
	// everything past the last tag
	
	if (string != "") {
		tokens.push(new token("text", string));
	}  

return tokens;
}
