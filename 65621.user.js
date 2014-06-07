// ==UserScript==
// @name          NoMarketPlace.com - Infobox @ Amazon
// @namespace     http://www.nomarketplace.com/
// @description   NoMarketPlace.com-Infobox @ Amazon
// @version       4.0
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require       https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include       http://amazon.tld/*
// @include       http://www.amazon.tld/*
// ==/UserScript==

var myRootElementName = "priceBlock";
var myNomarketplaceClassName = "nomarketplace-done";

//
var myDomain = document.domain;
var myTld = myDomain.replace("www.","");
myTld = myTld.replace("amazon.","");

var myTextPrice3rd = "This is the price of a third party seller";
var myTextPriceAmazon = "This is the price of Amazon";
var myTextAchtung = '<strong>Attention!</strong> This article is sold by a third party seller! <a href="#">More...</a>';
var myTextCheckAmazon = 'Check out if Amazon is also selling this article';
var myTextOr = 'or';
var myTextOkAmazon = 'You are seeing right now the article sold by Amazon. <a href="#">More...</a>';
var myTextSearchOnNMP = 'search on NoMarketPlace.com';
var myTextOnNMPTitle = 'You can find on NoMarketPlace.com for this article:';
var myTextPricehistory = 'a price history';
var myTextPricechecker = 'a price checker';
var myTextAvailchecker = 'an availability checker';
var myTextSupport = 'Support NoMarketPlace.com with just one click';
var myText3rdParty = '3rd party seller';


var myConfMerchantId = "A3JWKAKR8XB7XF";
var myEGTag = "bookmarklet-21";
if (myTld == "de") {
  myTextPrice3rd = "Hier siehst Du den Preis von einem Drittanbieter";
  myTextPriceAmazon = "Hier siehst Du den Preis von Amazon";
  myTextAchtung = '<strong>Achtung!</strong> Diesen Artikel verschickt Amazon nicht selbst! <a href="#">Mehr...</a>';
  myTextCheckAmazon = 'Prüfen, ob Amazon den Artikel auch anbietet';
  myTextOr = 'oder';
  myTextOkAmazon = 'Du siehst hier das Angebot von Amazon.de selbst. <a href="#">Mehr...</a>';
  myTextSearchOnNMP = 'in NoMarketPlace.com suchen';
  myTextOnNMPTitle = 'Auf NoMarketPlace.com gibt es zu diesem Artikel:';
  myTextPricehistory = 'Preishistorie';
  myTextPricechecker = 'Preis-Checker';
  myTextAvailchecker = 'Verf&uuml;gbarkeits-Checker';
  myTextSupport = 'NoMarketPlace.com mit einem Klick unterst&uuml;tzen';
  myText3rdParty = 'Drittanbieter';
}
if (myTld == "ca") {
  myConfMerchantId = "A3DWYIK6Y9EEQB";
  myEGTag = "nomarcom0a-20";
}
else if (myTld == "com") {
  myConfMerchantId = "ATVPDKIKX0DER";
  myEGTag = "nomarcom-20";
}
else if (myTld == "co.jp") {
  myConfMerchantId = "AN1VRQENFRJN5";
}
else if (myTld == "co.uk") {
  myConfMerchantId = "A3P5ROKL5A1OLE";
  myEGTag = "nomarcom-21";
}
else if (myTld == "fr") {
  myConfMerchantId = "A1X6FK5RDHNB96";
}

//var myNewPrices = getElementsByClass("newPrice");

fctStart();
waitForKeyElements ("#searchTemplate div.results", fctStart);

