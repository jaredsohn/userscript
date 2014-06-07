// ==UserScript==
// @name           FaceBook Ads Remover / Cleaner 
// @version        1.1 Date: 01/02/2010
// @author         Prashant P Patil
// @profile        http://www.orkut.co.in/Profile?uid=17618220612205038709
// @scripturl      
// @Siteurl       https://www.chat32.com/
// @namespace      Remove All Right Coloum Ads from Facebook
// @description    Removes All Ads and Suggesation's from Facbook Right Coloum
// @include        http://*.facebook.*
// ==/UserScript==


function on_ld(){
	
var text = '<li><a target="_blank" href="http://www.hindimp3songs.info">Songs</a></li><li><a target="_blank" href="http://www.123LoveCalculator.com" title="love calculator">Love</a></li><li><a target="_blank" href="http://www.123SMSFun.com" title="send sms">SMS</a></li><li><a target="_blank" href="http://www.orkutfans.in" title="send e greetings">Greet</a></li><li><a accesskey="1" href="http://www.facebook.com/?ref=home">Home</a></li><li><a accesskey="2" href="http://www.facebook.com/0rkut">Profile</a></li><li><a href="http://www.facebook.com/?sk=ff">Find Friends</a></li><li id="navAccount"><a href="http://www.facebook.com/editaccount.php?ref=mb&amp;drop" onclick="var toggle = function(e) {e = e || window.event;e &amp;&amp; Event.stop(e);this.onclick = function(e) {e = e || window.event;e &amp;&amp; Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick(e);}.bind(this, event);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;" rel="ignore" id="navAccountLink">Account<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" class="img"></a><ul><li><a href="http://www.facebook.com/friends/?ref=tn">Edit Friends</a></li><li><a rel="dialog" href="/ajax/pages/dialog/manage_pages.php">Manage Pages</a></li><li><a accesskey="6" href="http://www.facebook.com/editaccount.php?ref=mb&amp;drop" class="dropdown_item">Account Settings</a></li><li><a accesskey="7" href="http://www.facebook.com/settings/?tab=privacy&amp;ref=mb" class="dropdown_item">Privacy Settings</a></li><li><a href="http://www.facebook.com/editapps.php?ref=mb" class="dropdown_item">Application Settings</a></li><li><a href="http://www.facebook.com/help/?ref=drop" class="dropdown_item">Help Center</a></li><li><a href="http://www.facebook.com/logout.php?h=01e213b9ed909832cc6215a678fe878c&amp;t=1274872767&amp;ref=mb">Logout</a></li></ul></li>';	
	
	document.getElementById("pageNav").innerHTML = text; 
	htm_add();
	setInterval ( htm_add, 1000);
// setTimeout(htm_add,50000);
		   
}
function htm_add(){
	
	var dv = document.getElementById("rightCol");
	var pl = document.getElementById("pagelet_ads");
	var eg = document.getElementById("ego");
	
	
	if(dv != null) { dv.innerHTML = ""; }
	else if ( pl != null) { pl.innerHTML = ""; } 
	else if (eg != null) { eg.innerHTML = ""; }	
}

document.body.onload = on_ld();

