// ==UserScript==
// @name        spoki search
// @namespace   spoki+
// @description spoki+
// @author		jang
// @include     http://*spoki.lv/*
// @include     https://*spoki.lv/*
// @include     http://*spoki.tvnet.lv/*
// @include     https://*spoki.tvnet.lv/*
// @version     0.1
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + init.toString() + ")(jQuery)";
document.body.appendChild(script);
		
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = "function ms(){ var fake_s = document.getElementById('fake_s'); var real_s = document.getElementById('real_s'); real_s.value=fake_s.value+' site:spoki.lv'; }"; 
headID.appendChild(newScript);


function init() {
	$('.searchBox').each(function(){	
		$(this).html('<form action="http://www.google.lv/search"><div style="padding: 7px 10px 0 10px; width: 210px; text-align: center; float: left;"><input type="hidden" name="q" id="real_s" value="site:spoki.lv"><input type="text" size="25" name="qs" id="fake_s" class="search_input" onkeyup="ms()"></div><div style="padding: 6px 0 0 0px; width: 20px; float: left;"><input type="submit" value="" class="search_btn"></div><div style="clear: both"></div></form>');
	});
}