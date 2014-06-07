//
//	Ebay Assistant
//	Copyright © 2013    Anton Chugunov
//	
//	This program is free software: you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published by
//	the Free Software Foundation, either version 3 of the License, or
//	(at your option) any later version.
//	
//	This program is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//	
//	You should have received a copy of the GNU General Public License
//	along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name            Ebay Assistant
// @namespace       http://userscripts.org/scripts/show/165983
// @description     Some useful features for eBay.
// @version         0.07
// @updateURL       http://userscripts.org/scripts/source/165983.meta.js
// @downloadURL     http://userscripts.org/scripts/source/165983.user.js
// @include         http*://ebay.com/
// @include         http*://www.ebay.com/
// @include         http*://ebay.com/sch/i.html*
// @include         http*://www.ebay.com/sch/i.html*
// @include         http*://my.ebay.com/ws/eBayISAPI.dll*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_openInTab
// @grant           GM_log
// @copyright       2013, Anton Chugunov (http://userscripts.org/users/346172)
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var mainPageUrl = 'www.ebay.com/';
var searchPageUrl = 'www.ebay.com/sch/i.html';
var myEbayPageUrl = 'my.ebay.com/ws/eBayISAPI.dll'

var searchWorldwideEbayParamName = 'LH_PrefLoc';
var searchWorldwideEbayParamValue = '2';
var searchWorldwideEbayParam = '&' + searchWorldwideEbayParamName + '=' + searchWorldwideEbayParamValue;
var showSoldParamName = 'LH_Sold';

var localEbayDomens = ['ebay.ca', 'ebay.fr', 'ebay.co.uk', 'ebay.it', 'ebay.de'];

function getCheckBoxParam(paramName)
{
    return $('#' + paramName).is(':checked');
}

function getURLParamValue(name)
{
    var results = new RegExp(name + '=(.+?)(&|$)').exec(window.location.href);
    return (results && results.length) ? results[1] : 0;
}

function calcAverage(values)
{
    if (!values.length)
        return 0;

    var sum = 0;
    for(var i = 0; i < values.length; i++)
        sum += values[i];
    
    var average = sum / values.length;
    return Math.round(average * 100) / 100;
}

function calcMedian(values)
{
    values.sort(function(a, b) { return a - b; });
    
    var median = 0;
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
        median = values[half];
    else
        median = (values[half - 1] + values[half]) / 2.0;
        
    return Math.round(median * 100) / 100;
}

function onChangeCheckboxWorldwide()
{
    GM_setValue('ea-searchWorldwide', getCheckBoxParam('ea-searchWorldwide'));
}

function onChangeDomenList()
{
	var selOption = $('#ea-domenList option:selected');
    GM_setValue('ea-selectedDomen', selOption.text());
}

function searchInNewTab(domen)
{
	var url = window.location.href.replace('ebay.com', domen);
	GM_openInTab(url);
}

function onClickedLocalSearch()
{
	var selOption = $('#ea-domenList option:selected');
	
	if (selOption.text() == 'All')
	{
	    for (i = 0; i < localEbayDomens.length; i++)
	    	searchInNewTab(localEbayDomens[i])
	}
	else
	{
		searchInNewTab(selOption.text());
	}
}

function createSearchSettings()
{   
    var chboxWw = $('<input id="ea-searchWorldwide" class="cbx" type="checkbox"></input>').change(onChangeCheckboxWorldwide);
    var labelWw = $('<label for="ea-worldwide-chb"></label>').html('<span class="cbx">Worldwide</span>');
    var aWw = $('<a id="ea-searchWorldwide_link" class="cbx" href="x"></a>').append(chboxWw).append(labelWw);
    var divWw = $('<div class="cbx"></div>').append(aWw);
    
    var spanDomenListLabel = $('<span class="cbx" style="margin-left: 5px;"></span>').text('eBay site: ');
    var selectDomenList = $('<select id="ea-domenList" class="cbx" style="padding: 0px; margin-left: 35px;"></select>').html('<option selected>All</option>').change(onChangeDomenList);
    for (i = 0; i < localEbayDomens.length; i++)
    {
    	var option = $('<option></option>').text(localEbayDomens[i]);
    	selectDomenList.append(option);    	
    }

    var divDomenList = $('<div class="cbx"></div>').append(spanDomenListLabel).append(selectDomenList);

    var bttnLocSearch = $('<button id="ea-localSearch" class="btn btn-s btn-prim" style="margin-left: 138px;">Search</button>').click(onClickedLocalSearch);
    var divLocSearch = $('<div class="cbx"></div>').append(bttnLocSearch);
    
    var divHead = $('<div class="pnl-h"></div>').html('<span class="pnl-h"><h3 style="cursor: text">Ebay Assistant</h3></span>');
    var divBody = $('<div class="pnl-b"></div>').append(divWw).append(divDomenList).append(divLocSearch);
    var divMain = $('<div id="ea-settings" class="pnl"></div>').append(divHead).append(divBody);    

    $('#LeftNavContainer > div[id]').first().find('>:first-child').before(divMain);
}

