// Reshare Connections Board Posts
// version 2.2
// 2011-03-18
// Copyright (c) 2011, IBM, Steven Levithan
// It's free with a lifetime of dedication to the Ol' Big Blue.
//
// Got trim11 javascript trim function from http://blog.stevenlevithan.com/archives/faster-trim-javascript
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
// select "Reshare Connections Board Posts", and click Uninstall.
//
// version 2.2 - fixed bug with multiple [ReShare...]'s
// version 2.1 - updated with Roman Lienard's fix to link names...thanks roman!
// version 2.0 - updated to work on w3-connections
// version 1.4 - fixed problem with positioning not working in Firefox
// version 1.3 - added support for Profiles pages
// version 1.2 - added support for Home homepage
// version 1.1 - fixed compatibility issue with Linkify, delay after Linkify and grab innerHTML of a tags
// version 1.0 - released
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Reshare Connections Board Posts
// @namespace   http://argh.bluehost.ibm.com/connections/
// @description Reshare other peoples' board posts on your own profile board
// @include	http*://*.ibm.com/profiles/html/searchProfiles.do*
// @include	http*://*.ibm.com/profiles/home.do*
// @include	http*://*.ibm.com/homepage*
// @include	http*://*.ibm.com/profiles/html/*rofileView.do*
// ==/UserScript==

(function() {
	window.setTimeout(doit, 6000);
	document.addEventListener("click", doitTimeout, true);

	// create reshare box
	var s = document.createElement("script");
	s.type = "text/javascript";

	var s1 = "var ol=document.createElement('div');ol.id='floatingStatus';ol.setAttribute('userid', key);ol.style.display='none';ol.style.border='1px solid #888888';ol.style.background='#ffffff';ol.style.padding='10px';ol.style.position='absolute';ol.style.zIndex=3000;document.getElementsByTagName('body')[0].appendChild(ol);var sp=document.createElement('span');sp.innerHTML='ReShare on your Profile Board!';ol.appendChild(sp);var form=document.createElement('form');form.id='shareForm';form.className='lotusForm';form.innerHTML='<input type=\"hidden\" value=\"'+key+'\" name=\"key\" /><input type=\"hidden\" value=\"status\" name=\"messageType\" /><label class=\"lotusAccess\" for=\"shareTextArea\">What are you working on?</label><textarea id=\"shareTextArea\" name=\"message\" style=\"width:500px;height:100px\"></textarea>';ol.appendChild(form);var div=document.createElement('div');div.id='sharePostDiv';div.innerHTML='<input type=\"submit\" title=\"Post Status\" class=\"lotusFormButton\" value=\"Save\" onclick=\"";
	var s2 = "\" /><a href=\"javascript:;\" onclick=\"document.getElementById(&apos;floatingStatus&apos;).style.display=&apos;none&apos;\" class=\"lotusAction\">Cancel</a>';ol.appendChild(div);";

	if (document.location.href.indexOf("homepage") == -1) {
		s.innerHTML = "var key = profilesData.loggedInUser.loggedInUserKey;" + s1 + "lconn.profiles.Wall.xhrPost(&apos;/ajax/postWallEntry.do&apos;, profilesData.loggedInUser.loggedInUserKey, &apos;PROFILES&apos;, &apos;ALL&apos;, &apos;&apos;, &apos;shareForm&apos;, function(data) { }); document.getElementById(&apos;floatingStatus&apos;).style.display=&apos;none&apos;" + s2;
	} else {
		s.innerHTML = "var key = userid;" + s1 + "var _f9={url:&apos;/profiles/atom/forms/mv/theboard/entry/status.do?forceRefresh='+(new Date()).valueOf()+'&apos;,headers:{X_LConn_MV_Message_Summary:dojox.encoding.base64.encode(convertToBytes(document.getElementById(&apos;shareTextArea&apos;).value)),X_LConn_MV_Message_Type:&apos;status&apos;},load:function(data){},handleAs:&apos;xml&apos;};(new lconn.core.AjaxRequestsHandler()).xhrPost(_f9); document.getElementById(&apos;floatingStatus&apos;).style.display=&apos;none&apos;" + s2 + " function convertToBytes(s){var bs=[];for(var i=0;i<s.length;i++){if(s.charCodeAt(i)>127){var hex='';hex=encodeURI(s.charAt(i));hex=hex.replace(/\%/g,'');for(var j=0;j<hex.length;j+=2){var _fb=hex.substring(j,j+2);bs.push(0+parseInt(_fb,16));}}else{bs.push(0+s.charCodeAt(i));}}return bs;}";
	}
	document.getElementsByTagName("body")[0].appendChild(s);	
})();

