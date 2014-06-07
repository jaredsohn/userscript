// ==UserScript==
// @name          MythWeaving
// @namespace     http://myth-weavers.com/
// @description	  MW Select Date Format--Wide Edit-- GM Open ALL sheets in tabs
// @include       http://*yth-weavers.com/*     
// @author 	  plugsy 	
// ==/UserScript==


/** *************************************************************************************************
This is a quick adaptation to achieve a couple of user requests at Myth-Weavers and have these installable in one single GM script. 

Version 0.0.2 Added option to enable/disable wide edit via UserCP

**********************************************************************************************************************/

const $xpath = '//body//text()';
const $date  = new RegExp(

      '(?:\\b(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\\d{4}|\\d{2})\\b(?!-))'
    + '|'
    + '(?:\\b(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(\\d{4}|\\d{2})\\b(?!/))',
    'g'
);
//              Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
const $days = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]; 




var WideBox = 0; // On/Off toggle setting for wider textarea
var DateFormat = 0;  // date format choice
var i=0;
var sheetsList = new Array(0);//list of links to sheetS FOR GROUPING IN FUTURE WORK


// Ensure we only execute the part of the script relevant to the page type
// thus preventing excessive processing AND more importantly unforseen actions 
//  

GM_log("The current location href ================ " + location.href);

if(location.href.match("usercp")){
	do_ucp();
} else if(location.href.match("gmscreen") ){
	do_gm();
} else {
	// check if it's a thread being edited or added to - this is to prevent attempting the 		// wider box on newthread which causes errors - fix it later
	GM_log("href is " + location.href);
	if(location.href.match("newreply") || location.href.match("showthread")){
		//var wideBoxOption=1
		WideBox = GM_getValue('gm_WideBox','0');
		if(WideBox){
			do_mod_edit_box();
		}
	}
}

do_dates();


