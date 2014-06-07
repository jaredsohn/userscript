// ==UserScript==
// @name           Better Directories
// @namespace      http://www.dreamedupdesign.com
// @description    Makes boring, plaintext HTTP directories look much nicer and more functional.
// @include        http*://*
// ==/UserScript==
/*global content unescape*/

/* "Is this a Directory?" */

try{
if(content.document.getElementsByTagName("iframe").length > 0){
	return;
}
if(content.document.getElementsByTagName("frame").length > 0){
	return;
}
}catch(err){
	return;
}
if(content.document.getElementsByTagName("pre").length === 0 && content.document.getElementsByTagName("table").length === 0){
	return;
}
if(content.document.getElementsByTagName("title").length === 0){
	return;
}
var firstNodeName = content.document.getElementsByTagName("body")[0].getElementsByTagName("*")[0].nodeName.toLowerCase();
if(firstNodeName != "h1" && firstNodeName != "table"){
	return;
}
var heading;
if(content.document.getElementsByTagName("h1").length === 0){
	if(firstNodeName != "table"){
		return;
	}
	if(content.document.getElementsByTagName("table")[0].firstChild.childNodes.length !== 1){
		return;
	}
	if(content.document.getElementsByTagName("table")[0].getElementsByTagName("font").length !== 1){
		return;
	}
	if(content.document.getElementsByTagName("table")[0].getElementsByTagName("font")[0].getElementsByTagName("b").length !== 1){
		return;
	}
	heading = content.document.getElementsByTagName("b")[0];
} else{
	if(content.document.getElementsByTagName("h1")[0].childNodes.length > 1){
		return;
	}
	if(content.document.getElementsByTagName("h1")[0].innerHTML.toLowerCase().indexOf(content.document.getElementsByTagName("title")[0].innerHTML.toLowerCase()) == -1){
		if(content.document.getElementsByTagName("title")[0].innerHTML.toLowerCase().substring(0,8) != "index of"){
			return;
		}
	}
	if(content.document.getElementsByTagName("h1")[0].getAttribute("class") !== null){
		return;
	}
	heading = content.document.getElementsByTagName("h1")[0];
} 
for(var x = 0;x < content.document.getElementsByTagName("meta").length; x++){
	if(content.document.getElementsByTagName("meta")[x].getAttribute("name") !== null){
		var metaName = content.document.getElementsByTagName("meta")[x].getAttribute("name").toLowerCase();
		if(metaName == "keywords" || metaName == "description" || metaName == "author"){
			return;
		}
	}
}
if(content.document.getElementsByTagName("link").length > 0){
	return;
}
if(content.document.getElementsByTagName("script").length > 0){
	return;
}
if(content.document.getElementsByTagName("form").length > 0){
	return;
}
/* Global Variables */ 
var head = content.document.getElementsByTagName("head")[0];
var body = content.document.getElementsByTagName("body")[0];
var pre = 0;
var table = 0;
var type = 1;
var tbody = 0;
var cutoff = 25;
var i,j = 0;//for loops
var dates = [];
var sizes = [];
var times = [];
var names = [];
var otherinfo = false;
var nolink = -1;
var errors = 0;
//var heading; is already defined
if(body.innerHTML.toLowerCase().indexOf("<!--") != -1){
	return;
}
/* Helper Functions */
function error(message){
	//For debugging purposes, avoids infinite error messages
	if(errors < 20){
		alert(message);
		errors++;
	}
}
function insertAfter(newNode,referenceNode){
	// This function inserts newNode after referenceNode
  referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}
