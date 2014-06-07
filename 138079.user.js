// ==UserScript==
// @name                CapitalOne RunningTotal
// @namespace	        http://www.activatingart.com
// @description	        Add a running total to capital one's credit card transactions page.  No guarantees that it's accurate (although it should be).
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include		https://servicing.capitalone.com/C1/Accounts/Activity.aspx?*
// ==/UserScript==

function convertToNumber(input)
{
    input = input.textContent;
    input = $.trim(input);
    input = input.replace (/,/g, ""); //otherwise it gets caught up on commas
    var decimalPlace = input.indexOf(".");
     
    if(input.charAt(0) == "(")
        return("-" + input.substr(2, decimalPlace + 1));
    else
        return(input.substr(1, decimalPlace + 2));
}

function addCommas(x) 
{
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

var nextBalance = document.getElementById('summaryvalcol1').childNodes[1].childNodes[1];
nextBalance = +convertToNumber(nextBalance);
var spanList = $('span[id^=ctlPostedAccountActivityChecking_][id$=_postedTAD_LBLAMOUNTVALUE]');

for(var i = 0; i < spanList.length; i++)
{
    var currentBalance = document.createElement('span');
	currentBalance.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' + addCommas(nextBalance);
	spanList[i].style.cssText = "margin-right: 80px;";
    spanList[i].parentNode.insertBefore(currentBalance, spanList[i].nextSibling);
    nextBalance = Math.round((nextBalance - +(convertToNumber(spanList[i])))* 100) / 100;
}