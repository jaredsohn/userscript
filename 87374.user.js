// ==UserScript==
// @name           NCIX Upgrade
// @namespace       
// @include        *ncix.com/*
// ==/UserScript==

// NEW post and reply sets "message" as the default
var DEFAULT_NEW_POST_IS_MESSAGE = true

// Converts "customer reviews" links to a link not an anchor
var CUST_REVIEW_LINK_IS_REVIEW_PAGE = true;

// Checks terms of agreements box
var CHECK_MARK_ON_TERMS = true;

// Deletse the terms and condition text
var DELETE_FORUM_TERMS_AND_CONDITIONS = true;

// removes prodcut suggestions
var REMOVE_PRODUCT_SUGGESTIONS = true

// Makes the SKU in product pages a link back to itself
var LINK_THE_SKU = true


// get the SKU to reduce redundant code(which is used in two functions)
var prodSKU = getSKU();

if (LINK_THE_SKU)
	linkSKU(prodSKU);
	
if (DEFAULT_NEW_POST_IS_MESSAGE)
	newPostIsMessage();

if (CUST_REVIEW_LINK_IS_REVIEW_PAGE)
	fullReviewLink(prodSKU);
	
if (CHECK_MARK_ON_TERMS)
	addCheckmark();

if (DELETE_FORUM_TERMS_AND_CONDITIONS)
	deleteTerms();

if (REMOVE_PRODUCT_SUGGESTIONS)
	deleteSuggestions();
	
	
function deleteSuggestions()
{
	var suggestionNode = document.getElementById("myspage");
	if (suggestionNode)
	{
		suggestionNode.previousSibling.previousSibling.previousSibling.previousSibling.parentNode.removeChild(suggestionNode.previousSibling.previousSibling.previousSibling.previousSibling);
		suggestionNode.previousSibling.previousSibling.parentNode.removeChild(suggestionNode.previousSibling.previousSibling);
		suggestionNode.parentNode.removeChild(suggestionNode);
	}

}
	
function deleteTerms()
{
	var Found_Inputs = document.body.getElementsByTagName("strong");
	for (i = 0; i < Found_Inputs.length; i++)
	{
		if (Found_Inputs[i].innerHTML.match(/NCIX.com FORUM'S USAGE TERMS AND CONDITIONS/i))
		{
			var myNode = (Found_Inputs[i].parentNode.parentNode.parentNode);
			myNode.parentNode.removeChild(myNode);
		}
	}

}



function addCheckmark()
{
	var Found_Inputs = document.body.getElementsByTagName("input");

	for (i = 1; i < Found_Inputs.length; i++)
	{
		if ((Found_Inputs[i].parentNode.innerHTML.match(/I agree to the terms and conditions below/i)) || ((Found_Inputs[i].parentNode.innerHTML.match(/I have read the terms below and agree with it/i))))
		{
			//adds a checkmark then ends the if statment
			Found_Inputs[i].checked=true;
			break;
		}
	}
}
	
function fullReviewLink(theSKU)
{
	if (theSKU)
	{
		var alinks = document.body.getElementsByTagName("A");

		for (i = 1; i < alinks.length; i++)
		{
			if (alinks[i].href.match(/\#CustomerReviews/i))
			{
				alinks[i].href = "http://ncix.com/products/index.php?mode=productreviewread&product_id=" + theSKU;
			}
		}
	}
}
	
function newPostIsMessage()
{
	var Found_Inputs = document.body.getElementsByTagName("option");

	for (i = 1; i < Found_Inputs.length; i++)
	{
		if ((Found_Inputs[i].innerHTML.match(/Message/i)))
		{
			//selects the message type
			Found_Inputs[i].selected=true;
			break; //break is there as safety
		}
	}
}




function linkSKU(theSKU)
{
	// make sure var is set (this way if NCIX changes the layout, it wont break the rest of the script)
	if (theSKU)
	{	
		var Found_Span = document.body.getElementsByTagName("span");
		for (i = 1; i < Found_Span.length; i++)
		{
			if (Found_Span[i].innerHTML.match(/SKU:\&nbsp;\&nbsp;/i))
			{			
				//Replaces the normal product SKU with a link to it
				Found_Span[i].innerHTML = Found_Span[i].innerHTML.replace(/font>\d+<br>/i, "font><a href=\"http://www.ncix.com/products/index.php?sku=" + theSKU + "\">" + theSKU + "</a><br>");
			}
		}
	}
}

function getSKU()
{
	var Found_Span = document.body.getElementsByTagName("span");

	for (i = 1; i < Found_Span.length; i++)
	{
		if (Found_Span[i].innerHTML.match(/SKU:\&nbsp;\&nbsp;/i))
		{
			//Gets the product SKU with leading and trailing junk
			var sku = Found_Span[i].innerHTML.match(/font>\d+<br>/i);
			
			//removes junk, and gets pure product SKU
			sku = String(sku).match(/\d+/);
			
		
		}
	}
	return(sku);

}