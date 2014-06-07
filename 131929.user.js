// ==UserScript==
// @name           magiccards.info enhanced proxy
// @namespace      Snidd
// @description    Adds a textbox where you can add an entire decklist and get proxies, instead of going 1 by 1
// @include        http://magiccards.info/
// @include        http://*.magiccards.info	
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.81
// ==/UserScript==

var totalNumberOfCards = 0;
var numberOfCardsReceived = 0;
var proxyAddresses = new Array();
var milliSecondsBetweenEach = 3000;
var currentTime = milliSecondsBetweenEach;
var currentCard = 0;


var getCardDetails = function(card){
	if (card.length < 1) {
		return "";
	}
	var numberOfCards = 1;
	var stringOfNumber = "";
	var i = 0;
	var currentChar = card.charAt(i);		
	while (!isNaN(currentChar)) {
		stringOfNumber += currentChar;
		i++;
		var currentChar = card.charAt(i);
	}	
	var cardName = card.substring(i).trim();
	
	if (stringOfNumber.length > 0)	{
		numberOfCards = new Number(stringOfNumber);
	}
	
	var cardDetails = new Object();
	
	cardDetails.name = cardName;
	cardDetails.url = "http://magiccards.info/query?q=%21" + escape(cardName);
	cardDetails.count = numberOfCards;
	
	logIt(cardDetails.count + " number of " + cardDetails.name);
	
	return cardDetails;
}

var cardUrlSuccess = function(data){
	numberOfCardsReceived++;
	var re = new RegExp("<a href=\"([^\"]+)\">\\[ \\+1 \\]");
	var m = re.exec(data);
	if (m != null)
	{
		proxyAddresses.push("http://magiccards.info" + m[1]);
		//logIt('added card ' + m[1]);
	}	
	else
	{
		//logIt('regex failed');
	}
	
	if (numberOfCardsReceived == totalNumberOfCards)
	{
		logIt('success!');
		processNextCard();
	}
}

var processNextCard = function(){
	var newIframe = $("iframe[id=proxyframe]");
	newIframe.attr('src', proxyAddresses[currentCard]);	
	currentCard++;
	if (currentCard < totalNumberOfCards)
	{	
		newIframe.load(processNextCard);
	}
}

var getProxyAddresses = function(cardList){
	var proxyAddresses = new Array();
	var cards = cardList.split("\n");
	//logIt('going through ' + cards.length + ' cards');
	for (var y=0; y<cards.length; y++)
	{
		var card = cards[y];
		var cardDetails = getCardDetails(card);
		if (cardDetails != undefined && cardDetails != "")
		{
			proxyAddresses.push(cardDetails);
			totalNumberOfCards += cardDetails.count;
		}
	}
	
	//logIt('fetching proxyAddresses for ' + totalNumberOfCards + ' cards. arrayCount:' + proxyAddresses.length);
	
	for (var y=0; y<proxyAddresses.length; y++)	{
		var cardDetails = proxyAddresses[y];
		//logIt('getting ' + cardDetails.count + cardDetails.name);
		for (var i=0; i<cardDetails.count; i++) {
			//logIt('fetching:' + cardDetails.url);
			$.get(cardDetails.url, cardUrlSuccess);
		}
	}
}

var startProcessing=function(){
	totalNumberOfCards = 0;
	numberOfCardsReceived = 0;
	proxyAddresses = new Array();
	currentTime = milliSecondsBetweenEach;
	currentCard = 0;

	cardArea = $("textarea[id=p]").val();
	getProxyAddresses(cardArea);
}

var logIt = function(msg) {
	if (false) {
		alert(msg);
	}
}

$(document).ready(function() {  
	var textArea = $("form[name=f]").before("<textarea rows='6' cols='40' type='text' name='p' id='p' size='30' value='' style='font-size: 1em;' tabindex='2'></textarea>");
	var inputButton = textArea.before("<input type='button' name='getproxy' id='getproxy' value='Get Proxies'/>");
	
	var newIframe = $("textarea[id=p]").before("<iframe id='proxyframe' width='90%' src='http://magiccards.info/undefined'></iframe><br/><br/>");
	
	var elmLink = document.getElementById('getproxy');
	elmLink.onclick = startProcessing;
});