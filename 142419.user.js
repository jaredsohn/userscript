// ==UserScript==
// @name           MM Script [Primera]
// @namespace      Elitist
// @description    Inverts MM currency amounts on Mouse-over
// @include        http://primera.e-sim.org/monetaryMarket.htmll*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


// Notes: Potential Earnings rounded up
// 4 sig figures all

// Needs market offers inorder to work


// Buy/Sell Values

var buy = "Gold";
if ( $("#offeredMoneyId > option:selected").text() !="Gold")
buy = $("#offeredMoneyId > option:selected").text().substr(0,3);


var sell = "Gold";
if ( $("#buyedMoneyId > option:selected").text() !="Gold")
sell = $("#buyedMoneyId > option:selected").text().substr(0,3);


// Get Own Currency Amounts

var buyVal = $('table.dataTable').filter(":even").contents().find("img")[1].src;

if (typeof $("#hiddenMoney").parent().find("img[src='" +buyVal+ "']").next("b")[0] === "undefined")
{
buyVal = 0;
}
else
{
buyVal = $("#hiddenMoney").parent().find("img[src='" +buyVal+ "']").next("b")[0].innerHTML;
buyVal *= 1;
}


var sellVal = $('table.dataTable').filter(":even").contents().find("img")[2].src;

if (typeof $("#hiddenMoney").parent().find("img[src='" +sellVal+ "']").next("b")[0] === "undefined")
{
sellVal = 0;
}
else
{
sellVal = $("#hiddenMoney").parent().find("img[src='" +sellVal+ "']").next("b")[0].innerHTML;
sellVal *= 1;
}



// General Offers

// Rate Inverse

$('table.dataTable').filter(":even").contents().find("b").filter(":odd").each(function(index) {
	var title = 1/$(this).text();

		title *= 10000;
		title = Math.round(title)
		title /= 10000;

	this.title = title +" "+ buy +" / "+ sell;
});


// Potential Earnings
$("table.dataTable").filter(":even").contents().find("b").filter(":even").each(function(index) {

	var title = $(this).text() * $("table.dataTable").filter(":even").contents().find("b").filter(":odd")[index].innerHTML;
		
		title *= 10000;
		title = Math.round(title)
		title /= 10000;

	this.title = title +" "+ sell;

});


// Quantity copy
$('input[name="ammount"]').each(function(index) {

	this.addEventListener ("focus", function () {this.value='';}, false);
	
	var offerVal = $("table.dataTable").contents().find("b").filter(":even")[index].innerHTML;
	offerVal = offerVal * 1;
	
	var postVal = sellVal / $("table.dataTable").contents().find("b").filter(":odd")[index].innerHTML;

		postVal *= 100;
		postVal = Math.floor(postVal);
		postVal /= 100;


	if(offerVal < postVal){
		this.value = offerVal;
	}
	else{
		this.value = postVal;	
	}

	
});




// Own Offers


// Rate Inverse

$('table.dataTable').filter(":odd").contents().find("b").filter(":odd").each(function(index) {
	var title = 1/$(this).text();

		title *= 10000;
		title = Math.round(title);
		title /= 10000;

	this.title = title;
});


// Potential Earnings
$("table.dataTable").filter(":odd").contents().find("b").filter(":even").each(function(index) {

	var title = $(this).text() * $("table.dataTable").filter(":odd").contents().find("b").filter(":odd")[index].innerHTML;
		
		title *= 10000;
		title = Math.round(title);
		title /= 10000;

	this.title = title;

});


// onfocus clear offer value
$("#value").each(function(index) {


	this.value = buyVal;

	this.addEventListener ("focus", function () {this.value='';}, false);

});


// Sets exchange rate to lowest on market
$("#exchangeRatio").each(function(index) {

	var lowest = $("table.dataTable").contents().find("b").filter(":odd")[0].innerHTML;
	
	lowest -= 0.0001;
		lowest *= 10000;
		lowest = Math.round(lowest);
		lowest /= 10000;
	this.value = lowest;

});



// set tooltip

$("table.dataTable").contents().find("b").addClass("smallhelp");
location.assign( "javascript:$('.smallhelp[title]').tooltip({ tipClass: 'smalltooltip'});void(0)" );
