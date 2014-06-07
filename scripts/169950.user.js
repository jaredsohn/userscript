// ==UserScript==
// @name        Table fix for DLP pony skin
// @namespace   http://userscripts.org/users/520457
// @description Fix the color in the recommended page tables in DLP's pony skin
// @include     https://forums.darklordpotter.net/recommended.php*
// @version     1
// ==/UserScript==
// <div style="border-bottom: 1px black solid; background-color:; padding: 1px;">

function tableFix () {
    var theDivs = document.getElementsByTagName('div');
    for(var i = 0; i < theDivs.length; i++){
        if(theDivs[i].style.backgroundColor === 'rgb(10, 28, 11)'){
            theDivs[i].style.backgroundColor = '#86E4EC';
        }
    }
}

tableFix();
/*
Exception: missing ) after argument list
@Scratchpad/2:13
*/