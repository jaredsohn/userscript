// ==UserScript==
// @name           Twitter Alphabetize DM List
// @namespace      http://www.3greeneggs.com
// @description    Alphabetizes the dropdown list of direct message recipients.
// @include        http://twitter.com/direct_messages
// ==/UserScript==

// read in the list
var selectlist = document.getElementById("user_id");

if (selectlist.hasChildNodes()) {
	var num_contacts = selectlist.childNodes.length; // get number of contacts
	var names = []; 
	contacts = new Object(); // create contacts object-as-associative-array

	for (i=0;i<num_contacts;i+=2) { // skip closing tags
		if (selectlist.childNodes[i]) { // make sure this is defined
			contacts[selectlist.childNodes[i].innerHTML] = selectlist.childNodes[i].getAttribute("value");
			names.push(selectlist.childNodes[i].innerHTML);
		}
	}
	
	// case-insensitive, alphabetical sort
	names.sort(function(x,y){ 
	      var a = String(x).toUpperCase(); 
	      var b = String(y).toUpperCase(); 
	      if (a > b) return 1; 
	      if (a < b) return -1; 
	      return 0; 
	    });
	
	// build the correct string of HTML
	var options;
	for (var i in names)
	{
		options += "<option value=\""+contacts[names[i]]+"\">"+names[i]+"</option>\n";
	}
	
	selectlist.innerHTML = options; // update the drop-down list
}