// ==UserScript==
// @name            PrisonLife Donationer
// @description     Adds more info to the donation page
// @namespace       PrisonLife
// @include         http://www.prisonlife.se/family/logs/donate
// @version         0.2
// @contributor     Pedal
// ==/UserScript==

function sortDESC(a, b){ return (b-a);}
function ts(n,sep) {
var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
sValue=n+'';

if (sep === undefined) {sep=',';}
while(sRegExp.test(sValue)) {
sValue = sValue.replace(sRegExp, '$1'+sep+'$2');
}
return sValue;
}

var tableselector;
var tables = document.getElementsByTagName("table");
for(var i in tables){
	if( tables[i].innerHTML.match(/Belopp/g) ){
		tableselector = tables[i];
		break;
	}
}
/*if( document.getElementsByTagName("table")[2].innerHTML.match(/Belopp/g) ) {
	tableselector = document.getElementsByTagName("table")[2];
}
else if( document.getElementsByTagName("table")[3].innerHTML.match(/Belopp/g) ) {
	tableselector = document.getElementsByTagName("table")[3];
} else {
 alert("Can't find table");
}*/
var tablerowselector = tableselector.getElementsByTagName("tr");
var donations = {};
var name = "";
var names = new Array();
var amounts = new Array();
var amount = 0;
for( var i = 0; i < tablerowselector.length-1; i++){
	name = tablerowselector[i+1].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML;
	amount = parseInt(tablerowselector[i+1].getElementsByTagName("td")[5].innerHTML.replace(/\./g, ""));
	if( donations[name] > 0 ){
		var old = donations[name];
		donations[name] = donations[name] + amount;
	}else {
		donations[name] = 0;
		donations[name] = donations[name] + amount;
	}
}
var total = 0;
for (var key in donations){
	names[donations[key]] = key;
	amounts.push(donations[key]);
	if( typeof(key) == 'string')
		total = total + donations[key];
}
amounts.sort(sortDESC);

var output = "<table>";
for( var key in amounts ){
	if( amounts[key] < 70000000 )
		color = " style=\"color:red;\" ";
	else
		color = " style=\"color:green;\" ";
	output = output + "<tr"+color+"><td align=\"right\" width=\"50px\">"+(Math.round((amounts[key]/total)*10000)/100)+"%</td><td align=\"right\" width=\"150px\">"+ts(amounts[key], ",")+" kr</td><td align=\"right\" width=\"150px\" >"+names[amounts[key]]+"</td></tr>";
}

output = output + "<tr><td align=\"right\" >Total: </td><td align=\"right\" >"+ts(total, ",")+" kr</td><td></td></tr></table>";
if( 1==1 ){
var parent = tablerowselector[0].parentNode.parentNode.parentNode;
parent.innerHTML = output + parent.innerHTML;
} else {
alert(output);
}