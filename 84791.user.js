// ==UserScript==
// @name           Auto Beer Response
// @namespace      reddit.bottlesofbeer
// @description    Automatically fills a 'bottles of beer' response-form.
// @include        http://*.reddit.com/r/blog/comments/d14xg/*
// @include        http://reddit.com/r/blog/comments/d14xg/*
// @include        http://*.reddit.com/message/*
// @include        http://reddit.com/message/*
// ==/UserScript==

// GM Specific:
$=unsafeWindow.jQuery;

/* Start Script */

$(".thing .flat-list li:contains('reply')").live('click', function() {
	
	console.log("Ready: " + $(this));
	
	var elem = $(this);
	var root = elem.parents(".thing");
	var reply = getReply(elem);	
	
	console.log(reply);
	
	var replyText = root.find(".entry .noncollapsed .md").text();
	var regexBottles = /(\d[\d,]+) bottles of beer on the wall!/;
	var matchBottles = regexBottles.exec(replyText);
	
	if (matchBottles != null) {
		
		strBottles = matchBottles[1];
		
		var numBottles = strBottles.replace(/[^\d]+/g, "");
		numBottles--;
	
		var strNextBottles = formatNumber(numBottles,"0",",","","","","","");
	
		reply.find('textarea').html(strBottles + " bottles of beer on the wall, "+ 
			strBottles +" bottles of beer. Take one down and pass it around &mdash; " +
			 strNextBottles + " bottles of beer on the wall!\n\n").focus();
		
	}
});

function getReply(e) {
	var elem = $(e);
	var parent = elem.parents(".thing");
	var child = parent.find(".child .usertext:first");
	return child;
}

// number formatting function
// copyright Stephen Chapman 24th March 2006, 22nd August 2008
// permission to use this function is granted provided
// that this copyright notice is retained intact
function formatNumber(num,dec,thou,pnt,curr1,curr2,n1,n2) {var x = Math.round(num * Math.pow(10,dec));if (x >= 0) n1=n2='';var y = (''+Math.abs(x)).split('');var z = y.length - dec; if (z<0) z--; for(var i = z; i < 0; i++) y.unshift('0'); if (z<0) z = 1; y.splice(z, 0, pnt); if(y[0] == pnt) y.unshift('0'); while (z > 3) {z-=3; y.splice(z,0,thou);}var r = curr1+n1+y.join('')+n2+curr2;return r;}