// ==UserScript==
// @name Ezone Awesome
// @author Tommy Smith
// @description My theme for Ezone. Renders games fullscreen so they don't look like postage stamps. Also gives the general pages/hints page it's own new look. Make Ezone awesome.
// @version 0.5
// @include http://www.ezone.com
// @include http://www.ezone.com/*
// @include http://ezone.com
// @include http://ezone.com/*
// ==/UserScript==

// Of course, Internet Exploder does not support the getElementsByClassName function used for detecting where the platforms are. Rewrite the function which should be built in. Function rewritten from a user on Stack Overflow.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
document.getElementsByClassName = function (className) {
    return document.querySelectorAll('.' + className.replace(/ /g, "."))
}
  }

// Common

var ezone2 = '<style type="text/css">\n.FORM {\nmargin-bottom: 0 px;\nmargin-top: 0 px;\ndisplay: inline;\n}\na {\ntext-decoration: underline;\n}\na:link { color: #333333; }\na:visited { color: #333366; }\na:active { color: #000000; }\na:hover { color: #000000; text-decoration: none;}\nbody, div, td\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 11px;\nscrollbar-face-color: #41464E;\nscrollbar-highlight-color: #575F68;\nscrollbar-3dlight-color: #000000;\nscrollbar-darkshadow-color: #000000;\nscrollbar-shadow-color: #33373C;\nscrollbar-arrow-color: #00ffff;\nscrollbar-track-color: #2F3238;\n}\ntable.graybox {\nborder-width: 1px 1px 1px 1px;\nborder-spacing: 2px;\nborder-style: solid solid solid solid;\nborder-color: black black black black;\nborder-collapse: separate;\nbackground-color: #EEEEEE;\n}\n.smalltxt, .DropDown\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 9px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\n}\n.frame {\nbackground-image: url(../images/frame_jock.gif);\nheight: 55px;\nwidth: 56px;\nbackground-repeat: no-repeat;\npadding: 1px;\nmargin-left: 10px;\n}\n.jock {\nbackground-image: url(../images/frame_jock.gif);\n}\n.jock10 {\nbackground-image: url(../images/frame_jock10.gif);\nmargin-bottom: 10px;\n}\n.pick {\nbackground-image: url(../images/frame_pick.gif);\n}\n.pick10 {\nbackground-image: url(../images/frame_pick10.gif);\nmargin-bottom: 10px;\n}\n.download {\nbackground-image: url(../images/frame_download.gif);\n}\n.download10 {\nbackground-image: url(../images/frame_download10.gif);\nmargin-bottom: 10px;\n\n}\n.titletop10 {\npadding-top: 5px;\npadding-bottom: 0px;\nmargin-left: 7px;\n}\n.headoffer\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 8px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\ncolor: #00FFFF;\nletter-spacing: 0.1em;\ntext-transform: uppercase;\n}\n.gametitle\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 10px;\nline-height: 11px;\npadding: 0px;\nmargin: 0px;\nfont-weight: bold;\n}\n.screenshot {\ncolor: #FFFFFF;\nborder: thick #FFFFFF;\n}\n.genre {\nfont-weight: bold;\npadding: 4px;\ntext-align: left;\ntext-indent: 0px;\nmargin-top: 0px;\nmargin-right: 0px;\nmargin-bottom: 0px;\nmargin-left: 0px;\n}\n.jockbg {\nbackground-color: #33CCFF;\n}\n.downloadbg {\nbackground-color: #FFCC33;\n}\n.pickbg {\nbackground-color: #00FF99;\n}\nh3 {\nmargin-bottom: -6px;\n}\n.heading {\nfont-family: Tahoma, Arial, Helvetica;\nfont-size: 8px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\ncolor: #FFFFFF;\nletter-spacing: 0.1em;\ntext-transform: uppercase;\n}\n.menutext {\nfont-family: Tahoma, Arial, Helvetica;\nfont-size: 10px;\nfont-weight: bold;\ncolor: #CCCCCC;\n}\n.menutext:link { text-decoration: none;}\n.menutext:visited { color: #004499; text-decoration: none;}\nul {\nmargin: 0em;\npadding: 1em;\nfont-weight: bold;\n}\n\n.menutext:active { color: #FFFF00; text-decoration: none;}\n.menutext:hover { color: #000000; text-decoration: none;}\n.search {\npadding:1px;\nfont-family:Tahoma,Helvetica,Sans-serif;\nfont-size:9px;\nfont-weight:normal;\nline-height: 10px;\ncolor:#003166;\n}h2 {\nfont-size: 18px;\nfont-weight: bold;\n}\n.gamelink {\nfont-family: Tahoma, Verdana, Arial;\nfont-size: 9px;\ntext-align: center;\n}\n.jockborder {\nborder: 1px solid #006699;\n}\n.downloadborder {\nborder: 1px solid #996600;\n}\n.pickborder {\nborder: 1px solid #339933;\n}\n</style>';

