// ==UserScript==
// @name           Steam price comparison
// @namespace      http://code.google.com/p/steam-prices/
// @description    Displays prices from all regions in the Steam webshop
// @include        http://store.steampowered.com/app/*
// @include        https://store.steampowered.com/app/*
// @include        http://store.steampowered.com/sub/*
// @include        https://store.steampowered.com/sub/*
// ==/UserScript==


var urlGamePattern = new RegExp(/^https?:\/\/store.steampowered.com\/app\/\d+\/?$/i);
var urlPackagePattern = new RegExp(/^https?:\/\/store.steampowered.com\/sub\/\d+\/?$/i);
var usHttp;
var ukHttp;
var euHttp;
var pricenodes = new Array();
var ukscript;
var euscript;
var someNode;

//Test the URL to see if we're on a game page
if (urlGamePattern.test(document.documentURI) || urlPackagePattern.test(document.documentURI)) {
  someNode = document.getElementById("all");

  ukscript = document.createElement("script");
  ukscript.setAttribute("type", "text/javascript");
  ukscript.setAttribute("src", 
      "http://javascriptexchangerate.appspot.com/?from=USD&to=GBP");
  document.body.insertBefore(ukscript, someNode);
          
  euscript = document.createElement("script");
  euscript.setAttribute("type", "text/javascript");
  euscript.setAttribute("src", 
      "http://javascriptexchangerate.appspot.com/?from=USD&to=EUR");
  document.body.insertBefore(euscript, someNode);

  //Test to see if the game has a price
  divnodes = document.getElementsByTagName("div");
  for (i=0; i<divnodes.length; i++) {
    if (divnodes[i].getAttribute("class") == "game_area_purchase_price") {
      pricenodes.push(divnodes[i]);
      divnodes[i].innerHTML += "<br/><span style='color: rgb(136, 136, 136);'>Computing...</span>"
      divnodes[i].style.textAlign = "left";
    }
  }
  
  //If the current page contains a price, start downloading regional versions of this page
  if (pricenodes.length > 0) {
    usHttp = new XMLHttpRequest();
    usHttp.onreadystatechange=stateChanged;
    usHttp.open("GET",document.documentURI+"?cc=us",true);
    usHttp.send(null);
  
    ukHttp = new XMLHttpRequest();
    ukHttp.onreadystatechange=stateChanged;
    ukHttp.open("GET",document.documentURI+"?cc=uk",true);
    ukHttp.send(null);
  
    euHttp = new XMLHttpRequest();
    euHttp.onreadystatechange=stateChanged;
    euHttp.open("GET",document.documentURI+"?cc=no",true);
    euHttp.send(null);
  }
}

//Extracts prices from the downloaded HTML and displays them
function stateChanged() {
  if (usHttp.readyState==4 && ukHttp.readyState==4 && euHttp.readyState==4) {
    var uspricepattern = new RegExp(/<div class="game_area_purchase_price">(.+?)<\/div>/gi);
    var ukpricepattern = new RegExp(/<div class="game_area_purchase_price">(.+?)<\/div>/gi);
    var eupricepattern = new RegExp(/<div class="game_area_purchase_price">(.+?)<\/div>/gi);
    var priceHtml = new Array(3);
    var usvaluepattern = new RegExp(/&#36;([\d\.]+)$/i);
    var ukvaluepattern = new RegExp(/&#163;([\d\.]+)$/i);
    var euvaluepattern = new RegExp(/([\d,-]+)&#8364;$/i);
    var price = new Array(3);
    
    var calcscript = "function getDifference(currency, usdPrice, localPrice) {\n" +
        "  var usdConverted; var lessmore; var diff;\n" +
        "  if (currency == 'GBP') {usdConverted = USDtoGBP(usdPrice);}\n" +
        "  else if (currency == 'EUR') {usdConverted = USDtoEUR(usdPrice);}\n" +
        "  diff = Math.abs((localPrice/usdConverted)*100-100);\n" +
        "  if (localPrice >= usdConverted) {lessmore = 'higher';}\n" +
        "  else {lessmore = 'lower';}\n" +
        "  return ' (' + Math.round(diff) + '% ' + lessmore + ')';}\n";
    
    var calculatescript = document.createElement("script");
    calculatescript.setAttribute("type", "text/javascript");
    calculatescript.innerHTML = calcscript;
    document.body.insertBefore(calculatescript, someNode);
    
    for (i=0; i<pricenodes.length; i++) {
      try {priceHtml[0] = uspricepattern.exec(usHttp.responseText)[1];}
      catch(err) {priceHtml[0] = "N/A";}
      try {priceHtml[1] = ukpricepattern.exec(ukHttp.responseText)[1];}
      catch(err) {priceHtml[1] = "N/A";}
      try {priceHtml[2] = eupricepattern.exec(euHttp.responseText)[1];}
      catch(err) {priceHtml[2] = "N/A";}
      
      try {price[0] = parseFloat(usvaluepattern.exec(priceHtml[0])[1]);}
      catch(err) {price[0] = null;}
      try {price[1] = parseFloat(ukvaluepattern.exec(priceHtml[1])[1]);}
      catch(err) {price[1] = null;}
      try {price[2] = 
          parseFloat(euvaluepattern.exec(priceHtml[2])[1].replace(",", ".").replace("--", "00"));}
      catch(err) {price[2] = null;}
      
      pricenodes[i].innerHTML =           
          "US: "     + priceHtml[0] + 
          "<br>UK: " + priceHtml[1] + " <span id='gbp" + i + "'></span>" +
          "<br>EU: " + priceHtml[2] + " <span id='eur" + i + "'></span>";
      
      if (price[0] && price[1]) {
        var ukscript2 = document.createElement("script");
        ukscript2.setAttribute("type", "text/javascript");
        ukscript2.innerHTML = "document.getElementById('gbp" + i + 
            "').innerHTML = getDifference('GBP', " + price[0] + 
            ", " + price[1] + ");";
        document.body.insertBefore(ukscript2, someNode);            
      }
      
      if (price[0] && price[2]) {
        var euscript2 = document.createElement("script");
        euscript2.setAttribute("type", "text/javascript");
        euscript2.innerHTML = "document.getElementById('eur" + i + 
            "').innerHTML = getDifference('EUR', " + price[0] + 
            ", " + price[2] + ");";
        document.body.insertBefore(euscript2, someNode);            
      }
    }
    
    //Remove cookie that may store the wrong currency for this region
    document.cookie = "fakeCC=; expires=Fri, 27 Jul 2001 02:47:11 UTC; path=/";
  }
}

