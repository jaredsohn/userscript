// ==UserScript==
// @name        Dota 2 Lounge - Market Prices
// @namespace   adnans
// @description Attempts to find the price of the item when hovered
// @include     http://dota2lounge.com/ 
// @include     http://*.dota2lounge.com/
// @include		http://dota2lounge.com/myprofile
// @include		http://dota2lounge.com/match*
// @include		http://dota2lounge.com/search
// @include		http://dota2lounge.com/result*
// @include		http://dota2lounge.com/mybets*
// @grant       none
// @version     1.1
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

var play = [];
var testItem;

var initScript = function() {
    
    var nonSearchItems = ['Any Rare', 'Treasure Key', 'Real Money', 'Any Uncommon', 'Any Uncommon', 'Any Mythical', 'Offers'];
    var item = {};
    
    
    var displayItem = function(item, placeHolder) {
        console.log(item);
        if (typeof item !== 'object') {
        	var r = JSON.parse(item);    
        } else { 
            var r = item;
        }
        jQ(placeHolder).find('.searching').remove();
        jQ(placeHolder).find('.name').append('<div class="priceInfo" style="font-size: 14px; font-weight: bold; color: green;">'+r.price+' <a href="'+r.href+'" target="_blank" style="font-weight: normal; font-size: 10px;">url</a></span>');
    }
    
    var appendSearching = function(placeHolder) {
        jQ(placeHolder).find('.name').append('<div class="searching" style="font-size: 14px; font-weight: bold;">Searching ...</span>');
    }
    
    var removeItem = function(placeHolder) {
        jQ(placeHolder).find('.priceInfo').remove();
        jQ(placeHolder).find('.searching').remove();
    }

	var searchMarket = function(name, placeHolder) {
        
        var items = [];
        jQ.get('http://pipes.yahoo.com/pipes/pipe.run?_id=2eb2b209d01dca36ea485d942d720462&_render=json&name='+name, function(data) {
    	var htmlResults = data.value.items[0].results_html;
        var parsed = jQ.parseHTML(htmlResults);
        
        jQ.each(parsed, function(index, item) {
            var itemTemplate = { name: "", price: "", quantity: "0", href: ""};
            if (jQ(item).attr('class') == 'market_listing_row_link') {
				itemTemplate.quantity = item.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].data.trim();
                itemTemplate.price = item.childNodes[1].childNodes[3].childNodes[1].childNodes[6].data.trim();
				itemTemplate.name = item.childNodes[1].childNodes[5].childNodes[1].childNodes[0].data.trim();
                itemTemplate.href = item.href;
                items.push(itemTemplate);
                localStorage.setItem(itemTemplate.name, JSON.stringify(itemTemplate));
            }
        });
            
        var itemFound = false;
        jQ.each(items, function(index, value) {
            if (value.name == name) {
                itemFound = true;
            	displayItem(value, placeHolder);
            }            
        });
            
            if (!itemFound) {
                noItem = { price: 'No Price on market' };
                localStorage.setItem(name, JSON.stringify(noItem));
                displayItem(noItem, placeHolder);
            }
    });
}
    
    
    jQ('div.item').on('mouseenter', '', function() {
        var itemName = jQ(this).find('div.name').find('b').text().trim();
        var invalidName = jQ.inArray(itemName, nonSearchItems) > -1;
        if (!invalidName) {
            appendSearching(this);
            item = localStorage.getItem(itemName);
            if (!item) {
            	searchMarket(itemName, this);
            } else {
                item = JSON.parse(item);
            	displayItem(item, this);   
            }
        }
    }).on('mouseleave','',  function() {
    	removeItem(this);
    });
    
}

addJQuery(initScript);
