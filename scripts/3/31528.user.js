// ==UserScript==
// @name           dopewars trader
// @namespace      http://www.facebook.com/apps/application.php?id=6657868731
// @include        http://apps.facebook.com/dopecity/*
// ==/UserScript==

/*
...cause a real drug dealer would never respect the authorities!

This script merely does what you would do if you sat in front of your computer all day, the computer is just taking the bordem of it away from you.


beware: the people who run this game checks for cheaters once in a while.


Add this script to greasemonkey using this include url...
http://apps.facebook.com/dopecity/*


* In firefox options disable "load images automatically"

Optional:  use the leechblock addin to make things quicker...
* In leechblock put in...
fbcdn.net
ak.fbcdn.net
static.ak.fbcdn.net
static.ak.new.fbcdn.net
cdn.lookery.com
ad.lookery.com
www.zapey.com
www.google-analytics.com

click on "all day" + "every day", then "ok"






*/





function Trader()
{
	//this.drugName="White Widow";
	this.drugName="ST8 Drop";
	this.drugNumber=1;
	// prices that we'll put up with before we go searching again.
	this.buyPrice=19800;
	this.sellPrice=20200;

/*
	this.drugName="Gummibears";
	this.drugNumber=2;
	this.buyPrice=400;
	this.sellPrice=410;
*/

	//this.buyPrice=18200;
	//this.sellPrice=19800;


	this.regions=[
		[0,1],
		[0,2],
		[0,3],
		[0,4]
/*  once you get the private jet you can uncomment this section.
		[2,0],
		[2,1],
		[2,2],
		[2,3],
		[6,0],
		[6,1],
		[6,2],
		[6,3],
		[6,4],
		[6,5],
		[6,6],
		[10,0],
		[10,1],
		[10,2],
		[10,3],
		[14,0],
		[14,1],
		[14,2],
		[14,3]
*/
	];
	this.findDrug=new RegExp('Price.*?\\$([0-9,]+)',"im");
	this.spaceFor=new RegExp('space for ([0-9,]+)',"im");
	this.statusnode=null;
	this.nextFunction='';

	this.Reset=function() {
		this.regionUpto=0;
		this.buyUrl=null;
		this.buyUrlPrice=99999999;
		this.sellUrl=null;
		this.sellUrlPrice=0;
		this.checkPriceFailed=0;
	}
	this.Reset();

	this.ManualRestart=function() {
		this.nextFunction='search';
		this.Restart();
	}
	this.Restart=function() {
		this.Reset();
		this.Save();

		if(this.nextFunction=='') {
			return;
		}
		this.nextFunction='search';
		this.CheckNextRegion();
	}
	this.Stop=function() {
		this.nextFunction='';
		this.Reset();
		this.Save();
	}
	
	this.CheckPrice=function(price,url) {
		if(this.nextFunction=='') {
			return false;
		}
		this.ChangeStatus(this.drugName+":"+price);
		if((price<this.buyUrlPrice)) {
			this.buyUrl=url;
			this.buyUrlPrice=price;
		}
		if((price>this.sellUrlPrice)) {
			this.sellUrl=url;
			this.sellUrlPrice=price;
		}
		if(trader.regionUpto>=trader.regions.length) {
			this.DoBuyUrl();
			return false;
		}
		
		if(false) {
			if(price<this.buyPrice && (price<this.buyUrlPrice)) {
				this.buyUrl=url;
				this.buyUrlPrice=price;
			}
			if(price>this.sellPrice && (price>this.sellUrlPrice)) {
				this.sellUrl=url;
				this.sellUrlPrice=price;
			}
			if(this.sellUrl!=null && this.buyUrl!=null) {
				this.DoBuyUrl();
				return false;
			}
		}
		
		return true;
	}
	
	this.DoBuyUrl=function() {
		this.nextFunction='buysubmit';
		this.ChangeLocation(this.buyUrl);
	}
	
	this.Submit=function() {
		this.Save();
		this.SubmitForm();
	}
	this.SubmitForm=function() {
		var f=document.forms[1];
		var inputs=f.getElementsByTagName('input');
		for(var i=0; i<inputs.length; i++) {
			var inp=inputs[i];
			if(inp.name!="buysell") {
				continue;
			}
			inp.click();
		}
	}
	
	
	this.ClickBuySellButton=function(buttonValue,nth) {
		var f=document.forms[1];
		var dopeType=0;
		var inputs=f.getElementsByTagName('input');
		for(var i=0; i<inputs.length; i++) {
			var button=inputs[i];
			if(button.value.indexOf(buttonValue)<0) {
				continue;
			}
			if(++dopeType==nth) {
				button.click();
				GM_log("click: "+buttonValue);
				return;
			}
		}
		GM_log("Unable to find "+nth+"th button: "+buttonValue);

/*
		var as=f.getElementsByTagName('a');



		var dopeType=0;
		for(var a=0; a<as.length; a++) {
			var inp=as[a];
			if(inp.innerHTML.indexOf(buttonValue)<0) {
				continue;
			}
			if(++dopeType==this.drugNumber) {
				inp.click();
GM_log("found buy");
			}
		}
*/
	}
	this.TickDopeType=function() {
		var f=document.forms[1];
		var inputs=f.getElementsByTagName('input');
		var dopeType=0;
		for(var i=0; i<inputs.length; i++) {
			var inp=inputs[i];
			if(inp.name!="dopeType") {
				continue;
			}
			if(++dopeType==this.drugNumber) {
				inp.click();
			}
		}
	}

	
	this.DoBuySubmit=function() {
/*
		match=this.spaceFor.exec(document.body.innerHTML);
		if(match!=null && match[1]==0) {
			GM_log("no room to buy anything");
			this.DoSellUrl();
			return;
		}
*/
		var price=this.GetPrice(document.body.innerHTML);

		if(price==null || price>this.buyPrice) {
			GM_log("Buy price too high:"+price);
			this.Restart();
			return;
		}
		
		this.ClickBuySellButton("Buy Bags",this.drugNumber);
		//this.TickDopeType();
		this.nextFunction='sellurl';
		//this.Submit();
		window.setTimeout(function() { trader.DoNextFunction(); },5000);
	}
	
	this.DoSellUrl=function() {
		var sellUrl=this.sellUrl.replace("&u","&s&u");
		sellUrl=sellUrl.replace("?u&","?s&u&");
		this.nextFunction='sellsubmit';
		this.ChangeLocation(sellUrl);
	}
	this.DoSellSubmit=function() {
		var price=this.GetPrice(document.body.innerHTML);
		if(price==null || price<this.sellPrice) {
			GM_log("Sell price too high:"+price);
			this.Restart();
			return;
		}

		//this.TickDopeType();
		this.ClickBuySellButton("Sell Bags",1);
		this.nextFunction='buyurl';
		//this.Submit();
		window.setTimeout(function() { trader.DoNextFunction(); },5000);
	}
	
	this.DoNextFunction=function() {
		this.ChangeStatus(this.nextFunction);
		if(this.nextFunction=='search') {
			this.CheckNextRegion();
		} else if(this.nextFunction=='buyurl') {
			this.DoBuyUrl();
		} else if(this.nextFunction=='buysubmit') {
			this.DoBuySubmit();
		} else if(this.nextFunction=='sellurl') {
			this.DoSellUrl();
		} else if(this.nextFunction=='sellsubmit') {
			this.DoSellSubmit();
		}
	}

	this.Save=function() {
		GM_setValue('trader',this.nextFunction);
		if(this.sellUrl!=null) { GM_setValue('trader_sellurl',this.sellUrl); }
		if(this.buyUrl!=null) { GM_setValue('trader_buyurl',this.buyUrl); }
		GM_log('set value:'+this.nextFunction);
	}
	this.Load=function() {
		this.nextFunction=GM_getValue('trader',"");
		this.sellUrl=GM_getValue('trader_sellurl',"");
		this.buyUrl=GM_getValue('trader_buyurl',"");
		this.ChangeStatus(this.nextFunction);
		GM_log('get value:'+this.nextFunction);
	}
	
	
	this.ChangeLocation=function(url) {
		this.Save();
		window.location.href=url;
	}
	
	this.ChangeStatus=function(str) {
		GM_log("status:"+str);
		if(this.statusnode!=null) { this.statusnode.innerHTML=str; }
	}
	
	this.GetPrice=function(html) {
		var match=null;
		var idx=html.indexOf(this.drugName);
		if(idx>=0) {
			var h=html.substring(idx);
			match=trader.findDrug.exec(h);
		} else {
			GM_log("Cannot find drug:"+this.drugName);
		}
		if(match!=null && match.length>1) {
			var price=match[1].replace(",","");
			return price;
		}
		GM_log("Huh, no price.");
		this.checkPriceFailed++;
		return null;
	}
	
	this.CheckNextRegion= function() {
		var regionObj=this.regions[this.regionUpto];
		var city=regionObj[0];
		var region=regionObj[1];
		var url='http://apps.facebook.com/dopecity/index.php?c='+city+'&r='+region+"&u&todo=gotobuy";
		if(this.regionUpto++>=this.regions.length) {
			this.regionUpto=0;
			window.setTimeout(function() { trader.DoNextFunction(); },60000*10);
			GM_log("cannot find a good price");
			return;
		}
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: url,
		    onload: function(responseDetails) {
				var cont=false;
				var price=trader.GetPrice(responseDetails.responseText);
				if(price!=null) {
					cont=trader.CheckPrice(price,url);
				}
				if(this.checkPriceFailed>5) { cont=false; }
				
				if(cont) {
					trader.CheckNextRegion();
				}
		    }
		});
	}
}


