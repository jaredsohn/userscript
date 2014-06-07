// ==UserScript==
// @author         Opaque
// @name           deviantArt: Bypass the MCF
// @namespace      uri:opaquepink@gmail.com,2007-11:deviantArt
// @description    The Mature Content Filter can be annoying at times, this should take care of it for now.
// @version        0.5
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

class = { /* http://icant.co.uk/sandbox/css-scanner-tool/mfsct.js */
	check:function(oElm, strClassName){
	    strClassName = strClassName.replace(/\-/g, "\\-");
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		return oRegExp.test(oElm.className);
	},
	add:function(oElm, strClassName){
		if(!mfsct.check(oElm, strClassName)){
			oElm.className+=oElm.className?' '+strClassName:strClassName;
		}
	},
	remove:function(oElm, strClassName){
		var rep=oElm.className.match(' '+strClassName)?' '+strClassName:strClassName;
	    oElm.className=oElm.className.replace(rep,'');
	    oElm.className.replace(/^\s./,'');
	}
}

function xpathOne(query, context) {
	context = context ? context : document;    
	return document.evaluate(query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

if(class.check(document.getElementsByTagName('body')[0],'maturefilter')){ class.remove(document.getElementsByTagName('body')[0],'maturefilter'); }
if(class.check(document.getElementById('deviation').getElementsByTagName('div')[0],'filtered')){ class.remove(document.getElementById('deviation').getElementsByTagName('div')[0],'filtered') }

if(xpathOne('//*[@*="filter-warning"]')){
	xpathOne('//*[@*="filter-warning"]').parentNode.removeChild(xpathOne('//*[@*="filter-warning"]'));
}

if(xpathOne('//span[@id="zoomed-out"]/a/img[@swapsrc]')){
	xpathOne('//span[@id="zoomed-out"]/a/img[@swapsrc]').src = xpathOne('//span[@id="zoomed-out"]/a/img[@swapsrc]').getAttribute('swapsrc');
	xpathOne('//span[@id="zoomed-out"]/a/img[@swapsrc]').removeAttribute('swapsrc');
}

if(xpathOne('//span[@id="zoomed-in"]/img[@swapsrc]')){
	xpathOne('//span[@id="zoomed-in"]/img[@swapsrc]').src = xpathOne('//span[@id="zoomed-in"]/img[@swapsrc]').getAttribute('swapsrc');
	xpathOne('//span[@id="zoomed-in"]/img[@swapsrc]').removeAttribute('swapsrc');
}