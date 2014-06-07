// ==UserScript==
// @author         pbihler / 13thparallel.org
// @version        0.0.1
// @name           MultiColumns
// @namespace      http://www.cs3.org
// @description    With this script, a webpage can be divided into columns of 400px width. A little bit like the Tofu (http://amarsagoo.info/tofu/) application does. Very basic version.
// @include        *
// ==/UserScript==

// Based on the script found on this webpage:
//  http://13thparallel.com/archive/column-script/


//=======================================================\\
//                    13thparallel.org                   \\
//                   Copyright (c) 2002                  \\ 
//   see (13thparallel.org/?title=about) for more info   \\
//=======================================================\\

// Columns object to split a load of innerHTML into columns.
// 08/04/02

var Columns = {
	singleTags : ["br", "img", "hr", "input", "!--"],
	devmode : "off",		// "on" or "off", if set to "on" some info will be displayed in the statusbar.
	cols : new Array(),		// Stores the columns during calculations.
	onSplitStart : new Function(),
	onSplitEnd : new Function(),
	onSplit : new Function()
}


// The chop array holds strings that should be removed from the start of every column.
// Don't remove only one part of a tag pair, like </p>, always remove whole pairs, like <p></p>.

Columns.chop = [
'<SPAN class=colbreak></SPAN>',
'<span class="colbreak"></span>',
'<BR>',
'<br>',
'<br/>',
'<br />',
'<p></p>',
'<P></P>'
]


// Splits a load of text into fragments that will fit in the
// specified width and height and returns them in an array.
// It automatically closes unclosed tags and creates opening tags for the following columns.

Columns.splitText = function(text, width, height) {
	if (!document.getElementById 
	|| !document.getElementById("divSizer") 
	|| typeof document.getElementById("divSizer").innerHTML == "undefined") return;
	
	this.onSplitStart(text, width, height);

	this.cols = new Array();
	this.innerHTMLHits = 0;
	var startDate = new Date();
	var x = "";
	
	for (var i = 0; text != ""; i++) {
		
		// put a fitting fragment in cols array and slice it from the text
		this.cols[i] = this.getFragment(text, width, height);
		text = text.slice(this.cols[i].length);
		
		// remove chop strings from the start of the text
		for (var j = 0; j < this.chop.length; j++) {
			if (text.charAt(0) == "\n") text = text.slice(1);
			x = this.chop[j];
			while (text.indexOf(x) == 0) text = text.slice(x.length);
		}
		
		// add tags from opentags array
		for (var k = this.openTags.length - 1; k >= 0; k--) {
			this.cols[i] += "</" + this.openTags[k].split(" ")[0] + ">";
			if (text != "") text = "<" + this.openTags[k] + ">" + text;
		}
		
		// remove chop strings from the start of the text again
		for (var m = 0; m < this.chop.length; m++) {
			if (text.charAt(0) == "\n") text = text.slice(1);
			x = this.chop[m];
			while (text.indexOf(x) == 0) text = text.slice(x.length);
		}
		
		// fire onSplit event
		this.onSplit(this.cols[i]);
	}
	
	if (this.devmode == "on") {
		var endDate = new Date();
		var message = "Time taken for splitting text = " + (endDate-startDate)/1000 + " seconds";
		message += " Number of unclosed tags found = " + this.openTags.length;
		message += " innerHTMLHits = " + this.innerHTMLHits;
		defaultStatus = message;
	}
	
	this.onSplitEnd(this.cols);
	return this.cols;
}


Columns.getFragment = function(text, width, height) {
	var objSizer = document.getElementById("divSizer");
	objSizer.style.width = width + "px";
	
	var i = 0;
	var limit = 0;
	var add = 0;
	var doloop = false;
	this.openTags = new Array();
	
	objSizer.innerHTML = text;
	if (objSizer.offsetHeight <= height) i = text.length;
	else {
		doloop = true;
		limit = text.length;
	}
	
	
	// This loop determines the raw piece of text that fits in the specified width and height.
	// It is the most powerhungry part of the script because of the repeated innerHTML manipulation.
	// It uses a binary search between 0 and text.length.
	while (doloop) {
		add = Math.round((limit - i) / 2);
		if (add <= 1) doloop = false;
		i += add;
		objSizer.innerHTML = text.substr(0, i);
		
		if (objSizer.offsetHeight > height){
			limit = i;
			i -= add;
		}
		this.innerHTMLHits ++;
	}
	
	
	// Making sure there are no broken words or tags like "<img" at the end of this fragment.
	// This also ensures there will be no broken words or tags at the start of the next fragment.
	if (text.substr(0, i) != text) {
		var lastSpace = text.substr(0, i).lastIndexOf(" ");
		var lastNewline = text.substr(0, i).lastIndexOf("\n")
		var lastGreater = text.substr(0, i).lastIndexOf(">");
		var lastLess = text.substr(0, i).lastIndexOf("<");
		if (lastLess <= lastGreater && lastNewline == i - 1) i = i;
		else if (lastSpace != -1 && lastSpace > lastGreater && lastGreater > lastLess) i = lastSpace + 1;
		else if (lastLess > lastGreater) i = lastLess;
		else if (lastGreater != -1)  i = lastGreater + 1;
	}
	

	// Doing the column breaks.
	text = text.substr(0, i).split('<SPAN class=colbreak></SPAN>')[0];
	text = text.substr(0, i).split('<span class="colbreak"></span>')[0];
	
	
	// Seeking unclosed tag pairs in this fragment and storing them in the openTags array.
	var doPush = true;
	var tags = text.split("<");
	tags.shift();
	
	for (var j=0; j<tags.length; j++) {
	 	// Splitting at ">" and taking the first item.
		// Now we have the whole tag with its attributes and without "<" and ">".
		tags[j] = tags[j].split(">")[0];
		
		// If it's a selfclosing xhtml or xml tag there's no need to do anything with it.
		if (tags[j].charAt(tags[j].length-1) == "/") continue;
		
		if (tags[j].charAt(0) != "/") {
			for (var k=0; k<this.singleTags.length; k++) {
				if (tags[j].split(" ")[0].toLowerCase() == this.singleTags[k]) doPush = false;
			}
			if (doPush) this.openTags.push(tags[j]);
			doPush = true;
		}
		else this.openTags.pop();
	}
	
	return text;
}



