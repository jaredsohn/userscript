// ==UserScript==
// @name           Team Salary Totals
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/2007/league/roster_chart.html
// @include        http://fantasygames.sportingnews.com/stratomatic/league/roster_chart.html*
// ==/UserScript==

var salarys;
var totals;
var salaryTotal = new Array(24);
for (var i = 0; i < 24; i++){

	salaryTotal[i] = 0;

}

var myCount=0;

var myLink = document.createElement("a");

var myDiv = document.createElement('div');



var salary = document.evaluate("//td[@class='tright']/text()|//td[@class='tright']/b/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < salary.snapshotLength; i++) {
salarys2 = salary.snapshotItem(i);
salarys = salarys2.nodeValue;



	if (salarys == "$M"){ 
		
		myCount++
	
	}
	else 
	{
		if (myCount < 3){//1,2
			
			salarys = parseFloat(salarys);
			salaryTotal[0] = salaryTotal[0] + salarys;
			
		}

		if ((myCount > 2) && (myCount < 5)){//3,4
			
			salarys = parseFloat(salarys);
			salaryTotal[1] = salaryTotal[1] + salarys;

			
		}

		if ((myCount > 4) && (myCount < 7)){//5,6
			salarys = parseFloat(salarys);
			salaryTotal[2] = salaryTotal[2] + salarys;
		}

		if ((myCount > 6) && (myCount < 9)){//7,8
			salarys = parseFloat(salarys);
			salaryTotal[3] = salaryTotal[3] + salarys;
		}

		if ((myCount > 8) && (myCount < 11)){//9,10
			salarys = parseFloat(salarys);
			salaryTotal[4] = salaryTotal[4] + salarys;
		}

		if ((myCount > 10) && (myCount < 13)){//11,12
			salarys = parseFloat(salarys);
			salaryTotal[5] = salaryTotal[5] + salarys;
		}

		if ((myCount > 12) && (myCount < 15)){//13,14
			salarys = parseFloat(salarys);
			salaryTotal[6] = salaryTotal[6] + salarys;
		}

		if ((myCount > 14) && (myCount < 17)){//15,16
			salarys = parseFloat(salarys);
			salaryTotal[7] = salaryTotal[7] + salarys;
		}

		if ((myCount > 16) && (myCount < 19)){//17,18
			salarys = parseFloat(salarys);
			salaryTotal[8] = salaryTotal[8] + salarys;
		}

		if ((myCount > 18) && (myCount < 21)){//19,20
			salarys = parseFloat(salarys);
			salaryTotal[9] = salaryTotal[9] + salarys;
		}

		if ((myCount > 20) && (myCount < 23)){//21,22
			salarys = parseFloat(salarys);
			salaryTotal[10] = salaryTotal[10] + salarys;
		}

		if ((myCount > 22) && (myCount < 25)){//23,24
			salarys = parseFloat(salarys);
			salaryTotal[11] = salaryTotal[11] + salarys;
		}
		///added for 24 team leagues
		
		if ((myCount > 24) && (myCount < 27)){//25,26
			salarys = parseFloat(salarys);
			salaryTotal[12] = salaryTotal[12] + salarys;
		}
		if ((myCount > 26) && (myCount < 29)){//27,28
			salarys = parseFloat(salarys);
			salaryTotal[13] = salaryTotal[13] + salarys;
		}		
		if ((myCount > 28) && (myCount < 31)){//29,30
			salarys = parseFloat(salarys);
			salaryTotal[14] = salaryTotal[14] + salarys;
		}
		if ((myCount > 30) && (myCount < 33)){//31,32
			salarys = parseFloat(salarys);
			salaryTotal[15] = salaryTotal[15] + salarys;
		}
		if ((myCount > 32) && (myCount < 35)){//33,34
			salarys = parseFloat(salarys);
			salaryTotal[16] = salaryTotal[16] + salarys;
		}
		if ((myCount > 34) && (myCount < 37)){//35,36
			salarys = parseFloat(salarys);
			salaryTotal[17] = salaryTotal[17] + salarys;
		}		
		if ((myCount > 36) && (myCount < 39)){//37,38
			salarys = parseFloat(salarys);
			salaryTotal[18] = salaryTotal[18] + salarys;
		}
		if ((myCount > 38) && (myCount < 41)){//39,40
			salarys = parseFloat(salarys);
			salaryTotal[19] = salaryTotal[19] + salarys;
		}		
		if ((myCount > 40) && (myCount < 43)){//41,42
			salarys = parseFloat(salarys);
			salaryTotal[20] = salaryTotal[20] + salarys;
		}	
		if ((myCount > 42) && (myCount < 45)){//43,44
			salarys = parseFloat(salarys);
			salaryTotal[21] = salaryTotal[21] + salarys;
		}
		if ((myCount > 44) && (myCount < 47)){//45,46
			salarys = parseFloat(salarys);
			salaryTotal[22] = salaryTotal[22] + salarys;
		}
		if ((myCount > 46) && (myCount < 49)){//47,48
			salarys = parseFloat(salarys);
			salaryTotal[23] = salaryTotal[23] + salarys;
		}		

	}

	

	var leagueLink2 = document.evaluate("//td[@class='tright']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	myLink = document.createElement("a");
	leagueLink2s = leagueLink2.snapshotItem(i);
	leagueLink2s = leagueLink2s.data;

}
for (var j = 0; j < 24; j++){
	salaryTotal[j] = Math.round(salaryTotal[j]*100)/100;
	GM_log(salaryTotal[j]);

}

var total = document.evaluate("//td[@class='tright']/b/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < total.snapshotLength; i = i + 2) {
totals2 = total.snapshotItem(i);
totals = totals2.nodeValue;

myDiv = document.createElement('div');

myDiv.innerHTML = '<small>' + salaryTotal[i/2] + 'M';
totals2.parentNode.replaceChild(myDiv,totals2);
}
