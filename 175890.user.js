// ==UserScript==
// @name        Diamond Dynasty Retired Stats
// @namespace   baseballsimulator.com
// @include     http://theshownation.com/dynasty_team/me/leaders*
// @include     http://www.theshownation.com/dynasty_team/me/leaders*
// @include     http://theshownation.com/dynasty_team/me/leaders.json*
// @version     1
// ==/UserScript==

setTimeout( delay, 2000);

function delay(){

favicon = 'data:image/icon,%00%00%01%00%01%00%10%10%00%00%01%00%20%00h%04%00%00%16%00%00%00%28%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%04%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D1%D0%CF%FF%A2%93%87%FF%7CcL%FFhK2%FFhK2%FF%7BcL%FF%A1%92%86%FF%D0%CE%CD%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D4%D4%D4%FF%AA%9D%92%FFeG%2C%FF%A7%96%86%FF%DE%D8%D3%FF%FB%FB%FA%FF%FB%FB%FA%FF%DE%D8%D3%FF%A7%96%86%FFeG%2C%FF%A8%9B%90%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D4%D4%D4%FF%99%87y%FF%83kV%FF%F5%F3%F1%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%F5%F3%F1%FF%83kU%FF%96%84v%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%B1%A5%9B%FF%81iS%FF%FD%FD%FD%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FD%FD%FC%FF%82iS%FF%AD%A2%98%FF%D3%D3%D3%FF%D6%D5%D5%FFiK1%FF%F3%F0%EF%FF%FF%FF%FF%FF%FF%FF%FF%FF%9F%8C%7C%FFw%5CE%FF%F1%EE%EC%FFQ%2F%0F%FFR0%0F%FFR0%0F%FFR0%0F%FF%99%84r%FF%F3%F1%EF%FFhJ0%FF%D3%D3%D2%FF%B1%A5%9C%FF%A0%8D%7C%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%9D%89x%FFsX%3F%FF%F0%EE%EB%FFG%23%00%FF%8Fye%FF%BC%AE%A1%FF%BC%AE%A1%FF%D7%CF%C8%FF%FF%FF%FF%FF%A0%8D%7C%FF%AD%A1%98%FF%8Dxe%FF%D5%CD%C7%FF%9C%88w%FFQ%2F%0E%FFR0%0E%FFM%29%06%FFJ%27%03%FF%AC%9B%8E%FFG%23%00%FF%B8%AA%9F%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%D5%CD%C7%FF%8Aub%FF%7CbK%FF%EF%EB%E8%FF%AA%99%8B%FFH%24%00%FF%AE%9E%90%FF%80gO%FFdE%28%FF%D9%D1%CB%FFI%25%02%FFdE%27%FFuZ%3F%FF%90zf%FF%FB%FA%FA%FF%FF%FF%FF%FF%EF%EB%E8%FFx%5EG%FF%7DdM%FF%ED%EA%E7%FF%FA%F9%F8%FFeG%2A%FF%80gP%FF%9C%89w%FFsX%3F%FF%FF%FF%FF%FF%BA%AD%A2%FF%5C%3B%1E%FF%5C%3C%1E%FFK%27%03%FF%9F%8D%7C%FF%FF%FF%FF%FF%ED%E9%E7%FFy%60H%FF%90%7Ci%FF%D0%C7%C0%FF%FF%FF%FF%FF%D6%CE%C8%FFI%26%02%FFdE%29%FFsX%3F%FF%FB%FA%FA%FF%D5%CC%C5%FF%EE%EB%E9%FF%FF%FF%FF%FF%5D%3D%1F%FF%93%7Di%FF%FF%FF%FF%FF%D0%C7%C0%FF%8Cxe%FF%B6%AB%A3%FF%97%82p%FF%FF%FF%FF%FF%FF%FF%FF%FF%99%84r%FFI%25%00%FFsX%3F%FF%F0%ED%EA%FFG%23%00%FF%9F%8C%7D%FF%D7%CF%C8%FFX7%19%FF%93%7Di%FF%FF%FF%FF%FF%97%82p%FF%B2%A8%9F%FF%D8%D8%D8%FFiK1%FF%EB%E7%E4%FF%FF%FF%FF%FF%F7%F6%F5%FFaA%23%FFsX%3F%FF%FC%FB%FB%FF~eO%FFI%25%00%FFI%25%00%FFN%2B%09%FF%CF%C6%BF%FF%EB%E7%E4%FFhJ0%FF%D5%D5%D5%FF%D3%D3%D3%FF%BB%B1%A9%FFsX%3F%FF%F8%F7%F6%FF%FF%FF%FF%FF%E9%E4%E1%FF%DD%D6%D0%FF%FF%FF%FF%FF%FA%F9%F9%FF%CE%C5%BF%FF%CE%C5%BF%FF%E1%DB%D8%FF%F8%F7%F6%FFtX%40%FF%B7%AD%A5%FF%D3%D3%D3%FF%D3%D3%D3%FF%D4%D4%D4%FF%A7%97%89%FFrV%3D%FF%E8%E4%E0%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%E8%E4%E0%FFrV%3D%FF%A3%94%86%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D4%D4%D4%FF%B9%AE%A6%FFdE%2A%FF%90zf%FF%C7%BC%B3%FF%E2%DC%DA%FF%E2%DC%DA%FF%C7%BC%B3%FF%90zf%FFcE%29%FF%B6%AC%A3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D7%D6%D6%FF%B1%A6%9C%FF%8Bvb%FFy%5EE%FFx%5ED%FF%8Bub%FF%B0%A4%9B%FF%D6%D5%D4%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%D3%D3%D3%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00';


function sortTables() {
	if (!document.getElementsByTagName) return;
   var tbls = document.getElementsByTagName("table");
   	
   for (var ti=0;ti<tbls.length;ti++) {
       var thisTbl = tbls[ti];
       
       // The following line is from the original sorttable.js
	   // Any table to sort must have a class="sortable" and an unique ID - Frank Ralf
	   //if (((' '+thisTbl.className+' ').indexOf("datatab_nowidth cleft tright") != -1)) {
	   ts_makeSortable(thisTbl);
	   //}
   }
}

function ts_makeSortable (table) {

	
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow) return;
    
    // We have a first row: assume it's the header, and make its contents clickable links
    for (var i=0;i<firstRow.cells.length;i++) {
        var cell = firstRow.cells[i];
		var txt = ts_getInnerText(cell);
		
		// From here on slight modifications to the original - Frank Ralf
		// "onclick" won't work with Greasemonkey.
		// The number of the column is safed as a custom attribute for later reference when calling the ts_resortTabel function.
        cell.innerHTML = '<a href="#" class="sortheader" column="'+i+'">'+txt+'<span class="sortarrow"></span></a>';
		// Get link as object and addEventListener
		elmLinks = cell.getElementsByTagName("a")
		elmLinks[0].addEventListener(
		'click', 
		function(event){
			var lnk = event.target
			var  col = lnk.getAttribute('column')
			ts_resortTable(lnk, col)		// the call to the original function
			}, 
		false)
    }
}

