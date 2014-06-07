// =========================================================================================
// QuActiveChat v1.1 
// QuActiveChat is a tabbed chat interface for Kingdom of Loathing (www.kingdomofloathing.com) 
// =========================================================================================
// Modifications Copyright 2012, Kevin Jones. All rights reserved.
// Original source Copyright 2010, Chris Theron. All rights reserved.
//
// Released under the GPL license: 
// http://www.gnu.org/copyleft/gpl.html
// =========================================================================================
// Also released under the simplified BSD license:
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright notice, this list of
//      conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright notice, this list
//      of conditions and the following disclaimer in the documentation and/or other materials
//      provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY KEVIN JONES AND CHRIS THERON ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRIS THERON OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of Chris Theron pr Kevin Jones.
// =========================================================================================


// ==UserScript==
// @name			QuActiveMChat
// @namespace		www.bewarethefgc.com
// @description		Quack-Enhanced Tabbed Chat for KoL
// @author			Lopey
// @include			*kingdomofloathing.com/mchat.php
// @include			http://127.0.0.1:*/mchat.php
// @include			http://localhost:*/mchat.php
// ==/UserScript==
//
// =====================================================================================
// CREDITS
// =====================================================================================
// Modified from Chez's ActiveChat implementation (http://userscripts.org/scripts/show/83477)
// Based on CDM's Tabbed KoL Chat (https://github.com/cdmoyer/cdm-s-kol-greasemonkeys)
// KoLMafia gCLI integration code borrowed from KolMafia
// icons from http://www.famfamfam.com/lab/icons/silk/
//
// =================================================================================
// INSTALLATION NOTES
// =================================================================================
// Account Page\Chat Options\Show tag in current channel must be *enabled*
// KoLmafia\Preferences\Browser\Integrate chat and relay browser gCLI interfaces must be *deselected*
// KoLmafia\Preferences\Browser\Reformat incoming chat HTML must be *deselected*
// Mafia Daily Build 8046/Version 13.9 or later required for ascension log integration
// To run this, the variable quacks down below must be set with the comma-separated list of playerIDs
// of whom you'd like to have chat. The script must be loaded, the option to make people quack must be 
// turned on and saved, and then chat must be reloaded.
//
// =================================================================================
// CHANGE LOG
// =================================================================================
/*
QUACTIVE MCHAT:
2.0		Move to mchat.php
1.1     Incorporation of changes from Chris Fisher (Gemelli)
        Firefox support readded
        eliminate private message tweaking
        etc.
1.0 	Branch off of Active Chat.

*/

unsafeWindow = this['unsafeWindow'] || window;

// ================================================================================= //
// CONSTANTS ======================================================================= //
// ================================================================================= //

function formatMessage(a) {
	console.log(a);
	}

var old_fm = window.formatMessage ;
// QUACK QUACK QUACK QUACK
var quack_on = true;
var quacks = '352980';	// Players to be quacked.  Separate player IDs with commas.  NO SPACES BETWEEN IDS AND COMMAS!
var quackall = false;					// QUACK THEM ALL
var unquackable = true;					// Set to false if you don't want the 'unquacked' channel to appear
var unquackhigh = false;				// Set to true if you want the unquacked channel to highlight when someone gets quacked
var separator = ',';
if (quacks.indexOf(separator)==0)
	quacks = quacks + ',999999999';
	
