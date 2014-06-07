// ==UserScript==
// @author			mungushume
// @name			eBay - Google Maps
// @version			1.0
// @namespace		http://www.monkeyr.com
// @description    	Replaces the "Item Location" within eBay item pages with a link to google maps directions.
// @include        	http://*ebay.tld/*
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==


var eBayMapping = {
	local : '', 		//your home address override (leaving blank will auto detect)

	debug : false,
	glink : function(){
		return 'http://maps.google.'+ this.tld() +'/maps?saddr=' + encodeURI(this.local || GM_getValue('localLocation','')) + '&daddr=';
	}, 

	init : function(){
		var as, a, divs, div, spans, span;
		// Attempt to get users location
		as = document.getElementsByXPath("//div[@id='rsTabs']//div[contains(@class,'lnks')]//a");
		if((a = as[0])){
			text = a.textContent || a.innerText;
			this.log('Got users location:'+text);
			GM_setValue('localLocation', text);
			return;
		}		
		// Get item location for .com .co.uk (div based localisations)
		divs = document.getElementsByXPath("//div[@id='itemLocation']//div[string-length(normalize-space(text()))>0]");
		if((div = divs[divs.length-1])){
			this.buildLink(div)
			this.log('div based localisation:', div);
			return;
		}
		// Get item location for .fr .de .it (table based localisations)
		spans = document.getElementsByXPath("//div[@class='sh-DlvryDtl']/span[text()]");
		if((span = spans[0])){
			this.buildLink(span)
			this.log('table based localisation:', span);
			return;
		}
	},

	buildLink : function(cnt){
		var add = cnt.innerHTML;
		cnt.innerHTML='';
		cnt.appendChild(document.buildElement('a', {'href':this.glink()+encodeURI(add)}, add));
	},

	tld : function(){
		var i,h,l,
		weird_cookie='weird_get_top_level_domain=cookie',
		hostname = document.location.hostname.split('.');
		for(i=hostname.length-1; i>=0; i--) {
			h = hostname.slice(i).join('.');
			document.cookie = weird_cookie + ';domain=.' + h + ';';
			if(document.cookie.indexOf(weird_cookie)>-1){
				document.cookie = weird_cookie.split('=')[0] + '=;domain=.' + h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				return l;
			}
			l = h;
		}
	},	

	log : function(){
		if(this.debug && console && console.log) console.log(arguments);
	}

}

/* Prototypes and additional document functions */
document.getElementsByXPath = function(XPath, contextNode)
{
	var ret=[], i=0;
	var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	while(a.snapshotItem(i))
	{
		ret.push(a.snapshotItem(i++));
	}
	return ret;
};

document.buildElement = function(type, atArr, inner, action, listen)
{
	var e = document.createElement(type);
	for (var at in atArr)
	{
		if (atArr.hasOwnProperty(at))
		{
			e.setAttribute(at, atArr[at]);
		}
	}
	if(action && listen)
	{
		e.addEventListener(action, listen, false);
	}
	if(inner)
	{
		e.innerHTML = inner;
	}
	return e;
};

eBayMapping.init();