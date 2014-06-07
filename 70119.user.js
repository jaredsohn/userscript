// ==UserScript==
	// @name		g.e-hentai.org monkeystyle template
	// @namespace	        none
	// @description	        Displays images like popular right now insteadd of links
	// @include                   http://g.e-hentai.org/*	
// ==/UserScript==
//=============================================================================
//# Remarks: Do Not remove!
//# Script Version 1.1
//# Made by magicalmuffin
//# Get Original script hire: http://forums.e-hentai.org/index.php?showtopic=24440
//=============================================================================
//# Changes in v.1.1
//# added hover mouse over image to see gallery name
//#


var img_scr = [];
var gallery_href = [];
var gallery_name = [];
var GlobalArr = document.querySelectorAll('div.it2', 'div.it3');
var GlobalArr2 = document.querySelectorAll('div.it1');

//# main loop
for(var i=0; i<GlobalArr.length; i++){

	var item_src  = GlobalArr[i].firstChild.src;
	var item_data = GlobalArr[i].firstChild.data;
	var item_alt  = GlobalArr[i].firstChild.alt;	
	
	var item_href = GlobalArr2[i].firstChild.href;
	
	_Put_img_scr_toarray(i,item_src, item_data, item_alt, item_href)	
}

	_Replace_main_Table_with_dummy_tag()
	

	
//=============================================================
//# Array containing image Source links  Loop thru it & add new divs
//=============================================================	
var arLen=img_scr.length;
for ( var i=0, len=arLen; i<len; ++i ){
	
	//GM_log(i + ' ' + img_scr[i]);
	
	_append_divs_to_dummy_divTag(i)
}
//# End func ===================================================	

//=============================================================
// Find links we need & put them into array
//=============================================================
function _Put_img_scr_toarray(i,item_src, item_data, item_href)
{
	// # If source not undefined
	if (item_src != null) 
	{
	img_scr[i] = item_src
	}		
	//-----------------------------------------------------------------------------------------
	//# If data not undefined
	if (item_data != null) 
	{
	var imageurl = _extract_url(item_data)	//<----Subfunction to extract full image URL from string
	img_scr[i] = imageurl
	}
	
	gallery_name[i] = item_alt
	gallery_href[i] = item_href
	
//	GM_log(i + ' ' + item_href);
		
}		

//=============================================================
//Extract URL from string
//=============================================================
function _extract_url(string)
{
	// Remove Init~
	var myOldString = string;
	var myNewString = myOldString.replace("init~", 'http://gt.ehgt.org:81' + '');
		
	myNewString = myNewString.split('~')[0] // Remove stuff after link
	return myNewString
}		
		
//=============================================================
//# Replace table with dummy div element so we can append stuff to it lather.
//=============================================================
function _Replace_main_Table_with_dummy_tag()
{
	tables = document.evaluate( "//table[@class='itg']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	thisDiv = tables.snapshotItem(0)

		dummy_divTag = document.createElement("div");
		thisDiv.parentNode.replaceChild(dummy_divTag,thisDiv); // New element, old element
		
		//thisDiv.parentNode.removeChild(thisDiv);
}
//# End func ===================================================
		
//=============================================================
//# Replace table with dummy div element so we can append stuff to it lather.
//=============================================================
function _append_divs_to_dummy_divTag(i)
{
	//# Parent Div
	var divTag = document.createElement("div");
	    
		divTag.setAttribute("margin","auto");
        divTag.style.width = "960";
	
		//# HTML between parent div basically image etc.
        divTag.innerHTML = ''
		+'<div style="float:left; width:238px; height:315px; margin-top:5px">'
		//+'<div style="width:238px; height:28px; margin:auto; text-align:center; overflow:hidden"><a href="http://g.e-hentai.org/g/210611/401f923061/" style="font-weight:bold; text-decoration:none">[Tsurikichi-Doumei] ??????+???????????</a></div>'
		+'<div style="width:202px; height:290px; margin:auto; text-align:center; overflow:hidden"><a href=" ' +gallery_href[i]+ ' "><img src="'+img_scr[i]+'" '+ gallery_name[i] +' style="border:0; margin:auto" /></a></div>'
		+'</div>';		
		
		//+'<div style="clear:both"></div>';
		
		dummy_divTag.appendChild(divTag);
}
//# End func ===================================================
		