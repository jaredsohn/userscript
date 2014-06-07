// ==UserScript==
// @name           Price Watch For Amazon
// @namespace      http://www.nukeprice.com
// @description    Price Watch For Amazon can help you watch price for Amazon items easily. Put the email in the script to save your typing.
// @include        http://www.amazon.com/*
// @include        http://www.amazon.co.uk/*
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.fr/*
// @include        http://www.amazon.ca/*
// @include        http://amazon.com/*
// @include        http://amazon.co.uk/*
// @include        http://amazon.ca/*
// @include        http://amazon.co.jp/*
// @include        http://amazon.fr/*
// @include        http://amazon.de/*
// ==/UserScript==

// TODO: put your email here to avoid typing it every time
var email=GM_getValue("NukePriceEmail","");
var lifetime=1;

var marketplace=0;
if(window.location.href.indexOf("amazon.co.uk")>=0)
	marketplace=1;
if(window.location.href.indexOf("amazon.ca")>=0)
	marketplace=2;
if(window.location.href.indexOf("amazon.de")>=0)
	marketplace=3;
if(window.location.href.indexOf("amazon.co.jp")>=0)
	marketplace=4;
if(window.location.href.indexOf("amazon.fr")>=0)
	marketplace=5;
var regex=/\/([A-Z0-9]{10})(\/|$|\?|\%|\#)/;
var asin="";
var isDetailPage=false;
if(regex.test(window.location.href)){
	isDetailPage=true;
	var m=regex.exec(window.location.href);
	asin=m[1];
}

function pricewatch(){
	var email=GM_getValue("NukePriceEmail","");
	email=window.prompt("Please confirm your email address:",email);
	if(email.indexOf("@")<0||email.indexOf(".")<0){
		alert("Your email address is not correct.");
	}else{   
		GM_setValue("NukePriceEmail",email);
	}
	GM_openInTab('http://www.nukeprice.com/pw/pw.aspx?asin='+asin+'&email='+email+'&marketplace='+marketplace);
}

function newsubmit(event) {
	if(isDetailPage){
		var m=regex.exec(window.location.href);
		var target = event ? event.target : this;
		if(target.action.indexOf("handle-buy-box")>=0){
			var response = confirm('Do you want to watch the price for this item?');
			if(response){
				pricewatch();
			}
		}
	}
}
if(isDetailPage){
	window.addEventListener('submit', newsubmit, false);
}


// filler items
var doc = document.evaluate("//tr/td/span[@class='small']/b/span[@class='price']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var thresholdPrice=6;
if(doc.snapshotItem(0)){
    var price = doc.snapshotItem(0).innerHTML.substring(1);
    var node = doc.snapshotItem(0).parentNode.parentNode.parentNode;
	if(parseFloat(price) < thresholdPrice){
		node.innerHTML += "<font color=red><br/><b><a href=\"http://nukeprice.com/onlinetools.html\">Find filler item</a> to get free shipping!</b></font>";
	}
}

doc = document.evaluate("//tr/td/span[@class='sans']/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(doc.snapshotItem(1) && doc.snapshotItem(1).innerHTML.indexOf(" Super Saver ")>0){ 
	var price = doc.snapshotItem(0).innerHTML.substring(1);
	var node = doc.snapshotItem(0).parentNode.parentNode;
	if(parseFloat(price) < thresholdPrice){
		node.innerHTML += "<font size=+1 color=red><br/><b><a href=\"http://nukeprice.com/onlinetools.html\">Find filler item</a> to get free shipping!</b></font>";
	}
}
// add button
if(isDetailPage){
	doc = document.evaluate("//body",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var node = doc.snapshotItem(0);
	node.innerHTML="<div id='pricewatch'><form method =\"GET\" action=\"http://www.nukeprice.com/pw/pw.aspx\">Step 1: Enter email <input type='textbox' class='input' name='email' id='nukepriceemail' value=\""+email+"\"/><input type=\"hidden\" name='asin' value=\""+asin+"\"/><input type=\"hidden\" name='marketplace' value=\""+marketplace+"\"/>  Step 2: specify watch job expire in <input type='textbox' name='expire' class='input' id='nukepriceexpire' maxlength=\"2\" style=\"width:30\" value=\""+lifetime+"\"/> month Step 3: <input type='submit' value='Create watch job for this item' /></form></div>"+node.innerHTML;
}