// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		PKMN IV Calc
// @description	Sums the possible IVs of a Pokemon  from the veekun IV calculator to easy determin the uniqueness of a Pokemon. Values at about 93 are average PKMN. Values above 150 have a probability rate of less then 1:200. Other values will follow in later versions of this Script.
// @include 	http://veekun.com/dex/calculators/iv?pokemon=*
// @version     0.0.1 alpha
// ==/UserScript==

var hpiv = document.getElementsByTagName('td')[6].innerHTML;
var ativ = document.getElementsByTagName('td')[12].innerHTML;
var dfiv = document.getElementsByTagName('td')[18].innerHTML;
var saiv = document.getElementsByTagName('td')[24].innerHTML;
var sdiv = document.getElementsByTagName('td')[30].innerHTML;
var iniv = document.getElementsByTagName('td')[36].innerHTML;
function mkspan(iv){
var ivud=[];
ivud[0] = parseInt(iv);
i = iv.indexOf('-');
ivud[1]=parseInt(iv.slice(i+1));
return ivud;
}
var sivd = mkspan(hpiv)[0]+mkspan(ativ)[0]+mkspan(dfiv)[0]+mkspan(saiv)[0]+mkspan(sdiv)[0]+mkspan(iniv)[0];
var sivu = mkspan(hpiv)[1]+mkspan(ativ)[1]+mkspan(dfiv)[1]+mkspan(saiv)[1]+mkspan(sdiv)[1]+mkspan(iniv)[1];
var txt = 'sum(IV) = '+sivd+' - '+sivu+' ';
//print(txt);
var table, newElement
table = document.getElementsByTagName('table')[0];
if (table) {
    sums = document.createElement('div');
    sums.id = "ivsums";
    sums.innerHTML = "<div id='ivsums' class='handel ivsums'>"+txt+"</div>"
    table.parentNode.insertBefore(sums, table.nextSibling);
}