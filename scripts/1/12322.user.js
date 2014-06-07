// ==UserScript==
// @name		Whirlpool Unsticky - Bravo Version
// @namespace	forums.whirlpool.net.au
// @author	Johnny Bravo - http://forums.whirlpool.net.au/forum-user.cfm?id=43220
// @version		0.3
// @description	Unsticks the sticky threads in forum sections on http://forums.whirlpool.net.au if there has been a recent post
// @include		http://forums.whirlpool.net.au/forum-threads.cfm*
// ==/UserScript==
if(document.URL.indexOf('&p') < 0){

	var xDate = new Date();	
	var nDate = xDate.getTime();
	xDate.setHours(0);
	xDate.setMinutes(0);
	xDate.setSeconds(0);
	xDate.setMilliseconds(0);
	var mDate = xDate.getTime(); // midnight 

	var weekStart = new Date().getDay();

	GM_addStyle(".threadS0 img { display:none !important; } "); 

	/***change start of week***/
	
	var newWeek=[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

	for (var h=0; h < weekStart; h++) newWeek.push( newWeek.shift() );
	newWeek.reverse();

	/***end change start of week***/
	
	/***convert time to milliseconds since 1970, because that's when time started apparently***/

	function convGMT(s, ttype){
		var jsDateMethodsSuckAss;

		switch(ttype) {
		case 'ago':
			var sliceTime = s.slice(0, s.indexOf(' '));	
			if( (sliceTime.length < 2) && (sliceTime.indexOf('0') > -1) )
				jsDateMethodsSuckAss = Date.now();
			else
				jsDateMethodsSuckAss = nDate - (sliceTime*60*1000);
			break;
		case 'Today':
		case 'days':
			var sliceTime = s.slice(s.indexOf(' at ')+4, s.lastIndexOf(' '));
			var splitSlice = sliceTime.split(':');
			jsDateMethodsSuckAss = ((parseInt(splitSlice[0]) % 12) * 60 + parseInt(splitSlice[1])) * 60 * 1000;
			if(s.indexOf('pm') > -1 ) jsDateMethodsSuckAss += 43200000;
			jsDateMethodsSuckAss += mDate;
			if(ttype == 'days') {
				var wDay = s.slice(0, 3);
				for(var y = 0; y < newWeek.length; y++) {
					jsDateMethodsSuckAss -= 86400000;
					if( wDay == newWeek[y] )
						break;
				}
			}
			break;
		}
		return jsDateMethodsSuckAss;
	}	
	function getSomeDate(el) {
		if(el.childNodes.length > 2 && el.childNodes[ 2 ].textContent.length > 2)
			return el.childNodes[ 2 ].textContent;
		el = el.previousSibling.previousSibling;
		if(el.childNodes.length > 2 && el.childNodes[ 2 ].textContent.length > 2)
			return el.childNodes[ 2 ].textContent;
		return "";
	}
	function processThreads(xp) {
		var ret=[];
		var ss = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
		for (var s = 0; s < ss.snapshotLength; s++){
			var threadI = ss.snapshotItem(s);
			var tex = getSomeDate(threadI);
			var tTime=0;
			if( (tex.indexOf('-') < 0) && ( tex.length > 2) ){		
				if(tex.indexOf('ago') > -1)
					tTime = convGMT(tex, 'ago');
				else if(tex.indexOf('Today') > -1)
					tTime = convGMT(tex, 'Today');
				else if( (tex.charAt(3) != 'a') && (tex.indexOf('minute') < 0) )
					tTime = convGMT(tex, 'days');
				if(tTime)
					ret.push({Node: threadI, Time: tTime});
			}
		}
		return ret;
	}

	var stickArr = processThreads('/html/body/table/tbody/tr/td[ 2 ]/div/table/tbody//td[ 7 ][ @class = "threadS3" ]');
	var normArr = processThreads('/html/body/table/tbody/tr/td[ 2 ]/div/table/tbody//td[ 7 ][ not( @class = "threadS3" )]');

	/***move em about***/
	for (var l = 0; l < stickArr.length; l++){
		for (var m = 0; m < normArr.length; m++){
			if(stickArr[l].Time > normArr[m].Time){
				normArr[l].Node.parentNode.parentNode.insertBefore(stickArr[l].Node.parentNode, normArr[m].Node.parentNode);
				break;
			}
		}
	}
}