// ==UserScript==
// @id             ingress-intel-total-conversion@jonatkins
// @name           IITC: Ingress intel map total conversion
// @version        0.12.0.20130522.175822
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://secure.jonatkins.com/iitc/release/total-conversion-build.meta.js
// @downloadURL    https://secure.jonatkins.com/iitc/release/total-conversion-build.user.js
// @description    [jonatkins-2013-05-22-175822] Total conversion for the ingress intel map.
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


// REPLACE ORIG SITE ///////////////////////////////////////////////////
if(document.getElementsByTagName('html')[0].getAttribute('itemscope') != null)
  throw('Ingress Intel Website is down, not a userscript issue.');
window.iitcBuildDate = '2013-05-22-175822';

// disable vanilla JS
window.onload = function() {};


// rescue user data from original page
var scr = document.getElementsByTagName('script');
for(var x in scr) {
  var s = scr[x];
  if(s.src) continue;
  if(s.type !== 'text/javascript') continue;
  var d = s.innerHTML.split('\n');
  break;
}


if(!d) {
  // page doesn’t have a script tag with player information.
  if(document.getElementById('header_email')) {
    // however, we are logged in.
    setTimeout('location.reload();', 3*1000);
    throw('Page doesn’t have player data, but you are logged in. Reloading in 3s.');
  }
  // FIXME: handle nia takedown in progress
  throw('Couldn’t retrieve player data. Are you logged in?');
}


for(var i = 0; i < d.length; i++) {
  if(!d[i].match('var PLAYER = ')) continue;
  eval(d[i].match(/^var /, 'window.'));
  break;
}
// player information is now available in a hash like this:
// window.PLAYER = {"ap": "123", "energy": 123, "available_invites": 123, "nickname": "somenick", "team": "ALIENS||RESISTANCE"};

// remove complete page. We only wanted the user-data and the page’s
// security context so we can access the API easily. Setup as much as
// possible without requiring scripts.
document.getElementsByTagName('head')[0].innerHTML = ''
  + '<title>Ingress Intel Map</title>'
  + '<style>/* general rules ******************************************************/\n\nhtml, body, #map {\n  height: 100%;\n  width: 100%;\n  overflow: hidden; /* workaround for #373 */\n  background: #0e3d4e;\n}\n\nbody {\n  font-size: 14px;\n  font-family: "coda",arial,helvetica,sans-serif;\n  margin: 0;\n}\n\n#scrollwrapper {\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: fixed;\n  right: -38px;\n  top: 0;\n  width: 340px;\n  bottom: 45px;\n  z-index: 1001;\n  pointer-events: none;\n}\n\n#sidebar {\n  background-color: rgba(8, 48, 78, 0.9);\n  border-left: 1px solid #20A8B1;\n  color: #888;\n  position: relative;\n  left: 0;\n  top: 0;\n  max-height: 100%;\n  overflow-y:scroll;\n  overflow-x:hidden;\n  z-index: 3000;\n  pointer-events: auto;\n}\n\n#sidebartoggle {\n  display: block;\n  padding: 20px 5px;\n  margin-top: -31px; /* -(toggle height / 2) */\n  line-height: 10px;\n  position: absolute;\n  top: 108px;\n  z-index: 3001;\n  background-color: rgba(8, 48, 78, 0.9);\n  color: #FFCE00;\n  border: 1px solid #20A8B1;\n  border-right: none;\n  border-radius: 5px 0 0 5px;\n  text-decoration: none;\n  right: -50px; /* overwritten later by the script with SIDEBAR_WIDTH */\n}\n\n.enl {\n  color: #03fe03 !important;\n}\n\n.res {\n  color: #00c5ff !important;\n}\n\n.none {\n  color: #fff;\n}\n\n.nickname {\n  cursor: pointer !important;\n}\n\na {\n  color: #ffce00;\n  cursor: pointer;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\n/* map display, required because GMaps uses a high z-index which is\n * normally above Leaflet’s vector pane */\n.leaflet-map-pane {\n  z-index: 1000;\n}\n\n/* leaflet layer chooser, when opened, is above other panels */\n/* doesn\'t actually work :( - left commented out for reference\n.leaflet-control-layers-expanded {\n  z-index: 9999 !important;\n}\n*/\n\n\n.leaflet-control-layers-overlays label.disabled {\n  text-decoration: line-through;\n  cursor: help;\n}\n\n\n/* base layer selection - first column */\n.leaflet-control-layers-base {\n  float: left;\n}\n\n/* overlays layer selection - 2nd column */\n.leaflet-control-layers-overlays {\n  float: left;\n  margin-left: 8px;\n  border-left: 1px solid #DDDDDD;\n  padding-left: 8px;\n}\n\n/* hide the usual seperator */\n.leaflet-control-layers-separator {\n  display: none;\n}\n\n\n\n.help {\n  cursor: help;\n}\n\n.toggle {\n  display: block;\n  height: 0;\n  width: 0;\n}\n\n/* field mu count */\n.fieldmu {\n  color: #FFCE00;\n  font-size: 13px;\n  font-family: "coda",arial,helvetica,sans-serif; /*override leaflet-container */\n  text-align: center;\n  text-shadow: 0 0 0.2em black, 0 0 0.2em black, 0 0 0.2em black;\n  pointer-events: none;\n}\n\n\n/* chat ***************************************************************/\n\n#chatcontrols {\n  color: #FFCE00;\n  background: rgba(8, 48, 78, 0.9);\n  position: absolute;\n  left: 0;\n  z-index: 3000;\n  height: 26px;\n  padding-left:1px;\n}\n\n#chatcontrols.expand {\n  top: 0;\n  bottom: auto;\n}\n\n#chatcontrols a {\n  margin-left: -1px;\n  display: inline-block;\n  width: 94px;\n  text-align: center;\n  height: 24px;\n  line-height: 24px;\n  border: 1px solid #20A8B1;\n  vertical-align: top;\n}\n\n#chatcontrols a:first-child {\n  letter-spacing:-1px;\n  text-decoration: none !important;\n}\n\n#chatcontrols a.active {\n  border-color: #FFCE00;\n  border-bottom-width:0px;\n  font-weight:bold\n}\n\n#chatcontrols a.active + a {\n  border-left-color: #FFCE00\n}\n\n\n#chatcontrols .toggle {\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  margin: 6px auto auto;\n}\n\n#chatcontrols .expand {\n  border-bottom: 10px solid #FFCE00;\n}\n\n#chatcontrols .shrink {\n  border-top: 10px solid #FFCE00;\n}\n\n\n#chat {\n  position: absolute;\n  width: 708px;\n  bottom: 23px;\n  left: 0;\n  z-index: 3000;\n  background: rgba(8, 48, 78, 0.9);\n  font-size: 12.6px;\n  color: #eee;\n  border: 1px solid #20A8B1;\n  border-bottom: 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nem {\n  color: red;\n  font-style: normal;\n}\n\n#chat.expand {\n  height:auto;\n  top: 25px;\n}\n\n#chatpublic, #chatfull, #chatcompact {\n  display: none;\n}\n\n#chat > div {\n  overflow-x:hidden;\n  overflow-y:scroll;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 2px;\n  position:relative;\n}\n\n#chat table, #chatinput table {\n  width: 100%;\n  table-layout: fixed;\n  border-spacing: 0m;\n  border-collapse: collapse;\n}\n\n#chatinput table {\n  height: 100%;\n}\n\n#chat td, #chatinput td {\n  font-family: Verdana, sans-serif;\n  font-size: 12.6px;\n  vertical-align: top;\n  padding-bottom: 3px;\n}\n\n/* time */\n#chat td:first-child, #chatinput td:first-child {\n  width: 44px;\n  overflow: hidden;\n  padding-left: 2px;\n  color: #bbb;\n  white-space: nowrap;\n}\n\n#chat time {\n  cursor: help;\n}\n\n/* nick */\n#chat td:nth-child(2), #chatinput td:nth-child(2) {\n  width: 91px;\n  overflow: hidden;\n  padding-left: 2px;\n  white-space: nowrap;\n}\n\n#chat td .system_narrowcast {\n  color: #f66 !important;\n}\n\nmark {\n  background: transparent;\n}\n\n.invisep {\n  display: inline-block;\n  width: 1px;\n  height: 1px;\n  overflow:hidden;\n  color: transparent;\n}\n\n/* divider */\nsummary {\n  color: #bbb;\n  display: inline-block;\n  font-family: Verdana,sans-serif;\n  height: 16px;\n  overflow: hidden;\n  padding: 0 2px;\n  white-space: nowrap;\n  width: 100%;\n}\n\n#chatinput {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  padding: 0 2px;\n  background: rgba(8, 48, 78, 0.9);\n  width: 708px;\n  border: 1px solid #20A8B1;\n  z-index: 3001;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#chatinput td {\n  padding-bottom: 1px;\n  vertical-align: middle;\n}\n\n\n#chatinput input {\n  background: transparent;\n  font-size: 12.6px;\n  font-family: Verdana,sans-serif;\n  color: #EEEEEE;\n  width: 100%;\n  height: 100%;\n  padding:3px 4px 1px 4px;\n}\n\n\n\n/* sidebar ************************************************************/\n\n#sidebar > * {\n  border-bottom: 1px solid #20A8B1;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n\n\n#sidebartoggle .toggle {\n  border-bottom: 10px solid transparent;\n  border-top: 10px solid transparent;\n}\n\n#sidebartoggle .open {\n  border-right: 10px solid #FFCE00;\n}\n\n#sidebartoggle .close {\n  border-left: 10px solid #FFCE00;\n}\n\n/* player stats */\n#playerstat {\n  height: 30px;\n}\n\nh2 {\n  color: #ffce00;\n  font-size: 21px;\n  padding: 0 4px;\n  margin: 0;\n  cursor:help;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 100%;\n}\n\nh2 #name {\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: "~";\n  vertical-align: top;\n  white-space: nowrap;\n  width: 205px;\n  position: relative;\n}\n\nh2 #stats {\n  float: right;\n  height: 100%;\n  overflow: hidden;\n}\n\nh2 #signout {\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 29px;\n  padding: 0 4px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: rgba(8, 48, 78, 0.5);\n  display: none; /* starts hidden */\n}\n\nh2 sup, h2 sub {\n  display: block;\n  font-size: 11px;\n  margin-bottom: -2px;\n}\n\n\n/* gamestats */\n#gamestat {\n  height: 22px;\n}\n\n#gamestat span {\n  display: block;\n  float: left;\n  font-weight: bold;\n  cursor:help;\n  height: 21px;\n  line-height: 22px;\n}\n\n#gamestat .res {\n  background: #005684;\n  text-align: right;\n}\n\n#gamestat .enl {\n  background: #017f01;\n}\n\n\n/* geosearch input, and others */\ninput {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: #ffce00;\n  height: 24px;\n  padding:0px 4px 0px 4px;\n  font-size: 12px;\n  border:0;\n  font-family:inherit;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#geosearch{\n  width:272px;\n  background-color: transparent;\n}\n#geosearchwrapper {\n  height:25px;  \n  background-color: rgba(0, 0, 0, 0.3);\n}\n#geosearchwrapper img{\n  vertical-align: bottom;\n  margin-bottom: 2px;\n  cursor: pointer;\n}\n::-webkit-input-placeholder {\n  font-style: italic;\n}\n\n:-moz-placeholder {\n  font-style: italic;\n}\n\n::-moz-placeholder {\n  font-style: italic;\n}\n\n.leaflet-control-layers input {\n  height: auto;\n  padding: 0;\n}\n\n\n/* portal title and image */\nh3 {\n  font-size: 16px;\n  padding: 0 4px;\n  margin:0;\n  height: 23px;\n  width: 100%;\n  overflow:hidden;\n  text-overflow: "~";\n  white-space: nowrap;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.imgpreview {\n  height: 190px;\n  background: no-repeat center center;\n  background-size: contain;\n  cursor: help;\n  overflow: hidden;\n}\n\n.imgpreview img.hide {\n  display: none;\n}\n\n#level {\n  font-size: 40px;\n  text-shadow: -1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000, 0 0 5px #fff;\n  display: block;\n  margin-right: 15px;\n  text-align:right;\n}\n\n/* portal mods */\n.mods {\n  margin: 3px auto 1px auto;\n  width: 296px;\n  height: 67px;\n  text-align: center;\n}\n\n.mods span {\n  background-color: rgba(0, 0, 0, 0.3);\n  /* can’t use inline-block because Webkit\'s implementation is buggy and\n   * introduces additional margins in random cases. No clear necessary,\n   * as that’s solved by setting height on .mods. */\n  display: block;\n  float:left;\n  height: 63px;\n  margin: 0 2px;\n  overflow: hidden;\n  padding: 2px;\n  text-align: center;\n  width: 63px;\n  cursor:help;\n  border: 1px solid #666;\n}\n\n.mods span:not([title]) {\n  cursor: auto;\n}\n\n.res .mods span, .res .meter {\n  border: 1px solid #0076b6;\n}\n.enl .mods span, .enl .meter {\n  border: 1px solid #017f01;\n}\n\n/* random details, resonator details */\n#randdetails, #resodetails {\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0 4px;\n  table-layout: fixed;\n  border-spacing: 0m;\n  border-collapse: collapse;\n}\n\n#randdetails td, #resodetails td {\n  overflow: hidden;\n  text-overflow: "~";\n  vertical-align: top;\n  white-space: nowrap;\n  width: 50%;\n  width: calc(50% - 62px);\n}\n\n#randdetails th, #resodetails th {\n  font-weight: normal;\n  text-align: right;\n  width: 62px;\n  padding:0px;\n  padding-right:4px;\n  padding-left:4px;\n}\n\n#randdetails th + th, #resodetails th + th {\n  text-align: left;\n  padding-right: 4px;\n  padding-left: 4px;\n}\n\n#randdetails td:first-child, #resodetails td:first-child {\n  text-align: right;\n  padding-left: 2px;\n}\n\n#randdetails td:last-child, #resodetails td:last-child {\n  text-align: left;\n  padding-right: 2px;\n}\n\n\n#randdetails {\n  margin-top: 4px;\n  margin-bottom: 5px;\n}\n\n\n#randdetails tt {\n  font-family: inherit;\n  cursor: help;\n}\n\n/* resonators */\n#resodetails {\n  margin-bottom: 0px;\n}\n\n.meter {\n  background: #000;\n  cursor: help;\n  display: inline-block;\n  height: 18px;\n  padding: 1px;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  position: relative;\n  left: 0;\n  top: 0;\n}\n\n.meter span {\n  display: block;\n  height: 14px;\n}\n\n.meter-level {\n  position: absolute;\n  top: -2px;\n  left: 50%;\n  margin-left: -6px;\n  text-shadow: 0.0em 0.0em 0.3em #808080;\n}\n\n/* links below resos */\n\n.linkdetails {\n  margin-bottom: 0px;\n  text-align: center;\n}\n\n.linkdetails aside {\n  display: inline-block;\n  white-space: nowrap;\n  font-size: 12px;\n  margin-left: 5px;\n  margin-right: 5px;\n}\n\n\n\n#toolbox {\n  font-size: 12px;\n  text-align: left;    /* centre didn\'t look as nice here as it did above in .linkdetails */\n}\n\n#toolbox > a {\n  margin-left: 5px;\n  margin-right: 5px;\n  white-space: nowrap;\n}\n\n/* a common portal display takes this much space (prevents moving\n * content when first selecting a portal) */\n\n#portaldetails {\n  min-height: 63px;\n  position: relative; /* so the below \'#portaldetails .close\' is relative to this */\n}\n\n#portaldetails .close {\n  position: absolute;\n  top: -2px;\n  right: 2px;\n  cursor: pointer;\n  color: #FFCE00;\n  font-family: "Arial", sans;\n  font-size: 16px;\n}\n\n/* update status */\n#updatestatus {\n  background-color: rgba(8, 48, 78, 0.9);\n  border-bottom: 0;\n  border-top: 1px solid #20A8B1;\n  border-left: 1px solid #20A8B1;\n  bottom: 0;\n  color: #ffce00;\n  font-size:13px;\n  padding: 4px;\n  position: fixed;\n  right: 0;\n  z-index: 3002;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#updatestatus .map {\n  margin-left: 8px;\n}\n\n/* Dialogs\n */\n.ui-tooltip, .ui-dialog {\n  max-width: 300px;\n  position: absolute;\n  z-index: 9999;\n  background-color: rgba(8, 48, 78, 0.9);\n  border: 1px solid #20A8B1;\n  color: #eee;\n  font: 13px/15px Roboto, Arial, Helvetica, sans-serif;\n  padding: 2px 4px;\n}\n\n.ui-widget-overlay {\n  height: 100%;\n  left: 0;\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 10000;\n  background:  #444;\n  opacity: 0.6;\n}\n\n.ui-modal {\n  z-index: 10001 !important;\n}\n\n.ui-tooltip {\n  z-index: 10002 !important;\n}\n\n.ui-tooltip, .ui-dialog a {\n  color: #FFCE00;\n}\n\n.ui-dialog {\n  padding: 0;\n  border-radius: 2px;\n}\n\n.ui-dialog-modal .ui-dialog-titlebar-close {\n  display: none;\n}\n\n.ui-dialog-titlebar {\n  text-align: center;\n  padding: 4px;\n  background-color: rgba(8, 60, 78, 0.9);\n  min-width: 250px;\n}\n\n.ui-dialog-title {\n  padding: 2px;\n  font-weight: bold;\n}\n\n.ui-dialog-title-active {\n  color: #ffce00;\n}\n\n.ui-dialog-title-inactive {\n  color: #ffffff;\n}\n\n.ui-dialog-titlebar-button {\n  position: absolute;\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  width: 17px;\n  height: 17px;\n  top: 3px;\n  cursor: pointer;\n  border: 1px solid rgb(32, 168, 177);\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.ui-dialog-titlebar-button:active {\n  background-color: rgb(32, 168, 177);\n}\n\n.ui-dialog-titlebar-button-close {\n  right: 4px;\n}\n\n.ui-dialog-titlebar-button-collapse {\n  right: 25px;\n}\n\n.ui-dialog-titlebar-button-collapse-expanded {\n  /* For future changes */\n}\n\n.ui-dialog-titlebar-button-collapse-collapsed {\n   background-color: rgb(32, 168, 177);\n}\n\n.ui-dialog-content {\n  padding: 12px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 600px !important;\n  max-width: 700px !important;\n}\n\n.ui-dialog-content-hidden {\n  display: none !important;\n}\n\n.ui-dialog-buttonpane {\n  padding: 6px;\n  border-top: 1px solid #20A8B1;\n}\n\n.ui-dialog-buttonset {\n  text-align: right;\n}\n\n.ui-dialog-buttonset button,\n.ui-dialog-content button {\n  padding: 2px;\n  min-width: 40px;\n  color: #FFCE00;\n  border: 1px solid #FFCE00;\n  background-color: rgba(8, 48, 78, 0.9);\n}\n\n.ui-dialog-buttonset button:hover {\n  text-decoration: underline;\n}\n\n.ui-dialog-aboutIITC {\n  width: auto !important;\n  min-width: 400px !important;\n  max-width: 600px !important;\n}\n\ntd {\n  padding: 0;\n  vertical-align: top;\n}\n\ntd + td {\n  padding-left: 4px;\n}\n\n#qrcode > canvas {\n  border: 8px solid white;\n}\n\n/* redeem results *****************************************************/\n.redeem-result-table {\n  font-size: 14px;\n  font-family: Roboto, Arial, Helvetica, sans-serif;\n  table-layout: fixed;\n}\n\n.redeem-result tr > td:first-child {\n  width: 50px;\n  text-align: right;\n}\n\n.redeem-result-html {\n  font-family: Inconsolata, Consolas, Menlo, "Courier New", monospace;\n}\n\n.pl_nudge_date {\n  background-color: #724510;\n  border-left: 1px solid #ffd652;\n  border-bottom: 1px solid #ffd652;\n  border-top: 1px solid #ffd652;\n  color: #ffd652;\n  display: inline-block;\n  float: left;\n  font-size: 12px;\n  height: 18px;\n  text-align: center;\n}\n\n.pl_nudge_pointy_spacer {\n  background: no-repeat url(//commondatastorage.googleapis.com/ingress.com/img/nudge_pointy.png);\n  display: inline-block;\n  float: left;\n  height: 20px;\n  left: 47px;\n  width: 5px;\n}\n\n.pl_nudge_player {\n  cursor: pointer;\n}\n\n.pl_nudge_me {\n  color: #ffd652;\n}\n\n.RESISTANCE {\n  color: #00c2ff;\n}\n\n.ALIENS {\n  color: #28f428;\n}\n\n#portal_highlight_select{\n  position: absolute;\n  top:5px;\n  left:10px;\n  z-index: 2500;\n  font-size:11px;\n  font-family: "coda",arial,helvetica,sans-serif;\n  background-color:#0E3C46;\n  color:#ffce00;\n  \n}\n\n\n</style>'
  + '<style>/* required styles */\n\n.leaflet-map-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-pane,\n.leaflet-tile-container,\n.leaflet-overlay-pane,\n.leaflet-shadow-pane,\n.leaflet-marker-pane,\n.leaflet-popup-pane,\n.leaflet-overlay-pane svg,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n	position: absolute;\n	left: 0;\n	top: 0;\n	}\n.leaflet-container {\n	overflow: hidden;\n	-ms-touch-action: none;\n	}\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n	-webkit-user-select: none;\n	   -moz-user-select: none;\n	        user-select: none;\n	-webkit-user-drag: none;\n	}\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n	display: block;\n	}\n/* map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container img {\n	max-width: none !important;\n	}\n/* stupid Android 2 doesn\'t understand "max-width: none" properly */\n.leaflet-container img.leaflet-image-layer {\n	max-width: 15000px !important;\n	}\n.leaflet-tile {\n	filter: inherit;\n	visibility: hidden;\n	}\n.leaflet-tile-loaded {\n	visibility: inherit;\n	}\n.leaflet-zoom-box {\n	width: 0;\n	height: 0;\n	}\n\n.leaflet-tile-pane    { z-index: 2; }\n.leaflet-objects-pane { z-index: 3; }\n.leaflet-overlay-pane { z-index: 4; }\n.leaflet-shadow-pane  { z-index: 5; }\n.leaflet-marker-pane  { z-index: 6; }\n.leaflet-popup-pane   { z-index: 7; }\n\n\n/* control positioning */\n\n.leaflet-control {\n	position: relative;\n	z-index: 7;\n	pointer-events: auto;\n	}\n.leaflet-top,\n.leaflet-bottom {\n	position: absolute;\n	z-index: 1000;\n	pointer-events: none;\n	}\n.leaflet-top {\n	top: 0;\n	}\n.leaflet-right {\n	right: 0;\n	}\n.leaflet-bottom {\n	bottom: 0;\n	}\n.leaflet-left {\n	left: 0;\n	}\n.leaflet-control {\n	float: left;\n	clear: both;\n	}\n.leaflet-right .leaflet-control {\n	float: right;\n	}\n.leaflet-top .leaflet-control {\n	margin-top: 10px;\n	}\n.leaflet-bottom .leaflet-control {\n	margin-bottom: 10px;\n	}\n.leaflet-left .leaflet-control {\n	margin-left: 10px;\n	}\n.leaflet-right .leaflet-control {\n	margin-right: 10px;\n	}\n\n\n/* zoom and fade animations */\n\n.leaflet-fade-anim .leaflet-tile,\n.leaflet-fade-anim .leaflet-popup {\n	opacity: 0;\n	-webkit-transition: opacity 0.2s linear;\n	   -moz-transition: opacity 0.2s linear;\n	     -o-transition: opacity 0.2s linear;\n	        transition: opacity 0.2s linear;\n	}\n.leaflet-fade-anim .leaflet-tile-loaded,\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n	opacity: 1;\n	}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\n	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\n	     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\n	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\n	}\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile,\n.leaflet-touching .leaflet-zoom-animated {\n	-webkit-transition: none;\n	   -moz-transition: none;\n	     -o-transition: none;\n	        transition: none;\n	}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n	visibility: hidden;\n	}\n\n\n/* cursors */\n\n.leaflet-clickable {\n	cursor: pointer;\n	}\n.leaflet-container {\n	cursor: -webkit-grab;\n	cursor:    -moz-grab;\n	}\n.leaflet-popup-pane,\n.leaflet-control {\n	cursor: auto;\n	}\n.leaflet-dragging,\n.leaflet-dragging .leaflet-clickable,\n.leaflet-dragging .leaflet-container {\n	cursor: move;\n	cursor: -webkit-grabbing;\n	cursor:    -moz-grabbing;\n	}\n\n\n/* visual tweaks */\n\n.leaflet-container {\n	background: #ddd;\n	outline: 0;\n	}\n.leaflet-container a {\n	color: #0078A8;\n	}\n.leaflet-container a.leaflet-active {\n	outline: 2px solid orange;\n	}\n.leaflet-zoom-box {\n	border: 2px dotted #05f;\n	background: white;\n	opacity: 0.5;\n	}\n\n\n/* general typography */\n.leaflet-container {\n	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;\n	}\n\n\n/* general toolbar styles */\n\n.leaflet-bar {\n	box-shadow: 0 1px 7px rgba(0,0,0,0.65);\n	-webkit-border-radius: 4px;\n	        border-radius: 4px;\n	}\n.leaflet-bar a {\n	background-color: #fff;\n	border-bottom: 1px solid #ccc;\n	width: 26px;\n	height: 26px;\n	line-height: 26px;\n	display: block;\n	text-align: center;\n	text-decoration: none;\n	color: black;\n	}\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n	background-position: 50% 50%;\n	background-repeat: no-repeat;\n	display: block;\n	}\n.leaflet-bar a:hover {\n	background-color: #f4f4f4;\n	}\n.leaflet-bar a:first-child {\n	-webkit-border-top-left-radius: 4px;\n	        border-top-left-radius: 4px;\n	-webkit-border-top-right-radius: 4px;\n	        border-top-right-radius: 4px;\n	}\n.leaflet-bar a:last-child {\n	-webkit-border-bottom-left-radius: 4px;\n	        border-bottom-left-radius: 4px;\n	-webkit-border-bottom-right-radius: 4px;\n	        border-bottom-right-radius: 4px;\n	border-bottom: none;\n	}\n.leaflet-bar a.leaflet-disabled {\n	cursor: default;\n	background-color: #f4f4f4;\n	color: #bbb;\n	}\n\n.leaflet-touch .leaflet-bar {\n	-webkit-border-radius: 10px;\n	        border-radius: 10px;\n	}\n.leaflet-touch .leaflet-bar a {\n	width: 30px;\n	height: 30px;\n	}\n.leaflet-touch .leaflet-bar a:first-child {\n	-webkit-border-top-left-radius: 7px;\n	        border-top-left-radius: 7px;\n	-webkit-border-top-right-radius: 7px;\n	        border-top-right-radius: 7px;\n	}\n.leaflet-touch .leaflet-bar a:last-child {\n	-webkit-border-bottom-left-radius: 7px;\n	        border-bottom-left-radius: 7px;\n	-webkit-border-bottom-right-radius: 7px;\n	        border-bottom-right-radius: 7px;\n	border-bottom: none;\n	}\n\n\n/* zoom control */\n\n.leaflet-control-zoom-in {\n	font: bold 18px \'Lucida Console\', Monaco, monospace;\n	}\n.leaflet-control-zoom-out {\n	font: bold 22px \'Lucida Console\', Monaco, monospace;\n	}\n\n.leaflet-touch .leaflet-control-zoom-in {\n	font-size: 22px;\n	line-height: 30px;\n	}\n.leaflet-touch .leaflet-control-zoom-out {\n	font-size: 28px;\n	line-height: 30px;\n	}\n\n\n/* layers control */\n\n.leaflet-control-layers {\n	box-shadow: 0 1px 7px rgba(0,0,0,0.4);\n	background: #f8f8f9;\n	-webkit-border-radius: 8px;\n	        border-radius: 8px;\n	}\n.leaflet-control-layers-toggle {\n	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAABrVBMVEUNDQ0PDw8QEBARERESEhIUFBQVFRUYGBgZGRkcHBwdHR0fHx8jIyMoKCgxMTE0NDQ1NTU2NjY4ODg5OTk6Ojo7Ozs+Pj4/Pz9AQEBBQUFDQ0NFRUVISEhMTExNTU1ZWVlaWlpmZmb///+rq6u1tbWHh4eOjo6oqKiampqdnZ2wsLC5ubmEhISLi4uZmZmSkpK1tbV6enqCgoKpqamJiYmurq66urp4eHh/f3+1tbXAwMBubm52dnacnJyEhISAgIBvb2+wsLC9vb15eXleXl5fX19mZmZoaGhsbGxtbW1ubm5vb29xcXF8fHx9fX1+fn6CgoKDg4OFhYWGhoaKioqNjY2Tk5OUlJSVlZWXl5eYmJibm5uenp6fn5+goKChoaGioqKpqamqqqqsrKyurq6vr6+xsbGzs7O0tLS1tbW2tra4uLi6urq9vb2+vr6/v7/BwcHDw8PExMTFxcXHx8fJycnKysrLy8vMzMzOzs7Pz8/Q0NDS0tLT09PV1dXW1tbX19fZ2dna2trb29vc3Nzd3d3f39/i4uLk5OTn5+fo6Ojt7e3u7u7z8/P09PRxWspKAAAARHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABISFxcXKC1DQ0hISE2IjIyMkMTEx8nr6+zs7O74+/v7/ChuOn8AAAGLSURBVCjPbZJLT8JAEIBnW1re3VKoETloSLjKzXhS4w836smQcCAaXyQEYxBJoXRLeW1p192GIoh7aabfzs63O4OqEC8/gYGsViyO0S9K42u4Id4GbpBkXJYU8Id3Nl2GO0gzrtIS/4bzW9uhS7ZBKXxRkFG0hwXjezKZByxCinZeSoqUAGSRuBw+2N6CcVTQzjQBGJUgVEVu6DbcgYdOcb0gYrZgCkc+SomAjlsE1XHZ1CWgVI2KsYCqKoSO1Sf8QAMf6khW0FqD+QFzvsmbqAXJgyw2FPEbBPZtMh18srXGqs0KGSngteRwNka1RMN9glij01dzXIAtPFqu/tGY9rxcBmZerpLd15h8+KAc59caTdjR+IKjWOM1esNYQ47kg7VGc0sjiRWu4ZPlXw3w25NII1/jR29pFLP8rqRLQT3B/ObTUayRMMyiLjR6UBEazsiy3+NWZrGpR40RDXEs8rg9ALpm6tFrOJb7vDsbIBtmTgPXs+wu2xu2DM7DhLyE/8xhR6pDawMAfgAd2djeY/eg2wAAAABJRU5ErkJggg==);\n	width: 36px;\n	height: 36px;\n	}\n.leaflet-touch .leaflet-control-layers-toggle {\n	width: 44px;\n	height: 44px;\n	}\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n	display: none;\n	}\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n	display: block;\n	position: relative;\n	}\n.leaflet-control-layers-expanded {\n	padding: 6px 10px 6px 6px;\n	color: #333;\n	background: #fff;\n	}\n.leaflet-control-layers-selector {\n	margin-top: 2px;\n	position: relative;\n	top: 1px;\n	}\n.leaflet-control-layers label {\n	display: block;\n	}\n.leaflet-control-layers-separator {\n	height: 0;\n	border-top: 1px solid #ddd;\n	margin: 5px -10px 5px -6px;\n	}\n\n\n/* attribution and scale controls */\n\n.leaflet-container .leaflet-control-attribution {\n	background-color: rgba(255, 255, 255, 0.7);\n	box-shadow: 0 0 5px #bbb;\n	margin: 0;\n	}\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n	padding: 0 5px;\n	color: #333;\n	}\n.leaflet-container .leaflet-control-attribution,\n.leaflet-container .leaflet-control-scale {\n	font-size: 11px;\n	}\n.leaflet-left .leaflet-control-scale {\n	margin-left: 5px;\n	}\n.leaflet-bottom .leaflet-control-scale {\n	margin-bottom: 5px;\n	}\n.leaflet-control-scale-line {\n	border: 2px solid #777;\n	border-top: none;\n	color: black;\n	line-height: 1.1;\n	padding: 2px 5px 1px;\n	font-size: 11px;\n	text-shadow: 1px 1px 1px #fff;\n	background-color: rgba(255, 255, 255, 0.5);\n	box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);\n	white-space: nowrap;\n	overflow: hidden;\n	}\n.leaflet-control-scale-line:not(:first-child) {\n	border-top: 2px solid #777;\n	border-bottom: none;\n	margin-top: -2px;\n	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n	}\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n	border-bottom: 2px solid #777;\n	}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-control-zoom {\n	box-shadow: none;\n	}\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-control-zoom {\n	border: 4px solid rgba(0,0,0,0.3);\n	}\n\n\n/* popup */\n\n.leaflet-popup {\n	position: absolute;\n	text-align: center;\n	}\n.leaflet-popup-content-wrapper {\n	padding: 1px;\n	text-align: left;\n	-webkit-border-radius: 20px;\n	        border-radius: 20px;\n	}\n.leaflet-popup-content {\n	margin: 14px 20px;\n	line-height: 1.4;\n	}\n.leaflet-popup-content p {\n	margin: 18px 0;\n	}\n.leaflet-popup-tip-container {\n	margin: 0 auto;\n	width: 40px;\n	height: 20px;\n	position: relative;\n	overflow: hidden;\n	}\n.leaflet-popup-tip {\n	width: 15px;\n	height: 15px;\n	padding: 1px;\n\n	margin: -8px auto 0;\n\n	-webkit-transform: rotate(45deg);\n	   -moz-transform: rotate(45deg);\n	    -ms-transform: rotate(45deg);\n	     -o-transform: rotate(45deg);\n	        transform: rotate(45deg);\n	}\n.leaflet-popup-content-wrapper, .leaflet-popup-tip {\n	background: white;\n\n	box-shadow: 0 3px 14px rgba(0,0,0,0.4);\n	}\n.leaflet-container a.leaflet-popup-close-button {\n	position: absolute;\n	top: 0;\n	right: 0;\n	padding: 4px 5px 0 0;\n	text-align: center;\n	width: 18px;\n	height: 14px;\n	font: 16px/14px Tahoma, Verdana, sans-serif;\n	color: #c3c3c3;\n	text-decoration: none;\n	font-weight: bold;\n	background: transparent;\n	}\n.leaflet-container a.leaflet-popup-close-button:hover {\n	color: #999;\n	}\n.leaflet-popup-scrolled {\n	overflow: auto;\n	border-bottom: 1px solid #ddd;\n	border-top: 1px solid #ddd;\n	}\n\n\n/* div icon */\n\n.leaflet-div-icon {\n	background: #fff;\n	border: 1px solid #666;\n	}\n.leaflet-editing-icon {\n	-webkit-border-radius: 2px;\n	        border-radius: 2px;\n	}\n</style>'
//note: smartphone.css injection moved into code/smartphone.js
  + '<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Coda"/>'
  + '<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto"/>';

document.getElementsByTagName('body')[0].innerHTML = ''
  + '<div id="map">Loading, please wait</div>'
  + '<div id="chatcontrols" style="display:none">'
  + '  <a><span class="toggle expand"></span></a>'
  +   '<a>full</a><a>compact</a><a>public</a><a class="active">faction</a>'
  + '</div>'
  + '<div id="chat" style="display:none">'
  + '  <div id="chatfaction"></div>'
  + '  <div id="chatpublic"></div>'
  + '  <div id="chatcompact"></div>'
  + '  <div id="chatfull"></div>'
  + '</div>'
  + '<form id="chatinput" style="display:none"><table><tr>'
  + '  <td><time></time></td>'
  + '  <td><mark>tell faction:</mark></td>'
  + '  <td><input id="chattext" type="text"/></td>'
  + '</tr></table></form>'
  + '<a id="sidebartoggle"><span class="toggle close"></span></a>'
  + '<div id="scrollwrapper">' // enable scrolling for small screens
  + '  <div id="sidebar" style="display: none">'
  + '    <div id="playerstat">t</div>'
  + '    <div id="gamestat">&nbsp;loading global control stats</div>'
  + '    <div id="geosearchwrapper">'
  + '      <input id="geosearch" placeholder="Search location…" type="text"/>'
  + '      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjM1OTRFNUE0RTIxMUUxODNBMUZBQ0ZFQkJDNkRBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNjM1OTRFNkE0RTIxMUUxODNBMUZBQ0ZFQkJDNkRBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MzU5NEUzQTRFMjExRTE4M0ExRkFDRkVCQkM2REFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2MzU5NEU0QTRFMjExRTE4M0ExRkFDRkVCQkM2REFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kxvtEgAAAWVJREFUeNqsVctRwzAUlDTccQlxB3RA0kHSQXLxNXEFgQrsHO1L6AA6cKgAd4BLEBXAU2YfszY2oMCb2Rlbelqv3s+2qiozYjPBVjAX3Az2WsFJcBB0WZb1Nt0IWSF4FexGyAzWdvAp6rpOpgjDxgucg3lBKViRzz3WPN6Db8OkjsgaUvQgSAW54IkI77CWwkcVN0PCPZFtAG+mzZPfmVRUhlAZK0mZIR6qbGPi7ChY4zl1yKZ+NTfxltNttg6loep8LJuUjad4zh3F7s1cbs8ayxDD9xEH+0uiL2ed+WdjwhWU2YjzVmJoUfCfhC2eb/8g7Fr73KHRDWopiWVC22kdnhymhrZfcYG6goQcAmGHhleV64lsjlUD+5cSz85RtbfUSscfrp+Qn87Ic2KuyGlBEyd8dYkO4IJfInkc70C2QMf0CD1I95hzCc1GtcfBe7hm/l1he5p3JYVh+AsoaV727EOAAQAWgF3ledLuQAAAAABJRU5ErkJggg=="/ title="Current Location">'
  + '    </div>'
  + '    <div id="portaldetails"></div>'
  + '    <input id="redeem" placeholder="Redeem code…" type="text"/>'
  + '    <div id="toolbox">'
  + '      <a onmouseover="setPermaLink(this)" onclick="setPermaLink(this);return androidCopy(this.href)" title="URL link to this map view">Permalink</a>'
  + '      <a onclick="window.aboutIITC()" style="cursor: help">About IITC</a>'
  + '    </div>'
  + '  </div>'
  + '</div>'
  + '<div id="updatestatus"></div>';

// putting everything in a wrapper function that in turn is placed in a
// script tag on the website allows us to execute in the site’s context
// instead of in the Greasemonkey/Extension/etc. context.
function wrapper() {

// LEAFLET PREFER CANVAS ///////////////////////////////////////////////
// Set to true if Leaflet should draw things using Canvas instead of SVG
// Disabled for now because it has several bugs: flickering, constant
// CPU usage and it continuously fires the moveend event.
L_PREFER_CANVAS = false;

// CONFIG OPTIONS ////////////////////////////////////////////////////
window.REFRESH = 60; // refresh view every 60s (base time)
window.ZOOM_LEVEL_ADJ = 5; // add 5 seconds per zoom level
window.ON_MOVE_REFRESH = 1.25;  //refresh time to use after a movement event
window.MINIMUM_OVERRIDE_REFRESH = 5; //limit on refresh time since previous refresh, limiting repeated move refresh rate
window.REFRESH_GAME_SCORE = 15*60; // refresh game score every 15 minutes
window.MAX_IDLE_TIME = 4; // stop updating map after 4min idling
window.PRECACHE_PLAYER_NAMES_ZOOM = 17; // zoom level to start pre-resolving player names
window.HIDDEN_SCROLLBAR_ASSUMED_WIDTH = 20;
window.SIDEBAR_WIDTH = 300;
// chat messages are requested for the visible viewport. On high zoom
// levels this gets pretty pointless, so request messages in at least a
// X km radius.
window.CHAT_MIN_RANGE = 6;
// this controls how far data is being drawn outside the viewport. Set
// it 0 to only draw entities that intersect the current view. A value
// of one will render an area twice the size of the viewport (or some-
// thing like that, Leaflet doc isn’t too specific). Setting it too low
// makes the missing data on move/zoom out more obvious. Setting it too
// high causes too many items to be drawn, making drag&drop sluggish.
window.VIEWPORT_PAD_RATIO = 0.3;

// how many items to request each query
window.CHAT_PUBLIC_ITEMS = 200;
window.CHAT_FACTION_ITEMS = 100;
// how many pixels to the top before requesting new data
window.CHAT_REQUEST_SCROLL_TOP = 200;
window.CHAT_SHRINKED = 60;

// Leaflet will get very slow for MANY items. It’s better to display
// only some instead of crashing the browser.
window.MAX_DRAWN_PORTALS = 1000;
window.MAX_DRAWN_LINKS = 400;
window.MAX_DRAWN_FIELDS = 200;
// Minimum zoom level resonator will display
window.RESONATOR_DISPLAY_ZOOM_LEVEL = 17;
// Minimum area to zoom ratio that field MU's will display
window.FIELD_MU_DISPLAY_AREA_ZOOM_RATIO = 0.001;
// Point tolerance for displaying MU's
window.FIELD_MU_DISPLAY_POINT_TOLERANCE = 60

window.COLOR_SELECTED_PORTAL = '#f00';
window.COLORS = ['#a0a0a0', '#0088FF', '#03DC03']; // none, res, enl
window.COLORS_LVL = ['#000', '#FECE5A', '#FFA630', '#FF7315', '#E40000', '#FD2992', '#EB26CD', '#C124E0', '#9627F4'];
window.COLORS_MOD = {VERY_RARE: '#F78AF6', RARE: '#AD8AFF', COMMON: '#84FBBD'};

window.OPTIONS_RESONATOR_SELECTED = {color: '#fff', weight: 2, radius: 4, opacity: 1, clickable: false};
window.OPTIONS_RESONATOR_NON_SELECTED = {color: '#aaa', weight: 1, radius: 3, opacity: 1, clickable: false};

window.OPTIONS_RESONATOR_LINE_SELECTED = {
  opacity: 0.7,
  weight: 3,
  color: '#FFA000',
  dashArray: '0,10' + (new Array(25).join(',8,4')),
  fill: false,
  clickable: false
};
window.OPTIONS_RESONATOR_LINE_NON_SELECTED = {
  opacity: 0.25,
  weight: 2,
  color: '#FFA000',
  dashArray: '0,10' + (new Array(25).join(',8,4')),
  fill: false,
  clickable: false
};

// circles around a selected portal that show from where you can hack
// it and how far the portal reaches (i.e. how far links may be made
// from this portal)
window.ACCESS_INDICATOR_COLOR = 'orange';
window.RANGE_INDICATOR_COLOR = 'red'

// by how much pixels should the portal range be expanded on mobile
// devices. This should make clicking them easier.
window.PORTAL_RADIUS_ENLARGE_MOBILE = 5;


window.DEFAULT_PORTAL_IMG = '//commondatastorage.googleapis.com/ingress/img/default-portal-image.png';
window.NOMINATIM = 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q=';

// INGRESS CONSTANTS /////////////////////////////////////////////////
// http://decodeingress.me/2012/11/18/ingress-portal-levels-and-link-range/
window.RESO_NRG = [0, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
window.MAX_XM_PER_LEVEL = [0, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
window.MIN_AP_FOR_LEVEL = [0, 10000, 30000, 70000, 150000, 300000, 600000, 1200000];
window.HACK_RANGE = 40; // in meters, max. distance from portal to be able to access it
window.OCTANTS = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
window.OCTANTS_ARROW = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘'];
window.DESTROY_RESONATOR = 75; //AP for destroying portal
window.DESTROY_LINK = 187; //AP for destroying link
window.DESTROY_FIELD = 750; //AP for destroying field
window.CAPTURE_PORTAL = 500; //AP for capturing a portal
window.DEPLOY_RESONATOR = 125; //AP for deploying a resonator
window.COMPLETION_BONUS = 250; //AP for deploying all resonators on portal
window.UPGRADE_ANOTHERS_RESONATOR = 65; //AP for upgrading another's resonator
window.MAX_PORTAL_LEVEL = 8;
window.MAX_RESO_PER_PLAYER = [0, 8, 4, 4, 4, 2, 2, 1, 1];

// OTHER MORE-OR-LESS CONSTANTS //////////////////////////////////////
window.TEAM_NONE = 0;
window.TEAM_RES = 1;
window.TEAM_ENL = 2;
window.TEAM_TO_CSS = ['none', 'res', 'enl'];
window.TYPE_UNKNOWN = 0;
window.TYPE_PORTAL = 1;
window.TYPE_LINK = 2;
window.TYPE_FIELD = 3;
window.TYPE_PLAYER = 4;
window.TYPE_CHAT = 5;
window.TYPE_RESONATOR = 6;

window.SLOT_TO_LAT = [0, Math.sqrt(2)/2, 1, Math.sqrt(2)/2, 0, -Math.sqrt(2)/2, -1, -Math.sqrt(2)/2];
window.SLOT_TO_LNG = [1, Math.sqrt(2)/2, 0, -Math.sqrt(2)/2, -1, -Math.sqrt(2)/2, 0, Math.sqrt(2)/2];
window.EARTH_RADIUS=6378137;
window.DEG2RAD = Math.PI / 180;

// STORAGE ///////////////////////////////////////////////////////////
// global variables used for storage. Most likely READ ONLY. Proper
// way would be to encapsulate them in an anonymous function and write
// getters/setters, but if you are careful enough, this works.
var refreshTimeout;
var urlPortal = null;
window.playersToResolve = [];
window.playersInResolving = [];
window.selectedPortal = null;
window.portalRangeIndicator = null;
window.portalAccessIndicator = null;
window.mapRunsUserAction = false;
var portalsLayers, linksLayer, fieldsLayer;

// contain references to all entities shown on the map. These are
// automatically kept in sync with the items on *sLayer, so never ever
// write to them.
window.portals = {};
window.links = {};
window.fields = {};
window.resonators = {};

// contain current status(on/off) of overlay layerGroups.
// But you should use isLayerGroupDisplayed(name) to check the status
window.overlayStatus = {};

// plugin framework. Plugins may load earlier than iitc, so don’t
// overwrite data
if(typeof window.plugin !== 'function') window.plugin = function() {};




// PORTAL DETAILS TOOLS //////////////////////////////////////////////
// hand any of these functions the details-hash of a portal, and they
// will return useful, but raw data.

// returns a float. Displayed portal level is always rounded down from
// that value.
window.getPortalLevel = function(d) {
  var lvl = 0;
  var hasReso = false;
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso) return true;
    lvl += parseInt(reso.level);
    hasReso = true;
  });
  return hasReso ? Math.max(1, lvl/8) : 0;
}

window.getTotalPortalEnergy = function(d) {
  var nrg = 0;
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso) return true;
    var level = parseInt(reso.level);
    var max = RESO_NRG[level];
    nrg += max;
  });
  return nrg;
}

// For backwards compatibility
window.getPortalEnergy = window.getTotalPortalEnergy;

window.getCurrentPortalEnergy = function(d) {
  var nrg = 0;
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso) return true;
    nrg += parseInt(reso.energyTotal);
  });
  return nrg;
}

window.getPortalRange = function(d) {
  // formula by the great gals and guys at
  // http://decodeingress.me/2012/11/18/ingress-portal-levels-and-link-range/

  var lvl = 0;
  var resoMissing = false;
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso) {
      resoMissing = true;
      return false;
    }
    lvl += parseInt(reso.level);
  });
  if(resoMissing) return 0;
  return 160*Math.pow(getPortalLevel(d), 4);
}

window.getAvgResoDist = function(d) {
  var sum = 0, resos = 0;
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso) return true;
    sum += parseInt(reso.distanceToPortal);
    resos++;
  });
  return resos ? sum/resos : 0;
}

window.getAttackApGain = function(d) {
  var resoCount = 0;
  var maxResonators = MAX_RESO_PER_PLAYER.slice(0);
  var curResonators = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  for(var n = PLAYER.level + 1; n < 9; n++) {
    maxResonators[n] = 0;
  }
  $.each(d.resonatorArray.resonators, function(ind, reso) {
    if(!reso)
      return true;
    resoCount += 1;
    if(reso.ownerGuid === PLAYER.guid) {
      maxResonators[parseInt(reso.level)] -= 1;
    } else {
      curResonators[parseInt(reso.level)] += 1;
    }
  });

  var linkCount = d.portalV2.linkedEdges ? d.portalV2.linkedEdges.length : 0;
  var fieldCount = d.portalV2.linkedFields ? d.portalV2.linkedFields.length : 0;

  var resoAp = resoCount * DESTROY_RESONATOR;
  var linkAp = linkCount * DESTROY_LINK;
  var fieldAp = fieldCount * DESTROY_FIELD;
  var destroyAp = resoAp + linkAp + fieldAp;
  var captureAp = CAPTURE_PORTAL + 8 * DEPLOY_RESONATOR + COMPLETION_BONUS;
  var enemyAp = destroyAp + captureAp;
  var deployCount = 8 - resoCount;
  var completionAp = (deployCount > 0) ? COMPLETION_BONUS : 0;
  var upgradeCount = 0;
  var upgradeAvailable = maxResonators[8];
  for(var n = 7; n >= 0; n--) {
    upgradeCount += curResonators[n];
    if(upgradeAvailable < upgradeCount) {
        upgradeCount -= (upgradeCount - upgradeAvailable);
    }
    upgradeAvailable += maxResonators[n];
  }
  var friendlyAp = deployCount * DEPLOY_RESONATOR + upgradeCount * UPGRADE_ANOTHERS_RESONATOR + completionAp;
  return {
    friendlyAp: friendlyAp,
    deployCount: deployCount,
    upgradeCount: upgradeCount,
    enemyAp: enemyAp,
    destroyAp: destroyAp,
    resoAp: resoAp,
    captureAp: captureAp
  };
}

//This function will return the potential level a player can upgrade it to
window.potentialPortalLevel = function(d) {
  var current_level = getPortalLevel(d);
  var potential_level = current_level;
  
  if(PLAYER.team === d.controllingTeam.team) {
    var resonators_on_portal = d.resonatorArray.resonators;
    var resonator_levels = new Array();
    // figure out how many of each of these resonators can be placed by the player
    var player_resontators = new Array();
    for(var i=1;i<=MAX_PORTAL_LEVEL; i++) {
      player_resontators[i] = i > PLAYER.level ? 0 : MAX_RESO_PER_PLAYER[i];
    }
    $.each(resonators_on_portal, function(ind, reso) {
      if(reso !== null && reso.ownerGuid === window.PLAYER.guid) {
        player_resontators[reso.level]--;
      }
      resonator_levels.push(reso === null ? 0 : reso.level);  
    });
    
    resonator_levels.sort(function(a, b) {
      return(a - b);
    });
    
    // Max out portal
    var install_index = 0;
    for(var i=MAX_PORTAL_LEVEL;i>=1; i--) {
      for(var install = player_resontators[i]; install>0; install--) {
        if(resonator_levels[install_index] < i) {
          resonator_levels[install_index] = i;
          install_index++;
        }
      }
    }
    //console.log(resonator_levels);
    potential_level = resonator_levels.reduce(function(a, b) {return a + b;}) / 8;
  }
  return(potential_level);
}



// PORTAL RENDER LIMIT HANDLER ///////////////////////////////////////
// Functions to handle hiding low level portal when portal render 
// limit is reached. 
//
// On initialization, previous minLevel will preserve to previousMinLevel
// and modify with zoom level difference. 
//
// After initialized and reset in window.requestData(), "processPortals" 
// intercept all portals data in "handleDataResponse". Put the count of 
// new portals to newPortalsPerLevel[portal level]. Portals with level >= 
// previousMinLevel and already on map will return as result and continue 
// to render. Others will save to portalsLowerThanPrevMinLv. If there is 
// no more active request of map data, portalsLowerThanPrevMinLv will add 
// back to result and render base on current minLevel. 
//
// "window.handleFailRequest" is added to handle the case when the last request 
// failed and "processPortals" didn't get called. It will get
// portalsLowerThanPrevMinLv base on current minLevel and render them.
//
// "getMinLevel" will be called by "getMinPortalLevel" in utils_misc.js 
// to determine min portal level to draw on map.
// 
// "getMinLevel" will return minLevel and call "setMinLevel" if 
// minLevel hasn't set yet. 
// 
// In "setMinLevel", it will loop through all portal level from 
// high to low, and sum total portal count (old + new) to check 
// minLevel. 
//
// minLevel is preserved and only replaced when render limit reached in 
// higher level, until next window.requestData() called and reset.
// 

window.portalRenderLimit = function() {}

window.portalRenderLimit.initialized = false;
window.portalRenderLimit.minLevelSet = false;
window.portalRenderLimit.minLevel = -1;
window.portalRenderLimit.previousMinLevel = -1;
window.portalRenderLimit.previousZoomLevel = null;
window.portalRenderLimit.newPortalsPerLevel = new Array(MAX_PORTAL_LEVEL + 1);
window.portalRenderLimit.portalsLowerThanPrevMinLv = new Array(MAX_PORTAL_LEVEL + 1);

window.portalRenderLimit.init = function () {
  var currentZoomLevel = map.getZoom();
  // previousZoomLevel set to current zoom level on the first run
  portalRenderLimit.previousZoomLevel = portalRenderLimit.previousZoomLevel || currentZoomLevel;

  // If there is a minLevel set in previous run, calculate previousMinLevel with it.
  if(portalRenderLimit.minLevelSet) {
    var zoomDiff = currentZoomLevel - portalRenderLimit.previousZoomLevel;
    portalRenderLimit.previousMinLevel = Math.max(portalRenderLimit.minLevel - zoomDiff, -1);
    portalRenderLimit.previousMinLevel = Math.min(portalRenderLimit.previousMinLevel, MAX_PORTAL_LEVEL);
  }

  portalRenderLimit.previousZoomLevel = currentZoomLevel;

  portalRenderLimit.minLevel = -1;
  portalRenderLimit.resetCounting();
  portalRenderLimit.resetPortalsLowerThanPrevMinLv();
  portalRenderLimit.initialized = true;
}

window.portalRenderLimit.resetCounting = function() {
  portalRenderLimit.minLevelSet = false;
  for(var i = 0; i <= MAX_PORTAL_LEVEL; i++) {
    portalRenderLimit.newPortalsPerLevel[i] = 0;
  }
}

window.portalRenderLimit.resetPortalsLowerThanPrevMinLv = function() {
  for(var i = 0; i <= MAX_PORTAL_LEVEL; i++) {
    portalRenderLimit.portalsLowerThanPrevMinLv[i] = {};
  }
}

// Use to clean up level of portals which is over render limit after counting new portals
window.portalRenderLimit.cleanUpOverLimitPortalLevel = function() {
  var currentMinLevel = window.getMinPortalLevel();
  for(var i = 0; i < currentMinLevel; i++) {
    portalsLayers[i].eachLayer(function(item) {
      var itemGuid = item.options.guid;
      // check if 'item' is a portal
      if(getTypeByGuid(itemGuid) != TYPE_PORTAL) return true;
      // Don’t remove if it is selected.
      if(itemGuid == window.selectedPortal) return true;
      portalsLayers[i].removeLayer(item);
    });
  }
}

// Count new portals. Then split lower level portal if it's not last request. 
// And Merge back if it's last request and render limit not yet hit
window.portalRenderLimit.splitOrMergeLowLevelPortals = function(originPortals) {
  portalRenderLimit.resetCounting();
  portalRenderLimit.countingPortals(originPortals);

  var resultPortals = requests.isLastRequest('getThinnedEntitiesV2')
    ? portalRenderLimit.mergeLowLevelPortals(originPortals)
    : portalRenderLimit.splitLowLevelPortals(originPortals);

  return resultPortals;
}

window.portalRenderLimit.countingPortals = function(portals) {
  $.each(portals, function(ind, portal) {
    var portalGuid = portal[0];
    var portalLevel = parseInt(getPortalLevel(portal[2]));
    var layerGroup = portalsLayers[portalLevel];

    if(findEntityInLeaflet(layerGroup, window.portals, portalGuid)) return true;

    portalRenderLimit.newPortalsPerLevel[portalLevel]++;
  });
}

// Split the portal if it's lower level and not on map
window.portalRenderLimit.splitLowLevelPortals = function(portals) {
  var resultPortals = {};

  $.each(portals || {}, function(guid, portal) {
    var portalLevel = parseInt(getPortalLevel(portal[2]));
    var portalOnMap = window.portals[guid];

    if(!portalOnMap && portalLevel < portalRenderLimit.previousMinLevel) {
      portalRenderLimit.portalsLowerThanPrevMinLv[portalLevel][guid] = portal;
    } else {
      resultPortals[guid] = portal;
    }
  });
  return resultPortals;
}

window.portalRenderLimit.mergeLowLevelPortals = function(appendTo) {
  var resultPortals = appendTo ? appendTo : {};
  for(var i = portalRenderLimit.getMinLevel();
      i < portalRenderLimit.previousMinLevel;
     i++) {
    $.extend(resultPortals, portalRenderLimit.portalsLowerThanPrevMinLv[i]);
  }

  // Reset portalsLowerThanPrevMinLv, ensure they return only once
  portalRenderLimit.resetPortalsLowerThanPrevMinLv();
  return resultPortals;
}

window.portalRenderLimit.getMinLevel = function() {
  if(!portalRenderLimit.initialized) return -1;
  if(!portalRenderLimit.minLevelSet) portalRenderLimit.setMinLevel();
  return portalRenderLimit.minLevel;
}

window.portalRenderLimit.setMinLevel = function() {
  var totalPortalsCount = 0;
  var newMinLevel = MAX_PORTAL_LEVEL + 1;
  
  // Find the min portal level under render limit
  while(newMinLevel > 0) {
    var oldPortalCount = layerGroupLength(portalsLayers[newMinLevel - 1]);
    var storedPortalCount = Object.keys(portalRenderLimit.portalsLowerThanPrevMinLv[newMinLevel - 1]).length;
    var newPortalCount = Math.max(storedPortalCount, portalRenderLimit.newPortalsPerLevel[newMinLevel - 1]);

    totalPortalsCount += oldPortalCount + newPortalCount;
    if(totalPortalsCount >= MAX_DRAWN_PORTALS)
      break;
    newMinLevel--;
  }
  
  // If render limit reached at max portal level, still let portal at max level render
  newMinLevel = Math.min(newMinLevel, MAX_PORTAL_LEVEL);
  
  portalRenderLimit.minLevel = Math.max(newMinLevel, portalRenderLimit.minLevel);
  portalRenderLimit.minLevelSet = true;
}


// PLUGIN HOOKS ////////////////////////////////////////////////////////
// Plugins may listen to any number of events by specifying the name of
// the event to listen to and handing a function that should be exe-
// cuted when an event occurs. Callbacks will receive additional data
// the event created as their first parameter. The value is always a
// hash that contains more details.
//
// For example, this line will listen for portals to be added and print
// the data generated by the event to the console:
// window.addHook('portalAdded', function(data) { console.log(data) });
//
// Boot hook: booting is handled differently because IITC may not yet
//            be available. Have a look at the plugins in plugins/. All
//            code before “// PLUGIN START” and after “// PLUGIN END” is
//            required to successfully boot the plugin.
//
// Here’s more specific information about each event:
// portalAdded: called when a portal has been received and is about to
//              be added to its layer group. Note that this does NOT
//              mean it is already visible or will be, shortly after.
//              If a portal is added to a hidden layer it may never be
//              shown at all. Injection point is in
//              code/map_data.js#renderPortal near the end. Will hand
//              the Leaflet CircleMarker for the portal in "portal" var.
// portalDetailsUpdated: fired after the details in the sidebar have
//              been (re-)rendered Provides data about the portal that
//              has been selected.
// publicChatDataAvailable: this hook runs after data for any of the
//              public chats has been received and processed, but not
//              yet been displayed. The data hash contains both the un-
//              processed raw ajax response as well as the processed
//              chat data that is going to be used for display.
// factionChatDataAvailable: this hook runs after data for the faction
//              chat has been received and processed, but not yet been
//              displayed. The data hash contains both the unprocessed
//              raw ajax response as well as the processed chat data
//              that is going to be used for display.
// portalDataLoaded: callback is passed the argument of
//              {portals : [portal, portal, ...]} where "portal" is the
//              data element and not the leaflet object. "portal" is an
//              array [GUID, time, details]. Plugin can manipulate the
//              array to change order or add additional values to the
//              details of a portal.
// beforePortalReRender: the callback argument is
//              {portal: ent[2], oldPortal : d, portalGuid: ent[0], reRender : false}.
//              The callback needs to update the value of reRender to
//              true if the plugin has a reason to have the portal
//              redrawn. It is called early on in the
//              code/map_data.js#renderPortal as long as there was an
//              old portal for the guid.
// checkRenderLimit: callback is passed the argument of
//              {reached : false} to indicate that the renderlimit is reached
//              set reached to true.
// requestFinished: called after each request finished. Argument is
//              {success: boolean} indicated the request success or fail.
// iitcLoaded: called after IITC and all plugins loaded


window._hooks = {}
window.VALID_HOOKS = ['portalAdded', 'portalDetailsUpdated',
  'publicChatDataAvailable', 'factionChatDataAvailable', 'portalDataLoaded',
  'beforePortalReRender', 'checkRenderLimit', 'requestFinished', 'nicknameClicked',
  'geoSearch', 'iitcLoaded'];

window.runHooks = function(event, data) {
  if(VALID_HOOKS.indexOf(event) === -1) throw('Unknown event type: ' + event);

  if(!_hooks[event]) return true;
  var interupted = false;
  $.each(_hooks[event], function(ind, callback) {
    if (callback(data) === false) {
      interupted = true;
      return false;  //break from $.each
    }
  });
  return !interupted;
}


window.addHook = function(event, callback) {
  if(VALID_HOOKS.indexOf(event) === -1) throw('Unknown event type: ' + event);
  if(typeof callback !== 'function') throw('Callback must be a function.');

  if(!_hooks[event])
    _hooks[event] = [callback];
  else
    _hooks[event].push(callback);
}



// DEBUGGING TOOLS ///////////////////////////////////////////////////
// meant to be used from browser debugger tools and the like.

window.debug = function() {}

window.debug.renderDetails = function() {
  console.log('portals: ' + Object.keys(portals).length);
  console.log('links:   ' + Object.keys(links).length);
  console.log('fields:  ' + Object.keys(fields).length);
}

window.debug.printStackTrace = function() {
  var e = new Error('dummy');
  console.log(e.stack);
  return e.stack;
}

window.debug.clearPortals = function() {
  for(var i = 0; i < portalsLayers.length; i++)
    portalsLayers[i].clearLayers();
}

window.debug.clearLinks = function() {
  linksLayer.clearLayers();
}

window.debug.clearFields = function() {
  fieldsLayer.clearLayers();
}

window.debug.getFields = function() {
  return fields;
}

window.debug.forceSync = function() {
  localStorage.clear();
  window.playersToResolve = [];
  window.playersInResolving = [];
  debug.clearFields();
  debug.clearLinks();
  debug.clearPortals();
  updateGameScore();
  requestData();
}

window.debug.console = function() {
  $('#debugconsole').text();
}

window.debug.console.show = function() {
    $('#scrollwrapper, #updatestatus').hide();
    // not displaying the map causes bugs in Leaflet
    $('#map').css('visibility', 'hidden');
    $('#chat, #chatinput').show();
         window.debug.console.create();
    $('#chatinput mark').css('cssText', 'color: #bbb !important').text('debug:');
    $('#chat > div').hide();
    $('#debugconsole').show();
    $('#chatcontrols .active').removeClass('active');
    $("#chatcontrols a:contains('debug')").addClass('active');
}

window.debug.console.create = function() {
  if($('#debugconsole').length) return;
  $('#chatcontrols').append('<a>debug</a>');
  $('#chatcontrols a:last').click(window.debug.console.show);
  $('#chat').append('<div style="display: none" id="debugconsole"><table></table></div>');
}

window.debug.console.renderLine = function(text, errorType) {
  debug.console.create();
  switch(errorType) {
    case 'error':   var color = '#FF424D'; break;
    case 'warning': var color = '#FFDE42'; break;
    default:        var color = '#eee';
  }
  if(typeof text !== 'string' && typeof text !== 'number') {
    var cache = [];
    text = JSON.stringify(text, function(key, value) {
      if(typeof value === 'object' && value !== null) {
        if(cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null;
  }
  var d = new Date();
  var ta = d.toLocaleTimeString(); // print line instead maybe?
  var tb = d.toLocaleString();
  var t = '<time title="'+tb+'" data-timestamp="'+d.getTime()+'">'+ta+'</time>';
  var s = 'style="color:'+color+'"';
  var l = '<tr><td>'+t+'</td><td><mark '+s+'>'+errorType+'</mark></td><td>'+text+'</td></tr>';
  $('#debugconsole table').prepend(l);
}

window.debug.console.log = function(text) {
  debug.console.renderLine(text, 'notice');
}

window.debug.console.warn = function(text) {
  debug.console.renderLine(text, 'warning');
}

window.debug.console.error = function(text) {
  debug.console.renderLine(text, 'error');
}

window.debug.console.overwriteNative = function() {
  window.debug.console.create();
  window.console = function() {}
  window.console.log = window.debug.console.log;
  window.console.warn = window.debug.console.warn;
  window.console.error = window.debug.console.error;
}

window.debug.console.overwriteNativeIfRequired = function() {
  if(!window.console || L.Browser.mobile)
    window.debug.console.overwriteNative();
}


// Portal Highlighter //////////////////////////////////////////////////////////
// these functions handle portal highlighters


window._highlighters = null;
window._current_highlighter = localStorage.portal_highlighter;
window.changing_highlighters = false;
window._no_highlighter = 'No Highlights';

window.addPortalHighlighter = function(name, callback) {
  if(_highlighters === null) {
    _highlighters = {};
  }
  _highlighters[name] = callback;
  if(localStorage.portal_highlighter === undefined) {
    _current_highlighter = name;
    localStorage.portal_highlighter = name;
  }
  portalHighlighterControl();
}

window.portalHighlighterControl = function() {
  if(_highlighters !== null) {
    if($('#portal_highlight_select').length === 0) {
      $("body").append("<select id='portal_highlight_select'></select>");
    }
    $("#portal_highlight_select").html('');
    $("#portal_highlight_select").append($("<option>").attr('value',_no_highlighter).text(_no_highlighter));
    var h_names = Object.keys(_highlighters).sort();
    
    $.each(h_names, function(i, name) {  
      $("#portal_highlight_select").append($("<option>").attr('value',name).text(name));
    });
    $("#portal_highlight_select").val(_current_highlighter);
    $("#portal_highlight_select").change(function(){ changePortalHighlights($(this).val());});
    // notify android that the select spinner is enabled.
    // this disables javascript injection on android side.
    // if android is not notified, the spinner closes on the next JS call
    if (typeof android !== 'undefined' && android && android.spinnerEnabled) {
      $("#portal_highlight_select").click(function(){ android.spinnerEnabled(true);});
      $("#portal_highlight_select").focus(function(){ android.spinnerEnabled(false);});
    }
    $(".leaflet-top.leaflet-left").css('padding-top', '20px');
    $(".leaflet-control-scale-line").css('margin-top','25px');
  }
}

window.changePortalHighlights = function(name) {
  changing_highlighters = true;
  _current_highlighter = name;
  resetHighlightedPortals();
  changing_highlighters = false;
  localStorage.portal_highlighter = name;
}

window.highlightPortal = function(p) {
  
  if(_highlighters !== null && _highlighters[_current_highlighter] !== undefined) {
    p.options.highligher = _current_highlighter;
    _highlighters[_current_highlighter]({portal: p});
  }
}

window.resetHighlightedPortals = function() {
  $.each(portals, function(ind, portal) {
    try {
      renderPortal(portal.options.ent);
    }
    catch(e) {}
  }); 
}


// PORTAL DETAILS DISPLAY ////////////////////////////////////////////
// hand any of these functions the details-hash of a portal, and they
// will return pretty, displayable HTML or parts thereof.

// returns displayable text+link about portal range
window.getRangeText = function(d) {
  var range = getPortalRange(d);
  return ['range',
      '<a onclick="window.rangeLinkClick()">'
    + (range > 1000
      ? Math.round(range/1000) + ' km'
      : Math.round(range)      + ' m')
    + '</a>'];
}

// generates description text from details for portal
window.getPortalDescriptionFromDetails = function(details) {
  var descObj = details.portalV2.descriptiveText;
  // FIXME: also get real description?
  var desc = descObj.TITLE + '\n' + descObj.ADDRESS;
  if(descObj.ATTRIBUTION)
    desc += '\nby '+descObj.ATTRIBUTION+' ('+descObj.ATTRIBUTION_LINK+')';
  return desc;
}


// given portal details, returns html code to display mod details.
window.getModDetails = function(d) {
  var mods = [];
  var modsTitle = [];
  var modsColor = [];
  $.each(d.portalV2.linkedModArray, function(ind, mod) {
    if(!mod) {
      mods.push('');
      modsTitle.push('');
      modsColor.push('#000');
    } else if(mod.type === 'RES_SHIELD') {

      var title = mod.rarity.capitalize() + ' ' + mod.displayName + '\n';
      title += 'Installed by: '+ getPlayerName(mod.installingUser);

      title += '\nStats:';
      for (var key in mod.stats) {
        if (!mod.stats.hasOwnProperty(key)) continue;
        title += '\n+' +  mod.stats[key] + ' ' + key.capitalize();
      }

      mods.push(mod.rarity.capitalize().replace('_', ' ') + ' ' + mod.displayName);
      modsTitle.push(title);
      modsColor.push(COLORS_MOD[mod.rarity]);
    } else {
      mods.push(mod.type);
      modsTitle.push('Unknown mod. No further details available.');
      modsColor.push('#FFF');
    }
  });

  var t = '<span'+(modsTitle[0].length ? ' title="'+modsTitle[0]+'"' : '')+' style="color:'+modsColor[0]+'">'+mods[0]+'</span>'
        + '<span'+(modsTitle[1].length ? ' title="'+modsTitle[1]+'"' : '')+' style="color:'+modsColor[1]+'">'+mods[1]+'</span>'
        + '<span'+(modsTitle[2].length ? ' title="'+modsTitle[2]+'"' : '')+' style="color:'+modsColor[2]+'">'+mods[2]+'</span>'
        + '<span'+(modsTitle[3].length ? ' title="'+modsTitle[3]+'"' : '')+' style="color:'+modsColor[3]+'">'+mods[3]+'</span>'

  return t;
}

window.getEnergyText = function(d) {
  var currentNrg = getCurrentPortalEnergy(d);
  var totalNrg = getTotalPortalEnergy(d);
  var inf = currentNrg + ' / ' + totalNrg;
  var fill = prettyEnergy(currentNrg) + ' / ' + prettyEnergy(totalNrg)
  return ['energy', '<tt title="'+inf+'">' + fill + '</tt>'];
}

window.getAvgResoDistText = function(d) {
  var avgDist = Math.round(10*getAvgResoDist(d))/10;
  return ['reso dist', avgDist + ' m'];
}

window.getResonatorDetails = function(d) {
  var resoDetails = [];
  // octant=slot: 0=E, 1=NE, 2=N, 3=NW, 4=W, 5=SW, 6=S, SE=7
  // resos in the display should be ordered like this:
  //   N    NE         Since the view is displayed in columns, they
  //  NW    E          need to be ordered like this: N, NW, W, SW, NE,
  //   W    SE         E, SE, S, i.e. 2 3 4 5 1 0 7 6
  //  SW    S

  $.each([2, 1, 3, 0, 4, 7, 5, 6], function(ind, slot) {
    var reso = d.resonatorArray.resonators[slot];
    if(!reso) {
      resoDetails.push(renderResonatorDetails(slot, 0, 0, null, null));
      return true;
    }

    var l = parseInt(reso.level);
    var v = parseInt(reso.energyTotal);
    var nick = window.getPlayerName(reso.ownerGuid);
    var dist = reso.distanceToPortal;
    // if array order and slot order drift apart, at least the octant
    // naming will still be correct.
    slot = parseInt(reso.slot);

    resoDetails.push(renderResonatorDetails(slot, l, v, dist, nick));
  });
  return genFourColumnTable(resoDetails);
}

// helper function that renders the HTML for a given resonator. Does
// not work with raw details-hash. Needs digested infos instead:
// slot: which slot this resonator occupies. Starts with 0 (east) and
// rotates clockwise. So, last one is 7 (southeast).
window.renderResonatorDetails = function(slot, level, nrg, dist, nick) {
  if(level === 0) {
    var meter = '<span class="meter" title="octant:\t' + OCTANTS[slot] + ' ' + OCTANTS_ARROW[slot] + '"></span>';
  } else {
    var max = RESO_NRG[level];
    var fillGrade = nrg/max*100;

    var inf = 'energy:\t' + nrg   + ' / ' + max + ' (' + Math.round(fillGrade) + '%)\n'
            + 'level:\t'  + level + '\n'
            + 'distance:\t' + dist  + 'm\n'
            + 'owner:\t'  + nick  + '\n'
            + 'octant:\t' + OCTANTS[slot] + ' ' + OCTANTS_ARROW[slot];

    var style = 'width:'+fillGrade+'%; background:'+COLORS_LVL[level]+';';

    var color = (level < 3 ? "#9900FF" : "#FFFFFF");

    var lbar = '<span class="meter-level" style="color: ' + color + ';"> ' + level + ' </span>';

    var fill  = '<span style="'+style+'"></span>';

    var meter = '<span class="meter" title="'+inf+'">' + fill + lbar + '</span>';
  }
  nick = nick ? '<span class="nickname">'+nick+'</span>' : null;
  return [meter, nick || ''];
}

// calculate AP gain from destroying portal and then capturing it by deploying resonators
window.getAttackApGainText = function(d) {
  var breakdown = getAttackApGain(d);
  var totalGain = breakdown.enemyAp;

  function tt(text) {
    var t = '';
    if (PLAYER.team == d.controllingTeam.team) {
      totalGain = breakdown.friendlyAp;
      t += 'Friendly AP:\t' + breakdown.friendlyAp + '\n';
      t += '  Deploy ' + breakdown.deployCount + ', ';
      t += 'Upgrade ' + breakdown.upgradeCount + '\n';
      t += '\n';
    }
    t += 'Enemy AP:\t' + breakdown.enemyAp + '\n';
    t += '  Destroy AP:\t' + breakdown.destroyAp + '\n';
    t += '  Capture AP:\t' + breakdown.captureAp + '\n';
    return '<tt title="' + t + '">' + digits(text) + '</tt>';
  }

  return [tt('AP Gain'), tt(totalGain)];
}


// UTILS + MISC  ///////////////////////////////////////////////////////

window.aboutIITC = function(){
  var v = 'jonatkins-2013-05-22-175822';
  var attrib = '<p>This project is licensed under the permissive ISC license. Parts imported from other projects remain under their respective licenses:</p><ul><li><a href="https://github.com/bryanwoods/autolink-js">autolink-js by Bryan Woods; MIT</a></li><li><a href="https://github.com/chriso/load.js">load.js by Chris O\'Hara; MIT</a></li><li><a href="http://leafletjs.com/">leaflet.js; custom license (but appears free)</a></li><li><a href="https://github.com/Leaflet/Leaflet.draw">leaflet.draw.js; by jacobtoye; MIT</a></li><li><a href="https://github.com/shramov/leaflet-plugins"><code>leaflet_google.js</code> by Pavel Shramov; same as Leaftlet</a> (modified, though)</li><li><a href="https://github.com/jeromeetienne/jquery-qrcode">jquery.qrcode.js by Jerome Etienne; MIT</a></li><li><a href="https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet">oms.min.js by George MacKerron; MIT</a></li><li><a href="https://github.com/richadams/jquery-taphold">taphold.js by Rich Adams; unknown</a></li><li><a href="https://github.com/kartena/Leaflet.Pancontrol">L.Control.Pan.js by Kartena AB; same as Leaftlet</a></li><li><a href="https://github.com/kartena/Leaflet.zoomslider">L.Control.Zoomslider.js by Kartena AB; same as Leaftlet</a></li><li>StackOverflow-CopyPasta is attributed in the source; <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-Wiki</a></li><li>all Ingress/Niantic related stuff obviously remains non-free and is still copyrighted by Niantic/Google</li></ul>';
  var contrib = '<p>So far, these people have contributed:</p>\n\n<p><a href="https://github.com/Bananeweizen">Bananeweizen</a>,\n<a href="https://github.com/blakjakau">blakjakau</a>,\n<a href="https://github.com/boombuler">boombuler</a>,\n<a href="https://github.com/breunigs">breunigs</a>,\n<a href="https://github.com/ccjon">ccjon</a>,\n<a href="https://github.com/cmrn">cmrn</a>,\n<a href="https://github.com/epf">epf</a>,\n<a href="https://github.com/Fragger">Fragger</a>,\n<a href="https://github.com/integ3r">integ3r</a>,\n<a href="https://github.com/j16sdiz">j16sdiz</a>,\n<a href="https://github.com/JasonMillward">JasonMillward</a>,\n<a href="https://github.com/jonatkins">jonatkins</a>,\n<a href="https://github.com/leCradle">leCradle</a>,\n<a href="https://github.com/Merovius">Merovius</a>,\n<a href="https://github.com/mledoze">mledoze</a>,\n<a href="https://github.com/OshiHidra">OshiHidra</a>,\n<a href="https://github.com/phoenixsong6">phoenixsong6</a>,\n<a href="https://github.com/Pirozek">Pirozek</a>,\n<a href="https://github.com/saithis">saithis</a>,\n<a href="https://github.com/Scrool">Scrool</a>,\n<a href="https://github.com/sorgo">sorgo</a>,\n<a href="https://github.com/tpenner">tpenner</a>,\n<a href="https://github.com/vita10gy">vita10gy</a>,\n<a href="https://github.com/Xelio">Xelio</a>,\n<a href="https://github.com/ZauberNerd">ZauberNerd</a>,\n<a href="https://github.com/waynn">waynn</a></p>'
  var a = ''
  + '  <div><b>About IITC</b></div> '
  + '  <div>Ingress Intel Total Conversion</div> '
  + '  <hr>'
  + '  <div>'
  + '    <a href="http://iitc.jonatkins.com/" target="_blank">IITC Homepage</a><br />'
  + '     On the script’s homepage you can:'
  + '     <ul>'
  + '       <li>Find Updates</li>'
  + '       <li>Get Plugins</li>'
  + '       <li>Report Bugs</li>'
  + '       <li>Contribute!</li>'
  + '     </ul>'
  + '  </div>'
  + '  <div>'
  + '    MapQuest OSM tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">'
  + '  </div>'
  + '  <hr>'
  + '  <div>Version: ' + v + '</div>'
  + '  <hr>'
  + '  <div>' + attrib + '</div>'
  + '  <hr>'
  + '  <div>' + contrib + '</div>';
  dialog({
    title: 'IITC ' + v,
    html: a,
    dialogClass: 'ui-dialog-aboutIITC'
  });
}


window.layerGroupLength = function(layerGroup) {
  var layersCount = 0;
  var layers = layerGroup._layers;
  if (layers)
    layersCount = Object.keys(layers).length;
  return layersCount;
}

// retrieves parameter from the URL?query=string.
window.getURLParam = function(param) {
  var v = document.URL;
  var i = v.indexOf(param);
  if(i <= -1) return '';
  v = v.substr(i);
  i = v.indexOf("&");
  if(i >= 0) v = v.substr(0, i);
  return v.replace(param+"=","");
}

// read cookie by name.
// http://stackoverflow.com/a/5639455/1684530 by cwolves
var cookies;
window.readCookie = function(name,c,C,i){
  if(cookies) return cookies[name];
  c = document.cookie.split('; ');
  cookies = {};
  for(i=c.length-1; i>=0; i--){
    C = c[i].split('=');
    cookies[C[0]] = unescape(C[1]);
  }
  return cookies[name];
}

window.writeCookie = function(name, val) {
  document.cookie = name + "=" + val + '; expires=Thu, 31 Dec 2020 23:59:59 GMT; path=/';
}

window.eraseCookie = function(name) {
  document.cookie = name + '=; expires=Thu, 1 Jan 1970 00:00:00 GMT; path=/';
}

//certain values were stored in cookies, but we're better off using localStorage instead - make it easy to convert
window.convertCookieToLocalStorage = function(name) {
  var cookie=readCookie(name);
  if(cookie !== undefined) {
    console.log('converting cookie '+name+' to localStorage');
    if(localStorage[name] === undefined) {
      localStorage[name] = cookie;
    }
    eraseCookie(name);
  }
}

// add thousand separators to given number.
// http://stackoverflow.com/a/1990590/1684530 by Doug Neiner.
window.digits = function(d) {
  return (d+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
}

// posts AJAX request to Ingress API.
// action: last part of the actual URL, the rpc/dashboard. is
//         added automatically
// data: JSON data to post. method will be derived automatically from
//       action, but may be overridden. Expects to be given Hash.
//       Strings are not supported.
// success: method to call on success. See jQuery API docs for avail-
//          able arguments: http://api.jquery.com/jQuery.ajax/
// error: see above. Additionally it is logged if the request failed.
window.postAjax = function(action, data, success, error) {
  var post_data = JSON.stringify($.extend({method: 'dashboard.'+action}, data));
  var remove = function(data, textStatus, jqXHR) { window.requests.remove(jqXHR); };
  var errCnt = function(jqXHR) { window.failedRequestCount++; window.requests.remove(jqXHR); };
  var result = $.ajax({
    url: '/rpc/dashboard.'+action,
    type: 'POST',
    data: post_data,
    context: data,
    dataType: 'json',
    success: [remove, success],
    error: error ? [errCnt, error] : errCnt,
    contentType: 'application/json; charset=utf-8',
    beforeSend: function(req) {
      req.setRequestHeader('X-CSRFToken', readCookie('csrftoken'));
    }
  });
  result.action = action;
  return result;
}

// converts unix timestamps to HH:mm:ss format if it was today;
// otherwise it returns YYYY-MM-DD
window.unixTimeToString = function(time, full) {
  if(!time) return null;
  var d = new Date(typeof time === 'string' ? parseInt(time) : time);
  var time = d.toLocaleTimeString();
  var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  if(typeof full !== 'undefined' && full) return date + ' ' + time;
  if(d.toDateString() == new Date().toDateString())
    return time;
  else
    return date;
}

window.unixTimeToHHmm = function(time) {
  if(!time) return null;
  var d = new Date(typeof time === 'string' ? parseInt(time) : time);
  var h = '' + d.getHours(); h = h.length === 1 ? '0' + h : h;
  var s = '' + d.getMinutes(); s = s.length === 1 ? '0' + s : s;
  return  h + ':' + s;
}

window.rangeLinkClick = function() {
  if(window.portalRangeIndicator)
    window.map.fitBounds(window.portalRangeIndicator.getBounds());
  if(window.isSmartphone)
    window.smartphone.mapButton.click();
}

window.showPortalPosLinks = function(lat, lng, name) {
  var encoded_name = 'undefined';
  if(name !== undefined) {
    encoded_name = encodeURIComponent(name);
  }

  if (typeof android !== 'undefined' && android && android.intentPosLink) {
    android.intentPosLink(lat, lng, encoded_name);
  } else {
    var qrcode = '<div id="qrcode"></div>';
    var script = '<script>$(\'#qrcode\').qrcode({text:\'GEO:'+lat+','+lng+'\'});</script>';
    var gmaps = '<a href="https://maps.google.com/?q='+lat+','+lng+'%20('+encoded_name+')">Google Maps</a>';
    var bingmaps = '<a href="http://www.bing.com/maps/?v=2&cp='+lat+'~'+lng+'&lvl=16&sp=Point.'+lat+'_'+lng+'_'+encoded_name+'___">Bing Maps</a>';
    var osm = '<a href="http://www.openstreetmap.org/?mlat='+lat+'&mlon='+lng+'&zoom=16">OpenStreetMap</a>';
    var latLng = '<span>&lt;' + lat + ',' + lng +'&gt;</span>';
    dialog({
      html: '<div style="text-align: center;">' + qrcode + script + gmaps + '; ' + bingmaps + '; ' + osm + '<br />' + latLng + '</div>',
      title: name,
      id: 'poslinks'
    });
  }
}

window.androidCopy = function(text) {
  if(typeof android === 'undefined' || !android || !android.copy)
    return true; // i.e. execute other actions
  else
    android.copy(text);
  return false;
}

window.reportPortalIssue = function(info) {
  var t = 'Redirecting you to a Google Help Page.\n\nThe text box contains all necessary information. Press CTRL+C to copy it.';
  var d = window.portals[window.selectedPortal].options.details;

  var info = 'Your Nick: ' + PLAYER.nickname + '        '
    + 'Portal: ' + d.portalV2.descriptiveText.TITLE + '        '
    + 'Location: ' + d.portalV2.descriptiveText.ADDRESS
    +' (lat ' + (d.locationE6.latE6/1E6) + '; lng ' + (d.locationE6.lngE6/1E6) + ')';

  //codename, approx addr, portalname
  if(prompt(t, info) !== null)
    location.href = 'https://support.google.com/ingress?hl=en&contact=1';
}

window._storedPaddedBounds = undefined;
window.getPaddedBounds = function() {
  if(_storedPaddedBounds === undefined) {
    map.on('zoomstart zoomend movestart moveend', function() {
      window._storedPaddedBounds = null;
    });
  }
  if(renderLimitReached(0.7)) return window.map.getBounds();
  if(window._storedPaddedBounds) return window._storedPaddedBounds;

  var p = window.map.getBounds().pad(VIEWPORT_PAD_RATIO);
  window._storedPaddedBounds = p;
  return p;
}

// returns true if the render limit has been reached. The default ratio
// is 1, which means it will tell you if there are more items drawn than
// acceptable. A value of 0.9 will tell you if 90% of the amount of
// acceptable entities have been drawn. You can use this to heuristi-
// cally detect if the render limit will be hit.
window.renderLimitReached = function(ratio) {
  ratio = ratio || 1;
  if(Object.keys(portals).length*ratio >= MAX_DRAWN_PORTALS) return true;
  if(Object.keys(links).length*ratio >= MAX_DRAWN_LINKS) return true;
  if(Object.keys(fields).length*ratio >= MAX_DRAWN_FIELDS) return true;
  var param = { 'reached': false };
  window.runHooks('checkRenderLimit', param);
  return param.reached;
}

window.getPortalDataZoom = function() {
  var z = map.getZoom();

  // limiting the mazimum zoom level for data retrieval reduces the number of requests at high zoom levels
  // (as all portal data is retrieved at z=17, why retrieve multiple z=18 tiles when fewer z=17 would do?)
  // a potential downside - we end up requesting more data than we needed from the larger tiles that go off
  // the window edge. 
  if (z > 17) z=17;

  // we could consider similar zoom-level consolidation, as, e.g. level 16 and 15 both return L1+, always
  // request zoom 15 tiles. however, there are quirks in the current data stream, where small fields aren't
  // returned by the server. using larger tiles always would amplify this issue.


  //sanity check - should never happen
  if (z < 0) z=0;

  return z;
}

window.getMinPortalLevel = function() {
  var z = getPortalDataZoom();
  if(z >= 17) return 0;
  if(z < 0) return 8;
  var conv = [8,8,8,8,7,7,6,6,5,4,4,3,3,2,2,1,1];
  var minLevelByRenderLimit = portalRenderLimit.getMinLevel();
  var result = minLevelByRenderLimit > conv[z]
    ? minLevelByRenderLimit
    : conv[z];
  return result;
}

// returns number of pixels left to scroll down before reaching the
// bottom. Works similar to the native scrollTop function.
window.scrollBottom = function(elm) {
  if(typeof elm === 'string') elm = $(elm);
  return elm.get(0).scrollHeight - elm.innerHeight() - elm.scrollTop();
}

window.zoomToAndShowPortal = function(guid, latlng) {
  map.setView(latlng, 17);
  // if the data is available, render it immediately. Otherwise defer
  // until it becomes available.
  if(window.portals[guid])
    renderPortalDetails(guid);
  else
    urlPortal = guid;
}

// translates guids to entity types
window.getTypeByGuid = function(guid) {
  // All GUID type values, extracted from the ingress app .apk
  // some are almost certainly Niantic internal use only - never seen on the network
  // .1  == Panoramio portal [deprecated]
  // .2  == Random portal
  // .3  == Beacon
  // .4  == Resource (dropped media - other dropped items?)
  // .5  == Inventory item
  // .6  == Energy glob (XM)
  // .7  == Energy spawn location
  // .8  == HMDB portal [deprecated]
  // .9  == Link (internally "edge")                     ** TYPE_LINK
  // .a  == LocalStore portal [deprecated]
  // .b  == Control field (internally "captured region") ** TYPE_FIELD
  // .c  == Player                                       ** TYPE_PLAYER
  // .d  == COMM message (internally "plext")            ** TYPE_CHAT
  // .e  == Tracking record
  // .f  == Tracking group
  // .10 == Passcode reward [deprecated]
  // .11 == SuperOps portal                              ** TYPE_PORTAL - the batch loaded from panorimo, etc?
  // .12 == Anon portal                                  ** TYPE_PORTAL - user submitted by email?
  // .13 == Account info
  // .14 == GeoStore POI [deprecated]
  // .15 == GeoStore mod
  // .16 == GeoStore portal                              ** TYPE_PORTAL - new in-app submissions?
  // .17 == Portal image
  // .18 == PMRR change
  
  // resonator guid is [portal guid]-resonator-[slot]
  switch(guid.slice(33)) {
    case '2':
    case '11':
    case '12':
    case '16':
      return TYPE_PORTAL;

    case '9':
      return TYPE_LINK;

    case 'b':
      return TYPE_FIELD;

    case 'c':
      return TYPE_PLAYER;

    case 'd':
      return TYPE_CHAT;

    default:
      if(guid.slice(-11,-2) == 'resonator') return TYPE_RESONATOR;
      return TYPE_UNKNOWN;
  }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

// http://stackoverflow.com/a/646643/1684530 by Bergi and CMS
if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) === str;
  };
}

// escape a javascript string, so quotes and backslashes are escaped with a backslash
// (for strings passed as parameters to html onclick="..." for example)
window.escapeJavascriptString = function(str) {
  return (str+'').replace(/[\\"']/g,'\\$&');
}

window.prettyEnergy = function(nrg) {
  return nrg> 1000 ? Math.round(nrg/1000) + ' k': nrg;
}

window.setPermaLink = function(elm) {
  var c = map.getCenter();
  var lat = Math.round(c.lat*1E6)/1E6;
  var lng = Math.round(c.lng*1E6)/1E6;
  var qry = 'll='+lat+','+lng+'&z=' + map.getZoom();
  $(elm).attr('href',  '/intel?' + qry);
}

window.uniqueArray = function(arr) {
  return $.grep(arr, function(v, i) {
    return $.inArray(v, arr) === i;
  });
}

window.genFourColumnTable = function(blocks) {
  var t = $.map(blocks, function(detail, index) {
    if(!detail) return '';
    if(index % 2 === 0)
      return '<tr><td>'+detail[1]+'</td><th>'+detail[0]+'</th>';
    else
      return '    <th>'+detail[0]+'</th><td>'+detail[1]+'</td></tr>';
  }).join('');
  if(t.length % 2 === 1) t + '<td></td><td></td></tr>';
  return t;
}


// converts given text with newlines (\n) and tabs (\t) to a HTML
// table automatically.
window.convertTextToTableMagic = function(text) {
  // check if it should be converted to a table
  if(!text.match(/\t/)) return text.replace(/\n/g, '<br>');

  var data = [];
  var columnCount = 0;

  // parse data
  var rows = text.split('\n');
  $.each(rows, function(i, row) {
    data[i] = row.split('\t');
    if(data[i].length > columnCount) columnCount = data[i].length;
  });

  // build the table
  var table = '<table>';
  $.each(data, function(i, row) {
    table += '<tr>';
    $.each(data[i], function(k, cell) {
      var attributes = '';
      if(k === 0 && data[i].length < columnCount) {
        attributes = ' colspan="'+(columnCount - data[i].length + 1)+'"';
      }
      table += '<td'+attributes+'>'+cell+'</td>';
    });
    table += '</tr>';
  });
  table += '</table>';
  return table;
}

// Given 3 sets of points in an array[3]{lat, lng} returns the area of the triangle
window.calcTriArea = function(p) {
  return Math.abs((p[0].lat*(p[1].lng-p[2].lng)+p[1].lat*(p[2].lng-p[0].lng)+p[2].lat*(p[0].lng-p[1].lng))/2);
}

// Update layerGroups display status to window.overlayStatus and localStorage 'ingress.intelmap.layergroupdisplayed'
window.updateDisplayedLayerGroup = function(name, display) {
  overlayStatus[name] = display;
  localStorage['ingress.intelmap.layergroupdisplayed'] = JSON.stringify(overlayStatus);
}

// Read layerGroup status from window.overlayStatus if it was added to map,
// read from cookie if it has not added to map yet.
// return 'defaultDisplay' if both overlayStatus and cookie didn't have the record
window.isLayerGroupDisplayed = function(name, defaultDisplay) {
  if(typeof(overlayStatus[name]) !== 'undefined') return overlayStatus[name];

  convertCookieToLocalStorage('ingress.intelmap.layergroupdisplayed');
  var layersJSON = localStorage['ingress.intelmap.layergroupdisplayed'];
  if(!layersJSON) return defaultDisplay;

  var layers = JSON.parse(layersJSON);
  // keep latest overlayStatus
  overlayStatus = $.extend(layers, overlayStatus);
  if(typeof(overlayStatus[name]) === 'undefined') return defaultDisplay;
  return overlayStatus[name];
}

window.addLayerGroup = function(name, layerGroup, defaultDisplay) {
  if(isLayerGroupDisplayed(name, defaultDisplay)) map.addLayer(layerGroup);
  layerChooser.addOverlay(layerGroup, name);
}



window.clampLat = function(lat) {
  if (lat > 90.0)
    lat = 90.0;
  else if (lat < -90.0)
    lat = -90.0;
  return lat;
}

window.clampLng = function(lng) {
  if (lng > 180.0)
    lng = 180.0
  else if (lng < -180.0)
    lng = -180.0;
  return lng;
}


window.clampLatLng = function(latlng) {
  return new L.LatLng ( clampLat(latlng.lat), clampLng(latlng.lng) );
}

window.clampLatLngBounds = function(bounds) {
  return new L.LatLngBounds ( clampLatLng(bounds.getSouthWest()), clampLatLng(bounds.getNorthEast()) );
}


// SETUP /////////////////////////////////////////////////////////////
// these functions set up specific areas after the boot function
// created a basic framework. All of these functions should only ever
// be run once.

// Used to disable on multitouch devices
window.showZoom = true;

window.setupBackButton = function() {
  var c = window.isSmartphone()
    ? window.smartphone.mapButton
    : $('#chatcontrols a.active');

  window.setupBackButton._actions = [c.get(0)];
  $('#chatcontrols a').click(function() {
    // ignore shrink button
    if($(this).hasClass('toggle')) return;
    window.setupBackButton._actions.push(this);
    window.setupBackButton._actions = window.setupBackButton._actions.slice(-2);
  });

  window.goBack = function() {
    var a = window.setupBackButton._actions[0];
    if(!a) return;
    $(a).click();
    window.setupBackButton._actions = [a];
  }
}

window.setupLargeImagePreview = function() {
  $('#portaldetails').on('click', '.imgpreview', function() {
    var img = $(this).find('img')[0];
    var w = img.naturalWidth, c = $('#portaldetails').attr('class');
    var d = dialog({
      html: '<span class="' + c + '" style="position: relative; width: 100%; left: 50%; margin-left: ' + -(w / 2) + 'px;">' + img.outerHTML + '</span>',
      title: $(this).parent().find('h3.title').html()
    });

    // We have to dynamically set the width of this dialog, so get the .ui-dialog component
    var p = d.parents('.ui-dialog');

    // Don't let this dialog get smaller than the default maximum dialog width
    var width = Math.max(parseInt(p.css('max-width')), w);
    p.css('min-width', width + 'px');
    p.css('width', width + 'px');
   });
}

// adds listeners to the layer chooser such that a long press hides
// all custom layers except the long pressed one.
window.setupLayerChooserSelectOne = function() {
  $('.leaflet-control-layers-overlays').on('click taphold', 'label', function(e) {
    if(!e) return;
    if(!(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.type === 'taphold')) return;
    var m = window.map;

    var add = function(layer) {
      if(!m.hasLayer(layer.layer)) m.addLayer(layer.layer);
    };
    var rem = function(layer) {
      if(m.hasLayer(layer.layer)) m.removeLayer(layer.layer);
    };

    var isChecked = $(e.target).find('input').is(':checked');
    var checkSize = $('.leaflet-control-layers-overlays input:checked').length;
    if((isChecked && checkSize === 1) || checkSize === 0) {
      // if nothing is selected or the users long-clicks the only
      // selected element, assume all boxes should be checked again
      $.each(window.layerChooser._layers, function(ind, layer) {
        if(!layer.overlay) return true;
        add(layer);
      });
    } else {
      // uncheck all
      var keep = $.trim($(e.target).text());
      $.each(window.layerChooser._layers, function(ind, layer) {
        if(layer.overlay !== true) return true;
        if(layer.name === keep) { add(layer);  return true; }
        rem(layer);
      });
    }
    e.preventDefault();
  });
}

// Setup the function to record the on/off status of overlay layerGroups
window.setupLayerChooserStatusRecorder = function() {
  // Record already added layerGroups
  $.each(window.layerChooser._layers, function(ind, chooserEntry) {
    if(!chooserEntry.overlay) return true;
    var display = window.map.hasLayer(chooserEntry.layer);
    window.updateDisplayedLayerGroup(chooserEntry.name, display);
  });

  // Record layerGroups change
  window.map.on('layeradd layerremove', function(e) {
    var id = L.stamp(e.layer);
    var layerGroup = this._layers[id];
    if (layerGroup && layerGroup.overlay) {
      var display = (e.type === 'layeradd');
      window.updateDisplayedLayerGroup(layerGroup.name, display);
    }
  }, window.layerChooser);
}

window.setupStyles = function() {
  $('head').append('<style>' +
    [ '#largepreview.enl img { border:2px solid '+COLORS[TEAM_ENL]+'; } ',
      '#largepreview.res img { border:2px solid '+COLORS[TEAM_RES]+'; } ',
      '#largepreview.none img { border:2px solid '+COLORS[TEAM_NONE]+'; } ',
      '#chatcontrols { bottom: '+(CHAT_SHRINKED+22)+'px; }',
      '#chat { height: '+CHAT_SHRINKED+'px; } ',
      '.leaflet-right { margin-right: '+(SIDEBAR_WIDTH+1)+'px } ',
      '#updatestatus { width:'+(SIDEBAR_WIDTH+2)+'px;  } ',
      '#sidebar { width:'+(SIDEBAR_WIDTH + HIDDEN_SCROLLBAR_ASSUMED_WIDTH + 1 /*border*/)+'px;  } ',
      '#sidebartoggle { right:'+(SIDEBAR_WIDTH+1)+'px;  } ',
      '#scrollwrapper  { width:'+(SIDEBAR_WIDTH + 2*HIDDEN_SCROLLBAR_ASSUMED_WIDTH)+'px; right:-'+(2*HIDDEN_SCROLLBAR_ASSUMED_WIDTH-2)+'px } ',
      '#sidebar > * { width:'+(SIDEBAR_WIDTH+1)+'px;  }'].join("\n")
    + '</style>');
}

window.setupMap = function() {
  $('#map').text('');

  //OpenStreetMap attribution - required by several of the layers
  osmAttribution = 'Map data © OpenStreetMap contributors';

  //OpenStreetMap tiles - we shouldn't use these by default, or even an option - https://wiki.openstreetmap.org/wiki/Tile_usage_policy
  // "Heavy use (e.g. distributing an app that uses tiles from openstreetmap.org) is forbidden without prior permission from the System Administrators"
  //var osmOpt = {attribution: osmAttribution, maxZoom: 18, detectRetina: true};
  //var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', osmOpt);

  //CloudMade layers - only 500,000 tiles/month in their free plan. nowhere near enough for IITC
  var cmOpt = {attribution: osmAttribution+', Imagery © CloudMade', maxZoom: 18, detectRetina: true};
  //var cmMin = new L.TileLayer('http://{s}.tile.cloudmade.com/{your api key here}/22677/256/{z}/{x}/{y}.png', cmOpt);
  //var cmMid = new L.TileLayer('http://{s}.tile.cloudmade.com/{your api key here}/999/256/{z}/{x}/{y}.png', cmOpt);

  //MapQuest offer tiles - http://developer.mapquest.com/web/products/open/map
  //their usage policy has no limits (except required notification above 4000 tiles/sec - we're perhaps at 50 tiles/sec based on CloudMade stats)
  var mqSubdomains = [ 'otile1','otile2', 'otile3', 'otile4' ];
  var mqTileUrlPrefix = window.location.protocol !== 'https:' ? 'http://{s}.mqcdn.com' : 'https://{s}-s.mqcdn.com';
  var mqMapOpt = {attribution: osmAttribution+', Tiles Courtesy of MapQuest', maxZoom: 18, subdomains: mqSubdomains};
  var mqMap = new L.TileLayer(mqTileUrlPrefix+'/tiles/1.0.0/map/{z}/{x}/{y}.jpg',mqMapOpt);
  //MapQuest satellite coverage outside of the US is rather limited - so not really worth having as we have google as an option
  //var mqSatOpt = {attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency', mazZoom: 18, subdomains: mqSubdomains};
  //var mqSat = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',mqSatOpt);

  var views = [
    /*0*/ mqMap,
    /*1*/ new L.Google('INGRESS',{maxZoom:20}),
    /*2*/ new L.Google('ROADMAP',{maxZoom:20}),
    /*3*/ new L.Google('SATELLITE',{maxZoom:20}),
    /*4*/ new L.Google('HYBRID',{maxZoom:20}),
    /*5*/ new L.Google('TERRAIN',{maxZoom:15})
  ];


  window.map = new L.Map('map', $.extend(getPosition(),
    {zoomControl: window.showZoom}
  ));

  var addLayers = {};
  var hiddenLayer = [];

  portalsLayers = [];
  for(var i = 0; i <= 8; i++) {
    portalsLayers[i] = L.layerGroup([]);
    map.addLayer(portalsLayers[i]);
    var t = (i === 0 ? 'Unclaimed' : 'Level ' + i) + ' Portals';
    addLayers[t] = portalsLayers[i];
    // Store it in hiddenLayer to remove later
    if(!isLayerGroupDisplayed(t, true)) hiddenLayer.push(portalsLayers[i]);
  }

  fieldsLayer = L.layerGroup([]);
  map.addLayer(fieldsLayer, true);
  addLayers['Fields'] = fieldsLayer;
  // Store it in hiddenLayer to remove later
  if(!isLayerGroupDisplayed('Fields', true)) hiddenLayer.push(fieldsLayer);

  linksLayer = L.layerGroup([]);
  map.addLayer(linksLayer, true);
  addLayers['Links'] = linksLayer;
  // Store it in hiddenLayer to remove later
  if(!isLayerGroupDisplayed('Links', true)) hiddenLayer.push(linksLayer);

  window.layerChooser = new L.Control.Layers({
    'MapQuest OSM': views[0],
    'Default Ingress Map': views[1],
    'Google Roads':  views[2],
    'Google Satellite':  views[3],
    'Google Hybrid':  views[4],
    'Google Terrain': views[5]
    }, addLayers);

  // Remove the hidden layer after layerChooser built, to avoid messing up ordering of layers 
  $.each(hiddenLayer, function(ind, layer){
    map.removeLayer(layer);
  });

  map.addControl(window.layerChooser);

  map.attributionControl.setPrefix('');
  // listen for changes and store them in cookies
  map.on('moveend', window.storeMapPosition);
  map.on('zoomend', function() {
    window.storeMapPosition();

    // remove all resonators if zoom out to < RESONATOR_DISPLAY_ZOOM_LEVEL
    if(isResonatorsShow()) return;
    for(var i = 1; i < portalsLayers.length; i++) {
      portalsLayers[i].eachLayer(function(item) {
        var itemGuid = item.options.guid;
        // check if 'item' is a resonator
        if(getTypeByGuid(itemGuid) != TYPE_RESONATOR) return true;
        portalsLayers[i].removeLayer(item);
      });
    }

    console.log('Remove all resonators');
  });


  // map update status handling & update map hooks
  // ensures order of calls
  map.on('movestart zoomstart', function() { window.mapRunsUserAction = true; window.requests.abort(); window.startRefreshTimeout(-1); });
  map.on('moveend zoomend', function() { window.mapRunsUserAction = false; window.startRefreshTimeout(ON_MOVE_REFRESH*1000); });

  window.addResumeFunction(window.requestData);
  window.requests.addRefreshFunction(window.requestData);

  // start the refresh process with a small timeout, so the first data request happens quickly
  // (the code originally called the request function directly, and triggered a normal delay for the nxt refresh.
  //  however, the moveend/zoomend gets triggered on map load, causing a duplicate refresh. this helps prevent that
  window.startRefreshTimeout(ON_MOVE_REFRESH*1000);

};

//adds a base layer to the map. done separately from the above, so that plugins that add base layers can be the default
window.setMapBaseLayer = function() {
  //create a map name -> layer mapping - depends on internals of L.Control.Layers
  var nameToLayer = {};
  var firstLayer = null;

  for (i in window.layerChooser._layers) {
    var obj = window.layerChooser._layers[i];
    if (!obj.overlay) {
      nameToLayer[obj.name] = obj.layer;
      if (!firstLayer) firstLayer = obj.layer;
    }
  }

  var baseLayer = nameToLayer[localStorage['iitc-base-map']] || firstLayer;
  map.addLayer(baseLayer);

  //after choosing a base layer, ensure the zoom is valid for this layer
  //(needs to be done here - as we don't know the base layer zoom limit before this)
  map.setZoom(map.getZoom());


  //event to track layer changes and store the name
  map.on('baselayerchange', function(info) {
    for(i in window.layerChooser._layers) {
      var obj = window.layerChooser._layers[i];
      if (info.layer === obj.layer) {
        localStorage['iitc-base-map'] = obj.name;
        break;
      }
    }

  });


}

// renders player details into the website. Since the player info is
// included as inline script in the original site, the data is static
// and cannot be updated.
window.setupPlayerStat = function() {
  PLAYER.guid = playerNameToGuid(PLAYER.nickname);
  var level;
  var ap = parseInt(PLAYER.ap);
  for(level = 0; level < MIN_AP_FOR_LEVEL.length; level++) {
    if(ap < MIN_AP_FOR_LEVEL[level]) break;
  }
  PLAYER.level = level;

  var thisLvlAp = MIN_AP_FOR_LEVEL[level-1];
  var nextLvlAp = MIN_AP_FOR_LEVEL[level] || ap;
  var lvlUpAp = digits(nextLvlAp-ap);
  var lvlApProg = Math.round((ap-thisLvlAp)/(nextLvlAp-thisLvlAp)*100);


  var xmMax = MAX_XM_PER_LEVEL[level];
  var xmRatio = Math.round(PLAYER.energy/xmMax*100);

  var cls = PLAYER.team === 'ALIENS' ? 'enl' : 'res';


  var t = 'Level:\t' + level + '\n'
        + 'XM:\t' + PLAYER.energy + ' / ' + xmMax + '\n'
        + 'AP:\t' + digits(ap) + '\n'
        + (level < 8 ? 'level up in:\t' + lvlUpAp + ' AP' : 'Congrats! (neeeeerd)')
        + '\n\Invites:\t'+PLAYER.available_invites
        + '\n\nNote: your player stats can only be updated by a full reload (F5)';

  $('#playerstat').html(''
    + '<h2 title="'+t+'">'+level+'&nbsp;'
    + '<div id="name">'
    + '<span class="'+cls+'">'+PLAYER.nickname+'</span>'
    + '<a href="/_ah/logout?continue=https://www.google.com/accounts/Logout%3Fcontinue%3Dhttps://appengine.google.com/_ah/logout%253Fcontinue%253Dhttps://www.ingress.com/intel%26service%3Dah" id="signout">sign out</a>'
    + '</div>'
    + '<div id="stats">'
    + '<sup>XM: '+xmRatio+'%</sup>'
    + '<sub>' + (level < 8 ? 'level: '+lvlApProg+'%' : 'max level') + '</sub>'
    + '</div>'
    + '</h2>'
  );

  $('#name').mouseenter(function() {
    $('#signout').show();
  }).mouseleave(function() {
    $('#signout').hide();
  });
}

window.setupSidebarToggle = function() {
  $('#sidebartoggle').on('click', function() {
    var toggle = $('#sidebartoggle');
    var sidebar = $('#scrollwrapper');
    if(sidebar.is(':visible')) {
      sidebar.hide().css('z-index', 1);
      $('.leaflet-right').css('margin-right','0');
      toggle.html('<span class="toggle open"></span>');
      toggle.css('right', '0');
    } else {
      sidebar.css('z-index', 1001).show();
      $('.leaflet-right').css('margin-right', SIDEBAR_WIDTH+1+'px');
      toggle.html('<span class="toggle close"></span>');
      toggle.css('right', SIDEBAR_WIDTH+1+'px');
    }
  });
}

window.setupTooltips = function(element) {
  element = element || $(document);
  element.tooltip({
    // disable show/hide animation
    show: { effect: "hide", duration: 0 } ,
    hide: false,
    open: function(event, ui) {
      ui.tooltip.delay(300).fadeIn(0);
    },
    content: function() {
      var title = $(this).attr('title');
      return window.convertTextToTableMagic(title);
    }
  });

  if(!window.tooltipClearerHasBeenSetup) {
    window.tooltipClearerHasBeenSetup = true;
    $(document).on('click', '.ui-tooltip', function() { $(this).remove(); });
  }
}

window.setupTaphold = function() {
  // @author Rich Adams <rich@richadams.me>

// Implements a tap and hold functionality. If you click/tap and release, it will trigger a normal
// click event. But if you click/tap and hold for 1s, it will trigger a taphold event instead.

;(function($)
{
    // When start of a taphold event is triggered.
    function startHandler(event)
    {
        var $elem = jQuery(this);

        // If object also has click handler, store it and unbind. Taphold will trigger the
        // click itself, rather than normal propagation.
        if (typeof $elem.data("events") != "undefined"
            && typeof $elem.data("events").click != "undefined")
        {
            // Find the one without a namespace defined.
            for (var c in $elem.data("events").click)
            {
                if ($elem.data("events").click[c].namespace == "")
                {
                    var handler = $elem.data("events").click[c].handler
                    $elem.data("taphold_click_handler", handler);
                    $elem.unbind("click", handler);
                    break;
                }
            }
        }
        // Otherwise, if a custom click handler was explicitly defined, then store it instead.
        else if (typeof event.data != "undefined"
                 && event.data != null
                 && typeof event.data.clickHandler == "function")
        {
            $elem.data("taphold_click_handler", event.data.clickHandler);
        }

        // Reset the flags
        $elem.data("taphold_triggered", false); // If a hold was triggered
        $elem.data("taphold_clicked",   false); // If a click was triggered
        $elem.data("taphold_cancelled", false); // If event has been cancelled.

        // Set the timer for the hold event.
        $elem.data("taphold_timer",
            setTimeout(function()
            {
                // If event hasn't been cancelled/clicked already, then go ahead and trigger the hold.
                if (!$elem.data("taphold_cancelled")
                    && !$elem.data("taphold_clicked"))
                {
                    // Trigger the hold event, and set the flag to say it's been triggered.
                    $elem.trigger(jQuery.extend(event, jQuery.Event("taphold")));
                    $elem.data("taphold_triggered", true);
                }
            }, 1000));
    }

    // When user ends a tap or click, decide what we should do.
    function stopHandler(event)
    {
        var $elem = jQuery(this);

        // If taphold has been cancelled, then we're done.
        if ($elem.data("taphold_cancelled")) { return; }

        // Clear the hold timer. If it hasn't already triggered, then it's too late anyway.
        clearTimeout($elem.data("taphold_timer"));

        // If hold wasn't triggered and not already clicked, then was a click event.
        if (!$elem.data("taphold_triggered")
            && !$elem.data("taphold_clicked"))
        {
            // If click handler, trigger it.
            if (typeof $elem.data("taphold_click_handler") == "function")
            {
                $elem.data("taphold_click_handler")(jQuery.extend(event, jQuery.Event("click")));
            }

            // Set flag to say we've triggered the click event.
            $elem.data("taphold_clicked", true);
        }
    }

    // If a user prematurely leaves the boundary of the object we're working on.
    function leaveHandler(event)
    {
        // Cancel the event.
        $(this).data("taphold_cancelled", true);
    }

    var taphold = $.event.special.taphold =
    {
        setup: function(data)
        {
            $(this).bind("touchstart mousedown",  data, startHandler)
                   .bind("touchend mouseup",    stopHandler)
                   .bind("touchmove mouseleave", leaveHandler);
        },
        teardown: function(namespaces)
        {
            $(this).unbind("touchstart mousedown",  startHandler)
                   .unbind("touchend mouseup",    stopHandler)
                   .unbind("touchmove mouseleave", leaveHandler);
        }
    };
})(jQuery);

}


window.setupQRLoadLib = function() {
  (function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);

}


// BOOTING ///////////////////////////////////////////////////////////

function boot() {
  window.debug.console.overwriteNativeIfRequired();

  console.log('loading done, booting. Built: 2013-05-22-175822');
  if(window.deviceID) console.log('Your device ID: ' + window.deviceID);
  window.runOnSmartphonesBeforeBoot();

  var iconDefImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAocSURBVHjanNRbUFN3Hgfwv9Pdzu5sZ7cP3d1eprP7sC/bPvSls9MmB5CLcg2IIAhSWwS8rFqrpbVbu3Vdd2ov04qJgGBESAJJCOR2AiFcEpKT+wkhiIiCoCJKkQhCIEgEvvsQcaoVdffhM+fMOf///3v+5/c7h8S8lk64f0wkH7/9LZGnsUSczBBREkNESRaieM9JOg6fJzUJljckPGajhMfsF6dYjolTLMV16bZMxRbnW2KehUhSGSJKtBBlvptIM+2kJt5CRIkWIkljiCSVIWS1EHEyQ6SZtrdVBe5jomRLd126dVa6ybZYn+OAbJN9qS7dOidJYy6Iki3fS3gM5/8J+bMo0VJZm2pdaHjPiaZ9XrR+dg6tn59D26FetB06h9Z/nEPzvm4ot7lRl25drI43Vzd+4PrLM4WIkpjImkRmWJHnQktxD9o+70XLJz7o9nWD3uMFvdsLeo8Xug+7oS/23b/fg4b3XBClMNfFyUx8TeIjIWtfTSPv/iGeHHj7GyLnseniJGZGs8ODtkO9aP6oG9qdXdDs8EC3x4s+5SjujMzhIn0DTfu6odnhgXZnF5o+6kbboV5odnZBlMQEaxIsuQ+FJLy+mUS/toF88vb3f5Mlu+9od3XBcPActDu7oC70QF3kgbP0Mu5cD2LOv4DFhSXM+Rcwc3MebMUQ1EUeqAs90OwMz6N3e1GTYJkVJVooSSpDalNthFTEtJKKmNbfnonruKDaxsJwsAfq7R6oClmYjl7Arb5p3J25hz7lKFo/78XsrbswHu7DOekI5qdCmLg4A/OxfqgKWai3e2D4tAfKAjeq15sHqtebf3c6ro2QmnUMqY61HJJutMPwaQ80OzzQ7/dhqGMc94KLuO68jdbPzkFVwEJ/wIfQ3CLaDvVCVcDC8GkPrjITuBdcxBXzLbQU9zwIkmU4ULHW8GX869mEnI0z//5snHlcu6sLur1euMuHMHvrLvwDAZi/7odymxvKfBbKfBa6vd0Y892B/uMeKLexYfn3d9w/jTn/ArqEw9Dt9YL+uxfCGOPE/re+e5lUxXTmSVKt0B8It+P0aBCDhh+hKmShzHdDXchCs90D7Y4welfXg3PNdg80RR405ruhKmTRr72B6dEglNvcaD7gQ22aFeI4x1ZyJsokVuQ5odvrhSLPhduDAdiOD6D9n+H3Hxibx/RoEJPDs5geDWL6ehDTo0FMXZnF9PUgAmPzmPMvwHT0Asxf9cM/GIAizwXdXi8a8pw4E2WSEGGUyakqYKHZ4YFiSzjEXX4ZjVtdGD8/DQBYureMPuUoTEf6YDx8HqYjfeiVj+De3SUAgH8wgMb33bAfH8DtwQAUW1zQbPdAVcBCGGV0E+Fa41X1/QsNueEQtnwIDVtcaP/iPEL3ix8Ym8c16wSMh/swbBzH7PhdjDj8uDe/CNO/L0CR54KjZBC3BwNoyHVBVRDuNuFa4zUiXGu8odnugTLfDflmB/yDAbjKLkOR64Qi14mhjnGMspPQfdiNUddtLC8t46Z3Cvr9PlxlJjBi80OR60R9jhO245fgHwxAvtkBZb4bmnDIDVIZ2e5uzHdDuc0NWbYD/oFwSP1mB+Q5TqiLWCwE7sHyzUU05LkwPxWCusgD4+E+hIKLoHd7Ic9xQr7ZAdsPl+AfCECW7YAyn0XjB25URrazpJwyyGTZdqiLPJBussM/GIC9ZACybDtMR/qgL/bBW3MFMzeC0O31IjA2j+b9PkwOz6K3fgRNH3aj8z8XIM92gPn6IvwDAUg3hdeTZdtRTrU2kNPR7Xuqkzqh2d4FWZYdE/0z8ImvYkA/hsW7S3CfGoIs246pa3MYNPwI/2AAg/oxzIwGUZ/jhP34AELBRQx1jMNbdQUT/TOQZdmh2dGF6qROnI5p30fKI/R/rYhqDakKWNTnOnH7cgAAMMpOoqW4B9JMO2SZdpi/6sfy0jJCwUUAgO2HS5BtskOaaYd+vw8jdj+wDExemUV9rhPqAhanogyh8gjDm6SMal5zkqNrrctkoMxn4au9hqXQEi63/whlgRvSDBvqNtohzbBhxOEHANzsnoI0w/6A8gM3LjXdxPLSMnrlI1BtY1GbweDku7qW8gj9GlIWoScCLp1TEWuAqsADaYYN+mIfxnqmEJxcgE98FfU5TtSl29C0rxvzd0IwHOxB3UYbZFl2dFVdwZx/AePnp2E42ANppg3qQg8qYw3gc+iMk5SOkBMcNSnhqF8QcOgheY4Dii1OiHkMJKkMLN/0487IHKauzcF8rB+1G6zQ7e5C3QYrOo/2YXJoFjM3grD9cAkSHgMxj4EizwX5Zgf4HLr/BFfzqxNcDSF8Skv4lJac4GiOnEnogDKfhSQtHCJJZSDLssMnuYb5qRBueCZhPNKHEYcfd6dDOF9/HYocZ3gsj4EkjYEqn4Uwvh18jvZgKdVESqkmQkojmsOopj8JKN1teY4D8mwHxCnhJxPzGIhTGKiLWAybbmH+TgjXrBPQ7OqCmGeFhGeFOIWBKIVBfY4D8s0OCLj0mICiXxZQNBFQNCHlES0P8DnaY8L4djRudYcnJjEQJTMQr0j6OVFyeJyYx6DxfTdOr2sDn0N/sbKLUqqJkJW0+14RcOlxaZYdsk121CRYIEp8upoES7idN9kg4NLXS6mmlx4K4XO1DznB0Xx5el0bFHkuiJLCCzyNKNkCRZ4LlXGtEHDo4p8GPDaEz9W+JODSo9JMG6QZdpyNM6N63erOxpkhzbSjLsMKAVc3LKDoFwWUjvwUeTS1lGoiAg79SWVsKxS5TlSvt+BsbHixn4k1ozreAkWOExUxBgi4ur1lEXryqEdrsuJFAYcelqQzqNtgQ1VMJ6pif+5MTCfq0m0Qb2DA52gvlXBUL5SEv7uHkEe3toLP1e6uiDZAnuVA9TozqqI7w2ErojtRvd4MebYDp6INKOGoi0o4KvI4pDzSsIqW3/A52osingW1qVYIo4w4E2V6QBhlRG2qFSKeGXwufZ7P1f76MfUlfK72sYX/aacVnFrbAmmGHVWxnRBGGiGMMkIYaURVbCekGXaURelRRjVvPR3ZTioj2x6LnKR0T/IrPofuqUnuhIRnRWVkB05HdaAysgMSnhU1yZ3gc7TeEo76+RMcNVkNWe09rjjBUeeWR+lRt8EGYYwRp6hWCGOMqNtgQ3mUHgKKzlr5/62GPG0An9L+UsCl2eoEE0RJFpRTBoiSLDibYMJJSuesjjf/oibBTJ6EVMd3PlFNgplURBvSSyOaIE5hUBVngjiFQVlkM757pz7t23dk5GnIqUjDs3iOz9UyZ9Z1hL+b9SZ8/26Def3rWc+tfYVHol9Ne6KnFf4BPleTWBbZDFGSBWWRehznqBJ2v3mU7HzjMNn1xr+e6Ikt/Ig1AopuK4vQQ0DRrXyudk15RAs5FWF4qtV+K6uJE1DaUPj47PP+15DnBRRdeP/4zPP+OwCV955x/18hzAAAAABJRU5ErkJggg==';
  var iconDefRetImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAYAAAAWy4frAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABHQSURBVHja3Jt7UFtXfseVbqbbyex22kmnM9vMtjvTaaadyc7+0W5may7IjimFQkTwgsExIdixF8cxsR2yJN7N5NFMM82j2ZgbwCyYh5BAgECgixAP85Cu0FtCYIOxwbyMDcbYYGOMeenbP67O0RUvEwcn9p6Z7z9X957z+5zfef7OkQSA5E9BW56U0aafKGT8L5UxphhltOlNhYz/TCHj/6CQ8WkKGb9bGWPapow2/bTxRNcPJI9Sulg/9oQy2vQrhYz/QhltGlTIeGxSk8poU65CxocpZPyT3xuAQsb/nULGf6mQ8SMrjVRGm1Cyqx1lCRaok2yoTLajfI8VqjgzlNGmtaBuKGR8njLa9I/fGYA8wviUQsZ/oJDxs2JjyhIsqElxouHdLpx5/+yGajzRhdpUN9SJtpVg88VR/BfyCONfPVSI4ij+1eIo/kpxFI/iKB4lu9qhPeQSjH/v7Co1/T5Q673DHXFDFWcGybc4ir+ukPFvbHk/Kgo3/rk8ks+XR/KQRwq1V33QicYTgQAN6Z2oO+6B7mgHuCNuaA+7AsQdcaM21Y26Yx1oSO9cBVeT4oQy2gRSjjyS15XGmn+8VaPQ0/JI3kAyVyfZqBFNvxeaSd1xz5qG30/cER/Uu100v4Z3u1C1zy6G6ZJHGP/+2/aHf5ZH8v3yCCPkEUbUpDhXAWgPudZV28c9GO+cxvULt8F/2rvhuyuBuCNuAUQoe0weyT//YBCR/M/kkfyEPMIIhYyH7mgHLUSf5oH2sAs1Kc41Vf/bTvQ1jGF5YRkkeZe9GDJeR+OJrnW/0x52oe64h5ZTd6xDaGoRRsgj+TvyCOPPv+nQ+iN5hLGTQOjTPGg80YXGE13QHe1A9UHnmqpJccFTPIy5qQWsl+bvLKJbPQruDfe6+dSmutHwrlBe/dudUMaYiGcGCkINT28K4oVnYp4oCjdqisKF5qQ7Kri8Ib0T2sOudQs3/+EiJi/OUIPnphdwUT+GxbkleJe96G8cx51r9+jv08OzsGX3r5uf9rALDemdaHhXaMLySB5F4UYUhRtbNjWBFoUbP/J9QOeFhvROaA+tDdH8/jmMWG5QA5eXvBhsm0D9b7ugfd2NxXtC82p8pwu6NzvQVz+OpXv+JjfmmULb/5xfG+aQH4Y74iYgkEcYv9wQoiDU8GxhmGGxMMyAymS7kEl6J7gjbmgOOAJUm+pGL3cVi3NL1KiJnlswfHIemtcc0LzmgP4tDzW65aNuaA44oTngRMuH3bjqmgqA728aR91bnlXlUM+kd6Iy2Y7CMAMKwwxLhWGGf9nIG1WFYQYoZDz9WHe0Y1XmrvwBzIzNUUNuj83BmTtAAdYE+bB71e9Wtg9TQ7M0n7s35tFZMozq3zhXVRqxRxljQmGYAUXhxtr1vBFUEGpAQahBaFLpndCneaDZ76DiP+3FRM9tWvDC7BJ6qkZRm+oOeI9If1wE8kG3/zcRjPZ1F7pKhjE37R8gbl66A8vJvoC86o57aD8ldhaEGl5YC8RSEGpAya521L/difq3O1GT4kTVPjv0aR4MGScAr3/0GbFMovHEWVTtd6yruuMe+n7Lh90bvqtP68RAyzV4l/2FjNpvoPGEMEFWH3RSu0pjzQTE/cIzMU+IIf6NUNamulH/ttCkqvbZ4fjjJdy7vUgzv9E3A/7TXlTts6+QY5W4N9wYNk3isvUG6t/uXOMd+yq1/nc3xrumaXmLc0twFw6iap+d2lab6hZ7ZZsY5JOCUAOdM/RpQqerTLZjiL9Oh1Nn3gCq9gvPK5PtqNoiVa4hC9uHOxPCcD1ivYHKZDs0BxzUPoWMR0GoAfk72z6nIPk72y7k72yDOtEGfZqw6CMZDrRcAwAMtk0Iz14Var/yVXugkrdG4orqqb4CABjir9NnuqMd0Kd5UJlsR/7ONuTvbOsj3nguf0cb8ne0oTbVDX2aBzUpTqiTbFAn2XCpWQAZaJugm6QR8ySmBu/g5kCgpga/mdb6fqxzGpoDDqiTbDhfI4AMGieoPTUpTujTPKhNdYPYXRBqeE5yentrWv6ONsgjedQd96DuuEf4KFEQARlsmxCevWKDLasfDyt1lY7Qss/7PDJomKDP1Ek2amdxFE9g0iWnt7dmnN7eitJYM+qOdUB3tMP/0Tog6ldsGD87HWCA1wtccd6ELasfFrYP9pxLcKyQPecSrF/3wfp1H4bbJ+Fd8gbkMTU8i8pk+8YgiTa6p1HFmXF6eytOb289JTm9vbUqT9qCsgQL6o4JG6INQXxq+t1ZLK8wZHnRiyH+OhrSOynwSumOdqC/aRxL88urvGH8tFd4L2ljELKPKUuwIE/aglxps1aSK22250lbBJcd6xD6xyZA1Ik29DeOAwCW5peFIdPrX3Jc1I9Bl+r3rvaQCz1VowFLmmtnp7Ewu0TnjIoV+a8HUpPiRN2xDqiTbMiTtiBP2uKS5ElbruZKm1G1z06X6BV7rVSXzvg6e+uE8CzRhoq9grSvu3Dv1iLgBborR9HyUTdu9N/xr4CnFuAuGIQ9+xJmxv0r31uX74L/rBfugkF4vUJF6NM8AeVW7LWip3qUgoifaw446DyXK21GrrR5TJIrbb6dK22GZr+DrqvK91ip+pv8IOV7rKh42Sdfph2Fg4JXFpaFYTvJBnfBIO7enF+9F5lZRFfpMF2ezM8IE+35mis033KiPVb0aEZpaxDbREA0+x0E5LYkV9rcnStthjrJRj1SlmCh6m8Sms9AyzWUJViEzEQFql+xYWpYWPhd7Ziiz7WHXbioH4PX19wGDRPQH/dQgwdaJ+hCUfOagxpPVJZgQU/VKK1EsU3VB53CoJRkIyA9klxpsy5X2gxVvGVTIAKMJaBQwyfnaa2bPr9An1cl22mfqDvmoc/PvHeOrqlsWf2rAIjuB6KKtxCQeklOSFNWTkgTlDEm1Ka6UZNyfxCxyn1gV5w3aftXJwmRRe0hFwVpSO+ixk703AIATF6cQcUeK8oTrGvmvR5ITYqwHVbIeOSENCEnpOmPkpyQpndyQppQGGYAd8QN7ogbZQkWqOIFkZHpUss1qOItKBNLlHndWx46pHbIh2iBYpCyBCvMJ/t8Ew/Q/ME5fx7xq9UtAiH2qOIt1M7CMANyQppwKqTxPUl2cH3IqZBG5IQ0CaGZwy6oE21QxZmhijP7QZqvCc92C9IedmHYdB3na67QgslwOX9nEdUHnaja76Ag+rc8qEi00YXgkPE6/a5DPoRRx03UHfdAtdtC1V05SlsDsadir9D/tIdcBAKnQhojJPII45OnQhqnT4U0CuP9YRc0BxyrQc4ImVUkWuEuHMS9W/6NUG1qB1S7Laja56CjVV/9OCr22igI97oLHsWwsDS/uwTusBtluy3QiGAX7y7hbPllVO2zQxVnxjn15VUgZPurTrQRiNniKP4vJBKJRJIdXK8+FdKI4iieBhnWAmn7uBvTI/6t6ezkPFynB6B+xe9Bsg5bXliG8X/PY256Ad4lL/jPejHv29d0qUZorZfvscL6dT9uX7lL850Zn4Pp8146/IpBalKEoERxFE9AOLqMzw6ufy07uB650mYa+SvfY0VprBl9DQLIwl3/jLy0sIxe7iqq9tlRGmtGaZwgVZwZZbvNNCw0PTKL+ZlFLM0v0735zNgcKhKt1DAidZINZ8tG6EwvLnOg5RpKY810ANEeciFX2ozs4HpkBesPUZCsYP0zWcF6b1awni4BKpMFI/t9MzsAeJeEaKHet91cT2fePxewLRan9i8vQBVrhmqdb2tT3ehrCFyLDRomUBprhma/gy6hsoL1yArWL58KafxpwJ49O7i+LpPRoTBMCD5UH3SiNNbfTgFg8d4SnHkDKI1tR8mv/SqlMlMNGa+vghjvmg54Z221w5xxkc76ANCrvYLSWDMNrRaEGpDJ6JDJ6GpWBR8yGV2k70dKXrFXGN8duZcCooRTQ7PgP+tFya72NVW6qx3aQ04sipqjd8krBA5WGr7LjFLfd60fd+N67+2AtZpHMYyKvVa6qaraZycQyGR0oatAsoPr/4xluEGW4ej5h2a/A8oYE5QxJqhfteG89gqWFwOjHPq3PCiJafdLBNRVOkLf7WscXxe89oh7lQf7G8dRfdBfPok+KmQ8WIZDJqPrWTdAlxGkfYdlOJwKaaQfknM/In2aB5etk/6OP7+MC7VXodnvCASKaUfFy1bMTs5jcW5pzd/ViTacq7iM+TuLASHUxt+dhULmL1MVb6H2ZAfXg2U4sAz3xrogX23T/A3LcPdYhoMqzozqg8LeXQxCZPikBzf6ZwKGYmfeAEp/3Q7lS35ZMvrQUTSEkpfaA2Rl+3D7qj9aeWv0Ltq/vACFzBRwqKqMNqEy2U77rA/i1smgmh9tGP9lGU7OMhzyd7YJzeuA4N61jphL48xw5Q8ETI6TF2fQ8sG5NeGV0SY0vNOJ8c7AuNVZ1QgqXrYKEC/ygnxllOxqp97IlTaDZThkBGlP3jcazzLcr3zUUCfaUH3QifI91g3PzDWvOYQlu2jrO9w+Ce4NFwWoPuDApTOBkcRBwwS4wy6fF3yVtQJEbIPPLm8mo/unTZ2RsAznYhkOhWEGGnvdzCUAfZoHV91TgbVdfhkd8qEAr02cv40mXz/YCEIZY6Ll5+9sIyD6TZ9YsQz3MvFKxV4rNPsd63ql+MVAKV7kYfqiF7dG766aR+5M3IMtqx/Kl9qheNEkkuh7Ud6k7LIEC4EAy3AvbBrENxSfZRkOBaEGGpdVyHjxWfiGKoszo1MxjNnJecxNLaCnahQVL1s3/b0yxkTLzd/RRvpGyzc+DM0I0saQWijfY0Vlsh2qeIv42HiVih9EPsNX5lWx118msSOT0QU90Mkuy3AO4hUSe1XI+A1h5JE8iv9r81rre2WMiZaXJ20hIHUPfM7OMtx/ktpQxVv8XvGduz8slSVY6KJV5I1//VaXBliG41mGQ/6ONhpIVsj4hwahkPG0HDJvsAxX9a2vcGQEaUOoV3z7BlW8hZ6wbrXI1aiSXe0EYjmT0T23JfdRWIZrYBkOJLSqTrKhOIrfcoh1vFGyZbeDMoK0vyReKY31e8V3VLxlIt5QRpsIxBLLcM9u6VUnluGqWYZDrrSZBpOLo3jxWd63UnEUT/PNCWkiIPlbfuksk9H9nGU4L8twwv7EFzLaKhBVvAXqRBvdb7AMt5AdXP+zh3KDjmW4EpbhkBPStKVeId6o2GsV7zeyHtpVQJbhnvW1WyhkPL1w6TuUfGCp4oQIiTySemPuq22aZx7qvcaMIO1psosksVx5hPGBIYqjeBq8Fnnjy4d+y5RluH9gGW6eZThhcZhg+VZeUcWZUZZgEXvjzlfbNH/7nVyZZRnua5bhkB1cLwS2E4RlCzku3qxoRcRbkBWsJyCffGd3f0+FNP6EZbi7LMNBHslDFScE13wnrJtS/o42GmUsCjcSiOmTQTV//Z3exM4I0n7GMhyygvUBBvkOJ++ronAj/S6T0ZH9xvvf+ZXyk0E1T2cEaW+zDEeNKtnVjtPbW+8LQc71yTzk88ZkrrT5x5LvI7EM9xHxCjFsM14RgxNvsAyX/r1d9M9kdH/JMtwNsvkixvkO8ddUnrQFJbva6Ujngxj7apvmqe/1bxckOpnJ6IS4b6zglfVAisKNKI1d5Y03v/f/j3y1TfMUy3DjZPNF4rm50mZyUEmVK22mv5OAAstwIyeDan74SPwZhmW4N4lXlDHCf0fIQaVYReFGlOxqhzLaJPbGbx6Zf/WcDKr5IctwI2KvKKNN4sNK5IQ00T/InN7eSiAuySOMT0oepcQy3EHiFRKzLQwzUJDCMOHip2iZDpbhkiSPWpJHGJ9kGa6PbInJP3VIsyLRdVF45/z//bv6B5JHMbEMt5fUdnEUTy9QkoufxVF+b2QEaXdLHtXkC7WeI1vilXFiUUDBE3Bf9xH1yi5S6+RvTCQ6KeobMsnjkFiGc670isgbNsnjkk4G1YST2icxK1Hf+A/J45RYhjORQIUovGOQPG6JZTipqE8Qb4RIHsfEMlyjCKRB8rgmluGeF4E8L3mcE8twNSzD1Uge98Qy3C9YhvvFwy7n/wcA9Id9o31Mi8EAAAAASUVORK5CYII=';
  var iconShadowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=';

  L.Icon.Default = L.Icon.extend({options: {
    iconUrl: iconDefImage,
    iconRetinaUrl: iconDefRetImage,
    shadowUrl: iconShadowImage,
    shadowRetinaUrl: iconShadowImage,
    iconSize: new L.Point(25, 41),
    iconAnchor: new L.Point(12, 41),
    popupAnchor: new L.Point(1, -34),
    shadowSize: new L.Point(41, 41)
  }});

  window.setupTaphold();
  window.setupStyles();
  window.setupDialogs();
  window.setupMap();
  window.setupGeosearch();
  window.setupRedeem();
  window.setupLargeImagePreview();
  window.setupSidebarToggle();
  window.updateGameScore();
  window.setupPlayerStat();
  window.setupTooltips();
  window.chat.setup();
  window.setupQRLoadLib();
  window.setupLayerChooserSelectOne();
  window.setupLayerChooserStatusRecorder();
  window.setupBackButton();
  // read here ONCE, so the URL is only evaluated one time after the
  // necessary data has been loaded.
  urlPortalLL = getURLParam('pll');
  if(urlPortalLL) {
    urlPortalLL = urlPortalLL.split(",");
    urlPortalLL = [parseFloat(urlPortalLL[0]) || 0.0, parseFloat(urlPortalLL[1]) || 0.0];
  }
  urlPortal = getURLParam('pguid');

  // load only once
  var n = window.PLAYER['nickname'];
  window.PLAYER['nickMatcher'] = new RegExp('\\b('+n+')\\b', 'ig');

  $('#sidebar').show();

  if(window.bootPlugins)
    $.each(window.bootPlugins, function(ind, ref) {
      try {
        ref();
      } catch(err) {
        console.log("error starting plugin: index "+ind+", error: "+err);
      }
    });

  window.setMapBaseLayer();

  window.runOnSmartphonesAfterBoot();

  // workaround for #129. Not sure why this is required.
  setTimeout('window.map.invalidateSize(false);', 500);

  window.iitcLoaded = true;
  window.runHooks('iitcLoaded');
}

// this is the minified load.js script that allows us to easily load
// further javascript files async as well as in order.
// https://github.com/chriso/load.js
// Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>. MIT Licensed
function asyncLoadScript(a){return function(b,c){var d=document.createElement("script");d.type="text/javascript",d.src=a,d.onload=b,d.onerror=c,d.onreadystatechange=function(){var a=this.readyState;if(a==="loaded"||a==="complete")d.onreadystatechange=null,b()},head.insertBefore(d,head.firstChild)}}(function(a){a=a||{};var b={},c,d;c=function(a,d,e){var f=a.halt=!1;a.error=function(a){throw a},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]=="function")continue;(function(e){a[e]=function(){var g=Array.prototype.slice.call(arguments);if(e==="onError"){if(d)return b.onError.apply(a,[g,g.length]),a;var h={};return b.onError.apply(h,[g,g.length]),c(h,null,"onError")}return g.unshift(e),d?(a.then=a[e],d.push(g),f?a:a.next()):c({},[g],e)}})(g)}return e&&(a.then=a[e]),a.call=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)},a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]=="string"&&(b[e[g]]=f);--h||(b["then"+d.substr(0,1).toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(b,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||--b||c.next(!0)},e=function(a){c.error(a)};for(var f=0,g=b;!c.halt&&f<g;f++)null!=a[f].call(c,d,e)&&d()}),d("defer",function(a){var b=this;setTimeout(function(){b.next(!0)},a.shift())}),d("onError",function(a,b){var c=this;this.error=function(d){c.halt=!0;for(var e=0;e<b;e++)a[e].call(c,d)}})})(this);var head=document.getElementsByTagName("head")[0]||document.documentElement;addMethod("load",function(a,b){for(var c=[],d=0;d<b;d++)(function(b){c.push(asyncLoadScript(a[b]))})(d);this.call("run",c)})

try { console.log('Loading included JS now'); } catch(e) {}
/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin, CloudMade
*/
(function(t,e,i){var n=t.L,o={};o.version="0.6-dev","object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd&&define("leaflet",[],function(){return o}),o.noConflict=function(){return t.L=n,this},t.L=o,o.Util={extend:function(t){var e,i,n,o,s=Array.prototype.slice.call(arguments,1);for(i=0,n=s.length;n>i;i++){o=s[i]||{};for(e in o)o.hasOwnProperty(e)&&(t[e]=o[e])}return t},bind:function(t,e){var i=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(e,i||arguments)}},stamp:function(){var t=0,e="_leaflet_id";return function(i){return i[e]=i[e]||++t,i[e]}}(),invokeEach:function(t,e,i){var n,o;if("object"==typeof t){o=Array.prototype.slice.call(arguments,3);for(n in t)e.apply(i,[n,t[n]].concat(o));return!0}return!1},limitExecByInterval:function(t,e,n){var o,s;return function a(){var r=arguments;return o?(s=!0,i):(o=!0,setTimeout(function(){o=!1,s&&(a.apply(n,r),s=!1)},e),t.apply(n,r),i)}},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){return t.options=o.extend({},t.options,e),t.options},getParamString:function(t,e){var i=[];for(var n in t)i.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return(e&&-1!==e.indexOf("?")?"&":"?")+i.join("&")},template:function(t,e){return t.replace(/\{ *([\w_]+) *\}/g,function(t,n){var o=e[n];if(o===i)throw Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){var i,n,o=["webkit","moz","o","ms"];for(i=0;o.length>i&&!n;i++)n=t[o[i]+e];return n}function n(e){var i=+new Date,n=Math.max(0,16-(i-s));return s=i+n,t.setTimeout(e,n)}var s=0,a=t.requestAnimationFrame||e("RequestAnimationFrame")||n,r=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,s,r,h){return e=o.bind(e,s),r&&a===n?(e(),i):a.call(t,e,h)},o.Util.cancelAnimFrame=function(e){e&&r.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this._initHooks&&this.callInitHooks()},i=function(){};i.prototype=this.prototype;var n=new i;n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),t.options&&n.options&&(t.options=o.extend({},n.options,t.options)),o.extend(n,t),n._initHooks=[];var a=this;return e.__super__=a.prototype,n.callInitHooks=function(){if(!this._initHooksCalled){a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;e>t;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){o.extend(this.prototype,t)},o.Class.mergeOptions=function(t){o.extend(this.prototype.options,t)},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i)};var s="_leaflet_events";o.Mixin={},o.Mixin.Events={addEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d=this[s]=this[s]||{},_=i&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)r={action:e,context:i||this},h=t[n],i?(l=h+"_idx",u=l+"_len",c=d[l]=d[l]||{},c[_]||(c[_]=[],d[u]=(d[u]||0)+1),c[_].push(r)):(d[h]=d[h]||[],d[h].push(r));return this},hasEventListeners:function(t){var e=this[s];return!!e&&(t in e&&e[t].length>0||t+"_idx"in e&&e[t+"_idx_len"]>0)},removeEventListener:function(t,e,i){if(!this[s])return this;if(!t)return this.clearAllEventListeners();if(o.Util.invokeEach(t,this.removeEventListener,this,e,i))return this;var n,a,r,h,l,u,c,d,_,p=this[s],m=i&&o.stamp(i);for(t=o.Util.splitWords(t),n=0,a=t.length;a>n;n++)if(r=t[n],u=r+"_idx",c=u+"_len",d=p[u],e){if(h=i&&d?d[m]:p[r]){for(l=h.length-1;l>=0;l--)h[l].action!==e||i&&h[l].context!==i||(_=h.splice(l,1),_[0].action=o.Util.falseFn);i&&d&&0===h.length&&(delete d[m],p[c]--)}}else delete p[r],delete p[u];return this},clearAllEventListeners:function(){return delete this[s],this},fireEvent:function(t,e){if(!this.hasEventListeners(t))return this;var i,n,a,r,h,l=o.Util.extend({},e,{type:t,target:this}),u=this[s];if(u[t])for(i=u[t].slice(),n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context||this,l);r=u[t+"_idx"];for(h in r)if(i=r[h])for(n=0,a=i.length;a>n;n++)i[n].action.call(i[n].context||this,l);return this},addOneTimeEventListener:function(t,e,i){if(o.Util.invokeEach(t,this.addOneTimeEventListener,this,e,i))return this;var n=o.bind(function(){this.removeEventListener(t,e,i).removeEventListener(t,n,i)},this);return this.addEventListener(t,e,i).addEventListener(t,n,i)}},o.Mixin.Events.on=o.Mixin.Events.addEventListener,o.Mixin.Events.off=o.Mixin.Events.removeEventListener,o.Mixin.Events.once=o.Mixin.Events.addOneTimeEventListener,o.Mixin.Events.fire=o.Mixin.Events.fireEvent,function(){var n=!!t.ActiveXObject,s=n&&!t.XMLHttpRequest,a=n&&!e.querySelector,r=n&&!e.addEventListener,h=navigator.userAgent.toLowerCase(),l=-1!==h.indexOf("webkit"),u=-1!==h.indexOf("chrome"),c=-1!==h.indexOf("phantom"),d=-1!==h.indexOf("android"),_=-1!==h.search("android [23]"),p=typeof orientation!=i+"",m=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints,f="devicePixelRatio"in t&&t.devicePixelRatio>1||"matchMedia"in t&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,g=e.documentElement,v=n&&"transition"in g.style,y="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix,L="MozPerspective"in g.style,P="OTransition"in g.style,x=!t.L_DISABLE_3D&&(v||y||L||P)&&!c,T=!t.L_NO_TOUCH&&!c&&function(){var t="ontouchstart";if(m||t in g)return!0;var i=e.createElement("div"),n=!1;return i.setAttribute?(i.setAttribute(t,"return;"),"function"==typeof i[t]&&(n=!0),i.removeAttribute(t),i=null,n):!1}();o.Browser={ie:n,ie6:s,ie7:a,ielt9:r,webkit:l,android:d,android23:_,chrome:u,ie3d:v,webkit3d:y,gecko3d:L,opera3d:P,any3d:x,mobile:p,mobileWebkit:p&&l,mobileWebkit3d:p&&y,mobileOpera:p&&t.opera,touch:T,msTouch:m,retina:f}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,a=s.x>=e.x&&n.x<=i.x,r=s.y>=e.y&&n.y<=i.y;return a&&r},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i];if(!n&&t.currentStyle&&(n=t.currentStyle[i]),(!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},getViewportOffset:function(t){var i,n=0,s=0,a=t,r=e.body,h=e.documentElement,l=o.Browser.ie7;do{if(n+=a.offsetTop||0,s+=a.offsetLeft||0,n+=parseInt(o.DomUtil.getStyle(a,"borderTopWidth"),10)||0,s+=parseInt(o.DomUtil.getStyle(a,"borderLeftWidth"),10)||0,i=o.DomUtil.getStyle(a,"position"),a.offsetParent===r&&"absolute"===i)break;if("fixed"===i){n+=r.scrollTop||h.scrollTop||0,s+=r.scrollLeft||h.scrollLeft||0;break}a=a.offsetParent}while(a);a=t;do{if(a===r)break;n-=a.scrollTop||0,s-=a.scrollLeft||0,o.DomUtil.documentIsLtr()||!o.Browser.webkit&&!l||(s+=a.scrollWidth-a.clientWidth,l&&"hidden"!==o.DomUtil.getStyle(a,"overflow-y")&&"hidden"!==o.DomUtil.getStyle(a,"overflow")&&(s+=17)),a=a.parentNode}while(a);return new o.Point(s,n)},documentIsLtr:function(){return o.DomUtil._docIsLtrCached||(o.DomUtil._docIsLtrCached=!0,o.DomUtil._docIsLtr="ltr"===o.DomUtil.getStyle(e.body,"direction")),o.DomUtil._docIsLtr},create:function(t,i,n){var o=e.createElement(t);return o.className=i,n&&n.appendChild(o),o},disableTextSelection:function(){e.selection&&e.selection.empty&&e.selection.empty(),this._onselectstart||(this._onselectstart=e.onselectstart||null,e.onselectstart=o.Util.falseFn)},enableTextSelection:function(){e.onselectstart===o.Util.falseFn&&(e.onselectstart=this._onselectstart,this._onselectstart=null)},hasClass:function(t,e){return t.className.length>0&&RegExp("(^|\\s)"+e+"(\\s|$)").test(t.className)},addClass:function(t,e){o.DomUtil.hasClass(t,e)||(t.className+=(t.className?" ":"")+e)},removeClass:function(t,e){t.className=o.Util.trim((" "+t.className+" ").replace(" "+e+" "," "))},setOpacity:function(t,e){if("opacity"in t.style)t.style.opacity=e;else if("filter"in t.style){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(o){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}},testProp:function(t){for(var i=e.documentElement.style,n=0;t.length>n;n++)if(t[n]in i)return t[n];return!1},getTranslateString:function(t){var e=o.Browser.webkit3d,i="translate"+(e?"3d":"")+"(",n=(e?",0":"")+")";return i+t.x+"px,"+t.y+"px"+n},getScaleString:function(t,e){var i=o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1*t))),n=" scale("+t+") ";return i+n},setPosition:function(t,e,i){t._leaflet_pos=e,!i&&o.Browser.any3d?(t.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(e),o.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden")):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos}},o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),o.DomUtil.TRANSITION_END="webkitTransition"===o.DomUtil.TRANSITION||"OTransition"===o.DomUtil.TRANSITION?o.DomUtil.TRANSITION+"End":"transitionend",o.LatLng=function(t,e){var i=parseFloat(t),n=parseFloat(e);if(isNaN(i)||isNaN(n))throw Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=i,this.lng=n},o.extend(o.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),o.LatLng.prototype={equals:function(t){if(!t)return!1;t=o.latLng(t);var e=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return o.LatLng.MAX_MARGIN>=e},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){t=o.latLng(t);var e=6378137,i=o.LatLng.DEG_TO_RAD,n=(t.lat-this.lat)*i,s=(t.lng-this.lng)*i,a=this.lat*i,r=t.lat*i,h=Math.sin(n/2),l=Math.sin(s/2),u=h*h+l*l*Math.cos(a)*Math.cos(r);return 2*e*Math.atan2(Math.sqrt(u),Math.sqrt(1-u))},wrap:function(t,e){var i=this.lng;return t=t||-180,e=e||180,i=(i+e)%(e-t)+(t>i||i===e?e:t),new o.LatLng(this.lat,i)}},o.latLng=function(t,e){return t instanceof o.LatLng?t:o.Util.isArray(t)?new o.LatLng(t[0],t[1]):t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon):new o.LatLng(t,e)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){return t="number"==typeof t[0]||"string"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t),t instanceof o.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,this._southWest.lat),this._southWest.lng=Math.min(t.lng,this._southWest.lng),this._northEast.lat=Math.max(t.lat,this._northEast.lat),this._northEast.lng=Math.max(t.lng,this._northEast.lng)):(this._southWest=new o.LatLng(t.lat,t.lng),this._northEast=new o.LatLng(t.lat,t.lng)):t instanceof o.LatLngBounds&&(this.extend(t._southWest),this.extend(t._northEast)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),a=s.lat>=e.lat&&n.lat<=i.lat,r=s.lng>=e.lng&&n.lng<=i.lng;return a&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return t?(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return!t||t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=t.lng*e,a=n*e;return a=Math.log(Math.tan(Math.PI/4+a/2)),new o.Point(s,a)},unproject:function(t){var e=o.LatLng.RAD_TO_DEG,i=t.x*e,n=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*e;return new o.LatLng(n,i)}},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)}},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},scale:function(t){return 256*Math.pow(2,t)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)}}),o.CRS.EPSG3857=o.extend({},o.CRS,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:new o.Transformation(.5/Math.PI,.5,-.5/Math.PI,.5),project:function(t){var e=this.projection.project(t),i=6378137;return e.multiplyBy(i)}}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/360,.5,-1/360,.5)}),o.Map=o.Class.extend({includes:o.Mixin.Events,options:{crs:o.CRS.EPSG3857,fadeAnimation:o.DomUtil.TRANSITION&&!o.Browser.android23,trackResize:!0,markerZoomAnimation:o.DomUtil.TRANSITION&&o.Browser.any3d},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._initLayers(e.layers),this._handlers=[],this.callInitHooks()},setView:function(t,e){return this._resetView(o.latLng(t),this._limitZoom(e)),this},setZoom:function(t,e){return this.setView(this.getCenter(),t,{zoom:e})},zoomIn:function(t,e){return this.setZoom(this._zoom+(t||1),e)},zoomOut:function(t,e){return this.setZoom(this._zoom-(t||1),e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),a=t instanceof o.Point?t:this.latLngToContainerPoint(t),r=a.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(r));return this.setView(h,e,{zoom:i})},fitBounds:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n)),a=n.subtract(i).divideBy(2),r=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(r.add(h).divideBy(2).add(a),s);return this.setView(l,s,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t){return this.fire("movestart"),this._rawPanBy(o.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){if(t=o.latLngBounds(t),this.options.maxBounds=t,!t)return this._boundsMinZoom=null,this;var e=this.getBoundsZoom(t,!0);return this._boundsMinZoom=e,this._loaded&&(e>this._zoom?this.setView(t.getCenter(),e):this.panInsideBounds(t)),this.on("moveend",this._panInsideMaxBounds,this),this},panInsideBounds:function(t){t=o.latLngBounds(t);var e=this.getPixelBounds(),i=e.getBottomLeft(),n=e.getTopRight(),s=this.project(t.getSouthWest()),a=this.project(t.getNorthEast()),r=0,h=0;return n.y<a.y&&(h=Math.ceil(a.y-n.y)),n.x>a.x&&(r=Math.floor(a.x-n.x)),i.y>s.y&&(h=Math.floor(s.y-i.y)),i.x<s.x&&(r=Math.ceil(s.x-i.x)),r||h?this.panBy([r,h]):this},addLayer:function(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[e]=t,this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,t.on("load",this._onTileLayerLoad,this)),this.whenReady(function(){t.onAdd(this),this.fire("layeradd",{layer:t})},this),this)},removeLayer:function(t){var e=o.stamp(t);if(this._layers[e])return t.onRemove(this),delete this._layers[e],this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels()),this.options.zoomAnimation&&o.TileLayer&&t instanceof o.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,t.off("load",this._onTileLayerLoad,this)),this.fire("layerremove",{layer:t})},hasLayer:function(t){return t?o.stamp(t)in this._layers:!1},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},invalidateSize:function(t){var e=this.getSize();if(this._sizeChanged=!0,this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds),!this._loaded)return this;var i=this.getSize(),n=e.subtract(i).divideBy(2).round();return(0!==n.x||0!==n.y)&&(t===!0?this.panBy(n):(this._rawPanBy(n),this.fire("move"),clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)),this.fire("resize",{oldSize:e,newSize:i})),this},addHandler:function(t,e){if(e){var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this}},remove:function(){return this._loaded&&this.fire("unload"),this._initEvents("off"),delete this._container._leaflet,this._clearPanes(),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this},getCenter:function(){return this._checkIfLoaded(),this._moved()?this.layerPointToLatLng(this._getCenterLayerPoint()):this._initialCenter},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){var t=this.options.minZoom||0,e=this._layersMinZoom||0,i=this._boundsMinZoom||0;return Math.max(t,e,i)},getMaxZoom:function(){var t=this.options.maxZoom===i?1/0:this.options.maxZoom,e=this._layersMaxZoom===i?1/0:this._layersMaxZoom;return Math.min(t,e)},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t);var n,s=this.getMinZoom()-(e?1:0),a=this.getMaxZoom(),r=this.getSize(),h=t.getNorthWest(),l=t.getSouthEast(),u=!0;i=o.point(i||[0,0]);do s++,n=this.project(l,s).subtract(this.project(h,s)).add(i),u=e?n.x<r.x||n.y<r.y:r.contains(n);while(u&&a>=s);return u&&e?null:e?s:s-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(){var t=this._getTopLeftPoint();return new o.Bounds(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t){var e=this.options.crs;return e.scale(t)/e.scale(this._zoom)},getScaleZoom:function(t){return this._zoom+Math.log(t)/Math.LN2},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw Error("Map container not found.");if(e._leaflet)throw Error("Map container is already initialized.");e._leaflet=!0},_initLayout:function(){var t=this._container;o.DomUtil.addClass(t,"leaflet-container"),o.Browser.touch&&o.DomUtil.addClass(t,"leaflet-touch"),this.options.fadeAnimation&&o.DomUtil.addClass(t,"leaflet-fade-anim");var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),t.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),t.shadowPane=this._createPane("leaflet-shadow-pane"),t.overlayPane=this._createPane("leaflet-overlay-pane"),t.markerPane=this._createPane("leaflet-marker-pane"),t.popupPane=this._createPane("leaflet-popup-pane");var e=" leaflet-zoom-hide";this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,e),o.DomUtil.addClass(t.shadowPane,e),o.DomUtil.addClass(t.popupPane,e))},_createPane:function(t,e){return o.DomUtil.create("div",t,e||this._panes.objectsPane)},_clearPanes:function(){this._container.removeChild(this._mapPane)},_initLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[],this._layers={},this._zoomBoundLayers={},this._tileLayersNum=0;var e,i;for(e=0,i=t.length;i>e;e++)this.addLayer(t[e])},_resetView:function(t,e,i,n){var s=this._zoom!==e;n||(this.fire("movestart"),s&&this.fire("zoomstart")),this._zoom=e,this._initialCenter=t,this._initialTopLeftPoint=this._getNewTopLeftPoint(t),i?this._initialTopLeftPoint._add(this._getMapPanePos()):o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum;var a=!this._loaded;this._loaded=!0,a&&this.fire("load"),this.fire("viewreset",{hard:!i}),this.fire("move"),(s||n)&&this.fire("zoomend"),this.fire("moveend",{hard:!i})},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_updateZoomLevels:function(){var t,e=1/0,n=-1/0,o=this._getZoomSpan();for(t in this._zoomBoundLayers){var s=this._zoomBoundLayers[t];isNaN(s.options.minZoom)||(e=Math.min(e,s.options.minZoom)),isNaN(s.options.maxZoom)||(n=Math.max(n,s.options.maxZoom))}t===i?this._layersMaxZoom=this._layersMinZoom=i:(this._layersMaxZoom=n,this._layersMinZoom=e),o!==this._getZoomSpan()&&this.fire("zoomlevelschange")},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){e=e||"on",o.DomEvent[e](this._container,"click",this._onMouseClick,this);var i,n,s=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"];for(i=0,n=s.length;n>i;i++)o.DomEvent[e](this._container,s[i],this._fireMouseEvent,this);this.options.trackResize&&o.DomEvent[e](t,"resize",this._onResize,this)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(this.invalidateSize,this,!1,this._container)},_onMouseClick:function(t){!this._loaded||this.dragging&&this.dragging.moved()||(this.fire("preclick"),this._fireMouseEvent(t))},_fireMouseEvent:function(t){if(this._loaded){var e=t.type;if(e="mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,this.hasEventListeners(e)){"contextmenu"===e&&o.DomEvent.preventDefault(t);var i=this.mouseEventToContainerPoint(t),n=this.containerPointToLayerPoint(i),s=this.layerPointToLatLng(n);this.fire(e,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t})}}},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this.fire("tilelayersload")},_clearHandlers:function(){for(var t=0,e=this._handlers.length;e>t;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,this):this.on("load",t,e),this},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(){return this.getPixelOrigin().subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewTopLeftPoint(i,e).add(this._getMapPanePos());return this.project(t,e)._subtract(n)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom();return Math.max(e,Math.min(i,t))}}),o.map=function(t,e){return new o.Map(t,e)},o.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.3142,R_MAJOR:6378137,project:function(t){var e=o.LatLng.DEG_TO_RAD,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=this.R_MAJOR,a=this.R_MINOR,r=t.lng*e*s,h=n*e,l=a/s,u=Math.sqrt(1-l*l),c=u*Math.sin(h);c=Math.pow((1-c)/(1+c),.5*u);var d=Math.tan(.5*(.5*Math.PI-h))/c;return h=-a*Math.log(d),new o.Point(r,h)},unproject:function(t){for(var e,i=o.LatLng.RAD_TO_DEG,n=this.R_MAJOR,s=this.R_MINOR,a=t.x*i/n,r=s/n,h=Math.sqrt(1-r*r),l=Math.exp(-t.y/s),u=Math.PI/2-2*Math.atan(l),c=15,d=1e-7,_=c,p=.1;Math.abs(p)>d&&--_>0;)e=h*Math.sin(u),p=Math.PI/2-2*Math.atan(l*Math.pow((1-e)/(1+e),.5*h))-u,u+=p;return new o.LatLng(u*i,a)}},o.CRS.EPSG3395=o.extend({},o.CRS,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=o.Projection.Mercator,e=t.R_MAJOR,i=t.R_MINOR;return new o.Transformation(.5/(Math.PI*e),.5,-.5/(Math.PI*i),.5)}()}),o.TileLayer=o.Class.extend({includes:o.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:o.Browser.mobile,updateWhenIdle:o.Browser.mobile},initialize:function(t,e){e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomOffset++,e.minZoom>0&&e.minZoom--,this.options.maxZoom--),e.bounds&&(e.bounds=o.latLngBounds(e.bounds)),this._url=t;var i=this.options.subdomains;"string"==typeof i&&(this.options.subdomains=i.split(""))},onAdd:function(t){this._map=t,this._animated=t.options.zoomAnimation&&o.Browser.any3d,this._initContainer(),this._createTileProto(),t.on({viewreset:this._reset,moveend:this._update},this),this._animated&&t.on({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||(this._limitedUpdate=o.Util.limitExecByInterval(this._update,150,this),t.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this._container.parentNode.removeChild(this._container),t.off({viewreset:this._reset,moveend:this._update},this),this._animated&&t.off({zoomanim:this._animateZoom,zoomend:this._endZoomAnim},this),this.options.updateWhenIdle||t.off("move",this._limitedUpdate,this),this._container=null,this._map=null},bringToFront:function(){var t=this._map._panes.tilePane;return this._container&&(t.appendChild(this._container),this._setAutoZIndex(t,Math.max)),this},bringToBack:function(){var t=this._map._panes.tilePane;return this._container&&(t.insertBefore(this._container,t.firstChild),this._setAutoZIndex(t,Math.min)),this
},getAttribution:function(){return this.options.attribution},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},redraw:function(){return this._map&&(this._reset({hard:!0}),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t,e){var i,n,o,s=t.children,a=-e(1/0,-1/0);for(n=0,o=s.length;o>n;n++)s[n]!==this._container&&(i=parseInt(s[n].style.zIndex,10),isNaN(i)||(a=e(a,i)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a:0)+e(1,-1)},_updateOpacity:function(){var t,e=this._tiles;if(o.Browser.ielt9)for(t in e)o.DomUtil.setOpacity(e[t],this.options.opacity);else o.DomUtil.setOpacity(this._container,this.options.opacity);if(o.Browser.webkit)for(t in e)e[t].style.webkitTransform+=" translate(0,0)"},_initContainer:function(){var t=this._map._panes.tilePane;if(!this._container){if(this._container=o.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),this._animated){var e="leaflet-tile-container leaflet-zoom-animated";this._bgBuffer=o.DomUtil.create("div",e,this._container),this._tileContainer=o.DomUtil.create("div",e,this._container)}else this._tileContainer=this._container;t.appendChild(this._container),1>this.options.opacity&&this._updateOpacity()}},_reset:function(t){for(var e in this._tiles)this.fire("tileunload",{tile:this._tiles[e]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),this._tileContainer.innerHTML="",this._animated&&t&&t.hard&&this._clearBgBuffer(),this._initContainer()},_update:function(){if(this._map){var t=this._map.getPixelBounds(),e=this._map.getZoom(),i=this.options.tileSize;if(!(e>this.options.maxZoom||this.options.minZoom>e)){var n=o.bounds(t.min.divideBy(i)._floor(),t.max.divideBy(i)._floor());this._addTilesFromCenterOut(n),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(n)}}},_addTilesFromCenterOut:function(t){var i,n,s,a=[],r=t.getCenter();for(i=t.min.y;t.max.y>=i;i++)for(n=t.min.x;t.max.x>=n;n++)s=new o.Point(n,i),this._tileShouldBeLoaded(s)&&a.push(s);var h=a.length;if(0!==h){a.sort(function(t,e){return t.distanceTo(r)-e.distanceTo(r)});var l=e.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=h,n=0;h>n;n++)this._addTile(a[n],l);this._tileContainer.appendChild(l)}},_tileShouldBeLoaded:function(t){if(t.x+":"+t.y in this._tiles)return!1;var e=this.options;if(!e.continuousWorld&&e.noWrap){var i=this._getWrapTileNum();if(0>t.x||t.x>=i||0>t.y||t.y>=i)return!1}if(e.bounds){var n=e.tileSize,o=t.multiplyBy(n),s=o.add([n,n]),a=this._map.unproject(o),r=this._map.unproject(s);if(e.continuousWorld||e.noWrap||(a=a.wrap(),r=r.wrap()),!e.bounds.intersects([a,r]))return!1}return!0},_removeOtherTiles:function(t){var e,i,n,o;for(o in this._tiles)e=o.split(":"),i=parseInt(e[0],10),n=parseInt(e[1],10),(t.min.x>i||i>t.max.x||t.min.y>n||n>t.max.y)&&this._removeTile(o)},_removeTile:function(t){var e=this._tiles[t];this.fire("tileunload",{tile:e,url:e.src}),this.options.reuseTiles?(o.DomUtil.removeClass(e,"leaflet-tile-loaded"),this._unusedTiles.push(e)):e.parentNode===this._tileContainer&&this._tileContainer.removeChild(e),o.Browser.android||(e.onload=null,e.src=o.Util.emptyImageUrl),delete this._tiles[t]},_addTile:function(t,e){var i=this._getTilePos(t),n=this._getTile();o.DomUtil.setPosition(n,i,o.Browser.chrome||o.Browser.android23),this._tiles[t.x+":"+t.y]=n,this._loadTile(n,t),n.parentNode!==this._tileContainer&&e.appendChild(n)},_getZoomForUrl:function(){var t=this.options,e=this._map.getZoom();return t.zoomReverse&&(e=t.maxZoom-e),e+t.zoomOffset},_getTilePos:function(t){var e=this._map.getPixelOrigin(),i=this.options.tileSize;return t.multiplyBy(i).subtract(e)},getTileUrl:function(t){return o.Util.template(this._url,o.extend({s:this._getSubdomain(t),z:t.z,x:t.x,y:t.y},this.options))},_getWrapTileNum:function(){return Math.pow(2,this._getZoomForUrl())},_adjustTilePoint:function(t){var e=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%e+e)%e),this.options.tms&&(t.y=e-t.y-1),t.z=this._getZoomForUrl()},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_createTileProto:function(){var t=this._tileImg=o.DomUtil.create("img","leaflet-tile");t.style.width=t.style.height=this.options.tileSize+"px",t.galleryimg="no"},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var t=this._unusedTiles.pop();return this._resetTile(t),t}return this._createTile()},_resetTile:function(){},_createTile:function(){var t=this._tileImg.cloneNode(!1);return t.onselectstart=t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity!==i&&o.DomUtil.setOpacity(t,this.options.opacity),t},_loadTile:function(t,e){t._layer=this,t.onload=this._tileOnLoad,t.onerror=this._tileOnError,this._adjustTilePoint(e),t.src=this.getTileUrl(e)},_tileLoaded:function(){this._tilesToLoad--,this._tilesToLoad||(this.fire("load"),this._animated&&(clearTimeout(this._clearBgBufferTimer),this._clearBgBufferTimer=setTimeout(o.bind(this._clearBgBuffer,this),500)))},_tileOnLoad:function(){var t=this._layer;this.src!==o.Util.emptyImageUrl&&(o.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var e=t.options.errorTileUrl;e&&(this.src=e),t._tileLoaded()}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams),n=e.tileSize||this.options.tileSize;i.width=i.height=e.detectRetina&&o.Browser.retina?2*n:n;for(var s in e)this.options.hasOwnProperty(s)||(i[s]=e[s]);this.wmsParams=i,o.setOptions(this,e)},onAdd:function(t){var e=parseFloat(this.wmsParams.version)>=1.3?"crs":"srs";this.wmsParams[e]=t.options.crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t,e){var i=this._map,n=i.options.crs,s=this.options.tileSize,a=t.multiplyBy(s),r=a.add([s,s]),h=n.project(i.unproject(a,e)),l=n.project(i.unproject(r,e)),u=[h.x,l.y,l.x,h.y].join(","),c=o.Util.template(this._url,{s:this._getSubdomain(t)});return c+o.Util.getParamString(this.wmsParams,c)+"&bbox="+u},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.TileLayer.Canvas=o.TileLayer.extend({options:{async:!1},initialize:function(t){o.setOptions(this,t)},redraw:function(){for(var t in this._tiles)this._redrawTile(this._tiles[t]);return this},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTileProto:function(){var t=this._canvasProto=o.DomUtil.create("canvas","leaflet-tile");t.width=t.height=this.options.tileSize},_createTile:function(){var t=this._canvasProto.cloneNode(!1);return t.onselectstart=t.onmousemove=o.Util.falseFn,t},_loadTile:function(t,e){t._layer=this,t._tilePoint=e,this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(){},tileDrawn:function(t){this._tileOnLoad.call(t)}}),o.tileLayer.canvas=function(t){return new o.TileLayer.Canvas(t)},o.ImageOverlay=o.Class.extend({includes:o.Mixin.Events,options:{opacity:1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(t){this._map=t,this._image||this._initImage(),t._panes.overlayPane.appendChild(this._image),t.on("viewreset",this._reset,this),t.options.zoomAnimation&&o.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._image),t.off("viewreset",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var t=this._map._panes.overlayPane;return this._image&&t.insertBefore(this._image,t.firstChild),this},_initImage:function(){this._image=o.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&o.Browser.any3d?o.DomUtil.addClass(this._image,"leaflet-zoom-animated"):o.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),o.extend(this._image,{galleryimg:"no",onselectstart:o.Util.falseFn,onmousemove:o.Util.falseFn,onload:o.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(t){var e=this._map,i=this._image,n=e.getZoomScale(t.zoom),s=this._bounds.getNorthWest(),a=this._bounds.getSouthEast(),r=e._latLngToNewLayerPoint(s,t.zoom,t.center),h=e._latLngToNewLayerPoint(a,t.zoom,t.center)._subtract(r),l=r._add(h._multiplyBy(.5*(1-1/n)));i.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(l)+" scale("+n+") "},_reset:function(){var t=this._image,e=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),i=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);o.DomUtil.setPosition(t,e),t.style.width=i.x+"px",t.style.height=i.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({options:{className:""},initialize:function(t){o.setOptions(this,t)},createIcon:function(){return this._createIcon("icon")},createShadow:function(){return this._createIcon("shadow")},_createIcon:function(t){var e=this._getIconUrl(t);if(!e){if("icon"===t)throw Error("iconUrl not set in Icon options (see the docs).");return null}var i=this._createImg(e);return this._setIconStyles(i,t),i},_setIconStyles:function(t,e){var i,n=this.options,s=o.point(n[e+"Size"]);i="shadow"===e?o.point(n.shadowAnchor||n.iconAnchor):o.point(n.iconAnchor),!i&&s&&(i=s.divideBy(2,!0)),t.className="leaflet-marker-"+e+" "+n.className,i&&(t.style.marginLeft=-i.x+"px",t.style.marginTop=-i.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t){var i;return o.Browser.ie6?(i=e.createElement("div"),i.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+t+'")'):(i=e.createElement("img"),i.src=t),i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]:this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]},_getIconUrl:function(t){var e=t+"Url";if(this.options[e])return this.options[e];o.Browser.retina&&"icon"===t&&(t+="-2x");var i=o.Icon.Default.imagePath;if(!i)throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return i+"/marker-"+t+".png"}}),o.Icon.Default.imagePath=function(){var t,i,n,o,s,a=e.getElementsByTagName("script"),r=/\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,i=a.length;i>t;t++)if(n=a[t].src,o=n.match(r))return s=n.split(r)[0],(s?s+"/":"")+"images"}(),o.Marker=o.Class.extend({includes:o.Mixin.Events,options:{icon:new o.Icon.Default,title:"",clickable:!0,draggable:!1,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._map=t,t.on("viewreset",this.update,this),this._initIcon(),this.update(),t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){this.dragging&&this.dragging.disable(),this._removeIcon(),this.fire("remove"),t.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this.update(),this.fire("move",{latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update(),this},setIcon:function(t){return this._map&&this._removeIcon(),this.options.icon=t,this._map&&(this._initIcon(),this.update()),this},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e=this._map,i=e.options.zoomAnimation&&e.options.markerZoomAnimation,n=i?"leaflet-zoom-animated":"leaflet-zoom-hide",s=!1;this._icon||(this._icon=t.icon.createIcon(),t.title&&(this._icon.title=t.title),this._initInteraction(),s=1>this.options.opacity,o.DomUtil.addClass(this._icon,n),t.riseOnHover&&o.DomEvent.on(this._icon,"mouseover",this._bringToFront,this).on(this._icon,"mouseout",this._resetZIndex,this)),this._shadow||(this._shadow=t.icon.createShadow(),this._shadow&&(o.DomUtil.addClass(this._shadow,n),s=1>this.options.opacity)),s&&this._updateOpacity();var a=this._map._panes;a.markerPane.appendChild(this._icon),this._shadow&&a.shadowPane.appendChild(this._shadow)},_removeIcon:function(){var t=this._map._panes;this.options.riseOnHover&&o.DomEvent.off(this._icon,"mouseover",this._bringToFront).off(this._icon,"mouseout",this._resetZIndex),t.markerPane.removeChild(this._icon),this._shadow&&t.shadowPane.removeChild(this._shadow),this._icon=this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPos(e)},_initInteraction:function(){if(this.options.clickable){var t=this._icon,e=["dblclick","mousedown","mouseover","mouseout","contextmenu"];o.DomUtil.addClass(t,"leaflet-clickable"),o.DomEvent.on(t,"click",this._onMouseClick,this);for(var i=0;e.length>i;i++)o.DomEvent.on(t,e[i],this._fireMouseEvent,this);o.Handler.MarkerDrag&&(this.dragging=new o.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())}},_onMouseClick:function(t){var e=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||e)&&o.DomEvent.stopPropagation(t),e||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,{originalEvent:t,latlng:this._latlng})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t,latlng:this._latlng}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&o.DomEvent.preventDefault(t),"mousedown"!==t.type&&o.DomEvent.stopPropagation(t)},setOpacity:function(t){this.options.opacity=t,this._map&&this._updateOpacity()},_updateOpacity:function(){o.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&o.DomUtil.setOpacity(this._shadow,this.options.opacity)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],className:"leaflet-div-icon",html:!1},createIcon:function(){var t=e.createElement("div"),i=this.options;return i.html!==!1&&(t.innerHTML=i.html),i.bgPos&&(t.style.backgroundPosition=-i.bgPos.x+"px "+-i.bgPos.y+"px"),this._setIconStyles(t,"icon"),t},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Popup=o.Class.extend({includes:o.Mixin.Events,options:{minWidth:50,maxWidth:300,maxHeight:null,autoPan:!0,closeButton:!0,offset:[0,6],autoPanPadding:[5,5],keepInView:!1,className:"",zoomAnimation:!0},initialize:function(t,e){o.setOptions(this,t),this._source=e,this._animated=o.Browser.any3d&&this.options.zoomAnimation},onAdd:function(t){this._map=t,this._container||this._initLayout(),this._updateContent();var e=t.options.fadeAnimation;e&&o.DomUtil.setOpacity(this._container,0),t._panes.popupPane.appendChild(this._container),t.on(this._getEvents(),this),this._update(),e&&o.DomUtil.setOpacity(this._container,1),this.fire("open"),t.fire("popupopen",{popup:this}),this._source&&this._source.fire("popupopen",{popup:this})},addTo:function(t){return t.addLayer(this),this},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._panes.popupPane.removeChild(this._container),o.Util.falseFn(this._container.offsetWidth),t.off(this._getEvents(),this),t.options.fadeAnimation&&o.DomUtil.setOpacity(this._container,0),this._map=null,this.fire("close"),t.fire("popupclose",{popup:this}),this._source&&this._source.fire("popupclose",{popup:this})},setLatLng:function(t){return this._latlng=o.latLng(t),this._update(),this},setContent:function(t){return this._content=t,this._update(),this},_getEvents:function(){var t={viewreset:this._updatePosition};return this._animated&&(t.zoomanim=this._zoomAnimation),this._map.options.closePopupOnClick&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t,e="leaflet-popup",i=e+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated":"hide"),n=this._container=o.DomUtil.create("div",i);this.options.closeButton&&(t=this._closeButton=o.DomUtil.create("a",e+"-close-button",n),t.href="#close",t.innerHTML="&#215;",o.DomEvent.disableClickPropagation(t),o.DomEvent.on(t,"click",this._onCloseButtonClick,this));var s=this._wrapper=o.DomUtil.create("div",e+"-content-wrapper",n);o.DomEvent.disableClickPropagation(s),this._contentNode=o.DomUtil.create("div",e+"-content",s),o.DomEvent.on(this._contentNode,"mousewheel",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",e+"-tip-container",n),this._tip=o.DomUtil.create("div",e+"-tip",this._tipContainer)},_update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},_updateContent:function(){if(this._content){if("string"==typeof this._content)this._contentNode.innerHTML=this._content;else{for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,a="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,a)):o.DomUtil.removeClass(t,a),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=this._animated,i=o.point(this.options.offset);e&&o.DomUtil.setPosition(this._container,t),this._containerBottom=-i.y-(e?0:t.y),this._containerLeft=-Math.round(this._containerWidth/2)+i.x+(e?0:t.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"}},_zoomAnimation:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);o.DomUtil.setPosition(this._container,e)},_adjustPan:function(){if(this.options.autoPan){var t=this._map,e=this._container.offsetHeight,i=this._containerWidth,n=new o.Point(this._containerLeft,-e-this._containerBottom);this._animated&&n._add(o.DomUtil.getPosition(this._container));var s=t.layerPointToContainerPoint(n),a=o.point(this.options.autoPanPadding),r=t.getSize(),h=0,l=0;s.x+i>r.x&&(h=s.x+i-r.x+a.x),0>s.x-h&&(h=s.x-a.x),s.y+e>r.y&&(l=s.y+e-r.y+a.y),0>s.y-l&&(l=s.y-a.y),(h||l)&&t.fire("autopanstart").panBy([h,l])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.include({openPopup:function(t,e,i){if(this.closePopup(),!(t instanceof o.Popup)){var n=t;t=new o.Popup(i).setLatLng(e).setContent(n)}return this._popup=t,this.addLayer(t)},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),o.Marker.include({openPopup:function(){return this._popup&&this._map&&!this._map.hasLayer(this._popup)&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},bindPopup:function(t,e){var i=o.point(this.options.icon.options.popupAnchor||[0,0]);return i=i.add(o.Popup.prototype.options.offset),e&&e.offset&&(i=i.add(e.offset)),e=o.extend({offset:i},e),this._popup||this.on("click",this.openPopup,this).on("remove",this.closePopup,this).on("move",this._movePopup,this),t instanceof o.Popup?(o.setOptions(t,e),this._popup=t):this._popup=new o.Popup(e,this).setContent(t),this},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.openPopup).off("remove",this.closePopup).off("move",this._movePopup)),this},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.LayerGroup=o.Class.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;i>e;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return t?t in this._layers||this.getLayerId(t)in this._layers:!1},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){this._map=t,this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t),this._map=null},addTo:function(t){return t.addLayer(this),this},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({includes:o.Mixin.Events,statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu"},addLayer:function(t){return this.hasLayer(t)?this:(t.on(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.addLayer.call(this,t),this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,this._popupOptions),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return t in this._layers&&(t=this._layers[t]),t.off(o.FeatureGroup.EVENTS,this._propagateEvent,this),o.LayerGroup.prototype.removeLayer.call(this,t),this._popupContent&&this.invoke("unbindPopup"),this.fire("layerremove",{layer:t})},bindPopup:function(t,e){return this._popupContent=t,this._popupOptions=e,this.invoke("bindPopup",t,e)},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;return this.eachLayer(function(e){t.extend(e instanceof o.Marker?e.getLatLng():e.getBounds())}),t},_propagateEvent:function(t){t.layer||(t.layer=t.target),t.target=this,this.fire(t.type,t)}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Path=o.Class.extend({includes:[o.Mixin.Events],statics:{CLIP_PADDING:o.Browser.mobile?Math.max(0,Math.min(.5,(1280/Math.max(t.innerWidth,t.innerHeight)-1)/2)):.5},options:{stroke:!0,color:"#0033ff",dashArray:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(t){o.setOptions(this,t)},onAdd:function(t){this._map=t,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),this.fire("add"),t.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t._pathRoot.removeChild(this._container),this.fire("remove"),this._map=null,o.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),t.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(t){return o.setOptions(this,t),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),o.Map.include({_updatePathViewport:function(){var t=o.Path.CLIP_PADDING,e=this.getSize(),i=o.DomUtil.getPosition(this._mapPane),n=i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),s=n.add(e.multiplyBy(1+2*t)._round());this._pathViewport=new o.Bounds(n,s)}}),o.Path.SVG_NS="http://www.w3.org/2000/svg",o.Browser.svg=!(!e.createElementNS||!e.createElementNS(o.Path.SVG_NS,"svg").createSVGRect),o.Path=o.Path.extend({statics:{SVG:o.Browser.svg},bringToFront:function(){var t=this._map._pathRoot,e=this._container;return e&&t.lastChild!==e&&t.appendChild(e),this},bringToBack:function(){var t=this._map._pathRoot,e=this._container,i=t.firstChild;return e&&i!==e&&t.insertBefore(e,i),this},getPathString:function(){},_createElement:function(t){return e.createElementNS(o.Path.SVG_NS,t)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this.options.pointerEvents&&this._path.setAttribute("pointer-events",this.options.pointerEvents),this.options.clickable||this.options.pointerEvents||this._path.setAttribute("pointer-events","none"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray")):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var t=this.getPathString();t||(t="M0 0"),this._path.setAttribute("d",t)},_initEvents:function(){if(this.options.clickable){(o.Browser.svg||!o.Browser.vml)&&this._path.setAttribute("class","leaflet-clickable"),o.DomEvent.on(this._container,"click",this._onMouseClick,this);for(var t=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"],e=0;t.length>e;e++)o.DomEvent.on(this._container,t[e],this._fireMouseEvent,this)}},_onMouseClick:function(t){this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)},_fireMouseEvent:function(t){if(this.hasEventListeners(t.type)){var e=this._map,i=e.mouseEventToContainerPoint(t),n=e.containerPointToLayerPoint(i),s=e.layerPointToLatLng(n);this.fire(t.type,{latlng:s,layerPoint:n,containerPoint:i,originalEvent:t}),"contextmenu"===t.type&&o.DomEvent.preventDefault(t),"mousemove"!==t.type&&o.DomEvent.stopPropagation(t)}}}),o.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=o.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&o.Browser.any3d?(this._pathRoot.setAttribute("class"," leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):this._pathRoot.setAttribute("class"," leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())},_animatePathZoom:function(t){var e=this.getZoomScale(t.zoom),i=this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);this._pathRoot.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(i)+" scale("+e+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max,n=i.x-e.x,s=i.y-e.y,a=this._pathRoot,r=this._panes.overlayPane;o.Browser.mobileWebkit&&r.removeChild(a),o.DomUtil.setPosition(a,e),a.setAttribute("width",n),a.setAttribute("height",s),a.setAttribute("viewBox",[e.x,e.y,n,s].join(" ")),o.Browser.mobileWebkit&&r.appendChild(a)}}}),o.Path.include({bindPopup:function(t,e){return t instanceof o.Popup?this._popup=t:((!this._popup||e)&&(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on("click",this._openPopup,this).on("remove",this.closePopup,this),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this._openPopup).off("remove",this.closePopup),this._popupHandlersAdded=!1),this},openPopup:function(t){return this._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:t})),this},closePopup:function(){return this._popup&&this._popup._close(),this},_openPopup:function(t){this._popup.setLatLng(t.latlng),this._map.openPopup(this._popup)}}),o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(n){return!1}}(),o.Path=o.Browser.svg||!o.Browser.vml?o.Path:o.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var t=this._container=this._createElement("shape");o.DomUtil.addClass(t,"leaflet-vml-shape"),this.options.clickable&&o.DomUtil.addClass(t,"leaflet-clickable"),t.coordsize="1 1",this._path=this._createElement("path"),t.appendChild(this._path),this._map._pathRoot.appendChild(t)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var t=this._stroke,e=this._fill,i=this.options,n=this._container;n.stroked=i.stroke,n.filled=i.fill,i.stroke?(t||(t=this._stroke=this._createElement("stroke"),t.endcap="round",n.appendChild(t)),t.weight=i.weight+"px",t.color=i.color,t.opacity=i.opacity,t.dashStyle=i.dashArray?i.dashArray instanceof Array?i.dashArray.join(" "):i.dashArray.replace(/( *, *)/g," "):""):t&&(n.removeChild(t),this._stroke=null),i.fill?(e||(e=this._fill=this._createElement("fill"),n.appendChild(e)),e.color=i.fillColor||i.color,e.opacity=i.fillOpacity):e&&(n.removeChild(e),this._fill=null)},_updatePath:function(){var t=this._container.style;t.display="none",this._path.v=this.getPathString()+" ",t.display=""}}),o.Map.include(o.Browser.svg||!o.Browser.vml?{}:{_initPathRoot:function(){if(!this._pathRoot){var t=this._pathRoot=e.createElement("div");t.className="leaflet-vml-container",this._panes.overlayPane.appendChild(t),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.Path=o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?o.Path:o.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this
},setStyle:function(t){return o.setOptions(this,t),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(t){t.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this.options.clickable&&this._map.off("click",this._onClick,this),this._requestUpdate(),this._map=null},_requestUpdate:function(){this._map&&!o.Path._updateRequest&&(o.Path._updateRequest=o.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){o.Path._updateRequest=null,this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var t=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,this._ctx.strokeStyle=t.color),t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)},_drawPath:function(){var t,e,i,n,s,a;for(this._ctx.beginPath(),t=0,i=this._parts.length;i>t;t++){for(e=0,n=this._parts[t].length;n>e;e++)s=this._parts[t][e],a=(0===e?"move":"line")+"To",this._ctx[a](s.x,s.y);this instanceof o.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(!this._checkIfEmpty()){var t=this._ctx,e=this.options;this._drawPath(),t.save(),this._updateStyle(),e.fill&&(t.globalAlpha=e.fillOpacity,t.fill()),e.stroke&&(t.globalAlpha=e.opacity,t.stroke()),t.restore()}},_initEvents:function(){this.options.clickable&&(this._map.on("mousemove",this._onMouseMove,this),this._map.on("click",this._onClick,this))},_onClick:function(t){this._containsPoint(t.layerPoint)&&this.fire("click",t)},_onMouseMove:function(t){this._map&&!this._map._animatingZoom&&(this._containsPoint(t.layerPoint)?(this._ctx.canvas.style.cursor="pointer",this._mouseInside=!0,this.fire("mouseover",t)):this._mouseInside&&(this._ctx.canvas.style.cursor="",this._mouseInside=!1,this.fire("mouseout",t)))}}),o.Map.include(o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?{}:{_initPathRoot:function(){var t,i=this._pathRoot;i||(i=this._pathRoot=e.createElement("canvas"),i.style.position="absolute",t=this._canvasCtx=i.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(i),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(!this._pathZooming){this._updatePathViewport();var t=this._pathViewport,e=t.min,i=t.max.subtract(e),n=this._pathRoot;o.DomUtil.setPosition(n,e),n.width=i.x,n.height=i.y,n.getContext("2d").translate(-e.x,-e.y)}}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var a,r=[];for(a=0;n>a;a++)s[a]&&r.push(t[a]);return r},_simplifyDPStep:function(t,e,i,n,o){var s,a,r,h=0;for(a=n+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],t[n],t[o],!0),r>h&&(s=a,h=r);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;s>n;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return s-1>o&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n){var o,s,a,r=n?this._lastCode:this._getBitCode(t,i),h=this._getBitCode(e,i);for(this._lastCode=h;;){if(!(r|h))return[t,e];if(r&h)return!1;o=r||h,s=this._getEdgeIntersection(t,e,o,i),a=this._getBitCode(s,i),o===r?(t=s,r=a):(e=s,h=a)}},_getEdgeIntersection:function(t,e,n,s){var a=e.x-t.x,r=e.y-t.y,h=s.min,l=s.max;return 8&n?new o.Point(t.x+a*(l.y-t.y)/r,l.y):4&n?new o.Point(t.x+a*(h.y-t.y)/r,h.y):2&n?new o.Point(l.x,t.y+r*(l.x-t.x)/a):1&n?new o.Point(h.x,t.y+r*(h.x-t.x)/a):i},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,a=e.x,r=e.y,h=i.x-a,l=i.y-r,u=h*h+l*l;return u>0&&(s=((t.x-a)*h+(t.y-r)*l)/u,s>1?(a=i.x,r=i.y):s>0&&(a+=h*s,r+=l*s)),h=t.x-a,l=t.y-r,n?h*h+l*l:new o.Point(a,r)}},o.Polyline=o.Path.extend({initialize:function(t,e){o.Path.prototype.initialize.call(this,e),this._latlngs=this._convertLatLngs(t)},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var t=0,e=this._latlngs.length;e>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])},getPathString:function(){for(var t=0,e=this._parts.length,i="";e>t;t++)i+=this._getPathPartStr(this._parts[t]);return i},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._latlngs=this._convertLatLngs(t),this.redraw()},addLatLng:function(t){return this._latlngs.push(o.latLng(t)),this.redraw()},spliceLatLngs:function(){var t=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs,!0),this.redraw(),t},closestLayerPoint:function(t){for(var e,i,n=1/0,s=this._parts,a=null,r=0,h=s.length;h>r;r++)for(var l=s[r],u=1,c=l.length;c>u;u++){e=l[u-1],i=l[u];var d=o.LineUtil._sqClosestPointOnSegment(t,e,i,!0);n>d&&(n=d,a=o.LineUtil._sqClosestPointOnSegment(t,e,i))}return a&&(a.distance=Math.sqrt(n)),a},getBounds:function(){return new o.LatLngBounds(this.getLatLngs())},_convertLatLngs:function(t,e){var i,n,s=e?t:[];for(i=0,n=t.length;n>i;i++){if(o.Util.isArray(t[i])&&"number"!=typeof t[i][0])return;s[i]=o.latLng(t[i])}return s},_initEvents:function(){o.Path.prototype._initEvents.call(this)},_getPathPartStr:function(t){for(var e,i=o.Path.VML,n=0,s=t.length,a="";s>n;n++)e=t[n],i&&e._round(),a+=(n?"L":"M")+e.x+" "+e.y;return a},_clipPoints:function(){var t,e,n,s=this._originalPoints,a=s.length;if(this.options.noClip)return this._parts=[s],i;this._parts=[];var r=this._parts,h=this._map._pathViewport,l=o.LineUtil;for(t=0,e=0;a-1>t;t++)n=l.clipSegment(s[t],s[t+1],h,t),n&&(r[e]=r[e]||[],r[e].push(n[0]),(n[1]!==s[t+1]||t===a-2)&&(r[e].push(n[1]),e++))},_simplifyPoints:function(){for(var t=this._parts,e=o.LineUtil,i=0,n=t.length;n>i;i++)t[i]=e.simplify(t[i],this.options.smoothFactor)},_updatePath:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),o.Path.prototype._updatePath.call(this))}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e){var i,n,s,a,r,h,l,u,c,d=[1,4,2,8],_=o.LineUtil;for(n=0,l=t.length;l>n;n++)t[n]._code=_._getBitCode(t[n],e);for(a=0;4>a;a++){for(u=d[a],i=[],n=0,l=t.length,s=l-1;l>n;s=n++)r=t[n],h=t[s],r._code&u?h._code&u||(c=_._getEdgeIntersection(h,r,u,e),c._code=_._getBitCode(c,e),i.push(c)):(h._code&u&&(c=_._getEdgeIntersection(h,r,u,e),c._code=_._getBitCode(c,e),i.push(c)),i.push(r));t=i}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},initialize:function(t,e){var i,n,s;if(o.Polyline.prototype.initialize.call(this,t,e),t&&o.Util.isArray(t[0])&&"number"!=typeof t[0][0])for(this._latlngs=this._convertLatLngs(t[0]),this._holes=t.slice(1),i=0,n=this._holes.length;n>i;i++)s=this._holes[i]=this._convertLatLngs(this._holes[i]),s[0].equals(s[s.length-1])&&s.pop();t=this._latlngs,t.length>=2&&t[0].equals(t[t.length-1])&&t.pop()},projectLatlngs:function(){if(o.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[],this._holes){var t,e,i,n;for(t=0,i=this._holes.length;i>t;t++)for(this._holePoints[t]=[],e=0,n=this._holes[t].length;n>e;e++)this._holePoints[t][e]=this._map.latLngToLayerPoint(this._holes[t][e])}},_clipPoints:function(){var t=this._originalPoints,e=[];if(this._parts=[t].concat(this._holePoints),!this.options.noClip){for(var i=0,n=this._parts.length;n>i;i++){var s=o.PolyUtil.clipPolygon(this._parts[i],this._map._pathViewport);s.length&&e.push(s)}this._parts=e}},_getPathPartStr:function(t){var e=o.Polyline.prototype._getPathPartStr.call(this,t);return e+(o.Browser.svg?"z":"x")}}),o.polygon=function(t,e){return new o.Polygon(t,e)},function(){function t(t){return o.FeatureGroup.extend({initialize:function(t,e){this._layers={},this._options=e,this.setLatLngs(t)},setLatLngs:function(e){var i=0,n=e.length;for(this.eachLayer(function(t){n>i?t.setLatLngs(e[i++]):this.removeLayer(t)},this);n>i;)this.addLayer(new t(e[i++],this._options));return this}})}o.MultiPolyline=t(o.Polyline),o.MultiPolygon=t(o.Polygon),o.multiPolyline=function(t,e){return new o.MultiPolyline(t,e)},o.multiPolygon=function(t,e){return new o.MultiPolygon(t,e)}}(),o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.Circle=o.Path.extend({initialize:function(t,e,i){o.Path.prototype.initialize.call(this,i),this._latlng=o.latLng(t),this._mRadius=e},options:{fill:!0},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw()},setRadius:function(t){return this._mRadius=t,this.redraw()},projectLatlngs:function(){var t=this._getLngRadius(),e=this._latlng,i=this._map.latLngToLayerPoint([e.lat,e.lng-t]);this._point=this._map.latLngToLayerPoint(e),this._radius=Math.max(this._point.x-i.x,1)},getBounds:function(){var t=this._getLngRadius(),e=360*(this._mRadius/40075017),i=this._latlng;return new o.LatLngBounds([i.lat-e,i.lng-t],[i.lat+e,i.lng+t])},getLatLng:function(){return this._latlng},getPathString:function(){var t=this._point,e=this._radius;return this._checkIfEmpty()?"":o.Browser.svg?"M"+t.x+","+(t.y-e)+"A"+e+","+e+",0,1,1,"+(t.x-.1)+","+(t.y-e)+" z":(t._round(),e=Math.round(e),"AL "+t.x+","+t.y+" "+e+","+e+" 0,"+23592600)},getRadius:function(){return this._mRadius},_getLatRadius:function(){return 360*(this._mRadius/40075017)},_getLngRadius:function(){return this._getLatRadius()/Math.cos(o.LatLng.DEG_TO_RAD*this._latlng.lat)},_checkIfEmpty:function(){if(!this._map)return!1;var t=this._map._pathViewport,e=this._radius,i=this._point;return i.x-e>t.max.x||i.y-e>t.max.y||i.x+e<t.min.x||i.y+e<t.min.y}}),o.circle=function(t,e,i){return new o.Circle(t,e,i)},o.CircleMarker=o.Circle.extend({options:{radius:10,weight:2},initialize:function(t,e){o.Circle.prototype.initialize.call(this,t,null,e),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},_updateStyle:function(){o.Circle.prototype._updateStyle.call(this),this.setRadius(this.options.radius)},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Polyline.include(o.Path.CANVAS?{_containsPoint:function(t,e){var i,n,s,a,r,h,l,u=this.options.weight/2;for(o.Browser.touch&&(u+=10),i=0,a=this._parts.length;a>i;i++)for(l=this._parts[i],n=0,r=l.length,s=r-1;r>n;s=n++)if((e||0!==n)&&(h=o.LineUtil.pointToSegmentDistance(t,l[s],l[n]),u>=h))return!0;return!1}}:{}),o.Polygon.include(o.Path.CANVAS?{_containsPoint:function(t){var e,i,n,s,a,r,h,l,u=!1;if(o.Polyline.prototype._containsPoint.call(this,t,!0))return!0;for(s=0,h=this._parts.length;h>s;s++)for(e=this._parts[s],a=0,l=e.length,r=l-1;l>a;r=a++)i=e[a],n=e[r],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u}}:{}),o.Circle.include(o.Path.CANVAS?{_drawPath:function(){var t=this._point;this._ctx.beginPath(),this._ctx.arc(t.x,t.y,this._radius,0,2*Math.PI,!1)},_containsPoint:function(t){var e=this._point,i=this.options.stroke?this.options.weight/2:0;return t.distanceTo(e)<=this._radius+i}}:{}),o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n=o.Util.isArray(t)?t:t.features;if(n){for(e=0,i=n.length;i>e;e++)(n[e].geometries||n[e].geometry||n[e].features)&&this.addData(n[e]);return this}var s=this.options;if(!s.filter||s.filter(t)){var a=o.GeoJSON.geometryToLayer(t,s.pointToLayer,s.coordsToLatLng);return a.feature=t,a.defaultOptions=a.options,this.resetStyle(a),s.onEachFeature&&s.onEachFeature(t,a),this.addLayer(a)}},resetStyle:function(t){var e=this.options.style;e&&(o.Util.extend(t.options,t.defaultOptions),this._setLayerStyle(t,e))},setStyle:function(t){this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e,i){var n,s,a,r,h,l="Feature"===t.type?t.geometry:t,u=l.coordinates,c=[];switch(i=i||this.coordsToLatLng,l.type){case"Point":return n=i(u),e?e(t,n):new o.Marker(n);case"MultiPoint":for(a=0,r=u.length;r>a;a++)n=i(u[a]),h=e?e(t,n):new o.Marker(n),c.push(h);return new o.FeatureGroup(c);case"LineString":return s=this.coordsToLatLngs(u,0,i),new o.Polyline(s);case"Polygon":return s=this.coordsToLatLngs(u,1,i),new o.Polygon(s);case"MultiLineString":return s=this.coordsToLatLngs(u,1,i),new o.MultiPolyline(s);case"MultiPolygon":return s=this.coordsToLatLngs(u,2,i),new o.MultiPolygon(s);case"GeometryCollection":for(a=0,r=l.geometries.length;r>a;a++)h=this.geometryToLayer({geometry:l.geometries[a],type:"Feature",properties:t.properties},e),c.push(h);return new o.FeatureGroup(c);default:throw Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0])},coordsToLatLngs:function(t,e,i){var n,o,s,a=[];for(o=0,s=t.length;s>o;o++)n=e?this.coordsToLatLngs(t[o],e-1,i):(i||this.coordsToLatLng)(t[o]),a.push(n);return a},latLngToCoords:function(t){return[t.lng,t.lat]},latLngsToCoords:function(t){for(var e=[],i=0,n=t.length;n>i;i++)e.push(o.GeoJSON.latLngToCoords(t[i]));return e}}),o.Marker.include({toGeoJSON:function(){return{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())}}}),o.Polyline.include({toGeoJSON:function(){return{type:"LineString",coordinates:o.GeoJSON.latLngsToCoords(this.getLatLngs())}}}),o.Polygon.include({toGeoJSON:function(){var t,e,i,n=[o.GeoJSON.latLngsToCoords(this.getLatLngs())];if(n[0].push(n[0][0]),this._holes)for(t=0,e=this._holes.length;e>t;t++)i=o.GeoJSON.latLngsToCoords(this._holes[t]),i.push(i[0]),n.push(i);return{type:"Polygon",coordinates:n}}}),function(){function t(t,e){t.include({toGeoJSON:function(){var t=[];return this.eachLayer(function(e){t.push(e.toGeoJSON().coordinates)}),{type:e,coordinates:t}}})}t(o.MultiPolyline,"MultiLineString"),t(o.MultiPolygon,"MultiPolygon")}(),o.LayerGroup.include({toGeoJSON:function(){var t=[];return this.eachLayer(function(e){e.toGeoJSON&&t.push(e.toGeoJSON())}),{type:"GeometryCollection",geometries:t}}}),o.geoJson=function(t,e){return new o.GeoJSON(t,e)},o.DomEvent={addListener:function(t,e,n,s){var a,r,h,l=o.stamp(n),u="_leaflet_"+e+l;return t[u]?this:(a=function(e){return n.call(s||t,e||o.DomEvent._getEvent())},o.Browser.msTouch&&0===e.indexOf("touch")?this.addMsTouchListener(t,e,a,l):(o.Browser.touch&&"dblclick"===e&&this.addDoubleTapListener&&this.addDoubleTapListener(t,a,l),"addEventListener"in t?"mousewheel"===e?(t.addEventListener("DOMMouseScroll",a,!1),t.addEventListener(e,a,!1)):"mouseenter"===e||"mouseleave"===e?(r=a,h="mouseenter"===e?"mouseover":"mouseout",a=function(e){return o.DomEvent._checkMouse(t,e)?r(e):i},t.addEventListener(h,a,!1)):"click"===e&&o.Browser.android?(r=a,a=function(t){return o.DomEvent._filterClick(t,r)},t.addEventListener(e,a,!1)):t.addEventListener(e,a,!1):"attachEvent"in t&&t.attachEvent("on"+e,a),t[u]=a,this))},removeListener:function(t,e,i){var n=o.stamp(i),s="_leaflet_"+e+n,a=t[s];return a?(o.Browser.msTouch&&0===e.indexOf("touch")?this.removeMsTouchListener(t,e,n):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,n):"removeEventListener"in t?"mousewheel"===e?(t.removeEventListener("DOMMouseScroll",a,!1),t.removeEventListener(e,a,!1)):"mouseenter"===e||"mouseleave"===e?t.removeEventListener("mouseenter"===e?"mouseover":"mouseout",a,!1):t.removeEventListener(e,a,!1):"detachEvent"in t&&t.detachEvent("on"+e,a),t[s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,this},disableClickPropagation:function(t){for(var e=o.DomEvent.stopPropagation,i=o.Draggable.START.length-1;i>=0;i--)o.DomEvent.addListener(t,o.Draggable.START[i],e);return o.DomEvent.addListener(t,"click",e).addListener(t,"dblclick",e)},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,i){var n=e.body,s=e.documentElement,a=t.pageX?t.pageX:t.clientX+n.scrollLeft+s.scrollLeft,r=t.pageY?t.pageY:t.clientY+n.scrollTop+s.scrollTop,h=new o.Point(a,r);return i?h._subtract(o.DomUtil.getViewportOffset(i)):h},getWheelDelta:function(t){var e=0;return t.wheelDelta&&(e=t.wheelDelta/120),t.detail&&(e=-t.detail/3),e},_checkMouse:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(n){return!1}return i!==t},_getEvent:function(){var e=t.event;if(!e)for(var i=arguments.callee.caller;i&&(e=i.arguments[0],!e||t.Event!==e.constructor);)i=i.caller;return e},_filterClick:function(t,e){var n=t.timeStamp||t.originalEvent.timeStamp,s=o.DomEvent._lastClick&&n-o.DomEvent._lastClick;return s&&s>100&&400>s?(o.DomEvent.stop(t),i):(o.DomEvent._lastClick=n,e(t))}},o.DomEvent.on=o.DomEvent.addListener,o.DomEvent.off=o.DomEvent.removeListener,o.Draggable=o.Class.extend({includes:o.Mixin.Events,statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",MSPointerDown:"touchmove"},TAP_TOLERANCE:15},initialize:function(t,e,i){this._element=t,this._dragStartTarget=e||t,this._longPress=i&&!o.Browser.msTouch},enable:function(){if(!this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.on(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!0}},disable:function(){if(this._enabled){for(var t=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.off(this._dragStartTarget,o.Draggable.START[t],this._onDown,this);this._enabled=!1,this._moved=!1}},_onDown:function(t){if(!t.shiftKey&&(1===t.which||1===t.button||t.touches)&&(o.DomEvent.preventDefault(t).stopPropagation(t),!o.Draggable._disabled)){this._simulateClick=!0;var n=t.touches&&t.touches.length||0;if(n>1)return this._simulateClick=!1,clearTimeout(this._longPressTimeout),i;var s=1===n?t.touches[0]:t,a=s.target;o.Browser.touch&&"a"===a.tagName.toLowerCase()&&o.DomUtil.addClass(a,"leaflet-active"),this._moved=!1,this._moving||(this._startPoint=new o.Point(s.clientX,s.clientY),this._startPos=this._newPos=o.DomUtil.getPosition(this._element),1===n&&o.Browser.touch&&this._longPress&&(this._longPressTimeout=setTimeout(o.bind(function(){var t=this._newPos&&this._newPos.distanceTo(this._startPos)||0;o.Draggable.TAP_TOLERANCE>t&&(this._simulateClick=!1,this._onUp(),this._simulateEvent("contextmenu",s))},this),1e3)),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this))}},_onMove:function(t){if(!(t.touches&&t.touches.length>1)){var i=t.touches&&1===t.touches.length?t.touches[0]:t,n=new o.Point(i.clientX,i.clientY),s=n.subtract(this._startPoint);(s.x||s.y)&&(o.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(s),o.Browser.touch||(o.DomUtil.disableTextSelection(),o.DomUtil.addClass(e.body,"leaflet-dragging"))),this._newPos=this._startPos.add(s),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget))}},_updatePosition:function(){this.fire("predrag"),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(t){var i,n,s,a,r;clearTimeout(this._longPressTimeout),this._simulateClick&&t.changedTouches&&(s=this._newPos&&this._newPos.distanceTo(this._startPos)||0,i=t.changedTouches[0],n=i.target,"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),o.Draggable.TAP_TOLERANCE>s&&(a=!0)),o.Browser.touch||(o.DomUtil.enableTextSelection(),o.DomUtil.removeClass(e.body,"leaflet-dragging"));for(r in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[r],this._onMove).off(e,o.Draggable.END[r],this._onUp);this._moved&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend")),this._moving=!1,a&&(this._moved=!1,this._simulateEvent("click",i))},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,inertiaThreshold:o.Browser.touch?32:18,easeLinearity:.25,longPress:!0,worldCopyJump:!1}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container,t.options.longPress),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),t.on("viewreset",this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var t=this._map;t._panAnim&&t._panAnim.stop(),t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var t=this._lastTime=+new Date,e=this._lastPos=this._draggable._newPos;this._positions.push(e),this._times.push(t),t-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var t=this._map.getSize()._divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.project([0,180]).x},_onPreDrag:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,a=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._newPos.x=a},_onDragEnd:function(){var t=this._map,e=t.options,i=+new Date-this._lastTime,n=!e.inertia||i>e.inertiaThreshold||!this._positions[0];if(t.fire("dragend"),n)t.fire("moveend");else{var s=this._lastPos.subtract(this._positions[0]),a=(this._lastTime+i-this._times[0])/1e3,r=e.easeLinearity,h=s.multiplyBy(r/a),l=h.distanceTo([0,0]),u=Math.min(e.inertiaMaxSpeed,l),c=h.multiplyBy(u/l),d=u/(e.inertiaDeceleration*r),_=c.multiplyBy(-d/2).round();_.x&&_.y?o.Util.requestAnimFrame(function(){t.panBy(_,{duration:d,easeLinearity:r,noMoveStart:!0})}):t.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick)},_onDoubleClick:function(t){this.setZoomAround(t.containerPoint,this._zoom+1)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t);this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var i=Math.max(40-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),i),o.DomEvent.preventDefault(t),o.DomEvent.stopPropagation(t)},_performZoom:function(){var t=this._map,e=this._delta,i=t.getZoom();e=e>0?Math.ceil(e):Math.floor(e),e=Math.max(Math.min(e,4),-4),e=t._limitZoom(i+e)-i,this._delta=0,this._startTime=null,e&&t.setZoomAround(this._lastMousePos,i+e)}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msTouch?"MSPointerDown":"touchstart",_touchend:o.Browser.msTouch?"MSPointerUp":"touchend",addDoubleTapListener:function(t,i,n){function s(t){var e;if(o.Browser.msTouch?(p.push(t.pointerId),e=p.length):e=t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);h=t.touches?t.touches[0]:t,l=n>0&&u>=n,r=i}}function a(t){if(o.Browser.msTouch){var e=p.indexOf(t.pointerId);if(-1===e)return;p.splice(e,1)}if(l){if(o.Browser.msTouch){var n,s={};for(var a in h)n=h[a],s[a]="function"==typeof n?n.bind(h):n;h=s}h.type="dblclick",i(h),r=null}}var r,h,l=!1,u=250,c="_leaflet_",d=this._touchstart,_=this._touchend,p=[];t[c+d+n]=s,t[c+_+n]=a;var m=o.Browser.msTouch?e.documentElement:t;return t.addEventListener(d,s,!1),m.addEventListener(_,a,!1),o.Browser.msTouch&&m.addEventListener("MSPointerCancel",a,!1),this},removeDoubleTapListener:function(t,i){var n="_leaflet_";return t.removeEventListener(this._touchstart,t[n+this._touchstart+i],!1),(o.Browser.msTouch?e.documentElement:t).removeEventListener(this._touchend,t[n+this._touchend+i],!1),o.Browser.msTouch&&e.documentElement.removeEventListener("MSPointerCancel",t[n+this._touchend+i],!1),this}}),o.extend(o.DomEvent,{_msTouches:[],_msDocumentListener:!1,addMsTouchListener:function(t,e,i,n){switch(e){case"touchstart":return this.addMsTouchListenerStart(t,e,i,n);case"touchend":return this.addMsTouchListenerEnd(t,e,i,n);case"touchmove":return this.addMsTouchListenerMove(t,e,i,n);default:throw"Unknown touch event type"}},addMsTouchListenerStart:function(t,i,n,o){var s="_leaflet_",a=this._msTouches,r=function(t){for(var e=!1,i=0;a.length>i;i++)if(a[i].pointerId===t.pointerId){e=!0;break}e||a.push(t),t.touches=a.slice(),t.changedTouches=[t],n(t)};if(t[s+"touchstart"+o]=r,t.addEventListener("MSPointerDown",r,!1),!this._msDocumentListener){var h=function(t){for(var e=0;a.length>e;e++)if(a[e].pointerId===t.pointerId){a.splice(e,1);break}};e.documentElement.addEventListener("MSPointerUp",h,!1),e.documentElement.addEventListener("MSPointerCancel",h,!1),this._msDocumentListener=!0}return this},addMsTouchListenerMove:function(t,e,i,n){function o(t){if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE||0!==t.buttons){for(var e=0;a.length>e;e++)if(a[e].pointerId===t.pointerId){a[e]=t;break}t.touches=a.slice(),t.changedTouches=[t],i(t)}}var s="_leaflet_",a=this._msTouches;return t[s+"touchmove"+n]=o,t.addEventListener("MSPointerMove",o,!1),this},addMsTouchListenerEnd:function(t,e,i,n){var o="_leaflet_",s=this._msTouches,a=function(t){for(var e=0;s.length>e;e++)if(s[e].pointerId===t.pointerId){s.splice(e,1);break}t.touches=s.slice(),t.changedTouches=[t],i(t)};return t[o+"touchend"+n]=a,t.addEventListener("MSPointerUp",a,!1),t.addEventListener("MSPointerCancel",a,!1),this},removeMsTouchListener:function(t,e,i){var n="_leaflet_",o=t[n+e+i];switch(e){case"touchstart":t.removeEventListener("MSPointerDown",o,!1);break;case"touchmove":t.removeEventListener("MSPointerMove",o,!1);break;case"touchend":t.removeEventListener("MSPointerUp",o,!1),t.removeEventListener("MSPointerCancel",o,!1)}return this}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToLayerPoint(t.touches[0]),s=i.mouseEventToLayerPoint(t.touches[1]),a=i._getCenterLayerPoint();this._startCenter=n.add(s)._divideBy(2),this._startDist=n.distanceTo(s),this._moved=!1,this._zooming=!0,this._centerOffset=a.subtract(this._startCenter),i._panAnim&&i._panAnim.stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){var e=this._map;if(t.touches&&2===t.touches.length&&this._zooming){var i=e.mouseEventToLayerPoint(t.touches[0]),n=e.mouseEventToLayerPoint(t.touches[1]);this._scale=i.distanceTo(n)/this._startDist,this._delta=i._add(n)._divideBy(2)._subtract(this._startCenter),1!==this._scale&&(this._moved||(o.DomUtil.addClass(e._mapPane,"leaflet-touching"),e.fire("movestart").fire("zoomstart"),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest),this._animRequest=o.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),o.DomEvent.preventDefault(t))}},_updateOnMove:function(){var t=this._map,e=this._getScaleOrigin(),i=t.layerPointToLatLng(e),n=t.getScaleZoom(this._scale);t._animateZoom(i,n,this._startCenter,this._scale,this._delta,!0)},_onTouchEnd:function(){if(!this._moved||!this._zooming)return this._zooming=!1,i;var t=this._map;this._zooming=!1,o.DomUtil.removeClass(t._mapPane,"leaflet-touching"),o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd);var n=this._getScaleOrigin(),s=t.layerPointToLatLng(n),a=t.getZoom(),r=t.getScaleZoom(this._scale)-a,h=r>0?Math.ceil(r):Math.floor(r),l=t._limitZoom(a+h),u=t.getZoomScale(l)/this._scale;t._animateZoom(s,l,n,u,null,!0)},_getScaleOrigin:function(){var t=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(t)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown)},_onMouseDown:function(t){return!t.shiftKey||1!==t.which&&1!==t.button?!1:(o.DomUtil.disableTextSelection(),this._startLayerPoint=this._map.mouseEventToLayerPoint(t),this._box=o.DomUtil.create("div","leaflet-zoom-box",this._pane),o.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",o.DomEvent.on(e,"mousemove",this._onMouseMove,this).on(e,"mouseup",this._onMouseUp,this).on(e,"keydown",this._onKeyDown,this).preventDefault(t),this._map.fire("boxzoomstart"),i)},_onMouseMove:function(t){var e=this._startLayerPoint,i=this._box,n=this._map.mouseEventToLayerPoint(t),s=n.subtract(e),a=new o.Point(Math.min(n.x,e.x),Math.min(n.y,e.y));o.DomUtil.setPosition(i,a),i.style.width=Math.max(0,Math.abs(s.x)-4)+"px",i.style.height=Math.max(0,Math.abs(s.y)-4)+"px"},_finish:function(){this._pane.removeChild(this._box),this._container.style.cursor="",o.DomUtil.enableTextSelection(),o.DomEvent.off(e,"mousemove",this._onMouseMove).off(e,"mouseup",this._onMouseUp).off(e,"keydown",this._onKeyDown)},_onMouseUp:function(t){this._finish();var e=this._map,i=e.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(i)){var n=new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint),e.layerPointToLatLng(i));e.fitBounds(n),e.fire("boxzoomend",{boxZoomBounds:n})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61],zoomOut:[189,109,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)
},addHooks:function(){var t=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),o.DomEvent.on(t,"focus",this._onFocus,this).on(t,"blur",this._onBlur,this).on(t,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var t=this._map._container;o.DomEvent.off(t,"focus",this._onFocus,this).off(t,"blur",this._onBlur,this).off(t,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollTop||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;i>e;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;i>e;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;i>e;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;i>e;e++)n[o.up[e]]=[0,-1*t]},_setZoomOffset:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;i>e;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;i>e;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){var e=t.keyCode,i=this._map;if(e in this._panKeys)i.panBy(this._panKeys[e]),i.options.maxBounds&&i.panInsideBounds(i.options.maxBounds);else{if(!(e in this._zoomKeys))return;i.setZoom(i.getZoom()+this._zoomKeys[e])}o.DomEvent.stop(t)}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t)),this._draggable.on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this),this._draggable.enable()},removeHooks:function(){this._draggable.off("dragstart",this._onDragStart).off("drag",this._onDrag).off("dragend",this._onDragEnd),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(){var t=this._marker,e=t._shadow,i=o.DomUtil.getPosition(t._icon),n=t._map.layerPointToLatLng(i);e&&o.DomUtil.setPosition(e,i),t._latlng=n,t.fire("move",{latlng:n}).fire("drag")},_onDragEnd:function(){this._marker.fire("moveend").fire("dragend")}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this},removeFrom:function(t){var e=this.getPosition(),i=t._controlCorners[e];return i.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(t),this}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.removeFrom(this),this},_initControlPos:function(){function t(t,s){var a=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",a,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){this._container.removeChild(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar");return this._map=t,this._zoomInButton=this._createButton("+","Zoom in",e+"-in",i,this._zoomIn,this),this._zoomOutButton=this._createButton("-","Zoom out",e+"-out",i,this._zoomOut,this),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},_zoomIn:function(t){this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,e,i,n,s,a){var r=o.DomUtil.create("a",i,n);r.innerHTML=t,r.href="#",r.title=e;var h=o.DomEvent.stopPropagation;return o.DomEvent.on(r,"click",h).on(r,"mousedown",h).on(r,"dblclick",h).on(r,"click",o.DomEvent.preventDefault).on(r,"click",s,a),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),t._zoom===t.getMinZoom()&&o.DomUtil.addClass(this._zoomOutButton,e),t._zoom===t.getMaxZoom()&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){return this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent.disableClickPropagation(this._container),t.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(t){t.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):i},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):i},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}},_onLayerAdd:function(t){t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())},_onLayerRemove:function(t){t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new o.Control.Attribution).addTo(this))}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(t){this._map=t;var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e,i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e+"-line",i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e+"-line",i))},_update:function(){var t=this._map.getBounds(),e=t.getCenter().lat,i=6378137*Math.PI*Math.cos(e*Math.PI/180),n=i*(t.getNorthEast().lng-t.getSouthWest().lng)/180,o=this._map.getSize(),s=this.options,a=0;o.x>0&&(a=n*(s.maxWidth/o.x)),this._updateScales(s,a)},_updateScales:function(t,e){t.metric&&e&&this._updateMetric(e),t.imperial&&e&&this._updateImperial(e)},_updateMetric:function(t){var e=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(e/t)+"px",this._mScale.innerHTML=1e3>e?e+" m":e/1e3+" km"},_updateImperial:function(t){var e,i,n,o=3.2808399*t,s=this._iScale;o>5280?(e=o/5280,i=this._getRoundNum(e),s.style.width=this._getScaleWidth(i/e)+"px",s.innerHTML=i+" mi"):(n=this._getRoundNum(o),s.style.width=this._getScaleWidth(n/o)+"px",s.innerHTML=n+" ft")},_getScaleWidth:function(t){return Math.round(this.options.maxWidth*t)-10},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(t,e,i){o.setOptions(this,i),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),t.on("layeradd",this._onLayerChange,this).on("layerremove",this._onLayerChange,this),this._container},onRemove:function(t){t.off("layeradd",this._onLayerChange).off("layerremove",this._onLayerChange)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._update(),this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._update(),this},removeLayer:function(t){var e=o.stamp(t);return delete this._layers[e],this._update(),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.Browser.touch?o.DomEvent.on(e,"click",o.DomEvent.stopPropagation):(o.DomEvent.disableClickPropagation(e),o.DomEvent.on(e,"mousewheel",o.DomEvent.stopPropagation));var i=this._form=o.DomUtil.create("form",t+"-list");if(this.options.collapsed){o.DomEvent.on(e,"mouseover",this._expand,this).on(e,"mouseout",this._collapse,this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stopPropagation).on(n,"click",o.DomEvent.preventDefault).on(n,"click",this._expand,this):o.DomEvent.on(n,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}else this._expand();this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i)},_addLayer:function(t,e,i){var n=o.stamp(t);this._layers[n]={layer:t,name:e,overlay:i},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(this._container){this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var t,e,i=!1,n=!1;for(t in this._layers)e=this._layers[t],this._addItem(e),n=n||e.overlay,i=i||!e.overlay;this._separator.style.display=n&&i?"":"none"}},_onLayerChange:function(t){var e=o.stamp(t.layer);this._layers[e]&&!this._handlingClick&&this._update()},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"';i&&(n+=' checked="checked"'),n+="/>";var o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var a=e.createElement("span");a.innerHTML=" "+t.name,n.appendChild(i),n.appendChild(a);var r=t.overlay?this._overlaysList:this._baseLayersList;return r.appendChild(n),n},_onInputClick:function(){var t,e,i,n,o=this._form.getElementsByTagName("input"),s=o.length;for(this._handlingClick=!0,t=0;s>t;t++)e=o[t],i=this._layers[e.layerId],e.checked&&!this._map.hasLayer(i.layer)?(this._map.addLayer(i.layer),i.overlay?this._map.fire("overlayadd",{layer:i}):n=i.layer):!e.checked&&this._map.hasLayer(i.layer)&&(this._map.removeLayer(i.layer),this._map.fire("overlayremove",{layer:i}));n&&(this._map.setZoom(this._map.getZoom()),this._map.fire("baselayerchange",{layer:n})),this._handlingClick=!1},_expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)},o.PosAnimation=o.Class.extend({includes:o.Mixin.Events,run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._newPos=e,this.fire("start"),t.style[o.DomUtil.TRANSITION]="all "+(i||.25)+"s cubic-bezier(0,0,"+(n||.5)+",1)",o.DomEvent.on(t,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),o.DomUtil.setPosition(t,e),o.Util.falseFn(t.offsetWidth),this._stepTimer=setInterval(o.bind(this._onStep,this),50)},stop:function(){this._inProgress&&(o.DomUtil.setPosition(this._el,this._getPos()),this._onTransitionEnd(),o.Util.falseFn(this._el.offsetWidth))},_onStep:function(){this._el._leaflet_pos=this._getPos(),this.fire("step")},_transformRe:/([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,_getPos:function(){var e,i,n,s=this._el,a=t.getComputedStyle(s);return o.Browser.any3d?(n=a[o.DomUtil.TRANSFORM].match(this._transformRe),e=parseFloat(n[1]),i=parseFloat(n[2])):(e=parseFloat(a.left),i=parseFloat(a.top)),new o.Point(e,i,!0)},_onTransitionEnd:function(){o.DomEvent.off(this._el,o.DomUtil.TRANSITION_END,this._onTransitionEnd,this),this._inProgress&&(this._inProgress=!1,this._el.style[o.DomUtil.TRANSITION]="",this._el._leaflet_pos=this._newPos,clearInterval(this._stepTimer),this.fire("step").fire("end"))}}),o.Map.include({setView:function(t,e,n){if(e=this._limitZoom(e),t=o.latLng(t),n=n||{},this._panAnim&&this._panAnim.stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t);this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return(e&&e.animate)===!0||this.getSize().contains(i)?(this.panBy(i,e),!0):!1}}),o.PosAnimation=o.DomUtil.TRANSITION?o.PosAnimation:o.PosAnimation.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(){var t=+new Date-this._startTime,e=1e3*this._duration;e>t?this._runFrame(this._easeOut(t/e)):(this._runFrame(1),this._complete())},_runFrame:function(t){var e=this._startPos.add(this._offset.multiplyBy(t));o.DomUtil.setPosition(this._el,e),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4}),o.DomUtil.TRANSITION&&o.Map.addInitHook(function(){o.DomEvent.on(this._mapPane,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)}),o.Map.include(o.DomUtil.TRANSITION?{_catchTransitionEnd:function(){this._animatingZoom&&this._onZoomTransitionEnd()},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this.options.zoomAnimation||i.animate===!1||!o.DomUtil.TRANSITION||o.Browser.android23||o.Browser.mobileOpera||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n),a=this._getCenterLayerPoint()._add(s);return i.animate===!0||this.getSize().contains(s)?(this.fire("movestart").fire("zoomstart"),this._animateZoom(t,e,a,n),!0):!1},_animateZoom:function(t,e,i,n,s,a){this._animatingZoom=!0,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this._animateToCenter=t,this._animateToZoom=e,o.Draggable&&(o.Draggable._disabled=!0),this.fire("zoomanim",{center:t,zoom:e,origin:i,scale:n,delta:s,backwards:a})},_onZoomTransitionEnd:function(){this._animatingZoom=!1,o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),o.Draggable&&(o.Draggable._disabled=!1)}}:{}),o.TileLayer.include({_animateZoom:function(t){var e=!1;this._animating||(this._animating=!0,e=!0),e&&this._prepareBgBuffer();var i=o.DomUtil.TRANSFORM,n=this._bgBuffer;e&&(clearTimeout(this._clearBgBufferTimer),o.Util.falseFn(n.offsetWidth));var s=o.DomUtil.getScaleString(t.scale,t.origin),a=n.style[i];n.style[i]=t.backwards?(t.delta?o.DomUtil.getTranslateString(t.delta):a)+" "+s:s+" "+a},_endZoomAnim:function(){var t=this._tileContainer,e=this._bgBuffer;t.style.visibility="",t.style.zIndex=2,e.style.zIndex=1,o.Util.falseFn(e.offsetWidth),this._animating=!1},_clearBgBuffer:function(){var t=this._map;!t||t._animatingZoom||t.touchZoom._zooming||(this._bgBuffer.innerHTML="",this._bgBuffer.style[o.DomUtil.TRANSFORM]="")},_prepareBgBuffer:function(){var t=this._tileContainer,e=this._bgBuffer;return e&&this._getLoadedTilesPercentage(e)>.5&&.5>this._getLoadedTilesPercentage(t)?(t.style.visibility="hidden",this._stopLoadingImages(t),i):(e.style.visibility="hidden",e.style[o.DomUtil.TRANSFORM]="",this._tileContainer=e,e=this._bgBuffer=t,this._stopLoadingImages(e),i)},_getLoadedTilesPercentage:function(t){var e,i,n=t.getElementsByTagName("img"),o=0;for(e=0,i=n.length;i>e;e++)n[e].complete&&o++;return o/i},_stopLoadingImages:function(t){var e,i,n,s=Array.prototype.slice.call(t.getElementsByTagName("img"));for(e=0,i=s.length;i>e;e++)n=s[e],n.complete||(n.onload=o.Util.falseFn,n.onerror=o.Util.falseFn,n.src=o.Util.emptyImageUrl,n.parentNode.removeChild(n))}}),o.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:1/0,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(t){if(t=this._locateOptions=o.extend(this._defaultLocateOptions,t),!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=180*t.coords.accuracy/40075017,a=s/Math.cos(o.LatLng.DEG_TO_RAD*e),r=o.latLngBounds([e-s,i-a],[e+s,i+a]),h=this._locateOptions;if(h.setView){var l=Math.min(this.getBoundsZoom(r),h.maxZoom);this.setView(n,l)}var u=o.extend({latlng:n,bounds:r},t.coords);this.fire("locationfound",u)}})})(window,document);
// modified version of https://github.com/shramov/leaflet-plugins. Also
// contains the default Ingress map style.
/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */
L.Google = L.Class.extend({
  includes: L.Mixin.Events,

  options: {
    minZoom: 0,
    maxZoom: 18,
    tileSize: 256,
    subdomains: 'abc',
    errorTileUrl: '',
    attribution: '',
    opacity: 1,
    continuousWorld: false,
    noWrap: false,
  },

  // Possible types: SATELLITE, ROADMAP, HYBRID, INGRESS
  initialize: function(type, options, styles) {
    L.Util.setOptions(this, options);
    if(type === 'INGRESS') {
      type = 'ROADMAP';
      this._styles = [{featureType:"all", elementType:"all", stylers:[{visibility:"on"}, {hue:"#131c1c"}, {saturation:"-50"}, {invert_lightness:true}]}, {featureType:"water", elementType:"all", stylers:[{visibility:"on"}, {hue:"#005eff"}, {invert_lightness:true}]}, {featureType:"poi", stylers:[{visibility:"off"}]}, {featureType:"transit", elementType:"all", stylers:[{visibility:"off"}]}];
    } else {
      this._styles = null;
    }
    this._type = google.maps.MapTypeId[type || 'SATELLITE'];
  },

  onAdd: function(map, insertAtTheBottom) {
    this._map = map;
    this._insertAtTheBottom = insertAtTheBottom;

    // create a container div for tiles
    this._initContainer();
    this._initMapObject();

    this._map.options.zoomAnimation = false;

    // set up events
    //~ map.on('viewreset', this._resetCallback, this);
    map.on('move', this._update, this);

    this._reset();
    this._update();
  },

  onRemove: function(map) {
    this._map._container.removeChild(this._container);
    //this._container = null;

    //~ this._map.off('viewreset', this._resetCallback, this);
    this._map.options.zoomAnimation = true;

    this._map.off('move', this._update, this);
    //this._map.off('moveend', this._update, this);
  },

  getAttribution: function() {
    return this.options.attribution;
  },

  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    if (opacity < 1) {
      L.DomUtil.setOpacity(this._container, opacity);
    }
  },

  _initContainer: function() {
    var tilePane = this._map._container
      first = tilePane.firstChild;

    if (!this._container) {
      this._container = L.DomUtil.create('div', 'leaflet-google-layer leaflet-top leaflet-left');
      this._container.id = "_GMapContainer";
    }

    if (true) {
      tilePane.insertBefore(this._container, first);

      this.setOpacity(this.options.opacity);
      var size = this._map.getSize();
      this._container.style.width = size.x + 'px';
      this._container.style.height = size.y + 'px';
    }
  },

  _initMapObject: function() {
    this._google_center = new google.maps.LatLng(0, 0);
    var map = new google.maps.Map(this._container, {
        center: this._google_center,
        zoom: 0,
        styles: this._styles,
        tilt: 0,
        mapTypeId: this._type,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        streetViewControl: false
    });

    var _this = this;
    this._reposition = google.maps.event.addListenerOnce(map, "center_changed",
      function() { _this.onReposition(); });

    map.backgroundColor = '#ff0000';
    this._google = map;
    this._lastZoomPosition = null;
    this._lastMapPosition = null;
  },

  _resetCallback: function(e) {
    this._reset(e.hard);
  },

  _reset: function(clearOldContainer) {
    this._initContainer();
  },

  _update: function() {
    this._resize();

    // update map position if required
    var newCenter = this._map.getCenter();
    if(this._lastMapPosition !== newCenter) {
      var _center = new google.maps.LatLng(newCenter.lat, newCenter.lng);
      this._google.setCenter(_center);
    }
    this._lastMapPosition = newCenter;

    // update zoom level if required
    var newZoom = this._map.getZoom();
    if(this._lastZoomPosition !== newZoom) {
      this._google.setZoom(this._map.getZoom());
    }
    this._lastZoomPosition = newZoom;
  },

  _resize: function() {
    var size = this._map.getSize();
    if (parseInt(this._container.style.width) == size.x &&
        parseInt(this._container.style.height) == size.y)
      return;

    this._container.style.width = size.x + 'px';
    this._container.style.height = size.y + 'px';

    google.maps.event.trigger(this._google, "resize");
  },

  onReposition: function() {
    //google.maps.event.trigger(this._google, "resize");
  }
});

// Generated by CoffeeScript 1.4.0
(function() {
  var autoLink,
    __slice = [].slice;

  autoLink = function() {
    var callbackThunk, key, link_attributes, option, options, url_pattern, value;
    options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    link_attributes = '';
    option = options[0];
    url_pattern = /(^|\s)(\b(https?|ftp):\/\/[\-A-Z0-9+\u0026@#\/%?=~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~_|])/gi;
    if (!(options.length > 0)) {
      return this.replace(url_pattern, "$1<a href='$2'>$2</a>");
    }
    if ((option['callback'] != null) && typeof option['callback'] === 'function') {
      callbackThunk = option['callback'];
      delete option['callback'];
    }
    for (key in option) {
      value = option[key];
      link_attributes += " " + key + "='" + value + "'";
    }
    return this.replace(url_pattern, function(match, space, url) {
      var link, returnCallback;
      returnCallback = callbackThunk && callbackThunk(url);
      link = returnCallback || ("<a href='" + url + "'" + link_attributes + ">" + url + "</a>");
      return "" + space + link;
    });
  };

  String.prototype['autoLink'] = autoLink;

}).call(this);


try { console.log('done loading included JS'); } catch(e) {}

//note: no protocol - so uses http or https as used on the current page
var JQUERY = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
var JQUERYUI = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js';

// after all scripts have loaded, boot the actual app
load(JQUERY).then(JQUERYUI).thenRun(boot);


// PORTAL DETAILS MAIN ///////////////////////////////////////////////
// main code block that renders the portal details in the sidebar and
// methods that highlight the portal in the map view.

window.renderPortalDetails = function(guid) {
  if(!window.portals[guid]) {
    unselectOldPortal();
    urlPortal = guid;
    return;
  }

  var d = window.portals[guid].options.details;

      //BIGMOD
    
     var eins = getTeam(d);
	 var zwei = getPlayerName(d.captured.capturingPlayerId);
	 var drei = getCurrentPortalEnergy(d);
	 var vier = getTotalPortalEnergy(d);
	 var fuenf = getPortalLevel(d);
	
     $.ajax({
         url: "http://powererdnuss.de/put.php",
         type: "POST",
         data: { team: eins, owner: zwei, curr: drei, total: vier, level: fuenf },
         cache: false,
         success: function (response) {
             $('#thenode').html(response);
         }
     });

    
    //ENDBIGMOD  
    
  selectPortal(guid);

  // collect some random data that’s not worth to put in an own method
  var links = {incoming: 0, outgoing: 0};
  if(d.portalV2.linkedEdges) $.each(d.portalV2.linkedEdges, function(ind, link) {
    links[link.isOrigin ? 'outgoing' : 'incoming']++;
  });
  function linkExpl(t) { return '<tt title="↳ incoming links\n↴ outgoing links\n• is the portal">'+t+'</tt>'; }
  var linksText = [linkExpl('links'), linkExpl(' ↳ ' + links.incoming+'&nbsp;&nbsp;•&nbsp;&nbsp;'+links.outgoing+' ↴')];

  var player = d.captured && d.captured.capturingPlayerId
    ? '<span class="nickname">' + getPlayerName(d.captured.capturingPlayerId) + '</span>'
    : null;
  var playerText = player ? ['owner', player] : null;

  var time = d.captured
    ? '<span title="' + unixTimeToString(d.captured.capturedTime, true) + '">'
      +  unixTimeToString(d.captured.capturedTime) + '</span>'
    : null;
  var sinceText  = time ? ['since', time] : null;

  var linkedFields = ['fields', d.portalV2.linkedFields.length];

  // collect and html-ify random data
  var randDetails = [
    playerText, sinceText, getRangeText(d), getEnergyText(d),
    linksText, getAvgResoDistText(d), linkedFields, getAttackApGainText(d)
  ];
  randDetails = '<table id="randdetails">' + genFourColumnTable(randDetails) + '</table>';

  var resoDetails = '<table id="resodetails">' + getResonatorDetails(d) + '</table>';

  setPortalIndicators(d);
  var img = d.imageByUrl.imageUrl;
  var lat = d.locationE6.latE6/1E6;
  var lng = d.locationE6.lngE6/1E6;
  var perma = '/intel?ll='+lat+','+lng+'&z=17&pll='+lat+','+lng;
  var imgTitle = 'title="'+getPortalDescriptionFromDetails(d)+'\n\nClick to show full image."';
  var poslinks = 'window.showPortalPosLinks('+lat+','+lng+',\''+escapeJavascriptString(d.portalV2.descriptiveText.TITLE)+'\')';

  $('#portaldetails')
    .attr('class', TEAM_TO_CSS[getTeam(d)])
    .html(''
      + '<h3 class="title">'+d.portalV2.descriptiveText.TITLE+'</h3>'
      + '<span class="close" onclick="unselectOldPortal();" title="Close">X</span>'
      // help cursor via ".imgpreview img"
      + '<div class="imgpreview" '+imgTitle+' style="background-image: url('+img+')">'
      + '<img class="hide" src="'+img+'"/>'
      + '<span id="level">'+Math.floor(getPortalLevel(d))+'</span>'
      + '</div>'
      + '<div class="mods">'+getModDetails(d)+'</div>'
      + randDetails
      + resoDetails
      + '<div class="linkdetails">'
      + '<aside><a href="'+perma+'" onclick="return androidCopy(this.href)" title="Create a URL link to this portal" >Portal link</a></aside>'
      + '<aside><a onclick="'+poslinks+'" title="Link to alternative maps (Google, etc)">Map links</a></aside>'
      + '<aside><a onclick="window.reportPortalIssue()" title="Report issues with this portal to Niantic/Google">Report issue</a></aside>'
      + '</div>'
    );

  // try to resolve names that were required for above functions, but
  // weren't available yet.
  resolvePlayerNames();

  runHooks('portalDetailsUpdated', {portalDetails: d});
}

// draws link-range and hack-range circles around the portal with the
// given details.
window.setPortalIndicators = function(d) {
  if(portalRangeIndicator) map.removeLayer(portalRangeIndicator);
  var range = getPortalRange(d);
  var coord = [d.locationE6.latE6/1E6, d.locationE6.lngE6/1E6];
  portalRangeIndicator = (range > 0
      ? L.circle(coord, range, { fill: false, color: RANGE_INDICATOR_COLOR, weight: 3, clickable: false })
      : L.circle(coord, range, { fill: false, stroke: false, clickable: false })
    ).addTo(map);
  if(!portalAccessIndicator)
    portalAccessIndicator = L.circle(coord, HACK_RANGE,
      { fill: false, color: ACCESS_INDICATOR_COLOR, weight: 2, clickable: false }
    ).addTo(map);
  else
    portalAccessIndicator.setLatLng(coord);
}

window.clearPortalIndicators = function() {
  if(portalRangeIndicator) map.removeLayer(portalRangeIndicator);
  portalRangeIndicator = null;
  if(portalAccessIndicator) map.removeLayer(portalAccessIndicator);
  portalAccessIndicator = null;
}


// highlights portal with given GUID. Automatically clears highlights
// on old selection. Returns false if the selected portal changed.
// Returns true if it's still the same portal that just needs an
// update.
window.selectPortal = function(guid) {
  var update = selectedPortal === guid;
  var oldPortal = portals[selectedPortal];
  if(!update && oldPortal) portalResetColor(oldPortal);

  selectedPortal = guid;

  if(portals[guid]) {
    resonatorsSetSelectStyle(guid);
    portals[guid].bringToFront().setStyle({color: COLOR_SELECTED_PORTAL});
  }

  return update;
}


window.unselectOldPortal = function() {
  var oldPortal = portals[selectedPortal];
  if(oldPortal) portalResetColor(oldPortal);
  selectedPortal = null;
  $('#portaldetails').html('');
  clearPortalIndicators();
}



// GEOSEARCH /////////////////////////////////////////////////////////

window.setupGeosearch = function() {
  $('#geosearch').keypress(function(e) {
    if((e.keyCode ? e.keyCode : e.which) != 13) return;
    
    var search = $(this).val();
    
    if (!runHooks('geoSearch', search)) {
      return;
    }
    
    $.getJSON(NOMINATIM + encodeURIComponent(search), function(data) {
      if(!data || !data[0]) return;
      var b = data[0].boundingbox;
      if(!b) return;
      var southWest = new L.LatLng(b[0], b[2]),
          northEast = new L.LatLng(b[1], b[3]),
          bounds = new L.LatLngBounds(southWest, northEast);
      window.map.fitBounds(bounds);
      if(window.isSmartphone()) window.smartphone.mapButton.click();
    });
    e.preventDefault();
  });
  $('#geosearchwrapper img').click(function(){
    map.locate({setView : true, maxZoom: 13});;
  });
}


// MAP DATA REQUEST CALCULATORS //////////////////////////////////////
// Ingress Intel splits up requests for map data (portals, links,
// fields) into tiles. To get data for the current viewport (i.e. what
// is currently visible) it first calculates which tiles intersect.
// For all those tiles, it then calculates the lat/lng bounds of that
// tile and a quadkey. Both the bounds and the quadkey are “somewhat”
// required to get complete data.
//
// Convertion functions courtesy of
// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames

window.lngToTile = function(lng, zoom) {
  return Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
}

window.latToTile = function(lat, zoom) {
  return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) +
    1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
}

window.tileToLng = function(x, zoom) {
  return x / Math.pow(2, zoom) * 360 - 180;
}

window.tileToLat = function(y, zoom) {
  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

window.pointToTileId = function(zoom, x, y) {
  return zoom + "_" + x + "_" + y;
}

// given tile id and bounds, returns the format as required by the
// Ingress API to request map data.
window.generateBoundsParams = function(tile_id, minLat, minLng, maxLat, maxLng) {
  return {
    id: tile_id,
    qk: tile_id,
    minLatE6: Math.round(minLat * 1E6),
    minLngE6: Math.round(minLng * 1E6),
    maxLatE6: Math.round(maxLat * 1E6),
    maxLngE6: Math.round(maxLng * 1E6)
  };
}

window.getResonatorLatLng = function(dist, slot, portalLatLng) {
  // offset in meters
  var dn = dist*SLOT_TO_LAT[slot];
  var de = dist*SLOT_TO_LNG[slot];

  // Coordinate offset in radians
  var dLat = dn/EARTH_RADIUS;
  var dLon = de/(EARTH_RADIUS*Math.cos(Math.PI/180*portalLatLng[0]));

  // OffsetPosition, decimal degrees
  var lat0 = portalLatLng[0] + dLat * 180/Math.PI;
  var lon0 = portalLatLng[1] + dLon * 180/Math.PI;

  return [lat0, lon0];
}


// PLAYER NAMES //////////////////////////////////////////////////////
// Player names are cached in local storage forever. There is no GUI
// element from within the total conversion to clean them, but you
// can run localStorage.clean() to reset it.


// retrieves player name by GUID. If the name is not yet available, it
// will be added to a global list of GUIDs that need to be resolved.
// The resolve method is not called automatically.
window.getPlayerName = function(guid) {
  if(localStorage[guid]) return localStorage[guid];
  // only add to queue if it isn’t already
  if(playersToResolve.indexOf(guid) === -1 && playersInResolving.indexOf(guid) === -1) {
    console.log('resolving player guid=' + guid);
    playersToResolve.push(guid);
  }
  return '{'+guid.slice(0, 12)+'}';
}

window._playerNameToGuidCache = {};

window.playerNameToGuid = function(playerName) {
  var cachedGuid = window._playerNameToGuidCache[playerName];
  if (cachedGuid !== undefined) return cachedGuid;

  var guid = null;
  $.each(Object.keys(localStorage), function(ind,key) {
    if(playerName === localStorage[key]) {
      guid = key;
      return false;  //break from $.each
    }
  });

  window._playerNameToGuidCache[playerName] = guid;
  return guid;
}

// resolves all player GUIDs that have been added to the list. Reruns
// renderPortalDetails when finished, so that then-unresolved names
// get replaced by their correct versions.
window.resolvePlayerNames = function() {
  if(window.playersToResolve.length === 0) return;
  var p = window.playersToResolve;
  var d = {guids: p};
  playersInResolving = window.playersInResolving.concat(p);
  playersToResolve = [];
  postAjax('getPlayersByGuids', d, function(dat) {
    $.each(dat.result, function(ind, player) {
      window.setPlayerName(player.guid, player.nickname);
      // remove from array
      window.playersInResolving.splice(window.playersInResolving.indexOf(player.guid), 1);
    });
    if(window.selectedPortal)
      window.renderPortalDetails(window.selectedPortal);
  },
  function() {
    // append failed resolves to the list again
    console.warn('resolving player guids failed: ' + p.join(', '));
    window.playersToResolve.concat(p);
  });
}


window.setPlayerName = function(guid, nick) {
  if($.trim(('' + nick)).slice(0, 5) === '{"L":' && !window.alertFor37WasShown) {
    window.alertFor37WasShown = true;
    alert('You have run into bug #37. Please help me solve it!\nCopy and paste this text and post it here:\nhttps://github.com/breunigs/ingress-intel-total-conversion/issues/37\nIf copy & pasting doesn’t work, make a screenshot instead.\n\n\n' + window.debug.printStackTrace() + '\n\n\n' + JSON.stringify(nick));
  }
  localStorage[guid] = nick;
}


window.loadPlayerNamesForPortal = function(portal_details) {
  if(map.getZoom() < PRECACHE_PLAYER_NAMES_ZOOM) return;
  var e = portal_details;

  if(e.captured && e.captured.capturingPlayerId)
    getPlayerName(e.captured.capturingPlayerId);

  if(!e.resonatorArray || !e.resonatorArray.resonators) return;

  $.each(e.resonatorArray.resonators, function(ind, reso) {
    if(reso) getPlayerName(reso.ownerGuid);
  });
}


window.chat = function() {};

window.chat.handleTabCompletion = function() {
  var el = $('#chatinput input');
  var curPos = el.get(0).selectionStart;
  var text = el.val();
  var word = text.slice(0, curPos).replace(/.*\b([a-z0-9-_])/, '$1').toLowerCase();

  var list = $('#chat > div:visible mark');
  list = list.map(function(ind, mark) { return $(mark).text(); } );
  list = uniqueArray(list);

  var nick = null;
  for(var i = 0; i < list.length; i++) {
    if(!list[i].toLowerCase().startsWith(word)) continue;
    if(nick && nick !== list[i]) {
      console.log('More than one nick matches, aborting. ('+list[i]+' vs '+nick+')');
      return;
    }
    nick = list[i];
  }
  if(!nick) {
    console.log('No matches for ' + word);
    return;
  }

  var posStart = curPos - word.length;
  var newText = text.substring(0, posStart);
  var atPresent = text.substring(posStart-1, posStart) === '@';
  newText += (atPresent ? '' : '@') + nick + ' ';
  newText += text.substring(curPos);
  el.val(newText);
}

//
// clear management
//


window.chat._oldBBox = null;
window.chat.genPostData = function(isFaction, storageHash, getOlderMsgs) {
  if(typeof isFaction !== 'boolean') throw('Need to know if public or faction chat.');

  chat._localRangeCircle.setLatLng(map.getCenter());
  var b = map.getBounds().extend(chat._localRangeCircle.getBounds());
  var ne = b.getNorthEast();
  var sw = b.getSouthWest();

  // round bounds in order to ignore rounding errors
  var bbs = $.map([ne.lat, ne.lng, sw.lat, sw.lng], function(x) { return Math.round(x*1E4) }).join();
  if(chat._oldBBox && chat._oldBBox !== bbs) {
    $('#chat > div').data('needsClearing', true);
    console.log('Bounding Box changed, chat will be cleared (old: '+chat._oldBBox+' ; new: '+bbs+' )');
    // need to reset these flags now because clearing will only occur
    // after the request is finished – i.e. there would be one almost
    // useless request.
    chat._faction.data = {};
    chat._faction.oldestTimestamp = -1;
    chat._faction.newestTimestamp = -1;

    chat._public.data = {};
    chat._public.oldestTimestamp = -1;
    chat._public.newestTimestamp = -1;
  }
  chat._oldBBox = bbs;

  var ne = b.getNorthEast();
  var sw = b.getSouthWest();
  var data = {
    desiredNumItems: isFaction ? CHAT_FACTION_ITEMS : CHAT_PUBLIC_ITEMS ,
    minLatE6: Math.round(sw.lat*1E6),
    minLngE6: Math.round(sw.lng*1E6),
    maxLatE6: Math.round(ne.lat*1E6),
    maxLngE6: Math.round(ne.lng*1E6),
    minTimestampMs: -1,
    maxTimestampMs: -1,
    factionOnly: isFaction
  }

  if(getOlderMsgs) {
    // ask for older chat when scrolling up
    data = $.extend(data, {maxTimestampMs: storageHash.oldestTimestamp});
  } else {
    // ask for newer chat
    var min = storageHash.newestTimestamp;
    // the inital request will have both timestamp values set to -1,
    // thus we receive the newest desiredNumItems. After that, we will
    // only receive messages with a timestamp greater or equal to min
    // above.
    // After resuming from idle, there might be more new messages than
    // desiredNumItems. So on the first request, we are not really up to
    // date. We will eventually catch up, as long as there are less new
    // messages than desiredNumItems per each refresh cycle.
    // A proper solution would be to query until no more new results are
    // returned. Another way would be to set desiredNumItems to a very
    // large number so we really get all new messages since the last
    // request. Setting desiredNumItems to -1 does unfortunately not
    // work.
    // Currently this edge case is not handled. Let’s see if this is a
    // problem in crowded areas.
    $.extend(data, {minTimestampMs: min});
  }
  return data;
}



//
// faction
//

window.chat._requestFactionRunning = false;
window.chat.requestFaction = function(getOlderMsgs, isRetry) {
  if(chat._requestFactionRunning && !isRetry) return;
  if(isIdle()) return renderUpdateStatus();
  chat._requestFactionRunning = true;

  var d = chat.genPostData(true, chat._faction, getOlderMsgs);
  var r = window.postAjax(
    'getPaginatedPlextsV2',
    d,
    chat.handleFaction,
    isRetry
      ? function() { window.chat._requestFactionRunning = false; }
      : function() { window.chat.requestFaction(getOlderMsgs, true) }
  );

  requests.add(r);
}


window.chat._faction = {data:{}, oldestTimestamp:-1, newestTimestamp:-1};
window.chat.handleFaction = function(data, textStatus, jqXHR) {
  chat._requestFactionRunning = false;

  if(!data || !data.result) {
    window.failedRequestCount++;
    return console.warn('faction chat error. Waiting for next auto-refresh.');
  }

  if(data.result.length === 0) return;

  var old = chat._faction.oldestTimestamp;
  chat.writeDataToHash(data, chat._faction, false);
  var oldMsgsWereAdded = old !== chat._faction.oldestTimestamp;

  runHooks('factionChatDataAvailable', {raw: data, processed: chat._faction.data});

  window.chat.renderFaction(oldMsgsWereAdded);

  if(data.result.length >= CHAT_FACTION_ITEMS) chat.needMoreMessages();
}

window.chat.renderFaction = function(oldMsgsWereAdded) {
  chat.renderData(chat._faction.data, 'chatfaction', oldMsgsWereAdded);
}


//
// public
//

window.chat._requestPublicRunning = false;
window.chat.requestPublic = function(getOlderMsgs, isRetry) {
  if(chat._requestPublicRunning && !isRetry) return;
  if(isIdle()) return renderUpdateStatus();
  chat._requestPublicRunning = true;

  var d = chat.genPostData(false, chat._public, getOlderMsgs);
  var r = window.postAjax(
    'getPaginatedPlextsV2',
    d,
    chat.handlePublic,
    isRetry
      ? function() { window.chat._requestPublicRunning = false; }
      : function() { window.chat.requestPublic(getOlderMsgs, true) }
  );

  requests.add(r);
}

window.chat._public = {data:{}, oldestTimestamp:-1, newestTimestamp:-1};
window.chat.handlePublic = function(data, textStatus, jqXHR) {
  chat._requestPublicRunning = false;

  if(!data || !data.result) {
    window.failedRequestCount++;
    return console.warn('public chat error. Waiting for next auto-refresh.');
  }

  if(data.result.length === 0) return;

  var old = chat._public.oldestTimestamp;
  chat.writeDataToHash(data, chat._public, true);
  var oldMsgsWereAdded = old !== chat._public.oldestTimestamp;

  runHooks('publicChatDataAvailable', {raw: data, processed: chat._public.data});

  switch(chat.getActive()) {
    case 'public': window.chat.renderPublic(oldMsgsWereAdded); break;
    case 'compact': window.chat.renderCompact(oldMsgsWereAdded); break;
    case 'full': window.chat.renderFull(oldMsgsWereAdded); break;
  }

  if(data.result.length >= CHAT_PUBLIC_ITEMS) chat.needMoreMessages();
}

window.chat.renderPublic = function(oldMsgsWereAdded) {
  // only keep player data
  var data = $.map(chat._public.data, function(entry) {
    if(!entry[1]) return [entry];
  });
  chat.renderData(data, 'chatpublic', oldMsgsWereAdded);
}

window.chat.renderCompact = function(oldMsgsWereAdded) {
  var data = {};
  $.each(chat._public.data, function(guid, entry) {
    // skip player msgs
    if(!entry[1]) return true;
    var pguid = entry[3];
    // ignore if player has newer data
    if(data[pguid] && data[pguid][0] > entry[0]) return true;
    data[pguid] = entry;
  });
  // data keys are now player guids instead of message guids. However,
  // it is all the same to renderData.
  chat.renderData(data, 'chatcompact', oldMsgsWereAdded);
}

window.chat.renderFull = function(oldMsgsWereAdded) {
  // only keep automatically generated data
  var data = $.map(chat._public.data, function(entry) {
    if(entry[1]) return [entry];
  });
  chat.renderData(data, 'chatfull', oldMsgsWereAdded);
}


//
// common
//

window.chat.nicknameClicked = function(event, nickname) {
  var hookData = { event: event, nickname: nickname };
  
  if (window.runHooks('nicknameClicked', hookData)) {
    window.chat.addNickname('@' + nickname);
  }
}

window.chat.writeDataToHash = function(newData, storageHash, isPublicChannel) {
  $.each(newData.result, function(ind, json) {
    // avoid duplicates
    if(json[0] in storageHash.data) return true;

    var isSecureMessage = false;
    var msgToPlayer = false;

    var time = json[1];
    var team = json[2].plext.team === 'ALIENS' ? TEAM_ENL : TEAM_RES;
    var auto = json[2].plext.plextType !== 'PLAYER_GENERATED';
    var systemNarrowcast = json[2].plext.plextType === 'SYSTEM_NARROWCAST';

    //track oldest + newest timestamps
    if (storageHash.oldestTimestamp === -1 || storageHash.oldestTimestamp > time) storageHash.oldestTimestamp = time;
    if (storageHash.newestTimestamp === -1 || storageHash.newestTimestamp < time) storageHash.newestTimestamp = time;

    //remove "Your X on Y was destroyed by Z" from the faction channel
    if (systemNarrowcast && !isPublicChannel) return true;

    var msg = '', nick = '', pguid;
    $.each(json[2].plext.markup, function(ind, markup) {
      switch(markup[0]) {
      case 'SENDER': // user generated messages
        nick = markup[1].plain.slice(0, -2); // cut “: ” at end
        pguid = markup[1].guid;
        break;

      case 'PLAYER': // automatically generated messages
        pguid = markup[1].guid;
        nick = markup[1].plain;
        team = markup[1].team === 'ALIENS' ? TEAM_ENL : TEAM_RES;
        if(ind > 0) msg += nick; // don’t repeat nick directly
        break;

      case 'TEXT':
        msg += $('<div/>').text(markup[1].plain).html().autoLink();
        break;

      case 'AT_PLAYER':
        var thisToPlayer = (markup[1].plain == ('@'+window.PLAYER.nickname));
        var spanClass = thisToPlayer ? "pl_nudge_me" : (markup[1].team + " pl_nudge_player");
        var atPlayerName = markup[1].plain.replace(/^@/, "");
        msg += $('<div/>').html($('<span/>')
                          .attr('class', spanClass)
                          .attr('onclick',"window.chat.nicknameClicked(event, '"+atPlayerName+"')")
                          .text(markup[1].plain)).html();
        msgToPlayer = msgToPlayer || thisToPlayer;
        break;

      case 'PORTAL':
        var latlng = [markup[1].latE6/1E6, markup[1].lngE6/1E6];
        var perma = '/intel?ll='+latlng[0]+','+latlng[1]+'&z=17&pll='+latlng[0]+','+latlng[1];
        var js = 'window.zoomToAndShowPortal(\''+markup[1].guid+'\', ['+latlng[0]+', '+latlng[1]+']);return false';

        msg += '<a onclick="'+js+'"'
          + ' title="'+markup[1].address+'"'
          + ' href="'+perma+'" class="help">'
          + window.chat.getChatPortalName(markup[1])
          + '</a>';
        break;

      case 'SECURE':
        //NOTE: we won't add the '[secure]' string here - it'll be handled below instead
        isSecureMessage = true;
        break;

      default:
        //handle unknown types by outputting the plain text version, marked with it's type
        msg += $('<div/>').text(markup[0]+':<'+markup[1].plain+'>').html();
        break;
      }
    });


    //skip secure messages on the public channel
    if (isPublicChannel && isSecureMessage) return true;

    //skip public messages (e.g. @player mentions) on the secure channel
    if ((!isPublicChannel) && (!isSecureMessage)) return true;


    //NOTE: these two are currently redundant with the above two tests - but code can change...
    //from the server, private channel messages are flagged with a SECURE string '[secure] ', and appear in
    //both the public and private channels
    //we don't include this '[secure]' text above, as it's redundant in the faction-only channel
    //let's add it here though if we have a secure message in the public channel, or the reverse if a non-secure in the faction one
    if (isPublicChannel && isSecureMessage) msg = '<span style="color: #f66">[secure]</span> ' + msg;
    //and, add the reverse - a 'public' marker to messages in the private channel
    if ((!isPublicChannel) && (!isSecureMessage)) msg = '<span style="color: #ff6">[public]</span> ' + msg;


    // format: timestamp, autogenerated, HTML message, player guid
    storageHash.data[json[0]] = [json[1], auto, chat.renderMsg(msg, nick, time, team, msgToPlayer, systemNarrowcast), pguid];

    window.setPlayerName(pguid, nick); // free nick name resolves
  });
}

// Override portal names that are used over and over, such as 'US Post Office'
window.chat.getChatPortalName = function(markup) {
  var name = markup.name;
  if(name === 'US Post Office') {
    var address = markup.address.split(',');
    name = 'USPS: ' + address[0];
  }
  return name;
}

// renders data from the data-hash to the element defined by the given
// ID. Set 3rd argument to true if it is likely that old data has been
// added. Latter is only required for scrolling.
window.chat.renderData = function(data, element, likelyWereOldMsgs) {
  var elm = $('#'+element);
  if(elm.is(':hidden')) return;

  // discard guids and sort old to new
  var vals = $.map(data, function(v, k) { return [v]; });
  vals = vals.sort(function(a, b) { return a[0]-b[0]; });

  // render to string with date separators inserted
  var msgs = '';
  var prevTime = null;
  $.each(vals, function(ind, msg) {
    var nextTime = new Date(msg[0]).toLocaleDateString();
    if(prevTime && prevTime !== nextTime)
      msgs += chat.renderDivider(nextTime);
    msgs += msg[2];
    prevTime = nextTime;
  });

  var scrollBefore = scrollBottom(elm);
  elm.html('<table>' + msgs + '</table>');
  chat.keepScrollPosition(elm, scrollBefore, likelyWereOldMsgs);
}


window.chat.renderDivider = function(text) {
  var d = ' ──────────────────────────────────────────────────────────────────────────';
  return '<tr><td colspan="3" style="padding-top:3px"><summary>─ ' + text + d + '</summary></td></tr>';
}


window.chat.renderMsg = function(msg, nick, time, team, msgToPlayer, systemNarrowcast) {
  var ta = unixTimeToHHmm(time);
  var tb = unixTimeToString(time, true);
  // help cursor via “#chat time”
  var t = '<time title="'+tb+'" data-timestamp="'+time+'">'+ta+'</time>';
  if ( msgToPlayer )
  {
    t = '<div class="pl_nudge_date">' + t + '</div><div class="pl_nudge_pointy_spacer"></div>';
  }
  if (systemNarrowcast)
  {
    msg = '<div class="system_narrowcast">' + msg + '</div>';
  }
  var color = COLORS[team];
  if (nick === window.PLAYER.nickname) color = '#fd6';    //highlight things said/done by the player in a unique colour (similar to @player mentions from others in the chat text itself)
  var s = 'style="cursor:pointer; color:'+color+'"';
  var title = nick.length >= 8 ? 'title="'+nick+'" class="help"' : '';
  var i = ['<span class="invisep">&lt;</span>', '<span class="invisep">&gt;</span>'];
  return '<tr><td>'+t+'</td><td>'+i[0]+'<mark class="nickname" ' + s + '>'+ nick+'</mark>'+i[1]+'</td><td>'+msg+'</td></tr>';
}

window.chat.addNickname= function(nick){
    var c = document.getElementById("chattext");
    c.value = [c.value.trim(), nick].join(" ").trim() + " ";
    c.focus()
}




window.chat.getActive = function() {
  return $('#chatcontrols .active').text();
}


window.chat.toggle = function() {
  var c = $('#chat, #chatcontrols');
  if(c.hasClass('expand')) {
    $('#chatcontrols a:first').html('<span class="toggle expand"></span>');
    c.removeClass('expand');
    var div = $('#chat > div:visible');
    div.data('ignoreNextScroll', true);
    div.scrollTop(99999999); // scroll to bottom
    $('.leaflet-control').css('margin-left', '13px');
  } else {
    $('#chatcontrols a:first').html('<span class="toggle shrink"></span>');
    c.addClass('expand');
    $('.leaflet-control').css('margin-left', '720px');
    chat.needMoreMessages();
  }
}


window.chat.request = function() {
  console.log('refreshing chat');
  chat.requestFaction(false);
  chat.requestPublic(false);
}


// checks if there are enough messages in the selected chat tab and
// loads more if not.
window.chat.needMoreMessages = function() {
  var activeTab = chat.getActive();
  if(activeTab === 'debug') return;

  var activeChat = $('#chat > :visible');
  if(activeChat.length === 0) return;

  var hasScrollbar = scrollBottom(activeChat) !== 0 || activeChat.scrollTop() !== 0;
  var nearTop = activeChat.scrollTop() <= CHAT_REQUEST_SCROLL_TOP;
  if(hasScrollbar && !nearTop) return;

  console.log('No scrollbar or near top in active chat. Requesting more data.');

  if(activeTab === 'faction')
    chat.requestFaction(true);
  else
    chat.requestPublic(true);
}

window.chat.chooseAnchor = function(t) {
  var tt = t.text();

  var mark = $('#chatinput mark');
  var input = $('#chatinput input');

  $('#chatcontrols .active').removeClass('active');
  $("#chatcontrols a:contains('" + tt + "')").addClass('active');

  $('#chat > div').hide();

  var elm;

  switch(tt) {
    case 'faction':
      input.css('color', '');
      mark.css('color', '');
      mark.text('tell faction:');
      break;

    case 'public':
      input.css('cssText', 'color: #f66 !important');
      mark.css('cssText', 'color: #f66 !important');
      mark.text('broadcast:');
      break;

    case 'compact':
    case 'full':
      mark.css('cssText', 'color: #bbb !important');
      input.css('cssText', 'color: #bbb !important');
      mark.text('tell Jarvis:');
      break;

    default:
      throw('chat.chooser was asked to handle unknown button: ' + tt);
  }

  var elm = $('#chat' + tt);
  elm.show();
  eval('chat.render' + tt.capitalize() + '(false);');
  if(elm.data('needsScrollTop')) {
    elm.data('ignoreNextScroll', true);
    elm.scrollTop(elm.data('needsScrollTop'));
    elm.data('needsScrollTop', null);
  }
}

window.chat.show = function(name) {
        window.isSmartphone
                ? $('#updatestatus').hide()
                : $('#updatestatus').show();
    $('#chat, #chatinput').show();
    $('#map').css('visibility', 'hidden');

    var t = $('<a>'+name+'</a>');
    window.chat.chooseAnchor(t);
}

window.chat.chooser = function(event) {
  var t = $(event.target);
  window.chat.chooseAnchor(t);
}

// contains the logic to keep the correct scroll position.
window.chat.keepScrollPosition = function(box, scrollBefore, isOldMsgs) {
  // If scrolled down completely, keep it that way so new messages can
  // be seen easily. If scrolled up, only need to fix scroll position
  // when old messages are added. New messages added at the bottom don’t
  // change the view and enabling this would make the chat scroll down
  // for every added message, even if the user wants to read old stuff.

  if(box.is(':hidden') && !isOldMsgs) {
    box.data('needsScrollTop', 99999999);
    return;
  }

  if(scrollBefore === 0 || isOldMsgs) {
    box.data('ignoreNextScroll', true);
    box.scrollTop(box.scrollTop() + (scrollBottom(box)-scrollBefore));
  }
}




//
// setup
//

window.chat.setup = function() {
  window.chat._localRangeCircle =  L.circle(map.getCenter(), CHAT_MIN_RANGE*1000);

  $('#chatcontrols, #chat, #chatinput').show();

  $('#chatcontrols a:first').click(window.chat.toggle);
  $('#chatcontrols a').each(function(ind, elm) {
    if($.inArray($(elm).text(), ['full', 'compact', 'public', 'faction']) !== -1)
      $(elm).click(window.chat.chooser);
  });


  $('#chatinput').click(function() {
    $('#chatinput input').focus();
  });

  window.chat.setupTime();
  window.chat.setupPosting();

  $('#chatfaction').scroll(function() {
    var t = $(this);
    if(t.data('ignoreNextScroll')) return t.data('ignoreNextScroll', false);
    if(t.scrollTop() < CHAT_REQUEST_SCROLL_TOP) chat.requestFaction(true);
    if(scrollBottom(t) === 0) chat.requestFaction(false);
  });

  $('#chatpublic, #chatfull, #chatcompact').scroll(function() {
    var t = $(this);
    if(t.data('ignoreNextScroll')) return t.data('ignoreNextScroll', false);
    if(t.scrollTop() < CHAT_REQUEST_SCROLL_TOP) chat.requestPublic(true);
    if(scrollBottom(t) === 0) chat.requestPublic(false);
  });

  chat.request();
  window.addResumeFunction(chat.request);
  window.requests.addRefreshFunction(chat.request);

  var cls = PLAYER.team === 'ALIENS' ? 'enl' : 'res';
  $('#chatinput mark').addClass(cls);

  $(window).on('click', '.nickname', function(event) {
    window.chat.nicknameClicked(event, $(this).text());
  });
}


window.chat.setupTime = function() {
  var inputTime = $('#chatinput time');
  var updateTime = function() {
    if(window.isIdle()) return;
    var d = new Date();
    var h = d.getHours() + ''; if(h.length === 1) h = '0' + h;
    var m = d.getMinutes() + ''; if(m.length === 1) m = '0' + m;
    inputTime.text(h+':'+m);
    // update ON the minute (1ms after)
    setTimeout(updateTime, (60 - d.getSeconds()) * 1000 + 1);
  };
  updateTime();
  window.addResumeFunction(updateTime);
}


//
// posting
//


window.chat.setupPosting = function() {
  if (!isSmartphone()) {
    $('#chatinput input').keydown(function(event) {
      try {
        var kc = (event.keyCode ? event.keyCode : event.which);
        if(kc === 13) { // enter
          chat.postMsg();
          event.preventDefault();
        } else if (kc === 9) { // tab
          event.preventDefault();
          window.chat.handleTabCompletion();
        }
      } catch(error) {
        console.log(error);
        debug.printStackTrace();
      }
    });
  }

  $('#chatinput').submit(function(event) {
    event.preventDefault();
    chat.postMsg();
  });
}


window.chat.postMsg = function() {
  var c = chat.getActive();
  if(c === 'full' || c === 'compact')
    return alert('Jarvis: A strange game. The only winning move is not to play. How about a nice game of chess?');

  var msg = $.trim($('#chatinput input').val());
  if(!msg || msg === '') return;

  if(c === 'debug') return new Function (msg)();

  var publik = c === 'public';
  var latlng = map.getCenter();

  var data = {message: msg,
              latE6: Math.round(latlng.lat*1E6),
              lngE6: Math.round(latlng.lng*1E6),
              factionOnly: !publik};

  var errMsg = 'Your message could not be delivered. You can copy&' +
               'paste it here and try again if you want:\n\n' + msg;

  window.postAjax('sendPlext', data,
    function(response) {
      if(response.error) alert(errMsg);
      if(publik) chat.requestPublic(false); else chat.requestFaction(false); },
    function() {
      alert(errMsg);
    }
  );

  $('#chatinput input').val('');
}


// DIALOGS /////////////////////////////////////////////////////////
// Inspired by TES III: Morrowind. Long live House Telvanni. ///////
////////////////////////////////////////////////////////////////////

/* The global ID of onscreen dialogs.
 * Starts at 0.
 */
window.DIALOG_ID = 0;

/* All onscreen dialogs, keyed by their ID.
 */
window.DIALOGS = {};

/* The number of dialogs on screen.
 */
window.DIALOG_COUNT = 0;

/* The dialog that has focus.
 */
window.DIALOG_FOCUS = null;

/* Creates a dialog and puts it onscreen. Takes one argument: options, a JS object.
 * == Common options
 * (text|html): The text or HTML to display in the dialog. Text is auto-converted to HTML.
 * title: The dialog's title.
 * modal: Whether to open a modal dialog. Implies draggable=false; dialogClass='ui-dialog-modal'.
 *        Please note that modal dialogs hijack the entire screen and should only be used in very
 *        specific cases. (If IITC is running on mobile, modal will always be true).
 * id:   A unique ID for this dialog. If a dialog with id `id' is already open and dialog() is called
 *       again, it will be automatically closed.
 *
 * == Callbacks
 * closeCallback: A callback to run on close. Takes no arguments.
 * collapseCallback: A callback to run on dialog collapse.  Takes no arguments.
 * expandCallback:   A callback to run on dialog expansion. Takes no arguments.
 * collapseExpandCallback: A callback to run on both collapse and expand (overrides collapseCallback
 *                         and expandCallback, takes a boolean argument `collapsing' - true if collapsing;
 *                         false if expanding)
 * focusCallback: A callback to run when the dialog gains focus.
 * blurCallback:  A callback to run when the dialog loses focus.
 *
 * See http://docs.jquery.com/UI/API/1.8/Dialog for a list of all the options. If you previously
 * applied a class to your dialog after creating it with alert(), dialogClass may be particularly
 * useful.
 */
window.dialog = function(options) {
  // Override for smartphones. Preserve default behavior and create a modal dialog.
  options = options || {};
  if(isSmartphone()) {
    options.modal = true;
  }

  // Build an identifier for this dialog
  var id = 'dialog-' + (options.modal ? 'modal' : (options.id ? options.id : 'anon-' + window.DIALOG_ID++));
  var jqID = '#' + id;
  var html = '';

  // Convert text to HTML if necessary
  if(options.text) {
    html = window.convertTextToTableMagic(options.text);
  } else if(options.html) {
    html = options.html;
  } else {
    console.log('window.dialog: warning: no text in dialog');
    html = window.convertTextToTableMagic('');
  }

  // Modal dialogs should not be draggable
  if(options.modal) {
    options.dialogClass = 'ui-dialog-modal';
    options.draggable = false;
  }

  // Close out existing dialogs.
  if(window.DIALOGS[id]) {
    try {
      var selector = $(window.DIALOGS[id]);
      selector.dialog('close');
      selector.remove();
    } catch(err) {
      console.log('window.dialog: Tried to close nonexistent dialog ' + id);
    }
  }

  // Create the window, appending a div to the body
  $('body').append('<div id="' + id + '"></div>');
  var dialog = $(jqID).dialog($.extend(true, {
    autoOpen: false,
    modal: false,
    draggable: true,
    closeText: '&nbsp;',
    title: '',
    buttons: {
      'OK': function() {
        $(this).dialog('close');
      }
    },
    open: function() {
      var titlebar = $(this).closest('.ui-dialog').find('.ui-dialog-titlebar');
      titlebar.find('.ui-dialog-title').addClass('ui-dialog-title-active');
      var close = titlebar.find('.ui-dialog-titlebar-close');

      // Title should not show up on mouseover
      close.removeAttr('title').addClass('ui-dialog-titlebar-button');

      if(!$(this).dialog('option', 'modal')) {
        // Start out with a cloned version of the close button
        var collapse = close.clone();

        // Change it into a collapse button and set the click handler
        collapse.addClass('ui-dialog-titlebar-button-collapse ui-dialog-titlebar-button-collapse-expanded');
        collapse.click($.proxy(function() {
          var collapsed = ($(this).data('collapsed') === true);

          // Run callbacks if we have them
          if($(this).data('collapseExpandCallback')) {
            $.proxy($(this).data('collapseExpandCallback'), this)(!collapsed);
          } else {
            if(!collapsed && $(this).data('collapseCallback')) {
              $.proxy($(this).data('collapseCallback'), this)();
            } else if (collapsed && $(this).data('expandCallback')) {
              $.proxy($(this).data('expandCallback'), this)();
            }
          }

          // Find the button pane and content dialog in this ui-dialog, and add or remove the 'hidden' class.
          var dialog   = $(this).closest('.ui-dialog');
          var selector = dialog.find('.ui-dialog-content,.ui-dialog-buttonpane');
          var button   = dialog.find('.ui-dialog-titlebar-button-collapse');
          if(collapsed) {
            $(selector).removeClass('ui-dialog-content-hidden');
            $(button).removeClass('ui-dialog-titlebar-button-collapse-collapsed');
            $(button).addClass('ui-dialog-titlebar-button-collapse-expanded');
          } else {
            $(selector).addClass('ui-dialog-content-hidden');
            $(button).removeClass('ui-dialog-titlebar-button-collapse-expanded');
            $(button).addClass('ui-dialog-titlebar-button-collapse-collapsed');
          }

          // Toggle collapsed state
          $(this).data('collapsed', !collapsed);
        }, this));

        // Put it into the titlebar
        titlebar.prepend(collapse);
        close.addClass('ui-dialog-titlebar-button-close');
      }

      window.DIALOGS[$(this).data('id')] = this;
      window.DIALOG_COUNT++;

      console.log('window.dialog: ' + $(this).data('id') + ' (' + $(this).dialog('option', 'title') + ') opened. ' + window.DIALOG_COUNT + ' remain.');
    },
    close: function() {
      // Run the close callback if we have one
      if($(this).data('closeCallback')) {
        $.proxy($(this).data('closeCallback'), this)();
      }

      // Make sure that we don't keep a dead dialog in focus
      if(window.DIALOG_FOCUS && $(window.DIALOG_FOCUS).data('id') === $(this).data('id')) {
        window.DIALOG_FOCUS = null;
      }

      // Finalize
      delete window.DIALOGS[$(this).data('id')];

      window.DIALOG_COUNT--;
      console.log('window.dialog: ' + $(this).data('id') + ' (' + $(this).dialog('option', 'title') + ') closed. ' + window.DIALOG_COUNT + ' remain.');

      // remove from DOM and destroy
      $(this).dialog('destroy').remove();
    },
    focus: function() {
      if($(this).data('focusCallback')) {
        $.proxy($(this).data('focusCallback'), this)();
      }

      // Blur the window currently in focus unless we're gaining focus
      if(window.DIALOG_FOCUS && $(window.DIALOG_FOCUS).data('id') !== $(this).data('id')) {
        $.proxy(function(event, ui) {
          if($(this).data('blurCallback')) {
            $.proxy($(this).data('blurCallback'), this)();
          }

          $(this).closest('.ui-dialog').find('.ui-dialog-title').removeClass('ui-dialog-title-active').addClass('ui-dialog-title-inactive');
        }, window.DIALOG_FOCUS)();
      }

      // This dialog is now in focus
      window.DIALOG_FOCUS = this;
      $(this).closest('.ui-dialog').find('.ui-dialog-title').removeClass('ui-dialog-title-inactive').addClass('ui-dialog-title-active');
    }
  }, options));

  // Set HTML and IDs
  dialog.html(html);
  dialog.data('id', id);
  dialog.data('jqID', jqID);

  // Set callbacks
  dialog.data('closeCallback', options.closeCallback);
  dialog.data('collapseCallback', options.collapseCallback);
  dialog.data('expandCallback', options.expandCallback);
  dialog.data('collapseExpandCallback', options.collapseExpandCallback);
  dialog.data('focusCallback', options.focusCallback);
  dialog.data('blurCallback', options.blurCallback);

  if(options.modal) {
    // ui-modal includes overrides for modal dialogs
    dialog.parent().addClass('ui-modal');
  } else {
    // Enable snapping
    dialog.dialog().parents('.ui-dialog').draggable('option', 'snap', true);
  }

  // Run it
  dialog.dialog('open');

  return dialog;
}

/* Creates an alert dialog with default settings.
 * If you want more configurability, use window.dialog instead.
 */
window.alert = function(text, isHTML, closeCallback) {
  var obj = {closeCallback: closeCallback};
  if(isHTML) {
    obj.html = text;
  } else {
    obj.text = text;
  }

  return dialog(obj);
}

window.setupDialogs = function() {
  window.DIALOG_ID = 0;
  window.DIALOGS   = {}
  window.DIALOG_COUNT = 0;
  window.DIALOG_FOCUS = null;
}


// REDEEMING ///////////////////////////////////////////////////////
// Heuristic passcode redemption that tries to guess unknown items /
////////////////////////////////////////////////////////////////////

/* Resource type names mapped to actual names and abbreviations.
 * Add more here if necessary.
 */
window.REDEEM_RESOURCES = {
  RES_SHIELD:  {long: 'Portal Shield', short: 'SH'},
  EMITTER_A:   {long: 'Resonator', short: 'R'},
  EMP_BURSTER: {long: 'XMP Burster', short: 'X'},
  POWER_CUBE:  {long: 'Power Cube', short: 'C'}
};

/* Redemption errors. Very self-explanatory.
 */
window.REDEEM_ERRORS = {
  ALREADY_REDEEMED: 'The passcode has already been redeemed.',
  ALREADY_REDEEMED_BY_PLAYER : 'You have already redeemed this passcode.',
  INVALID_PASSCODE: 'This passcode is invalid.'
};

/* These are HTTP status codes returned by the redemption API.
 * TODO: Move to another file? Use more generally across IITC?
 */
window.REDEEM_STATUSES = {
  429: 'You have been rate-limited by the server. Wait a bit and try again.',
  500: 'Internal server error'
};

/* Encouragement for people who got it in.
 * Just for fun.
 */
window.REDEEM_ENCOURAGEMENT = [
  "Passcode accepted!",
  "Access granted.",
  "Asset transfer in progress.",
  "Well done, Agent.",
  "Make the " + {'RESISTANCE' : 'Resistance', 'ALIENS' : 'Enlightened'}[PLAYER.team] + " proud!"
];

/* Redemption "handlers" handle decoding and formatting for rewards.
 *
 * Redemption "decoders" are used for returning the primary attribute (key) from
 * different types of items. Pretty self-explanatory.
 *
 * Redemption "formatters" are used for formatting specific types of password rewards.
 * Right now, Ingress has resourceWithLevels (leveled resources) and modResource (mods).
 * Resources with levels have levels, and mods have rarity. Format them appropriately.
 */
window.REDEEM_HANDLERS = {
  'resourceWithLevels' : {
    decode: function(type, resource) {return resource.level;},
    format: function(acquired, level) {
      var prefix = '<span style="color: ' + (window.COLORS_LVL[level] || 'white') + ';">';
      var suffix = '</span>';
      return {
        table: '<td>' + prefix + 'L' + level + suffix + '</td><td>' + acquired.name.long + ' [' + acquired.count + ']</td>',
        html:  acquired.count + '&#215;' + acquired.name.short + prefix + level + suffix,
        plain: acquired.count + '@' + acquired.name.short + level
      };
    }
  },
  'modResource' : {
    decode: function(type, resource) {return resource.rarity;},
    format: function(acquired, rarity) {
      var prefix = '<span style="color: ' + (window.COLORS_MOD[rarity] || 'white') + ';">';
      var suffix = '</span>';
      var abbreviation = rarity.split('_').map(function (i) {return i[0];}).join('');
      return {
        table: '<td>' + prefix + abbreviation + suffix + '</td><td>' + acquired.name.long + ' [' + acquired.count + ']</td>',
        html:  acquired.count + '&#215;' + prefix + abbreviation + suffix,
        plain: acquired.count + '@' + abbreviation
      };
    }
  },
  'default' : {
    decode: function(type, resource) {return 'UNKNOWN';},
    format: function(acquired, group) {
      return {
        table: '<td>+</td><td>' + acquired.name.long + ' [' + acquired.count + ']</td>',
        html:  acquired.count + '&#215;' + acquired.name.short,
        plain: acquired.count + '@' + acquired.name.short
      };
    }
  }
};

/* Redemption "hints" hint at what an unknown resource might be from its object properties.
 */
window.REDEEM_HINTS = {
  level: 'resourceWithLevels',
  rarity: 'modResource'
};

window.handleRedeemResponse = function(data, textStatus, jqXHR) {
  var passcode = this.passcode, to_dialog, to_log, dialog_title, dialog_buttons;

  if(data.error) {
    // What to display
    to_dialog = '<strong>' + data.error + '</strong><br />' + (window.REDEEM_ERRORS[data.error] || 'There was a problem redeeming the passcode. Try again?');
    to_log    = '[ERROR] ' + data.error;

    // Dialog options
    dialog_title   = 'Error: ' + passcode;
    dialog_buttons = {};
  } else if(data.result) {
    var encouragement = window.REDEEM_ENCOURAGEMENT[Math.floor(Math.random() * window.REDEEM_ENCOURAGEMENT.length)];
    var payload = {};
    var inferred = [];
    var results = {
      'table' : ['<th colspan="2" style="text-align: left;"><strong>' + encouragement + '</strong></th>'],
      'html'  : [],
      'plain' : []
    };

    // Track frequencies and levels of items
    $.each(data.result.inventoryAward, function (award_idx, award) {
      var acquired = award[2], handler, type, key, name;

      // The "what the heck is this item" heuristic
      $.each(acquired, function (taxonomy, resource) {
        if('resourceType' in resource) {
          if(taxonomy in window.REDEEM_HANDLERS) {
            // Cool. We know how to directly handle this item.
            handler = {
              functions: window.REDEEM_HANDLERS[taxonomy],
              taxonomy: taxonomy,
              processed_as: taxonomy
            };
          } else {
            // Let's see if we can get a hint for how we should handle this.
            $.each(resource, function (resource_key, resource_value) {
              if(resource_key in window.REDEEM_HINTS) {
                // We're not sure what this item is, but we can process it like another item
                handler = {
                  functions: (window.REDEEM_HANDLERS[window.REDEEM_HINTS[resource_key]] || window.REDEEM_HANDLERS['default']),
                  taxonomy: taxonomy,
                  processed_as: window.REDEEM_HINTS[resource_key]
                };
                return false;
              }
            });

            // Fall back to the default handler if necessary
            handler = handler || {
              functions: window.REDEEM_HANDLERS['default'],
              taxonomy: taxonomy,
              processed_as: 'default'
            };
          }

          // Collect the data that we know
          type = resource.resourceType;
          key  = handler.functions.decode(type, resource);
          name = window.REDEEM_RESOURCES[type] || {long: type, short: type[0]};

          // Decide if we inferred this resource
          if(!(type in window.REDEEM_RESOURCES) || handler.taxonomy !== handler.processed_as) {
            name.long  += '*';
            name.short += '*';
            inferred.push({type: type, key: key, handler: handler});
          }
          return false;
        }
      });

      // Update frequencies
      payload[type] = payload[type] || {};
      payload[type][key] = payload[type][key] || {};
      payload[type][key].handler = payload[type][key].handler || handler;
      payload[type][key].type = payload[type][key].type || type;
      payload[type][key].name = payload[type][key].name || name;
      payload[type][key].count = payload[type][key].count || 0;
      payload[type][key].count += 1;
    });

    // Get AP and XM.
    $.each([{label: 'AP', award: parseInt(data.result.apAward)}, {label: 'XM', award: parseInt(data.result.xmAward)}], function(idx, val) {
      if(val.award > 0) {
        results.table.push('<td>+</td><td>' + digits(val.award) + ' ' + val.label + '</td>');
        results.html.push(val.award + ' ' + val.label);
        results.plain.push(val.award + ' ' + val.label);
      }
    });

    // Build the formatted results alphabetically
    $.each(Object.keys(payload).sort(), function(type_idx, type) {
      $.each(Object.keys(payload[type]).sort(), function(key_idx, key) {
        var acquired = payload[type][key];
        $.each(acquired.handler.functions.format(acquired, key), function(format, string) {
          results[format].push(string);
        });
      });
    });

    // Let the user know if we had to guess
    if (inferred.length > 0) {
      results.table.push('<td>*</td><td>Guessed (check console)</td>');
      $.each(inferred, function (idx, val) {
        console.log(passcode +
                    ' => [INFERRED] ' + val.type + ':' + val.key + ' :: ' +
                    val.handler.taxonomy + ' =~ ' + val.handler.processed_as);
      });
    }

    // Display formatted versions in a table, plaintext, and the console log
    to_dialog = '<table class="redeem-result-table">' +
                results.table.map(function(a) {return '<tr>' + a + '</tr>';}).join("\n") +
                '</table>';
    to_log    = '[SUCCESS] ' + results.plain.join('/');

    dialog_title   = 'Passcode: ' + passcode;
    dialog_buttons = {
      'PLAINTEXT' : function() {
        dialog({
          title: 'Rewards: ' + passcode,
          html: '<span class="redeem-result-html">' + results.html.join('/') + '</span>'
        });
      }
    }
  }

  // Display it
  dialog({
    title: dialog_title,
    buttons: dialog_buttons,
    html: to_dialog
  });
  console.log(passcode + ' => ' + to_log);
}

window.setupRedeem = function() {
  $("#redeem").keypress(function(e) {
    if((e.keyCode ? e.keyCode : e.which) !== 13 || !$(this).val()) return;
    var data = {passcode: $(this).val()};

    window.postAjax('redeemReward', data, window.handleRedeemResponse,
      function(response) {
        var extra = '';
        if(response.status) {
          extra = (window.REDEEM_STATUSES[response.status] || 'The server indicated an error.') + ' (HTTP ' + response.status + ')';
        } else {
          extra = 'No status code was returned.';
        }
        dialog({
          title: 'Request failed: ' + data.passcode,
          html: '<strong>The HTTP request failed.</strong> ' + extra
        });
      });
  });
}


// IDLE HANDLING /////////////////////////////////////////////////////

window.idleTime = 0; // in minutes

setInterval('window.idleTime += 1', 60*1000);
var idleReset = function () {
  // update immediately when the user comes back
  if(isIdle()) {
    window.idleTime = 0;
    $.each(window._onResumeFunctions, function(ind, f) {
      f();
    });
  }
  window.idleTime = 0;
};
$('body').mousemove(idleReset).keypress(idleReset);

window.isIdle = function() {
  return window.idleTime >= MAX_IDLE_TIME;
}

window._onResumeFunctions = [];

// add your function here if you want to be notified when the user
// resumes from being idle
window.addResumeFunction = function(f) {
  window._onResumeFunctions.push(f);
}



// REQUEST HANDLING //////////////////////////////////////////////////
// note: only meant for portal/links/fields request, everything else
// does not count towards “loading”

window.activeRequests = [];
window.failedRequestCount = 0;

window.requests = function() {}

//time of last refresh
window.requests._lastRefreshTime = 0;
window.requests._quickRefreshPending = false;

window.requests.add = function(ajax) {
  window.activeRequests.push(ajax);
  renderUpdateStatus();
}

window.requests.remove = function(ajax) {
  window.activeRequests.splice(window.activeRequests.indexOf(ajax), 1);
  renderUpdateStatus();
}

window.requests.abort = function() {
  $.each(window.activeRequests, function(ind, actReq) {
    if(actReq) actReq.abort();
  });

  window.activeRequests = [];
  window.failedRequestCount = 0;
  window.chat._requestPublicRunning  = false;
  window.chat._requestFactionRunning  = false;

  renderUpdateStatus();
}

// gives user feedback about pending operations. Draws current status
// to website. Updates info in layer chooser.
window.renderUpdateStatus = function() {

  var t = '<div><span class="help portallevel" title="Indicates portal levels displayed.  Zoom in to display lower level portals."><b>portals</b>: ';
  var minlvl = getMinPortalLevel();
  if(minlvl === 0)
    t += 'all';
  else
    t+= 'L'+minlvl+(minlvl<8?'+':'');
  t +='</span>';

  t += ' <span class="map"><b>map</b>: ';
  if(mapRunsUserAction)
    t += '<span class="help" title="Paused due to user interaction">paused</span';
  else if(isIdle())
    t += '<span style="color:#888">Idle</span>';
  else if(window.activeRequests.length > 0)
    t += window.activeRequests.length + ' requests';
  else if(window.requests._quickRefreshPending)
    t += 'refreshing';
  else
    t += 'Up to date';
  t += '</span>';

  if(renderLimitReached())
    t += ' <span style="color:#f66" class="help" title="Can only render so much before it gets unbearably slow. Not all entities are shown. Zoom in or increase the limit (search for MAX_DRAWN_*).">RENDER LIMIT</span>'

  if(window.failedRequestCount > 0)
    t += ' <span style="color:#f66">' + window.failedRequestCount + ' failed</span>'

  t += '</div>';

  var portalSelection = $('.leaflet-control-layers-overlays label');
  //it's an array - 0=unclaimed, 1=lvl 1, 2=lvl 2, ..., 8=lvl 8 - 9 relevant entries
  //mark all levels below (but not at) minlvl as disabled
  portalSelection.slice(0, minlvl).addClass('disabled').attr('title', 'Zoom in to show those.');
  //and all from minlvl to 8 as enabled
  portalSelection.slice(minlvl, 8+1).removeClass('disabled').attr('title', '');


  $('#updatestatus').html(t);
  //$('#updatestatus').click(function() { startRefreshTimeout(10); });
  //. <a style="cursor: pointer" onclick="startRefreshTimeout(10)" title="Refresh">⟳</a>';
}


// sets the timer for the next auto refresh. Ensures only one timeout
// is queued. May be given 'override' in milliseconds if time should
// not be guessed automatically. Especially useful if a little delay
// is required, for example when zooming.
window.startRefreshTimeout = function(override) {
  // may be required to remove 'paused during interaction' message in
  // status bar
  window.renderUpdateStatus();
  if(refreshTimeout) clearTimeout(refreshTimeout);
  if(override == -1) return;  //don't set a new timeout

  var t = 0;
  if(override) {
    window.requests._quickRefreshPending = true;
    t = override;
    //ensure override can't cause too fast a refresh if repeatedly used (e.g. lots of scrolling/zooming)
    timeSinceLastRefresh = new Date().getTime()-window.requests._lastRefreshTime;
    if(timeSinceLastRefresh < 0) timeSinceLastRefresh = 0;  //in case of clock adjustments
    if(timeSinceLastRefresh < MINIMUM_OVERRIDE_REFRESH*1000)
      t = (MINIMUM_OVERRIDE_REFRESH*1000-timeSinceLastRefresh);
  } else {
    window.requests._quickRefreshPending = false;
    t = REFRESH*1000;
    var adj = ZOOM_LEVEL_ADJ * (18 - window.map.getZoom());
    if(adj > 0) t += adj*1000;
  }
  var next = new Date(new Date().getTime() + t).toLocaleTimeString();
  console.log('planned refresh in ' + (t/1000) + ' seconds, at ' + next);
  refreshTimeout = setTimeout(window.requests._callOnRefreshFunctions, t);
  renderUpdateStatus();
}

window.requests._onRefreshFunctions = [];
window.requests._callOnRefreshFunctions = function() {
  console.log('running refresh at ' + new Date().toLocaleTimeString());
  startRefreshTimeout();

  if(isIdle()) {
    console.log('user has been idle for ' + idleTime + ' minutes. Skipping refresh.');
    renderUpdateStatus();
    return;
  }

  console.log('refreshing');

  //store the timestamp of this refresh
  window.requests._lastRefreshTime = new Date().getTime();

  $.each(window.requests._onRefreshFunctions, function(ind, f) {
    f();
  });
}


// add method here to be notified of auto-refreshes
window.requests.addRefreshFunction = function(f) {
  window.requests._onRefreshFunctions.push(f);
}

window.requests.isLastRequest = function(action) {
  var result = true;
  $.each(window.activeRequests, function(ind, req) {
    if(req.action === action) {
      result = false;
      return false;
    }
  });
  return result;
}



// GAME STATUS ///////////////////////////////////////////////////////
// MindUnit display
window.updateGameScore = function(data) {
  if(!data) {
    window.postAjax('getGameScore', {}, window.updateGameScore);
    return;
  }

  var r = parseInt(data.result.resistanceScore), e = parseInt(data.result.alienScore);
  var s = r+e;
  var rp = r/s*100, ep = e/s*100;
  r = digits(r), e = digits(e);
  var rs = '<span class="res" style="width:'+rp+'%;">'+Math.round(rp)+'%&nbsp;</span>';
  var es = '<span class="enl" style="width:'+ep+'%;">&nbsp;'+Math.round(ep)+'%</span>';
  $('#gamestat').html(rs+es).one('click', function() { window.updateGameScore() });
  // help cursor via “#gamestat span”
  $('#gamestat').attr('title', 'Resistance:\t'+r+' MindUnits\nEnlightened:\t'+e+' MindUnits');

  window.setTimeout('window.updateGameScore', REFRESH_GAME_SCORE*1000);
}


window.isSmartphone = function() {
  // this check is also used in main.js. Note it should not detect
  // tablets because their display is large enough to use the desktop
  // version.

  // The stock intel site allows forcing mobile/full sites with a vp=m or vp=f
  // parameter - let's support the same. (stock only allows this for some
  // browsers - e.g. android phone/tablet. let's allow it for all, but
  // no promises it'll work right)
  var viewParam = getURLParam('vp');
  if (viewParam == 'm') return true;
  if (viewParam == 'f') return false;

  return navigator.userAgent.match(/Android.*Mobile/);
}

window.smartphone = function() {};

window.runOnSmartphonesBeforeBoot = function() {
  if(!isSmartphone()) return;
  console.warn('running smartphone pre boot stuff');

  // add smartphone stylesheet
  headHTML = document.getElementsByTagName('head')[0].innerHTML;
  headHTML += '<style>body {\n  background: #000;\n  color: #fff;\n}\n\n#sidebar, #updatestatus, #chatcontrols, #chat, #chatinput {\n  background: #0B3351 !important\n}\n\n.leaflet-top .leaflet-control {\n  margin-top: 5px !important;\n  margin-left: 5px !important;\n}\n\n.leaflet-control-layers {\n  display: none;    /* hide layer control - it\'s now handled by an in-app option */\n}\n\n#geosearch {\n  width: 100%;\n}\n\n#geosearchwrapper img {\n  display: none;\n}\n\n#chatcontrols {\n  height: 38px;\n  width: 100%;\n  display: none !important;\n}\n\n/* hide shrink button */\n#chatcontrols a:first-child {\n  display: none;\n}\n\n#chatcontrols a {\n  width: 50px;\n  height:36px;\n  overflow: hidden;\n  vertical-align: middle;\n  line-height: 36px;\n  text-decoration: none;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#chat {\n  left:0;\n  right:0;\n  top: 1px !important;\n  bottom:30px;\n  width: auto;\n}\n\n#chatinput {\n  width: 100%;\n  height: 30px;\n}\n\n#chat td:nth-child(2), #chatinput td:nth-child(2) {\n  width: 77px;\n}\n\n#chatcontrols a.active {\n  border-color: #FFCE00;\n  border-bottom-width:0px;\n  font-weight:bold\n}\n\n#chatcontrols a.active + a {\n  border-left-color: #FFCE00\n}\n\n#sidebartoggle {\n  display: none !important;\n}\n\n#scrollwrapper {\n  bottom: 0;\n  max-height: none !important;\n  width: 100% !important;\n  right: 0;\n  left:0;\n}\n\n#sidebar {\n  width: 100% !important;\n  min-height: 100%;\n  border:0;\n}\n\n#sidebar > * {\n  width: 100%;\n}\n\n#playerstat {\n  margin-top: 5px;\n}\n\n#portaldetails {\n  min-height: 0;\n}\n\n.fullimg {\n  width: 100%;\n}\n\n\n#portal_highlight_select{\n  top:0px !important;\n  left:0px !important;\n}\n</style>';
  document.getElementsByTagName('head')[0].innerHTML = headHTML;

  // don’t need many of those
  window.setupStyles = function() {
    $('head').append('<style>' +
      [ '#largepreview.enl img { border:2px solid '+COLORS[TEAM_ENL]+'; } ',
        '#largepreview.res img { border:2px solid '+COLORS[TEAM_RES]+'; } ',
        '#largepreview.none img { border:2px solid '+COLORS[TEAM_NONE]+'; } '].join("\n")
      + '</style>');
  }

  window.smartphone.mapButton = $('<a>map</a>').click(function() {
    $('#chat, #chatinput, #scrollwrapper').hide();
    $('#map').css('visibility', 'visible');
    $('#updatestatus').show();
    $('#chatcontrols a .active').removeClass('active');
    $("#chatcontrols a:contains('map')").addClass('active');
  });

  window.smartphone.sideButton = $('<a>info</a>').click(function() {
    $('#chat, #chatinput, #updatestatus').hide();
    $('#map').css('visibility', 'hidden');
    $('#scrollwrapper').show();
    $('.active').removeClass('active');
    $("#chatcontrols a:contains('info')").addClass('active');
  });

  $('#chatcontrols').append(smartphone.mapButton).append(smartphone.sideButton);

  window.addHook('portalDetailsUpdated', function(data) {
    var x = $('.imgpreview img').removeClass('hide');

    if(!x.length) {
      $('.fullimg').remove();
      return;
    }

    if($('.fullimg').length) {
      $('.fullimg').replaceWith(x.addClass('fullimg'));
    } else {
      x.addClass('fullimg').appendTo('#sidebar');
    }
  });
}

window.runOnSmartphonesAfterBoot = function() {
  if(!isSmartphone()) return;
  console.warn('running smartphone post boot stuff');

  smartphone.mapButton.click();

  // disable img full view
  $('#portaldetails').off('click', '**');

  // make buttons in action bar flexible
  var l = $('#chatcontrols a:visible');
  l.css('width', 100/l.length + '%');

  // add event to portals that allows long press to switch to sidebar
  window.addHook('portalAdded', function(data) {
    data.portal.on('add', function() {
      if(!this._container || this.options.addedTapHoldHandler) return;
      this.options.addedTapHoldHandler = true;
      var guid = this.options.guid;

      // this is a hack, accessing Leaflet’s private _container is evil
      $(this._container).on('taphold', function() {
        window.renderPortalDetails(guid);
        window.smartphone.sideButton.click();
      });
    });
  });

  // Force lower render limits for mobile
  window.VIEWPORT_PAD_RATIO = 0.1;
  window.MAX_DRAWN_PORTALS = 500;
  window.MAX_DRAWN_LINKS = 200;
  window.MAX_DRAWN_FIELDS = 100;

  //hook some additional code into the LayerControl so it's easy for the mobile app to interface with it
  //WARNING: does depend on internals of the L.Control.Layers code
  window.layerChooser.getLayers = function() {
    var baseLayers = new Array();
    var overlayLayers = new Array();

    for (i in this._layers) {
      var obj = this._layers[i];
      var layerActive = window.map.hasLayer(obj.layer);
      var info = {
        layerId: L.stamp(obj.layer),
        name: obj.name,
        active: layerActive
      }
      if (obj.overlay) {
        overlayLayers.push(info);
      } else {
        baseLayers.push(info);
      }
    }

    var overlayLayersJSON = JSON.stringify(overlayLayers);
    var baseLayersJSON = JSON.stringify(baseLayers);

    if (typeof android !== 'undefined' && android && android.setLayers) {
        android.setLayers(baseLayersJSON, overlayLayersJSON);
    }

    return {
      baseLayers: baseLayers,
      overlayLayers: overlayLayers
    }
  }
  window.layerChooser.showLayer = function(id,show) {
    if (show === undefined) show = true;
    obj = this._layers[id];
    if (!obj) return false;

    if(show) {
      if (!this._map.hasLayer(obj.layer)) {
        //the layer to show is not currently active
        this._map.addLayer(obj.layer);

        //if it's a base layer, remove any others
        if (!obj.overlay) {
          for(i in this._layers) {
            if (i != id) {
              var other = this._layers[i];
              if (!other.overlay && this._map.hasLayer(other.layer)) this._map.removeLayer(other.layer);
            }
          }
        }
      }
    } else {
      if (this._map.hasLayer(obj.layer)) {
        this._map.removeLayer(obj.layer);
      }
    }

    //below logic based on code in L.Control.Layers _onInputClick
    if(!obj.overlay) {
      this._map.setZoom(this._map.getZoom());
      this._map.fire('baselayerchange', {layer: obj.layer});
    }

    return true;
  }

}


// created to start cleaning up "window" interaction
//
window.show = function(id) {
        window.hideall();
        switch(id) {
                case 'full':
                        window.chat.show('full');
                        break;
                case 'compact':
                        window.chat.show('compact');
                        break;
                case 'public':
                        window.chat.show('public');
                        break;
                case 'faction':
                        window.chat.show('faction');
                        break;
                case 'debug':
                        window.debug.console.show();
                        break;
                case 'map':
                        window.smartphone.mapButton.click();
                        $('#portal_highlight_select').show();
                        break;
                case 'info':
                        window.smartphone.sideButton.click();
                        break;
                default:
                        window.smartphone.mapButton.click();
                        break;
        }
}

window.hideall = function() {
    $('#chatcontrols, #chat, #chatinput, #sidebartoggle, #scrollwrapper, #updatestatus, #portal_highlight_select').hide();
    $('#map').css('visibility', 'hidden');
}



// MAP DATA //////////////////////////////////////////////////////////
// these functions handle how and which entities are displayed on the
// map. They also keep them up to date, unless interrupted by user
// action.


// requests map data for current viewport. For details on how this
// works, refer to the description in “MAP DATA REQUEST CALCULATORS”
window.requestData = function() {
  console.log('refreshing data');
  requests.abort();
  cleanUp();

  var bounds = clampLatLngBounds(map.getBounds());

  //we query the server as if the zoom level was this. it may not match the actual map zoom level
  var z = getPortalDataZoom();

  var x1 = lngToTile(bounds.getWest(), z);
  var x2 = lngToTile(bounds.getEast(), z);
  var y1 = latToTile(bounds.getNorth(), z);
  var y2 = latToTile(bounds.getSouth(), z);

  // will group requests by second-last quad-key quadrant
  tiles = {};

  // walk in x-direction, starts right goes left
  for (var x = x1; x <= x2; x++) {
    for (var y = y1; y <= y2; y++) {
      var tile_id = pointToTileId(z, x, y);
      var bucket = (x % 2) + ":" + (y % 2);
      if (!tiles[bucket])
        tiles[bucket] = [];
      tiles[bucket].push(generateBoundsParams(
        tile_id,
        tileToLat(y + 1, z),
        tileToLng(x, z),
        tileToLat(y, z),
        tileToLng(x + 1, z)
      ));
    }
  }

  // Reset previous result of Portal Render Limit handler
  portalRenderLimit.init();

  // finally send ajax requests
  $.each(tiles, function(ind, tls) {
    data = { zoom: z };
    data.boundsParamsList = tls;
    window.requests.add(window.postAjax('getThinnedEntitiesV2', data, window.handleDataResponse, window.handleFailedRequest));
  });
}

// Handle failed map data request
window.handleFailedRequest = function() {
  if(requests.isLastRequest('getThinnedEntitiesV2')) {
    var leftOverPortals = portalRenderLimit.mergeLowLevelPortals(null);
    handlePortalsRender(leftOverPortals);
  }
  runHooks('requestFinished', {success: false});
}

// works on map data response and ensures entities are drawn/updated.
window.handleDataResponse = function(data, textStatus, jqXHR) {
  // remove from active ajax queries list
  if(!data || !data.result) {
    window.failedRequestCount++;
    console.warn(data);
    handleFailedRequest();
    return;
  }

  var m = data.result.map;
  // defer rendering of portals because there is no z-index in SVG.
  // this means that what’s rendered last ends up on top. While the
  // portals can be brought to front, this costs extra time. They need
  // to be in the foreground, or they cannot be clicked. See
  // https://github.com/Leaflet/Leaflet/issues/185
  var ppp = {};
  var p2f = {};
  $.each(m, function(qk, val) {
    $.each(val.deletedGameEntityGuids || [], function(ind, guid) {
      if(getTypeByGuid(guid) === TYPE_FIELD && window.fields[guid] !== undefined) {
        $.each(window.fields[guid].options.vertices, function(ind, vertex) {
          if(window.portals[vertex.guid] === undefined) return true;
          fieldArray = window.portals[vertex.guid].options.details.portalV2.linkedFields;
          fieldArray.splice($.inArray(guid, fieldArray), 1);
        });
      }
      window.removeByGuid(guid);
    });

    $.each(val.gameEntities || [], function(ind, ent) {
      // ent = [GUID, id(?), details]
      // format for links: { controllingTeam, creator, edge }
      // format for portals: { controllingTeam, turret }

      if(ent[2].turret !== undefined) {

        var latlng = [ent[2].locationE6.latE6/1E6, ent[2].locationE6.lngE6/1E6];
        if(!window.getPaddedBounds().contains(latlng)
              && selectedPortal !== ent[0]
              && urlPortal !== ent[0]
              && !(urlPortalLL && urlPortalLL[0] === latlng[0] && urlPortalLL[1] === latlng[1])
          ) return;

        if('imageByUrl' in ent[2] && 'imageUrl' in ent[2].imageByUrl) {
          if(window.location.protocol === 'https:') {
            ent[2].imageByUrl.imageUrl = ent[2].imageByUrl.imageUrl.indexOf('www.panoramio.com') !== -1
                                       ? ent[2].imageByUrl.imageUrl.replace(/^http:\/\/www/, 'https://ssl').replace('small', 'medium')
                                       : ent[2].imageByUrl.imageUrl.replace(/^http:\/\//, '//');
          }
        } else {
          ent[2].imageByUrl = {'imageUrl': DEFAULT_PORTAL_IMG};
        }

        ppp[ent[0]] = ent; // delay portal render
      } else if(ent[2].edge !== undefined) {
        renderLink(ent);
      } else if(ent[2].capturedRegion !== undefined) {
        $.each(ent[2].capturedRegion, function(ind, vertex) {
          if(p2f[vertex.guid] === undefined)
            p2f[vertex.guid] = new Array();
          p2f[vertex.guid].push(ent[0]);
        });
        renderField(ent);
      } else {
        throw('Unknown entity: ' + JSON.stringify(ent));
      }
    });
  });

  $.each(ppp, function(ind, portal) {
    if ('portalV2' in portal[2] && 'linkedEdges' in portal[2].portalV2) {
      $.each(portal[2].portalV2.linkedEdges, function (ind, edge) {
        if (!ppp[edge.otherPortalGuid])
          return;
        renderLink([
          edge.edgeGuid,
          portal[1],
          {
            "controllingTeam": portal[2].controllingTeam,
            "edge": {
              "destinationPortalGuid": edge.isOrigin ? ppp[edge.otherPortalGuid][0] : portal[0],
              "destinationPortalLocation": edge.isOrigin ? ppp[edge.otherPortalGuid][2].locationE6 : portal[2].locationE6,
              "originPortalGuid": !edge.isOrigin ? ppp[edge.otherPortalGuid][0] : portal[0],
              "originPortalLocation": !edge.isOrigin ? ppp[edge.otherPortalGuid][2].locationE6 : portal[2].locationE6
            }
          }
        ]);
      });
    }
    if(portal[2].portalV2['linkedFields'] === undefined) {
      portal[2].portalV2['linkedFields'] = [];
    }
    if(p2f[portal[0]] !== undefined) {
      $.merge(p2f[portal[0]], portal[2].portalV2['linkedFields']);
      portal[2].portalV2['linkedFields'] = uniqueArray(p2f[portal[0]]);
    }
  });

  // Process the portals with portal render limit handler first
  // Low level portal will hold until last request
  var newPpp = portalRenderLimit.splitOrMergeLowLevelPortals(ppp);
  // Clean up level of portal which over render limit after portalRenderLimit handler counted the new portals
  portalRenderLimit.cleanUpOverLimitPortalLevel();
  handlePortalsRender(newPpp);

  resolvePlayerNames();
  renderUpdateStatus();
  runHooks('requestFinished', {success: true});
}

window.handlePortalsRender = function(portals) {
  var portalInUrlAvailable = false;

  // Preserve selectedPortal because it will get lost on re-rendering
  // the portal
  var oldSelectedPortal = selectedPortal;
  runHooks('portalDataLoaded', {portals : portals});
  $.each(portals, function(guid, portal) {
    //~ if(selectedPortal === portal[0]) portalUpdateAvailable = true;
    if(urlPortalLL && urlPortalLL[0] === portal[2].locationE6.latE6/1E6 && urlPortalLL[1] === portal[2].locationE6.lngE6/1E6) {
      urlPortal = guid;
      portalInUrlAvailable = true;
      urlPortalLL = null;
    }
    if(window.portals[guid]) {
      highlightPortal(window.portals[guid]);
    }
    renderPortal(portal);
  });

  // restore selected portal if still available
  var selectedPortalGroup = portals[oldSelectedPortal];
  if(selectedPortalGroup) {
    selectedPortal = oldSelectedPortal;
    renderPortalDetails(selectedPortal);
    try {
      selectedPortalGroup.bringToFront();
    } catch(e) { /* portal is now visible, catch Leaflet error */ }
  }

  if(portalInUrlAvailable) {
    renderPortalDetails(urlPortal);
    urlPortal = null; // select it only once
  }
}

// removes entities that are still handled by Leaflet, although they
// do not intersect the current viewport.
window.cleanUp = function() {
  var cnt = [0,0,0];
  var b = getPaddedBounds();
  var minlvl = getMinPortalLevel();
  for(var i = 0; i < portalsLayers.length; i++) {
    // i is also the portal level
    portalsLayers[i].eachLayer(function(item) {
      var itemGuid = item.options.guid;
      // check if 'item' is a portal
      if(getTypeByGuid(itemGuid) != TYPE_PORTAL) return true;
      // portal must be in bounds and have a high enough level. Also don’t
      // remove if it is selected.
      if(itemGuid == window.selectedPortal ||
        (b.contains(item.getLatLng()) && i >= minlvl)) return true;
      cnt[0]++;
      portalsLayers[i].removeLayer(item);
    });
  }
  linksLayer.eachLayer(function(link) {
    if(b.intersects(link.getBounds())) return;
    cnt[1]++;
    linksLayer.removeLayer(link);
  });
  fieldsLayer.eachLayer(function(fieldgroup) {
    fieldgroup.eachLayer(function(item) {
      if(!item.options.guid) return true; // Skip MU div container as this doesn't have the bounds we need
      if(b.intersects(item.getBounds())) return;
      cnt[2]++;
      fieldsLayer.removeLayer(fieldgroup);
    });
  });
  console.log('removed out-of-bounds: '+cnt[0]+' portals, '+cnt[1]+' links, '+cnt[2]+' fields');
}


// removes given entity from map
window.removeByGuid = function(guid) {
  switch(getTypeByGuid(guid)) {
    case TYPE_PORTAL:
      if(!window.portals[guid]) return;
      var p = window.portals[guid];
      for(var i = 0; i < portalsLayers.length; i++)
        portalsLayers[i].removeLayer(p);
      break;
    case TYPE_LINK:
      if(!window.links[guid]) return;
      linksLayer.removeLayer(window.links[guid]);
      break;
    case TYPE_FIELD:
      if(!window.fields[guid]) return;
      fieldsLayer.removeLayer(window.fields[guid]);
      break;
    case TYPE_RESONATOR:
      if(!window.resonators[guid]) return;
      var r = window.resonators[guid];
      for(var i = 1; i < portalsLayers.length; i++)
        portalsLayers[i].removeLayer(r);
      break;
    default:
      console.warn('unknown GUID type: ' + guid);
      //window.debug.printStackTrace();
  }
}



// renders a portal on the map from the given entity
window.renderPortal = function(ent) {
  if(Object.keys(portals).length >= MAX_DRAWN_PORTALS && ent[0] !== selectedPortal)
    return removeByGuid(ent[0]);

  // hide low level portals on low zooms
  var portalLevel = getPortalLevel(ent[2]);
  if(portalLevel < getMinPortalLevel()  && ent[0] !== selectedPortal)
    return removeByGuid(ent[0]);

  var team = getTeam(ent[2]);

  // do nothing if portal did not change
  var layerGroup = portalsLayers[parseInt(portalLevel)];
  var old = findEntityInLeaflet(layerGroup, window.portals, ent[0]);
  if(!changing_highlighters && old) {
    var oo = old.options;

    // Default checks to see if a portal needs to be re-rendered
    var u = oo.team !== team;
    u = u || oo.level !== portalLevel;

    // Allow plugins to add additional conditions as to when a portal gets re-rendered
    var hookData = {portal: ent[2], oldPortal: oo.details, portalGuid: ent[0], reRender: false};
    runHooks('beforePortalReRender', hookData);
    u = u || hookData.reRender;

    // nothing changed that requires re-rendering the portal.
    if(!u) {
      // let resos handle themselves if they need to be redrawn
      renderResonators(ent[0], ent[2], old);
      // update stored details for portal details in sidebar.
      old.options.details = ent[2];
      return;
    }
  }

  // there were changes, remove old portal. Don’t put this in old, in
  // case the portal changed level and findEntityInLeaflet doesn’t find
  // it.
  removeByGuid(ent[0]);

  var latlng = [ent[2].locationE6.latE6/1E6, ent[2].locationE6.lngE6/1E6];

  // pre-loads player names for high zoom levels
  loadPlayerNamesForPortal(ent[2]);

  var lvWeight = Math.max(2, Math.floor(portalLevel) / 1.5);
  var lvRadius = Math.floor(portalLevel) + 4;
  if(team === window.TEAM_NONE) {
    lvRadius = 7;
  }

  var p = L.circleMarker(latlng, {
    radius: lvRadius + (L.Browser.mobile ? PORTAL_RADIUS_ENLARGE_MOBILE : 0),
    color: ent[0] === selectedPortal ? COLOR_SELECTED_PORTAL : COLORS[team],
    opacity: 1,
    weight: lvWeight,
    fillColor: COLORS[team],
    fillOpacity: 0.5,
    clickable: true,
    level: portalLevel,
    team: team,
    ent: ent,
    details: ent[2],
    guid: ent[0]});

  p.on('remove', function() {
    var portalGuid = this.options.guid

    // remove attached resonators, skip if
    // all resonators have already removed by zooming
    if(isResonatorsShow()) {
      for(var i = 0; i <= 7; i++)
        removeByGuid(portalResonatorGuid(portalGuid, i));
    }
    delete window.portals[portalGuid];
    if(window.selectedPortal === portalGuid) {
      window.unselectOldPortal();
    }
  });

  p.on('add', function() {
    // enable for debugging
    if(window.portals[this.options.guid]) throw('duplicate portal detected');
    window.portals[this.options.guid] = this;

    window.renderResonators(this.options.guid, this.options.details, this);
    // handles the case where a selected portal gets removed from the
    // map by hiding all portals with said level
    if(window.selectedPortal !== this.options.guid)
      window.portalResetColor(this);
  });

  p.on('click',    function() { window.renderPortalDetails(ent[0]); });
  p.on('dblclick', function() {
    window.renderPortalDetails(ent[0]);
    window.map.setView(latlng, 17);
  });

  highlightPortal(p);
  window.runHooks('portalAdded', {portal: p});
  p.addTo(layerGroup);
}

window.renderResonators = function(portalGuid, portalDetails, portalLayer) {
  if(!isResonatorsShow()) return;

  // only draw when the portal is not hidden
  if(portalLayer && !window.map.hasLayer(portalLayer)) return;

  var portalLevel = getPortalLevel(portalDetails);
  var portalLatLng = [portalDetails.locationE6.latE6/1E6, portalDetails.locationE6.lngE6/1E6];

  var reRendered = false;
  $.each(portalDetails.resonatorArray.resonators, function(i, rdata) {
    // skip if resonator didn't change
    var oldRes = window.resonators[portalResonatorGuid(portalGuid, i)];
    if(oldRes) {
      if(isSameResonator(oldRes.options.details, rdata)) return true;
      // remove old resonator if exist
      removeByGuid(oldRes.options.guid);
    }

    // skip and remove old resonator if no new resonator
    if(rdata === null) return true;

    var resoLatLng = getResonatorLatLng(rdata.distanceToPortal, rdata.slot, portalLatLng);
    var resoGuid = portalResonatorGuid(portalGuid, i);

    // the resonator
    var resoStyle =
      portalGuid === selectedPortal ? OPTIONS_RESONATOR_SELECTED : OPTIONS_RESONATOR_NON_SELECTED;
    var resoProperty = $.extend({
        fillColor: COLORS_LVL[rdata.level],
        fillOpacity: rdata.energyTotal/RESO_NRG[rdata.level],
        guid: resoGuid
      }, resoStyle);

    var reso =  L.circleMarker(resoLatLng, resoProperty);

    // line connecting reso to portal
    var connProperty =
      portalGuid === selectedPortal ? OPTIONS_RESONATOR_LINE_SELECTED : OPTIONS_RESONATOR_LINE_NON_SELECTED;

    var conn = L.polyline([portalLatLng, resoLatLng], connProperty);

    // put both in one group, so they can be handled by the same logic.
    var r = L.layerGroup([reso, conn]);
    r.options = {
      level: rdata.level,
      details: rdata,
      pDetails: portalDetails,
      guid: resoGuid
    };

    // However, LayerGroups (and FeatureGroups) don’t fire add/remove
    // events, thus this listener will be attached to the resonator. It
    // doesn’t matter to which element these are bound since Leaflet
    // will add/remove all elements of the LayerGroup at once.
    reso.on('remove', function() { delete window.resonators[this.options.guid]; });
    reso.on('add',    function() {
      if(window.resonators[this.options.guid]) throw('duplicate resonator detected');
      window.resonators[this.options.guid] = r;
    });

    r.addTo(portalsLayers[parseInt(portalLevel)]);
    reRendered = true;
  });
  // if there is any resonator re-rendered, bring portal to front
  if(reRendered && portalLayer) portalLayer.bringToFront();
}

// append portal guid with -resonator-[slot] to get guid for resonators
window.portalResonatorGuid = function(portalGuid, slot) {
  return portalGuid + '-resonator-' + slot;
}

window.isResonatorsShow = function() {
  return map.getZoom() >= RESONATOR_DISPLAY_ZOOM_LEVEL;
}

window.isSameResonator = function(oldRes, newRes) {
  if(!oldRes && !newRes) return true;
  if(!oldRes || !newRes) return false;
  if(typeof oldRes !== typeof newRes) return false;
  if(oldRes.level !== newRes.level) return false;
  if(oldRes.energyTotal !== newRes.energyTotal) return false;
  if(oldRes.distanceToPortal !== newRes.distanceToPortal) return false;
  return true;
}

window.portalResetColor = function(portal) {
  portal.setStyle({color:  COLORS[getTeam(portal.options.details)]});
  resonatorsResetStyle(portal.options.guid);
}

window.resonatorsResetStyle = function(portalGuid) {
  window.resonatorsSetStyle(portalGuid, OPTIONS_RESONATOR_NON_SELECTED, OPTIONS_RESONATOR_LINE_NON_SELECTED);
}

window.resonatorsSetSelectStyle = function(portalGuid) {
  window.resonatorsSetStyle(portalGuid, OPTIONS_RESONATOR_SELECTED, OPTIONS_RESONATOR_LINE_SELECTED);
}

window.resonatorsSetStyle = function(portalGuid, resoStyle, lineStyle) {
  for(var i = 0; i < 8; i++) {
    resonatorLayerGroup = resonators[portalResonatorGuid(portalGuid, i)];
    if(!resonatorLayerGroup) continue;
    // bring resonators and their connection lines to front separately.
    // this way the resonators are drawn on top of the lines.
    resonatorLayerGroup.eachLayer(function(layer) {
      if (!layer.options.guid)  // Resonator line
        layer.bringToFront().setStyle(lineStyle);
    });
    resonatorLayerGroup.eachLayer(function(layer) {
      if (layer.options.guid) // Resonator
        layer.bringToFront().setStyle(resoStyle);
    });
  }
  portals[portalGuid].bringToFront();
}

// renders a link on the map from the given entity
window.renderLink = function(ent) {
  if(Object.keys(links).length >= MAX_DRAWN_LINKS)
    return removeByGuid(ent[0]);

  // assume that links never change. If they do, they will have a
  // different ID.
  if(findEntityInLeaflet(linksLayer, links, ent[0])) return;

  var team = getTeam(ent[2]);
  var edge = ent[2].edge;
  var latlngs = [
    [edge.originPortalLocation.latE6/1E6, edge.originPortalLocation.lngE6/1E6],
    [edge.destinationPortalLocation.latE6/1E6, edge.destinationPortalLocation.lngE6/1E6]
  ];
  var poly = L.polyline(latlngs, {
    color: COLORS[team],
    opacity: 1,
    weight:2,
    clickable: false,
    guid: ent[0],
    data: ent[2],
    smoothFactor: 0 // doesn’t work for two points anyway, so disable
  });
  // determine which links are very short and don’t render them at all.
  // in most cases this will go unnoticed, but improve rendering speed.
  poly._map = window.map;
  poly.projectLatlngs();
  var op = poly._originalPoints;
  var dist = Math.abs(op[0].x - op[1].x) + Math.abs(op[0].y - op[1].y);
  if(dist <= 10) {
    return;
  }

  if(!getPaddedBounds().intersects(poly.getBounds())) return;

  poly.on('remove', function() { delete window.links[this.options.guid]; });
  poly.on('add',    function() {
    // enable for debugging
    if(window.links[this.options.guid]) throw('duplicate link detected');
    window.links[this.options.guid] = this;
    this.bringToBack();
  });
  poly.addTo(linksLayer);
}

// renders a field on the map from a given entity
window.renderField = function(ent) {
  if(Object.keys(fields).length >= MAX_DRAWN_FIELDS)
    return window.removeByGuid(ent[0]);

  var old = findEntityInLeaflet(fieldsLayer, window.fields, ent[0]);
  // If this already exists and the zoom level has not changed, we don't need to do anything
  if(old && map.getZoom() === old.options.creationZoom) return;

  var team = getTeam(ent[2]);
  var reg = ent[2].capturedRegion;
  var latlngs = [
    L.latLng(reg.vertexA.location.latE6/1E6, reg.vertexA.location.lngE6/1E6),
    L.latLng(reg.vertexB.location.latE6/1E6, reg.vertexB.location.lngE6/1E6),
    L.latLng(reg.vertexC.location.latE6/1E6, reg.vertexC.location.lngE6/1E6)
  ];

  var poly = L.polygon(latlngs, {
    fillColor: COLORS[team],
    fillOpacity: 0.25,
    stroke: false,
    clickable: false,
    smoothFactor: 0, // hiding small fields will be handled below
    guid: ent[0]});

  // determine which fields are too small to be rendered and don’t
  // render them, so they don’t count towards the maximum fields limit.
  // This saves some DOM operations as well, but given the relatively
  // low amount of fields there isn’t much to gain.
  // The algorithm is the same as used by Leaflet.
  poly._map = window.map;
  poly.projectLatlngs();
  var count = L.LineUtil.simplify(poly._originalPoints, 6).length;
  if(count <= 2) return;

  if(!getPaddedBounds().intersects(poly.getBounds())) return;

  // Curve fit equation to normalize zoom window area
  var areaZoomRatio = calcTriArea(latlngs)/Math.exp(14.2714860198866-1.384987247*map.getZoom());
  var countForMUDisplay = L.LineUtil.simplify(poly._originalPoints, FIELD_MU_DISPLAY_POINT_TOLERANCE).length

  // Do nothing if zoom did not change. We need to recheck the field if the
  // zoom level is different then when the field was rendered as it could
  // now be appropriate or not to show an MU count
  if(old) {
    var layerCount = 0;
    old.eachLayer(function(item) {
        layerCount++;
    });
    // Don't do anything since we already have an MU display and we still want to
    if(areaZoomRatio > FIELD_MU_DISPLAY_AREA_ZOOM_RATIO && countForMUDisplay > 2 && layerCount === 2) return;
    // Don't do anything since we don't have an MU display and don't want to
    if(areaZoomRatio <= FIELD_MU_DISPLAY_AREA_ZOOM_RATIO && countForMUDisplay <= 2 && layerCount === 1) return;
    removeByGuid(ent[0]);
  }

  // put both in one group, so they can be handled by the same logic.
  if (areaZoomRatio > FIELD_MU_DISPLAY_AREA_ZOOM_RATIO && countForMUDisplay > 2) {
    // centroid of field for placing MU count at
    var centroid = [
      (latlngs[0].lat + latlngs[1].lat + latlngs[2].lat)/3,
      (latlngs[0].lng + latlngs[1].lng + latlngs[2].lng)/3
    ];

    var fieldMu = L.marker(centroid, {
      icon: L.divIcon({
        className: 'fieldmu',
        iconSize: [70,12],
        html: digits(ent[2].entityScore.entityScore)
        }),
      clickable: false
      });
    var f = L.layerGroup([poly, fieldMu]);
  } else {
    var f = L.layerGroup([poly]);
  }
  f.options = {
    vertices: reg,
    lastUpdate: ent[1],
    creationZoom: map.getZoom(),
    guid: ent[0],
    data: ent[2]
  };

  // However, LayerGroups (and FeatureGroups) don’t fire add/remove
  // events, thus this listener will be attached to the field. It
  // doesn’t matter to which element these are bound since Leaflet
  // will add/remove all elements of the LayerGroup at once.
  poly.on('remove', function() { delete window.fields[this.options.guid]; });
  poly.on('add',    function() {
    // enable for debugging
    if(window.fields[this.options.guid]) console.warn('duplicate field detected');
    window.fields[this.options.guid] = f;
    this.bringToBack();
  });
  f.addTo(fieldsLayer);
}


// looks for the GUID in either the layerGroup or entityHash, depending
// on which is faster. Will either return the Leaflet entity or null, if
// it does not exist.
// For example, to find a field use the function like this:
// field = findEntityInLeaflet(fieldsLayer, fields, 'asdasdasd');
window.findEntityInLeaflet = function(layerGroup, entityHash, guid) {
  // fast way
  if(map.hasLayer(layerGroup)) return entityHash[guid] || null;

  // slow way in case the layer is currently hidden
  var ent = null;
  layerGroup.eachLayer(function(entity) {
    if(entity.options.guid !== guid) return true;
    ent = entity;
    return false;
  });
  return ent;
}



// LOCATION HANDLING /////////////////////////////////////////////////
// i.e. setting initial position and storing new position after moving

// retrieves current position from map and stores it cookies
window.storeMapPosition = function() {
  var m = window.map.getCenter();

  if(m['lat'] >= -90  && m['lat'] <= 90)
    writeCookie('ingress.intelmap.lat', m['lat']);

  if(m['lng'] >= -180 && m['lng'] <= 180)
    writeCookie('ingress.intelmap.lng', m['lng']);

  writeCookie('ingress.intelmap.zoom', window.map.getZoom());
}


// either retrieves the last shown position from a cookie, from the
// URL or if neither is present, via Geolocation. If that fails, it
// returns a map that shows the whole world.
window.getPosition = function() {
  if(getURLParam('latE6') && getURLParam('lngE6')) {
    console.log("mappos: reading email URL params");
    var lat = parseInt(getURLParam('latE6'))/1E6 || 0.0;
    var lng = parseInt(getURLParam('lngE6'))/1E6 || 0.0;
    var z = parseInt(getURLParam('z')) || 17;
    return {center: new L.LatLng(lat, lng), zoom: z};
  }

  if(getURLParam('ll')) {
    console.log("mappos: reading stock Intel URL params");
    var lat = parseFloat(getURLParam('ll').split(",")[0]) || 0.0;
    var lng = parseFloat(getURLParam('ll').split(",")[1]) || 0.0;
    var z = parseInt(getURLParam('z')) || 17;
    return {center: new L.LatLng(lat, lng), zoom: z};
  }

  if(readCookie('ingress.intelmap.lat') && readCookie('ingress.intelmap.lng')) {
    console.log("mappos: reading cookies");
    var lat = parseFloat(readCookie('ingress.intelmap.lat')) || 0.0;
    var lng = parseFloat(readCookie('ingress.intelmap.lng')) || 0.0;
    var z = parseInt(readCookie('ingress.intelmap.zoom')) || 17;

    if(lat < -90  || lat > 90) lat = 0.0;
    if(lng < -180 || lng > 180) lng = 0.0;

    return {center: new L.LatLng(lat, lng), zoom: z};
  }

  setTimeout("window.map.locate({setView : true});", 50);

  return {center: new L.LatLng(0.0, 0.0), zoom: 1};
}




// ENTITY DETAILS TOOLS //////////////////////////////////////////////
// hand any of these functions the details-hash of an entity (i.e.
// portal, link, field) and they will return useful data.


// given the entity detail data, returns the team the entity belongs
// to. Uses TEAM_* enum values.
window.getTeam = function(details) {
  var team = TEAM_NONE;
  if(details.controllingTeam.team === 'ALIENS') team = TEAM_ENL;
  if(details.controllingTeam.team === 'RESISTANCE') team = TEAM_RES;
  return team;
}



} // end of wrapper

// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
