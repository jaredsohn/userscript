/*

This script is by: Lior Zur, 2007.
Released under the GPL license.
(Please give credit if you use parts of this code,
 it took some effort to create.)

v0.2 30-3-07 Major improvement of underlying code. Looks good on Google now.

*/
// ==UserScript==
// @name           Fix e-mail Hebrew (& #1490;)
// @namespace      http://mywebsite.com/myscripts
// @description    Fixes jumbled Hebrew (it looks like this: & #1490;), which sometimes appears in e-mails, especially those sent from university accounts.
// @include        http://www.gmail.com/*
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @include        https://webmail.tau.ac.il/*
// ==/UserScript==

var textnodes, node, s, results, nodeParent;
var rHebChar = /\&\#(\d{4})\;/gi;

/*
// @include        *myhebtest.html*
http://*.mail.yahoo.com/*
<br />
<wbr />
*/
//textnodes = document.evaluate( "//body//text()[contains(text(),'&')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

//Preliminary merging and pruning of Hebrew text nodes
textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
	node = textnodes.snapshotItem(i);
 	if (node.data.match(rHebChar)){
 		//We actually want to work on the parent.	
		nodeParent = node.parentNode;
		if (nodeParent) {
		if (nodeParent.style.backgroundColor != "#fffce6"){
			nodeParent.style.backgroundColor = "#fffce6";
			nodeParent.dir = "rtl";
			nodeParent.align = "right";
			nodeHtml = nodeParent.innerHTML;
			nodeHtml = nodeHtml.replace(/<w?br\s*\\?>\s*<w?br\s*\\?>/gi,"truebreak");
			nodeHtml = nodeHtml.replace(/<w?br\s*\\?>/gi," "); //   /<w?br\s*\\?>/
			nodeHtml = nodeHtml.replace(/truebreak/gi,"<br /><br />");
//			nodeHtml = nodeHtml.replace(/\<script[^>]/gi
			nodeHtml = "<small>Fixed by Greasemonkey script 'Fix e-mail Hebrew (& # 1490 ;)'</small>" + nodeHtml;
			//Notes: This is a "magical step". Transforms "&amp;" to actual "&"s, etc.
			//       For some strange reason this DOES NOT break the loop (after all it does reconstruct the DOM  so the XPATH results should be a mess, which they probably are.)
			nodeParent.innerHTML = nodeHtml;  
		}
		}
	}
}

//Translating Codes to Characters
textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data;
    	if (s.match(rHebChar)){	
				s = s.replace(/\&\s*\#/gi,"&#"); //Fixes gaps created in Google. (?)
		    s = s.replace(rHebChar, replace_callback);
		    node.data = s; 
    	}
}

function replace_callback (_, hebCode) {
	return String.fromCharCode(parseInt(hebCode));
}

/*
var sTrueChar;
var iLocation;
textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data;
    if (s.match(rHebChar)){
    	rHebChar.lastIndex = 0;
    	while (results = rHebChar.exec(s)) {
    			iLocation = results.index;
    			sTrueChar = String.fromCharCode(parseInt(results[1]));  //GM_log(sTrueChar);
    			s = s.substr(0,iLocation) + sTrueChar + "^^^^^^" + s.substr(iLocation+7);
    	}
    //GM_log(s);
    s = s.replace(/\^/gi,"");
    node.data = s; 
    //GM_log(s);
    }

    //s = s.replace(rHebChar,String.fromCharCode(parseInt("$1")));  //
} 
*/


/*
    node = textnodes.snapshotItem(i); 
    s = node.data;
    var sTrueChar;
    var previousLastIndex = 0;
    var newString = "";
    if (rHebChar.text(s)){
     	while (results = rHebChar.exec(s))
    	{
    			sTrueChar = String.fromCharCode(parseInt(results[1]));  //GM_log(sTrueChar);
			newString += sTrueChar + s.substr(previousLastIndex,rHebChar.lastIndex);
			previousLastIndex = rHebChar.lastIndex; //(at end) set the new last index:
    	}
    newString += s.substr(previousLastIndex,s.length);
    newString = newString.replace(rHebChar,"");
    node.data = newString; 
    }
*/









