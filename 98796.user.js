// ==UserScript==
// @name           BioWare User Entitlements - Hide PS360 DLC
// @description    Tidy your content by hiding PS3 and 360 DLC from your entitlements.
// @version        1.0
// @namespace      http://hateradio.co.cc/
// @include        http*://social.bioware.com/user_entitlements.php
// @since          11-Mar-2011
// @date           11-Mar-2011
// ==/UserScript==

function rem(){

	this.t = document.getElementsByClassName('entitlementsTable')[0].getElementsByTagName('span');
	this.g = /PS3|360/;
	// this.g = /PC\/Mac/; // To hide PC DLC, uncomment this line.
	
	this.m = function(){
		for(i in this.t){
			if(this.g.test(this.t[i].textContent)){
				this.t[i].parentNode.parentNode.style.display = 'none';
			}
		}
	}
}

var r = new rem();
r.m();