function doitTimeout() {
	window.setTimeout(doit, 3000);
	// sometimes the 3 second timeout is not enough
	window.setTimeout(doit, 10000);
}
function doit() {

	var currpage = document.location.href;
	if (currpage.indexOf("/profiles") > -1) {
		var pc = document.evaluate("//div[starts-with(@class, 'lotusPostContent')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (pc) {
			for (var i=0; i<pc.snapshotLength; i++) {
				var div = pc.snapshotItem(i);
				if (div.parentNode.parentNode.className && div.parentNode.parentNode.className.indexOf("lotusCommentItem") > -1) {
					continue;
				}
				if (div.getAttribute("rsed")) {
					continue;
				}
				div.setAttribute("rsed", "1");

			var user = "", text = "", htmlText = "";
			
			//lotusPostDetails
			var dt = div.getElementsByTagName("div")[0];
			if (dt.className == "lotusPostDetails") {
			   var dts = dt.getElementsByTagName("span");
			   for (var c=0; c<dts.length; c++) {
				var n = dts[c];
				if (n.className == "vcard") {
					user = trim11(n.getElementsByTagName("a")[0].innerHTML);
				} else if (n.id && n.id.indexOf("_status") > -1) {
					text = getInnerText(n);
                                        htmlText = n.innerHTML.replace(/\[ReShare from (.*?)\]/g,"[ReShare from <a href='https://w3-connections.ibm.com/profiles/html/simpleSearch.do?searchBy=name&searchFor=$1'>$1</a>]");
                                        n.innerHTML = htmlText;
				}
			   }
			   if (user != "") {
				var ac = document.evaluate(".//div[starts-with(@id, 'wallEntryActionsArea')]",div.parentNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (ac && ac.snapshotLength > 0) {
					for (var j=0; j<ac.snapshotLength; j++) {
						var item = ac.snapshotItem(j);
						
			        var fn = "";

				text = text.replace(/\'/g, "\\&apos;");
				text = text.replace(/\"/g, "\\&quot;");
				user = user.replace(/\'/g, "\\&apos;");
			
				fn = "document.getElementById(&quot;shareTextArea&quot;).value = &quot;[ReShare from " + user + "] " + trim11(text) + "&quot;;var fs=document.getElementById(&quot;floatingStatus&quot;);fs.style.top=document.documentElement.scrollTop+document.body.scrollTop+&quot;px&quot;;fs.style.display=&quot;block&quot;;";

				
						var li = document.createElement("span");
						li.innerHTML = "&nbsp;|&nbsp;<a class=\"lotusAction\" href=\"javascript:;\" onclick=\"" + fn + "\">ReShare</a>";
						li
						item.appendChild(li);

						
					}
				} 
			   } // end if user
			} // end if
			} // end for
		}
	} else if (currpage.indexOf("/homepage") > -1) {
		var pc = document.evaluate("//div[starts-with(@id, 'status-update-container')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (pc) { 
			for (var i=0; i<pc.snapshotLength; i++) {
				var div = pc.snapshotItem(i);
				if (div.getAttribute("rsed")) {
					continue;
				}
				div.setAttribute("rsed", "1");

				// lotusPostDetails
				var user = "", text = "", htmlText = "";

				var plainDivs = document.evaluate("./div[1]//div[@class='lotusHomepageIndent45']/div",div,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (plainDivs && plainDivs.snapshotLength == 2) {
				   var ckids= plainDivs.snapshotItem(0).childNodes;
				   for (var ck=0; ck<ckids.length; ck++) {
					  var n = ckids[ck]; 
					  if (n.nodeName.toLowerCase() == "span" && n.className == "lotusLeft") {
						if (user != "") {
							user = "";
						} else {
						  var akids = n.getElementsByTagName("span")[0].getElementsByTagName("a")[0].childNodes;
						  for (var a=0; a<akids.length; a++) {
						  	if (akids[a].nodeName == "#text") {
						 		user = trim11(akids[a].nodeValue);
							}
					 	  }
						}
					  } 
				    }
					var textdiv = plainDivs.snapshotItem(1);
					text = getInnerText(textdiv);
					htmlText = textdiv.innerHTML.replace(/\[ReShare from (.*?)\]/g,"[ReShare from <a href='https://w3-connections.ibm.com/profiles/html/simpleSearch.do?searchBy=name&searchFor=$1'>$1</a>]");
                                        textdiv.innerHTML = htmlText;
				}
				var ac = document.evaluate(".//ul[@class='lotusInlinelist']",div,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
					if (ac) {				
						for (var j=0; j<ac.snapshotLength; j++) {
							if (user != "") {
							var item = ac.snapshotItem(j); 
							var li = document.createElement("li");
							var rs = document.createElement("a");
							rs.className = "lotusAction";
							rs.href = "javascript:;";
							rs.innerHTML = "ReShare";
							
							text = text.replace(/\'/g, "\\\'");
							text = text.replace(/\"/g, "\\\"");
							user = user.replace(/\'/g, "\\\'");

						var fn2 = "document.getElementById(\"shareTextArea\").value = \"[ReShare from " + user + "] " + trim11(text) + "\";var fs=document.getElementById(\"floatingStatus\");fs.style.top=document.documentElement.scrollTop+document.body.scrollTop+\"px\";fs.style.display=\"block\";";
						rs.setAttribute("onclick", fn2);	

							rs.setAttribute("onclick", fn2);
							li.appendChild(rs);
							item.appendChild(li);	
							}
						}
					}
			}
		}
	}
}

function getInnerText(node) {
	var text = "";
	for (var i=0; i<node.childNodes.length; i++) {
		var n = node.childNodes[i];
		if (n.nodeName == "#text") { /*it's text*/
			text += trim11(n.nodeValue);
		} else if (n.nodeName.toLowerCase() == "a") {
			text += " " + n.innerHTML + " ";
		} else {
			text += getInnerText(n);
		}
	}
	return text;
}

function trim11 (str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}
