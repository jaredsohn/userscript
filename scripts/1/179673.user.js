// ==UserScript==
// @name        EGS Price
// @version     1 Beta
// @namespace   http://steamunpowered.eu/comparison-script/
// @description Displays prices from all regions in the Steam store and convert them to your local currency
// @copyright   2011+, KindDragon; 2010+, Zuko; Original author: Tor (http://code.google.com/p/steam-prices/)
// @homepage    http://userscripts.org/scripts/show/149928
// @downloadURL https://userscripts.org/scripts/source/149928.user.js
// @updateURL   https://userscripts.org/scripts/source/149928.meta.js
// @icon        data:image/gif;base64,R0lGODlhIAAgAPcAAAAAAAAAAQEAAgIAAwACAAECAQECAgICAwEABAIBBQMCBAICBQIDBgAEAwMEBgIEBwQDBQQEBgYGBgQGBwIDCQQFCAUECQYFCgUHCAQGCQYHCgYHCwYHDAQHDgUHDwMIDQcJCQYICwcKCgcIDAcIDQUJDgYJDwYLDQkHCQoGCgwFCQ8GDQgJDAgIDQkIDgYJEAQJEQcKEAYMFQQPGAoKEggLFQoMEQkNEwgMFAsOFAkPGAoQFQkQFwoRGAoRGQgQGgwTGw8VHxATHxEUGhMXHBYXHg4RIA8YIg4bLBEaIxEZJhIaJhUZIBQYIRccIRYcKhocJBIgMBooMiYTHCoVHCUbIz0ZJiEjJyImKiIlLSInLCYmKiQnKygqLyQpMScvOyksMiksMykvNy0vNS4wNS8wNygxPCswPiwzOzE0OjI2OzI3PTU3OzQ6PyQxQi86RTM5QjY7QDQ8RTg8QDk8RDs+RjE/UD1ARz9CRz5ERz9BSD9CSjxDSzlIWUoiLUgqOVggNUA/R3ErQ0BDS0FFTUJGTkVIT0ZKT0ZJUEBPX0ZPW0pOVEpOVk1QVU5RV09SV09RWlFWWVZTWVVZXFZZXVVaXVVaXlZcXUVSY0lZZ05edlJXY1VYYFVZZFVfa1lcZFpdZVpeZVtfZl9ial9kal5lb1pndFtsfF9sfGBjamFkamBka2Blbmpxe21ye3NyeXJ1fHR3fnF4e3R4fW15i3V7hnl8hH1/iXuBhX2AhnyAh32BiH2CiIGGioGEjYGIj4OLlI6Vmo+WnZeYnZKaoZWcpqevuKWvuqiutKWwt62zuq20vK22vrKyubO2vbC3vrS2vba6vrW8vrO3wrW7w7e8wra8xrq9w7m/w7m/xbrAwrnAx8LFzMDFzsPM0dLW29ba3Nfd39jZ2djb3NTa4OLk6OXn6+fo5+Lo6ubp6e7z8/X29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAgACAAAAj/ACUEAECwoMGDCBMGEJiwoUOEAx9KnEixosWLGDNq3Mix4QAEAUKKFClAQMSRBEeGTClgwICSARAkSFDyYwKQAFyaDDDAQICWB0oCQEAjzyUtJeJYqhQph4lGlCaBWXCgyKEYBjLoAfPByaMwXS4EWKCK3DFiOlx5S5esiRJz25htctChlbovDXxokxYFGLo3hiwIgNDLmiYpJWSg6oaEwhJztDIdMWAkm7haHoBgW3eq3LkQEBYIWOClGLdpQx54gvYjQJJv1IxBYXAmnKRoQnoocwZu2bgIIheIsdPnGRMKiobNGBCkWSI3RGCUioasmhkewUwJw3QtQkoFhHzxsmJkwwIaUi8i7JCF69YdHKzkLOnE54YoODWe5FqQksGeMXMQcsUWeAQyBRVWVAFJGWvUgYgaWCzSBheOsMAGGWlMUFAFsYRBhy2cfPLLK4D4IcgfqXACCiy2hDLILqsUoksWozAyCwYFHSACBxuQMAIJLpywAgoqpPBACEhqkEEIGmzQggskcDACCAYUFAABBhVQQEhaEqCSSAV0JOaYZJZp5plopqnmmmtGdOZCbpK5UEAAOw==
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @include     http://store.steampowered.com/app/*
// @include     https://store.steampowered.com/app/*
// @include     http://store.steampowered.com/sub/*
// @include     https://store.steampowered.com/sub/*
// @include     http://store.steampowered.com/sale/*
// @include     https://store.steampowered.com/sale/*
// @match       http://store.steampowered.com/app/*
// @match       https://store.steampowered.com/app/*
// @match       http://store.steampowered.com/sub/*
// @match       https://store.steampowered.com/sub/*
// @match       http://store.steampowered.com/sale/*
// @match       https://store.steampowered.com/sale/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// ==/UserScript==

