/*
    Google Images Regular Version Enhanced
*/

// ==UserScript==
// @name          Google Images Regular Version Enhanced
// @version       1.0.3
// @namespace     freecyber
// @description   On click, shows full image in same tab in lightbox/darkbox
// @include       http*://images.google.tld/*
// @include       http*://www.google.tld/images?*
// @include       http*://www.google.tld/search?*site=img*
// @include       http*://www.google.tld/search?*tbm=isch*
// @include       http*://*.google.*/imgres?*
// @include       http*://*.google.*/imghp*
// @grant         none
// ==/UserScript==

(function () {
	"use strict"
	var _DEBUG=false;
  	var debug //log function
	if (_DEBUG) {debug=console.log} else {debug=function(){}}
    debug("script start");
  	var current // current thumbnail div

	var bg = document.createElement('div'); // lightbox
	document.body.appendChild(bg);
	bg.setAttribute('id','fc-bg');
	bg.style.zIndex='-1000';
	var tbl = document.createElement('div'); // img container
	bg.appendChild(tbl);
	tbl.setAttribute('id','fc-tbl');
	var topimg = document.createElement('img'); // full img
	tbl.appendChild(topimg);
//	topimg.setAttribute('width','100%');
	topimg.setAttribute('id','topimg');
	topimg.classList.add('hid');
//	topimg.style.maxHeight='70%';
	var goleft=document.createElement('div'); // slideshow links
	goleft.setAttribute('id','goleft');
	goleft.classList.add('slide');
	goleft.textContent="Prev";
	var goright=document.createElement('div');
	goright.setAttribute('id','goright');
	goright.classList.add('slide');
	goright.textContent="Next";
	bg.appendChild(goleft);
	bg.appendChild(goright);
	
	function thumbClick(e) {
		var fullUrl = this.href.match( /\/imgres\?.*imgurl\=(.*?)\&.*/ );
		debug("fullUrl "+fullUrl[1]);
        if(fullUrl) {
        topimg.src = decodeURI(fullUrl[1]);
        }	
		topimg.classList.remove('hid');
//		debug("window.innerHeight "+window.innerHeight + " topimg.height "+topimg.height+ " margin "+(window.innerHeight - topimg.height)/2);
//		if (window.innerHeight > topimg.height) {topimg.style.marginTop = (window.innerHeight - topimg.height)/2;}
		bg.style.zIndex='999999';
//		topimg.focus();
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	
//		debug("before function contClick");
	
	function contClick(e) {
//		alert('clicked');
		debug("e.target "+e.target+' e.target.classList '+e.target.classList);
		var target = e.target;
		if(target.classList.contains('rg_di')) {
			current = target;
			debug('contClick current:'+current.getAttribute('data-ri'));
		    var a = target.firstElementChild;
			var fullUrl = a.href.match( /\/imgres\?.*imgurl\=(.*?)\&.*/ );
			debug("fullUrl "+fullUrl[1]);
	        if(fullUrl) {
	        topimg.src = decodeURI(fullUrl[1]);
	        }	
			topimg.classList.remove('hid');
			bg.style.zIndex='999999';
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}
	// click on slideshow link
	function slideClick(e) {
		var target = e.target;
		debug("target: "+target+" target id: "+target.id);
		if(target==goleft) {
			debug('goleft match');
			debug('current:'+current.getAttribute('data-ri'));
			var newa = current
			do {
				newa = newa.previousElementSibling
				debug('newa '+(newa?newa.getAttribute('data-ri'):'null'));				
			}
			while (newa && !newa.classList.contains('rg_di'))
			if (newa) {
				current = newa;
				display(current);
			}
		}
		else if (target==goright) {
			debug('goleft match');
			debug('current:'+current.getAttribute('data-ri'));
			var newa = current
			do {
				newa = newa.nextElementSibling
				debug('newa '+(newa?newa.getAttribute('data-ri'):'null'));				
			}
			while (newa && !newa.classList.contains('rg_di'))
			if (newa) {
				current = newa;
				display(current);
			}
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	// show d>img in lightbox	
	function display (d){
		var a = d.firstElementChild
		var fullUrl = a.href.match( /\/imgres\?.*imgurl\=(.*?)\&.*/ );
		debug("fullUrl "+fullUrl[1]);
        if(fullUrl) {
        topimg.src = decodeURI(fullUrl[1]);
        }	
		topimg.classList.remove('hid');
		bg.style.zIndex='999999';
	}

//		debug("after function contClick");

/*	topimg.onload= function() {
		debug("topimg.onload");
		debug("window.innerHeight "+window.innerHeight);
		debug("topimg.height "+topimg.height);
		debug("margin "+(window.innerHeight - topimg.height)/2);
		if (window.innerHeight > topimg.height) {topimg.style.marginTop = (window.innerHeight - topimg.height)/2+'px';}
		debug("window.innerHeight "+window.innerHeight);
		debug("topimg.height "+topimg.height);
		debug("margin "+(window.innerHeight - topimg.height)/2);
	}
*/	
	function fullClick(e) {
//		bg.innerHTML='Clicked';
//		bg.style.zIndex='1000';
//		alert('myClick!');
		topimg.src = '';
//		if (window.innerHeight > topimg.height) {topimg.style.marginTop = (window.innerHeight - topimg.height)/2;}
		topimg.classList.add('hid');
//		debug("zeroing margin");
//		topimg.style.marginTop = '0px';
		bg.style.zIndex='-1000';
		e.preventDefault();
		e.stopPropagation();
		return false;
	}


	/* for lightbox and thumbnail container delegation */
	bg.addEventListener("click", fullClick, false);
		debug("before cont");
	var cont = selectNode(document, document.body, "//div[@id='rg_s']");
//		debug("before cont.addEventListener");
	cont.addEventListener("click", contClick, true);
//		debug("after cont.addEventListener");
	goleft.addEventListener("click", slideClick, true);
	goright.addEventListener("click", slideClick, true);
	
/*    debug("adding listeners now");
	var fullImages = selectNodes(document, document.body, "//a[@class='rg_l']");
	
    debug("fullImages.length "+fullImages.length);
    for(var x=0; x<fullImages.length; x++) {
	    fullImages[x].addEventListener("click", thumbClick, true);
//	    debug("added listener "+x);
	}
*/
    function selectNodes(document, context, xpath) {
        var nodes = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = [];
        for (var x=0; x<nodes.snapshotLength; x++) {
            result.push(nodes.snapshotItem(x));
        }
        return result;
    }
    function selectNode(document, context, xpath) {
//		debug("in selectNode xpath="+xpath+' XPathResult.FIRST_ORDERED_NODE_TYPE='+XPathResult.FIRST_ORDERED_NODE_TYPE+' context='+context );
        var node = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//		debug("in selectNode2");
        var result = node.singleNodeValue;
//		debug("in selectNode3");
        return result;
    }

})();