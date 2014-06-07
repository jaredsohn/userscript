// ==UserScript==
// @name          Newsgator Sort Feeds
// @namespace     http://freegarethandrew.org/projects/userScripts/
// @description   Sorts feeds by number of posts
// @include       http://www.newsgator.*/ngs/subscriber/WebEd2.aspx?fid=*
// @include       http://www.newsgator.*/ngs/subscriber/WebEd2.aspx
// ==/UserScript==

window.setTimeout(showMenu, 500);

function showMenu(){

    var feedsTitleXPath = "//div[@id='FOLDERS3']/table/tbody/tr";
    var feedsTitle = document.evaluate(feedsTitleXPath,
                                 document, 
                                 null, 
                                 XPathResult.FIRST_ORDERED_NODE_TYPE, 
                                 null).singleNodeValue;

    var sortMenu = document.createElement("DIV");
    sortMenu.innerHTML = "Sort";
    sortMenu.style.position = "absolute";
    sortMenu.style.top = "120px";//Ropey
    sortMenu.style.left = "180px";
    document.body.appendChild(sortMenu);

   sortMenu.addEventListener("click",function(){sortFeeds()}, false);
}

function getTop(el, acc){
    if(typeof(acc) == "undefined"){
        acc= 0;
    }
    acc += el.offsetTop;
    if(el.offsetParent){
        acc += getTop(el.offsetParent, acc);
    }
    return acc;
}

function sortFeeds(){

    var myFeedsElement = document.getElementById("cstl_FOLDERS3");
    var myFeedsRoot = document.getElementById("ch_FOLDERS3");
    var feedsXPath = "//div[@id='ch_FOLDERS3']/div[@class='row']//*/span";
    var feedsNodes = document.evaluate(feedsXPath,
                                 document, 
                                 null, 
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                 null);
    var feeds = [];
    var feedsRE = new RegExp("(.*)\\((\\d+)\\)");
    for(var i=0; i<feedsNodes.snapshotLength; i++){
        var feedsString = feedsNodes.snapshotItem(i).innerHTML;
        var feedsSpanId = feedsNodes.snapshotItem(i).id; 
        var feedsDivId = feedsSpanId.substring(5);//cstl_FOLDERID
        var feedsDiv = document.getElementById(feedsDivId);
        //GM_log(feedsString);
        var feedsMatch = feedsRE.exec(feedsString);
        //GM_log(feedsMatch);
        //dump(feedsMatch.toSource())
        feeds.push({name: feedsMatch[1], posts : feedsMatch[2], div : feedsDiv});
    }
    feeds.sort(function(a,b){
           return b.posts - a.posts;//deceasing size order  
           });
    myFeedsRoot.innerHTML = "";
    for(var j=0; j<feeds.length; j++){
        myFeedsRoot.appendChild(feeds[j].div);    
    }
}


