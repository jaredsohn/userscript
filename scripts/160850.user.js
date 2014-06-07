// ==UserScript==
// @name           LendingClubAddCommentField
// @namespace      compressedtime.com
// @version        2.25
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle

// @require        http://raw.github.com/ghubcompressedtime/js-deflate/patch-1/rawdeflate.js
// @require        http://raw.github.com/ghubcompressedtime/js-deflate/patch-2/rawinflate.js
// @require        http://raw.github.com/jllodra/dygraphs/UTC/strftime/strftime.js
// @require        http://code.jquery.com/jquery-1.8.3.js
// @require        http://mottie.github.com/tablesorter/js/jquery.tablesorter.js
// @require        http://omnipotent.net/jquery.sparkline/2.0/jquery.sparkline.min.js
// @require        http://raw.github.com/kvz/phpjs/master/functions/strings/sprintf.js
// @require        http://raw.github.com/kvz/phpjs/master/functions/strings/vsprintf.js
// @require        http://raw.github.com/kvz/phpjs/master/functions/strings/sscanf.js

// @include        https://www.lendingclub.com/account/getLenderActivity.action*
// @include        https://www.lendingclub.com/account/loanDetail.action?*
// @include        https://www.lendingclub.com/account/loanPerf.action?*
// @include        https://www.lendingclub.com/account/loans.action*
// @include        https://www.lendingclub.com/account/orderDetails.action*
// @include        https://www.lendingclub.com/account/summary.action*
// @include        https://www.lendingclub.com/browse/addToPortfolio.action*
// @include        https://www.lendingclub.com/browse/browse.action*
// @include        https://www.lendingclub.com/browse/loanDetail.action?*
// @include        https://www.lendingclub.com/foliofn/cancelSellOrder.action*
// @include        https://www.lendingclub.com/foliofn/completeLoanPurchase.action*
// @include        https://www.lendingclub.com/foliofn/confirmLoansForSale*
// @include        https://www.lendingclub.com/foliofn/loanDetail.action?*
// @include        https://www.lendingclub.com/foliofn/loanPerf.action?*
// @include        https://www.lendingclub.com/foliofn/loans.action*
// @include        https://www.lendingclub.com/foliofn/newLoanSearch.action*
// @include        https://www.lendingclub.com/foliofn/purchaseSuccess.action
// @include        https://www.lendingclub.com/foliofn/repriceSelectedNotes.action*
// @include        https://www.lendingclub.com/foliofn/saleSuccess.action
// @include        https://www.lendingclub.com/foliofn/selectLoansForSale.action*
// @include        https://www.lendingclub.com/foliofn/selectNotesToReprice.action*
// @include        https://www.lendingclub.com/foliofn/submitCompleteLoanPurchase.action*
// @include        https://www.lendingclub.com/foliofn/traderStatement.action*
// @include        https://www.lendingclub.com/foliofn/tradingAccount.action*
// @include        https://www.lendingclub.com/foliofn/tradingInventory.action*
// @include        https://www.lendingclub.com/foliofn/yrEndTraderStatement.action*
// @include        https://www.lendingclub.com/portfolio/placeOrder.action*
// @include        https://www.lendingclub.com/portfolio/viewOrder.action*

// @include        file://*/tradingAccount.action*

// ==/UserScript==

// @include        https://www.lendingclub.com/info/*.action*	// for including the extra links on the Statics page, etc.

/**
 * Copyright 2011,2012 Emery Lapinski
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* TODO:

FICO graph, indicate data out of date
loan performance, bring payment plan to main page
compress stroed data for ffn export

 */

var DEBUG = GM_getValue("DEBUG", false);

var GM_log;
if(DEBUG && unsafeWindow.console) {
	GM_log = function()
	{
//		arguments[0] = timeFormat() + ' ' + arguments[0];
		unsafeWindow.console.log.apply(unsafeWindow.console, arguments);	//YYY using "this" was causing problems in chrome
	}
}
else
	GM_log = function(){};

GM_log("lendingclubaddcomments $Revision: 373 $");

var TESTING = GM_getValue("TESTING", false);
GM_log("TESTING=", TESTING);
var SCANBUTTONS = GM_getValue("SCANBUTTONS", true);
GM_log("SCANBUTTONS=", SCANBUTTONS);
var TENDOLLARINTEREST = GM_getValue("TENDOLLARINTEREST", false);
GM_log("TENDOLLARINTEREST=", TENDOLLARINTEREST);
var IRLINKS = GM_getValue("IRLINKS", false);
GM_log("IRLINKS=", IRLINKS);
var LOOKUPBUTTONS = GM_getValue("LOOKUPBUTTONS", true);
GM_log("LOOKUPBUTTONS=", LOOKUPBUTTONS);
var PAYMENTPLANONPERF = GM_getValue("PAYMENTPLANONPERF", true);
GM_log("PAYMENTPLANONPERF=", PAYMENTPLANONPERF);

var COPYVALUEBUTTONS = GM_getValue("COPYVALUEBUTTONS", TESTING);
GM_log("COPYVALUEBUTTONS=", COPYVALUEBUTTONS);
var TRADINGINVETORYPARAMS = GM_getValue("TRADINGINVETORYPARAMS", true);
GM_log("TRADINGINVETORYPARAMS=", TRADINGINVETORYPARAMS);
var AUTOFOLLOWLINK = GM_getValue("AUTOFOLLOWLINK", TESTING);
GM_log("AUTOFOLLOWLINK=", AUTOFOLLOWLINK);
var ORDERLINKONLOANPERF = GM_getValue("ORDERLINKONLOANPERF", TESTING);
GM_log("ORDERLINKONLOANPERF=", ORDERLINKONLOANPERF);
var PRICESINURL = GM_getValue("PRICESINURL", TESTING);
GM_log("PRICESINURL=", PRICESINURL);

var FICODROPPERCENT = GM_getValue("FICODROPPERCENT", .25);

var printStackTrace;
if(DEBUG && unsafeWindow.console) {
	printStackTrace = function(message)
	{
		GM_log("printStackTrace() message=", message);
		
		if(typeof message == 'undefined') message = "stacktrace";

		try
		{
			throw new Error(message);
		}
		catch(ex)
		{
			GM_log("!!!STACK TRACE!!!" + ex.message + "\n" + ex.stack);
		}
	}
}
else
	printStackTrace = function(){};


function DEBUGcall()
{
	GM_log("DEBUGcall() arguments=", Array.prototype.slice.call(arguments));

	var func = arguments[0];
	var arguments2 = Array.prototype.slice.call(arguments, 1);

	var retval = func.apply(this, arguments2);

	GM_log("DEBUGcall() retval=" + retval);

	return retval;
}

function funcname(arguments0)
{
	if(!arguments0 || !arguments0.callee)
		return "anonymous()";

	return arguments0.callee.toString().match(/function (.*?)\(/)[1] + "()";
}

function debug(DEBUG0, arguments0, printArgs)
{
	if(!DEBUG0 || !DEBUG)
		return false;

	if(typeof printArgs == 'undefined') printArgs = true;	// defauly arg

	var FUNCNAME = funcname(arguments0);

	if(arguments0 && arguments0.length > 0 && printArgs)
		GM_log("XXXXXXX " + FUNCNAME, Array.prototype.slice.call(arguments0, 0));	//YYY clone array for GM_log since it might change before we print it
	else
		GM_log("XXXXXXX " + FUNCNAME);

	return FUNCNAME;
}

/*
 * arg0 - name of function or the arguments object
 */
function timestamp(arg0, arg1)
{
	var FUNCNAME;
	if(typeof arg0 == 'string')
		FUNCNAME = arg0;
	else
		FUNCNAME = funcname(arg0);

	var now = new Date().getTime();

	if(typeof arg1 == 'boolean')
	{
		if(arg1 === true)
			timestamp[FUNCNAME] = now;
	}
	else
	{
		if(!timestamp[FUNCNAME])
			GM_log("TIMESTAMP: " + FUNCNAME + " " + arg1 + " now=" + now + "ms");
		else
		{
			var elapsed = now - timestamp[FUNCNAME];
			GM_log("TIMESTAMP: " + FUNCNAME + " " + arg1 + " elapsed=" + elapsed + "ms");
		}
	}
}
	
var MILLISECONDSPERDAY = 24 * 60 * 60 * 1000;

// XXX recalculate to handle case where the script in running a long time?
//XXX need to use date as day before opening of business "tomorrow" (7am PDT?)

function TODAY()
{
	if(typeof TODAY.TODAY0 == 'undefined')
	{
		var today = new Date();
		if(today.getHours() < 7)
			today.setMilliseconds(today.getMilliseconds() - MILLISECONDSPERDAY);

		// trunc to the date
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);

		TODAY.TODAY0 = today;
	}

	return TODAY.TODAY0;
}

function defaultArg(arg, defaultValue)
{
	return typeof arg !== 'undefined' ? arg : defaultValue;
}


/*
 * Examples:
 * <div class="yui-dt-liner">(0.08%)</div>
 * $23.26+3.9%
 * $0.01<br>(1.7m)
 * <div class="yui-dt-liner"><span class="master_pngfix B gradeTextWide">B<span class="gradeNumberB">3</span></span><span class="centerText"> 11.58%</span></div>
 * <div class="yui-dt-liner">--</div>
 * <input class="valid text asking-price" name="asking_price" value="26.0" type="text">
 */
function html2Value(value, debug)
{
var FUNCNAME = funcname(arguments);

	var valueOrig = value;	// remember it in case we have an error later

	if(debug) GM_log(FUNCNAME + " A value=" + value);

	value = value.replace(/<nobr>|<\/nobr>/gi, '');

	if(debug) GM_log("B value=" + value);

	value = value.replace(/.*value="(.*?)".*/, '$1');	// textfield input

	if(debug) GM_log("C value=" + value);


	/* remove extraneous html */
	value = value.replace(/<label>.*?<\/label>/gi, '');	// remove label that we might have added to asking price

	if(debug) GM_log("D value=" + value);

	value = value.replace(/.*?>([-+$\(]*[\d.,]+[%\)]*)<.*/, '$1');	// gotta have some digits in there someplace

	if(debug) GM_log("E value=" + value);

	return text2Value(value, debug);
}

function text2Value(value, debug)
{
var FUNCNAME = funcname(arguments);

	var valueOrig = value;	// remember it in case we have an error later

	if(debug) GM_log(FUNCNAME + " A value=" + value);

	if(value == null)
		return null;

	value = value.trim();

	if(value == "" || value == '--')
		return null;

	/* remove any +xx% or -xx% we might have added, WARNING: can be "+-0%" for 0% */
	value = value.replace(/\+-0%/, '');
	value = value.replace(/[-+][\d\.]+%/, '');

	/* remove any (x.xm) we might have added */
	value = value.replace(/\([\d.]+m\)/, '');
	value = value.replace(/\-[\d.]+m/, '');

	if(debug) GM_log("C value=" + value);

	/* no commas */
	value = value.replace(/,/g, '');

	if(debug) GM_log("D value=" + value);

	/* parentheses to negative */
	value = value.replace(/\((.*)\)/, '-$1');

	if(debug) GM_log("E value=" + value);

	/* no dollar signs */
	value = value.replace(/\$/, '');

	if(debug) GM_log("F value=" + value);

	/* percent to decimal */
	if(value.match(/%/))
	{
		value = value.replace(/%/, '');
		value /= 100;
	}

	if(debug) GM_log("G value=" + value);

//	if(!debug && isNaN(value))
//		return text2Value(valueOrig, true);	// on NaN rerun it with debugging turned on

	value = parseFloat(value);

	if(debug) GM_log(FUNCNAME + " returning value=" + value + " valueOrig=" + valueOrig);

	return value;
}

function text2Date(value)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(value == "--")
		return null;

DEBUG && GM_log(FUNCNAME + " value="+ value+ " typeof value="+ typeof value);

	//XXX adjust for PDT???

	value = sscanf(value, "%d/%d/%d");	// mm/dd/yy
	
	DEBUG && GM_log("BEFORE value=" + value);
	
	--value[0];	// January is 0

	if(value[2] < 2000)
		value[2] += 2000;
	
	DEBUG && GM_log("AFTER value=" + value);

	value = new Date(value[2], value[0], value[1], 0, 0, 0);

	DEBUG && GM_log("value=", value);

	return value;
}

/* WARNING: This changes the date object (unless it returns null) */
function Y2K(date)
{
	if(date == null)
		return null;

	if(date.getTime() == 0)
		return null;

	var year = date.getFullYear();
	if(year < 1970)
    	date.setFullYear(year + 100);

	return date;
}

/*
 * XXX pass variables around in an object and make them local, but it's not working
 */
function obj2eval(obj)
{
var DEBUG = debug(true, arguments);

	var str = sprintf(
		"var ___obj = unescape('%s');" +
		"GM_log('___obj=', ___obj);" +
		"___obj = $.parseJSON(___obj);" +
		"GM_log('___obj=', ___obj);" +
		"",
		escape(JSON.stringify(obj)));

	for(var prop in obj)
	{
		var value = obj[prop];

		if(value instanceof Date)
			str += sprintf("var %s = new Date(___obj.%s);", prop, prop);
		else
			str += sprintf("var %s = ___obj.%s;", prop, prop);
	}

	DEBUG && GM_log("obj2eval() str=" + str);

	return str;
}

function queueTimeoutNull(callback)
{
	queueTimeout(callback, 0, 0);
}

function queueTimeoutPriority(callback)
{
	queueTimeout(callback, -1, true);
}

var QUEUETIMEOUTDELAY = 1;
var queueTimeoutCallbackList = [];
function queueTimeout(callback, delay, priority)
{
	if(typeof delay == 'undefined' || delay < 0) delay = QUEUETIMEOUTDELAY;
	if(typeof priority == 'undefined') priority = false;

	if(priority)
		queueTimeoutCallbackList.unshift(callback);	// priority insert
	else
		queueTimeoutCallbackList.push(callback);

	if(delay == -1)
		queueTimeoutLoop();
	else
		setTimeout(queueTimeoutLoop, delay);	//XXX what's a good value here?
}

function queueTimeoutLoop()
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(queueTimeoutCallbackList.length == 0)
		return;

	var callback = queueTimeoutCallbackList.shift();	// get from the front

	DEBUG && GM_log(FUNCNAME + " callback=", callback);

//	document.body.style.cursor = "wait";
	callback();
//	document.body.style.cursor = "default";

	setTimeout(queueTimeoutLoop, QUEUETIMEOUTDELAY);	//XXX what's a good value here?
}
				
/* tries to optimize the sort by using strings */
function sortOptimizer(arr, toStringFunc, sortFunc, reverseFlag)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	timestamp(FUNCNAME, true);

	//YYY optimize by using strings instead of funcs?
	if(toStringFunc)
	{
		for(var index = 0; index < arr.length; index++)
		{
			var obj = arr[index];

			if(obj.hasOwnProperty('toString'))
				obj.toStringOrig = obj.toString;
			obj.toString = toStringFunc;
		}
	
		timestamp(FUNCNAME, "BEFORE sort 1");
		arr.sort();
		timestamp(FUNCNAME, "AFTER sort 1");

		for(var index = 0; index < arr.length; index++)
		{
			var obj = arr[index];

			if(obj.toStringOrig)
			{
				obj.toString = obj.toStringOrig;
				delete obj.toStringOrig;
			}
			else
				delete obj.toString;
		}
	}
	else
	{
		timestamp(FUNCNAME, "BEFORE sort 2");
		arr.sort(sortFunc); // undefined as argument is the same as no argument, yes?
		timestamp(FUNCNAME, "AFTER sort 2");
	}

	if(reverseFlag)
		arr.reverse();

	timestamp(FUNCNAME, "DONE");
}
							
/**
 * remove extraneous properties from all the objects in an array
 */
function pruneArray(arr, propsToKeep)
{
	for(var index = 0; index < arr.length; index++)
	{
		var obj = arr[index];
		var obj2 = {};
		$.each(propsToKeep, function(index, prop)
		{
			obj2[prop] = obj[prop];
		});
		arr[index] = obj2;
	}
}

function asynceach(funcwithcallback, delaymin, delayrand)
{
	funcwithcallback(function()	// call the func, it will call us back when it's done
	{
		setTimeout(
			function(){ asynceach.apply(this, arguments) },	// loop
			delaymin + Math.random() * delayrand);
	});
}


function ceil2Decimals(val, func)
{
	return round2Decimals(val, Math.ceil);
}

function floor2Decimals(val, func)
{
	return round2Decimals(val, Math.floor);
}

function round2Decimals(val, func)
{
	if(typeof func == 'undefined') func = Math.round;

	return func(val * 100) / 100;
}

function thousands(str)
{
	while(str.match(/\d\d\d\d[\.,]/))
	{
		str = str.replace(/(?:.*)(\d)(\d\d\d[\.,])/, "$1,$2");	// returns original string on failure
	}

	return str;
}

function negative2negative(format, value)
{
	if(value >= 0)
		return sprintf(format, value);
	else
		return '-' + sprintf(format, -value);
}

function negative2parens(format, value)
{
	if(value >= 0)
		return sprintf(format, value);
	else
		return '(' + sprintf(format, -value) + ')';
}

function dateShortFormat(date)
{
	if(typeof date == 'undefined') date = new Date();

	if(date == null)
		return null;

	return sprintf(
		"%d/%d/%d",
		date.getMonth() + 1, date.getDate(), date.getFullYear() % 100);
}

function dateFormat(date)
{
	if(typeof date == 'undefined') date = new Date();

	if(date == null)
		return null;

	return sprintf(
		"%d/%d/%d",
		date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function timeFormat(date)
{
	if(typeof date == 'undefined') date = new Date();

	if(date == null)
		return null;

	return sprintf(
		"%02d:%02d:%02d",
		date.getHours(), date.getMinutes(), date.getSeconds());
}

function dateTimeFormat(date)
{
	if(typeof date == 'undefined') date = new Date();

	if(date == null)
		return null;

	return dateFormat(date) + ' ' + timeFormat(date);
}

/* http://stackoverflow.com/questions/10191941/jquery-unique-on-an-array-of-strings */
function unique(array){
    return $.grep(array,function(el,index){
        return index == $.inArray(el,array);
    });
}

function setStoredValue(id, value)
{	
var DEBUG = debug(false || id == 'term', arguments), FUNCNAME = funcname(arguments);

	value = '' + value;	// stringify

	localStorage.setItem(id, value);

	DEBUG && GM_log(FUNCNAME + " id='" + id + "' localStorage.getItem(" + id + ")=", localStorage.getItem(id));
}

function getStoredValue(id, defaultValue)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);
DEBUG && GM_log(FUNCNAME + " id=" + id + " localStorage.getItem(" + id + ")=", localStorage.getItem(id));

	var value = localStorage.getItem(id);

	DEBUG && GM_log("value=", value);

	if(value == null || value == "undefined")
	{
		DEBUG && GM_log("returning defaultValue=", defaultValue);
		return defaultValue;
	}

	/* if there's a defaultValue cast to that type */
	var typeofdefaultValue = typeof defaultValue;
	if(typeofdefaultValue != 'undefined')	// NOTE: defaultValue could be false here
	{
		DEBUG && GM_log("typeof defaultValue=", typeofdefaultValue);

		value = castToType(value, typeofdefaultValue);
	}

	DEBUG && GM_log("returning value=", value, " typeof vaule=", typeof value);
	return value;
}

function castToType(value, type)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(typeof value == type)
		return value;

DEBUG && GM_log(DEBUG + " value=", value, " type=", type);

	var valueOrig = value;

	if(type == "boolean")
	{
		value = (value == "true");
		DEBUG && GM_log("new value=", value);
	}
	else if(type == "number")
	{
		value = parseFloat(value);
		DEBUG && GM_log("new value=", value);
	}
	else
	{
		GM_log(FUNCNAME + " CASTING ", value, " TO " + type + " UNHANDLED!!!!");
	}

	/*
	 * CAUTION! ("0.05" == 0.05) == true but ("true" == true) == false
	 */
	var equals = ('' + value) == ('' + valueOrig);

	if(!equals)
		GM_log(FUNCNAME + " WARNING!! casting ", valueOrig, " (" + typeof valueOrig + ")" + " TO ", value, " (" + type + ")");

	return value;
}

/*
 * adapted from http://www.8tiny.com/source/phpmyadmin/libraries/PHPExcel/PHPExcel/Calculation/Functions.php.html
 * Calculates the payment for a loan based on constant payments and a constant interest rate.
 * http://office.microsoft.com/en-ca/excel-help/pmt-HP005209215.aspx?CTT=1
 */
function PMT(rate, nper, pv, fv, type)
{
	if(typeof fv == 'undefined') fv = 0;
	if(typeof type == 'undefined') type = 0;

	return (-fv - pv * Math.pow(1 + rate, nper)) / (1 + rate * type) / ((Math.pow(1 + rate, nper) - 1) / rate);
}

function _interestAndPrincipal(rate, per, nper, pv, fv, type)
{
var DEBUG = debug(false, arguments);

	if(typeof rate == 'undefined') rate = 0;
	if(typeof per == 'undefined') per = 0;
	if(typeof nper == 'undefined') nper = 0;
	if(typeof pv == 'undefined') pv = 0;
	if(typeof fv == 'undefined') fv = 0;
	if(typeof type == 'undefined') type = 0;

	var pmt = PMT(rate, nper, pv, fv, type);

	var interest = 0, principal = 0;
	var capital = pv;
	for(var count = 1; count <= per; count++)
	{
		interest = (type && count == 0) ? 0 : -capital * rate;
        principal = pmt - interest;
        capital += principal;
	}

	DEBUG && GM_log("_interestAndPrincipal() returning interest=", interest, " principal=", principal);

	return [interest, principal];
}

/*
 * Returns the number of periods for a cash flow with constant periodic payments (annuities), and interest rate.
 * From http://www.8tiny.com/source/phpmyadmin/nav.html?libraries/PHPExcel/PHPExcel/Calculation/Functions.php.html
 */
/*YYY this wrong syntax ff ignores but causes unhelpful "Unexpected token =" error message in chrome
function NPER(rate = 0, pmt = 0, pv = 0, fv = 0, type = 0)	
*/
function NPER(rate, pmt, pv, fv, type)
{
var DEBUG = debug(false, arguments);

	if(typeof rate == 'undefined') rate = 0;
	if(typeof pmt == 'undefined') pmt = 0;
	if(typeof pv == 'undefined') pv = 0;
	if(typeof fv == 'undefined') fv = 0;
	if(typeof type == 'undefined') type = 0;

	if(rate != 0)
	{
		if(pmt == 0 && pv == 0)
			throw "pmt=" + pmt + " pv=" + pv;

		var value =
			Math.log((pmt * (1 + rate * type) / rate - fv) / (pv + pmt * (1 + rate * type) / rate))
				/ Math.log(1 + rate);

		DEBUG && GM_log("1 value=", value);
		return value;
	}
	else
	{
		if(pmt == 0)
			throw "rate=" + rate + " pmt=" + pmt;

		var value = (-pv - fv) / pmt;
		DEBUG && GM_log("2 value=", value);
		return value;
	}
}

/*
 * Returns the interest payment for a given period for an investment based on periodic, constant payments and a constant interest rate.
 * http://office.microsoft.com/en-ca/excel-help/ipmt-HP005209145.aspx?CTT=1
 */
function IPMT(rate, per, nper, pv, fv, type)
{
	if(typeof fv == 'undefined') fv = 0;
	if(typeof type == 'undefined') type = 0;

	if(type != 0 && type != 1)
	{
		printStackTrace("type=" + type + ", per=" + per + " nper=" + nper + " rate=" + rate + " pv=" + pv + " fv=" + fv);
		throw "type=" + type + ", per=" + per + " nper=" + nper + " rate=" + rate + " pv=" + pv + " fv=" + fv;
	}

	if(per <= 0 || per > nper)
	{
		printStackTrace("per=" + per + " nper=" + nper + ", rate=" + rate + " pv=" + pv + " fv=" + fv + " type=" + type);
		throw "per=" + per + " nper=" + nper + ", rate=" + rate + " pv=" + pv + " fv=" + fv + " type=" + type;
	}

	return _interestAndPrincipal(rate, per, nper, pv, fv, type)[0];
}

/*
 * Returns the payment on the principal for a given period for an investment based on periodic, constant payments and a constant interest rate.
 * http://office.microsoft.com/en-ca/excel-help/ppmt-HP005209218.aspx?CTT=1
 */
function PPMT(rate, per, nper, pv, fv, type)
{
	if(typeof fv == 'undefined') fv = 0;
	if(typeof type == 'undefined') type = 0;
	
	if(type != 0 && type != 1)
		throw "type=" + type;

	if(per <= 0 || per > nper)
	{
		printStackTrace("per=" + per + " nper=" + nper + ", rate=" + rate + " pv=" + pv + " fv=" + fv + " type=" + type);
		throw "per=" + per + " nper=" + nper + ", rate=" + rate + " pv=" + pv + " fv=" + fv + " type=" + type;
	}

	return _interestAndPrincipal(rate, per, nper, pv, fv, type)[1];
}

/*
 * Returns the cumulative principal paid on a loan between start_period and end_period.
 * http://office.microsoft.com/en-ca/excel-help/cumprinc-HP005209039.aspx
 */
function CUMPRINC(rate, nper, pv, start, end, type)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(typeof type == 'undefined') type = 0;
	if(typeof end == 'undefined') end = nper;

	if(type != 0 && type != 1)
		throw "type=" + type;
	
	if(start < 1 || start > end) 
	{
		printStackTrace(FUNCNAME + " start=" + start + " end=" + end);
		throw FUNCNAME + " start=" + start + " end=" + end;
	}

	var principal = 0;
	var interest = 0;
	for(var per = start; per <= end; ++per) 
	{
		var ppmt;

		principal += ppmt = PPMT(rate, per, nper, pv, 0, type);

		var ipmt;

		interest += ipmt = IPMT(rate, per, nper, pv, 0, type);
		
		DEBUG && GM_log("per=", per, " ppmt=", ppmt, " ipmt=", ipmt);
	}

	return principal;
}

/*
 * http://www.8tiny.com/source/phpmyadmin/nav.html?libraries/PHPExcel/PHPExcel/Calculation/Functions.php.html
 * Returns the cumulative interest paid on a loan between start_period and end_period.
 */
function CUMIPMT(rate, nper, pv, start, end, type) 
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(typeof type == 'undefined') type = 0;
	if(typeof end == 'undefined') end = nper;

	if(type != 0 && type != 1)
		throw "type=" + type;

	if(start < 1 || start > end) 
	{
		printStackTrace(FUNCNAME + " start=" + start + " end=" + end);
//		throw FUNCNAME + " start=" + start + " end=" + end;
		return null;
	}

	var interest = 0;
	for (var per = start; per <= end; ++per) {
		var ipmt;

		interest += ipmt = IPMT(rate, per, nper, pv, 0, type);
		
//		DEBUG && GM_log("per=", per, " ipmt=", ipmt);
	}

	return interest;
}
  
  
function IRR(principal, accruedInterest, paymentAmount, interestRate, price)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(principal <= 0) 
	{
		printStackTrace(FUNCNAME + " principal=" + principal);
//		throw FUNCNAME + " principal=" + principal;
		return -1;
	}
	if(paymentAmount <= 0)
	{
		printStackTrace(FUNCNAME + " paymentAmount=" + paymentAmount);
//		throw FUNCNAME + " paymentAmount=" + paymentAmount;
		return null;
	}

	var interestRate = interestRate / 12;	// per period

	var discountRateLeft = -10;	// per period
	var discountRateRight = 10;	// per period

	var npvLeft = NPV(principal, accruedInterest, paymentAmount, interestRate, discountRateLeft) - price;
	var npvRight = NPV(principal, accruedInterest, paymentAmount, interestRate, discountRateRight) - price;

	for(var count = 0; true; count++)
	{
		DEBUG && GM_log("count=", count);
		DEBUG && GM_log(" discountRateLeft=", discountRateLeft * 12,  "  npvLeft=", npvLeft);
		DEBUG && GM_log("discountRateRight=", discountRateRight * 12, " npvRight=", npvRight);

		if(isNaN(npvLeft) || isNaN(npvRight))
		{
			GM_log(FUNCNAME + " !!!NaN!!!, count=", count);
			GM_log("arguments=", arguments);
			GM_log("npvLeft=", npvLeft, " npvRight=", npvRight);
			GM_log("discountRateLeft=", discountRateLeft * 12, " discountRateRight=", discountRateRight * 12);
			return null;
		}

		if(npvLeft * npvRight > 0)	// same sign, we made a mistake
		{
			GM_log(FUNCNAME + " npvLeft and npvRight SAME SIGN, count=", count);
			GM_log("arguments=", arguments);
			GM_log("npvLeft=", npvLeft, " npvRight=", npvRight);
			GM_log("discountRateLeft=", discountRateLeft * 12, " discountRateRight=", discountRateRight * 12);
			return null;
		}

		var rateDiff = discountRateRight - discountRateLeft;
		var npvDiff = npvLeft - npvRight;

		if(count > 30 || Math.abs(rateDiff) < 0.0001 || Math.abs(npvDiff) < 0.0001)	// close enough
		{
			DEBUG && GM_log("rateDiff=", rateDiff);
			DEBUG && GM_log("npvDiff=", npvDiff);
			return discountRateLeft * 12;	// per period * 12 = yearly
		}

		var discountRateMid = (discountRateLeft + discountRateRight) / 2;
		var npvMid = NPV(principal, accruedInterest, paymentAmount, interestRate, discountRateMid) - price;

		DEBUG && GM_log("discountRateMid=", discountRateMid * 12, " npvMid=", npvMid);

		// adjust one of the guesses
		if(npvMid * npvRight > 0)	// same sign
		{
			DEBUG && GM_log("adjusting right end");
			discountRateRight = discountRateMid;
			npvRight = npvMid;
		}
		else
		{
			DEBUG && GM_log("adjusting left end");
			discountRateLeft = discountRateMid;
			npvLeft = npvMid;
		}
	}

}

function NPV(principal, accruedInterest, paymentAmount, interestRate, discountRate)	// per period
{
var DEBUG = debug(false /*|| principal == 17.29*/, arguments), FUNCNAME = funcname(arguments);

	if(principal <= 0 || paymentAmount <= 0)
	{
		printStackTrace(FUNCNAME + " principal=" + principal + " paymentAmount=" + paymentAmount);
//		throw FUNCNAME + " paymentAmount " + paymentAmount + " <= 0";
		return null;
	}

	var discountRateNegative = discountRate < 0;
	if(discountRateNegative)
		discountRate = -discountRate;

	discountRate = 1 + discountRate;

	/* multiply every time through the loop, POW(discountRate, count) */
//	var discountRatePOW = 1.0;		// first payment at begining of period
	var discountRatePOW = discountRate;		// first payment at begining of period
		
	var totalPaymentsPV = 0;
	var count = 0;
	while(principal > 0 && ++count < 100)
	{
		if((DEBUG && count < 3) || count > 90)
			GM_log("count=", count, " principal=", principal, " discountRateNegative=", discountRateNegative, " discountRate=", discountRate, " discountRatePOW=", discountRatePOW);
		
		var oneMonthsInterest = principal * interestRate;

		principal += oneMonthsInterest;
		
		var paymentAmount2 = Math.min(principal, paymentAmount);
		
		principal -= paymentAmount2;
		
		if(false)
		if(accruedInterest > oneMonthsInterest)	// assume first payment pays off all accrued interest
		{
			var count2 = 0;
			var accruedInterestAdjustment = 0;
			while(accruedInterest > oneMonthsInterest)
			{
				if(++count2 > 100)
				{
					GM_log("count2=", count2, " arguments=", arguments);
					break;
				}

				accruedInterestAdjustment += oneMonthsInterest;
				accruedInterest -= oneMonthsInterest;
			}

			DEBUG && GM_log(FUNCNAME + " accruedInterest adjustment=", accruedInterestAdjustment);
			paymentAmount2 += accruedInterestAdjustment;
					
			accruedInterest = 0;	// throw away the remainder, since it will be included in first payment
		}

		var paymentAmountPV = discountRateNegative ? (paymentAmount2 * discountRatePOW) : (paymentAmount2 / discountRatePOW);
		DEBUG && GM_log("paymentAmount2=", paymentAmount2, " paymentAmountPV=", paymentAmountPV);

		totalPaymentsPV += paymentAmountPV;
		
		discountRatePOW *= discountRate;
	}

	DEBUG && GM_log("totalPaymentsPV=", totalPaymentsPV);
	return totalPaymentsPV;
}

//function dayOfYear(date)
//{
//	date = new Date(date);
//	date.setFullYear(0);
//	return date.getTime() / ( 24 * 60 * 60 * 1000 );
//}

function daysBetween(date1, date2)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(date1 == null || date2 == null)
	{
		printStackTrace("date1=", date1, " date2=", date2);
		return null;
	}

	return Math.floor((date1.getTime() - date2.getTime()) / MILLISECONDSPERDAY);
}

function monthsBetween(date1, date2)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	if(date1 == null || date2 == null)
	{
		printStackTrace("date1=", date1, " date2=", date2);
		return null;
	}

	var months = 
		(date2.getFullYear() * 12 + date2.getMonth())
		- (date1.getFullYear() * 12 + date1.getMonth());
	
	DEBUG && GM_log("BEFORE months=", months);

	// adjust for days in the month
	var dom1 = date1.getDate();
	var dom2 = date2.getDate();
	while(dom2 < dom1 && dom1 > 28)
		dom1--;
	while(dom2 < dom1 && dom2 > 28)
		dom2--;
	if(dom2 < dom1)
		months--;
	
	DEBUG && GM_log("AFTER months=", months);
		
	return months;
}
			
