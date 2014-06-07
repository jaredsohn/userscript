// ==UserScript==
// @name        ClickRevenge
// @description	Re-enables the right-click menu and select for many (all) sites
// @include		  *
// ==/UserScript==

(function() {

window.addEventListener('load', function(event) {

    //GM_log("The revenge has began - The Apocalypse also :) event.wrappedJSObject.type  = "+event.wrappedJSObject.type  );

    unsafeDocument = unsafeWindow['document'];
    try{
        unsafeWindow.$("*").unbind("contextmenu");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onselectstart");
    }catch(exc){}


    try{
        unsafeWindow.$("*").unbind("onmouseup");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onmousedown");
    }catch(exc){}

    try{
        unsafeWindow.jQuery(unsafeWindow).unbind('keypress'); // No keyblocking
    }catch(exc){}
    try{
        if(unsafeWindow.ProtectImg) unsafeWindow.ProtectImg = function(e) {return true;};
    }catch(exc){}


    unsafeDocument.oncontextmenu = function(){  return true;};
    unsafeDocument.onmousedown = function(){  return true;};
    unsafeDocument.onselectstart = function(){  return true;};

    unsafeDocument.onclick = function(){  return true;};

    var element = unsafeDocument.getElementById('content');
    if(element){
        element.onmousedown = function(){  return true;};
        element.onselectstart = function(){  return true;};
    }

    // Disabling by Prototype JS Framework
    if(unsafeDocument.observe) {
        unsafeDocument.stopObserving("contextmenu");
        unsafeDocument.stopObserving("mousedown");
        unsafeDocument.stopObserving("mouseup");
    }


    // Disabling of specific elements
    //var all = unsafeDocument.getElementsByTagName('*');
    //for each(var e in all) {
    //@onmouseover | @onclick |
    xpathElements = document.evaluate("//*[(@oncontextmenu | @onselectstart | @onmouseup | @onmousedown)]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        e = xpathElements.snapshotItem(i);
        try{
            e.oncontextmenu = null;
        }catch(exc){}
        try{
            e = e.wrappedJSObject || e;
            if(e.getAttribute("oncontextmenu")){
                e.setAttribute("oncontextmenu", null);
            }
        }catch(exc){}

        try{
            e.onselectstart = null;
        }catch(exc){}
        try{
            if(e.getAttribute("onselectstart")){
                e.setAttribute("onselectstart", null);
            }
        }catch(exc){}

        strName=""+e;
        //GM_log("strName="+strName);
        if(strName.indexOf("HTMLTableRowElement")<0){//Not TR
            //GM_log("THE TAG IS NOT TR strName="+strName);
            try{
                e.onmouseup = null;
            }catch(exc){}
            try{
                if(e.getAttribute("onmouseup")){
                    e.setAttribute("onmouseup", null);
                }
            }catch(exc){}

            try{
                e.onmousedown = null;
            }catch(exc){}
            try{
                if(e.getAttribute("onmousedown")){
                    e.setAttribute("onmousedown", null);
                }
            }catch(exc){}

        }
    }

    /**/
    var strCursorNone="cursor: none;";
    xpathElements =document.evaluate("//div[@style]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        thisElement = xpathElements.snapshotItem(i);
        //GM_log("Style to change: "+thisElement.style.wrappedJSObject.cssText);
        var txt = thisElement.style.wrappedJSObject.cssText;
        try{
            if(txt.indexOf("z-index:")>=0){
                thisElement.style.wrappedJSObject.cssText="z-index: -100000";//Hide it under the page
            }

            var iIndexOf=txt.indexOf(strCursorNone);
            if(iIndexOf>=0){
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+" cursor: auto; "+txt.substring(iIndexOf+strCursorNone.length);
                //GM_log("Style changed");
            }
        }catch(exc){//GM_log("Exception on thisElement.onmouseover = null");
        }
    }
    /**/

    //Processing Select STYLE property
    var strMozUsrSelect="-moz-user-select";
    var strWebkitUserSelect="-webkit-user-select";
    var strColor1="-moz-selection";
    var strColor2="selection";
    var strUsrSelect="user-select";
    var strCursor="cursor";

    xpathElements =document.evaluate("//*[@style]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        thisElement = xpathElements.snapshotItem(i);
        //GM_log("Style to change: "+thisElement.style.wrappedJSObject.cssText);
        var txt = thisElement.style.wrappedJSObject.cssText;
        try{
            var iIndexOf=txt.indexOf(strMozUsrSelect);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed");
            }

            iIndexOf=txt.indexOf(strWebkitUserSelect);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed");
            }

            iIndexOf=txt.indexOf(strColor1);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed");
            }

            iIndexOf=txt.indexOf(strColor2);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed");
            }

            iIndexOf=txt.indexOf(strUsrSelect);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed now it is: "+thisElement.style.wrappedJSObject.cssText);
            }


            iIndexOf=txt.indexOf(strCursor);
            if(iIndexOf>=0){
                iIndexOfComa=txt.indexOf(";",iIndexOf);
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa+1);//1 is the size of coma
                //GM_log("Style changed now it is: "+thisElement.style.wrappedJSObject.cssText);
            }

        }catch(exc){//
            GM_log("Exception on style processing");
        }
    }//End of style processing



    try{
        //GM_log("processing Classes BEGIN");
        var styleSheetList = document.styleSheets;
        var styleSheetsNum = document.styleSheets.length;//unsafeDocument
        //GM_log("processClasses() styleSheetsNum = "+styleSheetsNum);
        for (var i = 0; i < styleSheetsNum; i++) {
            try{
                //GM_log("processing Classes document.styleSheets["+i+"].cssRules.length = "+document.styleSheets[i].cssRules.length);
                for (var j = 0; j < document.styleSheets[i].cssRules.length; j++) {
                    sheet = document.styleSheets[i].cssRules[j].cssText;
                    //GM_log("processClasses() sheet i="+ i +" and j = "+ j +" sheet= "+sheet);
                    //GM_log("processClasses() document.styleSheets[i].cssRules[1].cssText = "+document.styleSheets[i].cssRules[1].cssText);
                    if(sheet != undefined )
                    {
                        //GM_log("processClasses() DEFINED");
                        iIndexOf = sheet.indexOf(strMozUsrSelect);
                        if(iIndexOf>=0){
                            var cssRule = document.styleSheets[i].cssRules[j];
                            cssRule.style.removeProperty(strMozUsrSelect);
                            cssRule.style.removeProperty(strWebkitUserSelect);
                            cssRule.style.removeProperty(strUsrSelect);
                            cssRule.style.removeProperty(strCursor);
                            cssRule.style.removeProperty(strColor1);
                            cssRule.style.removeProperty(strColor2);
                        }
                    }
                }

            }catch(exc){//
                GM_log("Exception on processing Classes = "+exc);
                GM_log("Exception is in document.styleSheets[i].href = "+document.styleSheets[i].href);
            }
        }
        //GM_log("~processing Classes ENDED");
    }catch(exc){//
        GM_log("Exception on Classes style processing");
    }
        
        //Load method continues here
        
        

}, 'false');



})(); // end anonymous function wrapper


