// ==UserScript==
// @author         Crend King
// @version        2.4
// @name           Favorite items first in Google
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Show the favorite items (e.g. Wikipedia entries) at the top of the Google search result.
// @include        http://www.google.com/search?*
// @include        https://www.google.com/search?*
// @homepage       http://userscripts.org/scripts/show/55641
// @downloadURL    https://userscripts.org/scripts/source/55641.user.js
// @updateURL      https://userscripts.org/scripts/source/55641.meta.js
// ==/UserScript==

/*

version history

2.4 on 04/04/2014
- Fix failed item promotion due to Google update.

2.3 on 06/16/2013
- Fix wrong order of promoted items for some special cases.

2.2 on 06/09/2013:
- Fix wrong order of promoted items.

2.1 on 04/25/2013:
- Fix script for Google's new dropdown menu.

2.0 on 03/22/2013:
- Refactor the preference structure for easier use. Due to this substantial change, bump the major version number.
- Fix incompatibility with Google Search.

1.5 on 06/16/2012:
- Fix bug if match_pattern is configured as an array.

1.4 on 05/17/2011:
- Support multiple marking rules and styles.

1.3 on 05/16/2011:
- remove support for Google SearchWiki, as abandoned by Google.
- Optimize code.

1.2 on 11/08/2009:
- add feature to select items by both title and/or link address.

1.1.1 on 08/14/2009:
- Fix bug: when the original top two or more results are Wikipedia entries, their order flips.

1.1 on 08/13/2009:
- Move entries to the top immediately.
- Promote all Wikipedia entries in the first page.
- Use special background color to mark promoted entries.

1.0 on 08/13/2009:
- Initial version.

*/


///// preference section /////

/*
Array of pattern objects that defines the rule of highlighting
Each object consists of three properties
  title: regular expression to match the search entry's entire title
  address: regular expression to match the search entry's entire address
  style: CSS style that is applied to the matched entries
If title or address is null, such property will always be considered "matched" for all entries
If both title and address are not null, only entries with both matches are considered "matched"
If style is null, global_style is used instead. If global_style is null again, such pattern is ignored
*/
var patterns = [
	{
		title: null,
		address: /^(http:\/\/|https:\/\/)?\w+\.wikipedia\.org\//,
		style: 'background-color: #CCFF99 !important; padding: 0.5em; border-radius: 0.5em'
	},
	{
		title: null,
		address: /^(http:\/\/|https:\/\/)?stackoverflow\.com\//,
		style: 'background-color: #FFEEDD !important; padding: 0.5em; border-radius: 0.5em'
	}
]

// CSS style of the matched entries
// Used only when the individual style property is null
// If both individual and global style is null, the pattern will be ignore
// For good fail-safe, please never leave this as null
var global_style = 'background-color: #CCFF99 !important; padding: 0.5em; border-radius: 0.5em';


///// code section /////

(function(){
// ignore invalid patterns
var valid_patterns = [];
for (var i = 0; i < patterns.length; ++i)
{
	var curr_pattern = patterns[i];
	if (curr_pattern.title == null && curr_pattern.address == null)
		continue;

	var curr_style = curr_pattern.style ? curr_pattern.style : (global_style ? global_style : null);
	if (curr_style == null)
		continue;

	valid_patterns.push({
		title: curr_pattern.title,
		address: curr_pattern.address,
		style: curr_style
	});
}


var res_ol = document.querySelector('#search ol');
var res_lis = res_ol.querySelectorAll('li.g');
var first_unmatched_entry = null;

// apply all rules
for (var i = 0; i < res_lis.length; ++i)
{
	var curr_li = res_lis[i];
	var curr_title = curr_li.getElementsByClassName('r')[0];
	var curr_addr = curr_li.getElementsByTagName('cite')[0];

	if (!curr_title || !curr_addr)
		continue;

	var matched;
	for (var j = 0; j < valid_patterns.length; ++j)
	{
		var curr_pattern = valid_patterns[j];
		matched = true;

		// match the result
		if (curr_pattern.title != null)
			matched &= (curr_title.textContent.match(curr_pattern.title) != null);
		if (curr_pattern.address != null)
			matched &= (curr_addr.textContent.match(curr_pattern.address) != null);

		if (matched)
		{
			if (first_unmatched_entry != null)
			{
				// promote if matched
				first_unmatched_entry.parentNode.insertBefore(curr_li, first_unmatched_entry);
			}

			// apply style
			curr_li.style.cssText += curr_pattern.style;

			break;
		}
	}

	if (!matched && first_unmatched_entry == null)
	{
		first_unmatched_entry = res_lis[i];
	}
}
})();