// ==UserScript==
// @name           NGBBS Percent Quoted
// @namespace      http://userscripts.org/users/vitaminp
// @description    Calculates how much of your message is quoted and warns you if it exceeds the amount allowed
// @include        http://www.newgrounds.com/bbs/post/reply/*
// @contributor	   Twilight (Twilight.newgrounds.com)
// ==/UserScript==

var chars = document.getElementById("body_chars_remaining")
chars.parentNode.innerHTML += " Percent Quoted: <strong id='body_quote_remaining' class='yellow'></strong>"
setInterval (function(){ quote(document.getElementById('body'))}, 1000 );
function quote(textarea){
if(textarea.value.match(/(^|\n): .*/gi)){
var quote = textarea.value.match(/(^|\n): .*/gi)
var quoten = quote.length
var quotel = quote.join("").length
var quotep = (quotel/textarea.value.length)*100
document.getElementById("body_quote_remaining").innerHTML = quotep.toFixed(0)+"%"
if(quotep>82){
document.getElementById("body_quote_remaining").className = 'red'
}else{
document.getElementById("body_quote_remaining").className = 'yellow'
}
}else{
document.getElementById("body_quote_remaining").innerHTML = "0%"
document.getElementById("body_quote_remaining").className = 'yellow'
}
}