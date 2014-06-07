// ==UserScript==
// @name           PlanetGoodColStatHighlighter
// @namespace      http://userscripts.org/users/125692
// @description    highlights cols with good stats
// @include        http://www.humugus.com/ds.php/nav/index/*
// ==/UserScript==
(function() {
var loc=String(location)
var eE,eO,eM,eH;
var sE,sO,sM,sH;
var iE,iO,iM,iH;
var allElementsE,allElementsO,allElementsM,allElementsH;

//alter these to set limits.
var wantE=17
var wantO=17
var wantM=17
var wantH=15
var resleeway=1;  // thus 16+ 16+ 16+ 15+ will be green or blue
var hableeway=0;  //THUS NO LEEWAY HERE 15 IS MIN GREEN


var stringmatch;
var spanstring;
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
	    return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }
addGlobalStyle('span.dblue { color: #0000FF; } ' +  //pure blue
	    'span.dred { color: #FF0000; } ' +          //pure red
	    'span.dyellow { color: #FFFF00; } '+//bright yellow
        'span.dgreen { color: #00FF00; } '+  // pure green
        'span.dgrey { color: #858585; } '+ // greyish?
        'span.ddgrey { color: #555555; } ' //darker grey?
        );
    //	Add one or more CSS style rules to the document



if (loc.match(/:.+:/)){//if find 2 : then assume col
    allElementsE = document.evaluate(
        "//IMG[@title='energy']",
        document,
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null); 
    if (allElementsE.snapshotLength>0) {//ie found energy image. first shuld be what we want
        //eE=allElementsE.snapshotItem(0).nextSibling
        if(allElementsE.snapshotLength>=2){
            eE=allElementsE.snapshotItem(1).nextSibling
        }
        else{
            eE=allElementsE.snapshotItem(0).nextSibling
        }
        sE=eE.wholeText 
        stringmatch=sE.match(/([0-9]+).*\(([0-9]+)\)/)  
        iE=parseInt(stringmatch[2])//should get the number in bracket
        var newElement = document.createElement("span");
        spanstring='<span class="dgrey">';
        if (iE>(wantE+2)){//too big
            spanstring='<span class="dblue">';
        }
        else if (iE >= (wantE-resleeway)){//just right
            spanstring='<span class="dgreen">';
        }    
        else if (iE==wantE-(resleeway+1)){//oh so close
            spanstring='<span class="dyellow">';
        }
        else if (iE<=wantE-(resleeway+2)){//far too small
            spanstring='<span class="dred">';
        }
        newElement.innerHTML=" : "+stringmatch[1] +" ("+spanstring+stringmatch[2]+ '</span>'+")" ;
        eE.parentNode.replaceChild(newElement,eE);        
        
    }
    
    allElementsO = document.evaluate(
        "//IMG[@title='organic']",
        document,
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null); 
    if (allElementsO.snapshotLength>0) {//ie found energy image. first shuld be what we want
        //eO=allElementsO.snapshotItem(0).nextSibling
        if(allElementsO.snapshotLength>=2){
            eO=allElementsO.snapshotItem(1).nextSibling
        }
        else{
            eO=allElementsO.snapshotItem(0).nextSibling
        }
        sO=eO.wholeText 
        stringmatch=sO.match(/([0-9]+).*\(([0-9]+)\)/)  
        iO=parseInt(stringmatch[2])//should get the number in bracket
        var newElement2 = document.createElement("span");
        spanstring='<span class="dgrey">';
        if (iO>(wantO+2)){//too big
            spanstring='<span class="dblue">';
        }
        else if (iO >= (wantO-resleeway)){//just right
            spanstring='<span class="dgreen">';
        }    
        else if (iO==wantO-(resleeway+1)){//oh so close
            spanstring='<span class="dyellow">';
        }
        else if (iO<=wantO-(resleeway+2)){//far too small
            spanstring='<span class="dred">';
        }  
        newElement2.innerHTML=" : "+stringmatch[1] +" ("+spanstring+stringmatch[2]+ '</span>'+")" ;
        eO.parentNode.replaceChild(newElement2,eO);        
        
    }
    
    allElementsM = document.evaluate(
        "//IMG[@title='mineral']",
        document,
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null); 
    if (allElementsM.snapshotLength>0) {//ie found energy image. first shuld be what we want
        //eM=allElementsM.snapshotItem(0).nextSibling
        if(allElementsM.snapshotLength>=2){
            eM=allElementsM.snapshotItem(1).nextSibling
        }
        else{
            eM=allElementsM.snapshotItem(0).nextSibling
        }  
        sM=eM.wholeText 
        stringmatch=sM.match(/([0-9]+).*\(([0-9]+)\)/)  
        iM=parseInt(stringmatch[2])//should get the number in bracket
        var newElement3 = document.createElement("span");
        spanstring='<span class="dgrey">';
        if (iM>(wantM+2)){//too big
            spanstring='<span class="dblue">';
        }
        else if (iM >= (wantM-resleeway)){//just right
            spanstring='<span class="dgreen">';
        }    
        else if (iM==wantM-(resleeway+1)){//oh so close
            spanstring='<span class="dyellow">';
        }
        else if (iM<=wantM-(resleeway+2)){//far too small
            spanstring='<span class="dred">';
        }
 
            newElement3.innerHTML=" : "+stringmatch[1] +" ("+spanstring+stringmatch[2]+ '</span>'+")" ;
            eM.parentNode.replaceChild(newElement3,eM);        
        
    }

    allElementsH = document.evaluate(
        "//IMG[@title='population']",
        document,
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null); 
    if (allElementsH.snapshotLength>0 ) {//ie found energy image. first shuld be what we want
        if(allElementsH.snapshotLength>=2){
            eH=allElementsH.snapshotItem(1).nextSibling
        }
        else{
            eH=allElementsH.snapshotItem(0).nextSibling
        }    
        sH=eH.wholeText 
        stringmatch=sH.match(/([0-9]+).*\(([0-9]+)\)/)  
        iH=parseInt(stringmatch[2])//should get the number in bracket
        var newElement4 = document.createElement("span");
        spanstring='<span class="dgrey">';
        if (iH > (wantH+2)){//too big
            spanstring='<span class="dblue">';
        }
        else if (iH >= (wantH-hableeway)){//just right
            spanstring='<span class="dgreen">';
        }    
        else if (iH==wantH-(hableeway+1)){//oh so close
            spanstring='<span class="dyellow">';
        }
        else if (iH <= (wantH-(hableeway+2))){//far too small
            spanstring='<span class="dred">';
        }
        newElement4.innerHTML=" : "+stringmatch[1] +" ("+spanstring+stringmatch[2]+ '</span>'+")" ;
        eH.parentNode.replaceChild(newElement4,eH);        
        
    }

}
})();