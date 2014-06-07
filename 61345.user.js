// ==UserScript==
// @name           Rate.ee Rater Advanced
// @description    Automatically rates pictures with 5, 4 and 3 to get a "Sober Optimist" rater profile.
// @include        *
// @author	   iAreCow ;), improved by evolution-x ;)
// ==/UserScript==


var keywords =  
[ 
	"5","5","5","5","5",   
	"4","4","4",
	"3","3"  
] 
var keyword = keywords[Math.floor(Math.random()*keywords.length)] 

if(radio=document.evaluate('//input[@type="radio" and @value='+keyword+' and @onclick="destroy_ten_div(); if(pressed.value==0){pressed.value=1;this.form.submit()}"]',document,null,9,null).singleNodeValue) {
radio.checked = true;
radio.click();
} else {self.close()}