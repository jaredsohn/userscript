// ==UserScript==
// @name          Vanguard Asset Allocation Calculator
// @namespace     http://hlsoft.com/download/
// @description   Helps to track asset allocation in Vanguard accounts, to rebalance them. Works on the "Accounts & activities" page of the Vanguard web site.
// @include       https://*.vanguard.com/VGApp/hnw/TPView*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 1:
// Released: 2007-05-01.
// Initial release.
// ==/RevisionHistory==

// Copyright: Andriy Palamarchuk 2007 (apa3a_at_yahoo_dot_com)
// License:
//     Mozilla Public License, version 1.1 or later
//     General Public License, version 3.0 or later
//
// Contact me if you have questions, suggestions.
//
// DESCRIPTION
//
// This Greasemonkey script helps to track asset allocation for more than one
// asset group across a few Vanguard accounts.
// For example, one may want to have predefined asset allocation for retirement
// funds across accounts for both spouses,
// different allocation for the non-retirement accounts,
// third allocation for the child education accounts.
//
// Adds a column displaying account asset allocation.
// Clicking on an allocation value in the table brings a rebalancing calculator
// for the asset group the fund belongs to. After the user specifies funds
// to invest/withdraw from the asset group,
// the script shows the investment/withdrawal amount to balance the assets,
// taking the new funds into account.
//
// INSTALLATION
//
// See http://diveintogreasemonkey.org/install/userscript.html for information
// how to install a Greasemonkey script.
// To make this script work, specify the desired asset allocations first.
//
// The allocations is specified in the variable TARGET_ASSET_GROUPS.
// The example below specifies asset allocations for retirement,
// and a child account.
// Here "fund" is a account/fund number (from the "Fund & Account" column),
// "weight" is the target relative weight of this fund relative to other funds
// in this allocation.
// Should not be null or negative.
//
// Uncomment this example and change it to suit your needs.
// Be careful, the script does minimal validation.

/*
// The retirement funds allocation.
// The first fund/account should have 50% share, the other two - 25% each.
var RETIREMENT = [
  {fund: "0072-88888888888", weight: 2},
  {fund: "0114-77777777777", weight: 1},
  {fund: "0115-88888888888", weight: 1},
];

// The child education account allocation.
// The first fund/account takes 75%, second - 25%.
var CHILD = [
  {fund: "0046-99999999999", weight: 3},
  {fund: "0114-99999999999", weight: 1},
];

var TARGET_ASSET_GROUPS = [RETIREMENT, CHILD];
*/

/*
 * fund/account number, as listed in "Fund & Account" column,
 * share of allocation
 */

/**
 * Finds the tables of the accounts. Returns an array of the tables.
 */
function findAccountTables() {
   // prefix of an account section id
   
   var tables = [];
   for (var i = 1; i <= 100; i++) {
      var id = "Flip" + i;
      var section = document.getElementById(id);
      if (!section) {
         break;
      }
      var table = section.firstChild;
      while (table) {
         if (table.tagName === "TABLE") {
            break;
         }
         table = table.nextSibling;
      }
      if (!table) {
         alert("Could not find a balance table for section: " + id);
      }
      tables.push(table);
   }
   return tables;
}

/**
 * Adds the "Allocation" column.
 * @param table the table to process.
 * @param allocations a map of a fund/account number to an object with
 * fields "value" and "allocation", referencing "Value" value
 * and allocation cells for his fund/account correspondingly.
 */
function addAllocationColumn(table, allocations) {

   function addAllocationHeader (tr) {
      var allocationTh = document.createElement('th');
      allocationTh.width = "10%";
      tr.appendChild(allocationTh);
      allocationTh.textContent = "Allocation";
   }

   var FUND_ACCOUNT_IDX = 1;
   var VALUE_IDX = 5;
   
   var trs = toArray(table.rows);

   addAllocationHeader(trs.shift());
   
   for each (var bodyTr in trs) {
      var tds = toArray(bodyTr.getElementsByTagName("td"));
      // skip summary columns
      if (tds.length < 5) {
         continue;
      }
      var accoundFund = tds[FUND_ACCOUNT_IDX].textContent;
      var value = parseDollars(tds[VALUE_IDX].textContent);
      if (isNaN(value)) {
         continue;
      }

      var td = document.createElement('td');
      bodyTr.appendChild(td);

      allocations[accoundFund] = {value: value, allocationNode: td};
   }
}

/**
 * Converts array-like object to an array.
 */
function toArray(obj) {
   var a = [];
   for (var i = 0; i < obj.length; i++) {
      a.push(obj[i]);
   }
   return a;
}

