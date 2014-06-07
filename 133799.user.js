// ==UserScript==
// @name           PTP MaxDL 
// @description    Shows how much you can download before reaching your ratio.
// @namespace      http://www.tazzernator.com
// @version        0.1
// @include        http*://passthepopcorn.me/*
// @include        http*://*.passthepopcorn.me/*
// ==/UserScript==

//Find our data
var allStat = document.getElementsByClassName("stat");
var uploadHTML = allStat[0].innerHTML;
var downloadHTML = allStat[1].innerHTML;

var upload = 0;
var download = 0;

//Checking Units.
upload = (uploadHTML.indexOf("KiB") != -1) ? uploadHTML.replace(" KiB", "")/(1024*1024) : upload;
upload = (uploadHTML.indexOf("MiB") != -1) ? uploadHTML.replace(" MiB", "")/1024 : upload;
upload = (uploadHTML.indexOf("GiB") != -1) ? uploadHTML.replace(" GiB", "") : upload;
upload = (uploadHTML.indexOf("TiB") != -1) ? uploadHTML.replace(" TiB", "")*1024 : upload;

download = (downloadHTML.indexOf("KiB") != -1) ? downloadHTML.replace(" KiB", "")/(1024*1024) : download;
download = (downloadHTML.indexOf("MiB") != -1) ? downloadHTML.replace(" MiB", "")/1024 : download;
download = (downloadHTML.indexOf("GiB") != -1) ? downloadHTML.replace(" GiB", "") : download;
download = (downloadHTML.indexOf("TiB") != -1) ? downloadHTML.replace(" TiB", "")*1024 : download;

//Ratio Rules.
var limits = [0, 10, 20, 40, 60, 80, 100]
var ratios = [0.01, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6]

var count = limits.length;
var limitVar;
var limitFound = false;
var index = 0;
var maxDL = 0;

if(upload == 0){
	maxDL = limits[1];
}
//logic here works out if you'll go into the next bracket or not when you get the current recommended MaxDL and adjusts accordingly.
else if(download < limits[count - 1]){
	while(!limitFound){
		if(upload > limits[count - 1]){
			limitFound = true;
			var curRatio = ratios[count - 1];
			maxDL = upload / curRatio;
		}
		else if(limits[index] > upload){
			limitFound = true;
			var ratioWatch = false;
			var curRatio = ratios[index];
			var num = 1;
			while(!ratioWatch){
				maxDL = upload / curRatio;
				if((index + num) >= (count - 1)){
					ratioWatch = true;
				}
				else if(maxDL > limits[index + num]){
					curRatio = ratios[index + num];
					num++;
				}
				else{
					ratioWatch = true;
				}
			}
			
		}
		index++;
	}
}
else{
	maxDL = upload / ratios[count - 1];
}

var downloadDiff = maxDL - download;
downloadDiff = (downloadDiff < 0) ? 0 : Math.round(downloadDiff*100)/100;

//Colours
var colour = "#74C42E";
if(downloadDiff <= 0){
	colour = "#ff0000";
}
else if(downloadDiff < 10){
	colour = "#FF7100";
}

var stats = document.getElementById("userinfo_stats");
stats.innerHTML = stats.innerHTML + "<li id='stats_maxdl'><a title='The max you can download before you reach your ratio limit' href='#'>MaxDL</a>:<span style='color: " + colour + "' class='stats'> " + downloadDiff + " GiB</span></li>";