// To install save script to disk under name CompareSteamPrices.user.js and then open this file in Firefox

// Russian, Brazilian and CIS prices added by KindDragon (https://github.com/KindDragon)

/*
 * Configuration
 * If you want to modify the parameters of the script,
 * please make your changes here.
 */

// first time init, you can changes this values in about:config page
if (GM_listValues().length == 0)
{
	GM_setValue("showYourLocalCurrency", true);
	GM_setValue("showUSPrice", true);
	GM_setValue("showUKPrice", true);
	GM_setValue("showTieredEuPrices", true);
	GM_setValue("showAUPrice", true);
	GM_setValue("showRUPrice", true);
	GM_setValue("showCISPrice", true);
	GM_setValue("showBRPrice", true);
	GM_setValue("usVat", 0);
}

//If set to true, prices converted to your local currency will be displayed
var showYourLocalCurrency = GM_getValue("showYourLocalCurrency", true);
var yourLocalCurrency = GM_getValue("yourLocalCurrency");
//yourLocalCurrency = "UAH";

//If set to true, US prices will be displayed
var showUSPrice = GM_getValue("showUSPrice", true);

//If set to true, UK prices will be displayed
var showUKPrice = GM_getValue("showUKPrice", true);

/*
 * If set to true, the script will display prices from both of Valve's
 * price regions, or "tiers". If false, the script will show only your
 * country's prices. More details on the tiers can be found here:
 * http://steamunpowered.eu/page.php?id=139
 * For games where prices are equal in all regions, the script will display
 * only one value no matter what this setting is configured to.
 */
var showTieredEuPrices = GM_getValue("showTieredEuPrices", true);

//If set to true, Australian prices will be display
var showAUPrice = GM_getValue("showAUPrice", true);

//If set to true, Russian prices will be displayed
var showRUPrice = GM_getValue("showRUPrice", true);

//If set to true, CIS prices will be displayed
var showCISPrice = GM_getValue("showCISPrice", true);

//If set to true, Brazilian prices will be displayed
var showBRPrice = GM_getValue("showBRPrice", true);

//These parameters contain one country code from each of the European tiers.
var tier1cc = "se";
var tier2cc = "pl";
//These parameters contain one country code from CIS countries.
var CIScc = "ua";
//Change this parameter to add VAT to the US price displayed.
//E.g. if set to 19, the script will increase US prices by 19%.
var usVat = GM_getValue("usVat", 0);

/*
 * End of configuration area
 * Don't make changes below this line unless you know what you're doing.
 */

var urlGamePattern = new RegExp(/^https?:\/\/store.steampowered.com\/(?:app|sub)\/\d+\/?(?:\?(?:(?!cc)\w+=[^&]*&?)*)?$/i);
var urlSalePattern = new RegExp(/^https?:\/\/store.steampowered.com\/sale\/\w+\/?(?:\?(?:(?!cc)\w+=[^&]*&?)*)?$/i);
//var urlGenrePattern = new RegExp(/^https?:\/\/store.steampowered.com\/genre\/.+\/?/i);

