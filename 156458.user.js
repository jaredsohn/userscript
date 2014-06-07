// ==UserScript==
// @name          Nerve Happiness Alert in Torn
// @namespace     Nerve Happiness Alert in Torn
// @description   Alert if full of happiness and nerve
// @include       http://www.torn.com/index.php
// @include		  http://www.torn.com/gym.php
// @include		  http://www.torn.com/forums.php
// @include		  http://www.torn.com/item.php
// @include		  http://www.torn.com/city.php
// @include		  http://www.torn.com/jailview.php
// @include		  http://www.torn.com/messages.php
// @include		  http://www.torn.com/profiles.php
// ==/UserScript==


var myVar=setInterval(function(){myOut()},10000);

function myOut(){
	var doc = document.body.innerHTML;
	
	var searchStr='Nerve:';
	var res = doc.search(searchStr);
	
	var y = doc.substr((res+18),2);
	var x = doc.substr((res+15),2);
	if(x >= (y-2)){
		alert('Use you nerve now.');
		window.location.href='http://www.torn.com/crimes.php';
	}
	
	var searchStr='Happy:';
	var res = doc.search(searchStr);
	var y = doc.substr((res+20),4);
	var x = doc.substr((res+15),4);
	if(x >= (y-1)){
		alert('Please train now.');
		window.location.href='http://www.torn.com/gym.php';
	}
}
