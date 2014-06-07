// ==UserScript==
// @name           Reddit highlight newest comments
// @description    Highlights new comments in a thread since your last visit 
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        /https?:\/\/(www\.)?reddit\.com\/r\/[a-zA-Z]+\/comments\/.*/
// @updateURL      https://userscripts.org/scripts/source/157032.meta.js
// @downloadURL    https://userscripts.org/scripts/source/157032.user.js
// @version        1.5
// ==/UserScript==

/*-----settings-----*/
highlightBGColorB = '7CB9F7'; //background color of a highlighted newest comment
highlightBGColorA = 'CEE3F7'; //background color of a highlighted older comment
highlightHalf = 2 //[hours]; when the algorithm should interpolate exactly 0.5 between A and B
highlightBGBorder = '1px solid #425466'; //border style of a highlighted new comment
expiration = 432000000; //expiraton time in millisesonds; default is 5 days (432000000ms)
highlihhtBetterChild = true; //highlight child comment if it has better karma than its parent
highlightNegative = true;
    betterChildStyle = '3px solid'; //border of said comment
    betterChildStyleGradientA = '99AAEE';
    betterChildStyleGradientB = 'F55220';
	betterChildStyleGradientC = 'ad3429';
timestampEnhancer = true; //enhance timestamps
    UTCDifference = 1; //your timezone UTC difference
    timeZoneDesc = "CET"; //your timezone descriptor
haveGold = false; //do you have a reddit gold?
/*-----settings-----*/

/*
Changelog:
1.4.2
-tweaked some colors and timing
1.4.1
-added highlighting comment with negative karma
-added color shading dependent on the new comment age
-added an option to manually edit the time of the last thread visit
1.3.1
-Added expiration for localstorage, defaulted to 14 days. It won't grow indefinately now.
-Reduced the amount of console.log clutter
*/


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function getThread() {
    console.log("Logging reddit comment highlight.");
    console.log("Fetching thread ID...");
    if (document.querySelector('[rel="shorturl"]') === null) {
        console.log("Not a comment thread. Aborting userscript...");
        return;
    }
	haveGold = hasClass(document.getElementsByTagName("body")[0], "gold");
	console.log("hasgold: " + haveGold);
	purgeOldStorage(expiration);
    var threadID = "redd_id_" + document.querySelector('[rel="shorturl"]').href.substr(-6);
    console.log("Thread id: " + threadID);
    var lastVisit = localStorage.getItem(threadID);
    if (lastVisit === null) {
        console.log("Thread has not been visited yet. Creating localStorage...");
        localStorage.setItem(threadID, Date.parse(Date()));
    }
	var postMenu;
	postMenu = document.getElementById("siteTable").getElementsByClassName("flat-list")[0];
	if (!haveGold) {
		/*var editTime = document.createElement("li");
		editTime.innerHTML = "<a>change highlight time</a>";
		editTime.onclick = function(){timeSetBack(threadID);}
		postMenu.appendChild(editTime);*/
		var timeDiff = Date.parse(Date()) - lastVisit;
		var goldBox = document.createElement("div");
			goldBox.className = "rounded gold-accent comment-visits-box";
		var goldBoxTitle = document.createElement("div");
			goldBoxTitle.className = "title";
		var goldBoxLabel = document.createElement("span");
			goldBoxLabel.innerHTML = "Highlight comments posted since previous visit [hh:mm] ago:";
		var goldBoxInput = document.createElement("input");
			goldBoxInput.type = "text";
			goldBoxInput.style.margin = "auto 5px";
			goldBoxInput.style.width = "64px";
			goldBoxInput.id = "timeInput"
			goldBoxInput.value = Math.floor(timeDiff/(1000*3600)) + ":" + Math.floor(60*(timeDiff/(1000*3600) - Math.floor(timeDiff/(1000*3600))));
		var goldBoxOK = document.createElement("input");
			goldBoxOK.type = "button";
			goldBoxOK.value = "OK";
			goldBoxOK.addEventListener("click", function(){timeSetBack(threadID, goldBoxInput);}, false)
			goldBox.appendChild(goldBoxTitle);
			goldBoxTitle.appendChild(goldBoxLabel);
			goldBoxTitle.appendChild(goldBoxInput);
			goldBoxTitle.appendChild(goldBoxOK);
		insertNodeAfter(goldBox, document.getElementsByClassName("usertext")[1]);
	}
	/*var reHigh = document.createElement("li");
	reHigh.innerHTML = "<a>reHigh</a>";
	reHigh.onclick = function(){highlightNew();}
	postMenu.appendChild(reHigh);*/
	
	commentReg = /^https?:\/\/(www\.)reddit\.com\/r\/[a-zA-Z]+\/comments\/[0-9a-z]+\/[0-9a-z_]+\/$/;
	isCommentPage = commentReg.test(document.URL);
    highlightComments(lastVisit, isCommentPage);
    //if (true) {
	
	
	console.log("Match for full comment page(" + document.URL + "): " + isCommentPage);
		console.log("Setting localStorage to now...");
		localStorage.setItem(threadID, Date.parse(Date()));
	//}
	
    if (timestampEnhancer == true) timestampScript();
    //highlightBetter();
}

