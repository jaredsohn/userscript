// ==UserScript==
// @name	  eRepublik Autodonater
// @version       2
// @description	  Able to update amount to donate from Donations screen will  automatically shift into a max donate mode for company donations. Improved checks on donation amounts.
// @include       http://ww*.erepublik.com/*/organization/donate/items/*
// @include       http://ww*.erepublik.com/*/citizen/donate/items/*
// @include       http://ww*.erepublik.com/*/company/*/donate/items
// ==/UserScript==

var MyNumberToDonate = 5;
var junk = document.getElementById("donationlink");

// Retrieve Number, mult by 1 to make sure it IS a number(major bug otherwise)

	MyNumberToDonate = GM_getValue("MyNumberToDonate","5") * 1;


// Creates input boxes

if (junk) {
    var stuff = document.createElement('div');
	stuff.innerHTML = '<div> Desired Amount: <input type="text" id="NumberToDonate" value="' + MyNumberToDonate + '" size="2" /><br/>Actual: <span id="Num"></span><br/><br/><input type="button" id="AutoDonateButton" value="Update Amount" class="vround-btn-core" style="color: green" /></div>';
	junk.parentNode.insertBefore(stuff, junk);
}


// adds event listener

	var button = document.getElementById("AutoDonateButton");	
	button.addEventListener("click", update, true);

	var matches = document.getElementById("small").innerHTML.match(/<li style\="-moz-user-select\: none;" class\="sortItem" id\="user_([0-9]*)">/g);
	var output = "";


// Company donations Section

	var url = document.location.href;
	var isCompany = url.match("/company/");

	if (isCompany){
		MyNumberToDonate = matches.length;
	}


// if able to check do so, if more than amount of spaces available limit it to amount of spaces available

if (MyNumberToDonate <= 10){

	if (MyNumberToDonate > document.getElementById("available_items").value){
	MyNumberToDonate = document.getElementById("available_items").value;
	}

}


// limit to amount person actually has

if (MyNumberToDonate > matches.length){
		MyNumberToDonate = matches.length;
	}

// limit to available items if available items is less than 10 & if Number to donate is greater than available items
if (MyNumberToDonate > document.getElementById("available_items").value){

if (document.getElementById("available_items").value < 10){
MyNumberToDonate = document.getElementById("available_items").value;
}

}

// visual indication for actual ammount to be Donated

document.getElementById("Num").innerHTML = MyNumberToDonate;


// Workhorse of entire thing

for (i = 0; i < MyNumberToDonate; i++){
	id = matches[i].split('<li style="-moz-user-select: none;" class="sortItem" id="user_')[1].split('">')[0];
	output = output + '<input id="products_'+id+'" type="hidden" value="'+id+'" name="products[]"/>';
}

document.getElementById("big").innerHTML = output;


// Saves data

function update(e) {	
	
	var NumberToDonate = document.getElementById("NumberToDonate").value;

	GM_setValue("MyNumberToDonate", NumberToDonate);
window.location = url;

}

