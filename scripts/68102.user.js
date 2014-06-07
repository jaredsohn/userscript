// ==UserScript==
// @name         Steam price comparison
// @version      1.2.0
// @namespace    http://code.google.com/p/steam-prices/
// @description  Displays prices from all regions in the Steam webshop
// @copyright    2009+, Tor (http://code.google.com/p/steam-prices/)
// @homepage     http://code.google.com/p/steam-prices/
// @license      MIT License; http://www.opensource.org/licenses/mit-license.php
// @include      http://store.steampowered.com/app/*
// @include      https://store.steampowered.com/app/*
// @include      http://store.steampowered.com/sub/*
// @include      https://store.steampowered.com/sub/*
// @match        http://store.steampowered.com/app/*
// @match        https://store.steampowered.com/app/*
// @match        http://store.steampowered.com/sub/*
// @match        https://store.steampowered.com/sub/*
// ==/UserScript==

/* 
 * Configuration
 * If you want to modify the parameters of the script, 
 * please make your changes here.
 */

//If set to true, will show the monetary difference instead of percent difference
var showValueDifference = false;

//If set to true, UK prices will be displayed (in addition to US and EU prices)
var showUkPrice = true;

/*
 * If set to true, the script will display prices from both of Valve's
 * price regions, or "tiers". If false, the script will show only your 
 * country's prices. More details on the tiers can be found here:
 * http://steamunpowered.eu/page.php?id=139
 * For games where prices are equal in all regions, the script will display 
 * only one value no matter what this setting is configured to.
 */
var showTieredEuPrices = true;


//If set to true, AU prices will be displayed (in addition to US and EU prices)
var showAUPrice = true;

//These parameters contain one country code from each of the European tiers.
var tier1cc = "se";
var tier2cc = "no";

//Change this parameter to add VAT to the US price displayed.
//E.g. if set to 19, the script will increase US prices by 19%.
var usVat = 0;

/* 
 * End of configuration area
 * Don't make changes below this line unless you know what you're doing.
 */
 
 
var weHaveSale = false;
var urlGamePattern = 
  new RegExp(/^https?:\/\/store.steampowered.com\/app\/\d+/i);
var urlPackagePattern = 
  new RegExp(/^https?:\/\/store.steampowered.com\/sub\/\d+/i);
var usHttp;
var ukHttp;
var eu1Http;
var eu2Http;
var auHttp;
var pricenodes = new Array();
var originalprices = new Array();
var ukscript;
var euscript;
var auscript;
var someNode;
var tier1text = "Albania, Andorra, Austria, Belgium, Denmark, Finland, " + 
  "France, Germany, Ireland, Liechtenstein, Luxembourg, Macedonia, " + 
  "Netherlands, Sweden, Switzerland";
var tier2text = "Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, " + 
  "Czech Republic, Estonia, Greece, Hungary, Italy, Latvia, Lithuania, " + 
  "Malta, Monaco, Montenegro, Norway, Poland, Portugal, Romania, San Marino, " +
  "Serbia, Slovakia, Slovenia, Spain, Vatican City";

