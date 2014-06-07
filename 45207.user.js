// Hello World! example user script
// version 0.1 BETA!
// 2006-07-02
// Copyright (c) 2006, Jeff Simpson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Craigslist For Sale Filter
// @namespace     http://www.mit.edu/~je18337/greasemonkey
// @description   Script which filters motorcycle forsale ads on craigslist.org
// @include       http://*.craigslist.org/mcy/*
// @include       http://*.craigslist.org/*/mcy/*
// @include       http://*.craigslist.org/search/mcy?*
//
// @exclude       http://*.craigslist.org/mcy/*nofilter
// @exclude       http://*.craigslist.org/search/mcy?*nofilter
// ==/UserScript==

var allLinks, allP, allTables, varallH4;
var a, p, table, H4;
var title, price;
var removedItems = 0;

var debug = true;

allP = document.getElementsByTagName('p');

// Do something with P tags
for (var i=0; i< allP.length ; i++) {
  p = allP[i]
  allLinks = p.getElementsByTagName('a');
  for (var k=0; k<allLinks.length ; k++) {
    a = allLinks[k];
    var str = a.innerHTML;
    var m = str.lastIndexOf("-");
    if (m > 0 && m!= str.length) {
      var n = str.slice(m+1, str.length);
      var q = n.lastIndexOf("$");
      if (q > 0 && q!= str.length) {
        price = n.slice(q+1, n.length);
        title = str.slice(0, m);
      }
      else {
        price = 1000;
        title = str;
      }
    }
    else {
      title = str;
      //GM_log("noprice title: " + title);
      price = 1000;
    }
    if (price < 500 || price > 2000) {
      p.innerHTML = "";
      removedItems++;
      continue;
    }
    if (filter_dirtbike(title)) {
      if ( debug ) GM_log("filter_dirtbike: " + title);
      remove_item();
      continue;
    }
    if (filter_moped(title)) {
      if ( debug ) GM_log("filter_moped: " + title);
      remove_item();
      continue;
    }
    if (filter_snowmobile(title)) {
      if (debug ) GM_log("filter_snowmobile: " + title);
      remove_item();
      continue;
    }
    if (filter_atv(title)) {
      if (debug ) GM_log("filter_atv: " + title);
      remove_item();
      continue;
    }
    if (filter_ads(title)) {
      if ( debug ) GM_log("filter_ads: " + title);
      remove_item();
      continue;
    }
    if (filter_engine(title)) {
      if ( debug ) GM_log("filter_engine: " + title);
      remove_item();
      continue;
    }
  }
}

var shDiv = document.getElementsByTagName('div'); {
	//shDiv[2].innerHTML = "zoop";
	if (shDiv[2].innerHTML.match("Displaying")) {
		shDiv[2].innerHTML = shDiv[2].innerHTML.replace(/Displaying: (\d+) - (\d+)/, "Displaying $1 - $2, removing " + removedItems);
	}
	// removedItems
}

var allH4 = document.getElementsByTagName('h4'); 
if (allH4.length > 0) {
	allH4[0].innerHTML = allH4[0].innerHTML + " (removed " + removedItems + " items)";
}

var allDiv = document.getElementsByTagName('div');
for (var i=0 ; i < allDiv.length ; i++) {
  var thisDiv = allDiv[i];
  if (thisDiv.innerHTML.match("Copyright")) {
    thisDiv.innerHTML = thisDiv.innerHTML + "  - This page modified by Jeff Simpson, GreaseMonkey script, <a href=" + 
		window.location.href + "?nofilter" + ">non-filtered</A>";
  }

}

//var allTD = document.getElementsByTagName('td');
//for (var i=0 ; i < allTD.length ; i++) {
//  var thisTD = allTD[i];
//  if (thisTD.innerHTML.match("Copyright")) {
//    thisTD.innerHTML = thisTD.innerHTML + "  - This page modified by Jeff Simpson, GreaseMonkey script";
//		
//  }
//}

function filter_dirtbike(title)
{
  if (is_match(title, "dirt[ -]?bike|off[ -]?road|moto[r]?cross|enduro|trail[^a-z]|ds80|dual[ -]?sport")
       || is_match(title, "([^a-z]|)(kdx|kx|klx|yz|yzf|rm|cr|xr|tt[ -]?r)[ -]?(220|250|400|80|85|75|125|125r|50|110|100)") )
  { return true; }
  return false;
}

function filter_moped(title)
{
  if (is_match(title, "(mo|go|x)[ -]?ped|sc[o]+ter|vespa|(mini|pocket|micro)[ -]?(bike)?|go[ -]?[kc]art|cn[ -]?250|ho[b]+i[t]+|chappy") )
  { return true; }
  GM_log("filter_moped: Did not match [" + title + "]");
  return false;
}

function filter_snowmobile(title)
{
  if (is_match(title, "snow|ar[c]?tic|ski[ -]?(doo)?") )
  { return true; }
  return false;
}

function filter_atv(title)
{
  if (is_match(title, "atv|quad|(three|four)[ -]?wheeler|(300|400)[ -]?ex|warrior|blaster|banshee|polaris") )
  { return true; }
  return false;
}

function filter_ads(title)
{
  if (is_match(title, "repair|w[a]?nted|wtb|mechanic|detailing|transport|parts bike|government.*auction"))
  { return true; }
  return false;
}

function filter_engine(title)
{
  if (is_match(title, "(49|50|100|200|250)[ -]?cc"))
  { return true; }
  return false;
}

function is_match(title, regex)
{
  return title.toLowerCase().match(regex);
}

function remove_item()
{
  p.innerHTML = "";
  removedItems++;
}
