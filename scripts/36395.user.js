// ==UserScript==
// @name           AoSHQ INCIF
// @version        1
// @description    Indisputably Non-Coercive Idiot Filter for Ace of Spades HQ
// @namespace      nu.mu.ace/INCIF
// @include        http://minx.cc/*
// ==/UserScript==

/*

Indisputably Non-Coercive Idiot Filter for Ace of Spades HQ.

Ripped off without permission from "Eric the .5b"'s INCIF for reason.com's Hit & Run and adapted for AoSHQ. The original script and instructions can be found here: http://herzogravenproductions.com/incif/

Differences from original: comments appear when mouse hovered, fields are "link" and "hash" instead of "address"

*/




// Filter Specifications

//	You can specify multiple names and hashes and links by using an array instead of a string.
var Filters = {
	"Ignore": [
		{label:"troll who doesn't understand property rights", name:"Fuck you Ace - free speech", hash:["7K04W", "XHgfM", "aFSTR", "kYRcs", "n96/A", "/4cTB", "v1vlY", "VtTWu"]},
//		{label:"commie tim", name:"Tim", hash:"zCN15"} // possibly a mistake
	]
};
var Actions = {
	'Ignore': {
		"setup":function() {

			GM_addStyle( 
				"\ndiv.INCIF-Ignore { opacity: 0.5 !important; }\n" +
				"div.INCIF-Ignore:not(:hover):not(:target) { overflow: hidden !important; line-height: 1em !important; height: 1.2em !important; padding: 0 !important; margin: 0 0 1em 0 !important; border: 0 !important; background: transparent !important; }\n" + 
				"div.INCIF-Ignore:not(:hover):not(:target) + p.posted { display: none !important; }\n" +
				"div.INCIF-Ignore::before { content: '(' attr(title) ')' !important; display: block !important; margin-bottom: 1em !important; font-size: 75% !important;}\n\n"
			);
  
  
		},
		"apply":function (div, spec) {
			Style.appendClass(div, 'INCIF-Ignore'); // also for easy user style sheet customization
			div.setAttribute("title", "filtered comment" + ((spec['label'] == undefined) ? "" : ": "+spec['label']));

			/*
			if (spec['label'] == undefined) {
				div.innerHTML = 'filtered comment';	
			} else {
				div.innerHTML = 'comment by ' + spec['label'] + '';
			}
			*/
		}
	}
};





//************************************************************************************
// Do not modify anything below this point
//************************************************************************************

// Library Objects (convenient holders of functions)
	NodeTypes = {
		1:"element", 2:"attribute", 3:"text", 8:"comment", 9:"document", 10:"DTD"
	}
	for (key in NodeTypes) {
		NodeTypes[NodeTypes[key]] = key;  // Makes the association bi-directional 
	}
	
	Style = {
		"appendClass":function (obj, name) {
			obj.className += (' ' + name); 
		},
		"setFor":function (obj, text){
			obj.style.cssText = text;
		}
	}
	Xpath = {
		"find":function (query) {
			return document.evaluate(
				query, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
			);
		},
		"doToAll":function (query, func) {
			var selected = Xpath.find(query)
			for (i=0; i < selected.snapshotLength; i++) {
				func(selected.snapshotItem(i));
			}	
		}
	}
	Matching = {
		"check":function (test, target) {
			return	target && test && (test != '') 
					&& 
					(test.toUpperCase().indexOf(target.toUpperCase()) != -1); 
		},
		"findAny":function (test, target) {
			var i = 0;
			var result = false;
			if (!target) {
				return result;
			}
			if (target.substr) {
				result = Matching.check(test, target); 
			} else if (target.length) {
				for (i=0; i < target.length; i++) {
					result = Matching.check(test, target[i]);
					if (result) {break;}
				}
			} else {
				;
			}
			return result;
		}
	}
	String.prototype.trim = function() {
		return(this.replace(/^\s+/,'').replace(/\s+$/,''));
	}
	Form = {
		"getFormName":function(labelText) {
			var result = "";
			Xpath.doToAll("//label", function(label) {
				if (label.innerHTML == labelText) {
					result = label.htmlFor;
				}
			});
			return result;
		},
		"getFormElem":function(labelText) {
			var name = Form.getFormName(labelText);
			if (name != "") {
				return Xpath.find("//input[@name='" + name + "']").snapshotItem(0);
			}
		},
		"set":function(labelText, value) {
			var item = Form.getFormElem(labelText);
			item.value = value;
		}
	};
	
// Actual Filtering
	// This runs any setup code for Actions
		for (action in Actions) {
			if (Actions[action]["setup"] != undefined) {
				Actions[action].setup();
			}
		}
	
	// This actually goes over all the comments and applies Actions for people matching Filters.
		Xpath.doToAll("//div[@id='ace_comments']/p[@class='posted']", function(posted) {
			var comment = posted;
			do { comment = comment.previousSibling; }
				while( comment.nodeType != NodeTypes.element );

			var name = "";
			var link = "";
			var hash = "";
			var filterType = {};
			var filter = {};
			var i = 0;


			var text = posted.firstChild.nodeValue;
			text = text.replace(/^\s*Posted\s+by\s*:\s+/, "");
			if( "" == text )
			{// if text node empty, get data from anchor
				var anchor = posted.getElementsByTagName("a")[0];
				name = anchor.innerText;
				link = anchor.getAttribute("href");
				hash = anchor.nextSibling.nodeValue.replace(/.*\(|\).*/g, "");
			}
			else
			{//	else: get data from regex and strip off
				var match = text.split(/\s+at\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+[^\(]+\s+\(/);
				name = match[0];
				hash = match[1].replace(/\).*/, "");
			}

/*
			comment.appendChild(document.createElement("div")).appendChild(document.createTextNode(
				"name: "+name+", link: "+link+", hash: "+hash
			));
*/


			for (filterType in Filters) {
				for (i=0; i < Filters[filterType].length; i++) {
					filter = Filters[filterType][i];
					if(

							Matching.findAny(link, filter['link']) ||
							Matching.findAny(name, filter['name']) ||
							Matching.findAny(hash, filter['hash']) 

/* you can use this block instead to require one name and one hash to match (or just the link), instead of any one of link, name, hash */
/*
							Matching.findAny(link, filter['link']) ||
						(	Matching.findAny(name, filter['name']) &&
							Matching.findAny(hash, filter['hash']) )
*/
					) {
						Actions[filterType].apply(comment, filter);
						break;
					}
				}
			}

		});
	
