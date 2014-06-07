// ==UserScript==
// @name           Timetable jumpTo
// @description    Automatically jump to current date on timetable/link to current date in upper right corner
// @author         nisi
// @version        2011-01-10
// @namespace      http://userscripts.org/users/nisi
// @include        http://timetable.fhv.at/data/tt?*
// ==/UserScript==

Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function startUp() {
	var nowDate = new Date();
	var nowWeek = nowDate.getWeek();
  if(nowWeek > 8 && nowWeek <= 34) {
    nowWeek = nowWeek - 9;
  } else {
  	nowWeek = (nowWeek + 18) % 52;
  }
	jumpTo(nowWeek);
	location.hash = 'w' + nowWeek;
}

function jumpTo(weekNumber) {
	var jumpToDiv = document.createElement("div");
	jumpToDiv.style.position = "fixed";
	jumpToDiv.style.top = "0px";
	jumpToDiv.style.right = "0px";
	jumpToDiv.style.padding = "2px";
	jumpToDiv.style.paddingTop = "0px";
	jumpToDiv.style.backgroundColor = "#DDDDDD";
	jumpToDiv.style.width = "20px";
	jumpToDiv.style.textAlign = "right";
  
  var jumpToA = document.createElement('a');
	jumpToA.href = '#w' + weekNumber;
  jumpToA.innerHTML = "curr";
	
	jumpToDiv.appendChild(jumpToA);
	document.body.appendChild(jumpToDiv);
}

startUp();