//console.log("Adding menu for revenge");
//GM_log("Adding menu for revenge");

function revenge(){

    unsafeDocument = unsafeWindow['document'];

    try{
        unsafeWindow.$("*").unbind("contextmenu");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onselectstart");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onmouseup");
    }catch(exc){}


    try{
        unsafeWindow.$("*").unbind("onmousedown");
    }catch(exc){}

    try{
        unsafeWindow.jQuery(unsafeWindow).unbind('keypress'); // No keyblocking
    }catch(exc){}
    try{
        if(unsafeWindow.ProtectImg) unsafeWindow.ProtectImg = function(e) {return true;};
    }catch(exc){}

    unsafeDocument.oncontextmenu = function(){  return true;};
    unsafeDocument.onmousedown = function(){  return true;};
    unsafeDocument.onmouseup = function(){  return true;};
    unsafeDocument.onselectstart = function(){  return true;};

    unsafeDocument.onclick = function(){  return true;};

    var element = unsafeDocument.getElementById('content');
    if(element){
        element.onmousedown = function(){  return true;};
        element.onselectstart = function(){  return true;};
    }

    // Disabling by Prototype JS Framework
    if(unsafeDocument.observe) {
        unsafeDocument.stopObserving("contextmenu");
        unsafeDocument.stopObserving("mousedown");
        unsafeDocument.stopObserving("mouseup");
    }

    processClasses();

    // Disabling of specific elements
    processElements();
    processZOrder();

    processSelectStyle();

    try{
        GM_log("Dumper ========================================================");
        GM_log("Dumping unsafeDocument.onselectstart ="+unsafeDocument.onselectstart);
        GM_log("Dumping unsafeDocument.onmouseup ="+unsafeDocument.onmouseup);
        GM_log("Dumping unsafeDocument.onmousedown ="+unsafeDocument.onmousedown);
        GM_log("Dumping unsafeDocument.oncontextmenu ="+unsafeDocument.oncontextmenu);
        GM_log("Dumping unsafeDocument.onclick ="+unsafeDocument.onclick);

        GM_log("Dumping document.onselectstart ="+document.onselectstart);
        //GM_log("Dumping document.onmouseup ="+document.onmouseup);
        //GM_log("Dumping document.onmousedown ="+document.onmousedown);
        //GM_log("Dumping document.oncontextmenu ="+document.oncontextmenu);
        //GM_log("Dumping document.onclick ="+document.onclick);

        GM_log("Dumper ========================================================");
    }catch(exc){
        GM_log("Exception ="+exc);
    }
}



