// ==UserScript==
// @name          eBay.com.au UI Plus -- For MyMessage
// @author        Allen Jiang - netnewer@gmail.com
// @namespace     http://eBayUIPlus.net/gm
// @description   Show Ebay MyMessage detail information on listing webpage in MyMessage.
// @include       http://my.ebay.com.*/ws/eBayISAPI.dll?MyMessagesFolderView*
// @date          2009-08-12
// @version       1.0
// @GM_version    0.8.2
// ==/UserScript==


(function(){

//-----------------------------Messager Showing Function Start-----------------
//---global var



//-----------Load ExtJS 3.0(Begin) -------------
var GM_EXT_CSS = document.createElement("link");
      GM_EXT_CSS.rel = "stylesheet";
      GM_EXT_CSS.href = "http://www.extjs.com/deploy/dev/resources/css/ext-all.css";
 document.getElementsByTagName('head').item(0).appendChild(GM_EXT_CSS);

var GM_EXT_CSS2 = document.createElement("link");
      GM_EXT_CSS.rel = "stylesheet";
      GM_EXT_CSS2.href = "http://www.extjs.com/deploy/dev/examples/form/forms.css";
 document.getElementsByTagName('head').item(0).appendChild(GM_EXT_CSS2);
 
 var GM_EXT_CSS3 = document.createElement("link");
      GM_EXT_CSS3.rel = "stylesheet";
      GM_EXT_CSS3.href = "http://www.extjs.com/deploy/dev/examples/ux/statusbar/css/statusbar.css";
 document.getElementsByTagName('head').item(0).appendChild(GM_EXT_CSS3);


var GM_EXT_BASE = document.createElement("script");
      GM_EXT_BASE.src = "http://www.extjs.com/deploy/dev/adapter/ext/ext-base.js";
      GM_EXT_BASE.type = "text/javascript";
 document.body.appendChild(GM_EXT_BASE);

var GM_EXT_ALL = document.createElement("script");
      GM_EXT_ALL.src = "http://www.extjs.com/deploy/dev/ext-all.js";
      GM_EXT_ALL.type = "text/javascript";
document.body.appendChild(GM_EXT_ALL);

var GM_EXT_UX = document.createElement("script");
      GM_EXT_UX.src = "http://www.extjs.com/deploy/dev/examples/ux/statusbar/StatusBar.js";
      GM_EXT_UX.type = "text/javascript";
document.body.appendChild(GM_EXT_UX);

//-----------Load ExtJS 3.0(End) -------------

var GM_MSG_SHOW = document.createElement("script");
      GM_MSG_SHOW.src = "http://ebayuiplus.googlecode.com/files/ShowMsg.js";
      GM_MSG_SHOW.type = "text/javascript";
document.body.appendChild(GM_MSG_SHOW);


//-----------------------------Messager Shoing Function End--------------------

})();
