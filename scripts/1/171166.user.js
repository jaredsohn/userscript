// ==UserScript==
// @name          Wikipedia - Clean up Categories
// @description   Move other information from the top to the bottom of the Wikipedia Category pages.
// @version       1.0.3
// @include       http://en.wikipedia.org/wiki/Category:*
// @include       https://en.wikipedia.org/wiki/Category:*
// @namespace     kgfkgweruiwehfiwehfwliuhfaeslfhaesflaeshcwa
// @downloadURL   http://userscripts.org/scripts/source/171166.user.js
// @updateURL     http://userscripts.org/scripts/source/171166.meta.js
// @homepageURL   http://userscripts.org/scripts/show/171166
// @icon          
// ==/UserScript==


/*/// we only want to remove things that can be found in the top half of the page. The part between the </h1> and the <h2>
/*/

var wholePage = document.getElementById('content').innerHTML;

var topOfPage = wholePage.split('<h2')[0];

var unwantedSection = topOfPage.split('</h1>')[1];

// now we get all tables

var foo=document.getElementsByTagName('table');

// make a var for validation

var validation = "";

// cycle though tables

for(counter=0;counter<foo.length;counter++){

// check if the table was already included AND check if the table isn't zero bytes long AND check if the table appears in the top of the page.

if(validation.indexOf(foo[counter].innerHTML) == -1 && foo[counter].innerHTML.length > 1 && unwantedSection.indexOf(foo[counter].innerHTML) !=-1){

// add the table to the validation string

validation = validation + foo[counter].innerHTML;

// make a new table and try to make it sort of the same style.

zoo = document.createElement('table');
zoo.innerHTML = foo[counter].innerHTML;
zoo.className = foo[counter].className;
zoo.style = "border:1px solid #aaa; background-color:#f9f9f9;";

// stick the table some place in the end of the article.

document.getElementById('catlinks').parentNode.insertBefore(zoo,document.getElementById('catlinks'));

// hide the original table.

foo[counter].style.display = "none";

} // end if
} // end for 


// create a new style sheet to slim down the h3 headings.

var sheet = document.createElement('style');
sheet.innerHTML = "h3 {line-height:0.7em;font-size:0.9em;margin:0;margin-left:-17px;}";
document.body.appendChild(sheet);


// hide the "wikipedia, the free enecyclopedia" line at the top of every page. We really do really need all the space.

document.getElementById('siteSub').style.display = "none";