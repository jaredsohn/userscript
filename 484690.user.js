// ==UserScript==
// @name        Dominos
// @namespace   http://mobile.dominos.com/*
// @include     https://mobile.dominos.com/*
// @include     harvey.binghamton.edu/~jyuen1/pizza/cheese
// @version     1
// ==/UserScript==

var allInput, thisInput, seconds;
allInput = document.evaluate('//input[@value]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

function login(){
	if(document.URL == 'harvey.binghamton.edu/~jyuen1/'){
		location.href = 'https://mobile.dominos.com';
	}
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet?command_mobilehome'){
		location.href = 'https://mobile.dominos.com/mobile/wap_servlet?command_login';
	}
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet?command_login'){
		document.getElementsByName('R_username')[0].value = 'silvercomputer123@hotmail.com';
		document.getElementsByName('R_password')[0].value = 'hackbu00';
	}
	for (var i = 0; i < allInput.snapshotLength; i++) {
		thisInput = allInput.snapshotItem(i);
		if(thisInput.value == 'Sign In'){
			thisInput.click();
		}
	}
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet' && document.body.innerHTML.indexOf('Delivery to:') == -1){
		location.href = 'https://mobile.dominos.com/mobile/wap_servlet?command_neworder&menuOpt=O&hns=true';
	}
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet?command_neworder&menuOpt=O&hns=true'){
		location.href = 'https://mobile.dominos.com/mobile/wap_servlet?command_savedordertype&menuOpt=O&location=1&orderType=Delivery';
	}
};

function createOrder(){
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet?command_savedordertype&menuOpt=O&location=1&orderType=Delivery'){
		location.href = 'https://mobile.dominos.com/mobile/wap_servlet?command_expressorder&key=M';
	}
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet?command_expressorder&key=M'){
		var order;
		order = prompt('Which pizza?');
		switch(order){
			case '1'	:
				document.getElementById('exp-order-1').click();
				break;
			case '2':
				document.getElementById('exp-order-2').click();
				break;
			case '3':
				document.getElementById('exp-order-3').click();
				break;
			case '4':
				document.getElementById('exp-order-4').click();
				break;
			case '5':
				document.getElementById('exp-order-5').click();
				break;
			default:
		}
		for (var i = 0; i < allInput.snapshotLength; i++) {
			thisInput = allInput.snapshotItem(i);
			if(thisInput.value == 'Add to Order'){
				thisInput.click();
			}
		}
	}
};

function checkout(){
	if(document.URL == 'https://mobile.dominos.com/mobile/wap_servlet' && document.body.innerHTML.indexOf('Delivery to:') != -1){
		for (var i = 0; i < allInput.snapshotLength; i++) {
			thisInput = allInput.snapshotItem(i);
			if(thisInput.value == 'Checkout'){
				thisInput.click();
			}
		}
		document.getElementById('paymentTypeCash').click();
	}
};

function main(){
	login();
	createOrder();
	checkout();
};

main();