// ==UserScript==
// @name       My SSW AutoPricer
// @namespace  HAPPY FUN TIME
// @version    0.1
// @description  Uses SSW (Super Shop Wizard) to price your inventory! Just click the name of the item you want to price ONCE (on the text) and watch the magic happen!
// @include      http://www.neopets.com/market.phtml*
// @copyright  2012+, You
// ==/UserScript==

var head, style, items, j;
var prices = [];
head = document.getElementById("sswmenu");
items = document.getElementsByTagName("td");
priceInput = document.getElementsByTagName("input");
var tbPrice;
for(j = 0; j < items.length; ++j)
{
 	if(items[j].width == "60")
    {
        var tempName = items[j].childNodes[0].innerHTML;
        items[j].childNodes[0].addEventListener("click",DoubleClickAnItem,false);   
    }
    
}
for(j = 0; j < priceInput.length; ++j)
{
    if(priceInput[j].maxLength == 5)
    {
     	prices.push(priceInput[j]);   
    }   
}
function SearchFor(itemName)
{
    var textB = document.getElementsByName("searchstr");
    textB[0].value = itemName;
    ClickTheSearchButton();
}
function ClickTheSearchButton()
{
    searchButton = document.getElementById("button-search");
    searchButton.click();
   	
    setTimeout(FillInTheValue, 750);
}
function FillInTheValue()
{
    var rowIndex = 1;
	var cellIndex = 2;
	var lowestPrice = document.getElementById('results_table').rows[rowIndex].cells[cellIndex];
    lowestPrice = lowestPrice.innerHTML;
    lowestPrice = lowestPrice.replace(",","");
    lowestPrice = lowestPrice.split(' ');
    lowestPrice = lowestPrice[0];
    lowestPrice = parseInt(lowestPrice);
    lowestPrice = lowestPrice - 10;
    
    console.log(lowestPrice);
    
    tbPrice.value = lowestPrice;
    
   	setTimeout(200);
    
    var closeIt = document.getElementById("close-button");
    closeIt.click();
    
}
function DoubleClickAnItem()
{  
    var _this = this;
    console.log(this.childNodes[0].data);  
    
    ReplaceContentInContainer("sswdrop panel_hidden");
    
    for(j = 0; j < items.length; ++j)
	{
 		if(items[j].width == "60" && items[j].childNodes[0].innerHTML == this.childNodes[0].data)
    	{
        	tbPrice = items[j+4].childNodes[0];
   		}
    
	}
    SearchFor(this.childNodes[0].data);
    
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

if (!head) {}
else {
    //toChange = document.getElement
    
    //style = document.createElement('style');
    //style.type = 'text/css';
    //style.innerHTML = css;
    //head.appendChild(style);

    //ReplaceContentInContainer("life","Overwritten Content");
    
}