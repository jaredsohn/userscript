// ==UserScript==
// @name           Fill in Maximum Bid - Ebay
// @namespace      n.j.white@gmail.com
// @include        *.ebay.tld/*
// ==/UserScript==
try{
var DetailsActionMaxBidElement = document.getElementById("DetailsActionMaxBid");
var amount = "";

if(DetailsActionMaxBidElement)
{
	//main page has this element
	DetailsActionMaxBidElement.innerHTML.match(/Enter .(\d+\.\d+) or more/);
  amount = RegExp.$1; 
}
else
{
	//try looking for an outbid page
	var arr = document.getElementsByTagName("td");
  for (i = 0; i < arr.length; i++) 
  {
  	if(arr[i].innerHTML.match(/\(Enter .(\d+\.\d+)&nbsp;/))
  	{
  		amount = RegExp.$1;
  		break;
  	}
  }
}

var maxbid_element = document.getElementById("maxbid");
if(maxbid_element){maxbid_element.value = amount;} 

var maxbidBottom_element = document.getElementById("maxbidBottom");
if(maxbidBottom_element){maxbidBottom_element.value = amount;}

}catch(err){alert(err);}