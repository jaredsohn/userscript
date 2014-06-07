// MozTxtAlignFix Beta
// June 02 2005
// (C) 2005, Saravana Kumar
// Released under GPL (http://www.gnu.org/copyleft/gpl.html)
// Comments/Suggestions ? saravanannkl at gmail dot com

// This script requires Greasemonkey.
// Greasemonkey ? No its not a monkey from Africa. Its an programmable interface to change the behaviour of (fire)fox.
// visit http://greasemonkey.mozdev.org/ for more details.
// Works fine with Firefox/1.0.4, Greasemonkey 0.3.3

// ==UserScript==
// @name		MozTxtAlignFix
// @namespace		http://saravan.blogspot.com
// @description		Temp. fix for Mozilla Bug # 270012
// @include		http://*
// @include		file://*
// ==/UserScript==

(function() {
	
	var justifiedObjects = new Array();
	var objwithLtrSpg = new Array();
	var objwithWrdSpg = new Array();
	var objLtrSpgVal = new Array();
	var objWrdSpgVal = new Array();
	var bToggled = false;

	var MozTxtAlignFix = {

		canIFix : function () {
			// Check the current page for Tamil Script.
			// Tamil alphabet KA will occur in almost all Tamil pages.
			// Check only for KA. Ubhayam Krupa. 

			var allBody = document.getElementsByTagName("body")
			if(allBody.length==0) return false;
			return (allBody[0].innerHTML.indexOf(String.fromCharCode(2965))>-1);
		},

		fixTags : function (obj) {
			if(!obj) return;

			if(obj.style) {

				var objStyle = getComputedStyle(obj, '');

				if(objStyle.textAlign.length == 7) {
					justifiedObjects[justifiedObjects.length] = obj;
					obj.style.textAlign = "left";
				}

				if(objStyle.letterSpacing.length!=0 && objStyle.letterSpacing.length!=6) {
					objwithLtrSpg[objwithLtrSpg.length] = obj;
					objLtrSpgVal[objLtrSpgVal.length] = objStyle.letterSpacing;
					obj.style.letterSpacing = "normal";
				}

				if(objStyle.wordSpacing.length!=0 && objStyle.wordSpacing.length!=6) {
					objwithWrdSpg[objwithWrdSpg.length] = obj;
					objWrdSpgVal[objWrdSpgVal.length] = objStyle.wordSpacing;
					obj.style.wordSpacing = "normal";
				}

			}

			var kids = obj.childNodes;

			if(!kids) return;

			// Do the same for Object's Children
			for (var i = 0; i < kids.length; i++)
				this.fixTags(kids[i]);
		},

		// Inspired from Mark Pilgrim's Butler Script (http://diveintomark.org/projects/butler/butler.user.js)
		notifyUser : function () {
			if(justifiedObjects.length == 0 && objwithLtrSpg.length == 0 && objwithWrdSpg.length == 0) return;

			// Blogger fix.
			var bloggerNavBar = document.getElementById('b-navbar');
			if(bloggerNavBar) bloggerNavBar.parentNode.removeChild(bloggerNavBar);

			var logo = document.createElement("div");
			logo.innerHTML = '<div style="margin: 0 auto 0 auto; border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; background-color: #000000; color: #ffffff;"><center><p style="margin: 2px 0 1px 0; color: #ffffff; background-color: #000000;"> Tamil fonts Enhanced by MozTxtAlignFix Script. (<a id="_toggle" style="background: black; color: white;" title="Toggle Changes" href="#">Undo Changes</a>)</p></center></div>';
			document.body.insertBefore(logo, document.body.firstChild);
			var a = document.getElementById('_toggle');
			a.onclick = (function() {
					var tgl = document.getElementById('_toggle');
					if(bToggled) {
						for(i=0;i<justifiedObjects.length; i++)
							justifiedObjects[i].style.textAlign = 'left';

						for(i=0;i<objwithLtrSpg.length; i++)
							objwithLtrSpg[i].style.letterSpacing = 'normal';

						for(i=0;i<objwithWrdSpg.length; i++)
							objwithWrdSpg[i].style.wordSpacing = 'normal';

						tgl.innerHTML = ' Undo Changes ';
					}
					else {

						for(i=0;i<justifiedObjects.length; i++)
							justifiedObjects[i].style.textAlign = 'justify';

						for(i=0;i<objwithLtrSpg.length; i++)
							objwithLtrSpg[i].style.letterSpacing = objLtrSpgVal[i];

						for(i=0;i<objwithWrdSpg.length; i++)
							objwithWrdSpg[i].style.wordSpacing = objWrdSpgVal[i];

						tgl.innerHTML = ' Fix the Page ';
					}
					bToggled = !bToggled;
			});
		},

		processPage : function () {
			if(!this.canIFix()) return;
			this.fixTags(document.body);
			this.notifyUser();
		}
	}
	
	MozTxtAlignFix.processPage();
}) ();