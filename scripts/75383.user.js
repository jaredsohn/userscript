// ==UserScript==
// @name           F&Fs text improvements
// @description    Add support for viewing unicode characters on the Funny and Fantasy Subs website
// @version        1.0.0.3
// @author         ale5000
// @namespace      http://userjs.ale5000.altervista.org/
// @include        http://fafs.netsons.org/*
// @filename       f&fs-text-improvements.user.js
// @support        Opera(native)|Firefox(Greasemonkey)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function()
{
	var TEXT_NODE = 3, ELEMENT_NODE = 1;

	var replace_code_with_char = function(input)
	{
		var output = "";
		var input_length = input.length;

		for(var pos1 = 0; pos1 < input_length; pos1++)
		{
			var character = input.charAt(pos1);
			if(character == '&' && input.charAt(pos1+1) == '#')
			{
				pos1+=2; // Skip & and #
				var unicode_code = "", start = pos1, unicode_code_temp;

				for( ; pos1 < input_length && pos1 - start < 5; pos1++)
				{
					unicode_code_temp = input.charAt(pos1);
					if(unicode_code_temp == ' ') continue;
					else if(unicode_code_temp == ';') break;
					unicode_code += unicode_code_temp;
				}

				output += String.fromCharCode(unicode_code);
			}
			else
				output += character;
		}
		return output;
	};

	var set_css_whitespace = function(element)
	{
		element.style.whiteSpace = "pre-wrap";	// Standard
		if(window.opera) element.style.whiteSpace = "-o-pre-wrap";	// Old Opera
		if(navigator.product && navigator.product.toLowerCase() == "gecko") element.style.whiteSpace = "-moz-pre-wrap";	// Old Mozilla
	};

	if(location.pathname == '/' || location.pathname == "/index.php")	// Home
	{
		var all_span = document.getElementsByTagName("span");
		var all_span_length = all_span.length;
		var current_span_child;

		for(var i = 0; i < all_span_length; i++)
		{
			if( all_span[i].className == "small forum_thread_title" )	// Home, latest forum discussions
			{
				current_span_child = all_span[i].firstChild;

				if(current_span_child.nodeType == ELEMENT_NODE && current_span_child.nodeName == "A")
					current_span_child.title = current_span_child.title.replace(/&amp;#/g, "&#");
			}
		}
	}

	{
		var is_shoutbox_archive = location.pathname.indexOf("shoutbox_archive.php") >= 0;	// Shoutbox archive
		var all_div = document.getElementsByTagName("div");
		var all_div_length = all_div.length;
		var div_subelements_count;

		for(var i = 0; i < all_div_length; i++)
		{
			if( all_div[i].className == "shoutbox" )							// Shoutbox
			{
				all_div[i].style.wordWrap = "break-word";
				all_div[i].style.width = "165px";

				set_css_whitespace(all_div[i]);
				all_div[i].innerHTML = all_div[i].innerHTML.replace(/<br>/ig, "").replace(/&amp;#/g, "&#");	// <br> is lowercase on Firefox but uppercase on Opera
			}
			else if(is_shoutbox_archive && all_div[i].className == "tbl1")	// Shoutbox archive
			{
				var current_div_childs = all_div[i].childNodes;
				div_subelements_count = current_div_childs.length;

				for(var k = 0; k < div_subelements_count; k++)
					if(current_div_childs[k].nodeType == TEXT_NODE)
						current_div_childs[k].nodeValue = replace_code_with_char(current_div_childs[k].nodeValue);
			}
		}
	}

	if(location.pathname.indexOf("viewthread.php") >= 0)	// Forum
	{
		var all_td = document.getElementsByTagName("td");
		var all_td_length = all_td.length;
		var td_subelements_count;

		for(var i = 0; i < all_td_length; i++)
		{
			if(all_td[i].className == "tbl1" && all_td[i].vAlign == "top")
			{
				var current_td_childs = all_td[i].childNodes;
				td_subelements_count = current_td_childs.length;

				for(var j = 0, current_child; j < td_subelements_count; j++)
				{
					current_child = current_td_childs[j];
					if(current_child.nodeType == TEXT_NODE && current_child.nodeValue != "\n")				// Posts
						current_child.nodeValue = replace_code_with_char(current_child.nodeValue);
					else if(current_child.nodeType == ELEMENT_NODE && current_child.nodeName == "DIV")	// Quote inside posts
					{
						var current_div_childs = current_child.childNodes;

						for(var k = 0; k < current_div_childs.length; k++)
							if(current_div_childs[k].nodeType == TEXT_NODE && current_div_childs[k].nodeValue != "\n")
								current_div_childs[k].nodeValue = replace_code_with_char(current_div_childs[k].nodeValue);
					}
				}
			}
		}
	}
})();
