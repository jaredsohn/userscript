// ==UserScript==
// @name           Google Bookmarks Enhancements 2
// @include        *google.*/bookmarks*
// @exclude        *google.*/bookmarks/bookmarks.html
// @description    The first version of this script ("Google Bookmark Enhacements") was originally written by Daniel Cormier. I removed some features and added a lot own stuff. This script manipulates the Google Bookmarks page (google.*/bookmarks) so that you can navigate through labels much better. In the navigation bar on the left are now only labels, that label at least one bookmark in the search result. That means that only the relevant labels are visible. You have also Plus-links next to the label name, that imitate a folder structure a little bit. You'll have to check it out for yourself. 
// ==/UserScript==

search_field = top. document.forms.namedItem('smhf').elements.namedItem('q');
table = evalXPath("/html/body/table[4]/tbody/tr[2]/td[1]/form/table/tbody", true);
all_labels = new Array();

// evalXPath (XPath, onTop) takes the XPath as a string and onTop as a boolean.
// onTop means if the XPathExpression should be evaluated in the top window (true)
// or not (false).
// at the end a node/HTMLElement is returned.
function evalXPath (XPath, onTop) {
	
	if (onTop) {
		XPathNode = top. document. evaluate(XPath, top. document, null,
			XPathResult. ORDERED_NODE_SNAPSHOT_TYPE, null);
		return XPathNode. snapshotItem(0);
	} else {
		XPathNode = document. evaluate(XPath, document, null,
			XPathResult. ORDERED_NODE_SNAPSHOT_TYPE, null);
		return XPathNode. snapshotItem(0);
	}
	
}

//a function, which gets an XML-string and returns a DOM-tree
function parseXML (XML_string) {
	return (new DOMParser()). parseFromString (XML_string, 'text/xml');
}
	
	
if (parent != window) { // the page is loaded in an iframe
	
	// here's the search result from the iframe (new_bkmk_table)
	var new_bkmk_table = evalXPath ("/html/body/table[4]/tbody/tr[2]/td[4]", false). cloneNode (true);
	// and here's the old search result (old_bkmk_table) from the top window
	var old_bkmk_table = evalXPath ("/html/body/table[4]/tbody/tr[2]/td[4]", true);
	
	// replace the old one with the new one
	old_bkmk_table. parentNode. replaceChild (new_bkmk_table, old_bkmk_table);
	
}

