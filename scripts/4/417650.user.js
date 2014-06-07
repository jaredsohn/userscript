// ==UserScript==
// @name        Dominos Pizza Voucher Codes
// @namespace   http://userscripts.org/*
// @description Finds voucher codes for your order
// @match     	*://*.dominos.com.au/*
// @match     	*://dominos.com.au/*
// @version     2.5
// @require	http://code.jquery.com/jquery-latest.min.js
// @resource	turtle http://i.imgur.com/eH8Ci9N.png
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_getResourceURL
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @run-at 		document-start
// ==/UserScript==

nThreads = 3;
max_retry = 25;
ajax_timeout = 10000;
check_interval = 50;
fileListURL = "http://goo.gl/Mrp9fr";
sendCodeURL = 'http://goo.gl/7GQdVE';

window.ajaxReq = ajaxReq, window.getBasket = getBasket, window.updateBasket = updateBasket, window.testCode = testCode, window.getOrderDetails = getOrderDetails; // GM weirdness
setLogging();
updateCodeData(function(codes){
	if(typeof initCodes === 'undefined')
		return;
	waitFor('initCodes===false', function(){
		initialiseCodes(codes);
	});
});

if(window.location.pathname.split('/').pop()!='ProductMenu')
	return;

if(GM_getValue('consent_code_sharing', false)==false)
	alert("Privacy Statement:\nThis version of 'Dominos Pizza Voucher Codes' userscript now notifies the script author of new or expired codes.\nThis process is completely anonymous.\nThe only information shared is the code, the store and whether it was a delivery or pickup.\nNo other personal details are shared, and it's impossible to even find out your IP address.\nIf you do not wish to participate, please uninstall this script immediately.");
GM_setValue('consent_code_sharing', true);

GM_addStyle("#voucher-button-container option { direction: ltr!important; }");
GM_addStyle("#voucher_select option:checked, #voucher_select option:hover { box-shadow: 0 0 10px 100px #9C9D9F inset; }");
GM_addStyle("#voucher_form > img { float: right; display: none; } #voucher_form > label { display: inline; }");
GM_addStyle("#voucher-button-container { position: relative; } #voucher-button-container > img { position: absolute; height: 1.6em; z-index: -1; left: 54.3%; top: 0.25em; } #apply_voucher { float: right; }");
GM_addStyle("#voucher_code { width: 50%!important; } #voucher-button-container > * { display: inline!important; }");
GM_addStyle("#voucher-button-container select { color:#58595B; width: 13%; height: 1.6em; display: inline-block; direction: rtl; opacity: 0; }");
if(window.navigator.userAgent.indexOf('WebKit')>0)
	GM_addStyle("#voucher-button-container select { direction: ltr!important; }");

GM_registerMenuCommand( "Clear Cache", function(){
	clearCache();
	}, 'C'
);

GM_registerMenuCommand( "Toggle Logging", function(){
	var l = GM_getValue('logging', false) === 'true';
	setLogging(!l);
	alert('Logging is now ' + (l ? 'disabled' : 'enabled'));
	}, 'L'
);

waitFor("unsafeWindow.requirejs.defined('common/basket')", function(){
	unsafeWindow.require(['common/basket'], function(basket){
		window.basket = basket;
	});
	jQueryBorg();
});

document.addEventListener("DOMContentLoaded", function(){
	$("<img src='" + GM_getResourceURL('turtle') + "'>").error(function(){
		this.src = "http://i.imgur.com/eH8Ci9N.png";
	}).appendTo("#voucher-button-container");
	$("<select id='voucher_select' title='Find vouchers'/>").insertBefore('#apply_voucher').change(function(e){
		tryCodes(this.value);
		this.value = '';
	}).each(function(){
		initialiseCodes(loadCodes());	
	});

	$status = $('#voucher_form label');
	$spinner = $("<img src='/eStore/Resources/Images/ajax-loader.gif'>").insertAfter($status);

	$(document).focusin(function(){
		if(!getSpinner())
			showStatus("&nbsp;");
	});

	initUserCodes();
});

function setLogging(l){
	if(typeof l == 'undefined')
		var l = GM_getValue('logging', false) === 'true';
	GM_setValue('logging',  l ? 'true' : 'false');
	Log = l ? function(t){ console.log(t); return true;} : function(){}; // Need to wrap console.log so Chrome doesn't have a fit
}

