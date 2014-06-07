// ==UserScript==
// @name           Yahoo Mail Ads Remover
// @namespace      myRemoveYahooAds
// @description    Remove Yahoo Mail (New) Ads
// @include        http://*mail.yahoo.com/*
// ==/UserScript==
// Author: Boby Ertanto
// email: cool_ertanto[at]yahoo[dot]com 
//========
var myRemoveYahooAds={
	start : function(){
		var ads=["theMNWAd","theAd","slot_REC","slot_LREC","slot_MIP"];
		for(i=0;i<ads.length;i++)
		{
			//console.log(ads[i]);
			parent.document.getElementById(ads[i]).style.display="none";
		}
		parent.document.getElementById("main").style.marginRight="0px";
	}
}
myRemoveYahooAds.start();