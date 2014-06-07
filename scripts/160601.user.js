// ==UserScript==
// @name       KPESPP
// @namespace  erepublik_my
// @version    0.1.1
// @description Blah, Blah
// @include		 http://*.erepublik.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2013, Kavboj Pipec
// ==/UserScript==

// http://userscripts.org/scripts/show/158963

// settings variables
var MARKET_REFRESH_TIME = 111;
// auto buy
var AUTO_BUY = {             // price   min to buy
   71 /* food raw */        : [  0.01,     11],
  121 /* weapon raw */      : [  0.02,    333]
};

// auto sell
var AUTO_SELL = {            // price rounding min. to add
   71 /* food raw */        : [  0.02,      1,       1],
  121 /* weapon raw */      : [  0.05,   1000,    5000]
};

var EREP_HOME;
var HTTP_REQ_TIMEOUT = 1000;

// global variables
var gStatic, gMainObject, gContent;

// global functions
function ReloadCurrentPage()
{
	document.location.href = document.location.href;
}

// Globals object
function Globals() {
	var user_data = $('div#large_sidebar div.user_identity a.user_name');
	this.id = parseInt((/[0-9]+$/).exec(user_data.attr('href')),10);
	this.name = user_data.text().trim();
}

// Logger object
function Logger() {
  this.logIt = function(msg_str) {
    this.mContent.appendChild(document.createElement("p")).textContent = msg_str;
  }
  gContent.appendChild(document.createElement("h4")).textContent = "erep Test Script log:";
  gContent.appendChild(this.mContent = document.createElement("div"));
}

// PageParams object
function PageParams(params_str) {
  var splitted = params_str.split("&");
  for (var i = 0; i < splitted.length; i++) {
    try {
      eval("this." + splitted[i]);
    }
    catch(err) {
      eval("this." + splitted[i].replace(/=(.*)$/g,"=\"$1\""));
    }
  }
}

// Finances object
function Finances(page_data) {
  function ParseData(new_data) {
    var finances = $("div#large_sidebar div.user_finances", new_data);
    return {
      gold: parseInt($("div.gold_amount strong", finances).text(), 10),
      money: parseInt($("div.currency_amount strong", finances).text(), 10)
    };
  }
  
  this.Update = function(new_data) {
    var 
      is_changed = false, 
      new_f = ParseData(new_data);
    if (new_f.money != this.m_money) {
      is_changed = true;
      this.m_money = new_f.money;
    }
    if (new_f.gold != this.m_gold) {
      is_changed = true;
      this.m_gold = new_f.gold;
    }
    return is_changed;
  };
  
  this.UpdateUI = function(new_data) {
    $("div#large_sidebar div.user_finances").first()
            .replaceWith($("div#large_sidebar div.user_finances", new_data).first());
  }
  
  // constructor code
  var new_f = ParseData(page_data);
  this.m_gold = new_f.gold;
  this.m_money = new_f.money;
}

// Inventory object
function Inventory(owner) {
  this.Update = function(new_data) {
    // new_data ... inventory page
    var storage = $("div#content div.manager_dashboard div.storage :contains('Storage') strong", new_data)
              .text().trim().replace(/[(),]/g,"").split("/");
    this.m_used = parseInt(storage[0],10);
    this.m_size = parseInt(storage[1],10);
    GM_log(this);
    this.m_owner.InventoryUpdated();
  }
  
  this.Refresh = function() {
    var save_this = this;
    GM_xmlhttpRequest(
      {
        method:   "GET",
        url:      EREP_HOME + "economy/inventory",
        dataType: "text/html",
        onload: function (resp) {
          save_this.Update(resp.responseText);
        }
      });
  }
   
  // constructor code
  this.m_owner = owner;
  this.m_size = this.m_used = 0;
  this.Refresh();
}

// MarketplaceOptions object
function MarketplaceOptions(product) {
	this.Save = function() {
		localStorage.setItem(this.m_key, JSON.stringify(this.m_data));
	}
	
// constructor code
	var d;
	d = localStorage.getItem(this.m_key = 'eRepMarket_' + gStatic.id + "_" + product);
	this.m_data =  ('string' === typeof(d)) ? JSON.parse(d) : {f: 0, p:0.0};
}

