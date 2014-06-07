// ==UserScript==
// @name        personel package data 
// @namespace   DeepRoute
// @include     http://deeproute.com/?js=weekbyweek*
// @include     http://deeproute.com/default.asp?js=weekbyweek*
// @version     1.4.2  
// ==/UserScript==

var teamlist=[];
var abbrlist=[];

var teams=[];
var abbrs=[];

var teamID=[], links=[], readcount=0, readtarget=1, detailedPackageStats=[], packageYards=[], sumPackageStats=[], sumDownStats=[];
var WRSplitStats=[]; 
var rushGainSplits=[]; 

var showOffense = 1; 
var runPassSplits = 0; 
var WRTargetSplits = 0; 
var WRProductionSplits = 0; 

var Preseason = 0; 
var RegularSeason = 0; 
var Postseason = 0; 

var withPens = 0; 

function getElementsByClassName(classname, par){
	 var a=[];
	 var re = new RegExp('\\b' + classname + '\\b'); 
	 var els = par.getElementsByTagName("*"); // node list of every element under par (document, presumably the scedule page?) 
	 for(var i=0,j=els.length; i<j; i++){ // while i is less than the number of elements under par 
			if(re.test(els[i].className)){ // if an element includes "team_checkbox", push the element into a. 
				 a.push(els[i]);
			}
	 }
	 return a;
};

function isTeam(inteam) { // return 1 if inteam is a team name, 0 otherwise 
	for (var x=0; x<teams.length; x++)
		if (teams[x] == inteam) return 1;
	return 0;
};

function isAbbr(inabbr) {
	for (var x=0; x<abbrs.length; x++) { 
		if (abbrs[x] == inabbr) { 
			return 1; 
		}
	}
	return 0;
};

function correctAbbr(inabbr, showOffense) {
	var isGiven = isAbbr(inabbr); 
	if (showOffense) {
		return isGiven; 
	} else {
		return !(isGiven); 
	}
}

function isID(inid) {
	for (var x=0; x<teamID.length; x++) 
		if (teamID[x]==inid) return 1;
	return 0;
};

function getDistToGo(inTogo, inEndToGo) {
	var distToGo=0; 
	if (inTogo=="inches") {
		distToGo=0.1; 
	} else if (inTogo=="Foot~") {
		distToGo=0.17; 
	} else if (inTogo=="< 1") {
		distToGo=0.67; 
	} else {
		distToGo=parseInt(inTogo);
		if (distToGo == NaN) {
			return -1; 
		}
	}
	if (inEndToGo=="+") {
		distToGo+=0.25; 
	} else if (inEndToGo=="-") {
		distToGo-=0.25; 
	}
	return distToGo; 
}

function getPkgid(inPkg) {
	var pkgid=-1; 
	if (inPkg=="H F T 1 2" || inPkg=="HFT12") {
		pkgid=0; 
	} else if (inPkg=="H F T t 1" || inPkg=="HFTt1") {
		pkgid=1; 
	} else if (inPkg=="H T t 1 2" || inPkg=="HTt12") {
		pkgid=2; 
	} else if (inPkg=="H F 1 2 3" || inPkg=="HF123") {
		pkgid=3; 
	} else if (inPkg=="H T 1 2 3" || inPkg=="HT123") {
		pkgid=4; 
	} else if (inPkg=="H 1 2 3 4" || inPkg=="H1234") {
		pkgid=5; 
	} else if (inPkg=="T 1 2 3 4" || inPkg=="T1234") {
		pkgid=6; 
	} else if (inPkg=="1 2 3 4 5" || inPkg=="12345") {
		pkgid=7; 
	}
	return pkgid; 
}

function getWRID(WR) {
	if (WR == "WR1") {
		return 0; 
	}
	if (WR == "WR2") {
		return 1; 
	}
	if (WR == "WR3") {
		return 2; 
	}
	if (WR == "WR4") {
		return 3; 
	}
	if (WR == "WR5") {
		return 4; 
	}
	if (WR == "TE1") {
		return 5; 
	}
	if (WR == "TE2") {
		return 6; 
	}
	if (WR == "HB " || WR == "HB") {
		return 7; 
	}
	if (WR == "FB " || WR == "FB") {
		return 8; 
	}
	else {
		return -1; 
	}
}

function checkRunPass(run, pass, pkgid, downDistID, yards, isSuccess) {
		detailedPackageStats[downDistID][pkgid][pass][0]++; 
		detailedPackageStats[downDistID][pkgid][pass][1]+=yards; 
		detailedPackageStats[downDistID][pkgid][pass][2]+=isSuccess; 
		return; 
} // */

function getSuccess(yards, distToGo, down, isTouchdown) {
	var isSuccess=-1; 
	if (isTouchdown==1) {
		return 1; 
	}
	if (down=="1st") {
		if (yards >= (distToGo*0.45)) {
			return 1;  
		} else {
			return 0; 
		}
	} else if (down=="2nd") {
		if (yards >= (distToGo*0.6)) {
			return 1; 
		} else {
			return 0; 
		}
	} else if (down=="3rd" || down=="4th") {
		if (yards >= distToGo) {
			return 1; 
		} else {
			return 0; 
		}
	}
	return isSuccess; 
}

function getYRD(downDistID, pkgid, isPassPlay) {
	return (detailedPackageStats[downDistID][pkgid][isPassPlay][1]).toFixed(2); 
}

function getYPA(downDistID, pkgid, isPassPlay) {
	var YPA=0; 
	if (detailedPackageStats[downDistID][pkgid][isPassPlay][0]>0) {
		YPA=(detailedPackageStats[downDistID][pkgid][isPassPlay][1]/detailedPackageStats[downDistID][pkgid][isPassPlay][0]).toFixed(1); 
	}
	return YPA; 
}

function getSuccessRate(downDistID, pkgid, isPassPlay) {
	var successRate=0; 
	if (detailedPackageStats[downDistID][pkgid][isPassPlay][0]>0) {
		successRate=(detailedPackageStats[downDistID][pkgid][isPassPlay][2]/detailedPackageStats[downDistID][pkgid][isPassPlay][0])*100; 
	}
	return successRate.toFixed(0); 
}

function make_old_r_p_table(SR_def, YPP_def, OPP_def, ORP_def) {
	var label="<th colspan='3'> Runs </th> <th colspan='3'> Passes </th>"; 
	var stat_defs="<td>" + ORP_def + "</td> <td>" + YPP_def + "</td> <td>" + SR_def + "</td> <td>" + OPP_def + "</td> <td>" + YPP_def + "</td> <td>" + SR_def + "</td>"; 
	var table = 
			"<table border='1'> <tr>" + 
			"<th rowspan='3'> Down and Distance </th> <th colspan='6'> HFT12 </th> <th colspan='6'> HFTt1 </th> <th colspan='6'> HTt12 </th> <th colspan='6'> HF123 </th> <th colspan='6'> HT123 </th> <th colspan='6'> H1234 </th> <th colspan='6'> T1234 </th> <th colspan='6'> 12345 </th> <th colspan='6'> All </th> <tr> " + 
			label + label + label + label + label + label + label + label + label + "<tr>" +  
			stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + "<tr>" + 
			addtr("1st down", 0) + 
			addtr("2nd and 0-3", 1) + 
			addtr("2nd and 3-7", 2) +
			addtr("2nd and 7+", 3) + 
			addtr("3rd/4th and 0-3", 4) +
			addtr("3rd/4th and 3-7", 5) + 
			addtr("3rd/4th and 7+", 6) +
			addSumTr("all") + 
			"</table>";
	return table; 
}

function makePlaytypeTableSection(pkgid, downDistID, isPassPlay) { 
	var tableSection=
		"<td>" + detailedPackageStats[downDistID][pkgid][isPassPlay][0] + 
		"</td> <td>" + getYPA(downDistID, pkgid, isPassPlay) + 
		"</td> <td>" + getSuccessRate(downDistID, pkgid, isPassPlay) + "%" + 
		"</td> ";
	return tableSection; 
}

function makeDDPTableSection(pkgid, downDistID) { 
	var tableSection=
		makePlaytypeTableSection(pkgid, downDistID, 0) + 
		makePlaytypeTableSection(pkgid, downDistID, 1); 
	return tableSection; 
}

