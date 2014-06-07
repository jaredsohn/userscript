// ==UserScript==
// @name           Auto Expand Older Posts
// @namespace      http://userscripts.org/users/RockyTheWonderGeek/AEOP
// @description    Automatically clicks the Facebook Older Posts link for you to display more posts.
// @copyright      RockyTheWonderGeek
// @version        2.1.02
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/home.php?sk=lf
// @include        http://www.facebook.com/home.php?filter=app_*
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require        http://sizzlemctwizzle.com/updater.php?id=87496&days=1
// ==/UserScript==

/*
Sizzles gm_config is at // @require       http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js

Joe's gm_config is at // @require        http://userscripts.org/scripts/source/49700.user.js

DP_Debug is at // @require    http://s93856294.onlinehome.us/gmassets/scripts/DP_Debug.js
 
*/
 
/*

TO=DO ITEMS
-----------

Add check for CWWM or FVWM and skip expansion of similar posts if wall manager is active

Cleanup code

Add Auto-throttle function to pause and unpause based on number of links displayed on page

Changelog
---------
Version 2.1.02 - 10-06-10 - Minor bug fix 

*/



// ******************************************************
// *  "Global" vars
// ******************************************************

var version = "2.1.10";

var runScriptFlag = false ;
var olderPostsClickedCount=0 ;
var maxOlderPostsClicks = 2 ;
var dopIntervalId = 0;
var msBetweenClicks = 5000;
var statusPauseClicked = false;
var statusPaused = false;
var statusText = "";
var currentPageType = "";
mainStream = (document.getElementById("home_stream") || document.getElementById("pagelet_intentional_stream") || document.getElementById("contentArea") || document.getElementById("profile_stream_container"));
var appAcronym = "AEOP";



// ******************************************************
// *  Helper functions
// ******************************************************

// Use Firebug console if available
// if(unsafeWindow.console){
//    var GM_log = unsafeWindow.console.log;
// }

// Set to true to enable GM_log output
// var GM_DebugLogOutput = true;

// if(!GM_DebugLogOutput) {
//    var GM_log = function(){};
// }


//  Comment out below to enable debug output 
var GM_log = function(){};



// ******************************************************
// ******************************************************
// *
// *  Start Function Definitions
// *
// ******************************************************
// ******************************************************

function hasClass(ob,cn) {
  if (typeof cn=="string") {cn = new RegExp("(^|\\s)"+cn+"(\\s|$)");}return (ob.className && cn.test(ob.className));
}

function clickLink(el) {
	var e = document.createEvent('MouseEvents');
	e.initEvent('click',true,true); 
	el.dispatchEvent(e);
}

function pauseBtnhndlr() {
  if(olderPostsClickedCount >= maxOlderPostsClicks)
  {
    return; 
  }
  else 
  {
    statusPaused = !statusPaused; 
    statusPauseClicked = true; 
    updateStatus();
  }
}

function optionsBtnhndlr() {
GM_config.open();
}

// ******************************************************
// *  Various functions from GM_Config Extender
// ******************************************************


/* ===[ Resize configuration window ]===
 * int width: new width
 * int height: new height */
GM_config.resizeFrame = function(wid,hei) {
  if(fid=this.frame.id) {
    this.frame.style.width = wid;
    this.frame.style.height = hei;
  }

  GM_config.center(); // Center resized frame

}

/* ===[ Add a border to the config frame ]===
 * object spec { width (5px), style (ridge), color (#eae9e8) }
 */
GM_config.addBorder = function() {
  if(fid=this.frame.id) {
    spec = arguments[0] || {};
    this.frame.style.borderWidth = (spec.width || '5px');
    this.frame.style.borderStyle = (spec.style || 'ridge');
    this.frame.style.borderColor = (spec.color || '#999999');
  }
}


// ******************************************************
// *  Various functions from CWWM or Joe Simmons
// ******************************************************

var imgs = {
bg : "http://i45.tinypic.com/raq4x3.png",
logo : "http://i41.tinypic.com/1o8550.jpg",
icon : "http://static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif",
icon2 : "http://photos-c.ak.fbcdn.net/photos-ak-snc1/v27562/91/112192315460911/app_2_112192315460911_2023.gif"
};


// click something - From FVWM/CWWM
click : function(e, type, root) {
	root = (root||document);
	if(!e && typeof e=='string')
		e=document.getElementById(e);
	if(!e)
	{
		return;
	}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
}

// Created by avg, modified by JoeSimmons. shortcut to create an element
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
}

