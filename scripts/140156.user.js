// ==UserScript==
// @name        openRaidRememberSearch
// @namespace   openRaid
// @description Make OpenRaid remember your search terms
// @include     http://www.openraid.eu/index.php/users/search*
// @version     1
// ==/UserScript==

var pageURL = document.URL;
var pageQueryString = pageURL.split('users')[1];
var pageQueryStringElements = pageQueryString.split('/');  
var queryTextBox = document.getElementById('query');
var searchString;
                                  
switch(pageQueryStringElements[1]) {
    case 'searchchar':                       
        searchString = pageQueryStringElements[2].split('.')[1];
        queryTextBox.value = searchString;
    break;
    case 'searchraid':                 
        searchString = pageQueryStringElements[2].split('.')[12];
        queryTextBox.value = searchString;            
    break;
}                