function revenge2Null(){

    unsafeDocument = unsafeWindow['document'];

    try{
        unsafeWindow.$("*").unbind("contextmenu");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onselectstart");
    }catch(exc){}

    try{
        unsafeWindow.$("*").unbind("onmouseup");
    }catch(exc){}


    try{
        unsafeWindow.$("*").unbind("onmousedown");
    }catch(exc){}

    try{
        unsafeWindow.jQuery(unsafeWindow).unbind('keypress'); // No keyblocking
    }catch(exc){}
    try{
        if(unsafeWindow.ProtectImg) unsafeWindow.ProtectImg = function(e) {return true;};
    }catch(exc){}
    try{
        if(e.getAttribute("unselectable")){
            e.setAttribute("unselectable", "off");
        }
    }catch(exc){}


    unsafeDocument.oncontextmenu = null;
    unsafeDocument.onmousedown = null;
    unsafeDocument.onmouseup = null;
    unsafeDocument.onselectstart = null;

    unsafeDocument.onclick = null;

    var element = unsafeDocument.getElementById('content');
    if(element){
        element.onmousedown = null;
        element.onselectstart = null;
    }

    // Disabling by Prototype JS Framework
    if(unsafeDocument.observe) {
        unsafeDocument.stopObserving("contextmenu");
        unsafeDocument.stopObserving("mousedown");
        unsafeDocument.stopObserving("mouseup");
    }

    /*
    try{
        unsafeDocument.css.MozUserSelect="text";
    }catch(exc){GM_log("unsafeDocument.css.MozUserSelect Exception ="+exc);}
    */

    processClasses();

    // Disabling of specific elements
    processElements();

    processZOrder();

    processSelectStyle();

    try{
        GM_log("Dumper ========================================================");
        GM_log("Dumping unsafeDocument.onselectstart ="+unsafeDocument.onselectstart);
        GM_log("Dumping unsafeDocument.onmouseup ="+unsafeDocument.onmouseup);
        GM_log("Dumping unsafeDocument.onmousedown ="+unsafeDocument.onmousedown);
        GM_log("Dumping unsafeDocument.oncontextmenu ="+unsafeDocument.oncontextmenu);
        GM_log("Dumping unsafeDocument.onclick ="+unsafeDocument.onclick);

        GM_log("Dumping document.onselectstart ="+document.onselectstart);
        //GM_log("Dumping document.onmouseup ="+document.onmouseup);
        //GM_log("Dumping document.onmousedown ="+document.onmousedown);
        //GM_log("Dumping document.oncontextmenu ="+document.oncontextmenu);
        //GM_log("Dumping document.onclick ="+document.onclick);

        GM_log("Dumper ========================================================");
    }catch(exc){
        GM_log("Exception ="+exc);
    }
}