function clearCache(){
	GM_listValues().forEach(function(entry){ GM_deleteValue(entry);});
}

function initialiseCodes(codes){
	if((typeof initCodes === 'undefined') || (initCodes == false))
		initCodes = true;
	else
		return setTimeout(function(){ initialiseCodes(codes); }, check_interval);
	window.codes = codes;
	window.deals = sortKeys(codes);
	window.prices = {};
	var voucherSelect = document.getElementById('voucher_select');
	voucherSelect.innerHTML = '';
	
	for(var i = 0; i < deals.length; i++){
		var deal = deals[i];
		prices[deal] = sortIntKeys(codes[deal]);
		var lPrice = money(prices[deal][0]), hPrice = money(prices[deal][prices[deal].length-1]);
		var m = '$' + lPrice + (lPrice == hPrice ? '' : ('-$' + hPrice) );
		var text = deal.replace('$', m);
		var option = document.createElement('option');
		option.value = deal;
		option.textContent = text;
		voucherSelect.appendChild(option);
	}
	initCodes = false;
}

function money(m){
	if(typeof m == 'undefined')
		return '';
	var s = m.toString();
	return s.substr(0, s.length - 2) + '.' + s.substr(-2);
}

function stripLNum(t){
	var f = t.split(' ');
	for(var i = 0; i < f.length; i++)
		if(isNaN(parseFloat(f[i])))
			break;
	return f.splice(i).join(' ');
}

function showStatus(sText, hasSpinner){
	$status.html(typeof sText == 'undefined' ? '' : sText);
	if(typeof hasSpinner != 'undefined')
		setSpinner(hasSpinner);
}

function setSpinner(b){
	if(typeof b == 'undefined')
		var b = true;
	$spinner.css('display', b ? 'inline' : 'none');
}

function getSpinner(){
	return $spinner.css('display') != 'none';
}

function nextCode(deal, pos){
	if(!('index' in pos)){
		pos.price = 0;
		pos.index = 0;		
	}
	
	if(pos.index >= codes[deal][prices[deal][pos.price]].length){
		pos.index=0;
		pos.price++;
	}
	if(pos.price >= prices[deal].length)
		return null;
	return fmtVCode(window.codes[deal][prices[deal][pos.price]][pos.index++]);
}


function tryCodes(offer, callback){
	showStatus('Searching for vouchers...', true);
	var pos = {};
	(function tryCodes_(){
		var code = nextCode(offer, pos);
		if(code === null)
			return showStatus("No valid codes found", false);
		testCode(code, function(resp){
			if(isValidCode(resp))
				return showStatus('Voucher loaded. Value: $' + money(window.prices[offer][pos.price]), false), updateBasket(), true;
			tryCodes_();
		});
	})();
}

function loadCodes(){
	try {
		var codes = JSON.parse(GM_getValue('codes', '{}'));
	}
	catch(e){
		Log("loadCodes() Error parsing stored codes. Clearing cache");
		clearCache();
		return null;
	}
	return codes;
};

function updateCodeData(callback){
	var retry = 0, lastCheck = GM_getValue( 'lastCheck', 0 ), lastFileList = GM_getValue('lastFileList', 0), curr = Date.now(), callback = typeof callback == 'function' ? callback : function(){};
	if(curr - lastCheck < (24 * 3600 * 1000))
		return;
		
	if(curr - lastFileList > (24 * 3600 * 1000))
		getFileList();
	else
		parseFileList(GM_getValue('fileList', '[]'));	
	
	function getFileList(){
		if(retry++ > max_retry)
			return Log("Error: Max retries exceeed in getFileList()");
		ajaxReq(fileListURL, parseFileList);
	}
	
	function parseFileList(res){
		var codes, fileListCurr, fileListNew;
		try {
			fileListNew = JSON.parse(res);
		}
		catch(e){
			Log("updateCodeData() Error parsing new file list, retry = " + retry + ", deleting. Message: " + e.message);
			return getFileList();
		}
		
		try {
			fileListCurr = JSON.parse(GM_getValue('fileList', '[]'));
		}
		catch(e){
			Log("updateCodeData() Error parsing cached file list, deleting. Message: " + e.message);
			fileListCurr = [];
		}
		
		if(fileListNew.length && fileListCurr.length && isSubset(fileListNew, fileListCurr)&&(codes = loadCodes()))
			;
		else
			fileListCurr = [], codes = {};
		var newFiles = complement(fileListNew, fileListCurr), unprocFiles = newFiles.length;
		if(newFiles.length == 0)
			callback(codes);
		getDataFiles(newFiles, function(fName, newCodes){
			addCodeData(codes, newCodes);
			GM_setValue('codes', JSON.stringify(codes));
			fileListCurr.push(fName);
			GM_setValue('fileList', JSON.stringify(fileListCurr));
			Log('Deleting ' + 'datacache_' + fName);
			GM_deleteValue('datacache_' + fName);
			if(--unprocFiles<=0){
				GM_setValue('lastCheck', curr);
				callback(codes);
			}
		});
	}
}

