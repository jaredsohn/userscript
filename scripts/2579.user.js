// Copyright (C) 1997-2004  Daniel W. Crompton <daniel.crompton@gmail.com>
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA
//
// CVSVERSION: $Id: $
//
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
// select "Name of Module", and click Uninstall.
//
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name	  Ryze/OpenBC Private Message in WebMail
// @namespace	  http://www.rphh.org/
// @description	  v2.1 Include Private Message Text from Ryze/OpenBC/ecademy/Academici in Gmail/Yahoo! Mail/Hotmail/SquirrelMail
// @include		http://*.mail.yahoo.com/*
// @include		http://*.hotmail.msn.com/*
// @include		https://mail.google.com/mail/*
// @include		http*://squirrelmail.host/src/*
// @exclude	  file:///*
// @version	  2.1
// ==/UserScript==


// Execute on page load
(function () {
 var _base = document.createElement("BASE");
 _base.href="";

  function include_prvmsg_from_ecademy(_str, _elem) {
//		alert("ECADEMY");
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<hr /><p><small><font color=\"#666666\">",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val+38,
								responseDetails.responseText.indexOf(
									"<br /><br /></div><hr /><br />",
									_val+4
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.ecademy.com/\" target=\"_blank\"/>"+ _privmsg);
				}
		});
	}

  var _INC_TOP_CNT=0;
 	function include_topic_from_ryze(_str, _elem) {
		if(_INC_TOP_CNT) return 0;
    else _INC_TOP_CNT++;
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<table width=\"100%\" align=\"center\" cellpadding=\"6\" cellspacing=\"0\">",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val+67,
								responseDetails.responseText.indexOf(
									"</td></tr></table></td></tr></table></td></tr></table>",
									_val+4
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.ryze.com/\" target=\"_blank\"/>"+ _privmsg);
					//alert(div_elem.contentDocument.);
				}
		});
	}

 	function include_pubmsg_from_ryze(_str, _elem) {
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<!--  third row -->",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val+20,
								responseDetails.responseText.indexOf(
									"</td></tr></table>",
									_val+4
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.ryze.com/\" target=\"_blank\"/>"+ _privmsg);
					//alert(div_elem.contentDocument.);
				}
		});
	}

 	function include_prvmsg_from_ryze(_str, _elem) {
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<table cellpadding=4 width=450><tr><td><font size=+1>",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val+53,
								responseDetails.responseText.indexOf(
									"</font></td></tr></table>",
									_val+4
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.ryze.com/\" target=\"_blank\"/>"+ _privmsg);
					//alert(div_elem.contentDocument.);
				}
		});
	}

 	function include_prvmsg_from_openbc(_str, _elem) {
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<!-- message -->",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val,
								responseDetails.responseText.indexOf(
								"<!-- /message -->",
									_val
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.openbc.com/\" target=\"_blank\"/>"+ _privmsg);
				}
		});
	}

 	function include_prvmsg_from_academici(_str, _elem) {
		var div_elem = document.createElement("IFRAME");
		div_elem.style.border = 0;
		div_elem.style.border = 0;
		div_elem.width = "100%";
		div_elem.height = "100%";
		_elem.parentNode.replaceChild(div_elem,_elem);

		GM_xmlhttpRequest({
				method: "GET",
				url: _str,
				headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Accept": "text/xml,application/xml,application/xhtml+xml,text/html",
				},
				onload: function(responseDetails) {
				/*
						alert('Returned ' + responseDetails.status +
									' ' + responseDetails.statusText + '\n\n' +
									'Feed data:\n' + responseDetails.responseText);
									*/
					var _val = responseDetails.responseText.indexOf(
								"<!-- message -->",
								0
							);
					var _privmsg = responseDetails.responseText.substring(
								_val,
								responseDetails.responseText.indexOf(
								"<!-- /message -->",
									_val
								)
							);
					div_elem.contentDocument.write("<BASE href=\"http://www.openbc.com/\" target=\"_blank\"/>"+ _privmsg);
				}
		});
	}

 	/*
		 if message contains:
	http://www.ryze.com/privmsgdisplay.php*
		include block text
	 */
	// DEFINES
	var _A_elem = document.getElementsByTagName("A");
	var i, it;
	var _ar = new Array(
			new Array(
					"http://www.ryze.com/posttopic.php",
					"http://www.ryze.com/postdisplay.php",
					"http://www.ryze.com/privmsgdisplay.php",
					"http://www.ecademy.com/module.php.mod=network&op=contact",
					"http://www.openbc.com/go/msg/",
					"http://www.academici.com/go/msg/"
			),
			new Array(
					function(_str, _elem) { include_topic_from_ryze				(_str, _elem); },
					function(_str, _elem) { include_pubmsg_from_ryze			(_str, _elem); },
					function(_str, _elem) { include_prvmsg_from_ryze			(_str, _elem); },
					function(_str, _elem) { include_prvmsg_from_ecademy		(_str, _elem); },
					function(_str, _elem) { include_prvmsg_from_openbc		(_str, _elem); },
					function(_str, _elem) { include_prvmsg_from_academici	(_str, _elem); }
			)
		);
	//alert(_ar);
  
	for( i = 0; i < _A_elem.length; i++)
		for( it = 0; it < _ar[0].length; it++) {
			//if((_A_elem.item(i).href.match(_ar[0][it]))) alert(_A_elem.item(i).href);
			if(_A_elem.item(i).href.match(_ar[0][it]))
			{
			//	alert(""+i+":"+it+" - "+_ar[0][it]);
				try {
					_ar[1][it](_A_elem.item(i).href, _A_elem.item(i));
				} catch(e) {
					alert(e);
				}
			}
		}
	/*
	var _match_str_ryze		= "http://www.ryze.com/privmsgdisplay.php";
	var _match_str_openbc	= "http://www.openbc.com/go/msg/";

	for( i = 0; i < _A_elem.length; i++)
		if(_A_elem.item(i).href.match(_match_str_ryze) == _match_str_ryze)
			include_prvmsg_from_ryze(_A_elem.item(i).href, _A_elem.item(i));
		else if(_A_elem.item(i).href.match(_match_str_openbc) == _match_str_openbc)
			include_prvmsg_from_openbc(_A_elem.item(i).href, _A_elem.item(i));
			*/
})(); 



