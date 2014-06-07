// ==UserScript==
// @name       HotelSigns Pricing
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://www.hotelsigns.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  2011+, You
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var func = doExtPrice.toString();
split_array = func.split("unitPrice = ");
new_split = split_array[1].split(";");
console.log(new_split[0]);
this.$('#extPrice').css("fontSize","40px");
this.$('#extPrice').css("fontWeight","bold");
this.$('#extPrice').css("color","red");
this.$('#extPrice').html("$"+new_split[0]);