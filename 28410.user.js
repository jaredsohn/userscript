// ==UserScript==
// @name          wowwiki google search
// @version       1.0.0
// @email         mrthornhill@gmail.com
// @namespace     WoWWiki
// @description	  Add the google search to wowwiki
// @author        Adam and Jeffrey
// @include       http://www.wowwiki.com/*
// ==/UserScript==
var formAction = "http://www.google.com/custom?domains=wowwiki.com&sitesearch=wowwiki.com&sa=Search&client=pub-4086838842346968&forid=1&channel=6987656965&ie=UTF-8&oe=UTF-8&cof=GALT%3A%2346ABFF%3BGL%3A1%3BDIV%3A%23EEEEEE%3BVLC%3A4274FF%3BAH%3Acenter%3BBGC%3A333333%3BLBGC%3AFFFF99%3BALC%3A46ABFF%3BLC%3A46ABFF%3BT%3AEEEEEE%3BGFNT%3AAAAAAA%3BGIMP%3AAAAAAA%3BLH%3A100%3BLW%3A100%3BL%3Ahttp%3A%2F%2Fimages.wikia.com%2Fcommon%2Fskins-wow%2Fcommon%2Fimages%2Fwiki-100.jpg%3BS%3Ahttp%3A%2F%2Fwww.wowwiki.com%2F%3BLP%3A1%3BFORID%3A1%3B&hl=en";
var formCof = "FORID:1;GL:1;S:http://www.wowwiki.com/;L:http://images.wikia.com/common/skins-wow/common/images/wiki-100.jpg;LH:100;LW:100;LBGC:FFFF99;LP:1;BGC:#333333;T:#eeeeee;LC:#46abff;VLC:#4274ff;GALT:#46ABFF;GFNT:#aaaaaa;GIMP:#aaaaaa;DIV:#EEEEEE;"

function AddSearchForm()
{
	var sdiv = CreateDiv();
	var searchBoxParent;
	var theForm = document.createElement('form');
	
	var searchBox = document.getElementById('search_box');
	if(searchBox)
	{
		searchBoxParent = searchBox.parentNode;
		searchBoxParent.removeChild(searchBox);
	}
	
	
	//insert before the navigation
	var navElem = document.getElementById('navigation');
	if(navElem)
	{
		searchBoxParent.insertBefore(sdiv, navElem);	  
	}
	else
	{
		searchBoxParent.appendChild(sdiv);
	}
	
	theForm.setAttribute('id','searchForm');
	theForm.setAttribute('name','search');
	theForm.setAttribute('method','GET');
	theForm.setAttribute('action', formAction);

	AddHiddens(theForm);
	AddButtons(theForm);
	
	sdiv.appendChild(theForm);
	sdiv.appendChild(CreateYahooSuggest());
}


function CreateDiv()
{
	var sdiv = document.createElement('div');
	sdiv.setAttribute('id','search_box');
	sdiv.setAttribute('class', 'color1');
	return sdiv;
}

function CreateYahooSuggest()
{
	var ydiv = document.createElement('div');
	ydiv.setAttribute('id','searchSuggestContainer');
	ydiv.setAttribute('class', 'yui-ac-container');
		
	return ydiv;
}

function AddHiddens(theForm)
{
	AddHidden(theForm, 'hl', 'en');
	AddHidden(theForm, 'client', 'pub-4086838842346968');
	AddHidden(theForm, 'channel', '6987656965');
	AddHidden(theForm, 'cof', formCof);
	AddHidden(theForm, 'domains', 'wowwiki.com');
	AddHidden(theForm, 'sitesearch', 'wowwiki.com');
}

function AddButtons(theForm)
{
	var tButton = document.createElement('input');
	tButton.setAttribute('type','text');
	tButton.setAttribute('name','q');
	tButton.setAttribute('size',21);
	tButton.setAttribute('maxlength','2048');
	tButton.setAttribute('id', 'search_field');
	tButton.setAttribute('title','Search');
	theForm.appendChild(tButton);

	var hButton = document.createElement('input');
	hButton.setAttribute('type', 'hidden');
	hButton.setAttribute('name', 'go');
	hButton.setAttribute('value', '1');
	theForm.appendChild(hButton);
	
	var sButton = document.createElement('input');
	sButton.setAttribute('type', 'submit');
	sButton.setAttribute('id', 'search_button');
	sButton.setAttribute('size',5);
	sButton.setAttribute('value', '');
	theForm.appendChild(sButton);
}


function AddHidden(theForm, vName, vValue)
{
	var hInput = document.createElement('input');
	hInput.setAttribute('type','hidden');
	hInput.setAttribute('name',vName);
	hInput.setAttribute('value',vValue);
	theForm.appendChild(hInput);
}

AddSearchForm();