// MarketplacePage main object
function MarketplacePage(loc, params) {
  if (undefined !== params || typeof(Storage) === "undefined") {
    // arguments passed or no Web storage support
    return;
  }
  
  function PostRefresh() {
  	var t = MARKET_REFRESH_TIME + Math.floor(MARKET_REFRESH_TIME*11*Math.pow(Math.random(),11));
    setTimeout(function() {
      $("img#refresh_market").click();
    }, MARKET_REFRESH_TIME);
  }
  
  function RefreshData(event) {
    GM_xmlhttpRequest(
      {
        method:   "GET",
        url:      document.location.href,
        dataType: "text/html",
        onload: function (resp) {
          var
            mp = event.data;       
          
          mp.m_new_tbody = $("#marketplace tbody.price_sorted",resp.responseText);
          if (mp.m_finances.Update(resp.responseText)) {
            //finances changed => reload inventory
            mp.m_inventory.Refresh();	// mp.ProcessMarket will be called too here through InventoryUpdated()
            mp.m_finances.UpdateUI(resp.responseText);
          }
          else {
          	mp.ProcessMarket();
          }
        },
        onerror: function (resp) {
          var msg = "An error occurred." 
            + "\nresponseText: " + resp.responseText
            + "\nreadyState: " + resp.readyState
            + "\nresponseHeaders: " + resp.responseHeaders
            + "\nstatus: " + resp.status
            + "\nstatusText: " + resp.statusText
            + "\nfinalUrl: " + resp.finalUrl;
          GM_log(msg);
          PostRefresh();
        }
      });
  }

  this.ProcessMarket = function() {
  	var
  	  mp, max_price;  	
  	if (undefined !== (max_price = AUTO_BUY[(mp=this).m_product][0])) {
  		var 
  		  buy_offer, buy_amount = 0, buy_price;
  		$("tr", this.m_new_tbody).each(function() {
  			var price;
  			if (max_price >= (price = parseFloat($(".m_price", $(this)).text().trim().split(" ")[0]))) {
  				if (undefined !== buy_price && price > buy_price) 
  				  return; // end loop
  				var amount;
  				if ((amount = parseInt($(".m_stock", $(this)).text().trim())) >= AUTO_BUY[mp.m_product][1] &&
  				    amount > buy_amount) {
  				  buy_price = price;
  				  buy_amount = amount;
  				  buy_offer = parseInt($(".buyOffer", $(this)).attr("id"));
  				}
  			}
  			else
  				return; // end loop
  	  });
  	  if (undefined !== buy_offer) {
  	  	var max_q;
  		  if (buy_amount > (max_q = this.m_inventory.m_size - this.m_inventory.m_used))
  		    buy_amount = max_q;
  		  if (buy_amount > (max_q = Math.floor(mp.m_finances.m_money/buy_price)))
  		    buy_amount = max_q;
  		  if (buy_amount > 0) {
  		  	// buy offer
          mp.m_buy_id.val(buy_offer);
  			  mp.m_buy_amount.val(buy_amount);
  			  mp.m_buy_form.submit();
  			  return;
  		  }
  	  }
  	  PostRefresh();
  	}
  	var inv_size = this.m_inventory.m_size - this.m_inventory.m_used;
  	$("tr", this.m_new_tbody).each(function() {
      var 
        quant,
        max_q = (quant= parseInt($(".m_stock", $(this)).text().trim())) > inv_size ? inv_size : quant;	
      if (max_q > (quant = Math.floor(mp.m_finances.m_money/parseFloat($(".m_price", $(this)).text().trim().split(" ")[0])))) 
        max_q = quant;
  		$(".buyField", $(this)).val(max_q);
  	});
  	this.m_tbody.first().replaceWith(this.m_new_tbody.first());
    this.m_tbody = this.m_new_tbody;
  }
  
  this.InventoryUpdated = this.ProcessMarket;
  
  // constructor code
  this.m_inventory = new Inventory(this);
  this.m_finances = new Finances($(document));
  this.m_product = parseInt(loc[7])*10+parseInt(loc[8]);
  //this.m_options = new MarketplaceOptions(this.m_product);
  //this.m_options.Save();
  var 
    market_content = $("div#marketplace"),
    holder = $("div#filters_summary", market_content),
    my_holder = holder.clone();
  $("div.sactual", my_holder).empty().prepend($("ul.pager:first-of-type", market_content).css("float","right").css("width","auto").css("clear","none"));
  GM_addStyle("ul.pager li { padding: 5px 1px 5px 0px; }");
  my_holder.children().eq(0).prepend("\
    <div class=\"sattr\" style=\"padding-top: 2px;\">\
     <div>\
      <span style=\"cursor:pointer; width:24px;\">\
        <img style=\"cursor: pointer; margin-top: -3px;\" src=\"http://199.19.119.44:443/PulseWS/img/view-refresh.png\"\
          alt=\"0\" id=\"refresh_market\" title=\"Refresh data now\">\
      </span>\
      <input type=\"checkbox\" id=\"auto_refresh\" style=\"float: left; margin-left: 24px; margin-top: 6px;\">\
      <span><label for=\"auto_refresh\">&nbsp;Auto refresh\</label></span>\
     </div>\
     <div style=\"margin-top: 10px;\">\
      <input type=\"checkbox\" id=\"auto_buy\" style=\"float: left; margin-left: 2px; margin-top: 6px;\">\
      <span><label for=\"auto_buy\">&nbsp;Buy automatically</label>&nbsp;for price&nbsp;</span>\
      <input type=\"text\" size=\"2\" style=\"text-align:center; float:left; padding-top:2px;\" name=\"max_price\" trigger=\"check_number\" id=\"max_price_id\" value=\"0.00\">\
      <span>&nbsp;or lower</span>\
     </div>\
    </div>");
  $("img#refresh_market", my_holder).parent().bind("click", this, RefreshData);
  holder.after(my_holder);
  this.m_maxPriceEdit = document.getElementById("max_price_id");
  this.m_new_tbody = (this.m_tbody = $("tbody.price_sorted")).clone();
  this.m_buy_form = $("form#buyOffer");
  this.m_buy_id = $("input#offerId", this.m_buy_form);
  this.m_buy_amount = $("input#amount", this.m_buy_form);
}