/* Object array to csv (using the keys of the first element as the columns) */
function array2csv(doc, separator, arr, includeHeaders, priorityKeys, unpriorityKeys)
{
	if(typeof includeHeaders == 'undefined') includeHeaders = true;

	function getKeys(arr)
	{
		var keysAll = [];

		/* gather all the keys for the objects in the array (or maybe just the first 10 objects or so) */
		for(var arrIndex = 0; arrIndex < 10 && arrIndex < arr.length; arrIndex++)
		{
			var keys = Object.keys(arr[arrIndex]);

			keysAll = keysAll.concat(keys);
		}

		return keysAll;
	}

	var keys = getKeys(arr);

	if(priorityKeys && priorityKeys.length > 0)
		keys = priorityKeys.concat(keys);
	
	keys = unique(keys);	//XXX unique is too slow for a concatenation of all the keys
	
//	GM_log("HERE"); throw "XXX";	//XXX
	
	if(unpriorityKeys && unpriorityKeys.length > 0)
	{
		keys = keys.concat(unpriorityKeys);
		keys.reverse();
		keys = unique(keys);
		keys.reverse();
	}
	
	//XXX move keyPrev to be right after key?
	
	if(includeHeaders)
		doc.write(keys.join(separator) + "\n");

	for(var arrIndex = 0; arrIndex < arr.length; arrIndex++)
	{
		var obj = arr[arrIndex];

		var row = [];

		for(var keyIndex = 0; keyIndex < keys.length; keyIndex++)
		{
			var key = keys[keyIndex];

			var value = obj[key];

			if(value == null)
				value = "";	// null or undefined becomes blank
			else
			{
				value = '' + value;	//stringify

//				value = value.replace(/([,\\])/g, "\\$1");	// escape commas, backslashes, etc XXX UNNECESSARY?
				value = value.replace(/["]/g, '""');	// escape double quotes as double-double quote for OpenOffice Calc, etc.

				if(value.match(/ /))
					value = '"' + value + '"';	//need quotes if contains embedded spaces?
			}

			row.push(value);
		}

		doc.write(row.join(separator) + "\n");
	}
}

/* used for calculating EOY interest */
function remainingPaymentsEOY(firstCompleted)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	if(!remainingPaymentsEOY.NOW)
		remainingPaymentsEOY.NOW = new Date();

	var NOW = remainingPaymentsEOY.NOW;

	if(firstCompleted == null)
	{
		var monthsLeft = 11 - NOW.getMonth();	//getMonth() january = 0

		DEBUG && GM_log("1 monthsLeft=", monthsLeft);
		return monthsLeft;
	}
	else
	{
		var monthsLeft = 11 - firstCompleted.getMonth();	//getMonth() january = 0

		monthsLeft += (NOW.getFullYear() - firstCompleted.getFullYear()) * 12;

		DEBUG && GM_log("2 monthsLeft=", monthsLeft);
		return monthsLeft;
	}
}
	
function doPaymentHistory(vars, table, datatable)
{
var DEBUG = debug(true, arguments);

	var rs = datatable.getRecordSet();
	GM_log("rs=", rs);
	var records = rs.getRecords();
		
	/* check for 2 rows with the same date and one has a pyment of 0.00
	 * XXX only works if sorted by date (which is the default)
	 */
	var duplicateCount = 0;
	var record1 = records[records.length - 1];
	for(var index = records.length - 2;
		index >= 0;
		index--)	// start at the end and go up so we can delete rows
	{
		var record2 = record1;
		record1 = records[index];
		
		var dueDate1 = record1._oData.dueDate;
		var dueDate2 = record2._oData.dueDate;
		
		if(dueDate1.getTime() != dueDate2.getTime())	// dates don't match, go to the next row YYY don't use == with dates
			continue;
		
		var amount1 = record1._oData.paymentAmount;
		var amount2 = record2._oData.paymentAmount;

		var status1 = record1._oData.status.trim();
		var status2 = record2._oData.status.trim();

		DEBUG && GM_log("amount1=", amount1, " amount2=", amount2, " status1=", status1, " status2=", status2);

		/*YYY using == fails on chrome because the modified the values from highlightLoanPerf are still here */
//		if(! ((amount1 == 0 && status1 == "Not Received") || (amount2 == 0 && status2 == "Not Received")) )
		if(! ((amount1 == 0 && status1.match(/Not Received/)) || (amount2 == 0 && status2.match(/Not Received/))) )
			continue;

		duplicateCount++;
		
		/* the good row can be first or second */
		if(amount1 == 0)
//			record1.lcac_duplicateRow = true;
			rs.deleteRecord(index);
		else
//			record2.lcac_duplicateRow = true;
			rs.deleteRecord(index + 1);
	}
	GM_log("duplicateCount=", duplicateCount);
	if(duplicateCount > 0)
		window.status = duplicateCount + ' duplicate rows';


	vars.expectedPaymentLowerBound = floor2Decimals(vars.origPaymentAmount * 0.99);	// +/-1% to account for variation
	vars.expectedPaymentUpperBound = ceil2Decimals(vars.origPaymentAmount * 1.01);	// +/-1% to account for variation

	/* XXX include Processing...? only with a completion date? is that when it affects Outstanding Principal?
	 * https://www.lendingclub.com/foliofn/loanPerf.action?loan_id=592997&order_id=1863540&note_id=2723058
	 * https://www.lendingclub.com/foliofn/loanPerf.action?loan_id=600650&order_id=1226432&note_id=2766076
	 * Statuses can be:
	 *
	 * Scheduled
	 * Scheduled - Payment Plan
	 * Processing...
	 * Not Received
	 * Received - Partial Payment
	 * Completed - on time
	 * Completed - in grace period
	 * Completed - 21 days late
	 * ChargedOff (no space)
	 */
	var feeTotal = 0;
	var idealFeeTotal = 0;
	var paymentTotal = 0;
	
	var paymentHistory = vars.paymentHistory = [];
	paymentHistory.dueDateMissedCutoff = false;
	
	/* There's always at least 1 row in the table */
	for(var index = 0;
		index < records.length;
		index++)
	{
		var record = records[index];

		/*
		 * WARNING: principal but no interest possible when loan is in Default status
		 */

		var dueDate = record._oData.dueDate;
		dueDate = Y2K(dueDate);
		var compDate = record._oData.compDate;
		compDate = Y2K(compDate);
		var status = record._oData.status.replace(/[\r\n\s]+/g, ' ').trim();
		var amount = record._oData.paymentAmount;
		var lateFee = record._oData.lateFees;
		/* e.g.
		 * <span title="$0.236719509292">$0.24</span>
		 * --
		 */
		var principal = html2Value(record._oData.principal);
		var interest = html2Value(record._oData.interest);
		
		var payment = {
			dueDate: dueDate,
			compDate: compDate,
			status: status,
			amount: amount,
			principal: principal,
			interest: interest,
		};

		paymentHistory.push(payment);

		if(index == 0)
		{
			paymentHistory.first = payment;
			
			GM_log("payment.compDate=", payment.compDate);
			if(payment.status.match(/Completed|Received|Charged\s*Off/)
			|| (payment.compDate != null && payment.status.match(/Processing/)))
				paymentHistory.firstNotScheduledOrProcessing = payment;
		}

		if(index == 1)
		{
			/* XXX Payment Plan can throw off this calculation
			 * e.g. https://www.lendingclub.com/foliofn/loanPerf.action?loan_id=772278&order_id=3430255&note_id=5416959
			 */

			var dueDateMissedCutoff = new Date(paymentHistory.first.dueDate);
			dueDateMissedCutoff.setMonth(dueDateMissedCutoff.getMonth() - 1);	// minus a month
			dueDateMissedCutoff.setDate(dueDateMissedCutoff.getDate() - 28);	// minus a little more
			
			if(dueDateMissedCutoff.getTime() > payment.dueDate.getTime())
				paymentHistory.dueDateMissedCutoff = true;
		}
		
		/*
		 * First dueDate with a status besides Scheduled/Processing
		 */
		if(paymentHistory.firstNotScheduledOrProcessing == null && !payment.status.match(/Scheduled|Processing/))
			paymentHistory.firstNotScheduledOrProcessing = payment;

		/*
		 * First dueDate with Completed/Recevied status
		 */
		if(paymentHistory.firstCompleted == null && payment.status.match(/^(Completed|Received)/))
			paymentHistory.firstCompleted = payment;

		/*
		 * Oldest row (last one processed)
		 */
		paymentHistory.oldest = payment;

		paymentTotal += amount;

		var idealFee = amount * 0.01;
		idealFeeTotal += idealFee;

		var fee = 
			amount <= 0.01 
			? 0.00 
			: Math.max(0.01, round2Decimals(idealFee));	// rounded, minimum is 1 cent
		feeTotal += fee;
	}
			
	GM_log("paymentHistory.dueDateMissedCutoff=", paymentHistory.dueDateMissedCutoff);
	var dueDateTrue = new Date(paymentHistory.first.dueDate);
	if(paymentHistory.dueDateMissedCutoff)
		dueDateTrue.setMonth(dueDateTrue.getMonth() - 1);
	paymentHistory.first.dueDateTrue = dueDateTrue;

	idealFeeTotal = round2Decimals(idealFeeTotal);

	var idealFeeTotal2 = round2Decimals(paymentTotal * 0.01);	// check value

	var feeOverpayment = feeTotal - idealFeeTotal;

	vars.feeTotal = feeTotal;
	vars.feeOverpayment = feeOverpayment;

	/* find the arrears date, the most recent payment */
	var arrearsString, arrearsDate;
	if(vars.status.match(/Fully Paid/))
	{
		arrearsString = vars.status;
		arrearsDate = paymentHistory.first.dueDate;
	}
	else 
	{
		/*YYY Payments to Date (21) can be wrong, e.g. for late notes */
		/* it's possible there's just one line if there's just one payment Note: this is projected payments not actual */
		GM_log("paymentHistory.firstNotScheduledOrProcessing=", paymentHistory.firstNotScheduledOrProcessing);
		if(paymentHistory.firstNotScheduledOrProcessing)
			arrearsDate = paymentHistory.firstNotScheduledOrProcessing.dueDate;
		else
		{
			arrearsDate = new Date(vars.issuedDate);

			GM_log("arrearsDate=", arrearsDate);
			GM_log("paymentHistory.first.dueDate=", paymentHistory.first.dueDate);

			/* no payments, due date a little slow in processing */
			if(arrearsDate.getTime() < paymentHistory.first.dueDate.getTime())
				arrearsDate.setMonth(arrearsDate.getMonth() + 1);
		}

		var oldestDueDate;
		if(paymentHistory.oldest.dueDate)
		{
			oldestDueDate = new Date(paymentHistory.oldest.dueDate);
			oldestDueDate.setMonth(oldestDueDate.getMonth() - 1);
		}
		else
			oldestDueDate = vars.issuedDate;

		var numPaymentsExpected = monthsBetween(oldestDueDate, arrearsDate);
	
		var periodsInYear = 12;
		/*
		 * what is this number?
		 * $75 16.77%
		 * Issued Date 	2/10/12
		 *     Due Date 3/20/12 Completion Date 3/26/12 $2.66 $1.61 $1.05(1.045991727398) $0.00
		 * 12.0244736842 * 30 = 360.734210526???
		 */


		/* XXX Note: many times Outstanding Principal doesn't match Payment History Principal Balance */
		var cumprincExpected;
		if(numPaymentsExpected >= vars.termInMonths)
			cumprincExpected = -vars.loanFraction;	// should have paid back the whole thing by now
		else if(numPaymentsExpected < 1)
			cumprincExpected = 0;
		else
			cumprincExpected = CUMPRINC(vars.interestRate / periodsInYear, vars.termInMonths, vars.loanFraction, 1, numPaymentsExpected);	// return value is negative
		
		var outstandingPrincipalExpected = vars.loanFraction + cumprincExpected;

		var arrears = outstandingPrincipalExpected - vars.outstandingPrincipal;

		if(arrears < -vars.outstandingPrincipal)
			arrearsString = "MAX";
		else if(arrears == 0)
			arrearsString = "EVEN";
		else
			arrearsString = sprintf("%+0.2f", arrears);
	}

	vars.arrearsDate = arrearsDate;
	vars.arrearsString = arrearsString;
	
	paymentHistory.firstCompletedOrIssuedDate =
		paymentHistory.firstCompleted != null
		? paymentHistory.firstCompleted.compDate
		: vars.issuedDate;
	
	GM_log("vars.issuedDate=", vars.issuedDate);
	GM_log("paymentHistory.firstCompleted=", paymentHistory.firstCompleted);
	GM_log("paymentHistory.firstCompletedOrIssuedDate=", paymentHistory.firstCompletedOrIssuedDate);
}

function doLoanPerfPart2(vars)
{
var DEBUG = debug(false, arguments);

	var note = vars.noteId == null ? null : getStoredNote(vars.noteId);
	DEBUG && GM_log("note=", note);

	/* add a table to put our stuff in, after any No Fee text that might be here */
	$(":header:contains('Received Payments')").closest("div")
		.each(function(index, element){GM_log("element=", element)})
		.append("<table class='lcac_ReceivedPayments'><tbody></tbody></table>");
		
	if(note)
	{
/*
e.g. note={
accrual "0.01"
amountLent 7.12
interestRate 0.13570000000000002
loanId 476379
noteId 1057395
orderId 2936536
paymentReceived "4.65"
principalRemaining "2.70"
status "In Grace Period"
}
*/
		/*XXX if you buy a note, then sell it, then buy it again, what value do you get here? */
		if(note.amountLent)	// never retained that information
			$("table.lcac_ReceivedPayments tbody")
				.append(
					sprintf("<tr><th title='%s'>Investment*</th><td>$%0.2f</td></tr>",
						"This value comes from the notesRawData.action download",
						note.amountLent) +
					sprintf("<tr class='sub-total'><th title='%s'>Payments Received*</th><td>$%0.2f</td></tr>",
						"This value comes from the notesRawData.action download",
						note.paymentReceived) +
					"");

	}

	/*
	 * Add fields to the page
	 */
	//style copied from .object-details .module
	$(".data-summary").after("<div id='lcac_extras'></div>");
	var lcac_extras = $("#lcac_extras");
	DEBUG && GM_log("lcac_extras=", lcac_extras);
							
	/*
	 * e.g.
	 * https://www.lendingclub.com/account/loanPerf.action?loan_id=506788&order_id=2357536&note_id=1543883
	 * https://www.lendingclub.com/account/loanPerf.action?loan_id=478603&order_id=1931374&note_id=1098535
	 */
	var ficoTrend = parseTrendData($("table#trend-data tbody tr"));
	
	var trendGraph = $("<div><label>Credit Score Change*</label><br><span class='creditscorechangegraph'></span></div>");

	lcac_extras.append(trendGraph);	//YYY $.sparkline_display_visible() not working in chrome?
	
	var span = trendGraph.find("span.creditscorechangegraph");

	/* wider = longer history */
	var width = 
		Math.min(800,
//			Math.max(
//				400,
				(ficoTrend.length - 1) * Math.floor(800 / 36)
//			)
		);
	
	trendGraph.find("span.creditscorechangegraph").sparkline(
		ficoTrend,
		{
			width: width + 'px',
			height: '80px',
			chartRangeMax: '850',		// used to be 780
			chartRangeMin: '499',
			spotRadius: '5',
			valueSpots: {
				':549': 'orange',
				':499': 'red',
				'550:': 'blue',
				'780:': 'green',
			},
			spotColor: '',
			minSpotColor: '',
			maxSpotColor: '',
		});
	
//	/*YYY is it faster to build it and then add it? */
//	lcac_extras.append(trendGraph);
//	$.sparkline_display_visible();	// per http://omnipotent.net/jquery.sparkline/#hidden
	
	/* Comment field */
	lcac_extras.append(
		"<div>" +
		"<label>Comment*:</label> " +
		sprintf(
			"<input type='text' class='commentTextBox' name='comment_%s' size='50' style='width:80%;' />",
			vars.loanId
		) +
		"</div>"
	);

	if(PAYMENTPLANONPERF)
	{
/*
<a href="/account/paymentPlan.action?loan_id=405486&amp;order_id=1539939" onclick="s_objectID=&quot;https://www.lendingclub.com/account/paymentPlan.action?loan_id=405486&amp;order_id=1539939_1&quot;;return this.s_oc?this.s_oc(e):true"><span class="lcac_yellowRev">On Payment Plan</span></a>
*/
		var pplink = $("a[href*='paymentPlan.action?loan_id=']");
		GM_log("pplink=", pplink);
		if(pplink.length > 0)
		{
			var href = pplink.prop('href');
			GM_log("href=", href);

			var div = $(":header:contains(Collection Log)").closest("div");
			GM_log("div=", div);
			div.after("<div class='pplink'><h3>Payment Plan</h3><div><div class='ppplaceholder'>Loading...</div></div></div>");
			$.get(href, function(responseText)
			{
				var dom = $(responseText);

				var pptable = dom.find("table#lcLoanPerfTable1");
				GM_log("pptable=", pptable);

				pptable.removeClass("standard-table");
				pptable.addClass("plain-table");

				pptable.find("thead").remove();

				$("div.ppplaceholder").replaceWith(pptable);

				dom.remove();	//XXX discard the rest (does this help free up memory?)
			});
		}
	}

	/* commentTextBox */
	var commentTextBox = $('.commentTextBox');
	DEBUG && GM_log("commentTextBox=", commentTextBox);

	var comment = getComment(vars.loanId);
	DEBUG && GM_log("comment=", comment);

	commentTextBox
		.val(comment)
		.on('change',
			function(event)
			{
				setComment(this.name, this.value);
			});

	attachLocalStorageCommentListener();
}

function doLoanPerfPart3(vars)
{
var DEBUG = debug(true, arguments);

	GM_log("vars=", vars);

	if(vars.dueDateMissedCutoff)
	{
		$("#lcLoanPerf1 tbody.yui-dt-data tr")
			.filter(":eq(0), :eq(1)")
				.find("td.dueDate").addClass("lcac_redHigh");
	}

	var daysSincePayment = daysBetween(TODAY(), vars.paymentHistory.firstCompletedOrIssuedDate);
	
	GM_log("daysSincePayment=", daysSincePayment);

	GM_log("vars.paymentHistory=", vars.paymentHistory);
	GM_log("vars.outstandingPrincipal=", vars.outstandingPrincipal);
	GM_log("vars.interestRate=", vars.interestRate);

	var accrualText;
	var accrualTooltip;
	var accrualNote = "";
	var accruedInterestFromNote = vars.noteId ? getStoredNote(vars.noteId, "accrual") : null;
		
	//XXX this can be wrong if the last payment was an underpayment that didn't even cover the interest
	var accruedInterestCalced = vars.outstandingPrincipal * vars.interestRate / 365.25 * daysSincePayment;

	//XXX if charged off or default (or sometimes even just late?) then interest stops accuring(?)
	GM_log("accruedInterestFromNote=", accruedInterestFromNote);
	if(accruedInterestFromNote != null)
	{
		var accrualMismatch = Math.abs(accruedInterestCalced - accruedInterestFromNote) > 0.01;
		GM_log("accrualMismatch=", accrualMismatch);

		var accruedInterestInMonths =
			calcInterestInMonths(vars.outstandingPrincipal, vars.interestRate, accruedInterestFromNote);

		accrualText = sprintf("$%0.2f[%0.1fm]",
			accruedInterestFromNote,
			accruedInterestInMonths);
	
		accrualTooltip = sprintf(
			"My Notes &gt; Download All &gt; Accrual=%s, accruedInterestCalced=%f",
			accruedInterestFromNote != null ? sprintf("%f", accruedInterestFromNote) : "Not Stored",
			accruedInterestCalced);
			
		accrualNote = "(csv)";
	}
	else
	{
		GM_log("vars.outstandingPrincipal=", vars.outstandingPrincipal, " vars.interestRate=", vars.interestRate, " accruedInterestCalced=", accruedInterestCalced);

		var accruedInterestInMonths = 
			calcInterestInMonths(vars.outstandingPrincipal, vars.interestRate, accruedInterestCalced);
		
		GM_log("accruedInterestInMonths=", accruedInterestInMonths);

		accrualText = sprintf("$%0.2f[%0.1fm]",		
			accruedInterestCalced,
			accruedInterestInMonths);

		accrualTooltip = sprintf("accruedInterestCalced=%f op=%f ir=%f",
			accruedInterestCalced,
			vars.outstandingPrincipal, vars.interestRate);

		if(vars.paymentHistory.firstCompleted && vars.paymentHistory.firstCompleted.principal == 0)
			accrualNote = "(underpayment)";
		else
			accrualNote = "(calced)";
	}
		
	if(vars.paymentHistory.firstCompleted && vars.paymentHistory.firstCompleted.principal == 0)
		accrualTooltip += " CAUTION! UNDERPAYMENT";

	var upcomingPaymentsBody = $(":header:contains('Upcoming Payments') + table tbody");

	if(upcomingPaymentsBody.length == 0)
		alert("upcomingPaymentsBody.length=" + upcomingPaymentsBody.length);

	if(accrualText)
	upcomingPaymentsBody
		.append(
			sprintf("<tr><th>Accrual %s*</th><td title='%s'>%s</td></tr>",	// title becomes tooltip
				accrualNote,
				accrualTooltip, accrualText) +
			"");

	upcomingPaymentsBody
		.append(
			sprintf("<tr><th>Initial <a href='%s'>PMT</a> Amount*</th><td>$%0.2f</td></tr>",
				"http://office.microsoft.com/en-us/excel-help/pmt-HP005209215.aspx",
				vars.origPaymentAmount) +
			sprintf("<tr><th>+/-Expected as of %s*</th><td>%s</td></tr>",
				dateShortFormat(vars.arrearsDate),
				vars.arrearsString) +
			"");
				
	if(TESTING)
	{
		if(vars.outstandingPrincipal > 0)
		{
			/* YYY if fully paid, the fee overpayment rebate could be included in the final
			 * payment, making this calculation wrong but not by very much
			 */
			upcomingPaymentsBody
				.append(
					sprintf("<tr><th>Fee Overpayment (est.)*</th><td>%s</td></tr>",
						vars.noFee ? "No Fee" : sprintf("%+0.2f", vars.feeOverpayment)) +
				"");
		}

		if(vars.outstandingPrincipal > 0)
		{
			var expectedPayment = vars.paymentHistory.first.amount;
			GM_log("expectedPayment=", expectedPayment);

			/*
			 * XXX should we try to account for reduced payments and/or payment plan?
			 */
			var remainingPaymentsEOY2 = remainingPaymentsEOY(vars.paymentHistory.firstCompletedOrIssuedDate);

			if(expectedPayment == 0)
			{
				var remainingPaymentsExpected = 0;
				var remainingPaymentsExpectedCeil = 0;

				var cumprinc = 0;
				var cumint = 0;
				
				var remainingPaymentsExpectedTotal = 0;
			
				var interest12mos = 0;
				var interestEOY = 0;
			}
			else
			{
				var remainingPaymentsExpected = NPER(vars.interestRate / 12, -expectedPayment, vars.outstandingPrincipal);
				var remainingPaymentsExpectedCeil = Math.ceil(remainingPaymentsExpected);

				var cumprinc = 
					-CUMPRINC(vars.interestRate / 12, remainingPaymentsExpectedCeil, vars.outstandingPrincipal, 1);

				var cumint = 
					-CUMIPMT(vars.interestRate / 12, remainingPaymentsExpectedCeil, vars.outstandingPrincipal, 1);
				
				var remainingPaymentsExpectedTotal = cumprinc + cumint;

				var interest12mos = 
					-CUMIPMT(
						vars.interestRate / 12,
						remainingPaymentsExpected,
						vars.outstandingPrincipal,
						1,
						Math.min(12, remainingPaymentsExpected));

				var interestEOY = 
					-CUMIPMT(
						vars.interestRate / 12,
						remainingPaymentsExpected,
						vars.outstandingPrincipal,
						1,
						Math.min(remainingPaymentsEOY2, remainingPaymentsExpected));
			}

			var interest12mosInterestOnlyPayments =
				vars.outstandingPrincipal * vars.interestRate;

			var interestEOYInterestOnlyPayments =
				vars.outstandingPrincipal * vars.interestRate / 12 * remainingPaymentsEOY2;

			upcomingPaymentsBody.find("tr:contains(Remaining Payments)")
				.after(
					sprintf("<tr class='sub-total'><th>@&nbsp;$%0.2f (%0.1f)*</th><td>$%0.2f</td></tr>",
						expectedPayment, remainingPaymentsExpected, remainingPaymentsExpectedTotal) +
				"");

			upcomingPaymentsBody
				.append(
					sprintf("<tr><th>Interest 12 mos (est.)*</th><td>$%0.2f/%0.2f</td></tr>",
						interest12mos, interest12mosInterestOnlyPayments) +
					sprintf("<tr class='sub-total'><th>EOY %d mos (est.)*</th><td>$%0.2f/%0.2f</td></tr>",
						remainingPaymentsEOY2,
						interestEOY, interestEOYInterestOnlyPayments) +
					"");
		}
	}

	GM_log("vars=", vars);
	if(/*vars.outstandingPrincipal > 0 &&*/ vars.paymentHistory.first.amount > 0)
	{
		if(isNoteSalePending(vars.noteId))
		{
			$("table.lcac_ReceivedPayments tbody")
				.append(

					"<tr><th colspan=2 style='text-align:center'>*** Sale Pending ***</th></tr>"
				);
		}

		if(isNotePurchasePending(vars.noteId))
		{
			$("table.lcac_ReceivedPayments tbody")
				.append(

					"<tr><th colspan=2 style='text-align:center'>*** Purchase Pending ***</th></tr>"
				);
		}

		if(vars.asking_price)
		{
			var markup = vars.asking_price - vars.outstandingPrincipal;
			var markupFrac = markup / vars.outstandingPrincipal;

			var irr = IRR(
				vars.outstandingPrincipal,
				round2Decimals(accruedInterestCalced),
				vars.paymentHistory.first.amount,
				vars.interestRate,
				vars.asking_price);

			$(":header:contains('Loan Summary') + table tbody")
				.append(

					"<tr><th colspan=2 style='text-align:center'>*** For Sale ***</th></tr>" +

					sprintf("<tr><th>Asking Price*</th><td>$%0.2f</td></tr>",
						vars.asking_price) +

					sprintf("<tr><th>Markup*</th><td>%s/%0.1f%%</td></tr>",
						negative2negative("$%0.2f", markup), markupFrac * 100) +

					sprintf("<tr class='sub-total'><th>IRR(expmntal)*</th><td>%s</td></tr>",
						negative2parens("%0.2f%%", irr * 100)) +

					(ORDERLINKONLOANPERF ?
					sprintf("<tr><th>Toggle Add to Order</th><td><input type='checkbox' id='lcac_togglepurchase' name='%s' /> <a href='/foliofn/completeLoanPurchase.action'>View Order</a></td>",
							vars.noteId) +
					"" : "") +

					"");
			
			/* add a Buy button */
			$("#lcac_togglepurchase")
				.on('change', function(event)
				{
					var noteId = $(this).prop('name');
					GM_log("noteId=", noteId);
					var checked = $(this).prop('checked');
					GM_log("checked=", checked);

					ffnAddToOrder(noteId, checked);

					function ffnAddToOrder(noteId, checked)
					{
						var url = 
							sprintf("/foliofn/noteAj.action?s=%s&ps=1&ni=%d&rnd=%d",
								checked ? 'true' : 'false',
								noteId,
								new Date().getTime());

						$.get(url, function(responseText)
						{
							GM_log("responseText=", responseText);
		//					window.location.href = window.location.href;	// reload the page
						});
					}
				});
		}
		else if(vars.sale_price != null)
		{
			/* XXX this value can "expire" if payments get made on the loan */

			$("table.lcac_ReceivedPayments tbody")
				.append(

					sprintf("<tr><th>Sale Price*</th><td>$%0.2f</td></tr>",
						vars.sale_price) +
				"");

			if(vars.par_value_at_sale != null)
			{
				var irr = IRR(
					vars.par_value_at_sale,
					round2Decimals(accruedInterestCalced),
					vars.paymentHistory.first.amount,
					vars.interestRate,
					vars.sale_price);

				$("table.lcac_ReceivedPayments tbody")
					.append(

						sprintf("<tr><th>Par Value at Sale*</th><td>%s</td></tr>",
							sprintf("$%0.2f", vars.par_value_at_sale)) +

						sprintf("<tr class='sub-total'><th>IRR (expmntal)*</th><td>%s</td></tr>",
							negative2parens("%0.2f%%", irr * 100)) +

						sprintf("<tr class='sub-total'><th>Fee*</th><td>%s</td></tr>",
							sprintf("$%0.2f", vars.fee_at_sale)) +

					"");
			}
			else if(isNoteSalePending(vars.noteId))
			{
				var irr = IRR(
					vars.outstandingPrincipal,
					round2Decimals(accruedInterestCalced),
					vars.paymentHistory.first.amount,
					vars.interestRate,
					vars.sale_price);

				$("table.lcac_ReceivedPayments tbody")
					.append(

						sprintf("<tr class='sub-total'><th>IRR (expmntal)*</th><td>%s</td></tr>",
							negative2parens("%0.2f%%", irr * 100)) +

						sprintf("<tr class='sub-total'><th>Fee (est.)*</th><td>%s</td></tr>",
							sprintf("$%0.2f", Math.max(.01, Math.round(vars.sale_price / 100)))) +

					"");
			}
		}
		else if(vars.our_asking_price != null)
		{
			/* XXX this value can "expire" if payments get made on the loan */

			var irr = IRR(
				vars.outstandingPrincipal,
				round2Decimals(accruedInterestCalced),
				vars.paymentHistory.first.amount,
				vars.interestRate,
				vars.our_asking_price);

			$("table.lcac_ReceivedPayments tbody")
				.append(

					sprintf("<tr><th>Our Asking Price*</th><td>$%0.2f</td></tr>",
						vars.our_asking_price) +

					sprintf("<tr><th>Outstanding Principal*</th><td>%s</td></tr>",
						sprintf("$%0.2f", vars.outstandingPrincipal)) +

					sprintf("<tr class='sub-total'><th>IRR (expmntal)*</th><td>%s</td></tr>",
						negative2parens("%0.2f%%", irr * 100)) +

					"");
		}
	}
	
	/*YYY on /account/ this is limited to 262px, which isn't big enough (/foliofn/ looks ok though) */
	if(location.href.match(/\/account\//))
		GM_addStyle(".object-details th, .object-details td {height:auto;}");
//	GM_addStyle(".object-details th, .object-details td {white-space:nowrap;}");
	GM_addStyle(".object-details {white-space:nowrap;}");
}

function doLoanDetail()
{
var DEBUG = debug(true, arguments);

	var loanId = $(".memberHeader").html().match(/Borrower Member Loan\s(\d+)/)[1];
	DEBUG && GM_log("loanId=", loanId);
	
	var locationTD = $("th:contains('Location') + td");
	var location = locationTD.text();
	DEBUG && GM_log("location=", location);

	var employerTD = $("th:contains('Current Employer') + td");
	var employer = employerTD.text();
	DEBUG && GM_log("employer=", employer);

	var locationurl = sprintf("https://maps.google.com/maps?hl=en&q=%s&t=m&z=7", encodeURIComponent(location));
	DEBUG && GM_log("locationurl=", locationurl);
	
	locationTD.wrapInner(sprintf("<a href='%s' />", locationurl));

	var employerurl =
		employer == "n/a"
		? null 
		: sprintf("https://maps.google.com/maps?hl=en&q=%s", encodeURIComponent(employer + " near: " + location));
	DEBUG && GM_log("employerurl=", employerurl);

	if(employerurl)
		employerTD.wrapInner(sprintf("<a href='%s' />", employerurl));

	var comment = getComment(loanId);

	$(".details-wrapper").first().after(
		sprintf(
			"<label for='commentTextBox'>Comment*</label>" +
			"<input type='text' class='commentTextBox' name='comment_%s' size='100'>",
			loanId
		));

	var commentTextBox = $('.commentTextBox');

	commentTextBox.val(comment);

	commentTextBox.on('change',
		function(event)
		{
			DEBUG && GM_log("commentTextBox.addEventListener$change() event=", event);
			setComment(this.name, this.value);
		});

	attachLocalStorageCommentListener();
	
	if(TESTING)
	{
		/* Add links to known notes */
		var links = getNoteLinks(loanId);
		if(links)
			$("div#master_content-header :header:first, div#content :header:first")	// h1 on account, h2 on foliofn
				.append(" " + links);

		GM_log("IRLINKS=", IRLINKS);
		if(IRLINKS)
		$("div#master_content-header :header:first, div#content :header:first")	// h1 on account, h2 on foliofn
			.append(sprintf(" <a href='%s' target='_lcac_ir'>[IR]</a>", 
				sprintf("http://www.interestradar.com/loan?LoanID=%s", loanId)));
	}
}

var WAITFORELEMENTTIMEOUT = 500;
function waitForElement(selector, subselector, callback)
{
var DEBUG = debug(true, arguments);

	var element = $(selector);
	var subelement = subselector == null ? element : element.find(subselector);

	if(subelement && subelement.length > 0)
	{
		DEBUG && GM_log(DEBUG + " calling callback()...");
		callback(element, subelement);
		return;
	}

	/* loop */
//	DEBUG && GM_log(DEBUG + " looping... WAITFORELEMENTTIMEOUT=" + WAITFORELEMENTTIMEOUT);
	setTimeout(
		function()
		{
			waitForElement(selector, subselector, callback);
		},
		WAITFORELEMENTTIMEOUT);
}

var TABLECANCHANGETIMEOUT = 500;
/* YYY I suspect our reliance on the first row won't work if the table is sortable */
function tableCanChange(table, tbodyselector, callback)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);
	
	if(table == null)
		throw "tableCanChange() table=" + table;
	if(table.length == 0)
		throw "tableCanChange() table.length=" + table.length;

	var tbody = table.find(tbodyselector);
	DEBUG && GM_log("tbody=", tbody);

//	var trFirst = tbody.find("tr:first");
	var trs = tbody.find("tr");
	if(trs.length == 0)
		trs = null;
	DEBUG && GM_log("trs=", trs, " trs.length=", trs.length);
	
	if(trs)
	{
		if(!trs.hasClass('lcac_tableChangeHandled'))	// seems to get lost when the rows change
		{
			GM_log(FUNCNAME + " table changed");

			trs.addClass('lcac_tableChangeHandled');

			callback(table, tbody);
		}
	}

	/* loop (if table can change) */
	setTimeout(
		function()
		{
			tableCanChange(table, tbodyselector, callback);
		},
		TABLECANCHANGETIMEOUT);
}


function setSelectValue(selects, selectValue)
{
	/* ...and select it... */
	selects[0].value = selectValue;

	/* ...but just selecting the value doesn't seem to do it (is there a jquery way to do this?) */
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", true, true);
	selects[0].dispatchEvent(evt);
}

function getCellForColumn(tr, col)
{
var DEBUG = debug(false, arguments);

	var tds = tr.find("td");
	for(index = 0; index < tds.length; index++)
	{
		var td = tds.eq(index);
		var colspan = td.prop('colspan');
		col -= colspan;

		DEBUG && GM_log("colspan=", colspan, " col=", col, " td=", td);

		if(col < 0)
		{
			DEBUG && GM_log("col=", col, " returning td=", td);
			return td;
		}
	}

	DEBUG && GM_log("col=", col, " returning null");
	return null;
}

function getStoredNote(noteId, prop)
{
var DEBUG = debug(false /*|| noteId == 5704908*/, arguments), FUNCNAME = funcname(arguments);

	var storedData = loadStoredData();

	if(noteId) noteId = ('' + noteId).trim();	// stringify
	
	if(noteId == null || noteId == "")
	{
		DEBUG && printStackTrace(FUNCNAME + " noteId=" + noteId);
		throw FUNCNAME + " noteId=" + noteId;
	}

	var note = storedData.notesByNoteId[noteId];

	if(note == null)
	{
		DEBUG && GM_log(FUNCNAME + " noteId=", noteId, " note=", note);
		return null;
	}
	
	if(prop)
	{
		if(prop in note)
			return note[prop];
		else
		{
			DEBUG && GM_log(FUNCNAME + " noteId=", noteId, " note[" + prop + "]=", note[prop], " note=", note);
			return null;
		}
	}

	return note;
}

function csv2Array(csv)
{
var DEBUG = debug(false, arguments, false), FUNCNAME = funcname(arguments);

	DEBUG && GM_log("csv.length=", csv.length);

	var csvArr = csv.split(/\r\n|\r|\n/);

	DEBUG && GM_log("csvArr.length=", csvArr.length);

	var headers = csvArr.shift().split(/,/);	// pop the first element and split it
	for(var index = 0; index < headers.length; index++)	
		headers[index] = headers[index].trim();	// trim the values
	
	DEBUG && GM_log("headers=", headers);

	var retArr = [];

	DEBUG && GM_log("csvArr.length=", csvArr.length);
	for(var arrIndex = 0; arrIndex < csvArr.length; arrIndex++)
	{
		var row = csvArr[arrIndex].trim();

		if(row.match(/^$/))
			continue;
		
		row = row.split(/,/);

		for(var rowIndex = 0; rowIndex < row.length; rowIndex++)
		{
			row[rowIndex] = row[rowIndex].trim();	// trim the value

			row[headers[rowIndex]] = row[rowIndex];	// also assign the value as a property on the row
		}

		retArr.push(row);
	}

	DEBUG && GM_log("retArr.length=", retArr.length);
	return retArr;
}

var storedData;
function loadStoredData(expireOldData)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(storedData == null)
	{
		DEBUG && GM_log(FUNCNAME + " storedData=", storedData);

        storedData = {
            notesByNoteId: {},
            loansByLoanId: {},
            loanId2NoteArray: {},
		};

		var noteDataJSON = localStorage.getItem('noteData');
		var loanDataJSON = localStorage.getItem('loanData');

		try
		{
			var notesByNoteId = noteDataJSON ? JSON.parse(noteDataJSON) : null;
			var loansByLoanId = loanDataJSON ? JSON.parse(loanDataJSON) : null;

			DEBUG && GM_log("notesByNoteId=", notesByNoteId);
			DEBUG && GM_log("loansByLoanId=", loansByLoanId);

			/* loanId2Note conversion */
			var loanId2NoteArray = {};
			$.each(notesByNoteId, function(key, note)	// these are properties
			{
				var loanId = '' + note.loanId;	// stringify

//				DEBUG && GM_log("loanId=", loanId, " note=", note);

				if(!loanId2NoteArray[loanId]) loanId2NoteArray[loanId] = [];
				loanId2NoteArray[loanId].push(note);
//				loanId2NoteArray[loanId] = unique(loanId2NoteArray[loanId]).sort();
			});
			DEBUG && GM_log("loanId2NoteArray=", loanId2NoteArray);
						
			DEBUG && GM_log("notesByNoteId.keys=", Object.keys(notesByNoteId).length);
			DEBUG && GM_log("loansByLoanId.keys=", Object.keys(loansByLoanId).length);
			DEBUG && GM_log("loanId2NoteArray.keys=", Object.keys(loanId2NoteArray).length);
			
			storedData.notesByNoteId = notesByNoteId;
			storedData.loansByLoanId = loansByLoanId;
			storedData.loanId2NoteArray = loanId2NoteArray;


			DEBUG && GM_log("storedData=", storedData);
		}
		catch(ex)
		{
			GM_log(FUNCNAME + " ex=", ex, " ", ex.stack);
		}
	}

	//assert storedData should NOT be null at this point

	if(storedData != null && expireOldData)
	{
		DEBUG && GM_log("expireOldData=", expireOldData);

/*
accrual "0.0"
amountLent "1.26" 
interestRate "0.1083" 
loanId "357864" 
nextPaymentDate "20110828" 
noteId "159894" 
orderId "1562575" 
paymentReceived 1.28 
principalRemaining 0 
rate "0.1083" 
status "Fully Paid" 
*/
		var deleteCount = 0;
		$.each(storedData.notesByNoteId, function(index, note)
		{
			delete note.accrual;
			delete note.nextPaymentDate;
			delete note.principalRemaining;
			delete note.status;
//			delete note.amountLent;
//			delete note.paymentReceived;
		});
		
		//cleanup old data
		$.each(storedData.loansByLoanId, function(index, note)
		{
			delete note.ficoTrend;
		});

		if(deleteCount > 0) GM_log("expiring old data, deleteCount=" + deleteCount);
	}

	return storedData;
}

function saveStoredNotes(notes)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);
	
	loadStoredData(true/*expireOldData*/);	// make sure it's loaded

	for(var index = 0; index < notes.length; index++)
	{
		var note = notes[index];

		var noteId = '' + note.noteId;
		var loanId = '' + note.loanId;

		/* if it doesn't exist then create it */
		if(storedData.notesByNoteId[noteId] == null)
			storedData.notesByNoteId[noteId] = {};

		/* merge the elements (new values overwrite the old ones) */
		$.extend(storedData.notesByNoteId[noteId], note);	

		if(note.interestRate)
		{
			if(storedData.loansByLoanId[loanId] == null)
				storedData.loansByLoanId[loanId] = {};
			storedData.loansByLoanId[loanId].interestRate = note.interestRate;
		}

		if(!storedData.loanId2NoteArray[loanId]) storedData.loanId2NoteArray[loanId] = [];
		storedData.loanId2NoteArray[loanId].push(note);
		storedData.loanId2NoteArray[loanId] = unique(storedData.loanId2NoteArray[loanId]).sort();
	}

	DEBUG && GM_log("storedData.notesByNoteId.keys=", Object.keys(storedData.notesByNoteId).length);
	DEBUG && GM_log("storedData.loansByLoanId.keys=", Object.keys(storedData.loansByLoanId).length);
	DEBUG && GM_log("storedData.loanId2NoteArray.keys=", Object.keys(storedData.loanId2NoteArray).length);

	saveStoredData();	// save it
}

