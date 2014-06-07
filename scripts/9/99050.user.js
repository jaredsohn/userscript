// ==UserScript==
// @name			AddDonation
// @namespace		http://tokyo.fffff.at/
// @description		Add donation links to amazon
// @author			ysugano
// @include			http://www.amazon.tld/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

(function() {

var oneclickDiv = $(".oneClickDiv");

var donationBox = document.createElement("div");

var mataha = document.createElement("b");
$(mataha).css("padding", "2px 0px");
$(mataha).html("または");

var donation = document.createElement("div");
var priceText = $(".priceLarge").html();
$(donation).html('東日本大震災への義援金として<br/><b class="priceLarge">'+priceText+'</b>を<a href="http://www.ekokoro.jp/urgency/urg-14.html">寄付<a>');

$(donationBox).append($(mataha));
$(mataha).after($(donation));

oneclickDiv.after($(donationBox));

})();