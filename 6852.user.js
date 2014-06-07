// ==UserScript==
// @name          research_alert
// @description   Keyword Evaluation
// @include      http://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=research*
// ==/UserScript==

var RefreshTime = 0;
var WindowTimeOut = null;
var MyWindow = "http://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=research+question&minReward=0.00&x=14&y=11&=searchbar";
var re = /research question/gi;

var title = document.title;
if(title.search(/Problem loading page/gi) != -1) {
    window.setTimeout('window.location.href = "' + MyWindow + '"', 1000);
    return;
    }

window.addEventListener("load", function(e) {
  main();
}, false);

function main() {
    document.title = "Research";
    WindowTimeOut = window.setTimeout(
		'window.location.href = "' + MyWindow +'"', 500);
    makeTable();
} /* end Main */	


function SearchTABLE(myParent, match) {
    step = myParent.firstChild;
    found = false;
    Find = new RegExp(match, "gi");
    while (step && (!found)) {
        pos = step;
        step = step.nextSibling;
        if (pos.nodeName == "TABLE") {
            str = pos.innerHTML;
            if (str.search(Find)!= -1) {               
                found = true;
                }
            }
        }
    return found;
}

function makeTable() {
    firstDIV = findElement(document.body, "DIV", 0);
    inserthere = findElement(document.body, "TABLE", 2);
	hits_list = findElement(firstDIV, "TABLE",2);
    mytable = document.createElement("TABLE");
    mytable.setAttribute("width", "750");
    mytable.setAttribute("align", "center");
    mytablebody = document.createElement("TBODY");
    myrow = document.createElement("TR");

    myCell = document.createElement("TD");
    myCell.setAttribute("width", "150");
    myCell.setAttribute("align", "center");
    myCell.innerHTML = '<div id="Last_Time">Last refresh was ' + GetTheTime() + '</div>';
    myrow.appendChild(myCell);

    myCell = document.createElement("TD");
    myCell.setAttribute("valign", "top");
    myCell.setAttribute("width", "300");
    myCell.setAttribute("align", "center");

    if(hits_list) {
        str = hits_list.innerHTML;
        found = str.match(re);
        if(found) {
            getResearchLink();
            }
        }    

	myrow.appendChild(myCell);
	
    myCell = document.createElement("TD");
    myCell.setAttribute("width", "100");
    myCell.setAttribute("align", "center");
    myCell.innerHTML = '<A href="http://www.mturk.com/mturk/myhits">pending hits</A>';
    myrow.appendChild(myCell);

    mytablebody.appendChild(myrow);
    mytable.appendChild(mytablebody);
    document.body.insertBefore(mytable, inserthere);
    document.body.normalize();
}

function findElement(theNode, type, loc) {
    if(!theNode) {
        return null; }
    pos = theNode.firstChild;
    found = false;
    count = 0;
    while (pos && !found) {
        if((pos.nodeName == type) && (count == loc)) {
            return pos;
            }
        if (pos.nodeName == type) {
            count += 1; }
        pos = pos.nextSibling;
        }
    return null;
}  /* end find Element */

function GetTheTime() {
    currentTime = new Date();
	if(currentTime.getHours() < 10) {
	   myTime = '0' + currentTime.getHours() + ':';
       }
    else {
       myTime = currentTime.getHours() + ':';
       }
    if(currentTime.getMinutes() < 10) {
       myTime = myTime + '0' + currentTime.getMinutes() + ':';
       }
    else {
       myTime = myTime + currentTime.getMinutes() + ':';
       }
    if(currentTime.getSeconds() < 10) {
       myTime = myTime + '0' + currentTime.getSeconds();
       }
    else {
       myTime = myTime + currentTime.getSeconds();
       }
    return myTime;
} /* end GetTheTime() */

function getResearchLink() {
   var i = 0;
   var found = false;
   var fullLink = "";
   while(!found) {
       var hit = document.getElementById("capsule"+i+"-0");
       i++;
	   if(hit) {
	       str = hit.innerHTML;
           if(str.match(re) ) {
               firstTD = hit.parentNode;
               tableRow = firstTD.parentNode;
               lastTD = findElement(tableRow, "TD", 2);
               mySpan = findElement(lastTD, "SPAN", 0);
               theLink = findElement(mySpan, "A", 0);
               fullLink = "http://www.mturk.com" + theLink.getAttribute("href");
               if(!opennedRQ(fullLink) ) {
                    GM_openInTab(fullLink);
                    }
               }
		   }
        else {
            found = true;
            }            
    }
}

function opennedRQ(theHit) {
    var HitID = theHit.replace(/http:\/\/www.mturk.com\/mturk\/preview\?groupId=/i, "");
    var doneRQ = GM_getValue("pastRQs", "");
    if(doneRQ != "") {
        var theList = doneRQ.split(",");
        var find = new RegExp(HitID, "i")
        var found = false;
        for(var i = 0;(i < theList.length) && !found; i++) {
            if(theList[i].search(find) != -1) {
                found = true;
                }
            }
        if(!found) {
            theList.push(HitID);
            }
        if(theList.length > 15) {
            theList.shift();
            }

        ListStr = "";
        for(var i = 0;i < theList.length;i++) {
            if(i ==0) {
                ListStr = theList[i];
                }
            else {
                ListStr = ListStr + "," + theList[i];
                }
            }
        
        GM_setValue("pastRQs", ListStr);
        }
    else {  // only for the first time
        GM_setValue("pastRQs", HitID);
        var found = false;
        }
    return found;
}