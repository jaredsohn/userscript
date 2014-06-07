// BarcodeListal
// version 0.5
// 2005-12-13
// Copyright (c) 2007, Benjamin Beckwith
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Portions used from kittycode.js
// Copyright (c) 2000  Dustin Sallings dustin@spy.net
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// --------------------------------------------------------------------
// 0.5  bnb
//      Added support for regular barcode entry as well
// 0.1	bnb
// 	Initial Version
// 
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name          Barcode Listal
// @namespace     http://whitebucket.com/barcodelistal
// @description   Script to use the CueCat barcode scanner to input fields into Listal.  Also allows regular barcode entry
// @include       http://www.listal.com/add/*
// @include       http://www.listal.com/addasin/*
// ==/UserScript==

// Be informative for older versions of Greasemonkey
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// Put in a menu command to set/reset the AWS ID
if (!GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}else{
    GM_registerMenuCommand("(Re)set AWS ID",setAWSID);
}

// Check for an AWS id
if (!GM_getValue('awsid')) {
    // Set the AWS id
    setAWSID();
} 

// Get the stored AWS id
var awsid = GM_getValue('awsid');

// Default message to display next to entry field
var default_message = ' CueCat Or Barcode [Add to Collection]';

// Prompt the user for an AWS (Amazon Web Services) id and store it
// for future use
function setAWSID() {
    var id = prompt("What Amazon Web Services ID would you like to use?");
    GM_setValue('awsid', id);
}

// Create a regular expression to help determine the context
var ctx_reg = new RegExp("add\/(music|books|games|dvd)");
// Try to guess the context based on the window location
// and then store the context for future use.
// This is useful when entering in multiple items
if(ctx_reg.test(window.location.href)){
    var ar = ctx_reg.exec(window.location.href);
    if(ar[1] == 'music'){ GM_setValue('Context','Music');}
    if(ar[1] == 'books'){ GM_setValue('Context','Books');}
    if(ar[1] == 'dvd'  ){ GM_setValue('Context','DVD');}
    if(ar[1] == 'games'){ GM_setValue('Context','VideoGames');}
}

// If the context is unset, set it to books by default
if(!GM_getValue('Context')){
    CCL_Context = 'Books';
    GM_setValue('Context',CCL_Context);
}
// Grab the set context
var CCL_Context = GM_getValue('Context');

// Create a new <div> element
var cc_div = document.createElement("div");
// Put the following into the newly created <div>:
//   1. Select box to change context
//   2. Entry field for CueCat data or barcode
//   3. A <span> element for output messages
cc_div.innerHTML = '<div id="cc_div"><select id="CCL_CONTEXT"><option value="DVD" id="CCL_DVD">DVDs</option><option value="Books" id="CCL_Books">Books</option><option value="Music" id="CCL_Music">Music</option><option value="VideoGames" id="CCL_VideoGames">Games</option></select> Type of item to add.<BR><input type=text id="cc_input"><span id="CCL_MSG" style="margin: 2px 0 1px 0;">'
    +default_message
    +'</span></div>';

// The field for entering in an Amazon asin is named 'asin'
// A reference to that element is created here
asin = document.getElementsByName('asin')[0];
// If a valid reference was obtained,
// then insert the <div> created above before the
// original form
if (asin) {
    form = asin.parentNode;
    form.parentNode.insertBefore(cc_div,form);
}

// Grab a reference to our context <select> element
csel = document.getElementById('CCL_CONTEXT');
// Add a handler to the 'change' event
// This will save a new context if a user changes it via the select box
csel.addEventListener('change',ccls_change,false);
// 'Select' our saved context
document.getElementById('CCL_' + CCL_Context).selected = true;
// Handler to the context <select> element.
// Saves the context if a user changes it
function ccls_change() {
    GM_setValue('Context',csel.childNodes[csel.selectedIndex].value);
}

// Grab a reference to the input text box.
// This is where the user inputs the CueCat data or barcode
ci = document.getElementById('cc_input');
// If a valid reference was gathered,
// add a handler to the 'change' event
// and
// set the focus to this text box
if(ci){
    ci.addEventListener('change',cc_change,false);
    ci.focus();
}

// Handle the changes to the input box
// If a CueCat string is detected, decode the parts of the string and pass them on
// If it is not a CueCat string, then it is assumed to be an UPC string and is passed
// on as such
function cc_change() {
    if(ci.value.length >0) {
	if(ci.value[0] == '.') {
	    getASIN(decodePart(ci.value.split('.')[3]),decodePart(ci.value.split('.')[2]));
	} else {
	    getASIN(ci.value,'UPC');
	}
    }
}

