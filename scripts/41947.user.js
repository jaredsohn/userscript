// ==UserScript==
// @name           Pirates: Rule The Caribbean - Next Best Buy
// @namespace      http://apps.facebook.com/piratesrule/
// @description    Improves 'Pirates: Rule The Caribbean' experience by helping identify the next best buy for your island properties.  This is based on my Mob Wars and Mafia Wars scripts.
// @version        0.01
// @date           2009-02-02
// @creator        Dave Wong
// @include        http://apps.facebook.com/piratesrule/properties.php
// ==/UserScript==

/*

History
-------
   02/02/09 - Created
   02/07/09 - Added dependency initials next to property name
   02/08/09 - Fixed bug where the next-best-buy table wouldn't show up after buying/selling property.
              The page displayed an extra <div> indicating what was bought/sold, and that was throwing things off
*/


function log(message, severity) {
	// change severity threshold below to reduce log messages
	if (severity > 50) {
		GM_log(message);
	}
}

//http://underthefold.com/underthefeed/?id=23
if ( !(new String).trim ){
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,''); };
}	
if ( !(new String).normalize && (new String).trim ){
	String.prototype.normalize = String.prototype.normalise = function() { return this.trim().replace(/\s+/g,' '); };
}	
if ( !(new String).startsWith ){
	String.prototype.startsWith = function(str,i){ i=(i)?'i':'';var re=new RegExp('^'+str,i);return (this.normalize().match(re)) ? true : false ; };
}	
if ( !(new String).endsWith ){
	String.prototype.endsWith = function(str,i){ i=(i)?'gi':'g';var re=new RegExp(str+'$',i);return (this.normalize().match(re)) ? true : false ; };
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


function CashInfo() {
	this.LandBankValue=0;
	this.CashFlow=0;
	this.Cash=0;
	this.FoundEarningRate=0;
	this.EarningRateInMinutes=0;
	this.NextPaidInMinutes=0;
	this.PropertyWithMaxROI=0;
	this.MaxROI=0;
	this.MobSize=0;
}


var mintIncome, mintUpkeep;
var mobjProperties = new Array();
var mobjCashInfo = new CashInfo();




function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function convertCurrencyToNumeric(pstrCurrency) {
	
	//remove occurences of $ and ,
	var ldecCurrency = pstrCurrency.replace(/\,/g,'').replace(/\$/g,'');
	return +ldecCurrency;

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


function Cityitem() {
	this.item_id = '';
	this.isUndevelopedLand = 0;
	this.name = '';
	this.baseprice = 0;
	this.currentprice = 0;
	this.numberowned = 0;
	this.income = 0;
	this.depends = '';
	this.dependsMobSize = 0;
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
		
		log('Cityitem(): name=' + this.name + ', nap=' + this.nextactualprice + ', #units=' + pintNumberOfUnits + ', landbank=' + mobjCashInfo.LandBankValue + ', cash=' + mobjCashInfo.Cash + ', cashNeededToBuy=' + lintCashNeededToBuySpecifiedNumber + ', cashflow=' + mobjCashInfo.CashFlow + ', turns=' + lintTurnsTillCashAvailable + ', minutes=' + lintMinutesTillCashAvailable + ', mobjCashInfo.NextPaidInMinutes=' + mobjCashInfo.NextPaidInMinutes + ', mobjCashInfo.EarningRateInMinutes=' + mobjCashInfo.EarningRateInMinutes, 10);

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

function findPropertyInformation() {

	//clear out the array so subsequent property-info loads don't just get appended...
	mobjProperties = [];
	
	lobjProperties = xpath("//td[@id='app16421175101_content_row']/table[@class='main']/tbody/tr");
	var lblnLookingAtUndevelopedSpaces = 0;

	for (var i=0; i < lobjProperties.snapshotLength; i++)
	{
		log('findPropertyInformation: loop, i=' + i + '\n' + lobjProperties.snapshotItem(i).innerHTML, 10);
		
		if(/<th>Lots<\/th>/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			log('findPropertyInformation: Starting Lots', 10);
			lblnLookingAtUndevelopedSpaces = 1;
		}

		if(/<th>Operations<\/th>/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			log('findPropertyInformation: Starting property upgrades', 10);
			lblnLookingAtUndevelopedSpaces = 0;
		}

		if(/<a name=\"item_/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			
			var lobjCityItem = new Cityitem();
			
			var lstrCurrentRowXpath = "//td[@id='app16421175101_content_row']/table[@class='main']/tbody/tr[" + (i+1) + "]/";

			var lobjTemp = xpath(lstrCurrentRowXpath + "td[2]/div/strong");
			lobjCityItem.name = lobjTemp.snapshotItem(0).innerHTML;
			log('findPropertyInformation: Name=' + lobjCityItem.name, 10);
			
			
			var lobjTemp2 = lobjTemp.snapshotItem(1).innerHTML.match(/>(.+)$/);
			if (lobjTemp2) {
				lobjCityItem.income=convertCurrencyToNumeric(lobjTemp2[1]);
			} else {
				lobjCityItem.income=0;
				log('findPropertyInformation: Cannot determine income for ' + lobjCityItem.name, 100);
			}

			log('findPropertyInformation: income=' + lobjCityItem.income, 10);

			lobjTemp = xpath(lstrCurrentRowXpath + "td[2]/div/div[2]");
			if (lobjTemp.snapshotLength > 0) {

				var lstrDependencyInfo = lobjTemp.snapshotItem(0).innerHTML;
				log('findPropertyInformation: lstrDependencyInfo=' + lstrDependencyInfo, 5);
				
				var lobjMobSizeDependency = lstrDependencyInfo.match(/^[\s]*(\d+)(.*) Crew Members[\s]*$/);
				if ( lobjMobSizeDependency ) {
					lobjCityItem.dependsMobSize = parseInt(lobjMobSizeDependency[1]);
				} else {
					lobjCityItem.dependsMobSize = 0;
				}
				log('findPropertyInformation: lobjCityItem.dependsMobSize=' + lobjCityItem.dependsMobSize, 10);
				
				var lobjPropertyDependency = lstrDependencyInfo.match(/[\s]*(.+) \(Consumed\)/);

				//might have this dependency div, but might not actually have a dependency - eg Louie's Deli
				if ( lobjPropertyDependency ) {
					//lobjCityItem.depends = lobjPropertyDependency[1];
					//log('depinfo=' + lstrDependencyInfo, 10);
					log('findPropertyInformation: dependency=' + lobjPropertyDependency[1], 10);


					for (j=0; j < mobjProperties.length; j++) {

						if (mobjProperties[j].name.startsWith( lobjPropertyDependency[1])) {
							lobjCityItem.depends = mobjProperties[j];
							log('findPropertyInformation: lobjCityItem.depends.name=' + lobjCityItem.depends.name + ', lobjCityItem.depends.baseprice=' + lobjCityItem.depends.baseprice, 50);
							break;
						}

					}


				}
								
			}

			lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[1]/td/strong");
			log('findPropertyInformation: price = ' + lobjTemp.snapshotItem(0).innerHTML, 5);

			lobjTemp2 = lobjTemp.snapshotItem(0).innerHTML.match(/>(.+)$/);
			if (lobjTemp2) {
				lobjCityItem.currentprice=convertCurrencyToNumeric(lobjTemp2[1]);
			}
			if (isNaN(lobjCityItem.currentprice)) {
				lobjCityItem.currentprice=0;
				log('findPropertyInformation: Cannot determine current price for ' + lobjCityItem.name, 100);
			}

			//lobjCityItem.currentprice = convertCurrencyToNumeric( lobjTemp.snapshotItem(0).innerHTML );
			log('findPropertyInformation: lobjCityItem.currentprice=' + lobjCityItem.currentprice, 10);

			lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[2]/td");
			log('findPropertyInformation: owned = ' + lobjTemp.snapshotItem(0).innerHTML, 5);
			
			result = lobjTemp.snapshotItem(0).innerHTML.match(/Owned:[\s]*(\d+)/);
			lobjCityItem.numberowned = parseInt(result[1]);
			log('findPropertyInformation: lobjCityItem.numberowned=' + lobjCityItem.numberowned, 10);


			lobjCityItem.isUndevelopedLand = lblnLookingAtUndevelopedSpaces
			
			lobjCityItem.baseprice = lobjCityItem.currentprice * 10 / (lobjCityItem.numberowned + 10);
			lobjCityItem.nextactualprice = (lobjCityItem.depends=='') ? lobjCityItem.currentprice : lobjCityItem.currentprice + lobjCityItem.depends.baseprice;
			
			//some properties can't be bought... like Louie's Deli
			lobjCityItem.roi = (lobjCityItem.nextactualprice==0)? 0: ( lobjCityItem.income / lobjCityItem.nextactualprice ) * 1000;

			//for now, don't invest in undeveloped land - as of my early experience, 
			//all of it is needed for establishments... also, only invest in things that can be bought...
			lobjCityItem.investable = ( (lobjCityItem.isUndevelopedLand==0) && (lobjCityItem.roi > 0) ) || ( lobjCityItem.dependsMobSize > 0 );
			
			if ( mobjCashInfo.MobSize < lobjCityItem.dependsMobSize ) {
				lobjCityItem.investable = 0;
				log('findPropertyInformation: skipping ' + lobjCityItem.name + ', mob size requirement=' + lobjCityItem.dependsMobSize + ', my mob size=' + mobjCashInfo.MobSize, 10);
			}

			//if (lobjCityItem.roi > mobjCashInfo.MaxROI && lobjCityItem.investable && (lobjCityItem.subtype=="E" || (lobjCityItem.subtype=='U' && lobjCityItem.numberowned>10) ) ) {
			if (lobjCityItem.roi > mobjCashInfo.MaxROI && lobjCityItem.investable ) {
				log("findPropertyInformation: i=" + i + '\n' +
					"property=" + lobjCityItem.name + '\n' +
					"item ROI=" + lobjCityItem.roi + '\n' +
					"prev max ROI=" + mobjCashInfo.MaxROI, 50);
				mobjCashInfo.PropertyWithMaxROI = lobjCityItem;
				mobjCashInfo.MaxROI = lobjCityItem.roi;
			}


			mobjProperties.push(lobjCityItem);

			log("findPropertyInformation: isUndevelopedLand=" + lobjCityItem.isUndevelopedLand + '\n' +
					'name=' + lobjCityItem.name + '\n' +
					'baseprice=' + lobjCityItem.baseprice + '\n' +
					'income=' + lobjCityItem.income + '\n' +
					'investable=' + lobjCityItem.investable + '\n' +
					'depend=' + lobjCityItem.depends.name + '\n' +
					'dependsMobSize=' + lobjCityItem.dependsMobSize + '\n' +
					'currentprice=' + lobjCityItem.currentprice + '\n' +
					'nextactualprice=' + lobjCityItem.nextactualprice + '\n' +
					'roi=' + lobjCityItem.roi + '\n' +
					'timetobuy x1=' + lobjCityItem.TimeToBuy(1) + '\n' +
					'timetobuy x5=' + lobjCityItem.TimeToBuy(5) + '\n' +
					'timetobuy x10=' + lobjCityItem.TimeToBuy(10) + '\n' +
					'numberowned=' + lobjCityItem.numberowned, 50);

		}
	}

	//land bank only consists of property where number-owned is 10.
	for (var i=0; i < mobjProperties.length; i++ ) {

		if ( (mobjProperties[i].isUndevelopedLand==1) && (mobjProperties[i].numberowned==10) ) {
			mobjCashInfo.LandBankValue += (mobjProperties[i].currentprice/2) * mobjProperties[i].numberowned;
			log('findPropertyInformation: mobjCashInfo.LandBankValue updated... ' + mobjCashInfo.LandBankValue, 10);
		}
	}

}

function GetCashData() {

	var lobjTemp = xpath("//table[@id='app16421175101_stats_table']/tbody/tr/td/a/strong");
	var lobjTemp2 = lobjTemp.snapshotItem(0).innerHTML.match(/>(.+)$/);
	if (lobjTemp2) {
		mobjCashInfo.Cash=convertCurrencyToNumeric(lobjTemp2[1]);
	} else {
		mobjCashInfo.Cash=0;
		log('GetCashData: Cannot determine cash', 100);
	}
	log('GetCashData: mobjCashInfo.Cash=' + mobjCashInfo.Cash, 10);

	lobjTemp = xpath("//td[@id='app16421175101_content_row']/div[2]/strong");
	
	// after we purchase property, the new div indicating what we bought shifts things
	// over... so if we can't find the <strong> tag in div[2], try checking div[3]
	
	if (lobjTemp.snapshotLength == 0) {
		lobjTemp = xpath("//td[@id='app16421175101_content_row']/div[3]/strong");
	}

	lobjTemp2 = lobjTemp.snapshotItem(0).innerHTML.match(/>(.+)$/);
	if (lobjTemp2) {
		mobjCashInfo.CashFlow=convertCurrencyToNumeric(lobjTemp2[1]);
	} else {
		mobjCashInfo.CashFlow=0;
		log('GetCashData: Cannot determine cash flow', 100);
	}
	log('GetCashData: mobjCashInfo.CashFlow=' + mobjCashInfo.CashFlow, 10);

	
	lobjTemp = xpath("//td[@id='app16421175101_content_row']/div[2]");

	// after we purchase property, the new div indicating what we bought shifts things
	// over... unlike the check above, we don't have the luxury of the strong tag here...
	// so snapshotLength will be >0 for the div[2] check, even though we want to look
	// at div[3] after purchases.  So let's use the regex to see if we find our match.
	
	var lobjEarningsResult = lobjTemp.snapshotItem(0).innerHTML.match(/every (\d+) minutes.[\s]*Next paid in: (\d+) minute/);

	if (!lobjEarningsResult) {
		lobjTemp = xpath("//td[@id='app16421175101_content_row']/div[3]");
		lobjEarningsResult = lobjTemp.snapshotItem(0).innerHTML.match(/every (\d+) minutes.[\s]*Next paid in: (\d+) minute/);
	}
	
	if (lobjEarningsResult) {
		mobjCashInfo.FoundEarningRate=1;
		mobjCashInfo.EarningRateInMinutes=parseInt(lobjEarningsResult[1]);
		mobjCashInfo.NextPaidInMinutes=parseInt(lobjEarningsResult[2]);
	} else {
		mobjCashInfo.FoundEarningRate=0;
		mobjCashInfo.EarningRateInMinutes=0;
		mobjCashInfo.NextPaidInMinutes=0;
		log('GetCashData: Cannot determine EarningRateInMinutes/NextPaidInMinutes', 100);
	}
	log('GetCashData: mobjCashInfo.EarningRateInMinutes=' + mobjCashInfo.EarningRateInMinutes, 10);
	log('GetCashData: mobjCashInfo.NextPaidInMinutes=' + mobjCashInfo.NextPaidInMinutes, 10);

	lobjTemp = xpath("//td[@id='app16421175101_banner_row']/a");
	var lobjCrewSizeResult = lobjTemp.snapshotItem(0).innerHTML.match(/(\d+)/);
	if (lobjCrewSizeResult) {
		mobjCashInfo.MobSize=parseInt(lobjCrewSizeResult[1]);
	} else {
		mobjCashInfo.MobSize=0;
		log('GetCashData: Cannot determine MobSize', 100);
	}
	log('GetCashData: mobjCashInfo.MobSize=' + mobjCashInfo.MobSize, 10);


}





function SetupHTML() {

	var lobjHTML = new Array();
	
	lobjHTML.push('<table cellspacing="0" id="MWNBB"><tr><td>Establishment</td><td>Owned</td><td>ROI</td><td id="ZZNextBestBuyNAPHeader">Actual Price (x1)</td></tr>');

	var lstrPreviousPropertyType = '';
	var lstrExtraStyle = '';
	var lintRowWithMaxROI = 0;
	var lstrName = '';
	
	for (var i = 0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			lstrExtraStyle = (mobjProperties[i].subtype == lstrPreviousPropertyType) ? "" : " style='border-top:1px dotted #000000;'";
			
			lstrName = mobjProperties[i].name;
			//+ ((mobjProperties[i].depends=='') ? '' : mobjProperties[i].depends.name);
			if (mobjProperties[i].depends!='') {
				var words = mobjProperties[i].depends.name.split(" "); 
				for (var j=0 ; j < words.length ; j++){ 
					words[j] = words[j].substr(0,1);
				} 
				lstrName += ' (' + words.join("") + ')'; 

			}
			
			lobjHTML.push(
				'<tr id="ZZNextBestBuyPropertyRow' + i +'">'
				+ '<td' + lstrExtraStyle + '>' + lstrName + '</td>'
				+ '<td' + lstrExtraStyle + ' class="ZZNextBestBuyRightAlign">' + mobjProperties[i].numberowned + '</td>'
				+ '<td' + lstrExtraStyle + ' class="ZZNextBestBuyRightAlign" id="ZZNextBestBuyROI' + i + '">' + mobjProperties[i].roi.toFixed(4) + '</td>'
				+ '<td' + lstrExtraStyle + ' class="ZZNextBestBuyRightAlign" id="ZZNextBestBuyNAP' + i + '">' + formatCurrency(mobjProperties[i].nextactualprice) + '</td>'
				+ '</tr>');
			
			lstrPreviousPropertyType = mobjProperties[i].subtype;
			
			if (mobjProperties[i].name == mobjCashInfo.PropertyWithMaxROI.name) {
				lintRowWithMaxROI = i;
			}
		}
	}

	lobjHTML.push("<tr><td colspan='4' class='ZZNextBestBuyRightAlign'><button type='button' id='btnShowOne'>x1</button><button type='button' id='btnShowFive'>x5</button><button type='button' id='btnShowTen'>x10</button></td></tr>");

	lobjHTML.push("<tr><td colspan='4'><hr /></td></tr>");

	lobjHTML.push("<tr><td colspan='2'>Cash</td><td colspan='2' class='ZZNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.Cash) + "</td></tr>");
	lobjHTML.push("<tr><td colspan='2'>Land Bank</td><td colspan='2' class='ZZNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.LandBankValue) + "</td></tr>");

	lobjHTML.push("</table>");


	var lobjDiv = document.createElement('div');
	lobjDiv.id = 'ZZNextBestBuy';
	document.body.insertBefore(lobjDiv, document.body.lastChild);
	lobjDiv.innerHTML = lobjHTML.join('\n');
	lobjHTML.length = 0;

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "#ZZNextBestBuy { z-index: 10; position:fixed; top:27px; right:2px; border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold;} .ZZNextBestBuyRightAlign { text-align: right;} table#MWNBB td {padding-left:7px;}";
	document.getElementsByTagName('head')[0].appendChild(style);


	mobjCoreColor = document.getElementById('ZZNextBestBuyNAPHeader').style.color;
	document.getElementById('ZZNextBestBuyNAPHeader').innerHTML = "<a href='#' id='ToggleNAPMoneyVsTime'>z</a>";


	var lobjPropertyRow = document.getElementById('ZZNextBestBuyPropertyRow'+lintRowWithMaxROI);
	lobjPropertyRow.style.color='red';



}


function updateTable(pintNumberOfUnitsAtATime) {
	
	log('updateTable: Looking at ' + pintNumberOfUnitsAtATime + ' units at a time', 50);
	GM_setValue('MWUnitsAtATime', pintNumberOfUnitsAtATime);

	var lblnGetPriceInsteadOfTimeToBuy = GM_getValue('MWGetPrice', 1); //default to 1

	for (var i=0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			if (lblnGetPriceInsteadOfTimeToBuy) {
				document.getElementById('ZZNextBestBuyNAP' + i).innerHTML = formatCurrency(mobjProperties[i].nextactualprice * pintNumberOfUnitsAtATime);
			} else {
				document.getElementById('ZZNextBestBuyNAP' + i).innerHTML =  mobjProperties[i].TimeToBuy(pintNumberOfUnitsAtATime);
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


window.addEventListener( 'load', function( e ) {

	GetCashData();
	findPropertyInformation();
	SetupHTML();

	for (var i = 0; i < mobjProperties.length; i++) {
		log("item id=" + mobjProperties[i].item_id + '\n' +
		"subtype=" + mobjProperties[i].subtype + '\n' +
		'name=' + mobjProperties[i].name + '\n' +
		'baseprice=' + mobjProperties[i].baseprice + '\n' +
		'income=' + mobjProperties[i].income + '\n' +
		'investable=' + mobjProperties[i].investable + '\n' +
		'depend=' + mobjProperties[i].depends.name + '\n' +
		'dependsMobSize=' + mobjProperties[i].dependsMobSize + '\n' +
		'currentprice=' + mobjProperties[i].currentprice + '\n' +
		'nextactualprice=' + mobjProperties[i].nextactualprice + '\n' +
		'roi=' + mobjProperties[i].roi + '\n' +
		'timetobuy x1=' + mobjProperties[i].TimeToBuy(1) + '\n' +
		'timetobuy x5=' + mobjProperties[i].TimeToBuy(5) + '\n' +
		'timetobuy x10=' + mobjProperties[i].TimeToBuy(10) + '\n' +
		'numberowned=' + mobjProperties[i].numberowned, 100);
	}

	document.getElementById('btnShowOne').addEventListener('click', function(){updateTable(1);}, false);
	document.getElementById('btnShowFive').addEventListener('click', function(){updateTable(5);}, false);
	document.getElementById('btnShowTen').addEventListener('click', function(){updateTable(10);}, false);

	document.getElementById('ToggleNAPMoneyVsTime').addEventListener('click', function(){togglePriceVsTimeToBuy();}, false);

	var lintNumberOfUnitsAtATime = GM_getValue('MWUnitsAtATime', 1); //default to 1
	updateTable(lintNumberOfUnitsAtATime);

	var lobjQtyDropdowns = Utils.xpath("//select[@name='amount']");
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

	
},false);