function addtr(downDist, downDistID) { 
	var tr="<tr> <th> " + downDist + 
		": </th>" + 
		makeDDPTableSection(0, downDistID) + 
		makeDDPTableSection(1, downDistID) + 
		makeDDPTableSection(2, downDistID) + 
		makeDDPTableSection(3, downDistID) + 
		makeDDPTableSection(4, downDistID) + 
		makeDDPTableSection(5, downDistID) + 
		makeDDPTableSection(6, downDistID) + 
		makeDDPTableSection(7, downDistID) + 
		makeDDTableSection(downDistID); 
	return tr; 
}

function getPkgYRD(pkgid, isPassPlay) {
	return (sumPackageStats[pkgid][isPassPlay][1]).toFixed(2); 
}

function getPkgYPA(pkgid, isPassPlay) {
	var YPA=0; 
	if (sumPackageStats[pkgid][isPassPlay][0]>0) {
		YPA=(sumPackageStats[pkgid][isPassPlay][1]/sumPackageStats[pkgid][isPassPlay][0]).toFixed(1); 
	}
	return YPA; 
}

function getPkgSuccessRate(pkgid, isPassPlay) {
	var successRate=0; 
	if (sumPackageStats[pkgid][isPassPlay][0]>0) {
		successRate=(sumPackageStats[pkgid][isPassPlay][2]/sumPackageStats[pkgid][isPassPlay][0])*100; 
	}
	return successRate.toFixed(0); 
}

function makePkgPlaytypeTableSection(pkgid, isPassPlay) {
	var tableSection=
		"<td>" + sumPackageStats[pkgid][isPassPlay][0] + 
		"</td> <td>" + getPkgYPA(pkgid, isPassPlay) + 
		"</td> <td>" + getPkgSuccessRate(pkgid, isPassPlay) + "%" + 
		"</td>";
	return tableSection; 
}

function makePkgTableSection(pkgid) {
	var tableSection=
		makePkgPlaytypeTableSection(pkgid, 0) + 
		makePkgPlaytypeTableSection(pkgid, 1); 
	return tableSection; 
}

function addSumTr(downDist) {
	var tr="<tr> <th> " + downDist + 
		": </th>" + 
		makePkgTableSection(0) + 
		makePkgTableSection(1) + 
		makePkgTableSection(2) + 
		makePkgTableSection(3) + 
		makePkgTableSection(4) + 
		makePkgTableSection(5) + 
		makePkgTableSection(6) + 
		makePkgTableSection(7) + 
		" </td>"; 
	return tr; 
}

function getDD_YRD(downDistID, isPassPlay) {
	return (sumDownStats[downDistID][isPassPlay][1]).toFixed(2); 
}

function getDD_YPA(downDistID, isPassPlay) {
	var YPA=0; 
	if (sumDownStats[downDistID][isPassPlay][0]>0) {
		YPA=(sumDownStats[downDistID][isPassPlay][1]/sumDownStats[downDistID][isPassPlay][0]).toFixed(1); 
	}
	return YPA; 
}

function getDD_SuccessRate(downDistID, isPassPlay) {
	var successRate=0; 
	if (sumDownStats[downDistID][isPassPlay][0]>0) {
		successRate=(sumDownStats[downDistID][isPassPlay][2]/sumDownStats[downDistID][isPassPlay][0])*100; 
	}
	return successRate.toFixed(0); 
}

function makeDDPlaytypeTableSection(downDistID, isPassPlay) {
	var tableSection=
		"<td>" + sumDownStats[downDistID][isPassPlay][0] + 
		"</td> <td>" + getDD_YPA(downDistID, isPassPlay) +  
		"</td> <td>" + getDD_SuccessRate(downDistID, isPassPlay) + "%" + 
		"</td>";
	return tableSection; 
}

function makeDDTableSection(downDistID) {
	var tableSection=
		makeDDPlaytypeTableSection(downDistID, 0) + 
		makeDDPlaytypeTableSection(downDistID, 1); 
	return tableSection; 
}

function make_WR_target_table(FIRST_def, TGT_def, DMP_def, DIST_def) {
	var stat_defs = "<td>" + FIRST_def + "</td> <td>" + TGT_def + "</td> <td>" + DIST_def + "</td> <td>" + DMP_def + "</td>"; 
	var table = 
		"<table border='2'> <tr>" + 
		"<th rowspan='2'>Package</th> <th rowspan='2'>WR</th> <th colspan='4'>1st Down</th> <th colspan='4'>2nd and 0-3</th> <th colspan='4'>2nd and 3-7</th> <th colspan='4'>2nd and 7+</th> <th colspan='4'>3rd/4th and 0-3</th> <th colspan='4'>3rd/4th and 3-7</th> <th colspan='4'>3rd/4th and 7+</th>" + 
		"<tr>" + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + 
		addWrTgtPkgTr("HFT12", "WR1", "WR2", "TE1", "HB", "FB") + 
		addWrTgtPkgTr("HFTt1", "WR1", "TE1", "TE2", "HB", "FB") + 
		addWrTgtPkgTr("HTt12", "WR1", "WR2", "TE1", "TE2", "HB") + 
		addWrTgtPkgTr("HF123", "WR1", "WR2", "WR3", "HB", "FB") + 
		addWrTgtPkgTr("HT123", "WR1", "WR2", "WR3", "TE1", "HB") + 
		addWrTgtPkgTr("H1234", "WR1", "WR2", "WR3", "WR4", "HB") + 
		addWrTgtPkgTr("T1234", "WR1", "WR2", "WR3", "WR4", "TE1") + 
		addWrTgtPkgTr("12345", "WR1", "WR2", "WR3", "WR4", "WR5") + // */
		"</table>"; 
	return table; 
}

function addWrTgtPkgTr(pkg, wr1, wr2, wr3, wr4, wr5) {
	pkgid = getPkgid(pkg); 
	var row = 
		"<tr> <th rowspan='5'>" + pkg + "</th> <th>" + wr1 + "</th> <td>" 
		+ getFirst(wr1, pkgid, 0) + "</td> <td>" + getTGTs(wr1, pkgid, 0) + "</td> <td>" + getAveDist(wr1, pkgid, 0) + "</td> <td>" + getDumpoffs(wr1, pkgid, 0) + "</td> <td>"
		+ getFirst(wr1, pkgid, 1) + "</td> <td>" + getTGTs(wr1, pkgid, 1) + "</td> <td>" + getAveDist(wr1, pkgid, 1) + "</td> <td>" + getDumpoffs(wr1, pkgid, 1) + "</td> <td>" 
		+ getFirst(wr1, pkgid, 2) + "</td> <td>" + getTGTs(wr1, pkgid, 2) + "</td> <td>" + getAveDist(wr1, pkgid, 2) + "</td> <td>" + getDumpoffs(wr1, pkgid, 2) + "</td> <td>" 
		+ getFirst(wr1, pkgid, 3) + "</td> <td>" + getTGTs(wr1, pkgid, 3) + "</td> <td>" + getAveDist(wr1, pkgid, 3) + "</td> <td>" + getDumpoffs(wr1, pkgid, 3) + "</td> <td>" 
		+ getFirst(wr1, pkgid, 4) + "</td> <td>" + getTGTs(wr1, pkgid, 4) + "</td> <td>" + getAveDist(wr1, pkgid, 4) + "</td> <td>" + getDumpoffs(wr1, pkgid, 4) + "</td> <td>" 
		+ getFirst(wr1, pkgid, 5) + "</td> <td>" + getTGTs(wr1, pkgid, 5) + "</td> <td>" + getAveDist(wr1, pkgid, 5) + "</td> <td>" + getDumpoffs(wr1, pkgid, 5) + "</td> <td>" 
		+ getFirst(wr1, pkgid, 6) + "</td> <td>" + getTGTs(wr1, pkgid, 6) + "</td> <td>" + getAveDist(wr1, pkgid, 6) + "</td> <td>" + getDumpoffs(wr1, pkgid, 6) + "</td>" 
		+ addWrTgtTr(pkgid, wr2) + addWrTgtTr(pkgid, wr3) + addWrTgtTr(pkgid, wr4) + addWrTgtTr(pkgid, wr5); // */
	return row; 
}

