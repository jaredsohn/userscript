// ==UserScript==
// @name           Auto expand wall contents
// @description    Automatically Expand older FB post, docs & comments
// @copyright      AlizBazar, RockyTheWonderGeek
// @homepage       http://www.alizweb.com
// @version        0.1.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/home.php?sk=lf
// @include        http://www.facebook.com/home.php?filter=app_*
// @include        https://www.facebook.com/*
// @include        https://www.facebook.com/home.php?sk=lf
// @include        https://www.facebook.com/home.php?filter=app_*
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://s93856294.onlinehome.us/gmassets/scripts/gm_config.js
// @require        http://sizzlemctwizzle.com/updater.php?id=87496&days=1
// ==/UserScript==

/*
This is an extended version of RockyTheWonderGeek's plugin, Auto Expand 
Older Posts 2.1.09. It's basically the same plugin added with addition
functionality to expand all comments and documents posted on the page.
Comment & doc expanding functionality relies heavily on jQuery plugin.
*/

// Line below used with unwrap directive
// unsafeWindow.AEOP_myScript = this;

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
    }
}

// Function to expand comments and docs
function GM_expandPosts() {
    if (typeof $ == 'undefined') {
        window.setTimeout(expandPosts, 100);
    } else {
        window.setTimeout(function() {
            $('input[name*="view_all"]').click();
            $("a:contains('See More')").click();
        }, 1000);
    }
}



// ******************************************************
// *  "Global" vars
// ******************************************************

var version = "2.1.09";

var runScriptFlag = false ;
var olderPostsClickedCount=0 ;
var maxOlderPostsClicks = 2 ;
var aeopIntervalId = 0;
var msBetweenClicks = 5000;
var statusPauseClicked = false;
var statusPaused = false;
var statusText = "";
var currentPageType = "";
var currentPageTypeMaxClicks = 0;
var currentNumWallPostsDisplayed = 0;
var statusAutoPaused = false;
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
    maxOlderPostsClicks = maxOlderPostsClicks + currentPageTypeMaxClicks;
    document.getElementById("statusLine2").textContent = "Restarting...in one moment";
//    displayOlderPosts(); 
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