var comparison = "";
var suffix = "ru";
var firstPrice;
var newDiv = "<div id=\"priceWars\" class=\"game_area_purchase_game\" style=\"padding-bottom: 16px;z-index:-1;\"><span style=\"font-size: 14px; color: #FFFFFF; font-weight: bold;\">EGS Game Store:</span><br><div id=\"prices\">ราคาโอน 1 pуб. = 1.30 บาท | ราคาทรู 1 pуб. = 1.60 บาท</div></div>";
document.getElementsByClassName('game_purchase_action_bg')[0].parentNode.parentNode.parentNode.innerHTML += newDiv;

var pricenodes = new Array();
var pricenodes_conly = new Array();
var originalprices = new Array();
var originalprices_conly = new Array();
var someNode;
var exchangerateScripts = {};
//var tier1text = "Albania, Andorra, Austria, Belgium, Denmark, Finland, " +
//                "France, Germany, Ireland, Liechtenstein, Luxembourg, Macedonia, " +
//                "Netherlands, Sweden, Switzerland";
//var tier2text = "Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, " +
//                "Czech Republic, Estonia, Greece, Hungary, Italy, Latvia, Lithuania, " +
//                "Malta, Monaco, Montenegro, Norway, Poland, Portugal, Romania, San Marino, " +
//                "Serbia, Slovakia, Slovenia, Spain, Vatican City";
//var cistext   = "Armenia, Azerbaijan, Belarus, Georgia, Kazakhstan, Kyrgyzstan, " +
//                "Moldova, Tajikistan, Turkmenistan, Uzbekistan, Ukraine";

function AddExchangeRateScript(fromCurrency, toCurrency, skipEqual) {
    if (skipEqual && fromCurrency == toCurrency)
        return;
    var key = fromCurrency + toCurrency;
    if (!(key in exchangerateScripts))
    {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src",
            "http://javascriptexchangerate.appspot.com/?from=" + fromCurrency + "&to=" + toCurrency);
        document.body.insertBefore(script, someNode);
        exchangerateScripts[key] = script;
    }
}

function SteamPage(countryName, countryCode, currencyCode, show, valuepattern, vat, globalCountryName, dependedPage) {
    this.countryName = countryName;
    this.countryCode = countryCode;
    this.currencyCode = currencyCode;
    this.show = show;
    this.valuepattern = valuepattern;
    this.vat = typeof(vat)==='undefined' ? 0 : vat;
    this.globalCountryName = globalCountryName;
    this.dependedPage = dependedPage;
    this.http;

    this.getCountryPageUrl = function() {
        var pos=document.documentURI.indexOf('?');
        if (pos < 0)
            return document.documentURI+"?cc="+this.countryCode;
        else
            return document.documentURI+"&cc="+this.countryCode;
    };

    this.findPrice = function() {
        if (!this.show)
            return;
        //Search for the price information in the downloaded HTML documents
        try {
            this.priceHtml = this.pricepattern.exec(this.http.responseText)[1];
            this.price = parseFloat(this.valuepattern.exec(this.priceHtml)[1].replace(",", ".").replace("--", "00"));
            if (this.vat > 0) {
                this.price = this.price * (1 + (this.vat / 100));
                this.priceHtml = "$" + this.price.toFixed(2);
            }
        }
        catch (err) {
            //Prevent search from looping around and starting at the beginning
            if (err.message.search("responseText\\) is null") != -1) {
                this.http = null; this.priceHtml = "N/A";
            }
            if (!this.priceHtml || this.priceHtml.length == 0)
                this.priceHtml = "N/A";
            this.price = null;
        }
    };

    this.processPrice = function(i, pricenode, first) {
        var tiersEqual = false;
        if (typeof this.dependedPage != 'undefined')
        {
            tiersEqual = this.price == this.dependedPage.price;
            if (tiersEqual)
                this.dependedPage.priceHtml = null;
        }
        var countryName = tiersEqual ? this.globalCountryName : this.countryName;
        var spanId = this.countryCode + "_" + i;
        var html = countryName + ": " + this.priceHtml;
		if (this.price)
		{
			if (this.vat > 0)
				html += " (inc. " + this.vat + "% VAT)";
			if (showYourLocalCurrency)
				html +=  " <span id='" + spanId + "' style='font-weight: bold;'>" + 
					(this.currencyCode != yourLocalCurrency ? this.price : "") + "</span>";
		}
		if (first)
			pricenode.innerHTML = html;
		else
			pricenode.innerHTML += "<br>\n" + html;
		if (this.price)
		{
			if (showYourLocalCurrency && this.currencyCode != yourLocalCurrency) {
				var tmp0 = document.createElement("script");
				tmp0.setAttribute("type", "text/javascript");
				tmp0.innerHTML = "var node = document.getElementById('" + spanId + "');" +
					"node.innerHTML = \"(\" + " + getConvFunction(this.currencyCode, "node") + " + \" " + yourLocalCurrency;
				if (this.vat > 0)
					tmp0.innerHTML += " inc. " + this.vat + "% VAT";
				tmp0.innerHTML += ")\";";
				document.body.insertBefore(tmp0, someNode);
			}
			if (baseCountry.countryCode != this.countryCode)
				createGetDifferenceScript(spanId, this.currencyCode, baseCountry.price, this.price);
		}
    };
}

