// ==UserScript==
// @name          MetaStats
// @namespace     http://userscripts.org/users/120246
// @description   Generates stats
// @include       http://www.metafilter.com/*
// @include       http://metatalk.metafilter.com/*
// ==/UserScript==

function Tally() {
    this.MaxComments = 250; // increase to analyze longer threads and to lower thread heat levels
    this.MaxFavorites = 36; // increasing this value will lower thread light levels 
    this.MaxWords = 135;  // increasing this value will lower comment light level
    this.HeatThreshold = 25;  // comments above threshold will add to the heat
    this.LightThreshold = 25;  // comments above threshold will add to the light
    this.ShowTop = 10;  // show authors adding heat and light (set to zero to show all)

    this.Heat = 0;
    this.Light = 0;
    this.Words = 0;
    this.Favorites = 0;
    
    this.TotalHeat = 0;
    this.TotalLight = 0;
    
    this.HeatComment = new Object();
    this.LightComment = new Object();
}
// Max words based on: 
//   15 words / sentence x
//    3 sentences / paragraph x 
//    3 paragraphs / comment

//
//  Get thread stats
//
function Thread(threadDiv) {
    // Initialize property values
    this.Author = "";
    this.Favorites = 0;
    this.Comments = 0;
    this.Light = 0;
    this.Heat = 0;
    
    var threadSpan = threadDiv.getElementsByTagName("span"); 
    var threadText = threadSpan.item(0).textContent;
    
    // Get number of comments in thread
    var threadLeft = threadText.split("(");
    var threadRight = threadLeft[1].split(")");
    var threadComments = threadRight[0].split(" ");
    this.Comments = threadComments[0];
    
    // Get number of thread favorites
    var threadFavSpan = threadSpan.item(0).getElementsByTagName("span");
    var threadFavLink = threadFavSpan.item(2).getElementsByTagName("a");
    if (threadFavLink.length > 0) {
        var threadFavWords = threadFavLink.item(0).textContent.split(" ");
        this.Favorites = threadFavWords[0];
    }
    
    // Get author of thread
    var threadWords = threadText.split(" ");
    this.Author = threadWords[2];

    // Calculate weighted avg for thread heat
    this.Heat = WeightedAverage(this.Comments, myTally.MaxComments);
    myTally.TotalHeat += this.Heat;

    // Calculate weighted avg for thread light    
    this.Light = WeightedAverage(this.Favorites, myTally.MaxFavorites);
    myTally.TotalLight += this.Light;
}

//
//  Get comment stats
//
function Comment(commentDiv) {
    // Initialize property values
    this.URL = "";
    this.Author = "";
    this.Favorites = 0;
    this.Words = 0;
    this.Heat = 0;
    this.Light = 0;
    
    // Get author of comment
    var commentSpan = commentDiv.getElementsByTagName("span"); 
    var commentSpanWords = commentSpan.item(0).textContent.replace(/\n/g, " ").split(" ");
    var commentAuthor = commentSpan.item(0).getElementsByTagName("a"); 
    this.Author = commentAuthor.item(0).textContent;
    
    // Get number of comment favorites
    var commentFavSpan = commentSpan.item(0).getElementsByTagName("span");
    var commentFavCntSpan = commentFavSpan.item(0).getElementsByTagName("span");
    var commentFavLink = commentFavCntSpan.item(0).getElementsByTagName("a");
    if (commentFavLink.length > 0) {
        var commentFavWords = commentFavLink.item(0).getAttribute("title").split(" ");
        this.Favorites = commentFavWords[0];
    }
    
    // Get relative link to comment
    var commentLink = commentSpan.item(0).getElementsByTagName("a");
    this.URL = commentLink.item(1).getAttribute("href");
    
    // Get number of words in comment
    // Words enclosed in anchor tags are attributed to author
    // Words enclosed in other html tags (em, blockquote, i) are not attributed to author
    var i;
    var nodeName;
    var nodeText;
    for (i = 0; i < commentDiv.childNodes.length; i++) {
        nodeName = commentDiv.childNodes.item(i).nodeName;
        if ((nodeName == "#text") || (nodeName == "A")) {
            nodeText = commentDiv.childNodes.item(i).textContent.replace(/\s+/g, " ");
            if (nodeText.length > 1) {
                this.Words += nodeText.split(" ").length;
                if (nodeText.charAt(0) == " ") this.Words -= 1;
                if (nodeText.charAt(nodeText.length - 1) == " ") this.Words -= 1;
            }
        }
    }
    
    // Determine heat factor of comment
    if (this.Words > 0) this.Heat = Math.round(100 * this.Favorites / this.Words);
    
    // Determine light factor of comment
    this.Light = Math.round(100 * this.Words / myTally.MaxWords);
}

