// Magnet Tracker
// Version 0.5.0 BETA!
// 2012-12-02
// Copyright (c) 2010-2012, Byron Rogers
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Magnet Tracker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			Magnet Tracker
// @namespace		http://www.MagnetTracker.com
// @description		Adds menu (bottom right) with magnet link + user definable trackers either globally or site specific. Supports sending magnet links to WebUI. (uTorrent)
// @version			0.5.0
// @notes			Visit <a href="http://www.MagnetTracker.com" target="_blank">MagnetTracker.com</a> for game giveaway contest details!<br/>^Celebrating the v0.5.0 launch.<br/>Script namespace changed to http://www.MagnetTracker.com<br/>^Due to this change Trackers and Lists are reset. Sorry!<br/>^Remove the old Magnet Tracker (v0.4.3 or below) from your Greasemonkey scripts!<br/>^Upgrade instructions overlay added.<br/>Added ability to send magnet links to WebUI.<br/>^Added support for uTorrent WebUI.<br/>^Tested with uTorrent 3.2 and WebUI 2012-05-05.<br/>^Updates will add support for Deluge, Transmission and Vuze.<br/>Added WebUI Connections menu section.<br/>^Will list all enabled connections.<br/>Added ability for Magnet/WebUI links to auto regenerate on overlay close.<br/>^Only regenerates links if changes made to Trackers/Lists/WebUI.<br/>^Only applies to active window/tab.<br/>Added upgrade checks for Lists, Trackers, WebUI.<br/>^Existing json_* values will now be updated if possible instead of resetting to defaults.<br/>Added ability to open overlay to specific tab.<br/>^If no WebUI connections are setup the menu link will open the overlay WebUI tab.<br/>Added row background color on hover.<br/>^Applies to Magnet Link and WebUI Connections.<br/>Added Twitter link @MagnetTracker along with @Daem0nX (Developer)<br/>Added Foundation 2.2.1 CSS Framework by ZURB<br/>^Known issue - font size is sometimes different if source site is using html * override.<br/>Added webkit rounded corners for Chrome.<br/>Added sites to parse.<br/>Fixed BTIH detection for sites that changed code.<br/>^Added error catching for BTIH that return empty or undefined.<br/>Fixed Trackers version number not being added to JSON if upgrading.<br/>Fixed Trackers being added even if not unique Trackers > Add Tracker.<br/>^If any Trackers have an invalid address none will be added until they are all correct.<br/>Fixed donation section not setting the correct height if the error section was active.<br/>Changes to Configuration overlay.<br/>^Added WebUI tab, removed Misc tab.<br/>^Added inline error and success messages.<br/>^Updated overlay look and feel with Foundation CSS.<br/>Changed Lists and Trackers variables and storage names.<br/>^Changed gm_lists and storage lists to json_lists<br/>^Changed gm_trackers and storage atrackers to json_trackers.<br/>^Old lists and atrackers are removed from storage when you uninstall the old script.<br/>Changed error menu, more dynamic with new messages.<br/>^Added new error message with instructions if no trackers are defined.<br/>^Added new error message if no BTIH is detected.<br/>^Default error message now includes site URL address to copy.<br/>Changed Default Trackers on install.<br/>^udp://openbittorrent.com:80 udp://publicbt.com:80 udp://ccc.de:80 udp://istole.it:80<br/>Changed Default List, now populated with Default Trackers on install.<br/>Changed behavior of Twitter and Donate buttons.<br/>^Requires click to show areas, mouseover removed, mouseout to hide.<br/>Modified addition and removal of sites/trackers/lists to use splice().<br/>^Updates JSON after all actions are complete instead of after each action.<br/>Modified script meta data.<br/>^Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.<br/>Upgraded jQuery from 1.7.1 to 1.8.3.<br/>^Changed jQuery calls .bind() and .unbind() to .on() and .off().
// @include			http*://magnettracker.com/testbtih
// @include			http*://www.magnettracker.com/testbtih
// @include			http*://www.legaltorrents.com/torrents/*
// @include			http*://www.clearbits.net/torrents/*
// @include			http*://www.mininova.org/tor/*
// @include			http*://torrentz.com/*
// @include			http*://www.torrentz.com/*
// @include			http*://torrentz.eu/*
// @include			http*://www.torrentz.eu/*
// @include			http*://btjunkie.org/torrent/*
// @include			http*://www.btmon.com/*
// @include			http*://www.torrenthound.com/hash/*
// @include			http*://thepiratebay.se/torrent/*
// @include 		http*://tpb.pirateparty.org.uk/torrent/*
// @include			http*://rarbg.com/torrents/*/download/*
// @include			http*://www.rarbg.com/torrents/*/download/*
// @include			http*://www.torrents.net/torrent/*
// @include			http*://isohunt.com/torrent_details/*
// @include			http*://isohunt.com/lite/files/*
// @include			http*://www.kat.ph/*.html
// @include			http*://kat.ph/*.html
// @include			http*://www.seedpeer.me/details/*
// @include			http*://www.torrentzap.com/torrent/*
// @include			http*://www.torrentr.eu/torrents/*
// @include			http*://www.mac-torrents.com/torrents.php?mode=details&id=*
// @include			http*://mac-torrents.com/torrents.php?mode=details&id=*
// @include			http*://torrentpump.com/download/*
// @include			http*://extratorrent.com/torrent/*
// @include			http*://www.h33t.com/details.php?id=*
// @include			http*://h33t.com/details.php?id=*
// @include			http*://www.h33t.com/tor/*/*
// @include			http*://h33t.com/tor/*/*
// @include			http*://www.monova.org/details/*/*
// @include			http*://www.fulldls.com/*
// @include			http*://www.realtorrentz.eu/details.php?id=*
// @include			http*://www.btscene.com/details/*/*
// @include			http*://www.btscene.com/details.php?id=*
// @include			http*://www.btscene.eu/details/*
// @include			http*://www.btscene.eu/details.php?id=*
// @include			http*://dnbtracker.org/torrents-details.php?id=*
// @include			http*://www.dnbtracker.org/torrents-details.php?id=*
// @include			http*://wikileaks.org/wiki/*
// @include			http*://www.wikileaks.org/wiki/*
// @include			http*://wikileaks.com/wiki/*
// @include			http*://www.wikileaks.com/wiki/*
// @include			http*://wikileaks.info/wiki/*
// @include			http*://*.wikileaks.info/wiki/*
// @include			http*://eztv.it/ep/*
// @include			http*://torrindex.com/torrent/*/*
// @include			http*://www.bt-chat.com/details.php?id=*
// @include			http*://www.newtorrents.info/index.php/*/*
// @include			http*://www.newtorrents.info/torrent/*/*
// @include			http*://youtorrent.com/*/*/*
// @include			http*://www.youtorrent.com/*/*/*
// @include			http*://www.legittorrents.info/index.php?page=torrent-details&id=*
// @include			http*://bt.etree.org/details.php?id=*
// @include			http*://linuxtracker.org/index.php?page=torrent-details&id=*
// @include			http*://torrent.ibiblio.org/torrents/*
// @include			http*://biotorrents.net/details.php?id=*
// @include			http*://www.biotorrents.net/details.php?id=*
// @include			http*://www.torrentreactor.net/torrents/*/*
// @include			http*://www.limetorrents.com/*
// @include			http*://www.1337x.org/torrent/*/*
// @include			http*://1337x.org/torrent/*/*
// @include			http*://www.torrentcrazy.com/torrent/*/*
// @include			http*://www.torrentdownload.ws/*/*
// @include			http*://www.elitetorrent.pl/*,*
// @include			http*://bitspider.info/torrent/*/*
// @include			http*://bitsnoop.com/*.html
// @include			http*://yourbittorrent.com/torrent/*/*
// @include			http*://www.torrentbit.net/torrent/*/*
// @include			http*://www.mnova.eu/torrent/*/*
// @include			http*://fenopy.eu/torrent/*
// @include			http*://www.vertor.com/torrents/*/*
// @include			http*://www.torrentstate.com/*.html
// @include			http*://www.sumotorrent.com/*/details/*/*
// @include			http*://www.bittorrent.am/download-torrent/*/*
// @include			http*://bittorrent.am/download-torrent/*/*
// @include			http*://www.sceneunderground.org/torrents-details.php?id=*
// @include			http*://sceneunderground.org/torrents-details.php?id=*
// @include			http*://www.silvertorrents.me/*.html
// @include			http*://www.torrentdownloads.me/torrent/*/*
// @include			http*://btdigg.org/search?info_hash=*
// @include			http*://www.piratereverse.info/torrent/*
// @include			http*://piratereverse.info/torrent/*
// @include			http*://malaysiabay.org/torrent/*
// @include			http*://www.malaysiabay.org/torrent/*
// @include			http*://www.torcatch.net/torrent/*
// @include			http*://torcatch.net/torrent/*
// @exclude			http*://www.legaltorrents.com/torrents/
// @exclude			http*://www.clearbits.net/torrents/
// @exclude			http*://btjunkie.org/torrent/
// @exclude			http*://torrentz.com/
// @exclude			http*://www.torrentz.com/
// @exclude			http*://torrentz.eu/
// @exclude			http*://www.torrentz.eu/
// @exclude			http*://torrentz.com/search?*
// @exclude			http*://www.torrentz.com/search?*
// @exclude			http*://torrentz.eu/search?*
// @exclude			http*://www.torrentz.eu/search?*
// @exclude			http*://www.btmon.com/
// @exclude			http*://www.torrenthound.com/hash/
// @exclude			http*://rarbg.com/torrents/*/download/
// @exclude			http*://www.rarbg.com/torrents/*/download/
// @exclude			http*://www.torrents.net/torrent/
// @exclude			http*://isohunt.com/torrent_details/
// @exclude			http*://www.kat.ph/
// @exclude			http*://kat.ph/
// @exclude			http*://www.seedpeer.me/details/
// @exclude			http*://www.torrentzap.com/torrent/
// @exclude			http*://www.torrentr.eu/torrents/
// @exclude			http*://torrentpump.com/download/
// @exclude			http*://extratorrent.com/torrent/
// @exclude			http*://www.fulldls.com/
// @exclude			http*://www.limetorrents.com/
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// ==/UserScript==

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// Update Notification System
// ========================================================
// === Edit the next four lines to suit your script. ===
var scriptName = 'Magnet Tracker';
var scriptId = '71670';
var scriptVersion = '0.5.0';
var scriptUpdateText = 'Visit <a href="http://www.MagnetTracker.com" target="_blank">MagnetTracker.com</a> for game giveaway contest details!<br/>^Celebrating the v0.5.0 launch.<br/>Script namespace changed to http://www.MagnetTracker.com<br/>^Due to this change Trackers and Lists are reset. Sorry!<br/>^Remove the old Magnet Tracker (v0.4.3 or below) from your Greasemonkey scripts!<br/>^Upgrade instructions overlay added.<br/>Added ability to send magnet links to WebUI.<br/>^Added support for uTorrent WebUI.<br/>^Tested with uTorrent 3.2 and WebUI 2012-05-05.<br/>^Updates will add support for Deluge, Transmission and Vuze.<br/>Added WebUI Connections menu section.<br/>^Will list all enabled connections.<br/>Added ability for Magnet/WebUI links to auto regenerate on overlay close.<br/>^Only regenerates links if changes made to Trackers/Lists/WebUI.<br/>^Only applies to active window/tab.<br/>Added upgrade checks for Lists, Trackers, WebUI.<br/>^Existing json_* values will now be updated if possible instead of resetting to defaults.<br/>Added ability to open overlay to specific tab.<br/>^If no WebUI connections are setup the menu link will open the overlay WebUI tab.<br/>Added row background color on hover.<br/>^Applies to Magnet Link and WebUI Connections.<br/>Added Twitter link @MagnetTracker along with @Daem0nX (Developer)<br/>Added Foundation 2.2.1 CSS Framework by ZURB<br/>^Known issue - font size is sometimes different if source site is using html * override.<br/>Added webkit rounded corners for Chrome.<br/>Added sites to parse.<br/>Fixed BTIH detection for sites that changed code.<br/>^Added error catching for BTIH that return empty or undefined.<br/>Fixed Trackers version number not being added to JSON if upgrading.<br/>Fixed Trackers being added even if not unique Trackers > Add Tracker.<br/>^If any Trackers have an invalid address none will be added until they are all correct.<br/>Fixed donation section not setting the correct height if the error section was active.<br/>Changes to Configuration overlay.<br/>^Added WebUI tab, removed Misc tab.<br/>^Added inline error and success messages.<br/>^Updated overlay look and feel with Foundation CSS.<br/>Changed Lists and Trackers variables and storage names.<br/>^Changed gm_lists and storage lists to json_lists<br/>^Changed gm_trackers and storage atrackers to json_trackers.<br/>^Old lists and atrackers are removed from storage when you uninstall the old script.<br/>Changed error menu, more dynamic with new messages.<br/>^Added new error message with instructions if no trackers are defined.<br/>^Added new error message if no BTIH is detected.<br/>^Default error message now includes site URL address to copy.<br/>Changed Default Trackers on install.<br/>^udp://openbittorrent.com:80 udp://publicbt.com:80 udp://ccc.de:80 udp://istole.it:80<br/>Changed Default List, now populated with Default Trackers on install.<br/>Changed behavior of Twitter and Donate buttons.<br/>^Requires click to show areas, mouseover removed, mouseout to hide.<br/>Modified addition and removal of sites/trackers/lists to use splice().<br/>^Updates JSON after all actions are complete instead of after each action.<br/>Modified script meta data.<br/>^Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.<br/>Upgraded jQuery from 1.7.1 to 1.8.3.<br/>^Changed jQuery calls .bind() and .unbind() to .on() and .off().';
// === Stop editing here. ===

var debugUpdate = false;
//var debugSettings = true;
var debugSettingsTab = ""; //about|trackers|lists|webui|rescue|help
var debugGM = false;
var isWebkit = false;
var donationLink_paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JN2PDC96A4NWY';
var donationLink_flattr = 'https://flattr.com/thing/412441/Magnet-Tracker';
var chunkhashRefresh = false;

function GMlog(text) {
	if (debugGM) {
		//GM_log(text);
		//console.log(text);
		//use unsafeWindow due to Greasemonkey / Firebug issue
		unsafeWindow.console.log(text);
		// or
		//alert(text);
	}
}

// Sites without Magnet or BTIH
//  swarmthehive.com
//  demonoid.me
//  torrentfunk.com
//	torlock.com
//  take.fm - BTIH on separate page (tab torrent details)
//  usniff.com - meta search pulling from others live
//
// Sites that have BTIH but unuseable url structure
//  torrent.tm
//  publichd.eu
//  0torrent.com
//
// Sites that dropped BTIH
//  

//Array of sites to choose from
// for trackers / list setup
var asites = [''
	+'legaltorrents.com',''
	+'clearbits.net',''
	+'mininova.org',''
	//+'torrentz.com',''
	+'torrentz.eu',''
	+'btjunkie.org',''
	+'btmon.com',''
	+'torrenthound.com',''
	+'thepiratebay.se',''
	+'tpb.pirateparty.org.uk', ''
	+'rarbg.com',''
	+'torrents.net',''
	+'isohunt.com',''
	+'kat.ph',''
	+'seedpeer.me',''
	+'torrentzap.com',''
	+'torrentr.eu',''
	+'mac-torrents.com',''
	+'torrentpump.com',''
	+'extratorrent.com',''
	+'h33t.com',''
	+'monova.org',''
	+'fulldls.com',''
	+'realtorrentz.eu',''
	+'btscene.com',''
	+'btscene.eu',''
	+'dnbtracker.org',''
	+'wikileaks.com',''
	+'wikileaks.org',''
	+'wikileaks.info',''
	+'eztv.it',''
	+'torrindex.com',''
	+'bt-chat.com',''
	+'newtorrents.info',''	
	+'youtorrent.com',''
	+'legittorrents.info',''
	+'etree.org',''
	+'linuxtracker.org',''
	+'ibiblio.org',''
	+'biotorrents.net',''
	+'torrentreactor.net',''
	+'limetorrents.com',''
	+'1337x.org', ''
	+'torrentcrazy.com', ''
	+'torrentdownload.ws', ''
	+'elitetorrent.pl', ''
	+'bitspider.info', ''
	+'bitsnoop.com', ''
	+'yourbittorrent.com', ''
	+'torrentbit.net', ''
	+'mnova.eu', ''
	+'fenopy.eu', ''
	+'vertor.com', ''
	+'torrentstate.com', ''
	+'sumotorrent.com', ''
	+'bittorrent.am', ''
	+'sceneunderground.org', ''
	+'silvertorrents.me', ''
	+'torrentdownloads.me', ''
	+'btdigg.org', ''
	+'piratereverse.info', ''
	+'malaysiabay.org', ''
	//+'bittrend.com', ''
	+'torcatch.net'
	+''];
//Sort
//alert(asites.length-1);
//GMlog('asites.length = '+(asites.length-1));
asites = asites.sort().reverse();
//Reverse for ASC in listbox
//asites = asites.reverse();
//alert(asites);

/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);

//Extend to allow :regex
//  Can't use regex in :contains
jQuery.extend( jQuery.expr[':'], { regex: function(a, i, m, r) { var r = new RegExp(m[3], 'ig'); return r.test(jQuery(a).text()); } });

/* jQuery browser and OS detection plugin  http://www.stoimen.com/blog/2009/07/16/jquery-browser-and-os-detection-plugin/ */
(function(){var a={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var b=0;b<e.length;b++){var c=e[b].string;var d=e[b].prop;this.versionSearchString=e[b].versionSearch||e[b].identity;if(c){if(c.indexOf(e[b].subString)!=-1){return e[b].identity}}else{if(d){return e[b].identity}}}},searchVersion:function(c){var b=c.indexOf(this.versionSearchString);if(b==-1){return}return parseFloat(c.substring(b+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};a.init();window.$.client={os:a.OS,browser:a.browser}})();

//======================
//START JSON2
//======================
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
return{stringify:function(value,replacer,space){var i;gap='';indent='';if(space){if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}}
if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined;}
return value;};}else if(typeof replacer==='function'||(typeof replacer==='object'&&typeof replacer.length==='number')){rep=replacer;}else{throw new Error('JSON.stringify');}
return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');},quote:quote};}();}
//======================
//END JSON2
//======================

//Function to parse version numbers - maj.min.patch
//http://maymay.net/blog/2008/06/15/ridiculously-simple-javascript-version-string-to-object-parser/
function parseVersionString(str) {
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}

//http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//=======================
//jQuery noConflict
//=======================
var $ljq = jQuery.noConflict();
if ($ljq.browser.webkit) {
	//GMlog("this is webkit!");
	isWebkit = true;
}

//Store info in LocalStorage for Chrome
/*
if (isWebkit) {
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
}
*/

//http://www.abbreviations.com/acronyms/LANGUAGES2L
//var language = {
//	cur : {name : "English", abbr : "en"},
//	en : {name : "English", abbr : "en"},
//	es : {name : "Spanish", abbr : "es"}
//}
//alert(language.en.name);

//***
//Refactor after json_ update
//drop to only try set catch error
//stringify in set call
//
//***
function update_gmlists() {
	//json_lists = JSON.stringify(json_lists);
	//alert(JSON.stringify(json_lists));
	GM_setValue('json_lists', JSON.stringify(json_lists));
	//GM_setValue('json_lists', json_lists);
	//json_lists = JSON.parse(json_lists);
	GMlog("update_gmlists");
}

function update_gmtrackers() {
	GM_setValue('json_trackers', JSON.stringify(json_trackers));
	GMlog("update_gmtrackers");
}

function update_gmwebui() {
	GM_setValue('json_webui', JSON.stringify(json_webui));
	GMlog("update_gmwebui");
}

//***
//Refactor into single reset for json_
//resetJSON
//***
/*
function resetLists() {
	GM_setValue('lists', '{"ver":"'+lists_ver+'","lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[]}]}');
	json_lists = GM_getValue('lists', '{"ver":"'+lists_ver+'","lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[]}]}');
	json_lists = JSON.parse(json_lists);
}

function json_reset(type) {
	if (type == '' || type == null) {
		alert('json_reset no type defined!');
	} else {
		switch()
	}
}
*/


/*****************
// JSON_LISTS
*****************/
//var lists_upgrade = false;
var lists_ver = "2";
//var lists_default = '{"ver":"'+lists_ver+'", "lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url":"udp://tracker.publicbt.com:80/announce"},{"url":"http://tracker.publicbt.com/announce"},{"url":"udp://tracker.openbittorrent.com:80/announce"},{"url":"http://tracker.openbittorrent.com/announce"}]}]}';
var lists_default = '{"ver":"'+lists_ver+'", "lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url": "udp://tracker.openbittorrent.com:80"},{"url": "udp://tracker.publicbt.com:80"},{"url": "udp://tracker.ccc.de:80"},{"url": "udp://tracker.istole.it:80"}]}]}';
//'{"ver":"'+lists_ver+'","lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[]}]}';
//GM_deleteValue('json_lists');
//v050 upgrade debugging - using old vars
//test upgrade version missing
//GM_setValue('lists', '{"lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url":"http://tracker.openbittorrent.com/announce"},{"url":"udp://tracker.openbittorrent.com:80/announce"},{"url":"http://tracker.publicbt.com:80/announce"},{"url":"udp://tracker.publicbt.com:80/announce"}]},{"list_name":"rarbg","sites":[{"site_name":"rarbg.com"}],"trackers":[{"url":"http://9.rarbg.com:2710/announce"},{"url":"http://10.rarbg.com:80/announce"},{"url":"http://11.rarbg.com:80/announce"}]},{"list_name":"Clearbits","sites":[{"site_name":"clearbits.net"}],"trackers":[{"url":"http://tracker001.clearbits.net:7070/announce"}]},{"list_name":"Test","sites":[{"site_name":"btscene.com"},{"site_name":"btscene.eu"},{"site_name":"dnbtracker.org"},{"site_name":"etree.org"}],"trackers":[{"url":"http://tracker.publicbt.com:80/announce"},{"url":"http://www.mvgroup.org:2710/announce"}]}]}');
//test upgrade from version 2
//GM_setValue('lists', '{"ver":"2", "lists":[{"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url":"http://tracker.openbittorrent.com/announce"},{"url":"udp://tracker.openbittorrent.com:80/announce"},{"url":"http://tracker.publicbt.com:80/announce"},{"url":"udp://tracker.publicbt.com:80/announce"}]},{"list_name":"rarbg","sites":[{"site_name":"rarbg.com"}],"trackers":[{"url":"http://9.rarbg.com:2710/announce"},{"url":"http://10.rarbg.com:80/announce"},{"url":"http://11.rarbg.com:80/announce"}]},{"list_name":"Clearbits","sites":[{"site_name":"clearbits.net"}],"trackers":[{"url":"http://tracker001.clearbits.net:7070/announce"}]},{"list_name":"Test","sites":[{"site_name":"btscene.com"},{"site_name":"btscene.eu"},{"site_name":"dnbtracker.org"},{"site_name":"etree.org"}],"trackers":[{"url":"http://tracker.publicbt.com:80/announce"},{"url":"http://www.mvgroup.org:2710/announce"}]}]}');
//disabled due to namespace change - no longer works
/*
try {
	//check for old lists - copy and delete
	if (GM_getValue('lists', '').length > 0) {
		GMlog("update lists to json_lists");
		//copy value then delete atrackers
		//add json_lists
		GM_setValue('json_lists', GM_getValue('lists', ''));
		GM_deleteValue('lists');
	}
} catch(ex) {}
*/

var json_lists = GM_getValue('json_lists', '');
//json_lists = GM_getValue('json_lists', '');
//alert(json_trackers);
try {
	//alert("json_lists.length "+json_lists.length);
	if (json_lists.length > 0) {
		json_lists = JSON.parse(json_lists);
		//if lists are empty add default set
		if (json_lists.lists.length <= 0) {
			GMlog("json_lists.lists.length = 0");
			GM_setValue('json_lists', lists_default);
			json_lists = JSON.parse(GM_getValue('json_lists'));
		}
		//check for Default list if !exists add default list
		for (var x=json_lists.lists.length-1; x >=0; x--) {
			if (json_lists.lists[x].list_name.toLowerCase() == 'default') {
				//alert("default found! "+x+" of "+(json_lists.lists.length-1));
				GMlog("json_lists.lists default list exists");
				break;
			}
			if (x == 0) {
				GMlog("json_lists.lists no default list");
				//alert("no default list! "+x+" == 0");
				//add default
				//json_lists.lists.splice(0, 0, {"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url":"udp://tracker.publicbt.com:80/announce"},{"url":"http://tracker.publicbt.com/announce"},{"url":"udp://tracker.openbittorrent.com:80/announce"},{"url":"http://tracker.openbittorrent.com/announce"}]});
				json_lists.lists.splice(0, 0, {"list_name":"Default","sites":[{"site_name":"*"}],"trackers":[{"url": "udp://tracker.openbittorrent.com:80"},{"url": "udp://tracker.publicbt.com:80"},{"url": "udp://tracker.ccc.de:80"},{"url": "udp://tracker.istole.it:80"}]});
				GM_setValue('json_lists', JSON.stringify(json_lists));
				json_lists = JSON.parse(GM_getValue('json_lists'));
				//alert(JSON.stringify(json_lists));
			}
		}
	} else {
		GMlog("json_lists.length = 0");
		GM_setValue('json_lists', lists_default);
		json_lists = JSON.parse(GM_getValue('json_lists'));
	}
} catch(ex) {
	//error
	alert("Lists parse error, lists reset to default!");
	GM_setValue('json_lists', lists_default);
	json_lists = JSON.parse(GM_getValue('json_lists'));
}

//Check for ver !exists prepend to JSON
//json_lists = '{"ver":"1", "lists": '+JSON.stringify(json_lists.lists)+'}';
try {
	//if (json_lists.ver < ""+lists_ver+"" || json_lists.ver == undefined) {
	if (json_lists.ver == undefined) {
		//alert('json_trackers.ver < '+lists_ver+'');
		GMlog('json_trackers.ver undefined : added ver');
		GM_setValue('json_lists', '{"ver":"'+lists_ver+'", "lists": '+JSON.stringify(json_lists.lists)+'}');
		json_lists = JSON.parse(GM_getValue('json_lists'));
	} else if (json_lists.ver < ""+lists_ver+"") {
		GMlog('json_lists.ver < '+lists_ver+' : update ver');
		json_lists.ver = lists_ver;
		GM_setValue('json_lists', JSON.stringify(json_lists));
	}
} catch(ex) {
	alert('json_lists err : '+ex.message);
	GM_setValue('json_lists', lists_default);
	json_lists = JSON.parse(GM_getValue('json_lists'));
}

/*****************
// JSON_TRACKERS
*****************/
//var trackers_upgrade = false;
var trackers_ver = "2";
var trackers_default = '{"ver":"'+trackers_ver+'", "trackers": [{"url": "udp://tracker.openbittorrent.com:80"},{"url": "udp://tracker.publicbt.com:80"},{"url": "udp://tracker.ccc.de:80"},{"url": "udp://tracker.istole.it:80"}]}';
//GM_deleteValue('json_trackers');
//v050 upgrade debugging - using old vars
//test upgrade version missing
//GM_setValue('atrackers', '{"trackers": [{"url": "udp://tracker.openbittorrent.com:80"},{"url": "udp://tracker.publicbt.com:80"},{"url": "udp://tracker.ccc.de:80"},{"url": "udp://tracker.istole.it:80"}]}');
//test upgrade from version 1
//GM_setValue('atrackers', '{"ver":"1", "trackers": [{"url": "udp://tracker.openbittorrent.com:80"},{"url": "udp://tracker.publicbt.com:80"},{"url": "udp://tracker.ccc.de:80"},{"url": "udp://tracker.istole.it:80"}]}');
//disabled due to namespace change - no longer works
/*
try {
	//check for old atrackers - copy and delete
	if (GM_getValue('atrackers', '').length > 0) {
		GMlog("update atrackers to json_trackers");
		//copy value then delete atrackers
		//add json_trackers
		GM_setValue('json_trackers', GM_getValue('atrackers', ''));
		GM_deleteValue('atrackers');
	}
} catch(ex) {}
*/

var json_trackers = GM_getValue('json_trackers', '');
//alert(json_trackers);
try {
	//alert("json_trackers.length "+json_trackers.length);
	if (json_trackers.length > 0) {
		json_trackers = JSON.parse(json_trackers);
		//if trackers are empty add default
		if (json_trackers.trackers.length <= 0) {
			GMlog("trackers.trackers.length = 0");
			GM_setValue('json_trackers', trackers_default);
			json_trackers = JSON.parse(GM_getValue('json_trackers'));
		}
	} else {
		GMlog("json_lists.length = 0");
		GM_setValue('json_trackers', trackers_default);
		json_trackers = JSON.parse(GM_getValue('json_trackers'));
	}
} catch(ex) {
	//error
	alert("Trackers parse error, trackers reset to default!");
	GM_setValue('json_trackers', trackers_default);
	json_trackers = JSON.parse(GM_getValue('json_trackers'));
}

//Check for ver !exists prepend to JSON
//json_trackers = '{"ver":"1", "trackers": '+JSON.stringify(json_trackers.trackers)+'}';
try {
	//if (json_trackers.ver < ""+trackers_ver+"" || json_trackers.ver == undefined) {
	if (json_trackers.ver == undefined) {
		//alert('json_trackers.ver < '+trackers_ver+'');
		GMlog('json_trackers.ver undefined : added ver');
		GM_setValue('json_trackers', '{"ver":"'+trackers_ver+'", "trackers": '+JSON.stringify(json_trackers.trackers)+'}');
		json_trackers = JSON.parse(GM_getValue('json_trackers'));
	} else if (json_trackers.ver < ""+trackers_ver+"") {
		GMlog('json_trackers.ver < '+trackers_ver+' : update ver');
		json_trackers.ver = trackers_ver;
		GM_setValue('json_trackers', JSON.stringify(json_trackers));
	}
} catch(ex) {
	alert('json_trackers err : '+ex.message);
	GM_setValue('json_trackers', trackers_default);
	json_trackers = JSON.parse(GM_getValue('json_trackers'));
}

/*****************
// JSON_WEBUI
*****************/
//var webui_upgrade = false;
var webui_ver = "1";
var webui_default = '{"ver":"'+webui_ver+'", "ui":[]}';
//GM_deleteValue('json_webui');
//***** Not tested yet
//test upgrade version missing
//GM_setValue('json_webui', '{"ui":[]}');
//test upgrade from version 1
//GM_setValue('json_webui', '{"ver":"'+webui_ver+'", "ui":[]}');
//***** Above not tested yet
var json_webui = GM_getValue('json_webui', '');
//alert(json_webui);
try {
	//alert("json_webui.length "+json_webui.length);
	if (json_webui.length > 0) {
		json_webui = JSON.parse(json_webui);
		//if ui is empty add default
		//if (json_webui.ui.length <= 0) {
		//	GMlog("webui.ui.length = 0");
		//	GM_setValue('json_webui', webui_default);
		//	json_webui = JSON.parse(GM_getValue('json_webui'));
		//}
	} else {
		//confirm("WebUI empty, webui reset to default!");
		GMlog("json_webui.length = 0");
		GM_setValue('json_webui', webui_default);
		json_webui = JSON.parse(GM_getValue('json_webui'));
	}
} catch(ex) {
	//error
	alert("WebUI parse error, webui reset to default!");
	//confirm("WebUI parse error, webui reset to default!");
	GM_setValue('json_webui', webui_default);
	json_webui = JSON.parse(GM_getValue('json_webui'));
}

//Check for ver !exists prepend to JSON
//json_webui = '{"ver":"1", "ui": '+JSON.stringify(json_webui.ui)+'}';
try {
	//json_webui = JSON.parse(json_webui);
	//if (json_webui.ver < ""+webui_ver+"" || json_webui.ver == undefined) {
	if (json_webui.ver == undefined) {
		//alert('json_webui.ver < '+webui_ver+'');
		GMlog('json_webui.ver undefined : added ver');
		GM_setValue('json_webui', '{"ver":"'+webui_ver+'", "ui": '+JSON.stringify(json_webui.ui)+'}');
		json_webui = JSON.parse(GM_getValue('json_webui'));
	} else if (json_webui.ver < ""+webui_ver+"") {
		GMlog('json_webui.ver < '+webui_ver+' : update ver');
		json_webui.ver = webui_ver;
		GM_setValue('json_webui', JSON.stringify(json_webui));
	}
} catch(ex) {
	alert('json_webui err : '+ex.message);
	GM_setValue('json_webui', webui_default);
	json_webui = JSON.parse(GM_getValue('json_webui'));
}

/*
//json_webui v1
{"ver":"1", "ui": [{"name": "uTorrent Test","hostip": "192.168.1.2","hostport": "12345","hostuser": "user","hostpass": "pass","client": "utorrent","enabled": true,"https": false}]}
*/

//for (var x=0; x <= json_webui.ui.length-1; x++) {
//	alert(json_webui.ui[x].name+"\n"+json_webui.ui[x].hostip+"\n"+json_webui.ui[x].hostport+"\n"+json_webui.ui[x].hostuser+"\n"+json_webui.ui[x].hostpass+"\n"+json_webui.ui[x].client+"\n"+json_webui.ui[x].enabled+"\n"+json_webui.ui[x].https);
//}