function addWrTgtTr(pkgid, wr) {
	var row = "<tr> <th>" + wr + "</th> <td>" + getFirst(wr, pkgid, 0) + "</td> <td>" + getTGTs(wr, pkgid, 0) + "</td> <td>" + getAveDist(wr, pkgid, 0) + "</td> <td>" + getDumpoffs(wr, pkgid, 0) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 1) + "</td> <td>" + getTGTs(wr, pkgid, 1) + "</td> <td>" + getAveDist(wr, pkgid, 1) + "</td> <td>" + getDumpoffs(wr, pkgid, 1) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 2) + "</td> <td>" + getTGTs(wr, pkgid, 2) + "</td> <td>" + getAveDist(wr, pkgid, 2) + "</td> <td>" + getDumpoffs(wr, pkgid, 2) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 3) + "</td> <td>" + getTGTs(wr, pkgid, 3) + "</td> <td>" + getAveDist(wr, pkgid, 3) + "</td> <td>" + getDumpoffs(wr, pkgid, 3) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 4) + "</td> <td>" + getTGTs(wr, pkgid, 4) + "</td> <td>" + getAveDist(wr, pkgid, 4) + "</td> <td>" + getDumpoffs(wr, pkgid, 4) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 5) + "</td> <td>" + getTGTs(wr, pkgid, 5) + "</td> <td>" + getAveDist(wr, pkgid, 5) + "</td> <td>" + getDumpoffs(wr, pkgid, 5) + "</td>" + 
		"<td>" + getFirst(wr, pkgid, 6) + "</td> <td>" + getTGTs(wr, pkgid, 6) + "</td> <td>" + getAveDist(wr, pkgid, 6) + "</td> <td>" + getDumpoffs(wr, pkgid, 6) + "</td>"; // */
	return row; 
}

function make_WR_production_table(GCOVpct_def, SR_def, YPT_def, INTpct_def) {
	var stat_defs = "<td>" + GCOVpct_def + "</td> <td>" + SR_def + "</td> <td>" + YPT_def + "</td> <td>" + INTpct_def + "</td>"; 
	var table = 
		"<table border='2'> <tr>" + 
		"<th rowspan='2'>Package</th> <th rowspan='2'>WR</th> <th colspan='4'>1st Down</th> <th colspan='4'>2nd and 0-3</th> <th colspan='4'>2nd and 3-7</th> <th colspan='4'>2nd and 7+</th> <th colspan='4'>3rd/4th and 0-3</th> <th colspan='4'>3rd/4th and 3-7</th> <th colspan='4'>3rd/4th and 7+</th>" + 
		"<tr>" + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + stat_defs + 
		addWrProdPkgTr("HFT12", "WR1", "WR2", "TE1", "HB", "FB") + 
		addWrProdPkgTr("HFTt1", "WR1", "TE1", "TE2", "HB", "FB") + 
		addWrProdPkgTr("HTt12", "WR1", "WR2", "TE1", "TE2", "HB") + 
		addWrProdPkgTr("HF123", "WR1", "WR2", "WR3", "HB", "FB") + 
		addWrProdPkgTr("HT123", "WR1", "WR2", "WR3", "TE1", "HB") + 
		addWrProdPkgTr("H1234", "WR1", "WR2", "WR3", "WR4", "HB") + 
		addWrProdPkgTr("T1234", "WR1", "WR2", "WR3", "WR4", "TE1") + 
		addWrProdPkgTr("12345", "WR1", "WR2", "WR3", "WR4", "WR5") + // */
		"</table>"; 
	return table;
}

function addWrProdPkgTr(pkg, wr1, wr2, wr3, wr4, wr5) {
	pkgid = getPkgid(pkg); 
	var row = 
		"<tr> <th rowspan='5'>" + pkg + "</th> <th>" + wr1 + "</th> <td>" 
		+ getGCOVpct(wr1, pkgid, 0) + "</td> <td>" + getWrSR(wr1, pkgid, 0) + "</td> <td>" + getYPT(wr1, pkgid, 0) + "</td> <td>" + getINTpct(wr1, pkgid, 0) + "</td> <td>"
		+ getGCOVpct(wr1, pkgid, 1) + "</td> <td>" + getWrSR(wr1, pkgid, 1) + "</td> <td>" + getYPT(wr1, pkgid, 1) + "</td> <td>" + getINTpct(wr1, pkgid, 1) + "</td> <td>" 
		+ getGCOVpct(wr1, pkgid, 2) + "</td> <td>" + getWrSR(wr1, pkgid, 2) + "</td> <td>" + getYPT(wr1, pkgid, 2) + "</td> <td>" + getINTpct(wr1, pkgid, 2) + "</td> <td>" 
		+ getGCOVpct(wr1, pkgid, 3) + "</td> <td>" + getWrSR(wr1, pkgid, 3) + "</td> <td>" + getYPT(wr1, pkgid, 3) + "</td> <td>" + getINTpct(wr1, pkgid, 3) + "</td> <td>" 
		+ getGCOVpct(wr1, pkgid, 4) + "</td> <td>" + getWrSR(wr1, pkgid, 4) + "</td> <td>" + getYPT(wr1, pkgid, 4) + "</td> <td>" + getINTpct(wr1, pkgid, 4) + "</td> <td>" 
		+ getGCOVpct(wr1, pkgid, 5) + "</td> <td>" + getWrSR(wr1, pkgid, 5) + "</td> <td>" + getYPT(wr1, pkgid, 5) + "</td> <td>" + getINTpct(wr1, pkgid, 5) + "</td> <td>" 
		+ getGCOVpct(wr1, pkgid, 6) + "</td> <td>" + getWrSR(wr1, pkgid, 6) + "</td> <td>" + getYPT(wr1, pkgid, 6) + "</td> <td>" + getINTpct(wr1, pkgid, 6) + "</td>"  
		+ addWrProdTr(pkgid, wr2) + addWrProdTr(pkgid, wr3) + addWrProdTr(pkgid, wr4) + addWrProdTr(pkgid, wr5); // */
	return row; 
}

function addWrProdTr(pkgid, wr) {
	var row = "<tr> <th>" + wr + "</th> <td>" + getGCOVpct(wr, pkgid, 0) + "</td> <td>" + getWrSR(wr, pkgid, 0) + "</td> <td>" + getYPT(wr, pkgid, 0) + "</td> <td>" + getINTpct(wr, pkgid, 0) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 1) + "</td> <td>" + getWrSR(wr, pkgid, 1) + "</td> <td>" + getYPT(wr, pkgid, 1) + "</td> <td>" + getINTpct(wr, pkgid, 1) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 2) + "</td> <td>" + getWrSR(wr, pkgid, 2) + "</td> <td>" + getYPT(wr, pkgid, 2) + "</td> <td>" + getINTpct(wr, pkgid, 2) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 3) + "</td> <td>" + getWrSR(wr, pkgid, 3) + "</td> <td>" + getYPT(wr, pkgid, 3) + "</td> <td>" + getINTpct(wr, pkgid, 3) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 4) + "</td> <td>" + getWrSR(wr, pkgid, 4) + "</td> <td>" + getYPT(wr, pkgid, 4) + "</td> <td>" + getINTpct(wr, pkgid, 4) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 5) + "</td> <td>" + getWrSR(wr, pkgid, 5) + "</td> <td>" + getYPT(wr, pkgid, 5) + "</td> <td>" + getINTpct(wr, pkgid, 5) + "</td>" + 
		"<td>" + getGCOVpct(wr, pkgid, 6) + "</td> <td>" + getWrSR(wr, pkgid, 6) + "</td> <td>" + getYPT(wr, pkgid, 6) + "</td> <td>" + getINTpct(wr, pkgid, 6) + "</td>"; // */
	return row; 
}

function getFirst(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	if (wrid == -1) {
		alert("wrid = -1, WR = " + wr); 
	}
	return (WRSplitStats[pkgid][downDistID][wrid][0] + WRSplitStats[pkgid][downDistID][wrid][1]); 
}

function getTGTs(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	return (WRSplitStats[pkgid][downDistID][wrid][5] - WRSplitStats[pkgid][downDistID][wrid][2]); 
}

