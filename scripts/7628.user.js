// ==UserScript==
// @name           Vasttrafik.se search-fix
// @namespace      http://vasttrafik.se
// @version        1.0
// @description    Chooses the first destination labeled "Hållplats", otherwise picks the first one. Also fixes tab indices and puts focus on search button.
// @include        http://vasttrafik.se/internet.aspx?desktop=29&navigator=234*
// @include        http://tidpunkten.se/internet.aspx?desktop=29&navigator=234*
// @include        http://www.vasttrafik.se/internet.aspx?desktop=29&navigator=234*
// @include        http://www.tidpunkten.se/internet.aspx?desktop=29&navigator=234*
// @author         Jimmy Stridh <jimmy.stridh+grease@gmail.com>
// ==/UserScript==

//Fetch controls
var txtTpFrom = document.getElementById("txtTpFrom");
var txtTpTo = document.getElementById("txtTpTo");

//Adjust tab index
if(txtTpFrom != null && txtTpTo != null) {
    txtTpFrom.tabIndex = 1;
    txtTpTo.tabIndex = 2;
}

//Fetch drop-down boxes
var selectors = Array();
selectors[0] = document.getElementById("_ctl0__ctl0_ComboFrom");
selectors[1] = document.getElementById("_ctl0__ctl0_ComboTo");

if(selectors[0] != null && selectors[1] != null) {
    //Adjust tab index
    selectors[0].tabIndex = 3;
    selectors[1].tabIndex = 4;
    
    //Our preferred default selection
    var searchFor = "H\u00e5llplats";
    
    //Fix both drop-down boxes
    selectSearched(searchFor,selectors[0]);
    selectSearched(searchFor,selectors[1]);
    
    //Put focus on the submit button
    document.getElementById("_ctl0__ctl0_btnQuestion").focus();
    
}

function selectSearched(searchFor,sel) {
    if(sel.options.length > 1) {
        //Iterate over all entries in the box
        for(i=0;i<sel.options.length;i++) {
            //If we find the string, make it the selected index and return
            if(sel.options[i].text.indexOf(searchFor) != -1) {
                sel.selectedIndex = i
                return;
            }
        }

        //If the sought after string wasn't found, select the first entry
        sel.selectedIndex = 1;
    }
}