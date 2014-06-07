// ==UserScript==
// @name           STBRating_SR
// @namespace      STBRating - SR
// @description    STBRating - srpski jezik by ulero ;
// @version 1.0
// @include        http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include        http://grid-iron.org/index.php?page=club&subpage=pldetails*
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
		if(thistable.innerHTML.indexOf('>SKILOVI<') > 0 && thistable.innerHTML.indexOf('Postavljanje') > 0 ) {
			myplaintext=thistable.innerHTML.replace(/<[^>]*>/g, "")
			myplaintext=myplaintext.replace(/\n/g,"|")
			myplaintext=myplaintext.replace(/\t/g,"")
			mycleanskills=myplaintext.split(/OSTALO/);
			myskills=mycleanskills[0];
			myother=mycleanskills[1].split(/KOMENTARI TRENERSKOG TIMA/)[0];
					
			for(var j=0;j<10;j++) {
				myskills=myskills.replace(/\|\|/g,"|")
			}
			for(var j=0;j<10;j++) {
				myother=myother.replace(/\|\|/g,"|")
			}
			
			myskills=myskills.replace(/\|SKILOVI\|/,"");
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
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("QB", ["Vizija","Inteligencija","Dodavanje"],["Spretnost"],["Konzistentnost"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>HB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("HB", ["Spretnost","Brzina","Nošenje","Snaga"],["Blokiranje","Rad nogu"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>FB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("FB", ["Blokiranje","Snaga","Rad nogu"],["Spretnost","Brzina","Nošenje"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>WR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("WR", ["Spretnost","Hvatanje","Brzina"],["Snaga"],[])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>TE";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("TE", ["Spretnost","Hvatanje","Snaga"],["Blokiranje","Brzina","Rad nogu"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OT</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OT", ["Rad nogu","Blokiranje","Snaga"],["Spretnost","Brzina"],["Brzina"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OG</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OG", ["Rad nogu","Blokiranje","Snaga"],["Spretnost"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OC</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OC", ["Rad nogu","Blokiranje","Snaga"],["Spretnost"],["Inteligencija"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>DT/NT";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("DT/NT", ["Takl","Snaga","Rad nogu"],["Spretnost"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>DE</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("DE", ["Brzina","Takl","Spretnost","Snaga"],["Rad nogu"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("OLB", ["Snaga","Takl","Brzina"],["Spretnost","Postavljanje","Vizija"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>MLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("MLB", ["Takl","Snaga","Inteligencija"],["Brzina","Spretnost","Vizija","Postavljanje"],["Konzistentnost"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>CB";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("CB", ["Brzina","Postavljanje","Takl"],["Spretnost","Snaga","Vizija"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>FS</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("FS", ["Brzina","Takl","Postavljanje","Inteligencija"],["Spretnost","Snaga","Vizija"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>SS</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("SS", ["Takl","Snaga","Brzina","Inteligencija"],["Spretnost","Postavljanje","Vizija"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>K</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("K", ["Kik"],["Snaga"],["Konzistentnost"])+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>P";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc("P", ["Pant"],["Snaga"],["Konzistentnost"])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>G</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("G", ["Takl","Brzina","Rad nogu"],["Spretnost","Snaga","Vizija","Postavljanje"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>KR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("KR", ["Nošenje","Brzina","Spretnost"],["Rad nogu","Hvatanje","Snaga"],[])+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>STCB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc("STCB", ["Brzina","Blokiranje","Postavljanje"],["Spretnost","Snaga","Vizija"],[])+"</td></tr>";
			
			
			tablehtml=tablehtml+'</table><tr><td colspan="6" bgcolor="#006484" valign="middle" align="left" style="font-family: verdana, arial, sans-serif; color: #ffffff; font-size: 12px; font-weight: bold; padding-left: 2px;">KOMENTARI TRENERSKOG TIMA';
			
			thistable.innerHTML=thistable.innerHTML.replace(/KOMENTARI TRENERSKOG TIMA/,tablehtml);

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
