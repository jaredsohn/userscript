// ==UserScript==
// @name       QuestHelper SSW
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include      http://www.neopets.com/halloween/esophagor2*
// @include		 http://www.neopets.com/island/kitchen2*
// @include 	 http://www.neopets.com/winter/snowfaerie2*
// @include      http://www.neopets.com/halloween/witchtower2*
// @copyright  2014+, You
// ==/UserScript==

var head, style, items, j, k;
//var prices = [];
head = document.getElementById("sswmenu");
items = document.getElementsByTagName("td");
var ItemsToSearch = [];
var tbPrice;
var itemName;
var ItemLinks = [];
var index = 0;
var name = "";
var ItemW0 = "";
var ItemW1 = "";
var ItemW2 = "";
var ItemW3 = "";
index = parseInt(index);
var TotalPrice = 0;
TotalPrice = parseInt(TotalPrice);

for(j = 0; j < items.length; ++j)
{
 	if(items[j].clientHeight == "102")
    {
        //items[j].lastChild.addEventListener("click",ClickAnItem,false);
        ItemsToSearch.push(items[j].lastChild.childNodes[0].data);
    }
}
function getRandomInt (min, max) {
    return Math.floor (Math.random () * (max - min + 1) ) + min;
}

function stLooking()
{
        var Item1 = ItemsToSearch[0];
		var Item2 = ItemsToSearch[1];
    	var Item3 = ItemsToSearch[2];
    	var Item4 = ItemsToSearch[3];
    
        //alert(MehzO);
     	setTimeout(function (){SearchFor(Item1);}, getRandomInt(500, 3000));
        setTimeout(function (){SearchFor(Item2);}, getRandomInt(4000, 7000));
        if(Item3 != undefined){
        setTimeout(function (){SearchFor(Item3);}, getRandomInt(8000, 11000));
        }
        if(Item4 != undefined){
        alert(Item4);
        setTimeout(function (){SearchFor(Item4);}, getRandomInt(12000, 15000));
        }
}
function ClickAnItem()
{  
    var _this = this;
    
    ReplaceContentInContainer("sswdrop panel_hidden");
   
    SearchFor(this.childNodes[0].data);
}
function SearchFor(itemName)
{
    //alert(itemName);
    ReplaceContentInContainer("sswdrop panel_hidden");
    
    var textB = document.getElementsByName("searchstr");
    
    textB[0].value = itemName;
    
    ClickTheSearchButton();
}
function ClickTheSearchButton()
{
    searchButton = document.getElementById("button-search");
    searchButton.click();
   	
    setTimeout(CompareValue, 700);
}
function CompareValue()
{
    var rowIndex = 1;
	var cellIndex = 2;
    index = index + 1;
	var lowestPrice = document.getElementById('results_table').rows[rowIndex].cells[cellIndex];
    lowestPrice = lowestPrice.innerHTML;
    lowestPrice = lowestPrice.replace(",","");
    lowestPrice = lowestPrice.split(' ');
    lowestPrice = lowestPrice[0];
    lowestPrice = parseInt(lowestPrice);
    tbPrice = lowestPrice;
    if (lowestPrice <= 6000)
    {
        //alert("lowprice, opening link");
        tempClick = document.getElementById('results_table').rows[1].cells[0].lastChild;
        //tempClick.click();
        //alert("link should be open");
        var newSearch = document.getElementById("button-new-search");
        newSearch.click();
        //alert("new search");
        
        TotalPrice = TotalPrice + lowestPrice;
        if (TotalPrice >= 10000){
         	alert("Reached max price of 10000");  
        }
     	ItemLinks.push(tempClick.href);
        //tempClick.lastChild.click(); 
        if(index == ItemsToSearch.length)
        {
            for(var x = 0; x < ItemsToSearch.length; ++x)
            {
                name = "ItemW" + x.toString(); 
             	//var name = window.open (ItemLinks[x],name);
                OpenWindow(x,name);
                
            }	
        }
    }
    else
    {
     	alert("An item was over 6000!");   
    }
    
    console.log(lowestPrice);
    
    //tbPrice.value = lowestPrice;
   	//setTimeout(200);
    
    //var closeIt = document.getElementById("close-button");
    //closeIt.click();
    
}
function OpenWindow(x,name)
{
    switch (x){
        case 0:
            setTimeout(function (){ItemW0 = window.open(ItemLinks[x],name);}, getRandomInt(1000, 1500));  
            break;
        case 1:
            setTimeout(function (){ItemW1 = window.open(ItemLinks[x],name);}, getRandomInt(1000, 1500));
            break;
        case 2:
            setTimeout(function (){ItemW2 = window.open(ItemLinks[x],name);}, getRandomInt(1000, 1500));  
            break;
        case 3:
            setTimeout(function (){ItemW3 = window.open(ItemLinks[x],name);}, getRandomInt(1000, 1500));  
            break;
    }
    FollowThru(name, ItemLinks[x]);
    
}
function FollowThru(name, link)
{
    setTimeout(function (){BuyItem(name,link);}, getRandomInt(2500, 4700));
}
function BuyItem(name, ItemLink)
    {
	var tempEle = wName.document.getElementsByTagName("td");
    var itemId = ItemLink.split('&');
    itemId = itemId[1];
    itemId = itemId.substring(4);
        
    for(var y = 0; y < tempEle.length; y++)
    {
        var SearchIn = tempEle[y].href;

     	if (SearchIn.indexOf(itemId) > -1)
            {
            	tempEle[y].click();
                //return true;
            }
        
        
    }
    
    
            
}
function ReplaceContentInContainer(matchClass)
{
    var elems = document.getElementsByTagName('*'),i;
    for (i in elems)
        {
        if((" "+elems[i].className+" ").indexOf(" "+matchClass+" ") > -1)
            {
            elems[i].className = "sswdrop panel_shown";
            elems[i].style.cssText = "";
            elems[i].style.display = "";
               
            }
        }
}

stLooking();
