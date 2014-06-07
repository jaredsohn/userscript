// ==UserScript==
// @name        Los Clickos Hermanos
// @namespace   *
// @include     http://clickingbad.nullism.com/
// @version     1
// @grant       none
// ==/UserScript==

// LAST UPDATE : 23/11/13 for version 0.8.1
// - shows efficiency and potential gain for each Manufacturing item : "Costs $4.81M/batch; Is worth $249.63B/s"
// - shows efficiency and gain for each Distribution item : "Costs $4.81M/sold batch; Yields $249.63B/s"
// - shows efficiency for each Laundering item : "Costs $17,275/laundered $"
// - colors! Red = bad value for money, Green = good value for money, White = the average item regarding value for money
// - change items description text color as it becomes unreadable when the item becomes Orange/Red

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function makeRealNumber(nb) {
	return eval(
		nb.replace(/,/g,"")
		  .replace(/M/,"*1E6")
		  .replace(/B/,"*1E9")
		  .replace(/T/,"*1E12")
		  .replace(/Qt/,"*1E18")
		  .replace(/Q/,"*1E15")
	)
}

// map
sortables = {}

function buildLabels(divName, text1, text2) {
	divs = document.querySelectorAll("div#"+divName+" > div.s_div")
	
	sortables[divName] = []
	
	batchPrice = document.querySelector("span#sell_roi").textContent
	
	for (i=0; i<divs.length; i++) {
		div = divs[i]
		cost = makeRealNumber(div.querySelector("p.small > b > span").textContent)
		p = div.querySelector("p[class='pull_right small']")
		infosSpans = p.querySelectorAll("b > span")
		batchesPerS = makeRealNumber(infosSpans[0].textContent)
		
		efficiency = Math.round(cost / batchesPerS)
		dollarsPerS = Math.round(batchesPerS * batchPrice)

		zboub1 = p.querySelector("span#zboub1")
		zboub2 = p.querySelector("span#zboub2")
		if (zboub1 == undefined) {
			p.appendChild(document.createElement("br"))
			p.appendChild(document.createTextNode(text1[0]))
			
			b1 = document.createElement("b")
			zboub1 = document.createElement("span")
			zboub1.id = "zboub1"
			b1.appendChild(zboub1)
			p.appendChild(b1)
			
			p.appendChild(document.createTextNode(text1[1]))
			
			if (text2 !== undefined) {
				p.appendChild(document.createTextNode(text2[0]))
				
				b2 = document.createElement("b")
				zboub2 = document.createElement("span")
				zboub2.id = "zboub2"
				b2.appendChild(zboub2)
				p.appendChild(b2)
				
				p.appendChild(document.createTextNode(text2[1]))
			}
		}

		newValue = "$"+ unsafeWindow.pretty_bigint(efficiency)
		if (newValue != zboub1.textContent) {
			zboub1.textContent = newValue
		}
		if (text2 !== undefined) {
			newValue = "$"+ unsafeWindow.pretty_bigint(dollarsPerS)
			if (newValue != zboub2.textContent) {
				zboub2.textContent = newValue
			}
		}
		
		sortables[divName].push({"efficiency":efficiency, "element":div})
	}
	sortables[divName].sort(function(a,b) {return parseFloat(b.efficiency) - parseFloat(a.efficiency)})

	colorize(sortables[divName])
	
}

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

function colorize(theArray) {
	// bad half: red to yellow, FF0000 to FFFF00
	// good half: yellow to green, FFFF00 to 00FF00
	step = Math.round(206 / (theArray.length-1))
	colors=[]
	for (i=0 ; i<Math.round(theArray.length)/2 ; i++) {
		colors.push("#FF"+decimalToHex(50+i*step)+"00")
	}
	step = Math.round(256 / (theArray.length-1))
	for (i=0 ; i<Math.round(theArray.length)/2 ; i++) {
		colors.push("#"+decimalToHex(256-i*step)+"FF00")
	}
	colors.push("#00FF00")
	
//	GM_log(JSON.stringify(colors))
	
	for (i=0 ; i<theArray.length; i++) {
		newStyle = "background-color:"+colors[i]
		if (theArray[i].element.getAttribute("style") != newStyle) {
			theArray[i].element.setAttribute("style", newStyle)
		}
	}
}

function computeAndShowCost() {
	buildLabels("clickers", ["Costs ", "/batch"], ["; Is worth ", "/s"])
	buildLabels("sellers", ["Costs ", "/sold batch"], ["; Yields ", "/s"])
	buildLabels("banks", ["Costs ", "/laundered $"])
}

setInterval(computeAndShowCost, 1000)

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		var newCss = document.createElement('style');
		newCss.type = "text/css";
		newCss.innerHTML = cssString;
		head.appendChild(newCss);
	}
}
addCss ('.grey { color: black ! important; }');