// ==UserScript==
// @name           The Site - Show User Stats on All Pages
// @description    Shows the Up/Down/Ratio on all pages
// @namespace      applebananas
// @include    https://*wigornot.com/*
// @version    0.01
// @date    2010-02-15
// ==/UserScript==

GM_registerMenuCommand("The Site - Show User Stats: Display Options...", function() {
    var x = prompt("Where do you want the stats to be displayed (try a few options out =) )?" + 
        "\nNote: If your resolution is too low, some of the information might get cut off, so try a different style." + 
        "\n\n1: top right [1 line] (default)\n2: next to search bar [1 line] \n3: under last visit [1 line]\n4: to the right of last visit [3 lines]\n5: under last visit [3 lines]" +
        "\n\nCurrent: " + GM_getValue('layoutStyle', 1));
    if (x >= '1' && x <= '5') { 
        x = GM_setValue('layoutStyle', x); 
        window.location.href = window.location.href;
    }
    else if (x == null || x == '') { return; }
    else {
        alert("Please pick '1', '2', '3', '4', or '5'");
    }
});

GM_registerMenuCommand("The Site - Show User Stats: Set Update Interval...", function() {
    var x = prompt('How often would you like your ratio to be updated (in minutes)?\nExample: "1440" is once per day\nCurrent interval: "' + GM_getValue("updateInterval",30) + '" minutes, Recommended: "30" minutes');
       if (x == null || x == '') { return; }
    else if (!isNaN(x*1)) {    GM_setValue("updateInterval",x); }
    else { alert("Please pick a valid number"); }
});

GM_registerMenuCommand("The Site - Show User Stats: Change Your User ID...", function() {
    var x = prompt("What is your user ID (xxxxx in user profile)?\nhttps://wigornot.com/f/profile.php?id=xxxxx\nCurrent user ID: " + GM_getValue("userID",0));
    if (x == null || x == '') { return; }
    else if (!isNaN(parseInt(x))) { 
        GM_setValue("userID",x);
        window.location.href = window.location.href;
    }
    else if (x == 'R' || x == 'r') { reset(true); }
    else { alert("Please pick a valid number"); }
});


GM_registerMenuCommand("The Site - Show User Stats: Force Update", function() {
    updateStats(true);
});

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            if (responseDetails) {GM_setValue('lastUpdate', new Date().getTime()+''); }
            
            var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
            html.innerHTML = responseDetails.responseText;
            doc.appendChild(html);
            callback(doc);
        },
        onerror: function (e) { }
    });
}

function updateStats(forced) {
    // update stats (at rate of userDefinedMinutes * 60 seconds * 1000 ms)
    if ((forced) || (parseInt(GM_getValue('lastUpdate', '0')) + (GM_getValue("updateInterval",30)*60000) <= (new Date().getTime()))) {
    
        getDOC("https://wigornot.com/f/tracker_userprofile.php?uid=" + userID, function(doc) {
            var yourCurrentRatio, yourCurrentDownload, yourCurrentUpload;
            //Retrieve last values (move above if statement)
            var uploadedLast = toBytes(GM_getValue("currentUpload","0 KiB"));
            var downloadedLast = toBytes(GM_getValue("currentDownload","0 KiB"));
            var ratioLast = GM_getValue("currentRatio",0.00)/100; //Converts back to proper floating point decimal
        
            var check = doc.getElementsByTagName('tr');
            var i = 0, tempCheck = 0;
            outerClass: for (i in check) {
                if (check[i].innerHTML.match(/Post count/)) {
                    tempCheck = i;
                }
            }
            tempCheck++;

            var theFirstNode = check[tempCheck];
            var theChildNode = theFirstNode.getElementsByTagName("td");
            
            if (theChildNode[0]) {
                var theHTML = theChildNode[0].innerHTML;
                yourCurrentRatio = theHTML.substring(theHTML.indexOf(">")+1, theHTML.indexOf("</"))*1;
            }
            if (theChildNode[1]) {
                var theHTML = theChildNode[1].innerHTML;
                yourCurrentDownload = theHTML.substring(theHTML.indexOf(">")+1, theHTML.indexOf("</"));
                yourCurrentDownload = toBytes(yourCurrentDownload.replace(String.fromCharCode(160)," "));
            }
            if (theChildNode[2]) {
                var theHTML = theChildNode[2].innerHTML;
                yourCurrentUpload = theHTML.substring(theHTML.indexOf(">")+1, theHTML.indexOf("</"));
                yourCurrentUpload = toBytes(yourCurrentUpload.replace(String.fromCharCode(160)," "));
            }
            
            //change values
            var uploadDifference = yourCurrentUpload-uploadedLast;
            var downloadDifference = yourCurrentDownload-downloadedLast;
            var ratioDifference = (yourCurrentRatio-ratioLast).toFixed(2);

            GM_setValue('ratioDifference',Math.floor(ratioDifference*100));
            GM_setValue('downloadDifference',fromBytes(downloadDifference));
            GM_setValue('uploadDifference',fromBytes(uploadDifference));    
            
            if (theChildNode[0]) {
                GM_setValue('currentRatio',Math.floor(yourCurrentRatio*100));
                GM_setValue('currentDownload',fromBytes(yourCurrentDownload));
                GM_setValue('currentUpload',fromBytes(yourCurrentUpload));    
            }
            
            if (forced) { window.location.href = window.location.href; }
            else { writeStats(); }
            
        });

    }
    else {
        writeStats();
    }
}

