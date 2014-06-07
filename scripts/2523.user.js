// ==UserScript==
// @name           Have Temperatures Your Way!
// @description    Converts Farenheit to Celsius and Celsiuc to Farenheit (displays converted number in parenthesis)
// @include        *
// ==/UserScript==//READ THIS
//Make this C to make all temps in Celsius//Leave at F to make all temps in fahrenheitvar convert = "C";//Change the number below to however many decimal places you want the numbers to be..var decimalplaces = 2;var findF = new RegExp("([0-9]+) ?(?:(?:&deg;|&#176|Â°) ?[Ff])", "g");var findC = new RegExp("([0-9]+) ?(?:(?:&deg;|&#176|Â°) ?[Cc])", "g");decimalplaces = 10^decimalplacesfunction FtoC(f) {c=(f-32)*5/9;c=Math.round(c*decimalplaces)/decimalplaces;
return (c);
}

function CtoF(c) {f=((9/5)*c)+32;f=Math.round(f*decimalplaces)/decimalplaces;
return (f);
}var textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);if (convert == "F") {for (var i = 0; i < textnodes.snapshotLength; i++) {node = textnodes.snapshotItem(i);
s = node.data;s = s.replace(findC, CtoF(RegExp.$1)+"Â°F");node.data = s;}} else {for (var i = 0; i < textnodes.snapshotLength; i++) {node = textnodes.snapshotItem(i);
s = node.data;s = s.replace(findF, FtoC(RegExp.$1)+"Â°C");node.data = s;}}