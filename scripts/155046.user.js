// ==UserScript==
// @name        LoTW Queue Delta
// @namespace   http://userscripts.org/users/499584//
// @include     http://www.arrl.org/logbook-queue-status
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     3
// @grant       none
// ==/UserScript==

$(document).ready(function() {
    var rows=$("body table tbody tr")
    var ct=rows.length;
    for (var i=0; i<ct-1; i++) {
	var cur=rows.eq(i).children();
	var prev=rows.eq(i+1).children();
	var logdelta=cur.eq(1).html().replace(/\,/g, '')-prev.eq(1).html().replace(/\,/g, '');
	var qsodelta=cur.eq(2).html().replace(/\,/g, '')-prev.eq(2).html().replace(/\,/g, '');
	var curdatetime=cur.eq(4).html().split("<br>")[1].split(' ');
	var prevdatetime=prev.eq(4).html().split("<br>")[1].split(' ');

	var daydelta=curdatetime[0].slice(1,-1)-prevdatetime[0].slice(1, -1);
	var hrdelta=curdatetime[1].slice(0, -1)-prevdatetime[1].slice(0,-1);
	var mindelta=curdatetime[2].slice(0, -1)-prevdatetime[2].slice(0,-1);
	var secdelta=curdatetime[3].slice(1, -1)-prevdatetime[3].slice(1 ,-1);
        
	var insecs=daydelta*(24*60*60)+hrdelta*(60*60)+mindelta*(60)+secdelta;

	var plusmin=(insecs>0);
	insecs=Math.abs(insecs);
	daydelta=0; hrdelta=0; mindelta=0; secdelta=0;

	var deltastr="";
	if (insecs>(24*60*60)) {
	    deltastr+=(Math.floor(insecs/(24*60*60)))+"d ";
	    insecs=insecs%(24*60*60);
	}

	if (insecs>(60*60)) {
	    deltastr+=(Math.floor(insecs/(60*60)))+"h ";
	    insecs=insecs%(60*60);
	}

	if (insecs>60) {
	    deltastr+=(Math.floor(insecs/60))+"m ";
	    insecs=insecs%60;
	}

	if (insecs>0) {
	    deltastr+=insecs+"s";
	}

	deltastr=deltastr.trim()

	var color=(plusmin?"red":"green")

	deltastr="<br/><span style=\"color: "+color+";\">"+deltastr+"</span>";


	cur.eq(1).append("<br/><span style=\"color: "+(logdelta>0?"red":"green")+";\">"+(logdelta>0?'+':'')+logdelta+"</span>");
	cur.eq(2).append("<br/><span style=\"color: "+(qsodelta>0?"red":"green")+";\">"+(qsodelta>0?'+':'')+qsodelta+"</span>");
	cur.eq(4).append(deltastr);
    }
});