//Test the URL to see if we're on a game page
if ((urlGamePattern.test(document.documentURI) || 
      urlPackagePattern.test(document.documentURI)) && 
      !window.location.search.match("cc=")) {
  someNode = document.getElementById("global_header");

  //For security reasons, JavaScript code isn't allowed to fetch data from
  //external websites. Instead, we insert a HTML <script> tag that fetches
  //external javascript files. These will help with currency conversion.
  if (showUkPrice) {
    ukscript = document.createElement("script");
    ukscript.setAttribute("type", "text/javascript");
    ukscript.setAttribute("src", 
        "http://javascriptexchangerate.appspot.com/?from=USD&to=GBP");
    document.body.insertBefore(ukscript, someNode);
    ukscript2 = document.createElement("script");
    ukscript2.setAttribute("type", "text/javascript");
    ukscript2.setAttribute("src", 
        "http://javascriptexchangerate.appspot.com/?from=GBP&to=USD");
    document.body.insertBefore(ukscript2, someNode);
  }
            
  euscript = document.createElement("script");
  euscript.setAttribute("type", "text/javascript");
  euscript.setAttribute("src", 
      "http://javascriptexchangerate.appspot.com/?from=USD&to=EUR");
  document.body.insertBefore(euscript, someNode);
  euscript2 = document.createElement("script");
  euscript2.setAttribute("type", "text/javascript");
  euscript2.setAttribute("src", 
      "http://javascriptexchangerate.appspot.com/?from=EUR&to=USD");
  document.body.insertBefore(euscript2, someNode);

  /* not needed, since price is in USD for the Australian site
     but converting to USD to USD will let us change the script easily 
     in case the Australian steam site moves to AUD */
/*  if (showAUPrice) {
    auscript = document.createElement("script");
    auscript.setAttribute("type", "text/javascript");
    auscript.setAttribute("src", 
        "http://javascriptexchangerate.appspot.com/?from=USD&to=USD");
    document.body.insertBefore(auscript, someNode);
  }*/

  //Test to see if the game has a price
  divnodes = document.getElementsByTagName("div");
  for (i=0; i<divnodes.length; i++) {
	if (divnodes[i].getAttribute("class") == "discount_block game_purchase_discount") {
	  divnodes[i].setAttribute("class","game_purchase_price price");
	  weHaveSale = true;
	  pricenodes.push(divnodes[i]);
	  if (!showTieredEuPrices)
	    originalprices.push(divnodes[i].innerHTML);
      divnodes[i].innerHTML = "<span style='color: rgb(136, 136, 136);'>Computing...</span>";
      divnodes[i].style.textAlign = "left";
    }
    else if (divnodes[i].getAttribute("class") == "game_purchase_price price") {
	  weHaveSale = false;
      pricenodes.push(divnodes[i]);
      if (!showTieredEuPrices)
        originalprices.push(divnodes[i].innerHTML);
      divnodes[i].innerHTML += 
          "<br/><span style='color: rgb(136, 136, 136);'>Computing...</span>"
      divnodes[i].style.textAlign = "left";
    }
  }
  
  //If the current page contains a price, 
  //start downloading regional versions of this page
  if (pricenodes.length > 0) {
    //Create cookie that prevents the age verification 
    //dialog from breaking the script
    if (document.cookie.indexOf("birthtime") < 0) { //Check if cookie exists
      var date = new Date();
      date.setTime(date.getTime()+(365*24*60*60*1000));//Expires in 365 days
      document.cookie = "birthtime=1; expires=" //birthtime is set to 1 Jan 1900
        + date.toGMTString() + "; path=/"
    }
    
    //Set up HTTP requests
    var baseURL;
    if (window.location.search) {
      baseURL = document.documentURI + "&";
    } else {
      baseURL = document.documentURI + "?";
    }
    
    usHttp = new XMLHttpRequest();
    usHttp.onreadystatechange=stateChanged;
    usHttp.open("GET",baseURL+"cc=us",true);
    usHttp.send(null);
  
    if (showUkPrice) {
      ukHttp = new XMLHttpRequest();
      ukHttp.onreadystatechange=stateChanged;
      ukHttp.open("GET",baseURL+"cc=uk",true);
      ukHttp.send(null);
    }
   
    if (showTieredEuPrices) {
      eu1Http = new XMLHttpRequest();
      eu1Http.onreadystatechange=stateChanged;
      eu1Http.open("GET",baseURL+"cc="+tier1cc,true);
      eu1Http.send(null);
      eu2Http = new XMLHttpRequest();
      eu2Http.onreadystatechange=stateChanged;
      eu2Http.open("GET",baseURL+"cc="+tier2cc,true);
      eu2Http.send(null);
    }
  
    if (showAUPrice) {
      auHttp = new XMLHttpRequest();
      auHttp.onreadystatechange=stateChanged;
      auHttp.open("GET",baseURL+"cc=au",true);
      auHttp.send(null);
    }

    var style = document.createElement("style");
    style.type = "text/css";
    document.getElementsByTagName('head')[0].appendChild(style);
  
    var s = document.styleSheets[document.styleSheets.length - 1];
    s.insertRule(".game_area_purchase_game .game_purchase_action{height:auto;bottom:auto}", s.cssRules.length);
    s.insertRule(".game_purchase_action_bg{height:auto}", s.cssRules.length);
    s.insertRule(".game_purchase_action  .game_purchase_price{height:auto;padding-bottom:8px}", s.cssRules.length);
    
    var margin = 30;
    if (showUkPrice) margin += 16;
    if (showTieredEuPrices) margin += 16;
    if (showAUPrice) margin += 16;
    s.insertRule(".game_area_purchase_game{margin-bottom:"+margin+"px}", s.cssRules.length);
  }
}

