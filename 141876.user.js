// ==UserScript==
// @name     NZBMatrix Cleaner
// @include  http://nzbmatrix.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*
	Function to extend jQuery so that 'contains' can be used for an exact match. This is for safety and to prevent other div's from being affected.
	Full credit for this function goes to Rob Garrison @ http://wowmotty.blogspot.co.uk/2010/05/jquery-selectors-adding-contains-exact.html
*/
$.extend($.expr[':'],{
containsExact: function(a,i,m){
return $.trim(a.innerHTML.toLowerCase()) === m[3].toLowerCase();
},
containsExactCase: function(a,i,m){
return $.trim(a.innerHTML) === m[3];
},
containsRegex: function(a,i,m){
 var regreg =  /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/,
  reg = regreg.exec(m[3]);
 return RegExp(reg[1], reg[2]).test($.trim(a.innerHTML));
}
});

/* Remove the 'Latest Comments' box on the left hand side of the site */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Latest Comments')")
.remove();

/* Remove the 'Comments' section at the bottom of each NZB Post */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Comments')")
.remove();
	
/* Remove the 'Latest Forum Posts' on the left hand side of the site */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Latest Forum Topics')")
.remove();

/* Remove Saved Searches box on the left */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Saved Searches')")
.remove();

/* Remove Recommended Sites */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Recommended Sites')")
.remove();

/* Move the 'Browse' box on the left up a bit to fill in the gap - makes it look better */
$("div.BlockBorder")
.has("div.BlockTitle:containsExact('Browse')")
.css('margin-top', '-50px');

$("li.tab8").remove(); // Remove the 'Forums' tab at the top of the page
$("div#SubnavEnclosure").remove(); // Remove the sub nav in orange text (none of it is useful for me)
$("div#navsection").css('height', '114px'); // Set new height for nav section with subnav gone