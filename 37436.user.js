// ==UserScript==
// @name           MobWars Next Best Buy
// @namespace      http://apps.facebook.com/mobwars
// @description    Improves Mob Wars experience by helping identify the next best buy for your city.
// @version        1.51
// @date           2008-11-23
// @creator        Dave Wong
// @include        http://apps.facebook.com/mobwars/city/*
// ==/UserScript==

/*

History
-------
   11/23/08 - Created
   11/26/08 - Added cash/cashflow info so they're still visible when the page header scrolls out of view
              as well as adding in value of land bank
   11/27/08 - Added buttons to see Next Actual Price x1, x5, x10
            - Added available cash (cash + land bank) now, in one turn, 2 turns, etc (listed in actual minutes)
            - Now gauges current cash and cash flow and lowers recommendation (NAP < Cash+CashFlow*10).
              If a lowered recommendation is warranted, a button is displayed to allow the user to toggle
              between the recommendation that is more easily affordable vs the highest ROI, which may take
              more than 10 turns to buy.
            - updated bug where property list for lower levels is different
              (beachfront lot, container yard, highrise apartment, luxury hotel)
   12/04/08 - Fixed NaN bug introduced by new countdown timers that let you know when more cash will be earned.
            - Fixed bug with include/exclude expensive properties - when a property with a higher ROI wasn't
              found, it would say it was ignoring Villas because they were too expensive.
            - Removed include/exclude button - it just wasn't working the way I wanted it.  Instead, if the
              next best buy seems too expensive, an alternate recommendation is now also included.  If the
              next best buy seems affordable, the alternate is not recommended.
            - For the next best buy (and alternate, if shown), now also displays time/turns it will take
              for enough cash to be available to buy the number (1x, 5x, 10x) being viewed by the user.
   12/05/08 - Fixed regex bug caused by level:xx change (space after : is optional)
            - Right most column can now be toggled between actual price and time to buy (for specified number)
              by clicking on the column header.
   12/20/08 - Changed property info gathering to mimic http://userscripts.org/scripts/show/37709
              since it's much cleaner than the code I had, and it automatically figures out what properties
              are availble (without looking at user level), and automatically figures out original base-values
              based on current value and number owned etc.  just generally much nicer than my previous hard-coded
              arrays that were based on the excel calculators.
            - Also added code to factor in counts of beachfront-lot/container-yard - if count=10, treat as land
              bank.  Otherwise, treat it as investment value, and show with ROI.
   12/31/08 - Now saves ROI as raw number, and only uses toFixed(4) when displaying.  This is to resolve bug where
              max ROI item isn't treated as max ROI sporadically.
   01/30/09 - Now switches all the dropdowns for buying/selling quantity to 10 by default
   05/02/09 - Fixed time parsing... still need to work on Ajax (moved startup code to startMWNBB() so it can be
              called by Ajax event handlers, but don't know where to go next yet)

*/


var mobjCoreColor;

log = function(message) {
	GM_log(message);
}


/***
* Object: Utils
*
* Description: contains some utilities functions.
*/
Utils = new Object();

Utils.xpath = function(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


/***
 * Method: Element.getElementsByClassName(name, node)
 *
 * Description:
 * Gets a list of elements with a give className.
 *
 * @param name        -- the classname to look for.
 * @param node        -- node on which we start the search.
 * @return array      -- an array of nodes matching the classname.
 */
if (document.getElementsByClassName) {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
  }
} else {
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext()) {
      returnElements.push(node);
    }
    return returnElements;
  }
}

/***
* Function: Utils.getElementsByXPath(expression, node)
*
* Description:
* Returns an array of elements obtained from evaluating the XPath expression on
* the node.
*
* @param expression         -- the expression to evaluate.
* @param node               -- context node, defaults to document.
* @return array             -- an array of elements matching the expression
*/
Utils.getElementsByXPath = function(expression, node) {
	if (!node) node = document;
	var result = new Array();
	var xpathResult;
	xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

	var node;
	while (node = xpathResult.iterateNext()) {
		result.push(node);
	}

	return result;
}

function two(x) {return ((x>9)?"":"0")+x}

