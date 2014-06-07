// ==UserScript==
// @name           Sort ING Account Page
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Sorts your ING account page by column of your choice.
// @include        https://secure.ingdirect.com/*displayAccountSummary*
// ==/UserScript==

/*  Copyright (C) 2008 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    The GPL is also available from my site, at http://www.prism.gatech.edu/~mflaschen3/gpl.txt
*/

function compare(s1, s2, ascending)
{
    var cmp;
    if(s1 < s2)
	cmp = -1;
    else if(s1 == s2)
	cmp = 0;
    else
	cmp = 1;
    if(ascending)
	return cmp;
    else
	return -cmp;
}

function sort(getFunc, ascending)
{
    // JS sort is destructive, and we need to ensure that a row is not two places in the DOM.
    var len = rowList.length;
    var newList = new Array(len);
    for(var i = 0;  i < len; i++)
    {
	newList[i] = rowList[i].cloneNode(true);
    }

    setRows(newList.sort(function(r1, r2)
		 {
		     return compare(getFunc(r1), getFunc(r2), ascending);
		 }));
}

function sortByAccountType()
{
    sort(getAccountType, this.ascending);
    this.ascending = !this.ascending;
}
sortByAccountType.ascending = true;


function sortByNickname()
{
    sort(getNickname, this.ascending);
    this.ascending = !this.ascending;
}
sortByNickname.ascending = true;

function sortByAccountNumber()
{
    sort(getAccountNumber, this.ascending);
    this.ascending = !this.ascending;
}
sortByAccountNumber.ascending = true;

function sortByBalance()
{
    sort(getBalance, this.ascending);
    this.ascending = !this.ascending;
}
sortByBalance.ascending = true;

function sortByAvailableBalance()
{
    sort(getAvailableBalance, this.ascending);
    this.ascending = !this.ascending;
}
sortByAvailableBalance.ascending = true;

function getAccountType(accountRow)
{
    return accountRow.getElementsByTagName("span")[0].firstChild.nodeValue;
}

function getNickname(accountRow)
{
    return accountRow.getElementsByTagName("span")[1].firstChild.nodeValue;
}

function getAccountNumber(accountRow)
{
    return parseInt(accountRow.getElementsByTagName("span")[2].firstChild.nodeValue);
}

function getBalance(accountRow)
{
    return parseFloat(accountRow.getElementsByTagName("span")[3].firstChild.nodeValue.replace(/,/g, ""));
}

function getAvailableBalance(accountRow)
{
    return parseFloat(accountRow.getElementsByTagName("span")[4].firstChild.nodeValue.replace(/,/g, ""));
}

function setRows(newList)
{
    for(var i = 0; i < rowList.length; i++)
    {
	tbody.replaceChild(newList[i], rowList[i]);
    }
    rowList = newList;
}

function getList()
{
    var accounts = document.evaluate("descendant::tr[descendant::tr[descendant::a[contains(@href, 'goToAccount')]]]", accountDetails, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var numberOfAccounts = accounts.snapshotLength;
    var newAccountList = new Array(numberOfAccounts);

    for(var i = 0; i < numberOfAccounts; i++)
    	newAccountList[i] = accounts.snapshotItem(i);
    
    return newAccountList;
}

function getHeaderTDs()
{
    var headerSnapshot = document.evaluate("descendant::td[@class = 'tabletitle']", tbody, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var headerCount = headerSnapshot.snapshotLength
    var newHeaders = new Array(headerCount);

    for(var i = 0; i < headerCount; i++)
	newHeaders[i] = headerSnapshot.snapshotItem(i);
    
    return newHeaders;
}

function addLink(header, func)
{
    header.innerHTML = "<a class='orangeLink' href='javascript:void(0)'>" + header.innerHTML + "</a>";
    header.firstChild.addEventListener("click", func, false);
}

accountDetails = document.getElementById("accountDetails");
tbody = accountDetails.getElementsByTagName("tbody")[0];

headerTDs = getHeaderTDs();
addLink(headerTDs[0], sortByAccountType);
addLink(headerTDs[1], sortByNickname);
addLink(headerTDs[2], sortByAccountNumber);
addLink(headerTDs[3], sortByBalance);
addLink(headerTDs[4], sortByAvailableBalance);

rowList = getList();
