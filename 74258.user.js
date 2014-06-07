// ==UserScript==
// @name		tehconnection.eu - Uploaded Since Yesterday
// @author		kcsobo
// @namespace	
// @description	Shows upload, download, and ratio change since midnight on tehconnection.eu
// @include		http*://*tehconnection.eu/*
// @version		0.01
// @date		2010-04-12
// ==/UserScript==

/*******************************************************************************

            What.cd Uploaded since last Visit
            Greasemonkey script by death2y
			
			modified by applebananas
			modified heavily by kcsobo
*******************************************************************************/
//The next two functions are from the buffer calculator script
const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);
function toBytes(amount) {
    amount = amount.split(" ");
    var bytes = amount[0].replace(",","");
    amount[0] = amount[0].replace(",","");
    if ( amount[1] == "KB" ) bytes = amount[0] * KB;
    else if ( amount[1] == "MB" ) bytes = amount[0] * MB;
    else if ( amount[1] == "GB" ) bytes = amount[0] * GB;
    else if ( amount[1] == "TB" ) bytes = amount[0] * TB;
    else if ( amount[1] == "PB" ) bytes = amount[0] * PB;
    return Math.round(bytes); //For some reason returning a decimal
}
function fromBytes(bytes) {
    var buffer = bytes;
    var units = 'B';
    
    if ( Math.abs(bytes) >= PB ) {
        buffer = bytes/PB;
        units = "PB";
    } else if ( Math.abs(bytes) >= TB ) {
        buffer = bytes/TB;
        units = "TB";
    } else if ( Math.abs(bytes) >= GB ) {
        buffer = bytes/GB;
        units = "GB";
    } else if ( Math.abs(bytes) >= MB ) {
        buffer = bytes/MB;
        units = "MB";
    } else if ( Math.abs(bytes) >= KB ) {
        buffer = bytes/KB;
        units = "KB";
    }
    return buffer.toFixed(2) + ' ' + units;
}

    var statsContainer = document.getElementById("header"); //The ul element holding the stats
    var stats = statsContainer.getElementsByTagName("span");

    var uploaded = toBytes(stats[0].innerHTML);
    var downloaded = toBytes(stats[1].innerHTML);
	var ratio = stats[2].firstChild.innerHTML*1;

	//Retrieve last values
	var uploadedLast = toBytes(GM_getValue("uploaded","0 KB"));
	var downloadedLast = toBytes(GM_getValue("downloaded","0 KB"));
	var ratioLast = GM_getValue("ratio",0)/100; //Converts back to proper floating point decimal

	//Change values
	var uploadDifference = uploaded-uploadedLast;
	var downloadDifference = downloaded-downloadedLast;
	var ratioDifference = (ratio-ratioLast).toFixed(2);

//    if ( (uploadDifference != 0))
        stats[0].innerHTML += " (" + fromBytes(uploadDifference) + ")";         //Uploaded

//    if ( (downloadDifference != 0))
        stats[1].innerHTML += " (" + fromBytes(downloadDifference) + ")";       //Downloaded

//    if ( (ratioDifference != 0))
        stats[2].firstChild.innerHTML += " (" + ratioDifference + ")";          //Ratio

	var now = new Date();
	var lastUpdated = new Date(GM_getValue("lastUpdated","01/01/1990"));


if((uploadedLast==0.0 && downloadedLast == 0.0 && ratioLast == 0.0) || (now.getDate() != lastUpdated.getDate())){ 
	// if it's passed midnight we should update the saved values
	// also update the values if there weren't any to reference to begin with : ie: this was the first run of the script
	
	GM_setValue("lastUpdated",now.toString());

	GM_setValue("uploaded",fromBytes(uploaded));
	GM_setValue("downloaded",fromBytes(downloaded));
	GM_setValue("ratio",Math.floor(ratio*100));   //multiplies by 100 to get as integer)
												   }