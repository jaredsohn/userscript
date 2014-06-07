// ==UserScript==
// @name        caseman
// @namespace   gobada
// @include     https://*salesforce.com/*
// @include     http://*salesforce.com/*
// @version     1.07
// ==/UserScript==


// Globals
// --------------------------------
var caseRowsData = new Object();
// keep an eye on specific cases e.g. cases to reassign (comma-sep)
var caseNumberWatchList = ""; 
var caseNumberCloseList = "10853430,10842855,10853465,10827184,10825702,10847989";


var MY_SCRIPT_VERBOSE_LEVEL = 4;
var formatTableCheckInterval = 1000;

// Logging
// --------------------------------
function loggerDebug(text){
	if(MY_SCRIPT_VERBOSE_LEVEL<=1)
		console.log(text);
}

function loggerDebug2(text){
	if(MY_SCRIPT_VERBOSE_LEVEL<=2)
		console.log(text);
}

function loggerDebug3(text){
	if(MY_SCRIPT_VERBOSE_LEVEL<=3)
		console.log(text);
}

function loggerDebug4(text){
	if(MY_SCRIPT_VERBOSE_LEVEL<=4)
		console.log(text);
}

// GM functions
// --------------------------------
// Add "formatTable" to browser menu Tools->Greasemonkey->User Scripts Command
//++// 
GM_registerMenuCommand( "FormatCaseList", formatTable );

// Event listeners / Timers
// --------------------------------
// Going to user interval timer to format table
// rather than resize event and one-shot timer

// intervalFormat // setInterval(code,millisec,lang)
setInterval( function() {
	if(!isTableFormated()){
		formatTable();
	}
}, formatTableCheckInterval ); 


// Misc
// --------------------------------

function initCaseRowsData(){
	caseRowsData = new CaseRowsData();
}

function getCaseRowsData(){
	return caseRowsData;
}

function isTableFormated(){
	var actionCells = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-ACTION_COLUMN");
	var div = actionCells[0];
	
	if(div){
		var action0 = div.innerHTML;	
		if(action0.length>=1 && action0.length<=2)
			return true;
	}
	return false;
}

// 
// --------------------------------

function formatTable(){
	loggerDebug4("in formatTable");
	initCaseRowsData();
	
	processColumnCaseAction();
	processColumnCaseNumber();
	processColumnCaseDateTimeOpened();
	processColumnCaseWeight();
	processColumnCaseStagnant();
	processColumnCaseSeverity();
	processColumnCaseEscalationLevel();
	processColumnCaseFirstContact();
	processColumnCaseDescription();
	processColumnCaseCustomerSegment();
	processColumnCaseCorpEscalation();
	
	processColumnCaseMyPriority();

}	

function getCaseLogTable(){
	// get action column divs
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045Zfl", 1);
	var ele = gridCellsInner[0]; 
	while( ele.tagName != "TABLE" ){ 
		ele = ele.parentNode; 
	}
	
	return ele;
}

