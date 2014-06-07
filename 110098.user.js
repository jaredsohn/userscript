// ==UserScript==
// @name          Remove pop ups of live sekindo & all other illusive companies  
// @namespace     http://mtk.co.il/moppy
// @description	  Suitable against all illusive pop ups! Specialy made for Sekindo pop up is opened the first time you click on the page (israeli sites such as: NRG, Ynet, Mako etc.) Motty Katan(c) 13-08-2011 Updated 09-10-2011
// @include       *
// ==/UserScript==
//Change Log:
//14-08-2011 pop up window fail safe code to handle sites such as ynet
//06-09-2011 Major code change! Now there are set of rules that determines what are 
//           the odds that you voluntarly clicked on an advertisment. A small message
//           with the blocked url is displayed (enabling you to open it).
//           Url with the same domain is not blocked (unless it fails other rules)
//           Can be used to fight all ads no matter if they belong to a specific company
//           Such as Sekindo
//06-09-2011 Corrected the inside the domain condition
//06-09-2011 Corrected time calculation
//07-09-2011 In case there was a problem automatically lunching a window, notify the user
//07-09-2011 Fix bug in opening windows using code
//07-09-2011 Fix bug: message won't dissappear when launching a window fails (pop up blocker onload for example)
//07-09-2011 Fix bug: Corrected the inside the domain condition yet again
//08-09-2011 Flash/Silverlight objects are now supported!
//11-09-2011 Minor script error
//19-09-2011 Url with encoded characters didn't work - solved
//05-10-2011 Improved dealing with domains that are black listed
//09-10-2011 Minor: RegEx Improvement for domains
(function(){
	//each levels determins the number of (additional) seconds for a blocked pop up message
	var anLevels;
	var nCurrentLevel; 
	var sDomain;
	var sAlertDivId;
	var sMouseMoveDivId;	
	var fnWindowOpen;	
	function cancelSekindoClick(e)
	{
		var aoScripts = document.evaluate("//script", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		for (i=0;i<aoScripts.snapshotLength;i++){
			
			if (aoScripts.snapshotItem(i).src.match(/^http:\/\/live\.sekindo\.com/i)!=null){
				oFn = eval("unsafeWindow."+"addListener_"+aoScripts.snapshotItem(i).src.match(/\d+/));
				if (typeof(oFn)=="undefined"){
					aoScripts.snapshotItem(i).wrappedJSObject.addEventListener("load", function() {
						eval("unsafeWindow."+"getCookie_"+aoScripts.snapshotItem(i).src.match(/\d+/)+" =  function(){return 'yes'};");
						this.parentNode.wrappedJSObject.removeChild(this);
						this.removeEventListener("load", arguments.callee);
						//GM_log("removed sekindo after loading"+document.location.href);
					}, false);
				}else{
					oFn = eval("unsafeWindow."+"getCookie_"+aoScripts.snapshotItem(i).src.match(/\d+/)+" =  function(){return 'yes'};");
					aoScripts.snapshotItem(i).wrappedJSObject.parentNode.wrappedJSObject.removeChild(aoScripts.snapshotItem(i).wrappedJSObject);
					//GM_log("sekindo was loaded -> removed"+document.location.href);
				}
			}
		}
		//a click or selecting text in the body which isn't a link
		//increases the chances for an advertisment significantly
		if (nCurrentLevel>0 && nCurrentLevel+1<anLevels.length){
			nCurrentLevel++;
		}
		//can clear a message that states that a pop up was blocked
	}
	
	function runTests(sUrl)
	{
		var nLevel = 0;
		
		//sekindo blocked urls
		var sSekindoUrls = "(e-zoteric.com)|(colman.ac.il)|(mvertex.co.il)|(naturapil.com)|(best-offers.co.il)";
		//without subdomain - if one of the sekindoUrl is the current domain
		//the rule should be revised to not recognise the domain as a threat
		var sMainDomain = sDomain.replace(/^(.+\.)+(.+\..+)/i,"$2");
		oRegExp = getRegExp("(.+)(?:\\|\\("+sMainDomain+"\\))|(?:\\("+sMainDomain+"\\)\\|)(.+)", "g");
		sDomains = oRegExp.exec(sSekindoUrls);
		if (sDomains){
		    sSekindoUrls = (sDomains[sDomains.length-1]) ? sDomains[sDomains.length-1]:sDomains[sDomains.length-2];
		}
		var oRegExp = getRegExp(sSekindoUrls, true);
		if (oRegExp.test(sUrl)) {
			nLevel += 1;
		}
		oRegExp = getRegExp("(sekindo.co)", true);
		if (oRegExp.test(sUrl)) {
			nLevel += 2;
		}
		oRegExp = getRegExp("(javascript:)");
		if (oRegExp.test(sUrl)) {
			nLevel += 1;
		}				
		
		//url is different than the current domain
		//meaning either there is no http on the begining of the string
		//or the domain is present
		oRegExp = getRegExp("(^(?!http))|("+sDomain+")", true);
		if (!oRegExp.test(sUrl)) {
			nLevel += 2;
		}
		return nLevel; 			
	}
	
	function setMessage(oDiv, sUrl, sName, sFeatures, sMessage, nLevel)
	{
		//in case the whole page is covered with flash/silverlight
		var oDivMouseMove =  document.getElementById(sMouseMoveDivId);
		if (!oDivMouseMove){
			oDivMouseMove = document.createElement("div");
			oDivMouseMove.id = sMouseMoveDivId;
			oDivMouseMove.style.zIndex = 500000000;
			oDivMouseMove.style.width = "100%";
			oDivMouseMove.style.height = "100%";
			oDivMouseMove.style.position = "absolute";
			oDivMouseMove.style.left = "0px";
			oDivMouseMove.style.top = "0px";
			oDivMouseMove.style.backgroundColor = "white";			
			document.body.appendChild(oDivMouseMove);
		}
		oDivMouseMove.style.display = "block";
		
		var aoObjects = document.getElementsByTagName("object");
		var i=0,j;
		var asOldValues = new Array();
		while(i< aoObjects.length)
		{
			oElement = aoObjects[i];
			var bFound = false;
			asOldValues[i] = new Array();
			for (j=0;j<oElement.children.length;j++){
				if (oElement.children[j].name =="wmode"){
					asOldValues[i]["wmode"] = oElement.children[j].value;
					oElement.children[j].value = "opaque";					
					bFound = true; 
				} 			
			}
			if (!bFound){
				oParam = document.createElement("param");
				oParam.name = "wmode";
				oParam.value =  "opaque";
				oElement.appendChild(oParam);				
			}
			if (oElement.parentNode.tagName!="body"){
				asOldValues[i]["zIndex"] = oElement.parentNode.style.zIndex;
				oElement.style.zIndex = 0;
				oElement.parentNode.style.zIndex = 0;
			}
			i++;			
		}	 								 

		document.addEventListener("mousemove", function(e) {
			this.removeEventListener("mousemove", arguments.callee);
			oDivMouseMove.style.display = "none";
			
			var i=0;
			while(i< aoObjects.length)
			{
				oElement = aoObjects[i];
				if (oElement.parentNode.tagName!="body"){
					oElement.parentNode.style.zIndex = asOldValues[i]["zIndex"];
				}
				if (asOldValues[i]["wmode"]){
					aoResults = document.evaluate( "//param[@name='wmode']", oElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					j=0;
					while(j<aoResults.snapshotLength)
					{
						oElement = aoResults.snapshotItem(j);
						oElement.value = asOldValues[i]["wmode"]; 
						j++;
					}
				}
				i++;
			}
			nPageX = e.pageX;
			nPageY = e.pageY;
			
			if (!oDiv){
				oDiv = document.createElement("div");				
				oDiv.id = sAlertDivId;	
				oDiv.style.position = "absolute";
				oDiv.style.backgroundColor = "white";
				oDiv.style.color = "black";
				oDiv.style.border = "1px solid black";
				oDiv.style.zIndex = 500000000;
				var oLink = document.createElement("a");
				oDiv.appendChild(oLink);
				document.body.appendChild(oDiv);
			}
			
			oDiv.style.top  = nPageY+"px";			 
			oDiv.style.left = nPageX+"px";
			oDiv.childNodes[0].popupUrl = sUrl;					
			oDiv.childNodes[0].href = "javascript:void(window.open('"+sUrl+"','"+sName+"','"+sFeatures+"'));";
			oDiv.childNodes[0].innerHTML = sUrl + sMessage;

			oDiv.style.display = "block";
			//TODO: what if user click twice too fast? should use array maybe?
			nCurrentLevel = nLevel;
			//alert will disappear according to probability of advertisment				
			timeOutAlert();								
		});
	}
	
	function popupHandler(sUrl, sName, sFeatures)
	{
		sUrl = unescape(sUrl);
		var oDiv =  document.getElementById(sAlertDivId);
		var bAllowUrl = false;
		var nLevel = 0;
		if (!oDiv || oDiv.style.display!="block" || sUrl!=oDiv.childNodes[0].popupUrl){
			nLevel = runTests(sUrl);		
		}
		var oHandler = null;
		//GM_log("level defined:" + sUrl + " "+ nLevel + " "+ sDomain);
		if (!nLevel){
			//GM_log("url autorised:" + sUrl+" "+ sName + " "+ sFeatures);
			oHandler = fnWindowOpen(sUrl, sName, sFeatures);
			if (oHandler==null){
				//edge scenario - mainly pop up blockers (on enter/load)
				oDiv = setMessage(oDiv, sUrl, sName, sFeatures, " couldn't be open using script", 1);
			}
		}else{
			oDiv = setMessage(oDiv, sUrl, sName, sFeatures, " was blocked", nLevel);	
		}
		return oHandler;	
	}
	
	function timeOutAlert()
	{
		var nTimeout = (nCurrentLevel>0 && nCurrentLevel<anLevels.length) ? anLevels[nCurrentLevel]*1000:0;
		//GM_log("timeout" +nCurrentLevel + " "+nTimeout);		
		if (nTimeout) {
			nCurrentLevel++;
			setTimeout( timeOutAlert, nTimeout);
		}else {
			var oDiv =  document.getElementById(sAlertDivId);
			oDiv.style.display = "none";			
		}
	}
	
	
	function prepareRegExp(sRule)
	{
	   return sRule.replace(/\./g,"\\."); 
	}
	
	function getRegExp(sUrl, sPrepare)
	{
		if (sPrepare) {
			sUrl = prepareRegExp(sUrl);
		}
		return new RegExp(sUrl, "g");		
	}

	function init(){
		//first cell must be 0 - has no significance since in code
		//I'm using 0 as the minimal and last timeout.
		//                   none
		anLevels = new Array(0,
		//					 maximal if detected - the most uncertency (addition of all numbers
		//                   1.25+0.75 etc.)    
							 1,
		//                   url is known to be ad / use of javascript
							 0.50,
		//                   sekindo url is included (+some of previous) 
							 0.25,
		//                   sekindo url +(all previous) 
							 0.1,							
							 0.05,
		//					 minimum is 2 seconds!
							 1.95);
		nCurrentLevel = 0;
		sDomain = unsafeWindow.location.hostname;
		sAlertDivId = "idPopupHandlerRemoverNotifier"+Math.random()*5000;
		sMouseMoveDivId = "idPopupHandlerMouseMoveDetection"+Math.random()*5000; 
		
		//used for pop up blocked message
		document.captureEvents(Event.MOUSEMOVE);
	
		//some sites (NRG, Rotter) loads sekindo using a special javascript that comes 
		//from the Sekindo site. This code is used to hook up to clicking/selecting unharmless text
		if (unsafeWindow.document.body){
			unsafeWindow.document.body.addEventListener("click", cancelSekindoClick, false);
		}
		cancelSekindoClick();
		
		fnWindowOpen = unsafeWindow.open;
		//fail safe mechanism 
		//this part handles Ynet and all other sites
		unsafeWindow.open = popupHandler;	
	}
init();

})();