var ezone3 = '<style type="text/css">\n.FORM {\nmargin-bottom: 0 px;\nmargin-top: 0 px;\ndisplay: inline;\n}\na {\ntext-decoration: underline;\n}\na:link { color: #333333; }\na:visited { color: #333366; }\na:active { color: #000000; }\na:hover { color: #000000; text-decoration: none;}\nbody {\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 11px;\nbackground-repeat: repeat-x;\nbackground-color: #FFFFFF;\nbackground-attachment: scroll;\n}\ndiv, td\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 11px;\n}\ntable.graybox {\nborder-width: 1px 1px 1px 1px;\nborder-spacing: 2px;\nborder-style: solid solid solid solid;\nborder-color: black black black black;\nborder-collapse: separate;\nbackground-color: #FFFFFF;\n}\n.smalltxt, .DropDown\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 9px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\n}\n.frame {\nbackground-image: url(../images/frame_jock.gif);\nheight: 55px;\nwidth: 56px;\nbackground-repeat: no-repeat;\npadding: 1px;\nmargin-left: 10px;\n}\n.jock {\nbackground-image: url(../images/frame_jock.gif);\n}\n.jock10 {\nbackground-image: url(../images/frame_jock10.gif);\nmargin-bottom: 10px;\n}\n.pick {\nbackground-image: url(../images/frame_pick.gif);\n}\n.pick10 {\nbackground-image: url(../images/frame_pick10.gif);\nmargin-bottom: 10px;\n}\n.download {\nbackground-image: url(../images/frame_download.gif);\n}\n.download10 {\nbackground-image: url(../images/frame_download10.gif);\nmargin-bottom: 10px;\n\n}\n.titletop10 {\npadding-top: 5px;\npadding-bottom: 0px;\nmargin-left: 7px;\n}\n.headoffer\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 8px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\ncolor: #00FFFF;\nletter-spacing: 0.1em;\ntext-transform: uppercase;\n}\n.gametitle\n{\nfont-family: Tahoma,Arial,Helvetica;\nfont-size: 10px;\nline-height: 11px;\npadding: 0px;\nmargin: 0px;\nfont-weight: bold;\n}\n.screenshot {\ncolor: #FFFFFF;\nborder: thick #FFFFFF;\n}\n.genre {\nfont-weight: bold;\npadding: 4px;\ntext-align: left;\ntext-indent: 0px;\nmargin-top: 0px;\nmargin-right: 0px;\nmargin-bottom: 0px;\nmargin-left: 0px;\n}\n.jockbg {\nbackground-color: #33CCFF;\n}\n.downloadbg {\nbackground-color: #FFCC33;\n}\n.pickbg {\nbackground-color: #00FF99;\n}\nh3 {\nmargin-bottom: -6px;\n}\n.heading {\nfont-family: Tahoma, Arial, Helvetica;\nfont-size: 8px;\nline-height: 10px;\npadding: 0px;\nmargin: 0px;\ncolor: #FFFFFF;\nletter-spacing: 0.1em;\ntext-transform: uppercase;\n}\n.menutext {\nfont-family: Tahoma, Arial, Helvetica;\nfont-size: 10px;\nfont-weight: bold;\ncolor: #CCCCCC;\n}\n.menutext:link { text-decoration: none;}\n.menutext:visited { color: #004499; text-decoration: none;}\nul {\nmargin: 0em;\npadding: 1em;\nfont-weight: bold;\n}\n\n.menutext:active { color: #FFFF00; text-decoration: none;}\n.menutext:hover { color: #000000; text-decoration: none;}\n.search {\npadding:1px;\nfont-family:Tahoma,Helvetica,Sans-serif;\nfont-size:9px;\nfont-weight:normal;\nline-height: 10px;\ncolor:#003166;\n}h2 {\nfont-size: 18px;\nfont-weight: bold;\n}\n.gamelink {\nfont-family: Tahoma, Verdana, Arial;\nfont-size: 9px;\ntext-align: center;\n}\n.jockborder {\nborder: 1px solid #006699;\n}\n.downloadborder {\nborder: 1px solid #996600;\n}\n.pickborder {\nborder: 1px solid #339933;\n}\n</style>';

