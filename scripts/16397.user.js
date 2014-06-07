// ==UserScript==
// @name           paradiseTime
// @namespace      http://www.radioparadise.com/content.php?name=Playlist
// @include        
// ==/UserScript==

// Inspiration for building page from:
// http://diveintogreasemonkey.org/casestudy/dumbquotes.html
// script written by David Dill 12/2007  

(function(){
/********************************************
* ALLOWS MANUAL SETTING OF TIME ADJUSTMENT  *
* Set manualTimeSet to 999 to disable. Set  *
* adjustment value (may use +/- and/or half *
* hours) to activate manual adjustment      *
********************************************/
    var manualTimeSet=999;

/***************************************************************************
* CHANGES 'LISTEN' BUTTON ON PLAYLIST PAGE TO YOUR FAVORITE STREAM CONNECT *
* Set LISTEN_LINK to "" to disable. Set LISTEN_LINK - go to Listen page,   *
* right click link for Stream and select 'Properties' menu item. Copy      *
* URL into LISTEN_LINK variable as in example below:                       *
* var LISTEN_LINK="musiclinks/rp_192.m3u";                                 *
* (earlier version required whole URL - now LISTEN_LINK is concatenated    * 
* with base http://www.radioparadise.com/ to url)                          *
* format changed to "musiclinks/rp_128-1.m3u" with RP Playlist update      *
* also - added TIME_ZONE variable (enter your time zone); new RP format    *
* also removes Listen button; I hijack 'Help & Info' and change to Listen  *
***************************************************************************/
//    Old style LISTEN_LINK
//    var LISTEN_LINK="http://www.radioparadise.com/musiclinks/rp_128-1.m3u";
//    New style LISTEN_LINK - since website update
      var LISTEN_LINK="musiclinks/rp_128-1.m3u";
      var YOUR_TIME_ZONE="PST";

/***** UPDATE PLAYLIST TIMES TO LOCAL TIME *****/
    var calGmtOffset=8;                      // amount California is ahead of GMT    
    var machineTime = new Date();            // Date object used to get machine time/hours
    var machineHour=machineTime.getHours();
    var re=/((\d+):(\d{2})\s([a|p]m)).*/;    // regular expression to find time values
    var textnodes = document.evaluate(       // get all lines of text from Radio Paradise page
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
    var s="";                 // set up variables used below
    var m="";                 // minutes string
    var h="";                 // hours string
    var t="";                 // time string
    var ap="";                // am/pm string
    var x=0;                  // hours numerical
    var y=0;                  // minutes numberical
    var f=0;                  // minutes fraction numerical
    var gmtOffset=0;          // time zone offset from GMT
    var ct=new Date();        // data object
    var getOffSet=0;          // variable so offset is calculated only once	
    var re2=/Help\s&\sInfo/;  // regular expression to find 'Help & Info' label
    var re3=/PST/;            // regular expression to find 'PST' time zone label

    for(i=0; i<textnodes.snapshotLength; i++) {
		s=textnodes.snapshotItem(i).data;      // loop through each line of text on page
		if(s.match(re)){                       // if it matches regular expression,
			x=parseInt(RegExp.$2);               // pull out hours,
			y=parseInt(RegExp.$3);               // minutes,
			ap=RegExp.$4;                        // and am or pm
	
			if(ap=="pm"){                        // if PM and hour not equal 12, add 12 to hour value (gives 24 hr. time)
				x=x<12?x+12:x;                     // if hour is greater than add 12 to get PM times
			}
			else{                                // if AM and hour equal to 12, set value to 0 (again, 24 hr. time)
				x=x==12?0:x;
			}
			if(getOffSet==0){
				if(manualTimeSet!=999){            // if manualTimeSet not equal 999, use it to adjust time            
					adjustment=manualTimeSet;
				}
				else{                              // if manualTimeSet equals 999 calculate time offset from machine time
					gmtOffset=machineTime.getTimezoneOffset()/60; // gets local offset from GMT in hours
					adjustment=calGmtOffset-gmtOffset;            // adjustment based on cal and local offset
				}
				getOffSet=1;
			}
			y+=adjustment*60;                    // calculate adjustment in minutes and add 
			ct.setHours(x,y);                    // set time object with adjusted hours and minutes
			y=ct.getMinutes();                   // get minutes from time object
			x=ct.getHours();		                 // get hours from time object
			if(x==0){                            // Translate time back to 12 hr clock - 
				x=12;                              // if hours is 0, set time to 12 am
				ap="am";
			}
			else{                                // if hour not 0,
				ap=x<12?"am":"pm";                 // get am/pm value
				x=x>12?x-12:x;                     // and change hours back to 12 hr clock value
			}
			h=x+"";                              // set numerical values to string values
			h=h.length<2?"0"+h:h;                // make hour two digit value
			m=y+"";                              // for both hours and minutes
			m=m.length<2?"0"+m:m;                // set minutes to two place format if less than 10
						
			t=h+":"+m+" "+ ap;                   // build calculated time string
			s=s.replace(RegExp.$1,t);            // replace time with calculated time
			textnodes.snapshotItem(i).data=s;    // set text line to string with new time
		}
		if(s.match(re2)){
			textnodes.snapshotItem(i).data="Listen"; 
		}
		if(YOUR_TIME_ZONE!="PST" && s.match(re3)){
			textnodes.snapshotItem(i).data=YOUR_TIME_ZONE; 
		}
	}
	
/***** CHANGE Help & Info TAB TO LISTEN LINK *****/

    if(LISTEN_LINK!=""){
	var allLinks = document.evaluate(
		"//a[@href]",
	        document,
	        null,
	        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	        null);
	var aLink="";
    	//var ListenSearch="http://www.radioparadise.com/content.php?name=Listen&go=yes";
    	var ListenSearch="content.php?name=Help";
    	
	for (i = 0; i < allLinks.snapshotLength; i++) {
		aLink = allLinks.snapshotItem(i)+"";
		if(aLink.indexOf(ListenSearch)>-1){
			allLinks.snapshotItem(i).href=aLink.replace(ListenSearch,LISTEN_LINK);
		}
	}
    }	
}
)();