//********************************
// Store images in base64 to save bandwidth!
// For icon set links see Notes section
//********************************
var icon_donate_paypal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAwCAYAAAEurLd%2BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTQ1MzYzMUU3Q0YxMTFFMDg0RkVCRkY5NjUwNzIyREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTQ1MzYzMUY3Q0YxMTFFMDg0RkVCRkY5NjUwNzIyREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjhCQ0M3QjdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjhCQ0M3QzdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsztcggAABBkSURBVHjaYvy%2FPDCQ4cvTbgZC4P8ss1v%2F%2F3z7jxf%2F%2B%2FWfBaz6z2eG%2F%2F%2F%2FoxjAyAg0BCjEyASk%2F7IwgBUyOi1nYPj5j8HaTJThzK2PDMXlrgzLb%2F5jmOvGzJCw4y%2FD%2FWR2Bsb%2Fs0xuMYTPVv375z8DMwsjA6P7QYb%2F2%2B0Y%2Fv5jYGBmhJj%2Bl5EZZCIjw9%2FvHyECv4Gu2GDA8PfnJwgf5g4mZgaAAGL8P9vsDiEPM4J8REgRy%2F%2Ffn4A%2BYmT4%2F%2B8%2Fhk%2FBbGYmBqb%2Fvz8z5Ew9BXTdNwZGth8MTE4rGEr3fWT4%2Feszg%2FWy9wz%2FfnxkYPzz5tx%2FoAqwD0Fh9w%2FqYqABDH9BbKAcC8OfT3DfIYO%2FSGyAAGL4PwcYVf%2F%2B%2FKcYAwELAzCQQe6nGDBBoxxkmGXhQYZ%2FwBA7c%2FMDw%2F%2F9wQznrr9jMFThZ3j9%2FhcDDyczUC0jg%2Bmy7wzfgd68k8HDcPHpXwZ9cSYGselfGF5l8TD8%2Bw01jAEY%2FKduvGf4v8OFgQGoUSViG8PdR18Z%2Fu92ZRCP3MvwcokNg8E6ToZn6X%2BBoczAoAA0oMH0HzDkGRiE2JkY%2Fn3%2FBEsRprf%2B%2Bk9SxeZyZg5mYFr6z%2FD3zz8ivAlKh8DowxVmf36TEmbMDAABWCl7l4SiMIw%2FR%2B9NMQ36kpYoGoMiyFzKhi4NDQ71HwT9BQ3u7Q3RJNVauQRCEA0N0dAgVGCzRkS1BPcqVN7bOff0npuomQ1mZzvnwMP78Xsexepd84b%2FdLrCl0ytlNzX%2BTYPkpbmFeU6%2BI%2BjSWGTXudiZB5agNq1%2B%2BE502PObe1kVk2PpqjyMsozHIn5JFXFGAczMggnj3Cae0C%2B8AKmCxQeiT36Lz5ZGE6bWM6WMLZnwnyz8VyukP0dGJnSV2dSGdilNiVHuFvHa4VjMdaL82sSS5whENJwmJrCQE8XgloEg0GJ5CiDQ7TGMxxpw4%2BteQaXU4SoyijcsLp5g%2Fx2HO6xAX0ui9nJCIaiQSzF%2BrGycYXEeAgB4ndngSMWFTDfHejU3vqFwEQfVaXmTmKMW7fST22qlPWoV9FancvIWg7F3Rnvrp6FrGdTLYKq5vCdpAgNKlG4vP7ZgNz9%2FjRE2f6RW6IVlrWZNYh9Cz7LbgMOqThzfhVrizNi5lMA5ssvpKkojuOf290mW1Eya8RcQesPakg5ZhFRKENq9CKISUQMLJMegnwpCKQXIeilHnqKwkE9hC8ZFCUqCdGD%2BKAMCoI0Q0RCE00377brPZ17r5tQQQUX8rzsPhx2zz2%2F8%2Ft8vkeStnZCbLTxJL4ot0yxP9Gh9nSC%2FuZqbAMYzrS6I0PC0EZGYbc2yo5h95O9sFXNcr5JpJ630yT7J4vcqj%2B0g%2BvnKqRwjL87uBIGra8yrKFR%2FircrfPic%2F1urkJ7X4b5rCBRtsDX7zlaT%2B%2BzXrxeShO0HpWWzncWM8XwWUZTs0SuDBHe6aG5bQhCW6SrV61%2BFiMtKJGnVB308z4ZQ431YmR0hnsaeTOlc%2FOIi7YaF5UPNSqSeYk8N5cHZTBwKxZ4Yrs2ceeEi9eTeToiKmcOl1mcEhL6P5Uyz3BKwleKPuAvoep8H7u3l6C9PEVT1xgEfYTLfUzOanK6XJyWJhDazPhMGuXkM%2Fx%2BD98G49R2Zy1T9H7SeT6u01EDl6oVQo%2FyeGVSOVAKn6Xtw9sE7QM5MypwLWrI%2FywcJXW9lKbnVNWgsWsUVgymk8dQCtNcOh%2Bmli0vBUrdTHxZpjMRRmgaty%2Fs4eL9j0QrtzJyL0p6PsNM2kNdUPC4IU%2FBcHNLZgnca2QVLOUUbh3Pyujkob5cxkrJ%2F6LthCqfhZmwZfppfrD%2Fl1z5h9E%2Ftki8I0WiKUj31b0YwilcyAz44sbC2mUi%2B8%2FEbqj2og8ctU%2BC7mBHC9XWSKGUTqjEqYUpliwRXlbmKN4f%2Fjv5rfue%2B4cAzJhrbBRVFMd%2Fsztb9iGVNn1tEUItWsBiUpAS1Gp9gFmjBCP9gCHEGNEoqF9UEuIHjDF%2BtBhqNCE2hrQxMRLpJxAQ5RErNoIutbWlGBJaHtp2uy3dLjsPz9zd7VIKEROMs8ndmcydyfnfe8495%2F8%2Fmt388FGMRBnu%2BQV0SqtriezwuQZSckzJh1tD0m%2FVT6qP0jSuAiUZTk%2FXExeBss2M%2BnNLWlAJ0LU7lblxGShLKbScFtSmyJFr%2B1r%2FLEizf9fXmtPe9eQ%2BULo1HVNMZnTNrxPZfBAtw9jyBOCuLbXcFtBvGtSRAZPPO5OTgJaUedlU4xdb09H1jli8c3SC56s0gkKR6qqL0LIxZWfcN3gpwd6fLzKr0M%2F88hAd3cPkR77CPr6OC%2F2jnJX5eaVBSmX%2BwuCEaF%2BTirKg4lVnhG95ZRFNJz10XDS5t8hDX8zi23MGJaKBGxb56PnTIimmFpd4VMR83XuF9vMGjfVBwqECYR6mwpIJ9LT7fuySOijMdNv6Kt54roqCJ%2FcQ%2B8vkg%2BYoW5uiUi1lr2WLX362Er%2BI4u2tPYx%2Bs5qTfXHqNn3Pl9vuo2uwWBnevcZHfBxqWpLCqSyCH45RGtSQdci8zbkX%2Few7ayBElnC%2B6XDPjL8NR6yn%2FajJ2L7njDLa0TvMyte%2FIzaS4tWGSt5uuJPTX6xk9%2FvLHZ%2FS3jUsIr4YxN0hob6Pv3kMf8jH2ifuYOCyPBbs7x5LsbQ1SUKMvlAN46%2Fl0RLxsmGBh3z5ZlgmOgdtKmdlwsfODiuXEjShsIdPDSllf%2BL0CLpcG19ZwMan5qI%2F2qZUfsWckKrkm5%2Bew0OLZqqFvfTRLyRFdPz66YP09Dv8HAr88EO%2Fxf1h%2BLheY8sRk5Zum4p8GBINc1lsz55p4XTUlpU4DN2cnjwVp8rTSY6m0EM6p3auUP03S4y91fw7%2BLycb6lj664%2B%2FhgYZ01tIYEZqF3dua%2Bf8rIAi%2BcF%2BCRqqZPUWCeAyu20opJda%2B32SszAoQaTymYvs%2BX%2BJzkQmuZhw90WU2is4z47E%2BjRziE1uXp5EXYiJRo2pZ5vXCWsRsCF1x1m%2Fwl5Z8ygqNCHYmSOUQmgzh3LZIEGn%2F2mIetiRdhptZiYjltk1BTbyBnhmTaPsr%2BwwKYpmo6vpcWGspMbV7nvnrlybA8%2Bogxd3XK5K5yHfaB%2BMm85gs%2BcuMKluFgXlz%2B2pJDbA%2FKZGD%2B%2BNpEuqcbUdkxbxMy2wXLXTHoyresmz%2FTpc7xo3kCPXqsxvCLPyte3Q9zgwHsLBYRx434QuebTzWV0IxtT%2F67MmAnZ5kMPqPWY8ZR7CrIZ%2B4%2FqZTqmmFL7%2Fv%2BCbGT5lItYgnKfbbmQuliGzkTMPaBS4%2FwtQLvWGhtVFYS%2Fe%2FfZQivbdwFbKDSlSh%2FEIkaBolBQ5KmYgEGCMeIDIqIIBuIfE4lCUDRA%2FUEEUwJBIJgAQR4iFhTBglQBK62FPgJtoVBa2n3ee5w5d3e7fUkwIanJ3rTZzd57zznzzcyZme%2BMIraMK4ZqzoZjaET7BhK%2BOmR9mkfBzfJrZvjakpCcF4HJG6wQYbC6PbFpowi7Z260uaMxaWFwulxmPy6Kv4KQFqX3HtKqN11qIPQFGGTa4UUgXw5fnaKNIvFpp9sDlXwYrB7A0oIOaaTR7IJhN%2BwhwfJ1AitsWXexLBEKlq9bsDhycmGpdB6DflOttPuZqSZ3e2Viez%2Bjd3f8mVyDWTGaC7zinjMfHtfFHTq6LHPh8mhoowLd0dcq%2BxisTPT49yy%2FZRk9WkKC1e6Gqp%2Fsm7e6BEXbyoAoi1FwevyoMFA8G328MGkQtryXh0gmM%2Fg2C8DvB%2Fq%2F6D3h040shQXktosAmUia0EPaieS8ZjWEIRRYecyFwlKP7N7gJbj9OrWajGFMNM%2FEQWYUjrczRyTnkI0rnQhLfjkwk2pVsPuiF4uOOo06mv73zYiAr%2FE2Lrh1efT52rODjfcIl8CRUrDw6VBHW0woq2zGzuJaIJ6S%2BzYfXpo%2BBGsXZkshth2uwfubLsDl1bDzSDXys2PxaKYDHxeV4fJ1F%2Bqa3JJAshIwAx02jBsRjw%2FmZCA6NgLLN5Ti2x9roZpUjM6JwwYaU2qRhFtc%2BDsOnqqTgo3KisGqBbk4WaehLwnHsj85UMXafKtc9c9XNSw5ZtTvh674sP43F%2BZkWrDujBcVt3U0OoVkz1h3%2FWxAVpyKN3MsGByjwkP3jlZ7Zf7Ehvlcugm5cWRNSQ7ohOiE3Fg%2FHkoQF78b6v7EKwQs0vb2Y9VwtXqlENGJkXhreiri4yJoIhcuVN%2BGi1dCM%2FWJsuKp7BgUn2%2BEmSxufsFADIi1o4nuf7KjAiWXmlDy5y3sPn4VlTsmYnCiDeX1TvJ6Ha0EtsfrlQTatJWncPBEnZyv4LEEfL0iB5vOavjrpsHAsVG%2F%2B4iKGAd9cQJljRp7nwQxxg7ZfHSy1oNWj8DkVAWpUSpcpNg95QRMjY6yWxoOVmnYO9XCTZzyO4%2FLDvB0CgFl13pop9BD86yO0ZBfdrbp%2BHJ%2FldFgRIA0k6WMfPloO%2FfDrkR%2BMGVUArYuz4GF1HejyYVzZI0Hfm1ACwPJz5qN99ndxg53yO678dkORPUxo7nFi%2FomD67U3cHCjRdRfLpBDj1%2FSgo2L8tGS7OGI1WGAnkItpD8nT65hwq%2FG7JrjklWsC5fwQM2DafrBa60CPxCmDPJJztUVeM51ntuHDkKgfLpOSHdmccamahgfIou22C7lseic1LaMRoqNhWb9lajgQQJEHRfLMrE9McTSFZdukwyuZaJBOY9q2hfDeatOS%2Bfi4g04bNXMzCJni0uacSC9Rfh5lWR%2Bt%2BZ8SCZhxfp%2Fe0YnGBHabMHHrLgnEU%2FkaULicbS2WlY8%2FowCeqZej5TULgFE3dI0BV5As9n0C2Poav4SALCYqy%2F5Bow64DhqrR8vJElMC0duNVK4B8hZXsM0CalCPqkraNCkWPwmp8hoCItPWROIWckXZJSPoX2tmn45ngdhwqpkkGJdrwyIQmR9F0Phhwy2VZ6njb%2BCtoMJf9K4DlJOxv312D1rsuorG0zpKKIM%2FWJBGT0txnUKQlUMMKB0nKjSZc7XFnN6xcPw8KZKRyWpEVsv6QSfopUeBZtITPTNCTTELqlXRB2G5XArG2h5zSTJNfZXfdUAodrFNDOII2be00y%2Bgk5xlcXCDy3SXoQE%2FEvptPae6IuRXvNrMje7oRhqfq4ZVamZ1Wy9xu3vfijqlW2AzI2acl2pCXZewzN3LZc2%2BDGd2dvotmpI29oXzycGomKq04039EkwMMH9cGAOBs0siBuql23qwZLCssN36K%2F7UszMXtiMjQKJGzMtO3gTIMRFRm4xEiBDIfokVlmq7npVHCiTsHVVhUPxegYESfALTWNbiMqJkYIpBNg566r0kUZLP5tSPS%2F5BysCWcT1O8%2FbJLd6CIhM1XPX2q9136Z%2F5IvqWSdbxf%2Bjc931cr0g0%2FKfvhoOMZkRdP0vZAiCoK1qskczIV0333N4BV%2F2rX1UD2uNzgxtyBe%2FrBiVn9kktVpnl5aagl0zuD9p8%2F3kYWXMYSmmTO6n%2FzvwKK5Pei1lwiNhgLdJ6XhKyTNCu0hFSLMZ93FDRUEyx1x393w%2FwtWAJugZRklUBdqIXyF4MJttpvHFtFe9aSw2KIRPgvrybrMis9d%2Fg%2BpgX0a2UfHIQAAAABJRU5ErkJggg%3D%3D';
var icon_donate_flattr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAUCAYAAAGykfBeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEY4QkNDNzk3Q0U2MTFFMDg0RkVCRkY5NjUwNzIyREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEY4QkNDN0E3Q0U2MTFFMDg0RkVCRkY5NjUwNzIyREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjhCQ0M3NzdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjhCQ0M3ODdDRTYxMUUwODRGRUJGRjk2NTA3MjJEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsFmLIcAAARaSURBVHjaYmQAgpo5Af8Z8IMLYEWT98X%2FB4HZW2vANIwPAyA%2BI0ghJz8bAyEAEECMRFjLwAAyctXRDrgVMKtRrGxdHUbQJIAAAlsnrsTPQA3A8uXjDwbOtwhPVoWshLOnb6hiyAxoA7Pb1oSjyIFARp8dw4yiQ2A5EAAIIJDLzgNpA0pd1ZKygZERFCDU8OLLex8ZmGCcHMcFDMhsGB%2BdzfFdFswG0ch6QIDp09vvDCAMAjA2KKxgfFC4gMIExn7x5SaYfebGQRQ9oLAnKsqRwb9%2F%2FxmYmBgxxL9%2F%2FMUAEEDgCAAmDQOGQQSA4X%2BBCVuqgIUtctgjA%2FS4wgaQ4wyXXjz6DZhAcfD5%2FXeGXz%2F%2FwEVTvJoxVN6%2F9xRrYkC2QJxdE6ccumdA5r179xEu9h%2BYCEBuALkF5CZwiv3%2Fj4Hhx5ffDMgJDpSwYBkOJNabvBvu4CV7W8GGw9TCLL397ByKGTDxllVhcHNgAGSekoAJXPzzu%2B9gN4DcAsvkAb9%2B%2F13PDSwaWViZaZJmcCVydPDn91%2BGr8CEz8bKHAgQQGCHAcXWD6K0H8jCzs26XkCca9C46MPLb%2BuZuIio1egJQO5hQhcE5Y4A9QKcWRxf9idUhBAqbuBFPbpAkmU9AyMjI8OU%2FQkY2RubBdjqF2yOgdU32NRiOAqULb99%2FgUXkJEyYJCW1EfR1LQ2kKF4riuKRpijkR2Pj41eDqKb9%2FfPP7A7QO5hYgDm1j%2B%2F%2FmItq2D8uuD1wOz6E6XMuXL%2BHphm%2FiiFUanC5GHsD2%2B%2BwS2HVa6g8gpZH8h8kDtA7mEiJvGBCk1QKwYZgPggcVjrh5B6dL1422%2F1S4L%2Bs7Gz0Cw3%2FQdBYHXCxMhIlHpQtcP098c%2FlDpwIAHIHSD3AAQYvETn5GVj4OBlZRgFqODH598M3yEFQSAoPa0XlOJmYONgGQ0ZLAAULqBE9P7Z1%2FVEhxCoEvry%2BRvD37%2F%2F4GKKStLg5huMjQ9gU0esXnLNIMZ8UtxAVGBx%2FpQDFu9NGOKgegRURMPYMIuRAb8AD4OQED9cHayeATkOmxgoUj5%2B%2BIISIcjNV1xmgOpEmD6YneiRjWwuun7k%2BhFnYH3%2F%2BouB9xcHAyuwhMdVACd7QAJqzrZahuvPT2D1CLJnsAUquhpcYqA6F5defGZg04fPXGIDCFQzgepnUDixgFsQX34B2%2FGI7MUnzIlVI3prBN0yUGBi67khA1AKQI91bGL4PIJNbvWxToaXP6%2FjbLaB5EOtyuH82VtrGH6z%2FIXzf377DS5iQOHx%2Fx%2BW2hAojjUbIvfckAGsh4hLT05IMwMh82AxjGwWNjFcbkBu5yKrv%2FnkLLh1hk0%2FxG3lKGakereA9YNaeyAgJydJeEyuoNfjPz%2Bw30XLhhatAbghB0oNjMQ35khtZ318%2BY2BiYef48LPL38YRgFuAAofUDgxQgeaQQ3TetAQEmi0ZsilrP8g%2FB%2BYsICQiXrmAgMIRF0A4saWlA0bAC0Ivj8IYxHPAAAAAElFTkSuQmCC';
var gb_overlay = 'data:image/png;base64,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%3D';
var gb_blank = 'data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw%3D%3D';
var update_grey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABDfSURBVHja7FtpcBVVFu738rKQBEkCBBJIMLIJyCJbIWSGZRgEZIITgRhlEcYygo4MQgrHH4q4jFIloNRYKIwbClMChSIqBZZJaRWlIpBIICAQkCQYlkBCAknI0vN9PX1e3TT93usnxGWcrrrV/bpv973fWb5zzu1+Ll3Xtd/S5tZ+Y1uLAy4t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%3D%3D';
var update_green = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABFCAYAAAAW0YV7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADTNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSIiPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkvPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+YmV0X29uZTwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Po1hJ38AABdpSURBVHja7FsJeFXVtV5nulPmm5kkkEAI0YRAEAoIVLCAShUfTqjoU6RabdXSgkVr66PVV6u1avVRqiDCp8UWan32UZ+VKtjBgSlhCDKGkIRMZL6598z7dO19zh0yMImp9vXd79vf3meffc5Z/xr+tfY5CWdZFvwr/Xj4F/sNOuBDJxvj9zTU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%3D%3D';

//Led Icon Set
var icon_about = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlBJREFUeNpi%2FP%2F%2FPwMy8KvcJwikEoHYGIgNgZgJiC9A8ZxN7U5vkNUzIhvgU7angYOdpVhXXYxVXISbWVSYm4kRqOb1u29%2FX7%2F99vfijZe%2Fv%2F%2F4PWFLl0sthgFexTt7FGQEspxsVDhefv7L%2BOHbX4ZP3%2F8ygGT5OJkZ%2BIFYio%2Fl%2F6GT937cvv92xrZe9yK4Ae7522qV5YUqTU2VOS88%2Bsbw%2By%2FE0GvPn4JpLUlpMM0CdI%2B%2BHBfDxQv3v9%2B8%2B6Z350SvWkanrI1SHOysN7089LkvPv3BiBwks5OUwHTqvHso4aQvw%2Fl%2F955LX798%2FanO9Pf3n2RdDQm2C4%2B%2FMf789Zfh128EhgFkMRA%2B%2F%2FAro4ayGBtIL8uf33%2Fc%2F7Jxsnz58ocBHVg1HwLT8oJiKOK%2FQAQfF0ivL8ufX3803v5gYPr16y%2BGAfsqrMF09OQbGHIvvzAzAfUqAU35%2Ffv1%2Bx%2F%2F%2FzMyMjLgAD9%2FYbruF1AMqJcB5Iy7379%2BE2Nk48BjAKbr%2Fv%2F69Q%2Bo9wnICzv%2FvP9g%2Bl9QlA2XAdi8x%2Fjx4x%2Bg3j1MQFPmvn%2Fy7NfPn7%2F%2Fo4c2KEpBGF0c5Px3jx7%2FAuqdA05Iqo4Tm9mFhUvY5RQ5GIgAPx4%2F%2FPHrzetJt%2Ffnl8OTsqJtbx%2BrkEgmu6wCOyMTE%2Fbw%2BPeP4cfTRz9%2Bv3k1%2Ff7h4iKMzCRn2dXMxMpawCImycbCL8TCxM7OBAmwn%2F%2F%2BfHz%2F5%2FerF7%2F%2F%2Ffo56dHxsiqsuREEZMzaZYBUChAHALESVPghEG8GZecnpypR0jVAgAEAzPVNyh34CewAAAAASUVORK5CYII%3D';
var icon_trackers = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNpi%2FP%2F%2FPwMlgAWb4C4J3mlAKhNNeLrbi89Z6GoZsblgqzjff9ftq1DEdnuGMXi%2F%2FMRIlAt%2BAM38fHADw8%2Fb58F8dlVDsBjRXvj%2Bn4nhy%2FtvDN9efgbzuUS%2BgcVIMICR4du7bwwMklpgPogNEiPaAKBzp%2B9ZvhcjELGpZaQ0GpnwSYaFhf0HYXxq4C7IycnBUBgbGwumFy9ejKFxypQpkEABGQDCHR0d%2F2FsQhhZLcVhwNKyOgo52U6vCV0GTq7EijOUzPT8%2F%2BztJTAGsWFOI1ac5dWzFwxrDveCjQOxYYBYcZAB07c9e5GJnliIFQcIMADqXOBZ2kHeCwAAAABJRU5ErkJggg%3D%3D';
var icon_lists = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAThJREFUeNqUk7%2BuREAUxg%2FZygPovIlolBsRzW4hkWgkNvEoCg0FUSj0XmBbvIk%2FT%2BDPxnUmGRmx3Hu%2F5DPIOT%2FfjBluWRbIsiwEABeuFVmW9Tq8RUCapsvn87k01qwOsZ41j5B5ngms73vouo64bVtomoYYpWka1rlxHIdsAAKYpok8cBy3M8%2FzZESN4wiGYWCtG646BZRlSVxVFXFd10BrEPJ4PAgkCAICuVE6BciyTOZG14feS5K0xfY8D3zfx0V%2FHQDv93tr%2BiZFUUAUxa2HAIZh2ACqqu4SfBvZnl0CXLSiKC4T3O93YHsOCXRdP%2F36rwkQkOf5IS6r5%2FN5ncA0zcv503GXgO4DVJIklwfCtm1gew5TcBxnF%2F8swW4KeBbwDwiCAH8R1tLzQwHRus9d%2BJ8ivPwIMACvvBTYMz6bygAAAABJRU5ErkJggg%3D%3D';
var icon_rescue = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAu1JREFUeNp0U3tIU1Ec%2FrbpplO3taUoynIGPlIpSAh6OQlR8hHDVWSWUSkFJkH5T%2F8GhpUWZZh%2F2JsyfCxS0kzLmYKarswoLMlnbs7nnM097na692oxND%2F4uPwe33fOuef8OIQQuKMx0E9Of87SVNGMWEkP0NTQLEs2mEfd%2BznuBm92bn%2FsMOqzNu9XYmPcVgiDAti8RW%2FEdE8fRhu1mLe7ag4O69VrDLTpyXXRhddTR1vfQWbshB%2BZg%2Bu3ia1xfcSANARfxr2gOKDGp0sF2rT2LiVbZAw0iqByfXc3sc7PEwY9N4pJd2I46d4dyvJzaiR5m5NFKJuNOB0OYtDpSHVs5EtGy9UEiOSeHrzcb%2FfKwBMIQFmtkEZFY2jE0T4%2BMHOB4Y%2B%2Bubrw47mwLy6Cw%2BXi1%2Fs2eFjMabRWgSp%2F0RXdKRX5eTKOtJw4TIZbWkjNjrgnjLs7m1KSSie6ukhn4WXyNXMb%2BZiTQWjtVQ8noBaJuSAGK3z1H9B2tLn5mH46C6uQWN%2BYVxsbGSgT2TL8Q33B9yWgtSquk0BOpsdA2SlYKAF4lKMe68Bq0DdQ8GJ7ycw4GK0HBQ5s8%2FTfJi44%2BWIw8Xpgai5PIRw2M2A3sTGzg1GL2c66CmUiUAJhxnoGXpvC0rk%2BwuXd0hpGy6XPUT1rcsGxRCfFciQ%2BrdzzPH5v1Wrxq0PqsoT7D9MlSWqYFxxgNLRWw7krk8j53oKRYKUS%2Byoesdc01d%2BPhswjHbapyVpGzPMWxqfUaNKlEREQiMXoKSlGX8k1%2BsptYexLLA8JLkuprDwj2xINL4kEutLbMPd2wGpaYFcXBQbA4vKE8tYdNh7TatGSf%2B7F6YHvqn9PuTIhoTa%2BqEg13PQalqpSbKBX4%2FsHsjX7lAGLgwOwhO9CVG4eWgsuNmX36pLWDFNFTMwD6%2BREdoAvIPEG%2BLzlvJ0%2BrGkJMC5yQHF4z%2FKNxsz%2FTiODm1KpYmWcmYlTrKSH%2Fo7z%2BdnZQff%2BPwIMADnNdR%2FaWF%2F8AAAAAElFTkSuQmCC';
var icon_help = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAopJREFUeNp0k19IU1Ecx3%2Fnur9KluafkKVLA4WQUbaI6MkejLAIqgchsH8vKSbMiBUY0kNImBlaFhgUBD1ED5Eklr301F%2FdFGEiOp06mzp1c%2FfPzr13p3NuOra5fvC5v8vv%2Fr7f87uHcxAhBAbHw7AVT17%2FyqHpMqWKcpDCUVyb9DVePLwCCYESDbpf%2FWgzGXUtleUF%2BsK8rIz83Vkcoj3Lq4K6HBRUtycgi5Lc1VR%2FpDXJYGAsBN0vv3VYLbsaqo%2FvNwU2VLQuqBAWVSC0KducATspRdk68vX7tDTpDT5runTUETeoaf7YWlaSe9tuLzO7fALIKoGfM9OJk4LdWgo6Oo%2BtOBPcLq84MbXy8MaVY62ouuF9kcmonzh10pblXpCoIcCwzwu%2F204kGVS1fYFDxfu0d5vFTD4PjfIRPlrOqbJytbJij8E1J6AoVgHLqiaufz4ZhwWrsW%2BMkVkeVZQVGJhWp8hKjWow6yIRJb5aXY8H0gUTa5k9sjOZ9rROwUpFUAIOYzWt6J3jgJbPdY4n1QORDI5qS6mLLC%2BvSYQghFLF%2FU6blmvb3dunwQpQLbAxpkReKEAGE4L%2FRDTNdATjGNXOs18YVNbW7SQn35DaZG3u13LJjsJtBigUUqh2iKMuL9bm%2FTgalcnWLm8x87hWI7XOxl%2F1zWGq7eM8nxr9Qpjvinino6mNibufSNjrlcQw%2F9TRcsajncTeAR88uP%2B2U5%2Bbd92412pEHJd%2BP2IxkBZ8kryy1HvrzgXtKHP%2F6gRuOs87pKVAx8boMC%2F4FzDmxZiixIAhC2JMXPTj8JiLl%2F4sPmK9TMPQJujpn4kv0n7vjYWma5SzlNLN8izlA7vOzrt1SZfkrwADADHTjb87FtdzAAAAAElFTkSuQmCC';
var icon_config = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QkaDBM5i2PCSAAAAfBJREFUOMulkktoE2EUhb%2BZ%2BEyKTRQKgkqwzMaFtt1FrC40FGJm60JwIVSkqLUtElICFQNDQqBrQXRlQIriwomN0GJXgtI2iUkXFYJVadOXhiBERDozbmaGMR3rwrP7ueece%2B%2B5P%2FwnBOcjnVGigArI8Vgi9xdNNJ1RbI7YUlT7r%2FYDqKaZq%2Fj6tQHNbLQd6YxiNBp1I51RDPdaw6pFAcR0RolaZKur19vmZhwFePDwPvFYQgZyACKgDt4cMp4%2BmzAA9fatETbX15A6Jer1r%2Fdas4ndGRUsMYBgFW8MDBqatiXoum7oukZhfk4ovC8CyDsFK7R0sBHpu0i5UmG59gUgGY8l7v7zjE68yr80SpUS3Sd7KJYLmBNMArqrQTCSOgzUrPeVkE7XCYmjR47RbDZ5N%2FcWtzU8TvH4cJi%2BUCcdAS%2FZmU2Ot39LLn1eOtd9qoeAP8BKbfnyhfD5%2Bemp11XAABCDkVQXUHs0JjNbXmS2vEjHQR8A5t5yLv8CSZI4e7rX%2BmR2HiJQHB8OM%2FWmxJamI%2B7zs1Fv2iOaI8vZJ4850O7nTKgXYMxpAMDuXR72%2BA7x88cvsvkFgHCrSS6vUv1Y%2FSNsEWBl4zv7fQHa9np4PvMBIPxpcnTaSTRNkmvrqwtA0r5CMJK6BEw4uNvEO%2BE3N%2BLV9uq8VLwAAAAASUVORK5CYII%3D';
var icon_magnet = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNp0U0toE1EUPTPTpmkiSZNJSkEqBa0uXBjwt1B04aoboZu4zjJFqnThSsjKlVREigU3wZUuXKqUoitRpNQPLiyWomBRDDaTTm2adN7Lm9737ExnMu2By7tv7rlnzvtprutColqtPqShjP%2BYpZhAFCFOqVSa0L0K57xcLBYhQ%2BYU2CdCHNnXExBArVbz84PQzfEFGGOwbdvPD0I3xxfoX3iH146j8vTnRdiFM5Hm9JePDnFiXg5M7gmY8y8xllhR%2BcL8MtZOnooImHPPMZb8AdERWJxbaoUcdKCBb3M%2Fd3bdBEHfY7y9DSEMxQlvIp0md7ifVyqViMCTmXvgbQdC61WciAMWcLAfPI7QNJ%2Bj7xXRYS1Gf2AQuo7H%2BQEj2EzzmGsYqs4dJvlhAbL0p93iahnxwZycXw0K0Hy8f2hQ1dtNpvhdDrQXjX9QG3ns8nk5v%2FEol7lGcUSO5Orp0UtnVd2yO4ov%2BzTvLcyamUI82ffp%2BBCQGB6BfuIcll%2B9QbNuIWlmMXrlIsTSe2yu%2FsS330I6GS3XGyu%2BgMSMmZlOJYypkZyGxOFhpE5fQG9qAGxjHRsf3mLr1yq%2BrwGbW%2Fz29XrjTsiBhwdmdrqvR5vKH3KRjtMx0SK5ANbp2vxt0v3g7t3JunXL40cEJO5ns4XdZztOkaeQG%2FZMrvSmZX0NcncEGABvCBolFO3VMAAAAABJRU5ErkJggg%3D%3D';
var icon_webui = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvFJREFUeNqkU11IU2EY%2Fs7Z2dn%2FbG1BpqmLY0wzCN1FCTUIwhC0jC4iL5VM8Sb6cfNnOIa2K8EyvNErGcTAYWQ%2FRITDAkNBsURtwzJDY3P%2BHD072%2Fnt%2B4YbUpd98MDzPc%2F7vud9X76DybIM%2FucQ%2B75Tf2v5EI0QNRDFB1oY4iXEkN658utwMLbbW3j43o5pjrhUtmqSOGkncMNxHInS3m9JWJsRUkuvOZndeWx0%2FejNFtjyFmT4Q7LovEdTcVvNLb3ludVpXtyPSchQ6I%2FhZEGFkiypVrKzgRS38tFp6lztTxeIeVDHoAsmu3SlV9V06GlCZOJPoOaHWDgofgbilkJrume82KJJhCe41Monj8W95sM23LkncLVx2XzlgW77Q39CYOIeo04zerCH6xBojHE0P82wVYTuaI%2FJ0ardmhhgxMRWCSGIUoOx%2BDLJzL%2Fgk3TsmUGrHuMlbG6ZatVGWJMCfZ7S7lK2yMAdjYq8sEdvWpiv449U1CWSng024qIoVZFaPcFsrgmQj3K80LhsbdJuG0oU127cBAh0TqlioahJB70GGPN8P%2FqdV%2BlyCMhrcEEQbbjA4Gx8XYR8LsnxQ%2FObBGu320EymQQsywLEv8SVHPSGYUw4uROTsNQOyi0keFFKyvSGzIsykCUJ8CwXTogKPYZhIBgMpjdYV1cHkgJQMyyHlkpiMlwLEwMwF%2BCw76Hw9Pt1nk%2F1Qc5BAJ7nAcdxoLy8PA10R0CerW%2Bbg7GD3z6%2Fi8P7MJqjG1btzjyGN%2FmdHaetViAIApiamkprtbW1wAq1cb69owyAnrJ%2Bug3Kbel3MHNXk32Gr3KdBSRJrtbX12e7QAdqQKlUAr%2Ffj7RCt9v9M%2FsvVAwmsgXGurqaKysrgQhbnZycBJFIJK1TFAUcDkd6maFQqBlKrkwOniFOp5MyGAzOvLw8EAgEwOLiYp%2FX68UQEEca8lAMiv2nAJz5nMViASMjIyAajbb4fL77GQ9xpCHPbDaj2LMZ748AAwCVrH9pfLvffQAAAABJRU5ErkJggg%3D%3D';
var icon_tick = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ%2BroKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF%2F%2Fdv9be%2B9trCwAI%2FvIE%2F26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp%2FMl6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L%2Bzg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM%2FWEbzFcDmHvwwBu2wnikg%2BlEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z%2BqM2uCJmuMJmaNZaUrCSIi6X%2BjJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm%2FugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC';

//Famfamfam Icon Set
var icon_error = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLpZPLS5RhFMYfv9QJlelTQZwRb2OKlKuINuHGLlBEBEOLxAu46oL0F0QQFdWizUCrWnjBaDHgThCMoiKkhUONTqmjmDp2GZ0UnWbmfc%2FztrC%2BGbM2dXbv4ZzfeQ7vefKMMfifyP89IbevNNCYdkN2kawkCZKfSPZTOGTf6Y%2Fm1uflKlC3LvsNTWArr9BT2LAf%2BW73dn5jHclIBFZyfYWU3or7T4K7AJmbl%2FyG7EtX1BQXNTVCYgtgbAEAYHlqYHlrsTEVQWr63RZFuqsfDAcdQPrGRR%2FJF5nKGm9xUxMyr0YBAEXXHgIANq%2F3ADQobD2J9fAkNiMTMSFb9z8ambMAQER3JC1XttkYGGZXoyZEGyTHRuBuPgBTUu7VSnUAgAUAWutOV2MjZGkehgYUA6O5A0AlkAyRnotiX3MLlFKduYCqAtuGXpyH0XQmOj%2BTIURt51OzURTYZdBKV2UBSsOIcRp%2FTVTT4ewK6idECAihtUKOArWcjq%2FB8tQ6UkUR31%2BOYXP4sTOdisivrkMyHodWejlXwcC38Fvs8dY5xaIId89VlJy7ACpCNCFCuOp8%2BBJ6A631gANQSg1mVmOxxGQYRW2nHMha4B5WA3chsv22T5%2FB13AIicWZmNZ6cMchTXUe81Okzz54pLi0uQWp%2BTmkZqMwxsBV74Or3od4OISPr0e3SHa3PX0f3HXKofNH%2FUIG9pZ5PeUth%2BCyS2EMkEqs4fPEOBJLsyske48%2F%2BxD8oxcAYPzs4QaS7RR2kbLTTOTQieczfzfTv8QPldGvTGoF6%2F8AAAAASUVORK5CYII%3D';