function getDumpoffs(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	return WRSplitStats[pkgid][downDistID][wrid][2]; 
}

function getAveDist(wr, pkgid, downDistID) { 
	wrid = getWRID(wr); 
	var dist = WRSplitStats[pkgid][downDistID][wrid][4]; 
	var atts = WRSplitStats[pkgid][downDistID][wrid][5] - (WRSplitStats[pkgid][downDistID][wrid][2] + WRSplitStats[pkgid][downDistID][wrid][3]);
	if (dist==0) {
		return 0; 
	}
	else {
		return (dist/atts).toFixed(1); 
	}
}

function getWrSR(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	var SR; 
	if (WRSplitStats[pkgid][downDistID][wrid][5] == 0) {
		SR = 0; 
	}
	else {
		SR = (100*WRSplitStats[pkgid][downDistID][wrid][7]/WRSplitStats[pkgid][downDistID][wrid][5]).toFixed(0);  
	}
	return "<span title='" + WRSplitStats[pkgid][downDistID][wrid][7] + " successful plays in " + WRSplitStats[pkgid][downDistID][wrid][5] + " targets'>" + SR + "</span>%"; 
}

function getYPT(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	var YPT; 
	if (WRSplitStats[pkgid][downDistID][wrid][5] == 0) {
		YPT = 0; 
	}
	else {
		YPT = (WRSplitStats[pkgid][downDistID][wrid][6]/WRSplitStats[pkgid][downDistID][wrid][5]).toFixed(1); 
	}
	return "<span title='" + (WRSplitStats[pkgid][downDistID][wrid][6]).toFixed(1) + " recieving yards in " + WRSplitStats[pkgid][downDistID][wrid][5] + " targets'>" + YPT + "</span>"; 
} 

function getGCOVpct(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	var firstOpt = WRSplitStats[pkgid][downDistID][wrid][0] + WRSplitStats[pkgid][downDistID][wrid][1]; 
	var GCOVpct; 
	if (firstOpt == 0) {
		GCOVpct = 0; 
	}
	else {
		GCOVpct = (100 * WRSplitStats[pkgid][downDistID][wrid][0] / firstOpt).toFixed(0); 
	}
	return "<span title='" + WRSplitStats[pkgid][downDistID][wrid][0] + " GCOVs in " + firstOpt + " first option checks'>" + GCOVpct + "</span>%"; 
}

function getINTpct(wr, pkgid, downDistID) {
	wrid = getWRID(wr); 
	var INTpct; 
	if (WRSplitStats[pkgid][downDistID][wrid][5] == 0) {
		INTpct = 0; 
	}
	else {
		INTpct = (100 * WRSplitStats[pkgid][downDistID][wrid][8]/WRSplitStats[pkgid][downDistID][wrid][5]).toFixed(1); 
	} // */
	return "<span title='" + WRSplitStats[pkgid][downDistID][wrid][8] + " Interceptions in " + WRSplitStats[pkgid][downDistID][wrid][5] + " target(s)'>" + INTpct + "</span>%"; 
}

