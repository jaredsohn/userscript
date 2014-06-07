// ==UserScript==
// @name           NI Side Bar
// @namespace      http://nordinvasion.com
// @description    Adds user created menus to the website
// @include        http://nordinvasion.com/*
// @include        http://www.nordinvasion.com/*
// ==/UserScript==

var auctionHouseArr = [];
var craftingArr = [];
var menu = "";

//page checker
if (location.href.indexOf("http://n") != -1){
	location.href = location.href.replace("http://n", "http://www.n");
}

//initialisation
if (localStorage.NI_firstTime != "1")
{
	localStorage.NI_auctionHouseArr = "";
	localStorage.NI_craftingArr = "";
	localStorage.NI_auctionVisible = "block";
	localStorage.NI_craftVisible = "block";
	localStorage.NI_firstTime = "1";
	//alert("first time setup");
}

menuobj = document.createElement('section'); menuobj.style.position = 'fixed'; menuobj.style.top = '10px'; menuobj.style.width = '10%';
menuobj.style.left = '10px'; menuobj.style.padding = '20px'; menuobj.style.backgroundColor = '#fff'; menuobj.style.border = 'double';

output();

//add a auction house link
function addAuctionHouseLink(){
	if (location.href.indexOf('http://www.nordinvasion.com/auction_hall.php?q=') == -1)
	{
		var itemName = prompt("Enter the item name:");
		var itemNameSplit = itemName.split(' ');
		
		for (i in itemNameSplit)
		{
			itemNameSplit[i] = itemNameSplit[i].charAt(0).toUpperCase() + itemNameSplit[i].slice(1);
		}
		itemName = itemNameSplit.join(' ');
		
		auctionHouseArr.push('<a style="text-decoration:none;" href="http://www.nordinvasion.com/auction_hall.php?q=' + itemName.replace(" ", "+") + '">&raquo; ' + itemName + '</a>');
	}
	else
	{
		var itemURL = location.href;
		var itemNameSplit = itemURL.split('auction_hall.php?q=')[1].replace('+',' ').split(' ');
		
		for (i in itemNameSplit)
		{
			itemNameSplit[i] = itemNameSplit[i].charAt(0).toUpperCase() + itemNameSplit[i].slice(1);
		}
		var itemName = itemNameSplit.join(' ');	

		auctionHouseArr.push('<a  style="text-decoration:none;" href="' + itemURL + '">&raquo; ' + itemName + '</a>');
	}
	localStorage.NI_auctionHouseArr = auctionHouseArr.join();
	output();
}

function addCraftingLink(){
	if (location.href.indexOf('http://www.nordinvasion.com/crafting.php?b') == -1)
	{
		var craftName = prompt("Enter crafting item name:");
		var craftURL = prompt("Enter crafting item url:");
		if (craftName != '' && craftURL != '')
		{
			craftingArr.push('<a style="text-decoration:none;" href="' + craftURL + '">' + craftName + '</a>');
		}
	}
	else
	{
		var craftName = document.getElementsByClassName('rightContent')[0].getElementsByTagName('h2')[0].innerHTML.replace('Crafting: ', '');
		var craftURL = location.href;
		craftingArr.push('<a style="text-decoration:none;" href="' + craftURL + '">&raquo; ' + craftName + '</a>');
	}
	localStorage.NI_craftingArr = craftingArr.join();
	output();
}

function removeAuctionHouseLink(i){
	auctionHouseArr.splice(i, 1);
	localStorage.NI_auctionHouseArr = auctionHouseArr.join();
	output();
}

function removeCraftingLink(i){
	craftingArr.splice(i,1);
	localStorage.NI_craftingArr = craftingArr.join();
	output();
}

function getAuctionHouseLinks(){
	var temp = '';
	temp += '<img style="display:inline;vertical-align:bottom;" src="/images/house.png"> <a id="aucVis" onmousedown="if(localStorage.auctionVisible == \'none\'){document.getElementById(\'auctionDiv\').style.display = \'block\';localStorage.auctionVisible = \'block\';}else{document.getElementById(\'auctionDiv\').style.display = \'none\';localStorage.auctionVisible = \'none\';}"><b>Auction House</b></a><div id="auctionDiv" style="display:' + localStorage.auctionVisible + '">'
	
	if (localStorage.NI_auctionHouseArr != "") //add any links if found
	{
		auctionHouseArr = localStorage.NI_auctionHouseArr.split(",");
		for (i in auctionHouseArr)
		{
					//lists html code  + remove button
			temp += auctionHouseArr[i] + '  <img style="vertical-align:middle;" id="ah' + i + '" src="http://campus.codechef.com/images/cross-icon.gif"><br />';
		}
	}
	temp += '<br /><input type="button" id="btnAddAuctionHouse" value="Add" /></div>';
	return temp;
}

function getCraftingLinks(){
	var temp = '';
	
	temp += '<img style="display:inline;vertical-align:bottom;" src="/images/wrench.png"> <a id="craftVis" onmousedown="if(localStorage.craftVisible == \'none\'){document.getElementById(\'craftDiv\').style.display = \'block\';localStorage.craftVisible = \'block\';}else{document.getElementById(\'craftDiv\').style.display = \'none\';localStorage.craftVisible = \'none\';}"><b>Crafting</b></a><div id="craftDiv" style="display:' + localStorage.craftVisible + '">'
	
	if (localStorage.NI_craftingArr != "")
	{
		craftingArr = localStorage.NI_craftingArr.split(",");
		for (i in craftingArr)
		{
			temp += craftingArr[i] + '  <img style="vertical-align:middle;" id="c' + i + '" src="http://campus.codechef.com/images/cross-icon.gif"><br />';
		}
	}
		temp += '<br /><input type="button" id="btnAddCrafting" value="Add" /></div>';
		return temp;
}

//crafting other links html
function getOtherLinks(){
	var temp = '';
	
	temp += '<img style="vertical-align:bottom;" src="http://www.nordinvasion.com/images/arrow_switch.png"> <a style="text-decoration:none;" href="http://www.nordinvasion.com/trading.php?act=invite">Invite to trade</a>'
	
	return temp;
}

//output to screen
function output()
{
	menu = '<center>'; // //encapsulate the region
	menu += getAuctionHouseLinks() + '<br /><br /><hr><br />';
	menu += getCraftingLinks() + '<br /><br /><hr><br />';
	menu += getOtherLinks();
	menu += '</center>';
	
	menuobj.innerHTML = menu;
	body = document.getElementsByTagName('body')[0];
	body.appendChild(menuobj);
	addEvents();
}

//add events
function addEvents() {
	if (auctionHouseArr.length > 0)
	{
		for (i in auctionHouseArr)
		{
			addEventListeners('ah',i,removeAuctionHouseLink);
		}
	}
	if (craftingArr.length > 0)
	{
		for (i in craftingArr)
		{
			addEventListeners('c',i,removeCraftingLink);
		}
	}
	
	document.getElementById('btnAddAuctionHouse').addEventListener('click', addAuctionHouseLink, false);
	document.getElementById('btnAddCrafting').addEventListener('click', addCraftingLink, false);
}

//event listerer thing
function addEventListeners(id,i,f) {
	var temp = id + i;
	//alert(temp);
    document.getElementById(temp).addEventListener("click", function(){f(i)}, false);
}