function getDataFiles(files, callback){
	var callback =  typeof callback == 'function' ? callback : function(){};
	if(files.length==0)
		return;
	var codesArray = new Array(files.length);
	for(var reqIndex = 0, min = Math.min(nThreads, files.length), i = 0; i < min; i++)
		nextFile();

	var procIndex = 0;
	(function procFiles(){
		waitFor(function(){ return typeof codesArray[procIndex] != 'undefined'; }, function(){
			callback(files[procIndex], codesArray[procIndex]);
			procIndex++;
			if(procIndex < files.length)
				procFiles();
		});
	})();
	function nextFile(){
		var reqIndex_ = reqIndex++;
		if(reqIndex_ >= files.length)
			return Log('getDataFiles() nextFile() No more files');
		getDataFile(files[reqIndex_], function(codes){
			codesArray[reqIndex_] = codes;
			nextFile();
		});
	}
}

function getDataFile(fName, callback){
	var retry = 0, fc, fCacheName = 'datacache_' + fName;
	
	function parseFile(res){
		try{
			var codes = JSON.parse(res);
		} catch(e){
			GM_deleteValue(fCacheName);
			Log("JSON parse error in getDataFiles(), retry = " + retry + " Message: " + e.message + "\nres = " + res);
			return getDataFile_();
		}
		GM_setValue(fCacheName, res);
		callback(codes);
	}
	
	function getDataFile_(){
		if(retry++>max_retry)
			return Log("Error: max_retry exceeded in getDataFile_()");
		ajaxReq(fName, parseFile);
	}
	
	
	Log('getDataFile() fName = ' + fName);
	if(fc = GM_getValue(fCacheName, false))
		parseFile(fc);
	else
		getDataFile_();
}

function addCodeData(codes, newCodes){
	if('add' in newCodes){
		var deals = sortKeys(newCodes.add);
		for(var i = 0; i < deals.length; i++){
			var deal = deals[i];
			if(deal in codes == false)
				codes[deal] = {};
			var prices = sortKeys(newCodes.add[deal]), price;
			for(var j = 0; j < prices.length; j++)
				price = prices[j], codes[deal][price] = price in codes[deal] ? unique(codes[deal][price].concat(newCodes.add[deal][price])) : newCodes.add[deal][price];
		}
	}
	if('remove' in newCodes){
		var deals = sortKeys(newCodes.remove);
		for(var i = 0; i < deals.length; i++){
			var deal = deals[i];
			if(deal in codes == false)
				continue;
			var prices = sortKeys(newCodes.remove[deal]);
			for(var j = 0; j < prices.length; j++){
				var vCodes = [], price = prices[j];
				for(var k in codes[deal][price]){
					var vCode = codes[deal][price][k];
					if(newCodes.remove[deal][price].indexOf(vCode)<0)
						vCodes.push(vCode);
				}
				if(vCodes.length > 0)
					codes[deal][price] = vCodes;
			}
		}
	}
	return codes;
}

function unique(arr){
	if(arr.length == 0)
		return;
	arr.sort(function(a,b){return a-b});
	for(var u = [arr[0]], i = 1; i < arr.length; i++)
		if(arr[i]!=arr[i-1])
			u.push(arr[i]);
	return u;
}

function isSubset(supArr, subArr){ // returns true if subArr is a subset of supArr, false otherwise
	for(var i in subArr)
		if(supArr.indexOf(subArr[i])<0)
			return false;
	return true;
}

function complement(supArr, subArr){
	var diff = [];
	for(var i in supArr)
		if(subArr.indexOf(supArr[i])<0)
			diff.push(supArr[i]);
	return diff;
}

