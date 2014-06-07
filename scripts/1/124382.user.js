// ==UserScript==
// @name           x264-bb RapidShare Movie Search
// @namespace      x264-bb RapidShare Movie Search
// @include        http://www.x264-bb.com/search.php
// ==/UserScript==


var movieName = prompt('Please enter the movie title.');

if (movieName)
{
    searchMovie(movieName);
}

function searchMovie(movieName)
{
    oFormObject = document.forms['searchform'];
    oFormElement = oFormObject.elements['prefixchoice[]'];
    
    oFormElement[0].selected = false;
    oFormElement[20].selected = true;
    oFormElement[26].selected = true;
    
    keywordInput = document.getElementById('keyword_input');
    keywordInput.value = '\"'+movieName+'\"';
    
    oSearchElement = oFormObject.elements['dosearch'];
    oSearchElement.click();
};