// Here is the attempt to retrieve the Amazon ASIN.
// This function does the following:
//   1. Gets the current context so the correct Amazon store can be queried
//   2. Writes a message to the message <span> to provide feedback to the user
//   3. Builds up a request url based on awsid,upc,type and context
//   4. Launch the request and provide a callback function
//     a. This request returns immediately here and uses the callback upon completion
//     b. The callback function is 'handleResponse'
function getASIN(upc,type) {
    if(type == 'C39') {
    }
    if(type == 'UA5') {
	upc = checkISBN(upcISBNmap(upc.substr(0,6)) + upc.substr(12,5));
	window.location.href = 'http://www.listal.com/addasin/?asin='+upc+'&collection=Add+to+collection';
	return;
    }
    if(type == 'IBN' || type == 'IB5') {
	// Then this is an ISBN and can be redirected straight to the addition page.
	window.location.href = 'http://www.listal.com/addasin/?asin='+checkISBN(upc.substr(3,9))+'&collection=Add+to+collection';
	return;
    }
    // This type, UA2, needs to have the two end characters removed.
    if(type == 'UA2') {
    	upc = upc.substr(0,upc.length-2);
    }
    context = GM_getValue('Context');
    request_url = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId='
	+awsid
	+'&Operation=ItemLookup&ItemId='
	+upc
	+'&IdType=UPC&SearchIndex=' 
	+ context;
    document.getElementById('CCL_MSG').innerHTML = 'Getting Amazon info for:' + upc;
    GM_xmlhttpRequest({
	    method: 'GET',
		url: request_url,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		    'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		onload: handleResponse
		});
}

// This function handes the data returned from the Amazon query
// The data returned is in XML format and is easily parsed.
// This function performs the following:
//   1. Parses the XML into a DOM
//   2. Checks for an error
//     a. Errors are detected by looking for a <ErrorMsg> element
//     b. Error messages are then written out to the screen
//   3. If there are no errors it tries to locate the ASIN
//     a. If found, change the window locatin to submit to Listal
//     b. If not found, show an alert
function handleResponse(responseDetails) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,
				     "application/xml");
    var entries = dom.getElementsByTagName('Error');
    if(entries.length > 0) {
	document.getElementById('CCL_MSG').innerHTML = 'Error Encountered: ' + entries[0].getElementsByTagName("Message")[0].textContent;
    } else {
      	entries = dom.getElementsByTagName('ASIN');
	if(entries.length == 1){
	    window.location.href = 'http://www.listal.com/addasin/?asin='+entries[0].textContent+'&collection=Add+to+collection';
	}else{
	    document.getElementById('CCL_MSG').innerHTML = 'Error Encountered: More than one item matched.';
	}
    }
}

// The methods below are taken or derived from kittycode.js
// Copyright (c) 2000  Dustin Sallings dustin@spy.net

function decodePart(str) {
    var m = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-";
    var result = "";
    var packer = 0;
    var count = 0;
    
    var i = 0;
    for (i=0; i < str.length; i++) {
	// Get the offset to the current character in our map
	var x = m.indexOf(str.charAt(i));
	
	// For invalid characters, point them out really well!
	if(x<0) {
	    result += " > " + str.charAt(i) + " < ";
	    continue;
	}
	
	// only count valid characters...why not?
	count++;
	
	// Pack them bits.
	packer = packer << 6 | x
	    
	    // every four bytes, we have three valid characters.
	    if (count == 4) {
		result += String.fromCharCode((packer >> 16) ^ 67);
		result += String.fromCharCode((packer >> 8 & 255) ^ 67);
		result += String.fromCharCode((packer & 255) ^ 67);
		count=0; packer=0;
	    }
    }
    
    // Now, deal with the remainders
    if(count==2) {
	result += String.fromCharCode((( (packer << 12) >> 16) ^ 67));
    } else if(count == 3) {
	result += String.fromCharCode(( (packer << 6) >> 16) ^ 67);
	result += String.fromCharCode(( (packer << 6) >> 8 & 255) ^ 67);
    }
    return result;
}

function checkISBN(str) {
    var i;
    var sum = 0;
    var len = str.length;
    var result = "";
    if ((len>10) | (len<9) ) {
	return result = "INVALID"; 
    } else {
	len=9;
    }
    for (i=0; i<len; i++) {
	sum += (i+1)* (str.charCodeAt(i)- 48);
    }
    result = sum % 11;
    str = str.substr(0,9);
    if (result==10) {
	str+="X";
    } else {
	str+= result;
    }
    return str;
}

function upcISBNmap(str) {
    var upcisbn=[
		 "014794","08041",
		 "018926","0445",
		 "027778","0449",
		 "037145","0812",
		 "042799","0785",
		 "043144","0688",
		 "044903","0312",
		 "045863","0517",
		 "046594","0064",
		 "047132","0152",
		 "051487","08167",
		 "051488","0140",
		 "060771","0002",
		 "065373","0373",
		 "070992","0523",
		 "070993","0446",
		 "070999","0345",
		 "071001","0380",
		 "071009","0440",
		 "071125","088677",
		 "071136","0451",
		 "071149","0451",
		 "071152","0515",
		 "071162","0451",
		 "071268","08217",
		 "071831","0425",
		 "071842","08439",
		 "072742","0441",
		 "076714","0671",
		 "076783","0553", 
		 "076814","0449",
		 "078021","0872",
		 "079808","0394",
		 "090129","0679",
		 "099455","0061",
		 "099769","0451",
		 "076783","0553"
		 ];
    
    // "076783","0770",  // McClelland-Bantam  or?? "0553",
    
    var j;
    var result="";
    
    for (j=0; j<upcisbn.length; j+=2) {
	if (upcisbn[j]==str) {
	    result=upcisbn[j+1];
	    break;
	}
    }

    if (result=="")
	result=str; 
    return(result);
}
