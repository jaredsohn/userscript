// ==UserScript==
// @id             Subeta - Autoprice (With Gold Account)
// @name           Subeta - Autoprice (With Gold Account)
// @version        6.0
// @namespace      
// @author         Subeta Bots
// @description    
// @include        http://*subeta.net/myshop.php?shopid=*
// @include        http://*subeta.net/myshop.php?&shopid=*
// @exclude        http://subeta.net/myshop.php?shopid=*&src=cf
// @exclude        http://subeta.net/myshop.php?shopid=*&act=quickstock*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=editshop*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=cats*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=profits*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=shoplog*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=delete*
// @exclude        http://subeta.net/myshop.php?shopid=*&act=autopricer*
// @require		   https://dl.dropboxusercontent.com/u/6323987/Subeta/Scripts/jquery.js
// @run-at         document-end
// ==/UserScript==

var LOWERLIMIT = 1000;				// Anything below this price will be considered underpriced
var REMOVE_ON_BELOW_LIMIT = false;	// TRUE: Underpriced items will be removed; FALSE: Underpriced items will be set to 0 sP

var numUnderpriced = 0;
var numMillionSP = 0;
var numPricesObtained = 0;

// START ITEM CLASS

function ItemEntry(html) {
    this.name;
    this.imageURL;
    this.myPrice;
    this.lowestPrice;
    this.quantity;
    this.category;
    this.categoryIndex;
    this.html = html;
    this.txtPrice;
    this.htmlRemove;
    this.isRemoveSelect;
    
    this.updatePrice = function() {
        if (this.lowestPrice == 0) {
            numMillionSP++;
            this.html.setAttribute('style', 'background-color:#ffffcc;');
            this.getLowestPrice(this.txtPrice);
        }
        else if (this.lowestPrice < LOWERLIMIT) {
            numUnderpriced++;
            this.html.setAttribute('style', 'background-color:#ddffff;');
            if (REMOVE_ON_BELOW_LIMIT == true) {
                if (this.isRemoveSelect == true) 
                    this.htmlRemove.selectedIndex = this.quantity;
                else
                    this.htmlRemove.value = this.quantity;
                numPricesObtained++;
            }
            else {
                this.txtPrice.value = 0;
                numPricesObtained++;
            }
        }
        else {
        	this.txtPrice.value = this.lowestPrice - 1;
            numPricesObtained++;
        }
    };
    
    this.getLowestPrice = function(priceField) {
        $.get("http://subeta.net/ushop.php?act=dosearch&itemname=" + escape(this.name) + "&type=shops", function(data) {
            var htmlsrc = data.substring(data.indexOf('<b>Shop Name</b>'));
            htmlsrc = htmlsrc.substring(0, htmlsrc.indexOf('Agoge, Inc. All Rights Reserved.</p>'));
            
            if (htmlsrc.indexOf('<a href=ushop.php?shopid=') > -1) {
                var ushopURL = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                ushopURL = ushopURL.substring(0, ushopURL.indexOf('>'));
                var ushopID = ushopURL.substring(ushopURL.indexOf('ushop.php?shopid=') + 17);
                var ushopName = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 9 + ushopURL.length);
                ushopName = ushopName.substring(0, ushopName.indexOf('</a></td>'));
                var ushopPrice = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 25);
                ushopPrice = ushopPrice.substring(ushopPrice.indexOf('<td>') + 5);
                ushopPrice = ushopPrice.substring(0, ushopPrice.indexOf('</td>'));
                
                priceField.value = convertPriceToInt(ushopPrice) - 1;
                numPricesObtained++;
                refreshProgressUI();
            }
            else {
                priceField.value = 0;
                numPricesObtained++;
                refreshProgressUI();
            }
        });
    }
}

// END ITEM CLASS

// START INIT UI

var arrCenters = document.getElementsByTagName('center');
var nodeCenter;
for (var i = 0; i < arrCenters.length; i++) {
    if (arrCenters[i].getElementsByTagName('input').length > 0) {
        if (arrCenters[i].getElementsByTagName('input')[0].value == 'Process Prices and Removals') {
            nodeCenter = arrCenters[i];
            break;
        }
    }
}

nodeCenter.innerHTML = '<div style="width:80%;height:25px;background-color:orange;margin-bottom:3px;margin-top:1px;text-align:left;"><div id="ap_bar" style="width:0px;height:100%;background-color:darkgreen;margin:0;"></div><div id="ap_text" style="margin-top:-19px;margin-left:10px;color:white;font-weight:bold;">Loading...</div></div>' + nodeCenter.innerHTML;

var arrInputs = document.getElementsByTagName('input');
var btnPrice;
for (var i = 0; i < arrInputs.length; i++) {
    if (arrInputs[i].value == 'Process Prices and Removals') {
        btnPrice = arrInputs[i];
        btnPrice.disabled = true;
        break;
    }
}

if (REMOVE_ON_BELOW_LIMIT == true) {
    var arrSelects = document.getElementsByTagName('select');
    var selectDestination;
    for (var i = 0; i < arrSelects.length; i++) {
        if (arrSelects[i].name == 'destination' && arrSelects[i].getElementsByTagName('option').length == 2) {
            selectDestination = arrSelects[i];
            break;
        }
    }

	selectDestination.selectedIndex = 1;
}

