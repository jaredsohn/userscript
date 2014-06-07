// ==UserScript==
// @name           FA Gallery Statistics
// @namespace      http://www.hexblue.net/
// @include        http://furaffinity.net/*
// @include        http://www.furaffinity.net/*
// ==/UserScript==

var url = window.location.href;

var url0 = '/user/'+url.substring(32);
var xmlhttp0=new XMLHttpRequest();

var maxSubmissions = 50;
var pagesRequested = 0;
var pagesReturned = 0;
var resultsData = new Array();
var xmlhttpArray = new Array();
var submissionsPerPage = 36;
var pageData0;
var start;
var end;
var percentDone;

var table7 = document.getElementsByTagName('table')[7];
var newDiv = document.createElement("div");
newDiv.id="newDiv";
table7.parentNode.insertBefore(newDiv, table7);
var newDivRef = document.getElementById("newDiv");

var startButton = document.createElement("input");
startButton.type = "button";
startButton.value = "Run Statistical Analysis";
//startButton.onClick = "getData();";
newDivRef.appendChild(startButton);

startButton.addEventListener('click', clickHandler, true);

function clickHandler(event) {
	getData();
}


function getData(){
	newDivRef.removeChild(startButton);
	
	xmlhttp0.open('GET', url0, false);
	xmlhttp0.send(null);
	pageData0 = xmlhttp0.responseText;
	
	
	start = pageData0.indexOf("Submissions:</b>")+16;
	end = start+ (pageData0.substring(start)).indexOf("<br/>");
	totalSubmissions = parseInt(trim(pageData0.substring(start, end)));
	
	
	percentDone = document.createTextNode("0%");
	newDiv.appendChild(percentDone);
	
	
	
	
	for(var page=1; page<Math.ceil(totalSubmissions/submissionsPerPage)+1; page++){
		if(pagesRequested < maxSubmissions+10){
			var xmlhttp=new XMLHttpRequest();
			var galleryUrl = '/gallery/'+url.substring(32)+"/"+page+"/";
			xmlhttp.open('GET', galleryUrl, false);
			/*xmlhttp.onreadystatechange=function() {
			 if (xmlhttp.readyState==4) {
			 }
			 };*/
			xmlhttp.send(null);
			var pageData = xmlhttp.responseText;
			//var xmlhttp2=new Array();
			//alert("test");
			for(var i=0; i<submissionsPerPage; i++){
				
				var subStart = pageData.indexOf("<!-- {submission} -->");
				var subEnd = pageData.indexOf("<!-- {/submission} -->");
				var subText = pageData.substring(subStart, subEnd);
				var urlStart = subText.indexOf("href=\"")+6;
				var urlEnd = subText.indexOf("\"><img");
				var urlText = subText.substring(urlStart, urlEnd);
				//alert(urlText);
				//alert(subText);
				
				pageData = pageData.substring(subEnd+1);
				
				if(subStart<subEnd && urlStart<urlEnd && pagesRequested < maxSubmissions+10){
					resultsData[pagesRequested] = new Array();
					resultsData[pagesRequested][0] = urlText;
					pagesRequested++;
				}
				
			}
		}
	}
	//alert("urlIterator(0)");
	urlIterator(0);
}

function urlIterator(index){
	if(index < maxSubmissions){
		//alert("urlIterator("+index+") start");
		xmlhttpArray[index]=new XMLHttpRequest();
		
		//alert(urlText);
		xmlhttpArray[index].open('GET', resultsData[index][0], false);
		//if(i==0) alert("test2_0");
		//xmlhttpArray[index].onreadystatechange = new function(){checkHttpState(index);};
		xmlhttpArray[index].send(null);
		checkHttpState(index);
		//alert("urlIterator("+index+") end");
	}
}

function checkHttpState(index){
	//alert("checkHttpState("+xmlhttpArray[index]+", "+index+")");
	//alert("xmlhttpArray["+index+"].readyState = "+xmlhttpArray[index].readyState+")");
	if (xmlhttpArray[index].readyState==4) {
		
		var pageData2 = xmlhttpArray[index].responseText;
		var start;
		var end;
		
		
		//alert("test2");
		
		pageData2 = pageData2.substring(pageData2.indexOf("Favorites:</b>"));
		start = 10;
		end = smartMin(pageData2.indexOf("<br/>"), pageData2.indexOf("<br />"));
		var favs = pageData2.substring(start, end);
		if(pageData2.indexOf("/\">")<pageData2.indexOf("Comments:</b>")){
			start = pageData2.indexOf("/\">")+3;
			end = pageData2.indexOf("</a>");
			favs = pageData2.substring(start, end);
		}else{
			start = pageData2.indexOf("</b>")+4;
			end = pageData2.indexOf("<br/>");
			favs = pageData2.substring(start, end);
		}
		favs = trim(favs);
		
		pageData2 = pageData2.substring(pageData2.indexOf("Comments:</b>"));
		start = 13;
		end = smartMin(pageData2.indexOf("<br/>"), pageData2.indexOf("<br />"));
		var comments = trim(pageData2.substring(start, end));
		
		pageData2 = pageData2.substring(pageData2.indexOf("Views:</b>"));
		start = 10;
		end = smartMin(pageData2.indexOf("<br/>"), pageData2.indexOf("<br />"));
		var views = trim(pageData2.substring(start, end));
		
		resultsData[index][1] = parseInt(favs);
		resultsData[index][2] = parseInt(comments);
		resultsData[index][3] = parseInt(views);
		
		pagesReturned++;
		
		displayResults(index);
		
		if(pagesReturned<pagesRequested && pagesReturned<maxSubmissions){
			urlIterator(index+1);
		}else{
			displayFinalResults();
		}
	}
}

