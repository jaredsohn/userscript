// ==UserScript==
// @name           Mafia Wars Next Best Buy
// @namespace      http://apps.facebook.com/inthemafia/
// @description    Improves Mafia Wars experience by helping identify the next best buy for your city properties.
// @version        0.02
// @date           2008-12-07
// @creator        Dave Wong
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==

/*

History
-------
   12/07/08 - Created
   02/07/09 - Fixed bug where clicking on the reload was increasing the land bank each time, 
              which threw off all subsequent calculations and required page reload to correct
   02/08/09 - Fixed highlighting of correct Max ROI property for load/hide click (the old ROI
              previously remained highlighted)
   02/19/09 - Included dressen's fix for the new Mafia Wars layout change (property protection etc)
              (http://userscripts.org/users/81305) - Thanks!
            - Also added code to change all <select> dropdowns to 10 (if possible) to make
              buying/selling in 10s easier.  The <select> changes are done when (re)load/hide is clicked
   03/23/09 - More fixes from dressen to handle more Zynga changes
   04/06/09 - Enhancement provided by dybrn. Added ability to buy via the menu.
*/

function log(message) {
	//GM_log(message);
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
    this.buybutton = '';
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

function findPropertyInformation() {
	
	//clear out the array so subsequent property-info loads don't just get appended...
	mobjProperties = [];
	
	// lobjProperties = xpath("//td[@id='app10979261223_content_row']");

	lobjProperties = xpath("//td[@id='app10979261223_content_row']/table[@class='main_table']/tbody/tr");
	var lblnLookingAtUndevelopedSpaces = 0;

	//reset max ROI
	mobjCashInfo.MaxROI = 0;
	
	for (var i=0; i < lobjProperties.snapshotLength; i++)
	{

    //log('Dump: ' + lobjProperties.snapshotItem(i).innerHTML);
    //alert(lobjProperties.snapshotItem(i).innerHTML);
	
	//var rand_no = Math.ceil(10000*Math.random())
    //var currPropID = "buy_"+ rand_no;
    var currPropID = "buy_"+i;
    


		if(/>Undeveloped Space<\/th>/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			//log( 'Starting undeveloped spaces: ' + i );
			lblnLookingAtUndevelopedSpaces = 1;
		}

		if(/>Properties<\/th>/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			//log( 'Starting properties: ' + i );
			lblnLookingAtUndevelopedSpaces = 0;
		}

		if(/prop_[\w\d]+\.jpg/.test(lobjProperties.snapshotItem(i).innerHTML)) {
			var lobjCityItem = new Cityitem();
			
			var lstrCurrentRowXpath = "//td[@id='app10979261223_content_row']/table[@class='main_table']/tbody/tr[" + (i+1) + "]/";

			if (lblnLookingAtUndevelopedSpaces == 1)
				var lobjTemp = xpath(lstrCurrentRowXpath + "td[2]/div/strong");
			else
				var lobjTemp = xpath(lstrCurrentRowXpath + "td[2]/strong | " + lstrCurrentRowXpath + "td[2]/div/strong");

			lobjCityItem.name = lobjTemp.snapshotItem(0).innerHTML;
			lobjCityItem.income = convertCurrencyToNumeric( lobjTemp.snapshotItem(1).innerHTML );

		    lobjTemp = xpath(lstrCurrentRowXpath +"td[3]/table/tbody/tr[1]/td[2]/form/table/tbody/tr[1]/td[2]/span");
		    if (lobjTemp.snapshotLength > 0) {
                var buyButtonHTML = lobjTemp.snapshotItem(0).innerHTML;
                //alert('before: '+ lobjTemp.snapshotItem(0).innerHTML);
                buyButtonHTML = buyButtonHTML.replace("input", "input id=\""+ currPropID +"\"");
                //Add an ID tag to the existing buy button since one does not exist. This will allow us to hook into it when the user clicks our buy button.
                lobjTemp.snapshotItem(0).innerHTML = buyButtonHTML;
                //alert('after: '+ lobjTemp.snapshotItem(0).innerHTML);
    	        
    	        //Now create our button which will click the exisiting button.
    		    //lobjCityItem.buybutton = currPropID +"";
                lobjCityItem.buybutton = "<input style=\"height:10;\" type=\"button\" value=\"Buy\" onclick=\"document.getElementById(\'"+ currPropID+"\').click()\">";
		    }		


			lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[1]/td[1]");
			if (lobjTemp.snapshotLength > 0) {
				
				var lstrDependencyInfo = lobjTemp.snapshotItem(0).innerHTML;
				var lobjMobSizeDependency = lstrDependencyInfo.match(/<strong>(\d+)<\/strong>/);
				if ( lobjMobSizeDependency ) {
					lobjCityItem.dependsMobSize = parseInt(lobjMobSizeDependency[1]);
				} else {
					lobjCityItem.dependsMobSize = 0;
				}
				
				var lobjPropertyDependency = lstrDependencyInfo.match(/Built On: ([\w\s]+)<br>/);

				//might have this dependency div, but might not actually have a dependency - eg Louie's Deli
				if ( lobjPropertyDependency ) {
					//lobjCityItem.depends = lobjPropertyDependency[1];
					//log('depinfo=' + lstrDependencyInfo);
					//log("dependency: " + lobjPropertyDependency[1]);


					for (j=0; j < mobjProperties.length; j++) {

						if (mobjProperties[j].name.startsWith( lobjPropertyDependency[1])) {
							lobjCityItem.depends = mobjProperties[j];
							break;
						}

					}


				}
			}

			if (lblnLookingAtUndevelopedSpaces == 1) {
				lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[1]/td/strong");
				log('price = ' + lobjTemp.snapshotItem(0).innerHTML);
				lobjCityItem.currentprice = convertCurrencyToNumeric( lobjTemp.snapshotItem(0).innerHTML );

				lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[2]/td");
				log('owned = ' + lobjTemp.snapshotItem(0).innerHTML);
				result = lobjTemp.snapshotItem(0).innerHTML.match(/Owned: (\d+)/);
				lobjCityItem.numberowned = parseInt(result[1]);
			} else {
				
				lobjTemp = xpath(lstrCurrentRowXpath + "td[2]/div[1]/strong[2]");
				if (lobjTemp.snapshotLength > 0) {
					result = lobjTemp.snapshotItem(0).innerHTML.match(/x(\d+) Owned/);
					lobjCityItem.numberowned = parseInt(result[1]);					
					log('owned = ' + lobjCityItem.numberowned);
				}
				
				lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[1]/td[1]/strong[@class='money']"); 
				if (lobjTemp.snapshotLength > 0) {
					lobjCityItem.currentprice = convertCurrencyToNumeric(lobjTemp.snapshotItem(0).innerHTML );
					log('price = ' + lobjCityItem.currentprice);
				}		
				var currPropID = 1;
//				lobjTemp = xpath(lstrCurrentRowXpath + "td[3]/table/tbody/tr[1]/td[4]/span/input[@class='sexy_cash']"); 
//				if (lobjTemp.snapshotLength > 0) {
//					lobjCityItem.buybutton = "<a href='' onClick='buyproperty(" + currPropID +")'>"+ currPropID +"</a>";
//					log('price = ' + lobjCityItem.currentprice);
//				}		
				
			}


			lobjCityItem.isUndevelopedLand = lblnLookingAtUndevelopedSpaces
			
			lobjCityItem.baseprice = lobjCityItem.currentprice * 10 / (lobjCityItem.numberowned + 10);
			lobjCityItem.nextactualprice = (lobjCityItem.depends=='') ? lobjCityItem.currentprice : lobjCityItem.currentprice + lobjCityItem.depends.baseprice;
			
			//some properties can't be bought... like Louie's Deli
			lobjCityItem.roi = (lobjCityItem.nextactualprice==0)? 0: ( lobjCityItem.income / lobjCityItem.nextactualprice ) * 1000;

			//for now, don't invest in undeveloped land - as of my early experience, 
			//all of it is needed for establishments... also, only invest in things that can be bought...
			lobjCityItem.investable = (lobjCityItem.isUndevelopedLand==0) && (lobjCityItem.roi > 0);
			
			if ( mobjCashInfo.MobSize < lobjCityItem.dependsMobSize ) {
				lobjCityItem.investable = 0;
				log('skipping ' + lobjCityItem.name + ', mob size requirement=' + lobjCityItem.dependsMobSize + ', my mob size=' + mobjCashInfo.MobSize );
			}

			//if (lobjCityItem.roi > mobjCashInfo.MaxROI && lobjCityItem.investable && (lobjCityItem.subtype=="E" || (lobjCityItem.subtype=='U' && lobjCityItem.numberowned>10) ) ) {
			if (lobjCityItem.roi > mobjCashInfo.MaxROI && lobjCityItem.investable ) {
				log("i=" + i + '\n' +
					"property=" + lobjCityItem.name + '\n' +
					"item ROI=" + lobjCityItem.roi + '\n' +
					"prev max ROI=" + mobjCashInfo.MaxROI);
				mobjCashInfo.PropertyWithMaxROI = lobjCityItem;
				mobjCashInfo.MaxROI = lobjCityItem.roi;
			}


			mobjProperties.push(lobjCityItem);

			log("isUndevelopedLand=" + lobjCityItem.isUndevelopedLand + '\n' +
					'buybutton=' + lobjCityItem.buybutton +'\n' +
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
					'numberowned=' + lobjCityItem.numberowned);

		}
	}

	//land bank only consists of property where number-owned is 10.
	mobjCashInfo.LandBankValue = 0;
	for (var i=0; i < mobjProperties.length; i++ ) {

		if ( (mobjProperties[i].isUndevelopedLand==1) && (mobjProperties[i].numberowned==10) ) {
			mobjCashInfo.LandBankValue += (mobjProperties[i].currentprice/2) * mobjProperties[i].numberowned;
		}
	}

}

function GetCashData() {

	/*
	lobjTemp = xpath("//td[@id='app10979261223_content_row']/div[@class='title']/span[@class='title_action']/span[@class='good']");
	mintIncome = convertCurrencyToNumeric( lobjTemp.snapshotItem(0).innerHTML);

	lobjTemp = xpath("//td[@id='app10979261223_content_row']/div[@class='title']/span[@class='title_action']/span[@class='bad']");
	mintUpkeep = convertCurrencyToNumeric( lobjTemp.snapshotItem(0).innerHTML);
	*/

	lobjTemp = xpath("//td[@id='app10979261223_content_row']/div[2]/span"); //span1=cash flow, span2=xx min (next paid)
	mobjCashInfo.CashFlow = convertCurrencyToNumeric( lobjTemp.snapshotItem(0).innerHTML);
	
	
	var lstrCash = xpath("//strong[@id='app10979261223_user_cash']").snapshotItem(0).innerHTML;
	mobjCashInfo.Cash = convertCurrencyToNumeric(lstrCash);
	
	var lobjEarningsResult = lobjTemp.snapshotItem(1).innerHTML.match(/(\d+) minute/);

	if (lobjEarningsResult) {

		mobjCashInfo.NextPaidInMinutes=parseInt(lobjEarningsResult[1]);

	}

	lobjTemp = xpath("//td[@id='app10979261223_content_row']/div[2]"); //every x min
	lobjEarningsResult = lobjTemp.snapshotItem(0).innerHTML.match(/every (\d+) minute/);

	if (lobjEarningsResult) {

		mobjCashInfo.FoundEarningRate=1;
		mobjCashInfo.EarningRateInMinutes=parseInt(lobjEarningsResult[1]);

	}



	var lobjMafiaInfo = Utils.getElementsByClassName('mafia_link')[0];
	if (lobjMafiaInfo) {
		
		var lobjMafiaInfoResult = lobjMafiaInfo.innerHTML.match(/>(\d+)</);

		if (lobjMafiaInfoResult) {
		
			mobjCashInfo.MobSize=parseInt(lobjMafiaInfoResult[1]);

		}

	}

}





function SetupHTML() {

	//does the table already exist?
	var lobjNBBTable = document.getElementById( 'MafiaWarsNextBestBuyPropertyTable' );
	if (lobjNBBTable) {
		// do we want to do any resetting here?
		lobjNBBTable.parentNode.removeChild(lobjNBBTable);
		//alert('removed child table');
	} 

	var lobjHTML = new Array();

	lobjHTML.push('<table cellspacing="0" id="MWNBB"><tr><td>Action</td><td>Property</td><td>Owned</td><td>ROI</td><td id="MafiaWarsNextBestBuyNAPHeader">Actual Price (x1)</td></tr>');

	var lstrPreviousPropertyType = '';
	var lstrExtraStyle = '';

	for (var i = 0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			lstrExtraStyle = (mobjProperties[i].subtype == lstrPreviousPropertyType) ? "" : " style='border-top:1px dotted #000000;'";

			lobjHTML.push(
				'<tr id="MafiaWarsNextBestBuyPropertyRow' + i +'">'
				+ '<td' + lstrExtraStyle + '>' + mobjProperties[i].buybutton + '</td>'
				+ '<td' + lstrExtraStyle + '>' + mobjProperties[i].name + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MafiaWarsNextBestBuyRightAlign">' + mobjProperties[i].numberowned + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MafiaWarsNextBestBuyRightAlign" id="MafiaWarsNextBestBuyROI' + i + '">' + mobjProperties[i].roi.toFixed(4) + '</td>'
				+ '<td' + lstrExtraStyle + ' class="MafiaWarsNextBestBuyRightAlign" id="MafiaWarsNextBestBuyNAP' + i + '">' + formatCurrency(mobjProperties[i].nextactualprice) + '</td>'
				+ '</tr>');

			lstrPreviousPropertyType = mobjProperties[i].subtype;
		}
	}

	lobjHTML.push("<tr><td colspan='5' class='MafiaWarsNextBestBuyRightAlign'><button type='button' id='btnShowOne'>x1</button><button type='button' id='btnShowFive'>x5</button><button type='button' id='btnShowTen'>x10</button></td></tr>");

	lobjHTML.push("<tr><td colspan='5'><hr /></td></tr>");

	lobjHTML.push("<tr><td colspan='3'>Cash</td><td colspan='2' class='MafiaWarsNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.Cash) + "</td></tr>");
	lobjHTML.push("<tr><td colspan='3'>Land Bank</td><td colspan='2' class='MafiaWarsNextBestBuyRightAlign'>" + formatCurrency(mobjCashInfo.LandBankValue) + "</td></tr>");

	lobjHTML.push("</table>");

	var lobjPropertyTable = document.createElement('div');
	lobjPropertyTable.id = 'MafiaWarsNextBestBuyPropertyTable';
	lobjPropertyTable.innerHTML = lobjHTML.join('\n');
	lobjHTML.length = 0;

	var lobjDiv = document.getElementById( 'MafiaWarsNextBestBuy' );
	lobjDiv.appendChild(lobjPropertyTable);


	mobjCoreColor = document.getElementById('MafiaWarsNextBestBuyNAPHeader').style.color;
	document.getElementById('MafiaWarsNextBestBuyNAPHeader').innerHTML = "<a href='#' id='ToggleNAPMoneyVsTime'>z</a>";

	highlightMaxROI();

	document.getElementById('btnShowOne').addEventListener('click', function(){updateTable(1);}, false);
	document.getElementById('btnShowFive').addEventListener('click', function(){updateTable(5);}, false);
	document.getElementById('btnShowTen').addEventListener('click', function(){updateTable(10);}, false);

	document.getElementById('ToggleNAPMoneyVsTime').addEventListener('click', function(){togglePriceVsTimeToBuy();}, false);

	var lintNumberOfUnitsAtATime = GM_getValue('MWUnitsAtATime', 1); //default to 1
	updateTable(lintNumberOfUnitsAtATime);


}

function highlightMaxROI() {
	var lintRowWithMaxROI = 0;

	for (var i = 0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].name == mobjCashInfo.PropertyWithMaxROI.name) {
			lintRowWithMaxROI = i;
			document.getElementById('MafiaWarsNextBestBuyPropertyRow'+i).style.color = mobjCoreColor
		}
	}

	var lobjPropertyRow = document.getElementById('MafiaWarsNextBestBuyPropertyRow'+lintRowWithMaxROI);
	lobjPropertyRow.style.color='red';

}