window.scrollTo(0, document.body.scrollHeight);

// END INIT UI

// START LOGIC FLOW

var arrItems = new Array();

var arrForms = document.getElementsByTagName('form');
var shopForm;
for (var i = 0; i < arrForms.length; i++) {
    if (arrForms[i].getAttribute('action') == 'myshop.php')
        shopForm = arrForms[i];
}

var arrTRs = shopForm.getElementsByTagName('tr');
for (var i = 0; i < arrTRs.length; i++) {
    if ((arrTRs[i].innerHTML.indexOf('Remove All') > -1) && (arrTRs[i].getElementsByTagName('td')).length == 6)
        arrItems.push(new ItemEntry(arrTRs[i]));
}

for (var i = 0; i < arrItems.length; i++) {
    populateEntry(arrItems[i]);
    arrItems[i].updatePrice();
    refreshProgressUI();
}

// END LOGIC FLOW

// START FUNCTIONS

function refreshProgressUI() {
    document.getElementById('ap_text').innerHTML = 'Loading prices: ' + numPricesObtained + ' of ' + arrItems.length + ' items complete';
    document.getElementById('ap_bar').setAttribute('style', 'width:' + ((numPricesObtained/arrItems.length)*100) + '%;height:100%;background-color:darkgreen;margin:0;');
    
    if (numPricesObtained == arrItems.length) {
        document.getElementById('ap_text').innerHTML = 'Autoprice complete | ';
        if (REMOVE_ON_BELOW_LIMIT == true)
            document.getElementById('ap_text').innerHTML += '<u>' + numUnderpriced + '</u> items below ' + LOWERLIMIT + ' sP to be moved to vault | ';
        else
            document.getElementById('ap_text').innerHTML += '<u>' + numUnderpriced + '</u> items below ' + LOWERLIMIT + ' sP priced as 0 sP | ';
        document.getElementById('ap_text').innerHTML += '<u>' + numMillionSP + '</u> item above 1 million sP.'
        
        btnPrice.disabled = false;
    }
}

function populateEntry(item) {
    var arrInputs = item.html.getElementsByTagName('input');
    var arrTDs = item.html.getElementsByTagName('td');
    
    for (var i = 0; i < arrInputs.length; i++) {
        if (arrInputs[i].getAttribute('type') == 'hidden' && arrInputs[i].getAttribute('name').indexOf('oldprice') > -1) {
            item.myPrice = arrInputs[i].value;
            break;
        }            
    }
    
    for (var i = 0; i < arrTDs.length; i++) {
        if (arrTDs[i].getAttribute('width') == '30%') {
            item.name = arrTDs[i].getElementsByTagName('center')[0].innerHTML;
        }
        else if (arrTDs[i].getAttribute('width') == '20%') {
            if (arrTDs[i].getElementsByTagName('img').length > 0) {
                item.imgURL = arrTDs[i].getElementsByTagName('img')[0].src;
            }
            else if (arrTDs[i].getElementsByTagName('input').length > 0) {
                var snippet = arrTDs[i].getElementsByTagName('center')[0].innerHTML;
                snippet = snippet.substring(snippet.indexOf('<b>Lowest:</b>') + 14);
                snippet = snippet.substring(0, snippet.indexOf(' sP'));
                item.lowestPrice = convertPriceToInt(snippet);
                item.txtPrice = arrTDs[i].getElementsByTagName('input')[0];
            }
            else if (arrTDs[i].getElementsByTagName('select').length > 0) {
                var arrOptions = arrTDs[i].getElementsByTagName('option');
                item.categoryIndex = arrTDs[i].getElementsByTagName('select')[0].selectedIndex;
                item.category = arrOptions[item.categoryIndex].innerHTML;
            }
        }
        else if (arrTDs[i].getAttribute('width') == '10%') {
            if (arrTDs[i].innerHTML.indexOf('Remove All') > -1) {
                if (arrTDs[i].getElementsByTagName('select').length > 0) {
                    item.isRemoveSelect = true;
                    item.htmlRemove = arrTDs[i].getElementsByTagName('select')[0];
                }
                else if (arrTDs[i].getElementsByTagName('input').length > 0) {
                    item.isRemoveSelect = false;
                    item.htmlRemove = arrTDs[i].getElementsByTagName('input')[0];
                }
            }
            else {
                item.quantity = arrTDs[i].getElementsByTagName('center')[0].innerHTML;
            }
        }
    }
}

function convertPriceToInt(priceStr) {
    var cleanedStr = '';
    for (var i = 0; i < priceStr.length; i++) {
        if (priceStr[i] == '0' || priceStr[i] == '1' || priceStr[i] == '2' || priceStr[i] == '3' || priceStr[i] == '4' || priceStr[i] == '5' || priceStr[i] == '6' || priceStr[i] == '7' || priceStr[i] == '8' || priceStr[i] == '9')
            cleanedStr = cleanedStr.concat(priceStr[i]);
    }
    return(parseInt(cleanedStr));
}

function removeAll(item) {
    if (item.isRemoveSelect == true) 
        item.htmlRemove.selectedIndex = item.quantity;
    else
        item.htmlRemove.value = item.quantity;
}

// END FUNCTIONS