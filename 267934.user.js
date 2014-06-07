// ==UserScript==
// @name           OGameBadWordFinder
// @namespace      ogame-team.de/go-scripts
// @description    Findet BadWords in Allianznamen
// @include        http://*.ogame.*/game/admin2/uebersicht.php?session=*&allianz*
// @version        20130112
// ==/UserScript==
//** Copyright © 2011 by Holunder für die ogame.de Community. **
//** based on the BadCharFinder from Kelder/ogame.org**




(function() {

	embedFunction(DoModify);
	var header = document.evaluate('/html/body/div[@class="contbox"]/div[2]/div[1]/h3[1]', document, null, XPathResult.ELEMENT_NODE, null).iterateNext();
	GM_addStyle( '#GM_ActivateButton { margin-left:20px; }');
	var activateButton = createEl({n: 'button', a: {'@id':'GM_ActivateButton', name:'GM_ActivateButton', textContent: 'Bad-Word-Check starten' }},header)
						.addEventListener('click',DoModify,true);




	function DoModify(){
	
		var badword = null;
		GM_xmlhttpRequest({
			method: 'GET',
	
			// type here the URL with the badwords
			url: 'http://www.likecid.pf-control.de/AT/bw.html',

			onload: function (responseDetails){
				badword = responseDetails.responseText.toString();
				DoModifyRun();
			}
		});
		
		function $(id){
			return document.getElementById(id);
		}
		
		function DoModifyRun(){
			$('GM_ActivateButton').disabled = true;
			var st = $('myresult').style;	
			st.left= "";
			st.right = 0;
			st.position = 'fixed';


			var badcharsRE = GM_getValue('BAD_CHARS_REGEX', "[^- a-zA-Z_0-9ß.:äöüÄÖÜ^!§$%/=?*-_@|°~\\]\\[\\}\\{]");
			var badwordsRE = badword;
			var badspaceRE = GM_getValue('BAD_SPACE_REGEX', "^[\\xAD\\s]+|\\s\\s+|[\\xAD\\s]$|^[\\xAD\\s]*$");
			var combinedRE = new RegExp(badcharsRE + "|" + badwordsRE);
			var badwordsRealRE = new RegExp(badwordsRE,"ig"); 
			badcharsRE = new RegExp(badcharsRE);
			var textbox = document.evaluate('/html/body/div[@class="contbox"]/div[2]/div[1]', document, null, XPathResult.ELEMENT_NODE, null).iterateNext()
			var defaultstyle = 
				'.badchar { color:red!important; font-size:1.2em; font-weight:bold; } ' +
				'.goodchar { font-size:.5em; } ' +				
				'.badletter { border:1px dotted yellow; position:relative; min-width:.5em; min-height:1em; display:inline-block; margin-bottom:1px } ' +
				'.badcode { border:1px solid black; padding:3px; font-size:.5em; position:absolute; display:none; background-color:white; z-index:5; color:black; } ' +
				'.badletter:hover .badcode { display:inline-block; top:-2.5em; } '+
				'.badletter:hover { text-decoration:none;  } ' +
				'.badwordheader { color: gray; margin-left:.2em; letter-spacing:-.08em } ' + 
				'.badword { color:yellow; margin: 0 .2em; padding: 0 0.2em 0 0.05em; border: 1px dotted gray; }' +
				'.badspace { color:yellow; margin: 0 .2em; padding: 0 0.2em 0 0.05em; border: 1px dotted gray; font-size:.5em;}' +
				'a[href^="sendmsg.php"] { display:none; }';

				
			GM_addStyle(GM_getValue('style',defaultstyle));
			var xpres = document.evaluate('a[starts-with(@href,"kontrolle.php")]', textbox, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var count = 0;
			var count2 = 0;
			//var count3 = 0;
			var sslength = xpres.snapshotLength;
			
			//#by Dark Sky
			createEl({n: 'div', a: {'@id':'darkskydiv'}},header);
			//#
			
			for (var i=0; i<sslength; ++i) {
				var logitem = xpres.snapshotItem(i);
				var origLogItem = logitem;
				if (logitem.firstChild.nodeName == "FONT") {
					logitem = logitem.firstChild;
				}
				var test = logitem.innerHTML.replace(/&nbsp;/g,' ').toLowerCase();
				
				
				if (combinedRE.test(test)) {
					logitem.className = 'badchar';
					if (test.match(badcharsRE)) {
						count++;
						var replacementHTML = "";
						var j = 0;
						while (j < test.length) {
							var chr = test.charAt(j);
							j++;
							if (chr.match(badcharsRE)) {
								var code = ('0000'+chr.charCodeAt(0).toString(16)).replace(/^.*?(....)$/,'\\u$1');
								if (chr.match(/[\xAD\s\u200C]/)) { chr += '&nbsp;' }
								replacementHTML += '<span class="badletter">' + chr + '<span class="badcode">' + code + '</span></span>';
							} else {
								replacementHTML += chr;
							}
						}
						logitem.innerHTML = replacementHTML;
					}
					var arr = test.match(badwordsRealRE);
					if (arr != null) {
						count2++;
						var found = createElAfter({n: 'span', a: {'@class':'badwordheader', textContent: 'BadWord:'}}, origLogItem);
						for (var x in arr) {
							// logitem.innerHTML += "(found: " + arr[x] + ")";
							createEl({n: 'span', a: {'@class':'badword', textContent: arr[x] }}, found);
						}
					}
					
					//#by Dark Sky
					createEl(origLogItem.cloneNode(true),document.getElementById("darkskydiv"));
					createEl({n:"br"},document.getElementById("darkskydiv"));
					//#
				}
				else {
					logitem.className = 'goodchar';
				}
			}
			$('GM_ActivateButton').textContent = 'Es wurden  ' + count2 + ' Namen mit BadWords und '+count+' Namen mit Sonderzeichen gefunden';
		} 

	}//end of DoModify

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createEl(elObj, parent) {
	var el;
	if (elObj == null) return;
	if (typeof elObj == 'string') {
		el = document.createTextNode(elObj);
	} else if (elObj.nodeType) { // it's an Element node already
		el = elObj;
	} else { // it's the hash type thing
		el = document.createElement(elObj.n);
		if (elObj.a) {
			attributes = elObj.a;
			for (var key in attributes) {
				if (key.charAt(0) == '@')
					el.setAttribute(key.substring(1), attributes[key]);
				else 
					el[key] = attributes[key];
			}
		}
		if (elObj.evl) {
			el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
		}
		if (elObj.c) {
			elObj.c.forEach(function (v, i, a) { createEl(v, el); });
		}
	}
	if (parent)
		parent.appendChild(el);
	return el;
}
function createElAfter(elObj, prevSibling) {
	var el = createEl(elObj);
	if (prevSibling) {
		while (prevSibling.nextSibling != null && prevSibling.nextSibling.nodeName != "BR") prevSibling = prevSibling.nextSibling;
		prevSibling.parentNode.insertBefore(el,prevSibling.nextSibling);
	}
	return el;
}

})();
