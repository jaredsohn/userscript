// ==UserScript==
// @name			Via Markup
// @description	         	Automate Cash Flow
// @version			1.3a
// @include			http://ph.via.com/bdo?action1=TICKET_ACTION&orderRef=*
// @copyright		 2012 Copyrighted parts may not be reproduced without written consent
// ==/UserScript==

if(document.body.innerHTML.indexOf("markup")!=-1){
var total=prompt("Enter Fare:");
var arr=[];
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
origString = replace(origString, "&nbsp;", "");
origString = replace(origString, " ", "");
origString = replace(origString, ",", "");
origString = replace(origString, "/div", "");
origString = replace(origString, "<", "");
origString = replace(origString, "div", "");
origString = replace(origString, ">", "");
origString = replace(origString, "style=", "");
origString = replace(origString, "PHP", "");
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
function clearFrag(origString)
{
origString = replace(origString, ",", "");
	origString = replace(origString, "PHP", "");
origString = replace(origString, ">", "");
origString = replace(origString, "/div>", "");
origString = replace(origString, "<", "");
	return (origString);
}
var tax,baggage;
var ret=getData(document.getElementsByClassName("last")[1].childNodes[0].innerHTML,"<div","</div>",arr);
arr[0]=parseFloat(clearFrag(arr[0]));
arr[1]=parseFloat(clearFrag(arr[1]));
arr[2]=arr[2]+"|:|";
arr[2]=parseFloat(clearFrag(getData(arr[2],"PHP ","|:|")));

if(total){
if(total>arr[2]){
var totalx=parseFloat(total)-arr[0];
document.getElementsByClassName("last")[1].childNodes[0].innerHTML="<div>PHP "+moneyConvert(arr[0])+"</div><div>PHP "+moneyConvert(totalx)+"</div><div style=\"background-color: #E8F3C6;padding:5px 0px;font-weight: bold;\">PHP "+toDec((total))+"</div>";
}
else
{
alert("total cost should be higher");
}
}
else
{
alert("An Error Occured");
}
}
else{
var total=prompt("Enter Fare:");
var totalTxt=parseFloat(document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultTextBold").innerHTML);
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
origString = replace(origString, "&nbsp;", "");
origString = replace(origString, " ", "");
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
var tax,baggage;
if(total){
if(document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultText").length>=7){
if(document.getElementById("pax_details").innerHTML.indexOf("Baggage")!=-1){
baggage=parseFloat(clearString(document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultText")[8].innerHTML));
baggage=!baggage?(0):(baggage);}else{baggage=0}
tax=total-parseFloat(clearString(document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultText")[2].innerHTML))-baggage;
document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultText")[5].innerHTML=toDec(tax)+" PHP";
document.getElementById("pax_details").childNodes[1].getElementsByClassName("kDefaultTextBold")[4].innerHTML=toDec((total))+" PHP";
}
else
{
alert("An Error Occured");
}
}
}