// ==UserScript==
// @name           5PG 'Play Now' Button Fix
// @namespace      SReject@Kong
// @description    The 'Play Now' button only refreshes the game instead of the entire page
// @author         SReject
// @version        1.2
// @date           2012/10/01
// @include        http://web1.legacyofathousandsuns.com/kong/raidjoin.php*
// @include        http://web1.dawnofthedragons.com/kong/raidjoin.php*
// ==/UserScript==

if (top===self) return;
(document.head||document.body||document.documentElement).appendChild(document.createElement("script").appendChild(document.createTextNode("("+function(){
	var a=/^(.*?)\/raidjoin.php(.*)$/i.exec(self.location.href),
		b=(a[2]).replace(/[&\?]kv_(?:action_type|difficulty|hash|raid_boss|raid_id)=[^&\?#]+/gi,""),
		c=a[1]+(b.charAt(0)!='?'?'?':'')+b;
		
	if(b){
		a=document.getElementsByTagName("a");
		for(b=0;b<a.length;b++){
			if(a[b].hasAttribute("target")&&a[b].getAttribute("target")=="_top"){
				a[b].setAttribute("target","_self");
				a[b].href=c
			}
		}
	}
}+"())")).parentNode);