function revengeMouse(){
   //alert("The revenge started");

    processClasses();

    processElements();

    processZOrder();

    processSelectStyle();


    //http://www.bebezona.bg
    /*
    try{
		unsafeDocument.css({
		  'MozUserSelect':''
		}).unbind('selectstart').mousedown(function() {
		  return true;
		});
    }catch(exc){GM_log("Exception on unsafeDocument.css");}


    try{
		unsafeDocument.css({
		  'MozUserSelect':''
		})="text";
    }catch(exc){GM_log("Exception on unsafeDocument.css MozUserSelect text");}

/*
		$('body').css({
		  'MozUserSelect':''
		}).unbind('selectstart').mousedown(function() {
		  return true;
		});

    $(document).bind("contextmenu",function(e){
        return true;
    });


    $(unsafeDocument).bind("contextmenu",function(e){
        return true;
    });
*/
    //alert("Revenged");

    //~ http://www.bebezona.bg

}

function processZOrder()
{
    var strCursorNone="cursor: none;";
    xpathElements =document.evaluate("//div[@style]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        thisElement = xpathElements.snapshotItem(i);
        //GM_log("Style to change: "+thisElement.style.wrappedJSObject.cssText);
        var txt = thisElement.style.wrappedJSObject.cssText;
        try{
            if(txt.indexOf("z-index:")>=0){
                thisElement.style.wrappedJSObject.cssText="z-index: -100000";//Hide it under the page
            }

            var iIndexOf=txt.indexOf(strCursorNone);
            if(iIndexOf>=0){
                thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOf+strCursorNone.length);
                //GM_log("Style changed");
            }
        }catch(exc){//GM_log("Exception on thisElement.onmouseover = null");
        }
    }
}


var strMozUsrSelect="-moz-user-select";
var strWebkitUserSelect="-webkit-user-select";
var strColor1="-moz-selection";
var strColor2="selection";
var strUsrSelect="user-select";

function processSelectStyle()
{
    xpathElements =document.evaluate("//*[@style]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        thisElement = xpathElements.snapshotItem(i);
        //GM_log("Style to change: "+thisElement.style.wrappedJSObject.cssText);

        try{
            removeStyleFromElement(thisElement,strMozUsrSelect);
            removeStyleFromElement(thisElement,strWebkitUserSelect);
            removeStyleFromElement(thisElement,"cursor");
            removeStyleFromElement(thisElement,strColor1);
            removeStyleFromElement(thisElement,strColor2);
            removeStyleFromElement(thisElement,strUsrSelect);
        }catch(exc){//
            GM_log("Exception on processSelectStyle = null");
        }
    }

}

