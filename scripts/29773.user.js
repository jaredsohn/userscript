// ==UserScript==
// @name           HealScript
// @namespace      http://localhost
// @description    Refresh heal of Facebook Hobowars. Completely illegal, but don't you love living dangerously.
// @author         Xyan Flux
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php* 
// ==/UserScript==

var menu = document.getElementById('menu');
var contents = document.getElementById('contents');
var link;

if(menu&&contents){
	link = menu.firstChild.nextSibling.href;
	if(!link){ //if you use hobomenuscript
		link = menu.firstChild;
	}
	if(link&&location.href.match('.*cmd=hospital&do=heal.*')){
		
		if(contents.textContent.match('.*Routine Check.*')){

			var allLinks, thisLink;
			allLinks = document.evaluate('//a[@href]',document,null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				thisLink = allLinks.snapshotItem(i);
				if(thisLink.href.match('.*&click=.*')){
				thisLink.href=thisLink.href.replace('do=heal&click=','do=heal&gang=yes&click=');
				}
			}
			//alert('Macro Polo'); // uncomment this if you want some sort of alert
		}else{
			setTimeout(heal,500+Math.random()*500);
		}
	}
}
function heal(){

	if(location.href.match('.*cmd=hospital&do=heal&gang=yes')){
		location.href = link + 'hospital&do=heal&gang=yes';
	}else if(location.href.match('.*cmd=hospital&do=heal')){
		location.href = link + 'hospital';
	}
}