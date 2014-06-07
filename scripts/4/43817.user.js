// ==UserScript==
// @author        Crend King
// @version       1.4
// @name          Search all languages in Wikipedia
// @namespace     http://users.soe.ucsc.edu/~kjin
// @description   Search terms with all languages in Wikipedia.
// @include       http://*.wikipedia.org/*?search=*
// @include       http://*.wikipedia.org/*&search=*
// @include       https://*.wikipedia.org/*?search=*
// @include       https://*.wikipedia.org/*&search=*
// @homepage      http://userscripts.org/scripts/show/43817
// @downloadURL   https://userscripts.org/scripts/source/43817.user.js
// @updateURL     https://userscripts.org/scripts/source/43817.meta.js
// ==/UserScript==

/*

version history

1.4 on 10/06/2012:
- Support https scheme.

1.3 on 03/03/2011:
- Update and bug fix for new Wikipedia structure.

1.2.4 on 05/28/2009:
- Use Firefox native JSON object, which is introduced in Firefox 3.5.

1.2.3 on 03/12/2009:
- Add an Object function to get all properties, which can be considered for general use.

1.2.2 on 03/11/2009:
- Fix bug in search term encoding function, which only replaces the first "+" to "_". Thanks to zanhsieh!

1.2.1 on 03/10/2009:
- Add search term encoding function to convert "+" to "_" (per Wikipedia rule).

1.2 on 03/09/2009:
- Add auto enter.

1.1 on 03/09/2009:
- Add language filter.
- Add intersect function to Array prototype, which can be considered for general use.
- Add comments.

1.0 on 03/07/2009:
- Initial version.

*/


///// preference section /////

// put the prefix code of your interested languages in this filter
// only they will be displayed in the search page
//
// format: var lang_filter = ["en", "de", "zh"];
// leave blank to show all languages (no = sign, or = [])
//
// prefix code are characters between "http://" and "wikipedia.org" in the URL
// for example, the English Wikipedia is http://en.wikipedia.org
// here "en" is the prefix code
const lang_filter = ["en", "de", "zh"];

// automatically enter the corresponding entry in another Wikipedia site
// when the term does not exist in the current language
// stay in the search page if all languages in the Array do not have the search term
// the Array also indicate the priority. for example, if auto_enter = ["en", "zh"]
// try to enter the English Wikipedia if the current language does not have search term
// if English Wikipedia has not, try to enter the Chinese Wikipedia
// if both fail, stay at the search page.
// leave blank to disable auto enter
// make sure all languages specified here are in the language filter
const auto_enter = ["en", "zh"];

// wait interval for AJAX response
// use default value or otherwise you know exactly what you are doing
const wait_interval = 500;


///// code section /////

var search_term;
var page_lang;

var lang_list = [];
var lang_dict = {};
var msg_other_lang;

var has_container = false;
var lang_ul;

// intersect the Array with an Object
// if the other Object is an Array, intersect with values from both Arrays
// otherwise, intersect the values of the Array with the properties of the Object
// return empty Array if the parameter is not an Object
// for better performance, when intersecting two Arrays, use the larger Array as outer one
Array.prototype.intersect = function(that_obj)
{
	// given an Array, return an Object whose properties are the values of the Array
	// otherwise, return directly
	// return empty Object is the parameter is not an Object
	function make_set(obj)
	{
		var ret_set = {};
		
		if (obj instanceof Array)
		{
			for (var i = 0; i < obj.length; i++)
				ret_set[ obj[i] ] = null;
			
			return ret_set;
		}
		else if (obj instanceof Object)
		{
			return obj;
		}
	}
	
	var intersection = [];
	var that_set = make_set(that_obj);
	
	for each (var i in this)
	{
		if (that_set.hasOwnProperty(i))
		{
			intersection.push(i);
		}
	}
	
	return intersection;
}

// get all the property names of the Object except this function
// return them in an Array
Object.prototype.props = function()
{
	var ret_keys = [];
	
	for (var curr_key in this)
	{
		// exclude this function
		if (curr_key != arguments.callee.name)
		{
			ret_keys.push(curr_key);
		}
	}
	
	return ret_keys;
}

// get necessary information from the URL
function url_info()
{
	const address = window.location.toString();
	const lang_end = address.indexOf(".wiki");
	const term_start = address.indexOf("search=") + 7;
	const term_end = address.indexOf("&", term_start);
	
	// the language the user is currently searching	
	page_lang = address.substring(window.location.protocol.length + 2, lang_end);
	search_term = address.substring(term_start, term_end == -1 ? address.length : term_end);
}

function encode_term(term_text)
{
	return term_text.replace(/\+/g, "_");
}