function expandSimilarPosts() {
	// Auto click "show x similar posts" links
	if (GM_config.get("GMopt_EnableExpandSimPosts")==false) {
    return;
  }

 	var similarposts=$g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=')] | .//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=')] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:mainStream});
	
	var i = 0, l = similarposts.snapshotLength;
	if(l==0)
		return;
	do {
		clickLink(similarposts.snapshotItem(i));

	} while(++i < l);
} 
// end expandSimilarPosts


// Create Status display area
function createStatusWindow() {
  var maindiv = document.body.appendChild(create("div", {id:"AEOPstatus",style:"position: fixed; width: 210px; bottom: 40px; left: 5px; padding: 2px; background: #3b5998; color: #FFFFFF; border: 3px solid #8b9dc3; font-weight: 600; font-family: 'lucida grande', tahoma, verdana, arial, sans-serif; font-size: 0.92em; z-index: 99998; visibility: hidden"}));

  var statusLine1 = maindiv.appendChild(create('DIV', {id:'statusLine1', textContent:'[AEOP] - Auto Expand Older Posts', style:"text-align: center; font-size: 0.92em", className:'statusLine1'}));

  var statusLine2 = maindiv.appendChild(create('DIV', {id:'statusLine2', textContent:'Posts Expanded 3 of 200 times', style:"text-align: center; font-size: 0.92em", className:'statusLine2'}));
                        
  var pauseBtn = maindiv.appendChild(create('INPUT', {type:"button", value:"  Pause  ", id:'pauseBtn', textContent:'pauseBtn', style:"float: left; font-size: 0.95em; margin: 0.5em 0 0 5%; font-weight: 500; color: #000; background: #efefff;", onclick:function(){pauseBtnhndlr();}, className:'pauseBtn'}));

  var optionsBtn = maindiv.appendChild(create('INPUT', {type:"button", value:"Options", id:'optionsBtn', textContent:'optionsBtn', style:"float: right; font-size: 0.95em; margin: 0.5em 5% 0 0; font-weight: 500; color: #000; background: #efefff;", onclick:function(){optionsBtnhndlr();}, className:'optionsBtn'}));

}

// update status box
function updateStatus() {
  statusText = !(olderPostsClickedCount >= maxOlderPostsClicks) ? (!statusPaused ? "Older Posts expanded " + olderPostsClickedCount + " out of " + maxOlderPostsClicks + " times" : "PAUSED - Click Resume to continue") : "STOPPED - Refresh page to restart";

  document.getElementById("statusLine1").textContent = "[AEOP] - Auto Expand Older Posts v" + version;
  document.getElementById("statusLine2").textContent = statusText;
  document.getElementById("pauseBtn").setAttribute('value', statusPaused ? "Resume" : "Pause"); 
//  document.getElementById("AEOPstatus").style.visibility = "visible";

  if (GM_config.get("GMopt_DisableStatusWin"))
  {
    document.getElementById("AEOPstatus").style.visibility = "hidden";
  } 
  else
  {
     document.getElementById("AEOPstatus").style.visibility = "visible";
  }

}


function determineCurrentPageType() {
  //
  // Determine which page type we're on - home, profile or feed
  //
  
  currentPageType = "";

  GM_log('determineCurrentPageType entered - home = ' + window.location.href.indexOf('home.php'));
  GM_log('determineCurrentPageType entered - filter = ' + window.location.href.indexOf('filter=app_'));

  // on home page or filter page?
  if (window.location.href.indexOf('home.php') != -1) { 
    if (window.location.href.indexOf('filter=app_') != -1)
    { 
      currentPageType = "filter";
    }
    else
    {
      currentPageType = "home";
    }
  }

  // Are we on a profile page?
  var onProfPg = $g("//div[starts-with(@id, 'profile_stream_container')]", {type:9});
  
  if (onProfPg) {
  currentPageType = "profile";
  } 

  GM_log('determineCurrentPageType exited - onProfPg = ' + onProfPg);
  GM_log("determineCurrentPageType exited - page type = " + currentPageType);
                                    
}

//
//
// need to cancel and restart timer inside dspoldposts() to preserve delay
//
//


