// ==UserScript==
// @name Facebook Autopoker
// @namespace http://c1rcu17.freehostingcloud.com
// @description The full Autopoker script 
// @include http://www.facebook.com/pokes
// @include https://www.facebook.com/pokes
// @include http://www.facebook.com/pokes?*
// @include https://www.facebook.com/pokes?*
// @version 0.0.1
// @run-at document-end
// ==/UserScript==

console.log("Facebook Autopoker - Loading");
function fb_ap_lw(){
	Arbiter.subscribe('jewel/count-updated',function(){
		window.setTimeout(function(){
			console.log("Facebook Autopoke Lightweight - Finding Pokes");
			var links = document.getElementsByClassName("pokesDashboard")[0].getElementsByClassName("uiIconText");
			console.log(links);
			for(i in links){
				if(links.hasOwnProperty(i)){
					try{
						links[i].click();
					}catch(error){
						console.log(i);
						console.error(error);
					}
				}
			}
		},500);
	});
	DocumentTitle.set(DocumentTitle.get() + " (Automatic)");
}
var s = document.createElement("script");
s.textContent = String(fb_ap_lw) + "\nfb_ap_lw();";
document.head.appendChild(s);
document.head.removeChild(s);
console.log("Facebook Autopoker - Successful Load");
