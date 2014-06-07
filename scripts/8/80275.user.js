// ==UserScript== 
// @name	 Motherless 
// @namespace	http://www.belineperspectives.com 
// @description	Make Motherless a little more friendly. Add download links to movies. 
// @include	 http://*motherless.com/* 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==


(function() {

$.noConflict() 

function rot13(txt) { 
function rotate(char) { 
var c = char.charCodeAt(0); 
var limit = c > 90 ? 109 : 77; // After M/m go backwards 
c += c <= limit ? 13 : -13; 
return String.fromCharCode(c); 
} 
return txt.toString().replace(/[a-zA-Z]/g, rotate); 
}

// Check to see if page loaded correctly, refresh in 10 seconds if not... 

if (jQuery("div#main_duh").length < 1){ 
console.log("Page Not Loaded!\nRefreshing in 10 Seconds..."); 
setTimeout("location.reload(true);", 10000) 
} 

// Check for and handle a video page... 

var media = jQuery("#main_duh").html(); 
if (media != null){ 
console.log("Creating Video Link...!"); 
var file_url = "var __file_url = '([A-Z0-9]{4,10}-[A-Z0-9]{6,50})'"; 
var re_file_url = new RegExp(file_url); 
var found = re_file_url.exec(media); 
console.log("test: "+found[1]); 
console.log("rot13: "+rot13(found[1])); 

if (found == null) { 
console.log("No Movie Found"); 
} else { 
var url = "http://members.motherless.com/movies/" + rot13(found[1]) + ".flv"; 
var nav = jQuery("#mediaspace"); 
console.log("nav: "+nav[0]); 
li = document.createElement('li'); 
anchor = document.createElement('a'); 
anchor.href = url; 
anchor.style.background = '#507d50'; 
text = document.createTextNode('Download'); 
anchor.appendChild(text); 
li.appendChild(anchor); 
nav[0].appendChild(li); 
}	
} else { 
console.log("media = null"); 
} 

// Check for and handle a gallery page... 

var gal = jQuery("div.trail a:last").attr('href'); 
if (gal != null){ 
console.log("Linking to Fullsize..."); 

jQuery("div.video").each(function(i,e){ 
if (jQuery(e).find('div.thumbnail a div').length != 1) { 
var link = jQuery(e).find("a[href^="+ gal +"]"); 
link.attr('href', 'http://members.motherless.com/img/' + link.attr('href').substring(gal.length + 1) + '.' + link.find('img').attr('src').slice(-3)).attr('target', '_blank'); 
} else { 
jQuery(e).css('border', '1px solid #0C46F2').find('div.media_info').css('background', '#666'); 
} 
}); 

} 
}());