// ==UserScript==
// @name           Google Finance My Portfolio-Show difference from bought price
// @namespace      http://userscripts.org/users/boughtDifference
// @description    Shows the price difference between bought price and value now
// @include        http://www.google.com/finance/portfolio?client=ig&action=view&pid=1
// ==/UserScript==


//Credits to Tom Preuss for starting out with a chopped up version of his Google Finance code.
//Special thanks to Avindra Goolcharan


//USER: rekaj
//Version 1.2

//still trying to get it to place "N/A" in the table when you haven't bought that stock  (if statement)
//still trying to learn what  replace means with slashes...//...basically use a more efficient Replace(),
// still trying to get darker google red, not brighter red.
//Anyone know about this stuff?

(function() {

for (i=1;i<=20;i=i+1) 
{
var span = document.createElement('span')	//create span    



var x=document.getElementById('pview_t').rows[i].cells;
if (x[6].innerHTML== '<span class="chb"></span>') 
{
alert("here" + x[6].innerHTML);
span.innerHTML = "N/A";
x[3].appendChild(span);
continue; //so if there is no cost basis (you haven't bought any), then it continues loop
}
if (x[5].innerHTML=='&nbsp;') break; //to break after the last one is found
var costbasisCOL =x[6].innerHTML.replace('<span class="chg">', "").replace('</span>', "").replace(' ', "").replace(',', ""); 
var sharesCOL =x[5].innerHTML.replace('<span class="chg">', "").replace('</span>', "").replace(' ', ""); 
var lastPriceCOL =x[3].innerHTML.replace(/<span class="" id=".+">/, "").replace('</span><span class="delay">*</span>', "").replace('</span><span class="delay"></span>', "").replace('<img alt="" class="sort-arrow" src="/finance/s/m4C5KaofCbA/images/cleardot.gif">', "").replace(' ', "");  
//alert(costbasisCOL + " " + sharesCOL + " " + lastPriceCOL);


difference = (lastPriceCOL-(costbasisCOL/sharesCOL));//calculate price you paid for shares, subtracted by worth now
difference = (Math.round(difference*100)/100).toFixed(2);
span.innerHTML =  " <font color=\"" + (difference >= 0 ? "green" : "red") + "\">" + difference + "</font>";	//green for positive, red for negative
x[3].appendChild(span);	//add the span  

}


})(); 

