// ==UserScript==
// @name        JiraColor
// @namespace   *
// @include     https://jira.yoursitecomehere.com/*
// @version     1
// @grant
// ==/UserScript==

setInterval(function(){start()}, 10);

function start(){
    var p;
    if(window.opera || window.navigator.vendor.match(/Google/)) {
        var div = document.createElement("div");
        div.setAttribute("onclick", "return window;");
        p = div.onclick();
    }
    else
    {
        p = unsafeWindow;
    }
    var jQuery = p.jQuery;
    var url = window.location.href;
    
    getNodes();

function getNodes(){

    var newNodes = document.evaluate("//img[@alt='New']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var inprogressNodes = document.evaluate("//img[@alt='In Progress']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var resolvedNodes = document.evaluate("//img[@alt='Resolved']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var closedNodes = document.evaluate("//img[@alt='Closed']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var testedNodes = document.evaluate("//img[@alt='Tested']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var confirmedNodes = document.evaluate("//img[@alt='Confirmed']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var devtestedNodes = document.evaluate("//img[@alt='DEV Tested']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var releasedNodes = document.evaluate("//img[@alt='Released']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var feedbackNodes = document.evaluate("//img[@alt='Feedback']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var repliedNodes = document.evaluate("//img[@alt='Replied']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    coloring(newNodes, "#FF8585");
    coloring(inprogressNodes, "#FFA333");
    coloring(resolvedNodes, "#66CDAA");
    coloring(closedNodes, "LightGray");
    coloring(testedNodes, "PaleGreen");
    coloring(confirmedNodes, "LightSkyBlue");
    coloring(devtestedNodes, "YellowGreen");
    coloring(releasedNodes, "Gray");
    coloring(feedbackNodes, "Plum");
    coloring(repliedNodes, "Orange");
//PaleGreen

    
}
    
    function coloring(nodelist, color){
//        alert(nodelist);
          for (var i=0; i < nodelist.snapshotLength; i++){
        var node = nodelist.snapshotItem(i);
        node.parentNode.parentNode.style.backgroundColor = color;
    }  
    } 
}