function timeSetBack(threadID, textbox){
	//var timeBack = prompt("How many hours do you want to set the thread timestamp back?", "0");
	var timeBackArray = textbox.value.split(":")
	if (timebackArray.length > 1) {
		console.log("coo many colons");
		return
	}
	var timeBack = parseInt(timeBackArray[0], 10) + (parseInt(timeBackArray[1], 10)/60)
	if (timeBack != null && isNumber(timeBack) == true) {
		localStorage.setItem(threadID, Date.parse(Date())-timeBack*3600000);
		console.log("Setting localStorage " + threadID + " " + timeBack*3600000 + " ms back");
	}
}

function purgeOldStorage(difference) {
	var thisTime = Date.parse(Date());
	var total=0;
    for (var i=0;i<localStorage.length;i++) {
	    if (localStorage.key(i).substr(0,8)=="redd_id_" && parseInt(localStorage.getItem(localStorage.key(i)))+difference<thisTime) {
		    localStorage.removeItem(localStorage.key(i));
			total++;
			i=0;
		}
	}
	console.log(total + " localStorage older than " + difference + "ms has been removed");
}

function isProperThread() {
	return true;
}

function insertNodeAfter(node, sibling) {
	sibling.parentNode.insertBefore(node, sibling.nextSibling);
}

function highlightComments(lastVisit, isCommentPage) {
    console.log("Thread last visited in: " + lastVisit);
    comments = document.getElementsByClassName('comment');
    console.log("Comment count: " + comments.length);
	nowtime = Date.parse(Date());
	highlightHalf = Math.pow(0.5, (1/(-highlightHalf)));
    for(i=0; i<comments.length; i++) {
		if ((' ' + comments[i].className + ' ').indexOf(' deleted ') > -1) {continue;} //if the comment contains class 'deleted', skip this iteration
        var ctime = Date.parse(comments[i].childNodes[2].childNodes[0].getElementsByTagName('time')[0].getAttribute('title'));
        var scorechild = parseInt(comments[i].getAttribute('data-ups')) - parseInt(comments[i].getAttribute('data-downs'));
        var scoreparent = parseInt(comments[i].parentNode.parentNode.parentNode.getAttribute('data-ups')) - parseInt(comments[i].parentNode.parentNode.parentNode.getAttribute('data-downs'));
        if (parseInt(ctime) > parseInt(lastVisit) && (haveGold == false || isCommentPage == false)) {
            //console.log("Highlighting comment...");
			usertextBody = comments[i].getElementsByClassName("usertext-body");
			for (var j = 0; j < usertextBody.length; j++) {
				usertextBody[j].style.setProperty('background-color', interpolateColor(highlightBGColorA, highlightBGColorB, getGradient(nowtime-ctime)), '!important');
				usertextBody[j].style.setProperty('border',highlightBGBorder , '!important');
			}
        }
		
		
        if (scoreparent < scorechild && highlihhtBetterChild == true) {
            //console.log("Highlighting better comment " + i + "...");
            //console.log(betterChildStyle + " " + getGradient(scoreparent, scorechild));
            //comments[i].style.setProperty('border',betterChildStyle + " " + getGradient(scoreparent, scorechild), 'important');
            comments[i].style.setProperty('border-left',betterChildStyle + " #" + betterChildStyleGradientA, 'important');
        }
		if (scorechild < 0 && highlightNegative == true) {
            //console.log("Highlighting better comment " + i + "...");
            //console.log(betterChildStyle + " " + getGradient(scoreparent, scorechild));
            //comments[i].style.setProperty('border',betterChildStyle + " " + getGradient(scoreparent, scorechild), 'important');
            comments[i].style.setProperty('border-left','1px solid #' + betterChildStyleGradientC, 'important');
        }
    }
	if (haveGold == true && isCommentPage == true) {highlightNew();}
	var goldSelect = document.getElementById("comment-visits");
	goldSelect.addEventListener("change", function(){console.log("changed highlighting");highlightNew();;}, false);
	window.addEventListener("load", function(){console.log("window loaded, highlighting");highlightNew();;}, false)
}