// Array and String prototypes.
// Internet Explorer 5 didn't have Push, Pop and Shift so here we create them.
// Split and Join are normally supported by every DHTML capable browser, 
// but they were broken in IE5/MacOSX, madness.

// push appends new elements to an array, and returns the new length
if (Array.prototype && !Array.prototype.push) {
	Array.prototype.push = function() {
		for (var i=0; i<arguments.length; i++) this[this.length] = arguments[i];
		return this.length;
	};
}

// pop removes the last element from an array and returns it
if (Array.prototype && !Array.prototype.pop) {
	Array.prototype.pop = function() {
		var lastitem = this.length > 0 ? this[this.length - 1] : undefined;
		if (this.length > 0) this.length--;
		return lastitem;
	};
}

// shift removes the first element from an array and returns it
if (Array.prototype && !Array.prototype.shift) {
	Array.prototype.shift = function() {
		var firstitem = this.length > 0 ? this[0] : undefined;
		for (var i=0; i<this.length-1; i++) this[i] = this[i + 1];
		if (this.length > 0) this.length--;
		return firstitem;
	};
}

// join returns a string value consisting of all the elements of an array 
// concatenated together and separated by the separator argument
if (Array.prototype && !Array.prototype.join) {
	Array.prototype.join = function(separator) {
		if (typeof separator != "string") separator = ",";
		var s = "";
		for (var i=0; i<this.length; i++) {
			if (this[i] != null && this[i] != undefined) s += this[i];
			if (i != this.length - 1) s += separator;
		}
		return s;
	};
}

// split returns the array that results when a string is separated into substrings
if (String.prototype && !String.prototype.split) {
	String.prototype.split = function(separator, limit) {
		var s = "" + this;
		var a = new Array();
		var sepIndex;
		
		if (typeof separator != "string") return new Array(s);
		if (separator == "") {
			while (s.length) {
				a[a.length] = s.substring(0, 1);
				s = s.substring(1);
				if (typeof limit == "number" && a.length >= limit) break;
			}
		}
		else {
			while (s.length) {
				sepIndex = s.indexOf(separator);
				a[a.length] = s.substring(0, sepIndex);
				s = s.substring(sepIndex+separator.length);
				if (typeof limit == "number" && a.length >= limit) break;
				if (s.length == 0) a[a.length] = s;
			}
		}
		return a;
	};
}

// end



//Put a a complete page in columns:

var orgHtml;
	
	function relayoutPage(e)
	{
		var container = document.getElementsByTagName('body')[0];
		
			if (!document.getElementById) return;
            if (!document.getElementById("divSizer")) {
                var newDiv = document.createElement("div");
                newDiv.setAttribute("id","divSizer");
                container.insertBefore(newDiv,container.firstChild);
                orgHtml = false;
            } 
            	
		if (container != "undefined")
		{
		    var width = 400;
		    
		    if (! orgHtml) 
		     orgHtml = container.innerHTML;
		    
		    
			var exampleColumns = Columns.splitText(orgHtml, width, window.innerHeight-60);
		    
			var result = "<table width=\"" + (exampleColumns.length * (width +20)) + "\"><tr>";
			
			for (var i = 0; i < exampleColumns.length; i ++)
			{			
				result += "<td style=\"vertical-align:top;width:" + width + "px;padding:10px;text-align:justify\">" + exampleColumns[i] + "</td>";
			}
			
			result +="</tr></table>";
			
			container.innerHTML = result;
		}
		else alert("I'm sorry, your browser does not support enough scripting features to run this example.");
	}


GM_registerMenuCommand("Set page in columns",	relayoutPage, "c", "control alt", "c");