function fctStart() {
  var myNewPrices = getElementsByClass("newp");
  if (myNewPrices.length > 0) {
    for (var i = 0; i < myNewPrices.length; i++) {
    //for (var i = 0; i < 1; i++) {
      checkSearchResult(myNewPrices[i]);
    }
  }

  var myImages = getElementsByClass("image");
  if (myImages.length > 0) {
    for (var i = 0; i < myImages.length; i++) {
      myImages[i].firstChild.nextSibling.href = fctSetPartnerId(myImages[i].firstChild.nextSibling.href);
    }
  }

  var myTitles = getElementsByClass("title");
  if (myTitles.length > 0) {
    for (var i = 0; i < myImages.length; i++) {
      myTitles[i].firstChild.nextSibling.href = fctSetPartnerId(myTitles[i].firstChild.nextSibling.href);
    }
  }


  var myEverygainElement = document.getElementById("nomarketplace-titlebox");
  if (!myEverygainElement) {
    var myElement = fctCreateElement();
    fctShowElement(myElement, myRootElementName);
  }
}

function fctCreateElement() {
  var myElement = document.createElement("div");

  if (document.getElementById("merchantID")) {
    var myMerchantId = document.getElementById("merchantID").value;
    if (myMerchantId != myConfMerchantId) {
      myElement.style.border = "1px solid #dd3333";
    }
    else {
      myElement.style.border = "1px solid #04B404";
    }
  }
  myElement.style.width = "480px";
  myElement.style.padding = "0 25px 0 25px";


  if (document.getElementById("btAsinTitle")) {
    var myTitle = document.getElementById("btAsinTitle").innerHTML;
  }
  else {
    var myTitle = "";
  }
  var myTitle4URI = encodeURI(myTitle.replace(/ /g, '_'));
  myTitle4URI = myTitle4URI.replace(/\W/g, "");
  
  if (document.getElementById("ASIN")) {
    var myASIN = document.getElementById("ASIN").value;
  }
  else {
    var myASIN = "";
  }
  var myUrl = document.location.href;
  myUrl = myUrl.replace(/tag=/g, 'old_tag');
  if (myUrl.indexOf("?") > 0) {
    myUrl += "&tag="+myEGTag;
  }
  else {
    myUrl += "?tag="+myEGTag;
  }
  
  var myInnerHTML = "";
  if (myMerchantId != myConfMerchantId) {
    myInnerHTML = '<div id="nomarketplace-titlebox"><img src="http://www.nomarketplace.com/userscript/img/no.png" alt="" align="right" title="'+myTextPrice3rd+'" /> ';
    myInnerHTML += '<p>'+myTextAchtung+'</p></div>';
    myInnerHTML += '<div id="nomarketplace-detailbox" style="display:none;"><p><a href="' + myUrl + '&m='+myConfMerchantId+'">&raquo; '+myTextCheckAmazon+' &laquo;</a></p>' +
                         '<p>'+myTextOr+'</p>';
  }
  else {
    myInnerHTML  = '<div id="nomarketplace-titlebox"><img src="http://www.nomarketplace.com/userscript/img/yes.png" alt="" align="right" title="'+myTextPriceAmazon+'" /> ';
    myInnerHTML += '<p>'+myTextOkAmazon+'</p></div>';
    myInnerHTML += '<div id="nomarketplace-detailbox" style="display:none;">';
  }
  myInnerHTML  += ' <form name="nomarketplace_form" action="http://www.nomarketplace.com/" method="get"><p><input type="text" name="s" value="' + myTitle + '" /><input type="submit" value="'+myTextSearchOnNMP+'" /></p></form>'; 
  myInnerHTML  += ' <p>'+myTextOnNMPTitle+'</p>' + 
                          ' <ul style="margin-left: 40px;list-style-type:none;list-style-image:url(http://www.nomarketplace.com/userscript/pfeil.png);">' + 
                          ' <li><a href="http://www.nomarketplace.com/de/search/' + myASIN + '__' + myTitle4URI + '/detail/" title="">'+myTextPricehistory+'</a></li>' + 
                          ' <li><a href="http://www.nomarketplace.com/de/info/' + myASIN + '__' + myTitle4URI + '/price/" title="">'+myTextPricechecker+'</a></li>' + 
                          ' <li><a href="http://www.nomarketplace.com/de/info/' + myASIN + '__' + myTitle4URI + '/availability/" title="">'+myTextAvailchecker+'</a></li>' + 
                          ' </ul>' + 
                          '<p><a href="' + myUrl + '" title=""><img src="http://www.nomarketplace.com/userscript/pfeil.png" border=0 />&nbsp;'+myTextSupport+'&nbsp;<img src="http://www.nomarketplace.com/userscript/pfeil-left.png" border=0 /></a></p></div>';
  myElement.innerHTML = myInnerHTML;
            
  return myElement;
}
  
