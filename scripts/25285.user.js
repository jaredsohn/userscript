// De-ad gmail 
// version 0.41 beta
// 2008-04-27
// (c) 2008 Charlie Harvey
// This is free software. Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "De-ad gmail", and click Uninstall.
//
// There are some variables that you can tweak. Under usecript commands,
// you can set "gmail de-ad ui version" and "gmail de-ad body width". 
//
// Gmail de-ad ui version sets the ui version to 1 or 2(default). 
// You can use the old ui(1) using the "older version" link at the 
// top right of the screen. You'll know you're using it cos the
// url will end ?ui=1.
//
// Gmaill de-ad body width lets you specify the width of the message area.
// It defaults to 1100px. If you browse emails using the older and newer
// buttons, you'll find that gmail de-ad will forget the body width. That's 
// an issue that I'll try and fix, but don't get your hopes up.
//
// If you're not so keen on advertising, check out adbusters
// http://www.adbusters.org/home/
//
// This version of gmai de-ad was written on an eeePC!
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          De-ad gmail
// @namespace     http://mail.google.com/
// @description   Delete right hand adverts in gmail, widen message area
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @exclude       
// ==/UserScript==

// Set this to 1 if you want verbose logging to your console.
// Not much point now.
var verbosity = 0;

// Width of email body. Have to do this hackishly cos we can't
// cll GM_getValue from within unsafeWindow context.
var body_width=get_body_width();

// is a var an int - culled from http://www.peterbe.com/plog/isint-function
// with thanks.
function is_int(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
 }

// Return stored body_width or 1100px
function get_body_width() {
	return GM_getValue('body_width','1100px');
}

// Prompt for and set body width, checks input is an int
var set_body_width = function () {
	var w = prompt("Body width in pixels (don\'t include px)", get_body_width().replace(/px/i,''));
	if(!is_int(w))
		w=get_body_width();
	else
		w+='px';
	GM_setValue('body_width',w);
	body_width=GM_getValue('body_width','1100px');
	window.location.reload();
}



// Returns ui_version or 2
function get_ui_version() {
	return GM_getValue('ui_version','2');
}

// Prompt for and set ui_version. Anything that isn't 
// 1 sets it to 2.
var set_ui_version = function() {
	var uiv = prompt('UI version (1 or 2)', get_ui_version());
	if (uiv !=1)
		uiv=2;
	GM_setValue('ui_version',uiv);
	window.location.reload();
}


if(get_ui_version()==1) {
  // olde style blocking for ui=1
  if(verbosity)
    GM_log("Lets block some ads");
  var style="#rh {display:none;} #msg_0, #msgs, .msg {width:"+body_width+";}";
  var head=document.getElementsByTagName("head")[0];
  var el=window.document.createElement('link');
  el.rel='stylesheet';
  el.type='text/css';
  el.href='data:text/css;charset=utf-8,'+escape(style);
  head.appendChild(el);
}
else if (get_ui_version()==2){
  window.addEventListener('load', function() {
      if (unsafeWindow.gmonkey) {
        unsafeWindow.gmonkey.load('1.0', 
          function(gmail) {
            function de_ad() {
              GM_log('in de_ad');
              rhs=gmail.getConvRhsElement();
              if(rhs==null)
                return;
              if(verbosity)
                GM_log("Let's block some ads");
              rhs.style.display="none";
              body=gmail.getActiveViewElement();
              if(body==null)
                return;
              body.style.width=body_width;
              cd=rhs.ownerDocument;
              tds = cd.evaluate(
                "//td[@class='eWTfhb']", cd, null, 
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
              );
              if(tds.snapshotLength==3) {
                tds.snapshotItem(2).style.display="none";
                tds.snapshotItem(0).style.width=body_width;
              }
            }
            gmail.registerViewChangeCallback(de_ad);
          }
      );
    }

  }, true);
}

GM_registerMenuCommand('gmail de-ad body width', set_body_width,null,null,'w');
GM_registerMenuCommand('gmail de-ad ui version', set_ui_version,null,null,'u');