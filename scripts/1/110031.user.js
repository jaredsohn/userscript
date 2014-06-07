// ==UserScript==
// @name           Stratomatic monthly win loss records
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/league/team_schedule.html*
// ==/UserScript==

/*
Extreme win loss league fun.  Theme league where every team tried to lose as many games as possible, except one which had all the superstars on it. Basically it's now the model for debunking the "normalization" discussions that come up from time to time.
http://fantasygames.sportingnews.com/stratomatic/league/standings.html?group_id=31043
*/

var month = document.evaluate("//span[@class='text12']/b/text()",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

month = month.snapshotItem(0);
month = month.nodeValue;


var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeam;
var theTeam2=''

for (var i = 0; i < theTeams.snapshotLength; i++) {

	theTeam = theTeams.snapshotItem(i);
	theTeam = theTeam.nodeValue;
	theTeam = trim(theTeam);


	if(i + 1 == theTeams.snapshotLength){
		
		theTeam2 += theTeam;
	}
	else
	{
		
		theTeam2 += theTeam + "|";
	}



}


var theMonths = document.evaluate("//span[@class='text12']/a|//span[@class='text12']/b/text()",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theMonth;
var myCount= 0;
var myCount2;



for (var i = 0; i < theMonths.snapshotLength; i++) {

	theMonth = theMonths.snapshotItem(i);
	theMonth = theMonth.textContent;

	myCount++;

	if(month == theMonth){
		myCount2 = myCount;
	}



}

if(myCount2 == theMonths.snapshotLength){

var monthLink;	

var monthLinks = document.evaluate("//span[@class='text12']/a/@href",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var j=0;

	for (var i = 0; i < monthLinks.snapshotLength; i++) {

		j = 1+i;

		monthLink = monthLinks.snapshotItem(i);

  				GM_xmlhttpRequest({
			      		method: 'GET',
 	     				url: 'http://fantasygames.sportingnews.com/stratomatic/league/' + monthLink.nodeValue,
      					headers: {
          					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          					'Accept': 'application/atom+xml,application/xml,text/xml',
      					},
      					onload:callback_function.bind( {}, i, j )
  					});		

	}

}


var results = document.evaluate("//table[@class='datatab_nowidth cleft']/tbody/tr/td[4]/a/text()",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var result;
var wins = 0;
var losses = 0;
var gameCount = 0;

var over500 = 0;
var over500Array = '';


var resultsLastMonthArray = new Array();

for (var i = 0; i < results.snapshotLength; i++) {

	result = results.snapshotItem(i);
	result = result.nodeValue;
	result = result.substring(0,1);

	resultsLastMonthArray.push(result);

	if(result == 'W'){

		wins = wins + 1;
			gameCount = gameCount +1;
			over500 = wins/gameCount;
			over500 = over500.toFixed(3);
			over500 = over500.toString();	

			if(over500 == "1.000"){
				over500 = '1.00';
			}
			else
			{
				over500 = over500.substr(1);
			}

			over500Array = over500Array + over500 + ",";			

	}
	else
	{

			losses = losses + 1;
			gameCount = gameCount + 1;
			over500 = wins/gameCount;

			over500 = over500.toFixed(3);
			over500 = over500.toString();

			if(over500 == "1.000"){
				over500 = '1.00';
			}
			else
			{
				over500 = over500.substr(1);
			}			
			
			over500Array = over500Array + over500 + ",";

	}


}

over500Array = over500Array.substring(0,over500Array.length - 1);

if (over500Array != null) resultsArray = over500Array.split(",");


var allMonthsArray = new Array();


var gameNumbers = document.evaluate("//table[@class='datatab_nowidth cleft']/tbody/tr[@class='odd']/td[1]/text()",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var gameNumber;
var gameNumberArray = '';

for (var i = 0; i < results.snapshotLength; i++) {

	gameNumber = gameNumbers.snapshotItem(i);
	gameNumber = gameNumber.nodeValue;
	gameNumberArray = gameNumberArray + gameNumber + ",";

}

gameNumberArray = gameNumberArray.substring(0,gameNumberArray.length - 1);

if (gameNumberArray != null) gameNumbersArray = gameNumberArray.split(",");


newRow = document.createElement("table");

newRow.setAttribute('class','datatab_nowidth cleft'); 
newRow.setAttribute('border','0'); 
newRow.setAttribute('align','center'); 
newRow.setAttribute('width','95%'); 
newRow.setAttribute('cellspacing','0'); 
newRow.setAttribute('cellpadding','0'); 

newRow3 = document.createElement("table");

newRow3.setAttribute('class','datatab_nowidth cleft'); 
newRow3.setAttribute('border','0'); 
newRow3.setAttribute('align','center'); 
newRow3.setAttribute('width','95%'); 
newRow3.setAttribute('cellspacing','0'); 
newRow3.setAttribute('cellpadding','0'); 

var theTable = document.evaluate("//table[@class='datatab_nowidth cleft']",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

theTable = theTable.snapshotItem(0);

var winPCT = wins + losses;
winPCT = wins/winPCT;
winPCT = winPCT.toFixed(3);
winPCT = winPCT.toString();
winPCT = winPCT.substring(winPCT.indexOf('.'));
winPCT = trim(winPCT);


if(winPCT == 'NaN'){
	
	winPCT = '.000';

}


newRow.innerHTML = '<tbody><tr class="odd"><td class="tcenter"><b>' + month + ' Record: </b>'+wins + "-" + losses + " (" + winPCT + ')</td></tr></tbody>';

newRow2 = document.createElement("table");
newRow2.setAttribute('class','datatab_nowidth cleft'); 
newRow2.setAttribute('border','0'); 
newRow2.setAttribute('align','center'); 
newRow2.setAttribute('width','95%'); 
newRow2.setAttribute('cellspacing','0'); 
newRow2.setAttribute('cellpadding','0'); 

var thisURL = document.URL;

newRow2.innerHTML = '<tbody><tr class="odd"><td class="tcenter"><input class="text12" id="graph" type="button" value="View full season graph" /></td></tr></tbody>';

theTable.parentNode.insertBefore(newRow,theTable.followingSibling);

var clickFlag = false;

document.addEventListener('click', function(event) {

	if (event.target.getAttribute('value') == "View full season graph" && clickFlag == false){

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTime,5000);
		clickFlag = true;

				var buttons = document.getElementsByTagName('input');

				for (var i = 0; i < buttons.length; i++) {
					var button=buttons[i];
			

					if (button.getAttribute('value')){
							
						var matchSTS = button.getAttribute('value').match('View full season graph');
						if(matchSTS)

							button.parentNode.removeChild(button);
			
					}

				}		

		

	}


}, true);


function startTime(){


document.body.style.cursor = "default";
clickFlag = true;
show_graph();


}

/**
 * Set this true if any errors are encountered.
 * @type {Boolean}
 */
var ERROR = false;
/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
var DEBUG = false;

/**
 * Set this true to see dates as labels.
 * @type {Boolean}
 */
var SHOW_DATES = false;

/**
 * An associative array holding patterns.
 * @type {Array}
 */
var PATTERN = new Array();
PATTERN['stats_table'] = '//table[@class=\'datatab_nowidth cleft\']';
PATTERN['daily_count'] = '//table[@class=\'datatab_nowidth cleft\']/tbody/tr[@class=\'odd\']/td[1]/text()';
PATTERN['dates'] = '//table[@class=\'datatab_nowidth cleft\']/tbody/tr[@class=\'odd\']/td[2]/text()';	


	window.addEventListener('load', show_graph, false);


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var monthResults;
var cfLosses = 0;
var cfWins = 0;
var cfResults;
var cfResult;
var cfLossCount=0;
var cfWinCount=0;
var responseTextArray = new Array();
var cfOver500 = 0;
var cfGameCount = 0;
var cfOver500Array = '';


function callback_function(parameter1, parameter2, responseDetails)
{


	monthResults = responseDetails.responseText;

	cfResults = ">[LW],";
	var pattern = new RegExp(cfResults, "g");

	while((result = pattern.exec(monthResults)) != null){

		cfResult = monthResults.substring(result.index + 1,result.index + 2);


		if(cfResult == 'W')
		{

			cfWins = cfWins + 1;
			cfGameCount = cfGameCount +1;
			cfOver500 = cfWins/cfGameCount;
			cfOver500 = cfOver500.toFixed(3);
			cfOver500 = cfOver500.toString();	

			if(cfOver500 == "1.000"){
				cfOver500 = '1.00';
			}
			else
			{
				cfOver500 = cfOver500.substr(1);
			}

			cfOver500Array = cfOver500Array + cfOver500 + ",";			

		}
		else if(cfResult == 'L')
		{

			cfLosses = cfLosses + 1;
			cfGameCount = cfGameCount +1;
			cfOver500 = cfWins/cfGameCount;
			cfOver500 = cfOver500.toFixed(3);
			cfOver500 = cfOver500.toString();	

			if(cfOver500 == "1.000"){
				cfOver500 = '1.00';
			}
			else
			{
				cfOver500 = cfOver500.substr(1);
			}

			cfOver500Array = cfOver500Array + cfOver500 + ",";			


		}		

	}
	

	
if(parameter2 == monthLinks.snapshotLength && resultsLastMonthArray.length != 0){


	
for (var i = 0; i < resultsLastMonthArray.length; i++) {

		if(resultsLastMonthArray[i] == 'W'){

			cfWins = cfWins + 1;
			cfGameCount = cfGameCount +1;
			cfOver500 = cfWins/cfGameCount;
			cfOver500 = cfOver500.toFixed(3);
			cfOver500 = cfOver500.toString();	

			if(cfOver500 == "1.000"){
				cfOver500 = '1.00';
			}
			else
			{
				cfOver500 = cfOver500.substr(1);
			}

			cfOver500Array = cfOver500Array + cfOver500 + ",";			


		}
		else
		{
			cfLosses = cfLosses + 1;
			cfGameCount = cfGameCount +1;
			cfOver500 = cfWins/cfGameCount;
			cfOver500 = cfOver500.toFixed(3);
			cfOver500 = cfOver500.toString();	

			if(cfOver500 == "1.000"){
				cfOver500 = '1.00';
			}
			else
			{
				cfOver500 = cfOver500.substr(1);
			}

			cfOver500Array = cfOver500Array + cfOver500 + ",";			

		}



}	
}//if(parameter2 == monthLinks.snapshotLength){	


	cfOver500Array = cfOver500Array.substring(0,cfOver500Array.length - 1);

	if (cfOver500Array != null) allMonthsArray = cfOver500Array.split(",");	
	

var cfWinPCT = cfWins + cfLosses;
cfWinPCT = cfWins/cfWinPCT;
cfWinPCT = cfWinPCT.toFixed(3);
cfWinPCT = cfWinPCT.toString();
cfWinPCT = cfWinPCT.substring(cfWinPCT.indexOf('.'));
cfWinPCT = trim(cfWinPCT);

	newRow3.innerHTML = '<tbody><tr class="odd"><td class="tcenter"><b> Overall Record: </b>'+cfWins + "-" + cfLosses + " (" + cfWinPCT + ')</td></tr></tbody>';

	

}




Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}





/**
 * Shows above the install stats table a plot based on
 * the daily count column of the table.
 */
function show_graph(){
	
	if(resultsArray==''){
		resultsArray = ('0');
		gameNumbersArray = ('0');
	}
	

    ERROR = false;
    var tableResult = getPatternResult(PATTERN['stats_table']);
    if ((tableResult == null) || (tableResult.snapshotLength < 1)) 
        error('Could not find the stats table.');
    else {
        var table = tableResult.snapshotItem(0);
        var div = document.createElement('div');
        div.id = 'daily_stats_graph';
        div.setAttribute('width', '770');
        div.setAttribute('height', '200');
        div.setAttribute('title', 'Click to change color.');
        div.style.paddingBottom = '20px';
	if(clickFlag==false){
	        table.parentNode.insertBefore(div, table.followingSibling);
	}

        var div2 = document.createElement('div');
        div2.id = 'daily_stats_graph2';
        div2.setAttribute('width', '770');
        div2.setAttribute('height', '200');
        div2.setAttribute('title', 'Click to change color.');
        div2.style.paddingBottom = '20px';

	if(clickFlag==true){
		
		theTable.parentNode.insertBefore(newRow3,theTable.followingSibling);		
		table.parentNode.insertBefore(div2, table.followingSibling);
	       
	       
	}

	//add button
	if(myCount2 == theMonths.snapshotLength){
		theTable.parentNode.insertBefore(newRow2,theTable.followingSibling);
		
	}


        var hasCanvas = CanvasRenderer.isSupported();
        if (hasCanvas) {
            var daily_count = resultsArray;
	    
            if ((daily_count == null) || (resultsArray.length <= 0)){
                div.innerHTML = 'No data available.';	    
	    }
            else {
                var data = new Array();
		var data2 = new Array();
                for (var i = 0; i < resultsArray.length; i++) {
                    var count = resultsArray[i];
		    count = parseFloat(count);
		    count = count.toFixed(3);
		   
                    data[data.length] = [i, count];
		    
		    
                }



                for (var i = 0; i < allMonthsArray.length; i++) {
                    var count = allMonthsArray[i];
		    count = parseFloat(count);
		    count = count.toFixed(3);
		   
                    data2[data2.length] = [i, count];
		    
		    
                }		

		
                var ticks = new Array();
		var ticks2 = new Array();
		var gameNumbersArray2 = new Array();
		
		for (var i = 0; i < allMonthsArray.length; i++) {

			gameNumbersArray2[i] = i+1;


		}


		var newLength;
		var newDate;
		var newIndex;
	
			var size = gameNumbersArray.length;
			var size2 = allMonthsArray.length;
			var maxTicks = (6 <= size) ? 6 : size;
			var maxTicks2 = (6 <= size2) ? 6 : size2;

			for (var i = 0; i < maxTicks2; i++) {	

				var index2 = Math.ceil(i * (size2 - 1) / maxTicks2);
				var date2 = parseInt(gameNumbersArray2[i]) + parseInt(index2);
								
                      		ticks2[ticks2.length] = {
      		                v: index2,
                            	label: date2
                        	};				


			}
			


                    for (var i = 0; i < maxTicks; i++) {
                        var index = Math.ceil(i * (size - 1) / maxTicks);
			
						

			var date = parseInt(gameNumbersArray[i]) + parseInt(index);


			if(date <= gameNumber){

				newLength = ticks.length;
				newDate = date;
				newIndex = index;

			}
	
                      	ticks[ticks.length] = {
                            v: index,
                            label: date
                        };
			
		    }		

	


                if (SHOW_DATES) {
                    ticks = new Array();
                    var dates = getPatternResult(PATTERN['dates']);
                    
		    var size = resultsArray.length;
                    var maxTicks = (15 <= size) ? 15 : size;
		    
                    for (var i = 0; i < maxTicks; i++) {
                        var index = Math.ceil(i * (size - 1) / maxTicks);
		
			var date = parseInt(gameNumbersArray[i]) + parseInt(index) + 1;

                        ticks[ticks.length] = {
                            v: index,
                            label: date
                        };
		
                    }
                }
		
		
		var yTicks = null;
		yTicks = new Array();
		yTicksB = new Array();
		
		yTicksB[0] = ".000";
		yTicksB[1] = ".250";
		yTicksB[2] = ".500";
		yTicksB[3] = ".750";
		yTicksB[4] = "1.00";

		for (var i = 0; i < 5; i++) {

			yTicks[yTicks.length] = {
			v: yTicksB[i],
			label: yTicksB[i]			
			};

		}

	
                var color = (typeof GM_getValue == 'function') ? GM_getValue('graph_color', 6) : 6;

                var options = {
                    'colorScheme': PlotKit.Base.palette(PlotKit.Base.baseColors()[color]),
                    'xTicks': ticks,
		    'yTicks': yTicks
                };

                var options2 = {
                    'colorScheme': PlotKit.Base.palette(PlotKit.Base.baseColors()[color]),
                    'xTicks': ticks2,
		    'yTicks': yTicks
                };		
		
		
                var line = new EasyPlot("line", options, div, [data]);	
		var line2 = new EasyPlot("line", options2, div2, [data2]);	

                div.addEventListener('click', function(){
                    color++;
                    if (color >= PlotKit.Base.baseColors().length) 
                        color = 0;
                    if (typeof GM_setValue == 'function') 
                        GM_setValue('graph_color', color);
                    options = {
                        "colorScheme": PlotKit.Base.palette(PlotKit.Base.baseColors()[color])
                    };
                    line.renderer = new SweetCanvasRenderer(line.element, line.layout, options);
                    line.renderer.clear();
                    line.renderer.render();
                }, false);

                div2.addEventListener('click', function(){
                    color++;
                    if (color >= PlotKit.Base.baseColors().length) 
                        color = 0;
                    if (typeof GM_setValue == 'function') 
                        GM_setValue('graph_color', color);
                    options2 = {
                        "colorScheme": PlotKit.Base.palette(PlotKit.Base.baseColors()[color])
                    };
                    line2.renderer = new SweetCanvasRenderer(line2.element, line2.layout, options2);
                    line2.renderer.clear();
                    line2.renderer.render();
                }, false);		
		

            }
        }
        else {
            div.style.color = 'red';
            div.innerHTML = 'CanvasRenderer is not supported.';
	    
        }
    }
    if (ERROR) 
        alert('Errors encountered while running the script.' +
        ((typeof GM_log == 'function') ? '\nSee JavaScript Console for more messages.' : '') +
        (DEBUG ? '' : '\nSet DEBUG = true to view more more details.'));
}

/**
 * @param {String} pattern The pattern to search for.
 * @return {XPathResult} The result of the search.
 */
function getPatternResult(pattern){
    return document.evaluate(pattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
 * Displays the error message if DEBUG is set to true.
 * Uses gmlog where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function error(message){
    if (DEBUG) 
        if (typeof GM_log == 'function') 
            GM_log(message);//greasemonkey specific function
        else 
            GM_log(message);
    ERROR = true;
}

/////////////////////////////
//MochiKit.MochiKit 1.4.2 : PACKED VERSION
//See <http://mochikit.com/> for documentation, downloads, license, etc.
//(c) 2005 Bob Ippolito.  All rights Reserved.
/////////////////////////////
if(typeof(dojo)!="undefined"){dojo.provide("MochiKit.Base")}if(typeof(MochiKit)=="undefined"){MochiKit={}}if(typeof(MochiKit.Base)=="undefined"){MochiKit.Base={}}if(typeof(MochiKit.__export__)=="undefined"){MochiKit.__export__=(MochiKit.__compat__||(typeof(JSAN)=="undefined"&&typeof(dojo)=="undefined"))}MochiKit.Base.VERSION="1.4.2";MochiKit.Base.NAME="MochiKit.Base";MochiKit.Base.update=function(_1,_2){if(_1===null||_1===undefined){_1={}}for(var i=1;i<arguments.length;i++){var o=arguments[i];if(typeof(o)!="undefined"&&o!==null){for(var k in o){_1[k]=o[k]}}}return _1};MochiKit.Base.update(MochiKit.Base,{__repr__:function(){return"["+this.NAME+" "+this.VERSION+"]"},toString:function(){return this.__repr__()},camelize:function(_6){var _7=_6.split("-");var cc=_7[0];for(var i=1;i<_7.length;i++){cc+=_7[i].charAt(0).toUpperCase()+_7[i].substring(1)}return cc},counter:function(n){if(arguments.length===0){n=1}return function(){return n++}},clone:function(_b){var me=arguments.callee;if(arguments.length==1){me.prototype=_b;return new me()}},_deps:function(_d,_e){if(!(_d in MochiKit)){MochiKit[_d]={}}if(typeof(dojo)!="undefined"){dojo.provide("MochiKit."+_d)}for(var i=0;i<_e.length;i++){if(typeof(dojo)!="undefined"){dojo.require("MochiKit."+_e[i])}if(typeof(JSAN)!="undefined"){JSAN.use("MochiKit."+_e[i],[])}if(!(_e[i]in MochiKit)){throw"MochiKit."+_d+" depends on MochiKit."+_e[i]+"!";}}},_flattenArray:function(res,lst){for(var i=0;i<lst.length;i++){var o=lst[i];if(o instanceof Array){arguments.callee(res,o)}else{res.push(o)}}return res},flattenArray:function(lst){return MochiKit.Base._flattenArray([],lst)},flattenArguments:function(lst){var res=[];var m=MochiKit.Base;var _18=m.extend(null,arguments);while(_18.length){var o=_18.shift();if(o&&typeof(o)=="object"&&typeof(o.length)=="number"){for(var i=o.length-1;i>=0;i--){_18.unshift(o[i])}}else{res.push(o)}}return res},extend:function(_1b,obj,_1d){if(!_1d){_1d=0}if(obj){var l=obj.length;if(typeof(l)!="number"){if(typeof(MochiKit.Iter)!="undefined"){obj=MochiKit.Iter.list(obj);l=obj.length}else{throw new TypeError("Argument not an array-like and MochiKit.Iter not present");}}if(!_1b){_1b=[]}for(var i=_1d;i<l;i++){_1b.push(obj[i])}}return _1b},updatetree:function(_20,obj){if(_20===null||_20===undefined){_20={}}for(var i=1;i<arguments.length;i++){var o=arguments[i];if(typeof(o)!="undefined"&&o!==null){for(var k in o){var v=o[k];if(typeof(_20[k])=="object"&&typeof(v)=="object"){arguments.callee(_20[k],v)}else{_20[k]=v}}}}return _20},setdefault:function(_26,obj){if(_26===null||_26===undefined){_26={}}for(var i=1;i<arguments.length;i++){var o=arguments[i];for(var k in o){if(!(k in _26)){_26[k]=o[k]}}}return _26},keys:function(obj){var _2c=[];for(var _2d in obj){_2c.push(_2d)}return _2c},values:function(obj){var _2f=[];for(var _30 in obj){_2f.push(obj[_30])}return _2f},items:function(obj){var _32=[];var e;for(var _34 in obj){var v;try{v=obj[_34]}catch(e){continue}_32.push([_34,v])}return _32},_newNamedError:function(_36,_37,_38){_38.prototype=new MochiKit.Base.NamedError(_36.NAME+"."+_37);_36[_37]=_38},operator:{truth:function(a){return!!a},lognot:function(a){return!a},identity:function(a){return a},not:function(a){return~a},neg:function(a){return-a},add:function(a,b){return a+b},sub:function(a,b){return a-b},div:function(a,b){return a/b},mod:function(a,b){return a%b},mul:function(a,b){return a*b},and:function(a,b){return a&b},or:function(a,b){return a|b},xor:function(a,b){return a^b},lshift:function(a,b){return a<<b},rshift:function(a,b){return a>>b},zrshift:function(a,b){return a>>>b},eq:function(a,b){return a==b},ne:function(a,b){return a!=b},gt:function(a,b){return a>b},ge:function(a,b){return a>=b},lt:function(a,b){return a<b},le:function(a,b){return a<=b},seq:function(a,b){return a===b},sne:function(a,b){return a!==b},ceq:function(a,b){return MochiKit.Base.compare(a,b)===0},cne:function(a,b){return MochiKit.Base.compare(a,b)!==0},cgt:function(a,b){return MochiKit.Base.compare(a,b)==1},cge:function(a,b){return MochiKit.Base.compare(a,b)!=-1},clt:function(a,b){return MochiKit.Base.compare(a,b)==-1},cle:function(a,b){return MochiKit.Base.compare(a,b)!=1},logand:function(a,b){return a&&b},logor:function(a,b){return a||b},contains:function(a,b){return b in a}},forwardCall:function(_76){return function(){return this[_76].apply(this,arguments)}},itemgetter:function(_77){return function(arg){return arg[_77]}},typeMatcher:function(){var _79={};for(var i=0;i<arguments.length;i++){var typ=arguments[i];_79[typ]=typ}return function(){for(var i=0;i<arguments.length;i++){if(!(typeof(arguments[i])in _79)){return false}}return true}},isNull:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==null){return false}}return true},isUndefinedOrNull:function(){for(var i=0;i<arguments.length;i++){var o=arguments[i];if(!(typeof(o)=="undefined"||o===null)){return false}}return true},isEmpty:function(obj){return!MochiKit.Base.isNotEmpty.apply(this,arguments)},isNotEmpty:function(obj){for(var i=0;i<arguments.length;i++){var o=arguments[i];if(!(o&&o.length)){return false}}return true},isArrayLike:function(){for(var i=0;i<arguments.length;i++){var o=arguments[i];var typ=typeof(o);if((typ!="object"&&!(typ=="function"&&typeof(o.item)=="function"))||o===null||typeof(o.length)!="number"||o.nodeType===3||o.nodeType===4){return false}}return true},isDateLike:function(){for(var i=0;i<arguments.length;i++){var o=arguments[i];if(typeof(o)!="object"||o===null||typeof(o.getTime)!="function"){return false}}return true},xmap:function(fn){if(fn===null){return MochiKit.Base.extend(null,arguments,1)}var _8a=[];for(var i=1;i<arguments.length;i++){_8a.push(fn(arguments[i]))}return _8a},map:function(fn,lst){var m=MochiKit.Base;var itr=MochiKit.Iter;var _90=m.isArrayLike;if(arguments.length<=2){if(!_90(lst)){if(itr){lst=itr.list(lst);if(fn===null){return lst}}else{throw new TypeError("Argument not an array-like and MochiKit.Iter not present");}}if(fn===null){return m.extend(null,lst)}var _91=[];for(var i=0;i<lst.length;i++){_91.push(fn(lst[i]))}return _91}else{if(fn===null){fn=Array}var _93=null;for(i=1;i<arguments.length;i++){if(!_90(arguments[i])){if(itr){return itr.list(itr.imap.apply(null,arguments))}else{throw new TypeError("Argument not an array-like and MochiKit.Iter not present");}}var l=arguments[i].length;if(_93===null||_93>l){_93=l}}_91=[];for(i=0;i<_93;i++){var _95=[];for(var j=1;j<arguments.length;j++){_95.push(arguments[j][i])}_91.push(fn.apply(this,_95))}return _91}},xfilter:function(fn){var _98=[];if(fn===null){fn=MochiKit.Base.operator.truth}for(var i=1;i<arguments.length;i++){var o=arguments[i];if(fn(o)){_98.push(o)}}return _98},filter:function(fn,lst,_9d){var _9e=[];var m=MochiKit.Base;if(!m.isArrayLike(lst)){if(MochiKit.Iter){lst=MochiKit.Iter.list(lst)}else{throw new TypeError("Argument not an array-like and MochiKit.Iter not present");}}if(fn===null){fn=m.operator.truth}if(typeof(Array.prototype.filter)=="function"){return Array.prototype.filter.call(lst,fn,_9d)}else{if(typeof(_9d)=="undefined"||_9d===null){for(var i=0;i<lst.length;i++){var o=lst[i];if(fn(o)){_9e.push(o)}}}else{for(i=0;i<lst.length;i++){o=lst[i];if(fn.call(_9d,o)){_9e.push(o)}}}}return _9e},_wrapDumbFunction:function(_a2){return function(){switch(arguments.length){case 0:return _a2();case 1:return _a2(arguments[0]);case 2:return _a2(arguments[0],arguments[1]);case 3:return _a2(arguments[0],arguments[1],arguments[2])}var _a3=[];for(var i=0;i<arguments.length;i++){_a3.push("arguments["+i+"]")}return eval("(func("+_a3.join(",")+"))")}},methodcaller:function(_a5){var _a6=MochiKit.Base.extend(null,arguments,1);if(typeof(_a5)=="function"){return function(obj){return _a5.apply(obj,_a6)}}else{return function(obj){return obj[_a5].apply(obj,_a6)}}},method:function(_a9,_aa){var m=MochiKit.Base;return m.bind.apply(this,m.extend([_aa,_a9],arguments,2))},compose:function(f1,f2){var _ae=[];var m=MochiKit.Base;if(arguments.length===0){throw new TypeError("compose() requires at least one argument");}for(var i=0;i<arguments.length;i++){var fn=arguments[i];if(typeof(fn)!="function"){throw new TypeError(m.repr(fn)+" is not a function");}_ae.push(fn)}return function(){var _b2=arguments;for(var i=_ae.length-1;i>=0;i--){_b2=[_ae[i].apply(this,_b2)]}return _b2[0]}},bind:function(_b4,_b5){if(typeof(_b4)=="string"){_b4=_b5[_b4]}var _b6=_b4.im_func;var _b7=_b4.im_preargs;var _b8=_b4.im_self;var m=MochiKit.Base;if(typeof(_b4)=="function"&&typeof(_b4.apply)=="undefined"){_b4=m._wrapDumbFunction(_b4)}if(typeof(_b6)!="function"){_b6=_b4}if(typeof(_b5)!="undefined"){_b8=_b5}if(typeof(_b7)=="undefined"){_b7=[]}else{_b7=_b7.slice()}m.extend(_b7,arguments,2);var _ba=function(){var _bb=arguments;var me=arguments.callee;if(me.im_preargs.length>0){_bb=m.concat(me.im_preargs,_bb)}var _bd=me.im_self;if(!_bd){_bd=this}return me.im_func.apply(_bd,_bb)};_ba.im_self=_b8;_ba.im_func=_b6;_ba.im_preargs=_b7;return _ba},bindLate:function(_be,_bf){var m=MochiKit.Base;if(typeof(_be)!="string"){return m.bind.apply(this,arguments)}var _c1=m.extend([],arguments,2);var _c2=function(){var _c3=arguments;var me=arguments.callee;if(me.im_preargs.length>0){_c3=m.concat(me.im_preargs,_c3)}var _c5=me.im_self;if(!_c5){_c5=this}return _c5[me.im_func].apply(_c5,_c3)};_c2.im_self=_bf;_c2.im_func=_be;_c2.im_preargs=_c1;return _c2},bindMethods:function(_c6){var _c7=MochiKit.Base.bind;for(var k in _c6){var _c9=_c6[k];if(typeof(_c9)=="function"){_c6[k]=_c7(_c9,_c6)}}},registerComparator:function(_ca,_cb,_cc,_cd){MochiKit.Base.comparatorRegistry.register(_ca,_cb,_cc,_cd)},_primitives:{"boolean":true,"string":true,"number":true},compare:function(a,b){if(a==b){return 0}var _d0=(typeof(a)=="undefined"||a===null);var _d1=(typeof(b)=="undefined"||b===null);if(_d0&&_d1){return 0}else{if(_d0){return-1}else{if(_d1){return 1}}}var m=MochiKit.Base;var _d3=m._primitives;if(!(typeof(a)in _d3&&typeof(b)in _d3)){try{return m.comparatorRegistry.match(a,b)}catch(e){if(e!=m.NotFound){throw e;}}}if(a<b){return-1}else{if(a>b){return 1}}var _d4=m.repr;throw new TypeError(_d4(a)+" and "+_d4(b)+" can not be compared");},compareDateLike:function(a,b){return MochiKit.Base.compare(a.getTime(),b.getTime())},compareArrayLike:function(a,b){var _d9=MochiKit.Base.compare;var _da=a.length;var _db=0;if(_da>b.length){_db=1;_da=b.length}else{if(_da<b.length){_db=-1}}for(var i=0;i<_da;i++){var cmp=_d9(a[i],b[i]);if(cmp){return cmp}}return _db},registerRepr:function(_de,_df,_e0,_e1){MochiKit.Base.reprRegistry.register(_de,_df,_e0,_e1)},repr:function(o){if(typeof(o)=="undefined"){return"undefined"}else{if(o===null){return"null"}}try{if(typeof(o.__repr__)=="function"){return o.__repr__()}else{if(typeof(o.repr)=="function"&&o.repr!=arguments.callee){return o.repr()}}return MochiKit.Base.reprRegistry.match(o)}catch(e){if(typeof(o.NAME)=="string"&&(o.toString==Function.prototype.toString||o.toString==Object.prototype.toString)){return o.NAME}}try{var _e3=(o+"")}catch(e){return"["+typeof(o)+"]"}if(typeof(o)=="function"){_e3=_e3.replace(/^\s+/,"").replace(/\s+/g," ");_e3=_e3.replace(/,(\S)/,", $1");var idx=_e3.indexOf("{");if(idx!=-1){_e3=_e3.substr(0,idx)+"{...}"}}return _e3},reprArrayLike:function(o){var m=MochiKit.Base;return"["+m.map(m.repr,o).join(", ")+"]"},reprString:function(o){return("\""+o.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\v]/g,"\\v").replace(/[\r]/g,"\\r")},reprNumber:function(o){return o+""},registerJSON:function(_e9,_ea,_eb,_ec){MochiKit.Base.jsonRegistry.register(_e9,_ea,_eb,_ec)},evalJSON:function(){return eval("("+MochiKit.Base._filterJSON(arguments[0])+")")},_filterJSON:function(s){var m=s.match(/^\s*\/\*(.*)\*\/\s*$/);if(m){return m[1]}return s},serializeJSON:function(o){var _f0=typeof(o);if(_f0=="number"||_f0=="boolean"){return o+""}else{if(o===null){return"null"}else{if(_f0=="string"){var res="";for(var i=0;i<o.length;i++){var c=o.charAt(i);if(c=="\""){res+="\\\""}else{if(c=="\\"){res+="\\\\"}else{if(c=="\b"){res+="\\b"}else{if(c=="\f"){res+="\\f"}else{if(c=="\n"){res+="\\n"}else{if(c=="\r"){res+="\\r"}else{if(c=="\t"){res+="\\t"}else{if(o.charCodeAt(i)<=31){var hex=o.charCodeAt(i).toString(16);if(hex.length<2){hex="0"+hex}res+="\\u00"+hex.toUpperCase()}else{res+=c}}}}}}}}}return"\""+res+"\""}}}var me=arguments.callee;var _f6;if(typeof(o.__json__)=="function"){_f6=o.__json__();if(o!==_f6){return me(_f6)}}if(typeof(o.json)=="function"){_f6=o.json();if(o!==_f6){return me(_f6)}}if(_f0!="function"&&typeof(o.length)=="number"){var res=[];for(var i=0;i<o.length;i++){var val=me(o[i]);if(typeof(val)!="string"){continue}res.push(val)}return"["+res.join(", ")+"]"}var m=MochiKit.Base;try{_f6=m.jsonRegistry.match(o);if(o!==_f6){return me(_f6)}}catch(e){if(e!=m.NotFound){throw e;}}if(_f0=="undefined"){throw new TypeError("undefined can not be serialized as JSON");}if(_f0=="function"){return null}res=[];for(var k in o){var _fa;if(typeof(k)=="number"){_fa="\""+k+"\""}else{if(typeof(k)=="string"){_fa=me(k)}else{continue}}val=me(o[k]);if(typeof(val)!="string"){continue}res.push(_fa+":"+val)}return"{"+res.join(", ")+"}"},objEqual:function(a,b){return(MochiKit.Base.compare(a,b)===0)},arrayEqual:function(_fd,arr){if(_fd.length!=arr.length){return false}return(MochiKit.Base.compare(_fd,arr)===0)},concat:function(){var _ff=[];var _100=MochiKit.Base.extend;for(var i=0;i<arguments.length;i++){_100(_ff,arguments[i])}return _ff},keyComparator:function(key){var m=MochiKit.Base;var _104=m.compare;if(arguments.length==1){return function(a,b){return _104(a[key],b[key])}}var _107=m.extend(null,arguments);return function(a,b){var rval=0;for(var i=0;(rval===0)&&(i<_107.length);i++){var key=_107[i];rval=_104(a[key],b[key])}return rval}},reverseKeyComparator:function(key){var _10e=MochiKit.Base.keyComparator.apply(this,arguments);return function(a,b){return _10e(b,a)}},partial:function(func){var m=MochiKit.Base;return m.bind.apply(this,m.extend([func,undefined],arguments,1))},listMinMax:function(_113,lst){if(lst.length===0){return null}var cur=lst[0];var _116=MochiKit.Base.compare;for(var i=1;i<lst.length;i++){var o=lst[i];if(_116(o,cur)==_113){cur=o}}return cur},objMax:function(){return MochiKit.Base.listMinMax(1,arguments)},objMin:function(){return MochiKit.Base.listMinMax(-1,arguments)},findIdentical:function(lst,_11a,_11b,end){if(typeof(end)=="undefined"||end===null){end=lst.length}if(typeof(_11b)=="undefined"||_11b===null){_11b=0}for(var i=_11b;i<end;i++){if(lst[i]===_11a){return i}}return-1},mean:function(){var sum=0;var m=MochiKit.Base;var args=m.extend(null,arguments);var _121=args.length;while(args.length){var o=args.shift();if(o&&typeof(o)=="object"&&typeof(o.length)=="number"){_121+=o.length-1;for(var i=o.length-1;i>=0;i--){sum+=o[i]}}else{sum+=o}}if(_121<=0){throw new TypeError("mean() requires at least one argument");}return sum/_121},median:function(){var data=MochiKit.Base.flattenArguments(arguments);if(data.length===0){throw new TypeError("median() requires at least one argument");}data.sort(compare);if(data.length%2==0){var _125=data.length/2;return(data[_125]+data[_125-1])/2}else{return data[(data.length-1)/2]}},findValue:function(lst,_127,_128,end){if(typeof(end)=="undefined"||end===null){end=lst.length}if(typeof(_128)=="undefined"||_128===null){_128=0}var cmp=MochiKit.Base.compare;for(var i=_128;i<end;i++){if(cmp(lst[i],_127)===0){return i}}return-1},nodeWalk:function(node,_12d){var _12e=[node];var _12f=MochiKit.Base.extend;while(_12e.length){var res=_12d(_12e.shift());if(res){_12f(_12e,res)}}},nameFunctions:function(_131){var base=_131.NAME;if(typeof(base)=="undefined"){base=""}else{base=base+"."}for(var name in _131){var o=_131[name];if(typeof(o)=="function"&&typeof(o.NAME)=="undefined"){try{o.NAME=base+name}catch(e){}}}},queryString:function(_135,_136){if(typeof(MochiKit.DOM)!="undefined"&&arguments.length==1&&(typeof(_135)=="string"||(typeof(_135.nodeType)!="undefined"&&_135.nodeType>0))){var kv=MochiKit.DOM.formContents(_135);_135=kv[0];_136=kv[1]}else{if(arguments.length==1){if(typeof(_135.length)=="number"&&_135.length==2){return arguments.callee(_135[0],_135[1])}var o=_135;_135=[];_136=[];for(var k in o){var v=o[k];if(typeof(v)=="function"){continue}else{if(MochiKit.Base.isArrayLike(v)){for(var i=0;i<v.length;i++){_135.push(k);_136.push(v[i])}}else{_135.push(k);_136.push(v)}}}}}var rval=[];var len=Math.min(_135.length,_136.length);var _13e=MochiKit.Base.urlEncode;for(var i=0;i<len;i++){v=_136[i];if(typeof(v)!="undefined"&&v!==null){rval.push(_13e(_135[i])+"="+_13e(v))}}return rval.join("&")},parseQueryString:function(_13f,_140){var qstr=(_13f.charAt(0)=="?")?_13f.substring(1):_13f;var _142=qstr.replace(/\+/g,"%20").split(/\&amp\;|\&\#38\;|\&#x26;|\&/);var o={};var _144;if(typeof(decodeURIComponent)!="undefined"){_144=decodeURIComponent}else{_144=unescape}if(_140){for(var i=0;i<_142.length;i++){var pair=_142[i].split("=");var name=_144(pair.shift());if(!name){continue}var arr=o[name];if(!(arr instanceof Array)){arr=[];o[name]=arr}arr.push(_144(pair.join("=")))}}else{for(i=0;i<_142.length;i++){pair=_142[i].split("=");var name=pair.shift();if(!name){continue}o[_144(name)]=_144(pair.join("="))}}return o}});MochiKit.Base.AdapterRegistry=function(){this.pairs=[]};MochiKit.Base.AdapterRegistry.prototype={register:function(name,_14a,wrap,_14c){if(_14c){this.pairs.unshift([name,_14a,wrap])}else{this.pairs.push([name,_14a,wrap])}},match:function(){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair[1].apply(this,arguments)){return pair[2].apply(this,arguments)}}throw MochiKit.Base.NotFound;},unregister:function(name){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair[0]==name){this.pairs.splice(i,1);return true}}return false}};MochiKit.Base.EXPORT=["flattenArray","noop","camelize","counter","clone","extend","update","updatetree","setdefault","keys","values","items","NamedError","operator","forwardCall","itemgetter","typeMatcher","isCallable","isUndefined","isUndefinedOrNull","isNull","isEmpty","isNotEmpty","isArrayLike","isDateLike","xmap","map","xfilter","filter","methodcaller","compose","bind","bindLate","bindMethods","NotFound","AdapterRegistry","registerComparator","compare","registerRepr","repr","objEqual","arrayEqual","concat","keyComparator","reverseKeyComparator","partial","merge","listMinMax","listMax","listMin","objMax","objMin","nodeWalk","zip","urlEncode","queryString","serializeJSON","registerJSON","evalJSON","parseQueryString","findValue","findIdentical","flattenArguments","method","average","mean","median"];MochiKit.Base.EXPORT_OK=["nameFunctions","comparatorRegistry","reprRegistry","jsonRegistry","compareDateLike","compareArrayLike","reprArrayLike","reprString","reprNumber"];MochiKit.Base._exportSymbols=function(_152,_153){if(!MochiKit.__export__){return}var all=_153.EXPORT_TAGS[":all"];for(var i=0;i<all.length;i++){_152[all[i]]=_153[all[i]]}};MochiKit.Base.__new__=function(){var m=this;m.noop=m.operator.identity;m.forward=m.forwardCall;m.find=m.findValue;if(typeof(encodeURIComponent)!="undefined"){m.urlEncode=function(_157){return encodeURIComponent(_157).replace(/\'/g,"%27")}}else{m.urlEncode=function(_158){return escape(_158).replace(/\+/g,"%2B").replace(/\"/g,"%22").rval.replace(/\'/g,"%27")}}m.NamedError=function(name){this.message=name;this.name=name};m.NamedError.prototype=new Error();m.update(m.NamedError.prototype,{repr:function(){if(this.message&&this.message!=this.name){return this.name+"("+m.repr(this.message)+")"}else{return this.name+"()"}},toString:m.forwardCall("repr")});m.NotFound=new m.NamedError("MochiKit.Base.NotFound");m.listMax=m.partial(m.listMinMax,1);m.listMin=m.partial(m.listMinMax,-1);m.isCallable=m.typeMatcher("function");m.isUndefined=m.typeMatcher("undefined");m.merge=m.partial(m.update,null);m.zip=m.partial(m.map,null);m.average=m.mean;m.comparatorRegistry=new m.AdapterRegistry();m.registerComparator("dateLike",m.isDateLike,m.compareDateLike);m.registerComparator("arrayLike",m.isArrayLike,m.compareArrayLike);m.reprRegistry=new m.AdapterRegistry();m.registerRepr("arrayLike",m.isArrayLike,m.reprArrayLike);m.registerRepr("string",m.typeMatcher("string"),m.reprString);m.registerRepr("numbers",m.typeMatcher("number","boolean"),m.reprNumber);m.jsonRegistry=new m.AdapterRegistry();var all=m.concat(m.EXPORT,m.EXPORT_OK);m.EXPORT_TAGS={":common":m.concat(m.EXPORT_OK),":all":all};m.nameFunctions(this)};MochiKit.Base.__new__();if(MochiKit.__export__){compare=MochiKit.Base.compare;compose=MochiKit.Base.compose;serializeJSON=MochiKit.Base.serializeJSON;mean=MochiKit.Base.mean;median=MochiKit.Base.median}MochiKit.Base._exportSymbols(this,MochiKit.Base);MochiKit.Base._deps("Iter",["Base"]);MochiKit.Iter.NAME="MochiKit.Iter";MochiKit.Iter.VERSION="1.4.2";MochiKit.Base.update(MochiKit.Iter,{__repr__:function(){return"["+this.NAME+" "+this.VERSION+"]"},toString:function(){return this.__repr__()},registerIteratorFactory:function(name,_15c,_15d,_15e){MochiKit.Iter.iteratorRegistry.register(name,_15c,_15d,_15e)},isIterable:function(o){return o!=null&&(typeof(o.next)=="function"||typeof(o.iter)=="function")},iter:function(_160,_161){var self=MochiKit.Iter;if(arguments.length==2){return self.takewhile(function(a){return a!=_161},_160)}if(typeof(_160.next)=="function"){return _160}else{if(typeof(_160.iter)=="function"){return _160.iter()}}try{return self.iteratorRegistry.match(_160)}catch(e){var m=MochiKit.Base;if(e==m.NotFound){e=new TypeError(typeof(_160)+": "+m.repr(_160)+" is not iterable")}throw e;}},count:function(n){if(!n){n=0}var m=MochiKit.Base;return{repr:function(){return"count("+n+")"},toString:m.forwardCall("repr"),next:m.counter(n)}},cycle:function(p){var self=MochiKit.Iter;var m=MochiKit.Base;var lst=[];var _16b=self.iter(p);return{repr:function(){return"cycle(...)"},toString:m.forwardCall("repr"),next:function(){try{var rval=_16b.next();lst.push(rval);return rval}catch(e){if(e!=self.StopIteration){throw e;}if(lst.length===0){this.next=function(){throw self.StopIteration;}}else{var i=-1;this.next=function(){i=(i+1)%lst.length;return lst[i]}}return this.next()}}}},repeat:function(elem,n){var m=MochiKit.Base;if(typeof(n)=="undefined"){return{repr:function(){return"repeat("+m.repr(elem)+")"},toString:m.forwardCall("repr"),next:function(){return elem}}}return{repr:function(){return"repeat("+m.repr(elem)+", "+n+")"},toString:m.forwardCall("repr"),next:function(){if(n<=0){throw MochiKit.Iter.StopIteration;}n-=1;return elem}}},next:function(_171){return _171.next()},izip:function(p,q){var m=MochiKit.Base;var self=MochiKit.Iter;var next=self.next;var _177=m.map(self.iter,arguments);return{repr:function(){return"izip(...)"},toString:m.forwardCall("repr"),next:function(){return m.map(next,_177)}}},ifilter:function(pred,seq){var m=MochiKit.Base;seq=MochiKit.Iter.iter(seq);if(pred===null){pred=m.operator.truth}return{repr:function(){return"ifilter(...)"},toString:m.forwardCall("repr"),next:function(){while(true){var rval=seq.next();if(pred(rval)){return rval}}return undefined}}},ifilterfalse:function(pred,seq){var m=MochiKit.Base;seq=MochiKit.Iter.iter(seq);if(pred===null){pred=m.operator.truth}return{repr:function(){return"ifilterfalse(...)"},toString:m.forwardCall("repr"),next:function(){while(true){var rval=seq.next();if(!pred(rval)){return rval}}return undefined}}},islice:function(seq){var self=MochiKit.Iter;var m=MochiKit.Base;seq=self.iter(seq);var _183=0;var stop=0;var step=1;var i=-1;if(arguments.length==2){stop=arguments[1]}else{if(arguments.length==3){_183=arguments[1];stop=arguments[2]}else{_183=arguments[1];stop=arguments[2];step=arguments[3]}}return{repr:function(){return"islice("+["...",_183,stop,step].join(", ")+")"},toString:m.forwardCall("repr"),next:function(){var rval;while(i<_183){rval=seq.next();i++}if(_183>=stop){throw self.StopIteration;}_183+=step;return rval}}},imap:function(fun,p,q){var m=MochiKit.Base;var self=MochiKit.Iter;var _18d=m.map(self.iter,m.extend(null,arguments,1));var map=m.map;var next=self.next;return{repr:function(){return"imap(...)"},toString:m.forwardCall("repr"),next:function(){return fun.apply(this,map(next,_18d))}}},applymap:function(fun,seq,self){seq=MochiKit.Iter.iter(seq);var m=MochiKit.Base;return{repr:function(){return"applymap(...)"},toString:m.forwardCall("repr"),next:function(){return fun.apply(self,seq.next())}}},chain:function(p,q){var self=MochiKit.Iter;var m=MochiKit.Base;if(arguments.length==1){return self.iter(arguments[0])}var _198=m.map(self.iter,arguments);return{repr:function(){return"chain(...)"},toString:m.forwardCall("repr"),next:function(){while(_198.length>1){try{var _199=_198[0].next();return _199}catch(e){if(e!=self.StopIteration){throw e;}_198.shift();var _199=_198[0].next();return _199}}if(_198.length==1){var arg=_198.shift();this.next=m.bind("next",arg);return this.next()}throw self.StopIteration;}}},takewhile:function(pred,seq){var self=MochiKit.Iter;seq=self.iter(seq);return{repr:function(){return"takewhile(...)"},toString:MochiKit.Base.forwardCall("repr"),next:function(){var rval=seq.next();if(!pred(rval)){this.next=function(){throw self.StopIteration;};this.next()}return rval}}},dropwhile:function(pred,seq){seq=MochiKit.Iter.iter(seq);var m=MochiKit.Base;var bind=m.bind;return{"repr":function(){return"dropwhile(...)"},"toString":m.forwardCall("repr"),"next":function(){while(true){var rval=seq.next();if(!pred(rval)){break}}this.next=bind("next",seq);return rval}}},_tee:function(_1a4,sync,_1a6){sync.pos[_1a4]=-1;var m=MochiKit.Base;var _1a8=m.listMin;return{repr:function(){return"tee("+_1a4+", ...)"},toString:m.forwardCall("repr"),next:function(){var rval;var i=sync.pos[_1a4];if(i==sync.max){rval=_1a6.next();sync.deque.push(rval);sync.max+=1;sync.pos[_1a4]+=1}else{rval=sync.deque[i-sync.min];sync.pos[_1a4]+=1;if(i==sync.min&&_1a8(sync.pos)!=sync.min){sync.min+=1;sync.deque.shift()}}return rval}}},tee:function(_1ab,n){var rval=[];var sync={"pos":[],"deque":[],"max":-1,"min":-1};if(arguments.length==1||typeof(n)=="undefined"||n===null){n=2}var self=MochiKit.Iter;_1ab=self.iter(_1ab);var _tee=self._tee;for(var i=0;i<n;i++){rval.push(_tee(i,sync,_1ab))}return rval},list:function(_1b2){var rval;if(_1b2 instanceof Array){return _1b2.slice()}if(typeof(_1b2)=="function"&&!(_1b2 instanceof Function)&&typeof(_1b2.length)=="number"){rval=[];for(var i=0;i<_1b2.length;i++){rval.push(_1b2[i])}return rval}var self=MochiKit.Iter;_1b2=self.iter(_1b2);var rval=[];var _1b6;try{while(true){_1b6=_1b2.next();rval.push(_1b6)}}catch(e){if(e!=self.StopIteration){throw e;}return rval}return undefined},reduce:function(fn,_1b8,_1b9){var i=0;var x=_1b9;var self=MochiKit.Iter;_1b8=self.iter(_1b8);if(arguments.length<3){try{x=_1b8.next()}catch(e){if(e==self.StopIteration){e=new TypeError("reduce() of empty sequence with no initial value")}throw e;}i++}try{while(true){x=fn(x,_1b8.next())}}catch(e){if(e!=self.StopIteration){throw e;}}return x},range:function(){var _1bd=0;var stop=0;var step=1;if(arguments.length==1){stop=arguments[0]}else{if(arguments.length==2){_1bd=arguments[0];stop=arguments[1]}else{if(arguments.length==3){_1bd=arguments[0];stop=arguments[1];step=arguments[2]}else{throw new TypeError("range() takes 1, 2, or 3 arguments!");}}}if(step===0){throw new TypeError("range() step must not be 0");}return{next:function(){if((step>0&&_1bd>=stop)||(step<0&&_1bd<=stop)){throw MochiKit.Iter.StopIteration;}var rval=_1bd;_1bd+=step;return rval},repr:function(){return"range("+[_1bd,stop,step].join(", ")+")"},toString:MochiKit.Base.forwardCall("repr")}},sum:function(_1c1,_1c2){if(typeof(_1c2)=="undefined"||_1c2===null){_1c2=0}var x=_1c2;var self=MochiKit.Iter;_1c1=self.iter(_1c1);try{while(true){x+=_1c1.next()}}catch(e){if(e!=self.StopIteration){throw e;}}return x},exhaust:function(_1c5){var self=MochiKit.Iter;_1c5=self.iter(_1c5);try{while(true){_1c5.next()}}catch(e){if(e!=self.StopIteration){throw e;}}},forEach:function(_1c7,func,obj){var m=MochiKit.Base;var self=MochiKit.Iter;if(arguments.length>2){func=m.bind(func,obj)}if(m.isArrayLike(_1c7)&&!self.isIterable(_1c7)){try{for(var i=0;i<_1c7.length;i++){func(_1c7[i])}}catch(e){if(e!=self.StopIteration){throw e;}}}else{self.exhaust(self.imap(func,_1c7))}},every:function(_1cd,func){var self=MochiKit.Iter;try{self.ifilterfalse(func,_1cd).next();return false}catch(e){if(e!=self.StopIteration){throw e;}return true}},sorted:function(_1d0,cmp){var rval=MochiKit.Iter.list(_1d0);if(arguments.length==1){cmp=MochiKit.Base.compare}rval.sort(cmp);return rval},reversed:function(_1d3){var rval=MochiKit.Iter.list(_1d3);rval.reverse();return rval},some:function(_1d5,func){var self=MochiKit.Iter;try{self.ifilter(func,_1d5).next();return true}catch(e){if(e!=self.StopIteration){throw e;}return false}},iextend:function(lst,_1d9){var m=MochiKit.Base;var self=MochiKit.Iter;if(m.isArrayLike(_1d9)&&!self.isIterable(_1d9)){for(var i=0;i<_1d9.length;i++){lst.push(_1d9[i])}}else{_1d9=self.iter(_1d9);try{while(true){lst.push(_1d9.next())}}catch(e){if(e!=self.StopIteration){throw e;}}}return lst},groupby:function(_1dd,_1de){var m=MochiKit.Base;var self=MochiKit.Iter;if(arguments.length<2){_1de=m.operator.identity}_1dd=self.iter(_1dd);var pk=undefined;var k=undefined;var v;function fetch(){v=_1dd.next();k=_1de(v)}function eat(){var ret=v;v=undefined;return ret}var _1e5=true;var _1e6=m.compare;return{repr:function(){return"groupby(...)"},next:function(){while(_1e6(k,pk)===0){fetch();if(_1e5){_1e5=false;break}}pk=k;return[k,{next:function(){if(v==undefined){fetch()}if(_1e6(k,pk)!==0){throw self.StopIteration;}return eat()}}]}}},groupby_as_array:function(_1e7,_1e8){var m=MochiKit.Base;var self=MochiKit.Iter;if(arguments.length<2){_1e8=m.operator.identity}_1e7=self.iter(_1e7);var _1eb=[];var _1ec=true;var _1ed;var _1ee=m.compare;while(true){try{var _1ef=_1e7.next();var key=_1e8(_1ef)}catch(e){if(e==self.StopIteration){break}throw e;}if(_1ec||_1ee(key,_1ed)!==0){var _1f1=[];_1eb.push([key,_1f1])}_1f1.push(_1ef);_1ec=false;_1ed=key}return _1eb},arrayLikeIter:function(_1f2){var i=0;return{repr:function(){return"arrayLikeIter(...)"},toString:MochiKit.Base.forwardCall("repr"),next:function(){if(i>=_1f2.length){throw MochiKit.Iter.StopIteration;}return _1f2[i++]}}},hasIterateNext:function(_1f4){return(_1f4&&typeof(_1f4.iterateNext)=="function")},iterateNextIter:function(_1f5){return{repr:function(){return"iterateNextIter(...)"},toString:MochiKit.Base.forwardCall("repr"),next:function(){var rval=_1f5.iterateNext();if(rval===null||rval===undefined){throw MochiKit.Iter.StopIteration;}return rval}}}});MochiKit.Iter.EXPORT_OK=["iteratorRegistry","arrayLikeIter","hasIterateNext","iterateNextIter"];MochiKit.Iter.EXPORT=["StopIteration","registerIteratorFactory","iter","count","cycle","repeat","next","izip","ifilter","ifilterfalse","islice","imap","applymap","chain","takewhile","dropwhile","tee","list","reduce","range","sum","exhaust","forEach","every","sorted","reversed","some","iextend","groupby","groupby_as_array"];MochiKit.Iter.__new__=function(){var m=MochiKit.Base;if(typeof(StopIteration)!="undefined"){this.StopIteration=StopIteration}else{this.StopIteration=new m.NamedError("StopIteration")}this.iteratorRegistry=new m.AdapterRegistry();this.registerIteratorFactory("arrayLike",m.isArrayLike,this.arrayLikeIter);this.registerIteratorFactory("iterateNext",this.hasIterateNext,this.iterateNextIter);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};m.nameFunctions(this)};MochiKit.Iter.__new__();if(MochiKit.__export__){reduce=MochiKit.Iter.reduce}MochiKit.Base._exportSymbols(this,MochiKit.Iter);MochiKit.Base._deps("Format",["Base"]);MochiKit.Format.NAME="MochiKit.Format";MochiKit.Format.VERSION="1.4.2";MochiKit.Format.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};MochiKit.Format.toString=function(){return this.__repr__()};MochiKit.Format._numberFormatter=function(_249,_24a,_24b,_24c,_24d,_24e,_24f,_250,_251){return function(num){num=parseFloat(num);if(typeof(num)=="undefined"||num===null||isNaN(num)){return _249}var _253=_24a;var _254=_24b;if(num<0){num=-num}else{_253=_253.replace(/-/,"")}var me=arguments.callee;var fmt=MochiKit.Format.formatLocale(_24c);if(_24d){num=num*100;_254=fmt.percent+_254}num=MochiKit.Format.roundToFixed(num,_24e);var _257=num.split(/\./);var _258=_257[0];var frac=(_257.length==1)?"":_257[1];var res="";while(_258.length<_24f){_258="0"+_258}if(_250){while(_258.length>_250){var i=_258.length-_250;res=fmt.separator+_258.substring(i,_258.length)+res;_258=_258.substring(0,i)}}res=_258+res;if(_24e>0){while(frac.length<_251){frac=frac+"0"}res=res+fmt.decimal+frac}return _253+res+_254}};MochiKit.Format.numberFormatter=function(_25c,_25d,_25e){if(typeof(_25d)=="undefined"){_25d=""}var _25f=_25c.match(/((?:[0#]+,)?[0#]+)(?:\.([0#]+))?(%)?/);if(!_25f){throw TypeError("Invalid pattern");}var _260=_25c.substr(0,_25f.index);var _261=_25c.substr(_25f.index+_25f[0].length);if(_260.search(/-/)==-1){_260=_260+"-"}var _262=_25f[1];var frac=(typeof(_25f[2])=="string"&&_25f[2]!="")?_25f[2]:"";var _264=(typeof(_25f[3])=="string"&&_25f[3]!="");var tmp=_262.split(/,/);var _266;if(typeof(_25e)=="undefined"){_25e="default"}if(tmp.length==1){_266=null}else{_266=tmp[1].length}var _267=_262.length-_262.replace(/0/g,"").length;var _268=frac.length-frac.replace(/0/g,"").length;var _269=frac.length;var rval=MochiKit.Format._numberFormatter(_25d,_260,_261,_25e,_264,_269,_267,_266,_268);var m=MochiKit.Base;if(m){var fn=arguments.callee;var args=m.concat(arguments);rval.repr=function(){return[self.NAME,"(",map(m.repr,args).join(", "),")"].join("")}}return rval};MochiKit.Format.formatLocale=function(_26e){if(typeof(_26e)=="undefined"||_26e===null){_26e="default"}if(typeof(_26e)=="string"){var rval=MochiKit.Format.LOCALE[_26e];if(typeof(rval)=="string"){rval=arguments.callee(rval);MochiKit.Format.LOCALE[_26e]=rval}return rval}else{return _26e}};MochiKit.Format.twoDigitAverage=function(_270,_271){if(_271){var res=_270/_271;if(!isNaN(res)){return MochiKit.Format.twoDigitFloat(res)}}return"0"};MochiKit.Format.twoDigitFloat=function(_273){var res=roundToFixed(_273,2);if(res.indexOf(".00")>0){return res.substring(0,res.length-3)}else{if(res.charAt(res.length-1)=="0"){return res.substring(0,res.length-1)}else{return res}}};MochiKit.Format.lstrip=function(str,_276){str=str+"";if(typeof(str)!="string"){return null}if(!_276){return str.replace(/^\s+/,"")}else{return str.replace(new RegExp("^["+_276+"]+"),"")}};MochiKit.Format.rstrip=function(str,_278){str=str+"";if(typeof(str)!="string"){return null}if(!_278){return str.replace(/\s+$/,"")}else{return str.replace(new RegExp("["+_278+"]+$"),"")}};MochiKit.Format.strip=function(str,_27a){var self=MochiKit.Format;return self.rstrip(self.lstrip(str,_27a),_27a)};MochiKit.Format.truncToFixed=function(_27c,_27d){var res=Math.floor(_27c).toFixed(0);if(_27c<0){res=Math.ceil(_27c).toFixed(0);if(res.charAt(0)!="-"&&_27d>0){res="-"+res}}if(res.indexOf("e")<0&&_27d>0){var tail=_27c.toString();if(tail.indexOf("e")>0){tail="."}else{if(tail.indexOf(".")<0){tail="."}else{tail=tail.substring(tail.indexOf("."))}}if(tail.length-1>_27d){tail=tail.substring(0,_27d+1)}while(tail.length-1<_27d){tail+="0"}res+=tail}return res};MochiKit.Format.roundToFixed=function(_280,_281){var _282=Math.abs(_280)+0.5*Math.pow(10,-_281);var res=MochiKit.Format.truncToFixed(_282,_281);if(_280<0){res="-"+res}return res};MochiKit.Format.percentFormat=function(_284){return MochiKit.Format.twoDigitFloat(100*_284)+"%"};MochiKit.Format.EXPORT=["truncToFixed","roundToFixed","numberFormatter","formatLocale","twoDigitAverage","twoDigitFloat","percentFormat","lstrip","rstrip","strip"];MochiKit.Format.LOCALE={en_US:{separator:",",decimal:".",percent:"%"},de_DE:{separator:".",decimal:",",percent:"%"},pt_BR:{separator:".",decimal:",",percent:"%"},fr_FR:{separator:" ",decimal:",",percent:"%"},"default":"en_US"};MochiKit.Format.EXPORT_OK=[];MochiKit.Format.EXPORT_TAGS={":all":MochiKit.Format.EXPORT,":common":MochiKit.Format.EXPORT};MochiKit.Format.__new__=function(){var base=this.NAME+".";var k,v,o;for(k in this.LOCALE){o=this.LOCALE[k];if(typeof(o)=="object"){o.repr=function(){return this.NAME};o.NAME=base+"LOCALE."+k}}for(k in this){o=this[k];if(typeof(o)=="function"&&typeof(o.NAME)=="undefined"){try{o.NAME=base+k}catch(e){}}}};MochiKit.Format.__new__();if(typeof(MochiKit.Base)!="undefined"){MochiKit.Base._exportSymbols(this,MochiKit.Format)}else{(function(_289,_28a){if((typeof(JSAN)=="undefined"&&typeof(dojo)=="undefined")||(MochiKit.__export__===false)){var all=_28a.EXPORT_TAGS[":all"];for(var i=0;i<all.length;i++){_289[all[i]]=_28a[all[i]]}}})(this,MochiKit.Format)}MochiKit.Base._deps("DOM",["Base"]);MochiKit.DOM.NAME="MochiKit.DOM";MochiKit.DOM.VERSION="1.4.2";MochiKit.DOM.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};MochiKit.DOM.toString=function(){return this.__repr__()};MochiKit.DOM.EXPORT=["removeEmptyTextNodes","formContents","currentWindow","currentDocument","withWindow","withDocument","registerDOMConverter","coerceToDOM","createDOM","createDOMFunc","isChildNode","getNodeAttribute","removeNodeAttribute","setNodeAttribute","updateNodeAttributes","appendChildNodes","insertSiblingNodesAfter","insertSiblingNodesBefore","replaceChildNodes","removeElement","swapDOM","BUTTON","TT","PRE","H1","H2","H3","H4","H5","H6","BR","CANVAS","HR","LABEL","TEXTAREA","FORM","STRONG","SELECT","OPTION","OPTGROUP","LEGEND","FIELDSET","P","UL","OL","LI","DL","DT","DD","TD","TR","THEAD","TBODY","TFOOT","TABLE","TH","INPUT","SPAN","A","DIV","IMG","getElement","$","getElementsByTagAndClassName","addToCallStack","addLoadEvent","focusOnLoad","setElementClass","toggleElementClass","addElementClass","removeElementClass","swapElementClass","hasElementClass","computedStyle","escapeHTML","toHTML","emitHTML","scrapeText","getFirstParentByTagAndClassName","getFirstElementByTagAndClassName"];MochiKit.DOM.EXPORT_OK=["domConverters"];MochiKit.DOM.DEPRECATED=[["computedStyle","MochiKit.Style.getStyle","1.4"],["elementDimensions","MochiKit.Style.getElementDimensions","1.4"],["elementPosition","MochiKit.Style.getElementPosition","1.4"],["getViewportDimensions","MochiKit.Style.getViewportDimensions","1.4"],["hideElement","MochiKit.Style.hideElement","1.4"],["makeClipping","MochiKit.Style.makeClipping","1.4.1"],["makePositioned","MochiKit.Style.makePositioned","1.4.1"],["setElementDimensions","MochiKit.Style.setElementDimensions","1.4"],["setElementPosition","MochiKit.Style.setElementPosition","1.4"],["setDisplayForElement","MochiKit.Style.setDisplayForElement","1.4"],["setOpacity","MochiKit.Style.setOpacity","1.4"],["showElement","MochiKit.Style.showElement","1.4"],["undoClipping","MochiKit.Style.undoClipping","1.4.1"],["undoPositioned","MochiKit.Style.undoPositioned","1.4.1"],["Coordinates","MochiKit.Style.Coordinates","1.4"],["Dimensions","MochiKit.Style.Dimensions","1.4"]];MochiKit.Base.update(MochiKit.DOM,{currentWindow:function(){return MochiKit.DOM._window},currentDocument:function(){return MochiKit.DOM._document},withWindow:function(win,func){var self=MochiKit.DOM;var _2f6=self._document;var _2f7=self._window;var rval;try{self._window=win;self._document=win.document;rval=func()}catch(e){self._window=_2f7;self._document=_2f6;throw e;}self._window=_2f7;self._document=_2f6;return rval},formContents:function(elem){var _2fa=[];var _2fb=[];var m=MochiKit.Base;var self=MochiKit.DOM;if(typeof(elem)=="undefined"||elem===null){elem=self._document.body}else{elem=self.getElement(elem)}m.nodeWalk(elem,function(elem){var name=elem.name;if(m.isNotEmpty(name)){var _300=elem.tagName.toUpperCase();if(_300==="INPUT"&&(elem.type=="radio"||elem.type=="checkbox")&&!elem.checked){return null}if(_300==="SELECT"){if(elem.type=="select-one"){if(elem.selectedIndex>=0){var opt=elem.options[elem.selectedIndex];var v=opt.value;if(!v){var h=opt.outerHTML;if(h&&!h.match(/^[^>]+\svalue\s*=/i)){v=opt.text}}_2fa.push(name);_2fb.push(v);return null}_2fa.push(name);_2fb.push("");return null}else{var opts=elem.options;if(!opts.length){_2fa.push(name);_2fb.push("");return null}for(var i=0;i<opts.length;i++){var opt=opts[i];if(!opt.selected){continue}var v=opt.value;if(!v){var h=opt.outerHTML;if(h&&!h.match(/^[^>]+\svalue\s*=/i)){v=opt.text}}_2fa.push(name);_2fb.push(v)}return null}}if(_300==="FORM"||_300==="P"||_300==="SPAN"||_300==="DIV"){return elem.childNodes}_2fa.push(name);_2fb.push(elem.value||"");return null}return elem.childNodes});return[_2fa,_2fb]},withDocument:function(doc,func){var self=MochiKit.DOM;var _309=self._document;var rval;try{self._document=doc;rval=func()}catch(e){self._document=_309;throw e;}self._document=_309;return rval},registerDOMConverter:function(name,_30c,wrap,_30e){MochiKit.DOM.domConverters.register(name,_30c,wrap,_30e)},coerceToDOM:function(node,ctx){var m=MochiKit.Base;var im=MochiKit.Iter;var self=MochiKit.DOM;if(im){var iter=im.iter;var _315=im.repeat}var map=m.map;var _317=self.domConverters;var _318=arguments.callee;var _319=m.NotFound;while(true){if(typeof(node)=="undefined"||node===null){return null}if(typeof(node)=="function"&&typeof(node.length)=="number"&&!(node instanceof Function)){node=im?im.list(node):m.extend(null,node)}if(typeof(node.nodeType)!="undefined"&&node.nodeType>0){return node}if(typeof(node)=="number"||typeof(node)=="boolean"){node=node.toString()}if(typeof(node)=="string"){return self._document.createTextNode(node)}if(typeof(node.__dom__)=="function"){node=node.__dom__(ctx);continue}if(typeof(node.dom)=="function"){node=node.dom(ctx);continue}if(typeof(node)=="function"){node=node.apply(ctx,[ctx]);continue}if(im){var _31a=null;try{_31a=iter(node)}catch(e){}if(_31a){return map(_318,_31a,_315(ctx))}}else{if(m.isArrayLike(node)){var func=function(n){return _318(n,ctx)};return map(func,node)}}try{node=_317.match(node,ctx);continue}catch(e){if(e!=_319){throw e;}}return self._document.createTextNode(node.toString())}return undefined},isChildNode:function(node,_31e){var self=MochiKit.DOM;if(typeof(node)=="string"){node=self.getElement(node)}if(typeof(_31e)=="string"){_31e=self.getElement(_31e)}if(typeof(node)=="undefined"||node===null){return false}while(node!=null&&node!==self._document){if(node===_31e){return true}node=node.parentNode}return false},setNodeAttribute:function(node,attr,_322){var o={};o[attr]=_322;try{return MochiKit.DOM.updateNodeAttributes(node,o)}catch(e){}return null},getNodeAttribute:function(node,attr){var self=MochiKit.DOM;var _327=self.attributeArray.renames[attr];var _328=self.attributeArray.ignoreAttr[attr];node=self.getElement(node);try{if(_327){return node[_327]}var _329=node.getAttribute(attr);if(_329!=_328){return _329}}catch(e){}return null},removeNodeAttribute:function(node,attr){var self=MochiKit.DOM;var _32d=self.attributeArray.renames[attr];node=self.getElement(node);try{if(_32d){return node[_32d]}return node.removeAttribute(attr)}catch(e){}return null},updateNodeAttributes:function(node,_32f){var elem=node;var self=MochiKit.DOM;if(typeof(node)=="string"){elem=self.getElement(node)}if(_32f){var _332=MochiKit.Base.updatetree;if(self.attributeArray.compliant){for(var k in _32f){var v=_32f[k];if(typeof(v)=="object"&&typeof(elem[k])=="object"){if(k=="style"&&MochiKit.Style){MochiKit.Style.setStyle(elem,v)}else{_332(elem[k],v)}}else{if(k.substring(0,2)=="on"){if(typeof(v)=="string"){v=new Function(v)}elem[k]=v}else{elem.setAttribute(k,v)}}if(typeof(elem[k])=="string"&&elem[k]!=v){elem[k]=v}}}else{var _335=self.attributeArray.renames;for(var k in _32f){v=_32f[k];var _336=_335[k];if(k=="style"&&typeof(v)=="string"){elem.style.cssText=v}else{if(typeof(_336)=="string"){elem[_336]=v}else{if(typeof(elem[k])=="object"&&typeof(v)=="object"){if(k=="style"&&MochiKit.Style){MochiKit.Style.setStyle(elem,v)}else{_332(elem[k],v)}}else{if(k.substring(0,2)=="on"){if(typeof(v)=="string"){v=new Function(v)}elem[k]=v}else{elem.setAttribute(k,v)}}}}if(typeof(elem[k])=="string"&&elem[k]!=v){elem[k]=v}}}}return elem},appendChildNodes:function(node){var elem=node;var self=MochiKit.DOM;if(typeof(node)=="string"){elem=self.getElement(node)}var _33a=[self.coerceToDOM(MochiKit.Base.extend(null,arguments,1),elem)];var _33b=MochiKit.Base.concat;while(_33a.length){var n=_33a.shift();if(typeof(n)=="undefined"||n===null){}else{if(typeof(n.nodeType)=="number"){elem.appendChild(n)}else{_33a=_33b(n,_33a)}}}return elem},insertSiblingNodesBefore:function(node){var elem=node;var self=MochiKit.DOM;if(typeof(node)=="string"){elem=self.getElement(node)}var _340=[self.coerceToDOM(MochiKit.Base.extend(null,arguments,1),elem)];var _341=elem.parentNode;var _342=MochiKit.Base.concat;while(_340.length){var n=_340.shift();if(typeof(n)=="undefined"||n===null){}else{if(typeof(n.nodeType)=="number"){_341.insertBefore(n,elem)}else{_340=_342(n,_340)}}}return _341},insertSiblingNodesAfter:function(node){var elem=node;var self=MochiKit.DOM;if(typeof(node)=="string"){elem=self.getElement(node)}var _347=[self.coerceToDOM(MochiKit.Base.extend(null,arguments,1),elem)];if(elem.nextSibling){return self.insertSiblingNodesBefore(elem.nextSibling,_347)}else{return self.appendChildNodes(elem.parentNode,_347)}},replaceChildNodes:function(node){var elem=node;var self=MochiKit.DOM;if(typeof(node)=="string"){elem=self.getElement(node);arguments[0]=elem}var _34b;while((_34b=elem.firstChild)){elem.removeChild(_34b)}if(arguments.length<2){return elem}else{return self.appendChildNodes.apply(this,arguments)}},createDOM:function(name,_34d){var elem;var self=MochiKit.DOM;var m=MochiKit.Base;if(typeof(_34d)=="string"||typeof(_34d)=="number"){var args=m.extend([name,null],arguments,1);return arguments.callee.apply(this,args)}if(typeof(name)=="string"){var _352=self._xhtml;if(_34d&&!self.attributeArray.compliant){var _353="";if("name"in _34d){_353+=" name=\""+self.escapeHTML(_34d.name)+"\""}if(name=="input"&&"type"in _34d){_353+=" type=\""+self.escapeHTML(_34d.type)+"\""}if(_353){name="<"+name+_353+">";_352=false}}var d=self._document;if(_352&&d===document){elem=d.createElementNS("http://www.w3.org/1999/xhtml",name)}else{elem=d.createElement(name)}}else{elem=name}if(_34d){self.updateNodeAttributes(elem,_34d)}if(arguments.length<=2){return elem}else{var args=m.extend([elem],arguments,2);return self.appendChildNodes.apply(this,args)}},createDOMFunc:function(){var m=MochiKit.Base;return m.partial.apply(this,m.extend([MochiKit.DOM.createDOM],arguments))},removeElement:function(elem){var self=MochiKit.DOM;var e=self.coerceToDOM(self.getElement(elem));e.parentNode.removeChild(e);return e},swapDOM:function(dest,src){var self=MochiKit.DOM;dest=self.getElement(dest);var _35c=dest.parentNode;if(src){src=self.coerceToDOM(self.getElement(src),_35c);_35c.replaceChild(src,dest)}else{_35c.removeChild(dest)}return src},getElement:function(id){var self=MochiKit.DOM;if(arguments.length==1){return((typeof(id)=="string")?self._document.getElementById(id):id)}else{return MochiKit.Base.map(self.getElement,arguments)}},getElementsByTagAndClassName:function(_35f,_360,_361){var self=MochiKit.DOM;if(typeof(_35f)=="undefined"||_35f===null){_35f="*"}if(typeof(_361)=="undefined"||_361===null){_361=self._document}_361=self.getElement(_361);if(_361==null){return[]}var _363=(_361.getElementsByTagName(_35f)||self._document.all);if(typeof(_360)=="undefined"||_360===null){return MochiKit.Base.extend(null,_363)}var _364=[];for(var i=0;i<_363.length;i++){var _366=_363[i];var cls=_366.className;if(typeof(cls)!="string"){cls=_366.getAttribute("class")}if(typeof(cls)=="string"){var _368=cls.split(" ");for(var j=0;j<_368.length;j++){if(_368[j]==_360){_364.push(_366);break}}}}return _364},_newCallStack:function(path,once){var rval=function(){var _36d=arguments.callee.callStack;for(var i=0;i<_36d.length;i++){if(_36d[i].apply(this,arguments)===false){break}}if(once){try{this[path]=null}catch(e){}}};rval.callStack=[];return rval},addToCallStack:function(_36f,path,func,once){var self=MochiKit.DOM;var _374=_36f[path];var _375=_374;if(!(typeof(_374)=="function"&&typeof(_374.callStack)=="object"&&_374.callStack!==null)){_375=self._newCallStack(path,once);if(typeof(_374)=="function"){_375.callStack.push(_374)}_36f[path]=_375}_375.callStack.push(func)},addLoadEvent:function(func){var self=MochiKit.DOM;self.addToCallStack(self._window,"onload",func,true)},focusOnLoad:function(_378){var self=MochiKit.DOM;self.addLoadEvent(function(){_378=self.getElement(_378);if(_378){_378.focus()}})},setElementClass:function(_37a,_37b){var self=MochiKit.DOM;var obj=self.getElement(_37a);if(self.attributeArray.compliant){obj.setAttribute("class",_37b)}else{obj.setAttribute("className",_37b)}},toggleElementClass:function(_37e){var self=MochiKit.DOM;for(var i=1;i<arguments.length;i++){var obj=self.getElement(arguments[i]);if(!self.addElementClass(obj,_37e)){self.removeElementClass(obj,_37e)}}},addElementClass:function(_382,_383){var self=MochiKit.DOM;var obj=self.getElement(_382);var cls=obj.className;if(typeof(cls)!="string"){cls=obj.getAttribute("class")}if(typeof(cls)!="string"||cls.length===0){self.setElementClass(obj,_383);return true}if(cls==_383){return false}var _387=cls.split(" ");for(var i=0;i<_387.length;i++){if(_387[i]==_383){return false}}self.setElementClass(obj,cls+" "+_383);return true},removeElementClass:function(_389,_38a){var self=MochiKit.DOM;var obj=self.getElement(_389);var cls=obj.className;if(typeof(cls)!="string"){cls=obj.getAttribute("class")}if(typeof(cls)!="string"||cls.length===0){return false}if(cls==_38a){self.setElementClass(obj,"");return true}var _38e=cls.split(" ");for(var i=0;i<_38e.length;i++){if(_38e[i]==_38a){_38e.splice(i,1);self.setElementClass(obj,_38e.join(" "));return true}}return false},swapElementClass:function(_390,_391,_392){var obj=MochiKit.DOM.getElement(_390);var res=MochiKit.DOM.removeElementClass(obj,_391);if(res){MochiKit.DOM.addElementClass(obj,_392)}return res},hasElementClass:function(_395,_396){var obj=MochiKit.DOM.getElement(_395);if(obj==null){return false}var cls=obj.className;if(typeof(cls)!="string"){cls=obj.getAttribute("class")}if(typeof(cls)!="string"){return false}var _399=cls.split(" ");for(var i=1;i<arguments.length;i++){var good=false;for(var j=0;j<_399.length;j++){if(_399[j]==arguments[i]){good=true;break}}if(!good){return false}}return true},escapeHTML:function(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},toHTML:function(dom){return MochiKit.DOM.emitHTML(dom).join("")},emitHTML:function(dom,lst){if(typeof(lst)=="undefined"||lst===null){lst=[]}var _3a1=[dom];var self=MochiKit.DOM;var _3a3=self.escapeHTML;var _3a4=self.attributeArray;while(_3a1.length){dom=_3a1.pop();if(typeof(dom)=="string"){lst.push(dom)}else{if(dom.nodeType==1){lst.push("<"+dom.tagName.toLowerCase());var _3a5=[];var _3a6=_3a4(dom);for(var i=0;i<_3a6.length;i++){var a=_3a6[i];_3a5.push([" ",a.name,"=\"",_3a3(a.value),"\""])}_3a5.sort();for(i=0;i<_3a5.length;i++){var _3a9=_3a5[i];for(var j=0;j<_3a9.length;j++){lst.push(_3a9[j])}}if(dom.hasChildNodes()){lst.push(">");_3a1.push("</"+dom.tagName.toLowerCase()+">");var _3ab=dom.childNodes;for(i=_3ab.length-1;i>=0;i--){_3a1.push(_3ab[i])}}else{lst.push("/>")}}else{if(dom.nodeType==3){lst.push(_3a3(dom.nodeValue))}}}}return lst},scrapeText:function(node,_3ad){var rval=[];(function(node){var cn=node.childNodes;if(cn){for(var i=0;i<cn.length;i++){arguments.callee.call(this,cn[i])}}var _3b2=node.nodeValue;if(typeof(_3b2)=="string"){rval.push(_3b2)}})(MochiKit.DOM.getElement(node));if(_3ad){return rval}else{return rval.join("")}},removeEmptyTextNodes:function(_3b3){_3b3=MochiKit.DOM.getElement(_3b3);for(var i=0;i<_3b3.childNodes.length;i++){var node=_3b3.childNodes[i];if(node.nodeType==3&&!/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}}},getFirstElementByTagAndClassName:function(_3b6,_3b7,_3b8){var self=MochiKit.DOM;if(typeof(_3b6)=="undefined"||_3b6===null){_3b6="*"}if(typeof(_3b8)=="undefined"||_3b8===null){_3b8=self._document}_3b8=self.getElement(_3b8);if(_3b8==null){return null}var _3ba=(_3b8.getElementsByTagName(_3b6)||self._document.all);if(_3ba.length<=0){return null}else{if(typeof(_3b7)=="undefined"||_3b7===null){return _3ba[0]}}for(var i=0;i<_3ba.length;i++){var _3bc=_3ba[i];var cls=_3bc.className;if(typeof(cls)!="string"){cls=_3bc.getAttribute("class")}if(typeof(cls)=="string"){var _3be=cls.split(" ");for(var j=0;j<_3be.length;j++){if(_3be[j]==_3b7){return _3bc}}}}return null},getFirstParentByTagAndClassName:function(elem,_3c1,_3c2){var self=MochiKit.DOM;elem=self.getElement(elem);if(typeof(_3c1)=="undefined"||_3c1===null){_3c1="*"}else{_3c1=_3c1.toUpperCase()}if(typeof(_3c2)=="undefined"||_3c2===null){_3c2=null}if(elem){elem=elem.parentNode}while(elem&&elem.tagName){var _3c4=elem.tagName.toUpperCase();if((_3c1==="*"||_3c1==_3c4)&&(_3c2===null||self.hasElementClass(elem,_3c2))){return elem}elem=elem.parentNode}return null},__new__:function(win){var m=MochiKit.Base;if(typeof(document)!="undefined"){this._document=document;var _3c7="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";this._xhtml=(document.documentElement&&document.createElementNS&&document.documentElement.namespaceURI===_3c7)}else{if(MochiKit.MockDOM){this._document=MochiKit.MockDOM.document}}this._window=win;this.domConverters=new m.AdapterRegistry();var _3c8=this._document.createElement("span");var _3c9;if(_3c8&&_3c8.attributes&&_3c8.attributes.length>0){var _3ca=m.filter;_3c9=function(node){return _3ca(_3c9.ignoreAttrFilter,node.attributes)};_3c9.ignoreAttr={};var _3cc=_3c8.attributes;var _3cd=_3c9.ignoreAttr;for(var i=0;i<_3cc.length;i++){var a=_3cc[i];_3cd[a.name]=a.value}_3c9.ignoreAttrFilter=function(a){return(_3c9.ignoreAttr[a.name]!=a.value)};_3c9.compliant=false;_3c9.renames={"class":"className","checked":"defaultChecked","usemap":"useMap","for":"htmlFor","readonly":"readOnly","colspan":"colSpan","bgcolor":"bgColor","cellspacing":"cellSpacing","cellpadding":"cellPadding"}}else{_3c9=function(node){return node.attributes};_3c9.compliant=true;_3c9.ignoreAttr={};_3c9.renames={}}this.attributeArray=_3c9;var _3d2=function(_3d3,arr){var _3d5=arr[0];var _3d6=arr[1];var _3d7=_3d6.split(".")[1];var str="";str+="if (!MochiKit."+_3d7+") { throw new Error(\"";str+="This function has been deprecated and depends on MochiKit.";str+=_3d7+".\");}";str+="return "+_3d6+".apply(this, arguments);";MochiKit[_3d3][_3d5]=new Function(str)};for(var i=0;i<MochiKit.DOM.DEPRECATED.length;i++){_3d2("DOM",MochiKit.DOM.DEPRECATED[i])}var _3d9=this.createDOMFunc;this.UL=_3d9("ul");this.OL=_3d9("ol");this.LI=_3d9("li");this.DL=_3d9("dl");this.DT=_3d9("dt");this.DD=_3d9("dd");this.TD=_3d9("td");this.TR=_3d9("tr");this.TBODY=_3d9("tbody");this.THEAD=_3d9("thead");this.TFOOT=_3d9("tfoot");this.TABLE=_3d9("table");this.TH=_3d9("th");this.INPUT=_3d9("input");this.SPAN=_3d9("span");this.A=_3d9("a");this.DIV=_3d9("div");this.IMG=_3d9("img");this.BUTTON=_3d9("button");this.TT=_3d9("tt");this.PRE=_3d9("pre");this.H1=_3d9("h1");this.H2=_3d9("h2");this.H3=_3d9("h3");this.H4=_3d9("h4");this.H5=_3d9("h5");this.H6=_3d9("h6");this.BR=_3d9("br");this.HR=_3d9("hr");this.LABEL=_3d9("label");this.TEXTAREA=_3d9("textarea");this.FORM=_3d9("form");this.P=_3d9("p");this.SELECT=_3d9("select");this.OPTION=_3d9("option");this.OPTGROUP=_3d9("optgroup");this.LEGEND=_3d9("legend");this.FIELDSET=_3d9("fieldset");this.STRONG=_3d9("strong");this.CANVAS=_3d9("canvas");this.$=this.getElement;this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};m.nameFunctions(this)}});MochiKit.DOM.__new__(((typeof(window)=="undefined")?this:window));if(MochiKit.__export__){withWindow=MochiKit.DOM.withWindow;withDocument=MochiKit.DOM.withDocument}MochiKit.Base._exportSymbols(this,MochiKit.DOM);MochiKit.Base._deps("Style",["Base","DOM"]);MochiKit.Style.NAME="MochiKit.Style";MochiKit.Style.VERSION="1.4.2";MochiKit.Style.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};MochiKit.Style.toString=function(){return this.__repr__()};MochiKit.Style.EXPORT_OK=[];MochiKit.Style.EXPORT=["setStyle","setOpacity","getStyle","getElementDimensions","elementDimensions","setElementDimensions","getElementPosition","elementPosition","setElementPosition","makePositioned","undoPositioned","makeClipping","undoClipping","setDisplayForElement","hideElement","showElement","getViewportDimensions","getViewportPosition","Dimensions","Coordinates"];MochiKit.Style.Dimensions=function(w,h){this.w=w;this.h=h};MochiKit.Style.Dimensions.prototype.__repr__=function(){var repr=MochiKit.Base.repr;return"{w: "+repr(this.w)+", h: "+repr(this.h)+"}"};MochiKit.Style.Dimensions.prototype.toString=function(){return this.__repr__()};MochiKit.Style.Coordinates=function(x,y){this.x=x;this.y=y};MochiKit.Style.Coordinates.prototype.__repr__=function(){var repr=MochiKit.Base.repr;return"{x: "+repr(this.x)+", y: "+repr(this.y)+"}"};MochiKit.Style.Coordinates.prototype.toString=function(){return this.__repr__()};MochiKit.Base.update(MochiKit.Style,{getStyle:function(elem,_421){var dom=MochiKit.DOM;var d=dom._document;elem=dom.getElement(elem);_421=MochiKit.Base.camelize(_421);if(!elem||elem==d){return undefined}if(_421=="opacity"&&typeof(elem.filters)!="undefined"){var _424=(MochiKit.Style.getStyle(elem,"filter")||"").match(/alpha\(opacity=(.*)\)/);if(_424&&_424[1]){return parseFloat(_424[1])/100}return 1}if(_421=="float"||_421=="cssFloat"||_421=="styleFloat"){if(elem.style["float"]){return elem.style["float"]}else{if(elem.style.cssFloat){return elem.style.cssFloat}else{if(elem.style.styleFloat){return elem.style.styleFloat}else{return"none"}}}}var _425=elem.style?elem.style[_421]:null;if(!_425){if(d.defaultView&&d.defaultView.getComputedStyle){var css=d.defaultView.getComputedStyle(elem,null);_421=_421.replace(/([A-Z])/g,"-$1").toLowerCase();_425=css?css.getPropertyValue(_421):null}else{if(elem.currentStyle){_425=elem.currentStyle[_421];if(/^\d/.test(_425)&&!/px$/.test(_425)&&_421!="fontWeight"){var left=elem.style.left;var _428=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;elem.style.left=_425||0;_425=elem.style.pixelLeft+"px";elem.style.left=left;elem.runtimeStyle.left=_428}}}}if(_421=="opacity"){_425=parseFloat(_425)}if(/Opera/.test(navigator.userAgent)&&(MochiKit.Base.findValue(["left","top","right","bottom"],_421)!=-1)){if(MochiKit.Style.getStyle(elem,"position")=="static"){_425="auto"}}return _425=="auto"?null:_425},setStyle:function(elem,_42a){elem=MochiKit.DOM.getElement(elem);for(var name in _42a){switch(name){case"opacity":MochiKit.Style.setOpacity(elem,_42a[name]);break;case"float":case"cssFloat":case"styleFloat":if(typeof(elem.style["float"])!="undefined"){elem.style["float"]=_42a[name]}else{if(typeof(elem.style.cssFloat)!="undefined"){elem.style.cssFloat=_42a[name]}else{elem.style.styleFloat=_42a[name]}}break;default:elem.style[MochiKit.Base.camelize(name)]=_42a[name]}}},setOpacity:function(elem,o){elem=MochiKit.DOM.getElement(elem);var self=MochiKit.Style;if(o==1){var _42f=/Gecko/.test(navigator.userAgent)&&!(/Konqueror|AppleWebKit|KHTML/.test(navigator.userAgent));elem.style["opacity"]=_42f?0.999999:1;if(/MSIE/.test(navigator.userAgent)){elem.style["filter"]=self.getStyle(elem,"filter").replace(/alpha\([^\)]*\)/gi,"")}}else{if(o<0.00001){o=0}elem.style["opacity"]=o;if(/MSIE/.test(navigator.userAgent)){elem.style["filter"]=self.getStyle(elem,"filter").replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+o*100+")"}}},getElementPosition:function(elem,_431){var self=MochiKit.Style;var dom=MochiKit.DOM;elem=dom.getElement(elem);if(!elem||(!(elem.x&&elem.y)&&(!elem.parentNode===null||self.getStyle(elem,"display")=="none"))){return undefined}var c=new self.Coordinates(0,0);var box=null;var _436=null;var d=MochiKit.DOM._document;var de=d.documentElement;var b=d.body;if(!elem.parentNode&&elem.x&&elem.y){c.x+=elem.x||0;c.y+=elem.y||0}else{if(elem.getBoundingClientRect){box=elem.getBoundingClientRect();c.x+=box.left+(de.scrollLeft||b.scrollLeft)-(de.clientLeft||0);c.y+=box.top+(de.scrollTop||b.scrollTop)-(de.clientTop||0)}else{if(elem.offsetParent){c.x+=elem.offsetLeft;c.y+=elem.offsetTop;_436=elem.offsetParent;if(_436!=elem){while(_436){c.x+=parseInt(_436.style.borderLeftWidth)||0;c.y+=parseInt(_436.style.borderTopWidth)||0;c.x+=_436.offsetLeft;c.y+=_436.offsetTop;_436=_436.offsetParent}}var ua=navigator.userAgent.toLowerCase();if((typeof(opera)!="undefined"&&parseFloat(opera.version())<9)||(ua.indexOf("AppleWebKit")!=-1&&self.getStyle(elem,"position")=="absolute")){c.x-=b.offsetLeft;c.y-=b.offsetTop}if(elem.parentNode){_436=elem.parentNode}else{_436=null}while(_436){var _43b=_436.tagName.toUpperCase();if(_43b==="BODY"||_43b==="HTML"){break}var disp=self.getStyle(_436,"display");if(disp.search(/^inline|table-row.*$/i)){c.x-=_436.scrollLeft;c.y-=_436.scrollTop}if(_436.parentNode){_436=_436.parentNode}else{_436=null}}}}}if(typeof(_431)!="undefined"){_431=arguments.callee(_431);if(_431){c.x-=(_431.x||0);c.y-=(_431.y||0)}}return c},setElementPosition:function(elem,_43e,_43f){elem=MochiKit.DOM.getElement(elem);if(typeof(_43f)=="undefined"){_43f="px"}var _440={};var _441=MochiKit.Base.isUndefinedOrNull;if(!_441(_43e.x)){_440["left"]=_43e.x+_43f}if(!_441(_43e.y)){_440["top"]=_43e.y+_43f}MochiKit.DOM.updateNodeAttributes(elem,{"style":_440})},makePositioned:function(_442){_442=MochiKit.DOM.getElement(_442);var pos=MochiKit.Style.getStyle(_442,"position");if(pos=="static"||!pos){_442.style.position="relative";if(/Opera/.test(navigator.userAgent)){_442.style.top=0;_442.style.left=0}}},undoPositioned:function(_444){_444=MochiKit.DOM.getElement(_444);if(_444.style.position=="relative"){_444.style.position=_444.style.top=_444.style.left=_444.style.bottom=_444.style.right=""}},makeClipping:function(_445){_445=MochiKit.DOM.getElement(_445);var s=_445.style;var _447={"overflow":s.overflow,"overflow-x":s.overflowX,"overflow-y":s.overflowY};if((MochiKit.Style.getStyle(_445,"overflow")||"visible")!="hidden"){_445.style.overflow="hidden";_445.style.overflowX="hidden";_445.style.overflowY="hidden"}return _447},undoClipping:function(_448,_449){_448=MochiKit.DOM.getElement(_448);if(typeof(_449)=="string"){_448.style.overflow=_449}else{if(_449!=null){_448.style.overflow=_449["overflow"];_448.style.overflowX=_449["overflow-x"];_448.style.overflowY=_449["overflow-y"]}}},getElementDimensions:function(elem,_44b){var self=MochiKit.Style;var dom=MochiKit.DOM;if(typeof(elem.w)=="number"||typeof(elem.h)=="number"){return new self.Dimensions(elem.w||0,elem.h||0)}elem=dom.getElement(elem);if(!elem){return undefined}var disp=self.getStyle(elem,"display");if(disp=="none"||disp==""||typeof(disp)=="undefined"){var s=elem.style;var _450=s.visibility;var _451=s.position;var _452=s.display;s.visibility="hidden";s.position="absolute";s.display=self._getDefaultDisplay(elem);var _453=elem.offsetWidth;var _454=elem.offsetHeight;s.display=_452;s.position=_451;s.visibility=_450}else{_453=elem.offsetWidth||0;_454=elem.offsetHeight||0}if(_44b){var _455="colSpan"in elem&&"rowSpan"in elem;var _456=(_455&&elem.parentNode&&self.getStyle(elem.parentNode,"borderCollapse")=="collapse");if(_456){if(/MSIE/.test(navigator.userAgent)){var _457=elem.previousSibling?0.5:1;var _458=elem.nextSibling?0.5:1}else{var _457=0.5;var _458=0.5}}else{var _457=1;var _458=1}_453-=Math.round((parseFloat(self.getStyle(elem,"paddingLeft"))||0)+(parseFloat(self.getStyle(elem,"paddingRight"))||0)+_457*(parseFloat(self.getStyle(elem,"borderLeftWidth"))||0)+_458*(parseFloat(self.getStyle(elem,"borderRightWidth"))||0));if(_455){if(/Gecko|Opera/.test(navigator.userAgent)&&!/Konqueror|AppleWebKit|KHTML/.test(navigator.userAgent)){var _459=0}else{if(/MSIE/.test(navigator.userAgent)){var _459=1}else{var _459=_456?0.5:1}}}else{var _459=1}_454-=Math.round((parseFloat(self.getStyle(elem,"paddingTop"))||0)+(parseFloat(self.getStyle(elem,"paddingBottom"))||0)+_459*((parseFloat(self.getStyle(elem,"borderTopWidth"))||0)+(parseFloat(self.getStyle(elem,"borderBottomWidth"))||0)))}return new self.Dimensions(_453,_454)},setElementDimensions:function(elem,_45b,_45c){elem=MochiKit.DOM.getElement(elem);if(typeof(_45c)=="undefined"){_45c="px"}var _45d={};var _45e=MochiKit.Base.isUndefinedOrNull;if(!_45e(_45b.w)){_45d["width"]=_45b.w+_45c}if(!_45e(_45b.h)){_45d["height"]=_45b.h+_45c}MochiKit.DOM.updateNodeAttributes(elem,{"style":_45d})},_getDefaultDisplay:function(elem){var self=MochiKit.Style;var dom=MochiKit.DOM;elem=dom.getElement(elem);if(!elem){return undefined}var _462=elem.tagName.toUpperCase();return self._defaultDisplay[_462]||"block"},setDisplayForElement:function(_463,_464){var _465=MochiKit.Base.extend(null,arguments,1);var _466=MochiKit.DOM.getElement;for(var i=0;i<_465.length;i++){_464=_466(_465[i]);if(_464){_464.style.display=_463}}},getViewportDimensions:function(){var d=new MochiKit.Style.Dimensions();var w=MochiKit.DOM._window;var b=MochiKit.DOM._document.body;if(w.innerWidth){d.w=w.innerWidth;d.h=w.innerHeight}else{if(b&&b.parentElement&&b.parentElement.clientWidth){d.w=b.parentElement.clientWidth;d.h=b.parentElement.clientHeight}else{if(b&&b.clientWidth){d.w=b.clientWidth;d.h=b.clientHeight}}}return d},getViewportPosition:function(){var c=new MochiKit.Style.Coordinates(0,0);var d=MochiKit.DOM._document;var de=d.documentElement;var db=d.body;if(de&&(de.scrollTop||de.scrollLeft)){c.x=de.scrollLeft;c.y=de.scrollTop}else{if(db){c.x=db.scrollLeft;c.y=db.scrollTop}}return c},__new__:function(){var m=MochiKit.Base;var _470=["A","ABBR","ACRONYM","B","BASEFONT","BDO","BIG","BR","CITE","CODE","DFN","EM","FONT","I","IMG","KBD","LABEL","Q","S","SAMP","SMALL","SPAN","STRIKE","STRONG","SUB","SUP","TEXTAREA","TT","U","VAR"];this._defaultDisplay={"TABLE":"table","THEAD":"table-header-group","TBODY":"table-row-group","TFOOT":"table-footer-group","COLGROUP":"table-column-group","COL":"table-column","TR":"table-row","TD":"table-cell","TH":"table-cell","CAPTION":"table-caption","LI":"list-item","INPUT":"inline-block","SELECT":"inline-block"};if(/MSIE/.test(navigator.userAgent)){for(var k in this._defaultDisplay){var v=this._defaultDisplay[k];if(v.indexOf("table")==0){this._defaultDisplay[k]="block"}}}for(var i=0;i<_470.length;i++){this._defaultDisplay[_470[i]]="inline"}this.elementPosition=this.getElementPosition;this.elementDimensions=this.getElementDimensions;this.hideElement=m.partial(this.setDisplayForElement,"none");this.showElement=m.partial(this.setDisplayForElement,"block");this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};m.nameFunctions(this)}});MochiKit.Style.__new__();MochiKit.Base._exportSymbols(this,MochiKit.Style);MochiKit.Base._deps("Color",["Base","DOM","Style"]);MochiKit.Color.NAME="MochiKit.Color";MochiKit.Color.VERSION="1.4.2";MochiKit.Color.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};MochiKit.Color.toString=function(){return this.__repr__()};MochiKit.Color.Color=function(red,_4ac,blue,_4ae){if(typeof(_4ae)=="undefined"||_4ae===null){_4ae=1}this.rgb={r:red,g:_4ac,b:blue,a:_4ae}};MochiKit.Color.Color.prototype={__class__:MochiKit.Color.Color,colorWithAlpha:function(_4af){var rgb=this.rgb;var m=MochiKit.Color;return m.Color.fromRGB(rgb.r,rgb.g,rgb.b,_4af)},colorWithHue:function(hue){var hsl=this.asHSL();hsl.h=hue;var m=MochiKit.Color;return m.Color.fromHSL(hsl)},colorWithSaturation:function(_4b5){var hsl=this.asHSL();hsl.s=_4b5;var m=MochiKit.Color;return m.Color.fromHSL(hsl)},colorWithLightness:function(_4b8){var hsl=this.asHSL();hsl.l=_4b8;var m=MochiKit.Color;return m.Color.fromHSL(hsl)},darkerColorWithLevel:function(_4bb){var hsl=this.asHSL();hsl.l=Math.max(hsl.l-_4bb,0);var m=MochiKit.Color;return m.Color.fromHSL(hsl)},lighterColorWithLevel:function(_4be){var hsl=this.asHSL();hsl.l=Math.min(hsl.l+_4be,1);var m=MochiKit.Color;return m.Color.fromHSL(hsl)},blendedColor:function(_4c1,_4c2){if(typeof(_4c2)=="undefined"||_4c2===null){_4c2=0.5}var sf=1-_4c2;var s=this.rgb;var d=_4c1.rgb;var df=_4c2;return MochiKit.Color.Color.fromRGB((s.r*sf)+(d.r*df),(s.g*sf)+(d.g*df),(s.b*sf)+(d.b*df),(s.a*sf)+(d.a*df))},compareRGB:function(_4c7){var a=this.asRGB();var b=_4c7.asRGB();return MochiKit.Base.compare([a.r,a.g,a.b,a.a],[b.r,b.g,b.b,b.a])},isLight:function(){return this.asHSL().b>0.5},isDark:function(){return(!this.isLight())},toHSLString:function(){var c=this.asHSL();var ccc=MochiKit.Color.clampColorComponent;var rval=this._hslString;if(!rval){var mid=(ccc(c.h,360).toFixed(0)+","+ccc(c.s,100).toPrecision(6)+"%"+","+ccc(c.l,100).toPrecision(4)+"%");var a=c.a;if(a>=1){a=1;rval="hsl("+mid+")"}else{if(a<=0){a=0}rval="hsla("+mid+","+a+")"}this._hslString=rval}return rval},toRGBString:function(){var c=this.rgb;var ccc=MochiKit.Color.clampColorComponent;var rval=this._rgbString;if(!rval){var mid=(ccc(c.r,255).toFixed(0)+","+ccc(c.g,255).toFixed(0)+","+ccc(c.b,255).toFixed(0));if(c.a!=1){rval="rgba("+mid+","+c.a+")"}else{rval="rgb("+mid+")"}this._rgbString=rval}return rval},asRGB:function(){return MochiKit.Base.clone(this.rgb)},toHexString:function(){var m=MochiKit.Color;var c=this.rgb;var ccc=MochiKit.Color.clampColorComponent;var rval=this._hexString;if(!rval){rval=("#"+m.toColorPart(ccc(c.r,255))+m.toColorPart(ccc(c.g,255))+m.toColorPart(ccc(c.b,255)));this._hexString=rval}return rval},asHSV:function(){var hsv=this.hsv;var c=this.rgb;if(typeof(hsv)=="undefined"||hsv===null){hsv=MochiKit.Color.rgbToHSV(this.rgb);this.hsv=hsv}return MochiKit.Base.clone(hsv)},asHSL:function(){var hsl=this.hsl;var c=this.rgb;if(typeof(hsl)=="undefined"||hsl===null){hsl=MochiKit.Color.rgbToHSL(this.rgb);this.hsl=hsl}return MochiKit.Base.clone(hsl)},toString:function(){return this.toRGBString()},repr:function(){var c=this.rgb;var col=[c.r,c.g,c.b,c.a];return this.__class__.NAME+"("+col.join(", ")+")"}};MochiKit.Base.update(MochiKit.Color.Color,{fromRGB:function(red,_4de,blue,_4e0){var _4e1=MochiKit.Color.Color;if(arguments.length==1){var rgb=red;red=rgb.r;_4de=rgb.g;blue=rgb.b;if(typeof(rgb.a)=="undefined"){_4e0=undefined}else{_4e0=rgb.a}}return new _4e1(red,_4de,blue,_4e0)},fromHSL:function(hue,_4e4,_4e5,_4e6){var m=MochiKit.Color;return m.Color.fromRGB(m.hslToRGB.apply(m,arguments))},fromHSV:function(hue,_4e9,_4ea,_4eb){var m=MochiKit.Color;return m.Color.fromRGB(m.hsvToRGB.apply(m,arguments))},fromName:function(name){var _4ee=MochiKit.Color.Color;if(name.charAt(0)=="\""){name=name.substr(1,name.length-2)}var _4ef=_4ee._namedColors[name.toLowerCase()];if(typeof(_4ef)=="string"){return _4ee.fromHexString(_4ef)}else{if(name=="transparent"){return _4ee.transparentColor()}}return null},fromString:function(_4f0){var self=MochiKit.Color.Color;var _4f2=_4f0.substr(0,3);if(_4f2=="rgb"){return self.fromRGBString(_4f0)}else{if(_4f2=="hsl"){return self.fromHSLString(_4f0)}else{if(_4f0.charAt(0)=="#"){return self.fromHexString(_4f0)}}}return self.fromName(_4f0)},fromHexString:function(_4f3){if(_4f3.charAt(0)=="#"){_4f3=_4f3.substring(1)}var _4f4=[];var i,hex;if(_4f3.length==3){for(i=0;i<3;i++){hex=_4f3.substr(i,1);_4f4.push(parseInt(hex+hex,16)/255)}}else{for(i=0;i<6;i+=2){hex=_4f3.substr(i,2);_4f4.push(parseInt(hex,16)/255)}}var _4f7=MochiKit.Color.Color;return _4f7.fromRGB.apply(_4f7,_4f4)},_fromColorString:function(pre,_4f9,_4fa,_4fb){if(_4fb.indexOf(pre)===0){_4fb=_4fb.substring(_4fb.indexOf("(",3)+1,_4fb.length-1)}var _4fc=_4fb.split(/\s*,\s*/);var _4fd=[];for(var i=0;i<_4fc.length;i++){var c=_4fc[i];var val;var _501=c.substring(c.length-3);if(c.charAt(c.length-1)=="%"){val=0.01*parseFloat(c.substring(0,c.length-1))}else{if(_501=="deg"){val=parseFloat(c)/360}else{if(_501=="rad"){val=parseFloat(c)/(Math.PI*2)}else{val=_4fa[i]*parseFloat(c)}}}_4fd.push(val)}return this[_4f9].apply(this,_4fd)},fromComputedStyle:function(elem,_503){var d=MochiKit.DOM;var cls=MochiKit.Color.Color;for(elem=d.getElement(elem);elem;elem=elem.parentNode){var _506=MochiKit.Style.getStyle.apply(d,arguments);if(!_506){continue}var _507=cls.fromString(_506);if(!_507){break}if(_507.asRGB().a>0){return _507}}return null},fromBackground:function(elem){var cls=MochiKit.Color.Color;return cls.fromComputedStyle(elem,"backgroundColor","background-color")||cls.whiteColor()},fromText:function(elem){var cls=MochiKit.Color.Color;return cls.fromComputedStyle(elem,"color","color")||cls.blackColor()},namedColors:function(){return MochiKit.Base.clone(MochiKit.Color.Color._namedColors)}});MochiKit.Base.update(MochiKit.Color,{clampColorComponent:function(v,_50d){v*=_50d;if(v<0){return 0}else{if(v>_50d){return _50d}else{return v}}},_hslValue:function(n1,n2,hue){if(hue>6){hue-=6}else{if(hue<0){hue+=6}}var val;if(hue<1){val=n1+(n2-n1)*hue}else{if(hue<3){val=n2}else{if(hue<4){val=n1+(n2-n1)*(4-hue)}else{val=n1}}}return val},hsvToRGB:function(hue,_513,_514,_515){if(arguments.length==1){var hsv=hue;hue=hsv.h;_513=hsv.s;_514=hsv.v;_515=hsv.a}var red;var _518;var blue;if(_513===0){red=_514;_518=_514;blue=_514}else{var i=Math.floor(hue*6);var f=(hue*6)-i;var p=_514*(1-_513);var q=_514*(1-(_513*f));var t=_514*(1-(_513*(1-f)));switch(i){case 1:red=q;_518=_514;blue=p;break;case 2:red=p;_518=_514;blue=t;break;case 3:red=p;_518=q;blue=_514;break;case 4:red=t;_518=p;blue=_514;break;case 5:red=_514;_518=p;blue=q;break;case 6:case 0:red=_514;_518=t;blue=p;break}}return{r:red,g:_518,b:blue,a:_515}},hslToRGB:function(hue,_520,_521,_522){if(arguments.length==1){var hsl=hue;hue=hsl.h;_520=hsl.s;_521=hsl.l;_522=hsl.a}var red;var _525;var blue;if(_520===0){red=_521;_525=_521;blue=_521}else{var m2;if(_521<=0.5){m2=_521*(1+_520)}else{m2=_521+_520-(_521*_520)}var m1=(2*_521)-m2;var f=MochiKit.Color._hslValue;var h6=hue*6;red=f(m1,m2,h6+2);_525=f(m1,m2,h6);blue=f(m1,m2,h6-2)}return{r:red,g:_525,b:blue,a:_522}},rgbToHSV:function(red,_52c,blue,_52e){if(arguments.length==1){var rgb=red;red=rgb.r;_52c=rgb.g;blue=rgb.b;_52e=rgb.a}var max=Math.max(Math.max(red,_52c),blue);var min=Math.min(Math.min(red,_52c),blue);var hue;var _533;var _534=max;if(min==max){hue=0;_533=0}else{var _535=(max-min);_533=_535/max;if(red==max){hue=(_52c-blue)/_535}else{if(_52c==max){hue=2+((blue-red)/_535)}else{hue=4+((red-_52c)/_535)}}hue/=6;if(hue<0){hue+=1}if(hue>1){hue-=1}}return{h:hue,s:_533,v:_534,a:_52e}},rgbToHSL:function(red,_537,blue,_539){if(arguments.length==1){var rgb=red;red=rgb.r;_537=rgb.g;blue=rgb.b;_539=rgb.a}var max=Math.max(red,Math.max(_537,blue));var min=Math.min(red,Math.min(_537,blue));var hue;var _53e;var _53f=(max+min)/2;var _540=max-min;if(_540===0){hue=0;_53e=0}else{if(_53f<=0.5){_53e=_540/(max+min)}else{_53e=_540/(2-max-min)}if(red==max){hue=(_537-blue)/_540}else{if(_537==max){hue=2+((blue-red)/_540)}else{hue=4+((red-_537)/_540)}}hue/=6;if(hue<0){hue+=1}if(hue>1){hue-=1}}return{h:hue,s:_53e,l:_53f,a:_539}},toColorPart:function(num){num=Math.round(num);var _542=num.toString(16);if(num<16){return"0"+_542}return _542},__new__:function(){var m=MochiKit.Base;this.Color.fromRGBString=m.bind(this.Color._fromColorString,this.Color,"rgb","fromRGB",[1/255,1/255,1/255,1]);this.Color.fromHSLString=m.bind(this.Color._fromColorString,this.Color,"hsl","fromHSL",[1/360,0.01,0.01,1]);var _544=1/3;var _545={black:[0,0,0],blue:[0,0,1],brown:[0.6,0.4,0.2],cyan:[0,1,1],darkGray:[_544,_544,_544],gray:[0.5,0.5,0.5],green:[0,1,0],lightGray:[2*_544,2*_544,2*_544],magenta:[1,0,1],orange:[1,0.5,0],purple:[0.5,0,0.5],red:[1,0,0],transparent:[0,0,0,0],white:[1,1,1],yellow:[1,1,0]};var _546=function(name,r,g,b,a){var rval=this.fromRGB(r,g,b,a);this[name]=function(){return rval};return rval};for(var k in _545){var name=k+"Color";var _54f=m.concat([_546,this.Color,name],_545[k]);this.Color[name]=m.bind.apply(null,_54f)}var _550=function(){for(var i=0;i<arguments.length;i++){if(!(arguments[i]instanceof MochiKit.Color.Color)){return false}}return true};var _552=function(a,b){return a.compareRGB(b)};m.nameFunctions(this);m.registerComparator(this.Color.NAME,_550,_552);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)}}});MochiKit.Color.EXPORT=["Color"];MochiKit.Color.EXPORT_OK=["clampColorComponent","rgbToHSL","hslToRGB","rgbToHSV","hsvToRGB","toColorPart"];MochiKit.Color.__new__();MochiKit.Base._exportSymbols(this,MochiKit.Color);MochiKit.Color.Color._namedColors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};if(typeof(MochiKit)=="undefined"){MochiKit={}}if(typeof(MochiKit.MochiKit)=="undefined"){MochiKit.MochiKit={}}MochiKit.MochiKit.NAME="MochiKit.MochiKit";MochiKit.MochiKit.VERSION="1.4.2";MochiKit.MochiKit.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};MochiKit.MochiKit.toString=function(){return this.__repr__()};MochiKit.MochiKit.SUBMODULES=["Base","Iter","Logging","DateTime","Format","Async","DOM","Selector","Style","LoggingPane","Color","Signal","Position","Visual","DragAndDrop","Sortable"];if(typeof(JSAN)!="undefined"||typeof(dojo)!="undefined"){if(typeof(dojo)!="undefined"){dojo.provide("MochiKit.MochiKit");(function(lst){for(var i=0;i<lst.length;i++){dojo.require("MochiKit."+lst[i])}})(MochiKit.MochiKit.SUBMODULES)}if(typeof(JSAN)!="undefined"){(function(lst){for(var i=0;i<lst.length;i++){JSAN.use("MochiKit."+lst[i],[])}})(MochiKit.MochiKit.SUBMODULES)}(function(){var _823=MochiKit.Base.extend;var self=MochiKit.MochiKit;var _825=self.SUBMODULES;var _826=[];var _827=[];var _828={};var i,k,m,all;for(i=0;i<_825.length;i++){m=MochiKit[_825[i]];_823(_826,m.EXPORT);_823(_827,m.EXPORT_OK);for(k in m.EXPORT_TAGS){_828[k]=_823(_828[k],m.EXPORT_TAGS[k])}all=m.EXPORT_TAGS[":all"];if(!all){all=_823(null,m.EXPORT,m.EXPORT_OK)}var j;for(j=0;j<all.length;j++){k=all[j];self[k]=m[k]}}self.EXPORT=_826;self.EXPORT_OK=_827;self.EXPORT_TAGS=_828}())}else{if(typeof(MochiKit.__compat__)=="undefined"){MochiKit.__compat__=true}(function(){if(typeof(document)=="undefined"){return}var _82e=document.getElementsByTagName("script");var _82f="http://www.w3.org/1999/xhtml";var _830="http://www.w3.org/2000/svg";var _831="http://www.w3.org/1999/xlink";var _832="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";var base=null;var _834=null;var _835={};var i;var src;for(i=0;i<_82e.length;i++){src=null;switch(_82e[i].namespaceURI){case _830:src=_82e[i].getAttributeNS(_831,"href");break;default:src=_82e[i].getAttribute("src");break}if(!src){continue}_835[src]=true;if(src.match(/MochiKit.js(\?.*)?$/)){base=src.substring(0,src.lastIndexOf("MochiKit.js"));_834=_82e[i]}}if(base===null){return}var _838=MochiKit.MochiKit.SUBMODULES;for(var i=0;i<_838.length;i++){if(MochiKit[_838[i]]){continue}var uri=base+_838[i]+".js";if(uri in _835){continue}if(_834.namespaceURI==_830||_834.namespaceURI==_832){var s=document.createElementNS(_834.namespaceURI,"script");s.setAttribute("id","MochiKit_"+base+_838[i]);if(_834.namespaceURI==_830){s.setAttributeNS(_831,"href",uri)}else{s.setAttribute("src",uri)}s.setAttribute("type","application/x-javascript");_834.parentNode.appendChild(s)}else{document.write("<"+_834.nodeName+" src=\""+uri+"\" type=\"text/javascript\"></script>")}}})()}

/////////////////////////////
//File: excanvas.js
/////////////////////////////
if(!window.CanvasRenderingContext2D){(function(){var m=Math;var mr=m.round;var ms=m.sin;var mc=m.cos;var _5={init:function(_6){var _7=_6||document;if(/MSIE/.test(navigator.userAgent)&&!window.opera){var _8=this;_7.attachEvent("onreadystatechange",function(){_8.init_(_7);});}},init_:function(_9,e){if(_9.readyState=="complete"){if(!_9.namespaces["g_vml_"]){_9.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml");}var ss=_9.createStyleSheet();ss.cssText="canvas{display:inline-block;overflow:hidden;"+"text-align:left;}"+"g_vml_\\:*{behavior:url(#default#VML)}";var _c=_9.getElementsByTagName("canvas");for(var i=0;i<_c.length;i++){if(!_c[i].getContext){this.initElement(_c[i]);}}}},fixElement_:function(el){var _f=el.outerHTML;var _10=document.createElement(_f);if(_f.slice(-2)!="/>"){var _11="/"+el.tagName;var ns;while((ns=el.nextSibling)&&ns.tagName!=_11){ns.removeNode();}if(ns){ns.removeNode();}}el.parentNode.replaceChild(_10,el);return _10;},initElement:function(el){el=this.fixElement_(el);el.getContext=function(){if(this.context_){return this.context_;}return this.context_=new CanvasRenderingContext2D_(this);};el.attachEvent("onresize",onResize);var _14=el.attributes;if(_14.width&&_14.width.specified){el.style.width=_14.width.nodeValue+"px";}if(_14.height&&_14.height.specified){el.style.height=_14.height.nodeValue+"px";}return el;}};function onPropertyChange(e){switch(e.propertyName){case "width":case "height":break;}};function onResize(e){var el=e.srcElement;if(el.firstChild){el.firstChild.style.width=el.clientWidth+"px";el.firstChild.style.height=el.clientHeight+"px";}};_5.init();var _18=[];for(var i=0;i<16;i++){for(var j=0;j<16;j++){_18[i*16+j]=i.toString(16)+j.toString(16);}}function createMatrixIdentity(){return [[1,0,0],[0,1,0],[0,0,1]];};function matrixMultiply(m1,m2){var _1d=createMatrixIdentity();for(var x=0;x<3;x++){for(var y=0;y<3;y++){var sum=0;for(var z=0;z<3;z++){sum+=m1[x][z]*m2[z][y];}_1d[x][y]=sum;}}return _1d;};function copyState(o1,o2){o2.fillStyle=o1.fillStyle;o2.lineCap=o1.lineCap;o2.lineJoin=o1.lineJoin;o2.lineWidth=o1.lineWidth;o2.miterLimit=o1.miterLimit;o2.shadowBlur=o1.shadowBlur;o2.shadowColor=o1.shadowColor;o2.shadowOffsetX=o1.shadowOffsetX;o2.shadowOffsetY=o1.shadowOffsetY;o2.strokeStyle=o1.strokeStyle;};function processStyle(_24){var str,_26=1;_24=String(_24);if(_24.substring(0,3)=="rgb"){var _27=_24.indexOf("(",3);var end=_24.indexOf(")",_27+1);var _29=_24.substring(_27+1,end).split(",");str="#";for(var i=0;i<3;i++){str+=_18[parseInt(_29[i])];}if((_29.length==4)&&(_24.substr(3,1)=="a")){_26=_29[3];}}else{str=_24;}return [str,_26];};function processLineCap(_2b){switch(_2b){case "butt":return "flat";case "round":return "round";case "square":default:return "square";}};function CanvasRenderingContext2D_(_2c){this.m_=createMatrixIdentity();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#ccc";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=10;this.globalAlpha=1;var el=document.createElement("div");el.style.width=_2c.clientWidth+"px";el.style.height=_2c.clientHeight+"px";el.style.overflow="hidden";el.style.position="absolute";_2c.appendChild(el);this.element_=el;this.arcScaleX_=1;this.arcScaleY_=1;};var _2e=CanvasRenderingContext2D_.prototype;_2e.clearRect=function(){this.element_.innerHTML="";this.currentPath_=[];};_2e.beginPath=function(){this.currentPath_=[];};_2e.moveTo=function(aX,aY){this.currentPath_.push({type:"moveTo",x:aX,y:aY});};_2e.lineTo=function(aX,aY){this.currentPath_.push({type:"lineTo",x:aX,y:aY});};_2e.bezierCurveTo=function(_33,_34,_35,_36,aX,aY){this.currentPath_.push({type:"bezierCurveTo",cp1x:_33,cp1y:_34,cp2x:_35,cp2y:_36,x:aX,y:aY});};_2e.quadraticCurveTo=function(_39,_3a,aX,aY){this.bezierCurveTo(_39,_3a,_39,_3a,aX,aY);};_2e.arc=function(aX,aY,_3f,_40,_41,_42){_3f*=10;var _43=_42?"at":"wa";var _44=aX+(mc(_40)*_3f)-5;var _45=aY+(ms(_40)*_3f)-5;var _46=aX+(mc(_41)*_3f)-5;var _47=aY+(ms(_41)*_3f)-5;this.currentPath_.push({type:_43,x:aX,y:aY,radius:_3f,xStart:_44,yStart:_45,xEnd:_46,yEnd:_47});};_2e.rect=function(aX,aY,_4a,_4b){this.moveTo(aX,aY);this.lineTo(aX+_4a,aY);this.lineTo(aX+_4a,aY+_4b);this.lineTo(aX,aY+_4b);this.closePath();};_2e.strokeRect=function(aX,aY,_4e,_4f){this.beginPath();this.moveTo(aX,aY);this.lineTo(aX+_4e,aY);this.lineTo(aX+_4e,aY+_4f);this.lineTo(aX,aY+_4f);this.closePath();this.stroke();};_2e.fillRect=function(aX,aY,_52,_53){this.beginPath();this.moveTo(aX,aY);this.lineTo(aX+_52,aY);this.lineTo(aX+_52,aY+_53);this.lineTo(aX,aY+_53);this.closePath();this.fill();};_2e.createLinearGradient=function(aX0,aY0,aX1,aY1){var _58=new CanvasGradient_("gradient");return _58;};_2e.createRadialGradient=function(aX0,aY0,aR0,aX1,aY1,aR1){var _5f=new CanvasGradient_("gradientradial");_5f.radius1_=aR0;_5f.radius2_=aR1;_5f.focus_.x=aX0;_5f.focus_.y=aY0;return _5f;};_2e.drawImage=function(_60,_61){var dx,dy,dw,dh,sx,sy,sw,sh;var w=_60.width;var h=_60.height;if(arguments.length==3){dx=arguments[1];dy=arguments[2];sx=sy=0;sw=dw=w;sh=dh=h;}else{if(arguments.length==5){dx=arguments[1];dy=arguments[2];dw=arguments[3];dh=arguments[4];sx=sy=0;sw=w;sh=h;}else{if(arguments.length==9){sx=arguments[1];sy=arguments[2];sw=arguments[3];sh=arguments[4];dx=arguments[5];dy=arguments[6];dw=arguments[7];dh=arguments[8];}else{throw "Invalid number of arguments";}}}var d=this.getCoords_(dx,dy);var w2=(sw/2);var h2=(sh/2);var _6f=[];_6f.push(" <g_vml_:group"," coordsize=\"1000,1000\""," coordorigin=\"0, 0\""," style=\"width:100px;height:100px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var _70=[];_70.push("M11='",this.m_[0][0],"',","M12='",this.m_[1][0],"',","M21='",this.m_[0][1],"',","M22='",this.m_[1][1],"',","Dx='",d.x,"',","Dy='",d.y,"'");var max=d;var c2=this.getCoords_(dx+dw,dy);var c3=this.getCoords_(dx,dy+dh);var c4=this.getCoords_(dx+dw,dy+dh);max.x=Math.max(max.x,c2.x,c3.x,c4.x);max.y=Math.max(max.y,c2.y,c3.y,c4.y);_6f.push(" padding:0 ",mr(max.x),"px ",mr(max.y),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",_70.join(""),", sizingmethod='clip');");}else{_6f.push(" top:",d.y,"px;left:",d.x,"px;");}_6f.push(" \">","<g_vml_:image src=\"",_60.src,"\""," style=\"width:",dw,";"," height:",dh,";\""," cropleft=\"",sx/w,"\""," croptop=\"",sy/h,"\""," cropright=\"",(w-sx-sw)/w,"\""," cropbottom=\"",(h-sy-sh)/h,"\""," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",_6f.join(""));};_2e.stroke=function(_75){var _76=[];var _77=false;var a=processStyle(_75?this.fillStyle:this.strokeStyle);var _79=a[0];var _7a=a[1]*this.globalAlpha;_76.push("<g_vml_:shape"," fillcolor=\"",_79,"\""," filled=\"",Boolean(_75),"\""," style=\"position:absolute;width:10;height:10;\""," coordorigin=\"0 0\" coordsize=\"100 100\""," stroked=\"",!_75,"\""," strokeweight=\"",this.lineWidth,"\""," strokecolor=\"",_79,"\""," path=\"");var _7b=false;var min={x:null,y:null};var max={x:null,y:null};for(var i=0;i<this.currentPath_.length;i++){var p=this.currentPath_[i];if(p.type=="moveTo"){_76.push(" m ");var c=this.getCoords_(p.x,p.y);_76.push(mr(c.x),",",mr(c.y));}else{if(p.type=="lineTo"){_76.push(" l ");var c=this.getCoords_(p.x,p.y);_76.push(mr(c.x),",",mr(c.y));}else{if(p.type=="close"){_76.push(" x ");}else{if(p.type=="bezierCurveTo"){_76.push(" c ");var c=this.getCoords_(p.x,p.y);var c1=this.getCoords_(p.cp1x,p.cp1y);var c2=this.getCoords_(p.cp2x,p.cp2y);_76.push(mr(c1.x),",",mr(c1.y),",",mr(c2.x),",",mr(c2.y),",",mr(c.x),",",mr(c.y));}else{if(p.type=="at"||p.type=="wa"){_76.push(" ",p.type," ");var c=this.getCoords_(p.x,p.y);var _83=this.getCoords_(p.xStart,p.yStart);var _84=this.getCoords_(p.xEnd,p.yEnd);_76.push(mr(c.x-this.arcScaleX_*p.radius),",",mr(c.y-this.arcScaleY_*p.radius)," ",mr(c.x+this.arcScaleX_*p.radius),",",mr(c.y+this.arcScaleY_*p.radius)," ",mr(_83.x),",",mr(_83.y)," ",mr(_84.x),",",mr(_84.y));}}}}}if(c){if(min.x==null||c.x<min.x){min.x=c.x;}if(max.x==null||c.x>max.x){max.x=c.x;}if(min.y==null||c.y<min.y){min.y=c.y;}if(max.y==null||c.y>max.y){max.y=c.y;}}}_76.push(" \">");if(typeof this.fillStyle=="object"){var _85={x:"50%",y:"50%"};var _86=(max.x-min.x);var _87=(max.y-min.y);var _88=(_86>_87)?_86:_87;_85.x=mr((this.fillStyle.focus_.x/_86)*100+50)+"%";_85.y=mr((this.fillStyle.focus_.y/_87)*100+50)+"%";var _89=[];if(this.fillStyle.type_=="gradientradial"){var _8a=(this.fillStyle.radius1_/_88*100);var _8b=(this.fillStyle.radius2_/_88*100)-_8a;}else{var _8a=0;var _8b=100;}var _8c={offset:null,color:null};var _8d={offset:null,color:null};this.fillStyle.colors_.sort(function(cs1,cs2){return cs1.offset-cs2.offset;});for(var i=0;i<this.fillStyle.colors_.length;i++){var fs=this.fillStyle.colors_[i];_89.push((fs.offset*_8b)+_8a,"% ",fs.color,",");if(fs.offset>_8c.offset||_8c.offset==null){_8c.offset=fs.offset;_8c.color=fs.color;}if(fs.offset<_8d.offset||_8d.offset==null){_8d.offset=fs.offset;_8d.color=fs.color;}}_89.pop();_76.push("<g_vml_:fill"," color=\"",_8d.color,"\""," color2=\"",_8c.color,"\""," type=\"",this.fillStyle.type_,"\""," focusposition=\"",_85.x,", ",_85.y,"\""," colors=\"",_89.join(""),"\""," opacity=\"",_7a,"\" />");}else{if(_75){_76.push("<g_vml_:fill color=\"",_79,"\" opacity=\"",_7a,"\" />");}else{_76.push("<g_vml_:stroke"," opacity=\"",_7a,"\""," joinstyle=\"",this.lineJoin,"\""," miterlimit=\"",this.miterLimit,"\""," endcap=\"",processLineCap(this.lineCap),"\""," weight=\"",this.lineWidth,"px\""," color=\"",_79,"\" />");}}_76.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",_76.join(""));this.currentPath_=[];};_2e.fill=function(){this.stroke(true);};_2e.closePath=function(){this.currentPath_.push({type:"close"});};_2e.getCoords_=function(aX,aY){return {x:10*(aX*this.m_[0][0]+aY*this.m_[1][0]+this.m_[2][0])-5,y:10*(aX*this.m_[0][1]+aY*this.m_[1][1]+this.m_[2][1])-5};};_2e.save=function(){var o={};copyState(this,o);this.aStack_.push(o);this.mStack_.push(this.m_);this.m_=matrixMultiply(createMatrixIdentity(),this.m_);};_2e.restore=function(){copyState(this.aStack_.pop(),this);this.m_=this.mStack_.pop();};_2e.translate=function(aX,aY){var m1=[[1,0,0],[0,1,0],[aX,aY,1]];this.m_=matrixMultiply(m1,this.m_);};_2e.rotate=function(_97){var c=mc(_97);var s=ms(_97);var m1=[[c,s,0],[-s,c,0],[0,0,1]];this.m_=matrixMultiply(m1,this.m_);};_2e.scale=function(aX,aY){this.arcScaleX_*=aX;this.arcScaleY_*=aY;var m1=[[aX,0,0],[0,aY,0],[0,0,1]];this.m_=matrixMultiply(m1,this.m_);};_2e.clip=function(){};_2e.arcTo=function(){};_2e.createPattern=function(){return new CanvasPattern_;};function CanvasGradient_(_9e){this.type_=_9e;this.radius1_=0;this.radius2_=0;this.colors_=[];this.focus_={x:0,y:0};};CanvasGradient_.prototype.addColorStop=function(_9f,_a0){_a0=processStyle(_a0);this.colors_.push({offset:1-_9f,color:_a0});};function CanvasPattern_(){};G_vmlCanvasManager=_5;CanvasRenderingContext2D=CanvasRenderingContext2D_;CanvasGradient=CanvasGradient_;CanvasPattern=CanvasPattern_;})();}

/////////////////////////////
//File: PlotKit.js
//File: Base.js
//File: Layout.js
//File: Canvas.js
//File: EasyPlot.js
//File: SweetCanvas.js
//Copyright 2005,2006 (c) Alastair Tse <alastair^liquidx.net>
//For use under the BSD license. <http://www.liquidx.net/plotkit>
/////////////////////////////
if(typeof (PlotKit)=="undefined"){PlotKit={};}if(typeof (PlotKit.PlotKit)=="undefined"){PlotKit.PlotKit={};}PlotKit.PlotKit.NAME="PlotKit.PlotKit";PlotKit.PlotKit.VERSION="0.9.1";PlotKit.PlotKit.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.PlotKit.toString=function(){return this.__repr__();};PlotKit.PlotKit.SUBMODULES=["Base","Layout","Canvas","SVG","SweetCanvas","SweetSVG","EasyPlot"];if(typeof (JSAN)!="undefined"||typeof (dojo)!="undefined"){if(typeof (dojo)!="undefined"){dojo.provide("PlotKit.PlotKit");dojo.require("PlotKit.*");}if(typeof (JSAN)!="undefined"){JSAN.use("PlotKit.Base",[]);JSAN.use("PlotKit.Layout",[]);JSAN.use("PlotKit.Canvas",[]);JSAN.use("PlotKit.SweetCanvas",[]);JSAN.use("PlotKit.SVG",[]);JSAN.use("PlotKit.SweetSVG",[]);}(function(){var _1=MochiKit.Base.extend;var _2=PlotKit.PlotKit;var _3=_2.SUBMODULES;var _4=[];var _5=[];var _6={};var i,k,m,_a;for(i=0;i<_3.length;i++){m=PlotKit[_3[i]];_1(_4,m.EXPORT);_1(_5,m.EXPORT_OK);for(k in m.EXPORT_TAGS){_6[k]=_1(_6[k],m.EXPORT_TAGS[k]);}_a=m.EXPORT_TAGS[":all"];if(!_a){_a=_1(null,m.EXPORT,m.EXPORT_OK);}var j;for(j=0;j<_a.length;j++){k=_a[j];_2[k]=m[k];}}_2.EXPORT=_4;_2.EXPORT_OK=_5;_2.EXPORT_TAGS=_6;}());}else{if(typeof (PlotKit.__compat__)=="undefined"){PlotKit.__compat__=true;}(function(){if(typeof (document)=="undefined"){return;}var _c=document.getElementsByTagName("script");var _d="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";var _e=null;var _f=null;var _10={};var i;for(i=0;i<_c.length;i++){var src=_c[i].getAttribute("src");if(!src){continue;}_10[src]=true;if(src.match(/PlotKit.js$/)){_e=src.substring(0,src.lastIndexOf("PlotKit.js"));_f=_c[i];}}if(_e===null){return;}var _13=PlotKit.PlotKit.SUBMODULES;for(var i=0;i<_13.length;i++){if(PlotKit[_13[i]]){continue;}var uri=_e+_13[i]+".js";if(uri in _10){continue;}if(document.documentElement&&document.documentElement.namespaceURI==_d){var s=document.createElementNS(_d,"script");s.setAttribute("id","PlotKit_"+_e+_13[i]);s.setAttribute("src",uri);s.setAttribute("type","application/x-javascript");_f.parentNode.appendChild(s);}else{document.write("<script src=\""+uri+"\" type=\"text/javascript\"></script>");}}})();}try{if(typeof (MochiKit.Base)=="undefined"||typeof (MochiKit.DOM)=="undefined"||typeof (MochiKit.Color)=="undefined"||typeof (MochiKit.Format)=="undefined"){throw "";}}catch(e){throw "PlotKit depends on MochiKit.{Base,Color,DOM,Format}";}MochiKit.Base.update(MochiKit.Color.Color.prototype,{asFillColor:function(){return this.lighterColorWithLevel(0.3);},asStrokeColor:function(){return this.darkerColorWithLevel(0.1);},asPointColor:function(){return this.lighterColorWithLevel(0.1);}});if(typeof (PlotKit)=="undefined"){PlotKit={};}PlotKit.NAME="PlotKit";PlotKit.VERSION="0.8";PlotKit.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.toString=function(){return this.__repr__();};if(typeof (PlotKit.Base)=="undefined"){PlotKit.Base={};}PlotKit.Base.NAME="PlotKit.Base";PlotKit.Base.VERSION=PlotKit.VERSION;PlotKit.Base.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.Base.toString=function(){return this.__repr__();};PlotKit.Base.usingPrototype=function(){try{return (typeof (Object.extend)=="function");}catch(e){return false;}};MochiKit.Base.update(PlotKit.Base,{roundInterval:function(_1,_2,_3){var _4=MochiKit.Format.roundToFixed;var _5=_1/_2;return parseFloat(_4(_5,_3));},collapse:function(_6){var m=MochiKit.Base;var _8=new Array();for(var i=0;i<_6.length;i++){_8=m.concat(_8,_6[i]);}if(PlotKit.Base.usingPrototype()){delete _8.extend;delete _8.from;delete _8.inspect;}return _8;},uniq:function(_a){var m=MochiKit.Base;if(!m.isArrayLike(_a)||(_a.length<1)){return new Array();}var _c=new Array();var _d=_a[0];_c.push(_a[0]);for(var i=1;i<_a.length;i++){if(m.compare(_a[i],_d)!=0){_d=_a[i];_c.push(_a[i]);}}return _c;},colorScheme:function(){var mb=MochiKit.Base;var mc=MochiKit.Color;var _11=["red","orange","yellow","green","cyan","blue","purple","magenta"];var _12=function(_13){return mc.Color[_13+"Color"]();};return mb.map(_12,_11);},baseDarkPrimaryColors:function(){var _14=MochiKit.Color.Color.fromHexString;return [_14("#ad3f40"),_14("#ddac2c"),_14("#dfdd0c"),_14("#5276c4"),_14("#739c5a")];},basePrimaryColors:function(){var _15=MochiKit.Color.Color.fromHexString;return [_15("#d24c4d"),_15("#f2b32f"),_15("#ece90e"),_15("#5d83da"),_15("#78a15d")];},baseBlueColors:function(){var _16=MochiKit.Color.Color.fromHexString;return [_16("#4b6b94"),_16("#5d81b4"),_16("#acbad2")];},palette:function(_17,_18,_19,_1a){var _1b=MochiKit.Base.isUndefinedOrNull;var _1c=new Array();if(_1b(_1a)){_1a=0.1;}if(_1b(_19)){_19=0.4;}if(_1b(_18)){_18=-0.2;}var _1d=_18;while(_1d<=_19){_1c.push(_1d);_1d+=_1a;}var _1e=function(_1f,_20){return _1f.lighterColorWithLevel(_20);};return MochiKit.Base.map(partial(_1e,_17),_1c);},excanvasSupported:function(){if(/MSIE/.test(navigator.userAgent)&&!window.opera){return true;}return false;},findPosX:function(obj){var _22=0;if(obj.offsetParent){while(obj.offsetParent){_22+=obj.offsetLeft;obj=obj.offsetParent;}}else{if(obj.x){_22+=obj.x;}}return _22;},findPosY:function(obj){var _24=0;if(obj.offsetParent){while(obj.offsetParent){_24+=obj.offsetTop;obj=obj.offsetParent;}}else{if(obj.y){_24+=obj.y;}}return _24;},isFuncLike:function(obj){return (typeof (obj)=="function");}});PlotKit.Base.map=function(fn,lst){if(PlotKit.Base.usingPrototype()){var _28=[];for(var x in lst){if(typeof (lst[x])=="function"){continue;}_28.push(fn(lst[x]));}return _28;}else{return MochiKit.Base.map(fn,lst);}};PlotKit.Base.items=function(lst){if(PlotKit.Base.usingPrototype()){var _2b=[];for(var x in lst){if(typeof (lst[x])=="function"){continue;}_2b.push([x,lst[x]]);}return _2b;}else{return MochiKit.Base.items(lst);}};PlotKit.Base.keys=function(lst){if(PlotKit.Base.usingPrototype()){var _2e=[];for(var x in lst){if(typeof (lst[x])=="function"){continue;}_2e.push(x);}return _2e;}else{return MochiKit.Base.keys(lst);}};PlotKit.Base.baseColors=function(){var _30=MochiKit.Color.Color.fromHexString;return [_30("#476fb2"),_30("#be2c2b"),_30("#85b730"),_30("#734a99"),_30("#26a1c5"),_30("#fb8707"),_30("#000000")];};PlotKit.Base.officeBaseStyle={"axisLineWidth":2,"axisLabelColor":Color.grayColor(),"axisLineColor":Color.whiteColor(),"padding":{top:5,bottom:10,left:30,right:30}};MochiKit.Base.update(PlotKit.Base,{officeBlue:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[0]),"backgroundColor":PlotKit.Base.baseColors()[0].lighterColorWithLevel(0.45)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officeRed:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[1]),"backgroundColor":PlotKit.Base.baseColors()[1].lighterColorWithLevel(0.5)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officeGreen:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[2]),"backgroundColor":PlotKit.Base.baseColors()[2].lighterColorWithLevel(0.5)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officePurple:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[3]),"backgroundColor":PlotKit.Base.baseColors()[3].lighterColorWithLevel(0.5)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officeCyan:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[4]),"backgroundColor":PlotKit.Base.baseColors()[4].lighterColorWithLevel(0.5)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officeOrange:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[5]),"backgroundColor":PlotKit.Base.baseColors()[5].lighterColorWithLevel(0.4)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;},officeBlack:function(){var r={"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[6],0,0.6),"backgroundColor":PlotKit.Base.baseColors()[6].lighterColorWithLevel(0.9)};MochiKit.Base.update(r,PlotKit.Base.officeBaseStyle);return r;}});PlotKit.Base.EXPORT=["baseColors","collapse","colorScheme","findPosX","findPosY","officeBaseStyle","officeBlue","officeRed","officeGreen","officePurple","officeCyan","officeOrange","officeBlack","roundInterval","uniq","isFuncLike","excanvasSupported"];PlotKit.Base.EXPORT_OK=[];PlotKit.Base.__new__=function(){var m=MochiKit.Base;m.nameFunctions(this);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};};PlotKit.Base.__new__();MochiKit.Base._exportSymbols(this,PlotKit.Base);try{if(typeof (PlotKit.Base)=="undefined"){throw "";}}catch(e){throw "PlotKit.Layout depends on MochiKit.{Base,Color,DOM,Format} and PlotKit.Base";}if(typeof (PlotKit.Layout)=="undefined"){PlotKit.Layout={};}PlotKit.Layout.NAME="PlotKit.Layout";PlotKit.Layout.VERSION=PlotKit.VERSION;PlotKit.Layout.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.Layout.toString=function(){return this.__repr__();};PlotKit.Layout.valid_styles=["bar","line","pie","point"];PlotKit.Layout=function(_1,_2){this.options={"barWidthFillFraction":0.75,"barOrientation":"vertical","xOriginIsZero":true,"yOriginIsZero":true,"xAxis":null,"yAxis":null,"xTicks":null,"yTicks":null,"xNumberOfTicks":10,"yNumberOfTicks":4,"xTickPrecision":1,"yTickPrecision":2,"pieRadius":0.4};this.style=_1;MochiKit.Base.update(this.options,_2?_2:{});if(!MochiKit.Base.isUndefinedOrNull(this.options.xAxis)){this.minxval=this.options.xAxis[0];this.maxxval=this.options.xAxis[1];this.xscale=this.maxxval-this.minxval;}else{this.minxval=0;this.maxxval=null;this.xscale=null;}if(!MochiKit.Base.isUndefinedOrNull(this.options.yAxis)){this.minyval=this.options.yAxis[0];this.maxyval=this.options.yAxis[1];this.yscale=this.maxyval-this.minyval;}else{this.minyval=0;this.maxyval=null;this.yscale=null;}this.bars=new Array();this.points=new Array();this.slices=new Array();this.xticks=new Array();this.yticks=new Array();this.datasets=new Array();this.minxdelta=0;this.xrange=1;this.yrange=1;this.hitTestCache={x2maxy:null};};PlotKit.Layout.prototype.addDataset=function(_3,_4){this.datasets[_3]=_4;};PlotKit.Layout.prototype.removeDataset=function(_5,_6){delete this.datasets[_5];};PlotKit.Layout.prototype.addDatasetFromTable=function(_7,_8,_9,_a,_b){var _c=MochiKit.Base.isUndefinedOrNull;var _d=MochiKit.DOM.scrapeText;var _e=MochiKit.Format.strip;if(_c(_9)){_9=0;}if(_c(_a)){_a=1;}if(_c(_b)){_b=-1;}var _f=_8.tBodies[0].rows;var _10=new Array();var _11=new Array();if(!_c(_f)){for(var i=0;i<_f.length;i++){_10.push([parseFloat(_e(_d(_f[i].cells[_9]))),parseFloat(_e(_d(_f[i].cells[_a])))]);if(_b>=0){_11.push({v:parseFloat(_e(_d(_f[i].cells[_9]))),label:_e(_d(_f[i].cells[_b]))});}}this.addDataset(_7,_10);if(_b>=0){this.options.xTicks=_11;}return true;}return false;};PlotKit.Layout.prototype.evaluate=function(){this._evaluateLimits();this._evaluateScales();if(this.style=="bar"){if(this.options.barOrientation=="horizontal"){this._evaluateHorizBarCharts();}else{this._evaluateBarCharts();}this._evaluateBarTicks();}else{if(this.style=="line"){this._evaluateLineCharts();this._evaluateLineTicks();}else{if(this.style=="pie"){this._evaluatePieCharts();this._evaluatePieTicks();}}}};PlotKit.Layout.prototype.hitTest=function(x,y){var f=MochiKit.Format.twoDigitFloat;if((this.style=="bar")&&this.bars&&(this.bars.length>0)){for(var i=0;i<this.bars.length;i++){var bar=this.bars[i];if((x>=bar.x)&&(x<=bar.x+bar.w)&&(y>=bar.y)&&(y-bar.y<=bar.h)){return bar;}}}else{if(this.style=="line"){if(this.hitTestCache.x2maxy==null){this._regenerateHitTestCache();}var _18=x/this.xscale;var _19=this.hitTestCache.xvalues;var _1a=null;var _1b=null;for(var i=1;i<_19.length;i++){if(_19[i]>_18){_1a=_19[i-1];_1b=_19[i];break;}}if((_1a!=null)){var _1c=this.hitTestCache.x2maxy[_1a];var _1d=this.hitTestCache.x2maxy[_1b];var _1e=(1-y)/this.yscale;var _1f=(_1d-_1c)/(_1b-_1a);var _20=_1c+_1f*(_18-_1a);if(_20>=_1e){var obj={xval:_18,yval:_1e,xafter:_1b,yafter:_1d,xbefore:_1a,ybefore:_1c,yprojected:_20};return obj;}}}else{if(this.style=="pie"){var _22=Math.sqrt((y-0.5)*(y-0.5)+(x-0.5)*(x-0.5));if(_22>this.options.pieRadius){return null;}var _23=Math.atan2(y-0.5,x-0.5)-Math.PI/2;for(var i=0;i<this.slices.length;i++){var _24=this.slices[i];if(_24.startAngle<_23&&_24.endAngle>=_23){return _24;}}}}}return null;};PlotKit.Layout.prototype.rectForX=function(x){return null;};PlotKit.Layout.prototype.angleRangeForX=function(x){return null;};PlotKit.Layout.prototype._evaluateLimits=function(){var map=PlotKit.Base.map;var _28=PlotKit.Base.items;var _29=MochiKit.Base.itemgetter;var _2a=PlotKit.Base.collapse;var _2b=MochiKit.Base.listMin;var _2c=MochiKit.Base.listMax;var _2d=MochiKit.Base.isUndefinedOrNull;var all=_2a(map(_29(1),_28(this.datasets)));if(_2d(this.options.xAxis)){if(this.options.xOriginIsZero){this.minxval=0;}else{this.minxval=_2b(map(parseFloat,map(_29(0),all)));}this.maxxval=_2c(map(parseFloat,map(_29(0),all)));}else{this.minxval=this.options.xAxis[0];this.maxxval=this.options.xAxis[1];this.xscale=this.maxval-this.minxval;}if(_2d(this.options.yAxis)){if(this.options.yOriginIsZero){this.minyval=0;}else{this.minyval=_2b(map(parseFloat,map(_29(1),all)));}this.maxyval=_2c(map(parseFloat,map(_29(1),all)));}else{this.minyval=this.options.yAxis[0];this.maxyval=this.options.yAxis[1];this.yscale=this.maxyval-this.minyval;}};PlotKit.Layout.prototype._evaluateScales=function(){var _2f=MochiKit.Base.isUndefinedOrNull;this.xrange=this.maxxval-this.minxval;if(this.xrange==0){this.xscale=1;}else{this.xscale=1/this.xrange;}this.yrange=this.maxyval-this.minyval;if(this.yrange==0){this.yscale=1;}else{this.yscale=1/this.yrange;}};PlotKit.Layout.prototype._uniqueXValues=function(){var _30=PlotKit.Base.collapse;var map=PlotKit.Base.map;var _32=PlotKit.Base.uniq;var _33=MochiKit.Base.itemgetter;var _34=PlotKit.Base.items;var _35=map(parseFloat,map(_33(0),_30(map(_33(1),_34(this.datasets)))));_35.sort(MochiKit.Base.compare);return _32(_35);};PlotKit.Layout.prototype._evaluateBarCharts=function(){var _36=PlotKit.Base.items;var _37=_36(this.datasets).length;var _38=10000000;var _39=this._uniqueXValues();for(var i=1;i<_39.length;i++){_38=Math.min(Math.abs(_39[i]-_39[i-1]),_38);}var _3b=0;var _3c=0;var _3d=0;if(_39.length==1){_38=1;this.xscale=1;this.minxval=_39[0];_3b=1*this.options.barWidthFillFraction;_3c=_3b/_37;_3d=(1-this.options.barWidthFillFraction)/2;}else{if(this.xrange==1){this.xscale=0.5;}else{if(this.xrange==2){this.xscale=1/3;}else{this.xscale=(1-_38/this.xrange)/this.xrange;}}_3b=_38*this.xscale*this.options.barWidthFillFraction;_3c=_3b/_37;_3d=_38*this.xscale*(1-this.options.barWidthFillFraction)/2;}this.minxdelta=_38;this.bars=new Array();var i=0;for(var _3e in this.datasets){var _3f=this.datasets[_3e];if(PlotKit.Base.isFuncLike(_3f)){continue;}for(var j=0;j<_3f.length;j++){var _41=_3f[j];var _42={x:((parseFloat(_41[0])-this.minxval)*this.xscale)+(i*_3c)+_3d,y:1-((parseFloat(_41[1])-this.minyval)*this.yscale),w:_3c,h:((parseFloat(_41[1])-this.minyval)*this.yscale),xval:parseFloat(_41[0]),yval:parseFloat(_41[1]),name:_3e};if((_42.x>=0)&&(_42.x<=1)&&(_42.y>=0)&&(_42.y<=1)){this.bars.push(_42);}}i++;}};PlotKit.Layout.prototype._evaluateHorizBarCharts=function(){var _43=PlotKit.Base.items;var _44=_43(this.datasets).length;var _45=10000000;var _46=this._uniqueXValues();for(var i=1;i<_46.length;i++){_45=Math.min(Math.abs(_46[i]-_46[i-1]),_45);}var _48=0;var _49=0;var _4a=0;if(_46.length==1){_45=1;this.xscale=1;this.minxval=_46[0];_48=1*this.options.barWidthFillFraction;_49=_48/_44;_4a=(1-this.options.barWidthFillFraction)/2;}else{this.xscale=(1-_45/this.xrange)/this.xrange;_48=_45*this.xscale*this.options.barWidthFillFraction;_49=_48/_44;_4a=_45*this.xscale*(1-this.options.barWidthFillFraction)/2;}this.minxdelta=_45;this.bars=new Array();var i=0;for(var _4b in this.datasets){var _4c=this.datasets[_4b];if(PlotKit.Base.isFuncLike(_4c)){continue;}for(var j=0;j<_4c.length;j++){var _4e=_4c[j];var _4f={y:((parseFloat(_4e[0])-this.minxval)*this.xscale)+(i*_49)+_4a,x:0,h:_49,w:((parseFloat(_4e[1])-this.minyval)*this.yscale),xval:parseFloat(_4e[0]),yval:parseFloat(_4e[1]),name:_4b};if(_4f.y<=0){_4f.y=0;}if(_4f.y>=1){_4f.y=1;}if((_4f.x>=0)&&(_4f.x<=1)){this.bars.push(_4f);}}i++;}};PlotKit.Layout.prototype._evaluateLineCharts=function(){var _50=PlotKit.Base.items;var _51=_50(this.datasets).length;this.points=new Array();var i=0;for(var _53 in this.datasets){var _54=this.datasets[_53];if(PlotKit.Base.isFuncLike(_54)){continue;}_54.sort(function(a,b){return compare(parseFloat(a[0]),parseFloat(b[0]));});for(var j=0;j<_54.length;j++){var _58=_54[j];var _59={x:((parseFloat(_58[0])-this.minxval)*this.xscale),y:1-((parseFloat(_58[1])-this.minyval)*this.yscale),xval:parseFloat(_58[0]),yval:parseFloat(_58[1]),name:_53};if(_59.y<=0){_59.y=0;}if(_59.y>=1){_59.y=1;}if((_59.x>=0)&&(_59.x<=1)){this.points.push(_59);}}i++;}};PlotKit.Layout.prototype._evaluatePieCharts=function(){var _5a=PlotKit.Base.items;var sum=MochiKit.Iter.sum;var _5c=MochiKit.Base.itemgetter;var _5d=_5a(this.datasets).length;var _5e=_5a(this.datasets)[0][1];var _5f=sum(map(_5c(1),_5e));this.slices=new Array();var _60=0;for(var i=0;i<_5e.length;i++){var _62=_5e[i][1]/_5f;var _63=_60*Math.PI*2;var _64=(_60+_62)*Math.PI*2;var _65={fraction:_62,xval:_5e[i][0],yval:_5e[i][1],startAngle:_63,endAngle:_64};if(_5e[i][1]!=0){this.slices.push(_65);}_60+=_62;}};PlotKit.Layout.prototype._evaluateLineTicksForXAxis=function(){var _66=MochiKit.Base.isUndefinedOrNull;if(this.options.xTicks){this.xticks=new Array();var _67=function(_68){var _69=_68.label;if(_66(_69)){_69=_68.v.toString();}var pos=this.xscale*(_68.v-this.minxval);if((pos>=0)&&(pos<=1)){this.xticks.push([pos,_69]);}};MochiKit.Iter.forEach(this.options.xTicks,bind(_67,this));}else{if(this.options.xNumberOfTicks){var _6b=this._uniqueXValues();var _6c=this.xrange/this.options.xNumberOfTicks;var _6d=0;this.xticks=new Array();for(var i=0;i<=_6b.length;i++){if((_6b[i]-this.minxval)>=(_6d*_6c)){var pos=this.xscale*(_6b[i]-this.minxval);if((pos>1)||(pos<0)){continue;}this.xticks.push([pos,_6b[i]]);_6d++;}if(_6d>this.options.xNumberOfTicks){break;}}}}};PlotKit.Layout.prototype._evaluateLineTicksForYAxis=function(){var _70=MochiKit.Base.isUndefinedOrNull;if(this.options.yTicks){this.yticks=new Array();var _71=function(_72){var _73=_72.label;if(_70(_73)){_73=_72.v.toString();}var pos=1-(this.yscale*(_72.v-this.minyval));if((pos>=0)&&(pos<=1)){this.yticks.push([pos,_73]);}};MochiKit.Iter.forEach(this.options.yTicks,bind(_71,this));}else{if(this.options.yNumberOfTicks){this.yticks=new Array();var _75=PlotKit.Base.roundInterval;var _76=this.options.yTickPrecision;var _77=_75(this.yrange,this.options.yNumberOfTicks,_76);for(var i=0;i<=this.options.yNumberOfTicks;i++){var _79=this.minyval+(i*_77);var pos=1-((_79-this.minyval)*this.yscale);if((pos>1)||(pos<0)){continue;}this.yticks.push([pos,MochiKit.Format.roundToFixed(_79,_76)]);}}}};PlotKit.Layout.prototype._evaluateLineTicks=function(){this._evaluateLineTicksForXAxis();this._evaluateLineTicksForYAxis();};PlotKit.Layout.prototype._evaluateBarTicks=function(){this._evaluateLineTicks();var _7b=function(_7c){return [_7c[0]+(this.minxdelta*this.xscale)/2,_7c[1]];};this.xticks=MochiKit.Base.map(bind(_7b,this),this.xticks);if(this.options.barOrientation=="horizontal"){var _7d=this.xticks;this.xticks=this.yticks;this.yticks=_7d;var _7e=function(_7f){return [1-_7f[0],_7f[1]];};this.xticks=MochiKit.Base.map(_7e,this.xticks);}};PlotKit.Layout.prototype._evaluatePieTicks=function(){var _80=MochiKit.Base.isUndefinedOrNull;var _81=MochiKit.Format.numberFormatter("#%");this.xticks=new Array();if(this.options.xTicks){var _82=new Array();for(var i=0;i<this.slices.length;i++){_82[this.slices[i].xval]=this.slices[i];}for(var i=0;i<this.options.xTicks.length;i++){var _84=this.options.xTicks[i];var _85=_82[_84.v];var _86=_84.label;if(_85){if(_80(_86)){_86=_84.v.toString();}_86+=" ("+_81(_85.fraction)+")";this.xticks.push([_84.v,_86]);}}}else{for(var i=0;i<this.slices.length;i++){var _85=this.slices[i];var _86=_85.xval+" ("+_81(_85.fraction)+")";this.xticks.push([_85.xval,_86]);}}};PlotKit.Layout.prototype._regenerateHitTestCache=function(){this.hitTestCache.xvalues=this._uniqueXValues();this.hitTestCache.xlookup=new Array();this.hitTestCache.x2maxy=new Array();var _87=MochiKit.Base.listMax;var _88=MochiKit.Base.itemgetter;var map=MochiKit.Base.map;var _8a=keys(this.datasets);for(var i=0;i<_8a.length;i++){var _8c=this.datasets[_8a[i]];for(var j=0;j<_8c.length;j++){var _8e=_8c[j][0];var _8f=_8c[j][1];if(this.hitTestCache.xlookup[_8e]){this.hitTestCache.xlookup[_8e].push([_8f,_8a[i]]);}else{this.hitTestCache.xlookup[_8e]=[[_8f,_8a[i]]];}}}for(var x in this.hitTestCache.xlookup){var _91=this.hitTestCache.xlookup[x];this.hitTestCache.x2maxy[x]=_87(map(_88(0),_91));}};PlotKit.LayoutModule={};PlotKit.LayoutModule.Layout=PlotKit.Layout;PlotKit.LayoutModule.EXPORT=["Layout"];PlotKit.LayoutModule.EXPORT_OK=[];PlotKit.LayoutModule.__new__=function(){var m=MochiKit.Base;m.nameFunctions(this);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};};PlotKit.LayoutModule.__new__();MochiKit.Base._exportSymbols(this,PlotKit.LayoutModule);try{if((typeof (PlotKit.Base)=="undefined")||(typeof (PlotKit.Layout)=="undefined")){throw "";}}catch(e){throw "PlotKit.Layout depends on MochiKit.{Base,Color,DOM,Format} and PlotKit.{Base,Layout}";}if(typeof (PlotKit.CanvasRenderer)=="undefined"){PlotKit.CanvasRenderer={};}PlotKit.CanvasRenderer.NAME="PlotKit.CanvasRenderer";PlotKit.CanvasRenderer.VERSION=PlotKit.VERSION;PlotKit.CanvasRenderer.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.CanvasRenderer.toString=function(){return this.__repr__();};PlotKit.CanvasRenderer=function(_1,_2,_3){if(arguments.length>0){this.__init__(_1,_2,_3);}};PlotKit.CanvasRenderer.prototype.__init__=function(_4,_5,_6){var _7=MochiKit.Base.isUndefinedOrNull;var _8=MochiKit.Color.Color;this.options={"drawBackground":true,"backgroundColor":_8.whiteColor(),"padding":{left:30,right:30,top:5,bottom:10},"colorScheme":PlotKit.Base.palette(PlotKit.Base.baseColors()[0]),"strokeColor":_8.whiteColor(),"strokeColorTransform":"asStrokeColor","strokeWidth":0.5,"shouldFill":true,"shouldStroke":true,"drawXAxis":true,"drawYAxis":true,"axisLineColor":_8.blackColor(),"axisLineWidth":0.5,"axisTickSize":3,"axisLabelColor":_8.blackColor(),"axisLabelFont":"Arial","axisLabelFontSize":9,"axisLabelWidth":50,"pieRadius":0.4,"enableEvents":true};MochiKit.Base.update(this.options,_6?_6:{});this.layout=_5;this.element=MochiKit.DOM.getElement(_4);this.container=this.element.parentNode;this.isIE=PlotKit.Base.excanvasSupported();if(this.isIE&&!_7(G_vmlCanvasManager)){this.IEDelay=0.5;this.maxTries=5;this.renderDelay=null;this.clearDelay=null;this.element=G_vmlCanvasManager.initElement(this.element);}this.height=this.element.height;this.width=this.element.width;if(_7(this.element)){throw "CanvasRenderer() - passed canvas is not found";}if(!this.isIE&&!(PlotKit.CanvasRenderer.isSupported(this.element))){throw "CanvasRenderer() - Canvas is not supported.";}if(_7(this.container)||(this.container.nodeName.toLowerCase()!="div")){throw "CanvasRenderer() - <canvas> needs to be enclosed in <div>";}this.xlabels=new Array();this.ylabels=new Array();this.isFirstRender=true;this.area={x:this.options.padding.left,y:this.options.padding.top,w:this.width-this.options.padding.left-this.options.padding.right,h:this.height-this.options.padding.top-this.options.padding.bottom};MochiKit.DOM.updateNodeAttributes(this.container,{"style":{"position":"relative","width":this.width+"px"}});};PlotKit.CanvasRenderer.prototype.render=function(){if(this.isIE){try{if(this.renderDelay){this.renderDelay.cancel();this.renderDelay=null;}var _9=this.element.getContext("2d");}catch(e){this.isFirstRender=false;if(this.maxTries-->0){this.renderDelay=MochiKit.Async.wait(this.IEDelay);this.renderDelay.addCallback(bind(this.render,this));}return;}}if(this.options.drawBackground){this._renderBackground();}if(this.layout.style=="bar"){this._renderBarChart();this._renderBarAxis();}else{if(this.layout.style=="pie"){this._renderPieChart();this._renderPieAxis();}else{if(this.layout.style=="line"){this._renderLineChart();this._renderLineAxis();}}}};PlotKit.CanvasRenderer.prototype._renderBarChartWrap=function(_a,_b){var _c=this.element.getContext("2d");var _d=this.options.colorScheme.length;var _e=this.options.colorScheme;var _f=MochiKit.Base.keys(this.layout.datasets);var _10=_f.length;for(var i=0;i<_10;i++){var _12=_f[i];var _13=_e[i%_d];_c.save();_c.fillStyle=_13.toRGBString();if(this.options.strokeColor){_c.strokeStyle=this.options.strokeColor.toRGBString();}else{if(this.options.strokeColorTransform){_c.strokeStyle=_13[this.options.strokeColorTransform]().toRGBString();}}_c.lineWidth=this.options.strokeWidth;var _14=function(obj){if(obj.name==_12){_b(_c,obj);}};MochiKit.Iter.forEach(_a,bind(_14,this));_c.restore();}};PlotKit.CanvasRenderer.prototype._renderBarChart=function(){var _16=MochiKit.Base.bind;var _17=function(_18,bar){var x=this.area.w*bar.x+this.area.x;var y=this.area.h*bar.y+this.area.y;var w=this.area.w*bar.w;var h=this.area.h*bar.h;if((w<1)||(h<1)){return;}if(this.options.shouldFill){_18.fillRect(x,y,w,h);}if(this.options.shouldStroke){_18.strokeRect(x,y,w,h);}};this._renderBarChartWrap(this.layout.bars,_16(_17,this));};PlotKit.CanvasRenderer.prototype._renderLineChart=function(){var _1e=this.element.getContext("2d");var _1f=this.options.colorScheme.length;var _20=this.options.colorScheme;var _21=MochiKit.Base.keys(this.layout.datasets);var _22=_21.length;var _23=MochiKit.Base.bind;var _24=MochiKit.Base.partial;for(var i=0;i<_22;i++){var _26=_21[i];var _27=_20[i%_1f];var _28=this.options.strokeColorTransform;_1e.save();_1e.fillStyle=_27.toRGBString();if(this.options.strokeColor){_1e.strokeStyle=this.options.strokeColor.toRGBString();}else{if(this.options.strokeColorTransform){_1e.strokeStyle=_27[_28]().toRGBString();}}_1e.lineWidth=this.options.strokeWidth;var _29=function(ctx){ctx.beginPath();ctx.moveTo(this.area.x,this.area.y+this.area.h);var _2b=function(_2c,_2d){if(_2d.name==_26){_2c.lineTo(this.area.w*_2d.x+this.area.x,this.area.h*_2d.y+this.area.y);}};MochiKit.Iter.forEach(this.layout.points,_24(_2b,ctx),this);ctx.lineTo(this.area.w+this.area.x,this.area.h+this.area.y);ctx.lineTo(this.area.x,this.area.y+this.area.h);ctx.closePath();};if(this.options.shouldFill){_23(_29,this)(_1e);_1e.fill();}if(this.options.shouldStroke){_23(_29,this)(_1e);_1e.stroke();}_1e.restore();}};PlotKit.CanvasRenderer.prototype._renderPieChart=function(){var _2e=this.element.getContext("2d");var _2f=this.options.colorScheme.length;var _30=this.layout.slices;var _31=this.area.x+this.area.w*0.5;var _32=this.area.y+this.area.h*0.5;var _33=Math.min(this.area.w*this.options.pieRadius,this.area.h*this.options.pieRadius);if(this.isIE){_31=parseInt(_31);_32=parseInt(_32);_33=parseInt(_33);}for(var i=0;i<_30.length;i++){var _35=this.options.colorScheme[i%_2f];_2e.save();_2e.fillStyle=_35.toRGBString();var _36=function(){_2e.beginPath();_2e.moveTo(_31,_32);_2e.arc(_31,_32,_33,_30[i].startAngle-Math.PI/2,_30[i].endAngle-Math.PI/2,false);_2e.lineTo(_31,_32);_2e.closePath();};if(Math.abs(_30[i].startAngle-_30[i].endAngle)>0.001){if(this.options.shouldFill){_36();_2e.fill();}if(this.options.shouldStroke){_36();_2e.lineWidth=this.options.strokeWidth;if(this.options.strokeColor){_2e.strokeStyle=this.options.strokeColor.toRGBString();}else{if(this.options.strokeColorTransform){_2e.strokeStyle=_35[this.options.strokeColorTransform]().toRGBString();}}_2e.stroke();}}_2e.restore();}};PlotKit.CanvasRenderer.prototype._renderBarAxis=function(){this._renderAxis();};PlotKit.CanvasRenderer.prototype._renderLineAxis=function(){this._renderAxis();};PlotKit.CanvasRenderer.prototype._renderAxis=function(){if(!this.options.drawXAxis&&!this.options.drawYAxis){return;}var _37=this.element.getContext("2d");var _38={"style":{"position":"absolute","fontSize":this.options.axisLabelFontSize+"px","zIndex":10,"color":this.options.axisLabelColor.toRGBString(),"width":this.options.axisLabelWidth+"px","overflow":"hidden"}};_37.save();_37.strokeStyle=this.options.axisLineColor.toRGBString();_37.lineWidth=this.options.axisLineWidth;if(this.options.drawYAxis){if(this.layout.yticks){var _39=function(_3a){if(typeof (_3a)=="function"){return;}var x=this.area.x;var y=this.area.y+_3a[0]*this.area.h;_37.beginPath();_37.moveTo(x,y);_37.lineTo(x-this.options.axisTickSize,y);_37.closePath();_37.stroke();var _3d=DIV(_38,_3a[1]);_3d.style.top=(y-this.options.axisLabelFontSize)+"px";_3d.style.left=(x-this.options.padding.left-this.options.axisTickSize)+"px";_3d.style.textAlign="right";_3d.style.width=(this.options.padding.left-this.options.axisTickSize*2)+"px";MochiKit.DOM.appendChildNodes(this.container,_3d);this.ylabels.push(_3d);};MochiKit.Iter.forEach(this.layout.yticks,bind(_39,this));}_37.beginPath();_37.moveTo(this.area.x,this.area.y);_37.lineTo(this.area.x,this.area.y+this.area.h);_37.closePath();_37.stroke();}if(this.options.drawXAxis){if(this.layout.xticks){var _39=function(_3e){if(typeof (dataset)=="function"){return;}var x=this.area.x+_3e[0]*this.area.w;var y=this.area.y+this.area.h;_37.beginPath();_37.moveTo(x,y);_37.lineTo(x,y+this.options.axisTickSize);_37.closePath();_37.stroke();var _41=DIV(_38,_3e[1]);_41.style.top=(y+this.options.axisTickSize)+"px";_41.style.left=(x-this.options.axisLabelWidth/2)+"px";_41.style.textAlign="center";_41.style.width=this.options.axisLabelWidth+"px";MochiKit.DOM.appendChildNodes(this.container,_41);this.xlabels.push(_41);};MochiKit.Iter.forEach(this.layout.xticks,bind(_39,this));}_37.beginPath();_37.moveTo(this.area.x,this.area.y+this.area.h);_37.lineTo(this.area.x+this.area.w,this.area.y+this.area.h);_37.closePath();_37.stroke();}_37.restore();};PlotKit.CanvasRenderer.prototype._renderPieAxis=function(){if(!this.options.drawXAxis){return;}if(this.layout.xticks){var _42=new Array();for(var i=0;i<this.layout.slices.length;i++){_42[this.layout.slices[i].xval]=this.layout.slices[i];}var _44=this.area.x+this.area.w*0.5;var _45=this.area.y+this.area.h*0.5;var _46=Math.min(this.area.w*this.options.pieRadius,this.area.h*this.options.pieRadius);var _47=this.options.axisLabelWidth;for(var i=0;i<this.layout.xticks.length;i++){var _48=_42[this.layout.xticks[i][0]];if(MochiKit.Base.isUndefinedOrNull(_48)){continue;}var _49=(_48.startAngle+_48.endAngle)/2;var _4a=_49;if(_4a>Math.PI*2){_4a=_4a-Math.PI*2;}else{if(_4a<0){_4a=_4a+Math.PI*2;}}var _4b=_44+Math.sin(_4a)*(_46+10);var _4c=_45-Math.cos(_4a)*(_46+10);var _4d={"position":"absolute","zIndex":11,"width":_47+"px","fontSize":this.options.axisLabelFontSize+"px","overflow":"hidden","color":this.options.axisLabelColor.toHexString()};if(_4a<=Math.PI*0.5){_4d["textAlign"]="left";_4d["verticalAlign"]="top";_4d["left"]=_4b+"px";_4d["top"]=(_4c-this.options.axisLabelFontSize)+"px";}else{if((_4a>Math.PI*0.5)&&(_4a<=Math.PI)){_4d["textAlign"]="left";_4d["verticalAlign"]="bottom";_4d["left"]=_4b+"px";_4d["top"]=_4c+"px";}else{if((_4a>Math.PI)&&(_4a<=Math.PI*1.5)){_4d["textAlign"]="right";_4d["verticalAlign"]="bottom";_4d["left"]=(_4b-_47)+"px";_4d["top"]=_4c+"px";}else{_4d["textAlign"]="right";_4d["verticalAlign"]="bottom";_4d["left"]=(_4b-_47)+"px";_4d["top"]=(_4c-this.options.axisLabelFontSize)+"px";}}}var _4e=DIV({"style":_4d},this.layout.xticks[i][1]);this.xlabels.push(_4e);MochiKit.DOM.appendChildNodes(this.container,_4e);}}};PlotKit.CanvasRenderer.prototype._renderBackground=function(){var _4f=this.element.getContext("2d");_4f.save();_4f.fillStyle=this.options.backgroundColor.toRGBString();_4f.fillRect(0,0,this.width,this.height);_4f.restore();};PlotKit.CanvasRenderer.prototype.clear=function(){if(this.isIE){try{if(this.clearDelay){this.clearDelay.cancel();this.clearDelay=null;}var _50=this.element.getContext("2d");}catch(e){this.isFirstRender=false;this.clearDelay=MochiKit.Async.wait(this.IEDelay);this.clearDelay.addCallback(bind(this.clear,this));return;}}var _50=this.element.getContext("2d");_50.clearRect(0,0,this.width,this.height);MochiKit.Iter.forEach(this.xlabels,MochiKit.DOM.removeElement);MochiKit.Iter.forEach(this.ylabels,MochiKit.DOM.removeElement);this.xlabels=new Array();this.ylabels=new Array();};PlotKit.CanvasRenderer.prototype._initialiseEvents=function(){var _51=MochiKit.Signal.connect;var _52=MochiKit.Base.bind;_51(this.element,"onclick",_52(this.onclick,this));};PlotKit.CanvasRenderer.prototype._resolveObject=function(e){var x=(e.mouse().page.x-PlotKit.Base.findPosX(this.element)-this.area.x)/this.area.w;var y=(e.mouse().page.y-PlotKit.Base.findPosY(this.element)-this.area.y)/this.area.h;var _56=this.layout.hitTest(x,y);if(_56){return _56;}return null;};PlotKit.CanvasRenderer.prototype._createEventObject=function(_57,e){if(_57==null){return null;}e.chart=_57;return e;};PlotKit.CanvasRenderer.prototype.onclick=function(e){var _5a=this._resolveObject(e);var _5b=this._createEventObject(_5a,e);if(_5b!=null){MochiKit.Signal.signal(this,"onclick",_5b);}};PlotKit.CanvasRenderer.prototype.onmouseover=function(e){var _5d=this._resolveObject(e);var _5e=this._createEventObject(_5d,e);if(_5e!=null){signal(this,"onmouseover",_5e);}};PlotKit.CanvasRenderer.prototype.onmouseout=function(e){var _60=this._resolveObject(e);var _61=this._createEventObject(_60,e);if(_61==null){signal(this,"onmouseout",e);}else{signal(this,"onmouseout",_61);}};PlotKit.CanvasRenderer.prototype.onmousemove=function(e){var _63=this._resolveObject(e);var _64=this._createEventObject(_63,e);if((_63==null)&&(this.event_isinside==null)){return;}if((_63!=null)&&(this.event_isinside==null)){signal(this,"onmouseover",_64);}if((_63==null)&&(this.event_isinside!=null)){signal(this,"onmouseout",_64);}if((_63!=null)&&(this.event_isinside!=null)){signal(this,"onmousemove",_64);}this.event_isinside=_63;};PlotKit.CanvasRenderer.isSupported=function(_65){var _66=null;try{if(MochiKit.Base.isUndefinedOrNull(_65)){_66=MochiKit.DOM.CANVAS({});}else{_66=MochiKit.DOM.getElement(_65);}var _67=_66.getContext("2d");}catch(e){var ie=navigator.appVersion.match(/MSIE (\d\.\d)/);var _69=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);if((!ie)||(ie[1]<6)||(_69)){return false;}return true;}return true;};PlotKit.Canvas={};PlotKit.Canvas.CanvasRenderer=PlotKit.CanvasRenderer;PlotKit.Canvas.EXPORT=["CanvasRenderer"];PlotKit.Canvas.EXPORT_OK=["CanvasRenderer"];PlotKit.Canvas.__new__=function(){var m=MochiKit.Base;m.nameFunctions(this);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};};PlotKit.Canvas.__new__();MochiKit.Base._exportSymbols(this,PlotKit.Canvas);try{if(typeof (PlotKit.CanvasRenderer)=="undefined"){throw "";}}catch(e){throw "PlotKit.EasyPlot depends on all of PlotKit's components";}if(typeof (PlotKit.EasyPlot)=="undefined"){PlotKit.EasyPlot={};}PlotKit.EasyPlot.NAME="PlotKit.EasyPlot";PlotKit.EasyPlot.VERSION=PlotKit.VERSION;PlotKit.EasyPlot.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.EasyPlot.toString=function(){return this.__repr__();};PlotKit.EasyPlot=function(_1,_2,_3,_4){this.layout=new Layout(_1,_2);this.divElem=_3;this.width=parseInt(_3.getAttribute("width"));this.height=parseInt(_3.getAttribute("height"));this.deferredCount=0;if(this.width<1){this.width=this.divElem.width?this.divElem.width:300;}if(this.height<1){this.height=this.divElem.height?this.divElem.height:300;}if(isArrayLike(_4)){for(var i=0;i<_4.length;i++){if(typeof (_4[i])=="string"){this.deferredCount++;var d=MochiKit.Async.doSimpleXMLHttpRequest(_4[i]);d.addCallback(MochiKit.Base.bind(PlotKit.EasyPlot.onDataLoaded,this));}else{if(isArrayLike(_4[i])){this.layout.addDataset("data-"+i,_4[i]);}}}}else{if(!isUndefinedOrNull(_4)){throw "Passed datasources are not Array like";}}if(CanvasRenderer.isSupported()){this.element=CANVAS({"id":this.divElem.getAttribute("id")+"-canvas","width":this.width,"height":this.height},"");this.divElem.appendChild(this.element);this.renderer=new SweetCanvasRenderer(this.element,this.layout,_2);}else{if(SVGRenderer.isSupported()){this.element=SVGRenderer.SVG({"id":this.divElem.getAttribute("id")+"-svg","width":this.width,"height":this.height,"version":"1.1","baseProfile":"full"},"");this.divElem.appendChild(this.element);this.renderer=new SweetSVGRenderer(this.element,this.layout,_2);}}if((this.deferredCount==0)&&(PlotKit.Base.keys(this.layout.datasets).length>0)){this.layout.evaluate();this.renderer.clear();this.renderer.render();}};PlotKit.EasyPlot.onDataLoaded=function(_7){var _8=new Array();var _9=_7.responseText.split("\n");for(var i=0;i<_9.length;i++){var _b=MochiKit.Format.strip(_9[i]);if((_b.length>1)&&(_b.charAt(0)!="#")){_8.push(_b.split(","));}}this.layout.addDataset("data-ajax-"+this.deferredCount,_8);this.deferredCount--;if((this.deferredCount==0)&&(PlotKit.Base.keys(this.layout.datasets).length>0)){this.layout.evaluate();this.renderer.clear();this.renderer.render();}};PlotKit.EasyPlot.prototype.reload=function(){this.layout.evaluate();this.renderer.clear();this.renderer.render();};PlotKit.EasyPlotModule={};PlotKit.EasyPlotModule.EasyPlot=PlotKit.EasyPlot;PlotKit.EasyPlotModule.EXPORT=["EasyPlot"];PlotKit.EasyPlotModule.EXPORT_OK=[];PlotKit.EasyPlotModule.__new__=function(){var m=MochiKit.Base;m.nameFunctions(this);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};};PlotKit.EasyPlotModule.__new__();MochiKit.Base._exportSymbols(this,PlotKit.EasyPlotModule);try{if(typeof (PlotKit.CanvasRenderer)=="undefined"){throw "";}}catch(e){throw "SweetCanvas depends on MochiKit.{Base,Color,DOM,Format} and PlotKit.{Layout, Canvas}";}if(typeof (PlotKit.SweetCanvasRenderer)=="undefined"){PlotKit.SweetCanvasRenderer={};}PlotKit.SweetCanvasRenderer=function(_1,_2,_3){if(arguments.length>0){this.__init__(_1,_2,_3);}};PlotKit.SweetCanvasRenderer.NAME="PlotKit.SweetCanvasRenderer";PlotKit.SweetCanvasRenderer.VERSION=PlotKit.VERSION;PlotKit.SweetCanvasRenderer.__repr__=function(){return "["+this.NAME+" "+this.VERSION+"]";};PlotKit.SweetCanvasRenderer.toString=function(){return this.__repr__();};PlotKit.SweetCanvasRenderer.prototype=new PlotKit.CanvasRenderer();PlotKit.SweetCanvasRenderer.prototype.constructor=PlotKit.SweetCanvasRenderer;PlotKit.SweetCanvasRenderer.__super__=PlotKit.CanvasRenderer.prototype;PlotKit.SweetCanvasRenderer.prototype.__init__=function(el,_5,_6){var _7=PlotKit.Base.officeBlue();MochiKit.Base.update(_7,_6);PlotKit.SweetCanvasRenderer.__super__.__init__.call(this,el,_5,_7);};PlotKit.SweetCanvasRenderer.prototype._renderBarChart=function(){var _8=MochiKit.Base.bind;var _9=Color.blackColor().colorWithAlpha(0.1).toRGBString();var _a=function(_b,x,y,w,h){_b.fillStyle=_9;_b.fillRect(x-2,y-2,w+4,h+2);_b.fillStyle=_9;_b.fillRect(x-1,y-1,w+2,h+1);};var _10=this.options.colorScheme.length;var _11=this.options.colorScheme;var _12=PlotKit.Base.keys(this.layout.datasets);var _13=_12.length;var _14=function(_15){for(var i=0;i<_13;i++){if(_15==_12[i]){return _11[i%_10];}}return _11[0];};var _17=function(_18,bar){var x=this.area.w*bar.x+this.area.x;var y=this.area.h*bar.y+this.area.y;var w=this.area.w*bar.w;var h=this.area.h*bar.h;if((w<1)||(h<1)){return;}_18.save();_18.shadowBlur=5;_18.shadowColor=Color.fromHexString("#888888").toRGBString();if(this.isIE){_18.save();_18.fillStyle="#cccccc";_18.fillRect(x-2,y-2,w+4,h+2);_18.restore();}else{_a(_18,x,y,w,h);}if(this.options.shouldFill){_18.fillStyle=_14(bar.name).toRGBString();_18.fillRect(x,y,w,h);}_18.shadowBlur=0;_18.strokeStyle=Color.whiteColor().toRGBString();_18.lineWidth=2;if(this.options.shouldStroke){_18.strokeRect(x,y,w,h);}_18.restore();};this._renderBarChartWrap(this.layout.bars,_8(_17,this));};PlotKit.SweetCanvasRenderer.prototype._renderLineChart=function(){var _1e=this.element.getContext("2d");var _1f=this.options.colorScheme.length;var _20=this.options.colorScheme;var _21=PlotKit.Base.keys(this.layout.datasets);var _22=_21.length;var _23=MochiKit.Base.bind;for(var i=0;i<_22;i++){var _25=_21[i];var _26=_20[i%_1f];var _27=this.options.strokeColorTransform;_1e.save();var _28=function(ctx){ctx.beginPath();ctx.moveTo(this.area.x,this.area.y+this.area.h);var _2a=function(_2b,_2c){if(_2c.name==_25){_2b.lineTo(this.area.w*_2c.x+this.area.x,this.area.h*_2c.y+this.area.y);}};MochiKit.Iter.forEach(this.layout.points,partial(_2a,ctx),this);ctx.lineTo(this.area.w+this.area.x,this.area.h+this.area.y);ctx.lineTo(this.area.x,this.area.y+this.area.h);ctx.closePath();};if(this.options.shouldFill){_1e.save();if(this.isIE){_1e.fillStyle="#cccccc";}else{_1e.fillStyle=Color.blackColor().colorWithAlpha(0.2).toRGBString();}_1e.translate(-1,-2);_23(_28,this)(_1e);if(this.options.shouldFill){_1e.fill();}_1e.restore();}_1e.shadowBlur=5;_1e.shadowColor=Color.fromHexString("#888888").toRGBString();_1e.fillStyle=_26.toRGBString();_1e.lineWidth=2;_1e.strokeStyle=Color.whiteColor().toRGBString();if(this.options.shouldFill){_23(_28,this)(_1e);_1e.fill();}if(this.options.shouldStroke){_23(_28,this)(_1e);_1e.stroke();}_1e.restore();}};PlotKit.SweetCanvasRenderer.prototype._renderPieChart=function(){var _2d=this.element.getContext("2d");var _2e=this.options.colorScheme.length;var _2f=this.layout.slices;var _30=this.area.x+this.area.w*0.5;var _31=this.area.y+this.area.h*0.5;var _32=Math.min(this.area.w*this.options.pieRadius,this.area.h*this.options.pieRadius);if(this.isIE){_30=parseInt(_30);_31=parseInt(_31);_32=parseInt(_32);}if(!this.isIE){_2d.save();var _33=Color.blackColor().colorWithAlpha(0.2);_2d.fillStyle=_33.toRGBString();_2d.shadowBlur=5;_2d.shadowColor=Color.fromHexString("#888888").toRGBString();_2d.translate(1,1);_2d.beginPath();_2d.moveTo(_30,_31);_2d.arc(_30,_31,_32+2,0,Math.PI*2,false);_2d.closePath();_2d.fill();_2d.restore();}_2d.save();_2d.strokeStyle=Color.whiteColor().toRGBString();_2d.lineWidth=2;for(var i=0;i<_2f.length;i++){var _35=this.options.colorScheme[i%_2e];_2d.fillStyle=_35.toRGBString();var _36=function(){_2d.beginPath();_2d.moveTo(_30,_31);_2d.arc(_30,_31,_32,_2f[i].startAngle-Math.PI/2,_2f[i].endAngle-Math.PI/2,false);_2d.lineTo(_30,_31);_2d.closePath();};if(Math.abs(_2f[i].startAngle-_2f[i].endAngle)>0.0001){if(this.options.shouldFill){_36();_2d.fill();}if(this.options.shouldStroke){_36();_2d.stroke();}}}_2d.restore();};PlotKit.SweetCanvasRenderer.prototype._renderBackground=function(){var _37=this.element.getContext("2d");if(this.layout.style=="bar"||this.layout.style=="line"){_37.save();_37.fillStyle=this.options.backgroundColor.toRGBString();_37.fillRect(this.area.x,this.area.y,this.area.w,this.area.h);_37.strokeStyle=this.options.axisLineColor.toRGBString();_37.lineWidth=1;var _38=this.layout.yticks;var _39=false;if(this.layout.style=="bar"&&this.layout.options.barOrientation=="horizontal"){_38=this.layout.xticks;_39=true;}for(var i=0;i<_38.length;i++){var x1=0;var y1=0;var x2=0;var y2=0;if(_39){x1=_38[i][0]*this.area.w+this.area.x;y1=this.area.y;x2=x1;y2=y1+this.area.h;}else{x1=this.area.x;y1=_38[i][0]*this.area.h+this.area.y;x2=x1+this.area.w;y2=y1;}_37.beginPath();_37.moveTo(x1,y1);_37.lineTo(x2,y2);_37.closePath();_37.stroke();}_37.restore();}else{PlotKit.SweetCanvasRenderer.__super__._renderBackground.call(this);}};PlotKit.SweetCanvas={};PlotKit.SweetCanvas.SweetCanvasRenderer=PlotKit.SweetCanvasRenderer;PlotKit.SweetCanvas.EXPORT=["SweetCanvasRenderer"];PlotKit.SweetCanvas.EXPORT_OK=["SweetCanvasRenderer"];PlotKit.SweetCanvas.__new__=function(){var m=MochiKit.Base;m.nameFunctions(this);this.EXPORT_TAGS={":common":this.EXPORT,":all":m.concat(this.EXPORT,this.EXPORT_OK)};};PlotKit.SweetCanvas.__new__();MochiKit.Base._exportSymbols(this,PlotKit.SweetCanvas);

