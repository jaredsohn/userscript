//
// CBMTools
// @author  EvilMat
// @version 1.1
//
// Copyright 2011, EvilMat
//
// ==UserScript==
// @name           CBMTools
// @namespace      cbmtools
// @description    Add new features to Charazay basketball manager.
// @include        http://charazay.com/*
// @include        http://*.charazay.com/*
// ==/UserScript==
/**/

addScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function() {
  jQuery.noConflict();
  (function($) {
    CBM = {}
    var sRegExp;
    
//#########################################################################################################    
//###################################### CONFIG SECTION ###################################################	
	var bCBMshowAlertMessage = false;
	var bCBMshowAlertFriendly = false;
	var bCBMshowPointsOnLeft = true;
	var bCBMshowGSCSSkills = true;
//#######################################  END CONFIG  ####################################################    
//#########################################################################################################    
    
    CBM.showAlertMessage = function() {
		sRegExp = /^http:\/\/(www\.charazay\.com|charazay\.com)\/(index\.php)?\?act=user&code=[1-2]4.*/;
		if (!sRegExp.test(location.href)) {
			// New messages alert
			var strInbox = $(".inbox").text();
			if (strInbox.indexOf("(")!=-1) {
				var newMsg = strInbox.slice(strInbox.indexOf("(")+1,strInbox.indexOf(")"));
				var snewMsg = newMsg + " unread message";
				newMsg > 1 ? snewMsg += "s" : snewMsg;
				alert(snewMsg);
			}
		}
    }
	
	CBM.showAlertFriendly = function() {	
		sRegExp = /^http:\/\/(www\.charazay\.com|charazay\.com)\/(index\.php)?\?act=team&code=20/;
		if (!sRegExp.test(location.href)) {
			// New friendly alert
			var strFriendly = $("a[href=?act=team&code=20]").text();
			if (strFriendly.indexOf(" ")!=-1) {
				var newFriendly = strFriendly.substring(0,strFriendly.indexOf(" "));
				var snewFriendly = newFriendly + " friendl";
				newFriendly > 1 ? snewFriendly += "ies" : snewFriendly += "y";
				alert(snewFriendly);
			}
		}
    }
    
    CBM.showPointsOnLeft = function() {
	   $(window).load(function() {
		    report = document.getElementById('text');
			newTxt = "";
			var counter = 0;
			var counterControl = 0;
			var txtPoints = "<strong>(0 - 0)</strong>"
			var fNewNodes = function() {
				var numnodes = report.childNodes.length;
				if (numnodes > counter) {
					for(var i=counter;i<numnodes;i++)
				    {
						elem = report.childNodes[i];
						newDiv = document.createElement('div');
						newTxt = elem.innerHTML;
						if (newTxt.search(/<strong>\(/i) != -1) {
							txtPoints = newTxt.slice(newTxt.indexOf("(")-8,newTxt.indexOf(")")+10);
						}
						if (newTxt.search(/ :/) == -1) 
							newDiv.innerHTML = newTxt;
						else
							newDiv.innerHTML = txtPoints + " : "+newTxt;
						elem.parentNode.insertBefore(newDiv, elem); 
				    	elem.parentNode.removeChild(elem); 
				    }
				    counter = numnodes;
				}
			}
			var fControl = function() {
				if (report.childNodes.length == counterControl) {
					clearTimeout(getNewNodes);
					clearTimeout(control);
				} else {
					counterControl = report.childNodes.length;
				}
			}
			var getNewNodes = window.setInterval(fNewNodes,100);
			var control = window.setInterval(fControl,60000);
	   });
    }
    
    CBM.showGSCSSkills = function() {	
		sRegExp = /^http:\/\/(www\.charazay\.com|charazay\.com)\/(index\.php)?\?act=player&code=1&id=*/;
		if (sRegExp.test(location.href)) {
			var def = parseInt($("td.right:eq(6)").html());
			var free = parseInt($("td.right:eq(7)").html());
			var two = parseInt($("td.right:eq(8)").html());
			var three = parseInt($("td.right:eq(9)").html());
			var dri = parseInt($("td.right:eq(10)").html());
			var pas = parseInt($("td.right:eq(11)").html());
			var sp = parseInt($("td.right:eq(12)").html());
			var ftw = parseInt($("td.right:eq(13)").html());
			var reb = parseInt($("td.right:eq(14)").html());
			var GS = def + dri + pas + sp;
			var CS = def + sp + ftw + reb;
			var sHtml = "<br><font style=\"font-size:14px;\">Guard Skills: <b>"+GS+"</b> Center Skills: <b>"+CS+"</b></font>";
			$("#pagetitle").append(sHtml);
			
		}
    }
	
    if (bCBMshowAlertMessage)
    	CBM.showAlertMessage();
   	if (bCBMshowAlertFriendly)
   		CBM.showAlertFriendly();
    if (bCBMshowPointsOnLeft)
    	CBM.showPointsOnLeft();
    if (bCBMshowGSCSSkills)
    	CBM.showGSCSSkills();
  })(jQuery);
});

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addScript(scriptPath, callback) {
	var script = document.createElement("script");
	script.setAttribute("src", scriptPath);
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		if (callback) {
			script.textContent = "(" + callback.toString() + ")();";
		}
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}