//Tango Icon Set
var icon_donate = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAopJREFUeNqMkV9IU1Ecx3%2Fn3Lt7192wabqRYFmWvViuwkl%2F6CGI6I8Q6YMRQUOJ1lsPQiDke0JQPRiZCdGgh4IgoXwJegii7A%2BB1oOls9Sp21zb3Lz3nj%2Bde53ploQ%2F%2BHLO%2BZ3f93PO%2BR3EOYcXW8sPA0Cb0BkhQ%2BidUN%2BJSOyZGK39VjG0C%2B3GqrKB6cZwfv8%2BGqjaFHB6S1%2FVdwad7urNEjAOC9NxNtr%2FXI%2B9H7kjCh2Vxw9c3tJ0SHFVVkjYIcNCNM4%2BdfXmclNzzVJridblv36xwe0rleh8ClgqDQ4HRr4j9Y6FmeT%2BMv%2FOQO25o06UyWAyOQPmVBRkzJF7VxWefv1FkxmWWl3lGyUjGgOW1YFTCgg4YE2FmqZGBUsY5b6NAYkLuC5eJ26IXSo4rQM5BGTZ40YkkQKSzAAnVIjYIyTTgCSMuUmApLPAhZlTZrUEkJhj0TsBoHI2keaLc%2FOcLRpoCbAioASoAFgQey1MNgBjyCUzVAA%2ByISy%2FrnhsSslXo9sG%2BmSmZEVo53Ln26FpMgQ%2FTppCmQYPfSV7VE05U3dMb%2BGZYQ5YXnAMowUmBFGkPmdM398nui7EI2HUG6oDx6f6gipmnLj4LWrLnE7xMXdOGd2wzhbZUYAuk5ZYjZjbD%2FbctMbaOy0AVaET3Zcqmtrv603lCkvE4MI1hc9iOcbY8Xo0ycPehO3gudP18Bscva%2FTq%2FHC%2BGB7yCvTu5obnlr3u0OWuafsV92LhY3YOhj0v6BfXs94K1Q%2F9abVHxnEfieSRcLEuORLJgmA5NwiExkC%2Fas2mIAGKQQsK1aA1XFoChYzF3%2F1MrFAJPq9vuWo6ocwF%2B7dg9MOrImoKf70WBovb%2FwR4ABAFkqXFhfHjIDAAAAAElFTkSuQmCC';
var icon_update = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJhSURBVDiNhZNNaNRnEMZ%2F877%2Fj91V1lApiFjxoxQTK2ER0RaFXgWRYnoIwYVSDz148Oyp9OZRe%2BuhElgsLXiQXASvLSKILlHRVuqKVmtNiFnZ7Mf%2Fa8ZDjKzitnOe5zfMPPOImTGqmnX5EhirNWx2VI%2BMAjTrskG8a4GLrch31hr2%2FD8Bzbp8A5SBa8At8e7HsU8mZ4LyOlmav3pZC50C9gD7gVKtYecAgiHYBz6unHFRSfNuGxeW2Hzgi1C8Z%2Fn%2BncPWfdnzlarDVPJe5%2ByaaBhwzYVRNj59opT2%2B2iW4tIlKBJ2HpmOxHvCSpkHc790817n9%2FcBbmTddpi%2BXCLoPQQz%2FKHvAAh%2F%2Bx5MUZmgv%2FisAlxdE7nX%2B38oTs77qKS60saSAbr8CImqSFRFlx9hgxXyzjJBXMqcdz8167IZQG4e54SInB3buj3ctPvT2OUdrN0CzYln5gBIfj4K4pCxbWi8kcU%2F7mZLrb9yUz3tVr0QMMWSPjbo4HdNvREDxDNz%2BPGvsP4KlvQYtl7MbHUF4QcJ46nttT1hlC4STBwl2Ps1APmNWbLbF9H1W2ndvJ1q2r%2Biat%2FWGvbP8B%2BUgc7Htd0%2BSBbAlGByGjDy%2BV9Xp1Y%2F4s%2FrtwyzTbWGLbzrwl4fhlmgA59KFbWC0vxF0JzEVREvRMkKUSnupv3B58CldwEHTDW8f%2B9JZnmKiGPH%2BJZQQuHxvSepFjniQydoGTi4BnBDgBdaFKc0TT4ztXWmxYV%2Fn74YLDxrp1bkl02tolm6r8jyk8Dfbx3xfdWsywZx0sKIzez%2FwzQCcozVOJ8f1fMKwlMw2aBgNl0AAAAASUVORK5CYII%3D';
var icon_update_grey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8%2FL5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N%2BQWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE%2BCDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9%2FNocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A%2FhXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V%2FpHDBYY1hrFGNuayJsym740u2C%2B02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT%2F%2FID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs%2BZmX8xlz7PPryjYVPiuWLskq3RV2ZsK%2FcqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta%2Bx%2F%2B5Em0mzJ%2F%2BdGj%2Ft8AyNmf2zvs9JmHt6vvmCpYtEFrcu%2BbYsc%2Fm9lSGrTq9xWbtvveWGbZtMNm%2FZarJt%2Bw6rnft3u%2B45uy9s%2F4ODOYd%2BHmk%2FJn58xUnrU%2BfOJJ%2F9dX7SRe1LR68kXv13fc5Nm1t379TfU75%2F4mHeY7En%2B59lvhB5efB1%2Flv5dxc%2BNH0y%2Ffzq64Lv4T8Ffp360%2FrP8f9%2FAA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFaSURBVHjaXJHNK0RhFMZ%2F73vn3vlaKCVSYkKpiWKSj6zsbCR2VhoLzaX8G5ZYTFmws7fRxFqajWQWSoMSiVkozUdz7533fS0GY5yzOT09ndNzfhj%2BdmYps9auCEOr3A7xKMJ6MPve0oQB3DRR8hTkQd9qRBRzeoVRpohk9yAEYDqdnZCuEyJlWzwteDVHIrxd%2BDaIvBUsRmoEBPjMO5I4Z1Xv4tfAlWd%2F4qMZB%2FIYJJ8xLgEkuF3yKKRr%2BFRwcCg3p0Aeur1gldZFrjs54WiqKEaAWxpY9FuNRHnrtNI8gYdigDEEhiUKvGAwPzHdLrFvrSRtTYJx4JoHIhR8da43sq%2FNP0QpJy0FDGG4B6LcGNOTLYEEIGUFYFAUKaKBAKfKbCvmNPZdoJAM25Kir5BSRJnj5GfDh9puzJi4On6tv%2Fk6Z2JqsrHJ8y%2BLv7AImzZY%2FMO9nEm3K18DAOHGnx6T6PIeAAAAAElFTkSuQmCC';

// WooFunction Icon Set
var icon_home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8tJREFUeNpibPM0Y%2Fj%2F758jAzsLM%2BObmbb%2FAQKIESTy79dPBoa%2Ff%2F%2F%2BBwGAAGIAicxMCwNzZiYG%2FmdYt3Y1w6tXz%2F%2FfaPH%2B%2F%2F79m%2F8AAQTWw%2FD%2FPwMjExPQtL8MTP%2F%2B%2FxMo2nLif%2FKCzf%2FZJeQsmBRDUtfdmpHO8O3%2BBYZtV%2B%2BxMEkrqzL9%2BMnI8OfffwZhRVUWgABiBpnhrCrN4KQixRBqrvOqrmdil9Kr65Lzjl7cLP3qzj4GZxVph5nluX9Azvj6%2Fdf%2FL0D8%2BcuX%2F7%2F%2B%2Ff%2Ff7u%2Fwk8kqMuGAlJXz4R8%2FvjPcn1%2FA8HGSLcO76yeArvnDoJdW6s7IwMDAIi0tZcrOzi6VmZVdysTMwnDz%2BtUn%2B%2FcfWP3s2bNDAAEE8QcQgFT%2B%2BftPDEi%2FAnqJ4d%2Fv3wxMbOwMTAxQ8Pvv3wDL0KiXqvp6%2F5lFpQKjF277%2F%2F%2FPbwYWkOSfP3%2BW%2BlR3RxnaO4EVb%2BxrWff03HGIzhZ308ev37z%2B%2F%2B3bN6APfv%2F%2F%2BvPP%2F1%2B%2Ffv0%2FtnPr%2Fywr7akM3EygoPz%2F%2F9O3H%2F9fz3T8f6fb7v%2F33%2F%2F%2Bf%2Fz44T8LEyMDU35FBShuQNYw%2FPr0m%2BH%2FL2aG379%2FMXz5%2FJlh9959DEwG%2BvoMX758Agr%2BZPj4lYvh4%2Bf%2FDL9%2F%2FWBgZmZmaGxsBPuOU11dzUdQQEAhPCo6mBkYDn09Xd3s7Bz%2Fbt68uRkgQNNk7NJWFIXx7968p4k1tI2JInHQCkUqjREtLg5WcIiKdHGrrQouZilUSydbWjroEil1rqsgBvwHdCw6iENIVNrBKLEafTXP9%2FKSvHvjyROtZ7lwv3PuuZzvd%2B7mcD%2BElDjSrbZWX%2B2SsEUoJ%2BQ307QWmwJ1HngfdVOKFDltRxYsU7ktctH0MjmDuTj7%2BKSx%2Fkvv5JjSNTwKb40Hf1LJ2K%2Fl77Hj%2FeTZ26%2BxgLepGT%2FGX%2FUL82iDzQ%2F24Ld21RH0qMvB8Itw39Q7tLQ9%2B%2B%2FAvTAsC1vxFWyv%2FMSpbizCLn5g7Q2PR4I1at3I%2B7mxaDT60knMF3EYX4C8PARX3SgaOuoHpuF72kX8c2S1f5gYHpgWp8eqkvirrSeoaEjYbxzLiQGb2Jb6CQKlBBhRlrMfomTqdC9RoUNlZeymT5LpdGZTia%2BtOh75%2FX7k86bjkQ0XmJCwLwrkm4Vy1YMbnmjh8qKAC03Dwf4Bqt1uKHOfPnOatJydnWHPQx30WAnZbBalzlEY7tegzQErS2QKEkw7R7G6CqriQrgzzFOpPbBIJALOOatsMufUmTloQdJ36WQ3oJcrOaRz0tmt5tRdA7%2FS1cDBjYJbAAAAAElFTkSuQmCC';

//Dead Simple Icon Set
var icon_twitter = 'data:image/gif;base64,R0lGODlhDwAPANUAAJnO%2F9br%2F1Oj%2F8jh%2F9nw%2F0%2Bg%2F4fP%2F3PG%2F9js%2F8rl%2F8Hh%2F7La%2F%2Ff7%2F8vm%2F3nF%2F8bj%2F2W5%2F57P%2F8Xi%2F4XE%2F4TE%2F0qh%2F9zu%2F2y6%2F9rt%2F%2BDw%2F8nk%2F1%2Bv%2F8Hg%2F8Dg%2F0yk%2F%2FX6%2F8Pi%2F2i1%2F0ih%2F7fb%2F5%2FR%2F1ax%2F0ii%2F1q0%2F1Ot%2F0Kb%2F0We%2Fz2W%2F0yl%2F2fC%2F2C7%2F0%2Bp%2F2O%2B%2F124%2F2XA%2Fz%2BY%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAZ8QIKhRSwaWwbCQcZsOpsHmNShIEmvWJdWQvtov%2BCYuEFjiM%2Fok1pDa7stEPWpRH%2B47xd6CcUHtQGAABN8fC%2BGHG2GiossjQttIY2SkiaVFG4YCAgdHpUmKqAiGXdtG6AqKakpFREJAa8jqKkCM7W2t7YCAwUrvb6%2FKwUDQQA7';

//Windows 8 Metro UI
var icon_webui_utorrent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5Q0YxNjE0MDlBMTFFMTkzMzhGQkUxNDU2Q0NBMjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5Q0YxNjI0MDlBMTFFMTkzMzhGQkUxNDU2Q0NBMjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlDRjE1RjQwOUExMUUxOTMzOEZCRTE0NTZDQ0EyMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlDRjE2MDQwOUExMUUxOTMzOEZCRTE0NTZDQ0EyMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPjLAQPEAAALNSURBVHjaYgxd4%2Frjz3cGv5V2%2F%2F%2F%2FBwggxpA1LowMjCzff39jYmQCCCAGIO%2Fd9zf%2FwYAJKC7IIfz628vvf74BBBAjUNfX31%2BYGZk5WDiZamzbt0Yc%2B%2FX317%2F%2F%2FxiASied6njy6eGxJwcZ8ncmei23BAoBjQcIIJCen39%2FVtu0mUlZM4BB5vZooPkMQCX33t%2F2XGYBsanhYMnk0537HuxgArpBUUDFXdkP6BCg0PGnh3TFDGedmwAyCugcVmbW3%2F9%2By%2FDKKQqq7r63hZ2ZAyCAQBJAc3%2F8%2BcHA8P%2Fv%2F79crNxAdUARFkZGRl42%2FlXBqyA2X351ruZAAVAH06%2B%2FP%2Bf4rAK5nIFh0umOnfc2dzlP%2F8%2FwnwFoovcKq57jjRBXuSwxApJAESYRLrFsk9IDD3dBjOLnEKzen8fFws204%2B5GT%2BUAoFDoWtcJp1pNpaz%2BMfwDGsVy4snhT78%2BKguqc7JwJupn87MLVOzLBjqMiY2ZPXaDnyCH0PU3ly%2B%2FOh%2B13gsYEEADAAIM6g%2Bgkl%2F%2FfgG9oi1qYChhJsUrAxR58eXp%2BZenL788%2F5%2FhHxsTO8ipQP8BMTAsRLhEm%2Bz7JXmkGZAAMKJMpKyArv7y61PdgaJnX56wMbEx%2Ffj7HRgPKQa57UerI9d7Xnh5Bq7h9rsbmduiYzb4fPv9dZrnEktpO2CUg%2BLfQ8XfXNoWGKhff33pOFbz%2FMsTiAYDcZMyqwZgMirenfb08%2BMonSRWJlamP%2F%2F%2BvP76AihdYd0swCH0%2B%2B%2BvrO0xhx7tgegBms3CxPLv%2F9%2FUrWFlezNZmdlAiQ8o0eY0WVVQ49Krc3UHCoGi7Mzs3%2F98B6Y0HTGDDOMiMS4JoA2le9KByQ2cDBgZgYlVRUij0Lz6yusLU8%2F0sDAy19l1G0mYAc16%2BPHe9LO9V19fBLoZlLwhwQoBQKuBLgTGANBjf%2F7%2F%2BQ1OvqDkzMgEVwMAGvtUquIVM9UAAAAASUVORK5CYII%3D';

//Icons from Wiki pages
var icon_webui_deluge = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5Q0YxNjU0MDlBMTFFMTkzMzhGQkUxNDU2Q0NBMjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5Q0YxNjY0MDlBMTFFMTkzMzhGQkUxNDU2Q0NBMjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlDRjE2MzQwOUExMUUxOTMzOEZCRTE0NTZDQ0EyMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlDRjE2NDQwOUExMUUxOTMzOEZCRTE0NTZDQ0EyMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPviErEAAAAOESURBVHjaYv7%2F%2Fz%2FDkxfvzRlAjMWHnvwHCCBGBwcHBhBg4VIP%2BM8rr8UAEEBgKXYeIb6IyiX%2FQTKMIAGDkM7%2FYT7mDC8%2F%2FWMACABEALv%2FAUZGRgD4%2BPgAAgICADY2NgACw8PDAP4kVv9DaZP809PTAAIHDRcfeW1VAPz%2BAAP%2FAQMEAvbw5euHjJ0A%2Bvf1AP359fwCCGwLJycn2G5Hr8iqGSsP%2F2dkZALzPT09IbayszIxOKZM%2B68pz8%2FALq7M8Pz2VYbPfxn3f7%2B43AmsVFhO3%2BHp0%2BcMUaFeDNaGKgzyOkYM31iEHXlEFFTBVrCxsTExsHB7GvoUP7SP7fxrF1p%2BA6hP293dnQEggBhfvnzJEB4eDrZTWk5F89G9G9eZWVjA%2FP379zMwPHr0iAEGpize%2Bz%2B7onsNjA8ynQnGCSiYeWPZrosM%2FyUMg5UMXJxh4mAFAnLGfkx%2Ff6k72hkz8HAwMzjHlO8BSrGCFfz%2F94dBxSxglbGOAoO%2BniaDrJwMAxPjPwbHtL7TUAX%2FGP7%2BZ2J%2F9vI9g7qCKAMr0IG%2FmDgYODl4dMARx8TCxvDj3f0Ta3e%2Fs%2Fj3n5FBRkWdARhuDDePrJ7OwJAM9wW%2FnKH3StOQ%2Bu9uyd1fpdSt%2B4BinCBfAAQY2CsPHz4ExycaYCqo6DjQOWnxXVY2TkF0SRcXF0QwMDIyMrCzs8MlpVUMrepm7PrBImVg%2F45VSqlrxYl3ziFZ5cgGsLKyQhIfQgiU5BgZDHxy5%2FOKKCds3nmUgZ%2BHk4EXiB9ysjEom3p3aDuG582rjzX%2F8ubRE5guFpjmv%2F8YGLXdcg5JyarZaMgJMqhr2zH84xRi%2BPnrF8O3H38YPn54z%2FDk7h2pmKY1j7fMbc749ePjTHhE%2Ffv7m0FIWt2OjU%2FC5vu3bwzCQvwMxgaaDBpyIgzyEgIMwnwcDFxcPAw8UsoMT1%2B9ZdCzC54oIKEiB3cBKAH%2F%2BPLhMQvT%2F183H7xmY2S8xgBKUFY2FkA5Zoafv%2F8x%2FPj1m%2BHnz18MbMBI%2Fvj%2B2WuGz%2B%2FfwrPZ48ePGdRUlbn%2BMPP7GXvnTP%2FDzC3w%2Bs17BlZmBgZxIR4GQX4eBm5eXgZeASGG%2B5cOn9i3si%2Fd3d3l2o4dO%2F%2BAXQCKQlExiW%2FA7Lni7r5JK%2F7%2B%2Bc3JxMYlxc7FL%2F2cg4v72b%2Ffn759evPwz89vL4AJ54%2BoqDCDoKAQOPQAoXJIB%2BT%2BPqYAAAAASUVORK5CYII%3D';
var icon_webui_transmission = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOTVDNTE0MjM4MTFFMTg2MTg4RDY3MjA0ODlCMEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOTVDNTI0MjM4MTFFMTg2MTg4RDY3MjA0ODlCMEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5NUM0RjQyMzgxMUUxODYxODhENjcyMDQ4OUIwQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5NUM1MDQyMzgxMUUxODYxODhENjcyMDQ4OUIwQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPkdfA8QAAAN9SURBVHjaYvj%2F%2Fz%2FDCgaGe0wMQHC2tFQRIIAYGJiYGECijDdu3Pi%2FYcMGBoAAYgTxAhkZj%2FMnJVk4OzgwgqXNzc33PXv27L%2BJiclsgAAC6WXQ1NfPiGRgmArW22Jn9%2BuekhLzf0ZGJjc3N0YGOTm58rNnz%2F0%2FderUfz5eXiGmhw8fdjIw%2FGd4%2Ffo1w6fPn98BBBDYUHEGBsMDQNG337%2F%2FnyMl9Z2FgUERJA7CYBfKmpqG35s%2Fn2H%2B1KkMvP39HLv3779nbW29hIuLC6Lg7JkzFdevXWOwtLRkuHnzJsPdu3cZ5s%2BfHw0EDxhgRgEBZ15e3n9vb%2B%2BjIA5MHCCAGAIDA8F%2B4ebjU0iQlFwKlP1WXFMDV8Dy4%2Fdvhi4GhlOCBgamXitXMlRLSm6RYkAAptSMjJonDAzKSy5fPpiUmMig0dHh8%2Fnjx5AlS5YwfPr0iYHRx8eHwcjE5JedjQ3r5cuXGWxtbRmWLVvG0NfXBwpxBiawXX%2F%2FsqqrqzN8%2BfKF4cyZMwzh4eEMQYGBj%2F79%2B8fAxM7OzrBr1645IK8BQ59h2rRpYNrUzEyWkZGRBexSHx9vhuqq6v937tz5f%2BHChf%2BzZs36BXSfCpAPCShgxDDcun3rRm9vLwMwhvyfPn3KBtR4R1lZmQEgQNvk8pJAFIXxQzqaIATjixaSIogGUUtBghmNso2Mrdy0Emwnrlq1mE3rQNz5B0gtpJSRVjHQIsVEAgkKyZ2ZaC1ynAeSnTs9qOjsLvd8H%2Ff8vnN1h51PFthtXrdYMnw2Ozoul2dioTC7oKhZC7mlAC73f%2FD55kSEPr8%2FXLBahaXxeEGSZbjHd74GAnA3HEIjHL6RLZaXbqcj7hoM8Ld0g4dO5%2FpIVVd8Xm8kFInE0ISlWy3XY68HG4nEajweh1KpxIiiuIeDr6FkQHS3mL9uMJ1Ote1Y7JxhmGXMG4xGo46S4zigKAq63S7gHTgcjkWn0%2FlUrVY53MezOfwCBp7noVgsQqVSOaVpOiVJ0jwREYGiKDCZTEgMgJ8AcJEgGAwCRpM0mUwuBCrolPP5PLTb7Z6mqpuCILw1m02QkYXb7YZQKKQvXDqdBjSHer0Oz6PRqN%2FvN9HkYwTSSEpWlEatVkva7fYTTdPAZrMByXIwGEAulxPQ4BB7r4iQZVnAF8OvSAgsUijcikajgsfjyeDR%2FEX84J8Y3wHbTq32rK7cpwAAAABJRU5ErkJggg%3D%3D';
var icon_webui_vuze = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOTVDNTU0MjM4MTFFMTg2MTg4RDY3MjA0ODlCMEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOTVDNTY0MjM4MTFFMTg2MTg4RDY3MjA0ODlCMEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5NUM1MzQyMzgxMUUxODYxODhENjcyMDQ4OUIwQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5NUM1NDQyMzgxMUUxODYxODhENjcyMDQ4OUIwQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPnYnQlYAAAOnSURBVHjaYmTxn%2BvO%2FldwOwOPz7p%2F%2F%2F%2F%2F%2FwcQQIzsCUf%2Bcd65wcAA4mU1HPgHEEAMIBGO7GtgaQ7zRf9YQNJ%2F%2F7EzMDBoMnB%2FessAEABEALv%2FAQVpzf8E7ez%2FAevrAAf08OsCAQsS%2Fz0xHgD1vlsABAAGFQIH5eIAuHcnAJSo1wAG%2F%2FwAAgXo5wABAQEA4t%2FrAP3z9QACCGzGPwnF%2F8yfPzL8efOeYWehAoMAOyODS%2FoOBtbvXxhYwBb8ZWYQZPnL8GS%2BEch9DDPW3Wb4%2F%2BMHA9PfPwwsrO9eM9go8jJs7bBkAIHIigMMx04%2BZhBi%2FsPw5eN3BkZB0ynvmJnYBRiBOr98%2FsEgJcTO8OHNFwZWhn8M%2F%2F%2F9YgQIwAHZqzQQBED4292LHiYGohyKqEEkIKKiIr6BT2BjZSf4FLGyE8HOytrOwsbSHxDEJmCXCMpZCIKRy%2F3kNHu73qWYYhiY4RvhHD6%2FSWPqMo5RSYIOI1ydItK%2BMOHHnrTeXN148zAxw9b6Ap9Xu5SrNZRTts7o1KVUUYiKI9JuxG1zmVrFYWOxijAml7WOCnv0Y037dHVIUHxw8%2BAzzgBlDVIEAe2TFRrT7pDi%2BOKFnU2PpdkK6Axpgh6tdjePBL8Dw9HZE6%2BdLzq5ZNEw9pdw0Lzn%2Bs7HHVH8PO5TMpqSzSDLEJPb51bkazY3xTFrjRr%2B%2BzdCD9Ayi%2F8F6JFcXiGK4jj%2B%2FZ17xzBeISaPKc9SKBYKSSNbih0rUR5bZScpG6tZTlKSssAfYSGxsLEgeYRiZbxH7ty599xz%2FO71OHU6dU6%2F3%2Ff3%2BX4PhWaO772SihiFcjW5LkQ2C3JsGHzanxZM6aA6H7A%2BM7DSGe7u8rsDuDYpaadMRq0RrAClORtGZ1IlNSKGwEWyE7GyMP7W4Pw%2B9g4fkG8Q%2FKlIU7kprC9Q6ANkmCAOV9ouIpDYmK0Piv%2BsS73auL57R47Qvx77YgqmwQ0gPpBxCQOtRRjrqcREfzRQ9Iv9xcPh4OQRV5cp9LZXBDi3t%2FzVhIKRWzu8ZFkeEuMNSE43oaOu4L%2FQV35%2Bz2Jkbg8GaWytxJFmIwN3OaOn5zSoOL6pRE4BMo6GzeMvT7VhcbI1aOCx9PnNG9Z2zrCxe4aIyezKY%2FqfiBQc%2Fq5dq1oYeQwmmInNlZyhIAz1xdDdEUVLYynWt09xdHyPtxcrCB%2FcxN8eSaLC5vlRM1KTYEeriLERjK99A4JEpMtKrBY2Bd%2BpH0O0HwBepfuy8A2yX7YlxmA2jQAAAABJRU5ErkJggg%3D%3D';

//ajaxload.info
var icon_ajaxload = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP%2F%2F%2FwAAAMLCwkJCQgAAAGJiYoKCgpKSkiH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa%2BdIAAAh%2BQQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo%2FIpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo%2FIpFKSAAAh%2BQQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh%2BQQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc%2FjDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA%3D%3D';

//zurb foundation css framework
var icon_button_gloss = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyCAYAAACd%2B7GKAAAAEUlEQVQI12P4%2F%2F%2B%2FHsMIJBgAmlieOY9RD2sAAAAASUVORK5CYII%3D';
var icon_input_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAK8CAYAAAANumxDAAALeElEQVR42u3YwQmAMBBE0VHsxf7bMzF4MIdgA8LyHmwDc%2FrsluRM0pOMeQAAUMaR5ErSRC8AAFWDty3RewteAACqBW%2Bfsbt%2BeQEAoEzwjryf3S54AQCoGrzfAwCAEnYTAAAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAQvAAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAIIXAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAQPACACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAMELAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwCA4AUAAMELAACCFwAABC8AAAheAAAQvAAAIHgBABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAQvAAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAIIXAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAELwmAABA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAMELAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwCA4AUAAMELAACCFwAABC8AAAheAAAQvAAAIHgBABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAQvAAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAIIXAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAQPACACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAMELAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwCA4AUAAMELAACCFwAABC8AAAheAAAQvAAAIHgBABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAIHhNAACA4AUAAMELAACCFwAABC8AAAheAAAQvAAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQAAwQsAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAACB4AQAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAABC8AAIIXAAAELwAACF4AABC8AAAgeAEAQPACAIDgBQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAAELwAAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAACCFwAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAQPACACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAAAIXgAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAAMELAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAgeAEAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAAQvAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgCA4AUAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AABC8AAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwAAghcAAMELAACCFwAABC8AAAheAAAQvAAAIHgBAEDwAgAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAACF4AAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAADBCwCA4AUAAMELAACCFwAABC8AAAheAAAQvAAAIHgBABC8AAAgeAEAQPACAIDgBQAAwQsAAIIXAAAELwAAghcAAAQvAAAIXgAAELwAACB4AQBA8AIAgOAFAEDwAgCA4AUAAMELAACCFwAABC8AAAheAAAQvAAACF4AABC8AAAgeAEA4DcPuPohTPdKC34AAAAASUVORK5CYII%3D';