window.formatMessage = function (a) {
	var key = a.type;
	if (key == 'public') key += a.format;
	if (key == 'public1' || key == 'public2') {
		var anyquacks=0;
		var unquacked = a.msg;
		if (quack_on) {
		var quackthis = 0;
		var targets = quacks.split(separator);
		for (var target in targets) {
		//ac_debug("target=",targets[target]);
			if (target == a.who.id) {
				quackthis=1;
				}
		}
		if (quackthis == 1) {	
			console.log("target match");
			var quackline='';
			var startpoint;
			var textline;
			var endline="";
			console.log("line=",line);
			if (line.lastIndexOf('<i>')>0) {
				startpoint=line.indexOf('</b>');
				var possiblestart = line.lastIndexOf('<i>');
				if (possiblestart > startpoint){
					quackline = quackline + line.slice(0,possiblestart+3);
					textline = line.slice(possiblestart+3, line.lastIndexOf('</i>'));}
				else {
					quackline = quackline + line.slice(0,startpoint+5);
					textline = line.slice(startpoint+5, line.lastIndexOf('</i>'));
					}
				endline = "</i>";
			}
			else {
				if (startpoint=line.indexOf('</b>:')==-1) {
					startpoint=line.indexOf(':</b>');
				}
				else {
					startpoint=line.indexOf('</b>:');
				}
				quackline = quackline + line.slice(0,startpoint+6);
				var templine = line.slice(startpoint+6, line.length);
				if (a.channel == 'pvp') {
					var endpoint;
					endpoint = templine.indexOf('</font>');
					textline = templine.slice(startpoint+6, endpoint);
					endline = templine.slice(endpoint, templine.length);
				}
				else {
					textline = line.slice(startpoint+6, line.length);
					//endline = "</p>";
				}
			}
			console.log("quackline=",quackline);
			console.log("textline=",textline);
			var link = '';
			var start=0;
			var end=0;
			if (textline.indexOf('<a') >= 0) {
				start = textline.indexOf('<a');
				end = textline.indexOf('/a>');
				var result;
				var textlink;
				if (result = /http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}/.exec(textline)) {
					console.log("regex match");
					textlink=result[0];
				}	
				link=textline.slice(start,end+3);
				startline2 = textline.slice(0,start)+ ' ';
				endline2 = textline.slice(end+3, textline.length);
				console.log("startline2=",startline2);
				console.log("endline2=",endline2);
				textline = startline2+"PLACEHOLDER"+endline2;
				console.log("link=",link);
				console.log("textline=",textline);
				//quackline = quackline + link+ ' '+textlink+' ';
				console.log("quackline=",quackline)
			}
			var totallength;	
			var words = textline.split(" ");
			for (var word in words) {
				console.log("word=",words[word]);
				if (words[word].slice(0,4)=="http") {
					quackline = quackline+words[word]+' ';
				}
				else {
					if (words[word]=="PLACEHOLDER") {
						quackline = quackline+link+' ';
					}
					else {
						var randomnumber=Math.floor(Math.random()*10);
						//ac_debug("randomnumber=",randomnumber);
						if (randomnumber<=6) {
							// QUACK
							anyquacks = 1;
							var initstring;
							var termstring;
							var thisword = words[word];
							var quacklit;
							firstletter = thisword.charAt(0);
							//ac_debug(first=",firstletter");
							lastletter= thisword.charAt(thisword.length-1);
							//ac_debug(last=",lastletter");

							if(/[^\w\s]/.test(firstletter)) { 
								//ac_debug("first punctuation");
								initstring=firstletter;
								thisword = thisword.slice(1);
								//ac_debug("new thisword=",thisword);
							}
							else initstring='';
							//console.log("initstring=",initstring);
							if(/[^\w\s]/.test(lastletter)) {
								//console.log("last punct.");
								termstring=lastletter;
								thisword = thisword.slice(0,thisword.length-2);
								//console.log("new thisword=",thisword);
							}
							else termstring='';
								//console.log("termstring=",termstring);
							if(thisword === thisword.toUpperCase()) quacklit='QUACK';
							else if (thisword[0] === thisword[0].toUpperCase()) quacklit='Quack';
							else quacklit='quack';

							quacklit = initstring+quacklit+termstring+' ';
							quackline = quackline + quacklit;
							console.log("quackline=",quackline);
						}
						else {
							quackline = quackline + words[word]+ ' ';
							console.log("quackline=",quackline);
						}
					}
				}
			}
		a.msg = quackline+endline;
		console.log("final line=",a.msg);
		}
	}
	old_fm(a);
}
