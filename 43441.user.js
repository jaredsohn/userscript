// ==UserScript==
// @name           Flixter | Movie list resize
// @namespace      ronaldtroyer.com
// @version        1.2
// @include        http://*flixster.com/*movie-list/*
// @exclude        http://*flixster.com/*movie-list/custom-list/create*
// @exclude        http://*flixster.com/*movie-list/*/update

// ==/UserScript==

/*****************************************DISPLAY INFO************************************************/

document.getElementById('sideColumn').style.display = 'none';

main = document.getElementById('mainColumn');

main.childNodes[1].style.marginLeft	= '-310px';
main.childNodes[1].style.width 		= '800px';

scoreTotal	= 0;
beenRated	= document.getElementsByClassName('ratingStars');
for (i=0; i<beenRated.length; i++) {
	beenRated[i].parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#BBFFAA';
	beenRated[i].parentNode.parentNode.parentNode.parentNode.style.height = '125px';
	beenRated[i].parentNode.parentNode.parentNode.parentNode.childNodes[5].style.width = '400px';
	
	myRating 	= beenRated[i].className.match(/[\d]+/gi)[0];
	scoreTotal += myRating/beenRated.length;
	
	beenRated[i].parentNode.parentNode.parentNode.id = 'd_' + myRating;
}
scoreTotal = Math.round(scoreTotal*10)/100;

pendingRatings = document.getElementsByClassName('wtsOn');
for (i=0; i<pendingRatings.length; i++) {
	pendingRatings[i].parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#FFFFAA';
	pendingRatings[i].parentNode.parentNode.parentNode.parentNode.style.height = '125px';
	pendingRatings[i].parentNode.parentNode.parentNode.parentNode.childNodes[5].style.width = '400px';
	
	pendingRatings[i].parentNode.parentNode.parentNode.id = 'c_pendingRating';
}

pendingDownload = document.getElementsByClassName('rateBtn');
for (i=0; i<pendingDownload.length; i++) {
	pendingDownload[i].parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#FFDDCC';
	pendingDownload[i].parentNode.parentNode.parentNode.parentNode.style.height = '125px';
	pendingDownload[i].parentNode.parentNode.parentNode.parentNode.childNodes[5].style.width = '400px';
	
	pendingDownload[i].parentNode.parentNode.parentNode.id = 'b_pendingDownload';
}

