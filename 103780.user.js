// ==UserScript==
// @name        Craigslist Spam Cleaner
// @description Hides any link that appears on the Craigslist page more than twice.
// @include     http://*craigslist.org/*
// @include     http://*.craigslist.org/*
// @include     http://*craigslist.*/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

function reportAtLeast(array, howMany){
if(typeof array != "object"){return false;};//trivial validation
howMany=parseInt(howMany)||1;
var checked=[];
var taken=[];
var output=[];
for(var i=0; i<array.length; i++){
checked[array[i]]=(checked[array[i]])?++checked[array[i]]:1;
	if(checked[array[i]]>=howMany && !taken[array[i]]){
	output[++output.length-1]=array[i];
	taken[array[i]]=true;
	}
}
return output;
}

$(document).ready(function () {

var CLLinks =  [];
 $("a").each(function () {
		CLLinks.push($(this).text());
      });

CLLinks = reportAtLeast(CLLinks, 2);

 $("a").each(function () {
		if (jQuery.inArray($(this).text(), CLLinks) > -1) {
			$(this).hide();
		}
      });
});