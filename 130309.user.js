// ==UserScript==
// @name           Virtual Manager Total Stats in Preview
// @namespace      kongregatehack.vman.preview
// @description    Shows each team's total stats under "Comparison" in a match preview.
// @include        *://www.virtualmanager.com/matches/*/preview*
// @include        *://virtualmanager.com/matches/*/preview*
// ==/UserScript==

var tbody = document.getElementById('home_result_action').parentNode.parentNode.parentNode;

var clubIDs = tbody.getElementsByTagName('a');
var clubLeftID = clubIDs[0].href.split("/");
clubLeftID = clubLeftID[clubLeftID.length - 1];
var clubRightID = clubIDs[1].href.split("/");
clubRightID = clubRightID[clubRightID.length - 1];

var tableRow = document.createElement('tr');
tableRow.setAttribute('style', 'font-size: 11px');

var left = document.createElement('td');
var showLeftBtn = document.createElement('a');
showLeftBtn.setAttribute('id', 'left_result_action');
showLeftBtn.setAttribute('onclick', '$("left_result_action").hide(); $("left_result").appear(); loadStats(' + clubLeftID + ', "left_result")');
showLeftBtn.setAttribute('href', '#');
showLeftBtn.innerHTML = 'Show';
var leftResult = document.createElement('div');
leftResult.setAttribute('id', 'left_result');
leftResult.setAttribute('style', 'display:none');
leftResult.innerHTML = 'Loading...';

left.appendChild(showLeftBtn);
left.appendChild(leftResult);


var middle = document.createElement('td');
middle.setAttribute('class', 'center');
middle.innerHTML = 'Stats';

var right = document.createElement('td');
right.setAttribute('class', 'right');
var showRightBtn = document.createElement('a');
showRightBtn.setAttribute('id', 'right_result_action');
showRightBtn.setAttribute('onclick', '$("right_result_action").hide(); $("right_result").appear(); loadStats(' + clubRightID + ', "right_result")');
showRightBtn.setAttribute('href', '#');
showRightBtn.innerHTML = 'Show';
var rightResult = document.createElement('div');
rightResult.setAttribute('id', 'right_result');
rightResult.setAttribute('style', 'display:none');
rightResult.innerHTML = 'Loading...';

right.appendChild(showRightBtn);
right.appendChild(rightResult);

tableRow.appendChild(left);
tableRow.appendChild(middle);
tableRow.appendChild(right);

tbody.appendChild(tableRow);

var playerNumbers = getPlayerNumbers();

function getPlayerNumbers(){
	var fields = document.getElementsByClassName('relative center');
	var playerLeft = [];
	var playerRight = [];
	
	for(var i = 0; i < fields[0].getElementsByTagName('span').length; i++){
		playerLeft.push(fields[0].getElementsByTagName('span')[i].innerHTML);
	}
	for(var i = 0; i < fields[1].getElementsByTagName('span').length; i++){
		playerRight.push(fields[1].getElementsByTagName('span')[i].innerHTML);
	}
	
	return [playerLeft, playerRight];
}

unsafeWindow.loadStats = function(clubID, elmID){
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = xmlhttp.responseText;
			var offset = data.indexOf('<td class="number">');
			
			var totalStats = 0;
			var playerNums = (elmID == 'left_result') ? playerNumbers[0] : playerNumbers[1];
			
			while(offset > 0){
				var num = parseInt(data.slice(offset + 38, offset + 40));
				if(isNaN(num)) num = parseInt(data.slice(offset + 38, offset + 39));
				var offset2 = data.indexOf('return false;"', offset);
				if(isNaN(num)) num = parseInt(data.slice(offset2 + 15, offset2 + 17));
				if(isNaN(num)) num = parseInt(data.slice(offset2 + 15, offset2 + 16));
				
				var isOnField = false;
				for(var i = 0; i < playerNums.length; i++){
					if(num == playerNums[i]){
						isOnField = true;
						break;
					}
				}
				
				if(isOnField){
					// Find total stats
					var offset3 = data.indexOf('<td class="ability">', offset);
					var playerStats = 0;
					
					for(var j = 0; j < 18; j++){
						var stats = parseInt(data.slice(offset3 + 20, offset3 + 23));
						if(isNaN(stats)) stats = parseInt(data.slice(offset3 + 20, offset3 + 22));
						if(isNaN(stats)) stats = parseInt(data.slice(offset3 + 20, offset3 + 21));
						
						if(!isNaN(stats)) playerStats += stats;
						offset3 = data.indexOf('<td class="ability">', offset3 + 1);
					}
					totalStats += playerStats;
				}
				
				offset = data.indexOf('<td class="number">', offset + 1);
			}
			
			document.getElementById(elmID).innerHTML = totalStats;
		}
	}
	
	xmlhttp.open('GET', 'http://www.virtualmanager.com/clubs/' + clubID + '/player_abilities', true);
	xmlhttp.send();
}