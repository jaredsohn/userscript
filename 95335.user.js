// ==UserScript==
// @name           Google Language Code Changer
// @description    Add a select-box for the hl parameter on google result pages.
// @version        1.0
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.google.*/search?*
// @include        http://www.google*/#*q=*
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/images?*
// @include        http://www.google.*/imghp*
// @exclude        http://www.google.*/s?*
// ==/UserScript==

// Initial list
var list = [];

// Check if Greasemonkey specific functions are available (for Cross-Browser support)
var GM_functions = !((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined));
if (GM_functions) {
	list = GM_getValue("selectedLangs", "").split(" ");
}


// If we are on a NOT on a start page and the ajax isn't enabled, we can insert the selector instantly...
if (!(window.location.hash.match(/q\=/) || window.location.pathname == '/' || window.location.pathname == '/webhp' || window.location.pathname == '/imghp')) {
	insertSelector(list);
}

//... but to be on the safe site we always add the listener
document.addEventListener('DOMAttrModified', DOMAttrModifiedListener, true);

function DOMAttrModifiedListener(e) {
	// thanks to http://www.amirharel.com/2009/07/19/manipulating-google-results-ajax-version/ for the #foot hint
	if (e.target.id == 'foot' && !document.getElementById('glccHl')) {
		insertSelector(list);
	}
}

	
if (GM_functions) {
	GM_registerMenuCommand('Select Language Codes', function() { 
		GM_setValue('selectedLangs'
			, window.prompt('Languages shown in the selection (ex. de for german see http://sites.google.com/site/tomihasa/google-language-codes for full list)'
				  , GM_getValue('selectedLangs', "")
			)
		);
	}, '', 's');
}

function insertSelector(list) {	

	// Thanks to http://sites.google.com/site/tomihasa/google-language-codes for the list
	var codes = 
	['lt','en','ru'];
	
	var names =
	['Lithuanian', 'English', 'Russian']

	if (!list || !list.length || list.length == 0 || (list.length == 1 && list[0] == "")) {
		list = codes;
	}

	var hl = document.getElementsByName('hl');
	var current = list[0]; // default
	if (hl.length > 0) {
		current = hl[0].value;
	}
	
	function generateOption(k) {
		var index = codes.indexOf(k);
		return '<option value="' + k + '"' + ((k == current)? ' selected="selected"' : '') + '>' + ((index == -1) ? k : names[index]) + '</option>';
	};
	
	var container = document.createElement('span');
	container.style.lineHeight = "30px";
	
	var sel = document.createElement('select');
	sel.setAttribute('id','glccHl');
	sel.style.margin = "0 2px";
	sel.innerHTML = list.map(generateOption).join("\n");
	container.appendChild(sel);
	
	var button = document.getElementsByName('btnG')[0];
	button.parentNode.style.whiteSpace = "nowrap";
	button.parentNode.appendChild(container);
	
	sel.addEventListener("change", function (event) {
		document.getElementsByName('hl')[0].value = this.options[this.selectedIndex].value;
		document.getElementsByName('btnG')[0].click();
	}, true);
}