function CaseRowData(name, value){
	this.data = new Array();
	this.name=name;
	this.value=value;
	
	this.set= function (name, value){
		this.data[name]=value;
	}
	
	this.get= function (name){
		return this.data[name];
	}	
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

function GMX_getValue(key){
	return GM_getValue(key);
}

function GMX_setValue(key, value){
	return GM_setValue(key, value);
}

function CaseRowsData(){
	//loggerDebug3("in CaseRowsData");
	this.data = new Array();
	
	this.set= function (row, columnAlias, value){
		//loggerDebug3("in set");
		this.data[row] = new CaseRowData(columnAlias, value);
	}
	
	this.get= function (row, columnAlias){
		return this.data[row];
	}	
	
	this.setValue= function (row, columnAlias, value){
		if(value)
			GMX_setValue(row + "." + columnAlias, value);
	}	
	
	this.getValue= function (row, columnAlias){
		return GMX_getValue(row + "." + columnAlias);
	}		
	
}

/*
function CaseRowsData(){
	//loggerDebug3("in CaseRowsData");
	this.data = new Array();
	
	this.set= function (key, obj){
		//loggerDebug3("in set");
		this.data[key] = obj;
	}
	
	this.get= function (key){
		return this.data[key];
	}	
	
	this.setValue= function (row, columnAlias, value){
		//if(value)
		//	GM_setValue(row + "." + columnAlias, value);
		var key = row + "." + columnAlias;
		this.set(key, new CaseRowData(columnAlias, value));
	}	
	
	this.getValue= function (row, columnAlias){
		//return GM_getValue(row + "." + columnAlias);
		var key = row + "." + columnAlias;
		var obj = this.get(key);
		return obj.get(columnAlias);
	}		
	
}
*/

function getDateFromDateTimeOpened(text)
{
	loggerDebug2("in getDateFromDateTimeOpened");
	var parts = new Array();
	
	//loggerDebug("text: " + text);
	
	if(text)
	  parts = text.split("@");			
	
	if(parts.length>1)
		return parts[1].trim();
	else
		return text;
}

function getDaysFromDateTimeOpened(text)
{
	loggerDebug2("in getDaysFromDateTimeOpened");
	var parts = new Array();
	
	//loggerDebug("text: " + text);

	if(text)
	  parts = text.split("@");			
	
	if(parts.length>1)
		return parts[0].trim();
	else{
		var openDate = new Date(text);
		//loggerDebug("openDate: " + openDate);
		var age = computeAgeInDays(openDate);
		age = zeroFill(age, 3);
		//loggerDebug("age padded: " + age);
		return age;
	}
}

// Called for all columns being formated
// Row-group zebra
function callbackAllColumns(row, columnAlias, element){
	loggerDebug3("in callbackAllColumns");
	
	var rowsPerGroup = 3;
	var normalRow = row+1;
	var rowGroup = Math.floor(row/rowsPerGroup);
	var normalRowGroup = rowGroup+1;
	var rowGroupColor = "F9EBD1";//"B7A752";
	//var rowGroupColor = ColorLuminance("B7A752", 1); // make it lighter
	rowGroupColor = "#"+rowGroupColor;
	
	if(columnAlias =="action" && normalRowGroup%2==0){
		// get tr
		var el = element.parentNode.parentNode;
		var style = el.getAttribute("style");
		el.setAttribute("style", style + ";background-color: "+rowGroupColor+";"); // wheat
	}
	
}

function callbackGetValueOpened(row, columnAlias, element){
	loggerDebug2("in getColumnCaseDaysOpened");
	
	var text = htmlToText(element.innerHTML).trim()
	var age = getDaysFromDateTimeOpened(text);								
	//loggerDebug("age: " + age);	
	return age;
}

function callbackAllOpened(row, columnAlias, element){
	loggerDebug2("in callbackAllOpened");
	
	var text = htmlToText(element.innerHTML).trim()
	var agePart = getDaysFromDateTimeOpened(text);
	//loggerDebug("agePart: " + agePart);
	
	var datePart = getDateFromDateTimeOpened(element.innerHTML);
	//loggerDebug("datePart: " + datePart);
	
	element.innerHTML = agePart + " @ " + datePart;

}

function processColumnCaseDateTimeOpened(){
	loggerDebug2("in processColumnCaseDateTimeOpened");
	
	
	var expList = new Array();
		
	for(var i=4;i>=0;i--){
		var age = 20*(i+1);
		var color = (80-age)*128/80;
		var colorStr = "#" + rgbToHex(color,color,color);
		expList.push(new EvaluateExpression(">=", age, null, "white,"+colorStr));
	}
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-CASES_CREATED_DATE");
	formatSalesforceTableColumn("opened", gridCellsInner, expList, callbackAllOpened, callbackGetValueOpened);
}

function callbackGetValueWeight(row, columnAlias, element){
	//loggerDebug3("in callbackGetValueWeight");
	var text = htmlToText(element.innerHTML).trim();
	var pos = text.indexOf("/");
	if(pos>=0)
		text = text.substring(0,pos);
	return text;
}

function getLeanWeight(row){
	var rowsData = getCaseRowsData();
	var stagnant = parseFloat(rowsData.getValue(row, "stagnant")); //parseFloat to prevent + concatenating values;
	var weight = parseFloat(rowsData.getValue(row, "weight")); //parseFloat to prevent + concatenating values;

	//loggerDebug3("stagnant: " + stagnant);	
	//loggerDebug3("weight: " + weight);	
	
	var leanWeight = weight;
	if(stagnant>0  && weight>=8)
		leanWeight-=8;
		
	return leanWeight;
}

function callbackAllWeight(row, columnAlias, element){
	loggerDebug2("in callbackAllWeight");
	var rowsData = getCaseRowsData();
	var w1 = rowsData.getValue(row, "weight");
	var w2 = getLeanWeight(row); 	
	element.innerHTML = w1 + "/" + w2;
}

function processColumnCaseWeight(){
	loggerDebug2("in processColumnCaseWeight");
	var expList = new Array();
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045Zgk");
	formatSalesforceTableColumn("weight", gridCellsInner, expList, callbackAllWeight, callbackGetValueWeight);
}


function callbackGetValueDescription(row, columnAlias, element){
	//loggerDebug3("in getColumnCaseDaysOpened");
	var text = htmlToText(element.innerHTML).trim()
	return text;
}

function callbackAllDescription(row, columnAlias, element){
	//loggerDebug3("in callbackAllDescription");
	var rowsData = getCaseRowsData();
	var text = rowsData.getValue(row, "description");	
	//loggerDebug3("description: " + text);
	element.setAttribute("title", text);
	//element.setAttribute("onmouseover", "alert('" + row + "');");
}

function processColumnCaseDescription(){
	loggerDebug2("in processColumnCaseDescription");
	
	var expList = new Array();
	
	//expList.push(new EvaluateExpression("<", 10, null, "black,GreenYellow"));

	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-CASES_SUBJECT");
	formatSalesforceTableColumn("description", gridCellsInner, expList, callbackAllDescription, callbackGetValueDescription);
}

function callbackAllAction(row, columnAlias, element){
	//loggerDebug3("in callbackAllAction");
	// parent of div: <td class="x-grid3-hd x-grid3-cell x-grid3-td-ACTION_COLUMN" style="font-weight: bold; width: 54px;">
	element.innerHTML = row + 1;
	// parent of div: <td class="x-grid3-hd x-grid3-cell x-grid3-td-ACTION_COLUMN" style="font-weight: bold; width: 54px;">
	element.setAttribute("style", "font-weight: bold; width: 27px;");
}

function processColumnCaseAction(){
	loggerDebug2("in processColumnCaseAction");
	
	var expList = new Array();
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-ACTION_COLUMN");
	formatSalesforceTableColumn("action", gridCellsInner, expList, callbackAllAction);
}

function callbackGetValueCaseNumber(row, columnAlias, element){
	//loggerDebug3("in callbackGetValueCaseNumber");
	var text = htmlToText(element.innerHTML).trim();
	return text.replace("C","");
}

function callbackAllCaseNumber(row, columnAlias, element){
	loggerDebug2("in callbackAllCaseNumber");
	var rowsData = getCaseRowsData();
	var value = rowsData.getValue(row, columnAlias); 
	var link = element.firstChild;
	link.innerHTML = "C" + value;
}

function processColumnCaseNumber(){
	loggerDebug2("in processColumnCaseNumber");
	
	var expList = new Array();
	
	// font color can be controlled with the style of the hyperlink
	expList.push(new EvaluateExpression("in", caseNumberWatchList, null, ",orange"));
	expList.push(new EvaluateExpression("in", caseNumberCloseList, null, ",#00FF00"));
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-CASES_CASE_NUMBER");
	formatSalesforceTableColumn("casenumber", gridCellsInner, expList, callbackAllCaseNumber, callbackGetValueCaseNumber);
	
}

function processColumnCaseStagnant(){
	loggerDebug2("in processColumnCaseStagnant");
	
	var expList = new Array();
	
	//expList.push(new EvaluateExpression("<", -1, null, "black,GreenYellow"));
	
	
	expList.push(new EvaluateExpression(">", 7, null, "white,maroon"));
	expList.push(new EvaluateExpression("between", 1, 7, "black,red"));
	expList.push(new EvaluateExpression("==", 0, null, "black,yellow"));
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045ZgG");
	formatSalesforceTableColumn("stagnant", gridCellsInner, expList);
	
}

function callbackGetValueMyPriority(row, columnAlias, element){
	//loggerDebug3("in callbackGetValueMyPriority");
	
	var rowsData = getCaseRowsData();
	
	var stagnant = parseFloat(rowsData.getValue(row, "stagnant")); //parseFloat to prevent + concatenating values;
	//loggerDebug3("stagnant: " + stagnant);
	
	var weight = getLeanWeight(row);
	//loggerDebug3("lean weight: " + weight);	
	
	var lastUpdate = stagnant+7;
	//loggerDebug3("lastUpdate: " + lastUpdate);
	
	// y=(y1-y0)*(x0-x)/(x1-x0) + y1
	var updateInterval = ((7-3.5)*(1-weight)/(30-1)) + 7; 
	//loggerDebug3("updateInterval: " + updateInterval);
	
	var overdue = lastUpdate*100/updateInterval;
	overdue = overdue.toFixed(1); // decimal places
	//loggerDebug3("overdue: " + overdue);
	
	return overdue;
}
/*
function callbackAllMyPriority(row, columnAlias, element){
	//loggerDebug3("in callbackAllMyPriority");
	var rowsData = getCaseRowsData();
	var value = rowsData.getValue(row, columnAlias); 
	element.innerHTML = value;
}
*/

function callbackAllMyPriority(row, columnAlias, element){
	//loggerDebug3("in callbackAllMyPriority");
	// Under Construction
	var rowsData = getCaseRowsData();
	var value = rowsData.getValue(row, columnAlias); 
	element.innerHTML = value;

}


function processColumnCaseMyPriorityTopX(gridCellsInner){
	
	var rowsData = getCaseRowsData();
	var topcount = 25;
	var peakcount = 3;
	var peakcolor = 0;
	var peakcolordiff = 256/peakcount;
	var myPriorityTopX = new Array();
	for(var i=0;i<gridCellsInner.length;i++){
		var value = parseFloat(rowsData.getValue(i, "mypriority")); 
		myPriorityTopX.push(value);
		//loggerDebug4("value: " + value);
	}
	myPriorityTopX.sort(function(a,b){return b-a});
	myPriorityTopX.length=topcount;
	
	//loggerDebug4("--- sorted ----");
	var max = myPriorityTopX[0];
	var min = myPriorityTopX[topcount-1];
	var shades = topcount;
	var shadeinc = (256/2)/shades;	
	
	for(var i=0;i<gridCellsInner.length;i++){
		var value = parseFloat(rowsData.getValue(i, "mypriority")); 
		var index = myPriorityTopX.indexOf(value);
		var element = gridCellsInner[i];
		var color;
		var bgcolorhex;
		var bgcolor = 255 - (shades-(index+1))*shadeinc;
		loggerDebug4("index: " + index);
		loggerDebug4("value: " + value);
		
		if(index>=0){

			if(value>=75&&value<100){
				color="black";
				//bgcolorhex = "orange";
				bgcolorhex = "#" + rgbToHex(bgcolor,bgcolor,0);
			}else if(value>=100){
				color="white";
				bgcolorhex = "#" + rgbToHex(bgcolor,0,0);
			}else{
				color = "black";
				bgcolorhex = "#" + rgbToHex(0,bgcolor,0);
			}	
		
			if(index<peakcount){
				color = "white";
				bgcolor = peakcolor + index*peakcolordiff;
				bgcolorhex = "#" + rgbToHex(bgcolor,bgcolor,bgcolor);
			}
				
		
			var styles = new Array();
			styles.push(new Array("color", color));
			styles.push(new Array("background-color", bgcolorhex));

			setStyleFromArray(element, styles);	
		
		}
		
	}
}

function processColumnCaseMyPriority(){
	loggerDebug2("in processColumnCaseMyPriority");
	
	var expList = new Array();
	/*
	var scales = 32;
	var minprio = 100;
	var maxprio = 400;
	var prioinc = (maxprio-minprio)/scales;
	var colorinc = (256-0)/scales;
	var color = 255;
	var prio = minprio;
	

	expList.push(new EvaluateExpression("<", 80, null, "black,"));
	
	expList.push(new EvaluateExpression("between", 80, minprio, "black,yellow"));	
	
	for(var i=0;i<scales;i++){
		var hex = "#" + rgbToHex(color,0,0);
		expList.push(new EvaluateExpression("<", prio, null, "white," + hex));
		prio+=prioinc;
		color-=colorinc;
	}
	
	expList.push(new EvaluateExpression(">=", prio, null, "white,black"));
	*/
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045Zfl");
	formatSalesforceTableColumn("mypriority", gridCellsInner, expList, callbackAllMyPriority, callbackGetValueMyPriority);

	processColumnCaseMyPriorityTopX(gridCellsInner);
	
}

function callbackGetValueMySeverity(row, columnAlias, element){
	//loggerDebug3("in callbackGetValueMySeverity");
	
	var text = htmlToText(element.innerHTML).trim()	

	var m = text.match(/[0-9]/g);

	if(m)
		text = parseInt(m[0]);
		
	return text;
}

function callbackAllMySeverity(row, columnAlias, element){
	//loggerDebug3("in callbackAllMySeverity");

	var rowsData = getCaseRowsData();
	var value  = parseInt(rowsData.getValue(row, columnAlias));

	if(value){
		element.innerHTML = "S"+value;
	}
}

function processColumnCaseSeverity(){
	//loggerDebug3("in processColumnCaseSeverity");
	
	var expList = new Array();

	expList.push(new EvaluateExpression("<=", 0, "white,violet"));
	expList.push(new EvaluateExpression("<=", 1, null, "black,orange"));
	//expList.push(new EvaluateExpression("<=", 2, null, "black,yellow"));
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045ZgD");
	formatSalesforceTableColumn("severity", gridCellsInner, expList, callbackAllMySeverity, callbackGetValueMySeverity);
}

function callbackGetValueCorpEscalation(row, columnAlias, element){
	//loggerDebug3("in callbackGetValueCorpEscalation");
	
	var text = htmlToText(element.innerHTML).trim();
	text = parseInt(text);
	return text;
}

function callbackAllCorpEscalation(row, columnAlias, element){
	//loggerDebug3("in callbackAllCorpEscalation");

	var rowsData = getCaseRowsData();
	var value  = parseInt(rowsData.getValue(row, columnAlias));

	if(value==0)
		element.innerHTML = "";
	else if(value==8)
		element.innerHTML = "Y";
	else if(value==14)
		element.innerHTML = "R";
	else
		element.innerHTML = "?";
	
}

function processColumnCaseCorpEscalation(){
	//loggerDebug3("in processColumnCaseSeverity");
	var expList = new Array();

	expList.push(new EvaluateExpression(">", 14, null, "white,maroon"));
	expList.push(new EvaluateExpression(">=", 14, null, "black,red"));
	expList.push(new EvaluateExpression(">=", 8, null, "black,yellow"));
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045Zf5");
	formatSalesforceTableColumn("severity", gridCellsInner, expList, callbackAllCorpEscalation, callbackGetValueCorpEscalation);
}

function callbackGetValueCustomerSegment(row, columnAlias, element){
	var text = htmlToText(element.innerHTML).trim();	
	return text;
}

function callbackAllCustomerSegment(row, columnAlias, element){
	//loggerDebug3("in callbackAllCustomerSegment");

	var rowsData = getCaseRowsData();
	var value  = rowsData.getValue(row, columnAlias);
	
	if(value){
		element.innerHTML = value;
	}
}

function processColumnCaseCustomerSegment(){
	//loggerDebug3("in processColumnCaseCustomerSegment");
	var expList = new Array();
	
	expList.push(new EvaluateExpression("regex", "Platinum", null, "white,blue"));	
	
	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045ZgR");
	formatSalesforceTableColumn("customerSegment", gridCellsInner, expList, callbackAllCustomerSegment, callbackGetValueCustomerSegment );
}

function processColumnCaseEscalationLevel(){
	loggerDebug2("in processColumnCaseEscalationLevel");
	
	var expList = new Array();
	
	expList.push(new EvaluateExpression("regex", "M[2-9]", "white,maroon"));	
	expList.push(new EvaluateExpression("regex", "M1", null, "black,red"));	
	expList.push(new EvaluateExpression("regex", "M0", null, "black,yellow"));	

	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA00000045ZfS");
	formatSalesforceTableColumn("escalationlevel", gridCellsInner, expList);
}

function callbackAllCaseFirstContact(row, columnAlias, element){
	loggerDebug2("in callbackAllCaseFirstContact");
	var rowsData = getCaseRowsData();
	var value = rowsData.getValue(row, columnAlias);
	var seg = rowsData.getValue(row, "customerSegment");
	
	if((seg == "Platinum" && value > 60) || (seg != "Platinum" && value > 120)){
		setStyleColors(element, "black,grey");
	}

}

function processColumnCaseFirstContact(){
	loggerDebug2("in processColumnCaseFirstContact");
	
	var expList = new Array();
	
	expList.push(new EvaluateExpression("regex", "^$", null, "black,red"));	
	//expList.push(new EvaluateExpression(">=", 120, null, "black,grey"));

	var gridCellsInner = getElementByTagAndClass("div", "x-grid3-cell-inner x-grid3-col-00NA0000006i14U");
	formatSalesforceTableColumn("firstcontact", gridCellsInner, expList, callbackAllCaseFirstContact);
}

function formatSalesforceTableColumn(columnAlias, gridCellsInner, evalExpList, callbackAll, callbackGetValue){
	//loggerDebug3("in formatSalesforceTableColumn -> " + columnAlias);
	
	var colomnAliasToDebug = "customerSegment";
	
	if(gridCellsInner){

		var matchcount = 0;
		for(var i=0;i<gridCellsInner.length;i++){
			var cellInner = gridCellsInner[i];
			
			var cellValue = "";
			
			if(callbackGetValue)
				cellValue = callbackGetValue(i, columnAlias, cellInner);
			else
				cellValue = cellInner.innerHTML;
			
			
			cellValue = htmlToText(cellValue);
			
			if(cellValue)
				cellValue = cellValue.trim(); // remove stuff like &nbsp;
			
			loggerDebug3("cellValue after htmlToText: " + cellValue);
			
			
			caseRowsData.setValue(i,columnAlias, cellValue);
			
			if(callbackAll)
				callbackAll(i, columnAlias, cellInner);						
			
			for(var f=0;f<evalExpList.length;f++){		
				var evex = new EvaluateExpression();
				evex = evalExpList[f];
				
				if(columnAlias==colomnAliasToDebug)
					evex.setVerbose(true);
				
				if(evex.evaluate(cellValue))
				{
					matchcount++;
					var results = evex.getResult();
					
					
					if(results){
						results = evex.getResult().split(",");
						
						var styles = new Array();
						if(results[0]){
							styles.push(new Array("color", results[0]));
						}
						
						if(results[1]){
							styles.push(new Array("background-color", results[1]));
						}
						
						if(styles.length>0)
							setStyleFromArray(cellInner, styles);
						
						break;
					}
				}
			}	// for

			callbackAllColumns(i, columnAlias, cellInner);	
		}
		
		//loggerDebug("matchcount: " + matchcount);
	}
}

function htmlToText(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function EvaluateExpression (operator, operand2, operand3, trueResult, falseResult){
	//loggerDebug2("in EvaluateExpression");
	this.verbose = false;
	this.operator = operator;
	this.operand2 = operand2;
	this.operand3 = operand3;
	this.trueResult = trueResult;
	this.falseResult = falseResult;
	this.callStackVerbose = false;
	this.match = false;
	
	
	this.getResult = function (){
		return match?trueResult:falseResult;	
	}
	
	this.setVerbose = function (v){
		this.verbose=v;	
	}	
	
	this.evaluate= function (operand1){
		if(this.verbose && this.callStackVerbose){
			//loggerDebug3("in evaluate: " + operand1 + " " + operator + " " + operand2 + " " + operand3);
		}
		if(operator == "<"){
			match = operand1<operand2;
		}
		else if(operator == "<="){
			match = operand1<=operand2;
		}
		else if(operator == ">"){
			match = operand1>operand2;
		}	
		else if(operator == ">="){
			match = operand1>=operand2;
		}
		else if(operator == "=="){
			match = operand1==operand2;
		}	
		else if(operator == "between"){
			match = operand1>=operand2 && operand1<=operand3;
		}	
		else if(operator == "empty"){
			//match = operand1=="";
			var re = new RegExp("^$");
			match = re.test(operand1);
		}		
		else if(operator == "in"){
			var re = new RegExp(operand1);
			match = re.test(operand2);
		}	
		else if(operator == "regex"){
			var re = new RegExp(operand2);
			match = re.test(operand1);
		}
		else{
			loggerDebug("EvaluateExpression ERROR: unknown operator: " + operator);
		}
		
		if(this.verbose && match){
			loggerDebug3("EvaluateExpression match: " + operand1);
		}
		return match;
	}
}

function setStyleColors(obj, colorbgcolor){

	var results = colorbgcolor.split(",");
	
	var styles = new Array();
	if(results[0]){
		styles.push(new Array("color", results[0]));
	}
	
	if(results[1]){
		styles.push(new Array("background-color", results[1]));
	}
	
	if(styles.length>0)
		setStyleFromArray(obj, styles);

}

function setStyleFromArray(obj, styles){

	var stylesText = "";
	
	for(var i=0;i<styles.length;i++){
		var nvp = styles[i];
		var nvpText = nvp.join(":") + ";";
		stylesText += nvpText;
	}
	//loggerDebug("stylesText: " + stylesText);
	obj.setAttribute("style", stylesText);
	
}

function getElementByTagAndClass(tagName, className, max, parent){
	loggerDebug3("getElementByTagAndClass " + tagName + "," + className + "," + max);
    var obj = new Array();

    var elems = null;
	
	if(parent)
		elems = parent.getElementsByTagName(tagName);
	else
		elems = document.getElementsByTagName(tagName);
		
    for (i in elems){
		var el = elems[i];
		
		if(el.className){
		
			var multiClassSearch = className.split(" ").length > 1;
			
			if(!multiClassSearch){
				var cleanClassNames = el.className.split(" ");
				
				for(j in cleanClassNames){
					var cleanClassName = cleanClassNames[j];
					//loggerDebug3("cleanClassName: " + cleanClassName);
					if(cleanClassName==className){
						loggerDebug3("cleanClassName: " + cleanClassName);
						obj.push(el);
						
						if(max && (obj.length)>= max)
							break;
							
						break;
					}
				}
			}
			else{
				var cleanClassName = el.className;
				
				if(cleanClassName==className){
					obj.push(el);
					
					if(max && (obj.length)>= max)
						break;
				}
			}
		}
    }
	
	//loggerDebug3("obj size: " + obj.length);
	
    return obj;
}

/*
// buggy
function stringToDate(ts){
	var a = new Array();
	a = ts.split(" ");
	var s = a[0];
	a = s.split("/");
	var mo = a[0];
	var d = a[1];
	var yr = [2];
	loggerDebug("mo/d/yr: " + mo + "/" + d + "/" + yr);
	var date = new Date(yr, mo, d);// yr, mo, day
	return date;
}
*/

function computeAgeInDays(startDate){
	var today=new Date()
	var one_day=1000*60*60*24
	var result = Math.ceil((today.getTime()-startDate.getTime())/(one_day));
	return result;
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number;
}

function rgbToHex(R,G,B){
	return toHex(R)+toHex(G)+toHex(B)
}

function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

/*
    * hex — a hex color value such as “#abc” or “#123456? (the hash is optional)
    * lum — the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
*/
function ColorLuminance(hex, lum) {  
    // validate hex string  
    hex = String(hex).replace(/[^0-9a-f]/gi, '');  
    if (hex.length < 6) {  
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];  
    }  
    lum = lum || 0;  
    // convert to decimal and change luminosity  
    var rgb = "#", c, i;  
    for (i = 0; i < 3; i++) {  
        c = parseInt(hex.substr(i*2,2), 16);  
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);  
        rgb += ("00"+c).substr(c.length);  
    }  
    return rgb;  
}