function writeStats() {
    var yourCurrentDownload = GM_getValue('currentDownload',0);

    // write the update
    if (yourCurrentDownload != 0) {
        var yourCurrentRatio = (GM_getValue('currentRatio',0.00)/100).toFixed(2);
        var    yourCurrentUpload = GM_getValue('currentUpload',0);
        var ratioDifference = (GM_getValue('ratioDifference',0)/100).toFixed(2);
        var downloadDifference = GM_getValue('downloadDifference',0);
        var uploadDifference = GM_getValue('uploadDifference',0);

        var layoutStyle = GM_getValue('layoutStyle', 1);

        var lastTime = document.getElementById('brdwelcome').getElementsByTagName("li")[0];
        var searchBar = document.getElementById("punwrap").getElementsByTagName("div")[0];

        var lineUpHTML = " <b>Up:</b> " + yourCurrentUpload + " (" + uploadDifference + ")";
        var lineDownHTML = " <b>Down:</b> " + yourCurrentDownload + " (" + downloadDifference + ")";
        var lineRatioHTML = " <b>Ratio:</b> " + yourCurrentRatio + " (" + ratioDifference + ")";

        if (layoutStyle == 1) {
            searchBar.innerHTML = searchBar.innerHTML + '<div align="right" style="position: absolute; right: 26px; top:11px;" />' +
                lineUpHTML + ' | ' + lineDownHTML + ' | ' + lineRatioHTML + '</div>';
        }
        else if (layoutStyle == 2) {
            searchBar.innerHTML = searchBar.innerHTML + '<div align="right" style="position: absolute; right: 137px; top:32px;" />' +
                lineUpHTML + ' | ' + lineDownHTML + ' | ' + lineRatioHTML + '</div>';        
        }
        else if (layoutStyle == 3 ) {
            lastTime.innerHTML = lastTime.innerHTML + "</li><li>" + 
            lineUpHTML + lineDownHTML + lineRatioHTML + "</li>";
        }
        else if (layoutStyle == 4 ) {
            lastTime.innerHTML = lastTime.innerHTML +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
            lineUpHTML + "</li><li>" + lineDownHTML + "</li><li>" + lineRatioHTML + "</li></li>";
        }
        else if (layoutStyle == 5 ) {
            lastTime.innerHTML = lastTime.innerHTML + "</li><li>" + 
            lineUpHTML + "</li><li>" + lineDownHTML + "</li><li>" + lineRatioHTML + "</li></li>";
        }        
    }
}

const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);
function toBytes(amount) {
    amount = amount.split(" ");
    var bytes = amount[0].replace(",","");
    amount[0] = amount[0].replace(",","");
    if ( amount[1] == "KiB" ) bytes = amount[0] * KB;
    else if ( amount[1] == "MiB" ) bytes = amount[0] * MB;
    else if ( amount[1] == "GiB" ) bytes = amount[0] * GB;
    else if ( amount[1] == "TiB" ) bytes = amount[0] * TB;
    else if ( amount[1] == "PiB" ) bytes = amount[0] * PB;
    return Math.round(bytes); //For some reason returning a decimal
}

function fromBytes(bytes) {
    var buffer = bytes;
    var units = 'B';
    
    if ( Math.abs(bytes) >= PB ) {
        buffer = bytes/PB;
        units = "PiB";
    } else if ( Math.abs(bytes) >= TB ) {
        buffer = bytes/TB;
        units = "TiB";
    } else if ( Math.abs(bytes) >= GB ) {
        buffer = bytes/GB;
        units = "GiB";
    } else if ( Math.abs(bytes) >= MB ) {
        buffer = bytes/MB;
        units = "MiB";
    } else if ( Math.abs(bytes) >= KB ) {
        buffer = bytes/KB;
        units = "KiB";
    }
    return buffer.toFixed(2) + ' ' + units;
}
var userID = GM_getValue("userID",0);
if (userID == 0) {
    var findProfile = document.getElementsByTagName("a");
    outerloop: for (var i in findProfile) {
        if (findProfile[i].innerHTML.match(/Profile/)) {
            var theLink = findProfile[i].href;
            userID = theLink.substring(theLink.indexOf("?id=")+4);
            GM_setValue("userID",userID);
            updateStats(true);
            alert("Welcome to the script!\nUser ID set to: " + userID + 
            "\n\nThe numbers in the parenthesis represent difference since the last update." +
            "\n\nI recommend setting the update interval to 30 minutes (default).  The script only actually updates the stats if you visit any page on the site AND it's been (in the default case) 30 minutes since the last update." + 
            "\n\nI also recommend trying a few displays out to see which suits you best (click monkey in bottom right -> user script commands -> Display options).");
            break outerloop;
        }
    }
}
else {
    updateStats(false);    
}

function reset(fullResetOrNot) {
    if (fullResetOrNot) {
        GM_setValue('layoutStyle', 1);
        GM_setValue("updateInterval",30);
    }
    GM_setValue('currentRatio',0.00);
    GM_setValue('currentUpload',"0 KiB");
    GM_setValue('currentDownload',"0 KiB");
    GM_setValue('ratioDifference',0);
    GM_setValue('downloadDifference',0);
    GM_setValue('uploadDifference',0);
    GM_setValue("userID",0);
    GM_setValue('lastUpdate', '0');
    window.location.href = window.location.href;
}