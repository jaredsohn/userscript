// ==UserScript==
// @name           STBRating
// @namespace      www.jespernohr.dk
// @description    quick rating for best position of a player based on 3 important skills per position, collected by community
// @include        http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include        http://grid-iron.org/index.php?page=club&subpage=pldetails*
// @version	   0.1.2
// ==/UserScript==

//thx to pstimpel for the original quick rating script that I have adapted to work with my philosophy
//you are a language admin? pls contact me for translation

var timeout = 100;

window.setTimeout( function(){
	//evaluate the players skill level
	var atable, thistable;
	atable = document.evaluate(
	    '//table[@width="600"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	var skillname = new Array();
	var skilllevel = new Array();
	var positions = new Array();
	
	var othername = new Array();
	var otherlevel = new Array();
 
	for (var i = 0; i < atable.snapshotLength; i++) {
	    thistable = atable.snapshotItem(i);
		if(thistable.innerHTML.indexOf('>SKILLS<') > 0 && thistable.innerHTML.indexOf('Positioning') > 0 ) {
			myplaintext=thistable.innerHTML.replace(/<[^>]*>/g, "")
			myplaintext=myplaintext.replace(/\n/g,"|")
			myplaintext=myplaintext.replace(/\t/g,"")
			mycleanskills=myplaintext.split(/OTHER/);
			myskills=mycleanskills[0];
			myother=mycleanskills[1].split(/COMMENTS FROM THE COACH TEAM/)[0];
					
			for(var j=0;j<10;j++) {
				myskills=myskills.replace(/\|\|/g,"|")
			}
			for(var j=0;j<10;j++) {
				myother=myother.replace(/\|\|/g,"|")
			}
			
			myskills=myskills.replace(/\|SKILLS\|/,"");
			sk=myskills.split(/\|/);
			myother=myother.substring(1);
			ot=myother.split(/\|/);
			for(var k=0;k<(sk.length-1);k=k+2) {
				skillname.push(sk[k]);
				tsl=sk[k+1];
				tsl2=tsl.split(/\,/);
				skilllevel.push(parseInt(tsl2[0]));
			}

			for(var k=0;k<(ot.length-1);k=k+2) {
				othername.push(ot[k]);
				tsl=ot[k+1];
				tsl2=tsl.split(/\,/);
				otherlevel.push(parseInt(tsl2[0]));
			}
			
			var s="style=\"font-family: verdana, arial, sans-serif; color: #000000; font-size: 12px; font-weight: normal;\"";
			var tablehtml='<table border=0 bgcolor="white" cellpadding=2 cellspacing=1 '+s+'><tr><td colspan=8 bgcolor="#006484"><font color=white><b>STB Rating</b> <a href="/index.php?page=community&subpage=viewt&t=9784" style="color: #ffffff">?</A></font></td></tr>';
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100 "+s+">QB";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("QB", ["Vision","Intelligence","Passing"],["Agility"],["Consistency"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>HB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("HB", ["Agility","Speed","Carrying","Strength"],["Blocking","Footwork"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>FB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("FB", ["Blocking","Strength","Footwork"],["Agility","Speed","Carrying"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>WR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("WR", ["Agility","Catching","Speed"],["Strength"],[])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>TE";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("TE", ["Agility","Catching","Strength"],["Blocking","Speed","Footwork"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OT</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OT", ["Footwork","Blocking","Strength"],["Agility","Speed"],["Speed"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OG</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OG", ["Footwork","Blocking","Strength"],["Agility"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OC</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OC", ["Footwork","Blocking","Strength"],["Agility"],["Intelligence"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>DT/NT";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("DT/NT", ["Tackling","Strength","Footwork"],["Agility"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>DE</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("DE", ["Speed","Tackling","Agility","Strength"],["Footwork"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OLB", ["Strength","Tackling","Speed"],["Agility","Positioning","Vision"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>MLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("MLB", ["Tackling","Strength","Intelligence"],["Speed","Agility","Vision","Positioning"],["Consistency"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>CB";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("CB", ["Speed","Positioning","Tackling"],["Agility","Strength","Vision"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>FS</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("FS", ["Speed","Tackling","Positioning","Intelligence"],["Agility","Strength","Vision"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>SS</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("SS", ["Tackling","Strength","Speed","Intelligence"],["Agility","Positioning","Vision"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>K</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("K", ["Kicking"],["Strength"],["Consistency"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>P";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("P", ["Punting"],["Strength"],["Consistency"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>G</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("G", ["Tackling","Speed","Footwork"],["Agility","Strength","Vision","Positioning"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>KR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("KR", ["Carrying","Speed","Agility"],["Footwork","Catching","Strength"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>STCB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("STCB", ["Speed","Blocking","Positioning"],["Agility","Strength","Vision"],[])+"</td></tr>";
			
			
			tablehtml=tablehtml+'</table><tr><td colspan="6" bgcolor="#006484" valign="middle" align="left" style="font-family: verdana, arial, sans-serif; color: #ffffff; font-size: 12px; font-weight: bold; padding-left: 2px;">COMMENTS FROM THE COACH TEAM';
			
			thistable.innerHTML=thistable.innerHTML.replace(/COMMENTS FROM THE COACH TEAM/,tablehtml);

			i=atable.snapshotLength;
		}
	}

function calc(pos,pri,sec,ter) {
	
	var priKonst = pri.length * 20;
	var secKonst = sec.length * (20/2);
	var terKonst = ter.length * (20/3);

	var total = 0;
	var priTotal = 0;
	var secTotal = 0;
	var terTotal = 0;
	
	for(var i = 0; i < pri.length; i++) {
		priTotal += getvalue(pri[i]);
	}

	for(var i = 0; i < sec.length; i++) {
		secTotal += getvalue(sec[i]);
	}

	for(var i = 0; i < ter.length; i++) {
		terTotal += getvalue(ter[i]);
	}

	total = (100 * ( priTotal + (secTotal/2) + (terTotal/3) )) / (priKonst + secKonst + terKonst);

	return total.toFixed(0);
}

function getvalue(skill) {
	rv=0;
	for(var j=0;j<15;j++) {
		if(skillname[j]==skill) {
			rv=skilllevel[j];
		}
	}
	if (rv==0) {
		for(var j=0;j<3;j++) {
			if(othername[j]==skill) {
				rv=otherlevel[j];
			}
		}	
	} 
	return rv;
}
},timeout);
