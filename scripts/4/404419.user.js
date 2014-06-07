// ==UserScript==
// @name Groupon price filtering ALPHA
// @description IN DEVELOPMENT:Adds toolbar on page to filter what products get displayed. Fields are optional. NOTE: it doesn't currently filter past "See more deals".
// @include       https://www.groupon.com/*
// @include       http://www.groupon.com/*
// ==/UserScript==


//TODO:Fix event handler
//-http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
//-http://userscripts.org/topics/28002?page=1#posts-127887
//TODO: auto load and filter past "See more deals".
//TODO: add sorting ability

function priceFilter(){
var index=0;
var indexamount=0;
var node;
var greaterthan=0;
var lesserthan=100000;

for (index = 0; index < document.querySelectorAll(".discount-price").length; ++index) {
	indexamount = parseFloat(document.querySelectorAll(".discount-price")[index].innerHTML.substring(1));
	document.querySelectorAll(".discount-price")[index].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "";
    	
	if(document.getElementById("filtergreater").value!="")
		greaterthan = document.getElementById("filtergreater").value;
	else
		greaterthan = 0;
		
	if(document.getElementById("filterlesser").value!="")
		lesserthan = document.getElementById("filterlesser").value;
	else
		lesserthan = 100000;
		
	if(!(indexamount>=greaterthan && indexamount<=lesserthan))
	{
		document.querySelectorAll(".discount-price")[index].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
	}
}
}

if(document.querySelectorAll(".results_count_container").length>0)
{
	var filterbar = '<span>Greater than or =:<input type="text" id="filtergreater" size="7"> Less than or =:<input type="text" id="filterlesser" size="7" > <button type="button" id="filterbutton">Filter</button> </span>';

	document.getElementById("js-page-header").insertAdjacentHTML('beforeend', filterbar);

document.getElementById("filterbutton").addEventListener('click', priceFilter(),false)
}