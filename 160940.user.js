// ==UserScript==
// @name PriceConverter
// @author Тарас Лабяк
// @namespace Alim
// @version 1.0
// @description Збільшує ціни на 20% (ціни діляться на 0.8)
// @encoding utf-8
// ==/UserScript==
// http://wiki.plemiona.pl/wiki/Poradnik:Skrypty

var regex = /(\d+)[^\.]/;

var clazzes = [];

Array.prototype.contains = function(value) {
    for(var i in this)
        if (this[i] == value)
            return true;
    return false;
}
/*
String.prototype.isIn = function(arr) {
    for(var i=0; i<arr.length; i++)
        if (this.indexOf(arr[i]) > 0)
            return true;
    return false;
}
*/
var vals = [];

function convertPrice(priceString) {
    if (regex.test(priceString)) {
        var price = regex.exec(priceString)[0];
        price = parseInt(price);
        vals.push(price);
        price /= 0.8;
        price = Math.ceil(price);
        priceString = priceString.replace(regex, price);
    }
    return priceString;
}

function recursive(node) {
    switch (node.nodeType) {
        case document.ELEMENT_NODE:
            var childNodes = node.childNodes;
            for (var i=0; i<childNodes.length; i++) {
                recursive(childNodes[i]);
            }
            break;
        case document.TEXT_NODE:
            node.nodeValue = convertPrice(node.nodeValue);
            break;
        default:
            return;
    }
}

function parse() {
    //if ((location.host.indexOf('last-minute.de') >= 0) ||
    //    (location.host.indexOf('traveltainment.de') >= 0)) {
	convertPricesByClass('tervakpreis');
//	convertPricesByClass('preisbuchung');
	var prei = document.getElementsByClassName('preisbuchung');
	if (prei.length > 0) {
        prei = prei.item(0);
        do prei = prei.parentNode;
        while ('tbody' != prei.nodeName.toLocaleLowerCase());
//        recursive(prei);
        prei.innerHTML = convertPrice(prei.innerHTML);

		/*b = prei.childNodes.item(0);
		b.nodeValue = convertPrice(b.nodeValue);
		prei = prei.parentElement.parentElement;
		b = prei.childNodes.item(0).childNodes.item(1).childNodes.item(0);
		b.nodeValue = convertPrice(b.nodeValue);
		b = prei.childNodes.item(1).childNodes.item(1).childNodes.item(0);
		b.nodeValue = convertPrice(b.nodeValue);*/
	}
        convertPricesByClass('terRe') ||
        convertPricesByClass('preis');
    //}
    if (location.host.indexOf('dream-travel.com.pl') > 0) {
        convertPricesByClass('h3_price');
    }
}

function convertPricesByClass(clazz) {
//    if (clazzes.contains(clazz))
//        return true;
//    else
//        clazzes.push(clazz);
    console.log(clazz);
    var prices = document.getElementsByClassName(clazz);
    if (prices.length == 0)
        return false;
    for(var i=0; i<prices.length; i++) {
        var price = prices.item(i);
        price.innerHTML = convertPrice(price.innerHTML);
    }
    //window.removeEventListener('load', parse);
    return true;
}



window.addEventListener('load', parse);

//document.addEventListener('load', );