var usvaluepattern = new RegExp(/&#36;([\d\.]+)/i);
var ukvaluepattern = new RegExp(/&#163;([\d\.]+)/i);
var euvaluepattern = new RegExp(/([\d,-]+)&#8364;/i);
var auvaluepattern = new RegExp(/&#36;([\d\.]+)[\s]USD/i);
var ru2valuepattern = new RegExp(/([\d\.]+) p&#10915;&#1073;./i);
var ruvaluepattern = new RegExp(/([\d\.]+) p&#10915;&#1073;./i);
var brvaluepattern = new RegExp(/&#82;&#36; ([\d,]+)/i);

var pageCurrency = null;

var us	= new SteamPage('US',		'us', 'USD', showUSPrice, usvaluepattern, usVat);
var uk	= new SteamPage('UK',		'uk', 'GBP', showUKPrice, ukvaluepattern, 0);
var eu2	= new SteamPage('EU Tier 2', tier2cc, 'EUR', showTieredEuPrices, euvaluepattern, 0);
var eu1	= new SteamPage('EU Tier 1', tier1cc, 'EUR', showTieredEuPrices, euvaluepattern, 0, 'EU', eu2);
var au	= new SteamPage('AU',		'au', 'USD', showAUPrice, auvaluepattern, 0);
var ru	= new SteamPage('ราคา',		'ru', 'RUB', showRUPrice, ruvaluepattern, 0);
var ru2	= new SteamPage('ราคาทรู',		'ru', 'RUB2', showRUPrice, ru2valuepattern, 0);
var cis	= new SteamPage('CIS',		CIScc, 'USD', showCISPrice, auvaluepattern, 0);
var br	= new SteamPage('BR',		'br', 'BRL', showBRPrice, brvaluepattern, 0);

var baseCountry = us;
var baseCurrency = baseCountry.currencyCode;
baseCountry.show = true;

var pages = [
    ru,
];

function CurrencyPattern(valuepattern, currencyCode) {
    this.pattern = valuepattern;
    this.currency = currencyCode;
}

var valuepatterns = [ 
	new CurrencyPattern(new RegExp(/([\d\.]+) p\u0443\u0431./i), 'RUB'),
    new CurrencyPattern(new RegExp(/([\d\.]+) p\u0443\u0431./i), 'RUB2'),
];

function detectCurrency(price)
{
	if (pageCurrency != null)
		return;
	price = price.replace(/^\s+|\s+$/g, "4544");
	for (var i = 0; i < valuepatterns.length; i++)
		if (valuepatterns[i].pattern.exec(price))
		{
			pageCurrency = valuepatterns[i].currency;
			if (yourLocalCurrency == null)
				yourLocalCurrency = pageCurrency;
			return;
		}
}

//Test the URL to see if we're on a game page
if (urlGamePattern.test(document.documentURI) || urlSalePattern.test(document.documentURI))
{
	if (document.body)
		init()
	else
		window.addEventListener('DOMContentLoaded',init,false);
}

function init()
{
    someNode = document.getElementById("global_header");

    //For security reasons, JavaScript code isn't allowed to fetch data from
    //external websites. Instead, we insert a HTML <script> tag that fetches
    //external javascript files. These will help with currency conversion.
    for (var i = 0; i < pages.length; i++)
        if (pages[i].show)
            AddExchangeRateScript(baseCurrency, pages[i].currencyCode, false);	

    var game_purchase_price = false;
    var discount_final_price = false;
    //Test to see if the game has a price
    divnodes = document.getElementsByTagName("div");
    for (i=0; i<divnodes.length; i++) {
        if (divnodes[i].getAttribute("class") == "game_purchase_price price") {
            game_purchase_price = true;
            pricenodes.push(divnodes[i]);
            originalprices.push(divnodes[i].innerHTML);
			detectCurrency(divnodes[i].innerHTML);
            divnodes[i].innerHTML +=
            "<br/><span style='color: rgb(136, 136, 136);'>Collecting data...</span>"
            divnodes[i].style.textAlign = "left";
        }
        if ((divnodes[i].getAttribute("class") == "game_area_dlc_price") && (divnodes[i].innerHTML.indexOf("discount_final_price") == -1)) {
            if (showYourLocalCurrency && pageCurrency != yourLocalCurrency) {
                pricenodes_conly.push(divnodes[i]);
                originalprices_conly.push(divnodes[i].innerHTML);
				detectCurrency(divnodes[i].innerHTML);
                divnodes[i].innerHTML +=
                "<span style='color: rgb(136, 136, 136);'>Collecting data...</span>"
                divnodes[i].style.textAlign = "left";
            }
        } else if ((divnodes[i].getAttribute("class") == "discount_final_price") && (divnodes[i].innerHTML.indexOf("<") == -1)) {
            if (divnodes[i-4].parentNode.className != 'game_area_dlc_price') {
                discount_final_price = true;
                pricenodes.push(divnodes[i]);
                originalprices.push(divnodes[i].innerHTML);
				detectCurrency(divnodes[i].innerHTML);
                divnodes[i].innerHTML +=
                "<br/><span style='color: rgb(136, 136, 136);'>Collecting data...</span>"
                divnodes[i].style.textAlign = "left";
            } else if (showYourLocalCurrency && pageCurrency != yourLocalCurrency) {
                pricenodes_conly.push(divnodes[i]);
                originalprices_conly.push(divnodes[i].innerHTML);
				detectCurrency(divnodes[i].innerHTML);
                divnodes[i].innerHTML +=
                "<span style='color: rgb(136, 136, 136);'> Collecting data...</span>"
                divnodes[i].style.textAlign = "right";
            }
        }
    }

	if (showYourLocalCurrency) {
		for (var j = 0; j < pages.length; j++)
			if (pages[j].show)
				AddExchangeRateScript(pages[j].currencyCode, yourLocalCurrency, true);
		AddExchangeRateScript(pageCurrency, yourLocalCurrency, true);
	}

    //If the current page contains a price,
    //start downloading regional versions of this page
    if ((pricenodes.length > 0) || (pricenodesdlc.length > 0)) {
        //Create cookie that prevents the age verification
        //dialog from breaking the script
        if (document.cookie.indexOf("birthtime") < 0) { //Check if cookie exists
            var date = new Date();
            date.setTime(date.getTime()+(365*24*60*60*1000));//Expires in 365 days
            document.cookie = "birthtime=1; expires=" //birthtime is set to 1 Jan 1900
            + date.toGMTString() + "; path=/"
        }

        //Set up HTTP requests
        for (var i = 0; i < pages.length; i++)
            if (pages[i].show)
            {
                var http = new window.XMLHttpRequest();
                http.onreadystatechange=stateChanged;
                http.open("GET",pages[i].getCountryPageUrl(),true);
                http.send(null);
                pages[i].http = http;
            }

        var style = document.createElement("style");
        style.type = "text/css";
        style.title = 'compareSteamPrices';
        document.getElementsByTagName('head')[0].appendChild(style);

        // Get stylesheet object
        var s;
        for(i in document.styleSheets )
            if( document.styleSheets[i].title == 'compareSteamPrices' )
                s = document.styleSheets[i];

        if (game_purchase_price)
            s.insertRule(".game_area_purchase_game .game_purchase_action{height:auto;bottom:auto}", s.cssRules.length);
        if (discount_final_price)
            s.insertRule(".game_purchase_action  .game_purchase_price, .game_purchase_discount{height:auto;padding-bottom:8px}", s.cssRules.length);
        s.insertRule(".game_purchase_action_bg{height:auto;bottom:auto!important}", s.cssRules.length);
        s.insertRule(".game_purchase_action  .game_purchase_price{height:auto;padding-bottom:8px}", s.cssRules.length);

        var margin = 14;
        for (var i = 0; i < pages.length; i++)
            if (pages[i].show)
                margin += 16;
        s.insertRule(".game_area_purchase_game,.sale_page_purchase_package{margin-bottom:"+margin+"px!important}", s.cssRules.length);
        s.insertRule(".block.block_content{margin-bottom:"+margin+"px!important}", s.cssRules.length);
    }
}

function getConvFunction(currency, id)
{
    if (currency != yourLocalCurrency)
        return "Math.round(" + currency + "to" + yourLocalCurrency + "(" + id + ".innerHTML * 100))/100";
    else
        return id + ".innerHTML";
}

//Extracts prices from the downloaded HTML and displays them
function stateChanged() {
    //Check to see of all scripts have completed
    for (var i = 0; i < pages.length; i++)
        if (pages[i].show && (!pages[i].http || pages[i].http.readyState != 4))
            return;
    //All requests completed, good to go

    //The pattern variables can't be reused because it's global, so just duplicate
    for (var i = 0; i < pages.length; i++)
        if (pages[i].show)
        {
            pages[i].pricepattern = new RegExp(/<div class="(?:game_purchase_price price|discount_final_price)"[^>]*>([^<]+?)<\/div>/gi);
        }

    var calcscript = "function getDifference(currency, usdPrice, localPrice) " +
        "{\n" +
        "  var usdConverted; var lessmore; var diff;\n" +
        "  if (currency == 'GBP')" +
        "  else if (currency == 'RUB') " +
        "  else if (currency == 'RUB2')" +
        "  diff = Math.abs((localPrice/usdConverted)*100-100);\n" +

        "  if (localPrice == usdConverted) {lessmore = '<img src=\"http://www.steamunpowered.eu/orangebar.png\" width=\"9\" height=\"5\" border=\"0\">';}\n" +
        "  else if (localPrice > usdConverted) {lessmore = '<img src=\"http://www.steamunpowered.eu/uparrow.png\" width=\"7\" height=\"9\" border=\"0\">';}\n" +
        "  else {lessmore = '<img src=\"http://www.steamunpowered.eu/downarrow.png\" width=\"7\" height=\"9\" border=\"0\">';}\n" +

        " if (localPrice == usdConverted) {return ' <span style=\"color: #ac9b09; font-weight: normal\">(' + lessmore + ')</span>';}\n" +
        " else if (localPrice > usdConverted) {return '  <span style=\"color: #f00; font-weight: normal\">(' + Math.round(diff) + '% ' + lessmore + ')</span>'}\n" +
        " else return ' <span style=\"color: #4fc20f; font-weight: normal\">(' + Math.round(diff) + '% ' + lessmore + ')</span>';}\n";

    var calcscript_opera = "function getDifference(currency, usdPrice, localPrice) " +
        "{\n" +
        "  var usdConverted; var lessmore; var diff;\n" +
        "  if (currency == 'GBP') {usdConverted = " + baseCurrency + "toGBP(usdPrice);}\n" +
        "  else if (currency == 'RUB') {usdConverted = " + baseCurrency + "" +
        "  diff = Math.abs((localPrice/usdConverted)*100-100);\n" +

        "  if (localPrice == usdConverted) {lessmore = 'prices are equal'; return ' (' + lessmore + ')';} \n" +
        "  else if (localPrice > usdConverted) {lessmore = 'higher';}\n" +
        "  else {lessmore = 'lower';}\n" +
        "  return ' (' + Math.round(diff) + '% ' + lessmore + ')';}\n";	

    var calculatescript = document.createElement("script");
    calculatescript.setAttribute("type", "text/javascript");
    //Shitty Opera browser detection
    if (window.navigator.appName == "Opera") { 
        calculatescript.innerHTML = calcscript_opera; 
    } else {
        calculatescript.innerHTML = calcscript;
    }
    document.body.insertBefore(calculatescript, someNode);

    if (showYourLocalCurrency && pageCurrency != yourLocalCurrency) {
		//For DLC on game page
		var mypriceHtml_conly;
		var myprice_conly;

		for (i = 0; i < pricenodes_conly.length; i++) {
			try {
				var myvaluepattern_conly = new RegExp(/([\d]+([,\.](\d\d|--))?)/i);
				mypriceHtml_conly = originalprices_conly[i];
				myprice_conly = parseFloat(myvaluepattern_conly.exec(originalprices_conly[i])[1].replace(",", ".").replace("--", "00"));
			}
			catch(err) {
				if (!mypriceHtml_conly || mypriceHtml_conly.length == 0)
					mypriceHtml_conly = "N/A";
				myprice_conly = null;
			}
			if (showYourLocalCurrency) {
				pricenodes_conly[i].innerHTML = mypriceHtml_conly + " <span id='dlc" + i + "' style='font-weight: bold; color: rgb(136, 136, 136);'>" + myprice_conly +"</span>";	  
				var dlc00 = document.createElement("script");
				dlc00.setAttribute("type", "text/javascript");
				dlc00.innerHTML = "var dlc = document.getElementById('dlc" + i + "');" + 
				"dlc.innerHTML = \"(\" + " + getConvFunction(pageCurrency, "dlc") + " + \" " + yourLocalCurrency + ")\";"; 
				document.body.insertBefore(dlc00, someNode);
			}
		}
	}

    var mypriceHtml;
    var myprice;

    for (i=0; i<pricenodes.length; i++) {	
        try {
            var myvaluepattern = new RegExp(/([\d]+([,\.](\d\d|--))?)/i);
            mypriceHtml = originalprices[i];
            myprice = parseFloat(myvaluepattern.exec(originalprices[i])[1].replace(",", ".").replace("--", "00"));
        }
        catch(err) {
            if (!mypriceHtml || mypriceHtml.length == 0)
                mypriceHtml = "N/A";
            myprice = null;
        }
        for (var j = 0; j < pages.length; j++)
            pages[j].findPrice();
        var first = true;
        var displayOnlyBase = true;
        for (var j = 0; j < pages.length; j++)
            if (pages[j].show && pages[j].priceHtml) {
                pages[j].processPrice(i, pricenodes[i], first);
                if (baseCountry.countryCode != pages[j].countryCode)
                    displayOnlyBase = false;
                first = false;
            }
          
        if (displayOnlyBase) { //Ignore country codes, only display price for YOUR region
            if (showYourLocalCurrency && (myprice != null)) {
                pricenodes[i].innerHTML += "<br>\nYou: " + mypriceHtml + "<span id='myprice" + i + "' style='font-weight: bold;'>" + myprice + "</span>";
                var tmp1 = document.createElement("script");
                tmp1.setAttribute("type", "text/javascript");
                tmp1.innerHTML = "var myprice = document.getElementById('myprice" + i + "');" +
                "myprice.innerHTML = \"(\" + " + getConvFunction(baseCountry.currencyCode, "myprice") + " + \" " + yourLocalCurrency + ")\";";
                document.body.insertBefore(tmp1, someNode);
                createGetDifferenceScript("myprice" + i, baseCountry.currencyCode, baseCountry.price, myprice);
            } else {
                pricenodes[i].innerHTML += "<br>\nYou: " + mypriceHtml
                + " <span id='myprice" + i + "'></span>";
                createGetDifferenceScript("myprice" + i, baseCountry.currencyCode, baseCountry.price, myprice);
            }
        }
    }

    //Remove cookie that may store the wrong currency for this region
    document.cookie = "fakeCC=; expires=Fri, 27 Jul 2001 02:47:11 UTC; path=/";
}

function createGetDifferenceScript(elementid, currencystring, basePrice, localPrice) {
    if (basePrice && localPrice) {
        var getdiff = document.createElement("script");
        getdiff.setAttribute("type", "text/javascript");
        getdiff.innerHTML += "var node = document.getElementById('" + elementid
            + "');" + "if (node)"
            + "node.innerHTML += getDifference('" + currencystring + "', " + basePrice +
            ", " + localPrice + ");";
        document.body.insertBefore(getdiff, someNode);
    }
}

function main() {
	var url = window.location.toString() + "?cc=" + suffix;
	GM_xmlhttpRequest({
		method: "GET",
		url:url,
		onload: function(r) {
			var doc1 = document.createElement('div');
			doc1.innerHTML = r.responseText;
			var temp = doc1.getElementsByClassName('game_purchase_action_bg')[0];
			var amount;
			var cur;
			if (temp.getElementsByClassName('discount_final_price').length == 1) {
				amount = temp.getElementsByClassName('discount_final_price')[0].innerHTML.toString().replace(/	/g, '').replace(/\n/g, '');
				cur = amount.charAt(0);
			}

			if (temp.getElementsByClassName('game_purchase_price').length == 1) {
				amount = temp.getElementsByTagName('div')[0].innerHTML.toString().replace(/	/g, '').replace(/\n/g, '');
				cur = amount.charAt(0);
			}
			
			if (amount != "") {
				amount = amount.replace(/ /g,'');
				if (!isNaN(cur)) {
					cur = amount.charAt(amount.length-1);
				}
				
				amount = amount.replace(cur, '').replace(/,/g,'.');
				cur = cur.charCodeAt(0);
				switch (cur) {
					case 8364:
						if (suffix == "se") {
							comparison += "<strong>Europe Teir 1:</strong> &#" + cur + ";" + amount;
						} else if (suffix == "no") {
							comparison += "<strong>Europe Teir 2:</strong> &#" + cur + ";" + amount;
						}
						cur = "EUR";
						break;
					case 36:
						comparison += "<strong>USA:</strong> &#" + cur + ";" + amount;
						cur = "USD";
						break;
					case 163:
						comparison += "<strong>UK:</strong> &#" + cur + ";" + amount;
						cur = "GBP";
						firstPrice = amount;
						break;
					default:
						alert("Unknown Currency - " + cur + " | " + amount);
						return 0;
				}
				//Adds Price Comparison where i want it!
				//document.getElementsByClassName('game_purchase_action_bg')[0].parentNode.parentNode.parentNode.innerHTML += comparison;
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://www.xe.com/ucc/convert/?Amount=" + amount + "&From=" + cur + "&To=GBP",
					onload: function(r) {
						var doc = document.createElement('div');
						doc.innerHTML = r.responseText;
						
						var curCon = doc.getElementsByClassName('CnvrsnTxt')[0].getElementsByTagName('td');						
						var inAmount = curCon[0].innerHTML.toString().split('&nbsp;')[0];
						var outAmount = parseFloat(curCon[2].innerHTML.toString().split('&nbsp;')[0]).toFixed(2);
						priceDiff = parseFloat(outAmount - firstPrice).toFixed(2);
						if (priceDiff < 0) {
							priceDiff = "<span style=\"color: #009900;\">" + priceDiff + "</span>";
						} else if (priceDiff > 0) {
							priceDiff = "<span style=\"color: #FF0000;\">" + priceDiff + "</span>";
						}
						comparison += " [GPB: " + outAmount + "] [Price Difference: " + priceDiff + "]<br>";
						switch (suffix) {
							case "uk":
								suffix = "us";
								main();
								break;
							case "us":
								suffix = "se";
								main();
								break;
							case "se":
								suffix = "no";
								main();
								break;
							default:
								document.getElementById('prices').innerHTML = comparison;
								//comparison;
								break;
						}
					}
				});
			}
		}	
	});
}

main();