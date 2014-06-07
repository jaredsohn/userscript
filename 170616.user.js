// ==UserScript==

// @name          Wikipedia Google search
// @description   Inserts Google web and images searches in Wikipedia tools menu.
// @version       1.0
// @include       http://en.wikipedia.org/wiki/*
// @include       https://en.wikipedia.org/wiki/*
// @namespace     hlkjhaflsjfhdaslfkjdashflasj
// @downloadURL   http://userscripts.org/scripts/source/170616.user.js
// @updateURL     http://userscripts.org/scripts/source/170616.meta.js
// @homepageURL   http://userscripts.org/scripts/show/170616
// @icon          data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%04%03%00%00%00%81Tg%C7%00%00%000PLTER%8E%26%A9%C5%95m%C5%23%C2%E6%A1%8C%BFa%E0%E5%DDo%97Q%7B%D9*%FA%FC%F9%A4%E0q%60%A9%25%C1%D1%B7%7C%ABW%7C%C3%3F%D1%E7%BF%99%BF%7F%1Dg%80.%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%01%40IDATx%5Eu%D1%BFK%C3%40%14%07%F0%23c%A6%E2%20%E2%22%DCr4%D0%C9%A58%F4%0FpPD%0E%22%91%E2%2CN%09%F2%CC%22H%3D8H%E9R%07%3B%E8%90%25x*tW%F0%C7%E0%D0Q%9C%3A89d%90%D2%B9C%F1%E5%5D%84T%F0%3B~%EE%DD%F7%EE8%A6%FF%E4%17%FCEP%B2%3D%91d%16%E4%D3%DB%E8%E8c%EE%07-%0Br%99%A5%00%DC%7B%A9%DD%10%A8G%96A%3C%18%84%DEa%9D%20%C0%F5%3E%16%EC%8Dy%5C%80%1A%BA%22%CE5f%23%2B%80%06%AE%E9%80%1D%0B%FBL%40N%D0%7B%25%C0%1D%A0m%96%0APS%07%A2%12%BE%A2%02%9ES8%D5er%84%04%2BN%AA%8F%0B%5C%BE%08%09v%5EV%DE%CB%CE%5C%BBE%B5%1F0%BB4%11%16%13%5D%E32%C6%EE%B7%10%ECD75%C6%60%1DSF%C01B%E7b%CC%05DM%A6F%1C%3E%A9n%C6%85%BDz%26%EA%1A%A3%86%19%10%7C%A7%BCAG%D6R%0B%89%01%BEB%13%8E%05%B5%C9%C3%5B%1Fa%CA-%E8%F3%14%BC%B9%94%C1AV%82Z%E5%E1%DD%F6%DA%CC%81%12t%E7%5D%84%9E%D7%10%00%91%05%DD%BB%02L%DCo%FA%160%93%F5V%5E%FD%5B%CA%3F%F0%03%E2%A7%F7%60.%05R%DF%00%00%00%00IEND%AEB%60%82
// ==/UserScript==


// get the title of the page

var documentTitle = document.getElementsByTagName('title')[0].innerHTML;


// we get rid of the last part

var articleTitle = documentTitle.split(' - Wikipedia, the free encyclopedia')[0];


// we take the entire tools menu

var toolsMenu = document.getElementById('p-tb').innerHTML;


// we split the menu into an array right on the end of the list.

var splitMenu = toolsMenu.split('</ul>');


// ceate the google links with the title inside

var googleLinks = '<li><a href="http://www.google.com/search?q='+articleTitle+'">Google</a></li>'+
                  '<li><a href="http://www.google.com/images?q='+articleTitle+'">Google Images</a></li>';


// make the new menu

newToolsMenu = splitMenu[0] + googleLinks + "</ul>" + splitMenu[1];


// put the menu back on the page

document.getElementById('p-tb').innerHTML = newToolsMenu;
