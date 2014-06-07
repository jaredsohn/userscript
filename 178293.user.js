/*

TradeMe End Price

Author: JimBob Baggins
Shows end price for all listings in TradeMe
Licence: Do what you like with me


*/

// ==UserScript==
// @name           TradeMe End Price
// @namespace      http://www.samkelly.co.nz/
// @include        http://www.trademe.co.nz/*
// @description    Show end price for all listings in TradeMe
// @grant metadata
// ==/UserScript==
/*
* Changes:
* Made it a little more generic because TradeMe keeps changing their code...
* Thanks to drsr for a script suggestion!
*/

if (document.getElementById("ListingTitle_titleTime")!=null){

if (document.getElementById("ListingTitle_titleTime").innerHTML.substr(0,6)=="Closed"){
 if (document.getElementById("ListingTitle_auctionTitleBids")==null){
 
 function loadXMLDoc()
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    
    var rText = xmlhttp.responseText
    
    
    var count = (rText.match(/<strong>/g) || []).length
    
    var bidPrice=""
    var startP = 0
    if (count>1) startP = rText.indexOf("<strong>")+1
    
    if (count>0){
        var l2 = rText.indexOf("<strong>", startP)
        bidPrice = rText.substr(l2 + 8, rText.indexOf("</strong>",l2) - l2 - 8)
    }
    
    
    if (bidPrice.length>0){ 
    if (document.getElementById("ListingTitle_auctionTitleReserve")==null){
        var xx = document.getElementById("ListingTitle_titleTime").innerHTML
        document.getElementById("ListingTitle_titleTime").innerHTML = "<span style='color:black;'><b>"+ bidPrice + "</b></span>&nbsp;&nbsp;&nbsp;&nbsp;" + xx
    
    } else {
        var xx = document.getElementById("ListingTitle_auctionTitleReserve").innerHTML
        document.getElementById("ListingTitle_auctionTitleReserve").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<b>" + bidPrice + "</b>   " + xx
    }
    }
    }
  }

	//var lidno = document.getElementById("ListingTitle_listingNumberContainer").innerHTML.trim()
var lidno = document.getElementById("ListingTitle_noStatusListingNumberContainer").innerHTML.trim()
  	var listId = lidno.substr(11)

xmlhttp.open("GET","http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fm.trademe.co.nz%2FListing%3Flid%3D" + listId + "%22%20and%20xpath%3D'%2F%2Fstrong%5Bstarts-with(text()%2C%20%22%24%22)%5D'",true);

xmlhttp.send();
}


 
 loadXMLDoc()
 
 }
 }
 }