function setLoanFlags(loanId, flags)
{
var DEBUG = debug(false, arguments);

	loadStoredData();

	if(storedData.loansByLoanId[loanId] == null)
		storedData.loansByLoanId[loanId] = {};
	$.extend(storedData.loansByLoanId[loanId], flags);

	/* save a little space by removing falsey values */
	for(var key in storedData.loansByLoanId[loanId])
		if(!storedData.loansByLoanId[loanId][key])	// false, 0, "" are all falsey, null != false but !null = true
			delete storedData.loansByLoanId[loanId][key];

	DEBUG && GM_log("storedData.loansByLoanId[" + loanId + "]=", storedData.loansByLoanId[loanId]);

	saveStoredData();
}

function saveStoredData()
{
var DEBUG = debug(false, arguments);

	var noteDataJSON = JSON.stringify(storedData.notesByNoteId);
	DEBUG && GM_log(DEBUG + " noteDataJSON=" + noteDataJSON);

	var loanDataJSON = JSON.stringify(storedData.loansByLoanId);
	DEBUG && GM_log(DEBUG + " loanDataJSON=" + loanDataJSON);
	
	localStorage.setItem('noteData', noteDataJSON);
	localStorage.setItem('loanData', loanDataJSON);
}

function getStoredLoan(loanId, prop)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	if(loanId == null || $.trim(loanId) == '')
	{
		printStackTrace(FUNCNAME + " loanId=", loanId);
		return null;
	}

	loanId = '' + loanId;	// stringify
	
	loadStoredData();

	var loan = storedData.loansByLoanId[loanId];
	
	if(!loan)
	{
		GM_log(FUNCNAME + " storedData.loansByLoanId[" + loanId + "]=", storedData.loansByLoanId[loanId]);
		return null;
	}

	return loan;
}

function getStoredInterestRateByLoanId(loanId)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	var loan = getStoredLoan(loanId);

	return loan == null ? null : parseFloat(loan.interestRate);
}

function getStoredNoteForLoanId(loanId)
{
	var notes = getStoredNotesForLoanId(loanId);
	if(notes == null || notes.length == 0)
		return null;
	return notes[0];
}

function getStoredNotesForLoanId(loanId, prop)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	if(loanId == null || $.trim(loanId) == "")
	{
		printStackTrace(FUNCNAME + " loanId=" + loanId + " loanId=" + loanId);
		throw FUNCNAME + " loanId=" + loanId + " loanId=" + loanId;
	}

	var storedData = loadStoredData();
	
	loanId = '' + loanId;	// stringify

	DEBUG && GM_log("storedData.loanId2NoteArray[" + loanId + "]=", storedData.loanId2NoteArray[loanId]);
	
	return storedData.loanId2NoteArray[loanId];	// an array
}

/*
 * loanId + orderId = ok (noteId unknown)
 * noteId + orderId = bad
 * noteId + loanId + any orderId = ok
 */
function loanPerfURL(loanId, orderId, noteId)
{
	/* if we only have to loanId, see if we can find a noteId for it */
	if(typeof loanId == 'object' && typeof orderId == 'undefined' && typeof noteId == 'undefined')
	{
		orderId = loanId.orderId;
		noteId = loanId.noteId;
		if('loanId' in loanId)	// we get this from one place...
			loanId = loanId.loanId;
		else if('loanGUID' in loanId)	// ...and this from another place (e.g. Foliofn)
			loanId = loanId.loanGUID;
		else
			throw "loanPerfURL() loanId=" + loanId;
	}

	var url = sprintf("/account/loanPerf.action?loan_id=%s&order_id=%s&note_id=%s", loanId, orderId, noteId);

	return url;
}


/* the noteIds and loanIds we currently hold
 * XXX move this to be expiring data in the regular saved data
 * YYY sessionStorage isn't quite persistent enough for our purposes
 */
var sessionData = {};

function loadSessionData()
{
	if(sessionData.noteIds)
		return;
	
var FUNCNAME = funcname(arguments);
	
	GM_log("loadSessionData() sessionData=", sessionData);

	/* YYY we don't store it this way anymore, so clean it out */
	GM_log(FUNCNAME + " calling removeItem()...");
	localStorage.removeItem('noteIds');
	localStorage.removeItem('loanIds');
	localStorage.removeItem('purchasedPendingLoanIds');
	localStorage.removeItem('purchasedPendingNoteIds');
	localStorage.removeItem('soldPendingLoanIds');
	localStorage.removeItem('soldPendingNoteIds');
	GM_log(FUNCNAME + " calling removeItem()...DONE!");

	try
	{
		var sessionDataString = localStorage.getItem("sessionData");
		GM_log("sessionDataString=", sessionDataString.split());

		var sessionData2 = JSON.parse(sessionDataString);
		GM_log("sessionData2=", sessionData2);

		if(sessionData2 != null)
			sessionData = sessionData2;
	}
	catch(ex)
	{
		GM_log("ex=", ex);
	}

	GM_log(FUNCNAME + " sessionData=", sessionData);
}

function saveOwnedNotes(notes)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);
	
	var noteIds = {};
	var loanIds = {};

	for(var index = 0; index < notes.length; index++)
	{
		var note = notes[index];

		var noteId = note.noteId;
		var loanId = note.loanId;

		noteIds[noteId] = true;
		loanIds[loanId] = true;
	}

	DEBUG && GM_log("noteIds=", noteIds);
	DEBUG && GM_log("loanIds=", loanIds);

	loadSessionData();

	sessionData.noteIds = noteIds;
	sessionData.loanIds = loanIds;
	
	localStorage.setItem("sessionData", JSON.stringify(sessionData));
}

function saveOwnedNotesPending(sessionData2)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	loadSessionData();

	$.extend(sessionData, sessionData2);	// overwrite
	
	localStorage.setItem("sessionData", JSON.stringify(sessionData));
}


function isNoteSalePending(noteId)
{
	loadSessionData();

	return sessionData.soldPendingNoteIds && sessionData.soldPendingNoteIds[noteId];
}

function isNotePurchasePending(noteId)
{
	loadSessionData();

	return sessionData.purchasedPendingNoteIds && sessionData.purchasedPendingNoteIds[noteId];
}

function isLoanPending(loanId)
{
	loadSessionData();

	return sessionData.purchasedPendingLoanIds && sessionData.purchasedPendingLoanIds[loanId];
}

function isLoanOwned(loanId)
{
	loadSessionData();

	return (sessionData.loanIds && sessionData.loanIds[loanId]) || isLoanPending(loanId);
}

function isNoteOwned(noteId)
{
	loadSessionData();

	return sessionData.noteIds && sessionData.noteIds[noteId];
}

function getNoteLinks(loanId)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	/* Add links to known notes */
	var noteArray = getStoredNotesForLoanId(loanId);
	if(noteArray == null)
		return null;

	var links = [], links2 = [];

	$.each(noteArray, function(index, note)
	{
		var url = loanPerfURL(note);
		/* order them by owned or not owned */
		if(isNoteOwned(note.noteId))
			links.push(sprintf("<a href='%s'>[+]</a>", url));
		else
			links2.push(sprintf("<a href='%s'>[-]</a>", url));
	});

	var str = links.join('') + links2.join('');

	GM_log(FUNCNAME + " str=" + str);

	return str;
}

function parseTrendData(trs)
{
	/* For example:
<tr>
	<td>750-779</td> <td>February 08, 2010</td>
</tr>
<tr>
	<td>780+</td> <td>March 08, 2010</td>
</tr>
<tr>
	<td>780+</td> <td>April 05, 2010</td>
</tr>
...
<tr>
	<td>499-</td> <td>February 07, 2011</td>
</tr>
	 */

	var values = Array();
	var datePrev = null;
	trs.each(function()
	{
		var tds = $(this).find("td");
		var val = tds.eq(0).text();
		val = val.match(/\d+/)[0];
		
		var date = tds.eq(1).text();

		if(datePrev == null || date != datePrev)
			values.push(val);

		datePrev = date;
	});

	/* YYY sparkline fails if there's just one single value */
	if(values.length == 1)
		values.push(values[0]);

	return values;
}

function getComment(comment_loanId)
{
	if(comment_loanId == null || comment_loanId.trim() == "")
	{
		printStackTrace("comment_loanId=" + comment_loanId);
		return null;
	}

	if(!comment_loanId.match(/^comment_/))
		comment_loanId = "comment_" + comment_loanId;

	var comment = localStorage.getItem(comment_loanId);

	if(comment == null)
		return "";

	return comment;
}

	
function calcInterestInMonths(outstandingPrincipal, interestRate, accruedInterest)
{
var DEBUG = debug(false, arguments);

	if(interestRate == null || isNaN(interestRate))
	{
//		GM_log("calcInterestInMonths() outstandingPrincipal=" + outstandingPrincipal + " interestRate=" + interestRate + " accruedInterest=" + accruedInterest);
		return NaN;
	}

	if(outstandingPrincipal == 0)
	{
//		GM_log("calcInterestInMonths() outstandingPrincipal=" + outstandingPrincipal + " interestRate=" + interestRate + " accruedInterest=" + accruedInterest);
		return 0;
	}

	var oneMonthsInterest = outstandingPrincipal * interestRate / 12;

	var accruedInterestInMonths = accruedInterest / oneMonthsInterest;

	if(isNaN(accruedInterestInMonths))
	{
		GM_log("calcInterestInMonths() outstandingPrincipal=" + outstandingPrincipal + " interestRate=" + interestRate + " accruedInterest=" + accruedInterest + " oneMonthsInterest=" + oneMonthsInterest + " accruedInterestInMonths=" + accruedInterestInMonths);
	}

	DEBUG && GM_log(DEBUG + " returning " + accruedInterestInMonths);
	return Math.floor(accruedInterestInMonths * 10) / 10;
}

function parseFloat2(val)
{
	if(!val)
		return val;

	val = val.replace(/[$,]/g, '');

	return parseFloat(val);
}

	
var href = location.href;
GM_log("href=" + href);

function doLoanPerfPart1(table)
{
var DEBUG = debug(true, arguments);

	GM_log("location=", location);

	var asking_price = location.href.match(/&asking_price=(\d+\.*\d*)/);
	if(asking_price)
		asking_price = parseFloat(asking_price[1]);

	var our_asking_price = location.href.match(/&our_asking_price=(\d+\.*\d*)/);
	if(our_asking_price)
		our_asking_price = parseFloat(our_asking_price[1]);

	var sale_price = location.href.match(/&sale_price=(\d+\.*\d*)/);
	if(sale_price)
		sale_price = parseFloat(sale_price[1]);

	var purchase_price = location.href.match(/&purchase_price=(\d+\.*\d*)/);
	if(purchase_price)
		purchase_price = parseFloat(purchase_price[1]);

	var par_value_at_sale = location.href.match(/&par_value_at_sale=(\d+\.*\d*)/);
	if(par_value_at_sale)
		par_value_at_sale = parseFloat(par_value_at_sale[1]);

	var fee_at_sale = location.href.match(/&fee_at_sale=(\d+\.*\d*)/);
	if(fee_at_sale)
		fee_at_sale = parseFloat(fee_at_sale[1]);

	var loanId = $("input#loanId").val();	// a hidden field
	var orderId = $("input#orderId").val();	// a hidden field
	var noteId = $("input#noteId").val();	// a hidden field
	if(noteId == "") noteId = null;	// can load a loan page with just an orderId and a loanId, in which case this is empty
	
	/* add noteId to title */
	if(noteId)
	{
		var titleHeader = $(":header:contains(Title:):contains(Loan id:)")
		titleHeader.html(
			titleHeader.html().replace(/(\(Loan id: \d+)(\))/, "$1, Note id: " + noteId + "$2"));
	}

	var loanFraction = parseFloat2($("th:contains('Loan Fraction') + td").text());

	var interestRateGradeCell = $("th:contains('Rate') + td");
	var interestRateGrade = interestRateGradeCell.text().match(/(.*?)\s*:\s*([\d\.]+)%/);
	var interestRate = parseFloat(interestRateGrade[2]) / 100;
	var interestGrade = interestRateGrade[1];
		
	if(interestRate == 0.06 && interestGrade != 'A1')
		interestRateGradeCell.attr("title", "Servicemembers Civil Relief Act?");
	else if(noteId)
	{
		/*YYY sometimes interestRate displayed does not match interestRate in the csv file */
		var note = getStoredNote(noteId);
		if(note)
		{
			GM_log("note.interestRate=", note.interestRate);
			if(note.interestRate != interestRate)
				interestRateGradeCell.attr("title", sprintf("My Notes &gt; Download All &gt; InterestRate=%s", note.interestRate));
		}
	}

	/*
	 * sanity check, minimum interest rate is like 4%
	 * http://www.lendingclub.com/public/how-we-set-interest-rates.action
	 */
	if(interestRate < 0.02)
	{
		GM_log(FUNCNAME + "... loanId=" + loanId + " interestRate=" + interestRate);
		alert(FUNCNAME + " loanId=" + loanId + " interestRate=" + interestRate);
		interestRate = null;
	}

	var termInMonths = parseInt($("th:contains('Term') + td").text().match(/([\d\.]+)/)[1]);
	
	/* for example:
	 * <th>Status</th> <td><span style="color: white; background-color: red;">Charged Off</span> </td> </tr>
	 * <tr> <th>Status</th> <td>Current </td> </tr>
	 */
	var status = $("th:contains('Status') + td").text().replace("/\n/g", " ").trim();
	var paymentPlan = status.match(/On Payment Plan/);	// null if no match found
	
	if(paymentPlan)
	{
		paymentPlan = true;
		status = status.replace(/On Payment Plan/, "").trim();	// take the payment plan bit out of the status
	}
	
	var issuedDate = $("th:contains('Issued Date') + td").text().replace("/\n/g", " ").trim();
	issuedDate = text2Date(issuedDate);

	var outstandingPrincipal = parseFloat2($("th:contains('Outstanding Principal') + td").text());
		
	var origPaymentAmount = 
		floor2Decimals(
			PMT(interestRate / 12, termInMonths, loanFraction) * -1);	// the value is negative

	var vars = {
		loanId : loanId,
		orderId : orderId,
		noteId : noteId,
		loanFraction : loanFraction,
		interestRate : interestRate,
		termInMonths : termInMonths,
		status : status,
		paymentPlan : paymentPlan,
		outstandingPrincipal : outstandingPrincipal,
		origPaymentAmount : origPaymentAmount,
		issuedDate : issuedDate,
		asking_price : asking_price,
		our_asking_price : our_asking_price,
		sale_price : sale_price,
		purchase_price : purchase_price,
		par_value_at_sale : par_value_at_sale,
		fee_at_sale : fee_at_sale,
	};
	
	DEBUG && GM_log("vars=", vars);

	return vars;
}

function highlightRecurseDOM(elements, regex, className, DEBUG)
{
var DEBUG = debug(DEBUG, arguments);

	elements
		.each(function(index, elment) {
			DEBUG && GM_log(DEBUG + " index=", index, " elment=", elment);
		})
		.filter(function() {
			return this.childNodes.length == 1 && this.firstChild.nodeType == 3;	// text only nodes
		})
		.each(function()
		{
			var element = $(this);

			var html = element.html();

			var html2 = html.replace(
				regex,
				"<span class='" + className + "'>$1</span>"
			);

			if(html2 != html)	// only save it if it changed
			{
				DEBUG && GM_log("html2=", html2);
				element.html(html2);
			}
		});
}


var highlightLoanPerfBAD;
var highlightLoanPerfWARNING;

