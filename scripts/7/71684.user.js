// ==UserScript==
// @name           Lepro %username% script
// @author         Stasik0
// @namespace      Nothing
// @description    Shows username instead %username%
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==

	//PUT YOUR OWH NAME HERE IF YOU HAVE NO LOGIN FOR d3.ru
	var username = "anonymous"; 

	function replace_username(element, username){
		//element.innerHTML = element.innerHTML.replace(/%username%/gi, username);
			for(j=0;j<element.childNodes.length;j++){
				if(element.childNodes[j].nodeType == 3){
					element.childNodes[j].nodeValue = element.childNodes[j].nodeValue.replace(/%username%/gi, username);
				}; //text node
			}
	}

	if(document.getElementById('greetings')!=null){
		var block = document.getElementById('greetings').innerHTML;
		username = block.match(/<a href="(http:\/\/.*?)\/users\/(.*)">(.*)<\/a>(.*)/i)[3];
	} 
		
	var elements = document.evaluate(
	"//div[@class='dt']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (i=0;i<elements.snapshotLength;i++){
		replace_username(elements.snapshotItem(i), username);
	}

	/* watch for any changed attributes */
	document.addEventListener("DOMNodeInserted", documentChanged, false);
	
	function documentChanged(event) {
	 	//alert(event.target.className);                  // helpful for debugging
		if(event.target.className != null && event.target.className.indexOf("post")>-1){
				var elements = document.evaluate(
				"//div[@class='dt']",
				event.target,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
				for (i=0;i<elements.snapshotLength;i++){
					replace_username(elements.snapshotItem(i), username);
				}
		}
	}