// The rest has been left unchanged - Frank Ralf

function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}

function ts_resortTable(lnk) {
    // get the span
    var span;

    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    var spantext =  ts_getInnerText(span);
    var td = lnk.parentNode;
    var column = td.cellIndex;
    var table =  getParent(td,'TABLE');

    // Work out a type for the column
    if (table.rows.length <= 1) return;
    var itm = ts_getInnerText(table.rows[1].cells[column]);
    sortfn = ts_sort_caseinsensitive;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^[$]/)) sortfn = ts_sort_currency;
    if (itm.match(/^[\d\.]+$/)) sortfn = ts_sort_numeric;
    SORT_COLUMN_INDEX = column;
    var firstRow = new Array();
    var newRows = new Array();
   
    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

    newRows.sort(sortfn);

    if (span.getAttribute("sortdir") == 'up') {
        ARROW = '&darr;';
	span.setAttribute('sortdir','down');
    } else {
        ARROW = '&uarr;';
        newRows.reverse();
        span.setAttribute('sortdir','up');
    }    
    
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows

	    for (i=0;i<newRows.length;i++) { 
		    if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))){ 
			    if(newRows[i].innerHTML.indexOf('TOTALS') == -1){

			    	table.tBodies[0].appendChild(newRows[i]);

			    }
		    }
	    }

	    for (i=0;i<newRows.length;i++) { 
		  
			    if(newRows[i].innerHTML.indexOf('TOTALS') != -1){

			    	table.tBodies[0].appendChild(newRows[i]);

			    }
		
	    }

    // do sortbottom rows only
    //for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}
    
    // Delete any other arrows there may be showing
    var allspans = document.getElementsByTagName("span");
    for (var ci=0;ci<allspans.length;ci++) {
        if (allspans[ci].className == 'sortarrow') {
            if ( getParent(allspans[ci],"table") ==  getParent(lnk,"table")) { // in the same table as us?
                allspans[ci].innerHTML = '';
		//allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
            }
        }
    }
        
    span.innerHTML = ARROW;
}

function getParent (el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return  getParent(el.parentNode, pTagName);
}
function ts_sort_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa.length == 10) {
        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}

function ts_sort_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
}

function ts_sort_numeric(a,b) { 
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}
/*
function ts_sort_caseinsensitive(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}
*/
function ts_sort_caseinsensitive(a,b) {
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).substring(3,ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).length));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).substring(3,ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).length)); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}


function ts_sort_default(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}


function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
} 

//end (c) Stuart Langridge

var thisURL = document.URL;

var team_id = thisURL.substring(thisURL.indexOf('team_id=')+8,thisURL.indexOf('&sEcho=1'));