GM_log('start');

(function(){
	trader=new Trader();
	trader.Load();

	GM_registerMenuCommand("Submit",function() { trader.SubmitForm(); });
	var atags=document.getElementsByTagName('A');
	for(var a=0; a<atags.length; a++) {
		if(atags[a].href.indexOf('dopecity/profile')<0) {
			continue;
		}
		var p=atags[a].parentNode;
		var statusnode=document.createElement('font');
		statusnode.style.whiteSpace='nowrap';
		statusnode.style.backgroundColor='#000';
		var newA=document.createElement("A");
		newA.addEventListener('click',function() { trader.Restart(); } ,false);
		newA.style.color="#aaaaaa";
		if(trader.nextFunction=='') {
			newA.innerHTML='This is getting old ';
			newA.addEventListener('click',function() { trader.ManualRestart(); } ,false);
		} else {
			newA.innerHTML='Stop';
			newA.addEventListener('click',function() { trader.Stop(); } ,false);
		}
		
		p.style.whiteSpace='nowrap';
		p.appendChild(document.createTextNode(' | '));
		p.appendChild(newA);
		p.appendChild(document.createTextNode(' | '));
		p.appendChild(statusnode);

		trader.statusnode=statusnode;
		break;
	}
	
	trader.Load();
	// random time for the clicking...
	window.setTimeout(function() { trader.DoNextFunction(); },250+Math.floor(Math.random()*1000));
})();