function sortKeys(arr){
	var keys=[];
	for(var key in arr)
		if(arr.hasOwnProperty(key))
			keys.push(key);
	keys.sort(function(a, b){
		var fa = stripLNum(a), fb = stripLNum(b);
		return fa == fb ? (a > b ? 1 : -1) : (fa > fb ? 1 : -1);
	});
	return keys;
}

function sortIntKeys(arr){
	var keys=[];
	for(var key in arr)
		if(arr.hasOwnProperty(key))
			keys.push(key);
	keys.sort(function(a, b){
		return parseInt(a) > parseInt(b);
	});
	return keys;
}

function waitFor(condition, callback){
	(function(){
		if((typeof condition == 'function') && condition())
			return callback();
		if(typeof condition == 'string'){
			try {
				if(eval(condition))
					return callback();
			}
			catch(e){}		
		}
		window.setTimeout(arguments.callee, check_interval);
	})();
}

function isValidCode(res){
	return parseResponse(res) == 'validCode';
}

function fail(res, txt){
	var msg = "An error occurred."
		+ "\nresponseText: " + res.responseText
		+ "\nreadyState: " + res.readyState
		+ "\nresponseHeaders: " + res.responseHeaders
		+ "\nstatus: " + res.status
		+ "\nstatusText: " + res.statusText
		+ "\nfinalUrl: " + res.finalUrl;
	Log(txt + ' ' + msg);
}

function fmtVCode(vc){
	if(typeof vc == 'undefined')
		var vc = voucherCode;
	return ("0000" + vc.toString()).substr(-5);
}

function testCode(vCode, callback){
	ajaxReq("https://internetorder.dominos.com.au/eStore/en/Basket/ApplyVoucher?voucherCode=" + fmtVCode(vCode), callback, null);
};

function getBasket(callback){
	ajaxReq("https://internetorder.dominos.com.au/eStore/en/Basket/GetBasketView?timestamp=" + Date.now(), callback);
};

function updateBasket(callback){
	getBasket(function(r){
		$('#basket_rows').html(r);
		basket.init();
		if(typeof callback == 'function')
			callback();
	});
};

function encodePostData(data){
	var r = "";
	for(var i in data){
		if(!data.hasOwnProperty(i))
			continue;
		try {
			var m = encodeURIComponent(typeof data[i] == 'object' ? JSON.stringify(data[i]) : data[i]);
		}
		catch(e){
			return Log("JSON encoding error in encodePostData(). Index: " + i + " Error Message: " + e.message);
		}
		r += i + "=" + m + "&";
	}
	return r.substring(0, r.length-1);
}

function ajaxReq(url, callback, data){
	var retry = 0;
	function fail_(res){
		fail(res, "Error in ajaxReq()");
		ajax_wrapper();
	}

	var reqObj = {
		method: "GET",
		url: url,
		timeout: ajax_timeout,
		onload: function(resp){
			if(typeof callback == 'function')
				callback(resp.responseText);
		},
		ontimeout: fail_,
		onerror: fail_
	};

	if(typeof data != 'undefined'){
		reqObj.method = "POST";
		if(data){
			for(var i in data)
				if(data.hasOwnProperty(i) && (data[i]=='undefined'))
					delete data[i];
			reqObj.data = encodePostData(data);
			reqObj.headers = { "Content-Type": "application/x-www-form-urlencoded" };
		}
	}

	function ajax_wrapper(){
		if(retry++<max_retry)
			GM_xmlhttpRequest(reqObj);
	}
	ajax_wrapper();
}

Object.defineProperty(Object.prototype, 'findIndex',{ // because Tampermonkey is a POS
  value: function(callback){
  	for(var key in this)
		if(this.hasOwnProperty(key))
			if(callback(this[key]))
				return key;
	return -1;
  },
  writable: true,
  configurable: true,
  enumerable: false
});