function displayResults(index){
	resultsData[index][4] = (resultsData[index][1]+resultsData[index][2])/resultsData[index][3];
	resultsData[index][4] = roundToDecimal(resultsData[index][4], 4);
	/*
	var docString = index + ": (" + resultsData[index][1] + "+" + resultsData[index][2] + ") / " + resultsData[index][3] + " = " + resultsData[index][4];
	var newText = document.createTextNode(docString);
	newDiv.appendChild(newText);
	newDiv.appendChild(document.createElement("br"));
	 */
	var newPercent = document.createTextNode("Gathering submission data: (" + index + "/" + Math.min(maxSubmissions, totalSubmissions) + ") = " + roundToDecimal(100.0*index/Math.min(maxSubmissions, totalSubmissions), 2)+"%");
	newDivRef.replaceChild(newPercent, percentDone);
	percentDone = newPercent;
}

function displayFinalResults(){
	var stats = document.createElement("div");
	stats.id = "stats";
	var tempContainer;
	
	var meanRatio = 0;
	var maxFavs = 0;
	var maxComments = 0;
	var maxViews = 0;
	var maxRatio = 0;
	for(var i=0; i<pagesReturned-1; i++){
		meanRatio += resultsData[i][4];
		maxFavs			= Math.max(maxFavs,		resultsData[i][1]);
		maxComments		= Math.max(maxComments,	resultsData[i][2]);
		maxViews		= Math.max(maxViews,	resultsData[i][3]);
		maxRatio		= Math.max(maxRatio,	(resultsData[i][1]+resultsData[i][2])/resultsData[i][3]);
	}
	
	meanRatio /= (pagesReturned-1);
	meanRatio = roundToDecimal(meanRatio, 2);
	var meanRatioText = "Mean Ratio: " + meanRatio;
	tempContainer = document.createTextNode(meanRatioText);
	stats.appendChild(tempContainer);
	
	var standardDeviation = 0;
	for(var i=0; i<pagesReturned-1; i++){
		standardDeviation += Math.pow(resultsData[i][4] - meanRatio, 2);
	}
	
	standardDeviation /= pagesReturned-1;
	standardDeviation = Math.sqrt(standardDeviation);
	standardDeviation = roundToDecimal(standardDeviation, 2);
	var standardDeviationText = "Standard Deviation: "+standardDeviation;
	tempContainer = document.createTextNode(standardDeviationText);
	stats.appendChild(tempContainer);
	
	var maxPopIndex = 0;
	var subIsNotable = new Array();
	var subIsNotable_notes = new Array();
	for(var i=0; i<pagesReturned-1; i++){
		subIsNotable[i] = false;
		subIsNotable_notes[i] = "";
		resultsData[i][5] = 1.0*resultsData[i][1]/maxFavs + 1.0*resultsData[i][2]/maxComments + 1.0*resultsData[i][3]/maxViews;
		resultsData[i][5] = roundToDecimal(resultsData[i][5] / 3.0, 4);
		maxPopIndex = Math.max(maxPopIndex, resultsData[i][5]);
	}
	
	/*var orderedArray = new Array();
	for(var i=0; i<pagesReturned-1; i++){
		orderedArray[i] = i;
	}
	
	for(var i=0; i<pagesReturned-2; i++){
		for(var j=0; j<i; j++){
			if(resultsData[orderedArray[j]][4] > resultsData[orderedArray[j+1]][4]){
				var tempVal = orderedArray[j];
				orderedArray[j] = orderedArray[j+1];
				orderedArray[j+1] = tempVal;
			}
		}
	}*/
	
	var localDistance = Math.max(10, maxSubmissions/5);
	for(var i=0; i<pagesReturned-1; i++){
		var localPop = 0;
		var localPopWeight = 0;
		var localAverage = 0;
		var localDeviation = 0;
		for(var j=Math.max(0, i-localDistance); j<Math.min(pagesReturned-1, i+localDistance); j++){
			localPop++;
			localPopWeight += (1.0*localDistance-Math.abs(i-j))/localDistance;
			localAverage += resultsData[j][4];
		}
		localAverage /= localPopWeight;
		for(var j=Math.max(0, i-localDistance); j<Math.min(pagesReturned-1, i+localDistance); j++){
			localDeviation += Math.pow(resultsData[j][4] - localAverage, 2);
		}
		localDeviation /= localPopWeight;
		localDeviation = Math.sqrt(localDeviation);
		localDeviation = roundToDecimal(localDeviation, 2);
		
		if(resultsData[i][4] >= 0.99 * maxRatio){ // Highest Ratios
			subIsNotable[i] = true;
			subIsNotable_notes[i] = subIsNotable_notes[i] + " [ratio >= 99% of max ratio]";
		}
		if(resultsData[i][5] >= 0.99 * maxPopIndex){ // Highest Pop Indexes
			subIsNotable[i] = true;
			subIsNotable_notes[i] = subIsNotable_notes[i] + " [popIndex >= 99% of max popIndex]";
		}
		if(Math.abs(resultsData[i][4] - meanRatio) >= standardDeviation*1.5){ // Overall Ratio Outliers
			subIsNotable[i] = true;
			if(resultsData[i][4]>meanRatio){
				subIsNotable_notes[i] = subIsNotable_notes[i] + " [global ratio outlier (High)]";
			}else{
				subIsNotable_notes[i] = subIsNotable_notes[i] + " [global ratio outlier (Low)]";
			}
		}
		if(Math.abs(resultsData[i][4] - localAverage) >= localDeviation*1.5){ // Local Ratio Outliers
			subIsNotable[i] = true;
			if(resultsData[i][4]>localAverage){
				subIsNotable_notes[i] = subIsNotable_notes[i] + " [local ratio outlier (High)]";
			}else{
				subIsNotable_notes[i] = subIsNotable_notes[i] + " [local ratio outlier (Low)]";
			}
		}
		if(resultsData[i][5]>=1.0){ // Pop Index > 1.0
			subIsNotable[i] = true;
			subIsNotable_notes[i] = subIsNotable_notes[i] + " [popIndex >= 1.0]";
		}
	}
	
	var counter = 0;
	for(var i=0; i<pagesReturned-1; i++){
		if(subIsNotable[i]){			
			var linkHolder = document.createElement("a");
			linkHolder.href = resultsData[i][0];
			linkHolder.innerHTML = (counter++) + ": "+ resultsData[i][0] + "(" + resultsData[i][4] + ", " + resultsData[i][5] + ")" + subIsNotable_notes[i];
			newDivRef.appendChild(linkHolder);
			newDivRef.appendChild(document.createElement("br"));
		}
	}
	
	
	
	
	newDivRef.appendChild(stats);
	
	var chd_t0 = "";
	var chd_t1 = "";
	var chd_t2 = "";
	for(var i=0; i<pagesReturned-1; i++){
		chd_t0 = chd_t0 + Math.floor(100*i/(pagesReturned-1));
		chd_t1 = chd_t1 + roundToDecimal((100 * resultsData[i][4] / 1.5), 2);
		chd_t2 = chd_t2 + roundToDecimal((100 * resultsData[i][5] / 1.0), 2);
		if(i<pagesReturned-2){
			chd_t0 = chd_t0 + ",";
			chd_t1 = chd_t1 + ",";
			chd_t2 = chd_t2 + ",";
		}
	}
	
	/*
	&chem=
	y;s=bubble_texts_big;d=bbbr,FFC6A5,000000,0;ds=0;dp=5;of=-45,2|
	y;s=bubble_texts_big;d=bbbr,FFC6A5,000000,1;ds=0;dp=13;of=-45,2
	*/
	
	newDivRef.removeChild(percentDone);	
	var imgUrl = "http://chart.apis.google.com/chart?cht=s&chd=t:"+chd_t0+"|"+chd_t1+"|"+chd_t2+"&chco=3072F3,ff0000,00aaaa&chls=2,4,1&chdlp=t&chs=600x450&chxr=0,0,1.5,0.1|1,0,1.0,.1&chxt=y&chm=o,FF0000,0,0,24,0.1";
	
	var counter = 0;
	for(var i=0; i<pagesReturned-1; i++){
		if(subIsNotable[i]){
			if(counter==0){
				imgUrl += "&chem=";
			}else{
				imgUrl += "|";
			}
			imgUrl += "y;s=map_xpin_letter;d=pin_sleft,"+counter+",FF0000;dp="+i+";of=-15,2";
			counter++;
		}
	}
	
	var img = document.createElement("img");
	img.src = imgUrl;
	newDiv.appendChild(img);
}

function roundToDecimal(number, decimalPlaces){
	return Math.round(number*Math.pow(10, decimalPlaces))/Math.pow(10, decimalPlaces);
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function smartMin(num1, num2){
	if(num1 <= num2 && num1 > -1){
		return num1;
	}
	if(num2 < num1 && num2 > -1){
		return num2;
	}
	return -1;
}