function displayOlderPosts() {

  GM_log("Entered displayOlderPosts - count=" + olderPostsClickedCount) ;
  GM_log("Entered displayOlderPosts - runScriptFlag = " + runScriptFlag) ;
    
  // Are we paused
  if (statusPaused) {
    return;
  }
  
  // Check runScriptFlag to see if script should run on current page 
  if (!runScriptFlag) {
    return;
  }


  //
  // Check if we have already hit maxclicks - if so, remove timer and bail out
  //
  if ( olderPostsClickedCount >= maxOlderPostsClicks ) {
      clearInterval ( dopIntervalId );
      GM_log("Script timer stopped - count= " + olderPostsClickedCount) ;
      return;
  }

  //	Test if page has an older posts link
  var o = document.getElementsByClassName('uiMorePager');
  //	var olderPostLink = o.querySelector('.uiMorePager .lfloat');

  //  var o = document.querySelector('.uiMorePager .lfloat');

  GM_log("getElementsByClassName('uiMorePager') - length =" + o.length) ;
  GM_log("getElementsByClassName('uiMorePager') - o[0].innerHTML =" + o[0].innerHTML) ;

	if (o.length > 0) {
    //    GM_log("Passed o.length if test") ;
    //		var a = o.getElementsByClassName('lfloat');
    //		var a = document.getElementsByClassName('lfloat');
		var a = o[0].getElementsByTagName('a');

		
    //    GM_log("getElementsByClassName('lfloat') - length =" + a.length) ;
    GM_log("getElementsByTagName('a') - length =" + a.length) ;
    GM_log("a.innerHTML = " + a.innerHTML );
    GM_log("a[0].innerHTML = " + a[0].innerHTML );
    //     GM_log("a[0] = " + a[0].innerHTML.indexOf("Older Posts") );
    //     GM_log("a[1] = " + a[1].innerHTML );
    //     GM_log("a[1] = " + a[1].innerHTML.indexOf("Older Posts") );

		if (a && a.length && olderPostsClickedCount < maxOlderPostsClicks) {

      // todo - make this a for-next loop in case more than 2 matches
      if (a[0].innerHTML.indexOf("Older Posts") != -1) {a = a[0];}  
        else { a = a[1]; }  

      if (!hasClass(a,"async_saving")) {

				GM_log("Retrieving more posts. Please wait...");
				
        olderPostsClickedCount = olderPostsClickedCount + 1
				clickLink(a);

        // Check if we should expand similar posts
      	if (GM_config.get("GMopt_EnableExpandSimPosts") == true) {
        
          var expSimPostsIntId = window.setInterval(function() {

      		  expandSimilarPosts();

      		  window.clearInterval(expSimPostsIntId);
          }, 5000);
        }
        updateStatus(); // update status
			}
		}
	}
}


//
// Main Function - gm script start
//


//
// Setup GM Config
//
var GM_configOptions = {
	GMopt_EnableOnHome : {
		section : ["Home Page Options", "When on the Home or News Feed page"],
		label : "Enable on Home Page?",
		type: "checkbox",
		"default" : true,
  },
  	
  GMopt_EnableOnHomeClks : {
  label : "No. times to expand Older Posts (Default 3 times)",
  type: "int",
  size: 3,
  "default" : 3
  },
  
	GMopt_EnableOnFltPg : {
		section : ["Filter Page Options", "When displaying posts for a single app like Farmville, Cafe World, etc."],
		label : "Enable on Filtered Pages?",
		type: "checkbox",
		"default" : true
	},

	GMopt_EnableOnFltPgClks : {
		label : "No. times to expand Older Posts (Default 20 times)",
		type: "int",
		size: 3,
		"default" : 20
	},

	GMopt_EnableOnProfPg : {
		section : ["Profile Page Options", "When displaying a user's Profile page"],
		label : "Enable on Profile Pages?",
		type: "checkbox",
		"default" : true
	},

	GMopt_EnableOnProfPgClks : {
		label : "No. times to expand Older Posts (Default 10 times)",
		type: "int",
		size: 3,
		"default" : 10
	},

	GMopt_EnableExpandSimPosts : {
		section : ["Global Options", "These options are for all page types"],
		label : "Also expand Similar Posts links on pages?",
		type: "checkbox",
		"default" : true
	},

	GMopt_RunScriptInterval : {
		label : "Delay in seconds between clicking/expanding Older Posts (Default 10 secs)",
		type: "select",
		options : {
			5 : "5",
			10 : "10",
			15 : "15",
			20 : "20",
			25 : "25",
			30 : "30"
		},
		"default" : "10"
	},

	GMopt_DisableStatusWin : {
		section : ["", "NOTE - If you opt to disable the display of the status window below, you will no longer be able to pause or resume AEOP, and the only way to access this configuration screen will be from the link on the main Facebook page or via the Greasemonkey 'User Script Commands' menu."],
		title : "Disable display of status window?",
		type: "checkbox",
		"default" : false,
		label : "Disable display of status window?"
	}

};