function parsePBP(intext) {
	var ptr1=0, ptr2, ptr3, ptr4, ptr5, ptr6, ptr7, pkg, form, play, abbr, yard, yard2, comp, scramble, INT, incomplete, loss, isTouchdown, isSuccess; 
	var down, togo, distToGo=0, endToGo, gameTime, penalty, noPlay, tmp=0, endptr, dumpoff, first_read, preptr=0; 
	var pkgid, formid, playid, downDistID, index, run, handoff, sneak, pass, att, tmparr, sack, GCOV, WR, WRID, GCOVd, GCOVdID; 
	var startNext, startThis=0, attYard, attYard2, drop, hadYards, tempYardCounter=0;
	var attempts=0, scrambles=0, sacks=0; 
	//var showOffense=1; 

	readcount++;
	newDiv = document.getElementById('scout_count');
	newDiv.innerHTML=readcount.toString() + ' of ' + readtarget + ' games'; 

	//alert("about to begin a log! readcount = " + readcount); 

	while (1) {
		tmp++; // increment 
		/*if (readcount == 14) {
			alert("tmp = " + tmp); 
		} // */
		if (preptr==0) {
			ptr2=intext.indexOf("<center>", preptr); 
			if (ptr2!=-1) {
				preptr = ptr2; 
			}
		}
		ptr2=intext.indexOf("Offensive Package Was", ptr1); // find next "Offensive Package Was" after ptr1 
		if (ptr2<0) {
			//alert("no more plays"); 
			break; // if no more offensive plays, leave 
		}
		endptr=ptr2; 
		ptr3=intext.lastIndexOf("<span style='font-size:13;'>", ptr2); // find start of the final PBP line from this play 
		ptr4=intext.indexOf("ouchdown", ptr3); // find next touchdown after start of the final PBP line 
		if (ptr4>ptr3 && ptr4 < ptr2) { // if the touchdown is after the start of the final PBP line and before the package info
			//alert("touchdown! tmp = " + tmp); 
			isTouchdown=1; 
			endptr=ptr3; // endptr becomes the start of the final PBP line 
			ptr3=intext.lastIndexOf("<span style='font-size:13;'>", endptr-5); // sets ptr3 to the final PBP line  
		} // if ptr4>ptr3 ...
		ptr6=intext.lastIndexOf("was the man covering on the play"); 
		if (ptr6!=-1 && ptr6 < endptr) {
			ptr3=intext.lastIndexOf("<span style='font-size:13;'>", ptr3-5);
		}
		pkg=intext.substring(ptr2+29, ptr2+38); // get the personel package 
		pkgid=getPkgid(pkg); 

		if (startThis==0) {
			startThis=preptr; 
		}
		ptr4=intext.indexOf("2 Point Conversion.", preptr); 
		if (ptr4!=-1 && ptr4<endptr) {
			preptr=ptr4; 
		}

		startNext=intext.indexOf("<span style='font-size:13;'>", ptr2); // find the first PBP line on the next play (to find penalties)
		ptr4=intext.indexOf("<b>", ptr3); // find location of first bolding on last line 
		ptr5=intext.indexOf("</b>", ptr4+3); // find location of close of first bolding 
		abbr=intext.substring(ptr4+3, ptr5); // get bolded text (offensive team abbr) 

		ptr4=intext.indexOf("<b>", ptr5+4); // find second bolding: quarter and time remaining 
		ptr7=intext.indexOf("</b>", ptr4+3); 
		gameTime=intext.substring(ptr4+3, ptr7); // store string with quarter and time remaining. 

		ptr4=intext.indexOf("<b>", ptr7+4); // third bolding: down and distance
		ptr7=intext.indexOf("</b>", ptr4+3); 
		down=intext.substring(ptr4+4, ptr4+7); // store down ("1st", "2nd", etc)
		ptr7=intext.indexOf(";", ptr4); // find end of distance ("Foot~", "13+", etc)
		togo=intext.substring(ptr4+12, ptr7); // store distance 
		endToGo=intext.substring(ptr7-1, ptr7); // get the final char before the ";", which may or not be a "+" or "-" 

		ptr4=intext.indexOf("a gain of", preptr); // find next "a gain of", if it exists and is before the end move it to ptr5
		loss=0; 
		hadYards=1; 
		if (ptr4!=-1 && ptr4<endptr) {
			ptr5=ptr4;
		}
		else {
			ptr4=intext.indexOf("a LOSS of", preptr); // do previous for "a loss of" 
			if (ptr4!=-1 && ptr4<endptr) { 
				ptr5=ptr4; loss=1; 
			}
			else {
				ptr4=intext.indexOf(" gains ", preptr); // do previous for "gains" 
				if (ptr4!=-1 && ptr4<endptr) {
					ptr5=ptr4;
				}
				else {
					ptr4=intext.indexOf(" loses ", preptr); // do previous for "loses" 
					if (ptr4!=-1 && ptr4<endptr) { 
						ptr5=ptr4; loss=1; 
					}
					else {
						ptr4=intext.indexOf(" keeps it and runs ", preptr); 
						if (ptr4!=-1 && ptr4<endptr) {
							ptr5=ptr4; 
						}
						else {
							ptr4=intext.indexOf("SACKED", preptr); 
							if (ptr4!=-1 && ptr4<endptr) {
								ptr5=ptr4; 
								loss=1; 
							}
							else {
								ptr5=-1; // set ptr to -1 (no loss or gain on the play) 
								hadYards=0; 
							} // else 
						} // else 
					} // else 
				} // else 
			} // else 
		} // else  
		if (ptr5!=-1) { // if a play happened 
			ptr4=intext.indexOf("class='supza'>", ptr5); // find tag for yardage 
			if (ptr4!=-1 && ptr4<endptr) { // if yardage happened 
				ptr5=intext.indexOf("</span>", ptr4+14); // find end of yardage tag
				yard=intext.substring(ptr4+14, ptr5); // get full yardage 
				ptr4=intext.indexOf("class='supz'>", ptr5);
				ptr5=intext.indexOf("</span>", ptr4+13);
				yard2=intext.substring(ptr4+13, ptr5); // get decimal yardage 
				if (loss==0) { // combine into one value 
					yard=parseInt(yard) + parseInt(yard2)/100; 
				} else if (loss==1) {
					yard= -1 * (Math.abs(parseInt(yard)) + parseInt(yard2)/100); 
				} // */
			} // if ptr4!=-1 ... 
			else yard=0;
		} // if ptr5!=-1 
		else yard=0;

		ptr4=intext.indexOf("penalty", startThis); // test if play was a penalty 
		if (ptr4!=-1 && ptr4<startNext) {
			ptr4=intext.indexOf("enalty <b>declined</b>", startThis); 
			if (ptr4!=-1 && ptr4<startNext) { 
				//alert("penalty declined! game time = " + gameTime);
				penalty=0; 
				noPlay=0; 
			}
			else {
				penalty=1; 
				ptr4=intext.indexOf(" assessed at the end of ", startThis); 
				if (ptr4!=-1 && ptr4<startNext) {
					noPlay = 1; 
				} 
				else {
					ptr4=intext.indexOf("enalty <b>accepted</b>", startThis); 
					if (ptr4!=-1 && ptr4<startNext) {
						//alert("penalty accepted! game time = " + gameTime); 
						noPlay = 1; 
					}
					else { 
						noPlay = 0; 
					}
				}
			}
		}
		else {
			penalty=0; 
			noPlay=0; 
		}

		ptr4=intext.indexOf(" primary option was ", preptr); // test for GCOVs 
		if (ptr4!=-1 && ptr4<endptr) {
			GCOV=1; 
			GCOVd = intext.substring(ptr4+20, ptr4+23); 
			GCOVdID = getWRID(GCOVd); 
		} 
		else {
			GCOV=0; 
			GCOVd=-1; 
			GCOVdID=-1; 
		}

		ptr4=intext.indexOf("dump it off", preptr); // test if play was a dumpoff 
		if (ptr4!=-1 && ptr4<endptr) {
			dumpoff=1;
		}
		else {
			dumpoff=0;
		}

		ptr4=intext.indexOf("scrambles..", preptr); 
		if (ptr4!=-1 && ptr4<endptr) {
			scramble=1; 
		}
		else scramble=0; 

		ptr4=intext.indexOf("INTERCEPTED by", preptr); 
		if (ptr4!=-1 && ptr4<endptr) {
			INT = 1; 
		} 
		else {
			INT = 0; 
		}

		pass=0; // test if pass play 
		ptr4=intext.indexOf(" pass ", preptr);
		if (ptr4!=-1 && ptr4<endptr) { 
			pass=1; 
			ptr5=intext.indexOf("<b>AMAZING</b> catch by ", preptr); 
			if (ptr5!=-1 && ptr5<endptr) {
				WR = intext.substring(ptr5+24, ptr5+27); 
				WRID = getWRID(WR); 
			}
			else {
				WRID = -1; 
			}
		}

		ptr4=intext.indexOf(" throwing ", preptr);
		if (ptr4!=-1 && ptr4<endptr) { 
			pass=1; 
		}

		ptr4=intext.indexOf("threw the ball away", preptr);
		if (ptr4!=-1 && ptr4<endptr) { 
			pass=1; 
			WRID=-1; 
		}

		ptr4=intext.indexOf(" Pass by", preptr);
		if (ptr4!=-1 && ptr4<endptr) { 
			//alert("pass! tmp = " + tmp); 
			pass=1; 
			ptr5=intext.indexOf(" to ", ptr4); 
			ptr6=intext.indexOf(",to ", ptr4); 
			if (ptr5!=-1 && ptr5<endptr && intext.substring(ptr5+4, ptr5+7)!="exe") {
				WR = intext.substring(ptr5+4, ptr5+7);
			} 
			else if (ptr6!=-1 && ptr6<endptr) {
				WR = intext.substring(ptr6+4, ptr6+7); 
			}
			else {
				ptr5=intext.indexOf("DROPPED by ", preptr); 
				if (ptr5!=-1 && ptr5<endptr) {
					WR = intext.substring(ptr5+11, ptr5+14); 
					//alert("drop by " + WR + ", readcount = " + readcount + ", tmp = " + tmp + ", abbr = " + abbr); 
					drop = 1; 
				}
				else {
					WRID = -1; 
					drop = 0; 
				}
			}
			if (WR != "exe") {
				WRID = getWRID(WR); 
			} 
			else {
				WRID = -1; 
			} // */
		}

		if (pass==0 && scramble==1) {
			pass=1;
		}
		if (pass) {
			att=1; 
		}
		else {
			att=0; 
		}
		if (scramble) {
			att=0;
		}
		ptr4=intext.indexOf("SACKED", preptr); // test if play was a sack 
		if (ptr4!=-1 && ptr4<endptr) { 
			att=0; 
			pass=1; 
			sack=1; 
		} 
		else { 
			sack=0; 
		} 

		run=0; 
		ptr4=intext.indexOf(" Handoff to ", preptr); 
		if (ptr4!=-1 && ptr4<endptr) { 
			run=1; 
			handoff=1; 
		}

		ptr4=intext.indexOf(" keeps it and runs ", preptr); 
		if (ptr4!=-1 && ptr4<endptr) { 
			run=1; 
			sneak=1; 
		}
		if (run==1 && (scramble==1 || sack==1)) { 
			run=0; 
		} // */

		if (att==1) {
			ptr4=intext.indexOf(" yard(s) downfield, ", preptr); 
			if (ptr4!=-1 && ptr4<endptr) {
				ptr5=intext.indexOf("class='supza'>", ptr4-70); 
				if (ptr5!=-1 && ptr5<endptr) {
					ptr4=intext.indexOf("</span>", ptr5+14); 
					attYard=intext.substring(ptr5+14, ptr4); 
					ptr5=intext.indexOf("class='supz'>", ptr4); 
					ptr4=intext.indexOf("</span>", ptr5+13); 
					attYard2=intext.substring(ptr5+13, ptr4); 
					attYard = parseInt(attYard) + parseInt(attYard2)/100; 
					//alert("got attYard! tmp = " + tmp + ", attYard = " + attYard); 
				}
			}
		}

		/*if (correctAbbr(abbr, showOffense) && hadYards && (noPlay == 0)) {
			tempYardCounter+=yard; 
			alert("Play with yardage: offense moved " + yard.toFixed(2) + ". down/dist = " + down + " and " + togo + ", game time = " + gameTime + ".\nYards thus far = " + tempYardCounter.toFixed(2)); 
		} // */
		
		distToGo=getDistToGo(togo, endToGo); 

		isSuccess=getSuccess(yard, distToGo, down, isTouchdown);     

		if (correctAbbr(abbr, showOffense) && (run==1 || pass==1) && distToGo!=-1 && isSuccess!=-1 && pkgid>=0 && pkgid<=7 && (noPlay==0) || withPens) { 
			if (down=="1st") {
				downDistID=0; 
				checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
			} else if (down=="2nd") {
				if (distToGo>=0 && distToGo<=3) {
					downDistID=1; 
				} else if (distToGo>3 && distToGo<=7) {
					downDistID=2; 
				} else if (distToGo>7) {
					downDistID=3; 
				}
				checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
			} else if (down=="3rd" || down=="4th") {
				if (distToGo>=0 && distToGo<=3) {
					downDistID=4; 
				} else if (distToGo>3 && distToGo<=7) {
					downDistID=5; 
				} else if (distToGo>7) {
					downDistID=6; 
				}
				checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
			} 
		} // if isAbbr(abbr) ... 

		/*if (dumpoff) {
			alert("dumpoff! att = " + att + ", WR = " + WR + ", WRID = " + WRID); 
		} // */
		if (correctAbbr(abbr, showOffense) && (WRTargetSplits || WRProductionSplits) && (noPlay==0 || withPens)) {
			if (att==1 && WRID!=-1) {
				if (!(WRID > -1)) {
					alert("Something broke. WRID = " + WRID + ", readcount = " + readcount + ", tmp = " + tmp); 
				}
				/*if (WRID==7) {
					alert("Pass to " + WR + ". readcount = " + readcount + ", tmp = " + tmp + ", pkg = " + pkg + ", downDistID = " + downDistID);
				} // */
				WRSplitStats[pkgid][downDistID][WRID][5]++; // increment targets 
				WRSplitStats[pkgid][downDistID][WRID][6] += yard; // add to yards 
				if (dumpoff==0 && GCOV==0) {
					//first_option = 1; 
					WRSplitStats[pkgid][downDistID][WRID][1]++; // increment first option passes 
				} 
				else if (dumpoff) {
					/*if (WRID < 5) {
						alert("Dumpoff to " + WR + ". readcount = " + readcount + ", tmp = " + tmp + ", pkg = " + pkg + ", downDistID = " + downDistID); 
					} // */ 
					WRSplitStats[pkgid][downDistID][WRID][2]++; // increment dumpoff passes 
				} 
				if (dumpoff==0 && attYard!="") {
					WRSplitStats[pkgid][downDistID][WRID][4]+=attYard; // add to attempted yards 
				} 
				if (dumpoff==0 && attYard=="") {
					WRSplitStats[pkgid][downDistID][WRID][3]++; // increment drops on downfield passes and passes batted at the line 
				}
				if (isSuccess == 1) {
					WRSplitStats[pkgid][downDistID][WRID][7]++; // increment successes 
				} // */
				if (INT == 1) {
					WRSplitStats[pkgid][downDistID][WRID][8]++; // increment interceptions 
				} 
			} // */

			if (WRID == GCOVdID && WRID!=-1) {
				alert("Something broke. WR = " + WR + " (" + WRID + "), GCOVd = " + GCOVd + " (" + GCOVdID + "), tmp = " + tmp + ", abbr = " + abbr + ", downDistID = " + downDistID + ", game time = " + gameTime); 
			}

			if (GCOVdID!=-1) {
				WRSplitStats[pkgid][downDistID][GCOVdID][0]++; // increment GCOVs
			}
		}

		isTouchdown=0; 
		isSuccess=0; 
		ptr1=ptr2+21; 
		WRID=-1; 
		attYard=""; 
		startThis=startNext; 
		preptr=endptr;

	} // while(1) 

	if (readcount<readtarget) {
		//alert("readcount = " + readcount + ", readtarget = " + readtarget + ", continuing!"); 
		readLog(); 
	} 
	else {
		//alert("finished with games!"); 
		var SR_def="<span title='Success Rate: Percentage of plays which are considered successful (meaning the offense is better off after them than they were before). A successful play is defined here as one which gains 45% of the required yardage on 1st down, 60% on 2nd down, and 100% on 3rd or 4th down. Definition paraphrased from footballoutsiders.com'>SR</span>"; 
		var YPP_def="<span title='Net yards per play'>Y/P</span>"; 
		var OPP_def="<span title='Offensive Pass Plays: All plays in which the offense originally intended to throw the ball. Includes passes, scrambles, and sacks.'>OPP</span>"; 
		var ORP_def="<span title='Offensive Run Plays: All plays in which the offense originally intended to run the ball. Includes handoffs and QB sneaks.'>ORP</span>"; 
		var FIRST_def="<span title='First Option Looks: The number of plays in which this reciever was the QBs first read. This inclues both GCOVs and passing targets (no dumpoffs)'>1st Opt</span>"; 
		var TGT_def="<span title='Downfield Passing Targets: The number of passes thrown to this reciever, excluding dumpoffs.'>TGT</span>"; 
		var DMP_def="<span title='Dumpoff Targets: The number of dumpoff passes thrown to this reciever.'>Dump</span>"; 
		var DIST_def="<span title='Average Distance Downfield: the average distance downfield of all passes thrown to this reciever, exluding dumpoffs and drops.'>Dist</span>"; 
		var YPT_def="<span title='Yards per Target: The average number of yards gained on a pass to this reciever'>Y/T</span>"; 
		var GCOVpct_def="<span title='Good Coverage Percentage: the percentage of first option looks to this reciever which result in a GCOV instead of a pass attempt'>GCOV%</span>"; 
		var INTpct_def="<span title='Interception Rate: the percentage of passes to this reciever which result in an interception by the defense'>INT%</span>"; 

		newDiv = document.getElementById('scout_count');
		
		if (runPassSplits) {
			for (var a=0; a<7; a++) {
				for (var c=0; c<2; c++) {
					for (var d=0; d<3; d++) {
						for (var b=0; b<8; b++) {
							sumDownStats[a][c][d]+=detailedPackageStats[a][b][c][d]; 
						}
					}
				}
			}

			for (var b=0; b<8; b++) {
				for (var c=0; c<2; c++) {
					for (var d=0; d<3; d++) {
						for (var a=0; a<7; a++) {
							sumPackageStats[b][c][d]+=detailedPackageStats[a][b][c][d]; 
						}
					}
				}
			}

			newDiv.innerHTML = make_old_r_p_table(SR_def, YPP_def, OPP_def, ORP_def); 
		}
		else if (WRTargetSplits) {
			//alert("in WR target splits"); 
			newDiv.innerHTML = make_WR_target_table(FIRST_def, TGT_def, DMP_def, DIST_def); 
		} 
		else if (WRProductionSplits) {
			newDiv.innerHTML = make_WR_production_table(GCOVpct_def, SR_def, YPT_def, INTpct_def); 
		}
	}
};


