// ==UserScript==
// @name       Remember The Hilt
// @namespace  http://www.garralab.gw2spidy.com/
// @version    0.1
// @description  enter something useful
// @grant          GM_xmlhttpRequest
// @include      http://www.gw2spidy.com*
// @copyright  2013+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

if (/.*\/crafting\/.*/.test(window.location.href)) {
    $('table:has(th.profit) tr.recipe').each(function(){
        var c = $(this).find('td.cost');
        var p = $(this).find('td.profit');
        addGainBadge(c, p);
    });
}

if (/.*\/type\/.*/.test(window.location.href)) {
    $('table:has(th.min_sale_unit_price) tr.item').each(function(){
        var sale = $(this).find('td.min_sale_unit_price');
        var margin = $(this).find('td.margin');
        addMarginBadge(sale, margin);
    });
}

if (/.*\/recipe\/.*/.test(window.location.href)) {
    var c = $(".crafting-summary-table tfoot td:contains('crafting cost:') + td");
    var p = $(".crafting-summary-table th:contains('profit:') + th");
    addGainBadge(c, p);
    init();
    var recipeId = window.location.href.match(/\/recipe\/(.*)/i)[1];
    console.log(recipeId);
    addCartButtons(recipeId);
}

function addCartButtons(recipeId) {
    var titlebar = $("h4:contains('Shopping list')");
    var key = "www.garralab.gw2spidy.com.cart.recipe.qt."+recipeId;
    var count = GM_getValue(key,0);
    
    var carter = getCartButton(recipeId);
    
    carter.find("#cart-qt-"+recipeId).val(count);
    
    carter.insertBefore(titlebar);
    
    $('#cart-minus-'+recipeId).click(function(){
        var c = GM_getValue(key,0);
        if (c <= 1) {
            GM_deleteValue(key);
        } else {
            GM_setValue(key,"n"+(c-1));
        }
        $("#cart-qt-"+recipeId).val(GM_getValue(key,0));
    });
    $('#cart-plus-'+recipeId).click(function(){
        var c = GM_getValue(key,0);
        GM_setValue(key,"n"+(c+1));
        $("#cart-qt-"+recipeId).val(GM_getValue(key,0));
    });
}

function getRecipe() {
    
}

function getCartButton(recipeId) {
    var carter = $('<form class="pull-right"><div class="input-prepend input-append"><span class="add-on">&nbsp;<i class="icon-shopping-cart"></i>&nbsp;</span><input class="span1" id="cart-qt-'+recipeId+'" type="text"><button id="cart-minus-'+recipeId+'" onclick="return false;" class="btn">&nbsp;<i class="icon-minus"></i>&nbsp;</button><button id="cart-plus-'+recipeId+'" onclick="return false;" class="btn">&nbsp;<i class="icon-plus"></i>&nbsp;</button></div></form>');
    carter.find("#cart-qt-"+recipeId).css('width', '33px');
    return carter;
}

function addGainBadge(cost, profit) {
    var gain = getPrice(profit) * 100 / getPrice(cost);
    var g = $('<span class="badge badge-info pull-right">');
    g.text(Math.round(gain) + "%");
    profit.append(g);
}

function addMarginBadge(sale, margin) {
    var gain = getPrice(margin) * 100 / getPrice(sale);
    var g = $('<span class="badge badge-info pull-right">');
    g.text(Math.round(gain) + "%");
    margin.append(g);
}

function findTableColumn(className) {
    var col = $('tr:has(th.'+className+') th').length-$('th.'+className+' ~ th').length-1;
    return col;
}

function getPrice(cell) {
    var price = 0;
    if (cell.find('.gw2money-fragment').length > 0) {
        cell.find('.gw2money-fragment').each(function(){
            price = price + getFragmentPrice($(this));
        });
    } else {
        price = convertStringPrice(cell.text());
    }
	
	return price;
}

function convertStringPrice(text) {
    var value = 0;
    if (/.*(\d+)\sg.*/.test(text)) {
        var g = parseInt(text.match(/(\d+)\sg/gi))
        value = value + (g*10000);
    }
    if (/.*(\d+)\ss.*/.test(text)) {
        var s = parseInt(text.match(/(\d+)\ss/gi))
        value = value + (s*100);
    }
    if (/.*(\d+)\sc.*/.test(text)) {
        var c = parseInt(text.match(/(\d+)\sc/gi))
        value = value + c;
    }
    return value;
}

function getFragmentPrice(fragment) {
    var value = parseInt(fragment.text())
    if (fragment.find('.gw2money-gold').length>0) {
        value = value * 10000;
    }
    if (fragment.find('.gw2money-silver').length>0) {
        value = value * 100;
    }
    return value;
}

function init() {
    if (typeof GM_setValue == 'undefined' || typeof GM_getValue == 'undefined' || typeof GM_deleteValue == 'undefined') {//gm storage functions
		GM_setValue = function (name,value) { localStorage.setItem(name, value); }
		GM_getValue = function (name,dvalue) {
			var value = localStorage.getItem(name);
			if (typeof value != 'string') {
				return dvalue;
			}
			else {
				var type = value.substring(0,1);
				if(type != '{') value = value.substring(1);
				if (type == 'b') {
					return (value == 'true');
				}
				else if (type == 'n') {
					return Number(value);
				}
				else {
					return value;
				}
			}
		}
		GM_deleteValue = function (name)  { localStorage.removeItem(name); }
	}
}