function updateTable(pintNumberOfUnitsAtATime) {
	
	log('updateTable: Looking at ' + pintNumberOfUnitsAtATime + ' units at a time');
	GM_setValue('MWUnitsAtATime', pintNumberOfUnitsAtATime);

	var lblnGetPriceInsteadOfTimeToBuy = GM_getValue('MWGetPrice', 1); //default to 1

	for (var i=0; i < mobjProperties.length; i++) {
		if (mobjProperties[i].investable) {

			if (lblnGetPriceInsteadOfTimeToBuy) {
				document.getElementById('MafiaWarsNextBestBuyNAP' + i).innerHTML = formatCurrency(mobjProperties[i].nextactualprice * pintNumberOfUnitsAtATime);
			} else {
				document.getElementById('MafiaWarsNextBestBuyNAP' + i).innerHTML =  mobjProperties[i].TimeToBuy(pintNumberOfUnitsAtATime);
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

function checkForPropertiesPage() {

	var lobjTemp = xpath("//td[@id='app10979261223_content_row']/div[@class='title']");
	//log(lobjTemp.snapshotItem(0).innerHTML);
	//log(lobjTemp.snapshotLength);
	
	var lblnShowStuff = 0;
	
	if (lobjTemp.snapshotLength>0) {
		if (/^[\s]*Properties/.test(lobjTemp.snapshotItem(0).innerHTML)) {
			//title innerHTML starts with Properties!

			GetCashData();
			findPropertyInformation();
			SetupHTML();

			log("LandBankValue=" +mobjCashInfo.LandBankValue + '\n' +
				"CashFlow=" +mobjCashInfo.CashFlow + '\n' +
				'Cash=' +mobjCashInfo.Cash + '\n' +
				'FoundEarningRate=' +mobjCashInfo.FoundEarningRate + '\n' +
				'EarningRateInMinutes=' +mobjCashInfo.EarningRateInMinutes + '\n' +
				'NextPaidInMinutes=' +mobjCashInfo.NextPaidInMinutes + '\n' +
				'PropertyWithMaxROI=' +mobjCashInfo.PropertyWithMaxROI.name + '\n' +
				'MobSize=' +mobjCashInfo.MobSize + '\n' +
				'MaxROI=' +mobjCashInfo.MaxROI + '\n');
				
			lblnShowStuff = 1;
			
			highlightMaxROI();


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


		}

	}
	if (lblnShowStuff==0) {
		//not the properties page... let's be nice and allow user to hide the properties box
		var lobjNBBTable = document.getElementById( 'MafiaWarsNextBestBuyPropertyTable' );
		if (lobjNBBTable) {
			// do we want to do any resetting here?
			lobjNBBTable.parentNode.removeChild(lobjNBBTable);
			//alert('removed child table');
		} 

	}
	
	//mobjPropertyCounts = xpath("//table[2]/tbody/tr/td/span/b");
	//mintNumberOfPropertyTypes = mobjPropertyCounts.snapshotLength;
	
	//check again one second later
	//TODO: this seems ridiculous - we should be able to listen for an ajax event
	//window.setTimeout(checkForPropertiesPage, 1000);

}


window.addEventListener( 'load', function( e ) {

	//since everything in Mafia Wars seems to be AJAX driven, I have to look at
	//page content to figure out if I'm on the properties page.
	//checkForPropertiesPage();

	var lobjDiv = document.createElement('div');
	lobjDiv.id = 'MafiaWarsNextBestBuy';
	document.body.insertBefore(lobjDiv, document.body.lastChild);

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "#MafiaWarsNextBestBuy { z-index: 10; position:fixed; top:27px; right:2px; border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold;} .MafiaWarsNextBestBuyRightAlign { text-align: right;} table#MWNBB td {padding-left:7px;}";
	document.getElementsByTagName('head')[0].appendChild(style);

	var lobjLoadInfo = document.createElement('div');
	lobjLoadInfo.id = 'MafiaWarsNextBestBuyLoadInfo';
	lobjDiv.appendChild(lobjLoadInfo);
	
	lobjDiv.innerHTML = "<a id='CheckForPropertiesPage'>(Re)Load/hide Property information</a>";
	document.getElementById('CheckForPropertiesPage').addEventListener('click', function(){checkForPropertiesPage();}, false);
		
	
},false);