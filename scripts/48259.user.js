// ==UserScript==
// @name           BlogShares Idea Max Fill
// @namespace      https://dav.caranta.com/scripts/GM/blogsharesmaxideasbuy.js
// @description    Buy Maximum amount of any idea From BlogShares
// @include        http://blogshares.com/*buy_ideas=yes*
// ==/UserScript==


(function()
{
	var formTag = document.getElementsByTagName('form')[1] ;
	var BuyInput = formTag.getElementsByTagName('input')[3];
	var AmountTxt = formTag.getElementsByTagName('small')[0];
	var Amount = AmountTxt.childNodes[0].nodeValue ;
	
	Amount = Amount.replace(/ available.*/,"") ;
	Amount = Amount.replace(/,/g,"") ;
//	GM_log(Amount) ;


	if (Amount != '0')
	{
		BuyInput.value = Amount ;
		AmountTxt.childNodes[0].nodeValue = '(OK) ' + AmountTxt.childNodes[0].nodeValue;
	}


	var tableFill = document.getElementsByTagName('table')[2];
	var trFill = tableFill.getElementsByTagName('tr')[2];
	var tdFill = trFill.getElementsByTagName('td')[0];

	tdFill.innerHTML = "<p align='center'>Filled to stable size ;)</p>" ;
	tdFill.width = "300px" ;
	
}) ();