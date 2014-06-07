// ==UserScript==
// @name           Facebook Purity
// @namespace      http://steeev.freehostia.com
// @description    Removes messages posted by 3rd party applications from your facebook homepage
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        https://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/connect/*
// @exclude        https://*.facebook.com/connect/*
// @version        1.9 - 28th Oct 2009
// ==/UserScript==

//
// (C) stephen fernandez 2009        http://steeev.freehostia.com/wp/
//

// If you like this script please donate, big or small donations, anything is welcome
// http://donate.fbpurity.com

// --------------------------------------------------------
// Facebook Purity : http://www.fbpurity.com
// Facebook Purity Fan Page : http://facebook.com/fbpurity
// --------------------------------------------------------

// ABOUT
// -----
// This greasemonkey script hides all third party facebook application messages from your fb homepage.
// To allow a specific application's messages to be seen, add its application id to the whitelist in the code below.
// Instructions on how to edit the whitelist are available here: http://bit.ly/fbpwhitelist

// INSTALLATION
// ------------
// This script is compatible with the following web browsers: Firefox, Google Chrome, Opera and Safari
//
// Firefox script installation instructions : First install the greasemonkey plugin from here: https://addons.mozilla.org/firefox/addon/748
//                                            Then restart the browser, then reload this script and you will be asked if you want to install the script, click ok + thats it.
//
// Google Chrome script installation instructions: http://bit.ly/chromegm
//        Safari script installation instructions: http://bit.ly/safarigm
//         Opera script installation instructions: http://bit.ly/operagm

//
// KNOWN ISSUES - The 'Block App' function, doesnt seem to work correctly. After using it, even though the app will show as blocked if you visit the application homepage,
//                it wont actually get hidden from yours news feed. am trying to figure out why this happens.

// UPDATES
// -------
// 1.51  30th March 2009 Bug fixed: if there were no pending requests, the script didnt work
// 1.52   4th April 2009 removed GM_addStyle command, for better compatibility with other browsers (chrome + opera)
// 1.53  26th April 2009 changed insertpoint so its not dependent on suggestions box
// 1.54  27th April 2009 script is now compatible with Google Chrome + Opera (and possibly safari, not tested yet)
// 1.54a  5th May   2009 fixed a minor bug
// 1.54b 24th June  2009 fixed foracebook code change
// 1.54c 29th July  2009 fixed for facebook code change
// 1.54d  5th Aug   2009 fixed for facebook code change
// 1.54e 26th Aug   2009 fixed for facebook code change
// 1.60   4th Sep   2009 added application whitelisting capability, the default whitelisted apps are:
//                       FB Iphone, Selective Twitter and Living Social
// 1.61  14th Oct   2009 optimised script, it should run faster and more efficiently now
//                       added tumblr, digsby and tweetdeck to whitelist, removed livingsocial from whitelist
// 1.8   21st Oct   2009 added "block app" functionality and ability to show just the app messages on the page
//                       added blackberry app to default whitelist
// 1.8a  22nd Oct   2009 fixed bug with blocking apps if language was not set to english

// 1.8d  23rd Oct   2009 fixed for new facebook update ( "live feed" changes )
//                       fixed if you click "Show x similar posts" on an application message, when you have chosen to display the app messages, the app messages will no longer be automatically hidden
//                       if after you've blocked an app, and there are no more hidden app messages, it now returns to normal homepage view
// 1.8e  26th Oct   2009 script now hides more apps (ones that use widgets) and should also now be restricted to running on the homepage
// 1.9   28th Oct   2009 added filter for [joined group, became fan, attending event, became friend] messages

//
// (C) stephen fernandez 2009      http://steeev.freehostia.com/wp/
//

// If you like this script please donate, big or small donations, anything is welcome
// http://donate.fbpurity.com

