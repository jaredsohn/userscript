
// ==UserScript==
// @name            NewsGator Compact Items
// @author          dummy
// @description     More info per pixel
// @include         http://www.newsgator.com/ngs/subscriber/WebEd*
// @include         http://newsgator.com/ngs/subscriber/WebEd*
// ==/UserScript==

function hideTag(hideThis) {
/*
    var myParent = hideThis.parentNode;
    var tmp = hideThis;
    //tmp.innerHtml = 'findMichTable';

    var newElement = document.createElement('div');
    //newElement.style.visibility = 'hidden';
    newElement.style.display = 'none';

    myParent.replaceChild(newElement, tmp);
    newElement.appendChild(tmp);
    */
    
    hideThis.style.display = 'none';
}

var count = 0;
var theTables = unsafeWindow.document.getElementsByTagName('table');
for(var i=0;i<theTables.length;i++){
    if(theTables[i].className == 'postFooterTable'){

        hideTag(theTables[i]);
        count++;
    }
}
//alert("Removed: " + count);

function beginsWith(haystack, needle) {
    return (haystack.substring(0, needle.length) == needle);
}

var theCommands = "";
var theAnchors = unsafeWindow.document.getElementsByTagName('a');
for(var i=0;i<theAnchors.length;i++){
    if (beginsWith(theAnchors[i].id, 'posttitle')) {
    
        // NGSubscriptionManager.TrackClickView('123456', '789123');
        var trackerUrl = 
            theAnchors[i].attributes.getNamedItem('onclick').nodeValue;

        //var myRegex = "NGSubscriptionManager.TrackClickView\('(\d+)', '(\d+)'\);";
        var numbers = trackerUrl.match(/\d+/g);
        //theAnchors[i].parentNode.innerHTML += ' ' + trackerUrl;

        theCommands += "deletePost(" + numbers[1] + ", '',0," + numbers[0] + ",'');";
        var markAsReadLink = "<a href=\"javascript:" + theCommands + "\"><img title=\" Mark post as Read\" src=\"img/markRead_Small.gif\"/></a>";

        theAnchors[i].parentNode.innerHTML = markAsReadLink + ' ' + theAnchors[i].parentNode.innerHTML;
        
        //uh. ugly again. too lazy, to do it right
        i++;
        //count++;
    }
}

var theDivs = unsafeWindow.document.getElementsByTagName('div');
for(var i=0;i<theDivs.length;i++){

    if (1==0
       || theDivs[i].className == 'entry-header'
       || theDivs[i].className == 'search-content'
       //|| (beginsWith(theDivs[i].id, 'postdiv') && theDivs[i].className == 'postdiv')
       || beginsWith(theDivs[i].id, 'entry-line')
       ) {

        hideTag(theDivs[i]);
        
    } else if (beginsWith(theDivs[i].id, 'entry')) {
    
        theDivs[i].style.paddingTop = "0px";
        theDivs[i].style.paddingBottom = "0px";
    }
}