function readLog() {

	GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://deeproute.com/default.asp?js=loggerinc&viewpbp=' + links[readcount],
			headers: {
				 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				 'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(detail) {
					parsePBP(detail.responseText);
			},
		});
}


function startReadLog() {

	if (readcount>=readtarget) return;

	readtarget=links.length;
	//readcount=15; // for debugging, remove from final code! 
	//readtarget=14; // for debugging, remove from final code! 

	var target = document.getElementById('scout_button_table');
	var newDiv = document.createElement('div');
	newDiv.setAttribute("id", "scout_count");
	newDiv.innerHTML='0 of ' + readtarget + ' games';
	if (target) target.parentNode.insertBefore(newDiv, target.nextSibling);

	readLog();
};


function parseStanding(intext)
{
	var ptr1=0, ptr2, ptr3, ptr4, name, abbr;
		while (ptr1>=0) {
				ptr2=intext.indexOf("class=sbu", ptr1);
				if (ptr2<0) {
					break;
				}
				ptr3=intext.indexOf("<b>", ptr2);
				ptr4=intext.indexOf("<br>", ptr3);
				name=intext.substring(ptr3+3, ptr4) + ' ';
				ptr3=intext.indexOf("</b>", ptr4+4);
				name+=intext.substring(ptr4+4, ptr3);

				ptr2=intext.indexOf("class=norm>", ptr3);
				ptr3=intext.indexOf("</a>", ptr2+11);
				abbr=intext.substring(ptr2+11, ptr3);

				teamlist[teamlist.length]=name;
				abbrlist[abbrlist.length]=abbr;
				
			ptr1=ptr3+4;
		}
	 
		startFunc();
}