(function() {

/////////////////////////////////////////////////////////////////
///////////////// BEGIN UPGRADE REQUIRED MESSAGE ////////////////
/////////////////////////////////////////////////////////////////

if ((window.top!=window.self) || (top != self))
    return;

function createCookie(name,value,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}

function eraseCookie(name) {
createCookie(name,"",-1);
}

if(!readCookie('visitedPreviously')){
  // set a cookie so the upgrade message is only shown once per day
  createCookie('visitedPreviously', 'visitedPreviously', 1);   // 1 days persistence
  if(confirm( "Hello! The version of the 'Facebook Purity' Greasemonkey script you have installed is out of date and no longer works due to a code change at facebook.\n\nThere is a new and much improved working version available. The latest working version of the script is now exclusively available from http://www.fbpurity.com.\n\nWould you like to go there now and get it?"))
    location.href='http://www.fbpurity.com';
}

//eraseCookie('visitedPreviously');  // FOR TEST PURPOSES

return;

////////////////////////////////////////////////////////////////////
///////////////// END UPGRADE REQUIRED MESSAGE /////////////////////
////////////////////////////////////////////////////////////////////

// Add the application IDs of the facebook applications you dont want hidden by fb purity to the whitelist below,
// separated by commas. You can get an application's ID by going to the application page, and looking for 
// the number after the "application.php?id=" bit in the URL. You only want the number part, once you have it, paste
// it into the list, make sure each numeric ID is separated from the others by a comma (no spaces).

var whitelist="6628568379,115463795461,48119224995,5895217474,56212371378,146139331013,2254487659,2915120374";

// the application ids in the default whitelist above belong to, in order:
// 6628568379 = facebook iphone application
// 115463795461 = selective twitter
// 48119224995  = tumblr
// 5895217474   = digsby
// 56212371378  = tweetdeck
// 146139331013 = tweetdeck for iphone
// 2254487659   = blackberry
// 2915120374   = facebook mobile widget

var arrwhitelist=whitelist.split(',');
var arrwhitelist2={};
for (i in arrwhitelist)
  arrwhitelist2[arrwhitelist[i]]=true; // create hashmap

// sort out cross browser issue ( firefox, chrome, opera + safari?)
try {
  if (typeof contentWindow.Env != 'undefined')
    unsafeWindow=contentWindow; // google chrome
} 
catch (e) {
  try {
    if (typeof unsafeWindow.Env != 'undefined')
      ; // firefox
  }
  catch (e) {
    unsafeWindow=window; // opera + safari?
  }
}

window.addEventListener('load', 
 function () {
 
  var crappyappmsgcounter=0;
  var xtramsgcounter=0;
  var fbpstyle=document.createElement('style');
  fbpstyle.textContent='.fbpblocked {border-style: dashed; border-width:1px; border-top: 0px !important; border-color: pink} .fbpblockedx {border-style: dashed; border-width:1px; border-top: 0px !important; border-color: lightblue}';
  if(document.getElementsByTagName('head'))
    document.getElementsByTagName('head')[0].appendChild(fbpstyle);
  
  document.addEventListener("DOMNodeInserted", fpInsertedNodeDomHandler, false);

  function fpInsertedNodeDomHandler(event) {
    if(document.getElementById('home_stream') && event.target.getElementsByClassName && event.target.getElementsByClassName('UIActionLinks')) 
      cleartheshizzle(event.target);
  }
  
  function updateblockedcount() {
    crappyappmsgcounter=document.getElementsByClassName('fbpblocked').length;
    var fbpblockcountspan=document.getElementById('fbpblockcount');
    if(fbpblockcountspan) 
      fbpblockcountspan.innerHTML=crappyappmsgcounter;
      
    xtramsgcounter=document.getElementsByClassName('fbpblockedx').length;
    var fbpblockxcountspan=document.getElementById('fbpblockxcount');
    if(fbpblockxcountspan) 
      fbpblockxcountspan.innerHTML=xtramsgcounter;
  }
  
  function destroyblockedappstories (appid) {

    var appnodes=document.getElementsByClassName('aid_' + appid);
    while(appnodes.length){
      appnodes=document.getElementsByClassName('aid_' + appid);
      appnodes[0].parentNode.removeChild(appnodes[0]);
      if(fpbblockcountspan)
          fpbblockcountspan.innerHTML=--crappyappmsgcounter;
    }
    //check if there are any blocked msgs left and if not, return to normal homepage view
    blockedmsgs=document.getElementsByClassName('fbpblocked');
    if(!blockedmsgs.length) {
      fbpshowblocked();
    }
    
  }// END destroyblockedappstories function

  function blockapp(appid, appname) {
    //unsafeWindow.pages_show_block_app("49572793475", "block", "about");
     
    if (!confirm("Do you want to block the following application : '" + appname +"'"))
      return;
      
    var http = new XMLHttpRequest();
    //var url = "http://www.facebook.com/apps/block.php?id=" + appid + "&action=block&source=about";
    var url = "http://" + location.hostname + "/ajax/apps/block.php";
    var params = "action=block&app_id=" + appid + "&save=Block%20" + escape(appname) + "&post_form_id=" + unsafeWindow.Env.post_form_id + "&fb_dtsg=" + unsafeWindow.Env.fb_dtsg  + "&post_form_id_source=AsyncRequest&__a=1";
    http.open("POST", url, true);
    http.setRequestHeader("Referer", "http://" + location.hostname + "/apps/application.php?id=" + appid);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {
  	  if(http.readyState == 4 && http.status == 200) {
		    if(http.responseText.match('\"error\":0')){
		      //unsafeWindow.console.log("successfully blocked app : '" + appname +  "' with id=" +appid + "\n");
		      destroyblockedappstories (appid);
		    }
		    else
		      alert('app block failed for some reason:\n\n' + http.responseText);
		    http=null;
	    }
    }
  http.send(params);
  
  
  } // END blockapp function

  function blockappev(ev) {
  
    ev.preventDefault();
    var appname=this.getAttribute('appname');
    var appid=this.getAttribute('appid');
    blockapp(appid,appname);
  } // END blockappev function

  var fbpshowblocked=function () {
    var showhidelink=document.getElementById('fbpshowblockedlink');
    var showorhidetext=document.getElementById('fbpshowblockedlink').textContent;
    var blockedmsgs=document.getElementsByClassName('fbpblocked');
    var allmsgs=document.getElementsByClassName('UIStory');
      
    if (showorhidetext=='Show') {
      if(!blockedmsgs.length)
        return;
      showhidelink.innerHTML='Hide';
      displaymode='block';
    }
    else  {
      showhidelink.innerHTML='Show';
      displaymode='none';
    }
    
    if(displaymode=='block')
       alldisplaymode='none'
     else
       alldisplaymode='block'
       
    for (i=0; i<allmsgs.length; i++) {
      allmsgs[i].style.display=alldisplaymode;
    }
    allmsgs=null;
    
    var footernode;
    var appid;
    var appname;
    for(i=0; i<blockedmsgs.length; i++) {
    
      blockedmsgs[i].style.display=displaymode;
      if (!(blockedmsgs[i].getElementsByClassName('blocklink').length) ) {

        footernode=blockedmsgs[i].getElementsByClassName('UIActionLinks')[0];
        
        //appid=footernode.innerHTML.match(/(application\.php\?id=|app_id=)([0-9]{1,})/)[2];
        try {
          appid=footernode.innerHTML.match(/app_2_([0-9]{1,})_/)[1];
        } catch(e) {
            appid=footernode.innerHTML.match(/(application\.php\?id=|app_id=)([0-9]{1,})/)[2];
        }
        
        //appname=footernode.innerHTML.match(/via <a href=\".*?\">(.*?)<\/a>/)[1];
        try {
          appname=footernode.getElementsByClassName("GenericStory_BottomAttribution")[0].getElementsByTagName('a')[0].textContent;
        } catch (e) {
            flinks=footernode.getElementsByTagName('a');
            appname=flinks[flinks.length-1].textContent;
        }
        //appname=footernode.getElementsByClassName("UIImageBlock_ICON_Image")[0].getAttribute('title');
        
        blinkinsertpoint=blockedmsgs[i].getElementsByClassName('UIStory_Hide')[0]; //UIImageBlock //UIIntentionalStory_Header // footer= UIImageBlock clearfix
        var blinkspan=document.createElement('span');
         
        blinkspan.style.cssFloat='right';
        blinkspan.style.margin='2px';
        blinkspan.className='UIStory_Hide';
                   
        blinkspan.innerHTML="<a title='Block this application' appid='" + appid + "' appname='" + appname.replace('"','','g').replace("'",'','g') + "' class='blocklink' href='javascript:;'><b>Block App</b></a>";
        blinkspan.getElementsByTagName('a')[0].addEventListener("click", blockappev, false);
        blinkinsertpoint.parentNode.insertBefore(blinkspan, blinkinsertpoint); //(insert before pattern)
      }
    }

    blockedmsgs=null;
        
  } // END fbpshowblocked function

  var fbpshowblockedx=function () {
    var showhidelink=document.getElementById('fbpshowblockedxlink');
    var showorhidetext=document.getElementById('fbpshowblockedxlink').textContent;
    var blockedmsgs=document.getElementsByClassName('fbpblockedx');
    var allmsgs=document.getElementsByClassName('UIStory');
      
    if (showorhidetext=='Show') {
      if(!blockedmsgs.length)
        return;
      showhidelink.innerHTML='Hide';
      displaymode='block';
    }
    else  {
      showhidelink.innerHTML='Show';
      displaymode='none';
    }
    
     if(displaymode=='block')
       alldisplaymode='none'
     else
       alldisplaymode='block'
       
    for (i=0; i<allmsgs.length; i++) {
      allmsgs[i].style.display=alldisplaymode;
    }
    allmsgs=null;
    
    var footernode;
    var appid;
    var appname;
    for(i=0; i<blockedmsgs.length; i++) {
      blockedmsgs[i].style.display=displaymode;
    }
      
 
  } // END fbpshowblockedx
  
  var fbpshowblockedev=function (ev) {
    ev.preventDefault();
    fbpshowblocked();
  }
  
  var fbpshowblockedxev=function (ev) {
    ev.preventDefault();
    fbpshowblockedx();
  }
          
  var cleartheshizzle=function(thenode) {

    if(!document.getElementById('fbpblockcount')) {
      crappyappmsgcounter=0;
      var insertpoint = document.getElementById('home_sidebar');
      if(insertpoint && insertpoint.firstChild) {
        var fbpurityinfo=document.createElement('div');
        fbpurityinfo.setAttribute('class','UIOneOff_Container');
        fbpurityinfo.style.marginBottom='12px';
        fbpurityinfo.innerHTML='<a title="Facebook Purity HomePage - Check for News + Updates" href="http://bit.ly/fbpure">FB Purity</a> hid: &nbsp;<span id="fbpblockcount">0</span> <abbr title="Application Messages">app</abbr> [ <a id="fbpshowblockedlink" href="javascript:;">Show</a> ] &nbsp;<span id="fbpblockxcount">0</span> <abbr title="Friend/Group/Fan/Event Messages">extra</abbr> [ <a id="fbpshowblockedxlink" href="javascript:;">Show</a> ]';
        insertpoint.insertBefore(fbpurityinfo, insertpoint.firstChild);
        document.getElementById('fbpshowblockedlink').addEventListener("click", fbpshowblockedev, false);
        document.getElementById('fbpshowblockedxlink').addEventListener("click", fbpshowblockedxev, false);
        fpbblockcountspan=document.getElementById('fbpblockcount');
        fpbblockxcountspan=document.getElementById('fbpblockxcount');
      }
    }
    
    var footernodes=thenode.getElementsByClassName('UIActionLinks');
    var blockit, blockitx;
    var appmatch;
    var blockednode;
    for(i=0;i<footernodes.length;i++) {
      blockit=0;
      //appmatch=footernodes[i].innerHTML.match(/(application\.php\?id=|app_id=)([0-9]{1,})/);
      appmatch=footernodes[i].innerHTML.match(/app_2_([0-9]{1,})_|sx_icons_(friend|event|fbpage_add|group)/); // |relationship (i think most people are curious about relationship changes so ive left that out of the filter)
      if (appmatch && appmatch[1]) {
        // its an application message
        blockit=1;
        if(arrwhitelist2[appmatch[1]])
          // its in the whitelist so dont block it
          blockit=0;
      }
      if(blockit) {
        blockednode=footernodes[i].parentNode.parentNode.parentNode.parentNode;
        if( document.getElementById('fbpshowblockedlink') && (document.getElementById('fbpshowblockedlink').textContent=='Show'))
          blockednode.style.display='none';
        blockednode.setAttribute('class',blockednode.getAttribute('class')+' fbpblocked');
        
      }
      
      
      // check for extra messages ( friend adds/events/became fan/joined group )
      blockitx=0;
      if (appmatch && appmatch[2]) {
        // its an "extra" message
        blockitx=1;
        //if(arrwhitelist2[appmatch[1]])
          // its in the whitelist so dont block it
        //  blockit=0;
      }
      if(blockitx) {
        if (footernodes[i].parentNode.className.match(/add_comment/))
          blockednode=footernodes[i].parentNode.parentNode.parentNode.parentNode;
        else
          blockednode=footernodes[i].parentNode.parentNode;
        if( document.getElementById('fbpshowblockedxlink') && (document.getElementById('fbpshowblockedxlink').textContent=='Show') ) 
          blockednode.style.display='none';
        blockednode.setAttribute('class',blockednode.getAttribute('class')+' fbpblockedx');
        
      }
      
      updateblockedcount();
     
    }
    footernodes=null;
  }// END cleartheshizzle function
  
  if(document.getElementById('home_stream') )
    cleartheshizzle(document);
 }
, true); 

})();