function removeStyleFromElement(thisElement,strToSearch)
{
    var txt = thisElement.style.wrappedJSObject.cssText;
    iIndexOf=txt.indexOf(strToSearch);
    if(iIndexOf>=0){
        iIndexOfComa=txt.indexOf(";",iIndexOf)+1;//1 is the size of coma
        if(iIndexOfComa>txt.length) iIndexOfComa=txt.length;
        thisElement.style.wrappedJSObject.cssText = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa);
        //GM_log("Style removed "+strToSearch+" in ");
    }
}
var strCursor="cursor";
function processClasses()
{
    GM_log("processClasses()");
    var styleSheetList = document.styleSheets;
    var styleSheetsNum = document.styleSheets.length;//unsafeDocument
    GM_log("processClasses() styleSheetsNum = "+styleSheetsNum);

    for (var i = 0; i < styleSheetsNum; i++) {
        try{
            //sheet = document.styleSheets[i].cssRules[0].cssText;
            //GM_log("processClasses() sheet = "+sheet);
            for (var j = 0; j < document.styleSheets[i].cssRules.length; j++) {
                sheet = document.styleSheets[i].cssRules[j].cssText;
                //GM_log("processClasses() sheet i and j = "+sheet);
                //GM_log("processClasses() document.styleSheets[i].cssRules[1].cssText = "+document.styleSheets[i].cssRules[1].cssText);
                if(sheet != undefined )
                {
                    //GM_log("processClasses() DEFINED");
                    /* */
                    sheet = removeStyleFromClass(sheet,strMozUsrSelect,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    sheet = removeStyleFromClass(sheet,strWebkitUserSelect,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    sheet = removeStyleFromClass(sheet,strUsrSelect,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    sheet = removeStyleFromClass(sheet,strCursor,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    sheet = removeStyleFromClass(sheet,strColor1,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    sheet = removeStyleFromClass(sheet,strColor2,document.styleSheets[i].href,document.styleSheets[i].cssRules[j]);
                    //document.styleSheets[i].cssRules[j].cssText=sheet;
                    /*
                    cssRule = document.styleSheets[i].cssRules[j];
                    cssRule.style.removeProperty(strMozUsrSelect);
                    cssRule.style.removeProperty(strWebkitUserSelect);
                    cssRule.style.removeProperty(strUsrSelect);
                    cssRule.style.removeProperty(strCursor);
                    cssRule.style.removeProperty(strColor1);
                    cssRule.style.removeProperty(strColor2);
                    */
                }
            }

        }catch(exc){//
            GM_log("Exception on processClasses = "+exc);
            GM_log("Exception is in document.styleSheets[i].href = "+document.styleSheets[i].href);
        }
    }
    GM_log("~processClasses()");
}

function removeStyleFromClass(txt,strToSearch,strHref,cssRule)
{
    iIndexOf = txt.indexOf(strToSearch);
    if(iIndexOf>=0){
        //iIndexOfComa=txt.indexOf(";",iIndexOf)+1;//1 is the size of coma
        //if(iIndexOfComa>txt.length) iIndexOfComa=txt.length;
        /*
        if(txt.indexOf("product-description")>=0){
            GM_log("removeStyleFromClass() txt = "+txt+" strToSearch = "+strToSearch);
        }
        */
        //txt = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa);
        //eval(cssRule+".style."+strToSearch+"=\"text\"");
        //cssRule.style[strToSearch]="text";
        cssRule.style.removeProperty(strToSearch);
        /*
        if(txt.indexOf("product-description")>=0){
            GM_log("removeStyleFromClass() txt = "+txt+" strToSearch = "+strToSearch);
            txt = cssRule.cssText;
            GM_log("In document.styleSheets[i].href = "+strHref);
            GM_log("Class style removed "+strToSearch+" now it is: "+txt);
            alert(cssRule.style);
        }
        */
    }
    return txt;
}

// Disabling of specific elements
function processElements()
{
    //var all = unsafeDocument.getElementsByTagName('*');
    //for each(var e in all) {
    //@onmouseover | @onclick |
    xpathElements = document.evaluate("//*[(@oncontextmenu | @onmouseup | @onmousedown | @onselectstart | @unselectable)]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < xpathElements.snapshotLength; i++) {
        e = xpathElements.snapshotItem(i);
        try{
            e.oncontextmenu = null;
        }catch(exc){}
        try{
            e = e.wrappedJSObject || e;
            if(e.getAttribute("oncontextmenu")){
                e.setAttribute("oncontextmenu", null);
            }
        }catch(exc){}

        try{
            e.onselectstart = null;
        }catch(exc){}
        try{
            if(e.getAttribute("onselectstart")){
                e.setAttribute("onselectstart",null);
            }
        }catch(exc){}
        try{
            if(e.getAttribute("unselectable")){
                e.setAttribute("unselectable", "off");
            }
        }catch(exc){}

        strName=""+e;
        //GM_log("strName="+strName);
        if(strName.indexOf("HTMLTableRowElement")<0){//Not TR
            //GM_log("THE TAG IS NOT TR strName="+strName);
            try{
                e.onmouseup = null;
            }catch(exc){}
            try{
                if(e.getAttribute("onmouseup")){
                    e.setAttribute("onmouseup", null);
                }
            }catch(exc){}

            try{
                e.onmousedown = null;
            }catch(exc){}
            try{
                if(e.getAttribute("onmousedown")){
                    e.setAttribute("onmousedown", null);
                }
            }catch(exc){}

            try{
                if(e.getAttribute("unselectable")){
                    e.setAttribute("unselectable", "off");
                }
            }catch(exc){}
        }
    }

}

function searchInCss()
{
    var str = prompt("Enter what to search in css:");
    GM_log("searchInCss()");
    var styleSheetList = document.styleSheets;
    var styleSheetsNum = document.styleSheets.length;//unsafeDocument
    GM_log("searchInCss() styleSheetsNum = "+styleSheetsNum);

    for (var i = 0; i < styleSheetsNum; i++) {
        try{
            //sheet = document.styleSheets[i].cssRules[0].cssText;
            //GM_log("searchInCss() sheet = "+sheet);
            GM_log("searchInCss() document.styleSheets[i].href = "+document.styleSheets[i].href);
            for (var j = 0; j < document.styleSheets[i].cssRules.length; j++) {
                sheet = document.styleSheets[i].cssRules[j].cssText;
                //GM_log("searchInCss() sheet i and j = "+sheet);
                //GM_log("searchInCss() document.styleSheets[i].cssRules[1].cssText = "+document.styleSheets[i].cssRules[1].cssText);
                if(sheet != undefined )
                {
                    //GM_log("processClasses() DEFINED");
                    //sheet = removeStyleFromClass(sheet,strMozUsrSelect);
                    //sheet = removeStyleFromClass(sheet,strWebkitUserSelect);
                    //sheet = removeStyleFromClass(sheet,"cursor");
                    //sheet = removeStyleFromClass(sheet,strColor1);
                    //sheet = removeStyleFromClass(sheet,strColor2);
                    //sheet = searchText(sheet,strColor2);
                    sheet = searchText(sheet,str);
                }
            }
        }catch(exc){//
            GM_log("Exception on searchInCss = "+exc);
        }
    }
    GM_log("~searchInCss()");
}

function searchText(txt,strToSearch)
{
    //GM_log("searchText()");
    iIndexOf=txt.indexOf(strToSearch);
    if(iIndexOf>=0){
        iIndexOfComa=txt.indexOf(";",iIndexOf)+1;//1 is the size of coma
        if(iIndexOfComa>txt.length) iIndexOfComa=txt.length;
        if(iIndexOfComa<strToSearch.length) iIndexOfComa=strToSearch.length;
        //txt = txt.substring(0,iIndexOf)+txt.substring(iIndexOfComa);
        GM_log("Style found: '"+txt.substring(iIndexOf,iIndexOfComa)+"'");
        //GM_log("Style changed");
    }
    //GM_log("~searchText()");
    return txt;
}
//GM_log("Adding menu for revenge");

    GM_registerMenuCommand("Click Revenge now", revenge, "r", "shift alt", "R");
    GM_registerMenuCommand("Click Revenge 2 Null now", revenge2Null, "L", "shift alt", "L");
    GM_registerMenuCommand("Click Revenge Mouse events now", revengeMouse, "m", "shift alt", "M");
    GM_registerMenuCommand("Search Revenge", searchInCss, "s", "shift alt", "S");


    //console.log("AddED menu for revenge");