else { // the page is loaded normal
	
	// in search_iframe the search results get displayed
	var search_iframe = document. getElementById("pause_notify_iframe"). cloneNode (false);
	search_iframe. setAttribute ("id", "search_iframe");
	document. body. appendChild (search_iframe);
	
	document.forms.namedItem('smhf'). setAttribute (
		"action",
		"javascript:void(document.getElementById('search_iframe').src='http://" + document. domain + "/bookmarks/find?q='+document.getElementsByName('q')[0].value)"
	);
	
	
	// this fuction sorts array and eliminates all duplicates in it.
	// it returns also the count of every element.
	// for 5 x "label1" and 16 x "label2": {label1, 5, label2, 16}
	function sortAndEliminateDups (array) {
		// sort the array-elements first...
		array.sort();
		// and eliminate the duplicates. they'll get saved in the dupfree-array.
		var dupfree = new Array(array.shift());
		var stop = array.length;
		var j = 1; //thats the counter for the count of every element in array.
		dupfree.push(1);
		for (i=0; i<stop; i++) {
			if (array[0] != dupfree[dupfree.length-2]) {
				dupfree[dupfree.length-1] = j;
				dupfree.push(array.shift());
				dupfree.push((j = 1));
			} else {
				array.shift();
				j++;
			}
		}
		return dupfree;
	}
	
	// returns the count of string in array.
	// array is something that's returned by sortAndEliminateDups().
	function isIn(string, array) {
		for (var k=0; k<array.length; k++) 
			if (string==array[k])
				return array [k+1];
		return 0;
	}
	
	
	// in the following lines we want to get the labels, that label the 
	// bookmarks of the current search results.
	// therefore we make a new search with a xml-output and extract these labels.
	function labelRequest() {
		GM_xmlhttpRequest ({
			method: 'GET',
			url: "http://www.google.com/bookmarks/find?q="+encodeURIComponent(search_field.value)+"&output=xml&num=100000",
			headers: {
				'User-Agent': 'Mozilla/ 4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml',
			},
			onload: function (responseDetails) {
				var xml_tree = parseXML (responseDetails.responseText);
				var label_list = xml_tree. getElementsByTagName ("label");
				var list = new Array(); // list will contain the names as strings of all relevant labels
				for (var j=0; j<label_list.length; j++) // extract the names and put them in the list
					list[j] = label_list[j].firstChild.nodeValue;
				list = sortAndEliminateDups (list); // a list like {label1,5,label2,16}
				var k=0, label_count;
				while ( (lbl_c = top. document. getElementById ("lbl_c_" + k)) != null ) {
					// check how often the label is in the list. if (times==0){...} else (moreoften) {...}
					if ( (label_count = isIn (top. document. getElementById ("lbl_m_" + k). innerHTML, list)) == 0) {  
						// hide the label, when no bookmark is labeled by it.
						lbl_c. setAttribute ("style", "display: none;");
					}
					else {
						//that's for the count of bookmarks in the intersection that have one specific label
						top. document. getElementById ("lbl_m_" + k + "_el"). firstChild. innerHTML = "(" + label_count + ")";
						lbl_c. removeAttribute ("style");
					}
					k++;
				}
			}
		});
	}
	document. getElementsByName("btnSMH")[0]. addEventListener('click', labelRequest, false);
	function html_unescape(input) {
		var div = document.createElement("div");
	
		if (typeof(div.innerHTML != "undefined") && typeof(div.firstChild != "undefined") )
			input = input.replace(/&[a-z0-9#]+;/gi, function(s){ return div.innerHTML = s, div.firstChild.nodeValue; } );
		
		return input;
	}
	
	function containsLabel(label) {
		
		var content = search_field.value;
	
		// Case insensitive check.
		if (content.toLowerCase().indexOf("label:" + label.toLowerCase()) > -1)
			return true;
		else
			return false;
	}
	
	function addLabel() {
		var label = this.getAttribute('name');
		
		if (!containsLabel(label)) 
					search_field.value += ' label:' + label;
		
		// This next bit changes ALL the instances.
		var nodes = document.getElementsByName(label);
		
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].parentNode.replaceChild(createRemoveLabelNode(label), nodes[i]);
		}
		
		document.getElementById('search_iframe').src='http://' + document. domain + '/bookmarks/find?q='+search_field.value;
		labelRequest();
		
	}
	
	function removeLabel(element) {
		var label = this.getAttribute('name');
	
		if (containsLabel(label)) {
			var value = 'label:' + label.toLowerCase();
			var origLength =  search_field.value.length;
			var startIndex = search_field.value.toLowerCase().indexOf(value);
			var newQuery = search_field.value.substring(0, startIndex);
			newQuery += search_field.value.substring(startIndex + value.length, origLength).replace('', '');
			search_field.value = newQuery;
		}
		
		// This next bit changes ALL the instances.
		var nodes = document.getElementsByName(label);
		
		for (var i = 0; i < nodes.length; i++)
			nodes[i].parentNode.replaceChild(createAddLabelNode(label), nodes[i]);
		
		document.getElementById('search_iframe').src='http://' + document. domain + '/bookmarks/find?q='+search_field.value;
		labelRequest();
	}
	
	function createLabelNode(label) {
		var labelNode = document.createElement('a');
		labelNode. setAttribute ('href', 'javascript:void(0)');
		labelNode. name = label;
		
		return labelNode;
	}
	
	function createAddLabelNode(label) {
		var addLabelNode = createLabelNode(label);
		addLabelNode.addEventListener('click', addLabel, false);
		addLabelNode.innerHTML = '+';
		
		return addLabelNode;
	}
	
	function createRemoveLabelNode(label) {
		var removeLabelNode = createLabelNode(label);
		removeLabelNode.addEventListener('click', removeLabel, false);
		removeLabelNode.innerHTML = '-';
		
		return removeLabelNode;
	}
	
	
	var label = null, labelNode = null, newNode = null, tmp = null, i=0;
	
	// the "web"-headline
	var web_hl = table.firstChild;
	
	// take the bookmark-headline and put it on the first cell
	bookmark_hl = document.getElementById("lbl_c_0").previousSibling;
	table. insertBefore (bookmark_hl, web_hl);
	
	// that's for shifting the label elements in the navigation pane.
	// bookmarks should be at the top of the navigation pane.
	
	lbl_c = document.getElementById ("lbl_c_0");
	while (lbl_c != null) {
	
			// paste a "+" or "-" when lbl_c is a label
			if (lbl_c. hasAttribute ("id")) {
				id = lbl_c. getAttribute ("id").replace("c", "m");
				label = html_unescape(document. getElementById (id). innerHTML);
				
				if (label.indexOf(" ") > -1)
					label = '"' + label + '"';
				
				if (containsLabel(label))
					newNode = createRemoveLabelNode(label);
				else
					newNode = createAddLabelNode(label);
			
				cell = lbl_c. firstChild;
				cell.innerHTML="";
				cell.appendChild(newNode);
			}
			
			// insert lbl_c before the web headline
			tmp = lbl_c. nextSibling;
			table. insertBefore (lbl_c, web_hl);
			lbl_c = tmp;
	}
		
}