// ==UserScript==
// @name       TF2Outpost price finder
// @namespace  http://steamcommunity.com/id/NikoRez/
// @version    0.1
// @description  Show prices from backpack.tf
// @include    *tf2outpost.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/414694.user.js
// @downloadURL http://userscripts.org/scripts/source/414694.user.js
// @copyright  2014, Rez
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                         //
var api = "";// place between quotes your api key, you can get it from http://backpack.tf/api   //
                                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//STUFF YOU DO NOT NEED//
                                                                                                                                                                                                                                            

var name, id;
var value, value_high, currency;

var prices = GM_getValue("price");
var timeGot = new Date(parseInt(GM_getValue("currentTime"), 10));
var priceSpace = document.createElement('div');
priceSpace.setAttribute('class', 'prices');

try {
    prices = JSON.parse(prices);
    
} catch(err) {
    prices = null;
}


if((prices == null || undefined) || (timeGot == null || timeGot.getHours() != new Date().getHours())) {
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://backpack.tf/api/IGetPrices/v4/?key=" + api,
        onload: function(data) {
            prices = data.responseText;
            GM_setValue("price", prices);
            GM_setValue("currentTime", new Date().getTime().toString());
            prices = JSON.parse(data.responseText);
            doMagic();
        }
        
    });
} else {
    doMagic();   
}

function doMagic() {
    $('div.contents > ul > li').bind('mouseenter', function() {
       value = undefined;
       currency = undefined;
       name = $(this).attr('data-name');
       id = $(this).attr('class');
       getIdsAndNames();
       getPrice();
        makeItRight();
       $('.tipsy_item').append(priceSpace);
       
    });
}

function getIdsAndNames() {
 
    switch(id) {
        case "item it_440_1":
            id = id.replace('item it_440_1', 1) //genuine ;
            break;
        case "item it_440_3":
            id = id.replace('item it_440_3', 3) // vintage;
            break;
        case "item it_440_5":
            id = id.replace('item it_440_5', 5) // unusual;
            break;
        case "item it_440_6":
            id = id.replace('item it_440_6', 6) // simple;
            break;
        case "item it_440_11":
            id = id.replace('item it_440_11', 11) // strange;
            break;
        case "item it_440_1 deleted":
            id = id.replace('item it_440_1 deleted', 1)
            break;
        case "item it_440_3 deleted":
            id = id.replace('item it_440_3 deleted', 3) 
            break;
        case "item it_440_5 deleted":
            id = id.replace('item it_440_5 deleted', 5) 
            break;
        case "item it_440_6 deleted":
            id = id.replace('item it_440_6 deleted', 6) 
            break;
        case "item it_440_11 deleted":
            id = id.replace('item it_440_11', 11)
            break;
        default:
            id = id.replace(id, "To be done");
            break;
           
    }
    
    if (name.substring(0,3) == "The") {
      name = name.replace("The ", "");   
    } else if (name.substring(0,7) == "Genuine") {
        name = name.replace("Genuine ", "");  
    } else if (name.substring(0,7) == "Vintage") {
        name = name.replace("Vintage ", "");  
    } else if (name.substring(0,7) == "Unusual") {
        name = name.replace("Unusual ", "");
    } else if (name.substring(0,7) == "Strange" && (name.substring(0,12) != "Strange Part")) {
        name = name.replace("Strange ", "");
    }
    
    
        
    
    
    //v.prices[id].Tradable.Craftable[0].value
    
}

function getPrice() {
    $.each(prices.response.items, function(i , v ) {
        if (i == name) {
            
         try {   
         value = v.prices[id].Tradable.Craftable[0].value;
         value_high = v.prices[id].Tradable.Craftable[0].value_high;
         currency = v.prices[id].Tradable.Craftable[0].currency;
            } catch(err) {
                currency = "Something went wrong";
                value = "Unknown";
            }
        }
    });
}

function makeItRight() {
    if (currency == undefined || value == undefined)  {
        currency = "NOT TF2 ITEM OR";
        value = "I HAVE NOT DONE WITH IT YET";
    }
    
    priceSpace.innerHTML = "<span class = 'label'>Currency: </span>" + currency + "<br>" + "<span class = 'label'>Value: </span>" + value;
}

