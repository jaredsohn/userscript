// ==UserScript==
// @name Auto poke facebook 2013 (Nur Mohd Aza and AdahaPaan)
// @namespace autipokefacebook2013
// @description A apps facebook poke 2013
// @icon    http://s3.amazonaws.com/rapgenius/Facebook-Poke.png
// @include http://www.facebook.com/pokes
// @include https://www.facebook.com/pokes
// @include http://www.facebook.com/pokes?*
// @include https://www.facebook.com/pokes?*
// @version 1.0.0
// @run-at document-end
// ==/UserScript==

/*
	Changelog for 2.0.1: 
	 - Added auto-reload after 600000 seconds (10 minutes) 
*/

console.log("Facebook Autopoke - Loading");
function fb_ap_lw(){
	if(typeof(Arbiter) == "undefined"){
		window.setTimeout(fb_ap_lw,100);
	}else{
		function p(){
			console.log("Facebook Autopoke - Finding Pokes");
			var links = document.getElementsByClassName("pokesDashboard")[0].getElementsByClassName("uiIconText"), event;
			console.log(links);
			for(i in links){
				if(links.hasOwnProperty(i)){
					try{
						links[i].click();
					}catch(e){
						try{
							event = document.createEvent("MouseEvents");
							event.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
							links[i].dispatchEvent(event);
						}catch(f){
							if(f.message != "Object 1 has no method 'dispatchEvent'"){
								console.error(e.message);
								console.error(f.message);
							}
						}
					}
				}
			}
		}
		Arbiter.subscribe("channel/message:live_poke",function(){
			// The apps poke from VioletVarera and Nur Mohd Aza
			window.setTimeout(p,500);
		});
		p();
		console.log("Facebook Autopoke - Successful Load");
		window.setTimeout(function(){
			window.location.reload();
		}, 600000);
	}
}
function fb_ap_lw_dt(){
	if(typeof(DocumentTitle) == "undefined"){
		window.setTimeout(fb_ap_lw_dt,100);
	}else{
		DocumentTitle.set(DocumentTitle.get() + " (Automatic)");
	}
}
var s = document.createElement("script");
s.textContent = String(fb_ap_lw) + "\n" + String(fb_ap_lw_dt) + "\nfb_ap_lw();fb_ap_lw_dt();";
document.head.appendChild(s);
document.head.removeChild(s);