//Extracts prices from the downloaded HTML and displays them
function stateChanged() {
  //Check to see of all scripts have completed
  if (usHttp.readyState != 4) return;
  if (showUkPrice && ukHttp.readyState != 4) return;
  if (showTieredEuPrices && (eu1Http.readyState != 4 || 
      eu2Http.readyState != 4)) return;

  if (showAUPrice && auHttp.readyState != 4) return;
  //All requests completed, good to go
  
  //The pattern variables can't be reused for some reason, so just duplicate
  //The pattern variables can't be reused for some reason, so just duplicate
  if(weHaveSale == true)
  {
	  var salepattern =
		new RegExp(/<div class="discount_pct">([^<]+?)<\/div>/gi);
	  var pricepattern0 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
	  var pricepattern1 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
	  var pricepattern2 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
	  var pricepattern3 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
	  var pricepattern4 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
	  var pricepattern5 = 
		new RegExp(/<div class="discount_final_price">([^<]+?)<\/div>/gi);
  }
  else
  {
	  var pricepattern0 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
	  var pricepattern1 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
	  var pricepattern2 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
	  var pricepattern3 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
	  var pricepattern4 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
	  var pricepattern5 = 
		new RegExp(/<div class="game_purchase_price price">([^<]+?)<\/div>/gi);
  }

  var priceHtml = new Array(5);
  var mypriceHtml;
  var usvaluepattern = new RegExp(/&#36;([\d\.]+)/i);
  var ukvaluepattern = new RegExp(/&#163;([\d\.]+)/i);
  var euvaluepattern = new RegExp(/([\d,-]+)/i);
  var auvaluepattern = new RegExp(/&#36;([\d\.]+)[\s]USD/i);
  var price = new Array(5);
  var myprice;
  var sale;
    
  var calcscript = "function getDifference(currency, usdPrice, localPrice) " + 
      "{\n" +
      "  var showValueDifference = "+showValueDifference+"; var usdForeign; var usdConverted; var lessmore; var diff;\n" +
      "  if (currency == 'GBP') {usdConverted = USDtoGBP(usdPrice); usdForeign = GBPtoUSD(localPrice); }\n" +
      "  else if (currency == 'EUR') {usdConverted = USDtoEUR(usdPrice); usdForeign = EURtoUSD(localPrice); }\n" +
//    "  else if (currency == 'USD') {usdConverted = USDtoUSD(usdPrice); usdForeign = USDtoUSD(localPrice); }\n" +
      "  else if (currency == 'USD') {usdConverted = usdPrice; usdForeign = localPrice; }\n" +
	  "  if (showValueDifference == true) {\n" +
	  "    if(usdForeign != usdPrice) {return ' ($' + (Math.round((Math.max(usdForeign,usdPrice)-Math.min(usdForeign,usdPrice))*100)/100) + ' More)'; }\n" +
	  "    else { return ' (Equal)'; }\n" +
	  "  } else {\n" +
      "    diff = Math.abs((localPrice/usdConverted)*100-100);\n" +
      "    if (localPrice >= usdConverted) {lessmore = 'higher';}\n" +
      "    else {lessmore = 'lower';}\n" +
      "    return ' (' + Math.round(diff) + '% ' + lessmore + ')';\n" +
	  "  }"+
	  "}";
  
  var calculatescript = document.createElement("script");
  calculatescript.setAttribute("type", "text/javascript");
  calculatescript.innerHTML = calcscript;
  document.body.insertBefore(calculatescript, someNode);
  
  for (i=0; i<pricenodes.length; i++) {
    if (!showTieredEuPrices) {
      try {
        var myvaluepattern = new RegExp(/([\d,-]+)/i);
        mypriceHtml = originalprices[i];
        myprice = parseFloat(myvaluepattern.exec(originalprices[i]
          )[1].replace(",", ".").replace("--", "00"));
      }
      catch(err) {
        if (!mypriceHtml || mypriceHtml.length == 0)
          mypriceHtml = "N/A";
        myprice = null;
      }
    }

    //Search for the price information in the downloaded HTML documents
    try {
      priceHtml[0] = pricepattern1.exec(usHttp.responseText)[1];
	  if(weHaveSale == true)
		sale = salepattern.exec(usHttp.responseText)[1];
      price[0] = parseFloat(usvaluepattern.exec(priceHtml[0])[1]);
      if (usVat > 0) {
        price[0] = price[0] * (1 + (usVat / 100));
        priceHtml[0] = "$" + price[0].toFixed(2);
      }
    }
    catch(err) {
      //Prevent search from looping around and starting at the beginning
        if (err.message.search("responseText\\) is null") != -1) {
          usHttp = null; priceHtml[0] = "N/A"; sale = "N/A";
        }
      if (!priceHtml[0] || priceHtml[0].length == 0) {
        priceHtml[0] = "N/A"; sale = "N/A";
	  }
      price[0] = null;
    }
	
	if(weHaveSale == true) 
		pricenodes[i].innerHTML = "<div class='discount_pct'>"+sale+"</div>";
	else
		pricenodes[i].innerHTML = "";

    pricenodes[i].innerHTML += "US: " + priceHtml[0];
    if (usVat > 0)
      pricenodes[i].innerHTML += " (inc. VAT)"; 
    
    if (showUkPrice) {
      try {
        priceHtml[1] = pricepattern2.exec(ukHttp.responseText)[1];
        price[1] = parseFloat(ukvaluepattern.exec(priceHtml[1])[1]);
      }
      catch(err) {
        //Prevent search from looping around and starting at the beginning
        if (err.message.search("responseText\\) is null") != -1) {
          ukHttp = null; priceHtml[1] = "N/A";
        }
        if (!priceHtml[1] || priceHtml[1].length == 0)
          priceHtml[1] = "N/A";
        price[1] = null;
      }
      pricenodes[i].innerHTML += "<br>UK: " + priceHtml[1] 
          + " <span id='gbp" + i + "'></span>"
      
      createGetDifferenceScript("gbp" + i, "GBP", price[0], price[1]);
    }

  
    if (showTieredEuPrices) {
      try {
        priceHtml[2] = pricepattern3.exec(eu1Http.responseText)[1];
      }
      catch(err) {
        //Prevent search from looping around and starting at the beginning
        if (err.message.search("responseText\\) is null") != -1) {
          eu1Http = null; priceHtml[2] = "N/A";
        }
        if (!priceHtml[2] || priceHtml[2].length == 0)
          priceHtml[2] = "N/A";
      }
      try {
        priceHtml[3] = pricepattern4.exec(eu2Http.responseText)[1];
      }
      catch(err) {
        //Prevent search from looping around and starting at the beginning
        if (err.message.search("responseText\\) is null") != -1) {
          eu2Http = null; priceHtml[3] = "N/A";
        }
        if (!priceHtml[3] || priceHtml[3].length == 0)
          priceHtml[3] = "N/A";
      }
      
      var t;
      for (t = 2; t < 4; t++) {
        try {price[t] = parseFloat(euvaluepattern.exec(
            priceHtml[t])[1].replace(",", ".").replace("--", "00"));}
        catch(err) {price[t] = null;}
      }
      
      //If tier 1 and 2 prices are equal, display only one EU price
      if (price[2] == price[3]) {
        pricenodes[i].innerHTML += "<br>EU: " + priceHtml[2] 
            + " <span id='eur1_" + i + "'></span>";
      } else { //...but if they differ, display both
        pricenodes[i].innerHTML += "<br><span title='" + tier1text
            + "'>EU tier 1: " + priceHtml[2] 
            + " <span id='eur1_" + i + "'></span></span>";
        pricenodes[i].innerHTML += "<br><span title='" + tier2text
            + "'>EU tier 2: " + priceHtml[3] 
            + " <span id='eur2_" + i + "'></span></span>";
      }
      createGetDifferenceScript("eur1_" + i, "EUR", price[0], price[2]);
      createGetDifferenceScript("eur2_" + i, "EUR", price[0], price[3]);
    } else {//Ignore country codes, only display price for YOUR region
      pricenodes[i].innerHTML += "<br>You: " + mypriceHtml 
            + " <span id='myprice" + i + "'></span>";
      createGetDifferenceScript("myprice" + i, "EUR", price[0], myprice);
    }
  
    if (showAUPrice) {
      try {
        priceHtml[4] = pricepattern5.exec(auHttp.responseText)[1];
        price[4] = parseFloat(auvaluepattern.exec(priceHtml[4])[1]);
      }
      catch(err) {
        //Prevent search from looping around and starting at the beginning
        if (err.message.search("responseText\\) is null") != -1) {
          auHttp = null; priceHtml[4] = "N/A";
        }
        if (!priceHtml[4] || priceHtml[4].length == 0)
          priceHtml[4] = "N/A";
        price[4] = null;
      }
      pricenodes[i].innerHTML += "<br>AU: " + priceHtml[4] 
          + " <span id='aud" + i + "'></span>"
      
      createGetDifferenceScript("aud" + i, "USD", price[0], price[4]);
    }

  }
  
  //Remove cookie that may store the wrong currency for this region
  document.cookie = "fakeCC=; expires=Fri, 27 Jul 2001 02:47:11 UTC; path=/";
}

function createGetDifferenceScript(elementid, currencystring, price1, price2) {
  if (price1 && price2) {
    var getdiff = document.createElement("script");
    getdiff.setAttribute("type", "text/javascript");
    getdiff.innerHTML = "var node = document.getElementById('" + elementid 
      + "');" + "if (node)"
      + "node.innerHTML = getDifference('" + currencystring + "', " + price1 + 
        ", " + price2 + ");";
    document.body.insertBefore(getdiff, someNode);
  }
}