GM_config.init("Facebook Auto Expand Older Posts v" + version + " Options", GM_configOptions, 
'#GM_config .section_header { font-size: 12pt !important; background: #8b9dc3 !important; color: #FFF !important;}' +
'#GM_config_section_0 .config_var { color: black !important; padding-left: 8px !important; display: block !important; } ' +
'#GM_config_section_1 .config_var { color: black !important; padding-left: 8px !important; display: block !important; } ' +
'#GM_config_section_2 .config_var { color: black !important; padding-left: 8px !important; display: block !important; } ' +
'#GM_config_section_3 .config_var { color: black !important; padding-left: 8px !important; display: block !important; } ' +
'#GM_config_header { background-color: #3b5998 !important; color: #ffffff !important; font-weight: bold !important; font-size: 20px !important; outline: 2px solid #eae9e8 !important; height: 30px !important; text-align: center !important; padding-top: 5px !important; }', {
    open: function() {
      GM_config.addBorder(); // add a fancy border
      //  GM_config.resizeFrame('640px','480px'); // resize the config window
      GM_config.resizeFrame('60%','75%'); // resize the config window
      //  GM_config.addTooltip(0,'Put your name here'); // add some tooltips
      //  GM_config.addTooltip(1,'How old are you today?');
      //  GM_config.sections2tabs(); // convert the sections to tabs - but we didn't define any section
    },
    save: function() { location.reload(); } // reload the page when configuration was changed
  }

// ************************
//   background-color: #3e91eb !important;
//   color: #ffffff !important;
//   text-align: center !important;
//   outline: 2px solid #eae9e8 !important;
//   position: fixed !important;
//   width: 100% !important;
//   top: 0px !important;
//   height: 25px !important;
// 
// ************************
);
                                                        
// add options shortcut to GM user script commands menu
GM_registerMenuCommand("Facebook Auto Expand Older Posts "+version+" Options", GM_config.open);

//
// Add shortcut to options menu as a link on the main FB page - adapted from FVWM
//

//
// Add stuff to make Joe's function work
//

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

var main = {
config : function(){GM_config.open();},
StreamID : "home_stream",
gameAcronym : "AEOP",
navID : "navItem",
navIDnf : "navItem_nf"
};

// add another shortcut to the config, this time as a link on the page
var iOp=0, opInt = window.setInterval(function() {
var na = $("navAccount");
var f = $(main.navIDnf),
	a = (na != null ? na.getElementsByTagName("ul")[0] : null),
	link1 = create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_1"}, new Array(
create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	create("span", {className:"imgWrap"}, new Array(create("img", {src:imgs.icon}))),
	create("span", {textContent:main.gameAcronym+" "+version+" Options"}))))),
	link2 = create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_2"}, new Array(
create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	create("span", {className:"imgWrap"}, new Array(create("img", {src:imgs.icon}))),
	create("span", {textContent:main.gameAcronym+" "+version+" Options"})))));
if(f && !$("navItem_aeop_1")) f.parentNode.appendChild(link1);
if(a && !$("navItem_aeop_2")) a.appendChild(link2);

if((f && a) || iOp>=10) window.clearInterval(opInt);
iOp++;
}, 500);
// End Joe's add scortcut code


// Determine page type and set variables accordingly

determineCurrentPageType();
runScriptFlag = false ;

switch (currentPageType) {
  case "home" :
    maxOlderPostsClicks = GM_config.get("GMopt_EnableOnHomeClks") ;
    msBetweenClicks = GM_config.get("GMopt_RunScriptInterval") * 1000;
    if (GM_config.get("GMopt_EnableOnHome")) {
      runScriptFlag = true ;
    }
    break;
    
  case "filter" :
    maxOlderPostsClicks = GM_config.get("GMopt_EnableOnFltPgClks") ;
    msBetweenClicks = GM_config.get("GMopt_RunScriptInterval") * 1000;
    if (GM_config.get("GMopt_EnableOnFltPg")) {
      runScriptFlag = true ;
    }
    break;

  case "profile" :
    maxOlderPostsClicks = GM_config.get("GMopt_EnableOnProfPgClks") ;
    msBetweenClicks = GM_config.get("GMopt_RunScriptInterval") * 1000;
    if (GM_config.get("GMopt_EnableOnProfPg")) {
      runScriptFlag = true ;
    }
    break;
  
//   default :
//     runScriptFlag = true ;
}

if (olderPostsClickedCount < maxOlderPostsClicks)  {

  GM_log("Auto Click Older Posts Script entered - olderPostsClickedCount = " + olderPostsClickedCount + " - maxOlderPostsClicks = " +maxOlderPostsClicks + " - msBetweenClicks = " + msBetweenClicks) ;

  createStatusWindow(); // Create ststus update window

  dopIntervalId = window.setInterval ( displayOlderPosts, msBetweenClicks );
}

//
// End Main
//
