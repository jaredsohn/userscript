// ==UserScript==
// @name           Google Search: Keep Date Dropdown
// @description    On Google Search Results page, shows a search "anytime/last week/last year/etc" dropdown box next to the "search" button.
// @namespace      http://chadnorwood.com/
// @author         Chad Norwood
// @date           2008-10-13
// @include        http*://www.google.com/search*
// ==/UserScript==
//
//  Copyright (C) 2008 Chad Norwood
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
//


var cn_as_qdr = document.getElementsByName('as_qdr');
var cn_newSelect;
var cn_optionIndex = 0;

function addSelectOption(text, value) {
  var opt = document.createElement("OPTION");
  opt.value = value;
  opt.text = text;
  cn_newSelect.options.add(opt, cn_optionIndex);    
  cn_optionIndex += 1;
}

function createSelect() {
  btng = document.getElementsByName('btnG');	
  if (btng.length > 0) {
    var googleButton = btng[0];
    cn_newSelect=document.createElement("SELECT");
    cn_newSelect.setAttribute("type","SELECT");
    cn_newSelect.setAttribute("name","as_qdr");
    
    // comment out ones not desired
    addSelectOption("anytime", "all");
    addSelectOption("past 24 hours", "d");
    addSelectOption("past 3 days", "d3");
    addSelectOption("past week", "w");
    addSelectOption("past 2 weeks", "w2");
    addSelectOption("past month", "m");
    addSelectOption("past 2 months", "m2");
    addSelectOption("past 3 months", "m3");
    addSelectOption("past 6 months", "m6");
    addSelectOption("past year", "y");
    addSelectOption("past 3 years", "y3");
    // addSelectOption("past 5 years", "y5");
    addSelectOption("past 10 years", "y10");
    
    cn_newSelect.value = GM_getValue("GM_as_qdr", "all");
    cn_newSelect.selectedIndex = 0;
    googleButton.parentNode.insertBefore(cn_newSelect, googleButton);
	} else {
    //alert("q was not found");
  }
}

function cn_selectExists () {
  if (cn_as_qdr.nodeName == "SELECT") return 1;
  for (var x in cn_as_qdr) {
    if (cn_as_qdr[x].nodeName == "SELECT") return 1;
  }
  return 0;
}

if (!cn_selectExists()) {
  //alert("Dropdown Select Box does not exist, creating");
  createSelect();
} else {
  //alert("Dropdown Select Box exists, skipping create");
}