function formatMinutesAsDaysHoursMinutes(pintMinutes) {

	var lstrResult = '';
	
	var lintHours = Math.floor(pintMinutes/60);
	var lintMinutes = pintMinutes%60;
	
	var lintDays = Math.floor(lintHours/24);
	lintHours = lintHours % 24;
	
	if (lintDays > 0) lstrResult = lintDays + 'd';
	if (lintDays > 0 || lintHours > 0) lstrResult += lintHours + 'h';
	if (lintDays > 0 || lintHours > 0 || lintMinutes > 0) lstrResult += lintMinutes + 'm';
	
	return lstrResult;

}

//from http://www.mredkj.com/javascript/numberFormat.html
function formatCurrency(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return '$' + x1 + x2;
}


function convertCurrencyToNumeric(pstrCurrency) {
	
	//remove occurences of $ and ,
	var ldecCurrency = pstrCurrency.replace(/\,/g,'').replace(/\$/g,'');
	return parseInt(ldecCurrency);

}

function Cityitem() {
	this.item_id = '';
	this.type = 'city';
	this.subtype = 'U';
	this.name = 'Unknown';
	this.baseprice = 0;
	this.currentprice = 0;
	this.numberowned = 0;
	this.income = 0;
	this.depends = '';
	this.investable = 0;
	this.nextactualprice = 0;
	this.roi = 0;
	
	this.TimeToBuy = function(pintNumberOfUnits) {

		var lintCashNeededToBuySpecifiedNumber = (this.nextactualprice * pintNumberOfUnits) - mobjCashInfo.LandBankValue - mobjCashInfo.Cash;
		var lstrWhenCanIBuy = '';

		if (lintCashNeededToBuySpecifiedNumber <= 0) {
			lstrWhenCanIBuy = 'Now';
		} else if (mobjCashInfo.CashFlow > 0) {
			var lintTurnsTillCashAvailable = Math.ceil( lintCashNeededToBuySpecifiedNumber / mobjCashInfo.CashFlow );
			var lintMinutesTillCashAvailable = mobjCashInfo.NextPaidInMinutes + ( (lintTurnsTillCashAvailable-1) * mobjCashInfo.EarningRateInMinutes );
			lstrWhenCanIBuy = formatMinutesAsDaysHoursMinutes( lintMinutesTillCashAvailable );
		}
		
		log('name=' + this.name + ', nap=' + this.nextactualprice + ', #units=' + pintNumberOfUnits + ', landbank=' + mobjCashInfo.LandBankValue + ', cash=' + mobjCashInfo.Cash + ', cashNeededToBuy=' + lintCashNeededToBuySpecifiedNumber + ', cashflow=' + mobjCashInfo.CashFlow + ', turns=' + lintTurnsTillCashAvailable + ', minutes=' + lintMinutesTillCashAvailable + ', mobjCashInfo.NextPaidInMinutes=' + mobjCashInfo.NextPaidInMinutes + ', mobjCashInfo.EarningRateInMinutes=' + mobjCashInfo.EarningRateInMinutes);

		return lstrWhenCanIBuy;

	}

	this.TimeToEarnBackPurchasePrice = function(pintNumberOfUnits) {

		var lintPurchasePrice = this.nextactualprice * pintNumberOfUnits;
		var lintIncome = this.income * pintNumberOfUnits;
		
		var lintTurnsTillMoneyEarnedBack = Math.ceil( lintPurchasePrice / lintIncome );
		var lintMinutesTillMoneyEarnedBack = mobjCashInfo.NextPaidInMinutes + ( (lintTurnsTillMoneyEarnedBack-1) * mobjCashInfo.EarningRateInMinutes );
		
		return formatMinutesAsDaysHoursMinutes( lintMinutesTillMoneyEarnedBack );

	}

}

function CashInfo() {
	this.LandBankValue=0;
	this.CashFlow=0;
	this.Cash=0;
	this.FoundEarningRate=0;
	this.EarningRateInMinutes=0;
	this.NextPaidInMinutes=0;
	this.PropertyWithMaxROI=0;
	this.MaxROI=0;
}

var mobjProperties = new Array();
var mobjCashInfo = new CashInfo();