//
// Author info
//
function Author() {
    this.URL = "";
    this.Name = "";
    this.Heat = 0;
    this.Comments = 0;
    this.Light = 0;
}

Author.prototype.setValues = function(thisComment) {
    this.URL = thisComment.URL;
    this.Name = thisComment.Author;
    this.Heat = thisComment.Heat;
    this.Light = thisComment.Light;
}

//
//  Sort author object by light
//
function ByLight(thisObject, thatObject) {    
    if (thisObject.Light > thatObject.Light) {
        return -1;
    } else if (thisObject.Light < thatObject.Light) {
        return 1;
    }
    return 0;
}
//
//  Sort author object by heat
//
function ByHeat(thisObject, thatObject) {    
    if (thisObject.Heat > thatObject.Heat) {
        return -1;
    } else if (thisObject.Heat < thatObject.Heat) {
        return 1;
    }
    return 0;
}

function WeightedAverage(thisValue, maxValue) {
    var weightValue;
    var weightBin = maxValue / 5;
    var partialWeight = 100 * thisValue / weightBin;

    if (thisValue > maxValue) weightValue = 100;
    else if (IsBetween(thisValue, maxValue - weightBin, maxValue))
        weightValue = (partialWeight - 400) * .35 + 65;
    else if (IsBetween(thisValue, maxValue - 2*weightBin, maxValue - weightBin) )
        weightValue = (partialWeight - 300) * .25 + 40;
    else if (IsBetween(thisValue, maxValue - 3*weightBin, maxValue - 2*weightBin)) 
        weightValue = (partialWeight - 200) * .20 + 20;
    else if (IsBetween(thisValue, maxValue - 4*weightBin, maxValue - 3*weightBin)) 
        weightValue = (partialWeight - 100) * .15 + 5;
    else
        weightValue = partialWeight * .05;
      
    return Math.round(weightValue);
}

function IsBetween (thisValue, minValue, maxValue) {
    if (thisValue >= minValue && thisValue < maxValue) return true;
    else return false;
}

//
//  Get CSS style
//
function grabStyle(styleSheet, styleProp){
    if (window.getComputedStyle){
        return window.getComputedStyle(styleSheet,null).getPropertyValue(styleProp);
    } else if (styleSheet.currentStyle) {
        return eval("styleSheet.currentStyle." + styleProp);
    }
}

function rgb(red, green, blue)
{
    var hexColor = ZeroPadString(red.toString(16)) + ZeroPadString(green.toString(16)) + ZeroPadString(blue.toString(16));
    return hexColor;
}

function ZeroPadString(myString) {
    if (myString.length == 1) return "0" + myString.toUpperCase();
    else return myString.toUpperCase();
}

//
// Begin main
//

var i;
var rowMessage = "";
var myTally = new Tally;

// Get current page text color and link color
var stylesheet = document.getElementsByTagName("body").item(0);
var textColor = eval(grabStyle(stylesheet, "color"));
stylesheet = document.getElementsByTagName("a").item(0);
var hrefColor = eval(grabStyle(stylesheet, "color"));