// pull the team names and abbrs from the team preseason stats page 
function parseTeamStatsForAbbrs(intext) {
	var ptr1, ptr2, ptr3, ptr4, name, abbr; 

	ptr1 = intext.indexOf("class=\"whiter\"", 0); 
	while (ptr1 >= 0) {
		ptr2 = intext.indexOf("myteamno=", ptr1); 
		if (ptr2 < 0) {
			break; 
		}
		ptr3 = intext.indexOf("\">", ptr2); 
		ptr4 = intext.indexOf("</a>", ptr3); 
		name = intext.substring(ptr3+2, ptr4); 

		ptr2 = intext.indexOf("<b>", ptr4); 
		ptr3 = intext.indexOf("</b>", ptr2+3); 
		abbr = intext.substring(ptr2+3, ptr3); 

		teamlist[teamlist.length]=name;
		abbrlist[abbrlist.length]=abbr;

		ptr1=ptr3+4; 
	}

	startFunc();
}


function buildGameList(input) 
{
	var ptr1, ptr2, ptr3, id, id2, name, endptr;

	 teams=[];
	 abbrs=[];

	var checkbox = getElementsByClassName('team_checkbox', document); // array of elements including the term "team_checkbox" in the (scedule?) page. 

	 for (var i=0; i < checkbox.length; i++) // for each element in checkbox
		 if (checkbox[i].checked) {            // if the checkbox for this team is checked 
				teams[teams.length]=teamlist[i];   // add team and team abbreviation to appropriate array 
				abbrs[abbrs.length]=abbrlist[i];
		 }


	ptr1=input.indexOf("\"teaminfo\"", 0);            // location of the first occurence of "teaminfo\" in input (the scedule page?) 
	if (ptr1<0) ptr1=input.indexOf("teaminfo ", 0);   // if "teaminfo\" is not there, find first occurence of "teaminfo " in input
	endptr=input.indexOf("hidden", ptr1+8);           // location of "hidden" in input, starting 8 chars after "teaminfo"

	while (1) {
		ptr2=input.indexOf("!", ptr1);  // ptr2 = location of "!" after 'teaminfo' (old ptr2 for later loops) 
		if (ptr2 > endptr) break; // if "!" is after "hidden", break 
		ptr3=input.indexOf("^", ptr2+1);  // ptr3 = location of "^" starting 1 char after "!" 
		id=input.substring(ptr2+1, ptr3); // id = all chars between the "!" and "^" 
		ptr2=input.indexOf("^", ptr3+1);  // ptr2 = location of "^" starting one char after "^" 
		name=input.substring(ptr3+1, ptr2); // name = all chars between "^" and "^" 
		if (isTeam(name)) teamID[teamID.length]=id; // if id is a valid team name, adds id to teamID array 
		ptr1=ptr2;
	}

	if (Preseason) {
		ptr1=input.indexOf("<input type=hidden id=\"X-1-1\""); 
	}
	else if (RegularSeason) {
		ptr1=input.indexOf("\"type-X\"", endptr); 
	} 
	else {
		ptr1=input.indexOf("\"type-R\"", endptr);
	}

	if (Postseason) {
		endptr=input.indexOf("\"type-P\"", ptr1+7);
	} 
	else if (RegularSeason) {
		endptr=input.indexOf("\"type-R\"", ptr1+7);
	} 
	else {
		endptr=input.indexOf("\"type-X\"", ptr1+7);
	}

	if (endptr<0) {
		endptr=input.indexOf("\"topper\"", ptr1+7);
	}


	while (1) {
		ptr2=input.indexOf("Y!", ptr1);
		if (ptr2 > endptr || ptr2<0) break;
		ptr3=input.indexOf("^", ptr2+2);
		id=input.substring(ptr2+2, ptr3);
		ptr2=input.indexOf("^", ptr3+1);
		id2=input.substring(ptr3+1, ptr2);

		if (isID(id) || isID(id2)) {
			ptr3=input.indexOf("^", ptr2+1);
			ptr2=input.indexOf("^", ptr3+1);
			ptr3=input.indexOf("^", ptr2+1);
			links[links.length]=input.substring(ptr2+1, ptr3);
		}

		ptr1=ptr3;
	}
}


function startFunc () 
{
	var input=document.body.innerHTML, ptr1, ptr2, ptr3, id, id2, name, endptr;
	var withGameDropdown = 0; 

	var target = document.getElementById('imonstatus');

	var runPassDef = "<span title='displays total plays, yards per play, and success rate for both runs and passes'>Rushing and passing splits</span>"; 
	var targetsDef = "<span title='displays 1st option looks, targets, average distance downfield, and dumpoffs to each possible reciever'>Reciever target splits</span>"; 
	var productionDef = "<span title='displays GCOV%, yards per target, success rate, and interception rate for each possible reciever'>Reciever production splits</span>"; 
	var withPensDef = "<span title='If this box is checked, statistics produced will include plays which were nullified by a penalty and not included in official statistics. " + 
										"If the box is not checked, these plays will be left out'> Include nullified plays "; 
	
	var gameDropdownList = '';   



	var buttontable = document.createElement('table');
	buttontable.setAttribute('cellspacing', '0');
	buttontable.setAttribute('cellpadding', '0');
	buttontable.setAttribute('border', '1'); 
	buttontable.setAttribute('id', 'scout_button_table');

	for (var z=0; z<teamlist.length; z++) {

		if (z % 8 ==0) {
			 var newtr2=document.createElement('tr');
			 buttontable.appendChild(newtr2);
		}

		var newtd2 = document.createElement('td');
		newtd2.setAttribute('align', 'center');
		var newtd3 = document.createElement('td');
		newtd3.setAttribute('align', 'center');

		var checkbox = document.createElement('input');
		checkbox.setAttribute('class', 'team_checkbox');
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("name", "teamlistid");
		checkbox.setAttribute('align', 'center');
		checkbox.setAttribute("teamlistid", z);
		var tmpdiv=document.createElement('div');
		tmpdiv.align='center';
		tmpdiv.innerHTML = '<b>'+teamlist[z]+'</b>';
		newtd2.appendChild(checkbox);
		newtd3.appendChild(tmpdiv);
		newtr2.appendChild(newtd2); 
		newtr2.appendChild(newtd3);
	}

	var newtr3=document.createElement('tr');
	buttontable.appendChild(newtr3);
	var newtd4 = document.createElement('td'); 
	newtd4.setAttribute('colspan', '4');
	var newDiv4 = document.createElement('div'); 
	newDiv4.innerHTML = '<input type="radio" name="unit" id="offense" checked="checked">  For this team (team offense) <br> <input type="radio" name="unit" id="defense">  Against this team (team defense)'; 
	newtd4.appendChild(newDiv4); 
	newtr3.appendChild(newtd4); 

	var newtd5 = document.createElement('td'); 
	newtd5.setAttribute('colspan', '4');
	var newDiv5 = document.createElement('div'); 
	newDiv5.innerHTML = 
		'<input type="radio" name="other" id="runPass" checked="checked">  ' + runPassDef + ' <br> ' + 
		'<input type="radio" name="other" id="targets">  ' + targetsDef; /* + ' <br> ' + 
		'<input type="radio" name="other" id="production"> ' + productionDef; // */
	newtd5.appendChild(newDiv5); 
	newtr3.appendChild(newtd5); // */ 

	if (withGameDropdown) {
		var newtd6 = document.createElement('td'); 
		newtd6.setAttribute('colspan', '3'); 

		for (var a=1; a<=4; a++) {
			gameDropdownList = gameDropdownList + '<option value="X-' + a + '-1">Preseason week ' + a + '</option>'; 
		}

		var newDiv6 = document.createElement('div'); 
		newDiv6.innerHTML = 
			'First game: ' + 
			'<select id="firstGame">' + gameDropdownList + '</select>'; 
		newtd6.appendChild(newDiv6); 
		newtr3.appendChild(newtd6);
	} // end if 

	else {
		var newtd6 = document.createElement('td'); 
		newtd6.setAttribute('colspan', '3'); 
		var newDiv6 = document.createElement('div'); 
		newDiv6.innerHTML = 
			'<input type="checkbox" name="season" id="pre"> Preseason <br> ' + 
			'<input type="checkbox" name="season" id="reg" checked="checked"> Regular season <br> ' + 
			'<input type="checkbox" name="season" id="post" checked="checked"> Postseason '; // */
		newtd6.appendChild(newDiv6); 
		newtr3.appendChild(newtd6); // */
	} // end else 

	var newtd7 = document.createElement('td'); 
	newtd7.setAttribute('colspan', '1'); 
	var newDiv7 = document.createElement('div'); 
	newDiv7.innerHTML = 
	'<input type="checkbox" name="pens" id="withPens" checked="checked">' + withPensDef; 
	newtd7.appendChild(newDiv7); 
	newtr3.appendChild(newtd7); 

	var newtr=document.createElement('tr');
	buttontable.appendChild(newtr);
	var newtd1 = document.createElement('td');
	newtd1.setAttribute('colspan', '2');
	var newDiv2 = document.createElement('div');
	newDiv2.align = 'center';
	newDiv2.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Start">'; 
	newDiv2.addEventListener('click', function() {
		if (document.getElementById("offense").checked) {
			showOffense = 1; 
		} else {
			showOffense = 0; 
		} // */

		if (document.getElementById("runPass").checked) {
			runPassSplits = 1; 
			WRTargetSplits = 0; 
			WRProductionSplits = 0; 
		} else if (document.getElementById("targets").checked) {
			WRTargetSplits = 1; 
			WRProductionSplits = 0; 
			runPassSplits = 0; 
		} /*else if (document.getElementById("production").checked) {
			WRProductionSplits = 1; 
			WRTargetSplits = 0; 
			runPassSplits = 0; 
		} // */

		if (document.getElementById("pre").checked) {
			Preseason = 1; 
		} 
		if (document.getElementById("reg").checked) {
			RegularSeason = 1; 
		} 
		if (document.getElementById("post").checked) {
			Postseason = 1; 
		}

		if (document.getElementById("withPens").checked) {
			withPens = 1; 
		} else {
			withPens = 0; 
		}

		if (Preseason==1 && Postseason==1 && RegularSeason==0) {
			alert("Although you have checked only Preseason and Postseason, the script will also parse your Regular season games. " +
				"If you do not want data from regular season games, go back (refresh this page) and select either Preseason or Postseason, but not both"); 
		}
		buildGameList(input); 
		startReadLog(); 
	}, true);                // "Start" button, runs script 
	newtd1.appendChild(newDiv2);
	newtr.appendChild(newtd1);

	var newtd2 = document.createElement('td');
	newtd2.setAttribute('colspan', '2');
	var newDiv3 = document.createElement('div');
	newDiv3.align = 'center';
	newDiv3.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Select all">'; 
	newDiv3.addEventListener('click', function() {
			var checkbox = getElementsByClassName('team_checkbox', document);  
			for (var i=0; i < checkbox.length; i++) checkbox[i].checked=true;   
	}, true);
	newtd2.appendChild(newDiv3);
	newtr.appendChild(newtd2);

	var newtd3 = document.createElement('td');
	newtd3.setAttribute('colspan', '2');
	var newDivA = document.createElement('div');
	newDivA.align = 'center';
	newDivA.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Clear all">'; 
	newDivA.addEventListener('click', function() {
		var checkbox = getElementsByClassName('team_checkbox', document);  
		for (var i=0; i < checkbox.length; i++) 
			checkbox[i].checked=false;   
	}, true);
	newtd3.appendChild(newDivA);
	newtr.appendChild(newtd3);


	if (target) target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(buttontable, 
																																target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);
}


