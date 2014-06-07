// SwaggerJ's test script for CR pbp analysis
// ==UserScript==
// @name          CR pbp Analysis (marv)
// @namespace     http://courtrivals.com
// @description   A test for SJ's pbp analysis script
// @include       http://www.courtrivals.com/viewRecap.php?gid=*
// ==/UserScript==

var playername = new Array("Officer Bates"), txt1;
var dsmade=new Array(), laymade=new Array(), hkmade=new Array(), jmphkmade=new Array(), runjmade=new Array(), turnmade=new Array(), bankmade=new Array(), jumpermade=new Array(), thrmade=new Array();
var dsmiss=new Array(), laymiss=new Array(), hkmiss=new Array(), jmphkmiss=new Array(), runjmiss=new Array(), turnmiss=new Array(), bankmiss=new Array(), jumpermiss=new Array(), thrmiss=new Array();
var pbptext, t, x=0;

for(var i = 0; i < 20; i++)
{
	dsmade[i] = 0;
	dsmiss[i] = 0;
	laymade[i] = 0;
	laymiss[i] = 0;
	hkmade[i] = 0;
	hkmiss[i] = 0;
	jmphkmade[i] = 0;
	jmphkmiss[i] = 0;
	runjmade[i] = 0;
	runjmiss[i] = 0;
	turnmade[i] = 0;
	turnmiss[i] = 0;
	bankmade[i] = 0;
	bankmiss[i] = 0;
	jumpermade[i] = 0;
	jumpermiss[i] = 0;
	thrmade[i] = 0;
	thrmiss[i] = 0;
}

pbptext = document.evaluate(
    "//span",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var a = 1;
for(var i = 0; i < a; i++)
{
	retrieve(playername[i], i);
}

function retrieve(playername, num)
{
	for(var i=0; i< pbptext.snapshotLength; i++) {
		t = pbptext.snapshotItem(i);
		if(t.innerHTML.indexOf(playername)>=0) {
		    t = pbptext.snapshotItem(i);
		    if( t.innerHTML.indexOf('dunk shot: made')>=0){
			dsmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('dunk shot: missed')>=0){
			dsmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump hook shot: made')>=0){
			jmphkmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump hook shot: missed')>=0){
			jmphkmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('hook shot: made')>=0){
			hkmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('hook shot: missed')>=0){
			hkmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('running jump shot: made')>=0){
			runjmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('running jump shot: missed')>=0){
			runjmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('turnaround jumper: made')>=0){
			turnmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('turnaround jumper: missed')>=0){
			turnmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('bank shot: made')>=0){
			bankmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('bank shot: missed')>=0){
			bankmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump shot: made')>=0){
			jumpermade[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump shot: missed')>=0){
			jumpermiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('3pt shot: made')>=0){
			thrmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('3pt shot: missed')>=0){
			thrmiss[num]++;
		    }
		}
	}
}