function jQueryBorg(){
	unsafeWindow.ajaxLog = [];
	unsafeWindow.require(["jquery", "basketUrls"], function ($, b) {
		ajax_ = $.ajax;
		$.ajax = function(arr, a){
			if(arr.url.indexOf(b.VoucherApply)>=0){
				var oldSuccess = arr.success;
				var vc = 'voucherCode=';
				var code = parseInt(arr.url.substr(arr.url.indexOf(vc) + vc.length));
				arr.success = function(resp){
					switch(parseResponse(resp)){
						case 'wrongTime':
						case 'validCode':
							if(!isKnownCode(code))
								unsafeWindow.ajaxLog.push({ op: 'n', code: code});
							break;
						case 'expired':
							unsafeWindow.ajaxLog.push({ op: 'e', code: code});
							break;
					}
					return oldSuccess(resp);
				};
			};
			return ajax_(arr, a);
		};
	});
}

function initUserCodes(){
	var target = document.querySelector('#basket_rows');
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		if(mutation.addedNodes)
			for(var i = 0; i < mutation.addedNodes.length; i++)
				if(('id' in mutation.addedNodes[i]) && (mutation.addedNodes[i].id == 'basket'))
					checkUserCodes();
	  });    
	});
	var config = { attributes: true, subtree: true, childList: true };
	observer.observe(target, config);
}

function checkUserCodes(){
	if(unsafeWindow.ajaxLog.length == 0)
		return;
	var ajL = unsafeWindow.ajaxLog;
	unsafeWindow.ajaxLog = [];
	for(var i in ajL)
		sendCode(ajL[i].code, ajL[i].op);	
}

function sendCode(code, op){
	if(typeof storeNumber == 'undefined')
		return getOrderDetails(function(sn){
			sendCode(code, op);
		});
	
	Log('sendCode() code: ' + code + ' store: ' + storeNumber + ' op: ' + op);
	getTime(function(time){
		var ref = 'http://' + storeNumber + '.' + code + '.' + op + (delivery ? 'd' : 'p') + '.' + time + '.info';
		ajaxReqAll(sendCodeURL, ref, 'HEAD');
	});	
}

function getTime(callback){
	Log('getTime()');
	ajaxReqAll('http://dominos.com.au', '', 'HEAD', function(resp){
		Log('getTime() response');
		callback(parseInt(Date.parse(resp.responseHeaders.match(/Date:\s+(.*)/)[1])/1000));
	});
}

function ajaxReqAll(url, ref, method, callback){
	Log('ajaxReqAll() url: ' + url + ' ref: ' + ref);
	var retry = 0;
	(function(){
		if(retry++ >= max_retry)
			return;
		GM_xmlhttpRequest({
			method: method,
			url: url,
			headers : {
				Referer : ref
			},
			onload: function(resp){
				Log('ajaxReqAll return');
				if(typeof callback != 'undefined')
					callback(resp);
			},
			onerror: arguments.callee,
			ontimeout: arguments.callee
		});
	})();
}

ajaxMessages = {wrongStore : 'is not accepted by your selected store', sessionExpired: 'Session has expired', expired: 'has expired.', deliveryOnly: 'is not valid for pick up orders.',  pickupOnly: 'is not valid for delivery orders', wrongTime : 'time' };

function parseResponse(res){
	if(typeof res == 'string')
		try {
			var data = JSON.parse(res);
		} catch(e){
			Log('parseResponse() JSON parse error: ' + e.message);
			if(res.indexOf('Service Unavailable')>=0)
				return Log('Service Unavailable'), 'retry';
			return Log('JSON parse error in parseResponse() response: ' + JSON.stringify(res, null, 4)), 'retry';
		}
	else
		var data = res;
	if(data['Messages']==null)
		return 'validCode';
	var r = ajaxMessages.findIndex(function(el){
		return data['Messages'][0].indexOf(el) != -1;
	});
	if(r==-1)
		return 'unknown';
	return r;
}

function isKnownCode(code){
	code = parseInt(code);
	for(var deal = 0; deal < deals.length; deal++)
		for(var price = 0; price < prices.length; price++)
			if(window.codes[deal][price].indexOf(code) >= 0)
				return true;
	return false;
}

function getOrderDetails(callback){
		
	var url = "https://internetorder.dominos.com.au/eStore/en/OrderTime";

	ajaxReq(url, function(r){
		div.innerHTML = r;
		window.storeNumber = parseInt(div.querySelector("#store_number").value);
		window.delivery = div.querySelector("a[href*='CustomerDetails/Pickup']") == null;
		if(typeof callback != 'undefined')
			callback({storeNumber: storeNumber, delivery: delivery });
	});
	var div = document.createElement('div');
}