function highlightNew(){
	//console.log("has gold, highligting new...");
	comments = document.getElementsByClassName("new-comment");
	console.log("gold " + comments.length + " new comments");
	nowtime = Date.parse(Date());
	highlightHalf = Math.pow(0.5, (1/(-highlightHalf)));
	for(i=0; i<comments.length; i++) {
		var titleDate;
		titleDate = comments[i].childNodes[2].childNodes[0].getElementsByTagName('time')[0].getAttribute('datetime')
		//console.log(titleDate);
		var ctime = Date.parse(titleDate); //current break???WTF
		//console.log("Highlighting comment..." + ctime);
		usertextBody = comments[i].getElementsByClassName("usertext-body")[0];
		//for (var j = 0; j < usertextBody.length; j++) {
			//console.log(usertextBody.length);
			console.log("comment(" + i + "," + 0 + "): gradient(" + nowtime + "," + ctime + ") = " + getGradient(nowtime-ctime));
			usertextBody.style.backgroundColor = interpolateColor(highlightBGColorA, highlightBGColorB, getGradient(nowtime-ctime));
			usertextBody.style.sborder = highlightBGBorder;
			//usertextBody.style.color = "#FF0000";
		//}
	}
}

function finalBGColor(ctime) {
	nowtime = Date.parse(Date());
	
}

function getGradient(time) {
	return Math.pow(highlightHalf, -(time/3600000));
}

function interpolateColor(minColor,maxColor,depth){
    function d2h(d) {return d.toString(16);}
    function h2d(h) {return parseInt(h,16);}
    if(depth == 0){
        return minColor;
    }
    if(depth == 1){
        return maxColor;
    }
    var color = "#";
        for(var i=0; i < 6; i+=2){
        var minVal = new Number(h2d(minColor.substr(i,2)));
        var maxVal = new Number(h2d(maxColor.substr(i,2)));
        var nVal = minVal + (maxVal-minVal) * depth;
        var val = d2h(Math.floor(nVal));
        while(val.length < 2){
            val = "0"+val;
        }
        color += val;
    }
    return color;
}

function timestampScript() {
    console.log("Timestamp script starting...");
    var timestamp = document.getElementsByTagName('time');
    console.log("Number of timestamp tags: " + timestamp.length);
    for (i=0; i<timestamp.length; i++) {
        timestamp[i].innerHTML = "<span class='timestamp_hover'>" + dateDifference(Date.parse(timestamp[i].getAttribute('datetime'))) + "</span><span class='timestamp_nohover'>" + timestamp[i].innerHTML + "</span>";
        timestamp[i].setAttribute("title",formatDate(Date.parse(timestamp[i].getAttribute('datetime'))));
    }
    addCss("\ntime span.timestamp_nohover\n{\ndisplay:inline;\n}\ntime:hover span.timestamp_nohover\n{\ndisplay:none;\n}\ntime span.timestamp_hover\n{\ndisplay:none;\n}\ntime:hover span.timestamp_hover\n{\ndisplay:inline;\n}\n");
}
function formatDate(unixtime) {
    var t = new Date(unixtime);
    //return t.toString();
    return t.getDate() + "." + (t.getMonth()+1) + "." + t.getFullYear() + " " + (t.getUTCHours()+UTCDifference) + ":" + pad2(t.getMinutes()) + ":" + pad2(t.getSeconds()) + " " + timeZoneDesc;
}
function dateDifference(unixtime) {
    var diff = new Date();
    var unixtime2 = new Date(unixtime);
    
    //var date1 = new Date(),
    //date2 = new Date(1981, 11, 18);
    //order = (date2.getTime() - date1.getTime()) < 0 ? -1 : 1; // work out which is the later date
    var secDiff = (diff.getSeconds() - unixtime2.getSeconds());
    var minDiff = (diff.getMinutes() - unixtime2.getMinutes());
    var hourDiff = (diff.getHours() - unixtime2.getHours());
    var dayDiff = (diff.getDate() - unixtime2.getDate());
    var monthDiff = (diff.getMonth() - unixtime2.getMonth());
    var yearDiff = (diff.getFullYear() - unixtime2.getFullYear());
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (secDiff < 0) {
        minDiff--;
        secDiff += 60;
    }
    if (minDiff < 0) {
        hourDiff--;
        minDiff += 60;
    }
    if (hourDiff < 0) {
        dayDiff--;
        hourDiff += 24;
    }
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff += months[diff.getMonth()-2]; // -2 as the months array is zero-indexed too
    }
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    //console.log(yearDiff+' years, '+monthDiff+' months, '+dayDiff+' days');
    return (yearDiff == 0 ? "" : yearDiff + " years ") + (monthDiff == 0 ? "" : monthDiff + " months ") + (dayDiff == 0 ? "" : dayDiff + " days ") + (hourDiff == 0 ? "" : hourDiff + " hours ") + (minDiff == 0 ? "" : minDiff + " minutes ") + (secDiff == 0 ? "" : secDiff + " seconds");
    //return yearDiff + " years " + monthDiff + " months " + dayDiff + " days " + hourDiff + " hours " + minDiff + " minutes " + secDiff + " seconds";
}
function addCss(cssCode) {
//thanks for the function from this blog http://www.tomhoppe.com/index.php/2008/03/dynamically-adding-css-through-javascript/
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}
function pad2(number) {
     return (number < 10 ? '0' : '') + number
}
getThread();