function GetCashData() {

	//land bank only consists of property where number-owned is 10.
	for (var i=0; i < mobjProperties.length; i++ ) {
		if ( (mobjProperties[i].subtype=="U") && (mobjProperties[i].numberowned==10) ) {
			mobjCashInfo.LandBankValue += (mobjProperties[i].currentprice/2) * mobjProperties[i].numberowned;
		}
	}

	var lobjEarnings = Utils.getElementsByClassName('earnings')[0];
	if (lobjEarnings) {

		var lobjEarningsResult = lobjEarnings.innerHTML.match(/every (\d+) minute/);

		if (lobjEarningsResult) {
		
			mobjCashInfo.FoundEarningRate=1;
			mobjCashInfo.EarningRateInMinutes=parseInt(lobjEarningsResult[1]);
			//mobjCashInfo.NextPaidInMinutes=parseInt(lobjEarningsResult[2]);
			
			mobjCashInfo.NextPaidInMinutes = parseInt((Utils.xpath("//span[@id='app8743457343_cur_cash_countdown']")).snapshotItem(0).innerHTML.split(':')[0]);
		
		}

	}

	var lstrCashFlow = '';
	if ( (Utils.xpath("//span[@class='earnings']/b[3]")).snapshotLength > 0 ) {
		lstrCashFlow = (Utils.xpath("//span[@class='earnings']/b[3]")).snapshotItem(0).innerHTML;
	}
	var lstrCash = (Utils.xpath("//span[@id='app8743457343_cur_cash']")).snapshotItem(0).innerHTML;

	mobjCashInfo.CashFlow = convertCurrencyToNumeric(lstrCashFlow);
	mobjCashInfo.Cash = convertCurrencyToNumeric(lstrCash);



	log("LandBankValue=" +mobjCashInfo.LandBankValue + '\n' +
		"CashFlow=" +mobjCashInfo.CashFlow + '\n' +
		'Cash=' +mobjCashInfo.Cash + '\n' +
		'FoundEarningRate=' +mobjCashInfo.FoundEarningRate + '\n' +
		'EarningRateInMinutes=' +mobjCashInfo.EarningRateInMinutes + '\n' +
		'NextPaidInMinutes=' +mobjCashInfo.NextPaidInMinutes + '\n' +
		'PropertyWithMaxROI=' +mobjCashInfo.PropertyWithMaxROI.name + '\n' +
		'MaxROI=' +mobjCashInfo.MaxROI + '\n');

}

function GetPropertyData() {

	var header = document.getElementById('app16421175101_content_row');
	var divs = Utils.getElementsByXPath('.//a[contains(@name,"item")]',header);
	var j;
	
	for (var i = 0; i < divs.length; i++) {

		var div = divs[i].parentNode.parentNode;
		var item;

		item = new Cityitem();
		item.item_id = divs[i].name;
		item.subtype = div.parentNode.parentNode.firstChild.nextSibling.firstChild.firstChild.nextSibling.innerHTML.charAt(0);
		item.name = div.getElementsByTagName('img')[0].title;

		var result;
		var str = div.innerHTML.replace(/\n/g,'');
		result = str.match(/Income: \$([0-9,]+).*\$([0-9,]+).*Owned: <[^<]*>(\d+)/);
		item.income = parseInt(result[1].replace(/,/g,''));

		item.currentprice = parseInt(result[2].replace(/,/g,''));
		item.numberowned = parseInt(result[3]);
		
		item.baseprice = parseInt(result[2].replace(/,/g,'')) * 10 / (parseInt(result[3]) + 10);
		result = str.match(/Built On: (\w+ \w+)/);
		if (result) {

			for (j=0; j < mobjProperties.length; j++) {

				if (mobjProperties[j].name == result[1]) {
					item.depends = mobjProperties[j];
					break;
				}

			}

		}

		item.nextactualprice = (item.depends=='') ? item.currentprice : item.currentprice + item.depends.baseprice;
		item.roi = ( item.income / item.nextactualprice ) * 1000;
		
		//don't want to invest in empty lot, city block or downtown square, as we need those for establishments
		item.investable = ( (item.subtype == 'U') && (item.income < 8000) ) ? 0 : 1;

		mobjProperties.push(item);


		if (item.roi > mobjCashInfo.MaxROI && item.investable && (item.subtype=="E" || (item.subtype=='U' && item.numberowned>10) ) ) {
			log("i=" + i + '\n' +
				"property=" + item.name + '\n' +
				"item ROI=" + item.roi + '\n' +
				"prev max ROI=" + mobjCashInfo.MaxROI);
			mobjCashInfo.PropertyWithMaxROI = item;
			mobjCashInfo.MaxROI = item.roi;
		}

	}

}


