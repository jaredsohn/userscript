// ==UserScript==
// @name       Say it with a rainbow!
// @namespace  http://userscripts.org/scripts/show/169352
// @version    1.5.2
// @description  Adds a button to the scrap.tf chat for admins to make their text rainbow-coloured!
// @match      http://scrap.tf/*
// @match      http://therealmc.zapto.org/*
// @copyright  2013+, Andrew Silver
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

setTimeout(function(){addJQuery(function() {
	String.prototype.startsWithArr = function(arr) {for(var arrIndex in arr){if(this.match("^"+arr[arrIndex])==arr[arrIndex])return true;}return false;}
	window.htmlClose = function(arr) {var outArr=[];for(var arrIndex in arr){outArr.push(arr[arrIndex]);outArr.push(arr[arrIndex].charAt(0)+'/'+arr[arrIndex].substring(1));}return outArr;}

	$("#chat-header").append('<div id="rainbow-btn-right" class="pull-right" style="margin-top:-5px;margin-right:0px;"></div>');
	$("#rainbow-btn-right").append('<button id="RAINBOW" class="btn btn-inverse" onClick="sayRainbow()" title="Chat settings">RB</button>&nbsp;');
	window.sayRainbow = function() {
		var input = $("#chat-input-txt");
		var rainbow = ['red','orange','yellow','green','blue','indigo','violet'];
		var rainbowText='';
		for(i=0;i<input.val().length;i++) {
			if(input.val().substring(i).startsWithArr(htmlClose(['<b','<h','<i','<s','<a','<p','<u','<span','<marquee','<script','<img']))) {
				rainbowText+=input.val().substring(i,input.val().indexOf('>',i)+1);
				i=input.val().indexOf('>',i);
			} else if(input.val().charAt(i)===' ')
				rainbowText+=' ';
			else
				rainbowText+='<font color="'+rainbow[i-Math.floor(i/rainbow.length)*rainbow.length]+'">'+input.val().charAt(i)+'</font>';
		}
		input.val(rainbowText);
		sendChat2();
	}
	console.debug('Loaded "Say it with a rainbow!"');
})},250);