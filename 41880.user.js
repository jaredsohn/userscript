// ==UserScript==
// @name           What.cd Uploaded since last visit
// @namespace      http://death2y.uuuq.com/
// @description    Shows upload, download, and ratio change since last visit on what.cd
// @include        http://*what.cd/*
// @include        https://*what.cd/*
// ==/UserScript==

/*******************************************************************************

            What.cd Uploaded since last Visit
            Greasemonkey script by death2y
            
            Shows change in upload, download, and ratio since last
            visit to the website
            
            If you find any bugs, or have a suggestion, I'd love to hear
            about it, you may private message me on what.cd, my username
            is death2y
            
            Thanks to pinguen for writing the Buffer calculator script,
            from which I got the functions to convert units to bytes,
            and back to an appropriate unit
            http://what.cd/user.php?id=51386

#       #  #       #  .#######.  ####.####           #########      .###.  #########.
#       #  #       #  #       #      #               #       #      #   #           #
#       #  #       #  #       #      #               #  .#####      #   #           #
#   #   #  :#######:  :#######:      #               #  :           #   #         ##
#   #   #  #       #  #       #      #       ####    #  :       .###    #       ## 
#   #   #  #       #  #       #      #      #    #   #  .#####  # _____ #     ## 
#  # #  #  #       #  #       #      #      #    #   #       #  #       #        
###   ###  #       #  #       #      #       ####    #########  #########    #
        Move Along  

*******************************************************************************/

//Menu Items
GM_registerMenuCommand("What.cd Stat Tracker: Show when no difference?", function() {
    var x = confirm("Would you like to show stat differences when there has been no change?");
    GM_setValue("showNoDifference",x);
});
GM_registerMenuCommand("What.cd Stat Tracker: Alert on change?", function() {
    var x=confirm("Would you like to be alerted when one of your stats have changed?");
    GM_setValue("alertOnChange",x);
});
GM_registerMenuCommand("What.cd Stat Tracker: Show only in profile?", function() {
    var x=confirm("Would you like to only show (and track) your stat changes when viewing \
your profile?")
    GM_setValue("showOnlyProfile",x);
    if (x==true) {
        var y = prompt("Please enter your user ID",GM_getValue("userID",0));
        GM_setValue("userID",y);
    }
});

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

const showOnlyProfile = GM_getValue("showOnlyProfile",false);

if ( (showOnlyProfile==true) && (window.location.href.search(/user\.php\?id=\d+/) != -1) ) {
    //Set to view only on profile, and viewing a profile
    if ( GM_getValue("userID",0) != window.location.href.replace(/^.+\/user\.php\?id=/,'') )
        GM_setValue('--',1.23); //Purposely get an error, to stop the script
} else if (showOnlyProfile == true) {
    //Show only on profile turned on, but not viewing any profile
    GM_setValue('---',1.23);
}

if (showOnlyProfile == false) {
    var statsContainer = document.getElementById("userinfo_stats"); //The ul element holding the stats
    var stats = statsContainer.getElementsByTagName("span");

    var uploaded = toBytes(stats[0].innerHTML);
    var downloaded = toBytes(stats[1].innerHTML);
    var ratio = stats[2].firstChild.innerHTML*1;
} else {
    statsContainer = document.getElementsByTagName("ul")[6];
    stats = statsContainer.getElementsByTagName("li");
    
    uploaded   = toBytes(stats[2].innerHTML.split(': ')[1]);
    downloaded = toBytes(stats[3].innerHTML.split(': ')[1]);
    ratio      = stats[4].getElementsByTagName("span")[0].innerHTML;
}

//Retrieve last values
var uploadedLast = toBytes(GM_getValue("uploaded","0 KB"));
var downloadedLast = toBytes(GM_getValue("downloaded","0 KB"));
var ratioLast = GM_getValue("ratio",0)/100; //Converts back to proper floating point decimal

//Change values
var showNoDifference = GM_getValue("showNoDifference",true);
var uploadDifference = uploaded-uploadedLast;
var downloadDifference = downloaded-downloadedLast;
var ratioDifference = (ratio-ratioLast).toFixed(2);

if (showOnlyProfile == true) {
    if ( (uploadDifference != 0) || (showNoDifference == true) )
        stats[2].innerHTML += " (" + fromBytes(uploadDifference) + ")";         //Uploaded
    
    if ( (downloadDifference != 0) || (showNoDifference == true) )
        stats[3].innerHTML += " (" + fromBytes(downloadDifference) + ")";       //Downloaded
    
    if ( (ratioDifference != 0) || (showNoDifference == true) )
        stats[4].getElementsByTagName("span")[0].innerHTML += " (" + ratioDifference + ")";
                                                                                //Ratio
} else {
    if ( (uploadDifference != 0) || (showNoDifference == true) )
        stats[0].innerHTML += " (" + fromBytes(uploadDifference) + ")";         //Uploaded

    if ( (downloadDifference != 0) || (showNoDifference == true) )
        stats[1].innerHTML += " (" + fromBytes(downloadDifference) + ")";       //Downloaded

    if ( (ratioDifference != 0) || (showNoDifference == true) )
        stats[2].firstChild.innerHTML += " (" + ratioDifference + ")";          //Ratio
}

//Alert changes, maybe
var alertOnChange    = GM_getValue("alertOnChange",false);
if (alertOnChange) {
    if (uploadDifference != 0)
        alert("Your upload amount has changed.");
    if (downloadDifference != 0)
        alert("Your download amount has changed.");
    if (ratioDifference != 0)
        alert("Your ratio has changed");
}

//Store new values (Saves as strings with the units)
GM_setValue("uploaded",fromBytes(uploaded));      //Uploaded
GM_setValue("downloaded",fromBytes(downloaded)); //Downloaded
GM_setValue("ratio",Math.floor(ratio*100));     //Ratio (Can't store floating point integers,
                                               //multiplies by 100 to get as integer)