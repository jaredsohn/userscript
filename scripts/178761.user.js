// ==UserScript==
// @name       OtrKeyFinder @ Fernsehserien
// @namespace  http://www.fernsehserien.de/
// @include  http://www.fernsehserien.de/*
// @match    http://www.fernsehserien.de/*
// @version    0.1
// @description  Add OTR search links
// @copyright  2013+, Frank Glaser
// ==/UserScript==

function pad(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

var name = escape(
		document.evaluate(
			"string( //h1/text() )", 
			document, 
			null, 
			XPathResult.STRING_TYPE, 
			null
		).stringValue.replace(/\W/g, ' ').replace(/ /g, '+')
	);

var allTrs = document.evaluate(
		"//table[@class='sendetermine  ']/tbody/tr[not(@class)]", 
		document, 
		null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
		null
	);

for (var i=0;i<allTrs.snapshotLength;i++) { 
	try{
		var thisTr = allTrs.snapshotItem(i);
		//var date = new Date(thisTr.firstChild.nextSibling.firstChild.nodeValue);
		//var usdate = date.getFullYear().toString().substr(2,4)+"."+pad(date.getMonth()+1,2)+"."+pad(date.getDate(),2);
		var date = thisTr.firstChild.nextSibling.firstChild.nodeValue;
		var usdate = date.substr(-2,2)+"."+date.substr(3,2)+"."+date.substr(0,2);
		//var time = thisTr.firstChild.nextSibling.nextSibling.firstChild.firstChild.nodeValue.substr(0,5).replace(":","-");
		var channel = thisTr.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nodeValue.replace(/\W/g, '');
		//var url = "http://www.otrkeyfinder.com/?search="+name+"+"+usdate+"+"+time+"+"+channel;
		var url = "http://www.otrkeyfinder.com/?search="+name+"+"+usdate+"+"+channel;
		
		var td = document.createElement("td");
		var a = document.createElement("a");
		a.href = url;
		a.title = url;
		//a.target = "_blank";
		var text = document.createTextNode("OtrKF");
		
		a.appendChild(text);
		td.appendChild(a);
		thisTr.appendChild(td);
	}
	catch(err){
		;
	}
};