/**
 * Displays the allocation status on the page.
 */
function showAllocationStatus(assetGroup, realAllocations) {
   var totals = getAssetGroupTotals(assetGroup, realAllocations);

   // show balance
   for each (var asset in assetGroup) {
      if (!asset.fund) {
         // to skip other attached data of an asset group
         continue;
      }
      var p = getAllocationParams(asset, realAllocations, totals);
      var td = p.realAllocation.allocationNode;
      showAllocation(td, p.percDiff.toFixed(2) + "%", p.percDiff >= 0);
      attachRebalance(td, assetGroup);
   }
}

/**
 * Calculates totals.
 */
function getAssetGroupTotals(assetGroup, realAllocations) {
   var total = 0.0;
   var totalWeight = 0.0;
   for each (var asset in assetGroup) {
      if (!asset.fund) {
         // to skip other attached data of an asset group
         continue;
      }
      var realAllocation = realAllocations[asset.fund];
      if (!realAllocation) {
         alert("Could not find on the page fund " + asset.fund)
         return;
      }
      total += realAllocation.value;
      totalWeight += asset.weight;
   }
   return {total: total, totalWeight: totalWeight}
}

/**
 * Calculates allocation parameters.
 * Returned object fields:
 * - realAllocation the real allocatio nobject for the asset
 * - percDiff - the target allocation deviation in percents.
 * - transfer - amount to add to the real allocation value to rebalance
 * the asset allocation.
 */
function getAllocationParams(asset, realAllocations, totals) {
   var realAllocation = realAllocations[asset.fund];

   var realShare = realAllocation.value / totals.total;
   var targetShare = asset.weight / totals.totalWeight;
   var percDiff = (realShare - targetShare) / targetShare * 100;
   
   var transfer = totals.total * targetShare - realAllocation.value;

   return {realAllocation: realAllocation, percDiff: percDiff,
         transfer: transfer}
}

/**
 * Attaches rebalance calculator listener to the element.
 */
function attachRebalance(element, assetGroup)
{
   function rebalance() {
      if (!assetGroup.additionalFunds) {
         assetGroup.additionalFunds = 0;
      }
      var s = prompt("Additional funds you want to invest." +
            "\nTo withdraw funds use negative values." +
            "\nThe allocation cells will show the asset balance changes " +
            "to restore balance.",
            assetGroup.additionalFunds.toFixed(2));
      if (!s) {
         return;
      }
      var parsed = parseFloat(s);
      assetGroup.additionalFunds = isNaN(parsed) ? 0.0 : parsed;

      var totals = getAssetGroupTotals(assetGroup, realAllocations);
      totals.total += assetGroup.additionalFunds;

      // show balance
      for each (var asset in assetGroup) {
         if (!asset.fund) {
            // to skip other attached data of an asset group
            continue;
         }
         var p = getAllocationParams(asset, realAllocations, totals);
         var td = p.realAllocation.allocationNode;
         var s = currencyFormatted(p.transfer);
         showAllocation(td, "<b>" + s + "</b>", p.transfer >= 0);
      }
   }
   element.addEventListener('click', rebalance, true);
}

/**
 * Shows the provided string in the allocation cell for the given
 * real allocation.
 * @param element the element to show the stringToShow in. Not null.
 * @param {String} stringToShow the string to show. Not null.
 * @param {Boolean} positive whether to show the string using
 * positive or negative number style.
 */
function showAllocation(element, stringToShow, positive) {
   var html = "";
   html += '<span class="';
   html += positive ? "number-positive" : "number-neg";
   html += '">';
   html += stringToShow;
   html += "</span>";

   element.innerHTML = html;
}

/**
 * Returns float value for the provided string.
 */
function parseDollars(str) {
   return parseFloat(str.replace("$", "").replace(",", "").replace("*", ""));
}

/**
 * Returns currency formatted number.
 */
function currencyFormatted(n) {
   var minus = '';
   if (n < 0) { minus = '-'; }
   n = Math.abs(n);
   var s = addCommas(n.toFixed(2));
   return minus + "$" + s;
}

/**
 * Adds commas to a number.
 */
function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var TARGET_ASSET_GROUPS;

if (!TARGET_ASSET_GROUPS) {
   TARGET_ASSET_GROUPS = [];
}

var accountTables = findAccountTables();
var realAllocations = {};

for each (var accountTable in accountTables) {
  addAllocationColumn(accountTable, realAllocations);
}

for each (var assetGroup in TARGET_ASSET_GROUPS) {
   showAllocationStatus(assetGroup, realAllocations);
}