// StoragePage main object
function InventoryPage(loc, params) {
  // events
  function onItemDblClick(event) {
	var
      li_data = event.data,
      offered, add_offer,
      sell_icon = $("div#sell_offers table>tbody>tr>td>img[src^=\""+li_data.prefix+"\"]");
    if (0 < sell_icon.length) {
      offered = parseInt(sell_icon.parent().next().children().first().text().trim().replace(/[,.]/g,""));
    }
    else {
      offered = 0;
    }
    if (99999 < (add_offer = parseInt(li_data.quant_text.textContent.trim().replace(/[,.]/g,"")))) add_offer = 99999;
    add_offer += offered;
    add_offer -= add_offer % AUTO_SELL[li_data.product][1] + offered;
    /*
    if (li_data.product[2] > add_offer) {
      return; // not enough to add
    }
    */
    var postOffer = unsafeWindow.postOffer;
    postOffer.industryId = Math.floor(li_data.product/10);
    postOffer.customization = li_data.product%10;
    $("div#sell_offers table>thead").each(function() {
      $("input#sell_amount", $(this)).val(add_offer);
      $("input#sell_price", $(this)).val(AUTO_SELL[li_data.product][0]);
    });
  }
  function onAjaxComplete(event, XMLHttpRequest, ajaxOptions) {
    if (200 !== XMLHttpRequest.status) {
      gLog.logIt("onAjaxComplete(): status is " + XMLHttpRequest.status + ": \"" + XMLHttpRequest.statusText + "\"");
      return;
    }
    var response = JSON.parse(XMLHttpRequest.responseText), request = new PageParams(ajaxOptions.data),
        transact;
    if ("success" !== response.message) {
      gLog.logIt("onAjaxComplete(): transaction failed with error " + response.token);
      return;
    }
    switch(ajaxOptions.url.match(/\/[^\/]+$/g)[0]) {
      case "/postMarketOffer":
        transact = request;
        transact.type = 1;
        break;
/* 
 * request:
 * _token: "959ff10407500bf63168592a54ceff96"
 * amount: 2
 * countryId: 61
 * customization: 1
 * industryId: 12
 * price: 0.03
 * 
 * response:
response: Object
html: "<tr id="offer_29812954">
↵			<td><img class="offer_image" src="http://www.erepublik.com/images/icons/industry/12/default_30x30.png" alt="" /></td>
↵			<td><strong class="offer_amount">8</strong></td>
↵			<td class="offer_price"><strong>0.03</strong>&nbsp;SIT</td>
↵			<td><img class="offer_flag" src="/images/flags_png/M/Slovenia.png" alt="Slovenia" title="Slovenia" /></td>
↵			<td><a href="javascript:;" class="delete_offer" title="Remove offer">&nbsp;</a></td>
↵		</tr>"
message: "success"
token: Object
amount: 8
countryId: 61
customization: 1
industryId: 12
offerId: 29812954
oldOfferId: "29812866"
price: "0.03"
remainingStock: "9666"
*/
      case "/deleteMarketOffer":
        transact = new Object();
        transact.amount = parseInt(response.token.amount, 10);
        transact.industryId = parseInt(response.token.industryId, 10);
        transact.customization = parseInt(response.token.customization, 10);
        transact.type = 0;
        break;
/*
request: PageParams
_token: "959ff10407500bf63168592a54ceff96"
id: 29813523

response: Object
message: "success"
token: Object
  amount: "3"
  customization: "1"
  industryId: "12"
  offerId: "29813523"
*/
    };
    gMainObject.updateTotals(transact);
  }
  
  // members
  this.loadPersistent = function () {
    var str_data = localStorage.getItem("erepAutoSell_" + gStatic.id);
    if ("string" !== typeof(str_data)) (this.mPersistent = new Object())["do_auto"] = [];
    else this.mPersistent = JSON.parse(str_data);
  }
  this.savePersistent = function () {
    localStorage.setItem("erepAutoSell_" + gStatic.id, JSON.stringify(this.mPersistent));
  }
  this.updateTotals = function(t) {
    this.loadPersistent();
    var id, d = this.mPersistent[id = t.industryId*10+t.customization];
    if (undefined === d) (d = this.mPersistent[id] = new Object()).total = 0;
    else if (undefined === d.total) d.total = 0;
    d.total += t.type == 1? t.amount:-t.amount;
    this.savePersistent();
    gLog.logIt((1==t.type ? "Added ":"Removed ")+t.amount + " unit(s) of product-" + id + ". New total is " + d.total);
  }
   
  //constructor code
  this.loadPersistent();
  for (as_item in this.mPersistent) {
    var id;
    if (!isNaN(id = parseInt(as_item))) {
      var elem;
      if (1 === (elem = $("div.items_holder li strong#stock_" + Math.floor(as_item/10) + "_" + as_item%10)).length) {
        elem.parent().dblclick({
          product: parseInt(as_item),
          quant_text: elem.get(0),
          prefix: elem.prev().attr("src").replace(/\.png$/g,"")
        }, onItemDblClick);
      }
    }
  }
  unsafeWindow.jQuery(document).ajaxComplete(onAjaxComplete);
  if (undefined !== this.mPersistent.do_auto && 0 < this.mPersistent.do_auto.length) {
    for (as_item in this.mPersistent.do_auto) {
      var id = this.mPersistent.do_auto[as_item];
      var elem = $("div.items_holder li strong#stock_" + Math.floor(id/10) + "_" + id%10);
      if (0 < elem.length) {
        elem.eq(0).dblclick();
        var min_amount;
        if (undefined === (min_amount = this.mPersistent[id].min)) min_amount = 1;
        if (min_amount <= document.getElementById("sell_amount").value)
          unsafeWindow.jQuery("#post_offer").click();
      }
    }
    setTimeout(function() {
      document.location.href = document.location;
    }, 321000);
  }
}

$(document).ready(function() {
  if (undefined === (gContent = document.getElementById("content"))) {
    GM_log("div#content not found on the page.");
    return;
  }
  gLog = new Logger();
  var
    splitted = document.location.href.split("?"), params;
  if (splitted.length > 1) {
    params = new PageParams(splitted[1]);
  }
  splitted = splitted[0].split("/");

  gStatic = new Globals();
  EREP_HOME = "http://www.erepublik.com/" + splitted[3] + "/";
  if (undefined === splitted[4]) {
    GM_log("Start Page is " + EREP_HOME);
  }
  else {
    switch(splitted[4]) {
      case "economy":
        switch(splitted[5]) {
          case "market":
            gMainObject = new MarketplacePage(splitted, params);
            break;
          case "inventory":
            gMainObject = new InventoryPage(splitted, params);
            break;
          case "advanced-buildings":
            GM_log("Advanced buildings page loaded.");
            break;
        }
        break;
      case "military":
        GM_log("Military section page loaded.");
        break;
    }
  }
});
