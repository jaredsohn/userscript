// ==UserScript==
// @name           BvS News Ticker Logger
// @namespace      Garyzx
// @description    Uploads the BvS News Ticker message to Gary's server
// @include        http://www.animecubed.com/billy/bvs/*
// @include        http://animecubed.com/billy/bvs/*
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.00
// @history        1.00 Initial version
// ==/UserScript==

var version="1.00";
try{ScriptUpdater.check(84116, version);} catch(e) {}

var message=document.body.innerHTML.match(/BvS News: (.*)<\/p>/)[1].replace(/ style=\"[^\"]*\"/g, "");
var old=GM_getValue("message", "");
if(old!=message){
	str=version+"\n"+document.body.innerHTML.match(/name="player" value="([^"]+)"/)[1]+"\n"+message;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://bvs-garyzx.appspot.com/bvs/tickerlogger",
		data: str,
		
		onload: function(response){
			if(response.responseText.indexOf("Error")!=-1){
				alert(response.responseText);
			}
		}
	});
	GM_setValue("message", message);
}
