// ==UserScript==
// @name           Reader Sharing
// @namespace      http://www.timbroder.com
// @description    Bringing Following and Sharing back to Google Reader
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// @version        2.5
// ==/UserScript==

//function addSharing(callback) {
function addSharing() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://readersharing.net/media/js/reader.js");
  /*script.addEventListener('load', function() {
	  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		  var script = document.createElement("script");
		  script.textContent = "(" + callback.toString() + ")();";
		  document.body.appendChild(script);
	  }
	  else {
		  main();
	  }
  }, false);*/
  document.body.appendChild(script);
}

addSharing();

var style = "#nottys{position:fixed;top:20px;right:20px;width:280px;z-index:999}" +
"#nottys .notty{margin-bottom:20px;color:#FFF;text-shadow:#000 0 1px 2px;font:normal 12px/17px Helvetica;border:1px solid rgba(0,0,0,0.7);background:0 transparent), 0 rgba(0,0,0,0.4));-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:rgba(0,0,0,0.8) 0 2px 13px rgba(0,0,0,0.6) 0 -3px 13px rgba(255,255,255,0.5) 0 1px 0 inset;-moz-box-shadow:rgba(0,0,0,0.8) 0 2px 13px rgba(0,0,0,0.6) 0 -3px 13px rgba(255,255,255,0.5) 0 1px 0 inset;box-shadow:rgba(0,0,0,0.8) 0 2px 13px rgba(0,0,0,0.6) 0 -3px 13px rgba(255,255,255,0.5) 0 1px 0 inset;position:relative;cursor:default;-webkit-user-select:none;-moz-user-select:none;overflow:hidden;_overflow:visible;_zoom:1;padding:10px;background:black}" +
".pop{-webkit-animation-duration:.5s;-webkit-animation-iteration-count:1;-webkit-animation-name:pop;-webkit-animation-timing-function:ease-in}" +
".remove{-webkit-animation-iteration-count:1;-webkit-animation-timing-function:ease-in-out;-webkit-animation-duration:.3s;-webkit-animation-name:remove}" +
"#nottys .notty.click{cursor:pointer}" +
"#nottys .notty .hide{position:absolute;font-weight:700;line-height:20px;height:20px;right:0;top:0;background:0;-webkit-border-top-right-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomleft:6px;-moz-border-radius-topright:6px;-webkit-box-shadow:rgba(255,255,255,0.5) 0 -1px 0 inset, rgba(255,255,255,0.5) 0 1px 0 inset, #000 0 5px 6px;-moz-box-shadow:rgba(255,255,255,0.5) 0 -1px 0 inset, rgba(255,255,255,0.5) 0 1px 0 inset, #000 0 5px 6px;box-shadow:rgba(255,255,255,0.5) 0 -1px 0 inset, rgba(255,255,255,0.5) 0 1px 0 inset, #000 0 5px 6px;border-left:1px solid rgba(255,255,255,0.5);cursor:pointer;display:none;padding:5px 15px}" +
"#nottys .notty .hide:hover{background:0 #fff);color:#000;text-shadow:none}" +
"#nottys .notty .right,#nottys .notty .left{width:79%;height:100%;float:left}" +
"#nottys .notty .time{font-size:9px;position:relative}" +
"#nottys .notty .right .time{margin-left:19px}" +
"#nottys .notty .left{width:20%}" +
"#nottys .notty .right .inner{padding-left:19px}" +
"#nottys .notty .left .img:after{content:'';background:0 transparent);width:1px;height:50px;position:absolute;right:-10px}" +
"#nottys .notty .left .img{width:100%;background-size:auto 100%;height:50px;border-radius:6px;-webkit-box-shadow:rgba(255,255,255,0.9) 0 1px 0 inset, rgba(0,0,0,0.5) 0 1px 6px;-moz-box-shadow:rgba(255,255,255,0.9) 0 1px 0 inset, rgba(0,0,0,0.5) 0 1px 6px;box-shadow:rgba(255,255,255,0.9) 0 1px 0 inset, rgba(0,0,0,0.5) 0 1px 6px;border:1px solid rgba(0,0,0,0.55);position:relative}" +
"#nottys .notty:after{content:'.';visibility:hidden;display:block;clear:both;height:0;font-size:0}" +
"#nottys .notty h2{font-size:14px;text-shadow:#000 0 2px 4px;color:#fff;margin:0 0 5px}" +
"80%{-webkit-transform:scale(1.05);opacity:1}" +
"to{-webkit-transform:scale(1)}" +
"100%{right:-223px;opacity:0}";
GM_addStyle(style);

/**
@name           Script Update Checker
@namespace      http://www.crappytools.net
@description    Code to add to any Greasemonkey script to let it check for updates.

//NOTES:
//Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
//I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
//The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
//This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.
**/

var SUC_script_num=118173;try{function updateCheck(a){if(a||parseInt(GM_getValue("SUC_last_update","0"))+864e5<=(new Date).getTime())try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,d,e,f;e=b.responseText,GM_setValue("SUC_last_update",(new Date).getTime()+""),d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(e)[1]),c=parseInt(GM_getValue("SUC_current_version","-1")),c!=-1?(f=/@name\s*(.*?)\s*$/m.exec(e)[1],GM_setValue("SUC_target_script_name",f),d>c?confirm('There is an update available for the Greasemonkey script "'+f+'."\nWould you like to go to the install page now?')&&(GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num),GM_setValue("SUC_current_version",d)):a&&alert('No update is available for "'+f+'."')):GM_setValue("SUC_current_version",d+"")}})}catch(b){a&&alert("An error occurred while checking for updates:\n"+b)}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(!0)}),updateCheck(!1)}catch(err){}



