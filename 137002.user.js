// ==UserScript==
// @name		KPZ Start List
// @version		1.7
// @namespace	http://camlost.blogspot.com/gm
// @description	Sort list of competitors registered to a KPZ race
// @include		http://kolopro.cz/Prihlaseni.php*
// @include		http://www.kolopro.cz/Prihlaseni.php*
// ==/UserScript==


var _DEBUG = false;
var SOURCE_TABLE_XPATH = "//div[@class='TZAVOD_TABLE_CLASS']/table";

function $x() 
{
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

function fetchCompetitorObjects(lstRows)
{
	var result = new Array();
	
	/* skip first (= header) row */
	for (var i = 1; i < lstRows.length; ++i) {
		var elRow = lstRows[i];
		var lstCells = $x(elRow, ".//td", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		var objCompetitor = new Competitor(lstCells);
		result.push(objCompetitor);
	}
	result.sort(function(a, b) {
		if (a.AvgPoints - 0 < b.AvgPoints - 0)
			return 1;
		if (a.AvgPoints - 0 > b.AvgPoints - 0)
			return -1;
		return 0;
	});
	return result;
}

function Competitor(lstCells)
{
	this.RegNum = lstCells[0].innerHTML;
	this.Name = lstCells[1].innerHTML;
	this.Category = lstCells[2].innerHTML;
	this.City = lstCells[3].innerHTML;
	this.Track = lstCells[4].innerHTML;
	this.Paid = lstCells[5].innerHTML;
	this.AvgPoints = lstCells[6].innerHTML;
}

function getTrackCode()
{
	var result = "";
	var re = new RegExp("trasa=\\d");
	var reMatch = document.URL.match(re);
	if (reMatch.length > 0) {
		var idx = reMatch[0].split("=")[1] - 0;
		var elTrack = document.getElementById("trasa");
		var track = elTrack.options[idx - 1].text;
		if (track.indexOf("Trasa") == "0" && track.length > 5)
			result = track[6];		
	}	
	return(result);
}

function fillTableOfCompetitors(el, lst)
{
	var trackCode = getTrackCode();
	var re = new RegExp("\\d+");
	var startNum = 0;
	for (var i = 0; i < lst.length; ++i) {
		var competitor = lst[i];
		var elTr = document.createElement("tr");
		
		// compute expected start number
		var startNumStr = "";
		//TESTif (competitor.Paid == "Z") {
			if (startNum == 150)
				startNum += 50;
			startNum++;
			startNumStr = trackCode + startNum;
		//TEST}
		//var elTdStNum = document.createElement("td");
		//elTdStNum.innerHTML = startNumStr;
		//elTr.appendChild(elTdStNum);

		// table row index
		var elTdOrder = document.createElement("td");
		elTdOrder.innerHTML = (i + 1) + ". / " + startNumStr;
		elTr.appendChild(elTdOrder);

		
		// fill table data
		for (var prop in competitor) {
			propCode = competitor[prop];			
			if (prop == "Name") {
				var reMatch = competitor["RegNum"].match(re);
				if (reMatch.length > 0) {
					propCode = '<a href="/' + reMatch[0] + '-8">' + competitor[prop] + '</a>';
				}
			}
			var elTd = document.createElement("td");			
			elTd.innerHTML = propCode;			
			elTr.appendChild(elTd);
		}		
		el.appendChild(elTr);
	}
}

function computeRaceCoeficient(lst)
{
	var sum = 0.0;
	var nMax = (lst.length >= 200)? 200 : lst.length;
	for (var i = 0; i < nMax; ++i) {
		var biker = lst[i];
		sum += (biker.AvgPoints - 0.0);
	}
	return sum / 10000.0;
}

function displayCoef(coef)
{
	var el = $x("//h2[@class='sipka n01']/span[contains(., 'závodníci')]", XPathResult.FIRST_ORDERED_NODE_TYPE);
	el.innerHTML = el.innerHTML + "&nbsp;(koeficient: " + coef.toFixed(2) + ")";
}

GM_log("Started...");

var elSourceTable = $x(SOURCE_TABLE_XPATH, XPathResult.FIRST_ORDERED_NODE_TYPE);
if (elSourceTable) {
	_DEBUG && GM_log("Source table found - class: " + elSourceTable.className);

	var lstTableRows = $x(elSourceTable, ".//tr", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	_DEBUG && GM_log("Number of table rows: " + lstTableRows.length);

	var lstCompetitors = fetchCompetitorObjects(lstTableRows);
	_DEBUG && GM_log("Array of competitors fetched succesfully.");
	
	var nCoef = computeRaceCoeficient(lstCompetitors);
	_DEBUG && GM_log("Race coeficient:  " + nCoef);
	displayCoef(nCoef);

	var elTableBody = $x(elSourceTable, ".//tbody", XPathResult.FIRST_ORDERED_NODE_TYPE);
	var elTableHeaderSrc = $x(elTableBody, ".//tr", XPathResult.FIRST_ORDERED_NODE_TYPE).innerHTML;
	//_DEBUG && GM_log(elTableHeaderSrc);
	elSourceTable.removeChild(elTableBody);
	_DEBUG && GM_log("TBODY element removed.");

	elTableBody = document.createElement("tbody");
	elSourceTable.appendChild(elTableBody);
	_DEBUG && GM_log("A new TBODY created.");

	var elTableHeader = document.createElement("tr");
	elTableHeader.innerHTML = "<td># / St. #</td>" + elTableHeaderSrc;
	elTableHeader.className = "zahlavi";
	elTableBody.appendChild(elTableHeader);
	fillTableOfCompetitors(elTableBody, lstCompetitors);
	_DEBUG && GM_log("Table content inserted.");
}

GM_log("Finished.");