function SetupHTML() {
	var lobjHTML = new Array();
	
	lobjHTML.push('<table cellspacing="0" id="MWNBB"><tr><td>Establishment</td><td>Owned</td><td>ROI</td><td id="MobWarsNextBestBuyNAPHeader">Actual Price (x1)</td></tr>');

	var lstrPreviousPropertyType = '';
	var lstrExtraStyle = '';
	var lintRowWithMaxROI = 0;
	
	for (var i = 0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			lstrExtraStyle = (mobjProperties[i].subtype == lstrPreviousPropertyType) ? "" : " style='border-top:1px dotted #000000;'";
			
			lobjHTML.push(
				'<tr id="MobWarsNextBestBuyPropertyRow' + i +'">'
				+ '<td' + lstrExtraStyle + '>' + mobjProperties[i].name + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MobWarsNextBestBuyRightAlign">' + mobjProperties[i].numberowned + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MobWarsNextBestBuyRightAlign" id="MobWarsNextBestBuyROI' + i + '">' + mobjProperties[i].roi.toFixed(4) + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MobWarsNextBestBuyRightAlign" id="MobWarsNextBestBuyNAP' + i + '">' + formatCurrency(mobjProperties[i].nextactualprice) + '</td>'
				+ '</tr>');
			
			lstrPreviousPropertyType = mobjProperties[i].subtype;
			
			if (mobjProperties[i].name == mobjCashInfo.PropertyWithMaxROI.name) {
				lintRowWithMaxROI = i;
			}
		}
	}

	lobjHTML.push("<tr><td colspan='4' class='MobWarsNextBestBuyRightAlign'><button type='button' id='btnShowOne'>x1</button><button type='button' id='btnShowFive'>x5</button><button type='button' id='btnShowTen'>x10</button></td></tr>");

	lobjHTML.push("<tr><td colspan='4'><hr /></td></tr>");

	lobjHTML.push("<tr><td colspan='2'>Cash</td><td colspan='2' class='MobWarsNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.Cash) + "</td></tr>");
	lobjHTML.push("<tr><td colspan='2'>Land Bank</td><td colspan='2' class='MobWarsNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.LandBankValue) + "</td></tr>");

	lobjHTML.push("</table>");


	var lobjDiv = document.getElementById('MobWarsNextBestBuy');
	
	if (lobjDiv) {
		//ok - found it - so we must be reloading because of AJAX
	} else {
		lobjDiv = document.createElement('div');
		lobjDiv.id = 'MobWarsNextBestBuy';
		document.body.insertBefore(lobjDiv, document.body.lastChild);

		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = "#MobWarsNextBestBuy { z-index: 10; position:fixed; top:27px; right:2px; border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold;} .MobWarsNextBestBuyRightAlign { text-align: right;} table#MWNBB td {padding-left:7px;}";
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	lobjDiv.innerHTML = lobjHTML.join('\n');
	lobjHTML.length = 0;


	mobjCoreColor = document.getElementById('MobWarsNextBestBuyNAPHeader').style.color;
	document.getElementById('MobWarsNextBestBuyNAPHeader').innerHTML = "<a href='#' id='ToggleNAPMoneyVsTime'>z</a>";


	var lobjPropertyRow = document.getElementById('MobWarsNextBestBuyPropertyRow'+lintRowWithMaxROI);
	lobjPropertyRow.style.color='red';


}



function updateTable(pintNumberOfUnitsAtATime) {
	
	log('updateTable: Looking at ' + pintNumberOfUnitsAtATime + ' units at a time');
	GM_setValue('MWUnitsAtATime', pintNumberOfUnitsAtATime);

	var lblnGetPriceInsteadOfTimeToBuy = GM_getValue('MWGetPrice', 1); //default to 1

	for (var i=0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			if (lblnGetPriceInsteadOfTimeToBuy) {
				document.getElementById('MobWarsNextBestBuyNAP' + i).innerHTML = formatCurrency(mobjProperties[i].nextactualprice * pintNumberOfUnitsAtATime);
			} else {
				document.getElementById('MobWarsNextBestBuyNAP' + i).innerHTML =  mobjProperties[i].TimeToBuy(pintNumberOfUnitsAtATime);
				//document.getElementById('MobWarsNextBestBuyNAP' + i).innerHTML =  mobjProperties[i].TimeToEarnBackPurchasePrice(pintNumberOfUnitsAtATime);
			}

		}
	}

	if (lblnGetPriceInsteadOfTimeToBuy) {
		document.getElementById('ToggleNAPMoneyVsTime').innerHTML = 'Actual Price (x' + pintNumberOfUnitsAtATime + ')';
	} else {
		document.getElementById('ToggleNAPMoneyVsTime').innerHTML = 'Time To Buy (x' + pintNumberOfUnitsAtATime + ')';
	}

}

function togglePriceVsTimeToBuy() {

	var lblnGetPriceInsteadOfTimeToBuy = GM_getValue('MWGetPrice', 1); //default to 1
	lblnGetPriceInsteadOfTimeToBuy = ((lblnGetPriceInsteadOfTimeToBuy==1)?0:1)
	GM_setValue('MWGetPrice', lblnGetPriceInsteadOfTimeToBuy);

	var lintNumberOfUnitsAtATime = GM_getValue('MWUnitsAtATime', 1); //default to 1
	updateTable(lintNumberOfUnitsAtATime);
}

function startMWNBB() {

	GetPropertyData();
	GetCashData();
	SetupHTML();


	for (var i = 0; i < mobjProperties.length; i++) {
		log("item id=" + mobjProperties[i].item_id + '\n' +
		"subtype=" + mobjProperties[i].subtype + '\n' +
		'name=' + mobjProperties[i].name + '\n' +
		'baseprice=' + mobjProperties[i].baseprice + '\n' +
		'income=' + mobjProperties[i].income + '\n' +
		'investable=' + mobjProperties[i].investable + '\n' +
		'depend=' + mobjProperties[i].depends.name + '\n' +
		'currentprice=' + mobjProperties[i].currentprice + '\n' +
		'nextactualprice=' + mobjProperties[i].nextactualprice + '\n' +
		'roi=' + mobjProperties[i].roi + '\n' +
		'timetobuy x1=' + mobjProperties[i].TimeToBuy(1) + '\n' +
		'timetobuy x5=' + mobjProperties[i].TimeToBuy(5) + '\n' +
		'timetobuy x10=' + mobjProperties[i].TimeToBuy(10) + '\n' +
		'numberowned=' + mobjProperties[i].numberowned);
	}

	document.getElementById('btnShowOne').addEventListener('click', function(){updateTable(1);}, false);
	document.getElementById('btnShowFive').addEventListener('click', function(){updateTable(5);}, false);
	document.getElementById('btnShowTen').addEventListener('click', function(){updateTable(10);}, false);

	document.getElementById('ToggleNAPMoneyVsTime').addEventListener('click', function(){togglePriceVsTimeToBuy();}, false);

	var lintNumberOfUnitsAtATime = GM_getValue('MWUnitsAtATime', 1); //default to 1
	updateTable(lintNumberOfUnitsAtATime);

	var lobjQtyDropdowns = Utils.xpath("//select[@name='qty']");
	if ( lobjQtyDropdowns.snapshotLength > 0 ) {

		for (var i=0; i < lobjQtyDropdowns.snapshotLength; i++) {

			var lobQtyDropdown = lobjQtyDropdowns.snapshotItem(i);
			
			for (var j=0; j < lobQtyDropdown.length; j++) {
				if (lobQtyDropdown[j].value == "10") {
					lobQtyDropdown[j].selected = true;
				}
			}
		}
	}

}

window.addEventListener( 'load', function( e ) {

	startMWNBB();
		
},false);
