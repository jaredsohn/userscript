// ==UserScript==
// @name           TTNET Oyun Flash Games
// @description    Shows Flash Games without Logging-in.
// @version        1.0
// @date           01.01.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://ttnetoyun.com.tr/*
// @include        http://www.ttnetoyun.com.tr/*

// ==/UserScript==

/* Querystring class
 *
 * Copyright (c) 2008, Adam Vandenberg
 * All rights reserved.
 * http://adamv.com/dev/javascript/querystring
 *
 * Client-side access to querystring name=value pairs
 * Version 1.3
 * 28 May 2008
 *
 * License (Simplified BSD):
 * http://adamv.com/dev/javascript/qslicense.txt
 */
function Querystring(qs) { // optionally pass a querystring to parse
  this.params = {};

  if (qs == null) qs = location.search.substring(1, location.search.length);
  if (qs.length == 0) return;

  // Turn <plus> back to <space>
  // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
  qs = qs.replace(/\+/g, ' ');
  var args = qs.split('&'); // parse out name/value pairs separated via &

  // split out each name=value pair
  for (var i = 0; i < args.length; i++) {
    var pair = args[i].split('=');
    var name = decodeURIComponent(pair[0]);

    var value = (pair.length==2)
    ? decodeURIComponent(pair[1])
    : name;

    this.params[name] = value;
  }
}

Querystring.prototype.get = function(key, default_) {
  var value = this.params[key];
  return (value != null) ? value : default_;
}

Querystring.prototype.contains = function(key) {
  var value = this.params[key];
  return (value != null);
}
/* end of Querystring class */

var FlashError = document.getElementById('ctl00_cphContentLeft_Information1_ctl00_linkMustLogin');
if (FlashError)
{
	// get current query string
	var queryStr = new Querystring();

	// get Game ID
	if (queryStr.contains("GameID")) {
		var GameID = queryStr.get("GameID");
		var FlashContent = ''+"\n"
+'			<div id="ctl00_cphContentLeft_flashdiv" style="visibility:visible;">'+"\n"
+'                <div style="position: absolute; top: -500000; width: 0px; visibility: hidden;">'+"\n"
+'                    <span id="ctl00_cphContentLeft_lblFlashURL">http://www.ttnetoyun.com.tr/Handlers/Handler.ashx?Type=FLASHGAMESWF&ID=' + GameID + '&dummy=Games/' + GameID + '.swf</span>'+"\n"
+'                    <br />'+"\n"
+''+"\n"
+'                    <br />'+"\n"
+'                    <span id="ctl00_cphContentLeft_lblFlashVars">_GameID=' + GameID + '</span>'+"\n"
+'                    <br />'+"\n"
+'                    <br />'+"\n"
+'                    <span id="ctl00_cphContentLeft_lblFlashWidth">655</span>'+"\n"
+'                    <span id="ctl00_cphContentLeft_lblFlashHeight">468</span>'+"\n"
+'                </div>'+"\n"
+''+"\n"
+'                <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"'+"\n"
+'                    height="468" width="655" id=\'http://www.ttnetoyun.com.tr/Handlers/Handler.ashx?Type=FLASHGAMESWF&ID=' + GameID + '&dummy=Games/' + GameID + '.swf\''+"\n"
+'                    align="middle">'+"\n"
+'                    <param name="movie" value=\'http://www.ttnetoyun.com.tr/Handlers/Handler.ashx?Type=FLASHGAMESWF&ID=' + GameID + '&dummy=Games/' + GameID + '.swf\' />'+"\n"
+'                    <param name="quality" value="high" />'+"\n"
+'                    <param name="bgcolor" value="#d6d6d6" />'+"\n"
+'                    <param name="wmode" value="window" />'+"\n"
+'                    <param name="FlashVars" value="_GameID=' + GameID + '" />'+"\n"
+'                    <embed src=\'http://www.ttnetoyun.com.tr/Handlers/Handler.ashx?Type=FLASHGAMESWF&ID=' + GameID + '&dummy=Games/' + GameID + '.swf\' height="468" width="655"'+"\n"
+'                        quality="high" bgcolor="#d6d6d6" name=\'http://www.ttnetoyun.com.tr/Handlers/Handler.ashx?Type=FLASHGAMESWF&ID=' + GameID + '&dummy=Games/' + GameID + '.swf\' align="middle"'+"\n"
+'                        allowscriptaccess="sameDomain" allowfullscreen="false" type="application/x-shockwave-flash"'+"\n"
+'                        flashvars="_GameID=' + GameID + '" pluginspage="http://www.macromedia.com/go/getflashplayer" />'+"\n"
+'                </object>'+"\n";
+'            </div>';
		if (document.all)
			divFlashContainer.innerHTML=FlashContent;
		else if (document.getElementById){
			el = document.getElementById('divFlashContainer');
			rng = document.createRange();
			rng.setStartBefore(el);
			htmlFrag = rng.createContextualFragment(FlashContent);
			while (el.hasChildNodes()) el.removeChild(el.lastChild);
			el.appendChild(htmlFrag);
		}
	}
}