GM_addStyle(''
+'#GB_initialize {'
+' display:none;'
+'}'
+'#GB_overlay {'
+'  background-image: url('+gb_overlay+');'
+'  position: fixed;'
+'  margin: auto;'
+'  top: 0;'
+'  left: 0;'
+'  z-index: 8000;'
+'  width:  100%;'
+'  height: 100%;'
//+'  display: none;';
//+'	font-size:10px;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'	color:#000000;'
+'	display:none;'
+'}'

/* Multiple changes to ZURB CSS to make it work in GM script */
/* Foundation v2.2.1 http://foundation.zurb.com */
/* Artfully Masterminded by ZURB */
/*	:: Global Reset & Standards */
/* Eric Meyer's CSS Reset http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126 License: none (public domain) */
//+'html #GB_window, body #GB_window, '

+'#GB_window div, #GB_window span, #GB_window applet, #GB_window object, #GB_window iframe, '
+'#GB_window h1, #GB_window h2, #GB_window h3, #GB_window h4, #GB_window h5, #GB_window h6, #GB_window p, #GB_window blockquote, #GB_window pre, '
+'#GB_window a, #GB_window abbr, #GB_window acronym, #GB_window address, #GB_window big, #GB_window cite, #GB_window code, '
+'#GB_window del, #GB_window dfn, #GB_window em, #GB_window font, #GB_window img, #GB_window ins, #GB_window kbd, #GB_window q, #GB_window s, #GB_window samp, '
+'#GB_window small, #GB_window strike, #GB_window strong, #GB_window sub, #GB_window sup, #GB_window tt, #GB_window var, '
+'#GB_window b, #GB_window u, #GB_window i, #GB_window center, '
+'#GB_window dl, #GB_window dt, #GB_window dd, #GB_window ol, #GB_window ul, #GB_window li, '
+'#GB_window fieldset, #GB_window form, #GB_window label, #GB_window legend, '
+'#GB_window table, #GB_window caption, #GB_window tbody, #GB_window tfoot, #GB_window thead, #GB_window tr, #GB_window th, #GB_window td, '
+'#GB_window article, #GB_window aside, #GB_window canvas, #GB_window details, #GB_window embed, ' 
+'#GB_window figure, #GB_window figcaption, #GB_window footer, #GB_window header, #GB_window hgroup, '
+'#GB_window menu, #GB_window nav, #GB_window output, #GB_window ruby, #GB_window section, #GB_window summary, '
+'#GB_window time, #GB_window mark, #GB_window audio, #GB_window video {'
+'	margin:0; padding:0; border:0; outline:0; font-size:9px !important; font-size: 0.9rem !important; font-weight:normal; font-style:none;'
+'	font-family:helvetica, verdana, sans-serif; '
+'	text-align:left; vertical-align:baseline; text-decoration:none;'
+'	float:none; style-list-type:none; background:#FFF; background-color:#FFF; color:#000;'
+'	position:relative; overflow:visible; width:auto; height:auto;'
+'	text-underline-style:none; outline:none;'
+'}'
+'html #GB_window, body #GB_window  {font-size: 62.5% !important;}'
/* HTML5 display-role reset for older browsers */
+'#GB_window article, #GB_window aside, #GB_window details, #GB_window figcaption, #GB_window figure, #GB_window footer, #GB_window header, #GB_window hgroup, #GB_window menu, #GB_window nav, #GB_window section {display: block;}'
//+'body #GB_window  {line-height: 1;}'
//+'#GB_window body {line-height: 1;}'
+'#GB_window ol, #GB_window ul {list-style: none;}'
+'#GB_window blockquote, #GB_window q {quotes: none;}'
+'#GB_window blockquote:before, #GB_window blockquote:after, #GB_window q:before, #GB_window q:after {content: ""; content: none;}'
+'#GB_window table {border-collapse: collapse; border-spacing: 0;}'
+'#GB_window sub {vertical-align: sub;}'
+'#GB_window sup {vertical-align: super;}'
//+'body #GB_window  { background: #fff; font-family: "Helvetica Neue", #GB_window "HelveticaNeue", #GB_window Helvetica, #GB_window Arial, #GB_window "Lucida Grande", #GB_window sans-serif; font-size: 13px; font-size: 1.3rem; line-height: 18px; color: #555; position: relative; -webkit-font-smoothing: antialiased; }'
//+'#GB_window body { background: #fff; font-family: "Helvetica Neue", #GB_window "HelveticaNeue", #GB_window Helvetica, #GB_window Arial, #GB_window "Lucida Grande", #GB_window sans-serif; font-size: 13px; font-size: 1.3rem; line-height: 18px; color: #555; position: relative; -webkit-font-smoothing: antialiased; }'
/*	:: Links */
+'#GB_window a { color: #2a85e8; text-decoration: none; line-height: inherit; }'
+'#GB_window a:hover { color: #11639d; }'
+'#GB_window a:focus { color: #cc4714; outline: none; }'
+'#GB_window p a, #GB_window p a:visited { line-height: inherit; }'
//+'#GB_window a.expand 	{ width: 100%; }'
/*	:: Lists */
+'#GB_window ul, #GB_window ol { margin-bottom: 18px; }'
+'#GB_window ul { list-style: none outside; }'
+'#GB_window ol { list-style: decimal; }'
+'#GB_window ol, #GB_window ul.square, #GB_window ul.circle, #GB_window ul.disc { margin-left: 30px; }'
+'#GB_window ul.square { list-style: square outside; }'
+'#GB_window ul.circle { list-style: circle outside; }'
+'#GB_window ul.disc { list-style: disc outside; }'
+'#GB_window li { margin-bottom: 12px; }'
+'#GB_window ul.large li { line-height: 21px; }'
/*	:: Tables */
+'#GB_window table { background: #fff; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; margin: 0 0 18px; border: 1px solid #ddd;  }'
+'#GB_window table thead, #GB_window table tfoot { background: #f5f5f5; }'
+'#GB_window table thead tr th, #GB_window table tfoot tr th, #GB_window table tbody tr td, #GB_window table tr td, #GB_window table tfoot tr td { font-size: 12px; line-height: 18px; text-align: left; }'
+'#GB_window table thead tr th, #GB_window table tfoot tr td { padding: 8px 10px 9px; font-size: 14px; font-weight: bold; color: #222; }'
+'#GB_window table thead tr th:first-child, #GB_window table tfoot tr td:first-child { border-left: none; }'
+'#GB_window table thead tr th:last-child, #GB_window table tfoot tr td:last-child { border-right: none; }'
+'#GB_window table tbody tr.even, #GB_window table tbody tr.alt { background: #f9f9f9; }'
+'#GB_window table tbody tr:nth-child(even) { background: #f9f9f9; }'
+'#GB_window table tbody tr td { color: #333; padding: 9px 10px; vertical-align: top; border: none; }'
/*	:: Misc */
+'#GB_window .left        { float: left !important; }'
+'#GB_window .right       { float: right !important; }'
+'#GB_window .text-left   { text-align: left !important; }'
+'#GB_window .text-right  { text-align: right !important; }'
+'#GB_window .text-center { text-align: center !important; }'
+'#GB_window .hide        { display: none !important; }'
+'#GB_window .highlight   { background: #ff0 !important; }'
+'#GB_window #googlemap img, #GB_window object, #GB_window embed { max-width: none; }'
+'#GB_window #map_canvas embed { max-width: none; }'
+'#GB_window #map_canvas img { max-width: none; }'
+'#GB_window #map_canvas object { max-width: none; }'
/* Artfully Masterminded by ZURB */
/*	:: Typography */
+'#GB_window h1, #GB_window h2, #GB_window h3, #GB_window h4, #GB_window h5, #GB_window h6 { color: #181818 !important; font-weight: bold !important; line-height: 1.25  !important;}'
+'#GB_window h1 a, #GB_window h2 a, #GB_window h3 a, #GB_window h4 a, #GB_window h5 a, #GB_window h6 a { font-weight: inherit !important; }'
+'#GB_window h1 { font-size: 26px !important; font-size: 2.6rem !important; margin-bottom: 6px !important;}'
+'#GB_window h2 { font-size: 23px !important; font-size: 2.3rem !important; margin-bottom: 5px !important; }'
+'#GB_window h3 { font-size: 20px !important; font-size: 2.0rem !important; margin-bottom: 4px !important; }'
+'#GB_window h4 { font-size: 17px !important; font-size: 1.7rem !important; margin-bottom: 3px !important; }'
+'#GB_window h5 { font-size: 14px !important; font-size: 1.4rem !important; font-weight: normal !important; margin-bottom: 3px !important;  }'
+'#GB_window h6 { font-size: 11px !important; font-size: 1.1rem !important; font-weight: normal !important; }'
+'#GB_window .subheader { color: #777 !important; font-weight: 300 !important; margin-bottom: 24px !important; }'
+'#GB_window p { font-size:9px !important; font-size: 0.9rem !important; line-height: 1.25 !important; margin: 0 0 18px !important; }'
+'#GB_window p img { margin: 0 !important; }'
+'#GB_window p.lead { font-size: 18px; font-size: 1.8rem; line-height: 1.5;  }'
+'#GB_window em, #GB_window i { font-style: italic; line-height: inherit; }'
+'#GB_window strong, #GB_window b { font-weight: bold; line-height: inherit; }'
+'#GB_window small { font-size: 60%; line-height: inherit; }'
+'#GB_window h1 small, #GB_window h2 small, #GB_window h3 small, #GB_window h4 small, #GB_window h5 small { color: #777; }'
/*	Blockquotes  */
+'#GB_window blockquote, #GB_window blockquote p { line-height: 20px; color: #777; }'
+'#GB_window blockquote { margin: 0 0 18px; padding: 9px 20px 0 19px; border-left: 1px solid #ddd; }'
+'#GB_window blockquote cite { display: block; font-size: 12px; font-size: 1.2rem; color: #555; }'
+'#GB_window blockquote cite:before { content: "\2014 \0020"; }'
+'#GB_window blockquote cite a, #GB_window blockquote cite a:visited { color: #555; }'
+'#GB_window hr { border: solid #ddd; border-width: 1px 0 0; clear: both; margin: 12px 0 18px; height: 0; }'
+'#GB_window abbr, #GB_window acronym { text-transform: uppercase; font-size: 90%; color: #222; border-bottom: 1px solid #ddd; cursor: help; }'
+'#GB_window abbr { text-transform: none; }'
/* Artfully Masterminded by ZURB */
/*	:: Grid */
+'#GB_window .container { padding: 0 20px; }'
/*.row { width: 100%; max-width: 980px; min-width: 727px; margin: 0 auto; }*/
+'#GB_window .row { width: 100%; max-width: 550px; min-width: 500px; margin: 0 auto; }'
/* To fix the grid into a certain size, #GB_window set max-width to width */
+'#GB_window .row .row { min-width: 0; }'
+'#GB_window .column, #GB_window .columns { margin-left: 4.4%; float: left; min-height: 1px; position: relative; }'
+'#GB_window .column:first-child, #GB_window .columns:first-child { margin-left: 0; }'
+'#GB_window [class*="column"] + [class*="column"]:last-child { float: right; }'
+'#GB_window [class*="column"] + [class*="column"].end { float: left; }'
+'#GB_window .row .one 		{ width: 4.3%; }'
+'#GB_window .row .two 		{ width: 13%; }'
+'#GB_window .row .three 	{ width: 21.679%; }'
+'#GB_window .row .four 	{ width: 30.37%; }'
+'#GB_window .row .five 	{ width: 39.1%; }'
+'#GB_window .row .six 		{ width: 47.8%; }'
+'#GB_window .row .seven 	{ width: 56.5%; }'
+'#GB_window .row .eight 	{ width: 65.2%; }'
+'#GB_window .row .nine 	{ width: 73.9%; }'
+'#GB_window .row .ten 		{ width: 82.6%; }'
+'#GB_window .row .eleven 	{ width: 91.3%; }'
+'#GB_window .row .twelve 	{ width: 100%; }'
+'#GB_window .row .offset-by-one 	{ margin-left: 13.1%;  }'
+'#GB_window .row .offset-by-two 	{ margin-left: 21.8%;  }'
+'#GB_window .row .offset-by-three 	{ margin-left: 30.5%;  }'
+'#GB_window .row .offset-by-four 	{ margin-left: 39.2%;  }'
+'#GB_window .row .offset-by-five 	{ margin-left: 47.9%;  }'
+'#GB_window .row .offset-by-six 	{ margin-left: 56.6%;  }'
+'#GB_window .row .offset-by-seven 	{ margin-left: 65.3%;  }'
+'#GB_window .row .offset-by-eight 	{ margin-left: 74.0%;  }'
+'#GB_window .row .offset-by-nine 	{ margin-left: 82.7%;  }'
+'#GB_window .row .offset-by-ten 	{ margin-left: 91.4%;  }'
+'#GB_window .row .centered 		{ float: none; margin: 0 auto; }'
+'#GB_window .row .offset-by-one:first-child 		{ margin-left: 8.7%;  }'
+'#GB_window .row .offset-by-two:first-child 		{ margin-left: 17.4%;  }'
+'#GB_window .row .offset-by-three:first-child 		{ margin-left: 26.1%;  }'
+'#GB_window .row .offset-by-four:first-child 		{ margin-left: 34.8%;  }'
+'#GB_window .row .offset-by-five:first-child 		{ margin-left: 43.5%;  }'
+'#GB_window .row .offset-by-six:first-child 		{ margin-left: 52.2%;  }'
+'#GB_window .row .offset-by-seven:first-child 		{ margin-left: 60.9%;  }'
+'#GB_window .row .offset-by-eight:first-child 		{ margin-left: 69.6%;  }'
+'#GB_window .row .offset-by-nine:first-child 		{ margin-left: 78.3%;  }'
+'#GB_window .row .offset-by-ten:first-child 		{ margin-left: 87%;  }'
+'#GB_window .row .offset-by-eleven:first-child 	{ margin-left: 95.7%;  }'
/* Source Ordering */
+'#GB_window .push-two 		{ left: 17.4% }'
+'#GB_window .push-three 	{ left: 26.1%; }'
+'#GB_window .push-four 	{ left: 34.8%; }'
+'#GB_window .push-five 	{ left: 43.5%; }'
+'#GB_window .push-six 		{ left: 52.2%; }'
+'#GB_window .push-seven 	{ left: 60.9%; }'
+'#GB_window .push-eight 	{ left: 69.6%; }'
+'#GB_window .push-nine 	{ left: 78.3%; }'
+'#GB_window .push-ten 		{ left: 87%; }'
+'#GB_window .pull-two 		{ right: 17.4% }'
+'#GB_window .pull-three 	{ right: 26.1%; }'
+'#GB_window .pull-four 	{ right: 34.8%; }'
+'#GB_window .pull-five 	{ right: 43.5%; }'
+'#GB_window .pull-six 		{ right: 52.2%; }'
+'#GB_window .pull-seven 	{ right: 60.9%; }'
+'#GB_window .pull-eight 	{ right: 69.6%; }'
+'#GB_window .pull-nine 	{ right: 78.3%; }'
+'#GB_window .pull-ten 		{ right: 87%; }'
+'#GB_window img, #GB_window object, #GB_window embed { max-width: 100%; height: auto; }'
+'#GB_window img { -ms-interpolation-mode: bicubic; }'
+'#GB_window #map_canvas img, #GB_window .map_canvas img {max-width: none!important;}'
/* Nicolas Gallagher's micro clearfix */
+'#GB_window .row:before, #GB_window .row:after, #GB_window .clearfix:before, #GB_window .clearfix:after { content:""; display:table; }'
+'#GB_window .row:after, #GB_window .clearfix:after { clear: both; }'
+'#GB_window .row, #GB_window .clearfix { zoom: 1; }'
/*	-------
:: Block grids
These are 2-up, #GB_window 3-up, #GB_window 4-up and 5-up ULs, #GB_window suited
for repeating blocks of content. Add 'mobile' to
them to switch them just like the layout grid
(one item per line) on phones
For IE7/8 compatibility block-grid items need to be
the same height. You can optionally uncomment the
lines below to support arbitrary height, #GB_window but know
that IE7/8 do not support :nth-child.
--------- */
+'#GB_window .block-grid { display: block; overflow: hidden; }'
+'#GB_window .block-grid>li { display: block; height: auto; float: left; }'
+'#GB_window .block-grid.two-up { margin-left: -4% }'
+'#GB_window .block-grid.two-up>li { margin-left: 4%; width: 46%; margin-bottom: 4%;}'
/* 	.block-grid.two-up>li:nth-child(2n+1) {clear: left;} */
+'#GB_window .block-grid.three-up { margin-left: -2% }'
+'#GB_window .block-grid.three-up>li { margin-left: 2%; width: 31.3%; margin-bottom: 2%;}'
/* 	.block-grid.three-up>li:nth-child(3n+1) {clear: left;} */
+'#GB_window .block-grid.four-up { margin-left: -2% }'
+'#GB_window .block-grid.four-up>li { margin-left: 2%; width: 23%; margin-bottom: 2%;}'
/* 	.block-grid.four-up>li:nth-child(4n+1) {clear: left;} */
+'#GB_window .block-grid.five-up { margin-left: -1.5% }'
+'#GB_window .block-grid.five-up>li { margin-left: 1.5%; width: 18.5%; margin-bottom: 1.5%;}'
/* 	.block-grid.five-up>li:nth-child(5n+1) {clear: left;} */
/* Artfully masterminded by ZURB  */
/*	Buttons */
+'#GB_window .button {background: #00a6fc; display: inline-block; text-align: center; padding: 9px 34px 11px; color: #fff !important; text-decoration: none; font-weight: bold; font-size: 13px; font-size: 1.3rem; height:auto !important; line-height: 1; font-family: "Helvetica Neue", "Helvetica", Arial, Verdana, sans-serif; position: relative; cursor: pointer; border: none; outline: none; margin: 0;}'
/* Don't use native buttons on iOS */
+'#GB_window input[type=submit].button, #GB_window button.button { -webkit-appearance: none; }'
/* Hide inner focus effect in Firefox */
+'#GB_window button::-moz-focus-inner, #GB_window input[type="reset"]::-moz-focus-inner, #GB_window input[type="button"]::-moz-focus-inner, #GB_window input[type="submit"]::-moz-focus-inner, #GB_window input[type="file"] > input[type="button"]::-moz-focus-inner {border: none;}'
//+'#GB_window .button.nice {background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px; -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.5); -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.5); box-shadow: inset 0 1px 0 rgba(255,255,255,.5); text-shadow: 0 -1px 1px rgba(0,0,0,0.28); background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px, #GB_window -moz-linear-gradient(top, #GB_window rgba(255,255,255,.4) 0%, #GB_window transparent 100%); background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px, #GB_window -webkit-gradient(linear, #GB_window left top, #GB_window left bottom, #GB_window color-stop(0%,rgba(255,255,255,.4)), #GB_window color-stop(100%,transparent)); border: 1px solid #0593dc; -webkit-transition: background-color .15s ease-in-out; -moz-transition: background-color .15s ease-in-out; -o-transition: background-color .15s ease-in-out;}'
+'#GB_window .button.nice {background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px; -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.5); -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.5); box-shadow: inset 0 1px 0 rgba(255,255,255,.5); text-shadow: 0 -1px 1px rgba(0,0,0,0.28); background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px, -moz-linear-gradient(top, rgba(255,255,255,.4) 0%, transparent 100%); background: #00a6fc url('+icon_button_gloss+') repeat-x 0 -31px, -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,.4)), color-stop(100%,transparent)); border: 1px solid #0593dc; -webkit-transition: background-color .15s ease-in-out; -moz-transition: background-color .15s ease-in-out; -o-transition: background-color .15s ease-in-out;}'
+'#GB_window .button.radius {-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;}'
+'#GB_window .button.round {-moz-border-radius: 1000px;-webkit-border-radius: 1000px;border-radius: 1000px;}'
+'#GB_window .button.full-width {width: 100% !important;padding-left: 0 !important;padding-right: 0 !important;text-align: center;}'
+'#GB_window .button.left-align {text-align: left; text-indent: 12px;}'
/* Sizes ---------- */
+'#GB_window .xtiny.button			{ font-size: 11px; padding: 2px 6px 4px; width: auto; }'
+'#GB_window .mtiny.button			{ font-size: 11px; padding: 4px 10px 6px; width: auto; }'
+'#GB_window .tiny.button			{ font-size: 12px; padding: 6px 14px 8px; width: auto; }'
+'#GB_window .small.button 			{ font-size: 13px; padding: 8px 20px 10px; width: auto; }'
+'#GB_window .medium.button 		{ font-size: 15px; width: auto; }'
+'#GB_window .large.button 			{ font-size: 18px; padding: 11px 48px 13px; width: auto; }'
/* Nice Sizes ---------- */
+'#GB_window .nice.xtiny.button 	{ background-position: 0 -40px; }'
+'#GB_window .nice.mtiny.button 	{ background-position: 0 -38px; }'
+'#GB_window .nice.tiny.button 		{ background-position: 0 -37px; }'
+'#GB_window .nice.small.button 	{ background-position: 0 -34px; }'
+'#GB_window .nice.large.button 	{ background-position: 0 -30px; }'
/* Colors ---------- */
+'#GB_window .blue.button			{ background-color: #00a6fc; }'
+'#GB_window .red.button			{ background-color: #e91c21; }'
+'#GB_window .white.button			{ background-color: #e9e9e9; color: #333; }'
+'#GB_window .black.button			{ background-color: #141414; }'
//+'#GB_window .green.button			{ background-color: #5b8737; }'
+'#GB_window .green.button			{ background-color: #699c40; }'
/* Nice Colors ---------- */
+'#GB_window .nice.blue.button		{ border: 1px solid #0593dc; }'
+'#GB_window .nice.red.button		{ border: 1px solid #b90b0b; }'
+'#GB_window .nice.white.button		{ border: 1px solid #cacaca; text-shadow: none !important; }'
+'#GB_window .nice.black.button		{ border: 1px solid #000; }'
+'#GB_window .nice.green.button		{ border: 1px solid #4a6b2d; }'
/* Hovers ---------- */
+'#GB_window .button:hover, #GB_window .button:focus 				{ background-color: #0192dd; color: #fff; }'
+'#GB_window .blue.button:hover, #GB_window .blue.button:focus		{ background-color: #0192dd; }'
+'#GB_window .red.button:hover, #GB_window .red.button:focus 		{ background-color: #d01217; }'
+'#GB_window .white.button:hover, #GB_window .white.button:focus	{ background-color: #dadada; color: #333; }'
+'#GB_window .black.button:hover, #GB_window .black.button:focus	{ background-color: #000; }'
//+'#GB_window .green.button:hover, #GB_window .green.button:focus	{ background-color: #699c40; }'
+'#GB_window .green.button:hover, #GB_window .green.button:focus	{ background-color: #5b8737; }'
/* Hovers ---------- */
+'#GB_window .nice.button:active 	{-moz-box-shadow: inset 0 1px 0 rgba(0,0,0,.15); -webkit-box-shadow: inset 0 1px 0 rgba(0,0,0,.15); box-shadow: inset 0 1px 0 rgba(0,0,0,.15);}'
/* Disabled ---------- */
+'#GB_window .button.disabled, #GB_window .button[disabled] { opacity: 0.6; cursor: default; }'
/* Correct FF button padding */
+'@-moz-document url-prefix("http://") {'
+'#GB_window input[type=submit].button::-moz-focus-inner, #GB_window button.button::-moz-focus-inner { border: 0; padding: 0; }'
+'#GB_window input[type=submit].tiny.button		{ padding: 5px 14px 7px; }'
+'#GB_window input[type=submit].small.button	{ padding: 7px 20px 8px; }'
+'#GB_window input[type=submit].medium.button	{ padding: 8px 34px 9px; }'
+'#GB_window input[type=submit].large.button	{ padding: 9px 48px 10px; }'
+'}'
/*	Alerts */
+'#GB_window div.alert-box { display: block; padding: 6px 7px; font-weight: bold; font-size: 13px; background: #eee; border: 1px solid rgba(0,0,0,0.1); margin-bottom: 12px; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; text-shadow: 0 1px rgba(255,255,255,0.9); position: relative; }'
+'#GB_window .alert-box.success { background-color: #7fae00; color: #fff; text-shadow: 0 -1px rgba(0,0,0,0.3); }'
+'#GB_window .alert-box.warning { background-color: #f68b01; color: #fff; text-shadow: 0 -1px rgba(0,0,0,0.3); }'
+'#GB_window .alert-box.error { background-color: #c00000; color: #fff; text-shadow: 0 -1px rgba(0,0,0,0.3); }'
+'#GB_window .alert-box a.close { color: #000; position: absolute; right: 4px; top: 0; font-size: 18px; opacity: 0.2; padding: 4px; }'
+'#GB_window .alert-box a.close:hover,.alert-box a.close:focus { opacity: 0.4; }'
/*	Labels */
+'#GB_window .label { padding: 2px 4px 2px; font-size: 15px; font-weight: normal; text-align: center; text-decoration: none; line-height: 1;  white-space: nowrap; display: inline; position: relative; bottom: 1px; color: #fff; background: #00a6fc; }'
+'#GB_window .label.radius { -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px; }'
+'#GB_window .label.round { padding: 1px 7px 2px; -moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px; }'
/* Size ---------- */
+'#GB_window .small.label { padding: 1px 1px 1px; font-size: 12px !important; }'
/* Colors ---------- */
+'#GB_window .blue.label	{ background-color: #00a6fc; }'
+'#GB_window .red.label		{ background-color: #e91c21; }'
+'#GB_window .green.label	{ background-color: #7fae00; }'
+'#GB_window .white.label	{ background-color: #e9e9e9; color: #333; }'
+'#GB_window .black.label	{ background-color: #141414; }'
/*	Lists */
+'#GB_window ul.nice, #GB_window ol.nice { list-style: none; margin: 0; }'
+'#GB_window ul.nice li, #GB_window ol.nice li { padding-left: 13px; position: relative }'
+'#GB_window ul.nice li span.bullet, #GB_window ol.nice li span.number { position: absolute; left: 0; top: 0; color: #ccc; }'
/*	Panels */
//+'#GB_window div.panel {padding: 20px 20px 2px 20px; background: #efefef; background: -moz-linear-gradient(top, #GB_window #FFFFFF 0%, #GB_window #F4F4F4 100%); background: -webkit-gradient(linear, #GB_window left top, #GB_window left bottom, #GB_window color-stop(0%,#FFFFFF), #GB_window color-stop(100%,#F4F4F4)); background: -o-linear-gradient(top, #GB_window #ffffff 0%,#f4f4f4 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#FFFFFF", #GB_window endColorstr="#F4F4F4",GradientType=0 ); box-shadow: 0 2px 5px rgba(0,0,0,0.15); -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.15); -moz-box-shadow: 0 2px 5px rgba(0,0,0,0.25); margin: 0 0 20px 0;}'
+'#GB_window div.panel {padding: 20px 20px 2px 20px; background: #efefef; background: -moz-linear-gradient(top, #FFFFFF 0%, #F4F4F4 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FFFFFF), color-stop(100%,#F4F4F4)); background: -o-linear-gradient(top, #ffffff 0%,#f4f4f4 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#FFFFFF", endColorstr="#F4F4F4",GradientType=0 ); box-shadow: 0 2px 5px rgba(0,0,0,0.15); -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.15); -moz-box-shadow: 0 2px 5px rgba(0,0,0,0.25); margin: 0 0 20px 0;}'
/*	Tooltips */
+'#GB_window .has-tip {border-bottom: dotted 1px #ccc; cursor: help; font-weight: bold; color: #333;}'
+'#GB_window .has-tip:hover { border-bottom: dotted 1px #0593dc; color: #0192dd;}'
+'#GB_window .tooltip {display: none; background: rgb(0,0,0); background: rgba(0,0,0,0.8); position: absolute; color: #fff; font-weight: bold; font-size: 12px; font-size: 1.2rem; padding: 5px; z-index: 999; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; line-height: normal;}'
+'#GB_window .tooltip > .nub {display: block; width: 0; height: 0; border: solid 5px; border-color: transparent transparent rgb(0,0,0) transparent; border-color: transparent transparent rgba(0,0,0,0.8) transparent; position: absolute; top: -10px; left: 10px;}'
+'#GB_window .tooltip.tip-override > .nub {border-color: transparent transparent rgb(0,0,0) transparent !important; border-color: transparent transparent rgba(0,0,0,0.8) transparent !important; top: -10px !important;}'
+'#GB_window .tooltip.tip-top > .nub {border-color: rgb(0,0,0) transparent transparent transparent; border-color: rgba(0,0,0,0.8) transparent transparent transparent; top: auto; bottom: -10px;}'
+'#GB_window .tooltip.tip-left, #GB_window .tooltip.tip-right, #GB_window .has-tip.tip-left, #GB_window .has-tip.tip-right {float: none !important;}'
+'#GB_window .tooltip.tip-left > .nub {border-color: transparent transparent transparent rgb(0,0,0); border-color: transparent transparent transparent rgba(0,0,0,0.8); right: -10px; left: auto;}'
+'#GB_window .tooltip.tip-right > .nub {border-color: transparent rgb(0,0,0) transparent transparent; border-color: transparent rgba(0,0,0,0.8) transparent transparent; right: auto; left: -10px;}'
+'#GB_window .tooltip.noradius {-webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;}'
+'#GB_window .has-tip.opened {color: #0192DD !important; border-bottom: dotted 1px #0593DC !important;}'
+'#GB_window .tap-to-close {display: block; font-size: 10px; font-size: 1.0rem; color: #888; font-weight: normal;}'
/* 	Artfully masterminded by ZURB --- Make sure to include app.js / foundation.js if you are going to use inline label inputs */
/*	Standard Forms */
//+'#GB_window form { margin: 0 0 18px; }'
//+'#GB_window form label { display: block; font-size: 13px; line-height: 18px; cursor: pointer; margin-bottom: 9px; }'
+'#GB_window input.input-text, #GB_window textarea { border-right: 1px solid #bbb; border-bottom: 1px solid #bbb; }'
+'#GB_window input.input-text, #GB_window textarea, #GB_window select { display: block; margin-bottom: 9px; height: auto !important; }'
+'#GB_window label + input.input-text, #GB_window label + textarea, #GB_window label + select, #GB_window label + div.dropdown, #GB_window select + div.dropdown { margin-top: -9px; }'
+'#GB_window textarea { max-width: 100%; }'
/* Text input and textarea font and padding */
+'#GB_window input.input-text, #GB_window textarea { font-size: 13px; padding: 4px 3px 2px; background: #fff; }'
+'#GB_window input.input-text:focus, #GB_window textarea:focus { outline: none !important; }'
+'#GB_window input.input-text.oversize, #GB_window textarea.oversize { font-size: 18px !important; padding: 4px 5px !important; }'
+'#GB_window input.input-text:focus, #GB_window textarea:focus { background: #f9f9f9; }'
/* Text input and textarea, #GB_window disabled */
+'#GB_window input.input-text[disabled], #GB_window textarea[disabled] { background-color: #ddd; }'
/* Inlined Label Style */
+'#GB_window input.placeholder, #GB_window textarea.placeholder { color: #888; }'
/* Text input and textarea sizes */
+'#GB_window input.input-text, #GB_window textarea { width: 254px; box-sizing: border-box; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; }'
+'#GB_window input.small, #GB_window textarea.small { width: 134px; }'
+'#GB_window input.medium, #GB_window textarea.medium { width: 254px; }'
+'#GB_window input.large, #GB_window textarea.large { width: 434px; }'
+'#GB_window input.expand, #GB_window textarea.expand { width: 100%; }'
/* Lock textareas so they can't be resized beyond their set width in webkit */
+'#GB_window textarea.locked 	{ max-width: 254px; }'
+'#GB_window textarea.locked.small 	{ max-width: 134px; }'
+'#GB_window textarea.locked.large 	{ max-width: 434px; }'
+'#GB_window textarea.locked.expand 	{ max-width: 100%; }'
/* Fieldsets */
//+'#GB_window form fieldset { padding: 9px 9px 2px 9px; border: solid 1px #ddd; margin: 18px 0; }'
/* Inlined Radio & Checkbox */
//+'#GB_window .form-field input[type=radio], #GB_window div.form-field input[type=checkbox] { display: inline; width:auto; margin-bottom:0; }'
/*	Nicer Forms */
+'#GB_window .nice div.form-field input, #GB_window .nice input.input-text, #GB_window .nice textarea, #GB_window .nice select { border: solid 1px #bbb !important; border-radius: 2px !important; -webkit-border-radius: 2px !important; -moz-border-radius: 2px !important;}'
+'#GB_window .nice div.form-field input, #GB_window .nice input.input-text, #GB_window .nice textarea, #GB_window .nice select { font-size: 13px !important; padding: 6px 3px 4px !important; outline: none !important; background: url('+icon_input_bg+') #fff !important; }'
//icon_input_bg
+'#GB_window .nice div.form-field input:focus, #GB_window .nice input.input-text:focus, #GB_window .nice textarea:focus { background-color: #f9f9f9 !important; }'
/* Text input and textarea, #GB_window disabled */
/*
+'#GB_window .nice div.form-field input[disabled], #GB_window .nice input.input-text[disabled], #GB_window .nice textarea[disabled] { background-color: #ddd; }'
+'#GB_window .nice fieldset { border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; }'
+'#GB_window .nice div.form-field input[type=radio], #GB_window .nice div.form-field input[type=checkbox] { display: inline; width:auto; margin-bottom:0; }'
+'#GB_window .nice div.form-field.error small, #GB_window .nice small.error { padding: 6px 4px; border: solid 0 #C00000; border-width: 0 1px 1px 1px; margin-top: -10px; background: #C00000; color: #fff; font-size: 12px; font-weight: bold; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; -webkit-border-bottom-left-radius: 2px; -webkit-border-bottom-right-radius: 2px; -moz-border-radius-bottomleft: 2px; -moz-border-radius-bottomright: 2px; }'
+'#GB_window .nice div.form-field.error .small + small, #GB_window .nice .small + small.error { width: 132px; }'
+'#GB_window .nice div.form-field.error .medium + small, #GB_window .nice .medium + small.error { width: 252px; }'
+'#GB_window .nice div.form-field.error .large + small, #GB_window .nice .large + small.error { width: 432px; }'
+'#GB_window .nice div.form-field.error .small.oversize + small, #GB_window .nice .small.oversize + small.error { width: 136px; }'
+'#GB_window .nice div.form-field.error .medium.oversize + small, #GB_window .nice .medium.oversize + small.error { width: 256px; }'
+'#GB_window .nice div.form-field.error .large.oversize + small, #GB_window .nice .large.oversize + small.error { width: 436px; }'
*/
//Uncomment below to have the fields glow blue when in focus
/*
+'#GB_window input, #GB_window textarea, #GB_window select {'
+'	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);'
+'	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);'
+'	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);'
+'	-webkit-transition: border linear 0.2s, box-shadow linear 0.2s;'
+'	-moz-transition: border linear 0.2s, box-shadow linear 0.2s;'
+'	-ms-transition: border linear 0.2s, box-shadow linear 0.2s;'
+'	-o-transition: border linear 0.2s, box-shadow linear 0.2s;'
+'	transition: border linear 0.2s, box-shadow linear 0.2s;'
+'}'
+'#GB_window input:focus, #GB_window textarea:focus, #GB_window select:focus {'
+'	border-color: rgba(82, 168, 236, 0.8);'
+'	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);'
+'	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);'
+'	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);'
+'	outline: 0;'
+'	outline: thin dotted \9;'
+'}'
*/

/* Errors */
+'#GB_window .form-field.error input, #GB_window input.input-text.red { border-color: #C00000 !important; background-color: rgba(255,0,0,0.15) !important; }'
+'#GB_window .form-field.error label, #GB_window label.red { color: #C00000; }'
+'#GB_window .form-field.error small, #GB_window small.error { margin-top: -6px; display: block; margin-bottom: 9px; font-size: 11px; color: #C00000; width: 254px; box-sizing: border-box; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; }'
+'#GB_window .small + small.error { width: 134px; }'
+'#GB_window .medium + small.error { width: 254px; }'
+'#GB_window .large + small.error { width: 434px; }'
+'#GB_window .expand + small.error { width: 100%; }'
+'#GB_window .small.oversize + small.error { width: 144px; }'
+'#GB_window .medium.oversize + small.error { width: 264px; }'
+'#GB_window .large.oversize + small.error { width: 444px; }'
+'#GB_window .expand.oversize + small.error { width: 100%; }'

+'#GB_window {'
+'  top: 20px;'
+'  position: fixed;'
+'  background: #FFF;'
+'  border: 5px solid #AAA;'
+'  border-radius: 8px;'
+'  -moz-border-radius: 8px;'
+'	-webkit-border-radius: 8px;'
+'  overflow: auto;'
+'  width: 550px;'
+'  min-height: 150px;'
+'  z-index: 8050;'
+'	display:none;'
+'}'
+'#GB_window #GB_body {'
+'  padding: 5px;'
+'	color:#000000;'
//+'	text-align:left;'
+'}'
/*+'#GB_window img.close {'
+'  position: absolute;'
+'  top: 2px;'
+'  right: 5px;'
+'  cursor: pointer;'
+'  cursor: hand;'
+'}'*/
+'#GB_window #GB_caption {'
//+'	font-size: 12px;'
//+'  color: #FFF;'
+'	background:#888888;'
+'  padding: 2px 0 2px 5px;'
+'	margin:0;'
//+'  text-align: left;'
+'}'
+'#GB_window div.close {'
+'	color: #000; position: absolute; right: 4px; top: 0; font-size: 16px; opacity: 0.7; padding: 2px;'
+'	background:#888888; cursor: pointer; cursor: hand;'
+'}'
+'#GB_window #GB_caption span {'
+'	line-height:16px;'
+'	font-size:9px;'
+'	font-size:0.9rem;'
+'	background:#888888;'
+'	font-weight:bold;'
+'	color:#FFF;'
+'	width:auto;'
+'}'
+'#GB_window .tab_container {'
+'	border: 1px solid #999;'
+'	border-top: none;'
+'	clear: both;'
+'	float: left; '
+'	width: 100%;'
+'	background: #FFF;'
+'	margin-bottom:5px;'
//+'	font-size:12px;'
+'}'
+'#GB_window .tab_content {'
+'	padding: 20px;'
+'	position:relative;'
+'	display:block;'
//+'	font-size:12px;'
+'}'
/*
+'#GB_window .tab_content a:link, #GB_window .tab_content a:visited, #GB_window .tab_content a:hover, #GB_window .tab_content a:active {'
+'	color:#FA0000;'
+'	border-bottom:1px dashed #FF0000;'
//+'	text-decoration:#EEE solid;'
//+'	text-underline-style:dashed;'
+'}'
+'#GB_window .tab_container img {'
+'	vertical-align:middle;'
+'	text-align:center;'
+'}'
+'#GB_window .tab_content h2 {'
+'	font-weight: normal;'
+'	padding-bottom: 5px;'
+'	margin-bottom: 10px;'
+'	border-bottom: 1px dashed #ddd;'
+'	font-size: 14px;'
+'}'
+'#GB_window .tab_content h3 a {'
+'	color: #254588;'
+'}'
*/
//+'#GB_window .tab_content h6.dashed {'
//+'	margin-bottom:8px;'
//+'}'
//+'#GB_window .tab_content h6.dashed {'
//+'	border-bottom: 1px dashed #ddd;'
//+'}'

+'#GB_window .tab_content .dashed {'
+'	border-bottom: 1px dashed #ddd;'
+'	margin-bottom:8px;'
+'}'

//+'#GB_window p.dashed {'
//+'	border-bottom: 1px dashed #ddd;'
//+'}'

+'#GB_window ul.tabs {'
+'	margin: 0;'
+'	padding: 0;'
+'	float: left !important;'
//+'	width:500px;'
+'	list-style: none;'
+'	height: 32px;'
+'	border-bottom: 1px solid #999;'
+'	border-left: 1px solid #999;'
+'	width: 100%;'
+'	z-index:9000;'
+'	display:inline;'
+'	width: 100% !important;'
+'	clear:none;'
//+'	background: #e0e0e0;'
+'}'
+'#GB_window ul.tabs li {'
+'	float: left !important;'
+'	margin: 0;'
+'	padding: 0;'
+'	height: 31px;'
+'	list-style: none;'
+'	line-height: 31px;'
+'	border: 1px solid #999;'
+'	border-left: none;'
+'	margin-bottom: -1px;'
+'	overflow: hidden;'
+'	position: relative;'
+'	z-index:9001;'
+'	clear:none;'
+'	display:block;'
+'}'

+'#GB_window ul.tabs li a {'
+'	position:relative;'
+'	text-decoration: none;'
+'	color: #000;'
+'	display: block;'
+'	font-size: 10px;'
+'	font-size: 1.0rem;'
+'	padding: 0 15px 0 30px;'
+'	border: 1px solid #fff;'
+'	outline: none;'
+'	background: #e0e0e0;'
//+'	background: #0000FF;'
//+'	background: -moz-linear-gradient(top, #FFFFFF, #0000FF);'
//+'	background: -webkit-gradient(linear, left top, right top, from(#FFFFFF), to(#000066));'
//+'	background: -moz-linear-gradient(top, #fff 50%, #00a6fc);'
+'	z-index:9002;'
+'	clear:none;'
//+'	height:100%;'
//+'	margin:0;'
+'	min-width:0 !important;'
+'	padding-bottom:2px;'
+'	display:block;'
+'	line-height:31px;'
+'}'
+'#GB_window ul.tabs li a.about {'
+'	background-image:url('+icon_about+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li a.trackers, #GB_window ul.tabs li a.trackers {'
+'	background-image:url('+icon_trackers+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li a.lists {'
+'	background-image:url('+icon_lists+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li a.rescue {'
+'	background-image:url('+icon_rescue+');'
//+'	background-image:url('+icon_webui+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li a.webui {'
+'	background-image:url('+icon_webui+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li a.help {'
+'	background-image:url('+icon_help+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
//+'#GB_window li {'
//+'	background: #e0e0e0;'
//+'}'
+'#GB_window ul.tabs li a:hover {'
+'	background-color: #ccc;'
+'}'
//+'#GB_window #GB_body a:link, #GB_window #GB_body a:visited, #GB_window #GB_body a:active {'
//+'#GB_window ul.tabs li a:link {'
//+'  color:#0000EE;'
//+'  text-decoration:underline;'
//+'	background: #e0e0e0;'
//+'}'
//+'#GB_window html ul.tabs li.active, #GB_window html ul.tabs li.active a:hover  {'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a:link, #GB_window ul.tabs li.active a:hover  {'
+'	background: #FFF;'
+'	border-bottom: 1px solid #fff;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.about:link, #GB_window ul.tabs li.active a.about:hover {'
+'	background-image:url('+icon_about+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.trackers:link, #GB_window ul.tabs li.active a.trackers:hover {'
+'	background-image:url('+icon_trackers+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.lists:link, #GB_window ul.tabs li.active a.lists:hover {'
+'	background-image:url('+icon_lists+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.rescue:link, #GB_window ul.tabs li.active a.rescue:hover {'
+'	background-image:url('+icon_rescue+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.webui:link, #GB_window ul.tabs li.active a.webui:hover {'
+'	background-image:url('+icon_webui+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#GB_window ul.tabs li.active, #GB_window ul.tabs li.active a.help:link, #GB_window ul.tabs li.active a.help:hover {'
+'	background-image:url('+icon_help+');'
+'	background-repeat:no-repeat;'
+'	background-position: 8px 40%;'
+'}'
+'#gmmnu div, #gmmnu span, #gmmnu applet, #gmmnu object, #gmmnu iframe, #gmmnu h1,'
+'#gmmnu h2, #gmmnu h3, #gmmnu h4, #gmmnu h5, #gmmnu h6, #gmmnu p, #gmmnu blockquote,'
+'#gmmnu pre, #gmmnu a, #gmmnu abbr, #gmmnu acronym, #gmmnu address, #gmmnu big,'
+'#gmmnu cite, #gmmnu code, #gmmnu del, #gmmnu dfn, #gmmnu em, #gmmnu font, #gmmnu img,'
+'#gmmnu ins, #gmmnu kbd, #gmmnu q, #gmmnu s, #gmmnu samp, #gmmnu small, #gmmnu strike,'
+'#gmmnu strong, #gmmnu sub, #gmmnu sup, #gmmnu tt, #gmmnu var, #gmmnu dl, #gmmnu dt,'
+'#gmmnu dd, #gmmnu ol, #gmmnu ul, #gmmnu li, #gmmnu fieldset, #gmmnu form, #gmmnu label,'
+'#gmmnu legend, #gmmnu table, #gmmnu caption, #gmmnu tbody, #gmmnu tfoot, #gmmnu thead,'
+'#gmmnu tr, #gmmnu th, #gmmnu td, #gmmnu fieldset, #gmmnu input, #gmmnu p {'
+'	margin:0; padding:0; border:0; outline:0; font-size:12px; font-size:1.2em; font-weight:normal; font-style:none;'
+'	font-family:helvetica, verdana, sans-serif; text-align:left; vertical-align:baseline; text-decoration:none;'
+'	float:none; style-list-type:none; background:#FFF; background-color:#E9E6E5; color:#000;'
+'	position:relative; overflow:visible; width:auto; height:auto;'
+'	text-decoration:none; text-underline-style:none; outline:none;'
//font-size:100%;
+'}'
+'#gmmnu :focus { outline:0; }'
//+'#gmmnu body { line-height:1; color:black; background:white; }'
+'#gmmnu ol, #gmmnu ul { list-style:none; }'
+'#gmmnu table { border-collapse:separate; border-spacing:0; }'
+'#gmmnu caption, #gmmnu th, #gmmnu td { text-align:left; font-weight:normal; }'
+'#gmmnu blockquote:before, #gmmnu blockquote:after, #gmmnu q:before, #gmmnu q:after { content: ""; }'
+'#gmmnu blockquote, #gmmnu q { quotes: "" ""; }'
+'#gmmnu {'
+'  background-color: #E9E6E5;'
+'  border-radius: 8px;'
+'	-moz-border-radius: 8px;'
+'	-webkit-border-radius: 8px;'
+'  position: fixed;'
+'  margin: auto;'
+'  bottom: 5px;'
+'  right: 5px;'
+'  z-index: 1000;'
+'  width: 150px;'
+'  min-height: 20px;'
+'  padding:5px;'
+'  text-align:left;'
+'  border:2px solid #333;'
+'  font-family:Arial;'
+'  color:#333;'
+'	font-size:10px;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'}'
+'#gmmnu a:link, #gmmnu a:visited, #gmmnu a:hover, #gmmnu a:active, #gmmnu a:focus {'
+'	color:#264074;'
+'	text-decoration:none;'
+'	text-underline-style:none;'
+'	font-size:10px;'
+'	border-bottom:0;'
//+'	font-size:.9em;'
+'}'
//+'#gmmnuheader {text-align:center;font-weight:bold;font-size:10pt;margin-bottom:5px;}'
+'#gmmnu #gmmnu_title {position:relative; width:inherit; text-align:center; font-weight:bold; font-size:10pt; color:#333;}'
+'#gmmnu #gmmnu_err {display:none;}'
+'#gmmnu #gmmnu_errmsg {font-size:8pt;margin-bottom:5px;}'
+'#gmmnu #gmmnu_links, #gmmnu #gmmnu_links_webui {'
//+'	display:none;'
+'	text-decoration:none;'
+'	min-height:20px;'
//+'	padding:5px;'
+'}'
+'#gmmnu #gmmnu_links_webui {'
//+'	clear:both;'
+'	margin-top:3px;'
+'	display:none;'
+'}'
+'#gmmnu .header {'
+'  font-weight:bold;'
+'  font-size:8pt;'
+'  margin:0 0 2px 0;'
//+'  padding:5px 0 0 0;'
+'  border-bottom:1px solid #000000;'
//+'	margin-bottom:5px;'
//+'	margin-top:5px;'
+'	display:block;'
+'	width:100%;'
+'	min-width:100%;'
+'}'
+'#gmmnu_twitter div a {'
+'  line-height: 20px;'
+'  font-size:12px !important;'
+'	vertical-align:middle;'
+'	font-weight:900;'
+'	overflow:hidden;'
+'	display:block;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'}'
+'#gmmnu_twitter a:hover {'
+'	background-color:#ccc;'
+'}'
+'#gmmnu_linksfiles, #gmmnu_linksfiles_webui {'
+'  line-height: 20px;'
+'  font-size:11px;'
+'	vertical-align:middle;'
+'}'
+'#gmmnu_linksfiles a:hover, #gmmnu_linksfiles_webui div.webui a:hover, #gmmnu_linksfiles_webui div.setupwebui a:hover {'
+'	background-color:#ccc;'
+'}'
+'#gmmnu_linksfiles a.icon_magnet {'
+'  line-height: 20px;'
+'	background-image:url('+icon_magnet+');'
+'	background-repeat:no-repeat;'
+'	background-position: left center;'
+'	font-weight:900;'
+'	padding-left:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
//+'	text-decoration:none;'
//+'	text-underline-style:none;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'}'
+'#gmmnu_linksfiles_webui a.icon_webui {'
+'  line-height: 20px;'
+'	background-image:url('+icon_webui+');'
+'	background-repeat:no-repeat;'
+'	background-position: left center;'
+'	font-weight:900;'
+'	padding-left:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
//+'	text-decoration:none;'
//+'	text-underline-style:none;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'}'

//+'#gmmnu_linksfiles_webui a.icon_utorrent {'
//+'  line-height: 20px;'
//+'	background-image:url('+icon_webui_utorrent+');'
//+'	background-repeat:no-repeat;'
//+'	background-position: left center;'
//+'	font-weight:900;'
//+'	padding-left:20px;'
//+'	overflow:hidden;'
//+'	display:block;'
//+'  font-size:11px;'
//+'	white-space:nowrap;'
//+'	vertical-align:middle;'
//+'}'

/*
+'#gmmnu_linksfiles_webui div.webui div {'
+'  line-height: 20px;'
+'	font-weight:900;'
+'	padding-left:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'	background-repeat:no-repeat;'
+'	background-position: left center;'
+'	background-color:inherit;'
+'}'
+'#gmmnu_linksfiles_webui div.icon_utorrent {'
+'	background-image:url('+icon_webui_utorrent+');'
+'}'
+'#gmmnu_linksfiles_webui div.icon_deluge {'
+'	background-image:url('+icon_webui_deluge+');'
+'}'
+'#gmmnu_linksfiles_webui div.icon_transmission {'
+'	background-image:url('+icon_webui_transmission+');'
+'}'
+'#gmmnu_linksfiles_webui div.icon_vuze {'
+'	background-image:url('+icon_webui_vuze+');'
+'}'
*/

+'#gmmnu_linksfiles_webui div.webui div a {'
+'  line-height: 20px;'
+'	font-weight:900;'
+'	padding-left:20px;'
+'	padding-right:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'	background-color:inherit;'
+'	background-repeat:no-repeat;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_utorrent {'
+'	background-image:url('+icon_webui_utorrent+');'
+'	background-position: left center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_utorrent.sending {'
+'	background-image:url('+icon_webui_utorrent+'), url('+icon_ajaxload+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_utorrent.success {'
+'	background-image:url('+icon_webui_utorrent+'), url('+icon_webui+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_utorrent.error {'
+'	background-image:url('+icon_webui_utorrent+'), url('+icon_error+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_deluge {'
+'	background-image:url('+icon_webui_deluge+');'
+'	background-position: left center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_deluge.sending {'
+'	background-image:url('+icon_webui_deluge+'), url('+icon_ajaxload+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_deluge.success {'
+'	background-image:url('+icon_webui_deluge+'), url('+icon_webui+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_deluge.error {'
+'	background-image:url('+icon_webui_deluge+'), url('+icon_error+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_transmission {'
+'	background-image:url('+icon_webui_transmission+');'
+'	background-position: left center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_transmission.sending {'
+'	background-image:url('+icon_webui_transmission+'), url('+icon_ajaxload+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_transmission.success {'
+'	background-image:url('+icon_webui_transmission+'), url('+icon_webui+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_transmission.error {'
+'	background-image:url('+icon_webui_transmission+'), url('+icon_error+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_vuze {'
+'	background-image:url('+icon_webui_vuze+');'
+'	background-position: left center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_vuze.sending {'
+'	background-image:url('+icon_webui_vuze+'), url('+icon_ajaxload+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_vuze.success {'
+'	background-image:url('+icon_webui_vuze+'), url('+icon_webui+');'
+'	background-position: left center, right center;'
+'}'
+'#gmmnu_linksfiles_webui div.webui a.icon_vuze.error {'
+'	background-image:url('+icon_webui_vuze+'), url('+icon_error+');'
+'	background-position: left center, right center;'
+'}'

/*
+'#gmmnu_linksfiles_webui div a {'
+'  line-height: 20px;'
+'	font-weight:900;'
+'	padding-right:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'	background-image:url('+icon_tick+');'
+'	background-repeat:no-repeat;'
+'	background-position: right center;'
+'	background-color:inherit;'
+'}'
*/
/*
+'#gmmnu_linksfiles_webui div.webui div {'
+'  line-height: 20px;'
+'	font-weight:900;'
+'	padding-right:20px;'
+'	overflow:hidden;'
+'	display:block;'
+'  font-size:11px;'
+'	white-space:nowrap;'
+'	vertical-align:middle;'
+'	background-image:url('+icon_tick+');'
+'	background-repeat:no-repeat;'
+'	background-position: right center;'
+'	background-color:inherit;'
+'}'
*/
+'#GB_settings {'
+'	'
+'}'

+'#gmmnu_menu {'
+'	margin-bottom:-2px;'
+'  line-height: 26px;'
+'	height: 26px;'
+'	font-family:Arial;'
+'  text-align:left;'
//+'  font-size:10px;'
+'	display:block;'
+'	outline:none;'
+'	padding-bottom:1px;'
+'}'
+'#gmmnu_menu .menubar .config {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_config+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .update {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_update+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
//+'	visibility: hidden;'
//+'	display: none;'
+'}'
+'#gmmnu_menu .menubar .update_grey {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_update_grey+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .donate {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_donate+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar .home {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 24px;'
+'	height: 24px;'
+'	background-image:url('+icon_home+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
//twitter icon 15x15 tweak height - donation hover makes it move 1px down
+'#gmmnu_menu .menubar .twitter {'
+'	float: left;'
+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 23px;'
+'	height: 23px;'
+'	background-image:url('+icon_twitter+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	display:inline;'
+'	outline:none;'
+'	width: 20px;'
+'}'
+'#gmmnu_menu .menubar {'
+'	display: block; height: 24px; line-height: 24px; margin-left: -3px; margin-right: -3px;'
+'}'
+'#gmmnu_menu .menubar div :hover {'
//+'	background-color: #CCC;'
+'}'
+'#gmmnu_linksfiles .link a:link, #gmmnu_linksfiles .link a:hover, #gmmnu_linksfiles .link a:active, #gmmnu_linksfiles .link a:visited, #gmmnu_linksfiles .link a:focus, '
+'#gmmnu_linksfiles_webui .link a:link, #gmmnu_linksfiles_webui .link a:hover, #gmmnu_linksfiles_webui .link a:active, #gmmnu_linksfiles_webui .link a:visited, #gmmnu_linksfiles_webui .link a:focus {'
+'	background-color:#FFF;'
+'	color:#FFF;'
+'}'
+'#gmmnu #gmmnu_donations, #gmmnu_twitter {'
+'	position:relative;'
//+'	display: none; margin: 0 -5px -5px -5px; padding:5px 5px 5px 5px;'
+'	display:none;'
+'}'
+'#gmmnu #gmmnu_donations .icon_donate_paypal, #GB_window .icon_donate_paypal {'
+'	margin-top:5px;'
//+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 48px;'
+'	height: 48px;'
+'	background-image:url('+icon_donate_paypal+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	text-align:center;'
+'	display:block;'
+'	outline:none;'
+'	width: 75px;'
+'	text-decoration:none;'
+'}'
+'#gmmnu #gmmnu_donations .icon_donate_flattr, #GB_window .icon_donate_flattr {'
+'	margin-top:5px;'
//+'	margin-bottom:-2px;'
//+'	margin: 0 1px -2px 1px;'
+'	padding: 0 1px 0 1px;'
+'  line-height: 20px;'
+'	height: 20px;'
+'	background-image:url('+icon_donate_flattr+');'
+'	background-repeat:no-repeat;'
+'	background-position: center center;'
+'	text-align:center;'
+'	display:block;'
+'	outline:none;'
+'	width: 75px;'
+'	text-decoration:none;'
+'}'
+'');

var GB_DONE = false;
var GB_HEIGHT = 100;
var GB_WIDTH = 550;

function GB_show(caption, body, height, width) {
	//var winW = window.innerWidth;
	//winH = window.innerHeight;
	//var newW = (winW/2)-275;
	//style='left:"+newW+"px'
  
	GB_HEIGHT = height || 100;
	GB_WIDTH = width || 550;
	if(!GB_DONE) {
		$ljq("#GB_initialize").html("<div id='GB_overlay'></div><div id='GB_window'>\n"
		+"<div class='row'><div class='twelve columns'><div id='GB_caption'>"+caption+"</div>\n"
		+"<div class='close'>Close [X]</div></div></div>\n"
		+"<div class='row'><div class='twelve columns'><div id='GB_body'>\n"+body+"\n</div></div></div></div></div>\n");
		//<img class='close' src='"+gb_close+"' alt='Close window'/>
		//$ljq("#GB_window img").click(GB_hide);
		$ljq("#GB_window div.close").click(GB_hide);
		$ljq("#GB_overlay").click(GB_hide);
		$ljq(window).on("resize", function() {
			GB_position();
		});
	GB_DONE = true;
	}
  
	$ljq(document).on('keydown.facebox', function(e) {
	if (e.keyCode == 27) {
		GB_hide();
	}
	return true;
	});

	$ljq("#GB_initialize").show();
  
	$ljq("#GB_overlay").show();
	GB_position();

	$ljq("#GB_window").show();
}

function GB_hide() {
	$ljq("#GB_initialize").html('');
	$ljq("#GB_window,#GB_overlay,#GB_initialize").hide();
	//GM_log('unbind!');
	$ljq(window).off();
	if (chunkhashRefresh) {
		chunkhashRefresh = false;
		chunkhash();
	}
}

function GB_position() {
	//GM_log('resized!');
	var de = document.documentElement;
	var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	//$ljq("#GB_window").css({width:GB_WIDTH+"px",height:GB_HEIGHT+"px",
	//left: ((w - GB_WIDTH)/2)+"px" });
	$ljq("#GB_window").css({left: ((w - GB_WIDTH)/2)+"px" });
	//$ljq("#GB_frame").css("height",GB_HEIGHT - 32 +"px");
}

//Vars used throughout script
var ZZid = '';
var pattern = '';
var matches = '';
//var Pagebase = '';
//var Pageid = '';
var	running_version = '';
var	latest_version = '';
var hash = '';
var siteuri = '';
var trackers = '';
var title = '';

//Debugging
//GM_setValue('lastCheck', 0);
//GM_setValue('lastVersion', 0);
var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
//alert(lastCheck+" "+lastVersion);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
var name = "";
var ver = "";
var notes = "";

function updateCheck() {
	GMlog("updateCheckStart");
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://userscripts.org/scripts/source/'+scriptId+'.meta.js',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
    onload: function(res) {
    GMlog("updateStatus:"+res.status);
    if (res.status == '200') {
	try {
    var text = res.responseText;
    //alert(text);
    GMlog(text);
    
	pattern = /(@name(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	name = matches[0].replace(pattern, "$3");
	
    pattern = /(@version(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches);
	//alert(matches[0].replace(pattern, "$3"));
	ver = matches[0].replace(pattern, "$3");
	ver = $ljq.trim(ver);
	
	pattern = /(@notes(\t+|\s+)?(.*)(\r|\n)?)/ig;
	matches = text.match(pattern);
	//alert(matches[0].replace(pattern, "$3"));
	notes = matches[0].replace(pattern, "$3");
	
	running_version = parseVersionString(scriptVersion);
	latest_version = parseVersionString(ver);
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	
	var showupdatealert = false;
	//alert(running_version.major+'.'+running_version.minor+'.'+running_version.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
	if (running_version.major < latest_version.major) {
	    // A major new update is available!
	    showupdatealert = true;
	    //alert("Major update");
	} else if (running_version.minor < latest_version.minor) {
	    // A new minor update is available.
	    if (running_version.major <= latest_version.major) {
	    	showupdatealert = true;
	    	//alert("Minor update");
	    }
	} else if (running_version.patch < latest_version.patch){
	    // A new patch update is available.
	    if (running_version.major <= latest_version.major) {
	    	if (running_version.minor <= latest_version.minor) {
	    		showupdatealert = true;
	    		//alert("Patch update");
	    	}
	    }
	}

    if (showupdatealert) {
		showupdatealert = false;
		lastVersion = parseVersionString(lastVersion.toString());
		//alert(lastVersion.major+'.'+lastVersion.minor+'.'+lastVersion.patch+' '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		if (lastVersion.major < latest_version.major) {
		    // A major new update is available!
		    showupdatealert = true;
		    //alert("Major update");
		} else if (lastVersion.minor < latest_version.minor) {
		    // A new minor update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	showupdatealert = true;
		    	//alert("Minor update");
		    }
		} else if (lastVersion.patch < latest_version.patch){
		    // A new patch update is available.
		    if (lastVersion.major <= latest_version.major) {
		    	if (lastVersion.minor <= latest_version.minor) {
		    		showupdatealert = true;
		    		//alert("Patch update");
		    	}
		    }
		}
		
		if (showupdatealert) {
			//Show update alert and info
			//alert("alertUpdate");
			//Old method auto show update overlay
			//alertUpdate(scriptId, name, ver, notes);
			$ljq("#gmmnu_menu .menubar #update_icon a").removeClass('update_grey').addClass('update').attr("data-title", "Update to v"+ver);
		} else {
			//Dont check for 24 hours
			//alert("lastCheck");
			GM_setValue('lastCheck', currentTime);
		}
	} else {
		//Dont check for 24 hours
		//alert("lastCheck");
		GM_setValue('lastCheck', currentTime);
	}
	
	if (debugUpdate == true) {
		alertUpdate(scriptId, name, ver, notes);
	}
	
	} catch(e) {
		GMlog("updateError");
	} //try
	} //status
    } //onload
	});
	GMlog("updateCheckEnd");
}

function alertUpdate(scriptId, name, ver, notes) {
	GB_DONE = false;
	//running_version = parseVersionString(scriptVersion);
	//latest_version = parseVersionString(ver);
	
	var text = '<div class="tab_content" style="padding:0;">\n';
	//text += '<div class="row"><div class="twelve columns">';
	//text += '<p class="text-center">There is an update available for &quot;'+scriptName+'&quot;</p>';
	//text += '</div></div>';
	
	/*
	text += '<div class="row"><div class="twelve columns text-center">';
	text += '';
	text += '</div></div>';
	*/
	
	text += '<div class="row"><div class="twelve columns text-center">\n';
	text += '<p class="text-center"><strong>Upgrade to the Latest!</strong></p>\n';
	text += '</div></div>\n';
	text += '<div class="row" style="height:60px;">\n';
	text += '';
		text += '<div class="four columns"></div>\n';
		text += '<div class="two columns text-center">\n';
			text += '<div style="height:69px; width:60px; background-image: url('+update_grey+'); background-repeat:no-repeat; background-position:center;">\n';
				text += '<div style="padding-top:25px; background:none; font-size:13px; margin-left:2px;" class="text-center">'+running_version.major+'.'+running_version.minor+'.'+running_version.patch+'</div>\n';
			text += '</div>\n';
		text += '</div>\n';
		text += '';
		text += '<div class="two columns text-center">\n';
			text += '<div style="height:69px; width:60px; background-image: url('+update_green+'); background-repeat:no-repeat; background-position:center;">\n';
				text += '<div style="padding-top:25px; background:none; font-size:13px; margin-left:2px;" class="text-center">'+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+'</div>\n';
			text += '</div>\n';
		text += '</div>\n';
		text += '<div class="four columns"></div>\n';
	text += '';
	text += '</div>\n';
	
	text += '<div class="row" style="margin-top:10px;">\n';
	text += '';
		text += '<div class="four columns"></div>\n';
		text += '<div class="two columns">\n';
			text += '<p class="text-center" style="font-size: 13px; padding-right:10px">Installed</p>\n';
		text += '</div>\n';
		text += '';
		text += '<div class="two columns">\n';
			text += '<p class="text-center" style="color: #198835; font-size: 13px; margin-left:-6px;">Available</p>\n';
		text += '</div>\n';
		text += '<div class="four columns"></div>\n';
	text += '';
	text += '</div>\n';
	
	
	
	text += '<div class="row" style="border-top:1px solid #000; padding-top:5px;"><div class="twelve columns">\n';
		text += '<p class="text-center"><strong>What would you like to do?</strong></p>\n';
	text += '</div></div>\n';
	
	text += '<div class="row"><div class="twelve columns text-center">\n';
		//text += '<div class="two columns"></div>';
		text += '<div class="six columns text-right">\n';
			//text += '<a href="https://userscripts.org/scripts/show/'+scriptId+'" target="_blank" class="small blue nice button radius full-width text-center">Go to Script Homepage</a>\n';
			text += '<a href="http://www.magnettracker.com/" target="_blank" class="small blue nice button radius full-width text-center">Go to Script Homepage</a>\n';
		text += '</div>\n';
		text += '<div class="six columns">\n';
			text += '<a href="https://userscripts.org/scripts/source/'+scriptId+'.user.js" target="_blank" class="small green nice button radius full-width text-center">Upgrade to '+latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch+' now</a>\n';
		text += '</div>\n';
		//text += '<div class="two columns"></div>';
	text += '</div></div>\n';
	
	text += '<div class="row" style="padding-top:5px;"><div class="twelve columns text-center">\n';
		//text += '<div class="two columns"></div>';
		text += '<div class="six columns text-right">\n';
			text += '<a href="#" id="gb_update_wait" class="tiny black nice button radius full-width text-center">Remind me tomorrow</a>\n';
		text += '</div>\n';
		text += '<div class="six columns">\n';
			text += '<a href="#" id="gb_update_waitnextversion" class="tiny black nice button radius full-width text-center">Skip this version</a>\n';
		text += '</div>\n';
		//text += '<div class="two columns"></div>';
	text += '</div></div>\n';
	
	text += '<div class="row"><div class="twelve columns">\n';
		text += '&nbsp;';
	text += '</div></div>\n';
	
	text += '<div class="row" style="border-top:1px solid #000; padding-top:5px;"><div class="twelve columns">\n';
		text += '<p class="text-center"><strong>Donations and Reviews</strong></p>\n';
	text += '</div></div>\n';
	
	text += '<div class="row"><div class="twelve columns">\n';
		text += '<p class="text-center">\n';
		text += 'Please consider Donating or writing a Review if you enjoy using this userscript.<br/>\n';
		text += 'Donation options can be found in the menu or the Configuration overlay.\n';
		text += '</p>\n';
	text += '</div></div>\n';
	
	text += '<div class="row" style="border-top:1px solid #000; padding-top:5px;"><div class="twelve columns">\n';
		text += '<p class="text-center"><strong>Update Notes</strong></p>\n';
	text += '</div></div>\n';
	text += '<div class="row"><div class="twelve columns">\n';
		text += '<p>'
		text += notes.replace(/\\/g, '');
		text += '</p>';
	text += '</div></div>\n';
	
	//$ljq("#GB_body").html(ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/>'+ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/><br/><br/>'+ver+'<br/>'+id+'<br/>'+name+'<br/>'+notes+'<br/>');
	//$ljq("#GB_body").html(text);

	var t = '<span style="font-weight:bold;">Update Alert! - '+scriptName+'</span>\n';
	//name
    //GB_show(t,u,600,600);
    GB_show(t,text,0,550);
    //return false;    
    //alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
    
    //Initial display of content - check height
	tab_content_height();
}

function showConfiguration(tab) {
	GB_DONE = false;
	var options_trackers = '';
	//for(var x=json_trackers.length-1; x >= 0; x--) {
	for(var x=json_trackers.trackers.length-1; x >= 0; x--) {
		//alert(json_trackers[x]);
		//options_trackers += '<option value="'+x+'">'+json_trackers[x]+'</option>';
		//options_trackers += '<option>'+json_trackers[x]+'</option>';
		//options_trackers += '<option value="'+x+'">'+json_trackers.trackers[x].url+'</option>\n';
		options_trackers += '<option>'+json_trackers.trackers[x].url+'</option>\n';
		//alert(json_trackers.trackers[x].url);
	}
	
	//var options_sites = '';
	//for (var x=0; x <= asites.length-1; x++) {
	//	options_sites += '<option value="'+x+'">'+asites[x]+'</option>';
	//}
	
	var lists_lists = '';
	for (var x=0; x <= json_lists.lists.length-1; x++) {
		//lists_lists += '<option value="'+x+'">'+json_lists.lists[x].list_name+'</option>\n';
		//lists_lists += '<option value="'+json_lists.lists[x].list_name+'">'+json_lists.lists[x].list_name+'</option>\n';
		lists_lists += '<option>'+json_lists.lists[x].list_name+'</option>\n';
	}
	
	var webuis_connections = '';
	for (var x=0; x <= json_webui.ui.length-1; x++) {
		webuis_connections += '<option>'+json_webui.ui[x].name+'</option>\n';
		//{"name": "", "hostip": "","hostport": "","hostuser": "","hostpass": "","client": "","enabled": true,"https": false}
	}
	
	//var options_sites = '';
	//for(var x=asites.length-1; x >= 0; x--) {
		//alert(json_trackers[x]);
		//options_sites += '<option value="'+x+'">'+asites[x]+'</option>';
	//}
	//alert(asites.length);
	
	//<div class="row"><div class="twelve columns">
	//<div class="row">
	//<div class="twelve columns">
	//</div>
	
	var t = '<span>'+scriptName+' - Configuration...</span>';
	var text = ''
		+'<ul class="tabs">'
		+'<li><a href="#gm_tab_about" class="about">About</a></li>'
		+'<li><a href="#gm_tab_trackers" class="trackers">Trackers</a></li>'
		+'<li><a href="#gm_tab_lists" class="lists">Lists</a></li>'
		+'<li><a href="#gm_tab_webui" class="webui">WebUI</a></li>'
		//+'<li><a href="#gm_tab_rescue" class="rescue">Rescue</a></li>'
		+'<li><a href="#gm_tab_help" class="help">Help</a></li>'
		+'</ul>'
		+'<div class="tab_container">'
			+'<div id="gm_tab_about" class="tab_content">'
			+'	<div class="row"><div class="twelve columns" style="border-bottom: 1px #AAA dashed;"><h6 style="display:inline;">'+scriptName+' [v'+scriptVersion+']</h6>'
			+'	<a href="http://userscripts.org/scripts/show/'+scriptId+'" style="display:inline;">http://userscripts.org/scripts/show/'+scriptId+'</a>'
			+'	</div></div>'
			
			+'	<div class="row">'
			+'		<div class="two columns text-center">'
			+'			<a href="'+donationLink_flattr+'" target="_blank" class="icon_donate_flattr text-center">'
			//+'			<img src="'+icon_donate_flattr+'">'
			+'			</a>'
			//+'				<div style="height:10px; clear:both;"></div>'
			+'			<a href="'+donationLink_paypal+'" target="_blank" class="icon_donate_paypal text-center">'
			//+'			<img src="'+icon_donate_paypal+'">'
			+'			</a>'
			+'		</div>'
			//+'		<div class="one columns"></div>'
			+'		<div class="ten columns">'
			+'			<p>Donations are for the time spent creating and updating this userscript and are greatly appreciated!'
			+'			<br>This script has been released as Open Source under the GPL.</p>'
			+'		</div>'
			+'	</div>'

			+'	<div class="row"><div class="twelve columns">'
			+'		<h6 class="dashed">This versions update text...</h6>'
			+'		<p>'+scriptUpdateText+'</p>'
			+'	</div></div>'
			+'</div>'
			
			+'<div id="gm_tab_trackers" class="tab_content">'
			+'	<div class="row"><div class="twelve columns"><h6 class="dashed">Trackers <span id="gm_tab_trackers_status" style="display:none;" class="radius label right"></span></h6></div></div>'
			//+'	Customize the default trackers...<br>'
			//+'	<input id="gm_settings_trackers_add" style="width:350px;" type="text">'
			
				/*
				+'	<div class="row">'
					+'	<div class="six columns">'
					+'	</div>'
					+'	<div class="six columns">'
						+'Select then delete'
					+'	</div>'
				+'	</div>'
				+'	<div class="row">'
					+'	<div class="six columns">'
					+'	</div>'
					+'	<div class="six columns">'
					+'	</div>'
				+'	</div>'
				*/
				
				+'	<div class="row">'
					+'	<div class="twelve columns nice">'
						+'	<label for="gm_settings_trackers_add">Add Trackers - one per line</label>\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_trackers_add_btn" type="button" value="Add">\n'
					+'	</div>'
				+'	</div>'
				+'	<div class="row">'
					+'	<div class="twelve columns nice">'
						+'	<textarea id="gm_settings_trackers_add" rows="3" class="expand" style="overflow:auto;"></textarea>\n'
					+'</div>'
				+'	</div>'
				+'	<div class="row">'
					+'	<div class="twelve columns nice">'
						+'	Delete Trackers\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_trackers_delete_btn" type="button" value="Delete">\n'
					+'	</div>'
				+'	</div>'
				+'	<div class="row">'
					+'	<div class="twelve columns nice">'
						+'	<select id="gm_settings_trackers_sel" size="10" multiple="multiple" style="width:100%; overflow-y:scroll;">\n'
						+''+	options_trackers
						+'	</select>\n'
					+'</div>'
				+'	</div>'
				
			//+'	<div style="clear:both;"></div>'
			+'</div>'
			
			/* === gm_tab_lists === */
			+'<div id="gm_tab_lists" class="tab_content">\n'
			+'	<div class="row"><div class="twelve columns"><h6 class="dashed">Lists <span id="gm_tab_lists_status" style="display:none;" class="radius label right"></span></h6></div></div>'
				//================
				//Create a List / Load a list / Rename a List
				//================
				+'	<div class="row">'
					+'	<div class="six columns nice">'
						+'	<label for="gm_settings_lists_create_txt">Create a List</label>\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_lists_create_btn" type="button" value="Create">\n'
						+'	<input class="expand input-text" id="gm_settings_lists_create_txt" type="text">\n'
					+'</div>'
					+'	<div class="six columns nice">'
						+'	<label for="gm_settings_lists_sel">Available Lists</label>\n'
						//+'	<input id="gm_settings_lists_rename_btn" style="float:right;" type="button" value="Rename">\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_lists_delete_btn" type="button" value="Delete">\n'
						+'	<select id="gm_settings_lists_sel" style="width:100%;">'+lists_lists+'</select>\n'
					+'</div>'
				+'	</div>'
			//+'	<div style="clear:both; height:30px;"></div>'
				//================
				//Available sites / Sites in list
				//================
				+'	<div class="row">'
					+'	<div class="six columns nice">'
						+'	Available Sites\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_list_sites_add_btn" type="button" value="Add to List >>">\n'
						+'	<select id="gm_settings_list_sites_sel" size="10" style="width:100%;" multiple="multiple"></select>\n'
					+'</div>'
					+'	<div class="six columns nice">'
						+'	Sites in List\n'
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_list_sitesin_delete_btn" type="button" value="Delete">\n'
						+'	<select id="gm_settings_list_sitesin_sel" size="10" style="width:100%;" multiple="multiple"></select>\n'
					+'</div>'
				+'	</div>'
			//+'	<div style="clear:both; height:30px;"></div>'
				//================
				//Available trackers / Trackers in list
				//================
				+'	<div class="row">'
					+'	<div class="six columns nice">'
						+'	Available Trackers '
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_list_trackers_add_btn" type="button" value="Add to List >>"><br>'
						+'	<select id="gm_settings_list_trackers_sel" size="10" style="width:100%;" multiple="multiple">\n'+options_trackers+'\n</select>\n'
					+'	</div>'
					+'	<div class="six columns nice">'
						+'	Trackers in List '
						+'	<input class="blue nice button radius xtiny right" id="gm_settings_list_trackersin_delete_btn" type="button" value="Delete"><br>'
						//+'	<div style="overflow:auto; width:100%; height:auto; border:1px solid #555;" class="expand">'
						+'	<select id="gm_settings_list_trackersin_sel" size="10" style="width:100%;" multiple="multiple"></select>\n'
						//border:0; overflow:hidden;
						//+'	</div>'
					+'	</div>'
				+'	</div>'
			//+'	<div style="clear:both;"></div>'
			+'</div>'
			
			/* === gm_tab_webui === */
			+'<div id="gm_tab_webui" class="tab_content">'
			+'<div class="row"><div class="twelve columns"><h6 class="dashed">WebUI Connections <span id="gm_tab_webui_status" style="display:none;" class="radius label right"></span></h6></div></div>'
			
			//================
			//Create WebUI / Load WebUI / Rename WebUI
			//================
			+'	<div class="row">'
				+'	<div class="six columns nice">'
					+'	<label>Create a Connection \n'
					//+'	<input class="blue nice button radius xtiny right" id="gm_settings_webui_create_btn" type="button" value="Create">\n'
					+'	<input class="expand input-text nice" id="gm_settings_webui_create_txt" type="text" style="margin-top:7px;"></label>\n'
				+'	</div>'
				+'	<div class="six columns nice">'
					+'	<label for="gm_settings_webui_connections_sel">Available Connections</label>\n'
					//+'	<input id="gm_settings_webuis_rename_btn" style="float:right;" type="button" value="Rename">\n'
					+'	<input class="blue nice button radius xtiny right" id="gm_settings_webui_delete_btn" type="button" value="Delete">\n'
					+'	<select id="gm_settings_webui_connections_sel" style="width:100%;"><option>Select a Connection</option>'+webuis_connections+'</select>\n'
				+'	</div>'
			+'	</div>'
			
			+'	<div class="row">'
				+'	<div class="six columns nice">'
					+'	<label for="gm_settings_webui_client_sel">Available Clients</label> <br />\n'
					+'	<select id="gm_settings_webui_client_sel" style="width:100%;">'
					//+'	<option>Select a Client</option>\n'
					+'	<option value="utorrent">uTorrent</option>\n'
					//+'	<option value="deluge">Deluge</option>\n'
					//+'	<option value="transmission">Transmission</option>\n'
					//+'	<option value="vuze">Vuze</option>\n'
					+'	</select>\n'
				+'	</div>'
				+'	<div class="six columns nice">'
					+'	<div class="row"><div class="twelve columns"><label><input id="gm_settings_webui_enabled_cb" type="checkbox" value="true"> Enabled (Show in menu)</label></div></div>\n'
					+'	<div class="row"><div class="twelve columns"><label><input id="gm_settings_webui_https_cb" type="checkbox" value="true"> Use HTTPS</label></div></div>\n'
				+'	</div>'
			+'	</div>'
			
			+'	<div class="row">'
				+'	<div class="six columns nice">'
					+'	<label>Host IP / Address <br />\n'
					+'	<input class="expand input-text" id="gm_settings_webui_hostip_txt" type="text"></label>\n'
				+'	</div>'
				+'	<div class="six columns nice">'
					+'	<label>Username <br />\n'
					+'	<input class="expand input-text" id="gm_settings_webui_username_txt" type="text"></label>\n'
				+'	</div>'
			+'	</div>'
			
			+'	<div class="row">'
				+'	<div class="six columns nice">'
					+'	<label>Host Port <br />\n'
					+'	<input class="expand input-text" id="gm_settings_webui_hostport_txt" type="text"></label>\n'
				+'	</div>'
				+'	<div class="six columns nice">'
					+'	'
					+'	<label>Password <span class="white radius small label right">Passwords are not encrypted.</span><br />\n'
					+'	<input class="expand input-text" id="gm_settings_webui_password_txt" type="password"></label>\n'
				+'	</div>'
			+'	</div>'

			//+'	<div class="row">'
			//+'	<div class="twelve columns">'
			//+'	&nbsp;'
			//+'	</div>'
			//+'	</div>\n'
			
			+'	<div class="row">\n'
				+'	<div class="twelve columns">\n'
				//+'	<div class="six columns">'
				//+'	</div>'
				//+'	<div class="three columns">'
				//+'	<input class="black nice button radius tiny right" id="gm_settings_webui_cancel_btn" type="button" value="Cancel">\n'
				//+'	</div>'
				//+'	<div class="three columns">'
				+'	<input data-text-save="Save Changes" data-text-create="Create + Save Changes" class="white nice button radius mtiny right" id="gm_settings_webui_save_btn" type="button" value="Save Changes">\n'
				+'	<input class="white nice button radius mtiny right" style="margin-right:10px;" id="gm_settings_webui_cancel_btn" type="button" value="Cancel">\n'
				+'	</div>\n'
			+'	</div>\n'

			+'	<div class="row">\n'
				+'	<div class="twelve columns">\n'
						+'Connection Tips:<br />\n'
						+'Check your username, password, host address and port.<br />\n'
						+'Read about Port Forwarding on your router.<br />\n'
						+'Have a Dynamic IP? Look into <a href="https://freedns.afraid.org/" target="_blank">FreeDNS</a><br />\n'
						+'HTTPS requires software installed on your computer (see WebUI docs below)<br />\n'
						+'uTorrent WebUI docs - <a href="http://www.utorrent.com/help/guides/webui/" target="_blank">http://www.utorrent.com/help/guides/webui/</a>\n'
				+'	</div>\n'
			+'	</div>\n'
			+''
			+'</div>'
			
			/*
			+'<div id="gm_tab_rescue" class="tab_content">'
			+'<div class="row"><div class="twelve columns"><h6 class="dashed">Rescue <span id="gm_tab_rescuep_status" style="display:none;" class="radius label right"></span></h6></div></div>'
				+'	<div class="row"><div class="twelve columns">'
					+'	<p class="left">These actions CANNOT be undone!</p>'
				+'	</div></div>'
				+'	<div class="row"><div class="two columns">'
						+'	<input id="gm_rescue_lastcheck_btn" type="button" value="Reset" class="nice button red xtiny">'
					+'	</div>'
					+'	<div class="ten columns">'
						+'	Reset lastCheck value for Updates.'
				+'	</div></div>'
				+'	<div class="row"><div class="two columns">'
						+'	<input id="gm_rescue_lastversion_btn" type="button" value="Reset" class="nice button red xtiny">'
					+'	</div>'
					+'	<div class="ten columns">'
						+'	Reset lastVersion value for Updates.'
				+'	</div></div>'
				+'	<div class="row"><div class="two columns">'
						+'	<input id="gm_rescue_deletetrackers_btn" type="button" value="Reset" class="nice button red xtiny">'
					+'	</div>'
					+'	<div class="ten columns">'
						+'	Reset Trackers to Defaults.'
				+'	</div></div>'
				+'	<div class="row"><div class="two columns">'
						+'	<input id="gm_rescue_deletelists_btn" type="button" value="Reset" class="nice button red xtiny">'
					+'	</div>'
					+'	<div class="ten columns">'
						+'	<p>Reset Lists to Defaults.</p>'
				+'	</div></div>'
			+'</div>'
			*/
			
			+'<div id="gm_tab_help" class="tab_content">'
			+'<div class="row"><div class="twelve columns"><h6 class="dashed">Help <span id="gm_tab_help_status" style="display:none;" class="radius label right"></span></h6></div></div>'
			+'	<div class="row"><div class="twelve columns">'
				+'	<p>Head over to <a href="http://userscripts.org/scripts/discuss/'+scriptId+'">Discussions</a> '
				+'	and create a topic for help.<br>'
				+'	<a href="http://userscripts.org/topics/49347?page=1" target="_blank">Instructions - Adding Trackers</a><br>'
				+'	<a href="http://userscripts.org/topics/49337?page=1" target="_blank">Instructions - Using Lists</a><br>'
				+'	<a href="http://userscripts.org/topics/113579?page=1" target="_blank">Instructions - WebUI Connections</a><br>'
				+'	<a href="http://userscripts.org/topics/99509?page=1" target="_blank">Instructions - Installing in Chrome</a><br>'
				+'	<a href="http://userscripts.org/topics/119477?page=1" target="_blank">Upgrade v0.5.0 instructions</a>'
				+'	</p>'
			+'	</div></div>'
			+'</div>'

			
		+'</div>'
		+'';
    GB_show(t,text,0,550);
    
    //$ljq("#gm_rescue_lastcheck_btn").click(function() {
    //});
    
    //$ljq("#gm_rescue_lastversion_btn").click(function() {
    //});
    
    //=====================
    //	Fields							Buttons
    //
    //Lists
    //	gm_settings_lists_create_txt	gm_settings_lists_create_btn
   	//	gm_settings_lists_sel			gm_settings_lists_delete_btn
   	//	//gm_settings_lists_rename_txt	//gm_settings_lists_rename_btn
   	//									gm_settings_lists_save_btn
   	//									//gm_settings_lists_cancel_btn
   	//
    //Sites
    //	gm_settings_list_sites_sel		gm_settings_list_sites_add_btn
    //	gm_settings_list_sitesin_sel	gm_settings_list_sitesin_delete_btn
    //
    //Trackers
    //	gm_settings_list_trackers_sel		gm_settings_list_trackers_add_btn
    //	gm_settings_list_trackersin_sel		gm_settings_list_trackersin_delete_btn
    //
    //WebUI
	//  gm_settings_webui_create_txt		//gm_settings_webui_create_btn
	//										gm_settings_webui_delete_btn
	//										gm_settings_webui_save_btn
	//										gm_settings_webui_cancel_btn
	//
	//  gm_settings_webui_connections_sel	
	//	gm_settings_webui_client_sel
	//	gm_settings_webui_enabled_cb
	//	gm_settings_webui_https_cb
	//	gm_settings_webui_hostip_txt
	//	gm_settings_webui_username_txt
	//	gm_settings_webui_hostport_txt
	//	gm_settings_webui_password_txt
    //=====================
    
    function show_confirm(msg) {
	var r=confirm(msg);
		if (r) {
			//alert("You pressed OK!");
			return true;
		} else {
 			//alert("You pressed Cancel!");
 			return false;
 		}
	}
	
	//================
    //CURRENT_LIST
    //================
	function current_list() {
    	//var curlist;
    	for (var i=0; i <= json_lists.lists.length-1; i++) {
	    	if ($ljq("#gm_settings_lists_sel option:selected").text() == json_lists.lists[i].list_name) {
	    		//GMlog($ljq("#gm_settings_lists").text() +' == '+json_lists.lists[i].list_name);
	    		//return i;
	    		//curlist = i;
	    	break;
	    	}
	    }
	    //GMlog("current_list = "+curlist);
	    GMlog("current_list = "+i);
	    return i;
    }
    
    //================
    //LOAD_LIST
    //================
    function load_list(name) {
    	GMlog("load_list: "+name);
    	$ljq("#gm_tab_lists_status").hide();
    	//Disable sitesin if Default list (dont remove *)
    	//Disable sites if Default list (dont add)
    	//var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
    	//alert($ljq("#GB_window").height());
    	
    	//***
    	//Refactor - chain actions
    	// x, y disabled
    	//***
    	if (name.toLowerCase() == "default") {
    		GMlog("load_list name == Default");
    		$ljq('#gm_settings_list_sitesin_sel').attr("disabled", true);
    		$ljq('#gm_settings_list_sitesin_delete_btn').attr("disabled", true);
    		$ljq('#gm_settings_list_sites_sel').attr("disabled", true);
    		$ljq('#gm_settings_list_sites_add_btn').attr("disabled", true);
    	} else {
    		$ljq('#gm_settings_list_sitesin_sel').attr("disabled", false);
    		$ljq('#gm_settings_list_sitesin_delete_btn').attr("disabled", false);
    		$ljq('#gm_settings_list_sites_sel').attr("disabled", false);
    		$ljq('#gm_settings_list_sites_add_btn').attr("disabled", false);
    	}
    	
    	//Clear sites and trackers to repopulate
		$ljq('#gm_settings_list_sitesin_sel, #gm_settings_list_trackersin_sel, #gm_settings_list_sites_sel, #gm_settings_list_trackers_sel').empty();
    	//alert('Loading list: '+name);
    	
    	//global trackers, trackers (list), sites (list)
    	//var zzgtrackers = [];
    	//zztrackers = tmp array of trackers for list
    	var zztrackers = [];
    	//zzsites = tmp array of sites for list
    	var zzsites = [];
    	for (var x=0; x <= json_lists.lists.length-1; x++) {
    		//alert(name + " : " + json_lists.lists[x].list_name);
    		GMlog("load_list lists loop : "+json_lists.lists[x].list_name);
    		if (name.toLowerCase() == json_lists.lists[x].list_name.toLowerCase()) {
    			//alert('found!');
    			//load sites into listbox
    			for (var i=0; i <= json_lists.lists[x].sites.length-1; i++) {
    				zzsites[i] = json_lists.lists[x].sites[i].site_name;
    				//alert(json_lists.lists[x].sites[i].site_name);
    				$ljq('#gm_settings_list_sitesin_sel').append('<option>'+json_lists.lists[x].sites[i].site_name+'</option>\n');
    				//alert(json_lists.lists[x].sites[i].name);
    			}
    			//load trackers into listbox
    			for (var i=0; i <= json_lists.lists[x].trackers.length-1; i++) {
    				zztrackers[i] = json_lists.lists[x].trackers[i].url;
    				$ljq('#gm_settings_list_trackersin_sel').append('<option>'+json_lists.lists[x].trackers[i].url+'</option>\n');
    				//alert(json_lists.lists[x].trackers[i].url);
    			}
    			//alert(zztrackers.length);
    			
    			//reload available sites
    			//alert(zzsites.length);
				for(var i=asites.length-1; i >= 0; i--) {
				var zzs = true;
					for (var j=0; j <= zzsites.length-1; j++) {
    					//Only show sites that arent already added
    					if (asites[i] == zzsites[j]) {
    						zzs = false;
    						//alert(asites[i]+" == "+zzsites[j]);
						}
					}
					if (zzs) {
						//$ljq('#gm_settings_list_sites_sel').append('<option value="'+i+'">'+asites[i]+'</option>\n');
						$ljq('#gm_settings_list_sites_sel').append('<option>'+asites[i]+'</option>\n');
					}
				}
    			
    			//reload available trackers
    			for(var i=json_trackers.trackers.length-1; i >= 0; i--) {
    			var zzs = true;
    				for (var j=0; j <= zztrackers.length-1; j++) {
    					//Only show trackers that arent already added
    					if (json_trackers.trackers[i].url == zztrackers[j]) {
    						zzs = false;
    						//alert(json_trackers.trackers[i].url+" == "+zztrackers[j]);
						}
					}
					if (zzs) {
						//$ljq('#gm_settings_list_trackers_sel').append('<option value="'+i+'">'+json_trackers.trackers[i].url+'</option>\n');
						$ljq('#gm_settings_list_trackers_sel').append('<option>'+json_trackers.trackers[i].url+'</option>\n');
						//alert(json_trackers.trackers[i].url);
					}
				}
    		//stop searching
    		GMlog("load_list stop searching");
    		break;
    		}
    		//alert(json_lists.lists[x].name);
    	}
    	
    }
    
    //================
    //ON LISTS CHANGE
    //================
	$ljq("#gm_settings_lists_sel").change(function() {
		//alert($ljq(this).val() + " : " + $ljq("#gm_settings_lists option:selected").text());
		//load_list($ljq(this).val());
		GMlog("#gm_settings_lists_sel .change");
		load_list($ljq("#gm_settings_lists_sel option:selected").text());
		return false;
	});
    
    //$ljq("#gm_settings_list_sites_add_btn").click(function() {
    	//alert("delete clicked!");
    	//$ljq("#gm_settings_list_sites_sel option:selected").each(function() {
    		//$ljq("#gm_settings_list_sitesin_sel").append();
    		//alert($ljq(this).val());
    	//});
    	//return false;
    //});
    
    //================
    //[Lists] Create list
    //================
    $ljq("#gm_settings_lists_create_btn").click(function() {
    	var zzcreatelist = '';
    	//alert("create clicked!");
    	//"#gm_settings_lists_create_txt = txtfield = val
    	if ($ljq.trim($ljq("#gm_settings_lists_create_txt").val()).length > 0) {
    		zzcreatelist = $ljq("#gm_settings_lists_create_txt").val();
    		GMlog("#gm_settings_lists_create_btn : "+zzcreatelist);
    		//alert($ljq("#gm_settings_lists_create_txt").val());
    		//check to make sure name doesn't already exist
    		var unique = true;
    		$ljq("#gm_settings_lists_sel option").each(function() {
				GMlog(zzcreatelist.toLowerCase()+' == '+$ljq(this).text().toLowerCase());
    			if (zzcreatelist.toLowerCase() == $ljq(this).text().toLowerCase()) {
    				GMlog("#gm_settings_lists_create_txt unique = false");
    				unique = false;
    			}
    		});
    		if (unique) {
    			$ljq("#gm_tab_lists_status").hide();
    			$ljq("#gm_settings_lists_sel option").removeAttr('selected');
				$ljq("#gm_settings_lists_sel").append("<option selected='selected'>"+zzcreatelist+"</option>");
				//json_lists.lists[2].trackers.push(JSON.parse('{"url": "test3"}'));
				//alert(json_lists.lists.length)
				//json_lists.lists.push(JSON.parse('{"list_name":"'+zzcreatelist+'","sites":[],"trackers":[]}'));
				GMlog("create list - splice at: "+json_lists.lists.length);
				json_lists.lists.splice(json_lists.lists.length, 0, {"list_name":""+zzcreatelist+"","sites":[],"trackers":[]});
				//alert(json_lists.lists.length)
				//alert(JSON.stringify(json_lists));
				update_gmlists();
				load_list(zzcreatelist);
				chunkhashRefresh = true;
				$ljq("#gm_settings_lists_create_txt").val('');
				$ljq("#gm_tab_lists_status").removeClass("red").addClass("green").html("List created!").show();
				//$ljq("#gm_settings_lists_create_txt").empty();
				//GMlog("[Lists] Create list chunkhash");
    		} else {
    			$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("A List with that name already exists.").show();
    			//alert("A list with that name already exists.");
    		}
    	} else {
    		$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You must enter a List name.").show();
    		$ljq("#gm_settings_lists_create_txt").val('');
    		//alert("You must enter a list name.");
    	}
    	zzcreatelist = '';
    	return false;
    });
    
    //================
    //[Lists] Delete list
    //================
    $ljq("#gm_settings_lists_delete_btn").click(function() {
    	//alert("delete clicked!");
    	if ($ljq("#gm_settings_lists_sel").length > 0) {
    		GMlog("#gm_settings_lists_delete_btn : "+$ljq('#gm_settings_lists_sel').val());
    		//alert($ljq("#gm_settings_trackers_sel option:selected").text());
    		if ("Default" == $ljq('#gm_settings_lists_sel').val()) {
    			//alert("You can't delete the Default list.");
    			$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You can't delete the Default List.").show();
    		} else {
    			$ljq("#gm_tab_lists_status").hide();
    			var conf_del = show_confirm("Confirm: Remove the List '"+$ljq('#gm_settings_lists_sel option:selected').text()+"'?");
    			//alert(conf_del);
    			if (conf_del) {
    				$ljq("#gm_tab_lists_status").hide();
    				//loop through and find list index
    				//for (var i=0; i <= json_lists.lists.length-1; i++) {
    					//if ($ljq('#gm_settings_lists_sel').val() == json_lists.lists[i].name) {
    						//alert(i+' '+json_lists.lists[i].name);
    						var curlist = current_list();
    						//Splice and remove
    						json_lists.lists.splice(curlist, 1);
    						update_gmlists();
    						chunkhashRefresh = true;
    						//var zzi = JSON.stringify(json_lists);
				    		//alert(zzi);
				    		$ljq("#gm_settings_lists_sel option:selected").remove();
				    		//load_list($ljq("#gm_settings_lists_sel option:selected").val());
				    		load_list($ljq("#gm_settings_lists_sel option:selected").text());
				    		//GMlog("[Lists] Delete site chunkhash");
				    		//chunkhash(); //reload list
    					//}
    				//}
    				$ljq("#gm_tab_lists_status").removeClass("red").addClass("green").html("List deleted!").show();
    			}
    		}//if default
    	}
    	return false;
    });
    
    //================
    //[Lists] Delete site
    //================
    $ljq("#gm_settings_list_sitesin_delete_btn").click(function() {
    	//alert("delete site clicked!");
    	if ($ljq("#gm_settings_list_sitesin_sel :selected").length > 0) {
    	var curlist = current_list();
		//alert(curlist);
			//var conf_del = show_confirm("Confirm: Remove the selected Sites?");
    		//if (conf_del) {
    			$ljq("#gm_settings_list_sitesin_sel :selected").each(function() {
    				$ljq("#gm_tab_lists_status").hide();
		    		//alert($ljq(this).val());
   					//loop through and find list index
   					//for (var i = 0; i <= json_lists.lists[curlist].sites.length-1; i++) {
   					//deleting - move backwards
   					for (var i=json_lists.lists[curlist].sites.length-1; i >=0 ; i--) {
   						if ($ljq(this).val() == json_lists.lists[curlist].sites[i].site_name) {
   							//alert(i+' '+json_lists.lists[curlist].sites[i].name);
   							//Splice and remove
   							json_lists.lists[curlist].sites.splice(i, 1);
   							//var zzi = JSON.stringify(json_lists);
			    			//alert(zzi);
				    		$ljq("#gm_settings_list_sitesin_sel option:selected").remove();
				    		//load_list($ljq("#gm_settings_lists_sel option:selected").val());
   							break;
	   					}
   					}
	    		});
	    		update_gmlists();
	    		chunkhashRefresh = true;
	    		//load_list($ljq("#gm_settings_lists_sel").val());
	    		load_list($ljq("#gm_settings_lists_sel option:selected").text());
	    		$ljq("#gm_tab_lists_status").removeClass("red").addClass("green").html("Sites deleted from List!").show();
	    		//GMlog("[Lists] Delete site chunkhash");
	    		//chunkhash(); //reload list
	    	//}
    	} else {
    		//alert("You must select sites to delete.");
    		$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You must select Sites to delete.").show();
    		
    	}
    	return false;
    });
    
    //================
    //[Lists] Add site
    //================
    $ljq("#gm_settings_list_sites_add_btn").click(function() {
    	//alert("add site clicked!");
    	if ($ljq("#gm_settings_list_sites_sel :selected").length > 0) {
    	$ljq("#gm_tab_lists_status").hide();
    	var curlist = current_list();
		//alert(curlist);
    		$ljq("#gm_settings_list_sites_sel :selected").each(function() {
	    		//alert($ljq(this).val());
    			$ljq('#gm_settings_list_sitesin_sel').append('<option>'+$ljq(this).text()+'</option>');
	    		//json_lists.lists[curlist].sites.push(JSON.parse('{"site_name":"'+$ljq(this).text()+'"}'));
	    		GMlog("lists add site - splice at: "+json_lists.lists[curlist].sites.length);
				json_lists.lists[curlist].sites.splice(json_lists.lists[curlist].sites.length, 0, {"site_name":""+$ljq(this).text()+""});
    			//alert(json_lists.lists.length)
	    		//var zzi = JSON.stringify(json_lists);
    			//alert(zzi);
	    	});
	    	update_gmlists();
	    	chunkhashRefresh = true;
	    	//load_list($ljq("#gm_settings_lists_sel").val());
	    	load_list($ljq("#gm_settings_lists_sel option:selected").text());
	    	$ljq("#gm_tab_lists_status").removeClass("red").addClass("green").html("Sites added to List!").show();
	    	//GMlog("[Lists] Add site chunkhash");
	    	//chunkhash(); //reload list
    	} else {
    		//alert("You must select sites to add.");
    		$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You must select Sites to add.").show();
    	}
    	return false;
    });

    //================
    //[Lists] Delete tracker
    //================
    $ljq("#gm_settings_list_trackersin_delete_btn").click(function() {
    	//alert("delete tracker clicked!");
    	if ($ljq("#gm_settings_list_trackersin_sel :selected").length > 0) {
    	$ljq("#gm_tab_lists_status").hide();
    	var curlist = current_list();
		//alert(curlist);
			//var conf_del = show_confirm("Confirm: Remove the selected Trackers?");
    		//if (conf_del) {
    			$ljq("#gm_settings_list_trackersin_sel :selected").each(function() {
		    		//alert($ljq(this).val());
   					//loop through and find list index
   					//for (var i=0; i <= json_lists.lists[curlist].trackers.length-1; i++) {
   					//deleting - move backwards
   					for (var i = json_lists.lists[curlist].trackers.length-1; i >= 0; i--) {
   						//if ($ljq(this).val() == json_lists.lists[curlist].trackers[i].url) {
   						if ($ljq(this).text() == json_lists.lists[curlist].trackers[i].url) {
   							//alert(i+' '+json_lists.lists[curlist].trackers[i].url);
   							//Splice and remove
   							json_lists.lists[curlist].trackers.splice(i, 1);
   							//var zzi = JSON.stringify(json_lists);
			    			//alert(zzi);
				    		$ljq("#gm_settings_list_trackersin_sel option:selected").remove();
				    		//load_list($ljq("#gm_settings_lists_sel option:selected").val());
   							break;
	   					}
   					}
	    		});
	    		update_gmlists();
	    		chunkhashRefresh = true;
	    		//load_list($ljq("#gm_settings_lists_sel").val());
	    		load_list($ljq("#gm_settings_lists_sel option:selected").text());
	    		$ljq("#gm_tab_lists_status").removeClass("red").addClass("gteen").html("Trackers deleted from List!").show();
	    		//GMlog("[Lists] Delete tracker chunkhash");
	    		//chunkhash(); //reload list
	    	//}
    	} else {
    		//alert("You must select trackers to delete.");
    		$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You must select Trackers to delete.").show();
    	}
    	return false;
    });

    //================
    //[Lists] Add tracker
    //================
    $ljq("#gm_settings_list_trackers_add_btn").click(function() {
    	//alert("add site clicked!");
    	if ($ljq("#gm_settings_list_trackers_sel :selected").length > 0) {
    	$ljq("#gm_tab_lists_status").hide();
    	var curlist = current_list();
		//alert(curlist);
    		$ljq("#gm_settings_list_trackers_sel :selected").each(function() {
	    		//alert($ljq(this).val());
    			$ljq('#gm_settings_list_trackersin_sel').append('<option>'+$ljq(this).text()+'</option>');
	    		//json_lists.lists[curlist].trackers.push(JSON.parse('{"url":"'+$ljq(this).text()+'"}'));
	    		GMlog("lists add tracker - splice at: "+json_lists.lists[curlist].trackers.length);
				json_lists.lists[curlist].trackers.splice(json_lists.lists[curlist].trackers.length, 0, {"url":""+$ljq(this).text()+""});
    			//alert(json_lists.lists.length)
	    		//var zzi = JSON.stringify(json_lists);
    			//alert(zzi);
	    	});
	    	update_gmlists();
	    	chunkhashRefresh = true;
	    	//load_list($ljq("#gm_settings_lists_sel").val());
	    	load_list($ljq("#gm_settings_lists_sel option:selected").text());
	    	$ljq("#gm_tab_lists_status").removeClass("red").addClass("green").html("Trackers added to List!").show();
    	} else {
    		//alert("You must select trackers to add.");
    		$ljq("#gm_tab_lists_status").removeClass("green").addClass("red").html("You must select Trackers to add.").show();
    	}
    	return false;
    });
    
    //================
    //[Trackers] Delete tracker
    //================
    $ljq("#gm_settings_trackers_delete_btn").click(function() {
    	//alert("delete clicked!");
    	if ($ljq("#gm_settings_trackers_sel option:selected").length > 0) {
    		$ljq("#gm_tab_trackers_status").hide();
    		//alert($ljq("#gm_settings_trackers_sel option:selected").text());
    	var conf_del = show_confirm("Confirm: Remove the selected Trackers?");
    	//alert(conf_del);
    	if (conf_del) {
    		$ljq("#gm_settings_trackers_sel option:selected").each(function(i, selected) {
    			for (var i = json_trackers.trackers.length-1; i >= 0; i--) {
   					//if ($ljq(this).val() == json_lists.lists[curlist].trackers[i].url) {
   					if ($ljq(this).text().toLowerCase() == json_trackers.trackers[i].url.toLowerCase()) {
   						//Splice and remove
   						json_trackers.trackers.splice(i, 1);
   						break;
	   				}
   				}
				//str += $(this).text() + " ";
				//alert($ljq(this).text());
				$ljq(this).remove();
				//alert($ljq('#gm_settings_trackers_sel option').length);
			});
			/*
			var new_json_trackers = '{"trackers":[';
			$ljq("#gm_settings_trackers_sel option").each(function(x) {
				//str += $(this).text() + " ";
				//alert($ljq(this).text());
				if (x > 0) {
					new_json_trackers += ',';
				}
				new_json_trackers += '{"url":"'+$ljq(this).text()+'"}';
				//alert($ljq('#gm_settings_trackers_sel option').length);
				//alert(new_json_trackers);
			});
			new_json_trackers += ']}';
			GM_setValue('json_trackers', new_json_trackers);
			//alert(new_json_trackers);
			json_trackers = GM_getValue('json_trackers', '');
			json_trackers = JSON.parse(json_trackers);
			*/
			
   			update_gmtrackers();
   			$ljq("#gm_tab_trackers_status").removeClass("red").addClass("green").html("Trackers deleted!").show();
		} //if conf_del
    	} else {
			//alert('You need to select a tracker.');
			$ljq("#gm_tab_trackers_status").removeClass("green").addClass("red").html("You need to select a Tracker.").show();
    	}
    	return false;
    });
    
    //================
    //[Trackers] Add tracker
    //================
    $ljq("#gm_settings_trackers_add_btn").click(function() {
    	//alert("add clicked!");
    	if ($ljq("#gm_settings_trackers_add").val().length > 0) {
    		//alert($ljq("#gm_settings_trackers_add").val().length);
    		//alert('append <option>'+$ljq("#gm_settings_trackers_add").val()+'</option>');
    		var addtrackers = $ljq('#gm_settings_trackers_add').val();
    		addtrackers = addtrackers.split("\n");
    		//alert(addtrackers.length);
    		//alert('1');
    		var addtrackersunique = true;
    		for (var i=0; i<=addtrackers.length-1; i++) {
				if (!addtrackers[i].match(/(^(http|udp):\/\/.*)/ig)) {
					addtrackersunique = false;
					//alert(addtrackers[i]+" mismatch!");
    				$ljq("#gm_tab_trackers_status").removeClass("green").addClass("red").html("Invalid URL detected! Verify each starts with udp:// or http://").show();
					break;
				}
    		}
    		if (addtrackersunique) {
	    		for (var i=0; i<=addtrackers.length-1; i++) {
	    			//Verify each is a valid URL either HTTP or UDP
	    			//match(/(^(http|udp):\/\/.*:[0-9]{1,6}.*).*/ig)
	    			//if (addtrackers[i].match(/(^(http|udp):\/\/.*)/ig)) {
	    				//$ljq("#gm_tab_trackers_status").hide();
	    				//alert(addtrackers[i]+" matched!");
	    				//Verify tracker doesn't already exist!
	    				var unique = true;
	    				$ljq("#gm_settings_trackers_sel option").each(function() {
	    					GMlog("Tracker add check "+addtrackers[i].toLowerCase()+" == "+$ljq(this).text().toLowerCase());
	    					if (addtrackers[i].toLowerCase() == $ljq(this).text().toLowerCase()) {
	    						GMlog("unique false "+addtrackers[i].toLowerCase()+" == "+$ljq(this).text().toLowerCase());
	    						unique = false;
	    						//exit as soon as finding match
	    						//break;
	    						return false;
	    					}
	    					//alert($ljq(this).val());
	    				});
	    				   				
	    				if (unique) {
	    					//$ljq('#gm_settings_trackers_sel').append('<option>'+$ljq("#gm_settings_trackers_add").val()+'</option>');
			    			$ljq('#gm_settings_trackers_sel').append('<option>'+addtrackers[i]+'</option>');
			    			json_trackers.trackers.splice(json_trackers.trackers.length, 0, {"url":""+addtrackers[i]+""});
	    					//alert(addtrackers[i]);
	    				} else {
	    					//skip warning and skip tracker
	    					//$ljq("#gm_tab_trackers_status").html("Tracker already exists!").show();
	    				}
	    			//} else {
	    				//alert(addtrackers[i]+" mismatch!");
	    				//$ljq("#gm_tab_trackers_status").html("Invalid URL detected! Verify each starts with udp:// or http://").show();
	    				//break;
	    			//}
	    		}
	    		update_gmtrackers();
				//Clear input box
				$ljq("#gm_settings_trackers_add").val('');
				$ljq("#gm_tab_trackers_status").removeClass("red").addClass("green").html("Trackers added!").show();
	    	}
    		//REVIEW
    		//queue if unique the split into json
    		//then clear box
    		/*
    		if (unique) {
				var new_json_trackers = '{"trackers":[';
				$ljq("#gm_settings_trackers_sel option").each(function(x) {
					//str += $(this).text() + " ";
					//alert($ljq(this).text());
					if (x > 0) {
						new_json_trackers += ',';
					}
					new_json_trackers += '{"url":"'+$ljq(this).text()+'"}';
					//alert($ljq('#gm_settings_trackers_sel option').length);
				});
				new_json_trackers += ']}';
				GM_setValue('json_trackers', new_json_trackers);
				//alert(new_json_trackers);
				json_trackers = GM_getValue('json_trackers', '');
				json_trackers = JSON.parse(json_trackers);
				//for each item in listbox
				//  create json string
				//  setValue
				//Clear input box
				//$ljq("#gm_settings_trackers_add").val('');
			}
			*/
			//
			//above update to splice
    	} else {
    		$ljq("#gm_tab_trackers_status").removeClass("green").addClass("red").html("You need to enter a Tracker URL.").show();
    		//alert('You need to enter a tracker url.');
    		$ljq("#gm_settings_trackers_add").val('');
    	}
    	return false;
    });
    
    //================
    //LOAD_CONNECTION
    //================
    function load_connection(name) {
		GMlog("load_connection: "+name);
    	$ljq("#gm_tab_webui_status").hide();

    	for (var x=0; x <= json_webui.ui.length-1; x++) {
	    	//alert('name == '+json_webui.ui[x].name);
    		GMlog("load_connection connections loop : "+json_webui.ui[x].name);
    		if (name == json_webui.ui[x].name) {
    			//alert('found! name == '+json_webui.ui[x].name);
    			//load sites into listbox
    			//unselect everything
    			//causes selection box not to jump to selection! fixed??
    			$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
    			//$ljq("#gm_settings_webui_client_sel option").attr("selected","");
				if (json_webui.ui[x].enabled) {
					$ljq("#gm_settings_webui_enabled_cb").attr('checked', true);
				} else {
					$ljq("#gm_settings_webui_enabled_cb").attr('checked', false);
				}
				if (json_webui.ui[x].https) {
					$ljq("#gm_settings_webui_https_cb").attr('checked', true);
				} else {
					$ljq("#gm_settings_webui_https_cb").attr('checked', false);
				}
				$ljq("#gm_settings_webui_hostip_txt").val(json_webui.ui[x].hostip);
				$ljq("#gm_settings_webui_hostport_txt").val(json_webui.ui[x].hostport);
				$ljq("#gm_settings_webui_username_txt").val(json_webui.ui[x].hostuser);
				$ljq("#gm_settings_webui_password_txt").val(json_webui.ui[x].hostpass);
				$ljq("#gm_settings_webui_client_sel option[value='"+json_webui.ui[x].client+"']").attr("selected","selected");
				
				//$ljq("#gm_settings_webui_connections_sel option").attr("selected","");
				//$ljq("#gm_settings_webui_connections_sel option[value='"+json_webui.ui[x].name+"']").attr("selected","selected");
				
				//GMlog(json_webui.ui[x].client+"\n"+json_webui.ui[x].hostip+"\n"+json_webui.ui[x].hostport+"\n"+json_webui.ui[x].hostuser+"\n"+json_webui.ui[x].hostpass+"\n"+json_webui.ui[x].enabled+"\n"+json_webui.ui[x].https);
				//"name": "uTorrent"
				//"hostip": "x.x.x.x"
				//"hostport": "xxxx"
				//"hostuser": "xxxx"
				//"hostpass": "xxxx"
				//"client": "utorrent"
				//"enabled": true
				//"https": false
    			//alert(zztrackers.length);
    		GMlog("load_connection stop searching");
    		GMlog("#gm_settings_webui_connections_sel option:selected "+$ljq("#gm_settings_webui_connections_sel option:selected").text());
    		break;
    		}
    		//alert(json_lists.lists[x].name);
    	}
    }

    //================
    //[WebUI] Change Connection
    //================
    $ljq("#gm_settings_webui_connections_sel").change(function() {
    	//alert($ljq(this).val() + " : " + $ljq("#gm_settings_lists_sel option:selected").text());
		//load_list($ljq(this).val());
		GMlog("#gm_settings_webui_connections_sel .change "+$ljq("#gm_settings_webui_connections_sel option:selected").text());
		//reset error state removeClass("red")
		$ljq("#gm_settings_webui_hostip_txt").removeClass("red");
	    $ljq("#gm_settings_webui_hostport_txt").removeClass("red");
	    $ljq("label[for='gm_settings_webui_client_sel']").removeClass("red");

		if ($ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase() !== 'select a connection') {
			load_connection($ljq("#gm_settings_webui_connections_sel option:selected").text());
			$ljq("#gm_settings_webui_create_txt").val('');
			$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("white").addClass("blue").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
			$ljq("#gm_settings_webui_cancel_btn").removeClass("white").addClass("black");
		} else {
			//clear fields
			GMlog("default connection - skip");
			$ljq("#gm_settings_webui_enabled_cb, #gm_settings_webui_https_cb").attr('checked', false);
			$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
			$ljq("#gm_settings_webui_client_sel option[value='select a client']").attr("selected","selected");
			//$ljq("#gm_settings_webui_https_cb").attr('checked', false);
			$ljq("#gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_username_txt, #gm_settings_webui_password_txt").val('');
			$ljq("#gm_settings_webui_create_txt").val('');
			//$ljq("#gm_settings_webui_hostport_txt").val('');
			//$ljq("#gm_settings_webui_username_txt").val('');
			//$ljq("#gm_settings_webui_password_txt").val('');
			$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("blue").addClass("white").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
			$ljq("#gm_settings_webui_cancel_btn").removeClass("black").addClass("white");
		}
		return false;
    });
    
    //================
    //[WebUI] Create Connection KEY/NAME - BUTTON STATE
    //================
    $ljq("#gm_settings_webui_create_txt").keyup(function() {
    	if ($ljq.trim($ljq("#gm_settings_webui_create_txt").val()).length > 0 || ($ljq.trim($ljq("#gm_settings_webui_create_txt").val()).length > 0 && $ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase() !== 'select a connection')) {
    		$ljq("#gm_settings_webui_save_btn").removeClass("blue").removeClass("white").addClass("green").val($ljq("#gm_settings_webui_save_btn").attr("data-text-create"));
    		$ljq("#gm_settings_webui_cancel_btn").removeClass("white").addClass("black");
	    	//GMlog("gm_settings_webui_save_btn remove blue add green");
	    } else {
	    	if ($ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase() !== 'select a connection') {
	    		$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("white").addClass("blue").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
	    		$ljq("#gm_settings_webui_cancel_btn").removeClass("white").addClass("black");
	    	} else {
				$ljq("#gm_settings_webui_save_btn").removeClass("blue").removeClass("green").addClass("white").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
				$ljq("#gm_settings_webui_cancel_btn").removeClass("black").addClass("white");
    		}
	    	//GMlog("gm_settings_webui_save_btn remove green add blue");
	    }
    });
    
	//================
	//[WebUI] Save changes --> [WebUI] Create btn
	//================
    //$ljq("#gm_settings_webui_save_btn").click(function() {
    	//save changes
    	//return false;
    //});

    //================
    //[WebUI] Create Connection
    //================
    $ljq("#gm_settings_webui_save_btn").click(function() {
    //check name(trim|null|exists) ip:port(numeric)
	//$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
	//alert($ljq("#gm_settings_webui_enabled_cb").attr('checked'));
		var insertjson = true;
		var updatejson = true;
		var unique = true;
		var uienabled = ($ljq("#gm_settings_webui_enabled_cb").attr('checked') == 'checked' ? true : false);
		var uihttps = ($ljq("#gm_settings_webui_https_cb").attr('checked') == 'checked' ? true : false);
		$ljq("#gm_settings_webui_hostip_txt").removeClass("red");
	    $ljq("#gm_settings_webui_hostport_txt").removeClass("red");
	    $ljq("label[for='gm_settings_webui_client_sel']").removeClass("red");
	    if ($ljq.trim($ljq("#gm_settings_webui_create_txt").val()).length > 0) {
	    	GMlog("Creating new connection!");
	    	$ljq("#gm_tab_webui_status").hide();
	    	for (var i=0; i<=json_webui.ui.length-1; i++) {
	    		GMlog(json_webui.ui[i].name.toLowerCase()+" == "+$ljq.trim($ljq("#gm_settings_webui_create_txt").val()).toLowerCase());
	    		//Verify connection doesn't already exist!
	    		if (json_webui.ui[i].name.toLowerCase() == $ljq("#gm_settings_webui_create_txt").val().toLowerCase()) {
	    			GMlog("unique false "+json_webui.ui[i].name.toLowerCase()+" == "+$ljq("#gm_settings_webui_create_txt").val().toLowerCase());
	    			unique = false;
	    			//exit as soon as finding match
	    			break; // end loop
	    			//return false; //end entire function
	    		}
	    	}

	    	if (unique) {
	    		if ($ljq.trim($ljq("#gm_settings_webui_hostip_txt").val()).length <= 0) {
	    			$ljq("#gm_settings_webui_hostip_txt").addClass("red");
					insertjson = false;
	    		}
	    		if ($ljq.trim($ljq("#gm_settings_webui_hostport_txt").val()).length <= 0) {
	    			$ljq("#gm_settings_webui_hostport_txt").addClass("red");
					insertjson = false;
	    		}
	    		if ($ljq("#gm_settings_webui_client_sel option:selected").text().toLowerCase() == 'select a client') {
	    			//$ljq("#gm_settings_webui_client_sel").addClass("red");
	    			$ljq("label[for='gm_settings_webui_client_sel']").addClass("red");
					insertjson = false;
	    		}
	    		//if ($ljq.trim($ljq("#gm_settings_webui_username_txt").val()).length < 0) {
	    		//	$ljq("#gm_settings_webui_username_txt").addClass("red");
				//	insertjson = false;
	    		//}
	    		//if ($ljq.trim($ljq("#gm_settings_webui_password_txt").val()).length < 0) {
	    		//	$ljq("#gm_settings_webui_password_txt").addClass("red");
				//	insertjson = false;
	    		//}

	    		if (insertjson) {
	    			//.removeClass("red")
		    		//cb
		    		GMlog("uienabled: "+uienabled+"   uihttps: "+uihttps);
	    			$ljq('#gm_settings_webui_connections_sel').append('<option selected="selected">'+$ljq("#gm_settings_webui_create_txt").val()+'</option>');
		    		json_webui.ui.splice(json_webui.ui.length, 0, {"name": ""+$ljq("#gm_settings_webui_create_txt").val()+"","hostip": ""+$ljq("#gm_settings_webui_hostip_txt").val()+"","hostport": ""+$ljq("#gm_settings_webui_hostport_txt").val()+"","hostuser": ""+$ljq("#gm_settings_webui_username_txt").val()+"","hostpass": ""+$ljq("#gm_settings_webui_password_txt").val()+"","client": ""+$ljq("#gm_settings_webui_client_sel option:selected").text().toLowerCase()+"","enabled": uienabled,"https": uihttps});
	    			$ljq("#gm_tab_webui_status").removeClass("red").addClass("green").html("WebUI Connection created!").show();
	    			$ljq("#gm_settings_webui_create_txt").val('');
	    			update_gmwebui();
	    			chunkhashRefresh = true;
	    			GMlog("gm_settings_webui_save_btn insertjson done");
	    			$ljq("#gm_tab_webui_status").removeClass("red").addClass("green").html("Connection Created!").show();
	    			//clear errors
	    			$ljq("#gm_settings_webui_client_sel, #gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_client_sel").removeClass("red");
	    			//reset to save btn
	    			$ljq("#gm_settings_webui_save_btn").removeClass("green").addClass("blue").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));

	    		} else {
					$ljq("#gm_tab_webui_status").removeClass("green").addClass("red").html("Error Creating Connection!").show();
	    		}
    		} else {
    			$ljq("#gm_tab_webui_status").removeClass("green").addClass("red").html("WebUI Connection already exists!").show();
    		}
			
	    } else {
	    	//EDIT CURRENT SELECTION
	    	GMlog("Editing connection!");
	    	if ($ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase() !== 'select a connection') {
	    	for (var i=0; i<=json_webui.ui.length-1; i++) {
	    		GMlog("compare connection: "+json_webui.ui[i].name.toLowerCase()+" == "+$ljq.trim($ljq("#gm_settings_webui_connections_sel option:selected").val()).toLowerCase());
	    		//Verify connection doesn't already exist!
	    		if (json_webui.ui[i].name.toLowerCase() == $ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase()) {
		   			if ($ljq.trim($ljq("#gm_settings_webui_hostip_txt").val()).length <= 0) {
		    			$ljq("#gm_settings_webui_hostip_txt").addClass("red");
						updatejson = false;
	    			}
		    		if ($ljq.trim($ljq("#gm_settings_webui_hostport_txt").val()).length <= 0) {
		    			$ljq("#gm_settings_webui_hostport_txt").addClass("red");
						updatejson = false;
	    			}
		    		if ($ljq("#gm_settings_webui_client_sel option:selected").text().toLowerCase() == 'select a client') {
		    			//$ljq("#gm_settings_webui_client_sel").addClass("red");
		    			$ljq("label[for='gm_settings_webui_client_sel']").addClass("red");
						updatejson = false;
	    			}
	    			//if ($ljq("#gm_settings_webui_connections_sel option:selected").text().toLowerCase() == 'select a connection') {
		    			//$ljq("#gm_settings_webui_connections_sel").addClass("red");
		    			//$ljq("label[for='gm_settings_webui_connections_sel']").addClass("red");
						//updatejson = false;
	    			//}
	    			if (updatejson) {
		    			GMlog("edit connection: "+json_webui.ui[i].name.toLowerCase());
		    			//json_webui.ui[i].name = $ljq("#gm_settings_webui_create_txt").val();
		    			json_webui.ui[i].hostip = $ljq("#gm_settings_webui_hostip_txt").val();
		    			json_webui.ui[i].hostport = $ljq("#gm_settings_webui_hostport_txt").val();
		    			json_webui.ui[i].hostuser = $ljq("#gm_settings_webui_username_txt").val();
		    			json_webui.ui[i].hostpass = $ljq("#gm_settings_webui_password_txt").val();
		    			json_webui.ui[i].client = $ljq("#gm_settings_webui_client_sel option:selected").text().toLowerCase();
		    			json_webui.ui[i].enabled = uienabled;
		    			json_webui.ui[i].https = uihttps;
		    			update_gmwebui();
		    			chunkhashRefresh = true;
		    			//alert(JSON.stringify(json_webui));
		    			GMlog("gm_settings_webui_save_btn update done");
		    			$ljq("#gm_tab_webui_status").removeClass("red").addClass("green").html("Connection Updated!").show();
		    			//clear errors
		    			$ljq("#gm_settings_webui_client_sel, #gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_client_sel").removeClass("red");
		    			//reset to save btn
	    				$ljq("#gm_settings_webui_save_btn").removeClass("green").addClass("blue").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
	    			}
	    			//exit as soon as finding match
	    			break; // end loop
	    			//return null
	    			//return false; //end entire function
	    		}
	    		//if (i >= json_webui.ui.length-1) {
	    		//	error - no connection in json!
	    		//}
	    	}
	    	} //if != select a connection
	    	GMlog("gm_settings_webui_save_btn done");
	    	//$ljq("#gm_tab_webui_status").html("You need to enter a WebUI Connection name.").show();
	    	//$ljq("#gm_settings_webui_create_txt").val('');
	    }
    return false;
    });
    
	//WebUI
    //  gm_settings_webui_create_txt		//gm_settings_webui_create_btn
    //										gm_settings_webui_save_btn
	//  									gm_settings_webui_cancel_btn
    //  									gm_settings_webui_delete_btn
    //  gm_settings_webui_connections_sel
    //  gm_settings_webui_client_sel
    //  gm_settings_webui_enabled_cb
    //  gm_settings_webui_https_cb
    //  gm_settings_webui_hostip_txt
    //  gm_settings_webui_username_txt
    //  gm_settings_webui_hostport_txt
    //  gm_settings_webui_password_txt
    //  									
    //  //gm_settings_webui_rename			//gm_settings_webui_rename_btn
	//  									


    //================
	//[WebUI] Delete Connection
	//================
    $ljq("#gm_settings_webui_delete_btn").click(function() {
    	
    	if ($ljq("#gm_settings_webui_connections_sel option:selected").val().toLowerCase() == 'select a connection') {
    		//error out - cannot delete default!
    		$ljq("#gm_tab_webui_status").removeClass("green").addClass("red").html("You must select a Connection.").show();
    	} else {
    	//alert("delete clicked!");
    	if ($ljq("#gm_settings_webui_connections_sel option:selected").length > 0) {
    		$ljq("#gm_tab_webui_status").hide();
    		//alert($ljq("#gm_settings_trackers option:selected").text());
	    	var conf_del = show_confirm("Confirm: Remove the selected Connection?");
	    	//alert(conf_del);
	    	if (conf_del) {
	    		$ljq("#gm_settings_webui_connections_sel option:selected").each(function(i, selected) {
	    			for (var i = json_webui.ui.length-1; i >= 0; i--) {
	   					//if ($ljq(this).val() == json_lists.lists[curlist].trackers[i].url) {
	   					if ($ljq(this).text().toLowerCase() == json_webui.ui[i].name.toLowerCase()) {
	   						//Splice and remove
	   						json_webui.ui.splice(i, 1);
	   						break;
		   				}
	   				}
					//str += $(this).text() + " ";
					//alert($ljq(this).text());
					$ljq(this).remove();
					//alert($ljq('#gm_settings_webui_connections_sel option').length);
				});
				
	   			update_gmwebui();
	   			GMlog("webui connection deleted");
				$ljq("#gm_settings_webui_enabled_cb, #gm_settings_webui_https_cb").attr('checked', false);
				$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
				$ljq("#gm_settings_webui_client_sel option[value='select a client']").attr("selected","selected");
				$ljq("#gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_username_txt, #gm_settings_webui_password_txt, #gm_settings_webui_create_txt").val('');
				$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("blue").addClass("white").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
	    		chunkhashRefresh = true;
			} //if conf_del
    	//} else {
			//alert('You need to select a tracker.');
			//$ljq("#gm_tab_webui_status").html("You need to select a Connection.").show();
    	}
    	}
    	return false;
    });
    
    //================
	//[WebUI] Rename Connection
	//================
	//$ljq("#gm_settings_webui_rename_btn").click(function() {
    	//display inline edit
    	//return false;
    //});

    //================
	//[WebUI] Cancel changes
	//================
    $ljq("#gm_settings_webui_cancel_btn").click(function() {
    	//alert($ljq("#gm_settings_webui_connections_sel option:selected").text().toLowerCase());
    	if ($ljq("#gm_settings_webui_connections_sel option:selected").text().toLowerCase() == 'select a connection') {
    		//alert("select");
    		//clear fields
			GMlog("default connection - skip");
			$ljq("#gm_settings_webui_enabled_cb, #gm_settings_webui_https_cb").attr('checked', false);
			$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
			$ljq("#gm_settings_webui_client_sel option[value='select a client']").attr("selected","selected");
			$ljq("#gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_username_txt, #gm_settings_webui_password_txt, #gm_settings_webui_create_txt").val('');
			$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("blue").addClass("white").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
			$ljq("#gm_settings_webui_cancel_btn").removeClass("black").addClass("white");
    	} else {
    		//alert("load");
    		load_connection($ljq("#gm_settings_webui_connections_sel option:selected").text());
    		$ljq("#gm_settings_webui_save_btn").removeClass("white").removeClass("green").addClass("blue").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
    		$ljq("#gm_settings_webui_create_txt").val('');
    	}
    	return false;
    });

	//================
	//[WebUI] Cancel changes - doubleclick reset
	//================
	$ljq("#gm_settings_webui_cancel_btn").dblclick(function() {
			GMlog("default connection - skip");
			$ljq("#gm_settings_webui_enabled_cb, #gm_settings_webui_https_cb").attr('checked', false);
			$ljq("#gm_settings_webui_client_sel option").removeAttr('selected');
			$ljq("#gm_settings_webui_client_sel option[value='select a client']").attr("selected","selected");
			$ljq("#gm_settings_webui_connections_sel option").removeAttr('selected');
			$ljq("#gm_settings_webui_connections_sel option[value='select a connection']").attr("selected","selected");
			$ljq("#gm_settings_webui_hostip_txt, #gm_settings_webui_hostport_txt, #gm_settings_webui_username_txt, #gm_settings_webui_password_txt, #gm_settings_webui_create_txt").val('');
			$ljq("#gm_settings_webui_save_btn").removeClass("green").removeClass("blue").addClass("white").val($ljq("#gm_settings_webui_save_btn").attr("data-text-save"));
			$ljq("#gm_settings_webui_cancel_btn").removeClass("black").addClass("white");
    	return false;
    });

    //================
    //Default Action
    //================
	$ljq("#GB_window .tab_content").hide(); //Hide all content
	$ljq("#GB_window ul.tabs li").removeClass("active").show(); //Deactivate all tabs
	
	GMlog("load tab: "+tab);
	if (tab == "" || tab == null || tab == undefined) {
		$ljq("#GB_window ul.tabs li:first").addClass("active").show(); //Activate first tab
		$ljq("#GB_window .tab_content:first").show(); //Show first tab content
	} else {
		$ljq("#GB_window ul.tabs li a[href='#gm_tab_"+tab+"']").parent().addClass("active").show(); //Activate first tab
		$ljq("#GB_window #gm_tab_"+tab+".tab_content").show(); //Show first tab content
		if (tab == "lists") {
			load_list($ljq("#gm_settings_lists_sel option:selected").text());
		}
	}
	
	//On Click Event
	$ljq("#GB_window ul.tabs li").on('click', function(event) {
		event.preventDefault();
		//alert("click");
		$ljq("#GB_window ul.tabs li").removeClass("active"); //Remove any "active" class
		$ljq(this).addClass("active"); //Add "active" class to selected tab
		$ljq("#GB_window .tab_content").hide(); //Hide all tab content
		var activeTab = $ljq(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$ljq(activeTab).show(); //Fade/Hide in the active content
		//alert($ljq("#GB_window").height()+"\n"+$ljq(window).height());
		//Switched tabs - check height
		tab_content_height();
		//alert(activeTab);
		
		//Each time 'Lists' is clicked, reload the Default list
		$ljq("#gm_tab_lists_status, #gm_tab_trackers_status, #gm_tab_webui_status, #gm_tab_help_status").hide(); //Clear all errors
		if ("Lists" == $ljq(this).text()) {
			//load_list('Default');
			//load_list($ljq("#gm_settings_lists_sel option:selected").val());
			load_list($ljq("#gm_settings_lists_sel option:selected").text());
			//alert($ljq("#gm_settings_lists_sel option:selected").val());
			//alert($ljq("#gm_settings_lists_sel option:selected").text());
		}
		return false;
	});
	
	/*
	$ljq("#GB_window ul.tabs li").on('click', function(event) {
		event.preventDefault();
		//Each time 'Lists' is clicked, reload the Default list
		//alert($ljq(this).text());
		//Clear all errors
		$ljq("#gm_tab_lists_status, #gm_tab_trackers_status, #gm_tab_webui_status, #gm_tab_help_status").hide();
		if ("Lists" == $ljq(this).text()) {
			//load_list('Default');
			//load_list($ljq("#gm_settings_lists_sel option:selected").val());
			load_list($ljq("#gm_settings_lists_sel option:selected").text());
			//alert($ljq("#gm_settings_lists_sel option:selected").val());
			//alert($ljq("#gm_settings_lists_sel option:selected").text());
		}
		return false;
	});
	*/
	
	//Initial display of content - check height
	tab_content_height();
}

function showUpgradeInstructions() {
	GB_DONE = false;
	
	var t = '<span>'+scriptName+' - Upgrade process...</span>';
	var text = ''
		+'<div class="tab_container">'
			+'<div class="tab_content" style="border-top: 1px solid #999999;">'
			+'	<h3><a href="http://userscripts.org/topics/119477?page=1" target="_blank">Upgrade instructions discussion</a></h3>'
			+'	<span style="font-size:14px;">'
			+'	Step 1a) Click the Firefox ribbon menu, then click Add-ons.<br/>'
			+'	<img src="http://www.magnettracker.com/images/upgradeinstructions/v050upgradefirefox1a.jpg"><br/><br/>'
			+'	Step 1b) Or click the Tools menu, then click on Add-ons.'
			+'	<img src="http://www.magnettracker.com/images/upgradeinstructions/v050upgradefirefox1b.jpg"><br/><br/>'
			+'	Step 2) Click User Scripts.<br/>'
			+'	<img src="http://www.magnettracker.com/images/upgradeinstructions/v050upgradefirefox2.jpg"><br/><br/>'
			+'	Step 3) Locate the old MagnetTracker script (v0.4.3 or earlier) and remove it.<br/>'
			+'	Step 4) Refresh the page and the new version will work! =D<br/><br/>'
			+'	This was caused by a namespace change in v0.5.0, sorry!'
			+'	</span>'
			+'</div>'
		+'</div>'
		+'';
    GB_show(t,text,0,550);
    
    //=====================
    
    //Default Action
	//$ljq("#GB_window .tab_content").hide(); //Hide all content
	//$ljq("#GB_window ul.tabs li").removeClass("active").show(); //Deactivate all tabs
	//$ljq("#GB_window ul.tabs li:first").addClass("active").show(); //Activate first tab
	//$ljq("#GB_window .tab_content:first").show(); //Show first tab content
	//$ljq("#GB_window ul.tabs li a").parent().addClass("active").show(); //Activate first tab
	//$ljq("#GB_window .tab_content").show(); //Show first tab content
	
	//Initial display of content - check height
	tab_content_height();
}

function tab_content_height() {
	//reset height and scroll before checking dimensions
	$ljq("#GB_window .tab_content").css({'height':'', 'overflow-y':''});
	//alert(($ljq("#GB_window").height() + 40)+"\n"+$ljq(window).height());
	//add 20px to offset top:20
	if (($ljq("#GB_window").height() + 25) > $ljq(window).height()) {
		var tab_height = $ljq(window).height() - 150;
		//alert(tab_height);
		$ljq("#GB_window .tab_content").css({'height':''+tab_height+'px', 'overflow-y':'scroll'});
	//} else {
		//$ljq("#GB_window .tab_content").css({'height':'', 'overflow-y':''});
	}
}

/********************
* SEND TO WEBUI
*********************/

function webui_send(client, magnet) {
	var i = 0; //webui index
	for (var x=0; x <= json_webui.ui.length-1; x++) {
		if (json_webui.ui[x].name == client) {
			//alert(json_webui.ui[x].name+"\n"+json_webui.ui[x].hostip+"\n"+json_webui.ui[x].hostport+"\n"+json_webui.ui[x].hostuser+"\n"+json_webui.ui[x].hostpass+"\n"+json_webui.ui[x].client+"\n"+json_webui.ui[x].active);
			i = x;
			client = json_webui.ui[x].client;
		break;
		}
	}

	//alert(i+" : "+client);
	switch(client) {
		case "utorrent":
			GMlog("send to utorrent!");
			//update line item status (loading)
			webui_token(client, magnet, i);
		break;
		
		default:
			GMlog("Error - Invalid webui client = "+client);
			$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
		break;
	}
}

function webui_token(client, magnet, i) {
	//utorrent get token  http://[USER]:[PASS]@[IP]:[PORT]/gui/token.html
	GMlog("webui_token_start");
	GM_xmlhttpRequest({
    method: 'GET',
    //method: 'POST',
    //url: 'http://'+json_webui.ui[i].hostip+':'+json_webui.ui[i].hostport+'/gui/token.html',
    url: 'http://'+json_webui.ui[i].hostuser+':'+json_webui.ui[i].hostpass+'@'+json_webui.ui[i].hostip+':'+json_webui.ui[i].hostport+'/gui/token.html',
    //data: 'username=testuser&password=testpass',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    onload: function(res) {
    GMlog("updateStatus:"+res.status);
	//alert("status : "+res.status);
		if (res.status == '200') {
			try {
				var text = res.responseText;
				//alert(text);
				GMlog(text);
				pattern = /([a-z0-9_-]{20,})/ig;
				matches = text.match(pattern);
				//alert(matches[0].replace(pattern, "$1"));
				var token = matches[0].replace(pattern, "$1");
				webui_add(client, magnet, token, i);
			} catch(e) {
				GMlog("webui_token_error");
			} //try
		} else { //status
			$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
		}
    }, //onload
	onreadystatechange: function(res) {
		//GMlog('<<< onreadystatechange!\n');
		//GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		//if (res.status == null) {
		//	$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
		//}
	},
	onprogress: function(res) { 
		//GMlog('<<< onprogress!\n');
	},
	onerror: function(res) {
		//GMlog('<<< onerror!\n');
		//GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
	},
	onabort: function(res) {
		//GMlog('<<< onabort!\n');
		//GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
	}
	});
	GMlog("webui_token_end");
}

function webui_add(client, magnet, token, i) {
	GMlog("webui_start_end");
	//var sendurl = 
	//GMlog(sendurl);
	GM_xmlhttpRequest({
    method: 'GET',
    //url: sendurl,
    url: 'http://'+json_webui.ui[i].hostip+':'+json_webui.ui[i].hostport+'/gui/?token='+token+'&action=add-url&s='+encodeURIComponent(magnet),
    //encodeURIComponent
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
	//onload: function(response) { GMlog('<<< onload!\n'); },
	onload: function(res) {
		GMlog("updateStatus:"+res.status);
		//GMlog(i);
		if (res.status == '200') {
		$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("success");
			try {
				var text = res.responseText;
				//alert(text);
				GMlog(text);
			} catch(e) {
				GMlog("webui_token_error");
			} //try
		} else { //status
			$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
		}
	}, //onload
	onreadystatechange: function(res) {
		GMlog('<<< onreadystatechange!\n');
		GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		//if (res.status == null) {
		//	$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
		//}
	},
	onprogress: function(res) { GMlog('<<< onprogress!\n'); },
	onerror: function(res) {
		GMlog('<<< onerror!\n');
		GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
	},
	onabort: function(res) {
		GMlog('<<< onabort!\n');
		GMlog('readyState:'+res.readyState+' - status:'+res.status+' - responseText'+res.responseText);
		$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+i+"]").removeClass("sending").addClass("error");
	}
	});
   	GMlog("webui_add_end");
}

var curwindow = window.location.toString();
//alert(curwindow);
pattern = /(https?:\/\/(.*)\/.*).*/ig;
matches = curwindow.match(pattern);
//alert(matches);
//alert(matches[0].replace(pattern, "$2"));
siteuri = matches[0].replace(pattern, "$2");
siteuri = siteuri.split("/");
//alert(siteuri[0]);
siteuri = siteuri[0];
siteuri = siteuri.replace('www.', '');
//alert(siteuri);
pattern = "";
matches = "";

var duplicatecheck = false;
if ($ljq("#gmmnu").length > 0) {
	duplicatecheck = true;
	$ljq("#gmmnu").remove();
}

//Show menu as soon as possible
$ljq(document.body).append("<div id='gmmnu'></div>");
$ljq("#gmmnu").html(""
		+"\n<div id='gmmnu_title' data-title='Magnet Tracker'>Magnet Tracker</div>\n"
		+"<div id='gmmnu_menu'>\n"
		//+"<div class='header'>Menu</div>\n"
		//+"<div>1st | 2nd</div>\n"
			+"<div class='menubar'>\n"
				+"<div id='config_icon'><a href='#configuration' class='config' data-title='Configuration'></a></div>\n"
				+"<div id='update_icon'>"
					+"<a href='#update' class='update_grey' data-title='No Updates'></a>"
				+"</div>\n"
				//+"<div id='home_icon'><a href='http://userscripts.org/scripts/show/"+scriptId+"' class='home' data-title='Script Homepage' target='_blank'></a></div>\n"
				+"<div id='home_icon'><a href='http://www.magnettracker.com/' class='home' data-title='Script Homepage' target='_blank'></a></div>\n"
				+"<div id='twitter_icon'><a href='#twitter' class='twitter' data-title='Follow Us' target='_blank'></a></div>\n"
				+"<div id='donate_icon'><a href='#donations' class='donate' data-title='Donate! =D'></a></div>\n"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_links_wrap'>\n"
			+"<div id='gmmnu_links'>\n"
				+"<div class='header'>Magnet Link</div>\n"
				+"<div id='gmmnu_linksfiles'>Searching...</div>\n"
			+"</div>\n"
			+"<div id='gmmnu_links_webui'>\n"
				+"<div class='header'>WebUI Connections</div>\n"
				+"<div id='gmmnu_linksfiles_webui'>"
				+"</div>\n"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_err' data-active='false'>\n"
			+"<div class='header'>Error Alert</div>\n"
			+"<div id='gmmnu_errmsg'>"
			//+"There was an error and the files couldn't be loaded.<br>"
			//+"Please copy the URL ("+siteuri+") and report the problem + URL to <strong><a href='http://userscripts.org/scripts/discuss/"+scriptId+"'>Discussions</a></strong>"
			+"</div>\n"
		+"</div>\n"
		+"<div id='gmmnu_donations'>\n"
			+"<div class='header'>Donation Methods</div>\n"
			+"Please consider donating, its greatly appreciated!\n"
			+"<center><a href='"+donationLink_flattr+"' class='icon_donate_flattr' target='_blank'></a></center>\n"
			+"<center><a href='"+donationLink_paypal+"' class='icon_donate_paypal' target='_blank'></a></center>\n"
		+"</div>\n"
		+"<div id='gmmnu_twitter'>\n"
			+"<div class='header'>Follow Us</div>\n"
			+"Follow, Share or Contact!\n"
			+"<div><a href='https://twitter.com/MagnetTracker' target='_blank'>@MagnetTracker</a></div>\n"
			+"<div><a href='https://twitter.com/Daem0nX' target='_blank'>@Daem0nX (Developer)</a></div>\n"
		+"</div>\n"
		+"");
GMlog("Append menu : Success");
		
function showError(type) {
	//var errhdrDefault = "Error Alert";
	//var errmsgDefault = "There was an error and the files couldn't be loaded. Please copy the URL ("+siteuri+") and report the problem + URL to <strong><a href='http://userscripts.org/scripts/discuss/"+scriptId+"'>Discussions</a></strong>";
	GMlog('showError : '+type);
	switch(type) {	
		case 'notrackers':
			//$ljq("#gmmnu_menu .menubar .config").css({backgroundColor: '#F00'});
			//$ljq("#gmmnu_menu .menubar .config").css({border-top-style:'solid', border-top-width:'1px', border-top-color:'#ff0000'});
			$ljq("#gmmnu_err .header").html("No trackers defined!");
			$ljq("#gmmnu_err #gmmnu_errmsg").html("To add trackers:<br>1) Click the Configuration icon.<br>2) Click the Lists tab and add Trackers to the Default List.<br>3) Close the Configuration overlay and the menu will refresh.");
		break;
		
		case 'nohash':
			$ljq("#gmmnu_err .header").html("No info hash detected!");
			$ljq("#gmmnu_err #gmmnu_errmsg").html("No bittorrent info hash was detected. Please copy the URL ("+siteuri+") and report the problem + URL to <strong><a href='http://userscripts.org/scripts/discuss/"+scriptId+"'>Discussions</a></strong>");
		break;

		case 'duplicatescriptinstructions':
		$ljq("#gmmnu_err #gmmnu_errmsg").html("You have 2 versions of Magnet Tracker installed! <span id='gm_upgrade_instructions'><a href='#gm_upgrade_instructions' style='font-size:12px;text-decoration:underline;'>Click here for easy upgrade instructions.</a></span>");
		break;
		
		default:
			$ljq("#gmmnu_err .header").html("Error Alert");
			$ljq("#gmmnu_err #gmmnu_errmsg").html("There was an error and the files couldn't be loaded. Please copy the URL ("+siteuri+") and report the problem + URL to <strong><a href='http://userscripts.org/scripts/discuss/"+scriptId+"'>Discussions</a></strong>");
		break;
	}//switch
	
	//Hide links
	$ljq("#gmmnu_links, #gmmnu_links_webui").hide();
	//Show Err
	$ljq("#gmmnu_err").show();
	$ljq("#gmmnu_err").attr("data-active", "true");
}

function hideError() {
	//Show links
	$ljq("#gmmnu_links, #gmmnu_links_webui").show();
	//Hide Err
	$ljq("#gmmnu_err").hide();
	$ljq("#gmmnu_err").attr("data-active", "false");
}

//Split into individual elements then rebuild magnet uri
function chunkhash() {
GMlog("chunkhash");
//alert(hash);
//Remove all trackers &tr
//Remove size $xl
//Check for display name $dn
//Check for magnet uri
	if (title.length > 0) {
		title = $ljq.trim(title);
	}
	trackers = '';
	var uri = '';
	var zzhash = '';
	var dn = '';
	var pattern = '';
	var matches = '';
	var chunkerr = false;
	//alert(title);
	//Look for hash
	if (hash !== '' && hash !== undefined && hash !== 0) {
		try {
			try {
				pattern = /([a-z0-9]{40})/ig;
				matches = hash.match(pattern);
				zzhash = matches[0].replace(pattern, "$1");
				GMlog("40char hash");
			} catch(ex) {
				pattern = /([a-z0-9]{32,40})/ig;
				matches = hash.match(pattern);
				zzhash = matches[0].replace(pattern, "$1");
				GMlog("32-40char hash");
			}
			//alert(zzhash);
		} catch(ex) {
			//alert('catch');
			//alert("no hash!");
			GMlog("chunkhash no hash!");
			showError('nohash');
			chunkerr = true;
		}
	} else {
		GMlog("chunkhash no hash val!");
		showError('nohash');
		chunkerr = true;
	}
	pattern = '';
	matches = '';
	//check for hash after parse
	//if (zzhash == undefined || zzhash.length == 0 || zzhash == "") {
		//$ljq("#gmmnu_err #gmmnu_errmsg").html("BTIH returned undefined");
		//alert("error");
	//	showError();
	//	chunkerr = true;
	//}
	//alert(matches.length+'\n0: '+matches[0].length+' '+matches[0]+'\n1: '+matches[1]+'\n2: '+matches[2]+'\n3: '+matches[3]);
	//Look for data name &dn=*
	try {
		//Refactor pattern for better & match
		pattern = /(&dn=([\w+:\/\.-][^&]*))/ig;
		matches = zzhash.match(pattern);
	} catch(ex) {}
	try {
		dn = matches[0].replace(pattern, "$1");
		//alert("dn: "+dn);
	} catch(ex) {
		//alert("no dn!");
	}
	try {
		if (title == '') {
			title = matches[0].replace(pattern, "$2");
			//alert("title: "+title);
		}
	} catch(ex) {
		//alert("no title!");
		GMlog("chunkhash no title!");
	}
	title = title.replace('.torrent', '');
	//alert(title);
	pattern = '';
	matches = '';

	//Find all trackers '&tr=*' and remove
	//zzhash = zzhash.replace(/&tr=[\w+:\/\.-][^&]*/ig, "");
	//alert(zzhash);
	//zzhash = zzhash.replace(/&tr=[\w+:\/\.-][^&]*/ig, "");
	//pattern = '';
	//matches = '';
	//for(var x=json_trackers.length-1; x >= 0; x--) {
	//for(var x=json_trackers.trackers.length-1; x >= 0; x--) {
		//trackers += '&tr='+json_trackers.trackers[x].url;
	//}
	
	//Loop through lists
	//If list_name = Default or site_name = siteuri
	//check for trackers and add
	for (var i=json_lists.lists.length-1; i>=0; i--) {
		//GMlog(json_lists.lists[i].sites);
		for (var j=json_lists.lists[i].sites.length-1; j>=0; j--) {
			GMlog("Loop sitename = "+json_lists.lists[i].sites[j].site_name);
			if ("Default" == json_lists.lists[i].list_name || siteuri == json_lists.lists[i].sites[j].site_name) {
				GMlog("List = "+json_lists.lists[i].list_name+" / siteuri = "+json_lists.lists[i].sites[j].site_name);
				//alert("List: ("+i+") "+json_lists.lists[i].name+"\nName: ("+j+") "+json_lists.lists[i].sites[j].name);
				for (var k=json_lists.lists[i].trackers.length-1; k>=0; k--) {
					//alert(json_lists.lists[i].trackers[k].url);
					//GMlog('trackers += &tr='+json_lists.lists[i].trackers[k].url);
					trackers += '&tr='+json_lists.lists[i].trackers[k].url;
				}
			}
		}
	}
	
	if (dn == '') {
		if (title !== '') {
			//escape(title)
			//title = encodeURI(title);
			dn = "&dn="+encodeURIComponent(title);
			GMlog("dn encoded: "+dn);
		}
	}
	if (title == '') {
		title = "Magnet";
	}
	
	if (trackers !== '' && zzhash !== undefined) {
		//Display links
		//GMlog(zzhash+'\n'+trackers);
		//zzhash += trackers;
		//uri = 'magnet:?xt=urn:btih:'+zzhash+encodeURI(dn)+trackers;
		uri = 'magnet:?xt=urn:btih:'+zzhash+dn+trackers;
		GMlog("uri: "+uri);
		//uri = 'magnet:?xt='+trackers;
		//alert(uri);
		
		//$ljq("#gmmnu_linksfiles").html(""); //clear magnet link
		$ljq("#gmmnu_linksfiles").html(''
			//+'<div class="icon_magnet">'
			+'<a class="icon_magnet" href="'+uri+'" title="'+decodeURIComponent(title)+'">'
			+''+decodeURIComponent(title)+'</a>'
			//+'</div>'
		+'');
		
		/*
		$ljq("#gmmnu_linksfiles_webui").append(""
			+"<a class='icon_utorrent' data-webui='utorrent'  title='' href='"+uri+"'>Send to uTorrent</a>\n"
			+"<a class='icon_deluge' data-webui='deluge' title='' href='"+uri+"'>Send to Deluge</a>\n"
			+"<a class='icon_transmission' data-webui='transmission' title='' href='"+uri+"'>Send to Transmission</a>\n"
			+"<a class='icon_vuze' data-webui='vuze' title='' href='"+uri+"'>Send to Vuze</a>"
		+"");
		*/
		
		//GMlog("#gmmnu_err data-active : "+$ljq("#gmmnu_err").attr("data-active"));
		if ($ljq('#gmmnu_err').attr('data-active') == 'true' && !chunkerr) {
			//Hide error and reshow menu
			GMlog("#gmmnu_err attr(data-active) == true && chunkerr == false");
			GMlog("chunkhash hideError()");
			hideError();
		}

		//If showError is active skip webui loop
		if ($ljq('#gmmnu_err').attr('data-active') == 'false') {
			var show_webui_section = false;
			$ljq('#gmmnu_linksfiles_webui').html(''); //clear webui links
			for (var x=0; x <= json_webui.ui.length-1; x++) {
				GMlog("name: "+json_webui.ui[x].name+"\n enabled: "+json_webui.ui[x].enabled);
				//if (json_webui.ui[x].enabled == "true") {
				if (json_webui.ui[x].enabled) {
					show_webui_section = true;
					//alert(json_webui.ui[x].name+"\n"+json_webui.ui[x].hostip+"\n"+json_webui.ui[x].hostport+"\n"+json_webui.ui[x].hostuser+"\n"+json_webui.ui[x].hostpass+"\n"+json_webui.ui[x].client+"\n"+json_webui.ui[x].enabled);
					//$ljq("#gmmnu_linksfiles_webui").append("<a class='icon_"+json_webui.ui[x].client+"' data-webui='"+json_webui.ui[x].client+"'  title='' href='"+uri+"'>"+json_webui.ui[x].name+"<span class='status'></span></a>\n");
					//$ljq("#gmmnu_linksfiles_webui").append("<a class='icon_"+json_webui.ui[x].client+"' data-webui='"+json_webui.ui[x].client+"'  title='' href='"+uri+"'>"+json_webui.ui[x].name+"<span class='status'>&nbsp;</span></a>\n");
					//$ljq("#gmmnu_linksfiles_webui").append("<div><a class='icon_"+json_webui.ui[x].client+"' data-webui='"+json_webui.ui[x].client+"'  title='' href='"+uri+"'>"+json_webui.ui[x].name+"</a><span class='status'>&nbsp;</span></div>\n");
					//$ljq("#gmmnu_linksfiles_webui").append("<div class='webui'><div class='icon_"+json_webui.ui[x].client+"'><a data-webui='"+json_webui.ui[x].client+"' title='' href='"+uri+"'>"+json_webui.ui[x].name+"</a></div></div>\n");
					
					//Use single quote to work around encodeURIComponent not encoding ' and exiting the string
					//future - if needed add .replace("'", "\'") or .replace("'", "&apos;");
					$ljq('#gmmnu_linksfiles_webui').append('<div class="webui"><div><a class="icon_'+json_webui.ui[x].client+'" data-webuiid="'+x+'" data-webui="'+json_webui.ui[x].client+'" title="" href="'+uri+'">'+json_webui.ui[x].name+'</a></div></div>\n');
					//test error
					//$ljq("#gmmnu_linksfiles_webui").append("<div class='webui'><div><a class='icon_"+json_webui.ui[x].client+"' data-webuiid='"+x+"' data-webui='"+json_webui.ui[x].client+"' title='' href='"+uri.replace("magnet", "")+"'>"+json_webui.ui[x].name+"</a></div></div>\n");
					//$ljq("#gmmnu_linksfiles_webui").append("<a class='icon_"+json_webui.ui[x].client+"' data-webui='"+json_webui.ui[x].client+"'  title='' href='"+uri+"'>"+json_webui.ui[x].name+"<span class='status'>test</span></a>\n");
				}
			}
			//if (json_webui.ui.length == 0) {
			if (!show_webui_section) {
				$ljq('#gmmnu_linksfiles_webui').append('<div class="setupwebui"><a class="icon_webui" href="#setupwebui">Setup Connections</a></div>\n');
				show_webui_section = true;
			}
			//if (show_webui_section) {
				$ljq('#gmmnu_links_webui').show();
			//}
		}
		
	} else {
		if (trackers == '') {
			//No trackers
			GMlog('chunkhash no trackers');
			showError('notrackers');
		} else {
			GMlog('chunkhash unknown error');
			showError();
		}
		chunkerr = true;
	}
	
//return zzhash;
//return uri;
//return '';
return;
}

//$ljq(document).ready(function(){
	//alert(document.title);
	//alert("ljq");
	
	//Append the greasebox to the body of the site
	$ljq(document.body).append("<div id='GB_initialize'></div>");
	GMlog("Append GB_initialize : Success");
	//showError();
	//showConfiguration();
	//alert(json_lists);
	
	//$ljq("#GB_body").html("test");

	/*
	switch(siteuri) {
		case 'legaltorrents.com':
		case 'clearbits.net':
			//alert("legaltorrents or clearbits");
		break;
		
		case 'mininova.org':
		break;
	
		default:
		break;
	}
	//if (siteuri == 'legaltorrents.com' | siteuri == 'clearbits.net') {
	*/

	var urlmatch = '';
	GMlog("switch(siteuri)");
	switch(siteuri) {
		case 'magnettracker.com':
			title = "Big Buck Bunny 480p";
			hash = $ljq("#validhash").text();
			//hash = $ljq("#invalidhash").text();
			GMlog("MagnetTracker"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
	
		case 'legaltorrents.com':
		case 'clearbits.net':
			//encodeURIComponent()
			title = $ljq("#first h2").html();
			hash = $ljq("th:contains('Hash:')").parent().html();
			try {
			pattern = /(.*td>(.*)<\/td.*).*/ig;
			matches = hash.match(pattern);
			//alert(matches[0].replace(pattern, "$2"));
			hash = matches[0].replace(pattern, "$2");
			pattern = '';
			matches = '';
			} catch(ex) {}
			//alert(title+'\n'+hash);
			GMlog("LegalTorrents/ClearBits"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'mininova.org':
			title = $ljq("h1").text();
			hash = $ljq("#download a:contains('magnet')").attr('href');
			//alert(title+'\n'+hash);
			GMlog("Mininova"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'btjunkie.org':
			hash = $ljq("#main th a[title='Magnet Link']").attr('href');
			//alert(title+'\n'+hash);
			GMlog("BTJunkie"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrentz.com':
		case 'torrentz.eu':
			var uri = window.location.toString();
			var result = false;
	
			var pattern=/(\/search|\/verified|\/advanced|\/profile|\/help|\/any)/gi;
			//alert(uri.match(pattern));
			try {
				result = uri.match(pattern);
				//alert(result);
				if (result.length > 0 || result == 'null') {
					result = true;
				}
			} catch(ex) {
				//alert(ex);
				result = false;
			}
			//alert(result);
	
			//if result(true) then search page
			if (result) {
				$ljq("#gmmnu").remove();
			} else {
				title = $ljq("div[class='download'] h2 span").text();
				hash = window.location.toString();
				hash = hash.split("/");
				hash = hash[3];
				//hash = 'magnet:?xt=urn:btih:'+hash+'&dn='+title;
				//alert(title+'\n'+hash);
				GMlog("TorrentzEU"+"\nTitle: "+title+"\nHash: "+hash);
				chunkhash();
			}
			pattern = '';
			matches = '';
		break;

		case 'btmon.com':
			//CHANGED 2012.01
			//title = $ljq("#middle_col h2 span[class='long_word']").text();
			title = $ljq("#middle_content h1:first").text();
			hash = $ljq("a[href*='magnet']").attr('href');
			//alert(title+'\n'+hash);
			GMlog("BTmon"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrenthound.com':
			//title = $ljq("div[class='download'] h2 span").html();
			hash = window.location.toString();
			hash = hash.split("/");
			title = hash[6];
			hash = hash[4];
			//alert(title+'\n'+hash);
			GMlog("TorrentHound"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		//case 'thepiratebay.org'
		case 'thepiratebay.se':
		case 'piratereverse.info':
		case 'malaysiabay.org':
		case 'tpb.pirateparty.org.uk':
			//CHANGED 2012.06
			//title = $ljq("div[class='download'] h2 span").html();
			title = $ljq("div#title").text();
			//hash = $ljq(".download a:contains('magnet')").attr('href');
			hash = $ljq(".download a[href*='magnet']").attr('href');
			//alert(title+'\n'+hash);
			GMlog("ThePirateBay"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'rarbg.com':
			//CHANGED 2012.06
			hash = $ljq("a[href*='magnet']").attr('href');
			title = $ljq("a[href*='magnet']").parent().text();
			//alert($ljq("a[href*='magnet']").parent().text());
			try {
			pattern = /(&f=([\w+:\/\.-][^&]*))/ig;
			matches = hash.match(pattern);
			//title = unescape(matches[0].replace(pattern, "$2"));
			title = matches[0].replace(pattern, "$2");
			} catch(ex) {}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Rarbg"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrents.net':
			//CHANGED 2012.03
			title = $ljq("div#content h1:first").text();
			hash = $ljq("div.info-table dl.mark dt:contains('Hash')").parent().find("dd").eq(0).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("TorrentsNet"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		
		//NO BTIH - REMOVED 2012.01
		//ADDED 2012.03
		case 'yourbittorrent.com':
			title = $ljq("#content h1:first").text();
			hash = $ljq("table.table td.b:contains('Hash')").parent().find("td").eq(1).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("YourBittorrent"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		

		case 'isohunt.com':
			//title = $ljq("div[class='dtxt']:contains('.torrent')").text().replace(/\.torrent/ig, "");
			//title = title.replace('.torrent', '');
			hash = $ljq("span#SL_desc").html();
			//.replace(/info_hash:/ig, '')
			try {
			hash = hash.replace(/info_hash:?\s?([a-z0-9]{32,40}).*/ig, "$1")
			} catch(ex) {}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("IsoHunt"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		//case 'kickasstorrents.com':
		case 'kat.ph':
			//CHANGED 2012.03
			title = $ljq("#mainDetailsTable h1:first").text();
			hash = $ljq("#mainDetailsTable a[href*='magnet']:first").attr('href');
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("KickAssTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		/*
		//NO BTIH - REMOVED 2012.01
		//CHANGED TO torrentdownload.ws
		case 'alivetorrents.com':
		case 'alivetorrents.me':
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("AliveTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		*/
		
		case 'torrentdownload.ws':
			//ADDED 2012.03
			title = $ljq("table.table3 td.td-min:contains('Name')").parent().find("td").eq(1).text();
			hash = $ljq("table.table3 td.td-min:contains('Hash')").parent().find("td").eq(1).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("AliveTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'seedpeer.me':
			//CHANGED 2012.01
			title = $ljq(".topInfo h1:first").text().replace(/\.torrent/ig, "");
			hash = $ljq("div[class='downloadTorrent'] div[class='dTSub'] a").attr('href');
			try {
			hash = hash.replace(/.*\/([a-z0-9]{32,40})*/ig, "$1")
			} catch(ex) {}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("BTJunkie"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrentzap.com':
			//CHANGED 2012.03
			title = $ljq("#content_cap_tab h1:first").text();
			hash = $ljq("div.downbuts a[href*='magnet']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Torrentzap"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrentr.eu':
			//CHANGED 2012.01
			title = $ljq("#torrent-info-block h1:first").text();
			hash = $ljq("#torrent-hash").text();
			//hash = hash.replace(/.*hash info.*\s?([a-z0-9]{32,40}).*/ig, "$1");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("TorrentReactor"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'mac-torrents.com':
			title = $ljq("table td strong a[href*='torrents\.php?mode=download&']").text().replace(/\s+/ig, '');
			hash = $ljq("table td strong a[href*='torrents\.php?mode=download&']").attr('href');
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			chunkhash();
		break;

		case 'torrentpump.com':
			//hash = $ljq("tr[class='maintr_white'] td[title*='magnet'] a").attr('href');
			//hash = $ljq("div#torr_location div[class='fl_center'] ").attr("href");
			hash = $ljq("div[class='block'] div[class='anounse']:regex('[a-z0-9]{32,40}')").text();
			//hash = hash.replace(/hash:?\s+?/ig);
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("TorrentPump"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'extratorrent.com':
			hash = $ljq("td[class='tabledata0']:regex('[a-z0-9]{32,40}')").text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("ExtraTorrent"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'h33t.com':
			//CHANGED 2012.06
			hash = $ljq("table.lista td:contains('Hash')").parent().find("td").eq(1).text();
			title = $ljq("table td[class*='header']").text();
			try {
				//pattern = /(&f=([\w+:\/\.-][^&]*))/ig;
				pattern = /([a-zA-Z0-9]{32})/ig;
				matches = hash.match(pattern);
				//title = unescape(matches[0].replace(pattern, "$1"));
				//alert(title);
			} catch(ex) {}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("H33t"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'monova.org':
			hash = $ljq("#downloadbox h2 a").attr("href");
			try {
				pattern = /.*([a-z0-9]{40})\/(.*).*/ig;
				matches = hash.match(pattern);
				hash = unescape(matches[0].replace(pattern, "$1"));
				title = unescape(matches[0].replace(pattern, "$2"));
			} catch(ex) {}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Monova"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'fulldls.com':
			//CHANGED 2012.01
			title = $ljq("h1#torrent_name_big").text();
			//hash = $ljq("td:regex('[a-z0-9]{40}')").text();
			hash = $ljq("td a[href*='magnet']").attr('href');
			//alert(title+'\n'+hash);
			GMlog("Fulldls"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'realtorrentz.eu':
			//CHANGED 2012.01
			title = $ljq("#details_title").text();
			hash = $ljq("span:regex('[a-z0-9]{40}')").text();
			//alert(title+'\n'+hash);
			GMlog("RealTorrentz"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'btscene.com':
		case 'btscene.eu':
			//hash = $ljq("table[class='det'] td:regex('[a-z0-9]{40}')").text();
			//hash = $ljq("div[class='extinf']:regex('[a-z0-9]{40}')").text();
			hash = $ljq("p[class='details_p']:regex('[a-z0-9]{32}')").text();
			title = $ljq("div[class='srch'] h1").text();
			hash = hash.replace("Hash : ", "");
			//alert(title+'\n'+hash);
			GMlog("BTscene"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'dnbtracker.org':
			//alert($ljq("td b:contains('Info Hash')").parent().parent().html());
			hash = $ljq("td b:contains('Info Hash')").parent().parent().html();
			try {
				pattern = /.*([a-z0-9]{40}).*/ig;
				matches = hash.match(pattern);
				hash = unescape(matches[0].replace(pattern, "$1"));
				//title = unescape(matches[0].replace(pattern, "$2"));
			} catch(ex) {}
			pattern = '';
			matches = '';
			title = $ljq("a[title='Download torrent']").text();
			//hash = hash.replace("Hash : ", "");
			//alert(title+'\n'+hash);
			GMlog("DnbTracker"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'wikileaks.com':
		case 'wikileaks.org':
		case 'wikileaks.info':
			//Using .length for exists didnt work in the if statement for some reason
			//  workaround is using exists var then checking in if statement
			var exists = $ljq("span[class='plainlinks']").length;
			if (exists > 0) {
				//alert($ljq("span[class='plainlinks'] a:contains('Magnet')").attr("href"));
				hash = $ljq("span[class='plainlinks'] a[href*='magnet']").attr("href");
				chunkhash();
			} else {
				$ljq("#gmmnu").remove();
			}
			//alert(title+'\n'+hash);
			GMlog("Wikileaks"+"\nTitle: "+title+"\nHash: "+hash);
		break;

		case 'eztv.it':
			title = $ljq("table[class='forum_header_border_normal'] td[class='section_post_header']:first").text();
			//hash = $ljq("table[class='det'] td:regex('[a-z0-9]{40}')").text();
			hash = $ljq("a[class='magnet']").attr("href");
			//[class='magnet']
			//alert($ljq("a[class='magnet']").attr('href'));
			//title = $ljq("div[class='mainparagraph'] h1").text();
			//alert(title+'\n'+hash);
			GMlog("Eztv"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrindex.com':
			title = $ljq("div#detailsFiles td:first").text();
			hash = $ljq("div[class='boxed'] p[class='smallest']").text();
			//alert(title+'\n'+hash);
			GMlog("Torrindex"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'bt-chat.com':
			title = $ljq("tr[class='off']:contains('Name')").text();
			title = $ljq.trim(title);
			title = title.split("\n");
			title = title[1];
			title = $ljq.trim(title);
			hash = $ljq("tr[class='off']:contains('Hash')").text();
			hash = $ljq.trim(hash);
			hash = hash.split("\n");
			hash = hash[1];
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("BT-chat"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'newtorrents.info':
			title = $ljq("div#main h4").text();
			hash = $ljq("table[class='sm'] tr:contains('Hash')").text();
			hash = hash.replace("Hash", "");
			//alert(title+'\n'+hash);
			GMlog("NewTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'youtorrent.com':
			title = $ljq("#torrent-title").text();
			hash = $ljq("#download-hash").text().replace(/(hash|\(|\))/ig, "");
			//hash = hash.replace("Hash", "");
			//hash = hash.replace("(", "");
			//hash = hash.replace(")", "");
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("YouTorrent"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'legittorrents.info':
			title = $ljq("td[class='header']:contains('Name'):first").next().text();
			title = $ljq.trim(title);
			hash = $ljq("td[class='header']:contains('Hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("LegitTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'bt.etree.org':
			title = $ljq("td[class='heading']:contains('Show'):first").next().text();
			title = $ljq.trim(title);
			hash = $ljq("td[class='heading']:contains('hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("BT.etree"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'linuxtracker.org':
			title = $ljq("td[class='rowhead']:contains('Name'):first").next().text();
			title = $ljq.trim(title);
			hash = $ljq("td[class='rowhead']:contains('Hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("LinuxTracker"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrent.ibiblio.org':
			title = $ljq("div[class='field-col']:contains('Filename'):first").next().text();
			//alert(title);
			title = $ljq.trim(title);
			hash = $ljq("div[class='field-col']:contains('hash'):first").next().text();
			hash = $ljq.trim(hash);
			////alert(title+'\n'+hash);
			GMlog("torrent.ibiblio"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'biotorrents.net':
			title = $ljq("h1 a:first").text();
			title = $ljq.trim(title);
			hash = $ljq("td[class='heading']:contains('hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(hash+'\n'+title);
			GMlog("Biotorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case 'torrentreactor.net':
			title = $ljq("h1[class='vertitle']").text();
			title = $ljq.trim(title);
			hash = $ljq("li div:contains('Hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("TorrentReactor"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
	
		case 'limetorrents.com':
			title = $ljq("div#content h1:first").text();
			title = $ljq.trim(title);
			hash = $ljq("div[class='torrentinfo'] td:contains('Hash'):first").next().text();
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("LimeTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;

		case '1337x.org':
			//CHANGED 2012.03
			title = $ljq("div.topHead h2:first").text();
			hash = $ljq("div.torrentInfoBtn a[class='magnetDw']:first").attr("href");
			hash = $ljq.trim(hash);
			//alert(title+'\n'+hash);
			GMlog("1337x"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'torrentcrazy.com':
			//CHANGED 2012.03
			title = $ljq("table.info th:contains('Title')").parent().find("td").eq(0).text();
			hash = $ljq("table.info th:contains('Hash')").parent().find("td").eq(0).text();
			//alert(title+'\n'+hash);
			GMlog("TorrentCrazy"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'elitetorrent.pl':
			//title = $ljq("table.lista table td.header").text();
			hash = $ljq("table td.rowhead_left:contains('Hash')").parent().find("td").eq(1).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("EliteTorrent"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'bitspider.info':
			title = $ljq("div#InfoTorrent div.InfoTorrentHeader").text();
			hash = $ljq("a#InfoTorrentDownload").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Bitspider"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'bitsnoop.com':
			title = $ljq("div#torrentHeader h1").text();
			hash = $ljq("div#dload a[href*='magnet']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Bitsnoop"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'torrentbit.net':
			title = $ljq("h1.title1").text();
			hash = $ljq("table.tor_item th:contains('hash')").parent().find("td").eq(0).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Torrentbit"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'mnova.eu':
			title = $ljq("div#main h1:first").text();
			hash = $ljq("div#downloadbox a[href^='dht']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Mnova"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'fenopy.eu':
		//case 'fenopy.se':
		//Does .se have BTIH?
			title = $ljq("ul#breadcrumb li.b3 h1").text();
			hash = $ljq("div.infohash a").text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Fenopy"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'vertor.com':
			title = $ljq("div.free h1").text();
			hash = $ljq("ul.down_but li a[href*='magnet']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("Vertor"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'torrentstate.com':
			title = $ljq("div#home h3").text();
			hash = $ljq("div#home a.magnet").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("TorrentState"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'sumotorrent.com':
			title = $ljq("div#network h1").text();
			hash = $ljq("div.torrentInfo table td:contains('Hash')").parent().find("td").eq(1).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("SumoTorrent"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'bittorrent.am':
			title = $ljq("table td.categoryName h1 a").text();
			hash = $ljq("table.torrentsTable td:contains('Hash')").parent().find("td").eq(2).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("BittorrentAM"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'sceneunderground.org':
			title = $ljq("div#tab1 table td:contains('Name')").parent().find("td").eq(1).text();
			hash = $ljq("div#tab1 table td:contains('Hash')").parent().find("td").eq(1).text();
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("SceneUnderground"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'silvertorrents.me':
			title = $ljq("div#MiddleLeftPan h1:first").text();
			hash = $ljq("div#MiddleLeftPan a[href*='magnet']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("SilverTorrents"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		//Changed 2012.11
		//torrentdownloads.net > torrentdownloads.me
		case 'torrentdownloads.me':
			title = $ljq("h1.titl_1").text();
			hash = $ljq("div.inner_container a[href*='magnet']").attr("href");
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("TorrentDownloads"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		case 'btdigg.org':
			//CHANGED 2012.11
			//pattern = /info_hash=([a-z0-9]+)/ig;
			pattern = /[a-z0-9]{32,40}/ig;
			matches = curwindow.match(pattern);
			//alert(matches);
			//alert(matches[0]);
			//alert(typeof(matches));
			//alert(Boolean(matches));
			//alert(matches[0].replace(pattern, "$1"));
			//urlmatch = matches[0].replace(pattern, "$1");
			//alert(urlmatch);
			//urlmatch = matches[0];
			
			//if (matches[0] !== null && matches[0] !== undefined && matches[0] !== 0 && matches[0] !== '') {
			if (Boolean(matches)) {
				title = $ljq("div#torrent_info table td:contains('Name')").parent().find("td").eq(1).text();
				hash = $ljq("div#torrent_info a[href^='magnet']").attr("href");
				chunkhash();
			} else {
				$ljq("#gmmnu").remove();
			}
			pattern = '';
			matches = '';
			//alert(title+'\n'+hash);
			GMlog("btdigg.org"+"\nTitle: "+title+"\nHash: "+hash);
		break;
		
		/* Removed - Dead site 2012.11
		case 'bittrend.com':
			hash = $ljq("h3:contains('infohash')").text().replace(/(infohash|\s+)/ig, "");
			GMlog("bittrend.com"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		*/

		case 'torcatch.net':
			hash = $ljq("td:contains('hash')").parent().find("td").eq(1).text();
			title = $ljq("td[class='torrent_name']").text();
			GMlog("torcatch.net"+"\nTitle: "+title+"\nHash: "+hash);
			chunkhash();
		break;
		
		default:
			showError();
		break;
	}//switch
	

	/*===============================
	= End site parsing
	=
	= Start menu functions
	===============================*/

	
	//Debugging
	//$ljq(window).resize(function(e) {
		//GM_log('resized!');
	//});

	if (duplicatecheck == true) {
		//$ljq("#GB_initialize").remove();
		showError('duplicatescriptinstructions');
		showUpgradeInstructions();
	}

	$ljq("#gm_upgrade_instructions a").on('click', function(event) {
		event.preventDefault();
		if (isWebkit) {
			showUpgradeInstructions('chrome');
		} else {
			showUpgradeInstructions('firefox');
		}
		return false;
	});

	if (debugSettingsTab !== "") {
		GMlog("debugSettingsTab: "+debugSettingsTab);
		showConfiguration(debugSettingsTab);
		//showConfiguration();
		//showConfiguration("about");
		//showConfiguration("trackers");
		//showConfiguration("lists");
		//showConfiguration("webui");
		//showConfiguration("rescue");
		//showConfiguration("help");
	}	
	
	//$ljq("#gmmnu_links_webui #gmmnu_linksfiles_webui a").live("click", function(event) {
	//$ljq("#gmmnu_links_webui #gmmnu_linksfiles_webui a").on("click", function(event) {
	//.on() will not bubble like live
	$ljq("#gmmnu").on("click", "#gmmnu_links_webui #gmmnu_linksfiles_webui .webui a", function(event) {
		event.preventDefault();
		//alert("test");
		//alert("webui = "+$ljq(this).attr("data-webui"));
		GMlog("webui = "+$ljq(this).attr("data-webui"));
		//$ljq("#gmmnu_linksfiles_webui a[data-webuiid="+$ljq(this).attr("data-webui")+"]").removeClass("success").removeClass("error");
		$ljq(this).removeClass("success").removeClass("error").addClass("sending");
		//GMlog("data-magneturi = "+$ljq(this).attr("data-magneturi"));
		//webui_send($ljq(this).attr("data-webui"), $ljq(this).attr("href"));
		webui_send($ljq(this).text(), $ljq(this).attr("href"));
		//webui_send($ljq(this).text(), $ljq(this).attr("data-magneturi"));
		return false;
	});
	
	$ljq("#gmmnu_menu .menubar div a").hover(
		function () {
			//$ljq("#gmmnu_title").html('Config');
			$ljq("#gmmnu #gmmnu_title").html($ljq(this).attr("data-title"));
		},
		function () {
			//$ljq("#gmmnu #gmmnu_title").html('GameTrailers Download');
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu #gmmnu_title").attr("data-title"));
		}
	);
	
	$ljq("#gmmnu_menu #donate_icon").on('click', function(event) {
		event.preventDefault();
	});

	$ljq("#gmmnu_menu #donate_icon").on('click', function(event) {
		event.preventDefault();
		//var newheight = $ljq("#gmmnu_links_wrap").css("height");
		var newheight = $ljq("#gmmnu_links_wrap").height();
		GMlog("newheight : "+newheight);
		//GMlog("gmmenu gmmnu_links_wrap: "+$ljq("#gmmnu #gmmnu_links_wrap").height());
		//if (newheight.replace("px", "") < 100) {
		if (newheight < 120) {
			newheight = 120;
		}
		//Is showError active?
		if ($ljq("#gmmnu_err").attr("data-active") == "true") {
			//GMlog("data-active : "+$ljq("#gmmnu_err").attr("data-active"));
			$ljq("#gmmnu_err").hide();
		} // else {
			$ljq("#gmmnu_donations").css({height: newheight});
			$ljq("#gmmnu_links_wrap").hide();
			$ljq("#gmmnu_donations").show();
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu_menu #donate_icon a").attr("data-title"));
		//}
	});
	$ljq("#gmmnu_donations").mouseleave(function() {
		if ($ljq("#gmmnu_err").attr("data-active") == "true") {
			$ljq("#gmmnu_err").show();
		} //else {
			$ljq("#gmmnu_donations").hide();
			$ljq("#gmmnu_links_wrap").show();
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu #gmmnu_title").attr("data-title"));
		//}
	});

	$ljq("#gmmnu_menu #twitter_icon").on('click', function(event) {
		event.preventDefault();
		//var newheight = $ljq("#gmmnu_links_wrap").css("height");
		var newheight = $ljq("#gmmnu_links_wrap").height();
		GMlog("newheight : "+newheight);
		//GMlog("gmmenu gmmnu_links_wrap: "+$ljq("#gmmnu #gmmnu_links_wrap").height());
		//if (newheight.replace("px", "") < 100) {
		if (newheight < 120) {
			newheight = 120;
		}
		//Is showError active?
		if ($ljq("#gmmnu_err").attr("data-active") == "true") {
			//GMlog("data-active : "+$ljq("#gmmnu_err").attr("data-active"));
			$ljq("#gmmnu_err").hide();
		} // else {
			$ljq("#gmmnu_twitter").css({height: newheight});
			$ljq("#gmmnu_links_wrap").hide();
			$ljq("#gmmnu_twitter").show();
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu_menu #donate_icon a").attr("data-title"));
		//}
	});

	$ljq("#gmmnu_twitter").mouseleave(function() {
		if ($ljq("#gmmnu_err").attr("data-active") == "true") {
			$ljq("#gmmnu_err").show();
		} //else {
			$ljq("#gmmnu_twitter").hide();
			$ljq("#gmmnu_links_wrap").show();
			$ljq("#gmmnu #gmmnu_title").html($ljq("#gmmnu #gmmnu_title").attr("data-title"));
		//}
	});
	
	$ljq('#gmmnu_menu .menubar #config_icon a').on('click', function(event) {
		event.preventDefault();
		//alert("Configure!");
		showConfiguration();
	});
	
	$ljq("#gmmnu_menu .menubar #update_icon a").on('click', function(event) {
		event.preventDefault();
		if ($ljq("#gmmnu_menu .menubar #update_icon a").hasClass('update')) {
			alertUpdate(scriptId, name, ver, notes);
		}
	});

	//$ljq('#gmmnu_linksfiles_webui div.setupwebui a').on('click', function(event) {
	$ljq("#gmmnu").on("click", "#gmmnu_linksfiles_webui .setupwebui a", function(event) {
		event.preventDefault();
		//alert("setup webui!");
		showConfiguration("webui");
		return false;
	});
	
	$ljq('#gb_update_wait').on('click', function(event) {
		event.preventDefault();
		//alert(lastCheck);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
	});
	
	$ljq('#gb_update_waitnextversion').on('click', function(event) {
		event.preventDefault();
		//return false;
		//alert(latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastVersion', latest_version.major+'.'+latest_version.minor+'.'+latest_version.patch);
		GM_setValue('lastCheck', currentTime);
		GB_hide();
	});
	
	//alert("LOADED");
	//alert($ljq);
	//alert(lastCheck);
	//alert(debugUpdate);
	if (currentTime > (lastCheck + 86400) || debugUpdate == true) { // 43200 12 hours // 86400 24 hours after last check
		//alert("updateCheck");
		GMlog("updateCheck");
		updateCheck();
	}
	//running_version = parseVersionString("0.4.3");
	//latest_version = parseVersionString("0.5.0");
	//alertUpdate("1234", "MagnetTracker", "0.5.15", "notes");
	//GMlog("*************\nDISABLE debug running/latest_version\n*************");

//});

/*==================
// End of script
==================*/

//***********************
// Notes
//***********************
//  v0.5.0 requires Firefox 3.6+ due to CSS3 multiple background support.
//  Created base64 images via (make sure to check base64 checkbox)
//    http://software.hixie.ch/utilities/cgi/data/data
//  The original (un-modified) update-notification script was made by Seifer
//    You can find the original at http://userscripts.org/scripts/show/12193
//    This custom version has been nearly rewritten by Daem0nX
//  Using at least one image from Crystal Clear Icons (LGPL)
//    http://commons.wikimedia.org/wiki/Crystal_Clear
//  Using JSON2 from http://content.worldnow.com/global/tools/video/json2.js
//    Original doesnt work in greasemonkey for Ubuntu http://www.json.org/json2.js
//  Using a modified version of Greybox Redux
//    Required: http://jquery.com/
//    Written by: John Resig
//    Based on code by: 4mir Salihefendic (http://amix.dk)
//    License: LGPL (read more in LGPL.txt)
//  Usuing a heavily modified version of Simple Tabs w/ CSS & jQuery
//    Original - http://www.sohtanaka.com/web-design/simple-tabs-w-css-jquery/
//  Using icons from "Led Icon Set" http://led24.de/iconset/
//    Used in compliance with http://creativecommons.org/licenses/by-sa/3.0/
//  Using icons from "Tango Desktop Project" http://tango.freedesktop.org/Tango_Desktop_Project
//    Used in compliance with Public Domain License
//  Using icons from "WooFunction Icon set" http://wefunction.com/contact/
//    Used in compliance with GPL
//  Using icons from "Dead Simple Icon Set" http://www.iconfinder.com/search/?q=iconset%3Adeadsimple
//    Used in compliance with http://creativecommons.org/licenses/by/3.0/
//  Using icons from http://www.iconfinder.com/icondetails/38605/101/paypal_straight_icon
//    Used in compliance with Free for commercial use
//  Using icons from "Windows 8 Metro UI" http://www.iconspedia.com/icon/utorrent-green-metro-icon-30411.html
//    Used in compliance with http://creativecommons.org/licenses/by/3.0/
//  Using Foundation 2.2.1 CSS Framework from http://foundation.zurb.com/
//    Used in compliance with MIT license
//

//***********************
// Thanks
//***********************
//  Simon! - helped test, reported issues and suggestions
//  jesscold - modified JSON2 script
//  Gikero - informed BTIH broken on site
//

//***********************
// Future
//***********************
//  Increase number of supported sites
//  Add Rescue tab for Import/Export
//    Backup and Restore from JSON data
//  Add support for Chrome, Safari and Opera
//  Ability to backup/restore/share settings on MagnetTracker.com
//  Language localization
//  Add ability to rename Lists/Connections.
//  On parse error save to json_trackers/lists/webui_bak for review
//  Add upgrade check and update any site address changes
//    Must keep track of uri changes example: legaltorrents.com > clearbits.net
//    Or group site names with JSON site_name[url,url,url]
//  Fix adding trackers - duplicate catch
//    Remove added from input box, retain duplicate
//    Or suppress duplicate error and show as added since it exists
//  Fix adding duplicate trackers in Lists > Trackers
//    Disable trackers in default list showing as available to add when in custom list
//  Add test button/function for webui connections
//

//***********************
// ChangeLog
//***********************
// 2012.12.02 - 0.5.0
//  Visit <a href="http://www.MagnetTracker.com" target="_blank">MagnetTracker.com</a> for game giveaway contest details!
//    Celebrating the v0.5.0 launch.
//  Script namespace changed to http://www.MagnetTracker.com
//    Due to this change Trackers and Lists are reset. Sorry!
//    Remove the old Magnet Tracker (v0.4.3 or below) from your Greasemonkey scripts!
//    Upgrade instructions overlay added.
//  Added ability to send magnet links to WebUI.
//    Added support for uTorrent WebUI.
//    Tested with uTorrent 3.2 and WebUI 2012-05-05.
//    Updates will add support for Deluge, Transmission and Vuze.
//  Added WebUI Connections menu section.
//    Will list all enabled connections.
//  Added ability for Magnet/WebUI links to auto regenerate on overlay close.
//    Only regenerates links if changes made to Trackers/Lists/WebUI.
//    Only applies to active window/tab.
//  Added upgrade checks for Lists, Trackers, WebUI.
//    Existing json_* values will now be updated if possible instead of resetting to defaults.
//  Added ability to open overlay to specific tab.
//    If no WebUI connections are setup the menu link will open the overlay WebUI tab.
//  Added row background color on hover.
//    Applies to Magnet Link and WebUI Connections.
//  Added Twitter link @MagnetTracker along with @Daem0nX (Developer)
//  Added Foundation 2.2.1 CSS Framework by ZURB
//    Known issue - font size is sometimes different if source site is using html * override.
//  Added webkit rounded corners for Chrome.
//  Added sites to parse.
//  Fixed BTIH detection for sites that changed code.
//    Added error catching for BTIH that return empty or undefined.
//  Fixed Trackers version number not being added to JSON if upgrading.
//  Fixed Trackers being added even if not unique Trackers > Add Tracker.
//    If any Trackers have an invalid address none will be added until they are all correct.
//  Fixed donation section not setting the correct height if the error section was active.
//  Changes to Configuration overlay.
//    Added WebUI tab, removed Misc tab.
//    Added inline error and success messages.
//    Updated overlay look and feel with Foundation CSS.
//  Changed Lists and Trackers variables and storage names.
//    Changed gm_lists and storage lists to json_lists
//    Changed gm_trackers and storage atrackers to json_trackers.
//    Old lists and atrackers are removed from storage when you uninstall the old script.
//  Changed error menu, more dynamic with new messages.
//    Added new error message with instructions if no trackers are defined.
//    Added new error message if no BTIH is detected.
//    Default error message now includes site URL address to copy.
//  Changed Default Trackers on install.
//    udp://openbittorrent.com:80 udp://publicbt.com:80 udp://ccc.de:80 udp://istole.it:80
//  Changed Default List, now populated with Default Trackers on install.
//  Changed behavior of Twitter and Donate buttons.
//    Requires click to show areas, mouseover removed, mouseout to hide.
//  Modified addition and removal of sites/trackers/lists to use splice().
//    Updates JSON after all actions are complete instead of after each action.
//  Modified script meta data.
//    Added @grant for GM_getValue, GM_setValue, GM_deleteValue, GM_addStyle, GM_xmlhttpRequest, GM_log.
//  Upgraded jQuery from 1.7.1 to 1.8.3.
//    Changed jQuery calls .bind() and .unbind() to .on() and .off().
//
// 2012.06.06 - 0.4.3
//  Fixed menu border radius not working in Firefox 13.
//
// 2012.02.03 - 0.4.2
//  Fixed BTIH detection for sites that changed code.
//
// 2012.01.22 - 0.4.1
//  Fixed BTIH detection for sites that changed code.
//  Changed Flattr donation link.
//  Upgraded jQuery from 1.6.2 to 1.7.1.
//    Changed .live() calls to .on()
//
// 2011.08.10 - 0.4.0
//  Upgraded jQuery from 1.3.2 to 1.6.2
//  Added sites to parse.
//  Added better duplicate detection when adding Lists and Trackers.
//  Added scroll height check for Update Alert overlay.
//  Added Script Homepage and Twitter icon to menu bar.
//  Added GM_log function GMlog for console logging.
//  Added new Donation options.
//    Added Flattr icon, new Paypal icon.
//  Fixed updateCheck not returning update if HTTPS Everywhere was installed.
//    Changed USO update link from HTTP to HTTPS.
//  Fixed some undeclared variables.
//  Fixed overlay tabs changing url location.
//  Fixed Link Title text being url encoded.
//  Fixed scroll height check for Configuration overlay.
//  Fixed broken List functions in Firefox 4 and 5.
//    Caused by .val() instead of .text() comparisons and others.
//    Fresh script install would fail to create Lists JSON on Ubuntu.
//  Fixed some broken detection code (chunkhash) for sites that changed code.
//  Modified menu title attr to data-title.
//    Removes annoying hover title.
//  Modified all site checks from if() to switch().
//  Removed sites that no longer offer BTIH.
//
// 2010.12.10 - 0.3.0
//  Added sites to parse.
//  Less obtrusive Update Alert (icon instead of auto prompt).
//  Added menu bar with Settings, Update and Donate icons.
//
// 2010.10.09 - 0.2.4 & 0.2.5
//  Fixed debugUpdate accidentally set to true forcing update checks.
//  Fixed @description being overwritten with @notes text
//    after updating the update check system.
//
// 2010.10.08 - 0.2.3
//  Added new site to parse.
//  Modified update check system.
//
// 2010.09.15 - 0.2.2
//  Added new sites to parse.
//  Fixed some formatting issues on Update Alert overlay.
//    Centered top text of update
//    Current version and update link is now green
//  Fixed some formatting issues on Settings overlay (tabs).
//    Tab height was weird on some sites
//  Modified all include and excludes to allow for http or https.
//
// 2010.07.25 - 0.2.1
//  Added new sites to parse.
//  Modified Lists JSON naming structure. Requires Lists to be reset.
//  Fixed overlay content being hidden if browser height was too small.
//  Fixed ability to add duplicate trackers and sites to list.
//  HTTP and UDP tracker url is validated (regex) when added.
//  Removed .torrent from title text (link)
//  Changed primary regex hash check from {32,40} to {40}
//    Added error check for non 40char BTIH hashes [mininova, etc]
//    If {40} doesn't match, {32,40} is then tried.
//  Fixed a bug caused by quotes " and ampersand & that would break the generated tracker link.
//  Changed behavior of null trackers
//    No longer auto adds publicbt and openbittorrent.
//    Misc tab now includes option to install sample set.
//  Fixed minor syntax errors in overlay tab inline styles.
//  Fixed the hash check code for a few sites that no longer worked.
//  Fixed Lists dropdown resetting to Default if you went to another tab then went back to Lists.
//
// 2010.03.24 - 0.2.0
//  Initial lists implementation.
//  Ability to add multiple trackers at once (multi-line input).
//  Added links to the instructions for adding trackers and creating lists under the Help tab.
//
// 2010.03.22 - 0.1.4
//  Settings overlay now stays in the center of the screen after the window is resized.
//  Added tab icons (notes for ref/link), new magnet icon and new settings icon
//  Added link to magnet trackers userscript page on About tab
//    http://userscripts.org/scripts/show/71670
//  Updated include for btjunkie new url structure
//
// 2010.03.19 - 0.1.3
//  Fixed an issue caused by a fresh install of v0.1.1 or v0.1.2.
//
// 2010.03.18 - 0.1.2
//  Fixed a JSON error in Ubuntu (Simon! alerted me)
//    Found a fixed/modified JSON2 from http://userscripts.org/scripts/show/55900
//    JSON script URL http://content.worldnow.com/global/tools/video/json2.js
//    Tested to work with Firefox 3.6 (OSX, Windows XP), Firefox 3.5.8 (Ubuntu)
//  Fixed default trackers not updating (in tab listbox) without a page refresh
//  Fixed Settings option showing up before it could be called
//  Fixed Error heading not being bold with underline
//  Added some error catching, if no hash is found, error is shown
//  Fixed or Updated includes/excludes
//    btjunkie, rarbg, seedpeer, torrentreactor, mac-torrents
//
// 2010.03.18 - 0.1.1
//  Settings overlay still needs work, but looks much more similar across multiple sites.
//  Update Notification overlay still needs work, but looks a lot better now.
//  Fixed an include error for clearbits.
//  Fixed an issue with default trackers not resetting if no trackers were found.
//  Added Help tab with link to Discussions.
//  Fixed the Settings overlay not showing up if there was an Update Alert.
//
// 2010-03-16 - 0.1.0
//  Initial test release (ALPHA)
//  Custom menu (bottom right)
//    CSS may need updating to work on all site correctly
//  Custom version update notification system
//    CSS needs some updating to work on all site correctly
//  Custom settings overlay
//    CSS needs needs updating to work on all sites correctly
//  Around 20 supported sites
//  Ability to define trackers
//    Applied to all magnets
//    Defaults to two predefined if none are defined 
//