function do_dates(){
	var $nodes  = document.evaluate($xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	loadDateVars();
	for (var $i = 0; $i < $nodes.snapshotLength; ++$i) 
	{
		var $text = $nodes.snapshotItem($i);
		$text.data = $text.data.replace($date, $replace);
	}
	
}



	




function open_sheet_tabs(){
	var links = $('href');
	i=0;
	for each (var elem in links) {
        	test = elem.href.match("sheets\/view.php");
		if(test)
		{	
			GM_log(elem + " href=  " + elem.href );
        		test = elem.href.match("sheets\/view.php");
			GM_log("test = " + test);
			if(i != 0 ){ // the first one has a sheet id of 0 so ignore it
    				openTab(elem.href);
			}
			i++;	
		}
	
	}
}
function do_gm(){

	var button_placer = $('Save');
	var d = button_placer[0];

    	GM_log(d + ' button' );
        
	var buttonGMtabs = document.createElement("input");
	buttonGMtabs.value = "Open All Sheets in Tabs";
	buttonGMtabs.type = "button";
	buttonGMtabs.addEventListener("click", open_sheet_tabs, true);
	var nextbutton = insertAfter(buttonGMtabs, d.parentNode);
	
	
}



// tab opening function (needs checking and work for opera & konqueror
function openTab(url) {
	if (window.addEventListener)
		GM_openInTab(url);
	else
		PRO_openInTab(url, 2);  // makes it work in IE with IE7Pro plugin but other 
					// changes need making to allow the whole script to work 
                              		// but I guess the question is~~~~ as the site specifically 
					// does not support IE do I want this here??
 }


function insertAfter(insert, after){ 
	return after.parentNode.insertBefore(insert, after.nextSibling); 
}

function $() {
	var elements = new Array();
	for (var i=0,len=arguments.length;i<len;i++) {
		var element = arguments[i];
		if (typeof element == 'string') {
			var matched = document.getElementById(element);
			if (matched) {
				elements.push(matched);
			} else {
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				var regexp = new RegExp('(^| )'+element+'( |$)');
				for (var i=0,len=allels.length;i<len;i++) if (regexp.test(allels[i].className)) elements.push(allels[i]);
			}
			if (!elements.length) elements = document.getElementsByTagName(element);
			if (!elements.length) {
				elements = new Array();
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				for (var i=0,len=allels.length;i<len;i++) if (allels[i].getAttribute(element)) elements.push(allels[i]);
			}
			if (!elements.length) {
				var allels = (document.all) ? document.all : document.getElementsByTagName('*');
				for (var i=0,len=allels.length;i<len;i++){
					if (allels[i].attributes){
						for (var j=0,lenn=allels[i].attributes.length;j<lenn;j++){
							if (allels[i].attributes[j].specified){
								if (allels[i].attributes[j].nodeValue == element){
									elements.push(allels[i]);
								}
							}
						}
					}
				}
			}
		} else {
			elements.push(element);
		}
	}
        return elements;
}
function loadDateVars() {
   DateFormat = GM_getValue('gm_DateType','0');

}

function set_WideBox(){
	// toggle the textarea width choice
	if(WideBox){
		GM_log("widebox true" + WideBox);
		WideBox=0;
	}else{
		GM_log("widebox not"+ WideBox);
		WideBox=1;
	}
	// save choice to config 
	GM_setValue('gm_WideBox', WideBox);
     

}
function set_format_1(){
	DateFormat=0;
	GM_setValue('gm_DateType', DateFormat);
        GM_log('DateType Value GM attrib set to : ' + DateFormat);

}
function set_format_2(){
	DateFormat=1;
	GM_setValue('gm_DateType', DateFormat);
        GM_log('DateType Value GM attrib set to : ' + DateFormat);

}function set_format_3(){
	DateFormat=2;
	GM_setValue('gm_DateType', DateFormat);
        GM_log('DateType Value GM attrib set to : ' + DateFormat);

}

function $leap_year ($year) {
    if (($year % 400) == 0) {           // multiples of 400 are leap years
        return true;
    } else if (($year % 100) == 0) {    // the remaining multiples of 100 are not leap years
        return false;
    } else if (($year % 4) == 0) {      // the remaining multiples of 4 are leap years
        return true;
    } else {                            // the rest are common years
        return false;
    }
}
// https://bugzilla.mozilla.org/show_bug.cgi?id=392378



function $replace ($match, $m1, $d1, $y1, $m2, $d2, $y2, $offset, $string) {
    	var $year  = $y1 || $y2; // depending on the above, non-matches are either empty or undefined, both of which are false
    	var $month = $m1 || $m2;
    	var $day   = $d1 || $d2;
    	// Do nothing if DateFormat is 0
    	if( DateFormat <= 0)
    	{
        	return $match;
    	}

   	// manual negative look-behind: see: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
    	if ($offset > 0) {
        	var $prefix = $string[$offset - 1];
        	if (($prefix == '-') || ($prefix == '/')) {
            		return $match;
        	}
    	}

    	if ($day > $days[$month - 1]) {
        	return $match;
    	}
    	if ($year.length == 2) {
        	// Internet Founding Fathers, forgive us. From the epoch to 1999, we knew not what to do...
        	$year = ((($year >= 70) && ($year <= 99)) ? '19' : '20') + $year;
    	}
    	if (($month == '02') && ($day == '29') && !$leap_year($year)) {
        	return $match;
    	}
    	GM_log('Date format = ' + DateFormat);	
    	if( DateFormat == 1)
    	{
		return $year + '-' + $month + '-' + $day;
    	}
    	if( DateFormat == 2){
	 	return $day + '-' + $month + '-' + $year;
	}	
}


/** This section holds the edit box stuff   *************************************/







function do_mod_edit_box(){

	var QR= document.getElementById ("vB_Editor_QR_textarea");  

	if (!document.getElementById('collapseobj_quickreply') && !document.getElementById('collapseobj_newpost_options') ) 
	return; //double check right page and esc from wrong page type

	if (QR) {  // this is the "Quick Reply"
   	         // Plugsy comment out 4 now    QR.removeAttribute ("style");   
		QR.setAttribute ("cols", "80");  // was 60.
	}
   	else {  // Main editing page
		var panelsurround= document.evaluate ("//td[@class='panelsurround']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		// get rid of ((align="center")) in this TD.
  		panelsurround.removeAttribute ("align");
  		var panel= panelsurround.getElementsByTagName ("DIV") [0];
		var innerdiv= panel.getElementsByTagName ("DIV") [0];
  		// get rid of evil "640px"
  		innerdiv.removeAttribute ("style");
 		 // let Title: be longer.  Set size to same as maxlength which is 85.
		var x= document.evaluate ("//input[@name='title']", panel, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  		x.setAttribute ("size", "85");


		var smiles= document.getElementById ("vB_Editor_001_smiliebox");
		if (smiles){// transform orcs panel
			var tr_s = smiles.getElementsByTagName("TR")[0]; // the unique TR
			for( var i = 1; smiles.getElementsByTagName("TR").length != 1 ; ) {
				var tr_si = smiles.getElementsByTagName("TR")[i]; // other TR
				for( var j = 0; j < tr_si.getElementsByTagName("TD").length; j++ ) {
					var td_sj = tr_si.getElementsByTagName("TD")[j]; // each TD
					tr_s.appendChild(td_sj.cloneNode(true)); // clone it and add it to unique TR
				}
				smiles.getElementsByTagName("TBODY")[0].removeChild(tr_si); // remove other TR
			}
			smiles= smiles.parentNode; // this is the TD that contains smiles
			var TR = smiles.parentNode; // the TR that contains the editor and smiles	
			var nTR = TR.parentNode.insertRow(1); // new TR below the editor
			nTR.appendChild(smiles); // add it the node
		}
		// set things to full width, starting from the top so each can reference the
		// new size of the parent.  IOW, re-layout the thing.
		 var x= innerdiv.getElementsByTagName ("table") [1];
  		x.style.width= "100%";
  		x= document.getElementById ("vB_Editor_001");
  		x= x.getElementsByTagName ("table") [0];
  		x.width= "100%";
  		x= document.getElementById ("vB_Editor_001_textarea");

		// is hard-coded to 540px and also has a height in the same style attribute

  		x.setAttribute ("style", "width:100%");  // remove height, let rows take precidence.
		x.setAttribute ("rows", "20");  // no reason to scrimp.
	}
}


function do_ucp(){

	var pg_usercp = $('profile.php?do=editsignature');
	var d = pg_usercp;
   	
	for each (var d in pg_usercp) {
     
    		GM_log(d+ ' #Name=' + d.name + ' #Id=' + d.id + ' #title=' + d.title + ' #href=' + d.href );
        
		var buttonUS = document.createElement("input");
		buttonUS.value = "  Date US format";
		buttonUS.type = "button";
		buttonUS.addEventListener("click", set_format_1, true);
		var nextbutton = insertAfter(buttonUS, d.parentNode.parentNode.parentNode);

	    	var buttonISO = document.createElement("input");
		buttonISO.value = " Date ISO format";
		buttonISO.type = "button";
		buttonISO.addEventListener("click", set_format_2, true);
		nextbutton = insertAfter(buttonISO, nextbutton);

		var buttonUK = document.createElement("input");
		buttonUK.value = "  Date UK format";
		buttonUK.type = "button";
		buttonUK.addEventListener("click", set_format_3, true);
		nextbutton = insertAfter(buttonUK, nextbutton);

		var buttonUK = document.createElement("input");
		buttonUK.value = "  Toggle WideEdit";
		buttonUK.type = "button";
		buttonUK.addEventListener("click", set_WideBox, true);
		nextbutton = insertAfter(buttonUK, nextbutton);

	}
    
}


