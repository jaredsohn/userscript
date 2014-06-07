// ==UserScript==
// @name          Outbid Auction Torn
// @namespace     Outbid Auction Torn
// @description   Alert if you're outbidded
// @include       http://www.torn.com/index.php
// @include		  http://www.torn.com/gym.php
// @include		  http://www.torn.com/forums.php
// @include		  http://www.torn.com/item.php
// @include		  http://www.torn.com/city.php
// @include		  http://www.torn.com/jailview.php
// @include		  http://www.torn.com/messages.php
// @include		  http://www.torn.com/profiles.php
// ==/UserScript==

function outBid(){
	var icon=document.getElementById('icon55');
	if(icon == null || icon == undefined) return 1;
	else return 0;
}

var myVar=setInterval(function(){myOut()},10000);

function myOut(){
	var x = outBid();
	if(x==1){
		alert('Outbid. Please bid again.');
		window.location.href='http://www.torn.com/amarket.php';
	}
}