// get language list from Wikipedia
function get_langs()
{
	// use "interwikimap" query method
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: window.location.protocol + "//en.wikipedia.org/w/api.php?format=json&action=query&meta=siteinfo&siprop=interwikimap&sifilteriw=local",
		onload: function(response)
		{
			// parse JSON object
			const query_result = JSON.parse(response.responseText);
			const all_langs = query_result.query.interwikimap;
			
			// create prefix code index
			for each (var curr_lang in all_langs)
			{
				lang_list.push(curr_lang.prefix);
				lang_dict[curr_lang.prefix] = curr_lang;
			}
		}
	});
}

// get "other languages" messages per language
function get_msg_other_lang()
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: window.location.protocol + "//en.wikipedia.org/w/api.php?format=json&action=query&meta=allmessages&amfilter=otherlanguages&amlang=" + page_lang,
		onload: function(response)
		{
			const query_result = JSON.parse(response.responseText);
			msg_other_lang = query_result.query.allmessages[0]["*"];
		}
	});
}

// make the "other languages" container in the search page
function make_container()
{
	var parent_column = document.getElementById("mw-panel");

	var lang_root = document.createElement("div");
	lang_root.setAttribute("id", "p-lang");
	lang_root.setAttribute("class", "portal");

	var lang_title = document.createElement("h5");
	lang_title.textContent = msg_other_lang;
	lang_root.appendChild(lang_title);

	var lang_div = document.createElement("div");
	lang_div.setAttribute("class", "body");

	lang_ul = document.createElement("ul");
	
	lang_div.appendChild(lang_ul);
	lang_root.appendChild(lang_div);
	parent_column.appendChild(lang_root);
}

// send term query to Wikipedia
function query_term()
{
	// perform query only after the language list and "other languages" messages have been retrieved
	if (lang_list.length == 0 || lang_dict.__count__ == 0 || msg_other_lang == undefined)
	{
		// if not yet, wait 1 second
		setTimeout(query_term, wait_interval);
		return;
	}

	var filtered_langs = lang_list.intersect(lang_filter);
	if (filtered_langs.length == 0)
	{
		filtered_langs = lang_list;
	}
	auto_enter = auto_enter.intersect(filtered_langs);
	
	// send queries to filtered languages
	for (var i = 0; i < filtered_langs.length; i++)
	{
		// use "info" query method 
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: window.location.protocol + "//" + filtered_langs[i] + ".wikipedia.org/w/api.php?format=json&action=query&prop=info&titles=" + search_term,
			onload: function(response)
			{
				const query_result = JSON.parse(response.responseText);

				// get responded language prefix code
				const prefix_end = response.finalUrl.indexOf(".wiki");
				const resp_prefix = response.finalUrl.substring(window.location.protocol.length + 2, prefix_end);
				
				// there should be only one property (id) in query_result.query.pages
				id = query_result.query.pages.props()[0];
				
				// if the term does not exist in the specific language version of Wikipedia
				// the responded ID is -1
				if (id == -1)
				{
					lang_dict[resp_prefix].term_exist = false;
				}
				else
				{
					// only make the "other languages" container if there is any response
					if (!has_container)
					{
						make_container();
						has_container = true;
					}
					
					add_lang(resp_prefix);
					
					lang_dict[resp_prefix].term_exist = true;
				}
			}
		});
	}
}

// add the language to the "other languages" container
// also emulate the styles in normal Wikipedia entry pages
function add_lang(lang_prefix)
{
	lang_dict[lang_prefix].url = lang_dict[lang_prefix].url.replace("$1", encode_term(search_term));

	var target_lang = lang_dict[lang_prefix].language;
	if (target_lang == undefined)
	{
		target_lang = lang_prefix;
	}
	
	var curr_anchor = document.createElement("a");
	curr_anchor.setAttribute("href", lang_dict[lang_prefix].url);
	curr_anchor.textContent = target_lang;

	var curr_li = document.createElement("li");
	curr_li.setAttribute("class", "interwiki-" + lang_prefix);
	curr_li.appendChild(curr_anchor);
	
	lang_ul.appendChild(curr_li);
}

// auto enter the first Wikipedia site that has the entry of the search term
function auto_enter_proc()
{
	for (var i = 0; i < auto_enter.length; i++)
	{
		if (!lang_dict.hasOwnProperty(auto_enter[i]) || !lang_dict[ auto_enter[i] ].hasOwnProperty("term_exist"))
		{
			// wait until the information of the first site is responded
			setTimeout(auto_enter_proc, wait_interval);
			break;
		}
		else if (lang_dict[ auto_enter[i] ].term_exist)
		{
			// redirect
			window.location = lang_dict[ auto_enter[i] ].url;
			break;
		}
	}
}

url_info();
get_langs();
get_msg_other_lang();
query_term();
auto_enter_proc();