function charIs(target,string,number){   	
	//Target is the character, string is the string you need analysing and number the zero based index of which character to test
	var subSection = string.charAt(number).toLowerCase();
	return (subSection == target);
}
function trim(stringToTrim) {
	//Remove whitespace from both ends of string
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
 function isDate(t){
	//3rd or 5th Character should be a space or hyphen, the first a 0,1,2 or 3
	return ((charIs(" ",t,2) || charIs("-",t,2) || charIs("-",t,4) || charIs("-",t,4)) && (charIs("0",t,0)||charIs("1",t,0)||charIs("2",t,0)||charIs("3",t,0)));
}
function isSize(t){
	//The first char should be a '<' or a '-' indicating a directory, or a numerical character not equal to 0, unless length is 1.
	return  ((charIs("<",t,0) || charIs("-",t,0) || (charIs("0",t,0) && t.length == 1) || charIs("1",t,0) || charIs("2",t,0) || charIs("3",t,0) || charIs("4",t,0) || charIs("5",t,0) || charIs ("6",t,0) || charIs("7",t,0) || charIs("8",t,0) || charIs("9",t,0)));
}
function isTime(t){
	//3rd Character should be a colon, the first a 0, 1 or a 2;
	return  (charIs(":",t,2) && (charIs("0",t,0) || charIs("1",t,0) || charIs("2",t,0)));
}
function parseTime(time){
	//Convert hh:mm to epoch milliseconds for sorting purposes
	var hours = parseInt(time.substring(0,2),10);
	var minutes = parseInt(time.substring(3,5),10);
	var ms = ((hours * 60) + minutes)*60*1000;
	return ms;
}
function parseDate(date,time){
	//convert date to epoch milliseconds, then add those contributed by time. For sorting purposes.
	date = date.replace(/-/g," ");//Replace all
	var d = Date.parse(date);
	d += parseTime(time);
	return d;
}
function parseFS(bytes,number_of_bytes){
	var modifier = 1;
	if(bytes === ""){return "";}
		if(bytes.charAt(bytes.length - 1).toLowerCase == "k"){
			bytes = bytes.substring(0,bytes.length - 1);
			modifier = 1024;
		}
		if(bytes.charAt(bytes.length - 1).toLowerCase == "m"){
			bytes = bytes.substring(0,bytes.length - 1);
			modifier = 1024 * 1024;
		}
		bytes = parseInt(bytes,10) * modifier;
		if(number_of_bytes){
			return bytes;
		}
		var units = [' bytes', ' KB', ' MB', ' GB'];
		var converted = bytes + units[0];
	for (j = 0; j < units.length; j++){
		if ((bytes/Math.pow(1024, j)) > 1.999){
			//i.e. if there are greater than 1.999 of the current unit, upgrade to the next
			converted = Math.round(bytes/Math.pow(1024, j), 2)  + units[j];
		}else{break;}
	}
return converted;
}
function getFileExt(filename){
	//Simple function for getting everything after the first full stop in a filename
	var parts = filename.split(".");
	parts.shift();//remove first element
	return parts.join(".");
}
function lastBit(filename){
	//Very simple function for getting everything after the last "/" unless that is the last character
	var indexOfLast = (filename.length - 1);
	if(filename.charAt(indexOfLast) == "/"){
		filename = filename.substring(0,indexOfLast);
	}
	var parts = filename.split("/");
	return parts[parts.length - 1];
}
function stripParams(filename){
	//Very simple function for getting everything before the '?' in a filename
	var parts = filename.split("?");
	return parts[0];
}
Date.prototype.format = function(formatString) {
	//For formatting a date. e.g. date.format(dd/MM/yy) outputs 01/01/08 etc
  var out = "";
  var token = "";
  for (j = 0; j < formatString.length; j++) {
    if (formatString.charAt(j) == token.charAt(0)) {
      token = token.concat(formatString.charAt(j));
      continue;
    }
    out = out.concat(this.convertToken(token));
    token = formatString.charAt(j);
  }
  return out + this.convertToken(token);
};

// internal call to map tokens to the date data
Date.prototype.convertToken = function (str) {
	//Very cut down to only use the tokens I need
  switch(str.charAt(0)) {
    case 'y': // set year
      return this.getFullYear().toString().substring(2);
    case 'd': // set date
      return Date.zeroPad(this.getDate(),str.length);
    case 'M': // set month
      return Date.zeroPad(this.getMonth()+1,str.length);
    default:
      return str;
  }
};

Date.zeroPad = function(num, width) {
	// helper function to add required zero characters to fixed length fields
  num = num.toString();
  while (num.length < width) {
	num = "0" + num;
  }
  return num;
};
function reformatDate(date){
	//Get epoch milliseconds of date
	var ms = parseDate(date,"00:00");
	var thedate = new Date();
	//Make the dates reference the specified date
	thedate.setTime(ms);
	return thedate.format("MM/dd/y");
}
function splitDates(string){
		var parts = string.split(" ");
		dates.push(parts[0]);
		times.push(parts[1]);
}

/* Main Functions */
function applyCSS(){
	// Apply CSS (split for readability)
	var link = document.createElement("link");
	link.setAttribute("href","chrome:\/\/global\/skin\/dirListing\/dirListing.css");
 	link.setAttribute("rel","stylesheet");
	link.setAttribute("media","screen, projection");
	link.setAttribute("type","text/css");
	var style = document.createElement("style");
	var styletext = [];
	styletext[0] = document.createTextNode(":root {  font-family: sans-serif;} img {  border: 0;}th { text-align: left;  white-space: nowrap;} th > a {color: inherit;}table[order] > thead > tr > th {  cursor: pointer;}");
	styletext[1] = document.createTextNode("table[order] > thead > tr > th::after {  display: none;  width: .8em;  -moz-margin-end: .8em;  text-align: right;}table[order=\"asc\"] > thead > tr > th::after {  content: \"\\2193\"; /* DOWNWARDS ARROW (U+2193) */}");
	styletext[2] = document.createTextNode("table[order=\"desc\"] > thead > tr > th::after {  content: \"\\2191\"; /* UPWARDS ARROW (U+2191) */} table[order][order-by=\"0\"] > thead > tr > th:first-child > a ,table[order][order-by=\"1\"] > thead > tr >");
	styletext[3] = document.createTextNode("th:first-child + th > a ,table[order][order-by=\"2\"] > thead > tr > th:first-child + th + th > a {  text-decoration: underline;}  table[order][order-by=\"0\"] > thead > tr > th:first-child::after ,table[order][order-by=\"1\"]");
	styletext[4] = document.createTextNode("> thead > tr > th:first-child + th::after ,table[order][order-by=\"2\"] > thead > tr > th:first-child + th + th::after {  display: inline-block;}table.remove-hidden > tbody > tr.hidden-object {  display: none;}");
	styletext[5] = document.createTextNode("td > a {  display: inline-block;}/* name */th:first-child {  -moz-padding-end: 2em;}/* size */th:first-child + th {  -moz-padding-end: 1em; }td:first-child + td {  text-align: right;  -moz-padding-end: 1em;  white-space: nowrap;}");
	styletext[6] = document.createTextNode("/* date */td:first-child + td + td {  -moz-padding-start: 1em;  -moz-padding-end: .5em;  white-space: nowrap;}/* time */td:last-child {  -moz-padding-start: .5em;  white-space: nowrap;}");
	styletext[7] = document.createTextNode("@-moz-document url-prefix(gopher://) {  td {  white-space: pre !important;   font-family: monospace;  }}.symlink {  font-style: italic;}.dir ,.symlink ,.file {  -moz-margin-start: 20px;}");
	styletext[8] = document.createTextNode(".dir::before ,.file > img {  -moz-margin-end: 4px;  -moz-margin-start: -20px;  vertical-align: middle;}.dir::before { content: url(resource://gre/res/html/folder.png);}");
	styletext[9] = document.createTextNode(" table[order]{margin-bottom:1em;} ");//For stuff newly at end
	styletext[10] = document.createTextNode(" p#UI_goUp+div{margin-top:4em;} div+div{margin-top:2em;}");//Proper vertical spacing
	styletext[11] = document.createTextNode(" table{font-size:100%;} ");	//Don't know why this hack is needed
	for(i = 0; i < styletext.length;i++){
		style.appendChild(styletext[i]); 
	}
	head.appendChild(style);
	head.appendChild(link);
}

function applyScript(){
	//Add Script (split for readability)
	var script = document.createElement("script");
	var scripttext = [];
	scripttext[0] = document.createTextNode("var gTable, gOrderBy, gTbody, gRows, gUI_showHidden;  function start(){gTable = document.getElementsByTagName(\"table\")[0];  gTbody = gTable.tBodies[0];");
	scripttext[1] = document.createTextNode("if (gTbody.rows.length < 2)  return;  gUI_showHidden = document.getElementById(\"UI_showHidden\");  var headCells = gTable.tHead.rows[0].cells,  hiddenObjects = false;");
  scripttext[2] = document.createTextNode("function rowAction(i) {  return function(event) {  event.preventDefault();  orderBy(i);  }  }  for (var i = headCells.length - 1; i >= 0; i--) { "); 
	scripttext[3] = document.createTextNode("headCells[i].addEventListener(\"click\", rowAction(i), true);  } ");
	scripttext[4] = document.createTextNode("if (gUI_showHidden) {  gRows = Array.slice(gTbody.rows);  hiddenObjects = gRows.some(function (row) row.className == \"hidden-object\");  }  gTable.setAttribute(\"order\", \"\");");
  scripttext[5] = document.createTextNode("if (hiddenObjects) {  gUI_showHidden.style.display = \"block\";  updateHidden();  } } function compareRows(rowA, rowB) {  var a = rowA.cells[gOrderBy].getAttribute(\"sortable-data\") || \"\";");
  scripttext[6] = document.createTextNode("var b = rowB.cells[gOrderBy].getAttribute(\"sortable-data\") || \"\";  var intA = +a;  var intB = +b;  if (a == intA && b == intB) {  a = intA;  b = intB;  } else {  a = a.toLowerCase();");
	scripttext[7] = document.createTextNode("b = b.toLowerCase();  }  if (a < b)  return -1;  if (a > b)  return 1;  return 0; } function orderBy(column) {  if (!gRows)  gRows = Array.slice(gTbody.rows);  var order;");
  scripttext[8] = document.createTextNode("if (gOrderBy == column) {  order = gTable.getAttribute(\"order\") == \"asc\" ? \"desc\" : \"asc\";  } else {  order = \"asc\";  gOrderBy = column;  gTable.setAttribute(\"order-by\", column);");
  scripttext[9] = document.createTextNode("gRows.sort(compareRows);  }  gTable.removeChild(gTbody);  gTable.setAttribute(\"order\", order);  if (order == \"asc\")  for (var i = 0; i < gRows.length; i++)  gTbody.appendChild(gRows[i]);");
  scripttext[10] = document.createTextNode("else  for (var i = gRows.length - 1; i >= 0; i--)  gTbody.appendChild(gRows[i]);  gTable.appendChild(gTbody); } function updateHidden() {");
  scripttext[11] = document.createTextNode("gTable.className = UI_showHidden.getElementsByTagName(\"input\")[0].checked ?  \"\" :  \"remove-hidden\"; }  start();");
	for(i = 0; i < scripttext.length; i++){
		script.appendChild(scripttext[i]); 
	}
	head.appendChild(script);
}

function setFavicon(){
	var links = head.getElementsByTagName("link");
	var found = false;
  for (i = 0; i < links.length; i++) {
    var theLink = links[i];
    if (theLink.rel=="shortcut icon") {
      found = true; // Favicon is in place
    }
  }
	if(!found){
	  var newLink = document.createElement("link");
	  newLink.type = "image/x-icon";
	  newLink.rel = "shortcut icon";
		var split1 = content.document.location.toString().split("://")[1];
		var split2 = split1.split("/")[0];
		newLink.href = "http://" + split2 + "/favicon.ico";
		var newLink2 = document.createElement("link");
		newLink2.type = "image/x-icon";
	  newLink2.rel = "shortcut icon";
	  newLink2.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeBJREFUeNqcU81O20AQ%2FtZ2AgQSYQRqL1UPVG2hAUQkxLEStz4DrXpLpD5Drz31Cajax%2Bghhx6qHIJURBTx";
		newLink2.href += "IwQRwopCBbZjHMcOTrzermPipsSt1Iw03p3ZmW%2B%2B2R0TxhgOD34wjCHZlQ0iDYz9yvEfhxMTCYhEQDIZhkxKd2sqzX2TOD2vBQCQhpPefng1ZP2dVPlLLdpL8SEMcxng%2Fbs0RIHhtgs4twxOh%2BHjZxvzDx%2F3GQQiDFISiRBLFMPKTRMollzcWECrDVhtxtdRVsL9yo";
		newLink2.href += "uPxGj%2FbdfFlUZhtDyYbYqWRUdai1oQRZ5oHeHl2gNM%2B01Uqio8RlH%2BnsazJzNwXcq1B%2BiXPHprlEEymeBfXs1w8XxxihfyuXqoHqpoGjZM04bddgG%2F9%2B8WGj87qDdsrK9m%2BoA%2BpbhQTDh2l1%2Bi2weNbSHMZyjvNXmVbqh9Fj5Oz27uEoP%2BSTxANruJs9L";
		newLink2.href += "%2FT6P0ewqPx5nmiAG5f6AoCtN1PbJzuRyJAyDBzzSQYvErf06yYxhGXlEa8H2KVGoasjwLx3Ewk858opQWXm%2B%2Fib9EQrBzclLLLy89xYvlpchvtixcX6uo1y%2FzsiwHrkIsgKbp%2BYWFOWicuqppoNTnStHzPFCPQhBEBOyGAX4JMADFetubi4BSYAAAAABJRU5ErkJggg%3D%3D";
	  head.appendChild(newLink2);
		head.appendChild(newLink);
	}
}
function choosePreTable(){
	var secLastNode = body.childNodes[body.childNodes.length - 2];
	if(secLastNode.nodeName.toLowerCase() == "pre"){
			if(secLastNode.childNodes.length === 1){
			//i.e. only one element: a text nodes most likely
			var newAddress = document.createElement("address");
			newAddress.appendChild(secLastNode.firstChild);
			body.removeChild(secLastNode);
			body.appendChild(newAddress);
		}
	}
	if(content.document.getElementsByTagName("pre").length !== 0){
		pre = content.document.getElementsByTagName("pre")[0];
		if(content.document.getElementsByTagName("pre").length === 2){
			if(pre.getElementsByTagName("a").length < 1){
				pre = content.document.getElementsByTagName("pre")[1];
				body.removeChild(content.document.getElementsByTagName("pre")[0]);
			}
		}
	}else{
		if(content.document.getElementsByTagName("table").length !== 0){
			table = content.document.getElementsByTagName("table")[0];
			tbody = table.getElementsByTagName("tbody")[0];
			type = 2;
		}
	}
}
function changeTitle(){
	// Change Titles
	var headingisH1 = (heading.nodeName.toLowerCase() == "h1");
	var name = "Index of " + stripParams(content.document.location.toString());
	var text = document.createTextNode(name);
	document.title = name;
	if(headingisH1 === true){
		heading.appendChild(text);
		heading.removeChild(heading.firstChild);
	} else{
		var newHeading = document.createElement("h1");
		newHeading.appendChild(text);
		body.insertBefore(newHeading,content.document.getElementsByTagName("table")[0]);
		body.removeChild(content.document.getElementsByTagName("table")[0]);
	}
}

function moveAddress(){
	if(content.document.getElementsByTagName("address").length == 1){
		var address = content.document.getElementsByTagName("address")[0];
		body.removeChild(address);
		body.appendChild(address);
	}
}

function swapGoUp(){
	// Swap Go Up links
	var divider = content.document.getElementsByTagName("a").length;
	if(5 < divider){
		divider = 5;
	}
	for(i = 0; i < divider;i++){
		if(content.document.getElementsByTagName("a")[i].firstChild.nodeValue.toLowerCase().indexOf("parent") !== -1){
			nolink = i;
		}
	}
	if(nolink > -1){
		var goup;
		var a_to_parent = content.document.getElementsByTagName("a")[nolink];
		var para  = document.createElement("p");
		if(a_to_parent.firstChild.nodeValue.toLowerCase().indexOf("directory") !== -1){		
			para.setAttribute("id","UI_goUp");
			var link = document.createElement("a");
			link.setAttribute("class","up");
			link.setAttribute("href",a_to_parent.getAttribute("href"));
			goup = document.createTextNode("Up to a higher level directory");
			link.appendChild(goup);
			para.appendChild(link);
			if(type !== 2){
				pre.removeChild(a_to_parent);
			}
		}
		if(type == 2){
			body.insertBefore(para, table);
		}else{
			body.insertBefore(para, pre);
		}
	}
}

function cleanUp(){
	if(pre !== 0){
		for(i = 0;i<2;i++){
			if(pre.getElementsByTagName("hr").length > 0){
				pre.removeChild(pre.getElementsByTagName("hr")[0]);
			} else{
				if(body.getElementsByTagName("hr").length > 0){
					body.removeChild(body.getElementsByTagName("hr")[0]);
				} 
			}
		}
	}
	if(type == 2){
		var numberTRs = tbody.getElementsByTagName("tr").length;
		for(i = 0;i<3;i++){
			if(numberTRs > 0){
				tbody.removeChild(tbody.getElementsByTagName("tr")[0]);
				numberTRs -= 1;
			}
		}
		tbody.removeChild(tbody.getElementsByTagName("tr")[numberTRs - 1]);
	}
	if(type == 1){
		for(i = 0;i<nolink;i++){
			if(pre.getElementsByTagName("a").length > 0){
				pre.removeChild(pre.getElementsByTagName("a")[0]);
			}
		}
		for(i = 0;i<2;i++){
			if(pre.getElementsByTagName("img").length > 0){
				pre.removeChild(pre.getElementsByTagName("img")[0]);
			}
		}
	}
}
function changeDesc(){
	if(table === 0 && content.document.getElementsByTagName("table").length > 0){
		var textToAdd = [];
		var tableOther = content.document.getElementsByTagName("table")[0];
		for(i = 0;i < 5;i++){
			if(body.childNodes[i].nodeType == 3){
				if(body.childNodes[i].nodeValue.length > 1){
					var bottom_para = document.createElement("p");
					bottom_para.appendChild(body.childNodes[i]);
					insertAfter(bottom_para,heading);
					break;
				}
			}
		}
		var tableOtherTags = tableOther.getElementsByTagName('td');
		if(tableOtherTags.length > 0){
			var temp = document.createElement("div");
			var foundH1 = false;
			for(i = 0;i < tableOtherTags.length;i++){
				if(tableOtherTags[i].innerHTML.indexOf("<h1>") != -1){
					var parts = tableOtherTags[i].innerHTML.split("<h1>");
					var endparts = tableOtherTags[i].innerHTML.split("</h1>");
					temp.innerHTML += parts[0] + endparts[1];
					foundH1 = true;
				} else{
					temp.innerHTML += tableOtherTags[i].innerHTML;		
				}
			}
			if(foundH1){
				body.removeChild(tableOther);
				body.insertBefore(heading,body.firstChild);
			}
			if(body.getElementsByTagName("div").length > 0){
				otherinfo = true;
			}
			body.appendChild(temp);
		}
	}
}
function getSnippets(){
	var txt = "";
	if(type == 2){
		for(i = 0;i < tbody.childNodes.length;i++){
			for(j = 0;j < tbody.childNodes[i].childNodes.length;j++){
				var cell = tbody.childNodes[i].childNodes[j];
				if(cell.firstChild.nodeType == 3){
					txt += cell.firstChild.nodeValue;
					txt += "  ";
				}
				if(cell.firstChild.nodeType == 1){
					if(cell.firstChild.nodeName.toLowerCase() == "a"){
						names.push(unescape(lastBit(cell.firstChild.getAttribute("href"))));
					}
				}
			}
		}
	} else{
		for(i = 0;i < pre.childNodes.length;i++){
			if(pre.childNodes[i].nodeType == 3){
				txt += pre.childNodes[i].nodeValue;
			}
			if(pre.childNodes[i].nodeType == 1){
				if(pre.childNodes[i].nodeName.toLowerCase() == "a"){
					names.push(unescape(lastBit(pre.childNodes[i].getAttribute("href"))));
				}
			}
		}
	}
	return txt;
}

function sortSnippets(thesnippets,split){
	for(i = 0;i < thesnippets.length;i++){
		var item = trim(thesnippets[i]);
		if(item.length === 0){continue;}
		if(isDate(item)){ 
			if(split){
				splitDates(item);
			}else{
				dates.push(item);
			}
			continue;
		}
		if(!split){
			if(isTime(item)){
				times.push(item);
				continue;
			}
		}
		if(isSize(item)){
			if(item == "<dir>"||item == "-"){
				sizes.push("");
			} else{
				sizes.push(item);
			}
		}
	}
	if(dates.length === 0 && sizes.length === 0 && times.length === 0){
		names = [];
		names.push("No records found.");
		sizes.push("0");
		dates.push("0-0-00");
		times.push("00");
	}
}

function getTHead(){
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	var th_names = ["Name","Size","Last Modified"];
	var link, linktext, th;
	for(i = 0;i < 3;i++){
		th = document.createElement("th");
		link = document.createElement("a");
		link.setAttribute("href","");
		linktext = document.createTextNode(th_names[i]);
		link.appendChild(linktext);
		th.appendChild(link);
		if(i == 2){
			th.setAttribute("colspan","2");
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	return thead;
}

function getTBody(){
	var tbody = document.createElement("tbody");
	var name, time, size, date;
	var td = [];
	for(i = 0;i < dates.length;i++){
		name = names[i];
		time = times[i];
		size = sizes[i];
		date = dates[i];
		var tr2 = document.createElement("tr");	
		td = [];
		for(j = 0; j < 4; j++){
			td[j] = document.createElement("td");
		}
		td[0].setAttribute("sortable-data",("2" +	name));
		var thename = document.createTextNode(name);
		if(name != "No records found."){
			var a = document.createElement("a");
			var totalhref = stripParams(content.document.location.toString());
			var indexOfLast = (totalhref.length - 1);
			if(totalhref.charAt(indexOfLast) != "/"){
				totalhref += "/";
			}
			totalhref += name;
			if(size === ""){
				a.setAttribute("class","dir");
			} else{
				a.setAttribute("class","file");
				var img = document.createElement("img");
				img.setAttribute("alt","File:");
				img.setAttribute("src","moz-icon://." + getFileExt(name) + "?size=16");
				a.appendChild(img);
				if(name.length > (cutoff + 5)){
					name = name.substring(0,cutoff - getFileExt(name).length) + "[...]." + getFileExt(name);
				}
			}
			a.setAttribute("href",totalhref);		
			a.appendChild(thename);
			td[0].appendChild(a);
		}else{
			td[0].appendChild(thename);
		}
		td[1].setAttribute("sortable-data",parseFS(size,true));
		var text = document.createTextNode(parseFS(size,false));
		td[1].appendChild(text);
		td[2].setAttribute("sortable-data",parseDate(date,time));
		var text2 = document.createTextNode(reformatDate(date));
		td[2].appendChild(text2);
		var text3 = document.createTextNode(time + ":00");
		td[3].appendChild(text3);
		for(j = 0; j < td.length; j++){
			tr2.appendChild(td[j]);
		}
		tr2.appendChild(td[3]);
		tbody.appendChild(tr2);
	}
	return tbody;
}

// Runtime
setFavicon();
choosePreTable();
if(type === 1){
	//Preserve type 2s regardless
	if(body.innerHTML.toLowerCase().indexOf("[to parent directory]") != -1){
		type = 0;
	} 
}
applyCSS();
changeTitle();
changeDesc();
swapGoUp();
cleanUp();
//Parse Data
var snippets = getSnippets().split("  ");
sortSnippets(snippets, type);
if((dates.length - 1) === names.length){
	dates.shift();
}if((sizes.length - 1) === names.length){
	sizes.shift();
}
while(names.length > dates.length){
	names.shift();
}
//Change over main data
var newTable = document.createElement("table");
newTable.setAttribute("order","");
newTable.appendChild(getTHead());
newTable.appendChild(getTBody());
if(otherinfo){
		insertAfter(newTable,body.getElementsByTagName("p")[0]);
	} else{
		body.appendChild(newTable);
}
if(type === 2){
	body.removeChild(table);
} else{
	body.removeChild(pre);
}
moveAddress();
applyScript();