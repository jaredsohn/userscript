// ==UserScript==
// @name        Auto-Rewards Central Claimer for eBay

// @namespace   rewardebay

// @include     http://*rewardscentral.com.au/Earn/ShoppingOffer.aspx?urlid=1727

// @include     http://*rewardscentral.com.au/earn/ShoppingClaim.aspx

// @include     http://*rewardscentral.com.au/Earn/ShoppingClaim.aspx?action=success

// @include     http://*rewardscentral.com.au/Earn/ShoppingClaimForm.aspx?qid=*
// @include     http://*ebay.com.au/?clk_rvr_id=*

// @include     http://*ebay.com.au/sch/i.html*

// @include     http://*ebay.com.au/itm/*

// @version     1

// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// ==/UserScript==

var rewardmode = false;
if(GM_getValue("rewardmode") != undefined){
	rewardmode = GM_getValue("rewardmode");
}
var rewardcentralebayhref = 'http://www.rewardscentral.com.au/Earn/ShoppingOffer.aspx?urlid=1727';
var rewardcentralclaimhref = 'http://www.rewardscentral.com.au/earn/ShoppingClaim.aspx';
var rewardcentralclaimpagehref = 'http://www.rewardscentral.com.au/Earn/ShoppingClaimForm.aspx?qid=';
var rewardcentralclaimcompletehref = 'http://www.rewardscentral.com.au/Earn/ShoppingClaim.aspx?action=success';
var itemid = "";
var itemtitle = "";
var itemamt = "";
if(rewardmode){
	itemid = GM_getValue("itemid");
	itemtitle = GM_getValue("itemtitle");
	itemamt = GM_getValue("itemamt");
	if(location.href == rewardcentralebayhref){
		document.getElementById('ctl00_mainContent_btnStartShopping').click();
	}
	else if(location.href == rewardcentralclaimhref){
		document.getElementsByClassName('new')[0].parentNode.parentNode.getElementsByTagName('strong')[0].parentNode.click();
	}
	else if(location.href.indexOf(rewardcentralclaimpagehref) != -1){
		document.getElementById('ctl00_mainContent_txtInvNumber').value = itemid;
		document.getElementById('ctl00_mainContent_txtPurchaseAmt').value = itemamt;
		document.getElementById('ctl00_mainContent_btnSubmitClaim').click();
	}
	else if(location.href == rewardcentralclaimcompletehref){
		setdefaults();
	}
	else if(location.href.indexOf('http://www.ebay.com.au/?clk_rvr_id=') != -1){
		doebaysearch();
	}
	else if(location.href.indexOf('http://www.ebay.com.au/sch/i.html') != -1){
		clickebayitem();
	}
	else if(location.href.indexOf('http://www.ebay.com.au/itm/') != -1){
		//GM_setValue("readyfs", true);
		insertrewardbutton('Cancel Claim', setdefaults);
		ifrmload();
	}
}
else if(location.href.indexOf('http://www.ebay.com.au/itm/') != -1){
	insertrewardbutton('RewardsCentral Claim', rclaunch);
}

function setdefaults(){
	rewardmode = false;
	itemid = "";
	itemtitle = "";
	itemamt = "";
	GM_setValue("readyfs", false);
	GM_setValue("rewardmode", rewardmode);
	GM_setValue("itemid", itemid);
	GM_setValue("itemtitle", itemtitle);
	GM_setValue("itemamt", itemamt);
	if(location.href.indexOf('http://www.ebay.com.au/itm/') != -1){
		location.href = document.location;
	}
}

function getDocWidth() {
    var D = document;
    return Math.max(
    Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
    Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
    Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}
function getDocHeight() {
    var D = document;
    return Math.max(
    Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
    Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
    Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function replacebody(ifr){
	document.body.parentNode.replaceChild(ifr, document.body);
}

function toggleFullScreen() {
	var ifr = document.getElementById("rciframe");
	ifr.setAttribute('style','position:absolute;left:0;top:0;');
	ifr.style.width = getDocWidth() + "px";
	ifr.style.height = getDocHeight() + "px";
	replacebody(ifr);
}

function insertrewardbutton(name, launchfunc){
	var rcbutton = document.createElement('a');
	rcbutton.setAttribute('class','btn btn-prim');
	rcbutton.id = 'rcbutton';
	rcbutton.innerHTML = name;
	var rcdiv = document.createElement('div');
	rcdiv.setAttribute('class','u-flL');
	var spacediv = document.createElement('div');
	spacediv.setAttribute('class','u-cb spcr vi-bbox-spcr10');

	rcdiv.appendChild(spacediv);
	rcdiv.appendChild(rcbutton);
	if(document.getElementById('binBtn_btn')){
		document.getElementById('binBtn_btn').parentNode.parentNode.appendChild(rcdiv);
	}
	else{
		document.getElementById('bidBtn_btn').parentNode.parentNode.appendChild(rcdiv);
	}
	document.getElementById('rcbutton').addEventListener('click',launchfunc,true);
}

function ifrmload(){
	//if(GM_getValue("readyfs")){
		//document.getElementById('rciframe').src = GM_getValue("readyfs");
		GM_openInTab(rewardcentralclaimhref);
		toggleFullScreen();
		//document.getElementById('binBtn_btn').click();
	//}
}

function rclaunch(){
	itemid = document.getElementsByClassName('u-flL iti-act-num')[0].innerHTML;
	itemtitle = document.getElementById('vi-lkhdr-itmTitl').innerHTML;
	itemamt = document.getElementById('prcIsum').innerHTML;
	itemamt = parseFloat(itemamt.substring(itemamt.indexOf('$') + 1));
	itemamt = (itemamt * parseFloat(document.getElementById('qtyTextBox').value)).toFixed(2).toString();
	GM_setValue("itemid", itemid);
	GM_setValue("itemtitle", itemtitle);
	GM_setValue("itemamt", itemamt);

	if(itemid != "" && itemtitle != "" && itemamt != ""){
		rewardmode = true;
		GM_setValue("rewardmode", rewardmode);
		var ifrm = document.createElement("IFRAME");
		ifrm.id = 'rciframe';
		ifrm.setAttribute("src", rewardcentralebayhref);
		ifrm.style.width = "1px";
		ifrm.style.height = "1px";
		if(document.getElementById('binBtn_btn')){
			document.getElementById('binBtn_btn').parentNode.parentNode.parentNode.appendChild(ifrm);
		}
		else{
			document.getElementById('bidBtn_btn').parentNode.parentNode.parentNode.appendChild(ifrm);
		}
		//document.getElementById('rciframe').addEventListener('load',ifrmload,true);
	}
}

function doebaysearch(){
	document.getElementById('gh-ac').value = itemtitle;
	document.getElementById('gh-btn').click();
}

function clickebayitem(){
	var items = document.getElementsByClassName('ittl');
	for(var i=0;i<items.length;i++){
		if(items[i].getElementsByTagName('a')[0].href.indexOf(itemid) != -1){
			//GM_setValue("readyfs", items[i].getElementsByTagName('a')[0].href)
			items[i].getElementsByTagName('a')[0].click();
		}
	}
}