function fillSearchSettings(searchWorldwide)
{
    $('#ea-searchWorldwide').prop('checked', searchWorldwide);
    
    var url = window.location.href;
    if (!searchWorldwide)
    {
        url += searchWorldwideEbayParam;
    }
    else
    {
        var re = new RegExp(searchWorldwideEbayParam, 'gi');
        url = url.replace(re, '');
    }

    $('#ea-searchWorldwide_link').prop('href', url);

    var selOption = GM_getValue('ea-selectedDomen');
	$('#ea-domenList option:contains("' + selOption + '")').prop('selected', true).change();	
}

function addRSSButton(searchWorldwide)
{
    query = getURLParamValue('_nkw');
    if (query)
    {
        wwSearch = searchWorldwide ? searchWorldwideEbayParam : '';    
        button = '<a href="http://www.ebay.com/sch/rss/?_nkw=' + query + wwSearch + '&_rss=1&rt=nc"><img src="http://toyster.ru/rss.png" /></a>';
        $('#shiptoZip').parent().append(button);
    }
}

function addSalesStat()
{
    if (getURLParamValue(showSoldParamName))
    {
        var prices = new Array();
        $('div.bidsold').each(function()
        {
            price = $(this).text();
            if (price.indexOf("$") != -1 || price.indexOf("USD") != -1)
                prices.push(new Number(price.replace(/[^0-9\.]*/g, '')));
        });

        var average = calcAverage(prices);
        var median = calcMedian(prices)
        var stat = 'Average: ' + ('$' + average.toString()).bold() + ', Median: ' + ('$' + median.toString()).bold();
        $('#ConstraintCaptionContainer > div').first().after(stat);
    }
}

function changeSearchForm(searchWorldwide)
{
    var searchInputParam = $('#gh-f input[name="' + searchWorldwideEbayParamName + '"]');
    var isParamSetted = searchInputParam.html() != undefined;
    
    if (searchWorldwide && !isParamSetted)
    {
        searchInputParam = $('<input type="hidden" value="' + searchWorldwideEbayParamValue + '" name="' + searchWorldwideEbayParamName + '"></input>');
        $('#gh-f').append(searchInputParam);
    }
    else if (!searchWorldwide && isParamSetted)
    {
        searchInputParam.remove();
    }
}

function changeAllSearchLinks(searchWorldwide)
{
    var re = new RegExp(searchWorldwideEbayParam, 'gi');

	$('a[href*="' + searchPageUrl + '"]').each(function(index)
	{
		var isParamSetted = $(this).prop('href').search(re) != -1;
		if (searchWorldwide && !isParamSetted)
			$(this).prop('href', $(this).prop('href') + searchWorldwideEbayParam);			
		else if (!searchWorldwide && isParamSetted)
			$(this).prop('href', $(this).prop('href').replace(re, ''));		
	})
}

var handler_onMainPage = function onMainPage()
{
    searchWorldwide = GM_getValue('ea-searchWorldwide', 0);
    changeSearchForm(searchWorldwide);	
}

var handler_onSearchResultPage = function onSearchResultPage()
{
	searchWorldwide = GM_getValue('ea-searchWorldwide', 0);

    changeSearchForm(searchWorldwide);
    changeAllSearchLinks(searchWorldwide);

    createSearchSettings();
    fillSearchSettings(searchWorldwide);
    
    addRSSButton(searchWorldwide);
    
    addSalesStat();
}


/////////////////////////////////////////////////////////////////////
// Entry point.

var urlHandlers = {};
urlHandlers[mainPageUrl] = handler_onMainPage;
urlHandlers[myEbayPageUrl] = handler_onMainPage;
urlHandlers[searchPageUrl] = handler_onSearchResultPage;

$(document).ready(function()
{
    var url = window.location.href.replace(/^http:\/\//i, '');
    var e = url.match(/[^\.]*\.ebay\.com[^\?]*/gi);
    if (e != null)
    {
        handler = urlHandlers[e[0]];
        if(typeof handler === 'function')
            handler();
    }
}); 