notWatching = document.getElementsByClassName('niOn');
notWatchingString = '';
for (i=0; i<notWatching.length; i++) {
	notWatching[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
	notWatching[i].parentNode.parentNode.parentNode.id = 'a_notwatching';
	tempString = notWatching[i].parentNode.parentNode.innerHTML.match(/"movieTitle" value=".*?"/i)[0].substring(20);
	notWatchingString += tempString;
}
notWatchingString = notWatchingString.replace(/"/g, '; ');
notWatchingString = notWatchingString.replace(/'/g, '');

search = document.getElementsByClassName('number');
for (i=0; i<search.length; i++) {
	search[i].style.paddingRight = '4px';
}

search = document.getElementsByClassName('mpaa');
for (i=0; i<search.length; i++) {
	search[i].style.color = '#333';
	string = search[i].innerHTML;
	
	if (search[i].innerHTML.substring(0,1) != '(') {string = '(' + string;}
	//if (search[i].innerHTML.substring(search[i].innerHTML.length-2,1) != ')') {string += ')';}
	search[i].innerHTML = string;
}

today = new Date();
beginYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
endYear = new Date(today.getFullYear()+1, 0, 1, 0, 0, 0, 0);

totalToWatch = beenRated.length+pendingRatings.length+pendingDownload.length;
moviePercent = (((beenRated.length/totalToWatch)*100).toFixed(1));

myString  = '<br/><br/><table cellspacing="0" cellpadding="5" style="display: inline-block; margin-left: 50px;">';
myString += '<tr style="background-color: #BBFFAA"><td align="right">Average Rating:</td>';
myString += '<td><small>' + scoreTotal + '</small></td></tr>';
myString += '<tr style="background-color: #BBFFAA"><td align="right">Movies watched:</td>';
myString += '<td>' + beenRated.length + '</td></tr>';
myString += '<tr style="background-color: #FFFFAA"><td align="right">Movies to be rated:</td>';
myString += '<td>' + pendingRatings.length + '</td></tr>';
myString += '<tr style="background-color: #FFDDCC"><td align="right">Movies to obtain:</td>';
myString += '<td>' + pendingDownload.length + '</td></tr>';
myString += '<tr style="color: #BB7777"><td align="right">Will not be watched:</td>';
myString += '<td><a href="javascript: alert(\'' + notWatchingString + '\');">' + notWatching.length + '</a></td></tr>';
myString += '</table>';

myString += '<table style="display: inline-block; margin-left: 25px;"><tr><td><small>';
myString += moviePercent + '% through ';

if (listYear = document.title.match(/[\d]{4}/)) {
	listYear = parseFloat(listYear[0]);
	
	beginString  = beginYear.getTime();
	todayString  = today.getTime();
	todayString -= beginString;
	
	nextString = endYear.getTime() - beginYear.getTime();
	
	yearPercent = ((todayString/nextString)*100).toFixed(1);
	myString += listYear + ' movies<br/>';
	if (listYear == today.getFullYear()-1) {
		projected = (Math.ceil((todayString/nextString)*totalToWatch));
		myString += yearPercent + '% through '+ today.getFullYear() + '</small><br/>';
		myString += '<br/><span style="font-size: .8em;"><table cellspacing=0 cellpadding=1>';
		myString += '<tr><td>Current:</td><td>' + beenRated.length + '/' + totalToWatch + '</td></tr>';
		myString += '<tr><td>Projected:</td><td>' + projected + '/' + totalToWatch + '</td></tr>';
		
		myString += '<tr><td colspan="2"><br/></td></tr>';
		
		ratePercent = beenRated.length/totalToWatch;
		tempTime = Math.round(ratePercent*nextString);
		tempTime += beginString;
		tempDate = new Date();
		tempDate.setTime(tempTime);
		
		datestring = (tempDate.getMonth()+1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
		day  = tempDate.getDay();
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		day  = days[day];
		if (tempDate.getHours() >= 12) {a_p = ' PM';} else {a_p = ' AM';}
		hou = tempDate.getHours();		if (hou > 12) {hou -= 12; if (hou == 0) {hou = 12}}
		min = tempDate.getMinutes();	if (min < 10) {min = '0' + min;}
		dateTime = day + ' ' + datestring + ' ' + hou + ':' + min + a_p;

		
		myString += '<tr><td colspan="2">';
		if (beenRated.length >= projected) {
			myString += 'Current until: ';
		} else {
			myString += 'Overdue since: ';			
		}
		myString += '<span title="' + dateTime + '">' + datestring + '</span></td></tr>';
		
		if (beenRated.length < projected) {
			ratePercent = projected/totalToWatch;
			tempTime = Math.round(ratePercent*nextString);
			tempTime += beginString;
			tempDate = new Date();
			tempDate.setTime(tempTime);
			
			datestring = (tempDate.getMonth()+1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
			day  = tempDate.getDay();
			days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			day  = days[day];
			if (tempDate.getHours() >= 12) {a_p = ' PM';} else {a_p = ' AM';}
			hou = tempDate.getHours();		if (hou > 12) {hou -= 12; if (hou == 0) {hou = 12}}
			min = tempDate.getMinutes();	if (min < 10) {min = '0' + min;}
			dateTime = day + ' ' + datestring + ' ' + hou + ':' + min + a_p;
			
			myString += '<tr><td colspan="2">Movie ' + projected + ' due: ';
			myString += '<span title="' + dateTime + '">' + datestring + '</span></td></tr>';
		}
		
		myString += '</table></span>';
	} else {
		myString += '</small>';
	}
} else {
	myString += 'movies</small>';
}
myString  += '</small></td></tr></table><br/><br/>';

if(document.getElementById('ratingWidget')) {
	document.getElementById('ratingWidget').innerHTML += myString;
} else {
	document.getElementById('listInfo').innerHTML += myString;
}

/****************************************Change Links********************************************/

links = document.getElementsByTagName('h6');
for (i=0; i<links.length; i++) {
	myString  = '<a href="http://thepiratebay.org/search/' + links[i].childNodes[1].innerHTML + '"><img style="margin-left: 5px;" src="http://thepiratebay.com/favicon.ico"></a>';
	myString += '<a href="http://isohunt.com/torrents/?ihq=' + links[i].childNodes[1].innerHTML + '"><img style="margin-left: 5px;" src="http://isohunt.com/favicon.ico"></a>';
	myString += '<a href="http://www.demonoid.com/files/?query=' + links[i].childNodes[1].innerHTML + '"><img style="margin-left: 5px;" src="http://demonoid.com/favicon.ico"></a>';
	
	mylink = links[i];
	
	links[i].parentNode.childNodes[3].innerHTML += myString;
}

/****************************************Sort Headers***************************************/
myTable = document.getElementById('listTable');

for (i=0; i<myTable.childNodes.length; i++) {
	if (myTable.childNodes[i].tagName == 'TBODY') {
		myTable = myTable.childNodes[i];
		break;
	}
}

var myHeading = document.createElement('tr');
myTable.insertBefore(myHeading,myTable.childNodes[0]);
myHeading.innerHTML = '<th></th><th style="text-align: center"><a id="sortPos" href="javascript:">Pos</a></th><th>Name</th><th style="text-align: center"><a id="sortRate" href="javascript:">Rating</a></th>';

document.getElementById('sortRate').addEventListener('click',function () {
	myRatings = document.getElementsByClassName('ratingColumn');
	//We're skipping the first one
	for (i=1; i<myRatings.length; i++) {
		mySwap = -1;
		for (compareI = i-1; compareI>-1; compareI--) {
			if (myRatings[i].id > myRatings[compareI].id) {
				mySwap = compareI;
			} else {
				break;
			}
		}
		if (mySwap != -1) {
			//Take note!!! 
			//After the insert the numbers (i) will be all be reorganized to fit
			myRatings[mySwap].parentNode.parentNode.insertBefore(myRatings[i].parentNode,myRatings[mySwap].parentNode);
		}
	}
}, false);

document.getElementById('sortPos').addEventListener('click',function () {
	myPositions = document.getElementsByClassName('number');
	for (i=1; i<myPositions.length; i++) {
		mySwap = -1;
		for (compareI = i-1; compareI>-1; compareI--) {
			if (parseFloat(myPositions[i].innerHTML) < parseFloat(myPositions[compareI].innerHTML)) {
				mySwap = compareI;
			} else {
				break;
			}
		}
		if (mySwap != -1) {
			//Take note!!! 
			//After the insert the numbers (i) will be all be reorganized to fit
			myPositions[mySwap].parentNode.parentNode.insertBefore(myPositions[i].parentNode,myPositions[mySwap].parentNode);
		}
	}
}, false);

/***********************Display other lists by user*******************/

if ((myLists = document.getElementById('userCreatedLists')) && (myInsert = document.getElementById('listInfo'))) {
	myInsert.innerHTML = myInsert.innerHTML.replace(/\<.{0,1}?p\>/gi, '');
	myURL = myInsert.innerHTML.match(/href=".*?user.*?"/gi);
	if (myURL) myURL=myURL[0].replace(/(href=|"|user\/|\/)/gi,'');
	
	myLinks = myLists.getElementsByTagName('a');
	for(i=0;i<myLinks.length;i++) {
		myLinks[i].href = myLinks[i].href.replace(/(\s| |%20|%0A)/g, '');
	}
	
	myLists.innerHTML += '<br/><a style="margin-top: 5px;" href="../user/'+myURL+'/movie-list">&bull; View All Lists by this user</a>';
	
	myInsert.insertBefore(myLists,myInsert.childNodes[myInsert.childNodes.length]);
}