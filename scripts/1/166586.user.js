// ==UserScript==
// @name        ZuoraUI+
// @namespace   zuora
// @include     https://*.zuora.com/apps/*
// @version     1

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require		   http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js
// @require		   http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.js
// @grant 		metadata
// ==/UserScript==

//easy to swtich between local mode
//var hostUrl = 'http://localhost:3000';
var hostUrl = 'http://secure-meadow-5420.herokuapp.com';

//add buttons here
$(document).ready( function(){
	var page = $('#z-list-title').find('h1').html();
	var acc = $('#body-top-nav').find('strong').html();
	var uname = $('#userLoginStatus').find('strong').html();
	var url = getUrl();
	var settings = $('#titleLabelID').html();
	//alert(settings);
	//migrate things
	if(settings == 'Billing Rules'){
		$('#edit_billingrues').append("<a class='z-button' id='migrate-billing-settings'>Save Settings</a>");
		$('#migrate-billing-settings').click(migrateBillingSettings);
	}
	if(settings == 'Default Subscription Settings'){
		$('#edit_subscriptionSetting').append("<a class='z-button' id='migrate-settings'>Save Settings</a>");
		$('#migrate-settings').click(migrateSubscriptionSettings);
	}
	//quick account
	if(page == 'All Customer Accounts'){
		$('#z-action-nav').append("<li><a class='z-button' id='quick-account'><span>Quick Account</span></a></li>");
		$('#quick-account').click(createAccount);
	}
	/*
	//quick invoice
	if(acc == 'back to Customer Account list'){
		$('.z-block-buttonList').first().append("<li><a class='z-button' id='quick-invoice'><span>Quick Invoice</span></a></li>");
		$('#quick-invoice').css("width", "120px");
		$('#quick-invoice').click(quickInvoice);
	}
	*/
	/*
	//quick usage
	if(acc == 'back to Customer Account list'){
		$('.z-block-buttonList').first().append("<li><a class='z-button' id='quick-usage'><span>Quick Usage</span></a></li>");
		$('#quick-usage').click(quickUsage);
	}
	*/
	/*
	//quick subscription
	if(acc == 'back to Customer Account list'){
		$('.z-block-buttonList').first().append("<li><a class='z-button' id='quick-subscription'><span>Quick Subscription</span></a></li>");
		$('#quick-subscription').click(quickSubscription);
	}
	*/
	//account detail iframe
	if(acc == 'back to Customer Account list'){
		var urlVars = getUrlVars();
		var id = urlVars["id"];
		$('#titleLabelID').append("<li><iframe width='600px' src='" + hostUrl + "/AccountDetail?id="+ id + "&url="+ url +"&username=" +uname + "' id='accountdetail'></iframe></li>");
		
	}
	var product = $('.title_back_link').find('a').html();
	//product ids iframe
	if(product == 'back to Product Catalog List'){
		
		var urlVars = getUrlVars();
		var id = urlVars["id"];
		$('#product_name_panel').append("<li><iframe id='frame' width='800px' height='100px' scrolling='auto' frameborder='0' src='" + hostUrl + "/ProductDetail?id="+ id + "&url="+ url + "&username=" +uname + "' id='accountdetail'></iframe></li>");
		
	}
	//invoice id
	if(acc == 'back to Invoice list'){

		var urlVars = getUrlVars();
		var invoice_number = urlVars["invoice_number"];
		$('#titleLabelID').append("<li><iframe id='frame' width='800px' height='100px' scrolling='auto' frameborder='0' src='" + hostUrl + "/Invoice?invoice_number="+ invoice_number + "&url="+ url + "&username=" +uname + "' id='accountdetail'></iframe></li>");

	}
	

	$(".z-button").css("background", "url(" + hostUrl + "/assets/buttons-red.gif) ");
	$(".z-button").css("padding", "3px 15px 6px");
	$(".z-button").css("color", "#FFFFFF");
	$("#frame").css("b")

});
function migrateBillingSettings(){
	
	var stuff = $('.text-center strong');
	var fields = $('.z-table-block.z-standard.no-plumb-line table tbody tr td:nth-of-type(1) div');
	//alert(fields.toSource());
	for(i = 0; i < stuff.length; i++){
		var setting_name = fields[i];
		var setting = removeWhiteSpace(stuff[i].innerHTML);
		alert(setting_name.innerHTML + ': ' + setting);
		//alert(setting);
	}

	//prompt('Enter tenant name: ');

}

function migrateSubscriptionSettings(){
	
	var stuff = $('.text-center strong');
	var fields = $('.z-table-block.z-standard.no-plumb-line table tbody tr td:nth-of-type(1) div');
	//alert(fields.toSource());
	for(i = 0; i < stuff.length; i++){
		var setting_name = fields[i];
		var setting = removeWhiteSpace(stuff[i].innerHTML);
		alert(setting_name.innerHTML + ': ' + setting);
		//alert(setting);
	}

	//prompt('Enter tenant name: ');

}

function removeWhiteSpace(input){
	return input.replace(/\s+/g, ' ');
}

function getUrl(){
	var url = window.location;
	if(url.toString().indexOf("www") !== -1){
		url = "production";
	}
	else{
		url = "apisandbox";
	}
	return url;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function quickSubscription(){
	var uname = $('#userLoginStatus').find('strong').html();
	var urlVars = getUrlVars();
	var id = urlVars["id"];
	var ratePlan = prompt('Enter rate plan to subscribe: ');

	$.ajax( hostUrl + "/QuickSubscription",
	{
		data: { username: uname, rate_plan: ratePlan, id: id, url: getUrl() },
		type: "GET",
		dataType: 'json',
		success: success,
		failure: fail
	});

	window.setInterval("location.reload(true)", 4000);
}

function quickUsage(){
	var uname = $('#userLoginStatus').find('strong').html();
	var urlVars = getUrlVars();
	var id = urlVars["id"];
	var UOM = prompt('Enter UOM: ');
	var quantity = prompt('Enter Quantity');
	$.ajax( hostUrl + "/QuickUsage",
	{
		data: { username: uname, uom: UOM, id: id, quantity: quantity, url: getUrl() },
		type: "GET",
		dataType: 'json',
		success: success,
		failure: fail
	});


	window.setInterval("location.reload(true)", 4000);
}

function quickInvoice(){
	var uname = $('#userLoginStatus').find('strong').html();
	var urlVars = getUrlVars();
	var id = urlVars["id"];
	var targetDate = prompt('Enter target date: ');

	$.ajax( hostUrl + "/QuickInvoice",
	{
		data: { username: uname, target_date: targetDate, id: id, url: getUrl()},
		type: "GET",
		dataType: 'json',
		success: success,
		failure: fail
	});


	window.setInterval("location.reload(true)", 4000);
}

function createAccount(){

	var uname = $('#userLoginStatus').find('strong').html();
	var firstName = prompt('Enter acc first name');

	$.ajax( hostUrl + "/CreateAccount",
	{
		data: { username: uname, first_name: firstName, url: getUrl() },
		type: "GET",
		dataType: 'json',
		success: success,
		failure: fail
	});

	window.setInterval("location.reload(true)", 4000);

}

function success(data){
	alert(data.toSource());
}

function fail(data){
	alert(data.toSource());
}

