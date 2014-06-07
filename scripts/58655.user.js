// ==UserScript==
// @name           DoyleWheatFromChaff
// @namespace      http://doyle.net/
// @description    Shows which teams count
// @include        http://tffo.telegraph.co.uk/league/list*
// @include        http://tffo.telegraph.co.uk/leaderboards*
// @include        http://footballpools.tffo.telegraph.co.uk/mini-league*
// ==/UserScript==

var inactive, allRows, thisRow, allCells, thisCell;
allRows = document.evaluate(
    "//tr",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allRows.snapshotLength; i++) {
	inactive=false;
    thisRow = allRows.snapshotItem(i);
	if(thisRow.innerHTML.match('Hemingway')) {
		inactive=true;
    }else if(thisRow.innerHTML.match('Diana')) {
		inactive=true;
    }else if(thisRow.innerHTML.match('stars 3')) {
		inactive=true;
    }else if(thisRow.innerHTML.match('stars 4')) {
		inactive=true;
    }else if(thisRow.innerHTML.match('stars 5')) {
		inactive=true;
    }else if(thisRow.innerHTML.match('stars 8')) {
		inactive=true;
    }
    if (inactive==true){
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 255);" class');
    }else if(thisRow.innerHTML.match('ZOD')) {
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 204, 204);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 153, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 204, 204);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 238, 238);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 238, 238);" class');
	}else if(thisRow.innerHTML.match('Terry')) {
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(204, 255, 204);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(153, 255, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(204, 255, 204);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(238, 255, 238);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(238, 255, 238);" class');

	}else if(thisRow.innerHTML.match('Terence')) {
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(204, 204, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(153, 153, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(204, 204, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(238, 238, 255);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(238, 238, 255);" class');
	}else if(thisRow.innerHTML.match('Pete')) {
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 102);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 204);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 255, 204);" class');
	}else{
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 221, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 187, 117);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 221, 153);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 245, 225);" class');
        thisRow.innerHTML=thisRow.innerHTML.replace('td class', 'td style="background-color: rgb(255, 245, 225);" class');
	}

    if(thisRow.innerHTML.match('ZOD')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('>Mr Stuart Doyle', '>Zoe');
	}else if(thisRow.innerHTML.match('Terry')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('>Mr Terry Doyle', '>Terry');
	}else if(thisRow.innerHTML.match('Terence')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('>Mr Terence Doyle', '>Steve');
	}else if(thisRow.innerHTML.match('Pete')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('>Mr Peter Doyle', '>Pete');
	}else{
		thisRow.innerHTML=thisRow.innerHTML.replace('>Mr Stuart Doyle', '>Stu');
	}
	
}


allRows = document.evaluate(
    "//tr",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allRows.snapshotLength; i++) { 
	thisRow = allRows.snapshotItem(i);
    if(thisRow.innerHTML.match('ZOD')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 117, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 117, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('>Stuart Doyle', '>Zoe');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 117, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 117, 187);">');
	}else if(thisRow.innerHTML.match('Terry Doyle')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(117, 255, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(117, 255, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('>Terry Doyle', '>Terry');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(117, 255, 187);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(117, 255, 187);">');
	}else if(thisRow.innerHTML.match('Terence Doyle')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 117, 255);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 117, 255);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('>Terence Doyle', '>Steve');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 117, 255);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 117, 255);">');
	}else if(thisRow.innerHTML.match('Peter Doyle')) {
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('>Peter Doyle', '>Pete');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(187, 255, 117);">');

	}else if(thisRow.innerHTML.match('Stuart Doyle')){
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 187, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 187, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('>Stuart Doyle', '>Stu');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 187, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 187, 117);">');
	}else if(thisRow.innerHTML.match('Mr Doyle')){
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 255, 117);">');
		thisRow.innerHTML=thisRow.innerHTML.replace('<td>', '<td style="background-color: rgb(255, 255, 117);">');
	}

	
}