if (window.location.pathname.indexOf("/hints/") == 0 && window.location.pathname.length>7) {
document.body.innerHTML=ezone2+""+ezone3+'<center><table width="500" bgcolor="#000000">'+document.getElementsByTagName("table")[1].innerHTML+'</table></center>';
document.body.style.backgroundColor="#000000";
} else {
if (window.location.pathname.indexOf("/games/") == 0 && window.location.pathname.indexOf("/all") == -1) {
var pagename = document.title;
var gamename = location.pathname.split('/')[location.pathname.split('/').length-2];
switch (gamename) {
case "slingice":
var colourname = "#0099FF";
break;
case "slingicejunior":
var colourname = "#0099FF";
break;
case "slingoween":
var colourname = "#993300";
break;
case "turkeyfling":
var colourname = "#984B01";
break;
case "swoopa":
var colourname = "#2870B3";
break;
case "flypie":
var colourname = "#003300";
break;
case "easteregghop":
var colourname = "#009900";
break;
case "paddysgold":
var colourname = "#316901";
break;
case "skypatrol":
var colourname = "#0066FF";
break;
default:
var colourname = "#000000";
}

var message0 = '<html><head><title>'+pagename+'</title>'+ezone2+'</head><body bgcolor="#0000FF" text="#FFCC00" link="#FF3100%">'+ezone3+'<style type="text/css">\nbody {\noverflow:hidden;\nbackground-color:'+colourname+';\n}\n</style><table bgcolor="'+colourname+'" width="100%" height="100%"><tr><td align="center" valign="middle">';

var messageswf = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="100%" height="100%" align="middle"><param name="movie" value="/gamesource/' + gamename + '/' + gamename + '.swf" /><param name="quality" value="high" /><param name="scale" value="default" /><param name="bgcolor" value="' + colourname + '" /><param name="flashVars" value="" /><embed src="/gamesource/' + gamename + '/' + gamename + '.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%" scale="default" bgcolor="' + colourname + '" flashvars=""></embed></object>';

var messagedcr = '<object classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=7,0,0,0" width="100%" height="100%"><param name="src" value="'+gamename+'.dcr"><param name="swURL" value="'+gamename+'"><param name="sw1" value="'+gamename+'"><param name="sw2" value="100%"><param name="sw3" value="100%"><param name=swRemote value="swContextMenu=\'false\'"><param name="swStretchStyle" value="meet"><param name="swStretchVAlign" value="center"><param name="swStretchHAlign" value="center"><param name="bgcolor" value="'+colourname+'"><embed pluginspage= "http://www.macromedia.com/shockwave/download/" src="'+gamename+'.dcr" swurl="'+gamename+'" sw1="'+gamename+'" sw2="100%" sw3="100%" swstretchstyle="meet" swstretchvalign="center" swstretchhalign="center" swRemote="swContextMenu=\'false\'" width= "100%" height= "100%" bgcolor="'+colourname+'" > </embed> </object>';

var messagegrv = '<object classid="clsid:77e32299-629f-43c6-ab77-6a1e6d7663f6" id="OTOYControl" width="100%" height="100%" align="middle" border=0 codebase="http://www.OTOY.com/download/CAB/OTOYAX.cab#version=1,0,29,0"><param name="Application" value="http://www.otoy.com/"><param name="ApplicationTag" value="1a6b9ca4aa836243accdcd860964e200"><param name="ApplicationVer" value="http://www.otoy.com/download/OTOY/OTOY.ini"><param name="Manifest" value="http://www.otoy.com/download/EXT/manifest.ini"><param name="Param1" value="'+gamename+'.grv"></object>';

var message1 = '</td></tr></table></body></html>';

document.getElementsByTagName("html")[0].innerHTML=(message0+(document.getElementById("swfwrapper").firstElementChild.innerHTML.indexOf("SWF")!=-1?messageswf:(document.getElementById("swfwrapper").firstElementChild.innerHTML.indexOf("DCR")!=-1?messagedcr:messagegrv))+message1);
} else {
if (document.getElementById("mainContent")) {
document.body.style.backgroundImage="none";
document.body.style.backgroundColor="#000000";
document.body.innerHTML=ezone2+""+ezone3+"<div id='mainContent'>"+document.getElementById("mainContent").innerHTML+"</div>";
document.getElementsByTagName("tr")[0].removeChild(document.getElementsByTagName("td")[1]);
document.getElementsByTagName("td")[0].style.width="786px";
document.getElementsByTagName("td")[0].setAttribute("align", "center");
document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1].parentNode.removeChild(document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1]);
if (window.location.pathname.length<2||window.location.pathname.indexOf("/index")==0) {
document.getElementsByTagName("div")[1].innerHTML="<p><a href='/hints'>HINT GUIDE?</a></p>";
}
}
}
}