// ==UserScript==
// @name           derstandard-voting
// @namespace      http://userscripts.org/users/126963
// @description    Repariert die Kommentarbewertung auf derstandard.at
// @author         Raphael Wegmann, Roman Zimmermann
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://derstandard.at/*
// @include        http://diestandard.at/*
// ==/UserScript==


//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.



//
// main
//
// after the document is loaded, we get the "bewerten" link elements

location.href = "javascript:(" + function() {

  var snapResults = document.evaluate( "//a[text()='bewerten']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  // here we iterate over all "bewerten" links
  for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {

	var linkElm = snapResults.snapshotItem(i);

	// get the postID from the "onclick" link attribute
	for (var j=0; j<linkElm.attributes.length; j++) {
	        var item = linkElm.attributes.item(j);
	        if (item.nodeName == "onclick") {
			var result = item.nodeValue.match(/.*postID=(\d+).*/);
			var postID = result[1];
			log("load handler","postID", postID);
		}
	}

	// make elm the parent HTMLDivElement
	var elm = linkElm.parentNode;

	// replace the link with a pair of "red" and "green" links
        elm.innerHTML = '<p><a id="vd'+postID+'" class="onclick" style="color: rgb(207, 0, 0);">'
                       +'rot</a>&nbsp;<a id="vu'+postID+'" class="onclick" '
                       +'style="color: rgb(0, 154, 48);">gr&uuml;n</a></p>';

	var votedown = document.getElementById('vd'+postID);
	var   voteup = document.getElementById('vu'+postID);

	votedown.addEventListener("click", function(e) {vote(e, 0);}, false); // 0 is "unnötig"
	  voteup.addEventListener("click", function(e) {vote(e, 2);}, false); // 2 is "brillant"


}

// this is just for debugging
function log (function_name, obj_name, obj_value) {
  var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
  if(typeof(unsafeWindow) == 'undefined') { unsafeWindow = window; }
  if (!isGM) {{ try {

     unsafeWindow.console.log("function ["+function_name+"] object ["+obj_name+"] value ["+obj_value+"]\n");

                   } catch(e) {} 
             }; } else {
     GM_log("function ["+function_name+"] object ["+obj_name+"] value ["+obj_value+"]\n");
  }
}

// this function gets called when you click a vote link
function vote(event, bewertung) {

	var votelink = event.target;
	var postID = votelink.id.substr(2);

	log("vote", "postID", postID);
	log("vote", "bewertung", bewertung);

// get the article reference number from the document.URL
        var arrayOfStrings = document.URL.split('/');
	log("vote", "ref", arrayOfStrings[3]);
	var ref = arrayOfStrings[3];

// construct the URL we will use to POST our vote
	var url = "http://"+window.location.host+"/?page=postbewerten&postID="+postID+"&ref="+ref+"&act=send";
	log("vote", "url", url);

        var req = new XMLHttpRequest();  

// votingComplete will be called, when we get our result (html-page, which closes the window).
        req.addEventListener("load", function() {votingComplete(req,postID);}, false);

        req.open("POST", url, true)
	req.setRequestHeader("Content-Length", "11");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	req.send("bewertung="+bewertung)

}

// this function will check if we got our window.close() html-page
// and in that case calls query_vote().
function votingComplete(req, postID) {  

	log("votingComplete", "postID", postID);  
	log("votingComplete", "req.responseText", req.responseText);
	log("votingComplete","document.URL", document.URL);

	if (req.responseText.match(/.*derStandard\.at.*window\.close/)) {
		log("votingComplete","req.responseText.match", "true");
		query_vote(postID);
	} else {
		alert("Please login before voting.");
	}
}

// this gets the voting popup form, which should show our vote
function query_vote(postID) {

        var arrayOfStrings = document.URL.split(/[\#\?]/);
	log("query_vote", "url_base", arrayOfStrings[0]);

	log("query_vote","url", arrayOfStrings[0] + "?page=postbewerten&postID=" + postID);

        var req = new XMLHttpRequest();  

        req.addEventListener("load", function() {queryComplete(req,postID);}, false);  

        req.open("GET", arrayOfStrings[0] + "?page=postbewerten&postID=" + postID, true);
	req.send(null);

}


function queryComplete(req, postID) {  

  if ((req.readyState == 4) && (req.status == 200)) {

	log("queryComplete", "req.status", req.status);

// here we create a hidden <div> element
// <div id="voting_result" style="display:none;"> </div>
	var voting_result = document.createElement('div');
	voting_result.setAttribute('id', 'voting_result');
	voting_result.setAttribute('style', 'display:none;');

	document.body.appendChild(voting_result);

	log("queryComplete", "document.body", document.body);

// this line loads the voting popup form into the div element
// so we can later use the XPath DOM parser
	voting_result.innerHTML = getBody(req.responseText);

	log("queryComplete", "voting_result", voting_result);

// here we filter our vote ("unnötig" resp "brilliant") from the hidden <div> element
	var result = document.evaluate(
		'/html/body/div[@id="voting_result"]/table/tbody/tr[2]/td/p/b',
		voting_result, null,XPathResult.STRING_TYPE,null).stringValue;


	log("queryComplete", "result", result);

// we don't need our <div> element anymore, therefore we remove it
	voting_result.parentNode.removeChild(voting_result);

	paint(postID, result);

   }
}

// this function changes the background-color of the voting link
// so we can see, what our vote was

function paint(postID, voted) {

	log ("paint", "postID", postID);

	var updown; // the link element id name
	var color;  // the background-color we will use for the link

	if (voted == 'unnötig') {
		updown = 'vd';
		color = 'rgb(207, 0, 0);';
	} else if (voted == 'brillant') {
		updown = 'vu';
		color = 'rgb(0, 154, 48);';
	}

	log ("paint", "updown", updown);


	// get the right voting link inside the document
        var link = document.getElementById(updown+postID);

//	dump (nodeToXML(link, 'link: ', ''));

// now set the background-color
	link.setAttribute('style', 'background-color: '+ color);

}

// this one just dumps the DOM tree of any html node (i.e. HTMLDivElement)
// which is useful for debugging
function nodeToXML(node, indentation, out) {
   out += indentation+"<"+node.nodeName.toLowerCase();
   if (node.attributes!=null) {
      for (var i=0; i<node.attributes.length; i++) {
         var item = node.attributes.item(i);
         var value = item.nodeValue;
         if (value==null) value = "";
         out += " "+item.nodeName+"=\""+value+"\"";
      }
   }
   out += ">\n";
   for (var i=0; i<node.childNodes.length; i++) {
      var item = node.childNodes.item(i);
      out = nodeToXML(item, indentation+"   ", out);
   }
   if (node.nodeValue!=null) 
      out += indentation+"   "+node.nodeValue+"\n";
   out += indentation+"</"+node.nodeName.toLowerCase()+">\n";
   return out;
}

// extracts the <body> from a full <html> document
function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<body");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   return content.slice(x + 1, y);   
} 

} + ")();";
