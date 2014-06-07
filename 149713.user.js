// ==UserScript==
// @name        Improve OpenAir.com
// @namespace   Improve OpenAir.com
// @description Improve OpenAir.com
// @author		Lothar Geisinger
// @include     *.openair.com/timesheet*

// @version     0.02
// ==/UserScript==

var frameref = null;

function enlargeTimesheetWidth() {
    var iTimesheetWidth=3200;
    alert("");
    frameref=window.frames['iframeOA'];
    frameref.jQuery('#timesheet_grid').width(10000);
    
    
    oDivs = frameref.document.getElementsByTagName("div");   
    for (iCountDivs=0; iCountDivs<oDivs.length; iCountDivs++){
        aDiv = oDivs[iCountDivs];
        if ((aDiv.className == "gridbox") || (aDiv.className == "xhdr") || (aDiv.className == "objbox") || (aDiv.className == "ftr") ) {    
            aDiv.style.width = iTimesheetWidth + "px";  
            aDiv.style.overflow='hidden';
        }
        
        // if (aDiv.className=="gridbox") { aDiv.style.position='fixed'; }
    }
    
    window.setTimeout("enlargeTimesheetWidth()", 5000);
}

function enlargeProjectSelectBoxes() {

    frameref = eval("parent.iframeOA");

    oSelects = frameref.document.getElementsByTagName("select");
    for (iCountSelects=0; iCountSelects<oSelects.length; iCountSelects++) {
        oSel = oSelects[iCountSelects];
        if (oSel.className == "dhx_combo_select") {
            oSel.size=60;
            oSel.style.width='600px';            
        }    
    }
    
    window.setTimeout("enlargeProjectSelectBoxes()", 500);
}

function createIframeAndHostJavaScript(){
    //document.body.innerHTML='<iframe name="iframeOA" src="'+document.location.href+'" width="90%" border="0" height="400" style="width:'+(screen.width-50)+'px;height:'+(screen.height-100)+'px"></iframe>';
    document.write('<html><frameset rows="50,*"><frame src="about:blank" name="improveOA"><frame src="'+document.location.href+'" name="iframeOA"></frameset>');
    document.close();
    var d = window.frames['improveOA'].document;
    d.write("Test");
    d.close();
    
    //var frameref = eval("parent.iframeOA");
	//frameref.location.href = document.location.href;
}

function a() { alert(""); }

function improveOA() {

    createIframeAndHostJavaScript();
    
    setTimeout("a();",1000);
    
	
	//enlargeProjectSelectBoxes();
	setTimeout("enlargeTimesheetWidth()", 5000);
	
	//document.body.style.overflow='hidden';

} improveOA();