function currWallPostCount() {
	currentNumWallPostsDisplayed = $g("count(.//*[starts-with(@id,'stream_story_')])", {node:mainStream, type:1});
	return (currentNumWallPostsDisplayed);
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

var statusFontSize = 'x-small'

// Create Status display area
function createStatusWindow() {
  var maindiv = document.body.appendChild(create("div", {id:"AEOPstatus", style:"position: fixed; width: 210px; bottom: 40px; left: 5px; padding: 2px; background: #3b5998; color: #FFFFFF; border: 3px solid #8b9dc3; font-weight: 600; font-family: 'lucida grande', tahoma, verdana, arial, sans-serif; font-size: 0.92em; z-index: 99998; visibility: hidden"}));

  var statusLine1 = maindiv.appendChild(create('DIV', {id:'statusLine1', textContent:'[AEOP] - Auto Expand Older Posts', style:"text-align: center; font-size: 0.92em", className:'statusLine1'}));

  var statusLine2 = maindiv.appendChild(create('DIV', {id:'statusLine2', textContent:'Posts Expanded 0 of 000 times', style:"text-align: center; font-size: 0.92em", className:'statusLine2'}));
                        
  var pauseBtn = maindiv.appendChild(create('INPUT', {type:"button", value:"  Pause  ", id:'pauseBtn', textContent:'pauseBtn', style:"float: left; font-size: 0.95em; margin: 0.5em 0 0 5%; font-weight: 500; color: #000; background: #efefff;", onclick:function(){pauseBtnhndlr();}, className:'pauseBtn'}));

  var optionsBtn = maindiv.appendChild(create('INPUT', {type:"button", value:"Options", id:'optionsBtn', textContent:'optionsBtn', style:"float: right; font-size: 0.95em; margin: 0.5em 5% 0 0; font-weight: 500; color: #000; background: #efefff;", onclick:function(){optionsBtnhndlr();}, className:'optionsBtn'}));

  var statusLine3 = maindiv.appendChild(create('DIV', {id:'statusLine3', textContent:'                ', style:"text-align: center; font-size: 0.80em; margin: 8px 0px 0px 15%; font-weight: 600; color: #FFFF00;", className:'statusLine3'}));

  if (GM_config.get("GMopt_StatusWinPosition"))
  {
    document.getElementById("AEOPstatus").style.bottom = GM_config.get("GMopt_StatusWinPosition") + "px";
  } 


}

// update status box
function updateStatus() {
  statusText = !(olderPostsClickedCount >= maxOlderPostsClicks) ? (!statusPaused ? "Older Posts expanded " + olderPostsClickedCount + " out of " + maxOlderPostsClicks + " times" : "PAUSED - Click Resume to continue") : "STOPPED - Click Restart to continue";

  document.getElementById("statusLine1").textContent = "[AEOP] - Auto Expand Older Posts v" + version;
  document.getElementById("statusLine2").textContent = statusText;
  document.getElementById("pauseBtn").setAttribute('value', statusPaused ? "Resume" : "Pause"); 
//  document.getElementById("AEOPstatus").style.visibility = "visible";

  if ( olderPostsClickedCount >= maxOlderPostsClicks ) {
      // new restart function
      // GM_log("Script timer stopped - count= " + olderPostsClickedCount) ;
     document.getElementById("pauseBtn").setAttribute('value', statusPaused ? "Resume" : "Restart"); 
     return;
  }



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
  if ( (window.location.href.indexOf('home.php') != -1) || 
       (window.location.href == 'http://www.facebook.com/') || 
       (window.location.href == 'https://www.facebook.com/') || 
       (window.location.href == 'http://www.facebook.com/?ref=home') || 
       (window.location.href == 'https://www.facebook.com/?ref=home') || 
       (window.location.href == 'http://www.facebook.com/?ref=logo') || 
       (window.location.href == 'https://www.facebook.com/?ref=logo') || 
       (window.location.href == 'http://www.facebook.com/?sk=nf') || 
       (window.location.href == 'https://www.facebook.com/?sk=nf') ) { 
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
//  var onProfPg = $g("//div[starts-with(@id, 'profile_stream_container')]", {type:9});
  var onProfPg = $("profile_pic");
  
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
  // Check if wall post "throttle" is enabled and if so skip expanding more posts
  //

  var maxToDisplay = GM_config.get("GMopt_MaxWallPostsDisplayed"), currPostCount ;
  if (maxToDisplay != "off") {
    currPostCount = currWallPostCount() ;
    if (!statusPaused && currPostCount >= maxToDisplay) {
      // pauseBtnhndlr();  // Pause expansion of posts
      // statusAutoPaused = true ;
      GM_log("AutoThrottle tripped - currPostCount = " + currPostCount + "maxToDisplay = " + maxToDisplay);
      document.getElementById("statusLine3").textContent = "Auto-Throttle ON";
      // updateStatus();
      return;
    } 
    else {
      document.getElementById("statusLine3").textContent = " ";
    }
  }

  //
  // Check if we have already hit maxclicks - if so, remove timer and bail out
  //
//
// Took out so as to enable new restart function
//
//   if ( olderPostsClickedCount >= maxOlderPostsClicks ) {
//       clearInterval ( aeopIntervalId );
//       GM_log("Script timer stopped - count= " + olderPostsClickedCount) ;
//       return;
//   }



 var o = "", pageClassName = "";
  
  switch(currentPageType) {
    case 'home' :
//      pageClassName = "uiMorePagerAnchor";
      pageClassName = "uiMorePager";
      break;
      
    case 'filter' :
//      pageClassName = "uiMorePagerAnchor";
      pageClassName = "uiMorePager";
      break;

    case 'profile' :
//      pageClassName = "uiMorePagerAnchor";
      pageClassName = "uiMorePager";
      break;
  
  }

  //	Test if page has an older posts link
  //  var o = document.getElementsByClassName('uiMorePager');  // was working till 11-03-10
  //  var o = document.getElementsByClassName('uiMorePagerAnchor');
  var o = document.getElementsByClassName(pageClassName);

  GM_log("getElementsByClassName('uiMorePager-Anchor') - currentPageType = " + currentPageType) ;
  GM_log("getElementsByClassName('uiMorePager-Anchor') - pageClassName = " + pageClassName) ;
  GM_log("getElementsByClassName('uiMorePager-Anchor') - length =" + o.length) ;
  GM_log("getElementsByClassName('uiMorePager-Anchor') - o[0].innerHTML =" + o[0].innerHTML) ;

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
    // Expand newly appeared comments & docs
    GM_expandPosts();
}


//
// Main Function - gm script start
//


//
// Setup GM Config
//
var GM_configOptions = {
	GMopt_EnableOnHome : {
		label : "Enable on Home Page?",
		section : ["Home Page Options", "When on the Home or News Feed page"],
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
		label : "Enable on Filtered Pages?",
		section : ["Filter Page Options", "When displaying posts for a single app like Farmville, Cafe World, etc."],
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
		label : "Enable on Profile Pages?",
		section : ["Profile Page Options", "When displaying a user's Profile page"],
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
		label : "Also expand Similar Posts links on pages?",
		section : ["Global Options", "These options are for all page types"],
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
			30 : "30",
			45 : "45",
			60 : "60"
		},
		"default" : "10"
	},

	GMopt_MaxWallPostsDisplayed : {
		label : "Limit maximum number of wall posts displayed at any one time (Default OFF)",
		section : ["", "If the number of posts currently displayed exceeds this number clicking/expanding Older Posts will automatically pause - (primarily for use with Wall Manager type scripts where there is an option to hide finished posts.  This will prevent expanding posts faster than the script can process them and causing the browser to slow to a crawl.)"],
		type: "select",
		options : {
			off : "Off",
			20 : "20",
			25 : "25",
			30 : "30",
			35 : "35",
			40 : "40",
			45 : "45",
			50 : "50",
			75 : "75",
			100 : "100"
		},
		"default" : "off"
	},

	GMopt_DisableStatusWin : {
		label : "Disable display of status window?",
		section : ["", "NOTE - If you opt to disable the display of the status window below, you will no longer be able to pause or resume AEOP, and the only way to access this configuration screen will be from the link on the main Facebook page or via the Greasemonkey 'User Script Commands' menu."],
		title : "Disable display of status window?",
		type: "checkbox",
		"default" : false
	},

	GMopt_StatusWinPosition : {
		label : "No. of pixels from bottom of screen to position status window (Default 40 pixels)",
	  section : ["", "Use this option if you need to reposition the status window relative to the bottom of the screen."],
		type: "select",
		options : {
			10 : "10",
			15 : "15",
			20 : "20",
			25 : "25",
			30 : "30",
			35 : "35",
			40 : "40",
			45 : "45",
			50 : "50",
			55 : "55",
			60 : "60"
		},
		"default" : "40"
	},
	
	'GMopts_OlderPostsBarToBottom' : {
		'label' : "Lock older posts bar to bottom of screen?",
		'section' : ["", "Lock the position of the Older Posts bar so it stays visible (floats) at the bottom of the screen." ],
		'type' : "checkbox",
		"default" : false
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

currentPageTypeMaxClicks = maxOlderPostsClicks 

if (olderPostsClickedCount < maxOlderPostsClicks)  {

  GM_log("Auto Click Older Posts Script entered - olderPostsClickedCount = " + olderPostsClickedCount + " - maxOlderPostsClicks = " +maxOlderPostsClicks + " - msBetweenClicks = " + msBetweenClicks) ;

  createStatusWindow(); // Create status update window

  aeopIntervalId = window.setInterval ( displayOlderPosts, msBetweenClicks );
  
  if (GM_config.get("GMopts_OlderPostsBarToBottom") === true) {
//     GM_addStyle("#contentArea div.uiMorePagerAnchor {position: fixed !important; bottom: 5px !important; left: 23% !important; width: 47% !important; z-index: 9999 !important;}");
//     GM_addStyle("#contentArea div.pagelet_stream_pager {position: fixed !important; bottom: 5px !important; left: 23% !important; width: 47% !important; z-index: 9999 !important;}");
    GM_addStyle("#contentArea div.uiMorePager {position: fixed !important; bottom: 5px !important; left: 23% !important; width: 47% !important; z-index: 9999 !important;}");

     // Adjust for profile pages
//     GM_addStyle("div.uiMorePagerAnchor {position: fixed !important; bottom: 5px !important; left: 27% !important; width: 47% !important; z-index: 9999 !important;}");
//     GM_addStyle("div.uiMorePager {position: fixed !important; bottom: 5px !important; left: 27% !important; width: 47% !important; z-index: 9999 !important;}");
    
  }
  
}
        
        


//
// End Main
//
