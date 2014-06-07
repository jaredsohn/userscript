// ==UserScript==
// @name           Userscripts.org: Extended "Scriptwright"-Links
// @namespace      http://www.n-regen.bplaced.de
// @description    Adds the number of scripts a user has written to the link "Scriptwright" in the Userscripts.org forum.
// @include        http://userscripts.org/topics*
// ==/UserScript==

function str_replace(search, replace, subject) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 903.3016
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var s = subject;
    var ra = r instanceof Array, sa = s instanceof Array;
    var f = [].concat(search);
    var r = [].concat(replace);
    var i = (s = [].concat(s)).length;
    var j = 0;
    
    while (j = 0, i--) {
        if (s[i]) {
            while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
        }
    }

    return sa ? s : s[0];
}


var lnks = document.getElementsByTagName("a");
var questions = new Array();
var answers = new Array();
var nofl = 0;
for (index in lnks)
{
	if (lnks[index].innerHTML == "Scriptwright")
	{
		nofl = nofl + 1;
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: lnks[index].href,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'text/html',
		    },
		    onload: function(responseDetails) {
		        document.getElementsByTagName("body")[0].innerHTML = str_replace('<a href="/users/'+responseDetails.responseText.match(/users.([0-9]+)/)[1]+'/scripts">Scriptwright</a>', '<a href="/users/'+responseDetails.responseText.match(/users.([0-9]+)/)[1]+'/scripts">Scriptwright ('+responseDetails.responseText.match(/([0-9]+) scripts/)[1]+')</a>', document.getElementsByTagName("body")[0].innerHTML);
		    }
		});
	}
}