window.setTimeout( function() {

		var input=document.body.innerHTML, ptr1, ptr2, ptr3, year, league;

		detailedPackageStats=new Array(7); // initialize stat array (1st down, 2nd & short, 2nd & medium, 2nd & long, 3rd/4th & short, 3rd/4th & medium, 3rd/4th & long) 

		for (var a=0; a<7; a++) { 
			var pkgs=new Array(8);  // initialize row of packages (HFT12, HFTt1, HTt12, HF123, HT123, H1234, T1234, 12345) 
			for (var b=0; b<8; b++) {
				var plays=new Array(2); // initialize row of play types (run/pass/unknown)
				for (var c=0; c<2; c++) {
					var stats=new Array(3); // initialize row of stats (plays, yards, successes) 
					for (var d=0; d<3; d++) {
						stats[d]=0;  // initialize each slot in the array (filled in the ParsePBP function) 

					}
					plays[c]=stats; 
				}
				pkgs[b]=plays; 
			}
			detailedPackageStats[a]=pkgs;  
		} 

		packageStats=new Array(7); // initialize stat array (1st down, 2nd & short, 2nd & medium, 2nd & long, 3rd/4th & short, 3rd/4th & medium, 3rd/4th & long) 

		for (var a=0; a<7; a++) { 
			var pkgs=new Array(8);  // initialize row of packages (HFT12, HFTt1, HTt12, HF123, HT123, H1234, T1234, 12345) 
			for (var b=0; b<8; b++) {
				var tmp=new Array(2); // initialize row of play types (run/pass/unknown)
					for (var c=0; c<2; c++) {
						tmp[c]=0;  // initialize each slot in the array (filled in the ParsePBP function)  
					}
					pkgs[b]=tmp; 
			}
			packageStats[a]=pkgs;  
		} 

		packageYards=new Array(7)

		for (var x=0; x<7; x++) { 
			var pkgs=new Array(8);  
			for (y=0; y<8; y++) {
				var tmp=new Array(2); 
					for (var z=0; z<2; z++) {
						tmp[z]=0;  
					}
					pkgs[y]=tmp; 
			}
			packageYards[x]=pkgs; 
		}

		sumPackageStats=new Array(8); 

		for (var b=0; b<8; b++) {
			var plays=new Array(2); 
			for (c=0; c<2; c++) {
				var stats=new Array(3); 
				for (d=0; d<3; d++) {
					stats[d]=0; 
				}
				plays[c]=stats; 
			}
			sumPackageStats[b]=plays; 
	}

	sumDownStats=new Array(7); 

		for (var a=0; a<7; a++) {
			var plays=new Array(2); 
			for (c=0; c<2; c++) {
				var stats=new Array(3); 
				for (d=0; d<3; d++) {
					stats[d]=0; 
				}
				plays[c]=stats; 
			}
			sumDownStats[a]=plays; 
	} // */

	WRSplitStats= new Array(8); 

	for (var a=0; a<8; a++) { // 8 packages 
		var DDs=new Array(7); 
		for (b=0; b<7; b++) { // 7 down and distance combos
			var WRs=new Array(9); 
			for (c=0; c<9; c++) { // 9 recievers 
				var stats=new Array(9); 
				for (d=0; d<9; d++) { // 9 stats (to date) - GCOVs, 1st opt passes, dump passes, drops, dist downfield, targets, yards, successes, INTs. 
					stats[d] = 0; 
				}
				WRs[c]=stats; 
			}
			DDs[b]=WRs; 
		}
		WRSplitStats[a]=DDs; 
	}

	/*rushGainSplits = new Array(21); 

	for (var a=0; a<21; a++) {
		rushGainSplits[a] = 0; 
	} // */
		

	ptr1=input.indexOf("imonyear", 0);
	ptr2=input.indexOf("value=\"", ptr1);
	ptr3=input.indexOf("\"", ptr2+7);
		if (ptr1<0 || ptr2<0 || ptr3<0) { 
			alert("Can't find year"); 
			return; 
		}
		/*if (ptr1<0 || ptr2<0 || ptr3<0) { 
			alert("Can't find year: ptr1 = " + ptr1 + ", ptr2 = " + ptr2 + ", ptr3 = " + ptr3 + ", first few characters: " + input.substring(0, ptr3+50)); 
			return;  
		} // */
	year=input.substring(ptr2+7, ptr3);

	ptr1=input.indexOf("imonlg", 0);
	ptr2=input.indexOf("value=\"", ptr1);
	ptr3=input.indexOf("\"", ptr2+7);
	if (ptr1<0 || ptr2<0 || ptr3<0) { 
		alert("Can't find league number"); 
		return; 
	}
	league=input.substring(ptr2+7, ptr3);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://deeproute.com/?sel=lgleaderbyteam&year=' + year + '&myleagueno=' + league + '&typer=X',
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			 'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(detail) {
				parseTeamStatsForAbbrs(detail.responseText);
		},
	});

	/*GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://deeproute.com/deeproute/?sel=leaguelook&year=' + year + '&myleagueno=' + league,
			headers: {
				 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				 'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(detail) {
					parseStanding(detail.responseText);
			},
		}); // */

}, 100);


