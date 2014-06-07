// ==UserScript==
// @name           vBulletin Nested Quote
// @namespace      http://home.att.net/~k.brazier/programs/javascript/
// @description    Helps you nest the first [quote] tag in a message.
// @include        http://*/newreply.php?*
// @include        http://*/editpost.php?*
// ==/UserScript==

// Constants:
var buttonText = 'Nest Quote';
var errText = "Can't nest quote: ";
var urlprefix = document.URL.substr(0,document.URL.indexOf('newreply.php'));

// Create the AJAX object.
var xmlhttp=null;

// Find the text area.
var textarea = document.getElementById('vB_Editor_001_textarea');
var textarea_insertpoint = -1;
var requote = /\[QUOTE=[^;\]]+;/;
var preNewline = '\n';
var postID = null;
// Add a button to the page...
// Find the div to put it in.
var pageDiv = document.evaluate("//div[@class='smallfont'][contains(text(),'Logged in as')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// Create the Quote More! button.
var mydiv = document.createElement("div");
var qmbutton = document.createElement("input");
qmbutton.className = 'button';
qmbutton.type = 'BUTTON';
qmbutton.style.cursor = "pointer";
qmbutton.addEventListener("click", doQuote, false);
qmbutton.setAttribute('id','butNestQuote');
qmbutton.value = buttonText;
if(textarea == undefined) qmbutton.disabled = true;
mydiv.appendChild(qmbutton);
pageDiv.appendChild(mydiv);

function reenable() {
	qmbutton.disabled = false;
	textarea.disabled = false;
	qmbutton.value = buttonText;
}
// Function first called when clicking Quote More!
function doQuote(e) {
	// Disable this button and the text area.
	qmbutton.disabled = true;
	textarea.disabled = true;
	qmbutton.value = 'Working...';
	// Find the innermost quote in the text area,
	// starting from the first.
	var tatext = textarea.value.toUpperCase();
	textarea_insertpoint = tatext.search(requote);
	if(textarea_insertpoint >= 0) {
		var postidpos = textarea_insertpoint+7;
		preNewline = '\n';
		textarea_insertpoint = tatext.indexOf(']',textarea_insertpoint)+1;
		while(tatext.substr(textarea_insertpoint,1) == ' ' || tatext.substr(textarea_insertpoint,1) == '	' || tatext.substr(textarea_insertpoint,1) == '\n') {
			if(tatext.substr(textarea_insertpoint,1) == '\n') preNewline = '';
			textarea_insertpoint++;
		}
		// Go through contiguous quotes.
		while(tatext.substr(textarea_insertpoint,7) == '[QUOTE=' && tatext.indexOf(';',textarea_insertpoint) > 0 && tatext.indexOf(';',textarea_insertpoint) < tatext.indexOf(']',textarea_insertpoint)) {
			preNewline = '\n';
			postidpos = textarea_insertpoint+7;
			textarea_insertpoint = tatext.indexOf(']',textarea_insertpoint)+1;
			while(tatext.substr(textarea_insertpoint,1) == ' ' || tatext.substr(textarea_insertpoint,1) == '	' || tatext.substr(textarea_insertpoint,1) == '\n') {
				if(tatext.substr(textarea_insertpoint,1) == '\n') preNewline = '';
				textarea_insertpoint++;
			}
		}
		postidpos = tatext.indexOf(';',postidpos)+1;
		postID = tatext.substring(postidpos, tatext.indexOf(']',postidpos))
		var geturl = urlprefix + 'showpost.php?p=' + postID;

		//alert("Getting page: "+geturl);

		// Create an AJAX call to get that post.
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=findFirstQuote;
		xmlhttp.open("GET",geturl,true);
		xmlhttp.send(null);
	} else {
		reenable();
		alert(errText+"no quoted post found.");
	}
}
function findFirstQuote() {

	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
		// Check the return value.  If it's not a post, alert the user.
		var gotPostOK = true;
		var quoteid = '';
		if (xmlhttp.status!=200 && xmlhttp.responseText.indexOf('id="post_message_'+postID+'"') < 0) gotPostOK = false;
		if(gotPostOK) 
		{// 200 = "OK"
			var xmlDoc=document.createElement('div');
			xmlDoc.innerHTML = xmlhttp.responseText;
			//alert("Got responseText OK.");
			//alert("Getting element by ID: post_message_"+postID);
			// Search the return value for a quote. If none is found alert the user.
			quoteid = document.evaluate("//div[@id='post_message_"+postID+"']//img[@alt='View Post']/..", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
			if(quoteid == null) gotPostOK = false;
			else quoteid = quoteid.href;
			xmlDoc.innerHTML = '';
		}
		// Get the quote's message id.
		if(gotPostOK) {
			//alert("Got post OK.");
			var postidx = quoteid.match(/[?&]p=\d+/);
			if(postidx == null) gotPostOK = false;
			else quoteid = postidx[0].substr(3);
		}
		if(gotPostOK) {
			qmbutton.value = '50% done...';
			// Create an AJAX call to get that message quoted.
			var geturl = urlprefix + 'newreply.php?do=newreply&p=' + quoteid;
			//alert("Getting quote page: "+geturl);
			//reenable();
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=addQuotedMessage;
			xmlhttp.open("GET",geturl,true);
			xmlhttp.send(null);
		}
		if(!gotPostOK) {
			// Reenable the button and textarea.
			reenable();
			if(quoteid == null) alert(errText+"Quoted post has no nested quote.");
			else alert("Couldn't GET the original post (status="+xmlhttp.status+").\nThe site might be down.  Save a copy of your work!");
		}
	}
}
function unescape_ent(str) {
    var temp = document.createElement("div");
    temp.innerHTML = str;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild)
    return result;
}
function addQuotedMessage() {
	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
		var gotPostOK = true;
		var quote = '';
		if (xmlhttp.status!=200 && xmlhttp.responseText.indexOf('id="vB_Editor_001_textarea"') < 0) gotPostOK = false;
		if(gotPostOK) {
			// Check the return value. If it's not a quoted message, alert the user.
			var quoteStart = xmlhttp.responseText.indexOf('id="vB_Editor_001_textarea"');
			var quoteEnd = -1;
			if(quoteStart >= 0) quoteStart = xmlhttp.responseText.indexOf('[QUOTE', quoteStart);
			if(quoteStart >= 0) quoteEnd = xmlhttp.responseText.indexOf('[/QUOTE]', quoteStart);
			if(quoteStart < 0) gotPostOK = false;
			// Get the quoted message (entire contents of the TextArea).
			else quote = xmlhttp.responseText.substring(quoteStart, quoteEnd)+'\n[/QUOTE]';
		}
		if(gotPostOK) {
			// Insert that message in the proper location in the current TextArea.
			//alert("Quote to be inserted at "+textarea_insertpoint);
			textarea.value = textarea.value.substr(0,textarea_insertpoint) + preNewline + unescape_ent(quote) + '\n' + textarea.value.substr(textarea_insertpoint);
		}
		// Reenable the button and textarea.
		reenable();
		if(!gotPostOK) {
			if(quoteid == null) alert("Couldn't GET the quoted post (status="+xmlhttp.status+").\nThe site might be down.  Save a copy of your work!");
		}
	}
}

