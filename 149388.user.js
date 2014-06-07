// ==UserScript==
// @name        GraphicsHierarchyPrice
// @namespace   http://marstein.dyndns-free.com
// @description Find prices for video cards in a Tomshardware graphics card hierarchy chart
// @include     http://www.tomshardware.com/reviews/gaming-graphics-card-review,3107-7.html
// @version     1
// @grant		GM_xmlhttpRequest
// ==/UserScript==

// Find the table.
// Find the table cells.
// Find the card names.
// Look up card names at http://www.pricewatch.com/video_cards/
// Append card price to table cell.


// Get video card price HTML and put them into a card name/price map.
var cardPriceMap = new Map;
loadPriceWatch();
function loadPriceWatch() {
	console.log('Ready for XHR - loading prices from pricewatch')
	GM_xmlhttpRequest({
		method: "GET",
		synchronous: true,
		url: "http://www.pricewatch.com/video_cards/",
		onload: function(response) {
			console.log('loading prices from pricewatch')
			var parser = new DOMParser();
			var dom = parser.parseFromString(response.responseText, "application/xml");
			// Get <tr> elements containing <td>s. There is an class="mlinks2*" in there and before that the price.
			var trEntries = dom.getElementsByClassName('ftable');
			//console.log('Found '+trEntries.length+' tr entries')
			for (var i=0; i<trEntries.length; i++) {
				var tdEntries = trEntries[i].getElementsByTagName('td')
				//console.log('Found '+tdEntries.length+' td entries')
				for (var j=0; j<tdEntries.length; j++) {
					if (tdEntries[j].className.match("mlinks2")) {
						var cardNameMatch = tdEntries[j].innerHTML.match(/>\s-\s([\w\s]+)/)
						if (cardNameMatch != null) {
							// The <td> before the one with class mlinks2 is the price.
							var price = tdEntries[j-1].innerHTML.trimAllSpaces()
							cardNameMatch = cardNameMatch[1].replace(/(radeon|geforce) /i, "")
							console.log("mapping: "+cardNameMatch+"@"+price)
							cardPriceMap.put(cardNameMatch, price)
						}
					}
				}
			}
			// Done with getting prices, now we attach them to the cards in Tom's page.
			processTableRows();
		},
		onerror: function(resp) {
			alert("error loading price data")
		}
	});
}

// Put prices on the TH graphics card table.
function processTableRows() {
	var rows = $x("//*[@class='tblEven']/td")
	rows.forEach(function(row) {
		addPriceToTD(row)
		})
	rows = $x("//*[@class='tblRow']/td")
	rows.forEach(function(row) {
		addPriceToTD(row)
		})
}

var cardNamePattern = /\s[\w\s\+]*/g
// Put prices on one row of the Tom's HW table. They look like "Discrete: HD 7970, HD 7971"
function addPriceToTD(tdElement) {
	//console.log('Adding prices to: '+tdElement.innerHTML)
	var cardNamesString = tdElement.innerHTML.replace(cardNamePattern, function(cardName) {
		var cardPrice = lookupPricewatch(cardName.trim())
		return cardName + " ("+cardPrice+")"
	})
	tdElement.innerHTML = cardNamesString
}

// Find the card/price record.
function lookupPricewatch(cardName) {
	var price = cardPriceMap.get(cardName)
//	console.log('looking up card '+cardName+"@"+price)
	return price == null ? "" : price
}



// String helpers.
String.prototype.trim = function() {
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}

String.prototype.trimAllSpaces = function() {
	return this.replace(/\s/g, ""); // remove all spaces
}

String.prototype.normalize = function() {
	return this.replace(/\s+/g, ' ').trim();
}


// --- mapping functions

function Map() {
    // members
    this.keyArray = new Array(); // Keys
    this.valArray = new Array(); // Values
        
    // methods
    this.put = put;
    this.get = get;
	this.findIt = findIt;
}

function put(key, val) {
    var elementIndex = this.findIt( key );
    if( elementIndex == (-1) )
    {
        this.keyArray.push( key );
        this.valArray.push( val );
    }
    else
    {
        this.valArray[ elementIndex ] = val;
    }
}

function get(key) {
    var result = null;
    var elementIndex = this.findIt( key );
    if( elementIndex != (-1) )
    {   
        result = this.valArray[ elementIndex ];
    }  
    
    return result;
}

function findIt(key) {
    var result = (-1);
	var lowerKey = key.toLowerCase();
    for(var i = 0; i < this.keyArray.length; i++) {
        if(this.keyArray[i] == lowerKey)
		//var keyString = String(this.keyArray[i]);
		//if (keyString.indexOf(lowerKey) != (-1))
        {
            result = i;
            break;
        }
    }
    return result;
}


// See http://wiki.greasespot.net/XPath_Helper
// Run a particular XPath expression p against the context node
// context (or the document, if not provided) with this overloaded XPath helper.
// Returns the results as an array, unless a value of false is passed in.
function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

