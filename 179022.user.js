// ==UserScript==
// @name FOOTLOCKER size picker
// @namespace FOOTLOCKER size picker
// @description FOOTLOCKER size picker
// @include http://www.footaction.com/product/model:171028/sku:75420600/nike-air-foamposite-one-mens/red/white/?cm=GLOBAL%20SEARCH%3A%20KEYWORD%20SEARCH
// @version 1
// ==/UserScript==window.addEventListener('load'
window.addEventListener('load',
function() {
var added = false;
function interval1(){
return window.setInterval(function(){
if(document.getElementById("miniAddToCartWrapper") != null){
if(document.getElementById("miniAddToCart_error") == null){
added = true;
window.location = "http://www.footlocker.com/checkout/";
}
else{
var errorClose = document.getElementById("miniAddToCart_close");
miniAddToCart.closeMiniAddToCart();
}
}
else if(added == false || document.getElementById
("miniAddToCartError") != null){
var cartbtn = document.getElementById("addToCartLink");
cartbtn.click();
}
}, 1000);
}
var id1 = interval1();
window.setInterval(function(){
if(added == true){
window.clearInterval(id1);
}
}, 100);
}, false);