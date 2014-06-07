// ==UserScript==
// @name       Trip Gas Cost
// @namespace http://userscripts.org/users/485136
// @version    0.2
// @description  Gives you the cost of gas that you would use on a trip. Only works in miles.
// @include      http*://maps.google.com*
// @copyright  2012, Michael Graybeal
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

var startMileage = parseInt(localStorage.mileage) || 20;
var startPrice = parseFloat(localStorage.price) ||3.75;
var doc = window.parent.document;

$(function(){
    calculateTripCosts(doc, startMileage, startPrice);
    if($(doc).find("#mileage").length < 1){
        var script = $("<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js'>&nbsp;</script>");
        $(doc).find("head").append(script);
        var div = $("<div>&nbsp;</div>");
        var mileageInput = $("<input style='margin-right:5px;' type='text' id='mileage' value='"+startMileage+"'/>");
        div.append("<label>miles/gallon</label>");
        div.append(mileageInput);    
        mileageInput.keyup(changeMileage);
        var priceInput = $("<input type='text' id='price' value='"+startPrice+"'/>");
        div.append("<label>$/gallon</label>");
        div.append(priceInput);    
        priceInput.keyup(changePrice);
        $(doc).find("body").prepend(div);
    }
});

function changeMileage(){
    var text = $(this).val();
    if(parseInt(text)){
        var mileage = parseInt(text);
        localStorage.mileage = mileage;
        calculateTripCosts(document, mileage, localStorage.price);
    }
}

function changePrice(){
    var text = $(this).val();
    if(parseFloat(text)){
        var price = parseFloat(text);
        localStorage.price = price;
        calculateTripCosts(document, localStorage.mileage, price);
    }
}

function calculateTripCosts(doc, mileage, price){
    $(doc).find(".altroute-info span").each(function(){
        var text = $(this).text();
        if(text.match(/.*? mi( .*$|$)/)){
            var mileArray = text.split(" ");
            var miles = parseFloat(mileArray[0].replace(",",""));
            $(this).text(mileArray[0]+" "+mileArray[1]+" $"+parseFloat(1/mileage * miles * price).toFixed(2));
        }
    }); 
}