// ==UserScript==
// @name           BestPositions
// @namespace      engranaje
// @description    quickrating modified with the weigth skills table of http://peters-webcorner.de/gistudio/index.php
// @include         http://www.grid-iron.org/index.php?page=club&subpage=pldetails*

// @include         http://grid-iron.org/index.php?page=club&subpage=pldetails*
// ==/UserScript==


// Thanks to pstimpel and http://peters-webcorner.de  
// without her quickrating script for GreaseMonkey and her GImanager BestPositions  
//  neverexists

// Gracias al foro de España de Grid-Iron, en especial a Cascanueces y Kamitsu por 
// ayudarme a probar el script y aconsejarme los ajustes necesarios.

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
 
	for (var i = 0; i < atable.snapshotLength; i++) {
	    thistable = atable.snapshotItem(i);
		if ( ((thistable.innerHTML.indexOf('>HABILIDADES<') > 0)| (thistable.innerHTML.indexOf('>SKILLS<')> 0))
                 && thistable.innerHTML.indexOf('Positioning') > 0 ) {
			myplaintext=thistable.innerHTML.replace(/<[^>]*>/g, "")
			myplaintext=myplaintext.replace(/\n/g,"|")
			myplaintext=myplaintext.replace(/\t/g,"")
			mycleanskills=myplaintext.split(/OTROS/);
			myskills=mycleanskills[0];
			for(var j=0;j<10;j++) {
				myskills=myskills.replace(/\|\|/g,"|")
			}
			myskills=myskills.replace(/\|HABILIDADES\|/,"");
			sk=myskills.split(/\|/);
			for(var k=0;k<(sk.length-1);k=k+2) {
				skillname.push(sk[k]);
				tsl=sk[k+1];
				tsl2=tsl.split(/\,/);
				skilllevel.push(parseInt(tsl2[0]));
			}
                                
                    			
			
			var s="style=\"font-family: verdana, arial, sans-serif; color: #000000; font-size: 12px; font-weight: normal;\"";
			var tablehtml='<table border=0 bgcolor="white" cellpadding=2 cellspacing=1 '+s+'><tr><td colspan=8 bgcolor="#006484"><font color=white><b>BestPositions</b> <a href="http://peters-webcorner.de/gistudio/index.php" style="color: #ffffff">?</A></font></td></tr>';
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100 "+s+">QB";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc(24,92,95,31,36,2,3,102,3,1,1,29,45,36)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>HB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(14,41,20,40,103,3,13,3,10,1,1,99,56,96)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>FB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(13,69,23,32,31,3,77,3,7,1,1,38,74,64,61)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>WR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(40,2,25,32,38,3,8,4,100,0,0,95,37,86)+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>TE";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc(34,34,38,43,32,2,65,2,88,0,0,68,63,31)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OT</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(18,43,65,87,2,8,110,1,1,0,0,24,106,35)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OG</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(17,44,56,90,2,8,115,1,1,0,0,23,110,33)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OC</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(18,44,59,86,3,9,112,3,2,0,0,22,108,34)+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>DT";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc(34,33,27,50,2,119,6,1,3,0,0,25,116,84)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>DE</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(25,33,26,38,2,106,6,1,5,0,0,93,79,86)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>OLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(82,50,44,16,3,94,4,0,24,0,0,62,46,75)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>MLB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(49,88,50,19,4,102,4,1,15,0,0,43,87,38)+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>CB";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc(47,80,40,28,5,60,4,1,36,0,0,91,27,81)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>NT</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(34,34,15,39,2,127,5,1,4,0,0,24,125,90)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>SS</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(49,90,36,23,4,96,3,1,20,0,0,90,57,31)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>K</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(33,33,77,40,5,10,1,0,1,141,23,8,105,23)+"</td></tr>";
			
			tablehtml=tablehtml + "<tr><td bgcolor=\"#eeeeee\" width=100>P";
			tablehtml=tablehtml + "</td><td bgcolor=\"#eeeeee\" width=50>"+calc(33,32,76,38,2,8,1,0,2,21,141,16,106,24)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>G</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(29,94,15,30,3,116,5,0,1,0,0,122,29,56)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>KR</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(14,40,15,32,10,3,3,1,39,1,1,111,26,105)+"</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=100>ST CB</td>";
			tablehtml=tablehtml + "<td bgcolor=\"#eeeeee\" width=50>"+calc(39,77,15,43,1,27,98,0,5,0,0,62,38,95)+"</td></tr>";
			
			
			tablehtml=tablehtml+'</table><tr><td colspan="6" bgcolor="#006484" valign="middle" align="left" style="font-family: verdana, arial, sans-serif; color: #ffffff; font-size: 12px; font-weight: bold; padding-left: 2px;">OTROS';
			
			thistable.innerHTML=thistable.innerHTML.replace(/OTROS/,tablehtml);
                        thistable.innerHTML=thistable.innerHTML.replace(/OTHERS/,tablehtml);
			
			//alert(skillname.join());
			//alert(skilllevel.join());
			i=atable.snapshotLength;
		}
	}


function calc(pos,vis,int,foo,car,tac,blo,pas,cat,kic,pun,spe,str,agi) {

       var rv = (getvalue("Positioning") * (pos/100)) + (getvalue("Vision")   * (vis/100)) + (getvalue("Intelligence") * (int/100)) +  
                (getvalue("Footwork")    * (foo/100)) + (getvalue("Carrying") * (car/100)) + (getvalue("Tackling")     * (tac/100)) +
                (getvalue("Blocking")    * (blo/100)) + (getvalue("Passing")  * (pas/100)) + (getvalue("Catching")     * (cat/100)) +
                (getvalue("Kicking")     * (kic/100)) + (getvalue("Punting")  * (pun/100)) + (getvalue("Speed")        * (spe/100)) +
                (getvalue("Strength")    * (str/100)) + (getvalue("Agility")  * (agi/100));

       return (rv.toFixed(2));
	
} 


function getvalue(skill) {
	rv=0;
	for(var j=0;j<15;j++) {
		if(skillname[j]==skill) {
			rv=skilllevel[j];
		}
	}
	return rv;
}
},timeout);