function highlightLoanPerf()
{
var DEBUG = debug(false, arguments);

	if(!highlightLoanPerfBAD)
	{
		highlightLoanPerfBAD = RegExp("(charged\\s*off|default|deceased|bankrupt\\S*|lawsuit|bankruptcy counsel|external collections|collections|engaged with debt consolidator|skip trace|mail.*letter)", "gi");
		highlightLoanPerfWARNING = RegExp("(Processing...|partial payment|payment failed|\\d+ days late|check payment|payment failed|mail service|no voicemail|3rd party|partial payment|not\\s*received|on payment plan)", "gi");
	}

	var body = $("body, body *").not("div#lcLoanPerf1 *");	//YYY don't modify the Payment History, it sticks around in Chrome
	//XXX change this so the warnings are returned from those funcs?

	/*
	 * add some warnings to the top
	 */
	var warning = "", warning2 = "", warning3 = "";
	
	var html = $("body").html();

	html = html.replace(/(\s+)/gm, ' ');	// make one big line for multiline Recoveries match XXX should probably do this a little better

	if(html.match(/(charged\s+off)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(default)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(deceased)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(lawsuit)/i))
		warning += '/' + RegExp.$1;

	/* some examples:
	 * Borrower filed for Chapter 13 Bankruptcy
	 * Borrower filed for Chapter 7 Bankruptcy (No Asset) 
	 * Borrower provided Bankruptcy counsel information
	 */
	if(html.match(/(chapter[\s\d]*bankruptcy)/i))
		warning += '/' + RegExp.$1;
	else if(html.match(/(Bankruptcy\s*counsel)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(external collections)/i))
		warning += '/' + RegExp.$1;
	else if(html.match(/(collections)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/engaged with debt (consolidator)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(skip trace)/i))
		warning += '/' + RegExp.$1;

	if(html.match(/(Processing\.\.\.)/))
		warning2 += '/' + RegExp.$1;
	
	if(html.match(/(On Payment Plan)/))	// not ignore case
		warning2 += '/' + RegExp.$1;
	
	if(html.match(/(check payment)/i))
		warning2 += '/' + RegExp.$1;

	if(html.match(/(Fully Paid)/))
		warning3 += '/' + RegExp.$1;

/* e.g.
<tr> <th>Recoveries</th> <td>$17.04</td> </tr>
*/
	if(html.match(/(Recoveries)[^\$]*\$([\d.]+)/))
	{
		if(parseFloat(RegExp.$2) > 0.00)
			warning3 += '/' + RegExp.$1;
	}

	if(html.match(/(No Fee)/))
		warning3 += '/' + RegExp.$1;

	/* remove any initial slashes */
	warning = warning.replace(/\//, '').toUpperCase();
	warning2 = warning2.replace(/\//, '');
	warning3 = warning3.replace(/\//, '').toUpperCase();


	highlightRecurseDOM(body, highlightLoanPerfBAD, 'lcac_redRev');
	highlightRecurseDOM(body, highlightLoanPerfWARNING, 'lcac_yellowRev');


	$("div#noFee:contains('No Fee:')").addClass("lcac_greenrev");
	$("tr:contains('Recoveries')").not(":contains('$0.00')").addClass("lcac_greenrev");


	if(warning != '')
		warning = '<br><span class="lcac_red">' + warning + '</span>';

	if(warning2 != '')
		warning2 = '<br><span class="lcac_yellow">' + warning2 + '</span>';
	
	if(warning3 != '')
		warning3 = '<br><span class="lcac_green">' + warning3 + '</span>';

	// append warnings to Loan Performance header
	$(":header:contains('Loan Performance')")
		.append(
			warning +
			warning2 +
			warning3 +
			"");
}

getLoanId.DEBUGCOUNT = -1;
/* extract the loanId */
function getLoanId(tr, loanIdColumnIndex, loanIdEmbeddedColumnIndex)
{
var DEBUG = debug(false, arguments);
DEBUG && getLoanId.DEBUGCOUNT++;

	try
	{
		var tds = tr.find("td");

		var loanId = null;
		if(loanIdEmbeddedColumnIndex != null)	//XXX this is wrong for completeLoanPurchase.action
		{
			var td = tds.eq(loanIdEmbeddedColumnIndex);
			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("td=", td);

			var html = td.html();
			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("html=", html);

			var loanId = html.match(/loan_id=(\d+)/);	// extract the loanId from the anchor URL

			if(loanId)
				loanId = loanId[1];

			if(loanId == "")
				loanId = null

			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("getLoanId() loanId=", loanId);
		}

		if(loanId == null && loanIdColumnIndex != null)
		{
			var td = tds.eq(loanIdColumnIndex);
			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("tds.eq(loanIdColumnIndex)=", tds.eq(loanIdColumnIndex));

			var text = td.text();
			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("tds.eq(loanIdColumnIndex).text()=" + tds.eq(loanIdColumnIndex).text());

			var loanId = text.match(/(\d+)/)[1];			// extract the loanId from the HTML text

			if(loanId == "")
				loanId = null;

			DEBUG && getLoanId.DEBUGCOUNT < 10 && GM_log("loanId=", loanId);
		}

		if(loanId == null)
			throw "getLoanId() loanId=" + loanId;

		if(!loanId.match(/^\d+$/))
			throw "getLoanId() loanId=" + loanId;

		return loanId;
	}
	catch(ex)
	{
		GM_log("getLoanId() ex=", ex);
		GM_log("typeof ex.stack=" + typeof ex.stack);
		GM_log("ex.stack=" + ex.stack);
		GM_log("tr=", tr);
		return null;
	}
}

/* extract the noteId */
function getNoteId(tr, noteIdColumnIndex)
{
var DEBUG = debug(false, arguments);

	try
	{
		var td = tr.find("td").eq(noteIdColumnIndex);

		DEBUG && GM_log("td=", td);

		var html = td.html();

		DEBUG && GM_log("html=" + html);

		var noteId = html.match(/(\d+)/)[1];			// extract the noteId from the HTML text

		if(noteId == "")
			noteId = null;

		DEBUG && GM_log("noteId=" + noteId);

		return noteId;
	}
	catch(ex)
	{
		GM_log("getNoteId() tr=", tr, " noteIdColumnIndex=", noteIdColumnIndex);
		GM_log("td=", td);
		GM_log("html=", html);
		GM_log("ex=", ex, " ", ex.stack);
		return null;
	}
}

function parseInterestRate(loanId, text)
{
var DEBUG = debug(false, arguments);

	if(text.match(/Not Stored/))
	{
		printStackTrace("Not stored");
		return null;
	}

	DEBUG && GM_log("parseInterestRate() loanId=", loanId, " text=", text);

//	var text2 = text.match(/(\d+|\d+\.{0,1}\d+)%/)[1];
	var text2 = text.match(/(\d+(.\d+)*)%/)[1];
	
	DEBUG && GM_log("text2=", text2);

	var interestRate = parseFloat(text2) / 100;
	
	DEBUG && GM_log("interestRate=", interestRate);

	if(isNaN(interestRate) || interestRate < 0.05)
	{
		GM_log("parseInterestRate()... loanId=" + loanId + " text=" + text + " interestRate=" + interestRate);
		return null;
	}

	return interestRate;
}

function scanLoanPerf(loanId, dom)
{
var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

	var vars = {};
	
	var outstandingPrincipal = parseFloat2(dom.find("th:contains(Outstanding Principal) + td").text());
	DEBUG && GM_log("outstandingPrincipal=", outstandingPrincipal);

	var inProcessing = dom.find("table#lcLoanPerfTable1 tr:contains(Processing...)");
	if(inProcessing.length > 0)
		inProcessing = inProcessing.text().match(/\d+\/\d+\/\d+/);
	else
		inProcessing = null;

	var noFee = dom.find("div#noFee:contains(No Fee)");
	noFee = noFee.length > 0;

	/* all charged off loans have a Recoveries field, but it's often just $0.00 */
	var recoveries = dom.find("th:contains(Recoveries) + td");
	if(recoveries.length > 0)
		recoveries = parseFloat2(recoveries.text());	// remove the dollar sign
	else
		recoveries = null;
	
	var status = dom.find("th:contains(Status) + td").text();

	var chargedOffDefault = status.match(/(charged\s*off|default)/i);	// charged off and default do not appear here
	GM_log("chargedOffDefault=", chargedOffDefault);
	if(chargedOffDefault)
		chargedOffDefault = chargedOffDefault[0];
	else
		chargedOffDefault = null;
	
	var paymentPlan = status.match(/On Payment Plan/i);
	GM_log("paymentPlan=", paymentPlan);
	paymentPlan = paymentPlan && paymentPlan.length > 0;
	
	/* Parse the Collection log
	 * Note: Collection Log can be non-existent
	 */
	var collectionLogText = dom.find("div#lcLoanPerf2").text();
	var bankruptDeceased = collectionLogText.match(/charged\s*off|deceased|chapter.*?bankrupt\w*|lawsuit/ig);
	if(bankruptDeceased)
		bankruptDeceased = bankruptDeceased.join(',').toLowerCase();
	GM_log("bankruptDeceased=", bankruptDeceased);

	var ficoTrend = parseTrendData(dom.find("table#trend-data tbody tr"));
	DEBUG && GM_log("ficoTrend=", ficoTrend);

	//YYY ficoTrend appear to always have at least 2 values in the trend
	var fico = ficoTrend[ficoTrend.length - 1];
	var ficoPrev = ficoTrend[ficoTrend.length - 2];
	
	var ficoDrop = (fico - 400) - (ficoPrev - 400);
	var ficoDropPercent = ficoDrop / (ficoPrev - 400);
	DEBUG && GM_log("ficoDrop=", ficoDrop, " ficoDropPercent=", ficoDropPercent);
	ficoDrop = ficoDropPercent < -FICODROPPERCENT ? ficoDrop : null;
	
	$.extend(vars, {
		noFee: noFee,
		recoveries: recoveries,
		paymentPlan: paymentPlan,
		chargedOffDefault: chargedOffDefault,
		bankruptDeceased: bankruptDeceased,
		fico: fico,
		ficoDrop: ficoDrop,
		inProcessing: inProcessing,
		outstandingPrincipal: outstandingPrincipal,
	});
	
	setLoanFlags(loanId, vars);

	DEBUG && GM_log(FUNCNAME + " vars=", vars);
	
	return {vars:vars, ficoTrend:ficoTrend};
}

function updateCommentTextBoxes(comment_loanId, comment)
{
var DEBUG = debug(false, arguments);

	var commentTextBoxes = $(sprintf("input.commentTextBox[name='%s']", comment_loanId));

	DEBUG && GM_log("commentTextBoxes=", commentTextBoxes);

	if(commentTextBoxes.length == 0)
		return;

	commentTextBoxes.val(comment);
}

function setComment(comment_loanId, comment)
{
var DEBUG = debug(false, arguments);

	if(comment_loanId != null) comment_loanId = comment_loanId.trim();
	if(comment == null) comment = ""; else comment = comment.trim();

	if(comment_loanId == null || comment_loanId == "")
	{
		printStackTrace("comment_loanId=" + comment_loanId);
		return;
	}

	if(!comment_loanId.match(/^comment_/))
		comment_loanId = "comment_" + comment_loanId;

	DEBUG && GM_log("comment_loanId=", comment_loanId);

	if(comment == "")
		localStorage.removeItem(comment_loanId);	// this will call the window's 'storage' listeners
	else
		localStorage.setItem(comment_loanId, comment);	// this will call the window's 'storage' listeners
	

	/* NOTE: localStorage only notifies other pages, so we'll call this here
	 * in case we have multiple notes for the same loan on our page
	 */
	updateCommentTextBoxes(comment_loanId, comment);
}

function attachLocalStorageCommentListener()
{
var DEBUG = debug(false, arguments);

	if(attachLocalStorageCommentListener.listenerAlreadyAdded == true)
		return;

	attachLocalStorageCommentListener.listenerAlreadyAdded = true;

	// NOTE: can have more than 1 textbox with the same loanId
//	$(window).bind('storage',	//XXX this gets events but doesn't have key?
	unsafeWindow.addEventListener('storage',
		function(event)
		{
			DEBUG && GM_log("unsafeWindow.addEventListener$storage() event=", event);

			var key = event.key;

			if(key.match(/^comment_/))
			{
				var comment_loanId = key;
				var comment = getComment(comment_loanId);

				updateCommentTextBoxes(comment_loanId, comment);
			}
		});
}

function importJSON(jsonString)
{
var DEBUG = debug(false, arguments);

	var obj = JSON.parse(jsonString);

	DEBUG && GM_log("obj.noteData=", obj.noteData);
	DEBUG && GM_log("obj.loanData=", obj.loanData);

	$.extend(storedData.notesByNoteId, obj.noteData);	// merge these
	$.extend(storedData.loansByLoanId, obj.loanData);

	delete obj.noteData;
	delete obj.loanData;

	saveStoredData();
	
	$.extend(localStorage, obj);	// overwrite these (comments)
	
	DEBUG && GM_log("localStorage.noteData=", localStorage.noteData);
	DEBUG && GM_log("localStorage.getItem('noteData')=", localStorage.getItem('noteData'));
	DEBUG && GM_log("localStorage.loanData=", localStorage.loanData);
}
		
function exportJSON()
{
var DEBUG = debug(false, arguments);

	loadStoredData();

	var obj = {};
	
	for(var key in localStorage)
	{
		if(key.match(/^comment_/))
		{
			var comment = localStorage.getItem(key);
			obj[key] = comment;
		}
	}

	obj.noteData = storedData.notesByNoteId;	// this is all regenerated isn't it?
	obj.loanData = storedData.loansByLoanId;
	
	var objJSON = JSON.stringify(obj);
	
	DEBUG && GM_log("objJSON=", objJSON.length, " " + objJSON.substr(0, 1024) + "...");
		
	return objJSON;
}
	
function exportLocalStorage()
{
var DEBUG = debug(false, arguments);
	
	var objJSON = exportJSON();

//	var exportWindow = window.open('data:text/plain;charset=utf8;' +
//		'base64,' + btoa(
////			encodeURIComponent(
//				objJSON
////			)
//		)
//		, "_blank");

	var exportWindow = window.open(null, "_blank");
	if(exportWindow == null)
	{
		alert("Could not open a new window. Are popups blocked?");
		return;
	}

	exportWindow.document.write(
		"<head>" +
		"<title>Export Comments</title>" +
		"<meta name='content-disposition' content='inline; filename=exportLocalStorage.json'>" +
		"</head><body>" +
//		"<pre>" +	// wordwraps without this
		"");
	exportWindow.document.write(objJSON);
	exportWindow.document.close();
}

//unsafeWindow.importJSON = importJSON;
//unsafeWindow.exportJSON = exportJSON;
//unsafeWindow.exportLocalStorage = exportLocalStorage;

function checkWARNINGACCEPTED()
{
	var WARNINGACCEPTED = getStoredValue("WARNINGACCEPTED");
	if(WARNINGACCEPTED)
		return true;

	var ret = prompt("You use Auto Adjust at your OWN RISK! Always check and double-check values before submitting!! Initial here that you understand and agree, then hit OK.\n\n! ! ! OTHERWISE HIT CANCEL ! ! !")

//	GM_log("ret=" + ret);

	if(ret != null)
		ret = ret.trim();

	if(!ret)	// null or blank
	{
		throw "checkWARNINGACCEPTED() Warning not accepted";
		return false;
	}
	else
	{
		setStoredValue("WARNINGACCEPTED", ret + " " + new Date());

		WARNINGACCEPTED = getStoredValue("WARNINGACCEPTED");
//		GM_log("WARNINGACCEPTED=" + WARNINGACCEPTED);

		return false;	// warning dialog interferes with timeout markup updater
	}
}

function scanForLoanPerfLinks(dom, save)
{
var DEBUG = debug(true, arguments);

	save = typeof save == 'undefined' ? true : save;	// default value

	/* don't need Expired & Removed Notes */
	var loanPerfLinks = dom.find("a[href*='loanPerf.action?loan_id=']");

	var notes = [];
	
	loanPerfLinks.each(function()
	{
		var href = $(this).prop('href');

		var loanId = href.match(/loan_id=(\d+)/)[1];
		var orderId = href.match(/order_id=(\d+)/)[1];
		var noteId =  href.match(/note_id=(\d+)/);
		if(noteId) noteId = noteId[1];

		/* in older version of tradingAccount.action note_id is not in the link XXX handle this better? */
		if(!noteId)
		{
			GM_log("noteId=", noteId);
			return;
		}

		var note = {
				noteId: noteId,
				loanId: loanId,
				orderId: orderId,
			};

		notes.push(note);
	});

	if(save)
		saveStoredNotes(notes);

	return notes;
}

function getAvailableCash(callback)
{
var FUNCNAME = funcname(arguments);

	var url = '/browse/cashBalanceAj.action?rnd=' + new Date().getTime();
	$.get(url, function(data)	/* callback */
	{
		if(!data || data == "")
		{
			callback(null);
			return;
		}

		data = $.parseJSON(data);
			
		var availableCash = data.cashBalance.replace(/[\$,]/g, '');	// remove dollar signs and commas

		GM_log(FUNCNAME + " data", data, " availableCash=", availableCash);

		callback(availableCash);

	})
	.error(function(jqXHR, textStatus, errorThrown) 
	{
		GM_log("cashBalanceAj error textStatus=", textStatus, " errorThrown=", errorThrown); 
		callback(null);
	});
}

function calcPending(table, addclass, pendingLoanIds, pendingNoteIds)
{
var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

	if(!table)
		throw FUNCNAME + " table=" + table;

	var orderStatusColumnIndex = table.find("thead th:contains(Order Status)").index();
	var priceColumnIndex = table.find("thead th:contains(Price)").index();
	var noteStatusColumnIndex = table.find("thead th:contains(Note Status)").index();
	GM_log("orderStatusColumnIndex=", orderStatusColumnIndex, " priceColumnIndex=", priceColumnIndex);

	var pendingTotal = 0;

	/* It's possible Note Title could have the word "pending" in it */
	var elements = table.find("tbody tr td:nth-child(" + (orderStatusColumnIndex + 1) + "):contains(Pending)");

	elements
		.each(function(index, element)
		{
			var orderStatusElement = $(element);
			
			if(pendingLoanIds)
			{
				var noteStatusElement = orderStatusElement.closest("tr").find("td:eq(" + noteStatusColumnIndex + ")")

				var loanId = noteStatusElement.html().match(/loan_id=(\d+)/)[1];
				pendingLoanIds[loanId] = true;

				var noteId = noteStatusElement.html().match(/note_id=(\d+)/)[1];
				pendingNoteIds[noteId] = true;
			}

			var priceElement = orderStatusElement.closest("tr").find("td:eq(" + priceColumnIndex + ")")

			var value = priceElement.text().match(/\d+.\d+/);
			value = parseFloat(value);
			pendingTotal += value;
		});

	GM_log("pendingLoanIds=", pendingLoanIds);
	GM_log("pendingNoteIds=", pendingNoteIds);
	
	if(addclass)
		elements.addClass(addclass)

	GM_log(FUNCNAME + " pendingTotal=", pendingTotal, " pendingLoanIds=", pendingLoanIds);
	return pendingTotal;
}

$(document).ready(

/* AFTER ready */
function doitReady()
{
//	"use strict";	// ewl 2012-12-02
var DEBUG = debug(true, arguments);
		
try
{
	var innerHTML = document.body.innerHTML;
	if(innerHTML.match(/Member Sign-In/))	// sometimes it's the login page
		return;
	else if(innerHTML.match(/Lending Club is Temporarily Unavailable/))	// sometimes it's down
		return;

	GM_log("window.name=" + window.name);
	GM_log("document.title=" + document.title);
	if(document.title.match(/Export Comments/)
	|| document.title.match(/Scan Loans/)
	|| document.title.match(/Scan Orders/)
	|| document.title.match(/Foliofn Export/)
	|| document.title.match(/Foliofn Diffs/))
		return;

	/* in case we're in a page we opened so we don't reuse ourselves */
	if(window.name == '_scanLoans' 
	|| window.name == '_scanLoans2'
	|| window.name == '_scanOrders'
	|| window.name == '_foliofnLoansExport')
	{
		GM_log("resetting window.name");
		window.name = '';	
	}

	var CHECKBOXLIMIT = GM_getValue("CHECKBOXLIMIT", 500);
	var LOANPERFHIDEROWS = GM_getValue("LOANPERFHIDEROWS", true);
	var MAXEXPIRES = GM_getValue("MAXEXPIRES", 7);
	var GAINLOSS = GM_getValue("GAINLOSS", true);
	var FICOWAYDOWN = GM_getValue("FICOWAYDOWN", 519);

	var TABLESORTER = GM_getValue("TABLESORTER", true);
	var TABLESORTER2 = GM_getValue("TABLESORTER2", true);
	var TABLESORTER2DELAYINIT = GM_getValue("TABLESORTER2DELAYINIT", true);
	var TABLESORTER3 = GM_getValue("TABLESORTER3", false);
	var DETACHTABLES = GM_getValue("DETACHTABLES", true);
	
	var headerLimits = {
		askingPriceMax: getStoredValue("askingPriceMax", 1000.0),
		askingPriceStrict: getStoredValue("askingPriceStrict", true),
		markupMax: getStoredValue("markupMax", 0.05),
		markupMaxStrict: getStoredValue("markupMaxStrict", true),

		ytmMin: getStoredValue("ytmMin", 0.0),
		ytmStrict: getStoredValue("ytmStrict", false),
		irrMin: getStoredValue("irrMin", 0.0),
		irrStrict: getStoredValue("irrStrict", false),
		accruedInterestStrict: getStoredValue("accruedInterestStrict", false),
		excludeTooMuchInterestPer12Months: getStoredValue("excludeTooMuchInterestPer12Months", false),
		excludeTooMuchInterestThisYear: getStoredValue("excludeTooMuchInterestThisYear", false),
		principalPlusMin: getStoredValue("principalPlusMin", 1.0),
		principalPlusStrict: getStoredValue("principalPlusStrict", true),
		
	//	term36: getStoredValue("term36", true),
	//	term60: getStoredValue("term60", true),
		term: getStoredValue("term", "0"),
		termStrict: getStoredValue("termStrict", false),

		foliofnMarkupLowLimit: getStoredValue("foliofnMarkupLowLimit", 0.00),
		foliofnMarkupHighLimit: getStoredValue("foliofnMarkupHighLimit", 10.00),
		
		remainingPaymentsMax: getStoredValue("remainingPaymentsMax", 0.0),
	};

	var lateMonths1 = getStoredValue("lateMonths1", 4.5);
	var lateMonths2 = getStoredValue("lateMonths2", 3.5);
	var lateMonths3 = getStoredValue("lateMonths3", 2.5);
	var lateMonths4 = getStoredValue("lateMonths4", 1.5);

	function setHeaderLimit(name, element, likelyPercent)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		if(element instanceof jQuery) element = element.get(0);

		var value = null;
		if(element.type == 'checkbox')
		{
			value = $(element).prop('checked');
		}
		else if(element.type == 'select-one')	//XXX could also 'select-multiple'
		{
			value = $(element).val();	
		}
		else if(element.type == 'text')
		{
			value = $(element).val();

			var percent = value
				.replace(/\$/, '')
					.match(/%/);

			value = parseFloat(value);

			if(percent)
				value /= 100;
			else if(likelyPercent)	// interpret large values as a percent as well. How large?
			{
				if(value < 1)
					percent = true;
				else
				{
					value /= 100;
					percent = true;
				}
			}
			
			/* reformat and update the textfield */
			var valueString = percent ? sprintf("%0.1f%%", value * 100) : sprintf("%0.2f", value);
			
			$(element).val(valueString);
		}

		headerLimits[name] = value;
		setStoredValue(name, value);

		var closestTable = $(element).closest("table");

		closestTable.data('colorIsDirty', true);
	}

	function createStyle(css)
	{
		var style = document.createElement('style');

		style.type = 'text/css';
		if(style.styleSheet)
			style.styleSheet.cssText = css;
		else
			style.appendChild(document.createTextNode(css));

		return style;
	}

	function set_hideOwnNotes(value)
	{
		setStoredValue("hideOwnNotes", value);

		var head = document.getElementsByTagName('head')[0];

		if(value)
		{
			if(!set_hideOwnNotes.style)
				set_hideOwnNotes.style = createStyle("tr.lcac_ownNote {display:none}");
			head.appendChild(set_hideOwnNotes.style);
		}
		else
			if(set_hideOwnNotes.style) head.removeChild(set_hideOwnNotes.style);

		updateFirst();
	}

	function set_hideAlreadyInvested(value)
	{
		setStoredValue("hideAlreadyInvested", value);

		var head = document.getElementsByTagName('head')[0];

		if(value)
		{
			if(!set_hideAlreadyInvested.style)
				set_hideAlreadyInvested.style = createStyle("tr.lcac_alreadyInvested {display:none}");
			head.appendChild(set_hideAlreadyInvested.style);
		}
		else
			if(set_hideAlreadyInvested.style) head.removeChild(set_hideAlreadyInvested.style);

		updateFirst();
	}

	function set_hideNotFirst(value)
	{
		setStoredValue("hideNotFirst", value);

		var head = document.getElementsByTagName('head')[0];

		if(value)
		{
			if(!set_hideNotFirst.style)
				set_hideNotFirst.style = createStyle("tr.lcac_notfirst {display:none}");
			head.appendChild(set_hideNotFirst.style);
		}
		else
			if(set_hideNotFirst.style) head.removeChild(set_hideNotFirst.style);

		updateFirst();
	}

	function set_hideUnlikedRows(value)
	{
		setStoredValue("hideUnlikedRows", value);

		var head = document.getElementsByTagName('head')[0];

		if(value)
		{
			if(!set_hideUnlikedRows.style)
				set_hideUnlikedRows.style = createStyle("tr.lcac_unlikedRow {display:none}");
			head.appendChild(set_hideUnlikedRows.style);
		}
		else
			if(set_hideUnlikedRows.style) head.removeChild(set_hideUnlikedRows.style);

		updateFirst();
	}

	var greenHigh = "#7fff7f";	// dark
	var greenMed = "#afffaf";
	var greenLow = "#cfffcf";	// light
	var redHigh = "#ff7f7f";
	var redMed = "#ffafaf";
	var redLow = "#ffdfdf";
	var yellowHigh = "#ffff7f";
	var yellowMed = "#ffffaf";
	var yellowLow = "#ffffcf";
	var orangeHigh = "#FF9900";	// dark
	var orangeMed = "#FFB84D";
	var orangeLow = "#FFD699";	// light



	/*YYY we may be using params not mentioned here when TESTING is off */
	var adjustAskingPriceAutoFuncProto =
		"function(row, loanId, count, interestRate, principalPlus, loanStatus, outstandingPrincipal, accruedInterest, accruedInterestInMonths, foliofnMarkupHighLimit, foliofnMarkupLowLimit, tooMuchInterestThisYear, tooMuchInterestPer12Months" +
		(TESTING
		? ", bankruptDeceased, fico, ficoWayDown, ficoDrop, geolocation, amountLent, paymentReceived"
		: "") +
		")";

	var adjustAskingPriceAutoFuncBodyDefault =
		"return principalPlus * (interestRate > 0.10 ? 1.02 : 1.015);";	// something simple

	var adjustAskingPriceAutoFuncBody;	// the current definition of the body

	var adjustAskingPriceAutoFunc = null;	// the instance of the current function

	/* create the function definition and eval it, assigns to adjustAskingPriceAutoFunc */
	function setAdjustAskingPriceAuto0(body)
	{
	var DEBUG = debug(false, arguments);

		adjustAskingPriceAutoFuncBody = body;	// save it to the global variable
		setStoredValue("adjustAskingPriceAutoFuncBody", adjustAskingPriceAutoFuncBody);	// write it to storage

		var str =
			"adjustAskingPriceAutoFunc = " +
				adjustAskingPriceAutoFuncProto +
				"{" +
	//			"'use strict';" +
					adjustAskingPriceAutoFuncBody +
				"}";

		try
		{
			DEBUG && GM_log("calling eval()... str=" + '"' + str + '"');
			eval(str);	// will assign to the global variable adjustAskingPriceAutoFunc
			DEBUG && GM_log("calling eval()...DONE! adjustAskingPriceAutoFunc=" + adjustAskingPriceAutoFunc);
		}
		catch(ex)
		{
			adjustAskingPriceAutoFunc = null;

			throw ex;
		}
	}


	/* set up the function on load with the current definition or a default definition */
	function setAdjustAskingPriceAutoResetDefault(body)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		try
		{
			setAdjustAskingPriceAuto0(body);
			return true;
		}
		catch(ex)
		{
			GM_log(FUNCNAME + " ex=", ex);

			var ret = confirm(
				ex + "\n\n" +
				"\"" + body + "\"" + "\n\n" +
				"Reset to default?");

			if(ret)	// OK
				setAdjustAskingPriceAuto0(adjustAskingPriceAutoFuncBodyDefault);
		}
	}
	
	setAdjustAskingPriceAutoResetDefault(getStoredValue("adjustAskingPriceAutoFuncBody", adjustAskingPriceAutoFuncBodyDefault));

	function editAskingPriceAuto()
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		if(!checkWARNINGACCEPTED())
			return;

		var body = adjustAskingPriceAutoFuncBody;
		while(true)
		{
			body =
				prompt(
					adjustAskingPriceAutoFuncProto,	// message
					body);	// default text

			if(body == null)	// user selects "Cancel"
				return;
			
			GM_log("body=" + body + "=", body.split(''));	// body.split will print string as array so you can see each character

			body = body.trim();

			if(body == "")	// user enters blank XXX confirm reset to default?
			{
				var ret = confirm(
					"Reset to default?");

				if(ret) // OK
					body = adjustAskingPriceAutoFuncBodyDefault;
			}

			try
			{
				setAdjustAskingPriceAuto0(body);
				return true;
			}
			catch(ex)
			{
				GM_log(FUNCNAME + " ex=%o", ex);

				var ret = confirm(
					ex + "\n\n" +
					"\"" + body + "\"" + "\n\n" +
					"Try again?");

				GM_log("ret=" + ret);
				if(!ret)	// Cancel
				{
					var ret = confirm(
						"Reset to default?");

					if(ret)
						body = adjustAskingPriceAutoFuncBodyDefault;
					else
						return false;
				}
			}
		}
	}

	function addHeaders0(notesTable0,
		addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
		addHideRowsCheckBoxes,
		addDeleteRowButton)
	{
	var DEBUG = debug(true, arguments);

	//	var trHead0 = notesTable0.tHead.rows[0];
		var trHead = $(notesTable0).find("thead tr");
		var trHead0 = trHead.get(0);
		var trFoot = $(notesTable0).find(".tfoot");
		if(trFoot.length == 0)
			trFoot = null;

		if(TESTING)
		if(addDeleteRowButton)
		{
			trHead.append("<th>Toggle</th>");

			if(trFoot)
			{
				var tdFoot = getCellForColumn(trFoot, notesTable0.noteIdColumnIndex);
				var colspan = parseInt(tdFoot.prop("colspan"));
				tdFoot.prop("colspan", colspan + 1);
			}
			
			findHeaders00(notesTable0);
		}


		/* add a "Loan ID" header (before Note ID) */
		if(addLoanIdColumn)
		{
	//XXX before/after in tables doesn't seem to work in chrome
	//		var th = trHead.find("th").eq(notesTable0.noteIdColumnIndex);
	//		DEBUG && GM_log("th=", th);
	//		th.before("<th class='loanId' style='white-space:nowrap;'>Loan ID*</th>");

			var newTH = trHead0.insertCell(notesTable0.noteIdColumnIndex);
			$(newTH).replaceWith("<th class='loanId' style='white-space:nowrap;'>Loan ID*</th>");

			if(trFoot)
			{
				var tdFoot = getCellForColumn(trFoot, notesTable0.noteIdColumnIndex);
				var colspan = parseInt(tdFoot.prop("colspan"));
				tdFoot.prop("colspan", colspan + 1);
			}
			
			findHeaders00(notesTable0);
		}

		/* add a "Interest Rate" header */
		if(addInterestRateColumn)
		{
			var newTH = trHead0.insertCell(notesTable0.loanStatusColumnIndex);
			$(newTH).replaceWith("<th class='storedRate' style='white-space:nowrap;'>Stored Rate*</th>");
			
			if(trFoot)
			{
				var tdFoot = getCellForColumn(trFoot, notesTable0.loanStatusColumnIndex);
				var colspan = parseInt(tdFoot.prop("colspan"));
				tdFoot.prop("colspan", colspan + 1);
			}

			findHeaders00(notesTable0);
		}

		/* add a "Markup" header */
		if(addMarkupColumn)
		{
			var newTH = trHead0.insertCell(notesTable0.askingPriceColumnIndex);
			$(newTH).replaceWith("<th class='markup'>Markup*</th>");
			
			if(trFoot)
			{
				var tdFoot = getCellForColumn(trFoot, notesTable0.askingPriceColumnIndex);
				GM_log("tdFoot=", tdFoot);
				if(tdFoot)
				{
					var colspan = parseInt(tdFoot.prop("colspan"));
					tdFoot.prop("colspan", colspan + 1);
				}
				else
					trFoot.get(0).insertCell(-1);	//XXX fix the other ones
			}
			
			findHeaders00(notesTable0);
		}

		/* add a "IRR" header */
		if(addIRRColumn)
		{
			var newTH = trHead0.insertCell(-1);	// at the end or the header
	//		var newTH = trHead0.insertCell(notesTable0.markupColumnIndex);

			$(newTH).replaceWith("<th class='lcac_irr' onclick='event.stopPropagation();'>IRR* (est.)<br>(experimental)</th>");
			
			if(trFoot)
			{
				var tdFoot = getCellForColumn(trFoot, notesTable0.askingPriceColumnIndex);
				GM_log("tdFoot=", tdFoot);
				if(tdFoot)
				{
					var colspan = parseInt(tdFoot.prop("colspan"));
					tdFoot.prop("colspan", colspan + 1);
				}
				else
					trFoot.get(0).insertCell(-1);	//XXX fix the other ones
			}
			
			findHeaders00(notesTable0);
		}
			
		/* add a "Comment" header (at the end) */
		if(addCommentColumn)
		{
			var newTH = trHead0.insertCell(-1);	// at the end or the header

			$(newTH).replaceWith(
				"<th class='lcac_commentColumn' onclick='event.stopPropagation();' style='white-space:nowrap;'>Comment*</th>");

			if(trFoot)
				trFoot.get(0).insertCell(-1);	// at the end of the footer	(trFoot could be empty)
			
			findHeaders00(notesTable0);
		}
		
		DEBUG && printDebugHeaders(notesTable0);
	}


	function printDebugHeaders(notesTable0)
	{
		GM_log(
			"\nnotesTable0.loanIdEmbeddedColumnIndex=" + notesTable0.loanIdEmbeddedColumnIndex +
			"\nnotesTable0.loanIdColumnIndex=" + notesTable0.loanIdColumnIndex +
			"\nnotesTable0.commentColumnIndex=" + notesTable0.commentColumnIndex +
			"\nnotesTable0.askingPriceColumnIndex=" + notesTable0.askingPriceColumnIndex +
			"\nnotesTable0.salePriceColumnIndex=" + notesTable0.salePriceColumnIndex +
			"\nnotesTable0.purchasePriceColumnIndex=" + notesTable0.purchasePriceColumnIndex +
			"\nnotesTable0.orderExpiresColumnIndex=" + notesTable0.orderExpiresColumnIndex +
			"\nnotesTable0.ytmColumnIndex=" + notesTable0.ytmColumnIndex +
			"\nnotesTable0.irrColumnIndex=" + notesTable0.irrColumnIndex +
			"\nnotesTable0.accruedInterestColumnIndex=" + notesTable0.accruedInterestColumnIndex +
			"\nnotesTable0.markupColumnIndex=" + notesTable0.markupColumnIndex +
			"\nnotesTable0.outstandingPrincipalColumnIndex=" + notesTable0.outstandingPrincipalColumnIndex +
			"\nnotesTable0.principalPlusColumnIndex=" + notesTable0.principalPlusColumnIndex +
			"\nnotesTable0.remainingPaymentsColumnIndex=" + notesTable0.remainingPaymentsColumnIndex +
			"\nnotesTable0.loanStatusColumnIndex=" + notesTable0.loanStatusColumnIndex +
			"\nnotesTable0.interestRateColumnIndex=" + notesTable0.interestRateColumnIndex +
			"\nnotesTable0.investmentColumnIndex=" + notesTable0.investmentColumnIndex +
			"\nnotesTable0.paymentsReceivedColumnIndex=" + notesTable0.paymentsReceivedColumnIndex +
			"\nnotesTable0.orderStatusColumnIndex=" + notesTable0.orderStatusColumnIndex +
			"\nnotesTable0.noteIdColumnIndex=" + notesTable0.noteIdColumnIndex +
		"");
	}

	function addHeaderLimits()
	{
		/*
		 * setup the headers
		 * YYY stopPropogation() otherwise it will trigger the header sort
		 */

		$('#yui-dt0-th-asking_price').append(
			"<nobr>" +
			"<input type='text' id='askingPriceMaxTextBox' size=5 onclick='event.stopPropagation();' />" +
			"<label for='askingPriceMaxTextBox' onclick='event.stopPropagation();'>max</label>" +
			"<br>" +
			"<input type='checkbox' %s id='askingPriceStrictCheckBox' onclick='event.stopPropagation();' />" +
			"<label for='askingPriceStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
			"</nobr>" +
			"");

		$("th[id$='ytm']").append(
			"<nobr>" +
			"<input type='text' id='ytmMinTextBox' size=5 onclick='event.stopPropagation();' />" +
			"<label for='ytmMinTextBox' onclick='event.stopPropagation();'>min</label>" +
			"<br>" +
			"<input type='checkbox' id='ytmStrictCheckBox' onclick='event.stopPropagation();' />" +
			"<label for='ytmStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
			"</nobr>" +
			"");
		
		$("th.lcac_irr").append(
			"<br>" +
			"<nobr>" +
			"<input type='text' id='irrMinTextBox' size=5 onclick='event.stopPropagation();' />" +
			"<label for='irrMinTextBox' onclick='event.stopPropagation();'>min</label>" +
			"<br>" +
			"<input type='checkbox' id='irrStrictCheckBox' onclick='event.stopPropagation();' />" +
			"<label for='irrStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
			"</nobr>" +
			"");
		
		if(TENDOLLARINTEREST)
		$("th[id$='loanGrade']").append(
			"<nobr>" +
			"<input type='checkbox' id='excludeTooMuchInterestPer12MonthsCheckBox' onclick='event.stopPropagation();'>" +
			"<label for='excludeTooMuchInterestPer12MonthsCheckBox' onclick='event.stopPropagation();'>&lt;$10 12mos</label>" +
			"<br>" +
			"<input type='checkbox' id='excludeTooMuchInterestThisYearCheckBox' onclick='event.stopPropagation();'>" +
			"<label for='excludeTooMuchInterestThisYearCheckBox' onclick='event.stopPropagation();'>&lt;$10 EOY</label>" +
			"</nobr>" +
			"");

		$("th[id$='loanGUID']").append(
			"<nobr>" +
			"<input type='checkbox' id='hideAlreadyInvestedCheckBox' onclick='event.stopPropagation();'>" +
			"<label for='hideAlreadyInvestedCheckBox' onclick='event.stopPropagation();'>not invested</label>" +
			"<br>" +
			"<input type='checkbox' id='hideNotFirstCheckBox' onclick='event.stopPropagation();'>" +
			"<label for='hideNotFirstCheckBox' onclick='event.stopPropagation();'>first only</label>" +
			"</nobr>" +
			"");

		$("th[id$='term']").append(
			"<nobr>" +
			"<select id='termSelect' onclick='event.stopPropagation();'>" +
			"<option value='0'>any</option>" +
			"<option value='36'>36</option>" +
			"<option value='60'>60</option>" +
			"</select>" +
			"<br>" +
			"<input type='checkbox' id='termStrictCheckBox' onclick='event.stopPropagation();' />" +
			"<label for='termStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
			"</nobr>" +
			"");
		
		$("th[id$='opa']").append(
			"<nobr>" +
			"<input type='text' id='principalPlusMinTextBox' size=5 onclick='event.stopPropagation();' />" +
			"<label for='principalPlusMinTextBox' onclick='event.stopPropagation();'>min</label>" +
			"<br>" +
			"<input type='checkbox' id='principalPlusStrictCheckBox' onclick='event.stopPropagation();' />" +
			"<label for='principalPlusStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
			"</nobr>" +
			"");
		
		$("th[id$='accrued_interest']")
			.append(
				"<nobr>" +
				"<input type='checkbox' id='accruedInterestStrictCheckBox' onclick='event.stopPropagation();'>" +
				"<label for='accruedInterestStrictCheckBox' onclick='event.stopPropagation();'>&lt;1month</label>" +	// <1mo <1month
				"</nobr>");

		$("th[id$='markup_discount']")
			.append(
				"<nobr>" +
				"<input type='text' id='markupMaxTextBox' size=5 onclick='event.stopPropagation();' />" +
				"<label for='markupMaxTextBox' onclick='event.stopPropagation();'>max</label>" +
				"<br>" +
				"<input type='checkbox' id='markupMaxStrictCheckBox' onclick='event.stopPropagation();' />" +
				"<label for='markupMaxStrictCheckBox' onclick='event.stopPropagation();'>Unlike</label>" +
				"</nobr>" +
				"");

		$("th.lcac_commentColumn").append(
			"<br>" +
			"<input type='checkbox' id='hideUnlikedRowsCheckBox' />" +
			"<label for='hideUnlikedRowsCheckBox'>Hide unliked rows?</label>" +
			"<br>" +
			"<input type='checkbox' id='hideOwnNotesCheckBox' />" +
			"<label for='hideOwnNotesCheckBox'>Hide own notes?</label>");


		/*
		 * setup the widgets
		 */

		$('input#askingPriceMaxTextBox')
			.on('change',
				function(event)
				{
					setHeaderLimit("askingPriceMax", this);
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						setHeaderLimit("askingPriceMax", this);
						event.preventDefault();	// don't try to submit the form
					}
				})
			.val(sprintf("%.2f", headerLimits.askingPriceMax));

		$('input#askingPriceStrictCheckBox')
			.on('change',
				function(event)
				{
					GM_log("askingPriceStrictCheckBox eventListener()... event=", event);
					askingPriceStrictChanged($(this));
				})
			.prop('checked', headerLimits.askingPriceStrict);


		$("input#ytmMinTextBox")
			.on('change',
				function(event)
				{
					ytmMinChanged(this);
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						ytmMinChanged(this);
						event.preventDefault();	// don't try to submit the form
					}
				})
			.val(sprintf("%.1f%%", headerLimits.ytmMin * 100));

		$('input#ytmStrictCheckBox')
			.on('change',
				function(event)
				{
					GM_log("ytmStrictCheckBox on$function()... event=", event);
					ytmStrictChanged(this);
				})
			.prop('checked', headerLimits.ytmStrict);

		$("input#irrMinTextBox")
			.on('change',
				function(event)
				{
					irrMinChanged(this);
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						irrMinChanged(this);
						event.preventDefault();	// don't try to submit the form
					}
				})
			.val(sprintf("%.1f%%", headerLimits.irrMin * 100));

		$('input#irrStrictCheckBox')
			.on('change',
				function(event)
				{
					GM_log("irrStrictCheckBox on$function()... event=", event);
					irrStrictChanged(this);
				})
			.prop('checked', headerLimits.irrStrict);

		$('input#accruedInterestStrictCheckBox')
			.prop('checked', headerLimits.accruedInterestStrict)
			.on('change',
				function(event)
				{
					setHeaderLimit("accruedInterestStrict", this);
				});


		$('select#termSelect')
			.val(!headerLimits.term ? "0" : headerLimits.term)	//YYY "Use of attributes' specified attribute is deprecated. It always returns true."
			.on('change',
				function(event)
				{
					GM_log("termSelect eventListener()... event=", event, " this=", this);
					setHeaderLimit("term", this);	// this == select
				});

		$('input#termStrictCheckBox')
			.prop('checked', headerLimits.termStrict)
			.on('change',
				function(event)
				{
					GM_log("termStrictCheckBox eventListener()... event=", event);
					setHeaderLimit("termStrict", this);	// this == select
				});


		$('input#hideAlreadyInvestedCheckBox')
			.on('change',
				function(event)
				{
					GM_log("hideAlreadyInvestedCheckBox eventListener()... event=", event);
					set_hideAlreadyInvested($(this).prop('checked'));
				})
			.prop('checked', getStoredValue("hideAlreadyInvested"));

		$('input#hideNotFirstCheckBox')
			.on('change',
				function(event)
				{
					GM_log("hideNotFirstCheckBox eventListener()... event=", event);
					set_hideNotFirst($(this).prop('checked'));
				})
			.prop('checked', getStoredValue("hideNotFirst"));

		if(TENDOLLARINTEREST)
		{
		$('input#excludeTooMuchInterestPer12MonthsCheckBox')
			.prop('checked', headerLimits.excludeTooMuchInterestPer12Months)
			.on('change',
				function(event)
				{
					GM_log("excludeTooMuchInterestPer12MonthsCheckBox eventListener()... event=", event);
					excludeTooMuchInterestPer12MonthsChanged(this);
				});

		$('input#excludeTooMuchInterestThisYearCheckBox')
			.prop('checked', headerLimits.excludeTooMuchInterestThisYear)
			.on('change',
				function(event)
				{
					GM_log("excludeTooMuchInterestThisYearCheckBox eventListener()... event=", event);
					excludeTooMuchInterestThisYearChanged(this);
				});
		}

		$('input#principalPlusMinTextBox')
			.val(sprintf("%.2f", headerLimits.principalPlusMin))
			.on('change',
				function(event)
				{
					principalPlusMinChanged(this);
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						principalPlusMinChanged(this);
						event.preventDefault();	// don't try to submit the form
					}
				});

		$('input#principalPlusStrictCheckBox')
			.prop('checked', headerLimits.principalPlusStrict)
			.on('change',
				function(event)
				{
					GM_log("principalPlusStrictCheckBox eventListener()... event=", event);
					principalPlusStrictChanged(this);
				});

		$("input#markupMaxTextBox")
			.val(sprintf("%.1f%%", headerLimits.markupMax * 100))
			.on('change',
				function(event)
				{
					markupMaxChanged(this);
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13)
					{
						markupMaxChanged(this);
						event.preventDefault();	// don't try to submit the form
					}
				});

		$('input#markupMaxStrictCheckBox')
			.prop('attr', headerLimits.markupMaxStrict)
			.on('change',
				function(event)
				{
					markupMaxStrictChanged(this);
				});


		$("input#hideUnlikedRowsCheckBox")
			.on('change',
				function(event)
				{
					GM_log("hideUnlikedRowsCheckBox.on('change')...");
					set_hideUnlikedRows($(this).prop('checked'));
				})
			.prop('checked', getStoredValue("hideUnlikedRows"));

		$("input#hideOwnNotesCheckBox")
			.on('change',
				function(event)
				{
					GM_log("hideOwnNotesCheckBox.on('change')...");
					set_hideOwnNotes($(this).prop('checked'));
				})
			.prop('checked', getStoredValue("hideOwnNotes") );
	}

	function findHeader(notesTable0, pattern)
	{
		var ths = notesTable0.tHead.rows[0].cells;

		//XXX there's probably a better way to do this
		for(var index = 0; index < ths.length; index++)
		{
			var innerHTML = ths[index].innerHTML;

			if(innerHTML.match(pattern))
				return index;
		}

		return null;
	}

	function findHeadersCheckCells(notesTable, colorCellsFunc, tableCanChange, flags)
	{
	var DEBUG = debug(false, arguments);
	timestamp(arguments, true);

		findHeaders0(notesTable,
			flags.addCommentColumn, flags.addLoanIdColumn, flags.addInterestRateColumn, flags.addMarkupColumn, flags.addIRRColumn,
			flags.addHideRowsCheckBoxes,
			flags.addDeleteRowButton);

		DEBUG && timestamp(arguments, "1");

		checkCells0(notesTable, colorCellsFunc, tableCanChange,
			flags.addCommentColumn, flags.addLoanIdColumn, flags.addInterestRateColumn, flags.addMarkupColumn, flags.addIRRColumn,
			flags.addDeleteRowButton);

		DEBUG && timestamp(arguments, "2");
	}


	function findHeaders0(notesTable,
		addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
		addHideRowsCheckBoxes,
		addDeleteRowButton)
	{
		var notesTable0 = notesTable.get(0);

		findHeaders00(notesTable0);

		addHeaders0(notesTable0,
			addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
			addHideRowsCheckBoxes,
			addDeleteRowButton);

		findHeaders00(notesTable0);
	}

	function findHeaders00(notesTable0)
	{
	var DEBUG = debug(false, arguments);

		// null these out in case they were set before
		var columnIndexes = {};

		//XXX jquerify this and the headers below?
		notesTable0.loanIdEmbeddedColumnIndex =
		notesTable0.loanIdColumnIndex =
		notesTable0.commentColumnIndex =
		notesTable0.askingPriceColumnIndex =
		notesTable0.salePriceColumnIndex =
		notesTable0.purchasePriceColumnIndex =
		notesTable0.orderExpiresColumnIndex =
		notesTable0.ytmColumnIndex =
		notesTable0.irrColumnIndex =
		notesTable0.accruedInterestColumnIndex =
		notesTable0.markupColumnIndex =
		notesTable0.outstandingPrincipalColumnIndex =
		notesTable0.termColumnIndex =
		notesTable0.principalPlusColumnIndex =
		notesTable0.remainingPaymentsColumnIndex =
		notesTable0.loanStatusColumnIndex =
		notesTable0.interestRateColumnIndex =
		notesTable0.investmentColumnIndex =
		notesTable0.paymentsReceivedColumnIndex =
		notesTable0.orderStatusColumnIndex =
		notesTable0.noteIdColumnIndex =
			undefined;

		var ths = notesTable0.tHead.rows[0].cells;
		DEBUG && GM_log("ths=", ths);

		/* Find all the headers and remember them for later XXX yes, is ugly global variables */
		for(var index = 0; index < ths.length; index++)
		{
			var th = ths[index];

	//		var innerHTML = th.innerHTML;
			var innerHTML = $("<div>").append(th.cloneNode(true)).html();	// outerHTML per http://stackoverflow.com/questions/1700870/how-do-i-do-outerhtml-in-firefox // true per https://developer.mozilla.org/en-US/docs/DOM/Node.cloneNode (worked in firefox, not in chrome)

			innerHTML =
				innerHTML
					.replace(/\<br\>/gi, ' ')	// html break
					.replace(/&nbsp;/gi, ' ')	// html non-breaking space
					.replace(/[\n\r\s]+/gi, ' ');	// newlines and strings of spaces

			var text = $(th).text();

			DEBUG && GM_log(
				"index=" + index + " " +
				"text=" + "'" + text + "'" +
				"innerHTML=" + "'" + innerHTML + "'" + " " +
				"");

			// WARNING: "Principal + Interest" might contain <span title="Outstandng Principal and Accrued Interest">
			// WARNING: "Note ID" might contain <th class="loanID">Note ID</th>
			if(innerHTML.match(/Order\s*Status/i))
			{
				if(notesTable0.orderStatusColumnIndex != null) GM_log("notesTable0.orderStatusColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.orderStatusColumnIndex = index;
			}
			else if(innerHTML.match(/loan_status|Status|Note\s+Status|class="status"|th-NoteStatus/))	// sometimes "Status" is the link, but other places have Order Status
			{
				if(notesTable0.loanStatusColumnIndex != null) GM_log("notesTable0.loanStatusColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.loanStatusColumnIndex = index;
				notesTable0.loanIdEmbeddedColumnIndex = index;
			}
			else if(innerHTML.match(/titleAndPurpose/i))	// sometimes title is the link
			{
				if(notesTable0.loanIdEmbeddedColumnIndex != null) GM_log("notesTable0.loanIdEmbeddedColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.loanIdEmbeddedColumnIndex = index;
			}
			else if(innerHTML.match(/loanGUID|Loan\s+ID/i))	// loanId is class on some Note Id columns, e.g. tradingAccount.action
			{
				if(notesTable0.loanIdColumnIndex != null) GM_log("notesTable0.loanIdColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.loanIdColumnIndex = index;
			}
			else if(innerHTML.match(/Order\s+Expires/i))
			{
				if(notesTable0.orderExpiresColumnIndex != null) GM_log("notesTable0.orderExpiresColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.orderExpiresColumnIndex = index;
			}
			else if(innerHTML.match(/markup_discount|markup/i))
			{
				if(notesTable0.markupColumnIndex != null) GM_log("notesTable0.markupColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.markupColumnIndex = index;
			}
			else if(innerHTML.match(/ytm/))
			{
				if(notesTable0.ytmColumnIndex != null) GM_log("notesTable0.ytmColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.ytmColumnIndex = index;
			}
			else if(innerHTML.match(/IRR/))
			{
				if(notesTable0.irrColumnIndex != null) GM_log("notesTable0.irrColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.irrColumnIndex = index;
			}
			else if(innerHTML.match(/\bopa\b|\bopi\b|Principal\s+(\+\s+)*Interest/i))
			{
				if(notesTable0.principalPlusColumnIndex != null) GM_log("notesTable0.principalPlusColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.principalPlusColumnIndex = index;
			}
			else if(text.match(/Term/i))
			{
				if(notesTable0.termColumnIndex != null) GM_log("notesTable0.termColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.termColumnIndex = index;
			}
			else if(innerHTML.match(/outstanding_principal|outstanding-principal|principalRemaining|Outstanding\s+Principal/i))
			{
				if(notesTable0.outstandingPrincipalColumnIndex != null) GM_log("notesTable0.outstandingPrincipalColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.outstandingPrincipalColumnIndex = index;
			}
			else if(innerHTML.match(/asking_price|Asking\s+Price/i))
			{
				if(notesTable0.askingPriceColumnIndex != null) GM_log("notesTable0.askingPriceColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.askingPriceColumnIndex = index;
			}
			else if(innerHTML.match(/Sale\s+Price/i))
			{
				if(notesTable0.salePriceColumnIndex != null) GM_log("notesTable0.salePriceColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.salePriceColumnIndex = index;
			}
			else if(innerHTML.match(/Purchase\s+Price/i))
			{
				if(notesTable0.purchasePriceColumnIndex != null) GM_log("notesTable0.purchasePriceColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.purchasePriceColumnIndex = index;
			}
			else if(innerHTML.match(/accrued_interest|Accrued\s+Interest/i))
			{
				if(notesTable0.accruedInterestColumnIndex != null) GM_log("notesTable0.accruedInterestColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.accruedInterestColumnIndex = index;
			}
			else if(innerHTML.match(/remaining_pay|Remaining\s+Payments/i))
			{
				if(notesTable0.remainingPaymentsColumnIndex != null) GM_log("notesTable0.remainingPaymentsColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.remainingPaymentsColumnIndex = index;
			}
			else if(innerHTML.match(/Interest\s+Rate|Stored\s+Rate/i))	// some headers have <br> and newlines in them
			{
				if(notesTable0.interestRateColumnIndex != null) GM_log("notesTable0.interestRateColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.interestRateColumnIndex = index;
			}
			else if(innerHTML.match(/Investment/i))
			{
				if(notesTable0.investmentColumnIndex != null) GM_log("notesTable0.investmentColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.investmentColumnIndex = index;
			}
			else if(innerHTML.match(/Payments\s+Received|Payments\s+To\s+Date/i))
			{
				if(notesTable0.paymentsReceivedColumnIndex != null) GM_log("notesTable0.paymentsReceivedColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.paymentsReceivedColumnIndex = index;
			}
			else if(innerHTML.match(/Comment\*/))
			{
				if(notesTable0.commentColumnIndex != null) GM_log("notesTable0.commentColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.commentColumnIndex = index;
			}
			else if(innerHTML.match(/Note\s+ID/i))
			{
				if(notesTable0.noteIdColumnIndex != null) GM_log("notesTable0.noteIdColumnIndex not null, index=" + index + " innerHTML=" + innerHTML);
				notesTable0.noteIdColumnIndex = index;

				/* for yrEndTraderStatement */
				if(href.match(/yrEndTraderStatement/))
	//			if(notesTable0.loanIdEmbeddedColumnIndex == null)
					notesTable0.loanIdEmbeddedColumnIndex = index;
			}
			else if(innerHTML.match(/Note\s+Title|Portfolio|Term|Payment\s+Due|Trade\s+ID|Date|Transaction\s+Fee|Days\s+Since\s+Payment|Credit\s+Score\s+Change|alreadySelected|rateAndAmountRequested|th-fico|unfundedAmountCell|timeAndAmountLeft|totalAmount/i))
			{
				// don't care
			}
			else
			{
				GM_log("findHeaders00() unhandled th=", th, " innerHTML=", innerHTML, " th.innerHTML=", th.innerHTML);
			}
		}

		DEBUG && printDebugHeaders(notesTable0);
	}

	function checkCells0(notesTable, colorCellsFunc, tableCanChange,
		addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
		addDeleteRowButton)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		attachLocalStorageCommentListener();

		var tbody = notesTable.find("tbody:last");
		var tbody0 = tbody.get(0);

		var trFirst = tbody.find("tr:first");

		/*
		 * set a flag on the first row 
		 * YYY seems like this gets reset when the row changes, but needs to be tested
		 */
		if(trFirst.length > 0)
		{
			if(!trFirst.data('lcac_cellsAdded'))	// seems to get lost when the rows change
			{
				GM_log("trFirst.data('lcac_cellsAdded')=", trFirst.data('lcac_cellsAdded'));

				trFirst.data('lcac_cellsAdded', true);

				addCells(notesTable,
					addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
					addDeleteRowButton);

				notesTable.data('colorIsDirty', true);
			}

			if(notesTable.data('colorIsDirty'))
				GM_log(FUNCNAME + " notesTable.data('colorIsDirty')=", notesTable.data('colorIsDirty'));
			
			if(notesTable.data('colorIsDirty')) // colorIsDirty is set elsewheres
			{
				if(colorCellsFunc)
					colorCellsFunc(notesTable);
				
				notesTable.data('colorIsDirty', false);
			}
		}

		/* loop (if table can change) */
		if(tableCanChange)
		{
			setTimeout(
				function()
				{
					checkCells0(notesTable, colorCellsFunc, tableCanChange,
						addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
						addDeleteRowButton);
				},
				TABLECANCHANGETIMEOUT);
		}
	}

	GM_addStyle("td.lcac_commentCell {padding-top:0 !important; padding-bottom:0 !important; white-space:nowrap !important;}");	// no padding around textbox
		
	function addCells(notesTable,
		addCommentColumn, addLoanIdColumn, addInterestRateColumn, addMarkupColumn, addIRRColumn,
		addDeleteRowButton)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);
	DEBUG && timestamp(arguments, true);

		var notesTable0 = notesTable.get(0);

		DEBUG && GM_log(FUNCNAME +
			" addCommentColumn=" + addCommentColumn +
			" addLoanIdColumn=" + addLoanIdColumn +
			" addInterestRateColumn=" + addInterestRateColumn +
			" addMarkupColumn=" + addMarkupColumn +
			" addIRRColumn=" + addIRRColumn +
			" addDeleteRowButton=" + addDeleteRowButton +
			"");

		if(notesTable0.loanIdEmbeddedColumnIndex == null
		&& notesTable0.loanIdColumnIndex == null)	// column should not be null, 0 is OK though
		{
			DEBUG && GM_log("1 returning");
			return;
		}

		var trs =
			$(notesTable0)
				.find("tbody:last tr")
					.not(".tfoot")	// last line, footer
					.not(".lcac_expired")	// expired so hidden
					.not(":contains('Edit Order')")	// footer on placeOrder.action
					.not(":contains('No Results Found')")	 // "No Results Found"
					;

	//	GM_log("trs=", trs);
		DEBUG && GM_log("trs.length=", trs.length);

		if(trs.length == 0)
		{
			DEBUG && GM_log("2 returning");
			return;
		}
		else if(trs.filter(":first").find("td").length == 1) // no rows, or a message row
		{
			DEBUG && GM_log("3 returning");
			return;
		}
			
		//OPTIMIZEME 4 seconds
		trs.each(function(index, tr0)
		{
		var DEBUG = debug(false && index < 10, arguments);

			var tr = $(tr0);

			/*
			 * ADD THE CELLS FIRST or the columns won't match
			 */

			/* add loanId (for tradingAccount.action) */
			if(addLoanIdColumn)
			{
				DEBUG && GM_log("addLoanIdColumn calling insertCell(" + notesTable0.loanIdColumnIndex + ")");
				tr0.insertCell(notesTable0.loanIdColumnIndex);
			}

			/* add interestRate cell */
			var interestRateCell = null;
			if(addInterestRateColumn)
				interestRateCell = $(tr0.insertCell(notesTable0.interestRateColumnIndex));

			/*
			 * "This security is no longer listed" takes up 5 columns
			 * (appears when order submitted but note already sold or removed)
			 */
			if(tr.html().match(/This security is no longer listed|This Note has already been listed for sale/))
				return;

			/* add markup cell */
			if(addMarkupColumn)
				tr0.insertCell(notesTable0.markupColumnIndex);	// will be filled in elsewheres

			/* add irr cell */
			if(addIRRColumn)
				tr0.insertCell(notesTable0.irrColumnIndex);	// will be filled in elsewheres

			/* find the loanId, and fill in the loanId Column if we added one */
			var loanId;
			if(addLoanIdColumn)
			{
				loanId = getLoanId(tr, null, notesTable0.loanIdEmbeddedColumnIndex);
				tr.find("td").eq(notesTable0.loanIdColumnIndex).html('' + loanId);
			}
			else
				loanId = getLoanId(tr, notesTable0.loanIdColumnIndex, notesTable0.loanIdEmbeddedColumnIndex);
				
			tr.data('loanId', loanId);	// save this for the next loop down there
			
			var noteId = null;
			if(notesTable0.noteIdColumnIndex != null)
			{
				noteId = getNoteId(tr, notesTable0.noteIdColumnIndex);
				tr.data('noteId', noteId);	// save this for the next loop down there
			}

			if(addInterestRateColumn)
			{
				var interestRate = getStoredInterestRateByLoanId(loanId);

				if(interestRate == null || isNaN(interestRate) || interestRate < 0)
				{
					interestRateCell.html("Not Stored");
					interestRateCell.addClass('lcac_orangeMed lcac_nowrap');
				}
				else
				{
					interestRateCell.html(sprintf("%.2f%%", interestRate * 100.0));
				}
			}

			if(TESTING && addDeleteRowButton)
			{
	/*
	 on: https://www.lendingclub.com/foliofn/noteAj.action?s=true&si=4&ps=1&ni=4072353&rnd=1349905715386
	off: https://www.lendingclub.com/foliofn/noteAj.action?s=false&si=4&ps=1&ni=4072353&rnd=1349905726327

	si = row number in notes for sale (first row of second page could be e.g. 200) (2013-01-08 can we really leave this off?)
	ps = always 1?
	ni = noteId
	rnd = timestamp (to bypass caching probably)
	s = true/false select or unselect the note
	 */
				GM_log("noteId=", noteId);
				var td = $(sprintf("<td><input type='checkbox' checked='checked' id='lcac_togglepurchase' name='%s' />", noteId));
				tr.append(td);

				tr.find("#lcac_togglepurchase")
					.on('change', function(event)
					{
						GM_log("checkbox on$function... event=", event);
						var noteId = $(this).prop('name');
						GM_log("noteId=", noteId);
						var checked = $(this).prop('checked');
						GM_log("checked=", checked);

						ffnAddToOrder(noteId, checked);

						function ffnAddToOrder(noteId, checked)
						{
							var url = 
								sprintf("/foliofn/noteAj.action?s=%s&ps=1&ni=%d&rnd=%d",
									checked ? 'true' : 'false',
									noteId,
									new Date().getTime());

							$.get(url, function(responseText)
							{
								GM_log("responseText=", responseText);
			//					window.location.href = window.location.href;	// reload the page
							});
						}
					});
			}
		});

		/* OPTIMIZEME */
		if(addCommentColumn)
		{
			$.each(trs, function(index, tr0)
			{
				var tr = $(tr0);
				var loanId = tr.data('loanId');	// we added this up above

				if(loanId == null || loanId == undefined)
					return;

				/* add comment cell */
				var commentCell = tr0.insertCell(-1);	// -1 means insert at the end
				commentCell = $(commentCell);
				commentCell.addClass('lcac_commentCell');
				commentCell.append(
					sprintf(
						"<input class='commentTextBox' name='comment_%s' type='text' size=50 />",
						loanId
					));

				var commentTextBox = commentCell.find(".commentTextBox");
				var loanId = commentTextBox.prop('name');
				var comment = getComment(loanId);
				commentTextBox.val(comment);
			});

			/* add the event handlers */
			trs.find("input.commentTextBox")
				.on('change',
					function(event)
					{
						DEBUG && GM_log("event=", event);

						setComment(this.name, this.value);
					})
				.on('keypress',
					function(event)
					{
						DEBUG && GM_log("event=", event);

						if(event.keyCode == 13 /*ENTER*/)
						{
							setComment(this.name, this.value);
							event.preventDefault();	// don't let ENTER submit the form
						}
					});
		}

		DEBUG && timestamp(arguments, "9");
	}

	function colorCellsSimple(notesTable)
	{
	var DEBUG = debug(false, arguments);

		var notesTable0 = notesTable.get(0);
		
		var trs = 
			notesTable
				.find("tbody:last tr")
					.not(".tfoot")	// last line, footer
					.not(".lcac_expired")	// expired so hidden
					.not(":contains('Edit Order')")	// footer on placeOrder.action
					.not(":contains('No Results Found')")	 // "No Results Found"
					;


		trs.each(function()
		{
			var tr = $(this);
			var tds = tr.find("td");
			
			var loanStatusCell = tds.eq(notesTable0.loanStatusColumnIndex);

			var askingPrice = text2Value(tds.eq(notesTable0.askingPriceColumnIndex).text());
			var salePrice = text2Value(tds.eq(notesTable0.salePriceColumnIndex).text());
			var purchasePrice = text2Value(tds.eq(notesTable0.purchasePriceColumnIndex).text());
				
			DEBUG && GM_log("askingPrice=", askingPrice, " salePrice=", salePrice, " purchasePrice=", purchasePrice, " notesTable0.salePriceColumnIndex=", notesTable0.salePriceColumnIndex, " notesTable0.purchasePriceColumnIndex=", notesTable0.purchasePriceColumnIndex);
				
			/*
			 * add price to href link to note
			 */
			if(PRICESINURL)
			{

			if(askingPrice)
			{
				var a = loanStatusCell.find('a');	// find the elment that has the string (could be us or a div)
				a.prop('href', a.prop('href') + sprintf("&our_asking_price=%0.2f", askingPrice));	// we're selling it
			}
			if(salePrice)
			{
				var a = loanStatusCell.find('a');	// find the elment that has the string (could be us or a div)
				a.prop('href', a.prop('href') + sprintf("&sale_price=%0.2f", salePrice));	// sold
			}
			if(purchasePrice)
			{
				var a = loanStatusCell.find('a');	// find the elment that has the string (could be us or a div)
				a.prop('href', a.prop('href') + sprintf("&purchase_price=%0.2f", purchasePrice));	// sold
			}

			}
		});
	}

	GM_addStyle(".lcac_first td.lcac_first_candidate {font-style:normal; font-weight:bold;}");
	GM_addStyle(".lcac_notfirst td.lcac_first_candidate {font-style:italic; font-weight:normal !important;}");
	GM_addStyle("td.lcac_alreadyInvested {text-decoration:underline !important;}");

	GM_addStyle(sprintf(".lcac_pending {background-color:%s !important;}", greenLow));
	GM_addStyle(sprintf(".lcac_updating {background-color:%s !important;}", yellowMed));
	GM_addStyle(sprintf(".lcac_likedRow {background-color:%s !important;}", greenLow));
	GM_addStyle(sprintf(".lcac_redHigh {background-color:%s !important;}", redHigh));
	GM_addStyle(sprintf(".lcac_redMed {background-color:%s !important;}", redHigh));
	GM_addStyle(sprintf(".lcac_redLow {background-color:%s !important;}", redLow));
	GM_addStyle(sprintf(".lcac_orangeHigh {background-color:%s !important;}", orangeHigh));
	GM_addStyle(sprintf(".lcac_orangeMed {background-color:%s !important;}", orangeMed));
	GM_addStyle(sprintf(".lcac_orangeLow {background-color:%s !important;}", orangeLow));
	GM_addStyle(sprintf(".lcac_yellowHigh {background-color:%s !important;}", yellowHigh));
	GM_addStyle(sprintf(".lcac_yellowMed {background-color:%s !important;}", yellowMed));
	GM_addStyle(sprintf(".lcac_yellowLow {background-color:%s !important;}", yellowLow));
	GM_addStyle(sprintf(".lcac_greenHigh {background-color:%s !important;}", greenHigh));
	GM_addStyle(sprintf(".lcac_greenMed {background-color:%s !important;}", greenMed));
	GM_addStyle(sprintf(".lcac_greenLow {background-color:%s !important;}", greenLow));
	GM_addStyle(".lcac_hide {display:none !important}");
	GM_addStyle(".lcac_nowrap {white-space:nowrap}");
	GM_addStyle(".lcac_gainloss {white-space:nowrap}");
	GM_addStyle(".lcac_inmonths {white-space:nowrap}");

	function colorCellsTradingInventory(notesTable) // Foliofn Browse Notes
	{
	var DEBUG = debug(true, arguments);

		var notesTable0 = notesTable.get(0);

		var trs =
			notesTable
				.find("tbody:last tr")
					.not(".tfoot")	// last line, footer
					.not(".lcac_expired")	// expired so hidden
					.not(":contains('Edit Order')")	// footer on placeOrder.action
					.not(":contains('No Results Found')")	 // "No Results Found"
					;

		var ownNoteCount = 0, unlikedCount = 0;

		var loanIdSeen = {};	// italic loanIds

		loadSessionData();

		trs.each(function()
		{
			try
			{
			var tr0 = this;
			var tr = $(this);

			var ownNote = tr.html().match(/This is your own note/);
			if(ownNote)
			{
				tr.addClass('lcac_ownNote');
				ownNoteCount++;
				return;
			}

			var loanId = tr.data('loanId');
	//		var loanId = getLoanId(tr, notesTable0.loanIdColumnIndex, notesTable0.loanIdEmbeddedColumnIndex);

			var tds = tr.find("td");

			tds
				.css('background', '')	// remove all the backgrounds (YYY better to use classes?)
				.removeClass(			// remove all these classes
					"lcac_redHigh lcac_redMed lcac_redLow" +
					" lcac_orangeHigh lcac_orangeMed lcac_orangeLow" +
					" lcac_yellowHigh lcac_yellowMed lcac_yellowLow" +
					" lcac_greenHigh lcac_greenMed lcac_greenLow" +
					"");

			if(notesTable0.loanIdColumnIndex)
				var loanIdCell = tds.eq(notesTable0.loanIdColumnIndex);

			var loanStatusCell = tds.eq(notesTable0.loanStatusColumnIndex);
			var loanStatus = loanStatusCell.text();

			var termCell = tds.eq(notesTable0.termColumnIndex);
			var term = text2Value(termCell.text());

			var outstandingPrincipal = text2Value(tds.eq(notesTable0.outstandingPrincipalColumnIndex).text());
			var principalPlus = text2Value(tds.eq(notesTable0.principalPlusColumnIndex).text());

			var accruedInterestCell = tds.eq(notesTable0.accruedInterestColumnIndex);
			var accruedInterest = text2Value(accruedInterestCell.text());

			var askingPriceCell = tds.eq(notesTable0.askingPriceColumnIndex);
			var askingPrice = text2Value(askingPriceCell.text());

			var ytm = text2Value(tds.eq(notesTable0.ytmColumnIndex).text());
			var remainingPayments = text2Value(tds.eq(notesTable0.remainingPaymentsColumnIndex).text());
			var markup = text2Value(tds.eq(notesTable0.markupColumnIndex).text());

			var interestRateCell = tds.eq(notesTable0.interestRateColumnIndex);
			var interestRate = parseInterestRate(loanId, interestRateCell.text(), false);
			
			var irrCell = notesTable0.irrColumnIndex != null ? tds.eq(notesTable0.irrColumnIndex) : null;

			var accruedInterestInMonths = calcInterestInMonths(outstandingPrincipal, interestRate, accruedInterest);

			if(!accruedInterestCell.hasClass('lcac_modified'))	// called in a loop, so check to see if we already changed it
			{
				accruedInterestCell.addClass('lcac_modified');

				/*
				 * add months to accrued interest col
				 */
				var td = accruedInterestCell;
				var div = td.find('div');	// find the elment that has the string (could be us or a div)
				if(div.length == 0)
					div = td;

				div.append(sprintf('[%0.1fm]', accruedInterestInMonths));

				/*
				 * add asking_price to href link to note
				 */
				var a = loanStatusCell.find('a');
				a.prop('href', a.prop('href') + sprintf("&asking_price=%0.2f", askingPrice));
			}
			
			if(irrCell && !irrCell.hasClass('lcac_modified'))	// called in a loop, so check to see if we already changed it
			{
				irrCell.addClass('lcac_modified');

				var loanFraction = Math.ceil(outstandingPrincipal / 25) * 25;	//XXX where can we get this????
				var paymentAmount = floor2Decimals(-PMT(interestRate / 12, term, loanFraction));
				var irr = IRR(outstandingPrincipal, accruedInterest, paymentAmount, interestRate, askingPrice);

				irrCell.text(negative2parens("%0.2f%%", irr * 100));
			}

			var like = 0, unlike = 0;
			
			/*
			 * highlight repeated loan ids (per table)
			 * XXX if first row is hidden how do we update these?
			 */
			if(loanIdCell)
			{
				loanIdCell.addClass('lcac_first_candidate');
				tr.addClass('lcac_first_candidate');
				tr.data('lcac_loanId', loanId);
			}

			if(loanIdCell && isLoanOwned(loanId))
			{
				loanIdCell.addClass('lcac_alreadyInvested');
				tr.addClass('lcac_alreadyInvested');
			}

			/* dealbreakers */
			if(loanStatus.match(/Default|Charged\s*Off/))
			{
				unlike++;
				loanStatusCell.addClass('lcac_redHigh');
				tr.addClass('lcac_statusStrict');
			}

			if(TENDOLLARINTEREST)
			{
			/**
			 * more than $10 in iterest triggers form 1099, which is a hassle
			 * Note: calculation is approx. because interest goes down over time (unless they're paying interest only, no way to tell)
			 */
			var remainingPaymentsExpected = 60;	//XXX this is not right
			var interest12mos = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(12, remainingPaymentsExpected));

			var interestEOY = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(remainingPaymentsEOY(), remainingPaymentsExpected));

			if(interestEOY >= 10.00 
			&& headerLimits.excludeTooMuchInterestThisYear)
			{
				unlike++;
				interestRateCell.addClass('lcac_redHigh');
				tr.addClass('lcac_tooMuchInterestThisYear');
			}
			else if(interest12mos >= 10.00
			&& headerLimits.excludeTooMuchInterestPer12Months)
			{
				unlike++;
				interestRateCell.addClass('lcac_redLow');
				tr.addClass('lcac_tooMuchInterestPer12Months');
			}
			}

			if(headerLimits.term
			&& headerLimits.term != "0" && term != headerLimits.term)
			{
				if(headerLimits.termStrict)
					unlike++;
				termCell.addClass('lcac_yellowMed');
				tr.addClass('lcac_termStrict');
			}

			if(accruedInterestInMonths >= lateMonths1) // more than 3 months' interest
			{
				if(headerLimits.accruedInterestStrict)
					unlike++;
				accruedInterestCell.addClass('lcac_redHigh');
				tr.addClass('lcac_accruedInterestStrict');
			}
			else if(accruedInterestInMonths >= lateMonths2) // more than 2 months' interest
			{
				if(headerLimits.accruedInterestStrict)
					unlike++;
				accruedInterestCell.addClass('lcac_redMed');
				tr.addClass('lcac_accruedInterestStrict');
			}
			else if(accruedInterestInMonths >= lateMonths3) // more than 1 month + grace period
			{
				if(headerLimits.accruedInterestStrict)
					unlike++;
				accruedInterestCell.addClass('lcac_redLow');
				tr.addClass('lcac_accruedInterestStrict');
			}
			if(accruedInterestInMonths >= lateMonths4) // in grace period?
			{
				if(headerLimits.accruedInterestStrict)
					unlike++;
				accruedInterestCell.addClass('lcac_yellowMed');
				tr.addClass('lcac_accruedInterestStrict');
			}
			else if(accruedInterestInMonths >= 1.0) // in grace period? probably "Processing..."
			{
				if(headerLimits.accruedInterestStrict)
					unlike++;
				accruedInterestCell.addClass('lcac_yellowLow');
				tr.addClass('lcac_accruedInterestStrict');
			}


			/* user settable limits... yellow or red better? */
			if(askingPrice > headerLimits.askingPriceMax)
			{
				if(headerLimits.askingPriceStrict)
					unlike++;
				askingPriceCell.addClass('lcac_yellowHigh');
				tr.addClass('lcac_askingPriceStrict');
			}
			
			
			var irr = text2Value(tds.eq(notesTable0.irrColumnIndex).text());


			if(ytm == null)	// -- can either mean "can't calculate" or "0"
			{
				tds.eq(notesTable0.ytmColumnIndex).addClass('lcac_redLow');
				tr.addClass('lcac_ytmStrict');
			}
			else if(ytm < 0)	// never something you want
			{
				if(headerLimits.ytmStrict)
					unlike++;
				tds.eq(notesTable0.ytmColumnIndex).addClass('lcac_redHigh');
				tr.addClass('lcac_ytmStrict');
			}
			else if(ytm < headerLimits.ytmMin)
			{
				if(headerLimits.ytmStrict)
				{
					unlike++;
					tds.eq(notesTable0.ytmColumnIndex).addClass('lcac_redHigh');
				}
				else
					tds.eq(notesTable0.ytmColumnIndex).addClass('lcac_yellowLow');

				tr.addClass('lcac_ytmStrict');
			}

			if(irr == null)	// -- can either mean "can't calculate" or "0"
			{
				tds.eq(notesTable0.irrColumnIndex).addClass('lcac_redLow');
				tr.addClass('lcac_irrStrict');
			}
			else if(irr < 0)	// never something you want
			{
				if(headerLimits.irrStrict)
					unlike++;
				tds.eq(notesTable0.irrColumnIndex).addClass('lcac_redHigh');
				tr.addClass('lcac_irrStrict');
			}
			else if(irr < headerLimits.irrMin)
			{
				if(headerLimits.irrStrict)
				{
					unlike++;
					tds.eq(notesTable0.irrColumnIndex).addClass('lcac_redHigh');
				}
				else
					tds.eq(notesTable0.irrColumnIndex).addClass('lcac_yellowLow');
				tr.addClass('lcac_irrStrict');
			}

			if(principalPlus < 0 || isNaN(principalPlus))	// e.g. "--" becomes NaN when we try to parse it
			{
				if(headerLimits.principalPlusStrict)
					unlike++;
				tds.eq(notesTable0.principalPlusColumnIndex).addClass('lcac_redHigh');
				tr.addClass('lcac_principalPlusStrict');
			}
			else if(principalPlus < headerLimits.principalPlusMin)
			{
				if(headerLimits.principalPlusStrict)
					unlike++;
				tds.eq(notesTable0.principalPlusColumnIndex).addClass('lcac_yellowHigh');
				tr.addClass('lcac_principalPlusStrict');
			}
			else if(principalPlus < askingPrice)
				tds.eq(notesTable0.principalPlusColumnIndex).addClass('lcac_yellowLow');


			if(markup > headerLimits.markupMax)
			{
				if(headerLimits.markupMaxStrict)
					unlike++;
				tds.eq(notesTable0.markupColumnIndex).addClass('lcac_redLow');
				tr.addClass('lcac_markupMaxStrict');
			}
			else if(markup > 0)
				tds.eq(notesTable0.markupColumnIndex).addClass('lcac_yellowHigh');

			if(unlike > 0)
			{
	//			DEBUG && GM_log(DEBUG + " unlikedRow");
				tr.addClass('lcac_unlikedRow');
				tr.removeClass('lcac_likedRow');
				unlikedCount++;
				return;
			}

	//		DEBUG && GM_log(DEBUG + " likedRow");
			tr.addClass('lcac_likedRow');
			tr.removeClass('lcac_unlikedRow');


			if(askingPrice <= headerLimits.askingPriceMax)
			{
				like++;
				askingPriceCell.addClass('lcac_greenMed');
			}

			if(loanStatus.match(/Current/))
			{
				like++;
				loanStatusCell.addClass('lcac_greenMed');
			}

			if(ytm >= headerLimits.ytmMin)
			{
				like++;
				tds.eq(notesTable0.ytmColumnIndex).addClass('lcac_greenMed');
			}

			if(principalPlus >= headerLimits.principalPlusMin)
			{
				like++;
				tds.eq(notesTable0.principalPlusColumnIndex).addClass('lcac_greenMed');
			}

			if(markup <= headerLimits.markupMax)
			{
				like++;
				tds.eq(notesTable0.markupColumnIndex).addClass('lcac_greenMed');
			}

			// XXX remainingPayments information is incorrect on this table
	//		if(remainingPaymentsMax > 0 && remainingPayments <= remainingPaymentsMax)
	//			tds.eq(notesTable0.remainingPaymentsColumnIndex].addClass('lcac_greenLow');

			if(unlike == 0 && like >= 4)
				tr.addClass('lcac_likedRow');
			}
			catch(ex)
			{
				GM_log("ex=", ex);
			}
		});

		$(".lcac_likedRow").removeClass('lcac_hide');

		updateFirst();

		window.status = sprintf("%d unliked rows, %d own notes", unlikedCount, ownNoteCount);
		DEBUG && GM_log("window.status=" + window.status);
	}

	function updateFirst()
	{
		var loanIdSeen = {};

		$("tr.lcac_first_candidate:visible")
			.each(function(index, element)
			{
				element = $(element);
				
				var loanId = element.data('lcac_loanId');

				if(!loanIdSeen[loanId])
				{
					GM_log("FIRST element=", element, " element.data('lcac_loanId')=", element.data('lcac_loanId'));
					element.addClass("lcac_first");
					element.removeClass("lcac_notfirst");
					loanIdSeen[loanId] = true;
				}
				else
				{
					GM_log("NOT FIRST element=", element, " element.data('lcac_loanId')=", element.data('lcac_loanId'));
					element.removeClass("lcac_first");
					element.addClass("lcac_notfirst");
				}
			});
	}


	function updateMarkup(notesTable0, tr, delay)
	{
		if(typeof delay == 'undefined') delay = 0;

		/* setTimeout to make sure we do it AFTER the field gets updated */
		setTimeout(function(){
			updateMarkup0(notesTable0, tr);
		}, delay);
	}

	function updateMarkup0(notesTable0, tr)
	{
		if(tr.text().match(/This security is no longer listed|This Note has already been listed for sale/i))
			return;

		var tds = tr.find("td");

		var markupCell = tds.eq(notesTable0.markupColumnIndex);

		var principalPlusCell = tds.eq(notesTable0.principalPlusColumnIndex);

		var askingPriceCell = tds.eq(notesTable0.askingPriceColumnIndex);
		var askingPriceInputField = askingPriceCell.find(".asking-price");

		var principalPlus = text2Value(principalPlusCell.text());
		if(principalPlus == 0)	// Fully Paid
			return;

		var askingPrice;
		if(askingPriceInputField.length > 0)
			askingPrice = askingPriceInputField.val();
		else
			askingPrice = text2Value(askingPriceCell.text());

		var markup = null;
		if(askingPrice > 0)
			markup = (askingPrice - principalPlus) / principalPlus;	// it's empty on Sell Notes before a price is set

		if(markup == null || isNaN(markup))
		{
	//		GM_log("askingPriceInputField=%o", askingPriceInputField);
	//		if(askingPriceInputField)
	//			GM_log("askingPriceInputField.val()=", askingPriceInputField.val());
	//		GM_log("askingPriceCell=%o", askingPriceCell);
	//		if(askingPriceCell)
	//			GM_log("askingPriceCell.text()=" + askingPriceCell.text());
	//		GM_log("askingPrice=" + askingPrice + " principalPlus=" + principalPlus);
			markupCell.text("--");
			return;
		}

		var colorString = '';
		if(markup != null)
		{
			markupCell.text(sprintf("%.2f%%", markup * 100));

			if(markup > headerLimits.foliofnMarkupHighLimit)
			{
				var diff = (markup - headerLimits.foliofnMarkupHighLimit) / headerLimits.foliofnMarkupHighLimit;
				diff = diff + 0.2;	// exaggerate the colors a little bit
				if(diff > .9) diff = 1;	// limit it
				diff = 255 - Math.floor(diff * 255);
				colorString = sprintf("#ff%02x%02x", diff, diff);	// red to white
			}
			else if(markup < headerLimits.foliofnMarkupLowLimit)
			{
				var diff = (markup - headerLimits.foliofnMarkupLowLimit) / headerLimits.foliofnMarkupLowLimit;
				diff = -diff;	// reverse it
				diff = diff + 0.2;	// exaggerate the colors a little bit
				if(diff > .9) diff = 1;	// limit it
				diff = 255 - Math.floor(diff * 255);
				colorString = sprintf("#%02xff%02x", diff, diff);	// green to white
			}
		}

	//	askingPriceCell.css('background', colorString);
		markupCell.css('background', colorString);
	};

	function updateMarkupAll(notesTable0, trs, delay)
	{
		if(typeof delay == 'undefined') delay = 0;

	//	setTimeout(function(){
			updateMarkupAll0(notesTable0, trs);
	//	}, delay);
	}

	function updateMarkupAll0(notesTable0, trs)
	{
		trs.not(".tfoot").each(function()
		{
			var tr = $(this);
			updateMarkup(notesTable0, tr);
		});
	}

	function colorCellsPlusMarkup(notesTable)
	{
		colorCells(notesTable);
		updateMarkupAll(notesTable.get(0), notesTable.find("tbody:last tr"));
	}

	function colorCells(notesTable)
	{
//		setTimeout(function()
//		{
//			colorCells0(notesTable);
//		}, 2000);
//	}
//
//	function colorCells0(notesTable)
//	{
	var DEBUG = debug(false, arguments);

		var notesTable0 = notesTable.get(0);

		var trs = 
			notesTable
				.find("tbody:last tr")
					.not(".tfoot")	// last line, footer
					.not(".lcac_expired")	// expired so hidden
					.not(":contains('Edit Order')")	// footer on placeOrder.action
					.not(":contains('No Results Found')")	 // "No Results Found"
					;


		var loanIdSeen = {};	// italic loanIds

		trs.each(function()
		{
			var tr = $(this);
			var tds = tr.find("td");

			var loanId = tr.data('loanId');
	//		var loanId = getLoanId(tr, notesTable0.loanIdColumnIndex, notesTable0.loanIdEmbeddedColumnIndex);
			
			if(notesTable0.loanIdColumnIndex)
				var loanIdCell = tds.eq(notesTable0.loanIdColumnIndex);

			/*
			 * highlight repeated loan ids (per table)
			 */
			if(loanIdCell)
			{
				loanIdCell.addClass('lcac_first_candidate');

				if(!loanIdSeen[loanId])
				{
					loanIdSeen[loanId] = true;	// set the flag to true
					tr.addClass('lcac_first');
					tr.removeClass('lcac_notfirst');
				}
				else
				{
					tr.removeClass('lcac_first');
					tr.addClass('lcac_notfirst');
				}
			}

			if(tr.html().match(/no longer listed|already been listed/))
				return;

			var loanStatusCell = tds.eq(notesTable0.loanStatusColumnIndex);
			var loanStatus = loanStatusCell.text();

			var outstandingPrincipal = text2Value(tds.eq(notesTable0.outstandingPrincipalColumnIndex).text());
			var accruedInterest = text2Value(tds.eq(notesTable0.accruedInterestColumnIndex).text());
			var askingPrice = text2Value(tds.eq(notesTable0.askingPriceColumnIndex).text());
			var principalPlus = text2Value(tds.eq(notesTable0.principalPlusColumnIndex).text());
			var remainingPayments = text2Value(tds.eq(notesTable0.remainingPaymentsColumnIndex).text());

			var interestRateAssumed = false;
			var interestRate = getStoredInterestRateByLoanId(loanId);
			if(interestRate == null)
			{
				interestRate = parseInterestRate(loanId, tds.eq(notesTable0.interestRateColumnIndex).html());
				if(interestRate == null)
				{
					interestRateAssumed = true;
					interestRate = 0.10;
				}
			}

			var accruedInterestInMonths = calcInterestInMonths(outstandingPrincipal, interestRate, accruedInterest);
			if(accruedInterestInMonths > 0)
			{
				var td = tds.eq(notesTable0.accruedInterestColumnIndex);
				var div = td.find('div');	// find the elment that has the string (could be us or a div)
				if(div.length == 0)
					div = td;

				if(!div.hasClass('lcac_inmonths'))
				{
					div.addClass('lcac_inmonths');
					div.append(sprintf('[%0.1fm]', accruedInterestInMonths));

					/* accrued interest is better indicator than "late" status */
					if(accruedInterestInMonths >= lateMonths1) // more than 3 months' interest
						td.addClass(interestRateAssumed ? 'lcac_orangeHigh' : 'lcac_redHigh');
					else if(accruedInterestInMonths >= lateMonths2) // more than 2 months' interest
						td.addClass(interestRateAssumed ? 'lcac_orangeMed' : 'lcac_redMed');
					else if(accruedInterestInMonths >= lateMonths3) // more than 1 month + grace period
						td.addClass(interestRateAssumed ? 'lcac_orangeLow' : 'lcac_redLow');
					else if(accruedInterestInMonths >= lateMonths4) // in grace period?
						td.addClass('lcac_yellowMed');
				}
			}

			if(loanStatus.match(/Default|Charged\s*Off/))
				tds.eq(notesTable0.loanStatusColumnIndex).addClass('lcac_redHigh');
			else if(loanStatus.match(/Late/))
				tds.eq(notesTable0.loanStatusColumnIndex).addClass('lcac_yellowLow');
			else if(loanStatus.match(/Fully.*Paid/))
				tds.eq(notesTable0.loanStatusColumnIndex).addClass('lcac_greenHigh');

			if(TENDOLLARINTEREST)
			{
			/* more than $10 interest per year
			 * XXX calculation not quite right because interest goes down over time, unless they're paying interest only
			 */

			var remainingPaymentsExpected = remainingPayments != null ? remainingPayments : 60;	//XXX this is not right, where can we get this value?

			var interest12mos = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(12, remainingPaymentsExpected));
			var interestEOY = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(remainingPaymentsEOY(), remainingPaymentsExpected));
			DEBUG && GM_log("interest12mos=", interest12mos, " interestEOY=", interestEOY);
			if(interestEOY >= 10.00)	// EOY
				tds.eq(notesTable0.interestRateColumnIndex).addClass(interestRateAssumed ? 'lcac_orangeHigh' : 'lcac_redHigh');
			else if(interest12mos >= 10.00)	// 12 mos
				tds.eq(notesTable0.interestRateColumnIndex).addClass(interestRateAssumed ? 'lcac_orangeLow' : 'lcac_yellowLow');
			}

			/* payments vs investment */
			if(notesTable0.paymentsReceivedColumnIndex && notesTable0.investmentColumnIndex)
			{
				var paymentsReceived = text2Value(tds.eq(notesTable0.paymentsReceivedColumnIndex).text());
				var investment = text2Value(tds.eq(notesTable0.investmentColumnIndex).text());

				if(paymentsReceived == 0)
					tds.eq(notesTable0.paymentsReceivedColumnIndex).addClass('lcac_orangeLow');
				else if(paymentsReceived < investment)
				{
					if(loanStatus.match(/Fully.*Paid/))
						tds.eq(notesTable0.paymentsReceivedColumnIndex).addClass('lcac_redMed');	// no chance of getting paid back now
					else if(paymentsReceived < investment / 2)
						tds.eq(notesTable0.paymentsReceivedColumnIndex).addClass('lcac_yellowMed');
					else
						tds.eq(notesTable0.paymentsReceivedColumnIndex).addClass('lcac_yellowLow');
				}
				else // paymentsReceived >= investment
					tds.eq(notesTable0.paymentsReceivedColumnIndex).addClass('lcac_greenLow');

				if(GAINLOSS)
				{
					var gainloss = paymentsReceived - investment;

					var td = tds.eq(notesTable0.paymentsReceivedColumnIndex);
					var div = td.find("div");
					if(div.length == 0)
						div = td;

					if(!div.hasClass('lcac_gainloss'))
					{
						div.addClass('lcac_gainloss');
						div.append(sprintf('%+0.2f', gainloss));
					}
				}
			}

			/*
			 * add price to href link to note
			 */
			if(PRICESINURL)
			{
			if(askingPrice)
			{
				var a = loanStatusCell.find('a');	// find the elment that has the string (could be us or a div)
				a.prop('href', a.prop('href') + sprintf("&our_asking_price=%0.2f", askingPrice));	// we're selling it
			}
			}
		});
	}



	/*
	 * find first and most recent payment dates
	 * Note: Issued loans only have a scheduled payment in payment history
	 */

	/* find the most recent payment, does it matter if it paid or not?
	 *
	 * Note: sometimes Payment history skips a payment between most recent and scheduled if it's late/grace
	 * use a month before scheduled payment to work around this? doesn't always match the payment though e.g. on payment plan
	 */
	/* NOTE: data is contained within divs inside the td's, e.g.

	<tr id="yui-rec11" class="yui-dt-rec yui-dt-first yui-dt-even" style="">
	<td id="yui-gen89" class="dueDate yui-dt0-col-dueDate yui-dt-col-dueDate yui-dt-desc yui-dt-sortable yui-dt-resizeable yui-dt-first" headers="yui-dt0-th-dueDate ">
	<div id="yui-gen90" class="yui-dt-liner">10/19/12</div>
	</td>
	<td class=" tooltip compDate yui-dt0-col-compDate yui-dt-col-compDate yui-dt-sortable" headers="yui-dt0-th-compDate ">

	*/


	function foliofnMarkupHighLimitChanged(textfield)
	{
		setHeaderLimit("foliofnMarkupHighLimit", textfield, true);
	}

	function foliofnMarkupLowLimitChanged(textfield)
	{
		setHeaderLimit("foliofnMarkupLowLimit", textfield, true);
	}

	function ytmMinChanged(textfield)
	{
		setHeaderLimit("ytmMin", textfield, true);
	}

	function irrMinChanged(textfield)
	{
		setHeaderLimit("irrMin", textfield, true);
	}

	function principalPlusMinChanged(textfield)
	{
		setHeaderLimit("principalPlusMin", textfield);
	}

	function markupMaxChanged(textfield)
	{
		setHeaderLimit("markupMax", textfield, true);
	}

	function markupMaxStrictChanged(checkbox)
	{
		setHeaderLimit("markupMaxStrict", checkbox);
	}

	function askingPriceStrictChanged(checkbox)
	{
		setHeaderLimit("askingPriceStrict", checkbox);
	}

	function ytmStrictChanged(checkbox)
	{
		setHeaderLimit("ytmStrict", checkbox);
	}

	function irrStrictChanged(checkbox)
	{
		setHeaderLimit("irrStrict", checkbox);
	}

	function excludeTooMuchInterestPer12MonthsChanged(checkbox)
	{
		setHeaderLimit("excludeTooMuchInterestPer12Months", checkbox);
	}

	function excludeTooMuchInterestThisYearChanged(checkbox)
	{
		setHeaderLimit("excludeTooMuchInterestThisYear", checkbox);
	}

	function principalPlusStrictChanged(checkbox)
	{
		setHeaderLimit("principalPlusStrict", checkbox);
	}

	function tooManyRowsTickMark(value)
	{
		return ( CHECKBOXLIMIT > 0 && value > CHECKBOXLIMIT ) ? '+' : '';
	}

	function loanDetailURL(loanId)
	{
		return sprintf("/browse/loanDetail.action?loan_id=%s", loanId);
	}

	/*
	 * END http://www.greywyvern.com/?post=258
	 */

	function parseNotesRawDataCsv(responseText)
	{
	var DEBUG = debug(false, arguments, false), FUNCNAME = funcname(arguments);

		GM_log("responseText.length=", responseText.length);

		var csvArray = csv2Array(responseText);

		DEBUG && GM_log(FUNCNAME + " csvArray.length=" + csvArray.length + " csvArray=", csvArray);

		var notes = [];
		for(var index = 0; index < csvArray.length; index++)
		{
			var note = csvArray[index];

	/*
	LoanId
	NoteId
	OrderId
	PrincipalRemaining
	PaymentsReceivedToDate
	Status
	InterestRate
	NextPaymentDate
	AmountLent
	Accrual

	PortfolioId
	PortfolioName
	LoanClass.name
	LoanType.Label
	LoanMaturity.Maturity
	Trend
	NoteType
	*/
			var note = {
				noteId: note['NoteId'],
				loanId: note['LoanId'],
				orderId: note['OrderId'],
				principalRemaining: parseFloat(note['PrincipalRemaining']),
				paymentReceived: parseFloat(note['PaymentsReceivedToDate']),
				status: note['Status'],
				interestRate: parseFloat(note['InterestRate']),	/* already in decimal format, but sometimes doesn't match displayed value */
				accrual: parseFloat(note['Accrual']),
				amountLent: parseFloat(note['AmountLent']),
				nextPaymentDate: note['NextPaymentDate'].replace(/(\d+)\/(\d+)\/(\d+)/, "$3$1$2"),	// YYYYMMDD
			};

			if('' + note.noteId == '17193384')	// DEBUG
				GM_log("ZZZ note.noteId=" + note.noteId, " note=", note);

			notes.push(note);
		}

		return notes;
	}

	/*
	 * Download all the notes we hold, also updates the stored note data
	 */
	function getOwnedNotesData(callback)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		/*
		 * YYY not straight-foward to get the complete list
		 * getting it from Account is OK, but from Folfiofn My Accounts the file is small,
		 * e.g. 12K instead of 360K, 89 notes instead of 2600
		 * cookies all look the same, is it using referer?
		 * (we had a problem once selling notes when using the no-referer add-on)
		 * YYY setting the referer is prohibited in javascript
		 */
		var requestURL = "/account/notesRawData.action";
		GM_log("requestURL=", requestURL);
		
		$.get(requestURL, function(responseText)
		{
			GM_log(FUNCNAME + " responseText.length=" + responseText.length);
			DEBUG && GM_log("responseText=" + responseText.substr(0, 1024) + "...");
			DEBUG && GM_log("..." + responseText.slice(-1024));

			if(responseText.match(/Member Sign-In/))		// we've been logged out
			{
				alert("Not logged in");
				if(callback)
					callback(null);
				return;
			}

			var notes = parseNotesRawDataCsv(responseText);	// an array of notes

			DEBUG && GM_log(DEBUG + " notes.length=", notes.length);
			DEBUG && GM_log(DEBUG + " notes=", notes);

			saveOwnedNotes(notes);
			saveStoredNotes(notes);

			if(callback)
			{
				DEBUG && GM_log(DEBUG + " calling callback()...");
				callback(notes);
			}

			// done
		})
		.error(function(jqXHR, textStatus, errorThrown) 
		{
			GM_log("textStatus=" + textStatus + " errorThrown=" + errorThrown);
			alert("textStatus=" + textStatus + " errorThrown=" + errorThrown);
		});
	}

	function parseAccountSummary(innerHTML)
	{
		return {
			totalPayments: innerHTML.match(/Total Payments[\s\S]*?(\$[\d,.]*)/)[1],
			accountTotal: innerHTML.match(/Account Total[\s\S]*?(\$[\d,.]*)/)[1],
			accruedInterest: innerHTML.match(/Accrued Interest[\s\S]*?(\$[\d,.]*)/)[1],
			availableCash: innerHTML.match(/Available Cash[\s\S]*?(\$[\d,.]*)/)[1],
		};
	}

	function getSummary(callback)
	{
		GM_log("getSummary()...");

		var requestURL = "/account/summary.action";

		$.get(requestURL, function(responseText, textStatus, jqXHR) 	// success
		{
			if(responseText.match(/Member Sign-In/))		// we've been logged out
			{
				/* XXX alert the user */
				callback(null);
				return;
			}

			var summary = parseAccountSummary(responseText);
			callback(summary);
		});
	}

	function getFoliofn(callback)
	{
	var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);

		var requestURL = "/foliofn/tradingAccount.action";	// html

	//	window.status = sprintf("Downloading %s...", requestURL);

		$.get(requestURL, function(responseText) 	// success
		{
			DEBUG && GM_log(FUNCNAME + " responseText=", responseText);

			if(responseText.match(/Member Sign-In/))		// we've been logged out
			{
				alert("Not logged in");
				callback(null);
				return;
			}

			var dom = $(responseText);

			var purchasedPendingLoanIds = {};
			var soldPendingLoanIds = {} ;
			var purchasedPendingNoteIds = {};
			var soldPendingNoteIds = {} ;

			var purchasedPendingTotal = calcPending(dom.find("table#purchased-orders"), null, purchasedPendingLoanIds, purchasedPendingNoteIds);
			var soldPendingTotal = calcPending(dom.find("#sold-orders"), null, soldPendingLoanIds, soldPendingNoteIds);

			dom.remove();	//XXX discard it (do we need to do this?)

			saveOwnedNotesPending({
				purchasedPendingLoanIds: purchasedPendingLoanIds,
				purchasedPendingNoteIds: purchasedPendingNoteIds,
				soldPendingLoanIds: soldPendingLoanIds,
				soldPendingNoteIds: soldPendingNoteIds,
				});

			callback({
				purchasedPendingTotal: purchasedPendingTotal,
				soldPendingTotal: soldPendingTotal,
			});
		});
	}

	function scanLoanDetail(loanId, html)
	{
		var dom = $(html);

		var location = dom.find("th:contains('Location') + td").text();

		var vars = {
			location: location,
		};

		setLoanFlags(loanId, vars);

		return vars;
	}

	function followLink(containsString, search, delay)
	{
	var DEBUG = debug(false, arguments);

		delay = delay || 5000;

		var link = $(sprintf("a:contains('%s')", containsString));
		DEBUG && GM_log("link=%o", link);

		var href = link[0].href;
		DEBUG && GM_log("href=" + href);

		if(search)
		{
			DEBUG && GM_log("search=" + search);
			href += search;
			DEBUG && GM_log("href=" + href);
		}

		var unloading = false;
		window.onbeforeunload = function() { unloading = true};
		setTimeout(function(){
			if(unloading)
				return;

			window.location.href = href;
		}, delay);
	}


	/* Add direct links to Foliofn browse notes/sell notes */
	$("ul#master_smenu li:contains(Trading Account)")
		.after(
			sprintf(
				"<li><span class='separator'>|</span><a href='%s'>Ffn Browse Notes</a></li>",
				'https://www.lendingclub.com/foliofn/tradingInventory.action') +
			sprintf(
				"<li><span class='separator'>|</span><a href='%s'>Ffn Sell Notes</a></li>",
				'https://www.lendingclub.com/foliofn/loans.action') +
			"");

	if(href.match(/summary.action/))
	{
		GM_addStyle(".lcacdiv {position:fixed; background:#FFFFFF; bottom:10%; right:5px; z-index:100;}");
		GM_addStyle(".lcacdiv fieldset {margin:0px 5px 5px 5px; padding:0px 5px 5px 5px; border:1px solid #2266AA;}");

		var summarydiv = $(
			"<div class='lcacdiv'>" +
			"<fieldset>" +
			"<legend>LCAC</legend>" +
			"</fieldset>" +
			"</div>" +
			"");

		$(".master_content-outer-container").before(summarydiv);

		/* VITALS */
		{
			/* make it easier to select these values I use in my spreadsheet (instead of triple-click) */
			/* \s\S is like . but also matches embedded newlines */
			summarydiv.find("fieldset")
				.append(
					"<div>" +
					"<input id='summaryValuesInput' type=text readonly onclick='select();' style='width:35em' />" +
					"<input id='summaryValuesButton' type=button style='width:5em;' value='Refresh' />" +
					"<br>" +
					"<input id='summaryNotesInput' type=text readonly onclick='select();' style='width:35em' />" +
					"<input id='summaryNotesButton' type=button style='width:5em;' value='Refresh' />" +
					"</div>" +

					(LOOKUPBUTTONS ?
					"<div style='text-align:center;'>" +
					"<label>Lookup:</label>" +
					"<input id='loanIdInput' type=text size=8 />" +
					"<input id='loanIdButton' type=button value='Loan Id' />" +
					"<input id='noteIdInput' type=text size=8 />" +
					"<input id='noteIdButton' type=button value='Note Id' />" +
					"<input id='orderIdInput' type=text size=8 />" +
					"<input id='orderIdButton' type=button value='Order Id' />" +
					"</div>" +
					"" : "") +

					"<div style='text-align:center;'>" +
					(SCANBUTTONS ?
					"<input type='button' id='scanOrdersButton' value='Scan Orders'/>" +
					"<input type='button' id='scanLoansButton' value='Scan Loans'/>" +
					"" : "") +
					"<input type='button' id='exportLocalStorageButton' value='Export Comments' />" +
					"<input type='button' id='importLocalStorageButton' value='Import Comments' />" +
					(false ?
					"<input type='button' id='clearLocalStorageButton' value='Clear All' />" +
					"" : "") +
					"</div>" +

					""
				);

			var loanIdInput = summarydiv.find("#loanIdInput");
			var loanIdButton = summarydiv.find("#loanIdButton");
			var noteIdInput = summarydiv.find("#noteIdInput");
			var noteIdButton = summarydiv.find("#noteIdButton");
			var orderIdInput = summarydiv.find("#orderIdInput");
			var orderIdButton = summarydiv.find("#orderIdButton");

			loanIdButton.click(function()
			{
				GM_log("loanIdButton.click()");
				var loanId = loanIdInput.val().trim();
				if(loanId == "")
					return;
					
				var url = sprintf("/account/loanDetail.action?loan_id=%s", loanId);
				window.open(url, "_blank");
			});
			orderIdButton.click(function()
			{
				GM_log("orderIdButton.click()");
				var orderId = orderIdInput.val().trim();
				if(orderId == "")
					return;
					
				var url = sprintf("/account/orderDetails.action?order_id=%s", orderId);
				window.open(url, "_blank");
			});
			noteIdButton.click(function()
			{
				GM_log("noteIdButton.click()");
				var noteId = noteIdInput.val().trim();
				if(noteId == "")
					return;

				var note = getStoredNote(noteId);
				if(!note)
				{
					alert("Unknown Order Id");
					return;
				}

				var url = loanPerfURL(note);
				window.open(url, "_blank");
			});

			var summaryValuesInput = summarydiv.find("#summaryValuesInput");
			var summaryValuesButton = summarydiv.find("#summaryValuesButton");
			var summaryNotesInput = summarydiv.find("#summaryNotesInput");
			var summaryNotesButton = summarydiv.find("#summaryNotesButton");

			function updateVitals(vars)	// javascript is single-threaded, yes? so we should be ok
			{
			var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);

				if(vars == null)
				{
					updateVitals.vars = null;
					summaryValuesInput.addClass('lcac_updating');
					return false;
				}

				if(updateVitals.vars == null)
					updateVitals.vars = {};

				$.extend(updateVitals.vars, vars);

				GM_log("updateVitals.vars=", updateVitals.vars);

				var notDone = false;

				function notDone0(value, format)
				{
					if(value == null)
					{
						notDone = true;
						return "...";
					}

					if(format)
						return sprintf(format, value);

					return value;
				}

				var str =
					notDone0(updateVitals.vars.accountTotal) +	//already formatted
					"\t" +
					notDone0(updateVitals.vars.totalPayments) +	//already formatted
					"\t" +
					notDone0(updateVitals.vars.accruedInterest) +	//already formatted
					"\t" +
					notDone0(updateVitals.vars.availableCash) +	//already formatted
					"\t" +
					notDone0(updateVitals.vars.purchasedPendingTotal, "$%0.2f") +
					"\t" +
					notDone0(updateVitals.vars.soldPendingTotal, "$%0.2f") +
					"";
				
				GM_log("str=", str);

				summaryValuesInput.val(str);

				if(!notDone)
				{
					summaryValuesInput.removeClass('lcac_updating');

					return true;
				}

				return false;
			}


			function doSummaryValues(summary, callback)
			{
				updateVitals(null);	// reset it

				if(summary)	// first time can use our own page's data
					updateVitals(summary) && callback();
				else
					getSummary(
						function(retvals)	// callback
						{
							updateVitals(retvals) && callback();
						});

				getFoliofn(
					function(retvals)	// callback
					{
						updateVitals(retvals) && callback();
					});
			}

			function doSummaryNotes(callback)
			{
			var DEBUG = debug(true, arguments);

				summaryNotesInput.addClass('lcac_updating');

				getOwnedNotesData(function(notes) // callback
				{
				var DEBUG = debug(true, arguments);

					/* error */
					if(notes == null)
					{
						summaryNotesInput.val("Error");
						return;
					}

					if(notes.length > 0)
						GM_log("notes[0]=", notes[0]);

					var notesTotal = 0;
					var interestRateTotal = 0;
					var interestRateTotalWeighted = 0;
					var principalRemainingTotal = 0;
					var loanIds = {};
					var loansTotal = 0;
					for(var index = 0; index < notes.length; index++)
					{
						var note = notes[index];
						if(note.status.match(/Fully\s*Paid|Charged\s*Off/))
							continue;

						notesTotal++;

						var interestRate = parseFloat(note.interestRate);
						var principalRemaining = parseFloat(note.principalRemaining);

						interestRateTotal += interestRate;
						principalRemainingTotal += principalRemaining;
						interestRateTotalWeighted += interestRate * principalRemaining;

						if(!loanIds['' + note.loanId])
						{
							loanIds['' + note.loanId] = true;
							loansTotal++;
						}
					}

					var interestRateAvg = interestRateTotal / notesTotal;
					var interestRateAvgWeighted = interestRateTotalWeighted / principalRemainingTotal;
					
					GM_log("interestRateTotal=", interestRateTotal, " principalRemainingTotal=", principalRemainingTotal);

					summaryNotesInput.val(
						sprintf("%d notes, %d loans, $%0.2f o.p, %0.2f%% avg rate (%0.2f%% weighted)",
							notesTotal,
							loansTotal,
							principalRemainingTotal,
							interestRateAvg * 100,
							interestRateAvgWeighted * 100
							));

					summaryNotesInput.removeClass('lcac_updating');

					if(callback)
						callback();
				});
			}

			function summaryValuesButtonClick(summary)
			{
				var val = summaryValuesButton.val();
				if(val == '--')
				{
					/* nothing */
				}
				else
				{
					var valueOrig = val;	// javascript scoping: this should be the same when we get back
					summaryValuesButton.val('--');

					// when done reset the timeleft
					doSummaryValues(
						summary,
						function callback(retval)
						{
							summaryValuesButton.val(valueOrig);
						});
				}
			}

			function summaryNotesButtonClick()
			{
			var DEBUG = debug(true, arguments);

				var val = summaryNotesButton.val();
				GM_log("val=", val);
				if(val == '--')
				{
					/* nothing */
				}
				else
				{
					var valueOrig = val;	// javascript scoping: this should be the same when we get back
					summaryNotesButton.val('--');

					// when done reset the timeleft
					doSummaryNotes(
						function callback()
						{
							summaryNotesButton.val(valueOrig);
						});
				}
			}

			summaryValuesButton
				.on("click", function()
				{
					summaryValuesButtonClick();
				});
			summaryValuesButtonClick(parseAccountSummary(innerHTML));	// run it once at startup with current page

			summaryNotesButton
				.on("click", function()
				{
					summaryNotesButtonClick();
				});
			summaryNotesButtonClick();

			summarydiv.find("input#importLocalStorageButton")
				.after(
'<div id="import_prompt" style="display:none; position:fixed; top:50%; left:50%; margin-left:-250px; margin-top:-100px; background:#ffffcf; border:2px solid #2266AA; z-index:100; padding:5px; text-align:center;">' +
'<label for="importtext"/>Paste exported text here:</label>' +
'<br><textarea id="importtext" rows="10" cols="80" spellcheck="false" style="overflow:hidden; resize: none;" />' +
'<br><input type="button" id="importOk" value="Ok">' +
'<input type="button" id="importCancel" value="Cancel">' +
'</div>' +
					"");

			summarydiv.find("input#importLocalStorageButton")
				.click(function()
				{
					GM_log("importLocalStorageButton click()...");

					$("div#import_prompt")
						.each(function(index, element){ GM_log("import_prompt element=", element); })
						.css("display", "block");

					$("#importtext")
						.val("")	// clear the field
						.focus();
				});
					
			$("input#importCancel").click(function() {
				$("div#import_prompt").css("display", "none");
			});
			
			$("input#importOk").click(function() {
				$("div#import_prompt").css("display", "none");

				var ok = $("#importtext").val();
				GM_log("ok.length=", ok.length);

				if(ok == null)
					ok = "";
				
				ok = ok.replace(/[\n\r]+/g, ' ').trim();	// remove newlines
				
				if(ok.length <= 0)
				{
					alert("No data");
					return;
				}

				var ret = confirm("length=" + ok.length + ". MAKE SURE YOU MAKE A BACKUP. Confirm import?");
				
				if(ret)
				{
					try
					{
						importJSON(ok);
					}
					catch(ex)
					{
						GM_log(FUNCNAME + " ex=", ex, " ", ex.stack);
						alert(ex);
					}
				}
			});

			var scanOrdersButton = summarydiv.find("input#scanOrdersButton");
			scanOrdersButton.click(function() 
			{
				var button = $(this);

				if(button.hasClass('lcac_running'))
					button.addClass('lcac_cancel');
				else
				{
					button.addClass('lcac_running');
					button.val('Running');

					scanOrders(button, function callbackDone(success)
					{
						if(success)
							button.val('Done');
						else if(button.hasClass('lcac_cancel'))
							button.val('Canceled');
						else
							button.val('Incomplete');

						button.removeClass('lcac_running');
						button.removeClass('lcac_cancel');
					});
				}
			});

			var scanLoansButton = summarydiv.find("input#scanLoansButton");
			GM_log("scanLoansButton=", scanLoansButton);
			scanLoansButton.click(function() 
			{
				if(scanLoansButton.hasClass('lcac_running'))
					scanLoansButton.addClass('lcac_cancel');
				else
				{
					scanLoansButton.addClass('lcac_running');
					scanLoansButton.val('Running');
					
					scanLoans(scanLoansButton, function callbackDone(success)
					{
						if(success)
							scanLoansButton.val('Done');
						else if(scanLoansButton.hasClass('lcac_cancel'))
							scanLoansButton.val('Canceled');
						else
							scanLoansButton.val('Incomplete');

						scanLoansButton.removeClass('lcac_running');
						scanLoansButton.removeClass('lcac_cancel');
					});

				}
			});
		}
			
		summarydiv.find("#clearLocalStorageButton")
			.click(function()
			{
				var ret = confirm("ARE YOU SURE?");
				if(!ret)
					return;

				for(var key in localStorage)
				{
					if(key.match(/^comment_/))
					{
						localStorage.removeItem(key);
					}
				}

				localStorage.removeItem('noteData');
				localStorage.removeItem('loanData');

				storedData = {};
				storedData.notesByNoteId = {};
				storedData.loansByLoanId = {};
				storedData.notesByLoanId = {};
				storedData.loanId2NoteArray = {};
			});

		/* XXX fix this, e.g. comments */
		summarydiv.find("input#exportLocalStorageButton")
			.click(exportLocalStorage);
	}
	else if(href.match(/loanPerf.action/))
	{
		// YYY on my system, there's a lot of ununsed whitespace on the left
		$('#content-wrap')
        	.css("width", "auto")
        	.css("padding-left", "50px")
        	.css("padding-right", "50px")
        	.css("min-width", "850px")
        $('#content')
        	.css("width", "auto");

		var vars = doLoanPerfPart1(table);

		if(IRLINKS)
		$(":header:contains(Loan Performance)")
			.append(
				sprintf(" <a href='%s' target='_lcac_ir'>[IR]</a>", 
					sprintf("http://www.interestradar.com/loan?LoanID=%d", vars.loanId))
				);

		// !important overrides column sort coloring
		GM_addStyle(".lcac_green { color:green !important; }");
		GM_addStyle(".lcac_greenrev { background-color:lightgreen !important; }");
		GM_addStyle(sprintf(".lcac_yellowRev { color:black; background-color:%s !important; }", yellowMed));
		GM_addStyle(".lcac_yellow { color:yellow; background-color:lightgrey !important; }");
		GM_addStyle(".lcac_red { color:red !important; }");
		GM_addStyle(".lcac_redRev { color:white; background-color:red !important; }");

		GM_addStyle(sprintf(".lcac_underpayment {background-color:%s !important;}", yellowMed));	
		GM_addStyle(sprintf(".lcac_zeropayment {background-color:%s !important;}", redLow));	
		GM_addStyle(sprintf(".lcac_overpayment {background-color:%s !important;}", greenLow));
		GM_addStyle(sprintf(".duplicateDate {background-color:%s !important;}", yellowLow));
		GM_addStyle(sprintf(".duplicateDate2 {background-color:%s !important;}", yellowHigh));
		
		GM_addStyle("table.plain-table {white-space: nowrap;}");	//YYY Collection Log date wraps on Chrome
		
		highlightLoanPerf();
		
		/* they use fixed height but we add some info and it's getting lost */
	//	GM_addStyle(".moduleSmallNoHeight {height:auto !important; }");
	//	$(".moduleSmall").addClass("moduleSmallNoHeight");
		$(".moduleSmall").removeClass("moduleSmall");

		var table = $('div#lcLoanPerf1 table');
		
		$("a:contains('Original Listing')")
			.before(sprintf("<a href='/account/orderDetails.action?order_id=%s'>Order Details*</a> | ", vars.orderId));
	
		waitForElement(":header:contains(Payment History) ~ div.pagination select.yui-pg-rpp-options", null,
			function(selects)	// one at the top and one at the bottom
			{
				waitForElement("div#lcLoanPerf1 tbody.yui-dt-data", null,
					function callback()
					{
	var datatable = unsafeWindow.YAHOO.loanperf.myTableId;

	/*REPLACEMENT for addSelectValues(selects, ["999"], 0); */
	var paginator = datatable.get('paginator');
	var options = paginator.get('rowsPerPageOptions');
	options.push({value:999, text:"999*"});
	paginator.set('rowsPerPageOptions', options);
	paginator.setRowsPerPage(999);

	doPaymentHistory(vars, table, datatable);
	scanLoanPerf(vars.loanId, $("body"));
	doLoanPerfPart2(vars);

	var formatCellOrig = datatable.formatCell;
	datatable.formatCell = function( elLiner , oRecord , oColumn )
	{
		var key = oColumn.key;
		var value = oRecord.getData(key);

		formatCellOrig.apply(this, arguments);

/* e.g.
dueDate value= Date {Fri May 10 1912 00:00:00 GMT-0400 (Eastern Daylight Time)}
compDate value= Date {Thu May 16 1912 00:00:00 GMT-0400 (Eastern Daylight Time)}
paymentAmount value= 0.89
principal value= <span title="$0.547519003448">$0.55</span>
interest value= <span title="$0.342480996552">$0.34</span>
lateFees value= <span title="$0.000000000000">$0.00</span>
outstandingPrincipal value= <span title="$23.374991287351">$23.37</span>
status value= Completed - on time 
*/

		if(key == 'compDate')
		{
//			if(oRecord._nCount > 0 && (!value || value.getTime() == 0))
//				$(elLiner).closest("td").addClass("lcac_yellowRev");
		}
		else if(key == 'paymentAmount')
		{
			/*YYY sometimes it's off by a penny without payment plan or anything, some kind of rounding error? */
			if(!value)	
				$(elLiner).closest("td").addClass("lcac_zeropayment");
			else if(value < vars.origPaymentAmount - 0.01)	
				$(elLiner).closest("td").addClass("lcac_underpayment");
			else if(value > vars.origPaymentAmount + 0.01)
				$(elLiner).closest("td").addClass("lcac_overpayment");
		}
		else if(key == 'principal')
		{
			var value2 = html2Value(value);
			if(value2 == 0)
				$(elLiner).closest("td").addClass("lcac_zeropayment");
		}
		else if(key == 'lateFees')
		{
			/* value is pre-formatted */
			value = $(value).text().replace(/\$/, '');
			if(value > 0)
				$(elLiner).closest("td").addClass("lcac_redLow");
		}
		else if(key == 'status')
		{
			highlightRecurseDOM($(elLiner), highlightLoanPerfBAD, "lcac_redLow");
			highlightRecurseDOM($(elLiner), highlightLoanPerfWARNING, "lcac_yellowRev");
		}
	};

	datatable.render();

	doLoanPerfPart3(vars);
					});
			});
	}
	else if(href.match(/loanDetail.action/))	// Original Listing
	{
		doLoanDetail();
	}
	else if(href.match(/tradingInventory.action|newLoanSearch.action/))	// newLoanSearch.action = "Reset" on Browse Notes
	{
		set_hideOwnNotes(getStoredValue("hideOwnNotes"));
		set_hideAlreadyInvested(getStoredValue("hideAlreadyInvested"));
		set_hideNotFirst(getStoredValue("hideNotFirst"));
		set_hideUnlikedRows(getStoredValue("hideUnlikedRows"));


		$('#content-wrap').css("width", "auto");	// YYY on my system, there's a lot of ununsed whitespace on the left

		/*
		 * change the form to get so we can extract the search params, and use those params when we reload the page
		 * to keep the same search params
		 */
		if(TRADINGINVETORYPARAMS)
		{
			$("form#search-form").prop("method", "get");

			var search = window.location.search;	// empty string if nothing, otherwise "?..."
			GM_log("search=", search);
			localStorage.setItem("tradingInventory.action.search", search);	// save this for later, to fix up the link
		}


		GM_addStyle(".lcacdiv {position:fixed; background:#FFFFFF; top:50px; right:5px; z-index:100;}");
		GM_addStyle(".lcacdiv fieldset {margin:0px 5px 5px 5px; padding:0px 5px 5px 5px; border:1px solid #2266AA;}");

		/* floating div with our stuff in it */
		var lcacdiv = $(
				"<div class='lcacdiv'>" +
				"<fieldset>" +
				"<legend>LCAC</legend>" +

				"<label for='availableCashInput'>Available Cash: </label>" +
				"<input id='availableCashInput' size='10' readonly onclick='select();' />" +
				"<input type='button' id='availableCashRefresh' value='Refresh' />" +

				"<br>" +
				"<label for='purchaseTotalInput'>Purchase Total: </label>" +
				"<input id='purchaseTotalInput' size='10' readonly />" +
				"<br>" +
				"<label for='remainingCashInput'>Remaining Cash: </label>" +
				"<input id='remainingCashInput' size='10' readonly />" +

				"<br>" +
				"<div width=100% style='text-align:center' >" +
				"<input type='button' id='ffnExportListButton' value='Export List' />" +
				"</div>" +

				"</fieldset>" +
				"</div>" +
				"");
		
		$("div.dataset-wrapper")
			.before(lcacdiv);

		
		function exportFfn(doc, msgCallback)
		{
		var DEBUG = debug(false, arguments);

			function getFoliofnTradingInventory0(callbackDone)
			{
			var DEBUG = debug(false, arguments);

/* e.g.
https://www.lendingclub.com/foliofn/browseNotesAj.action?&sortBy=noteId&dir=asc&startindex=0&newrdnnum=28737209&pagesize=15
*/
				/*YYY Can't seem to get all the loans in one go, so loop to get them all */
				var newrdnnum = Math.round(Math.random() * 19999999);
				
				var notesAll = [];
				var timestamp = '' + new Date();

				function doit(startindex, pagesize)
				{
					var url = 
						sprintf(
							"/foliofn/browseNotesAj.action?sortBy=noteId&dir=asc&newrdnnum=%d&startindex=%d&pagesize=%d",
							newrdnnum,
							startindex,
							pagesize);

					GM_log("url=", url);

					msgCallback("Loading " + startindex + "...");
					$.get(url, function(jsonString)
					{
						try
						{
							var data = JSON.parse(jsonString);

							if(data.result == 'success')
							{
								var notes = data.searchresult.loans; // YYY they call it loans but it's really notes

								startindex += notes.length;	// do this before we do anything to the notes array

								GM_log("notes.length=", notes.length);
								GM_log("notes[0]=", notes[0]);

								notesAll = notesAll.concat(notes);	// concat doesn't carry over any properties

								if(startindex >= data.totalRecords)
								{
									/* done, no loop */
									notesAll.timestamp = timestamp;
									if(callbackDone) callbackDone(notesAll);
									msgCallback(null);
								}
								else
								{
									/* not done, loop */
									doit(startindex, pagesize);	
								}
							}
							else
							{
								GM_log("jsonString=", jsonString.substring(0, 1024) + "...");
//								alert("jsonString=" + jsonString);
								if(callbackDone) callbackDone(null);
							}
						}
						catch(ex)
						{
							GM_log("ex=", ex);
//							GM_log("jsonString=", jsonString);
							alert("ex=" + ex);
							if(callbackDone) callbackDone(null);
						}
					})
					.error(function(jqXHR, textStatus, errorThrown) 
					{
						GM_log("textStatus=" + textStatus + " errorThrown=" + errorThrown);
						alert("textStatus=" + textStatus + " errorThrown=" + errorThrown);
						if(callbackDone) callbackDone(null);
					});
				}

				doit(0, 10000);	//kick it off
			}
			
			function getFoliofnTradingInventory(callbackDone)
			{
				msgCallback("Preparing...");

				var url = "/foliofn/tradingInventory.action?mode=search&search_from_rate=0.04&search_remaining_payments=60&search_status=status_always_current&search_status=satus_current&search_status=status_late_16_30&search_status=status_late_31_120&search_to_rate=0.26&x=31&y=6";	// reset all the parameters

				$.get(url, function()	// have to call this to reset the list? (even with newrdnnum?) is there a cookie?
				{
					getFoliofnTradingInventory0(callbackDone);
				});
			}

			getFoliofnTradingInventory(
				function handleInventoryCallback(notesAll)
				{
				var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);
					
					msgCallback("Exporting...");

					/* YYY is this not sorted? */
					function checkSort(notes)
					{
					var DEBUG = debug(false, arguments, false), FUNCNAME = funcname(arguments);

						/* Check sort */
						var outoforders = [];

						var noteIdPrev = notes[0].noteId;
						for(var index = 1; index < notes.length; index++)
						{
							var noteId = notes[index].noteId;

							if(noteId < noteIdPrev)
								outoforders.push([noteId, noteIdPrev]);

							noteIdPrev = noteId;
						}
								
						if(outoforders.length > 0)
						{
							GM_log(FUNCNAME + " outoforders.length=", outoforders.length);
							DEBUG && GM_log(FUNCNAME + " outoforders=", outoforders.slice(0, 128));

//							notes.sort(function(a, b)	
//							{
//								return a.noteId - b.noteId;
//							});

							sortOptimizer(notes, 
								function()
								{
									var str = sprintf("%010d", this.noteId);
//									GM_log("str=" + "\"" + str + "\"");
									return str;
								});
						}

						/* Check duplicates */
						var duplicates = [];

						var notePrev = notes[0];
						for(var index = 1; index < notes.length; index++)
						{
							var note = notes[index];

							if(note.noteId == notePrev.noteId)
								duplicates.push({
									note: note,
									notePrev: notePrev,
								});

							notePrev = note;
						}
								
						if(duplicates.length > 0)
						{
							GM_log(FUNCNAME + " duplicates.length=", duplicates.length);
							GM_log(FUNCNAME + " duplicates=", duplicates.slice(0, 1024));
						}

					}

					GM_log("calling checkSort(notesAll)...");
					checkSort(notesAll);

					doc.write("Now: " + notesAll.timestamp + "<br>");

					/* load prev notes */
					var notesAllPrev = localStorage.getItem("notesAllPrev");	// load from localStorage
					if(notesAllPrev)
					{
						GM_log("localStorage.getItem() notesAllPrev.length=", notesAllPrev.length);

						notesAllPrev = RawDeflate.inflate(notesAllPrev);

						notesAllPrev = $.parseJSON(notesAllPrev);
						GM_log("3 notesAllPrev.length=", notesAllPrev.length);
						GM_log("3 notesAllPrev.timestamp=", notesAllPrev.timestamp);

						var props = notesAllPrev.shift();	// JSON.stringify misses properties on arrays
						GM_log("3.2 typeof props=", typeof props, " props=", props);

						if(props instanceof Object)
							notesAllPrev.timestamp = props.timestamp;
						else
							notesAllPrev.timestamp = props;

						GM_log("3.5 notesAllPrev.timestamp=", notesAllPrev.timestamp);

						doc.write("Prev: " + notesAllPrev.timestamp + "<br>");
					}
					else
						notesAllPrev = [];

					var notesAllPrevLookup = {};
					for(var index = 0; index < notesAllPrev.length; index++)
					{
						var notePrev = notesAllPrev[index];

						DEBUG && index < 10 && GM_log("e.g. notePrev=", notePrev);

						for(var prop in notePrev)
						{
							if(prop == "noteId" || prop == "loanGUID")	// these cannot change
								continue;

							// change the prop to propPrev
							notePrev[prop + "Prev"] = notePrev[prop];	
							delete notePrev[prop];
						}

						notesAllPrevLookup[notePrev.noteId] = notePrev;	// associative lookup
					}

					for(var index = 0; index < notesAll.length; index++)
					{
						var note = notesAll[index];
						var notePrev = notesAllPrevLookup[note.noteId];	// associative lookup
						
						DEBUG && index < 10 && GM_log("e.g. note=", note, " notePrev=", notePrev);

						if(notePrev)
						{
							/* update the note (already in the notesAllPrev array) */

							for(var prop in note)	// remove the propPrevs that didn't change
							{
								if(notePrev[prop + "Prev"] == note[prop])
									delete notePrev[prop + "Prev"];
							}

							$.extend(note, notePrev);
							$.extend(notePrev, note);
						}
						else
						{
							/* first time seeing this note */
							notesAllPrev.push(note);	
						}
					}

					/* write them */
					array2csv(doc, '\t', notesAll, true,
						["noteId", "loanGUID", "orderId", "orderIdPrev"], /*priorityKeys*/
						["title"] /*unpriorityKeys*/);

					/* save them */

	/*
	* YYY this is pretty big, pushing the limit of localStorage 5M, so we'll prune it to make it smaller

	accrued_interest 0.15
	asking_price 24
	checkboxes false
	credit_score_trend 2
	days_since_payment 6
	loanClass 36
	loanGUID 1397596
	loanGrade "D"
	loanRate "17.77"
	loan_status "Current"
	markup_discount "4.45"
	noteId 11861117
	orderId 3995942
	outstanding_principal "22.83"
	remaining_pay 32
	selfNote 0
	title "Debt relief"
	ytm "14.17"

	*/
					pruneArray(notesAllPrev,
						["noteId", "loanGUID", "orderId", "loan_status", "asking_price", "outstanding_principal", "ytm"]);

					/*YYY stringify misses properties on arrays, so push the ones we want to keep into the array */
					notesAllPrev.unshift({timestamp: notesAll.timestamp});	

					notesAllPrev = JSON.stringify(notesAllPrev);

					notesAllPrev = RawDeflate.deflate(notesAllPrev);	// also, compress it

					GM_log("localStorage.setItem() notesAllPrev.length=", notesAllPrev.length);

					localStorage.setItem("notesAllPrev", notesAllPrev);

					/* done */
					doc.close();
				});
		}

		$("#ffnExportListButton")
			.click(function()
			{
				var ok = confirm("This page will automatically reload after export. OK?");
//				var ok = confirm("You must reload this page after export. OK?");
				if(!ok)
					return;

				var exportWindow = window.open(null, "_foliofnLoansExport");
				if(exportWindow == null)
				{
					alert("Could not open a window. Are popups blocked?");
					return;
				}

				var doc = exportWindow.document;	//XXX pass this in?

				doc.write(
"<head>" +
"<title>Foliofn Export</title>" +
"</head>" +
"<body>" +
"<pre style='tab-size:23; -moz-tab-size:23; -o-tab-size:23;'>" +	/* big enough to handle Late status text */
					"");

				var button = $(this);
				var valueOrig = button.attr('value');

				exportFfn(doc,
					function(msg)
					{
						if(msg)
							button.val(msg);
						else
						{
							button.val(valueOrig);
							location.href = location.href;	//YYY reload the page because we had to change the search params
						}
					});
			});


		var availableCash = null;
		var totalPrice = 0;

		function updateTotals()
		{
		var DEBUG = debug(false, arguments);

			$("#availableCashInput")
				.removeClass("lcac_greenLow")
				.removeClass("lcac_redLow");

			if(availableCash == null)
			{
				$("#availableCashInput").val('Error');
				$("#availableCashInput").addClass("lcac_redLow");
			}
			else
			{
				$("#availableCashInput").val(sprintf('$%0.2f', availableCash));
				if(availableCash > 0)
					$("#availableCashInput").addClass("lcac_greenLow");
			}

			if(totalPrice == null)
				$("#purchaseTotalInput").val('Unknown');
			else
				$("#purchaseTotalInput").val(sprintf('$%0.2f', totalPrice));

			if(availableCash == null || totalPrice == null)
				$("#remainingCashInput").val('Unknown');
			else
			{
				$("#remainingCashInput")
					.removeClass("lcac_redMed")
					.removeClass("lcac_greenLow");
				var remainingCash = availableCash - totalPrice;
				$("#remainingCashInput").val(sprintf('$%0.2f', remainingCash));
				if(remainingCash < 0)
					$("#remainingCashInput").addClass("lcac_redMed");
				else
					$("#remainingCashInput").addClass("lcac_greenLow");
			}
		}

		function updateAvailableCash2()
		{
			$("#availableCashInput").val('...');

			getAvailableCash(function(value)
			{
				availableCash = value;
				updateTotals();
			});
		}

		updateAvailableCash2();

		$("#availableCashRefresh").on('click', function()
		{
			updateAvailableCash2();
		});
			
		loadSessionData();	// for colorCellsTradingInventory

		waitForElement(".yui-pg-rpp-options", null,
			function(selects)
			{
//				addSelectValues(selects, ["200", "500", "2000"]);

				waitForElement("#browseNotes table", ".yui-dt-data",
					function(notesTable)
					{
	var datatable = unsafeWindow.YAHOO.browseloans.dt;

	/*REPLACEMENT for addSelectValues(selects, ["200", "500", "2000"]); */
	var paginator = datatable.get('paginator');
	var options = paginator.get('rowsPerPageOptions');
	options.push({value:200, text:"200*"}, {value:500, text:"500*"}, {value:2000, text:"2000*"});
	paginator.set('rowsPerPageOptions', options);

						findHeadersCheckCells(notesTable, colorCellsTradingInventory, true,
							{addCommentColumn:true, addIRRColumn:true, addHideRowsCheckBoxes:true});
						addHeaderLimits();

						/* YYY checkboxall too dangerous with hidden rows */
						$("#checkallcheckbox").css("visibility", "hidden");	// too dangerous with hidden rows
	//					$("#checkallcheckbox").css("display", "none");	// too dangerous with hidden rows

						$("#browseNotes table").on('change', '.yui-dt-checkbox', function(event)
						{
							if(totalPrice == null)
								return;

							//YYY in chrome we're called before it gets checked
							var checkbox = $(event.target);

							var askingPriceCell = checkbox.closest('tr').find('td.asking_price');
							var askingPrice = askingPriceCell.text();
							askingPrice = text2Value(askingPrice);

							if(checkbox.prop('checked'))
								totalPrice += askingPrice;
							else
								totalPrice -= askingPrice;

							updateTotals();
						});
					});
			});
	}
	else if(href.match(/account\/loans.action/))	// LC - My Notes
	{
		$("div.master_wrapper").css("width", "90%");	// YYY on my system, there's a lot of ununsed whitespace on the left

		waitForElement("#lcloans table", ".yui-dt-data",
			function(notesTable)
			{
				findHeadersCheckCells(notesTable, colorCells, true,
					{addCommentColumn:true});
			});
	}
	else if(href.match(/foliofn\/loans.action/))	// Foliofn - Sell Notes
	{
		$("div#content-wrap").css("width", "90%");

		waitForElement("#lcloans table", ".yui-dt-data",
			function(notesTable)
			{
				findHeadersCheckCells(notesTable, colorCells, true,
					{addCommentColumn:true});
			});
	}
	else if(href.match(/browse.action|addToPortfolio.action/))	// LC - Browse Notes
	{
		waitForElement("div#browseNotes table", "tbody.yui-dt-data",
			function(notesTable, tbody)
			{
				/* YYY tweak the style (on my system the checkboxes get moved under the Filter box) */
				notesTable.css("margin-right", "-270px");

				findHeadersCheckCells(notesTable, null/*XXX is this right?*/, true,
					{addCommentColumn:true});

				/*YYY allow ctrl-click/shift-click to work on this table in chrome */
				tableCanChange(notesTable, "tbody.yui-dt-data", function(table, tbody)
				{
					tbody.find("a.expand-loan-details")
						.click(function(evt) 
//						.on('click', function(evt) 		// http://bugs.jquery.com/ticket/11485
						{
							var element = $(this);
							var href = $(element).prop('href');

							GM_log("evt=", evt);
							GM_log("element=", element);
							GM_log("href=", href);

							var loanId = href.match(/loan_id=(\d+)/)[1];

							if(evt.ctrlKey || evt.shiftKey)
							{
								evt.stopPropagation();
							}
						});
				});
			})
	}
	else if(href.match(/viewOrder.action/))	// LC - Browse Notes
	{
		waitForElement(".dataset-wrapper table", null,
			function(notesTable)
			{
				notesTable.css('float', 'none');	// comments push it off the left side

				/* YYY tweak the style (on my system the checkboxes get moved under the Filter box) */
				findHeadersCheckCells(notesTable, null/*colorCellsFunc*/, true,
					{addCommentColumn:true});
			});
	}
	else if(href.match(/placeOrder.action/))	// LC - Browse Notes
	{
		waitForElement("#all-loans-0", null,
			function(notesTable)
			{
//				$(".master_wrapper").css("width", "100%");
//				$("#master_content-mid").css("width", "100%");

				/* YYY tweak the style (on my system the checkboxes get moved under the Filter box) */
				findHeadersCheckCells(notesTable, null/*XXX is this right?*/, false,
					{addCommentColumn:true});
			});
	}
	else if(href.match(/file:\/\/.*\/tradingAccount.action/))	// saved My Account pages, must set fileIsGreaseable in about:config
	{
		GM_log("AAAAAAAAAAAA href=", href);

		var notes = scanForLoanPerfLinks($("body"), false);
		GM_log("notes.length=", notes.length);

		var notesByNoteId = {};
		for(var index = 0; index < notes.length; index++)
		{
			var note = notes[index];
			var noteId = note.noteId;
			if(noteId == null)
				continue;

			if(notesByNoteId[noteId] == null) notesByNoteId[noteId] = {};
			$.extend(notesByNoteId[noteId], note);	
		}

		var obj = {};
		obj.noteData = notesByNoteId;	// this is all regenerated isn't it?
		
		var objJSON = JSON.stringify(obj);
		DEBUG && GM_log("objJSON=", objJSON.length, " " + objJSON.substr(0, 1024) + "...");

		var ok = prompt("Scan LoanPerf links", objJSON);
	}
	else if(href.match(/tradingAccount.action|cancelSellOrder.action/))	// Foliofn My Account
	{
		GM_log("BBBBBBBBBBBB href=", href);

	var DEBUG = debug(true, arguments), FUNCNAME = funcname(arguments);
	timestamp(FUNCNAME, true)

		//XXX add Table of Contents/links to sections

		$('#content-wrap').css("width", "auto");	// YYY on my system, there's a lot of ununsed whitespace on the left

		var summarydiv =
			"<div style='text-align:right;'>" +
			"<label for=soldPendingTotalInput>Sold Pending: </label>" +
			"<input id=soldPendingTotalInput type=text readonly onclick='select();' />" +
			"<br>" +
			"<label for=purchasedPendingTotalInput>Purchased Pending: </label>" +
			"<input id=purchasedPendingTotalInput type=text readonly onclick='select();' />" +
			"<br>" +
			"<label for='availableCashInput'>Available Cash: </label>"+
			"<input id='availableCashInput' size='10' type=text readonly onclick='select();' />" +
			"<input id='availableCashRefresh' type='button' value='Refresh' />" +
			"</div>" +
			"";
		
		/* Table of Contents */
		var tocdiv =
			(function()
			{
				var tocHTML = [];

				/* WARNING: there are headers on the page we don't want so restrict to h3 */
				$("h3").each(function()
				{
					var element = $(this);

					var text = element.text();
					var id = element.attr('id');
					if(!id)	// some of them don't have ids
					{
						id = text.replace(/\s/g, '_');
						element.attr('id', id);
					}

					tocHTML.push("<li><a href='#" + id + "'>" + text + "</a></li>");
				});

				tocHTML =
					"<div class='lcac_toc'>" +
					"<ol>" +
					tocHTML.join('') +	// array to string, no separator
					"</ol>" +
					"</div>";

				return tocHTML;
			})();
		
		GM_addStyle("div.lcac_toc ol {line-height:1em !important;}");
		GM_addStyle("div.lcacdiv { position:fixed; background:#FFFFFF; z-index:100; top:50px; right:5px;}");
		GM_addStyle("div.lcacdiv fieldset {margin:0px 5px 5px 5px; padding:0px 5px 5px 5px; border:1px solid #2266AA;}");

		var lcacdiv = $(
			"<div class='lcacdiv'>" +
			"<fieldset>" +
			"<legend>LCAC</legend>" +

			tocdiv +
			summarydiv +

			"</fieldset>" +
			"</div>" +
			"");

		$(":header:contains('My Account')").after(lcacdiv);

		/*
		 * Add pending totals
		 */
		{
			function highlightPending(table, input)
			{
				var total = calcPending(table, 'lcac_pending');
				GM_log("total=", total);
						
				table.find(".tfoot td:last")
					.html(sprintf("Pending*: $%0.2f", total))
					.each(function(index, element)
					{
						if(total > 0)
							$(element).addClass("lcac_pending");
					});

				input.val(sprintf('$%0.2f', total));
				if(total > 0)
					input.addClass('lcac_pending');
			}

			/* Sold Pending Total */
			highlightPending($("#sold-orders"), $("#soldPendingTotalInput"));
			highlightPending($("#purchased-orders"), $("#purchasedPendingTotalInput"));
		}

		
		timestamp(FUNCNAME, "XXX 0.8");

		function moveFooterRowToFooter(notesTable)
		{
			var footerRows = notesTable.find("tbody tr.tfoot");

			if(footerRows.length > 0)
			{
				var footer = $("<tfoot>");
				notesTable.find("tbody").after(footer);
				footer.append(footerRows);
			}
		}

		/*
		 * Open Sell Orders 
		 */
		var notesTable1 = $("table#loans-1");
		var notesTable2 = $("table#sold-orders");
		var notesTable3 = $("table#purchased-orders");
		var notesTable4 = $("table#canceled-buy-orders");
		var notesTable5 = $("table#canceled-sell-orders");

		if(DETACHTABLES)
		{
		var notesTable1Placeholder = $("<div id='notesTable1Placeholder' />");
		notesTable1.after(notesTable1Placeholder);
		notesTable1.detach();
		
		var notesTable2Placeholder = $("<div id='notesTable2Placeholder' />");
		notesTable2.after(notesTable2Placeholder);
		notesTable2.detach();

		var notesTable3Placeholder = $("<div id='notesTable3Placeholder' />");
		notesTable3.after(notesTable3Placeholder);
		notesTable3.detach();
		
		var notesTable4Placeholder = $("<div id='notesTable4Placeholder' />");
		notesTable4.after(notesTable4Placeholder);
		notesTable4.detach();
		
		var notesTable5Placeholder = $("<div id='notesTable5Placeholder' />");
		notesTable5.after(notesTable5Placeholder);
		notesTable5.detach();
		}

		//OPTIMIZEME 5 seconds
		(function()
		{
			timestamp(FUNCNAME, "XXX 1.1");

			/*
			 * move last row into a footer
			 */
			moveFooterRowToFooter(notesTable1);

			notesTable1.find(
				"thead th:nth-child(7), tbody td:nth-child(7)," + // hide the Note Title column (too wide)
				"thead th:nth-child(3), tbody td:nth-child(3)" // hide the Payments Remaining column (useless)
				).addClass('hidecolumn');
			
			GM_addStyle(".hidecolumn { display:none; }");

			var trFoot = $(notesTable1).find(".tfoot");
			if(trFoot.length > 0)
			{
				/* subtract from the colspans to match the hidden columns */
				var tdFoot = getCellForColumn(trFoot, 7);
				var colspan = parseInt(tdFoot.prop("colspan"));
				tdFoot.prop("colspan", colspan - 1);

				var tdFoot = getCellForColumn(trFoot, 3);
				var colspan = parseInt(tdFoot.prop("colspan"));
				tdFoot.prop("colspan", colspan - 1);
			}

			//OPTIMIZEME
			findHeadersCheckCells(notesTable1, colorCellsPlusMarkup, false/*tableCanChange*/,
				{addCommentColumn:true, addLoanIdColumn:true, addInterestRateColumn:true, addMarkupColumn:true});
		
	//		$("table#loans-1").replaceWith(notesTable1);
		})();

		(function()
		{
			/* add the buttons and textboxes */
			notesTable1.find("th.accrued_interest").append(
				"<br><input type='button' id='byInterestInMonthsHighButton' />" +
				"<br><input type='button' id='byInterestInMonthsMedButton' />" +
				"<br><input type='button' id='byInterestInMonthsLowButton' />" +
				"<br><input type='button' id='byInterestInMonthsGraceButton' />" +
				""
			);

			if(TENDOLLARINTEREST)
			{
			notesTable1.find("th.storedRate").append(
				"<br><input type='button' id='tooMuchInterestEOYButton' />" +
				"<br><input type='button' id='tooMuchInterestButton' />" +
				""
			);
			}

			notesTable1.find("th.status").append(
				'<br><input type="button" id="defaultEtcButton" />' +
				'<br><input type="button" id="principalTooLowButton" />' +
				(TESTING ?
				'<br><input type="button" id="geolocationButton" />' +
				'<br><input type="button" id="ficoWayDownButton" />' +
				'<br><input type="button" id="bankruptButton" />' +
				"" : "") +
				""
			);

			notesTable1.find("th.markup").append(
				"<br><input type='text' id='foliofnMarkupHighLimitTextBox' size=5 />" +
				"<br><input type='button' id='markupHighButton' />" +
				"<br><input type='text' id='foliofnMarkupLowLimitTextBox' size=5 />" +
				"<br><input type='button' id='markupLowButton' />" +
				"<br><input type='button' id='markupFailsafeButton' />" +
				(TESTING ?
				"<br><input type='button' id='doublecheckMarkupButton' />" +
				"" : "") +
				""
			);

			notesTable1.find("th.expires").append(
				"<br><input type='button' id='orderExpiresButton' />"
			);

			notesTable1.find("th.storedRate").append(
				"<br><span id='storedRateUnknown' style='white-space:nowrap;'></nobr>"
			);

			DEBUG && timestamp(FUNCNAME, "XXX 1.6");
		})();

		function rankRows(notesTable)
		{
		var DEBUG = debug(false, arguments), FUNCNAME = funcname(arguments);
		timestamp(FUNCNAME, true);

			var notesTable0 = notesTable.get(0);

			// for the buttons later
			var checkboxes =
			{
				byMarkupHigh: [],
				byMarkupLow: [],
				markupFailsafe: [],
				tooMuchInterestEOY: [],
				tooMuchInterest: [],
				byInterestInMonthsHigh: [],
				byInterestInMonthsMed: [],
				byInterestInMonthsLow: [],
				byInterestInMonthsGrace: [],
				byUnknownInterestRate: [],
				orderExpires: [],
				doublecheckMarkup: [],
				geolocation: [],
				principalTooLow: [],
				ficoWayDown: [],
				bankruptDeceased: [],
				defaultEtc: [],
			};
						
			checkboxes.defaultEtc.default = 0;
			checkboxes.defaultEtc.chargedOff = 0;
			checkboxes.defaultEtc.fullyPaid = 0;

			/* YYY sorting with strings can be much much faster.
			 * did it stop working? or did it never work? */

			checkboxes.doublecheckMarkup.sortFunc =
			checkboxes.byMarkupHigh.sortFunc =
				function(a, b)
				{
					return a.markup - b.markup;
				};

			checkboxes.doublecheckMarkup.toStringFunc =
			checkboxes.byMarkupHigh.toStringFunc =
				function() 
				{
					return sprintf("%+010.2f", this.markup);
				};

			checkboxes.byMarkupHigh.reverseFlag = true;
			checkboxes.doublecheckMarkup.reverseFlag = true;
			checkboxes.byMarkupLow.sortFunc = 
				function(a, b) 
				{
					return a.markup - b.markup;
				};

			checkboxes.byMarkupLow.toStringFunc = 
				function() 
				{
					return sprintf("%+010.2f", this.markup);
				};

			checkboxes.orderExpires.sortFunc = 
				function(a, b) 
				{
					return a.daysLeft - b.daysLeft;
				};

			checkboxes.orderExpires.toStringFunc = 
				function() 
				{
					return sprintf("%+010d", this.daysLeft);
				};

			if(TENDOLLARINTEREST)
			{
			checkboxes.tooMuchInterestEOY.sortFunc =
			checkboxes.tooMuchInterest.sortFunc =
				function(a, b)
				{
					return a.markup - b.markup;
				};

			checkboxes.tooMuchInterestEOY.toStringFunc =
			checkboxes.tooMuchInterest.toStringFunc =
				function()
				{
					return sprintf("%+010.2f", this.markup);
				};

			checkboxes.tooMuchInterestEOY.reverseFlag =
			checkboxes.tooMuchInterest.reverseFlag = true;
			}

			checkboxes.byInterestInMonthsHigh.sortFunc =
			checkboxes.byInterestInMonthsMed.sortFunc =
			checkboxes.byInterestInMonthsLow.sortFunc = 
			checkboxes.byInterestInMonthsGrace.sortFunc = 
				function(a, b)
				{
					return a.markup - b.markup;
				};

			checkboxes.byInterestInMonthsHigh.toStringFunc =
			checkboxes.byInterestInMonthsMed.toStringFunc =
			checkboxes.byInterestInMonthsLow.toStringFunc = 
			checkboxes.byInterestInMonthsGrace.toStringFunc = 
				function() 
				{
					return sprintf("%+010.2f", this.markup);
				};


			var TODAY2 = TODAY();
			var daysLeftMin = null;
			var daysLeftMinCount = null;

			// rank the rows
			DEBUG && GM_log("rank the rows...");

			// OPTIMIZEME ~5 seconds
			var trs = 
				notesTable
					.find("tbody tr")	// tbody means not in the header (or footer)
						.not(".tfoot")	// double check to make sure we moved it to the footer
						.not(":contains(No Results Found)");

			GM_log(FUNCNAME + " trs=", trs);
			var interestAnomaly = [];
			trs.each(function()
			{
				var tr0 = this;
				var tr = $(this);
				
				var checkbox = tr.find("input:checkbox");

				var tds = tr.find("td");

				var loanStatus = tds.eq(notesTable0.loanStatusColumnIndex).text();

				/* can't re-submit these (but can cancel them) */
				function defaultEtc(loanStatus)
				{
					if(loanStatus.match(/Default/))
					{
						checkboxes.defaultEtc.default++;
						return true;
					}
					else if(loanStatus.match(/Charged\s*Off/))
					{
						checkboxes.defaultEtc.chargedOff++;
						return true;
					}
					else if(loanStatus.match(/Fully\s*Paid/))
					{
						checkboxes.defaultEtc.fullyPaid++;
						return true;
					}
					return false;
				}

				if(defaultEtc(loanStatus))
				{
					checkboxes.defaultEtc.push(checkbox);
					return; //continue;
				}
				
				/* Foliofn wierdness: compare accruedInterest to the saved value from notes */
				var noteId = tr.data('noteId');
				var accruedInterest2 = getStoredNote(noteId, "accrual");
				if(accruedInterest2 == null)
				{
					DEBUG && printStackTrace("noteId=" + noteId + " note=" + note);
					return;	// continue
				}

				var loanId = tr.data('loanId');

				var askingPrice = text2Value(tds.eq(notesTable0.askingPriceColumnIndex).text());
				var principalPlus = text2Value(tds.eq(notesTable0.principalPlusColumnIndex).text());

				var interestRate = getStoredInterestRateByLoanId(loanId); //WARNING: interestRate can be null here since we're using the stored rate

				var expiresString = tds.eq(notesTable0.orderExpiresColumnIndex).text();
				var expires = text2Date(tds.eq(notesTable0.orderExpiresColumnIndex).text());
				var daysLeft = Math.round((expires - TODAY2) / MILLISECONDSPERDAY);
				var markup = (askingPrice / principalPlus) - 1;
				var outstandingPrincipal = html2Value(tr0.cells[notesTable0.outstandingPrincipalColumnIndex].innerHTML);
				var accruedInterest = html2Value(tr0.cells[notesTable0.accruedInterestColumnIndex].innerHTML);
				var accruedInterestInMonths = calcInterestInMonths(outstandingPrincipal, interestRate, accruedInterest);
						
				//OPTIMIZE add these values to the checkboxes directly for sorting (is this even allowed?)
				$.extend(checkbox,
				{
					askingPrice: askingPrice,
					principalPlus: principalPlus,
					interestRate: interestRate,
					expires: expires,
					daysLeft: daysLeft,
					markup: markup,
					outstandingPrincipal: outstandingPrincipal,
					accruedInterest: accruedInterest,
					accruedInterestInMonths: accruedInterestInMonths,
				});

				var accruedInterestDiff = accruedInterest2 - accruedInterest;
				if(Math.abs(accruedInterestDiff) >= 0.01)
				{
					interestAnomaly.push({
						noteId: noteId,
						accruedInterest: accruedInterest,
						accruedInterest2: accruedInterest2,
						accruedInterestDiff: accruedInterestDiff,
					});
				}

				var used = false;

				if(interestRate == null || isNaN(interestRate))
					checkboxes.byUnknownInterestRate.push(checkbox);
				
				if(principalPlus < 1)
					checkboxes.principalTooLow.push(checkbox);
				
				// add fico500 and bankrupt
				var loan = getStoredLoan(loanId);
				if(loan)
				{
					if(loan.bankruptDeceased)
					{
						checkboxes.bankruptDeceased.push(checkbox);
						used = true;
					}
					else if(loan.fico < FICOWAYDOWN)
					{
						checkboxes.ficoWayDown.push(checkbox);
						used = true;
					}
					var GEOGRAPHIC = new RegExp("\b(NY|NJ)\b");
					if(loan.location && GEOGRAPHIC && GEOGRAPHIC.test(loan.location))
					{
						checkboxes.geolocation.push(checkbox);
						used = true;
					}
				}


				if(markup <= 0.01)
					checkboxes.markupFailsafe.push(checkbox);

				if(markup > headerLimits.foliofnMarkupHighLimit)
					checkboxes.byMarkupHigh.push(checkbox);

				if(markup <= 0.01
				&& (loanStatus.match(/Current/) || accruedInterestInMonths < 1.2))
					checkboxes.doublecheckMarkup.push(checkbox);

				if(accruedInterestInMonths >= lateMonths1)
				{
					checkboxes.byInterestInMonthsHigh.push(checkbox);
					used = true;
				}
				else if(accruedInterestInMonths >= lateMonths2)
				{
					checkboxes.byInterestInMonthsMed.push(checkbox);
					used = true;
				}
				else if(accruedInterestInMonths >= lateMonths3)
				{
					checkboxes.byInterestInMonthsLow.push(checkbox);
					used = true;
				}
				else if(accruedInterestInMonths >= lateMonths4)
				{
					checkboxes.byInterestInMonthsGrace.push(checkbox);
					used = true;
				}
		
				var remainingPaymentsExpected = 36;	//XXX this is not right
				var interest12mos = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(12, remainingPaymentsExpected));
				var interestEOY = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(remainingPaymentsEOY(), remainingPaymentsExpected));

				if(TENDOLLARINTEREST)
				{
				if(interestEOY >= 10.00)
				{
					checkboxes.tooMuchInterestEOY.push(checkbox);
					used = true;
				}
				else if(interest12mos >= 10.00)
				{
					checkboxes.tooMuchInterest.push(checkbox);
					used = true;
				}
				}

				if(!used && markup < headerLimits.foliofnMarkupLowLimit)
					checkboxes.byMarkupLow.push(checkbox);

				if(daysLeft < MAXEXPIRES)	// most are limited to 7 days automatically
				{
					if(daysLeftMin == null || daysLeft < daysLeftMin)
					{
						daysLeftMin = daysLeft;
						daysLeftMinCount = 1;
					}
					else if(daysLeft == daysLeftMin)
						daysLeftMinCount++;

					checkboxes.orderExpires.push(checkbox);
				}
			});

			if(interestAnomaly.length > 0)
			{
				var accruedInterestDiffMin = null;
				var indexMin = null;
				for(var index = 0; index < interestAnomaly.length; index++)
				{
					if(index == 0 || interestAnomaly[index].accruedInterestDiff < accruedInterestDiffMin)
					{
						indexMin = index;
						accruedInterestDiffMin = interestAnomaly[index].accruedInterestDiff;
					}
				}

				setTimeout(function()
				{
					alert(
						sprintf("Cached values out of date.%s Visit LC Account page to reload.",
							(TESTING && indexMin != null
							? sprintf(" %d notes, Max %f, Note Id %d.",
								interestAnomaly.length, interestAnomaly[indexMin].accruedInterestDiff, interestAnomaly[indexMin].noteId) 
							: "")
							));

//					var ok = confirm(
//						sprintf("Cached values out of date.%s Reload?",
//							(TESTING && indexMin != null
//							? sprintf(" %d notes, Max %f, Note Id %d.",
//								interestAnomaly.length, interestAnomaly[indexMin].accruedInterestDiff, interestAnomaly[indexMin].noteId) 
//							: "")
//							));
//
//					if(!ok)
//						return;
//
//					getOwnedNotesData();	// this will store our interest rates
				}, 5000);
			}

			/*
			 * sort the arrays
			 */
			for(var byWhateverName in checkboxes)
			{
				var byWhatever = checkboxes[byWhateverName];

				sortOptimizer(byWhatever, byWhatever.toStringFunc, byWhatever.sortFunc, byWhatever.reverseFlag)
			}
			
			checkboxes.daysLeftMin = daysLeftMin;
			checkboxes.daysLeftMinCount = daysLeftMinCount;

			timestamp(FUNCNAME, "returning");
			return checkboxes;
		}

		function updateButtons(checkboxes)
		{
			GM_log("updateButtons() notesTable1=", notesTable1);

			/* set the values */
			notesTable1.find("#foliofnMarkupHighLimitTextBox")
				.val(sprintf("%.1f%%",
					headerLimits.foliofnMarkupHighLimit * 100));

			notesTable1.find("#markupHighButton")
				.val(sprintf(">%.1f%%(%s)%s",
					headerLimits.foliofnMarkupHighLimit * 100,
					checkboxes.byMarkupHigh.length,
					tooManyRowsTickMark(checkboxes.byMarkupHigh.length)))
				.prop('disabled', checkboxes.byMarkupHigh.length == 0);

			notesTable1.find("#markupLowButton")
				.val(sprintf("<%.1f%%(%s)%s",
					headerLimits.foliofnMarkupLowLimit * 100,
					checkboxes.byMarkupLow.length,
					tooManyRowsTickMark(checkboxes.byMarkupLow.length)))
				.prop('disabled', checkboxes.byMarkupLow.length == 0);

			notesTable1.find("#doublecheckMarkupButton")
				.val(sprintf("<1%%+cur(%s)%s",
					checkboxes.doublecheckMarkup.length,
					tooManyRowsTickMark(checkboxes.doublecheckMarkup.length)))
				.prop('disabled', checkboxes.doublecheckMarkup.length == 0);

			notesTable1.find("#markupFailsafeButton")
				.val(sprintf("<1%%(%s)%s",
					checkboxes.markupFailsafe.length,
					tooManyRowsTickMark(checkboxes.markupFailsafe.length)))
				.prop('attr', checkboxes.markupFailsafe.length == 0);

			notesTable1.find("#byInterestInMonthsHighButton")
				.val(sprintf(">%.1fm(%s)%s",
					lateMonths1,
					checkboxes.byInterestInMonthsHigh.length,
					tooManyRowsTickMark(checkboxes.byInterestInMonthsHigh.length)))
				.prop('disabled', checkboxes.byInterestInMonthsHigh.length == 0);

			notesTable1.find("#byInterestInMonthsMedButton")
				.val(sprintf(">%.1fm(%s)%s",
					lateMonths2,
					checkboxes.byInterestInMonthsMed.length,
					tooManyRowsTickMark(checkboxes.byInterestInMonthsMed.length)))
				.prop('disabled', checkboxes.byInterestInMonthsMed.length == 0);

			notesTable1.find("#byInterestInMonthsLowButton")
				.val(sprintf(">%.1fm(%s)%s",
					lateMonths3,
					checkboxes.byInterestInMonthsLow.length,
					tooManyRowsTickMark(checkboxes.byInterestInMonthsLow.length)))
				.prop('disabled', checkboxes.byInterestInMonthsLow.length == 0);

			notesTable1.find("#byInterestInMonthsGraceButton")
				.val(sprintf(">%.1fm(%s)%s",
					lateMonths4,
					checkboxes.byInterestInMonthsGrace.length,
					tooManyRowsTickMark(checkboxes.byInterestInMonthsGrace.length)))
				.prop('disabled', checkboxes.byInterestInMonthsGrace.length == 0);

			notesTable1.find("#foliofnMarkupLowLimitTextBox")
				.val(sprintf("%.1f%%", headerLimits.foliofnMarkupLowLimit * 100));

			notesTable1.find("#geolocationButton")
				.val(sprintf("Geographic(%d)%s",
					checkboxes.geolocation.length,
					tooManyRowsTickMark(checkboxes.geolocation.length)))
				.prop("disabled", checkboxes.geolocation.length == 0);

			notesTable1.find("#defaultEtcButton")
				.val(sprintf("Def.(%d)/C.O(%d)/F.P(%d)",
					checkboxes.defaultEtc.default,
					checkboxes.defaultEtc.chargedOff,
					checkboxes.defaultEtc.fullyPaid,
					tooManyRowsTickMark(checkboxes.defaultEtc.length)))
				.prop("disabled", checkboxes.defaultEtc.length == 0);

			notesTable1.find("#principalTooLowButton")
				.val(sprintf("principal low(%d)%s",
					checkboxes.principalTooLow.length,
					tooManyRowsTickMark(checkboxes.principalTooLow.length)))
				.prop("disabled", checkboxes.principalTooLow.length == 0);

			notesTable1.find("#ficoWayDownButton")
				.val(sprintf("ficoWayDown(%d)%s",
					checkboxes.ficoWayDown.length,
					tooManyRowsTickMark(checkboxes.ficoWayDown.length)))
				.prop("disabled", checkboxes.ficoWayDown.length == 0);

			notesTable1.find("#bankruptButton")
				.val(sprintf("bankrupt, etc.(%d)%s",
					checkboxes.bankruptDeceased.length,
					tooManyRowsTickMark(checkboxes.bankruptDeceased.length)))
				.prop("disabled", checkboxes.bankruptDeceased.length == 0);

			if(TENDOLLARINTEREST)
			{
			notesTable1.find("#tooMuchInterestEOYButton")
				.val(sprintf(">$10/EOY(%d)%s",
					checkboxes.tooMuchInterestEOY.length,
					tooManyRowsTickMark(checkboxes.tooMuchInterestEOY.length)))
				.prop("disabled", checkboxes.tooMuchInterestEOY.length == 0);

			notesTable1.find("#tooMuchInterestButton")
				.val(sprintf(">$10/12m(%d)%s",
					checkboxes.tooMuchInterest.length,
					tooManyRowsTickMark(checkboxes.tooMuchInterest.length)))
				.prop("disabled", checkboxes.tooMuchInterest.length == 0);
			}

			var daysLeftMin = checkboxes.daysLeftMin;
			var daysLeftMinCount = checkboxes.daysLeftMinCount;
			notesTable1.find("#orderExpiresButton")
				.val(
					sprintf("T-%s(%s/%s)%s",
	//				sprintf("T-%s(%s)%s",
						daysLeftMin == null ? '--' : daysLeftMin,
						daysLeftMin == null ? '--' : daysLeftMinCount,
						checkboxes.orderExpires.length,
						tooManyRowsTickMark(checkboxes.orderExpires.length)))
				.prop('disabled', daysLeftMin == null);

			notesTable1.find('#storedRateUnknown')
				.text(sprintf("(%d Unknown)", checkboxes.byUnknownInterestRate.length));
		}

		function checkCheckboxes(checkboxes)
		{
		var DEBUG = debug(true, checkboxes);

			/* YYY server submit times out if too many */
			if(CHECKBOXLIMIT > 0)
				checkboxes = checkboxes.slice(0, CHECKBOXLIMIT);

			$(checkboxes)	// this is an array of jquery sets
				.map(function () {return this.toArray(); })	// turn it into a single jquery set
					.prop('checked', true);

			window.status = checkboxes.length + ' boxes checked';
		}
			
		var checkboxes;	// this is used later down when the buttons are clicked
		function recalcCheckboxes()
		{
		var DEBUG = debug(true, arguments);

			checkboxes = rankRows(notesTable1);
			
			updateButtons(checkboxes);	// this is pretty fast
		}

		recalcCheckboxes();	// initialize it
		
		/* find the buttons and checkboxes */
		notesTable1.find("#foliofnMarkupHighLimitTextBox")
			.on('change',
				function()
				{
					foliofnMarkupHighLimitChanged(this);
					recalcCheckboxes();	// update it
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						foliofnMarkupHighLimitChanged(this);
						event.preventDefault();	// don't try to submit the form
						recalcCheckboxes();
					}
				});

		notesTable1.find("#foliofnMarkupLowLimitTextBox")
			.on('change',
				function()
				{
					foliofnMarkupLowLimitChanged(this);
					recalcCheckboxes();
				})
			.on('keypress',
				function(event)
				{
					if(event.keyCode == 13 /*ENTER*/)
					{
						foliofnMarkupLowLimitChanged(this);
						event.preventDefault();	// don't try to submit the form
						recalcCheckboxes();
					}
				});



		notesTable1.find("#markupHighButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byMarkupHigh);});

		notesTable1.find("#markupLowButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byMarkupLow);});

		notesTable1.find("#doublecheckMarkupButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.doublecheckMarkup);});


		notesTable1.find("#markupFailsafeButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.markupFailsafe);});

		notesTable1.find("#byInterestInMonthsHighButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byInterestInMonthsHigh);});

		notesTable1.find("#byInterestInMonthsMedButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byInterestInMonthsMed);});

		notesTable1.find("#byInterestInMonthsLowButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byInterestInMonthsLow);});

		notesTable1.find("#byInterestInMonthsGraceButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.byInterestInMonthsGrace);});

		notesTable1.find("#defaultEtcButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.defaultEtc);});

		notesTable1.find("#geolocationButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.geolocation);});

		notesTable1.find("#principalTooLowButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.principalTooLow);});

		notesTable1.find("#ficoWayDownButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.ficoWayDown);});

		notesTable1.find("#bankruptButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.bankruptDeceased);});

		notesTable1.find("#tooMuchInterestEOYButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.tooMuchInterestEOY);});

		notesTable1.find("#tooMuchInterestButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.tooMuchInterest);});

		notesTable1.find("#orderExpiresButton")
			.on('click',
				function(){checkCheckboxes(checkboxes.orderExpires)});

		DEBUG && timestamp(FUNCNAME, "XXX 1.9");



		/*
		 * Sold this month
		 */
		queueTimeoutNull(function()
		{
			moveFooterRowToFooter(notesTable2);
			
			findHeadersCheckCells(notesTable2, colorCellsSimple, false,
				{addCommentColumn:true, addLoanIdColumn:true});

			if(TESTING)
			{
				var emptyAs = notesTable2.find("a:empty");	// 2012-11-04 problem with the data
				GM_log("emptyAs=", emptyAs);
				emptyAs.append("placeholder*");
			}


			var notesTable0 = notesTable2.get(0);

			var trs = notesTable2.find("tbody tr");

			var clickCount = 0;	// all the rows share this variable?

			/* add the sale price copy buttons */
			trs.each(
				function(index, tr)
				{
					var tr = $(tr);	// element is DOM element

					var salePriceCell = tr.find("td").eq(notesTable0.salePriceColumnIndex);
					var salePrice = salePriceCell.text();
					
					var loanId = tr.data('loanId');
					var loanStatusCell = tr.find("td").eq(notesTable0.loanStatusColumnIndex);
			
					var a = loanStatusCell.find('a');	// find the elment that has the string (could be us or a div)
					
					var url = a.prop('href');

//					if(TESTING)
//					{
//					/* add price to href link to note */
//					a.prop('href', url + sprintf("&sale_price=%0.2f", text2Value(salePrice)));
//					}

					if(COPYVALUEBUTTONS)
					{
						var commentCell = tr.find("td").eq(notesTable0.commentColumnIndex);
						
						commentCell.prepend(
							sprintf("<input id='salePriceButton' type='button' style='width:5em' value='%s'/>",
								salePrice));

						var commentTextBox = commentCell.find(".commentTextBox");
						var salePriceButton = commentCell.find("#salePriceButton");

						salePriceButton.on('click', function(eventObject)
						{
							(function() {
								var placeholder = sprintf("XX%dXX", ++clickCount);
								var commentOrig = commentTextBox.val();

								var comment = sprintf("%s@%s %s", placeholder, salePrice, commentOrig); // Note: salePrice already has dollar sign

								comment = $.trim(comment);

								commentTextBox.val(comment);
								commentTextBox.trigger('change');	// fire the event to notify the listeners

								$.get(url, function(responseText)
								{
									if(responseText.match(/Member Sign-In/))		// we've been logged out
									{
										alert("Not logged in");
										commentTextBox.val(commentOrig);	// reset it
										commentTextBox.trigger('change');	// fire the event to notify the listeners
										return;
									}

									var outstandingPrincipal = parseFloat2($("th:contains(Outstanding Principal) + td", responseText).text());

									var comment = commentTextBox.val();	// this could have changed if user clicks multiple, so load it again

									/* add principal@price */
									comment = comment.replace(
										new RegExp(placeholder),
										sprintf("$%0.2f", outstandingPrincipal));

									commentTextBox.val(comment);
									commentTextBox.trigger('change');	// fire the event to notify the listeners
								})
								.error(function(jqXHR, textStatus, errorThrown) 
								{
									alert("textStatus=" + textStatus + " errorThrown=" + errorThrown);

									commentTextBox.val(commentOrig);	// reset it
									commentTextBox.trigger('change');	// fire the event to notify the listeners
								});
							})();
						});
					}
				});

		});


		/*
		 * Purchased this month
		 */
		queueTimeoutNull(function()
		{
			moveFooterRowToFooter(notesTable3);

			findHeadersCheckCells(notesTable3, colorCellsSimple, false,
				{addCommentColumn:true, addLoanIdColumn:true});
			
		});


		/*
		 * Canceled Buy Orders
		 */
		queueTimeoutNull(function()
		{
			moveFooterRowToFooter(notesTable4);

			findHeadersCheckCells(notesTable4, colorCellsSimple, false,
				{addCommentColumn:true, addLoanIdColumn:true});
			
		});


		/*
		 * Canceled Sell Orders
		 */
		queueTimeoutNull(function()
		{
			moveFooterRowToFooter(notesTable5);

			notesTable5.find("tbody").find("td:contains(Expired), td:contains(Canceled by User)").closest("tr")
	//			.addClass("lcac_expired")	// hide the row?
				.remove()	// or delete the row?
				
				;
			notesTable5
				.find("tfoot td")	
					.filter(function(){return /Note\(s\)/.test($(this).text());})	//YYY can contains() do embedded parentheses?
						.append(sprintf(" (%s visible)", notesTable5.find("tbody tr").length));

			findHeadersCheckCells(notesTable5, colorCellsSimple, false,
				{addCommentColumn:true, addLoanIdColumn:true});
			
		});
		
		if(DETACHTABLES)
		queueTimeoutNull(function()
		{
			notesTable5Placeholder.after(notesTable5);
			notesTable5Placeholder.remove();
			
			notesTable4Placeholder.after(notesTable4);
			notesTable4Placeholder.remove();

			notesTable3Placeholder.after(notesTable3);
			notesTable3Placeholder.remove();

			notesTable2Placeholder.after(notesTable2);
			notesTable2Placeholder.remove();

			notesTable1Placeholder.after(notesTable1);
			notesTable1Placeholder.remove();
		});
		
		queueTimeoutNull(function()
		{
		var DEBUG = debug(false, arguments);

			/*
			 * Add a link to this months (partial) statement
			 */
	//		var li = $(":header:contains('Statements from Previous Months') + ul li:last");	// this months link
			var li = $("a[href*='traderStatement.action']:last").parent("li"); // last year's link
			DEBUG && GM_log("li=", li);
			if(li == null || li.length == 0)	// could this be empty e.g. for new users?
				return;

			/* get the year of the last one */
			var html = li.html();
			DEBUG && GM_log("4 html=", html);

			var matches = html.match(/start_date_trader_statements=(\d+)\/\d+\/(\d+)\b/);	//XXX why isn't the year matching all 4 digits?
			DEBUG && GM_log("matches=", matches);

			var month = matches[1];
			var year = matches[2];
			
			DEBUG && GM_log("month=", month, " year=", year);

			if(++month > 12)
			{
				month = 1;
				year++;
			}
			
			DEBUG && GM_log("month=", month, " year=", year);

			var monthNames = [ null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

			/* YYY the s_objectID tracking stuff replicates the href, so use g */
			html = html.replace(/(start_date_trader_statements=)\d+(\/\d+\/)\d+/g, sprintf("$1%02d$2%d", month, year));
			DEBUG && GM_log("5 html=", html);

			html = html.replace(/(- )\w+( )\d+/, sprintf("$1%s$2%d*", monthNames[month], year));
			DEBUG && GM_log("6 html=", html);

			var li2 = li.clone();
			li2.html(html);

			li.after(li2);

			/*
			 * Add a link to this years (partial) summary
			 */
	//		var li = $(":header:contains('Year End Summary') + ul li:last"); // last year's link
			var li = $("a[href*='yrEndTraderStatement.action']:last").parent("li"); // last year's link
			DEBUG && GM_log("li=", li);
			if(li == null || li.length == 0)	// could this be empty e.g. for new users?
				return;

			/* get the year of the last one */
			var text = li.text();
			DEBUG && GM_log("text=", text);

			var year = text.match(/Notes Sold in (\d+)/)[1];
			DEBUG && GM_log("year=", year);

			var yearPlus1 = '' + (parseInt(year) + 1);	// set for the next year

			DEBUG && GM_log("yearPlus1=", yearPlus1);

			var html =
				li.html()
					.replace(RegExp(year, 'g'), yearPlus1)	// replace the year
					.replace(/(Notes Sold in \d+)/, "$1*")	// tack on asterix on at the end
					;

			DEBUG && GM_log("html=", html);

			var li2 = li.clone();
			li2.html(html);

			li.after(li2);
		});
		
		
		if(TABLESORTER)
		{
			$.tablesorter.addParser({
				id: 'lcac_date',	// set a unique id
				is: function(s) {
					return false;	// return false so this parser is not auto detected
				},
				format: function(s) {
					return s.replace(/N\/A/, "99/99/99");	// replace N/A with a max value
				},
				type: 'text',	// set type, either numeric or text
			});

			if(TABLESORTER3)
			notesTable1.tablesorter({
//				delayInit: true,	// can't do this with a default sort
				cancelSelection: false,
//				sortList: [[1,0], [2,0]],
				headers:
				{
//					0: { sorter: 'checkboxes' },
					0: { sorter: false, },	// checkbox
					10: { sorter: false, },	// conflicts with button clicks
					11: { sorter: false, },	// conflicts with button clicks
					12: { sorter: false, },	// conflicts with button clicks
					13: { sorter: false, },	// conflicts with button clicks
					14: { sorter: false, },	// conflicts with button clicks
					15: { sorter: false, },	// comment
				},
				// tablesorter caches the element values?
//				textExtraction: function(node, table, cellIndex)
//				{
//					if(cellIndex == 0)
//					{
//						DEBUG && GM_log("textExtraction() node=%o table=%o cellIndex=" + cellIndex, node, table);
//						var checkbox = $(node).find("input:checkbox");
//						var checked = checkbox.prop("checked");
//						return checked ? "1" : "0";
//					}
//		
//					return  $(node).text();
//				},
			});

			notesTable2.tablesorter({
	//			delayInit: true,	// can't do this with a default sort
				sortList: 
				[
					[notesTable2.find("thead th:contains('Date')").index(), 1],
					[notesTable2.find("thead th:contains('Trade ID')").index(), 0],
				],
				headers: { 1: { sorter:'lcac_date' } },
				widgets: ['zebra']
			});

			notesTable3.tablesorter({
	//			delayInit: true,	// can't do this with a default sort
				sortList: 
				[
					[notesTable3.find("thead th:contains('Date')").index(), 1],	/* Date, desc */
	//				[2,0],
	//				[0,0],
				],
				headers: { 1: { sorter:'lcac_date' } },
				widgets: ['zebra']
			});

			queueTimeout(function()
			{
			if(TABLESORTER2)
			notesTable4.tablesorter(
				TABLESORTER2DELAYINIT
				? {
					delayInit: true,	// can't do this with a default sort
					headers: { 0: { sorter:'lcac_date' } },
					widgets: ['zebra']
				}
				: {
					sortList: 
					[
						[notesTable4.find("thead th:contains('Date')").index(), 1],	/* Date, desc */
		//				[1, 0],
					],
					headers: { 0: { sorter:'lcac_date' } },
					widgets: ['zebra']
				}
			);

			if(TABLESORTER2)
			notesTable5.tablesorter(
				TABLESORTER2DELAYINIT
				? {
					delayInit: true,	// can't do this with a default sort
					headers: { 0: { sorter:'lcac_date' } },
					widgets: ['zebra']
				}
				: {
					sortList:
					[
						/* XXX just one of these can take a LOOONG time, e.g. 13 seconds with 1458 rows */
						[notesTable5.find("thead th:contains('Date')").index(), 1],	/* Date, desc */
			//			[notesTable5.find("thead th").index(":contains('Order Status')"), 0/*asc*/],
			//			[notesTable5.find("thead th").index(":contains('Note ID')"), 0/*asc*/],
					],
					headers: { 0: { sorter:'lcac_date' } },
					widgets: ['zebra']
				}
			);
			});
		}

		function updateAvailableCash1()
		{
			$("#availableCashInput").val('...');

			getAvailableCash(function(availableCash)
			{
			var DEBUG = debug(true, arguments);

				$("#availableCashInput")
					.removeClass("lcac_greenLow")
					.removeClass("lcac_redLow");

				if(availableCash == null)
				{
					$("#availableCashInput").val('Error');
					$("#availableCashInput").addClass("lcac_redLow");
				}
				else
				{
					$("#availableCashInput").val(sprintf('$%0.2f', availableCash));
					if(availableCash > 0)
						$("#availableCashInput").addClass("lcac_greenLow");
				}
			});
		}

		updateAvailableCash1();	
				
		$("#availableCashRefresh").on('click', function()
		{
			updateAvailableCash1();	// this was calling the wrong updateAvailableCash()... because it was in a floating div?
		});


		queueTimeout(function()
		{
			queueTimeout(function()
			{
				timestamp(FUNCNAME, "XXX 9.9");
			});
		});
		
		timestamp(FUNCNAME, "XXX 0.9");
	}
	else if(href.match(/purchaseSuccess.action/))	// after buying
	{
		if(TRADINGINVETORYPARAMS)
		{
			var search = localStorage.getItem("tradingInventory.action.search");	// we'll use this later
			GM_log("search=", search);

			if(search)
				$("a[href$='/tradingInventory.action']").each(function()
				{
					var element = $(this);
					GM_log("element=", element);
					element.prop("href", element.prop("href") + search);
				});

			if(AUTOFOLLOWLINK)
			followLink('Buy');
		}
	}
	else if(href.match(/selectNotesToReprice|selectLoansForSale|submitCompleteLoanPurchase|completeLoanPurchase|repriceSelectedNotes.action|confirmLoansForSale|saleSuccess.action/))
	{
		if($("td:contains(No Results Found)").length > 0)
		{
			GM_log("No Results Found, returning");
			return;
		}

		if($(":contains(Order Price Changes Submitted)").length > 0	// repriceSelectedNotes.action
		|| $(":contains(Notes Made Available for Sale)").length > 0)	// saleSuccess.action
		{
			// SUCCESS!
			if(AUTOFOLLOWLINK)
			followLink('your account');

			return;
		}

		if($(":contains(Change Price of Notes for Sale)").length > 0	// repriceSelectedNotes.action
		|| $(":contains(Submit Notes for Sale)").length > 0)	// selectLoansForSale.action, confirmLoansForSale.action (on error)
		{
			// there were some bad prices?
		}
		
		if($(":contains(Complete Note Purchase)").length > 0)	//XXX :contains(Complete Note Purchase) + submitCompleteLoanPurchase.action = completeLoanPurchase.action
		{
			/*
			 * XXX add price to href link to note (like we do in browse notes)
			 */
		}

		if(TRADINGINVETORYPARAMS)
		{
			var search = localStorage.getItem("tradingInventory.action.search");	// we'll use this later
			GM_log("search=", search);

			if(search)
				$("a[href$='/tradingInventory.action']").each(function()
				{
					var element = $(this);
					element.prop("href", element.prop("href") + search);
				});
		}

		/* XXX sometimes submitCompleteLoanPurchase is actually "Browse Notes" page (e.g. if to-purchase notes were unavailable). How should we handle that case? Redirect to Browse Notes link? */

		$('#content-wrap').width('auto');	// YYY on my system, there's a lot of ununsed whitespace on the left

		/* completeLoanPurchase, submitCompleteLoanPurchase comes back on error */

		var addLoanIdColumn = href.match(/selectNotesToReprice|selectLoansForSale/) != null;
		var addInterestRateColumn = href.match(/completeLoanPurchase|submitCompleteLoanPurchase/) == null;
		var addDeleteRowButton = href.match(/completeLoanPurchase|submitCompleteLoanPurchase/) != null;

		var notesTable = $("table#loans-1");	//verified for selectNotesToReprice, completeLoanPurchase
		var notesTable0 = notesTable.get(0);

		/* YYY tweak HTML nonbreaking between dollar-sign and textbox
		 * WARNING indiscriminate modification of HTML can break listeners
		 */
		GM_addStyle("td.price { white-space:nowrap; }");

		/* "This security is no longer listed" */
		$(".empty-middle").each(function()
		{
			var element = $(this);
			element.prop('colspan', element.prop('colspan') + 1);
		});


		findHeadersCheckCells(notesTable, colorCellsPlusMarkup, false,
			{addCommentColumn:true, addLoanIdColumn:addLoanIdColumn, addInterestRateColumn:addInterestRateColumn, addMarkupColumn:true, addDeleteRowButton: addDeleteRowButton});


		var trs = notesTable.find("tbody tr").not(".tfoot");

		/*
		 * YYY programmatic changes to the asking price don't trigger events so we use a
		 * click handler for the whole table to update the markups
		 */
		$("#master-copy-price").click(
			function(event)
			{
				GM_log("master-copy-price$click()...")

				/* set a timeout to make sure they've updated the field first */
				setTimeout(function()
				{
				updateMarkupAll(notesTable0, trs);
				});
			});

		$(".copy-asking-price-value-over").click(
			function(event)
			{
				GM_log("copy-asking-price-value-over$click()... event=%o", event)

				/* just update a single row */
				var element = event.currentTarget;
				var tr = $(element).closest('tr');
				/* set a timeout to make sure they've updated the field first */
				setTimeout(function()
				{
				updateMarkup(notesTable0, tr);
				});
			});

		//XXX get rid of this and handle it back in the elements
		notesTable.click(
			function(event)
			{
				GM_log("notesTable$click()...");

				updateMarkupAll(notesTable0, trs);
			});

		trs.each(function()
		{
			var tr = $(this);	// element is DOM element

			var askingPriceInputField = tr.find("input.asking-price");

			if(!askingPriceInputField)	// sometimes it comes back "This security is no longer listed" on submitCompleteLoanPurchase
				return;


	// the click handler on the table does this now
			askingPriceInputField
				.on('change',
					function()
					{
						GM_log("askingPriceInputField$change()... tr=", tr);
						updateMarkup(notesTable0, tr);
					})
				.on('keyup',
					function()
					{
						GM_log("askingPriceInputField$keyup()... tr=", tr);
						updateMarkup(notesTable0, tr);
					})
				.on('keypress',
					function(event)
					{
						if(event.keyCode == 13 /*ENTER*/)
							event.preventDefault();	// don't try to submit the form
					});
		});

		/*
		 * add % adjustment buttons to price Asking Price column
		 */
		var askingPriceHeader = notesTable.find("th.price");
		if(askingPriceHeader)
		{
			function adjustAskingPrice(multiplier)
			{
				var trs = notesTable.find("tbody tr").not(".tfoot");

				trs.each(function()
				{
					var tr = $(this);	// element is DOM element

					var askingPriceInputField = tr.find("input.asking-price");

					var value = parseFloat(askingPriceInputField.val());

					var newValue = value * multiplier;
					newValue = round2Decimals(newValue);

					// values less than 0.50 will never change using +% or -% buttons, so minimum 1 cent change
					if(newValue == value)
						newValue += (multiplier > 1.0 ? 0.01 : -0.01);

					askingPriceInputField.val(sprintf("%0.2f", newValue));

	// the click handler on the table does this now
	//				updateMarkup(tr);
				});
			}

			function adjustAskingPriceAuto()
			{
				if(!checkWARNINGACCEPTED())
					return;

				if(adjustAskingPriceAutoFunc == null)
				{
					alert("Adjust Asking Price Auto function is unset");
					return;
				}

				try
				{
					var trs = notesTable.find("tbody tr").not(".tfoot");

					var notesTable0 = notesTable.get(0);

					var loanIdCountArray = Array();
					var interestAnomaly = [];
					trs.each(function()
					{
						var tr = $(this);

						// WARNING!!! buttons can be are inputs too!!! hidden order_id and loan_id are inputs on these rows, too

						var askingPriceInputField = tr.find("input.asking-price");

						var tds = tr.find("td");

						// WARNING: remainingPayments is NOT accurate for loans that aren't paid exactly on schedule
						var loanId = getLoanId(tr, notesTable0.loanIdColumnIndex, notesTable0.loanIdEmbeddedColumnIndex);
						var interestRate = getStoredInterestRateByLoanId(loanId);
						var principalPlus = text2Value(tds.eq(notesTable0.principalPlusColumnIndex).text());
						var remainingPayments = text2Value(tds.eq(notesTable0.remainingPaymentsColumnIndex).text());
						var loanStatus = tds.eq(notesTable0.loanStatusColumnIndex).text();
						var outstandingPrincipal = text2Value(tds.eq(notesTable0.outstandingPrincipalColumnIndex).text());
						var accruedInterest = text2Value(tds.eq(notesTable0.accruedInterestColumnIndex).text());
						var accruedInterestInMonths = calcInterestInMonths(outstandingPrincipal, interestRate, accruedInterest);
						var loan = getStoredLoan(loanId);

						var noteId = tr.data('noteId');
						var note = getStoredNote(noteId);
						if(note == null)
						{
							printStackTrace("noteId=" + noteId + " note=" + note);
							return;	// continue
						}

						var accruedInterest2 = note.accrual;
						var accruedInterestDiff = accruedInterest2 - accruedInterest;

						if(Math.abs(accruedInterestDiff) >= 0.01)
						{
							interestAnomaly.push({
								noteId: noteId,
								accruedInterest: accruedInterest,
								accruedInterest2: accruedInterest2,
								accruedInterestDiff: accruedInterestDiff,
							});
						}

						var newValue = null;
						if(loanStatus == 'Fully Paid')
						{
							newValue = 0;	// the price submit function interprets 0 as ignore
						}
						else
						{
							var loanIdCount;
							if(loanIdCountArray[loanId] == null)
								loanIdCount = loanIdCountArray[loanId] = 0;
							else
								loanIdCount = ++loanIdCountArray[loanId];

							if(TENDOLLARINTEREST)
							{
							var remainingPaymentsExpected = remainingPayments;	//XXX this is not right

							var interest12mos = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(12, remainingPaymentsExpected));
							var interestEOY = -1 * CUMIPMT(interestRate / 12, remainingPaymentsExpected, outstandingPrincipal, 1, Math.min(remainingPaymentsEOY(), remainingPaymentsExpected));

							var tooMuchInterestPer12Months = interest12mos >= 10.00;
							var tooMuchInterestThisYear = interestEOY >= 10.00;
							}

							newValue =
//								DEBUGcall(adjustAskingPriceAutoFunc,
								adjustAskingPriceAutoFunc(
									index, loanId, loanIdCount,
									interestRate, principalPlus, loanStatus, outstandingPrincipal,
									accruedInterest, accruedInterestInMonths,
									headerLimits.foliofnMarkupHighLimit, headerLimits.foliofnMarkupLowLimit,
									tooMuchInterestThisYear, tooMuchInterestPer12Months,
									!!loan.bankruptDeceased, 	// booleanify	falsey => true => false
									loan.fico, loan.fico < FICOWAYDOWN, 
									!!loan.ficoDrop,	// booleanify	falsey => true => false
									loan.location ? loan.location : "",	// emptystringify
									note ? note.amountLent : null, note ? note.paymentReceived : null
								);
						}

						/* if they return a negative number, don't change the value
						 * YYY some Fully Paid notes sneaking in, however a "0" appears to just make it ignore that note
						 */
						if(newValue >= 0)
							askingPriceInputField.val(sprintf("%0.2f", newValue));

						/* YYY we have click handler on the entire table */
	//						updateMarkup(tr);
					});

					if(TESTING)
					if(interestAnomaly.length > 0)
					{
						interestAnomaly.sort(function(a, b)
						{
							return a.accruedInterestDiff - b.accruedInterestDiff;
						});

						GM_log("interestAnomaly=", interestAnomaly);

						setTimeout(function()
						{
							alert(
								sprintf("%d Accrued Interest Anomalies! Max %f, Note Id %d",
									interestAnomaly.length,
									interestAnomaly[0].accruedInterestDiff,
									interestAnomaly[0].noteId));
						}, 1);
					}
				}
				catch(ex)
				{
					GM_log("adjustAskingPriceAuto() ex=%o", ex);
					alert(ex);
				}

				/* YYY we have click handler on the entire table */
	//			updateMarkupAll(notesTable0, trs);
			};

			askingPriceHeader.append(
				'<br>' +
				'<input type="button" id="adjustAskingPriceAutoButton" value="Auto" />' +
				'<input type="button" id="editAskingPriceAutoButton" value="Edit" />' +
				'<br>' +
				'<nobr>' +
				'<input type="button" id="adjustAskingPriceDownButton" value="-1%" />' +
				'<input type="button" id="adjustAskingPriceUpButton" value="+1%" />' +
				'<br>' +
				'<input type="button" id="adjustAskingPriceDown2Button" value="-.1%" />' +
				'<input type="button" id="adjustAskingPriceUp2Button" value="+.1%" />' +
				'</nobr>' +
				'');

			$("#editAskingPriceAutoButton").on('click', function(){editAskingPriceAuto();});
			$("#adjustAskingPriceAutoButton").on('click', function(){adjustAskingPriceAuto();});

			$("#adjustAskingPriceDownButton").on('click', function(){adjustAskingPrice(0.99);});
			$("#adjustAskingPriceUpButton").on('click', function(){adjustAskingPrice(1.01);});

			$("#adjustAskingPriceDown2Button").on('click', function(){adjustAskingPrice(0.999);});
			$("#adjustAskingPriceUp2Button").on('click', function(){adjustAskingPrice(1.001);});
		}
	}
	else if(href.match(/traderStatement/))	// Foliofn Statements
	{
		if($("p:contains(There was no activity during this period)").length > 0)
		{
			GM_log("no activity");
			return;
		}

		waitForElement(".yui-pg-rpp-options", null,
			function(selects)
			{
				setSelectValue(selects, '10000'); // this is the value for "All"

		waitForElement("div#lender-activity-div table", "tbody.yui-dt-data",
			function(table, tbody)
			{
				tableCanChange(table, "tbody.yui-dt-data", function(table, tbody)
				{
				var DEBUG = debug(false, arguments);

	/* e.g.
	<td id="yui-gen633" class="descriptions"> Sell Note:6531226 </td>
	*/
					tbody.find("td.descriptions:contains('Note:')").each(function()
					{
						var element = $(this);

						var html = element.html();

						var noteId = html.match(/Note:(\d+)/)[1];

						var note = getStoredNote(noteId);

						if(note == null)
							return;
						
						var url = loanPerfURL(note);
						html = html.replace(/(Note:)(\d+)/, "$1<a href='" + url + "'>$2</a>");
						DEBUG && GM_log("html=", html);
						
						element.html(html);
					});
				});
			});
			});
	}
	else if(href.match(/yrEndTraderStatement.action/))
	{
	var DEBUG = debug(false, arguments);

		var table = $("table#lender-activity");
		var ths = table.find("thead th");

		/* NOTE: no footers on this table */
		var noteIdCol = ths.filter(":contains('Note Id')").index();

		var purchasePriceCol = ths.filter(":contains('Purchase Price')").index();
		var parValueAtPurchaseCol = ths.filter(":contains('Par Value at Purchase')").index();	// Principal + Accrued Interest

		var salePriceCol = ths.filter(":contains('Sale Price')").index();
		var parValueAtSaleCol = ths.filter(":contains('Par Value at Sale')").index();	// Principal + Accrued Interest
		var feeCol = ths.filter(":contains('Fee')").index();

		var trs = table.find("tbody tr");

		table.tablesorter({
	//		sortList: [[1,0], [0,0]],	// default sort
		});

		var totalGainTotal = 0, totalFeeTotal = 0;
		trs.each(function() 
		{
			var tds = $("td", this);

			/* purchase price */
			var purchasePriceCell = tds.eq(purchasePriceCol);
			var parValueAtPurchaseCell = tds.eq(parValueAtPurchaseCol);

			var purchasePrice = text2Value(purchasePriceCell.text());
			var parValueAtPurchase = text2Value(parValueAtPurchaseCell.text());

			var purchaseGain = parValueAtPurchase - purchasePrice;
			
			if(GAINLOSS) purchasePriceCell.append(sprintf("%+0.2f", purchaseGain));
			var purchaseGainPercent = purchaseGain / purchasePrice;
			if(purchaseGainPercent > 0.10)
				purchasePriceCell.addClass('lcac_greenHigh');
			else if(purchaseGainPercent > 0.00)
				purchasePriceCell.addClass('lcac_greenLow');
			else if(purchaseGainPercent < -0.10)
				purchasePriceCell.addClass('lcac_redLow');
			else if(purchaseGainPercent < -0.00)
				purchasePriceCell.addClass('lcac_yellowLow');


			/* sale price */
			var salePriceCell = tds.eq(salePriceCol);
			var parValueAtSaleCell = tds.eq(parValueAtSaleCol);
			var feeCell = tds.eq(feeCol);

			var salePrice = text2Value(salePriceCell.text());
			var parValueAtSale = text2Value(parValueAtSaleCell.text());
			var fee = text2Value(feeCell.text());

			var saleGain0 = salePrice - parValueAtSale;
			var saleGain = salePrice - parValueAtSale - fee;
			
	//		if(GAINLOSS) salePriceCell.append(sprintf("%+0.2f%+0.2f", saleGain0, -fee));
			if(GAINLOSS) salePriceCell.append(sprintf("%+0.2f", saleGain));
			var saleGainPercent = saleGain / parValueAtSale;
			if(saleGainPercent > 0.10)
				salePriceCell.addClass('lcac_greenHigh');
			else if(saleGainPercent > 0.00)
				salePriceCell.addClass('lcac_greenLow');
			else if(saleGainPercent < -0.10)
				salePriceCell.addClass('lcac_redLow');
			else if(saleGainPercent < -0.00)
				salePriceCell.addClass('lcac_yellowLow');
			
			var noteIdCell = tds.eq(noteIdCol);
			var noteId = noteIdCell.text();
			
			/* add a link to the note, if we have the data in storedData */
			var note = getStoredNote(noteId);
			if(note)
			{
				var url = loanPerfURL(note);
				DEBUG && GM_log("url=", url);

				if(PRICESINURL)
				url += sprintf("&sale_price=%0.2f&par_value_at_sale=%0.2f&fee_at_sale=%0.2f", salePrice, parValueAtSale, fee);

				noteIdCell.wrapInner(sprintf("<a href='%s' />", url));
			}

			/* total */
			var totalGain = purchaseGain + saleGain - fee;
			totalGain = round2Decimals(totalGain);

			totalGainTotal += totalGain;
			totalFeeTotal += fee;

			if(GAINLOSS) noteIdCell.append(sprintf("%+0.2f", totalGain));
			if(totalGain >= 1)
				noteIdCell.addClass('lcac_greenHigh');
			else if(totalGain >= 0.01)
				noteIdCell.addClass('lcac_greenLow');
			else if(totalGain <= -1)
				noteIdCell.addClass('lcac_redHigh');
			else if(totalGain <= -0.01)
				noteIdCell.addClass('lcac_redLow');
		});

		var totalDiv = 
				sprintf("<div class='lcac_summary'>(%d entries, %s total gain, %s total fee)</div>",
					trs.length,
					negative2negative("$%0.2f", totalGainTotal),
					negative2negative("$%0.2f", totalFeeTotal)
				);

		$("div#lender-activity-div")
			.before(totalDiv)
			.after(totalDiv);

	//	findHeadersCheckCells(table, null, false, {addCommentColumn:true});
	}
	else if(href.match(/lenderActivity.action/))	// LC Account Activity date entry form 
	{
	}
	else if(href.match(/getLenderActivity.action/))	// LC Account Activity
	{
		var div = $("div:contains('Please enter the code shown')");
		if(div.length > 0 && !div.hasClass('hidden'))	// message exists but isn't hidden
			return;

		/* NOTE: no footers on this table */

		waitForElement("div#lender-activity-div.yui-dt table", null,	// class yui-dt gets added after YUI is done
			function(table)	// one at the top and one at the bottom
			{
				tableCanChange(table, "tbody:last", function(tbody)
				{
				var DEBUG = debug(true, arguments);

					var descCol = table.find("thead th:contains('Description')").index();
					DEBUG && GM_log("descCol=", descCol);

	/*
	 * by the time we get it, it looks like e.g.
	<div class="yui-dt-liner"><span title="Service Fee, Loan 1219602">Service Fee, Loan 1219602</span></div>
	*/
					tbody
						.find("tr td:nth-child(" + (descCol + 1) + ")")
						.filter(":not(:contains(Service Fee))")
						.each(function()
						{
							var obj = $(this);
							DEBUG && GM_log("obj=", obj);

							var html = obj.html();
							DEBUG && GM_log("html=", html);
						
							var loanId = html.match(/Loan (\d+)/)[1];

							var links = getNoteLinks(loanId);
							GM_log("links=", links);
							if(links)
								$(this).append(" " + links);
						});
				});
			});
	}
	else if(href.match(/orderDetails.action/))	// scrape the Order Details
	{
	/* e.g.
		/account/loanPerf.action?loan_id=1532036&order_id=3335086&note_id=13739444
	*/

		scanForLoanPerfLinks($("body"));
	}
	else if(href.match(/paymentPlan.action/))
	{
		/* XXX should we do something here? */
	}
	else
	{
		if(DEBUG)
			alert("no match, href=" + href);
	}
		
	function scanOrders(button, callbackDone)
	{
		var scanOrdersWindow = window.open(null, '_scanOrders');
		if(scanOrdersWindow == null)
		{
			alert("Could not open a window. Are popups blocked?");
			return;
		}

		scanOrdersWindow.document.write(
			"<head><title>Scan Orders</title></head>" +
			"<body><pre id='ScanOrders'>Scan Orders");

		$.get("/account/orders.action", function(html)
		{
			var tds = $(html).find("table#orders tbody tr").find("a[href*='orderDetails.action'], td:nth-child(12)");

			var orders = [];
			var noteCountTotal = 0;
			for(var index = 0; index < tds.length; )
			{
				var href = tds.eq(index++).prop('href');
				var noteCount = parseFloat(tds.eq(index++).text());

				if(noteCount == 0)	// skip orders with no active notes
					continue;
				
				noteCountTotal += noteCount;
				
				orders.push(href);
			}

			scanOrdersWindow.document.write(
				sprintf("<br>%d orders, %d notes", orders.length, noteCountTotal));

			var count = 0;
			var continueRunning = false;
			(function doit()
			{
				if(orders.length == 0)
				{
					scanOrdersWindow.document.write("<br>Done");
					scanOrdersWindow.document.close();

					callbackDone(true);
					return;
				}

				if(continueRunning || scanOrdersWindow.closed)
				{
					var ok = confirm("Scan Orders Window closed. Keep scanning?");
					if(ok)
						continueRunning = true;
					else
					{
						callbackDone(false);
						return;
					}
				}

				if(button.hasClass('lcac_cancel'))
				{
					scanOrdersWindow.document.write("<br>Canceled");
					scanOrdersWindow.document.close();

					callbackDone(false);
					return;
				}
				
				var href = orders.shift();
				GM_log("href=", href);

				if(count == 0 || ++count > 5)
				{
					count = 1;
					scanOrdersWindow.document.write("<br>");
				}
				else
					scanOrdersWindow.document.write(", ");

				var orderId = href.match(/order_id=(\d+)/)[1];
				scanOrdersWindow.document.write(
					sprintf("<a href='%s'>%s</a>...", href, orderId));

				$.get(href, function(html)
				{
					var notes = scanForLoanPerfLinks($(html));
					
					scanOrdersWindow.document.write(
						sprintf("%2d notes", notes.length));

					setTimeout(doit, 1000 + Math.random() * 1000);
				})
				.error(function(jqXHR, textStatus, errorThrown) 
				{
					GM_log("get$error() textStatus=", textStatus, " errorThrown=", errorThrown, " url=", url); 
					alert("textStatus=" + textStatus + " errorThrown=" + errorThrown + " url=" + url);
					scanOrdersWindow.document.write(
						"<br>Error textStatus=" + textStatus + " errorThrown=" + errorThrown + " url=" + url);
				});
			})();
		})
		.error(function(jqXHR, textStatus, errorThrown) 
		{
			GM_log("get$error() textStatus=", textStatus, " errorThrown=", errorThrown, " url=", url); 
			alert("textStatus=" + textStatus + " errorThrown=" + errorThrown + " url=" + url);
			scanOrdersWindow.document.write(
				"<br>Error textStatus=" + textStatus + " errorThrown=" + errorThrown + " url=" + url);
		});
	}
					
	var notesToScan = [];
	var notesToScanNoLocation = [];

	function scanLoans(scanLoansButton, callbackDone)
	{
		var scanLoansWindow = scanLoans.scanLoansWindow;
		if(!scanLoansWindow || scanLoansWindow.closed)
		{
			scanLoansWindow = scanLoans.scanLoansWindow = window.open(null, '_scanLoans');
			scanLoansWindow.document.write(
				"<head><title>Scan Loans</title></head>" +
				"<body><pre style='tab-size:15; -moz-tab-size:15; -o-tab-size:15;'></pre>");
			scanLoansWindow.document.close();
			var scanLoansWindowJQ = $(scanLoansWindow.document).find("pre");
		}
		else
			var scanLoansWindowJQ = $(scanLoansWindow.document).find("pre");

		var scanLoansWindow2 = scanLoans.scanLoansWindow2;
		if(!scanLoansWindow2 || scanLoansWindow2.closed)
		{
			var scanLoansWindow2 = scanLoans.scanLoansWindow2 = window.open(null, '_scanLoans2');
			scanLoansWindow2.document.write(
				"<head><title>Scan Loans 2</title></head>" +
				"<body><pre style='tab-size:10; -moz-tab-size:10; -o-tab-size:10;'>");
			scanLoansWindow2.document.close();
			var scanLoansWindow2JQ = $(scanLoansWindow2.document).find("pre");
			scanLoansWindow2JQ.append("<span>loanId\tnoteId\tfico\tficoPrev\tficoTrend</span><br>");
		}
		else
			var scanLoansWindow2JQ = $(scanLoansWindow2.document).find("pre");

		/*YYY add this to prepare for pause/resume behavior */
		if(notesToScan.length > 0 || notesToScanNoLocation.length > 0)
			doit(notesToScan, notesToScanNoLocation);
		else
			getOwnedNotesData(	// fill up the notesToScan lists
				function(notes0)	// callback
				{
					/* error */
					if(notes0 == null)
						return;

					var loanIdLookup = Array();
					
					/* prune the notes we don't need to scan */
					$.each(notes0, function(index, note)
					{
						var loanId = note.loanId;
						if(loanIdLookup[loanId])	// already seen it
							return;
						loanIdLookup[loanId] = true;

						var status = note.status;
						if(status.match(/In\s*Funding|In\s*Review|Fully\s*Paid/))
							return;

						notesToScan.push(note);

						/* this data doesn't change so just load the ones we don't already have */
						var loan = getStoredLoan(loanId);
						if(!loan || !loan.location)
							notesToScanNoLocation.push(note);
					});

					notesToScan.sort(function(a, b) {return a.nextPaymentDate - b.nextPaymentDate});

					doit(notesToScan, notesToScanNoLocation);
				});

		function doit(notesToScan, notesToScanNoLocation)
		{
			var continueRunning = false;
							
			function continueline(html)
			{
				scanLoansWindowJQ.find("span:last").append(html);
			}
			function newline(html)
			{
				scanLoansWindowJQ.append("<span>" + html + "</span><br>");

				$(scanLoansWindow).scrollTop(scanLoansWindow.document.body.scrollHeight);
			}
			
			var startnewline = true;

			function doloop()
			{
				function loopWithTimeout() 
				{ 
					var date = new Date();
//					GM_log("date=", date, " date.getTimezoneOffset()=", date.getTimezoneOffset());
					date.setMinutes(date.getMinutes() + date.getTimezoneOffset() - 8 * 60);	// convert local time to pacific time
					var hour = date.getHours();
					var day = date.getDay();
//					GM_log("date=", date, " day=", day, " hour=", hour);

					// go faster at night-time or on Sunday (0) or Saturday
					var delay = 1000 + Math.random() * 1000;
					if(day > 0 && day < 6 && hour > 5 && hour < 22)
						delay *= 5;

					setTimeout(doloop, delay);
				}

				if(notesToScan.length == 0 && notesToScanNoLocation.length == 0)
				{
					newline("Done<br>");

					callbackDone(true);
					return;	// no loop
				}

				if(continueRunning || scanLoansWindow.closed)
				{
					var ok = confirm("Scan Orders Window closed. Keep scanning?");
					if(ok)
						continueRunning = true;
					else
					{
						callbackDone(false);
						return;	// no loop
					}
				}

				if(scanLoansButton.hasClass('lcac_cancel'))
				{
					newline("Canceled<br>");

					callbackDone(false);
					return;	// no loop
				}

				//assert(notesToScanNoLocation.length > 0 || notesToScan.length > 0)

				if(notesToScanNoLocation.length > 0)
				{
					var note = notesToScanNoLocation.shift();
					var loanId = note.loanId;
					
					var url = loanDetailURL(loanId);
					$.get(url, function(responseText)
					{
						if(responseText.match(/Member Sign-In/))		// we've been logged out
						{
							newline('Not logged in<br>');
							alert("Not logged in");
							return;	// no loop
						}

						var retvals = scanLoanDetail(loanId, responseText);

						newline(
							sprintf("Loan <a href='%s'>%s</a>, Note <a href='%s'>%s</a>\t%s",
								url, loanId,
								loanPerfURL(note), note.noteId,
								retvals.location));

						loopWithTimeout();
					})
					.error(function(jqXHR, textStatus, errorThrown) 
					{
						GM_log("get$error() textStatus=", textStatus, " errorThrown=", errorThrown, " url=", url); 
						continueline(sprintf("<a href='%s'>E</a>", url));
						
						loopWithTimeout();
					});
				}
				else // notesToScan.length > 0
				{
					var note = notesToScan.shift();
					var loanId = note.loanId;
					
					var url = loanPerfURL(note);
					$.get(url, function(responseText)
					{
						if(responseText.match(/Member Sign-In/))		// we've been logged out
						{
							newline('Not logged in<br>');
							alert("Not logged in");
							return;
						}

						var retvals = scanLoanPerf(loanId, $(responseText));	// XXX should we clone retvals since it's a shared object?
						var ficoTrend = retvals.ficoTrend;
						retvals = retvals.vars;

						var msgArray = [];

						if(retvals.chargedOffDefault)
							msgArray.push(retvals.chargedOffDefault.toUpperCase());
						else if(retvals.bankruptDeceased)
							msgArray.push(retvals.bankruptDeceased);
						else
						{
							if(retvals.fico < FICOWAYDOWN)
								msgArray.push("FICO " + retvals.fico);
							if(retvals.ficoDrop)
								msgArray.push("FICO drop");
							if(typeof XXX == 'XXX' && retvals.paymentPlan)
								msgArray.push("Payment Plan");
							if(retvals.inProcessing)
								msgArray.push("Processing since " + retvals.inProcessing);
						}

						if(retvals.recoveries)
							msgArray.push("Recoveries " + retvals.recoveries);

						if(msgArray.length > 0)
						{
							var msg = msgArray.join("\t");

							newline(
								sprintf("%s\t<a href='%s'>%s</a>\t%s",
									loanId,
									url, note.noteId,
									msg));
							startnewline = true;
						}
						else if(startnewline)
						{
							newline(sprintf("<a href='%s'>.</a>", url));
							startnewline = false;
						}
						else
							continueline(sprintf("<a href='%s'>.</a>", url));

						scanLoansWindow2JQ.append(
							sprintf("<span>%s\t<a href='%s'>%s</a>\t%s\t%s\t%s</span><br>",
								loanId,
								url, note.noteId,
								ficoTrend[ficoTrend.length - 1],
								ficoTrend[ficoTrend.length - 2],	// should always be at least 2 points
	//							ficoTrend.slice(0).reverse().join(",")));	// YYY reverse() changes array in place, slice clones the array (it's a shared object)
								ficoTrend.join(",")));

						first = false;

						loopWithTimeout();
					})
					.error(function(jqXHR, textStatus, errorThrown) 
					{
						GM_log("get$error() textStatus=", textStatus, " errorThrown=", errorThrown, " url=", url); 
						continueline(sprintf("<a href='%s'>E</a>", url));

						loopWithTimeout();
					});
				}
			}

			doloop(); // start the loop
		}
	}
}
catch(ex)
{
	GM_log("ex=" + ex + "\n" + ex.message + "\n" + ex.stack);
}
});	// end doit()/ready()
