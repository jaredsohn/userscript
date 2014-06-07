// ==UserScript==
// @name           Gamershell iiNet Mirror Link Getter Thingamibob
// @namespace      forums.whirlpool.net.au
// @version         0.8
// @description    Gets the file link from the http://iigh.iinet.net.au/ page if its available and displays it under the iiNet Mirror on Gamershell.com download pages
// @include        http://gamershell.com/*
// @include        http://*.gamershell.com/*
// ==/UserScript==


//grab the 'Austral-Asia' elements.
var cells = document.getElementById('Austral-Asia').nextSibling.nextSibling.getElementsByTagName('a');

var iiNetLink;

// the ii.net link might be in any of the elements under 'Austral-Asia', so loop over them and check for ii.net
for (var i = 0; i < cells.length; i++) {

	if ( cells[i].title == "ii.net") {
	// we've found the ii.net element
		iiNetLink = cells[i];
	
		break;
	
	}
}

if( iiNetLink ){   


	GM_addStyle("#iiLinker { width:210px;height:50px; } #iiLinkerA { color:red;font-weight:bold;line-height:15px; } #iiLinkerA:hover { text-decoration:underline; }"); 

	var ajaxLoader = [ "data:image/gif;base64,",
	"R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbG",
	"xkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F",
	"VFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAA",
	"EAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla",
	"+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KM",
	"aCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr",
	"6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAA",
	"EAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoL",
	"LoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAA",
	"ABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7",
	"baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCO",
	"ZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYA",
	"qrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVf",
	"ICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0Ua",
	"FBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA=="].join('');  

	var p = document.createElement("p");

	p.innerHTML = 'Getting Link...  <img src="'+ajaxLoader+'" />';

	iiNetLink.parentNode.appendChild(p);  

	function lookForLink(data){

	  var fileName = document.evaluate( '/html/body/div/div/div[4]/div[3]/div/div/div/div/span' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent;

	  var fileLink = data.slice( data.indexOf('Mirror Selection</a> > ')+23, data.indexOf(' initializing...') );

	  var possPaths = ['demo','movie','patch','mod'];

	  var getPathTxt = document.evaluate( '/html/body/div/div/div[4]/div[3]/div/div/div/div/span[2]/a[3]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent.toLowerCase();
	 
	  for(var t = 0; t < possPaths.length; t++){

		if(getPathTxt.indexOf(possPaths[t]) > -1){
		
		  var dir = possPaths[t];
		  
		  break;

		}
		else{
		
		  var dir = possPaths[0];
		
		}
	  
	  }

	  var filePath = 'http://iigh.iinet.net.au/'+dir+'/'+fileLink;
	  
	  p.innerHTML = '<p><p>iiNet Mirror Link: </p><div id="iiLinker"><a id="iiLinkerA"href="'+filePath+'">'+fileName+'</a></div></p>';  
	  
	  iiNetLink.parentNode.appendChild(p);      

	}

	var getAllForms = document.forms;

	for(var i = 0; i < getAllForms.length; i++){

	  var tx = getAllForms[i].textContent;

	  if( getAllForms[i].action == "http://www.gamershell.com/downloads/init.php" ){

		  var chosenForm = getAllForms[i];
		  
		  break;

	  };

	}

	GM_xmlhttpRequest({

	  method: 'POST',
	  
	  url: 'http://www.gamershell.com/downloads/init.php',
	  
	  headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Content-type': 'application/x-www-form-urlencoded',
	  },
	  
	  data: 'id='+chosenForm[0].value+'&mirror='+chosenForm[1].value,
	  
	  onload: function(responseDetails) {
		
		lookForLink(responseDetails.responseText)

	  }
	  
	});

}