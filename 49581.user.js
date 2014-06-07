scr_meta=<><![CDATA[
// ==UserScript==
// @name			Vesti Tools
// @namespace		http://vestitools.pbworks.com/
// @description		Adds many helpful features to the vesti.  Quick post, autoWUL, autorefresh, WYSIWYG editor, etc.
// @include			http://boards.ign.com/
// @include			http://betaboards.ign.com/
// @include			http://forums.ign.com/
// @include			http://betaboards.ign.com/*
// @include			http://boards.ign.com/*
// @include			http://forums.ign.com/*
// @exclude			http://boards.ign.com/QuickPost/*
// @exclude			http://betaboards.ign.com/QuickPost/*
// @exclude			http://forums.ign.com/QuickPost/*
// @version			1.1.2	12/12/2009
// @copyright		2009+, Andrew Hurle
// ==/UserScript==
]]></>.toString();


try{

function vlog(t) { GM_log(t); }

function logError(n, e) {
	if(typeof n != "string") n = "General";
	vlog(n + " Error: " + e.message + ", " + e.name);
	}

/*
----------------------------------------------------
By installing and/or using this script, you, the
"user", agree to abide by the terms written below:

This script is provided for use by
any non-commercial or not-for-profit entity, or by
any individual.  Users are allowed to modify this
script in any way and redistribute it __freely__,
as long as credit is given to the original author(s)
and copyright holder(s) (listed above in metadata),
and the source code is made available alongside
any implementation of the script.  These terms
apply to any aforementioned modification or
redistribution of this script, and should be
presented alongside it.
Use, advertisement, or implementation of this
script into the website it affects (the IGN Board
system), or any other website, or any other medium,
by the website owners, administrators,
or parent/sibling/child companies of the aforementioned,
must be authorized by clear written permission from the
author, subject to any terms or conditions the author
decides upon.  This script is intended to be implemented
by the end user of the aforementioned website or medium.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

These terms are subject to change.

These terms do not apply to the "Another Auto Update Script"
code included with this script.

These terms do not apply to the performance profiling script
by Remy Sharp.
----------------------------------------------------
*/

//Sorry if it's hard to read, this was mostly written on a 1440x900 monitor



if(!GM_getValue("performanceProfiling", false)) GM_setValue("performanceProfiling", false);

//http://remysharp.com/2007/04/20/performance-profiling-javascript/

/*
@author: Remy Sharp / http://remysharp.com
@date: 2007-04-20
@name: time
@methods:
  start - start named timer
  stop - stop named timer
  event - hook predefined event
  func - hook existing function, or hook anonymous function (note refrence is passed back)
  report - output timings
*/

var useit = GM_getValue("performanceProfiling", false);

if (typeof window.time == 'undefined') {
  (function() {
    window.time = {
      // start + stop taken from firebuglite.js - http://getfirebug.com/firebuglite
      start: function(name) {
	  if(useit) {
        if (!name) {
          error('start: If starting a timer manually a name must be set');
        } else {
          timeMap[name] = (new Date()).getTime();
        }
		}
      },

      stop: function(name) {
	  if(useit) {
        if (name in timeMap) {
          var stop = (new Date()).getTime();
          var l = new Report(name, timeMap[name], stop);
          log.push(l);
          if (lineReport) lineReportMethod.call(this, l);
          delete timeMap[name];
        } else {
          error('stop:' + name + ' not found');
        }
		}
      },

      event: function(name, elm, type) {
	  if(useit) {
        if (typeof name != 'string') {
          // name has not been passed in
          type = elm;
          elm = name;
          name = '';
        }

        if (!elm.length) {
          elm = [elm];
        }

        if (type.indexOf('on') == -1) {
          type = 'on' + type;
        }

        var i = elm.length;
        var timerN = null;
        var c = null;
        while (i--) {
          timerN = name;
          if (!timerN) {
            timerN = elm[i].id || elm[i].getAttribute('class') || elm[i].getAttribute('className') || elm[i].tagName;
          }

          mapEvent(elm[i], type, timerN);
        }
		}
      },

      func: function(name, fn) {
	  if(useit) {
        if (typeof name == 'function') {
          fn = name;
        }

        // get function name as this browser may not support fn.name (IE + Safari + Opera)
        if (!fn.name && typeof fn == 'function') {
          var m = fn.toString().match(/function\s*(.*)\s*\(/);
          if (m[1]) {
            fn.name = m[1];
          }
        }

        if (typeof fn == 'function' && !fn.name) {
          // function is anonymous -
          // time function using var func = time.fn(function() { ...do stuff });
          if (typeof name != 'string') {
            anonFuncId++;
            name = 'anonymous' + anonFuncId;
          }

          return function() {
            time.start(name);
            var ret = fn.apply(window, arguments);
            time.stop(name);
            return ret;
          };
        } else {
          var fnName = fn.name || fn;
          if (typeof name != 'string') {
            name = fnName;
          }

          eval('var fnCopy = ' + fnName);
          if (typeof fnCopy == 'function') {
            var wrap = function() {
              time.start(name);
              var ret = fnCopy.apply(this, arguments);
              time.stop(name);
              return ret;
            };
            wrap.hooked = true;
            eval(fnName + ' = wrap;');
            return eval(fnName);
          } else {
            // error hooking
            error('func: Could not hook function (name: ' + name + ')');
          }
        }
		}
      },

      report: function(name) {
		if(useit){
        if (typeof name == 'undefined') {
          reportMethod.call(this, log);
        } else {
          var i = log.length;
          var l = [];
          while (i--) {
            if (name == log[i].name) {
              l.push(log[i]);
            }
          }
          reportMethod.call(this, l);
        }
		}
      },

      setReportMethod: function(fn) {
	  if(useit) {
        if (fn.hooked) {
          error('setReportMethod: Cannot use hooked method ' + fn.name);
        } else {
          reportMethod = fn;
        }
		}
      },

      setLineReportMethod: function(fn) {
	  if(useit) {
        if (fn.hooked) {
          error('setLineReportMethod: Cannot use hooked method ' + fn.name);
        } else {
          lineReportMethod = fn;
          lineReport = true;
        }
		}
      },

      errors: false
    };

    var timeMap = {};
    var log = [];
    var reportMethod = defaultReport;
    var lineReport = false;
    var lineReportMethod = defaultLineReport;
    var anonFuncId = 0;

    var Report = function(n, s, e) {
      this.name = n;
      this.start = s;
      this.stop = e;
      this.delta = e - s;
      // useful if I could grab the call - but can't see how due to anon functions (though I can see them in the start method)
    };

    Report.prototype.toString = function() {
      return this.name + ": " + this.delta + "ms";
    };

    function defaultReport(l) {
      alert(l.join("\n"));
    }

    function defaultLineReport(l) {
      alert(l);
    }

    function error(e) {
      if (time.errors) alert(e);
    }

    // required to create a brand new instance of our copied function
    function mapEvent(e, t, n) {
      var c = e[t];
      if (typeof c == 'function') {
        e[t] = function() {
            time.start(n + ':' + t);
            var ret = c.apply(this, arguments);
            time.stop(n + ':' + t);
            return ret;
        };
      } else {
        error('event: Function must be set on element.' + t + ' before hooking (name: ' + n + ')');
      }
    }
  })();
}

//End performance profiling code

time.start('overall');

vlog("active");

if(!GM_getValue("firstRun", false)) {

	GM_setValue("firstRun", true);
	alert("When using Vesti Tools, you should:\n\n1. Turn off IGN's quick reply for performance reasons\n2. Don't use my other autorefresher script at the same time\n3. Don't use IGNBQ, it and VT don't play nice\n4. Realize that the script takes a split-second to initialize after the page loads\n5. Check the user guide and bug reports before asking me anything\n6. If on Firefox 3.5, don't use bluetex anti page stretch or remove scrollbars from quotes\n\nPlease don't freak out if something doesn't work when you don't follow these instructions!");

	}



var EULAAgree = GM_getValue("EULAAgree", false);

if(!EULAAgree) {
vlog("EULA");
EULAAgree = confirm('By using this script (Scrolling Vesti Tools), you agree to abide by the rules set forth in the source code, which should have been or currently be available to you.  If you do not agree to these terms, the script will not execute, and you should uninstall the script to avoid seeing this dialog.');
GM_setValue("EULAAgree", EULAAgree);
}

if(EULAAgree) {

time.start('url');
//get the necessary info from the URL
var pageType = "", boardName = " ", boardNumber = "", topicNumber = "", replyNumber = "", replyNumberAbsolute = "", pageNumber = "", categoryName = "", categoryNumber = "", 
url = window.location.href, host = window.location.host, path = window.location.pathname, splitArray = url.split("/");

//http://boards.ign.com/Boards/Message.aspx?brd=5296&topic=182068352&page=1
if( url.indexOf("SendMessage.aspx")!=-1 ) {
	pageType = "sendPM";
	}
else if( url.indexOf("Message.aspx?")!=-1 ) {
	pageType = "topic";
	boardNumber = url.slice( url.indexOf("brd=")+4, url.indexOf("&") );
	if(url.indexOf("&page=1")!=-1) {
		topicNumber = url.slice( url.indexOf("topic=")+6, url.indexOf( "&", url.indexOf("topic=")+6 ) );
		pageNumber = url.substr( url.indexOf("page=")+5 );
		}
	else {
		topicNumber = url.substr(url.indexOf("topic=")+6);
		pageNumber = "1";
		}
	}
else if( url.indexOf("PrivateMessages")!=-1 ) {
	pageType = "privateMessages";
	}
else if( url.indexOf("/Search/")!=-1 ) {
	pageType = "search";
	}
else if( url.indexOf("/UserPages/")!=-1 ) {
	pageType = "userPages";
	}
else if( url.indexOf("/Help/")!=-1 ) {
	pageType = "help";
	}
else if( (url=="http://" + host + "/") || (url=="http://" + host + "/Boards/Default.aspx") ) {
	pageType = "boardCategoryList";
	}
else if(url=="http://" + host + "/Boards/NewBoards.aspx") {
	pageType = "newBoards";
	}
else if(url.indexOf("mods=yes")!=-1) {
	pageType = "modsOnline";
	}
else if(url.indexOf("http://" + host + "/Boards/UsersOnline.aspx") != -1) {
	pageType = "usersOnline";
	}
else if( (url.indexOf('Boards/Board.aspx?') != -1) || (url.indexOf("board.asp?") != -1) ) { //alternate board page
	pageType = "board";
	if((url.indexOf("brd=")!=-1) && (url.indexOf("page=")!=-1)) {
		boardNumber = url.slice(url.indexOf("brd=")+4, url.indexOf("&"));
		pageNumber = url.substr(url.indexOf("page=")+5);
		}
	else if(url.indexOf("brd=")!=-1) {
		boardNumber = url.substr(url.indexOf("brd=")+4);
		pageNumber = "1";
		}
	else {
		boardNumber = "0";
		pageNumber = "1";
		}
	}
else if( (path.indexOf("/b") != -1) && ( (splitArray[5]=="") || (splitArray[5].indexOf("p")!=-1) ) ) { //if there's a "/b" in there and a p or nothing after boardnumber
	pageType = "board";
	boardName = splitArray[3];
	boardNumber = splitArray[4].substr(1);
	if(splitArray[5]!=null) pageNumber = splitArray[5].substr(1);
	else pageNumber = "1";
	}

else if(url.indexOf("PostTopic.aspx")!=-1) {
	pageType = "postTopic";
	if(url.indexOf("brd=")!=-1) boardNumber = url.substr(url.indexOf("brd=")+4);
	}
else if(url.indexOf("PostReply.aspx")!=-1) {
	pageType = "postReply";
	if(url.indexOf("brd=")!=-1) boardNumber = url.substr(url.indexOf("brd=")+4);
	if(url.indexOf("topic=")!=-1) topicNumber = url.substr(url.indexOf("topic=")+6);
	}
else if(url.indexOf("PostEdit.aspx")!=-1) {
	pageType = "postEdit";
	if(url.indexOf("edit=")!=-1) replyNumber = url.substr(url.indexOf("edit=")+5);
	}
else if(url.indexOf("TopBoards.aspx")!=-1) {
	pageType = "topBoards";
	}
else if(url.indexOf("TopPosters.aspx")!=-1) {
	pageType = "topPosters";
	}
else if(url.indexOf("UsersNew.aspx")!=-1) {
	pageType = "newUsers";
	}
else if(url.indexOf("ActiveTopics.aspx")!=-1) {
	pageType = "activeTopics";
	if(url.indexOf("?")!=-1) pageNumber = url.substr(url.indexOf("?")+1);
	}
else if( (path.indexOf("/b") != -1) && (splitArray[5]!="") && (!isNaN(splitArray[5])) ) {
	pageType = "topic";
	boardName = splitArray[3];
	boardNumber = splitArray[4].substr(1);
	topicNumber = splitArray[5];
	if(splitArray[6]!=null) {
		if(splitArray[7]!=null) {
			pageNumber = splitArray[6].substr(1);
			replyNumber = splitArray[7].substr(1);
			}
		else if(splitArray[6].indexOf("p")!=-1) {
			pageNumber = splitArray[6].substr(1);
			}
		else if(splitArray[6].indexOf("?")!=-1) {
			replyNumber = splitArray[6].substr(1);
			}
		else if(splitArray[6].indexOf("r")!=-1) {
			replyNumberAbsolute = splitArray[6].substr(1);
			}
		}
	else pageNumber = "1";
	}
else if( url.indexOf("/c")!=-1 ) {
	pageType = "boardCategory";
	categoryName = splitArray[3];
	categoryNumber = url.substr( url.indexOf("/c")+2 );
	}
else {
	pageType = "unknown";
	vlog("unknown pageType");
	}
	
vlog("pageType:" + pageType);

time.stop('url');


var layout = {
			fresh: (document.getElementsByClassName("boards_profile_theme_grey_selected")[0] || document.getElementsByClassName("boards_profile_theme_white_selected")[0]) ? true : false,
			name: 	(document.getElementsByClassName("boards_profile_theme_grey_selected")[0]) ? "grey" : 
					(document.getElementsByClassName("boards_profile_theme_white_selected")[0]) ? "white" : "classic"
			};

	
//get the user's username
//good luck reading this code
var cook, ignlogin, username="unknown", uid=GM_getValue("uid", "");
if(cook = document.cookie) {
	if(ignlogin = cook.slice( cook.indexOf("ignlogin=")+9, cook.indexOf(";", cook.indexOf("ignlogin=")+9) )) {
		if(!(username = ignlogin.slice( ignlogin.lastIndexOf("\\", ignlogin.lastIndexOf("\\")-1)+1, ignlogin.lastIndexOf("\\") ))) {username = "unknown";}
		}
	}
	
if(username != "unknown" && username.search(/[\s!@#$%&*[()+={}|;:'"<,>?\/~`\\\^\]]/i) != -1) username = "error";
	
vlog("username: " + username);

function mouseEvent(parent, type) {
	var evt = parent.ownerDocument.createEvent('MouseEvents');
	evt.initMouseEvent(type, true, true, parent.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	return parent.dispatchEvent(evt);
	}

function click(parent) {
	return mouseEvent(parent, 'click');
	}
	
function change(parent) {
	return mouseEvent(parent, 'change');
	}
	
function mouseOver(parent) {
	return mouseEvent(parent, 'mouseover');
	}
	
function mouseOut(parent) {
	return mouseEvent(parent, 'mouseout');
	}
	
function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	
var startText, endText, beforeText, afterText, normalText, pretext = GM_getValue("pretext", "[before][quote=[author]][/before]\n[after][/quote]\n\n[cursor][/after]"), myStart, myEnd;

if(((myStart = pretext.indexOf("[start]"))!=-1) && ((myEnd = pretext.indexOf("[/start]"))!=-1)) startText = pretext.substring(myStart+7, myEnd);
else startText = "";
if(((myStart = pretext.indexOf("[end]"))!=-1) && ((myEnd = pretext.indexOf("[/end]"))!=-1)) endText = pretext.substring(myStart+5, myEnd);
else endText = "";
if(((myStart = pretext.indexOf("[before]"))!=-1) && ((myEnd = pretext.indexOf("[/before]"))!=-1)) beforeText = pretext.substring(myStart+8, myEnd);
else beforeText = "";
if(((myStart = pretext.indexOf("[after]"))!=-1) && ((myEnd = pretext.indexOf("[/after]"))!=-1)) afterText = pretext.substring(myStart+7, myEnd);
else afterText = "";

function moveCursor(myTextarea) {

	var myIndex;
	if(myTextarea.tagName=="TEXTAREA") {

		if((myIndex = myTextarea.value.indexOf("[cursor]"))!=-1) {
				myTextarea.value = myTextarea.value.replace(/\[cursor]/g, "");
				myTextarea.focus();
				myTextarea.selectionStart = myTextarea.selectionEnd = myIndex;
				}
				
			}
			
	else {
	
		//wysiwyg - this doesn't work right
		//user has to move cursor with arrow keys,
		//or else they will type at beginning of div
		var mySpan = myTextarea.getElementsByClassName("cursorSpan")[0];
		if(mySpan) {
			myTextarea.focus();
			var r1 = document.createRange();
			r1.setStartBefore(mySpan);
			r1.setEndBefore(mySpan);
			
			window.getSelection().addRange(r1);
			}
		
	
		}

	}
	
	
function dec2hex(dec) {
    var hex = parseInt(dec).toString(16);
    while(hex.length < 2) hex = "0" + hex;
    return hex;
	}
	
function rgb2hex(str) {
	var output = str;
	if(str.indexOf("rgb(") != -1 && str.indexOf(")") != -1) {
		str = str.substring(4, str.length - 1);
        var colors = str.split(",");
        output = "#" + dec2hex(colors[0]) + dec2hex(colors[1]) + dec2hex(colors[2]);
		}
	return output;
	}

	
function parseHTMLNode(node) {

	var color, bgcolor, b, i, u;
	
	//if it's got children, recurse on them
	for(var i=0; node.childNodes[i]; i++) parseHTMLNode(node.childNodes[i]);
	
	if(node.nodeType == 1) {
		
		var match;
		
		try {
			var innerText = node.textContent;
			var tag = node.tagName;
			}catch(e){}
			
		try {
			if(!node.style) node.style = []; //may not exist for some reason
			color = node.getAttribute('color');
			bgcolor = node.getAttribute('bgcolor');
			b = node.style.fontWeight == "bold";
			i = node.style.fontStyle == "italic";
			u = node.style.textDecoration == "underline";
			} catch(e){}
			
		if(color) innerText = "[color=" + color + "]" + innerText + "[/color]";
		else if(node.style.color) innerText = "[color=" + rgb2hex(node.style.color) + "]" + innerText + "[/color]";
		
		if(bgcolor) innerText = "[hl=" + bgcolor + "]" + innerText + "[/hl]";
		else if(node.style.backgroundColor) innerText = "[hl=" + rgb2hex(node.style.backgroundColor) + "]" + innerText + "[/hl]";
		
		if(b) innerText = "[b]" + innerText + "[/b]";
		if(i) innerText = "[i]" + innerText + "[/i]";
		if(u) innerText = "[u]" + innerText + "[/u]";
		
		switch(tag) {
		  case "B":
		  case "STRONG":
			if(!b) innerText = "[b]" + innerText + "[/b]";
			break;
		  case "I":
		  case "EM":
			if(!i) innerText = "[i]" + innerText + "[/i]";
			break;
		  case "U":
		  case "INS":
			if(!u) innerText = "[u]" + innerText + "[/u]";
			break;
		  case "A":
			if(node.href && node.href.indexOf("http") == 0 && innerText.indexOf("[image=") != 0 && innerText.indexOf("http://") != 0)
				innerText = "[link=" + node.href + "]" + innerText + "[/link]";
			break;
		  case "IMG":
			var src = node.getAttribute("src");
			if(src) {
			  var faceMatch;
			  if(node.className && node.className == "BoardFace" && (faceMatch = src.match(/^http:\/\/media\.ign\.com\/boardfaces\/(\d+|facetal)\.gif$/i)))
				innerText = "[face_" + findFaceName(faceMatch[1]) + "]";
			  else if(/^http:\/\/[^\s]*\.(?:jpe?g|gif|png|bmp)$/i.test(src))
				innerText = "[image=" + src + "]";
			  else innerText = "";
			}
			else innerText = "";
			break;
		  case "LI":
			innerText = "[li]" + innerText + "[/li]";
			break;
		  case "OL":
			innerText = "[ol]" + innerText + "[/ol]";
			break;
		  case "UL":
		  case "MENU":
		  case "DIR":
			innerText = "[ul]" + innerText + "[/ul]";
			break;
		  case "BLOCKQUOTE":
			try {
			  if(match = innerText.match(/^\[b\](\S*)\[\/b\] posted:\[hr\]([^]*)\[hr\]$/i))
				innerText = "[quote=" + match[1] + "]" + match[2] + "[/quote]";
			  else innerText = "[blockquote]" + innerText + "[/blockquote]";
			} catch(e) {}
			break;
		  case "HR":
			innerText = "[hr]";
			break;
		  case "BR":
			innerText = "_line_break_";
			break;
		  case "Q":
			innerText = "\"" + innerText + "\"";
			// fallthrough
		  case "ADDRESS":
			innerText = "_block_text_[i]" + innerText + "[/i]_block_text_";
			break;
		  case "H1":
		  case "H2":
		  case "H3":
		  case "H4":
		  case "H5":
		  case "H6":
			innerText = "_block_text_[b]" + innerText + "[/b]_block_text_";
			break;
		  case "DIV":
		  case "TABLE":
		  case "TR":
		  case "P":
		  case "PRE":
		  case "CENTER":
			innerText = "_block_text_" + innerText + "_block_text_";
			break;
		  case "INPUT":
		  case "TEXTAREA":
		  case "SELECT":
		  case "OPTION":
		  case "FRAME":
		  case "IFRAME":
		  case "MAP":
		  case "APPLET":
		  case "AREA":
		  case "BASE":
		  case "BASEFONT":
		  case "HEAD":
		  case "META":
		  case "SCRIPT":
		  case "STYLE":
		  case "TITLE":
		  case "NOEMBED":
		  case "PARAM":
			innerText = "";
			break;

		}
			
		
		node.textContent = innerText;
		
		}
		
	//remove comment nodes
	//not sure if they're included in textContent, but just in case
	else if(node.nodeType == 8) node.parentNode.removeChild(node);
		
	//if it's a text node, remove any stupid line breaks (usually caused by formatting in HTML code itself)
	else if(node.nodeType == 3) node.nodeValue = node.nodeValue.replace(/\n/g, "");
	
	}
	
function handleBlock(_match, $1, $2) {
	var check = ($1 && $2) ? '\n' : '';
	return $1 + check + $2;
	}
	
function parseHTML(input) {

	vlog("Parsing HTML");
	
	var temp = document.createDocumentFragment();
	
	//handle both HTML strings and plain old HTML elements
	if(typeof input == "string") {
		var node = document.createElement('div');
		node.innerHTML = input;
		temp.appendChild(node);
		}
	else if(typeof input == "object") {
		temp.appendChild(input.cloneNode(true));
		}
		
	temp = temp.firstChild;
	
	parseHTMLNode(temp);
	
	text = temp.textContent+'';
	
	text = text.replace(/<(\/)?\w+((\s+\w+(\s*=\s*(?:"(.|\n)*?"|'(.|\n)*?'|[^'">\s]+))?)+\s*|\s*)(\/)?>/gi,"") //HTML entities
			.replace(/<![^>]*>/gim, "") //HTML comments
			.replace(/[ \t]{2,}/g, ' ') //eat multiple spaces
			.replace(/^[ \t]+|[ \t]+$/gim,"") //leading and trailing whitespace, that m flag is important
			.replace(/_line_break_/g, '\n') //line breaks
			.replace(/(\S)?(?:_block_text_)+(\S)?/g, handleBlock); //block text
	
	vlog("HTML parsed");
	
	return "{parsed}" + text + "{/parsed}";

	}
	
function parseBoardCode(text) {
	
	vlog("Parsing BoardCode");
	
	//text = text.replace(/&/gi,"&amp;").replace(/&nbsp;/gi," ");
	text = text.replace(/>/gi,"&#62;").replace(/</gi,"&#60;")//HTML entities
				.replace(/\[link\=\b[^\]]*][\s]*(?=(\[image=.*]))/gi, "") //Remove any link surrounding an image
				.replace(/\[image\=(http:\/\/[^\s\]]*\.(?:jpe?g|gif|png|bmp))]( )?\[\/link\]/gi, "[image=$1]$2");
	
	var quoteOpenStart, quoteOpenEnd;
	while(((quoteOpenStart = text.indexOf('[quote='))!=-1) && ((quoteOpenEnd = text.indexOf(']', quoteOpenStart))!=-1)){
	
		var username = text.slice(quoteOpenStart+7, quoteOpenEnd);
		
		text = text.slice(0, quoteOpenStart) + "<blockquote><strong>" + username + '</strong> posted:<hr noshade="noshade">' + text.slice(quoteOpenEnd+1);
	
		}
		
	var linkOpenStart, linkOpenEnd;
	while(((linkOpenStart = text.indexOf('[link='))!=-1) && ((linkOpenEnd = text.indexOf(']', linkOpenStart))!=-1)){
	
		var href = text.slice(linkOpenStart+6, linkOpenEnd);

		text = text.slice(0, linkOpenStart) + '<a class="BoardRowBLink" target="boardLink" href="' + href + '">' + text.slice(linkOpenEnd+1);
	
		}
		
	
		
	var imageOpenStart, imageOpenEnd;
	while(((imageOpenStart = text.indexOf('[image='))!=-1) && ((imageOpenEnd = text.indexOf(']', imageOpenStart))!=-1)){
	
		var src = text.slice(imageOpenStart+7, imageOpenEnd);

		text = text.slice(0, imageOpenStart) + '<a class="BoardRowBLink" target="_blank" href="' + src + '"><img src="' + src + '" border="1" height="120" hspace="5" vspace="5" width="160"></a>' + text.slice(imageOpenEnd+1);
	
		}
		
	var colorOpenStart, colorOpenEnd;
	while(((colorOpenStart = text.indexOf('[color='))!=-1) && ((colorOpenEnd = text.indexOf(']', colorOpenStart+7))!=-1)){
		
		var color = text.slice(colorOpenStart+7, colorOpenEnd);
		
		if(color.indexOf("#")==-1) text = text.slice(0, colorOpenStart) + '<span style="color: ' + color + ';" class="BoardColorTag">' + text.slice(colorOpenEnd+1);
		else text = text.slice(0, colorOpenStart) + '<span style="color: rgb(' + hex2rgb(color) + ');" class="BoardColorTag">' + text.slice(colorOpenEnd+1);
	
		}
		
	var hlOpenStart, hlOpenEnd;
	while(((hlOpenStart = text.indexOf('[hl='))!=-1) && ((hlOpenEnd = text.indexOf(']', hlOpenStart+4))!=-1)){
		
		var hl = text.slice(hlOpenStart+4, hlOpenEnd);
		
		if(hl.indexOf("#")==-1) text = text.slice(0, hlOpenStart) + '<span style="background-color: ' + hl + ';" class="BoardHighlightTag">' + text.slice(hlOpenEnd+1);
		else text = text.slice(0, hlOpenStart) + '<span style="background-color: rgb(' + hex2rgb(hl) + ');" class="BoardHighlightTag">' + text.slice(hlOpenEnd+1);
	
		}
		
	
		
	var faceOpenStart, faceOpenEnd, myIndex=0;
	while(((faceOpenStart = text.indexOf('[face_', myIndex))!=-1) && ((faceOpenEnd = text.indexOf(']', faceOpenStart+6))!=-1)){
		
		myIndex = faceOpenEnd+1;
		
		var face = text.slice(faceOpenStart+6, faceOpenEnd);
		
		if(findFaceNumber(face)!=-1) text = text.slice(0, faceOpenStart) + '<img class="BoardFace" src="http://media.ign.com/boardfaces/' + findFaceNumber(face) + '.gif" alt="' + face + '" border="0" hspace="0" vspace="0">' + text.slice(faceOpenEnd+1);
	
		}
	
		
	text = text
	.replace(/\n/gi,"<br>") //line breaks
	.replace(/\[\/link]/gi,"</a>") //ending link tags	
	//These simple markup tags can easily be replaced here
	.replace(/\[((\/)?(ol|ul|li))\b[^>]*\]/gi,"<$1>") //list stuff

	.replace(/\[\/quote]/gi,'<hr noshade="noshade"></blockquote>') //ending quote tags
	.replace(/\[hr]/gi,'<hr size="2" noshade="noshade">') //horizontal rules
	.replace(/\[blockquote]/gi,'<blockquote class="BoardBlockquoteTag">') //regular blockquotes
	.replace(/\[\/blockquote]/gi,"</blockquote>") //make sure you interpret normal quotes before doing this

	.replace(/\[i]/gi,'<span style="font-style: italic;">') //italics
	.replace(/\[u]/gi,'<span style="text-decoration: underline;">') //underline
	.replace(/\[b]/gi,'<span style="font-weight: bold;">') //make sure you interpret normal quotes before doing this
	.replace(/\[\/(i|u|b|color|hl)]/gi,"</span>")

	.replace(/\[cursor]/gi,'<span class="cursorSpan"> </span>')

	.replace(/^[ \t]+|[ \t]+$/gim,"") //leading and trailing whitespace, that m flag is important
	.replace(/[ \t]{2,}/gi," "); //eat multiple spaces
	
	vlog("BoardCode parsed");
	
	return text;
	
	}
	
//returns base 10 integer when given base 16 character
function base16base10(_num) {

	_num = _num.toUpperCase();

	switch(_num) {
	
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		return parseInt(_num);
		
		case "A":
		return 10;
		case "B":
		return 11;
		case "C":
		return 12;
		case "D":
		return 13;
		case "E":
		return 14;
		case "F":
		return 15;
		
		default:
		return 0;
	
		}

	}
	
//returns formatted rgb color when given valid CSS hexadecimal string
function hex2rgb(_color) {

	_color = _color.replace("#","");
	var l = _color.length;
	if((l != 6) && (l != 3)) return "0, 0, 0";
	//expand 3 character colors
	if(l == 3) _color = _color[0] + _color[0] + _color[1] + _color[1] + _color[2] + _color[2];
	
	//split into pairs
	var _pairs = [], _rgb= [];
	_pairs[0] = _color.substring(0,2);
	_pairs[1] = _color.substring(2,4);
	_pairs[2] = _color.substring(4);
	
	//convert pairs to base 10
	for(var i=2; i >= 0; i--) {
		_rgb[i] = base16base10(_pairs[i][0]) * 16;
		_rgb[i]+= base16base10(_pairs[i][1]);
		}
		
	return _rgb[0] + ", " + _rgb[1] + ", " + _rgb[2];
	
	}
	
//returns the image number of a particular face string
//returns -1 if string is not a valid face
//I should probably use an array or something for these
function findFaceNumber(_face) {

	switch(_face) {
	
		case "happy":
		return 1;
		case "sad":
		return 2;
		case "wink":
		return 3;
		case "grin":
		return 4;
		case "batting":
		return 5;
		case "confused":
		return 6;
		case "love":
		return 7;
		case "blush":
		return 8;
		case "tongue":
		return 9;
		case "kiss":
		return 10;
		case "shock":
		return 11;
		case "angry":
		return 12;
		case "mischief":
		return 13;
		case "cool":
		return 14;
		case "worried":
		return 15;
		case "devil":
		return 16;
		case "cry":
		return 17;
		case "laugh":
		return 18;
		case "plain":
		return 19;
		case "raised_brow":
		return 20;
		case "angel":
		return 21;
		case "nerd":
		return 22;
		case "talk_hand":
		return 23;
		case "sleep":
		return 24;
		case "rolling_eyes":
		return 25;
		case "sick":
		return 26;
		case "shhh":
		return 27;
		case "not_talking":
		return 28;
		case "clown":
		return 29;
		case "silly":
		return 30;
		case "tired":
		return 31;
		case "drooling":
		return 32;
		case "thinking":
		return 33;
		case "doh!":
		return 34;
		case "applause":
		return 35;
		case "pig":
		return 36;
		case "cow":
		return 37;
		case "monkey":
		return 38;
		case "chicken":
		return 39;
		case "rose":
		return 40;
		case "good_luck":
		return 41;
		case "flag":
		return 42;
		case "pumpkin":
		return 43;
		case "coffee":
		return 44;
		case "idea":
		return 45;
		case "skull":
		return 46;
		case "alien_1":
		return 47;
		case "alien_2":
		return 48;
		case "frustrated":
		return 49;
		case "cowboy":
		return 50;
		case "praying":
		return 51;
		case "hypnotized":
		return 52;
		case "money_eyes":
		return 53;
		case "whistling":
		return 54;
		case "liarliar":
		return 55;
		case "beatup":
		return 56;
		case "peace":
		return 57;
		case "shame_on_you":
		return 58;
		case "dancing":
		return 59;
		case "hugs":
		return 60;
		case "tal":
		return "facetal";
		default:
		return -1;
	
		}

	}

	
function findFaceName(_face) {

	if(typeof _face != "number" && _face != "facetal") _face = parseInt(_face);

	switch(_face) {
	
		case 1:
		return "happy";
		case 2:
		return "sad";
		case 3:
		return "wink";
		case 4:
		return "grin";
		case 5:
		return "batting";
		case 6:
		return "confused";
		case 7:
		return "love";
		case 8:
		return "blush";
		case 9:
		return "tongue";
		case 10:
		return "kiss";
		case 11:
		return "shock";
		case 12:
		return "angry";
		case 13:
		return "mischief";
		case 14:
		return "cool";
		case 15:
		return "worried";
		case 16:
		return "devil";
		case 17:
		return "cry";
		case 18:
		return "laugh";
		case 19:
		return "plain";
		case 20:
		return "raised_brow";
		case 21:
		return "angel";
		case 22:
		return "nerd";
		case 23:
		return "talk_hand";
		case 24:
		return "sleep";
		case 25:
		return "rolling_eyes";
		case 26:
		return "sick";
		case 27:
		return "shhh";
		case 28:
		return "not_talking";
		case 29:
		return "clown";
		case 30:
		return "silly";
		case 31:
		return "tired";
		case 32:
		return "drooling";
		case 33:
		return "thinking";
		case 34:
		return "doh!";
		case 35:
		return "applause";
		case 36:
		return "pig";
		case 37:
		return "cow";
		case 38:
		return "monkey";
		case 39:
		return "chicken";
		case 40:
		return "rose";
		case 41:
		return "good_luck";
		case 42:
		return "flag";
		case 43:
		return "pumpkin";
		case 44:
		return "coffee";
		case 45:
		return "idea";
		case 46:
		return "skull";
		case 47:
		return "alien_1";
		case 48:
		return "alien_2";
		case 49:
		return "frustrated";
		case 50:
		return "cowboy";
		case 51:
		return "praying";
		case 52:
		return "hypnotized";
		case 53:
		return "money_eyes";
		case 54:
		return "whistling";
		case 55:
		return "liarliar";
		case 56:
		return "beatup";
		case 57:
		return "peace";
		case 58:
		return "shame_on_you";
		case 59:
		return "dancing";
		case 60:
		return "hugs";
		case "facetal":
		return "tal";
		
		default:
		return "unknown";
	
		}

	}
	
	

	
function debugString(string) {

	var debug = top.document.createElement("div");
	debug.id = "debug";
	debug.innerHTML = '<textarea value="' + string + '"></textarea>';
	top.document.body.appendChild(debug);

	}

if (top == window) { //do stuff when outside of frame
try{
if(1) { //This is here just so I can collapse this part

vlog("Initializing variables");

var listenerLog = "";

function logListener(text) { listenerLog += text + ", "; }
	
function deLogListener(text) { listenerLog = listenerLog.replace(text + ", ", ""); }
	
time.start('usercolors');
var usercolorStyle = GM_getValue("usercolorStyle", "");
//color, bgcolor, bordercolor, weight, style, decoration
var UCcolor = GM_getValue("UCcolor", "");
var UCbgcolor = GM_getValue("UCbgcolor", "");
var UCbordercolor = GM_getValue("UCbordercolor", "");
var UCweight = GM_getValue("UCweight", "normal");
var UCstyle = GM_getValue("UCstyle", "normal");
var UCdecoration = GM_getValue("UCdecoration", "none");


//apply usercolors
if(GM_getValue("applyUsercolors", true)) {

	var currentTime = Math.floor((new Date()).getTime() / 3600000);
	//Number of hours since January 1, 1970
	try {
	if(GM_getValue("lastUsercolorCheck", 0)==0) GM_setValue("lastUsercolorCheck", currentTime);
	} catch(e) { logError("Time", e); }

	if((usercolorStyle=="") || ((currentTime - GM_getValue("lastUsercolorCheck", 0)) >= 24)) {
		
		//update the usercolor style from derekdev
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://derekdev.com/mozilla/ignbq/colors.php',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/plain, text/css',
				},
			onload: function(details) {
				usercolorStyle = details.responseText.replace("-moz-outline: 2px outset black;", " ")
														.replace(/a\.AuthorLink/g, "a")
														.replace("domain(vnboards.ign.com)", "domain(vnboards.ign.com), domain(betaboards.ign.com), domain(forums.ign.com)");
				GM_setValue("usercolorStyle", usercolorStyle);
				GM_addStyle(usercolorStyle);
				currentTime = Math.floor((new Date()).getTime() / 3600000);
				GM_setValue("lastUsercolorCheck", currentTime);
				}
			});
		
		}
		
	else GM_addStyle(usercolorStyle);

	}
	
time.stop('usercolors');

var width = 603;

//make sure the position variables aren't some ridiculous value
//if they are, reset them
if(parseInt(GM_getValue("barx", "20")) > 2000) GM_setValue("barx", "20");

if(parseInt(GM_getValue("bary", "10")) > 2000) GM_setValue("bary", "10");
	
if(parseInt(GM_getValue("barxT", "20")) > 2000) GM_setValue("barxT", "20");

if(parseInt(GM_getValue("baryT", "10")) > 2000) GM_setValue("baryT", "10");

var barx = (pageType=="topic") ? GM_getValue("barxT", "20") : GM_getValue("barx", "20");
var bary = (pageType=="topic") ? GM_getValue("baryT", "10") : GM_getValue("bary", "10");

var useDropShadows = GM_getValue("useDropShadows", true);
var dropShadowIntensity = GM_getValue("dropShadowIntensity", "5");
var offsetx = parseInt(GM_getValue("offsetx", "4"));
var offsety = parseInt(GM_getValue("offsety", "4"));
var dropShadowBlur = parseInt(GM_getValue("dropShadowBlur", "2"));
var dropShadowSize = parseInt(GM_getValue("dropShadowSize", "-2"));

var dropShadowString = useDropShadows ? ("-moz-box-shadow: " + offsetx + "px " + offsety + "px " + dropShadowBlur + "px " + dropShadowSize + "px rgba(0,0,0," + dropShadowIntensity/10 + ");") : "";

var postTopicOn = postReplyOn = privateMessageOn = settingsOn = false;

var postTopicBeenOn = postReplyBeenOn = PMBeenOn = false;

var autorefreshInt = GM_getValue("autorefreshInt", 5000);
var autorefreshPMCountInt = GM_getValue("autorefreshPMCountInt", 3000);

var updateDays = parseInt(GM_getValue("updateDays", "2"));

var autoWUL = GM_getValue("autoWUL", true);

vlog("Variables initialized");

vlog("Initializing styles");

var minHeightFix = "";
if (pageType == "board") minHeightFix = '' +
						'#boards_board_list_header {' +
						'height: auto !important;' +
						'min-height: ' + window.getComputedStyle(document.getElementById("boards_board_list_header"),null).getPropertyValue("height") + ' !important;' +
						'}' +
						'#boards_board_list_footer {' +
						'height: auto !important;' +
						'min-height: ' + window.getComputedStyle(document.getElementById("boards_board_list_footer"),null).getPropertyValue("height") + ' !important;' +
						'}';
						
else if (pageType == "topic" && layout.fresh) minHeightFix = '' +
								'.boards_thread_links {' +
								'height: auto;' +
								'min-height: ' + window.getComputedStyle(document.getElementsByClassName("boards_thread_links")[0],null).getPropertyValue("height") + ' !important;' +
								'}';
								
var searchTweak = !GM_getValue("integrateTools", true) ? '' : '' +
'#boards_search_input {' +
'width: 307px !important;' +
'margin-top: 0px !important;' +
'margin-left: 12px !important;' +
'}' +
'#boards_search_container {' +
'background: #b3b1bf !important;' +
'border: 1px solid #65656d !important;' +
'width: 489px !important;' +
'height: 76px !important;' +
'}' +
'#boards_search_container h1 {' +
'padding-top: 4px !important;' +
'padding-left: 9px !important;' +
'padding-bottom: 7px !important;' +
'}' +
'#boards_search_submit {' +
'background: #b1b3bc url(http://media.ignimgs.com/boards/img/grey/google_search_bg.jpg) 79px 48px;' +
'width: 66px !important;' +
'}' +
'#wikiSearchButton {' +
'background: #fff url(http://media.ign.com/ign/imgs/bg_btn.gif) repeat-x scroll 0 bottom;' +
'border: 1px solid #99999b !important;' +
'border-left-width: 0px !important;' +
'font-weight: bold;' +
'color: #1046b1;' +
'font-size: 11px;' +
'padding-bottom: 3px !important;' +
'height: 36px !important;' +
'width: 80px !important;' +
'white-space: normal;' +
'cursor: pointer;' +
'}' +
'';

var externalStyle = '' +
//shadows
'body > .panel, #settingsBox, #status, .infoPanel {' +
dropShadowString +
'}' +

'.settingsButton, .regularButton {' +
'-moz-user-select: none;' +
'background-color: transparent;' +
'font: bold 10pt verdana,arial,sans-serif;' +
'color: #BBBBBB;' +
'text-decoration: none;' +
'cursor: pointer;' +
'}' +

'.nav-item.home img {' +
'margin-left: 3px !important;' +
'}' +
'.nav-item.home a:first-child img {' +
'margin-left: 0 !important;' +
'}' +
'.nav-item.home #postTopicButton,' +
'.nav-item.home #postReplyButton,' +
'.nav-item.home #privateMessageButton {' +
'height: 20px !important;' +
'}' +
'.nav-item.home #privateMessageButton {' +
'margin-bottom: 2px !important;' +
'}' +
'.nav-item.home .settingsButton {' +
'margin: 2px 0 4px 7px !important;' +
'}' +
'.nav-item.home .sub-bullets-head a {' +
'font-weight: bold !important;' +
'font-size: 12px !important;' +
'color: black !important;' +
'}' +

searchTweak +

'#boards_full_width,' +
'#boards_board_list_table {' +
'outline: 1px solid transparent;' +
'}' +

'#settingsBox {' +
'display: none;' +
'position: fixed;' +
'z-index: 100000;' +
'background-color: #999999;' +
'color: white;' +
'font-size: 11px;' +
'font-family: arial,sans-serif;' +
'-moz-user-select: -moz-none;' +
'cursor: default;' +
'border: 2px solid #CCCCCC;' +
'padding: 5px;' +
'padding-top: 1px;' +
'-moz-border-radius: 4px;' +
'}' +
'#settingsShade {' +
'width: 100%;' +
'height: 100%;' +
'background-color: black;' +
'opacity: 0.05;' +
'position: fixed;' +
'z-index: 99990;' +
'top: 0px;' +
'left: 0px;' +
'}' +
'#settingsBox input[type="checkbox"], .panel input[type="checkbox"] {' +
'margin: 3px 3px 3px 4px !important;' +
'}' +

'.closeButton, .minimizeButton, .restoreButton, .maximizeButton {' +
'float:right;' +
'cursor: pointer;' +
'margin: 1px;' +
'}' +

'.panel {' +
'background-color: #999999;' +
'text-align: left;' +
'color: white;' +
'font: 11px arial,sans-serif;' +
'padding: 0px;' +
'position: fixed;' +
'width: ' + (width+2) + 'px;' +
'left: ' + parseInt(barx) + 'px;' +
'bottom: ' + parseInt(bary) + 'px;' +
'border: 2px solid #cccccc;' +
'z-index: 99997;' +
'-moz-border-radius: 4px 4px 2px 2px;' +
'height: 312px;' +
'}' +
'span > .panel, td > .panel, div > .panel {' +
'background-color: #999999;' +
'text-align: left;' +
'color: white;' +
'font: 11px arial,sans-serif;' +
'padding: 0px;' +
'width: auto;' +
'clear: left;' +
'position: relative;' +
'bottom: 0;' +
'left: 0;' +
'margin: 3px 4px 0px 4px;' +
'border: 2px solid #cccccc;' +
'-moz-border-radius: 4px 4px 2px 2px;' +
'height: 312px;' +
'z-index: 1;' +
'}' +
'.panelInside {' +
'height: auto !important;' +
'width: auto !important;' +
'display: block !important;' +
'opacity: 1 !important;' +
'background: #dadbdf;' +
'border: 1px solid #66676b;' +
'}' +
'.panelInside .panel {' +
'min-width: 500px;' +
'}' +
minHeightFix +
'.infoPanel {' +
'background-color: #999999;' +
'text-align: left;' +
'color: white;' +
'font: 11px arial,sans-serif;' +
'padding: 2px;' +
'position: absolute;' +
'border: 2px solid #cccccc;' +
'-moz-border-radius: 4px 4px 4px 4px;' +
'z-index: 1;' +
'}' +
'.infoPanel td {' +
'padding-bottom: 2px;' +
'text-shadow: 0 0 2px black;' +
'}' +
'.infoPanel td:first-child {' +
'text-align: right;' +
'padding-right: 2px;' +
'}' +
'.infoPanel td:last-child {' +
'text-shadow: 0 0 1px black;' +
'}' +
'.infoPanel table {' +
'z-index: 1;' +
'position: relative;' +
'max-width: 200px;' +
'margin-right: 5px;' +
'border-spacing: 0;' +
'}' +
'.infoPanel .icon {' +
'position: absolute;' +
'right: 0;' +
'top: 35px;' +
'background: #b1b3bc;' +
'opacity: 0.25;' +
'-moz-box-shadow: 0 0 10px 5px #b1b3bc;' +
'z-index: 0;' +
'}' +
'.threadPreview {' +
'max-width: 700px;' +
'color: black;' +
'counter-reset: a;' +
'}' +
'.threadPreview .panelHeading {' +
'position: relative;' +
'height: 17px;' +
'}' +
'.threadPreview .panelHeading > a {' +
'position: absolute;' +
'top: -2px;' +
'}' +
'.threadPreview .panelHeading img {' +
'position: absolute;' +
'right: 0;' +
'top: 0;' +
'}' +
'.panelHeading .previewSubject {' +
'font-weight: normal;' +
'color: white;' +
'font-size: 11px;' +
'overflow: hidden;' +
'white-space: nowrap;' +
'margin: 0 25px 0 50px;' +
'padding-bottom: 1px;' +
'}' +
'.threadPreview .panelContent {' +
'overflow-y: auto;' +
'max-height: 300px;' +
'}' +
'.threadPreview .boards_pagination {' +
'position: absolute;' +
'top: 14px;' +
'margin-top: 3px;' +
'}' +
'.threadPreview .replyPreview:nth-child(2) {' +
'margin-top: 20px;' +
'}' +
'.threadPreview .boards_pagination a, .threadPreview .boards_pagination a:visited {' +
'padding:1px 5px !important;' +
'}' +
'.threadPreview .boards_pagination .disablelink, .threadPreview .boards_pagination .disablelink:hover {' +
'padding:1px 5px !important;' +
'}' +
'.previewTop {' +
'padding: 2px 4px;' +
'background: #b1b3bc;' +
'margin: 1px;' +
'}' +
'.previewTop .previewDate {' +
'float: right;' +
'}' +
'.previewTop:first-child:before {' +
'content: counter(a) " ";' +
'counter-increment: a;' +
'}' +
'.previewBottom {' +
'padding: 2px 4px;' +
'background: #c1c2c9;' +
'margin: 1px;' +
'}' +

'.panel .panelHeading {' +
'padding: 2px 5px 0px;' +
'-moz-user-select: -moz-none;' +
'}' +
'.infoPanel .panelHeading {' +
'text-align: center;' +
'color: #000099;' +
'font: bold 10pt verdana,arial,sans-serif;' +
'text-decoration: none;' +
'}' +
'.threadPreview .panelHeading a {' +
'margin: 1px 4px;' +
'background: none;' +
'text-decoration: none;' +
'color: blue;' +
'padding: 0;' +
'font-weight: bold;' +
'font-size: 10pt;' +
'}' +
'.threadPreview .panelHeading {' +
'text-align: left;' +
'-moz-user-select: -moz-none;' +
'}' +
'.panel .panelContent {' +
'text-align: center;' +
'position: absolute;' +
'top: 17px;' +
'bottom: 1px;' +
'left: 5px;' +
'right: 5px;' +
'}' +
'.infoPanel .in {' +
'padding-left: 10px;' +
'}' +
'.infoPanel .banned {' +
'color: red;' +
'font-weight: bold;' +
'}' +
'.infoPanel .insider {' +
'color: #99ef99;' +
'}' +
'.infoPanel .vip, .infoPanel .mod, .infoPanel .modType, .infoPanel .manager, .infoPanel .admin {' +
'color: #df9f33;' +
'}' +
'.infoPanel .bottomLinks {' +
'position: static;' +
'padding: 0 2px 2px;' +
'text-align: center;' +
'font-size: 9.333px;' +
'}' +
'.infoPanel .bottomLinks a {' +
'text-decoration: none;' +
'margin-top: 1px;' +
'}' +
'.panelContent > .top {' +
'position: absolute;' +
'top: 0px;' +
'left: 0px;' +
'right: 0px;' +
'}' +
'.panelContent > .middle {' +
'position: absolute;' +
'top: 39px;' +
'bottom: 26px;' +
'left: 0px;' +
'right: 0px;' +
'}' +
'.panelContent > .controls {' +
'position: absolute;' +
'bottom: 0px;' +
'width: 100%;' +
'}' +

'.panelContent input[type="text"], .panelContent textarea {' +
'font: 11px "Lucida Grande", Verdana, Arial, sans-serif;' +
'-moz-box-sizing: border-box;' +
'}' +
'.panelContent input[type="text"] {' +
'height: 19px;' +
'padding: 2px;' +
'}' +
'.panelContent .user, .panelContent .locked {' +
'display: none;' +
'}' +
'.pm .panelContent .user {' +
'display: inline;' +
'width: 165px;' +
'position: absolute;' +
'left: 0px;' +
'}' +
'.edit .panelContent .locked {' +
'display: inline;' +
'position: absolute;' +
'left: 0px;' +
'}' +
'.panelContent .body, #overlayContainer .body {' +
'height: 100% !important;' +
'width: 100% !important;' +
'-moz-box-sizing: border-box;' +
'}' +
'.panelContent .subject {' +
'width: 100%;' +
'}' +
'.panelContent .charsLeft {' +
'display: none;' +
'position: absolute;' +
'top: -14px;' +
'left: 100px;' +
'background-color: white;' +
'color: #333333;' +
'text-align: center;' +
'-moz-border-radius: 2px 2px 0px 0px;' +
'width: 97px;' +
'padding: 0px 2px 0px 1px;' +
'border: 1px solid #3d7bad;' +
'border-bottom: none !important;' +
'}' +
'.pm .panelContent .charsLeft {' +
'left: 200px !important;' +
'}' +
'.pm .panelContent .subjectContainer {' +
'margin-left: 170px;' +
'}' +
'.edit .panelContent .subjectContainer {' +
'margin-left: 24px;' +
'}' +
'.panelContent .info {' +
'width: 167px;' +
'height: 15px;' +
'position: absolute;' +
'bottom: 4px;' +
'left: 3px;' +
'color: #b1b3bc;' +
'text-align: left;' +
'font-size: 12px;' +
'}' +
'.panelContent .info .error {' +
'color: #aa2222;' +
'font-weight: bold;' +
'}' +
'.panelContent .info img {' +
'width: 12px;' +
'height: 12px;' +
'}' +
'.panelContent .eval[type="text"] {' +
'width: 20px;' +
'height: 14px;' +
'position: absolute;' +
'bottom: 4px;' +
'right: 3px;' +
'color: #b1b3bc;' +
'text-align: left;' +
'font-size: 12px;' +
'background-color: transparent;' +
'padding: 1px;' +
'border: none;' +
'-moz-box-sizing: content-box;' +
'}' +
'.panelContent .eval:focus {' +
'background-color: #777777;' +
'width: 50%;' +
'}' +
'#overlayContainer {' +
'position: relative;' +
'margin: 20px 0 0;' +
'}' +
'td > .controls {' +
'text-align: center;' +
'background-color: #b1b3bc;' +
'}' +

'.buttons, .facesContainer {' +
'position: absolute;' +
'top: -17px;' +
'}' +
'.buttons {' +
'z-index: 4;' +
'color: black;' +
'left: 0px;' +
'}' +
'.facesContainer {' +
'z-index: 3;' +
'right: 0px;' +
'}' +
'.wysiwyg {' +
'border: 1px solid #666666;' +
'background-color: #c1c2c9;' +
'width: 100%;' +
'height: 100%;' +
'-moz-box-sizing: border-box;' +
'text-align: left;' +
'color: black;' +
'font-family: verdana,arial,sans-serif;' +
'font-size: 10pt;' +
'padding: 3px;' +
'overflow-y: auto;' +
'white-space: pre-wrap;' +
'word-wrap: break-word;' +
'}' +
'.wysiwyg:focus {' +
'border: 1px dotted #666666;' +
'outline: 1px dotted #666666;' +
'}' +
'.wysiwygContainer {' +
'position: absolute;' +
'top: 1px;' +
'bottom: -1px;' +
'width: 100%;' +
'}' +
'.wysiwyg a {' +
'color:#000099;' +
'font-family:verdana,arial,sans-serif;' +
'font-size:10pt;' +
'font-weight:normal;' +
'text-decoration:none;' +
'}' +
'.wysiwyg img {' +
'width: 160px;' +
'height: 120px;' +
'border: none;' +
'margin: 5px;' +
'}' +
'.wysiwyg img.BoardFace {' +
'width: auto !important;' +
'height: auto !important;' +
'border: none !important;' +
'margin: 0px !important;' +
'}' +


'.buttons .wysiwygButton {' +
'padding: 2px 2px 1px 2px;' +
'margin-right: 2px;' +
'min-height: 13px;' +
'min-width: 8px;' +
'font-size: 10px;' +
'font-family: Arial, sans-serif;' +
'float: left;' +
'-moz-user-select: none;' +
'cursor: pointer;' +
'background-color: #c1c2c9;' +
'}' +
'#overlayContainer .buttons .wysiwygButton {' +
'background-color: #b1b3bc;' +
'}' +
'.buttons .boldButton {' +
'font-weight: bold;' +
'}' +
'.buttons .italicButton {' +
'font-style: italic;' +
'}' +
'.buttons .underlineButton {' +
'text-decoration: underline;' +
'}' +
'.buttons .linkButton {' +
'text-decoration: underline;' +
'color: blue;' +
'}' +
'.buttons .highlightButton {' +
'background-color: #ffffff;' +
'}' +
'.buttons .colorButton {' +
'color: #ffffff;' +
'}' +
'.buttons .wysiwygButton:hover {' +
'border: 1px outset black;' +
'padding: 2px 1px 1px 1px;' +
'}' +
'.faces {' +
'overflow: hidden;' +
'display: inline;' +
'height: 18px;' +
'float: right;' +
'-moz-user-select: none;' +
'margin-left: 249px;' +
'}' +
'.faces > img {' +
'cursor: pointer;' +
'}' +
'.faces > img:hover {' +
'opacity: 0.5;' +
'}' +
'.facesContainer:hover {' +
'z-index: 3;' +
'}' +
'.faces:hover {' +
'height: auto;' +
'z-index: 1000;' +
'outline: 1px solid #666666 !important;' +
'background-color: rgba(153, 153, 153, 0.75);' +
'}' +

'#debug {' +
'position: fixed;' +
'z-index: 1000000;' +
'right: 10px;' +
'top: 10px;' +
'width: 500px;' +
'height: 500px;' +
'}' +
'#debug textarea {' +
'width: 100%;' +
'height: 100%;' +
'}' +

'.hideReply, .showReply, .ignoreUser, .unIgnoreUser {' +
'cursor: pointer;' +
'}' +

'.hideReply, .showReply {' +
'margin-left: 20px;' +
'}' +
'.boards_thread_links a[href*="&action=update"] {' +
'margin-left: 20px;' +
'}' +

'.hiddenReply .boards_thread_user_profile_icon_80,' +
'.hiddenReply .boards_thread_user_profile_icon_120,' +
'div.hiddenReply .boards_thread_user_profile_stars,' +
'div.hiddenReply .boards_thread_post,' +
'tr.hiddenReply .BoardStarLink,' +
'tr.hiddenReply + tr > td {' +
'display: none;' +
'}' +
'tr.hiddenReply .boards_thread_user_profile_container {' +
'padding-bottom: 10px;' +
'}' +

'.newReply, .newReply > td.boards_thread_subject {' +
'background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAYAAABMDlehAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA3SURBVHjaYti7Z/0fJgYGhn8g4j+c9RdOgGV/g4ifIOI7nPgMJz6CiPcg4i2ceAEi7oEJgAADAI0wFWJ9ESNLAAAAAElFTkSuQmCC");' +
'background-repeat: repeat-x;' +
'background-position: top left;' +
'}' +
'.editedReply, .editedReply > td.boards_thread_subject {' +
'background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAYAAABMDlehAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA6SURBVHjaYli56/AfJgYGhn8g4j+c9RdOgGV/g4ifIOI7nPgMJz6CiHcg4iWIeAEinoCIZ2AxgAADAIuVFWW6S5l5AAAAAElFTkSuQmCC");' +
'background-repeat: repeat-x;' +
'background-position: top left;' +
'}' +

'#nav_channel .nav_btn a[href^="http://club.ign.com/"] {' +
'background-color: transparent !important;' +
'border: none !important;' +
'text-decoration: none !important;' +
'font-style: normal !important;' +
'font-weight: normal !important;' +
'color: white !important;' +
'}' +

'.colorSelector {' +
'position: absolute;' +
'z-index: 100001;' +
'background: #c1c2c9;' +
'}' +

'.colorSelector .valSat {' +
'width: 255px;' +
'height: 255px;' +
'background: #b1b3bc;' +
'float: left;' +
'}' +

'.colorSelector .hue {' +
'width: 30px;' +
'height: 255px;' +
'background: #cccccc;' +
'float: left;' +
'}' +

'.colorSelector {' +
'' +
'}' +

'.selectorBox {' +
'position: absolute;' +
'background: yellow;' +
'z-index: 1000;' +
'}' +

'#sbTop, #sbBottom {' +
'min-width: 1px;' +
'height: 2px !important;' +
'}' +

'#sbRight, #sbLeft {' +
'min-height: 1px;' +
'width: 2px !important;' +
'}' +

'#boards_user_private_messages > a {' +
'text-decoration: blink;' +
'color: yellow;' +
'}' +

'';

GM_addStyle(externalStyle);

vlog("Styles initialized");

//A bunch of base64 strings that hold icon image data

vlog("Initializing icons");

time.start('icons');

var closeIcon = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAT9JREFUeNqUkr1KxEAQx2eOiJfoWV8lJG9gdZ2FiooKXnMGIaJokyLvkldQFE4sTGPwA7XwEVKkTX05uV3JdflyJyGBeArewDI7/5kfycwO+r6fw5wmZVkGQRD8G1BVFaQ0TYFOt7sK0TSCrc11/Fn4+vaRd5Y70Outoed5eStJEqDDOANZluHp+b3xuxSTTnkyqq2h3Z0NZKwEH9yXAiRfAEL/4uMmFMdxIRzsbyOblKDrPpaAiDkLQdd1nPlSZf3+HkYRB0lqA3nOQzAMo+7zV2h4e58vEDDlQH6xvdIYygx0fXOXK4oME9HD53hUeIpJb0A0brpcXg0FoIimuWg6BNM08cQ4QopJpzxBVN+q3mlJJDgvAcuy6h7OTo+RdMpXUPG4tBWDwSH+tQUX5+UgbNvONU0DdBxn7t37FmAAgm/USO7yxi4AAAAASUVORK5CYII=';

var minimizeIcon = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJZJREFUeNpivHbt2n8GEgHLv3//GO7fv0+0BkVFRQaWv3//MoCwv78/IzGaLl269J/pz58/DCBMLACpJV/T79+/6WQTqZpYYJpmzJjxX1JKHqfi588eMmRkZDCCNYGCG2bTnz9/8doAAiD18Hj68eMHw4cPH3BqAqlB0QRKFeXl5QQjt62t7b+2tjYD4/r160lOewABBgCVdn3qJljUGQAAAABJRU5ErkJggg==';

var restoreIcon = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOBJREFUeNqUUisOhTAQ3L7gOAMJaG7AJZBcAMk5uA4GjUQgEQgQKBAESxB8+jJN2rQ8SB6bTLrd7uxs22VN03B6adZ5ntT3/d8Ez/PIOo6DgDAMmTyo6/pWHcWRa+37ToBu2C/LYsRs2yaZ+0gax5GiKFLqVVVxg7RtG5VlabTkOI6IBUHAZCHkGUpPLenqP+0BwzBQHMeqpaIoOHAlfnTS3d2maaK2bQVQUCjhCeHIVTfE5nmmJEmYHlP/BLiuS3me8yvxuhckTEXXdbcTsK6r8tM05b7vE8uy7PXsfQUYAKNR2bl1/Z05AAAAAElFTkSuQmCC';

var maximizeIcon = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNq8kjsKBCEQRHsGMy+hp/KinsIDmBiYzQ2M/PRSC4oD66ybbEHZCvVs0D6890w/SrTWKMa4DWitSdRaCcbhm3A5sqKUQt0ppSUgpRy5G3RdFxljjk+Qc4577sSSc6ZeV5pz59wJfoJunf4D4Qmx6XWlOTf+CVZKkbWWn8ABYSpCCFsT8YaYeWsaupB/CTAAPyfIqBCpA2MAAAAASUVORK5CYII=';

var settingsIcon = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe5JREFUeNosks1rE2EQxt992XyxSZoICYIJaAQxF8FWUggeWvUmgoh49VL8J4qnnou39uBBEHpQ8CpYVLCnHqTGFA/VgKzRaArN9ya7STbxN0sGnp2dZ96Zed7ZNSqVihLTWgd+Pp/Le8EwjPeEJrju+/6Z8HBqNpsFpFgCbJKI4l+TfIS/tGhyF7yEKxP+AbYhkyCvEXyVaa7rqlarpUajkQqHwyqVSjmJROIbE5Y5cwTWted5ajqdVinc6XQ6qlarKfyE+OdwOOzZtm01Go0SsYnM7xR7ejKZSNEFJuRJqmg0ekLyDski/kYkEnnXbrel0Rzu2Xg89jVaXzGy2u127+F9Om7S5ADe49CPfr+/EY/Hz3q9ngH/FKxpHiVwDii6unSqypYcxwnuR/w7Fov9wytU3afRvkbCKgVPgMMiYsgrw4lkZZqmsizrKj4vS4IbUmhr5JwSPOfw8WAw0NlsdiuXyz1gmsXWSoVC4QX3SYZCoV+cvQmWTdkedoVOF5Gh6vV6PpPJvCkWi6dIWmI5EVlWOp3+i/8i0k35wthD/HmmHVHsNpvNMh2zkuCex8lk8jJqVuFuQ30w5ffAdvGHdPmEfp9Dn2myQrxHkw3ueIu8SD4JJi1+ozb4KC+yAGwHPAbbwAVvFwjsvwADAIMfQkKXIm2VAAAAAElFTkSuQmCC';

var postReplyIcon = 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABD5JREFUeNqUVjtvJEUQrn7NzO2sbFg/5EOWCJATkksJkC5FQgLp0EkgIkIiS0YOCRAJfwKJX4BEQg4Rzg6RXswhnW5Pt15Pz6tnqK93enZ2d2xMW+XZme6ur+qrR7f44+rZtRAUEQn6P6NtWy8YdV2zVFQUBcR++slHj/iz++7Hb38+Pj16//Dk4K+nj778ENuCaBYzeRBFJCLq9NwbtGkacs6REMLrq8qMqqqs+cWwqGQaz6b7aRpHyUH3zXVCumlaco3mzVBSbfg99Cq8h+cKtKbKe+sIejILr0ssiVkaE+n3YFDj3Bm/M6tUdh47DQV+kp82e8OMyx2vvLBn7eA7PIVUZcHPlpROyNqMbm5uYPsEwC3/KjkEtrDUAQePhQ5KlFI03Tte2YNdHSBiV1UV1aImx56RwILGMyT4GwytXU42X9LL5T9UOKs+/+bpkyg2LcUtlaLkLYJ++OX7L5RRpdK6ihPzt/jt96s85TAArODNq3hRB1pTyR5Zm/tnVdXsbbPBhHNsgDSILT2P/qT0rZRMbNgRSTrSFCURGW28Ttc6kmxoopNWBwXbMQUL8LYsmSprOXa5/43vYQ324bdUvJZZSU8SSvcTpl164gT/F7phIzjTBPLIkJaaHugJ6WC9lGzJZL+n2merzJlGxYqY4pJB+O/09Hgn0VZG1pSWity8Zn2cpTzsw4WRJMnIiPbnh4WSqq2Piq8n0eSFDlbDO7t42ScXlKEu4e1isaAsy9jjkh6evE1aa2/okCUAq+qAk62CIwbzi/IVRVyphkOR2DSGzs8eP/mpK6d1LZoo7UtHSpSIZLCGYxQzmPPZi/VIRICHfAAw3iHGGP+Oubr0JUtKruaQpGH0MYaFSkWDKkamA8RwDFkkvDR908D6+Xw+WnoBWM84yaSiqEn8npBLPXCgOrt53XuBhaAWFC+vr3uqnTvswff29ka7WRhvkiklckJRuza4Bw6LAThJZ2t/4ZUquAtwqdSi62553zjg8RBkmHBhvJudkbDCr61ctQkc6AFw09QUDotQThDHiYP2CBmj+r/GbDa7nWpM2AxUyw2qLVNs7ZKbS0Z5Do+PenAovOsgGbK3Q/XQg3R6EMp49U0z1Xyo1E5y11FsVLxBNeJ+20iSZOM97Nuhenv4Q6FhS12XqTCwcfcGRlndBuzLL1C9Db4uje50ajZPJQAPs3rH8BF9t2b1KLAHHBqwDs1Q0fZA19s+y3eSKzSQsVuGb/accKsGo0YTZWwgDGiX4VDpmP1qC3h1xm57DIPBBEDR8vxtZUD1XSOEcBDfj8/Pz38dUM00842E+/poOUgpOtBoRW9t7+Ux1qA3dyfXBxcXF1fDec0HeXS9zBGVHeBwr1rRRb65hAvCWCVsA6MP8Nqzy8vL59vzSK7XAN++3q4vBaBa4TAX8LjImxRH5V2XUJZwDL3DoK/GFv0rwAAeA+YbsCBcFAAAAABJRU5ErkJggg==';

var postTopicIcon = 'iVBORw0KGgoAAAANSUhEUgAAAB0AAAAYCAYAAAAGXva8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0FJREFUeNqkVktrE1EU/iYzk0ybyWOSaKm22FqsCgXbjVAKLhUhQkTqStCVgrSFov4AXQgudCluBFF3Lg0iPtCNKwsiQkVqa6Wx0to8yNQmk8eM945z4zTNTMb2wGFe59zvnO+ce+ZyAESinel0ehkexTAMU3VdN69UOI7bYkPeGalUSiGPuqWmsWCz62x29AJcr9cb7+z+LBgLo2YBbgalRn6/HzzPox04A6vVaqaaz9UsJH4WdX6UfOPN75VKBY/vj1+NRqWZ5JlHL5i/j91QqswXPh80TfsvXS9+AypvEArmEeAXGtTDyGPvHvlG/77Is7lP16/ZU29ETw2plkolT7SybHU9CkmME5aKiHcsYn21h3zjEAt9RiQswieE81ot8JpWgC4h2DNlqiiKIyAVBvgPlLI0Cq36DgH/BhT5C0plP8JBlbZKYSlTTB5P3vzQEpRlm81mPWVJlfnRPigWh9DfvYCC2mcG0yEsY/7r4ulzF9MfrVLSqDlfc6Z0AVpXJ6WLs0ZjmfvwG5KQgRL8jqx6EJVaB8lawtLqIJSoPnL39rEBC5RzrGkwGHTt2kbnVjdQzt9DIhZAmNROCvAobNSxpg6b60SD81Aixp1dCRkzb1MFQQy/Gh57eLZlTd3oZWwwandH4kjEVdSNEDK/erGS68KB3jTJNI614n7Ew7MPREG6wAtSVBBlZVOmdlBZll0bidlR4cUhrBRlFNZ7zEACEsi2mUdEzuBn7gjGTry8nH5y6lZfn3xF8IdmHEGdhgN9T4HpAKH1pfdafcSkmuf/BiH6Vki3aORZZutUk+NP58j1EptKW7qXqhO9rbJmlDO6uxIaBJ4DL8ikxpq5w+xujpnGYjHPM9juRwMQ+CwZtIMoVbrJvdEAsktLUDozvYooipuGfUU/hB+5wyblTpOtJaiqqp5B6fSy/VG2dLlnUKcx6ESv2/ZyBbUPBydjN2Hd3Dwy22bqFl07YfVjtbUH3wwutJq92xH6X6WHALZ1rLXOe67pTsWi9uTExMTztjXdCb3Ujx1fiBydnJx872QrWJu3xpy2Sy/b36SmA1NTUwtutoI1pjQCViuXy/ifE2GLI2fX9PR0rp3tHwEGAOZWtVA/ZOxzAAAAAElFTkSuQmCC';

var privateMessageIcon = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAj5JREFUeNrEltFygjAUREECgr/Vhz70rd/Xb3D65pcpCALNSbNOxFhHi5qZGJBwd+/uTUg6jmPyyrZIXtxS2zM/pk/CHH0fGI39KWzPn5x4Z3tre288eL5er7+KonjLsiwZhuFxkqep6xYDFTZG8lvwD2NMDoE8/xUEIkyeRXdb7IvFwo1d17m4fd9/Gu8HDxoLnu/3ewe8XC4TyMy1SgTeNI0bbcLJ4XCojSYAygOyt8yS7XbrJkFijkZ8wCFSlqW7B+dIgBtl6z1KdrudIyFLblVD9iF527YuDvGIAx4YJwq4P4xxD1UsdV0jlbPkFhICJ2sIkHUY+4g3JaAJAuIlAoiEvLzmN3HkN+D6L1T4hIAkEXiwXFwdQIC6UCaXlipAyI1yXK9Wq2P8UJ2zGhCjMHuuCQK4JFVxysup7KwiOiRRTMU9nRe1IGQ5zQoSBGJkblgXamSOXaqlGPhU8agCsYLiBTIjc+4hQFdN6F0sCu2KKXVS9H9ZQMN//ARcm5MsYSRrSNAFpt0UEhCHSKwGzopwugK4Zi+AQFVVTlZtqczVuuZeS1RAzOUZJAAKlZCi0SKUbyoogWuHDOsiJB9rvEO8KYmr+4B2L9axlh1y37P9ajWgJPfhhy5KAP/IXODy/D+NGGQPCWJqeYpAGn6MkFyy8+Ilee8lITt07tDneASciiZ7WMq/2c5h/kurjxwq8J/xxyMyLQFnkgrwUSciMIhvMSvjz2a25rpvy+4dhljw0KO4X8ZWgc2PAAMAID1i+AqEft0AAAAASUVORK5CYII=';

var loadingIcon = 'R0lGODlhEAAQAPQAAJmZmcHCyZmZmbe4vausr7/Ax7q6wJ6en6amqb2+xK6usrCxtZycnaioq6Gho7W2u7KztwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==';

vlog("Icons initialized");

time.stop('icons');

}
	
function closePanels(exceptFor) {

	if(typeof exceptFor == "undefined") exceptFor = "none";
	
	if(postReplyOn && (exceptFor!="reply")) {
		postReplyOn = false;
		getTopPanel('reply').style.display = "none";
		}

	else if(postTopicOn && (exceptFor!="topic")) {
		postTopicOn = false;
		getTopPanel('topic').style.display = "none";
		}
		
	else if(privateMessageOn && (exceptFor!="pm")) {
		privateMessageOn = false;
		getTopPanel('pm').style.display = "none";
		}

	}
	
function autoFocus(panel) {

	var type = panel.className.split(' ')[1];
	var user = panel.getElementsByClassName('user')[0];
	var subject = panel.getElementsByClassName('subject')[0];
	var field = getField(panel);
	
	field.focus();
	if(subject.value=="") subject.focus();
	if((type=="pm") && (user.value=="")) user.focus();
	
	}
	
function resetSizeControls(panel) {

	var p = panel.getElementsByClassName('panelHeading')[0];
	
	p.lastChild.src = 'data:image/png;base64,' + minimizeIcon;
	p.lastChild.title = "Minimize";
	p.lastChild.className = "minimizeButton";
	p.childNodes[2].src = 'data:image/png;base64,' + maximizeIcon;
	p.childNodes[2].title = "Maximize";
	p.childNodes[2].className = "maximizeButton";
	
	panel.getElementsByClassName('panelContent')[0].style.display = "";

	}
	
function getTopPanel(name) {

	var panels = document.body.getElementsByClassName(name);
	return panels[panels.length - 1];

	}
	
function getField(panel) {

	var textarea = panel.getElementsByClassName('body')[0];
	var wysiwyg = panel.getElementsByClassName('wysiwyg')[0];
	
	return wysiwyg.parentNode.style.display=="none" ? textarea : wysiwyg;

	}
	
function bottomInWindow(el) {
	
	return (findPos(el)[1] + el.offsetHeight) < (window.pageYOffset + window.innerHeight);
	
	}
	
function topInWindow(el) {
	
	return findPos(el)[1] > window.pageYOffset;
	
	}
	
function scrollToPanel(panel) {

	var x = panel.offsetLeft - 10;
	var y = panel.offsetTop + panel.offsetHeight - window.innerHeight + 200;

	window.scrollTo(x, y);

	}
	
var panelList = [];
function getLastPanel() {
	
	if(panelList.length>0) {
	
		var thisPanel;
	
		for(var i = panelList.length; i >= 0; i--) {
		
			thisPanel = panelList[i];
		
			if(thisPanel!=null && thisPanel.style.display!="none" && thisPanel.getElementsByClassName('panelContent')[0].style.display!="none")
				return thisPanel;
		
			}
		
		}
		
	return null;
	
	}
	
function drawPanel(type, parent) {

	vlog("Drawing " + type + " panel");

	var title = getPanelStrings(type)[1];
	var button = getPanelStrings(type)[2];

	time.start('panelih')
	var panel = document.createElement("div");
	panel.innerHTML = '' +
	'<div class="panel ' + type + '">' +
		'<div class="panelHeading">' +
			title +
			'<img class="closeButton" src="data:image/png;base64,' + closeIcon + '" title="Close">' +
			'<img class="maximizeButton" src="data:image/png;base64,' + maximizeIcon + '" title="Maximize">' +
			'<img class="minimizeButton" src="data:image/png;base64,' + minimizeIcon + '" title="Minimize">' +
		'</div>' +
		'<div class="panelContent">' +
			'<div class="top">' +
				'<input class="locked" type="checkbox" title="Lock topic">' +
				'<input class="user" type="text" title="Username">' +
				'<div class="subjectContainer">' +
					'<input class="subject" type="text" maxlength="100" title="Subject"' +
					'onFocus="this.parentNode.lastChild.style.display = \'block\'; this.parentNode.lastChild.innerHTML = (this.maxLength - this.value.length) + \' Characters Left\'"' +
					'onBlur="this.parentNode.lastChild.style.display = \'none\'"' +
					'onKeydown="this.parentNode.lastChild.innerHTML = (this.maxLength - this.value.length) + \' Characters Left\'"' +
					'onKeyup="this.parentNode.lastChild.innerHTML = (this.maxLength - this.value.length) + \' Characters Left\'">' +
					'<div class="charsLeft">100 Characters Left</div>' +
				'</div>' +
			'</div>' +
			'<div class="middle"><textarea class="body" title="Message body"></textarea></div>' +
			'<div class="controls">' +
				'<input class="postButton" type="button" disabled="true" value="' + button + '">' +
				'<input class="wysiwygButton" type="button" value="WYSIWYG">' +
			'</div>' +
			'<div class="info">-</div>' +
			'<input type="text" class="eval">' +
			'<input type="hidden" class="eventValidation">' +
			'<input type="hidden" class="viewState">' +
			'<input type="hidden" class="num">' +
		'</div>' +
	'</div>';
	time.stop('panelih');
	
	
	
	time.start('wysiwyg');
	overlayWysiwyg(panel.getElementsByClassName('middle')[0]);
	if(type!="edit") {
		panel.getElementsByClassName('body')[0].value = startText + endText;
		panel.getElementsByClassName('wysiwyg')[0].innerHTML = parseBoardCode(startText + endText);
		}
	if(panel.getElementsByClassName('wysiwyg')[0].innerHTML=="") panel.getElementsByClassName('wysiwyg')[0].innerHTML = "<br>";
	time.stop('wysiwyg');
	time.start('append');
	parent.appendChild(panel.firstChild);
	time.stop('append');
	time.report();
	
	vlog("Topic panel drawn");

	}
	
	
function overlayWysiwyg(parent) {

	var masterString = '' +
	'<div class="buttons">' +
		'<div class="wysiwygButton boldButton">B</div>' +
		'<div class="wysiwygButton italicButton">I</div>' +
		'<div class="wysiwygButton underlineButton">U</div>' +
		'<div class="wysiwygButton linkButton">link</div>' +
		'<div class="wysiwygButton imageButton">img</div>' +
		'<div class="wysiwygButton bqButton">[bq]</div>' +
		'<div class="wysiwygButton hrButton">HR</div>' +
		'<div class="wysiwygButton highlightButton">hl</div>' +
		'<div class="wysiwygButton colorButton">cl</div>' +
		'<div class="wysiwygButton olButton">ol</div>' +
		'<div class="wysiwygButton ulButton">ul</div>' +
		'<div class="wysiwygButton quoteButton">quot</div>' +
		'<div class="wysiwygButton eraseButton">erase</div>' +
	'</div>' +
	'<div class="facesContainer"><div class="faces">';
	
	
	//rather than take up 60 lines with the faces, let's just generate a string with a loop
	time.start('faces');
	
	for(var i=60, faceName, s = ''; i>=1; i--) {
		faceName = findFaceName(i);
		s = '<img src="http://media.ign.com/boardfaces/' + i + '.gif" alt="' + faceName + '" title="' + faceName + '">' + s;
		}
		
	s += '<img src="http://media.ign.com/boardfaces/facetal.gif" alt="tal" title="tal">';
	
	masterString += s;
	time.stop('faces');
	
	var hide = GM_getValue("wysiwygDefault", true) ? "" : ' style="display: none;"';
	
	masterString += '</div></div>' +
	'<div class="wysiwygContainer"' + hide + '><div class="wysiwyg" contenteditable="true"><br></div></div>';

	time.start('appendw');
	parent.innerHTML += masterString;
	var wysiwyg = parent.getElementsByClassName('wysiwyg')[0];
	time.stop('appendw');

	}
	
var realPostButton, realPreviewButton, realRecentButton;
	
function overlayContainer(textarea) {

	var overlay = document.createElement('div');
	overlay.id = "overlayContainer";
	var parent = textarea.parentNode;
	textarea.className = "body";
	overlay.appendChild(textarea);
	parent.insertBefore(overlay, parent.firstChild);
	parent.innerHTML += '<div class="controls"><input type="button" value="Post" class="postButton"><input type="button" value="WYSIWYG" class="wysiwygButton"><input type="button" value="Preview" class="previewButton"><input type="button" value="Show Recent Replies" class="recentButton"></div>';
	
	realPostButton = document.getElementById('tblPostButtons').getElementsByTagName('input')[0];
	realPreviewButton = document.getElementById('tblPostButtons').getElementsByTagName('input')[1];
	realRecentButton = document.getElementById('tblPostButtons').getElementsByTagName('input')[3];
	
	realPostButton.parentNode.style.display = "none";
	
	function overlayHandler(e) {
	
		if((e.which==1) || (e.which==13)) {
	
			switch(e.target.className) {
			
				case "postButton":
					if(getField(e.target.parentNode.parentNode).tagName=="DIV") document.getElementsByTagName('textarea')[0].value = parseHTML(getField(e.target.parentNode.parentNode).innerHTML).replace(/({parsed}|{\/parsed})/g, "");
					click(realPostButton);
					break;
					
				case "previewButton":
					if(getField(e.target.parentNode.parentNode).tagName=="DIV") document.getElementsByTagName('textarea')[0].value = parseHTML(getField(e.target.parentNode.parentNode).innerHTML).replace(/({parsed}|{\/parsed})/g, "");
					click(realPreviewButton);
					break;
					
				case "recentButton":
					click(realRecentButton);
					break;
			
				}
			
			}
	
		}
	
	document.addEventListener('click', overlayHandler, true);
	document.addEventListener('keydown', overlayHandler, true);
	
	
	}
	
if((pageType=="postReply") || (pageType=="postTopic") || (pageType=="postEdit")) {

	if(GM_getValue("overlayWysiwyg", false)) {
		overlayContainer(document.getElementById("boards_webform_wrapper").getElementsByTagName('textarea')[0]);
		overlayWysiwyg(document.getElementById('overlayContainer'));
		
		if(pageType!="postEdit") {
			document.getElementsByClassName('body')[0].value = startText + endText;
			document.getElementsByClassName('wysiwyg')[0].innerHTML = parseBoardCode(startText + endText);
			}
		if(document.getElementsByClassName('wysiwyg')[0].innerHTML=="") document.getElementsByClassName('wysiwyg')[0].innerHTML = "<br>";
		
		document.addEventListener('focus', function(e) {

			if(e.target.className=="postButton") {
			
				if( ((pageType=="postTopic") || (pageType=="postReply") || (pageType=="postEdit")) && GM_getValue("autocensorPosts", true) ) {
					autoCensor(getField(e.target.parentNode.parentNode));
					}
				
				}

			}, true);
		
		}

	}
	
function wrapText(ta, tag, param) {

	if(param) {
		if(tag!="face") param = "=" + param;
		else param = "_" + param;
		}
	else param = "";

	var start = ta.selectionStart;
	var end = ta.selectionEnd;
	var scroll = ta.scrollTop;
	var isAtBottom = (scroll >= (ta.scrollHeight - ta.offsetHeight)) ? true : false;
	var inner = ta.value.slice(start, end);
	var before = ta.value.slice(0, start);
	var after = ta.value.substr(end);
	var startTag = "[" + tag + param + "]";
	var endTag = "";
	if((tag!="image") && (tag!="hr") && (tag!="face")) endTag = "[/" + tag + "]";
	var newStr = startTag + inner + endTag;
	
	ta.value = before + newStr + after;
	
	if(start!=end) {
		ta.selectionStart = start;
		ta.selectionEnd = start + newStr.length;
		}
	else ta.selectionStart = ta.selectionEnd = start + startTag.length;
	ta.scrollTop = (isAtBottom) ? ta.scrollHeight : scroll;
	
	ta.focus();

	}
	
function doFormat(format, field, e) {

	e.preventDefault();
	field.focus();

	if(field.tagName == "DIV") {
	
		switch(format) {
		
			case "Bold":
			case "Italic":		//fallthrough
			case "Underline":
			case "RemoveFormat":
			case "InsertOrderedList":
			case "InsertUnorderedList":
				document.execCommand(format, false, null);
				break;
			
			case "CreateLink":
				var linkHref = prompt("URL", "http://");
				if((linkHref!=null) && (linkHref!="")) document.execCommand("Createlink", false, linkHref);
				else if(linkHref=="") document.execCommand("Unlink", false, null);
				break;
			
			case "InsertImage":
				var imageSrc = prompt("SRC", "http://");
				if((imageSrc!="") && (imageSrc!=null)) document.execCommand("Insertimage", false, imageSrc);
				break;
				
			case "Blockquote":
				document.execCommand("FormatBlock", false, "<blockquote>");
				break;
			
			case "Quote":
				var username = prompt("Username", "");
				
				//I just love this part
				
				//get the range object
				var range = window.getSelection().getRangeAt(0);
				//range.extractContents gives us a document fragment.  We can't get the innerhtml of a frag, so lets make a container
				var middle = document.createElement('div');
				//append the selected fragment while simultaneously removing it from the editor
				middle.appendChild(range.extractContents());
				//get the html
				middle = middle.innerHTML;
				//and, finally, insert it formatted with the inserthtml command
				var exbr = "";
				if(middle=="") exbr = "<br>";
				document.execCommand("Inserthtml", false, "<br><blockquote><strong>" + username + '</strong> posted:<hr noshade="noshade">' + middle + exbr + '<hr noshade="noshade"></blockquote><br>');
				
				//field.innerHTML = field.innerHTML.substring(0, start) + "<br><blockquote><strong>" + username + '</strong> posted:<hr noshade="noshade">' + middle + '<br><hr noshade="noshade"></blockquote><br>' + field.innerHTML.substring(end, field.innerHTML.length);
				break;
			
			case "HorizontalRule":
				document.execCommand("Inserthtml", false, '<hr size="2" noshade="noshade">');
				break;
			
			case "HiliteColor":
				var highlight;
				if(e.type=="click") highlight = prompt("Color (any valid CSS color)", GM_getValue("lastHighlightWysiwyg", "black"));
				else highlight = GM_getValue("lastHighlightWysiwyg", "black");
				if((highlight!="") && (highlight!=null)) {
					document.execCommand("Hilitecolor", false, highlight);
					if(e.type=="click") GM_setValue("lastHighlightWysiwyg", highlight);
					}
				else if(highlight=="") document.execCommand("Hilitecolor", false, "transparent");
				break;
			
			case "ForeColor":
				var color;
				if(e.type=="click") color = prompt("Color (any valid CSS color)", GM_getValue("lastColorWysiwyg", "#C1C2C9"));
				else color = GM_getValue("lastColorWysiwyg", "#C1C2C9");
				if((color!="") && (color!=null)) {
					document.execCommand("Forecolor", false, color);
					if(e.type=="click") GM_setValue("lastColorWysiwyg", color);
					}
				else if(color=="") document.execCommand("Forecolor", false, "black");
				break;
				
			case "Face":
				var faceName;
				if(e.type=="keydown") faceName = prompt("Face Name", "mischief");
				else faceName = e.target.title;
				document.execCommand("Inserthtml", false, '<img title="' + faceName + '" class="BoardFace" src="http://media.ign.com/boardfaces/' + findFaceNumber(faceName) + '.gif" alt="' + faceName + '">');
				break;
		
			}
	
		}
		
	else if(field.tagName == "TEXTAREA") {
	
		switch(format) {
		
			case "Bold":
				wrapText(field, "b");
				break;
			case "Italic":
				wrapText(field, "i");
				break;
			case "Underline":
				wrapText(field, "u");
				break;
			case "RemoveFormat":
				break;
			
			case "CreateLink":
				var linkHref = prompt("URL", "http://");
				if((linkHref!=null) && (linkHref!="")) wrapText(field, "link", linkHref);
				else wrapText(field, "link", "");
				break;
			
			case "InsertImage":
				var imageSrc = prompt("SRC", "http://");
				if((imageSrc!="") && (imageSrc!=null)) wrapText(field, "image", imageSrc);
				else wrapText(field, "link", "");
				break;
				
			case "Blockquote":
				wrapText(field, "blockquote");
				break;
			
			case "Quote":
				var username = prompt("Username", "");
				wrapText(field, "quote", username)
				break;
				
			case "InsertOrderedList":
				wrapText(field, "ol");
				break;
				
			case "InsertUnorderedList":
				wrapText(field, "ul");
				break;
			
			case "HorizontalRule":
				wrapText(field, "hr");
				break;
			
			case "HiliteColor":
				var highlight;
				if(e.type=="click") highlight = prompt("Highlight (any valid CSS color)", GM_getValue("lastHighlightWysiwyg", "black"));
				else highlight = GM_getValue("lastHighlightWysiwyg", "black");
				if((highlight!="") && (highlight!=null)) {
					wrapText(field, "hl", highlight);
					if(e.type=="click") GM_setValue("lastHighlightWysiwyg", highlight);
					}
				else if(highlight=="") wrapText(field, "hl", "transparent");
				break;
			
			case "ForeColor":
				var color;
				if(e.type=="click") color = prompt("Color (any valid CSS color)", GM_getValue("lastColorWysiwyg", "#C1C2C9"));
				else color = GM_getValue("lastColorWysiwyg", "#C1C2C9");
				if((color!="") && (color!=null)) {
					wrapText(field, "color", color);
					if(e.type=="click") GM_setValue("lastColorWysiwyg", color);
					}
				else if(color=="") wrapText(field, "color", "black");
				break;
				
			case "Face":
				var faceName;
				if(e.type=="keydown") faceName = prompt("Face Name", "mischief");
				else faceName = e.target.title;
				wrapText(field, "face", faceName);
				break;
		
			}
	
		}
	
	field.focus();

	}
	
//b - bold
//i - italics
//u - underline
//L - link
//m - iMage
//q - quote
//r - horizontal Rule
//y - faces
//o - cOlor
//t - highlighT
	
function shortcutKeysW(e) {
	
	if((e.target.className=="wysiwyg") || (e.target.tagName=="TEXTAREA")) {
	
		var field = e.target;
	
		if(e.which == 9) {
			e.preventDefault();
			if(e.target.className=="wysiwyg") e.target.parentNode.parentNode.parentNode.getElementsByClassName("postButton")[0].focus();
			else e.target.parentNode.parentNode.getElementsByClassName("postButton")[0].focus();
			return;
			}

		if(e.ctrlKey) {
			switch(e.which) {
				case 66:
					doFormat("Bold", field, e);
					return;
					
				case 73:
					doFormat("Italic", field, e);
					return;
					
				case 85:
					doFormat("Underline", field, e);
					return;
					
				case 76:
					doFormat("CreateLink", field, e);
					return;
					
				case 77:
					doFormat("InsertImage", field, e);
					return;
					
				case 81:
					doFormat("Quote", field, e);
					return;
					
				case 82:
					doFormat("HorizontalRule", field, e);
					return;
					
				case 69:
					doFormat("RemoveFormat", field, e);
					return;
					
				case 89:
					doFormat("Face", field, e);
					return;
				
				case 87:
					e.preventDefault();
					if(e.target.className=="wysiwyg") hideWysiwyg(field.parentNode.parentNode);
					else showWysiwyg(field.parentNode);
					return;
					
				case 84:
					doFormat("HiliteColor", field, e);
					return;
					
				case 79:
					doFormat("ForeColor", field, e);
					return;
				}
			}
	
		}
		
		
	else if(e.target.parentNode.className=="buttons") {
	
		var field = getField(e.target.parentNode.parentNode);
	

		switch(e.target.className.split(' ')[1]) {
			case "boldButton":
				doFormat("Bold", field, e);
				return;
				
			case "italicButton":
				doFormat("Italic", field, e);
				return;
				
			case "underlineButton":
				doFormat("Underline", field, e);
				return;
				
			case "linkButton":
				doFormat("CreateLink", field, e);
				return;
				
			case "imageButton":
				doFormat("InsertImage", field, e);
				return;
				
			case "bqButton":
				doFormat("Blockquote", field, e);
				return;
				
			case "hrButton":
				doFormat("HorizontalRule", field, e);
				return;
				
			case "highlightButton":
				doFormat("HiliteColor", field, e);
				return;
				
			case "colorButton":
				doFormat("ForeColor", field, e);
				return;
				
			case "olButton":
				doFormat("InsertOrderedList", field, e);
				return;
				
			case "ulButton":
				doFormat("InsertUnorderedList", field, e);
				return;
				
			case "quoteButton":
				doFormat("Quote", field, e);
				return;
				
			case "eraseButton":
				doFormat("RemoveFormat", field, e);
				return;
			}
		
		}
		
	else if(e.target.parentNode.className=='faces') {
	
		var p = e.target.parentNode.parentNode.parentNode;
	
		if(e.target.tagName=="IMG") {
			doFormat("Face", getField(p), e);
			return;
			}
	
		}
		
	else if(e.target.className=="subject") {
	
		if(e.which==9) {
			getField(e.target.parentNode.parentNode.parentNode).focus();
			e.preventDefault();
			}
	
		}
		
	else if(e.target.className=="wysiwygButton") {
		
		if((e.which==1) || (e.which==13)) {
			var field = getField(e.target.parentNode.parentNode);
			
			if(field.tagName=="DIV") {
				hideWysiwyg(e.target.parentNode.parentNode);
				e.target.value = "WYSIWYG";
				}
			else {
				showWysiwyg(e.target.parentNode.parentNode);
				e.target.value = "Code";
				}
			}
		
		}
		
	else if(e.target.className=="eval" && e.which==13) {
		alert(eval(e.target.value));
		e.target.value = '';
		}
		
	else if(e.ctrlKey) {
	
		//backspace
		if(e.which==8) window.location.href = 'http://' + host + '/' + boardName + '/b' + boardNumber + '/p1';
	
		}
		
	
	}
	
	
function autoCensor(_textarea) {
	
	try {

	if(_textarea.tagName=="TEXTAREA") {
		var text = _textarea.value;
		}
	else if(_textarea.tagName=="DIV") {
		var text = _textarea.innerHTML;
		}

	if(GM_getValue("useAsterisks", false)) {
		
		text = text.replace(/(fuck|shit|cunt|gook|\bspic\b|\bkike\b)/gi,"****");
		text = text.replace(/(nigga|fagot)/gi,"*****");
		text = text.replace(/\bchinks\b/gi,"*****s");
		text = text.replace(/(\bspics\b|\bkikes\b)/gi,"****s");
		text = text.replace(/(nigger|faggot)/gi, "******");
		text = text.replace(/fag/gi, "***");
		if(GM_getValue("autocensorContextual", true)) {
			text = text.replace(/(you|you're an?|,) asshole/gi,"$1 *******");
			text = text.replace(/rape you/gi, "**** you");
			}
		
		}
	
	else {
		
		//basically just replace all the bad words
		//these regular expressions are probably not optimal
		
		text = text.replace(/fuck/gi,"funk");
		text = text.replace(/shit/gi,"shot");
		text = text.replace(/cunt/gi,"bunt");
		text = text.replace(/gook/gi,"geek");
		text = text.replace(/\bspic(s)?\b/gi,"spin$1");
		text = text.replace(/\bchink(s)?\b/gi,"chunk$1");
		text = text.replace(/\bkike(s)?\b/gi,"kite$1");
		text = text.replace(/nigg(er|a)/gi,"digg$1");
		text = text.replace(/faggot/gi,"fanbot");
		text = text.replace(/fagot/gi,"magot");
		text = text.replace(/fag/gi,"bag");
		if(GM_getValue("autocensorContextual", true)) {
			text = text.replace(/(you|you're an?|,) asshole/gi,"$1 asspole");
			text = text.replace(/rape you/gi,"tape you");
			}
		
		}
	
	if(_textarea.tagName=="TEXTAREA") _textarea.value = text;
	else if(_textarea.tagName=="DIV") _textarea.innerHTML = text;
		
	_textarea.scrollTop = _textarea.scrollHeight;
		
		}catch(e) { logError("Autocensor", e); }

	}
		
		
function hideWysiwyg(parent) {
	var wysiwyg = parent.getElementsByClassName('wysiwyg')[0];
	var textarea = parent.getElementsByTagName('textarea')[0];
	
	wysiwyg.parentNode.style.display = "none";
	textarea.value = parseHTML(wysiwyg.innerHTML).replace("{parsed}","").replace("{/parsed}","");
	textarea.focus();
	}
		
function showWysiwyg(parent) {
	var wysiwyg = parent.getElementsByClassName('wysiwyg')[0];
	var textarea = parent.getElementsByTagName('textarea')[0];

	wysiwyg.parentNode.style.display = "block";
	wysiwyg.innerHTML = parseBoardCode(textarea.value);
	wysiwyg.focus();
	}
		
document.addEventListener('keydown', shortcutKeysW, true);
document.addEventListener('click', function(e) { if(e.which==1)shortcutKeysW(e); }, true);
document.addEventListener('focus', function(e) {

	if(e.target.className=="postButton") {

		var type = e.target.parentNode.parentNode.parentNode.className.split(' ')[1];
	
		if( (((type=="topic") || (type=="reply") || (type=="edit")) && GM_getValue("autocensorPosts", true)) || ((type=="pm") && GM_getValue("autocensorPMs", false)) ) {
			autoCensor(getField(e.target.parentNode.parentNode.parentNode));
			}
		
		}

	}, true);
	



//gets the url for replying to a topic

function ReplyUrl() { return "http://boards.ign.com/PostForms/PostReply.aspx?brd=" + boardNumber + "&topic=" + topicNumber;	}

//Gets the url for posting a topic

function TopicUrl() { return "http://boards.ign.com/PostForms/PostTopic.aspx?brd=" + boardNumber; }


function applyPretext(author, text) {
	
	if(typeof author != "string") author = "someone";
	
	if(pretext!="") {
	
		//the start and end text will already be there, so [cursor]s will already be replaced
		var endTextPresent=false, myEndText = endText.replace(/\[cursor]/g, "");
		//get rid of end text if it's there and in the right place (right before quoted text)
		if( endTextPresent = (text.lastIndexOf(myEndText, text.lastIndexOf("{parsed}"))+myEndText.length==text.indexOf("{parsed}")) ) text = text.slice(0, text.lastIndexOf(myEndText, text.lastIndexOf("{parsed}"))) + text.slice(text.lastIndexOf("{parsed}"), text.lastIndexOf("{/parsed}")+9);
		//replace [author]s with author names
		var myBeforeText = beforeText.replace(/\[author]/g, author), myAfterText = afterText.replace(/\[author]/g, author);

		//find the quoted text
		var quoteStart = text.indexOf("{parsed}")+8, quoteEnd = text.indexOf("{/parsed}"), quotedText = text.slice(quoteStart, quoteEnd), length = text.length;

		//stick everything back together
		text = text.slice(0, quoteStart) + myBeforeText + quotedText + afterText + text.slice(quoteEnd, length);

		//get rid of the {parsed} tags
		text = text.replace("{parsed}", "");
		text = text.replace("{/parsed}", "");
		
		//add end text back in
		if(endTextPresent) text = text + myEndText;
		
		}
		
	else {

		//get rid of the {parsed} tags
		text = text.replace("{parsed}", "[quote=" + author + "]");
		text = text.replace("{/parsed}", "[/quote]\n\n");
	
		}
		
	return text;
	
	}

	
function postColors(_button, _color, _bgcolor, _bordercolor, _weight, _style, _decoration) {

	if(typeof _button != "boolean") button = false;
	
	if(_button) document.getElementById("postUsercolorsButton").value = "...";

	var _data = "username=" + username + "&color=" + _color + "&bgcolor=" + _bgcolor + "&bordercolor=" + _bordercolor + "&weight=" + _weight + "&style=" + _style + "&decoration=" + _decoration;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://derekdev.com/mozilla/ignbq/submitcolors.php",
		data: _data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
		onload: function(details) {
			if(_button) document.getElementById("postUsercolorsButton").value = "Done.";
			refreshColors(true);
			}
		});

		
	}
	
function refreshColors(button) {

	if(typeof button != "boolean") button = false;
	
	if(button) document.getElementById("refreshUsercolorsButton").value = "...";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://derekdev.com/mozilla/ignbq/colors.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain, text/css',
			},
		onload: function(details) {
			usercolorStyle = details.responseText.replace("-moz-outline: 2px outset black;", " ")
													.replace(/a\.AuthorLink/g, "a")
													.replace("domain(vnboards.ign.com)", "domain(vnboards.ign.com), domain(betaboards.ign.com), domain(forums.ign.com)");
			GM_setValue("usercolorStyle", usercolorStyle);
			if(GM_getValue("applyUsercolors", true)) {
				GM_addStyle(usercolorStyle);
				GM_setValue("lastUsercolorCheck", Math.floor((new Date()).getTime() / 3600000));
				}
			if(button) document.getElementById("refreshUsercolorsButton").value = "Done.";
			}
		});

	}
	

function drawInfoPanel(id, html, x, y) {

	id = id || "";
	html = html || "err";
	x |= 0;
	y |= 0;
	
	var existing;
	var panel = (existing = document.getElementById(id)) ? existing : document.createElement('div');
	panel.id = id;
	panel.className = "infoPanel";
	panel.style.cssText = 'left: ' + x + 'px; top: ' + y + 'px;';
	panel.innerHTML = html;
	document.body.appendChild(panel);
	
	return panel;

	}
	
//http://www.mredkj.com/javascript/nfbasic.html
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
	return x1 + x2;
	}

	
function getUserInfo(user, x, y, dump) {

	if(user) {
	
		x |= 0;
		y |= 0;
		dump |= false;
		
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://boards.ign.com/Services/UserServices.asmx/GetUserDetails?username=' + user + '&viewingusername=' + username,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml, text/html, text/plain',
			},
		onload: function(details) {
			
			var dt = details.responseText;
			var dx = details.responseXML = new DOMParser().parseFromString(dt, "text/xml");
			
			var monthName= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			
			var style = "";
			try {
				style = dx.getElementsByTagName('Style')[0].firstChild.nodeValue;
				} catch(e) {  }
			
			var html = '' +
			'<div class="panelHeading">' +
				'<span style="' + style + '">' + user + '</span>' +
				'<img class="closeButton" src="data:image/png;base64,' + closeIcon + '" title="Close">' +
			'</div>' +
			'<div class="panelContent">' +
			"<table>";
				
			try {
				html += '<tr><td>Title:</td><td>' + dx.getElementsByTagName('Title')[0].firstChild.nodeValue + '</td></tr>';
				} catch(e) {  }		
				
			html += '<tr><td>Posts:</td><td>';
			try {
				html += addCommas(dx.getElementsByTagName('VirtualPostTotal')[0].firstChild.nodeValue) + '</td></tr>';
				} catch(e) { html += "Error</td></tr>"; }		
			
			html += '<tr><td>WULs:</td><td>';
			try {
				html += addCommas(dx.getElementsByTagName('WatchedByCount')[0].firstChild.nodeValue) + '</td></tr>';
				} catch(e) { html += "Error</td></tr>"; }
				
			html += '<tr><td title="Date Registered">Reg:</td>';
			try { //god this looks terrible
				var time = dx.getElementsByTagName('DateAdded')[0].firstChild.nodeValue.split('T');
				var t2 = time[0].split('-');
				var t = time[1];
				html += '<td title="' + t + '">' + monthName[parseInt(t2[1].replace(/^0/, "")) - 1] + ' ' + t2[2].replace(/^0/, "") + ', ' + t2[0] + '</td></tr>';
				} catch(e) { html += "<td>Error</td></tr>"; }
					
			try {
				if(dx.getElementsByTagName('IsBanned')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="banned in">Banned</td></tr>';
				} catch(e) {  }
				
			try {
				if(dx.getElementsByTagName('IsAdministator')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="admin in">Admin</td></tr>';
				} catch(e) {  }
				
			try {
				if(dx.getElementsByTagName('IsManager')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="manager in">Manager</td></tr>';
				} catch(e) {  }
				
			try {
				if(dx.getElementsByTagName('IsModerator')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="mod in">Mod</td></tr>';
				else if(dx.getElementsByTagName('IsModType')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="modType in">ModType</td></tr>';
				//not sure what this means, but all mods seem to have it
				} catch(e) { alert(e.message); }
				
			try {
				if(dx.getElementsByTagName('IsVip')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="vip in">VIP</td></tr>';
				} catch(e) {  }
				
			try {
				if(dx.getElementsByTagName('IsSubscriber')[0].firstChild.nodeValue=="true") html += '<tr><td></td><td class="insider in">Insider</td></tr>';
				else html += '<tr><td></td><td class="outsider in">Outsider</td></tr>';
				} catch(e) {  }
				
			
			//all this seems good for is checking Homer's real post count
			html += '<tr><td title="Real Post Count">RPC:</td><td>';
			try {
				html += addCommas(dx.getElementsByTagName('PostsCount')[0].firstChild.nodeValue) + '</td></tr>';
				} catch(e) { html += "Error</td></tr>"; }
					
			html += '<tr><td>UID:</td><td>';
			var uid;
			try {
				uid = dx.getElementsByTagName('UserID')[0].firstChild.nodeValue;
				html += uid + '</td></tr>';
				} catch(e) { html += "Error</td></tr>"; }
				
			html += '<tr><td title="Last Login Date">Login:</td>';
			try {
				var time = dx.getElementsByTagName('LastLoginDate')[0].firstChild.nodeValue.split('T');
				var t2 = time[0].split('-');
				var t = time[1];
				html += '<td title="' + t + '">' + monthName[parseInt(t2[1].replace(/^0/, "")) - 1] + ' ' + t2[2].replace(/^0/, "") + ', ' + t2[0] + '</td></tr>';
				} catch(e) { html += "<td>Error</td></tr>"; }
				
			html += '<tr><td title="Last Post Date">Post:</td>';
			try {
				var time = dx.getElementsByTagName('LastPostDate')[0].firstChild.nodeValue.split('T');
				var t2 = time[0].split('-');
				var t = time[1];
				html += '<td title="' + t + '">' + monthName[parseInt(t2[1].replace(/^0/, "")) - 1] + ' ' + t2[2].replace(/^0/, "") + ', ' + t2[0] + '</td></tr>';
				} catch(e) { html += "<td>Error</td></tr>"; }
				
			html += '<tr><td title="Last Profile Update Date...or something...">Update:</td>';
			try {
				var time = dx.getElementsByTagName('DateUpdated')[0].firstChild.nodeValue.split('T');
				var t2 = time[0].split('-');
				var t = time[1];
				html += '<td title="' + t + '">' + monthName[parseInt(t2[1].replace(/^0/, "")) - 1] + ' ' + t2[2].replace(/^0/, "") + ', ' + t2[0] + '</td></tr>';
				} catch(e) { html += "<td>Error</td></tr>"; }
		
			
		
			html += '</table>' +
			'<div class="bottomLinks">' +
				'<a href="http://boards.ign.com/UserPages/WatchedUsers.aspx?usr=' + uid + '&action=update">WUL</a> | ' +
				'<a href="http://boards.ign.com/UserPages/WatchedUsers.aspx?usr=' + uid + '&action=remove">deWUL</a> | ' +
				//this is REALLY hacky, but it gets the job done
				'<a id="privateMessageButton" onclick="document.getElementsByClassName(\'pm\')[0].getElementsByClassName(\'user\')[0].value=\'' + user + '\'; return false;" href="http://boards.ign.com/PrivateMessages/SendMessage.aspx?usr=' + uid + '">PM</a> | ' +
				'<a href="http://boards.ign.com/UserPages/PostHistory.aspx?usr=' + uid + '">History</a>' +
			'</div>';
			
			try {
				var icon = dx.getElementsByTagName('Icon')[0];
				var url = icon.getElementsByTagName('ImageURL')[0].firstChild.nodeValue;
				var alt = icon.getElementsByTagName('Alias')[0].firstChild.nodeValue;
				var height = icon.getElementsByTagName('Height')[0].firstChild.nodeValue;
				var type = (height=="120") ? "MegIcon" : "TinIcon";
				html += '<div class="icon"><img src="' + url + '" alt="' + type + ' - ' + alt + '" title="' + type + ' - ' + alt + '"></div>';
				} catch(e) { html += '<div class="icon">No Icon</div>'; }
				
			html += '</div>';
			
			if(dump) drawInfoPanel((user + 'InfoPanel'), html, x, y);
			else vlog(html);
			
			}
			
		});
	
		}

	}
	
	
document.addEventListener('mousedown', function(e) {

	if(e.which==1) {
	
		if(e.altKey) {
		
			var evt = e.target;
			var targetLink;
		
			if((evt.tagName=="A" && (targetLink = evt).href.indexOf("http://club.ign.com/b/about?username=")!=-1) || 
				((evt.tagName=="B" && evt.parentNode.tagName=="A") && ((targetLink = evt.parentNode).href.indexOf("http://club.ign.com/b/about?username=")!=-1))) {
			
				e.preventDefault();
				
				var user = targetLink.href.split('=')[1];
				if(user.indexOf('&')!=-1) user = user.split('&')[0];
				var x = e.pageX;
				var y = e.pageY;
				
				drawInfoPanel((user + 'InfoPanel'), ('<img src="data:image/gif;base64,' + loadingIcon + '">'), x, y);
				getUserInfo(user, x, y, true);
			
				}
		
			}
	
		}

	}, true);
	
	
	
	
//objects inside objects omfg
	
function reply(it) {

	//innertext
	this.innerText = it;
	//really the innerHTML of the whole subject cell
	this.subject = null;
	//innerHTML of the message body
	this.body = null;
	//make a doc frag so we can easily append the reply to the table
	this.frag = document.createDocumentFragment();
	//make a temp div to hold all our crap
	//since it's harder to manipulate contents of a doc frag
	this.temp = document.createElement('div');
	
	this.smallTemp = document.createElement('div');
	var top = document.createElement('div');
	top.className = "previewTop";
	var bottom = top.cloneNode(true);
	bottom.className = "previewBottom";
	this.smallTemp.appendChild(top);
	this.smallTemp.appendChild(bottom);
	//need to add table tags so the rows and cells come out right
	if(layout.fresh) {
		this.temp.innerHTML = this.innerText;
		this.rows = null;
		
		this.subjectCell = document.createElement('div');
		this.subjectCell.innerHTML = '<div class="previewDate">' +
		this.temp.getElementsByClassName('boards_thread_date')[0].innerHTML +
		'</div>';
		this.subject = this.temp.getElementsByClassName('boards_thread_subject')[0].innerHTML;
		this.author = this.temp.getElementsByClassName('boards_thread_user_profile_info')[0].childNodes[1];
		this.bodyCell = this.temp.getElementsByClassName('boards_thread_post_wrapper')[0];
		this.edit = this.bodyCell.getElementsByClassName('boards_message_edited')[0];
		this.body = this.bodyCell.getElementsByClassName('boards_thread_post')[0].innerHTML;
		this.poll = this.bodyCell.getElementsByTagName('form')[0];
		}
	else {
		this.temp.innerHTML = '<table>' + this.innerText + '</table>';
		this.rows = this.temp.getElementsByTagName('tr');
		
		this.subjectCell = document.createElement('div');
		this.subjectCell.innerHTML = '<div class="previewDate"><b>' +
		this.rows[0].getElementsByClassName('boards_thread_subject')[0].getElementsByTagName('B')[0].innerHTML + '</b>' +
		this.rows[0].getElementsByClassName('boards_thread_subject')[0].getElementsByTagName('B')[0].nextSibling.nodeValue +
		'</div>';
		this.subject = this.rows[0].getElementsByClassName('boards_thread_subject')[0].lastChild.nodeValue;
		this.author = this.rows[0].getElementsByClassName('boards_thread_user_name_stars')[0].getElementsByTagName('a')[0];
		this.bodyCell = this.rows[1].getElementsByClassName('boards_thread_post_wrapper')[0];
		this.edit = this.bodyCell.getElementsByClassName('boards_message_edited')[0];
		this.body = this.bodyCell.innerHTML;
		this.poll = this.bodyCell.getElementsByTagName('form')[0];
		}
	
	this.smallTemp.firstChild.appendChild(this.author.cloneNode(true));
	for(var len = this.subjectCell.childNodes.length, i = 0; i < len; i++) {
		this.smallTemp.firstChild.appendChild(this.subjectCell.childNodes[i].cloneNode(true));
		}
	var smallBodyih = this.body.slice(0, this.body.lastIndexOf(layout.fresh ? '<br class="clear">' : '<p>'));
	var smallBody = document.createElement('div');
	smallBody.innerHTML = smallBodyih;
	this.smallTemp.lastChild.appendChild(smallBody);
	
	if(layout.fresh) {
		this.temp.getElementsByTagName('div')[0].className += " newReply";
		}
	else {
		this.rows[0].className += " newReply";
		this.rows[1].className += " newReply";
		this.rows[2].className += " newReply";
		}
	
	if(pageType=="topic") {
	
	if(ignoreLinks) {
		addIgnoreLinks(layout.fresh ? this.temp.getElementsByClassName("boards_thread_links")[0] : this.rows[2].getElementsByClassName("boards_thread_links")[0]);
		}
		
	if(WULLinks) {
		addWULLinks(layout.fresh ? this.temp.getElementsByClassName("boards_thread_row")[0] : this.rows[0]);
		}
		
	if(ignoreUsers) {
	
		if(list) {
		
			thisRow = layout.fresh ? this.temp.getElementsByClassName("boards_thread_row")[0] : this.rows[0];
			author = (layout.fresh) ? thisRow.getElementsByClassName("boards_thread_user_profile_info")[0].getElementsByTagName("a")[0] :
									thisRow.getElementsByClassName("boards_thread_user_name_stars")[0].getElementsByTagName("a")[0];
									
			if(author) author = author.innerHTML.replace(/(<b>|<\/b>)/gi, "");
			else author = "Anonymous";
			
			//see if the author is on the list
			for(j = list.length - 1; j >= 0; j--) {
				if(author == list[j]) {
					ignoreUser(thisRow);
					break;
					}
				}
				
			}
		}
		
		}
	
	if(layout.fresh) {
		this.frag.appendChild(this.temp.getElementsByTagName('div')[0].cloneNode(true));
		}
	else {
		//add stuff to the doc frag
		this.frag.appendChild(this.rows[0].cloneNode(true));
		//need to add in comment nodes since quick edit and reply assume that they're there
		this.frag.appendChild(document.createComment('vesti tools wuz here'));
		this.frag.appendChild(this.rows[1].cloneNode(true));
		this.frag.appendChild(document.createComment('vesti tools wuz here'));
		this.frag.appendChild(this.rows[2].cloneNode(true));
		}
	
	this.container = document.createElement('div');
	this.container.className = "replyPreview";
	this.container.appendChild(this.smallTemp.firstChild.cloneNode(true));
	this.container.appendChild(this.smallTemp.lastChild.cloneNode(true));
	
	
	//since we don't need the temp div anymore
	delete this.temp;
	delete this.smallTemp;

	}
	
function stringReplyObj(text) {

	var bfw;
	if(bfw = document.getElementById('boards_full_width')) {
		var clears = bfw.getElementsByClassName('clear');
		var rc = clears[clears.length-1];
		}

	//array that holds all the reply objects
	this.replies = [];
	
	var progress = 0, start = 0, end = 0;
	
	if((start = text.indexOf('id="boards_pagination_wrapper"')) != -1) {
		start = text.indexOf('>', start) + 1;
		end = text.indexOf('</select>', start);
		end = text.indexOf('</div>', text.indexOf('</div>', end)+6);
		
		var pagesih = text.slice(start, end);
		this.pages = document.createElement('div');
		this.pages.id = "boards_pagination_wrapper";
		this.pages.innerHTML = pagesih;
		}
	else this.pages = null;
	
	start = text.indexOf('<!-- THREAD ROW -->');
	end = text.lastIndexOf('<!-- /THREAD ROW -->')+20;
	
	var rt = text.slice(start, end);
	
	//populate the replies array
	while((start = rt.indexOf('<!-- THREAD ROW -->', progress)) != -1) {
	
		end = rt.indexOf('<!-- /THREAD ROW -->', start);
		
		this.replies.push(new reply(rt.slice(start, end)));
		
		progress = end;
	
		}
		
		
	this.update = function(parent) {
	
		var len = this.replies.length;
		//alert(len);
		//alert(parent.getElementsByClassName('boards_thread_row').length);
		
		if(this.pages) {
		
			if(document.getElementById('boards_pagination_wrapper')) {
				if(document.getElementById('boards_pagination_wrapper').innerHTML != this.pages.innerHTML) {
					document.getElementById('boards_pagination_wrapper').innerHTML = 
					document.getElementById('boards_bottom_pagination_wrapper').innerHTML = this.pages.innerHTML;
					}
				}
			else {
				bfw.insertBefore(this.pages.cloneNode(true), layout.fresh ? bfw.getElementsByClassName('boards_thread_row')[0] : bfw.getElementsByClassName('clear')[1]);
				this.pages.id = "boards_bottom_pagination_wrapper";
				bfw.parentNode.insertBefore(this.pages, bfw.nextSibling.nextSibling);
				}
			
			}
		
		var autorefreshEdits = GM_getValue("autorefreshEdits", true);
		var autorefreshPolls = GM_getValue("autorefreshPolls", true);
		
		var existingReplies = parent.getElementsByClassName('boards_thread_row');
		
		//loop through all the replies
		for(var i = 0; i < len; i++) {
		
			var tr = this.replies[i];
			var ex = existingReplies[i];
		
			//if this post is already here
			if(ex) {
				var currentEdit = layout.fresh ? ex.getElementsByClassName('boards_message_edited')[0] : ex.nextSibling.nextSibling.getElementsByClassName('boards_message_edited')[0];
				//if the subject area is different
				if(autorefreshEdits && tr.edit && (!currentEdit || (tr.edit.innerHTML != currentEdit.innerHTML))) {
					//change class names for stylesheet(s)
					ex.className += " editedReply";
					//update body
					(layout.fresh ? ex.getElementsByClassName('boards_thread_post')[0] : ex.nextSibling.nextSibling.getElementsByClassName('boards_thread_post_wrapper')[0]).innerHTML = tr.body;
					//update subject area
					ex.getElementsByClassName('boards_thread_subject')[0].innerHTML = layout.fresh ? tr.subject : tr.rows[0].getElementsByClassName('boards_thread_subject')[0].innerHTML;
					}
				var poll;
				//if it's the first post and there's a poll on the page
				if(autorefreshPolls && i==0 && (poll = (layout.fresh ? ex : ex.nextSibling.nextSibling).getElementsByTagName("form")[0])) {
					//if the poll is different, update it
					if(poll.innerHTML != tr.poll.innerHTML) poll.innerHTML = tr.poll.innerHTML;
					}
				}
			//otherwise, it's a new post
			else {
				//append the reply's fragment
				//for some reason the last span's index can change between threads, not sure what's doing it yet
				//parent.getElementById('aspnetForm').getElementsByTagName('span')[0].getElementsByTagName('span')[2].getElementsByTagName('tbody')[0].appendChild(tr.frag);
				layout.fresh ? bfw.insertBefore(tr.frag, rc) : existingReplies[0].parentNode.appendChild(tr.frag);
				}
		
			}
			
	
		}
	
	

	}
	
	
document.addEventListener('mousedown', function(e) {

	if(e.which==1 && e.altKey) {
	
		if(e.target.tagName=="A" && e.target.href.search(/http:\/\/(betaboards|boards|forums)\.ign\.com\/[a-z0-9_]+\/b[\d]+\/[\d]+/i)!=-1) {
		
			e.preventDefault();
			
			var thisPanel = drawInfoPanel(e.target.innerHTML, '<img src="data:image/gif;base64,' + loadingIcon + '">', e.pageX, e.pageY);
			
			GM_xmlhttpRequest({
				method:"GET",
				url:e.target.href,
				headers:{
				"User-Agent":"Mozilla/5.0",
				"Accept":"text/html, text/plain",
				},
				onload:function(details) {
			
					var dt = details.responseText;

					//make a new stringReplyObj out of the slice of text containing all the replies
					newReplies = new stringReplyObj(dt);
					
					thisPanel.innerHTML = '<div class="panelHeading">' +
					'<a href="' + e.target.href + '" onClick="return false">Reply</a>' +
					'<div class="previewSubject">' + newReplies.replies[0].subject + '</div>' +
					'<img class="closeButton" src="data:image/png;base64,' + closeIcon + '" title="Close">' +
					'</div><div class="panelContent"><div class="boards_pagination"></div></div>';
					thisPanel.className += " threadPreview";
					
					if(newReplies.pages) thisPanel.getElementsByClassName('boards_pagination')[0].innerHTML = (layout.fresh ? newReplies.pages.childNodes[1] : newReplies.pages.childNodes[1].getElementsByTagName('div')[0]).innerHTML;
					
					for(var len = newReplies.replies.length, i = 0; i < len; i++) {
						var thisReply = newReplies.replies[i].container;
						thisPanel.lastChild.appendChild(thisReply);
						}
					
					delete newReplies;

					}
				});
		
			}
	
		}
		

	}, true);
	
	
	//handles replying without entering and the thread preview reply button
	document.addEventListener('click', function (event) {
	
		if(event.which==1) {
    				
			if(event.target.className == "boards_board_list_row_icon" || event.target.parentNode.className == "boards_board_list_row_icon" || (event.target.tagName=="A" && event.target.innerHTML == "Reply" && event.target.parentNode.className == "panelHeading")) {
						
					var targetLink = (event.target.className == "boards_board_list_row_icon") ? 
										event.target.parentNode.getElementsByTagName("A")[0] :
										event.target.parentNode.parentNode.getElementsByTagName("A")[0];
						
					var splitArray2 = targetLink.href.split( '/' );
					var topicNumber2 = splitArray2[5];
					var subject;
					if(event.target.parentNode.className!="panelHeading") subject = targetLink.innerHTML;
					else subject = event.target.parentNode.getElementsByClassName("previewSubject")[0].innerHTML;
						
					closePanels("reply");
				
					postReplyOn = true;
					
					if(!postReplyBeenOn) {
						drawPanel('reply', document.body);
						postReplyBeenOn = true;
						}
						
					var targetPanel = getTopPanel('reply');
					targetPanel.style.cssText = "";
					resetSizeControls(targetPanel);
					targetPanel.getElementsByClassName("subject")[0].value = subject;
					targetPanel.getElementsByClassName('num')[0].value = topicNumber2;
						
					panelList.push(targetPanel);
					moveCursor(getField(targetPanel));
					autoFocus(targetPanel);
					getKey(targetPanel);
						
					}


				}

		}, true);
	
		logListener("document[click]{subjecticon}");
	

	
if(pageType=="topic" || pageType=="board") {
var inFocus = false;

if(GM_getValue("autorefreshPMCount", true) || GM_getValue("autorefresh", true)) {

	//basically just add a bunch of event listeners to see if window is focused or not
	window.addEventListener('blur', function(event) {
		inFocus = false;
		}, true);
		
	window.addEventListener('focus', function(event) {
		inFocus = true;
		if(pageType=="board" && GM_getValue("autorefresh", true)) refreshTopics();
		if(GM_getValue("autorefreshPMCount", true)) refreshPMCount();
		}, true);
		
	window.addEventListener('mouseover', function(event) {
		inFocus = true;
		}, true);
		
	window.addEventListener('mouseout', function(event) {
		inFocus = true;
		}, true);
		
	window.addEventListener('scroll', function(event) {
		inFocus = true;
		}, true);
		
		logListener("autorefreshFocusGroup");
		
	}


if(GM_getValue("autorefreshPMCount", true)) {

	
	//For some reason, the PM count is generated by some dynamic javascript at the bottom of the page
	//Luckily, I can just request the tiny bit of javascript instead of the whole page
	function getPMCount(content) {
	
		var x = content.indexOf('elPmCount.innerHTML = "'); //set x = position of that id
		if(x == -1) return "";

		x += 23;
		
		var y = content.indexOf('&', x); //find ampersand
		if(y == -1) y = content.indexOf('"', x);
		if(y == -1) y = content.indexOf(';', x);
		if(y == -1) y = content.length;    // If no ; then just grab everything till end

		return content.slice(x, y);
	
		}

	function PMCountRequest() {
		GM_xmlhttpRequest({
		  method:"GET",
		  url:"http://boards.ign.com/PrivateMessages/NewPMCount.aspx?caption=&rand=" + Math.floor(Math.random()*9999999999) + "&contenttype=javascript",
		  headers:{
			"User-Agent": navigator.userAgent,
			"Accept":"text/javascript, text/xml, text/plain,",
			},
		  onload:function(details) {
				vlog("PM Count refresh load");
				var PMArea = document.getElementById("boards_user_private_messages");
				var PMCount = getPMCount(details.responseText);
				if(PMCount) {
					if(!PMArea) {
						var masterString = '<div id="boards_user_private_messages_wrapper">' +
						'<a href="/PrivateMessages/">' +
							'<div id="boards_user_private_messages">' +
							'</div>' +
						'</a>' +
						'</div>';
						document.getElementById("boards_user_profile_container").innerHTML += masterString;
						PMArea = document.getElementById("boards_user_private_messages");
						}
					if(PMArea && PMArea.innerHTML!=PMCount && (PMArea.innerHTML != '<a>' + PMCount + '</a>')) {
						PMArea.innerHTML = PMCount;
						vlog("PM Count refreshed");
						}
					}
				delete this.onload;
			}
		});
		}
		
	function refreshPMCount(time) { if(inFocus) PMCountRequest(); }
		
	setInterval(refreshPMCount, autorefreshPMCountInt);
		
	}
	
	

}
	
	

if(pageType=="topic") { //Do stuff when in a topic

time.start('topic');
vlog("In topic");

var replyHijacking = GM_getValue("replyHijacking", true);
var topicHijacking = GM_getValue("topicHijacking", true);
var quoteHijacking = GM_getValue("quoteHijacking", true);
var PMHijacking = GM_getValue("PMHijacking", true);
var editHijacking = GM_getValue("editHijacking", true);


function addIgnoreLinks(thisParent) {
	
	var temp = document.createDocumentFragment();
	var link = document.createElement("a");
	link.className = "hideReply";
	link.innerHTML = layout.fresh ? "Hide" : "Hide Reply";
	temp.appendChild(link);
	var separator = document.createTextNode(" | ");
	temp.appendChild(separator);
	link = document.createElement("a");
	link.className = "ignoreUser";
	link.innerHTML = layout.fresh ? "Ignore" : "Ignore User";
	temp.appendChild(link);
	layout.fresh ? thisParent.appendChild(temp) : thisParent.insertBefore(temp, thisParent.getElementsByClassName("boards_quick_post_inline")[0]);
	
	}

//disable default post reply and quote reply link actions (for link hijacking)

time.start('linkHijacking');

var allReplies = document.getElementsByClassName("boards_thread_row");

if(GM_getValue("ignoreLinks", true)) {

	var i = allReplies.length - 1;
	if(i!=-1) {
		
		do{
		var thisParent = layout.fresh ? allReplies[i].getElementsByClassName("boards_thread_links")[0] : allReplies[i].nextSibling.nextSibling.nextSibling.nextSibling.getElementsByClassName("boards_thread_links")[0];
		addIgnoreLinks(thisParent);
		} while(i--);
		
		}

	vlog("Show/hide buttons done");
	}
	



function getAuthor(target) {
	
	var author = (layout.fresh) ? target.parentNode.parentNode.parentNode.parentNode
															.getElementsByClassName("boards_thread_user_profile_info")[0]
															.getElementsByTagName("a")[0] :
															target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling
															.getElementsByClassName("boards_thread_user_name_stars")[0]
															.getElementsByTagName("a")[0];
															
	if(author) author = author.innerHTML.replace(/(<b>|<\/b>)/gi, "");
	else author = "Anonymous";
	
	return author;
	
	}
	

function getPostContent(target) {

	var textcontent = (layout.fresh) ? target.parentNode.previousSibling.previousSibling.innerHTML :
										target.parentNode.parentNode.previousSibling.previousSibling.getElementsByClassName("boards_thread_post_wrapper")[0].innerHTML;
															
	var endtc = textcontent.indexOf('<div class="boards_message_edited">'); //stop at edit info if there
	if(endtc == -1) endtc = (target.parentNode.tagName == "DIV") ? textcontent.indexOf('<br class="clear">') :
																textcontent.indexOf('<p>'); //otherwise stop before the clearing line break/p
	if(endtc == -1) endtc = textcontent.length;
	var starttc = textcontent.indexOf('<!-- MESSAGE BODY -->') + 21;
	if(starttc < 21) starttc = 0;
	
	return textcontent.slice(starttc, endtc);

	}
	
	
function getSubject(target) {

	return (layout.fresh) ? target.parentNode.parentNode.parentNode.getElementsByClassName('boards_thread_subject')[0].innerHTML :
												target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling
												.getElementsByClassName("boards_thread_subject")[0].lastChild.nodeValue.substr(1);
																
	}


if(replyHijacking || quoteHijacking || PMHijacking || editHijacking) {

document.addEventListener ('click', function(event) {

	if(event.which==1 && event.target.tagName=="A") {

	var evt = event.target;

	var targetPanel = null, existingPanel = null;
	
	if(replyHijacking) {

	//check if you clicked a post reply link; if so, hijack it			
	if(evt.innerHTML == "Reply" && evt.parentNode.className == "boards_thread_links") {
		
		event.preventDefault();
		
		if(GM_getValue("replyIntegration", true)) {
		
			if(!(existingPanel = document.getElementById("boards_full_width").getElementsByClassName('reply')[0])) {
				drawPanel('reply', evt.parentNode);
				targetPanel = evt.parentNode.getElementsByClassName('reply')[0];
				targetPanel.getElementsByClassName('num')[0].value = topicNumber;
				targetPanel.getElementsByClassName('subject')[0].value = document.title.slice(0, document.title.lastIndexOf('-')-1);
				}
			else {
				evt.parentNode.appendChild(existingPanel);
				targetPanel = evt.parentNode.getElementsByClassName('reply')[0];
				}
			
			}
			
		else {
		
			closePanels("reply");
				
			postReplyOn = true;
			
			if(!postReplyBeenOn) {
				drawPanel('reply', document.body);
				targetPanel = getTopPanel('reply');
				targetPanel.getElementsByClassName("subject")[0].value = document.title.slice(0, document.title.lastIndexOf('-')-1);
				targetPanel.getElementsByClassName('num')[0].value = topicNumber;
				postReplyBeenOn = true;
				}
			else {
				targetPanel = getTopPanel('reply');
				}
		
			}
		
		resetSizeControls(targetPanel);
		panelList.push(targetPanel);
		targetPanel.style.cssText = "";
		if(GM_getValue("replyIntegration", true)) scrollToPanel(targetPanel);
		moveCursor(getField(targetPanel));
		autoFocus(targetPanel);
		
		
		getKey(targetPanel);
			
		}
		
		
	}

	if(quoteHijacking) {
	
	//check if you clicked a quote reply link; if so, hijack it

    				
		if(evt.innerHTML == "Quote") {
		
			event.preventDefault();
		
			var author = getAuthor(evt), textcontent = getPostContent(evt);
			
			targetPanel = getLastPanel();
			
			var replyIntegration = GM_getValue("replyIntegration", true);
			
			if(!targetPanel) {
				
				var targetParent = (replyIntegration) ? evt.parentNode : document.body;
			
				if(!(existingPanel = document.getElementById("boards_full_width").getElementsByClassName('reply')[0])) {
					drawPanel('reply', targetParent);
					targetPanel = (replyIntegration) ? evt.parentNode.getElementsByClassName('reply')[0] : getTopPanel('reply');
					if(!replyIntegration) { closePanels('reply'); postReplyOn = postReplyBeenOn = true; }
					targetPanel.getElementsByClassName('num')[0].value = topicNumber;
					targetPanel.getElementsByClassName('subject')[0].value = document.title.slice(0, document.title.lastIndexOf('-')-1);
					getKey(targetPanel);
					panelList.push(targetPanel);
					}
				else {
					if(replyIntegration) evt.parentNode.appendChild(existingPanel);
					else { closePanels('reply'); postReplyOn = postReplyBeenOn = true; }
					targetPanel = (replyIntegration) ? evt.parentNode.getElementsByClassName('reply')[0] : getTopPanel('reply');
					targetPanel.style.cssText = "";
					resetSizeControls(targetPanel);
					}
			
				}
				
			else if(GM_getValue("panelFollow", true)) {
			
				if(window.getComputedStyle(targetPanel, null).position != "fixed") evt.parentNode.appendChild(targetPanel);
			
				}
				
			if(window.getComputedStyle(targetPanel, null).position != "fixed") scrollToPanel(targetPanel);
			autoFocus(targetPanel);
				
			var field = getField(targetPanel);
			
			if(field.tagName=="TEXTAREA") {
				field.value = applyPretext(author, field.value + parseHTML(textcontent));
				}
			else {
				var value = field.innerHTML;
				field.innerHTML = parseBoardCode(applyPretext(author, parseHTML(value).replace(/({parsed}|{\/parsed})/g, "") + parseHTML(textcontent)));
				}
				
			field.scrollTop = field.scrollHeight;
			moveCursor(field);
				
			}
		
		
	}
	
	if(editHijacking) {
	
	//check if you clicked an edit link; if so, hijack it
    				
		if(evt.href.indexOf("PostEdit.aspx?edit=") != -1) {
		
			event.preventDefault();

			var subject = getSubject(evt);
			
			var textcontent = getPostContent(evt);
				
			if(!(existingPanel = evt.parentNode.getElementsByClassName('edit')[0])) {
				drawPanel('edit', evt.parentNode);
				}
				
			targetPanel = evt.parentNode.getElementsByClassName('edit')[0];
			targetPanel.getElementsByClassName('num')[0].value = evt.href.split('edit=')[1];
			targetPanel.getElementsByClassName('subject')[0].value = subject;
			targetPanel.style.cssText = "";
			resetSizeControls(targetPanel);
			scrollToPanel(targetPanel);
			autoFocus(targetPanel);
			
			getKey(targetPanel);
			panelList.push(targetPanel);
				
			var field = getField(targetPanel);
			
			if(field.tagName=="TEXTAREA") {
				field.value = parseHTML(textcontent).replace(/({parsed}|{\/parsed})/g, "");
				field.scrollTop = textarea.scrollHeight;
				}
			else {
				field.innerHTML = textcontent.replace(/^[ \t]+|[ \t]+$/gim,"").replace(/\t{2,}/gi," ").replace(/[\r\n]/g, ""); //have to get rid of extra whitespace, line breaks in code
				}
				
			moveCursor(getField(targetPanel));
				
			}
		
		
	}
	
	if(PMHijacking) {
    				
		if(evt.href.indexOf("/PrivateMessages/SendMessage.aspx?usr=") != -1 && evt.parentNode.className != "bottomLinks") {
			
			event.preventDefault();
			
			var user = layout.fresh ? evt.parentNode.firstChild : evt.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.getElementsByTagName("a")[0];
			user = user ? user.innerHTML.replace(/(<b>|<\/b>)/gi, "") : "Anonymous";
			
			var targetParent = evt.parentNode;
				
			if(GM_getValue("PMIntegration", true)) {
				
				if(layout.fresh) targetParent.parentNode.parentNode.parentNode.className += " panelInside";
				
				targetPanel = targetParent.getElementsByClassName('pm')[0];
					
				if(!targetPanel) {
					drawPanel('pm', targetParent);
					targetPanel = targetParent.getElementsByClassName('pm')[0];
					targetPanel.getElementsByClassName('subject')[0].value = document.title.slice(0, document.title.lastIndexOf('-')-1);
					}
				
				}
				
			else {
			
				closePanels("pm");
			
				privateMessageOn = true;
				
				if(!PMBeenOn) {
					drawPanel('pm', document.body);
					targetPanel = getTopPanel('pm');
					PMBeenOn = true;
					}
				else {
					targetPanel = getTopPanel('pm');
					targetPanel.style.cssText = "";
					}
			
				}
			
			targetPanel.getElementsByClassName('user')[0].value = user;
			targetPanel.style.cssText = "";
			resetSizeControls(targetPanel);
			if(GM_getValue("PMIntegration", true)) scrollToPanel(targetPanel);
			panelList.push(targetPanel);
			
			moveCursor(getField(targetPanel));
			autoFocus(targetPanel);
			
			getKey(targetPanel);
				
			}
		
	}
	
	}

	}, true);
	
	logListener("document[click]{linkHijacking}");

}

time.stop('linkHijacking');


var WULLinks = GM_getValue("WULLinks", true);

function addWULLinks(thisParent) {

	if(layout.fresh) {
		var script = thisParent.getElementsByTagName("SCRIPT")[0].innerHTML;
		var thisUID = script.slice(script.indexOf('usr=')+4, script.indexOf('">'));
		}
	else {
		var history = thisParent.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName("A")[3].href;
		var thisUID = history.split("=")[1];
		}
	
	var temp = document.createDocumentFragment();
	var link = document.createElement("a");
	link.href = 'http://boards.ign.com/UserPages/WatchedUsers.aspx?usr=' + thisUID + '&action=update';
	link.title = 'Add this user to your Watched User List';
	link.innerHTML = "WUL";
	temp.appendChild(link.cloneNode(true));
	temp.appendChild(document.createTextNode(" | "));
	link.href = link.href.replace("update", "remove");
	link.title = "Remove this user from your Watched User List";
	link.innerHTML = "deWUL";
	temp.appendChild(link);

	var area = layout.fresh ? thisParent.getElementsByClassName("boards_thread_links")[0] : 
							thisParent.nextSibling.nextSibling.nextSibling.nextSibling
							.getElementsByClassName("boards_thread_links")[0];
	
	layout.fresh ? area.appendChild(temp) : area.insertBefore(temp, area.getElementsByClassName("boards_quick_post_inline")[0]);

	}

if(WULLinks) {
	
	time.start('WULLinks');
	vlog("Adding WUL links");
	
	//Add the WUL links
	var allReplies = document.getElementsByClassName("boards_thread_row");
	
	var i = allReplies.length - 1;
	if(i!=-1) {
	
	do{
	addWULLinks(allReplies[i]);
	} while(i--);

	}	
	
		
	vlog("WUL links added");
	time.stop('WULLinks');
		
	}
	

	
	
//begin autorefresh replies	
if(GM_getValue("autorefreshReplies", true)) {
		
	var autorefreshRepliesInt = GM_getValue("autorefreshRepliesInt", 5000),
		outlinee = document.getElementById("boards_full_width"),
		dontRefresh = false, autorefreshing = false;
	
	document.addEventListener('keydown', function(e) { 
	
		if(e.ctrlKey) { 
		
			//`~
			if(e.which==192) { 
				e.preventDefault();
				dontRefresh = !dontRefresh;
				outlinee.style.outlineColor = (dontRefresh) ? "red" : "transparent"; 
				}

			//F5
			if(e.which==116) {
				e.preventDefault();
				if(!autorefreshing) refreshReplies(true);
				}
			
			}
		
		}, true);

	function refreshReplies(override) {

		if(typeof override != "boolean") override = false;
	
		if(!autorefreshing && ((inFocus && !dontRefresh) || override)) {
			outlinee.style.outlineColor = "green";
			autorefreshing = true;
		
			GM_xmlhttpRequest({
				method:"GET",
				url:window.location.href,
				headers:{
				"User-Agent":"Mozilla/5.0",
				"Accept":"text/html, text/plain",
				},
				onload:function(details) {
			
					var dt = details.responseText;

					//make a new stringReplyObj out of the slice of text containing all the replies
					newReplies = new stringReplyObj(dt);
					//update the current document's replies
					newReplies.update(document);
					//alert(newReplies.replies[0].subject);
					delete newReplies;
					
					outlinee.style.outlineColor = (dontRefresh) ? "red" : "transparent";
					autorefreshing = false;

					}
				});

			}
		}

	setInterval(refreshReplies, autorefreshRepliesInt);
	
	
	}
	//end autorefresh replies
		

function ignoreUser(thisRow) {
		
	if(ignoreUsers) {

		thisRow.className += " hiddenReply";
			
		//add these links if they aren't there already
		if(!ignoreLinks) addIgnoreLinks(layout.fresh ? thisRow.getElementsByClassName("boards_thread_links")[0] : thisRow.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByClassName("boards_thread_links")[0]);
		
		var hideLink = layout.fresh ? thisRow.getElementsByClassName("hideReply")[0] : thisRow.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByClassName("hideReply")[0];
		hideLink.innerHTML = hideLink.innerHTML.replace("Hide", "Show");
		hideLink.className = "showReply";
		
		}
	
	var ignoreLink = layout.fresh ? thisRow.getElementsByClassName("ignoreUser")[0] : thisRow.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByClassName("ignoreUser")[0];
	ignoreLink.innerHTML = ignoreLink.innerHTML.replace("Ignore", "unIgnore");
	ignoreLink.className = "unIgnoreUser";

	}
		
		
//Stuff for ignoring users
var ignoreUsers = GM_getValue("ignoreUsers", false), ignoreLinks = GM_getValue("ignoreLinks", true);
if(ignoreUsers || ignoreLinks) {
	
	list = GM_getValue("ignoreList", "");
	if(list) {
	
	list = list.split(",");
	
	//get all the left user info rows and the authors
	var thisRow;
	var allRows = document.getElementsByClassName("boards_thread_row");

	vlog("Ignoring users");
	//iterate through the array
	for(var i = allRows.length - 1; i >= 0; i--) {
		
		thisRow = allRows[i];
		author = (layout.fresh) ? thisRow.getElementsByClassName("boards_thread_user_profile_info")[0].getElementsByTagName("a")[0] :
									thisRow.getElementsByClassName("boards_thread_user_name_stars")[0].getElementsByTagName("a")[0];
									
		if(author) author = author.innerHTML.replace(/(<b>|<\/b>)/gi, "");
		else author = "Anonymous";
		
		//see if the author is on the list
		for(j = list.length - 1; j >= 0; j--) {
			if(author == list[j]) {
				ignoreUser(thisRow);
				break;
				}
			}
		}
		
	vlog("Users ignored");
	
	}//list

	}
	
time.stop('topic');
}

else if(pageType=="board"){ //Do stuff when not in topic

	time.start('board');
	vlog("Out of topic");
		
	document.addEventListener('click', function(e) {
	
		if(e.which==1 && e.target.tagName=="A") {
	
			var evt = e.target, targetPanel = null;
			
			//hijack post topic link
			if(evt.href.indexOf("ign.com/PostTopic.aspx?brd=") != -1 && evt.href.indexOf("createpoll") == -1) {
				if(GM_getValue("topicHijacking", true)) {
				
					e.preventDefault();
					
					if(GM_getValue("topicIntegration", true)) {
					
						if(!(existingPanel = evt.parentNode.parentNode.getElementsByClassName('topic')[0])) {
							drawPanel('topic', evt.parentNode.parentNode);
							}
							
						targetPanel = evt.parentNode.parentNode.getElementsByClassName('topic')[0];
						
						}
						
					else {
					
						closePanels("topic");
				
						postTopicOn = true;
						
						if(!postTopicBeenOn) {
							drawPanel('topic', document.body);
							targetPanel = getTopPanel('topic');
							postTopicBeenOn = true;
							}
						else {
							targetPanel = getTopPanel('topic');
							targetPanel.style.cssText = "";
							}
					
						}
					
					panelList.push(targetPanel);
					targetPanel.style.cssText = "";
					resetSizeControls(targetPanel);
					
					moveCursor(getField(targetPanel));
					autoFocus(targetPanel);
					
					getKey(targetPanel);
				
					}
			
				}
	
			}
	
		}, true);
		
	
	
	
	//autorefresh topics	
	if(GM_getValue("autorefresh", true)) {
				
		
	var dontRefresh = false, onTopics = false, autorefreshing = false,
		outlinee = document.getElementById("boards_board_list_table");
	
	document.addEventListener('keydown', function(e) { 
	
		if(e.ctrlKey) { 
		
			//`~
			if(e.which==192) { 
				e.preventDefault();
				dontRefresh = !dontRefresh;
				outlinee.style.outlineColor = (dontRefresh) ? "red" : "transparent"; 
				}

			//F5
			if(e.which==116) {
				e.preventDefault();
				if(!autorefreshing) refreshTopics(0, true);
				}
			
			}
		
		}, true);
		
	outlinee.addEventListener ('mouseover', function(e) { onTopics = true; }, false);
		
		logListener("boards_board_list_table[mouseover]");
		
	outlinee.addEventListener ('mouseout', function(e) { onTopics = false; }, false);
		
		logListener("boards_board_list_table[mouseout]");
		
		
	//function that gets content of the table that holds all the topics/authors/etc.
	function getTable(content) {
		var x = content.indexOf('id="boards_board_list_table"'); //set x = position of that id
		if(x == -1) return "";

		x = content.indexOf(">", x); //find end of tag
		if(x == -1) return "";

		var y = content.indexOf('<!-- /Thread List -->', x); //find end of topic list
		if(y == -1) return "";
		
		y = content.lastIndexOf('</div>', y);
		if(y == -1 || y < x) y = content.indexOf('<!-- /Thread List -->', x);
		if(y == -1) return "";

		//debugString(content.slice(x + 1, y));
		
		return content.slice(x + 1, y);   //return stuff between <table...id=""> and </table>
		}
			
	function topicRequest() {
		autorefreshing=true;
		GM_xmlhttpRequest({
		  method:"GET",
		  url:'http://' + host + '/' + boardName + '/b' + boardNumber + '/p' + pageNumber,
		  headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/monkey,text/xml",
			},
		  onload:function(details) {
		
			vlog("topic refresh load");
			
			//creates a textarea and fills it with responsetext, for debugging
			//debugString(getTable(details.responseText));
			
			//replace the table on the page with the contents of the table in responsetext
			if(!onTopics) {
				document.getElementById("boards_board_list_table").innerHTML = getTable(details.responseText);
				vlog("Autorefreshed");
				vlog("EVENT LISTENERS:  " + listenerLog);
				}
				
			outlinee.style.outlineColor = (dontRefresh) ? "red" : "transparent";	
			autorefreshing=false;
			delete this.onload;
		  }
		});
		}
		
	
			
	function refreshTopics(time, override) {

		if(typeof override != "boolean") override = false;
	
		if(!autorefreshing && ((!onTopics && inFocus && !dontRefresh) || override )) {
			outlinee.style.outlineColor = "green";
			topicRequest();
			}

		}

	setInterval(refreshTopics, autorefreshInt);
	
	}

time.stop('board');
}


//addEventListener bit watches for mouse clicks

document.addEventListener ('click', function(event) {
	
inFocus = true;
	
if(event.which==1) {

	var evt = event.target;

	switch(evt.id) {
	
		case "boardOptionsButton":
			event.preventDefault();
			var area = document.getElementById("extraOptions");
			evt.style.fontWeight = area.style.display=="" ? "" : "bold";
			evt.style.padding = area.style.display=="" ? "" : "0px 7px";
			area.style.display = area.style.display=="" ? "none" : "";
			break;
			
		case "wikiSearchButton":
			var query = 'http://vestiwiki.yabd.org/wiki/index.php?search=' + document.getElementById('boards_search_input').value;
			GM_getValue("searchWikiTab", true) ? GM_openInTab(query) : window.location.href = query;
			break;

		case "pretextHelp":
			alert("This field contains pretext - what you want inserted into your reply/topic/PM automatically.  Though this seems simple, the syntax for this field is rather complicated:\n\n [start][/start] - Insert text at the start of your post, and keep it there\n [end][/end] - Insert text at the end of your post and keep it there\n [before][/before] - Insert text before quoted text.  The script will not automatically add [quote] tags.\n [after][/after] - Insert text after quoted text.  The script will not automatically add [/quote] tags.\n [cursor] - Put the cursor here after text is inserted.  If two or more of these are encountered at the same time, the script follows the first one.\n [author] - Adds the quote author.  Only works with [before] and [after].\n\nYou can include regular markup tags and line breaks. Don't move your [end] text around after it's inserted, or else it won't be properly moved after quoting someone.  It is unsafe to add line breaks between the [end] tags before text starts - you might accidentally mess up spacing while typing out a post.  Use the [start] tags instead.  Feel free to add linebreaks or whatever text you want outside of these custom tags.  Examples:\n\n_________________________________________\n[before][quote=[author]][/before][after][/quote]\n\n[cursor][/after]\n - Default quote behavior, with two linebreaks after it\n\n_________________________________________\n[start][color=#C1C2C9][cursor][/color][/start]\n - Start out typing in invisitext\n\n_________________________________________\n[start][cursor]\n\n[/start][end]_-~*My crazy fake sig*~-_[/end]\n - The safer way to add a fake sig, be warned that your sig will be placed immediately after a quote\n\n\nSee the user guide for more examples.  Send love letters to gamerX1011.");
			break;
			
		case "eraseIgnoreListButton":
		
			if(evt.value=="Erase List" || evt.value=="Erased.") evt.value = "You sure?";
			
			else if(evt.value=="You sure?") {
				
				GM_setValue("ignoreList", "");
				evt.value = "Erased.";
				vlog("Erased ignore list");
				
				}
			
			break;
			
		case "refreshUsercolorsButton":
		
			if(evt.value=="Refresh" || evt.value=="Done.") {
				refreshColors(true);
				}
			
			else if(evt.value=="...") evt.value = "Wait FFS";
			
			break;
			
		case "postUsercolorsButton":
		
			//make sure all the colors are legit
			if(!/[\da-f]{6}/i.test(UCcolor)) UCcolor = "null";
			if(!/[\da-f]{6}/i.test(UCbgcolor)) UCbgcolor = "null";
			if(!/[\da-f]{6}/i.test(UCbordercolor)) UCbordercolor = "null";
		
			GM_setValue("UCcolor", UCcolor);
			GM_setValue("UCbgcolor", UCbgcolor);
			GM_setValue("UCbordercolor", UCbordercolor);
			GM_setValue("UCweight", UCweight);
			GM_setValue("UCstyle", UCstyle);
			GM_setValue("UCdecoration", UCdecoration);
			
			//button, color, bgcolor, bordercolor, weight, style, decoration
			if((evt.value=="Post") || (evt.value=="Done.")) {
				postColors(true, UCcolor, UCbgcolor, UCbordercolor, UCweight, UCstyle, UCdecoration);
				}
			
			else if(evt.value=="...") evt.value = "Wait";
			
			break;
			
		case "postTopicButton":
		
			if(postTopicOn) {
				postTopicOn = false;
				getTopPanel('topic').style.cssText = "display: none;";
				}	
				
			else if(!postTopicOn) {
				
				closePanels("topic");
				
				postTopicOn = true;
				
				var targetPanel;
				
				if(!postTopicBeenOn) {
					drawPanel('topic', document.body);
					targetPanel = getTopPanel('topic');
					getKey(targetPanel);
					postTopicBeenOn = true;
					}
				else {
					targetPanel = getTopPanel('topic');
					targetPanel.style.cssText = "";
					}
					
				panelList.push(targetPanel);
				resetSizeControls(targetPanel);
				autoFocus(targetPanel);
				
				}

			break;
			
		case "postReplyButton":
			
			if(postReplyOn) {
				postReplyOn = false;
				getTopPanel('reply').style.cssText = "display: none;";
				}	
				
			else if(!postReplyOn) {
				
				closePanels("reply");
				
				postReplyOn = true;
				
				var targetPanel;
				
				if(!postReplyBeenOn) {
					drawPanel('reply', document.body);
					targetPanel = getTopPanel('reply');
					targetPanel.getElementsByClassName("subject")[0].value = document.title.slice(0, document.title.lastIndexOf('-')-1);
					targetPanel.getElementsByClassName('num')[0].value = topicNumber;
					getKey(targetPanel);
					postReplyBeenOn = true;
					}
				else {
					targetPanel = getTopPanel('reply');
					targetPanel.style.cssText = "";
					}
					
				panelList.push(targetPanel);
				resetSizeControls(targetPanel);
				autoFocus(targetPanel);
				
				}

			break;
			
		case "privateMessageButton":
			
			if(privateMessageOn) {
				privateMessageOn = false;
				getTopPanel('pm').style.cssText = "display: none;";
				}	
				
			else if(!privateMessageOn) {
			
				closePanels("pm");
			
				privateMessageOn = true;
				
				var targetPanel;
				
				if(!PMBeenOn) {
					drawPanel('pm', document.body);
					targetPanel = getTopPanel('pm');
					getKey(targetPanel);
					PMBeenOn = true;
					}
				else {
					targetPanel = getTopPanel('pm');
					targetPanel.style.cssText = "";
					}
					
				panelList.push(targetPanel);
				resetSizeControls(targetPanel);
				autoFocus(targetPanel);

				}
			
			break;

		case "settingsButton":
			showSettings();
			break;
		
		}
		
	switch(evt.className) {
	
		case "minimizeButton":		

			var p = evt.parentNode;
			var pp = p.parentNode;
		
			pp.lastChild.style.display = "none";
			pp.style.cssText = "height: 19px;"

			p.lastChild.src = 'data:image/png;base64,' + restoreIcon;
			p.lastChild.className = "restoreButton";
			p.lastChild.title = "Restore";
			p.childNodes[2].src = 'data:image/png;base64,' + maximizeIcon;
			p.childNodes[2].className = "maximizeButton";
			p.childNodes[2].title = "Maximize";

			break;
			
		case "maximizeButton":		

			var p = evt.parentNode;
			var pp = p.parentNode;
		
			if(pp.parentNode.tagName=="BODY") pp.style.cssText = "left: 9.5%; bottom: 9.5%; width: 81%; height: 81%;";
			else pp.style.height = "500px";
				
			pp.lastChild.style.display = "";

			p.lastChild.src = 'data:image/png;base64,' + minimizeIcon;
			p.lastChild.className = "minimizeButton";
			p.lastChild.title = "Minimize";
			p.childNodes[2].src = 'data:image/png;base64,' + restoreIcon;
			p.childNodes[2].className = "restoreButton";
			p.childNodes[2].title = "Restore";

			break;
			
		case "restoreButton":		

			var pp = evt.parentNode.parentNode;
		
			pp.style.cssText = "";
			pp.getElementsByClassName('panelContent')[0].style.cssText = "";

			resetSizeControls(pp);
			
			break;
			
		case "closeButton":
			
			var field;
			
			evt.parentNode.parentNode.style.display = "none";

			if(evt.parentNode.parentNode.parentNode.tagName=="BODY") {
				if(postTopicOn) postTopicOn=false;
				if(postReplyOn) postReplyOn=false;
				if(privateMessageOn) privateMessageOn=false;
				}
			else if(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className.indexOf("panelInside")!=-1)
				evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className = 
				evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className.replace(/ panelInside/g, "");
			
			if(field = getField(evt.parentNode.parentNode)) {
				if(field.tagName=="DIV") field.innerHTML = '<br _moz_dirty="">';
				else if(field.tagName=="TEXTAREA") field.value = '';
				}
			break;
			
		case "postButton":
			if(event.target.parentNode.parentNode.tagName!="TD" && !event.target.disabled) postMessage(event.target.parentNode.parentNode.parentNode);
			break;
			
		case "hideReply":
		case "showReply":
			
			var show = evt.className=="showReply";
			
			evt.innerHTML = show ? evt.innerHTML.replace("Show", "Hide") : evt.innerHTML.replace("Hide", "Show");
			evt.className = show ? "hideReply" : "showReply";

			var parentReply = layout.fresh ? evt.parentNode.parentNode.parentNode.parentNode : evt.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;
		
			show ? parentReply.className = parentReply.className.replace(" hiddenReply", "") :
					parentReply.className += " hiddenReply";

			
			break;
			
		case "ignoreUser":
		case "unIgnoreUser":
			
			var unIgnore = evt.className=="unIgnoreUser";
			
			evt.innerHTML = unIgnore ? evt.innerHTML.replace("unIgnore", "Ignore") : evt.innerHTML.replace("Ignore", "unIgnore");
			evt.className = unIgnore ? "ignoreUser" : "unIgnoreUser";
			
			var user = getAuthor(evt);
			
			if(unIgnore) {
				GM_setValue("ignoreList", GM_getValue("ignoreList", "").replace(user + ",", ""));
				}
			else {
				if(GM_getValue("ignoreList", "").indexOf(user)==-1) GM_setValue("ignoreList", GM_getValue("ignoreList", "") + user + ",");
				}
			
			break;
	
		}
		
		
	if(autoWUL && evt.tagName == "A" && evt.href && evt.href.search(/http:\/\/(betaboards|boards|forums)\.ign\.com\/UserPages\/WatchedUsers\.aspx\?usr=\d{1,20}&action=(update|remove)/i) != -1) {
	
		event.preventDefault();
		
		vlog("AutoWULing " + evt.href.slice(evt.href.indexOf("usr=")+4, evt.href.indexOf("&")));
	
		var remove = evt.href.indexOf("remove") != -1;
		var type = remove ? "Remove" : "Update";
		
		evt.style.backgroundColor = "rgba(255,240,240, 0.5)";
	
		GM_xmlhttpRequest({
			method: "GET",
			url: evt.href,
			headers: {
				"Host" : host,
				"User-Agent": navigator.userAgent,
				"Accept" : "text/html, text/plain",
				},
			onload: function(details) {
				var viewState = getViewState(details.responseText);
				var eventValidation = getEventValidation(details.responseText);
				
				evt.style.backgroundColor = "rgba(255,255,100, 0.5)";
				
				var _data = '';
				_data += '__VIEWSTATE=' + encodeURIComponent(viewState);
				_data += '&__EVENTVALIDATION=' + encodeURIComponent(eventValidation);
				_data += '&ctl00%24ctl00%24cphMain%24ccFormFieldsContainer%24cphMain%24btn' + type + '=' + type;
				
				GM_xmlhttpRequest({
					method: "POST",
					url: evt.href,
					data: _data,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Host" : host,
						"User-Agent": navigator.userAgent,
						"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8",
						"Cache-Control" : "no-cache, no-cache",
						"Content-Length" : _data.length,
						"Cookie" : document.cookie,
						"Pragma" : "no-cache",
						},
					onload: function(details) {
						
						evt.style.backgroundColor = "rgba(100,255,100, 0.5)";
						
						}
						
					});
				
				
				}
			});
	
		}
		
		
	}
	
	}, true);
	
	logListener("document[click]{main}");
	
	
	
function getPanelStrings(type) {

	switch(type) {
	
		case "topic":
			return ['postTopic', 'Post Topic', 'Post Topic'];	
		case "reply":
			return ['postReply', 'Post Reply', 'Post Reply'];
		case "edit":
			return ['editReply', 'Edit Reply', 'Post Changes'];
		case "pm":
			return ['privateMessage', 'Private Message', 'Send Message'];
		default:
			return ['err', 'err', 'err'];
	
		}

	}
	
function logInfo(text, parent){
	
	if(parent) parent.getElementsByClassName('info')[0].innerHTML = text;
	vlog('logInfo: ' + text);

	}
	
function getViewState(text) {

	var start = text.indexOf('id="__VIEWSTATE"');
	if(start!=-1) start = text.indexOf('value="', start);
	else return;
	if(start!=-1) start += 7;
	else return;
	
	var end = text.indexOf('"', start);
	if(end!=-1) return text.slice(start, end);
	else return;

	}
	
	
function getEventValidation(text) {

	var start = text.indexOf('id="__EVENTVALIDATION"');
	if(start!=-1) start = text.indexOf('value="', start);
	else return;
	if(start!=-1) start += 7;
	else return;
	
	var end = text.indexOf('"', start);
	if(end!=-1) return text.slice(start, end);
	else return;

	}
	

function getRedir(text, allow) {
	
	if(typeof allow!="boolean") allow = true;
	
	if(!GM_getValue("goHome", false) || !allow) {
		var end = text.lastIndexOf("|");
		var start = text.lastIndexOf("|", end-1) + 1;
		
		return "http://boards.ign.com" + text.slice(start, end);
		}
		
	else return "http://boards.ign.com/" + boardName + "/b" + boardNumber + "/p1";

	}
	
	
//posts a message
//parent (HTMLDivElement): a panel to get information from and log to, if specified.  If no parent, use null.
//type (string): topic, reply, edit, pm
//tells it which kind of message it is
//num (integer): number for edit or reply
	//subject (string): any value
	//subject of the post
	//body (string): any value
	//body of the post
	//user (string): any value
	//user to send pm to
	
function postMessage(parent, type, eventValidation, viewState, subject, body, user, num, locked) {

	var _data = '', page = '';
	
	//returns true if the string is not valid
	function vals(text){
		if(typeof text!="string" || text=='' || text==null || text==undefined) return true;
		}
	
	//returns true if the number is not valid
	function valn(text){
		if(typeof text!="number" || text=='' || text==null || text==undefined) return true;
		}
	
	//if a parent element is given, get all the data from it
	if(parent) {
	
		//if wysiwyg is on, parse and dump into the textarea
		try{
		var wysiwyg;
		if((wysiwyg = parent.getElementsByClassName('wysiwygContainer')[0]).style.display!="none") parent.getElementsByClassName('body')[0].value = parseHTML(wysiwyg.firstChild.innerHTML).replace(/({parsed}|{\/parsed})/g,"");
		} catch(e) {  }
	
		type = parent.className.split(' ')[1];
		eventValidation = parent.getElementsByClassName('eventValidation')[0].value;
		viewState = parent.getElementsByClassName('viewState')[0].value;
		subject = parent.getElementsByClassName('subject')[0].value;
		body = parent.getElementsByClassName('body')[0].value;
		if(type=="pm") user = parent.getElementsByClassName('user')[0].value;
		if(type=="edit" || type=="reply") num = parent.getElementsByClassName('num')[0].value;
		if(type=="edit") locked = parent.getElementsByClassName('locked')[0].checked;
	
		}
		
	var lockedString = locked ? "&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostEdit%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ucPostOptions%24ccPostOptionsModuleContent%24chkTopicIsLocked=on" : "";
	
		if(vals(type)) {
			logInfo('<span class="error">Type Error</span>', parent);
			return;
			}
		if(vals(subject)) {
			logInfo('<span class="error">Subject Error</span>', parent);
			return;
			}
		if(vals(body)) {
			logInfo('<span class="error">Body Error</span>', parent);
			return;
			}
		if(vals(user)) {
			user = "(no user)";
			if(type=="pm") {
				logInfo('<span class="error">User Error</span>', parent);
				return;
				}
			}
		if(vals(num)) {
			num = "0";
			if((type=="edit") || (type=="reply")) {
				logInfo('<span class="error">Num Error</span>', parent);
				return;
				}
			}
		if(vals(eventValidation)) {
			logInfo('<span class="error">eventValidation Error</span>', parent);
			getKey(parent, true);
			return;
			}
		if(vals(viewState)) {
			logInfo('<span class="error">viewState Error</span>', parent);
			getKey(parent, true);
			return;
			}
			
	parent.getElementsByClassName("postButton")[0].disabled = true;
	
	switch(type) {
	
		case "topic":
			page = 'http://' + host + '/PostForms/PostTopic.aspx?brd=' + boardNumber;
			break;
			
		case "reply":
			page = 'http://' + host + '/PostForms/PostReply.aspx?brd=' + boardNumber + '&topic=' + num;
			break;
			
		case "edit":
			page = 'http://' + host +'/PostForms/PostEdit.aspx?edit=' + num;
			break;
			
		case "pm":
			page = 'http://' + host + '/PrivateMessages/SendMessage.aspx?';
			break;
			
		default:
			return;
	
		}
		
	
	if(type == "topic") {
		_data += 'ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostTopic%24ccTemplateModuleContent%24ucPostSubject%24ccPostSubjectModuleContent%24txtMessageSubject=' + encodeURIComponent(subject);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostTopic%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ccPostTextModuleContent%24txtMessageBody=' + encodeURIComponent(body);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ScriptManager1=ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24updPanelPost%7Cctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit';
		_data += '&ctl00_ctl00_cphMain_cphMain_tkScriptManager1_HiddenField=%3B%3BIGN.Boards.Web.Controls%3Aen-US%3A3f4fdf86-7726-4150-aef4-6cda1afa20b8%3A5cdf82d5';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostTopic%24ccTemplateModuleContent%24ucPostBody%24ucPostToolbar%24ccPostToolbarModuleContent%24ucFullToolbar%24ucBasicMarkup%24lstSelectFormatMode=basic';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostTopic%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ucPostOptions%24ccPostOptionsModuleContent%24chkFormatBarOn=on';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit=%20Post%20Topic%20';
		}
		
	else if(type == "reply") {
		_data += 'ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostReply%24ccTemplateModuleContent%24ucPostSubject%24ccPostSubjectModuleContent%24txtMessageSubject=' + encodeURIComponent(subject);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostReply%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ccPostTextModuleContent%24txtMessageBody=' + encodeURIComponent(body);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24tkScriptManager1=ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24updPanelPost%7Cctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit';
		_data += '&ctl00_ctl00_cphMain_cphMain_tkScriptManager1_HiddenField=%3B%3BIGN.Boards.Web.Controls%3Aen-US%3A3f4fdf86-7726-4150-aef4-6cda1afa20b8%3A5cdf82d5';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostReply%24ccTemplateModuleContent%24ucPostBody%24ucPostToolbar%24ccPostToolbarModuleContent%24ucFullToolbar%24ucBasicMarkup%24lstSelectFormatMode=basic';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostReply%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ucPostOptions%24ccPostOptionsModuleContent%24chkFormatBarOn=';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit=%20Post%20Reply%20';
		}
	
	else if(type == "pm") {
		_data += 'ctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24txtUserName=' + encodeURIComponent(user);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24txtSubject=' + encodeURIComponent(subject);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24txtBody=' + encodeURIComponent(body);
		_data += '&ctl00%24ctl00%24cphMain%24cphMenu1%24ScriptManager1=ctl00%24ctl00%24cphMain%24cphMain%24UpdatePanel1%7Cctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24btnSend';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24ucFullToolbar%24ucBasicMarkup%24lstSelectFormatMode=basic';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccSendPMContent%24btnSend=Send%20Private%20Message';
		}
		
	else if(type == "edit") {
		_data += 'ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostEdit%24ccTemplateModuleContent%24ucPostSubject%24ccPostSubjectModuleContent%24txtMessageSubject=' + encodeURIComponent(subject);
		_data += lockedString;
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostEdit%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ccPostTextModuleContent%24txtMessageBody=' + encodeURIComponent(body);
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24tkScriptManager1=ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24updPanelPost%7Cctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit';
		_data += '&ctl00_ctl00_cphMain_cphMain_tkScriptManager1_HiddenField=%3B%3BIGN.Boards.Web.Controls%3Aen-US%3A3f4fdf86-7726-4150-aef4-6cda1afa20b8%3A5cdf82d5';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostEdit%24ccTemplateModuleContent%24ucPostBody%24ucPostToolbar%24ccPostToolbarModuleContent%24ucFullToolbar%24ucBasicMarkup%24lstSelectFormatMode=basic';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostEdit%24ccTemplateModuleContent%24ucPostBody%24ccPostBodyModuleContent%24ucPostOptions%24ccPostOptionsModuleContent%24chkFormatBarOn=on';
		_data += '&ctl00%24ctl00%24cphMain%24cphMain%24ccContent%24ccPostEntryContent%24ucPostButtons%24ccPostButtonsContent%24btnSubmit=%20Post%20Changes%20';
		}
		
	_data += '&__VIEWSTATE=' + encodeURIComponent(viewState);
	_data += '&__EVENTVALIDATION=' + encodeURIComponent(eventValidation);
	_data += '&__EVENTTARGET=&__EVENTARGUMENT=&_LASTFOCUS=&selMarkupColor=&__ASYNCPOST=true';
	
	logInfo('<img src="data:image/gif;base64,' + loadingIcon + '">Posting...', parent);
	
	GM_xmlhttpRequest({
		method: "POST",
		url: page,
		data: _data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Host" : host,
			"User-Agent": navigator.userAgent,
			"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8",
			"Cache-Control" : "no-cache, no-cache",
			"Content-Length" : _data.length,
			"Cookie" : document.cookie,
			"Pragma" : "no-cache",
			},
		onload: function(details) {
			logInfo('Posted.', parent);
			parent.getElementsByClassName("postButton")[0].disabled = false;
			var dr = details.responseText;
			//debugString(dr);
			if(dr.search(/error/i) != -1) logInfo('<span class="error">External Validation Error</span>', parent);
			else {
			
				switch(type) {
				
					case "topic":
						if(GM_getValue("postTopicRedirection", false)) window.location.href = getRedir(dr, false);
						break;
					case "reply":
						if(pageType!="board") {
							if(GM_getValue("postReplyRedirection", true)) window.location.href = getRedir(dr);
							}
						else if(pageType=="board") {
							if(GM_getValue("postReplyWERedirection", false)) window.location.href = getRedir(dr);
							}
						break;
					case "edit":
						if(GM_getValue("editRedirection", true)) window.location.href = getRedir(dr);
						break;
						
					}
					
				if(GM_getValue("autoClose", false)) {
				
					parent.style.display = "none";
					if(parent.parentNode.tagName=="BODY") {
						if(postTopicOn) postTopicOn=false;
						if(postReplyOn) postReplyOn=false;
						if(privateMessageOn) privateMessageOn=false;
						}
					else if(parent.parentNode.parentNode.parentNode.parentNode.className.indexOf("panelInside")!=-1)
								parent.parentNode.parentNode.parentNode.parentNode.className = 
								parent.parentNode.parentNode.parentNode.parentNode.className.replace(/ panelInside/g, "");
					if(field = getField(parent)) {
						if(field.tagName=="DIV") field.innerHTML = '<br _moz_dirty="">';
						else if(field.tagName=="TEXTAREA") field.value = '';
						}
				
					}
			
				}
			}
		});

	}
	
	

	
	
//gets the necessary keys for posting stuff
//parent (HTMLDivElement): a panel to get information from and dump to, if specified.  If no parent, use null.
//type (string): topic, reply, edit, pm
//tells it which page to get the key from
//num (integer): number for edit or reply
//post (boolean): true, false
//post the thing when the key is found
	//this info will be gleaned from the parent
	//subject (string): any value
	//subject of the post
	//body (string): any value
	//body of the post
	//user (string): any value
	//user to send pm to
	
function getKey(parent, type, post, subject, body, user, num){

	var page = '';

	if(parent) {
	
		type = parent.className.split(' ')[1];
		eventValidation = parent.getElementsByClassName('eventValidation')[0].value;
		viewState = parent.getElementsByClassName('viewState')[0].value;
		subject = parent.getElementsByClassName('subject')[0].value;
		body = parent.getElementsByClassName('body')[0].value;
		if(type=="pm") user = parent.getElementsByClassName('user')[0].value;
		if(type=="edit" || type=="reply") num = parent.getElementsByClassName('num')[0].value;
	
		}
	
	if(!type) return;
	if(!subject) subject = "(no subject)";
	if(!body) body = "(no message)";
	if(!user) user = "(no user)";
	if(!post) post = false;
	if(!num) num = 0;
	
	switch(type) {
	
		case "topic":
			page = 'http://' + host + '/PostForms/PostTopic.aspx?brd=' + boardNumber;
			break;
			
		case "reply":
			page = 'http://' + host + '/PostForms/PostReply.aspx?brd=' + boardNumber + '&topic=' + num;
			break;
			
		case "edit":
			page = 'http://' + host + '/PostForms/PostEdit.aspx?edit=' + num;
			break;
			
		case "pm":
			page = 'http://' + host + '/PrivateMessages/SendMessage.aspx?';
			break;
			
		default:
			return;
	
		}
		
	logInfo('<img src="data:image/gif;base64,' + loadingIcon + '">Getting Keys...', parent);

	GM_xmlhttpRequest({
		method: "GET",
		url: page,
		headers: {
			"Host" : host,
			"User-Agent": navigator.userAgent,
			"Accept" : "text/html, text/plain",
			},
		onload: function(details) {
			var viewState = getViewState(details.responseText);
			var eventValidation = getEventValidation(details.responseText);
			parent.getElementsByClassName("eventValidation")[0].value = eventValidation;
			parent.getElementsByClassName("viewState")[0].value = viewState;
			parent.getElementsByClassName("postButton")[0].disabled = false;
			logInfo('Keys Found, Ready to Post.', parent);
			if(post) postMessage(parent, type, eventValidation, viewState, subject, body, user, num);
			}
		});

	}
	


if(GM_getValue("integrateTools", true)) {

	var button = document.createElement('input');
	button.id = 'wikiSearchButton';
	button.type = 'submit';
	button.value = 'Vesti Wiki';

	document.getElementById("boards_search_container").appendChild(button);
	
	var temp = document.createElement("li");
	
	var masterString = '' +

			'<a href="' + TopicUrl() + '" onclick="return false;">' +
				'<img class="regularButton" id="postTopicButton" src="data:image/png;base64,' + postTopicIcon + '" alt="Post Topic" title="Post Topic">' +
			'</a>' +

			'<a href="' + ReplyUrl() + '" onclick="return false;">' +
				'<img class="regularButton" id="postReplyButton" src="data:image/png;base64,' + postReplyIcon + '" alt="Post Reply" title="Post Reply">' +
			'</a>' +

			'<a href="http://boards.ign.com/PrivateMessages/SendMessage.aspx" onclick="return false;">' +
				'<img class="regularButton" id="privateMessageButton" src="data:image/png;base64,' + privateMessageIcon + '" alt="Private Message" title="Private Message">' +
			'</a>' +

			'<img class="settingsButton" id="settingsButton" src="data:image/png;base64,' + settingsIcon + '" alt="Settings" title="Settings">' +

	'';
	
	temp.innerHTML = masterString;

	document.getElementById("nav-global").getElementsByClassName("home")[0].getElementsByClassName("upcoming-top")[0].getElementsByTagName("ul")[0].appendChild(temp);


	}
	
if(GM_getValue("extraBoardOptions", true)) {

	var masterString = '' +
	'<div class="upcoming-top upcoming-games">' +
	
		'<ul>' +
			'<li><a href="http://boards.ign.com/UserPages/Icons.aspx">Icon</a></li>' +
			'<li><a href="http://club.ign.com/b/about">Profile</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeSignature.aspx">Signature</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/Polls.aspx">Polls</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/WatchedUsers.aspx">Watched Users</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/WatchedBy.aspx">Watched By</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/DisplaySettings.aspx">Display Settings</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/FavoriteBoards.aspx">Favorite Boards</a></li>' +
		'</ul>' +
		
		'<ul>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeMegaIcon.aspx">MegIcon</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeSignatureImage.aspx">Sig Pic</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeUserNameStyle.aspx">Colors</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeTitle.aspx">Title</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/WatchedTopics.aspx">Watched Topics</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/UserSearch.aspx">User Search</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/ChangeTimeZone.aspx">Time Zone</a></li>' +
			'<li><a href="http://boards.ign.com/UserPages/NotifySettings.aspx">Notification</a></li>' +
		'</ul>' +
			
	'</div>' +
		
		
		
	'<div class="upcoming-top upcoming-games">' +
		'<ul class="sub-bullets-head"><li>Other Pages</li></ul>' +
		'<ul>' +
			'<li><a href="http://boards.ign.com/Boards/topPosters.aspx">Top Posters</a></li>' +
			'<li><a href="http://boards.ign.com/Boards/topBoards.aspx">Top Boards</a></li>' +
			'<li><a href="http://boards.ign.com/Boards/activetopics.aspx">Active Topics</a></li>' +
		'</ul>' +
		
		'<ul>' +
			'<li><a href="http://boards.ign.com/Boards/usersNew.aspx">New Users</a></li>' +
			'<li><a href="http://boards.ign.com/Boards/NewBoards.aspx">New Boards</a></li>' +
			'<li><a href="http://boards.ign.com/Boards/usersonline.aspx">Users Online</a></li>' +
		'</ul>' +
		
	'</div>' +
		
		
		
	'<div class="upcoming-top upcoming-games">' +
		'<ul class="sub-bullets-head"><li><a href="http://boards.ign.com/Services/Default.asmx">Board Services</a></li></ul>' +
		'<ul>' +
			'<li><a href="http://boards.ign.com/Services/UserServices.asmx">User</a></li>' +
			'<li><a href="http://boards.ign.com/Services/BoardServices.asmx">Board</a></li>' +
			'<li><a href="http://boards.ign.com/Services/TopicServices.asmx">Topic</a></li>' +
		'</ul>' +
		
		'<ul>' +
			'<li><a href="http://boards.ign.com/Services/PostServices.asmx">Post</a></li>' +
			'<li><a href="http://boards.ign.com/Services/BlogServices.asmx">Blog</a></li>' +
			'<li><a href="http://boards.ign.com/Services/ReviewServices.asmx">Review</a></li>' +
		'</ul>' +
		
	'</div>' +
		
		
		
	'<div class="upcoming-top upcoming-games">' +
		'<ul class="sub-bullets-head"><li>Third Party</li></ul>' +
		'<ul>' +
			'<li><a href="http://mmii.info/default.php">mmii</a></li>' +
			'<li><a href="http://yabd.org/">yabd</a></li>' +
			'<li><a href="http://monsterdelag.googlepages.com/everything">mdl</a></li>' +
			'<li><a href="http://streakfinder.javaprovider.net/streak/">Streak Finder</a></li>' +
		'</ul>' +
		
		'<ul>' +
			'<li><a href="http://vestitools.pbworks.com/">Vesti Tools</a></li>' +
			'<li><a href="http://vestiwiki.yabd.org/wiki/index.php?title=Main_Page">Vesti Wiki</a></li>' +
			'<li><a href="http://userstyles.org/styles/browse/ign.com">IGN Styles</a></li>' +
			'<li><a href="http://www.big-boards.com/">Big Boards</a></li>' +
		'</ul>' +
		
		'<div class="clear"></div>' +
		
	'</div>' +

	'';
	
	var temp = document.createElement("div");
	temp.innerHTML = masterString;
	
	//broken with recent update
	var upcoming = document.getElementById("nav-global").getElementsByClassName("home")[0].getElementsByClassName("upcoming-top")[0];
	var bottom = upcoming.nextSibling.nextSibling;
	
	for(var i=0, len = temp.childNodes.length; i<len; i++) upcoming.parentNode.insertBefore(temp.firstChild, bottom);

	}
	
	
if(GM_getValue("keyboardBrowsing", false)) {

	var glob;

	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
		return [curleft,curtop];
		}


	var selectorBox = new function() {
	
		this.top = document.createElement("div");
		this.top.className = "selectorBox";
		this.top.id = "sbTop";
		this.top.style.top = this.top.style.left = this.top.style.width = this.top.style.height = "0px";
		this.right = this.top.cloneNode(false);
		this.bottom = this.top.cloneNode(false);
		this.left = this.top.cloneNode(false);
		this.right.id = "sbRight";
		this.bottom.id = "sbBottom";
		this.left.id = "sbLeft";
		document.body.appendChild(this.top);
		document.body.appendChild(this.right);
		document.body.appendChild(this.bottom);
		document.body.appendChild(this.left);
		
		this.frameCount = 15;
		this.mspf = 10;
		this.curFrame = 0;
		this.barWidth = parseInt(this.left.offsetWidth);
		
		this.curEl = document.body;
		
		this.moveTo = function(el) {
		
			var elP = findPos(el), elW = el.offsetWidth, elH = el.offsetHeight;
			if(el!=this.curEl) mouseOut(this.curEl);
			
			var w = this.barWidth;
			
			this.animateTo(elP[0], elP[1], elW, elH);
			this.curEl = el;
			mouseOver(el);
			
			};
			
		this.animateTo = function(x, y, w, h) {
			
			if(this.animateID) clearInterval(this.animateID);
			this.curFrame = 0;
			
			var ts = this.top.style;
			var bw = this.barWidth;
			
			this.xStep = (x - ts.left.split("px")[0] - bw)/this.frameCount;
			this.yStep = (y - ts.top.split("px")[0] - bw)/this.frameCount;
			this.wStep = (w - ts.width.split("px")[0] + 2*bw)/this.frameCount;
			this.hStep = (h - this.left.style.height.split("px")[0])/this.frameCount;
			
			this.animateID = setInterval(function(that){that.animateToWorker();}, this.mspf, this);
			
			};
			
		this.animateToWorker = function() {
			
			var w = this.barWidth;
			
			if(this.curFrame >= this.frameCount) {
				this.curFrame = 0;
				var pos = findPos(this.curEl);
				var ce = this.curEl;
				this.setPosition(pos[0], pos[1], ce.offsetWidth, ce.offsetHeight);
				clearInterval(this.animateID);
				}
				
			else {
				
				var t = this.top.style;
				
				this.curFrame++;

				this.setPosition(
					parseFloat(t.left.split("px")[0]) + w + this.xStep,
					parseFloat(t.top.split("px")[0]) + w + this.yStep,
					parseFloat(t.width.split("px")[0]) - 2*w + this.wStep,
					parseFloat(this.left.style.height.split("px")[0]) + this.hStep
					);
					
				
				
				}
			
			};
			
		//given the coordinates and width of a target, move the selectorBox so it is around that target
		this.setPosition = function(x, y, w, h) {
			
			var bw = this.barWidth;
			
			var t = this.top.style;
			var b = this.bottom.style;
			var l = this.left.style;
			var r = this.right.style;
			
			t.top = y - bw + "px";
			l.top = r.top = y + "px";
			t.left = l.left = b.left = x - bw + "px";
			b.top = y + h + "px";
			r.left = x + w + "px";
			t.width = b.width = w + (2*bw) + "px";
			l.height = r.height = h + "px";
			
			};
			
		this.isValidNode = function(el) {
			
			if(!el) return false;
			
			if(el.nodeType!=1 || window.getComputedStyle(el, null).display=="none") return false;
			else {
				var tag = el.tagName.toLowerCase();
				
				switch(tag) {
					case "script":
					case "link":
					case "b":
					case "i":
					case "u":
					case "head":
					case "title":
					case "style":
					case "noscript":
						return false;
					
					default:
						return true;
					
					}
				
				}
			
			};
			
		this.findValidChild = function(el) {
		
			var pChild = el.childNodes[0];
		
			if(!pChild) return el;
			
			if(this.isValidNode(pChild)) return this.isValidForVesti(pChild).child;
		
			else {
				
				while(pChild = pChild.nextSibling) {
					if(this.isValidNode(pChild)) return this.isValidForVesti(pChild).child;
					}
				
				return el;
				
				}
		
			};
			
		this.findValidNextSibling = function(el) {
			
			var pSibling = el.nextSibling;
			
			if(!pSibling) return this.findValidParent(el); 
			
			if(this.isValidNode(pSibling)) return this.isValidForVesti(pSibling).next;
			
			var n = this.findValidNextSibling(pSibling);
			if(n!=pSibling) return n;
				
			return this.findValidParent(el);
			
			};
			
		this.findValidPrevSibling = function(el) {
			
			var pSibling = el.previousSibling;
			
			if(!pSibling) return this.findValidParent(el);
			
			if(this.isValidNode(pSibling)) return this.isValidForVesti(pSibling).prev;
			
			var p = this.findValidPrevSibling(pSibling);
			if(p!=pSibling) return p;
			
			return this.findValidParent(el);
			
			};
			
		this.findValidParent = function(el) {
			
			var pParent = el.parentNode;
			
			if(!pParent) return el;
			
			if(this.isValidNode(pParent)) return this.isValidForVesti(pParent).parent;
			
			var p = this.findValidParent(pParent);
			if(p!=pParent) return p;
			
			return el;
			
			};
			
		this.isActionable = function(el) {
			
			if(el.tagName) var tag = el.tagName.toLowerCase();
			else return false;
			
			switch(tag) {
				case "a":
				case "textarea":
					return true;
				
				case "input":
					var type = el.type;
					switch(type) {
						case "checkbox":
						case "submit":
						case "image":
						case "text":
							return true;
						default:
							return false;
						}
						
				default:
					return false;
				
				}
			
			};
			
		//consumes an element
		//produces the actionable element in that element's subtree, or false if one cannot be found
		this.findValidActionableElement = function(el) {
			
			var pChild = this.findValidChild(el);
				
				while(pChild!=el) {
					vlog(pChild.innerHTML);
					if(this.isActionable(pChild)) return pChild;
					else {
						var a = this.findValidActionableElement(pChild);
						if(a) return a;
						}
						
					var newChild = this.findValidNextSibling(pChild);
					if(newChild==pChild) break;
					else pChild = newChild;
					}
					
				return false;
			
			};
			
		this.findClosestSubLink = function(el, matches) {
			
			var area;
			
			if(area = el.getElementsByClassName("boards_thread_links")[0]) {
				
				var links = area.getElementsByTagName("A");
				var len = links.length;
				
				for(var i=0; i<len; i++) {
					if(matches(links[i])) return links[i];
					}
					
				return false;
				
				}
				
			else if(el.parentNode) return this.findClosestSubLink(el.parentNode, matches);
			else return false;
			
			};
			
		this.isValidForVesti = function(el) {
			
			if(el.className) {
				
				if(el.className=="clear") {
					var n = this.findValidNextSibling(el);
					if(n==el) n = this.findValidPrevSibling(el);
					if(n==el) n = this.findValidParent(el);
					return {valid:false, child:n, parent:this.findValidParent(el), next:n, prev:this.findValidPrevSibling(el)};
					}
				
				}
				
			if(el.id) {
				
				if(el.id=="navigation_content_gutter") {
					var n = this.findValidNextSibling(el);
					return {valid:false, child:n, parent:n, next:n, prev:this.findValidPrevSibling(el)};
					}
					
				else if(el.id=="boards_board_list_table") {
					var c = this.findValidChild(el);
					var p = this.findValidPrevSibling(el);
					return {valid:false, child:c, parent:p, next:c, prev:c};
					}
					
				else if(el.id=="boards_full_width_background") {
					var c = el.childNodes[3];
					var p = document.getElementById("nav_channel");
					return {valid:false, child:c, parent:p, next:c, prev:p};
					}
				
				}
				
			return {valid:true, child:el, parent:el, next:el, prev:el};
			
			};
			
		this.keyHandler = function(e) {
		
			var key = e.which;
			var evt = e.target;
			
			if(!evt.tagName || (evt.tagName!="INPUT" && evt.tagName!="TEXTAREA" && (!evt.className || evt.className!="wysiwyg"))) {
			
				if(!e.ctrlKey && !e.altKey && !e.shiftKey) {
				
					switch(key) {
					
						//enter
						case 13:
							e.preventDefault();
							var target = selectorBox.findValidChild(selectorBox.curEl);
							if(target!=selectorBox.curEl) selectorBox.moveTo(target);
							else {
								var notCanceled = click(target);
								if(target.tagName=="A" && notCanceled) window.location.href = target.href;
								}
							break;
						
						//down, right
						case 40:
						case 39:
							e.preventDefault();
							var curEl = selectorBox.curEl;
							if(!bottomInWindow(curEl)) window.scrollTo(window.pageXOffset, window.pageYOffset+(3*window.innerHeight/4));
							else selectorBox.moveTo(selectorBox.findValidNextSibling(curEl));
							break;
							
						//up, left
						case 38:
						case 37:
							e.preventDefault();
							var curEl = selectorBox.curEl;
							if(!topInWindow(curEl)) window.scrollTo(window.pageXOffset, window.pageYOffset-(3*window.innerHeight/4));
							else selectorBox.moveTo(selectorBox.findValidPrevSibling(curEl));
							break;
							
						//a
						case 65:
							e.preventDefault();
							var target = selectorBox.isActionable(selectorBox.curEl) ? selectorBox.curEl : selectorBox.findValidActionableElement(selectorBox.curEl);
							if(target) {
								selectorBox.moveTo(target);
								var notCanceled = click(target);
								if(target.tagName=="A" && notCanceled) window.location.href = target.href;
								vlog(target.tagName);
								}
							break;
							
						//r
						case 82:
							e.preventDefault();
							function replyMatch(el) {
								return el.href.indexOf("PostReply")!=-1 && el.href.indexOf("quote")==-1;
								}
							click(selectorBox.findClosestSubLink(selectorBox.curEl, replyMatch));
							selectorBox.moveTo(selectorBox.curEl);
							break;
							
						//q
						case 81:
							e.preventDefault();
							function quoteMatch(el) {
								return el.href.indexOf("PostReply")!=-1 && el.href.indexOf("quote")!=-1;
								}
							click(selectorBox.findClosestSubLink(selectorBox.curEl, quoteMatch));
							selectorBox.moveTo(selectorBox.curEl);
							break;
					
						}
				
					}
					
				else if(e.shiftKey && !e.ctrlKey && !e.altKey) {
				
					switch(key) {
					
						//enter
						case 13:
							e.preventDefault();
							selectorBox.moveTo(selectorBox.findValidParent(selectorBox.curEl));
							break;
					
						}
				
					}
				
				}
		
			};
			
		document.addEventListener('keydown', this.keyHandler, true);
		
		this.setPosition(0 + this.barWidth, 
						0 + this.barWidth, 
						window.innerWidth - (2*this.barWidth),
						window.innerHeight - (2*this.barWidth));
	
		};
		
	//selectorBox.moveTo(document.getElementsByClassName("container")[2]);

	}

	
function animateShadeIn(time) {
	
	var op = parseFloat(shadeStyle.opacity);
	if(op < 0.65) shadeStyle.opacity = op + 0.2 + "";
		
	else {
		clearInterval(animateIntervalIn);
		animating = false;
		}
		

	}
	
function animateShadeOut(time) {
	
	var op = parseFloat(shadeStyle.opacity);
	if(op > 0) shadeStyle.opacity = op - 0.2 + "";
		
	else {
		clearInterval(animateIntervalOut);
		shadeStyle.display = "none";
		animating = false;
		}
		

	}

var animateIntervalIn, animateIntervalOut, animating = false, shade, settingsBox, shadeStyle, sbStyle, settingsBeenOn = false;
function showSettings() {

	if(animating) cancelInterval(animateIntervalOut);

	if(!settingsOn) {

	settingsOn = true;
	
	if(!settingsBeenOn) {
	
	settingsBeenOn = true;
	
	var settingsBoxStyle = '' +
	'#settingsBox p {' +
	'margin: 1px;' +
	'line-height: 1.18182em;' +
	'font-weight: bold;' +
	'}' +
	'#settingsBox h3 {' +
	'margin: 1px;' +
	'margin-bottom: 3px;' +
	'padding-top: 3px;' +
	'line-height: 1.18182em;' +
	'font-weight: bold;' +
	'color: #fcfca2;' +
	'border: 0px dotted #cccccc;' +
	'border-bottom-width: 1px !important;' +
	'}' +
	'#settingsBox > #close {' +
	'border-bottom-width: 0px !important;' +
	'position: absolute;' +
	'right: 2px;' +
	'top: 2px;' +
	'cursor: pointer;' +
	'}' +
	'#settingsBox > #VTVersion {' +
	'border-bottom-width: 0px !important;' +
	'position: absolute;' +
	'right: 2px;' +
	'bottom: 2px;' +
	'color: #b1b3bc;' +
	'}' +
	'#settingsBox table {' +
	'border-spacing: 0px;' +
	'}' +
	'#settingsBox #postSettings > h3 {' +
	'margin-right: 20px !important;' +
	'}' +
	'#settingsBox #postSettings1 > div {' +
	'float: left;' +
	'display: inline;' +
	'margin-left: 6px;' +
	'text-align: center;' +
	'}' +
	'#settingsBox #postSettings1 > div:first-child {' +
	'margin-left: 0px;' +
	'}' +
	'#settingsBox #displaySettings {' +
	'clear: left;' +
	'}' +
	'#settingsBox #displaySettings1 > div {' +
	'float: left;' +
	'display: inline;' +
	'text-align: center;' +
	'margin-left: 20px;' +
	'}' +
	'#settingsBox #displaySettings1 > div:first-child {' +
	'margin-left: 0px;' +
	'}' +
	'#settingsBox #displaySettings1 {' +
	'overflow: auto;' +
	'}' +
	'#settingsBox #displaySettings2 {' +
	'margin-top: 10px;' +
	'overflow: auto;' +
	'float: left;' +
	'}' +
	'#settingsBox #displaySettings2 > div {' +
	'text-align: center;' +
	'float: left;' +
	'}' +
	'#settingsBox #displaySettings2 > div:last-child {' +
	'margin-left: 15px;' +
	'}' +
	'#settingsBox #displaySettings2 > div:first-child table {' +
	'display: inline;' +
	'margin-left: 15px;' +
	'}' +
	'#settingsBox input[type="text"] {' +
	'font-size: 11px;' +
	'-moz-user-select: text;' +
	'}' +
	'#settingsBox textarea {' +
	'font-size: 11px;' +
	'-moz-user-select: text;' +
	'padding: 1px 0px;' +
	'}' +
	'#settingsBox .helpButton {' +
	'cursor: pointer;' +
	'}' +
	'#settingsBox #displaySettings input[type="button"] {' +
	'padding: 0px 2px;' +
	'}' +
	'#settingsBox #displaySettings input[type="radio"] {' +
	'margin-top: 0px;' +
	'}' +
	'#settingsBox #postSettings {' +
	'clear: left;' +
	'}' +
	'#settingsBox ul {' +
	'list-style-type: none;' +
	'margin: 0;' +
	'padding: 0;' +
	'float: left;' +
	'display: inline;' +
	'}' +
	'#settingsBox #displaySettings1 ul:nth-child(3) > li {' +
	'margin-top: 5px;' +
	'}' +
	'#settingsBox #displaySettings1 ul:nth-child(3) {' +
	'margin-left: 10px;' +
	'}' +
	'#settingsBox li {' +
	'margin-top: 1px;' +
	'}' +
	'#settingsBox li:first-child {' +
	'margin-top: 0px;' +
	'}' +
	'#settingsBox #saveArea {' +
	'float: left;' +
	'display: inline;' +
	'padding: 32px 23px' +
	'}' +
	'#settingsBox #saveArea > div {' +
	'background-color: #cccccc;' +
	'display: table-cell;' +
	'-moz-border-radius: 4px;' +
	'-moz-box-shadow: 0px 0px 5px 3px #CCCCCC;' +
	'}' +
	'#settingsBox #saveButton, #settingsBox #restoreDefaultsButton {' +
	'padding: 2px;' +
	'margin: 10px 13px;' +
	'}' +
	'';
	
	settingsBox = document.createElement("div");
	settingsBox.id = "settingsBox";
	var masterHTML = '<style type="text/css">' + settingsBoxStyle + '</style>' +
		'<div id="close">' +
			'<img id="closeButtonS" src="data:image/png;base64,' + closeIcon + '">' +
		'</div>' +
		'<div id="VTVersion">' + (/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1]) + ', &copy; ' + (/\/\/\s*@copyright\s+(.*)\s*\n/i.exec(scr_meta)[1]) + '</div>' +
		
		'<div id="postSettings">' +
		
		'<h3>Post Settings</h3>' +
			
			'<div id="postSettings1">' +
			
				'<div>' +
					'<p>Pretext&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="helpButton" id="pretextHelp">?</span></p>' +
					'<textarea id="pretextField" style="width: 200px; height: 98px;" title="Use this field to define text you want inserted automatically into your posts"></textarea>' +
				'</div>' +
			
				'<div>' +
					'<p title="Make the checked off links operate through Vesti Tools instead">Link Hijacking</p>' +
					'<table><td><input type="checkbox" id="topicHijackingButton"></td><td>Topic</td></table></td>' +
					'<table><td><input type="checkbox" id="replyHijackingButton"></td><td>Reply</td></table></td>' +
					'<table><td><input type="checkbox" id="quoteHijackingButton"></td><td>Quote</td></table></td>' +
					'<table><td><input type="checkbox" id="PMHijackingButton"></td><td>PM</td></table></td>' +
					'<table><td><input type="checkbox" id="editHijackingButton"></td><td>Edit</td></table></td>' +
				'</div>' +
				
				'<div>' +
					'<p title="Make your browser window go wherever the post form is redirected to (topic page, usually)">Redirection</p>' +
					'<table><td><input type="checkbox" id="postTopicRedirectionButton"></td><td>Topic</td></table>' +
					'<table><td><input type="checkbox" id="postReplyRedirectionButton"></td><td>Reply</td></table>' +
					'<table><td><input type="checkbox" id="postReplyWERedirectionButton"></td><td title="Reply Without Entering">Reply WE</td></table>' +
					'<table><td><input type="checkbox" id="editRedirectionButton"></td><td>Edit</td></table>' +
					'<table><td><input type="checkbox" id="goHomeButton"></td><td title="Go to the home board on redirect">Go Home</td></table>' +
				'</div>' +
				
				'<div>' +
					'<p title="Make panels appear within the boards instead of floating above it">Integration</p>' +
					'<table><td><input type="checkbox" id="topicIntegrationButton"></td><td>Topic</td></table>' +
					'<table><td><input type="checkbox" id="replyIntegrationButton"></td><td>Reply</td></table>' +
					'<table><td><input type="checkbox" id="PMIntegrationButton"></td><td>PM</td></table>' +
					'<table><td><input type="checkbox" id="panelFollowButton"></td><td title="When you quote a post, the target panel will move under the post">Follow</td></table>' +
					'<table><td><input type="checkbox" id="autoCloseButton"></td><td title="Automatically close panels after posting">Autoclose</td></table>' +
				'</div>' +
				
				'<div>' +
					'<p title="Automatically censor bannable words when the text area is brought out of focus">Autocensor</p>' +
					'<table><td><input type="checkbox" id="autocensorPostsButton"></td><td>Posts</td></table>' +
					'<table><td><input type="checkbox" id="autocensorPMsButton"></td><td>PMs</td></table>' +
					'<table><td><input type="checkbox" id="autocensorContextualButton"></td><td title="Try to censor words that are only bannable in certain contexts">Contextual</td></table>' +
					'<table><td><input type="checkbox" id="useAsterisksButton"></td><td title="Fully censor words with asterisks">Asterisks</td></table>' +
				'</div>' +
				
				'<div>' +
					'<p title="What you type is displayed as it will be seen on the boards">WYSIWYG</p>' +
					'<table><td><input type="checkbox" id="wysiwygDefaultButton"></td><td title="Use the WYSIWYG editor by default">Default</td></table>' +
					'<table><td><input type="checkbox" id="overlayWysiwygButton"></td><td title="Add the WYSIWYG editor and controls around normal forms">Overlay</td></table>' +
				'</div>' +
			
			
			'</div>' +
		
		'</div>' +
		'<div id="displaySettings">' +
		
			'<h3>Display Settings</h3>' +
		
			'<div id="displaySettings1">' +
			
				'<div>' +
					'<p>Position</p>' +
					'<ul>' +
						'<li>Board</li>' +
						'<li><input type="text" id="barxField" size="1" maxlength="4" title="Integer - X coordinate">&nbsp; &nbsp;<input type="text" id="baryField" size="1" maxlength="4" title="Integer - Y coordinate"></li>' +
						'<li>Topic</li>' +
						'<li><input type="text" id="barxTField" size="1" maxlength="4" title="Integer - X coordinate">&nbsp; &nbsp;<input type="text" id="baryTField" size="1" maxlength="4" title="Integer - Y coordinate"></li>' +
						'<li>Update Freq</li>' +
						'<li><input type="text" id="updateDaysField" size="1" maxlength="1" title="Positive Integer - Update checking frequency in days"></li>' +
					'</ul>' +
				'</div>' +
				
				'<div>' +
					'<p title="Automatically refresh regularly updated content">Autorefresh</p>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="autorefreshButton"></td><td title="Autorefresh the list of topics on a board">Topics</td></table></li>' +
						'<li><input type="text" id="autorefreshIntField" size="5" maxlength="7" title="Positive Integer - Refresh frequency in milliseconds"></li>' +
						'<li><table><td><input type="checkbox" id="autorefreshPMCountButton"></td><td title="Autorefresh your new PM count">PM Count</td></table></li>' +
						'<li><input type="text" id="autorefreshPMCountIntField" size="5" maxlength="7" title="Positive Integer - Refresh frequency in milliseconds"></li>' +
					'</ul>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="autorefreshRepliesButton"></td><td title="Autorefresh replies in a topic">Replies</td></table></li>' +
						'<li><input type="text" id="autorefreshRepliesIntField" size="5" maxlength="7" title="Positive Integer - Refresh frequency in milliseconds"></li>' +
						'<li><table><td><input type="checkbox" id="autorefreshEditsButton"></td><td title="Catch and display new edits on autorefresh">Edits</td></table></li>' +
						'<li><table><td><input type="checkbox" id="autorefreshPollsButton"></td><td title="Catch and display poll changes on autorefresh - will get rid of hidden option">Polls</td></table></li>' +
					'</ul>' +
				'</div>' +
				
				'<div>' +
					'<p>WULs</p>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="WULLinksButton"></td><td title="Display WUL links under each post in a topic">Links</td></table></li>' +
						'<li><table><td><input type="checkbox" id="autoWULButton"></td><td title="Automate the WUL/deWUL process for as many users as you like at once">AutoWUL</td></table></li>' +
					'</ul>' +
				'</div>' +
			
				'<div>' +
					'<p title="Make an ignored user`s icon and posts disappear">Ignore</p>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="ignoreUsersButton"></td><td title="Enforce your ignore list">Ignore Users</td></table></li>' +
						'<li><input type="button" id="eraseIgnoreListButton" value="Erase List" title="Erase your list of ignored users"></li>' +
						'<li><table><td><input type="checkbox" id="ignoreLinksButton"></td><td title="Display Show/Hide and Ignore buttons under each post.  Ignored posts always include these.">Links</td></table></li>' +
						'<li><input type="text" id="manualIgnoreField" size="9" maxlength="30" value="Add/Remove" title="String - The exact name of a user you want to ignore or unignore.  Press enter to submit change."></li>' +
					'</ul>' +
				'</div>' +
				
				'<div>' +
					'<p>Drop Shadows</p>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="useDropShadowsButton"></td><td title="Apply drop shadows">Enable</td></table></li>' +
						'<li>Offset</li>' +
						'<li><input type="text" id="offsetxField" maxlength="3" style="width:20px;" title="Integer - How much the drop shadow should be shifted horizontally">&nbsp; &nbsp;<input type="text" id="offsetyField" maxlength="3" value="' + GM_getValue("offsety", 4) + '" style="width:20px;" title="Integer - How much the drop shadow should be shifted vertically"></li>' +
					'</ul>' +
					'<ul>' +
						'<li>Blur&nbsp; &nbsp;<input type="text" id="dropShadowBlurField" maxlength="2" style="width:15px;" title="Positive Integer - How much the drop shadow should be blurred"></li>' +
						'<li>Size&nbsp; &nbsp;<input type="text" id="dropShadowSizeField" maxlength="3" style="width:20px;" title="Integer - How large the drop shadow should be relative to the caster"></li>' +
						'<li>Opacity&nbsp; &nbsp;<input type="text" id="dropShadowIntensityField" maxlength="1" style="width:10px;" title="Positive Integer - How dark the drop shadow should be"></li>' +
					'</ul>' +
				'</div>' +
			
			'</div>' +
			
			'<div id="displaySettings2">' +
				
				'<div>' +
					'<p title="Custom colors for each user.  Uses same colors as IGNBQ.">Usercolors</p>' +
					'<ul>' +
						'<li><table><td><input type="checkbox" id="applyUsercolorsButton"></td><td title="Apply usercolors">Apply</td></table></li>' +
						'<li><input type="button" id="refreshUsercolorsButton" value="Refresh" title="Update the usercolor list - if you just changed your color, this will automatically trigger"></li>' +
						'<li><input type="button" id="postUsercolorsButton" value="Post" title="Post your usercolors to the server"></li>' +
					'</ul>' +
					'<table style="border-spacing: 2px;">' +
					'<tr><td colspan="2"><span id="colorPreview" style="background-color:transparent;color:#000099;font-family:verdana,arial,sans-serif;font-size:10pt;font-weight:bold;text-decoration:none;font-style:normal;" title="Preview of your usercolors"></span></td></tr>' +
					'<tr><td><div style="display:table-cell;padding-left: 1px;">#<input type="text" id="colorField" size="5" maxlength="6" style="margin-bottom: 2px;height:11px;margin: 1px 3px 1px 1px;" title="Six character CSS color - Text color of your username.  For normal colors, erase this field."></td></div> <td><select id="weightSelect" value="bold" title="Font weight"><option value="normal">Normal</option><option value="bold">Bold</option></select></td> </tr>' +
					'<tr><td><div style="display:table-cell;padding-left: 1px;">#<input type="text" id="bgcolorField" size="5" maxlength="6" style="margin-bottom: 2px;height:11px;margin: 1px 3px 1px 1px;" title="Six character CSS color - Background color of your username.  For normal colors, erase this field."></td></div> <td><select id="styleSelect" value="normal" title="Font style"><option value="normal">Normal</option><option value="italic">Italics</option></select></td> </tr>' +
					'<tr><td><div style="display:table-cell;padding-left: 1px;">#<input type="text" id="bordercolorField" size="5" maxlength="6" style="margin-bottom: 2px;height:11px;margin: 1px 3px 1px 1px;" title="Six character CSS color - Border color of your username.  For normal colors, erase this field."></td></div> <td><select id="decorationSelect" value="none" title="Font decoration"><option value="none">None</option><option value="overline">Over</option><option value="underline">Under</option><option value="line-through">Strike</option></select></td> </tr>' +
					'</table>' +
				'</div>' +
				
				'<div>' +
					'<p title="Vesti Wiki search and post buttons">Integrated Tools</p>' +
						'<table><td><input type="checkbox" id="integrateToolsButton"></td><td title="Add Vesti Wiki search and post buttons to the boards">Integrate tools</td></table>' +
						'<table><td><input type="checkbox" id="searchWikiTabButton"></td><td title="Open Vesti Wiki search results in a new tab">Search in new tab</td></table>' +
						'<table><td><input type="checkbox" id="extraBoardOptionsButton"></td><td title="Clicking Board Options opens a drop down menu with helpful links">Extra board options</td></table>' +
				'</div>' +
			
			'</div>' +
			
			'<div id="saveArea">' +
			
				'<div>' +
				'<input type="button" id="saveButton" value="Save">' +
				'<input type="button" id="restoreDefaultsButton" value="Restore Defaults" title="WRANING: This will delete all stored data (ignore list, usercolors, etc.) and its changes are permanent">' +
				'</div>' +
			
			'</div>' +
		
		'</div>' +
		'';
	
	
	settingsBox.innerHTML = masterHTML;
	
	document.body.appendChild(settingsBox);
	settingsBox = document.getElementById("settingsBox");
	sbStyle = settingsBox.style;
	
	shade = document.createElement("div");
	shade.id = "settingsShade";
	shade.style.opacity = "0.05";
	document.body.appendChild(shade);
	shade = document.getElementById("settingsShade");
	shadeStyle = shade.style;
	
	document.addEventListener('click', function(event) {
	
		if(event.which==1) {
		
			var myid = event.target.id;
			var evt = event.target;
		
			switch(myid) {
				case "settingsShade":
				case "closeButtonS":
					closeSettings();
					break;
				case "saveButton":		
					saveSettings();
					closeSettings();
					break;
				case "manualIgnoreField":
					if(evt.value=="Add/Remove" || evt.value=="Added." || evt.value=="Removed.") evt.value = '';
					break;
				case "restoreDefaultsButton":
					if(evt.value=="Restore Defaults" || evt.value=="Done.") evt.value = "You sure?";
					else { 
						var vals = GM_listValues();
						for(var i=0, len=vals.length; i<len; i++) GM_deleteValue(vals[i]); 
						loadSettings(); 
						evt.value = "Done."; 
						}
				}
			}
		
		}, true);
		
	document.addEventListener('focus', function(e) {
		
		var id = e.target.id;
		
		if(id == 'colorField' || id == 'bgcolorField' || id== 'bordercolorField') {
			var pos = findPos(e.target);
			colorSelector.create(e.target, pos[0], pos[1], function(){}, function(){});
			}
		
		}, true);
		
	document.addEventListener('keyup', function(event) {
	if(settingsOn) {

		var evt = event.target;
	
		switch(evt.id) {
			case"colorField":
			
				UCcolor = evt.value;
				if(UCcolor!="null" && UCcolor!="") evt.parentNode.style.backgroundColor = document.getElementById("colorPreview").style.color = "#" + UCcolor;
				else {
					UCcolor = "null";
					evt.parentNode.style.backgroundColor = "transparent";
					document.getElementById("colorPreview").style.color = "#000099";
					}
			
				break;
				
			case "bgcolorField":
			
				UCbgcolor = evt.value;
				if(UCbgcolor!="null" && UCbgcolor!="") evt.parentNode.style.backgroundColor = document.getElementById("colorPreview").style.backgroundColor = "#" + UCbgcolor;
				else {
					UCbgcolor = "null";
					evt.parentNode.style.backgroundColor = document.getElementById("colorPreview").style.backgroundColor = "transparent";
					}
			
				break;
				
			case "bordercolorField":
			
				UCbordercolor = evt.value;
			
				if(UCbordercolor!="null" && UCbordercolor!="") {
					evt.parentNode.style.backgroundColor = "#" + UCbordercolor;
					document.getElementById("colorPreview").style.border = "1px solid #" + UCbordercolor;
					}
				else {
					UCbordercolor = "null";
					evt.parentNode.style.backgroundColor = "transparent";
					document.getElementById("colorPreview").style.borderWidth = "0px";
					}
					
				break;
				
			case "manualIgnoreField":
			
				if(event.which == 13) {
					if(GM_getValue("ignoreList", "").indexOf(evt.value)==-1) {
						GM_setValue("ignoreList", GM_getValue("ignoreList", "") + evt.value + ",");
						evt.value = "Added.";
						}
					else {
						GM_setValue("ignoreList", GM_getValue("ignoreList", "").replace(evt.value + ",", ""));
						evt.value = "Removed.";
						}
					}
					
				break;
			
			}
		}
		}, true);
		
		logListener("document[keyup]{UCcolors}");
		
	document.addEventListener('change', function(event) {

		var myid = event.target.id;

		switch(myid) {
			case "weightSelect":
				UCweight = event.target.value;
				document.getElementById("colorPreview").style.fontWeight = UCweight;
				break;
			case "styleSelect":
				UCstyle = event.target.value;
				document.getElementById("colorPreview").style.fontStyle = UCstyle;	
				break;
			case "decorationSelect":
				UCdecoration = event.target.value;
				document.getElementById("colorPreview").style.textDecoration = UCdecoration;
				break;
			}

		}, true);
		
		logListener("document[change]{UCstyle}");
	
	}//settingsBeenOn
	
	loadSettings();
	sbStyle.display = "inline";
	sbStyle.left = ((1 - (settingsBox.offsetWidth / window.innerWidth))*50) + "%";
	sbStyle.top = ((1 - (settingsBox.offsetHeight / window.innerHeight))*50) + "%";
	
	shadeStyle.display = "inline";
	
	animateIntervalIn = setInterval(animateShadeIn, 33);
	animating = true;
		
	}//settingsOn
	
	}
	
var trueButtonList = ["topicHijacking", "replyHijacking", "quoteHijacking", "PMHijacking", "editHijacking",  
"topicIntegration", "replyIntegration", "PMIntegration", "panelFollow", "autocensorPosts", "autocensorContextual", "wysiwygDefault", 
"autorefresh", "autorefreshPMCount", "autorefreshReplies", "autorefreshEdits", "autorefreshPolls", "WULLinks", "autoWUL", "ignoreUsers", 
"ignoreLinks", "useDropShadows", "applyUsercolors", "integrateTools", "searchWikiTab", "extraBoardOptions"];

var falseButtonList = ["postTopicRedirection", "postReplyRedirection", "postReplyWERedirection", "editRedirection", "goHome", "autoClose", "autocensorPMs", 
"useAsterisks", "overlayWysiwyg"];
	
function loadSettings() {

	try {
	
	var name;

	for(var i=trueButtonList.length - 1; i>=0; i--) {
		
		name = trueButtonList[i];
	
		document.getElementById(name + "Button").checked = GM_getValue(name, true) ? true : false;
		
		}
		
	for(var i=falseButtonList.length - 1; i>=0; i--) {
		
		name = falseButtonList[i];
	
		document.getElementById(name + "Button").checked = GM_getValue(name, false) ? true : false;
		
		}
		
	
	document.getElementById("pretextField").value = GM_getValue("pretext", "[before][quote=[author]][/before]\n[after][/quote]\n\n[cursor][/after]");
		
	document.getElementById("barxField").value = GM_getValue("barx", "20");
	document.getElementById("baryField").value = GM_getValue("bary", "10");
	document.getElementById("barxTField").value = GM_getValue("barxT", "20");
	document.getElementById("baryTField").value = GM_getValue("baryT", "10");
	
	document.getElementById("updateDaysField").value = GM_getValue("updateDays", 1);
	
	document.getElementById("autorefreshIntField").value = GM_getValue("autorefreshInt", 5000);
	document.getElementById("autorefreshPMCountIntField").value = GM_getValue("autorefreshPMCountInt", 5000);
	document.getElementById("autorefreshRepliesIntField").value = GM_getValue("autorefreshRepliesInt", 5000);
	
	document.getElementById("offsetxField").value = GM_getValue("offsetx", 4);
	document.getElementById("offsetyField").value = GM_getValue("offsety", 4);
	document.getElementById("dropShadowBlurField").value = GM_getValue("dropShadowBlur", "2");
	document.getElementById("dropShadowSizeField").value = GM_getValue("dropShadowSize", "-2");
	document.getElementById("dropShadowIntensityField").value = GM_getValue("dropShadowIntensity", 5);
	
	document.getElementById("colorField").value = UCcolor;
	document.getElementById("bgcolorField").value = UCbgcolor;
	document.getElementById("bordercolorField").value = UCbordercolor;
	document.getElementById("colorField").parentNode.style.backgroundColor = "#" + UCcolor;
	document.getElementById("bgcolorField").parentNode.style.backgroundColor = "#" + UCbgcolor;
	document.getElementById("bordercolorField").parentNode.style.backgroundColor = "#" + UCbordercolor;
	
	var cp = document.getElementById("colorPreview");
	var cps = cp.style;
	if(UCbordercolor!="") cps.border = "1px solid #" + UCbordercolor;
	if(UCbgcolor!="") cps.backgroundColor = "#" + UCbgcolor;
	if(UCcolor!="") cps.color = "#" + UCcolor;
	if(UCweight!="") cps.weight = document.getElementById("weightSelect").value = UCweight;
	if(UCstyle!="") cps.fontStyle = document.getElementById("styleSelect").value = UCstyle;
	if(UCdecoration!="") cps.textDecoration = document.getElementById("decorationSelect").value = UCdecoration;
		
	cp.innerHTML = username;

	}catch(e) { logError("loadSettings", e); }
	
	}
	
var buttonList = trueButtonList.concat(falseButtonList);

var fieldList = ["pretext", "autorefreshInt", "autorefreshPMCountInt", "autorefreshRepliesInt", "barx", "bary", "barxT", "baryT", 
"dropShadowIntensity", "offsetx", "offsety", "dropShadowBlur", "dropShadowSize", "updateDays"];

function saveSettings() {
	try{
	
	var name;

	for(var i=buttonList.length - 1; i>=0; i--) {
		
		name = buttonList[i];
	
		GM_setValue(name, (document.getElementById(name + "Button").checked) ? true : false);
		
		}
		
	for(var i=fieldList.length - 1; i>=0; i--) {
		
		name = fieldList[i];
	
		GM_setValue(name, document.getElementById(name + "Field").value);
		
		}

	}catch(e) { logError("saveSettings", e); }
	}
	
function closeSettings() {
		
	if(animating) cancelInterval(animateIntervalIn);
		
	settingsOn = false;
	sbStyle.display = "none";
	animateIntervalOut = setInterval(animateShadeOut, 33);
	animating = true;

	}
	
/*var colorSelector = new function() {
	
	this.div = null;
	this.curTarget = null;
	this.curChangeFunc = null;
	this.on = false;
	this.drawn = false;
	
	
	
	
	this.create = function(target, x, y, changeFunc, endFunc) {
		
		if(this.curTarget != target) {
		
			this.curTarget = target;
		
			if(!this.drawn) {
				
				var temp = document.createElement("div");
				temp.className = "colorSelector";
				var masterString = '' +
				'<div class="valSat"></div>' +
				'<div class="hue"></div>' +
				'<div class="preview"></div>' +
				'<div class="input">' +
					'<input type="text" class="hex">' +
				'</div>' +
				'';
				temp.innerHTML = masterString;
				this.div = temp;
				this.hex = this.div.getElementsByClassName("hex")[0];
				document.body.appendChild(this.div);
				
				this.drawn = true;
				
				}
			else {
				
				this.hex.removeEventListener('change', this.curChangeFunc, true);
				
				
				}
				
			this.hex.addEventListener('change', changeFunc, true);
				
			this.curChangeFunc = changeFunc;
				
			this.div.style.left = x + "px";
			this.div.style.top = y + "px";
			
			this.curTarget = target;
			
			}
		
		}
	
	}*/
	
	
GM_registerMenuCommand("Vesti Tools Settings", showSettings);
	
time.stop('overall');
time.report();
vlog("AAUS");
	
//--------------------------------------------------

} catch(e) { logError("External", e); }
}//Stop stuff to do only outside of frame


//Do stuff to the posting page when it's in the iframe

else if (top != window) {

}


//Another Auto Update Script code
//Michael Medley <medleymind@gmail.com>

aaus_38017={
i:'49581', // Script id on Userscripts.org
d:updateDays, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match("the page you requested doesn't exist")||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();

}

else {
vlog("User did not agree to EULA");
}

}catch(e) { GM_log("Gawdamit: " + e.message); }