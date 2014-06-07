// ==UserScript==
// @name           ComputerCraft Forum Line Indicator
// @namespace      com.Kolpa.CC.Forums
// @description    indicates the lines of programmcode at the computercraft forums
// ==/UserScript==
function stripHTML(str){
	// remove all string within tags
	var tmp = str.replace(/(<.*['"])([^'"]*)(['"]>)/g, 
	function(x, p1, p2, p3) { return  p1 + p3;}
	);
	// now remove the tags
	return tmp.replace(/<\/?[^>]+>/gi, '');
}
window.onload = function() {
var stringarray = document.getElementsByClassName("prettyprint");
var tochange = [];
for (var i = 0; i < stringarray.length; i++) {

var test = [];
test = stringarray[i].innerHTML.split("<br>");

var output = [];

for (var i2 = 0; i2 < test.length; i2++){
output.push((i2+1) +": " + stripHTML(test[i2]));
}

var realout = "";

for (var i3 = 0; i3 <output.length;i3++) {
	realout = realout + output[i3] + "<br>" 
}
stringarray[i].innerHTML = realout;
}
}