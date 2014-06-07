// ==UserScript==
// @name         PhotobucketTidy
// @namespace    http://www.photobucket.com
// @description  PhotobucketTidy script by samliew
// Documentation 
// Last updated: 08 Apr 2009
// 
// What this script does:
//    ...
// 
// @include   *photobucket.com*
// ==/UserScript==


// ===== Start main script ===== 
var body= document.getElementsByTagName("body")[0];
var head= document.getElementsByTagName("head")[0];

// ===== Useful functions ===== 
function $() {
	var elements = new Array();
	for (var i=0,len=arguments.length;i<len;i++) {
		var element = arguments[i];
		if (typeof element == 'string') {
			var matched = document.getElementById(element);
			if (matched) { elements.push(matched); } 
			else {
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				var regexp = new RegExp('(^| )'+element+'( |$)');
				for (var i=0,len=allels.length;i<len;i++) if (regexp.test(allels[i].className)) elements.push(allels[i]);
			}
			if (!elements.length) elements = document.getElementsByTagName(element);
			if (!elements.length) {
				elements = new Array();
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				for (var i=0,len=allels.length;i<len;i++) if (allels[i].getAttribute(element)) elements.push(allels[i]);
			}
			if (!elements.length) {
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				for (var i=0,len=allels.length;i<len;i++) if (allels[i].attributes) for (var j=0,lenn=allels

[i].attributes.length;j<lenn;j++) if (allels[i].attributes[j].specified) if (allels[i].attributes[j].nodeValue == element) elements.push(allels[i]);
			}
		}
		else { elements.push(element); }
	}
	if (elements.length == 1) { return elements[0]; }
	else { return elements; }
}

function stripHTML(text){
	var re= /(<([^>]+)>)/gi;
	return text.replace(re, "");
}
function documentSrcReplace(find, replace){
	var re= new RegExp(find, "gi");
	head.innerHTML= (head.innerHTML).replace(re, replace);
	body.innerHTML= (body.innerHTML).replace(re, replace);
}

// ===== Remove Ads & Stuff ===== 
try{
	try{ elems=$('iframe');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('containerPrimaryNavigation');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('panelFooterSearch');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('containerFooter');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('cellAd');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('panelAdv');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('containerRSS');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('containerSqAd');elems.parentNode.removeChild(elems); }catch(e){}

	// Remove from secondary bar
	try{ elems=$('cell_BuyPrints');elems.parentNode.removeChild(elems); }catch(e){}

	// Remove from left sidebar
	try{ elems=$('columnLeft_fv');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('columnLeft_tg');elems.parentNode.removeChild(elems); }catch(e){}
	try{ elems=$('columnLeft_po');elems.parentNode.removeChild(elems); }catch(e){}

}catch(e){}


// End