function fctShowElement(myElement, myRootElementName) {
  var myRootElement = document.getElementById(myRootElementName);
  if (myRootElement) {
    myRootElement.parentNode.insertBefore(myElement, myRootElement.nextSibling);

    if (document.addEventListener) {
      document.getElementById("nomarketplace-titlebox").addEventListener("click", clickLink, false);
    } else {
      document.getElementById("nomarketplace-titlebox").onclick = clickLink;
    }
  }
}

function clickLink(){
  var myCurrentDisplay = document.getElementById("nomarketplace-detailbox").style.display;
  if (myCurrentDisplay == "none") {
    document.getElementById("nomarketplace-detailbox").style.display = 'block';
  }
  else {
    document.getElementById("nomarketplace-detailbox").style.display = 'none';
  }
}

function getElementsByClass( pClass) { 
  var myResult = new Array();
  //var myTags = document.getElementsByTagName("div");
  var myTags = document.getElementsByTagName("li");
  for(i=0,j=0; i<myTags.length; i++) { 
    var test = " " + myTags[i].className + " ";
    if (test.indexOf(" "+pClass+" ") != -1) {
      myResult[j++] = myTags[i];
    }
  } 
  return myResult;
} 


function checkSearchResult(pElement) {
  var myLink = pElement.firstChild.nextSibling.href;
  //console.log(pElement.className.indexOf(myNomarketplaceClassName));
  if (pElement.className.indexOf(myNomarketplaceClassName) > -1) {
    return false;
  }
  
  //Tag hinzufügen, damit nicht doppelt geprüft wird
  pElement.className = pElement.className + " " + myNomarketplaceClassName;
  GM_xmlhttpRequest({
      method: 'GET',
      url: myLink,
      onload: function(responseDetails) {
        var myMerchantTag = '<input type="hidden" id="merchantID" name="merchantID" value="'+myConfMerchantId+'" />';
        if (responseDetails.responseText.indexOf(myMerchantTag) != -1) {
          pElement.firstChild.nextSibling.style.fontWeight = 'bold';
          pElement.firstChild.nextSibling.style.color= 'green';
          //pElement.firstChild.nextSibling.nextSibling.nextSibling.style.color = 'green';
          pElement.firstChild.nextSibling.href = fctSetPartnerId(pElement.firstChild.nextSibling.href);
          pElement.innerHTML += '&nbsp;<a href="http://www.nomarketplace.com/"><img src="http://www.nomarketplace.com/userscript/img/yes.png" alt="" title="'+myTextPriceAmazon+'" /></a>';
        }
        else {
          pElement.firstChild.nextSibling.href = fctSetPartnerId(pElement.firstChild.nextSibling.href);
          pElement.firstChild.nextSibling.style.textDecoration = 'line-through';
          //pElement.firstChild.nextSibling.nextSibling.nextSibling.style.textDecoration = 'line-through';
          pElement.className = '';
          pElement.color = '#888888';
          pElement.innerHTML += "&nbsp;("+myText3rdParty+"!)&nbsp;";
          pElement.innerHTML += "<a href='http://www.nomarketplace.com/'><img src='http://www.nomarketplace.com/userscript/img/no.png' title='"+myTextPrice3rd+"' /></a>";
          pElement.innerHTML += '<br /><a class="text-decoration:none !important;" href="' + pElement.firstChild.nextSibling.href + '&m='+myConfMerchantId+'">&raquo; '+myTextCheckAmazon+' &laquo;</a>';
        }
      }
  });
}

function fctSetPartnerId(pUrl) {
  var myUrl = pUrl;
  if (myUrl.indexOf("?") > 0) {
    myUrl += "&tag="+myEGTag;
  }
  else {
    myUrl += "?tag="+myEGTag;
  }
  
  return myUrl;
}