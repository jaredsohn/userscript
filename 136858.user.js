// ==UserScript==
// @name           HT PlayerStats Fix
// @namespace      HT
// @author           LA-MJ
// @description   Fixes the match grouping in accordance with training week
// @include        http://*.hattrick.org/Club/Players/PlayerStats.aspx*
// ==/UserScript==

var matches = document.querySelectorAll('img.matchFriendly,img.matchCup,img.matchMasters'); 
//a slight problem with Masters on Thursday as it happens between training updates in different countries
//while this code fixes it in a 'before training' position

for(var i=0, badmatch, badrow;badmatch=matches[i];++i){
	if(badmatch.parentNode.style.backgroundColor) continue; //NT friendlies should be skipped
	badrow = badmatch.parentNode.parentNode.parentNode;
	badrow.className = (badrow.className.search('odd')!=-1) ? badrow.className.replace('odd','darkereven') : badrow.className.replace('darkereven','odd'); 
	//using replace instead of direct asignment in case of multiple class names
}


//NT matches on Monday require a more sophisticated fix for both tables

var rows = document.querySelectorAll('#matches > tbody > tr'); 
//tbody is a must when thead is used. Otherwise, first row from tbody is lost (querySelector bug?)

for(var i=0, row;row=rows[i];++i){
	if(row.querySelector("span[style] > img.matchLeague")){ //this is NT match!
		var matchDay = row.querySelector('td:nth-child(2)').innerHTML.split(' ')[0]; //circumvents FT's season/week module
		if(new Date(matchDay).getDay()==1){ //on Monday
			var statsrow = document.querySelector('#stats > tbody > tr:nth-child('+(i+1)+')'); //nth-child starts @ 1
			row.className = (row.className.search('odd')!=-1) ? row.className.replace('odd','darkereven') : row.className.replace('darkereven','odd');
			statsrow.className = (statsrow.className.search('odd')!=-1) ? statsrow.className.replace('odd','darkereven') : statsrow.className.replace('darkereven','odd');
			//using replace instead of direct asignment in case of multiple class names
		}
	}
}