document.addEventListener('click', function(event) {


	if(event.target.text == 'Retired Stats'){

		GM_openInTab(myJSONString);
	}

	if(event.target.value == 'delete'){

	var newRetiredTeam = '';		


	retrievedTeam = GM_getValue("myRetiredTeam",'');
	retrievedTeam2 = GM_getValue("myRetiredTeam2",'');	
	retrievedTeam3 = GM_getValue("myRetiredTeam3",'');
	retrievedTeam4 = GM_getValue("myRetiredTeam4",'');
	retrievedTeam5 = GM_getValue("myRetiredTeam5",'');	


	if(retrievedTeam.indexOf(team_id) != -1){

		retrievedTeamArray = retrievedTeam.split('|');

		for (var i = 0; i < retrievedTeamArray.length; i++) {


			if(retrievedTeamArray[i].indexOf(event.target.getAttribute('name')) != -1){


			}
			else
			{
			
				newRetiredTeam = newRetiredTeam + retrievedTeamArray[i] + '|';

			}

		}	

		newRetiredTeam = newRetiredTeam.substring(0,newRetiredTeam.length-1);

		var r=confirm("Are you sure you want to delete?");

		if (r==true)
  		{
			GM_setValue("myRetiredTeam",newRetiredTeam);

			var textareas = document.getElementsByTagName('button');

			for (var i = 0; i < textareas.length; i++) {

				var textarea = textareas[i];
			
				if (textarea.getAttribute('name')==event.target.getAttribute('name')) {

					var matchp24 = textarea.getAttribute('value').match('delete');

					if (matchp24){

						blank = document.createElement("text");
						blank.innerHTML = 'deleted';
					
         					textarea.parentNode.replaceChild(blank,textarea);

					}

				}	

			}
  		}

		


	}
	else if(retrievedTeam2.indexOf(team_id) != -1){

		retrievedTeamArray = retrievedTeam2.split('|');

		for (var i = 0; i < retrievedTeamArray.length; i++) {


			if(retrievedTeamArray[i].indexOf(event.target.getAttribute('name')) != -1){


			}
			else
			{
			
				newRetiredTeam = newRetiredTeam + retrievedTeamArray[i] + '|';

			}

		}	

		newRetiredTeam = newRetiredTeam.substring(0,newRetiredTeam.length-1);

		var r=confirm("Are you sure you want to delete?");

		if (r==true)
  		{		

			GM_setValue("myRetiredTeam2",newRetiredTeam);

			var textareas = document.getElementsByTagName('button');

			for (var i = 0; i < textareas.length; i++) {

				var textarea = textareas[i];
			
				if (textarea.getAttribute('name')==event.target.getAttribute('name')) {

					var matchp24 = textarea.getAttribute('value').match('delete');

					if (matchp24){

						blank = document.createElement("text");
						blank.innerHTML = 'deleted';
					
         					textarea.parentNode.replaceChild(blank,textarea);

					}


				}	

			}
		}


	}
	else if(retrievedTeam3.indexOf(team_id) != -1){

		retrievedTeamArray = retrievedTeam3.split('|');

		for (var i = 0; i < retrievedTeamArray.length; i++) {


			if(retrievedTeamArray[i].indexOf(event.target.getAttribute('name')) != -1){


			}
			else
			{
			
				newRetiredTeam = newRetiredTeam + retrievedTeamArray[i] + '|';

			}

		}	

		newRetiredTeam = newRetiredTeam.substring(0,newRetiredTeam.length-1);

		var r=confirm("Are you sure you want to delete?");

		if (r==true)
  		{		

		GM_setValue("myRetiredTeam3",newRetiredTeam);

		var textareas = document.getElementsByTagName('button');

		for (var i = 0; i < textareas.length; i++) {

			var textarea = textareas[i];
			
			if (textarea.getAttribute('name')==event.target.getAttribute('name')) {

				var matchp24 = textarea.getAttribute('value').match('delete');

				if (matchp24){

					blank = document.createElement("text");
					blank.innerHTML = 'deleted';
					
         				textarea.parentNode.replaceChild(blank,textarea);

				}


			}	

		}

		}


	}
	else if(retrievedTeam4.indexOf(team_id) != -1){

		retrievedTeamArray = retrievedTeam4.split('|');

		for (var i = 0; i < retrievedTeamArray.length; i++) {


			if(retrievedTeamArray[i].indexOf(event.target.getAttribute('name')) != -1){


			}
			else
			{
			
				newRetiredTeam = newRetiredTeam + retrievedTeamArray[i] + '|';

			}

		}	

		newRetiredTeam = newRetiredTeam.substring(0,newRetiredTeam.length-1);

		var r=confirm("Are you sure you want to delete?");

		if (r==true)
  		{

		GM_setValue("myRetiredTeam4",newRetiredTeam);

		var textareas = document.getElementsByTagName('button');

		for (var i = 0; i < textareas.length; i++) {

			var textarea = textareas[i];
			
			if (textarea.getAttribute('name')==event.target.getAttribute('name')) {

				var matchp24 = textarea.getAttribute('value').match('delete');

				if (matchp24){

					blank = document.createElement("text");
					blank.innerHTML = 'deleted';
					
         				textarea.parentNode.replaceChild(blank,textarea);

				}


			}	

		}

		}


	}
	else if(retrievedTeam5.indexOf(team_id) != -1){

		retrievedTeamArray = retrievedTeam5.split('|');

		for (var i = 0; i < retrievedTeamArray.length; i++) {


			if(retrievedTeamArray[i].indexOf(event.target.getAttribute('name')) != -1){


			}
			else
			{
			
				newRetiredTeam = newRetiredTeam + retrievedTeamArray[i] + '|';

			}

		}	

		newRetiredTeam = newRetiredTeam.substring(0,newRetiredTeam.length-1);

		var r=confirm("Are you sure you want to delete?");

		if (r==true)
  		{

		GM_setValue("myRetiredTeam5",newRetiredTeam);

		var textareas = document.getElementsByTagName('button');

		for (var i = 0; i < textareas.length; i++) {

			var textarea = textareas[i];
			
			if (textarea.getAttribute('name')==event.target.getAttribute('name')) {

				var matchp24 = textarea.getAttribute('value').match('delete');

				if (matchp24){

					blank = document.createElement("text");
					blank.innerHTML = 'deleted';
					
         				textarea.parentNode.replaceChild(blank,textarea);

				}


			}	

		}


		}



	}	




	}	

   }, true);