// Get thread stats
var threadDiv = document.evaluate("//div[@class=\"copy\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var myThread = new Thread(threadDiv.snapshotItem(0));

if (myThread.Comments > myTally.MaxComments) {
    rowMessage += '<tr><td>Too many comments to analyze. Maximum set to ' + myTally.MaxComments + ' comments.  Edit user script to change.</td></tr>';
} else {
    // Get comment stats
    var thisAuthor;
    var thisComment;
    var allComments = document.evaluate ("//div[@class=\"comments\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(i = 0; i < myThread.Comments; i++) {
        thisComment = new Comment(allComments.snapshotItem(i));
        myTally.Favorites += Number(thisComment.Favorites);
        myTally.Words += Number(thisComment.Words);
    
        // Determine light
        if (thisComment.Light > myTally.LightThreshold) {
            myTally.Light += 1;
            // this author has added light previously in the thread
            if (myTally.LightComment[thisComment.Author]) {
                // this author's current comment adds more light than their previous comment
                if (thisComment.Light > myTally.LightComment[thisComment.Author].Light) {
                    myTally.LightComment[thisComment.Author].setValues(thisComment);
                }
            // this is the author's first comment that adds light to the thread
            } else {
                myTally.LightComment[thisComment.Author] = new Author();
                myTally.LightComment[thisComment.Author].setValues(thisComment);
            }
        }
    
        // Determine heat
        if (thisComment.Heat > myTally.HeatThreshold) {
            myTally.Heat += 1;
            // this author has a previous heated comment in the thread
            if (myTally.HeatComment[thisComment.Author]) {
                // this author's current comment is heatier than their previous comment
                if (thisComment.Heat > myTally.HeatComment[thisComment.Author].Heat) {
                    myTally.HeatComment[thisComment.Author].setValues(thisComment);
                }
            // this is the author's first heated comment in the thread
            } else {
                myTally.HeatComment[thisComment.Author] = new Author();
                myTally.HeatComment[thisComment.Author].setValues(thisComment);
            }            
        }
    }
    
    // Sort comments by descending heat
    i = 0;
    var author;
    var heatList = "";
    var commentArray = new Array();
    for (author in myTally.HeatComment) {    
        commentArray[i] = myTally.HeatComment[author];
        i += 1;
    }
    var heatRatio = 0;
    if (commentArray.length > 0) {
        heatRatio = Math.round(100 * myTally.Heat / myThread.Comments);
        myTally.TotalHeat += heatRatio; 
        
        commentArray.sort(ByHeat);
        
        var showTop = commentArray.length;
        if (showTop > myTally.ShowTop && myTally.ShowTop != 0) showTop = myTally.ShowTop;
        for (i = 0; i < showTop; i++) {
            heatList += commentArray[i].Name + ' at <a href="' + commentArray[i].URL + '">' + commentArray[i].Heat + '%</a><br />';
        }
    }
    
    // Sort comments by descending light
    i = 0;
    var commentList = "";
    commentArray.length = 0;
    for (author in myTally.LightComment) {    
        commentArray[i] = myTally.LightComment[author];
        i += 1;
    }
    var lightRatio = 0;
    if (commentArray.length > 0) {
        lightRatio = Math.round(100 * myTally.Light / myThread.Comments);
        myTally.TotalLight += lightRatio; 
        
        commentArray.sort(ByLight);
        
        var showTop = commentArray.length;
        if (showTop > myTally.ShowTop && myTally.ShowTop != 0) showTop = myTally.ShowTop;
        for (i = 0; i < showTop; i++) {
            commentList += commentArray[i].Name + ' at <a href="' + commentArray[i].URL + '">' + commentArray[i].Light + '%</a><br />';
        }
    }

    var pieChart = '<img src="http://chart.apis.google.com/chart?chs=180x80&cht=p3&chf=bg,s,FFFFFF50&chl=Heat|Light&chco=006699|CCCC00&chd=t:' + myTally.TotalHeat + ',' + myTally.TotalLight + '" />';
    pieChart = '<table><tr><td>' + pieChart + '</td></tr></table>';

    var row1 = '<tr><td></td><td></td><td class="statsCell headerCell">Heat</td><td class="statsCell headerCell">Light</td></tr>';
    var row2 = '<tr><td valign="top" rowspan="3">' + pieChart + '</td><td class="statsCell labelCell">Thread:</td><td class="statsCell">' + myThread.Heat + '%</td><td class="statsCell">' + myThread.Light + '%</td></tr>';
    var row3 = '<tr><td class="statsCell labelCell">Comments:</td><td class="statsCell">' + heatRatio + '%</td><td class="statsCell">' + lightRatio + '%</td></tr>';
    var row4 = '<tr><td class="statsCell labelCell">Top ' + (myTally.ShowTop == 0 ? 'All' : myTally.ShowTop) + ':</td><td class="statsCell">' + heatList + '</td><td class="statsCell">' + commentList + '</td></tr>';
    rowMessage = row1 + row2 + row3 + row4;
}

// Display stats
var tallySpan;
tallySpan = document.createElement("span");
tallySpan.innerHTML = '<style>.statsCell { padding-left: 15px; vertical-align: top; } .headerCell { text-decoration: underline; padding-bottom: 3px; } .labelCell { text-align: right; }</style><table style="border: 1px solid #' + textColor + '" cellspacing="0">' + rowMessage + '</table>';
threadDiv.snapshotItem(0).appendChild (tallySpan);
