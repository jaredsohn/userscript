// ==UserScript==
// @name			Cebu Pacific Script
// @description	         	Automate Cash Flow
// @version			2.0
// @include			https://book.cebupacificair.com/PrintItineraryReceipt.aspx
// @copyright		 2011 Copyrighted parts may not be reproduced without written consent
// ==/UserScript==
document.getElementsByClassName("main")[0].innerHTML='';
var content=document.getElementsByClassName("content")[0].innerHTML;
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
function extract(data, where) {
    for (var key in data) {
        where[key] = data[key];
    }
}

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}


function moneyConvert(value){
var buf = "";
var sBuf = "";
var j = 0;
value = String(value);
 
if (value.indexOf(".") > 0) {
buf = value.substring(0, value.indexOf("."));
} else {
buf = value;
}
if (buf.length%3!=0&&(buf.length/3-1) > 0) {
sBuf = buf.substring(0, buf.length%3) + ",";
buf = buf.substring(buf.length%3);
}
j = buf.length;
for (var i = 0; i <(j/3-1); i++) {
sBuf = sBuf+buf.substring(0, 3) + ",";
buf = buf.substring(3);
}
sBuf = sBuf+buf;
if (value.indexOf(".") > 0) {
value = sBuf + value.substring(value.indexOf("."));}
else {
value = sBuf;
}
return value;
}
function toDec(n) {
    var n = n.toString();
    var d = n.split('.')[0];
    var c = (n.split('.')[1] || '') +'00';
    d = d.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');

    return d + '.' + c.slice(0, 2);

}
function getData(string, search, lastsearch, array)
{
	if (string.indexOf(search) == -1)
	{
		return;
	}
	if (ob == undefined)
	{
		var ob = string.toString();
	}
	var com = 0;
	var ob2;
	while (ob=ob.substring(ob.indexOf(search)+1), ob2=lastsearch.substring(0, 1)+ob, ob2.indexOf(search) != -1, ob != prevob)
	{
		var finalString = ob2.substring(ob2.indexOf(search)+search.length, ob2.indexOf(lastsearch));
		var prevob = ob;
		if (array == undefined)
		{
			if (finalString == "true")
			{
				finalString = true;
			}
			else if (finalString == "false")
			{
				finalString = false;
			}
			else if (finalString == "null")
			{
				finalString = null;
			}
			else if (finalString == "undefined")
			{
				finalString = undefined;
			}
			return finalString;
		}
		else
		{
			array.push(finalString);
		}
	}
}
function replace(oStr, searchStr, replaceStr)
{
if(!oStr)return oStr;
	var firstS = "";
	var countL = 0;
	if (searchStr == "")
	{
		return (oStr);
	}
	if (oStr.indexOf(searchStr) == -1)
	{
		return (oStr);
	}
	else
	{
		var finS;
		while (finS=oStr.indexOf(searchStr, countL), oStr.indexOf(searchStr, countL) != -1)
		{
			firstS = firstS+oStr.substring(countL, finS);
			firstS = firstS+replaceStr;
			countL = finS+searchStr.length;
		}
		return (firstS+oStr.substring(countL));
	}
}
function clearString(origString)
{
	origString = replace(origString, "\n", "");
	origString = replace(origString, "\t", "");
origString = replace(origString, "&nbsp;", "");
origString = replace(origString, " ", "");
origString = replace(origString, "PHP", "");
origString = replace(origString, ",", "");
	return (origString);
}
function roundVal(val){
	var dec = 2;
	var result = Math.round(val*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function clearFinal(origString)
{
	origString = replace(origString, ",,", ",");
origString = replace(origString, "<li>", ",");
origString = replace(origString, "</li>", ",");
	return (origString);
}

var fare1=Math.floor(parseFloat(prompt("Enter Fare:","")));
if(fare1){
var totalN=fare1;
var taxS=(clearString(getData(content,'Taxes &amp; Fees:','</li><br style="clear:both;"><li style="float:left;">Terminal Fee:'))).match(/\d+/g).join(".");
var totalS=(clearString(document.getElementsByClassName("total")[1].innerHTML).match(/\d+/g).join("."));
fare1=fare1-Math.floor(parseFloat(totalS));
var taxN=Math.floor(parseFloat(taxS))+fare1;
var fixN=clearString(clearFinal(document.getElementsByClassName("content")[0].getElementsByClassName("clean")[0].innerHTML));
var fixR=clearString(document.getElementsByClassName("content")[0].getElementsByClassName("clean")[0].innerHTML).match(/\d+/g).clean("00");
content=document.getElementsByClassName("content")[2].innerHTML=replace(content,toDec(taxS).toString(),toDec(taxN).toString());
document.getElementsByClassName("content")[0].innerHTML=replace(content,toDec(totalS).toString(),toDec(totalN).toString());}