if(thisURL.indexOf('theshownation.com/dynasty_team/me/leaders') != -1 && thisURL.indexOf('.json') == -1){

var records =  document.evaluate("//table[@class='display dataTable']/@data-source",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

records = records.snapshotItem(0);
recordsText = records.textContent;

recordsText = recordsText.substring(recordsText.lastIndexOf('=')+1);

myJSONString = 'http://theshownation.com/dynasty_team/me/leaders.json?position=ALL&team_id='+ recordsText + '&sEcho=1&iColumns=110&sColumns=&iDisplayStart=0&iDisplayLength=40&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&mDataProp_10=10&mDataProp_11=11&mDataProp_12=12&mDataProp_13=13&mDataProp_14=14&mDataProp_15=15&mDataProp_16=16&mDataProp_17=17&mDataProp_18=18&mDataProp_19=19&mDataProp_20=20&mDataProp_21=21&mDataProp_22=22&mDataProp_23=23&mDataProp_24=24&mDataProp_25=25&mDataProp_26=26&mDataProp_27=27&mDataProp_28=28&mDataProp_29=29&mDataProp_30=30&mDataProp_31=31&mDataProp_32=32&mDataProp_33=33&mDataProp_34=34&mDataProp_35=35&mDataProp_36=36&mDataProp_37=37&mDataProp_38=38&mDataProp_39=39&mDataProp_40=40&mDataProp_41=41&mDataProp_42=42&mDataProp_43=43&mDataProp_44=44&mDataProp_45=45&mDataProp_46=46&mDataProp_47=47&mDataProp_48=48&mDataProp_49=49&mDataProp_50=50&mDataProp_51=51&mDataProp_52=52&mDataProp_53=53&mDataProp_54=54&mDataProp_55=55&mDataProp_56=56&mDataProp_57=57&mDataProp_58=58&mDataProp_59=59&mDataProp_60=60&mDataProp_61=61&mDataProp_62=62&mDataProp_63=63&mDataProp_64=64&mDataProp_65=65&mDataProp_66=66&mDataProp_67=67&mDataProp_68=68&mDataProp_69=69&mDataProp_70=70&mDataProp_71=71&mDataProp_72=72&mDataProp_73=73&mDataProp_74=74&mDataProp_75=75&mDataProp_76=76&mDataProp_77=77&mDataProp_78=78&mDataProp_79=79&mDataProp_80=80&mDataProp_81=81&mDataProp_82=82&mDataProp_83=83&mDataProp_84=84&mDataProp_85=85&mDataProp_86=86&mDataProp_87=87&mDataProp_88=88&mDataProp_89=89&mDataProp_90=90&mDataProp_91=91&mDataProp_92=92&mDataProp_93=93&mDataProp_94=94&mDataProp_95=95&mDataProp_96=96&mDataProp_97=97&mDataProp_98=98&mDataProp_99=99&mDataProp_100=100&mDataProp_101=101&mDataProp_102=102&mDataProp_103=103&mDataProp_104=104&mDataProp_105=105&mDataProp_106=106&mDataProp_107=107&mDataProp_108=108&mDataProp_109=109';
 
var myLink = document.createElement('text');

var searchLocation =  document.evaluate("//input[@value='Search']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

searchLocation = searchLocation.snapshotItem(0);

myLink.innerHTML = '<a style="cursor: pointer;" >Retired Stats</a>';


searchLocation.parentNode.insertBefore(myLink,searchLocation.followingSibling);



}//if(thisURL == 'http://theshownation.com/dynasty_team/me/leaders'){

if(thisURL.indexOf('.json') != -1){

var initialSavedTeam = GM_getValue("myTeam",'n');
//var initialSavedTeam2 = GM_getValue("myTeam2",'n');


//GM_log(team_id);

if(initialSavedTeam == 'n'){

	GM_setValue("myTeam",'');
	window.location=thisURL;

}
else
{

	var initialSavedTeamArray = initialSavedTeam.split(',');

	if(team_id != initialSavedTeamArray[4]){

		var initialSavedTeam2 = GM_getValue("myTeam2",'n');

		if(initialSavedTeam2 == 'n'){

			GM_setValue("myTeam2",'');
			window.location=thisURL;

		}
		else
		{

			var initialSavedTeamArray2 = initialSavedTeam2.split(',');

			if(team_id != initialSavedTeamArray2[4]){

				var initialSavedTeam3 = GM_getValue("myTeam3",'n');

				if(initialSavedTeam3 == 'n'){

					GM_setValue("myTeam3",'');
					window.location=thisURL;

				}
				else
				{

					var initialSavedTeamArray3 = initialSavedTeam3.split(',');

					if(team_id != initialSavedTeamArray3[4]){

						var initialSavedTeam4 = GM_getValue("myTeam4",'n');

						if(initialSavedTeam4 == 'n'){

							GM_setValue("myTeam4",'');
							window.location=thisURL;

						}
						else
						{
							var initialSavedTeamArray4 = initialSavedTeam4.split(',');

							if(team_id != initialSavedTeamArray4[4]){

								var initialSavedTeam5 = GM_getValue("myTeam5",'n');

								if(initialSavedTeam5 == 'n'){

									GM_setValue("myTeam5",'');
									window.location=thisURL;

								}								



							}


						}						


					}


				}				

			}

		}

	}


}
/*
else if(initialSavedTeam2 == 'n')
{

		
	GM_setValue("myTeam2",'');
	window.location=thisURL;


}
*/

var initialSavedRetired = GM_getValue("myRetiredTeam",'n');


if(initialSavedRetired == 'n')
{

	GM_setValue("myRetiredTeam",'');
	GM_setValue("myRetiredTeam2",'');
	GM_setValue("myRetiredTeam3",'');
	GM_setValue("myRetiredTeam4",'');
	GM_setValue("myRetiredTeam5",'');

}
/*
else if(initialSavedRetired2 == '')
{

	GM_setValue("myRetiredTeam2",'');


}
else if(initialSavedRetired3 == '')
{

	GM_setValue("myRetiredTeam3",'');

}
else if(initialSavedRetired4 == '')
{

	GM_setValue("myRetiredTeam4",'');

}
else if(initialSavedRetired5 == '')
{

	GM_setValue("myRetiredTeam5",'');

}
*/


//}//if(thisURL.indexOf('.json') != -1)


var records =  document.evaluate("//pre",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

records = records.snapshotItem(0);

if(records ==null){

	recordsText = '';
}
else
{
	recordsText = records.textContent;
}

recordsText = recordsText.replace(/]/g,'');



var playerString;

recordsArray = recordsText.split("[");


var myteamString = '';

for (var i = 2; i < recordsArray.length; i++) {

	recordsArray[i] = recordsArray[i].substring(0,recordsArray[i].length-2);
	recordsArray[i] = recordsArray[i].replace(/\'>/g,',');

	playerArray = recordsArray[i].split(',');

	playerString = playerArray.toString();

	playerString = playerString.replace(/"<span id='/g,'');
	playerString = playerString.replace(/<\/span>"/g,'');
	playerString = playerString.replace(/"/g,'');

	playerArray = playerString.split(',');

	if(playerArray[1].indexOf('offline') != -1){

		playerArray[1] = playerArray[1].substring(playerArray[1].indexOf('<a class=\offline\ href=\/players/')+35,playerArray[1].indexOf('\>')-1);

	}

	if(playerArray[1].indexOf('online') != -1){

		playerArray[1] = playerArray[1].substring(playerArray[1].indexOf('<a class=\online\ href=\/players/')+34,playerArray[1].indexOf('\>')-1);

	}


	myteamString = myteamString + playerArray + '|';
	

}

var myteamStringArray = myteamString.split("|");




var mySavedTeam = GM_getValue("myTeam",'');
var mySavedTeam2 = GM_getValue("myTeam2",'');
var mySavedTeam3 = GM_getValue("myTeam3",'');
var mySavedTeam4 = GM_getValue("myTeam4",'');
var mySavedTeam5 = GM_getValue("myTeam5",'');



var mySavedTeamID = mySavedTeam.split(',');
var mySavedTeamID2 = mySavedTeam2.split(',');
var mySavedTeamID3 = mySavedTeam3.split(',');
var mySavedTeamID4 = mySavedTeam4.split(',');
var mySavedTeamID5 = mySavedTeam5.split(',');


var theSavedTeam;
var theSavedTeamB;

if(team_id == mySavedTeamID[4]||mySavedTeamID[4]==undefined){

	theSavedTeam = 1;
	theSavedTeamB = mySavedTeam;

}
else if(team_id == mySavedTeamID2[4]||mySavedTeamID2[4]==undefined){

	theSavedTeam = 2;
	theSavedTeamB = mySavedTeam2;

}
else if(team_id == mySavedTeamID3[4]||mySavedTeamID3[4]==undefined){

	theSavedTeam = 3;
	theSavedTeamB = mySavedTeam3;

}
else if(team_id == mySavedTeamID4[4]||mySavedTeamID4[4]==undefined){

	theSavedTeam = 4;
	theSavedTeamB = mySavedTeam4;

}
else if(team_id == mySavedTeamID5[4]||mySavedTeamID5[4]==undefined){

	theSavedTeam = 5;
	theSavedTeamB = mySavedTeam5;

}

if(theSavedTeamB  == ''){

	switch(theSavedTeam)
	{
	case 1:

	  GM_setValue("myTeam",myteamString);

	  break;
	case 2:

	  GM_setValue("myTeam2",myteamString);

	  break;
	case 3:

	  GM_setValue("myTeam3",myteamString);

	  break;
	case 4:

	  GM_setValue("myTeam4",myteamString);

	  break;	  
	case 5:

	  GM_setValue("myTeam5",myteamString);

	  break;	  
	}

}
else
{

	//if(team_id == mySavedTeamID[4]){

		var mySavedTeamArray = theSavedTeamB.split("|");

	
		var retired = '';

		for (var i=0;i < mySavedTeamArray.length;i++){

			var savedPlayerIDArray = mySavedTeamArray[i].split(',');

	
				var potentialRetiredID = savedPlayerIDArray[2];
				var potentialRetired = savedPlayerIDArray.toString();
			

			for (var j=0;j < myteamStringArray.length;j++){

				var playerIDArray = myteamStringArray[j].split(',');

				if(playerIDArray[2]==potentialRetiredID){

					potentialRetiredID = '';
					potentialRetired = '';
					break;

				}
	
		
			}

			if(potentialRetired != ''){
	
				var potentialRetiredArray = potentialRetired.split(',');

			//		    name		       rating			  games			     at bats			hits                        doubles			triples			    home runs			runs			    rbi                         strikeouts		    walks			sb			    cs				avg                         slg                         obp                         ops				gp			    gs				cg                          sho				qs			    wins		        losses			    sv				hits                        runs		        earned runs		    home runs                   walks                       strikeouts		        ip                          whip

retired = retired + potentialRetiredArray[3] + ',' + potentialRetiredArray[6] + ',' + potentialRetiredArray[7] + ',' + potentialRetiredArray[8] + ',' + potentialRetiredArray[12] + ',' + potentialRetiredArray[16] + ',' + potentialRetiredArray[17] + ',' + potentialRetiredArray[18] + ',' + potentialRetiredArray[22] + ',' + potentialRetiredArray[23] + ',' + potentialRetiredArray[26] + ',' + potentialRetiredArray[29] + ',' + potentialRetiredArray[42] + ',' + potentialRetiredArray[43] + ',' + potentialRetiredArray[44] + ',' + potentialRetiredArray[50] + ',' + potentialRetiredArray[51] + ',' + potentialRetiredArray[52] + ',' + potentialRetiredArray[55] + ',' + potentialRetiredArray[56] + ',' + potentialRetiredArray[57] + ',' + potentialRetiredArray[58] + ',' + potentialRetiredArray[59] + ',' + potentialRetiredArray[60] + ',' + potentialRetiredArray[62] + ',' + potentialRetiredArray[64] + ',' + potentialRetiredArray[68] + ',' + potentialRetiredArray[71] + ',' + potentialRetiredArray[72] + ',' + potentialRetiredArray[73] + ',' + potentialRetiredArray[74] + ',' + potentialRetiredArray[75] + ',' + potentialRetiredArray[77] + ',' + potentialRetiredArray[82] + ',' + potentialRetiredArray[83] + '|';


			}
		
		}

	

		var mySavedRetired = GM_getValue("myRetiredTeam",'');

		var mySavedRetiredID = mySavedRetired.split(',');

		var mySavedRetired2 = GM_getValue("myRetiredTeam2",'');

		var mySavedRetiredID2 = mySavedRetired2.split(',');

		var mySavedRetired3 = GM_getValue("myRetiredTeam3",'');

		var mySavedRetiredID3 = mySavedRetired3.split(',');		

		var mySavedRetired4 = GM_getValue("myRetiredTeam4",'');

		var mySavedRetiredID4 = mySavedRetired4.split(',');		

		var mySavedRetired5 = GM_getValue("myRetiredTeam5",'');

		var mySavedRetiredID5 = mySavedRetired5.split(',');		

		if(mySavedRetiredID[0] == team_id || mySavedRetired == ''){

			if(mySavedRetired == ''){

				mySavedRetired = playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + '|';

			}

			mySavedRetired = mySavedRetired + retired;

			GM_setValue("myRetiredTeam",mySavedRetired);			

			GM_setValue("myTeam",myteamString);

			var mySavedRetiredArray = mySavedRetired.split('|');

		}
		else if(mySavedRetiredID2[0] == team_id || mySavedRetired2 == '')
		{

			if(mySavedRetired2 == ''){

				mySavedRetired2 = playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + '|';

			}

			mySavedRetired2 = mySavedRetired2 + retired;

			GM_setValue("myRetiredTeam2",mySavedRetired2);			

			GM_setValue("myTeam2",myteamString);

			var mySavedRetiredArray = mySavedRetired2.split('|');


		}
		else if(mySavedRetiredID3[0] == team_id || mySavedRetired3 == '')
		{

			if(mySavedRetired3 == ''){

				mySavedRetired3 = playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + '|';

			}

			mySavedRetired3 = mySavedRetired3 + retired;

			GM_setValue("myRetiredTeam3",mySavedRetired3);				

			GM_setValue("myTeam3",myteamString);

			var mySavedRetiredArray = mySavedRetired3.split('|');


		}
		else if(mySavedRetiredID4[0] == team_id || mySavedRetired4 == '')
		{

			if(mySavedRetired4 == ''){

				mySavedRetired4 = playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + '|';

			}

			mySavedRetired4 = mySavedRetired4 + retired;

			GM_setValue("myRetiredTeam4",mySavedRetired4);				

			GM_setValue("myTeam4",myteamString);

			var mySavedRetiredArray = mySavedRetired4.split('|');


		}
		else if(mySavedRetiredID5[0] == team_id || mySavedRetired5 == '')
		{

			if(mySavedRetired5 == ''){

				mySavedRetired5 = playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + '|';

			}

			mySavedRetired5 = mySavedRetired5 + retired;

			GM_setValue("myRetiredTeam5",mySavedRetired5);				

			GM_setValue("myTeam5",myteamString);

			var mySavedRetiredArray = mySavedRetired5.split('|');

		}		

		
		
		var myHeader = document.createElement('div');

		myHeader.setAttribute('align','center');
		myHeader.innerHTML = playerArray[5] + ' - ' + playerArray[1];

		var myRetiredHTML = document.createElement('table');
		myRetiredHTML.setAttribute('class', 'sortable');
		myRetiredHTML.setAttribute('id', '113');
		myRetiredHTML.setAttribute('cellspacing', '0');
		myRetiredHTML.setAttribute('cellpadding', '3');
		myRetiredHTML.setAttribute('align', 'center');
		myRetiredHTML.setAttribute('border', '0');
	
		myHTML = '<tr><td align="center" id="center_div" class=""><b id="center_div">Name</b></td><td align="center" id="center_div" class=""><b id="center_div">Rating</b></td><td align="center" id="center_div" class=""><b id="center_div">G</b></td><td align="center" id="center_div" class=""><b id="center_div">AB</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">H</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">2B</b></td><td align="center" id="center_div" class=""><b id="center_div">3B</b></td><td align="center" id="center_div" class=""><b id="center_div">HR</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">R</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">RBI</b></td><td align="center" id="center_div" class=""><b id="center_div">SO</b></td><td align="center" id="center_div" class=""><b id="center_div">BB</b></td><td align="center" id="center_div" class=""><b id="center_div">SB</b></td><td align="center" id="center_div" class=""><b id="center_div">CS</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">AVG</b></td><td align="center" NOWRAP id="center_div" class=""><b id="center_div">SLG</b></td><td align="center" id="center_div" class=""><b id="center_div">OBP</b></td><td align="center" id="center_div" class=""><b id="center_div">OPS</b></td><td align="center" id="center_div" class=""><b id="center_div">GP</b></td><td align="center" id="center_div" class=""><b id="center_div">GS</b></td><td align="center" id="center_div" class=""><b id="center_div">CG</b></td><td align="center" id="center_div" class=""><b id="center_div">SHO</b></td><td align="center" id="center_div" class=""><b id="center_div">QS</b></td><td align="center" id="center_div" class=""><b id="center_div">W</b></td><td align="center" id="center_div" class=""><b id="center_div">L</b></td><td align="center" id="center_div" class=""><b id="center_div">SV</b></td><td align="center" id="center_div" class=""><b id="center_div">H</b></td><td align="center" id="center_div" class=""><b id="center_div">R</b></td><td align="center" id="center_div" class=""><b id="center_div">ER</b></td><td align="center" id="center_div" class=""><b id="center_div">HR</b></td><td align="center" id="center_div" class=""><b id="center_div">BB</b></td><td align="center" id="center_div" class=""><b id="center_div">SO</b></td><td align="center" id="center_div" class=""><b id="center_div">IP</b></td><td align="center" id="center_div" class=""><b id="center_div">ERA</b></td><td align="center" id="center_div" class=""><b id="center_div">WHIP</b></td><td align="center" id="center_div" class=""></td></tr>';



		var myPlayerCount = 0;

		for (var i = 1; i < mySavedRetiredArray.length; i++) {


			var mySavedRetiredArrayString = mySavedRetiredArray[i].toString();
			var statArray = mySavedRetiredArrayString.split(',');

	
			myPlayerCount++;

			var p2 = myPlayerCount/2;

			if (p2 != p2.toFixed()){


				if(mySavedRetiredArray[i] != ''){

				myHTML = myHTML + '<tr><td align="left" id="center_div" class="" NOWRAP>'+statArray[0]+'</td><td align="left" id="center_div" class="">'+statArray[1]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[2]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[3]+'</td><td align="center" id="center_div" class="">'+statArray[4]+'</td><td align="center" id="center_div" class="">'+statArray[5]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[6]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[7]+'</td><td align="center" id="center_div" class="">'+statArray[8]+'</td><td align="center" id="center_div" class="">'+statArray[9]+'</td><td align="center" id="center_div" class="">'+statArray[10]+'</td><td align="center" id="center_div" class="">'+statArray[11]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[12]+'</td><td align="center" NOWRAP id="center_div" class="">'+statArray[13]+'</td><td align="center" id="center_div" class="">'+statArray[14]+'</td><td align="center" id="center_div" class="">'+statArray[15]+'</td><td align="center" id="center_div" class="">'+statArray[16]+'</td><td align="center" id="center_div" class="">'+statArray[17]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[18]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[19]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[20]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[21]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[22]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[23]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[24]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[25]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[26]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[27]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[28]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[29]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[30]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[31]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[32]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[33]+'</td><td style="background-color: #FFEEEE; color: #000000;" align="center" id="center_div" class="">'+statArray[34]+'</td><td align="left" id="center_div" class="" NOWRAP>'+'<button value="delete" name="'+statArray[0]+','+statArray[1]+','+statArray[2]+','+statArray[3]+','+statArray[4]+','+statArray[5]+'" >delete</button>'+'</td></tr>';

				}

			}
			else
			{

				if(mySavedRetiredArray[i] != ''){
				myHTML = myHTML + '<tr><td style="background-color: #EBEDDE ; color: #000000;" align="left" id="center_div" class="" NOWRAP>'+statArray[0]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="left" id="center_div" class="">'+statArray[1]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[2]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[3]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[4]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[5]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[6]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[7]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[8]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[9]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[10]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[11]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[12]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" NOWRAP id="center_div" class="">'+statArray[13]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[14]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[15]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[16]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="center" id="center_div" class="">'+statArray[17]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[18]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[19]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[20]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[21]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[22]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[23]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[24]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[25]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[26]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[27]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[28]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[29]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[30]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[31]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[32]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[33]+'</td><td style="background-color: #ffd5d5; color: #000000;" align="center" id="center_div" class="">'+statArray[34]+'</td><td style="background-color: #EBEDDE ; color: #000000;" align="left" id="center_div" class="">'+'<button value="delete" name="'+statArray[0]+','+statArray[1]+','+statArray[2]+','+statArray[3]+','+statArray[4]+','+statArray[5]+'" >delete</button>'+'</td></tr>';

				}
			}

		}	


		if(mySavedRetiredArray == playerArray[4] + ',' + playerArray[1] + ',' + playerArray[5] + ','){

			myRetiredHTML.innerHTML = '<tr><td></td></tr><tr><td align="center">No retired players.  Go play some Diamond Dynasty!</td></tr>';
		}
		else
		{
			myRetiredHTML.innerHTML = myHTML;

		}
	
		records.parentNode.insertBefore(myHeader,records);
		records.parentNode.replaceChild(myRetiredHTML,records);
	

		sortTables();

		//}//if(team_id == mySavedTeamID[4]){		

}//if(mySavedTeam == ''){


var title =  document.evaluate("//head/link",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


title = title.snapshotItem(0);

var myTitle = document.createElement('title');

myTitle.innerHTML = 'Retired Player Stats for Diamond Dynasty';

var myFavicon = document.createElement('link');

	myFavicon.setAttribute('rel', 'shortcut icon');
	myFavicon.setAttribute('type', 'image/x-icon');
	myFavicon.setAttribute('href', favicon);


//myFavicon.innerHTML = 'rel="shortcut icon" type="image/x-icon" href='+favicon+'';



	title.parentNode.insertBefore(myTitle,title);
	title.parentNode.insertBefore(myFavicon,title);

}//}//if(thisURL.indexOf('.json') != -1)

}//function delay(){
