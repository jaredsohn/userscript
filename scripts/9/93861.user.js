// ==UserScript==
// @name            PrisonLife Safe
// @description     Adds more info to the safe page
// @namespace       PrisonLife
// @include         http://www.prisonlife.se/safe
// @version         1
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
var tablerowselector = tableselector.getElementsByTagName("tr");
var donations = {};
var trlen = tablerowselector.length;
var name = "";
var amount = 0;
var firsth = parseInt(tablerowselector[1].getElementsByTagName("td")[1].innerHTML.substr(11, 2));
var firstm = Math.round(parseInt(tablerowselector[1].getElementsByTagName("td")[1].innerHTML.substr(14, 2), 10)*1.667);
var lasth = parseInt(tablerowselector[trlen-1].getElementsByTagName("td")[1].innerHTML.substr(11, 2)) ;
var lastm = Math.round(parseInt(tablerowselector[trlen-1].getElementsByTagName("td")[1].innerHTML.substr(14, 2), 10)*1.667) ;
var timeh = firsth - lasth;
var timem = firstm - lastm;


if( timeh < 0 ){
	timeh = timeh+24;
}

if( timem < 0 ){
	timem = timem+100
	timeh = timeh-1;
}




var time = timeh + (timem/100);

for( var i = 0; i < tablerowselector.length-1; i++){
	name = tablerowselector[i+1].getElementsByTagName("td")[1].innerHTML;
	amount = parseInt(tablerowselector[i+1].getElementsByTagName("td")[5].innerHTML.replace(/\./g, ""));
	if( tablerowselector[i+1].innerHTML.match(/cash_up.png/g) && amount < 1000000 ){
		if( donations[name] > 0 ){
			var old = donations[name];
			donations[name] = donations[name] + amount;
		}else {
			donations[name] = 0;
			donations[name] = donations[name] + amount;
		}
	}
}
var total = 0;
for (var key in donations){
	/*names[] = key;*/
	if( typeof(key) == 'string')
		total = total + donations[key];
}
/*var sortedd = {};
for( var key in donations){
	
	
}*/
var output = "";
output = output + "<span style=\"color:green;\">Inkomst per timme: "+ts(Math.round(total/time), ',')+" kr<br />\nInkomst per dag: "+ ts(Math.round(total*(24/time)), ',') +" kr<br />\nTotalt "+ts(total, ',')+" över "+time+" timmar</span>";
if( 1==1 ){
var parent = tablerowselector[0].parentNode.parentNode.parentNode;
parent.innerHTML = output + parent.innerHTML;
} else { 
alert(output);
}