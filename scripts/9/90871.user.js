// Last Updated: 19th Nov 2010
// Lead Programmer: Waser Lave
//
// ==UserScript==
// @name          Neopets Plain of Peace Ritual Solver
// @namespace     http://www.neocodex.us/*
// @description   Displays solution for symbol puzzle
// @include       http://www.neopets.com/faerieland/tfr/ritual.phtml?mode=search
// ==/UserScript==

// selectSymbol function credit to http://www.neopets.com
function selectSymbol(id) {
	var field = document.getElementById('symbolField' + id);
	var div = document.getElementById('symbolDiv' + id);
	if (field.value == '1') {
		field.value = '0';
		div.className = div.className.replace(/On/g, 'Off');
	} else {
		field.value = '1';
		div.className = div.className.replace(/Off/g, 'On');
	}

	var count = 0;
	for (var i = 0; i < 7; i++) {
		var field = document.getElementById('symbolField' + i);
		if (field.value == '1') {
			++count;
		}

		if (count >= 3) {
			document.getElementById('pageBlock').style.display = 'block';
			document.getElementById('actionForm').submit();
		}
	}
}


var symbolBody = document.getElementsByClassName("pageBody");
var symbols = symbolBody[0].childNodes;

var symbolArr = new Array();

symbolArr['paraSymbol paraSymbol1'] = 0;
symbolArr['paraSymbol paraSymbol2'] = 0;
symbolArr['paraSymbol paraSymbol3'] = 0;
symbolArr['paraSymbol paraSymbol4'] = 0;
symbolArr['paraSymbol paraSymbol5'] = 0;
symbolArr['paraSymbol paraSymbol6'] = 0;
symbolArr['paraSymbol paraSymbol7'] = 0;
symbolArr['paraSymbol paraSymbol8'] = 0;
symbolArr['paraSymbol paraSymbol9'] = 0;
symbolArr['paraSymbol paraSymbol10'] = 0;

for(var i=0;i<symbols.length;i++)
{
	var indSymbols = symbols[i].childNodes;
	
	var symbolCount = indSymbols.length;
	
	for(var j=0;j<symbolCount;j++)
	{
		var symbolClass = indSymbols[j].getAttribute("class");

		if(symbolArr[symbolClass] != undefined)
		{
			symbolArr[symbolClass] = symbolArr[symbolClass] + 1;	
		}
	}
}

var pageTitleSymbols = document.evaluate("id('content')/table/tbody/tr/td/div[1]/div[2]/div",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for(var k in symbolArr)
{	
	if(symbolArr[k] < 10)
	{
		var myRe = new RegExp("([0-9]{1,2})");
		var myArray = myRe.exec(k);
		if(myArray != null)
		{
			for(var l=0;l<pageTitleSymbols.snapshotLength;l++)
			{
				var symbolClassName = pageTitleSymbols.snapshotItem(l).getAttribute("class");
				if(symbolClassName == "pageTitleSymbol pageTitleSymbolOff pageTitleSymbolOff"+myArray[0])
				{
					selectSymbol(l);
				}	
			}
		}
		document.getElementsByClassName("pageContainer")[0].innerHTML += "<div class=\""+k+"\"></div><br /><br />";
	}
}

